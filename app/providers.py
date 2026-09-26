import httpx

from app.store import DomainError, now


def sms_body(booking, lead, slot):
    # Explicitly bounded templates; third-language quality still needs human QA.
    when = slot["start"]
    if lead["language"] == "fr":
        return f"DÉMO — aucune visite réelle. Rendez-vous {booking['id']} : {when} (Toronto), fenêtre de 2 h avec {slot['technician']}. Aucun paiement requis."
    if lead["language"] == "zh":
        return f"演示：不会安排实际上门。预约 {booking['id']}：{when}（多伦多时间），两小时服务时段，技师 {slot['technician']}。无需付款。"
    return f"DEMO — no real visit. Appointment {booking['id']}: {when} (Toronto), a 2-hour window with {slot['technician']}. No payment required."


async def send_confirmation(store, settings, booking_id):
    with store.db() as db:
        db.execute("BEGIN IMMEDIATE")
        booking = db.execute("SELECT * FROM bookings WHERE id=?", (booking_id,)).fetchone()
        if not booking:
            raise DomainError("Booking not found", 404)
        lead = store.lead(db, booking["lead_id"])
        if not lead["sms_consent"]:
            raise DomainError("SMS consent was not obtained", 422)
        slot = db.execute("SELECT * FROM slots WHERE id=?", (booking["slot_id"],)).fetchone()
        body = sms_body(booking, lead, slot)
        old = db.execute("SELECT * FROM messages WHERE booking_id=?", (booking_id,)).fetchone()
        if old and old["status"] != "preview":
            return dict(old)
        if not settings.live_sms:
            db.execute("INSERT OR IGNORE INTO messages VALUES (?,?, 'preview', NULL, ?)", (booking_id, body, now()))
            return {"booking_id": booking_id, "status": "preview", "body": body, "sent": False}
        if lead["phone"] not in settings.sms_allowlist:
            raise DomainError("Recipient is not in the consenting test allowlist", 403)
        if not all((settings.twilio_sid, settings.twilio_token, settings.twilio_from)):
            raise DomainError("Twilio credentials are not configured", 503)
        db.execute("INSERT INTO messages VALUES (?,?, 'sending', NULL, ?) ON CONFLICT(booking_id) DO UPDATE SET status='sending',updated_at=excluded.updated_at", (booking_id, body, now()))
    # Reservation prevents concurrent sends. An ambiguous failure must be reviewed, not retried blindly.
    status, sid = "unknown_review_required", None
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                f"https://api.twilio.com/2010-04-01/Accounts/{settings.twilio_sid}/Messages.json",
                auth=(settings.twilio_sid, settings.twilio_token),
                data={"To": lead["phone"], "From": settings.twilio_from, "Body": body})
        if response.is_success:
            sid = response.json().get("sid")
            status = "provider_accepted" if sid else "unknown_review_required"
        elif 400 <= response.status_code < 500:
            status = "failed_review_required"
    except (httpx.HTTPError, ValueError):
        pass
    with store.db() as db:
        db.execute("UPDATE messages SET status=?,provider_sid=?,updated_at=? WHERE booking_id=?", (status, sid, now(), booking_id))
        store.event(db, "sms", "SMS status updated", status, lead["conversation_id"])
    return {"booking_id": booking_id, "status": status, "provider_sid": sid, "body": body,
            "delivered": False, "note": "Provider acceptance is not delivery confirmation."}

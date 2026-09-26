import json
import sqlite3
import uuid
from contextlib import contextmanager
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

TZ = ZoneInfo("America/Toronto")
CATALOG = {
    "water_heater": ("Water heater", 1000, 1850, 1500),
    "drain_clog": ("Blocked drain", 165, 400, 300),
    "leak_repair": ("Leak assessment", 200, 950, 450),
    "toilet_faucet": ("Toilet / faucet", 200, 400, 300),
    "maintenance_tuneup": ("Maintenance", 140, 350, 250),
}
SCHEMA = """
CREATE TABLE IF NOT EXISTS leads (
 id TEXT PRIMARY KEY, conversation_id TEXT UNIQUE NOT NULL, created_at TEXT NOT NULL,
 name TEXT NOT NULL, phone TEXT NOT NULL, city TEXT NOT NULL, address TEXT NOT NULL,
 job_type TEXT NOT NULL, language TEXT NOT NULL, summary TEXT NOT NULL,
 urgency TEXT NOT NULL, sms_consent INTEGER NOT NULL, source TEXT NOT NULL,
 budget_accepted INTEGER, hot INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'new',
 est_value_cad INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS slots (
 id TEXT PRIMARY KEY, start TEXT NOT NULL, end TEXT NOT NULL, technician TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS bookings (
 id TEXT PRIMARY KEY, lead_id TEXT UNIQUE NOT NULL REFERENCES leads(id),
 slot_id TEXT UNIQUE NOT NULL REFERENCES slots(id), created_at TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'confirmed', est_value_cad INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS events (
 id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT NOT NULL, type TEXT NOT NULL,
 title TEXT NOT NULL, detail TEXT NOT NULL, conversation_id TEXT);
CREATE TABLE IF NOT EXISTS calls (
 conversation_id TEXT PRIMARY KEY, agent_id TEXT NOT NULL, status TEXT NOT NULL,
 summary TEXT NOT NULL, transcript_json TEXT NOT NULL, received_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS messages (
 booking_id TEXT PRIMARY KEY REFERENCES bookings(id), body TEXT NOT NULL,
 status TEXT NOT NULL, provider_sid TEXT, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS callbacks (
 lead_id TEXT PRIMARY KEY REFERENCES leads(id), status TEXT NOT NULL, created_at TEXT NOT NULL);
"""


def now():
    return datetime.now(TZ).isoformat(timespec="seconds")


class DomainError(Exception):
    def __init__(self, message, status=409):
        self.message, self.status = message, status


class Store:
    def __init__(self, path):
        self.path = path
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with self.db() as db:
            db.executescript(SCHEMA)
        self.seed_slots()

    @contextmanager
    def db(self):
        db = sqlite3.connect(self.path, timeout=10)
        db.row_factory = sqlite3.Row
        db.execute("PRAGMA foreign_keys=ON")
        try:
            yield db
            db.commit()
        except Exception:
            db.rollback()
            raise
        finally:
            db.close()

    def seed_slots(self):
        day = datetime.now(TZ).date()
        with self.db() as db:
            count = 0
            while count < 3:
                day += timedelta(days=1)
                if day.weekday() >= 5:
                    continue
                count += 1
                for hour in (8, 10, 13, 15):
                    for tech in ("Marc", "Sofia", "Devon"):
                        start = datetime(day.year, day.month, day.day, hour, tzinfo=TZ)
                        db.execute("INSERT OR IGNORE INTO slots VALUES (?,?,?,?)", (
                            f"{day}-{hour}-{tech}", start.isoformat(),
                            (start + timedelta(hours=2)).isoformat(), tech))

    def event(self, db, kind, title, detail, conversation=None):
        db.execute("INSERT INTO events(ts,type,title,detail,conversation_id) VALUES (?,?,?,?,?)",
                   (now(), kind, title, detail, conversation))

    def lead(self, db, lead_id):
        row = db.execute("SELECT * FROM leads WHERE id=?", (lead_id,)).fetchone()
        if not row:
            raise DomainError("Lead not found", 404)
        return dict(row)

    def register(self, inquiry):
        if not inquiry.consent_to_store:
            raise DomainError("Obtain consent before storing contact details", 422)
        data = inquiry.model_dump()
        data.pop("consent_to_store")
        with self.db() as db:
            db.execute("BEGIN IMMEDIATE")
            old = db.execute("SELECT * FROM leads WHERE conversation_id=?", (inquiry.conversation_id,)).fetchone()
            if old:
                # Exact retries are safe; changed facts require human review, not silent overwrite.
                if any(old[k] != v for k, v in data.items()):
                    raise DomainError("Conversation already recorded with different details; human review required")
                return dict(old)
            data.update(id="lead_" + uuid.uuid4().hex[:12], created_at=now(),
                        est_value_cad=CATALOG.get(inquiry.job_type, ("", 0, 0, 0))[3])
            fields = list(data)
            db.execute(f"INSERT INTO leads ({','.join(fields)}) VALUES ({','.join('?' for _ in fields)})", list(data.values()))
            self.event(db, "inquiry", "Inquiry captured", f"{inquiry.language.upper()} · {inquiry.job_type} · {inquiry.city}", inquiry.conversation_id)
            return self.lead(db, data["id"])

    def quote(self, job_type):
        if job_type not in CATALOG:
            return {"job_type": job_type, "requires_assessment": True, "currency": "CAD", "disclaimer": "No automated price available. A person must assess this request."}
        label, low, high, estimate = CATALOG[job_type]
        return dict(job_type=job_type, label=label, low=low, high=high,
                    estimate=estimate, currency="CAD", requires_assessment=False,
                    disclaimer="Illustrative demo range, not a binding quote. Technician confirms scope and final price; taxes and extras are not included.")

    def availability(self, job_type):
        if job_type not in CATALOG:
            return {"slots": [], "requires_human": True}
        self.seed_slots()
        with self.db() as db:
            rows = db.execute("SELECT s.* FROM slots s LEFT JOIN bookings b ON s.id=b.slot_id WHERE b.id IS NULL AND s.start>? ORDER BY s.start,s.technician LIMIT 3", (now(),)).fetchall()
            return {"slots": [dict(r) for r in rows], "timezone": "America/Toronto", "calendar": "local demo calendar"}

    def budget(self, lead_id, accepted):
        with self.db() as db:
            lead = self.lead(db, lead_id)
            db.execute("UPDATE leads SET budget_accepted=? WHERE id=?", (accepted, lead_id))
            self.event(db, "budget", "Budget signal recorded", "Range accepted" if accepted else "Range not accepted", lead["conversation_id"])
        return {"recorded": True, "range_accepted": accepted}

    def booking(self, req):
        if not req.confirmed_by_caller:
            raise DomainError("Read back details and obtain caller confirmation first", 422)
        with self.db() as db:
            db.execute("BEGIN IMMEDIATE")
            lead = self.lead(db, req.lead_id)
            old = db.execute("SELECT * FROM bookings WHERE lead_id=?", (req.lead_id,)).fetchone()
            if old:
                if old["slot_id"] != req.slot_id:
                    raise DomainError("Already booked into a different slot; human review required")
                return dict(old)
            if lead["job_type"] not in CATALOG or lead["urgency"] == "emergency" or lead["status"] == "emergency":
                raise DomainError("This request requires human review, not automated booking", 422)
            if not lead["address"]:
                raise DomainError("Service address is required", 422)
            slot = db.execute("SELECT * FROM slots WHERE id=? AND start>?", (req.slot_id, now())).fetchone()
            if not slot:
                raise DomainError("Slot not found or expired", 404)
            booking = dict(id="book_" + uuid.uuid4().hex[:12], lead_id=req.lead_id, slot_id=req.slot_id,
                           created_at=now(), status="confirmed", est_value_cad=lead["est_value_cad"])
            try:
                db.execute("INSERT INTO bookings VALUES (:id,:lead_id,:slot_id,:created_at,:status,:est_value_cad)", booking)
            except sqlite3.IntegrityError:
                raise DomainError("That slot was just taken. Check availability again.")
            db.execute("UPDATE leads SET status='booked' WHERE id=?", (req.lead_id,))
            self.event(db, "booking", "Appointment confirmed", f"{slot['technician']} · {slot['start']}", lead["conversation_id"])
            return booking

    def hot(self, lead_id):
        with self.db() as db:
            lead = self.lead(db, lead_id)
            if not lead["hot"]:
                db.execute("UPDATE leads SET hot=1 WHERE id=?", (lead_id,))
                self.event(db, "hot", "Owner follow-up flagged", lead["summary"], lead["conversation_id"])
        return {"lead_id": lead_id, "status": "flagged", "estimated_value_source": "rate card; zero means unpriced"}

    def emergency(self, lead_id, description):
        with self.db() as db:
            lead = self.lead(db, lead_id)
            if lead["status"] == "booked":
                raise DomainError("Existing booking requires immediate human review; no automatic dispatch")
            if lead["status"] != "emergency":
                db.execute("UPDATE leads SET status='emergency',hot=1,urgency='emergency' WHERE id=?", (lead_id,))
                self.event(db, "emergency", "Urgent human review needed", description, lead["conversation_id"])
        return {"status": "flagged_only", "dispatch_confirmed": False,
                "message": "This demo does not dispatch emergency help. If anyone is in immediate danger, contact local emergency services."}

    def callback(self, lead_id):
        with self.db() as db:
            lead = self.lead(db, lead_id)
            result = db.execute("INSERT OR IGNORE INTO callbacks VALUES (?, 'manual_follow_up', ?)", (lead_id, now()))
            if result.rowcount:
                self.event(db, "callback", "Human callback requested", "No outbound call placed; no response time promised", lead["conversation_id"])
        return {"status": "manual_follow_up", "outbound_call_placed": False}

    def post_call(self, data):
        cid = data["conversation_id"]
        with self.db() as db:
            result = db.execute("INSERT OR IGNORE INTO calls VALUES (?,?,?,?,?,?)", (
                cid, data.get("agent_id", ""), data.get("status", "done"),
                (data.get("analysis") or {}).get("transcript_summary", "") or "",
                json.dumps(data.get("transcript", []), ensure_ascii=False), now()))
            if result.rowcount:
                self.event(db, "call", "Verified call receipt received", "Post-call webhook signature verified", cid)
        return {"received": True, "duplicate": not bool(result.rowcount)}

    def state(self):
        with self.db() as db:
            leads = [dict(r) for r in db.execute("SELECT * FROM leads ORDER BY created_at DESC")]
            bookings = [dict(r) for r in db.execute("SELECT b.*,s.start,s.end,s.technician,l.name,l.phone,l.language,l.city,l.job_type,l.source FROM bookings b JOIN slots s ON s.id=b.slot_id JOIN leads l ON l.id=b.lead_id ORDER BY b.created_at DESC")]
            events = [dict(r) for r in db.execute("SELECT * FROM events ORDER BY id DESC LIMIT 80")]
            calls = [dict(r) for r in db.execute("SELECT * FROM calls ORDER BY received_at DESC LIMIT 30")]
            messages = [dict(r) for r in db.execute("SELECT * FROM messages ORDER BY updated_at DESC")]
            callbacks = [dict(r) for r in db.execute("SELECT * FROM callbacks")]
        language_mix = {}
        for lead in leads:
            language_mix[lead["language"]] = language_mix.get(lead["language"], 0) + 1
        return dict(leads=leads, bookings=bookings, events=events, calls=calls, messages=messages, callbacks=callbacks,
                    metrics={"inquiries": len(leads), "bookings": len(bookings),
                             "estimated_booked_value": sum(b["est_value_cad"] for b in bookings),
                             "estimated_open_pipeline": sum(l["est_value_cad"] for l in leads if l["status"] == "new"),
                             "human_review": sum(l["status"] == "emergency" or (l["status"] == "new" and l["hot"]) for l in leads),
                             "verified_call_receipts": len(calls), "language_mix": language_mix})

import hmac
import secrets
from pathlib import Path
from urllib.parse import urlparse

from elevenlabs import ElevenLabs
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from app.config import Settings
from app.models import (BookingRequest, BudgetRequest, DemoRequest, EmergencyRequest,
                        Inquiry, LeadRequest, QuoteRequest, SessionRequest, SmsRequest)
from app.providers import send_confirmation
from app.store import CATALOG, DomainError, Store

ROOT = Path(__file__).resolve().parent.parent


def create_app(settings=None):
    settings = settings or Settings.from_env()
    store = Store(settings.db_path)
    app = FastAPI(title="Front Desk Canada", version="0.1.0", docs_url=None, redoc_url=None, openapi_url=None)
    app.state.store, app.state.settings = store, settings
    # Local access is an in-memory capability; never logged or shared with agent tools.
    local_session = secrets.token_urlsafe(32)
    remote_session = secrets.token_urlsafe(32)

    def loopback(request):
        return (request.client and request.client.host in {"127.0.0.1", "::1"}
                and request.url.hostname in {"localhost", "127.0.0.1", "::1"}
                and not any(h in request.headers for h in ("forwarded", "x-forwarded-for", "cf-connecting-ip", "x-forwarded-host")))

    def same_origin(request):
        origin = request.headers.get("origin")
        if origin and urlparse(origin).netloc != request.headers.get("host"):
            raise HTTPException(403, "Cross-origin request rejected")

    def admin(request: Request):
        cookie = request.cookies.get("fd_session", "")
        bearer = request.headers.get("authorization", "").removeprefix("Bearer ")
        valid = (bool(cookie) and hmac.compare_digest(cookie, remote_session)) or (
            bool(cookie) and hmac.compare_digest(cookie, local_session) and loopback(request)) or (
            bool(settings.admin_token) and hmac.compare_digest(bearer, settings.admin_token))
        if not valid:
            raise HTTPException(401, "Owner sign-in required")
        same_origin(request)

    def agent(request: Request):
        key = request.headers.get("x-agent-secret", "")
        if not settings.agent_secret or not hmac.compare_digest(key, settings.agent_secret):
            raise HTTPException(401, "Agent authentication required")

    @app.middleware("http")
    async def security(request, call_next):
        try:
            length = int(request.headers.get("content-length", "0") or 0)
        except ValueError:
            return JSONResponse({"detail": "Invalid Content-Length"}, status_code=400)
        if length > 1_000_000:
            return JSONResponse({"detail": "Request too large"}, status_code=413)
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["X-Frame-Options"] = "DENY"
        if request.url.path.startswith(("/api/", "/tools/", "/webhooks/")):
            response.headers["Cache-Control"] = "no-store"
        return response

    @app.exception_handler(DomainError)
    async def domain_error(request, error):
        return JSONResponse({"detail": error.message}, status_code=error.status)

    @app.get("/health")
    def health():
        return {"status": "ok", "product": "Front Desk Canada"}

    @app.get("/")
    @app.get("/demo")
    def index():
        return FileResponse(ROOT / "static/index.html")

    @app.post("/api/session/local")
    def local_login(request: Request, response: Response):
        same_origin(request)
        if not loopback(request):
            raise HTTPException(403, "Local access only; use owner sign-in for a tunnel")
        response.set_cookie("fd_session", local_session, httponly=True, samesite="strict", max_age=3600)
        return {"authenticated": True}

    @app.post("/api/session")
    def login(data: SessionRequest, request: Request, response: Response):
        same_origin(request)
        if not settings.admin_token or not hmac.compare_digest(data.token, settings.admin_token):
            raise HTTPException(401, "Incorrect owner token")
        response.set_cookie("fd_session", remote_session, httponly=True, samesite="strict",
                            secure=request.url.scheme == "https", max_age=3600)
        return {"authenticated": True}

    @app.delete("/api/session")
    def logout(response: Response, _: None = Depends(admin)):
        response.delete_cookie("fd_session")
        return {"signed_out": True}

    @app.get("/api/state", dependencies=[Depends(admin)])
    def state():
        result = store.state()
        result["config"] = {"demo": settings.demo, "agent_id": settings.agent_id,
                            "voice_configured": bool(settings.agent_id), "sms_live": settings.live_sms,
                            "languages": settings.languages, "calendar": "local demo",
                            "tools_configured": bool(settings.agent_secret),
                            "webhook_configured": bool(settings.webhook_secret)}
        result["catalog"] = [store.quote(k) for k in CATALOG]
        return result

    def register(data):
        if data.language not in settings.languages:
            raise DomainError("Language is outside the configured set; offer human follow-up", 422)
        return store.register(data)

    @app.post("/tools/log_lead", dependencies=[Depends(agent)])
    def tool_register(data: Inquiry):
        return register(data)

    @app.post("/api/leads", dependencies=[Depends(admin)])
    def manual_register(data: Inquiry):
        return register(data.model_copy(update={"source": "manual"}))

    @app.post("/tools/get_quote", dependencies=[Depends(agent)])
    def tool_quote(data: QuoteRequest):
        return store.quote(data.job_type)

    @app.post("/tools/check_availability", dependencies=[Depends(agent)])
    def tool_slots(data: QuoteRequest):
        return store.availability(data.job_type)

    @app.get("/api/slots", dependencies=[Depends(admin)])
    def slots(job_type: str = "water_heater"):
        return store.availability(job_type)

    @app.post("/tools/qualify_budget", dependencies=[Depends(agent)])
    def budget(data: BudgetRequest):
        return store.budget(data.lead_id, data.range_accepted)

    @app.post("/tools/create_booking", dependencies=[Depends(agent)])
    @app.post("/api/bookings", dependencies=[Depends(admin)])
    def book(data: BookingRequest):
        return store.booking(data)

    @app.post("/tools/flag_hot_lead", dependencies=[Depends(agent)])
    @app.post("/api/hot", dependencies=[Depends(admin)])
    def hot(data: LeadRequest):
        return store.hot(data.lead_id)

    @app.post("/tools/flag_emergency", dependencies=[Depends(agent)])
    @app.post("/api/emergency", dependencies=[Depends(admin)])
    def emergency(data: EmergencyRequest):
        return store.emergency(data.lead_id, data.description)

    @app.post("/tools/callback_missed_call", dependencies=[Depends(agent)])
    @app.post("/api/callback", dependencies=[Depends(admin)])
    def callback(data: LeadRequest):
        return store.callback(data.lead_id)

    @app.post("/tools/send_sms", dependencies=[Depends(agent)])
    @app.post("/api/sms", dependencies=[Depends(admin)])
    async def sms(data: SmsRequest):
        return await send_confirmation(store, settings, data.booking_id)

    @app.post("/webhooks/elevenlabs")
    async def webhook(request: Request):
        if not settings.webhook_secret or not settings.agent_id:
            raise HTTPException(503, "Webhook verification is not configured")
        raw = await request.body()
        if len(raw) > 1_000_000:
            raise HTTPException(413, "Webhook too large")
        try:
            event = ElevenLabs(api_key="not-used-for-local-signature-verification").webhooks.construct_event(
                rawBody=raw.decode(), sig_header=request.headers.get("elevenlabs-signature", ""), secret=settings.webhook_secret)
        except Exception:
            raise HTTPException(401, "Invalid webhook signature")
        if event.get("type") != "post_call_transcription":
            return {"ignored": True}
        data = event.get("data", {})
        if data.get("agent_id") != settings.agent_id or not data.get("conversation_id"):
            raise HTTPException(403, "Unexpected agent or missing conversation ID")
        with store.db() as db:
            consent = db.execute("SELECT id FROM leads WHERE conversation_id=?", (data["conversation_id"],)).fetchone()
        if not consent:
            return {"ignored": True, "reason": "No consented intake record; transcript not retained"}
        return store.post_call(data)

    @app.post("/api/demo", dependencies=[Depends(admin)])
    async def demo(data: DemoRequest):
        if not settings.demo:
            raise HTTPException(403, "Simulation disabled")
        language = data.scenario if data.scenario in {"en", "fr", "zh"} else "en"
        if language not in settings.languages:
            raise HTTPException(422, "Scenario language is not configured")
        job = {"en": "water_heater", "fr": "drain_clog", "zh": "leak_repair", "renovation": "renovation", "emergency": "emergency"}[data.scenario]
        lead = register(Inquiry(conversation_id="sim_" + secrets.token_hex(8),
                                name={"en": "Dan · example", "fr": "Marie · example", "zh": "Lin · example"}.get(language),
                                phone="+12265550147", city="Waterloo", address="123 Example Street · fictional",
                                job_type=job, language=language, summary=f"Synthetic {language.upper()} inquiry: {job.replace('_', ' ')}. No real customer or phone call.",
                                urgency="emergency" if job == "emergency" else "routine",
                                consent_to_store=True, sms_consent=True, source="simulation"))
        if job == "emergency":
            result = store.emergency(lead["id"], "Synthetic burst-pipe report. No emergency dispatch.")
        elif job == "renovation":
            result = store.hot(lead["id"])
        else:
            choices = store.availability(job)["slots"]
            if not choices:
                raise DomainError("All demo slots are taken; use a new demo database")
            result = store.booking(BookingRequest(lead_id=lead["id"], slot_id=choices[0]["id"], confirmed_by_caller=True))
            # Simulation never sends external messages, even when live SMS is enabled.
            from dataclasses import replace
            await send_confirmation(store, replace(settings, live_sms=False), result["id"])
        return {"simulation": True, "lead": lead, "result": result}

    app.mount("/static", StaticFiles(directory=ROOT / "static"), name="static")
    return app


app = create_app()

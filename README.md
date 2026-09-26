# Front Desk Canada

**A clearer next step for every service inquiry.** An AF Hacks / Growing Canada prototype for multilingual intake, a reviewed owner handoff, and auditable appointment booking.

Canada's small service businesses need productive workflows, not another inbox. Our hypothesis is that a bounded multilingual front desk can reduce coordination effort and help callers access services. Existing AI receptionists already answer and book; our advantage is a hypothesis to test, not a proven language moat. See the [research and claim audit](docs/RESEARCH.md).

## Run locally

Python 3.11+ is required (tested here on 3.14). From this directory:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Open http://127.0.0.1:8000. Direct loopback requests receive a short-lived HttpOnly owner session. Forwarded requests do not. The owner dashboard is never an anonymous data API. Start with **Try a scenario**, or **New inquiry** for the manual, confirmation-gated path.

For the video, open **http://127.0.0.1:8000/demo#campaigns** (also supported: `/?demo=1#campaigns`). Create maintenance previews, review English/French/Mandarin, approve, and **Activate sample campaign**. Select **中文**, then **Open customer preview**. Follow localized quick replies through consent, fictional contact details, SMS choice, slot selection and explicit readback confirmation. An English owner handoff updates alongside the conversation. The outcome links the appointment, unsent SMS preview and accurate demo results to the originating campaign. **Reset demo** or reload starts another take. This mode uses in-memory browser data, not owner APIs or external providers. Full [90–120 second click-by-click script](docs/DEMO.md).

This connected recording-flow extension has been source-reviewed only; no tests, syntax checks, browser interactions or provider calls were run for this update. Earlier verification claims below concern the pre-existing backend/owner workflow, not this extension. Browser behavior and layout still require a requested verification pass.

The three-day calendar is generated from the current Toronto date, excluding weekends. SQLite state persists in `data/frontdesk.sqlite3`. To start a fresh demonstration without deleting old data, stop the server and launch with a new path:

```sh
DB_PATH=data/new-demo.sqlite3 .venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

## What works / what does not

| Component | Status |
|---|---|
| Owner dashboard, manual intake, persisted audit feed | Implemented; browser-tested locally |
| Range quotes, booking confirmation, atomic slot reservation | Implemented; automated tests |
| Pipeline metrics | Estimates only; booked leads excluded from open pipeline |
| Synthetic scenarios | Real local DB writes; no calls, speech processing, or SMS |
| Multilingual campaign studio | Interactive sample copy in English, French, and Mandarin; approval and launch are simulated in the browser; no ads or marketing texts are sent |
| Connected recording journey | Scripted customer/English handoff, consented appointment outcome and campaign attribution implemented in browser memory; runtime unverified |
| SMS templates | Preview by default; live Twilio adapter requires opt-in credentials and consenting allowlist |
| Voice widget | Activation path implemented; requires a configured agent; not live-validated |
| Agent webhook tools | Authenticated endpoints implemented; provider configuration required |
| Post-call receipts | SDK signature verification and idempotent persistence tested with signed fixtures |
| External calendar | Not integrated; explicitly local demo calendar |
| Outbound callbacks | Human follow-up queue only; no outbound calling |
| Emergency dispatch | Not provided; human-review flag only |
| Deposits/payment collection | Not implemented; no fake checkout |

Grand River Plumbing & Heating is fictional, with three named demo technicians. The product does not represent a licensed contractor, quote real work, or send a technician. Supported-language configuration is not proof of translation quality.

## Connect ElevenLabs and optional Twilio

See [setup guide](docs/INTEGRATIONS.md), [agent instructions](agent/system_prompt.md), and [company knowledge](agent/knowledge.md). Copy `.env.example` to an untracked `.env` locally and populate secrets there, never in chat or Git. Restart after environment changes.

Generate different long random values for `ADMIN_TOKEN` and `AGENT_SECRET`. For example, run `python3 -c 'import secrets; print(secrets.token_urlsafe(32))'` locally for each, and paste only into your local environment and the relevant provider secret store.

`ADMIN_TOKEN` authorizes owner APIs or remote sign-in. `AGENT_SECRET` authorizes only `/tools/*`. Never give the voice agent the owner token. Restrict provider domain access and spending; keep a tunnel closed until authentication and privacy settings have been checked. Test recipients must opt into both the call and SMS.

## Test

Run or add tests only when explicitly requested. Existing checks are not comprehensive coverage of the new campaign/journey flow.

```sh
.venv/bin/python -m pytest -q
.venv/bin/python -m scripts.tool_manifest
node --test tests/demo.test.cjs
```

Tests cover authentication, consent, schema validation, idempotency, concurrent booking, emergency gates, non-duplicated pipeline, SMS previews/allowlists, signed webhook replay and persistence. No test places calls or sends messages. A dependency currently emits an httpx TestClient deprecation warning; tests still execute.

## Architecture

`static/` is a responsive, framework-free owner UI. `app/main.py` owns HTTP/authentication; `models.py` validates input; `store.py` owns transactional rules and evidence; `providers.py` owns SMS delivery. ElevenLabs interprets the conversation but calls validated backend operations. The model cannot invent prices or write directly to the database.

Recording mode is a separate execution boundary within the same UI: `static/demo.js` owns campaigns → journeys → leads → bookings → message previews. It uses deterministic paired fixtures rather than ElevenLabs, and refuses to fall through to backend requests. One journey is reused per campaign/language; a second campaign has distinct IDs and attribution. Counts come from records, never display increments. Existing journeys retain their offer version if a campaign is edited. Only confirmed bookings contribute to **Illustrative booked value**. A declined SMS choice still permits a booking; an SMS failure leaves the appointment intact. Custom area names are preserved verbatim, not translated; the contact fixture stays in Waterloo. Fonts are local fallbacks, with no external font request.

Consent-gated intake creates a stable lead. The booking reads from the server rate card and calendar; a unique slot constraint prevents collisions. Tools return actual outcomes. Post-call receipts are independent evidence, not a prerequisite for an already-confirmed booking. Provider failure must not turn success into a false claim or trigger repeated external sends.

## Demo and next milestone

Use [the demo runbook](docs/DEMO.md). The local workflow is ready to exercise. The next milestone is an actual configured ElevenLabs conversation calling a protected tool, followed by one consented allowlisted SMS test. Neither is claimed complete without account-level verification.

Production gaps: multi-tenant auth/RBAC, rate limiting, retention/deletion tooling, provider data agreements, verified domain-language quality, calendar synchronization, SMS delivery callbacks, monitoring, deployment hardening, and jurisdiction-specific review. Do not load customer data or expose this as a production service.

Build notes and research were prepared during the permitted event window; earlier alternative project plans remain local and are not included in this submission repository.

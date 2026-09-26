# Front Desk Canada — Project Spec

## What this project is

Front Desk Canada is a prototype front desk for a fictional plumbing and heating business. It helps a small team collect service inquiries, show example price ranges, offer appointment times, and keep a record of what happened.

In plain English: the website is the screen the owner uses, the Python server handles the rules, and a local database remembers inquiries and bookings. An optional voice provider can call the server's tools. This is a demo, not a real contractor or a production service.

## Who it is for

- **Business owner:** reviews inquiries, appointments, call receipts, and follow-up flags in a private dashboard.
- **Caller:** can give an inquiry through the manual form or, when configured, a voice agent.

The demo business is fictional: Grand River Plumbing & Heating. Its technicians, contact details, prices, and calendar are examples.

## Current tech stack

| Part | Technology | What it does |
|---|---|---|
| Server language | Python 3.11+ | Runs the backend application. |
| Web framework | FastAPI | Defines the web pages' API routes, validates requests, and serves the app. |
| ASGI server | Uvicorn | Starts the FastAPI app so a browser can connect to it. |
| Input validation | Pydantic 2 | Checks that incoming data has the expected fields and formats. |
| Database | SQLite via Python's built-in `sqlite3` | Saves inquiries, bookings, events, and messages in a local file. No separate database server is needed. |
| Browser UI | HTML, CSS, and plain JavaScript | Displays the owner dashboard and forms. There is no frontend framework or JavaScript build step. |
| Configuration | `python-dotenv` and environment variables | Loads local settings such as database path and integration credentials from `.env`. |
| Voice integration | ElevenLabs Python SDK (optional) | Supports an external voice agent, protected tool endpoints, and signed post-call webhooks when configured. |
| SMS integration | Twilio (optional adapter) | Can send confirmation texts only when live sending is explicitly enabled and the recipient is allowlisted and has consented. |
| Automated checks | pytest | Runs the project's Python tests. |

Pinned Python package versions are listed in `requirements.txt`. The repository currently has no Node package manifest, frontend framework, container setup, or external calendar integration.

## Main features

- Private owner dashboard with inquiries, bookings, activity, and call receipts.
- Manual inquiry entry with validation and a consent checkbox before saving contact details.
- Illustrative CAD price ranges from a server-side rate card; these are not binding quotes.
- Availability from a local demo calendar, with a database constraint that prevents two bookings from taking the same slot.
- Booking only after the caller's confirmation, with human review required for emergencies and unpriced work.
- Optional voice-agent tools and verified ElevenLabs post-call receipts.
- SMS preview by default; live SMS is an opt-in integration.
- Interactive campaign-studio demo that drafts sample social, SMS, and booking-link copy in English, French, and Mandarin. Language review and campaign launch are browser-only simulations; no ads are published and no marketing SMS is sent.
- `/demo#campaigns` (or `/?demo=1#campaigns`) is an account-free recording mode with temporary fictional browser data. An activated campaign opens a scripted English, French, or Simplified Chinese customer journey alongside an English owner handoff. The customer explicitly chooses storage consent, fictional contact details, confirmation-SMS consent, and a Toronto appointment window, then confirms a readback. The result shows the local-demo appointment, unsent localized SMS preview (or no-preview choice), and timeline. Reset or reload starts a fresh take; the owner database is not accessed.
- Synthetic demo scenarios that write fictional records to the local database but do not place calls or send texts.

## Important limits

- The business, people, service prices, and calendar are fictional.
- The calendar is local demo data; it is not connected to Google Calendar or another scheduling service.
- The app does not dispatch emergency help, place outbound calls, take deposits, or process payments.
- Language settings describe which languages may be selected; they do not prove translation quality or fluency.
- Voice and SMS need provider accounts and configuration. Do not claim they are live unless they have actually been configured and verified.
- Campaign-studio translations and results are demo content. They are not independently reviewed, sent, published, or connected to real campaign analytics.
- Customer conversations are bounded paired fixtures, not live AI, speech processing, or arbitrary translation. The contact fixture is always Lin at a fictional Waterloo address. Custom campaign area names are preserved verbatim and labelled as untranslated; service-area eligibility is not validated.
- The connected campaign/journey model exists only in recording mode. It is not a backend schema migration or an integration with the owner database.
- This prototype is not ready for real customer data or production use. See the README for known production gaps.

## Recording-mode data and transitions

`static/demo.js` is the sole source of simulated business state. The UI keeps only selection and form state; it sends in-memory requests to the adapter. `/demo/campaign/*` and `/demo/journey/*` are adapter command names, not server endpoints. Recording-mode requests fail closed if the adapter is unavailable; they must not fall through to owner APIs. Fonts use local system fallbacks. The optional voice widget remains unavailable in recording mode.

- **Campaign:** stable ID, title, service, area, languages, formats, creation time, offer revision, approval/activation timestamps, and `draft → approved → demo-active` state. Editing invalidates approval immediately; saving requires review again. Existing journeys retain their original offer snapshot. New campaign creates a separate offer and attribution scope.
- **Journey:** stable ID, campaign ID, offer snapshot/revision, selected language, progress, gathered facts, paired original/English turns, selected slot, lead ID and booking ID. One journey per campaign/language per take; opening again resumes it. Only supplied fixture facts enter the owner summary. Steps are service → storage consent → contact → SMS choice → slot → readback confirmation → complete. Storage-consent refusal creates no lead or appointment.
- **Lead:** existing intake fields plus optional campaign/journey IDs, original customer text and English summary. `source='simulation'` remains separate from attribution. Manual inquiries and one-click scenarios are unattributed. Campaign inquiries open their existing journey from the inquiry list.
- **Booking:** unique per lead and slot, explicitly confirmed, with campaign/journey IDs copied from the lead. Availability excludes expired or reserved slots. Future weekday slots are generated in Toronto time, independently of the browser's timezone.
- **Message:** unique per booking, customer language, campaign/journey IDs, localized service/window/technician text, `status='preview'`, `sent=false`. Requires confirmation-SMS consent, which does not imply marketing consent. A preview failure does not undo a booking; the outcome offers a retry.

Campaign results are computed from associated records: journeys opened, inquiries captured, confirmed appointments and prepared previews. These are demo records, not unique people, clicks or real conversions. Illustrative booked value sums catalog estimates for confirmed attributed bookings only (maintenance C$250, leak C$450, water heater C$1,500). It is neither revenue nor causal ROI. No conversion percentage is shown. Repeated navigation, resumed journeys, booking retries, SMS retries and callback requests do not create duplicate outcomes.

No animation advances the journey. Reset clears the adapter, selected records, forms, dialogs and toast timeout; reload recreates the adapter. Emergency and unsupported manual/scenario inquiries remain human-review-only, with no dispatch. The authenticated backend and provider rules remain unchanged.

## Where things live

| Path | Contents |
|---|---|
| `app/main.py` | FastAPI app, routes, and authentication checks. |
| `app/models.py` | Request data shapes and validation rules. |
| `app/store.py` | SQLite schema and business rules for leads, quotes, bookings, and activity. |
| `app/config.py` | Settings loaded from environment variables and `.env`. |
| `app/providers.py` | Optional SMS delivery behavior. |
| `static/index.html` | Dashboard page structure. |
| `static/style.css` | Dashboard appearance and responsive layout. |
| `static/app.js` | Browser interactions and API calls. |
| `static/demo.js` | Isolated browser data for the `/demo` recording flow. |
| `agent/` | Voice agent prompt and business knowledge. |
| `scripts/tool_manifest.py` | Lists tool endpoint descriptions. |
| `tests/` | Automated tests. |
| `docs/` | Research, integration, demo, and verification notes. |

## Running it locally

You need Python 3.11 or newer. From the project folder:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Then open <http://127.0.0.1:8000>. The default database file is `data/frontdesk.sqlite3`. Copy `.env.example` to `.env` to customize settings. Keep real secrets in `.env`; do not commit them or paste them into source files.

## How to check changes

Run checks only when the user explicitly requests testing or verification. The connected recording-flow implementation was source-reviewed, not executed or browser-tested. Existing checks are not evidence that this extension works. When authorized, the existing commands include:

```sh
.venv/bin/python -m pytest -q
.venv/bin/python -m scripts.tool_manifest
```

These checks do not place calls or send messages.

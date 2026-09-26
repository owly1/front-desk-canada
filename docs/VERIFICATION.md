# Verification checkpoint — September 26, 2026

## Passed locally

- 17 automated tests: `.venv/bin/python -m pytest -q`.
- JavaScript syntax: `node --check static/app.js`.
- Git whitespace checks.
- Browser: localhost owner bootstrap; empty-state overview; synthetic English booking; manual fictional intake; unchecked confirmation prevents booking; checked confirmation persists an appointment; SMS preview; reload persistence; no browser console errors observed.
- UI polling preserves an in-progress language choice rather than resetting it.
- Python tool-manifest generation runs without credentials or network access.

The automated suite uses temporary SQLite databases and mocked SMS provider responses. Signature tests use locally signed webhook fixtures. These are not evidence of live provider integration.

## Not yet verified

Real ElevenLabs agent configuration/tool invocation; multilingual speech quality; real Twilio inbound call; actual SMS receipt; provider recording/retention; payment integration; external calendar synchronization; production deployment; real customer demand or savings. No claims of completion are made for these gates.

## Known limitations

The dependency stack emits a Starlette/httpx TestClient deprecation warning. Local tests pass. The UI uses optional Google Fonts with system-font fallbacks; voice loads the external provider widget only on explicit activation. Call status reflects signed provider receipts, not independent audio-quality evaluation. This is a single-owner demo, not a hardened production SaaS.

# Instructions for Claude

Before changing this project, read `spec.md` and `README.md`. They describe what the app does, its technology choices, setup, and known limitations.

## Project basics

- Backend: Python 3.11+, FastAPI, Uvicorn, and Pydantic 2.
- Data: SQLite through Python's built-in `sqlite3`; keep database behavior in `app/store.py`.
- Frontend: plain HTML, CSS, and JavaScript in `static/`. There is no frontend framework or build step.
- Optional providers: ElevenLabs for voice and Twilio for SMS. They are not automatically active just because their code exists.
- The Campaign Studio in `static/` is a browser-only demo: its language drafts, approval, and launch state are simulated. Do not imply it publishes ads or sends marketing SMS.

The `/demo` route uses `static/demo.js` for temporary fictional browser state. Keep this mode isolated from owner APIs and provider calls.

Campaigns, localized scripted journeys, lead attribution, booking outcomes and results all belong to that adapter. Do not introduce a second mutable business-state store in the UI. Preserve paired original/English fixtures, explicit storage and confirmation-SMS consent, offer snapshots, stable journey IDs and record-derived counters. These are sample translations, not live AI output. Keep externally hosted fonts and provider widgets out of recording mode.

## Working rules

- Follow the existing project structure and keep changes as small as the task allows.
- Validate inputs on the server with the existing Pydantic models and enforce business rules in backend code. Do not trust browser checks alone.
- Keep quotes, availability, booking decisions, and persisted state server-controlled. The voice model must not invent prices or write directly to the database.
- Preserve consent requirements, owner/agent authentication boundaries, booking confirmation, duplicate/replay protections, and emergency human-review behavior.
- Treat all demo names, phone numbers, addresses, prices, and calendar entries as fictional. Do not add real customer information.
- Never put credentials in source code, documentation examples, or committed files. Use environment variables and `.env` locally; keep `.env` untracked.
- Do not describe a provider integration as live unless it has been configured and verified. Demo scenarios must not trigger real calls or messages.
- Keep documentation honest about what is implemented, simulated, and not supported. Check `docs/` and the README before changing claims.
- Avoid adding a new framework or dependency when the existing stack can handle the task. If a dependency is necessary, explain why and update `requirements.txt` (or the appropriate manifest).

## Before finishing a code change

- Review the changed files and make sure the implementation matches `spec.md`.
- Do not run or add tests unless the user explicitly requests testing or verification. Source review is not a runtime check. Report exactly what was inspected or executed, and do not claim unexecuted behavior passed.
- Update `spec.md` or the README when a change materially alters the stack, behavior, setup, or limitations.

# Front Desk Canada — Implementation Megaprompt

Use the following prompt to implement the next version of this project.

---

You are working in the existing Front Desk Canada repository. Upgrade its interactive hackathon demo so viewers can follow one customer from a multilingual promotion to a confirmed appointment and an SMS preview, while the business owner receives an English summary and sees which campaign generated the booking.

Implement this in the existing application. Finish the connected experience and update its documentation. Make routine design and implementation decisions autonomously. Preserve existing user work.

## 1. Read the project before editing

Read applicable AGENTS.md instructions, spec.md, claude.md (or CLAUDE.md if present), README.md, docs/DEMO.md, and the relevant application files.

The current stack is Python 3.11+, FastAPI, Pydantic 2, SQLite, and vanilla HTML/CSS/JavaScript. Keep this stack. No frontend framework, build pipeline, translation service, paid API, or provider credentials are needed for this task.

Relevant files:

- static/index.html: dashboard and forms.
- static/style.css: visual styles and responsive layout.
- static/app.js: UI, campaigns, inquiry and booking interactions.
- static/demo.js: temporary fictional browser state for /demo and ?demo=1.
- app/main.py, app/models.py, app/store.py: authenticated owner workflow and backend rules.
- app/providers.py: optional SMS adapter.

Existing functionality includes campaign templates in English, French, and Mandarin; a campaign appointment button that prefills intake; slot confirmation; SMS previews; and demo reset. Extend these features instead of creating a disconnected second application.

## 2. Product story and scope

The fictional business is Grand River Plumbing & Heating in Waterloo, Ontario. The owner is busy completing service jobs and wants to reach and serve customers who prefer another language.

Our core promise for this prototype:

“Turn a multilingual promotion into a booked service appointment, with a clear English handoff for the owner.”

The primary recording follows a Mandarin-speaking customer responding to a maintenance promotion. English and French should support the same journey. Reuse the current service catalog and illustrative CAD prices. Use existing maintenance, leak assessment, and water-heater categories rather than inventing unsupported services or discounts.

The UI must genuinely work as an interactive simulation. All customer records, conversations, appointments, marketing activity, and messages in recording mode are fictional. No real ad publishing, phone calls, text delivery, payments, or external scheduling is required.

## 3. Feature A — One offer becomes multilingual campaign previews

Extend Campaign Studio so the owner selects a supported service, service area, and languages and generates coherent previews for social, SMS, and a booking card.

- Keep template-based generation deterministic and offline. Label outputs as sample drafts.
- Give each campaign a stable ID, title, service, area, languages, creation time, and draft/approved/demo-active status.
- Review and activation must be clear user actions. Editing the offer invalidates prior approval.
- Provide English, French, and Simplified Chinese copy for the supported fixture content. Keep proper names, offer details, prices, and dates consistent across versions.
- Use “Open customer preview” as a clear next step from the selected language. The customer preview must retain that campaign and language.
- Do not describe marketing SMS drafts as sent or imply that appointment-message consent permits promotional messaging.
- If arbitrary free text is allowed, preserve it honestly and identify content without a translated fixture. Do not fabricate a translation by relabeling English.

## 4. Feature B — Customer language and owner language side by side

Build a customer experience accessible from the campaign preview, alongside or easily switchable to an owner handoff panel.

Customer side:

- Display the selected campaign and a short scripted inquiry in the chosen language.
- Let the user advance the conversation using localized quick replies or clear step controls. No microphone is required.
- Gather the supported service need, fictional location/contact details, preferred appointment window, and explicit confirmation.
- Localize customer-facing labels, replies, booking readback, and final confirmation, not only the opening message.
- Show a persistent “Scripted demo” label. Any optional animation must be skippable and respect reduced-motion settings.
- Prefer deterministic fixture choices; arbitrary input must never produce a false claim of understanding or translation.

Owner side:

- Show an English summary describing the same customer, service, location, selected window, and next action.
- Identify the original customer language and originating campaign.
- Make it possible to view the original customer text next to its paired English fixture summary.
- Update the summary as the user progresses. Never introduce details absent from the customer interaction.
- Label paired text as sample translations, not independently verified live AI translation.

The memorable demonstration moment is: a Mandarin customer inquiry becomes a useful English owner summary, followed by a matching appointment and Mandarin SMS preview.

## 5. Feature C — Track the campaign through the booking

Extend the recording-mode data model with explicit relationships:

- campaign: id, title, service, area, languages, approval and activation state.
- journey: id, campaign_id, selected language, progress, paired conversation fixtures.
- lead: existing fields plus campaign_id and journey_id where applicable, customer-language text, and English owner summary.
- booking: retain the lead relationship and recover its campaign and journey reliably.
- message preview: retain the booking relationship and language.

Preserve source='simulation'; campaign attribution is separate metadata. Manual inquiries may have no campaign. Do not attribute unrelated records to the last active campaign.

Show a compact campaign results panel:

1. Customer journeys opened.
2. Inquiries captured.
3. Appointments confirmed.
4. SMS previews prepared.

Calculate every count from the current demo state or deduplicated events. Refreshing a panel, navigating back, or clicking a completed action twice must not increase counts. Opening the same journey repeatedly must not create fake visitors. Clearly define these as demo journeys, not unique real people.

Show estimated booked value only for confirmed bookings using existing catalog values. Label it “Illustrative booked value,” never actual revenue, recovered revenue, or proven ROI. Omit conversion percentages when there is no denominator. Attribute each appointment visibly to its campaign and language.

## 6. Feature D — A visible completed outcome

Complete the journey with a concise result screen containing:

- Confirmed local-demo appointment, date, time, Toronto timezone, service, and fictional technician.
- English owner summary with source campaign and customer language.
- SMS preview in the selected customer language, with an explicit “Not sent” status.
- A timeline linking campaign → inquiry → confirmed appointment → SMS preview.
- Actions to view the appointment, return to campaign results, or reset the demo.

Keep booking confirmation explicit. Require the existing SMS consent before generating a confirmation preview. If consent is declined, finish the booking successfully and show “SMS preview not requested.” A message failure must not erase a successful booking.

Keep existing availability constraints, duplicate-booking protections, human callbacks, and emergency review behavior. Emergency or unsupported work must lead to human review and must not automatically book or imply dispatch.

## 7. Reliability and presentation

- /demo#campaigns must work without owner login or provider setup.
- All new simulated customer state belongs in the recording-mode adapter. No owner database mutations, external network calls, fake signed call receipts, or provider calls.
- Maintain one coherent source of demo state so Campaign Studio, inquiries, appointments, summaries, and metrics stay synchronized.
- A second campaign must not overwrite the attribution of the first campaign's inquiries or bookings.
- Reset clears campaigns, journeys, leads, bookings, previews, counters, dialogs, and pending animation work. Reload begins a clean take, consistent with current demo behavior.
- Use accessible native controls, keyboard focus, meaningful labels, legible type, clear empty states, and layouts usable at desktop recording size and mobile width.
- Keep the current visual identity. Use restrained transitions and readable customer/owner panels.
- Escape user-provided text or render it with textContent. Keep fictional contact information throughout.
- Use unobtrusive but persistent demo labels. Put developer configuration details in settings rather than the customer journey.
- Do not add stock charts, fabricated customer testimonials, fake call waveforms, or invented traction.
- Preserve the authenticated owner workflow. Shared UI changes must handle missing demo-only fields gracefully.

## 8. Implementation sequence

1. Inspect the current data flow and identify the smallest coherent extension.
2. Implement campaign IDs, journey state, attribution, and deduplicated metrics in the demo adapter.
3. Extend Campaign Studio and connect it to the localized customer journey.
4. Add paired customer text and English owner summaries.
5. Connect existing confirmation and SMS-preview actions to the outcome screen.
6. Refine responsive layout, navigation, reset, and error states.
7. Update spec.md, agent instructions as needed, and docs/DEMO.md to describe actual behavior and limits.

Do not run or add tests unless the user explicitly requests testing or verification. The checklist below defines implementation requirements; it does not claim that checks have been performed. Report exactly what was inspected or executed and any remaining uncertainty.

## 9. Acceptance requirements

- Starting from /demo#campaigns, a user can create and activate a sample campaign and complete the Mandarin customer journey without editing code or configuring accounts.
- French and English follow the same path with consistent content.
- Customer text and English summary agree on all material details.
- The booking and SMS preview match the chosen language, service, and appointment.
- Campaign counts reflect completed actions and remain stable on repeated navigation or clicks.
- Two campaigns retain distinct attribution; manual leads remain unattributed.
- Declining SMS consent still permits a booking and prevents preview generation.
- Unsupported or emergency inquiries end in human review.
- Reset and reload return to a clean demo, without stale timers restoring old content.
- The recording experience does not contact owner APIs or external providers.
- No UI claims ads were published, messages delivered, or real revenue earned.

## 10. Recording script to deliver

Update docs/DEMO.md with a click-by-click 90–120 second script:

- 0–15 seconds: Introduce the fictional Waterloo owner and the language barrier.
- 15–35 seconds: Create one maintenance promotion; show English, French, and Mandarin versions.
- 35–65 seconds: Open the Mandarin customer preview; progress through the inquiry while the English owner summary appears.
- 65–90 seconds: Select a slot, confirm details, and prepare the consented Mandarin SMS preview.
- 90–110 seconds: Show the campaign-attributed appointment, accurate demo counts, and completed timeline.
- Final seconds: Explain what is interactive, what is simulated, and what a future real-business pilot would measure.

Finish with a concise summary of changes, how to open the demo, what remains simulated, and any unverified behavior. Do not claim hackathon victory, guaranteed novelty, or production readiness.

## 11. Research informing these choices

Use these as design references, not assets or branding to copy:

- NailedIt.ai — Best use of Valsea API, Cursor Hackathon Toronto Tech Week 2026. Specific immigrant-business persona, English/Vietnamese reception, and appointment workflow. https://devpost.com/software/nailflow-ai-lfw371
- AMUSH / AI Multilingual Shopping Host — Seoul second place, ElevenLabs Worldwide Hackathon 2025. Simple input leading to localized promotion and multilingual support. https://devpost.com/software/ai-multilingual-shopping-host
- Dealwise — San Francisco first place at the same event. Calls produce visible quote results and a clear customer outcome. https://devpost.com/software/john-ai
- Procuro — New York second place at the same event. Concrete operational bottleneck and visible business actions. https://devpost.com/software/procuro
- GibberLink — Global top prize at the same event. A memorable, immediately understandable demonstration. Borrow the clarity of the reveal; no agent-to-agent audio protocol is needed here.
- Organizer confirmation of ElevenLabs awards: https://elevenlabs.io/blog/announcing-the-winners-of-the-elevenlabs-worldwide-hackathon

The feature lessons are design inferences. They are not published scoring rubrics or proof that these features alone caused the awards.

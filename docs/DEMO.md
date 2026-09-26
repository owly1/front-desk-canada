# Demo runbook and pitch guardrails

## Open the connected recording demo

With the existing local server running, open **http://127.0.0.1:8000/demo#campaigns**. No owner account, microphone, API key or provider setup is needed. `/?demo=1#campaigns` selects the same adapter.

This is an interactive **scripted demo**, not a live AI call. Campaigns, customer turns, inquiries, appointments and unsent message previews exist only in browser memory. The page loads local assets; recording actions do not access owner APIs, publish ads, place calls, send texts or dispatch technicians. The business, contacts, rate card and calendar are fictional. Reload and **Reset demo** both clear the take.

The connected extension has been implemented and source-reviewed only. No tests were added or run, and no browser, syntax, server or provider execution was performed for this update, in accordance with the implementation brief. The following is a proposed recording script, not a record of a successful rehearsal. Runtime behavior, accessibility and responsive layout remain unverified.

## 90–120-second recording: promotion → appointment

Use a desktop-width window for the customer and owner panels side by side. On narrow screens the owner panel follows the customer panel. Keep the persistent scripted-demo label visible. The primary fixture uses Mandarin / Simplified Chinese; French and English use the same steps.

### 0–15 seconds — one Waterloo owner

Open Campaign Studio. Say:

> “Our fictional Waterloo plumber is busy doing the work. A customer prefers Mandarin. Front Desk Canada connects one multilingual promotion to a confirmed demo appointment, with a clear English handoff for the owner.”

Frame **Growing Canada** as a hypothesis about small-business capacity and access, not a claim of measured GDP or revenue growth.

### 15–35 seconds — one offer, three language drafts

1. Leave **Seasonal plumbing checkup**, **Waterloo Region**, all three languages and formats selected.
2. Click **Create campaign previews**.
3. Show the **EN**, **FR**, and **中文** tabs. Optionally switch **Social post**, **SMS draft**, and **Booking link**.
4. Explain that C$140–C$350 is an illustrative maintenance range, not a binding quote. The catalog's C$250 estimated booking value is not a discount or payment.
5. Check **I reviewed these drafts…**, then click **Activate sample campaign**. Return to **中文** if necessary.
6. Click **Open customer preview**.

Say: “These are bounded sample translations, not a live translation model. Nothing was published or sent.” The checkbox is a demo approval action, not proof that a fluent reviewer has certified the translations.

### 35–65 seconds — Mandarin customer, English handoff

Click the following localized replies in order:

1. **预约此服务** — request this service. The owner summary now contains the maintenance need, but no invented contact details.
2. **同意为此次咨询保存我的资料。** — consent to storing the fictional details.
3. **使用以下虚构资料** — use Lin's example phone and Waterloo service address. Show those same facts appearing in the English handoff.
4. **需要，请准备预约确认短信预览。** — request a confirmation-SMS preview. Explain that this does not authorize marketing SMS.
5. Briefly open **Original text ↔ paired English fixture** on the owner side to show the preserved original alongside its sample English text.

Say: “The owner gets the same facts in English, including the originating campaign—not a separate, invented summary.”

### 65–90 seconds — explicit confirmation, visible outcome

1. Select one available two-hour window. Dates vary with the current Toronto date; do not hard-code a date in narration.
2. Show the localized readback: Lin, the fictional Waterloo address, maintenance, selected window and fictional technician.
3. Check **我确认以上信息和预约时段。**
4. Click **确认演示预约**.
5. Show the confirmed local-demo appointment and **预约确认短信预览**, labelled **未发送** (Not sent). The SMS contains the same service, window, Toronto timezone and technician.

No technician is actually scheduled to attend. If consent was declined at the SMS step, the booking still completes and displays **未申请短信预览** / “SMS preview not requested.” If preview generation fails, the appointment remains confirmed and a preview-only retry is offered.

### 90–110 seconds — close the attribution loop

1. Show the completed timeline on the result screen.
2. Click **查看预约** (View appointment). Show the originating campaign, Mandarin language and local appointment. Click **View journey & outcome** to return.
3. Click **推广结果** (Campaign results).
4. For this single completed take, the intended record-derived result is **1 demo journey, 1 inquiry, 1 confirmed appointment, 1 SMS preview** and **C$250 illustrative booked value**. With SMS declined, the final count is **0 previews**, not 1. These expected values have not been runtime-verified for this update.

Do not call journeys real visitors, or estimated value revenue, recovered sales or proven ROI. Reopening the same language journey resumes it without another visitor-like increment.

### Final seconds — honest boundary and next pilot

> “This recording demonstrates a working-interface design with scripted translations and fictional browser data—not live AI or messaging. A real-business pilot would measure correctly completed bookings, owner coordination time, language quality, errors and cost.”

Do not imply a live phone call by adding call audio or editing away consent/error states. Confirm the current official submission duration and rules separately before exporting or submitting.

## Continuing a take

- **Campaigns in this take** selects existing campaigns. **New campaign** creates a distinct attribution scope; choose leak assessment or water-heater service for another offer.
- Each campaign/language combination has one resumable journey per take. There are no inferred unique people or conversion percentages.
- Editing any offer field immediately invalidates approval. **Save updated previews**, review and activate again. Existing journeys retain their original service, area and offer revision; create a new campaign to demonstrate a different offer in the same language.
- Custom area names are preserved verbatim, not automatically translated. The customer contact fixture remains in Waterloo. This prototype does not validate service-area eligibility.
- **Inquiries** opens campaign leads back into their journey. Unattributed manual inquiries retain the existing intake/booking dialog; they are never assigned to the last active campaign.
- Owner-side **Flag for owner** and **Request human callback** record follow-up only; they place no call.
- **Reset demo** clears all campaigns, journeys, leads, bookings, previews, forms and open dialogs. It returns to Campaign Studio. There is no timed conversation animation that can restore old state.
- **Try a scenario → A bigger project / An urgent request** retains human-review-only handling, with no automatic booking or dispatch. These one-click synthetic examples are not the campaign journey.

## Existing database-backed owner workflow

The owner workflow remains at `/`, behind the existing session boundary. It is separate from browser recording state. **New inquiry** requires storage consent; slot booking requires an explicit confirmation; SMS previews require consent. Unsupported and emergency work stays with a person. Local scenario buttons write synthetic records to SQLite, not live call receipts.

The optional ElevenLabs widget and signed post-call receipt integration require account configuration. Twilio sending requires explicit enablement, credentials, recipient allowlisting and consent. None of those integrations was activated in this update. Call receipts are never fabricated by a scripted journey.

## Growth case and tough questions

**Why is this a Canadian growth problem?** The hypothesis is that small service teams can reduce coordination overhead and serve customers across language barriers. The immediate test is correctly completed work and owner time—not attributing all transferred bookings to new Canadian GDP.

**Why not Jobber or an existing receptionist?** Existing tools already answer and book. This narrow multilingual campaign-to-handoff workflow must demonstrate an advantage for a particular operator; that advantage is not established.

**Why hasn't it been solved correctly?** Parts have been solved. Remaining hypotheses concern domain/language quality, reliable handoffs, setup effort and adoption cost. Do not claim to have invented AI reception.

**What is real here?** The UI and in-memory record transitions are implemented; inputs, translations, campaigns, calendar and message previews are fictional. The backend owner workflow exists separately. The new extension has not been runtime-verified.

**What has not been proved?** Translation quality, production reliability, customer adoption, causal revenue growth, unit economics and competitive advantage.

## Submission responsibilities

The team handles registration and final submission. Confirm official event requirements before preparing the final public repo, reproducible README, appropriately captioned video and slides. Keep credentials and personal data out of the repository. Report actual verification evidence only; this update does not add a test-passed claim, organizer endorsement or guaranteed award.

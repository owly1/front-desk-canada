# Pitch blueprint: a multilingual service workspace

Prepared September 26, 2026. **Creative direction updated for a video-first submission:** show the complete intended experience through staged dialogue and designed screens. Implementation readiness does not limit the vision. Claims about real customers, measured results and functioning integrations must still match the evidence.

This is a script and presentation blueprint, not a completed deck or rendered video. Use the team's chosen product name; “multilingual service workspace” is a description.

## Event fit and submission context

AF Hacks: Growing Canada is scheduled for September 26–27, 2026 in Waterloo. Its published criteria cover theme relevance, project viability, and presentation quality; weights were not verified. Connect the idea to Canadian service businesses completing more useful work and serving more customers. Do not claim a measured national productivity effect. [Current Devpost event](https://ascendance-foundry-s-hackathon.devpost.com/)

The public listing requests a maximum five-minute video **and a public GitHub repository**, with changes merged into main, by noon September 27. It lists C$2,000 for the winning team and a separate ElevenLabs award of three months of Scale per member. Your updated briefing may reflect organizer guidance on demo expectations; the public listing does not itself establish that a purely conceptual entry qualifies for the sponsor prize. This research does not require a working bridge or publish the repository. [Organizer listing](https://luma.com/asvdo3m9)

No previous AF Hacks winners were verified for this edition. The comparative research uses other events and keeps overall, city, online and sponsor awards separate.

## Positioning and narrative

**One sentence:** We are designing a multilingual service workspace that helps employees turn conversations across languages into agreed actions, starting with visitor bookings.

**Vision:** a customer can discover a service, speak with staff, change details, move between employees, and receive the same confirmed outcome in their own language.

**Initial commercial promise to investigate:** help a tour operator complete more correctly understood bookings with its existing staff. A broader product vision and a specific first buyer can coexist.

### Three opening hooks

1. **Transaction:** “A visitor is ready to buy. Your employee is ready to help. Can they agree on the same date, price and meeting point?”
2. **Continuity:** “Imagine explaining your request in another language—and having to start again every time a new employee joins.”
3. **Growth:** “Canadian businesses already welcome customers from around the world. We want their service conversations to travel across languages too.”

Use the first with the actual demo actors. Do not invent a statistic about sales lost to language barriers.

## Eight-slide, five-minute structure

Times total **300 seconds**, including a 75-second concept film. Target a 4:45 final edit to leave export/transition headroom. The time boxes below are maximum allocations, not a reason to fill every second with speech.

### Slide 1 — “A visitor is ready to book.” · 0:00–0:25

- **One takeaway:** understanding the transaction is the problem worth solving.
- **On-slide text:** “Different languages. One booking to get right.” Small caption: “Initial focus: tour and attraction desks.”
- **Visual:** customer and employee, with date/party size/price/meeting point between them. Avoid a giant global market statistic.
- **Evidence:** this is a staged customer scenario and buyer hypothesis; prospective operators are documented in the prospect database. Tourism activity provides context, not proof of lost sales.
- **Speaker notes:** Introduce the two roles. Explain that a greeting can be translated while important changes remain unclear. State the intended benefit without asserting measured uplift.
- **Judge objection answered:** “Who has this problem, and what task matters?”

### Slide 2 — “Watch the conversation become an agreement.” · 0:25–1:40

- **One takeaway:** translated speech connects to a shared, corrected transaction.
- **On-slide text:** mostly the concept film; opening caption “Concept demonstration — staged dialogue; simulated integrations.”
- **Visual:** paired language views, a single booking card, one visible correction and a short staff handoff. Show both human roles.
- **Evidence:** only the proposed experience is demonstrated. Label any independently working component if shown. See exact storyboard below.
- **Speaker notes:** “Here is the experience we want to make possible.” Let the interaction carry the story; avoid narrating over translated dialogue.
- **Judge objection answered:** “What would using this actually feel like?”

### Slide 3 — “The agreement travels with the customer.” · 1:40–2:10

- **One takeaway:** the broader vision preserves useful context across a service journey.
- **On-slide text:** “Discover → Converse → Confirm → Continue.” Footer: “Booking systems and staff handoff: proposed integrations.”
- **Visual:** zoom out from the booking card to a multilingual entry page, second employee and receipt. A separate dotted branch identifies a future after-hours AI agent.
- **Evidence:** product proposal. Architecture uses recognition → translation → generated speech plus application state; ElevenLabs documents relevant streaming voice components. [Speech Engine](https://elevenlabs.io/docs/overview/capabilities/speech-engine)
- **Speaker notes:** Explain that the employee owns the offer; the customer approves the details. Another employee receives the agreed state and open question. Briefly locate ElevenLabs in the speech layer and transaction logic in our application.
- **Judge objection answered:** “What is the product beyond a single translated exchange?”

### Slide 4 — “Start where a clear booking has value.” · 2:10–2:40

- **One takeaway:** a specific buyer makes the growth vision testable.
- **On-slide text:** “First buyer: tour operator / attraction manager.” “Next: hospitality reception.” “30 prospects identified · 0 customer commitments.”
- **Visual:** Toronto/Waterloo map with neutral prospect markers. Do not use business logos in a way that implies a partnership.
- **Evidence:** the prospect database links 30 organizations and their public offerings. ISED counts broad business categories, not qualified buyers. [Ontario travel-services establishments](https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/5615?wbdisable=true)
- **Speaker notes:** Describe owner/operations purchasing and staff use. Explain that guided activities must still be deliverable in a language the visitor understands. Ten discovery interviews come before calling this validated demand.
- **Judge objection answered:** “Who pays, and how will you reach them?”

### Slide 5 — “Earn the purchase through the workflow.” · 2:40–3:15

- **One takeaway:** we must establish a reason to pay beyond basic translation.
- **On-slide text:** “Free translators: strong baseline.” “Business voice tools: established competition.” “Our hypothesis: shared confirmation + continuity + supported setup.”
- **Visual:** a three-row comparison of buyer tasks, with “to validate” on our proposed advantages. Avoid unsupported checkmarks claiming competitors lack features.
- **Evidence:** [DeepL conversation workflow](https://support.deepl.com/hc/en-us/articles/17090280797596-Translate-1-1-conversations), [Sanas translation](https://help.sanas.ai/docs/language-translation), [Slang restaurant agent pricing](https://www.slang.ai/pricing). Exact competitor evaluation remains pending.
- **Speaker notes:** Credit strong alternatives. Explain that customer-paid deployment and consistent task completion are the business hypothesis. A pilot compares against the operator's current tool, including Google Translate.
- **Judge objection answered:** “Why would anyone pay instead of using Google or DeepL?”

### Slide 6 — “Four additional bookings could cover the month.” · 3:15–3:50

- **One takeaway:** show a transparent economic hypothesis.
- **On-slide text:** “Proposed: C$199/location/month.” “Illustration: 4 × C$60 booking contribution = C$240.” “Base direct contribution: ~C$127/location/month.”
- **Visual:** simple buyer ROI and vendor cost bars. Footnote: “Hypothetical contribution; 300 included minutes; modeled costs; no measured sales uplift.”
- **Evidence:** detailed cost model in main report, with [ElevenLabs rates](https://elevenlabs.io/pricing/api) and [Google translation rates](https://cloud.google.com/products/translate/pricing). C$60 is assumed profit contribution, not a sourced ticket value.
- **Speaker notes:** Price includes 300 elapsed minutes; overage and onboarding are separate. Explain that only genuinely incremental bookings count. Support and integration costs can materially change the economics.
- **Judge objection answered:** “Can both the buyer and the company make money?”

### Slide 7 — “The next proof is a real operator's decision.” · 3:50–4:35

- **One takeaway:** viability comes from a specific validation sequence.
- **On-slide text:** “10 interviews → 3 supervised pilots → paid continuation.” “Compare: task completion, critical details, staff adoption, contribution.”
- **Visual:** three gates, with current position marked “research + concept.” Small separate strip: “Voice quality / transaction correctness / customer value.”
- **Evidence:** validation plan, not completed results. Current repository scope differs from the proposed human-to-human workspace. No prospect participation or language benchmark is claimed.
- **Speaker notes:** Briefly explain two directions of audio, explicit clarification, and recovery when a date or amount is unclear. Language errors should not silently become bookings. State the conditions that would make us change the concept.
- **Judge objection answered:** “What is real today, what is difficult, and how will you find out whether it works?”

### Slide 8 — “Help every good conversation become a clear next step.” · 4:35–5:00

- **One takeaway:** an ambitious service vision with a practical next ask.
- **On-slide text:** “Seeking: 3 operator introductions + feedback on the pilot.” Closing: “More customers understood. More service delivered.”
- **Visual:** two approved language views of the same booking, then the broader service-journey graphic.
- **Evidence:** proposed impact and request; no partner or national-productivity claim.
- **Speaker notes:** Connect the first pilot to Canadian firms serving visitors and multicultural communities. Ask for introductions and practical critique, rather than an invented funding round.
- **Judge objection answered:** “Why this event, and what happens after it?”

## The 75-second concept film

Use one fluent, reviewed language pair; the dialogue below is an **English meaning script**, not a supplied translation. Customer speaks the selected other language; staff speak English. Translated audio uses visibly identified roles and clear captions. Use fictional operator **Maple Harbour Experiences** and fictional inventory; no affiliation with any prospect is implied.

| Time | Picture and dialogue intention | Product depth revealed |
|---|---|---|
| 0–7s | Visitor sees “Ask us in [supported language]” on an operator page/sign and starts a session. Opening concept caption remains readable | Customer acquisition entry point; this is a proposed channel, not measured demand |
| 7–19s | Customer: “Can three of us take the harbour tour tomorrow afternoon?” Employee hears the translation | Human-to-human direction one; the staff member is visibly present |
| 19–31s | Employee: “The 3 p.m. tour has space. Three tickets are C$120 total.” Customer hears the translated reply | Direction two; approved fictional offer, tax-inclusive demo price |
| 31–44s | Customer: “Actually, four of us, on Sunday, September 27.” Card updates from three/C$120 to four/C$160 and shows date; superseded values are clearly removed | Context, correction and transaction consistency |
| 44–53s | Employee asks: “Please confirm: Sunday, September 27 at 3 p.m., four tickets, C$160 total?” Customer confirms | Critical fields read back, not inferred silently |
| 53–64s | Employee hands off a meeting-point question to a colleague. Colleague sees agreed details and the open question, then explains fictional Pier A; customer hears translation | Continuity and a useful staff handoff |
| 64–75s | Matching bilingual cards show date, time, four tickets, C$160, Pier A. Employee approves; confirmation ID appears with “simulated booking connector.” End on optional dashboard “illustrative data” | Observable outcome, integration status, and business feedback |

Production notes: use a shared-device or two-device UI consistently; avoid impossible simultaneous listening without showing routing. Preserve natural pauses but do not imply edited timing is measured latency. Keep the final details visible long enough to inspect. A concept film can be polished without fake system telemetry or fabricated customer testimonials. Do not add an autonomous agent to this short sequence; show it as an explicitly proposed extension elsewhere if needed.

## Two-minute pitch script

Approximately two minutes at a deliberate pace; rehearse to the actual video length.

“A visitor is ready to book. An employee is ready to help. But they still need to agree on the same date, number of tickets, price and meeting point.

We are designing a multilingual service workspace that helps them reach that agreement in their own languages.

In our concept, the visitor speaks and the employee hears a translation. The employee replies naturally. When the visitor changes the booking, both language views update the same confirmation card. If another employee takes over, the agreed details and remaining question move with the conversation.

That is our wider vision: a business can welcome a customer, understand their request, and carry it through to a clear action across languages and staff.

Our first customer hypothesis is tour and attraction operators in Toronto and Waterloo. They provide a concrete transaction and an identifiable buyer. We have identified thirty prospects; we have not secured customers.

Google and DeepL already provide strong translation. Our proposed advantage is the surrounding service workflow: confirmation, continuity and supported deployment. We need to prove that advantage against what staff use today.

Our pricing hypothesis is C$199 per location monthly. At a hypothetical C$60 contribution per additional booking, four genuinely incremental bookings could cover that fee. Neither willingness to pay nor sales uplift is validated.

ElevenLabs is a candidate for streaming recognition and spoken output. Translation, transaction logic and integrations remain distinct responsibilities.

The next step is ten interviews and three supervised pilots. We are seeking operator introductions to test whether this experience helps Canadian businesses serve more customers successfully.”

## Five-minute script with timed film

Use the slide schedule above. The spoken sections leave room for visual pauses; do not accelerate the film to force extra claims into five minutes.

**0:00–0:25 — Problem**

“A visitor is ready to book. Your employee is ready to help. They need to agree on a date, a price and where to meet. Now imagine making a change in a language the employee does not speak. We want both people to leave with the same understanding. Here is our proposed experience.”

**0:25–1:40 — Play the 75-second concept film.**

Use the scripted interaction above. No additional presenter narration over the conversation. The opening identifies it as a staged concept; the booking connector is explicitly simulated.

**1:40–2:10 — Product and ambition**

“The shared booking card is the beginning. Our vision connects the multilingual entry point, spoken conversation, confirmed details and the next employee who helps. A customer should not have to restart their explanation at every handoff. ElevenLabs can supply streaming voice components; translation, business rules and the booking connection are separate parts of the system we would build.”

**2:10–2:40 — Buyer**

“We would start with tour and attraction operators in Toronto and Waterloo, then evaluate hospitality reception. The buyer is an owner or operations manager; the user is frontline staff. We have identified thirty prospective organizations, not thirty customers. Our interviews will establish which operators face recurring language friction and can still deliver the full experience after a translated booking.”

**2:40–3:15 — Competition**

“Free translation is already strong. DeepL offers business conversation tools, and other providers handle translated calls or autonomous service. Our opportunity is to make the whole task easier: keep the current agreement visible, carry context to another employee, and fit the operator's existing process. That is a hypothesis to compare against their current tools. The business earns its subscription only if that added workflow is useful.”

**3:15–3:50 — Economics**

“We propose C$199 per location each month with three hundred conversation minutes. In an illustrative case, four additional bookings contributing sixty dollars each cover that monthly fee. Those are incremental bookings, not every translated interaction. Our base model leaves about C$127 per location after direct costs, support and processing. Integration effort and support demand are the largest commercial uncertainties.”

**3:50–4:35 — Proof and next step**

“Today's video communicates the intended experience; it does not establish production performance. We would conduct ten interviews, compare the workflow against current translation tools, and recruit three supervised pilots. We would measure critical booking details, completion, staff use and actual economic value. If a date or amount is unclear, the system must ask and pause confirmation. If existing tools work just as well, or operators will not pay, we change the proposition. A beautiful demonstration starts the conversation; an operator's repeated use and paid continuation would validate it.”

**4:35–5:00 — Close**

“The ambition is a multilingual service workspace for Canadian businesses serving customers from many communities and countries. The first proof is one useful booking workflow. We are asking for three operator introductions and feedback on that pilot. Help us make more customer conversations end with a clear, shared next step.”

## Ten likely judge questions

| Question | Answer supported by current evidence |
|---|---|
| 1. Why not Google Translate? | It is the baseline. Our proposed value is shared confirmation, staff continuity and integration. We have not yet demonstrated an advantage and would compare actual tasks before charging for that claim. |
| 2. Who pays? | The operator or property owner/operations buyer. Staff use the tool and customers benefit. C$199/location is a pricing experiment, not established willingness to pay. |
| 3. What happens when translation is wrong? | Retain inspectable original/translated text during the session, repeat critical fields, allow correction, and pause uncertain confirmation. Production needs fluent-speaker evaluation and clear scope; polished speech alone does not establish correctness. |
| 4. Why ElevenLabs? | Streaming recognition and speech generation are useful components with documented APIs. The decision still needs language/latency/cost evaluation; translation and business logic are ours to specify. We would accurately identify any ElevenLabs audio actually used in the film. |
| 5. Is Fish Audio five times cheaper? | There is no universal ratio: Fish's listed paid TTS uses UTF-8 bytes; ElevenLabs uses characters and different tiers. The main report models the distinction. Total conversation cost also includes recognition, translation and delivery. |
| 6. What is defensible? | Today, no established moat. Possible advantages would be reliable connectors, frontline adoption, deployment knowledge and distribution relationships. Incumbents can copy the interface. |
| 7. How will you acquire customers? | Founder interviews and three local pilots first; then investigate tourism networks and booking-system consultants. No partnership or acquisition cost is verified. |
| 8. Does it work today? | This film demonstrates a proposed experience with staged dialogue and simulated integrations. The existing repository is an intake/booking prototype; it does not validate this human-to-human bridge. We can identify any actual working components separately. |
| 9. How does this attract global customers? | Supported-language entry pages and partner referrals could bring inquiries; translation could improve conversion. Neither replaces discovery, fulfillment or service-language support. We would measure those stages separately. |
| 10. What would convince you to stop or change direction? | Rare qualifying interactions, no improvement over current tools, no paid continuation, or excessive support costs. Ten interviews and three pilots are learning goals, not guarantees of statistical proof. |

**Concise closing:** “We want every customer to reach a clear next step in a language they understand—and every business to know what was agreed.”

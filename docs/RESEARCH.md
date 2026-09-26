# AF Hacks: additional research and claim audit

Checked September 26, 2026. Evidence, team assumptions, and unverified claims are kept separate. This research precedes implementation; the build window has now opened.

## Event and rubric

The live [Devpost rules](https://ascendance-foundry-s-hackathon.devpost.com/rules), read in-browser, confirm two-person teams, approximately 50 participants, in-window building, three equally weighted 0–4 criteria (theme relevance, viability, pitch), and a first round of video/slides/repository followed by roughly ten live finalists. Capacity is not actual attendance or a quality measure. The live page displayed 20 participants; the gallery did not provide an entrant comparison in earlier research.

[Luma](https://luma.com/asvdo3m9) lists noon September 26 kickoff and noon September 27 submission in Waterloo, C$2,000 for the winning team, interviews for the top three, and a maximum five-minute video. The attached brief says two minutes; a 90–120-second cut fits both, but ask whether an organizer announced a new limit. Luma names Ian Burgess and Bardish Chagger as judges, with Callie Sweet, Jay Mistry, Ethan Chan and WVG hosting. Its sponsor awards are three months of Pro/member for overall winners and Scale/member for the best ElevenLabs project. No published conference-pitch prize or guaranteed employment offer was verified. Dinner eligibility differs across pages; irrelevant to product strategy.

## Organizers and career evidence

[AF calls this its inaugural hackathon](https://www.ascendancefoundry.com/events/), so there are no historical AF Hacks winners. [AF's fellowship](https://www.ascendancefoundry.com/fellows/) stresses communication, scientific thinking, real client work and defending ideas. [Its team page](https://www.ascendancefoundry.com/our-team/) identifies Ian as founder/president, Validere co-founder, YC alumnus and Harvard applied-physics PhD; Ethan's background includes Chagger's office. Interpret this as a reason to explain adoption, measurement and limits, not permission to claim their endorsement. Do not use the attached brief's private 'Built-Canada aligned' quotation unless the team confirms the words and context; it was not established in this conversation.

[ElevenLabs' winners report](https://elevenlabs.io/blog/announcing-the-winners-of-the-elevenlabs-worldwide-hackathon) includes GibberLink, supplier-calling Procuro and quote-finding Dealwise, but also travel, game/audio and other applications. Therefore 'every winner was reachable by telephone' is false. The useful pattern is an understandable reveal plus useful execution, not mandatory PSTN. [ElevenLabs' own showcase](https://showcase.elevenlabs.io/members/boris-starkov) identifies GibberLink co-creator Boris Starkov as a growth engineer there. This supports employment after winning, not a guaranteed or causally proven winner job offer.

## Sponsor and implementation findings

[General sponsor guidance](https://elevenlabs.io/affiliates) favors multi-step agents, necessary voice, real utility and clean execution. It is not a separate AF numerical rubric. Credit totals differ between general sponsor and local event pages: verify the redeemed plan rather than assuming usage limits.

[Model documentation](https://elevenlabs.io/docs/overview/models) distinguishes Flash v2.5 (32 languages) from v3 Conversational (70+). Punjabi is not in the Flash v2.5 list. The cited ~75 ms is synthesis latency excluding application/network overhead, not full call response time. Start with English, French and one tested supported third language; never promise any language or universally fluent switching. The default app uses Mandarin as a candidate, not a validated quality claim.

[Native Twilio integration](https://elevenlabs.io/docs/eleven-agents/phone-numbers/twilio-integration/native-integration) supports purchased numbers for inbound calls; verified caller IDs alone are outbound-only. Setup, geographic inventory, account restrictions, pricing and call quality require account-level testing. [Post-call webhooks](https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks) require signature validation; retries require idempotent ingestion. Use current SDK verification rather than inventing a signature format.

## Critical corrections to the master brief

- **Competition:** [Jobber Receptionist](https://help.getjobber.com/en/articles/receptionistpowered-by-jobber-ai/) already answers calls/texts and books jobs. 'Field-service software never answers the phone' is false. No evidence supports 'US tools cannot do multilingual switching'. Our unvalidated wedge is a narrow local service workflow, reviewed multilingual handoffs and low-friction adoption—not unique voice technology.
- **Canada scale:** [ISED 2025](https://ised-isde.canada.ca/site/sme-research-statistics/en/key-small-business-statistics/key-small-business-statistics-2025) supports 1,079,188 small employer businesses and 98.2% using December 2024 data. This is not the count of buyers or phone-dependent trades companies.
- **Missed calls:** [Invoca's 2026 report](https://www.invoca.com/reports/the-invoca-call-conversion-benchmarks-report-2026) describes a 70-million-call platform dataset. Do not extrapolate vendor benchmarks to all Canadian SMEs or mix answer rates with conversion rates. The brief's 44%/62% figures and national framing need a verified metric definition and sample before use.
- **Revenue:** 300,000 x C$5,000 is scenario arithmetic, not measured GDP lost. Capturing a lead is not realized revenue; a booking may cancel; competitor displacement is not automatically incremental Canadian GDP. Dashboard values must be labelled estimated booked value/open pipeline and must not double-count a booked lead.
- **Discovery:** No business interviews or pilot commitments were performed in this task. Never use the supplied 'we called eight businesses' line or claim named pilots without evidence and consent.
- **Privacy:** [Canada's Privacy Commissioner](https://www.priv.gc.ca/en/privacy-topics/surveillance/02_05_d_14/) says businesses subject to PIPEDA should inform callers of recording and its purpose and obtain consent. 'Disclose only if asked' is not an appropriate baseline. Configure provider retention and consent, not just prompt wording. No production compliance certification is claimed.
- **French/legal claims:** Do not claim Bill 96 compliance from a language switch, or use Quebec law as proof for an Ontario demo. Production scope requires jurisdiction-specific review; this project makes no legal compliance promise.
- **Safety:** No gas diagnosis, repair instructions, automated dispatch ETA, or guaranteed 15-minute callback. Flag human review and direct immediate danger to emergency services without implying this demo dispatches help.
- **Pricing:** C$149/month is a proposed test price. No 70% margin claim until audio, LLM, telephony, support, onboarding and failed-call costs are measured.
- **Internal consistency:** Use three named demo technicians. Bathroom renovation is an unpriced assessment lead, not an invented C$8,000 quote. Deposit collection is excluded; no simulated payment link masquerades as a real charge.

## Selected product thesis

Front Desk Canada tests whether a small home-service team can turn a supported-language inquiry into a confirmed, auditable appointment with less manual coordination. Growing Canada means testing more productive service delivery and wider access—not claiming national GDP gains from a simulated pipeline. Compare against existing AI receptionists and the owner's current workflow before asserting superiority.

Questions for the team to ask (no organizer contact made): current video limit; sponsor award stacking; any new conference opportunity; live phone versus browser acceptance; third-language QA resources; consent expectations for judge calls.

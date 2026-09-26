# Live translation for business: research and recommendation

Research date and price-access date: **September 26, 2026**. Amounts prefixed C$ are Canadian dollars; US$ are US dollars. Recommendations, scoring, pricing, forecasts, and pilot targets are hypotheses unless explicitly identified as sourced facts.

## Read this first

**Pitch a multilingual service workspace that lets a business welcome, understand, and serve customers across languages. Demonstrate the vision through one complete tour-booking story.** Start customer discovery with small tour and attraction operators in Toronto and Waterloo Region; use boutique hotels as the backup segment. Let a visitor and an employee speak their own languages, jointly confirm transaction details, and preserve the agreed context when the conversation moves to another employee or channel.

**Updated for your video-first brief:** the demo can be an ambitious, staged concept film. Technical implementation is not the constraint on the story. Show the intended customer experience—including translated speech, a shared transaction record, and context-preserving handoff—using designed screens and recorded dialogue. Label it once clearly as a concept demonstration, identify simulated integrations, and distinguish proposed performance from measured results. The narrow initial market is a way to make the business argument specific; it does not limit the product vision.

The strongest proposition is: **“Help your existing staff turn a language-mismatched inquiry into a clearly confirmed booking.”** A translation app alone faces formidable competition. The proposed value lies in connecting the conversation to the business’s actual offer, keeping critical details visible in both languages, and measuring whether the interaction finishes successfully.

This is an initial customer hypothesis, not established demand. No prospect was contacted. No translation benchmark, pilot, revenue uplift, or live implementation test was performed during this research. The current repository documents an autonomous intake/booking prototype, with a fictional business and simulated marketing features. It does **not** establish a working human-to-human speech bridge. The new pitch must accurately distinguish the recommended product from what the team can currently demonstrate.

**Why this segment first:** a tour booking offers a compact, understandable task; local owners and operations managers are identifiable; dates, quantities, and customer changes provide a convincing demonstration. Ticketed attractions can also serve customers without requiring every part of the experience to be spoken. Guided tours need an additional check: translating the booking does not make an English-only tour understandable or its safety briefing adequate.

**Why someone might pay:** a C$199 monthly location subscription would pay for itself through four genuinely incremental bookings contributing C$60 each, under the illustrative assumptions below. That value must be demonstrated against the business’s current workaround. The prospect database is a discovery pipeline, not a customer roster.

**What could defeat the business:** too few difficult conversations, free tools already solving the task, staff unwilling to introduce a device, errors in transaction details, or integration/support work costing more than the subscription supports. If these recur in discovery, change the workflow or stop; adding more languages will not resolve weak demand.

### Research package

- [30 prospective organizations and discovery plan](/Users/terrywang/Documents/ChatGPT/AFhacks/docs/research/2026-09-26/PROSPECT_DATABASE.md)
- [Six verified award-winning projects, two closer technical leads, and original pitch analysis](/Users/terrywang/Documents/ChatGPT/AFhacks/docs/research/2026-09-26/HACKATHON_COMPARABLES.md)
- [Eight-slide blueprint, two-minute and five-minute scripts, and judge Q&A](/Users/terrywang/Documents/ChatGPT/AFhacks/docs/research/2026-09-26/PITCH_BLUEPRINT.md)
- [Source register and evidence limitations](/Users/terrywang/Documents/ChatGPT/AFhacks/docs/research/2026-09-26/SOURCES.md)

## 1. What the reference actually demonstrates

The supplied screen recording is approximately 34 seconds long. The following timestamps refer to that recording, including its surrounding interface and playback changes. They are **not** the original demo’s elapsed call time. Interpretation is based on sampled frames and visible captions; audio quality and translation accuracy were not independently assessed.

| Recording time | Visible evidence | Interpretation and limit |
|---|---|---|
| Around 0:06 | Fish Audio branding; demonstrator identified as Shijia Liao, Co-Founder & Chief Scientist | Identifies the promotional context, not the entire underlying technology stack |
| Around 0:08 | Tony’s Pizza greeting and “Multilingual” label | Presents language flexibility; a short greeting cannot establish broad coverage |
| Around 0:10 | “Expressive Mode,” a 0.42-second overlay | Promotes delivery and responsiveness; measurement definition is absent |
| Around 0:12–0:18 | A request to others, partially visible multiple-speaker label, followed by an order readback | Suggests maintaining an order across multiple speakers; independent speaker separation was not measured |
| Around 0:20–0:24 | Customer requests a change; business response asks for a name | Presents conversational correction and progression toward completing a purchase |
| Around 0:26–0:30 | Name spelling/clarification, then another expressive response | Makes specific transaction details and conversational style part of the demonstration |
| Around 0:32 | Recording returns to an earlier ordering scene | The clip loops; do not treat it as a continuous timed benchmark |

**Category:** this appears to be an autonomous multilingual ordering agent. The visible material does not clearly show an employee listening to translated customer speech and replying through an interpreter. The two products share voice technology but have different buyers, operational responsibilities, and demonstrations.

**Reusable pitch structure:** establish a familiar transaction → demonstrate speech → introduce an unexpected change → show an intelligible response → produce a verifiable transaction record. The final step is our proposed improvement to the demonstration: the reel’s conversational acceptance does not establish a purchase in a POS or booking system.

The headline’s open-weight and “nearly five times cheaper” assertions, plus response-time overlays, are vendor/promotional claims. A visible 2× playback indicator prevents deriving actual latency from the recording. See the provider comparison below for what current documentation supports.

## 2. Choose the customer before choosing the feature list

### Segment ranking

Analyst scoring, not survey results. Scores range from 1–5; higher is more favorable. Weights: pain 20%, frequency 15%, willingness to pay 15%, buyer access 15%, ease of implementation 15%, competitive headroom 10%, measurable value 10%. The weighted total is converted to 100. A high score recommends discovery; it does not establish product-market fit.

| Segment | Pain | Frequency | Pay | Access | Ease | Headroom | Measurable | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Tour/attraction booking desks | 4 | 3 | 3 | 5 | 4 | 3 | 5 | **77** |
| Boutique hotels | 4 | 4 | 4 | 3 | 3 | 2 | 4 | **70** |
| Automotive service | 4 | 3 | 4 | 3 | 2 | 2 | 4 | 64 |
| Home services | 4 | 2 | 4 | 4 | 2 | 2 | 4 | 64 |
| Specialty retail | 3 | 3 | 2 | 4 | 4 | 2 | 3 | 61 |
| Restaurants | 3 | 4 | 2 | 4 | 3 | 1 | 4 | 61 |
| Cross-border sales/support | 4 | 3 | 4 | 2 | 1 | 2 | 4 | 58 |
| Property management | 4 | 3 | 3 | 2 | 2 | 2 | 3 | 56 |

### Buyer, user, and problem

| Segment | Buyer → daily user → beneficiary | Conversation to investigate | Workaround and adoption issue | Initial discovery assumptions |
|---|---|---|---|---|
| Tours/attractions | Owner/operations manager → reservations or ticket staff → visitor/group organizer | Date, party size, inclusions, pickup point, change request | Website/email, bilingual colleague, phone translator; seasonal volume and actual tour-language support | C$99–249/month; owner-led decision in 1–4 weeks |
| Boutique hotels | GM/front-office manager → reception/concierge → guest | Room change, late arrival, package, local experience | Staff languages, existing translation app; guest-system access and brand standards | C$199–399/month; 2–8 weeks |
| Automotive | Service manager/owner → service advisor → driver | Describe issue, explain estimate, obtain approval | Bilingual advisor or written estimate; technical terms and disputed authorizations | C$199–499/month; 2–8 weeks |
| Home services | Owner/dispatch manager → dispatcher/technician → resident | Describe non-emergency job and arrange visit | Family assistance, bilingual crew, texts; job vocabulary and phone routing | C$149–399/month; 1–6 weeks |
| Specialty retail | Owner/store manager → sales associate → shopper | Product comparison, fit, customization, returns | Phone translator, printed information; transaction value may be too low | C$49–199/month; 1–4 weeks |
| Restaurants | Owner/GM → host/order staff → diner | Reservation or ordering changes | Online ordering, bilingual staff, existing agents; noise and low margins | C$99–299/month for interpreter; 1–4 weeks |
| Cross-border sales | Sales/CX leader → account/support staff → foreign customer | Qualification, specifications, support | Interpreters, translated email, meeting tools; CRM/telephony and procurement | Budget depends on seats/integration; 1–3 months or longer |
| Property management | Operations manager → leasing/maintenance staff → tenant/applicant | Appointment or maintenance explanation | Translated forms, bilingual team; lengthy policy discussions and sensitive records | Budget and cycle unknown; defer pending interviews |

All budget and cycle ranges above are interview hypotheses, not quoted willingness to pay. A difficult conversation may cost time without losing a sale; ask for the last real incident before assigning an economic value. Defer clinical, legal, financial, emergency, and safety-critical interpretation until there is a suitable domain-specific validation and operating model.

### Geography and languages

Toronto’s tourism organization reports **28.2 million visitors and C$9.1 billion direct spending in 2025**, with 37% of spending from US and other international markets. This establishes visitor activity, not language difficulty or addressable software revenue. Do not compare its combined day/overnight visitor total directly with an earlier overnight-only count. [Destination Toronto, January 28, 2026](https://www.destinationtoronto.com/media/media-blog/post/record-breaking-2025-sees-28-million-visitors/)

Waterloo Region’s 2021 Census summary says 15.2% most frequently spoke a language other than English or French at home, while 98% understood English. **Home language and immigration status cannot be used as proxies for inability to transact in English.** The report lists Punjabi, Mandarin, Arabic, Spanish, and Portuguese among prominent non-English home languages. [Region of Waterloo census summary](https://www.regionofwaterloo.ca/media/01wbyqwt/immigration-partnership-annual-report-2023-access.pdf)

Start with one language pair the team can evaluate with fluent speakers. English–French or English–Mandarin are possible candidates, not verified choices for any prospect. Select the pilot pair from the operator’s own inquiry history and staff/customer feedback. A global expansion plan later needs distribution, timezone coverage, payment, fulfillment, and language support after purchase.

## 3. Competitors and substitutes

**Evidence convention:** vendor-documented availability does not equal an independent performance benchmark. “Unknown” means unverified in the reviewed sources, not absent from the product. Price comparisons use the published unit, not an assumed all-inclusive cost.

### Human conversation and translation alternatives

| Product | Buyer, workflow, channel | Verified/documented capabilities | Price and adoption evidence | Implication for us |
|---|---|---|---|---|
| **DeepL Voice for Conversations** | Frontline teams; in-person conversations on web/iOS/Android | Selected language pair, automatic speaker/language detection, device TTS readout; separate glossary support | Required Voice plan; reliable location-specific price not extracted. Wider Voice site includes named organizational testimonials, not proof of booking uplift | Direct incumbent. A split-screen translator or glossary alone is insufficient differentiation. [Instructions](https://support.deepl.com/hc/en-us/articles/17090280797596-Translate-1-1-conversations), [product](https://www.deepl.com/en/products/voice) |
| **Sanas Language Translation** | Enterprise contact centers; customer ↔ human agent calls | Bidirectional speech, voice matching, captions, up to 100 glossary terms; English, French, Mandarin and other listed languages | Enterprise sales; price unknown. Documentation updated September 22, 2026 | Strong phone competitor. Docs state average 3-second translation start and no automatic detection; marketing says auto-detection and latency as low as 1.5 seconds. Resolve with vendor before relying on either. [Docs](https://help.sanas.ai/docs/language-translation), [marketing](https://www.sanas.ai/language-translation) |
| **BabelStream** | Small offices through enterprise; translated telephone lines | Outbound translation, dedicated lines, SIP/PBX support on higher tiers, routing and analytics | Published $79/50 minutes, $199/200, $499/750, with overages. Currency was not explicit in the extracted page; independent adoption not established | Already occupies SMB translated-phone positioning. Its “no per-minute interpreter billing” heading does not remove the stated usage limits. [Pricing](https://babelstream.ai/pricing/) |
| **EzDubs** | Consumer/team calls and developer integrations | Live calls to ordinary phone numbers, voice/emotion preservation; receiver need not install app | Current checkout price and continued standalone availability unverified. YC profile marks acquired and founder bio states Cisco acquisition in 2025 | Closely matches remote human dialogue. Do not pitch voice preservation as unique, or present historical app pricing as current. [Product](https://www.ezdubs.ai/?trk=public_post_reshare-text), [YC profile](https://www.ycombinator.com/companies/ezdubs) |
| **Google Translate** | General-purpose employee/customer substitute | Live conversation features in 70+ languages; headphone mode with spoken output and a conversation mode | General-purpose free-app baseline; this research did not test Canadian device/account availability | The mandatory comparison in pilot task tests. We need evidence of better completion, confirmation, or deployment. [Conversation update](https://blog.google/products-and-platforms/products/translate/language-learning-live-translate/), [headphones](https://blog.google/products-and-platforms/products/translate/live-translate-with-headphones/) |
| **Timekettle W4 Pro** | Individuals/frontline users; app-connected interpreter earbuds | Dedicated hardware workflow; requires smartphone app | Listed US$449; product page says no subscription for included features. Deployment and language/mode coverage vary by model | Competes on hands-free convenience; compare device handover, cleaning, setup, and ongoing use. [Product](https://www.timekettle.co/products/w4-pro-ai-interpreter-earbuds-s) |

### Autonomous agents: closest to the pizza reel

| Product | Workflow and buyer | Evidence and commercial model | Competitive consequence |
|---|---|---|---|
| **Slang AI** | Restaurant phone host; reservations, routing and follow-up | USD page starts at $399/location Core, $599 Premium. OpenTable logging and Spanish support described; exact bilingual package entitlement needs confirmation. Vendor claims 2,000+ restaurants | Vertical integration and operational features support pricing above a generic translator. This is an agent comparison, not a human interpreter. [Pricing/capabilities](https://www.slang.ai/pricing) |
| **SoundHound** | Restaurant phone, drive-through and kiosk ordering | Current restaurant page documents POS/menu integrations and language switching; includes Five Guys and Peet’s testimonials. Pricing by sales inquiry | A pizza-ordering agent enters an established category. Different products/versions vary: support docs condition ordering on supported POS. [Restaurants](https://www.soundhound.com/industries/restaurants), [POS limits](https://support.soundhound.com/hc/en-us/articles/23680715492755-Does-the-voice-assistant-integrate-with-my-POS) |
| **ConverseNow** | Restaurant voice ordering across channels | Vendor documents multilingual recognition and lists POS ecosystem partners, including Olo and NCR Aloha; public quote not found | Another close reference for the reel. Ordering accuracy and integration matter more than a novelty greeting. [Products](https://conversenow.ai/products.html) |
| **PolyAI** | Enterprise customer-service agents | Platform supports multilingual service and integrations; Atos case study reports workforce-equivalent automation benefits. These are vendor case-study claims, not our ROI | Enterprise deployments demonstrate buyers for outcomes, but their economics and procurement do not transfer automatically to small operators. [Multilingual evaluation](https://poly.ai/blog/four-questions-multilingual-ai), [Atos case](https://poly.ai/customers/atos) |

### Infrastructure that can enable us and competitors

| Provider | Role | Published economics/capabilities | Limit |
|---|---|---|---|
| **ElevenLabs** | Streaming STT and TTS; optional agent orchestration/Speech Engine | API page: Scribe v2 Realtime US$0.39/audio hour; Flash/Turbo US$0.05/1,000 characters; Speech Engine US$0.08/minute | A voice API does not by itself implement our translation policy, two-person routing, or business confirmation. [API pricing](https://elevenlabs.io/pricing/api), [Speech Engine](https://elevenlabs.io/docs/overview/capabilities/speech-engine) |
| **Fish Audio** | Speech generation and recognition; alternative component supplier | Paid S2.1 Pro US$15/million UTF-8 bytes; a temporary free model also listed | TTS pricing is not full translation or agent pricing; self-hosting requires separate license/infrastructure analysis. [Pricing](https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits), [developer/licensing overview](https://fish.audio/developers/) |
| **Palabra** | Streaming speech translation API and finished conversation/event apps | API advertises US$0.04/minute speech-to-speech and 60+ languages; apps include two-way conversation mode and glossaries | Both a supplier and substitute. Confirm stream/direction billing, deployed pairs, and quality before comparing session cost. [Pricing](https://www.palabra.ai/pricing), [streaming API](https://docs.palabra.ai/docs/streaming_api) |

Bilingual staff and human interpreters remain alternatives. They bring judgment and context; hiring and interpretation costs depend on actual usage and region. No generic interpreter rate is used as a verified benchmark here.

### Capabilities that still require direct evaluation

| Capability | Current evidence | What our comparison must establish |
|---|---|---|
| Code-switching | SoundHound claims language switching; Sanas docs/marketing conflict; DeepL detects a selected pair | Correct behavior when a product name or short phrase changes language mid-turn |
| Interruptions | Voice platforms market natural turn-taking; parity under our task is unverified | Stop stale audio, preserve corrected meaning, avoid losing the other speaker |
| Speaker separation | DeepL has automatic speaker detection; devices and separate audio channels offer different mechanisms | Distinguish customer/staff; do not claim reliable crowd diarization |
| Domain vocabulary | DeepL, Sanas, Palabra already document glossary/terminology features | Correct handling of real product IDs and names, beyond matching a glossary checkbox |
| Context and confirmation | Several agents integrate with transaction systems | Both parties approve the same current terms after a correction |
| Handoff | Agent products can route calls; translation continuity varies | Human receives original meaning, correction history, and language preference |
| Integrations | Specific examples are documented for some agents | Our exact booking system, permissions, failure behavior, and deployment cost |

**Answer to “why pay us?”** A business could pay for a supported, staff-friendly booking workflow that outperforms its current translator in completed, correctly understood transactions. The gap is a hypothesis about a specific customer’s workflow. We have not established an exclusive feature or technical moat. If an existing product meets the same requirement at lower total cost, recommend it or build an integration service rather than pretending the market is empty.

## 4. Differentiation and product direction

| Option | Customer value | Feasibility and competitors | Proof needed / copying risk |
|---|---|---|---|
| **Bilingual booking confirmation** — recommended | Makes date, quantity, option, total, and meeting point explicit; corrections update one shared record | Feasible in a bounded demo. Translation and agents already exist; domain-specific confirmation/integration is the proposed emphasis | Fewer material errors and higher completion versus current workflow. Easy to copy as UI; harder to support across customer systems |
| **Branded remote translated phone line** | Extends existing staff to foreign-language callers without app installation | More telephony/routing work; BabelStream, Sanas and EzDubs are close comparables | Document enough valuable missed calls to cover setup/support. Low standalone defensibility |
| **Autonomous after-hours agent with translated human handoff** | Availability plus task automation | Closest to reel and current repo; highly competitive against vertical agents | Real after-hours demand, correct task execution, and successful handoff. Larger product scope and greater operational responsibility |

Lead with the first as the commercial entry point. The video can then reveal how that interaction belongs to a larger service experience. Introduce autonomous handling explicitly when it appears so viewers can distinguish a translated employee from an AI representative.

### The ambitious product: a multilingual service workspace

Working description, not an established product name: **one place for a business to serve a customer across languages, channels, and staff members.** Its proposed sequence is:

1. **Discover:** an operator-approved multilingual page or QR sign tells visitors which service conversations are supported. Track source and qualified inquiries; translation alone does not create distribution.
2. **Converse:** a visitor and employee speak through a shared device, paired devices, or a translated phone call. Original and translated statements remain distinguishable.
3. **Agree:** an editable bilingual transaction card records dates, quantities, inclusions, price and unresolved questions. Both parties confirm before a business action is committed.
4. **Continue:** a second employee receives the latest agreed state, remaining questions, and language preference with the customer's consent. The customer does not have to restart the explanation.
5. **Act:** a booking-system connector commits the approved transaction and returns its actual status. A failed write remains visibly pending rather than being described as a successful booking.
6. **Learn:** an operator dashboard separates inquiries, completed tasks, corrections, handoffs and attributable outcomes. It can reveal which translated landing pages attract useful demand and where a service journey fails.

An optional after-hours agent can capture a bounded inquiry and queue a translated human follow-up. This expands availability; it should not silently replace the human-to-human proposition. Voice cloning, universal language accuracy, cultural inference about individuals, and automatic price negotiation are unnecessary promises for this vision.

**The strategic ambition:** become the business's multilingual conversation and transaction layer. The plausible expansion path is booking desks → hospitality reception → other appointment-based services → selected remote customer-service workflows. Each step needs buyer, integration, and language evidence. Defensibility would come from useful connectors, adoption across staff, reliable confirmation/recovery, and distribution partnerships. None is a present moat.

**Video treatment:** follow one visitor from a multilingual entry point into an employee conversation, introduce a date/party-size correction, show a handoff to a colleague, and end on matching bilingual confirmation cards. A short final zoom-out can show the business dashboard labeled “illustrative data.” This communicates breadth through one coherent story. It is not necessary to animate every proposed feature or imply that all channels already work.

### Minimal architecture

`Customer microphone → STT → translation → staff text + translated audio`

`Staff microphone → STT → translation → customer text + translated audio`

`Both directions → proposed booking fields → explicit staff/customer review → existing booking workflow`

Use two clearly identified channels/devices or explicit turn controls initially. Suppress playback from re-entering the microphone. Preserve original and translated text during the session, offer repeat/edit controls, and show uncertainty before confirming dates or amounts. A fluent voice is not evidence that the underlying text is correct.

Keep prices and availability anchored in a verified source. The translator renders meaning; the employee decides what to offer. In the prototype, use clearly labeled fictional availability and a local confirmation record. Production requires actual booking-system integration, authentication, retention controls, monitoring, and language evaluation. Payment details should remain in the operator’s existing checkout.

**Why ElevenLabs:** its documented streaming recognition and low-latency speech synthesis can support an audible, two-direction demonstration. Speech Engine explicitly leaves application/model logic on the developer’s server. Sponsor relevance is strongest when judges can hear where ElevenLabs improves the product; it is not a reason to claim proprietary translation. [Speech Engine quickstart](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/speech-engine)

### Fish Audio comparison: the defensible version

Fish’s June 23, 2026 article identifies S2.1 Pro as a synthesis model building on earlier open-weight S2. Its current page lists a free API window through November 30, 2026, subject to fair use, with no SLA or latency guarantee and possible use of requests for improvement. This is not a permanent production-cost assumption. The article’s synthesis time-to-first-audio figures also exclude the rest of a conversational pipeline. [Fish announcement](https://fish.audio/blog/s2-1-pro-free-api/)

Its developer page identifies fish-speech, S1, and S2 as open-weight models with a paid commercial license. That does not independently establish freely usable S2.1 Pro weights. [Licensing overview](https://fish.audio/developers/)

At published paid rates, one million ASCII characters occupy roughly one million UTF-8 bytes: Fish TTS would be US$15 versus ElevenLabs Flash/Turbo US$50, a **3.33× price ratio** for that restricted comparison. One million Chinese characters typically occupy approximately three million UTF-8 bytes before other text effects: US$45 versus US$50, about **1.11×**. ElevenLabs v3’s separate US$100/million-character rate produces another comparison. These calculations do not equate voice quality, throughput, licensing, or output duration. **The reel’s universal “five times cheaper” conclusion is unsupported.** [Fish units](https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits), [ElevenLabs rates](https://elevenlabs.io/pricing/api)

## 5. Pricing and unit economics

### Proposed offer

**C$199/location/month, 300 elapsed conversation minutes, C$0.39/minute overage; C$199 standard onboarding.** Shared staff access on the pilot’s supported devices. Start monthly; do not sell an unlimited plan. A time-limited C$149 pilot price is a possible experiment, not evidence of willingness to pay.

Location pricing matches shift-based usage. Pure metered billing creates friction for short frontline interactions; per-seat pricing can discourage adoption across shifts. Custom booking integrations require a separately scoped fee. Initially use the customer’s own device; supplied hardware would need a lease or separate purchase price.

### Base cost assumptions

One elapsed minute is one minute of the customer–employee session, regardless of direction. We conservatively assume two open STT streams, plus **600 total source characters and 600 generated translated characters across both speakers per elapsed minute**. Character volume, retry rates, silence billing, and language expansion must be measured.

| Cost | Input/rate | US$ per elapsed minute |
|---|---|---:|
| Streaming recognition | 2 audio minutes × US$0.39/hour ÷ 60 | 0.013 |
| Generated speech | 600 characters × US$0.05/1,000 | 0.030 |
| NMT text translation | 600 characters × US$20/million | 0.012 |
| Variable transport/compute | Assumed allowance | 0.005 |
| Total before reserve | Sum | **0.060** |

Rates: [ElevenLabs API](https://elevenlabs.io/pricing/api), [Google Cloud Translation](https://cloud.google.com/products/translate/pricing). Google’s page includes a confusing byte label in one table, but its billing explanation and worked NMT example charge characters; this model follows those explicit explanations. [STT billing documentation](https://elevenlabs.io/docs/overview/capabilities/speech-to-text) bases charges on audio duration sent.

Use **C$1.40 per US$1 as a planning assumption, not a live FX quote**, and a 10% variable-cost reserve. Result: **C$0.0924 per elapsed minute**. Free credits and temporary promotions are excluded. This NMT design has no additional generative LLM charge; an LLM-based contextual translator would require its own model/token budget and quality comparison.

Additional assumptions: C$8/location/month hosting and short-lived metadata allocation; payment processing allowance of 3% of revenue; support labor C$40/hour. No retained raw audio is assumed. Recording storage, hardware, paid integrations, and any minimum platform commitment would change the model.

**Scope of this model:** the initial in-person interpreter and confirmation workflow, with staff-reviewed fields and a standard setup. It does not price the entire ambitious roadmap. Automated semantic extraction, generative follow-up, an after-hours agent, additional channels and bespoke connectors require separate usage and implementation allowances. The concept video can show that expansion without implying that every feature is included profitably at C$199.

### Monthly location economics

| Scenario | Low use | Base use | High use |
|---|---:|---:|---:|
| Elapsed minutes | 100 | 300 | 1,000 |
| Revenue incl. overage | C$199.00 | C$199.00 | C$472.00 |
| Variable voice/translation/transport | 9.24 | 27.72 | 92.40 |
| Fixed delivery allocation | 8.00 | 8.00 | 8.00 |
| Delivery profit before support/fees | 181.76 | 163.28 | 371.60 |
| Delivery margin before support/fees | 91.3% | 82.1% | 78.7% |
| Payment fee assumption | 5.97 | 5.97 | 14.16 |
| Support: 0.5 / 0.75 / 1.5 hours | 20.00 | 30.00 | 60.00 |
| **Contribution after support and fees** | **155.79** | **127.31** | **297.44** |
| **Fully loaded direct margin** | **78.3%** | **64.0%** | **63.0%** |

Accounting presentation varies: if support and processing are COGS, the final percentage is the appropriate gross margin. The earlier delivery margin is intentionally shown before those costs and should not be presented as the fully loaded margin.

**Sensitivity:** at 300 minutes, variable cost of C$0.05/0.0924/0.20 per minute gives contribution of C$140.03/C$127.31/C$95.03. Three hours of monthly support costs C$120, reducing base contribution to C$37.31. At 1,000 minutes with no overage, contribution falls to C$32.63; unlimited usage is especially vulnerable to heavy users. At the base cost, C$149 pilot pricing yields C$78.81 contribution, about 52.9%.

**Pricing floor:** at 300 minutes, C$30 support and 3% processing, approximately C$177.62 revenue is needed for a 60% fully loaded direct margin. Price must cover implementation and support, not just voice tokens.

**Usage break-even:** without overages, holding support at the high-use C$60/month assumption, contribution reaches zero at approximately `(199 × 0.97 − 8 − 60) ÷ 0.0924 = 1,451 minutes/month`. This is a sensitivity threshold, not a forecast: support can rise with usage. Under the proposed metered offer, each additional minute contributes approximately `0.39 × 0.97 − 0.0924 = C$0.2859` before any added support or capacity cost. There is no finite usage break-even under those fixed assumptions; operational costs determine the real limit.

**Telephone extension:** Twilio’s Canadian local rates list US$0.0085 inbound and US$0.014 outbound per minute, plus US$1.15/month for a local number. Media Streams is US$0.0044/minute. A bridged call with both local legs and two billed streams would add an illustrative US$0.0313/session minute before other services and taxes. The exact topology determines charges; this is excluded from the in-person model. [Twilio Canada pricing](https://www.twilio.com/en-us/voice/pricing/ca)

**Acquisition and onboarding:** assume C$400 fully loaded CAC and C$150 standard onboarding labor. A C$199 setup fee leaves C$43.03 after a 3% payment allowance and that labor. At C$127.31 monthly contribution, CAC payback is roughly 3.1 active months; it is longer if seasonal customers pause or leave. With hypothetical C$4,000 monthly central overhead, about 32 base-use locations cover that overhead before tax. These are planning calculations, not operating results. Do not present an LTV without observed retention.

### Customer ROI

`Monthly incremental contribution = extra attributable bookings × contribution per booking + non-overlapping realized labor savings − subscription − extra operator costs`

Example: five incremental bookings × C$60 contribution = C$300; less C$199 subscription leaves **C$101/month**. Break-even requires four such bookings. The first month with C$199 onboarding requires seven bookings to exceed the combined C$398 charges. C$60 is a hypothetical contribution, not the ticket price or a market average.

Translation session counts are not extra bookings. Attribute uplift using comparable shifts/inquiries and record unsuccessful sessions. Avoid counting saved staff minutes as cash savings if payroll or productive capacity does not change. Do not add a labor benefit already included in the booking’s contribution calculation.

## 6. Bottom-up market and route to buyers

ISED’s 2025 establishment tables show **1,162 Ontario employer establishments in travel arrangement/reservation services (NAICS 5615)** and **1,822 in traveller accommodation (7211)**. National travel services employers total 3,005. These are broad establishment counts, not a count of qualified tour desks; 5615 includes travel agencies and reservation businesses, while some attractions fall outside it. Multiple establishments can share one purchasing organization. [Travel services](https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/5615?wbdisable=true), [accommodation](https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/7211)

At C$199 × 12 = C$2,388 annual revenue/location:

| Scenario | Formula | Annual subscription revenue |
|---|---|---:|
| Broad Ontario travel-services ceiling | 1,162 × C$2,388 | C$2.77m |
| Illustrative eligible Ontario subset | 1,162 × assumed 20% × C$2,388 | C$555k |
| Illustrative obtainable share | Eligible subset × assumed 10% | C$55.5k, about 23 locations |
| Separate accommodation expansion | 1,822 × assumed 20% × C$2,388 | C$870k |
| Broad Canada travel-services ceiling | 3,005 × C$2,388 | C$7.18m |
| Initial named discovery pipeline | 30 listed organizations, unqualified | **No revenue forecast** |

The percentages are assumptions. Do not label the national ceiling validated TAM or sum different segments without qualifying and deduplicating buyers. This narrow entry market supports a focused small business; a venture-scale case would require evidence for larger geographic/vertical expansion or substantially higher account value.

**First channel:** founder-led discovery with local operators, followed by three supported pilots. Seek introductions through tourism associations and business networks; no partnership is currently claimed. Go Tours’ published association memberships provide one concrete example of where operators congregate. [Go Tours contact/about](https://www.gotourscanada.com/contact-us-go-tours-canada/)

**Next channels:** booking-system consultants, destination organizations, and hospitality service providers. Referral or revenue-share costs belong in CAC. Avoid broad paid acquisition before discovering who buys and whether implementation repeats across accounts.

**Attracting new customers:** publish only tested language availability on an operator-approved booking page, counter sign, or referral listing. Measure entry-point visits and qualified inquiries separately from conversation conversion. Tourists already visiting Ontario are locally served international demand; remote export sales would be a different channel.

**Retention and defensibility:** recurring staff use, reusable booking-system connectors, deployment/support knowledge, and customer-approved terminology may make the product useful. They are prospective advantages, not a present moat. Aggregate outcome measurement should not depend on retaining private conversations. Tourism seasonality and limited repeat end-customer demand make business retention an especially important pilot question.

## 7. Minimum convincing demo and pilot

### A 75-second demonstration

1. **0–10 seconds:** introduce a visitor and employee with different languages; label both roles. Select one supported pair.
2. **10–30:** visitor asks about a booking; employee hears translated speech and replies in their own language; visitor hears the translated reply.
3. **30–50:** visitor changes party size or date. Show the original and corrected information clearly.
4. **50–65:** both parties review the same date, quantity, price and meeting point in their languages. A deliberate ambiguous number triggers clarification.
5. **65–75:** employee confirms; show a local demo record with its identifier and “demo confirmation” label. Claim a real integration only if one exists and is demonstrated.

Use fictional personal details and an expressly staged scenario. Prerecorded dialogue and designed screens are appropriate for the requested concept video. Use an opening “Concept demonstration — staged dialogue and simulated integrations” caption; label actual working segments separately if included. Show no numerical latency badge unless it is measured. Add a brief handoff within the confirmation sequence to convey the larger vision without losing the booking story.

### Proposed evaluation, not completed testing

| Measure | Method | Initial decision threshold — hypothesis |
|---|---|---|
| Translation adequacy | Two fluent reviewers assess both directions on task-specific utterances | At least 95% of turns preserve task-critical meaning; analyze disagreement |
| Critical fields | Check dates, quantities, totals, names and locations against intended meaning | No uncorrected material error reaches confirmation in the evaluation set |
| Task completion | Same scenarios using our workflow and current translator; rotate order | At least parity on completion, with a credible confirmation or usability advantage |
| End-to-end delay | End of source turn to first intelligible translated audio; report p50/p95 | Initial target p50 ≤2 seconds, p95 ≤4; acceptable delay must be confirmed with users |
| Recovery | Ambiguous numbers, correction, dropout, overlapping speech | Repeat/edit/handoff succeeds without stale confirmation |
| Staff adoption | Sessions used when a qualifying interaction occurs; short interviews | Staff voluntarily use it for most eligible encounters |
| Commercial outcome | Record eligible inquiries, completed bookings, contribution and support burden | Two of three pilots willing to pay the proposed price; per-location value exceeds cost |

Start with 30 scripted task conversations before real usage, then supervised low-stakes sessions. A zero-error result in a small sample would not prove reliability. Stop a session when critical meaning is unclear or either person cannot confirm it; return to the existing staff process. Exclude safety briefings and medical/allergen advice from the initial scope.

For a small pilot, alternate comparable shifts or randomly offer the workflow among eligible encounters when practical. Track language pair, session difficulty, booking outcome, staff time, and errors with minimal data. Thirty days may establish usability and willingness to pay but be too small to establish a statistically credible conversion effect.

## 8. Execution plan

### Next 48 hours, respecting the actual submission deadline

AF Hacks’ event listing sets submission at **noon September 27**, with a maximum five-minute demo video and public repository whose work is merged into main. Research date is September 26, so a 48-hour plan extends beyond the event: only work completed before the deadline belongs in the submission. Public posting/merging is not performed by this research task. [Event listing](https://luma.com/asvdo3m9)

| Window | Priority | Concrete output |
|---|---|---|
| First 2 hours | Lock the product vision, buyer, story and language pair; inventory actual vs proposed capabilities | Single-sentence proposition and concept-film treatment |
| Before deadline, next available production block | Design conversation, correction, handoff and confirmation screens; record the two roles | A coherent staged experience with simulated integration labels |
| Before recording | Obtain permission for any human participants; have fluent speakers review scripted dialogue; rehearse timing | A polished 75-second concept sequence; no implied live-performance benchmark |
| Before noon September 27 | Assemble eight-slide narrative, max-five-minute recording, and required repository materials | Submission-ready materials; account owner handles final submission |
| Remaining time up to 48 hours | Begin authorized discovery and structured language evaluation after the event | Interview notes and a pilot backlog; do not retroactively claim them in the pitch |

### First 30 days after the event

- **Days 1–7:** conduct ten interviews; collect actual examples of language friction, volumes and workaround costs. Select no more than three candidate pilots. Ask whether the operator can serve the customer after booking.
- **Days 8–14:** compare against Google Translate/current process using task scenarios; measure audio routing, critical details and recovery. Agree pilot boundaries, data practices and a baseline.
- **Days 15–23:** run supervised pilots, log eligible sessions and support time, and correct recurring failures. Keep a no-tool/current-tool comparison where feasible.
- **Days 24–30:** ask for a paid continuation at C$149 and/or C$199 according to an explicit pricing experiment; review contribution economics and operator value. Continue, change segment, or stop based on evidence.

### Three facts needed before calling this a credible business

1. **Demand:** enough target operators encounter costly, recurring language-mismatched conversations and find their current solution inadequate.
2. **Advantage:** our staff workflow produces more reliably understood completed transactions, or a substantial operational benefit, versus the best available substitute.
3. **Economics:** buyers pay enough to cover both usage and real support/integration work, and continue using the product beyond an initial demonstration or tourist season.

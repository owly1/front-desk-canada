# Live speech translation for customer growth

Research date: September 26, 2026. Corrected scope following the user's explicit clarification: **translate live conversations between businesses and customers**. This supersedes the earlier receptionist business thesis. Product positioning and pricing below are recommendations; market claims are linked to sources. No customers were contacted and no sales results are claimed.

## The proposition

**“Let your team speak with customers in their language.”** Two people speak their own languages; the application translates their speech in both directions. The employee supplies the expertise, recommendations and decisions. The intended commercial outcome is that a business can serve and convert customers it previously struggled to communicate with.

The closest category is a business interpreter for live customer conversations. It can address multicultural local demand and cross-border remote sales, but these require different distribution and deployment. Local service uses counters, tablets or paired phones; global sales uses browser calls, phone systems or meeting platforms. Prove one channel first.

The current repository describes autonomous intake and booking with optional voice tools. That is not proof of a working human-to-human translation bridge. A pitch for this clarified product must demonstrate both people speaking and both receiving translated speech. Multilingual chatbot capability or a language selector alone does not establish that behavior.

An important business distinction: translation makes an existing conversation accessible. To **attract** new customers, the business must also make that language access discoverable through a translated invitation, booking page, partner referral, or storefront sign. Acquisition and conversation conversion should be measured separately.

## Closest commercial comparables

| Product | Match to our intended workflow | Buyer / channel | What it means for us |
|---|---|---|---|
| Sanas Language Translation | Direct: bidirectional speech translation between customer and human agent | Enterprise customer calls; desktop application and telephony integration | Very close enterprise competitor; terminology and captions already exist |
| DeepL Voice for Conversations | Direct: live in-person communication with translated spoken output | Frontline staff using mobile/web | Strong retail/hospitality competitor; a phone-based translator is not an unoccupied market |
| EzDubs | Direct: translated live phone and video calls; hotel-call demonstration | Individuals and business users | Low-friction calling substitute; voice preservation is already offered |
| BabelStream | Direct: translated live business phone lines | Small offices through enterprise | Particularly close SMB positioning and published usage bundles |
| Palabra | Direct enabling technology: streaming speech translation | Developers embedding interpretation in applications | Potential alternative supplier and evidence that the underlying capability is accessible |
| Timekettle | Hardware alternative for cross-language conversations | Frontline users and business teams | Competes when customers prefer a dedicated device; hardware can also add deployment friction |
| Google Translate | General-purpose translation substitute | Individual employees/customers | Baseline to beat on the actual task and ease of use |

Sources and qualifications:

- [Sanas deployment documentation](https://help.sanas.ai/docs/language-translation) describes bidirectional translation and an average three-second translation start, with glossary and caption support. It also documents limitations involving numbers and manually configured languages. Its [marketing page](https://www.sanas.ai/language-translation) advertises automatic language detection and latency as low as 1.5 seconds. These conflict; confirm availability in the purchased deployment. Do not turn marketing latency into an independently measured benchmark.
- [DeepL's conversation instructions](https://support.deepl.com/hc/en-us/articles/17090280797596-Translate-1-1-conversations) describe language-pair selection, microphone controls, spoken output and automatic speaker detection. Its [retail article](https://www.deepl.com/en/blog/deepl-voice-conversations-retail) explicitly connects language barriers to customer experience and abandoned purchases, but does not provide a causal sales-uplift experiment.
- [EzDubs](https://www.ezdubs.ai/) demonstrates a translated call to a Japanese hotel. Its [Y Combinator profile](https://www.ycombinator.com/companies/ezdubs) describes live call translation and voice-message dubbing. This is a close startup comparable. Do not confuse historical video-dubbing positioning with its current call product.
- [BabelStream pricing](https://babelstream.ai/pricing/) lists $79/50 minutes, $199/200 minutes and $499/750 minutes, with overages. The retrieved page does not clearly label currency, so these are displayed dollar figures, not CAD quotes. Vendor readiness and quality were not independently tested.
- [Palabra documentation](https://docs.palabra.ai/docs/streaming_api) describes a transcription → translation → synthesized-audio pipeline using WebRTC or WebSockets. Language coverage must be checked per recognition/translation/output combination.
- [Timekettle product FAQs](https://www.timekettle.co/pages/products-faqs) describe conversation devices; [Google's live translation announcement](https://blog.google/products-and-platforms/products/translate/live-translate-with-headphones/) documents its consumer offering. Test the exact mode relevant to our use case.

KUDO and Wordly are relevant mainly for presentations and events. A platform offering one-to-many interpreted audio does not automatically provide fluid two-way customer conversation. HeyGen, Rask, and ElevenLabs Ads Engine address recorded content or advertising localization and should not occupy the main competitor slide for the clarified product.

None of these sources proves that our prototype is faster, more accurate, cheaper, or better at increasing revenue. Those are comparison questions for the pilot.

## Closest hackathon projects and what their pitches show

I did not verify a winning project that simultaneously matches **live two-way speech translation + business staff/customer conversations + demonstrated customer acquisition**. The closest technical matches and award-winning adjacent examples should be labeled accurately.

| Project | Verified match and status | Public pitch approach | Relevance |
|---|---|---|---|
| Twin Tongue | Devpost describes bidirectional near-real-time call translation on Windows, using ElevenLabs realtime STT and streaming TTS with Google translation. Winner status not verified. | Listen and reply across languages during an existing voice call | Closest technical prototype found; business growth and customer traction not established |
| BabelRoom | Official ElevenHacks submission describes a multilingual audio room using ElevenLabs voice cloning/TTS and Cloudflare. Award status not verified. | People speak their own languages and hear translated speech retaining vocal identity | Close interaction comparable; general conversation rather than a validated commercial sales workflow |
| Rosetta | Devpost lists HackHive 2026 Third Place Overall; ElevenLabs-based live lecture audio translation | Start with a specific user's difficulty, then combine translation with lecture materials and notes | Verified winner; adjacent one-to-many education workflow, not customer sales |
| AMUSH / AI Multilingual Shopping Host | ElevenLabs reports Seoul second place, 2025 | Product URL becomes multilingual promotional videos and question support | Commercial-growth comparable, but not two humans speaking through an interpreter |

Sources: [Twin Tongue](https://devpost.com/software/twin-tongue), [BabelRoom submission](https://hacks.elevenlabs.io/submissions/984c2925-c87b-4d34-951e-441c699a3c5a), [Rosetta submission](https://devpost.com/software/rosetta-hq6aby), [AMUSH submission](https://devpost.com/software/ai-multilingual-shopping-host), [official 2025 results](https://elevenlabs.io/blog/announcing-the-winners-of-the-elevenlabs-worldwide-hackathon). Twin Tongue's indexed project description was available; its full page could not be fetched. Do not infer missing details.

These are public submission narratives, not verified original pitch decks. Original slide files and complete performance recordings were not inspected. Project authors' claims of perfect accuracy, broad savings or low latency are not independent evidence.

The useful lesson from Rosetta is specificity: one user context and a visible result. For our pitch, two presenters should carry out an actual sales conversation across languages. Ask an unscripted follow-up and correct a date or quantity. That exposes whether meaning survives in both directions more convincingly than two prerecorded greetings.

## Who pays and why

| Priority | Segment | Buyer | Conversation worth enabling | Commercial reason / limitation |
|---|---|---|---|---|
| 1 | Independent tour and experience operators | Owner or booking manager | A visitor asks questions before buying a tour | International audience, bounded vocabulary, observable booking; seasonality matters |
| 1 | Boutique hotels and attractions | General manager or guest-experience lead | Reservation questions, concierge choices, tickets | Repeated visitor conversations; existing chains may have central procurement |
| 2 | Consultative retail: furniture, electronics, specialty goods | Owner/store manager | Product comparison, specifications, delivery, returns | Staff advice can affect purchase decisions; free translation apps are a strong alternative |
| 2 | Small exporters and B2B suppliers | Founder/export-sales manager | Product demo or pre-sales call with a foreign buyer | High value per successful conversation; jargon and long sales cycles complicate proof |
| 2 | Internationally sold software with human demos | Sales/customer-success leader | Discovery, product demonstration, onboarding | Remote/global fit; meeting tools and enterprise interpreters compete |
| Later | Multilocation contact centers | CX leader/IT/procurement | Sales and support across language queues | Higher budgets, but Sanas/DeepL and phone-system integration are significant barriers |

My recommended initial hypothesis is **tourism booking conversations**, because the global audience already exists and a completed booking is observable. This is a recommendation to test, not proof that tourism has the highest willingness to pay. If the team has strong access to a retailer or exporter, that access may be more useful than a theoretically optimal segment.

Avoid defining the customer as “all multicultural businesses.” The payer is an organization with repeated language-mismatched conversations, unmet demand, and a budget. The user is an employee. The beneficiary is a customer who can now speak comfortably. Those are distinct roles.

## A relevant customer database

Build a qualified account list from [Explore Waterloo accommodation listings](https://explorewaterloo.ca/plan/stay/), [Destination Toronto's tour-operator and guide directory](https://www.destinationtoronto.com/travel-trade/products-and-services/), and [Destination Ontario's guided wine-tour directory](https://www.destinationontario.com/en-ca/articles/guided-wine-tours-ontario). These establish reachable categories, not purchase intent.

Initial public research candidates:

| Account | Source establishes | Role to investigate | Unknown that decides fit |
|---|---|---|---|
| The Walper Hotel | Operating Kitchener hotel; [official Hyatt page](https://www.hyatt.com/jdv-by-hyatt/en-US/yyzjd-the-walper-hotel) | Guest-experience/general manager | Frequency of language-mismatched guest calls and local purchasing autonomy |
| Waterloo Central Railway | Visitor train experiences; [official operator page](https://waterloocentralrailway.com/about-us/) | Guest services/ticketing manager | Volume of multilingual booking questions and ability to support a paid pilot |
| St. Jacobs Horse Drawn Tours | Tours and public booking form; [operator page](https://mail.stjacobshorsedrawntours.com/aboutUs.html) | Owner/booking manager | Current operations, visitor languages, and lost or delayed bookings |

All are uncontacted and unqualified. Do not show their logos as customers. The old plumbing prospect list is not the recommended database for this clarified product.

Account fields: business, source/date, geography, customer channel, buyer role, relevant languages, weekly language-mismatched inquiries, existing translator, completion/abandonment rate, gross contribution per completed sale, staff time, device/phone platform, purchasing authority, and next agreed step. Record unknowns as unknown. Language data should come from actual conversations and voluntary customer preferences, not names or ethnicity.

Discovery targets: 10 operator interviews, 3 pilot locations, and several language-mismatched sessions per location per week. Ask for the last actual difficult conversation; how staff handled it; whether the customer completed a purchase; and why Google Translate or a bilingual colleague was insufficient. If the baseline is already satisfactory, we have not found a buyer.

## How it could attract a wider customer base

The proposed growth loop is: announce tested language access → allow the customer to begin easily → translate a useful staff conversation → complete the sale → observe satisfaction and referral/repeat behavior.

For local multicultural customers, test translated invitations and a clearly marked counter or website entry point. For overseas customers, test a browser link for live pre-sales calls and distribution through travel or reseller partners. Language access must continue through price, availability, delivery and cancellation explanations; an untranslated purchase flow can lose the customer after a successful conversation.

Compare three effects separately:

1. Acquisition: did more qualified prospects request a conversation after the business advertised the service?
2. Conversion: among comparable language-mismatched conversations, did more become completed purchases?
3. Service: did misunderstandings, rework and customer effort fall?

A translated conversation count does not measure revenue growth. Overseas visitors already in Canada represent international demand served locally; enabling exporters to sell remotely is a separate expansion story. Do not combine both into an unsupported global market-size claim.

## Pricing and economics for a live interpreter

The earlier C$249 receptionist pricing analysis should not be reused as evidence. Live translation has two audio directions and different usage patterns. Billable source audio, translated output, translation processing, telephony and infrastructure must all be measured. A ten-minute conversation is neither automatically ten nor twenty provider-billed minutes; it depends on stream and billing configuration.

Suggested price-discovery experiment: C$99–C$199 per location/month with a bounded shared-minute allowance, plus usage above the allowance. This range is a hypothesis, not a market quote. Retail access across shifts favors location-based pricing; remote sales may favor staff seats plus shared usage. Enterprise integration can require a separate onboarding fee.

Illustrative C$149/month plan, 200 elapsed conversation minutes and C$30 support/hosting allocation:

| Assumed fully loaded variable cost per elapsed minute | Variable cost | Contribution before sales/R&D/overhead | Margin |
|---|---:|---:|---:|
| C$0.15 | C$30 | C$89 | 59.7% |
| C$0.30 | C$60 | C$59 | 39.6% |
| C$0.60 | C$120 | -C$1 | -0.7% |

These are sensitivity scenarios, not measured provider costs. The minute cost assumption must include both directions, speech recognition, translation, synthesized output, network/calling charges, retries and currency conversion. Payment fees, refunds and additional onboarding further reduce contribution.

Customer break-even example: if an extra completed booking contributes C$50 after variable fulfillment costs, roughly three genuinely incremental bookings cover a C$149 subscription. If contribution is C$150, one covers it. Both values are assumptions to replace with actual customer economics. Incrementality requires a baseline; every translated sale is not necessarily caused by the product.

Build market sizing from the number of qualified locations and their affordable annual price. At C$149/month, 100 locations yield C$178,800 ARR and 1,000 yield C$1.788 million. These are scale scenarios, not the measured size of the market. No defensible count of qualified locations was established in this research.

## What might differentiate us

The strongest candidate is a **ready-to-use interpreter for one customer-facing workflow**, with fast joining, clear staff control, tested domain vocabulary, a reliable correction path, and evidence of commercial value. Each is a hypothesis to compare with existing products. Voice cloning and broad language counts are already offered by competitors.

Specific tests: can a visitor join without installing an app; can an employee begin in under 30 seconds; do both sides understand who is speaking; can they interrupt or correct themselves; are prices, dates, names and negation preserved; does it work in a noisy shop; and what happens when the audio connection fails?

Choose languages from actual demand and available bilingual reviewers. Measure quality separately by direction. French-to-English success does not establish English-to-French performance. Measure end-to-end delay from source speech to usable translated output; TTS first-byte latency alone cannot substantiate a real-time conversation claim.

ElevenLabs can supply speech recognition and speech synthesis while the application controls translation and routing. Its [Speech Engine documentation](https://elevenlabs.io/docs/overview/capabilities/speech-engine) explicitly separates the speech layer from server-side language-model logic. The demo should identify exactly which components were used and show that the system preserves each human's meaning without inventing sales answers.

## A pitch built for this exact product

**Headline:** “Your next customer may speak another language. Your team can still help.”

**Product sentence:** “We translate live conversations in both directions so business staff and customers can each speak their own language.”

| Slide | Main point | Evidence or demonstration |
|---|---|---|
| 1. The missed conversation | A visitor wants to buy, but cannot get an answer in a shared language | One clearly fictional or consented real example; no invented lost-sales figure |
| 2. Hear it work | Customer asks, employee answers, both hear translation | Two humans, one language pair, an unscripted follow-up and corrected date/quantity |
| 3. Who buys | Begin with tourism operators handling recurring visitor questions | Interview findings when available; qualified pilot criteria meanwhile |
| 4. Why this product | Compare with DeepL Voice, EzDubs, Sanas and current workaround | Actual setup, task accuracy and workflow comparison; mark untested differences |
| 5. How value is measured | Completed sales, fewer abandoned conversations, accurate meaning | Baseline and pilot plan; separate acquisition from conversion |
| 6. Business and ask | Proposed location subscription, bounded usage, three pilot sites | Unit-cost sensitivity and a concrete request for operator introductions |

Two-minute allocation: 15 seconds customer problem, 50 seconds conversation demo, 15 seconds buyer, 15 seconds competition, 15 seconds economics/pilot, 10 seconds ask. Show translation early. A dashboard walkthrough cannot substitute for hearing both directions work.

Suggested business narration: “We start with businesses that already meet international customers but cannot cover every language on every shift. Our prototype lets the customer ask questions in their own language and lets an employee answer using their existing expertise. We will test whether that results in more successfully completed conversations and bookings. We propose a monthly location subscription with bounded usage, and we are seeking three tourism operators to measure accuracy, customer effort, conversion and willingness to renew.”

For the Growing Canada theme: enabling Canadian businesses to serve international visitors and multilingual residents is a coherent ambition. Present actual pilot outcomes before claiming national productivity or export impact.

## The evidence that would make this convincing

Run a documented bilingual evaluation of routine sales questions, corrections, prices, dates and background noise before using real customer conversations. Then compare three small pilots with their existing workaround over matched periods. Record samples and sample sizes appropriately; show failures as well as successes.

The decision metrics are meaning accuracy, critical-detail accuracy, latency distribution, completion/abandonment, customer effort, incremental contribution, full serving cost and paid renewal. A useful negative result is that translation demand is too infrequent, users prefer free tools, or employee handling time grows too much. These results would guide a narrower segment or different deployment rather than support a broad “global customers” claim.

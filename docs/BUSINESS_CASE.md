# Front Desk Canada: business and pitch research

> Superseded scope: this report interpreted the product as an AI receptionist. The user clarified that the intended product translates live conversations between human business representatives and customers. Use [LIVE_TRANSLATION_BUSINESS.md](LIVE_TRANSLATION_BUSINESS.md) for the current business thesis, competitors, customers and pitch.

Research date: September 26, 2026. Read alongside `RESEARCH.md` for the earlier claim audit and `PITCH_BLUEPRINT.md` for the presentation. Recommendations and financial scenarios below are analysis, not customer evidence. No prospects were contacted.

## Recommended position

**Front Desk Canada helps small service teams turn a supported-language inquiry into an accurate appointment and a usable owner handoff.** Start with routine plumbing/HVAC inquiries in Waterloo Region, then expand only after measuring results.

The buyer is the owner or operations manager. The caller benefits from language access, but the business pays for fewer interruptions, less re-entry, and correctly handled inquiries. Sell a completed workflow and accountable service. A language count or natural voice is easy for competitors to match.

My assessment: this is a credible hackathon project and a plausible small software business. It has not established a defensible venture-scale advantage. The largest commercial risks are bundled competition, costly onboarding, and too little demonstrated willingness to pay. The immediate question is whether a particular operator will pay for this workflow when existing receptionists are available.

Keep Campaign Studio as an expansion idea or a brief appendix demonstration. Marketing adds a second buyer problem, separate consent requirements, and attribution questions. The current studio is simulated. It should not distract from proving that one inquiry becomes a correct next step.

## Customers, users, and initial segment

| Segment | Paying decision maker | Proposed reason to buy | Fit and obstacle |
|---|---|---|---|
| Plumbing/HVAC firms with roughly 2–15 field workers | Owner/general manager; dispatcher influences purchase | Overflow inquiries, routine scheduling, less owner coordination | First hypothesis; must verify call volume, spare capacity, and existing software |
| Electrical, appliance repair, garage-door service | Owner/office manager | Similar inquiry-to-appointment flow | Adjacent expansion after trade-specific rules are tested |
| Cleaning companies | Owner/operations manager | Repeat appointments and multilingual intake | Easier bounded services; potentially lower willingness to pay |
| Property managers | Operations/maintenance manager | Multilingual tenant intake and contractor handoff | Attractive later; approvals and emergency routing make deployment harder |
| Salons and auto repair | Owner/service manager | Scheduling and service questions | Crowded software market; requires different scheduling logic |
| Clinics, legal and immigration offices | Practice manager/partner | Language access and administrative intake | Defer: sensitive information and domain-specific requirements increase sales and product burden |

Suggested first-customer qualification: local decision maker, recurring inbound calls, documented overflow, simple bookable services, willingness to share a baseline, and ability to serve additional work. A firm already fully booked may value time savings but not more leads. A firm receiving five calls a month probably has weak economics. A firm happy with its bundled receptionist is a difficult first sale.

Do not infer language needs from a business owner's name or ethnicity. Ask which languages callers actually use, how often misunderstandings occur, and whether the owner can serve the customer after intake. Translation at the front door is insufficient if the technician cannot understand the handoff.

Canada's language diversity supports investigating the problem, but does not measure demand. Statistics Canada reports that 98% knew English or French in 2021. Language preference, comfort with technical descriptions, and bilingual service expectations are more defensible hypotheses than claiming that a quarter of Canadians cannot communicate with businesses. [Statistics Canada](https://www.statcan.gc.ca/o1/en/plus/7869-great-canadian-language-mash)

## A market size that can withstand questions

ISED reports **34,695 employer establishments** in Canada's building equipment contractor industry (NAICS 2382) in 2025, including **13,218 in Ontario**. The Canadian total also includes 29,623 non-employer or indeterminate establishments. This category includes more than plumbing/HVAC; establishments are not necessarily independent purchasing companies. [ISED industry table](https://www.ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/2382?wbdisable=true)

The more specific plumbing/HVAC summary identifies NAICS 23822, but its displayed business-count section says to use a higher level. Do not relabel the broader count as plumbing companies. [ISED plumbing/HVAC summary](https://www.ised-isde.canada.ca/app/ixb/cis/summary-sommaire/23822?wbdisable=true)

At a proposed C$249/month, 34,695 establishments would represent C$103.67 million annual subscription spend at 100% adoption. **This is a broad category ceiling scenario, not our serviceable market.** It assumes one subscription per establishment and excludes suitability and competition. Put this in the appendix if used at all.

A defensible serviceable market requires filtering by geography, trade, team size, call volume, language demand, current receptionist, and buying autonomy. Those proportions have not been measured; multiplying invented percentages would create false precision.

Use nearer-term milestones in the main pitch:

| Active paying accounts | Annual recurring revenue at C$249/month | Interpretation |
|---|---:|---|
| 5 | C$14,940 | Pilot-scale learning |
| 25 | C$74,700 | Early operating business |
| 100 | C$298,800 | Meaningful small business; support costs matter |
| 1,000 | C$2,988,000 | Requires repeatable acquisition and onboarding |

These are arithmetic scenarios, not forecasts. A national productivity claim should measure owner minutes saved per correctly completed inquiry. Bookings captured from another contractor do not automatically add to Canadian GDP.

## Competitive landscape

Capabilities below are vendor claims from official pages, not independent comparative tests. Prices can change; compare total account cost, usage units, currency, setup, support, and integrations.

| Competitor/substitute | Verified positioning or capability | Commercial implication |
|---|---|---|
| **Jobber Receptionist** | Calls/texts, answers questions and books into Jobber. Help page lists $29/month for 30 conversations, $0.79 extra; included on Plus. Jobber lists plans in USD. | Most serious incumbent for Jobber users: existing customer records and scheduling. Our local calendar is currently weaker. |
| **Call Julie** | Canadian trades positioning; advertises French/English switching, answering and booking. Price set during demo. | Directly challenges a Canada-plus-bilingual differentiation claim. |
| **AlmaTalk** | Canadian front-office product; advertises English/Québec French plus other languages, appointments and follow-ups. | Localized language and broader workflow are already marketed. |
| **Smith.ai** | AI reception with access to human agents; also offers live receptionist services. | Human fallback creates a trust benchmark. Compare actual Canadian coverage and language support in procurement. |
| **Google Translate** | Live headphone translation across 70+ languages, with iOS expansion announced March 2026. | Strong low-friction substitute when a person is available to handle the workflow. |
| **DeepL Voice** | In-person business conversation translation; captions and voice-to-voice support advertised. | Strong language-tool substitute. Its product page does not establish an autonomous trades booking workflow. |
| **Retell AI / custom agency build** | Voice-agent platform advertises $0.07–$0.31/minute depending on configuration. | Competes with our implementation and makes similar products easier to build. Platform fees are not turnkey service costs. |
| **Owner, dispatcher, voicemail, website booking** | The customer's existing process | Often the actual competitor. Switching must produce enough value to justify another system. |

Sources: [Jobber capabilities and add-on](https://help.getjobber.com/en/articles/receptionistpowered-by-jobber-ai/), [Jobber USD pricing](https://www.getjobber.com/pricing/), [Call Julie](https://calljulie.co/), [AlmaTalk](https://almatalk.ca/), [Smith.ai](https://smith.ai/ai-receptionist), [Google](https://blog.google/products-and-platforms/products/translate/live-translate-with-headphones/), [DeepL](https://www.deepl.com/en/products/voice/deepl-voice-for-conversations), [Retell](https://www.retellai.com/pricing).

At 100 chargeable conversations, Jobber's listed receptionist add-on arithmetic is US$84.30 before the required base subscription. For an existing Jobber customer, that incremental cost is more relevant than the price of the entire suite. Avoid using stale third-party $99/month reviews when the official help page says otherwise.

We cannot yet claim better language quality, lower total cost, easier deployment, or superior conversion. The possible differentiation to test is **a locally configured trades service with verified language handling, clear owner approvals, and accountable onboarding**. Establish a comparison using the same caller scenarios and actual customer workflow.

Potential defensibility over time: consented domain evaluation sets, integrations that retain booking context, repeatable configuration for one trade, distribution through trusted local partners, and measured customer outcomes. None is an existing moat. ElevenLabs access is available to competitors.

## Pricing and unit economics

Test two clearly bounded offers after production requirements are met: C$149/month with 150 minutes for light overflow; C$249/month with 300 minutes and more onboarding help. A possible C$299 setup fee and C$0.65/minute overage are hypotheses. Ask for willingness to pay before treating these as a price list. Avoid unlimited plans until actual long-call, spam, silence, retry, and support costs are known.

ElevenLabs' current Agents page lists $0.08/additional call minute and $0.16 burst pricing, with LLM and telephony billed separately. Its May 2026 pricing announcement, updated August 31, notes that existing accounts may need to switch to new pricing. Older help pages show different allowances. Verify the account's billing plan and currency before procurement; free sponsor credits do not establish sustainable margins. [Agents pricing](https://elevenlabs.io/pricing/agents), [pricing change](https://elevenlabs.io/blog/weve-lowered-api-agents-pricing-and-introduced-pay-as-you-go)

Illustrative C$249 plan economics at 300 minutes/month:

| Scenario | Assumed all-in variable cost/minute in CAD | Voice/LLM/telephony | Monthly support/hosting allocation | Contribution before acquisition, R&D and overhead | Contribution margin |
|---|---:|---:|---:|---:|---:|
| Efficient | C$0.18 | C$54 | C$30 | C$165 | 66.3% |
| Base planning case | C$0.28 | C$84 | C$45 | C$120 | 48.2% |
| Expensive support/usage | C$0.40 | C$120 | C$75 | C$54 | 21.7% |

All CAD cost assumptions include an allowance for foreign currency conversion and ancillary usage; they are not provider quotes or measured costs. Add applicable payment fees, refunds, channel commissions and onboarding amortization to the model when known. At 600 minutes and C$0.28/minute, an uncapped C$249 subscription leaves only C$36 after C$45 support allocation. Usage limits materially change viability.

At C$120 monthly contribution, a hypothetical C$600 acquisition cost pays back in five months, excluding onboarding losses. Founder sales time must be valued: a spreadsheet showing zero ad spend is not zero acquisition cost. Do not present lifetime value until retention is observed.

Customer ROI should use contribution from completed incremental jobs, not gross quoted job value. Example assumptions: a C$400 completed job with a 40% contribution margin produces C$160; two additional completed jobs generate C$320 before our C$249 fee. Alternatively, C$249 equals about 7.1 hours at an assumed C$35/hour owner/admin value. Count time savings separately if those hours are already reflected in additional job contribution.

## Acquisition and a useful prospect database

Start with owner-led discovery in Waterloo/Kitchener/Cambridge, where the team can understand workflows and observe onboarding. The [starter account list](PROSPECTS.md) contains 12 public research candidates with sources. It is a prospect list, not a customer list. Size, software, language demand, pain and budget remain unverified.

Expand through public municipal contractor lists, company websites and the HRAI contractor locator. Municipal registration indicates relevance to a service category, not purchase intent or endorsement. [Waterloo list](https://www.waterloo.ca/water-utilities/prevent-backflow/), [HRAI locator information](https://www.hrai.ca/newsletter/hrai%E2%80%99s-online-contractor-locator-and-call-centre--serving-contractor-members)

Store company, domain, area, trade, public contact channel, source/date, decision-maker role, current phone/calendar tools, eligible call volume, language demand, baseline owner minutes, capacity, agreed next step, and status. Keep unknowns explicitly unknown. Do not import prospects into the app as customers or testimonials.

Proposed discovery funnel: research 30 accounts, hold 10 interviews, recruit 3–5 pilots, and seek 3 paying renewals. These are operating targets. Warm referrals through trade suppliers, local web agencies and business networks may later reduce acquisition cost; no channel partnership is established.

Interview sequence: ask for the last actual inquiry that required extra coordination; how it was handled; the weekly call and overflow volume; caller languages; current software; capacity for additional work; and what a correct handoff needs to contain. Then show the demo and ask what would justify paying C$149 or C$249. A polite compliment is weaker evidence than willingness to connect a calendar, share a baseline, or pay.

## Pilot design and product priorities

First validate with consented fictional calls, then a small bounded production pilot after the integration/security requirements in README are met. Proposed pilot: 3–5 firms, roughly two weeks of baseline observation followed by four weeks of service. Match time windows and job mix; where feasible compare equivalent randomized overflow windows. Seasonal demand and staffing changes can otherwise look like product impact.

Track eligible inquiries, correct required fields, owner editing minutes, successful confirmed bookings, cancellations, completed jobs, complaints, escalations and full costs. Segment language quality by language and measure phone/address/date/service accuracy. Bilingual reviewers should score meaning and action accuracy, not just how natural the voice sounds.

Proposed decision thresholds, not current results: at least 95% required-field accuracy on a documented test set; no unauthorized bookings or critical fabricated prices; at least 30% lower owner handling time; at least three of five pilots willing to renew at the proposed price. Show sample sizes and failures. A small successful pilot cannot establish broad statistical reliability.

Build priorities derived from the business case: demonstrate an actual ElevenLabs tool call and receipt; connect a real calendar; validate one service and two languages; give the owner a reliable correction/fallback path; instrument costs and outcomes; make onboarding repeatable. Full CRM replacement, payments, outbound sales and additional campaign channels can wait.

If demand is mainly for message-taking, simplify the offer. If non-English calls are rare, test coordination savings without centering language. If only fully managed custom projects sell, price implementation separately and recognize that this may initially be a services business. If satisfied Jobber users will not switch, focus discovery elsewhere or investigate a complementary integration.

## Historical winners and comparable pitches

AF describes September 2026 as its inaugural hackathon, so there are no prior AF winners to imitate. Luma currently specifies a maximum five-minute demo video and a public repo, with a Growing Canada theme. The existing project research recorded equally weighted theme, viability and pitch criteria; the Devpost rules page could not be independently re-fetched in this research pass. [AF events](https://www.ascendancefoundry.com/events/), [current event page](https://luma.com/asvdo3m9)

Awards below are verified from ElevenLabs' reports. The presentation lessons are my inference, not judges' scorecards. Public project writeups were inspected; embedded video URLs were located, but video playback/transcripts and original slide decks were not available in this pass. These are **pitch comparables**, not reproduced winning decks.

| Project / award | Publicly documented proposition | Presentation lesson for us |
|---|---|---|
| GibberLink — 2025 global top prize and London first | Agents recognize each other and switch to an audio protocol | Build one memorable, observable transition |
| Procuro — 2025 New York second | Supplier calling for procurement | Tie voice to an expensive operational bottleneck |
| Dealwise — 2025 San Francisco first | Calls local businesses to collect quotes | Show a resulting artifact the buyer understands |
| AMUSH — 2025 Seoul second | Multilingual shopping host | Attach language access to a specific commercial activity |
| Hugo Tour Guide — 2025 online first | Context-aware travel guidance | Give the agent context and a clear user task |
| Junction — Penn AI Hackathon 2026, Best use of ElevenLabs | Routes patients and context to a human provider and appointment | Demonstrate the useful handoff after a conversation |
| Health Butler — Clinical OpenClaw Hackathon winner, reported in 2026 | Native-language patient communication | Connect language to access and a concrete next step |

Award sources: [2025 worldwide results](https://elevenlabs.io/blog/announcing-the-winners-of-the-elevenlabs-worldwide-hackathon), [2026 care/accessibility results](https://elevenlabs.io/blog/how-hackathon-teams-are-using-elevenlabs-to-make-care-more-accessible). Medical hackathon recognition does not establish clinical effectiveness or suggest that we should pivot to healthcare.

**Procuro's written pitch:** family experience in manufacturing, repetitive vendor calls, automation, dashboard and purchase-order evidence, then integration roadmap. Its submission discusses a late pivot from ASL translation. Reuse the specificity of the workflow and evidence, rather than claiming its results as our own. [Submission](https://devpost.com/software/procuro), [demo link](https://www.youtube.com/watch?v=jzP9WBGb6fQ).

**Dealwise's written pitch:** the founders describe trying to arrange cleaning for a secondhand couch; users enter a service and location, and quotes populate from businesses. Its submission shows call and quote-list artifacts and acknowledges IVR trouble. Reuse the relatable opening and visible outcome. Its claims about concealing AI identity are not a recommended practice for our service. [Submission](https://devpost.com/software/john-ai), [demo link](https://www.youtube.com/watch?v=r41PtYvSRTw).

**AMUSH's written pitch:** one product URL becomes multilingual promotional videos and customer-question support. The seller and output are immediately understandable. Useful comparison for Campaign Studio, although our current studio does not generate live campaigns or deliver their outcomes. [Submission](https://devpost.com/software/ai-multilingual-shopping-host), [demo link](https://www.youtube.com/watch?v=E2gNMxbuPRQ).

**GibberLink's written pitch:** increasing agent-to-agent calls motivate changing the communication protocol. Its audible change provides a compact reveal. For us, the reveal should be an accurate booking and owner summary following a supported-language inquiry. [Submission](https://devpost.com/software/gibber-link), [demo link](https://www.youtube.com/watch?v=EtNagNezo8w).

The common pattern I infer is a particular person, a painful task, a necessary role for voice, and observable completion. Award lists are subject to selection bias and do not prove a universal formula or commercial success. Business outcomes, paid customer counts and fundraising for these hackathon projects were not verified.

## What to say when challenged

**“Why can't Jobber do this?”** It already handles much of this workflow. We are testing whether local configuration and verified multilingual handoffs solve a remaining problem for a particular operator. The comparison is part of our pilot.

**“Is this just an ElevenLabs wrapper?”** ElevenLabs supplies voice. Our prototype supplies constrained business actions and persistent owner records. Commercial value still depends on integrations, onboarding and measured outcomes; exclusivity is not established.

**“What traction do you have?”** A prototype and a sourced prospect list. No interviews, pilots, revenue or language benchmarks are claimed in this research.

**“What is live?”** The repository documents local intake, rules, booking and audit records. Voice/SMS require account-level validation; Campaign Studio is simulated. Change this answer only with new evidence.

**“How does this grow Canada?”** Test whether the same service team spends less time coordinating and can handle inquiries more effectively. Measure that before making broader productivity estimates.

**“What will the next month prove?”** Whether several real operators will adopt, whether the workflow reduces handling effort without unacceptable errors, and whether they renew at a price that covers usage and support.

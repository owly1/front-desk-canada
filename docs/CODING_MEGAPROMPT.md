# Coding megaprompt: ElevenLabs multilingual AI sales and service agent

**Corrected product direction — September 26, 2026.** This replaces the previous human-to-human interpreter brief. The AI agent itself converses with the customer on the shop's behalf. The primary requirement is an ElevenLabs conversational-agent integration; scripted scenes remain a separate recording fallback.

Copy everything below into the coding agent working on this project.

---

You are the product engineer for **Front Desk Canada**, a multilingual AI sales and service agent for businesses. Implement the following product in the existing repository.

## 1. The actual product

A customer speaks directly to an AI agent powered by the ElevenLabs Agents platform. The agent understands the customer's needs, responds conversationally in their preferred supported language, answers business-specific questions, and helps complete a purchase inquiry, order, appointment or booking.

A human employee does not need to participate in the normal conversation. Human follow-up is an exception for requests the agent cannot resolve.

The business ambition is to help shops serve multicultural communities, reach customers across Canada, and support international inquiries without requiring staff fluent in each customer's language. Multilingual campaigns and customer-facing entry points attract inquiries; the conversational agent helps convert those inquiries into useful business outcomes.

Positioning: **Give your shop a multilingual AI representative that can welcome customers, answer their questions and help them buy or book.**

The user wants ambitious product depth and a compelling video. Build the real ElevenLabs integration path, while allowing clearly labeled simulations for booking connectors, campaign publishing and other infrastructure that is unnecessary for the video. Do not substitute prerecorded audio or browser speech synthesis for the required ElevenLabs agent integration.

“Any language” expresses the ambition. The actual UI and agent must expose languages supported by the configured ElevenLabs agent/model, distinguish configured from evaluated languages, and handle unsupported requests honestly. Do not hardcode a universal language count or advertise guaranteed fluency in every language.

## 2. Repository and source of truth

Repository: `/Users/terrywang/Documents/ChatGPT/AFhacks`.

Read applicable repository instructions, `README.md`, `spec.md`, `claude.md`, `docs/INTEGRATIONS.md`, `docs/DEMO.md`, `agent/system_prompt.md` and `agent/knowledge.md`. Inspect actual implementation and Git status before editing.

Existing components include FastAPI, Pydantic, SQLite, plain HTML/CSS/JavaScript, optional ElevenLabs voice activation, authenticated agent tools, signed post-call receipts, an owner dashboard, appointments and a multilingual Campaign Studio. `/demo` has isolated browser-only fictional data. Build on those assets and preserve unrelated uncommitted work.

Read `docs/research/2026-09-26/` for competitors, prospect research and presentation lessons, with this explicit correction:

- The earlier human-interpreter recommendation is superseded by this brief.
- Do not build a two-human translation bridge, dual employee/customer speaking controls or an employee-dependent primary journey.
- Do not force the product into tourism. Keep the existing fictional shop/service business and make the agent configuration reusable across shops.
- Autonomous business agents such as Slang, SoundHound, ConverseNow and PolyAI are the most relevant competitive category.
- Human-interpreter cost models and segment rankings cannot be reused as validated economics for this autonomous agent.

Retain the current stack unless a focused dependency is necessary for the official ElevenLabs integration. Avoid a wholesale framework rewrite.

## 3. Real ElevenLabs conversation integration — highest priority

Implement a customer-facing voice-agent experience using the official ElevenLabs Agents SDK or supported widget. Choose the approach that provides reliable session control and enough interaction events for the intended UI. Inspect existing integration first; reuse working pieces.

Required behavior:

- Customer explicitly starts the conversation and grants microphone access.
- The agent identifies itself as the shop's AI assistant, then converses naturally.
- Streaming customer input and generated agent speech operate through ElevenLabs.
- Display connection, listening, agent-speaking, muted, reconnecting, ended and failed states based on actual events where supported.
- Provide mute, end conversation, transcript visibility and accessible text fallback where the chosen interface supports it.
- Handle permission denial, unavailable microphone, rejected session, disconnected network and provider failure without pretending the call continues.
- Preserve one consistent conversation/session identity across tools, transaction records and post-call receipts.
- Use documented interruption/turn-taking behavior so a customer can correct or interrupt the agent; do not implement a fake waveform as proof of live audio.

Use server-side credentials. Where the selected transport requires a short-lived signed URL or conversation token, issue it through a backend endpoint following current official documentation. Do not expose the API key or privileged owner token in frontend code, page source or logs. Do not guess SDK method names or copy outdated configuration schemas.

A customer-facing session must not grant owner-dashboard privileges. Keep private test sessions separate from a future public storefront. If a public session route is implemented, constrain it to the allowed business/agent and include basic origin, usage and session controls; do not create an unrestricted credential-minting endpoint.

If credentials or a configured agent are absent, implement the full local integration code and precise setup instructions, then show “Agent setup required.” Keep working on independent UI and business-tool integration. Never report a live conversation as verified solely because the code exists.

## 4. Multilingual agent configuration

Configure or provide the configuration payload for:

- Business-specific system instructions and knowledge.
- Primary and additional supported languages.
- A suitable multilingual voice/model based on current provider support.
- Localized first messages where supported.
- Language detection/switching using current ElevenLabs capabilities.
- Natural conversational turn-taking and interruption behavior.
- Authenticated business tools, appropriate conversation limits and failure responses.

Treat English, French and Mandarin as initial demonstration candidates already present in the repository, not the full product boundary. Make the enabled language set configurable. Additional candidates may include Spanish, Arabic, Hindi or Portuguese only when the selected setup actually supports them.

Follow a customer's explicit language preference. Maintain the same request, product selections, identity and transaction when the language changes. Ask for clarification when detection is uncertain; do not infer nationality, location or ability to pay from accent or language.

Provide an agent setup/configuration script or structured config artifact matching the current API. Default provisioning scripts to preview/dry-run and document explicit apply behavior. Do not silently modify an existing hosted agent or buy/upgrade services. Missing account configuration should be reported precisely, not used to avoid implementing the integration.

## 5. Business knowledge and owner setup

Add a focused setup experience for the shop owner:

- Shop name, description, brand tone and contact routes.
- Products/services, catalog IDs, approved prices or price ranges.
- Opening hours, location, service area and time zone.
- FAQs, booking/ordering policies, cancellation/return rules.
- Shipping destinations or service coverage, if applicable.
- Enabled languages and preferred language for owner summaries.
- Escalation conditions and human follow-up route.

Use editable structured fields and owner-supplied knowledge. Make the agent's knowledge source and update state visible. Do not silently fetch arbitrary URLs supplied by customers or let conversation content rewrite the business configuration.

Separate stable FAQ knowledge from changing inventory, prices and availability. Dynamic business facts must come from tools at the time of the request. If an answer is absent, ask, say it is unknown or offer follow-up; do not invent a policy.

Keep the existing fictional Grand River Plumbing & Heating profile working. A second fictional retail shop profile can demonstrate broader applicability after the core agent-to-booking path is complete. Profiles must not mix catalogs, policies or records. Avoid a production multi-tenant platform rewrite.

## 6. Agent behavior: conversational sales and service

Write and integrate a strong agent system prompt. The assistant should:

1. Welcome the customer and identify itself as AI.
2. Establish the customer's request and preferred supported language.
3. Answer relevant questions from approved business information.
4. Ask short, useful follow-up questions instead of delivering a long form aloud.
5. Recommend an appropriate catalog option based on expressed needs.
6. Explain the actual price/range and limitations returned by tools.
7. Check current availability or ordering eligibility.
8. Read back important details and request explicit confirmation.
9. Commit the appropriate business action through an authenticated tool.
10. Explain the actual result and offer a receipt/message preview or supported follow-up.

Support interruptions, hesitation, spelling, changed quantities, revised dates and mid-conversation language switches. Corrections must update structured state; they must not be acknowledged verbally while leaving an obsolete booking unchanged.

Do not fabricate scarcity, discounts, stock, delivery promises or successful payments. Recommendations should fit customer needs and business policy. Preserve the existing emergency/unpriced-work handling for the service profile.

## 7. Business actions and reliable transaction state

Extend the current protected tools rather than introducing a disconnected parallel backend. Inspect existing endpoints including quote, lead, availability, booking, callback and SMS tools.

Implement the conceptual capabilities needed for the selected profile, reusing endpoint names where appropriate:

- Retrieve approved offerings and business facts.
- Get a server-calculated quote or price range.
- Check availability or fulfillment eligibility.
- Create and update a consented inquiry/draft.
- Apply customer corrections before confirmation.
- Confirm a booking or create an order request.
- Request human follow-up.
- Prepare a receipt or message preview.

Add schema-validated correction/update handling where the current agent only falls back to human review. Store a canonical transaction revision and invalidate confirmation after material changes. If a confirmed booking must change, use an explicit supported reschedule/cancel workflow or request review; never silently mutate it.

The server controls prices, IDs, policy, booking eligibility and inventory. Bind the conversation identity through documented provider variables and validated session context. Do not accept an arbitrary customer-selected business or conversation ID as authorization.

Use idempotency and existing atomic booking rules. A timeout must not cause duplicate leads or bookings. Do not announce success before a tool returns success. A failed SMS preview/delivery must not undo or misrepresent a successful booking.

For a retail profile, distinguish an order draft/request from a paid or fulfilled order. A real checkout/payment integration is not required for this brief.

## 8. Customer-facing experience

Build a polished branded entry page centered on **“Talk to our AI assistant.”** Show supported language options, what the assistant can help with, and an accessible alternative.

During the conversation, show:

- The AI assistant and customer, with clear roles.
- Actual conversation state and optionally the transcript.
- Relevant product/service cards when supported by tool results.
- A live-updating summary of the request, proposed time, price and outstanding questions.
- A confirmation/receipt panel based on actual backend outcomes.

The summary is an aid to the agent-led conversation. It should not require an employee to approve every turn. Human intervention appears only when necessary.

Use client tools/events only for appropriate UI updates. Client-side events must not be trusted to create authoritative bookings or alter prices. Limit exposed customer data to the current session.

Preserve the current visual identity, improve hierarchy and bilingual typography, and keep the main flow readable in a screen recording. Avoid a crowded interface built around implementation details.

## 9. Connect acquisition to conversation to outcome

Extend the existing multilingual Campaign Studio so the story becomes:

**Localized campaign or product page → customer opens the shop's agent → conversational assistance → confirmed booking/order request → owner sees the outcome.**

Carry campaign, offering and source attribution into the session. Any browser-supplied campaign metadata is attribution data, not privileged business instructions. Campaign generation and launch may remain clearly identified previews; do not publish ads or send marketing messages.

National/global access needs business-aware answers. The agent must check actual service areas, shipping destinations and hours. It can collect an international inquiry when fulfillment is unknown, but cannot claim a local plumber can perform an overseas job or invent international delivery. Show the customer an explicit currency and time zone. Use location and language as separate fields.

The product can welcome customers worldwide while each shop controls where and how it can fulfill requests.

## 10. Owner dashboard and follow-up

Extend the dashboard to show:

- Customer conversations and preferred languages.
- Qualified inquiries, confirmed bookings and order requests.
- Source/campaign attribution where captured.
- Unresolved questions and human-follow-up requests.
- A concise owner-language summary preserving the original request and uncertainty.
- Requested action, actual tool result, and relevant conversation/booking identifiers.
- Actual provider usage/cost when available, otherwise a clearly identified estimate or unavailable state.

Preserve authenticated owner access and signed post-call receipts. Keep original-language transcripts distinct from translated/generated summaries. Do not mix simulated call fixtures into verified provider receipts.

Calculate metrics from real records or clearly labeled demo records. Do not call every agent conversation a recovered sale. Separate booking value, paid revenue, completed tasks and measured conversion uplift.

The prior C$199 pricing figure can remain an editable hypothesis, but autonomous-agent economics need a new model using actual ElevenLabs Agents pricing, selected LLM charges, telephony if enabled, storage and support. Do not reuse the two-human STT/TTS cost calculation as the cost of this agent.

## 11. Live mode and recording fallback

Maintain two explicit modes:

**Live agent mode:** actual customer speech and ElevenLabs responses, with real local validated tool actions where configured. Integration status must reflect configuration and observed events. Browser voice interaction is the priority; telephone numbers and outbound calls are optional later integrations.

**Concept recording mode:** account-free, deterministic scenes under `/demo`, using fictional data and simulated business actions. It must depict a customer talking with an AI representative. It must never imply an employee is translating or silently initiate provider calls.

A hybrid video can show a real ElevenLabs conversation plus clearly labeled simulated external booking infrastructure. Identify scripted/recorded scenes; do not manufacture latency, reliability, real customers or live call receipts.

Add recording controls: scene selection, reset, replay, pause and clear start state. Keep `/demo` isolated from the owner's database and provider traffic. Provide a polished 75–90-second flagship scenario:

1. Customer opens a localized campaign/store page.
2. Customer starts speaking in French or another configured language.
3. The AI responds naturally and answers a business-specific question.
4. The customer interrupts to change a date, product or quantity.
5. The AI preserves context and optionally follows an explicit language switch.
6. The AI checks a real local tool, reads back details and obtains confirmation.
7. A booking/order request appears with an accurate status.
8. The owner receives a summary and sees the inquiry's source and language.

Show one smooth conversation with a meaningful complication. Additional channels and profiles can be short secondary scenes.

## 12. Integration and execution boundaries

Keep secrets in server-side environment variables; update `.env.example` with placeholders only. Document required agent ID, API credentials, webhook/tool authentication, callback base URL and language configuration. Never request secrets in chat or commit them.

Preserve consent and access boundaries. No real customers, prospect outreach, purchases, deployment, repository publishing or external messages are part of this implementation request. Hosted agent changes and paid provider operations require appropriate existing authorization; code/config generation can proceed independently.

If account settings block live activation, identify the exact missing setting and provide the completed code/config plus setup steps. Do not ask vague permission questions or abandon unrelated implementation.

Do not add or run automated tests unless the user separately asks for testing or verification. Report inspection and verification status accurately. Do not claim real voice, language quality or provider-tool behavior was verified without observing it.

## 13. Delivery sequence

1. Inspect current integration and preserve existing work.
2. Establish the real ElevenLabs customer conversation path, agent prompt and language configuration.
3. Connect knowledge and existing business tools to the agent.
4. Add structured corrections, confirmations, failure handling and consistent records.
5. Build the customer-facing shop/agent experience.
6. Connect campaign attribution and owner summaries/outcomes.
7. Add secondary configuration, optional shop profile and recording fallback.
8. Update setup, capability status and the demo runbook.

The essential deliverable is **customer → multilingual ElevenLabs AI agent → business action → owner record**. Complete this before expanding peripheral features.

## 14. Completion criteria and handoff

- The code supports an actual ElevenLabs agent conversation once required credentials/configuration are supplied.
- The AI handles the normal conversation independently of a human employee.
- Enabled languages come from the actual supported setup; unsupported requests have an honest fallback.
- Switching language does not reset the business request.
- Business facts, pricing and availability are grounded in approved data/tools.
- Corrections update state and invalidate stale confirmations.
- The agent announces only tool-confirmed outcomes.
- Customer and owner views reflect the same conversation and transaction.
- Simulated and real provider activity remain separate.
- The video can demonstrate the whole intended journey without production telephony or external commerce infrastructure.

Update `README.md`, `spec.md`, `docs/INTEGRATIONS.md`, `docs/DEMO.md`, the agent instructions and necessary configuration artifacts to match actual behavior. Explicitly replace earlier human-interpreter framing wherever it directs current implementation. Do not silently rewrite historical research findings as evidence for the new product.

Finish with what changed, local launch/entry URLs, provider setup still needed, what is real versus simulated, and any unverified behavior. Do not commit or push unless separately requested.

## Official technical references

Verify current schemas and SDK behavior against these primary sources during implementation:

- [ElevenLabs Agents quickstart](https://elevenlabs.io/docs/eleven-agents/quickstart)
- [Language configuration](https://elevenlabs.io/docs/eleven-agents/customization/voice/customization/language)
- [Language detection tool](https://elevenlabs.io/docs/eleven-agents/customization/tools/system-tools/language-detection)
- [Widget integration](https://elevenlabs.io/docs/eleven-agents/customization/widget)
- [Webhook tools](https://elevenlabs.io/docs/eleven-agents/customization/tools/webhook-tools)
- [Dynamic variables](https://elevenlabs.io/docs/eleven-agents/customization/personalization/dynamic-variables)
- [Post-call webhooks](https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks)

Start with repository inspection, then implement this agent-centered product.

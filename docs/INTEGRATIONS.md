# Integration gate: local core to a real voice conversation

No paid account changes, number purchases, external calls, SMS or agent creation have been performed by this build. Follow these steps with your own account and test consent. Do not paste keys into GitHub or chat.

## 1. Local application

Follow README. Set distinct ADMIN_TOKEN and AGENT_SECRET in `.env`. Keep DEMO_MODE=true and ENABLE_LIVE_SMS=false initially. Restart the server. Verify `/health` and the local manual booking path first.

The dashboard requires an owner session. Direct localhost bootstrap checks both socket address and Host and rejects forwarded headers. When using a tunnel, enter ADMIN_TOKEN in the sign-in form. Use HTTPS. This single-owner demo is not a production authentication system.

## 2. ElevenLabs agent

Create or use an agent in your own workspace. Paste `agent/system_prompt.md` and add `agent/knowledge.md`. Store its ID as ELEVENLABS_AGENT_ID locally. Do not clone a person's voice without authorization. Use a licensed stock voice.

Select a model and enabled languages from the current provider list. Flash v2.5 does not include Punjabi; English/French/Mandarin are candidate demo languages. Verify service nouns, dates, amounts, interruptions and mid-call switching with a speaker who can assess them. Do not enable an advertised language because an LLM says it can speak it.

Set the transparent first message and configure provider recording/retention appropriately. The prompt does not control whether the provider records. Use synthetic details for testing. Apply provider domain restrictions, session/spend limits and an appropriate authentication setup. The simple embedded widget expects an agent configured for that widget; authenticated agents need the provider's signed-session integration, which is not implemented here.

## 3. Webhook tools

Expose only the running demo server over an authenticated HTTPS tunnel after checking all secrets. A temporary URL changing invalidates configured tool URLs; update every tool after a restart.

Run `.venv/bin/python -m scripts.tool_manifest` to print the endpoint contracts and JSON request schemas. This is a provider-neutral setup manifest, not a promise that it can be imported wholesale into ElevenLabs. Create webhook tools in the dashboard using each POST URL and the request properties. Store X-Agent-Secret as a provider secret; do not make it an LLM-generated field. Configure Content-Type: application/json and wait for actual responses.

Bind `conversation_id` to the provider system variable `system__conversation_id`, not model-generated text. `source` is `elevenlabs`; subsequent operations use returned `lead_id` and `booking_id`. The API's structured 4xx responses are meaningful; the agent must not turn them into success. Timeout failures require checking state or a safe same-ID retry, not creating a second lead.

Tool sequence: get_quote → consent and readback → log_lead → qualify_budget → check_availability → explicit confirmation → create_booking → send_sms (if consented). Unpriced/urgent cases use human review. Turn off transfer/outbound tools until explicitly implemented and validated.

Official references: [webhook tools](https://elevenlabs.io/docs/eleven-agents/customization/tools/webhook-tools), [dynamic variables](https://elevenlabs.io/docs/eleven-agents/customization/personalization/dynamic-variables), [models](https://elevenlabs.io/docs/overview/models).

## 4. Signed post-call receipts

Configure a post_call_transcription webhook to `/webhooks/elevenlabs`. Save its generated secret as ELEVENLABS_WEBHOOK_SECRET. Restart. Backend uses the official SDK verifier, requires the configured agent ID and a previously consented intake, and deduplicates conversation IDs. Unsupported webhook kinds are ignored. No audio blobs are stored by this backend.

Do one consented test. Check that the tool-created booking exists before the receipt arrives, then confirm one receipt appears under Call receipts. Replay must not double-count it. See [post-call webhook docs](https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks).

## 5. Real telephone / SMS gate

Optionally import an existing purchased voice-capable Twilio number using ElevenLabs' [native integration](https://elevenlabs.io/docs/eleven-agents/phone-numbers/twilio-integration/native-integration). A verified caller ID alone cannot receive inbound calls. Do not buy or upgrade an account without the owner's explicit spending approval. Confirm trial restrictions and actual number capabilities in the account.

For outbound confirmation SMS, set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER and an exact comma-separated SMS_ALLOWLIST of consenting test recipients. Then enable ENABLE_LIVE_SMS=true and restart. SMS consent on the intake is also required. Synthetic scenario buttons never send externally, regardless of live mode.

The SMS tool chooses recipient and message from the booking record, not arbitrary model text. An accepted provider response is not delivered. Timeouts leave an uncertain state that requires human review; do not blindly retry. No delivery-status callback is implemented. Test from the owner UI before involving anyone else's phone.

## Release gates still unverified

- [ ] Real agent invokes a protected tool successfully.
- [ ] English booking survives an interrupted/corrected conversation.
- [ ] French and one third language pass speaker review.
- [ ] Mid-call switch preserves customer/slot identity.
- [ ] Post-call receipt matches the actual conversation ID.
- [ ] One allowlisted, consented SMS is actually received.
- [ ] Slot conflict and tool timeout are spoken honestly.
- [ ] Privacy/retention configuration is independently checked.

Do not mark these passed from local tests, synthetic scenarios or the existence of an agent ID.

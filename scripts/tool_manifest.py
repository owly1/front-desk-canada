"""Print provider-neutral tool contracts without secrets or network calls."""
import json

from app.models import BookingRequest, BudgetRequest, EmergencyRequest, Inquiry, LeadRequest, QuoteRequest, SmsRequest

TOOLS = [
    ('get_quote', QuoteRequest, 'Read the fixed illustrative range; unpriced jobs require human assessment.'),
    ('log_lead', Inquiry, 'Persist consented intake once per provider conversation. Returns id used as lead_id.'),
    ('qualify_budget', BudgetRequest, 'Record the caller\'s explicit budget signal.'),
    ('check_availability', QuoteRequest, 'Read actual available local-calendar slots. Not a reservation.'),
    ('create_booking', BookingRequest, 'Atomically reserve after explicit caller confirmation. Returns booking id.'),
    ('send_sms', SmsRequest, 'Preview or send to the booking recipient only; inspect returned status.'),
    ('flag_hot_lead', LeadRequest, 'Flag an existing lead for owner review; no invented valuation.'),
    ('callback_missed_call', LeadRequest, 'Queue HUMAN follow-up only. Does not make an outbound call.'),
    ('flag_emergency', EmergencyRequest, 'Flag human review only. Never dispatch or promise an ETA.'),
]


def manifest():
    return {'format': 'provider-neutral; configure through current ElevenLabs UI/API',
            'method': 'POST', 'base_url': 'YOUR_HTTPS_BASE_URL',
            'headers': {'X-Agent-Secret': 'PROVIDER_SECRET_REFERENCE', 'Content-Type': 'application/json'},
            'conversation_id_binding': 'system__conversation_id',
            'tools': [{'name': name, 'path': '/tools/' + name, 'description': description,
                       'request_schema': model.model_json_schema()} for name, model, description in TOOLS]}


if __name__ == '__main__':
    print(json.dumps(manifest(), indent=2, ensure_ascii=False))

import concurrent.futures
import hashlib
import hmac
import json
import time

import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app
from app.models import BookingRequest, Inquiry
from app.store import DomainError


@pytest.fixture
def setup(tmp_path):
    settings = Settings(db_path=str(tmp_path / 'test.db'), admin_token='owner-test',
                        agent_secret='agent-test', agent_id='agent-test-id', webhook_secret='webhook-test')
    app = create_app(settings)
    return TestClient(app), app.state.store, settings


OWNER = {'Authorization': 'Bearer owner-test'}
AGENT = {'X-Agent-Secret': 'agent-test'}


def inquiry(cid='call-test', **changes):
    data = dict(conversation_id=cid, name='Example caller', phone='+12265550147',
                city='Waterloo', address='123 Example Street', job_type='water_heater',
                language='en', summary='Synthetic water heater inquiry',
                consent_to_store=True, sms_consent=True, source='manual')
    data.update(changes)
    return data


def book(store, cid='call-test'):
    lead = store.register(Inquiry(**inquiry(cid)))
    slot = store.availability('water_heater')['slots'][0]['id']
    return store.booking(BookingRequest(lead_id=lead['id'], slot_id=slot, confirmed_by_caller=True))


def test_auth_boundaries(setup):
    client, _, _ = setup
    assert client.get('/api/state').status_code == 401
    assert client.get('/api/state', headers=AGENT).status_code == 401
    assert client.post('/tools/get_quote', json={'job_type':'drain_clog'}, headers=OWNER).status_code == 401
    assert client.get('/api/state', headers=OWNER).status_code == 200
    assert client.post('/api/session/local').status_code == 403


def test_local_access_rejects_forwarded_requests(setup):
    _, store, config = setup
    with TestClient(create_app(config), base_url='http://localhost', client=('127.0.0.1',1234)) as client:
        assert client.post('/api/session/local', headers={'X-Forwarded-For':'1.2.3.4'}).status_code == 403
        assert client.post('/api/session/local', headers={'Origin':'https://evil.example'}).status_code == 403
        assert client.post('/api/session/local').status_code == 200
        assert client.get('/api/state').status_code == 200


def test_consent_language_and_extra_fields(setup):
    client, _, _ = setup
    assert client.post('/tools/log_lead', json=inquiry(consent_to_store=False), headers=AGENT).status_code == 422
    assert client.post('/tools/log_lead', json=inquiry(language='pa'), headers=AGENT).status_code == 422
    assert client.post('/tools/log_lead', json=inquiry(est_value_cad=999999), headers=AGENT).status_code == 422
    assert client.post('/tools/log_lead', json=inquiry(phone='invalid'), headers=AGENT).status_code == 422


def test_quote_is_bounded_and_renovation_unpriced(setup):
    client, _, _ = setup
    q=client.post('/tools/get_quote',json={'job_type':'water_heater'},headers=AGENT).json()
    assert (q['low'],q['high'])==(1000,1850)
    q=client.post('/tools/get_quote',json={'job_type':'renovation'},headers=AGENT).json()
    assert q['requires_assessment'] and 'low' not in q


def test_intake_retry_and_changed_payload(setup):
    client, store, _ = setup
    a=client.post('/tools/log_lead',json=inquiry(),headers=AGENT)
    b=client.post('/tools/log_lead',json=inquiry(),headers=AGENT)
    assert a.json()['id']==b.json()['id']
    assert len(store.state()['leads'])==1
    assert client.post('/tools/log_lead',json=inquiry(name='Different'),headers=AGENT).status_code==409


def test_atomic_slot_and_idempotent_booking(setup):
    _, store, _ = setup
    leads=[store.register(Inquiry(**inquiry(str(i)))) for i in range(2)]
    slot=store.availability('water_heater')['slots'][0]['id']
    def attempt(lead):
        try:
            return store.booking(BookingRequest(lead_id=lead['id'],slot_id=slot,confirmed_by_caller=True))
        except DomainError:
            return None
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        results=list(pool.map(attempt,leads))
    assert sum(r is not None for r in results)==1
    winner=next(r for r in results if r)
    assert store.booking(BookingRequest(lead_id=winner['lead_id'],slot_id=slot,confirmed_by_caller=True))==winner
    assert len(store.state()['bookings'])==1


def test_booking_confirmation_and_emergency_gate(setup):
    client, store, _=setup
    lead=store.register(Inquiry(**inquiry(urgency='emergency')))
    slot=store.availability('water_heater')['slots'][0]['id']
    assert client.post('/api/bookings',headers=OWNER,json={'lead_id':lead['id'],'slot_id':slot}).status_code==422
    assert client.post('/api/bookings',headers=OWNER,json={'lead_id':lead['id'],'slot_id':slot,'confirmed_by_caller':True}).status_code==422
    result=store.emergency(lead['id'],'Test emergency')
    assert result['dispatch_confirmed'] is False and 'dispatch_eta_minutes' not in result


def test_pipeline_does_not_double_count(setup):
    _, store, _=setup
    lead=store.register(Inquiry(**inquiry()))
    store.hot(lead['id'])
    assert store.state()['metrics']['estimated_open_pipeline']==1500
    book(store)
    metrics=store.state()['metrics']
    assert metrics['estimated_booked_value']==1500
    assert metrics['estimated_open_pipeline']==0
    assert 'revenue_recovered' not in metrics


def test_sms_preview_is_not_sent(setup):
    client,store,_=setup
    b=book(store)
    a=client.post('/api/sms',json={'booking_id':b['id']},headers=OWNER)
    assert a.json()['status']=='preview' and a.json()['sent'] is False
    client.post('/api/sms',json={'booking_id':b['id']},headers=OWNER)
    assert len(store.state()['messages'])==1


def test_sms_allowlist_and_consent(setup):
    client,store,config=setup
    b=book(store)
    config.live_sms=True
    assert client.post('/api/sms',json={'booking_id':b['id']},headers=OWNER).status_code==403
    with store.db() as db:
        db.execute('UPDATE leads SET sms_consent=0')
    assert client.post('/api/sms',json={'booking_id':b['id']},headers=OWNER).status_code==422


def test_demo_never_fabricates_calls_or_sends_sms(setup):
    client,store,config=setup
    config.live_sms=True
    for scenario in ['en','fr','zh','renovation','emergency']:
        result=client.post('/api/demo',json={'scenario':scenario},headers=OWNER)
        assert result.status_code==200, result.text
    state=store.state()
    assert len(state['bookings'])==3 and len(state['leads'])==5
    assert not state['calls']
    assert all(m['status']=='preview' for m in state['messages'])


def signed_payload(data, timestamp=None):
    payload=json.dumps({'type':'post_call_transcription','data':data})
    stamp=str(timestamp or int(time.time()))
    signature=hmac.new(b'webhook-test',f'{stamp}.{payload}'.encode(),hashlib.sha256).hexdigest()
    return payload,{'elevenlabs-signature':f't={stamp},v0={signature}'}


def test_signed_webhook_and_duplicate_handling(setup):
    client,store,_=setup
    store.register(Inquiry(**inquiry()))
    raw,headers=signed_payload({'conversation_id':'call-test','agent_id':'agent-test-id','status':'done','transcript':[]})
    assert client.post('/webhooks/elevenlabs',content=raw).status_code==401
    a=client.post('/webhooks/elevenlabs',content=raw,headers=headers)
    assert a.status_code==200,a.text
    assert client.post('/webhooks/elevenlabs',content=raw,headers=headers).json()['duplicate']
    assert len(store.state()['calls'])==1


def test_webhook_consent_unknown_agent_and_stale_signature(setup):
    client,store,_=setup
    raw,headers=signed_payload({'conversation_id':'unconsented','agent_id':'agent-test-id'})
    assert client.post('/webhooks/elevenlabs',content=raw,headers=headers).json()['ignored']
    raw,headers=signed_payload({'conversation_id':'x','agent_id':'other-agent'})
    assert client.post('/webhooks/elevenlabs',content=raw,headers=headers).status_code==403
    raw,headers=signed_payload({'conversation_id':'x','agent_id':'agent-test-id'},int(time.time())-3600)
    assert client.post('/webhooks/elevenlabs',content=raw,headers=headers).status_code==401
    assert not store.state()['calls']


def test_persistence_and_non_dispatched_callback(setup):
    _,store,config=setup
    lead=store.register(Inquiry(**inquiry()))
    assert store.callback(lead['id'])['outbound_call_placed'] is False
    store.callback(lead['id'])
    fresh=create_app(config).state.store.state()
    assert len(fresh['leads'])==1 and len(fresh['callbacks'])==1


def test_agent_source_cannot_be_spoofed(setup):
    client,_,_=setup
    result=client.post('/tools/log_lead',json=inquiry(source='simulation'),headers=AGENT)
    assert result.json()['source']=='elevenlabs'


def test_live_sms_reservation_prevents_duplicate_send(setup, monkeypatch):
    import app.providers as providers
    import httpx
    client,store,config=setup
    b=book(store)
    config.live_sms=True
    config.twilio_sid='ACtest'
    config.twilio_token='not-real'
    config.twilio_from='+12265550149'
    config.sms_allowlist=('+12265550147',)
    sent=[]
    class FakeClient:
        def __init__(self,**kwargs): pass
        async def __aenter__(self): return self
        async def __aexit__(self,*args): pass
        async def post(self,url,**kwargs):
            sent.append(kwargs['data'])
            return httpx.Response(201,json={'sid':'SM-fixture'})
    monkeypatch.setattr(providers.httpx,'AsyncClient',FakeClient)
    first=client.post('/api/sms',json={'booking_id':b['id']},headers=OWNER).json()
    assert first['status']=='provider_accepted' and not first['delivered']
    client.post('/api/sms',json={'booking_id':b['id']},headers=OWNER)
    assert len(sent)==1 and sent[0]['To']=='+12265550147'


def test_sms_ambiguous_timeout_not_retried(setup, monkeypatch):
    import app.providers as providers
    import httpx
    client,store,config=setup
    b=book(store)
    config.live_sms=True
    config.twilio_sid='ACtest'
    config.twilio_token='not-real'
    config.twilio_from='+12265550149'
    config.sms_allowlist=('+12265550147',)
    attempts=[]
    class FakeClient:
        def __init__(self,**kwargs): pass
        async def __aenter__(self): return self
        async def __aexit__(self,*args): pass
        async def post(self,*args,**kwargs):
            attempts.append(1)
            raise httpx.ReadTimeout('fixture timeout')
    monkeypatch.setattr(providers.httpx,'AsyncClient',FakeClient)
    first=client.post('/api/sms',json={'booking_id':b['id']},headers=OWNER).json()
    assert first['status']=='unknown_review_required'
    client.post('/api/sms',json={'booking_id':b['id']},headers=OWNER)
    assert len(attempts)==1

const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

function load(path='/demo') {
  const context = vm.createContext({window:{}, location:new URL('http://localhost'+path), URL, URLSearchParams,
    crypto, structuredClone, Intl, fetch:()=>{throw Error('Demo must not make network requests');}});
  vm.runInContext(readFileSync(join(__dirname,'../static/demo.js'),'utf8'),context);
  return context.window.FrontDeskDemo;
}

test('recording mode is explicit and leaves the owner app alone',()=>{
  assert.equal(load('/'),undefined);
  assert.ok(load('/demo'));
  assert.ok(load('/?demo=1'));
});

test('language scenarios complete booking and unsent SMS without network access',async()=>{
  const demo=load();
  for(const scenario of ['en','fr','zh'])await demo.request('/api/demo',{scenario});
  const state=await demo.request('/api/state');
  assert.equal(state.bookings.length,3);
  assert.equal(state.messages.length,3);
  assert.equal(state.calls.length,0);
  assert.ok(state.leads.every(l=>l.source==='simulation'));
  assert.ok(state.messages.every(m=>m.status==='preview'&&m.sent===false));
  assert.match(state.messages[0].body,/您的预约/);
  assert.match(state.messages[1].body,/Rendez-vous confirmé/);
  assert.equal(state.metrics.estimated_booked_value,2250);
});

test('booking and SMS preserve confirmation, consent, and retry rules',async()=>{
  const demo=load();
  const lead=await demo.request('/api/leads',{name:'Example',phone:'+12265550147',city:'Waterloo',address:'Fictional street',language:'en',job_type:'maintenance_tuneup',summary:'Demo',consent_to_store:true,sms_consent:false});
  const slots=(await demo.request('/api/slots?job_type=maintenance_tuneup')).slots;
  const request={lead_id:lead.id,slot_id:slots[0].id};
  await assert.rejects(demo.request('/api/bookings',request),/Confirm/);
  const booking=await demo.request('/api/bookings',{...request,confirmed_by_caller:true});
  assert.equal((await demo.request('/api/bookings',{...request,confirmed_by_caller:true})).id,booking.id);
  await assert.rejects(demo.request('/api/bookings',{...request,slot_id:slots[1].id,confirmed_by_caller:true}),/different appointment/);
  await assert.rejects(demo.request('/api/sms',{booking_id:booking.id}),/consent/);
});

test('human-review scenarios and reset work without consuming a real database',async()=>{
  const demo=load();
  await demo.request('/api/demo',{scenario:'renovation'});
  await demo.request('/api/demo',{scenario:'emergency'});
  const state=await demo.request('/api/state');
  assert.equal(state.metrics.human_review,2);
  assert.equal(state.bookings.length,0);
  demo.reset();
  assert.equal((await demo.request('/api/state')).metrics.inquiries,0);
});

const $ = (q) => document.querySelector(q);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n);
const date = (s, opts={}) => new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',month:'short',day:'numeric',hour:'numeric',minute:'2-digit',...opts}).format(new Date(s));
const recordingMode=location.pathname==='/demo'||new URLSearchParams(location.search).get('demo')==='1';
const languages = {en:'English',fr:'Français',zh:'Mandarin',pa:'Punjabi',es:'Español',ar:'Arabic',fil:'Filipino'};
let state, view='overview', selectedLead, toastTimer, polling=false, languageOptions='', campaignDraft=null, selectedJourneyId=null, uiEpoch=0, demoBusy=false;
function toast(message,error=false){$('#toast').textContent=message;$('#toast').classList.toggle('error',error);$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,5500)}
async function api(path,body,method){if(recordingMode){if(!window.FrontDeskDemo)throw Error('Recording adapter unavailable. Reload the demo; owner APIs remain disabled.');return window.FrontDeskDemo.request(path,body,method);}const r=await fetch(path,{signal:AbortSignal.timeout(8000),method:method||(body?'POST':'GET'),headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});let data;try{data=await r.json()}catch{throw Error('The server did not return a valid response.')}if(!r.ok){if(r.status===401){$('#login-panel').hidden=false;$('#workspace-content').hidden=true}throw Error(typeof data.detail==='string'?data.detail:'Please check the fields and try again.')}return data}
const empty=(title,text,icon='◌')=>`<div class="empty"><span class="empty-icon">${icon}</span><strong>${title}</strong><p>${text}</p></div>`;
const badge=(text,cls='')=>`<span class="badge ${esc(cls)}">${esc(text)}</span>`;
function showView(next){view=next;document.querySelectorAll('.view').forEach(v=>v.hidden=v.id!==`${next}-view`);document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.view===next));const names={overview:'Overview',inquiries:'Inquiries',appointments:'Appointments',campaigns:'Campaign Studio',receipts:'Call receipts',settings:'Agent & policies',journey:'Customer journey'};$('#breadcrumb').textContent=names[next];$('#page-title').innerHTML=next==='overview'?'Every conversation.<br><em>A clearer next step.</em>':esc(names[next]);$('#page-description').textContent=({overview:'From the first hello to a confirmed appointment. Across languages.',inquiries:'The original request. The right next action. Nothing lost in the handoff.',appointments:'Confirmed locally. Clear on scope, time, and what happens next.',campaigns:'Prepare multilingual campaign drafts and connect every message to a clear next step.',receipts:'Evidence of actual provider conversations—not simulated calls.',settings:'A bounded agent. Clear policies. An honest integration status.',journey:'One promotion. A customer served in their language. A clear English handoff.'})[next]}
const campaignNames={maintenance:'Seasonal plumbing checkup',leak:'Leak repair assessment','water-heater':'Water heater service'};
const campaignMessages={
  maintenance:{
    en:{social:'A plumbing checkup before the season changes can help spot small issues early. Grand River Plumbing & Heating serves {area}. Choose a time that works for you.',sms:'Planning a seasonal plumbing checkup? Grand River Plumbing & Heating serves {area}. See available times: frontdesk.demo/book',booking:'Request a seasonal plumbing checkup in {area}. Choose a convenient appointment window.'},
    fr:{social:'Une inspection saisonnière de la plomberie peut aider à repérer les petits problèmes plus tôt. Grand River Plumbing & Heating dessert {area}. Choisissez un moment qui vous convient.',sms:'Vous planifiez une inspection saisonnière? Grand River Plumbing & Heating dessert {area}. Consultez les disponibilités : frontdesk.demo/book',booking:'Demandez une inspection saisonnière de plomberie dans {area}. Choisissez une plage horaire qui vous convient.'},
    zh:{social:'换季前进行管道检查，有助于及早发现小问题。Grand River Plumbing & Heating 服务{area}。选择适合您的预约时间。',sms:'计划进行季节性管道检查吗？Grand River Plumbing & Heating 服务{area}。查看可预约时间：frontdesk.demo/book',booking:'预约{area}的季节性管道检查。选择适合您的时间段。'}
  },
  leak:{
    en:{social:'Concerned about a leak? Request an assessment from Grand River Plumbing & Heating in {area}. We’ll help you find a clear next step.',sms:'Need a leak assessment in {area}? Request an appointment with Grand River Plumbing & Heating: frontdesk.demo/book',booking:'Request a leak repair assessment in {area}. A team member can review the details and next steps.'},
    fr:{social:'Vous avez repéré une fuite? Demandez une évaluation à Grand River Plumbing & Heating dans {area}. Nous vous aiderons à déterminer la prochaine étape.',sms:'Besoin d’une évaluation de fuite dans {area}? Demandez un rendez-vous : frontdesk.demo/book',booking:'Demandez une évaluation de réparation de fuite dans {area}. Un membre de l’équipe examinera les détails et les prochaines étapes.'},
    zh:{social:'发现漏水了吗？可向 Grand River Plumbing & Heating 申请在{area}进行评估，了解下一步该怎么做。',sms:'需要在{area}进行漏水评估吗？预约 Grand River Plumbing & Heating：frontdesk.demo/book',booking:'申请{area}漏水维修评估。工作人员会了解情况并说明后续步骤。'}
  },
  'water-heater':{
    en:{social:'Need help with a water heater? Grand River Plumbing & Heating serves {area}. Request an appointment and tell us what’s going on.',sms:'Water heater service in {area}: request an appointment with Grand River Plumbing & Heating at frontdesk.demo/book',booking:'Request water heater service in {area}. Share a few details so the team can suggest a next step.'},
    fr:{social:'Besoin d’aide avec votre chauffe-eau? Grand River Plumbing & Heating dessert {area}. Demandez un rendez-vous et décrivez la situation.',sms:'Service de chauffe-eau dans {area} : demandez un rendez-vous à frontdesk.demo/book',booking:'Demandez un service pour votre chauffe-eau dans {area}. Ajoutez quelques détails pour aider l’équipe.'},
    zh:{social:'热水器需要帮助吗？Grand River Plumbing & Heating 服务{area}。预约时可以告诉我们具体情况。',sms:'{area}热水器服务：通过 frontdesk.demo/book 向 Grand River Plumbing & Heating 预约',booking:'申请{area}热水器服务。请提供一些情况说明，方便团队回复。'}
  }
};
function renderLegacyCampaign(){if(!campaignDraft)return;const {service,area,languages:langs,formats,selectedLanguage,selectedFormat,launched}=campaignDraft;$('#campaign-empty').hidden=true;$('#campaign-result').hidden=false;$('#campaign-title').textContent=campaignNames[service];$('#campaign-status').textContent=launched?'DEMO COMPLETE · NO SEND':'DRAFT · PREVIEW ONLY';$('#campaign-language-tabs').innerHTML=langs.map(l=>`<button type="button" class="campaign-tab ${l===selectedLanguage?'selected':''}" aria-pressed="${l===selectedLanguage}" data-campaign-language="${l}">${l==='zh'?'中文':l.toUpperCase()}</button>`).join('');const formatNames={social:'Social post',sms:'SMS draft',booking:'Booking link'};$('#campaign-format-tabs').innerHTML=formats.map(f=>`<button type="button" class="campaign-format-tab ${f===selectedFormat?'selected':''}" aria-pressed="${f===selectedFormat}" data-campaign-format="${f}">${formatNames[f]}</button>`).join('');const channelIcons={social:'◎',sms:'▣',booking:'↗'};$('#campaign-channel-icon').textContent=channelIcons[selectedFormat];$('#campaign-channel-label').textContent=formatNames[selectedFormat].toUpperCase();const body=campaignMessages[service][selectedLanguage][selectedFormat].replaceAll('{area}',()=>area);$('#campaign-copy').textContent=body;$('#campaign-launch').disabled=!$('#campaign-approved').checked||launched;$('#campaign-launch-result').hidden=!launched;$('#campaign-launch-details').textContent=`${langs.length} sample language version${langs.length===1?'':'s'} · ${formats.length} campaign format${formats.length===1?'':'s'} · 0 real texts or paid ads sent.`;}
function bookingRows(rows){
  if(!rows.length)return empty('No appointments yet.','Complete a consented inquiry and explicitly confirm a window.','▦');
  return rows.map(b=>`<div class="booking-row" data-booking-id="${esc(b.id)}" tabindex="-1"><div class="date-tile">${esc(new Intl.DateTimeFormat('en',{month:'short',timeZone:'America/Toronto'}).format(new Date(b.start)))}<b>${esc(new Intl.DateTimeFormat('en',{day:'numeric',timeZone:'America/Toronto'}).format(new Date(b.start)))}</b></div><div><strong>${esc(b.name)}</strong><small>${esc(b.job_type.replaceAll('_',' '))} · ${esc(b.technician)}</small><small>${esc(date(b.start))}–${esc(new Intl.DateTimeFormat('en',{hour:'numeric',minute:'2-digit',timeZone:'America/Toronto'}).format(new Date(b.end)))} · Toronto</small><span class="booking-origin">${esc(b.campaign_title || 'No campaign attribution')} · ${esc(languages[b.language] || b.language)}${b.campaign_id ? ' · '+esc(b.campaign_id.slice(-8)) : ''}</span>${b.journey_id ? `<button class="text-button journey-resume" data-resume-journey="${esc(b.journey_id)}">View journey & outcome →</button>` : ''}</div>${badge(b.source==='simulation'?'LOCAL DEMO':'CONFIRMED',b.source==='simulation'?'simulation':'')}</div>`).join('');
}

function render(){const m=state.metrics;$('#metrics').innerHTML=[['Inquiries captured',m.inquiries,'Includes labelled simulations','↗'],['Confirmed appointments',m.bookings,'Local demonstration calendar','▦'],['Illustrative booked value',money(m.estimated_booked_value),'Illustrative value · not realized revenue','$'],['Needs a human',m.human_review,'Flagged for review · not dispatched','◌']].map(([label,value,note,sym])=>`<article class="metric"><span class="metric-symbol">${sym}</span><div class="metric-label">${label}</div><div class="metric-value">${value}</div><small>${note}</small></article>`).join('');$('#nav-count').textContent=m.inquiries;
$('#activity').innerHTML=state.events.length?state.events.slice(0,12).map(e=>`<div class="event ${esc(e.type)}"><span class="event-icon">${({booking:'✓',inquiry:'↗',hot:'✦',emergency:'!',sms:'≡',callback:'↶',call:'◌'})[e.type]||'·'}</span><div class="event-text"><strong>${esc(e.title)}</strong><p>${esc(e.detail)}</p>${e.conversation_id?.startsWith('sim_')?badge('SIMULATED INPUT','simulation'):''}</div><time>${esc(new Intl.DateTimeFormat('en',{hour:'numeric',minute:'2-digit',timeZone:'America/Toronto'}).format(new Date(e.ts)))}</time></div>`).join(''):empty('Ready for the first hello.',window.FrontDeskDemo?'Try a scenario to see a demo booking and its activity trail.':'Try a scenario to see a real local booking and its audit trail.');
$('#bookings-preview').innerHTML=bookingRows(state.bookings.slice(0,3));$('#all-bookings').innerHTML=bookingRows(state.bookings);
$('#languages').innerHTML=state.config.languages.map(lang=>`<div class="language-row"><div><span>${esc(languages[lang]||lang)}</span><span>${m.language_mix[lang]||0} inquiries</span></div><progress value="${m.language_mix[lang]||0}" max="${Math.max(1,m.inquiries)}" aria-label="${esc(lang)} inquiry share"></progress></div>`).join('');
$('#lead-grid').innerHTML=state.leads.length?state.leads.map(l=>`<button class="lead-card" data-lead="${esc(l.id)}"><header>${badge(l.language.toUpperCase())}${badge(l.status.toUpperCase(),l.status==='emergency'?'emergency':'')}</header><h3>${esc(l.name)}</h3><p>${esc(l.summary)}</p>${l.source==='simulation'?badge('SIMULATED INPUT','simulation'):''}<footer><span>${esc(l.city)} · ${esc(l.job_type.replaceAll('_',' '))}</span><span>${l.est_value_cad?money(l.est_value_cad)+' est.':'Unpriced'}</span></footer></button>`).join(''):empty('No inquiries yet.','Start with a reviewed intake or a synthetic scenario.');
$('#messages').innerHTML=state.messages.length?state.messages.map(s=>`<div class="message">${badge(s.status,s.status==='preview'?'simulation':'')}<p>${esc(s.body)}</p><small class="muted">${esc(s.booking_id)}</small></div>`).join(''):empty('No confirmation messages.','Messages appear after a consented booking. Live SMS is disabled by default.','≡');
$('#calls').innerHTML=state.calls.length?state.calls.map(c=>`<article class="call-receipt"><strong>${esc(c.conversation_id)}</strong> ${badge(c.status)}<p>${esc(c.summary||'No provider summary supplied.')}</p><details><summary>Inspect transcript receipt</summary><pre>${esc(JSON.stringify(JSON.parse(c.transcript_json),null,2))}</pre></details></article>`).join(''):empty('No verified voice calls yet.','Simulation buttons never fabricate call receipts. Connect your agent and signed post-call webhook.');
const ready=[['ElevenLabs agent ID',state.config.voice_configured?'Configured · unverified':'Not configured'],['Authenticated agent tools',state.config.tools_configured?'Secret configured':'Not configured'],['Signed call receipts',state.config.webhook_configured?'Verifier configured':'Not configured'],['SMS delivery',state.config.sms_live?'Live · allowlist enforced':'Preview only'],['Scheduling','Local demo calendar'],['Payments & outbound calls','Not enabled']];$('#readiness').innerHTML=ready.map(([a,b])=>`<div class="readiness-row"><span>${a}</span><span>${b}</span></div>`).join('');$('#rate-card').innerHTML=state.catalog.map(q=>`<div class="rate-row"><span>${esc(q.label)}</span><span>${money(q.low)}–${money(q.high)}</span></div>`).join('');
$('#agent-status').textContent=state.config.voice_configured?'ID configured':'Not connected';$('#voice-note').textContent=state.config.voice_configured?'Provider setup must be tested before a live demonstration.':'Voice activation requires your ElevenLabs agent.';$('#open-voice').textContent=window.FrontDeskDemo?'Try an inquiry scenario →':state.config.voice_configured?'Open voice workspace →':'Explore voice setup →';if(window.FrontDeskDemo){$('#agent-status').textContent='Demo ready';$('#voice-note').textContent='Scripted inquiry scenarios; no microphone or account needed.'}$('#start-voice').hidden=!state.config.voice_configured||Boolean($('#widget-container').childElementCount);const choices=state.config.languages.map(l=>`<option value="${esc(l)}">${esc(languages[l]||l)}</option>`).join('');if(choices!==languageOptions){const selected=$('#intake-language').value;$('#intake-language').innerHTML=choices;if(state.config.languages.includes(selected))$('#intake-language').value=selected;languageOptions=choices;}}
async function refresh(){if(polling)return;polling=true;try{state=await api('/api/state');$('#startup-panel').hidden=true;$('#login-panel').hidden=true;$('#workspace-content').hidden=false;$('#connection').textContent=window.FrontDeskDemo?'Demo ready':'Connected';$('#connection').classList.remove('offline');render();renderConnectedViews()}catch(e){$('#connection').textContent='Offline / locked';$('#connection').classList.add('offline');$('#startup-panel').hidden=!$('#login-panel').hidden;$('#startup-message').textContent='The workspace could not connect. Open the interactive demo to continue without an owner account.'}finally{polling=false}}
async function details(id){selectedLead=id;const l=state.leads.find(x=>x.id===id);if(!l)return;if(window.FrontDeskDemo&&l.journey_id){openExistingJourney(l.journey_id);return;}$('#detail-content').innerHTML=`<h2>${esc(l.name)}</h2>${badge(l.language.toUpperCase())} ${badge(l.status)} ${l.source==='simulation'?badge('SIMULATED','simulation'):''}<p>${esc(l.summary)}</p><div class="detail-grid">${[['Phone',l.phone],['City',l.city],['Address',l.address||'Not supplied'],['Service',l.job_type.replaceAll('_',' ')],['Estimated value',l.est_value_cad?money(l.est_value_cad):'Unpriced; assessment needed'],['SMS consent',l.sms_consent?'Recorded':'Not obtained']].map(([k,v])=>`<div><small>${k}</small><strong>${esc(v)}</strong></div>`).join('')}</div><div class="action-row"><button class="button" id="flag-lead">Flag for owner</button><button class="button" id="callback-lead">Request human callback</button></div><div id="slot-actions"></div><p class="fine-print">Source: ${esc(l.source)} · ${esc(l.conversation_id)}. Owner summary is not independently translation-verified.</p>`;if(!$('#detail-dialog').open)$('#detail-dialog').showModal();$('#flag-lead').onclick=()=>action('/api/hot',{lead_id:id},'Owner follow-up flagged.');$('#callback-lead').onclick=()=>action('/api/callback',{lead_id:id},'Human follow-up requested. No call was placed.');if(l.status==='new'&&l.urgency!=='emergency'&&state.catalog.some(q=>q.job_type===l.job_type)){const slots=await api('/api/slots?job_type='+encodeURIComponent(l.job_type));if(selectedLead!==id)return;$('#slot-actions').innerHTML='<h3>Choose a proposed window</h3>'+slots.slots.map(s=>`<button class="slot-choice" data-slot="${esc(s.id)}">${esc(date(s.start))} · 2 hours · ${esc(s.technician)} →</button>`).join('');document.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>confirmBooking(l,slots.slots.find(s=>s.id===b.dataset.slot)))}else if(l.status==='booked'){const booking=state.bookings.find(b=>b.lead_id===id);$('#slot-actions').innerHTML=`<button class="button primary" id="send-confirmation">${state.config.sms_live?'Send allowlisted SMS':'Create SMS preview'}</button>`;$('#send-confirmation').onclick=async()=>{try{const r=await api('/api/sms',{booking_id:booking.id});toast('Confirmation status: '+r.status);let preview=$('#detail-sms-preview');if(!preview){preview=document.createElement('div');preview.id='detail-sms-preview';$('#slot-actions').append(preview)}preview.className='sms-preview-card';preview.innerHTML=`<span class="eyebrow">CUSTOMER SMS · ${esc(r.status)}</span><p>${esc(r.body)}</p><small>${r.sent===false||r.status==='preview'?'Preview only — no text sent.':'Provider status shown above; delivery is not confirmed.'}</small>`;await refresh()}catch(e){toast(e.message,true)}}}else{$('#slot-actions').innerHTML='<p>This request needs a person. No automated booking or dispatch is available.</p>'}}
function confirmBooking(lead,slot){$('#slot-actions').innerHTML=`<div class="confirmation-panel"><strong>Read back before confirming</strong><p>${esc(lead.name)} · ${esc(lead.address)}<br>${esc(date(slot.start))} · 2-hour window · ${esc(slot.technician)}<br>Local demo appointment. No real technician will attend.</p><label class="checkbox"><input type="checkbox" id="caller-confirmed"> Caller confirmed the details and window.</label><button class="button primary" id="confirm-booking">Confirm appointment</button></div>`;$('#confirm-booking').onclick=async()=>{if(!$('#caller-confirmed').checked)return toast('Obtain caller confirmation first.',true);await action('/api/bookings',{lead_id:lead.id,slot_id:slot.id,confirmed_by_caller:true},'Appointment saved to the local calendar.');await details(lead.id)}}
async function action(path,body,message){try{await api(path,body);toast(message);await refresh()}catch(e){toast(e.message,true)}}

function renderCampaign(){
  if(!campaignDraft){$('#campaign-empty').hidden=false;$('#campaign-result').hidden=true;$('#campaign-results').hidden=true;return;}
  renderLegacyCampaign();
  if(!window.FrontDeskDemo)return;
  const c=campaignDraft;
  const f=window.FrontDeskDemo.copy(c.selectedLanguage);
  $('#campaign-status').textContent=c.needs_save?'EDITED · SAVE & REVIEW':c.status.toUpperCase()+' · SAMPLE';
  $('#campaign-approved').checked=c.status==='approved'||c.status==='demo-active';
  $('#campaign-approved').disabled=c.needs_save;
  $('#campaign-launch').disabled=c.status!=='approved'||c.needs_save;
  $('#campaign-link-preview').disabled=c.status!=='demo-active'||c.needs_save;
  $('#campaign-launch-result').hidden=c.status!=='demo-active';
  $('#campaign-launch-details').textContent='Sample preview active. 0 real ads published or texts sent.';
  $('#campaign-preview-note').textContent=c.needs_save?'Offer edited. Save the previews and review again before opening a customer journey.':'Opening resumes this campaign’s existing language journey, retaining its original offer version. Use New campaign for a different offer. Confirmation SMS consent does not permit marketing texts.';
  const quote=state.catalog.find(q=>q.job_type===({maintenance:'maintenance_tuneup',leak:'leak_repair','water-heater':'water_heater'})[c.service]);
  $('#campaign-copy').lang=c.selectedLanguage==='zh'?'zh-Hans':c.selectedLanguage;
  $('#campaign-copy').textContent=campaignMessages[c.service][c.selectedLanguage][c.selectedFormat].replaceAll('{area}',()=>c.area)+'\n\n'+f.rate.replace('{low}',quote.low).replace('{high}',quote.high);
  $('#campaign-results').hidden=false;
  const counts=c.results||{journeys:0,inquiries:0,bookings:0,previews:0,booked_value:0};
  $('#campaign-result-counts').innerHTML=[['Demo journeys opened',counts.journeys],['Inquiries captured',counts.inquiries],['Appointments confirmed',counts.bookings],['SMS previews prepared',counts.previews]].map(([label,n])=>`<div><strong>${n}</strong><span>${label}</span></div>`).join('');
  $('#campaign-value').textContent='Illustrative booked value: '+money(counts.booked_value)+' CAD · confirmed demo bookings only, not revenue or ROI.';
  $('#campaign-attributed-bookings').innerHTML=bookingRows(state.bookings.filter(b=>b.campaign_id===c.id));
  $('#campaign-journeys').innerHTML=state.journeys.filter(j=>j.campaign_id===c.id).map(j=>`<button class="button" data-resume-journey="${esc(j.id)}">Resume ${esc(languages[j.language])} · ${j.progress==='complete'?'completed outcome':'in progress'}</button>`).join('');
}
function renderConnectedViews(){
  if(!window.FrontDeskDemo)return;
  if(campaignDraft){
    const fresh=state.campaigns.find(c=>c.id===campaignDraft.id);
    campaignDraft=fresh?{...fresh,selectedLanguage:fresh.languages.includes(campaignDraft.selectedLanguage)?campaignDraft.selectedLanguage:fresh.languages[0],selectedFormat:fresh.formats.includes(campaignDraft.selectedFormat)?campaignDraft.selectedFormat:fresh.formats[0]}:null;
  }
  $('#campaign-select').innerHTML='<option value="">Create a campaign</option>'+state.campaigns.map(c=>`<option value="${esc(c.id)}">${esc(c.title)} · ${esc(c.area)} · ${esc(c.id.slice(-6))}</option>`).join('');
  $('#campaign-select').value=campaignDraft?.id||'';
  $('#campaign-identity').textContent=campaignDraft?`ID …${campaignDraft.id.slice(-8)} · created ${date(campaignDraft.created_at)} · version ${campaignDraft.revision}`:'Campaigns and results exist only in this browser take.';
  $('#campaign-form button[type="submit"]').textContent=campaignDraft?'Save updated previews →':'Create campaign previews →';
  renderCampaign();
  if(selectedJourneyId)renderJourney();
}
function selectCampaign(id){
  const c=state.campaigns.find(c=>c.id===id);if(!c)return;
  campaignDraft={...c,selectedLanguage:c.languages[0],selectedFormat:c.formats[0]};
  $('#campaign-service').value=c.service;$('#campaign-area').value=c.area;
  document.querySelectorAll('[name="campaign-language"]').forEach(el=>el.checked=c.languages.includes(el.value));
  document.querySelectorAll('[name="campaign-format"]').forEach(el=>el.checked=c.formats.includes(el.value));
  renderConnectedViews();
}
function openExistingJourney(id){
  if(!window.FrontDeskDemo||!state.journeys.some(j=>j.id===id))return;
  selectedJourneyId=id;document.querySelectorAll('dialog[open]').forEach(d=>d.close());renderJourney();showView('journey');focusJourney();
}
async function demoAction(work){
  if(demoBusy)return;
  demoBusy=true;const epoch=uiEpoch;
  try{await work();}
  catch(error){
    if(epoch!==uiEpoch)return;
    await refresh();
    const j=state?.journeys.find(j=>j.id===selectedJourneyId);
    if(view==='journey'&&j){$('#journey-error').textContent=window.FrontDeskDemo.copy(j.language).unavailable;$('#journey-error').hidden=false;}
    toast(error.message,true);
  }finally{if(epoch===uiEpoch)demoBusy=false;}
}
function focusJourney(){
  const heading=$('#journey-heading');
  if(state?.journeys.find(j=>j.id===selectedJourneyId)?.progress==='complete')heading?.focus();
  else ($('#journey-controls input:not(:disabled), #journey-controls button:not(:disabled)')||heading)?.focus();
}
function renderJourney(){
  const j=state.journeys.find(j=>j.id===selectedJourneyId);if(!j)return;
  const f=window.FrontDeskDemo.copy(j.language), lang=j.language==='zh'?'zh-Hans':j.language;
  const slot=state.slots.find(s=>s.id===j.slot_id), booking=state.bookings.find(b=>b.lead_id===j.lead_id);
  const message=booking&&state.messages.find(m=>m.booking_id===booking.id);
  const complete=Boolean(booking), quote=state.catalog.find(q=>q.job_type===({maintenance:'maintenance_tuneup',leak:'leak_repair','water-heater':'water_heater'})[j.service]);
  const button=(action,label,extra='',primary=true)=>`<button class="button ${primary?'primary':''}" data-journey-action="${action}" data-progress="${j.progress}" ${extra}>${esc(label)}</button>`;
  const readback=s=>`<dl class="journey-readback">${[[f.name,'Lin'],[f.address,'123 Example Street, Waterloo'],[f.service,f.services[j.service]],[f.window,windowLabel(s,j.language)],[f.technician,s.technician]].map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><p class="fine-print">${esc(f.noVisit)}</p>`;
  let controls='';
  switch(j.progress){
    case 'service':controls=button('request',f.request);break;
    case 'consent':controls=button('consent',f.consentYes,'data-accepted="yes"')+button('consent',f.consentNo,'data-accepted="no"',false);break;
    case 'declined':controls=`<p>${esc(f.declined)}</p>`+button('reconsider',f.reconsider);break;
    case 'contact':controls=`<p>${esc(f.contact)}</p>`+button('contact',f.contactAction);break;
    case 'sms':controls=button('sms',f.smsYes,'data-accepted="yes"')+button('sms',f.smsNo,'data-accepted="no"',false);break;
    case 'slot':{
      const slots=state.slots.filter(s=>new Date(s.start)>new Date()&&!state.bookings.some(b=>b.slot_id===s.id)).slice(0,3);
      controls=slots.length?slots.map(s=>button('slot',windowLabel(s,j.language)+' · '+f.technician+': '+s.technician,`data-slot-id="${esc(s.id)}"`,false)).join(''):`<p>${esc(f.noSlots)}</p>`;break;
    }
    case 'confirm':controls=readback(slot)+`<label class="checkbox"><input id="journey-confirmed" type="checkbox">${esc(f.confirmLabel)}</label>`+button('confirm',f.confirm,'id="journey-confirm-button" disabled')+button('change',f.change,'',false);break;
  }
  let outcome='';
  if(complete){
    outcome=`<div class="outcome-mark" aria-hidden="true">✓</div>${readback(booking)}<div class="sms-preview-card"><h3>${esc(f.sms)}</h3>${message?`<span class="badge simulation">${esc(f.notSent)}</span><p>${esc(message.body)}</p>`:j.facts.sms_consent?`<p>${esc(f.smsFailed)}</p>${button('retry-sms',f.retry)}`:`<p>${esc(f.noSms)}</p>`}</div><h3>${esc(f.timeline)}</h3><ol class="journey-timeline">${[[f.opened,j.created_at],[f.inquiry,state.leads.find(l=>l.id===j.lead_id)?.created_at],[f.booked,booking.created_at],[message?f.preview:j.facts.sms_consent?f.smsFailed:f.noSms,message?.created_at]].map(([label,ts])=>`<li>${esc(label)}${ts?`<time>${esc(new Intl.DateTimeFormat(f.locale,{timeZone:'America/Toronto',hour:'numeric',minute:'2-digit',second:'2-digit'}).format(new Date(ts)))} · ${esc(f.timezone)}</time>`:''}</li>`).join('')}</ol><div class="journey-actions"><button class="button primary" data-journey-appointment="${esc(booking.id)}">${esc(f.appointments)}</button><button class="button" data-journey-results>${esc(f.results)}</button><button class="button" data-reset-journey>${esc(f.reset)}</button></div>`;
  }
  $('#customer-panel').lang=lang;
  $('#customer-panel').innerHTML=`<span class="journey-demo-label">${esc(f.demo)}</span><h2 id="journey-heading" tabindex="-1" class="${complete?'outcome-title':''}">${esc(complete?f.confirmed:f.title)}</h2><p class="fine-print">${esc(f.sample)}</p><div class="journey-offer"><small>${esc(f.campaign)} · …${esc(j.campaign_id.slice(-8))}</small><h3>${esc(f.services[j.service])}</h3><p>${esc(campaignMessages[j.service][j.language].booking.replaceAll('{area}',()=>j.area))}</p><p class="fine-print">${esc(f.rate.replace('{low}',quote.low).replace('{high}',quote.high))}</p></div>${complete?outcome:`<ol class="conversation" aria-live="polite">${j.conversation.slice(-3).map(t=>`<li class="${t.role}">${esc(t.original)}</li>`).join('')}</ol><div id="journey-controls" class="journey-controls">${controls}</div><div class="journey-actions"><button class="button" data-journey-results>${esc(f.back)}</button></div>`}<p id="journey-error" class="journey-error" role="alert" hidden></p>`;
  const next={service:'Await service request.',consent:'Obtain storage consent before collecting contact details.',declined:'No lead created. Storage consent declined.',contact:'Await fictional contact and service address.',sms:'Record the customer’s confirmation-SMS choice.',slot:'Await customer window selection.',confirm:'Read back the chosen details and obtain explicit confirmation.',complete:message?'Appointment confirmed; unsent SMS preview prepared.':j.facts.sms_consent?'Appointment confirmed; SMS preview needs retry.':'Appointment confirmed; SMS preview not requested.'};
  const areaNote=j.area!=='Waterloo Region'?'Area name is preserved verbatim, not translated. The customer fixture remains in Waterloo; service-area eligibility is not validated.':'Area names are preserved verbatim, not automatically translated.';
  $('#owner-handoff').innerHTML=`<span class="eyebrow">ENGLISH OWNER HANDOFF</span><h2>Same customer. Clear next step.</h2><p><strong>Original language:</strong> ${esc(languages[j.language])}${j.language==='zh'?' · Simplified Chinese text':''}<br><strong>Campaign:</strong> ${esc(j.campaign_title)} · ${esc(j.area)}<br><small>…${esc(j.campaign_id.slice(-8))} · offer version ${j.campaign_revision}</small></p><div class="owner-summary" aria-live="polite"><p>${esc(j.english_summary)}</p></div>${j.lead_id?`<div class="journey-actions"><button class="button" data-owner-action="hot" data-owner-lead="${esc(j.lead_id)}">Flag for owner</button><button class="button" data-owner-action="callback" data-owner-lead="${esc(j.lead_id)}">Request human callback</button></div><p class="fine-print">Human follow-up queue only. No outbound call or response-time promise.</p>`:''}<p class="next-action"><strong>Next action${state.leads.find(l=>l.id===j.lead_id)?.hot?' · flagged for owner':''}${state.callbacks.some(c=>c.lead_id===j.lead_id)?' · callback queued':''}</strong><br>${esc(next[complete?'complete':j.progress])}</p><p class="fine-print">Scripted demo. Paired sample translations, not independently verified live AI translation. ${esc(areaNote)}</p><details class="paired-transcript"><summary>Original text ↔ paired English fixture</summary>${j.conversation.map(t=>`<div class="paired-turn"><small>${t.role==='customer'?'CUSTOMER':'SCRIPTED FRONT DESK'} · ${esc(languages[j.language])}</small><p lang="${lang}">${esc(t.original)}</p><small>PAIRED ENGLISH FIXTURE</small><p>${esc(t.english)}</p></div>`).join('')}</details>`;
}
function windowLabel(slot,language){return window.FrontDeskDemo.windowText(slot,language);}
document.addEventListener('change',e=>{if(e.target.id==='journey-confirmed')$('#journey-confirm-button').disabled=!e.target.checked;});

document.addEventListener('click',async e=>{
  const close=e.target.closest('[data-close]');if(close)close.closest('dialog').close();
  const nav=e.target.closest('[data-view]');if(nav)showView(nav.dataset.view);
  const lead=e.target.closest('[data-lead]');if(lead)try{await details(lead.dataset.lead)}catch(err){toast(err.message,true)}
  const scenario=e.target.closest('[data-scenario]');
  if(scenario){const epoch=uiEpoch;scenario.disabled=true;try{await api('/api/demo',{scenario:scenario.dataset.scenario});if(epoch!==uiEpoch)return;$('#demo-dialog').close();showView(window.FrontDeskDemo?'appointments':'overview');await refresh();toast('Synthetic scenario completed. No call or SMS was placed.')}catch(err){if(epoch===uiEpoch)toast(err.message,true)}finally{scenario.disabled=false}}
  const lang=e.target.closest('[data-campaign-language]');if(lang&&campaignDraft){campaignDraft.selectedLanguage=lang.dataset.campaignLanguage;renderCampaign()}
  const format=e.target.closest('[data-campaign-format]');if(format&&campaignDraft){campaignDraft.selectedFormat=format.dataset.campaignFormat;renderCampaign()}
  if(e.target.closest('#campaign-launch')&&campaignDraft&&$('#campaign-approved').checked){
    if(window.FrontDeskDemo)await demoAction(async()=>{await api('/demo/campaign/activate',{id:campaignDraft.id});await refresh();toast('Sample campaign active. Nothing sent or published.');});
    else{campaignDraft.launched=true;renderCampaign();toast('Demo launch complete. No ad was published and no SMS was sent.')}
  }
  const owner=e.target.closest('[data-owner-action]');
  if(owner)await demoAction(async()=>{await api('/api/'+owner.dataset.ownerAction,{lead_id:owner.dataset.ownerLead});await refresh();toast('Human follow-up recorded. No call was placed.');});
  const resume=e.target.closest('[data-resume-journey]');if(resume)openExistingJourney(resume.dataset.resumeJourney);
  const step=e.target.closest('[data-journey-action]');
  if(step)await demoAction(async()=>{
    const j=state.journeys.find(j=>j.id===selectedJourneyId);if(!j)return;
    const body={journey_id:j.id,expected_progress:step.dataset.progress,action:step.dataset.journeyAction};
    if(step.dataset.accepted)body.accepted=step.dataset.accepted==='yes';
    if(step.dataset.slotId)body.slot_id=step.dataset.slotId;
    if(body.action==='confirm'){body.confirmed_by_caller=Boolean($('#journey-confirmed')?.checked);if(!body.confirmed_by_caller)return;}
    await api('/demo/journey/advance',body);await refresh();focusJourney();
  });
  const back=e.target.closest('[data-journey-results]');
  if(back){const j=state.journeys.find(j=>j.id===selectedJourneyId);if(j){selectCampaign(j.campaign_id);showView('campaigns');$('#campaign-results').focus();}}
  const appointment=e.target.closest('[data-journey-appointment]');
  if(appointment){showView('appointments');const row=$('#all-bookings [data-booking-id="'+appointment.dataset.journeyAppointment+'"]');row?.focus();}
  if(e.target.closest('[data-reset-journey]'))await resetRecording();
});
$('#campaign-form').onsubmit=async e=>{
  e.preventDefault();
  const langs=[...document.querySelectorAll('[name="campaign-language"]:checked')].map(x=>x.value);
  const formats=[...document.querySelectorAll('[name="campaign-format"]:checked')].map(x=>x.value);
  if(!langs.length||!formats.length)return toast('Choose at least one language and one campaign format.',true);
  const fields={service:$('#campaign-service').value,area:$('#campaign-area').value.trim(),languages:langs,formats};
  if(window.FrontDeskDemo)await demoAction(async()=>{
    const c=await api('/demo/campaign/save',{...fields,id:campaignDraft?.id});
    campaignDraft={...c,selectedLanguage:langs.includes(campaignDraft?.selectedLanguage)?campaignDraft.selectedLanguage:langs[0],selectedFormat:formats[0]};
    await refresh();$('#campaign-result').scrollIntoView({block:'start'});toast('Sample drafts saved. Review the languages, then approve.');
  });
  else{campaignDraft={...fields,selectedLanguage:langs[0],selectedFormat:formats[0],launched:false};$('#campaign-approved').checked=false;renderCampaign();}
};
$('#campaign-approved').onchange=async()=>{
  if(window.FrontDeskDemo&&campaignDraft)await demoAction(async()=>{await api('/demo/campaign/approve',{id:campaignDraft.id,approved:$('#campaign-approved').checked});await refresh();});
  else renderCampaign();
};
$('#campaign-form').addEventListener('input',async()=>{
  if(!campaignDraft)return;
  if(window.FrontDeskDemo){
    // Invalidation occurs synchronously in the adapter, before any awaiting UI work.
    const c=await api('/demo/campaign/invalidate',{id:campaignDraft.id});
    if(!campaignDraft||campaignDraft.id!==c.id)return;
    Object.assign(campaignDraft,c);renderCampaign();
  }else{campaignDraft.launched=false;$('#campaign-approved').checked=false;renderCampaign();}
});

$('#try-demo').onclick=()=>$('#demo-dialog').showModal();$('#new-inquiry').onclick=()=>$('#inquiry-dialog').showModal();$('#open-voice').onclick=()=>window.FrontDeskDemo?$('#demo-dialog').showModal():showView('settings');$('#logout').onclick=async()=>{await api('/api/session',null,'DELETE');$('#workspace-content').hidden=true;$('#login-panel').hidden=false};$('#login-form').onsubmit=async e=>{e.preventDefault();try{await api('/api/session',{token:$('#owner-token').value});$('#owner-token').value='';$('#login-error').textContent='';await refresh()}catch(err){$('#login-error').textContent=err.message}};
$('#inquiry-form').onsubmit=async e=>{e.preventDefault();const form=e.currentTarget,raw=Object.fromEntries(new FormData(form));const body={...raw,conversation_id:'manual_'+crypto.randomUUID(),consent_to_store:form.consent_to_store.checked,sms_consent:form.sms_consent.checked,source:'manual'};const button=form.querySelector('button[type="submit"]');button.disabled=true;try{const lead=await api('/api/leads',body);form.reset();$('#inquiry-dialog').close();await refresh();showView('inquiries');await details(lead.id);toast('Inquiry saved.')}catch(err){toast(err.message,true)}finally{button.disabled=false}};
$('#start-voice').onclick=()=>{if(recordingMode||!state.config.agent_id)return;const container=$('#widget-container');if(container.childElementCount)return;const note=document.createElement('p');note.className='fine-print';note.textContent='External voice demo active. Identify yourself as testing and use fictional data. Follow the configured recording-consent prompt.';container.append(note);const widget=document.createElement('elevenlabs-convai');widget.setAttribute('agent-id',state.config.agent_id);container.append(widget);const script=document.createElement('script');script.src='https://unpkg.com/@elevenlabs/convai-widget-embed';script.async=true;script.onerror=()=>toast('Voice widget could not load. Use the local intake path.',true);document.body.append(script);$('#start-voice').hidden=true;toast('ElevenLabs widget loading; microphone access is your choice.')};
$('#campaign-link-preview').onclick=async()=>{
  if(!window.FrontDeskDemo){location.assign('/demo#campaigns');return}
  if(!campaignDraft)return;
  await demoAction(async()=>{const j=await api('/demo/journey/open',{campaign_id:campaignDraft.id,language:campaignDraft.selectedLanguage});selectedJourneyId=j.id;await refresh();showView('journey');focusJourney();});
};
$('#new-campaign').onclick=()=>{campaignDraft=null;$('#campaign-form').reset();$('#campaign-approved').checked=false;renderConnectedViews();$('#campaign-service').focus();};
$('#campaign-select').onchange=e=>{if(e.target.value)selectCampaign(e.target.value);else $('#new-campaign').click();};
$('#reset-demo').onclick=resetRecording;
async function resetRecording(){
  if(!window.FrontDeskDemo)return;
  uiEpoch++;demoBusy=false;clearTimeout(toastTimer);$('#toast').hidden=true;
  window.FrontDeskDemo.reset();campaignDraft=null;selectedJourneyId=null;selectedLead=null;
  document.querySelectorAll('dialog[open]').forEach(d=>d.close());
  $('#campaign-form').reset();$('#inquiry-form').reset();$('#campaign-approved').checked=false;
  $('#detail-content').replaceChildren();$('#customer-panel').replaceChildren();$('#owner-handoff').replaceChildren();
  document.querySelectorAll('[data-scenario],#inquiry-form button[type="submit"]').forEach(b=>b.disabled=false);
  await refresh();showView('campaigns');$('#campaign-service').focus();
}
(async()=>{
  const demo=recordingMode;
  if(demo){
    document.body.classList.add('recording-mode');$('.brand').href='/demo#campaigns';
    $('#activity-source').textContent='Demo activity';
    $('#demo-controls strong').textContent='Scripted demo · temporary fictional data';
    $('#demo-controls span').textContent='No live AI, calls, ads or text delivery · reset or reload for a fresh take';
    $('#scenario-description').textContent='These scripted examples create fictional inquiries, bookings, and SMS previews in your browser. They do not place calls, send texts, or change the owner database.';
  }
  $('#demo-controls').hidden=!demo;$('#recording-demo-link').hidden=demo;$('#logout').hidden=demo;$('#campaign-library').hidden=!demo;
  if(!demo){try{await api('/api/session/local',{})}catch{}}
  await refresh();
  const initial=location.hash.slice(1);
  if(['overview','campaigns','inquiries','appointments','receipts','settings'].includes(initial))showView(initial);
  if(!demo)setInterval(refresh,3000);
})();

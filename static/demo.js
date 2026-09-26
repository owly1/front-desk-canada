// The /demo recording experience uses only synthetic browser data.
// No request handled here contacts the backend or a messaging provider.
(() => {
  if (location.pathname !== '/demo' && new URLSearchParams(location.search).get('demo') !== '1') return;
  const catalog = [
    ['water_heater', 'Water heater', 1000, 1850, 1500],
    ['drain_clog', 'Blocked drain', 165, 400, 300],
    ['leak_repair', 'Leak assessment', 200, 950, 450],
    ['toilet_faucet', 'Toilet / faucet', 200, 400, 300],
    ['maintenance_tuneup', 'Maintenance', 140, 350, 250],
  ].map(([job_type, label, low, high, estimate]) => ({job_type, label, low, high, estimate, currency:'CAD'}));
  let data;
  const id = prefix => prefix + '_' + crypto.randomUUID();
  const now = () => new Date().toISOString();
  const serviceKeys = {maintenance:'maintenance_tuneup', leak:'leak_repair', 'water-heater':'water_heater'};
  const serviceTitles = {maintenance:'Seasonal plumbing checkup', leak:'Leak repair assessment', 'water-heater':'Water heater service'};
  // Bounded paired fixtures, never a live translation claim. All contact details are fictional.
  const copy = {
    en: {
      locale:'en-CA', demo:'Scripted demo', sample:'Sample translations · fictional details · no live AI or phone call',
      title:'Your service, in your language', campaign:'Source campaign', service:'Service',
      services:{maintenance:'Seasonal plumbing checkup',leak:'Leak repair assessment','water-heater':'Water heater service'},
      needs:{maintenance:'I would like a seasonal plumbing checkup.',leak:'There is a small, contained drip under my sink. I would like a routine leak assessment.', 'water-heater':'I would like a routine water heater service appointment.'},
      welcome:'Welcome to Grand River Plumbing & Heating. What can we help with?', request:'Request this service',
      consentPrompt:'May we store fictional contact details for this demo inquiry?', consentYes:'Yes, store my details for this inquiry.', consentNo:'No, do not store my contact details.',
      declined:'No inquiry or booking was created. Return to the campaign or reconsider consent.', reconsider:'Review consent again',
      contactPrompt:'Please share the fictional contact and service address.', contactAction:'Use these fictional details',
      contact:'My name is Lin (example). My phone is +12265550147. The service address is 123 Example Street (fictional), Waterloo.',
      smsPrompt:'Would you like a preview of an appointment confirmation SMS? This is not marketing consent; no text will be sent.',
      smsYes:'Yes, prepare a confirmation SMS preview.', smsNo:'No SMS preview, thank you.',
      slotPrompt:'Choose an available two-hour demo window. All times are in Toronto time.',
      choose:'Choose this window', technician:'Fictional technician', timezone:'Toronto time', noSlots:'No available windows remain. Return to the campaign or reset the demo.',
      readback:'Review your appointment', name:'Name', address:'Service address', window:'Appointment window',
      confirmLabel:'I confirm these details and this appointment window.', confirm:'Confirm demo appointment', change:'Choose another window',
      confirmedReply:'I confirm the details and appointment window.', confirmed:'Your local-demo appointment is confirmed.',
      noVisit:'No real technician will attend. No payment is required.', sms:'Confirmation SMS preview', notSent:'Not sent',
      noSms:'SMS preview not requested', smsFailed:'Appointment saved. SMS preview is unavailable; retry without rebooking.', retry:'Retry SMS preview',
      rate:'Illustrative range: {low}–{high} CAD. Not a binding quote; taxes and extras excluded. Final scope and price need human review.',
      back:'Back to campaign', appointments:'View appointment', results:'Campaign results', reset:'Reset demo',
      timeline:'Demo journey timeline', opened:'Campaign preview opened', inquiry:'Inquiry captured', booked:'Appointment confirmed', preview:'SMS preview prepared',
      smsBody:'DEMO — Grand River Plumbing & Heating. {service}: {when}. Fictional technician: {technician}. No real visit. No payment required.',
      unavailable:'This action is unavailable. Return to the campaign and reopen the preview.'
    },
    fr: {
      locale:'fr-CA', demo:'Démo scénarisée', sample:'Traductions modèles · coordonnées fictives · sans IA ni appel en direct',
      title:'Votre service, dans votre langue', campaign:'Campagne d’origine', service:'Service',
      services:{maintenance:'Inspection saisonnière de plomberie',leak:'Évaluation de fuite','water-heater':'Service de chauffe-eau'},
      needs:{maintenance:'Je souhaite une inspection saisonnière de plomberie.',leak:'Il y a un petit égouttement contenu sous mon évier. Je souhaite une évaluation de routine.', 'water-heater':'Je souhaite un rendez-vous d’entretien courant pour mon chauffe-eau.'},
      welcome:'Bienvenue chez Grand River Plumbing & Heating. Comment pouvons-nous vous aider?', request:'Demander ce service',
      consentPrompt:'Pouvons-nous enregistrer des coordonnées fictives pour cette demande de démonstration?', consentYes:'Oui, enregistrez mes coordonnées pour cette demande.', consentNo:'Non, n’enregistrez pas mes coordonnées.',
      declined:'Aucune demande ni réservation créée. Retournez à la campagne ou revoyez votre consentement.', reconsider:'Revoir le consentement',
      contactPrompt:'Veuillez fournir les coordonnées et l’adresse de service fictives.', contactAction:'Utiliser ces coordonnées fictives',
      contact:'Je m’appelle Lin (exemple). Mon numéro est le +12265550147. L’adresse de service est le 123 Example Street (fictive), Waterloo.',
      smsPrompt:'Souhaitez-vous un aperçu du SMS de confirmation? Ce consentement ne concerne pas le marketing; aucun texto ne sera envoyé.',
      smsYes:'Oui, préparez un aperçu du SMS de confirmation.', smsNo:'Non merci, pas d’aperçu SMS.',
      slotPrompt:'Choisissez une plage de démonstration de deux heures. Les heures sont celles de Toronto.',
      choose:'Choisir cette plage', technician:'Technicien fictif', timezone:'Heure de Toronto', noSlots:'Aucune plage disponible. Retournez à la campagne ou réinitialisez la démo.',
      readback:'Vérifiez votre rendez-vous', name:'Nom', address:'Adresse de service', window:'Plage du rendez-vous',
      confirmLabel:'Je confirme ces renseignements et cette plage de rendez-vous.', confirm:'Confirmer le rendez-vous de démo', change:'Choisir une autre plage',
      confirmedReply:'Je confirme les renseignements et la plage du rendez-vous.', confirmed:'Votre rendez-vous de démonstration locale est confirmé.',
      noVisit:'Aucun technicien ne se déplacera réellement. Aucun paiement requis.', sms:'Aperçu du SMS de confirmation', notSent:'Non envoyé',
      noSms:'Aperçu SMS non demandé', smsFailed:'Rendez-vous enregistré. Aperçu SMS indisponible; réessayez sans refaire la réservation.', retry:'Réessayer l’aperçu SMS',
      rate:'Fourchette indicative : {low}–{high} CAD. Sans engagement; taxes et suppléments exclus. Une personne doit confirmer les travaux et le prix final.',
      back:'Retour à la campagne', appointments:'Voir le rendez-vous', results:'Résultats de la campagne', reset:'Réinitialiser la démo',
      timeline:'Parcours de démonstration', opened:'Aperçu de campagne ouvert', inquiry:'Demande enregistrée', booked:'Rendez-vous confirmé', preview:'Aperçu SMS préparé',
      smsBody:'DÉMO — Grand River Plumbing & Heating. {service} : {when}. Technicien fictif : {technician}. Aucune visite réelle. Aucun paiement requis.',
      unavailable:'Cette action est indisponible. Retournez à la campagne et rouvrez l’aperçu.'
    },
    zh: {
      locale:'zh-CN', demo:'脚本演示', sample:'示例译文 · 虚构资料 · 非实时 AI 或电话通话',
      title:'用您的语言，预约所需服务', campaign:'来源推广', service:'服务',
      services:{maintenance:'季节性管道检查',leak:'漏水评估','water-heater':'热水器服务'},
      needs:{maintenance:'我想预约一次季节性管道检查。',leak:'水槽下方有少量滴水，已用容器接住。我想预约常规漏水评估。','water-heater':'我想预约常规热水器服务。'},
      welcome:'欢迎联系 Grand River Plumbing & Heating。您需要什么帮助？', request:'预约此服务',
      consentPrompt:'您是否同意为此次演示咨询保存虚构的联系资料？', consentYes:'同意为此次咨询保存我的资料。', consentNo:'不同意保存我的联系资料。',
      declined:'尚未创建咨询或预约。您可以返回推广页面或重新考虑资料保存授权。', reconsider:'重新查看授权',
      contactPrompt:'请提供虚构的联系资料和服务地址。', contactAction:'使用以下虚构资料',
      contact:'我叫 Lin（示例），电话是 +12265550147。服务地址是 Waterloo 的 123 Example Street（虚构地址）。',
      smsPrompt:'您需要预约确认短信预览吗？此授权不用于营销；不会发送真实短信。',
      smsYes:'需要，请准备预约确认短信预览。', smsNo:'不需要短信预览，谢谢。',
      slotPrompt:'请选择一个可用的两小时演示时段。所有时间均为多伦多时间。',
      choose:'选择此时段', technician:'虚构技师', timezone:'多伦多时间', noSlots:'目前没有可用时段。请返回推广页面或重置演示。',
      readback:'请核对预约信息', name:'姓名', address:'服务地址', window:'预约时段',
      confirmLabel:'我确认以上信息和预约时段。', confirm:'确认演示预约', change:'选择其他时段',
      confirmedReply:'我确认以上信息和预约时段。', confirmed:'您的本地演示预约已确认。',
      noVisit:'不会安排技师实际上门。无需付款。', sms:'预约确认短信预览', notSent:'未发送',
      noSms:'未申请短信预览', smsFailed:'预约已保存。暂时无法生成短信预览；您可以重试，无需重新预约。', retry:'重试短信预览',
      rate:'示例价格范围：{low}–{high} 加元。不是正式报价，不含税费及额外费用。服务范围及最终价格需人工确认。',
      back:'返回推广页面', appointments:'查看预约', results:'推广结果', reset:'重置演示',
      timeline:'演示流程记录', opened:'已打开推广预览', inquiry:'已记录咨询', booked:'已确认预约', preview:'已准备短信预览',
      smsBody:'演示 — Grand River Plumbing & Heating。{service}：{when}。虚构技师：{technician}。不会安排实际上门。无需付款。',
      unavailable:'此演示操作暂不可用。请返回推广页面并重新打开预览。'
    }
  };
  const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
  function windowText(slot, language) {
    const f = copy[language];
    const start = new Intl.DateTimeFormat(f.locale, {timeZone:'America/Toronto', dateStyle:'medium', timeStyle:'short'}).format(new Date(slot.start));
    const end = new Intl.DateTimeFormat(f.locale, {timeZone:'America/Toronto', timeStyle:'short'}).format(new Date(slot.end));
    return `${start}–${end} (${f.timezone})`;
  }
  function torontoParts(date) {
    return Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone:'America/Toronto', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23'}).formatToParts(date).filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
  }
  function torontoHour(day, hour) {
    const wall = Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), hour);
    const p = torontoParts(new Date(wall));
    return new Date(wall - (Date.UTC(p.year, p.month-1, p.day, p.hour, p.minute) - wall));
  }
  function reset() {
    data = {campaigns:[], journeys:[], leads:[], bookings:[], events:[], messages:[], calls:[], callbacks:[], slots:[]};
    const today = torontoParts(new Date());
    const day = new Date(Date.UTC(today.year, today.month-1, today.day));
    for (let n = 0; n < 14; n++) {
      day.setUTCDate(day.getUTCDate() + 1);
      if (day.getUTCDay() === 0 || day.getUTCDay() === 6) continue;
      for (const hour of [10, 14]) {
        const start = torontoHour(day, hour);
        data.slots.push({id:id('slot'), start:start.toISOString(), end:new Date(+start+7200000).toISOString(), technician:hour===10?'Sofia':'Marc'});
      }
    }
  }
  function event(type, title, detail, conversation_id) {
    data.events.unshift({id:id('event'), ts:now(), type, title, detail, conversation_id});
  }
  function leadFor(lead_id) {
    const lead = data.leads.find(l => l.id === lead_id);
    if (!lead) throw Error('That demo inquiry was reset. Create a new inquiry.');
    return lead;
  }
  function register(body) {
    if (!body.consent_to_store) throw Error('Confirm storage consent for this fictional inquiry.');
    if (!['en','fr','zh'].includes(body.language)) throw Error('Choose a demo language.');
    if (!body.name?.trim() || !body.summary?.trim() || !/^\+[1-9]\d{7,14}$/.test(body.phone || '')) throw Error('Enter a name, summary, and valid phone number.');
    const old = data.leads.find(l => body.conversation_id && l.input_id === body.conversation_id);
    if (old) {
      if (['name','phone','language','job_type','summary','address','city','urgency','sms_consent'].some(k => old[k] !== body[k])) throw Error('Inquiry already exists with different details; human review required.');
      return old;
    }
    const quote = catalog.find(q => q.job_type === body.job_type);
    const lead = {...body, id:id('lead'), input_id:body.conversation_id, conversation_id:id('sim'), source:'simulation', created_at:now(), status:'new', hot:0, est_value_cad:quote?.estimate || 0};
    if (body.urgency === 'emergency' || body.job_type === 'emergency') {lead.status='emergency';lead.urgency='emergency';lead.hot=1;}
    else if (!quote) lead.hot=1;
    data.leads.unshift(lead);
    event('inquiry', 'Demo inquiry captured', `${lead.language.toUpperCase()} · ${lead.job_type} · ${lead.city}`, lead.conversation_id);
    return lead;
  }
  function slots(job) {
    return {slots:catalog.some(q => q.job_type === job) ? data.slots.filter(s => new Date(s.start)>new Date() && !data.bookings.some(b => b.slot_id === s.id)).slice(0,3) : [], timezone:'America/Toronto'};
  }
  function book(body) {
    const lead = leadFor(body.lead_id);
    if (!body.confirmed_by_caller) throw Error('Confirm the details before booking.');
    if (!lead.address || lead.urgency === 'emergency' || lead.status === 'emergency' || !catalog.some(q => q.job_type === lead.job_type)) throw Error('This inquiry needs a person to review it.');
    const old = data.bookings.find(b => b.lead_id === lead.id);
    if (old) {
      if (old.slot_id !== body.slot_id) throw Error('This inquiry already has a different appointment.');
      return old;
    }
    const slot = data.slots.find(s => s.id === body.slot_id);
    if (!slot || new Date(slot.start)<=new Date() || data.bookings.some(b => b.slot_id === slot.id)) throw Error('That slot is unavailable. Choose another time.');
    const booking = {...slot, ...body, id:id('book'), created_at:now(), status:'confirmed', est_value_cad:lead.est_value_cad,
      name:lead.name, phone:lead.phone, language:lead.language, city:lead.city, job_type:lead.job_type, source:'simulation',
      campaign_id:lead.campaign_id || null, journey_id:lead.journey_id || null, campaign_title:lead.campaign_title || null};
    data.bookings.unshift(booking); lead.status = 'booked';
    event('booking', 'Demo appointment confirmed', `${slot.technician} · ${slot.start}`, lead.conversation_id);
    return booking;
  }
  function sms(booking_id) {
    const booking = data.bookings.find(b => b.id === booking_id);
    if (!booking) throw Error('Book a demo appointment first.');
    const lead = leadFor(booking.lead_id);
    if (!lead.sms_consent) throw Error('SMS consent was not selected.');
    const old = data.messages.find(m => m.booking_id === booking_id);
    if (old) return old;
    const service = Object.keys(serviceKeys).find(k => serviceKeys[k] === lead.job_type);
    const extraServices = {en:{drain_clog:'Blocked drain',toilet_faucet:'Toilet / faucet'},fr:{drain_clog:'Drain bloqué',toilet_faucet:'Toilette / robinet'},zh:{drain_clog:'排水管堵塞',toilet_faucet:'马桶／水龙头'}};
    const body = fill(copy[lead.language].smsBody, {service:copy[lead.language].services[service] || extraServices[lead.language][lead.job_type], when:windowText(booking, lead.language), technician:booking.technician});
    const message = {id:id('message'), booking_id, language:lead.language, campaign_id:lead.campaign_id || null, journey_id:lead.journey_id || null, body, status:'preview', sent:false, created_at:now()};
    data.messages.unshift(message);
    event('sms', 'SMS preview ready', 'Prepared in the customer’s selected language; not sent.', lead.conversation_id);
    return message;
  }
  function campaignFor(campaign_id) {
    const c = data.campaigns.find(c => c.id === campaign_id);
    if (!c) throw Error('Campaign no longer exists. Create a sample campaign.');
    return c;
  }
  function saveCampaign(body) {
    if (!serviceKeys[body.service] || !body.area?.trim() || body.area.trim().length > 80) throw Error('Choose a supported service and an area of 1–80 characters.');
    if (!body.languages?.length || body.languages.some(l => !copy[l]) || !body.formats?.length || body.formats.some(f => !['social','sms','booking'].includes(f))) throw Error('Choose supported languages and formats.');
    let c = body.id ? campaignFor(body.id) : null;
    if (!c) { c = {id:id('campaign'), created_at:now(), revision:0}; data.campaigns.push(c); }
    Object.assign(c, {title:serviceTitles[body.service], service:body.service, area:body.area.trim(), languages:[...new Set(body.languages)], formats:[...new Set(body.formats)], status:'draft', approved_at:null, activated_at:null, needs_save:false, revision:c.revision+1});
    return c;
  }
  function summary(j) {
    const parts = [];
    if (j.facts.service) parts.push(copy.en.needs[j.service]);
    if (j.facts.name) parts.push(`${j.facts.name}; ${j.facts.phone}; ${j.facts.address}, ${j.facts.city}.`);
    if (j.facts.sms_consent !== undefined) parts.push(j.facts.sms_consent ? 'Confirmation SMS preview requested; no marketing consent.' : 'No SMS preview requested.');
    if (j.slot_id) {
      const slot = data.slots.find(s => s.id === j.slot_id);
      parts.push(`Selected: ${windowText(slot, 'en')}; fictional technician ${slot.technician}.`);
    }
    if (j.booking_id) parts.push('Local-demo appointment confirmed. No real service dispatched.');
    return parts.join(' ') || 'No service or contact details gathered yet.';
  }
  function pair(j, role, original, english) { j.conversation.push({id:id('turn'), role, original, english}); }
  function say(j, role, key) { pair(j, role, copy[j.language][key], copy.en[key]); }
  function openJourney(body) {
    const c = campaignFor(body.campaign_id);
    if (c.status !== 'demo-active' || c.needs_save) throw Error('Save, review and activate this sample campaign first.');
    if (!c.languages.includes(body.language)) throw Error('That language is not in this campaign.');
    const old = data.journeys.find(j => j.campaign_id === c.id && j.language === body.language);
    if (old) return old;
    const j = {id:id('journey'), campaign_id:c.id, campaign_title:c.title, campaign_revision:c.revision, area:c.area, service:c.service, language:body.language, progress:'service', created_at:now(), conversation:[], facts:{}, slot_id:null, lead_id:null, booking_id:null};
    say(j, 'agent', 'welcome'); data.journeys.push(j); return j;
  }
  function syncLead(j) {
    if (!j.lead_id) return;
    Object.assign(leadFor(j.lead_id), {summary:summary(j), english_summary:summary(j), customer_text:j.conversation.filter(t => t.role === 'customer').map(t => t.original).join('\n')});
  }
  function advance(body) {
    const j = data.journeys.find(j => j.id === body.journey_id);
    if (!j) throw Error('Journey was reset. Reopen a customer preview.');
    // Repeated actions from an old rendered step do not create additional turns or records.
    if (body.expected_progress !== j.progress) return j;
    const f = copy[j.language];
    switch (body.action) {
      case 'request':
        if (j.progress !== 'service') break;
        pair(j, 'customer', f.needs[j.service], copy.en.needs[j.service]); j.facts.service = serviceKeys[j.service];
        say(j, 'agent', 'consentPrompt'); j.progress = 'consent'; break;
      case 'consent':
        if (j.progress !== 'consent' || typeof body.accepted !== 'boolean') break;
        say(j, 'customer', body.accepted ? 'consentYes' : 'consentNo'); j.facts.consent_to_store = body.accepted;
        say(j, 'agent', body.accepted ? 'contactPrompt' : 'declined'); j.progress = body.accepted ? 'contact' : 'declined'; break;
      case 'reconsider':
        if (j.progress !== 'declined') break;
        say(j, 'agent', 'consentPrompt'); j.progress = 'consent'; break;
      case 'contact':
        if (j.progress !== 'contact' || !j.facts.consent_to_store) break;
        say(j, 'customer', 'contact');
        Object.assign(j.facts, {name:'Lin · example', phone:'+12265550147', city:'Waterloo', address:'123 Example Street · fictional'});
        say(j, 'agent', 'smsPrompt'); j.progress = 'sms'; break;
      case 'sms': {
        if (j.progress !== 'sms' || typeof body.accepted !== 'boolean') break;
        j.facts.sms_consent = body.accepted; say(j, 'customer', body.accepted ? 'smsYes' : 'smsNo');
        const lead = register({...j.facts, job_type:j.facts.service, urgency:'routine', language:j.language, summary:summary(j), english_summary:summary(j), customer_text:j.conversation.filter(t => t.role === 'customer').map(t => t.original).join('\n'), journey_id:j.id, campaign_id:j.campaign_id, campaign_title:j.campaign_title});
        j.lead_id = lead.id; say(j, 'agent', 'slotPrompt'); j.progress = 'slot'; break;
      }
      case 'slot': {
        if (j.progress !== 'slot') break;
        const slot = slots(j.facts.service).slots.find(s => s.id === body.slot_id);
        if (!slot) throw Error('That window is no longer available. Choose another window.');
        j.slot_id = slot.id;
        pair(j, 'customer', `${f.choose}: ${windowText(slot, j.language)} · ${slot.technician}`, `${copy.en.choose}: ${windowText(slot, 'en')} · ${slot.technician}`);
        pair(j, 'agent', `${f.readback}: Lin · 123 Example Street, Waterloo · ${f.services[j.service]} · ${windowText(slot,j.language)} · ${f.technician}: ${slot.technician}. ${f.noVisit}`, `${copy.en.readback}: Lin · 123 Example Street, Waterloo · ${copy.en.services[j.service]} · ${windowText(slot,'en')} · ${copy.en.technician}: ${slot.technician}. ${copy.en.noVisit}`);
        j.progress = 'confirm'; break;
      }
      case 'change':
        if (j.progress !== 'confirm') break;
        j.slot_id = null; j.progress = 'slot'; say(j, 'agent', 'slotPrompt'); break;
      case 'confirm': {
        if (j.progress !== 'confirm' || !body.confirmed_by_caller) break;
        let booking;
        try { booking = book({lead_id:j.lead_id, slot_id:j.slot_id, confirmed_by_caller:true}); }
        catch (error) { j.slot_id = null; j.progress = 'slot'; syncLead(j); throw error; }
        j.booking_id = booking.id; j.progress = 'complete';
        say(j, 'customer', 'confirmedReply'); say(j, 'agent', 'confirmed');
        // A message failure cannot undo the confirmed appointment.
        if (j.facts.sms_consent) { try { sms(booking.id); } catch { j.sms_error = true; } }
        break;
      }
      case 'retry-sms':
        if (j.progress === 'complete' && j.facts.sms_consent) { sms(j.booking_id); j.sms_error = false; }
        break;
    }
    syncLead(j); return j;
  }
  function campaignResults(c) {
    const bookings = data.bookings.filter(b => b.campaign_id === c.id && b.status === 'confirmed');
    return {
      journeys:data.journeys.filter(j => j.campaign_id === c.id).length,
      inquiries:data.leads.filter(l => l.campaign_id === c.id).length,
      bookings:bookings.length,
      previews:data.messages.filter(m => bookings.some(b => b.id === m.booking_id)).length,
      booked_value:bookings.reduce((sum,b) => sum+b.est_value_cad,0)
    };
  }
  function snapshot() {
    const language_mix = {};
    data.leads.forEach(l => language_mix[l.language] = (language_mix[l.language] || 0) + 1);
    return {...data, campaigns:data.campaigns.map(c => ({...c, results:campaignResults(c)})), journeys:data.journeys.map(j => ({...j, english_summary:summary(j)})), catalog, config:{demo:true, agent_id:'', voice_configured:false, sms_live:false, languages:['en','fr','zh'], tools_configured:false, webhook_configured:false},
      metrics:{inquiries:data.leads.length, bookings:data.bookings.length, estimated_booked_value:data.bookings.reduce((s,b)=>s+b.est_value_cad,0), estimated_open_pipeline:data.leads.filter(l=>l.status==='new').reduce((s,l)=>s+l.est_value_cad,0), human_review:data.leads.filter(l=>l.status==='emergency'||(l.status==='new'&&l.hot)).length, verified_call_receipts:0, language_mix}};
  }
  async function request(path, body={}) {
    const url = new URL(path, 'https://demo.invalid');
    let result;
    switch (url.pathname) {
      case '/demo/campaign/save': result=saveCampaign(body); break;
      case '/demo/campaign/invalidate': {
        const c=campaignFor(body.id); c.status='draft'; c.approved_at=null; c.activated_at=null; c.needs_save=true; result=c; break;
      }
      case '/demo/campaign/approve': {
        const c=campaignFor(body.id);
        if(c.needs_save) throw Error('Save edited previews before reviewing them.');
        c.status=body.approved?'approved':'draft'; c.approved_at=body.approved?now():null; c.activated_at=null; result=c; break;
      }
      case '/demo/campaign/activate': {
        const c=campaignFor(body.id);
        if(c.status==='demo-active'){result=c;break;}
        if(c.status!=='approved'||c.needs_save) throw Error('Review and approve the current draft first.');
        c.status='demo-active'; c.activated_at=now(); result=c; break;
      }
      case '/demo/journey/open': result=openJourney(body); break;
      case '/demo/journey/advance': result=advance(body); break;
      case '/api/session': case '/api/session/local': result={authenticated:true}; break;
      case '/api/state': result=snapshot(); break;
      case '/api/slots': result=slots(url.searchParams.get('job_type')); break;
      case '/api/leads': result=register({...body, campaign_id:null, journey_id:null, campaign_title:null}); break;
      case '/api/bookings': result=book(body); break;
      case '/api/sms': result=sms(body.booking_id); break;
      case '/api/hot': {
        const lead=leadFor(body.lead_id);
        if(!lead.hot){lead.hot=1;event('hot','Owner follow-up flagged',lead.summary,lead.conversation_id);} result={status:'flagged'}; break;
      }
      case '/api/emergency': {
        const lead=leadFor(body.lead_id);
        if(lead.status==='booked') throw Error('Existing booking needs human review; no emergency dispatch.');
        if(lead.status!=='emergency'){lead.status='emergency';lead.urgency='emergency';lead.hot=1;event('emergency','Human review needed','No emergency dispatch.',lead.conversation_id);}
        result={status:'flagged_only',dispatch_confirmed:false}; break;
      }
      case '/api/callback': {
        const lead=leadFor(body.lead_id);
        if(!data.callbacks.some(c=>c.lead_id===lead.id)){data.callbacks.push({lead_id:lead.id,status:'manual_follow_up',created_at:now()});event('callback','Human callback requested','Demo queue only; no call placed.',lead.conversation_id);} result={status:'manual_follow_up'}; break;
      }
      case '/api/demo': {
        const scenario=body.scenario, language=['en','fr','zh'].includes(scenario)?scenario:'en';
        const job={en:'water_heater',fr:'drain_clog',zh:'leak_repair',renovation:'renovation',emergency:'emergency'}[scenario];
        if (!job) throw Error('Choose a supported demo scenario.');
        const lead=register({name:{en:'Dan · example',fr:'Marie · example',zh:'Lin · example'}[language],phone:'+12265550147',city:'Waterloo',address:'123 Example Street · fictional',job_type:job,language,summary:`Synthetic ${language.toUpperCase()} inquiry for ${job.replaceAll('_',' ')}.`,urgency:scenario==='emergency'?'emergency':'routine',consent_to_store:true,sms_consent:true});
        let outcome;
        if (['renovation','emergency'].includes(scenario)) {
          lead.hot=1; if(scenario==='emergency') lead.status='emergency';
          event(scenario==='emergency'?'emergency':'hot','Human review requested','No automatic dispatch or outbound call.',lead.conversation_id); outcome={status:'flagged'};
        } else {
          const slot=slots(job).slots[0];
          if (!slot) throw Error('The demo calendar is full. Use Reset demo for a fresh recording.');
          outcome=book({lead_id:lead.id,slot_id:slot.id,confirmed_by_caller:true}); sms(outcome.id);
        }
        result={simulation:true,lead,result:outcome}; break;
      }
      default: throw Error('This action is not available in the recording demo.');
    }
    return structuredClone(result);
  }
  reset();
  window.FrontDeskDemo = {request, reset, copy:language=>structuredClone(copy[language]), windowText};
})();

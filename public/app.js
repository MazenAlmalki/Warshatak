
const $=id=>document.getElementById(id);
const translations={
ar:{
brandSub:'مساعد سيارتك الذكي',newAnalysis:'تحليل جديد',myCars:'سياراتي',history:'سجل المشاكل',localPrivacy:'سجل سيارتك محلي، والمرفقات تُرفع مؤقتًا عند الإرسال.',workspace:'مساحة سيارتك',aiAssistant:'مساعد ذكي',eyebrow:'افهم سيارتك بشكل أفضل',
heroTitle:'سيارتك تتكلم.<br><span>خلّنا نفهمها.</span>',heroDescription:'تكلم مع ورشتك عن مشكلة سيارتك، وخلّنا نفهمها سوا.',tryExample:'ابدأ بصوت تسمعه',exampleBrakes:'صرير الفرامل',exampleStart:'طقطقة التشغيل',exampleDrive:'ونة مع السرعة',featureOne:'سجل لكل سيارة',featureTwo:'صوت وفيديو',featureThree:'عربي وإنجليزي',
inputPlaceholder:'وش المشكلة اللي تواجهك في السيارة؟ اكتب وخلّنا نسولف...',attach:'إرفاق',record:'تسجيل',stop:'إيقاف',analyze:'إرسال',analyzing:'جاري تجهيز الرد...',disclaimer:'النتائج احتمالات وليست تشخيصًا. عند الإرسال يُرفع المرفق لسيرفرك لتحليله مؤقتًا؛ الصوت يحتاج CLAP.',
addVehicle:'إضافة سيارة',vehicleName:'اسم السيارة',carPlaceholder:'مثال: كامري 2022',cancel:'إلغاء',save:'حفظ',defaultCar:'سيارتي',noHistory:'ما فيه تحليلات سابقة',question:'السؤال',of:'من',introMessage:'خلّنا نحدد الصوت بأربع أسئلة.',resultIntro:'هذه احتمالات حسب وصفك.',possibleReasons:'الأسباب المحتملة',nextSteps:'وش تسوي؟',urgentSigns:'علامات مهمة',resultLabel:'تحليل Llama',resultNotice:'التحليل احتمالي، مو تشخيص فني.',newCheck:'تحليل جديد',low:'للمتابعة',medium:'يستحسن الفحص',high:'اهتمام عاجل',required:'اوصف الصوت بثمانية أحرف على الأقل.',mediaInfo:'الملف يُرسل عند الضغط على إرسال. إذا تعذّر تحديد الصوت، ورشتك بيسألك عن مكانه ووقته ووصفه.',fileTooLarge:'الحد الأقصى 25MB للمقطع.',fileType:'ارفع صورة أو ملف صوت أو فيديو.',mediaSaved:'مقطع محفوظ',mediaMissing:'المقطع غير متوفر على هذا الجهاز.',recordUnsupported:'المتصفح ما يدعم التسجيل.',recordError:'ما قدرنا نستخدم الميكروفون. تأكد من السماح له.',storageError:'تعذّر حفظ المقطع. جرّب ملف أصغر.',localOnly:'يتم الحفظ على هذا الجهاز فقط',remove:'إزالة',deleteCase:'حذف السجل',deleteCar:'حذف السيارة',deleteMedia:'حذف المقطع',confirmCase:'هل تحذف السجل والمقطع المرتبط به نهائيًا؟',confirmCar:'هل تحذف السيارة وكل سجلاتها ومقاطعها نهائيًا؟',confirmMedia:'هل تحذف المقطع نهائيًا؟',retry:'إعادة المحاولة',carNeeded:'أدخل اسم السيارة.',answerFailed:'تعذّر التحليل، حاول مرة ثانية.',startAgain:'ابدأ تحليلًا جديدًا',
questions:[['متى تسمعه؟',['عند التشغيل','أثناء القيادة','عند الفرامل','عند الالتفاف','على المطبات','عند التسارع','غير متأكد']],['وش نوع الصوت؟',['طقطقة','صرير','صفير','حكة / احتكاك','ونة','رجّة / اهتزاز','غير متأكد']],['من وين يجي؟',['أمام السيارة','خلف السيارة','من جهة الإطارات','من المحرك','غير متأكد']],['كم يتكرر؟',['كل مرة','أحيانًا','بدأ اليوم','غير متأكد']]],
examples:{brakes:'أسمع صرير عالي لما أضغط على الفرامل',starting:'فيه طقطقة أول ما أشغل السيارة الصباح',driving:'أسمع ونة تزيد كل ما زادت سرعة السيارة'}
},
en:{
brandSub:'Your car companion',newAnalysis:'New analysis',myCars:'My vehicles',history:'Problem history',localPrivacy:'Vehicle history stays local; attachments upload temporarily when sent.',workspace:'Your garage',aiAssistant:'AI assistant',eyebrow:'Understand your car better',
heroTitle:'Your car is talking.<br><span>Let’s figure it out.</span>',heroDescription:'Chat naturally about your car problem and explore what it could mean.',tryExample:'Try an example',exampleBrakes:'Brake squeal',exampleStart:'Startup clicking',exampleDrive:'Humming at speed',featureOne:'History for each car',featureTwo:'Audio & video',featureThree:'Arabic & English',
inputPlaceholder:'Tell me what is happening with your car...',attach:'Attach',record:'Record',stop:'Stop',analyze:'Send',analyzing:'Preparing a response...',disclaimer:'Results are not a diagnosis. On Send, media is temporarily uploaded to your server; audio needs CLAP.',
addVehicle:'Add a vehicle',vehicleName:'Vehicle name',carPlaceholder:'e.g. Camry 2022',cancel:'Cancel',save:'Save',defaultCar:'My car',noHistory:'No past analyses',question:'Question',of:'of',introMessage:'Four quick questions to narrow it down.',resultIntro:'Here are some possibilities based on your description.',possibleReasons:'Possible causes',nextSteps:'What to do next',urgentSigns:'Important warning signs',resultLabel:'Llama analysis',resultNotice:'Possibilities only. Not a mechanic’s diagnosis.',newCheck:'New analysis',low:'Monitor',medium:'Inspection advised',high:'Urgent attention',required:'Describe the noise using at least 8 characters.',mediaInfo:'Media is uploaded for analysis when you press Send. Audio requires optional CLAP setup.',fileTooLarge:'Maximum media file size is 25 MB.',fileType:'Choose an image, audio, or video file.',mediaSaved:'Saved media',mediaMissing:'Media unavailable on this device.',recordUnsupported:'Audio recording is not supported by this browser.',recordError:'Cannot access the microphone. Check permissions.',storageError:'Could not save media. Try a smaller file.',localOnly:'Stored on this device only',remove:'Remove',deleteCase:'Delete record',deleteCar:'Delete vehicle',deleteMedia:'Delete media',confirmCase:'Permanently delete this record and its media?',confirmCar:'Permanently delete this vehicle, its history and media?',confirmMedia:'Permanently delete this media?',retry:'Try again',carNeeded:'Enter a vehicle name.',answerFailed:'Analysis failed. Please try again.',startAgain:'Start a new analysis',
questions:[['When do you hear it?',['When starting','While driving','When braking','When turning','Over bumps','When accelerating','Not sure']],['What does it sound like?',['Clicking','Squealing','Whistling','Scraping','Humming','Vibration','Not sure']],['Where does it come from?',['Front of car','Rear of car','Near wheels','Engine bay','Not sure']],['How often?',['Every time','Sometimes','Started today','Not sure']]],
examples:{brakes:'I hear a high-pitched squeal when pressing the brakes.',starting:'There is a clicking noise when I start the car.',driving:'There is a humming noise that gets louder as I drive faster.'}
}
};
const optionKeys=['timing','sound','location','frequency'];
const STORAGE_KEY='carnoise-garage-v2';
const makeId=()=>globalThis.crypto?.randomUUID?.()||String(Date.now())+'-'+Math.random().toString(36).slice(2);
function loadState(){try{const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(data&&Array.isArray(data.cars)&&data.cars.length)return {cars:data.cars,cases:Array.isArray(data.cases)?data.cases:[],carId:data.carId||data.cars[0].id,lang:data.lang==='en'?'en':'ar',theme:data.theme==='light'?'light':'dark'};}catch{}const car={id:makeId(),nameAr:'سيارتي',nameEn:'My car'};return {cars:[car],cases:[],carId:car.id,lang:'ar',theme:'dark'};}
const state=loadState();
let session=null,questionIndex=0,submitting=false,pendingMedia=null,pendingUrl=null,recording=null,mediaStream=null,mediaChunks=[],recorder=null;
let mediaRenderVersion=0;
const t=k=>translations[state.lang][k],qList=()=>translations[state.lang].questions;
const textNode=(tag,text,cls)=>{const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;return e;};
function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{showError(t('storageError'));}}
function showError(message){$('errorBox').replaceChildren();$('errorBox').textContent=message||'';$('errorBox').classList.toggle('hidden',!message);}
function carName(car){return car.name||(state.lang==='ar'?car.nameAr:car.nameEn)||t('defaultCar');}
function selectedCar(){return state.cars.find(c=>c.id===state.carId)||state.cars[0];}
function dateLabel(iso){return new Date(iso).toLocaleDateString(state.lang==='ar'?'ar-SA':'en-US',{day:'numeric',month:'short'});}
function renderSidebar(){
 $('carList').replaceChildren();$('historyList').replaceChildren();
 $('currentCarName').textContent=carName(selectedCar());
 for(const car of state.cars){
  const button=document.createElement('button');button.className='car-row'+(state.carId===car.id?' active':'');button.type='button';
  button.append(textNode('span','◇','car-symbol'),textNode('span',carName(car),'car-name'),textNode('span',String(state.cases.filter(c=>c.carId===car.id).length),'car-count'));
  button.addEventListener('click',()=>{state.carId=car.id;persist();renderSidebar();newAnalysis();closeNav();});
  const row=textNode('div','','folder-item');row.append(button);
  const del=textNode('button','✕','delete-action');del.type='button';del.title=t('deleteCar');del.setAttribute('aria-label',t('deleteCar')+' '+carName(car));del.addEventListener('click',()=>deleteVehicle(car.id));row.append(del);
  $('carList').append(row);
 }
 const history=state.cases.filter(c=>c.carId===state.carId).slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
 $('historyCount').textContent=String(history.length);
 if(!history.length)$('historyList').append(textNode('div',t('noHistory'),'empty-side'));
 for(const entry of history){
  const button=document.createElement('button');button.type='button';button.className='history-row'+(session?.id===entry.id?' active':'');
  button.append(textNode('span',entry.description.slice(0,45),'history-name'),textNode('span',dateLabel(entry.createdAt),'history-date'));
  button.addEventListener('click',()=>{loadCase(entry);closeNav();});
  const row=textNode('div','','history-item');row.append(button);
  const del=textNode('button','✕','delete-action');del.type='button';del.title=t('deleteCase');del.setAttribute('aria-label',t('deleteCase')+' '+entry.description.slice(0,30));del.addEventListener('click',()=>deleteCase(entry.id));row.append(del);$('historyList').append(row);
 }
}
function applySettings(){
 const root=document.documentElement;root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';root.dataset.theme=state.theme;
 document.querySelectorAll('[data-i18n]').forEach(n=>n.textContent=t(n.dataset.i18n));
 document.querySelectorAll('[data-i18n-html]').forEach(n=>{const key=n.dataset.i18nHtml;if(key==='heroTitle')n.innerHTML=t(key);});
 document.querySelectorAll('[data-i18n-placeholder]').forEach(n=>n.placeholder=t(n.dataset.i18nPlaceholder));
 document.querySelector('[data-brand="warshatak"]').innerHTML=state.lang==='ar'?'ورشتك <em>✦</em>':'Warshatak <em>✦</em>';
 document.title=state.lang==='ar'?'ورشتك | مساعد سيارتك':'Warshatak | Your Car Companion';
 $('languageSwitch').textContent=state.lang==='ar'?'EN':'عربي';
 $('themeSwitch').textContent=state.theme==='dark'?'☀':'☾';
 $('recordButton').querySelector('span').textContent=recording?t('stop'):t('record');
 $('typingLabel').textContent=t('analyzing');
 renderSidebar();
 if(session)renderSession();
}
function addMessage(message,role){
 const wrap=textNode('div','','message '+role);
 const content=textNode('div',message);
 content.setAttribute('dir','auto');
 content.style.textAlign='start';
 wrap.append(textNode('div',role==='user'?(state.lang==='ar'?'أنت':'You'):'ورشتك | Warshatak','message-label'),content);
 $('messages').append(wrap);
}
function newAnalysis(){
 session=null;questionIndex=0;submitting=false;$('attachButton').disabled=false;$('recordButton').disabled=false;$('intro').classList.remove('hidden');$('conversation').classList.add('hidden');$('questionBox').classList.add('hidden');$('resultBox').classList.add('hidden');$('busy').classList.add('hidden');$('messages').replaceChildren();$('description').disabled=false;$('sendButton').disabled=false;$('description').value='';showError('');clearPendingMedia();renderSidebar();
}
function createCase(description){
 const entry={id:makeId(),carId:state.carId,createdAt:new Date().toISOString(),description,lang:state.lang,answers:[],messages:[],result:null,mediaId:null,mediaType:null,mediaName:null,mediaAttempted:false};
 state.cases.push(entry);session=entry;questionIndex=0;persist();renderSidebar();return entry;
}
async function startAnalysis(description){
 description=String(description||'').trim();
 if(description.length<2&&pendingMedia){
  description=state.lang==='ar'?'حلل المرفق واذكر ما تستطيع ملاحظته مع حدود التحليل.':'Analyze the attachment and explain only observations and limitations.';
 }
 if(description.length<2){showError(state.lang==='ar'?'اكتب وصف بسيط عن المشكلة أو أرفق ملف.':'Describe the issue or attach a media file.');$('description').focus();return;}
 if(session){await sendChat(description);return;}
 showError('');
 const entry=createCase(description.trim());
 if(pendingMedia){
  try{await saveBlob(entry.id,pendingMedia);entry.mediaId=entry.id;entry.mediaType=pendingMedia.type;entry.mediaName=pendingMedia.name;persist();}
  catch(e){showError(t('storageError'));}
 }
 clearPendingMedia();$('description').value='';
 await sendChat(description.trim());
}

async function sendChat(text,{audioInterviewAnswer=null}={}){
 if(submitting||!session)return;
 const message=String(text||'').trim();
 if(message.length<2){showError(state.lang==='ar'?'اكتب رسالة أطول شوي.':'Please write a longer message.');return;}
 const active=session;
 if(pendingMedia){
  try{
   const id=makeId();
   await saveBlob(id,pendingMedia);
   active.mediaId=id;active.mediaType=pendingMedia.type;active.mediaName=pendingMedia.name;
   active.mediaAttempted=false;active.mediaAnalysis=null;active.mediaAnalysisError=null;
   persist();clearPendingMedia();
  }catch(error){showError(t('storageError'));return;}
 }
 if(!Array.isArray(active.messages))active.messages=[];
 const allPrior=active.messages.map(({role,content})=>({role,content}));
 const prior=allPrior.length>10
  ? [allPrior.find(x=>x.role==='user'),...allPrior.slice(-10)].filter(Boolean)
  : allPrior;
 active.messages.push({role:'user',content:message});
 active.description=active.description||message;
 persist();
 $('description').value='';
 showError('');submitting=true;renderSession();$('busy').classList.remove('hidden');$('sendButton').disabled=true;
 const vehicleHistory=state.cases.filter(x=>x.carId===active.carId&&x.id!==active.id&&x.result).slice(-5)
  .map(x=>({date:x.createdAt.slice(0,10),description:x.description.slice(0,200),suspectedSummary:String(x.result.summary||'').slice(0,200)}));
 try{
  let mediaInsight=null;
  if(active.mediaId && !active.mediaAttempted){
   active.mediaAttempted=true;
   try{
    const mediaFile=await readBlob(active.mediaId);
    if(mediaFile){
     await validateMediaUpload(mediaFile);
     const payload=new FormData();
     payload.append('media',mediaFile,active.mediaName||'recording');
     payload.append('language',active.lang||state.lang);
     const analysisResponse=await fetch('/api/media/analyze',{method:'POST',body:payload});
     const parsed=await analysisResponse.json();
     if(!analysisResponse.ok||!parsed.analysis)throw Error(parsed.error||'Media model unavailable');
     mediaInsight=parsed.analysis;
     active.mediaAnalysis=mediaInsight;
     persist();
    }
   }catch(err){
    active.mediaAnalysisError=String(err.message||err).slice(0,240);
    persist();
    if(session?.id===active.id)showError((state.lang==='ar'?'تعذر تحليل المقطع، لكن بجاوب على وصفك النصي: ':'Could not analyze media; responding to text only: ')+active.mediaAnalysisError);
   }
  }
  const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({message,language:active.lang||state.lang,messages:prior,vehicleHistory,mediaInsight:mediaInsight||active.mediaAnalysis||null,mediaFailure:active.mediaAnalysisError||null,audioInterviewAnswer})});
  let data;try{data=await response.json();}catch{throw Error(t('answerFailed'));}
  if(!response.ok||typeof data.reply!=='string')throw Error(data.error||t('answerFailed'));
  if(data.audioStatus==='classifier-error'&&data.audioError){
   showError((state.lang==='ar'?'فشل مودل CLAP: ':'CLAP failed: ')+String(data.audioError).slice(0,170));
  }
  if(!state.cases.some(x=>x.id===active.id))return;
  active.messages.push({role:'assistant',content:data.reply.slice(0,1900),clarificationOptions:Array.isArray(data.clarificationOptions)?data.clarificationOptions.slice(0,10).filter(x=>typeof x.label==='string'&&typeof x.text==='string'):[],audioInterview:data.audioInterview&&typeof data.audioInterview==='object'?data.audioInterview:null,sources:['publisher-knowledge-card','language-model-with-retrieval'].includes(data.grounding)&&Array.isArray(data.knowledgeMatches)?data.knowledgeMatches.slice(0,2).filter(x=>typeof x.source_url==='string'&&x.source_url.startsWith('https://')).map(x=>({url:x.source_url,label:active.lang==='en'?x.symptom_en:x.symptom_ar})):[]});
  persist();
  if(session?.id===active.id)renderSession();
 }catch(error){
  if(state.cases.some(x=>x.id===active.id)){
   // Remove only the failed user turn so it can be retried without duplicated chat context.
   let index=-1;for(let i=active.messages.length-1;i>=0;i--){if(active.messages[i].role==='user'&&active.messages[i].content===message){index=i;break;}}
   if(index>=0)active.messages.splice(index,1);
   persist();
  }
  if(session?.id===active.id){
   $('description').value=message;
   renderSession();
   showError(error.message||t('answerFailed'));
  }
 }finally{
  submitting=false;$('busy').classList.add('hidden');
  $('sendButton').disabled=false;
  $('description').disabled=false;
  // renderSession() ran while submitting=true and disabled these controls.
  // Always restore them when the chat request completes, including errors.
  $('attachButton').disabled=false;
  $('recordButton').disabled=false;
  // Choices rendered during the request were initially disabled. Refresh once
  // the response completes so only the latest choices become interactive.
  if(session?.id===active.id && active.messages.at(-1)?.clarificationOptions?.length)renderSession();
 }
}

function renderAudioClarifications(message,isLatest){
 if(!Array.isArray(message.clarificationOptions)||!message.clarificationOptions.length)return;
 const wrap=textNode('div','','audio-clarification-choices');
 const title=textNode('div',state.lang==='ar'?'اختر الأقرب لوصفك، مو تشخيص:':'Choose the closest description (not a diagnosis):','audio-clarification-title');
 wrap.append(title);
 for(const choice of message.clarificationOptions.slice(0,10)){
  if(typeof choice.label!=='string'||typeof choice.text!=='string'||choice.text.length>250)continue;
  const button=textNode('button',choice.label,'audio-clarification-choice');
  button.type='button';button.disabled=!isLatest||submitting;
  button.addEventListener('click',()=>{
   if(!session||submitting)return;
   const interview=message.audioInterview;
   if(interview&&typeof choice.stage==='string'&&typeof choice.value==='string'){
    // The user explicitly chooses the answer; never claim the model heard it.
    void sendChat(choice.text,{audioInterviewAnswer:{
     stage:choice.stage,value:choice.value,answers:interview.answers||{}
    }});
   }else{
    $('description').value=choice.text;
    $('composer').requestSubmit();
   }
  });
  wrap.append(button);
 }
 $('messages').append(wrap);
}
function renderSession(){
 ++mediaRenderVersion;
 if(!session)return;
 if(Array.isArray(session.messages)){
  $('intro').classList.add('hidden');$('conversation').classList.remove('hidden');
  $('messages').replaceChildren();$('resultBox').replaceChildren();
  $('questionBox').classList.add('hidden');$('resultBox').classList.add('hidden');
  for(const [index,msg] of session.messages.entries()){
   addMessage(msg.content,msg.role);
   if(msg.role==='assistant'&&Array.isArray(msg.clarificationOptions)){
    renderAudioClarifications(msg,index===session.messages.length-1);
   }
   if(msg.role==='assistant'&&Array.isArray(msg.sources)&&msg.sources.length){
    const cited=textNode('div',state.lang==='ar'?'مصادر إرشادية: ':'Reference sources: ','message-sources');
    for(const s of msg.sources){
     if(typeof s.url!=='string'||!s.url.startsWith('https://'))continue;
     const link=textNode('a',String(s.label||'Reference').slice(0,65),'message-source-link');
     link.href=s.url;link.target='_blank';link.rel='noopener noreferrer';cited.append(link);
    }
    $('messages').append(cited);
   }
  }
  if(session.mediaId)showSavedMedia(session.mediaId,session.mediaType,session.mediaName);
  if(session.mediaAnalysisError)$('messages').append(textNode('div',(state.lang==='ar'?'تنبيه: المقطع محفوظ، لكن لم يتم تحليله: ':'Notice: saved media was not analyzed: ')+session.mediaAnalysisError,'media-warning'));
  if(session.mediaAnalysis)$('messages').append(textNode('div',state.lang==='ar'?'تم فحص عناصر مرئية أو خصائص أولية للإشارة الصوتية، وهذا ليس تشخيصًا للعطل.':'Basic image or audio-signal features were processed; this is not a fault diagnosis.','media-warning'));
  $('description').disabled=false;$('sendButton').disabled=Boolean(submitting);
  $('attachButton').disabled=Boolean(submitting);$('recordButton').disabled=Boolean(submitting);
  $('messages').lastElementChild?.scrollIntoView?.({block:'nearest'});
  return;
 }
 $('attachButton').disabled=false;$('recordButton').disabled=false;
 $('intro').classList.add('hidden');$('conversation').classList.remove('hidden');$('messages').replaceChildren();$('resultBox').replaceChildren();
 addMessage(session.description,'user');
 if(session.mediaName)addMessage((state.lang==='ar'?'ملف مرفق: ':'Attached: ')+session.mediaName,'user');
 addMessage(t('introMessage'),'assistant');
 for(let i=0;i<session.answers.length;i++){
  const answer=session.answers[i],idx=translations.ar.questions[i][1].indexOf(answer);
  addMessage(qList()[i][1][idx]||answer,'user');
 }
 $('description').disabled=true;$('sendButton').disabled=true;
 questionIndex=session.answers.length;
 if(session.result){$('questionBox').classList.add('hidden');renderResult(session.result);if(session.mediaId)showSavedMedia(session.mediaId,session.mediaType,session.mediaName);return;}
 if(questionIndex>=4){$('questionBox').classList.add('hidden');if(!submitting)analyze();return;}
 showQuestion();
 if(session.mediaId)showSavedMedia(session.mediaId,session.mediaType,session.mediaName);
}
function showQuestion(){
 const list=qList(),current=list[questionIndex];
 $('questionBox').classList.add('hidden');void $('questionBox').offsetWidth;$('questionBox').classList.remove('hidden');
 $('questionCount').textContent=t('question')+' '+(questionIndex+1)+' '+t('of')+' 4';
 $('questionProgress').style.width=(questionIndex+1)*25+'%';$('questionText').textContent=current[0];$('choices').replaceChildren();
 current[1].forEach((choice,i)=>{
  const button=textNode('button',choice,'choice');button.type='button';
  button.addEventListener('click',()=>{if(!session||submitting)return;session.answers.push(translations.ar.questions[questionIndex][1][i]);persist();renderSession();});
  $('choices').append(button);
 });
}
function renderResult(r){
 $('resultBox').replaceChildren();$('resultBox').classList.remove('hidden');
 const head=textNode('div','','results-head'),severity=textNode('span',t(r.severity),'severity '+r.severity);
 head.append(textNode('span',t('resultLabel')),severity);$('resultBox').append(head,textNode('h2',r.title),textNode('p',r.summary),textNode('h3',t('possibleReasons')));
 for(const reason of r.reasons||[]){const box=textNode('div','','reason');box.append(textNode('strong',reason.title),textNode('p',reason.explanation));$('resultBox').append(box);}
 $('resultBox').append(textNode('h3',t('nextSteps')));const ul=document.createElement('ul');
 for(const x of r.nextSteps||[])ul.append(textNode('li',x));$('resultBox').append(ul);
 if(r.urgentSigns?.length){$('resultBox').append(textNode('h3',t('urgentSigns')));const list=document.createElement('ul');for(const x of r.urgentSigns)list.append(textNode('li',x));$('resultBox').append(list);}
 $('resultBox').append(textNode('p',t('resultNotice'),'disclaimer'));
 const again=textNode('button',t('newCheck'),'again');again.type='button';again.addEventListener('click',newAnalysis);$('resultBox').append(again);
}
async function analyze(){
 if(!session||submitting)return;
 const activeCase=session;
 submitting=true;showError('');$('busy').classList.remove('hidden');
 const previous=state.cases.filter(c=>c.carId===session.carId&&c.id!==session.id&&c.result).slice(-5).map(c=>({date:c.createdAt.slice(0,10),description:c.description.slice(0,250),suspectedSummary:String(c.result.summary||'').slice(0,250)}));
 const body={description:session.description,language:session.lang||'ar',history:previous};
 for(let i=0;i<4;i++)body[optionKeys[i]]=session.answers[i];
 try{
  const response=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  let data;try{data=await response.json();}catch{throw Error(t('answerFailed'));}
  if(!response.ok)throw Error(data.error||t('answerFailed'));
  if(!data.result||!Array.isArray(data.result.reasons))throw Error(t('answerFailed'));
  if(!state.cases.some(c=>c.id===activeCase.id))return;
  activeCase.result=data.result;persist();
  if(session?.id===activeCase.id){$('questionBox').classList.add('hidden');renderResult(data.result);}
 }catch(e){showError(e.message||t('answerFailed'));const retry=textNode('button',t('retry'),'retry');retry.type='button';retry.addEventListener('click',analyze);$('errorBox').append(document.createElement('br'),retry);}
 finally{submitting=false;$('busy').classList.add('hidden');}
}
function loadCase(entry){clearPendingMedia();session=entry;renderSidebar();showError('');renderSession();}
async function deleteMediaBlob(id){
 const db=await openDb();
 try{await new Promise((resolve,reject)=>{const tx=db.transaction('files','readwrite');tx.objectStore('files').delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
 finally{db.close();}
}
async function deleteCase(id){
 const entry=state.cases.find(c=>c.id===id);
 if(!entry||!window.confirm(t('confirmCase')))return;
 if(entry.mediaId){try{await deleteMediaBlob(entry.mediaId);}catch{showError(t('storageError'));return;}}
 state.cases=state.cases.filter(c=>c.id!==id);
 persist();
 if(session?.id===id)newAnalysis();else renderSidebar();
}
async function deleteVehicle(id){
 const car=state.cars.find(c=>c.id===id);
 if(!car||!window.confirm(t('confirmCar')))return;
 const cases=state.cases.filter(c=>c.carId===id);
 try{for(const entry of cases)if(entry.mediaId)await deleteMediaBlob(entry.mediaId);}
 catch{showError(t('storageError'));return;}
 state.cases=state.cases.filter(c=>c.carId!==id);
 state.cars=state.cars.filter(c=>c.id!==id);
 if(!state.cars.length)state.cars.push({id:makeId(),nameAr:'سيارتي',nameEn:'My car'});
 state.carId=state.cars[0].id;
 persist();newAnalysis();closeNav();
}
async function deleteSavedMedia(id){
 const entry=state.cases.find(c=>c.id===id);
 if(!entry?.mediaId||!window.confirm(t('confirmMedia')))return;
 try{await deleteMediaBlob(entry.mediaId);}catch{showError(t('storageError'));return;}
 entry.mediaId=null;entry.mediaName=null;entry.mediaType=null;
 persist();if(session?.id===entry.id)renderSession();else renderSidebar();
}
function openNav(){$('sidebar').classList.add('open');$('overlay').classList.remove('hidden');}
function closeNav(){$('sidebar').classList.remove('open');$('overlay').classList.add('hidden');}
function openCarDialog(){$('carDialog').showModal();$('carName').focus();}
async function openDb(){
 return new Promise((resolve,reject)=>{
  if(!indexedDB)return reject(new Error('IndexedDB unavailable'));
  const request=indexedDB.open('carnoise-media',1);
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('files'))request.result.createObjectStore('files');};
  request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
 });
}
async function saveBlob(id,file){
 const db=await openDb();
 try{await new Promise((resolve,reject)=>{const tx=db.transaction('files','readwrite');tx.objectStore('files').put(file,id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
 finally{db.close();}
}
async function readBlob(id){
 const db=await openDb();
 try{return await new Promise((resolve,reject)=>{const tx=db.transaction('files','readonly');const req=tx.objectStore('files').get(id);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
 finally{db.close();}
}
function clearPendingMedia(){
 pendingMedia=null;if(pendingUrl){URL.revokeObjectURL(pendingUrl);pendingUrl=null;}
 $('mediaInput').value='';$('mediaPreview').replaceChildren();$('mediaPreview').classList.add('hidden');
}
function showMedia(file,pending=true){
 const area=$('mediaPreview');area.replaceChildren();area.classList.remove('hidden');
 const url=URL.createObjectURL(file);
 if(pending){if(pendingUrl)URL.revokeObjectURL(pendingUrl);pendingUrl=url;}
 const node=document.createElement(file.type.startsWith('image/')?'img':file.type.startsWith('video/')?'video':'audio');
 node.controls=true;node.preload='metadata';node.src=url;node.onended=()=>{};
 area.append(textNode('span',file.name||t('mediaSaved'),'media-name'),node);
 if(pending){const remove=textNode('button','✕','remove-media');remove.type='button';remove.title=t('remove');remove.addEventListener('click',clearPendingMedia);area.append(remove);}
 else node.addEventListener('loadedmetadata',()=>{}, {once:true});
 area.append(textNode('div',t('mediaInfo'),'media-warning'));
 if(!pending)node.addEventListener('emptied',()=>URL.revokeObjectURL(url),{once:true});
}
async function showSavedMedia(id,type,name){
 const requestVersion=mediaRenderVersion;
 const caseId=session?.id;
 try{
  const f=await readBlob(id);
  // Media loads asynchronously: never append a stale clip from an earlier
  // render, especially when submitting a new chat message.
  if(requestVersion!==mediaRenderVersion||session?.id!==caseId||session?.mediaId!==id||!f)return;
  const box=$('resultBox');
  const target=box.classList.contains('hidden')?$('messages'):box;
  // Only one active preview per thread, even after multiple renders.
  target.querySelectorAll('[data-saved-media-preview]').forEach(node=>node.remove());
  const attached=textNode('div','','reason');
  attached.dataset.savedMediaPreview=id;
  attached.append(textNode('strong',name||t('mediaSaved')));
  const url=URL.createObjectURL(f);
  const media=document.createElement(type?.startsWith('image/')?'img':type?.startsWith('video/')?'video':'audio');
  media.controls=true;media.preload='metadata';media.src=url;
  media.style.maxWidth='100%';media.style.maxHeight='220px';
  attached.append(media);
  if(session?.mediaAnalysis){
   attached.append(textNode('p',state.lang==='ar'?'تم استلام الملف. وصف الصوت يعتمد على نجاح مودل التعرف، وليس مجرد تسجيله.':'File received. Sound identification depends on successful model inference.','media-warning'));
  }
  const remove=textNode('button',t('deleteMedia'),'media-delete-btn');
  remove.type='button';remove.addEventListener('click',()=>deleteSavedMedia(id));attached.append(remove);
  target.append(attached);
  // Release the blob URL after the preview leaves the document.
  const observer=new MutationObserver(()=>{
   if(!attached.isConnected){URL.revokeObjectURL(url);observer.disconnect();}
  });
  observer.observe(target,{childList:true});
 }catch{showError(t('mediaMissing'));}
}
async function mediaCapabilities(){
 const response=await fetch('/api/media-status');
 if(!response.ok)throw Error(state.lang==='ar'?'تعذر التحقق من دعم المرفقات. حاول لاحقًا.':'Cannot verify upload support. Please try again later.');
 const status=await response.json();
 if(!status.uploads)throw Error(state.lang==='ar'?'خدمة المرفقات غير متاحة.':'Upload service unavailable.');
 return status.uploads;
}
async function validateMediaUpload(file){
 const capabilities=await mediaCapabilities();
 const type=file.type.split(';')[0];
 const category=type.split('/')[0];
 if(!capabilities[category==='image'?'images':category] ||
    (!capabilities.audio && !['image/jpeg','image/png','image/webp'].includes(type)))
  throw Error(state.lang==='ar'?'معالجة الصوت والفيديو غير متاحة على هذا الخادم. أرفق صورة JPEG أو PNG أو WebP أو اكتب وصف الصوت.':'Audio/video processing is unavailable on this server. Attach a JPEG, PNG or WebP image, or describe the sound in text.');
 if(file.size>capabilities.maxBytes)throw Error(state.lang==='ar'
  ?'الحد الأقصى للمرفق '+(capabilities.maxBytes/1024/1024)+' ميبيبايت على هذا الخادم.'
  :'Maximum attachment size on this server: '+(capabilities.maxBytes/1024/1024)+' MiB.');
}
async function mediaFile(file){
 if(!file)return;
 if(!['audio/','video/','image/'].some(prefix=>file.type.startsWith(prefix))){showError(t('fileType'));return;}
 if(file.size>25*1024*1024){showError(t('fileTooLarge'));return;}
 try{await validateMediaUpload(file);}catch(error){showError(error.message);return;}
 pendingMedia=file;showError('');showMedia(file);
}
async function recordToggle(){
 if(recorder?.state==='recording'){recorder.stop();return;}
 if(submitting)return;
 if(!navigator.mediaDevices?.getUserMedia||!globalThis.MediaRecorder){showError(t('recordUnsupported'));return;}
 try{
  const capabilities=await mediaCapabilities();
  if(!capabilities.audio){showError(state.lang==='ar'?'تحليل التسجيلات الصوتية غير متاح على هذا الخادم؛ اكتب وصف الصوت.':'Audio recording analysis is unavailable on this server; describe the sound in text.');return;}
  mediaStream=await navigator.mediaDevices.getUserMedia({audio:true});
  recorder=new MediaRecorder(mediaStream);mediaChunks=[];
  recorder.ondataavailable=e=>{if(e.data?.size)mediaChunks.push(e.data);};
  recorder.onstop=()=>{
   const blob=new Blob(mediaChunks,{type:recorder.mimeType||'audio/webm'});const type=blob.type.split(';')[0];
   if(blob.size>0)mediaFile(new File([blob],'recording-'+Date.now()+'.webm',{type}));
   mediaStream?.getTracks().forEach(track=>track.stop());mediaStream=null;recording=false;
   $('recordButton').classList.remove('recording');$('recordButton').querySelector('span').textContent=t('record');
  };
  recorder.start();recording=true;$('recordButton').classList.add('recording');$('recordButton').querySelector('span').textContent=t('stop');
 }catch{showError(t('recordError'));mediaStream?.getTracks().forEach(track=>track.stop());}
}
$('addCar').addEventListener('click',openCarDialog);
$('carForm').addEventListener('submit',e=>{
 e.preventDefault();const name=$('carName').value.trim();if(!name)return;
 const car={id:makeId(),name};state.cars.push(car);state.carId=car.id;persist();$('carDialog').close();$('carForm').reset();newAnalysis();closeNav();
});
for(const id of ['cancelCar','cancelCarBottom'])$(id).addEventListener('click',()=>$('carDialog').close());
$('languageSwitch').addEventListener('click',()=>{state.lang=state.lang==='ar'?'en':'ar';if(session&&Array.isArray(session.messages))session.lang=state.lang;persist();applySettings();});
$('themeSwitch').addEventListener('click',()=>{state.theme=state.theme==='dark'?'light':'dark';persist();applySettings();});
$('newCaseSide').addEventListener('click',()=>{newAnalysis();closeNav();});
$('menuButton').addEventListener('click',openNav);
$('closeSidebar').addEventListener('click',closeNav);
$('overlay').addEventListener('click',closeNav);
$('composer').addEventListener('submit',e=>{e.preventDefault();if(!submitting)startAnalysis($('description').value);});
$('description').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('composer').requestSubmit();}});
$('attachButton').addEventListener('click',()=>$('mediaInput').click());
$('mediaInput').addEventListener('change',e=>mediaFile(e.target.files?.[0]));
$('recordButton').addEventListener('click',recordToggle);
document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>{if(!session&&!submitting)startAnalysis(t('examples')[button.dataset.example]);}));
applySettings();

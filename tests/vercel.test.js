import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../server/index.js';

// Exercise HTTP middleware and provider boundaries without a real API key.
test('Vercel API preserves chat, analysis, safety and bounded image uploads', async t => {
 process.env.VERCEL='1';
 process.env.CHAT_API_KEY='test-private-key';
 process.env.CHAT_API_URL='https://openrouter.ai/api/v1/chat/completions';
 process.env.CHAT_MODEL='meta-llama/llama-3.3-70b-instruct';
 process.env.VISION_MODEL='meta-llama/llama-4-scout';
 process.env.ENABLE_AUDIO_CLAP='1';
 process.env.ENABLE_SPEECH_TRANSCRIPTION='1';
 const app=createApp();
 assert.equal(app.get('trust proxy'),1);
 const server=app.listen(0,'127.0.0.1');
 await once(server,'listening');
 t.after(()=>new Promise(resolve=>server.close(resolve)));
 const base='http://127.0.0.1:'+server.address().port;
 const nativeFetch=globalThis.fetch;
 const calls=[];
 globalThis.fetch=async(url,options)=>{
  if(String(url).startsWith(base))return nativeFetch(url,options);
  assert.equal(url,process.env.CHAT_API_URL);
  assert.equal(options.headers.Authorization,'Bearer test-private-key');
  const body=JSON.parse(options.body);calls.push(body);
  const content=body.response_format?JSON.stringify({title:'Possible causes',summary:'Needs inspection',severity:'high',reasons:[{title:'Brakes',explanation:'Inspection needed'}],nextSteps:['Stop safely'],urgentSigns:[]}):body.model===process.env.VISION_MODEL?'A vehicle is visible.':'Please arrange an inspection.';
  return Response.json({choices:[{message:{content}}]});
 };
 t.after(()=>{globalThis.fetch=nativeFetch;});
 const get=async path=>{const response=await fetch(base+path);return [response,await response.json()];};
 for(const path of ['/api/health','/api/model-status']){
  const [response,body]=await get(path);assert.equal(response.status,200);
  assert.ok(!JSON.stringify(body).includes('test-private-key'));
 }
 const [,status]=await get('/api/media-status');
 assert.deepEqual(status.uploads,{maxBytes:4*1024*1024,images:true,audio:false,video:false});
 assert.equal(status.ffmpegReady,false);assert.equal(status.audioClapEnabled,false);assert.equal(status.speechTranscriptionEnabled,false);
 const post=(path,body)=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 let response=await post('/api/chat',{message:'I have no brakes',language:'en'});
 let body=await response.json();assert.equal(response.status,200);assert.match(body.reply,/stop|professional/i);
 assert.ok(calls[0].messages.some(x=>x.content.includes('Safety warning')));
 response=await post('/api/analyze',{description:'Brake squealing sound',language:'en',timing:'عند الفرامل',sound:'صرير',location:'أمام السيارة',frequency:'كل مرة'});
 assert.equal(response.status,200);assert.equal((await response.json()).result.severity,'high');
 const upload=async(type,size)=>{const form=new FormData();form.append('media',new Blob([new Uint8Array(size)],{type}),'media');form.append('language','en');return fetch(base+'/api/media/analyze',{method:'POST',body:form});};
 response=await upload('image/png',100);assert.equal(response.status,200);assert.equal((await response.json()).analysis.type,'image');
 assert.equal(calls.at(-1).model,process.env.VISION_MODEL);
 response=await upload('audio/webm',100);assert.equal(response.status,422);assert.match((await response.json()).error,/unavailable on Vercel/);
 response=await upload('application/pdf',100);assert.equal(response.status,415);
 response=await upload('image/png',4*1024*1024+1);assert.equal(response.status,413);assert.match((await response.json()).error,/4 MiB/);
 response=await post('/api/chat',{message:'x'.repeat(17000)});assert.equal(response.status,413);
 response=await fetch(base+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'});assert.equal(response.status,400);
 assert.equal((await fetch(base+'/api/missing')).status,404);
 for(const path of ['/','/garage/history']){
  const response=await fetch(base+path,{redirect:'manual'});
  assert.equal(response.status,307);assert.equal(response.headers.get('location'),'/index.html');
 }
 assert.equal((await fetch(base+'/styles.css')).status,404); // Served by Vercel CDN, not Express.
 delete process.env.CHAT_API_KEY;
 response=await post('/api/chat',{message:'Hello there'});assert.equal(response.status,503);
});

test('rate limit remains 30 API requests per 15 minutes',async t=>{
 const app=createApp();const server=app.listen(0,'127.0.0.1');await once(server,'listening');
 t.after(()=>new Promise(resolve=>server.close(resolve)));
 const url='http://127.0.0.1:'+server.address().port+'/api/health';
 for(let i=0;i<30;i++)assert.equal((await fetch(url)).status,200);
 const response=await fetch(url);assert.equal(response.status,429);assert.ok(response.headers.get('ratelimit'));
});

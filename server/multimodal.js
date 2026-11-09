import 'dotenv/config';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { analyzeWaveform } from './audioWaveform.js';
import { describeVehicleImages } from './llamaVision.js';

const maxStdout=20_000;
async function runProcess(cmd,args,{timeout=40000,limit=maxStdout}={}){
 return await new Promise((resolve,reject)=>{
  const child=spawn(cmd,args,{windowsHide:true,stdio:['ignore','pipe','pipe']});
  let stdout='',stderr='';
  const timer=setTimeout(()=>child.kill('SIGKILL'),timeout);
  child.stdout.on('data',x=>{stdout+=x.toString('utf8');if(stdout.length>limit)child.kill('SIGKILL');});
  child.stderr.on('data',x=>{stderr=(stderr+x.toString('utf8')).slice(-2400);});
  child.on('error',e=>{clearTimeout(timer);reject(e);});
  child.on('close',code=>{clearTimeout(timer);code===0?resolve(stdout):reject(new Error((stderr||'Processing failed').slice(-900)));});
 });
}
function fileExtension(type){
 const supported={
  'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp',
  'audio/wav':'.wav','audio/x-wav':'.wav','audio/mpeg':'.mp3','audio/mp4':'.m4a','audio/x-m4a':'.m4a','audio/aac':'.aac','audio/ogg':'.ogg','audio/webm':'.webm',
  'video/mp4':'.mp4','video/webm':'.webm','video/quicktime':'.mov'
 };
 return supported[type]||null;
}
async function videoFrames(input,temp){
 const ffmpeg=process.env.FFMPEG_PATH?.trim()||'ffmpeg';
 const results=[];
 for(const [index,seconds] of [0,1].entries()){
  const output=path.join(temp,'frame-'+index+'.jpg');
  // Sample 0 and 2 seconds; clips shorter than 2s can still use frame 0.
  try{
   await runProcess(ffmpeg,['-hide_banner','-loglevel','error','-ss',String(seconds*2),'-i',input,'-frames:v','1','-vf','scale=640:-2','-y',output],{timeout:30000});
   results.push((await readFile(output)).toString('base64'));
  }catch(error){if(!results.length)throw error;}
 }
 return results;
}
async function speechTranscription(input,language){
 if(process.env.ENABLE_SPEECH_TRANSCRIPTION!=='1')return null;
 const python=process.env.AUDIO_PYTHON?.trim()||(process.platform==='win32'?'python':'python3');
 const script=path.resolve('scripts','transcribe_audio.py');
 const output=await runProcess(python,[script,input,language],{timeout:180000,limit:12000});
 const parsed=JSON.parse(output.trim());
 if(typeof parsed.text!=='string'||typeof parsed.hasRecognizedSpeech!=='boolean')throw Error('Invalid transcription response');
 return parsed;
}
async function audioSimilarity(input){
 const python=process.env.AUDIO_PYTHON?.trim()||(process.platform==='win32'?'python':'python3');
 const script=path.resolve('scripts','analyze_car_audio.py');
 const output=await runProcess(python,[script,input],{timeout:180000,limit:15000});
 const result=JSON.parse(output.trim());
 if(!Array.isArray(result.matches))throw new Error('Audio model response malformed.');
 return result;
}
export async function analyzeUploadedMedia(file,language='ar'){
 if(process.env.VERCEL==='1'&&!file.mimetype.startsWith('image/'))throw Error('Audio/video processing is unavailable on Vercel. Describe the sound in text.');
 const extension=fileExtension(file.mimetype);
 if(!extension)throw new Error(language==='en'?'Unsupported media type.':'نوع الملف غير مدعوم.');
 if(!file.buffer?.length||file.size>25*1024*1024)throw new Error(language==='en'?'File must be below 25 MB.':'الملف يجب أن يكون أقل من 25 ميجابايت.');
 const temp=await mkdtemp(path.join(os.tmpdir(),'warshatak-'));
 const source=path.join(temp,'upload'+extension);
 try{
  await writeFile(source,file.buffer);
  if(file.mimetype.startsWith('image/')){
   const observed=await describeVehicleImages([{mimeType:file.mimetype,base64:file.buffer.toString('base64')}],language);
   return {type:'image',visual:observed,summary:observed.description,limitations:'Image is a visual observation, NOT a mechanical diagnosis.'};
  }
  if(file.mimetype.startsWith('video/')){
   const warnings=[];
   let visual=null,audio=null;
   try{visual=await describeVehicleImages((await videoFrames(source,temp)).map(base64=>({mimeType:'image/jpeg',base64})),language);}
   catch(e){warnings.push('Video frames could not be analyzed: '+String(e.message).slice(0,180));}
   let transcription=null;
   if(process.env.ENABLE_SPEECH_TRANSCRIPTION==='1'){
    try{transcription=await speechTranscription(source,language);}catch(e){warnings.push('Speech transcription unavailable: '+String(e.message).slice(0,140));}
   }else warnings.push('Speech was not transcribed. ENABLE_SPEECH_TRANSCRIPTION=1 and faster-whisper are needed to recognize words.');
   // Always try inexpensive local signal characterization. Optional CLAP can
   // contribute coarse similarity, but does not provide a verified diagnosis.
   let waveform=null;
   try{waveform=await analyzeWaveform(source);}catch(e){warnings.push('Video audio waveform unavailable: '+String(e.message).slice(0,140));}
   const audioEventAnalysis={attempted:process.env.ENABLE_AUDIO_CLAP==='1',model:'CLAP',succeeded:false};
   if(audioEventAnalysis.attempted){
    try{audio=await audioSimilarity(source);audioEventAnalysis.succeeded=true;}
    catch(e){warnings.push('Optional CLAP audio: '+String(e.message).slice(0,140));}
   }else warnings.push('Audio event classification is not configured; waveform metrics alone cannot identify sounds.');
   if(!visual&&!audio&&!waveform&&!transcription?.hasRecognizedSpeech)throw Error(warnings.join(' | '));
   return {type:'video',visual,audio,audioEventAnalysis,waveform,transcription,warnings,limitations:'Only sampled frames, basic waveform features and optional automated speech transcript/CLAP. None confirms a mechanical fault.'};
  }
  const waveform=await analyzeWaveform(source);
  let audio=null,transcription=null;
  const warnings=[];
  if(process.env.ENABLE_SPEECH_TRANSCRIPTION==='1'){
   try{transcription=await speechTranscription(source,language);}
   catch(e){warnings.push('Speech transcription unavailable: '+String(e.message).slice(0,140));}
  }else warnings.push('Speech was not transcribed. Install faster-whisper and set ENABLE_SPEECH_TRANSCRIPTION=1 to interpret spoken words.');
  const audioEventAnalysis={attempted:process.env.ENABLE_AUDIO_CLAP==='1',model:'CLAP',succeeded:false};
  if(audioEventAnalysis.attempted){
   try{audio=await audioSimilarity(source);audioEventAnalysis.succeeded=true;}
   catch(e){warnings.push('Optional CLAP unavailable: '+String(e.message).slice(0,140));}
  }else warnings.push('Sound-event classification is not configured; only basic waveform features were processed.');
  return {type:'audio',waveform,audio,audioEventAnalysis,transcription,warnings,limitations:'Waveform features cannot identify speech, engine components or faults. Optional Whisper may transcribe speech with errors and optional CLAP provides uncalibrated sound similarity, neither verifies a mechanical diagnosis.'};
 }finally{await rm(temp,{recursive:true,force:true}).catch(()=>{});}
}

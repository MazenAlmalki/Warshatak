import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const library=JSON.parse(readFileSync(new URL('../data/car_audio_captions_v2.json',import.meta.url),'utf8'));
const script=readFileSync(new URL('../scripts/analyze_car_audio.py',import.meta.url),'utf8');
const server=readFileSync(new URL('../server/index.js',import.meta.url),'utf8');

test('extended sound catalog has independent candidates with source disclaimers',()=>{
 assert.equal(library.length,67);
 assert.equal(new Set(library.map(x=>x.id)).size,67);
 assert.ok(library.every(x=>x.classification_scope==='audio_event_similarity_only_not_mechanic_verified'));
 assert.ok(library.every(x=>x.origin==='curated_caption_not_from_youtube_link'));
 assert.ok(library.every(x=>typeof x.caption_en==='string'&&x.caption_en.length>25));
});

test('car noises cover broad sound groups plus talking and silence',()=>{
 const ids=new Set(library.map(x=>x.id));
 for(const name of ['engine_ticking','engine_knock','engine_rattle','starter_click','belt_squeal','brake_squeal','brake_grind','wheel_bearing_hum','tire_thump','suspension_clunk','transmission_whine','exhaust_rattle','car_horn','people_talking','silence'])assert.ok(ids.has(name),name);
});

test('classifier evaluates up to 20 seconds with separate windows',()=>{
 assert.match(script,/MAX_SECONDS = 20/);
 assert.match(script,/WINDOW_SECONDS = 10/);
 assert.match(script,/def audio_windows/);
 assert.match(script,/rank_matches\(comparisons, candidates\)/);
 assert.match(script,/sound_identified": False/);
 assert.match(script,/requires_confirmation": True/);
});

test('backend does not pretend to recognize sound based on waveform or silence',()=>{
 assert.match(server,/!classified && !wasAttempted.*beginSoundInterview\(\{language,reason:'classifier-not-configured'/);
 assert.match(server,/!classified && wasAttempted && mediaObject\?\.audioEventAnalysis\?\.succeeded===true/);
 assert.ok(server.includes("beginSoundInterview({language,reason:'no-candidates'})"));
 assert.ok(server.includes('CLAP only ranks descriptions by similarity'));
 assert.ok(server.includes("beginSoundInterview({language,reason:'classifier-error',error:failure})"));
});

# WARS H A T A K | Technical Project Report
**Warshatak — AI-assisted vehicle symptom intake**  
**Project report · 9 November 2026**  
**Developer:** Mazen Almalki  
**Evidence baseline:** branch `codex/gemini-audio-provider`, commit `d0bfe5f`.

## 1. Problem and product
Drivers often struggle to describe unfamiliar vehicle noises or symptoms. Warshatak provides an Arabic/English interface for collecting vehicle context, typed descriptions, voice dictation, and optional media attachments. The application returns *possible* explanations, source-supported inspection guidance, and uncertainty, not a verified diagnosis.

## 2. Product journey
1. Open the bilingual web interface and select or create a vehicle.
2. Type a symptom or dictate an editable draft; send only after reviewing.
3. Optionally attach an image, audio clip or video, with an explicit Send action.
4. Backend organizes user statements, transcriptions and model observations separately.
5. Review possible causes, recommended inspection steps and reference information.
6. Keep the case in browser-local vehicle history.

## 3. System architecture
**Client:** HTML, CSS and JavaScript.  
**Server:** Node.js and Express, with API routes for chat, media analysis, dictation and speech.  
**Data:** JSON symptom patterns, Saudi usage terminology and reference metadata.  
**Storage:** Browser localStorage for history and IndexedDB for attachments.  
**Processing:** Optional FFmpeg for decoding media; SHA-256 identity checks for registered recordings.  
**AI:** Configurable OpenAI-compatible chat/vision endpoint; optional Gemini audio understanding and TTS; optional Groq transcription or local Whisper.

```text
Browser UI → Express API → context / reference retrieval
                         ├─ Chat / vision provider
                         ├─ Optional Gemini audio
                         └─ Optional speech provider
         ← tentative result + inspection guidance
```

## 4. AI and data evidence
The repository documents 40 written symptom cards, 30 conditional patterns, Saudi vocabulary, 15 excerpts from two uploaded source videos and four registered known recordings. Exact file/PCM fingerprint matching does not establish recognition of similar new recordings. No independent fault-diagnosis accuracy benchmark or trained classifier is established.

## 5. Privacy and boundaries
Provider keys stay server-side. Browser history is local to each browser/origin, not a synchronized account. User media is processed temporarily and may be transmitted to configured providers. Provider-specific retention and quotas apply. The system must not represent a tentative suggestion as a confirmed mechanical inspection.

## 6. Development and verification
Repository scripts: `npm.cmd run dev`, `npm.cmd run check`, `npm.cmd test`, `npm.cmd run evaluate:audio`. These tests cover code contracts and controlled behaviors; they do not prove live-provider reliability or fault-classification accuracy. Independent labeled audio evaluation is still blocked by missing reviewed recordings.

## 7. Operational considerations
Useful future metrics: API success/failure counts, provider error categories, response latency, media rejection rates, transcription usability, and whether a technician agrees with the resulting intake summary. The repository does not establish a full production monitoring dashboard or a measured diagnostic accuracy score.

## 8. Limitations and next steps
Verify deployed provider configurations; collect permission-cleared independently labeled recordings; test Arabic dialect and device compatibility; evaluate outcomes with qualified technicians; introduce persistent accounts only with appropriate consent and access controls.

## 9. References
- [Repository README](../README.md)
- [Arabic technical stack](../PROJECT_STACK_AR.md)
- [Business model](../BUSINESS_MODEL.md)
- [Source and licensing notes](../REFERENCES.md)
- [Audio evaluation requirements](../data/car-audio/README.md)

*Prepared in a structure inspired by the supplied Dhamantaha report. This report documents repository-supported features and limitations, not independently measured production performance.*

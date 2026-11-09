# ورشتك | Warshatak

> **Current stack (November 2026):** Main chat = Meta Llama 3.3 70B API; image/video frames = Meta Llama 4 Scout API; **Context Engine** = local structured user-history and RAG assembly; audio = local FFmpeg and optional CLAP/Whisper. **No active Qwen model required.** The same private `CHAT_API_KEY` from OpenRouter is used for both hosted Meta models. See [LLAMA_CONTEXT_ENGINE_SETUP.md](LLAMA_CONTEXT_ENGINE_SETUP.md). Older sections below may describe historical versions; use the linked current setup guide to run this version.


Warshatak (ورشتك) is an Arabic/English vehicle-noise assistant with a responsive dashboard, light/dark themes, vehicle folders and history, and optional local audio/video attachments.

## Production deployment on Vercel

This section is the deployment source of truth. Older setup notes below are historical and do not override these steps. Use Node.js **24.x** (the pinned production runtime).

### Deploy using the dashboard

1. Merge the Vercel preparation branch/PR into the GitHub branch you want to deploy (normally `main`). These files must be in GitHub before importing; importing the unchanged original branch will not include these fixes.
2. Open [Vercel New Project](https://vercel.com/new), connect GitHub, and import **MazenAlmalki/Warshatak**. Grant Vercel access to this repository if requested.
3. Keep **Root Directory** at the repository root (`./`). Use **Express** as Framework Preset (auto-detected and declared in `vercel.json`). Keep Build Command and Output Directory at framework defaults; do not select a static-only preset or set a custom output directory. Install Command can remain automatic (`npm ci` with the committed lockfile). In Project Settings → Build and Deployment, confirm Node.js **24.x**. Do not use `npm start` as a build command.
4. In Environment Variables, add the following server variables for **Production** and **Preview** (and Development if you use `vercel dev`). Enter the real key only in Vercel, never in frontend code or GitHub files:

   | Variable | Value |
   | --- | --- |
   | `CHAT_API_URL` | `https://openrouter.ai/api/v1/chat/completions` |
   | `CHAT_API_KEY` | Your private OpenRouter API key; required, mark Sensitive |
   | `CHAT_MODEL` | `meta-llama/llama-3.3-70b-instruct` |
   | `VISION_MODEL` | `meta-llama/llama-4-scout` |
   | `CHAT_MAX_TOKENS` | `450` (optional; allowed range is bounded by the server) |

   `CHAT_API_URL`, `CHAT_MODEL`, and `VISION_MODEL` have these defaults, but setting all four explicitly makes deployment configuration clear. Ensure the OpenRouter account has credits and access to both models. Leave local audio flags unset or `0`. Do not set `PORT`, `VERCEL`, `FFMPEG_PATH`, or Python/model paths on Vercel. The platform supplies `VERCEL=1`.
5. Click **Deploy**. For later environment changes use Project Settings → Environment Variables, save, then Deployments → Redeploy; changes apply to new deployments. The Git integration deploys future production-branch pushes automatically and gives other branches Preview URLs.
6. Visit `/`, `/app.js`, `/styles.css`, `/api/health`, `/api/model-status`, and `/api/media-status` on the deployment URL. Confirm Arabic/English, themes, a new vehicle folder, reload-persistent history, a real text conversation, and a small JPEG/PNG/WebP attachment. A `configured: true` status means only that credentials are present; a real chat/image request verifies access and credits. Test an oversized image and audio/video selection: each must show the capability message without uploading. Use Runtime Logs for HTTP status failures; never print keys or provider request headers.

No Vercel account or production API credential is stored in this repository. Local tests use a fake provider; they do not prove live OpenRouter credits/model access or a completed Vercel deployment.

### Runtime, routing, and limits

- The officially supported [Express default export](https://vercel.com/docs/frameworks/backend/express) is at root `index.js`. `server/index.js` creates/exports the app without listening; `server/local.js` alone starts the local HTTP listener. No framework migration or frontend rebuild is required.
- `public/` is served directly by Vercel's CDN. Express static serving and `sendFile` fallback run only locally. On Vercel, Express redirects `/` and extensionless frontend navigation to the CDN-served `/index.html`, leaving `/api` and asset paths intact. This explicit redirect is necessary because the Express framework catch-all can run before project rewrites. The address bar displays `/index.html`. All six existing API paths remain: `/api/chat`, `/api/analyze`, `/api/health`, `/api/model-status`, `/api/media-status`, `/api/media/analyze`. Data files needed for retrieval are explicitly included in the Function bundle. Function duration is 120 seconds; hosted calls time out after 60 seconds.
- [Vercel Functions limit request and response bodies to 4.5 MB](https://vercel.com/docs/functions/limitations). The original 25 MB multipart endpoint cannot run unchanged. On Vercel, JPEG/PNG/WebP images are limited to **4 MiB (4,194,304 bytes)**, leaving space for multipart metadata below 4.5 MB. The browser checks server capabilities before selection/upload, including saved attachments; Multer also enforces the server limit. Requests sent outside the UI over the platform's limit may receive Vercel's own `413 FUNCTION_PAYLOAD_TOO_LARGE` before Express executes. JSON stays limited to 16 KiB.
- **Audio/video uploads and microphone analysis are explicitly unavailable on Vercel**, even if local feature flags are enabled. The interface explains this in Arabic/English and suggests a text description or still image. FFmpeg, Python CLAP and Whisper are not installed, downloaded or launched there. Existing local media history/playback is retained. To support larger files later, implement authenticated direct-to-object-storage uploads plus a separate media worker; raising Multer's limit does not bypass Vercel's limit.
- Text, history context, safety prompts, output checks, Helmet and the existing **30 API requests / 15 minutes** limiter remain. Vercel's trusted proxy is enabled for client-IP limits. The limiter is in memory: each Function instance has its own counters and cold starts reset them. For a global abuse/cost quota across scaled instances, configure Vercel WAF rate limiting (where supported by your plan) or add a shared rate-limit store. The current limiter alone is not a global quota.
- Vehicle folders, themes, Arabic/English preference and text history remain in localStorage; media remains in IndexedDB. Storage is per browser **and origin**, so a new Preview/production domain will not automatically contain history from localhost or another deployment domain. Temporary image files use `/tmp` and are removed after processing. There is no persistent server disk or database requirement. OpenRouter calls and the API key remain exclusively on the backend.

### Local development and checks

```sh
npm ci
cp .env.example .env
# Set CHAT_API_KEY privately in .env.
npm start
# Open http://localhost:3000
npm run check
npm test
```

`npm run dev` uses Node watch mode. Local runs retain the 25 MB media limit and optional FFmpeg/CLAP/Whisper behavior described in `MULTIMODAL_SETUP.md`. Never set `VERCEL=1` for normal local operation. `.env*` secrets, `.vercel/`, and logs are excluded from Git/deployment; `.env.example` contains placeholders only.

## Features
- Arabic / English user interface and Llama output (language setting preserved locally)
- Dark / light theme (saved locally)
- Multiple vehicles and a separate history for each
- Previous five analyzed issues for the selected vehicle are passed to Llama as **unconfirmed context** on the next analysis
- Four guided questions, possible causes, urgency, safety guidance
- Audio/video file uploads and microphone recordings, with local playback

**Multimodal V5:** Files remain saved locally in IndexedDB for history, and **when the user presses Send with a new attachment**, a copy is temporarily uploaded to this Node backend for processing. Images and sampled video frames use the configured vision model. Optional CLAP may analyze audio if specifically installed and enabled. The default chat model itself **cannot listen to sound**, and similarity results are not verified diagnoses. See [`MULTIMODAL_SETUP.md`](MULTIMODAL_SETUP.md).

## Historical setup notes (not current deployment instructions)

### Free Llama on Windows

1. Install or update [Ollama](https://ollama.com/download).
2. Run:
   ```powershell
   ollama pull qwen3.5:2b
   ```
3. From the CarNoise-AI folder:
   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```
4. Open http://localhost:3000

The chat backend defaults to a modern compact `qwen3.5:2b` model (unless `.env` overrides it) at `http://127.0.0.1:11434/v1/chat/completions` and no API key. Ollama must be running locally.

For a cloud provider create your own `.env` using `.env.example` and set `LLAMA_API_URL`, `LLAMA_API_KEY`, and `LLAMA_MODEL`. Never commit secrets. A deployed backend cannot access Ollama on a user's own laptop through localhost.

## Data and privacy

Vehicle names, issues, and AI result summaries are stored in **this browser's localStorage**; attached media is saved in **this browser's IndexedDB**. This is **not a cloud account** and data will not sync across devices. Browser clearing, storage limits, or private browsing may erase it. Descriptions, guided answers and up to five summaries of previous issues for the active car are transmitted to your configured Llama endpoint for analysis. **V5 change:** When attached to the first chat message and sent, image/audio/video is temporarily uploaded to this Node server for processing; the temporary file is removed afterward. The optional audio model requires installation. External AI providers may receive text and derived media descriptions if configured. Audio/video is not silently uploaded before Send. Choose a provider you trust and avoid putting personal identifying information in descriptions.

## API

`GET /api/health`: reports backend setup (not actual Ollama readiness).

`POST /api/analyze`: JSON with `description`, Arabic canonical values for `timing`, `sound`, `location`, `frequency`, optional `language: 'ar'|'en'` and optional `history` (past case snippets). Returns `result` with `title`, `summary`, `severity` (`low`, `medium`, `high`), `reasons`, `nextSteps`, and `urgentSigns`.

## Status

- [x] Bilingual responsive frontend and theme toggle
- [x] Multi-car browser-local history and media playback
- [x] Backend with validation, free local Ollama adapter and past issue context
- [ ] Test all workflows against an installed Ollama model and different browsers
- [ ] Implement specialist audio/video classification model
- [ ] Deploy to a public host with accessible AI endpoint


## Data collection starter (November 2026)
- `data/knowledge_seed_v1.json`: 14 bilingual source-backed automotive symptom cards, including clickable original source URLs. Status: `source_reviewed`, **not mechanic confirmed**.
- `data/training_candidates_unreviewed.jsonl`: 14 synthetic chat examples derived from those cards; **do not train without mechanic review** and an independent evaluation set.
- `data/cases_template.csv`: blank template for collecting real cases with consent and outcome verification.
- `DATA_COLLECTION_GUIDE.md`: field definitions, privacy, RAG and evaluation recommendations.

These are starter educational reference records, not a diagnostic ground-truth dataset. The live app does not yet retrieve from these files automatically. A reliable next step is to add retrieval (RAG) using reviewed cards, then expand with actual independently verified service outcomes before QLoRA training.


## Audio source and automotive guidance research (November 2026)

- `data/audio_sources_v1.json`: **12** linked audio recordings with source attribution and licenses (10 Freesound CC0, 2 public-domain Wikimedia Commons). Audio **files are not downloaded into the repository**.
- `data/audio_dataset_catalog_v1.json`: **4** external collection leads with documented research and license constraints.
- `data/source_comments_v1.json`: **12** paraphrased evidence notes sourced from established automotive/consumer organizations (AAA, The AA, US FTC); not user comments or verified service cases.
- `data/AUDIO_SOURCES_README.md`: licensing, reliability distinctions and the suggested CLAP+RAG evaluation workflow.

These files are ready for review and future data ingestion; audio matching is **not yet integrated into the running app**.


## Expanded 1,000+ sound reference research

New in `data/`:
- `large_audio_dataset_catalog.json` — original large audio datasets with counts, licensing, access, quality and suitability.
- `LARGE_AUDIO_COLLECTION.md` — instructions, caveats and reproducibility.
- `../scripts/import_kwerimoto.py` — imports upstream KweriMoto **1,067-row manifest** into `data/imported/kwerimoto_index.jsonl` with an audit report. Run it yourself on a network-enabled machine. Only metadata is downloaded.
  
No 1,067 individual audio files or metadata rows have been imported into this GitHub repository yet. Publisher-reported sample counts must not be confused with data already downloaded or rights-cleared. See `data/LARGE_AUDIO_COLLECTION.md`.

## Project report documents

- [UPDATES.md](UPDATES.md) — development timeline, actual tools used, implemented features and work still pending.
- [REFERENCES.md](REFERENCES.md) — automotive knowledge, original audio sources, large datasets, licenses and technology references.


## Typed symptom knowledge retrieval (November 2026)
- `data/typed_symptoms_v1.json`: **40** bilingual automotive symptom reference cards including Saudi colloquial text variations, possible causes, cautious next steps, and publisher source links.
- `server/textRetrieval.js`: simple offline **keyword/phrase-based retrieval** from these cards, with Arabic text normalization.
- `POST /api/analyze` now retrieves up to **3** plausible cards based on the user's typed description and includes them in the Llama request as tentative source-grounded context. The API also returns `knowledgeMatches` with source URLs for debugging / future source display.
- The 40 cards summarize publications, **not mechanic-confirmed case diagnoses**. Keyword retrieval may miss synonyms or produce irrelevant matches; the app must never treat a match as proof of a fault.
- **Not implemented:** audio embeddings, semantic/vector RAG, automatic audio recognition, and mechanic-verified evaluation.

Example user descriptions: `السيارة ترج وهي واقفة`, `الدركسون يرج على الخط`, `الفرامل تحك`, `المكينة تحتر`, `car shakes at idle`.

Run `npm.cmd run check`, then test `npm.cmd run dev` with an available Ollama model. The new retrieval code is committed but has not been tested end to end against the user's Ollama instance.


## V4 — Natural AI chat (November 2026)

**New sessions open with a conversation instead of immediate multiple-choice questions.** Write a car problem in Arabic or English and send it; the frontend calls `POST /api/chat`, which passes the latest message, up to 12 previous chat turns, limited relevant text knowledge cards, and tentative vehicle history to the configured Llama endpoint. The AI should respond naturally and ask at most one useful follow-up question if needed.

- Chat messages are stored **locally per vehicle case** alongside previous analyses; older MCQ-based history entries remain viewable.
- No required four-question wizard for **new chats**.
- Initial audio/video attachments can still be saved and replayed locally; **Llama cannot hear them**. Additional attachments after a chat begins are disabled until multi-attachment storage is implemented.
- The old `POST /api/analyze` route is retained for compatibility with older code, while new chats use `POST /api/chat`.
- Requires a running local Ollama model or configured remote compatible model; **no live Ollama response was verified in this GitHub-only change**.
- Retrieval uses a source-grounded keyword matcher, not vector-semantic RAG, and retrieved symptoms are not confirmed diagnoses.

Test by running `npm.cmd run check`, `npm.cmd run dev`, then submit `السيارة ترج وهي واقفة` and follow with `وألاحظ إنها تزيد مع المكيف`. The AI should answer both without displaying the fixed multiple-choice questionnaire.


## V5 — text, photo, video and optional sound inference (November 2026)
- **Text chat:** `qwen3.5:2b` via Ollama; previous turns and publisher-source text retrieval; Riyadh local date inserted at request time to reduce stale-date answers.
- **Image/video visual understanding:** `qwen3-vl:2b` via a dedicated Ollama `/api/chat` request. Video samples at 0s and 2s using FFmpeg, **not full video temporal reasoning**.
- **Audio (optional):** Python/PyTorch/Transformers `laion/clap-htsat-unfused` scores sound-versus-text similarity; the model is **OFF by default** until installed and enabled. Similarity is not a mechanical diagnosis.
- **Backend:** `POST /api/media/analyze` processes an uploaded media file (25MB max) with a temporary file deleted on completion. `POST /api/chat` accepts optional cautious media observations as context.
- **Browser:** the selected media is sent **only after Send**; still retained for local history. Media processing errors produce an explicit warning and the textual conversation can continue.
- **Actual test status:** GitHub source and configuration are updated; the user's local Ollama, FFmpeg and CLAP environments have **not** been independently tested.
- **Setup:** [MULTIMODAL_SETUP.md](MULTIMODAL_SETUP.md). Existing private `.env` must be updated manually (the example alone does not change it).


## V5.1 — Saudi Arabic understanding and grounded responses (November 2, 2026)

Warshatak now uses an explicit, testable **Saudi dialect normalization and intent layer** for common car complaints. For example, `سيارتي ترج وهي واقفة` is understood as a vibration/rough-idle symptom and matched to a source-linked guidance card. The card's possible explanation and safe next step are shown directly, instead of asking a small language model to invent reasons. The AI chat remains available for less-clear or broader questions.

- `server/saudiUnderstanding.js`: Saudi aliases, combined symptom/context matching, follow-up awareness, and high-risk safety detection.
- `server/index.js`: known high-confidence automotive symptoms use publisher-based card answers before model inference; inconclusive free-form messages still use the configured AI model.
- `public/app.js` and `public/styles.css`: show source links below these **publisher-grounded** replies.
- `tests/saudiUnderstanding.test.js`: 7 regression tests for idling vibration, AC follow-up, Arabic normalization, English descriptions, ambiguous inputs, and brake safety.
- Run `npm.cmd run check` and `npm.cmd test` after `git pull origin main`.
- Verified in isolated code checks: 7 test cases passed. **Real browser integration on the user's PC is not yet verified.**

**Limitations:** Rule-based matching covers frequent expressions, not all Saudi dialects or every car. Publisher summaries are not mechanic-confirmed individual vehicle diagnoses. Low-confidence cases can still receive imperfect model-generated answers; always validate against actual inspection for safety-critical issues.


## V5.2 — AI-generated conversation instead of fixed symptom scripts

All normal new chat messages call the configured AI model. Saudi dialect normalization (`ترج` = vibration), prior turns, and up to two candidate source-backed automotive cards are passed **as context**, rather than returned directly as hardcoded replies. The model then generates an explanation in its own words, can ask one relevant follow-up, and must express uncertainty. Severe safety signals receive explicit protective advice. The system may still be inaccurate, particularly with small CPU-friendly models.

Optional `.env` settings:
```dotenv
CHAT_MODEL=qwen3.5:2b
CHAT_THINK=0
CHAT_MAX_TOKENS=320
CHAT_CONTEXT=3072
```
Set `CHAT_THINK=1` only if you prefer to experiment with longer reasoning and can tolerate slower local responses. This is not guaranteed to improve factual accuracy. Restart Node after changing `.env`.

After `git pull origin main`, test the example `سيارتي ترج وهي واقفة` then `إيه تزيد مع المكيف`, and compare answers with earlier behavior. Avoid claiming fault confirmation based only on language-model output.


## V5.3 — Saudi car problems language corpus & intelligent clarification (November 2, 2026)

Warshatak's text retrieval now recognizes many more Saudi vehicle-problem descriptions. It uses **language-data expansion**, **official Saudi context**, and **natural LLM clarification**, not a scripted answer for each question.

- `data/saudi_synthetic_utterances_v1.jsonl`: **1,200** unique, explicitly **synthetic** Saudi Arabic ways of describing the 40 underlying symptom cards. These are **not** independent or mechanic-confirmed repair cases. The phrases are indexed for exact matching.
- `data/saudi_dialect_aliases_v1.json`: **124** extra regional colloquial phrases indexed for keyword/phrase matching.
- `data/saudi_official_context_v1.json`: **7** references to Saudi government/official guidance including recall lookup, tire standards and summer safety; relevant evidence is supplied to chat when applicable. A named vehicle is **not assumed recalled** without an official VIN lookup.
- `data/conversation_fallback_examples_v1.json`: **15** bilingual behavioral examples for unclear sound descriptions, misunderstood language, missing media analysis and multi-turn follow-ups. These are behavior-design data, not repair facts.
- `server/saudiKnowledge.js`: retrieves targeted Saudi context and gives the language model guidance for low-confidence messages or missing audio/visual analysis.
- `server/textRetrieval.js`: uses the added aliases and the 1,200 synthetic phrases alongside existing 40 publisher-linked automotive cards.
- `POST /api/chat` **still uses the language model to write every normal reply**. It receives source clues and guidance, and should ask **one relevant clarification** when information is insufficient; it must not claim it listened to an audio clip if sound analysis failed.
- `tests/saudiCorpus.test.js`: verifies synthetic data labels, slang mappings, official source filtering, and missing-media warnings.
- [Detailed inventory and collection limits](SAUDI_KNOWLEDGE_REPORT.md).

**Checks so far:** All 1,200 synthetic sentence variants mapped to their expected original source card within the top 3 retrieval matches in an isolated code test. These are **synthetic in-sample lookup tests**, not a measurement of accuracy on real Saudi users or mechanic-confirmed faults. Real conversation quality, model performance and audio analysis still require independent testing.


## V5.4 — Saudi dialect glossary and intelligent handling of unusual questions (November 2, 2026)

**Added a runtime-understanding layer, not a scripted response engine.**

- `data/saudi_dialect_glossary_v1.json`: **128** curated Saudi colloquial expressions, their contextual meanings, domain and ambiguity flags (not independent automotive faults).
- `data/saudi_conversation_edge_cases_v1.jsonl`: **204** generated **test phrases** from 51 distinct scenarios: greetings, jokes, odd/nonsensical prompts, corrections, unclear issues, media-analysis failures, unrelated questions, safety, recalls, and preference requests. These **are not copied answers** the AI sends verbatim.
- `server/saudiDialect.js`: identifies relevant slang meaning and an optional conversation intent from the user's message. Supplies a **small** amount of context to LLM rather than inflating the entire prompt.
- Updated `server/saudiKnowledge.js` and `server/index.js` to let the model chat naturally rather than force every message into an automotive diagnosis. If an uploaded file wasn't actually analyzed, it must acknowledge that.
- `tests/saudiDialect.test.js`: regression tests for vocabulary, joking, misunderstandings, vague sounds, unrelated questions and failed audio.
- [Read the full dictionary and conversational behavior guide](SAUDI_DIALECT_GUIDE.md).

This is additional to the existing **1,200 synthetic Saudi complaint descriptions**, **124 symptom aliases**, **40 publisher-linked automotive symptom cards**, and **7 Saudi official informational records**. Generated phrases are not ground truth or mechanic-confirmed cases; real-world correctness remains to be evaluated.


## V5.5 — Saudi car-part terminology + English typing reliability (November 2, 2026)

Added **89** Saudi-used automotive terms with **317** variants and **1,068** synthetic Arabic/English dialogue samples (12 per term), covering meanings, common user questions, uncertainty-aware responses and safer clarification. New key distinctions include **بوري = horn**, **جلنط = parking brake**, and ambiguous `شمعات` (headlights or spark plugs depending on context). This is linguistic data, not mechanic-confirmed training labels or fine-tuning.

- `server/saudiCarTerms.js` loads matching terms at runtime and passes only a few short definitions/clarification cues to the AI model, which composes the actual reply.
- `server/chatLanguage.js` determines the reply language from **the actual typed message**, irrespective of Arabic/English UI mode. Short/numeric messages fall back to the UI selection.
- `public/app.js` now uses per-message automatic text direction, so English replies and Arabic replies are displayed legibly in the same chat.
- `tests/saudiCarTerms.test.js` tests bilingual requests, horn, parking brake, ambiguity, and corpus provenance.
- [Detailed data, limitations and test examples](SAUDI_CAR_TERMS_AND_ENGLISH.md).

English availability on the user's own machine still depends on local Ollama working and on the model being able to answer; server-side language routing was changed, but no remote test of their running LLM is claimed.


## V5.6 — Natural conversation, first-message memory, audio/video attachment improvements (November 2, 2026)

- **Natural responses:** The chat prompt now strictly avoids repetitive greetings and nicknames such as `يا بطل`, `يا غالي` or `buddy`. A minimal reply cleanup also removes those phrases when an underpowered model emits them despite instructions.
- **Multi-turn context:** `server/conversationContext.js` preserves the original user complaint and the 10 most recent turns. Follow-ups like `زي صوت الصرير` are interpreted in the context of the earlier problem, and the model is told not to ask answered questions again. Existing chat messages remain saved in the local client state.
- **Audio recording/attachment:** audio uploads no longer fail solely because `ENABLE_AUDIO_CLAP=0`. With **FFmpeg** available on the PC, `server/audioWaveform.js` extracts basic waveform features (level, temporal variation and rough frequency texture) from up to 12 seconds of audio. **This is not audio event recognition, speech transcription or car fault diagnosis.** Optional heavyweight CLAP remains disabled by default.
- **Video:** samples two video frames for the configured Ollama vision model and attempts the same waveform-level audio characterization. Video/audio may still fail or be very slow without FFmpeg, model support or sufficient RAM.
- **Attach during chat:** users can now attach new audio/video/image files and record audio in a continuing conversation instead of only at the start. The current media findings are passed to the chat with limitations.
- **Readiness:** `GET /api/media-status` indicates whether FFmpeg is found for audio and video. See [MULTIMODAL_SETUP.md](MULTIMODAL_SETUP.md).
- **Regression tests:** `tests/conversationMedia.test.js` covers original-question memory, safe transcript handling, and basic waveform characteristics.
- **Important:** Ollama chat still runs locally on CPU for the tested laptop and can be slow/inaccurate. Source checks are not substitutes for a real audio/video end-to-end test on that laptop.

## V5.7 — Tap-to-clarify an unclear audio recording

Audio clips that cannot be understood now offer clickable descriptions: spoken words, clicking, squealing, whistling, humming, vibration or other. The app explicitly says when it **did not** recognize the sound and treats selections as **user descriptions**, never as confirmed audio observations or vehicle faults. If the media decoder fails, the same choices are available. This complements optional Whisper speech transcription and CLAP sound similarity; it does not replace them.


## V5.8 — Genuine sound analysis before clarification

Previous audio quick-choice behavior was incorrect: sound-description suggestions appeared even when the real sound classifier had **not run**. Fixed by tracking whether CLAP classification was actually attempted. With CLAP disabled, Warshatak now clearly reports that only basic waveform measurements were taken; it does **not** pretend to recognize vehicle noises, nor present immediate sound choices. If CLAP is enabled and fails, clarification options can follow; if it returns candidate sounds, the AI interprets them as uncertain audio similarities.

**Enabling actual sound-event similarity** requires the optional Python CLAP environment described in [MULTIMODAL_SETUP.md](MULTIMODAL_SETUP.md). For speech like `السلام عليكم`, a separate Whisper speech-transcription model is required (`ENABLE_SPEECH_TRANSCRIPTION=1` and `faster-whisper`), which is not the same as recognizing car sounds. Both may run slowly on low-memory machines. These updates are source-level changes and require local validation.


## V5.9 — Richer sound-event candidates for CLAP (November 2, 2026)

The optional local sound analysis now uses **67 audio-event descriptions** (previously 16) and compares up to **20 seconds** in 10-second windows. Categories include engine, starting/electrical, brake/wheel, belt/cooling/AC, suspension/drivetrain/exhaust, and background/speech. Candidate sound labels are newly curated, **not extracted from the user's YouTube Short** and **not verified faults**. Results are similarity rankings, not diagnoses; near-silent clips produce no forced label.

The YouTube audio was inaccessible for inspection in this environment. The specific examples in that Short still need testing with uploaded audio samples. CLAP must be enabled in `.env`, Python dependencies present, and FFmpeg installed to run the real classifier. See [MULTIMODAL_SETUP.md](MULTIMODAL_SETUP.md) and [UPDATES.md](UPDATES.md).


## V5.10 — Guided audio clarification + public YouTube learning links (November 2, 2026)

A new **step-by-step guided interview** helps when sound-event recognition cannot give a useful result. It asks about **where** the sound comes from, **when** it occurs, and **how** it sounds, collecting the user's own answers before the AI discusses possible explanations. If CLAP is disabled, it offers the user an optional manual-interview action rather than pretending that it listened. CLAP candidate similarities, when available, remain tentative. This is not a fixed diagnosis system.

The project additionally indexes **28 public video-topic links from 8 real YouTube videos**, plus **536 synthetic sound-description phrasings**, to complement the existing 67 CLAP captions. Video metadata is for source-backed educational context, not labeled sound files or proof of which component is faulty. Source inventory: [SOUND_RESEARCH_AND_GUIDED_QUESTIONS.md](SOUND_RESEARCH_AND_GUIDED_QUESTIONS.md).


## V5.11 — Hosted Meta Llama text API replaces local Qwen chat (November 2, 2026)

The main free-form chat **and** legacy text analysis now use an external **Meta Llama 3.3 70B Instruct** model via an OpenAI-compatible API. OpenRouter is the default because its model listing currently offers `meta-llama/llama-3.3-70b-instruct`. The app no longer defaults text chat to local `qwen3.5:2b` or local `llama3.2:3b`.

- Configuration: `CHAT_API_URL=https://openrouter.ai/api/v1/chat/completions`, `CHAT_API_KEY=<private key>`, `CHAT_MODEL=meta-llama/llama-3.3-70b-instruct`.
- The frontend never receives the API key. Main chat keeps Saudi-dialect interpretations, vehicle data, RAG references, sound-clarification interview and conversation history.
- `GET /api/model-status` now reports hosted text-provider configuration separately from **local Ollama vision**.
- The separate `VISION_MODEL=qwen3-vl:2b` still handles local image/video still-frame analysis; CLAP and Whisper are also separate. **Text Llama 3.3 is text-only.**
- Read [HOSTED_LLAMA_API_SETUP.md](HOSTED_LLAMA_API_SETUP.md) to migrate the actual private `.env` and test the API.

A key is required and API calls may incur provider charges. ChatGPT plans do not include OpenRouter API credits. Hosted text processing sends user prompts and relevant derived context to the chosen provider; it does **not** magically make CLAP or vision faster.


## V5.12 — Fewer questions, stronger contextual car-noise retrieval

Warshatak now uses a bounded question planner to **ask only when something important is missing**. It stops asking once two useful details are known, enforces at most one question in a response and two clarification questions for the ongoing case, and avoids repeating already answered questions. The audio fallback now finishes after two choices instead of three.

A new knowledge layer retrieves **30 evidence-linked symptom patterns** from nine source URLs by matching two or more features (timing, sound type, approximate location). These are not proven diagnoses or actual sound recordings; the library complements existing automotive symptom cards, YouTube educational topic links, and synthetic language examples. Read [MINIMAL_QUESTIONS_AND_EVIDENCE.md](MINIMAL_QUESTIONS_AND_EVIDENCE.md) for source inventory, limitations and testing instructions.

For Groq, use only the model IDs returned for your Groq account. The included Llama defaults may not be available to Groq users; adjust `CHAT_MODEL` in your private `.env` to a supported chat model.

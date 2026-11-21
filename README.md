# Lauscher • Ear Training, Music Theory & Studio Listening

**Lauscher** (*Listen · Understand · Play*) is an interactive, ad-free, and tracker-free web application for musical ear training, music theory, sight-reading, vocal warmup, and studio mixing ear training — running directly in the browser with no backend server, no login, and no score pressure.

---

## Table of Contents

- [Features Overview](#features-overview)
- [Knowledge Hub & Interactive Reference](#knowledge-hub--interactive-reference)
- [Audio Engine & Two-Tab Mixer](#audio-engine--two-tab-mixer)
- [Onboarding, Languages, Themes & Account](#onboarding-languages-themes--account)
- [Project Structure](#project-structure)
- [Run Locally & Test on Mobile](#run-locally--test-on-mobile)
- [GitHub & GitHub Pages Notes](#github--github-pages-notes)

---

## Features Overview

### 9 Core Training & Exam Modules

Every training area includes graded difficulty levels, listening aids (A/B comparison, root/bass reveal, tonic cadence context), **Listen-Only Mode**, and live tempo control:

1. **Intervals & Chords**
   - Melodic intervals (**ascending** and **descending**), **harmonic intervals**, and **root-pad drone** training across 3 levels (Foundations, Diatonic Major, All 13 Chromatic Intervals / up to the 9th).
   - **Chord quality & inversion recognition** across 4 levels — from basic triads and root-position/inverted voicings up to seventh chords, jazz extensions (`maj9`, `7♭9`, `7♯9`), ascending/descending arpeggios, and block chords in all 12 keys.
2. **Cadences**
   - Identify harmonic functions and chord progressions across 4 levels (`I–IV–V–vi` through diatonic degrees, secondary dominants, and tritone substitution `♭II7`).
   - Selectable target position (**Bar 4** or **Random Bar 1–4**), key mode, and meter (`4/4`, `3/4`, `6/8`, `5/4`, or random).
   - **Minor cadences** (`cadence-minor`): the same exercises in minor keys across 4 levels (`i–iv–V–VI` through natural vs. harmonic dominant `v`/`V`, `ii°`, `III`, `VII`, Neapolitan `N6`, minor ii–V `iiø7` and `♭II7`), with matching exam levels.
3. **Solfège**
   - Identify all 7 scale degrees (`Do–Ti` / `1–7`) on an interactive keyboard inside a `I–vi–IV–V` harmonic context across 6 levels (from fixed C Major single-octave up to rotating keys and multi-octave spans after every answer).
4. **Scales & Modes**
   - **Mode recognition:** Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, and Harmonic Minor (including transposed tonal centers).
   - Mode names include their degree of the major scale (e.g. *Dorian (2)*); an optional **Root Pad** chip plays the mode's root as a sustained strings pad underneath.
   - **Characteristic color tones:** Hear defining modal intervals (`♯4`, `♭7`, `♮6`, `♭2`, `♭5`, `♯7`).
   - **Modal cadences & vamps:** Recognize iconic modal loops (`i–IV`, `I–♭VII`, `I–II`, `i–♭II`, etc.).
5. **Melodies**
   - 5 progressive levels from single-octave `Do–Fa` and `Sol–Do` tetrachords (`4–6` notes) to full-scale randomized keys, multi-octave expressive phrases, and **Level 5 Combined Melody Dictation** (identifying both pitch and rhythmic note durations together). The phrase is shown on a real staff (clef, key signature, meter, bar lines): unsolved notes appear as rhythm slashes on the middle line — in dictation even without stems — so no pitch is given away before you answer.
6. **Rhythm**
   - **Meter & Time Signatures:** `4/4`, `3/4`, `2/4`, `6/8`, `5/4`, `7/8`.
   - **4-Beat Rhythm Dictation:** Quarter notes, eighths, rests, offbeats, triplets, sixteenths, dotted values, and syncopation.
   - **Tap-Back Pad:** Tap phrases back live, including **Blind Mode** where the click mutes during your turn.
   - **Tap from Notation:** the rhythm is written on a one-line staff (no demo); after a 1-bar count-in you tap it along with the metronome (Level 4 without metronome). A timeline shows exact / close / missed notes and extra taps; tolerance is capped at 35 % of the shortest note gap.
   - Rhythm dictation and tap exercises are displayed on a one-line percussion staff instead of tiles.
   - **Groove, Accents & Micro-Timing:** Groove feel, offbeat accent detection, and timing offsets down to `±28 ms`.
7. **Notation & Sight-Reading**
   - 6 progressive levels spanning **Treble**, **Bass**, and **Alto** clefs — from notes inside the 5-line staff up to `±3` ledger lines, accidentals (`♯/♭`), **all 12 key signatures**, natural signs (`♮`), an interactive keyboard, Skip button, and a 6-note scrolling queue.
   - **Chord Reading:** stacked triads and seventh chords (root position & inversions, treble/bass) — tap all chord tones in any order.
   - **Grand Staff:** treble and bass clef at once; notes jump between both staves.
8. **Production (Studio & Mixing)**
   - **Pure Sine Frequency Recognition:** From `63 Hz` (sub-bass) up to `12 kHz` (air band) across 5, 8, or 13 bands.
   - **Pink Noise EQ Boost:** Hear broad and narrow peaking EQ boosts (up to **13 ISO third-octave bands** with `Q 4.5` at `+3 dB`), complete with loudness matching, live A/B bypass, and a built-in **-14 dBFS safety limiter**.
9. **Category Exam Mode**
   - Dedicated graded exams for all **9 training categories** with selectable **10, 20, or 50 questions**.
   - Supports **Instant Feedback** or **Blind Exam Mode**, configurable replay limits, partial-credit scoring (including split pitch/rhythm evaluation for combined melody dictation), post-exam **Audio Review**, and saved results in your local Exam History.

### Practice Tools

- **Vocal Warmup (`5-Minute Warmup`):** 4 guided phases (*1 Breath & Body*, *2 Resonance & Tone*, *3 Arpeggios & Range*, *4 Vowels & Choir Blend*) with SATB / Mixed Choir range presets, Piano / Voice / Piano+Voice accompaniment, BPM slider (`65–135 BPM`), and localized vowel drills across all languages.
- **Dedicated Tools Tab (`Tools`):** Houses standalone practice utilities separated from the exercises — **Metronome**, **Chromatic Tuner**, plus a prepared view for **Free Play (Coming Soon)**.
- **Chromatic Tuner:** Live pitch detection via microphone (McLeod pitch method, sub-cent accurate), needle gauge (±50 cents with in-tune zone), live frequency spectrum with a pointer at the detected pitch, and a celebration animation once a note sits cleanly in tune. Switch between **automatic** detection of all notes and a **single target note**; play pure **reference tones**; adjustable concert pitch (`A = 430–450 Hz`). Presets for guitar (Standard, half step down, Drop D, DADGAD, Open G, Open D), electric guitar (incl. Drop C & 7-string), electric bass (4/5-string, Drop D, half step down), mandolin, banjo (Open G, Double C), violin, viola, cello, double bass (orchestral & solo) and voice. Tuned strings get a check mark; the screen stays awake while tuning. Requires HTTPS or `localhost` (and the `RECORD_AUDIO` permission in the Android app, added automatically by `scripts/sync-android.sh`).
- **Metronome:** Built-in precision metronome with **Tap Tempo**, `30–240 BPM` slider, visual pendulum orb, `1–16` customizable beats (accent, normal, mute), subdivisions (`1×–4×` plus **Shuffle** with a swung triplet feel), meter chips (`2/4`, `3/4`, `4/4`, `5/4`, `6/8`, `7/8`), master volume control, and savable meter/BPM profiles.
- **Invisible Session Memory:** Mixed-up intervals, chords, inversions, modes, solfège degrees, and notes are quietly worked back into the next 2–5 exercises (never back to back) until you get them right on the first try twice. It lives only in memory for the current session: no score, no display, nothing stored.

---

## Knowledge Hub & Interactive Reference

Inside the **Knowledge** (`Wissen`) tab, interactive audio examples accompany every topic across three sections:

- **Theory (12 interactive modules):** Intervals, Cadences, Physics & Sound, Solfège & Degrees, Rhythm & Meters, Singing & Voice, Modes & Scales, Keys & Signatures, **Interactive Circle of Fifths**, Sing & Play, Notation & Clefs, and Arranging.
- **Articles (9 deep-dive guides):** Ear training fundamentals, communicating about music, the 4-chord progression, harmonic gravity, minor plagal cadences, acoustic physics & waves, songwriting tricks, functional harmony, and world music traditions.
- **Instruments (8 families):** Strings, Woodwinds, Brass, Keyboards, Plucked Instruments, Rhythm & Percussion, Electronic Instruments, and Ensembles & Orchestras.

---

## Audio Engine & Two-Tab Mixer

- **Custom Sample Engine ([`audio.js`](audio.js)):** Powered by **Tone.js (`14.8.49`)** and `EarLabSampledInstrument` using WebAudio buffers decoded from **96 embedded DAW studio samples** (`89` across 6 melodic instrument packs: `piano`, `guitar`, `strings`, `brass`, `voice`, `bass`, plus `7` percussion samples), with automatic WebAudio synth fallback.
- **Two-Tab Mixer (`Volumes` & `Room Reverb`):**
  - **Volumes Tab:** Live faders for all 6 instrument tracks plus instant mix presets (*Duo (Piano & Guitar)*, *Ensemble*, *Orchestra*, *Solo Piano*, *Custom*).
  - **Room Reverb Tab:** Switch global room ambience between **Dry (`0%`)**, **Natural (`24%` piano default)**, and **Concert Hall (`48%` piano default)**, or fine-tune reverb individually per instrument (`Piano`, `Guitar`, `Strings`, `Brass`, `Voice`, `Bass`) with inline sound-preview (`▶`) buttons.
- **Home Quick-Mixes:** Launch saved favorite mix setups directly from the home quick-mix bar.

---

## Onboarding, Languages, Themes & Account

- **6-Step Guided Onboarding:** First launch walks new users step by step (`1 of 6` to `6 of 6`) through **Language**, **Theme / Look** (with a note that custom themes can be created anytime), **Auto-Advance after correct answers**, **Musician Profile**, **Training Focus**, and a personalized welcome screen.
- **6 Languages & Full RTL Support:** Instant live UI and knowledge-hub switching between **Deutsch (`de`)**, **English (`en`)**, **Français (`fr`)**, **Polski (`pl`)**, **Українська (`uk`)**, and **اردو (`ur`, full RTL layout including mirrored swipe direction)** — plus automatic or manual switching between German (`H / B / Cis`) and International (`B / Bb / C#`) note naming.
- **4 Built-In Themes + 3 Custom RGBA Theme Slots:**
  - *Waldlichtung & Salbei*, *Morgentau & Küste*, and *Abenddämmerung* — each with dedicated **Light**, **Dark**, and **System** appearance modes.
  - **Metal** — a sleek, dark obsidian black theme (`#090A0D`) built for a clean, adult look with dual accents (**Cold Steel Blue** & **Crimson Red**).
  - **Custom Theme Studio:** 3 persistent user slots with live RGBA/color-pad customization per UI color token starting from any built-in template.
- **Account (`Konto`) & Mindful Timers:**
  - Multi-select dropdown menus with tag pills for **Your Instruments** and **Training Focus**. *(Lauscher mascot looks are temporarily hidden — see [`docs/ideas.md`](docs/ideas.md).)*
  - **Background Break Reminder (`5–30 min`):** Silent background exercise timer (default `15 min`, quick presets `5 / 10 / 15 / 20 / 25 min`) that gently prompts for an ear break without showing a distracting countdown during practice.
  - **Mindful Session Timer:** Configurable session pacing (`5–20 min`) with automatic inactivity pause (`2–5 min`).
- **100% Local Privacy (`localStorage`):** No accounts, analytics, or external storage. Export, restore, or reset your complete profile, mixes, custom themes, and exam history anytime via **`lauscher-profil-YYYY-MM-DD.json`**.

---

## Project Structure

| File / Folder | Purpose |
| :--- | :--- |
| [`index.html`](index.html) | Main HTML structure (views, onboarding wizard, modals, navigation) |
| [`styles.css`](styles.css) | Complete UI styling, responsive layout, RTL support, and all Light/Dark/Metal/Custom theme tokens |
| [`app.js`](app.js) | Core app logic, exercise & exam generators, history/swipe navigation, mixer, onboarding, and Account/Theme studio |
| [`audio.js`](audio.js) | `AudioEngine`, `EarLabSampledInstrument`, per-instrument reverb sends, limiter, pink-noise EQ & percussion |
| [`i18n.js`](i18n.js), [`i18n-fr.js`](i18n-fr.js), [`i18n-pl.js`](i18n-pl.js), [`i18n-uk.js`](i18n-uk.js), [`i18n-ur.js`](i18n-ur.js) | Multilingual UI strings, musical terminology, and RTL localization (`DE / EN / FR / PL / UK / UR`) |
| [`knowledge.js`](knowledge.js), [`knowledge-en.js`](knowledge-en.js), [`knowledge-fr.js`](knowledge-fr.js), [`knowledge-pl.js`](knowledge-pl.js), [`knowledge-uk.js`](knowledge-uk.js), [`knowledge-ur.js`](knowledge-ur.js) | Localized knowledge modules, articles, instrument guides & Circle of Fifths content across all 6 languages |
| [`fonts/Andika/`](fonts/Andika/) | App font **Andika** by SIL International (SIL Open Font License, see `OFL.txt`) |
| [`samples/`](samples/) | Pre-processed Base64 JS instrument & percussion bundles (`*-bundle.js`) for instant browser audio without CORS errors |
| [`docs/ideas.md`](docs/ideas.md) | Deferred ideas & planned features (German) |
| [`lauscher-mobile.html`](lauscher-mobile.html) | Self-contained single-file bundle (CSS, JS samples & app code inline) for quick mobile/offline device testing — **generated, do not edit by hand** |
| [`scripts/build-mobile-bundle.py`](scripts/build-mobile-bundle.py) | Rebuilds `lauscher-mobile.html` from `index.html` and all source files (Python standard library only) |
| `daw-sampling/` | Raw DAW stem source material (`exports/*.wav`, MIDI templates, `process_samples.py`) — **not needed by the browser** |

---

## Run Locally & Test on Mobile

**Easiest on macOS:** double-click [`Start-Lauscher.command`](Start-Lauscher.command). It starts a small local web server and opens the app in your browser (close the Terminal window to stop it).

> Don't open `index.html` directly via double-click (`file://`): browsers such as Chrome block loading the app font (Andika) from local files.

Because all studio samples ship as JS bundles, any static HTTP server works out of the box (no Node.js/npm build step required):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

- **Single-file bundle for mobile testing:** [`lauscher-mobile.html`](lauscher-mobile.html) inlines all CSS, sample bundles, and app scripts into a single HTML file and loads `Tone.js` locally from [`tone.js`](tone.js) (keep `tone.js` next to `lauscher-mobile.html`). *(On iOS, open the HTML file via **Safari** over an HTTPS/local web server URL or a WebView wrapper rather than iOS QuickLook.)*
- **Rebuild the bundle after every change** to `index.html`, `styles.css`, any `.js` file, or the fonts (fonts referenced in `styles.css` are embedded as Base64):

```bash
python3 scripts/build-mobile-bundle.py
```

  Use `python3 scripts/build-mobile-bundle.py --check` to verify the bundle is up to date (exit code `1` if it is outdated).

---

## GitHub & GitHub Pages Notes

For deploying via **GitHub Pages**, the large raw audio source files in `daw-sampling/` (~199 MB) are **not** required. The repository's `.gitignore` already excludes them:

```gitignore
daw-sampling/
.DS_Store
```

Then enable **Settings → Pages → Deploy from a branch (`main` / `root`)** in your GitHub repository to launch the app directly over HTTPS on desktop, Android, and iOS.

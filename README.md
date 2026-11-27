# Lauscher • Ear Training, Music Theory & Studio Listening

**Lauscher** (*Listen a little closer.*) is an ad-free, tracker-free web app for ear training, music theory, sight-reading, singing and studio listening. It runs entirely in the browser: no backend, no login, no analytics, no network requests. It also installs as an offline-capable PWA and ships as an Android app (Capacitor).

Web app: **https://jbkstr.github.io/lauscher/**

---

## Table of Contents

- [Features Overview](#features-overview)
- [Tools](#tools)
- [Knowledge Hub](#knowledge-hub)
- [Audio Engine & Samples](#audio-engine--samples)
- [Languages, Themes & Account](#languages-themes--account)
- [Project Structure](#project-structure)
- [Run Locally & Test](#run-locally--test)
- [Deployment & Android App](#deployment--android-app)

---

## Features Overview

### 9 training categories

Every category has graded levels, listening aids (A/B comparison, root/bass reveal, tonic context), a **Listen-Only Mode** and tempo control:

1. **Intervals** – melodic (ascending/descending) and harmonic intervals, root-pad drone training, plus **Sing Intervals** (sing the answer into the microphone) and **Play Intervals** (on a MIDI keyboard or the on-screen keyboard).
2. **Chords** – chord quality and inversions from triads to seventh chords and extensions, plus **Play Chords** with bass-note checking for inversions.
3. **Cadences** – harmonic functions and progressions in major and minor (secondary dominants, tritone substitution, Neapolitan), selectable meter and target bar.
4. **Solfège** – all 7 scale degrees (`Do–Ti` / `1–7`) in a harmonic context on an interactive keyboard, plus **Sing Degrees**.
5. **Scales & Modes** – church modes, harmonic/melodic minor and pentatonics, characteristic colour tones, modal vamps, plus **Play Scales & Modes**.
6. **Melodies** – from short tetrachords to full dictation of pitch and rhythm, shown on a real staff.
7. **Rhythm** – meters, rhythm dictation, tap-back and tap-from-notation (latency-compensated), groove, accents and micro-timing.
8. **Notation & Sight-Reading** – treble, bass and alto clef, ledger lines, key signatures, chord reading, grand staff and notation symbols.
9. **Production** – sine frequency recognition and pink-noise EQ boosts with loudness matching and A/B bypass.

**Category exams** for all 9 categories: 10/20/50 questions, instant or blind feedback, partial credit, audio review afterwards and a local exam history.

**MIDI input** (USB & Bluetooth LE): play sight-reading, solfège, melodies, rhythm taps, exams and the MIDI play exercises on a digital piano (Web MIDI in Chrome/Edge/Firefox, native plugin in the Android app). Lauscher can switch off the keyboard's own sound (Local Control) while it plays its own sounds.

**Invisible session memory:** items you got wrong come back within the next few exercises until you answer them right – only in memory, nothing is stored or shown.

---

## Tools

The **Tools** tab holds standalone utilities:

- **Metronome** – tap tempo, `30–240 BPM`, accents, subdivisions incl. shuffle, meter chips and savable profiles.
- **Chromatic Tuner** – live pitch detection via microphone, needle and strobe display, spectrum, reference tones, adjustable concert pitch and presets for many string instruments and voice. Needs HTTPS or `localhost`.
- **Free Play (Sound Lab)** – play all instruments freely, with a live chord/inversion analyser for MIDI input.
- **Guitar Fretboard**, **Circle of Fifths**, **Nashville Number System** and **Capo Transposer**.

There is also a guided **vocal warmup** with range presets and accompaniment.

---

## Knowledge Hub

The **Knowledge** tab contains interactive theory modules with audio examples (intervals, cadences, sound physics, solfège, rhythm, modes, keys, circle of fifths, notation and more), in-depth articles, instrument guides and a notation reference – in all 10 languages.

---

## Audio Engine & Samples

- **[`audio.js`](audio.js)** is a native WebAudio engine (no external libraries): sampled instruments (`EarLabSampledInstrument`) with a synth fallback, master compressor and soft clipper, generated convolution reverb, a global voice budget and click-free release.
- **Instruments:** piano, guitar, strings, brass, voice, bass and percussion. Piano and guitar have velocity layers.
  - Piano: *Accurate-Salamander Grand Piano* (CC BY 3.0), guitar: *Meta Open Sound – Steel Guitar* (CC0). Full credits are in the in-app licenses ([`licenses.html`](licenses.html)).
- **The audio samples are not part of this public repository.** They live in a private samples repo and are fetched with `scripts/samples.sh pull`.
- The mixer sets levels and reverb per instrument; saved mixes can be launched from the home screen.

---

## Languages, Themes & Account

- **10 languages:** Deutsch, English, Español, Français, Italiano, Polski, Türkçe, Українська, اردو and العربية, with full RTL layout for Urdu and Arabic, plus German (`H / B / Cis`) or international (`B / Bb / C#`) note names.
- **Themes:** 6 built-in themes (*Waldlichtung*, *Morgentau*, *Abenddämmerung*, *Konzertsaal*, *Metal*, *Mitternacht*) with light/dark/system modes, plus 3 custom theme slots.
- **Account:** musician profile, training focus, break reminder, milestones and musician titles.
- **100 % local:** everything stays in `localStorage`. Back up, restore or reset your whole profile (practice progress, exam history, milestones, mixes, themes) as `lauscher-profil-YYYY-MM-DD.json`.

---

## Project Structure

All JavaScript files are classic scripts that `index.html` loads in a fixed order and that share one global scope – no framework, no npm, no build step, no external libraries.

| File / Folder | Purpose |
| :--- | :--- |
| [`index.html`](index.html) | Markup for all views, modals and navigation, plus a small inline script that applies theme and language before the first paint |
| [`styles.css`](styles.css) | All styling; themes via CSS variables and `data-theme` / `data-appearance` / `data-lang` |
| [`app.js`](app.js) | Entry point: initialisation on `DOMContentLoaded` |
| [`js/`](js/) | App modules – e.g. `catalogs.js` (catalogs & profile storage), `state.js`, `generators.js`, `exercises.js`, `playback.js`, `exam.js`, `tuner.js`, `midi.js`, `freeplay.js`, `fretboard.js` |
| [`audio.js`](audio.js) | WebAudio engine |
| [`i18n.js`](i18n.js) + [`i18n/`](i18n/) | Translation runtime; translations are co-located (all 10 languages per key) in `i18n/*.js` |
| [`knowledge.js`](knowledge.js), `knowledge-xx.js` | Knowledge hub content (German source, other languages lazy-loaded) |
| [`legal.js`](legal.js) | Privacy policy, terms and open-source licenses (also used by `privacy.html`, `terms.html`, `licenses.html`) |
| [`version.js`](version.js) | Single source of the version name and build number |
| [`sw.js`](sw.js), [`manifest.webmanifest`](manifest.webmanifest) | PWA: offline cache and install manifest (`sw.js` is generated by `scripts/build-sw.py`) |
| [`fonts/Andika/`](fonts/Andika/) | App font **Andika** by SIL International (SIL Open Font License) |
| `samples/` | Instrument bundles (`*-bundle.js`, Base64, from the private samples repo) and the mascot graphics |
| [`scripts/`](scripts/) | Project check, logic tests, mobile bundle, service worker, Android sync, version bump and sample tooling |

---

## Run Locally & Test

**On macOS:** double-click [`Start-Lauscher.command`](Start-Lauscher.command). Or start any static web server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Don't open `index.html` via `file://` – browsers block the font files there.

In a fresh checkout, fetch the samples first (needs access to the private samples repo):

```bash
scripts/samples.sh pull
```

**Project check & logic tests** (file references, JS syntax, undefined names, dead DOM IDs, translation parity, PWA files, logic tests):

```bash
python3 scripts/check-project.py
```

**Single-file bundle:** `scripts/build-mobile-bundle.py` builds `lauscher-mobile.html`, a self-contained file with all CSS, JS, fonts and samples inline (not committed, because it contains the samples). `--check` tells you whether it is up to date.

---

## Deployment & Android App

- **GitHub Pages:** every push to `main` runs [`.github/workflows/pages.yml`](.github/workflows/pages.yml). It runs the project check, fetches the samples with a read-only deploy key and publishes the app. Nothing goes live if the check fails.
- **Android:** the Capacitor project lives outside this repo. [`scripts/sync-android.sh`](scripts/sync-android.sh) copies the web files, installs the native plugins (microphone, MIDI, file system, share) and syncs the project.
- **Versions:** bumped only with `python3 scripts/bump-version.py`; see [`CHANGELOG.md`](CHANGELOG.md).

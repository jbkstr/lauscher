# Changelog

All released versions of Lauscher. New sections are created by `python3 scripts/bump-version.py`.

## Unreleased

**Improved**
- The sing-along tip no longer opens while an exercise tutorial is showing; it appears on a later exercise instead
- The break reminder waits until an open tutorial, settings, mixer or about window is closed instead of popping up over it
- Android back button and Escape now close an open exercise tutorial first (instead of leaving the exercise)
- Space bar no longer starts rhythm playback behind an open tutorial
- The exercise header (tempo, key, sing-along chip) can no longer be tapped during a tutorial walkthrough
- Circle of Fifths: the scale is now shown under a "Scale" heading as a single row of notes instead of an inline list that could wrap
- Circle of Fifths: the pivot modulation path is shown as a chain of steps that only wraps between steps
- Knowledge articles: play buttons next to song examples no longer get squeezed into narrow multi-line pills; ratio labels (e.g. "9:8 · 16:9") no longer break apart
- Small phones: answer tile captions (e.g. "2er-Marsch", "Vermindert") are hyphenated instead of cut off with "…"
- Long instrument names (French, Polish, Ukrainian) in Free Play and the mixer, warm-up phase buttons and practice mix titles now wrap instead of being cut off
- Singing, breathing exercises: every breathing phase now has its own sound. Inhale: a rising two-note chime and a swelling, airy sound. Hold: a single singing-bowl strike and a calm, steady tone. Exhale: a falling two-note chime and a warm sound that gets softer and darker. Release: a short, soft wooden tone, then silence. Core pulses use a short "F!" air puff, and long exhales get soft drop-like ticks every few seconds. The cue tones are pitched higher than before, so they can also be heard on phone speakers.
- Singing, breathing exercises: a small legend below the breathing circle shows the phases of the current exercise (inhale, hold, exhale, release or pulse) and highlights the one that is playing. When the exercise is not running, tap a phase to hear its sound.

**Fixed**
- Urdu: the breathing phase "Release" was translated as "solve"; it now reads "let go / relax".

## 0.11.1-beta (Build 6) – 2026-11-25

**Improved**
- Cadences and solfège: when the bass is muted in the mixer (the default piano mix), the piano now plays the bass note with the left hand, so cadences no longer sound thin.
- Home quotes: 20 new quotes in all 10 languages (tuner, capo translator, fretboard, free play, milestones, tuning facts and more). Outdated quotes were corrected (language list, number of themes, circle of fifths location, Singing section, no more "Surprise" button) and some facts made more accurate.
- Knowledge section: fact check across articles, guides and instrument profiles in all 10 languages (first interval of "Eine kleine Nachtmusik", Pachelbel's Canon dated to around 1700, half-diminished iiø7 in Locrian, circle of fifths meeting point at F♯/G♭, levels 4 and 5 of the melody exam, 7 notation exam levels, spectrum header). German texts: bass clef reading trick, contrabassoon and saxophone ranges, trombone tuning, oboe as tuning reference and smaller wording fixes.

## 0.11.0-beta (Build 5) – 2026-11-25

**Improved**
- Piano: new, more natural piano sound from the Accurate-Salamander Grand Piano (CC BY 3.0), in stereo, from C1 to C7. Soft and loud notes now also sound different (separate piano and forte layers from C2 to C6).
- Licenses: attribution for the piano samples.

## 0.10.2-beta (Build 4) – 2026-11-25

**Changed**
- Guitar: back to the previous guitar samples. The license of the sample library used in 0.10.1-beta does not allow its sounds to be redistributed inside an app.

## 0.10.1-beta (Build 3) – 2026-11-25

**Improved**
- Completely new guitar sound: re-recorded from a royalty-free sample library, every semitone from E2 to C6 (previously every third semitone), longer natural sustain, even volume across all strings
- Guitar plays with three attack layers (soft, normal, strong): dynamics demos and accented beats now change the guitar's tone colour, not just its volume

## 0.10.0-beta (Build 2) – 2026-11-24

**New**
- 3 more languages: Italian, Turkish and Arabic (with right-to-left layout) – now 10 languages in total
- Interactive walkthrough tutorials for exercises; the first exercise starts automatically
- Local milestones that unlock bonus themes and profile titles (stored on your device only)
- New exercise: notation symbols & markings, with a new exam level and a knowledge reference
- New tools: Nashville Number System, Capo Translator and Circle of Fifths
- Singing (formerly Warm-up): intensive breathing, vocal sirens and a new preset order
- Solfège: Do–Fa and Sol–Do halves, full minor scale series, custom key and multiple octaves
- Intervals: scale halves, minor series, free key/mode training and expanded exams
- Exercises: sing-along, choice of root note, chord pendulum, interval review with root note
- Mindfulness timer with custom duration
- 33 rotating mascot poses plus a Metal-theme mascot set; themes renamed to Folk, Classical, Jazz and Metal
- Strings option in the profile instruments
- About window: terms of use, open-source licenses and Ko-fi support

**Improved**
- Fully native audio engine (no more Tone.js): fewer clicks, no clipping, smoother multi-track playback, natural legato with subtle humanization
- Tuner: raw microphone signal on Android, adaptive noise gate, pitch lock, instrument profiles, strobe mode, better low-note detection and Bluetooth mic detection
- Exercise categories split into exercise-type subpages; unified keyboards, mixer and volume dialog
- Metronome: live beat highlighting and subdivision pulse
- Fretboard: string vibration
- Knowledge hub reordered by topic

**Fixed**
- iPhone audio unlock, system appearance and rhythm answers
- Distortion with dense chords, Safari and Bluetooth audio
- Android back button no longer resets stored data
- Various layout fixes on small screens

## 0.9.0-beta (Build 1) – 2026-11-19

First public beta.

- Ear training: intervals, chords, cadences, solfège, melodies, rhythm, scales & modes, frequencies & EQ, note reading – each with several levels and an exam mode
- Tools: metronome, chromatic tuner, free play (sound lab) and guitar fretboard
- Vocal warm-up programs and a knowledge section with sound examples
- 7 languages: German, English, French, Spanish, Polish, Ukrainian, Urdu
- Profile backup (save locally or share), custom color themes, light/dark mode
- Fully local: no account, no ads, no tracking

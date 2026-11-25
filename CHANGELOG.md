# Changelog

All released versions of Lauscher. New sections are created by `python3 scripts/bump-version.py`.

## Unreleased

**Improved**
- Cadences and solfège: when the bass is muted in the mixer (the default piano mix), the piano now plays the bass note with the left hand, so cadences no longer sound thin.
- Rhythm tapping: taps are now measured against the sound you actually hear, so the delay of speakers and audio buffers no longer counts as "late". New setting "Rhythm: tap latency" with a short calibration for Bluetooth headphones (e.g. AirPods), whose delay iOS does not report.
- Small screens: exercises get an extra compact level for very short windows (e.g. iPhone SE in Safari with toolbars), so the grand staff and the stage are no longer cut off.
- iPhone/iPad: instruments that are muted in the mixer are only loaded when they are needed. This saves a lot of memory and keeps Safari from reloading the page on older devices.
- iPhone/iPad: Lauscher asks the browser to keep its local data permanently and shows a note in Safari that iOS deletes website data after 7 days without use. Adding Lauscher to the Home Screen now opens it as a full-screen app with its own icon.
- Tuner on iPhone: playing other sounds while the tuner listens no longer interrupts the microphone, the reference tone no longer opens a new audio engine on every tap, and the tuner no longer gets stuck on "Starting microphone …" after a phone call or Siri.
- iPhone/iPad: metronome, warm-up, tuner and other sound sessions stop cleanly when Lauscher goes to the background, instead of staying "on" but silent. After an interruption (Siri, alarm, call), the next tap brings the sound back.
- Profile backup on iPhone/iPad: in the Home Screen app, "Save to device" opens the share sheet ("Save to Files") instead of a download that does not work there. In the browser, the message now says "Download started" instead of claiming the file was saved, and the download no longer fails when Safari asks for confirmation.
- Touch screens: buttons no longer stay highlighted after tapping, long presses no longer open the iOS context menu, and text fields move into view above the on-screen keyboard.

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

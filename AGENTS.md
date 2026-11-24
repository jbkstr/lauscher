# AGENTS.md – Lauscher (Projekt Lauschebär)

Zentrale Einstiegsseite für alle KI-Assistenten (Claude, Gemini, Codex usw.).
Die vollständigen Konventionen, Layout-Regeln, i18n-Details und Release-Abläufe stehen in [CLAUDE.md](CLAUDE.md) – vor größeren Änderungen dort nachsehen.

## Arbeitsregeln (Kurzfassung)
- Mit dem Nutzer wird **Deutsch** gesprochen.
- **Dateinamen im Repository sind immer auf Englisch.**
- **Kein npm, kein Bundler, keine ES-Module, keine CDNs/Netzwerkaufrufe.** Alle Skripte laufen als klassische globale `<script>`-Tags in [index.html](index.html).
- Nach Änderungen an Web-Dateien (`index.html`, `styles.css`, JS, Fonts, Samples) immer ausführen:
  1. `python3 scripts/build-mobile-bundle.py`
  2. `python3 scripts/check-project.py`
  3. `./scripts/sync-android.sh --no-open`
- Neue JS-/CSS-Dateien nur in [index.html](index.html) einbinden – sowohl `scripts/build-mobile-bundle.py` als auch `scripts/sync-android.sh` und `scripts/check-project.py` lesen sie dort automatisch aus.

## Modul- & Dateikarte
Große Dateien nie komplett einlesen, sondern gezielt per `grep -n` suchen.

| Datei | Inhalt |
|---|---|
| [index.html](index.html) | Gesamtes Markup, Inline-Pre-Render-Skript im `<head>`, verbindliche `<script>`-Ladereihenfolge |
| [styles.css](styles.css) | Alle Themes (`data-theme` / `data-appearance`), RTL (`dir="rtl"`), Exercise-Layout (`.fit-1`…`.fit-3`, `@container exstage`) |
| [audio.js](audio.js) | `AudioEngine`, `EarLabSampledInstrument`, Limiter, Reverb, iOS-Audio-Unlock |
| [js/catalogs.js](js/catalogs.js) | Themes, Custom-Theme-Persistenz, Profil-Defaults & Musik-Kataloge |
| [js/state.js](js/state.js) | `AppState`, `state`, `audioEngine`, Einstellungs-/Theme-/Sprach-Sync |
| [js/notation.js](js/notation.js) | Notensystem- & Rhythmus-SVG-Renderer, Melodie-/Kadenz-/Akkord-/Groove-Builder |
| [js/navigation.js](js/navigation.js) | Routing, History, Capacitor-Bridge, Über/Rechtliches, Wissens-Hub, Kategorienseiten |
| [js/generators.js](js/generators.js) | Sitzungs-Gedächtnis (Anti-Repeat) & alle Übungs-Generatoren (`generateExercise`) |
| [js/exercises.js](js/exercises.js) | Übungs-UI, Klaviaturen, Melodie-/Notations-Bühne, Mitsingen, `renderUI`, `fitExerciseLayout` |
| [js/playback.js](js/playback.js) | `handleAnswer`, Rhythmus-Tap-Pad, EQ-Vergleich, Nur-Hören & `playSequence` |
| [js/profile.js](js/profile.js) | Mixer-Sync, Home-Schnellmix, Timer, Konto, Farb-Editor, Toasts, Backup & Reset |
| [app.js](app.js) | Einstiegspunkt: Markenname-Styling (`startBrandWordStyling`) & `DOMContentLoaded`-Init |
| [js/warmup.js](js/warmup.js) | Einsing-Helfer (`#viewWarmup`) |
| [js/metronome.js](js/metronome.js) | Praxis-Metronom (`#viewMetronome`) |
| [js/tuner.js](js/tuner.js) | Chromatischer Tuner (`#viewTuner`) |
| [js/freeplay.js](js/freeplay.js) | Klang-Labor / Freies Spiel (`#viewFreeplay`) |
| [js/fretboard.js](js/fretboard.js) | Gitarren-Griffbrett (`#viewFretboard`) |
| [js/onboarding.js](js/onboarding.js) | Willkommens-Wizard & Startup-Splash (`#welcomeOnboarding`, `#startupSplash`) |
| [js/exam.js](js/exam.js) | Kategorie-Prüfungsmodus, Auswertung, Audio-Review & Verlauf |
| [i18n.js](i18n.js) + `i18n/*.js` | Runtime-Engine + ko-lokalisierte Übersetzungen (`static.js`, `quotes.js`, `tables.js`, `phrases-{core,exercises,tools}.js`, `notation-terms.js`, `achievements.js`) für alle 10 Sprachen |
| `knowledge.js`, `knowledge-{ar,en,es,fr,it,pl,tr,uk,ur}.js` | Wissensartikel, interaktive Theorie-Tools & Kategorie-Hilfen (10 Sprachen) |
| [legal.js](legal.js) | Datenschutzerklärung, Nutzungsbedingungen & Open-Source-Lizenzen (auch für `privacy.html`, `terms.html`, `licenses.html`) |
| [version.js](version.js) | Einzige Quelle für Version & Build-Nummer (`scripts/bump-version.py`) |
| [scripts/check-project.py](scripts/check-project.py) | Prüft Dateien, JS-Syntax, globale Scope-Kollisionen, i18n/Knowledge-Parität & Bundle-Stand |
| [scripts/build-mobile-bundle.py](scripts/build-mobile-bundle.py) | Erzeugt die Einzeldatei [lauscher-mobile.html](lauscher-mobile.html) (nie direkt bearbeiten) |
| [scripts/sync-android.sh](scripts/sync-android.sh) | Prüft, baut Bundle, klont Webdateien dynamisch nach `~/Documents/lauscher-android/www/` & führt `cap sync android` aus |

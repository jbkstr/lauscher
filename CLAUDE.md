# Lauscher (Projekt Lauschebär)

Web-App für Gehörbildung und Musiktheorie mit dem Waschbär-Maskottchen „Lauschebär“. Läuft komplett im Browser, ohne Backend, Login oder Tracker. Mit dem Nutzer wird **Deutsch** gesprochen.

## Tech-Stack & Architektur

- **Vanilla JS, kein Framework, kein npm, kein Build-Schritt, keine externen JS-Bibliotheken.** Alle Dateien sind klassische globale Skripte, die [index.html](index.html) per `<script>` in fester Reihenfolge lädt: `samples/*-bundle.js` → `audio.js` → `i18n.js` → `i18n/*.js` → `knowledge*.js` → `version.js` → `legal.js` → `js/catalogs.js` → `js/achievements.js` → `js/tuner-dsp.js` → `js/state.js` … `js/profile.js` → `app.js` → `js/warmup.js` … `js/capo.js` → `js/onboarding.js` → `js/exam.js`. Es gibt keine ES-Module und kein `import`/`export`, und alles teilt sich einen globalen Scope. Externe CDNs oder Netzwerkaufrufe gibt es nicht, und das soll so bleiben.
- **Datei- & Modul-Karte (App-Logik):** Große Dateien gezielt per `grep -n` oder direkt im passenden Modul öffnen. Zeilenzahlen sind Richtwerte (Stand 2026-11-24).
  - [js/catalogs.js](js/catalogs.js) (~2.700 Z.): Themes, Custom-Theme-Persistenz, Visual-Prefs, Profil-Defaults & Musik-Kataloge (Stufen, Intervalle, Akkorde, Modi, Rhythmus, Produktion, Metronom)
  - [js/achievements.js](js/achievements.js) (~950 Z.): Lokale Meilensteine, Musiker-Titel & Bonus-Themes (gespeichert in `state.profile.achievements`, Texte in [i18n/achievements.js](i18n/achievements.js)). Enthält den Entwickler-Schalter `DEV_ACHIEVEMENTS_TAP_UNLOCK_ENABLED` (7× Tippen aufs Versions-Badge), der vor einem Release auf `false` muss.
  - [js/tuner-dsp.js](js/tuner-dsp.js) (~940 Z.): Reine Tuner-Signalverarbeitung ohne DOM (Instrumenten-Profile, Tiefton-Dezimierung, Onset-Erkennung, Pitch-Lock)
  - [js/state.js](js/state.js) (~1.340 Z.): `AppState`, `state`, `audioEngine`, Theme-/Sprach-/Settings-/AutoNext-/Piano-/Drone-Sync
  - [js/notation.js](js/notation.js) (~1.870 Z.): Notensystem- & Rhythmus-SVG-Renderer, Melodie-/Kadenz-/Akkord-/Groove-Event-Builder, Tap-Auswertung
  - [js/notation-terms.js](js/notation-terms.js) (~1.300 Z.): Notationsbegriffe, Symbole & SVGs für die Übung `notation-symbols` und das Nachschlagewerk im Wissens-Hub (Texte in [i18n/notation-terms.js](i18n/notation-terms.js))
  - [js/navigation.js](js/navigation.js) (~5.170 Z.): Routing, History & Capacitor-Bridge, Tab-Swipe, Über-/Rechts-Fenster, Wissens-Hub (Wellen-/Spektrum-Tools), Quintenzirkel (`#viewCircle`), Kategorie- & Hilfe-Seiten
  - [js/generators.js](js/generators.js) (~2.550 Z.): Sitzungs-Gedächtnis (Anti-Repeat) & alle Übungs-Generatoren (`generateExercise` für alle Kategorien)
  - [js/exercises.js](js/exercises.js) (~4.300 Z.): Übungs-UI, Klaviaturen (Notation/Solfège), Melodie-Notensystem, Modi-Popovers, Mitsingen/Summ-Pause, `renderUI`, Antwort-Kacheln, `fitExerciseLayout`, Bühne/Maskottchen, Inline-Notationskopf
  - [js/playback.js](js/playback.js) (~2.730 Z.): Antwort-Auswertung (`handleAnswer`), Rhythmus-Tap-Pad, EQ-Vergleich, Modi-Wiedergabe, Nur-Hören-Modus, `playSequence`, Play-Button-UI
  - [js/tutorial.js](js/tutorial.js) (~1.120 Z.): Interaktive Vormach-Tutorials pro Übungsmechanik (`#exerciseTutorialBackdrop`, `openExerciseTutorialIntro`)
  - [js/profile.js](js/profile.js) (~2.470 Z.): Mixer-Sync, Home-Schnellmix & Begrüßung, Sitzungs-Timer & Pausen-Erinnerung, Übe-Mixe, eigene Dropdowns, Mein Konto, Farb-Editor, Toasts, Profil-Backup & App-Reset
  - [app.js](app.js) (~1.620 Z.): Einstiegspunkt – Markenname-Styling (`startBrandWordStyling`) & `DOMContentLoaded`-Initialisierung
  - [js/warmup.js](js/warmup.js) (~1.810 Z.): Singen / Einsing-Helfer (`#viewWarmup`)
  - [js/metronome.js](js/metronome.js) (~940 Z.): Praxis-Metronom (`#viewMetronome`, `initMetronomeEventListeners`)
  - [js/tuner.js](js/tuner.js) (~2.480 Z.): Chromatischer Tuner, UI & Mikrofon (`#viewTuner`), nutzt `js/tuner-dsp.js`
  - [js/freeplay.js](js/freeplay.js) (~1.130 Z.): Klang-Labor / Freies Spiel (`#viewFreeplay`)
  - [js/fretboard.js](js/fretboard.js) (~1.810 Z.): Gitarren-Griffbrett (`#viewFretboard`)
  - [js/nashville.js](js/nashville.js) (~590 Z.): Nashville Number System (`#viewNashville`) und gemeinsame Tonarten-/Akkord-Helfer
  - [js/capo.js](js/capo.js) (~270 Z.): Kapodaster-Übersetzer (`#viewCapo`), nutzt die Helfer aus `js/nashville.js`
  - [js/onboarding.js](js/onboarding.js) (~560 Z.): Willkommens-Wizard & Startup-Splash (`#welcomeOnboarding`, `#startupSplash`)
  - [js/exam.js](js/exam.js) (~2.640 Z.): Kategorie-Prüfungsmodus, Auswertung, Audio-Review & Verlauf
- **[audio.js](audio.js)**: Reine native WebAudio-Engine (ohne Tone.js) – `AudioEngine`, `EarLabSampledInstrument`, `EarLabNativeSynth`, automatisches Multi-Stem-Headroom-Scaling (`stemMixCompGain`), Master-Compressor + transparenter `WaveShaperNode`-Soft-Clipper (`±0,94` Decke gegen digitales Clipping), synchron generierter Faltungshall (1,15 s mobil / 1,65 s Desktop, ohne `OfflineAudioContext`/Freeverb), globales Voice-Budget (22 mobil / 36 Desktop), Sample-Ende-Schutz, Zero-Copy-Trim-Offsets, knacksfreies Ausblenden per `setTargetAtTime` und Playback-bewusstes, schonendes Sample-Decoding. Samples kommen aus `window.EARLAB_SAMPLE_PACKS`; fehlt ein Sample, springt `EarLabNativeSynth` ein. `playStep()` triggert nur Stems mit Mixer-Pegel > 0.
- **Audio auf iPhone (Safari/WKWebView):** Ton darf nur direkt im Tipp gestartet werden. Klick-Handler, die sofort einen Klang auslösen, rufen `prepareAudioNonBlocking()` auf (synchroner Unlock + `buildAudioGraphSync`) statt vorher `await ensureAudioReady()` – ein `await` vor dem Abspielen verliert auf iOS die Nutzer-Geste. Die Unlock-Listener im Init bleiben aktiv, bis `audioEngine.isAudioUnlocked()` wahr ist, und werden nach Rückkehr aus dem Hintergrund neu scharf gestellt (`markAudioSessionInterrupted`).
- **[styles.css](styles.css)**: Alle Themes laufen über CSS-Variablen und `data-theme` / `data-appearance` / `data-lang` auf `<html>`. RTL (Urdu) läuft über `dir="rtl"`.
- **Schrift: Andika** (SIL Open Font License, [fonts/Andika/](fonts/Andika/)). Eingebunden per `@font-face` ganz oben in styles.css. Andika hat nur Regular und Bold: Stärke 100–549 nutzt Regular, 550–1000 Bold. Für Urdu bleibt die arabische Schrift-Kette (Andika hat keine arabischen Zeichen). Keine eigenen `font-family`-Werte (auch kein Monospace) setzen. Ausnahmen sind SVG-`<text>` mit `font-family`-Attribut und Canvas (`ctx.font`): Dort muss „Andika“ explizit genannt werden. index.html lädt die Fonts per `<link rel="preload">` vor; das Build-Skript entfernt diese Links im Bundle.
- **Markenname „Lauscher“ wird immer fett und kursiv dargestellt.** Ein `MutationObserver` in app.js (`startBrandWordStyling`) umschließt jedes sichtbare „Lauscher“ automatisch mit `<span class="brand-word">`. In Texten und Übersetzungen deshalb **nie** von Hand formatieren. Wer Text-Knoten direkt manipuliert, muss `.brand-word`-Spans berücksichtigen (siehe `setElementLocalizedText` in i18n.js).
- **Navigation:** untere Leiste `#bottomNav` mit 4 Reitern: Übungen (`home`) | Werkzeuge (`tools`, `#viewTools` mit Metronom `#viewMetronome`, chromatischem Tuner `#viewTuner`, Freiem Spiel/Klang-Labor `#viewFreeplay` und Gitarren-Griffbrett `#viewFretboard`, Quintenzirkel `#viewCircle`, Nashville Number System `#viewNashville` und Kapodaster-Übersetzer `#viewCapo`) | Wissen (`knowledge`, erster Reiter heißt „Theorie“) | Konto (`space`).
- **Startseite:** „Weiterüben“ ist ein schwebender Knopf (`#quickStartBtn.home-continue-fab`). Ist im Profil ein Name gesetzt, sprechen Startseiten-Zitate und Übungs-Bühne den Nutzer persönlich an (`getProfileUserName`, `getPersonalized…StageSubtext`).
- **Nur Hochformat:** Auf Handys im Querformat legt sich `#portraitLockOverlay` per Media-Query über die App; in der Android-App setzt das Sync-Skript zusätzlich `android:screenOrientation="portrait"`.
- **Dropdowns:** Auswahlfelder nutzen eigene Dropdowns statt `<select>`: `renderProfileSingleDropdown({containerEl, key, options, selectedKey, onSelect})` für Einfachauswahl (z. B. Sprache in den Einstellungen, Übe-Mix-Erstellung), Mehrfachauswahl im gleichen Stil (`multi-dropdown-*`). Das offene Dropdown steht in `_openProfileDropdownKey`; Außenklick und Android-„Zurück“ schließen es automatisch.
- **Rechtstexte:** Datenschutzerklärung (`privacy`), Nutzungsbedingungen (`terms`) und Open-Source-Lizenzen (`licenses`) stehen nur in [legal.js](legal.js) (`LAUSCHER_LEGAL_DOCS`, DE maßgeblich + EN; andere Sprachen zeigen EN). Die App zeigt sie im Über-Fenster (`openAboutLegal`, Ansicht `#aboutLegalPane`), die öffentlichen Seiten [privacy.html](privacy.html), [terms.html](terms.html) und [licenses.html](licenses.html) laden dieselbe Datei. Solange `LAUSCHER_LEGAL_DRAFT = true`, erscheint bei Datenschutz & Nutzungsbedingungen ein Entwurfs-Hinweis. Bei neuen Funktionen, Datenverarbeitungen oder Bibliotheken/Fonts die Texte nachpflegen.
- **Toasts:** kurze Bestätigungen über `showAppToast(msg, "success"|"error")` (`#appToast`).
- **Inline-Skript im `<head>` von index.html** setzt Theme, Sprache und `data-first-run` vor dem ersten Rendern. Kommen Themes oder Sprachen dazu, muss es mit angepasst werden.

## Layout-Regel: Übungen haben eine feste Höhe

- **Die Übungsansicht (`#viewExercise`) scrollt nie**, vor allem nicht mobil. Untere Leiste (Abspielen usw.) und Antwortmöglichkeiten müssen immer sichtbar und nutzbar sein.
- Aufbau: oberes Modul (`#exerciseModuleCard`) und Antwortbereich (`.bottom-dock`) behalten ihre Höhe; die **mittlere Bühne** (`.stage-wrapper`) nimmt nur den Restplatz und verdichtet sich per Container-Query (`@container exstage`) bis zur Querform bzw. reinen Textzeile.
- Reicht das nicht, setzt `fitExerciseLayout()` in app.js stufenweise `.fit-1` … `.fit-3` auf `#viewExercise` (Regeln am Ende von styles.css). Ein `ResizeObserver` misst neu, wenn z. B. die Vergleichskarte erscheint; innerhalb einer Aufgabe wird nur weiter verdichtet, nie zurück. Die Mitsing-Einführung schwebt bei Platzmangel über der Bühne (`.sing-hint-float`).
- Die Regel gilt nur für `#viewExercise`. Andere Ansichten (z. B. `#viewMetronome`) nutzen `.view-container` und dürfen scrollen – ihnen deshalb nicht die Klasse `.view-exercise-container` geben.
- Neue Elemente in Übungen müssen in dieses System passen: bei neuen Blöcken im oberen Modul oder Antwortbereich auch `.fit-*`-Varianten ergänzen. Prüfen auf 375×667 und 360×640 mit allen Übungsarten und höchster Stufe (Messung: `view.scrollHeight <= view.clientHeight` und Bühne ≥ `EXERCISE_MIN_STAGE_PX`). Achtung: Ein offenes Übungs-Tutorial (`#exerciseTutorialBackdrop`, `inset: -4px`) erhöht `scrollHeight` um 4 px. Vor dem Messen also das Tutorial schließen.

## Mehrsprachigkeit (de, en, fr, es, it, pl, tr, uk, ur, ar)

- Deutsch ist die Standard- und Quellsprache. Die Runtime-Engine liegt in [i18n.js](i18n.js); alle Übersetzungen liegen **ko-lokalisiert** (alle Sprachen pro Schlüssel direkt untereinander) in `i18n/`:
  - [i18n/static.js](i18n/static.js): alle statischen UI-Texte (`data-i18n="key"` in `index.html`) für alle 10 Sprachen (`de`, `en`, `fr`, `es`, `it`, `pl`, `tr`, `uk`, `ur`, `ar`) via `registerColocatedStatic(...)`.
  - [i18n/quotes.js](i18n/quotes.js): alle Startseiten-Zitate (`LAUSCHEBAER_QUOTES`) für alle 10 Sprachen via `registerColocatedQuotes(...)`.
  - [i18n/notation-terms.js](i18n/notation-terms.js) und [i18n/achievements.js](i18n/achievements.js): Texte für Notationssymbole bzw. Meilensteine, Titel & Bonus-Themes (alle 10 Sprachen).
  - [i18n/tables.js](i18n/tables.js): alle 23 Musik- und App-Tabellen (Intervalle, Akkorde, Modi, Rhythmus, Produktion, Profil usw.) via `registerColocatedTables(...)`.
  - [i18n/phrases-core.js](i18n/phrases-core.js), [i18n/phrases-exercises.js](i18n/phrases-exercises.js), [i18n/phrases-tools.js](i18n/phrases-tools.js): dynamische `tr("Deutsch", "English")`- und `tf(de, en, vars)`-Übersetzungen für `fr`, `es`, `it`, `pl`, `tr`, `uk`, `ur`, `ar` nach deutschem Schlüssel via `registerColocatedPhrases(...)`.
    - ⚠️ Wird ein deutscher Text in einem `tr()`/`tf()`-Aufruf geändert, muss derselbe Schlüssel in der passenden `i18n/phrases-*.js`-Datei angepasst werden – `python3 scripts/check-project.py --strict` deckt fehlende Schlüssel sofort auf.
    - Neue Texte immer direkt für alle 10 Sprachen am selben Eintrag ergänzen. Achtung: `tr()`-Aufrufe mit Inline-Map (`{ fr: …, pl: … }`) brauchen ebenfalls alle 8 Zielsprachen (`fr`, `es`, `it`, `pl`, `tr`, `uk`, `ur`, `ar`).
- **Wissensbereich**: Deutsch steht in [knowledge.js](knowledge.js), die anderen Sprachen in `knowledge-xx.js` über `registerKnowledgeBundle(lang, bundle)`.
- Bei Layout-Änderungen auch RTL (`ur`, `ar`) und lange Texte (uk/pl/fr) beachten.

## Daten & Speicher

- Alles liegt lokal in `localStorage`. Schlüssel: `lauschebaer_visual_prefs_v1`, `lauschebaer_profile_v1`, `lauschebaer_custom_themes_v1`.
- Die Struktur gespeicherter Daten nicht ohne Migration ändern, da bestehende Profile weiter funktionieren müssen. Export und Import laufen über `lauscher-profil-JJJJ-MM-TT.json` (`exportUserProfileBackup` / `importUserProfileJSON`, nur Profil, kein Übungsfortschritt). Die Meilensteine (`state.profile.achievements`) liegen im Profil: Sie werden mitgesichert und beim Import ersetzt (danach gleicht `syncRetroactiveAchievements` nach).

## Samples

- `samples/<instrument>/*.m4a` sind die Rohdateien, `samples/*-bundle.js` dieselben Samples als Base64 (damit es keine CORS-Probleme bei `file://` gibt). Zur Laufzeit lädt die App **nur die Bundles**.
- **Audio-Samples sind nicht im öffentlichen Repo.** Sie liegen im privaten Repo `jbkstr/lauscher-samples` (lokal `~/Documents/GitHub/lauscher-samples`, änderbar per `LAUSCHER_SAMPLES_DIR`) und sind hier per `.gitignore` ausgeschlossen. Öffentlich bleiben nur die Maskottchen-Grafiken (`samples/mascot*-bundle.js`).
  - **In einem frischen Checkout/Worktree zuerst `scripts/samples.sh pull`**, sonst fehlen die Bundles (Projekt-Check meldet es; `sync-android.sh` holt sie automatisch).
  - Nach Änderungen an Samples: `scripts/samples.sh push ["Nachricht"]` (committet und pusht im privaten Repo). Sample-Dateien nie im öffentlichen Repo committen.
- Das Generator-Skript (`daw-sampling/process_samples.py`) ist **nicht im Repo**. Bundles also nicht von Hand bearbeiten.
- **Lizenz zuerst prüfen:** Neue Samples nur aus Quellen, deren Lizenz die Weitergabe einzelner Töne in einer App ausdrücklich erlaubt (z. B. CC0 oder eine schriftliche Erlaubnis). Kostenlose Sample-Libraries bzw. Plugins erlauben das meist **nicht**: Die Ample-Sound-EULA (Ample Guitar M Lite) verbietet es z. B. in Abschnitt 6, deshalb wurde Release 0.10.1-beta mit 0.10.2-beta zurückgenommen.
- **Aufnahme-Pipeline (aktuell ungenutzt, für eine lizenzrechtlich passende Library):** `scripts/make-guitar-sampling-midi.py` (MIDI-Aufnahmevorlage E2–C6 chromatisch, Layer mf/p/f) → Export als lange WAV nach `daw-sampling/guitar-recording/` → `scripts/slice-guitar-samples.py <wav>` (Einzeltöne nach `slices/`) → `scripts/build-guitar-samples.py <slices>` (Mono, Pegelangleich, 3,2 s, AAC 48 kbit/s → `samples/guitar/*.m4a`, `samples/guitar/p|f/*.m4a` und `samples/guitar-bundle.js`). Braucht macOS (`afconvert`).
- **Velocity-Layer:** Ein Pack kann `velocityLayers: { p: { maxDynamic, notes }, f: { minDynamic, notes } }` enthalten (derzeit nutzt kein Pack sie). Die Engine decodiert sie erst beim ersten Bedarf (`createVelocityLayerStore`) und wählt sie nur bei ausdrücklich übergebener Dynamik (`playStep(..., { velocity })` → `envOverride.dynamic`), nicht anhand der akkordbedingt abgesenkten Velocity. Ohne Angabe klingt immer der Hauptlayer `notes` (mf).

## Mobile-Bundle

- `lauscher-mobile.html` (~15,8 MB, **nur lokal, nicht im Repo**, weil es alle Samples enthält) ist eine **komplett eigenständige Einzeldatei** mit allen CSS-, JS-, Font- und Sample-Inhalten inline (keine externe `tone.js` mehr nötig).
- Die Datei wird von [scripts/build-mobile-bundle.py](scripts/build-mobile-bundle.py) aus `index.html` erzeugt: `styles.css` und alle `<script src>` werden inline eingesetzt. Lokale Dateien, die im CSS per `url(...)` eingebunden sind (die Fonts & Icons), werden als Base64 eingebettet. Diese Datei nie direkt bearbeiten und nicht lesen (zu groß).
- **Nach jeder Änderung an index.html, styles.css oder einer JS-Datei das Bundle neu bauen** (wird nicht committet; der Projekt-Check prüft den lokalen Stand, `sync-android.sh` baut es ohnehin neu):
  ```bash
  python3 scripts/build-mobile-bundle.py          # neu bauen
  python3 scripts/build-mobile-bundle.py --check  # prüfen, ob aktuell (Exit-Code 1 = veraltet)
  ```
- Kommt eine neue Skript- oder CSS-Datei hinzu, reicht es, sie in `index.html` einzubinden; das Skript übernimmt sie automatisch.

## Android-App (Capacitor)

- Die Android-App ist ein **separates Capacitor-Projekt außerhalb des Repos** (`~/Documents/lauscher-android`, App-ID `de.jbkstr.lauscher`). Es wird nicht hier gepflegt, sondern per [scripts/sync-android.sh](scripts/sync-android.sh) bzw. Doppelklick auf [Start-Android-Studio.command](Start-Android-Studio.command) befüllt: Syntax-Check, Bundle-Build, Kopie der Web-Dateien nach `www/`, `npx cap sync android`, Android Studio öffnen.
- **Nach jeder Änderung an Web-Dateien (index.html, CSS, JS, Fonts, Samples) den Android-Sync mitlaufen lassen** – auf Wunsch des Nutzers immer, ohne Nachfrage: `./scripts/sync-android.sh --no-open` (Android Studio öffnet der Nutzer selbst). Ändert nichts im Repo.
- **Dynamische Dateiliste:** Das Sync-Skript liest alle lokalen `<script src>`- und `<link rel="stylesheet">`-Dateien (inkl. `js/*.js` und `samples/*-bundle.js`) direkt aus [index.html](index.html) aus und kopiert zusätzlich Fonts (`fonts/Andika/`) und `icons/*.jpg`. Neue JS-/CSS-Dateien müssen daher nur in `index.html` eingebunden werden. Nur für völlig neue Asset-Ordner (z. B. Bilder außerhalb von `icons/`) muss das Sync-Skript ergänzt werden.
- Bilder für die Oberfläche (z. B. das App-Icon im Über-Fenster, `icons/app-icon.jpg`) per CSS `url(...)` einbinden – so bettet das Mobile-Bundle sie automatisch als Base64 ein.
- In app.js: `initCapacitorNativeBridge()` fängt die Android-Zurück-Taste ab (`handleNativeBackButton`: Onboarding → Modal → Popover → Prüfungs-Abbruch → zurück navigieren → App beenden) und stoppt Audio, wenn die App in den Hintergrund geht. **Neue Popovers** in `hasOpenTransientPopover()` eintragen, damit „Zurück“ sie schließt. Ohne Capacitor (Browser) ist die Brücke inaktiv.
- Profil-Sicherung: In der App funktionieren Browser-Downloads nicht. Auf Mobilgeräten (App oder Browser mit Web Share) öffnet „Profil sichern“ eine Auswahl `#spaceBackupExportChooser`: **Lokal speichern** (`saveProfileBackupLocally`, Android: `@capacitor/filesystem` nach `Dokumente/Lauscher/`, Rückfall `EXTERNAL`; Browser: Download) oder **Teilen** (`shareProfileBackup`, `@capacitor/share` bzw. Web Share). Am Desktop direkt Download. Rückmeldung über `setSpaceBackupStatus` plus Toast `showAppToast`. Das Sync-Skript installiert die Plugins `app`, `filesystem` und `share` bei Bedarf und trägt `WRITE_EXTERNAL_STORAGE` (`maxSdkVersion=29`) ins Manifest ein. Native Plugins immer über `getCapacitorNativePlugin(name)` holen.
- Mikrofon (Tuner): Das Sync-Skript trägt `RECORD_AUDIO` und `MODIFY_AUDIO_SETTINGS` ins `AndroidManifest.xml` ein und installiert das native Plugin [scripts/android/RawAudioTunerPlugin.java](scripts/android/RawAudioTunerPlugin.java) in `MainActivity.java` (Rohsignal über `AudioSource.UNPROCESSED` + kontinuierlicher 25 Hz–4,2 kHz Bandpass); im Browser/WebView nutzt [js/tuner.js](js/tuner.js) `getUserMedia` mit deaktivierter OS-Sprachverarbeitung (`echoCancellation`/`noiseSuppression`/`autoGainControl`/`voiceIsolation: false`) und demselben Bandpass.
- Safe-Areas: `viewport-fit=cover` in index.html, Abstände über `env(safe-area-inset-*)` bzw. `--safe-area-inset-*` (z. B. `.app-shell`). Neue randnahe Vollbild-Elemente ebenso absichern.

## Version, Build-Nummer & Releases

- **Einzige Quelle:** [version.js](version.js) (`LAUSCHER_VERSION = { name, build, date }`). `name` ist die sichtbare Version (SemVer, z. B. `0.9.0-beta`), `build` die fortlaufende Build-Nummer (= Android `versionCode`, darf nie sinken).
- **Hochzählen nur per Skript:** `python3 scripts/bump-version.py` (Build +1) bzw. `--name 0.9.1-beta` (neue Version + Build +1); legt oben in [CHANGELOG.md](CHANGELOG.md) einen Abschnitt aus den Commits seit dem letzten Tag an. **Der Changelog wird auf Englisch geführt.** Änderungen seit dem letzten Release sammeln sich oben unter `## Unreleased`; das Skript macht daraus beim Hochzählen den neuen Versionsabschnitt (ohne zusätzliche Commit-Liste). `--show` zeigt den Stand. Nur bei einem echten Release hochzählen, nicht bei jeder Änderung.
- Das Über-Fenster (`renderAboutVersionBadge`) und die Infozeile der Kontakt-Mail lesen `version.js`; `scripts/sync-android.sh` schreibt `versionName`/`versionCode` in `android/app/build.gradle`.
- **Vor jedem Release:** `DEV_ACHIEVEMENTS_TAP_UNLOCK_ENABLED` in [js/achievements.js](js/achievements.js) auf `false` und prüfen, ob `LAUSCHER_LEGAL_DRAFT` in [legal.js](legal.js) noch `true` sein soll.
- **APK-Release:** signiert in Android Studio (Build → Generate Signed App Bundle / APK → APK → release). Die Datei heißt automatisch `lauscher-<name>-build<build>-release.apk` (vom Sync-Skript in `build.gradle` eingetragen, Marker `LAUSCHER_APK_NAMING`). Dann Git-Tag `v<name>` und GitHub-Release mit der APK als Anhang. APKs nie ins Repo committen. Der Release-Keystore liegt außerhalb des Repos und darf nie verloren gehen (sonst keine Updates mehr möglich).

## Lokal starten & testen

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` öffnen. Für den Nutzer gibt es die Doppelklick-Startdatei [Start-Lauscher.command](Start-Lauscher.command), die das Gleiche tut. **`index.html` nicht direkt per `file://` öffnen:** Chrome blockiert dort die Schriftdateien. Automatische Tests gibt es nicht.
- **Projekt-Check nach Änderungen:** `python3 scripts/check-project.py` prüft Existenz aller in `index.html` geladenen Dateien, JS-Syntax (`node --check`) sowie globale `const`/`let`/`class`-Kollisionen über alle Skripte hinweg, i18n- und Knowledge-Parität über alle 10 Sprachen sowie den Stand von `lauscher-mobile.html` (`--no-bundle` überspringt den Bundle-Check; `--strict` wertet auch `tr()`/`tf()`- und Knowledge-Hinweise als Fehler).
- **Browser-Test in der Claude-Desktop-App:** `file://` und ein per `preview_start`/`launch.json` gestarteter Server funktionieren nicht (macOS-Zugriffsschutz auf `~/Documents`). Was funktioniert: Server per Bash im Hintergrund starten (`python3 -m http.server 8811 --bind 127.0.0.1` im Projektordner, `run_in_background`), dann `preview_start` mit `url: http://localhost:8811/` aufrufen. Danach Server wieder stoppen.
- Änderungen im Browser prüfen und dabei die Konsole auf Fehler achten. Wenn relevant, auch die Mobilbreite, ein dunkles Theme und eine weitere Sprache prüfen.

## Konventionen

- Code-Kommentare und Bezeichner im bestehenden Stil halten: Kommentare meist auf Deutsch, Bezeichner auf Englisch.
- `localStorage`-Zugriffe immer in `try/catch` (wie im bestehenden Code).
- Keine neuen Abhängigkeiten, CDNs, Analytics oder Netzwerkaufrufe einbauen. Datenschutz ist ein Kernversprechen der App.
- **Dateinamen im Repository sind immer auf Englisch** (auch für neue Dateien, Doku-Dateien, Skripte und Assets).
- Deployment über GitHub Pages per GitHub Action [.github/workflows/pages.yml](.github/workflows/pages.yml) bei jedem Push auf `main`: Sie holt die Samples per Deploy-Key (Secret `SAMPLES_DEPLOY_KEY`, nur Lesezugriff auf `jbkstr/lauscher-samples`) und veröffentlicht Repo + Samples. Status: `gh run list --workflow pages.yml`. Repo: `github.com/jbkstr/lauscher`, Web-App: `https://jbkstr.github.io/lauscher/`, Datenschutz: `…/lauscher/privacy.html`, Nutzungsbedingungen: `…/lauscher/terms.html`, Lizenzen: `…/lauscher/licenses.html`. Der lokale Ordner heißt noch `projekt-lauschebear`.
- **Ideen für später** stehen in [docs/ideas.md](docs/ideas.md). Wünscht der Nutzer etwas „für später“, dort eintragen. Vor Arbeiten an betroffenen Bereichen (z. B. Maskottchen, Visual-Update) dort nachsehen.
- Abgeschaltete, aber aufbewahrte Features laufen über Schalter-Konstanten (z. B. `MASCOT_LOOKS_ENABLED` in app.js) statt über gelöschten Code.

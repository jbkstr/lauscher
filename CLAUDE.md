# Lauscher (Projekt Lauschebär)

Web-App für Gehörbildung und Musiktheorie mit dem Waschbär-Maskottchen „Lauschebär“. Läuft komplett im Browser, ohne Backend, Login oder Tracker. Mit dem Nutzer wird **Deutsch** gesprochen.

## Tech-Stack & Architektur

- **Vanilla JS, kein Framework, kein npm, kein Build-Schritt.** Alle Dateien sind klassische globale Skripte, die [index.html](index.html) per `<script>` in fester Reihenfolge lädt: `tone.js` → `samples/*-bundle.js` → `audio.js` → `i18n*.js` → `knowledge*.js` → `app.js`. Es gibt keine ES-Module und kein `import`/`export`, und alles teilt sich einen globalen Scope.
- **Tone.js 14.8.49** liegt lokal in [tone.js](tone.js) (minifiziert, nicht bearbeiten). Externe CDNs oder Netzwerkaufrufe gibt es nicht, und das soll so bleiben.
- **[app.js](app.js)** (~28.500 Zeilen) enthält die gesamte App-Logik. Datei nie komplett lesen, sondern gezielt mit `grep -n` suchen und nur die betroffenen Bereiche lesen. Grobe Gliederung:
  - Konstanten/Kataloge am Anfang (Themes, Profil, Mixer, Prüfungslevels, Metronom, Notation)
  - Übungs-Generatoren, `openCategoryPage`, `renderUI`, `handleAnswer`, `playSequence`
  - `DOMContentLoaded`-Init etwa ab Zeile 18450
  - Einsing-Helfer (`// EINSING-HELFER`), Metronom (`// PRAXIS-METRONOM`), Tuner (`// CHROMATISCHER TUNER`), Freies Spiel (`// WERKZEUG: FREIES SPIEL`), Griffbrett (`// WERKZEUG: GITARREN-GRIFFBRETT`), Prüfungsmodus (`// KATEGORIE-PRÜFUNGSMODUS`)
- **[audio.js](audio.js)**: `AudioEngine`, `EarLabSampledInstrument`, Hall-Sends, Limiter, Pink-Noise-EQ, Percussion. Samples kommen aus `window.EARLAB_SAMPLE_PACKS`, das die Bundles befüllen. Fehlt ein Sample, springt ein Synth als Fallback ein.
- **[styles.css](styles.css)**: Alle Themes laufen über CSS-Variablen und `data-theme` / `data-appearance` / `data-lang` auf `<html>`. RTL (Urdu) läuft über `dir="rtl"`.
- **Schrift: Andika** (SIL Open Font License, [fonts/Andika/](fonts/Andika/)). Eingebunden per `@font-face` ganz oben in styles.css. Andika hat nur Regular und Bold: Stärke 100–549 nutzt Regular, 550–1000 Bold. Für Urdu bleibt die arabische Schrift-Kette (Andika hat keine arabischen Zeichen). Keine eigenen `font-family`-Werte (auch kein Monospace) setzen. Ausnahmen sind SVG-`<text>` mit `font-family`-Attribut und Canvas (`ctx.font`): Dort muss „Andika“ explizit genannt werden. index.html lädt die Fonts per `<link rel="preload">` vor; das Build-Skript entfernt diese Links im Bundle.
- **Markenname „Lauscher“ wird immer fett und kursiv dargestellt.** Ein `MutationObserver` in app.js (`startBrandWordStyling`) umschließt jedes sichtbare „Lauscher“ automatisch mit `<span class="brand-word">`. In Texten und Übersetzungen deshalb **nie** von Hand formatieren. Wer Text-Knoten direkt manipuliert, muss `.brand-word`-Spans berücksichtigen (siehe `setElementLocalizedText` in i18n.js).
- **Navigation:** untere Leiste `#bottomNav` mit 4 Reitern: Übungen (`home`) | Werkzeuge (`tools`, `#viewTools` mit Metronom `#viewMetronome`, chromatischem Tuner `#viewTuner`, Freiem Spiel/Klang-Labor `#viewFreeplay` und Gitarren-Griffbrett `#viewFretboard`) | Wissen (`knowledge`, erster Reiter heißt „Theorie“) | Konto (`space`).
- **Startseite:** „Weiterüben“ ist ein schwebender Knopf (`#quickStartBtn.home-continue-fab`). Ist im Profil ein Name gesetzt, sprechen Startseiten-Zitate und Übungs-Bühne den Nutzer persönlich an (`getProfileUserName`, `getPersonalized…StageSubtext`).
- **Nur Hochformat:** Auf Handys im Querformat legt sich `#portraitLockOverlay` per Media-Query über die App; in der Android-App setzt das Sync-Skript zusätzlich `android:screenOrientation="portrait"`.
- **Dropdowns:** Auswahlfelder nutzen eigene Dropdowns statt `<select>`: `renderProfileSingleDropdown({containerEl, key, options, selectedKey, onSelect})` für Einfachauswahl (z. B. Sprache in den Einstellungen, Übe-Mix-Erstellung), Mehrfachauswahl im gleichen Stil (`multi-dropdown-*`). Das offene Dropdown steht in `_openProfileDropdownKey`; Außenklick und Android-„Zurück“ schließen es automatisch.
- **Rechtstexte:** Die Datenschutzerklärung steht nur in [legal.js](legal.js) (`LAUSCHER_LEGAL_DOCS`, DE maßgeblich + EN; andere Sprachen zeigen EN). Die App zeigt sie im Über-Fenster (`openAboutLegal`, Ansicht `#aboutLegalPane`), die öffentliche Seite [datenschutz.html](datenschutz.html) (Link für Play Console / App Store Connect) lädt dieselbe Datei. Solange `LAUSCHER_LEGAL_DRAFT = true`, erscheint ein Entwurfs-Hinweis. Bei neuen Funktionen, die Daten verarbeiten oder externe Dienste nutzen, den Text anpassen.
- **Toasts:** kurze Bestätigungen über `showAppToast(msg, "success"|"error")` (`#appToast`).
- **Inline-Skript im `<head>` von index.html** setzt Theme, Sprache und `data-first-run` vor dem ersten Rendern. Kommen Themes oder Sprachen dazu, muss es mit angepasst werden.

## Layout-Regel: Übungen haben eine feste Höhe

- **Die Übungsansicht (`#viewExercise`) scrollt nie**, vor allem nicht mobil. Untere Leiste (Abspielen usw.) und Antwortmöglichkeiten müssen immer sichtbar und nutzbar sein.
- Aufbau: oberes Modul (`#exerciseModuleCard`) und Antwortbereich (`.bottom-dock`) behalten ihre Höhe; die **mittlere Bühne** (`.stage-wrapper`) nimmt nur den Restplatz und verdichtet sich per Container-Query (`@container exstage`) bis zur Querform bzw. reinen Textzeile.
- Reicht das nicht, setzt `fitExerciseLayout()` in app.js stufenweise `.fit-1` … `.fit-3` auf `#viewExercise` (Regeln am Ende von styles.css). Ein `ResizeObserver` misst neu, wenn z. B. die Vergleichskarte erscheint; innerhalb einer Aufgabe wird nur weiter verdichtet, nie zurück. Die Mitsing-Einführung schwebt bei Platzmangel über der Bühne (`.sing-hint-float`).
- Die Regel gilt nur für `#viewExercise`. Andere Ansichten (z. B. `#viewMetronome`) nutzen `.view-container` und dürfen scrollen – ihnen deshalb nicht die Klasse `.view-exercise-container` geben.
- Neue Elemente in Übungen müssen in dieses System passen: bei neuen Blöcken im oberen Modul oder Antwortbereich auch `.fit-*`-Varianten ergänzen. Prüfen auf 375×667 und 360×640 mit allen Übungsarten und höchster Stufe (Messung: `view.scrollHeight <= view.clientHeight` und Bühne ≥ `EXERCISE_MIN_STAGE_PX`).

## Mehrsprachigkeit (de, en, fr, es, pl, uk, ur)

- Deutsch ist die Standard- und Quellsprache.
- **Statische UI-Texte**: Attribut `data-i18n="key"` in index.html. Deutsch und Englisch stehen in `I18N_STATIC` in [i18n.js](i18n.js), die anderen Sprachen in `I18N_STATIC_FR/ES/PL/UK/UR` in `i18n-xx.js`.
- **Dynamische Texte**: `tr("Deutsch", "English")` und `tf(de, en, vars)` mit `{platzhalter}`. Für fr/es/pl/uk/ur sind die Wörterbücher `TR_FR` usw. **nach dem deutschen (oder englischen) Text als Schlüssel** aufgebaut.
  - ⚠️ Wird ein deutscher Text in einem `tr()`-Aufruf geändert, muss auch der Schlüssel in allen `TR_XX`-Wörterbüchern angepasst werden. Sonst fällt die Sprache still auf Englisch zurück.
  - Neue Texte immer in allen 7 Sprachen ergänzen. Achtung: `tr()`-Aufrufe mit eigener Sprach-Map (`{ fr: …, pl: … }`) brauchen auch einen `es`-Eintrag.
- **Wissensbereich**: Deutsch steht in [knowledge.js](knowledge.js), die anderen Sprachen in `knowledge-xx.js` über `registerKnowledgeBundle(lang, bundle)`.
- Bei Layout-Änderungen auch RTL (`ur`) und lange Texte (uk/pl/fr) beachten.

## Daten & Speicher

- Alles liegt lokal in `localStorage`. Schlüssel: `lauschebaer_visual_prefs_v1`, `lauschebaer_profile_v1`, `lauschebaer_custom_themes_v1`.
- Die Struktur gespeicherter Daten nicht ohne Migration ändern, da bestehende Profile weiter funktionieren müssen. Export und Import laufen über `lauscher-profil-JJJJ-MM-TT.json` (`exportUserProfileBackup` / `importUserProfileJSON`, nur Profil, kein Fortschritt).

## Samples

- `samples/<instrument>/*.m4a` sind die Rohdateien, `samples/*-bundle.js` dieselben Samples als Base64 (damit es keine CORS-Probleme bei `file://` gibt). Zur Laufzeit lädt die App **nur die Bundles**.
- Das Generator-Skript (`daw-sampling/process_samples.py`) ist **nicht im Repo**. Bundles also nicht von Hand bearbeiten.

## Mobile-Bundle

- [lauscher-mobile.html](lauscher-mobile.html) (~12 MB) ist eine Einzeldatei mit allen CSS-, JS- und Sample-Inhalten inline. Nur `tone.js` wird extern daneben geladen.
- Die Datei wird von [scripts/build-mobile-bundle.py](scripts/build-mobile-bundle.py) aus `index.html` erzeugt: `styles.css` und alle `<script src>` außer `tone.js` werden inline eingesetzt. Lokale Dateien, die im CSS per `url(...)` eingebunden sind (die Fonts), werden als Base64 eingebettet. Diese Datei nie direkt bearbeiten und nicht lesen (zu groß).
- **Nach jeder Änderung an index.html, styles.css oder einer JS-Datei das Bundle neu bauen und mitcommitten:**
  ```bash
  python3 scripts/build-mobile-bundle.py          # neu bauen
  python3 scripts/build-mobile-bundle.py --check  # prüfen, ob aktuell (Exit-Code 1 = veraltet)
  ```
- Kommt eine neue Skript- oder CSS-Datei hinzu, reicht es, sie in `index.html` einzubinden; das Skript übernimmt sie automatisch.

## Android-App (Capacitor)

- Die Android-App ist ein **separates Capacitor-Projekt außerhalb des Repos** (`~/Documents/lauscher-android`, App-ID `de.jbkstr.lauscher`). Es wird nicht hier gepflegt, sondern per [scripts/sync-android.sh](scripts/sync-android.sh) bzw. Doppelklick auf [Android-Studio-starten.command](Android-Studio-starten.command) befüllt: Syntax-Check, Bundle-Build, Kopie der Web-Dateien nach `www/`, `npx cap sync android`, Android Studio öffnen.
- **Nach jeder Änderung an Web-Dateien (index.html, CSS, JS, Fonts, Samples) den Android-Sync mitlaufen lassen** – auf Wunsch des Nutzers immer, ohne Nachfrage: `./scripts/sync-android.sh --no-open` (Android Studio öffnet der Nutzer selbst). Ändert nichts im Repo.
- ⚠️ Das Skript kopiert eine **feste Dateiliste** (`RUNTIME_FILES`) plus Fonts, Sample-Bundles und `icons/*.jpg`. Kommt eine neue JS-/CSS-Datei oder ein neuer Asset-Ordner hinzu, muss er dort zusätzlich zu `index.html` eingetragen werden.
- Bilder für die Oberfläche (z. B. das App-Icon im Über-Fenster, `icons/app-icon.jpg`) per CSS `url(...)` einbinden – so bettet das Mobile-Bundle sie automatisch als Base64 ein.
- In app.js: `initCapacitorNativeBridge()` fängt die Android-Zurück-Taste ab (`handleNativeBackButton`: Onboarding → Modal → Popover → Prüfungs-Abbruch → zurück navigieren → App beenden) und stoppt Audio, wenn die App in den Hintergrund geht. **Neue Popovers** in `hasOpenTransientPopover()` eintragen, damit „Zurück“ sie schließt. Ohne Capacitor (Browser) ist die Brücke inaktiv.
- Profil-Sicherung: In der App funktionieren Browser-Downloads nicht. Auf Mobilgeräten (App oder Browser mit Web Share) öffnet „Profil sichern“ eine Auswahl `#spaceBackupExportChooser`: **Lokal speichern** (`saveProfileBackupLocally`, Android: `@capacitor/filesystem` nach `Dokumente/Lauscher/`, Rückfall `EXTERNAL`; Browser: Download) oder **Teilen** (`shareProfileBackup`, `@capacitor/share` bzw. Web Share). Am Desktop direkt Download. Rückmeldung über `setSpaceBackupStatus` plus Toast `showAppToast`. Das Sync-Skript installiert die Plugins `app`, `filesystem` und `share` bei Bedarf und trägt `WRITE_EXTERNAL_STORAGE` (`maxSdkVersion=29`) ins Manifest ein. Native Plugins immer über `getCapacitorNativePlugin(name)` holen.
- Mikrofon (Tuner): Das Sync-Skript trägt `RECORD_AUDIO` und `MODIFY_AUDIO_SETTINGS` ins `AndroidManifest.xml` ein; Capacitor fragt die Berechtigung dann beim ersten `getUserMedia` selbst ab.
- Safe-Areas: `viewport-fit=cover` in index.html, Abstände über `env(safe-area-inset-*)` bzw. `--safe-area-inset-*` (z. B. `.app-shell`). Neue randnahe Vollbild-Elemente ebenso absichern.

## Version, Build-Nummer & Releases

- **Einzige Quelle:** [version.js](version.js) (`LAUSCHER_VERSION = { name, build, date }`). `name` ist die sichtbare Version (SemVer, z. B. `0.9.0-beta`), `build` die fortlaufende Build-Nummer (= Android `versionCode`, darf nie sinken).
- **Hochzählen nur per Skript:** `python3 scripts/bump-version.py` (Build +1) bzw. `--name 0.9.1-beta` (neue Version + Build +1); legt oben in [CHANGELOG.md](CHANGELOG.md) einen Abschnitt aus den Commits seit dem letzten Tag an. `--show` zeigt den Stand. Nur bei einem echten Release hochzählen, nicht bei jeder Änderung.
- Das Über-Fenster (`renderAboutVersionBadge`) und die Infozeile der Kontakt-Mail lesen `version.js`; `scripts/sync-android.sh` schreibt `versionName`/`versionCode` in `android/app/build.gradle`.
- **APK-Release:** signiert in Android Studio (Build → Generate Signed App Bundle / APK → APK → release). Die Datei heißt automatisch `lauscher-<name>-build<build>-release.apk` (vom Sync-Skript in `build.gradle` eingetragen, Marker `LAUSCHER_APK_NAMING`). Dann Git-Tag `v<name>` und GitHub-Release mit der APK als Anhang. APKs nie ins Repo committen. Der Release-Keystore liegt außerhalb des Repos und darf nie verloren gehen (sonst keine Updates mehr möglich).

## Lokal starten & testen

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` öffnen. Für den Nutzer gibt es die Doppelklick-Startdatei [Lauscher-starten.command](Lauscher-starten.command), die das Gleiche tut. **`index.html` nicht direkt per `file://` öffnen:** Chrome blockiert dort die Schriftdateien. Automatische Tests gibt es nicht.
- Syntax-Check nach Änderungen: `node --check app.js` (bzw. die geänderte Datei).
- **Browser-Test in der Claude-Desktop-App:** `file://` und ein per `preview_start`/`launch.json` gestarteter Server funktionieren nicht (macOS-Zugriffsschutz auf `~/Documents`). Was funktioniert: Server per Bash im Hintergrund starten (`python3 -m http.server 8811 --bind 127.0.0.1` im Projektordner, `run_in_background`), dann `preview_start` mit `url: http://localhost:8811/` aufrufen. Danach Server wieder stoppen.
- Änderungen im Browser prüfen und dabei die Konsole auf Fehler achten. Wenn relevant, auch die Mobilbreite, ein dunkles Theme und eine weitere Sprache prüfen.

## Konventionen

- Code-Kommentare und Bezeichner im bestehenden Stil halten: Kommentare meist auf Deutsch, Bezeichner auf Englisch.
- `localStorage`-Zugriffe immer in `try/catch` (wie im bestehenden Code).
- Keine neuen Abhängigkeiten, CDNs, Analytics oder Netzwerkaufrufe einbauen. Datenschutz ist ein Kernversprechen der App.
- Deployment über GitHub Pages (Branch `main`, Root-Ordner). Repo: `github.com/jbkstr/lauscher`, Web-App: `https://jbkstr.github.io/lauscher/`, Datenschutz: `…/lauscher/datenschutz.html`. Der lokale Ordner heißt noch `projekt-lauschebear`.
- **Ideen für später** stehen in [docs/ideen.md](docs/ideen.md). Wünscht der Nutzer etwas „für später“, dort eintragen. Vor Arbeiten an betroffenen Bereichen (z. B. Maskottchen, Visual-Update) dort nachsehen.
- Abgeschaltete, aber aufbewahrte Features laufen über Schalter-Konstanten (z. B. `MASCOT_LOOKS_ENABLED` in app.js) statt über gelöschten Code.

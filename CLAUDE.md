# Lauscher (Projekt Lauschebär)

Web-App für Gehörbildung und Musiktheorie mit dem Waschbär-Maskottchen „Lauschebär“. Läuft komplett im Browser, ohne Backend, Login oder Tracker. Mit dem Nutzer wird **Deutsch** gesprochen.

## Tech-Stack & Architektur

- **Vanilla JS, kein Framework, kein npm, kein Build-Schritt.** Alle Dateien sind klassische globale Skripte, die [index.html](index.html) per `<script>` in fester Reihenfolge lädt: `tone.js` → `samples/*-bundle.js` → `audio.js` → `i18n*.js` → `knowledge*.js` → `app.js`. Es gibt keine ES-Module und kein `import`/`export`, und alles teilt sich einen globalen Scope.
- **Tone.js 14.8.49** liegt lokal in [tone.js](tone.js) (minifiziert, nicht bearbeiten). Externe CDNs oder Netzwerkaufrufe gibt es nicht, und das soll so bleiben.
- **[app.js](app.js)** (~22.000 Zeilen) enthält die gesamte App-Logik. Datei nie komplett lesen, sondern gezielt mit `grep -n` suchen und nur die betroffenen Bereiche lesen. Grobe Gliederung:
  - Konstanten/Kataloge am Anfang (Themes, Profil, Mixer, Prüfungslevels, Metronom, Notation)
  - Übungs-Generatoren, `openCategoryPage`, `renderUI`, `handleAnswer`, `playSequence`
  - `DOMContentLoaded`-Init etwa ab Zeile 15800
  - Einsing-Helfer (`// EINSING-HELFER`), Metronom (`// PRAXIS-METRONOM`), Prüfungsmodus (`// KATEGORIE-PRÜFUNGSMODUS`)
- **[audio.js](audio.js)**: `AudioEngine`, `EarLabSampledInstrument`, Hall-Sends, Limiter, Pink-Noise-EQ, Percussion. Samples kommen aus `window.EARLAB_SAMPLE_PACKS`, das die Bundles befüllen. Fehlt ein Sample, springt ein Synth als Fallback ein.
- **[styles.css](styles.css)**: Alle Themes laufen über CSS-Variablen und `data-theme` / `data-appearance` / `data-lang` auf `<html>`. RTL (Urdu) läuft über `dir="rtl"`.
- **Inline-Skript im `<head>` von index.html** setzt Theme, Sprache und `data-first-run` vor dem ersten Rendern. Kommen Themes oder Sprachen dazu, muss es mit angepasst werden.

## Mehrsprachigkeit (de, en, fr, pl, uk, ur)

- Deutsch ist die Standard- und Quellsprache.
- **Statische UI-Texte**: Attribut `data-i18n="key"` in index.html. Deutsch und Englisch stehen in `I18N_STATIC` in [i18n.js](i18n.js), die anderen Sprachen in `I18N_STATIC_FR/PL/UK/UR` in `i18n-xx.js`.
- **Dynamische Texte**: `tr("Deutsch", "English")` und `tf(de, en, vars)` mit `{platzhalter}`. Für fr/pl/uk/ur sind die Wörterbücher `TR_FR` usw. **nach dem deutschen (oder englischen) Text als Schlüssel** aufgebaut.
  - ⚠️ Wird ein deutscher Text in einem `tr()`-Aufruf geändert, muss auch der Schlüssel in allen `TR_XX`-Wörterbüchern angepasst werden. Sonst fällt die Sprache still auf Englisch zurück.
  - Neue Texte immer in allen 6 Sprachen ergänzen.
- **Wissensbereich**: Deutsch steht in [knowledge.js](knowledge.js), die anderen Sprachen in `knowledge-xx.js` über `registerKnowledgeBundle(lang, bundle)`.
- Bei Layout-Änderungen auch RTL (`ur`) und lange Texte (uk/pl/fr) beachten.

## Daten & Speicher

- Alles liegt lokal in `localStorage`. Schlüssel: `lauschebaer_visual_prefs_v1`, `lauschebaer_profile_v1`, `lauschebaer_custom_themes_v1`.
- Die Struktur gespeicherter Daten nicht ohne Migration ändern, da bestehende Profile weiter funktionieren müssen. Export und Import laufen über `lauschebaer-profil.json`.

## Samples

- `samples/<instrument>/*.m4a` sind die Rohdateien, `samples/*-bundle.js` dieselben Samples als Base64 (damit es keine CORS-Probleme bei `file://` gibt). Zur Laufzeit lädt die App **nur die Bundles**.
- Das Generator-Skript (`daw-sampling/process_samples.py`) ist **nicht im Repo**. Bundles also nicht von Hand bearbeiten.

## Mobile-Bundle

- [lauschebaer-mobile.html](lauschebaer-mobile.html) (~8,5 MB) ist eine Einzeldatei mit allen CSS-, JS- und Sample-Inhalten inline. Nur `tone.js` wird extern daneben geladen.
- Das Bundle wird **nicht automatisch erzeugt**. Nach Änderungen an Quelldateien ist es veraltet. Diese Datei nicht direkt bearbeiten und nicht lesen (zu groß). Nach Änderungen den Nutzer darauf hinweisen, dass sie neu gebaut werden muss.

## Lokal starten & testen

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` öffnen. Automatische Tests gibt es nicht.
- Syntax-Check nach Änderungen: `node --check app.js` (bzw. die geänderte Datei).
- Änderungen im Browser prüfen und dabei die Konsole auf Fehler achten. Wenn relevant, auch die Mobilbreite, ein dunkles Theme und eine weitere Sprache prüfen.

## Konventionen

- Code-Kommentare und Bezeichner im bestehenden Stil halten: Kommentare meist auf Deutsch, Bezeichner auf Englisch.
- `localStorage`-Zugriffe immer in `try/catch` (wie im bestehenden Code).
- Keine neuen Abhängigkeiten, CDNs, Analytics oder Netzwerkaufrufe einbauen. Datenschutz ist ein Kernversprechen der App.
- Deployment über GitHub Pages (Branch `main`, Root-Ordner).

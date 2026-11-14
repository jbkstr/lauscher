# Lauschebär • Gehörtraining

**Lauschebär** ist eine interaktive, werbe- und trackingfreie Web-App für musikalisches Gehörtraining, Musiktheorie und Studio-/Mixing-Hören – direkt im Browser nutzbar, ohne Backend-Server und ohne Punktedruck.

---

## Inhaltsverzeichnis

- [Funktionen im Überblick](#funktionen-im-überblick)
- [Wissens-Hub & Nachschlagewerk](#wissens-hub--nachschlagewerk)
- [Audio-Engine & Mixer](#audio-engine--mixer)
- [Mein Konto, Themes & Datenschutz](#mein-konto-themes--datenschutz)
- [Projektstruktur](#projektstruktur)
- [Lokal starten & auf Mobilgeräten testen](#lokal-starten--auf-mobilgeräten-testen)
- [Hinweis für GitHub & GitHub Pages](#hinweis-für-github--github-pages)

---

## Funktionen im Überblick

Die App bietet **7 Übungsbereiche** mit mehreren Schwierigkeitsstufen, Hilfestellungen (A/B-Vergleich, Bass-/Grundton-Anzeige, Tonika-Referenz) und direkter Tempo-Steuerung:

1. **Intervalle & Akkorde**
   - Melodische Intervalle **aufwärts** und **abwärts** sowie **harmonische Intervalle** (3 Stufen: Einsteiger, Dur-Tonleiter, Chromatisch bis zur None / 15 Intervalle)
   - **Akkordtypen erkennen** (4 Stufen: von Dreiklängen bis zu Jazz-Voicings und Optionstönen wie `maj9`, `7♭9`, `7♯9`)
2. **Kadenzen**
   - Harmonien und Akkordfolgen in 4 Stufen hören (`I–IV–V–vi` über alle diatonischen Stufen und Sekundärdominanten bis zur Tritonussubstitution `♭II7`)
   - Wahlweise mit Ziel **Takt 4** oder **Zufälliger Takt (1–4)** sowie wählbarer Tonart und Taktart (`4/4`, `3/4`, `6/8`, `5/4`, Zufall)
3. **Solfège**
   - Erkennen der 7 Tonstufen (`Do–Ti` bzw. `1–7`) auf einer interaktiven Klaviatur im Kontext einer `I–vi–IV–V`-Kadenz
   - 6 Stufen von C-Dur in 1 Oktave bis zu wechselnden Tonarten und mehreren Oktaven nach jeder Antwort
4. **Tonleitern & Modi**
   - **Modus / Tonleiter erkennen:** Ionisch, Dorisch, Phrygisch, Lydisch, Mixolydisch, Äolisch, Lokrisch (inkl. transponierter Stufe)
   - **Charakterton & Klangfarbe:** Unterscheiden anhand typischer Reibungs- und Farbtöne (`#4`, `b7`, `♮6`, `b2`, `b5`, `#7`) inkl. Harmonisch Moll
   - **Modale Kadenzen & Vamps:** Erkennen typischer Pendel-Akkordfolgen (z. B. `i–IV`, `I–bVII`, `I–II`, `i–bII`)
5. **Melodien**
   - 4-töniges Melodie-Diktat Baustein für Baustein lösen (Bereiche `Do–Fa`, `Sol–Do` und ganze Tonart; feste oder wechselnde Tonarten in 1 oder mehreren Oktaven)
6. **Rhythmus**
   - **Taktart & Metrum:** `4/4`, `3/4`, `2/4`, `6/8`, `5/4`, `7/8`
   - **Rhythmus-Diktat (4 Zählzeiten):** Viertel, Achtel, Pausen, Offbeats, Triolen, Sechzehntel, Punktierungen und Synkopen
   - **Rhythmus nachklopfen (Tap-Pad):** Direktes Einklopfen inklusive **Blindflug-Stufe**, bei der der Klick während der eigenen Runde verstummt
   - **Groove, Akzente & Mikro-Timing:** Groove-Stile, Offbeat-Akzent-Suche sowie Timing-Abweichungen bis `±28 ms`
7. **Produktion (Studio & Mixing)**
   - **Frequenzen erkennen (Sinus):** Von `63 Hz` (Subbass) bis `12 kHz` (Air-Band) in 3 Rasterstufen
   - **EQ-Boost im Pink Noise:** Schmalbandige und breite Peaking-EQ-Anhebungen heraushören – abgesichert durch einen integrierten **-14 dBFS Schutz-Limiter** und Lautheitsausgleich

---

## Wissens-Hub & Nachschlagewerk

Im Reiter **Wissen** stehen drei Bereiche mit interaktiven Klangbeispielen bereit:

- **Theorie & Tools (10 Module):** Intervalle, Kadenzen, Physik & Klang, Solfège & Stufen, Rhythmus & Takte, Gesang & Stimme, Modi & Tonleitern, Tonarten & Vorzeichen, **interaktiver Quintenzirkel** sowie Singen & Spielen
- **Artikel (7 vertiefende Texte):** Hintergründe zu Gehörbildung, Harmonielehre, Songwriting-Tricks und Akustik mit direkten Hörbeispielen
- **Instrumente (8 Familien):** Streich-, Holzblas-, Blechblas-, Tasten-, Zupf-, Rhythmus-Instrumente, Moderne/Elektronik sowie Orchester & Bands

---

## Audio-Engine & Mixer

- **Eigene Sample-Engine ([audio.js](audio.js)):** Auf Basis von **Tone.js** nutzt `EarLabSampledInstrument` native WebAudio-Buffer aus eingebetteten DAW-Stems (6 Instrumenten-Packs: Klavier, Gitarre, Streicher, Bläser, Stimme, Bass sowie 7 Percussion-Samples) inklusive automatischem Synth-Fallback.
- **Echtzeit-Mixer:** Alle 6 Instrumentenspuren lassen sich jederzeit live mischen oder über Presets (*Duo*, *Ensemble*, *Orchester*, *Solo Klavier*, *Benutzerdefiniert*) schalten.
- **Quick-Mixe:** Favoriten-Setups können direkt von der Startseite aus gestartet werden.

---

## Mein Konto, Themes & Datenschutz

- **100 % lokal (`localStorage`):** Keine Registrierung, keine Server-Übertragung, keine Lern- oder Leistungsbewertung. Alle Vorlieben lassen sich als **`lauschebaer-profil.json`** exportieren, wieder importieren oder komplett zurücksetzen.
- **Personalisierung & Routinen:** Rufname, eigene Instrumente/Rollen, Trainings-Schwerpunkt, **Lauschebär-Look** (Accessoires) sowie ein **achtsamer Session-Timer** (5–20 Min) mit automatischem Inaktivitäts-Stopp (2–5 Min).
- **Zweisprachig & flexible Notation:** Sofortiges Umschalten zwischen **Deutsch** und **English** in den Einstellungen; Tonnamen separat zwischen deutscher (`H / B / Cis`) und internationaler (`B / Bb / C#`) Schreibweise wählbar.
- **Themes & Farbdesigner:** 3 integrierte duale Themes (*Waldlichtung & Salbei*, *Morgentau & Küste*, *Abenddämmerung*) für Hell-/Dunkel-/Systemmodus sowie **3 eigene speicherbare Theme-Plätze** mit RGBA- & Farbpad-Editor pro Farbrolle.

---

## Projektstruktur

| Datei / Ordner | Zweck |
| :--- | :--- |
| `index.html` | Haupt-HTML-Struktur der App (Ansichten, Modals, Navigation) |
| `styles.css` | Komplettes Design, Themes (Light/Dark + Custom CSS-Variablen) & Responsive-Layout |
| `app.js` | Anwendungslogik, Übungsgeneratoren, History-/Swipe-Navigation & Konto/Theme-Editor |
| `audio.js` | `AudioEngine`, `EarLabSampledInstrument`, Limiter, Pink-Noise-EQ & Percussion |
| `i18n.js` | Zweisprachige Texte & Musikbegriffe (Deutsch / Englisch) |
| `knowledge.js` & `knowledge-en.js` | Inhalte für Wissensmodule, Artikel, Instrumentenkunde & Quintenzirkel |
| `samples/` | Komprimierte Base64-JS-Instrumenten-Bundles (`*-bundle.js`) für sofortiges Audio ohne CORS-Probleme |
| `lauschebaer-mobile.html` | Gebündelte Einzeldatei-Version (CSS, Samples und App-Skripte inline) für einfache mobile Tests |
| `daw-sampling/` | Quellmaterial für DAW-Stems (`exports/*.wav`, MIDI-Vorlagen, `process_samples.py`) – **wird im Browser nicht benötigt** |

---

## Lokal starten & auf Mobilgeräten testen

Da alle Samples als JS-Bundles vorliegen, genügt ein beliebiger statischer Webserver (kein Node-/npm-Build nötig):

```bash
python3 -m http.server 8000
```

Anschließend im Browser `http://localhost:8000` öffnen.

- **Einzeldatei für mobile Tests:** `lauschebaer-mobile.html` enthält Styles, Samples und App-Logik in einer Datei. *(Hinweis: `Tone.js` wird per CDN von `cdnjs.cloudflare.com` nachgeladen, daher ist beim Laden eine Internetverbindung erforderlich. Unter iOS sollten `.html`-Dateien nicht in QuickLook, sondern über **Safari** per Web-Link oder eine lokale WebView-App geöffnet werden.)*

---

## Hinweis für GitHub & GitHub Pages

Für den Betrieb über **GitHub Pages** werden die großen Roh-Audiodateien in `daw-sampling/` (ca. 199 MB) **nicht** benötigt. Vor dem Hochladen empfiehlt sich eine `.gitignore`-Datei mit folgendem Inhalt:

```gitignore
daw-sampling/
.DS_Store
```

Danach genügt in GitHub unter **Settings → Pages** die Auswahl **Deploy from a branch (`main` / `root`)**, um die App direkt per HTTPS-Link auf Desktop, Android und iOS testen zu können.

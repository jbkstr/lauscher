# Konzept: Nachsingen mit Rückmeldung

**Stand:** 2026-11-25 · Status: Phase 1 umgesetzt (siehe „Entscheidungen & Umsetzungsstand“)

Lauscher hört zu, ob du richtig singst. Die App spielt etwas vor oder zeigt ein Ziel („Sing eine Quinte“, „Sing Mi“), du singst, und Lauscher zeigt dir, welchen Ton du getroffen hast und wie weit du daneben lagst. Alles läuft wie beim Tuner nur auf dem Gerät: nichts wird aufgenommen, gespeichert oder übertragen.

## Entscheidungen & Umsetzungsstand

Diese Entscheidungen gelten vor den Vorschlägen weiter unten:

- **Keine eigene Kategorie.** „Singen“ bleibt der Einsing-Helfer. Das Nachsingen läuft stattdessen als **Unterübung im jeweiligen Themengebiet**, einheitlich benannt mit „… treffen“:
  - **Intervalle treffen** (`sing-interval`, Kategorie Intervalle): 9 Stufen wie die Intervall-Übungen (Dur, Moll, Chromatisch), Richtung aufwärts, abwärts oder gemischt.
  - **Stufen treffen** (`sing-degree`, Kategorie Solfège): Kadenz I–IV–V–I, dann Do, dann die gesuchte Stufe. Stufe 1: Do/Mi/Sol, 2: Do–Fa, 3: Sol–Do, 4: ganze Dur-Tonleiter, 5: ganze Moll-Tonleiter.
  - Später möglich: „Melodien treffen“, „Akkordtöne treffen“.
- **Keine Cent-Zahlen**, auch nicht per Einstellung. Rückmeldung nur mit Worten, Farbe, Zielband und Singspur.
- **Großzügige Auswertung**, gleich auf allen Stufen und oktavunabhängig. Bis ±0,65 Halbtöne zählt als Treffer (ab ±0,3 mit Hinweis „ein Hauch zu hoch/tief“). Bis ±1,6 Halbtöne gibt es „Fast!“ mit Richtung, das zählt aber nicht als Treffer.
- **Zielband erst nach dem Versuch.** Während des Singens zeigt die Spur nur die eigene Stimme und den Ausgangston. „Ziel anhören“ blendet das Band ein, kostet aber die Serie.
- **Nicht in Übe-Mixen**, weil das Mikrofon dort mitten im Mix aufgehen würde. „Weiterüben“ setzt eine zuletzt gestartete „… treffen“-Übung aber fort.
- **Code:** [js/pitch-capture.js](../js/pitch-capture.js) (Mikrofon & Tonhöhe, nutzt die Tuner-DSP mit Profil `voice`) und [js/sing-match.js](../js/sing-match.js) (Ablauf, Auswertung, Singspur, Sing-Pad, Stimmlage). Generatoren in [js/generators.js](../js/generators.js), Übersetzungen in [i18n/phrases-sing.js](../i18n/phrases-sing.js).

---

## 1. Grundprinzip: Ruf und Antwort

Die wichtigste Entscheidung vorab: **Erst spielt die App, dann singst du. Nie gleichzeitig.**

Der Tuner schaltet Echo-Unterdrückung, Rauschunterdrückung und automatische Pegelanpassung bewusst ab (`echoCancellation: false` usw.), weil sie die Tonhöhe verfälschen. Damit hört das Mikrofon aber jeden Ton, den der Lautsprecher spielt, in voller Stärke. Würde die App während des Singens Klavier spielen, erkennt der Tracker das Klavier statt der Stimme.

Daraus folgt der Ablauf jeder Aufgabe:

```
 Vorspielen ──► Nachhall abwarten ──► „Jetzt du!“ ──► Zuhören ──► Auswerten ──► Rückmeldung
 (Mikro taub)   (Mikro taub)          (Mikro offen)   (Zeitfenster)              (Ziel vs. gesungen)
```

- Während Vorspielen und Nachhall ist das Mikrofon offen, aber die Auswertung ignoriert es. Der Faltungshall der Engine klingt bis zu 1,65 s nach. Für Sing-Übungen sollte er kürzer bzw. leiser sein, sonst muss man lange warten.
- Mit Kopfhörern wäre gleichzeitiges Singen möglich (z. B. gegen einen Bordun-Grundton intonieren). Das kommt erst später als ausdrückliche Option „Ich trage Kopfhörer“, weil sich kabelgebundene Kopfhörer im Browser nicht zuverlässig erkennen lassen.

---

## 2. Welche Übungen sinnvoll sind

Bisher **erkennt** man in Lauscher Töne und tippt die Antwort. Beim Nachsingen **erzeugt** man sie. Das ist eine andere Fähigkeit und eine echte Ergänzung, keine Variante der bestehenden Übungen. Deshalb schlage ich eine eigene Kategorie **„Singen“** vor, deren Generatoren aber die vorhandenen Kataloge (Intervalle, Stufen, Melodien) wiederverwenden.

| # | Übung | Was passiert | Auswertung | Phase |
|---|---|---|---|---|
| 1 | **Ton treffen** (`sing-pitch`) | Ein Ton erklingt, du singst ihn nach. | Ein Ton, oktavtolerant | MVP |
| 2 | **Intervall singen** (`sing-interval`) | Grundton erklingt, Anzeige „große Terz ↑“. Du singst den Zielton (optional erst den Grundton, dann den Zielton). | Ein Ton relativ zum Grundton | MVP |
| 3 | **Stufe singen** (`sing-degree`) | Kadenz/Tonika legt die Tonart fest, Anzeige „Mi“ bzw. „3“. Du singst die Stufe. | Ein Ton relativ zur Tonika | Phase 2 |
| 4 | **Dreiklang singen** (`sing-chord`) | Grundton erklingt, Anzeige „Moll“. Du singst 1–3–5. | Tonfolge (3 Töne) | Phase 2 |
| 5 | **Phrase nachsingen** (`sing-melody`) | 3–6 Töne werden vorgespielt (wie `melody`), du singst sie nach. | Tonfolge mit Segmentierung | Phase 3 |
| 6 | **Vom Blatt singen** (`sing-notation`) | Tonika erklingt, Noten stehen im Notensystem, du singst sie. | Tonfolge | Phase 3 |

Die Stufen orientieren sich an den bestehenden Übungen: `sing-interval` nutzt die Intervall-Stufen aus `interval-melodic`/`-down`, `sing-degree` die Solfège-Stufen, `sing-melody` die Melodie-Bereiche (`do-fa`, `sol-do`, `full`). Mit steigender Stufe wird zusätzlich die **Toleranz** enger (siehe 4.).

**Bewusst nicht** fürs Singen: Rhythmus, Produktion, Modi, gleichzeitige Intervalle und Akkorde, Notationssymbole. Dort ergibt Singen keinen Sinn oder ist nicht messbar.

**Sanfte Brücke zu den bestehenden Übungen (Phase 4):** Die vorhandene Summ-Pause bekommt optional ein Ohr. Während der 3 Sekunden zeigt Lauscher nur unbewertet an „Gehört: ~ e¹“. Das bleibt ein Spiegel, keine Prüfung, und hilft, die Mitsing-Tipps ernster zu nehmen.

---

## 3. Layout: Was der Bildschirm zeigt, während gesungen wird

Es gilt die bestehende Regel: `#viewExercise` scrollt nie. Die Sing-Übung nutzt denselben Aufbau wie alle Übungen und tauscht nur Bühne und Antwortbereich aus. Vorbild ist das Rhythmus-Tap-Pad (`#rhythmTapPadWrap`), das ebenfalls die Antwort-Kacheln ersetzt.

```
┌──────────────────────────────────┐
│ Intervall singen · Stufe 3   ●Mikro│  ← oberes Modul unverändert, plus Mikro-Anzeige
│ Grundton: G   Ziel: große Terz ↑   │
├──────────────────────────────────┤
│        h¹ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄    │
│           ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Zielband (Toleranzkorridor) mit Notenname
│        g¹ ════╗        ╭─╮╭──────  │  ← Grundton als Referenzlinie
│               ╚═══╭───╯ ╰╯        │  ← deine Stimme als Live-Linie
│   🦝  „Fast! Ein bisschen zu tief.“ │  ← Maskottchen + Rückmeldung
├──────────────────────────────────┤
│  ┌──────────────────────────────┐ │
│  │    ◉  JETZT SINGEN   ▁▃▅▃▁    │ │  ← Sing-Pad: Status, Pegel, Restzeit-Ring
│  └──────────────────────────────┘ │
│  [Grundton]  [Ziel anhören]  [Weiter]│
├──────────────────────────────────┤
│   ⟲      ▶ Abspielen        ⏭     │  ← Dock-Leiste unverändert
└──────────────────────────────────┘
```

### Bühne: die Singspur
- **Zeit läuft von links nach rechts, Tonhöhe von unten nach oben.** Das Ziel ist ein waagerechtes Band, so breit wie die aktuelle Toleranz. Die eigene Stimme erscheint als Linie, die live mitläuft.
- Auf der Linie sieht man Anschleifen, Vibrato und das Einpendeln. Das ist didaktisch wertvoller als eine reine Zahl.
- Die Achse ist **auf die Aufgabe gezoomt** (z. B. Grundton −3 bis Ziel +3 Halbtöne), nicht auf den ganzen Stimmumfang. Liegt die Stimme außerhalb, zeigt ein Pfeil am Rand „höher“ bzw. „tiefer“.
- Hinterher bleibt die Kurve stehen. Ein Tipp auf „Ziel anhören“ spielt den Zielton, sodass man Kurve und Klang vergleichen kann.
- Zeichnen per Canvas (Schrift „Andika“ explizit in `ctx.font`) oder SVG wie die anderen Notationen. Canvas ist für eine Live-Linie mit 40 Bildern/s günstiger.

### Verdichtung (`fit-*` und Container-Query)
| Platz | Bühne zeigt |
|---|---|
| voll | Singspur mit Zielband, Notennamen und Maskottchen |
| `@container` mittel | Singspur ohne Maskottchen, Rückmeldung als eine Zeile |
| `.fit-2`/`.fit-3` | Waagerechter Cent-Balken wie beim Tuner: Ziel in der Mitte, Punkt für die Stimme |
| `.fit-4` | Eine Zeile: „Ziel e¹ · gesungen e¹ +12 ct ✓“ |

Prüfen wie gewohnt auf 375×667, 360×640 und 375×548.

### Antwortbereich: das Sing-Pad
- Ein großes Feld mit klarem Zustand: **„Hör zu …“** (während des Vorspielens, ausgegraut), **„Jetzt singen“** (Mikro offen, pulsierender Ring als Restzeit, kleiner Pegelmesser), **„Ausgewertet“**.
- Darunter drei Knöpfe: **Grundton** bzw. **Tonika** (vorhandener `tonicRefBtn`), **Ziel anhören** (löst die Aufgabe auf und zählt sie nicht als Treffer) und **Weiter**.
- Ein Tipp aufs Pad während des Zuhörens beendet die Aufnahme sofort, falls man fertig ist.
- Die Mikro-Anzeige oben rechts ist immer sichtbar, solange das Mikrofon offen ist. Das ist Teil des Datenschutz-Versprechens.

### Rückmeldung (Texte)
Nie „Falsch!“, sondern immer eine Richtung oder eine Erklärung:
- **Getroffen** (im Band): „Sauber! +6 Cent“, Streak und Music-Juice wie bei richtigen Antworten.
- **Knapp** (bis ±50 Cent): „Fast – etwas zu tief.“ Zählt als Treffer auf niedrigen Stufen, auf hohen nicht.
- **Anderer Ton**: „Du hast eine Quarte gesungen, gesucht war eine große Terz.“ Das spiegelt die vorhandene A/B-Diagnose und ist das eigentlich Lehrreiche.
- **Nichts gehört**: „Ich habe dich nicht gehört – etwas lauter oder näher ans Gerät?“ Zählt nicht als Fehler.

Die Cent-Zahl ist für Einsteiger eher verwirrend. Vorschlag: standardmäßig nur Worte und Farbe, Cent-Zahl per Einstellung „Genaue Anzeige“.

---

## 4. Auswertung

Die Auswertung ist eine **reine Funktion** ohne DOM: Sie bekommt eine Folge von Messpunkten `{ t, midiFloat, clarity, db }` und das Ziel und liefert ein Ergebnis. So lässt sie sich in `scripts/run-tests.js` mit künstlichen Kurven testen (sauber, Anschleifen, Vibrato, Oktave, Stille).

**Ein Ton (Übungen 1–4):**
1. Nur Messpunkte mit ausreichender Klarheit und offenem Noise-Gate.
2. Die ersten ~150 ms nach Einsatz verwerfen (Anschleifen, Konsonant „D“ bei „Do“).
3. Die längste **stabile Strecke** suchen (Schwankung < ~40 Cent) mit mindestens ~350 ms Dauer.
4. Deren Median ergibt den gesungenen Ton. Vibrato mittelt der vorhandene `TunerVibratoTracker` bereits heraus.
5. Abweichung zum Ziel in Cent, **standardmäßig oktavtolerant**: Singt ein Mann den Ton eine Oktave tiefer als das Klavier, ist das richtig. Auf höheren Stufen optional „exakte Oktave“.

**Toleranz nach Stufe** (Vorschlag): Einsteiger ±50 Cent (also „richtiger Halbton“), dann ±35, ±25, Profi ±15.

**Tonfolgen (Übungen 4–6):** Die Kurve wird an Stille und Tonsprüngen (> ~70 Cent, länger als ~120 ms) in Töne zerlegt, dann per einfacher Folgen-Ausrichtung mit der Ziel-Folge verglichen. So kostet ein zusätzlicher Zwischenton nicht gleich die ganze Phrase. Rückmeldung pro Ton: Zielband und eigene Kurve liegen in der Singspur nebeneinander, Treffer werden grün markiert. Der Rhythmus wird in Phase 3 nicht bewertet, nur die Tonhöhen und ihre Reihenfolge.

**Zeitfenster:** Pro Ton etwa 4 s zum Singen, bei Phrasen Anzahl × 1,5 s + 2 s. Endet früher, wenn nach einem gültigen Ton 1 s Stille folgt.

---

## 5. Erste Nutzung

Beim ersten Öffnen einer Sing-Übung erscheint eine kurze Einführung (Stil wie die Übungs-Tutorials):

1. **Was passiert:** „Lauscher hört dir beim Singen zu. Nichts wird aufgenommen oder gespeichert. Das Mikrofon ist nur an, solange du in einer Sing-Übung bist.“
2. **Mikrofon erlauben** (die Abfrage des Systems kommt erst nach diesem Tipp, also mit Nutzer-Geste).
3. **Stimmlage wählen:** Die fünf Lagen aus dem Einsing-Helfer (`WARMUP_VOICE_RANGES`: Chor-Mitte, Sopran, Alt, Tenor, Bass) oder „Lass mich vorsingen“: einmal bequem tief und einmal bequem hoch singen, Lauscher misst. Alle Aufgaben liegen danach in diesem Bereich.
4. **Kurzer Probelauf** mit einem Ton, damit Pegel und Lautsprecher passen.
5. Hinweis: „Kopfhörer sind nicht nötig. Am besten in ruhiger Umgebung.“

Die Stimmlage landet im Profil (siehe 7.) und ist in den Übungsoptionen änderbar. Hat jemand im Profil „Gesang“ als Instrument gewählt, wird die Kategorie auf der Startseite hervorgehoben.

---

## 6. Fallstricke

### Technik
| Problem | Was passiert | Lösung |
|---|---|---|
| **Übersprechen** Lautsprecher → Mikro | Ohne Echo-Unterdrückung erkennt der Tracker das Klavier. | Ruf und Antwort (Abschnitt 1). Auswertung erst nach Ende von Wiedergabe + Hall + ~200 ms. Hall für Sing-Übungen kürzen. |
| **Zwei AudioContexts auf iOS** | Der Tuner öffnet für das Mikrofon einen eigenen Context. Spielt die Engine gleichzeitig über ihren Context, drohen auf dem iPhone Abtastraten-Wechsel, Knacken, Unterbrechungen. | Mikrofon-Quelle im **Haupt-Context der Engine** anlegen (`createMediaStreamSource` auf dem Engine-Context). Ein Context für alles. |
| **AudioSession `play-and-record`** | iOS kann die Ausgabe leiser machen oder auf den Hörer statt den Lautsprecher legen. Umschalten bei laufendem Context kann eine Unterbrechung auslösen. | Session **einmal beim Betreten** der Sing-Übung im Tipp umschalten (`setTunerCaptureSession(true)` bzw. gemeinsamer Helfer), nicht pro Aufgabe. Auf echtem iPhone früh testen: Lautstärke, Lautsprecher-Routing. |
| **Mikro-Erlaubnis** | Safari fragt teils bei jedem Besuch neu. Ständiges Öffnen/Schließen kostet Zeit und kann neu nachfragen. | Mikro einmal pro Übungssitzung öffnen und über die Aufgaben offen lassen. Schließen beim Verlassen, bei Prüfung und in `stopAllAudioSessionsForBackground()`. |
| **Bluetooth** | Ein Bluetooth-Headset als Mikro schaltet auf Telefonie-Qualität, die Wiedergabe klingt dann dumpf. | Die vorhandene Logik des Tuners nutzen (eingebautes Mikro bevorzugen, Hinweis zeigen). |
| **Latenz der Analyse** | Das Tuner-Fenster ist 8192 Samples (~170 ms). Für lange Töne gut, für Phrasen zu träge. | Neues DSP-Profil `voice` (Fenster 4096, Suchbereich ~70–1100 Hz, Vibrato aktiv, Transienten aus). |
| **Oktavfehler** | Bei hauchiger Stimme springt die Erkennung gelegentlich eine Oktave. | Suchbereich auf die Stimmlage ± Reserve begrenzen; Median über die stabile Strecke; oktavtolerante Wertung. |
| **Grundrausch-Messung** | Der Tuner misst in den ersten 350 ms das Grundrauschen. Klingt da gerade Musik, ist die Schwelle zu hoch. | Messen, wenn das Mikro offen und die App still ist; in Pausen nachführen (vorhanden). |
| **Android-App** | Nativer Pfad über `RawAudioTunerPlugin` (UNPROCESSED). | Wiederverwenden; prüfen, dass Plugin und Engine-Wiedergabe gleichzeitig laufen. |
| **Kein Mikrofon** (Desktop ohne Mikro, Erlaubnis verweigert) | Übung nicht benutzbar. | Kategorie bleibt sichtbar, Übung zeigt eine freundliche Erklärung und bietet „Ohne Mikro üben“: dann wie die Summ-Pause, mit Selbsteinschätzung „Hab’s getroffen / Nicht getroffen“ nach dem Auflösen. |

### Didaktik & Gefühl
- **Singen ist persönlich.** Viele trauen sich nicht oder treffen anfangs nichts. Großzügige Toleranz am Anfang, positive Sprache, nie „falsch“, immer Richtung. Wer dreimal nichts trifft, bekommt Hilfe: Ziel nochmal anhören, dann „Gleite langsam von unten zum Ziel“, und die Singspur zeigt, wann man im Band ist. Das ist die bewährte Übung gegen das „Brummen“.
- **Stimmlage zählt mehr als bei allem anderen.** Ein Ton außerhalb der bequemen Lage misst nicht das Gehör, sondern die Stimme. Deshalb Aufgaben immer in die gewählte Lage transponieren.
- **Silben:** Bei „Stufe singen“ ist der Name (Do, Re, Mi) Teil der Übung, aber Konsonanten stören die Messung kurz. Wird durch das Verwerfen der ersten 150 ms abgefangen. Alternativ „auf ‚la‘ oder summen“ erlauben.
- **Ruhige Umgebung** ist nicht immer gegeben (Bus, Schule). Das Noise-Gate passt sich an, aber Gespräche im Hintergrund erzeugen Fehlmessungen. „Nichts gehört“ und unklare Messungen nie als Fehler zählen.

### App-Regeln
- **Datenschutztexte** in [legal.js](../legal.js) sagen heute ausdrücklich: Mikrofon „nur im Stimmgerät (Tuner)“. Muss vor dem Release angepasst werden (DE + EN, Abschnitt 3 und Tabelle).
- **Prüfungsmodus und Nur-Hören-Modus** sind zunächst für Sing-Übungen aus. Eine Sing-Prüfung kann später kommen.
- **i18n:** Alle neuen Texte in allen 10 Sprachen, Singspur und Pad auch in RTL prüfen (die Zeitachse bleibt links→rechts, wie Notensysteme).
- **Android-Zurück:** Einführung und Stimmlagen-Auswahl in `hasOpenTransientPopover()` eintragen.
- **Barrierefreiheit:** Ergebnis per `aria-live` ansagen („Getroffen, 6 Cent zu hoch“).

---

## 7. Technische Umsetzung

### Neue Bausteine
- **`js/pitch-capture.js`** (vor `js/tuner.js` laden): Herauslösen der Mikrofon- und Analyse-Logik aus `js/tuner.js`. Heute ist sie fest an `_tuner`, an die Tuner-Ansicht (`state.currentView !== "tuner"`) und an Tuner-DOM gebunden. Ziel ist eine Fabrik wie `createPitchCapture({ profile, onFrame })` mit `start()`, `stop()`, `setIgnoreUntil(t)` und Messpunkten `{ t, freq, midiFloat, clarity, db }`. Sie übernimmt Mikro-Anfrage (nativ / `getUserMedia`, Bluetooth-Logik), Bandpass, Noise-Gate, NSDF-Erkennung, Median/EMA. Der Tuner wird danach selbst Nutzer dieser Fabrik.
  - Das ist der größte und riskanteste Schritt, weil der Tuner sehr fein eingestellt ist. Deshalb zuerst und einzeln, mit Vorher-Nachher-Vergleich im Tuner.
- **`js/sing-exercise.js`** (nach `js/playback.js`): Zustandsmaschine pro Aufgabe (`prompt → settle → listen → evaluate → feedback`), Singspur-Zeichnung, Sing-Pad, Auswertung (`evaluateSungPitch`, `evaluateSungSequence` als reine Funktionen).
- **`js/generators.js`**: Generatoren für `sing-pitch`, `sing-interval`, `sing-degree`, später `sing-chord`, `sing-melody`, `sing-notation`. Sie bauen auf den vorhandenen Intervall-/Stufen-/Melodie-Generatoren auf und transponieren in die Stimmlage.
- **`js/tuner-dsp.js`**: neues Profil `voice` in `TUNER_DSP_PROFILES`.
- **`js/catalogs.js`**: Einträge in `MIX_MODE_CATALOG`, `PRACTICE_LEVEL_KEYS`, `PRACTICE_OPTION_RULES`; neue Kategorie „Singen“ in [js/categories.js](../js/categories.js) mit Hilfeseite.

### Integration in die Übungsansicht
- `renderUI()` blendet bei `sing-*` die Antwort-Kacheln aus und `#singPadWrap` ein (wie `rhythmTapPadWrap`).
- Die Bühne bekommt einen Modus `stage-singing` mit Canvas für die Singspur; Container-Query und `.fit-*`-Regeln wie in Abschnitt 3.
- „Abspielen“ in der Dock-Leiste spielt die Aufgabe erneut und startet danach das Zuhören neu.
- Richtige Ergebnisse laufen über denselben Weg wie `handleAnswer` (Streak, Music-Juice, Übungsstand), damit Statistik und Meilensteine ohne Sonderwege funktionieren.

### Daten (nur neue Felder, keine Migration nötig)
- `profile.singVoiceRange` (`mixed` | `soprano` | `alto` | `tenor` | `bass` | `{ lowMidi, highMidi }` nach dem Vorsingen)
- `profile.singIntroDone`, `profile.singShowCents`, `profile.singOctaveStrict`
- Übungsstand pro `sing-*`-Typ über die vorhandenen `practice`-Mechanismen. Export/Import funktioniert dadurch automatisch.
- Meilensteine in [js/achievements.js](../js/achievements.js), z. B. „Erster Treffer“, „10 Intervalle sauber“, „Phrase ohne Fehler“.

### Tests
- Reine Auswertung in `scripts/run-tests.js`: synthetische Kurven (sauber, +30 Cent, Anschleifen, Vibrato ±40 Cent bei 5,5 Hz, Oktave tiefer, Stille, Nebengeräusch-Spitzen).
- Nach dem Herauslösen: Tuner-Verhalten im Browser mit Sinus-Testtönen gegenprüfen.
- Echte Geräte: iPhone (Safari und Home-Bildschirm-App), Android-App, Desktop-Chrome. Vor allem Lautstärke und Lautsprecher-Routing auf dem iPhone.

---

## 8. Reihenfolge

| Phase | Inhalt | Ergebnis |
|---|---|---|
| **0** | `js/pitch-capture.js` herauslösen, Tuner darauf umstellen, Profil `voice`, Auswertungsfunktion + Tests | Tuner unverändert, Grundlage steht |
| **1 (MVP)** | Kategorie „Singen“ mit **Ton treffen** und **Intervall singen**, Singspur, Sing-Pad, Einführung mit Stimmlage, Datenschutztexte, alle Sprachen | Erste nutzbare Version |
| **2** | **Stufe singen** und **Dreiklang singen**, Diagnose „du hast X gesungen“, Hilfe gegen Danebenliegen, Meilensteine | Breiter Nutzen für Solfège |
| **3** | **Phrase nachsingen** und **Vom Blatt singen** (Tonfolgen-Auswertung) | Größter Mehrwert, technisch am anspruchsvollsten |
| **4** | Summ-Pause mit Ohr, Kopfhörer-Modus mit Bordun beim Singen, Sing-Prüfung | Ausbau |

---

## 9. Offene Entscheidungen

1. **Eigene Kategorie „Singen“ oder Umschalter „Antworten: Tippen | Singen“ in den bestehenden Übungen?** Empfehlung: eigene Kategorie, weil Erkennen und Singen verschiedene Fähigkeiten sind, eigene Stufen und eigene Statistik brauchen und die feste Übungshöhe so einfacher zu halten ist.
2. **Cent-Zahl standardmäßig zeigen?** Empfehlung: nein, nur Worte und Farbe, Zahl per Einstellung.
3. **Wertung „knapp daneben“** auf Einsteiger-Stufen als Treffer zählen? Empfehlung: ja.
4. **Ohne Mikro üben** (Selbsteinschätzung) anbieten oder die Kategorie ohne Mikro ausblenden? Empfehlung: anbieten.

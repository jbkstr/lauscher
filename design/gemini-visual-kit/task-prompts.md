# Fertige Prompts für Gemini

Zum Kopieren in einen Chat mit dem Skill `lauscher-art-director` (per `/` bzw. `@` auswählen oder einfach drauflos schreiben). Text in `[eckigen Klammern]` anpassen. Hänge bei Bildaufgaben immer **1–3 passende Einzelbilder** aus `poses/` an, denn angehängte Bilder hält Gemini am genauesten ein.

---

## 0. Einstieg (erste Nachricht in einem neuen Chat)

> Lies den Stilleitfaden und schau dir das Modellblatt in `lauscher-references.pdf` an. Fasse mir in 5 Stichpunkten zusammen, was Lauscher ausmacht und worauf du bei jedem Bild achtest. Noch kein Bild erzeugen.

So prüfst du, ob Gemini den Kontext verstanden hat, bevor Quota in Bilder fließt.

---

## 1. Neue Variante einer Grundstimmung (Standard-Look)

Anhängen: `references/ref_[stimmung].png` und eine zweite Variante derselben Stimmung aus `poses/standard/`.

> Erstelle eine neue Variante für die Stimmung **[awaiting]** im Standard-Look. Idee: [Lauscher sitzt im Schneidersitz und tippt erwartungsvoll mit einer Pfote auf sein Knie]. Halte dich genau an Figur und Stil der angehängten Bilder. Dateiname: `standard_[awaiting]_[5].png`.

Ideen, wo noch Varianten fehlen:
- `awaiting` (bisher 4): Pfoten hinter dem Rücken wippend; Ohr in Richtung Betrachter gedreht; mit erhobener Pfote „Du bist dran“-Geste
- `question` (bisher 4): verdutzt mit schiefem Kopf und einem hochgezogenen Ohr; blättert ratlos in einem Notenheft; hält sich eine Pfote vor den Mund („Ups“)
- `listening`: liegt auf dem Bauch, Kinn auf den Pfoten, Ohren aufgestellt; hält eine Hand-Muschel hinter das Ohr
- `happy`: Luftsprung mit Notenwirbel; klatscht in die Pfoten; macht einen kleinen Tanzschritt
- `break`: gießt eine Pflanze; dehnt sich mit gestreckten Armen; liest ein Buch

---

## 2. Neuen Look entwickeln (Schritt für Schritt)

### 2a. Konzept

> Wir entwickeln den Look **[Studio]** (passend zum Profil-Instrument [Produktion]). Schlag mir 3 Varianten für das Erkennungsmerkmal vor, das in allen 8 Bildern sichtbar ist, und je 1 passendes Prop pro Stimmung (`idle`, `listening`, `happy`, `awaiting`, `question`, `thinking`, `break`, `logo`). Beachte, dass die Hände für die Gesten frei bleiben sollen. Noch kein Bild.

### 2b. Leitbild (Brustbild zuerst)

Anhängen: `references/ref_logo.png`, `references/ref_idle.png`

> Wir nehmen Variante [2]. Erstelle zuerst das Brustbild `[studio]_logo.png`: derselbe Kopf und dieselben Schultern wie im angehängten Logo, frontal, ruhiges Lächeln, dazu [die salbeigrünen Studio-Kopfhörer]. Das wird das Leitbild des Looks.

### 2c. Restliche Stimmungen

Anhängen: das freigegebene Leitbild + die passende Standard-Pose

> Jetzt `[studio]_[listening]_1.png`: Nimm die Pose aus dem angehängten Standard-Bild als Vorlage und kleide Lauscher wie im Leitbild ein. Prop: [ein kleiner Mischpult-Fader, an dem er mit einer Pfote dreht]. Figur und Strich bleiben identisch.

Wiederholen für `idle`, `happy`, `awaiting`, `question`, `thinking`, `break`. Danach optional 2–4 weitere Varianten je Stimmung.

### 2d. Look-Kontrolle

> Übersicht. Prüfe dann, ob das Erkennungsmerkmal in allen Bildern gleich aussieht (Farbe, Form, Größe), und nenne Abweichungen.

---

## 3. Bestehende Pose „umziehen“ (schnellster Weg zu einem Look)

Anhängen: genau **ein** Bild, am besten ein weißes `references/ref_*.png` (für andere Posen eins aus `poses/standard/`)

> Bearbeite das angehängte Bild: Ändere **nur** [setze Lauscher eine dunkelgrüne Strickmütze auf und binde ihm ein rostrotes Halstuch um]. Pose, Gesicht, Farben, Strich und Bildausschnitt bleiben exakt gleich. Hintergrund rein weiß. Dateiname: `[songwriter]_[idle]_1.png`.

Tipp: Gemini kann Bilder gezielt bearbeiten. Für Looks ist das oft konsistenter als eine Neuzeichnung.

---

## 4. Illustration / Szene

Anhängen: 1 passende Pose aus `poses/` (das Modellblatt steckt schon im Skill)

> Erstelle eine Illustration für [den Moment, in dem das Bonus-Theme „Konzertsaal“ freigeschaltet wird]: [Lauscher verbeugt sich auf einer kleinen Bühne mit rotem Vorhang, warmes Bühnenlicht]. Querformat [16:9]. Hintergrund im selben Aquarell-Stil, sehr hell und zurückhaltend, viel Weißraum, Lauscher deutlich im Vordergrund. Kein Text. Dateiname: `scene_[unlock_concert].png`.

Weitere Szenen-Ideen:
- `scene_unlock_midnight`: Lauscher sitzt auf einem Dach unter Sternen und hört dem Nachthimmel zu (dunkelblau, `#0A0F1F` als Leitfarbe)
- `scene_milestone_trophy`: Lauscher hält stolz einen kleinen goldenen Notenschlüssel-Pokal
- `scene_welcome`: Lauscher winkt freundlich und hält eine eingerollte Notenrolle
- `scene_empty_exams`: Lauscher sitzt geduldig neben einem leeren Notenpult
- `scene_tuner`: Lauscher stimmt konzentriert eine Gitarre, ein Ohr Richtung Saiten

---

## 5. Nachbessern

> Fast gut. Bitte ändere nur: [die Augenmaske ist zu schwarz und zu scharf, sie soll weicher auslaufen wie im Modellblatt] / [der Schwanz ist abgeschnitten] / [die Kontur wirkt zu gleichmäßig, mehr Tusche-Charakter] / [der Hintergrund hat einen Schatten, bitte rein weiß]. Sonst alles exakt gleich lassen.

Häufige Abweichungen, auf die du achten solltest:
- Augenmaske zu hart oder schwarz
- Ohren innen rosa statt Koralle
- Konturen schwarz statt warm-dunkelbraun
- Figur zu „3D“ oder glänzend
- Schachbrett-Hintergrund statt Weiß
- abgeschnittene Ohren, Füße oder Schwanzspitze
- zu viele kleine Details, die bei 48 px verschwimmen

---

## 6. Übergabe

> Übersicht. Liste nur die freigegebenen Bilder mit Dateiname und einer Zeile Beschreibung auf.

Bilder dann herunterladen, nach der Liste benennen und in einen Ordner legen, z. B. `design/gemini-output/[datum]/`. Den Ordner gibst du anschließend Claude Code zum Einbauen.

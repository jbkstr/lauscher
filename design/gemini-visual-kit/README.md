# Gemini-Paket: Lauscher-Bilder & Looks

Mit diesem Paket kann Gemini neue Bilder von Lauscher erstellen (neue Posen, Looks, kleine Illustrationen), die zu Figur, Stil und Marke passen. Fertige Bilder kommen danach zurück ins Projekt, wo Claude Code sie einbaut.

## Inhalt

| Datei | Wofür |
|---|---|
| `lauscher-art-director/` | **Der Gemini-Skill**, als Ordner zum Hochladen. Darin: `SKILL.md` (der Prompt mit Name und Beschreibung), `brand-style-guide.md` (Figur, Stil, Stimmungen, technische Vorgaben, Looks, Checkliste, Dateinamen) und 6 Referenzbilder: `mascot-model-sheet.png` (8 Grundstimmungen, die wichtigste Referenz), `mascot-standard-all.png`, `mascot-metal-all.png`, `color-palette.png`, `app-icon.jpg`, `app-screenshots.png` |
| `task-prompts.md` | Fertige Prompts zum Kopieren: neue Varianten, neuer Look, Umziehen, Szenen, Nachbessern, Übergabe. Ist nur für dich gedacht und gehört nicht in den Skill. |
| `poses/standard/*.png`, `poses/metal/*.png` | Alle Posen als Einzelbilder, so wie sie in der App stecken (transparent, 128–168 px), zum Anhängen im Chat |

## Einrichten (einmalig, ca. 2 Minuten)

Gemini hat Gems im November 2026 durch **Skills** ersetzt. Ein Skill ist ein Ordner mit einer `SKILL.md` und Referenzdateien. Der Ordner `lauscher-art-director/` ist genau so ein Skill und kann direkt hochgeladen werden.

1. [gemini.google.com](https://gemini.google.com) im Browser öffnen. Hochladen geht nur dort (und in der Mac-App), nicht in der Handy-App.
2. Seitenleiste → **Customize** (ggf. erst **More**) → oben **Skills**. In der deutschen Oberfläche kann das anders heißen, z. B. „Anpassen“.
3. **Create** → **Upload** → den Ordner `lauscher-art-director` wählen → **Open**.
   - Klappt der Ordner nicht, den Ordner zippen und die ZIP-Datei hochladen. `SKILL.md` muss dabei direkt in der obersten Ebene liegen.
   - Der Ordnername muss dem Skill-Namen entsprechen (`lauscher-art-director`). Deshalb nicht umbenennen.
4. Prüfen, ob der Skill aktiv ist. Gemini nutzt ihn dann automatisch, sobald es um Lauscher geht. Gezielt aufrufen kannst du ihn im Chat mit `/` (bald `@`) und `lauscher-art-director`.

**Schon einen Gem angelegt?** Den hat Gemini automatisch in einen Skill umgewandelt. Öffne ihn auf der Skills-Seite und ersetze ihn über **More** → **Replace skill** durch den Ordner. Alternativ löschst du ihn und lädst den Ordner neu hoch.

**Nach Änderungen** am Leitfaden oder an `SKILL.md`: ebenfalls **More** → **Replace skill**.

**Ohne Skill:** In einem neuen Chat den Text von `SKILL.md` (ohne den Kopf zwischen den `---`-Zeilen) als erste Nachricht schicken und die anderen Dateien aus dem Ordner anhängen. Das musst du dann in jedem neuen Chat wiederholen.

## Arbeiten

1. Neuen Chat öffnen, mit `/` den Skill wählen und mit dem **Einstiegs-Prompt** aus `task-prompts.md` (Abschnitt 0) prüfen, ob Gemini den Kontext verstanden hat.
2. Für jede Bildaufgabe **1–3 passende Einzelbilder aus `poses/` anhängen**. Die Dateien im Skill nutzt Gemini zwar als Kontext, angehängte Bilder hält es aber deutlich genauer ein.
   - **Erst testen:** Google dokumentiert nicht, ob die Bildgenerierung mit aktivem Skill voll funktioniert (Canvas, Deep Research, Video und Musik gehen mit Skills ausdrücklich nicht). Klappt die Bildgenerierung nicht, den Weg „Ohne Skill“ nehmen.
3. Ein Bild pro Runde erzeugen lassen, bewerten, gezielt nachbessern (Abschnitt 5).
4. Für **Looks** zuerst das Brustbild (`<look>_logo.png`) als Leitbild festzurren und danach die anderen Stimmungen davon ableiten. Am schnellsten und konsistentesten ist „Umziehen“ (Abschnitt 3): ein bestehendes Bild bearbeiten lassen statt neu zeichnen.
5. Einen langen Chat pro Look verwenden, damit Gemini die bisherigen Bilder als Referenz im Verlauf behält.

## Gut zu wissen

- **Echte Transparenz kann Gemini nicht.** Deshalb verlangt der Leitfaden einen rein weißen Hintergrund. Das Freistellen übernimmt Claude Code beim Einbauen. Erscheint ein Schachbrettmuster, das Bild neu anfordern.
- **Wasserzeichen:** Je nach Abo setzt Gemini ein kleines sichtbares Symbol unten rechts. Deshalb soll die Figur dort nicht hinreichen; beim Freistellen fällt es weg. Zusätzlich steckt ein unsichtbares SynthID-Wasserzeichen im Bild, das stört nicht.
- **Auflösung:** Gemini liefert meist ca. 1024 px. In der App werden die Bilder auf ca. 168 px verkleinert. Was bei 48 px nicht mehr erkennbar ist, bringt nichts.
- Die Referenzbilder sind klein (128–168 px), weil es von den Posen keine größeren Originale im Repo gibt. Liegen die Originale noch irgendwo (z. B. in einem früheren Gemini- oder ChatGPT-Chat), sind sie als Anhang noch besser.

## Zurück ins Projekt

1. Freigegebene Bilder herunterladen und nach dem Schema `<look>_<stimmung>_<nr>.png` benennen (siehe Leitfaden, Abschnitt 7).
2. In einen Ordner legen, z. B. `design/gemini-output/2026-12-01/`.
3. Claude Code bitten, sie einzubauen. Dabei passiert:
   - weißen Hintergrund freistellen, zuschneiden, auf 168 px verkleinern
   - neue Standard-Varianten in `samples/mascot-bundle.js` ergänzen
   - für Looks ein eigenes Bundle anlegen (wie `samples/mascot-metal-bundle.js`) und das Look-System (`MASCOT_LOOKS_ENABLED`, siehe `docs/ideas.md`) darauf umstellen
   - Projekt-Check, Mobile-Bundle und Android-Sync

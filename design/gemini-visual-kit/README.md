# Gemini-Paket: Lauscher-Bilder & Looks

Mit diesem Paket kann Gemini neue Bilder von Lauscher erstellen (neue Posen, Looks, kleine Illustrationen), die zu Figur, Stil und Marke passen. Fertige Bilder kommen danach zurück ins Projekt, wo Claude Code sie einbaut.

## Inhalt

| Datei | Wofür |
|---|---|
| `gem-instructions.md` | **Der Prompt.** Kommt als Anweisung in den Gem (oder als erste Chat-Nachricht). |
| `brand-style-guide.md` | Marken- & Stilleitfaden: Figur, Stil, Stimmungen, technische Vorgaben, Looks, Checkliste, Dateinamen |
| `task-prompts.md` | Fertige Prompts zum Kopieren: neue Varianten, neuer Look, Umziehen, Szenen, Nachbessern, Übergabe. Ist nur für dich gedacht und muss nicht hochgeladen werden. |
| `references/mascot-model-sheet.png` | Die 8 Grundstimmungen, groß. Die wichtigste Referenz. |
| `references/mascot-standard-all.png` | Alle 33 Standard-Posen |
| `references/mascot-metal-all.png` | Alle 33 Metal-Posen (Vorbild für Looks) |
| `references/color-palette.png` | Farben von Figur, Icon und Themes |
| `references/app-icon.jpg` | App-Icon (bleibt unverändert) |
| `references/app-screenshots.png` | Lauscher in der App (hell, Übung, Metal) |
| `poses/standard/*.png`, `poses/metal/*.png` | Alle Posen als Einzelbilder, so wie sie in der App stecken (transparent, 128–168 px), zum Anhängen im Chat |

## Einrichten (einmalig, ca. 5 Minuten)

Am besten als **Gem**, weil Anweisung und Referenzen dann in jedem neuen Chat bereitstehen und du sie nicht jedes Mal neu hochladen musst.

1. [gemini.google.com](https://gemini.google.com) öffnen → in der Seitenleiste **Gems** (je nach Version „Gems entdecken“ oder „Gem-Manager“) → **Neues Gem**.
2. **Name:** `Lauscher Art Director`
3. **Anweisungen:** den kompletten Inhalt von `gem-instructions.md` einfügen.
4. **Wissen:** diese 7 Dateien hochladen:
   - `brand-style-guide.md`
   - `references/mascot-model-sheet.png`
   - `references/mascot-standard-all.png`
   - `references/mascot-metal-all.png`
   - `references/color-palette.png`
   - `references/app-icon.jpg`
   - `references/app-screenshots.png`
5. Speichern.

**Ohne Gem:** In einem neuen Chat den Inhalt von `gem-instructions.md` als erste Nachricht schicken und dieselben Dateien anhängen. Das musst du dann in jedem neuen Chat wiederholen.

## Arbeiten

1. Chat mit dem Gem öffnen und mit dem **Einstiegs-Prompt** aus `task-prompts.md` (Abschnitt 0) prüfen, ob Gemini den Kontext verstanden hat.
2. Für jede Bildaufgabe **1–3 passende Einzelbilder aus `poses/` anhängen**. Wissensdateien nutzt Gemini zwar als Kontext, angehängte Bilder hält es aber deutlich genauer ein.
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

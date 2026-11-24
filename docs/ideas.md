# Ideen & spätere Features

Gesammelte Pläne, die bewusst auf später verschoben sind. Neue Einträge oben anfügen.

---

## Lauscher-Looks (Accessoires für das Maskottchen)

**Status:** vorerst ausgeblendet (seit 2026-11).

### Was es bisher gab
- Im Konto (Musiker-Steckbrief) ließen sich bis zu 8 Accessoires für Lauscher auswählen: Kopfhörer, Sonnenbrille, Jazz-Barett, Konzert-Fliege, Studio-Mikro, Kaffeepause, Noten-Flair, Sternen-Glanz.
- Sichtbar waren sie nur an einigen Stellen: Startseite (Hero), Konto, Pausen-Erinnerung und „Über Lauscher“.

### Wie es abgeschaltet ist
- Ein Schalter `MASCOT_LOOKS_ENABLED = false` in [app.js](../app.js) blendet das Auswahlfeld im Konto aus und zeichnet keine Accessoires mehr.
- **Nichts wurde gelöscht:**
  - Die Optionen (`PROFILE_ACCESSORY_OPTIONS`), die Zeichnungen (`getMascotAccessorySVG`) und das Auswahl-Dropdown im Konto sind noch im Code.
  - Die gespeicherte Auswahl der Nutzer im Profil (`companionAccessories`) bleibt erhalten.
- Wieder einschalten: Schalter auf `true` setzen.

### Was später kommen soll
1. **Accessoires und Looks passend zur Instrumenten-Auswahl.** Die im Profil gewählten Instrumente (Klavier, Gitarre, Gesang, Bass, Schlagzeug, Bläser, Produktion) sollen eigene Looks freischalten oder vorschlagen, z. B. Gitarre → Gitarren-Look, Produktion → Studio-Kopfhörer.
2. **Looks wirken auf alle Lauscher-Darstellungen, außer dem Haupticon (App-Icon).** Bisher erschienen die Accessoires nur an wenigen Stellen. Künftig sollen sie überall auftauchen, wo Lauscher zu sehen ist. Aktuell sind das:
   - Startseite (Hero-Maskottchen)
   - Konto
   - Pausen-Erinnerung
   - „Über Lauscher“
   - Maskottchen in den Übungen (Stimmungen: zuhören, freuen, nachdenken …)
   - Einsing-Helfer
   - Onboarding (Sprachauswahl, Begrüßung)
   - Startanimation (Splash)

   Das App-Icon (siehe [design/app-icon-current.jpg](../design/app-icon-current.jpg)) bleibt immer unverändert.

### Hinweis
Am besten zusammen mit dem geplanten **visuellen Update** angehen, denn dann werden die Maskottchen-Grafiken ohnehin ersetzt. Die Accessoires sollten dann als Ebenen zu den neuen Grafiken passen, für alle Stimmungen.

Das lokale Meilenstein-System in [js/achievements.js](../js/achievements.js) kann später direkt als Auslöser genutzt werden, um einzelne Lauscher-Looks freizuschalten (analog zu den Bonus-Themes und Profil-Titeln).

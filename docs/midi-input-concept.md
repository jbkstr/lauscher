# Konzept & Umsetzungsstand: MIDI-Eingabe (USB & Bluetooth LE)

**Stand:** 2026-11-26 · Status: Phase 1 & Phase 2 umgesetzt

Lauscher nimmt Noten direkt von einem angeschlossenen Digitalpiano oder MIDI-Keyboard (per USB-MIDI oder Bluetooth-LE-MIDI) entgegen. Alles läuft komplett lokal auf dem Gerät ohne Aufzeichnung oder Übertragung.

## Getroffene Entscheidungen

1. **Plattformen:**
   - **Android-App (Capacitor):** Natives Plugin [scripts/android/MidiInputPlugin.java](../scripts/android/MidiInputPlugin.java) über `android.media.midi.MidiManager` (USB-MIDI & BLE-MIDI, inkl. integriertem BLE-Scanner auf die offizielle MIDI-GATT-Service-UUID `03B80E5A-EDE8-4B33-A751-6CE34EC4C700`), automatisch kopiert und registriert von [scripts/sync-android.sh](../scripts/sync-android.sh).
   - **Desktop/Android-Browser:** Web MIDI API (`navigator.requestMIDIAccess({ sysex: false })`) in Chrome, Edge, Firefox, Brave, Opera.
   - **Safari / iOS:** Freundlicher Hinweis, dass der Browser kein Web MIDI unterstützt.
2. **App-Klang & Local Control:**
   - Standardmäßig erklingen die **App-eigenen Klänge** (`appSound: true`).
   - Zusätzlich sendet Lauscher standardmäßig **MIDI `CC 122 = 0` (Local Control Off)** an verbundene MIDI-Ausgänge (`localControlOff: true`), damit das E-Piano selbst stumm bleibt, und stellt beim Deaktivieren, Hintergrundwechsel oder Schließen **`CC 122 = 127` (Local Control On)** wieder her.
3. **Notenlesen – exakte Oktave:**
   - Standardmäßig wird beim Notenlesen die **exakte notierte Oktave** verlangt (`notationExactOctave: true`), mit gezielter Rückmeldung bei falscher Oktave (z. B. *„1 Oktave zu hoch“*). Für kleine 25-Tasten-Keyboards lässt sich dies in den Einstellungen oder im MIDI-Schnellmenü umschalten.
4. **Unterstützte Bereiche (Phase 1):**
   - **Klang-Labor / Freies Spiel** (inkl. Sustain-Pedal `CC 64` & vollem 88-Tasten-Umfang)
   - **Notenlesen** (Einzelnoten in allen Schlüsseln & Doppelsystem + Akkorde gleichzeitig greifen, auch in Prüfungen)
   - **Solfège** & **Melodie-Phrasen** (auch in Prüfungen)
   - **Rhythmus • Nachklopfen** (jede MIDI-Taste löst einen Tap aus)
5. **Neue aktive MIDI-Spielübungen (Phase 2, [js/midi-play.js](../js/midi-play.js)):**
   - **Intervalle spielen** (`midi-interval`, Kategorie Intervalle, 9 Stufen, Aufwärts/Abwärts/Gemischt)
   - **Akkorde greifen** (`midi-chord`, Kategorie Akkorde, 4 Stufen inkl. Umkehrungen mit Basston-Prüfung und Vierklängen)
   - **Tonleitern & Modi spielen** (`midi-scale`, Kategorie Tonleitern & Modi, 3 Stufen inkl. aller 7 Kirchentonarten, Harmonisch/Melodisch Moll & Pentatonik)
   - Bewusst nicht in `MIX_MODE_CATALOG` (wie die Mikrofon-Übungen), aber im Übungsstand (`profile.practice`) und über „Weiterüben“ gespeichert.
6. **Aktivierung & Datenschutz:**
   - Standardmäßig **Aus** (`lauschebaer_midi_prefs_v1`, gerätespezifisch, nicht im Profil-Export), sodass beim ersten Start nie ungefragt nach MIDI-/Bluetooth-Berechtigungen gefragt wird.
   - Einrichtbar in den Einstellungen (`#midiSettingsSection`) inkl. Live-Notentester und Android-BLE-Suche sowie per unaufdringlichem MIDI-Status-Chip in unterstützten Übungen und im Freien Spiel.

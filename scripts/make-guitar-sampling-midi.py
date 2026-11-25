#!/usr/bin/env python3
"""
Erzeugt die MIDI-Aufnahmevorlage für das Gitarren-Sampling (ohne externe Bibliotheken).

Aufbau (60 BPM, 4/4 → 1 Takt = 4 s, 1 Schlag = 1 s):
  - Takt 1: Vorlauf mit Controller-Reset (keine Noten)
  - pro Ton ein Slot von 2 Takten = 8 s: Ton klingt 5 s, danach 3 s Stille zum Ausklingen
  - drei Dynamik-Layer nacheinander (eigene Spuren, zeitlich hintereinander):
      mf (Hauptlayer, Pflicht) → p (optional) → f (optional)
  - chromatisch E2 … C6 (MIDI 40 … 84) = 45 Töne pro Layer
  - jeder Ton hat einen Marker „<Layer>_<Note>“ (z. B. „mf_E2“) zum Schneiden/Benennen

Aufruf:
  python3 scripts/make-guitar-sampling-midi.py [ausgabe.mid]
"""
import struct
import sys
from pathlib import Path

PPQ = 960
BPM = 60
BEAT = PPQ
BAR = 4 * BEAT
SLOT_BARS = 2                 # 8 s pro Ton
NOTE_BEATS = 5                # 5 s gehalten, 3 s Ausklingen
LEAD_IN_BARS = 1
LAYER_GAP_BARS = 2            # Pause zwischen den Layern
NOTE_LOW, NOTE_HIGH = 40, 84  # E2 … C6
CHANNEL = 0

# (Name, Note-On-Velocity, Release-Velocity)
LAYERS = [
    ("mf", 84, 64),   # Hauptlayer: natürlicher, voller Anschlag ohne Härte
    ("p", 50, 48),    # weicher Anschlag (optional)
    ("f", 110, 72),   # kräftig, aber unter dem „Slap/Buzz“-Bereich ab ~120 (optional)
]

NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]


def note_name(midi):
    return f"{NAMES[midi % 12]}{midi // 12 - 1}"


def vlq(n):
    out = [n & 0x7F]
    n >>= 7
    while n:
        out.append((n & 0x7F) | 0x80)
        n >>= 7
    return bytes(reversed(out))


def meta(kind, data):
    return b"\xFF" + bytes([kind]) + vlq(len(data)) + data


def build_track(events):
    """events: Liste (tick, order, bytes). order sortiert gleichzeitige Events (Note-Off vor Note-On)."""
    events.sort(key=lambda e: (e[0], e[1]))
    body, last = b"", 0
    for tick, _, data in events:
        body += vlq(tick - last) + data
        last = tick
    body += vlq(0) + meta(0x2F, b"")
    return b"MTrk" + struct.pack(">I", len(body)) + body


def cc(num, val):
    return bytes([0xB0 | CHANNEL, num, val])


def reset_events(tick):
    """Neutraler Grundzustand: kein Sustain, kein Modwheel, Pitchbend Mitte, volle Expression, kein Effekt-Send."""
    seq = [
        cc(121, 0),           # Reset All Controllers
        cc(7, 100),           # Volume
        cc(10, 64),           # Pan Mitte (Stereo-Bild der Library bleibt erhalten)
        cc(11, 127),          # Expression voll
        cc(1, 0),             # Modulation aus
        cc(64, 0),            # Sustain-Pedal aus
        cc(91, 0),            # Hall-Send aus (Hall macht die App selbst)
        cc(93, 0),            # Chorus-Send aus
        bytes([0xE0 | CHANNEL, 0x00, 0x40]),  # Pitchbend Mitte
    ]
    return [(tick, i, d) for i, d in enumerate(seq)]


def main():
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("daw-sampling/guitar-recording/lauscher-guitar-sampling.mid")
    out.parent.mkdir(parents=True, exist_ok=True)

    notes = list(range(NOTE_LOW, NOTE_HIGH + 1))
    layer_len_bars = len(notes) * SLOT_BARS

    # Spur 0: Tempo, Takt, Marker
    conductor = [
        (0, 0, meta(0x03, b"Lauscher Guitar Sampling")),
        (0, 1, meta(0x51, (60_000_000 // BPM).to_bytes(3, "big"))),
        (0, 2, meta(0x58, bytes([4, 2, 24, 8]))),
    ]
    tracks = []
    cue_rows = ["layer,note,midi,velocity,start_sec,note_off_sec,slot_end_sec,file_name"]

    bar = LEAD_IN_BARS
    for li, (layer, vel, rel_vel) in enumerate(LAYERS):
        ev = [(0, 0, meta(0x03, f"Guitar {layer}{' (optional)' if li else ''}".encode()))]
        ev += [(0, 1, d) for _, _, d in reset_events(0)]
        conductor.append((bar * BAR, 3, meta(0x06, f"Layer {layer} (velocity {vel})".encode())))
        for i, midi in enumerate(notes):
            start = (bar + i * SLOT_BARS) * BAR
            end = start + NOTE_BEATS * BEAT
            ev.append((start, 20, bytes([0x90 | CHANNEL, midi, vel])))
            ev.append((end, 10, bytes([0x80 | CHANNEL, midi, rel_vel])))
            name = note_name(midi)
            conductor.append((start, 4, meta(0x06, f"{layer}_{name}".encode())))
            t0 = start / PPQ * 60 / BPM
            cue_rows.append(
                f"{layer},{name},{midi},{vel},{t0:.3f},{t0 + NOTE_BEATS:.3f},{t0 + SLOT_BARS * 4:.3f},{name}_{layer}.wav"
            )
        tracks.append(build_track(ev))
        bar += layer_len_bars + LAYER_GAP_BARS

    data = b"MThd" + struct.pack(">IHHH", 6, 1, 1 + len(tracks), PPQ)
    data += build_track(conductor) + b"".join(tracks)
    out.write_bytes(data)
    out.with_name("cue-list.csv").write_text("\n".join(cue_rows) + "\n", encoding="utf-8")

    total_sec = bar * 4
    print(f"{out}  ({len(notes)} Töne × {len(LAYERS)} Layer, Gesamtlänge {total_sec // 60}:{total_sec % 60:02d} min)")
    for li, (layer, vel, _) in enumerate(LAYERS):
        s = (LEAD_IN_BARS + li * (layer_len_bars + LAYER_GAP_BARS)) * 4
        print(f"  Layer {layer:2s} (vel {vel:3d}): ab {s // 60}:{s % 60:02d} min")


if __name__ == "__main__":
    main()

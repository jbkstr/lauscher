#!/usr/bin/env python3
"""
Übernimmt Einzeltöne aus einer fertigen SFZ-Library als Slices für scripts/build-samples.py
(statt Aufnahme + scripts/slice-samples.py).

- liest die <region>-Zuordnung (key → sample) eines MIDI-Kanals aus der .sfz
  (Standard: Kanal 1, z. B. bei der Meta Steel Guitar: tiefste Saite in der ersten Lage, ab E4 die hohe E-Saite)
- ordnet die Velocity-Gruppen nach lovel den Layern zu (3 Gruppen → p, mf, f; 1 Gruppe → mf)
- schreibt jede WAV als <Note>_<Layer>.wav (Notennamen wie in der App: C, Db, D, Eb …), Format unverändert,
  nur die Stille vor dem Anschlag wird bis auf 3 ms gekürzt (sonst klingt der Ton verspätet)

Nur Python-Standardbibliothek.

Aufruf:
  python3 scripts/import-sfz-samples.py <library.sfz> <slices-ordner> [--channel 1]
Danach:
  python3 scripts/build-samples.py <preset> <slices-ordner>
"""
import argparse
import importlib.util
import re
import sys
from pathlib import Path

_spec = importlib.util.spec_from_file_location("slicer", Path(__file__).resolve().parent / "slice-samples.py")
slicer = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(slicer)

NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
LAYER_NAMES = {1: ["mf"], 2: ["p", "mf"], 3: ["p", "mf", "f"]}


def note_name(m):
    return f"{NAMES[m % 12]}{m // 12 - 1}"


def trim_lead_in(src, dest):
    """Kürzt Stille vor dem Anschlag (gleiche Erkennung wie slice-samples.py), gibt gekürzte ms zurück."""
    w = slicer.read_wav(src)
    rate, ch = w["rate"], w["ch"]
    frames = len(w["raw"]) // w["block"]
    ms = max(1, rate // 1000)
    head, fs = slicer.decode(w, 0, min(frames, rate // 2))
    peaks = slicer.block_peaks(head, ch, ms)
    thr = 0.10 * max(peaks)
    onset = next(i for i, p in enumerate(peaks) if p >= thr)
    # rückwärts bis zum echten Beginn (über Grundrauschen bzw. −66 dBFS)
    floor = max(max(peaks[:min(5, onset)] or [0]) * 2, 10 ** (slicer.TAIL_FLOOR_DB / 20) * fs)
    while onset > 0 and peaks[onset - 1] > floor:
        onset -= 1
    start = max(0, onset * ms - int(slicer.PRE_ROLL_SEC * rate))
    slicer.write_wav(dest, w, w["raw"][start * w["block"]:])
    return start * 1000 / rate


def opcodes(line):
    return dict(re.findall(r"(\w+)=(\S+)", line))


def parse(sfz_path, channel):
    """Liefert {lovel: {key: sample_path}} für den gewünschten Kanal."""
    base = Path(sfz_path).resolve().parent
    groups, master_ok, group_vel = {}, True, None
    for raw in Path(sfz_path).read_text(encoding="utf-8", errors="replace").splitlines():
        line = raw.split("//", 1)[0].strip()
        if not line:
            continue
        if line.startswith("<master>"):
            o = opcodes(line)
            master_ok = int(o.get("lochan", 1)) <= channel <= int(o.get("hichan", 16))
            group_vel = None
        elif line.startswith("<group>"):
            group_vel = int(opcodes(line).get("lovel", 1))
        elif line.startswith("<region>") and master_ok:
            o = opcodes(line)
            key = o.get("key") or o.get("pitch_keycenter")
            if key is None or "sample" not in o:
                continue
            vel = int(o.get("lovel", group_vel or 1))
            groups.setdefault(vel, {})[int(key)] = base / o["sample"].replace("\\", "/")
    return groups


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sfz")
    ap.add_argument("out")
    ap.add_argument("--channel", type=int, default=1)
    args = ap.parse_args()

    groups = parse(args.sfz, args.channel)
    if not groups or len(groups) not in LAYER_NAMES:
        sys.exit(f"Erwartet 1–3 Velocity-Gruppen auf Kanal {args.channel}, gefunden: {len(groups)}")
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    count = 0
    for layer, vel in zip(LAYER_NAMES[len(groups)], sorted(groups)):
        keys = groups[vel]
        missing = [str(p) for p in keys.values() if not p.exists()]
        if missing:
            sys.exit(f"Fehlende Dateien, z. B. {missing[0]}")
        cut = [trim_lead_in(src, out / f"{note_name(key)}_{layer}.wav") for key, src in sorted(keys.items())]
        count += len(cut)
        print(f"  Layer {layer:2s} (ab Velocity {vel:3d}): {len(keys)} Töne, "
              f"{note_name(min(keys))}–{note_name(max(keys))}, Vorlauf gekürzt {min(cut):.0f}–{max(cut):.0f} ms")
    print(f"{count} Dateien nach {out}")


if __name__ == "__main__":
    main()

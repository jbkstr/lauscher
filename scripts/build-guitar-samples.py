#!/usr/bin/env python3
"""
Bereitet die geschnittenen Gitarren-Einzeltöne (scripts/slice-guitar-samples.py) für die App auf
und baut samples/guitar-bundle.js neu.

Pro Ton:
  - Mono-Summe (L+R)/2 (gleichmäßiges Stereobild über alle Saiten, halber RAM-Bedarf)
  - Lautstärke-Angleich: RMS der ersten 0,5 s wird auf eine glatte Zielkurve gelegt.
    Die Kurve fällt wie bei den bisherigen Samples um ~0,34 dB pro Halbton (natürlicher
    Register-Verlauf), Sprünge zwischen einzelnen Tönen/Saiten verschwinden.
    Alle drei Layer liegen auf derselben Kurve: die Lautstärke steuert weiter die Velocity
    in der Engine, der Layer bestimmt nur die Klangfarbe des Anschlags.
  - auf 3,2 s gekürzt, 0,5 s Cosinus-Ausblendung
  - AAC (m4a) mono 48 kHz, 48 kbit/s per macOS-afconvert

Ausgabe:
  samples/guitar/<Note>.m4a        Hauptlayer mf (Pflicht, wird beim Start geladen)
  samples/guitar/p/<Note>.m4a      weicher Anschlag (lädt die Engine erst bei Bedarf)
  samples/guitar/f/<Note>.m4a      kräftiger Anschlag (lädt die Engine erst bei Bedarf)
  samples/guitar-bundle.js

Aufruf:
  python3 scripts/build-guitar-samples.py <slices-ordner>
"""
import array
import base64
import importlib.util
import json
import math
import shutil
import struct
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
_spec = importlib.util.spec_from_file_location("slicer", ROOT / "scripts/slice-guitar-samples.py")
slicer = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(slicer)

LAYERS = ["mf", "p", "f"]
# Ab welcher ausdrücklich angegebenen Dynamik (0…1) die Engine p bzw. f nutzt
LAYER_RULES = {"p": {"maxDynamic": 0.40}, "f": {"minDynamic": 0.95}}
NOTE_LOW, NOTE_HIGH = 40, 84
NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

LENGTH_SEC = 3.2
FADE_SEC = 0.5
MEASURE_SEC = 0.5
TARGET_RMS_E2_DB = -13.4      # = bisheriges E2-Sample
TILT_DB_PER_SEMI = -0.336     # = Verlauf der bisherigen Samples (E2 → Db5)
PEAK_CEILING_DB = -1.0
BITRATE = 48000


def note_name(m):
    return f"{NAMES[m % 12]}{m // 12 - 1}"


def load_mono(path):
    w = slicer.read_wav(path)
    frames = len(w["raw"]) // w["block"]
    a, fs = slicer.decode(w, 0, frames)
    ch = w["ch"]
    if ch == 1:
        mono = [x / fs for x in a]
    else:
        mono = [(a[i] + a[i + 1]) * 0.5 / fs for i in range(0, len(a), ch)]
    return mono, w["rate"]


def write_wav_mono24(path, samples, rate):
    ints = array.array("i", (max(-8388608, min(8388607, int(round(x * 8388607)))) << 8 for x in samples))
    ba = ints.tobytes()
    raw = bytearray(3 * len(ints))
    raw[0::3], raw[1::3], raw[2::3] = ba[1::4], ba[2::4], ba[3::4]
    slicer.write_wav(path, {"tag": 1, "ch": 1, "rate": rate, "block": 3, "bits": 24}, bytes(raw))


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    if shutil.which("afconvert") is None:
        sys.exit("afconvert fehlt (nur auf macOS verfügbar).")

    items = []
    for layer in LAYERS:
        for m in range(NOTE_LOW, NOTE_HIGH + 1):
            p = src / f"{note_name(m)}_{layer}.wav"
            if not p.exists():
                sys.exit(f"Fehlt: {p}")
            mono, rate = load_mono(p)
            n_meas = int(MEASURE_SEC * rate)
            rms = math.sqrt(sum(x * x for x in mono[:n_meas]) / n_meas)
            target = TARGET_RMS_E2_DB + TILT_DB_PER_SEMI * (m - NOTE_LOW)
            gain_db = target - slicer.db(rms)
            peak = max(map(abs, mono[:int(LENGTH_SEC * rate)]))
            items.append({"layer": layer, "midi": m, "mono": mono, "rate": rate,
                          "gain_db": gain_db, "peak_after_db": slicer.db(peak) + gain_db})

    # Gemeinsame Absenkung, falls irgendein Ton über die Spitzen-Decke käme
    shift_db = min(0.0, PEAK_CEILING_DB - max(i["peak_after_db"] for i in items))

    out_dir = ROOT / "samples/guitar"
    for sub in ["", "p", "f"]:
        d = out_dir / sub
        d.mkdir(parents=True, exist_ok=True)
        for old in d.glob("*.m4a"):
            old.unlink()

    bundle = {"instrument": "guitar", "format": "m4a", "mime": "audio/mp4", "notes": {},
              "velocityLayers": {k: {**v, "notes": {}} for k, v in LAYER_RULES.items()}}
    with tempfile.TemporaryDirectory() as tmp:
        for it in items:
            rate = it["rate"]
            g = 10 ** ((it["gain_db"] + shift_db) / 20)
            n = min(len(it["mono"]), int(LENGTH_SEC * rate))
            seg = [x * g for x in it["mono"][:n]]
            nf = min(n, int(FADE_SEC * rate))
            for k in range(nf):
                seg[n - nf + k] *= 0.5 * (1 + math.cos(math.pi * (k + 1) / nf))
            name = note_name(it["midi"])
            wav = Path(tmp) / f"{name}_{it['layer']}.wav"
            write_wav_mono24(wav, seg, rate)
            dest = out_dir / ("" if it["layer"] == "mf" else it["layer"]) / f"{name}.m4a"
            subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", str(BITRATE), "-q", "127",
                            "-s", "0", str(wav), str(dest)], check=True)
            b64 = base64.b64encode(dest.read_bytes()).decode("ascii")
            if it["layer"] == "mf":
                bundle["notes"][name] = b64
            else:
                bundle["velocityLayers"][it["layer"]]["notes"][name] = b64

    js = ("// Automatisch generiert aus daw-sampling/guitar-recording/slices/ durch scripts/build-guitar-samples.py\n"
          "window.EARLAB_SAMPLE_PACKS = window.EARLAB_SAMPLE_PACKS || {};\n"
          f"window.EARLAB_SAMPLE_PACKS[\"guitar\"] = {json.dumps(bundle, separators=(',', ':'))};\n")
    (ROOT / "samples/guitar-bundle.js").write_text(js, encoding="utf-8")

    gains = [i["gain_db"] for i in items]
    print(f"{len(items)} Samples geschrieben, Bundle {len(js) / 1e6:.2f} MB")
    print(f"Pegelkorrektur pro Ton: {min(gains):+.1f} … {max(gains):+.1f} dB, gemeinsame Absenkung {shift_db:+.2f} dB")
    print(f"→ sampledMult der Gitarre um Faktor {10 ** (-shift_db / 20):.3f} anheben, um den bisherigen Pegel zu halten")


if __name__ == "__main__":
    main()

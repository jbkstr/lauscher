#!/usr/bin/env python3
"""
Bereitet geschnittene Einzeltöne (scripts/slice-samples.py → slices/<Note>_<Layer>.wav) für die App auf
und baut samples/<instrument>/… sowie samples/<instrument>-bundle.js neu.

Pro Ton:
  - Kanäle: Mono-Summe (L+R)/2 oder Stereo (je nach Preset)
  - Lautstärke: RMS der ersten 0,5 s (Kanal-Mittel) wird auf eine Zielkurve gelegt
      "tilt":   glatte Gerade (dB pro Halbton), Ausgangspunkt TARGET_DB beim tiefsten Ton
      "smooth": Verlauf der Library selbst (gleitender Mittelwert über ±N Halbtöne), nur Ausreißer werden
                geglättet; Gesamtpegel so, dass der Mittelwert im Kernbereich TARGET_DB entspricht
    Alle Layer liegen auf derselben Kurve: die Lautstärke steuert weiter die Velocity in der Engine,
    der Layer bestimmt nur die Klangfarbe des Anschlags.
  - gekürzt + Cosinus-Ausblendung, AAC (m4a) per macOS-afconvert
  - gemeinsame Absenkung, falls irgendein Ton über −1 dBFS Spitze käme (wird als Faktor für sampledMult gemeldet)

Ausgabe:
  samples/<instrument>/<Note>.m4a          Hauptlayer mf (wird beim Start geladen)
  samples/<instrument>/<layer>/<Note>.m4a  weitere Layer (lädt die Engine erst bei Bedarf, siehe velocityLayers)
  samples/<instrument>-bundle.js

Aufruf:
  python3 scripts/build-samples.py <preset> <slices-ordner>
Danach: scripts/samples.sh push  (Samples liegen im privaten Repo)
"""
import array
import base64
import importlib.util
import json
import math
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
_spec = importlib.util.spec_from_file_location("slicer", ROOT / "scripts/slice-samples.py")
slicer = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(slicer)

NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
MEASURE_SEC = 0.5
PEAK_CEILING_DB = -1.0

PRESETS = {
    "guitar": {
        "source": "daw-sampling/guitar-recording/slices/",
        "channels": 1,
        "bitrate": 48000,
        "level": {"mode": "tilt", "target_db": -13.4, "tilt_db_per_semi": -0.336},
        # Layer: Noten (MIDI), Länge, Ausblendung; Regeln für die Engine (nur Zusatz-Layer)
        "layers": {
            "mf": {"notes": range(40, 85), "length": 3.2, "fade": 0.5},
            "p": {"notes": range(40, 85), "length": 3.2, "fade": 0.5, "rule": {"maxDynamic": 0.40}},
            "f": {"notes": range(40, 85), "length": 3.2, "fade": 0.5, "rule": {"minDynamic": 0.95}},
        },
    },
    "piano": {
        "source": "Accurate-Salamander Grand Piano (CC BY 3.0) via daw-sampling/piano-recording/slices/",
        "channels": 2,          # Stereo: die Mikrofone sind teils gegenphasig, eine Mono-Summe würde Töne auslöschen
        "bitrate": 96000,
        # Kernbereich C2…C6 im Mittel so laut wie die bisherigen Klavier-Samples (−14,8 dB RMS)
        "level": {"mode": "smooth", "target_db": -14.8, "core": (36, 84), "smooth_semis": 3},
        "layers": {
            "mf": {"notes": range(24, 97, 2), "length": 4.0, "fade": 0.8},                          # C1…C7, Ganztöne
            "p": {"notes": range(36, 85, 3), "length": 3.5, "fade": 0.7, "rule": {"maxDynamic": 0.40}},  # C2…C6, kl. Terzen
            "f": {"notes": range(36, 85, 3), "length": 3.5, "fade": 0.7, "rule": {"minDynamic": 0.95}},
        },
    },
}


def note_name(m):
    return f"{NAMES[m % 12]}{m // 12 - 1}"


def load(path, channels):
    w = slicer.read_wav(path)
    frames = len(w["raw"]) // w["block"]
    a, fs = slicer.decode(w, 0, frames)
    ch = w["ch"]
    if ch == 1:
        mono = [x / fs for x in a]
        chans = [mono] if channels == 1 else [mono, mono]
    elif channels == 1:
        chans = [[(a[i] + a[i + 1]) * 0.5 / fs for i in range(0, len(a), ch)]]
    else:
        chans = [[x / fs for x in a[0::ch]], [x / fs for x in a[1::ch]]]
    return chans, w["rate"]


def rms_db(chans, n):
    e = sum(sum(x * x for x in c[:n]) for c in chans) / (len(chans) * n)
    return 10 * math.log10(max(e, 1e-20))


def write_wav24(path, chans, rate):
    n = len(chans[0])
    inter = [chans[k][i] for i in range(n) for k in range(len(chans))]
    ints = array.array("i", (max(-8388608, min(8388607, int(round(x * 8388607)))) << 8 for x in inter))
    ba = ints.tobytes()
    raw = bytearray(3 * len(ints))
    raw[0::3], raw[1::3], raw[2::3] = ba[1::4], ba[2::4], ba[3::4]
    nch = len(chans)
    slicer.write_wav(path, {"tag": 1, "ch": nch, "rate": rate, "block": 3 * nch, "bits": 24}, bytes(raw))


def main():
    if len(sys.argv) < 3 or sys.argv[1] not in PRESETS:
        sys.exit(__doc__)
    inst = sys.argv[1]
    cfg = PRESETS[inst]
    src = Path(sys.argv[2])
    if shutil.which("afconvert") is None:
        sys.exit("afconvert fehlt (nur auf macOS verfügbar).")
    lv = cfg["level"]

    # 1) Laden + Lautheit messen
    items = []
    for layer, lc in cfg["layers"].items():
        for m in lc["notes"]:
            p = src / f"{note_name(m)}_{layer}.wav"
            if not p.exists():
                sys.exit(f"Fehlt: {p}")
            chans, rate = load(p, cfg["channels"])
            items.append({"layer": layer, "midi": m, "chans": chans, "rate": rate,
                          "loud": rms_db(chans, int(MEASURE_SEC * rate))})
            print(f"\r  geladen: {len(items)}", end="", flush=True)
    print()

    # 2) Zielkurve pro MIDI-Note
    if lv["mode"] == "tilt":
        low = min(i["midi"] for i in items)
        target = lambda m: lv["target_db"] + lv["tilt_db_per_semi"] * (m - low)  # noqa: E731
    else:
        # Verlauf der Hauptlayer-Lautheit, über ±N Halbtöne geglättet (alle mf-Töne, auch außerhalb der Auswahl)
        mf_loud = {}
        for f in sorted(src.glob("*_mf.wav")):
            m = slicer_note_to_midi(f.stem[:-3])
            if m is None:
                continue
            chans, rate = load(f, cfg["channels"])
            mf_loud[m] = rms_db(chans, int(MEASURE_SEC * rate))
        k = lv["smooth_semis"]
        smooth = {m: sum(mf_loud[j] for j in mf_loud if abs(j - m) <= k) / sum(1 for j in mf_loud if abs(j - m) <= k)
                  for m in mf_loud}
        lo, hi = lv["core"]
        core = [smooth[m] for m in smooth if lo <= m <= hi]
        offset = lv["target_db"] - sum(core) / len(core)
        target = lambda m: smooth[m] + offset  # noqa: E731

    for it in items:
        it["gain_db"] = target(it["midi"]) - it["loud"]
        n = int(cfg["layers"][it["layer"]]["length"] * it["rate"])
        peak = max(max(map(abs, c[:n])) for c in it["chans"])
        it["peak_after_db"] = slicer.db(peak) + it["gain_db"]
    shift_db = min(0.0, PEAK_CEILING_DB - max(i["peak_after_db"] for i in items))

    # 3) Schreiben
    out_dir = ROOT / "samples" / inst
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)
    bundle = {"instrument": inst, "format": "m4a", "mime": "audio/mp4", "notes": {}}
    extra = {k: v for k, v in cfg["layers"].items() if k != "mf"}
    if extra:
        bundle["velocityLayers"] = {k: {**v["rule"], "notes": {}} for k, v in extra.items()}
    with tempfile.TemporaryDirectory() as tmp:
        for idx, it in enumerate(items, 1):
            lc = cfg["layers"][it["layer"]]
            rate = it["rate"]
            g = 10 ** ((it["gain_db"] + shift_db) / 20)
            n = min(len(it["chans"][0]), int(lc["length"] * rate))
            nf = min(n, int(lc["fade"] * rate))
            out = []
            for c in it["chans"]:
                seg = [x * g for x in c[:n]]
                for j in range(nf):
                    seg[n - nf + j] *= 0.5 * (1 + math.cos(math.pi * (j + 1) / nf))
                out.append(seg)
            name = note_name(it["midi"])
            wav = Path(tmp) / f"{name}_{it['layer']}.wav"
            write_wav24(wav, out, rate)
            dest_dir = out_dir if it["layer"] == "mf" else out_dir / it["layer"]
            dest_dir.mkdir(exist_ok=True)
            dest = dest_dir / f"{name}.m4a"
            subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", str(cfg["bitrate"]), "-q", "127",
                            "-s", "0", str(wav), str(dest)], check=True)
            b64 = base64.b64encode(dest.read_bytes()).decode("ascii")
            if it["layer"] == "mf":
                bundle["notes"][name] = b64
            else:
                bundle["velocityLayers"][it["layer"]]["notes"][name] = b64
            print(f"\r  kodiert: {idx}/{len(items)}", end="", flush=True)
    print()

    js = (f"// Automatisch generiert durch scripts/build-samples.py {inst} – Quelle: {cfg['source']}\n"
          "window.EARLAB_SAMPLE_PACKS = window.EARLAB_SAMPLE_PACKS || {};\n"
          f"window.EARLAB_SAMPLE_PACKS[\"{inst}\"] = {json.dumps(bundle, separators=(',', ':'))};\n")
    (ROOT / f"samples/{inst}-bundle.js").write_text(js, encoding="utf-8")

    gains = [i["gain_db"] for i in items]
    secs = sum(min(len(i["chans"][0]) / i["rate"], cfg["layers"][i["layer"]]["length"]) for i in items if i["layer"] == "mf")
    mb = secs * 48000 * cfg["channels"] * 4 / 1e6
    print(f"{len(items)} Samples, Bundle {len(js) / 1e6:.2f} MB, RAM Hauptlayer ≈ {mb:.0f} MB (decodiert, 48 kHz)")
    print(f"Pegelkorrektur pro Ton: {min(gains):+.1f} … {max(gains):+.1f} dB, gemeinsame Absenkung {shift_db:+.2f} dB")
    if shift_db < 0:
        print(f"→ sampledMult von {inst} um Faktor {10 ** (-shift_db / 20):.3f} anheben, um den Zielpegel zu halten")


def slicer_note_to_midi(name):
    import re
    mm = re.match(r"^([A-G]b?)(-?\d)$", name)
    if not mm or mm.group(1) not in NAMES:
        return None
    return (int(mm.group(2)) + 1) * 12 + NAMES.index(mm.group(1))


if __name__ == "__main__":
    main()

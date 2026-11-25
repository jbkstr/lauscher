#!/usr/bin/env python3
"""
Zerlegt den langen Gitarren-Export (eine WAV-Datei aus lauscher-guitar-sampling.mid) in Einzeltöne.

- liest die Zeiten aus cue-list.csv (Zeit 0 = Anfang der Datei, inkl. 1 Takt Vorlauf)
- findet pro Ton den echten Anschlag (gleicht DAW-/Plugin-Latenz automatisch aus)
- schneidet ab Anschlag − 3 ms bis kurz vor den nächsten Slot, kürzt Stille am Ende,
  setzt ein Fade-out (50 ms) und schreibt <Note>_<Layer>.wav im Originalformat
- prüft Pegel: fehlende Töne, Clipping, auffällig laute/leise Ausreißer

Nur Python-Standardbibliothek. Unterstützt WAV PCM 16/24/32 Bit und Float 32 Bit.

Aufruf:
  python3 scripts/slice-guitar-samples.py <export.wav> [--cues cue-list.csv] [--out ordner]
"""
import argparse
import array
import csv
import math
import struct
import sys
from pathlib import Path

PRE_ROLL_SEC = 0.003       # so viel vor dem Anschlag stehen lassen
SEARCH_BEFORE_SEC = 0.25   # Anschlag-Suche vor der Soll-Zeit
SEARCH_AFTER_SEC = 0.60    # … und danach (Plugin-Latenz, weiche Anschläge)
SLOT_GUARD_SEC = 0.10      # Abstand zum nächsten Slot
FADE_SEC = 0.05
TAIL_FLOOR_DB = -66.0      # darunter gilt das Ende als Stille
SILENT_DB = -50.0          # Ton fehlt, wenn die Spitze darunter liegt


# ---------- WAV lesen/schreiben ----------

def read_wav(path):
    data = Path(path).read_bytes()
    if data[:4] != b"RIFF" or data[8:12] != b"WAVE":
        sys.exit("Keine WAV-Datei (RIFF/WAVE erwartet).")
    pos, fmt, raw = 12, None, None
    while pos + 8 <= len(data):
        cid = data[pos:pos + 4]
        size = struct.unpack("<I", data[pos + 4:pos + 8])[0]
        body = data[pos + 8:pos + 8 + size]
        if cid == b"fmt ":
            fmt = body
        elif cid == b"data":
            raw = body
        pos += 8 + size + (size & 1)
    if fmt is None or raw is None:
        sys.exit("WAV ohne fmt- oder data-Block.")
    tag, ch, rate, _, block, bits = struct.unpack("<HHIIHH", fmt[:16])
    if tag == 0xFFFE and len(fmt) >= 26:  # WAVE_FORMAT_EXTENSIBLE
        tag = struct.unpack("<H", fmt[24:26])[0]
    if (tag, bits) not in {(1, 16), (1, 24), (1, 32), (3, 32)}:
        sys.exit(f"Nicht unterstütztes Format (Tag {tag}, {bits} Bit). Bitte als PCM 24 Bit exportieren.")
    return {"tag": tag, "ch": ch, "rate": rate, "block": block, "bits": bits, "raw": raw}


def decode(w, start_frame, end_frame):
    """Gibt (array, full_scale) zurück: interleavte Samples als Zahlen."""
    b = w["block"]
    raw = w["raw"][start_frame * b:end_frame * b]
    if w["tag"] == 3:
        return array.array("f", raw), 1.0
    if w["bits"] == 16:
        return array.array("h", raw), 32768.0
    if w["bits"] == 32:
        return array.array("i", raw), 2147483648.0
    n = len(raw) // 3  # 24 Bit → in die oberen 3 Bytes eines int32 schieben
    ba = bytearray(4 * n)
    ba[1::4], ba[2::4], ba[3::4] = raw[0::3], raw[1::3], raw[2::3]
    return array.array("i", bytes(ba)), 2147483648.0


def encode(w, arr):
    if w["tag"] == 3 or w["bits"] in (16, 32):
        return arr.tobytes()
    ba = arr.tobytes()
    out = bytearray(3 * len(arr))
    out[0::3], out[1::3], out[2::3] = ba[1::4], ba[2::4], ba[3::4]
    return bytes(out)


def write_wav(path, w, raw):
    fmt = struct.pack("<HHIIHH", w["tag"], w["ch"], w["rate"], w["rate"] * w["block"], w["block"], w["bits"])
    body = b"WAVE" + b"fmt " + struct.pack("<I", len(fmt)) + fmt + b"data" + struct.pack("<I", len(raw)) + raw
    if len(raw) & 1:
        body += b"\x00"
    Path(path).write_bytes(b"RIFF" + struct.pack("<I", len(body)) + body)


def db(x):
    return 20 * math.log10(x) if x > 0 else -999.0


def block_peaks(arr, ch, frames_per_block):
    step = ch * frames_per_block
    return [max(map(abs, arr[i:i + step]), default=0) for i in range(0, len(arr), step)]


# ---------- Schneiden ----------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("wav")
    ap.add_argument("--cues", default=str(Path(__file__).resolve().parent.parent / "daw-sampling/guitar-recording/cue-list.csv"))
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    w = read_wav(args.wav)
    rate, ch = w["rate"], w["ch"]
    total_frames = len(w["raw"]) // w["block"]
    out_dir = Path(args.out) if args.out else Path(args.wav).resolve().parent / "slices"
    out_dir.mkdir(parents=True, exist_ok=True)
    cues = list(csv.DictReader(open(args.cues, encoding="utf-8")))
    print(f"{args.wav}: {rate} Hz, {w['bits']} Bit{' float' if w['tag'] == 3 else ''}, {ch} Kanal/Kanäle, "
          f"{total_frames / rate / 60:.2f} min  →  {len(cues)} Töne")

    last_slot_end = max(float(c["slot_end_sec"]) for c in cues)
    if total_frames / rate < last_slot_end - 3:
        print(f"⚠️  Datei ist kürzer ({total_frames / rate:.1f} s) als die Vorlage ({last_slot_end:.1f} s). "
              "Fehlt der Vorlauf oder das Ende? Töne außerhalb der Datei werden übersprungen.")

    ms = max(1, rate // 1000)
    results = []
    for c in cues:
        t0, t_end = float(c["start_sec"]), float(c["slot_end_sec"])
        a = max(0, int((t0 - SEARCH_BEFORE_SEC) * rate))
        b = min(total_frames, int((t_end - SLOT_GUARD_SEC) * rate))
        if b - a < rate:
            results.append({**c, "status": "fehlt (außerhalb der Datei)"})
            continue
        arr, fs = decode(w, a, b)
        peaks = block_peaks(arr, ch, ms)  # 1-ms-Spitzen
        peak = max(peaks) / fs
        if db(peak) < SILENT_DB:
            results.append({**c, "status": f"STILL ({db(peak):.1f} dBFS)", "peak_db": db(peak)})
            continue
        # Anschlag: erster ms-Block über 10 % der Ton-Spitze im Suchfenster
        search_end = min(len(peaks), int((SEARCH_BEFORE_SEC + SEARCH_AFTER_SEC) * 1000))
        thr = 0.10 * max(peaks)
        onset_ms = next((i for i in range(search_end) if peaks[i] >= thr), None)
        if onset_ms is None:
            results.append({**c, "status": "kein Anschlag im Suchfenster", "peak_db": db(peak)})
            continue
        # vom Schwellen-Block rückwärts bis zum echten Beginn (über dem Grundrauschen)
        noise = max(peaks[:min(50, onset_ms)] or [0])
        floor = max(noise * 2, 10 ** (TAIL_FLOOR_DB / 20) * fs)
        while onset_ms > 0 and peaks[onset_ms - 1] > floor:
            onset_ms -= 1
        start_rel = max(0, onset_ms * ms - int(PRE_ROLL_SEC * rate))
        # Ende: letzter Block über der Stille-Schwelle (+ Fade)
        tail_thr = 10 ** (TAIL_FLOOR_DB / 20) * fs
        last = len(peaks) - 1
        while last > onset_ms and peaks[last] < tail_thr:
            last -= 1
        end_rel = min(len(arr) // ch, (last + 1) * ms + int(FADE_SEC * rate))
        seg = arr[start_rel * ch:end_rel * ch]
        n_fade = min(int(FADE_SEC * rate), len(seg) // ch)
        is_float = w["tag"] == 3
        for f in range(n_fade):
            g = 0.5 * (1 + math.cos(math.pi * (f + 1) / n_fade))  # Cosinus-Fade bis 0
            idx = (len(seg) // ch - n_fade + f) * ch
            for k in range(ch):
                v = seg[idx + k] * g
                seg[idx + k] = v if is_float else int(v)
        name = c["file_name"]
        write_wav(out_dir / name, w, encode(w, seg))
        offset_ms = (a / rate + onset_ms / 1000 - t0) * 1000
        results.append({**c, "status": "ok", "peak_db": db(peak), "offset_ms": offset_ms,
                        "len_sec": len(seg) / ch / rate})

    # ---------- Bericht ----------
    print(f"\n{'Datei':12s} {'Spitze':>8s} {'Versatz':>8s} {'Länge':>6s}  Hinweis")
    ok = [r for r in results if r["status"] == "ok"]
    offsets = sorted(r["offset_ms"] for r in ok)
    med_off = offsets[len(offsets) // 2] if offsets else 0
    warnings = 0
    for r in results:
        if r["status"] != "ok":
            print(f"{r['file_name']:12s} {'':>8s} {'':>8s} {'':>6s}  ⚠️  {r['status']}")
            warnings += 1
            continue
        hints = []
        if r["peak_db"] > -0.3:
            hints.append("CLIPPING-Gefahr")
        if abs(r["offset_ms"] - med_off) > 40:
            hints.append("Anschlag weicht ab")
        if r["len_sec"] < 1.5:
            hints.append("sehr kurz")
        warnings += bool(hints)
        print(f"{r['file_name']:12s} {r['peak_db']:7.1f}dB {r['offset_ms']:6.0f}ms {r['len_sec']:5.1f}s  {'⚠️  ' + ', '.join(hints) if hints else ''}")

    print(f"\n{len(ok)}/{len(results)} Töne geschrieben nach {out_dir}")
    if ok:
        print(f"Typischer Versatz zur MIDI-Zeit: {med_off:.0f} ms (DAW-/Plugin-Latenz, wird ausgeglichen)")
        for layer in dict.fromkeys(r["layer"] for r in ok):
            p = [r["peak_db"] for r in ok if r["layer"] == layer]
            print(f"  Layer {layer:2s}: Spitzen {min(p):6.1f} … {max(p):5.1f} dBFS")
    print("Keine Auffälligkeiten." if warnings == 0 else f"{warnings} Hinweis(e), bitte prüfen.")


if __name__ == "__main__":
    main()

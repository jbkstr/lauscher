#!/usr/bin/env python3
"""
Statische Prüfung auf Namen, die es im gemeinsamen globalen Scope nicht gibt (leichtgewichtiges „no-undef“).

Alle Skripte teilen sich einen globalen Scope und rufen sich gegenseitig auf. Ein Tippfehler oder eine
umbenannte Funktion fällt deshalb erst zur Laufzeit auf (ReferenceError) – oder gar nicht, wenn der Aufruf
hinter `typeof name === "function"` steckt. Diese Prüfung findet beides ohne npm/ESLint:

  1. Aufrufe `name(...)` bzw. `new Name(...)`, deren Name nirgends deklariert ist
  2. `typeof name === "function"`-Guards auf Namen, die nirgends deklariert sind

Bewusst grob: Ein Name gilt als deklariert, sobald er in irgendeiner Datei als Funktion, Variable, Klasse,
Parameter oder Destrukturierung vorkommt. Das übersieht seltene Fälle, meldet dafür praktisch nie falsch.

Nutzung: von scripts/check-project.py aufgerufen (check_undefined_identifiers) oder direkt:
    python3 scripts/check_identifiers.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

# JS-Schlüsselwörter, die vor „(“ stehen können
JS_KEYWORDS = {
    "if", "for", "while", "switch", "catch", "function", "return", "typeof", "new", "delete", "void",
    "await", "yield", "with", "in", "of", "instanceof", "do", "else", "try", "finally", "throw", "case",
    "super", "this", "import", "class", "extends", "const", "let", "var", "async", "get", "set", "static",
}

# Globale Namen der Laufzeit (JavaScript-Standard & Browser-APIs)
KNOWN_GLOBALS = {
    # JavaScript
    "Array", "ArrayBuffer", "BigInt", "Boolean", "DataView", "Date", "Error", "EvalError", "Float32Array",
    "Float64Array", "Function", "Infinity", "Int16Array", "Int32Array", "Int8Array", "Intl", "JSON", "Map",
    "Math", "NaN", "Number", "Object", "Promise", "Proxy", "RangeError", "ReferenceError", "Reflect", "RegExp",
    "Set", "String", "Symbol", "SyntaxError", "TypeError", "URIError", "Uint16Array", "Uint32Array",
    "Uint8Array", "Uint8ClampedArray", "WeakMap", "WeakRef", "WeakSet", "decodeURI", "decodeURIComponent",
    "encodeURI", "encodeURIComponent", "escape", "eval", "globalThis", "isFinite", "isNaN", "parseFloat",
    "parseInt", "undefined", "unescape", "queueMicrotask", "structuredClone", "AggregateError",
    # Browser
    "window", "self", "document", "navigator", "location", "history", "screen", "localStorage",
    "sessionStorage", "performance", "console", "crypto", "fetch", "alert", "confirm", "prompt",
    "setTimeout", "clearTimeout", "setInterval", "clearInterval", "requestAnimationFrame",
    "cancelAnimationFrame", "requestIdleCallback", "cancelIdleCallback", "getComputedStyle", "matchMedia",
    "atob", "btoa", "AudioContext", "webkitAudioContext", "OfflineAudioContext", "AudioBuffer",
    "AudioWorkletNode", "AnalyserNode", "GainNode", "OscillatorNode", "MediaStream", "MediaRecorder",
    "MutationObserver", "ResizeObserver", "IntersectionObserver", "FileReader", "Blob", "File", "URL",
    "URLSearchParams", "Image", "Audio", "Event", "CustomEvent", "KeyboardEvent", "PointerEvent",
    "MouseEvent", "TouchEvent", "HTMLElement", "Element", "Node", "NodeList", "DOMParser", "XMLSerializer",
    "TextEncoder", "TextDecoder", "Notification", "AbortController", "Headers", "Request", "Response",
    "Worker", "Path2D", "DOMRect", "DOMMatrix", "CSS", "FontFace", "ClipboardItem", "BroadcastChannel",
    "caches", "indexedDB", "visualViewport", "devicePixelRatio", "innerWidth", "innerHeight", "Capacitor",
    "importScripts", "clients", "registration", "skipWaiting",
}

IDENT = r"[A-Za-z_$][\w$]*"
REGEX_PREV_CHARS = set("(,=:[!&|?{};+-*%<>~^")
REGEX_PREV_WORDS = {"return", "typeof", "case", "do", "else", "in", "of", "new", "delete", "void", "throw", "yield", "await"}


def strip_js(src: str) -> str:
    """Entfernt Kommentare, String-/Regex-Inhalte und Template-Text, behält aber ${…}-Ausdrücke als Code.
    Zeilenumbrüche bleiben erhalten, damit Zeilennummern stimmen."""
    out: list[str] = []
    i, n = 0, len(src)
    template_depth: list[int] = []  # Klammertiefe je offenem ${ … } in Template-Literalen
    brace_depth = 0

    def last_significant() -> str:
        j = len(out) - 1
        while j >= 0 and out[j] in " \t\r\n":
            j -= 1
        if j < 0:
            return ""
        if re.match(r"[\w$]", out[j]):
            k = j
            while k >= 0 and re.match(r"[\w$]", out[k]):
                k -= 1
            return "".join(out[k + 1:j + 1])
        return out[j]

    def skip_template(start: int) -> int:
        """Liest Template-Text ab start (nach ` bzw. }) bis ` oder ${; gibt neue Position zurück."""
        k = start
        while k < n:
            ch = src[k]
            if ch == "\\":
                k += 2
                continue
            if ch == "`":
                out.append("`")
                return k + 1
            if ch == "$" and k + 1 < n and src[k + 1] == "{":
                out.append("${")
                template_depth.append(brace_depth)
                return k + 2
            if ch == "\n":
                out.append("\n")
            k += 1
        return k

    while i < n:
        c = src[i]
        nxt = src[i + 1] if i + 1 < n else ""
        if c == "/" and nxt == "/":
            while i < n and src[i] != "\n":
                i += 1
            continue
        if c == "/" and nxt == "*":
            end = src.find("*/", i + 2)
            end = n if end < 0 else end + 2
            out.append("\n" * src.count("\n", i, end))
            i = end
            continue
        if c in ("'", '"'):
            q = c
            i += 1
            while i < n and src[i] != q and src[i] != "\n":
                i += 2 if src[i] == "\\" else 1
            out.append(q + q)
            i += 1
            continue
        if c == "`":
            out.append("`")
            i = skip_template(i + 1)
            continue
        if c == "/":
            prev = last_significant()
            if prev == "" or prev in REGEX_PREV_CHARS or prev in REGEX_PREV_WORDS:
                i += 1
                in_class = False
                while i < n and src[i] != "\n":
                    ch = src[i]
                    if ch == "\\":
                        i += 2
                        continue
                    if ch == "[":
                        in_class = True
                    elif ch == "]":
                        in_class = False
                    elif ch == "/" and not in_class:
                        break
                    i += 1
                i += 1
                while i < n and re.match(r"[a-z]", src[i]):
                    i += 1
                out.append("/r/")
                continue
        if c == "{":
            brace_depth += 1
        elif c == "}":
            if template_depth and template_depth[-1] == brace_depth:
                template_depth.pop()
                out.append("}")
                i = skip_template(i + 1)
                continue
            brace_depth -= 1
        out.append(c)
        i += 1
    return "".join(out)


def find_matching_paren(code: str, open_idx: int) -> int:
    depth = 0
    for k in range(open_idx, len(code)):
        ch = code[k]
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
            if depth == 0:
                return k
    return -1


def brace_depths(code: str) -> list[int]:
    """Klammertiefe { } vor jeder Position (0 = oberste Ebene der Datei)."""
    depths = [0] * (len(code) + 1)
    d = 0
    for i, ch in enumerate(code):
        depths[i] = d
        if ch == "{":
            d += 1
        elif ch == "}":
            d = max(0, d - 1)
    depths[len(code)] = d
    return depths


def collect_declared(code: str) -> tuple[set[str], set[str]]:
    """Liefert (globale Namen, lokale Namen) einer Datei.
    Global = auf oberster Ebene deklariert (gemeinsamer Scope aller Skripte) oder window.X = …;
    lokal = in Funktionen/Blöcken, Parameter usw. (gelten nur innerhalb dieser Datei)."""
    depths = brace_depths(code)
    glob: set[str] = set()
    local: set[str] = set()

    def add(name: str, pos: int) -> None:
        (glob if depths[pos] == 0 else local).add(name)

    for m in re.finditer(rf"\bfunction\s*\*?\s*({IDENT})", code):
        add(m.group(1), m.start())
    for m in re.finditer(rf"\b(?:const|let|var|class)\s+({IDENT})", code):
        add(m.group(1), m.start())
    # Mehrfach-Deklarationen: let a = 1, b = 2;
    for m in re.finditer(r"\b(?:const|let|var)\s+([^;]*?)(?:;|\n)", code):
        for n in re.findall(rf"(?:^|,)\s*({IDENT})\s*(?==|,|$)", m.group(1)):
            add(n, m.start())
    # Destrukturierung: const { a, b: c } = …; const [x, y] = …
    for m in re.finditer(r"\b(?:const|let|var)\s*([\{\[][^=]*?[\}\]])\s*=", code, re.S):
        for n in re.findall(IDENT, m.group(1)):
            add(n, m.start())
    # Parameter von Funktionen, Methoden & Pfeilfunktionen (immer lokal)
    for m in re.finditer(rf"\bfunction\s*\*?\s*(?:{IDENT})?\s*\(", code):
        end = find_matching_paren(code, m.end() - 1)
        if end > 0:
            local.update(re.findall(IDENT, code[m.end():end]))
    for m in re.finditer(r"\)\s*=>", code):
        depth, k = 0, m.start()
        while k >= 0:
            ch = code[k]
            if ch == ")":
                depth += 1
            elif ch == "(":
                depth -= 1
                if depth == 0:
                    break
            k -= 1
        if k >= 0:
            local.update(re.findall(IDENT, code[k + 1:m.start()]))
    local.update(re.findall(rf"({IDENT})\s*=>", code))
    local.update(re.findall(rf"\bcatch\s*\(\s*({IDENT})", code))
    # Methoden-Definitionen in Klassen/Objekten: name(params) { … }
    for m in re.finditer(rf"(?<![.\w$])({IDENT})\s*\(", code):
        if m.group(1) in JS_KEYWORDS:
            continue  # if (…) { … } ist keine Methode
        end = find_matching_paren(code, m.end() - 1)
        if end > 0 and re.match(r"\s*\{", code[end + 1:end + 4]):
            local.update(re.findall(IDENT, code[m.end():end]))
    # Globale Zuweisungen: window.X = … / globalThis.X = … / self.X = …
    glob.update(re.findall(rf"\b(?:window|globalThis|self)\.({IDENT})\s*=(?!=)", code))
    return glob, local


def find_issues(root: Path, scripts: list[str]) -> list[str]:
    stripped: dict[str, str] = {}
    locals_by_file: dict[str, set[str]] = {}
    globals_all: set[str] = set()
    for rel in scripts:
        path = root / rel
        if not path.is_file() or not rel.endswith(".js"):
            continue
        code = strip_js(path.read_text(encoding="utf-8"))
        stripped[rel] = code
        glob, local = collect_declared(code)
        globals_all |= glob
        locals_by_file[rel] = local
    base_known = globals_all | KNOWN_GLOBALS | JS_KEYWORDS

    issues: list[str] = []
    seen: set[tuple[str, str]] = set()
    for rel, code in stripped.items():
        known = base_known | locals_by_file[rel]
        for m in re.finditer(rf"(?<![.\w$])({IDENT})\s*\(", code):
            name = m.group(1)
            if name in known:
                continue
            end = find_matching_paren(code, m.end() - 1)
            if end > 0 and re.match(r"\s*\{", code[end + 1:end + 4]):
                continue  # Methoden-Definition, kein Aufruf
            key = (rel, name)
            if key in seen:
                continue
            seen.add(key)
            line = code.count("\n", 0, m.start()) + 1
            issues.append(f"{rel}:{line}: Aufruf von „{name}()“, aber „{name}“ ist global nirgends deklariert")
        # typeof-Guards im Original prüfen (im bereinigten Code ist der Vergleichs-String leer)
        src = (root / rel).read_text(encoding="utf-8")
        for m in re.finditer(rf"\btypeof\s+({IDENT})\s*[!=]==?\s*[\"']function[\"']", src):
            name = m.group(1)
            if name in known:
                continue
            line = src.count("\n", 0, m.start()) + 1
            issues.append(f"{rel}:{line}: Guard „typeof {name} === \"function\"“ auf global nirgends deklarierten Namen")
    return issues


def find_dead_dom_ids(root: Path, scripts: list[str], index_html: str) -> list[str]:
    """getElementById("x") / querySelector("#x") auf IDs, die weder in index.html noch in per JS erzeugtem
    HTML vorkommen (Überbleibsel entfernter Elemente)."""
    app_scripts = [s for s in scripts if s.endswith(".js") and not s.startswith("samples/") and (root / s).is_file()]
    sources = {rel: (root / rel).read_text(encoding="utf-8") for rel in app_scripts}
    all_js = "\n".join(sources.values())

    ids = set(re.findall(r'\bid="([^"$]+)"', index_html))
    ids |= set(re.findall(r'\bid=\\?"([\w-]+)\\?"', all_js))
    ids |= set(re.findall(r"\bid='([\w-]+)'", all_js))
    ids |= set(re.findall(r'\.id\s*=\s*["\']([\w-]+)["\']', all_js))
    ids |= set(re.findall(r'\bid:\s*["\']([\w-]+)["\']', all_js))
    # Dynamische IDs wie id="barCard_${i}" → Präfix gilt als vorhanden
    dyn_prefixes = set(re.findall(r'\bid=\\?"([\w-]+)\$\{', all_js)) | set(re.findall(r'\.id\s*=\s*`([\w-]+)\$\{', all_js))

    issues: list[str] = []
    for rel, src in sources.items():
        refs = [m for m in re.finditer(r'getElementById\(\s*["\']([\w-]+)["\']\s*\)', src)]
        refs += [m for m in re.finditer(r'querySelector(?:All)?\(\s*["\']#([\w-]+)(?=["\'\s.\[:>,])', src)]
        for m in refs:
            ref_id = m.group(1)
            if ref_id in ids or any(ref_id.startswith(p) for p in dyn_prefixes):
                continue
            line = src.count("\n", 0, m.start()) + 1
            issues.append(f"{rel}:{line}: Element „#{ref_id}“ gibt es weder in index.html noch in erzeugtem HTML")
    return issues


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    index_html = (root / "index.html").read_text(encoding="utf-8")
    scripts = re.findall(r'<script[^>]+src="([^"]+)"', index_html)
    scripts = [s for s in scripts if not s.startswith(("http:", "https:", "//"))]
    issues = find_issues(root, scripts) + find_dead_dom_ids(root, scripts, index_html)
    for issue in issues:
        print(issue)
    print(f"{len(issues)} Befunde" if issues else "✓ Keine undefinierten Namen und toten DOM-IDs gefunden.")
    return 1 if issues else 0


if __name__ == "__main__":
    sys.exit(main())

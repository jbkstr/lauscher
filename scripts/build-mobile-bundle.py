#!/usr/bin/env python3
"""
Lauscher • Baut lauschebaer-mobile.html aus den Quelldateien.

Nimmt index.html und setzt direkt in die Datei ein:
  - <link rel="stylesheet" href="styles.css">  ->  <style>…</style>
  - <script src="…"></script>                   ->  <script>…</script>
  - url("…") im CSS auf lokale Dateien (z. B. Fonts) ->  data:-URI (Base64)

tone.js bleibt bewusst extern (muss neben lauschebaer-mobile.html liegen).

Aufruf (aus dem Projektordner):
    python3 scripts/build-mobile-bundle.py            # Bundle neu bauen
    python3 scripts/build-mobile-bundle.py --check    # nur prüfen, ob es aktuell ist (Exit-Code 1, wenn nicht)

Nur Python-Standardbibliothek, keine Abhängigkeiten.
"""

import argparse
import base64
import re
import sys
from pathlib import Path

EXTERNAL_SCRIPTS = {"tone.js"}
OUTPUT_NAME = "lauschebaer-mobile.html"

CSS_URL_RE = re.compile(r'url\(\s*(["\']?)([^"\')]+)\1\s*\)')
DATA_URI_MIME = {
    ".ttf": "font/ttf",
    ".otf": "font/otf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
}

STYLESHEET_RE = re.compile(r'^([ \t]*)<link rel="stylesheet" href="([^"]+)">[ \t]*$', re.M)
SCRIPT_RE = re.compile(r'^([ \t]*)<script src="([^"]+)"></script>[ \t]*$', re.M)


def read_text(path: Path) -> str:
    if not path.is_file():
        sys.exit(f"Fehler: Datei nicht gefunden: {path}")
    return path.read_text(encoding="utf-8")


def inline_css_urls(css: str, css_dir: Path, root: Path) -> str:
    """Ersetzt url(...) auf lokale Dateien durch data:-URIs (externe/data-URLs bleiben unverändert)."""
    def repl(m: re.Match) -> str:
        ref = m.group(2).strip()
        if re.match(r"^(data:|https?:|//|#)", ref, re.I):
            return m.group(0)
        path = (css_dir / ref.split("?")[0].split("#")[0]).resolve()
        mime = DATA_URI_MIME.get(path.suffix.lower())
        if mime is None:
            return m.group(0)
        if not path.is_file():
            sys.exit(f"Fehler: Im CSS referenzierte Datei nicht gefunden: {ref}")
        if root not in path.parents:
            sys.exit(f"Fehler: Im CSS referenzierte Datei liegt außerhalb des Projekts: {ref}")
        data = base64.b64encode(path.read_bytes()).decode("ascii")
        return f'url("data:{mime};base64,{data}")'
    return CSS_URL_RE.sub(repl, css)


def build(root: Path) -> str:
    html = read_text(root / "index.html")
    inlined = []

    def inline_style(m: re.Match) -> str:
        indent, href = m.group(1), m.group(2)
        css_path = root / href
        css = inline_css_urls(read_text(css_path), css_path.parent.resolve(), root.resolve())
        if re.search(r"</style", css, re.I):
            sys.exit(f"Fehler: {href} enthält '</style' und kann nicht inline eingebettet werden.")
        inlined.append(href)
        return f"{indent}<style>\n{css}\n</style>"

    def inline_script(m: re.Match) -> str:
        indent, src = m.group(1), m.group(2)
        if src in EXTERNAL_SCRIPTS:
            return m.group(0)
        js = read_text(root / src)
        if re.search(r"</script", js, re.I):
            sys.exit(f"Fehler: {src} enthält '</script' und kann nicht inline eingebettet werden.")
        inlined.append(src)
        return f"<script>\n{js}\n</script>"

    html = STYLESHEET_RE.sub(inline_style, html)
    html = SCRIPT_RE.sub(inline_script, html)

    if not inlined:
        sys.exit("Fehler: In index.html wurden keine Stylesheets oder Skripte zum Einbetten gefunden.")
    return html


def main() -> int:
    parser = argparse.ArgumentParser(description="Baut lauschebaer-mobile.html aus index.html und den Quelldateien.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent,
                        help="Projektordner (Standard: Elternordner von scripts/)")
    parser.add_argument("--out", type=Path, default=None,
                        help=f"Zieldatei (Standard: <root>/{OUTPUT_NAME})")
    parser.add_argument("--check", action="store_true",
                        help="Nichts schreiben, nur prüfen, ob das Bundle aktuell ist")
    args = parser.parse_args()

    root = args.root.resolve()
    out = (args.out or root / OUTPUT_NAME).resolve()
    result = build(root)

    if args.check:
        current = out.read_text(encoding="utf-8") if out.is_file() else None
        if current == result:
            print(f"✓ {out.name} ist aktuell.")
            return 0
        print(f"✗ {out.name} ist veraltet. Neu bauen mit: python3 scripts/build-mobile-bundle.py")
        return 1

    out.write_text(result, encoding="utf-8")
    size_mb = out.stat().st_size / (1024 * 1024)
    print(f"✓ {out.name} gebaut ({size_mb:.1f} MB).")
    if not (out.parent / "tone.js").is_file():
        print("  Hinweis: tone.js muss neben der Datei liegen.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

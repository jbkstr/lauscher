#!/usr/bin/env python3
"""
Lauscher • Erzeugt den Service Worker (sw.js) für PWA & Offline-Nutzung.

Liest alle benötigten lokalen Dateien automatisch aus index.html, fonts/, icons/
und den Rechtstext-Seiten aus, berechnet einen Inhalts-Hash für die Cache-Version
und schreibt sw.js ins Projekt-Wurzelverzeichnis. Samples (samples/*) landen in einem
eigenen, dauerhaften Cache mit Hash pro Datei, damit Code-Updates sie nicht neu laden.

Aufruf:
    python3 scripts/build-sw.py          # sw.js neu erzeugen
    python3 scripts/build-sw.py --check  # prüfen, ob sw.js aktuell ist (Exit-Code 1 = veraltet)

Nur Python-Standardbibliothek, keine Abhängigkeiten.
"""

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

STYLESHEET_RE = re.compile(r'<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>')
SCRIPT_RE = re.compile(r'<script\b[^>]*\bsrc="([^"]+)"[^>]*></script>')
VERSION_NAME_RE = re.compile(r'\bname\s*:\s*"([^"]+)"')
VERSION_BUILD_RE = re.compile(r'\bbuild\s*:\s*(\d+)')

LEGAL_PAGES = ("privacy.html", "terms.html", "licenses.html")


def read_version_tag(root: Path) -> str:
    version_path = root / "version.js"
    if not version_path.is_file():
        return "dev"
    text = version_path.read_text(encoding="utf-8")
    name_m = VERSION_NAME_RE.search(text)
    build_m = VERSION_BUILD_RE.search(text)
    name = name_m.group(1) if name_m else "dev"
    build = f"b{build_m.group(1)}" if build_m else "b0"
    return f"{name}-{build}"


def collect_assets(root: Path) -> list[str]:
    index_path = root / "index.html"
    if not index_path.is_file():
        sys.exit(f"Fehler: {index_path} nicht gefunden.")
    html = index_path.read_text(encoding="utf-8")

    rels: list[str] = ["index.html"]
    if (root / "manifest.webmanifest").is_file():
        rels.append("manifest.webmanifest")

    for page in LEGAL_PAGES:
        if (root / page).is_file():
            rels.append(page)

    for pattern in (STYLESHEET_RE, SCRIPT_RE):
        for match in pattern.findall(html):
            if re.match(r"^(https?:|//|data:)", match, re.I):
                continue
            if match not in rels:
                rels.append(match)

    fonts_dir = root / "fonts" / "Andika"
    if fonts_dir.is_dir():
        for font_file in sorted(fonts_dir.glob("*.ttf")):
            rel = font_file.relative_to(root).as_posix()
            if rel not in rels:
                rels.append(rel)

    icons_dir = root / "icons"
    if icons_dir.is_dir():
        for icon_file in sorted(icons_dir.iterdir()):
            if icon_file.is_file() and icon_file.suffix.lower() in {".png", ".jpg", ".jpeg", ".svg", ".webp"}:
                rel = icon_file.relative_to(root).as_posix()
                if rel not in rels:
                    rels.append(rel)

    missing = [rel for rel in rels if not (root / rel).is_file()]
    if missing:
        sys.exit(f"Fehler: Dateien für Service-Worker-Cache fehlen: {', '.join(missing[:6])}")

    return rels


def is_sample_asset(rel: str) -> bool:
    """Große Sample-Bundles liegen in einem eigenen, dauerhaften Cache (siehe render_sw)."""
    return rel.startswith("samples/")


def compute_content_hash(root: Path, rels: list[str]) -> str:
    h = hashlib.sha256()
    for rel in rels:
        h.update(rel.encode("utf-8"))
        h.update(b"\0")
        h.update((root / rel).read_bytes())
        h.update(b"\0")
    return h.hexdigest()[:12]


def file_hash(root: Path, rel: str) -> str:
    return hashlib.sha256((root / rel).read_bytes()).hexdigest()[:12]


SW_TEMPLATE = r"""// Lauscher • Service Worker (automatisch erzeugt von scripts/build-sw.py – nicht von Hand bearbeiten)
//
// Zwei Caches:
// - App-Hülle (Code, Styles, Fonts, Icons): Name enthält Version + Inhalts-Hash, wird bei jeder Änderung neu geladen.
// - Samples (große *-bundle.js): ein dauerhafter Cache, Einträge pro Datei mit Inhalts-Hash im Schlüssel.
//   Ein Update lädt nur Sample-Dateien neu, die sich wirklich geändert haben.
const CACHE_PREFIX = "lauscher-";
const CACHE_NAME = __CACHE_NAME__;
const SAMPLES_CACHE_NAME = "lauscher-samples";
const PRECACHE_URLS = __PRECACHE_URLS__;
// Sample-Datei → versionierter Cache-Schlüssel
const SAMPLE_CACHE_KEYS = __SAMPLE_CACHE_KEYS__;

const SAMPLE_KEY_BY_HREF = new Map(
  Object.entries(SAMPLE_CACHE_KEYS).map(([url, key]) => [new URL(url, self.location).href, key])
);

async function runQueue(items, concurrency, task) {
  const queue = items.slice();
  const worker = async () => {
    while (queue.length > 0) await task(queue.shift());
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker));
}

async function fetchForCache(url) {
  const response = await fetch(new Request(url, { cache: "reload" }));
  if (!response.ok) throw new Error(`Precache fehlgeschlagen (${response.status}): ${url}`);
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const shell = await caches.open(CACHE_NAME);
    await runQueue(PRECACHE_URLS, 6, async (url) => {
      await shell.put(url, await fetchForCache(url));
    });
    const samples = await caches.open(SAMPLES_CACHE_NAME);
    await runQueue(Object.entries(SAMPLE_CACHE_KEYS), 3, async ([url, key]) => {
      if (await samples.match(key)) return; // unverändert → nicht erneut laden
      await samples.put(key, await fetchForCache(url));
    });
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME && key !== SAMPLES_CACHE_NAME)
        .map((key) => caches.delete(key))
    );
    // Veraltete Sample-Versionen entfernen
    const samples = await caches.open(SAMPLES_CACHE_NAME);
    const wanted = new Set(Object.values(SAMPLE_CACHE_KEYS).map((key) => new URL(key, self.location).href));
    const entries = await samples.keys();
    await Promise.all(entries.filter((req) => !wanted.has(req.url)).map((req) => samples.delete(req)));
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return caches.match("./index.html").then((indexCached) => indexCached || fetch(request));
      })
    );
    return;
  }

  const sampleKey = SAMPLE_KEY_BY_HREF.get(url.origin + url.pathname);
  if (sampleKey) {
    event.respondWith(
      caches.open(SAMPLES_CACHE_NAME)
        .then((samples) => samples.match(sampleKey))
        .then((cached) => cached || fetch(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => cached || fetch(request))
  );
});
"""


def render_sw(cache_name: str, shell_rels: list[str], sample_keys: dict[str, str]) -> str:
    urls = ["./"] + [f"./{rel}" for rel in shell_rels]
    return (SW_TEMPLATE
            .replace("__CACHE_NAME__", json.dumps(cache_name))
            .replace("__PRECACHE_URLS__", json.dumps(urls, indent=2, ensure_ascii=False))
            .replace("__SAMPLE_CACHE_KEYS__", json.dumps(sample_keys, indent=2, ensure_ascii=False)))


def main() -> int:
    parser = argparse.ArgumentParser(description="Erzeugt sw.js für PWA & Offline-Betrieb.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent,
                        help="Projektordner (Standard: Elternordner von scripts/)")
    parser.add_argument("--check", action="store_true",
                        help="Nichts schreiben, nur prüfen, ob sw.js aktuell ist")
    args = parser.parse_args()

    root = args.root.resolve()
    out = root / "sw.js"
    rels = collect_assets(root)
    shell_rels = [rel for rel in rels if not is_sample_asset(rel)]
    sample_keys = {f"./{rel}": f"./{rel}?h={file_hash(root, rel)}" for rel in rels if is_sample_asset(rel)}
    version_tag = read_version_tag(root)
    digest = compute_content_hash(root, shell_rels)
    cache_name = f"lauscher-{version_tag}-{digest}"
    result = render_sw(cache_name, shell_rels, sample_keys)

    if args.check:
        current = out.read_text(encoding="utf-8") if out.is_file() else None
        if current == result:
            print(f"✓ sw.js ist aktuell ({len(rels) + 1} Einträge, {cache_name}).")
            return 0
        print("✗ sw.js ist veraltet. Neu erzeugen mit: python3 scripts/build-sw.py")
        return 1

    out.write_text(result, encoding="utf-8")
    print(f"✓ sw.js erzeugt ({len(rels) + 1} Einträge, {cache_name}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

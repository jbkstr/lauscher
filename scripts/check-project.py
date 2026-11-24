#!/usr/bin/env python3
"""
Lauscher • Projekt-Prüfskript (Syntax, i18n- & Knowledge-Parität, Mobile-Bundle).

Verwendung:
    python3 scripts/check-project.py             # Komplettprüfung inkl. Bundle-Check
    python3 scripts/check-project.py --no-bundle # Ohne Bundle-Check (z. B. vor Rebuild)
    python3 scripts/check-project.py --strict    # Auch i18n/Knowledge-Hinweise als Fehler werten

Nur Python-Standardbibliothek + lokales Node.js, keine Abhängigkeiten.
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

SCRIPT_SRC_RE = re.compile(r'<script\b[^>]*\bsrc="([^"]+)"[^>]*></script>')
STYLESHEET_HREF_RE = re.compile(r'<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>')
DATA_I18N_ATTR_RE = re.compile(r'\bdata-i18n(?:-(?:title|placeholder|aria))?="([^"]+)"')
SKIP_SYNTAX_PREFIXES = ("samples/",)
SKIP_SYNTAX_EXACT = {"tone.js"}


def find_node() -> str:
    for candidate in (shutil.which("node"), "/usr/local/bin/node", "/opt/homebrew/bin/node"):
        if candidate and Path(candidate).is_file():
            return candidate
    sys.exit("Fehler: 'node' wurde nicht gefunden.")


def extract_index_assets(index_html: str) -> tuple[list[str], list[str]]:
    scripts = [
        s for s in SCRIPT_SRC_RE.findall(index_html)
        if not re.match(r"^(https?:|//|data:)", s, re.I)
    ]
    styles = [
        s for s in STYLESHEET_HREF_RE.findall(index_html)
        if not re.match(r"^(https?:|//|data:)", s, re.I)
    ]
    return scripts, styles


def check_files_exist(root: Path, paths: list[str], errors: list[str]) -> None:
    for rel in paths:
        if not (root / rel).is_file():
            errors.append(f"Datei aus index.html fehlt: {rel}")


def check_js_syntax(root: Path, node_bin: str, scripts: list[str], errors: list[str]) -> int:
    checked_files: list[str] = []
    for rel in scripts:
        if rel in SKIP_SYNTAX_EXACT or rel.startswith(SKIP_SYNTAX_PREFIXES):
            continue
        full = root / rel
        if not full.is_file():
            continue
        res = subprocess.run([node_bin, "--check", str(full)], capture_output=True, text=True)
        checked_files.append(rel)
        if res.returncode != 0:
            msg = (res.stderr or res.stdout or "").strip()
            errors.append(f"JS-Syntaxfehler in {rel}:\n{msg}")

    # Prüfe zusätzlich auf globale const/let/class-Kollisionen und sequenzielle Lade-Reihenfolge (TDZ/Hoisting)
    if checked_files and not errors:
        collision_script = r"""
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = process.argv[1];
const files = JSON.parse(process.argv[2]);
const parts = files.map(f => `\n// === ${f} ===\n` + fs.readFileSync(path.join(root, f), "utf8"));
new vm.Script(parts.join("\n;\n"), { filename: "combined-global-scope.js" });

// Sequenzielle Top-Level-Ausführung in exakter index.html-Reihenfolge (ohne Tone/audio.js)
const stubEl = () => ({
  classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
  style: { setProperty(){}, removeProperty(){} },
  setAttribute(){}, removeAttribute(){}, getAttribute(){ return null; },
  addEventListener(){}, querySelector: () => null, querySelectorAll: () => [],
  appendChild(){}, innerHTML: "", textContent: "", dataset: {}
});
const sandbox = {
  console, Math, Date, JSON, Object, Array, Map, Set, Number, String, Boolean, RegExp, Error, Promise,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent,
  setTimeout: () => 0, clearTimeout(){}, setInterval: () => 0, clearInterval(){},
  requestAnimationFrame: () => 0, cancelAnimationFrame(){},
  Float32Array, Uint32Array, Uint8Array,
  window: { addEventListener(){}, matchMedia: () => ({ matches: false, addEventListener(){} }), history: { pushState(){}, replaceState(){} }, location: { hash: "", search: "", href: "http://localhost/" }, innerWidth: 390, innerHeight: 844 },
  document: { documentElement: stubEl(), body: stubEl(), head: stubEl(), addEventListener(){}, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], createElement: () => stubEl() },
  localStorage: { getItem: () => null, setItem(){}, removeItem(){} },
  navigator: { language: "de-DE", languages: ["de-DE"], userAgent: "check-project" },
  performance: { now: () => 0 }
};
sandbox.globalThis = sandbox;
sandbox.self = sandbox;
vm.createContext(sandbox);
for (const rel of files) {
  vm.runInContext(fs.readFileSync(path.join(root, rel), "utf8"), sandbox, { filename: rel });
}
"""
        res = subprocess.run(
            [node_bin, "-e", collision_script, str(root), json.dumps(checked_files)],
            capture_output=True,
            text=True,
        )
        if res.returncode != 0:
            msg = (res.stderr or res.stdout or "").strip()
            errors.append(f"Globale Scope-Kollision oder Lade-Reihenfolge-Fehler:\n{msg}")

    return len(checked_files)


def check_i18n_and_knowledge(
    root: Path,
    node_bin: str,
    index_html: str,
    i18n_knowledge_scripts: list[str],
    app_scripts: list[str],
    errors: list[str],
    warnings: list[str],
) -> dict:
    static_keys = sorted(set(DATA_I18N_ATTR_RE.findall(index_html)))

    node_script = r"""
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.argv[1];
const staticKeys = JSON.parse(process.argv[2]);
const loadFiles = JSON.parse(process.argv[3]);
const appScripts = JSON.parse(process.argv[4]);

const sandbox = {
  console,
  window: {},
  document: {
    documentElement: { setAttribute() {}, removeAttribute() {}, getAttribute() { return "de"; } },
    querySelectorAll: () => [],
    getElementById: () => null
  },
  localStorage: { getItem: () => null, setItem() {} },
  navigator: { language: "de-DE", languages: ["de-DE"] },
  state: { settings: { language: "de" }, profile: {} }
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

for (const rel of loadFiles) {
  vm.runInContext(fs.readFileSync(path.join(root, rel), "utf8"), sandbox, { filename: rel });
}

const deQuotes = vm.runInContext("typeof LAUSCHEBAER_QUOTES !== 'undefined' ? LAUSCHEBAER_QUOTES : []", sandbox);
if (!Array.isArray(deQuotes) || deQuotes.length === 0) {
  throw new Error("LAUSCHEBAER_QUOTES ist leer oder fehlt");
}

const report = {
  errors: [],
  warnings: [],
  stats: {
    staticKeys: staticKeys.length,
    quotesCount: deQuotes.length,
    knowledgeArticles: 0
  }
};

const langs = ["fr", "es", "it", "pl", "uk", "ur"];
const I18N_STATIC = vm.runInContext("I18N_STATIC", sandbox);
const I18N_STATIC_BY_LANG = vm.runInContext("I18N_STATIC_BY_LANG", sandbox);
const LOCALIZED_TABLES_BY_LANG = vm.runInContext("LOCALIZED_TABLES_BY_LANG", sandbox);
const TRANSLATIONS_BY_LANG = vm.runInContext("TRANSLATIONS_BY_LANG", sandbox);

// 1. Check index.html data-i18n keys across all 8 languages
const missingStaticByLang = { de: [], en: [], fr: [], es: [], it: [], pl: [], uk: [], ur: [] };
for (const key of staticKeys) {
  const base = I18N_STATIC[key];
  if (!base || typeof base.de !== "string") missingStaticByLang.de.push(key);
  if (!base || typeof base.en !== "string") missingStaticByLang.en.push(key);
  for (const lang of langs) {
    const ext = I18N_STATIC_BY_LANG[lang];
    const hasExt = ext && typeof ext[key] === "string";
    const hasBase = base && typeof base[lang] === "string";
    if (!hasExt && !hasBase) missingStaticByLang[lang].push(key);
  }
}
for (const [lang, list] of Object.entries(missingStaticByLang)) {
  if (list.length > 0) {
    report.errors.push(`Fehlende data-i18n Keys in ${lang} (${list.length}): ${list.slice(0, 8).join(", ")}${list.length > 8 ? " …" : ""}`);
  }
}

// 2. Check LAUSCHEBAER_QUOTES count parity across all 8 languages
for (const lang of ["en", ...langs]) {
  const q = LOCALIZED_TABLES_BY_LANG[lang]?.quotes;
  if (!Array.isArray(q)) {
    report.errors.push(`Fehlende quotes-Tabelle in ${lang}`);
  } else if (q.length !== deQuotes.length) {
    report.errors.push(`LAUSCHEBAER_QUOTES Länge abweichend in ${lang}: ${q.length} statt ${deQuotes.length} (de)`);
  }
}

// 3. Check ALL i18n tables parity against en
const enTables = LOCALIZED_TABLES_BY_LANG.en || {};
const tablesToCheck = Object.keys(enTables).filter(k => k !== "quotes");
for (const tbl of tablesToCheck) {
  const refObj = enTables[tbl];
  if (!refObj || typeof refObj !== "object") continue;
  const refKeys = Object.keys(refObj);
  for (const lang of langs) {
    const targetObj = LOCALIZED_TABLES_BY_LANG[lang]?.[tbl];
    if (!targetObj || typeof targetObj !== "object") {
      report.errors.push(`Fehlende i18n-Tabelle "${tbl}" in ${lang}`);
      continue;
    }
    const missing = refKeys.filter(k => !Object.prototype.hasOwnProperty.call(targetObj, k));
    if (missing.length > 0) {
      report.errors.push(`Tabelle "${tbl}" in ${lang} fehlen Keys (${missing.length}): ${missing.slice(0, 6).join(", ")}`);
    }
  }
}

// 4. Check knowledge bundles parity (articles & category help guides)
const deArticles = vm.runInContext("typeof KNOWLEDGE_ARTICLES !== 'undefined' ? KNOWLEDGE_ARTICLES : null", sandbox);
const enArticles = vm.runInContext("typeof KNOWLEDGE_ARTICLES_EN !== 'undefined' ? KNOWLEDGE_ARTICLES_EN : null", sandbox);
const frArticles = vm.runInContext("typeof KNOWLEDGE_ARTICLES_FR !== 'undefined' ? KNOWLEDGE_ARTICLES_FR : null", sandbox);
const deGuides = vm.runInContext("typeof CATEGORY_HELP_GUIDES !== 'undefined' ? CATEGORY_HELP_GUIDES : null", sandbox);
const enGuides = vm.runInContext("typeof CATEGORY_HELP_GUIDES_EN !== 'undefined' ? CATEGORY_HELP_GUIDES_EN : null", sandbox);
const frGuides = vm.runInContext("typeof CATEGORY_HELP_GUIDES_FR !== 'undefined' ? CATEGORY_HELP_GUIDES_FR : null", sandbox);
const knowledgeByLang = vm.runInContext("typeof LOCALIZED_KNOWLEDGE_BY_LANG !== 'undefined' ? LOCALIZED_KNOWLEDGE_BY_LANG : {}", sandbox);

function getKnowledgeArticlesFor(lang) {
  if (lang === "en") return enArticles;
  if (lang === "fr") return frArticles;
  return knowledgeByLang[lang]?.data?.knowledgeArticles || null;
}
function getCategoryGuidesFor(lang) {
  if (lang === "en") return enGuides;
  if (lang === "fr") return frGuides;
  return knowledgeByLang[lang]?.data?.categoryHelpGuides || null;
}

if (Array.isArray(deArticles)) {
  report.stats.knowledgeArticles = deArticles.length;
  const deIds = deArticles.map(a => a.id);
  for (const lang of ["en", ...langs]) {
    const arts = getKnowledgeArticlesFor(lang);
    if (!arts || (Array.isArray(arts) ? arts.length === 0 : Object.keys(arts).length === 0)) {
      report.errors.push(`Fehlende Knowledge-Artikel in ${lang}`);
      continue;
    }
    const ids = Array.isArray(arts) ? new Set(arts.map(a => a.id)) : new Set(Object.keys(arts));
    const missing = deIds.filter(id => !ids.has(id));
    if (missing.length > 0) {
      report.errors.push(`Knowledge-Artikel in ${lang} fehlen (${missing.length}): ${missing.slice(0, 6).join(", ")}`);
    }
  }
}

if (deGuides && typeof deGuides === "object") {
  const guideKeys = Object.keys(deGuides);
  for (const lang of ["en", ...langs]) {
    const g = getCategoryGuidesFor(lang);
    if (!g || typeof g !== "object") {
      report.errors.push(`Fehlende categoryHelpGuides in ${lang}`);
      continue;
    }
    const missing = guideKeys.filter(k => !Object.prototype.hasOwnProperty.call(g, k));
    if (missing.length > 0) {
      report.errors.push(`categoryHelpGuides in ${lang} fehlen (${missing.length}): ${missing.slice(0, 6).join(", ")}`);
    }
  }
}

// 5. Scan tr("de", "en") / tf("de", "en", ...) calls in app scripts without inline 6-lang map
const trCallRe = /\b(?:tr|tf)\(\s*"([^"\\\n]+)"\s*,\s*"([^"\\\n]+)"\s*(\)|,\s*\{)/g;
const missingTrByLang = { fr: new Set(), es: new Set(), it: new Set(), pl: new Set(), uk: new Set(), ur: new Set() };
for (const rel of appScripts) {
  const src = fs.readFileSync(path.join(root, rel), "utf8");
  let m;
  while ((m = trCallRe.exec(src)) !== null) {
    const deStr = m[1];
    const enStr = m[2];
    const tail = m[3];
    // Look ahead for inline { fr: ..., es: ..., it: ..., pl: ..., uk: ..., ur: ... } (also for longer multi-line calls)
    const slice = src.slice(m.index, m.index + 2600);
    const hasInlineMap = tail !== ")" && /\bfr\s*:/.test(slice) && /\bes\s*:/.test(slice) && /\bit\s*:/.test(slice) && /\bpl\s*:/.test(slice) && /\buk\s*:/.test(slice) && /\bur\s*:/.test(slice);
    if (hasInlineMap) continue;
    for (const lang of langs) {
      const dict = TRANSLATIONS_BY_LANG[lang] || {};
      if (!Object.prototype.hasOwnProperty.call(dict, deStr) && !Object.prototype.hasOwnProperty.call(dict, enStr)) {
        missingTrByLang[lang].add(deStr);
      }
    }
  }
}
for (const lang of langs) {
  const missing = [...missingTrByLang[lang]];
  if (missing.length > 0) {
    report.warnings.push(`tr()/tf()-Strings ohne Eintrag in TR_${lang.toUpperCase()} (${missing.length}): ${missing.slice(0, 4).map(s => JSON.stringify(s)).join(", ")}${missing.length > 4 ? " …" : ""}`);
  }
}

process.stdout.write(JSON.stringify(report));
"""

    res = subprocess.run(
        [
            node_bin,
            "-e",
            node_script,
            str(root),
            json.dumps(static_keys),
            json.dumps(i18n_knowledge_scripts),
            json.dumps(app_scripts),
        ],
        capture_output=True,
        text=True,
    )
    if res.returncode != 0:
        errors.append(f"i18n/Knowledge-Prüfung abgebrochen:\n{(res.stderr or res.stdout).strip()}")
        return {}
    data = json.loads(res.stdout)
    errors.extend(data.get("errors", []))
    warnings.extend(data.get("warnings", []))
    return data.get("stats", {})


def check_mobile_bundle(root: Path, errors: list[str]) -> None:
    res = subprocess.run(
        [sys.executable, str(root / "scripts" / "build-mobile-bundle.py"), "--check"],
        capture_output=True,
        text=True,
    )
    if res.returncode != 0:
        msg = (res.stderr or res.stdout or "").strip()
        errors.append(f"Mobile-Bundle veraltet (build-mobile-bundle.py --check):\n{msg}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Prüft Syntax, i18n/Knowledge-Parität und Bundle-Stand.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument("--no-bundle", action="store_true", help="Bundle-Check überspringen")
    parser.add_argument("--strict", action="store_true", help="Alle Hinweise (tr/tf & Knowledge-Lücken) als Fehler werten")
    args = parser.parse_args()

    root = args.root.resolve()
    node_bin = find_node()
    index_path = root / "index.html"
    if not index_path.is_file():
        sys.exit(f"Fehler: {index_path} nicht gefunden.")
    index_html = index_path.read_text(encoding="utf-8")

    errors: list[str] = []
    warnings: list[str] = []

    scripts, styles = extract_index_assets(index_html)
    check_files_exist(root, scripts + styles, errors)
    js_checked = check_js_syntax(root, node_bin, scripts, errors)

    i18n_knowledge_scripts = [
        s for s in scripts
        if s == "i18n.js" or s.startswith("i18n/") or s.startswith("i18n-") or s == "knowledge.js" or s.startswith("knowledge-")
    ]
    app_scripts = [s for s in scripts if s == "app.js" or s.startswith("js/")]
    stats = check_i18n_and_knowledge(root, node_bin, index_html, i18n_knowledge_scripts, app_scripts, errors, warnings)

    if not args.no_bundle:
        check_mobile_bundle(root, errors)

    if args.strict and warnings:
        errors.extend(warnings)
        warnings = []

    if warnings:
        print(f"⚠ {len(warnings)} Hinweise:")
        for w in warnings:
            print(f"  - {w}")

    if errors:
        print(f"✗ {len(errors)} Fehler gefunden:", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    print(
        f"✓ Projekt-Check bestanden: {js_checked} JS-Dateien, "
        f"{stats.get('staticKeys', '?')} data-i18n-Keys (8 Sprachen), "
        f"{stats.get('quotesCount', '?')} Quotes, "
        f"{stats.get('knowledgeArticles', '?')} Wissensartikel"
        + (" (ohne Bundle-Check)" if args.no_bundle else ", Bundle aktuell")
        + "."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

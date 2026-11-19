#!/usr/bin/env python3
"""
Lauscher • Version hochzählen (version.js + CHANGELOG.md)

  python3 scripts/bump-version.py                    # Build +1, Datum = heute
  python3 scripts/bump-version.py --name 0.9.1-beta  # neue Version + Build +1
  python3 scripts/bump-version.py --show             # aktuellen Stand anzeigen

- Die Build-Nummer (Android versionCode) steigt bei jedem Aufruf um 1 und darf nie sinken.
- In CHANGELOG.md wird oben ein neuer Abschnitt angelegt, vorbefüllt mit den Commit-Titeln
  seit dem letzten Git-Tag (danach von Hand kürzen/umformulieren).
- Das Skript committet und taggt nichts; die nächsten Schritte werden am Ende ausgegeben.
Nur Python-Standardbibliothek.
"""
import argparse
import datetime
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VERSION_FILE = ROOT / "version.js"
CHANGELOG_FILE = ROOT / "CHANGELOG.md"
SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$")


def read_version():
    text = VERSION_FILE.read_text(encoding="utf-8")
    name = re.search(r'name:\s*"([^"]+)"', text).group(1)
    build = int(re.search(r"build:\s*(\d+)", text).group(1))
    date = re.search(r'date:\s*"([^"]*)"', text).group(1)
    return text, name, build, date


def write_version(text, name, build, date):
    text = re.sub(r'(name:\s*)"[^"]+"', rf'\g<1>"{name}"', text, count=1)
    text = re.sub(r"(build:\s*)\d+", rf"\g<1>{build}", text, count=1)
    text = re.sub(r'(date:\s*)"[^"]*"', rf'\g<1>"{date}"', text, count=1)
    VERSION_FILE.write_text(text, encoding="utf-8")


def git(*args):
    try:
        return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""


def commits_since_last_tag():
    last_tag = git("describe", "--tags", "--abbrev=0")
    rng = f"{last_tag}..HEAD" if last_tag else "HEAD"
    log = git("log", rng, "--no-merges", "--format=%s")
    lines = [l for l in log.splitlines() if l.strip()]
    if not last_tag:
        lines = lines[:15]  # erster Release: nur die jüngsten Einträge als Gedankenstütze
    return last_tag, lines


def add_changelog_section(name, build, date):
    last_tag, commits = commits_since_last_tag()
    header = f"## {name} (Build {build}) – {date}"
    body = "\n".join(f"- {c}" for c in commits) or "- …"
    hint = f"<!-- Vorbefüllt aus Commits seit {last_tag or 'Projektbeginn (gekürzt)'} – bitte kürzen und für Nutzer formulieren. -->"
    section = f"{header}\n\n{hint}\n{body}\n"
    if CHANGELOG_FILE.exists():
        text = CHANGELOG_FILE.read_text(encoding="utf-8")
        marker = "\n## "
        idx = text.find(marker)
        text = (text[:idx + 1] + section + "\n" + text[idx + 1:]) if idx != -1 else (text.rstrip() + "\n\n" + section)
    else:
        text = "# Changelog\n\nAlle veröffentlichten Versionen von Lauscher.\n\n" + section
    CHANGELOG_FILE.write_text(text, encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description="Lauscher-Version hochzählen.")
    parser.add_argument("--name", help="neue sichtbare Version, z. B. 0.9.1-beta (SemVer)")
    parser.add_argument("--show", action="store_true", help="nur aktuellen Stand anzeigen")
    parser.add_argument("--no-changelog", action="store_true", help="CHANGELOG.md nicht anfassen")
    args = parser.parse_args()

    text, name, build, date = read_version()
    if args.show:
        print(f"Lauscher {name} (Build {build}) – {date}")
        return 0

    new_name = args.name or name
    if not SEMVER_RE.match(new_name):
        print(f"✗ „{new_name}“ ist keine gültige Version (Format 1.2.3 oder 1.2.3-beta).", file=sys.stderr)
        return 1
    new_build = build + 1
    new_date = datetime.date.today().isoformat()
    write_version(text, new_name, new_build, new_date)
    if not args.no_changelog:
        add_changelog_section(new_name, new_build, new_date)

    tag = f"v{new_name}"
    tag_exists = bool(git("tag", "--list", tag))
    print(f"✓ Version: {name} (Build {build}) → {new_name} (Build {new_build})")
    if not args.no_changelog:
        print("✓ CHANGELOG.md: neuer Abschnitt angelegt – bitte Einträge prüfen")
    print("\nNächste Schritte:")
    print("  1. ./scripts/sync-android.sh --no-open   (überträgt Version ins Android-Projekt)")
    print("  2. In Android Studio: Build → Generate Signed App Bundle / APK → APK → release")
    print(f"  3. git add -A && git commit -m \"Release {new_name} (Build {new_build})\"")
    if tag_exists:
        print(f"  ⚠ Tag {tag} existiert bereits – für einen öffentlichen Release besser --name erhöhen.")
    print(f"  4. git tag {tag} && git push && git push origin {tag}")
    print(f"  5. GitHub → Releases → {tag} → APK als „lauscher.apk“ anhängen")
    return 0


if __name__ == "__main__":
    sys.exit(main())

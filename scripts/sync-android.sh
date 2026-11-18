#!/bin/bash
# Lauscher • Klont alle benötigten Web-Dateien in das Capacitor-Projekt (/www),
# sorgt für @capacitor/app (Android Back-Button / System-Geste), synchronisiert Android
# und startet das Projekt direkt in Android Studio.
#
# Verwendung:
#   ./scripts/sync-android.sh                     # Synct nach ~/Documents/lauscher-android & öffnet Android Studio
#   ./scripts/sync-android.sh /pfad/zum/projekt   # Eigenes Zielverzeichnis verwenden
#   ./scripts/sync-android.sh --fresh             # Erstellt android/-Ordner komplett neu (Standard-Icons!)
#   ./scripts/sync-android.sh --no-open           # Nur klonen & syncen, Android Studio nicht öffnen

set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$HOME/.nvm/nvm.sh"
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TARGET_DIR="$HOME/Documents/lauscher-android"
FRESH_ANDROID=0
OPEN_STUDIO=1

for arg in "$@"; do
  case "$arg" in
    --fresh)
      FRESH_ANDROID=1
      ;;
    --no-open)
      OPEN_STUDIO=0
      ;;
    -h|--help)
      sed -n '2,11p' "$0"
      exit 0
      ;;
    *)
      TARGET_DIR="$arg"
      ;;
  esac
done

for cmd in node npm npx python3; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Fehler: '$cmd' nicht im PATH gefunden ($PATH)." >&2
    exit 1
  fi
done

mkdir -p "$TARGET_DIR"
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"
WWW_DIR="$TARGET_DIR/www"

echo "1/4 • Baue/Prüfe Projekt-Skripte & Syntax …"
node --check "$REPO_ROOT/audio.js"
node --check "$REPO_ROOT/app.js"
python3 "$REPO_ROOT/scripts/build-mobile-bundle.py" >/dev/null

echo "2/4 • Klone Lauscher-Webdateien sauber nach $WWW_DIR …"
rm -rf "$WWW_DIR"
mkdir -p "$WWW_DIR/fonts/Andika" "$WWW_DIR/samples"

RUNTIME_FILES=(
  index.html
  styles.css
  tone.js
  audio.js
  app.js
  i18n.js
  i18n-fr.js
  i18n-pl.js
  i18n-uk.js
  i18n-ur.js
  knowledge.js
  knowledge-en.js
  knowledge-fr.js
  knowledge-pl.js
  knowledge-uk.js
  knowledge-ur.js
)

for rel in "${RUNTIME_FILES[@]}"; do
  cp "$REPO_ROOT/$rel" "$WWW_DIR/$rel"
done

cp "$REPO_ROOT"/fonts/Andika/*.ttf "$WWW_DIR/fonts/Andika/"
if [ -f "$REPO_ROOT/fonts/Andika/OFL.txt" ]; then
  cp "$REPO_ROOT/fonts/Andika/OFL.txt" "$WWW_DIR/fonts/Andika/"
fi
cp "$REPO_ROOT"/samples/*-bundle.js "$WWW_DIR/samples/"
mkdir -p "$WWW_DIR/icons"
cp "$REPO_ROOT"/icons/*.jpg "$WWW_DIR/icons/"

echo "3/4 • Prüfe Capacitor & @capacitor/app in $TARGET_DIR …"
cd "$TARGET_DIR"

if [ ! -f "$TARGET_DIR/package.json" ]; then
  npm init -y >/dev/null
fi

if [ ! -d "$TARGET_DIR/node_modules/@capacitor/core" ] || [ ! -d "$TARGET_DIR/node_modules/@capacitor/android" ]; then
  npm install --no-audit --no-fund @capacitor/core @capacitor/cli @capacitor/android @capacitor/app
elif [ ! -d "$TARGET_DIR/node_modules/@capacitor/app" ]; then
  CAP_MAJOR="$(node -p '(() => { try { const v = require("./node_modules/@capacitor/core/package.json").version; return String(parseInt(v, 10) || 8); } catch (_) { return "8"; } })()')"
  npm install --no-audit --no-fund "@capacitor/app@^${CAP_MAJOR}.0.0"
fi

if [ ! -f "$TARGET_DIR/capacitor.config.json" ] && [ ! -f "$TARGET_DIR/capacitor.config.ts" ] && [ ! -f "$TARGET_DIR/capacitor.config.js" ]; then
  cat > "$TARGET_DIR/capacitor.config.json" <<'EOF'
{
  "appId": "de.jbkstr.lauscher",
  "appName": "Lauscher",
  "webDir": "www",
  "plugins": {
    "SystemBars": {
      "style": "LIGHT",
      "insetsHandling": "css",
      "initialViewportFitValueHint": "cover"
    }
  }
}
EOF
elif [ -f "$TARGET_DIR/capacitor.config.json" ]; then
  node -e '
    const fs = require("fs");
    const p = process.argv[1];
    const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
    cfg.plugins = cfg.plugins || {};
    cfg.plugins.SystemBars = {
      style: "LIGHT",
      insetsHandling: "css",
      initialViewportFitValueHint: "cover",
      ...(cfg.plugins.SystemBars || {})
    };
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
  ' "$TARGET_DIR/capacitor.config.json"
fi

if [ "$FRESH_ANDROID" -eq 1 ] && [ -d "$TARGET_DIR/android" ]; then
  echo "  → --fresh aktiv: Erstelle android/-Ordner neu …"
  rm -rf "$TARGET_DIR/android"
fi

if [ ! -d "$TARGET_DIR/android" ]; then
  npx cap add android
fi

# Mikrofon für den Tuner: Capacitor fragt die Laufzeit-Berechtigung automatisch ab,
# sobald die WebView getUserMedia nutzt – dafür muss sie im Manifest stehen.
MANIFEST="$TARGET_DIR/android/app/src/main/AndroidManifest.xml"
if [ -f "$MANIFEST" ]; then
  for perm in RECORD_AUDIO MODIFY_AUDIO_SETTINGS; do
    if ! grep -q "android.permission.$perm" "$MANIFEST"; then
      python3 - "$MANIFEST" "$perm" <<'PYEOF'
import sys
path, perm = sys.argv[1], sys.argv[2]
s = open(path, encoding="utf-8").read()
line = f'    <uses-permission android:name="android.permission.{perm}" />\n'
s = s.replace("</manifest>", line + "</manifest>", 1)
open(path, "w", encoding="utf-8").write(s)
PYEOF
      echo "  → Berechtigung $perm im AndroidManifest ergänzt"
    fi
  done
fi

echo "4/4 • Synchronisiere Capacitor → Android …"
npx cap sync android

echo "✓ Sync abgeschlossen: $TARGET_DIR"

if [ "$OPEN_STUDIO" -eq 1 ]; then
  echo "  → Starte Android Studio …"
  if ! npx cap open android >/dev/null 2>&1; then
    open -a "Android Studio" "$TARGET_DIR/android"
  fi
fi

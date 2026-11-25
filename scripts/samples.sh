#!/usr/bin/env bash
# Lauscher • Audio-Samples zwischen dem privaten Repo jbkstr/lauscher-samples und samples/ abgleichen.
#
# Die Samples (samples/<instrument>/*.m4a und samples/<instrument>-bundle.js) liegen bewusst NICHT im
# öffentlichen Repo (.gitignore). Die Maskottchen-Grafiken (samples/mascot*-bundle.js) bleiben öffentlich.
#
#   scripts/samples.sh pull               Samples aus dem privaten Repo nach samples/ holen (holt vorher git pull)
#   scripts/samples.sh pull --if-missing  nur, falls Sample-Bundles fehlen (z. B. frischer Worktree)
#   scripts/samples.sh push ["Nachricht"] geänderte Samples ins private Repo übertragen, committen und pushen
#
# Ort der lokalen Kopie: $LAUSCHER_SAMPLES_DIR, sonst ~/Documents/GitHub/lauscher-samples
# (wird bei Bedarf per `gh repo clone jbkstr/lauscher-samples` angelegt).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SAMPLES_REPO="${LAUSCHER_SAMPLES_DIR:-$HOME/Documents/GitHub/lauscher-samples}"
INSTRUMENTS=(bass brass guitar percussion piano strings voice)

ensure_clone() {
  if [ ! -d "$SAMPLES_REPO/.git" ]; then
    echo "→ Klone jbkstr/lauscher-samples nach $SAMPLES_REPO"
    mkdir -p "$(dirname "$SAMPLES_REPO")"
    gh repo clone jbkstr/lauscher-samples "$SAMPLES_REPO" -- -q
  fi
}

bundles_missing() {
  for i in "${INSTRUMENTS[@]}"; do
    [ -f "$REPO_ROOT/samples/$i-bundle.js" ] || return 0
  done
  return 1
}

cmd="${1:-}"
case "$cmd" in
  pull)
    if [ "${2:-}" = "--if-missing" ] && ! bundles_missing; then
      exit 0
    fi
    ensure_clone
    git -C "$SAMPLES_REPO" pull -q --ff-only || echo "⚠️  git pull im Sample-Repo fehlgeschlagen, nutze lokalen Stand"
    mkdir -p "$REPO_ROOT/samples"
    for i in "${INSTRUMENTS[@]}"; do
      rsync -a --delete "$SAMPLES_REPO/$i/" "$REPO_ROOT/samples/$i/"
      cp -p "$SAMPLES_REPO/$i-bundle.js" "$REPO_ROOT/samples/"
    done
    echo "✓ Samples geholt aus $SAMPLES_REPO ($(git -C "$SAMPLES_REPO" log -1 --format='%h %s'))"
    ;;
  push)
    ensure_clone
    git -C "$SAMPLES_REPO" pull -q --ff-only
    for i in "${INSTRUMENTS[@]}"; do
      rsync -a --delete "$REPO_ROOT/samples/$i/" "$SAMPLES_REPO/$i/"
      cp -p "$REPO_ROOT/samples/$i-bundle.js" "$SAMPLES_REPO/"
    done
    if [ -z "$(git -C "$SAMPLES_REPO" status --porcelain)" ]; then
      echo "✓ Keine Änderungen an den Samples"
      exit 0
    fi
    git -C "$SAMPLES_REPO" add -A
    git -C "$SAMPLES_REPO" commit -q -m "${2:-Update samples from lauscher $(git -C "$REPO_ROOT" rev-parse --short HEAD)}"
    git -C "$SAMPLES_REPO" push -q
    echo "✓ Samples übertragen und gepusht ($(git -C "$SAMPLES_REPO" log -1 --format='%h %s'))"
    ;;
  *)
    sed -n 2,13p "$0" | sed 's/^# \{0,1\}//'
    exit 1
    ;;
esac

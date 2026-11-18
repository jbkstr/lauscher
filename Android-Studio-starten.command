#!/bin/bash
# Lauscher • Synct alle aktuellen Dateien nach ~/Documents/lauscher-android und öffnet Android Studio.
exec "$(cd "$(dirname "$0")" && pwd)/scripts/sync-android.sh" "$@"

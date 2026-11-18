#!/bin/bash
# Lauscher • Startet die App lokal über einen kleinen Webserver und öffnet sie im Browser.
# Doppelklick im Finder genügt. Zum Beenden das Terminal-Fenster schließen (oder Ctrl+C).
#
# Warum? Wird index.html direkt per Doppelklick (file://) geöffnet, blockieren Browser
# wie Chrome das Laden der Schriftdateien (Andika). Über http://localhost klappt alles.

cd "$(dirname "$0")" || exit 1

PORT=8000
while lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

URL="http://localhost:$PORT/"
echo ""
echo "  Lauscher läuft unter: $URL"
echo "  Zum Beenden dieses Fenster schließen oder Ctrl+C drücken."
echo ""

(sleep 1; open "$URL") &
exec python3 -m http.server "$PORT" --bind 127.0.0.1

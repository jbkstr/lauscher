#!/usr/bin/env python3
"""
Lauscher • Automatisierte Screenshot-Datenbank (App & Webapp, DE & EN)

Startet einen lokalen statischen Webserver und steuert Google Chrome im
Headless-Modus direkt über das Chrome DevTools Protocol (CDP) – ganz ohne
npm, Playwright oder externe Python-Pakete.

Erzeugt eine übersichtliche, marketing-orientierte Screenshot-Datenbank:
  screenshots/
    gallery.html      (filterbare Übersicht mit Lightbox)
    manifest.json     (Metadaten: Version, Commit, Theme, Sprache, Viewport)
    de/app/*.png      (Smartphone-App 390×844 @3x = 1170×2532)
    de/webapp/*.png   (Desktop-Webapp 1080×820 @2x = 2160×1640)
    en/app/*.png
    en/webapp/*.png

Aufruf:
  python3 scripts/capture-screenshots.py
  python3 scripts/capture-screenshots.py --langs de,en --platforms app,webapp
  python3 scripts/capture-screenshots.py --shots 01,02,14 --out screenshots
"""

from __future__ import annotations

import argparse
import base64
import functools
import hashlib
import http.server
import json
import os
import re
import shutil
import socket
import socketserver
import struct
import subprocess
import sys
import tempfile
import threading
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    shutil.which("google-chrome") or "",
    shutil.which("chromium") or "",
    shutil.which("chromium-browser") or "",
]

PLATFORMS = {
    "app": {
        "label_de": "App (Smartphone)",
        "label_en": "App (Mobile)",
        "width": 390,
        "height": 844,
        "scale": 3,
        "mobile": True,
        "native_mock": True,
    },
    "webapp": {
        "label_de": "Webapp (Desktop)",
        "label_en": "Web App (Desktop)",
        "width": 1080,
        "height": 820,
        "scale": 2,
        "mobile": False,
        "native_mock": False,
    },
}

THEME_LABELS = {
    "waldlichtung": {"de": "Folk", "en": "Folk"},
    "morgentau": {"de": "Klassik", "en": "Classical"},
    "abenddaemmerung": {"de": "Jazz", "en": "Jazz"},
    "metal": {"de": "Metal", "en": "Metal"},
}

SHOTS = [
    {
        "id": "01",
        "slug": "home_hero_folk_light",
        "category": "start",
        "theme": "waldlichtung",
        "appearance": "light",
        "title_de": "Startseite & Trainings-Fokus",
        "title_en": "Home Screen & Training Focus",
        "caption_de": "Ruhiger Einstieg mit Waschbär-Maskottchen, motivierenden Sprüchen, Fokus-Markierungen (Dein ★ Fokus) und Weiterüben-Button.",
        "caption_en": "Calm home hub featuring the Lauscher mascot, curated listening tips, personal focus badges, and quick continue action.",
        "marketing_tag": "Hero / Store #1",
    },
    {
        "id": "02",
        "slug": "cadence_in_action_folk_light",
        "category": "exercises",
        "theme": "waldlichtung",
        "appearance": "light",
        "title_de": "Kadenz-Übung in Aktion (Gelöst)",
        "title_en": "Cadence Training in Action (Solved)",
        "caption_de": "Aktive 4-Takt-Kadenz mit direktem grünem Feedback, aufgedeckter Stufe, Streak-Zähler und anpassbarer Tonart.",
        "caption_en": "Active 4-bar harmonic cadence with instant green feedback, revealed chord degree, streak counter, and customizable key.",
        "marketing_tag": "Core Feature / Store #2",
    },
    {
        "id": "03",
        "slug": "solfege_keyboard_klassik_light",
        "category": "exercises",
        "theme": "morgentau",
        "appearance": "light",
        "title_de": "Solfège mit interaktiver Klaviatur",
        "title_en": "Solfège with Interactive Keyboard",
        "caption_de": "Tonstufen (Do–Re–Mi) im tonalen Kontext direkt auf der interaktiven Klaviatur erleben – hier im Theme Klassik.",
        "caption_en": "Experience scale degrees (Do–Re–Mi) directly on an interactive piano keyboard — shown in the Classical theme.",
        "marketing_tag": "Interactive Keyboard / Store #3",
    },
    {
        "id": "04",
        "slug": "notation_chords_klassik_light",
        "category": "exercises",
        "theme": "morgentau",
        "appearance": "light",
        "title_de": "Notenlesen & Akkorde im Notensystem",
        "title_en": "Sight-Reading & Chords on the Staff",
        "caption_de": "Gestochen scharfes SVG-Notensystem mit Dreiklängen, Umkehrungen und sofortiger visueller wie akustischer Rückmeldung.",
        "caption_en": "Crisp vector staff notation for triads and inversions with instant visual and musical feedback.",
        "marketing_tag": "Music Reading",
    },
    {
        "id": "05",
        "slug": "rhythm_dictation_jazz_dark",
        "category": "exercises",
        "theme": "abenddaemmerung",
        "appearance": "dark",
        "title_de": "Rhythmus-Training im Dunkelmodus",
        "title_en": "Rhythm Training in Dark Mode",
        "caption_de": "Gezeichnete Rhythmus-Notation mit direkter Auflösung – im augenschonenden Jazz-Dunkelmodus.",
        "caption_en": "Hand-crafted rhythm notation with instant answer feedback in the dark Jazz theme.",
        "marketing_tag": "Dark Mode / Rhythm",
    },
    {
        "id": "06",
        "slug": "exam_result_review_folk_light",
        "category": "exercises",
        "theme": "waldlichtung",
        "appearance": "light",
        "title_de": "Prüfungs-Auswertung & Hör-Rückschau",
        "title_en": "Exam Results & Audio Review",
        "caption_de": "Kategorie-Prüfung mit detaillierter Auswertung und direkter A/B-Hör-Rückschau für knifflige Aufgaben.",
        "caption_en": "Structured category exam with score summary and side-by-side audio review for missed items.",
        "marketing_tag": "Exam Mode / Store #4",
    },
    {
        "id": "07",
        "slug": "warmup_arpeggio_folk_light",
        "category": "exercises",
        "theme": "waldlichtung",
        "appearance": "light",
        "title_de": "Einsing-Helfer mit Live-Klaviatur",
        "title_en": "Vocal Warmup with Live Keyboard",
        "caption_de": "Geführtes Einsingen mit Arpeggio-Führung, Halbton-Steuerung und mitlaufender Live-Klaviatur.",
        "caption_en": "Guided vocal warmup with arpeggio cues, semitone transpose controls, and live animated keyboard.",
        "marketing_tag": "Vocal Warmup",
    },
    {
        "id": "08",
        "slug": "tools_hub_jazz_light",
        "category": "tools",
        "theme": "abenddaemmerung",
        "appearance": "light",
        "title_de": "Werkzeugkasten (6 Praxis-Tools)",
        "title_en": "Practice Toolkit (6 Tools)",
        "caption_de": "Metronom, Tuner, Freies Spiel, Griffbrett, Quintenzirkel und Nashville-Zahlensystem griffbereit in einer App.",
        "caption_en": "Metronome, chromatic tuner, free play, fretboard, circle of fifths, and Nashville number system in one place.",
        "marketing_tag": "Toolkit Overview",
    },
    {
        "id": "09",
        "slug": "metronome_active_folk_light",
        "category": "tools",
        "theme": "waldlichtung",
        "appearance": "light",
        "title_de": "Praxis-Metronom in Aktion",
        "title_en": "Practice Metronome in Action",
        "caption_de": "Laufendes Metronom mit Tap-Tempo, Betonungsmustern, Unterteilungen und klarem visuellem Beat-Impuls.",
        "caption_en": "Active metronome with tap tempo, custom beat accents, subdivisions, and clear visual beat pulse.",
        "marketing_tag": "Metronome / Store #5",
    },
    {
        "id": "10",
        "slug": "fretboard_metal_dark",
        "category": "tools",
        "theme": "metal",
        "appearance": "dark",
        "title_de": "Gitarren-Griffbrett im Metal-Theme",
        "title_en": "Guitar Fretboard in Metal Theme",
        "caption_de": "Interaktives Griffbrett für Akkorde, Lagen und Tonleitern – im tiefschwarzen, kantigen Metal-Look.",
        "caption_en": "Interactive guitar fretboard for chord voicings, positions, and scales in the sleek dark Metal theme.",
        "marketing_tag": "Guitar / Metal Theme",
    },
    {
        "id": "11",
        "slug": "nashville_capo_klassik_dark",
        "category": "tools",
        "theme": "morgentau",
        "appearance": "dark",
        "title_de": "Nashville-Zahlensystem & Kapo-Übersetzer",
        "title_en": "Nashville Number System & Capo Translator",
        "caption_de": "Tonarten-Diagramm, 12-Tonarten-Matrix und unabhängiger Kapodaster-Übersetzer für Band & Songwriting.",
        "caption_en": "Interactive chord degree chart, 12-key matrix, and standalone capo translator for bands and songwriters.",
        "marketing_tag": "Nashville / Unique Selling Point",
    },
    {
        "id": "12",
        "slug": "circle_of_fifths_jazz_light",
        "category": "tools",
        "theme": "abenddaemmerung",
        "appearance": "light",
        "title_de": "Interaktiver Quintenzirkel",
        "title_en": "Interactive Circle of Fifths",
        "caption_de": "Visuelles Klangrad mit Dur-/Moll-Parallelen, Vorzeichen und hörbaren Stufen-Akkorden im Jazz-Theme.",
        "caption_en": "Visual interactive circle of fifths with major/minor rings, key signatures, and playable diatonic chords.",
        "marketing_tag": "Theory Visual / Store #6",
    },
    {
        "id": "13",
        "slug": "knowledge_article_folk_dark",
        "category": "knowledge",
        "theme": "waldlichtung",
        "appearance": "dark",
        "title_de": "Wissensartikel mit Hörbeispielen",
        "title_en": "Knowledge Article with Audio Demos",
        "caption_de": "11 tiefgehende Musiktheorie-Artikel in 7 Sprachen mit direkt abspielbaren Klangbeispielen.",
        "caption_en": "11 in-depth music theory articles across 7 languages with playable interactive audio examples.",
        "marketing_tag": "Editorial Depth",
    },
    {
        "id": "14",
        "slug": "home_metal_mascot_dark",
        "category": "themes",
        "theme": "metal",
        "appearance": "dark",
        "title_de": "Metal-Theme & Metal-Lauscher",
        "title_en": "Metal Theme & Metal Mascot",
        "caption_de": "Das eigenständige Metal-Theme bringt 33 eigene Metal-Lauscher-Posen und kantiges Dark-UI mit.",
        "caption_en": "The dedicated Metal theme switches live to 33 custom Metal mascot poses and a sharp obsidian UI.",
        "marketing_tag": "Branding / Theme Showcase",
    },
    {
        "id": "15",
        "slug": "mixer_reverb_folk_light",
        "category": "audio",
        "theme": "waldlichtung",
        "appearance": "light",
        "title_de": "Instrumenten-Mixer & Raumhall",
        "title_en": "Instrument Mixer & Room Reverb",
        "caption_de": "7 gesampelte Instrumente mit Raumcharakter (Trocken, Natürlich, Konzertsaal) und individuellem Hall-Anteil.",
        "caption_en": "7 sampled instruments with selectable room ambience (Dry, Natural, Concert Hall) and per-instrument reverb.",
        "marketing_tag": "Audio Quality",
    },
]


def find_chrome() -> str:
    for path in CHROME_CANDIDATES:
        if path and os.path.isfile(path):
            return path
    raise FileNotFoundError(
        "Google Chrome/Chromium wurde nicht gefunden. Bitte Chrome installieren oder Pfad über --chrome angeben."
    )


def get_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def read_app_version() -> dict:
    txt = (ROOT / "version.js").read_text(encoding="utf-8")
    name = re.search(r'name:\s*"([^"]+)"', txt)
    build = re.search(r'build:\s*(\d+)', txt)
    date = re.search(r'date:\s*"([^"]+)"', txt)
    return {
        "name": name.group(1) if name else "unknown",
        "build": int(build.group(1)) if build else 0,
        "date": date.group(1) if date else "",
    }


def read_git_commit() -> str:
    try:
        return subprocess.check_output(
            ["git", "rev-parse", "--short", "HEAD"], cwd=ROOT, stderr=subprocess.DEVNULL
        ).decode().strip()
    except Exception:
        return "unknown"


class QuietHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


class ThreadedTCPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def start_static_server(directory: Path):
    handler = functools.partial(QuietHTTPRequestHandler, directory=str(directory))
    server = ThreadedTCPServer(("127.0.0.1", 0), handler)
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, port


class SimpleCDPClient:
    """Minimaler RFC-6455 WebSocket-Client für Chrome DevTools Protocol (nur Python-Stdlib)."""

    def __init__(self, ws_url: str, timeout: float = 30.0):
        m = re.match(r"^ws://([^:/]+):(\d+)(/.*)$", ws_url)
        if not m:
            raise ValueError(f"Ungültige WebSocket-URL: {ws_url}")
        host, port, path = m.group(1), int(m.group(2)), m.group(3)
        self.sock = socket.create_connection((host, port), timeout=timeout)
        self.sock.settimeout(timeout)
        self._buf = bytearray()
        self._msg_id = 0

        key = base64.b64encode(os.urandom(16)).decode()
        req = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {host}:{port}\r\n"
            f"Upgrade: websocket\r\n"
            f"Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            f"Sec-WebSocket-Version: 13\r\n\r\n"
        )
        self.sock.sendall(req.encode("ascii"))
        resp = b""
        while b"\r\n\r\n" not in resp:
            chunk = self.sock.recv(4096)
            if not chunk:
                raise ConnectionError("WebSocket-Handshake abgebrochen")
            resp += chunk
        header, rest = resp.split(b"\r\n\r\n", 1)
        if b"101" not in header.split(b"\r\n", 1)[0]:
            raise ConnectionError(f"WebSocket-Handshake fehlgeschlagen: {header.decode(errors='ignore')}")
        self._buf.extend(rest)

    def close(self):
        try:
            self.sock.close()
        except Exception:
            pass

    def _recv_exact(self, n: int) -> bytes:
        while len(self._buf) < n:
            chunk = self.sock.recv(65536)
            if not chunk:
                raise ConnectionError("WebSocket-Verbindung geschlossen")
            self._buf.extend(chunk)
        out = bytes(self._buf[:n])
        del self._buf[:n]
        return out

    def _send_frame(self, payload: bytes, opcode: int = 0x1):
        mask = os.urandom(4)
        length = len(payload)
        header = bytearray([0x80 | opcode])
        if length < 126:
            header.append(0x80 | length)
        elif length < 65536:
            header.append(0x80 | 126)
            header.extend(struct.pack("!H", length))
        else:
            header.append(0x80 | 127)
            header.extend(struct.pack("!Q", length))
        header.extend(mask)
        masked = bytes(b ^ mask[i & 3] for i, b in enumerate(payload))
        self.sock.sendall(bytes(header) + masked)

    def _recv_message(self) -> str:
        fragments = []
        while True:
            b1, b2 = self._recv_exact(2)
            fin = (b1 & 0x80) != 0
            opcode = b1 & 0x0F
            masked = (b2 & 0x80) != 0
            length = b2 & 0x7F
            if length == 126:
                length = struct.unpack("!H", self._recv_exact(2))[0]
            elif length == 127:
                length = struct.unpack("!Q", self._recv_exact(8))[0]
            mask_key = self._recv_exact(4) if masked else None
            data = self._recv_exact(length)
            if mask_key:
                data = bytes(b ^ mask_key[i & 3] for i, b in enumerate(data))
            if opcode == 0x8:
                raise ConnectionError("WebSocket vom Server geschlossen")
            if opcode == 0x9:  # Ping -> Pong
                self._send_frame(data, opcode=0xA)
                continue
            if opcode == 0xA:  # Pong
                continue
            fragments.append(data)
            if fin:
                return b"".join(fragments).decode("utf-8", errors="replace")

    def call(self, method: str, params: dict | None = None) -> dict:
        self._msg_id += 1
        target_id = self._msg_id
        payload = json.dumps({"id": target_id, "method": method, "params": params or {}}).encode("utf-8")
        self._send_frame(payload, opcode=0x1)
        while True:
            raw = self._recv_message()
            msg = json.loads(raw)
            if msg.get("id") == target_id:
                if "error" in msg:
                    raise RuntimeError(f"CDP-Fehler bei {method}: {msg['error']}")
                return msg.get("result", {})

    def eval_js(self, expression: str, await_promise: bool = True):
        res = self.call(
            "Runtime.evaluate",
            {
                "expression": expression,
                "returnByValue": True,
                "awaitPromise": await_promise,
            },
        )
        if "exceptionDetails" in res:
            details = res["exceptionDetails"]
            desc = details.get("exception", {}).get("description") or details.get("text") or str(details)
            raise RuntimeError(f"JS-Fehler: {desc}")
        return res.get("result", {}).get("value")


def build_init_script(lang: str, native_mock: bool) -> str:
    user_name = "Lena" if lang == "de" else "Alex"
    visual = {
        "appearance": "light",
        "theme": "waldlichtung",
        "language": lang,
        "autoNextAfterCorrect": False,
        "playCorrectAnswerAudio": False,
        "onboardingDone": True,
    }
    profile = {
        "name": user_name,
        "role": "guitar",
        "focus": "harmony",
        "focuses": ["harmony"],
        "goalMinutes": 10,
        "accessory": "headphones",
        "hasPracticed": True,
        "showHomeQuickMixes": False,
        "singAlongTips": False,
        "singAlongIntroDone": True,
        "modesRootHintSeen": True,
        "cadenceKeyHintSeen": True,
        "examHistory": [],
    }
    native_js = ""
    if native_mock:
        native_js = """
        window.Capacitor = {
          isNativePlatform: () => true,
          getPlatform: () => "android",
          Plugins: {}
        };
        """
    return f"""
    (() => {{
      try {{
        localStorage.clear();
        localStorage.setItem("lauschebaer_visual_prefs_v1", {json.dumps(json.dumps(visual))});
        localStorage.setItem("lauschebaer_profile_v1", {json.dumps(json.dumps(profile))});
      }} catch (_e) {{}}
      {native_js}
    }})();
    """


def build_shot_js(shot_id: str, lang: str, theme: str, appearance: str) -> str:
    return f"""
    (async () => {{
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const raf2 = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      // Splash & Onboarding sicher ausblenden
      document.getElementById("startupSplash")?.remove();
      document.getElementById("welcomeOnboarding")?.classList.add("hidden");
      document.body.classList.remove("onboarding-open");

      // Audio stumm & sofort fertig, damit keine echten Audio-Hänger entstehen
      if (typeof audioEngine !== "undefined" && audioEngine) {{
        audioEngine.isMuted = true;
        audioEngine.ensureReady = async () => true;
        audioEngine.playNote = () => {{}};
        audioEngine.playChord = () => {{}};
        audioEngine.playArpeggio = () => {{}};
        audioEngine.playInterval = () => {{}};
        audioEngine.playPercussion = () => {{}};
        audioEngine.triggerPercussion = () => {{}};
        audioEngine.playRootPad = () => {{}};
      }}
      if (typeof stopPlayback === "function") stopPlayback();
      if (typeof stopMetronome === "function" && state?.metronome?.running) stopMetronome();
      if (typeof clearWarmupTimers === "function") clearWarmupTimers();
      if (typeof closeAllModals === "function") closeAllModals();
      document.getElementById("mixerBackdrop")?.classList.add("modal-hidden");
      document.getElementById("settingsBackdrop")?.classList.add("modal-hidden");
      document.getElementById("aboutBackdrop")?.classList.add("modal-hidden");

      // Profil-State konsistent setzen (Fokus-Badges, keine störenden Erst-Hinweise)
      if (state.profile) {{
        state.profile.name = {json.dumps("Lena" if lang == "de" else "Alex")};
        state.profile.focus = "harmony";
        state.profile.focuses = ["harmony"];
        state.profile.hasPracticed = true;
        state.profile.singAlongTips = false;
        state.profile.singAlongIntroDone = true;
        state.profile.modesRootHintSeen = true;
        state.profile.cadenceKeyHintSeen = true;
      }}
      if (typeof dismissModesRootHint === "function") dismissModesRootHint(true);
      if (typeof dismissCadenceKeyHint === "function") dismissCadenceKeyHint(true);

      // Theme, Appearance & Sprache setzen
      state.settings.language = {json.dumps(lang)};
      state.settings.theme = {json.dumps(theme)};
      state.settings.appearance = {json.dumps(appearance)};
      state.settings.autoNextAfterCorrect = false;
      state.settings.playCorrectAnswerAudio = false;
      state.settings.onboardingDone = true;
      if (typeof applyAppLanguage === "function") applyAppLanguage({json.dumps(lang)}, false);
      if (typeof applyThemeAndAppearance === "function") {{
        applyThemeAndAppearance({json.dumps(theme)}, {json.dumps(appearance)});
      }} else {{
        document.documentElement.setAttribute("data-theme", {json.dumps(theme)});
        document.documentElement.setAttribute("data-appearance", {json.dumps(appearance)});
      }}
      if (typeof refreshMascotsForCurrentTheme === "function") refreshMascotsForCurrentTheme();

      // Sauberer Ausgangszustand
      if (state.exam?.active && typeof cleanupActiveExamState === "function") {{
        cleanupActiveExamState({{ resetToPractice: true }});
      }}
      state.streakState = {{ count: 0, activeNoticeMilestone: 0, scopeKey: null }};

      const findChoiceButton = (targetKey, targetSymbol) => {{
        const btns = Array.from(document.querySelectorAll("#optionsGrid button, .degrees-grid button, .degree-btn"));
        const norm = (s) => String(s || "").trim().toLowerCase();
        const exactSym = norm(targetSymbol);
        const exactKey = norm(targetKey);
        return btns.find(b =>
          b.dataset.choiceKey === targetKey ||
          b.dataset.key === targetKey ||
          b.dataset.degree === targetKey ||
          b.dataset.cell === targetKey
        ) || btns.find(b => {{
          const head = norm(b.querySelector(".degree-symbol, .opt-main, strong, .chord-name, span")?.textContent);
          return (exactSym && head === exactSym) || (exactKey && head === exactKey);
        }}) || btns.find(b => {{
          const txt = norm(b.textContent);
          return (exactSym && txt === exactSym) || (exactKey && txt === exactKey);
        }}) || btns[0] || null;
      }};

      const shotId = {json.dumps(shot_id)};

      if (shotId === "01" || shotId === "14") {{
        state.currentQuoteIndex = shotId === "01" ? 0 : 84;
        switchView("home", {{ skipHistoryPush: true }});
        if (typeof refreshCurrentQuoteLocalization === "function") refreshCurrentQuoteLocalization();
        if (typeof syncHomeFocusHighlights === "function") syncHomeFocusHighlights();
        if (typeof renderHomeMascot === "function") renderHomeMascot();
        document.querySelector(".main-content")?.scrollTo(0, 0);
      }} else if (shotId === "02") {{
        state.settings.mode = "cadence";
        state.settings.difficulty = 2;
        state.settings.cadencePos = "last";
        state.settings.keyMode = "easy";
        switchView("exercise", {{ skipHistoryPush: true }});
        const ex = state.currentExercise;
        const targetKey = ex?.targetItem?.key;
        const targetSym = ex?.targetItem?.symbol || ex?.targetItem?.label || targetKey;
        state.streakState = {{ count: 3, activeNoticeMilestone: 0, scopeKey: "cadence" }};
        const matchBtn = findChoiceButton(targetKey, targetSym);
        if (matchBtn && typeof handleAnswer === "function" && targetKey) {{
          handleAnswer(targetKey, matchBtn);
        }}
      }} else if (shotId === "03") {{
        state.settings.mode = "solfege";
        state.settings.solfegeDifficulty = 2;
        switchView("exercise", {{ skipHistoryPush: true }});
        const ex = state.currentExercise;
        const targetMidi = ex?.targetItem?.midi ?? ex?.targetMidi ?? ex?.midi;
        const keyBtn = (targetMidi != null && document.getElementById(`solfegeKey_${{targetMidi}}`)) ||
                       document.querySelector("#solfegeKeyboardWrap .piano-white-key.key-in-scale");
        if (keyBtn) keyBtn.click();
      }} else if (shotId === "04") {{
        state.settings.mode = "notation-chords";
        state.settings.notationDifficulty = 1;
        switchView("exercise", {{ skipHistoryPush: true }});
        const ex = state.currentExercise;
        const targetKey = ex?.targetItem?.key || ex?.correctKey;
        const targetSym = ex?.targetItem?.symbol || ex?.targetItem?.label || targetKey;
        const matchBtn = findChoiceButton(targetKey, targetSym);
        if (matchBtn && typeof handleAnswer === "function" && targetKey) {{
          handleAnswer(targetKey, matchBtn);
        }} else if (matchBtn) {{
          matchBtn.click();
        }}
      }} else if (shotId === "05") {{
        state.settings.mode = "rhythm-dictation";
        state.settings.rhythmDifficulty = 2;
        switchView("exercise", {{ skipHistoryPush: true }});
        const ex = state.currentExercise;
        // Erste zwei Schläge richtig lösen, damit Notenbild im 4-Schlag-Raster live in Aktion zu sehen ist
        for (let step = 0; step < 2; step++) {{
          const beatKey = ex?.beats?.[step]?.key || ex?.targetCells?.[step]?.key || ex?.cells?.[step]?.key;
          const matchBtn = findChoiceButton(beatKey, beatKey);
          if (beatKey && typeof handleAnswer === "function") {{
            handleAnswer(beatKey, matchBtn);
          }} else if (matchBtn) {{
            matchBtn.click();
          }}
        }}
      }} else if (shotId === "06") {{
        startCategoryExam("cadence", "cadence_l2");
        if (state.exam) state.exam.startedAt = Date.now() - 164000;
        await raf2();
        const totalQ = state.exam?.totalQuestions || 10;
        for (let i = 0; i < totalQ && state.exam?.active; i++) {{
          const ex = state.currentExercise;
          const targetKey = ex?.targetItem?.key;
          const targetSym = ex?.targetItem?.symbol || ex?.targetItem?.label || targetKey;
          const btns = Array.from(document.querySelectorAll("#optionsGrid button, .degrees-grid button, .degree-btn"));
          const rightBtn = findChoiceButton(targetKey, targetSym);
          const wrongBtn = btns.find(b => b !== rightBtn);
          const wantWrong = (i === 1 || i === 5) && wrongBtn;
          if (wantWrong && typeof handleAnswer === "function") {{
            const altKey = ex?.options?.find(o => o.key !== targetKey)?.key || "IV";
            handleAnswer(altKey, wrongBtn);
          }} else if (rightBtn && typeof handleAnswer === "function" && targetKey) {{
            handleAnswer(targetKey, rightBtn);
          }} else if (rightBtn) {{
            rightBtn.click();
          }}
          if (state.exam?.active && state.exam.currentIdx < state.exam.totalQuestions - 1 && typeof advanceExamQuestion === "function") {{
            advanceExamQuestion();
          }} else if (state.exam?.active && typeof completeCategoryExam === "function") {{
            completeCategoryExam();
          }}
        }}
        document.querySelector("#viewExamResult")?.scrollTo(0, 0);
        document.querySelector(".main-content")?.scrollTo(0, 0);
      }} else if (shotId === "07") {{
        openWarmupView("arpeggio-focus", {{ returnView: "home" }});
        state.warmup.stepIndex = 1;
        state.warmup.status = "running";
        renderWarmupView();
        updateWarmupKeyboardHighlights(60, [60, 64, 67, 72]);
      }} else if (shotId === "08") {{
        switchView("tools", {{ skipHistoryPush: true }});
        document.querySelector(".main-content")?.scrollTo(0, 0);
      }} else if (shotId === "09") {{
        openMetronomeView("tools");
        setMetronomeBpm(108);
        state.metronome.running = true;
        if (typeof syncMetronomeTransportUI === "function") syncMetronomeTransportUI();
        const tiles = document.querySelectorAll(".metro-beat-tile");
        tiles.forEach((t, idx) => {{
          t.classList.toggle("is-current", idx === 0);
          t.classList.toggle("is-beat-hit", idx === 0);
        }});
        document.getElementById("metroTapCircle")?.classList.add("is-beat-accent");
        document.getElementById("metroPendulumTrack")?.classList.add("swing-right", "is-accent-hit");
        document.querySelector(".main-content")?.scrollTo(0, 0);
      }} else if (shotId === "10") {{
        openFretboardView("tools");
        document.querySelector(".main-content")?.scrollTo(0, 0);
      }} else if (shotId === "11") {{
        openNashvilleView("tools");
        state.nashvilleState = {{ keyIdx: 7, mode: "major", capoKeyIdx: 9, capoMode: "major", capoFret: 2 }};
        renderNashvilleView();
        document.querySelector(".main-content")?.scrollTo(0, 0);
      }} else if (shotId === "12") {{
        state.circleOfFifthsState = {{ idx: 2, ringMode: "major", tab: "chords" }};
        switchView("circle", {{ skipHistoryPush: true }});
        document.querySelector(".main-content")?.scrollTo(0, 0);
      }} else if (shotId === "13") {{
        openKnowledgeArticle("art-4chords");
        document.querySelector(".main-content")?.scrollTo(0, 0);
      }} else if (shotId === "15") {{
        switchView("home", {{ skipHistoryPush: true }});
        document.getElementById("openMixerBtn")?.click();
        await wait(60);
        document.getElementById("mixerTabReverbBtn")?.click();
      }}

      await document.fonts.ready;
      await raf2();
      if (typeof fitExerciseLayout === "function" && state.currentView === "exercise") {{
        fitExerciseLayout();
      }}
      await wait(160);
      return {{
        view: state.currentView,
        theme: document.documentElement.getAttribute("data-theme"),
        appearance: document.documentElement.getAttribute("data-appearance"),
        lang: document.documentElement.getAttribute("lang")
      }};
    }})();
    """


def generate_gallery_html(manifest: dict, out_dir: Path):
    items_json = json.dumps(manifest["items"], ensure_ascii=False)
    meta = manifest["meta"]
    html = f"""<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lauscher • Screenshot-Datenbank ({meta['version']['name']})</title>
  <style>
    :root {{
      --bg: #FAF7F2;
      --card: #FFFFFF;
      --warm: #F3EFE6;
      --ink: #2E3147;
      --muted: #666B82;
      --sage: #2E6F4E;
      --sage-soft: #E5F4EB;
      --border: rgba(46, 49, 71, 0.13);
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.45;
      padding: 24px;
    }}
    header {{
      max-width: 1380px;
      margin: 0 auto 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-end;
      gap: 12px;
    }}
    h1 {{ font-size: 1.55rem; font-weight: 800; }}
    .meta {{ font-size: 0.86rem; color: var(--muted); }}
    .toolbar {{
      max-width: 1380px;
      margin: 0 auto 22px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px 18px;
      align-items: center;
      box-shadow: 0 4px 14px rgba(46, 49, 71, 0.05);
    }}
    .filter-group {{ display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }}
    .filter-label {{ font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-right: 4px; }}
    .pill {{
      border: 1.5px solid var(--border);
      background: var(--warm);
      color: var(--ink);
      border-radius: 999px;
      padding: 5px 12px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
    }}
    .pill.active {{
      background: var(--sage-soft);
      border-color: var(--sage);
      color: var(--sage);
    }}
    .search {{
      margin-left: auto;
      padding: 7px 12px;
      border: 1.5px solid var(--border);
      border-radius: 10px;
      font-size: 0.85rem;
      min-width: 210px;
      background: var(--bg);
      color: var(--ink);
    }}
    .count-bar {{
      max-width: 1380px;
      margin: 0 auto 14px;
      font-size: 0.85rem;
      color: var(--muted);
      font-weight: 600;
    }}
    .grid {{
      max-width: 1380px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 18px;
    }}
    .card {{
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 16px rgba(46, 49, 71, 0.06);
      transition: transform 0.14s ease, box-shadow 0.14s ease;
    }}
    .card:hover {{ transform: translateY(-2px); box-shadow: 0 10px 26px rgba(46, 49, 71, 0.11); }}
    .thumb-wrap {{
      background: #E8E3D9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
      cursor: zoom-in;
      height: 290px;
    }}
    .card[data-appearance="dark"] .thumb-wrap {{ background: #191B22; }}
    .thumb-wrap img {{
      max-width: 100%;
      max-height: 100%;
      border-radius: 10px;
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22);
      object-fit: contain;
    }}
    .card-body {{ padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 7px; flex: 1; }}
    .badges {{ display: flex; flex-wrap: wrap; gap: 5px; }}
    .badge {{
      font-size: 0.7rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--warm);
      color: var(--ink);
    }}
    .badge.tag {{ background: var(--sage-soft); color: var(--sage); }}
    .card-title {{ font-size: 0.96rem; font-weight: 800; }}
    .card-caption {{ font-size: 0.82rem; color: var(--muted); flex: 1; }}
    .card-path {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.72rem; color: var(--muted); word-break: break-all; }}
    .lightbox {{
      position: fixed;
      inset: 0;
      background: rgba(15, 17, 26, 0.88);
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;
      padding: 24px;
      z-index: 100;
    }}
    .lightbox.open {{ display: flex; }}
    .lightbox img {{
      max-width: 92vw;
      max-height: 82vh;
      border-radius: 12px;
      box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5);
    }}
    .lightbox-meta {{ color: #F2F4F8; text-align: center; max-width: 780px; }}
    .lightbox-meta strong {{ display: block; font-size: 1rem; margin-bottom: 4px; }}
    .lightbox-meta span {{ font-size: 0.85rem; color: #C2C8D6; }}
    .lb-close {{
      position: fixed;
      top: 18px;
      right: 22px;
      background: rgba(255, 255, 255, 0.14);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 999px;
      padding: 8px 14px;
      font-weight: 700;
      cursor: pointer;
    }}
  </style>
</head>
<body>
  <header>
    <div>
      <h1>Lauscher • Screenshot-Datenbank</h1>
      <div class="meta">Version {meta['version']['name']} (Build {meta['version']['build']}) • Commit <code>{meta['gitCommit']}</code> • Erstellt: {meta['generatedAt']}</div>
    </div>
  </header>

  <section class="toolbar">
    <div class="filter-group" data-filter="lang">
      <span class="filter-label">Sprache</span>
      <button class="pill active" data-val="all">Alle</button>
      <button class="pill" data-val="de">DE</button>
      <button class="pill" data-val="en">EN</button>
    </div>
    <div class="filter-group" data-filter="platform">
      <span class="filter-label">Format</span>
      <button class="pill active" data-val="all">Alle</button>
      <button class="pill" data-val="app">App</button>
      <button class="pill" data-val="webapp">Webapp</button>
    </div>
    <div class="filter-group" data-filter="theme">
      <span class="filter-label">Theme</span>
      <button class="pill active" data-val="all">Alle</button>
      <button class="pill" data-val="waldlichtung">Folk</button>
      <button class="pill" data-val="morgentau">Klassik</button>
      <button class="pill" data-val="abenddaemmerung">Jazz</button>
      <button class="pill" data-val="metal">Metal</button>
    </div>
    <input id="searchInput" class="search" type="search" placeholder="Suchen (z. B. Metronom, Metal, Exam)…">
  </section>

  <div id="countBar" class="count-bar"></div>
  <main id="grid" class="grid"></main>

  <div id="lightbox" class="lightbox" role="dialog" aria-modal="true">
    <button id="lbClose" class="lb-close" type="button">Schließen (Esc)</button>
    <img id="lbImg" alt="">
    <div class="lightbox-meta">
      <strong id="lbTitle"></strong>
      <span id="lbCaption"></span>
    </div>
  </div>

  <script>
    const ITEMS = {items_json};
    const filters = {{ lang: "all", platform: "all", theme: "all", q: "" }};
    let visibleItems = ITEMS;
    let lbIndex = -1;

    function render() {{
      const q = filters.q.trim().toLowerCase();
      visibleItems = ITEMS.filter(it => {{
        if (filters.lang !== "all" && it.lang !== filters.lang) return false;
        if (filters.platform !== "all" && it.platform !== filters.platform) return false;
        if (filters.theme !== "all" && it.theme !== filters.theme) return false;
        if (q) {{
          const hay = [it.title, it.caption, it.file, it.themeLabel, it.marketingTag, it.category].join(" ").toLowerCase();
          if (!hay.includes(q)) return false;
        }}
        return true;
      }});
      document.getElementById("countBar").textContent = `${{visibleItems.length}} von ${{ITEMS.length}} Screenshots angezeigt`;
      const grid = document.getElementById("grid");
      grid.innerHTML = visibleItems.map((it, idx) => `
        <article class="card" data-appearance="${{it.appearance}}">
          <div class="thumb-wrap" data-open="${{idx}}">
            <img src="${{it.file}}" alt="${{it.title}}" loading="lazy">
          </div>
          <div class="card-body">
            <div class="badges">
              <span class="badge">${{it.lang.toUpperCase()}}</span>
              <span class="badge">${{it.platform === "app" ? "App" : "Webapp"}}</span>
              <span class="badge">${{it.themeLabel}} · ${{it.appearance === "dark" ? "Dunkel" : "Hell"}}</span>
              <span class="badge tag">${{it.marketingTag}}</span>
            </div>
            <div class="card-title">${{it.id}} · ${{it.title}}</div>
            <div class="card-caption">${{it.caption}}</div>
            <div class="card-path">${{it.file}} (${{it.pixelWidth}}×${{it.pixelHeight}})</div>
          </div>
        </article>
      `).join("");
      grid.querySelectorAll("[data-open]").forEach(el => {{
        el.addEventListener("click", () => openLightbox(Number(el.dataset.open)));
      }});
    }}

    function openLightbox(idx) {{
      if (idx < 0 || idx >= visibleItems.length) return;
      lbIndex = idx;
      const it = visibleItems[idx];
      document.getElementById("lbImg").src = it.file;
      document.getElementById("lbTitle").textContent = `${{it.id}} · ${{it.title}} (${{it.lang.toUpperCase()}} · ${{it.platform}} · ${{it.themeLabel}})`;
      document.getElementById("lbCaption").textContent = it.caption;
      document.getElementById("lightbox").classList.add("open");
    }}

    function closeLightbox() {{
      document.getElementById("lightbox").classList.remove("open");
      lbIndex = -1;
    }}

    document.querySelectorAll(".filter-group").forEach(grp => {{
      const key = grp.dataset.filter;
      grp.querySelectorAll(".pill").forEach(btn => {{
        btn.addEventListener("click", () => {{
          filters[key] = btn.dataset.val;
          grp.querySelectorAll(".pill").forEach(b => b.classList.toggle("active", b === btn));
          render();
        }});
      }});
    }});
    document.getElementById("searchInput").addEventListener("input", e => {{
      filters.q = e.target.value;
      render();
    }});
    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lightbox").addEventListener("click", e => {{
      if (e.target.id === "lightbox") closeLightbox();
    }});
    document.addEventListener("keydown", e => {{
      if (lbIndex < 0) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") openLightbox((lbIndex + 1) % visibleItems.length);
      else if (e.key === "ArrowLeft") openLightbox((lbIndex - 1 + visibleItems.length) % visibleItems.length);
    }});

    render();
  </script>
</body>
</html>
"""
    (out_dir / "gallery.html").write_text(html, encoding="utf-8")


def capture_matrix(chrome_bin: str, out_dir: Path, langs: list[str], platforms: list[str], shot_filter: set[str] | None):
    shots = [s for s in SHOTS if not shot_filter or s["id"] in shot_filter]
    if not shots:
        raise ValueError("Keine passenden Shots gefunden.")

    server, http_port = start_static_server(ROOT)
    base_url = f"http://127.0.0.1:{http_port}/index.html"
    cdp_port = get_free_port()
    user_data_dir = tempfile.mkdtemp(prefix="lauscher_cdp_")

    chrome_cmd = [
        chrome_bin,
        "--headless=new",
        f"--remote-debugging-port={cdp_port}",
        f"--user-data-dir={user_data_dir}",
        "--no-first-run",
        "--no-default-browser-check",
        "--hide-scrollbars",
        "--mute-audio",
        "--autoplay-policy=no-user-gesture-required",
        "--disable-background-networking",
        "--disable-sync",
        "--metrics-recording-only",
        "--window-size=1200,900",
        "about:blank",
    ]
    chrome_proc = subprocess.Popen(
        chrome_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
    )

    items = []
    try:
        # Warten bis DevTools JSON-Endpoint bereit ist
        ws_url = None
        deadline = time.time() + 15.0
        while time.time() < deadline:
            try:
                with urllib.request.urlopen(f"http://127.0.0.1:{cdp_port}/json/list", timeout=1.5) as resp:
                    targets = json.loads(resp.read().decode())
                    page_targets = [t for t in targets if t.get("type") == "page" and t.get("webSocketDebuggerUrl")]
                    if page_targets:
                        ws_url = page_targets[0]["webSocketDebuggerUrl"]
                        break
            except Exception:
                time.sleep(0.2)
        if not ws_url:
            raise RuntimeError("Headless Chrome DevTools-Endpoint konnte nicht erreicht werden.")

        cdp = SimpleCDPClient(ws_url, timeout=45.0)
        try:
            cdp.call("Page.enable")
            cdp.call("Runtime.enable")
            cdp.call("Emulation.setFocusEmulationEnabled", {"enabled": True})

            total = len(langs) * len(platforms) * len(shots)
            done = 0

            for lang in langs:
                for plat_key in platforms:
                    plat = PLATFORMS[plat_key]
                    target_dir = out_dir / lang / plat_key
                    target_dir.mkdir(parents=True, exist_ok=True)

                    # Viewport setzen
                    cdp.call(
                        "Emulation.setDeviceMetricsOverride",
                        {
                            "width": plat["width"],
                            "height": plat["height"],
                            "deviceScaleFactor": plat["scale"],
                            "mobile": plat["mobile"],
                        },
                    )
                    if plat["mobile"]:
                        cdp.call("Emulation.setTouchEmulationEnabled", {"enabled": True})
                    else:
                        cdp.call("Emulation.setTouchEmulationEnabled", {"enabled": False})

                    # Init-Skript registrieren (localStorage + ggf. Capacitor-Mock) und frisch laden
                    init_res = cdp.call(
                        "Page.addScriptToEvaluateOnNewDocument",
                        {"source": build_init_script(lang, plat["native_mock"])},
                    )
                    init_script_id = init_res.get("identifier")

                    cdp.call("Page.navigate", {"url": f"{base_url}?shot_ctx={lang}_{plat_key}"})
                    # Warten bis App-Init durch ist
                    ready_deadline = time.time() + 20.0
                    while time.time() < ready_deadline:
                        is_ready = cdp.eval_js(
                            "Boolean(typeof state !== 'undefined' && typeof switchView === 'function' && document.getElementById('viewHome'))"
                        )
                        if is_ready:
                            break
                        time.sleep(0.15)
                    time.sleep(0.35)

                    for shot in shots:
                        done += 1
                        fname = f"{shot['id']}_{shot['slug']}.png"
                        rel_path = f"{lang}/{plat_key}/{fname}"
                        info = cdp.eval_js(build_shot_js(shot["id"], lang, shot["theme"], shot["appearance"]))
                        shot_data = cdp.call(
                            "Page.captureScreenshot",
                            {"format": "png", "fromSurface": True},
                        )
                        png_bytes = base64.b64decode(shot_data["data"])
                        (target_dir / fname).write_bytes(png_bytes)

                        items.append(
                            {
                                "id": shot["id"],
                                "slug": shot["slug"],
                                "lang": lang,
                                "platform": plat_key,
                                "platformLabel": plat[f"label_{lang}"],
                                "category": shot["category"],
                                "theme": shot["theme"],
                                "themeLabel": THEME_LABELS[shot["theme"]][lang],
                                "appearance": shot["appearance"],
                                "title": shot[f"title_{lang}"],
                                "caption": shot[f"caption_{lang}"],
                                "marketingTag": shot["marketing_tag"],
                                "file": rel_path,
                                "viewportWidth": plat["width"],
                                "viewportHeight": plat["height"],
                                "scale": plat["scale"],
                                "pixelWidth": plat["width"] * plat["scale"],
                                "pixelHeight": plat["height"] * plat["scale"],
                                "sizeBytes": len(png_bytes),
                                "capturedView": info.get("view") if isinstance(info, dict) else "",
                            }
                        )
                        print(f"[{done:02d}/{total:02d}] ✓ {rel_path} ({len(png_bytes) // 1024} KB)")

                    if init_script_id:
                        cdp.call("Page.removeScriptToEvaluateOnNewDocument", {"identifier": init_script_id})
        finally:
            cdp.close()
    finally:
        chrome_proc.terminate()
        try:
            chrome_proc.wait(timeout=5)
        except Exception:
            chrome_proc.kill()
        server.shutdown()
        shutil.rmtree(user_data_dir, ignore_errors=True)

    manifest = {
        "meta": {
            "app": "Lauscher",
            "version": read_app_version(),
            "gitCommit": read_git_commit(),
            "generatedAt": datetime.now(timezone.utc).astimezone().strftime("%Y-%m-%d %H:%M:%S %Z"),
            "langs": langs,
            "platforms": platforms,
            "totalScreenshots": len(items),
        },
        "items": items,
    }
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    generate_gallery_html(manifest, out_dir)
    print(f"\n✓ Screenshot-Datenbank erstellt: {out_dir}")
    print(f"  → {len(items)} PNGs, manifest.json & gallery.html")


def main():
    parser = argparse.ArgumentParser(description="Erzeugt die Lauscher Screenshot-Datenbank (DE & EN, App & Webapp).")
    parser.add_argument("--out", default="screenshots", help="Zielordner (Standard: screenshots)")
    parser.add_argument("--langs", default="de,en", help="Sprachen kommagetrennt (Standard: de,en)")
    parser.add_argument("--platforms", default="app,webapp", help="Plattformen kommagetrennt (Standard: app,webapp)")
    parser.add_argument("--shots", default="", help="Optionale Shot-IDs z. B. 01,02,14")
    parser.add_argument("--chrome", default="", help="Optionaler Pfad zu Chrome/Chromium")
    args = parser.parse_args()

    chrome_bin = args.chrome or find_chrome()
    out_dir = Path(args.out)
    if not out_dir.is_absolute():
        out_dir = ROOT / out_dir
    langs = [x.strip() for x in args.langs.split(",") if x.strip()]
    platforms = [x.strip() for x in args.platforms.split(",") if x.strip() in PLATFORMS]
    shot_filter = {x.strip().zfill(2) for x in args.shots.split(",") if x.strip()} if args.shots else None

    capture_matrix(chrome_bin, out_dir, langs, platforms, shot_filter)


if __name__ == "__main__":
    main()

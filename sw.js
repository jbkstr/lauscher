// Lauscher • Service Worker (automatisch erzeugt von scripts/build-sw.py – nicht von Hand bearbeiten)
//
// Zwei Caches:
// - App-Hülle (Code, Styles, Fonts, Icons): Name enthält Version + Inhalts-Hash, wird bei jeder Änderung neu geladen.
// - Samples (große *-bundle.js): ein dauerhafter Cache, Einträge pro Datei mit Inhalts-Hash im Schlüssel.
//   Ein Update lädt nur Sample-Dateien neu, die sich wirklich geändert haben.
const CACHE_PREFIX = "lauscher-";
const CACHE_NAME = "lauscher-0.17.0-beta-b13-79e7fc28cf70";
const SAMPLES_CACHE_NAME = "lauscher-samples";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./privacy.html",
  "./terms.html",
  "./licenses.html",
  "./styles.css",
  "./audio.js",
  "./i18n.js",
  "./i18n/static.js",
  "./i18n/quotes.js",
  "./i18n/tables.js",
  "./i18n/phrases-core.js",
  "./i18n/phrases-exercises.js",
  "./i18n/phrases-tools.js",
  "./i18n/phrases-sing.js",
  "./i18n/phrases-midi.js",
  "./i18n/notation-terms.js",
  "./i18n/achievements.js",
  "./knowledge-en.js",
  "./knowledge.js",
  "./knowledge-fr.js",
  "./knowledge-es.js",
  "./knowledge-it.js",
  "./knowledge-pl.js",
  "./knowledge-tr.js",
  "./knowledge-uk.js",
  "./knowledge-ur.js",
  "./knowledge-ar.js",
  "./version.js",
  "./legal.js",
  "./js/catalogs.js",
  "./js/achievements.js",
  "./js/tuner-dsp.js",
  "./js/state.js",
  "./js/notation.js",
  "./js/interval-help.js",
  "./js/notation-terms.js",
  "./js/navigation.js",
  "./js/knowledge-ui.js",
  "./js/categories.js",
  "./js/generators.js",
  "./js/exercises.js",
  "./js/exercise-stage.js",
  "./js/exercise-notation.js",
  "./js/playback.js",
  "./js/tutorial.js",
  "./js/profile.js",
  "./app.js",
  "./js/warmup.js",
  "./js/metronome.js",
  "./js/tuner.js",
  "./js/pitch-capture.js",
  "./js/sing-match.js",
  "./js/midi.js",
  "./js/midi-play.js",
  "./js/freeplay.js",
  "./js/fretboard.js",
  "./js/nashville.js",
  "./js/capo.js",
  "./js/onboarding.js",
  "./js/exam.js",
  "./js/homework.js",
  "./js/explorer.js",
  "./fonts/Andika/Andika-Bold.ttf",
  "./fonts/Andika/Andika-BoldItalic.ttf",
  "./fonts/Andika/Andika-Italic.ttf",
  "./fonts/Andika/Andika-Regular.ttf",
  "./icons/app-icon.jpg",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/favicon-64.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];
// Sample-Datei → versionierter Cache-Schlüssel
const SAMPLE_CACHE_KEYS = {
  "./samples/mascot-bundle.js": "./samples/mascot-bundle.js?h=49945bef884c",
  "./samples/mascot-metal-bundle.js": "./samples/mascot-metal-bundle.js?h=98d0ca9500a0",
  "./samples/piano-bundle.js": "./samples/piano-bundle.js?h=af6fe2445048",
  "./samples/percussion-bundle.js": "./samples/percussion-bundle.js?h=330c2f47200a",
  "./samples/guitar-bundle.js": "./samples/guitar-bundle.js?h=6aedc8876231",
  "./samples/strings-bundle.js": "./samples/strings-bundle.js?h=c85d47494fa7",
  "./samples/brass-bundle.js": "./samples/brass-bundle.js?h=9ba6b61607ce",
  "./samples/bass-bundle.js": "./samples/bass-bundle.js?h=dd3c982724cd",
  "./samples/voice-bundle.js": "./samples/voice-bundle.js?h=4d8bf0fb66fc"
};

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

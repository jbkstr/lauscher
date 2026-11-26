// Lauscher • Service Worker (automatisch erzeugt von scripts/build-sw.py – nicht von Hand bearbeiten)
const CACHE_PREFIX = "lauscher-";
const CACHE_NAME = "lauscher-0.14.0-beta-b10-d904b1d528a9";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./privacy.html",
  "./terms.html",
  "./licenses.html",
  "./styles.css",
  "./samples/mascot-bundle.js",
  "./samples/mascot-metal-bundle.js",
  "./samples/piano-bundle.js",
  "./samples/guitar-bundle.js",
  "./samples/strings-bundle.js",
  "./samples/brass-bundle.js",
  "./samples/bass-bundle.js",
  "./samples/percussion-bundle.js",
  "./samples/voice-bundle.js",
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
  "./knowledge-fr.js",
  "./knowledge.js",
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const queue = PRECACHE_URLS.slice();
      const concurrency = 6;
      const worker = async () => {
        while (queue.length > 0) {
          const url = queue.shift();
          const request = new Request(url, { cache: "reload" });
          const response = await fetch(request);
          if (!response.ok) {
            throw new Error(`Precache fehlgeschlagen (${response.status}): ${url}`);
          }
          await cache.put(url, response);
        }
      };
      await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
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

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => cached || fetch(request))
  );
});

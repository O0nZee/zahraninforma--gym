const CACHE_NAME = "zahran-informa-mobile-v26";
const APP_SHELL = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./app.config.json",
    "./manifest.webmanifest",
    "./assets/zahran-informa-logo.png",
    "./assets/gym-hero.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            // "reload" skips the browser HTTP cache, so a new version never installs stale files.
            .then((cache) => cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: "reload" }))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method !== "GET" || url.origin !== self.location.origin) {
        return;
    }

    if (url.pathname.startsWith("/api/")) {
        event.respondWith(
            fetch(request).catch(() => new Response(
                JSON.stringify({ offline: true, error: "Offline" }),
                {
                    status: 503,
                    headers: { "Content-Type": "application/json; charset=utf-8" }
                }
            ))
        );
        return;
    }

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match(request)
                    .then((cached) => cached || caches.match("./index.html")))
        );
        return;
    }

    // The app code itself is network-first so a new version is never masked by an old cache.
    if (/\.(?:html|css|js|json|webmanifest)$/i.test(url.pathname)) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response && response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cached) => {
            const networkResponse = fetch(request)
                .then((response) => {
                    if (response && response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(() => cached);

            return cached || networkResponse;
        })
    );
});

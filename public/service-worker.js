const CACHE_NAME = "disaster-pwa-v8";

// Pre-cache static assets & routes
const urlsToCache = [
  "/", // home
  "/index.html",
  "/offline.html",
  "/requestHelps",
  "/addAlertPanels",
  "/donateUs",
  "/login",
  "/register",
  "/allAlertPanel",
  "/contactForm",
  "/liveAlerts",
  "/payment",
  "/assets/banner-1.jpg",
  "/assets/banner-2.jpg",
  "/assets/banner-3.jpg"
  // Note: dynamic routes like "/latestAlerts/:id" or "/alertPanel/:id" are runtime cached
];

// Install event: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch event: handle caching strategies
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Ignore cross-origin POST/socket.io requests
  if (requestUrl.pathname.startsWith("/socket.io") || requestUrl.origin !== self.location.origin) {
    return;
  }

  const cacheKey = requestUrl.pathname; // ignore query params for caching

  // 🔹 Runtime caching for /alertPanel and /requestHelps API
  if (cacheKey.startsWith("/alertPanel") || cacheKey.startsWith("/requestHelps")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(cacheKey, clone));
          return response;
        })
        .catch(() =>
          caches.match(cacheKey).then((res) =>
            res || new Response(JSON.stringify({ error: "Offline" }), {
              status: 503,
              headers: { "Content-Type": "application/json" },
            })
          )
        )
    );
    return;
  }

  // 🔹 Cache-first for static assets and pre-cached routes
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Only cache successful, same-origin responses
          if (!response || response.status !== 200 || response.type !== "basic") return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // fallback for HTML pages
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match("/offline.html");
          }
          // fallback for other assets
          return new Response("Offline", { status: 503, statusText: "Offline" });
        })
    })
  );
});

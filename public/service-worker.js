const CACHE_NAME = "disaster-pwa-v10";
const API_CACHE = "api-cache-v10";

const urlsToCache = [
  "/", 
  "/index.html",
  "/offline.html",
  "/assets/banner-1.jpg",
  "/assets/banner-2.jpg",
  "/assets/banner-3.jpg",
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== API_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 🔹 Skip non-GET or external requests
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  // 🔹 Skip caching on localhost
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return;

  // ⚡ Offline support for /requestHelps and /addAlertPanels
  if (url.pathname.startsWith("/requestHelps") || url.pathname.startsWith("/addAlertPanels")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(API_CACHE).then((cache) => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || offlineFallbackJSON()))
    );
    return;
  }

  // 🧱 Cache-first for static assets
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (!res || res.status !== 200 || res.type !== "basic") return res;
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => {
          if (req.headers.get("accept")?.includes("text/html")) {
            return caches.match("/offline.html");
          }
          return new Response("Offline", { status: 503, statusText: "Offline" });
        });
    })
  );
});

// 📦 Helper for offline API fallback
function offlineFallbackJSON() {
  return new Response(
    JSON.stringify({ error: "Offline: data unavailable" }),
    { headers: { "Content-Type": "application/json" }, status: 503 }
  );
}

// 🔄 BACKGROUND SYNC for offline POSTs
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-requests") {
    event.waitUntil(syncPendingRequests());
  }
});

async function syncPendingRequests() {
  const pending = await getPendingRequestsFromIndexedDB(); // You’ll store offline POSTs in IndexedDB
  for (const req of pending) {
    try {
      await fetch("/requestHelps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      await removeFromIndexedDB(req.id);
    } catch (err) {
      console.error("Sync failed for", req, err);
    }
  }
}

var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
    "/",
    "/index.js",
    "/css/index.css",
    "/css/materialize.min.css",
    "/css/nouislider.min.css",
    "/js/materialize.min.js",
    "/js/jquery-3.2.1.min.js",
    "/js/lodash.min.js",
    "/js/wNumb.js",
    "/js/nouislider.min.js",
    "/js/BluetoothTerminal.js",
    "/js/jquery-3.2.1.min.js"
];

self.addEventListener("install", function(e) {
    console.log("[ServiceWorker] Install");
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("[ServiceWorker] Caching app shell");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function(e) {
    console.log("[ServiceWorker] Activate");
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(
                keyList.map(function(key) {
                    if (key !== CACHE_NAME) {
                        console.log("[ServiceWorker] Removing old cache", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", function(e) {
    console.log("[ServiceWorker] Fetch", e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

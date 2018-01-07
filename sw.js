var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
    "/",
    "/index.html",
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
});

self.addEventListener("fetch", function(e) {
    console.log("[ServiceWorker - fetch]", e.request.url);

    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (!response) {
                // If the url is not in the cache, cache it now.
                caches.open(CACHE_NAME).then(function(cache) {
                    console.log("[ServiceWorker] Caching app shell");
                    return cache.add(e.request.url);
                });
            }

            return response || fetch(e.request);
        })
    );
});

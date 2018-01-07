var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
    ".",
    "index.html",
    "index.js",
    "css/index.css",
    "css/materialize.min.css",
    "css/nouislider.min.css",
    "js/materialize.min.js",
    "js/jquery-3.2.1.min.js",
    "js/lodash.min.js",
    "js/wNumb.js",
    "js/nouislider.min.js",
    "js/BluetoothTerminal.js",
    "js/jquery-3.2.1.min.js"
];

self.addEventListener("install", function(e) {
    console.log("[ServiceWorker] Install");
    self.addEventListener("install", function(event) {
        event.waitUntil(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.addAll(urlsToCache);
            })
        );
    });
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetchAndCache(event.request);
        })
    );
});

function fetchAndCache(url) {
    return fetch(url)
        .then(function(response) {
            // Check if we received a valid response
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return caches.open(CACHE_NAME).then(function(cache) {
                cache.put(url, response.clone());
                return response;
            });
        })
        .catch(function(error) {
            console.log("Request failed:", error);
            // You could return a custom offline 404 page here
        });
}

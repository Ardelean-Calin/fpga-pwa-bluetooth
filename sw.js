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

self.addEventListener("fetch", function(event) {
    console.log("[ServiceWorker] - fetch", event.request.url);
    event.respondWith(
        caches.open("mycache").then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return (
                    response ||
                    fetch(event.request)
                        .then(function(response) {
                            console.log(
                                "[ServiceWorker] - populating cache",
                                event.request.url
                            );
                            cache.put(event.request, response.clone());
                            return response;
                        })
                        .catch(function(error) {
                            console.log(
                                "[ServiceWorker] - There has been a problem with your fetch operation: ",
                                error.message
                            );
                        })
                );
            });
        })
    );
});

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

// self.addEventListener("install", function(e) {
//     console.log("[ServiceWorker] Install");
//     e.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache) {
//             console.log("[ServiceWorker] Caching app shell");
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("activate", function(e) {
//     console.log("[ServiceWorker] Activate");
//     e.waitUntil(
//         caches.keys().then(function(keyList) {
//             return Promise.all(
//                 keyList.map(function(key) {
//                     if (key !== CACHE_NAME) {
//                         console.log("[ServiceWorker] Removing old cache", key);
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );
//     return self.clients.claim();
// });

self.addEventListener("fetch", function(event) {
    console.log("[ServiceWorker] Fetch", event.request.url);
    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            if(response){
              console.log('Serve from cache', response);
              return response;
            }
            return fetch(event.request)
                .then(response =>
                  caches.open(CURRENT_CACHES.prefetch)
                    .then((cache) => {
                      // cache response after making a request
                      cache.put(event.request, response.clone());
                      // return original response
                      return response;
                    })
                )
});

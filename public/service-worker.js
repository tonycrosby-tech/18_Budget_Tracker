var CACHE_NAME = 'cache-v1';

var urlsToCache = [
  "/",
  "/stylesheets/styles.css",
  "/js/index.js",
  "/index.html",
  "/db.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/index.html");
        }
      });
    })
  );
});
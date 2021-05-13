// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

const CACHE_NAME = 'journal-cache';
var urlsToCache = [
    'https://cse110lab6.herokuapp.com/entries'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Found in cache, return response
          if (response) {
            return response;
          }
          // Try to fetch the default network request if not found in cache
          return fetch(event.request);
        }
      )
  );
});
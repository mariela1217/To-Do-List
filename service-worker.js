const CACHE_NAME = 'todo-app-v1';
const ASSETS = [
  '/',
  '/to-do-list.html',
  '/style.css',
  '/script.js',
  '/imagenes/moneda.gif',
  '/imagenes/honguito.jpg',
  '/imagenes/saltando.webp',
  '/imagenes/fondo.jpg',

];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(ASSETS))
        .catch((err) => console.log('Failed to cache assets:', err))
    );
  });

// Fetch cached assets when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
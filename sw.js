//nombre del cache
const CACHE_NAME = 'pwa-test-v1';

//archivos a cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

//evento de instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

//evento de activación
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//evento fetch - estrategia cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        //si está en cache, lo devolvemos
        if (response) {
          return response;
        }
        //si no, hacemos la petición
        return fetch(event.request);
      })
      .catch(() => {
        //si falla, mostramos página offline
        return caches.match('/index.html');
      })
  );
});
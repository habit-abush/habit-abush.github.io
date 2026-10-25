const CACHE_NAME = 'habit-v25';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './Habit.css',
  './Habit.js',
  './Habit.js?v=25',
  './Habit.png',
  './habit-mobile.css',
  './habit-mobile.css?v=25',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const fresh = await fetch(event.request, { cache: 'no-cache' });
      if (fresh && fresh.ok) cache.put(event.request, fresh.clone());
      return fresh;
    } catch (error) {
      const cached = await cache.match(event.request) || await caches.match(event.request);
      if (cached) return cached;
      throw error;
    }
  })());
});

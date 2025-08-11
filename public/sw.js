// Service Worker simplificado para portfolio
const CACHE_NAME = 'portfolio-v1.3';

// Install: Skip waiting for immediate activation
self.addEventListener('install', event => {
  console.log('SW: Installing');
  self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener('activate', event => {
  console.log('SW: Activating');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Basic caching strategy
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip non-HTTP requests
  if (!event.request.url.startsWith('http')) return;
  
  // Simple network-first strategy
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache on network failure
        return caches.match(event.request);
      })
  );
});

// vite-plugin include and uses "Workbox Build" npm module and integrated into vite build process
// no manual config or registering Service Worker is needed

importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

// offline assets loading strategy
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);

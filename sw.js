
const CACHE_NAME = 'nlg-stable-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.tsx', // Entry point chính
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://aistudiocdn.com/react@^19.2.1',
  'https://aistudiocdn.com/react-dom@^19.2.1',
  'https://aistudiocdn.com/lucide-react@^0.556.0'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('NLG SW: Khởi tạo bộ nhớ đệm an toàn...');
      // Thay vì addAll, ta add từng cái để cái nào lỗi (404) thì bỏ qua, không làm treo cả quá trình
      const cachePromises = ASSETS_TO_CACHE.map(url => {
        return fetch(url).then(response => {
          if (response.ok) return cache.put(url, response);
          return Promise.resolve();
        }).catch(() => Promise.resolve());
      });
      
      return Promise.all(cachePromises).then(() => {
        console.log('NLG SW: Đã lưu các tệp quan trọng!');
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => client.postMessage({ type: 'CACHE_COMPLETED', exists: true }));
        });
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'CHECK_CACHE_STATUS') {
    caches.has(CACHE_NAME).then(exists => {
      event.source.postMessage({ type: 'CACHE_STATUS', exists });
    });
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then(response => {
        if (response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        return null;
      });
    })
  );
});

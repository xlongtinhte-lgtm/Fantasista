
const CACHE_NAME = 'nlg-offline-v4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './metadata.json',
  './services/defaultData.ts',
  './components/TimerWidget.tsx',
  './components/FormulaCard.tsx',
  './components/FormulaEditor.tsx',
  './components/CompletionModal.tsx',
  './components/ReorderList.tsx',
  './components/ReaderBar.tsx'
];

// Cài đặt
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('NLG SW: Đang tải cache...');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('NLG SW: Một số tệp không thể cache, nhưng vẫn tiếp tục...', err);
        // Fallback: Thử tải từng cái nếu addAll thất bại
        return Promise.all(ASSETS_TO_CACHE.map(url => {
          return fetch(url).then(res => cache.put(url, res)).catch(() => {});
        }));
      });
    })
  );
});

// Kích hoạt
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});

// Xử lý thông điệp từ App
self.addEventListener('message', (event) => {
  if (event.data === 'CHECK_CACHE_STATUS') {
    caches.has(CACHE_NAME).then(exists => {
      event.source.postMessage({ type: 'CACHE_STATUS', exists });
    });
  }
});

// Chặn bắt yêu cầu (Fetch)
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
      });
    })
  );
});

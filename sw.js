
const CACHE_NAME = 'nlg-offline-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './metadata.json',
  './services/defaultData.ts',
  './services/geminiService.ts',
  './components/TimerWidget.tsx',
  './components/FormulaCard.tsx',
  './components/FormulaEditor.tsx',
  './components/CompletionModal.tsx',
  './components/ReorderList.tsx',
  './components/ReaderBar.tsx',
  // Thêm các thư viện CDN quan trọng để có thể chạy offline hoàn toàn
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://aistudiocdn.com/react@^19.2.1',
  'https://aistudiocdn.com/react-dom@^19.2.1',
  'https://aistudiocdn.com/lucide-react@^0.556.0'
];

// Cài đặt và lưu cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('NLG SW: Đang khởi tạo bộ nhớ đệm...');
      return cache.addAll(ASSETS_TO_CACHE).then(() => {
        console.log('NLG SW: Đã lưu toàn bộ dữ liệu offline!');
        // Thông báo cho tất cả các tab đang mở
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => client.postMessage({ type: 'CACHE_COMPLETED', exists: true }));
        });
      }).catch(err => {
        console.warn('NLG SW: Một số tệp không thể cache trực tiếp, thử fallback...', err);
        return Promise.all(ASSETS_TO_CACHE.map(url => {
          return fetch(url).then(res => cache.put(url, res)).catch(() => {});
        }));
      });
    })
  );
});

// Kích hoạt và dọn dẹp cache cũ
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

// Chặn bắt yêu cầu (Fetch) - Chiến lược Cache First cho assets, Network First cho index
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        return null;
      });

      return cached || fetchPromise;
    })
  );
});

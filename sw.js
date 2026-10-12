// Network first, so updates arrive when online; falls back to the last copy when offline.
const CACHE='ruby-beans-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'])));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));
});

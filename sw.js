const CACHE="casa-bartolo-v1";
const ARCHIVOS=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const red=fetch(e.request).then(r=>{
      if(r&&r.status===200&&(r.type==="basic"||r.type==="cors")){const copia=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copia))}
      return r}).catch(()=>hit);
    return hit||red;
  }));
});

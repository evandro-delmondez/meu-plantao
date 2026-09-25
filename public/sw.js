/* Meu Plantão — funciona offline depois do primeiro acesso.
   O nome do cache é gerado no build (hash do conteúdo): cada versão nova atualiza sozinha. */
const CACHE="__CACHE__";
const CORE=["./","./index.html","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET") return;
  const url=new URL(r.url);
  if(r.mode==="navigate"){ // página: rede primeiro (pega atualização), cache se offline
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put("./index.html",cp));return res}).catch(()=>caches.match("./index.html")));
    return;
  }
  // demais arquivos e fontes: cache primeiro, atualiza em segundo plano
  e.respondWith(caches.match(r).then(hit=>{
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>hit);
    return hit||net;
  }));
});

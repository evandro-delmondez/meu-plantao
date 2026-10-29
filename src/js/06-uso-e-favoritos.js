/* ---------- uso e favoritos ---------- */
// rec: itens abertos por último ("c:id" conduta, "m:id" medicação, "s:id" escore). Dados antigos sem rec continuam válidos.
let uso=Object.assign({updatedAt:0},usoValido(lsGet("rxp_uso_v1",{})));   // dado estranho (nuvem antiga) não quebra a tela
let usoT=null;
function saveUso(){uso.updatedAt=Date.now();lsSet("rxp_uso_v1",uso);gsAgenda();clearTimeout(usoT);usoT=setTimeout(async()=>{if(db){try{await db.doc("config/uso").set(JSON.parse(JSON.stringify(uso)))}catch(e){}}},2500)}
function marcarRecente(k){uso.rec=[k,...(Array.isArray(uso.rec)?uso.rec:[]).filter(x=>x!==k)].slice(0,8)}
function bumpUso(id){uso.counts[id]=(uso.counts[id]||0)+1;marcarRecente("c:"+id);saveUso()}
function usoRecente(k){marcarRecente(k);saveUso()}
function toggleFav(id){const f=new Set(uso.favs);f.has(id)?f.delete(id):f.add(id);uso.favs=[...f];saveUso();renderList();renderDetail()}
// favoritos e contagens vindos de fora (nuvem, backup): só o que tem o tipo certo, para não quebrar o Início e a busca
function usoValido(r){
  const o=r&&typeof r==="object"?r:{}, c={};
  if(o.counts&&typeof o.counts==="object"&&!Array.isArray(o.counts)) for(const [k,v] of Object.entries(o.counts)) if(Number.isFinite(+v)) c[k]=+v;
  const u={counts:c,favs:Array.isArray(o.favs)?o.favs.filter(x=>typeof x==="string"):[],rec:Array.isArray(o.rec)?o.rec.filter(x=>typeof x==="string"):[]};
  if(+o.updatedAt) u.updatedAt=+o.updatedAt;
  return u;
}

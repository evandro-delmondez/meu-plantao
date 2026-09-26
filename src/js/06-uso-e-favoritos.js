/* ---------- uso e favoritos ---------- */
// rec: itens abertos por último ("c:id" conduta, "m:id" medicação, "s:id" escore). Dados antigos sem rec continuam válidos.
let uso=Object.assign({counts:{},favs:[],rec:[],updatedAt:0},lsGet("rxp_uso_v1",{}));
let usoT=null;
function saveUso(){uso.updatedAt=Date.now();lsSet("rxp_uso_v1",uso);clearTimeout(usoT);usoT=setTimeout(async()=>{if(db){try{await db.doc("config/uso").set(JSON.parse(JSON.stringify(uso)))}catch(e){}}},2500)}
function marcarRecente(k){uso.rec=[k,...(Array.isArray(uso.rec)?uso.rec:[]).filter(x=>x!==k)].slice(0,8)}
function bumpUso(id){uso.counts[id]=(uso.counts[id]||0)+1;marcarRecente("c:"+id);saveUso()}
function usoRecente(k){marcarRecente(k);saveUso()}
function toggleFav(id){const f=new Set(uso.favs);f.has(id)?f.delete(id):f.add(id);uso.favs=[...f];saveUso();renderList();renderDetail()}

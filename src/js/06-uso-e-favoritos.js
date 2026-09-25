/* ---------- uso e favoritos ---------- */
let uso=Object.assign({counts:{},favs:[],updatedAt:0},lsGet("rxp_uso_v1",{}));
let usoT=null;
function saveUso(){uso.updatedAt=Date.now();lsSet("rxp_uso_v1",uso);clearTimeout(usoT);usoT=setTimeout(async()=>{if(db){try{await db.doc("config/uso").set(JSON.parse(JSON.stringify(uso)))}catch(e){}}},2500)}
function bumpUso(id){uso.counts[id]=(uso.counts[id]||0)+1;saveUso()}
function toggleFav(id){const f=new Set(uso.favs);f.has(id)?f.delete(id):f.add(id);uso.favs=[...f];saveUso();renderList();renderDetail()}

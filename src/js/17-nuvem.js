/* ---------- cloud ---------- */
function mergeRemote(id,doc){
  const loc=overrides[id];
  const r=doc.updatedAt||0, l=loc?(loc.updatedAt||0):-1;
  if(r>l){overrides[id]=doc;pending.delete(id)}
  else if(r===l){pending.delete(id)}
  else pending.add(id);
}
async function initCloud(){
  try{ db=window.claude&&window.claude.use?await window.claude.use("db"):null }catch(e){db=null}
  if(!db){dbState="none";refreshSync();return}
  dbState="ok";refreshSync();
  try{
    const m=await db.doc("config/modelo").get();
    if(m.exists){const r=migrateModel(JSON.parse(JSON.stringify(m.data())));const loc=lsGet(LS.model,{})||{};if((r.updatedAt||0)>=(loc.updatedAt||0)){model=r;lsSet(LS.model,model);applyOrg();renderCats();renderList();fillSelects();renderEv();renderAt();renderDetail();if(ui.tab==="modelos")renderModelos()} else saveModel()}
  }catch(e){}
  try{const u=await db.doc("config/uso").get();if(u.exists){const r=JSON.parse(JSON.stringify(u.data()));if((r.updatedAt||0)>(uso.updatedAt||0)){uso=Object.assign({counts:{},favs:[]},r);lsSet("rxp_uso_v1",uso);renderList()}else if((uso.updatedAt||0)>(r.updatedAt||0))saveUso()}else if(uso.updatedAt)saveUso()}catch(e){}
  db.collection("prescricoes").onSnapshot(snap=>{
    snap.docs.forEach(d=>mergeRemote(d.id,JSON.parse(JSON.stringify(d.data()))));
    if(!snap.metadata.fromCache) for(const id in overrides) if(!snap.docs.some(d=>d.id===id)) pending.add(id);
    persistLocal(); flush(); refreshSync();
    if(!editing){renderList();renderDetail()} fillSelects();
  },err=>{dbState="none";refreshSync()});
}
window.addEventListener("online",flush);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")flush()});

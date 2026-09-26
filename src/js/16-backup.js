/* ---------- backup ---------- */
function renderHidden(){
  const hidden=Object.entries(overrides).filter(([id,o])=>o.deleted);
  const box=$("#bkMsg");
  if(!hidden.length){box.innerHTML="";return}
  box.innerHTML="Ocultas/excluídas: "+hidden.map(([id,o])=>`<button class="btn sm" data-unhide="${id}">Mostrar “${esc(o.nome||id)}”</button>`).join(" ");
  box.querySelectorAll("[data-unhide]").forEach(b=>b.onclick=()=>{const id=b.dataset.unhide;const o=Object.assign({},overrides[id]);if(baseById[id]) writeOverride(id,{restored:true}); else {delete o.deleted;writeOverride(id,o)}renderList();fillSelects();renderHidden();toast("Restaurada")});
}
$("#bkCopy").onclick=e=>copy(JSON.stringify({app:"receituario-plantao",v:1,exportadoEm:new Date().toISOString(),overrides,model,uso},null,1),e.currentTarget);
$("#bkImport").onclick=()=>{
  try{
    const j=JSON.parse($("#bkIn").value);
    if(!j||typeof j.overrides!=="object") throw 0;
    let n=0; for(const id in j.overrides){ if(!/^[A-Za-z0-9_.~:@+-]+$/.test(id)) continue; const o=Object.assign({},j.overrides[id]); writeOverride(id,o); n++ }
    if(j.model){model=migrateModel(j.model);applyOrg();renderCats();saveModel();fillSelects();renderModelos()}
    if(j.uso&&typeof j.uso==="object"){uso=Object.assign({counts:{},favs:[],rec:[]},{counts:j.uso.counts||{},favs:Array.isArray(j.uso.favs)?j.uso.favs:[],rec:Array.isArray(j.uso.rec)?j.uso.rec.filter(x=>typeof x==="string"):[]});saveUso()}
    renderList();fillSelects();renderHidden();$("#bkIn").value="";toast(n+" item(ns) importado(s)");
  }catch(e){toast("Backup inválido: cole o texto completo copiado do botão acima")}
};

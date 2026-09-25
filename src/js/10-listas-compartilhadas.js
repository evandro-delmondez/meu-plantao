/* ---------- selects shared ---------- */
function fillSelects(){
  const items=allItems();
  const c=$("#evCond").value||ui.sel;
  $("#evCond").innerHTML=`<option value="">— sem condição —</option>`+items.map(i=>`<option value="${i.id}">${esc(i.nome)}${i.cid?" ("+esc(i.cid)+")":""}</option>`).join("");
  if(items.some(i=>i.id===c)) $("#evCond").value=c;
  $("#cidList").innerHTML=items.filter(i=>i.cid).map(i=>`<option value="${esc(i.cid)}">${esc(i.nome)}</option>`).join("");
  const ex=$("#evExame"), sel=ex.value||model.exameSel;
  ex.innerHTML=model.exames.map(e=>`<option value="${esc(e.id)}">${esc(e.nome)}</option>`).join("");
  ex.value=model.exames.some(e=>e.id===sel)?sel:model.exameSel;
}

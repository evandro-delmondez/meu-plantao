/* ---------- modelos ---------- */
function renderModelos(){
  const ex=model.exames;
  const sel=$("#mdExSel").value&&ex.some(e=>e.id===$("#mdExSel").value)?$("#mdExSel").value:model.exameSel;
  $("#mdExSel").innerHTML=ex.map(e=>`<option value="${esc(e.id)}">${esc(e.nome)}${e.id===model.exameSel?" (padrão)":""}</option>`).join("");
  $("#mdExSel").value=sel;
  const e=ex.find(x=>x.id===sel)||ex[0];
  $("#mdExNome").value=e?e.nome:""; $("#mdExTxt").value=e?e.texto:"";
  $("#mdConduta").value=model.conduta;
  for(const k in AT_DEF) $("#mdAt_"+k).value=model.atestado[k];
  $$("[data-dip]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.dip===model.prefs.dipirona));
  $$("#tab-modelos textarea").forEach(grow);
}
$("#mdExSel").addEventListener("change",()=>{const e=model.exames.find(x=>x.id===$("#mdExSel").value);$("#mdExNome").value=e.nome;$("#mdExTxt").value=e.texto;grow($("#mdExTxt"))});
async function commitModel(msg){await saveModel();fillSelects();renderEv();renderAt();renderDetail();renderModelos();toast(msg)}
$("#mdExSave").onclick=()=>{const e=model.exames.find(x=>x.id===$("#mdExSel").value);e.nome=$("#mdExNome").value.trim()||e.nome;e.texto=$("#mdExTxt").value;commitModel("Modelo de exame salvo")};
$("#mdExNew").onclick=()=>{const id="ex-"+Date.now().toString(36);model.exames.push({id,nome:"Novo modelo",texto:"Exame físico:\n"});renderModelos();$("#mdExSel").value=id;$("#mdExSel").dispatchEvent(new Event("change"));commitModel("Modelo criado — edite e salve")};
$("#mdExDefault").onclick=()=>{model.exameSel=$("#mdExSel").value;commitModel("Definido como padrão")};
$("#mdExDel").onclick=()=>{if(model.exames.length<2){toast("Mantenha pelo menos um modelo");return}const id=$("#mdExSel").value;$("#mdExConfirm").innerHTML=`<div class="confirm">Excluir este modelo de exame?<button class="btn sm danger" id="mdExYes">Confirmar</button><button class="btn sm" id="mdExNo">Cancelar</button></div>`;$("#mdExYes").onclick=()=>{model.exames=model.exames.filter(e=>e.id!==id);if(model.exameSel===id)model.exameSel=model.exames[0].id;$("#mdExConfirm").innerHTML="";$("#mdExSel").value="";commitModel("Modelo excluído")};$("#mdExNo").onclick=()=>$("#mdExConfirm").innerHTML=""};
$("#mdCondSave").onclick=()=>{model.conduta=$("#mdConduta").value;commitModel("Conduta padrão salva")};
$("#mdAtSave").onclick=()=>{for(const k in AT_DEF) model.atestado[k]=$("#mdAt_"+k).value;atManual=false;commitModel("Modelos de atestado salvos")};
$("#mdAtReset").onclick=()=>{model.atestado=Object.assign({},AT_DEF);atManual=false;commitModel("Modelos de atestado restaurados")};
$("#mdExReset").onclick=()=>{const d=clone(DEFAULT_MODEL);const e=model.exames.find(x=>x.id===$("#mdExSel").value);const o=d.exames.find(x=>x.id===e.id);if(!o){toast("Modelo criado por você não tem versão original");return}e.texto=o.texto;e.nome=o.nome;commitModel("Modelo original restaurado")};
$$("[data-dip]").forEach(b=>b.onclick=()=>{model.prefs.dipirona=b.dataset.dip;commitModel(b.dataset.dip==="1g"?"Dipirona: 1 g por comprimido":"Dipirona: 500 mg (2 cp)")});
$$("#tab-modelos textarea").forEach(t=>t.addEventListener("input",()=>grow(t)));

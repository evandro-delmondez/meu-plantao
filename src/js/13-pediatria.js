/* ---------- pediatria ---------- */
let pedManual=false;
function pedIdadeMeses(){const a=parseInt($("#pdAnos").value,10)||0, m=parseInt($("#pdMeses").value,10)||0;return a*12+m}
function renderPedChips(){
  $("#pdConds").innerHTML=PEDS.map(c=>`<button class="chip" style="--c:var(--sky)" data-pd="${c.id}" aria-pressed="${ui.ped===c.id}">${esc(c.nome)}</button>`).join("");
  $$("#pdConds [data-pd]").forEach(b=>b.onclick=()=>{ui.ped=b.dataset.pd;saveUI();pedManual=false;renderPed()});
}
function renderPedEm(){
  const p=parseFloat(String($("#pdPeso").value).replace(",",".")), m=pedIdadeMeses();
  if(!(p>0)){$("#pdEmGrid").innerHTML=`<div class="empty">Informe o peso.</div>`;return}
  $("#pdEmGrid").innerHTML=pedEmerg(p,m).map((g,gi)=>`<div class="sec" style="--c:var(--${g.c})"><div class="sec-h"><h3>${esc(g.t)}</h3><button class="btn sm" data-emc="${gi}">Copiar</button></div><ul>${g.l.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p class="srcl">Fonte: ${g.src.map(k=>linkify(PE_SRC[k])).join(" · ")}</p></div>`).join("");
  const gs=pedEmerg(p,m);
  $$("#pdEmGrid [data-emc]").forEach(b=>b.onclick=()=>{const g=gs[+b.dataset.emc];copy(`${g.t} (${fm(p)} kg):\n`+g.l.join("\n"),b)});
}
function setPMode(mo){ui.pmode=mo;saveUI();$$("[data-pmode]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.pmode===mo));$("#pdEm").hidden=mo!=="em";$("#pdConds").hidden=mo==="em";$("#pdTwo").querySelector(".out").hidden=mo==="em";if(mo==="em")renderPedEm();else renderPed()}
$$("[data-pmode]").forEach(b=>b.onclick=()=>setPMode(b.dataset.pmode));
function renderPed(force){
  if(ui.pmode==="em"){renderPedEm();}
  renderPedChips();
  const c=PEDS.find(x=>x.id===ui.ped)||PEDS[0]; ui.ped=c.id;
  const p=parseFloat(String($("#pdPeso").value).replace(",",".")), m=pedIdadeMeses();
  $("#pdTitulo").textContent=c.nome+(c.cid?` — CID ${c.cid}`:"");
  if(!(p>0)){$("#pdOut").value="Informe o peso.";return}
  const r=c.gen(p,m);
  $("#pdAviso").hidden=!r.aviso; $("#pdAviso").textContent=r.aviso||"";
  const txt=[`Paciente: ${fm(p)} kg, ${idadeTxt(m)}.`,r.casa,r.unidade?("Na unidade:\n"+r.unidade):"",r.orient?("Orientações:\n"+r.orient):""].filter(Boolean).join("\n\n");
  if(pedManual&&!force){$("#pdManualNote").hidden=false}else{pedManual=false;$("#pdManualNote").hidden=true;$("#pdOut").value=txt;grow($("#pdOut"))}
  $("#pdFontes").innerHTML=c.fontes.map(k=>`<li>${linkify(PF[k]||k)}</li>`).join("");
}
["pdPeso","pdAnos","pdMeses"].forEach(id=>$("#"+id).addEventListener("input",()=>{ui.pdPeso=$("#pdPeso").value;ui.pdAnos=$("#pdAnos").value;ui.pdMeses=$("#pdMeses").value;saveUI();renderPed()}));
$("#pdOut").addEventListener("input",()=>{pedManual=true;grow($("#pdOut"));$("#pdManualNote").hidden=false});
$("#pdRegen").onclick=()=>renderPed(true);
$("#pdCopy").onclick=e=>copy($("#pdOut").value,e.currentTarget);

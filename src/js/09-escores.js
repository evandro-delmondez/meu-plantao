/* ---------- escores ---------- */
const scState={}; let evScores=[];
function scTotal(sc){const st=scState[sc.id]||{};let t=0;(sc.campos||[]).forEach(([k])=>{if(st[k]!=null)t+=sc.campos.find(c=>c[0]===k)[2][st[k]][1]});(sc.bin||[]).forEach(([l,pts],i)=>{if(st["b"+i])t+=pts});return t}
function scTexto(sc){const t=scTotal(sc);const st=scState[sc.id]||{};const faltam=(sc.campos||[]).filter(([k])=>st[k]==null).length;return `${sc.nome}: ${String(t).replace(".",",")} ponto(s) — ${sc.interp(t)}${faltam?` (atenção: ${faltam} campo(s) sem resposta)`:""}`}
function renderScores(){
  const selId=ui.score||SC[0].id; const sc=SC.find(x=>x.id===selId)||SC[0]; ui.score=sc.id;
  $("#scList").innerHTML=SC.map(x=>`<button data-sc="${x.id}" aria-current="${x.id===sc.id}">${esc(x.nome)}</button>`).join("");
  $$("#scList [data-sc]").forEach(b=>b.onclick=()=>{ui.score=b.dataset.sc;saveUI();usoRecente("s:"+b.dataset.sc);renderScores()});
  const st=scState[sc.id]=scState[sc.id]||{};
  $("#scNome").textContent=sc.nome;
  let h="";
  (sc.campos||[]).forEach(([k,lab,opts])=>{h+=`<fieldset><legend>${esc(lab)}</legend>${opts.map(([t,p],i)=>`<label><input type="radio" name="sc_${k}" data-k="${k}" value="${i}" ${st[k]===i?"checked":""}> ${esc(t)} <span class="note">(${p>0?"+":""}${String(p).replace(".",",")})</span></label>`).join("")}</fieldset>`});
  if(sc.bin) h+=`<fieldset><legend>Critérios</legend>${sc.bin.map(([t,p],i)=>`<label><input type="checkbox" data-b="${i}" ${st["b"+i]?"checked":""}> ${esc(t)} <span class="note">(${p>0?"+":""}${String(p).replace(".",",")})</span></label>`).join("")}</fieldset>`;
  $("#scForm").innerHTML=h;
  $$("#scForm input[type=radio]").forEach(r=>r.onchange=()=>{st[r.dataset.k]=+r.value;upd()});
  $$("#scForm input[type=checkbox]").forEach(c=>c.onchange=()=>{st["b"+c.dataset.b]=c.checked;upd()});
  const upd=()=>{const t=scTotal(sc);$("#scRes").innerHTML=`<b>${String(t).replace(".",",")}</b> ponto(s) — ${esc(sc.interp(t))}`};
  upd();
  $("#scSrc").textContent="Fonte: "+sc.src;
  $("#scCopy").onclick=e=>copy(scTexto(sc),e.currentTarget);
  $("#scEv").onclick=()=>{evScores=evScores.filter(x=>!x.startsWith(sc.nome+":"));evScores.push(scTexto(sc));renderEv();toast("Escore adicionado à evolução")};
  $("#scClear").onclick=()=>{scState[sc.id]={};renderScores()};
}

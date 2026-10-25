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
/* ---------- cálculos dentro da conduta: os escores (já conferidos) ligados a ela, para preencher ali mesmo ---------- */
// o estado é o mesmo da aba Escores (scState): preencher aqui aparece lá e vice-versa
const SC_COND={pac:["curb"],tep:["wellsTep","perc","spesi"],tvp:["wellsTvp"],sca:["heart"],hda:["gbs"],faringite:["centor"],amigdalite:["centor"],fa:["cha","hasbled"],"dor-abdominal":["alvarado"],avc:["nihss","abcd2"],tce:["glasgow"]};
const scRes=sc=>{const st=scState[sc.id]||{}, n=(sc.campos||[]).filter(([k])=>st[k]!=null).length+(sc.bin||[]).filter((b,i)=>st["b"+i]).length;
  return n?`<b>${String(scTotal(sc)).replace(".",",")}</b> ponto(s) — ${esc(sc.interp(scTotal(sc)))}`:`<span class="note">preencha para ver o resultado</span>`};
function renderCalcConduta(it){
  const scs=(SC_COND[it.id]||[]).map(id=>SC.find(s=>s.id===id)).filter(Boolean); if(!scs.length) return "";
  const pts=p=>`<span class="note">(${p>0?"+":""}${String(p).replace(".",",")})</span>`;
  return `<details class="sec scin" open><summary class="sec-h"><h3>Cálculos desta conduta</h3><span class="alsum">${esc(scs.map(s=>s.nome.split(" (")[0]).join(" · "))}</span></summary>
    ${scs.map(sc=>{const st=scState[sc.id]||{};return `<div class="scbox" data-scin="${sc.id}"><div class="scbox-h"><b>${esc(sc.nome)}</b><span class="scres" data-scres>${scRes(sc)}</span></div>
      ${(sc.campos||[]).map(([k,lab,opts])=>`<div class="scq"><span class="lbl">${esc(lab)}</span><div class="chips">${opts.map(([t,p],i)=>`<label class="chip scop"><input type="radio" name="sci_${sc.id}_${k}" data-k="${k}" value="${i}" ${st[k]===i?"checked":""}> ${esc(t)} ${pts(p)}</label>`).join("")}</div></div>`).join("")}
      ${sc.bin?`<div class="chips">${sc.bin.map(([t,p],i)=>`<label class="chip scop"><input type="checkbox" data-b="${i}" ${st["b"+i]?"checked":""}> ${esc(t)} ${pts(p)}</label>`).join("")}</div>`:""}
      <div class="actions"><button class="btn sm" data-sccp>Copiar</button><button class="btn sm" data-scev>Pôr no Atendimento</button><button class="btn sm" data-sclimpa>Limpar</button></div>
      <p class="note">Fonte: ${esc(sc.src)}</p></div>`}).join("")}</details>`;
}
document.addEventListener("change",e=>{
  const box=e.target.closest("[data-scin]"); if(!box) return; const sc=SC.find(s=>s.id===box.dataset.scin); if(!sc) return;
  const st=scState[sc.id]=scState[sc.id]||{};
  if(e.target.type==="radio") st[e.target.dataset.k]=+e.target.value; else if(e.target.dataset.b!=null) st["b"+e.target.dataset.b]=e.target.checked;
  box.querySelector("[data-scres]").innerHTML=scRes(sc);
});
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-sccp],[data-scev],[data-sclimpa]"); if(!b) return; const box=b.closest("[data-scin]"); const sc=box&&SC.find(s=>s.id===box.dataset.scin); if(!sc) return;
  if(b.hasAttribute("data-sccp")) copy(scTexto(sc),b);
  if(b.hasAttribute("data-scev")){evScores=evScores.filter(x=>!x.startsWith(sc.nome+":"));evScores.push(scTexto(sc));toast("Escore no exame físico do Atendimento")}
  if(b.hasAttribute("data-sclimpa")){scState[sc.id]={};box.querySelectorAll("input").forEach(i=>i.checked=false);box.querySelector("[data-scres]").innerHTML=scRes(sc)}
});

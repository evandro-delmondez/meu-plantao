/* ---------- escores ---------- */
const scState={}; let evScores=[];
function scTotal(sc){const st=scState[sc.id]||{};let t=0;(sc.campos||[]).forEach(([k])=>{if(st[k]!=null)t+=sc.campos.find(c=>c[0]===k)[2][st[k]][1]});(sc.bin||[]).forEach(([l,pts],i)=>{if(st["b"+i])t+=pts});return t}
function scTexto(sc){const t=scTotal(sc);const st=scState[sc.id]||{};const faltam=(sc.campos||[]).filter(([k])=>st[k]==null).length;return `${sc.nome}: ${pl(t,"ponto","pontos")} — ${sc.interp(t)}${faltam?` (atenção: ${pl(faltam,"campo","campos")} sem resposta)`:""}`}
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
  const upd=()=>{const t=scTotal(sc);$("#scRes").innerHTML=`<b>${String(t).replace(".",",")}</b> ${+t===1?"ponto":"pontos"} — ${esc(sc.interp(t))}`};
  upd();
  $("#scSrc").textContent="Fonte: "+sc.src;
  $("#scCopy").onclick=e=>copy(scTexto(sc),e.currentTarget);
  $("#scEv").onclick=()=>{evScores=evScores.filter(x=>!x.startsWith(sc.nome+":"));evScores.push(scTexto(sc));renderEv();toast("Escore adicionado à evolução")};
  $("#scClear").onclick=()=>{scState[sc.id]={};renderScores()};
}
/* ---------- cálculos dentro da conduta: os escores (já conferidos) ligados a ela, para preencher ali mesmo ---------- */
// o estado é o mesmo da aba Escores (scState): preencher aqui aparece lá e vice-versa
const SC_COND={entorse:["ottawaTornozelo","ottawaJoelho"],sepse:["news2"],convulsao:["glasgow"],"overdose-opioide":["glasgow"],intoxicacao:["glasgow"],"intoxicacao-alcoolica":["glasgow"],pac:["curb"],tep:["wellsTep","perc","spesi"],tvp:["wellsTvp"],sca:["heart"],hda:["gbs"],faringite:["centor"],amigdalite:["centor"],fa:["cha","hasbled"],"dor-abdominal":["air","alvarado"],avc:["nihss","abcd2"],tce:["glasgow"],sincope:["csrs"],pancreatite:["bisap"],hdb:["oakland"],ait:["abcd2","ich","glasgow","nihss"],meningite:["glasgow","news2"],"disseccao-aorta":["addrs"],"cirrose-descompensada":["childpugh"],hiperemese:["puqe"],"fratura-imobilizacao":["ottawaTornozelo","ottawaJoelho"]};
const scRes=sc=>{const st=scState[sc.id]||{}, n=(sc.campos||[]).filter(([k])=>st[k]!=null).length+(sc.bin||[]).filter((b,i)=>st["b"+i]).length;
  return n?`<b>${String(scTotal(sc)).replace(".",",")}</b> ${+scTotal(sc)===1?"ponto":"pontos"} — ${esc(sc.interp(scTotal(sc)))}`:`<span class="note">preencha para ver o resultado</span>`};
function renderCalcConduta(it){
  const scs=(SC_COND[it.id]||[]).map(id=>SC.find(s=>s.id===id)).filter(Boolean); if(!scs.length) return "";
  return `<details class="sec scin" open><summary class="sec-h"><h3>Cálculos desta conduta</h3><span class="alsum">${esc(scs.map(s=>s.nome.split(" (")[0]).join(" · "))}</span></summary>
    ${scCaixas(scs)}</details>`;
}
// escores no Atendimento (médico, 2026-11-12): os das condutas escolhidas, já marcados pelos sinais vitais, idade e sexo
// quando o critério é objetivo; o que o médico toca vale mais que o automático. O resultado vai para a Conduta.
const scNum=v=>{const n=parseFloat(String(v||"").replace(",","."));return isNaN(n)?null:n};
function scAutoValor(t){
  const id=scNum(pac.idade), fc=scNum(atd.fc), fr=scNum(atd.fr), sat=scNum(atd.sat), tax=scNum(atd.tax);
  const pa=String(atd.pa||"").match(/(\d{2,3})\s*[x\/]\s*(\d{2,3})/), pas=pa?+pa[1]:null, pad=pa?+pa[2]:null, sx=sxAtual();
  let m;
  if((m=t.match(/^Idade (≥|>) (\d+)/))) return id==null?null:(m[1]==="≥"?id>=+m[2]:id>+m[2]);
  if((m=t.match(/^Idade de (\d+) anos ou mais/))) return id==null?null:id>=+m[1];
  if((m=t.match(/^Idade (\d+)–(\d+) anos/))) return id==null?null:id>=+m[1]&&id<=+m[2];
  if((m=t.match(/^FC (≥|>) (\d+)/))) return fc==null?null:(m[1]==="≥"?fc>=+m[2]:fc>+m[2]);
  if((m=t.match(/^FR ≥ (\d+)/))) return fr==null?null:fr>=+m[1];
  if((m=t.match(/^SatO2 < (\d+)%/))) return sat==null?null:sat<+m[1];
  if(/^PAS < 90 ou PAD ≤ 60/.test(t)) return pas==null?null:pas<90||pad<=60;
  if((m=t.match(/^PAS < (\d+)/))) return pas==null?null:pas<+m[1];
  if(/^PA ≥ 140\/90/.test(t)) return pas==null?null:pas>=140||pad>=90;
  if((m=t.match(/^(?:Temperatura|Febre) (≥|>) (\d+)(?:,(\d))?/))) {const v=+(m[2]+"."+(m[3]||0));return tax==null?null:(m[1]==="≥"?tax>=v:tax>v)}
  if(/^Sexo masculino/.test(t)) return sx?sx==="M":null;
  return null;
}
function scAutoAplica(sc){
  const st=scState[sc.id]=scState[sc.id]||{};
  (sc.bin||[]).forEach(([t],i)=>{if(st["m"+i])return;const v=scAutoValor(t);if(v!=null){st["b"+i]=v;st["a"+i]=true}});
}
const scPreenchido=sc=>{const st=scState[sc.id]||{};return (sc.campos||[]).some(([k])=>st[k]!=null)||(sc.bin||[]).some((b,i)=>st["b"+i]!=null)};
const atEscoresIds=()=>[...new Set(atConds().flatMap(c=>SC_COND[c.id]||[]))];
function atEscoresHTML(){
  const scs=atEscoresIds().map(id=>SC.find(s=>s.id===id)).filter(Boolean); if(!scs.length) return "";
  scs.forEach(scAutoAplica);
  return `<details class="atescores" open><summary><span class="lbl">Escores desta conduta</span> <span class="note">vão para a Conduta; os sinais vitais e a idade já marcam o que dá (✱)</span></summary>${scCaixas(scs,true)}</details>`;
}
// linhas da Conduta: só os escores com algo preenchido
function atEscoresLinhas(){
  const scs=atEscoresIds().map(id=>SC.find(s=>s.id===id)).filter(Boolean);
  // sinais vitais digitados agora: atualiza o automático e as caixas na tela
  scs.forEach(sc=>{scAutoAplica(sc);const box=document.querySelector(`#atCorpo [data-scin="${sc.id}"]`);if(!box)return;const st=scState[sc.id];
    (sc.bin||[]).forEach((b,i)=>{const c=box.querySelector(`input[data-b="${i}"]`);if(c&&!st["m"+i])c.checked=!!st["b"+i]});const r=box.querySelector("[data-scres]");if(r)r.innerHTML=scRes(sc)});
  // vai para o prontuário só o escore em que o médico mexeu; incompleto sai sem classificar
  return scs.filter(sc=>{const st=scState[sc.id]||{};return (sc.campos||[]).some(([k])=>st[k]!=null)||(sc.bin||[]).some((b,i)=>st["m"+i])}).map(sc=>{
    const st=scState[sc.id]||{}, falt=(sc.campos||[]).filter(([k])=>st[k]==null).length, t=scTotal(sc);
    return falt?`- Estratificação pelo ${sc.nome}: ${pl(t,"ponto","pontos")} até aqui (incompleto: ${pl(falt,"campo","campos")} sem resposta; sem classificar).`:"- "+scTexto(sc).replace(/^([^:]+):/,"Estratificação pelo $1:")});
}
function scCaixas(scs,at){
  const pts=p=>`<span class="note">(${p>0?"+":""}${String(p).replace(".",",")})</span>`;
  return `${scs.map(sc=>{const st=scState[sc.id]||{};return `<div class="scbox" data-scin="${sc.id}"><div class="scbox-h"><b>${esc(sc.nome)}</b><span class="scres" data-scres>${scRes(sc)}</span></div>
      ${(sc.campos||[]).map(([k,lab,opts])=>`<div class="scq"><span class="lbl">${esc(lab)}</span><div class="chips">${opts.map(([t,p],i)=>`<label class="chip scop"><input type="radio" name="sci_${sc.id}_${k}" data-k="${k}" value="${i}" ${st[k]===i?"checked":""}> ${esc(t)} ${pts(p)}</label>`).join("")}</div></div>`).join("")}
      ${sc.bin?`<div class="chips">${sc.bin.map(([t,p],i)=>`<label class="chip scop"><input type="checkbox" data-b="${i}" ${st["b"+i]?"checked":""}> ${esc(t)} ${pts(p)}${st["a"+i]&&!st["m"+i]?' <span class="note" title="marcado pelos sinais vitais, idade ou sexo">✱</span>':""}</label>`).join("")}</div>`:""}
      <div class="actions"><button class="btn sm" data-sccp>Copiar</button>${at?"":`<button class="btn sm" data-scev>Pôr no Atendimento</button>`}<button class="btn sm" data-sclimpa>Limpar</button></div>
      <p class="note">Fonte: ${esc(sc.src)}</p></div>`}).join("")}`;
}
document.addEventListener("change",e=>{
  const box=e.target.closest("[data-scin]"); if(!box) return; const sc=SC.find(s=>s.id===box.dataset.scin); if(!sc) return;
  const st=scState[sc.id]=scState[sc.id]||{};
  if(e.target.type==="radio") st[e.target.dataset.k]=+e.target.value; else if(e.target.dataset.b!=null){st["b"+e.target.dataset.b]=e.target.checked;st["m"+e.target.dataset.b]=true}
  box.querySelector("[data-scres]").innerHTML=scRes(sc);
  if(box.closest("#atCorpo")&&typeof atAtualiza==="function") atAtualiza();
});
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-sccp],[data-scev],[data-sclimpa]"); if(!b) return; const box=b.closest("[data-scin]"); const sc=box&&SC.find(s=>s.id===box.dataset.scin); if(!sc) return;
  if(b.hasAttribute("data-sccp")) copy(scTexto(sc),b);
  if(b.hasAttribute("data-scev")){evScores=evScores.filter(x=>!x.startsWith(sc.nome+":"));evScores.push(scTexto(sc));toast("Escore no exame físico do Atendimento")}
  if(b.hasAttribute("data-sclimpa")){scState[sc.id]={};(sc.bin||[]).forEach((x,i)=>scState[sc.id]["m"+i]=true);box.querySelectorAll("input").forEach(i=>i.checked=false);box.querySelector("[data-scres]").innerHTML=scRes(sc)}
});
/* ---------- diagnósticos diferenciais da conduta (dor abdominal, 2026-11-12) ----------
   it.diferenciais: [{grupo, titulo, itens:[{dx, pistas, confirma, conduta (id), f:[índices das fontes], sexo?}]}].
   Item com sexo "F" ou "M" só aparece para esse sexo (sem sexo marcado, aparecem os dois). */
function renderDiferenciais(it,aberto){
  const gs=(it&&it.diferenciais)||[]; if(!gs.length) return "";
  const sx=sxAtual(), vale=i=>!i.sexo||!sx||i.sexo===sx;
  const grupos=gs.filter(vale).map(g=>({g,itens:(g.itens||[]).filter(vale)})).filter(x=>x.itens.length);
  return `<details class="sec difs" ${aberto?"open":""}><summary class="sec-h"><h3>Diagnósticos diferenciais</h3><span class="alsum">${grupos.length} grupos · toque para abrir</span></summary>
    ${grupos.map(({g,itens})=>`<details class="difg${g.grupo==="nao-pode-passar"?" difalarme":""}" ${g.grupo==="nao-pode-passar"?"open":""}><summary><b>${esc(g.titulo)}</b> <span class="note">${itens.length}</span></summary>
      <ul class="difl">${itens.map(i=>`<li><b>${esc(i.dx)}</b>${i.pistas?`<div><span class="lbl">Pistas</span> ${esc(i.pistas)}</div>`:""}${i.confirma?`<div><span class="lbl">Confirma ou afasta</span> ${esc(i.confirma)}</div>`:""}${i.conduta&&getItem(i.conduta)?`<button class="btn sm" data-difc="${esc(i.conduta)}">Abrir: ${esc(getItem(i.conduta).nome)}</button>`:""}${(i.f||[]).length?`<span class="note"> Fontes: ${i.f.join(", ")}</span>`:""}</li>`).join("")}</ul></details>`).join("")}
    <p class="note">Os números são as fontes da conduta.</p></details>`;
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-difc]");if(!b)return;
  if(b.closest("#atCorpo")&&typeof atd!=="undefined"){if(!atConds().some(c=>c.id===b.dataset.difc)){atd.extras=[...(atd.extras||[]),b.dataset.difc].slice(0,2);atd.sis=null;atd.alarOff={};const y=window.scrollY;renderEv();window.scrollTo(0,y)}return}
  if(typeof select==="function"){select(b.dataset.difc);window.scrollTo(0,0)}});

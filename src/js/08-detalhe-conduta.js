/* ---------- detail ---------- */
const sess={}; // edições temporárias da prescrição: id -> {casa,unidade,orient}
const cur=(it,f)=>{const s=sess[it.id];return s&&s[f]!=null?s[f]:rxTxt(it[f]||"")};
function section(it,cls,title,f,copyLabel){
  const text=cur(it,f);
  if(!text.trim()&&!(sess[it.id]&&sess[it.id][f]!=null)) return "";
  return `<div class="sec ${cls}"><div class="sec-h"><h3>${title}</h3><button class="btn sm" data-copy="${f}">${copyLabel}</button></div><textarea class="rx-edit" data-f="${f}" spellcheck="false" aria-label="${title}">${esc(text)}</textarea></div>`;
}
const isNew=it=>!!(it.rev&&it.rev.length===1&&it.rev[0]==="Item novo.");
function linkify(f){const m=f.match(/https?:\/\/\S+/);if(!m)return esc(f);const u=m[0].replace(/[.,)]+$/,"");const i=f.indexOf(u);return esc(f.slice(0,i))+`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\//,"").slice(0,60))}${u.length>68?"…":""}</a>`+esc(f.slice(i+u.length))}
function grow(ta){if(!ta||!ta.isConnected)return;if(ta.offsetParent===null)return;ta.style.height="auto";ta.style.height=(ta.scrollHeight+4)+"px"}
function growAll(){requestAnimationFrame(()=>requestAnimationFrame(()=>$$("textarea.rx-edit,textarea.out-edit").forEach(grow)))}
window.addEventListener("resize",growAll);
try{document.fonts&&document.fonts.ready.then(growAll)}catch(e){}

/* dados do paciente (só na memória desta aba; não são salvos) */
const pac={idade:"",sexo:"M",peso:"",cr:"",gest:false,pnc:false};
function clcr(){const i=parseFloat(pac.idade),p=parseFloat(String(pac.peso).replace(",",".")),c=parseFloat(String(pac.cr).replace(",","."));if(!(i>0&&p>0&&c>0))return null;return cockcroft(i,p,c,pac.sexo==="F")}
function perfisAtivos(){const s=new Set(ui.perfil||[]);if(parseFloat(pac.idade)>=65)s.add("idoso");const c=clcr();if(c!=null&&c<60)s.add("renal");if(pac.gest)s.add("gest");if(pac.pnc)s.add("pnc");return s}
function renalAjustes(it){const c=clcr();if(c==null)return null;const txt=cur(it,"casa")+"\n"+cur(it,"unidade");const out=[];for(const r of RENAL){if(!r.re.test(txt))continue;const f=r.f.find(([mx])=>c<mx);out.push({nome:r.nome,msg:f?f[1]:"Sem ajuste nesta faixa de ClCr.",src:r.src})}return {c,out}}
function renderPac(it){
  const c=clcr();
  return `<details class="sec pac" ${pac.idade||pac.cr||pac.gest||pac.pnc?"open":""}><summary class="sec-h" style="cursor:pointer"><h3>Dados do paciente</h3><span class="alsum">idade, peso e creatinina para ajuste de dose</span></summary>
  <div class="pacgrid">
    <label class="f">Idade<input class="inp" id="pcIdade" inputmode="numeric" value="${esc(pac.idade)}"></label>
    <label class="f">Sexo<select class="inp" id="pcSexo"><option value="M" ${pac.sexo==="M"?"selected":""}>Masculino</option><option value="F" ${pac.sexo==="F"?"selected":""}>Feminino</option></select></label>
    <label class="f">Peso (kg)<input class="inp" id="pcPeso" inputmode="decimal" value="${esc(pac.peso)}"></label>
    <label class="f">Creatinina (mg/dL)<input class="inp" id="pcCr" inputmode="decimal" value="${esc(pac.cr)}"></label>
  </div>
  <div class="pacres"><label class="check"><input type="checkbox" id="pcGest" ${pac.gest?"checked":""}> Gestante</label> <label class="check"><input type="checkbox" id="pcPnc" ${pac.pnc?"checked":""}> Alergia a penicilina</label>
  <p>${c!=null?`ClCr estimado (Cockcroft-Gault): <b>${Math.round(c)} mL/min</b>. Idade ≥ 65 marca "idoso" e ClCr < 60 marca "insuficiência renal" automaticamente.`:"Preencha idade, sexo, peso e creatinina para estimar o ClCr e ajustar as doses."}</p>
  <p class="note">Esses dados ficam só nesta aba e somem ao fechar a página.</p></div></details>`;
}
const PERFIS=[["gest","Gestante"],["idoso","Idoso"],["renal","Insuficiência renal"],["pnc","Alergia a penicilina"]];
const PERFIL_CURTO={gest:"Gestante",idoso:"Idoso",renal:"Rim",pnc:"Alergia à penicilina"};
function alertasDe(it){
  const txt=cur(it,"casa")+"\n"+cur(it,"unidade");
  const out={gest:[],idoso:[],renal:[],pnc:[]}; const usadas=new Set();
  const add=(g,nome,[msg,src])=>{out[g].push({nome,msg,src});usadas.add(src)};
  for(const r of RULES){ if(r.re.test(txt)) for(const g of ["gest","idoso","renal"]) if(r[g]) add(g,r.nome,r[g]); }
  const ia=ITEM_ALERTS[it.id]; if(ia) for(const g in ia) add(g,"Esta conduta",ia[g]);
  for(const k of ["pen","cefx","cefo"]) if(PNC[k].test(txt)) add("pnc",{pen:"Penicilinas",cefx:"Cefalexina",cefo:"Outras cefalosporinas"}[k],PNCTXT[k]);
  return {out,usadas:[...usadas]};
}
function renderAlertas(it){
  const {out,usadas}=alertasDe(it);
  const perf=[...perfisAtivos()];
  const ra=renalAjustes(it);
  const box=([g,n],on)=>{const items=out[g];return `<div class="al ${on?"on":""} ${items.length?"has":""}"><h4>${n}</h4>${items.length?`<ul>${items.map(a=>`<li><b>${esc(a.nome)}:</b> ${esc(a.msg)}</li>`).join("")}</ul>`:`<p>Sem alerta específico para os medicamentos desta conduta. Confira a bula.</p>`}</div>`};
  const ativos=PERFIS.filter(([g])=>perf.includes(g));
  const fontes=[...new Set([...usadas,...(ra?ra.out.map(a=>a.src):[])])];
  // no topo: perfis como botões; só os perfis ligados mostram os alertas abertos
  return `<div class="sec alertas ${ativos.length||ra?"hot":""}">
  <div class="perfis"><span class="lbl">Alertas:</span>${PERFIS.map(([g,n])=>`<button class="chip ${out[g].length?"has":""}" style="--c:var(--warn)" data-perfil="${g}" aria-pressed="${perf.includes(g)}" title="${out[g].length?"Esta conduta tem alerta para este perfil":"Sem alerta cadastrado para este perfil"}">${PERFIL_CURTO[g]}${out[g].length?` <span aria-label="tem alerta">⚠</span>`:""}</button>`).join("")}</div>
  ${ra?`<div class="renal-adj"><b>Dose para ClCr ${Math.round(ra.c)} mL/min:</b>${ra.out.length?`<ul>${ra.out.map(a=>`<li><b>${esc(a.nome)}:</b> ${esc(a.msg)}</li>`).join("")}</ul>`:" nenhum medicamento desta conduta tem ajuste renal cadastrado."}</div>`:""}
  ${ativos.length?`<div class="algrid">${ativos.map(x=>box(x,true)).join("")}</div>`:""}
  <details class="alsrc"><summary>Ver alertas de todos os perfis${fontes.length||ra?" e fontes":""}</summary><div class="algrid" style="padding-inline:0">${PERFIS.map(x=>box(x,perf.includes(x[0]))).join("")}</div>
  ${(fontes.length||ra)?`<ol>${fontes.map(k=>`<li>${linkify(SRC[k]||k)}</li>`).join("")}${ra?"<li>Cockcroft DW, Gault MH. Nephron 1976 (fórmula do ClCr).</li>":""}</ol>`:""}</details></div>`;
}
/* checklist "não esquecer": marcações só na memória da aba (nenhum dado de paciente é salvo) */
const chk={}; // id da conduta -> {"hist0":"+", "ex2":"-", …}
const CHK_GRUPOS=[["hist","Anamnese"],["ant","Antecedentes"],["ex","Exame físico dirigido"],["alarme","Sinais de alarme"]];
const semParenteses=t=>t.replace(/\s*\([^)]*\)/g,"").trim();
function chkLinhas(it){
  const c=CHECK[it.id], st=chk[it.id]||{};
  if(!c) return {hma:[],ex:[],n:0};
  const sel=(g,v)=>(c[g]||[]).filter((t,i)=>st[g+i]===v).map(semParenteses);
  const hma=[], ex=[]; const j=a=>a.join("; ")+".";
  const hp=sel("hist","+"), hn=sel("hist","-"), ap=sel("ant","+"), an=sel("ant","-"), ep=sel("ex","+"), en=sel("ex","-"), sp=sel("alarme","+"), sn=sel("alarme","-");
  if(hp.length) hma.push("Refere: "+j(hp));
  if(hn.length) hma.push("Nega: "+j(hn));
  if(ap.length) hma.push("Antecedentes: "+j(ap));
  if(an.length) hma.push("Sem antecedente de: "+j(an));
  if(ep.length||en.length) ex.push("Exame dirigido: "+j([...ep.map(t=>t+": presente"),...en.map(t=>t+": ausente")]));
  if(sp.length) ex.push("Sinais de alarme presentes: "+j(sp));
  if(sn.length) ex.push("Sem sinais de alarme: "+j(sn));
  return {hma,ex,n:Object.keys(st).length};
}
function renderChecklist(it){
  const c=CHECK[it.id]; if(!c) return "";
  const st=chk[it.id]||{};
  const grupos=CHK_GRUPOS.map(([g,nome])=>`<div class="ckg ckg-${g}"><h4>${nome}</h4><ul>${(c[g]||[]).map((t,i)=>{const k=g+i,v=st[k]||"";return `<li class="ck" data-v="${v==="+"?"pos":v==="-"?"neg":""}"><span class="ckt">${esc(t)}</span><span class="ckb"><button data-ck="${k}" data-val="+" aria-pressed="${v==="+"}" aria-label="${esc(t)}: presente" title="Presente">+</button><button data-ck="${k}" data-val="-" aria-pressed="${v==="-"}" aria-label="${esc(t)}: ausente" title="Ausente">−</button></span></li>`}).join("")}</ul></div>`).join("");
  return `<div class="sec chk"><div class="sec-h"><h3>Não esquecer</h3><span class="alsum">+ presente · − ausente</span></div>
  <div class="ckgrid">${grupos}</div>
  <div class="actions ckact"><button class="btn sm primary" id="ckEv">Levar para a evolução</button><button class="btn sm" id="ckCopy">Copiar</button><button class="btn sm" id="ckClear">Limpar marcações</button></div>
  <details class="alsrc"><summary>Fontes do checklist</summary><ol>${c.fontes.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details></div>`;
}
function bindChecklist(it){
  if(!CHECK[it.id]) return;
  $$("#detail [data-ck]").forEach(b=>b.onclick=()=>{
    const st=chk[it.id]=chk[it.id]||{}; const k=b.dataset.ck;
    if(st[k]===b.dataset.val) delete st[k]; else st[k]=b.dataset.val;
    const li=b.closest(".ck"); li.dataset.v=st[k]==="+"?"pos":st[k]==="-"?"neg":"";
    li.querySelectorAll("[data-ck]").forEach(x=>x.setAttribute("aria-pressed",st[k]===x.dataset.val));
  });
  $("#ckCopy").onclick=e=>{const l=chkLinhas(it);const t=[...l.hma,...l.ex].join("\n");if(!t){toast("Marque algum item com + ou −");return}copy(t,e.currentTarget)};
  $("#ckClear").onclick=()=>{delete chk[it.id];renderDetail();toast("Marcações limpas")};
  $("#ckEv").onclick=()=>{
    const l=chkLinhas(it);
    if(!l.n){toast("Marque algum item com + ou −");return}
    evChk={id:it.id,hma:l.hma,ex:l.ex};
    // o checklist já documenta os negativos; o "Nega outros sintomas. Nega febre." fixo poderia contradizer
    $("#evNega").checked=false;
    $("#evCond").value=it.id; evManual=false; setTab("evolucao"); window.scrollTo({top:0});
    toast("Checklist levado para a evolução");
  };
}
function renderFichas(it){
  const ms=medsNaConduta(it); if(!ms.length) return "";
  return `<div class="sec fichas"><div class="sec-h"><h3>Fichas dos remédios desta conduta</h3></div><div class="medlinks">${ms.map(m=>`<button class="chip" data-med="${m.id}" style="--c:var(--${(MGRUPOS[m.grupo]||{cor:"slate"}).cor})">${esc(m.nome.replace(/ \(.*\)$/,""))}</button>`).join("")}</div></div>`;
}
function renderDilu(it){
  const t=cur(it,"unidade"); if(!t.trim()) return "";
  const hits=DILU.filter(d=>d.re.test(t)); if(!hits.length) return "";
  return `<div class="sec dilu"><div class="sec-h"><h3>Preparo dos injetáveis (IM e EV)</h3></div><ul>${hits.map(d=>`<li><b>${esc(d.nome)}:</b> ${esc(d.txt)}</li>`).join("")}</ul><p class="note" style="padding:0 16px 12px">Fontes: ${linkify(DILFONTE)}; guias farmacêuticos do Hospital São Camilo e Sírio-Libanês; bulas. Confira a apresentação disponível no seu serviço.</p></div>`;
}
function fullText(it){return [cur(it,"casa"),cur(it,"unidade")?("Na unidade:\n"+cur(it,"unidade")):"",cur(it,"orient")?("Orientações:\n"+cur(it,"orient")):""].filter(Boolean).join("\n\n")}
function renderDetail(){
  const el=$("#detail"); const it=getItem(ui.sel)||(newTmp&&newTmp.id===ui.sel?newTmp:null);
  if(!it){el.innerHTML=`<div class="empty">Escolha uma prescrição na lista.</div>`;return}
  if(editing) return renderEditor(it);
  const c=CATS[it.cat]||CATS.outros;
  const changed=!!sess[it.id];
  el.innerHTML=`
  <div class="dh">
    <div class="dtop"><button class="btn sm back" id="backBtn">← Lista</button><span class="cat" style="--c:var(--${c.cor})"><span class="dot"></span>${esc(c.nome)}</span></div>
    <h2>${esc(it.nome)}</h2>
    <div class="meta">${it.cid?`<span class="cid">CID ${esc(it.cid)}</span>`:""}
      ${it.custom?`<span class="badge mine">Criada por você</span>`:it.edited?`<span class="badge mine">Editada por você</span>`:""}
      ${isNew(it)?`<span class="badge new">Novo</span>`:(!it.custom&&it.rev&&it.rev.length?`<span class="badge">${it.rev.length} ajuste(s) na revisão</span>`:"")}
      ${it.evid?`<span class="badge">Evidência limitada</span>`:""}</div>
    <div class="abar">
      <button class="btn primary" id="cpAll">Copiar tudo</button>
      <button class="btn" id="toEv">Evolução</button>
      ${it.cid?`<button class="btn" id="toAt">Atestado</button>`:""}
      <button class="favbtn" id="favBtn" aria-pressed="${uso.favs.includes(it.id)}" title="Fixar no topo da lista e no Início" aria-label="Favorito">${uso.favs.includes(it.id)?"★":"☆"}</button>
      <button class="btn edbtn" id="edBtn" title="Editar nome, CID e fontes" aria-label="Editar nome, CID e fontes">✎<span> Editar</span></button>
    </div>
    <p class="note dnote">Os textos são editáveis para este paciente. ${changed?"":"Nada vira padrão sem você pedir."}</p>
    <div id="sessBar" class="sessbar" ${changed?"":"hidden"}><span>Você alterou o texto desta prescrição.</span><button class="btn sm primary" id="sessSave">Salvar como meu padrão</button><button class="btn sm" id="sessUndo">Descartar alterações</button></div>
  </div>
  ${renderPac(it)}
  ${renderAlertas(it)}
  ${it.id==="dengue"?renderDengueCalc():""}
  ${section(it,"casa","Receita — uso domiciliar","casa","Copiar receita")}
  ${section(it,"unidade","Na unidade","unidade","Copiar")}
  ${renderDilu(it)}
  ${section(it,"orient","Orientações","orient","Copiar")}
  ${renderChecklist(it)}
  ${renderFichas(it)}
  ${renderAlta(it)}
  ${it.evid?`<div class="sec evid"><div class="sec-h"><h3>Nível de evidência</h3></div><p>${esc(it.evid)}</p></div>`:""}
  ${(it.fontes&&it.fontes.length)?`<div class="sec fontes"><div class="sec-h"><h3>Fontes</h3></div><ol>${it.fontes.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></div>`:""}
  ${(!it.custom&&!isNew(it)&&it.rev&&it.rev.length)?`<div class="sec rev"><div class="sec-h"><h3>O que mudou em relação ao seu modelo</h3></div><ul>${it.rev.map(r=>`<li>${esc(r)}</li>`).join("")}</ul></div>`:""}`;
  el.querySelectorAll("textarea.rx-edit").forEach(ta=>{grow(ta);ta.addEventListener("input",()=>{grow(ta);sess[it.id]=sess[it.id]||{};sess[it.id][ta.dataset.f]=ta.value;$("#sessBar").hidden=false;})});
  el.querySelectorAll("[data-copy]").forEach(b=>b.onclick=()=>{const f=b.dataset.copy;const t=cur(it,f);copy(f==="unidade"?"Na unidade:\n"+t:f==="orient"?"Orientações:\n"+t:t,b)});
  el.querySelectorAll("[data-perfil]").forEach(b=>b.onclick=()=>{const g=b.dataset.perfil;const p=new Set(ui.perfil||[]);p.has(g)?p.delete(g):p.add(g);ui.perfil=[...p];saveUI();renderDetail()});
  $("#cpAll").onclick=e=>{copy(fullText(it),e.currentTarget)};
  $("#favBtn").onclick=()=>toggleFav(it.id);
  const pcUp=()=>{pac.idade=$("#pcIdade").value;pac.sexo=$("#pcSexo").value;pac.peso=$("#pcPeso").value;pac.cr=$("#pcCr").value;pac.gest=$("#pcGest").checked;pac.pnc=$("#pcPnc").checked;const a=document.activeElement&&document.activeElement.id;renderDetail();if(a&&$("#"+a)){const e=$("#"+a);e.focus();if(e.setSelectionRange&&e.type!=="checkbox"&&e.tagName==="INPUT")try{e.setSelectionRange(e.value.length,e.value.length)}catch(x){}}};
  ["pcIdade","pcPeso","pcCr"].forEach(id=>$("#"+id).addEventListener("change",pcUp));
  ["pcSexo","pcGest","pcPnc"].forEach(id=>$("#"+id).addEventListener("change",pcUp));
  if(it.id==="dengue") bindDengueCalc(it);
  bindChecklist(it);
  growAll();
  $("#toEv").onclick=()=>{$("#evCond").value=it.id;evManual=false;setTab("evolucao")};
  $$("#detail [data-med]").forEach(b=>b.onclick=()=>openMed(b.dataset.med));
  if($("#toAt")) $("#toAt").onclick=()=>{$("#atCid").value=it.cid;atManual=false;setTab("atestado")};
  $("#edBtn").onclick=()=>{editing=true;renderDetail()};
  $("#backBtn").onclick=()=>{$("#tab-prescricoes").classList.remove("show-detail")};
  $("#sessUndo").onclick=()=>{delete sess[it.id];renderDetail();toast("Alterações descartadas")};
  $("#sessSave").onclick=()=>{const s=sess[it.id];const base={nome:it.nome,cat:it.cat,cid:it.cid,sin:it.sin,casa:it.casa,unidade:it.unidade,orient:it.orient};if(it.custom&&it.fontes)base.fontes=it.fontes;Object.assign(base,s);writeOverride(it.id,base);delete sess[it.id];renderList();renderDetail();fillSelects();toast("Salvo como seu padrão")};
}
function renderEditor(it){
  const el=$("#detail");
  const draft=lsGet(LS.draft,null);
  const src=(draft&&draft.id===it.id)?draft:it;
  const isBase=!!baseById[it.id];
  el.innerHTML=`
  <div class="dh"><h2>${it.id.startsWith("custom-")&&!overrides[it.id]?"Nova prescrição":"Editar: "+esc(it.nome)}</h2>
  ${draft&&draft.id===it.id?`<p class="note">Rascunho não salvo recuperado.</p>`:""}</div>
  <div class="row">
    <label class="f">Nome<input class="inp" id="e_nome" value="${esc(src.nome||"")}"></label>
    <label class="f">Categoria<select class="inp" id="e_cat">${Object.entries(CATS).map(([k,v])=>`<option value="${k}" ${k===src.cat?"selected":""}>${v.nome}</option>`).join("")}</select></label>
    <label class="f">CID<input class="inp" id="e_cid" value="${esc(src.cid||"")}"></label>
  </div>
  <label class="f">Palavras para a busca (sinônimos)<input class="inp" id="e_sin" value="${esc(src.sin||"")}"></label>
  <label class="f">Receita — uso domiciliar<textarea class="inp" id="e_casa" rows="12">${esc(src.casa||"")}</textarea></label>
  <label class="f">Na unidade<textarea class="inp" id="e_unidade" rows="6">${esc(src.unidade||"")}</textarea></label>
  <label class="f">Orientações<textarea class="inp" id="e_orient" rows="5">${esc(src.orient||"")}</textarea></label>
  ${it.custom||!baseById[it.id]?`<label class="f">Fontes (uma por linha)<textarea class="inp" id="e_fontes" rows="3">${esc((src.fontes||[]).join("\n"))}</textarea></label>`:`<p class="note">As fontes da versão revisada continuam aparecendo abaixo da prescrição.</p>`}
  <div class="actions">
    <button class="btn primary" id="e_save">Salvar</button>
    <button class="btn" id="e_cancel">Cancelar</button>
    ${isBase&&it.edited?`<button class="btn danger" id="e_restore">Restaurar versão revisada</button>`:""}
    ${!isBase&&overrides[it.id]?`<button class="btn danger" id="e_del">Excluir</button>`:""}
    ${isBase&&!it.edited?`<button class="btn danger" id="e_hide">Ocultar da lista</button>`:""}
  </div>
  <div id="e_confirm"></div>`;
  const read=()=>({id:it.id,nome:$("#e_nome").value.trim()||"Sem nome",cat:$("#e_cat").value,cid:$("#e_cid").value.trim(),sin:$("#e_sin").value,casa:$("#e_casa").value,unidade:$("#e_unidade").value,orient:$("#e_orient").value,...($("#e_fontes")?{fontes:$("#e_fontes").value.split("\n").map(x=>x.trim()).filter(Boolean)}:{})});
  let t; el.querySelectorAll(".inp").forEach(i=>i.addEventListener("input",()=>{clearTimeout(t);t=setTimeout(()=>lsSet(LS.draft,read()),300)}));
  $("#e_save").onclick=()=>{const d=read();delete d.id;const oc=orgOf();if(oc.itemCat[it.id]&&oc.itemCat[it.id]!==d.cat){oc.itemCat[it.id]=d.cat;saveModel()}writeOverride(it.id,d);delete sess[it.id];newTmp=null;try{localStorage.removeItem(LS.draft)}catch(e){};editing=false;toast("Salvo");renderList();renderDetail();fillSelects()};
  $("#e_cancel").onclick=()=>{try{localStorage.removeItem(LS.draft)}catch(e){};editing=false;newTmp=null;if(!getItem(it.id)){ui.sel=BASE[0].id;renderList()}renderDetail()};
  const ask=(msg,fn)=>{$("#e_confirm").innerHTML=`<div class="confirm">${msg}<button class="btn sm danger" id="c_yes">Confirmar</button><button class="btn sm" id="c_no">Cancelar</button></div>`;$("#c_yes").onclick=fn;$("#c_no").onclick=()=>$("#e_confirm").innerHTML=""};
  if($("#e_restore")) $("#e_restore").onclick=()=>ask("Descartar sua edição e voltar ao texto revisado?",()=>{writeOverride(it.id,{restored:true});delete sess[it.id];editing=false;renderList();renderDetail();fillSelects()});
  if($("#e_del")) $("#e_del").onclick=()=>ask("Excluir esta prescrição?",()=>{writeOverride(it.id,{deleted:true,nome:it.nome});editing=false;ui.sel=BASE[0].id;renderList();renderDetail();fillSelects()});
  if($("#e_hide")) $("#e_hide").onclick=()=>ask("Ocultar esta prescrição? Você pode trazê-la de volta pelo Backup.",()=>{writeOverride(it.id,{deleted:true,nome:it.nome});editing=false;ui.sel=BASE[0].id;renderList();renderDetail();fillSelects()});
}
$("#newBtn").onclick=()=>{
  const id="custom-"+Date.now().toString(36);
  newTmp={id,nome:"",cat:(ui.cat&&CATS[ui.cat])?ui.cat:"outros",cid:"",sin:"",casa:"Uso oral\n1) ",unidade:"",orient:"",rev:[],custom:true};
  ui.sel=id; editing=true; renderList(); renderDetail();
  $("#tab-prescricoes").classList.add("show-detail");
};

/* checklist de alta */
function renderAlta(it){
  const extra=ALTA_ITEM[it.id]||[];
  const ori=(cur(it,"orient")||"").split("\n").filter(l=>/retorno|procurar/i.test(l)).map(l=>"Orientado: "+l.replace(/^-\s*/,""));
  const all=[...extra,...ALTA_GERAL,...ori];
  return `<div class="sec alta"><div class="sec-h"><h3>Antes da alta</h3></div><ul>${all.map((t,i)=>`<li><label><input type="checkbox" id="alta${i}"> <span>${esc(t)}</span></label></li>`).join("")}</ul><p class="note" style="padding:0 16px 12px">Fonte: ${esc(ALTA_FONTE)} Itens específicos da conduta: fontes listadas acima.</p></div>`;
}
/* hidratação da dengue */
const dc={peso:"",grupo:"AB",crianca:false};
function renderDengueCalc(){
  return `<div class="sec dcalc"><div class="sec-h"><h3>Calculadora de hidratação da dengue</h3></div>
  <div class="pacgrid">
    <label class="f">Peso (kg)<input class="inp" id="dcPeso" inputmode="decimal" value="${esc(dc.peso||pac.peso)}"></label>
    <label class="f">Grupo<select class="inp" id="dcGrupo"><option value="AB" ${dc.grupo==="AB"?"selected":""}>A ou B (oral)</option><option value="C" ${dc.grupo==="C"?"selected":""}>C (sinais de alarme)</option><option value="D" ${dc.grupo==="D"?"selected":""}>D (choque/grave)</option></select></label>
    <label class="f">Faixa<select class="inp" id="dcFaixa"><option value="a" ${!dc.crianca?"selected":""}>Adulto</option><option value="c" ${dc.crianca?"selected":""}>Criança &lt; 13 anos</option></select></label>
  </div>
  <textarea class="rx-edit" id="dcOut" spellcheck="false" aria-label="Hidratação calculada"></textarea>
  <div class="actions" style="padding:0 14px 12px"><button class="btn sm primary" id="dcIns">Inserir na receita</button><button class="btn sm" id="dcCopy">Copiar</button></div></div>`;
}
function bindDengueCalc(it){
  const up=()=>{dc.peso=$("#dcPeso").value;dc.grupo=$("#dcGrupo").value;dc.crianca=$("#dcFaixa").value==="c";const p=parseFloat(String(dc.peso).replace(",","."));$("#dcOut").value=p>0?dengueCalc(p,dc.grupo,dc.crianca):"Informe o peso.";grow($("#dcOut"))};
  ["dcPeso","dcGrupo","dcFaixa"].forEach(id=>$("#"+id).addEventListener("input",up));up();
  $("#dcCopy").onclick=e=>copy($("#dcOut").value,e.currentTarget);
  $("#dcIns").onclick=()=>{const f=dc.grupo==="AB"?"casa":"unidade";const t=$("#dcOut").value;sess[it.id]=sess[it.id]||{};sess[it.id][f]=(cur(it,f)?cur(it,f)+"\n\n":"")+t;renderDetail();toast("Hidratação inserida — confira e copie")};
}

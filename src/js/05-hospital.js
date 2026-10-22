/* ---------- "Meu hospital": gaveta genérica para os protocolos do hospital onde o médico trabalha ----------
   O código público não tem nenhum conteúdo de hospital. O pacote (JSON) vem de fora: buscado de um repositório
   privado com uma chave de leitura do próprio médico, ou importado de um arquivo. Fica só neste aparelho, numa
   chave própria (fora das rxp_*, fora do backup e da nuvem). Formato em docs/FORMATO-HOSPITAL.md. */
const HOSP_LS="mph_hospital_v1";
let hosp=lsGet(HOSP_LS,null)||{};      // {cfg:{repo,arq,chave}, pac, em}
const hospPac=()=>hosp.pac||null;
const hospAtivo=()=>!!hospPac()&&ui.rede==="hospital";
const hospInt={};                       // critérios marcados na internação: do paciente, só na memória (Novo paciente limpa)
function hospValida(p){
  if(!p||p.formato!==1||typeof p.nome!=="string"||!p.nome.trim()||!Array.isArray(p.docs)) throw new Error("formato");
  p.docs=p.docs.filter(d=>d&&typeof d.id==="string"&&Array.isArray(d.secoes));
  if(!/^#[0-9a-f]{6}$/i.test(p.cor||"")) p.cor="#0F8C80";
  return p;
}
function hospSalva(){if(!lsSet(HOSP_LS,hosp)) toast("Sem espaço no aparelho para guardar o pacote")}
function hospAplica(){
  const p=hospPac();
  document.documentElement.style.setProperty("--hosp",p?p.cor:"var(--teal)");
  if(!p&&ui.rede==="hospital"){ui.rede=null;saveUI()}
  renderRede(); fillDestino(); if(ui.tab==="hospital") renderHospital();
}
async function hospBaixar(silencioso){
  const c=hosp.cfg||{};
  if(!/^[\w.-]+\/[\w.-]+$/.test(c.repo||"")||!/^[\w./-]+\.json$/.test(c.arq||"")||!c.chave){if(!silencioso)toast("Preencha repositório, arquivo e chave");return false}
  try{
    const r=await fetch(`https://api.github.com/repos/${c.repo}/contents/${c.arq}`,{cache:"no-store",headers:{Authorization:"Bearer "+c.chave,Accept:"application/vnd.github.raw+json"}});
    if(!r.ok) throw new Error(r.status===401||r.status===403?"chave":r.status===404?"achado":"rede");
    hosp.pac=hospValida(await r.json()); hosp.em=Date.now(); hospSalva(); hospAplica();
    if(!silencioso) toast("Protocolos do hospital atualizados");
    return true;
  }catch(e){
    if(!silencioso) toast(e.message==="chave"?"Chave recusada: confira a permissão de leitura do repositório":e.message==="achado"?"Arquivo não encontrado no repositório":e.message==="formato"?"O arquivo não é um pacote de hospital válido":"Sem conexão: fica a última versão baixada");
    return false;
  }
}
function hospImportar(txt){
  try{hosp.pac=hospValida(JSON.parse(txt)); hosp.em=Date.now(); hospSalva(); hospAplica(); toast("Pacote importado neste aparelho")}
  catch(e){toast("O arquivo não é um pacote de hospital válido")}
}
function hospApagar(){
  try{localStorage.removeItem(HOSP_LS)}catch(e){}
  hosp={}; Object.keys(hospInt).forEach(k=>delete hospInt[k]); hospAplica(); toast("Apagado deste aparelho");
}
/* ---------- modo hospital ("Onde estou hoje" = hospital): o pacote pode trazer a conduta na unidade, divergências,
   regras por conduta, lembretes da evolução e os desfechos do hospital. Sem pacote ou fora do modo, o app é o de sempre. */
const hospCond=id=>hospAtivo()&&(hospPac().condutas||{})[id]||null;
const hospUnid=id=>{const c=hospCond(id);return c&&typeof c.unidade==="string"?c.unidade:null};
const hospLista=(lista,id)=>(Array.isArray(lista)?lista:[]).filter(x=>x&&Array.isArray(x.condutas)&&(x.condutas.includes(id)||x.condutas.includes("*")));
const DESTINOS_APP=[["alta","Alta com orientações","- Alta com orientações e sinais de retorno."],["observacao","Observação","- Mantido em observação para reavaliação."],["internacao","Internação","- Indicada internação."],["transferencia","Transferência","- Solicitada transferência pela regulação."]];
function destinos(){const d=hospAtivo()&&hospPac().desfechos;return Array.isArray(d)&&d.length?d.filter(x=>x&&x.id&&x.rot).map(x=>[x.id,x.rot,x.txt||"- "+x.rot+"."]):DESTINOS_APP}
function fillDestino(){
  const s=$("#evDestino"); if(!s) return; const v=s.value;
  s.innerHTML=`<option value="">— não incluir —</option>`+destinos().map(([id,r])=>`<option value="${esc(id)}">${esc(r)}</option>`).join("");
  s.value=destinos().some(d=>d[0]===v)?v:"";
}
// divergências: aparecem com o pacote carregado (em qualquer modo), as duas versões lado a lado, até o médico decidir
function hospDivHTML(id){
  const p=hospPac(); if(!p) return "";
  const dv=hospLista(p.divergencias,id); if(!dv.length) return "";
  const lado=(rot,x)=>`<div class="hdlado"><span class="hdrot">${esc(rot)}</span><p>${esc(x&&x.txt)}</p><p class="note">Fonte: ${esc(x&&x.fonte)}</p></div>`;
  return `<div class="sec hospdiv"><div class="sec-h"><h3>Hospital × app: você decide</h3><span class="alsum">${dv.length} ponto(s)</span></div>
    ${dv.map(d=>`<div class="hditem"><h4>${esc(d.tema)}</h4><div class="hdlados">${lado(p.curto||p.nome,d.hospital)}${lado("Meu Plantão",d.app)}</div>${d.decisao?`<p class="hddec"><b>Sua decisão:</b> ${esc(d.decisao)}</p>`:""}</div>`).join("")}</div>`;
}
// regras do hospital para esta conduta (só no modo hospital)
function hospRegrasHTML(id){
  if(!hospAtivo()) return "";
  const r=hospLista(hospPac().regras,id); if(!r.length) return "";
  return `<div class="sec hospregras"><div class="sec-h"><h3>Regras de ${esc(hospPac().curto||hospPac().nome)}</h3></div><ul class="qlist">${r.map(x=>`<li>${esc(x.txt)}${x.ref?` <span class="note">(${esc(x.ref)})</span>`:""}</li>`).join("")}</ul></div>`;
}
// evolução: lembretes do hospital e frases proibidas encontradas no texto
function hospEvAviso(txt){
  if(!hospAtivo()) return "";
  const p=hospPac(), proib=(p.internacao?.proibidas||[]).filter(f=>hospNorm(txt).includes(hospNorm(f)));
  const lem=p.evolucao?.lembretes||[];
  return (proib.length?`<p class="hospproib"><b>Tire do texto:</b> ${proib.map(f=>"“"+esc(f)+"”").join(", ")}${p.evolucao?.proibidasMotivo?` — ${esc(p.evolucao.proibidasMotivo)}`:""}</p>`:"")
    +(lem.length?`<details class="hosplem"><summary>Lembretes de ${esc(p.curto||p.nome)} para o prontuário</summary><ul>${lem.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></details>`:"");
}
/* texto do pacote: markdown simples (títulos ###, listas, tabelas, **negrito**), sempre escapado */
function hospMd(s){
  const inl=t=>esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
  const out=[]; let lista=null, tab=null;
  const fecha=()=>{if(lista){out.push(`<${lista.t}>${lista.l.join("")}</${lista.t}>`);lista=null}if(tab){out.push(`<div class="hosptab"><table>${tab.map((r,i)=>`<tr>${r.map(c=>i?`<td>${inl(c)}</td>`:`<th>${inl(c)}</th>`).join("")}</tr>`).join("")}</table></div>`);tab=null}};
  for(const l of String(s||"").split("\n")){
    let m;
    if(/^\s*\|/.test(l)){if(lista)fecha();if(/^\s*\|[\s|:-]+\|\s*$/.test(l))continue;(tab=tab||[]).push(l.trim().replace(/^\||\|$/g,"").split("|").map(x=>x.trim()));continue}
    if(tab) fecha();
    if((m=l.match(/^\s*(?:[-*]|(\d+)\.)\s+(.*)/))){const t=m[1]?"ol":"ul";if(lista&&lista.t!==t)fecha();(lista=lista||{t,l:[]}).l.push(`<li>${inl(m[2])}</li>`);continue}
    fecha();
    if((m=l.match(/^#{1,4}\s+(.*)/))) out.push(`<h4>${inl(m[1])}</h4>`);
    else if(l.trim()) out.push(`<p>${inl(l)}</p>`);
  }
  fecha(); return out.join("");
}
const hospDoc=id=>(hospPac()?.docs||[]).find(d=>d.id===id);
const hospNorm=t=>String(t||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
let hospSel=null, hospBusca="";
function renderHospital(){
  const p=hospPac(), el=$("#hospCorpo"); if(!el) return;
  const c=hosp.cfg||{};
  const cfg=`<details class="sec" id="hospCfg" ${p?"":"open"}><summary class="sec-h"><h3>${p?"Atualizar ou trocar o pacote":"Trazer os protocolos do seu hospital"}</h3></summary>
    <div class="hospform">
      <p class="note">O pacote fica só neste aparelho. Nada vai para o site, para o backup ou para a nuvem do painel. Use só em aparelho com login próprio.</p>
      <label>Repositório privado (dono/nome)<input id="hospRepo" autocomplete="off" spellcheck="false" placeholder="usuario/repositorio" value="${esc(c.repo||"")}"></label>
      <label>Arquivo do pacote<input id="hospArq" autocomplete="off" spellcheck="false" placeholder="hospital.json" value="${esc(c.arq||"hospital.json")}"></label>
      <label>Chave de leitura do GitHub<input id="hospChave" class="segredo" type="text" name="ps-token-hospital" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="${c.chave?"guardada neste aparelho":"cole aqui"}"></label>
      <div class="actions"><button class="btn primary" id="hospBaixar">Baixar do repositório</button><label class="btn" for="hospArquivo">Importar arquivo</label><input type="file" id="hospArquivo" accept=".json,application/json" hidden></div>
      ${p||c.chave?`<button class="btn danger" id="hospApagar">Apagar do aparelho (pacote e chave)</button>`:""}
    </div></details>`;
  if(!p){el.innerHTML=cfg;bindHospCfg();return}
  const docs=p.docs, q=hospNorm(hospBusca.trim());
  const doc=hospDoc(hospSel)||docs[0]; hospSel=doc&&doc.id;
  let corpo="";
  if(q.length>=2){
    const ach=[]; docs.forEach(d=>d.secoes.forEach(s=>{if(hospNorm(s.titulo+" "+s.md).includes(q)) ach.push([d,s])}));
    corpo=ach.length?`<div class="qcams">${ach.slice(0,40).map(([d,s])=>`<button class="qcam" data-hd="${esc(d.id)}" data-hs="${esc(s.id)}"><span><b>${esc(d.titulo)}</b> · ${esc(s.titulo)}</span><span class="qir">abrir →</span></button>`).join("")}</div>`:`<p class="note">Nada encontrado.</p>`;
  } else if(doc) corpo=hospDocHTML(doc);
  el.innerHTML=`<div class="panel card hosphead"><div><b>${esc(p.nome)}</b><span class="note"> · versão ${esc(p.versao||"?")} · baixado em ${new Date(hosp.em||0).toLocaleDateString("pt-BR")}</span></div>
      ${p.aviso?`<p class="note">${esc(p.aviso)}</p>`:""}
      <input id="hospQ" type="search" placeholder="Buscar nos protocolos do hospital" value="${esc(hospBusca)}" aria-label="Buscar nos protocolos do hospital">
      <div class="chips" id="hospDocs">${docs.map(d=>`<button class="chip" data-hdoc="${esc(d.id)}" aria-pressed="${q.length<2&&d.id===hospSel}">${esc(d.titulo)}</button>`).join("")}${p.internacao?`<button class="chip" id="hospIntBtn">Internação</button>`:""}${(p.divergencias||[]).length?`<button class="chip" id="hospDivBtn">Hospital × app</button>`:""}</div></div>
    <div id="hospDoc">${corpo}</div>${cfg}`;
  $$("#hospDocs [data-hdoc]").forEach(b=>b.onclick=()=>{hospSel=b.dataset.hdoc;hospBusca="";renderHospital();window.scrollTo({top:0})});
  $$("#hospDoc [data-hd]").forEach(b=>b.onclick=()=>abrirHospDoc(b.dataset.hd,b.dataset.hs));
  if($("#hospIntBtn")) $("#hospIntBtn").onclick=()=>abrirHospInt();
  if($("#hospDivBtn")) $("#hospDivBtn").onclick=()=>hospSheet([...new Set((p.divergencias||[]).flatMap(d=>d.condutas||[]))].map(id=>hospDivHTML(id)).filter((x,i,a)=>a.indexOf(x)===i).join("")||"","Hospital × app");
  const qi=$("#hospQ"); qi.oninput=()=>{hospBusca=qi.value;const pos=qi.selectionStart;renderHospital();const n=$("#hospQ");n.focus();n.setSelectionRange(pos,pos)};
  linkMeds($("#hospDoc")); bindHospCfg();
}
function hospDocHTML(d,so){
  const secs=so?d.secoes.filter(s=>s.id===so):d.secoes;
  return `<div class="sec hospdoc"><div class="sec-h"><h3>${esc(d.titulo)}</h3>${d.ref?`<span class="alsum">${esc(d.ref)}</span>`:""}</div>
    ${secs.map(s=>`<div class="hospsec" id="hs-${esc(d.id)}-${esc(s.id)}"><h4 class="hosph">${esc(s.titulo)}</h4>${hospMd(s.md)}</div>`).join("")}
    ${so&&d.secoes.length>1?`<button class="btn sm" data-hinteiro="${esc(d.id)}">Ver o protocolo inteiro</button>`:""}</div>`;
}
function bindHospCfg(){
  const val=id=>($("#"+id).value||"").trim();
  const pega=()=>{hosp.cfg=Object.assign({},hosp.cfg,{repo:val("hospRepo"),arq:val("hospArq")||"hospital.json"});if(val("hospChave"))hosp.cfg.chave=val("hospChave");hospSalva()};
  $("#hospBaixar").onclick=async e=>{pega();const b=e.currentTarget;b.disabled=true;await hospBaixar(false);b.disabled=false};
  $("#hospArquivo").onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(hospImportar)};
  const ap=$("#hospApagar"); if(ap){let t=null;ap.onclick=()=>{if(!ap.classList.contains("confirma")){ap.classList.add("confirma");ap.textContent="Tocar de novo para apagar";t=setTimeout(()=>{ap.classList.remove("confirma");ap.textContent="Apagar do aparelho (pacote e chave)"},3000);return}clearTimeout(t);hospApagar()}}
}
/* folha por cima, como a ficha de remédio: abre a seção certa sem perder a conduta */
function hospSheet(html,rot){
  let sh=$("#hospSheet");
  if(!sh){sh=document.createElement("div");sh.id="hospSheet";sh.className="msheet";sh.hidden=true;document.body.append(sh);
    sh.addEventListener("click",e=>{if(e.target.closest("[data-fechar]"))fecharHospSheet()})}
  sh.innerHTML=`<div class="msheet-bg" data-fechar></div><div class="msheet-box" role="dialog" aria-modal="true" aria-label="${esc(rot)}">
    <div class="msheet-top"><span class="hospselo">${esc(hospPac().curto||hospPac().nome)}</span><button class="btn sm" data-fechar aria-label="Fechar">✕ Fechar</button></div><div id="hsBody">${html}</div></div>`;
  const aberta=!sh.hidden; sh.hidden=false; document.body.classList.add("sheet-on");
  if(!aberta){try{history.pushState({ficha:1},"")}catch(e){}}
  sh.querySelector(".msheet-box").scrollTop=0; linkMeds($("#hsBody")); sh.querySelector("[data-fechar].btn").focus();
  return sh;
}
function fecharHospSheet(){const sh=$("#hospSheet");if(!sh||sh.hidden)return;sh.hidden=true;document.body.classList.remove("sheet-on");try{if(history.state&&history.state.ficha)history.back()}catch(e){}}
addEventListener("popstate",()=>{const sh=$("#hospSheet");if(sh&&!sh.hidden){sh.hidden=true;document.body.classList.remove("sheet-on")}});
addEventListener("keydown",e=>{if(e.key==="Escape")fecharHospSheet()});
function abrirHospDoc(id,secao){
  const d=hospDoc(id); if(!d) return;
  const sh=hospSheet(hospDocHTML(d,secao&&d.secoes.some(s=>s.id===secao)?secao:null),d.titulo);
  const b=sh.querySelector("[data-hinteiro]"); if(b) b.onclick=()=>abrirHospDoc(id);
}
/* internação: critérios do hospital por doença ou por grupo, marcados por toque, viram a justificativa para copiar */
function abrirHospInt(doencaId){
  const I=hospPac().internacao; if(!I) return;
  const listas=[...(I.doencas||[]).map(d=>({id:"d:"+d.id,nome:d.nome,itens:d.itens||[],uti:d.uti})),...(I.grupos||[]).map(g=>({id:"g:"+g.id,nome:g.nome,itens:g.itens||[],nivel:g.nivel}))];
  const sel=hospInt.lista&&listas.find(l=>l.id===hospInt.lista)||listas.find(l=>l.id==="d:"+doencaId)||null;
  if(sel) hospInt.lista=sel.id;
  const marc=hospInt.marc=hospInt.marc||{};
  const just=()=>{const it=sel?sel.itens.filter((x,i)=>marc[sel.id+"|"+i]):[];const pr=(I.prioridades||[]).find(p=>String(p.n)===String(hospInt.pri));
    return it.length?`Justificativa da internação (${sel.nome}): ${it.join("; ")}.${pr?` Prioridade ${pr.n}: ${pr.txt}${pr.destino?` (${pr.destino})`:""}.`:""}`:""};
  const html=`<div class="sec hospint"><div class="sec-h"><h3>Internação</h3><span class="alsum">critérios do hospital</span></div>
    ${I.nota?`<p class="note">${esc(I.nota)}</p>`:""}
    <label class="lbl" for="hiLista">Doença ou grupo</label>
    <select id="hiLista"><option value="">Escolha…</option>${listas.map(l=>`<option value="${esc(l.id)}" ${sel&&sel.id===l.id?"selected":""}>${esc(l.nome)}${l.uti?" (UTI)":""}</option>`).join("")}</select>
    ${sel?`${sel.uti?`<p class="hosputi">Indicação direta de UTI pelo protocolo do hospital.</p>`:""}${sel.nivel?`<p class="note">${esc(sel.nivel)}</p>`:""}
      <div class="hichk">${sel.itens.map((x,i)=>`<label><input type="checkbox" data-hi="${i}" ${marc[sel.id+"|"+i]?"checked":""}> <span>${esc(x)}</span></label>`).join("")}</div>`:""}
    ${(I.prioridades||[]).length?`<label class="lbl" for="hiPri">Prioridade (UTI)</label><select id="hiPri"><option value="">—</option>${I.prioridades.map(p=>`<option value="${esc(String(p.n))}" ${String(hospInt.pri)===String(p.n)?"selected":""}>${esc(p.n+" · "+p.txt+(p.destino?" → "+p.destino:""))}</option>`).join("")}</select>`:""}
    <label class="lbl" for="hiOut">Justificativa para o relatório</label><textarea id="hiOut" rows="4" spellcheck="false" readonly>${esc(just())}</textarea>
    <div class="actions"><button class="btn primary" id="hiCp">Copiar justificativa</button></div>
    ${(I.proibidas||[]).length?`<div class="hospaviso"><b>Nunca escrever no relatório:</b> ${I.proibidas.map(f=>"“"+esc(f)+"”").join(", ")}</div>`:""}
    ${(I.lembretes||[]).length?`<ul class="qlist">${I.lembretes.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>`:""}
    ${I.ref?`<p class="note">${esc(I.ref)}</p>`:""}</div>`;
  const sh=hospSheet(html,"Internação");
  sh.querySelector("#hiLista").onchange=e=>{hospInt.lista=e.target.value||null;abrirHospInt()};
  if(sh.querySelector("#hiPri")) sh.querySelector("#hiPri").onchange=e=>{hospInt.pri=e.target.value;sh.querySelector("#hiOut").value=just()};
  sh.querySelectorAll("[data-hi]").forEach(c=>c.onchange=()=>{marc[sel.id+"|"+c.dataset.hi]=c.checked;sh.querySelector("#hiOut").value=just()});
  sh.querySelector("#hiCp").onclick=e=>{const t=sh.querySelector("#hiOut").value;if(!t){toast("Marque ao menos um critério");return}copy(t,e.currentTarget)};
}
/* atalhos na conduta e na queixa: "Ver no protocolo do hospital" e critérios de internação */
function hospAtalhos(chave){
  const p=hospPac(); if(!p) return "";
  const at=((p.atalhos||{})[chave]||[]).filter(a=>hospDoc(a.doc));
  const doenca=(p.internacao?.doencas||[]).find(d=>(d.condutas||[]).includes(chave));
  if(!at.length&&!doenca) return "";
  return `<div class="sec hospat"><div class="sec-h"><h3>${esc(p.curto||p.nome)}</h3>${hospAtivo()?`<span class="alsum">protocolo do hospital ativo</span>`:""}</div><div class="hospbtns">
    ${at.map(a=>{const d=hospDoc(a.doc),s=d.secoes.find(x=>x.id===a.secao);return `<button class="btn hospbtn" data-hab="${esc(a.doc)}" data-has="${esc(a.secao||"")}">Ver no protocolo do hospital: ${esc(a.rot||d.titulo+(s?" · "+s.titulo:""))}</button>`}).join("")}
    ${doenca?`<button class="btn hospbtn" data-hint="${esc(doenca.id)}">Critérios de internação${doenca.uti?" (UTI)":""}</button>`:""}</div></div>`;
}
function bindHospAtalhos(box){
  if(!box) return;
  box.querySelectorAll("[data-hab]").forEach(b=>b.onclick=()=>abrirHospDoc(b.dataset.hab,b.dataset.has));
  box.querySelectorAll("[data-hint]").forEach(b=>b.onclick=()=>{hospInt.lista="d:"+b.dataset.hint;abrirHospInt(b.dataset.hint)});
}
// ao carregar: só a cor e o seletor (as abas ainda não existem; o Início desenha o seletor depois)
document.documentElement.style.setProperty("--hosp",hospPac()?hospPac().cor:"var(--teal)");
if(!hospPac()&&ui.rede==="hospital") ui.rede=null;
fillDestino();
// abre o site: se há chave, busca a versão nova em segundo plano (sem conexão, fica a última baixada)
if(hosp.cfg&&hosp.cfg.chave&&navigator.onLine!==false) hospBaixar(true);

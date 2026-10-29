/* ---------- seções e abas ---------- */
const TABS=["inicio","prescricoes","queixas","feridas","hospital","medicacoes","pediatria","sala","pcr","bic","iot","protocolos","evolucao","pacientes","plantoes","atestado","modelos","backup","escores","calculadora","contas","eletrolitos"];
// cada aba pertence a uma seção da barra de navegação
const SECOES={inicio:["inicio","pacientes"],condutas:["prescricoes","queixas","feridas"],remedios:["medicacoes","pediatria"],sala:["sala","pcr","bic","iot","protocolos"],atender:["evolucao"],plantoes:["plantoes"],documentos:["hospital","atestado","modelos","backup"],calculos:["escores","calculadora","contas","eletrolitos"]};
const secDe=t=>Object.keys(SECOES).find(s=>SECOES[s].includes(t))||"inicio";
const ultimaAba={}; // última aba aberta em cada seção (só nesta sessão)
/* descrição logo abaixo de um título: fica escondida num "ⓘ" ao lado dele (o médico abre se quiser) */
function infoNotas(raiz=document){
  raiz.querySelectorAll("h2:not([id])+p.note:not([id])").forEach(n=>{   // título ou texto com id muda sozinho: fica como está
    const h=n.previousElementSibling; if(!h||h.querySelector(".info")) return;
    const d=document.createElement("details"); d.className="info";
    d.innerHTML=`<summary aria-label="Sobre esta tela" title="Sobre esta tela">ⓘ</summary>`; d.append(n); h.append(d);
  });
}
// só refaz quando entra um título ou uma nota (o relógio do atendimento muda o texto a cada segundo e não conta)
const infoEntra=n=>n.nodeType===1&&(n.matches("h2,p.note")||!!n.querySelector("h2+p.note"));
new MutationObserver(ms=>{if(!ms.some(m=>[...m.addedNodes].some(infoEntra)))return;clearTimeout(infoNotas._t);infoNotas._t=setTimeout(infoNotas,30)}).observe(document.body,{childList:true,subtree:true});
function setTab(t){
  if(!TABS.includes(t)) t="inicio";
  ui.tab=t; const sec=secDe(t); ultimaAba[sec]=t;
  // seção com uma página só: somem os botões de aba, mas a linha fica no Atendimento (é onde mora a barra de etapas)
  const uma=SECOES[sec].length<2;
  $$(".tabs button[role=tab]").forEach(b=>{b.setAttribute("aria-selected",b.dataset.tab===t);b.hidden=b.dataset.sec!==sec||uma});
  $(".tabs").hidden=uma&&t!=="evolucao";
  $$("#secnav [data-sec]").forEach(b=>{if(b.dataset.sec===sec)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
  {const mb=$("#maisBtn");if(mb)mb.toggleAttribute("data-ativo",!!$(`#secnav [data-sec="${sec}"][data-mais]`))}
  document.body.dataset.sec=sec;
  TABS.forEach(x=>$("#tab-"+x).hidden=x!==t);
  if(t==="inicio") renderInicio(); if(t==="sala") renderSala(); if(t==="bic") renderBic(); if(t==="pcr") renderPcr(); if(t==="protocolos") renderProtocolo(); if(t==="contas") renderContas(); if(t==="eletrolitos") renderEletrolitos(); if(t==="iot") renderIot();
  renderEv(); if(t==="pacientes") renderPacientes(); if(t==="plantoes") renderPlantoes(); if(t==="atestado") renderAt(); if(t==="calculadora") renderCalc(); if(t==="pediatria") setPMode(ui.pmode||"rx"); if(t==="modelos"){renderModelos();renderOrg()} if(t==="feridas") renderFer(); if(t==="queixas") renderQueixas(); if(t==="prescricoes"&&!editing) renderDetail(); if(t==="hospital") renderHospital(); if(t==="medicacoes") renderMedTab();
  if(t==="escores") renderScores(); if(t==="backup"){renderHidden();renderAcesso($("#acCaixa"));renderGs();renderIa()} growAll();
  try{history.replaceState(null,"","#"+t)}catch(e){}
}
function setSec(sec){
  // tocar de novo na seção atual volta para a lista (celular) ou para o topo
  if(secDe(ui.tab)===sec){
    const g=$("#tab-"+ui.tab); if(g&&g.classList.contains("grid")) g.classList.remove("show-detail");
    window.scrollTo({top:0,behavior:"smooth"}); return;
  }
  setTab(ultimaAba[sec]||SECOES[sec][0]); window.scrollTo({top:0});
}
$$(".tabs button").forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
$$("#secnav [data-sec]").forEach(b=>b.onclick=()=>setSec(b.dataset.sec));
// menu "☰ Mais": Documentos, Cálculos e Sala vermelha (fora da barra para caber bem no celular e na meia tela)
(function(){
  const bt=$("#maisBtn"), mn=$("#maisMenu"); if(!bt||!mn) return;
  // lista simples de botões (Tab navega); abre com o foco no primeiro e Esc devolve o foco ao "☰ Mais"
  mn.innerHTML=$$("#secnav [data-mais]").map(b=>`<button data-maissec="${b.dataset.sec}" style="${b.getAttribute("style")||""}">${b.innerHTML}</button>`).join("");
  bt.setAttribute("aria-controls","maisMenu");
  const fecha=()=>{mn.hidden=true;bt.setAttribute("aria-expanded","false")};
  bt.onclick=e=>{e.stopPropagation();mn.hidden=!mn.hidden;bt.setAttribute("aria-expanded",String(!mn.hidden));if(!mn.hidden){const p=mn.querySelector("button");if(p)p.focus()}};
  mn.querySelectorAll("[data-maissec]").forEach(b=>b.onclick=()=>{fecha();setSec(b.dataset.maissec)});
  document.addEventListener("click",e=>{if(!mn.hidden&&!e.target.closest("#maisMenu,#maisBtn"))fecha()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!mn.hidden){fecha();bt.focus()}});
})();

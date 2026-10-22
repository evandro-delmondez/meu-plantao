/* ---------- seções e abas ---------- */
const TABS=["inicio","prescricoes","queixas","feridas","hospital","medicacoes","pediatria","sala","pcr","bic","iot","protocolos","evolucao","pacientes","atestado","modelos","backup","escores","calculadora","contas","eletrolitos"];
// cada aba pertence a uma seção da barra de navegação
const SECOES={inicio:["inicio"],condutas:["prescricoes","queixas","feridas","hospital"],remedios:["medicacoes","pediatria"],sala:["sala","pcr","bic","iot","protocolos"],atender:["evolucao","pacientes"],documentos:["atestado","modelos","backup"],calculos:["escores","calculadora","contas","eletrolitos"]};
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
new MutationObserver(()=>{clearTimeout(infoNotas._t);infoNotas._t=setTimeout(infoNotas,30)}).observe(document.body,{childList:true,subtree:true});
function setTab(t){
  if(!TABS.includes(t)) t="inicio";
  ui.tab=t; const sec=secDe(t); ultimaAba[sec]=t;
  $$(".tabs button").forEach(b=>{b.setAttribute("aria-selected",b.dataset.tab===t);b.hidden=b.dataset.sec!==sec});
  $(".tabs").hidden=SECOES[sec].length<2;
  $$("#secnav [data-sec]").forEach(b=>{if(b.dataset.sec===sec)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
  document.body.dataset.sec=sec;
  TABS.forEach(x=>$("#tab-"+x).hidden=x!==t);
  if(t==="inicio") renderInicio(); if(t==="sala") renderSala(); if(t==="bic") renderBic(); if(t==="pcr") renderPcr(); if(t==="protocolos") renderProtocolo(); if(t==="contas") renderContas(); if(t==="eletrolitos") renderEletrolitos(); if(t==="iot") renderIot();
  renderEv(); if(t==="pacientes") renderPacientes(); if(t==="atestado") renderAt(); if(t==="calculadora") renderCalc(); if(t==="pediatria") setPMode(ui.pmode||"rx"); if(t==="modelos"){renderModelos();renderOrg()} if(t==="feridas") renderFer(); if(t==="queixas") renderQueixas(); if(t==="prescricoes"&&!editing) renderDetail(); if(t==="hospital") renderHospital(); if(t==="medicacoes") renderMedTab();
  if(t==="escores") renderScores(); if(t==="backup"){renderHidden();renderAcesso($("#acCaixa"));renderGs()} growAll();
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

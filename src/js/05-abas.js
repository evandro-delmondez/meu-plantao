/* ---------- tabs ---------- */
const TABS=["prescricoes","medicacoes","pediatria","feridas","evolucao","atestado","escores","calculadora","modelos","backup"];
function setTab(t){
  ui.tab=t;
  $$(".tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===t));
  TABS.forEach(x=>$("#tab-"+x).hidden=x!==t);
  if(t==="evolucao") renderEv(); if(t==="atestado") renderAt(); if(t==="calculadora") renderCalc(); if(t==="pediatria") setPMode(ui.pmode||"rx"); if(t==="modelos"){renderModelos();renderOrg()} if(t==="feridas") renderFer(); if(t==="medicacoes") renderMedTab();
  if(t==="escores") renderScores(); growAll();
  try{history.replaceState(null,"","#"+t)}catch(e){}
}
$$(".tabs button").forEach(b=>b.onclick=()=>setTab(b.dataset.tab));

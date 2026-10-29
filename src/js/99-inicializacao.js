/* ---------- boot ----------
   Fica por último (99): a primeira aba aberta (pelo endereço, ex.: #plantoes) pode usar qualquer arquivo anterior. */
if(ui.cat==="__gest") ui.cat=null;
applyOrg();
renderCats(); fillSelects();
if(!getItem(ui.sel)) ui.sel=BASE[0].id;
renderList(); renderDetail();
$("#pdPeso").value=ui.pdPeso; $("#pdAnos").value=ui.pdAnos; $("#pdMeses").value=ui.pdMeses;
atdSessaoLe(); renderEv(); renderAt(); refreshSync();
const h=(location.hash||"").slice(1); setTab(TABS.includes(h)?h:"inicio");
if(matchMedia("(max-width:860px)").matches) $("#tab-prescricoes").classList.remove("show-detail"); else $("#tab-prescricoes").classList.add("show-detail");
saveUI(); saveMui(); // regrava sem os campos de paciente de versões antigas
initCloud();
// voltar/avançar do navegador e links com #aba trocam a tela
addEventListener("hashchange",()=>{const h=(location.hash||"").slice(1);if(TABS.includes(h)&&h!==ui.tab)setTab(h)});

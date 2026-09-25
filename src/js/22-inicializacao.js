/* ---------- boot ---------- */
if(ui.cat==="__gest") ui.cat=null;
applyOrg();
renderCats(); fillSelects();
if(!getItem(ui.sel)) ui.sel=BASE[0].id;
renderList(); renderDetail();
$("#pdPeso").value=ui.pdPeso; $("#pdAnos").value=ui.pdAnos; $("#pdMeses").value=ui.pdMeses;
renderEv(); renderAt(); refreshSync();
const h=(location.hash||"").slice(1); if(TABS.includes(h)) setTab(h);
if(matchMedia("(max-width:860px)").matches) $("#tab-prescricoes").classList.remove("show-detail"); else $("#tab-prescricoes").classList.add("show-detail");
initCloud();

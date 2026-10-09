/* ---------- CIATox a um toque: Disque-Intoxicação nacional + CIATox local salvo no aparelho ---------- */
const DISQUE_INTOX={rot:"Disque-Intoxicação 0800 722 6001",tel:"08007226001"};
const telLimpo=t=>String(t||"").replace(/[^\d+]/g,"");
function ciatoxHTML(){
  const c=ui.ciatox||{}, temLocal=telLimpo(c.tel).length>=8;
  return `<div class="ciatox"><a class="btn primary" href="tel:${DISQUE_INTOX.tel}">📞 ${esc(DISQUE_INTOX.rot)}</a>
    ${temLocal?`<a class="btn" href="tel:${esc(telLimpo(c.tel))}">📞 ${esc(c.nome||"CIATox local")} · ${esc(c.tel)}</a>`:""}
    <button class="btn sm" data-ciatox-ed>${temLocal?"Editar CIATox local":"Salvar o CIATox da minha região"}</button>
    <div class="ciatoxed" hidden><label class="f">Nome<input class="inp" data-cx="nome" value="${esc(c.nome||"")}" placeholder="ex.: CIATox Campinas"></label>
      <label class="f">Telefone<input class="inp" data-cx="tel" inputmode="tel" value="${esc(c.tel||"")}" placeholder="ex.: 0800 ..."></label>
      <button class="btn sm primary" data-ciatox-salva>Salvar no aparelho</button></div></div>`;
}
function bindCiatox(root){
  if(!root) return;
  root.querySelectorAll("[data-ciatox-ed]").forEach(b=>b.onclick=()=>{const f=b.parentElement.querySelector(".ciatoxed");f.hidden=!f.hidden});
  root.querySelectorAll("[data-ciatox-salva]").forEach(b=>b.onclick=()=>{
    const f=b.closest(".ciatoxed"); ui.ciatox={nome:f.querySelector('[data-cx="nome"]').value.trim(),tel:f.querySelector('[data-cx="tel"]').value.trim()};
    saveUI(); toast("CIATox salvo neste aparelho"); const box=b.closest(".ciatox"); box.outerHTML=ciatoxHTML(); bindCiatox(root);
  });
}

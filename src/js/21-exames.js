/* ---------- exames e encaminhamento na porta: encaminhar · pedir quando · não pedir (dados em src/data/exames.js) ---------- */
const EX_GRUPOS=[["encaminhar","Encaminhar"],["pedir","Pedir quando"],["naoPedir","Não pedir"],["div","Divergências entre fontes (você decide)"]];
const exDe=chave=>(typeof EXAMES!=="undefined"&&EXAMES[chave])||null;
function exHTML(chave,{aberto=false,titulo="Exames e encaminhamento"}={}){
  const e=exDe(chave); if(!e) return "";
  const li=x=>`<li>${esc(x.t)} <sup class="exf" title="Fonte ${x.f.join(", ")}">${x.f.join(",")}</sup></li>`;
  return `<details class="sec exames" ${aberto?"open":""}><summary class="sec-h"><h3>${esc(titulo)}</h3><span class="alsum">encaminhar · pedir · não pedir</span></summary>
    <div class="exbody">${EX_GRUPOS.filter(([g])=>(e[g]||[]).length).map(([g,r])=>`<div class="exg exg-${g}"><h4>${r}</h4><ul>${e[g].map(li).join("")}</ul></div>`).join("")}
    <details class="alsrc"><summary>Fontes</summary><ol>${e.fontes.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details></div></details>`;
}

/* ---------- exames e encaminhamento na porta: encaminhar · pedir quando · não pedir (dados em src/data/exames.js) ---------- */
const EX_GRUPOS=[["encaminhar","Encaminhar"],["pedir","Pedir quando"],["naoPedir","Não pedir"],["div","Divergências entre fontes (você decide)"]];
const exDe=chave=>(typeof EXAMES!=="undefined"&&EXAMES[chave])||null;
// nome do exame no início do item ("TC de crânio sem contraste: …"): é o que vai para o pedido
const exNome=t=>{const m=String(t).match(/^([^:]{3,90}):\s/);return m?m[1].trim():""};
// imagem × laboratório, para cair no campo certo do pedido
const exImagem=n=>/\b(TC|tomografia|RX|radiografia|raio|US|ultrass|ecograf|angio|RM|resson|doppler|ecocardio|cintilog|ECG|eletrocardio)/i.test(n);
function exHTML(chave,{aberto=false,titulo="Exames e encaminhamento",pedir=false}={}){
  const e=exDe(chave); if(!e) return "";
  const li=(x,g)=>{const n=g==="pedir"&&pedir?exNome(x.t):"";const ja=n&&[...atItens(atd.exLab),...atItens(atd.exImg)].some(y=>norm(y)===norm(n));
    return `<li>${n?`<button class="expedir" data-expedir="${esc(n)}" aria-pressed="${ja}">${ja?"✓ pedido":"+ pedir"}</button> `:""}${esc(x.t)} <sup class="exf" title="Fonte ${x.f.join(", ")}">${x.f.join(",")}</sup></li>`};
  return `<details class="sec exames" ${aberto?"open":""}><summary class="sec-h"><h3>${esc(titulo)}</h3><span class="alsum">encaminhar · pedir · não pedir</span></summary>
    <div class="exbody">${EX_GRUPOS.filter(([g])=>(e[g]||[]).length).map(([g,r])=>`<div class="exg exg-${g}"><h4>${r}</h4><ul>${e[g].map(x=>li(x,g)).join("")}</ul></div>`).join("")}
    <details class="alsrc"><summary>Fontes</summary><ol>${e.fontes.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details></div></details>`;
}

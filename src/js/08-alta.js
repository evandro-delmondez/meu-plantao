/* ---------- alta segura: orientação leiga para imprimir ou abrir pelo QR code (sem dado do paciente) ---------- */
const SITE_URL="https://evandro-delmondez.github.io/meu-plantao/";
const altaLink=id=>SITE_URL+"alta.html#"+encodeURIComponent(id);
function altaHTML(a){
  const lista=l=>`<ul>${l.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
  return `<p class="altaoque">${esc(a.oque)}</p><h4>O que fazer em casa</h4>${lista(a.cuidados)}<div class="altavolte"><h4>Volte ao pronto-socorro se</h4>${lista(a.volte)}</div>`;
}
function renderAltaPac(it){
  const a=ALTA[it.id]; if(!a) return "";
  return `<details class="sec altapac"><summary class="sec-h"><h3>Alta para o paciente</h3><span class="alsum">linguagem simples · imprimir ou QR code</span></summary>
    <div class="altabody">${altaHTML(a)}
      <div class="actions"><button class="btn primary" id="altaImp">Imprimir</button><button class="btn" id="altaQr">QR code</button></div>
      <p class="note">Sem dados do paciente: o QR abre esta mesma orientação no celular dele.</p>
      <details class="fontes"><summary>Fontes</summary><ol>${a.fontes.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details></div></details>`;
}
function altaImprimir(a){
  let el=$("#impressao"); if(!el){el=document.createElement("div");el.id="impressao";document.body.append(el)}
  el.innerHTML=`<p class="impmarca">Orientações de alta</p><h1>${esc(a.titulo)}</h1>${altaHTML(a)}
    <p class="impaviso">Esta é uma orientação geral. Tome os remédios como está na sua receita e siga o que o seu médico explicou.</p>`;
  document.body.classList.add("imprimindo");
  const fim=()=>{document.body.classList.remove("imprimindo");removeEventListener("afterprint",fim)};
  addEventListener("afterprint",fim); window.print(); setTimeout(fim,1500);
}
function altaQr(it){
  const a=ALTA[it.id], url=altaLink(it.id);
  const q=qrcode(0,"M"); q.addData(url); q.make();
  let sh=$("#qrSheet");
  if(!sh){sh=document.createElement("div");sh.id="qrSheet";sh.className="msheet";sh.hidden=true;document.body.append(sh);
    sh.addEventListener("click",e=>{if(e.target.closest("[data-fechar]")){sh.hidden=true;document.body.classList.remove("sheet-on")}})}
  sh.innerHTML=`<div class="msheet-bg" data-fechar></div><div class="msheet-box qrbox" role="dialog" aria-modal="true" aria-label="QR code da orientação">
    <div class="msheet-top"><button class="btn sm" data-fechar>✕ Fechar</button></div>
    <div class="qrcorpo"><h3>${esc(a.titulo)}</h3><div class="qrimg">${q.createSvgTag({cellSize:8,margin:3,scalable:true})}</div>
    <p class="note">Peça ao paciente para apontar a câmera do celular. Abre só a orientação, sem dados pessoais.</p></div></div>`;
  sh.hidden=false; document.body.classList.add("sheet-on");
}
function bindAltaPac(it){
  if(!ALTA[it.id]||!$("#altaImp")) return;
  $("#altaImp").onclick=()=>altaImprimir(ALTA[it.id]);
  $("#altaQr").onclick=()=>altaQr(it);
}

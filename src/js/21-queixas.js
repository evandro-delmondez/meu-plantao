/* ---------- por queixa (porta): sinais de alarme primeiro, depois o caminho até a conduta ---------- */
let qSel=null; // só nesta sessão
function renderQueixas(){
  if(!QUEIXAS.length){$("#qLista").innerHTML="";$("#qCorpo").innerHTML=`<div class="panel card"><p class="note">Conteúdo em preparação.</p></div>`;return}
  const q=QUEIXAS.find(x=>x.id===qSel)||QUEIXAS[0]; qSel=q.id;
  $("#qLista").innerHTML=QUEIXAS.map(x=>`<button class="chip" data-q="${esc(x.id)}" aria-pressed="${x.id===q.id}" style="--c:var(--${x.cor||"slate"})">${esc(x.nome)}</button>`).join("");
  $$("#qLista [data-q]").forEach(b=>b.onclick=()=>{qSel=b.dataset.q;renderQueixas();window.scrollTo({top:0})});
  const caminho=c=>c.conduta&&getItem(c.conduta)
    ?`<button class="qcam" data-qc="${esc(c.conduta)}"><span>${esc(c.rot)}</span><span class="qir">abrir →</span></button>`
    :`<div class="qcam semlink"><span>${esc(c.rot)}</span></div>`;
  $("#qCorpo").innerHTML=`
    <div class="sec alarmetopo qalarme"><div class="sec-h"><h3>Sinais de alarme: não é verde</h3></div>
      <ul class="qal">${q.alarme.map(a=>`<li><b>${esc(a.t)}</b><span>${esc(a.acao)}</span></li>`).join("")}</ul></div>
    ${(q.perguntar||[]).length?`<div class="sec"><div class="sec-h"><h3>Perguntar e examinar</h3></div><ul class="qlist">${q.perguntar.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}
    ${(q.caminhos||[]).length?`<div class="sec"><div class="sec-h"><h3>Caminhos</h3><span class="alsum">sem sinal de alarme</span></div><div class="qcams">${q.caminhos.map(caminho).join("")}</div></div>`:""}
    ${(q.escores||[]).length?`<div class="sec"><div class="sec-h"><h3>Escores úteis</h3></div><ul class="qlist">${q.escores.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}
    <details class="sec fontes"><summary class="sec-h"><h3>Fontes</h3></summary><ol>${q.fontes.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details>`;
  $$("#qCorpo [data-qc]").forEach(b=>b.onclick=()=>abrirConduta(b.dataset.qc));
  linkMeds($("#qCorpo"));
}

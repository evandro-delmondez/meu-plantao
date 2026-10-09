/* ---------- cartão "Agora": primeiros minutos da emergência, com doses prontas pelo peso ---------- */
// o peso é o mesmo de "Dados do paciente" (pac.peso), só na memória da aba (regra 5)
const agoraPeso=()=>{const p=parseFloat(String(pac.peso||"").replace(",","."));return p>0&&p<300?p:null};
// dose pela faixa de peso da bula: [[limite em kg (exclusivo), dose], ..., [null, dose]]
const agoraFaixa=(d,p)=>{for(const [ate,v] of d.faixas) if(ate==null||p<ate) return v};
function agoraDose(d){
  const p=agoraPeso(); if(!d||!p) return "";
  const nf=n=>n.toLocaleString("pt-BR",{maximumFractionDigits:n<10?2:n<100?1:0});
  const ml=v=>d.conc&&d.un!=="mL"?` = ${nf(v/d.conc)} mL`:"";
  const fx=d.faixas?agoraFaixa(d,p):null;
  if(!d.porKg&&fx!=null&&d.metadeIdade){   // ex.: tenecteplase no IAM: metade da dose a partir de 75 anos (ESC 2023)
    const id=parseFloat(String(pac.idade||"").replace(",",".")), meia=`<b>${nf(fx/2)} ${esc(d.un)}${ml(fx/2)}</b>`;
    if(id>=d.metadeIdade) return `${meia} <span class="teto">metade (≥ ${d.metadeIdade} anos)</span>`;
    return `<b>${nf(fx)} ${esc(d.un)}${ml(fx)}</b> <span class="teto">faixa da bula</span> · ≥ ${d.metadeIdade} anos: ${meia}`;
  }
  if(!d.porKg) return fx!=null?`<b>${nf(fx)} ${esc(d.un)}${ml(fx)}</b> <span class="teto">faixa da bula</span>`:"";
  let v=d.porKg*p,teto=false;
  if(d.max!=null&&v>d.max){v=d.max;teto=true}
  if(d.min!=null&&v<d.min) v=d.min;
  return `<b>${nf(v)} ${esc(d.un)}${ml(v)}</b>${teto?` <span class="teto">dose máxima</span>`:""}${fx!=null?` · faixa da bula: <b>${nf(fx)} ${esc(d.un)}${ml(fx)}</b>`:""}`;
}
function renderAgora(it){
  const a=AGORA[it.id]; if(!a) return "";
  const temKg=a.etapas.some(e=>e.acoes.some(x=>x.dose&&(x.dose.porKg||x.dose.faixas)));
  const atalho=(s,i)=>`<button class="btn sm ${i?"":"primary"}" data-ag="${i}">${esc(s.rot)}</button>`;
  return `<section class="sec agora"><div class="sec-h"><h3>Agora</h3>
      ${temKg?`<label class="f agpeso">Peso (kg)<input class="inp" id="agPeso" type="number" inputmode="decimal" min="1" max="300" value="${esc(String(pac.peso||""))}" placeholder="kg"></label>`:""}</div>
    <p class="agquando">${esc(a.quando)}</p>
    ${a.alerta?`<p class="agalerta">${esc(a.alerta)}</p>`:""}
    <ol class="agetapas">${a.etapas.map((e,ei)=>`<li><span class="agt">${esc(e.t)}</span><ul>${e.acoes.map((x,ai)=>`<li>${esc(x.txt)}${x.dose?` <span class="agcalc" data-k="${ei}-${ai}">${agoraDose(x.dose)}</span> <span class="agref">${esc(x.dose.ref)}</span>`:""}${x.mais?`<details class="agmais"><summary>detalhes</summary><p>${esc(x.mais)}</p></details>`:""}</li>`).join("")}</ul></li>`).join("")}</ol>
    ${(a.atalhos||[]).length?`<div class="actions agatalhos">${a.atalhos.map(atalho).join("")}</div>`:""}
    <p class="note">Doses para adulto${temKg?" com o peso informado (não fica salvo)":""}. Confira a referência ao lado de cada dose antes de administrar.</p>
    <details class="fontes"><summary>Fontes do cartão</summary><ol>${a.fontes.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details></section>`;
}
function bindAgora(it){
  const a=AGORA[it.id]; if(!a) return;
  const pi=$("#agPeso");
  if(pi) pi.addEventListener("input",()=>{
    pac.peso=pi.value; if($("#pcPeso")) $("#pcPeso").value=pi.value;
    $$("#detail .agcalc").forEach(s=>{const [ei,ai]=s.dataset.k.split("-").map(Number);s.innerHTML=agoraDose(a.etapas[ei].acoes[ai].dose)});
  });
  $$("#detail [data-ag]").forEach(b=>b.onclick=()=>{
    const s=a.atalhos[+b.dataset.ag];
    if(s.protocolo){prIniciar(s.protocolo);setTab("protocolos")}
    else if(s.bic) abrirBic(s.bic);
    else if(s.aba) setTab(s.aba);
  });
}

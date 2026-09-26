/* ---------- calculadora ---------- */
const r1=x=>Math.round(x*10)/10;
const fmt=x=>r1(x).toLocaleString("pt-BR",{maximumFractionDigits:1});
function calcRow(x,p){
  let lo,hi,capped=false;
  if(typeof x.perkg==="function"){lo=hi=x.perkg(p)} else {lo=x.perkg[0]*p;hi=x.perkg[1]*p}
  if(x.max){if(hi>x.max){capped=true} lo=Math.min(lo,x.max);hi=Math.min(hi,x.max)}
  let big,small="",obs=x.obs||"";
  const rng=(a,b,f=fmt)=>Math.abs(a-b)<1e-9?f(a):f(a)+"–"+f(b);
  if(x.parkland){const scq=parseFloat(String($("#scq").value).replace(",","."))||0;const a=x.parkland[0]*p*scq,b=x.parkland[1]*p*scq;return `<div class="drug"><b>${esc(x.nome)}</b><span class="rule">${esc(x.regra)} (SCQ ${fmt(scq)}%)</span><span class="res"><span class="ml">${rng(a,b)} mL/24h</span><span class="mg">1ª 8h: ${rng(a/2,b/2)} mL</span></span></div>`}
  if(x.jatos){big=lo+" jatos"}
  else if(x.fixedtxt){big=x.fixedtxt}
  else if(x.ui){big=rng(lo/x.conc,hi/x.conc)+" mL";small=rng(lo,hi)+" UI"}
  else if(x.mgonly){big=rng(lo,hi)+" mg"}
  else if(x.gonly){big=rng(lo,hi)+" g"}
  else if(x.uh){big=fmt(lo)+" U/h";small="EHH: "+fmt(lo/2)+" U/h"}
  else if(x.alteplase){big=fmt(lo)+" mg";small="bolus "+fmt(lo*0.1)+" mg + "+fmt(lo*0.9)+" mg em 60 min"}
  else if(x.ivermectina){ // tabela da bula (6 mg): 15–24 kg ½; 25–35 1; 36–50 1½; 51–65 2; 66–79 2½; ≥ 80 kg 200 mcg/kg
    if(p<15){big="Não indicado";small="bula: abaixo de 15 kg não usar"}
    else{const cp=p<25?0.5:p<36?1:p<51?1.5:p<66?2:p<80?2.5:Math.round(p*0.2/6*2)/2;big=fmt(cp)+" cp";small=fmt(cp*6)+" mg"}}
  else if(x.hs){big=fmt(lo)+" mL/dia";small=fmt(lo/24)+" mL/h"}
  else if(x.vol){big=rng(lo,hi)+" "+(x.dia?"mL/dia":x.perh?"mL/h":"mL");if(x.dia) small="≈ "+fmt(lo/1000)+" L/dia"}
  else if(x.fixed){big=fmt(lo/x.conc)+" mL";small=fmt(lo)+" mg"}
  else{
    const u=x.unit;
    big=rng(lo/x.conc,hi/x.conc)+" mL";
    small=rng(lo,hi)+" "+u;
    if(x.gotas) small+=" · "+rng(Math.round(lo/x.conc*x.gotas),Math.round(hi/x.conc*x.gotas),v=>String(v))+" gotas";
    if(x.rate){const r=x.ratekg?Math.min(x.ratekg*p,x.rate):x.rate;obs=(obs?obs+" ":"")+"Infundir em ≥ "+Math.ceil(hi/r)+" min."}
  }
  if(capped) obs=(obs?obs+" ":"")+"Dose máxima atingida.";
  return `<div class="drug"><b>${esc(x.nome)}</b><span class="rule">${esc(x.regra)}</span><span class="res"><span class="ml">${big}</span><span class="mg">${small}</span></span>${obs?`<span class="obs">${esc(obs)}</span>`:""}</div>`;
}
function renderCalc(){
  $$("[data-modo]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.modo===ui.modo));
  const p=parseFloat(String($("#peso").value).replace(",","."));
  if(!(p>0)){$("#cgroups").innerHTML=`<div class="empty">Digite o peso.</div>`;return}
  $("#cgroups").innerHTML=CALC[ui.modo].map(g=>`<div class="sec cg" style="--c:var(--${g.c})"><div class="sec-h"><h3>${esc(g.t)}</h3></div>${g.d.map(x=>calcRow(x,p)).join("")}<details class="alsrc cgsrc"><summary>Fontes</summary><ol>${g.src.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details></div>`).join("");
}
$("#peso").value=ui.peso;
$("#peso").addEventListener("input",()=>{ui.peso=$("#peso").value;saveUI();renderCalc()});
$("#scq").addEventListener("input",renderCalc);
$$("[data-modo]").forEach(b=>b.onclick=()=>{ui.modo=b.dataset.modo;if(ui.modo==="ped"&&parseFloat($("#peso").value)>=50){$("#peso").value=20;ui.peso=20}if(ui.modo==="adulto"&&parseFloat($("#peso").value)<40){$("#peso").value=70;ui.peso=70}saveUI();renderCalc()});

/* ---------- calculadora ---------- */
const r1=x=>Math.round(x*10)/10;
const fmt=x=>r1(x).toLocaleString("pt-BR",{maximumFractionDigits:1});
// d(nome, regra, mgPerKg[min,max] or fn, conc mg/mL, opts)
function D(nome,regra,unit,perkg,conc,o={}){return {nome,regra,unit,perkg,conc,...o}}
const CALC={
adulto:[
 {t:"IOT — sequência rápida",c:"red",d:[
  D("Fentanil 50 mcg/mL","2 mcg/kg (1–3)","mcg",[2,2],50),
  D("Etomidato 2 mg/mL","0,3 mg/kg","mg",[0.3,0.3],2),
  D("Cetamina 50 mg/mL","1,5 mg/kg (1–2)","mg",[1.5,1.5],50),
  D("Propofol 10 mg/mL","1,5 mg/kg (1–2)","mg",[1.5,1.5],10,{obs:"Evitar se hipotensão."}),
  D("Midazolam 5 mg/mL","0,2 mg/kg (0,1–0,3)","mg",[0.2,0.2],5),
  D("Succinilcolina 100 mg + 10 mL AD","1,5 mg/kg → 10 mg/mL","mg",[1.5,1.5],10),
  D("Rocurônio 10 mg/mL","1,2 mg/kg","mg",[1.2,1.2],10)]},
 {t:"Crise convulsiva",c:"amber",d:[
  D("Diazepam 5 mg/mL EV","0,15–0,2 mg/kg (máx. 10 mg)","mg",[0.15,0.2],5,{max:10}),
  D("Midazolam 5 mg/mL IM","> 40 kg: 10 mg | 13–40 kg: 5 mg","mg",p=>p>40?10:5,5,{fixed:true}),
  D("Fenitoína 50 mg/mL","20 mg/kg em SF 0,9%, até 50 mg/min","mg",[20,20],50,{rate:50}),
  D("Levetiracetam 100 mg/mL","60 mg/kg (máx. 4.500 mg) em 15 min","mg",[60,60],100,{max:4500}),
  D("Ácido valproico 100 mg/mL","40 mg/kg (máx. 3.000 mg) em 10 min","mg",[40,40],100,{max:3000}),
  D("Fenobarbital 100 mg/mL","20 mg/kg, até 50–100 mg/min","mg",[20,20],100,{rate:75})]},
 {t:"Sepse, SCA e AVC",c:"violet",d:[
  D("Cristaloide na sepse (hipoperfusão)","30 mL/kg nas primeiras 3h","mL",[30,30],1,{vol:true}),
  D("Heparina não fracionada 5.000 UI/mL (SCA)","60 UI/kg em bolus (máx. 4.000 UI)","UI",[60,60],5000,{max:4000,ui:true}),
  D("Enoxaparina (SCA/TEP)","1 mg/kg SC de 12/12h","mg",[1,1],1,{mgonly:true,obs:"Ajustar se ClCr < 30."}),
  D("Tenecteplase — AVC isquêmico","0,25 mg/kg em bolus (máx. 25 mg)","mg",[0.25,0.25],5,{max:25}),
  D("Alteplase — AVC isquêmico (1 mg/mL)","0,9 mg/kg (máx. 90 mg): 10% em bolus, resto em 60 min","mg",[0.9,0.9],1,{max:90,alteplase:true}),
  D("Tenecteplase — IAMCSST","faixas de peso da bula","mg",p=>p<60?30:p<70?35:p<80?40:p<90?45:50,5,{fixed:true})]},
 {t:"Arritmias e endócrino",c:"orange",d:[
  D("Diltiazem 5 mg/mL (FA)","0,25 mg/kg EV em 2 min","mg",[0.25,0.25],5),
  D("Lidocaína 2% (20 mg/mL) — PCR","1–1,5 mg/kg; 2ª dose 0,5–0,75 mg/kg","mg",[1,1.5],20),
  D("Insulina regular — CAD grave","0,1 U/kg/h (EHH: 0,05 U/kg/h)","U/h",[0.1,0.1],1,{uh:true}),
  D("Parkland — queimaduras (Ringer lactato)","2–4 mL × kg × % SCQ em 24h","mL",[0,0],1,{parkland:[2,4]})]},
 {t:"Anafilaxia e choque",c:"pink",d:[
  D("Adrenalina 1 mg/mL IM","0,01 mg/kg (máx. 0,5 mg)","mg",[0.01,0.01],1,{max:0.5}),
  D("SF 0,9% bolus","20 mL/kg","mL",[20,20],1,{vol:true})]},
 {t:"Outros",c:"teal",d:[
  D("Ivermectina 6 mg (cp)","200 mcg/kg VO, dose única","cp",p=>p*0.2,6,{tabs:true}),
  D("Carvão ativado","adulto 25–100 g, dose única até 1h da ingestão","g",p=>25,1,{fixedtxt:"25–100 g"}),
  D("Dengue grupo A — hidratação oral","60 mL/kg/dia","mL/dia",[60,60],1,{vol:true,dia:true}),
  D("Dengue grupo C — SF 0,9%","10 mL/kg/h na 1ª e na 2ª hora (máx. 20 mL/kg em 2h)","mL/h",[10,10],1,{vol:true,perh:true}),
  D("Dengue grupo D — SF 0,9%","20 mL/kg em 20 min (até 3x)","mL",[20,20],1,{vol:true})]}
],
ped:[
 {t:"Analgésicos e antitérmicos",c:"sky",d:[
  D("Dipirona gotas 500 mg/mL","10–12 mg/kg/dose 6/6h (SBP 2021; máx. 1 g)","mg",[10,12],500,{max:1000,gotas:20,obs:"\"1 gota/kg\" leva a superdosagem (SBP)."}),
  D("Paracetamol gotas 200 mg/mL","10–15 mg/kg/dose 6/6h (máx. 750 mg)","mg",[10,15],200,{max:750,gotas:20}),
  D("Ibuprofeno 50 mg/mL","5–10 mg/kg/dose 8/8h (máx. 400 mg)","mg",[5,10],50,{max:400,obs:"Gotas por mL variam entre marcas: prescreva em mL."})]},
 {t:"Antibióticos (dose por tomada)",c:"violet",d:[
  D("Amoxicilina 250 mg/5 mL","50 mg/kg/dia ÷ 8/8h","mg",[50/3,50/3],50,{max:500}),
  D("Amoxicilina 400 mg/5 mL (OMA)","80–90 mg/kg/dia ÷ 12/12h","mg",[40,45],80,{max:1500}),
  D("Amoxi + Clav 400/57 por 5 mL","50 mg/kg/dia (amoxi) ÷ 12/12h","mg",[25,25],80,{max:875}),
  D("Cefalexina 250 mg/5 mL","50 mg/kg/dia ÷ 6/6h","mg",[12.5,12.5],50,{max:1000}),
  D("Azitromicina 200 mg/5 mL","10 mg/kg 1x/dia (máx. 500 mg)","mg",[10,10],40,{max:500})]},
 {t:"Respiratório e alergia",c:"green",d:[
  D("Prednisolona 3 mg/mL","1–2 mg/kg/dia 1x (máx. 40 mg)","mg",[1,2],3,{max:40}),
  D("Dexametasona 4 mg/mL (crupe)","0,6 mg/kg dose única (máx. 10 mg)","mg",[0.6,0.6],4,{max:10}),
  D("Salbutamol 100 mcg spray","1 jato a cada 3 kg (4 a 10) de 20/20 min","jatos",p=>Math.min(10,Math.max(4,Math.round(p/3))),1,{jatos:true}),
  D("Hidroxizina 2 mg/mL","0,5 mg/kg/dose 8/8h (máx. 25 mg)","mg",[0.5,0.5],2,{max:25}),
  D("Ondansetrona 2 mg/mL (EV/IM)","0,15 mg/kg (máx. 4 mg)","mg",[0.15,0.15],2,{max:4})]},
 {t:"Hidratação e queimaduras",c:"teal",d:[
  D("Plano B — SRO","50–100 mL/kg em 4–6h","mL",[50,100],1,{vol:true}),
  D("Plano C — fase rápida (< 1 ano)","30 mL/kg em 1h, depois 70 mL/kg em 5h","mL",[30,30],1,{vol:true}),
  D("Plano C — fase rápida (≥ 1 ano)","30 mL/kg em 30 min, depois 70 mL/kg em 2h30","mL",[30,30],1,{vol:true}),
  D("Parkland pediátrico (Ringer lactato)","4 mL × kg × % SCQ em 24h","mL",[0,0],1,{parkland:[4,4]}),
  D("Carvão ativado","0,5–1 g/kg (até 1h da ingestão)","g",[0.5,1],1,{gonly:true}),
  D("Adrenalina 1 mg/mL nebulizada (crupe)","0,5 mL/kg (máx. 5 mL)","mL",[0.5,0.5],1,{vol:true,max:5})]},
 {t:"Emergência pediátrica",c:"red",d:[
  D("Adrenalina 1 mg/mL IM","0,01 mg/kg (máx. 0,3 mg; adolescente 0,5)","mg",[0.01,0.01],1,{max:0.3}),
  D("Diazepam 5 mg/mL EV","0,2 mg/kg (máx. 10 mg)","mg",[0.2,0.2],5,{max:10}),
  D("Diazepam 5 mg/mL retal","0,5 mg/kg (máx. 20 mg)","mg",[0.5,0.5],5,{max:20}),
  D("Midazolam 5 mg/mL IM/intranasal","0,2 mg/kg (máx. 10 mg)","mg",[0.2,0.2],5,{max:10}),
  D("Fenitoína 50 mg/mL","20 mg/kg, até 1 mg/kg/min","mg",[20,20],50,{max:1500}),
  D("SF 0,9% bolus","20 mL/kg","mL",[20,20],1,{vol:true}),
  D("Glicose 10%","2 a 4 mL/kg (hipoglicemia)","mL",[2,4],1,{vol:true}),
  D("Soro de manutenção (Holliday-Segar)","100/50/20 mL/kg","mL/dia",p=>p<=10?p*100:p<=20?1000+(p-10)*50:1500+(p-20)*20,1,{hs:true})]}
]};
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
  else if(x.tabs){const cp=Math.max(0.5,Math.round(lo/6*2)/2);big=fmt(cp)+" cp";small=fmt(lo)+" mg"}
  else if(x.hs){big=fmt(lo)+" mL/dia";small=fmt(lo/24)+" mL/h"}
  else if(x.vol){big=rng(lo,hi)+" "+(x.dia?"mL/dia":x.perh?"mL/h":"mL");if(x.dia) small="≈ "+fmt(lo/1000)+" L/dia"}
  else if(x.fixed){big=fmt(lo/x.conc)+" mL";small=fmt(lo)+" mg"}
  else{
    const u=x.unit;
    big=rng(lo/x.conc,hi/x.conc)+" mL";
    small=rng(lo,hi)+" "+u;
    if(x.gotas) small+=" · "+rng(Math.round(lo/x.conc*x.gotas),Math.round(hi/x.conc*x.gotas),v=>String(v))+" gotas";
    if(x.rate) obs=(obs?obs+" ":"")+"Infundir em ≥ "+Math.ceil(hi/x.rate)+" min.";
  }
  if(capped) obs=(obs?obs+" ":"")+"Dose máxima atingida.";
  return `<div class="drug"><b>${esc(x.nome)}</b><span class="rule">${esc(x.regra)}</span><span class="res"><span class="ml">${big}</span><span class="mg">${small}</span></span>${obs?`<span class="obs">${esc(obs)}</span>`:""}</div>`;
}
function renderCalc(){
  $$("[data-modo]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.modo===ui.modo));
  const p=parseFloat(String($("#peso").value).replace(",","."));
  if(!(p>0)){$("#cgroups").innerHTML=`<div class="empty">Digite o peso.</div>`;return}
  $("#cgroups").innerHTML=CALC[ui.modo].map(g=>`<div class="sec cg" style="--c:var(--${g.c})"><div class="sec-h"><h3>${g.t}</h3></div>${g.d.map(x=>calcRow(x,p)).join("")}</div>`).join("");
}
$("#peso").value=ui.peso;
$("#peso").addEventListener("input",()=>{ui.peso=$("#peso").value;saveUI();renderCalc()});
$("#scq").addEventListener("input",renderCalc);
$$("[data-modo]").forEach(b=>b.onclick=()=>{ui.modo=b.dataset.modo;if(ui.modo==="ped"&&parseFloat($("#peso").value)>=50){$("#peso").value=20;ui.peso=20}if(ui.modo==="adulto"&&parseFloat($("#peso").value)<40){$("#peso").value=70;ui.peso=70}saveUI();renderCalc()});

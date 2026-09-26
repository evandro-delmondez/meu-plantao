/* ---------- bomba de infusão ---------- */
// peso e dose ficam só na memória da aba (regra 5)
const bic={id:INFUSAO[0].id,dil:0,peso:"",dose:"",mlh:"",ult:"dose",qtd:"",vol:""};
const numBr=v=>{const n=parseFloat(String(v==null?"":v).replace(",","."));return isFinite(n)?n:NaN};
const fmtN=(x,d=2)=>(Math.round(x*10**d)/10**d).toLocaleString("pt-BR",{maximumFractionDigits:d});
const bicDroga=()=>INFUSAO.find(x=>x.id===bic.id)||INFUSAO[0];
function bicConc(d){
  if(bic.dil==="c"){const q=numBr(bic.qtd),v=numBr(bic.vol);return q>0&&v>0?q/v:NaN}
  const x=d.dil[bic.dil]||d.dil[0]; return x.qtd/x.vol;
}
// mL/h = dose × fator ÷ concentração
function bicFator(d){const p=numBr(bic.peso);if(d.porKg&&!(p>0))return NaN;return (d.porKg?p:1)*(d.porMin?60:1)}
const bicMlh=(d,dose)=>dose*bicFator(d)/bicConc(d);
function bicCalc(){
  const d=bicDroga(), c=bicConc(d), f=bicFator(d);
  $("#bicConc").textContent=c>0?`Concentração: ${fmtN(c,3)} ${d.base}/mL`:"Informe a quantidade e o volume da diluição.";
  const res=$("#bicRes");
  if(!(c>0)){res.innerHTML="Informe a diluição.";return}
  if(!(f>0)){res.innerHTML="Informe o peso para calcular a vazão.";return}
  let dose, mlh;
  if(bic.ult==="dose"){dose=numBr(bic.dose);mlh=dose*f/c;$("#bicMlh").value=dose>=0&&isFinite(mlh)?String(Math.round(mlh*10)/10):""}
  else{mlh=numBr(bic.mlh);dose=mlh*c/f;$("#bicDose").value=mlh>=0&&isFinite(dose)?String(Math.round(dose*1000)/1000):""}
  if(!(dose>=0&&mlh>=0)){res.innerHTML="Digite a dose ou a vazão.";return}
  const fora=d.faixa&&(dose<d.faixa[0]-1e-9||dose>d.faixa[1]+1e-9);
  res.innerHTML=`<b>${fmtN(mlh,1)} mL/h</b> = ${fmtN(dose,3)} ${d.un}${fora?`<br><span class="warn">Fora da faixa de referência (${fmtN(d.faixa[0],3)}–${fmtN(d.faixa[1],3)} ${d.un}).</span>`:""}`;
}
function bicTabela(d){
  if(!d.faixa||!(bicFator(d)>0)||!(bicConc(d)>0)) return "";
  const [a,b]=d.faixa; const pts=a===b?[a]:[0,1,2,3,4].map(i=>a+(b-a)*i/4);
  return `<table class="ftbl"><thead><tr><th>Dose (${d.un})</th><th>Vazão</th></tr></thead><tbody>${pts.map(x=>`<tr><td>${fmtN(x,3)}</td><td><b>${fmtN(bicMlh(d,x),1)} mL/h</b></td></tr>`).join("")}</tbody></table>`;
}
function renderBic(){
  const d=bicDroga();
  const grupos=[...new Set(INFUSAO.map(x=>x.grupo))];
  $("#bicDrogas").innerHTML=grupos.map(g=>`<div class="bicg"><span class="lbl">${esc(g)}</span>${INFUSAO.filter(x=>x.grupo===g).map(x=>`<button class="chip" data-bic="${x.id}" aria-pressed="${x.id===d.id}" style="--c:var(--${x.cor})">${esc(x.nome.replace(/ — .*$/,""))}</button>`).join("")}</div>`).join("");
  $$("#bicDrogas [data-bic]").forEach(b=>b.onclick=()=>{bic.id=b.dataset.bic;bic.dil=0;bic.dose="";bic.mlh="";bic.ult="dose";$("#bicDose").value="";$("#bicMlh").value="";renderBic()});
  $("#bicDil").innerHTML=d.dil.map((x,i)=>`<option value="${i}">${esc(x.rot)}</option>`).join("")+`<option value="c">Outra diluição…</option>`;
  $("#bicDil").value=String(bic.dil);
  $("#bicCustom").hidden=bic.dil!=="c"; $("#bicBaseUn").textContent=d.base;
  $("#bicPesoW").hidden=!d.porKg; $("#bicUn").textContent=d.un;
  $("#bicNome").textContent=d.nome; $("#bicApres").textContent=d.apres;
  $("#bicFaixaW").hidden=!d.faixaTxt; $("#bicFaixa").textContent=d.faixaTxt||"";
  $("#bicObs").innerHTML=d.obs.map(o=>`<li>${esc(o)}</li>`).join("");
  $("#bicFontes").innerHTML=d.src.map(s=>`<li>${linkify(s)}</li>`).join("");
  bicCalc(); $("#bicTab").innerHTML=bicTabela(d);
}
$("#bicDil").addEventListener("change",()=>{const v=$("#bicDil").value;bic.dil=v==="c"?"c":+v;renderBic()});
[["bicPeso","peso"],["bicQtd","qtd"],["bicVol","vol"]].forEach(([id,k])=>$("#"+id).addEventListener("input",()=>{bic[k]=$("#"+id).value;bicCalc();$("#bicTab").innerHTML=bicTabela(bicDroga())}));
$("#bicDose").addEventListener("input",()=>{bic.dose=$("#bicDose").value;bic.ult="dose";bicCalc()});
$("#bicMlh").addEventListener("input",()=>{bic.mlh=$("#bicMlh").value;bic.ult="mlh";bicCalc()});

/* ---------- intubação e ventilação inicial ---------- */
const iotMarcas=new Set(); // só na memória
function renderIot(){
  $("#iotCheck").innerHTML=IOT_CHECK.map(([t,l],gi)=>`<div class="ckg"><h4>${esc(t)}</h4><ul class="iotl">${l.map((x,i)=>{const k=gi+"-"+i;return `<li><label class="check"><input type="checkbox" data-iot="${k}" ${iotMarcas.has(k)?"checked":""}> ${esc(x)}</label></li>`}).join("")}</ul></div>`).join("");
  $$("#iotCheck [data-iot]").forEach(c=>c.onchange=()=>{c.checked?iotMarcas.add(c.dataset.iot):iotMarcas.delete(c.dataset.iot)});
  $("#iotFontes").innerHTML=IOT_FONTES.map(s=>`<li>${linkify(s)}</li>`).join("");
  renderVm();
}
function renderVm(){
  const h=numBr($("#vmAlt").value), fem=$("#vmSexo").value==="F";
  const pp=h>=100&&h<=250?PESO_PREDITO(h,fem):NaN;
  $("#vmRes").innerHTML=pp>0?`Peso predito: <b>${fmtN(pp,1)} kg</b><br>Volume corrente 6 mL/kg: <b>${Math.round(pp*6)} mL</b> · 8 mL/kg: ${Math.round(pp*8)} mL`:"Informe a altura para calcular o peso predito e o volume corrente.";
  $("#vmLista").innerHTML=[
   "Volume controlado; volume corrente de 6 mL/kg de peso predito na SDRA (4–8 mL/kg); fora da SDRA, volumes baixos (6–8 mL/kg) também se associam a melhores desfechos. Usar o peso predito, não o peso real.",
   "Pressão de platô ≤ 30 cmH2O.",
   "PEEP inicial de 5 cmH2O; na SDRA moderada a grave, PEEP mais alta pela tabela PEEP/FiO2, sem manobras de recrutamento prolongadas.",
   "FiO2 alta logo após a intubação e reduzir pela saturação; na SDRA, alvo de SpO2 88–95%.",
   "Frequência respiratória para manter pH entre 7,30 e 7,45 (máx. 35 irpm)."
  ].map(x=>`<li>${esc(x)}</li>`).join("");
}
["vmAlt","vmSexo"].forEach(id=>{$("#"+id).addEventListener("input",renderVm);$("#"+id).addEventListener("change",renderVm)});
$("#iotLimpar").onclick=()=>{iotMarcas.clear();renderIot();toast("Checklist limpo")};
$("#iotDoses").onclick=()=>abrirCalc("adulto");

/* ---------- protocolos em fluxo ---------- */
// caminho percorrido só na memória; cada passo pode ter uma decisão que leva a outro passo
const prEstado={id:null,caminho:[]};
function prAtual(){return PROTOCOLOS.find(p=>p.id===prEstado.id)||PROTOCOLOS[0]}
function prIniciar(id){const p=PROTOCOLOS.find(x=>x.id===id)||PROTOCOLOS[0];prEstado.id=p.id;prEstado.caminho=[p.passos[0].id]}
function prProximo(p,passo){const i=p.passos.findIndex(x=>x.id===passo.id);return p.passos[i+1]||null}
function renderProtocolo(){
  if(!PROTOCOLOS.length){$("#prCard").hidden=true;return}
  if(!prEstado.id) prIniciar(PROTOCOLOS[0].id);
  const p=prAtual();
  $("#prLista").innerHTML=PROTOCOLOS.map(x=>`<button class="chip" data-pr="${x.id}" aria-pressed="${x.id===p.id}" style="--c:var(--${x.cor||"red"})">${esc(x.titulo)}</button>`).join("");
  $$("#prLista [data-pr]").forEach(b=>b.onclick=()=>{prIniciar(b.dataset.pr);renderProtocolo()});
  $("#prTitulo").textContent=p.titulo;
  $("#prConduta").hidden=!(p.conduta&&getItem(p.conduta));
  $("#prConduta").onclick=()=>abrirConduta(p.conduta);
  $("#prReinicio").onclick=()=>{prIniciar(p.id);renderProtocolo()};
  const passos=prEstado.caminho.map(id=>p.passos.find(x=>x.id===id)).filter(Boolean);
  $("#prPassos").innerHTML=passos.map((x,i)=>{
    const ultimo=i===passos.length-1;
    const escolhido=!ultimo&&x.decisao?(x.decisao.opcoes.find(o=>o.ir===passos[i+1].id)||{}).rot:null;
    let acao="";
    if(ultimo){
      if(x.decisao) acao=`<div class="prdec"><b>${esc(x.decisao.pergunta)}</b><div class="actions">${x.decisao.opcoes.map((o,j)=>`<button class="btn ${j?"":"primary"}" data-ir="${esc(o.ir)}">${esc(o.rot)}</button>`).join("")}</div></div>`;
      else if(prProximo(p,x)) acao=`<div class="actions"><button class="btn primary" data-ir="${esc(prProximo(p,x).id)}">Próximo passo →</button></div>`;
      else acao=`<p class="note">Fim do protocolo.</p>`;
    }
    return `<li class="prp ${ultimo?"atual":"feito"}" style="--c:var(--${p.cor||"red"})"><div class="prh"><b>${esc(x.t)}</b>${x.tempo?`<span class="badge">${esc(x.tempo)}</span>`:""}</div>
      <ul>${(x.itens||[]).map(t=>`<li>${esc(t)}</li>`).join("")}</ul>${escolhido?`<p class="note">→ ${esc(x.decisao.pergunta)} <b>${esc(escolhido)}</b></p>`:""}${acao}</li>`;
  }).join("");
  $$("#prPassos [data-ir]").forEach(b=>b.onclick=()=>{const alvo=b.dataset.ir;if(p.passos.some(x=>x.id===alvo)){prEstado.caminho.push(alvo);renderProtocolo();const l=$("#prPassos .prp.atual");l&&l.scrollIntoView({block:"nearest"})}});
  $("#prFontes").innerHTML=p.fontes.map(s=>`<li>${linkify(s)}</li>`).join("");
}

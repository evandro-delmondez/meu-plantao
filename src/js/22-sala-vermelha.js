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

/* ---------- PCR: condução com cronômetro (AHA 2025, algoritmo de PCR do adulto) ---------- */
// tudo só na memória da aba; os tempos usam o relógio real para não atrasar com a tela em segundo plano
const PCR_FONTES=["AHA. 2025 Guidelines for CPR and ECC — Part 9: Adult Advanced Life Support. https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support","AHA 2025 Adult Cardiac Arrest Algorithm. https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf"];
const PCR_HT=["Hipovolemia","Hipóxia","H+ (acidose)","Hipo/hipercalemia","Hipotermia","Pneumotórax hipertensivo","Tamponamento cardíaco","Toxinas","Trombose pulmonar","Trombose coronária"];
const pcr={ini:null,cicloIni:null,adr:null,nAdr:0,nChq:0,nAmio:0,nLido:0,ritmo:null,va:false,fim:null,log:[],ht:new Set(),metro:false,timer:null,lock:null,audio:null,beep:0,avisou:false};
const mmss=ms=>{const s=Math.max(0,Math.floor(ms/1000));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
const hora=d=>d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
function pcrReg(t){const agora=Date.now();pcr.log.push({h:hora(new Date(agora)),rel:pcr.ini?mmss(agora-pcr.ini):"00:00",t});renderPcrLog()}
function pcrSom(freq,dur){try{pcr.audio=pcr.audio||new (window.AudioContext||window.webkitAudioContext)();const o=pcr.audio.createOscillator(),g=pcr.audio.createGain();o.frequency.value=freq;g.gain.value=.25;o.connect(g);g.connect(pcr.audio.destination);o.start();o.stop(pcr.audio.currentTime+dur)}catch(e){}}
function pcrTela(on){try{if(on&&navigator.wakeLock&&!pcr.lock)navigator.wakeLock.request("screen").then(l=>pcr.lock=l).catch(()=>{});if(!on&&pcr.lock){pcr.lock.release();pcr.lock=null}}catch(e){}}
function pcrProxima(){
  // lista numerada do que fazer agora; muda com o ritmo, as doses e o tempo do ciclo
  if(!pcr.ini) return ["Confirme a PCR: não responde, sem respiração normal e sem pulso (checar em até 10 s).","Chame ajuda e peça o desfibrilador.","Toque em Iniciar PCR e comece as compressões."];
  if(pcr.fim) return [pcr.fim];
  const agora=Date.now(), resta=120000-(agora-pcr.cicloIni), p=[];
  const vent=pcr.va?"Via aérea avançada: 1 ventilação a cada 6 s, sem pausar as compressões; capnografia.":"Ventilação 30:2 (2 ventilações a cada 30 compressões).";
  if(resta<=0) return ["Pausa de no máximo 10 s: cheque o ritmo.","Toque em Ritmo chocável ou Não chocável.","Troque o compressor."];
  if(resta<=15000) p.push("Prepare a checagem: próximo compressor pronto e desfibrilador carregando.");
  if(!pcr.ritmo){p.push("Compressões 100–120/min, pelo menos 5 cm, retorno completo do tórax.",vent,"Monitorize: cheque o ritmo assim que o desfibrilador chegar.");return p}
  if(pcr.ritmo==="choc"){
    p.push("Choque (bifásico: energia do fabricante, 120–200 J; monofásico 360 J) e volte às compressões na hora.");
    if(pcr.nChq>=2&&!pcr.nAdr) p.push("Adrenalina 1 mg EV/IO agora (após o 2º choque).");
    else if(pcr.nAdr) p.push("Adrenalina 1 mg a cada 3–5 min.");
    if(pcr.nChq>=3&&!pcr.nAmio&&!pcr.nLido) p.push("Amiodarona 300 mg EV/IO (ou lidocaína 1–1,5 mg/kg).");
    else if(pcr.nChq>=5&&pcr.nAmio+pcr.nLido===1) p.push("2ª dose: amiodarona 150 mg (ou lidocaína 0,5–0,75 mg/kg).");
  } else {
    p.push("Compressões contínuas por 2 min (ritmo não chocável: não chocar).");
    p.push(pcr.nAdr?"Adrenalina 1 mg a cada 3–5 min.":"Adrenalina 1 mg EV/IO agora.");
  }
  p.push(vent,"Procure e trate as causas reversíveis (5H e 5T).");
  return p;
}
let pcrMsgUlt="";
function pcrMsgRender(){const l=pcrProxima(),h=`<b>Agora:</b><ol>${l.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`;if(h!==pcrMsgUlt){pcrMsgUlt=h;$("#pcrMsg").innerHTML=h}}
function pcrTick(){
  if(!pcr.ini||pcr.fim) return;
  pcrMsgRender();
  const agora=Date.now();
  $("#pcrTotal").textContent=mmss(agora-pcr.ini);
  const resta=120000-(agora-pcr.cicloIni);
  $("#pcrCiclo").textContent=resta>0?mmss(resta).replace(/^0/,""):"Checar!";
  $("#pcrBarra").style.width=Math.min(100,Math.max(0,(agora-pcr.cicloIni)/1200))+"%";
  $("#pcrCicloW").classList.toggle("alerta",resta<=0);
  if(resta<=0&&!pcr.avisou){pcr.avisou=true;pcrSom(880,.35);setTimeout(()=>pcrSom(880,.35),450);try{navigator.vibrate&&navigator.vibrate([300,150,300])}catch(e){}}
  if(pcr.adr){const d=agora-pcr.adr;$("#pcrAdr").textContent=mmss(d);$("#pcrAdr").className=d>=300000?"atrasada":d>=180000?"pronta":""}
}
function pcrAcao(a){
  const agora=Date.now();
  if(a==="iniciar"){pcr.ini=pcr.cicloIni=agora;pcr.avisou=false;pcrReg("Início da PCR e das compressões.");pcrTela(true);clearInterval(pcr.timer);pcr.timer=setInterval(pcrTick,100)}
  if(a==="choc"||a==="naochoc"){pcr.ritmo=a==="choc"?"choc":"nao";pcr.cicloIni=agora;pcr.avisou=false;pcrReg(a==="choc"?"Ritmo chocável (FV/TV sem pulso).":"Ritmo não chocável (AESP/assistolia).")}
  if(a==="choque"){pcr.nChq++;pcr.cicloIni=agora;pcr.avisou=false;pcrReg(`Choque ${pcr.nChq} (bifásico: energia do fabricante, 120–200 J; monofásico 360 J). RCP reiniciada.`)}
  if(a==="adr"){pcr.nAdr++;pcr.adr=agora;pcrReg(`Adrenalina 1 mg EV/IO (dose ${pcr.nAdr}).`)}
  if(a==="amio"){if(pcr.nAmio>=2){toast("Amiodarona: já foram as 2 doses do algoritmo");return}pcr.nAmio++;pcrReg(pcr.nAmio===1?"Amiodarona 300 mg EV/IO.":"Amiodarona 150 mg EV/IO.")}
  if(a==="lido"){if(pcr.nLido>=2){toast("Lidocaína: já foram as 2 doses do algoritmo");return}pcr.nLido++;pcrReg(pcr.nLido===1?"Lidocaína 1–1,5 mg/kg EV/IO.":"Lidocaína 0,5–0,75 mg/kg EV/IO.")}
  if(a==="va"){pcr.va=true;pcrReg("Via aérea avançada instalada; capnografia.")}
  if(a==="rce"){pcr.fim="Retorno da circulação espontânea: cuidados pós-PCR (oxigenação, PAM, ECG de 12 derivações, controle de temperatura).";pcrReg("Retorno da circulação espontânea (RCE).");pcrParar()}
  if(a==="encerrar"){pcr.fim="Esforços de reanimação encerrados.";pcrReg("Esforços de reanimação encerrados.");pcrParar()}
  renderPcr();
}
let metroT=null;
function metroLiga(on){
  pcr.metro=on; clearInterval(metroT);
  if(on){try{pcr.audio=pcr.audio||new (window.AudioContext||window.webkitAudioContext)();if(pcr.audio.state!=="running")pcr.audio.resume()}catch(e){}
    const bate=()=>{pcrSom(1200,.05);const b=$("#pcrMetro");if(b){b.classList.add("bate");setTimeout(()=>b.classList.remove("bate"),120)}};
    bate(); metroT=setInterval(bate,Math.round(60000/110));}
  const b=$("#pcrMetro"); if(b) b.setAttribute("aria-pressed",on);
}
function pcrParar(){clearInterval(pcr.timer);metroLiga(false);pcrTela(false)}
function renderPcrLog(){$("#pcrLog").innerHTML=pcr.log.map(e=>`<li><span class="note">${e.h} · ${e.rel}</span> ${esc(e.t)}</li>`).join("")||`<li class="note">Os eventos aparecem aqui com horário.</li>`}
function renderPcr(){
  const b=(a,t,cls="")=>`<button class="btn ${cls}" data-pcr="${a}">${t}</button>`;
  $("#pcrBtns").innerHTML=!pcr.ini?b("iniciar","▶ Iniciar PCR","primary grande"):pcr.fim?"":
    b("choc","Ritmo chocável","")+b("naochoc","Não chocável","")+b("choque",`⚡ Choque (${pcr.nChq+1}º)`,"danger")+b("adr","Adrenalina 1 mg","primary")+b("amio","Amiodarona")+b("lido","Lidocaína")+(pcr.va?"":b("va","Via aérea avançada"))+b("rce","RCE","ok")+b("encerrar","Encerrar");
  $$("#pcrBtns [data-pcr]").forEach(x=>x.onclick=()=>pcrAcao(x.dataset.pcr));
  $("#pcrChq").textContent=pcr.nChq;
  if(!pcr.adr) $("#pcrAdr").textContent=pcr.ini?"não feita":"—";
  pcrMsgRender();
  $("#pcrMetro").setAttribute("aria-pressed",pcr.metro);
  $("#pcrHT").innerHTML=PCR_HT.map((h,i)=>`<label class="check"><input type="checkbox" data-ht="${i}" ${pcr.ht.has(i)?"checked":""}> ${h}</label>`).join("");
  $$("#pcrHT [data-ht]").forEach(c=>c.onchange=()=>{c.checked?pcr.ht.add(+c.dataset.ht):pcr.ht.delete(+c.dataset.ht)});
  $("#pcrFontes").innerHTML=PCR_FONTES.map(f=>`<li>${linkify(f)}</li>`).join("")+`<li><button class="btn sm" id="pcrConduta">Abrir a conduta de PCR</button></li>`;
  $("#pcrConduta").onclick=()=>abrirConduta("pcr");
  renderPcrLog(); if(pcr.ini) pcrTick();
}
function pcrTexto(){const ht=[...pcr.ht].map(i=>PCR_HT[i]);return "PCR — registro:\n"+pcr.log.map(e=>`${e.h} (${e.rel}) ${e.t}`).join("\n")+(ht.length?"\nCausas reversíveis avaliadas: "+ht.join(", ")+".":"")+`\nTotal: ${pcr.nChq} choque(s), ${pcr.nAdr} dose(s) de adrenalina.`}
$("#pcrMetro").onclick=()=>metroLiga(!pcr.metro);
$("#pcrCopiar").onclick=e=>{if(!pcr.log.length){toast("Nada registrado ainda");return}copy(pcrTexto(),e.currentTarget)};
$("#pcrZerar").onclick=()=>{if(pcr.ini&&!confirm("Zerar o cronômetro e o registro desta PCR?"))return;pcrParar();Object.assign(pcr,{ini:null,cicloIni:null,adr:null,nAdr:0,nChq:0,nAmio:0,nLido:0,ritmo:null,va:false,fim:null,log:[],ht:new Set(),avisou:false});$("#pcrTotal").textContent="00:00";$("#pcrCiclo").textContent="2:00";$("#pcrBarra").style.width="0";$("#pcrAdr").className="";renderPcr()};

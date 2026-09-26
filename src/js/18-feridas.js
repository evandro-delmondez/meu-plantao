/* ---------- feridas: raiva, tétano, mordedura, anestésico ---------- */
const FR_FONTES=[
 "Ministério da Saúde. Nota Técnica nº 8/2022-CGZV/DEIDT/SVS/MS — Protocolo de profilaxia pré, pós e reexposição da raiva humana no Brasil.",
 "Prefeitura de São Paulo. Protocolo de atendimento da raiva humana, 11/2022 (reexposição em imunodeprimidos; via ID).",
 "Ministério da Saúde. Guia de Vigilância em Saúde, 5ª ed., 2024 — tétano acidental (profilaxia após ferimento; SAT 5.000 UI, IGHAT 250 UI; imunização passiva em situações especiais com última dose há 5 anos ou mais e ferimento de alto risco).",
 "Stevens DL et al. IDSA 2014 — Practice guidelines for skin and soft tissue infections (mordeduras: antibiótico preemptivo e fechamento primário).",
 "Forsch RT, Little SH, Williams C. Laceration Repair: A Practical Approach. Am Fam Physician 2017;95(10):628-636 (irrigação, janela de fechamento, mordedura de gato)."
];
const FR_OPTS={
 sutura:[["nao","Não (curativo)"],["primaria","Sutura primária"],["retardada","Fechamento retardado"]],
 animal:[["nao","Nenhum"],["caogato","Cão ou gato"],["morcego","Morcego ou silvestre (inclui capivara)"],["herb","Herbívoro de produção"],["roedor","Roedor urbano ou coelho"]],
 obs:[["sim","Sim, sem sinais de raiva"],["nao","Não: morto, desaparecido ou com sinais"]],
 exp:[["indireto","Contato indireto"],["leve","Leve"],["grave","Grave"]],
 retipo:[["pep90","Pós-exposição completa há ≤ 90 dias"],["pep90inc","Pós-exposição incompleta (≥ 2 doses) há ≤ 90 dias"],["pepmais","Pós-exposição (≥ 2 doses) há > 90 dias"],["prep","Pré-exposição completa"],["incompleta","Esquema anterior com só 1 dose"]],
 vac:[["incerta","Incerta ou < 3 doses"],["lt5","≥ 3 doses, última < 5 anos"],["5a10","≥ 3 doses, última 5–10 anos"],["gt10","≥ 3 doses, última > 10 anos"]],
 risco:[["baixo","Baixo"],["alto","Alto"]]
};
const FR_EXP={indireto:"Tocar ou alimentar o animal, lambedura em pele íntegra, contato de secreções com pele íntegra.",
 leve:"Ferimento superficial no tronco ou nos membros (exceto mãos e pés); lambedura de lesão superficial.",
 grave:"Ferimento em mucosa, no segmento cefálico, nas mãos ou nos pés; ferimentos múltiplos ou extensos."};
const FR_AB=[["imuno","Imunocomprometido"],["asplenia","Asplênico"],["hepato","Hepatopatia avançada"],["edema","Edema prévio ou resultante na área"],["mod","Lesão moderada a grave, sobretudo em mão ou face"],["perio","Pode ter atingido periósteo ou cápsula articular"],["gato","Mordedura de gato"]];
// respostas sobre o ferimento são do paciente: só na memória (regra 5). Versões antigas salvavam em rxp_fr_v1.
let fr={animal:"nao",obs:"sim",exp:"leve",retipo:"pep90",vac:"incerta",risco:"baixo",sutura:null};
// fio e retirada por região: mesma tabela da tela (Forsch RT et al. Am Fam Physician 2017;95:628)
const FR_SUTURA={face:["Face","5-0 ou 6-0","3–5 dias"],couro:["Couro cabeludo","3-0 ou 4-0","7–10 dias"],bracos:["Braços","4-0","7–10 dias"],tronco:["Tronco","4-0","10–14 dias"],pernas:["Pernas","4-0","10–14 dias"],maos:["Mãos e pés","4-0 ou 5-0","10–14 dias"],palmas:["Palmas e plantas","3-0","14–21 dias"]};
try{localStorage.removeItem("rxp_fr_v1")}catch(e){}
let frManual=false;
const fmtUI=n=>Math.round(n).toLocaleString("pt-BR");
function frPeso(){const v=parseFloat(($("#frPeso").value||"").replace(",","."));return v>0&&v<300?v:null}
function frIdade(){const v=parseFloat($("#frIdade").value);return v>=0&&v<130?v:null}
function frRaiva(){
  const a=fr.animal, p=frPeso();
  if(a==="nao") return null;
  const VAC="Vacina antirrábica, 4 doses nos dias 0, 3, 7 e 14: IM (0,5 ou 1,0 mL conforme o fabricante; deltoide, ou vasto lateral em < 2 anos; não aplicar no glúteo) ou ID (0,2 mL por dose, divididos em 2 sítios de 0,1 mL, no antebraço ou na região do deltoide). Imunodeprimidos ou em uso de cloroquina: preferir IM.";
  const sar=p?`SAR ${fmtUI(40*p)} UI (40 UI/kg) ou IGHAR ${fmtUI(20*p)} UI (20 UI/kg)`:"SAR 40 UI/kg ou IGHAR 20 UI/kg — informe o peso para calcular";
  const SORO=`${sar}, no dia 0 (no máximo até o 7º dia após a 1ª dose da vacina; depois disso, não indicar). Infiltrar o máximo possível dentro e ao redor da(s) lesão(ões); o que não couber, IM no grupo muscular mais próximo.`;
  let t="", itens=[], alerta=false;
  if(a==="roedor"){ t="Baixo risco: profilaxia antirrábica não indicada."; itens=["Vale para rato, ratazana, camundongo, cobaia, hamster e coelho. Roedores silvestres (ex.: capivara) contam como animal silvestre.","Lavar com água e sabão."]; }
  else if(fr.exp==="indireto"){ t="Contato indireto: profilaxia não indicada."; itens=["Lavar com água e sabão."]; }
  else if(document.getElementById("frRe").checked){
    alerta=true;
    const r={pep90:["Pós-exposição completa há até 90 dias: não é necessária nova profilaxia."],
             pep90inc:["Aplicar as doses que faltaram do esquema anterior.","Soro não indicado na reexposição."],
             pepmais:["Vacina: 2 doses, dias 0 e 3.","Soro não indicado na reexposição."],
             prep:["Vacina: 2 doses, dias 0 e 3.","Soro não indicado na reexposição."],
             incompleta:["Esquema anterior com só 1 dose: conduzir como primeira exposição (esquema completo conforme animal e ferimento)."]}[fr.retipo];
    t="Reexposição"; itens=r.concat(fr.retipo!=="incompleta"?["Imunodeprimido: não usar o esquema de reexposição — fazer vacina e soro conforme o animal e o ferimento, e discutir com a vigilância epidemiológica."]:[]);
  }
  else if(a==="caogato"&&fr.obs==="sim"){
    t="Não iniciar profilaxia: observar o animal por 10 dias.";
    itens=["Se o animal permanecer sadio após 10 dias: encerrar o caso.",
      fr.exp==="grave"?"Se morrer, desaparecer ou apresentar sinais de raiva: iniciar vacina (4 doses) + soro.":"Se morrer, desaparecer ou apresentar sinais de raiva: iniciar vacina (4 doses).",
      "Orientar o paciente a avisar a unidade imediatamente se o animal adoecer, morrer ou sumir."];
  }
  else {
    const soro = a==="morcego" || fr.exp==="grave";
    alerta=true;
    t = soro?"Vacina + soro":"Vacina";
    itens=[VAC]; if(soro) itens.push(SORO);
    if(a==="morcego") itens.unshift("Agressão por morcego ou mamífero silvestre é sempre exposição grave.");
  }
  if(!(a==="roedor"||fr.exp==="indireto")) itens.push("Registrar na ficha de atendimento antirrábico humano (SINAN).");
  return {t,itens,alerta};
}
function frTetano(){
  const v=fr.vac, alto=fr.risco==="alto", esp=$("#frEsp").checked, idade=frIdade();
  let vac=false, sat=false, txt="";
  if(v==="incerta"){ vac=true; sat=alto; }
  else if(v==="lt5"){ }
  else if(v==="5a10"){ vac=alto; sat=alto&&esp; }
  else { vac=true; sat=alto&&esp; }
  const crianca = idade!=null&&idade<7;
  const tipo = crianca ? "DTP (ou pentavalente, conforme o calendário da criança)" : "dT";
  const itens=[], box=[];
  if(!vac&&!sat) txt="Nenhuma vacina ou soro indicado agora.";
  if(vac) itens.push(v==="incerta"?`Vacina ${tipo}: iniciar ou completar o esquema de 3 doses.`:`Vacina ${tipo}: 1 dose de reforço.`);
  if(sat) itens.push("Imunização passiva: IGHAT 250 UI IM ou SAT 5.000 UI IM, em grupo muscular diferente do da vacina.");
  if(sat) box.push("Preferir IGHAT em imunodeprimidos ou com hipersensibilidade prévia a soro heterólogo.");
  if(vac&&!crianca) box.push("Gestante: seguir o calendário da gestante (dTpa a partir da 20ª semana).");
  if(!vac&&!sat) itens.push("Orientar manter o calendário vacinal em dia.");
  return {t: txt || (vac&&sat?"Vacina + imunização passiva":"Vacina"), itens, box, texto:(txt?[txt]:[]).concat(itens).join(" "), alerta: vac||sat};
}
function frAntibiotico(){
  const mord = fr.animal!=="nao";
  const marc=[...document.querySelectorAll("#frAb input:checked")].map(i=>FR_AB.find(x=>x[0]===i.value)[1]);
  $("#frAbW").hidden=!mord;
  if(!mord) return null;
  if(!marc.length) return {t:"Sem critério para antibiótico preemptivo", itens:["Reavaliar em 24–48 h se surgirem sinais de infecção (vermelhidão, calor, secreção, febre)."], alerta:false};
  return {t:"Antibiótico preemptivo por 3 a 5 dias", itens:["Critério: "+marc.join("; ")+".","Amoxicilina + clavulanato 875/125 mg VO de 12/12h por 3 a 5 dias (adulto).","Alergia a penicilina: doxiciclina; ou clindamicina associada a SMX-TMP ou a fluoroquinolona (cobertura de Pasteurella)."], alerta:true};
}
function frBox(el,titulo,r){
  if(!r){el.hidden=true;return}
  el.hidden=false;
  el.innerHTML=`<h3>${titulo}</h3><p class="ft ${r.alerta?"on":""}">${esc(r.t)}</p><ul>${r.itens.concat(r.box||[]).map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`;
}
function frTexto(R,T,A){
  const L=["Ferimento"+(fr.animal!=="nao"?" por "+({caogato:"cão/gato",morcego:"morcego/animal silvestre",herb:"herbívoro de produção",roedor:"roedor urbano/coelho"}[fr.animal])+(fr.animal!=="roedor"?`, exposição ${fr.exp}`:""):"")+":",
    "- Lavagem abundante com água e sabão, irrigação e desbridamento se necessário."];
  if(R) L.push("- Profilaxia antirrábica: "+R.t+(R.itens.length?(/[.:]$/.test(R.t)?" ":": ")+R.itens.join(" "):""));
  L.push("- Profilaxia antitetânica: "+T.texto);
  if(A) L.push("- Antibiótico: "+A.t+(A.alerta?" — "+A.itens.slice(1).join(" "):"."));
  if(fr.sutura==="nao") L.push("- Sem indicação de sutura: curativo.");
  else if(fr.sutura){const r=FR_SUTURA[$("#frRegiao").value]||FR_SUTURA.face;L.push(`- ${fr.sutura==="primaria"?"Sutura primária":"Fechamento primário retardado"} (${r[0].toLowerCase()}): náilon ${r[1]}; retirada dos pontos em ${r[2]}.`)}
  return L.join("\n");
}
function renderFer(){
  for(const g in FR_OPTS){
    const box=document.querySelector(`#tab-feridas .opts[data-g="${g}"]`); if(!box) continue;
    box.innerHTML=FR_OPTS[g].map(([v,l])=>`<button class="opt" data-v="${v}" aria-pressed="${fr[g]===v}">${esc(l)}</button>`).join("");
    box.querySelectorAll("button").forEach(b=>b.onclick=()=>{fr[g]=b.dataset.v;frManual=false;renderFer()});
  }
  const a=fr.animal;
  $("#frObsW").hidden=a!=="caogato";
  $("#frExpW").hidden=a==="nao"||a==="roedor";
  $("#frReW").hidden=a==="nao"||a==="roedor";
  $("#frReTipoW").hidden=$("#frReW").hidden||!$("#frRe").checked;
  $("#frExpHint").textContent=FR_EXP[fr.exp]||"";
  $("#frRegW").hidden=!fr.sutura||fr.sutura==="nao";
  if(!$("#frRegiao").children.length){$("#frRegiao").innerHTML=Object.entries(FR_SUTURA).map(([k,v])=>`<option value="${k}">${v[0]}</option>`).join("");$("#frRegiao").onchange=()=>{frManual=false;renderFer()}}
  if(!$("#frAb").children.length){
    $("#frAb").innerHTML=FR_AB.map(([k,l])=>`<label class="check"><input type="checkbox" value="${k}"> ${esc(l)}</label>`).join("");
    $("#frAb").querySelectorAll("input").forEach(i=>i.onchange=()=>{frManual=false;renderFer()});
  }
  const R=frRaiva(), T=frTetano(), A=frAntibiotico();
  frBox($("#frRaiva"),"Raiva",R); frBox($("#frTet"),"Tétano",T); frBox($("#frAbRes"),"Antibiótico (mordedura)",A);
  if(!frManual){ $("#frOut").value=frTexto(R,T,A); grow($("#frOut")); }
  if(!$("#frFontes").children.length) $("#frFontes").innerHTML=FR_FONTES.map(f=>`<li>${esc(f)}</li>`).join("");
  renderAnest();
}
/* anestésico local */
const AN=[
 {id:"l1",nome:"Lidocaína 1% sem vasoconstritor",mgml:10,mgkg:4.5,max:300},
 {id:"l2",nome:"Lidocaína 2% sem vasoconstritor",mgml:20,mgkg:4.5,max:300},
 {id:"l1e",nome:"Lidocaína 1% com epinefrina",mgml:10,mgkg:7,max:500},
 {id:"l2e",nome:"Lidocaína 2% com epinefrina",mgml:20,mgkg:7,max:500},
 {id:"b25",nome:"Bupivacaína 0,25% sem vasoconstritor",mgml:2.5,max:175,bupi:1},
 {id:"b5",nome:"Bupivacaína 0,5% sem vasoconstritor",mgml:5,max:175,bupi:1},
 {id:"b5e",nome:"Bupivacaína 0,5% com epinefrina",mgml:5,max:225,bupi:1}
];
function renderAnest(){
  const sel=$("#anDroga");
  if(!sel.options.length){ sel.innerHTML=AN.map(d=>`<option value="${d.id}">${esc(d.nome)}</option>`).join(""); sel.value=lsGet("rxp_an_v1","l1"); }
  const d=AN.find(x=>x.id===sel.value)||AN[0];
  const p=parseFloat(($("#anPeso").value||"").replace(",","."));
  const idade=frIdade();
  const nf=n=>n.toLocaleString("pt-BR",{maximumFractionDigits:1});
  let h="";
  if(d.bupi){
    h=`<b>${nf(d.max)} mg</b> = ${nf(d.max/d.mgml)} mL — dose única máxima (bula: ${d.max} mg ${d.max===225?"com":"sem"} epinefrina; máx. 400 mg em 24 h).`;
    if(idade!=null&&idade<12) h+=`<br><span class="warn">Menor de 12 anos: bupivacaína não recomendada pela bula.</span>`;
    else h+=`<br><span class="note">Bula não traz dose por kg; em crianças menores de 12 anos, não recomendada.</span>`;
  } else if(p>0&&p<300){
    const mg=Math.min(d.mgkg*p,d.max);
    h=`<b>${nf(mg)} mg</b> = ${nf(mg/d.mgml)} mL — ${d.mgkg.toString().replace(".",",")} mg/kg, teto de ${d.max} mg (bula).`;
  } else h=`Informe o peso. ${d.mgkg.toString().replace(".",",")} mg/kg, teto de ${d.max} mg (bula).`;
  $("#anRes").innerHTML=h;
}
$("#anDroga").addEventListener("change",()=>{lsSet("rxp_an_v1",$("#anDroga").value);renderAnest()});
$("#anPeso").addEventListener("input",renderAnest);
$("#frPeso").addEventListener("input",()=>{if(!$("#anPeso").value||$("#anPeso").dataset.auto==="1"){$("#anPeso").value=$("#frPeso").value;$("#anPeso").dataset.auto="1"}frManual=false;renderFer()});
$("#anPeso").addEventListener("keydown",()=>{$("#anPeso").dataset.auto="0"});
$("#frIdade").addEventListener("input",()=>{frManual=false;renderFer()});
$("#frEsp").addEventListener("change",()=>{frManual=false;renderFer()});
$("#frRe").addEventListener("change",()=>{frManual=false;renderFer()});
$("#frOut").addEventListener("input",()=>{frManual=true;grow($("#frOut"))});
$("#frCopy").onclick=e=>copy($("#frOut").value,e.currentTarget);
$("#frClear").onclick=()=>{fr={animal:"nao",obs:"sim",exp:"leve",retipo:"pep90",vac:"incerta",risco:"baixo",sutura:null};$("#frPeso").value="";$("#frIdade").value="";$("#frEsp").checked=false;$("#frRe").checked=false;$("#frAb").querySelectorAll("input").forEach(i=>i.checked=false);frManual=false;renderFer();toast("Limpo")};

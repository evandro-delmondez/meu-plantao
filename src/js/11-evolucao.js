/* ---------- evolução ---------- */
const evIds=["evHma","evAlergia","evAp","evMuc","svPa","svFc","svFr","svSat","svTax","svHgt"];
let evManual=false;
let evChk=null; // linhas do checklist da conduta ({id,hma,ex}); só na memória
function buildEv(){
  const it=getItem($("#evCond").value);
  const v=id=>$("#"+id).value.trim();
  const L=[];
  L.push("QP + HMA:");
  if(v("evHma")) L.push(v("evHma"));
  const ck=evChk&&it&&evChk.id===it.id?evChk:null;
  if(ck) ck.hma.forEach(x=>L.push(x));
  if($("#evNega").checked) L.push("Nega outros sintomas.");
  L.push("");
  // campo vazio não vira "nega": só se documenta o que foi perguntado
  // alergia a penicilina marcada em qualquer lugar (perfil, Dados do paciente ou checklist) aparece aqui
  let alerg=v("evAlergia"); if(perfisAtivos().has("pnc")&&!/penicilin/i.test(alerg)) alerg=[alerg,"penicilina"].filter(Boolean).join("; ");
  L.push("Alergias: "+(alerg||"não informado"));
  L.push("AP: "+(v("evAp")||"não informado"));
  L.push("MUC: "+(v("evMuc")||"não informado"));
  L.push("");
  const sv=[["PA",v("svPa"),"mmHg"],["FC",v("svFc"),"bpm"],["FR",v("svFr"),"irpm"],["SatO2",v("svSat"),"%"],["Tax",v("svTax"),"°C"],["HGT",v("svHgt"),"mg/dL"]].filter(x=>x[1]);
  if(sv.length){L.push("SSVV: "+sv.map(x=>`${x[0]} ${x[1]}${x[2]==="%"?"%":" "+x[2]}`).join(" | "));L.push("")}
  // o modelo de exame diz "afebril"; com temperatura de febre informada, não pode contradizer (febre ≥ 37,8 °C, Ministério da Saúde)
  const tax=parseFloat(v("svTax").replace(",","."));
  let exm=exameAtual($("#evExame").value);
  if(tax>=37.8) exm=exm.replace(/\bafebril\b/g,"febril");
  // taquipneia informada não pode sair como "eupneico" (FR adulto > 20 irpm)
  const fr=parseFloat(v("svFr").replace(",","."));
  if(fr>20) exm=exm.replace(/\beupneic([oa])\b/g,"taquipneic$1");
  L.push(exm);
  if(ck&&ck.ex.length){L.push("");ck.ex.forEach(x=>L.push(x))}
  if(evScores.length){L.push("");L.push("Escores:");evScores.forEach(x=>L.push("- "+x))}
  L.push("");
  L.push("HD: "+(it?(it.nome+(it.cid?" (CID "+it.cid+")":"")):""));
  L.push("");
  L.push("CD:");
  L.push(model.conduta);
  if(it){
    if($("#evUnid").checked&&cur(it,"unidade")) {L.push("");L.push("Na unidade:");L.push(cur(it,"unidade"))}
    if($("#evCasa").checked&&cur(it,"casa")) {L.push("");L.push("Prescrição domiciliar:");L.push(cur(it,"casa"))}
    if($("#evOri").checked&&cur(it,"orient")) {L.push("");L.push("Orientações:");L.push(cur(it,"orient"))}
  }
  const DESTINO={alta:"- Alta com orientações e sinais de retorno.",observacao:"- Mantido em observação para reavaliação.",internacao:"- Indicada internação.",transferencia:"- Solicitada transferência pela regulação."};
  const dest=DESTINO[$("#evDestino").value]; if(dest){L.push("");L.push(dest)}
  return L.join("\n");
}
function renderEv(force){
  if(evManual&&!force) {$("#evManualNote").hidden=false;return}
  evManual=false; $("#evManualNote").hidden=true;
  $("#evOut").value=buildEv(); grow($("#evOut"));
}
["evCond","evExame","evNega","evCasa","evUnid","evOri","evDestino",...evIds].forEach(id=>{$("#"+id).addEventListener("input",()=>renderEv());$("#"+id).addEventListener("change",()=>renderEv())});
$("#evOut").addEventListener("input",()=>{evManual=true;grow($("#evOut"));$("#evManualNote").hidden=false});
$("#evRegen").onclick=()=>renderEv(true);
$("#evCopy").onclick=e=>copy($("#evOut").value,e.currentTarget);
$("#evClear").onclick=()=>{evScores=[];evChk=null;evIds.forEach(id=>$("#"+id).value="");renderEv(true);toast("Campos limpos")};

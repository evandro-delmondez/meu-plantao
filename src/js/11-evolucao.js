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
  if($("#evNega").checked) L.push("Nega outros sintomas. Nega febre.");
  L.push("");
  L.push("Alergias: "+(v("evAlergia")||"nega"));
  L.push("AP: "+(v("evAp")||"nega"));
  L.push("MUC: "+(v("evMuc")||"nega"));
  L.push("");
  const sv=[["PA",v("svPa"),"mmHg"],["FC",v("svFc"),"bpm"],["FR",v("svFr"),"irpm"],["SatO2",v("svSat"),"%"],["Tax",v("svTax"),"°C"],["HGT",v("svHgt"),"mg/dL"]].filter(x=>x[1]);
  if(sv.length){L.push("SSVV: "+sv.map(x=>`${x[0]} ${x[1]}${x[2]==="%"?"%":" "+x[2]}`).join(" | "));L.push("")}
  L.push(exameAtual($("#evExame").value));
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
  if($("#evAlta").checked){L.push("");L.push("- Paciente liberado com orientações.")}
  return L.join("\n");
}
function renderEv(force){
  if(evManual&&!force) {$("#evManualNote").hidden=false;return}
  evManual=false; $("#evManualNote").hidden=true;
  $("#evOut").value=buildEv(); grow($("#evOut"));
}
["evCond","evExame","evNega","evCasa","evUnid","evOri","evAlta",...evIds].forEach(id=>{$("#"+id).addEventListener("input",()=>renderEv());$("#"+id).addEventListener("change",()=>renderEv())});
$("#evOut").addEventListener("input",()=>{evManual=true;grow($("#evOut"));$("#evManualNote").hidden=false});
$("#evRegen").onclick=()=>renderEv(true);
$("#evCopy").onclick=e=>copy($("#evOut").value,e.currentTarget);
$("#evClear").onclick=()=>{evScores=[];evChk=null;evIds.forEach(id=>$("#"+id).value="");renderEv(true);toast("Campos limpos")};

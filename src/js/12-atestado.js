/* ---------- atestado ---------- */
(function(){const d=new Date();$("#atData").value=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")})();
const extenso=["zero","um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove","vinte","vinte e um","vinte e dois","vinte e três","vinte e quatro","vinte e cinco","vinte e seis","vinte e sete","vinte e oito","vinte e nove","trinta"];
let atManual=false;
function fillTpl(t,vars){return t.replace(/\{(\w+)\}/g,(m,k)=>vars[k]!=null?vars[k]:m)}
function buildAt(){
  const F=ui.sexo==="F";
  const [y,m,d]=($("#atData").value||"").split("-"); const data=d?`${d}/${m}/${y}`:"____/____/______";
  const n=parseInt($("#atDias").value,10)||1;
  const dias=`${String(n).padStart(2,"0")}${extenso[n]?` (${extenso[n]})`:""} dia${n>1?"s":""}`;
  const cid=$("#atCid").value.trim().toUpperCase(); const aut=$("#atAut").checked;
  const hr=$("#atHora").value.trim();
  const key=(ui.tipo==="atestado"?"atestado_":"comp_")+(F?"F":"M");
  let t=fillTpl(model.atestado[key],{data,dias,horario:hr?", no período de "+hr:""});
  if(cid&&aut) t+="\n\n"+fillTpl(model.atestado.cid,{cid,do_da:F?"da":"do"});
  return t;
}
function renderAt(force){
  $$("[data-sexo]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.sexo===ui.sexo));
  $$("[data-tipo]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.tipo===ui.tipo));
  $("#atDiasW").hidden=ui.tipo!=="atestado"; $("#atHoraW").hidden=ui.tipo!=="comparecimento";
  if(atManual&&!force){$("#atManualNote").hidden=false;return}
  atManual=false;$("#atManualNote").hidden=true;
  $("#atOut").value=buildAt();grow($("#atOut"));
}
$$("[data-sexo]").forEach(b=>b.onclick=()=>{ui.sexo=b.dataset.sexo;saveUI();renderAt()});
$$("[data-tipo]").forEach(b=>b.onclick=()=>{ui.tipo=b.dataset.tipo;renderAt()});
["atData","atDias","atCid","atAut","atHora"].forEach(id=>{$("#"+id).addEventListener("input",()=>renderAt());$("#"+id).addEventListener("change",()=>renderAt())});
$("#atOut").addEventListener("input",()=>{atManual=true;grow($("#atOut"));$("#atManualNote").hidden=false});
$("#atRegen").onclick=()=>renderAt(true);
$("#atCopy").onclick=e=>copy($("#atOut").value,e.currentTarget);

/* ---------- atendimento em 1 tela (porta): sinais de alarme no topo e "Fechar o atendimento" na conduta ---------- */
// tudo do paciente fica só na memória da aba (regra 5); "Novo paciente" limpa
const ATD_VAZIO=()=>({hma:"",alergia:"",ap:"",muc:"",pa:"",fc:"",fr:"",sat:"",tax:"",hgt:"",exame:"",unid:false,casa:true,ori:true,alta:true,tipo:"atestado",dias:"",aut:false,hora:"",evMan:null,atMan:null});
let atd=ATD_VAZIO();
const ATD_EV={hma:"evHma",alergia:"evAlergia",ap:"evAp",muc:"evMuc",pa:"svPa",fc:"svFc",fr:"svFr",sat:"svSat",tax:"svTax",hgt:"svHgt"};

// sinais de alarme do checklist, em destaque antes da receita
function renderAlarme(it){
  const c=CHECK[it.id]; if(!c||!(c.alarme||[]).length) return "";
  return `<div class="sec alarmetopo"><div class="sec-h"><h3>Sinais de alarme</h3><span class="alsum">reavaliar a classificação antes de liberar</span></div>
    <ul class="alarmelista">${c.alarme.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`;
}

// modelo de exame físico conforme sexo, idade e gestação informados
function atdExamePadrao(){
  const ids=model.exames.map(e=>e.id), tem=id=>ids.includes(id);
  const idade=parseFloat(String(pac.idade||"").replace(",","."));
  if(pac.gest&&tem("gestante")) return "gestante";
  const f=pac.sexo==="F";
  if(idade>0&&idade<12) return f&&tem("pediatrico-f")?"pediatrico-f":tem("pediatrico")?"pediatrico":model.exameSel;
  return f&&tem("adulto-f")?"adulto-f":tem("adulto")?"adulto":model.exameSel;
}
// monta evolução e atestado com o mesmo motor das abas Evolução e Atestado
function atdTextos(it){
  Object.entries(ATD_EV).forEach(([k,id])=>$("#"+id).value=atd[k]);
  $("#evCond").value=it.id;
  $("#evExame").value=atd.exame||atdExamePadrao();
  $("#evUnid").checked=atd.unid; $("#evCasa").checked=atd.casa; $("#evOri").checked=atd.ori; $("#evAlta").checked=atd.alta;
  const l=chkLinhas(it); evChk=l.n?{id:it.id,hma:l.hma,ex:l.ex}:null;
  $("#evNega").checked=!l.n;
  const ev=buildEv();
  let at="";
  if(atd.tipo!=="nenhum"&&(atd.tipo==="comparecimento"||parseInt(atd.dias,10)>0)){
    const sx=ui.sexo,tp=ui.tipo; ui.sexo=pac.sexo; ui.tipo=atd.tipo;
    $("#atCid").value=it.cid||""; $("#atAut").checked=atd.aut; $("#atDias").value=atd.dias||"1"; $("#atHora").value=atd.hora;
    at=buildAt(); ui.sexo=sx; ui.tipo=tp;
  }
  return {ev,at};
}
function renderAtend(it){
  const inp=(k,rot,cls="",ph="")=>`<label class="f ${cls}">${rot}<input class="inp" data-atd="${k}" value="${esc(atd[k])}" placeholder="${ph}"${["pa","fc","fr","sat","tax","hgt"].includes(k)?' inputmode="decimal"':""}></label>`;
  const ck=(k,rot)=>`<label class="check"><input type="checkbox" data-atd="${k}" ${atd[k]?"checked":""}> ${rot}</label>`;
  const ex=atd.exame||atdExamePadrao();
  return `<div class="sec atend"><div class="sec-h"><h3>Fechar o atendimento</h3><button class="btn sm" id="atdNovo" title="Limpa os dados deste paciente">Novo paciente</button></div>
  <div class="atdbody">
    <label class="f atdfull">Queixa e história<textarea class="inp" data-atd="hma" rows="2" placeholder="ex.: dor de garganta há 2 dias, sem tosse">${esc(atd.hma)}</textarea></label>
    <div class="atdgrid">${inp("alergia","Alergias","","nega")}${inp("ap","Antecedentes","","nega")}${inp("muc","Medicamentos em uso","","nega")}</div>
    <div class="atdsv">${inp("pa","PA","","120x80")}${inp("fc","FC")}${inp("fr","FR")}${inp("sat","Sat O2")}${inp("tax","Temp.")}${inp("hgt","Glicemia")}</div>
    <label class="f">Exame físico<select class="inp" data-atd="exame">${model.exames.map(e=>`<option value="${esc(e.id)}" ${e.id===ex?"selected":""}>${esc(e.nome)}</option>`).join("")}</select></label>
    <div class="atdck">${ck("casa","Receita")}${ck("unid","Conduta na unidade")}${ck("ori","Orientações")}${ck("alta","Liberado com orientações")}</div>
    <p class="note">O checklist "Não esquecer" marcado acima entra sozinho na evolução.</p>
    <div class="atdat"><label class="f">Documento<select class="inp" data-atd="tipo">
      <option value="atestado" ${atd.tipo==="atestado"?"selected":""}>Atestado</option><option value="comparecimento" ${atd.tipo==="comparecimento"?"selected":""}>Comparecimento</option><option value="nenhum" ${atd.tipo==="nenhum"?"selected":""}>Nenhum</option></select></label>
      ${atd.tipo==="atestado"?inp("dias","Dias","atddias","0"):atd.tipo==="comparecimento"?inp("hora","Período","","ex.: 14h às 16h"):""}
      ${atd.tipo!=="nenhum"&&it.cid?ck("aut",`CID ${esc(it.cid)} autorizado`):""}</div>
    <div class="atdout"><div class="sec-h"><h4>Evolução</h4><button class="btn sm primary" id="atdCpEv">Copiar evolução</button></div>
      <textarea class="out-edit" id="atdEv" spellcheck="false" aria-label="Evolução"></textarea>
      <p class="note" id="atdEvMan" hidden>Você editou o texto. <button class="btn sm" id="atdEvRe">Refazer</button></p></div>
    <div class="atdout" id="atdAtW"><div class="sec-h"><h4 id="atdAtT">Atestado</h4><button class="btn sm primary" id="atdCpAt">Copiar</button></div>
      <textarea class="out-edit" id="atdAt" spellcheck="false" aria-label="Atestado"></textarea></div>
    <div class="actions"><button class="btn" id="atdCpRx">Copiar receita</button><button class="btn" id="atdCpTudo">Copiar tudo</button></div>
  </div></div>`;
}
function atdAtualiza(it){
  const {ev,at}=atdTextos(it);
  const e=$("#atdEv"),a=$("#atdAt"); if(!e) return;
  if(atd.evMan==null){e.value=ev} $("#atdEvMan").hidden=atd.evMan==null;
  $("#atdAtW").hidden=!at&&atd.atMan==null; $("#atdAtT").textContent=atd.tipo==="comparecimento"?"Declaração de comparecimento":"Atestado";
  if(atd.atMan==null) a.value=at;
  grow(e); grow(a);
}
function bindAtend(it){
  const box=$("#detail .sec.atend"); if(!box) return;
  if(atd.evMan!=null) $("#atdEv").value=atd.evMan;
  if(atd.atMan!=null) $("#atdAt").value=atd.atMan;
  box.querySelectorAll("[data-atd]").forEach(el=>{
    const k=el.dataset.atd, ev=el.type==="checkbox"||el.tagName==="SELECT"?"change":"input";
    el.addEventListener(ev,()=>{
      atd[k]=el.type==="checkbox"?el.checked:el.value;
      if(k==="tipo"){renderDetail();return}   // troca os campos do documento
      atdAtualiza(it);
    });
  });
  $("#atdEv").addEventListener("input",()=>{atd.evMan=$("#atdEv").value;$("#atdEvMan").hidden=false;grow($("#atdEv"))});
  $("#atdAt").addEventListener("input",()=>{atd.atMan=$("#atdAt").value;grow($("#atdAt"))});
  $("#atdEvRe").onclick=()=>{atd.evMan=null;atd.atMan=null;atdAtualiza(it)};
  $("#atdCpEv").onclick=e=>copy($("#atdEv").value,e.currentTarget);
  $("#atdCpAt").onclick=e=>copy($("#atdAt").value,e.currentTarget);
  $("#atdCpRx").onclick=e=>{const t=cur(it,"casa");if(!t.trim()){toast("Esta conduta não tem receita domiciliar");return}copy(t,e.currentTarget)};
  $("#atdCpTudo").onclick=e=>copy([$("#atdEv").value,$("#atdAtW").hidden?"":$("#atdAt").value].filter(Boolean).join("\n\n"),e.currentTarget);
  bindNovoPaciente($("#atdNovo"));
  atdAtualiza(it);
}

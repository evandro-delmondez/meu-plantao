/* ---------- atendimento em 1 tela (porta): sinais de alarme no topo e "Fechar o atendimento" na conduta ---------- */
// tudo do paciente fica só na memória da aba (regra 5); "Novo paciente" limpa
const ATD_VAZIO=()=>({hma:"",alergia:"",ap:"",muc:"",pa:"",fc:"",fr:"",sat:"",tax:"",hgt:"",o2:"",cons:"",exame:"",unid:false,casa:true,ori:true,destino:null,tipo:"atestado",dias:"",aut:false,hora:"",evMan:null,atMan:null});
let atd=ATD_VAZIO();
const ATD_EV={hma:"evHma",alergia:"evAlergia",ap:"evAp",muc:"evMuc",pa:"svPa",fc:"svFc",fr:"svFr",sat:"svSat",tax:"svTax",hgt:"svHgt"};

// sinais de alarme do checklist, em destaque antes da receita
function renderAlarme(it){
  const c=CHECK[it.id]; if(!c||!(c.alarme||[]).length) return "";
  return `<div class="sec alarmetopo"><div class="sec-h"><h3>Sinais de alarme</h3><span class="alsum">reavaliar a classificação antes de liberar</span></div>
    <ul class="alarmelista">${c.alarme.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`;
}

/* ---------- sinais vitais: NEWS2 na hora e alertas isolados (fontes em SVAL e NEWS2_SRC, extras.js) ---------- */
const atdNum=k=>{const v=parseFloat(String(atd[k]||"").replace(",","."));return isFinite(v)?v:null};
function atdPA(){const m=String(atd.pa||"").match(/(\d{2,3})\s*[x×\/]\s*(\d{2,3})/i);return m?{pas:+m[1],pad:+m[2]}:{pas:null,pad:null}}
const NEWS2_ROT={fr:"FR",sat:"SpO2",o2:"O2",pas:"PAS",fc:"FC",cons:"consciência",t:"temperatura"};
// NEWS2 não validado em menores de 16 anos e gestantes (RCP 2017)
const atdIdade=()=>{const v=parseFloat(String(pac.idade||"").replace(",","."));return v>0?v:null};
const news2Invalido=()=>{const i=atdIdade();return (i!=null&&i<16)||!!pac.gest};
// null enquanto nenhum sinal vital do NEWS2 foi digitado
function atdNews(){
  if(news2Invalido()) return null;
  const {pas}=atdPA(), sv={fr:atdNum("fr"),sat:atdNum("sat"),pas,fc:atdNum("fc"),t:atdNum("tax"),o2:atd.o2?atd.o2==="o2":null,cons:atd.cons?atd.cons==="A":null};
  if(["fr","sat","pas","fc","t"].every(k=>sv[k]==null)) return null;
  const r=news2Calc(sv); return Object.assign(r,news2Resposta(r.total,r.tem3));
}
const newsCurto=n=>n.txt.split(" — ")[0];
function newsLinha(n){
  const ord=["fr","sat","o2","pas","fc","cons","t"].filter(k=>k in n.pts).map(k=>`${NEWS2_ROT[k]} ${n.pts[k]}`).join(", ");
  return `NEWS2${n.faltam.length?" parcial":""}: ${n.total} (${ord}${n.faltam.length?`; faltam: ${n.faltam.map(k=>NEWS2_ROT[k]).join(", ")}`:""}) — ${newsCurto(n)}.`;
}
// CRB-65 com idade (Dados do paciente), FR e PA (Fechar o atendimento) e confusão (consciência)
function atdCrb(){
  const idade=parseFloat(String(pac.idade||"").replace(",",".")), fr=atdNum("fr"), {pas,pad}=atdPA();
  const it=[
    {k:"conf",rot:"Confusão mental nova",val:atd.cons?atd.cons==="C":null,mostra:atd.cons?(atd.cons==="C"?"sim":"não"):""},
    {k:"fr",rot:"FR ≥ 30",val:fr==null?null:fr>=30,mostra:fr==null?"":`FR ${String(fr).replace(".",",")}`},
    {k:"pa",rot:"PAS < 90 ou PAD ≤ 60",val:pas==null?null:(pas<90||pad<=60),mostra:pas==null?"":`PA ${pas}x${pad}`},
    {k:"id",rot:"Idade ≥ 65",val:idade>0?idade>=65:null,mostra:idade>0?`${idade} anos`:""}];
  const total=it.filter(x=>x.val).length, faltam=it.filter(x=>x.val==null);
  return {it,total,faltam,fx:pacFaixa(CRB65_FX,total)};
}
const crbLinha=c=>`CRB-65${c.faltam.length?" parcial":""}: ${c.total}${c.faltam.length?` (faltam: ${c.faltam.map(x=>x.rot).join(", ")})`:""} — ${c.fx.txt.split(" — ")[0]}.`;
function svAlertas(it){
  const out=[], n=atdNews(), sat=atdNum("sat"), {pas,pad}=atdPA(), tax=atdNum("tax"), fc=atdNum("fc");
  if(news2Invalido()&&["fr","sat","fc","tax","pa"].some(k=>String(atd[k]||"").trim())) out.push({nv:"info",h:"NEWS2",t:NEWS2_NAO_VALIDADO});
  if(n) out.push({nv:n.nivel,h:`NEWS2${n.faltam.length?" parcial":""} ${n.total}`,t:n.txt+(n.faltam.length?` Faltam: ${n.faltam.map(k=>NEWS2_ROT[k]).join(", ")} (o total pode subir).`:"")});
  if(sat!=null&&sat<SVAL.sat.lim&&atd.o2!=="o2") out.push({nv:"urgente",h:`SpO2 ${String(sat).replace(".",",")}% ${atd.o2==="ar"?"em ar ambiente":"(confirme se em ar ambiente)"}`,t:SVAL.sat.txt});
  if(pas!=null&&(pas>=SVAL.pa.pas||pad>=SVAL.pa.pad)){const txt=cur(it,"casa")+"\n"+cur(it,"unidade");out.push({nv:"urgente",h:`PA ${pas}x${pad} (≥ 180/110)`,t:SVAL.pa.txt+(SVAL.pa.aineRe.test(txt)?" "+SVAL.pa.aine:"")})}
  if(tax!=null&&tax>SVAL.febre.tax&&fc!=null&&fc>SVAL.febre.fc&&!(atdIdade()!=null&&atdIdade()<SVAL.febre.idadeMin)) out.push({nv:"urgente",h:`Tax ${String(tax).replace(".",",")} °C com FC ${fc}`,t:SVAL.febre.txt});
  return out;
}
function renderSvAviso(){return `<div class="sec svaviso" id="atdAviso" hidden></div>`}
function atdAvisoAtualiza(it){
  const box=$("#atdAviso"); if(!box) return;
  const ln=$("#atdNews"); if(ln){const n=atdNews(),inv=news2Invalido();ln.hidden=!n&&!(inv&&["fr","sat","fc","tax","pa"].some(k=>String(atd[k]||"").trim()));ln.textContent=n?newsLinha(n):inv?NEWS2_NAO_VALIDADO:"";ln.dataset.nv=n?n.nivel:"info"}
  const al=svAlertas(it); box.hidden=!al.length; if(!al.length){box.innerHTML="";return}
  const pior=al.some(a=>a.nv==="emergencia")?"emergencia":al.some(a=>a.nv==="urgente")?"urgente":al.some(a=>a.nv==="baixo")?"baixo":"info";
  box.dataset.nv=pior;
  box.innerHTML=`<div class="sec-h"><h3>Sinais vitais</h3><span class="alsum">aviso automático pelo que foi digitado em "Fechar o atendimento"</span></div>
    <ul class="svlista">${al.map(a=>`<li data-nv="${a.nv}"><b>${esc(a.h)}:</b> ${esc(a.t)}</li>`).join("")}</ul>
    <details class="alsrc"><summary>Fontes</summary><ol>${[NEWS2_SRC,SVAL.sat.src,SVAL.pa.src,SVAL.febre.src].map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details>`;
}
// bloco de gravidade da pneumonia (só na conduta "pac")
function renderCrb(it){
  if(it.id!=="pac") return "";
  return `<div class="sec crb" id="crbBloco"><div class="sec-h"><h3>Gravidade da pneumonia (CRB-65)</h3><span class="alsum">sem ureia; usa a idade e os sinais vitais já digitados</span></div>
  <div class="crbbody"><label class="check crbck"><input type="checkbox" id="crbConf" ${atd.cons==="C"?"checked":""}> Confusão mental nova</label>
  <div id="crbIn"></div>
  <p class="crbev"><b>${esc(PAC_EV)}</b></p>
  <details class="alsrc"><summary>Fontes</summary><ol>${PAC_GRAV_SRC.map(f=>`<li>${linkify(f)}</li>`).join("")}</ol></details></div></div>`;
}
function crbAtualiza(){
  const el=$("#crbIn"); if(!el) return;
  const c=atdCrb(), sat=atdNum("sat");
  el.innerHTML=`<ul class="crbitens">${c.it.map(x=>`<li data-on="${x.val==null?"falta":x.val}"><span>${esc(x.rot)}</span> <b>${x.val==null?"falta":x.val?"+1":"0"}</b>${x.mostra?` <span class="note">(${esc(x.mostra)})</span>`:""}</li>`).join("")}</ul>
  <p class="crbres" data-nv="${c.fx.nivel}"><b id="crbTotal">CRB-65: ${c.total}${c.faltam.length?" (parcial)":""}</b> — ${esc(c.fx.txt)}</p>
  ${c.faltam.length?`<p class="note">Faltam: ${esc(c.faltam.map(x=>x.rot).join(", "))}. Idade em "Dados do paciente"; FR, PA e consciência em "Fechar o atendimento".</p>`:""}
  <p class="note">${esc(PAC_JULGAMENTO)}${sat!=null&&sat<SVAL.sat.lim&&atd.o2!=="o2"?` <b>SpO2 ${String(sat).replace(".",",")}%: pesa para ficar.</b>`:""}</p>`;
  const ck=$("#crbConf"); if(ck) ck.checked=atd.cons==="C";
}
function bindCrb(it){
  const ck=$("#crbConf"); if(!ck) return;
  ck.addEventListener("change",()=>{atd.cons=ck.checked?"C":"A";const s=$('#detail [data-atd="cons"]');if(s)s.value=atd.cons;atdAtualiza(it)});
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
// destino padrão: alta na porta; nas emergências (sala vermelha, cartão Agora), sem padrão
const atdDestinoPadrao=it=>it.cat==="emerg"||AGORA[it.id]?"":"alta";
// monta evolução e atestado com o mesmo motor das abas Evolução e Atestado
function atdTextos(it){
  Object.entries(ATD_EV).forEach(([k,id])=>$("#"+id).value=atd[k]);
  $("#evCond").value=it.id;
  $("#evExame").value=atd.exame||atdExamePadrao();
  $("#evUnid").checked=atd.unid; $("#evCasa").checked=atd.casa; $("#evOri").checked=atd.ori; $("#evDestino").value=atd.destino??atdDestinoPadrao(it);
  const l=chkLinhas(it); evChk=l.n?{id:it.id,hma:l.hma,ex:l.ex}:null;
  $("#evNega").checked=false;   // "Nega…" só sai do checklist marcado com −
  const n=atdNews(); evSv=[n?newsLinha(n):"",it.id==="pac"&&(n||pac.idade)?crbLinha(atdCrb()):""].filter(Boolean);
  evEstado={cons:atd.cons,o2:atd.o2};
  const ev=buildEv(); evSv=[]; evEstado={};
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
    <div class="atdgrid">${inp("alergia","Alergias","","ex.: dipirona; ou escreva nega")}${inp("ap","Antecedentes","","ex.: hipertensão, diabetes")}${inp("muc","Medicamentos em uso","","ex.: losartana 50 mg")}</div>
    <div class="atdsv">${inp("pa","PA","","120x80")}${inp("fc","FC")}${inp("fr","FR")}${inp("sat","Sat O2")}${inp("tax","Temp.")}${inp("hgt","Glicemia")}</div>
    <div class="atdgrid atdnews"><label class="f">Oxigênio<select class="inp" data-atd="o2">${[["","— informar —"],["ar","Ar ambiente"],["o2","Em O2 suplementar"]].map(([v,r])=>`<option value="${v}" ${atd.o2===v?"selected":""}>${r}</option>`).join("")}</select></label>
      <label class="f">Consciência<select class="inp" data-atd="cons">${[["","— informar —"],["A","Alerta"],["C","Confusão nova, voz, dor ou sem resposta"]].map(([v,r])=>`<option value="${v}" ${atd.cons===v?"selected":""}>${r}</option>`).join("")}</select></label></div>
    <p class="svnews" id="atdNews" hidden></p>
    <label class="f">Exame físico<select class="inp" data-atd="exame">${model.exames.map(e=>`<option value="${esc(e.id)}" ${e.id===ex?"selected":""}>${esc(e.nome)}</option>`).join("")}</select></label>
    <div class="atdck">${ck("casa","Receita")}${ck("unid","Conduta na unidade")}${ck("ori","Orientações")}<label class="f">Destino<select class="inp" data-atd="destino">${[["","— não incluir —"],["alta","Alta com orientações"],["observacao","Observação"],["internacao","Internação"],["transferencia","Transferência"]].map(([v,r])=>`<option value="${v}" ${(atd.destino??atdDestinoPadrao(it))===v?"selected":""}>${r}</option>`).join("")}</select></label></div>
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
  atdAvisoAtualiza(it); crbAtualiza();
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
  bindCrb(it);
  atdAtualiza(it);
}

/* ---------- Atendimento (aba "evolucao"): uma tela na ordem do prontuário, cada campo com a sua cópia ----------
   Tudo do paciente fica no objeto atd (08-atendimento.js), só na memória (regra 5); "Novo paciente" limpa.
   Campos: História (HDA) · Exame físico · Diagnóstico · Conduta · Reavaliação e alta · Internação · Atestado. */
// exame físico por sistemas (sai só o geral e os sistemas ligados); f = feminino
const EX_SIS=[
 ["geral","Geral",f=>`Bom estado geral, ${f?"corada, hidratada, acianótica, anictérica e afebril; eupneica":"corado, hidratado, acianótico, anictérico e afebril; eupneico"} em ar ambiente; ${f?"lúcida e orientada":"lúcido e orientado"} no tempo e no espaço.`],
 ["cab","Cabeça e orofaringe",()=>"Cabeça e orofaringe: mucosas úmidas; orofaringe sem hiperemia, exsudato ou abaulamento; amígdalas sem hipertrofia; sem linfonodomegalia cervical palpável; otoscopia com membranas timpânicas íntegras e translúcidas."],
 ["cv","Cardiovascular",()=>"Cardiovascular: ritmo cardíaco regular em dois tempos, bulhas normofonéticas, sem sopros audíveis."],
 ["resp","Respiratório",()=>"Respiratório: murmúrio vesicular presente bilateralmente, sem ruídos adventícios; sem sinais de esforço respiratório."],
 ["abd","Abdome",()=>"Abdome: flácido, ruídos hidroaéreos presentes, indolor à palpação superficial e profunda; sinal de Murphy negativo, descompressão brusca negativa, punho-percussão lombar negativa."],
 ["neuro","Neurológico",()=>"Neurológico: Glasgow 15, sem sinais meníngeos ou déficits focais; pupilas isocóricas e fotorreagentes; sem paralisia facial ou dos membros."],
 ["msk","Musculoesquelético",()=>"Musculoesquelético: sem deformidades, edema ou crepitação; mobilidade preservada; sem dor à palpação da coluna e das articulações."],
 ["mmii","Membros inferiores",()=>"Membros inferiores: sem edemas, sem sinais de trombose venosa profunda, panturrilhas livres, boa perfusão periférica."],
 ["pele","Pele",()=>"Pele: sem lesões, exantemas ou petéquias."]];
// sistemas que já vêm ligados: pela conduta, senão pela categoria
const EX_SIS_COND={cefaleia:["neuro","cab"],enxaqueca:["neuro","cab"],salvas:["neuro","cab"],vertigem:["neuro","cab","cv"],convulsao:["neuro"],avc:["neuro","cv"],tce:["neuro","cab"],
  lombalgia:["msk","neuro"],entorse:["msk"],gota:["msk"],"gota-manut":["msk"],dengue:["cv","resp","abd","pele"],sepse:["cab","cv","resp","abd","neuro","pele"],hda:["cv","abd"],
  "dor-abdominal":["abd","cv"],tep:["cv","resp","mmii"],eap:["cv","resp","mmii"],ivc:["mmii","pele"],erisipela:["pele","mmii"],conjuntivite:["cab"],cinetose:["neuro"]};
const EX_SIS_CAT={resp:["cab","cv","resp"],orl:["cab"],gi:["abd"],uro:["abd"],gu:["abd"],cardio:["cv","resp","mmii"],dor:["neuro","msk"],pele:["pele"],psi:["neuro"],endo:["cv","neuro"],toxinf:["cv","resp","neuro"],emerg:["cv","resp","neuro"]};
const atSisPadrao=it=>it?(EX_SIS_COND[it.id]||EX_SIS_CAT[it.cat]||["cv","resp"]):["cv","resp"];
const atSis=it=>atd.sis||atSisPadrao(it);
// lista em português: "a, b e c"
const ptLista=a=>a.length<2?(a[0]||""):a.slice(0,-1).join(", ")+" e "+a[a.length-1];
// a alta registra o que foi explicado (proteção do médico e do paciente)
const AT_ORI=[["dx","o diagnóstico"],["med","a medicação prescrita (posologia, forma de uso e efeitos adversos)"],["evol","a evolução esperada"],["rep","repouso e hidratação"],["seg","o seguimento ambulatorial"]];
const AT_REAV=[["melhora","com melhora após a medicação na unidade"],["estavel","clinicamente estável"],["semmelhora","sem melhora após a medicação"],["exames","com os exames abaixo"]];
const AT_LOCAL=[["","— escolher —"],["enfermaria","enfermaria ou apartamento"],["semi","semi-intensiva"],["uti","UTI"]];
const AT_OBJ=[["atb","antibioticoterapia EV"],["suporte","suporte clínico e hidratação EV"],["dor","controle álgico"],["monit","monitorização"],["o2","oxigenoterapia"],["invest","investigação diagnóstica"],["espec","avaliação e conduta da especialidade"]];
const AT_PERGUNTAS=["Por que não dá para tratar em casa ou na observação?","Qual critério de gravidade ou de risco o paciente tem (sinal vital, exame, escore)?","O que será feito na internação que exige leito?","Qual o risco se ele receber alta agora?","O que o médico que recebe precisa saber: o plano inicial, o que falta investigar, o parecer pedido?"];

function atItem(){return getItem($("#evCond").value)}
function atSv(){
  const sv=[["PA",atd.pa,"mmHg"],["FC",atd.fc,"bpm"],["FR",atd.fr,"irpm"],["SatO2",atd.sat,"%"],["Tax",atd.tax,"°C"],["HGT",atd.hgt,"mg/dL"]].filter(x=>String(x[1]||"").trim());
  return sv.length?"SSVV: "+sv.map(x=>`${x[0]} ${String(x[1]).trim()}${x[2]==="%"?"%":" "+x[2]}`).join(" | "):"";
}
/* ---- textos de cada campo ---- */
function atHda(it){
  const L=[]; if(atd.hma.trim()) L.push(atd.hma.trim());
  if(it) chkLinhas(it).hma.forEach(x=>L.push(x));
  // campo vazio não vira "nega": só se documenta o que foi perguntado
  let alerg=atd.alergia.trim(); if(perfisAtivos().has("pnc")&&!/penicilin/i.test(alerg)) alerg=[alerg,"penicilina"].filter(Boolean).join("; ");
  L.push("Alergias: "+(alerg||"não informado"));
  L.push("Comorbidades: "+(atd.ap.trim()||"não informado"));
  L.push("Medicamentos em uso: "+(atd.muc.trim()||"não informado"));
  return L.join("\n");
}
function atExameBase(it){
  if(atd.exModelo&&atd.exModelo!=="sis") return exameAtual(atd.exModelo);
  const f=pac.sexo==="F", on=new Set(atSis(it));
  return EX_SIS.filter(([k])=>k==="geral"||on.has(k)).map(([k,,t])=>t(f)).join("\n");
}
function atExame(it){
  const L=[], sv=atSv(); if(sv) L.push(sv);
  const n=atdNews(); if(n) L.push(newsLinha(n));
  if(it&&it.id==="pac"&&(n||pac.idade)) L.push(crbLinha(atdCrb()));
  let exm=atExameBase(it);
  // o modelo diz "afebril" e "eupneico": não pode contradizer febre (≥ 37,8 °C, Ministério da Saúde) nem FR > 20 irpm
  const tax=atdNum("tax"), fr=atdNum("fr");
  if(tax!=null&&tax>=37.8) exm=exm.replace(/\bafebril\b/g,"febril");
  if(fr!=null&&fr>20) exm=exm.replace(/\beupneic([oa])\b/g,"taquipneic$1");
  // consciência alterada e O2 suplementar não podem sair como "lúcido e orientado" e "em ar ambiente"
  const CONF="com alteração aguda da consciência (descrever orientação e Glasgow)";
  if(atd.cons==="C") exm=exm.replace(/lúcid([oa]) e orientad[oa] no tempo e no espaço/g,(m,g)=>`confus${g}, ${CONF}`).replace(/\bLOTE\b/g,`confuso(a), ${CONF}`).replace(/Glasgow 15,?\s*/g,"");
  if(atd.o2==="o2") exm=exm.replace(/em ar ambiente/g,"em O2 suplementar");
  L.push((L.length?"Exame físico:\n":"")+exm.replace(/^Exame físico:\n/,""));
  if(atd.exLivre.trim()) L.push(atd.exLivre.trim());
  if(it) chkLinhas(it).ex.forEach(x=>L.push(x));
  if(evScores.length){L.push("Escores:");evScores.forEach(x=>L.push("- "+x))}
  return L.join("\n");
}
const atDiag=it=>it?`Hipótese diagnóstica: ${it.nome}${it.cid?` (CID ${it.cid})`:""}${atd.diag.trim()?`\n${atd.diag.trim()}`:""}`:atd.diag.trim();
function atTrat(it){
  const L=[model.conduta];
  if(it){
    if(atd.unid&&cur(it,"unidade")) L.push("","Na unidade:",cur(it,"unidade"));
    if(atd.casa&&cur(it,"casa")) L.push("","Prescrição domiciliar:",cur(it,"casa"));
    if(atd.ori&&cur(it,"orient")) L.push("","Orientações:",cur(it,"orient"));
  }
  return L.join("\n");
}
const atVolte=it=>it?((ALTA[it.id]&&ALTA[it.id].volte)||(CHECK[it.id]&&CHECK[it.id].alarme)||[]):[];
function atAlta(it){
  const L=[];
  const rv=AT_REAV.filter(([k])=>atd.reav[k]).map(([,t])=>t);
  if(rv.length||atd.reavTxt.trim()) L.push(`- Paciente reavaliado${rv.length?", "+ptLista(rv):""}${atd.reavTxt.trim()?`: ${atd.reavTxt.trim()}`:"."}`.replace(/\.\.$/,"."));
  const ori=AT_ORI.filter(([k])=>atd.altaOri[k]!==false).map(([,t])=>t);
  if(ori.length) L.push(`- Orientado sobre ${ptLista(ori)}.`);
  const vt=atVolte(it).filter((x,i)=>!atd.alarOff[i]).map(x=>semParenteses(x).replace(/\.$/,""));
  if(vt.length) L.push(`- Explicados os sinais de alarme, com orientação de retorno imediato se: ${vt.join("; ")}.`);
  if(atd.altaLivre.trim()) L.push(...atd.altaLivre.trim().split("\n").map(x=>/^\s*-/.test(x)?x:"- "+x));
  if(atd.compreende) L.push("- Paciente compreendeu e concorda com as orientações.");
  const dest=(destinos().find(d=>d[0]===(atd.destino??atdDestinoPadrao(it||{})))||[])[2]; if(dest) L.push(dest);
  return L.join("\n");
}
function atIntern(it){
  const I=atd.intern, L=[];
  const loc=(AT_LOCAL.find(x=>x[0]===I.local)||[])[1];
  L.push(`Solicito internação${loc?` em ${loc}`:""}.`);
  if(it) L.push(`Hipótese diagnóstica: ${it.nome}${it.cid?` (CID ${it.cid})`:""}.`);
  if(atd.hma.trim()) L.push(`História: ${atd.hma.trim()}`);
  if(atd.ap.trim()) L.push(`Comorbidades: ${atd.ap.trim()}`);
  const sv=atSv(); if(sv) L.push(sv);
  if(I.lab.trim()) L.push(`Exames laboratoriais relevantes: ${I.lab.trim()}`);
  if(I.laudos.trim()) L.push(`Laudos de imagem: ${I.laudos.trim()}`);
  if(I.feito.trim()) L.push(`Conduta no PS: ${I.feito.trim()}`);
  if(I.parecer.trim()) L.push(`Parecer: ${I.parecer.trim()}`);
  L.push(`Justificativa: ${I.motivo.trim()||"___"}`);
  const ob=AT_OBJ.filter(([k])=>I.obj[k]).map(([,t])=>t);
  if(ob.length||I.objLivre.trim()) L.push(`Objetivo da internação: ${[...ob,I.objLivre.trim()].filter(Boolean).join("; ")}.`);
  return L.join("\n");
}
function atAtestado(it){
  if(atd.tipo==="nenhum"||!(atd.tipo==="comparecimento"||parseInt(atd.dias,10)>0)) return "";
  const sx=ui.sexo,tp=ui.tipo; ui.sexo=pac.sexo; ui.tipo=atd.tipo;
  $("#atCid").value=it&&it.cid||""; $("#atAut").checked=atd.aut; $("#atDias").value=atd.dias||"1"; $("#atHora").value=atd.hora;
  const t=buildAt(); ui.sexo=sx; ui.tipo=tp; return t;
}
const AT_CAMPOS=[["hda","História (HDA)",atHda],["exame","Exame físico",atExame],["diag","Diagnóstico",atDiag],["trat","Conduta",atTrat],["alta","Reavaliação e alta",atAlta],["intern","Pedido de internação",atIntern],["atest","Atestado",atAtestado]];
const atTexto=(k,it)=>atd.man[k]!=null?atd.man[k]:AT_CAMPOS.find(c=>c[0]===k)[2](it);
// evolução completa (copiar tudo): campos na ordem do prontuário, sem o pedido de internação nem o atestado
function buildEv(){const it=atItem();return ["hda","exame","diag","trat","alta"].map(k=>atTexto(k,it)).filter(x=>x.trim()).join("\n\n")}

/* ---- tela ---- */
function atSaida(k,rot){
  return `<div class="atout" data-campo="${k}"><div class="sec-h"><h4>${rot}</h4><button class="btn sm primary" data-atcp="${k}">Copiar ${rot.split(" (")[0].toLowerCase()}</button></div>
    <textarea class="out-edit" data-atout="${k}" spellcheck="false" aria-label="${rot}"></textarea>
    <p class="note" data-atman="${k}" hidden>Você editou este campo. <button class="btn sm" data-atre="${k}">Refazer</button></p></div>`;
}
function renderEv(){
  const el=$("#atCorpo"); if(!el) return;
  // só existe na tela enquanto a aba está aberta (o checklist e os campos não se repetem em outra aba)
  if(ui.tab!=="evolucao"){el.innerHTML="";return}
  pacNomeAtualiza();
  const it=atItem();
  const inp=(k,rot,ph="",num)=>`<label class="f">${rot}<input class="inp" data-atd="${k}" value="${esc(atd[k])}" placeholder="${ph}"${num?' inputmode="decimal"':""}></label>`;
  const ta=(k,rot,ph="",obj)=>{const v=obj?atd[obj][k]:atd[k];return `<label class="f atdfull">${rot}<textarea class="inp" data-atd="${obj?obj+".":""}${k}" rows="2" placeholder="${ph}">${esc(v)}</textarea></label>`};
  const chip=(grupo,k,rot,on)=>`<button class="chip" data-atchip="${grupo}" data-k="${esc(String(k))}" aria-pressed="${!!on}">${on?"✓ ":""}${esc(rot)}</button>`;
  const ex=atd.exModelo||"sis", sis=new Set(atSis(it));
  const destAtual=atd.destino??atdDestinoPadrao(it||{});
  const volte=atVolte(it);
  const unid=it?cur(it,"unidade"):"";
  el.innerHTML=`
  ${it?renderAlarme(it):""}
  <div class="sec atsec" id="atHdaSec"><div class="sec-h"><h3>1. História</h3></div><div class="atbody">
    ${ta("hma","Queixa e história da doença atual","ex.: dor de garganta há 2 dias, sem tosse")}
    <div class="atdgrid">${inp("alergia","Alergias","ex.: dipirona; ou escreva nega")}${inp("ap","Comorbidades","ex.: hipertensão, diabetes")}${inp("muc","Medicamentos em uso","ex.: losartana 50 mg")}</div>
    ${it?renderChecklist(it):""}
    ${atSaida("hda","História (HDA)")}</div></div>
  <div class="sec atsec"><div class="sec-h"><h3>2. Exame físico</h3></div><div class="atbody">
    <div class="atdsv">${inp("pa","PA","120x80")}${inp("fc","FC","",1)}${inp("fr","FR","",1)}${inp("sat","Sat O2","",1)}${inp("tax","Temp.","",1)}${inp("hgt","Glicemia","",1)}</div>
    <div class="atdgrid atdnews"><label class="f">Oxigênio<select class="inp" data-atd="o2">${[["","— informar —"],["ar","Ar ambiente"],["o2","Em O2 suplementar"]].map(([v,r])=>`<option value="${v}" ${atd.o2===v?"selected":""}>${r}</option>`).join("")}</select></label>
      <label class="f">Consciência<select class="inp" data-atd="cons">${[["","— informar —"],["A","Alerta"],["C","Confusão nova, voz, dor ou sem resposta"]].map(([v,r])=>`<option value="${v}" ${atd.cons===v?"selected":""}>${r}</option>`).join("")}</select></label>
      <label class="f">Modelo<select class="inp" data-atd="exModelo"><option value="sis" ${ex==="sis"?"selected":""}>Por sistemas (direcionado)</option>${model.exames.map(e=>`<option value="${esc(e.id)}" ${e.id===ex?"selected":""}>Completo: ${esc(e.nome)}</option>`).join("")}</select></label></div>
    <p class="svnews" id="atNews" hidden></p>
    <div class="sec svaviso" id="atAviso" hidden></div>
    ${it&&it.id==="pac"?`<p class="svnews crbres" id="atCrb"></p>`:""}
    ${ex==="sis"?`<div class="chips atsis">${EX_SIS.filter(([k])=>k!=="geral").map(([k,r])=>chip("sis",k,r,sis.has(k))).join("")}</div><p class="note">Sai o estado geral e só os sistemas marcados. Sexo em "Dados do paciente".</p>`:""}
    ${ta("exLivre","Achados (o que estiver alterado)","ex.: estertores crepitantes em base direita")}
    ${atSaida("exame","Exame físico")}</div></div>
  ${unid?`<div class="sec atsec"><div class="sec-h"><h3>3. Na unidade</h3><span class="alsum">para selecionar no prontuário</span></div><div class="atbody">${unidLista(unid)}</div></div>`:""}
  <div class="sec atsec"><div class="sec-h"><h3>4. Diagnóstico</h3></div><div class="atbody">
    ${it&&it.cid?`<button class="cidbig" data-cpcid="${esc(it.cid)}" title="Copiar o CID">CID ${esc(it.cid)} <span>copiar</span></button>`:""}
    ${ta("diag","Outras hipóteses ou complemento","ex.: diagnóstico diferencial com…")}
    ${atSaida("diag","Diagnóstico")}</div></div>
  <div class="sec atsec"><div class="sec-h"><h3>5. Conduta</h3></div><div class="atbody">
    <div class="atdck">${[["casa","Receita"],["unid","Conduta na unidade"],["ori","Orientações"]].map(([k,r])=>`<label class="check"><input type="checkbox" data-atd="${k}" ${atd[k]?"checked":""}> ${r}</label>`).join("")}</div>
    ${atSaida("trat","Conduta")}
    ${it&&cur(it,"casa")?`<div class="actions"><button class="btn" id="atCpRx">Copiar só a receita</button></div>`:""}</div></div>
  <div class="sec atsec"><div class="sec-h"><h3>6. Reavaliação e alta</h3></div><div class="atbody">
    <span class="lbl">Reavaliação</span><div class="chips">${AT_REAV.map(([k,r])=>chip("reav",k,r,atd.reav[k])).join("")}</div>
    ${ta("reavTxt","Como estava na reavaliação (exames, resposta)","ex.: hemograma sem leucocitose; TC sem coleção")}
    <span class="lbl">Orientado sobre</span><div class="chips">${AT_ORI.map(([k,r])=>chip("ori",k,r.split(" (")[0],atd.altaOri[k]!==false)).join("")}</div>
    ${volte.length?`<span class="lbl">Sinais de alarme explicados (toque para tirar)</span><div class="chips atvolte">${volte.map((x,i)=>chip("volte",i,semParenteses(x),!atd.alarOff[i])).join("")}</div>`:""}
    ${ta("altaLivre","Outras orientações dadas (uma por linha)","ex.: retornar em 48 h para reavaliação")}
    <div class="atdgrid"><label class="check"><input type="checkbox" data-atd="compreende" ${atd.compreende?"checked":""}> Compreendeu e concorda</label>
      <label class="f">Destino<select class="inp" data-atd="destino" id="evDestino">${[["","— não incluir —"],...destinos()].map(([v,r])=>`<option value="${esc(v)}" ${destAtual===v?"selected":""}>${esc(r)}</option>`).join("")}</select></label></div>
    ${atSaida("alta","Reavaliação e alta")}
    <div class="hospev" id="atHosp"></div>
    <div class="atdat"><label class="f">Documento<select class="inp" data-atd="tipo">${[["atestado","Atestado"],["comparecimento","Comparecimento"],["nenhum","Nenhum"]].map(([v,r])=>`<option value="${v}" ${atd.tipo===v?"selected":""}>${r}</option>`).join("")}</select></label>
      ${atd.tipo==="atestado"?inp("dias","Dias","0",1):atd.tipo==="comparecimento"?inp("hora","Período","ex.: 14h às 16h"):""}
      ${atd.tipo!=="nenhum"&&it&&it.cid?`<label class="check"><input type="checkbox" data-atd="aut" ${atd.aut?"checked":""}> CID ${esc(it.cid)} autorizado</label>`:""}</div>
    <div id="atAtW">${atSaida("atest","Atestado")}</div></div></div>
  <details class="sec atsec atintern" ${/intern/.test(destAtual)||atd.intern.local?"open":""}><summary class="sec-h"><h3>7. Pedido de internação</h3><span class="alsum">apartamento, semi-intensiva ou UTI</span></summary><div class="atbody">
    <label class="f">Onde<select class="inp" data-atd="intern.local">${AT_LOCAL.map(([v,r])=>`<option value="${v}" ${atd.intern.local===v?"selected":""}>${r}</option>`).join("")}</select></label>
    <div class="atperg"><b>Para escrever a justificativa, responda:</b><ul>${AT_PERGUNTAS.map(p=>`<li>${esc(p)}</li>`).join("")}</ul></div>
    ${ta("motivo","Justificativa (motivo da internação)","ex.: pneumonia com SpO2 89% em ar ambiente e CURB-65 3","intern")}
    <span class="lbl">Objetivo</span><div class="chips">${AT_OBJ.map(([k,r])=>chip("obj",k,r,atd.intern.obj[k])).join("")}</div>
    ${ta("objLivre","Outro objetivo","","intern")}
    ${ta("lab","Exames laboratoriais relevantes (alterados primeiro)","ex.: leucócitos 18.000; PCR 25; creatinina 1,8","intern")}
    ${ta("laudos","Laudos de imagem","ex.: TC de tórax: consolidação em lobo inferior direito","intern")}
    ${ta("feito","O que já foi feito no PS","ex.: ceftriaxona 1 g EV, 1.000 mL de SF","intern")}
    ${ta("parecer","Parecer (especialidade, nome, horário, orientação)","ex.: Cirurgia Geral, Dr. Fulano, 14h20: …","intern")}
    ${typeof hospPac==="function"&&hospPac()&&hospPac().internacao?`<button class="btn hospbtn" id="atCrit">Critérios de internação do hospital</button>`:""}
    ${atSaida("intern","Pedido de internação")}
    <div class="hospev" id="atHospInt"></div></div></details>
  <div class="actions attudo"><button class="btn primary" id="atCpTudo">Copiar tudo</button><span class="note">História, exame, diagnóstico, conduta e alta, nessa ordem.</span></div>`;
  bindEv(it);
}
function atAtualiza(){
  const it=atItem(); pacSnapLogo();
  AT_CAMPOS.forEach(([k])=>{const ta=$(`#atCorpo [data-atout="${k}"]`);if(!ta)return;if(atd.man[k]==null)ta.value=atTexto(k,it);grow(ta);$(`#atCorpo [data-atman="${k}"]`).hidden=atd.man[k]==null});
  const w=$("#atAtW"); if(w) w.hidden=!atTexto("atest",it);
  // NEWS2 e alertas dos sinais vitais (mesmas regras da conduta)
  if(it) atdAvisoAtualiza(it,"#atAviso","#atNews");
  const cb=$("#atCrb"); if(cb){const c=atdCrb();cb.textContent=`CRB-65: ${c.total}${c.faltam.length?" (parcial)":""} — ${c.fx.txt}`;cb.dataset.nv=c.fx.nivel}
  const h=$("#atHosp"); if(h) h.innerHTML=hospEvAviso([atTexto("hda",it),atTexto("exame",it),atTexto("alta",it)].join("\n"));
  const hi=$("#atHospInt"); if(hi) hi.innerHTML=hospEvAviso(atTexto("intern",it)).replace(/<details[\s\S]*<\/details>/,"");
}
function bindEv(it){
  const box=$("#atCorpo");
  box.querySelectorAll("[data-atd]").forEach(el=>{
    const [o,k]=el.dataset.atd.includes(".")?el.dataset.atd.split("."):[null,el.dataset.atd];
    const ev=el.type==="checkbox"||el.tagName==="SELECT"?"change":"input";
    el.addEventListener(ev,()=>{
      const v=el.type==="checkbox"?el.checked:el.value;
      if(o) atd[o][k]=v; else atd[k]=v;
      if(!o&&(k==="exModelo"||k==="tipo"||(k==="destino"&&/intern/.test(v)))){renderEv();return}
      if(el.tagName==="TEXTAREA") grow(el);
      atAtualiza();
    });
  });
  box.querySelectorAll("[data-atchip]").forEach(b=>b.onclick=()=>{
    const g=b.dataset.atchip, k=b.dataset.k;
    if(g==="sis"){const s=new Set(atSis(it));s.has(k)?s.delete(k):s.add(k);atd.sis=EX_SIS.map(x=>x[0]).filter(x=>s.has(x))}
    if(g==="reav") atd.reav[k]=!atd.reav[k];
    if(g==="ori") atd.altaOri[k]=atd.altaOri[k]===false;
    if(g==="volte") atd.alarOff[k]=!atd.alarOff[k];
    if(g==="obj") atd.intern.obj[k]=!atd.intern.obj[k];
    const on=g==="ori"?atd.altaOri[k]!==false:g==="volte"?!atd.alarOff[k]:g==="sis"?atSis(it).includes(k):g==="obj"?atd.intern.obj[k]:atd.reav[k];
    b.setAttribute("aria-pressed",!!on); b.textContent=(on?"✓ ":"")+b.textContent.replace(/^✓ /,"");
    atAtualiza();
  });
  box.querySelectorAll("[data-atout]").forEach(ta=>ta.addEventListener("input",()=>{atd.man[ta.dataset.atout]=ta.value;grow(ta);$(`#atCorpo [data-atman="${ta.dataset.atout}"]`).hidden=false}));
  box.querySelectorAll("[data-atre]").forEach(b=>b.onclick=()=>{delete atd.man[b.dataset.atre];atAtualiza()});
  box.querySelectorAll("[data-atcp]").forEach(b=>b.onclick=()=>{const t=$(`#atCorpo [data-atout="${b.dataset.atcp}"]`).value;if(!t.trim()){toast("Campo vazio");return}copy(t,b)});
  const cid=box.querySelector("[data-cpcid]"); if(cid) cid.onclick=()=>copy(cid.dataset.cpcid,cid);
  if($("#atCpRx")) $("#atCpRx").onclick=e=>copy(cur(it,"casa"),e.currentTarget);
  if($("#atCrit")) $("#atCrit").onclick=()=>abrirHospInt((hospPac().internacao.doencas||[]).find(d=>(d.condutas||[]).includes(it&&it.id))?.id);
  $("#atCpTudo").onclick=e=>copy(buildEv(),e.currentTarget);
  if(it) bindChecklist(it,"#atCorpo",()=>{renderEv();renderDetail()});
  linkMeds(box);
  atAtualiza();
}
// abre o Atendimento já com a conduta escolhida
function atAbrir(id){if(id&&$("#evCond").value!==id){$("#evCond").value=id;atd.sis=null}setTab("evolucao");window.scrollTo({top:0})}
$("#evCond").addEventListener("change",()=>{atd.sis=null;atd.alarOff={};renderEv();pacSnap()});
$("#atVerConduta").onclick=()=>{const it=atItem();if(it)abrirConduta(it.id);else setTab("prescricoes")};
bindNovoPaciente($("#atNovo"));
$("#atLista").onclick=()=>{pacSnap();setTab("pacientes")};

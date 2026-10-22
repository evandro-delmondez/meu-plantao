/* ---------- Atendimento (aba "evolucao"): uma tela na ordem do prontuário, cada campo com a sua cópia ----------
   Tudo do paciente fica no objeto atd (08-atendimento.js), só na memória (regra 5); "Novo paciente" limpa.
   Campos, como no prontuário: HDA e antecedentes · Exame físico · Hipótese diagnóstica · Conduta; depois a prescrição
   (na unidade, receituário, atestado), a reavaliação e alta e o pedido de internação. */
// exame físico sempre por sistemas: sai o geral e os sistemas ligados, no texto do perfil (adulto, pediátrico, gestante)
// e do sexo escolhidos no Atendimento; f = feminino
const EX_SIS=[["geral","Geral"],["cp","Cabeça e pescoço"],["oro","Orofaringe"],["cv","Cardiovascular"],["resp","Respiratório"],["abd","Abdome"],["neuro","Neurológico"],["msk","Musculoesquelético"],["mmii","Membros inferiores"],["pele","Pele"]];
const EX_PERFIS=[["adulto","Adulto"],["ped","Pediátrico"],["gest","Gestante"]];
const EX_TXT={
 adulto:{
  geral:f=>`Bom estado geral, ${f?"corada, hidratada, acianótica, anictérica e afebril; eupneica":"corado, hidratado, acianótico, anictérico e afebril; eupneico"} em ar ambiente; ${f?"lúcida e orientada":"lúcido e orientado"} no tempo e no espaço.`,
  cp:()=>"Cabeça e pescoço: sem linfonodomegalia cervical palpável; otoscopia com membranas timpânicas íntegras e translúcidas.",
  oro:()=>"Orofaringe: mucosas úmidas; sem hiperemia, exsudato ou abaulamento; amígdalas sem hipertrofia.",
  cv:()=>"Cardiovascular: ritmo cardíaco regular em dois tempos, bulhas normofonéticas, sem sopros audíveis.",
  resp:()=>"Respiratório: murmúrio vesicular presente bilateralmente, sem ruídos adventícios; sem sinais de esforço respiratório.",
  abd:()=>"Abdome: flácido, ruídos hidroaéreos presentes, indolor à palpação superficial e profunda; sinal de Murphy negativo, descompressão brusca negativa, punho-percussão lombar negativa.",
  neuro:()=>"Neurológico: Glasgow 15, sem sinais meníngeos ou déficits focais; pupilas isocóricas e fotorreagentes; sem paralisia facial ou dos membros.",
  msk:()=>"Musculoesquelético: sem deformidades, edema ou crepitação; mobilidade preservada; sem dor à palpação da coluna e das articulações.",
  mmii:()=>"Membros inferiores: sem edemas, sem sinais de trombose venosa profunda, panturrilhas livres, boa perfusão periférica.",
  pele:()=>"Pele: sem lesões, exantemas ou petéquias."},
 ped:{
  geral:f=>`Bom estado geral, ${f?"ativa e reativa, corada, hidratada, acianótica, anictérica":"ativo e reativo, corado, hidratado, acianótico, anictérico"} e afebril; ${f?"eupneica":"eupneico"} em ar ambiente.`,
  cp:()=>"Cabeça e pescoço: fontanela anterior normotensa (lactente); sem linfonodomegalia cervical; otoscopia com membranas timpânicas íntegras e translúcidas.",
  oro:()=>"Orofaringe: sem hiperemia ou exsudato.",
  cv:()=>"Cardiovascular: ritmo cardíaco regular em dois tempos, bulhas normofonéticas, sem sopros; tempo de enchimento capilar menor que 2 segundos.",
  resp:()=>"Respiratório: murmúrio vesicular presente bilateralmente, sem ruídos adventícios; sem tiragens ou batimento de asa nasal.",
  abd:()=>"Abdome: flácido, indolor, sem visceromegalias.",
  pele:()=>"Pele: sem exantemas ou petéquias."},
 gest:{
  geral:()=>"Bom estado geral, corada, hidratada, acianótica, anictérica e afebril; eupneica em ar ambiente; lúcida e orientada no tempo e no espaço.",
  abd:()=>"Abdome: gravídico, útero compatível com a idade gestacional, indolor. Batimentos cardíacos fetais: ___ bpm. Dinâmica uterina ausente.",
  mmii:()=>"Membros inferiores: sem edemas, panturrilhas livres."}
};
// chave do texto no modelo do médico: "geral" e "geral-f" no adulto (como antes), "ped:…" e "gest:…" nos outros perfis
const sisCh=(k,perfil,f)=>(perfil&&perfil!=="adulto"?perfil+":":"")+(k==="geral"&&f&&perfil!=="gest"?"geral-f":k);
function sisPadrao(ch){
  const [perfil,kk]=ch.includes(":")?ch.split(":"):["adulto",ch], f=kk==="geral-f", k=f?"geral":kk;
  return ((EX_TXT[perfil]||{})[k]||EX_TXT.adulto[k])(f);
}
const sisTexto=ch=>(model.sis&&model.sis[ch])||sisPadrao(ch);
const SIS_OPC=EX_PERFIS.flatMap(([p,pr])=>[...(p==="gest"?[["geral","Geral"]]:[["geral","Geral — masculino"],["geral-f","Geral — feminino"]]),...EX_SIS.filter(([k])=>k!=="geral").map(([k,r])=>[k,r])].map(([k,r])=>[(p==="adulto"?"":p+":")+k,`${pr}: ${r}`]));
// sistemas que já vêm ligados: pela conduta, senão pela categoria
const EX_SIS_COND={cefaleia:["neuro","cp"],enxaqueca:["neuro","cp"],salvas:["neuro","cp"],vertigem:["neuro","cp","cv"],convulsao:["neuro"],avc:["neuro","cv"],tce:["neuro","cp"],
  lombalgia:["msk","neuro"],entorse:["msk"],gota:["msk"],"gota-manut":["msk"],dengue:["cv","resp","abd","pele"],sepse:["cp","oro","cv","resp","abd","neuro","pele"],hda:["cv","abd"],
  "dor-abdominal":["abd","cv"],tep:["cv","resp","mmii"],eap:["cv","resp","mmii"],ivc:["mmii","pele"],erisipela:["pele","mmii"],conjuntivite:["cp"],cinetose:["neuro"],amigdalite:["cp","oro"],faringite:["cp","oro"],oma:["cp","oro"],"otite-externa":["cp"],sinusite:["cp","oro"],gripe:["oro","cv","resp"]};
const EX_SIS_CAT={resp:["oro","cv","resp"],orl:["cp","oro"],gi:["abd"],uro:["abd"],gu:["abd"],cardio:["cv","resp","mmii"],dor:["neuro","msk"],pele:["pele"],psi:["neuro"],endo:["cv","neuro"],toxinf:["cv","resp","neuro"],emerg:["cv","resp","neuro"]};
// perfil e sexo do exame: o que o médico escolheu no Atendimento, senão os Dados do paciente
const atPerfil=()=>atd.exPerfil||(pac.gest?"gest":(parseFloat(String(pac.idade||"").replace(",","."))>0&&parseFloat(String(pac.idade).replace(",","."))<12?"ped":"adulto"));
const atFem=()=>atPerfil()==="gest"||(atd.exSexo||pac.sexo)==="F";
const atSisPadrao=it=>it?(EX_SIS_COND[it.id]||EX_SIS_CAT[it.cat]||["cv","resp"]):["cv","resp"];
// mais de uma queixa no mesmo paciente: a conduta principal + até 2 adicionais
const atConds=()=>[atItem(),...(atd.extras||[]).map(getItem)].filter(Boolean).filter((c,i,a)=>a.findIndex(x=>x.id===c.id)===i);
const atSis=it=>atd.sis||[...new Set((atConds().length?atConds():[it]).flatMap(atSisPadrao))];
// junta os textos das condutas sem repetir o mesmo remédio (pelo nome no início do item) e renumera
function atJunta(f){
  const tx=atConds().map(c=>cur(c,f)).filter(t=>t&&t.trim());
  if(tx.length<2) return tx[0]||"";
  const vistos=new Set(), out=[]; let n=0, pula=false;
  const chave=l=>norm(l.replace(/^\s*\d+\)\s*/,"")).split(/[\s,(]+/).slice(0,1).join(" ");
  for(const t of tx){ if(out.length) out.push("");
    for(const l of t.split("\n")){
      if(/^\s*\d+\)\s/.test(l)){const k=chave(l);pula=vistos.has(k);if(!pula){vistos.add(k);out.push(l.replace(/^(\s*)\d+\)/,(m,e)=>`${e}${++n})`))}continue}
      if(!l.trim()){pula=false;out.push(l);continue}
      if(pula) continue;
      if(f==="orient"&&out.includes(l)) continue;
      out.push(l);
    }}
  return out.join("\n").replace(/\n{3,}/g,"\n\n").trim();
}
// lista em português: "a, b e c"
const ptLista=a=>a.length<2?(a[0]||""):a.slice(0,-1).join(", ")+" e "+a[a.length-1];
// a alta registra o que foi explicado (proteção do médico e do paciente)
const AT_ORI=[["dx","o diagnóstico"],["med","a medicação prescrita (posologia, forma de uso e efeitos adversos)"],["evol","a evolução esperada"],["rep","repouso e hidratação"],["seg","o seguimento ambulatorial"]];
const AT_REAV=[["melhora","com melhora após a medicação na unidade"],["estavel","clinicamente estável"],["semmelhora","sem melhora após a medicação"],["exames","com os seguintes resultados de exames"]];
// nomes dos leitos: o hospital do pacote pode chamar a semi-intensiva de outro jeito (internacao.locais)
const atLocais=()=>{const n=(typeof hospAtivo==="function"&&hospAtivo()&&hospPac().internacao&&hospPac().internacao.locais)||{};return [["","— escolher —"],["enfermaria",n.enfermaria||"enfermaria ou apartamento"],["semi",n.semi||"semi-intensiva"],["uti",n.uti||"UTI"]]};
// conduta (campo Conduta do prontuário): o que foi feito, em itens que o médico marca; o detalhe vai na prescrição
const AT_COND=()=>[["explico",(String(model.conduta||"").split("\n")[0]||"").replace(/^\s*-\s*/,"")||"Explico ao paciente o quadro clínico, as hipóteses diagnósticas e a conduta proposta, confirmando a compreensão das orientações."],
  ["med","Prescrevo medicação na unidade"],["sint","Prescrevo sintomáticos para uso domiciliar."],["atb","Prescrevo antibioticoterapia domiciliar."],["reav","Reavaliação após a medicação e o resultado dos exames."],["atest","Forneço atestado médico."]];
const AT_OBJ=[["atb","antibioticoterapia EV"],["suporte","suporte clínico e hidratação EV"],["dor","controle álgico"],["monit","monitorização"],["o2","oxigenoterapia"],["invest","investigação diagnóstica"],["espec","avaliação e conduta da especialidade"]];
const AT_PADRAO=()=>({reav:AT_REAV,ori:AT_ORI,obj:AT_OBJ,perg:AT_PERGUNTAS.map((t,i)=>["p"+i,t]),cond:AT_COND()});
// lista do médico (Editar padrões) ou a padrão; cada item é [chave, texto]
const atL=nome=>{const m=model.atl&&model.atl[nome];return Array.isArray(m)&&m.length?m.map((t,i)=>["u"+i,t]):AT_PADRAO()[nome]};
const AT_PERGUNTAS=["Por que não dá para tratar em casa ou na observação?","Qual critério de gravidade ou de risco o paciente tem (sinal vital, exame, escore)?","O que será feito na internação que exige leito?","Qual o risco se ele receber alta agora?","O que o médico que recebe precisa saber: o plano inicial, o que falta investigar, o parecer pedido?"];

function atItem(){return getItem($("#evCond").value)}
function atSv(){
  const sv=[["PA",atd.pa,"mmHg"],["FC",atd.fc,"bpm"],["FR",atd.fr,"irpm"],["SatO2",atd.sat,"%"],["Tax",atd.tax,"°C"],["HGT",atd.hgt,"mg/dL"]].filter(x=>String(x[1]||"").trim());
  return sv.length?"SSVV: "+sv.map(x=>`${x[0]} ${String(x[1]).trim()}${x[2]==="%"?"%":" "+x[2]}`).join(" | "):"";
}
/* ---- textos de cada campo ---- */
// lista digitada com Enter (ou "- ") sai com traço; campo vazio não vira "nega": só se documenta o que foi perguntado
const atItens=t=>String(t||"").split("\n").map(x=>x.replace(/^\s*[-•#*]\s*/,"").trim()).filter(Boolean);
const atLista=(rot,itens)=>itens.length?`${rot}:\n${itens.map(x=>"- "+x).join("\n")}`:`${rot}: não informado`;
function atHda(it){
  const L=[]; if(atd.hma.trim()) L.push(atd.hma.trim());
  atConds().forEach(c=>chkLinhas(c).hma.forEach(x=>L.push(x)));
  const alerg=atItens(atd.alergia); if(perfisAtivos().has("pnc")&&!alerg.some(x=>/penicilin/i.test(x))) alerg.push("penicilina");
  if(L.length) L.push("");   // espaço entre a história e os antecedentes
  L.push(atLista("HPP",atItens(atd.ap)));
  L.push(atLista("Medicamentos em uso",atItens(atd.muc)));
  L.push(atLista("Alergias",alerg));
  return L.join("\n");
}
function atExameBase(it){
  const pf=atPerfil(), f=atFem(), on=new Set(atSis(it));
  return EX_SIS.filter(([k])=>k==="geral"||on.has(k)).map(([k])=>sisTexto(sisCh(k,pf,f))).join("\n");
}
function atExame(it){
  const L=[], sv=atSv(); if(sv) L.push(sv);
  const n=atdNews(); if(n) L.push(newsLinha(n));
  if(atConds().some(c=>c.id==="pac")&&(n||pac.idade)) L.push(crbLinha(atdCrb()));
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
  atConds().forEach(c=>chkLinhas(c).ex.forEach(x=>L.push(x)));
  if(evScores.length){L.push("Escores:");evScores.forEach(x=>L.push("- "+x))}
  return L.join("\n");
}
const atHip=c=>`${c.nome}${c.cid?` (CID ${c.cid})`:""}`;
// hipótese diagnóstica: só os nomes (o CID é escolhido em outra parte do prontuário)
function atDiag(it){
  const cs=atConds(), extra=atd.diag.trim();
  return [...cs.map(c=>c.nome),...(extra?[extra]:[])].join("\n");
}
// nomes dos itens da prescrição na unidade (ex.: "Dipirona 1 g EV"), para a linha da conduta
// remédios da prescrição na unidade, pelos nomes das fichas do app (na ordem em que aparecem; sem adivinhar o texto)
function atNomesUnid(){
  const t=norm(atJunta("unidade")), achados=[];
  for(const m of (typeof MEDS!=="undefined"?MEDS:[])){
    const nome=String(m.nome||"").replace(/\s*\(.*$/,"").trim(); if(!nome) continue;
    const i=t.search(new RegExp("(^|[^a-z])"+norm(nome).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![a-z])"));
    if(i>=0&&!achados.some(a=>a.n===nome.toLowerCase())) achados.push({i,n:nome.toLowerCase()});
  }
  return achados.sort((a,b)=>a.i-b.i).map(a=>a.n);
}
const atCondOn=k=>k==="explico"?atd.cond[k]!==false:!!atd.cond[k];
function atTrat(it){
  const L=[], pos={};
  for(const [k,t] of atL("cond")){
    if(!atCondOn(k)) continue;
    if(k==="med"){const n=atNomesUnid().filter(x=>atd.medSel[x]);L.push(`- ${t.replace(/\.$/,"")}${n.length?": "+ptLista(n):""}.`)}
    else L.push("- "+t);
    pos[k]=L.length;
  }
  // exames solicitados logo depois da medicação na unidade (ou da explicação ao paciente)
  const lab=atItens(atd.exLab||atd.exSol||""), img=atItens(atd.exImg), ex=[];
  if(lab.length) ex.push(`- Solicito exames laboratoriais: ${lab.join(", ")}.`);
  if(img.length) ex.push(`- Solicito exames de imagem: ${img.join(", ")}.`);
  L.splice(pos.med??pos.explico??0,0,...ex);
  atItens(atd.condLivre).forEach(x=>L.push("- "+x));
  return L.join("\n");
}
// prescrição: na unidade e receituário (com as orientações), para copiar na prescrição e no receituário do prontuário
const atPrescUnid=()=>atJunta("unidade");
function atReceita(){const c=atJunta("casa"), o=atJunta("orient");return [c,o?"Orientações:\n"+o:""].filter(Boolean).join("\n\n")}
const atVolte1=c=>(chkDe(c.id)&&chkDe(c.id).alarme)||(ALTA[c.id]&&ALTA[c.id].volte)||[];
const atVolte=()=>[...new Set(atConds().flatMap(atVolte1))];
function atAlta(it){
  const L=[];
  const rv=atL("reav").filter(([k])=>atd.reav[k]).map(([,t])=>t);
  if(rv.length||atd.reavTxt.trim()) L.push(`- Paciente reavaliado${rv.length?", "+ptLista(rv):""}${atd.reavTxt.trim()?`: ${atd.reavTxt.trim()}`:"."}`.replace(/\.\.$/,"."));
  const ori=atL("ori").filter(([k])=>atd.altaOri[k]!==false).map(([,t])=>t);
  if(ori.length) L.push(`- Paciente orientado sobre ${ptLista(ori)}.`);
  const vt=atVolte(it).filter((x,i)=>!atd.alarOff[i]).map(x=>semParenteses(x).replace(/\.$/,""));
  if(vt.length) L.push(`- Oriento quanto aos sinais de alarme e à necessidade de retorno imediato em caso de piora: ${vt.join("; ")}.`);
  else L.push("- Oriento quanto aos sinais de alarme e à necessidade de retorno imediato em caso de piora.");
  if(atd.altaLivre.trim()) L.push(...atd.altaLivre.trim().split("\n").map(x=>/^\s*-/.test(x)?x:"- "+x));
  if(atd.compreende) L.push("- Paciente compreendeu e concorda com as orientações.");
  const dest=(destinos().find(d=>d[0]===(atd.destino??atdDestinoPadrao(it||{})))||[])[2]; if(dest) L.push(dest);
  return L.join("\n");
}
function atIntern(it){
  const I=atd.intern, L=[];
  const loc=(atLocais().find(x=>x[0]===I.local)||[])[1];
  L.push(`Solicito internação${loc?` em ${loc}`:""}.`);
  if(atConds().length) L.push(atConds().length>1?`Hipóteses diagnósticas: ${atConds().map(atHip).join("; ")}.`:`Hipótese diagnóstica: ${atHip(atConds()[0])}.`);
  if(atd.hma.trim()) L.push(`História: ${atd.hma.trim()}`);
  if(atItens(atd.ap).length) L.push(atLista("HPP",atItens(atd.ap)));
  const sv=atSv(); if(sv) L.push(sv);
  if(I.lab.trim()) L.push(`Exames laboratoriais relevantes: ${I.lab.trim()}`);
  if(I.laudos.trim()) L.push(`Laudos de imagem: ${I.laudos.trim()}`);
  if(I.feito.trim()) L.push(`Conduta no PS: ${I.feito.trim()}`);
  if(I.parecer.trim()) L.push(`Parecer: ${I.parecer.trim()}`);
  L.push(`Justificativa: ${I.motivo.trim()||"___"}`);
  const ob=atL("obj").filter(([k])=>I.obj[k]).map(([,t])=>t);
  if(ob.length||I.objLivre.trim()) L.push(`Objetivo da internação: ${[...ob,I.objLivre.trim()].filter(Boolean).join("; ")}.`);
  return L.join("\n\n");   // um espaço entre os tópicos
}
function atAtestado(it){
  if(atd.tipo==="nenhum"||!(atd.tipo==="comparecimento"||parseInt(atd.dias,10)>0)) return "";
  const sx=ui.sexo,tp=ui.tipo; ui.sexo=pac.sexo; ui.tipo=atd.tipo;
  $("#atCid").value=it&&it.cid||""; $("#atAut").checked=atd.aut; $("#atDias").value=atd.dias||"1"; $("#atHora").value=atd.hora;
  const t=buildAt(); ui.sexo=sx; ui.tipo=tp; return t;
}
const AT_CAMPOS=[["hda","HDA e antecedentes",atHda],["exame","Exame físico",atExame],["diag","Hipótese diagnóstica",atDiag],["trat","Conduta",atTrat],["punid","Prescrição na unidade",atPrescUnid],["rx","Receituário",atReceita],["alta","Reavaliação e alta",atAlta],["intern","Pedido de internação",atIntern],["atest","Atestado",atAtestado]];
const atTexto=(k,it)=>atd.man[k]!=null?atd.man[k]:AT_CAMPOS.find(c=>c[0]===k)[2](it);
// evolução completa (copiar tudo): campos na ordem do prontuário, sem o pedido de internação nem o atestado
function buildEv(){const it=atItem();return ["hda","exame","diag","trat","alta"].map(k=>atTexto(k,it)).filter(x=>x.trim()).join("\n\n")}

/* ---- Editar padrões: tudo o que é fixo no Atendimento vira texto editável, um item por linha ----
   Salva no modelo (backup e nuvem) e nas condutas como "meu padrão": vale para os próximos atendimentos. */
let atEdit=false;
const linhas=t=>String(t||"").split("\n").map(x=>x.trim()).filter(Boolean);
function edTa(attr,rot,valor,orig){
  return `<div class="ated"><div class="atedh"><span class="lbl">${esc(rot)}</span><button class="btn sm" type="button" data-edorig="${esc(orig)}" title="Voltar ao texto original">↺ original</button></div><textarea class="inp" ${attr} rows="${Math.min(10,Math.max(2,String(valor).split("\n").length+1))}" spellcheck="false">${esc(valor)}</textarea></div>`;
}
const edLista=(nome,rot)=>edTa(`data-edl="${nome}"`,rot,atL(nome).map(x=>x[1]).join("\n"),AT_PADRAO()[nome].map(x=>x[1]).join("\n"));
function edChk(c){
  const atual=chkDe(c.id), base=CHECK[c.id]||{}; if(!atual) return "";
  return `<div class="atedg"><b>${esc(c.nome)}: checklist</b>${CHK_GRUPOS.map(([g,n])=>edTa(`data-edc="${esc(c.id)}|${g}"`,n,(atual[g]||[]).join("\n"),(base[g]||[]).join("\n"))).join("")}</div>`;
}
const edTxt=(c,f,rot)=>{const b=baseById[c.id]||c;return edTa(`data-edt="${esc(c.id)}|${f}"`,`${c.nome}: ${rot}`,rxTxt(c[f]||""),rxTxt(b[f]||""))};
function atSalvaPadroes(){
  const box=$("#atCorpo"); let n=0;
  model.atl=Object.assign({},model.atl); model.chk=Object.assign({},model.chk); model.sis=Object.assign({},model.sis);
  box.querySelectorAll("[data-edl]").forEach(t=>{const k=t.dataset.edl,v=linhas(t.value),d=AT_PADRAO()[k].map(x=>x[1]);if(!v.length||v.join("\n")===d.join("\n"))delete model.atl[k];else model.atl[k]=v;n++});
  box.querySelectorAll("[data-edc]").forEach(t=>{const [id,g]=t.dataset.edc.split("|"),v=linhas(t.value),b=(CHECK[id]||{})[g]||[];const m=Object.assign({},model.chk[id]);if(v.join("\n")===b.join("\n"))delete m[g];else m[g]=v;if(Object.keys(m).length)model.chk[id]=m;else delete model.chk[id];n++});
  box.querySelectorAll("[data-eds]").forEach(t=>{const k=t.dataset.eds,v=t.value.trim();if(!v||v===sisPadrao(k))delete model.sis[k];else model.sis[k]=v;n++});
  // textos da conduta viram "meu padrão" (como "Salvar como meu padrão" na conduta)
  const porId={};
  box.querySelectorAll("[data-edt]").forEach(t=>{const [id,f]=t.dataset.edt.split("|");const it=getItem(id);if(!it||t.value===rxTxt(it[f]||""))return;(porId[id]=porId[id]||{})[f]=t.value});
  for(const id in porId){const it=getItem(id);const base={nome:it.nome,cat:it.cat,cid:it.cid,sin:it.sin,casa:it.casa,unidade:it.unidade,orient:it.orient};if(it.custom&&it.fontes)base.fontes=it.fontes;Object.assign(base,porId[id]);writeOverride(id,base);delete sess[id];n++}
  saveModel(); atEdit=false; renderList(); fillSelects(); renderEv(); toast("Padrões salvos: valem nos próximos atendimentos");
}

// atendimento começado pela queixa da triagem: alarmes, o que perguntar e os caminhos até a conduta
function atQueixaHTML(temConduta){
  const q=atd.queixa&&QUEIXAS.find(x=>x.id===atd.queixa); if(!q) return "";
  const cam=(q.caminhos||[]).filter(c=>c.conduta&&getItem(c.conduta));
  // os caminhos vêm primeiro (é a decisão); alarmes e o que perguntar logo abaixo
  return `<details class="sec atqueixa" ${temConduta?"":"open"}><summary class="sec-h"><h3>Queixa: ${esc(q.nome)}</h3><span class="alsum">${temConduta?"trocar o caminho, ver alarmes":"escolha o caminho"}</span></summary><div class="atbody">
    <span class="lbl">Caminhos</span><div class="qcams">${cam.map(c=>`<button class="qcam" data-atcam="${esc(c.conduta)}" aria-pressed="${$("#evCond").value===c.conduta}"><span>${esc(c.rot)}</span><span class="qir">${$("#evCond").value===c.conduta?"✓":"usar →"}</span></button>`).join("")}</div>
    <span class="lbl">Sinais de alarme: não é verde</span>
    <ul class="qal">${q.alarme.map(a=>`<li><b>${esc(a.t)}</b><span>${esc(a.acao)}</span></li>`).join("")}</ul>
    ${(q.perguntar||[]).length?`<details><summary class="lbl">Perguntar e examinar</summary><ul class="qlist">${q.perguntar.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></details>`:""}</div></details>`;
}

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
  const pf=atPerfil(), sis=new Set(atSis(it));
  const ks=[...(atd.queixa?["q:"+atd.queixa]:[]),...atConds().map(c=>c.id)].filter(k=>typeof exDe==="function"&&exDe(k));
  const destAtual=atd.destino??atdDestinoPadrao(it||{});
  const volte=atVolte(it);
  const cs=atConds();
  const unidH=cs.map(c=>{const u=cur(c,"unidade");return u?`${cs.length>1?`<h4 class="atcond">${esc(c.nome)}</h4>`:""}${unidLista(u)}`:""}).join("");
  const outras=(atd.extras||[]).map(getItem).filter(Boolean);
  el.innerHTML=`
  <div class="ateditbar">${atEdit?`<span class="note">Editando os padrões. Vale para os próximos atendimentos.</span><button class="btn primary" id="atEdSalva">Salvar como padrão</button><button class="btn" id="atEdSai">Cancelar</button>`:`<button class="btn sm" id="atEdita">✎ Editar padrões</button>`}</div>
  ${it?`<div class="atextras"><span class="lbl">Outras queixas no mesmo paciente</span><div class="chips">${outras.map(c=>`<button class="chip" data-atrem="${esc(c.id)}" aria-pressed="true" style="--c:var(--${(CATS[c.cat]||CATS.outros).cor})">✓ ${esc(c.nome)} ✕</button>`).join("")}
    ${outras.length<2?`<select class="inp atadd" id="atAdd" aria-label="Adicionar outra conduta"><option value="">+ Adicionar outra conduta</option>${allItems().filter(x=>!cs.some(c=>c.id===x.id)).map(x=>`<option value="${esc(x.id)}">${esc(x.nome)}</option>`).join("")}</select>`:""}</div></div>`:""}
  ${cs.length?`<div class="atconds">${cs.map(c=>{const k=CATS[c.cat]||CATS.outros;return `<span class="cat" style="--c:var(--${k.cor})"><span class="dot"></span>${esc(c.nome)}${c.cid?` · ${esc(c.cid)}`:""}</span>`}).join("")}</div>`:""}
  ${atQueixaHTML(!!it)}
  ${cs.map(renderAlarme).join("")}
  <div class="sec atsec" id="atHdaSec"><div class="sec-h"><h3>1. HDA e antecedentes</h3></div><div class="atbody">
    ${ta("hma","Queixa e história da doença atual","ex.: dor de garganta há 2 dias, sem tosse")}
    <div class="atdgrid atlistas">${ta("ap","HPP (doenças, cirurgias, internações)","ex.: hipertensão arterial\ncolecistectomia em 2019")}${ta("muc","Medicamentos em uso","ex.: losartana 50 mg 1x ao dia")}${ta("alergia","Alergias","ex.: dipirona; ou nega")}</div>
    ${cs.map((c,i)=>`<div id="atChk${i}">${cs.length>1&&chkDe(c.id)?`<h4 class="atcond">${esc(c.nome)}</h4>`:""}${renderChecklist(c)}</div>`).join("")}
    ${atEdit?cs.map(edChk).join(""):""}
    ${atSaida("hda","HDA e antecedentes")}</div></div>
  <div class="sec atsec"><div class="sec-h"><h3>2. Exame físico</h3></div><div class="atbody">
    <div class="atdsv">${inp("pa","PA","120x80")}${inp("fc","FC","",1)}${inp("fr","FR","",1)}${inp("sat","Sat O2","",1)}${inp("tax","Temp.","",1)}${inp("hgt","Glicemia","",1)}</div>
    <div class="atdgrid atdnews"><label class="f">Oxigênio<select class="inp" data-atd="o2">${[["","— informar —"],["ar","Ar ambiente"],["o2","Em O2 suplementar"]].map(([v,r])=>`<option value="${v}" ${atd.o2===v?"selected":""}>${r}</option>`).join("")}</select></label>
      <label class="f">Consciência<select class="inp" data-atd="cons">${[["","— informar —"],["A","Alerta"],["C","Confusão nova, voz, dor ou sem resposta"]].map(([v,r])=>`<option value="${v}" ${atd.cons===v?"selected":""}>${r}</option>`).join("")}</select></label></div>
    <p class="svnews" id="atNews" hidden></p>
    <div class="sec svaviso" id="atAviso" hidden></div>
    ${cs.some(c=>c.id==="pac")?`<p class="svnews crbres" id="atCrb"></p>`:""}
    <div class="atsegs"><div class="seg" role="group" aria-label="Sexo">${[["M","Masculino"],["F","Feminino"]].map(([v,r])=>`<button data-atseg="exSexo" data-v="${v}" aria-pressed="${(atd.exSexo||pac.sexo)===v&&pf!=="gest"}" ${pf==="gest"?"disabled":""}>${r}</button>`).join("")}</div>
      <div class="seg" role="group" aria-label="Perfil">${EX_PERFIS.map(([v,r])=>`<button data-atseg="exPerfil" data-v="${v}" aria-pressed="${pf===v}">${r}</button>`).join("")}</div></div>
    <div class="chips atsis">${EX_SIS.filter(([k])=>k!=="geral").map(([k,r])=>chip("sis",k,r,sis.has(k))).join("")}</div>
    ${atEdit?`<div class="atedg"><b>Texto de cada sistema (${esc((EX_PERFIS.find(x=>x[0]===pf)||[])[1])})</b>${["geral",...sis].map(k=>{const ch=sisCh(k,pf,atFem());return edTa(`data-eds="${ch}"`,(SIS_OPC.find(x=>x[0]===ch)||[0,ch])[1],sisTexto(ch),sisPadrao(ch))}).join("")}</div>`:""}
    ${ta("exLivre","Achados (o que estiver alterado)","ex.: estertores crepitantes em base direita")}
    ${atSaida("exame","Exame físico")}</div></div>
  <div class="sec atsec"><div class="sec-h"><h3>3. Hipótese diagnóstica</h3></div><div class="atbody">
    <div class="atcids">${cs.filter(c=>c.cid).map(c=>`<button class="cidbig" data-cpcid="${esc(c.cid)}" title="Copiar o CID de ${esc(c.nome)}">CID ${esc(c.cid)} <span>copiar</span></button>`).join("")}</div>
    ${ta("diag","Outras hipóteses ou complemento","ex.: diagnóstico diferencial com…")}
    ${atSaida("diag","Hipótese diagnóstica")}</div></div>
  <div class="sec atsec"><div class="sec-h"><h3>4. Conduta</h3></div><div class="atbody">
    <div class="chips atcond">${atL("cond").map(([k,r])=>chip("cond",k,k==="explico"?"Explico o quadro e a conduta":r.replace(/\.$/,""),atCondOn(k))).join("")}</div>
    ${atCondOn("med")&&atNomesUnid().length?`<span class="lbl">Quais remédios (toque nos que foram feitos)</span><div class="chips atmeds">${atNomesUnid().map(n=>chip("medsel",n,n,atd.medSel[n])).join("")}</div>`:""}
    ${ks.length?`<div class="atexs">${ks.map(k=>exHTML(k,{titulo:k.startsWith("q:")?"Exames pela queixa: "+((QUEIXAS.find(q=>"q:"+q.id===k)||{}).nome||""):"Exames: "+((getItem(k)||{}).nome||"")})).join("")}</div>`:""}
    <div class="atdgrid">${ta("exLab","Exames laboratoriais","ex.: hemograma\nPCR\nureia e creatinina")}${ta("exImg","Exames de imagem","ex.: TC de abdome com contraste")}</div>
    ${ta("condLivre","Outras condutas","ex.: solicito parecer da Cirurgia Geral")}
    ${atEdit?edLista("cond","Itens da conduta"):""}
    ${atSaida("trat","Conduta")}</div></div>
  <div class="sec atsec"><div class="sec-h"><h3>5. Prescrição</h3><span class="alsum">na unidade · receituário · atestado</span></div><div class="atbody">
    ${unidH?`<div class="atunid"><span class="lbl">Na unidade (para selecionar no prontuário)</span>${unidH}</div>`:""}
    ${atEdit?cs.map(c=>edTxt(c,"unidade","na unidade")+edTxt(c,"casa","receita")+edTxt(c,"orient","orientações")).join(""):""}
    ${unidH?atSaida("punid","Prescrição na unidade"):""}
    ${cs.map(rxAvisoHTML).join("")}
    ${atJunta("casa")||atJunta("orient")?atSaida("rx","Receituário"):""}
    <div class="atdat"><label class="f">Documento<select class="inp" data-atd="tipo">${[["atestado","Atestado"],["comparecimento","Comparecimento"],["nenhum","Nenhum"]].map(([v,r])=>`<option value="${v}" ${atd.tipo===v?"selected":""}>${r}</option>`).join("")}</select></label>
      ${atd.tipo==="atestado"?inp("dias","Dias","0",1):atd.tipo==="comparecimento"?inp("hora","Período","ex.: 14h às 16h"):""}
      ${atd.tipo!=="nenhum"&&it&&it.cid?`<label class="check"><input type="checkbox" data-atd="aut" ${atd.aut?"checked":""}> CID ${esc(it.cid)} autorizado</label>`:""}</div>
    <div id="atAtW">${atSaida("atest","Atestado")}</div></div></div>
  <div class="sec atsec"><div class="sec-h"><h3>6. Reavaliação e alta</h3></div><div class="atbody">
    <span class="lbl">Reavaliação</span><div class="chips">${atL("reav").map(([k,r])=>chip("reav",k,r,atd.reav[k])).join("")}</div>
    ${ta("reavTxt","Resultados de exames e resposta ao tratamento","ex.: hemograma sem leucocitose; TC sem coleção")}
    <span class="lbl">Orientado sobre</span><div class="chips">${atL("ori").map(([k,r])=>chip("ori",k,r.split(" (")[0],atd.altaOri[k]!==false)).join("")}</div>
    ${volte.length?`<span class="lbl">Sinais de alarme explicados (toque para tirar)</span><div class="chips atvolte">${volte.map((x,i)=>chip("volte",i,semParenteses(x),!atd.alarOff[i])).join("")}</div>`:""}
    ${atEdit?edLista("reav","Reavaliação")+edLista("ori","Orientado sobre")+`<p class="note">Os sinais de alarme da alta são os do checklist (edite na HDA).</p>`:""}
    ${ta("altaLivre","Outras orientações dadas","ex.: retornar em 48 h para reavaliação")}
    <div class="atdgrid"><label class="check"><input type="checkbox" data-atd="compreende" ${atd.compreende?"checked":""}> Compreendeu e concorda</label>
      <label class="f">Destino<select class="inp" data-atd="destino" id="evDestino">${[["","— não incluir —"],...destinos()].map(([v,r])=>`<option value="${esc(v)}" ${destAtual===v?"selected":""}>${esc(r)}</option>`).join("")}</select></label></div>
    ${atSaida("alta","Reavaliação e alta")}
    <div class="hospev" id="atHosp"></div></div></div>
  <details class="sec atsec atintern" ${/intern/.test(destAtual)||atd.intern.local?"open":""}><summary class="sec-h"><h3>7. Pedido de internação</h3><span class="alsum">${esc(atLocais().slice(1).map(x=>x[1]).join(", "))}</span></summary><div class="atbody">
    <label class="f">Onde<select class="inp" data-atd="intern.local">${atLocais().map(([v,r])=>`<option value="${v}" ${atd.intern.local===v?"selected":""}>${esc(r)}</option>`).join("")}</select></label>
    <div class="atperg"><b>Para escrever a justificativa, responda:</b><ul>${atL("perg").map(([,p])=>`<li>${esc(p)}</li>`).join("")}</ul></div>
    ${ta("motivo","Justificativa (motivo da internação)","ex.: pneumonia com SpO2 89% em ar ambiente e CURB-65 3","intern")}
    <span class="lbl">Objetivo</span><div class="chips">${atL("obj").map(([k,r])=>chip("obj",k,r,atd.intern.obj[k])).join("")}</div>
    ${atEdit?edLista("obj","Objetivos")+edLista("perg","Perguntas da justificativa"):""}
    ${ta("objLivre","Outro objetivo","","intern")}
    ${ta("lab","Exames laboratoriais relevantes (alterados primeiro)","ex.: leucócitos 18.000; PCR 25; creatinina 1,8","intern")}
    ${ta("laudos","Laudos de imagem","ex.: TC de tórax: consolidação em lobo inferior direito","intern")}
    ${ta("feito","O que já foi feito no PS","ex.: ceftriaxona 1 g EV, 1.000 mL de SF","intern")}
    ${ta("parecer","Parecer (especialidade, nome, horário, orientação)","ex.: Cirurgia Geral, Dr. Fulano, 14h20: …","intern")}
    ${typeof hospPac==="function"&&hospPac()&&hospPac().internacao?`<button class="btn hospbtn" id="atCrit">Critérios de internação do hospital</button>`:""}
    ${atSaida("intern","Pedido de internação")}
    <div class="hospev" id="atHospInt"></div></div></details>
  <div class="actions attudo"><button class="btn primary" id="atCpTudo">Copiar tudo</button></div>`;
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
      if(!o&&(k==="tipo"||(k==="destino"&&/intern/.test(v)))){renderEv();return}
      if(el.tagName==="TEXTAREA") grow(el);
      atAtualiza();
    });
  });
  box.querySelectorAll("[data-atchip]").forEach(b=>b.onclick=()=>{
    const g=b.dataset.atchip, k=b.dataset.k;
    if(g==="sis"){const s=new Set(atSis(it));s.has(k)?s.delete(k):s.add(k);atd.sis=EX_SIS.map(x=>x[0]).filter(x=>s.has(x));delete atd.man.exame}
    if(g==="cond"){atd.cond[k]=!atCondOn(k);if(k==="med"){renderEv();return}}
    if(g==="medsel") atd.medSel[k]=!atd.medSel[k];
    if(g==="reav") atd.reav[k]=!atd.reav[k];
    if(g==="ori") atd.altaOri[k]=atd.altaOri[k]===false;
    if(g==="volte") atd.alarOff[k]=!atd.alarOff[k];
    if(g==="obj") atd.intern.obj[k]=!atd.intern.obj[k];
    const on=g==="ori"?atd.altaOri[k]!==false:g==="volte"?!atd.alarOff[k]:g==="sis"?atSis(it).includes(k):g==="obj"?atd.intern.obj[k]:g==="cond"?atCondOn(k):g==="medsel"?!!atd.medSel[k]:atd.reav[k];
    b.setAttribute("aria-pressed",!!on); b.textContent=(on?"✓ ":"")+b.textContent.replace(/^✓ /,"");
    atAtualiza();
  });
  // sexo e perfil do exame: refazem o texto do exame (o que foi editado à mão nele é trocado)
  box.querySelectorAll("[data-atseg]").forEach(b=>b.onclick=()=>{atd[b.dataset.atseg]=b.dataset.v;delete atd.man.exame;renderEv()});
  box.querySelectorAll("[data-atout]").forEach(ta=>ta.addEventListener("input",()=>{atd.man[ta.dataset.atout]=ta.value;grow(ta);$(`#atCorpo [data-atman="${ta.dataset.atout}"]`).hidden=false}));
  box.querySelectorAll("[data-atre]").forEach(b=>b.onclick=()=>{delete atd.man[b.dataset.atre];atAtualiza()});
  box.querySelectorAll("[data-atcp]").forEach(b=>b.onclick=()=>{const t=$(`#atCorpo [data-atout="${b.dataset.atcp}"]`).value;if(!t.trim()){toast("Campo vazio");return}copy(t,b)});
  box.querySelectorAll("[data-cpcid]").forEach(cid=>cid.onclick=()=>copy(cid.dataset.cpcid,cid));
  box.querySelectorAll("[data-atrem]").forEach(b=>b.onclick=()=>{atd.extras=atd.extras.filter(x=>x!==b.dataset.atrem);atd.sis=null;atd.alarOff={};renderEv()});
  if($("#atAdd")) $("#atAdd").onchange=e=>{const v=e.target.value;if(!v)return;atd.extras=[...(atd.extras||[]),v].slice(0,2);atd.sis=null;atd.alarOff={};renderEv()};
  if($("#atCrit")) $("#atCrit").onclick=()=>abrirHospInt((hospPac().internacao.doencas||[]).find(d=>(d.condutas||[]).includes(it&&it.id))?.id);
  $("#atCpTudo").onclick=e=>copy(buildEv(),e.currentTarget);
  // escolher o caminho: a tela volta ao topo do Atendimento, já com a conduta
  box.querySelectorAll("[data-atcam]").forEach(b=>b.onclick=()=>{$("#evCond").value=b.dataset.atcam;ui.sel=b.dataset.atcam;atd.sis=null;atd.alarOff={};renderEv();pacSnap();window.scrollTo({top:0,behavior:"smooth"})});
  if($("#atEdita")) $("#atEdita").onclick=()=>{atEdit=true;renderEv()};
  if($("#atEdSai")) $("#atEdSai").onclick=()=>{atEdit=false;renderEv()};
  if($("#atEdSalva")) $("#atEdSalva").onclick=atSalvaPadroes;
  box.querySelectorAll("[data-edorig]").forEach(b=>b.onclick=()=>{const t=b.closest(".ated").querySelector("textarea");t.value=b.dataset.edorig;grow(t)});
  atConds().forEach((c,i)=>bindChecklist(c,"#atChk"+i,()=>{renderEv();renderDetail()}));
  linkMeds(box);
  atAtualiza();
}
// abre o Atendimento já com a conduta escolhida
function atAbrir(id){if(id&&$("#evCond").value!==id){$("#evCond").value=id;atd.sis=null}setTab("evolucao");window.scrollTo({top:0})}
$("#evCond").addEventListener("change",()=>{atd.sis=null;atd.alarOff={};renderEv();pacSnap()});
$("#atVerConduta").onclick=()=>{const it=atItem();if(it)abrirConduta(it.id);else setTab("prescricoes")};
bindNovoPaciente($("#atNovo"));
$("#atLista").onclick=()=>{pacSnap();setTab("pacientes")};

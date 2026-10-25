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
  if(f==="casa") return atJuntaVias(tx);
  // orientações: uma lista só, sem repetir
  if(f==="orient"){const o=[];tx.forEach(t=>t.split("\n").forEach(l=>{if(l.trim()&&!o.includes(l))o.push(l)}));return o.join("\n")}
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
// receita de 2+ condutas: junta por via (todo o uso oral, depois nasal, tópico…), sem repetir remédio, numerada em sequência.
// Rótulos que não são via (ex.: "Antibiótico") ficam antes dos seus remédios, dentro da via.
const atViaDe=(cab,txt)=>{const m=/^uso\s+(.+?):?$/i.exec(cab||"");if(m)return "Uso "+m[1].toLowerCase();
  if(/narina|nasal/i.test(txt))return "Uso nasal";if(/\bVO\b|tomar|dissolver|mastigar|ingerir/i.test(txt))return "Uso oral";
  if(/pomada|creme|pele|t[óo]pic|les[ãa]o/i.test(txt))return "Uso tópico";return null};
function atJuntaVias(tx){
  const chave=l=>norm(l.replace(/^\s*\d+\)\s*/,"")).split(/[\s,(]+/).slice(0,1).join(" ");
  const vias=[], porVia={}, vistos=new Set(), soltos=[];
  for(const t of tx){
    let via="Uso oral", rot=null, item=null, ant="";
    for(const l of t.split("\n")){
      const tr=l.trim();
      if(/^\d+\)\s/.test(tr)){item={l:[tr.replace(/^\d+\)\s*/,"")],k:chave(tr),via,rot,cabVia:true};
        item.pula=vistos.has(item.k);if(!item.pula){vistos.add(item.k);(porVia[via]=porVia[via]||(vias.push(via),[])).push(item)}ant=tr;continue}
      if(!tr){item=null;ant="";continue}
      if(!item||!ant){ // cabeçalho: via ou rótulo
        const v=atViaDe(tr,"");if(v&&/^uso\s/i.test(tr)){via=v;rot=null}else rot=tr;ant=tr;item=null;continue}
      item.l.push(tr); ant=tr;
      // rótulo que não é via: a via sai da instrução (ex.: "Tomar 1 cp VO")
      if(item.rot&&item.l.length===2&&!item.pula){const v=atViaDe(item.rot,tr);if(v&&v!==item.via){const a=porVia[item.via];a.splice(a.indexOf(item),1);if(!a.length){delete porVia[item.via];vias.splice(vias.indexOf(item.via),1)}item.via=v;(porVia[v]=porVia[v]||(vias.push(v),[])).push(item)}}
    }
  }
  let n=0; const out=[];
  for(const v of vias){ if(out.length) out.push(""); out.push(v); let r=null;
    for(const it of porVia[v]){ if(it.rot&&it.rot!==r) out.push(it.rot); r=it.rot; out.push(`${++n}) ${it.l[0]}`,...it.l.slice(1)); } }
  return out.join("\n").trim();
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
  ["med","Prescrevo medicação na unidade"],["lab","Solicito exames laboratoriais"],["img","Solicito exames de imagem"],["sint","Prescrevo sintomáticos para uso domiciliar."],["atb","Prescrevo antibioticoterapia domiciliar."],["reav","Reavaliação após a medicação e o resultado dos exames."],["atest","Forneço atestado médico."]];
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
// HDA em texto corrido: as notas soltas ("dor lombar 3d, piora ao levantar, nega febre") viram frases, e os negativos
// das notas se juntam aos do checklist. Se as notas já estão redigidas (frases com ponto), ficam como estão.
const AT_ABREV=[[/\bc\//gi,"com "],[/\bs\//gi,"sem "],[/\bp\//gi,"para "],[/\bpct\b/gi,"paciente"],[/\btb\b/gi,"também"],[/\bq\b/gi,"que"],[/\bmmii\b/gi,"membros inferiores"],[/\bmmss\b/gi,"membros superiores"],[/\bmid\b/gi,"membro inferior direito"],[/\bmie\b/gi,"membro inferior esquerdo"],[/\birradia\b/gi,"irradiação"]];
const AT_TEMPO=[[/^(d|dia|dias)$/i,"dia","dias"],[/^(h|hs|hr|hrs|hora|horas)$/i,"hora","horas"],[/^(sem|semana|semanas)$/i,"semana","semanas"],[/^(mes|mês|meses)$/i,"mês","meses"],[/^(min|minutos?)$/i,"minuto","minutos"]];
function atTempoTxt(t){
  return t.replace(/(^|\s)(há\s+)?(\d+)\s*(d|dias?|hs?|hrs?|horas?|sem|semanas?|m[eê]s|meses|min|minutos?)(?![\wÀ-ú])/gi,(m,a,ha,n,u)=>{
    const r=AT_TEMPO.find(([re])=>re.test(u)); if(!r) return m; return `${a}há ${n} ${n==="1"?r[1]:r[2]}`});
}
const atMin=t=>/^[A-ZÀ-Ú]{2,}\b/.test(t)?t:t.charAt(0).toLowerCase()+t.slice(1);
const atMai=t=>t.charAt(0).toUpperCase()+t.slice(1);
const AT_NEG=/^(nega(ndo)?|sem|não|nao|n)\s+/i;
// item que começa com verbo no passado (tomou, iniciou, procurou) vira frase própria; o resto completa a queixa
const atVerbo=t=>/^(tomou|usou|fez|procurou|iniciou|evoluiu|evolui|apresentou|apresenta|relata|refere|teve|foi|esteve|veio|procura)\b/i.test(t)||/^[a-zà-ú]+(ou|iu)\b/i.test(t);
function atNotas(txt){
  const t=String(txt||"").trim(); if(!t) return {prosa:"",neg:[]};
  if(/[.!?]\s+[A-ZÀ-Ú]/.test(t)||(/[.!?]$/.test(t)&&t.length>60)) return {prosa:t,neg:[],pronto:true};
  let x=t; AT_ABREV.forEach(([re,v])=>{x=x.replace(re,v)}); x=atTempoTxt(x).replace(/[ \t]{2,}/g," ");
  const itens=x.split(/\s*(?:[;\n]|,(?!\d))\s*/).map(y=>y.trim().replace(/[.]$/,"")).filter(Boolean);
  const neg=[], pos=[], frases=[];
  itens.forEach(i=>{if(AT_NEG.test(i))neg.push(atMin(i.replace(AT_NEG,"")));else if(pos.length&&atVerbo(i))frases.push(atMai(i)+".");else pos.push(atMin(i))});
  let p="";
  if(pos.length){const [q,...c]=pos;p=`Paciente refere ${q}`+(c.length?`, com ${ptLista(c)}`:"")+"."}
  return {prosa:[p,...frases].filter(Boolean).join(" "),neg};
}
function atHda(it){
  const n=atNotas(atd.hma), ck=atConds().map(c=>chkLinhas(c));
  const hp=[...new Set(ck.flatMap(c=>c.raw.hp))], hn=[...new Set([...n.neg,...ck.flatMap(c=>c.raw.hn)])];
  const F=[]; if(n.prosa) F.push(n.prosa);
  if(hp.length) F.push(`Presença de ${ptLista(hp)}.`);
  if(hn.length) F.push(`Nega ${ptLista(hn)}.`);
  // o resto do checklist (antecedentes, sinais de alarme) segue como frase
  ck.forEach(c=>c.hma.filter(x=>!/^(Presença de|Nega) /.test(x)||/^Nega (antecedente|sinais)/.test(x)).forEach(x=>F.push(x)));
  const alerg=atItens(atd.alergia); if(perfisAtivos().has("pnc")&&!alerg.some(x=>/penicilin/i.test(x))) alerg.push("penicilina");
  const L=[]; if(F.length) L.push(F.join(" "),"");   // um parágrafo; espaço antes dos antecedentes
  L.push(atLista("HPP",atItens(atd.ap)));
  L.push(atLista("Medicamentos em uso",atItens(atd.muc)));
  L.push(atLista("Alergias",alerg));
  return L.join("\n");
}
// exame por exceção: nos achados, "abd: dor em FID" troca a linha do abdome (e liga o sistema); o resto vai no fim
const AT_SIS_ALIAS={geral:/^(g|geral|ectoscopia|estado geral|eg|beg)$/,cp:/^(cp|cabe[cç]a|pesco[cç]o|cabe[cç]a e pesco[cç]o|oto|otoscopia)$/,oro:/^(of|oro|orofaringe|garganta)$/,
  cv:/^(cv|acv|ac|cardio|cardiovascular|cora[cç][aã]o)$/,resp:/^(r|resp|ar|ap|pulm[aã]o|pulmonar|respirat[oó]rio)$/,abd:/^(a|abd|abdome|abdomen|abdômen)$/,
  neuro:/^(n|neuro|nrl|neurol[oó]gico)$/,msk:/^(me|msk|osteo|coluna|locomotor|musculoesquel[eé]tico)$/,mmii:/^(mi|mmii|membros inferiores|extremidades|ext)$/,pele:/^(p|pele|tegumento)$/};
function atAchados(){
  const por={}, resto=[];
  String(atd.exLivre||"").split("\n").map(l=>l.trim()).filter(Boolean).forEach(l=>{
    const m=l.match(/^([a-zà-ú ]{1,22}?)\s*:\s*(.+)$/i), k=m&&Object.keys(AT_SIS_ALIAS).find(x=>AT_SIS_ALIAS[x].test(m[1].trim().toLowerCase()));
    if(k){const v=m[2].trim().replace(/([^.])$/,"$1.");por[k]=por[k]?por[k]+" "+v:v}else resto.push(l)});
  return {por,resto};
}
function atExameBase(it){
  const pf=atPerfil(), f=atFem(), on=new Set(atSis(it)), {por}=atAchados();
  return EX_SIS.filter(([k])=>k==="geral"||on.has(k)||por[k]).map(([k,r])=>por[k]?(k==="geral"?atMai(por[k]):`${r}: ${por[k]}`):sisTexto(sisCh(k,pf,f))).join("\n");
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
  const resto=atAchados().resto; if(resto.length) L.push(resto.map(l=>atMai(l).replace(/([^.])$/,"$1.")).join("\n"));
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
// exames: o item liga sozinho quando há exame pedido na Prescrição (e pode ser desligado)
const atCondOn=k=>k==="explico"?atd.cond[k]!==false:(k==="lab"||k==="img")?(atd.cond[k]??atItens(k==="lab"?(atd.exLab||atd.exSol||""):atd.exImg).length>0):!!atd.cond[k];
function atTrat(it){
  const L=[], pos={}, lab=atItens(atd.exLab||atd.exSol||""), img=atItens(atd.exImg);
  for(const [k,t] of atL("cond")){
    if(!atCondOn(k)) continue;
    if(k==="med"){const n=atNomesUnid().filter(x=>atd.medSel[x]);L.push(`- ${t.replace(/\.$/,"")}${n.length?": "+ptLista(n):""}.`)}
    else if(k==="lab"||k==="img"){const l=k==="lab"?lab:img;L.push(`- ${t.replace(/\.$/,"")}${l.length?": "+l.join(", "):""}.`)}
    else L.push("- "+t);
    pos[k]=L.length;
  }
  // lista própria (Editar padrões) sem os itens de exames: entram logo depois da medicação na unidade, como antes
  const ks=new Set(atL("cond").map(([k])=>k)), ex=[];
  if(!ks.has("lab")&&lab.length) ex.push(`- Solicito exames laboratoriais: ${lab.join(", ")}.`);
  if(!ks.has("img")&&img.length) ex.push(`- Solicito exames de imagem: ${img.join(", ")}.`);
  if(ex.length) L.splice(pos.med??pos.explico??0,0,...ex);
  atItens(atd.condLivre).forEach(x=>L.push("- "+x));
  return L.join("\n");
}
// prescrição: na unidade e receituário (com as orientações), para copiar na prescrição e no receituário do prontuário
const atPrescUnid=()=>atJunta("unidade");
function atReceita(){const c=atJunta("casa"), o=atJunta("orient");return [c,o?"Orientações:\n"+o:""].filter(Boolean).join("\n\n")}
const atVolte1=c=>(chkDe(c.id)&&chkDe(c.id).alarme)||(ALTA[c.id]&&ALTA[c.id].volte)||[];
const atVolte=()=>[...new Set(atConds().flatMap(atVolte1))];
// roteiro curto de fala (30 s): o que tem, o que tomar, quando voltar — montado com o que já está na conduta e na receita
function atRoteiro(){
  const cs=atConds(); if(!cs.length) return "";
  const rem=[...new Set([...atReceita().matchAll(/^\s*\d+\)\s*([^-\n]+?)\s*-{2,}/gm)].map(m=>m[1].replace(/\s+\d.*$/,"").trim()))];
  // para falar com o paciente: a lista leiga da alta (ALTA.volte); sem ela, os sinais de alarme do checklist
  const volte=[...new Set(cs.flatMap(c=>(ALTA[c.id]&&ALTA[c.id].volte)||(chkDe(c.id)&&chkDe(c.id).alarme)||[]))].map(semParenteses).slice(0,4);
  return `<div class="atroteiro"><span class="lbl">Roteiro de fala (30 s)</span><ol>
    <li><b>O que você tem:</b> ${esc(ptLista(cs.map(c=>c.nome.split(" / ")[0].toLowerCase())))}.</li>
    ${rem.length?`<li><b>O que tomar:</b> ${esc(ptLista(rem))} — como está na receita.</li>`:""}
    ${volte.length?`<li><b>Volte se:</b> ${esc(ptLista(volte.map(x=>x.charAt(0).toLowerCase()+x.slice(1))))}.</li>`:""}</ol></div>`;
}
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

/* ---- reavaliação: o que ficou pendente (exames pedidos, medicação feita) e a decisão; vai para a lista de pacientes ---- */
const AT_DEC=[["alta","Alta para casa"],["obs","Observação"],["internacao","Internar"],["transferencia","Transferir"]];
const AT_DEC_DEST={alta:"alta",obs:"observacao",internacao:"internacao",transferencia:"transferencia"};
function atPendencias(){
  const o=[], ex=[...atItens(atd.exLab),...atItens(atd.exImg)];
  if(ex.length) o.push(["ex",`Ver os exames: ${ex.join(", ")}`]);
  if(atCondOn("med")){const n=atNomesUnid().filter(x=>atd.medSel[x]);o.push(["med",`Ver como ficou depois da medicação${n.length?` (${ptLista(n)})`:""}`])}
  return o;
}
function atReavHTML(){
  const pend=atPendencias(), dec=atd.decisao;
  return `<div class="atreav">${pend.length?`<span class="lbl">Na reavaliação, ver:</span><div class="atpend">${pend.map(([k,t])=>`<label class="check"><input type="checkbox" data-atvisto="${k}" ${atd.visto[k]?"checked":""}> ${esc(t)}</label>`).join("")}</div>`:""}
    <span class="lbl">Decisão</span><div class="seg atdec" role="group" aria-label="Decisão">${AT_DEC.map(([v,r])=>`<button data-atdec="${v}" aria-pressed="${dec===v}">${r}</button>`).join("")}</div>
    ${dec==="internacao"?`<label class="f">Para onde<select class="inp" data-atd="intern.local">${atLocais().map(([v,r])=>`<option value="${v}" ${atd.intern.local===v?"selected":""}>${esc(r)}</option>`).join("")}</select></label>`:""}</div>`;
}

/* ---- tela ---- */
function atSaida(k,rot){
  return `<div class="atout" data-campo="${k}"><div class="sec-h"><h4>${rot}</h4><span class="atcop" data-atcopok="${k}" hidden>✓ no MV</span><button class="btn sm primary" data-atcp="${k}">Copiar ${rot.split(" (")[0].toLowerCase()}</button></div>
    <textarea class="out-edit" data-atout="${k}" spellcheck="false" aria-label="${rot}"></textarea>
    <p class="note" data-atman="${k}" hidden><span data-atmanmsg>Você editou este campo.</span> <button class="btn sm" data-atre="${k}">Refazer</button></p></div>`;
}
// barra de etapas: vazia, preenchida (falta copiar) ou copiada para o MV (✓); some a 7 se não for internar
const AT_ETAPAS=[[1,"HDA",["hda"]],[2,"Exame",["exame"]],[3,"HD",["diag"]],[4,"Conduta",["trat"]],[5,"Prescrição",["punid","rx","atest"]],[6,"Alta",["alta"]],[7,"Internação",["intern"]]];
const atTem=v=>!!String(v||"").trim();
function atEtapaMexida(n){
  const ck=atConds().some(c=>chk[c.id]&&Object.keys(chk[c.id]).length);
  return [null,
    atTem(atd.hma)||atTem(atd.ap)||atTem(atd.muc)||atTem(atd.alergia)||ck,
    ["pa","fc","fr","sat","tax","hgt","exLivre"].some(k=>atTem(atd[k]))||!!atd.sis,
    atConds().length>0||atTem(atd.diag),
    Object.keys(atd.cond||{}).length>0||atTem(atd.exLab)||atTem(atd.exImg)||atTem(atd.condLivre),
    atCondOn("med")||atTem(atd.dias),
    !!atd.decisao||Object.values(atd.reav||{}).some(Boolean)||atTem(atd.reavTxt),
    atTem(atd.intern.motivo)||atTem(atd.intern.local)][n];
}
function atRelogio(){
  const r=$("#atRelogio"); if(!r) return;
  if(!atd.t0){r.hidden=true;return}
  const seg=Math.max(0,Math.floor((Date.now()-atd.t0)/1000)), min=Math.floor(seg/60), m=atTempoMedia();
  r.hidden=false; r.textContent=`⏱ ${min}:${String(seg%60).padStart(2,"0")}`; const meta=atMeta(); r.dataset.nv=min>=meta?"passou":min>=meta-5?"perto":"";
  r.title=`Meta ${meta} min (toque para mudar)${m?` · média de hoje ${m.media} min (${m.n})`:""}`;
}
setInterval(()=>{if(ui.tab==="evolucao"&&atd.t0)atRelogio()},1000);
function atEtapasAtualiza(){
  const bar=$("#atEtapas"); if(!bar) return;
  if(!atd.t0&&[1,2,4].some(atEtapaMexida)) atd.t0=Date.now();
  atRelogio();
  AT_CAMPOS.forEach(([k])=>{const ta=$(`#atCorpo [data-atout="${k}"]`),ok=$(`#atCorpo [data-atcopok="${k}"]`);if(ta&&ok)ok.hidden=!(atd.cop[k]&&atd.cop[k]===ta.value)});
  const inter=atd.decisao==="internacao"||/intern/.test(atd.destino||"")||atTem(atd.intern.motivo);
  for(const [n,,cs] of AT_ETAPAS){
    const b=bar.querySelector(`[data-atir="${n}"]`); if(!b) continue;
    if(n===7) b.hidden=!inter;
    const tas=cs.map(k=>$(`#atCorpo [data-atout="${k}"]`)).filter(t=>t&&t.value.trim()&&!t.closest("[hidden]")&&!t.closest("details:not([open])"));
    const cop=tas.length&&tas.every(t=>atd.cop[t.dataset.atout]===t.value);
    b.dataset.st=cop?"ok":atEtapaMexida(n)?"meio":"";
    b.title=cop?"Copiado para o MV":b.dataset.st==="meio"?"Preenchido: falta copiar para o MV":"Ainda vazio";
  }
}
const AT_ESTREITA=matchMedia("(max-width:860px)");
AT_ESTREITA.addEventListener?.("change",()=>{if(ui.tab==="evolucao"){const y=window.scrollY;renderEv();window.scrollTo(0,y)}});
// altura do topo fixo, para a barra de etapas ficar logo abaixo
try{const tp=$(".top");if(tp&&window.ResizeObserver)new ResizeObserver(()=>document.documentElement.style.setProperty("--toph",tp.offsetHeight+"px")).observe(tp)}catch(e){}
// marca na barra a etapa que está na tela
addEventListener("scroll",()=>{
  const bar=$("#atEtapas"); if(!bar||ui.tab!=="evolucao") return;
  const lim=bar.getBoundingClientRect().bottom+40; let atual=null;
  $$("#atCorpo [data-etapa]").forEach(s=>{if(s.getBoundingClientRect().top<=lim)atual=s.dataset.etapa});
  bar.querySelectorAll("[data-atir]").forEach(b=>b.toggleAttribute("aria-current",b.dataset.atir===atual));
  $$("#atCorpo [data-etapa]").forEach(x=>x.classList.toggle("atagora",x.dataset.etapa===atual));
},{passive:true});
function atBuscaCond(q,fora){
  const its=allItems().filter(x=>!fora.includes(x.id)), t=norm(String(q||"").trim());
  if(t.length<2){
    const byId=Object.fromEntries(its.map(x=>[x.id,x])), cat=(atItem()||{}).cat, out=[];
    const poe=x=>{if(x&&!out.includes(x))out.push(x)};
    uso.favs.forEach(id=>poe(byId[id]));
    Object.entries(uso.counts).sort((a,b)=>b[1]-a[1]).forEach(([id])=>poe(byId[id]));
    its.filter(x=>x.cat===cat).forEach(poe);
    return out.slice(0,10);
  }
  const ws=t.split(/\s+/), hay=x=>norm([x.nome,x.sin,x.cid,String(x.cid||"").replace(/\./g,""),(CATS[x.cat]||{}).nome].join(" "));
  return its.filter(x=>ws.every(w=>hay(x).includes(w))).sort((a,b)=>(norm(b.nome).startsWith(t)-norm(a.nome).startsWith(t))||a.nome.localeCompare(b.nome)).slice(0,10);
}
// rótulo da conduta que fica preso no alto enquanto você está no trecho dela
const atFixo=c=>{const k=CATS[c.cat]||CATS.outros;return `<h4 class="atcond atfixo" style="--c:var(--${k.cor})"><span class="dot"></span>${esc(c.nome)}${c.cid?` <span class="atfixcid">CID ${esc(c.cid)}</span>`:""}</h4>`};
function renderEv(){
  const el=$("#atCorpo"); if(!el) return;
  // só existe na tela enquanto a aba está aberta (o checklist e os campos não se repetem em outra aba)
  if(ui.tab!=="evolucao"){el.innerHTML="";const v=$(".top .atetapas");if(v)v.remove();return}
  const foco=atFocoGuarda();
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
  <nav class="atetapas" id="atEtapas" aria-label="Etapas do atendimento"><button class="atrel" id="atRelogio" hidden aria-label="Relógio do atendimento: toque para mudar a meta"></button>${AT_ETAPAS.map(([n,r])=>`<button data-atir="${n}"${n===7?' data-int':""}><b>${n}</b> ${r}</button>`).join("")}</nav>
  ${it?`<div class="atextras"><span class="lbl">Outras queixas no mesmo paciente</span><div class="chips">${outras.map(c=>`<button class="chip" data-atrem="${esc(c.id)}" aria-pressed="true" style="--c:var(--${(CATS[c.cat]||CATS.outros).cor})">✓ ${esc(c.nome)} ✕</button>`).join("")}
    ${outras.length<2?`<div class="atbusca"><input class="inp" id="atAddQ" type="search" autocomplete="off" spellcheck="false" placeholder="+ outra conduta: nome, sinônimo ou CID" aria-label="Buscar outra conduta"><div class="atsug" id="atAddSug"></div></div>`:""}</div></div>`:""}
  ${cs.length?`<div class="atconds">${cs.map(c=>{const k=CATS[c.cat]||CATS.outros;return `<span class="cat" style="--c:var(--${k.cor})"><span class="dot"></span>${esc(c.nome)}${c.cid?` · ${esc(c.cid)}`:""}</span>`}).join("")}</div>`:""}
  ${atQueixaHTML(!!it)}
  <div class="sec atsec" data-etapa="1" id="atHdaSec"><div class="sec-h"><h3>1. HDA e antecedentes</h3></div><div class="atbody">
    ${ta("hma","Queixa e HDA (notas soltas: o texto sai corrido)","ex.: dor lombar 3d, piora ao levantar, irradia p/ MID, tomou dipirona s/ melhora, nega febre")}
    <div class="atdgrid atlistas">${ta("ap","HPP (doenças, cirurgias, internações)","ex.: hipertensão arterial\ncolecistectomia em 2019")}${ta("muc","Medicamentos em uso","ex.: losartana 50 mg 1x ao dia")}${ta("alergia","Alergias","ex.: dipirona; ou nega")}</div>
    ${cs.map((c,i)=>`<div id="atChk${i}" class="atbloco">${chkDe(c.id)?atFixo(c):""}${renderChecklist(c)}</div>`).join("")}
    ${atEdit?cs.map(edChk).join(""):""}
    ${atSaida("hda","HDA e antecedentes")}</div></div>
  <div class="sec atsec" data-etapa="2"><div class="sec-h"><h3>2. Exame físico</h3></div><div class="atbody">
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
    ${ta("exLivre","Só o que estiver alterado — sigla e dois pontos troca a linha normal: G, CP, OF, CV, R, A, N, ME, MI, P","ex.: A: dor à palpação em FID, Blumberg positivo\nR: estertores em base direita")}
    ${atSaida("exame","Exame físico")}</div></div>
  <div class="sec atsec" data-etapa="3"><div class="sec-h"><h3>3. Hipótese diagnóstica</h3></div><div class="atbody">
    <div class="atcids">${cs.filter(c=>c.cid).map(c=>`<button class="cidbig" data-cpcid="${esc(c.cid)}" title="Copiar o CID de ${esc(c.nome)}">CID ${esc(c.cid)} <span>copiar</span></button>`).join("")}</div>
    ${ta("diag","Outras hipóteses ou complemento","ex.: diagnóstico diferencial com…")}
    ${atSaida("diag","Hipótese diagnóstica")}</div></div>
  <div class="sec atsec" data-etapa="4"><div class="sec-h"><h3>4. Conduta</h3></div><div class="atbody">
    <div class="chips atcond">${atL("cond").map(([k,r])=>chip("cond",k,k==="explico"?"Explico o quadro e a conduta":r.replace(/\.$/,""),atCondOn(k))).join("")}</div>
    ${atCondOn("med")&&atNomesUnid().length?`<span class="lbl">Quais remédios (toque nos que foram feitos)</span><div class="chips atmeds">${atNomesUnid().map(n=>chip("medsel",n,n,atd.medSel[n])).join("")}</div>`:""}
    ${ta("condLivre","Outras condutas","ex.: solicito parecer da Cirurgia Geral")}
    ${atEdit?edLista("cond","Itens da conduta"):""}
    ${atSaida("trat","Conduta")}</div></div>
  <div class="sec atsec" data-etapa="5"><div class="sec-h"><h3>5. Prescrição</h3><span class="alsum">na unidade · exames · receituário · atestado</span></div><div class="atbody">
    ${unidH?`<div class="atunid"><span class="lbl">Na unidade (para selecionar no prontuário)</span>${unidH}</div>`:""}
    ${atEdit?cs.map(c=>edTxt(c,"unidade","na unidade")+edTxt(c,"casa","receita")+edTxt(c,"orient","orientações")).join(""):""}
    ${unidH?`<details class="atpunid"><summary>Texto da prescrição na unidade (para copiar, se precisar)</summary>${atSaida("punid","Prescrição na unidade")}</details>`:""}
    <span class="lbl atexlbl">Solicitar exames</span>
    ${ks.length?`<div class="atexs">${ks.map((k,i)=>exHTML(k,{pedir:true,aberto:i===0,titulo:k.startsWith("q:")?"Exames pela queixa: "+((QUEIXAS.find(q=>"q:"+q.id===k)||{}).nome||""):"Exames: "+((getItem(k)||{}).nome||"")})).join("")}</div>`:""}
    <div class="atdgrid">${ta("exLab","Exames laboratoriais","ex.: hemograma\nPCR\nureia e creatinina")}${ta("exImg","Exames de imagem","ex.: TC de abdome com contraste")}</div>
    ${cs.map(c=>{const m=renderRxMontar(c);return m?`<div class="atrx atbloco" data-rxc="${esc(c.id)}">${atFixo(c)}${m}</div>`:""}).join("")}
    ${cs.map(rxAvisoHTML).join("")}
    ${atJunta("casa")||atJunta("orient")?atSaida("rx","Receituário"):""}
    <div class="atdat"><label class="f">Documento<select class="inp" data-atd="tipo">${[["atestado","Atestado"],["comparecimento","Comparecimento"],["nenhum","Nenhum"]].map(([v,r])=>`<option value="${v}" ${atd.tipo===v?"selected":""}>${r}</option>`).join("")}</select></label>
      ${atd.tipo==="atestado"?inp("dias","Dias","0",1):atd.tipo==="comparecimento"?inp("hora","Período","ex.: 14h às 16h"):""}
      ${atd.tipo!=="nenhum"&&it&&it.cid?`<label class="check"><input type="checkbox" data-atd="aut" ${atd.aut?"checked":""}> CID ${esc(it.cid)} autorizado</label>`:""}</div>
    <div id="atAtW">${atSaida("atest","Atestado")}</div></div></div>
  <div class="sec atsec" data-etapa="6"><div class="sec-h"><h3>6. Reavaliação e alta</h3></div><div class="atbody">
    ${atReavHTML()}
    ${atRoteiro()}
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
  <details class="sec atsec atintern" data-etapa="7" ${/intern/.test(destAtual)||atd.intern.local?"open":""}><summary class="sec-h"><h3>7. Pedido de internação</h3><span class="alsum">${esc(atLocais().slice(1).map(x=>x[1]).join(", "))}</span></summary><div class="atbody">
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
  // a barra de etapas vai para a linha das abas do topo (fica sempre à vista sem ocupar uma faixa a mais)
  const bar=$("#atCorpo .atetapas"), tabs=$(".top .tabs");
  // na tela estreita (meia tela, celular) o topo não fica fixo: a barra fica no Atendimento, fixa no alto
  if(bar&&tabs){const v=$(".top .atetapas");if(v)v.remove();if(!AT_ESTREITA.matches)tabs.appendChild(bar);atEtapasAtualiza()}
  atFocoVolta(foco);
}
// redesenhar não tira o cursor do campo em que você está digitando
function atFocoGuarda(){
  const a=document.activeElement, box=$("#atCorpo");
  if(!a||!box||!box.contains(a)||!/^(INPUT|TEXTAREA)$/.test(a.tagName)) return null;
  const sel=["data-atd","data-atout","id"].find(x=>a.hasAttribute(x));
  if(!sel) return null;
  let ini=null,fim=null; try{ini=a.selectionStart;fim=a.selectionEnd}catch(e){}
  return {q:`[${sel}="${CSS.escape(a.getAttribute(sel))}"]`,ini,fim};
}
function atFocoVolta(f){
  if(!f) return; const e=$("#atCorpo "+f.q); if(!e) return;
  e.focus({preventScroll:true}); try{if(f.ini!=null)e.setSelectionRange(f.ini,f.fim)}catch(x){}
}
// redesenho que vem de fora (nuvem, outro aparelho): espera você sair do campo
let atRedesenhaDepois=false;
function renderEvSeguro(){
  const a=document.activeElement, box=$("#atCorpo");
  if(ui.tab==="evolucao"&&a&&box&&box.contains(a)&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)){atRedesenhaDepois=true;return}
  renderEv();
}
$("#atCorpo").addEventListener("focusout",()=>setTimeout(()=>{
  if(!atRedesenhaDepois) return; const a=document.activeElement, box=$("#atCorpo");
  if(a&&box.contains(a)&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
  atRedesenhaDepois=false; const y=window.scrollY; renderEv(); window.scrollTo(0,y);
},0));
function atAtualiza(){
  const it=atItem(); pacSnapLogo();
  atdSessaoLogo();
  // texto editado à mão nunca é trocado sozinho: se algo acima mudou depois, avisa e deixa você escolher refazer
  AT_CAMPOS.forEach(([k])=>{const ta=$(`#atCorpo [data-atout="${k}"]`);if(!ta)return;const gerado=atTexto(k,it);
    if(atd.man[k]==null)ta.value=gerado;else if(ta.value!==atd.man[k]&&document.activeElement!==ta)ta.value=atd.man[k];grow(ta);
    const n=$(`#atCorpo [data-atman="${k}"]`);if(!n)return;n.hidden=atd.man[k]==null;
    const velho=atd.man[k]!=null&&(atd.manBase||{})[k]!=null&&atd.manBase[k]!==gerado;n.classList.toggle("atvelho",velho);
    n.querySelector("[data-atmanmsg]").textContent=velho?"Você mudou algo acima depois de editar este texto. O seu texto foi mantido.":"Você editou este campo.";
    n.querySelector("[data-atre]").textContent=velho?"Refazer com as mudanças":"Refazer"});
  const w=$("#atAtW"); if(w) w.hidden=!atTexto("atest",it);
  atEtapasAtualiza();
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
    if(g==="sis"){const s=new Set(atSis(it));s.has(k)?s.delete(k):s.add(k);atd.sis=EX_SIS.map(x=>x[0]).filter(x=>s.has(x))}
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
  // sexo e perfil do exame: refazem o texto do exame (se foi editado à mão, fica e aparece o aviso para refazer)
  box.querySelectorAll("[data-atseg]").forEach(b=>b.onclick=()=>{atd[b.dataset.atseg]=b.dataset.v;renderEv()});
  box.querySelectorAll("[data-atout]").forEach(ta=>ta.addEventListener("input",()=>{const k=ta.dataset.atout;if(atd.man[k]==null){atd.manBase=atd.manBase||{};atd.manBase[k]=atTexto(k,atItem())}atd.man[k]=ta.value;grow(ta);$(`#atCorpo [data-atman="${k}"]`).hidden=false;atdSessaoLogo();pacSnapLogo()}));
  box.querySelectorAll("[data-atre]").forEach(b=>b.onclick=()=>{delete atd.man[b.dataset.atre];if(atd.manBase)delete atd.manBase[b.dataset.atre];atAtualiza()});
  box.querySelectorAll("[data-atcp]").forEach(b=>b.onclick=()=>{const k=b.dataset.atcp,t=$(`#atCorpo [data-atout="${k}"]`).value;if(!t.trim()){toast("Campo vazio");return}copy(t,b).then(ok=>{if(!ok)return;atd.cop[k]=t;atEtapasAtualiza();atdSessaoLogo();pacSnapLogo()})});
  if($("#atRelogio")) $("#atRelogio").onclick=()=>{const v=prompt(`Meta de tempo por atendimento, em minutos.\nO relógio fica amarelo 5 min antes e vermelho ao passar.`,atMeta());if(v==null)return;const n=Math.round(+String(v).replace(",","."));
    if(!(n>=5&&n<=180)){toast("Use de 5 a 180 minutos");return}model.prefs=Object.assign({},model.prefs,{meta:n});saveModel();atRelogio();toast(`Meta: ${n} min por atendimento`)};
  box.querySelectorAll("[data-atir]").forEach(b=>b.onclick=()=>{const sec=$(`#atCorpo [data-etapa="${b.dataset.atir}"]`);if(!sec)return;if(sec.tagName==="DETAILS")sec.open=true;sec.scrollIntoView({behavior:"smooth",block:"start"})});
  box.querySelectorAll("[data-cpcid]").forEach(cid=>cid.onclick=()=>copy(cid.dataset.cpcid,cid));
  box.querySelectorAll("[data-atrem]").forEach(b=>b.onclick=()=>{atd.extras=atd.extras.filter(x=>x!==b.dataset.atrem);atd.sis=null;atd.alarOff={};renderEv()});
  // busca de outra conduta: sem digitar, mostra favoritas, mais usadas e as da mesma área; digitando, acha por nome, sinônimo ou CID
  const aq=$("#atAddQ"), as=$("#atAddSug");
  if(aq){const mostra=()=>{as.innerHTML=atBuscaCond(aq.value,atConds().map(c=>c.id)).map(x=>{const k=CATS[x.cat]||CATS.outros;return `<button class="chip" data-atadd="${esc(x.id)}" style="--c:var(--${k.cor})">${uso.favs.includes(x.id)?"★ ":""}${esc(x.nome)}</button>`}).join("")||`<span class="note">Nada encontrado.</span>`;
      as.querySelectorAll("[data-atadd]").forEach(b=>b.onclick=()=>{atd.extras=[...(atd.extras||[]),b.dataset.atadd].slice(0,2);atd.sis=null;atd.alarOff={};const y=window.scrollY;renderEv();window.scrollTo(0,y)})};
    aq.addEventListener("input",mostra); aq.addEventListener("focus",mostra);
    aq.addEventListener("keydown",e=>{if(e.key==="Enter"){const b=as.querySelector("[data-atadd]");if(b){e.preventDefault();b.click()}}})}
  if($("#atCrit")) $("#atCrit").onclick=()=>abrirHospInt((hospPac().internacao.doencas||[]).find(d=>(d.condutas||[]).includes(it&&it.id))?.id);
  $("#atCpTudo").onclick=async e=>{if(!await copy(buildEv(),e.currentTarget))return;AT_CAMPOS.forEach(([k])=>{const ta=$(`#atCorpo [data-atout="${k}"]`);if(ta&&ta.value.trim())atd.cop[k]=ta.value});atEtapasAtualiza()};
  // escolher o caminho: a tela volta ao topo do Atendimento, já com a conduta
  box.querySelectorAll("[data-atcam]").forEach(b=>b.onclick=()=>{$("#evCond").value=b.dataset.atcam;ui.sel=b.dataset.atcam;atd.sis=null;atd.alarOff={};renderEv();pacSnap();window.scrollTo({top:0,behavior:"smooth"})});
  box.querySelectorAll("[data-atvisto]").forEach(c=>c.onchange=()=>{atd.visto[c.dataset.atvisto]=c.checked;atAtualiza()});
  box.querySelectorAll("[data-atdec]").forEach(b=>b.onclick=()=>{
    atd.decisao=atd.decisao===b.dataset.atdec?null:b.dataset.atdec;
    // a decisão escolhe o destino da alta (se o hospital usa outros nomes, fica o primeiro que existir)
    if(atd.decisao){const d=AT_DEC_DEST[atd.decisao];if(destinos().some(x=>x[0]===d))atd.destino=d}
    const y=window.scrollY; renderEv(); pacSnap(); window.scrollTo(0,y);
  });
  // "+ pedir": o exame vai para o campo de laboratório ou de imagem (e para a Conduta); tocar de novo tira
  box.querySelectorAll("[data-expedir]").forEach(b=>b.onclick=()=>{
    const n=b.dataset.expedir, k=exImagem(n)?"exImg":"exLab", l=atItens(atd[k]), i=l.findIndex(y=>norm(y)===norm(n));
    if(i>=0) l.splice(i,1); else l.push(n);
    atd[k]=l.join("\n"); const y=window.scrollY; renderEv(); window.scrollTo(0,y);
  });
  if($("#atEdita")) $("#atEdita").onclick=()=>{atEdit=true;renderEv()};
  if($("#atEdSai")) $("#atEdSai").onclick=()=>{atEdit=false;renderEv()};
  if($("#atEdSalva")) $("#atEdSalva").onclick=atSalvaPadroes;
  box.querySelectorAll("[data-edorig]").forEach(b=>b.onclick=()=>{const t=b.closest(".ated").querySelector("textarea");t.value=b.dataset.edorig;grow(t)});
  atConds().forEach((c,i)=>bindChecklist(c,"#atChk"+i,()=>{renderEv();renderDetail()}));
  // receituário: escolher alternativas e tirar ou pôr remédios por toque, como na conduta
  box.querySelectorAll(".atrx[data-rxc]").forEach(w=>{const c=getItem(w.dataset.rxc);if(c)bindRxMontar(c,w.querySelector(".rxmontar"),()=>{const y=window.scrollY;renderEv();renderDetail();window.scrollTo(0,y)})});
  linkMeds(box);
  atAtualiza();
}
// abre o Atendimento já com a conduta escolhida
function atAbrir(id){if(id&&$("#evCond").value!==id){$("#evCond").value=id;atd.sis=null}setTab("evolucao");window.scrollTo({top:0})}
$("#evCond").addEventListener("change",()=>{atd.sis=null;atd.alarOff={};renderEv();pacSnap()});
$("#atVerConduta").onclick=()=>{const it=atItem();if(it)abrirConduta(it.id);else setTab("prescricoes")};
bindNovoPaciente($("#atNovo"));
$("#atLista").onclick=()=>{pacSnap();setTab("pacientes")};

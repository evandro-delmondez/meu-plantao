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
  const tx=[...atConds().map(c=>cur(c,f)),...(f==="casa"?atRxExtras():[])].filter(t=>t&&t.trim());
  if(tx.length<2) return tx[0]||"";
  if(f==="casa") return atJuntaVias(tx);
  // orientações: uma lista só, sem repetir
  if(f==="orient"){const o=[];tx.forEach(t=>t.split("\n").forEach(l=>{if(l.trim()&&!o.includes(l))o.push(l)}));return atJuntaVolte(o).join("\n")}
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
// via de um remédio: primeiro pela própria instrução (é o que vale), depois pelo cabeçalho "Uso …"
const atViaDe=(cab,txt)=>{
  const t=String(txt||"");
  if(/vagina|vaginal|aplicador/i.test(t)) return "Uso vaginal";
  if(/narina|nasal/i.test(t)) return "Uso nasal";
  if(/\binala|\bjatos? .*\bboca\b|bombinha|nebuliz|espa[çc]ador/i.test(t)) return "Uso inalatório";
  if(/\bolhos?\b|ocular|col[ií]rio/i.test(t)) return "Uso oftálmico";
  if(/ouvido|otol[oó]gic/i.test(t)) return "Uso otológico";
  if(/\bVO\b|\btomar\b|\btome\b|dissolver|mastigar|ingerir|sublingual|\bSL\b|na boca|gargarej/i.test(t)) return "Uso oral";
  if(/pomada|creme|pele|t[óo]pic|les[ãa]o|les[õo]es|aplicar (na|nas|no|nos|fina)/i.test(t)) return "Uso tópico";
  const m=/^uso\s+(.+?):?$/i.exec(cab||""); if(m) return "Uso "+m[1].toLowerCase();
  return null};
function atJuntaVias(tx){
  const chave=l=>norm(l.replace(/^\s*\d+\)\s*/,"")).split(/[\s,(]+/).slice(0,1).join(" ");
  const itens=[], vistos=new Set();
  for(const t of tx){
    let cab="Uso oral", rot=null, item=null, ant="";
    for(const l of t.split("\n")){
      const tr=l.trim();
      if(/^uso\s/i.test(tr)&&tr.length<40){cab=tr.replace(/:$/,"");rot=null;item=null;ant=tr;continue}   // "Uso …" é sempre cabeçalho
      if(/^\d+\)\s/.test(tr)){item={l:[tr.replace(/^\d+\)\s*/,"")],k:chave(tr),cab,rot};item.pula=vistos.has(item.k);if(!item.pula){vistos.add(item.k);itens.push(item)}ant=tr;continue}
      if(!tr){item=null;ant="";continue}
      if(!item||!ant){rot=tr;ant=tr;item=null;continue}   // rótulo (ex.: "Antibiótico") antes dos seus remédios
      item.l.push(tr); ant=tr;
    }
  }
  // a via sai da instrução do remédio; sem pista, a do cabeçalho
  const vias=[], porVia={};
  for(const it of itens){const v=atViaDe(it.cab,it.l.slice(1).join(" ")+" "+it.l[0])||"Uso oral";(porVia[v]=porVia[v]||(vias.push(v),[])).push(it)}
  let n=0; const out=[];
  for(const v of vias){ if(out.length) out.push(""); out.push(v); let r=null;
    // uma linha em branco entre um remédio e o próximo (mais fácil de o paciente ler)
    porVia[v].forEach((it,k)=>{ if(k) out.push(""); if(it.rot&&it.rot!==r) out.push(it.rot); r=it.rot; out.push(`${++n}) ${it.l[0]}`,...it.l.slice(1)); }); }
  return out.join("\n").trim();
}
// "+ remédio": posologia de receita da ficha (campo receita) e dias escolhidos → quantidade calculada; e "colar de fora"
const AT_VIA={oral:"Uso oral",nasal:"Uso nasal","tópico":"Uso tópico",topico:"Uso tópico","inalatório":"Uso inalatório",inalatorio:"Uso inalatório"};
const rxPad=(nome,q)=>{const n=`${nome} `;return n+"-".repeat(Math.max(3,46-n.length))+" "+q};
let AT_RX_IDX=null;
function atRxIndice(){
  if(AT_RX_IDX) return AT_RX_IDX; const out=[], vistos=new Set();
  for(const c of allItems()){ let via="Uso oral", it=null, ant="";
    for(const l of String(rxTxt(c.casa||"")).split("\n")){const t=l.trim();
      if(/^\d+\)\s/.test(t)){it={nome:t.replace(/^\d+\)\s*/,""),linhas:[],via,cond:c.nome,cid:c.id};const k=norm(it.nome.split(/\s-{2,}/)[0]);if(!vistos.has(k)){vistos.add(k);out.push(it)}else it={linhas:[]};ant=t;continue}
      if(!t){it=null;ant="";continue}
      if(/^uso\s/i.test(t)&&(!it||!ant)){via=t.replace(/:$/,"");it=null;ant=t;continue}
      if(/^(ou\b|#)/i.test(t)){it=null;ant=t;continue}
      if(it&&ant) it.linhas.push(t); ant=t;}}
  return AT_RX_IDX=out;
}
function atRxLinha(e){
  if(e.txt) return `${e.via||"Uso oral"}\n1) ${e.txt}`;
  const m=MEDS.find(x=>x.id===e.id), p=m&&(m.receita||[])[e.i]; if(!p) return "";
  const dias=Math.max(1,+e.dias||p.diasPadrao||1);
  const qtd=p.qtdFixa!=null?p.qtdFixa:p.embalagem!=null?p.embalagem:Math.ceil((p.porTomada||1)*(p.vezesDia||1)*dias*(p.doses||1));
  const inst=String(p.instrucao||"").replace("{dias}",`${dias} ${dias===1?"dia":"dias"}`);
  return `${AT_VIA[p.via]||"Uso oral"}\n1) ${rxPad(p.nome,`${qtd} ${p.unidade||"cp"}`)}\n${inst}`;
}
// texto colado (Whitebook etc.): cada remédio vira item no padrão da receita — "Nome dose ----- qtd" e "Tomar 1 cp VO de 8/8h…"
const RX_INSTR=/\b(tomar|tome|aplicar|aplique|usar|use|dissolver|dissolva|pingar|pingue|instilar|fazer|inalar|mastigar|colocar|coloque|passar|passe|ingerir|administrar|diluir|dilua|gargarejar)\b/i;
function rxCurto(t){
  return String(t).replace(/\bcomprimidos?\b/gi,m=>/s$/i.test(m)?"cp":"cp").replace(/\bc[aá]psulas?\b/gi,"cáps").replace(/\bvia oral\b/gi,"VO").replace(/\bpor via oral\b/gi,"VO")
    .replace(/\bde (\d+) em \1 horas?\b/gi,"de $1/$1h").replace(/\b(\d+)\/(\d+)\s*horas?\b/gi,"$1/$2h").replace(/\b(\d+)\/(\d+)\s*hs?\b/gi,"$1/$2h")
    .replace(/\bvezes ao dia\b/gi,"vezes ao dia").replace(/\s{2,}/g," ").trim().replace(/([^.!?])$/,"$1.");
}
function rxSeparaQtd(nome){
  // "Amoxicilina 500mg, 21 cápsulas" | "Amoxicilina 500 mg — 1 caixa" | "Dipirona 1g (10 comprimidos)" | "Dipirona ---- 10 cp"
  let n=String(nome).replace(/\s*-{2,}\s*/g," ---- ").trim(), q="";
  let m=n.match(/^(.*?)\s*----\s*(.+)$/); if(m) return {n:m[1].trim(),q:rxCurto(m[2]).replace(/\.$/,"")};
  m=n.match(/^(.*?)[,;–—-]\s*(\d+\s*(?:cp|comprimidos?|c[aá]psulas?|cáps|frascos?|fr|caixas?|cx|bisnagas?|ampolas?|envelopes?|sach[eê]s?|flaconetes?|tubos?|unidades?)\b.*)$/i);
  if(!m) m=n.match(/^(.*?)\s*\((\d+\s*(?:cp|comprimidos?|c[aá]psulas?|frascos?|caixas?|bisnagas?|envelopes?|sach[eê]s?|flaconetes?)[^)]*)\)\s*$/i);
  if(m){n=m[1].trim();q=rxCurto(m[2]).replace(/\.$/,"")}
  return {n,q};
}
function atRxCola(t){
  const its=[]; let via="Uso oral";
  for(let l of String(t||"").split("\n")){
    l=l.trim().replace(/^[-•*·▪︎►]\s*/,"").replace(/^posologia:\s*/i,""); if(!l) continue;
    const v=l.match(/^uso\s+(oral|interno|externo|t[oó]pico|nasal|oft[aá]lmico|otol[oó]gico|inalat[oó]rio|retal|vaginal|sublingual)\b\s*:?$/i);
    if(v){via=/interno/i.test(v[1])?"Uso oral":/externo/i.test(v[1])?"Uso tópico":"Uso "+v[1].toLowerCase().replace("topico","tópico");continue}
    const sem=l.replace(/^\d+\s*[).-]\s*/,"");
    const k=sem.search(RX_INSTR);
    const ehItem=!its.length||/^\d+\s*[).-]/.test(l)||(k!==0&&/\d+\s*(mg|g|mcg|ml|ui|%|gotas)(?![a-zà-ú])/i.test(sem));
    if(ehItem){const nome=k>0?sem.slice(0,k).replace(/[,;:–—-]\s*$/,""):sem, inst=k>0?sem.slice(k):"";
      its.push({via:atViaDe("",inst)||via,...rxSeparaQtd(nome),inst:inst?[rxCurto(inst)]:[]})}
    else its[its.length-1].inst.push(rxCurto(sem));
  }
  return its.map(x=>`${x.via}\n1) ${x.q?rxPad(x.n,x.q):x.n}${x.inst.length?"\n"+x.inst.join("\n"):""}`);
}
const atRxExtras=()=>[...(atd.rxExtra||[]).map(atRxLinha),...atRxCola(atd.rxCola)].filter(Boolean);
function atRxMaisHTML(){
  const ex=atd.rxExtra||[];
  return `<div class="atrxmais"><span class="lbl">Acrescentar remédio</span>
    ${ex.map((e,j)=>{if(e.txt) return `<div class="atrxx"><b>${esc(e.txt.split("\n")[0].split(/\s-{2,}/)[0])}</b> <span class="note">da conduta ${esc(e.de||"")}</span><button class="btn sm danger" data-rxtira="${j}">Tirar</button></div>`;
      const m=MEDS.find(x=>x.id===e.id), p=m&&(m.receita||[])[e.i]; if(!p) return "";
      return `<div class="atrxx"><b>${esc(p.nome)}</b> <span class="note">${esc(p.rotulo||"")}</span>
        <label class="atrxd">por <input class="inp" type="number" min="1" max="${p.diasMax||90}" value="${esc(String(e.dias||p.diasPadrao||1))}" data-rxdias="${j}" aria-label="Dias de ${esc(p.nome)}"> dias</label>
        <button class="btn sm" data-rxsalva="${j}" title="Fica como opção desta conduta nos seus padrões">Salvar como opção desta conduta</button><button class="btn sm danger" data-rxtira="${j}">Tirar</button>
        ${p.aviso?`<p class="note atrxav">Para você: ${esc(p.aviso)}</p>`:""}</div>`}).join("")}
    <input class="inp" id="atRxQ" type="text" name="q-remedio-search" autocomplete="off" spellcheck="false" data-1p-ignore data-lpignore="true" placeholder="+ remédio (ex.: dexclorfeniramina, loratadina)" aria-label="Buscar remédio para a receita">
    <div class="atsug" id="atRxSug"></div>
    <details class="atrxcola"${atd.rxCola?" open":""}><summary>Colar de outro guia (ex.: Whitebook)</summary>
      <textarea class="inp" data-atd="rxCola" rows="3" placeholder="cole aqui; cada remédio vira um item da receita">${esc(atd.rxCola||"")}</textarea></details></div>`;
}
// várias condutas: os "Volte imediatamente ao pronto-socorro se …" viram uma frase só, sem repetir sinal
function atJuntaVolte(o){
  const RE=/^(\s*-\s*)?volte imediatamente ao pronto-socorro se (voc[eê] )?(tiver |apresentar |notar |sentir )?/i, idx=o.map((l,i)=>RE.test(l)?i:-1).filter(i=>i>=0);
  if(idx.length<2) return o;
  const itens=[]; idx.forEach(i=>{o[i].replace(RE,"").replace(/\.\s*$/,"").split(/,\s*|\s+ou\s+|\s+e\s+(?=[a-zà-ú])/i).map(x=>x.trim()).filter(Boolean).forEach(x=>{if(!itens.some(y=>norm(y)===norm(x)))itens.push(x)})});
  const pre=(o[idx[0]].match(/^\s*-\s*/)||[""])[0];
  const junta=`${pre}Volte imediatamente ao pronto-socorro se tiver ${itens.slice(0,-1).join(", ")}${itens.length>1?" ou ":""}${itens[itens.length-1]}.`;
  return o.filter((l,i)=>!idx.includes(i)||i===idx[0]).map((l,i,a)=>a.indexOf(l)===a.indexOf(o[idx[0]])&&l===o[idx[0]]?junta:l);
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
  ["med","Prescrevo medicação na unidade"],["lab","Solicito exames laboratoriais"],["img","Solicito exames de imagem"],["sint","Prescrevo sintomáticos para uso domiciliar."],["atb","Prescrevo antibioticoterapia domiciliar."],["reav","Reavaliação após a medicação e o resultado dos exames."]];   // "Forneço atestado médico" entra na alta, sozinho, quando há atestado
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
const AT_ABREV=[[/\bc\//gi,"com "],[/\bs\//gi,"sem "],[/\bp\//gi,"para "],[/\bpct\b/gi,"paciente"],[/\btb\b/gi,"também"],[/\bq\b/gi,"que"],[/\bmmii\b/gi,"membros inferiores"],[/\bmmss\b/gi,"membros superiores"],[/\bmid\b/gi,"membro inferior direito"],[/\bmie\b/gi,"membro inferior esquerdo"],[/\birradia\b/gi,"irradiação"],
  [/\babd\b/gi,"abdominal"],[/\bdps\b/gi,"depois"],[/\bqd\b/gi,"quando"],[/\bqdo\b/gi,"quando"],[/\bpra\b/gi,"para"],[/\bpro\b/gi,"para o"],[/\bhj\b/gi,"hoje"],[/\bpq\b/gi,"porque"],
  [/\bha\b(?=\s*\d)/gi,"há"],[/\bnausea(s?)\b/gi,"náusea$1"],[/\bvomito(s?)\b/gi,"vômito$1"],[/\bdisuria\b/gi,"disúria"],[/\bdiarreia\b/gi,"diarreia"],[/\bcomecou\b/gi,"começou"],
  [/\bsem (apetite|fome)\b/gi,"inapetência"],[/\bfalta de ar\b/gi,"dispneia"]];
const AT_TEMPO=[[/^(d|dia|dias)$/i,"dia","dias"],[/^(h|hs|hr|hrs|hora|horas)$/i,"hora","horas"],[/^(sem|semana|semanas)$/i,"semana","semanas"],[/^(mes|mês|meses)$/i,"mês","meses"],[/^(min|minutos?)$/i,"minuto","minutos"]];
function atTempoTxt(t){
  return t.replace(/(^|\s)(h[aá]\s+)?(\d+)\s*(d|dias?|hs?|hrs?|horas?|sem|semanas?|m[eê]s|meses|min|minutos?)(?![\wÀ-ú])/gi,(m,a,ha,n,u)=>{
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
  const itens=x.split(/\s*(?:[;\n]|,(?!\d))\s*/).flatMap(y=>y.split(/\s+(?=nega\s)/i)).map(y=>y.trim().replace(/[.]$/,"")).filter(Boolean);
  const neg=[], pos=[], frases=[];
  itens.forEach(i=>{if(AT_NEG.test(i))neg.push(atMin(i.replace(AT_NEG,"")));else if(pos.length&&atVerbo(i))frases.push(atMai(i)+".");else pos.push(atMin(i))});
  let p="";
  if(pos.length){const [q,...c]=pos;p=`Paciente refere ${q}`+(c.length?`, com ${ptLista(c)}`:"")+"."}
  return {prosa:[p,...frases].filter(Boolean).join(" "),neg};
}
function atContradicoes(){
  const n=atNotas(atd.hma); if(!n.prosa) return [];
  const pos=norm(n.prosa.replace(/\b(nega|sem|não|nao)\s+[^.,;]*/gi," "));
  return [...new Set(atConds().flatMap(c=>chkLinhas(c).raw.hn))].filter(x=>{const w=norm(x).split(/[\s,()]+/).find(y=>y.length>=4);return w&&new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g,"")}`).test(pos)});
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
// itens de cada sistema (separados por vírgula ou ponto e vírgula): o médico tira o que não examinou
function atClausulas(txt){const m=String(txt).match(/^([^:]{1,40}):\s*(.*)$/s);if(!m)return null;return {rot:m[1],cl:m[2].replace(/\.\s*$/,"").split(/\s*[;,]\s+/).filter(Boolean)}}
function atSisFiltrado(k,txt){
  const off=new Set(((atd.exOff||{})[k])||[]); if(k==="geral"||!off.size) return txt;
  const c=atClausulas(txt); if(!c) return txt;
  const fica=c.cl.filter(x=>!off.has(norm(x))); return fica.length?`${c.rot}: ${fica.join(", ")}.`:"";
}
function atExameBase(it){
  const pf=atPerfil(), f=atFem(), on=new Set(atSis(it)), {por}=atAchados();
  return EX_SIS.filter(([k])=>k==="geral"||on.has(k)||por[k]).map(([k,r])=>por[k]?(k==="geral"?atMai(por[k]):`${r}: ${por[k]}`):atSisFiltrado(k,sisTexto(sisCh(k,pf,f)))).filter(Boolean).join("\n");
}
function atClHTML(it){
  const pf=atPerfil(), f=atFem(), on=atSis(it).filter(k=>k!=="geral"); if(!on.length) return "";
  const {por}=atAchados();
  const linhas=on.filter(k=>!por[k]).map(k=>{const c=atClausulas(sisTexto(sisCh(k,pf,f)));if(!c)return "";const off=new Set(((atd.exOff||{})[k])||[]);
    return `<div class="atcl"><b>${esc(c.rot)}</b>${c.cl.map(x=>`<button class="chip atclc" data-atcl="${k}" data-c="${esc(norm(x))}" aria-pressed="${!off.has(norm(x))}">${esc(x)}</button>`).join("")}</div>`}).join("");
  return linhas?`<details class="atcls" open><summary>O que você examinou (toque para tirar do texto)</summary>${linhas}</details>`:"";
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
  const eg=atd.eg||{};
  if(eg.estado==="regular") exm=exm.replace(/\bBom estado geral/,"Regular estado geral"); else if(eg.estado==="mau") exm=exm.replace(/\bBom estado geral/,"Mau estado geral");
  if(eg.cor) exm=exm.replace(/\bcorad([oa])\b/,"hipocorad$1");
  if(eg.hid) exm=exm.replace(/\bhidratad([oa])\b/,"desidratad$1");
  if(eg.cian) exm=exm.replace(/\bacianótic([oa])\b/,"cianótic$1");
  if(eg.ict) exm=exm.replace(/\banictéric([oa])\b/,"ictéric$1");
  if(eg.feb) exm=exm.replace(/\bafebril\b/,"febril");
  if(eg.disp) exm=exm.replace(/\b(eupneic|taquipneic)([oa])\b/,"dispneic$2"); else if(eg.taqui) exm=exm.replace(/\beupneic([oa])\b/,"taquipneic$1");
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
const AT_UNID_EXTRA=[["Fleet (fosfato de sódio enema)",/\bfleet\b|fosfato de sodio enema/],["clister glicerinado",/clister glicerinado/]];
function atNomesUnid(){
  const t=norm(atJunta("unidade")), achados=[];
  for(const m of (typeof MEDS!=="undefined"?MEDS:[])){
    const nome=String(m.nome||"").replace(/\s*\(.*$/,"").trim(); if(!nome) continue;
    const i=t.search(new RegExp("(^|[^a-z])"+norm(nome).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![a-z])"));
    if(i>=0&&!achados.some(a=>a.n===nome.toLowerCase())) achados.push({i,n:nome.toLowerCase()});
  }
  // feitos na unidade que não têm ficha (ex.: enema): também viram opção para marcar
  for(const [n,re] of AT_UNID_EXTRA){const i=t.search(re);if(i>=0&&!achados.some(a=>a.n===n))achados.push({i,n})}
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
// orientações: o médico tira por toque; pode salvar a escolha como padrão da conduta
const atOriLinhas=()=>{const o=[];atConds().forEach(c=>String(cur(c,"orient")||"").split("\n").forEach(l=>{if(l.trim()&&!o.some(x=>x.l===l))o.push({l,c})}));return o};
function atReceita(){const c=atJunta("casa"), off=atd.oriOff||{}, o=atJunta("orient").split("\n").filter(l=>l.trim()&&!off[norm(l)]).join("\n");return [c,o?"Orientações:\n"+o:""].filter(Boolean).join("\n\n")}
function atOriHTML(){
  const L=atOriLinhas(); if(!L.length) return ""; const off=atd.oriOff||{};
  return `<details class="atori"><summary>Orientações (toque para tirar do receituário)</summary><div class="atorilst">${L.map(({l})=>`<button class="chip atoric" data-atori="${esc(norm(l))}" aria-pressed="${!off[norm(l)]}">${esc(l.replace(/^\s*-\s*/,""))}</button>`).join("")}</div>
    <div class="actions"><button class="btn sm" id="atOriPadrao" title="As orientações que você tirou deixam de aparecer nesta conduta (nos seus padrões, pela nuvem)">Salvar como padrão desta conduta</button></div></details>`;
}
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
function atVolteGrupos(){
  const todos=atVolte(), cs=atConds(), usados=new Set();
  const gs=cs.map(c=>({c:cs.length>1?c:null,itens:atVolte1(c).map(x=>[x,todos.indexOf(x)]).filter(([,i])=>i>=0&&!usados.has(i)&&usados.add(i))})).filter(g=>g.itens.length);
  return gs;
}
function atAlta(it){
  const L=[];
  const rv=atL("reav").filter(([k])=>atd.reav[k]).map(([,t])=>t);
  if(rv.length||atd.reavTxt.trim()) L.push(`- Paciente reavaliado${rv.length?", "+ptLista(rv):""}${atd.reavTxt.trim()?`: ${atd.reavTxt.trim()}`:"."}`.replace(/\.\.$/,"."));
  L.push(...atResultados());
  const ori=atL("ori").filter(([k])=>atd.altaOri[k]!==false).map(([,t])=>t);
  if(ori.length) L.push(`- Paciente orientado sobre ${ptLista(ori)}.`);
  if(atd.altaAtest) L.push("- Forneço atestado médico.");   // logo abaixo do "orientado sobre", acima do destino
  const interna=atd.decisao==="internacao"||/intern/.test(atd.destino||"");
  if(interna) L.push("- Oriento quanto aos sinais de alarme e à necessidade de internação.");
  else {const vt=atVolte(it).filter((x,i)=>!atd.alarOff[i]).map(x=>semParenteses(x).replace(/\.$/,""));
    if(vt.length) L.push(`- Oriento quanto aos sinais de alarme e à necessidade de retorno imediato em caso de piora: ${vt.join("; ")}.`);
    else L.push("- Oriento quanto aos sinais de alarme e à necessidade de retorno imediato em caso de piora.")}
  if(atd.altaLivre.trim()) L.push(...atd.altaLivre.trim().split("\n").map(x=>/^\s*-/.test(x)?x:"- "+x));
  if(atd.compreende) L.push(interna?"- Paciente compreendeu e concorda com a conduta.":"- Paciente compreendeu e concorda com as orientações.");
  const dest=(destinos().find(d=>d[0]===(atd.destino??atdDestinoPadrao(it||{})))||[])[2]; if(dest) L.push(dest);
  return L.join("\n");
}
function atInternAuto(){
  const r=atResultados(), lab=r.filter(l=>/^- Exames laboratoriais/.test(l)).map(l=>l.replace(/^- Exames laboratoriais:?\s*/,"")).join(" ");
  const laudos=r.filter(l=>!/^- Exames laboratoriais/.test(l)).map(l=>l.slice(2)).join(" ");
  const med=atCondOn("med")?atNomesUnid().filter(x=>atd.medSel[x]):[], ex=[...atItens(atd.exLab||atd.exSol||""),...atItens(atd.exImg)];
  const feito=[med.length?`medicação na unidade: ${ptLista(med)}`:"",ex.length?`exames solicitados: ${ex.join(", ")}`:""].filter(Boolean).join("; ");
  return {lab:lab.replace(/^sem alterações\.$/,"sem alterações."),laudos,feito:feito?feito.charAt(0).toUpperCase()+feito.slice(1)+".":""};
}
function atIntern(it){
  const I=atd.intern, L=[];
  // começa pela história e pelo exame físico (o local e a hipótese ficam em outros campos do MV)
  const hda=(atd.man.hda!=null?atd.man.hda:atTexto("hda",it)).trim(); if(hda) L.push(`História: ${hda}`);
  const ex=(atd.man.exame!=null?atd.man.exame:atTexto("exame",it)).trim(); if(ex) L.push(/^Exame físico/i.test(ex)?ex:`Exame físico: ${ex}`);
  // campos vazios puxam da reavaliação (exames alterados e laudos) e do que foi marcado no PS
  const au=atInternAuto(), lab=I.lab.trim()||au.lab, laudos=I.laudos.trim()||au.laudos, feito=I.feito.trim()||au.feito;
  if(lab) L.push(`Exames laboratoriais relevantes: ${lab}`);
  if(laudos) L.push(`Laudos de imagem: ${laudos}`);
  if(feito) L.push(`Conduta no PS: ${feito}`);
  if(I.parecer.trim()) L.push(`Parecer: ${I.parecer.trim()}`);
  L.push(`Justificativa: ${I.motivo.trim()||"___"}`);
  // objetivos em tópicos, um por linha (marcados + sugeridos pela IA e marcados + livre)
  const ob=[...atL("obj").filter(([k])=>I.obj[k]).map(([,t])=>t),...(I.objIa||[]).filter(x=>x.on).map(x=>x.t),...atItens(I.objLivre)];
  if(ob.length) L.push(`Objetivos da internação:\n${ob.map(x=>"- "+x.charAt(0).toUpperCase()+x.slice(1)).join("\n")}`);
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
// resultados de exames na reavaliação: cada exame pedido vira siglas para digitar só o que veio alterado
const AT_SIGLAS=[[/hemograma/,["Hb","Ht","Leuco","Plaq"]],[/hepatograma|fun[cç][aã]o hep/,["TGO","TGP","FA","GGT","BT"]],[/fun[cç][aã]o renal/,["Ur","Cr"]],[/eletr[oó]litos/,["Na","K"]],
  [/\bpcr\b|prote[ií]na c/,["PCR"]],[/ureia/,["Ur"]],[/creatinina/,["Cr"]],[/s[oó]dio/,["Na"]],[/pot[aá]ssio/,["K"]],[/magn[eé]sio/,["Mg"]],[/c[aá]lcio/,["Ca"]],[/glic(emia|ose)/,["Glic"]],
  [/\btgo\b|\bast\b/,["TGO"]],[/\btgp\b|\balt\b/,["TGP"]],[/bilirrubina/,["BT"]],[/amilase/,["Amil"]],[/lipase/,["Lip"]],[/troponina/,["Trop"]],[/ck-?mb/,["CKMB"]],[/\bcpk\b|\bck\b/,["CK"]],
  [/d-?d[ií]mero/,["DD"]],[/lactato/,["Lac"]],[/\btap\b|\btp\b|\binr\b|protrombina/,["INR"]],[/ttpa/,["TTPa"]],[/gasometria/,["pH","pCO2","HCO3"]],[/\beas\b|urina (1|tipo)/,["EAS"]],
  [/beta|hcg/,["BHCG"]],[/procalcitonina/,["PCT"]]];
function atSiglas(){const out=[];atItens(atd.exLab||atd.exSol||"").forEach(n=>{const t=norm(n);const hits=AT_SIGLAS.filter(([re])=>re.test(t)).flatMap(([,sg])=>sg);(hits.length?hits:[n]).forEach(x=>{if(!out.includes(x))out.push(x)})});return out}
function atResultados(){
  const L=[], res=atd.res||{}, sg=atSiglas().filter(x=>String(res[x]||"").trim());
  if(atd.labOk||sg.length) L.push(`- Exames laboratoriais${sg.length?`: ${sg.map(x=>`${x} ${String(res[x]).trim()}`).join("; ")}${atd.labOk?"; demais sem alterações":""}.`:" sem alterações."}`);
  atItens(atd.exImg).forEach((n,i)=>{const t=String((atd.img||{})[i]||"").trim();if(t)L.push(`- ${n}: ${t.replace(/([^.])$/,"$1.")}`);else if((atd.imgOk||{})[i])L.push(`- ${n}: sem alterações.`)});
  return L;
}
function atResHTML(){
  const sg=atSiglas(), img=atItens(atd.exImg); if(!sg.length&&!img.length) return "";
  const res=atd.res||{};
  return `<div class="atres"><span class="lbl">Resultados (digite só o que veio alterado)</span>
    ${sg.length?`<div class="chips"><button class="chip" data-atlabok aria-pressed="${!!atd.labOk}">${atd.labOk?"✓ ":""}Laboratoriais sem (outras) alterações</button></div>
    <details class="atlabcola"><summary>Colar o resultado do laboratório (a IA preenche só as alteradas)</summary>
      <textarea class="inp" id="atLabCola" rows="4" placeholder="cole aqui o texto dos exames do sistema"></textarea>
      <div class="actions"><button class="btn sm primary" id="atLabIa">✨ Preencher as alteradas</button></div><p class="note" id="atLabEst" hidden></p></details>
    <div class="atresg">${sg.map(x=>`<label class="atresf"><span>${esc(x)}</span><input class="inp" data-atres="${esc(x)}" value="${esc(res[x]||"")}" autocomplete="off"></label>`).join("")}</div>`:""}
    ${img.map((n,i)=>`<div class="atimg"><b>${esc(n)}</b><button class="chip" data-atimgok="${i}" aria-pressed="${!!(atd.imgOk||{})[i]}">${(atd.imgOk||{})[i]?"✓ ":""}sem alterações</button>
      <input class="inp" data-atimg="${i}" value="${esc((atd.img||{})[i]||"")}" placeholder="laudo ou impressão diagnóstica" autocomplete="off"></div>`).join("")}</div>`;
}
function atResBind(box){
  const lb=box.querySelector("#atLabIa");
  if(lb) lb.onclick=async()=>{const est=$("#atLabEst"),dz=t=>{est.hidden=false;est.textContent=t}, tx=$("#atLabCola").value.trim();
    if(!iaAtiva()){dz("Ligue a IA em Documentos › Backup.");return} if(!tx){dz("Cole o resultado antes.");return}
    lb.disabled=true; dz("Lendo os resultados…"); const dono=atd;
    try{const r=await iaLab(tx,atSiglas());if(atd!==dono){lb.disabled=false;return}const n=Object.keys(r).length;atd.res=Object.assign({},atd.res,r);
      const rb=$("#atResBox");if(rb){rb.innerHTML=atResHTML();atResBind(rb)};atAtualiza();
      const e2=$("#atLabEst");if(e2){e2.hidden=false;e2.textContent=n?`Preenchido: ${Object.entries(r).map(([k,v])=>`${k} ${v}`).join("; ")}. Confira.`:"Nenhum valor alterado encontrado."}}
    catch(e){if(atd!==dono){lb.disabled=false;return}dz(e.message==="remedio"?`A IA trocou ou acrescentou remédio (${esc(e.det||"")}): mantive o seu texto.`:e.message==="parenteses"?"A IA acrescentou parênteses: mantive o seu texto.":e.message==="tempo"?"A IA demorou demais para responder. Tente de novo.":e.message==="formato"?"A IA respondeu fora do formato. Tente de novo.":/^40[13]/.test(e.message)?"Chave da IA recusada.":"Não consegui falar com a IA agora.")}
    lb.disabled=false};
  box.querySelectorAll("[data-atres]").forEach(i=>i.oninput=()=>{atd.res=Object.assign({},atd.res,{[i.dataset.atres]:i.value});atAtualiza()});
  box.querySelectorAll("[data-atimg]").forEach(i=>i.oninput=()=>{atd.img=Object.assign({},atd.img,{[i.dataset.atimg]:i.value});atAtualiza()});
  const tg=(b,on,rot)=>{b.setAttribute("aria-pressed",on);b.textContent=(on?"✓ ":"")+rot;atAtualiza()};
  box.querySelectorAll("[data-atlabok]").forEach(b=>b.onclick=()=>{atd.labOk=!atd.labOk;tg(b,atd.labOk,"Laboratoriais sem (outras) alterações")});
  box.querySelectorAll("[data-atimgok]").forEach(b=>b.onclick=()=>{atd.imgOk=Object.assign({},atd.imgOk);const k=b.dataset.atimgok;atd.imgOk[k]=!atd.imgOk[k];tg(b,atd.imgOk[k],"sem alterações")});
}
function atReavHTML(){
  const pend=atPendencias(), dec=atd.decisao;
  return `${atd.fechar?`<div class="atfecharbox"><b>Fechar o atendimento</b><ol><li>Veja os resultados e a resposta à medicação.</li><li>Escolha a decisão.</li><li><b>⧉ Próximo</b> (ou F2) copia em sequência: receituário → alta.</li></ol><button class="btn sm" id="atFecharSai">Voltar ao atendimento completo</button></div>`:""}<div class="atreav"><div id="atResBox">${atResHTML()}</div>${pend.length?`<span class="lbl">Na reavaliação, ver:</span><div class="atpend">${pend.map(([k,t])=>`<label class="check"><input type="checkbox" data-atvisto="${k}" ${atd.visto[k]?"checked":""}> ${esc(t)}</label>`).join("")}</div>`:""}
    <span class="lbl">Decisão</span><div class="seg atdec" role="group" aria-label="Decisão">${AT_DEC.map(([v,r])=>`<button data-atdec="${v}" aria-pressed="${dec===v}">${r}</button>`).join("")}</div>
    ${dec==="internacao"?`<label class="f">Para onde<select class="inp" data-atd="intern.local">${atLocais().map(([v,r])=>`<option value="${v}" ${atd.intern.local===v?"selected":""}>${esc(r)}</option>`).join("")}</select></label>`:""}</div>`;
}

/* ---- tela ---- */
function atSaida(k,rot){
  return `<div class="atout" data-campo="${k}"><div class="sec-h"><h4>${rot}</h4><span class="atcop" data-atcopok="${k}" hidden>✓ no MV</span>${["hda","exame","intern"].includes(k)?`<button class="btn sm" data-atia="${k}" title="Corrige e dá coesão, sem inventar nem tirar dados">✨ Melhorar texto (IA)</button>`:""}<button class="btn sm primary" data-atcp="${k}">Copiar ${rot.split(" (")[0].toLowerCase()}</button></div>
    <textarea class="out-edit" data-atout="${k}" spellcheck="false" aria-label="${rot}"></textarea>
    ${["hda","exame","intern"].includes(k)?`<p class="note atiaest" data-atiaest="${k}" ${k==="hda"?'id="atIaEst"':""} hidden></p>`:""}${k==="hda"?`<p class="note atvelho" id="atContra" hidden></p>`:""}
    <p class="note" data-atman="${k}" hidden><span data-atmanmsg>Você editou este campo.</span> <button class="btn sm" data-atre="${k}">Refazer</button></p></div>`;
}
// barra de etapas: vazia, preenchida (falta copiar) ou copiada para o MV (✓); some a 7 se não for internar
const AT_ETAPAS=[[1,"HDA",["hda"]],[2,"Exame",["exame"]],[3,"HD",["diag"]],[4,"Conduta",["trat","rx"]],[5,"Prescrição",["punid"]],[6,"Alta",["alta"]],[7,"Internação",["intern"]]];
const atTem=v=>!!String(v||"").trim();
function atEtapaMexida(n){
  const ck=atConds().some(c=>chk[c.id]&&Object.keys(chk[c.id]).length);
  return [null,
    atTem(atd.hma)||atTem(atd.ap)||atTem(atd.muc)||atTem(atd.alergia)||ck,
    ["pa","fc","fr","sat","tax","hgt","exLivre"].some(k=>atTem(atd[k]))||!!atd.sis,
    atConds().length>0||atTem(atd.diag),
    Object.keys(atd.cond||{}).length>0||atTem(atd.exLab)||atTem(atd.exImg)||atTem(atd.condLivre),
    atCondOn("med")||atTem(atd.exLab)||atTem(atd.exImg),
    atTem(atd.dias)||!!atd.decisao||Object.values(atd.reav||{}).some(Boolean)||atTem(atd.reavTxt),
    atTem(atd.intern.motivo)||atTem(atd.intern.local)][n];
}
function atRelogio(){
  const r=$("#atRelogio"); if(!r) return;
  if(!atd.t0){r.hidden=false;r.textContent="⏱ 0:00";r.dataset.nv="parado";r.title=`Começa quando você põe o nome do paciente (ou preenche algo) e fecha ao chamar o próximo · meta ${atMeta()} min (toque para mudar)`;return}
  const seg=Math.max(0,Math.floor((Date.now()-atd.t0)/1000)), min=Math.floor(seg/60), m=atTempoMedia();
  r.hidden=false; r.textContent=`⏱ ${min}:${String(seg%60).padStart(2,"0")}`; const meta=atMeta(); r.dataset.nv=min>=meta?"passou":min>=meta-5?"perto":"";
  r.title=`Meta ${meta} min (toque para mudar)${m?` · média de hoje ${m.media} min (${m.n})`:""}`;
}
setInterval(()=>{if(ui.tab==="evolucao"&&atd.t0)atRelogio()},1000);
// ordem das etapas: "mv" (HDA primeiro) ou "presc" (HD + CID → prescrição → conduta → HDA → exame → alta); fica nos padrões
const AT_ORDEM_PRESC=[1,5,2,3,4,6,7], AT_ETAPA_DE={hda:1,exame:2,diag:3,trat:4,punid:5,rx:4,atest:6,alta:6,intern:7};
const atOrdem=()=>(model.prefs||{}).ordem==="mv"?"mv":"presc";   // padrão: ordem da porta
const atPos=n=>atOrdem()==="presc"?AT_ORDEM_PRESC.indexOf(+n)+1:+n;
// "Fechar o atendimento" (volta do paciente): o Próximo copia só o que sai na alta
const AT_FECHAR=["rx","alta","intern"];
const AT_COPIA=["hda","exame","diag","trat","punid","rx","alta","intern"];
function atCamposOrdem(){return atd.fechar?AT_FECHAR:AT_COPIA}
function atProximo(){
  for(const k of atCamposOrdem()){const ta=$(`#atCorpo [data-atout="${k}"]`);
    if(!ta||!ta.value.trim()||ta.closest("[hidden]")||ta.closest("details:not([open])")) continue;
    if(atd.cop[k]!==ta.value) return {k,ta,rot:(ta.getAttribute("aria-label")||k)};}
  return null;
}
async function atCopiaProximo(){
  const p=atProximo(), b=$("#atProx"); if(!p){toast("Tudo copiado para o MV");return}
  if(!await copy(p.ta.value,null)) return;
  atd.cop[p.k]=p.ta.value; toast(`Copiado: ${p.rot}`); atEtapasAtualiza(); atdSessaoLogo(); pacSnapLogo();
}
addEventListener("keydown",e=>{if(e.key==="F2"&&ui.tab==="evolucao"){e.preventDefault();atCopiaProximo()}});
function atEtapasAtualiza(){
  const bar=$("#atEtapas"); if(!bar) return;
  if(!atd.t0&&(atPac||[1,2,3,4].some(atEtapaMexida))) atd.t0=Date.now();
  atRelogio();
  AT_CAMPOS.forEach(([k])=>{const ta=$(`#atCorpo [data-atout="${k}"]`),ok=$(`#atCorpo [data-atcopok="${k}"]`);if(ta&&ok)ok.hidden=!(atd.cop[k]&&atd.cop[k]===ta.value)});
  const bp=$("#atProx"); if(bp){const p=atProximo();bp.textContent=p?`⧉ Próximo: ${p.rot.split(" (")[0]}`:"✓ Tudo copiado";bp.disabled=!p}
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
// marca na barra (e na seção) a etapa que está no meio da tela; refeito também depois de cada redesenho
function atMarcaEtapa(){
  const bar=$("#atEtapas"); if(!bar||ui.tab!=="evolucao") return;
  const lim=Math.max(bar.getBoundingClientRect().bottom+40,window.innerHeight*0.45); let atual=null;
  let melhor=-Infinity; $$("#atCorpo [data-etapa]").forEach(x=>{const t=x.getBoundingClientRect().top;if(t<=lim&&t>melhor){melhor=t;atual=x.dataset.etapa}});
  bar.querySelectorAll("[data-atir]").forEach(b=>b.toggleAttribute("aria-current",b.dataset.atir===atual));
  $$("#atCorpo [data-etapa]").forEach(x=>x.classList.toggle("atagora",x.dataset.etapa===atual));
}
addEventListener("scroll",atMarcaEtapa,{passive:true});
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
// sugestões da IA ficam na tela até trocar de paciente (o "+ pedir" redesenha a tela)
let atExSugR=null;
function atExSugHTML(){const r=atExSugR||[];return r.length?`<span class="lbl">Sugeridos pela IA (confira):</span><ul class="atexsugl">${r.map(o=>{const ja=[...atItens(atd.exLab),...atItens(atd.exImg)].some(y=>norm(y)===norm(o.nome));return `<li><button class="expedir" data-expedir="${esc(o.nome)}" aria-pressed="${ja}">${ja?"✓ pedido":"+ pedir"}</button> <b>${esc(o.nome)}</b> <span class="note">${esc(o.por)}</span></li>`}).join("")}</ul>`:`<p class="note">A IA não viu critério para pedir exames com os dados preenchidos.</p>`}
function atExSugBind(bx){bx.querySelectorAll("[data-expedir]").forEach(b=>b.onclick=()=>{const n=b.dataset.expedir,k=exImagem(n)?"exImg":"exLab",l=atItens(atd[k]),i=l.findIndex(y=>norm(y)===norm(n));if(i>=0)l.splice(i,1);else l.push(n);atd[k]=l.join("\n");const y=window.scrollY;renderEv();window.scrollTo(0,y)})}
// rótulo da conduta que fica preso no alto enquanto você está no trecho dela
const atFixo=c=>{const k=CATS[c.cat]||CATS.outros;return `<h4 class="atcond atfixo" style="--c:var(--${k.cor})"><span class="dot"></span>${esc(c.nome)}${c.cid?` <span class="atfixcid">CID ${esc(c.cid)}</span>`:""}</h4>`};
function renderEv(){
  const el=$("#atCorpo"); if(!el) return;
  // só existe na tela enquanto a aba está aberta (o checklist e os campos não se repetem em outra aba)
  if(ui.tab!=="evolucao"){el.innerHTML="";const v=$(".top .atetapas");if(v)v.remove();return}
  const foco=atFocoGuarda();
  // a barra antiga sai antes de montar a nova (senão os botões novos ficam sem ação: $() acharia os antigos)
  {const v=$(".top .atetapas");if(v)v.remove()}
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
  ${atEdit?`<div class="ateditbar"><span class="note">Editando os padrões. Vale para os próximos atendimentos. Salve no alto.</span></div>`:""}
  <nav class="atetapas${atOrdem()==="presc"?" ordem-presc":""}" id="atEtapas" aria-label="Etapas do atendimento"><button class="atrel" id="atRelogio" hidden aria-label="Relógio do atendimento: toque para mudar a meta"></button>${AT_ETAPAS.map(([n,r])=>`<button data-atir="${n}"${n===7?' data-int':""}><b>${atPos(n)}</b> ${r}</button>`).join("")}<button class="atedn" id="atOrdem" title="Alterna a ordem das etapas">${atOrdem()==="presc"?"Ordem: porta":"Ordem: MV"}</button><button class="atedn primary atprox" id="atProx" title="Copia o próximo campo ainda não copiado, na ordem do MV (tecla F2)">⧉ Próximo</button>${atEdit?`<button class="atedn primary" id="atEdSalva">Salvar padrões</button><button class="atedn" id="atEdSai">Cancelar</button>`:`<button class="atedn" id="atEdita" title="Editar os padrões do Atendimento">✎ Padrões</button>`}</nav>
  ${it?`<div class="atextras"><span class="lbl">Outras queixas no mesmo paciente</span><div class="chips">${outras.map(c=>`<button class="chip" data-atrem="${esc(c.id)}" aria-pressed="true" style="--c:var(--${(CATS[c.cat]||CATS.outros).cor})">✓ ${esc(c.nome)} ✕</button>`).join("")}
    ${outras.length<2?`<div class="atbusca"><input class="inp" id="atAddQ" type="text" name="q-conduta-search" role="searchbox" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-1p-ignore data-lpignore="true" data-form-type="other" placeholder="+ outra conduta (ex.: faringite, J02)" aria-label="Buscar outra conduta"><div class="atsug" id="atAddSug"></div></div>`:""}</div></div>`:""}
  ${cs.length?`<div class="atconds">${cs.map(c=>{const k=CATS[c.cat]||CATS.outros;return `<span class="cat" style="--c:var(--${k.cor})"><span class="dot"></span>${esc(c.nome)}</span>${c.cid?`<button class="cidtop" data-cpcid="${esc(c.cid)}" title="Copiar o CID">CID ${esc(c.cid)} <span>copiar</span></button>`:""}`}).join("")}</div>`:""}
  ${atQueixaHTML(!!it)}
  <div class="sec atsec" data-etapa="1" id="atHdaSec"><div class="sec-h"><h3>${atPos(1)}. HDA e antecedentes</h3></div><div class="atbody">
    ${ta("hma","Queixa e HDA (notas soltas: o texto sai corrido)","ex.: dor lombar 3d, piora ao levantar, irradia p/ MID, tomou dipirona s/ melhora, nega febre")}
    <div class="atdgrid atlistas">${ta("ap","HPP (doenças, cirurgias, internações)","ex.: hipertensão arterial\ncolecistectomia em 2019")}${ta("muc","Medicamentos em uso","ex.: losartana 50 mg 1x ao dia")}${ta("alergia","Alergias","ex.: dipirona; ou nega")}</div>
    ${cs.map((c,i)=>`<div id="atChk${i}" class="atbloco">${chkDe(c.id)?atFixo(c):""}${renderChecklist(c)}</div>`).join("")}
    ${atEdit?cs.map(edChk).join(""):""}
    ${atSaida("hda","HDA e antecedentes")}</div></div>
  <div class="sec atsec" data-etapa="2"><div class="sec-h"><h3>${atPos(2)}. Exame físico</h3></div><div class="atbody">
    <div class="atdsv">${inp("pa","PA","120x80")}${inp("fc","FC","",1)}${inp("fr","FR","",1)}${inp("sat","Sat O2","",1)}${inp("tax","Temp.","",1)}${inp("hgt","Glicemia","",1)}</div>
    <div class="atdgrid atdnews"><label class="f">Oxigênio<select class="inp" data-atd="o2">${[["","— informar —"],["ar","Ar ambiente"],["o2","Em O2 suplementar"]].map(([v,r])=>`<option value="${v}" ${atd.o2===v?"selected":""}>${r}</option>`).join("")}</select></label>
      <label class="f">Consciência<select class="inp" data-atd="cons">${[["","— informar —"],["A","Alerta"],["C","Confusão nova, voz, dor ou sem resposta"]].map(([v,r])=>`<option value="${v}" ${atd.cons===v?"selected":""}>${r}</option>`).join("")}</select></label></div>
    <p class="svnews" id="atNews" hidden></p>
    <div class="sec svaviso" id="atAviso" hidden></div>
    ${cs.some(c=>c.id==="pac")?`<p class="svnews crbres" id="atCrb"></p>`:""}
    <div class="atsegs"><div class="seg" role="group" aria-label="Sexo">${[["M","Masculino"],["F","Feminino"]].map(([v,r])=>`<button data-atseg="exSexo" data-v="${v}" aria-pressed="${(atd.exSexo||pac.sexo)===v&&pf!=="gest"}" ${pf==="gest"?"disabled":""}>${r}</button>`).join("")}</div>
      <div class="seg" role="group" aria-label="Perfil">${EX_PERFIS.map(([v,r])=>`<button data-atseg="exPerfil" data-v="${v}" aria-pressed="${pf===v}">${r}</button>`).join("")}</div></div>
    <div class="ateg"><span class="lbl">Estado geral (vem normal; toque no que estiver alterado)</span>
      <div class="seg" role="group" aria-label="Estado geral">${[["bom","Bom"],["regular","Regular"],["mau","Mau"]].map(([v,r])=>`<button data-ateg="${v}" aria-pressed="${((atd.eg||{}).estado||"bom")===v}">${r}</button>`).join("")}</div>
      <div class="chips">${[["cor","Hipocorado"],["hid","Desidratado"],["cian","Cianótico"],["ict","Ictérico"],["feb","Febril"],["taqui","Taquipneico"],["disp","Dispneico"]].map(([k,r])=>chip("eg",k,r,(atd.eg||{})[k])).join("")}</div></div>
    <div class="chips atsis">${EX_SIS.filter(([k])=>k!=="geral").map(([k,r])=>chip("sis",k,r,sis.has(k))).join("")}</div>
    ${atClHTML(it)}
    ${atEdit?`<div class="atedg"><b>Texto de cada sistema (${esc((EX_PERFIS.find(x=>x[0]===pf)||[])[1])})</b>${["geral",...sis].map(k=>{const ch=sisCh(k,pf,atFem());return edTa(`data-eds="${ch}"`,(SIS_OPC.find(x=>x[0]===ch)||[0,ch])[1],sisTexto(ch),sisPadrao(ch))}).join("")}</div>`:""}
    ${ta("exLivre","Só o que estiver alterado — sigla e dois pontos troca a linha normal: G, CP, OF, CV, R, A, N, ME, MI, P","ex.: A: dor à palpação em FID, Blumberg positivo\nR: estertores em base direita")}
    ${atSaida("exame","Exame físico")}</div></div>
  <div class="sec atsec" data-etapa="3"><div class="sec-h"><h3>${atPos(3)}. Hipótese diagnóstica</h3></div><div class="atbody">
    <div class="atcids">${cs.filter(c=>c.cid).map(c=>`<button class="cidbig" data-cpcid="${esc(c.cid)}" title="Copiar o CID de ${esc(c.nome)}">CID ${esc(c.cid)} <span>copiar</span></button>`).join("")}</div>
    ${ta("diag","Outras hipóteses ou complemento","ex.: diagnóstico diferencial com…")}
    ${atSaida("diag","Hipótese diagnóstica")}</div></div>
  <div class="sec atsec" data-etapa="4"><div class="sec-h"><h3>${atPos(4)}. Conduta</h3><span class="alsum">itens · receituário</span></div><div class="atbody">
    <div class="chips atcond">${atL("cond").map(([k,r])=>chip("cond",k,k==="explico"?"Explico o quadro e a conduta":r.replace(/\.$/,""),atCondOn(k))).join("")}</div>
    ${atCondOn("med")&&atNomesUnid().length?`<span class="lbl">Quais remédios (toque nos que foram feitos)</span><div class="chips atmeds">${atNomesUnid().map(n=>chip("medsel",n,n,atd.medSel[n])).join("")}</div>`:""}
    ${ta("condLivre","Outras condutas","ex.: solicito parecer da Cirurgia Geral")}
    ${atEdit?edLista("cond","Itens da conduta"):""}
    ${atSaida("trat","Conduta")}
    <div class="atdocs"><span class="lbl atdocslbl">Receituário</span>
    ${cs.map(c=>{const m=renderRxMontar(c);return m?`<div class="atrx atbloco" data-rxc="${esc(c.id)}">${atFixo(c)}${m}</div>`:""}).join("")}
    ${atRxMaisHTML()}
    ${(h=>h?`<details class="atavisos"><summary>ⓘ Avisos para você (${(h.match(/<li/g)||[]).length||1})</summary>${h}</details>`:"")(cs.map(rxAvisoHTML).join(""))}
    ${atJunta("casa")||atJunta("orient")?atSaida("rx","Receituário"):""}
    ${atOriHTML()}
    </div></div></div>
  <div class="sec atsec" data-etapa="5"><div class="sec-h"><h3>${atPos(5)}. Prescrição</h3><span class="alsum">na unidade · exames</span></div><div class="atbody">
    ${unidH?`<div class="atunid"><span class="lbl">Na unidade (para selecionar no prontuário)</span>${unidH}</div>`:""}
    ${atEdit?cs.map(c=>edTxt(c,"unidade","na unidade")+edTxt(c,"casa","receita")+edTxt(c,"orient","orientações")).join(""):""}
    ${unidH?`<details class="atpunid"><summary>Texto da prescrição na unidade (para copiar, se precisar)</summary>${atSaida("punid","Prescrição na unidade")}</details>`:""}
    <div class="atexcab"><span class="lbl atexlbl">Solicitar exames</span>${ks.length?`<button class="btn sm" id="atExIa" title="A IA escolhe só da lista conferida desta conduta">✨ Sugerir exames (IA)</button>`:""}</div>
    <div class="atexsug" id="atExSug" ${atExSugR?"":"hidden"}>${atExSugR?atExSugHTML():""}</div>
    ${ks.length?`<div class="atexs">${ks.map((k,i)=>exHTML(k,{pedir:true,aberto:i===0,titulo:k.startsWith("q:")?"Exames pela queixa: "+((QUEIXAS.find(q=>"q:"+q.id===k)||{}).nome||""):"Exames: "+((getItem(k)||{}).nome||"")})).join("")}</div>`:""}
    <div class="atdgrid">${ta("exLab","Exames laboratoriais","ex.: hemograma\nPCR\nureia e creatinina")}${ta("exImg","Exames de imagem","ex.: TC de abdome com contraste")}</div>
  </div></div>
  <div class="sec atsec" data-etapa="6"><div class="sec-h"><h3>${atPos(6)}. Reavaliação e alta</h3><span class="alsum">resultados · decisão · alta</span></div><div class="atbody">
    ${atReavHTML()}
    ${atRoteiro()}
    <span class="lbl">Reavaliação</span><div class="chips">${atL("reav").map(([k,r])=>chip("reav",k,r,atd.reav[k])).join("")}</div>
    ${ta("reavTxt","Resultados de exames e resposta ao tratamento","ex.: hemograma sem leucocitose; TC sem coleção")}
    <span class="lbl">Orientado sobre</span><div class="chips">${atL("ori").map(([k,r])=>chip("ori",k,r.split(" (")[0],atd.altaOri[k]!==false)).join("")}</div>
    ${volte.length?`<div class="atvoltecab"><span class="lbl">Sinais de alarme explicados (toque para tirar)</span><button class="btn sm" data-atvt="0">Tirar todos</button><button class="btn sm" data-atvt="1">Pôr todos</button></div>${atVolteGrupos().map(g=>`${g.c?`<div class="atvoltecond"><b>${esc(g.c.nome)}</b><button class="btn sm" data-atvt="0" data-atvc="${esc(g.c.id)}">Tirar</button><button class="btn sm" data-atvt="1" data-atvc="${esc(g.c.id)}">Pôr</button></div>`:""}<div class="chips atvolte">${g.itens.map(([x,i])=>chip("volte",i,semParenteses(x),!atd.alarOff[i])).join("")}</div>`).join("")}`:""}
    ${atEdit?edLista("reav","Reavaliação")+edLista("ori","Orientado sobre")+`<p class="note">Os sinais de alarme da alta são os do checklist (edite na HDA).</p>`:""}
    ${ta("altaLivre","Outras orientações dadas","ex.: retornar em 48 h para reavaliação")}
    <div class="atdgrid ataltachk"><div class="atchks"><label class="check grande"><input type="checkbox" data-atd="compreende" ${atd.compreende?"checked":""}> Compreendeu e concorda</label>
      <label class="check grande"><input type="checkbox" data-atd="altaAtest" ${atd.altaAtest?"checked":""}> Forneço atestado médico</label></div>
      <label class="f">Destino<select class="inp" data-atd="destino" id="evDestino">${[["","— não incluir —"],...destinos()].map(([v,r])=>`<option value="${esc(v)}" ${destAtual===v?"selected":""}>${esc(r)}</option>`).join("")}</select></label></div>
    ${atSaida("alta","Reavaliação e alta")}
    <div class="hospev" id="atHosp"></div></div></div>
  <details class="sec atsec atintern" data-etapa="7" ${/intern/.test(destAtual)||atd.intern.local?"open":""}><summary class="sec-h"><h3>${atPos(7)}. Pedido de internação</h3><span class="alsum">${esc(atLocais().slice(1).map(x=>x[1]).join(", "))}</span></summary><div class="atbody">
    <label class="f">Onde<select class="inp" data-atd="intern.local">${atLocais().map(([v,r])=>`<option value="${v}" ${atd.intern.local===v?"selected":""}>${esc(r)}</option>`).join("")}</select></label>
    <div class="atperg"><b>Para escrever a justificativa, responda:</b><ul>${atL("perg").map(([,p])=>`<li>${esc(p)}</li>`).join("")}</ul></div>
    <div class="atjustcab"><button class="btn sm" id="atJustIa" title="Monta a justificativa com os dados preenchidos, sem inventar">✨ Escrever justificativa (IA)</button><span class="note" id="atJustEst"></span></div>
    ${ta("motivo","Justificativa (motivo da internação)","ex.: pneumonia com SpO2 89% em ar ambiente e CURB-65 3","intern")}
    <div class="atobjcab"><span class="lbl">Objetivos da internação</span><button class="btn sm" id="atObjIa" title="Sugere objetivos específicos para o caso">✨ Sugerir objetivos (IA)</button><span class="note" id="atObjEst"></span></div>
    <div class="atobjs">${atL("obj").map(([k,r])=>`<label class="check"><input type="checkbox" data-atobj="${esc(k)}" ${atd.intern.obj[k]?"checked":""}> ${esc(r)}</label>`).join("")}${(atd.intern.objIa||[]).map((x,i)=>`<label class="check atobjia"><input type="checkbox" data-atobjia="${i}" ${x.on?"checked":""}> ${esc(x.t)} <span class="note">(IA)</span></label>`).join("")}</div>
    ${atEdit?edLista("obj","Objetivos")+edLista("perg","Perguntas da justificativa"):""}
    ${ta("objLivre","Outros objetivos (um por linha)","ex.: parecer da cirurgia geral","intern")}
    ${ta("lab","Exames laboratoriais relevantes (vazio = os alterados da reavaliação)","ex.: leucócitos 18.000; PCR 25; creatinina 1,8","intern")}
    ${ta("laudos","Laudos de imagem (vazio = os da reavaliação)","ex.: TC de tórax: consolidação em lobo inferior direito","intern")}
    ${ta("feito","O que já foi feito no PS (vazio = medicação marcada e exames pedidos)","ex.: ceftriaxona 1 g EV, 1.000 mL de SF","intern")}
    ${ta("parecer","Parecer (especialidade, nome, horário, orientação)","ex.: Cirurgia Geral, Dr. Fulano, 14h20: …","intern")}
    ${typeof hospPac==="function"&&hospPac()&&hospPac().internacao?`<button class="btn hospbtn" id="atCrit">Critérios de internação do hospital</button>`:""}
    ${atSaida("intern","Pedido de internação")}
    <div class="hospev" id="atHospInt"></div></div></details>
  <div class="actions attudo"><button class="btn primary" id="atCpTudo">Copiar tudo</button></div>`;
  bindEv(it);
  el.classList.toggle("ordem-presc",atOrdem()==="presc"); el.classList.toggle("atfechar",!!atd.fechar);
  // a barra de etapas vai para a linha das abas do topo (fica sempre à vista sem ocupar uma faixa a mais)
  const bar=$("#atCorpo .atetapas"), tabs=$(".top .tabs");
  if(bar&&tabs){const v=$(".top .atetapas");if(v)v.remove();tabs.appendChild(bar);atEtapasAtualiza()}
  atFocoVolta(foco);
  atMarcaEtapa();
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
// campo do Atendimento em uso: os do corpo e os do topo (nome do paciente e busca da conduta)
const atDigitando=()=>{const a=document.activeElement;return !!(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&a.closest&&a.closest("#atCorpo,#tab-evolucao .attopo"))};
function renderEvSeguro(){
  if(ui.tab==="evolucao"&&atDigitando()){atRedesenhaDepois=true;return}
  renderEv();
}
["#atCorpo","#tab-evolucao .attopo"].forEach(q=>{const x=$(q);if(x)x.addEventListener("focusout",()=>setTimeout(()=>{
  if(!atRedesenhaDepois||atDigitando()) return;
  atRedesenhaDepois=false; const y=window.scrollY; renderEv(); window.scrollTo(0,y);
},0))});
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
  const ct=$("#atContra"); if(ct){const c=atContradicoes();ct.hidden=!c.length;ct.textContent=c.length?`Atenção: ${c.map(x=>`"${x}"`).join(", ")} ${c.length>1?"estão":"está"} nas notas e ${c.length>1?"foram marcados":"foi marcado"} como ausente no checklist. Confira antes de copiar.`:""}
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
    if(g==="sis"){const s=new Set(atSis(it));s.has(k)?s.delete(k):s.add(k);atd.sis=EX_SIS.map(x=>x[0]).filter(x=>s.has(x));const y=window.scrollY;renderEv();window.scrollTo(0,y);return}
    if(g==="cond"){atd.cond[k]=!atCondOn(k);if(k==="med"){renderEv();return}}
    if(g==="medsel") atd.medSel[k]=!atd.medSel[k];
    if(g==="eg"){atd.eg=atd.eg||{};atd.eg[k]=!atd.eg[k]}
    if(g==="reav") atd.reav[k]=!atd.reav[k];
    if(g==="ori") atd.altaOri[k]=atd.altaOri[k]===false;
    if(g==="volte") atd.alarOff[k]=!atd.alarOff[k];
    if(g==="obj") atd.intern.obj[k]=!atd.intern.obj[k];
    const on=g==="eg"?!!(atd.eg||{})[k]:g==="ori"?atd.altaOri[k]!==false:g==="volte"?!atd.alarOff[k]:g==="sis"?atSis(it).includes(k):g==="obj"?atd.intern.obj[k]:g==="cond"?atCondOn(k):g==="medsel"?!!atd.medSel[k]:atd.reav[k];
    b.setAttribute("aria-pressed",!!on); b.textContent=(on?"✓ ":"")+b.textContent.replace(/^✓ /,"");
    atAtualiza();
  });
  // "+ remédio": busca nas fichas com posologia de receita
  const rq=$("#atRxQ"), rs=$("#atRxSug");
  if(rq){const mostra=()=>{const t=norm(rq.value.trim()); if(t.length<2){rs.innerHTML="";return}
      const hits=MEDS.filter(m=>(m.receita||[]).length&&norm([m.nome,(m.marcas||[]).join(" "),m.classe].join(" ")).includes(t)).slice(0,8);
      const cond=atRxIndice().filter(x=>norm(x.nome).includes(t)).slice(0,8);
      rs.innerHTML=(hits.flatMap(m=>m.receita.map((p,i)=>`<button class="chip" data-rxadd="${m.id}" data-rxi="${i}">${esc(p.nome)} · ${esc(p.rotulo||"")}</button>`)).join("")
        +cond.map((x,i)=>`<button class="chip rxdacond" data-rxcond="${AT_RX_IDX.indexOf(x)}" title="Texto da conduta ${esc(x.cond)}">${esc(x.nome.split(/\s-{2,}/)[0])} <span class="note">· de ${esc(x.cond)}</span></button>`).join(""))||`<span class="note">Sem posologia de receita para isso. Use "Colar de outro guia".</span>`;
      rs.querySelectorAll("[data-rxcond]").forEach(b=>b.onclick=()=>{const x=AT_RX_IDX[+b.dataset.rxcond];atd.rxExtra=[...(atd.rxExtra||[]),{txt:[x.nome,...x.linhas].join("\n"),via:x.via,de:x.cond}];const y=window.scrollY;renderEv();window.scrollTo(0,y)});
      rs.querySelectorAll("[data-rxadd]").forEach(b=>b.onclick=()=>{const m=MEDS.find(x=>x.id===b.dataset.rxadd),p=m.receita[+b.dataset.rxi];atd.rxExtra=[...(atd.rxExtra||[]),{id:m.id,i:+b.dataset.rxi,dias:p.diasPadrao||1}];const y=window.scrollY;renderEv();window.scrollTo(0,y)})};
    rq.addEventListener("input",mostra);rq.addEventListener("keydown",e=>{if(e.key==="Enter"){const b=rs.querySelector("[data-rxadd]");if(b){e.preventDefault();b.click()}}})}
  box.querySelectorAll("[data-rxdias]").forEach(i=>i.oninput=()=>{const e=atd.rxExtra[+i.dataset.rxdias];if(e){e.dias=Math.max(1,+i.value||1);atAtualiza()}});
  box.querySelectorAll("[data-rxtira]").forEach(b=>b.onclick=()=>{atd.rxExtra.splice(+b.dataset.rxtira,1);const y=window.scrollY;renderEv();window.scrollTo(0,y)});
  // salvar como opção da conduta: entra como bloco opcional ("# Opção sua") na receita da conduta, nos seus padrões
  box.querySelectorAll("[data-rxsalva]").forEach(b=>b.onclick=()=>{const e=atd.rxExtra[+b.dataset.rxsalva], it=atItem(); if(!e||!it) return;
    const m=MEDS.find(x=>x.id===e.id), p=m.receita[e.i], lin=atRxLinha(e).split("\n").slice(1).join("\n");
    if(!confirm(`Salvar ${p.nome} (${p.rotulo}) como opção da conduta "${it.nome}"? Fica nos seus padrões, como bloco opcional.`)) return;
    const base=(overrides[it.id]&&!overrides[it.id].deleted&&overrides[it.id].casa!=null)?overrides[it.id].casa:it.casa;
    overrides[it.id]=Object.assign({},overrides[it.id]||{},{nome:it.nome,cat:it.cat,cid:it.cid,sin:it.sin,unidade:it.unidade,orient:it.orient,casa:`${base}\n\n# Opção sua: ${p.nome}\n${lin.replace(/^1\)/,`${Math.max(0,...[...String(base).matchAll(/^\s*(\d+)\)/gm)].map(x=>+x[1]))+1})`)}`,updatedAt:Date.now()});
    delete overrides[it.id].restored; persistLocal(); if(typeof gsAgenda==="function") gsAgenda(); toast("Salvo como opção da conduta (Editar padrões para mudar)")});
  // IA sugere exames: só da lista "pedir" (conferida) das condutas e da queixa
  if($("#atExIa")) $("#atExIa").onclick=async()=>{const bx=$("#atExSug"),dz=h=>{bx.hidden=false;bx.innerHTML=h};
    if(!iaAtiva()){dz(`<p class="note">Ligue a IA em Documentos › Backup.</p>`);return}
    const lista=[];const ks2=[...(atd.queixa?["q:"+atd.queixa]:[]),...atConds().map(c=>c.id)].filter(k=>exDe(k));
    ks2.forEach(k=>(exDe(k).pedir||[]).forEach(x=>{const nome=exNome(x.t);if(nome&&!lista.some(y=>norm(y.nome)===norm(nome)))lista.push({nome,t:x.t})}));
    if(!lista.length){dz(`<p class="note">Esta conduta não tem lista de exames para pedir.</p>`);return}
    let ctx=[atTexto("hda",atItem()),atTexto("exame",atItem()),"Hipóteses: "+atConds().map(c=>c.nome).join("; ")].join("\n\n");
    const nome=atPac&&pacDe(atPac)&&pacDe(atPac).nome; if(nome) ctx=iaSemNome(ctx,nome);
    // a resposta só vale para o atendimento que a pediu (trocar de paciente durante a espera descarta)
    const dono=atd;
    dz(`<p class="note">Analisando…</p>`);
    try{const r=await iaSugereExames(ctx,lista);
      if(atd!==dono) return;
      atExSugR=r; const bx2=$("#atExSug"); if(!bx2) return; bx2.hidden=false; bx2.innerHTML=atExSugHTML(); atExSugBind(bx2)}
    catch(e){if(atd!==dono)return;const bx2=$("#atExSug");if(!bx2)return;bx2.hidden=false;bx2.innerHTML=(`<p class="note">${e.message==="tempo"?"A IA demorou demais para responder. Tente de novo.":e.message==="formato"?"A IA respondeu fora do formato. Tente de novo.":/^40[13]/.test(e.message)?"Chave da IA recusada.":"Não consegui falar com a IA agora."}</p>`)}};
  // exames digitados à mão: ao sair do campo, só o quadro de resultados é refeito (sem redesenhar a tela e perder texto)
  box.querySelectorAll('[data-atd="exLab"],[data-atd="exImg"]').forEach(t=>t.addEventListener("change",()=>{const r=$("#atResBox");if(r){r.innerHTML=atResHTML();atResBind(r)}}));
  atResBind(box);
  box.querySelectorAll("[data-ateg]").forEach(b=>b.onclick=()=>{atd.eg=Object.assign({},atd.eg,{estado:b.dataset.ateg});box.querySelectorAll("[data-ateg]").forEach(x=>x.setAttribute("aria-pressed",x===b));atAtualiza()});
  // sigla + dois pontos nos achados ("A:"): já entra o texto normal daquele sistema, para editar só o que está alterado
  const exl=box.querySelector('[data-atd="exLivre"]');
  if(exl) exl.addEventListener("input",e=>{
    if(e.data!==":") return; const pos=exl.selectionStart, v=exl.value, ini=v.lastIndexOf("\n",pos-1)+1, fim=v.indexOf("\n",pos), lin=v.slice(ini,pos);
    if(fim>=0&&v.slice(pos,fim).trim()||fim<0&&v.slice(pos).trim()) return;
    const m=lin.match(/^\s*([a-zà-ú ]{1,22}?)\s*:$/i), k=m&&Object.keys(AT_SIS_ALIAS).find(x=>AT_SIS_ALIAS[x].test(m[1].trim().toLowerCase())); if(!k) return;
    const normal=sisTexto(sisCh(k,atPerfil(),atFem())).replace(k==="geral"?/^$/:/^[^:]{1,40}:\s*/,"");
    exl.value=v.slice(0,pos)+" "+normal+v.slice(pos); const c=pos+1+normal.length; exl.setSelectionRange(c,c);
    atd.exLivre=exl.value; grow(exl); atAtualiza();
  });
  // sexo e perfil do exame: refazem o texto do exame (se foi editado à mão, fica e aparece o aviso para refazer)
  box.querySelectorAll("[data-atseg]").forEach(b=>b.onclick=()=>{atd[b.dataset.atseg]=b.dataset.v;renderEv()});
  box.querySelectorAll("[data-atout]").forEach(ta=>ta.addEventListener("input",()=>{const k=ta.dataset.atout;if(atd.man[k]==null){atd.manBase=atd.manBase||{};atd.manBase[k]=atTexto(k,atItem())}atd.man[k]=ta.value;grow(ta);$(`#atCorpo [data-atman="${k}"]`).hidden=false;atdSessaoLogo();pacSnapLogo()}));
  // IA na HDA: troca o texto pelo melhorado (fica como edição sua, com Desfazer); a trava de números está em iaMelhora
  box.querySelectorAll("[data-atia]").forEach(b=>b.onclick=async()=>{
    const k=b.dataset.atia||"hda"; let est=$(`#atCorpo [data-atiaest="${k}"]`), ta=$(`#atCorpo [data-atout="${k}"]`); const dz=t=>{est.hidden=false;est.innerHTML=t};
    if(!iaAtiva()){dz(`Ligue a IA em Documentos › Backup (cole a chave da Anthropic).`);return}
    let tx=ta.value; if(!tx.trim()){toast("HDA vazia");return}
    const nome=atPac&&pacDe(atPac)&&pacDe(atPac).nome; if(nome) tx=iaSemNome(tx,nome);
    // guarda de quem é o pedido e o texto mandado: a resposta não pode cair em outro paciente nem apagar o que foi digitado
    const dono=atd, txOrig=ta.value, tela=()=>({ta:$(`#atCorpo [data-atout="${k}"]`),est:$(`#atCorpo [data-atiaest="${k}"]`)});
    b.disabled=true; dz("Melhorando o texto…");
    try{const out=k==="hda"?await iaMelhora(tx):await iaChama(k==="exame"?IA_EXAME:IA_INTERN,tx);
      const T=tela(), dz2=t=>{if(T.est){T.est.hidden=false;T.est.innerHTML=t}};
      if(atd!==dono){toast("Você trocou de paciente: a resposta da IA foi descartada");b.disabled=false;return}
      if(!T.ta||T.ta.value!==txOrig){dz2("O texto mudou enquanto a IA respondia: mantive o seu. Toque de novo para melhorar.");b.disabled=false;return}
      ta=T.ta; est=T.est;
      if(atd.man[k]==null){atd.manBase=atd.manBase||{};atd.manBase[k]=atTexto(k,atItem())}
      const antes=ta.value; atd.man[k]=out; ta.value=out; grow(ta); atAtualiza();
      dz(`Texto melhorado pela IA: confira antes de copiar. <button class="btn sm" data-iadesfaz>Desfazer</button>`);
      est.querySelector("[data-iadesfaz]").onclick=()=>{atd.man[k]=antes;ta.value=antes;grow(ta);atAtualiza();dz("Voltou ao texto anterior.")}}
    catch(e){if(atd!==dono){b.disabled=false;return}dz(e.message==="remedio"?`A IA trocou ou acrescentou remédio (${esc(e.det||"")}): mantive o seu texto.`:e.message==="parenteses"?"A IA acrescentou parênteses: mantive o seu texto.":e.message==="tempo"?"A IA demorou demais para responder. O texto ficou como estava; tente de novo.":e.message==="numeros"?`A IA mudou ou tirou um número do texto${e.det?` (${esc(e.det)})`:""}: mantive o original. Tente de novo.`:/^40[13]/.test(e.message)?"Chave da IA recusada: troque em Documentos › Backup.":"Não consegui falar com a IA agora (sem conexão?). O texto ficou como estava.")}
    b.disabled=false;
  });
  box.querySelectorAll("[data-atre]").forEach(b=>b.onclick=()=>{delete atd.man[b.dataset.atre];if(atd.manBase)delete atd.manBase[b.dataset.atre];atAtualiza()});
  box.querySelectorAll("[data-atcp]").forEach(b=>b.onclick=()=>{const k=b.dataset.atcp,t=$(`#atCorpo [data-atout="${k}"]`).value;if(!t.trim()){toast("Campo vazio");return}copy(t,b).then(ok=>{if(!ok)return;atd.cop[k]=t;atEtapasAtualiza();atdSessaoLogo();pacSnapLogo()})});
  if($("#atProx")) $("#atProx").onclick=atCopiaProximo;
  if($("#atFecharSai")) $("#atFecharSai").onclick=()=>{atd.fechar=false;const y=window.scrollY;renderEv();window.scrollTo(0,y)};
  if($("#atOrdem")) $("#atOrdem").onclick=()=>{model.prefs=Object.assign({},model.prefs,{ordem:atOrdem()==="presc"?"mv":"presc"});saveModel();const y=window.scrollY;renderEv();window.scrollTo(0,y);toast(atOrdem()==="presc"?"Ordem da porta: HDA → prescrição → exame → hipótese → conduta → alta":"Ordem do MV: HDA → exame → hipótese → conduta → prescrição → alta")};
  if($("#atRelogio")) $("#atRelogio").onclick=()=>{const v=prompt(`Meta de tempo por atendimento, em minutos (fica amarelo 5 min antes e vermelho ao passar).\nDigite 0 para zerar o relógio agora.`,atMeta());if(v==null)return;const n=Math.round(+String(v).replace(",","."));
    if(n===0){atd.t0=Date.now();atRelogio();atdSessaoLogo();toast("Relógio zerado");return}
    if(!(n>=5&&n<=180)){toast("Use de 5 a 180 minutos");return}model.prefs=Object.assign({},model.prefs,{meta:n});saveModel();atRelogio();toast(`Meta: ${n} min por atendimento`)};
  box.querySelectorAll("[data-atir]").forEach(b=>b.onclick=()=>{const sec=$(`#atCorpo [data-etapa="${b.dataset.atir}"]`);if(!sec)return;if(sec.tagName==="DETAILS")sec.open=true;sec.scrollIntoView({behavior:"smooth",block:"start"})});
  box.querySelectorAll("[data-cpcid]").forEach(cid=>cid.onclick=()=>copy(cid.dataset.cpcid,cid));
  // tirar ou pôr todos os sinais de alarme (no geral ou de uma conduta)
  box.querySelectorAll("[data-atori]").forEach(b=>b.onclick=()=>{const k=b.dataset.atori;atd.oriOff=Object.assign({},atd.oriOff);atd.oriOff[k]=!atd.oriOff[k];if(!atd.oriOff[k])delete atd.oriOff[k];b.setAttribute("aria-pressed",!atd.oriOff[k]);atAtualiza()});
  if($("#atOriPadrao")) $("#atOriPadrao").onclick=()=>{const off=atd.oriOff||{};if(!Object.keys(off).length){toast("Toque nas orientações que quer tirar antes");return}
    let n=0; atConds().forEach(c=>{const o=String(cur(c,"orient")||"");const fica=o.split("\n").filter(l=>!off[norm(l)]);if(fica.length===o.split("\n").length)return;
      const base=overrides[c.id]&&!overrides[c.id].deleted?overrides[c.id]:{};overrides[c.id]=Object.assign({},base,{nome:c.nome,cat:c.cat,cid:c.cid,sin:c.sin,casa:base.casa??getItem(c.id).casa,unidade:base.unidade??c.unidade,orient:fica.join("\n"),updatedAt:Date.now()});delete overrides[c.id].restored;n++});
    persistLocal(); if(typeof gsAgenda==="function") gsAgenda(); atd.oriOff={}; toast(n?`Orientações salvas como padrão (${n} conduta${n>1?"s":""}); para voltar, use "Restaurar" na conduta`:"Nada a mudar"); const y=window.scrollY; renderEv(); window.scrollTo(0,y)};
  box.querySelectorAll("[data-atcl]").forEach(b=>b.onclick=()=>{const k=b.dataset.atcl,c=b.dataset.c;atd.exOff=Object.assign({},atd.exOff);const l=new Set(atd.exOff[k]||[]);l.has(c)?l.delete(c):l.add(c);atd.exOff[k]=[...l];b.setAttribute("aria-pressed",!l.has(c));atAtualiza()});
  if($("#atJustIa")) $("#atJustIa").onclick=async()=>{const est=$("#atJustEst"),b=$("#atJustIa");if(!iaAtiva()){est.textContent="Ligue a IA em Documentos › Backup.";return}
    const it=atItem(), loc=(atLocais().find(x=>x[0]===atd.intern.local)||[])[1]||"";
    let ctx=[atTexto("hda",it),atTexto("exame",it),"Exames: "+[atInternAuto().lab,atInternAuto().laudos].filter(Boolean).join(" "),"Hipóteses: "+atConds().map(c=>c.nome).join("; "),loc?"Local pedido: "+loc:"",atd.intern.feito?"Feito no PS: "+atd.intern.feito:""].filter(Boolean).join("\n\n");
    const nome=atPac&&pacDe(atPac)&&pacDe(atPac).nome; if(nome) ctx=iaSemNome(ctx,nome);
    const quem=atPac; b.disabled=true; est.textContent="Escrevendo…";
    try{const t=await iaJustifica(ctx); if(atPac!==quem){est.textContent="Paciente mudou: descartado.";b.disabled=false;return}
      const ta=$('#atCorpo [data-atd="intern.motivo"]'); const antes=atd.intern.motivo; atd.intern.motivo=t; if(ta){ta.value=t;grow(ta)} atAtualiza();
      est.innerHTML=`Escrita pela IA: confira. <button class="btn sm" id="atJustDesfaz">Desfazer</button>`; $("#atJustDesfaz").onclick=()=>{atd.intern.motivo=antes;if(ta){ta.value=antes;grow(ta)}atAtualiza();est.textContent="Voltou ao anterior."}}
    catch(e){est.textContent=e.message==="remedio"?`A IA trocou ou acrescentou remédio (${esc(e.det||"")}): mantive o seu texto.`:e.message==="parenteses"?"A IA acrescentou parênteses: mantive o seu texto.":e.message==="numeros"?`A IA pôs um número que não está nos dados (${e.det}): descartei.`:/^40[13]/.test(e.message)?"Chave da IA recusada.":"Não consegui falar com a IA agora."}
    b.disabled=false};
  box.querySelectorAll("[data-atobj]").forEach(c=>c.onchange=()=>{atd.intern.obj[c.dataset.atobj]=c.checked;atAtualiza()});
  box.querySelectorAll("[data-atobjia]").forEach(c=>c.onchange=()=>{const x=(atd.intern.objIa||[])[+c.dataset.atobjia];if(x){x.on=c.checked;atAtualiza()}});
  if($("#atObjIa")) $("#atObjIa").onclick=async()=>{const est=$("#atObjEst"),b=$("#atObjIa");if(!iaAtiva()){est.textContent="Ligue a IA em Documentos › Backup.";return}
    const it=atItem(), ja=[...atL("obj").filter(([k])=>atd.intern.obj[k]).map(([,t])=>t),...(atd.intern.objIa||[]).map(x=>x.t)];
    let ctx=[atTexto("hda",it),atTexto("exame",it),"Exames: "+[atInternAuto().lab,atInternAuto().laudos].filter(Boolean).join(" "),"Hipóteses: "+atConds().map(c=>c.nome).join("; "),"Já marcados: "+(ja.join("; ")||"nenhum")].join("\n\n");
    const nome=atPac&&pacDe(atPac)&&pacDe(atPac).nome; if(nome) ctx=iaSemNome(ctx,nome);
    const quem=atPac; b.disabled=true; est.textContent="Pensando…";
    try{const r=await iaObjetivos(ctx); if(atPac!==quem){est.textContent="Paciente mudou: descartado.";b.disabled=false;return}
      const novos=r.filter(t=>!ja.some(y=>norm(y)===norm(t))).map(t=>({t,on:false}));
      atd.intern.objIa=[...(atd.intern.objIa||[]),...novos]; const y=window.scrollY; renderEv(); window.scrollTo(0,y);
      const e2=$("#atObjEst"); if(e2) e2.textContent=novos.length?`${novos.length} sugestão(ões) da IA: marque as que quiser.`:"Sem sugestões novas."}
    catch(e){est.textContent=/^40[13]/.test(e.message)?"Chave da IA recusada.":e.message==="formato"?"A IA respondeu fora do formato. Tente de novo.":"Não consegui falar com a IA agora."; b.disabled=false}};
  box.querySelectorAll("[data-atvt]").forEach(b=>b.onclick=()=>{const on=b.dataset.atvt==="1", c=b.dataset.atvc;
    const alvo=c?(atVolteGrupos().find(g=>g.c&&g.c.id===c)||{itens:[]}).itens.map(([,i])=>i):atVolte().map((x,i)=>i);
    atd.alarOff=Object.assign({},atd.alarOff); alvo.forEach(i=>{if(on)delete atd.alarOff[i];else atd.alarOff[i]=true});
    const y=window.scrollY; renderEv(); window.scrollTo(0,y)});
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
// conduta principal por busca (como em "outra conduta"): favoritas, mais usadas e da mesma área primeiro; nome, sinônimo ou CID
(function(){
  const q=$("#atCondQ"), sg=$("#atCondSug"), sel=$("#evCond"); if(!q||!sg||!sel) return;
  const mostra=()=>{const its=atBuscaCond(q.value,[sel.value].filter(Boolean));
    sg.innerHTML=its.map(x=>{const k=CATS[x.cat]||CATS.outros;return `<button class="chip" data-atcondq="${esc(x.id)}" style="--c:var(--${k.cor})">${uso.favs.includes(x.id)?"★ ":""}${esc(x.nome)}${x.cid?` <span class="note">${esc(x.cid)}</span>`:""}</button>`}).join("")||`<span class="note">Nada encontrado.</span>`;
    sg.querySelectorAll("[data-atcondq]").forEach(b=>b.onclick=()=>{sel.value=b.dataset.atcondq;sel.dispatchEvent(new Event("change"));q.value="";sg.innerHTML="";q.blur()})};
  q.addEventListener("input",mostra); q.addEventListener("focus",mostra);
  q.addEventListener("keydown",e=>{if(e.key==="Enter"){const b=sg.querySelector("[data-atcondq]");if(b){e.preventDefault();b.click()}}if(e.key==="Escape"){q.value="";sg.innerHTML=""}});
  document.addEventListener("click",e=>{if(!e.target.closest(".atcondbusca"))sg.innerHTML=""});
})();

/* ---------- atendimento em 1 tela (porta): sinais de alarme no topo e "Fechar o atendimento" na conduta ---------- */
// tudo do paciente fica só na memória da aba (regra 5); "Novo paciente" limpa
const ATD_VAZIO=()=>({hma:"",alergia:"",ap:"",muc:"",pa:"",fc:"",fr:"",sat:"",tax:"",hgt:"",o2:"",cons:"",
  extras:[],exSol:"",exModelo:"sis",sis:null,exLivre:"",diag:"",unid:false,casa:true,ori:true,destino:null,
  reav:{},reavTxt:"",altaOri:{},alarOff:{},altaLivre:"",compreende:false,
  intern:{local:"",motivo:"",obj:{},objLivre:"",lab:"",laudos:"",feito:"",parecer:""},
  tipo:"atestado",dias:"",aut:false,hora:"",man:{}});
let atd=ATD_VAZIO();
// lista de pacientes do plantão (exceção à regra 5 decidida pelo médico; 27-pacientes.js): chave própria, 7 dias
const PAC_LS="mph_pacientes_v1", PAC_DIAS=7;
let atPac=null;        // id do paciente da lista que está no Atendimento
let pacDb=null;        // {pacs:[…], cont:{"AAAA-MM-DD":n}, apagados:{id:quando}}

// checklist da conduta com as edições do médico (Atendimento → Editar padrões), salvas no modelo
function chkDe(id){const b=CHECK[id], m=model.chk&&model.chk[id]; if(!b&&!m) return null; return Object.assign({fontes:[]},b||{},m||{})}
// sinais de alarme do checklist, em destaque antes da receita
function renderAlarme(it){
  const c=chkDe(it.id); if(!c||!(c.alarme||[]).length) return "";
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
function atdAvisoAtualiza(it,boxSel="#atdAviso",newsSel="#atdNews"){
  const box=$(boxSel); if(!box) return;
  const ln=$(newsSel); if(ln){const n=atdNews(),inv=news2Invalido();ln.hidden=!n&&!(inv&&["fr","sat","fc","tax","pa"].some(k=>String(atd[k]||"").trim()));ln.textContent=n?newsLinha(n):inv?NEWS2_NAO_VALIDADO:"";ln.dataset.nv=n?n.nivel:"info"}
  const al=svAlertas(it); box.hidden=!al.length; if(!al.length){box.innerHTML="";return}
  const pior=al.some(a=>a.nv==="emergencia")?"emergencia":al.some(a=>a.nv==="urgente")?"urgente":al.some(a=>a.nv==="baixo")?"baixo":"info";
  box.dataset.nv=pior;
  box.innerHTML=`<div class="sec-h"><h3>Sinais vitais</h3><span class="alsum">aviso automático pelo que foi digitado no Atendimento</span></div>
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
  ${c.faltam.length?`<p class="note">Faltam: ${esc(c.faltam.map(x=>x.rot).join(", "))}. Idade em "Dados do paciente"; FR, PA e consciência na aba Atendimento.</p>`:""}
  <p class="note">${esc(PAC_JULGAMENTO)}${sat!=null&&sat<SVAL.sat.lim&&atd.o2!=="o2"?` <b>SpO2 ${String(sat).replace(".",",")}%: pesa para ficar.</b>`:""}</p>`;
  const ck=$("#crbConf"); if(ck) ck.checked=atd.cons==="C";
}
function bindCrb(it){
  const ck=$("#crbConf"); if(!ck) return;
  ck.addEventListener("change",()=>{atd.cons=ck.checked?"C":"A";atdAvisoAtualiza(it);crbAtualiza()});
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
// na conduta, o botão "Atender →" fica no topo (barra de ações); aqui só os avisos e o CRB-65
function renderAtend(it){return ""}
function bindAtend(it){
  if(!$("#atdIr")) return;
  $("#atdIr").onclick=()=>atAbrir(it.id);
  bindCrb(it); atdAvisoAtualiza(it); crbAtualiza();
}

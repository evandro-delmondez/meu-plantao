/* ---------- storage ---------- */
const LS={ov:"rxp_overrides_v1",pend:"rxp_pending_v1",model:"rxp_model_v1",draft:"rxp_draft_v1",ui:"rxp_ui_v1"};
const lsGet=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
let overrides=lsGet(LS.ov,{});        // id -> {…fields, updatedAt, deleted?, restored?}
let pending=new Set(lsGet(LS.pend,[])); // ids waiting to reach the cloud
let db=null, dbState="loading";

const EX_ADULTO=`Exame físico:
BEG, CHAAA, eupneico em AA, LOTE.
Neuro: Glasgow 15, sem sinais meníngeos ou focais, pupilas isocóricas e fotorreagentes. Sem paralisia facial ou de MMSS/MMII.
ACV: RCR 2T, BNF, sem sopros audíveis.
AR: MV+ bilateralmente, sem RA; sem sinais de esforço respiratório.
Abd: flácido, RHA+, indolor à palpação superficial e profunda, Murphy (-), DB (-), Giordano (-).
MMII: sem edemas, sem sinais de TVP, panturrilhas livres, boa perfusão periférica.
Pele: sem alterações evidentes.`;
const EX_PED=`Exame físico:
BEG, ativo e reativo, corado, hidratado, acianótico, anictérico, afebril.
Fontanela anterior normotensa (lactente).
Oroscopia: sem hiperemia ou exsudato. Otoscopia: membranas timpânicas íntegras e translúcidas.
AR: MV+ bilateralmente, sem RA; sem tiragens ou batimento de asa nasal.
ACV: RCR 2T, BNF, sem sopros. Tempo de enchimento capilar < 2 s.
Abd: flácido, indolor, sem visceromegalias.
Pele: sem exantemas ou petéquias.`;
const EX_GEST=`Exame físico:
BEG, CHAAA, eupneica em AA, LOTE.
ACV: RCR 2T, BNF. AR: MV+ bilateralmente, sem RA.
Abd: gravídico, útero compatível com a IG, indolor. BCF: ___ bpm. Dinâmica uterina ausente.
MMII: sem edemas, panturrilhas livres.`;
const AT_DEF={
 atestado_M:"Atesto, para os devidos fins, que o paciente, identificado no prontuário acima, recebeu atendimento médico nesta unidade na data de {data} e deverá permanecer afastado de suas atividades laborais por {dias}, a contar desta data, por motivo de saúde.",
 atestado_F:"Atesto, para os devidos fins, que a paciente, identificada no prontuário acima, recebeu atendimento médico nesta unidade na data de {data} e deverá permanecer afastada de suas atividades laborais por {dias}, a contar desta data, por motivo de saúde.",
 comp_M:"Declaro, para os devidos fins, que o paciente, identificado no prontuário acima, compareceu a esta unidade para atendimento médico na data de {data}{horario}.",
 comp_F:"Declaro, para os devidos fins, que a paciente, identificada no prontuário acima, compareceu a esta unidade para atendimento médico na data de {data}{horario}.",
 cid:"CID: {cid}\nDeclaro que autorizo a divulgação do CID acima descrito, conforme previsto em lei.\n\nAssinatura {do_da} paciente: _______________________________"
};
const DEFAULT_MODEL={
 v:3,
 exames:[{id:"adulto",nome:"Adulto",texto:EX_ADULTO},{id:"pediatrico",nome:"Pediátrico",texto:EX_PED},{id:"gestante",nome:"Gestante",texto:EX_GEST}],
 exameSel:"adulto",
 conduta:`- Explico ao paciente o quadro clínico, as hipóteses diagnósticas e a conduta proposta, confirmando a compreensão das orientações.
- Prescrevo medicação conforme abaixo.
- Oriento quanto aos sinais de alarme e à necessidade de retorno imediato em caso de piora.`,
 atestado:Object.assign({},AT_DEF),
 prefs:{dipirona:"500"}
};
const clone=o=>JSON.parse(JSON.stringify(o));
const looksCaps=t=>{const L=(t||'').replace(/[^A-Za-zÀ-ÿ]/g,'');return L.length>40&&L===L.toUpperCase()};
function migrateModel(m){
  m=m?clone(m):{};
  if(m.v===3) { const d=clone(DEFAULT_MODEL); return Object.assign(d,m,{atestado:Object.assign({},AT_DEF,m.atestado||{}),prefs:Object.assign({},d.prefs,m.prefs||{})}); }
  const out=clone(DEFAULT_MODEL);
  if(m.exame && !(!m.custom && looksCaps(m.exame))) out.exames[0].texto=m.exame;
  if(m.conduta && !(!m.custom && looksCaps(m.conduta))) out.conduta=m.conduta;
  out.updatedAt=m.updatedAt||0;
  return out;
}
let model=migrateModel(lsGet(LS.model,null));
const exameAtual=id=>(model.exames.find(e=>e.id===(id||model.exameSel))||model.exames[0]||{texto:""}).texto;
/* dipirona 500 mg ou 1 g */
function rxTxt(t){
  if(!t||model.prefs.dipirona!=="1g") return t||"";
  return t.replace(/Dipirona 500mg (-+) *(\d+) cp\nTomar 2 cp VO/g,(m,d,n)=>`Dipirona 1g ${d} ${Math.ceil(n/2)} cp\nTomar 1 cp VO`);
}

function setSync(s,t){const el=$("#sync");el.dataset.s=s;$("#syncTxt").textContent=t}
function refreshSync(){
  if(dbState==="loading") return setSync("local","Conectando…");
  if(dbState==="none") return setSync("local","Salvo só neste aparelho");
  if(pending.size) return setSync("pend",pending.size+" alteração(ões) sincronizando…");
  setSync("ok","Salvo na nuvem");
}
function persistLocal(){lsSet(LS.ov,overrides);lsSet(LS.pend,[...pending])}

async function pushOne(id){
  if(!db) return;
  const doc=overrides[id]; if(!doc) {pending.delete(id);return}
  try{
    await db.doc("prescricoes/"+id).set(doc);
    if(overrides[id]&&overrides[id].updatedAt===doc.updatedAt) pending.delete(id);
  }catch(e){
    if(e&&e.code==="unavailable"){await new Promise(r=>setTimeout(r,800+Math.random()*800));try{await db.doc("prescricoes/"+id).set(doc);pending.delete(id)}catch(e2){}}
  }
  persistLocal();refreshSync();
}
let pushing=false;
async function flush(){
  if(!db||pushing) return; pushing=true;
  for(const id of [...pending]) await pushOne(id);
  pushing=false; refreshSync();
}
function writeOverride(id,obj){
  obj.updatedAt=Date.now();
  overrides[id]=obj; pending.add(id); persistLocal(); refreshSync(); flush();
}

/* model (exam/conduct) */
async function saveModel(){
  model.v=3; model.updatedAt=Date.now(); lsSet(LS.model,model);
  if(db){try{await db.doc("config/modelo").set(model)}catch(e){}}
}

/* ---------- medicações ---------- */
const MGRUPOS={analgesicos:{nome:"Analgésicos",cor:"red"},gastro:{nome:"Gastro",cor:"green"},antibioticos:{nome:"Antibióticos",cor:"indigo"},corticoides:{nome:"Corticoides e antialérgicos",cor:"amber"},vasoativos:{nome:"Vasoativos",cor:"rose"},sedacao:{nome:"Sedação e intubação",cor:"violet"},anticonvulsivantes:{nome:"Anticonvulsivantes",cor:"orange"},antiarritmicos:{nome:"Antiarrítmicos",cor:"pink"},anticoagulantes:{nome:"Anticoagulantes e trombolíticos",cor:"sky"},"eletrolitos-ev":{nome:"Glicose e eletrólitos EV",cor:"teal"},psiquiatria:{nome:"Psiquiatria",cor:"violet"}};
const MALIAS={ /* termos que identificam a medicação dentro do texto das condutas */
  "amoxicilina":["amoxicilina"],"amoxicilina-clavulanato":["clavulanato"],"penicilina-g-benzatina":["benzatina","benzetacil"],
  "sulfametoxazol-trimetoprima":["sulfametoxazol","smx-tmp","bactrim"],"fosfomicina-trometamol":["fosfomicina"],
  "sais-de-reidratacao-oral":["reidratacao oral","sro"],"escopolamina":["escopolamina","hioscina","buscopan"],
  "dimenidrinato":["dimenidrinato","dramin"],"adrenalina":["adrenalina","epinefrina"],"dipirona":["dipirona","metamizol"],
  "paracetamol":["paracetamol"],
  "insulina-regular":["insulina regular","insulina"],"glicose-50":["glicose 50","glicose hipertonica"],"cloreto-de-potassio":["cloreto de potassio","kcl"],
  "sulfato-de-magnesio":["sulfato de magnesio","mgso4"],"gluconato-de-calcio":["gluconato de calcio","gliconato de calcio"],"bicarbonato-de-sodio":["bicarbonato de sodio","bicarbonato"],
  "cloreto-de-sodio-20":["cloreto de sodio 20","nacl 20"],"acido-valproico":["acido valproico","valproato"],"cetamina":["escetamina","cetamina"],"fentanil":["fentanil","fentanila"],
  "succinilcolina":["succinilcolina","suxametonio"],"noradrenalina":["noradrenalina","norepinefrina"],"lidocaina":["lidocaina ev"],"heparina":["heparina nao fracionada","heparina"],"codeina":["codeina"],"dexclorfeniramina":["dexclorfeniramina"],"loratadina":["loratadina"]
};
// o peso da criança fica só na memória (regra 5); versões antigas o salvavam em rxp_med_v1
const mui=Object.assign({grupo:null,via:null,sel:MEDS[0]&&MEDS[0].id,rename:false},lsGet("rxp_med_v1",{}),{peso:""});
const saveMui=()=>lsSet("rxp_med_v1",{grupo:mui.grupo,via:mui.via,sel:mui.sel,rename:!!mui.rename});
const medById=Object.fromEntries(MEDS.map(m=>[m.id,m]));
// nomes comerciais: campo "marcas" da ficha ou, na falta dele, os nomes com inicial maiúscula entre parênteses nas apresentações
const MARCA_FORA=new Set(["RENAME","SUS","EV","IM","VO","SC","F","ou"]);
function medMarcas(m){
  if(Array.isArray(m.marcas)) return m.marcas;
  const out=[];
  for(const p of (m.apresentacoes||[]).join(" ").match(/\(([^)]*)\)/g)||[])
    for(let t of p.slice(1,-1).split(/[,;]/)){
      const w=t.trim().split(/\s+/); const nome=[];
      for(const x of w){ if(/^[A-ZÀ-Ú][A-Za-zÀ-ú0-9-]*$/.test(x)||(nome.length&&/^[A-Z0-9]{1,3}$/.test(x))) nome.push(x); else break; }
      const n=nome.join(" ");
      if(n&&!MARCA_FORA.has(n)&&!/^[A-Z0-9]{1,3}$/.test(n)&&!/\d\s*(mg|mL|g|%)/i.test(t.split(n)[0])&&!out.includes(n)) out.push(n);
    }
  return out;
}
const medTerms=m=>(MALIAS[m.id]||[norm(m.nome.split(/[ (+]/)[0])]).map(norm);
function medHay(m){return norm([m.nome,m.classe,m.subclasse,m.mecanismo,(m.vias||[]).join(" "),(m.apresentacoes||[]).join(" "),(m.alertas||[]).join(" "),m.gestacao,(MALIAS[m.id]||[]).join(" "),MGRUPOS[m.grupo]?.nome].join(" "))}
function medsNaConduta(it){
  const t=" "+norm([it.casa,it.unidade].join(" ")).replace(/[^a-z0-9]+/g," ")+" ";
  return MEDS.filter(m=>medTerms(m).some(w=>t.includes(" "+w.replace(/[^a-z0-9]+/g," ").trim())));
}
function renderMedFilters(){
  $("#mgrupos").innerHTML=`<button class="chip" data-mg="" aria-pressed="${!mui.grupo}" style="--c:var(--ink)">Todas</button>`+
    Object.entries(MGRUPOS).map(([k,v])=>`<button class="chip" data-mg="${k}" aria-pressed="${mui.grupo===k}" style="--c:var(--${v.cor})">${esc(v.nome)}</button>`).join("");
  $("#mvias").innerHTML=`<span class="lbl">Via:</span>`+["EV","IM","VO"].map(v=>`<button class="chip" data-mv2="${v}" aria-pressed="${mui.via===v}" style="--c:var(--slate)">${v}</button>`).join("")+`<button class="chip" id="mRename" aria-pressed="${!!mui.rename}" style="--c:var(--green)">Só RENAME</button>`;
  $("#mRename").onclick=()=>{mui.rename=!mui.rename;saveMui();renderMedFilters();renderMedList()};
  $$("#mgrupos [data-mg]").forEach(b=>b.onclick=()=>{mui.grupo=b.dataset.mg||null;saveMui();renderMedFilters();renderMedList()});
  $$("#mvias [data-mv2]").forEach(b=>b.onclick=()=>{mui.via=mui.via===b.dataset.mv2?null:b.dataset.mv2;saveMui();renderMedFilters();renderMedList()});
}
function renderMedList(){
  const q=norm($("#mq").value.trim()); const words=q.split(/\s+/).filter(Boolean);
  let items=MEDS.filter(m=>(!mui.grupo||m.grupo===mui.grupo)&&(!mui.via||(m.vias||[]).includes(mui.via))&&(!mui.rename||m.rename===true));
  if(words.length){items=items.map(m=>{const h=medHay(m);if(!words.every(w=>h.includes(w)))return null;return [m,words.reduce((s,w)=>s+(norm(m.nome).includes(w)?3:1),0)]}).filter(Boolean).sort((a,b)=>b[1]-a[1]).map(x=>x[0])}
  $("#mcount").textContent=items.length+" medicaç"+(items.length===1?"ão":"ões");
  let html="",last=null;
  for(const m of items){
    const g=MGRUPOS[m.grupo]||{nome:"Outras",cor:"slate"};
    if(!words.length&&m.grupo!==last){last=m.grupo;html+=`<div class="lh cath" style="--c:var(--${g.cor})">${esc(g.nome)}</div>`}
    html+=`<button class="item" role="listitem" data-mid="${m.id}" aria-current="${m.id===mui.sel}" style="--c:var(--${g.cor})"><span class="dot"></span><span class="n">${esc(m.nome)}${medMarcas(m).length?`<small class="mmarca">${esc(medMarcas(m).slice(0,3).join(", "))}${medMarcas(m).length>3?"…":""}</small>`:""}<small class="mcl">${esc(m.classe||"")}</small></span><span class="m">${(m.vias||[]).join(" · ")}</span></button>`;
  }
  $("#mlist").innerHTML=items.length?html:`<div class="empty">Nenhuma medicação encontrada.</div>`;
  $$("#mlist [data-mid]").forEach(b=>b.onclick=()=>selectMed(b.dataset.mid));
}
function selectMed(id){mui.sel=id;saveMui();usoRecente("m:"+id);renderMedList();renderMedDetail();$("#tab-medicacoes").classList.add("show-detail");if(matchMedia("(max-width:860px)").matches)window.scrollTo({top:0})}
function openMed(id){setTab("medicacoes");selectMed(id)}
const medAltaVig=m=>(m.alertas||[]).some(a=>/ismp|potencialmente perigos|alta vigil/i.test(a));
function medCalcRows(m){
  const p=parseFloat(String(mui.peso||"").replace(",","."));
  const nf=n=>n.toLocaleString("pt-BR",{maximumFractionDigits:n<10?2:1});
  return m.ped_calc.map(c=>{
    let v="—";
    if(p>0&&p<150){const raw=c.mgkg*p;const cap=c.max_mg!=null&&raw>c.max_mg;v=`<b>${nf(cap?c.max_mg:raw)} mg</b>${cap?` <span class="teto">teto</span>`:""}`}
    return `<tr><td>${esc(c.rotulo)}</td><td>${nf(c.mgkg)} mg/kg${c.max_mg!=null?` (máx. ${nf(c.max_mg)} mg)`:""}</td><td>${v}</td><td>${esc(c.intervalo||"")} · ${esc(c.via||"")}</td></tr>`}).join("");
}
function medPedCalc(m){
  if(!m.ped_calc||!m.ped_calc.length) return "";
  return `<div class="mcalc"><label class="f">Peso da criança (kg)<input class="inp" id="mPeso" type="number" inputmode="decimal" min="1" max="150" value="${esc(String(mui.peso||""))}" placeholder="ex.: 15"></label>
    <div class="tblw"><table class="ftbl"><thead><tr><th>Uso</th><th>Dose</th><th>Por dose</th><th>Intervalo · via</th></tr></thead><tbody id="mCalcBody">${medCalcRows(m)}</tbody></table></div>
    <p class="note">Cálculo apenas das doses com mg/kg explícito na fonte. Confira a apresentação disponível antes de converter para mL ou gotas.</p></div>`;
}
function medSec(t,arr,cor,cls=""){ if(!arr||(Array.isArray(arr)&&!arr.length)||(!Array.isArray(arr)&&!String(arr).trim())) return "";
  const body=Array.isArray(arr)?`<ul>${arr.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<p>${esc(arr)}</p>`;
  return `<section class="msec ${cls}" style="--c:var(--${cor})"><h3>${t}</h3>${body}</section>`}
function medTexto(m){
  const L=[m.nome+" — "+[m.classe,m.subclasse].filter(Boolean).join(" · ")];
  const add=(t,a)=>{if(!a||(Array.isArray(a)&&!a.length)||(!Array.isArray(a)&&!String(a).trim()))return;L.push("",t+":");(Array.isArray(a)?a:[a]).forEach(x=>L.push("- "+x))};
  add("Apresentações",m.apresentacoes);add("Adulto",m.adulto);add("Pediatria",m.pediatria);add("Diluição e administração",m.diluicao);
  add("Rim",m.renal);add("Fígado",m.hepatica);add("Gestação",m.gestacao);add("Lactação",m.lactacao);add("Contraindicações",m.contraindicacoes);add("Alertas",m.alertas);add("Fontes",m.fontes);
  return L.join("\n");
}
// renderiza a ficha na aba Remédios ou, com folha=true, na janela que abre por cima (23-conexoes.js)
function renderMedDetail(el=$("#mdetail"),m=medById[mui.sel]||MEDS[0],folha=false){
  if(!m){el.innerHTML="";return}
  const q=s=>el.querySelector(s);
  const g=MGRUPOS[m.grupo]||{nome:"",cor:"slate"};
  const usadas=allItems().filter(it=>medsNaConduta(it).some(x=>x.id===m.id));
  el.innerHTML=`<div class="dh">
    ${folha?"":`<button class="btn sm back" id="mBack">← Lista</button>`}
    <span class="cat" style="--c:var(--${g.cor})"><span class="dot"></span>${esc(g.nome)}</span>
    <h2>${esc(m.nome)}</h2>${medMarcas(m).length?`<p class="mmarcas">${esc(medMarcas(m).join(", "))}</p>`:""}
    <div class="meta"><span class="badge cl" style="--c:var(--${g.cor})">${esc(m.classe||"")}${m.subclasse?" · "+esc(m.subclasse):""}</span>
      ${(m.vias||[]).map(v=>`<span class="cid">${esc(v)}</span>`).join("")}
      ${m.rename===true?`<span class="badge ok">RENAME</span>`:""}
      ${medAltaVig(m)?`<span class="badge bad">Alta vigilância</span>`:""}</div>
    ${m.mecanismo?`<p class="note">${esc(m.mecanismo)}</p>`:""}
    <div class="actions"><button class="btn primary" id="mCopy">Copiar ficha</button></div>
  </div>
  ${medSec("Apresentações",m.apresentacoes,"slate")}
  ${medSec("Adulto",m.adulto,"sky")}
  ${medSec("Pediatria",m.pediatria,"pink")}${medPedCalc(m)}
  ${medSec("Diluição e administração",m.diluicao,"teal")}
  <div class="mgrid">${medSec("Rim",m.renal,"indigo")}${medSec("Fígado",m.hepatica,"orange")}${medSec("Gestação",m.gestacao,"pink")}${medSec("Lactação",m.lactacao,"violet")}</div>
  ${medSec("Contraindicações",m.contraindicacoes,"red")}
  ${medSec("Alertas",m.alertas,"amber","warnsec")}
  ${usadas.length?`<section class="msec" style="--c:var(--accent)"><h3>Aparece nas condutas</h3><div class="medlinks">${usadas.map(it=>`<button class="chip" data-cond="${esc(it.id)}" style="--c:var(--accent)">${esc(it.nome)}</button>`).join("")}</div></section>`:""}
  <details class="sec fontes" open><summary class="sec-h"><h3>Fontes</h3></summary><ol>${(m.fontes||[]).map(f=>`<li>${esc(f)}</li>`).join("")}</ol></details>
  <p class="note">Diluições marcadas como usuais variam entre serviços: confira o protocolo da sua unidade.</p>`;
  if(q("#mBack")) q("#mBack").onclick=()=>{$("#tab-medicacoes").classList.remove("show-detail");window.scrollTo({top:0})};
  q("#mCopy").onclick=e=>copy(medTexto(m),e.currentTarget);
  const pi=q("#mPeso"); if(pi) pi.addEventListener("input",()=>{mui.peso=pi.value;saveMui();q("#mCalcBody").innerHTML=medCalcRows(m)});
  el.querySelectorAll("[data-cond]").forEach(b=>b.onclick=()=>{const ir=()=>{setTab("prescricoes");select(b.dataset.cond)};folha?fecharFicha(ir):ir()});
  linkMeds(el,m.id);
}
$("#mq").addEventListener("input",renderMedList);
$("#mq").addEventListener("keydown",e=>{if(e.key==="Enter"){const f=$("#mlist [data-mid]");if(f)selectMed(f.dataset.mid)}});
function renderMedTab(){renderMedFilters();renderMedList();renderMedDetail();
  if(matchMedia("(max-width:860px)").matches) $("#tab-medicacoes").classList.remove("show-detail"); else $("#tab-medicacoes").classList.add("show-detail");}

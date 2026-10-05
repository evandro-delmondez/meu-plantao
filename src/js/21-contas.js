/* ---------- contas de laboratório e ECG ---------- */
// cada conta: campos, função que devolve linhas de resultado (ou null se faltar dado) e fontes
const CONTAS=[
{id:"ag",t:"Ânion gap e delta/delta",cor:"violet",
 campos:[["na","Na"],["cl","Cl"],["hco3","HCO3"],["alb","Albumina (opcional)"]],
 calc:v=>{if(!(v.na>0&&v.cl>0&&v.hco3>0))return null;const ag=v.na-(v.cl+v.hco3);const l=[`Ânion gap: <b>${fmtN(ag,1)}</b> mEq/L`];
  // Harrison: corrigir para albumina de 4,5 g/dL; ânion gap alto se > 10; delta com valores normais AG 10 e HCO3 25
  let agc=ag; if(v.alb>0){agc=ag+2.5*(4.5-v.alb);l.push(`Corrigido pela albumina: <b>${fmtN(agc,1)}</b> mEq/L`)}
  l.push(agc>10?"Ânion gap aumentado (> 10 mEq/L).":"Ânion gap normal.");
  if(v.hco3<25&&agc>10){const r=(agc-10)/(25-v.hco3);l.push(`Delta/delta: <b>${fmtN(r,2)}</b> — ${r<1?"sugere acidose sem ânion gap associada":r>2?"sugere alcalose metabólica associada":"acidose com ânion gap aumentado isolada"}`)}
  return l},
 src:["Harrison's Principles of Internal Medicine, 22ª ed. (McGraw Hill, 2025), cap. 58 — Acidosis and Alkalosis (tabelas 58-1 e 58-3).","Figge J et al. Anion gap and hypoalbuminemia (Crit Care Med 1998;26:1807): 2,5 mEq/L por g/dL de albumina.","Rastegar A. Use of the ΔAG/ΔHCO3− ratio in the diagnosis of mixed acid-base disorders (J Am Soc Nephrol 2007;18:2429): interpretação da razão."]},
{id:"gas",t:"Gasometria: distúrbio e compensação",cor:"sky",
 campos:[["ph","pH"],["pco2","pCO2 (mmHg)"],["hco3","HCO3"]],
 calc:v=>{if(!(v.ph>6.5&&v.ph<8&&v.pco2>0&&v.hco3>0))return null;const l=[];
  if(v.ph<7.35&&v.hco3<22){const e=1.5*v.hco3+8;l.push(`Acidose metabólica. pCO2 esperada (Winter): <b>${fmtN(e-2,0)}–${fmtN(e+2,0)}</b> mmHg`);l.push(v.pco2>e+2?"pCO2 acima do esperado: acidose respiratória associada.":v.pco2<e-2?"pCO2 abaixo do esperado: alcalose respiratória associada.":"Compensação respiratória adequada.")}
  else if(v.ph>7.45&&v.hco3>26){const e=0.7*v.hco3+21;l.push(`Alcalose metabólica. pCO2 esperada: <b>${fmtN(e-2,0)}–${fmtN(e+2,0)}</b> mmHg`);l.push(v.pco2>e+2?"pCO2 acima do esperado: acidose respiratória associada.":v.pco2<e-2?"pCO2 abaixo do esperado: alcalose respiratória associada.":"Compensação respiratória adequada.")}
  else if(v.ph<7.35&&v.pco2>45){const d=v.pco2-40;l.push(`Acidose respiratória. HCO3 esperado: aguda <b>${fmtN(24+0.1*d,1)}</b>; crônica <b>${fmtN(24+0.4*d,1)}</b> mEq/L`);l.push(v.hco3<24+0.1*d-2?"HCO3 abaixo do esperado: acidose metabólica associada.":v.hco3>24+0.4*d+2?"HCO3 acima do esperado: alcalose metabólica associada.":"Compare com o valor medido para saber se é aguda, crônica ou intermediária.")}
  else if(v.ph>7.45&&v.pco2<35){const d=40-v.pco2;l.push(`Alcalose respiratória. HCO3 esperado: aguda <b>${fmtN(24-0.2*d,1)}</b>; crônica <b>${fmtN(24-0.4*d,1)}</b> mEq/L`);l.push(v.hco3>24-0.2*d+2?"HCO3 acima do esperado: alcalose metabólica associada.":v.hco3<24-0.4*d-2?"HCO3 abaixo do esperado: acidose metabólica associada.":"Compare com o valor medido para saber se é aguda, crônica ou intermediária.")}
  else l.push("pH normal ou distúrbio não classificável só com estes valores: considerar distúrbio misto e calcular o ânion gap.");
  return l},
 src:["Harrison's Principles of Internal Medicine, 22ª ed. (McGraw Hill, 2025), cap. 58 — Acidosis and Alkalosis (tabelas 58-1 e 58-3) — equação de Winter e compensações respiratórias agudas e crônicas (a partir de pCO2 40 e HCO3 24).","Berend K, de Vries APJ, Gans ROB. Physiological approach to assessment of acid-base disturbances (N Engl J Med 2014;371:1434) — alcalose metabólica: pCO2 = 0,7 × HCO3 + 21 ± 2.","Albert MS, Dell RB, Winters RW. Quantitative displacement of acid-base equilibrium in metabolic acidosis (Ann Intern Med 1967;66:312)."]},
{id:"nac",t:"Sódio corrigido pela glicemia",cor:"teal",
 campos:[["na","Na"],["gli","Glicose"]],
 calc:v=>{if(!(v.na>0&&v.gli>0))return null;const x=Math.max(0,v.gli-100)/100;return [`Fator 1,6 (Katz): <b>${fmtN(v.na+1.6*x,1)}</b> mEq/L`,`Fator 2,4 (Hillier): <b>${fmtN(v.na+2.4*x,1)}</b> mEq/L`]},
 src:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 56 — Fluid and Electrolyte Disturbances: o sódio cai 1,6–2,4 mEq/L a cada 100 mg/dL de glicose.","Hillier TA, Abbott RD, Barrett EJ. Hyponatremia: evaluating the correction factor for hyperglycemia (Am J Med 1999;106:399) — fator 2,4; o fator clássico de Katz é 1,6 por 100 mg/dL acima de 100."]},
{id:"osm",t:"Osmolaridade calculada",cor:"indigo",
 campos:[["na","Na"],["gli","Glicose"],["ureia","Ureia (opcional)"]],
 calc:v=>{if(!(v.na>0&&v.gli>0))return null;const ef=2*v.na+v.gli/18;const l=[`Efetiva (2 × Na + glicose/18): <b>${fmtN(ef,0)}</b> mOsm/kg`];if(v.ureia>0)l.push(`Total (+ ureia/6): <b>${fmtN(ef+v.ureia/6,0)}</b> mOsm/kg`);return l},
 src:["Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (Diabetes Care 2024;47:1257) — osmolalidade efetiva = 2 × Na + glicose/18. Ureia/6 equivale a BUN/2,8."]},
{id:"ca",t:"Cálcio corrigido pela albumina",cor:"amber",
 campos:[["ca","Cálcio total (mg/dL)"],["alb","Albumina"]],
 calc:v=>{if(!(v.ca>0&&v.alb>0))return null;return [`Cálcio corrigido: <b>${fmtN(v.ca+0.8*(4-v.alb),1)}</b> mg/dL`,"Na dúvida (paciente grave, distúrbio ácido-base), dosar cálcio iônico."]},
 src:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 57 — Hypercalcemia and Hypocalcemia: + 0,8 mg/dL por g/dL de albumina abaixo de 4,0.","Payne RB et al. Interpretation of serum calcium in patients with abnormal serum proteins (Br Med J 1973;4:643)."]},
{id:"qtc",t:"QT corrigido",cor:"red",
 campos:[["qt","QT (ms)"],["fc","FC (bpm)"]],
 calc:v=>{if(!(v.qt>100&&v.fc>20))return null;const rr=60/v.fc;const b=v.qt/Math.sqrt(rr),f=v.qt/Math.cbrt(rr);
  const i=q=>q>=500?' <span class="warn">≥ 500 ms: alto risco de torsades de pointes</span>':q>460?" (prolongado)":q>450?" (prolongado em homens)":"";
  return [`Bazett: <b>${fmtN(b,0)}</b> ms${i(b)}`,`Fridericia: <b>${fmtN(f,0)}</b> ms${i(f)}`,"Com FC alta, Bazett superestima o QTc; prefira Fridericia. Aumento > 60 ms em relação à linha de base também é alerta."]},
 src:["Rautaharju PM et al. AHA/ACCF/HRS Recommendations for the Standardization and Interpretation of the ECG, part IV (Circulation 2009;119:e241): QTc prolongado > 450 ms em homens e > 460 ms em mulheres.","Drew BJ et al. Prevention of torsade de pointes in hospital settings: AHA/ACCF Scientific Statement (Circulation 2010;121:1047): QTc > 500 ms ou aumento > 60 ms."]},
{id:"clcr",t:"Clearance de creatinina (Cockcroft-Gault)",cor:"green",
 campos:[["idade","Idade (anos)"],["peso","Peso (kg)"],["cr","Creatinina"],["fem","Sexo feminino (1 = sim)"]],
 calc:v=>{if(!(v.idade>0&&v.peso>0&&v.cr>0))return null;return [`ClCr estimado: <b>${fmtN(cockcroft(v.idade,v.peso,v.cr,v.fem===1),0)}</b> mL/min`,"Use para ajuste de dose conforme a bula de cada medicamento."]},
 src:["Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine (Nephron 1976;16:31)."]}
];
const contasVal={}; // só na memória
function renderContas(){
  $("#contas").innerHTML=CONTAS.map(c=>`<div class="panel card conta" style="--c:var(--${c.cor})"><h2>${esc(c.t)}</h2>
    <div class="row">${c.campos.map(([k,l])=>k==="fem"?`<label class="check"><input type="checkbox" data-ct="${c.id}" data-k="fem" ${contasVal[c.id]&&contasVal[c.id].fem===1?"checked":""}> Sexo feminino</label>`:`<label class="f">${esc(l)}<input class="inp" type="number" inputmode="decimal" step="any" data-ct="${c.id}" data-k="${k}" value="${contasVal[c.id]&&contasVal[c.id][k]!=null?contasVal[c.id][k]:""}"></label>`).join("")}</div>
    <div class="scres" id="ct-${c.id}"></div>
    <details class="fontes"><summary>Fontes</summary><ul>${c.src.map(s=>`<li>${linkify(s)}</li>`).join("")}</ul></details></div>`).join("");
  $$("#contas [data-ct]").forEach(i=>i.addEventListener("input",()=>{const v=contasVal[i.dataset.ct]=contasVal[i.dataset.ct]||{};v[i.dataset.k]=i.type==="checkbox"?(i.checked?1:0):numBr(i.value);contaRes(i.dataset.ct)}));
  CONTAS.forEach(c=>contaRes(c.id));
}
function contaRes(id){const c=CONTAS.find(x=>x.id===id);const r=c.calc(contasVal[id]||{});$("#ct-"+id).innerHTML=r?r.join("<br>"):`<span class="note">Preencha os campos.</span>`}

/* ---------- eletrólitos ---------- */
let elSel=null;
function renderEletrolitos(){
  if(!ELETROLITOS.length){$("#elCorpo").innerHTML=`<p class="note">Conteúdo em preparação.</p>`;return}
  const e=ELETROLITOS.find(x=>x.id===elSel)||ELETROLITOS[0]; elSel=e.id;
  $("#elLista").innerHTML=ELETROLITOS.map(x=>`<button class="chip" data-el="${esc(x.id)}" aria-pressed="${x.id===e.id}" style="--c:var(--teal)">${esc(x.nome)}</button>`).join("");
  $$("#elLista [data-el]").forEach(b=>b.onclick=()=>{elSel=b.dataset.el;renderEletrolitos()});
  const lista=(t,a,cor)=>a&&a.length?`<div class="msec" style="--c:var(--${cor})"><h3>${t}</h3><ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:"";
  $("#elCorpo").innerHTML=`<div class="panel card"><h2>${esc(e.nome)}</h2>
    ${(e.faixas||[]).map(f=>`<div class="msec" style="--c:var(--indigo)"><h3>${esc(f.rot)}</h3>${f.condicao?`<p>${esc(f.condicao)}</p>`:""}<ul>${(f.conduta||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}
  </div><div class="panel card">${lista("Via oral",e.via_oral,"green")}${lista("Via endovenosa",e.via_ev,"red")}${lista("Monitorar",e.monitorar,"sky")}${lista("Atenção",e.alertas,"warn")}
    <details class="fontes"><summary>Fontes</summary><ul>${(e.fontes||[]).map(s=>`<li>${linkify(s)}</li>`).join("")}</ul></details></div>`;
  linkMeds($("#elCorpo"));
}

/* Pediatria: prescrições calculadas pelo peso (p, kg) e idade (m, meses). */
const PF={
sbpFebre:"Sociedade Brasileira de Pediatria. Documento científico: Manejo da febre aguda, 2021. https://www.sbp.com.br/fileadmin/user_upload/23229c-DC_Manejo_da_febre_aguda.pdf",
aapOma:"Lieberthal AS et al. AAP: The Diagnosis and Management of Acute Otitis Media (Pediatrics 2013;131:e964). https://publications.aap.org/pediatrics/article/131/3/e964/30912/",
idsaGas:"Shulman ST et al. IDSA Clinical Practice Guideline for Group A Streptococcal Pharyngitis (Clin Infect Dis 2012;55:e86).",
aapSinus:"Wald ER et al. AAP Clinical Practice Guideline: Acute Bacterial Sinusitis in Children 1 to 18 Years (Pediatrics 2013).",
pidsCap:"Bradley JS et al. PIDS/IDSA: Management of CAP in Infants and Children Older Than 3 Months (Clin Infect Dis 2011). Resumo AAFP: https://www.aafp.org/pubs/afp/issues/2012/0715/p196.html",
scout:"Williams DJ et al. SCOUT-CAP: 5 vs 10 dias de antibiótico na PAC pediátrica (JAMA Pediatr 2022).",
aapItu:"AAP Subcommittee on UTI. Clinical Practice Guideline: initial UTI in febrile infants and children 2–24 months (Pediatrics 2011;128:595). https://publications.aap.org/pediatrics/article/128/3/595/30724/",
gina:"GINA 2025 — crianças ≤ 5 anos: exacerbação (salbutamol e prednisolona). https://ginasthma.org",
sbpDia:"Sociedade Brasileira de Pediatria. Guia Prático: Diarreia Aguda Infecciosa, 2023.",
aapBronq:"Ralston SL et al. AAP: Bronchiolitis (Pediatrics 2014;134:e1474).",
cochraneCrupe:"Gates A et al. Glucocorticoids for croup in children (Cochrane 2018); Bjornson C et al. Nebulized epinephrine for croup (Cochrane 2013).",
bula:"Bula do medicamento registrada na Anvisa (faixa etária e posologia).",
idsaPele:"Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014).",
iusti:"Salavastru CM et al. European guideline for the management of scabies — IUSTI (2017).",
oms:"OMS. Preventive chemotherapy to control soil-transmitted helminth infections (albendazol 200 mg de 1 a 2 anos; 400 mg a partir de 2 anos).",
aao:"American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern, 2018.",
naspghan:"Tabbers MM et al. ESPGHAN/NASPGHAN: Evaluation and treatment of functional constipation in infants and children (J Pediatr Gastroenterol Nutr 2014). Doses: Manual MSD. https://www.msdmanuals.com/professional/multimedia/table/treatment-of-constipation-in-children",
honey:"Oduwole O et al. Honey for acute cough in children (Cochrane 2018). FDA (2008): antitussígenos e antigripais de venda livre não devem ser usados em menores de 2 anos.",
aapUrt:"Bula da cetirizina e da loratadina (posologia pediátrica por idade/peso)."
};
const pr=(x,d=1)=>{const f=Math.pow(10,d);return Math.round(x*f)/f};
const fm=x=>pr(x,1).toLocaleString("pt-BR",{maximumFractionDigits:1});
const mlDose=(mg,conc)=>{const v=mg/conc;return v>=10?Math.round(v*2)/2:pr(v,1)};
const idadeTxt=m=>m<24?`${m} meses`:`${Math.floor(m/12)} anos`;

const PEDS=[
{id:"febre",nome:"Febre / dor",cid:"R50.9",fontes:["sbpFebre","bula"],
gen(p,m){
 // paracetamol 200 mg/mL: abaixo de 12 anos a bula limita a 35 gotas por dose (≈ 2,2 mL = 440 mg, com 14–16 gotas/mL); a partir de 12 anos, até 750 mg
 const paMax=m<144?440:750, pa=[10*p,15*p].map(x=>Math.min(x,paMax)), dp=[10*p,12*p].map(x=>Math.min(x,1000)), ib=[5*p,10*p].map(x=>Math.min(x,400));
 const g=(mg,c)=>Math.round(mg/c*20);
 let t=`Uso oral\n1) Paracetamol 200 mg/mL gotas ---------------- 1 fr\nDar de ${fm(Math.floor(pa[0]/200*10)/10)} a ${fm(Math.floor(pa[1]/200*10)/10)} mL (${fm(Math.floor(pa[0]/200*10)/10*200)}–${fm(Math.floor(pa[1]/200*10)/10*200)} mg) VO de 6/6h se febre ou dor. Máx. 75 mg/kg/dia. Medir em mL com seringa oral: o número de gotas por mL varia entre marcas; abaixo de 12 anos, a bula limita a 35 gotas (cerca de 2,2 mL) por dose.`;
 if(m>=3&&p>=5) t+=`\nou\n1) Dipirona 500 mg/mL gotas ------------------- 1 fr\nDar de ${g(dp[0],500)} a ${g(dp[1],500)} gotas (${fm(dp[0])}–${fm(dp[1])} mg) VO de 6/6h se febre ou dor.`;
 if(m>=6) t+=`\nou\n1) Ibuprofeno 50 mg/mL ------------------------ 1 fr\nDar de ${fm(ib[0]/50)} a ${fm(ib[1]/50)} mL (${fm(ib[0])}–${fm(ib[1])} mg) VO de 6/6h a 8/8h se febre ou dor.`;
 return {casa:t,orient:`- Não alternar nem associar antitérmicos (SBP): confunde a família e aumenta o risco de superdosagem.\n- "1 gota/kg" de dipirona leva a superdosagem; seguir a dose calculada.\n- Retorno se prostração, dificuldade para respirar, manchas na pele, recusa de líquidos ou febre > 72h.${m<3?"\n- Lactente < 3 meses com febre: avaliação clínica e laboratorial, não apenas antitérmico.":""}`,
 aviso:m<3?"Dipirona não deve ser usada em menores de 3 meses ou 5 kg; ibuprofeno a partir de 6 meses (bula).":m<6?"Ibuprofeno somente a partir de 6 meses (bula).":""};
}},
{id:"ivas",nome:"Resfriado / tosse aguda",cid:"J00",fontes:["honey","sbpFebre"],
gen(p,m){
 let t=`Uso nasal\n1) Soro fisiológico 0,9% --------------------- 1 fr\nPingar/lavar as narinas várias vezes ao dia${m<24?", aspirando antes das mamadas":""}.`;
 if(m>=12) t+=`\n\nUso oral\n2) Mel ----------------------------------------\nDar 2,5 a 5 mL (½ a 1 colher de chá) antes de dormir, se tosse.`;
 return {casa:t,orient:`- Febre/dor: usar a prescrição de Febre / dor.\n- Não usar xaropes antitussígenos/antigripais em menores de 2 anos; codeína é contraindicada em menores de 12 anos.${m<12?"\n- Não dar mel a menores de 1 ano (risco de botulismo).":""}\n- Retorno se respiração rápida, esforço para respirar, febre > 72h ou piora.`};
}},
{id:"oma",nome:"Otite média aguda",cid:"H66.9",fontes:["aapOma"],
gen(p,m){
 const dias=m<24?10:(m<72?7:"5 a 7");
 const d=Math.min(45*p,2000);
 const half=Math.min(22.5*p,1000);
 const cef=Math.min(15*p,500), ctx=Math.min(50*p,1000);
 return {casa:`Uso oral\n1) Amoxicilina 400 mg/5 mL -------------------- (${fm(mlDose(d,80)*2*(dias===10?10:7))} mL)\nDar ${fm(mlDose(d,80))} mL (${fm(d)} mg) VO de 12/12h por ${dias} dias.\n\n# Se amoxicilina nos últimos 30 dias, conjuntivite purulenta associada ou falha em 48–72h:\n1) Amoxicilina 400 mg/5 mL ${fm(mlDose(half,80))} mL + Amoxicilina + clavulanato 400/57 por 5 mL ${fm(mlDose(half,80))} mL, juntos, VO de 12/12h por ${dias} dias\n(total de 90 mg/kg/dia de amoxicilina com 6,4 mg/kg/dia de clavulanato).\n\n# Alergia a penicilina não anafilática:\n1) Cefuroxima 250 mg/5 mL ---------------------\nDar ${fm(mlDose(cef,50))} mL (${fm(cef)} mg) VO de 12/12h por 10 dias.\nou\n1) Ceftriaxona ${fm(ctx)} mg IM 1x/dia por 1 a 3 dias.`,
 orient:`- Observação sem antibiótico é uma opção a partir de 6 meses se unilateral sem sinais de gravidade (6–23 meses), ou não grave a partir de 2 anos — com retorno garantido em 48–72h.\n- Analgesia sempre (ver Febre / dor).`};
}},
{id:"faringite",nome:"Faringite estreptocócica",cid:"J02.0",fontes:["idsaGas"],
gen(p,m){
 const u=Math.min(50*p,1000), b=Math.min(25*p,500), cfx=Math.min(20*p,500), az=Math.min(12*p,500), cl=Math.min(7*p,300);
 return {casa:`Uso oral\n1) Amoxicilina 250 mg/5 mL --------------------\nDar ${fm(mlDose(u,50))} mL (${fm(u)} mg) VO 1x ao dia por 10 dias\nou ${fm(mlDose(b,50))} mL (${fm(b)} mg) VO de 12/12h por 10 dias.\nou\n1) Penicilina G benzatina ${p<27?"600.000":"1.200.000"} UI IM, dose única (${p<27?"< 27 kg":"≥ 27 kg"}).\n\n# Alergia a penicilina:\n1) Cefalexina 250 mg/5 mL ${fm(mlDose(cfx,50))} mL (${fm(cfx)} mg) VO de 12/12h por 10 dias (se reação não anafilática)\nou\n1) Azitromicina 200 mg/5 mL ${fm(mlDose(az,40))} mL (${fm(az)} mg) VO 1x ao dia por 5 dias\nou\n1) Clindamicina ${fm(cl)} mg VO de 8/8h por 10 dias.`,
 orient:`- Tratar só com quadro compatível e, idealmente, teste rápido/cultura positivos.\n- Retorno se dificuldade para abrir a boca, babar ou respirar.`,
 aviso:m<36?"Faringite estreptocócica é incomum abaixo de 3 anos.":""};
}},
{id:"sinusite",nome:"Rinossinusite bacteriana",cid:"J01.9",fontes:["aapSinus"],
gen(p,m){
 const s=Math.min(22.5*p,1000), h=Math.min(45*p,2000);
 return {casa:`Uso oral\n1) Amoxicilina 400 mg/5 mL --------------------\nDar ${fm(mlDose(s,80))} mL (${fm(s)} mg) VO de 12/12h (45 mg/kg/dia)\nou, se risco de resistência (< 2 anos, creche, antibiótico recente): ${fm(mlDose(h,80))} mL (${fm(h)} mg) VO de 12/12h (90 mg/kg/dia).\nDuração habitual: 10 dias.`,
 orient:`- Antibiótico só se: secreção/tosse > 10 dias sem melhora, piora após melhora inicial, ou febre ≥ 39 °C com secreção purulenta por ≥ 3 dias.\n- Retorno imediato se edema ou vermelhidão ao redor do olho.`};
}},
{id:"pac",nome:"Pneumonia adquirida na comunidade",cid:"J18.9",fontes:["pidsCap","scout"],
gen(p,m){
 const d=Math.min(45*p,2000), a1=Math.min(10*p,500), a2=Math.min(5*p,250);
 let t=`Uso oral\n1) Amoxicilina 400 mg/5 mL --------------------\nDar ${fm(mlDose(d,80))} mL (${fm(d)} mg) VO de 12/12h (90 mg/kg/dia) por 5 dias.`;
 if(m>=60) t+=`\n\n# Suspeita de atípico (≥ 5 anos):\n2) Azitromicina 200 mg/5 mL -------------------\nDar ${fm(mlDose(a1,40))} mL (${fm(a1)} mg) no 1º dia e ${fm(mlDose(a2,40))} mL (${fm(a2)} mg) 1x ao dia do 2º ao 5º dia.`;
 return {casa:t,orient:`- Reavaliar em 48–72h.\n- Internar se SatO2 < 92%, esforço respiratório, desidratação, toxemia, lactente < 3–6 meses.`};
}},
{id:"itu",nome:"Infecção urinária",cid:"N39.0",fontes:["aapItu"],
gen(p,m){
 const c=Math.min(12.5*p,1000), ac=Math.min(p*40/3,500), tmp=Math.min(4*p,160);
 let t=`Uso oral (7 a 14 dias; colher urocultura antes)\n1) Cefalexina 250 mg/5 mL ---------------------\nDar ${fm(mlDose(c,50))} mL (${fm(c)} mg) VO de 6/6h (50 mg/kg/dia).\nou\n1) Amoxicilina + clavulanato 250/62,5 por 5 mL \nDar ${fm(mlDose(ac,50))} mL (${fm(ac)} mg de amoxicilina) VO de 8/8h (40 mg/kg/dia).`;
 if(m>=2) t+=`\nou\n1) Sulfametoxazol + trimetoprima 200/40 por 5 mL\nDar ${fm(mlDose(tmp,8))} mL (${fm(tmp)} mg de trimetoprima) VO de 12/12h (8 mg/kg/dia de TMP), conforme sensibilidade local.`;
 return {casa:t,orient:`- Febre na criança pequena sem foco: pensar em ITU e colher urina por método adequado.\n- Internar/antibiótico EV se toxemia, vômitos, desidratação ou < 2 meses.`,aviso:m<2?"Menores de 2 meses: avaliação hospitalar.":""};
}},
{id:"asma",nome:"Crise de asma",cid:"J45.9",fontes:["gina"],
gen(p,m){
 const mx=m<24?20:(m<72?30:40), pr1=Math.min(p,mx), pr2=Math.min(2*p,mx);
 return {casa:`Uso inalatório\n1) Salbutamol 100 mcg spray + espaçador ${m<48?"com máscara":""} -- 1 fr\nFazer ${m<72?"4 a 6":"4 a 10"} jatos, um de cada vez, se chiado ou falta de ar (até de 4/4h), até a reavaliação.\n\nUso oral\n2) Prednisolona 3 mg/mL ------------------------\nDar ${fm(pr1/3)} a ${fm(pr2/3)} mL (${fm(pr1)}–${fm(pr2)} mg) VO 1x ao dia por 3 a 5 dias (máx. ${mx} mg/dia).`,
 unidade:`1) Salbutamol ${m<72?"4 a 6":"4 a 10"} jatos com espaçador a cada 20 min na 1ª hora.\n2) O2 para SatO2 ≥ 94%.\n3) Transferir se sem resposta em 1–2h, não consegue falar/beber, FR > 40, cianose ou SatO2 < 92%.`,
 orient:`- Retorno em 1 a 3 dias e acompanhamento para plano de controle.`};
}},
{id:"diarreia",nome:"Diarreia aguda / desidratação",cid:"A09",fontes:["sbpDia"],
gen(p,m){
 const sro=m<12?"50 a 100 mL":(m<120?"100 a 200 mL":"o volume que aceitar");
 const zn=m<6?10:20;
 const ond=m<6?null:(m<24?2:(p<=30?4:8));
 let t=`Plano A\n1) Sais de reidratação oral ------------------- 10 envelopes\nOferecer ${sro} após cada evacuação.`;
 if(m<60) t+=`\n2) Zinco -------------------------------------\n${zn} mg VO 1x ao dia por 10 a 14 dias.`;
 t+=`\n3) Saccharomyces boulardii (opcional) 250–750 mg/dia por 5 a 7 dias.`;
 return {casa:t,unidade:`Plano B: SRO ${fm(50*p)} a ${fm(100*p)} mL em 4–6h, em pequenos volumes.\nPlano C: SF 0,9% ou Ringer ${fm(30*p)} mL em ${m<12?"1h, depois "+fm(70*p)+" mL em 5h":"30 min, depois "+fm(70*p)+" mL em 2h30"}.${ond?`\nVômitos persistentes: ondansetrona ${ond} mg VO dose única.`:""}`,
 orient:`- Manter aleitamento e alimentação habitual.\n- Retorno se sangue nas fezes, vômitos incoercíveis, sonolência ou pouca urina.`};
}},
{id:"bronquiolite",nome:"Bronquiolite",cid:"J21.9",fontes:["aapBronq"],
gen(p,m){return {casa:`Uso nasal\n1) Soro fisiológico 0,9% --------------------- 1 fr\nPingar e aspirar as narinas antes das mamadas.`,
 unidade:`Não usar de rotina: salbutamol, adrenalina, corticoide, antibiótico, fisioterapia. Sem aceitar VO: hidratação por SNG ou EV.`,
 orient:`- Retorno se esforço para respirar, pausas respiratórias, cianose, recusa alimentar ou menos fraldas molhadas.`}}},
{id:"crupe",nome:"Crupe",cid:"J05.0",fontes:["cochraneCrupe"],
gen(p,m){const d=Math.min(0.6*p,10), ad=Math.min(0.5*p,5);
 return {casa:"",unidade:`1) Dexametasona ${fm(d)} mg (0,6 mg/kg; máx. 10 mg) dose única: IM (4 mg/mL = ${fm(d/4)} mL) ou VO.\n2) Estridor em repouso: adrenalina 1 mg/mL ${fm(ad)} mL nebulizada (0,5 mL/kg; máx. 5 mL); observar 2–4h depois.`,
 orient:`- Retorno se estridor em repouso, esforço respiratório ou dificuldade para engolir.`}}},
{id:"alergia",nome:"Urticária / alergia",cid:"L50.9",fontes:["aapUrt"],
gen(p,m){
 let t;
 if(m<24) t=`Uso oral\n1) Cetirizina 1 mg/mL -------------------------\nDar 2,5 mL (2,5 mg) VO 1x ao dia (a partir de 6 meses).`;
 else if(m<72) t=`Uso oral\n1) Cetirizina 1 mg/mL -------------------------\nDar 2,5 mL (2,5 mg) VO de 12/12h por 5 a 7 dias.\nou\n1) Loratadina 1 mg/mL -------------------------\nDar ${p<=30?"5":"10"} mL VO 1x ao dia por 5 a 7 dias.`;
 else t=`Uso oral\n1) Cetirizina 1 mg/mL -------------------------\nDar 5 mL (5 mg) VO de 12/12h por 5 a 7 dias.\nou\n1) Loratadina 1 mg/mL -------------------------\nDar ${p<=30?"5":"10"} mL VO 1x ao dia por 5 a 7 dias.`;
 return {casa:t,orient:`- Inchaço de lábios/língua, falta de ar ou vômitos após exposição: emergência (anafilaxia — adrenalina IM).`,aviso:m<6?"Cetirizina a partir de 6 meses (bula).":""};
}},
{id:"impetigo",nome:"Impetigo",cid:"L01.0",fontes:["idsaPele"],
gen(p,m){const c=Math.min(12.5*p,500);
 return {casa:`Uso tópico (lesões localizadas)\n1) Mupirocina 2% pomada ----------------------- 1 bisnaga\nAplicar 3x ao dia por 5 dias, após remover as crostas.\n\n# Lesões extensas:\n2) Cefalexina 250 mg/5 mL ---------------------\nDar ${fm(mlDose(c,50))} mL (${fm(c)} mg) VO de 6/6h por 7 dias (50 mg/kg/dia).`,
 orient:`- Afastar da creche/escola até 24h de antibiótico.`}}},
{id:"escabiose",nome:"Escabiose",cid:"B86",fontes:["iusti","bula"],
gen(p,m){let t=`Uso tópico\n1) Permetrina 5% loção ----------------------- 1 fr\nAplicar do pescoço aos pés${m<24?" (lactente: incluir couro cabeludo e face, poupando olhos e boca)":""}, deixar 8–12h e lavar. Repetir após 7 dias.`;
 if(p>=15) t+=`\nou (extensa/surto)\n1) Ivermectina 6 mg --- ${fm(Math.max(0.5,Math.round(p*0.2/6*2)/2))} cp VO dose única, repetir após 7 dias (200 mcg/kg).`;
 return {casa:t,orient:`- Tratar todos os contatos ao mesmo tempo; lavar roupas em água quente.`,aviso:m<2?"Permetrina a partir de 2 meses.":(p<15?"Ivermectina somente a partir de 15 kg.":"")}}},
{id:"verminose",nome:"Verminose",cid:"B82.9",fontes:["oms","bula"],
gen(p,m){ if(m<12) return {casa:"",orient:"",aviso:"Albendazol: uso a partir de 1 ano."};
 return {casa:`Uso oral\n1) Albendazol 40 mg/mL suspensão -------------- 1 fr\nDar ${m<24?"5 mL (200 mg)":"10 mL (400 mg)"} VO dose única.`,orient:`- Lavar mãos e alimentos; água filtrada.`}}},
{id:"conjuntivite",nome:"Conjuntivite bacteriana",cid:"H10.0",fontes:["aao","bula"],
gen(p,m){return {casa:`Uso oftálmico\n1) Tobramicina 0,3% colírio ------------------ 1 fr\nPingar 1 gota no olho afetado de 6/6h por 7 dias.`,orient:`- Limpar secreção com SF; lavar as mãos.\n- Recém-nascido com conjuntivite: avaliação específica (gonococo/clamídia).`}}},
{id:"vomitos",nome:"Vômitos",cid:"R11",fontes:["sbpDia"],
gen(p,m){ if(m<6) return {casa:"",orient:"",aviso:"Ondansetrona: dose SBP a partir de 6 meses."};
 const d=m<24?2:(p<=30?4:8);
 return {casa:`Uso oral\n1) Ondansetrona ${d} mg (comprimido orodispersível) \nDissolver na boca, dose única; repetir só se orientado.`,orient:`- Oferecer SRO em pequenos volumes após 15–30 min.`}}},
{id:"constipacao",nome:"Constipação",cid:"K59.0",fontes:["naspghan"],
gen(p,m){ const peg=[0.4*p,0.8*p].map(x=>Math.min(x,17)), lac=[1*p,3*p].map(x=>Math.min(x,90));
 return {casa:`Uso oral\n1) Polietilenoglicol (macrogol) ---------------\nDar ${fm(peg[0])} a ${fm(peg[1])} g por dia (0,4–0,8 g/kg/dia; máx. 17 g), diluído em água ou suco, ajustando pelo hábito.\nou\n1) Lactulose 667 mg/mL ------------------------\nDar ${fm(lac[0])} a ${fm(lac[1])} mL por dia, em 1 ou 2 tomadas (1–3 mL/kg/dia).`,
 orient:`- Não usar óleo mineral VO em menores de 1 ano ou em crianças com risco de aspiração.\n- Água, fibras e rotina de ir ao banheiro após as refeições.`}}}
];
if (typeof module!=="undefined") module.exports={PF,PEDS};

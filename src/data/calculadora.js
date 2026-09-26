/* ===== Doses por peso (aba Cálculos). Cada bloco precisa de src (fontes); o lint confere. =====
   D(nome, regra, unidade, mg/kg [mín, máx] ou função do peso, concentração mg/mL, opções) */
function D(nome,regra,unit,perkg,conc,o={}){return {nome,regra,unit,perkg,conc,...o}}
const CALC={
adulto:[
 {t:"IOT — sequência rápida",c:"red",src:["Acquisto NM et al. SCCM Clinical Practice Guidelines for Rapid Sequence Intubation in the Critically Ill Adult Patient (Crit Care Med 2023;51:1411).", "Doses de indução e bloqueio: bulas registradas na Anvisa e Walls RM. Manual of Emergency Airway Management."],d:[
  D("Fentanil 50 mcg/mL","2 mcg/kg (1–3)","mcg",[2,2],50),
  D("Etomidato 2 mg/mL","0,3 mg/kg","mg",[0.3,0.3],2),
  D("Cetamina 50 mg/mL","1,5 mg/kg (1–2)","mg",[1.5,1.5],50,{obs:"Confira se é cetamina racêmica ou escetamina (Ketamin): as doses diferem; siga a bula da apresentação disponível."}),
  D("Propofol 10 mg/mL","1,5 mg/kg (1–2)","mg",[1.5,1.5],10,{obs:"Evitar se hipotensão."}),
  D("Midazolam 5 mg/mL","0,2 mg/kg (0,1–0,3)","mg",[0.2,0.2],5),
  D("Succinilcolina 100 mg + 10 mL AD","1,5 mg/kg → 10 mg/mL","mg",[1.5,1.5],10),
  D("Rocurônio 10 mg/mL","1,2 mg/kg","mg",[1.2,1.2],10)]},
 {t:"Crise convulsiva",c:"amber",src:["Glauser T et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus — AES (Epilepsy Curr 2016;16:48).", "Kapur J et al. ESETT: levetiracetam, fosfenitoína ou valproato (N Engl J Med 2019;381:2103).", "Silbergleit R et al. RAMPART: midazolam IM vs lorazepam EV (N Engl J Med 2012).", "Brophy GM et al. Guidelines for the evaluation and management of status epilepticus — Neurocritical Care Society (Neurocrit Care 2012;17:3): fenobarbital 20 mg/kg.", "Bula do fenobarbital injetável (Fenocris, Cristália): velocidade menor que 60 mg/min."],d:[
  D("Diazepam 5 mg/mL EV","0,15–0,2 mg/kg (máx. 10 mg)","mg",[0.15,0.2],5,{max:10}),
  D("Midazolam 5 mg/mL IM","> 40 kg: 10 mg | 13–40 kg: 5 mg","mg",p=>p>40?10:5,5,{fixed:true}),
  D("Fenitoína 50 mg/mL","20 mg/kg em SF 0,9%, até 50 mg/min","mg",[20,20],50,{rate:50}),
  D("Levetiracetam 100 mg/mL","60 mg/kg (máx. 4.500 mg) em 15 min","mg",[60,60],100,{max:4500}),
  D("Ácido valproico 100 mg/mL","40 mg/kg (máx. 3.000 mg) em 10 min","mg",[40,40],100,{max:3000}),
  D("Fenobarbital 100 mg/mL","15–20 mg/kg EV; até 50 mg/min","mg",[15,20],100,{rate:50,obs:"Bula: infundir a menos de 60 mg/min."})]},
 {t:"Sepse, SCA e AVC",c:"violet",src:["Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026.", "ACC/AHA/ACEP/NAEMSP/SCAI. Guideline for the Management of Patients With Acute Coronary Syndromes, 2025 (Circulation).", "AHA/ASA. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (Stroke).", "Bula do tenecteplase (faixas de dose por peso no IAMCSST)."],d:[
  D("Cristaloide na sepse (hipoperfusão)","30 mL/kg nas primeiras 3h","mL",[30,30],1,{vol:true}),
  D("Heparina não fracionada 5.000 UI/mL (SCA)","60 UI/kg em bolus (máx. 4.000 UI)","UI",[60,60],5000,{max:4000,ui:true,obs:"Confira a apresentação: a ampola SC de 5.000 UI/0,25 mL tem 20.000 UI/mL."}),
  D("Enoxaparina (SCA/TEP)","1 mg/kg SC de 12/12h","mg",[1,1],1,{mgonly:true,obs:"Ajustar se ClCr < 30."}),
  D("Tenecteplase — AVC isquêmico","0,25 mg/kg em bolus (máx. 25 mg)","mg",[0.25,0.25],5,{max:25}),
  D("Alteplase — AVC isquêmico (1 mg/mL)","0,9 mg/kg (máx. 90 mg): 10% em bolus, resto em 60 min","mg",[0.9,0.9],1,{max:90,alteplase:true}),
  D("Tenecteplase — IAMCSST","faixas de peso da bula","mg",p=>p<60?30:p<70?35:p<80?40:p<90?45:50,5,{fixed:true})]},
 {t:"Arritmias e endócrino",c:"orange",src:["Joglar JA et al. 2023 ACC/AHA/ACCP/HRS Guideline for Atrial Fibrillation (Circulation 2024;149:e1).", "AHA. 2025 Guidelines for CPR and ECC — Adult Advanced Life Support (lidocaína).", "Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (Diabetes Care 2024;47:1257).", "Ministério da Saúde. Cartilha para tratamento de emergência das queimaduras, 2012."],d:[
  D("Diltiazem 5 mg/mL (FA)","0,25 mg/kg EV em 2 min","mg",[0.25,0.25],5),
  D("Lidocaína 2% (20 mg/mL) — PCR","1–1,5 mg/kg; 2ª dose 0,5–0,75 mg/kg","mg",[1,1.5],20),
  D("Insulina regular — CAD grave","0,1 U/kg/h (EHH: 0,05 U/kg/h)","U/h",[0.1,0.1],1,{uh:true,obs:"Não iniciar insulina se K < 3,5 mEq/L: repor potássio antes."}),
  D("Parkland — queimaduras (Ringer lactato)","2–4 mL × kg × % SCQ em 24h (metade nas primeiras 8h)","mL",[0,0],1,{parkland:[2,4],obs:"Idoso, doença renal crônica ou insuficiência cardíaca: começar com 2–3 mL (MS)."})]},
 {t:"Anafilaxia e choque",c:"pink",src:["Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020).", "Shaker MS et al. Anaphylaxis — a 2020 practice parameter update (J Allergy Clin Immunol 2020)."],d:[
  D("Adrenalina 1 mg/mL IM","0,01 mg/kg (máx. 0,5 mg)","mg",[0.01,0.01],1,{max:0.5}),
  D("SF 0,9% bolus","20 mL/kg","mL",[20,20],1,{vol:true})]},
 {t:"Outros",c:"teal",src:["Bula da ivermectina registrada na Anvisa (200 mcg/kg).", "AACT/EAPCCT. Position Paper: Single-Dose Activated Charcoal.", "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024."],d:[
  D("Ivermectina 6 mg (cp)","200 mcg/kg VO, dose única — tabela de peso da bula","cp",p=>p*0.2,6,{ivermectina:true}),
  D("Carvão ativado","adulto 25–100 g, dose única até 1h da ingestão","g",p=>25,1,{fixedtxt:"25–100 g"}),
  D("Dengue grupo A — hidratação oral","60 mL/kg/dia","mL/dia",[60,60],1,{vol:true,dia:true}),
  D("Dengue grupo C — SF 0,9%","10 mL/kg/h na 1ª e na 2ª hora (máx. 20 mL/kg em 2h)","mL/h",[10,10],1,{vol:true,perh:true}),
  D("Dengue grupo D — SF 0,9%","20 mL/kg em 20 min (até 3x)","mL",[20,20],1,{vol:true})]}
],
ped:[
 {t:"Analgésicos e antitérmicos",c:"sky",src:["Sociedade Brasileira de Pediatria. Documento científico: Manejo da febre aguda, 2021.", "Bulas registradas na Anvisa (dose máxima por tomada)."],d:[
  D("Dipirona gotas 500 mg/mL","10–12 mg/kg/dose 6/6h (SBP 2021; máx. 1 g)","mg",[10,12],500,{max:1000,gotas:20,obs:"\"1 gota/kg\" leva a superdosagem (SBP)."}),
  D("Paracetamol 200 mg/mL (gotas)","10–15 mg/kg/dose 6/6h (máx. 750 mg)","mg",[10,15],200,{max:750,obs:"Gotas por mL variam entre marcas (Tylenol: 14–16 gotas/mL): prescreva em mL. Bula, abaixo de 12 anos: até 35 gotas por dose."}),
  D("Ibuprofeno 50 mg/mL","5–10 mg/kg/dose 8/8h (máx. 400 mg)","mg",[5,10],50,{max:400,obs:"Gotas por mL variam entre marcas: prescreva em mL."})]},
 {t:"Antibióticos (dose por tomada)",c:"violet",src:["Lieberthal AS et al. AAP: The Diagnosis and Management of Acute Otitis Media (Pediatrics 2013;131:e964).", "Shulman ST et al. IDSA Clinical Practice Guideline for Group A Streptococcal Pharyngitis (Clin Infect Dis 2012;55:e86).", "Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014).", "Bula do Clavulin BD (amoxicilina + clavulanato 400/57).","Bulas registradas na Anvisa (dose máxima por tomada)."],d:[
  D("Amoxicilina 250 mg/5 mL","50 mg/kg/dia ÷ 8/8h","mg",[50/3,50/3],50,{max:500}),
  D("Amoxicilina 400 mg/5 mL (OMA)","80–90 mg/kg/dia ÷ 12/12h","mg",[40,45],80,{obs:"Não ultrapassar a dose de adulto da bula."}),
  D("Amoxi + Clav 400/57 por 5 mL","45–50 mg/kg/dia (amoxi) ÷ 12/12h","mg",[22.5,25],80,{max:875,obs:"Bula: sem dados acima de 45 mg/kg/dia em menores de 2 anos."}),
  D("Cefalexina 250 mg/5 mL","50 mg/kg/dia ÷ 6/6h","mg",[12.5,12.5],50,{max:1000}),
  D("Azitromicina 200 mg/5 mL","10 mg/kg 1x/dia (máx. 500 mg)","mg",[10,10],40,{max:500})]},
 {t:"Respiratório e alergia",c:"green",src:["GINA 2024 Strategy Report — exacerbação em crianças: salbutamol por idade e teto de prednisolona por idade.", "Gates A et al. Glucocorticoids for croup in children (Cochrane 2018).", "Bulas da hidroxizina (Hixizine) e da ondansetrona registradas na Anvisa.","Canadian Paediatric Society. Acute management of croup in the emergency department (dexametasona 0,6 mg/kg; adrenalina nebulizada)."],d:[
  D("Prednisolona 3 mg/mL","1–2 mg/kg/dia 1x (máx. 20 mg < 2 anos; 30 mg de 2 a 5 anos; 40 mg de 6 a 11 anos)","mg",[1,2],3,{max:40,obs:"O teto calculado é 40 mg; respeite o teto da idade."}),
  D("Dexametasona 4 mg/mL (crupe)","0,6 mg/kg dose única (teto conservador de 10 mg)","mg",[0.6,0.6],4,{max:10,obs:"As fontes não definem teto; na literatura aparecem 10, 12 ou 16 mg."}),
  D("Salbutamol 100 mcg spray","≤ 5 anos: 2–6 jatos; ≥ 6 anos: 4–10 jatos; a cada 20 min na 1ª hora","jatos",p=>0,1,{fixedtxt:"2–6 ou 4–10 jatos"}),
  D("Hidroxizina 2 mg/mL","0,5–0,7 mg/kg/dose 8/8h (máx. 2 mg/kg/dia até 40 kg)","mg",[0.5,0.7],2,{max:25}),
  D("Ondansetrona 2 mg/mL (EV/IM)","0,15 mg/kg (máx. 4 mg)","mg",[0.15,0.15],2,{max:4})]},
 {t:"Hidratação e queimaduras",c:"teal",src:["Sociedade Brasileira de Pediatria. Guia Prático: Diarreia Aguda Infecciosa, 2023.", "Ministério da Saúde. Manejo do paciente com diarreia (cartaz).", "Ministério da Saúde. Cartilha para tratamento de emergência das queimaduras, 2012.", "AACT/EAPCCT. Position Paper: Single-Dose Activated Charcoal.", "Bjornson C et al. Nebulized epinephrine for croup in children (Cochrane 2013)."],d:[
  D("Plano B — SRO","50–100 mL/kg em 4–6h","mL",[50,100],1,{vol:true}),
  D("Plano C — fase rápida (< 1 ano)","30 mL/kg em 1h, depois 70 mL/kg em 5h","mL",[30,30],1,{vol:true,obs:"Recém-nascido ou cardiopatia grave: começar com 10 mL/kg."}),
  D("Plano C — fase rápida (≥ 1 ano)","30 mL/kg em 30 min, depois 70 mL/kg em 2h30","mL",[30,30],1,{vol:true}),
  D("Parkland pediátrico (Ringer lactato)","2–4 mL × kg × % SCQ em 24h (metade nas primeiras 8h)","mL",[0,0],1,{parkland:[2,4]}),
  D("Carvão ativado","0,5–1 g/kg (até 1h da ingestão; máx. 50 g de 1 a 12 anos)","g",[0.5,1],1,{gonly:true,max:50}),
  D("Adrenalina 1 mg/mL nebulizada (crupe)","0,5 mL/kg (máx. 5 mL)","mL",[0.5,0.5],1,{vol:true,max:5})]},
 {t:"Emergência pediátrica",c:"red",src:["Cardona V et al. WAO Anaphylaxis Guidance 2020.", "Glauser T et al. AES 2016: estado de mal epiléptico (Epilepsy Curr 2016).", "Abraham MB et al. ISPAD Clinical Practice Consensus Guidelines 2022: hypoglycemia (Pediatr Diabetes 2022;23:1322) — glicose 10% 2 mL/kg, até 5 mL/kg.", "Surviving Sepsis Campaign — crianças.", "Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy (Pediatrics 1957;19:823)."],d:[
  D("Adrenalina 1 mg/mL IM","0,01 mg/kg (máx. 0,3 mg; adolescente 0,5)","mg",[0.01,0.01],1,{max:0.3}),
  D("Diazepam 5 mg/mL EV","0,2 mg/kg (máx. 10 mg)","mg",[0.2,0.2],5,{max:10}),
  D("Diazepam 5 mg/mL retal","0,5 mg/kg (máx. 20 mg)","mg",[0.5,0.5],5,{max:20}),
  D("Midazolam 5 mg/mL IM/intranasal","0,2 mg/kg (máx. 10 mg)","mg",[0.2,0.2],5,{max:10}),
  D("Fenitoína 50 mg/mL","20 mg/kg, até 1 mg/kg/min (máx. 50 mg/min)","mg",[20,20],50,{max:1500,ratekg:1,rate:50}),
  D("SF 0,9% bolus","20 mL/kg","mL",[20,20],1,{vol:true}),
  D("Glicose 10%","2 a 4 mL/kg (hipoglicemia)","mL",[2,4],1,{vol:true}),
  D("Soro de manutenção (Holliday-Segar)","100/50/20 mL/kg","mL/dia",p=>p<=10?p*100:p<=20?1000+(p-10)*50:1500+(p-20)*20,1,{hs:true})]}
]};
if (typeof module!=="undefined") module.exports={CALC,D};

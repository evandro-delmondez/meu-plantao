/* ===== Ajuste renal por ClCr (Cockcroft-Gault). Faixas: primeira com clcr < max ===== */
const RENAL=[
{re:/ibuprofeno|diclofenaco|cetoprofeno|ácido mefenâmico|naproxeno|nimesulida/i,nome:"AINE",f:[[30,"Evitar (ClCr < 30)."],[60,"Usar com cautela, menor dose e menor tempo; evitar se desidratado."]],src:"beers"},
{re:/nitrofurant/i,nome:"Nitrofurantoína",f:[[30,"Evitar (ClCr < 30): ineficaz e tóxica. Trocar por fosfomicina ou cefalexina."]],src:"beers"},
{re:/ciprofloxacino/i,nome:"Ciprofloxacino",f:[[30,"500 mg a cada 24h (ClCr < 30)."],[50,"250–500 mg de 12/12h (ClCr 30–50)."]],src:"bula"},
{re:/levofloxacino 750 ?mg/i,nome:"Levofloxacino 750 mg",f:[[20,"750 mg na 1ª dose, depois 500 mg a cada 48h (ClCr 10–19)."],[50,"750 mg a cada 48h (ClCr 20–49)."]],src:"bula"},
{re:/levofloxacino 500 ?mg/i,nome:"Levofloxacino 500 mg",f:[[20,"500 mg na 1ª dose, depois 250 mg a cada 48h (ClCr 10–19)."],[50,"500 mg na 1ª dose, depois 250 mg a cada 24h (ClCr 20–49)."]],src:"bula"},
{re:/sulfametoxazol/i,nome:"Sulfametoxazol + trimetoprima",f:[[15,"Evitar (ClCr < 15)."],[30,"Metade da dose (ClCr 15–29)."]],src:"beers"},
{re:/amoxicilina \+ clavulanato|clavulanato/i,nome:"Amoxicilina + clavulanato",f:[[10,"500/125 mg a cada 24h (ClCr < 10)."],[30,"Não usar 875/125; 500/125 mg de 12/12h (ClCr 10–30)."]],src:"bula"},
{re:/amoxicilina(?! \+)/i,nome:"Amoxicilina",f:[[10,"250–500 mg a cada 24h (ClCr < 10)."],[30,"Não usar 875 mg; 250–500 mg de 12/12h (ClCr 10–30)."]],src:"bula"},
{re:/cefalexina/i,nome:"Cefalexina",f:[[15,"250 mg a cada 24h (ClCr 5–14)."],[30,"250 mg de 8/8h ou 12/12h (ClCr 15–29)."]],src:"bula"},
{re:/\baciclovir[\s\S]{0,120}800 ?mg/i,nome:"Aciclovir (dose de zoster 800 mg)",f:[[10,"800 mg de 12/12h (ClCr < 10)."],[25,"800 mg de 8/8h (ClCr 10–25)."]],src:"bula"},
{re:/\baciclovir (200|400) ?mg(?![\s\S]{0,120}800 ?mg)/i,nome:"Aciclovir (herpes simples, 200–400 mg)",f:[[10,"200 mg de 12/12h (ClCr < 10)."]],src:"bula"},
{re:/valaciclovir[\s\S]{0,80}\(2 g\)/i,nome:"Valaciclovir (herpes labial 2 g)",f:[[10,"500 mg em dose única (ClCr < 10)."],[30,"500 mg de 12/12h por 1 dia (ClCr 10–29)."],[50,"1 g de 12/12h por 1 dia (ClCr 30–49)."]],src:"bula"},
{re:/valaciclovir[\s\S]{0,80}\(1 g\) VO de 8\/8h/i,nome:"Valaciclovir (zoster 1 g de 8/8h)",f:[[10,"500 mg a cada 24h (ClCr < 10)."],[30,"1 g a cada 24h (ClCr 10–29)."],[50,"1 g de 12/12h (ClCr 30–49)."]],src:"bula"},
{re:/oseltamivir/i,nome:"Oseltamivir",f:[[10,"Não recomendado sem diálise (ClCr < 10)."],[30,"30 mg 1x/dia (ClCr 10–30)."],[60,"30 mg de 12/12h (ClCr 30–60)."]],src:"bula"},
{re:/claritromicina/i,nome:"Claritromicina",f:[[30,"Metade da dose (ClCr < 30)."]],src:"bula"},
{re:/tramadol/i,nome:"Tramadol",f:[[30,"Intervalo de 12/12h, máx. 200 mg/dia (ClCr < 30)."]],src:"beers"},
{re:/colchicina/i,nome:"Colchicina",f:[[30,"Reduzir dose e frequência; não repetir o esquema da crise antes de 14 dias (ClCr < 30)."]],src:"beers"},
{re:/alopurinol/i,nome:"Alopurinol",f:[[60,"Iniciar abaixo de 100 mg/dia (ex.: 50 mg) e titular (DRC ≥ estágio 3)."]],src:"acr"},
{re:/enoxaparina/i,nome:"Enoxaparina",f:[[30,"1 mg/kg SC 1x/dia (ClCr < 30)."]],src:"bula"},
{re:/rivaroxabana/i,nome:"Rivaroxabana",f:[[15,"Evitar (ClCr < 15)."],[30,"Usar com cautela (ClCr 15–29)."]],src:"beers"},
{re:/metoclopramida/i,nome:"Metoclopramida",f:[[15,"25% da dose (ClCr < 15)."],[60,"50% da dose (ClCr 15–60)."]],src:"emaMeto"},
{re:/loratadina/i,nome:"Loratadina",f:[[30,"10 mg em dias alternados (ClCr < 30)."]],src:"bula"},
{re:/hidroxizina/i,nome:"Hidroxizina",f:[[50,"Metade da dose."]],src:"bula"},
{re:/fosfomicina/i,nome:"Fosfomicina",f:[[10,"Evitar (ClCr < 10)."]],src:"bula"},
{re:/morfina/i,nome:"Morfina",f:[[30,"Evitar ou reduzir bastante a dose e aumentar o intervalo (metabólitos acumulam)."]],src:"bula"},
{re:/sulfato de magnésio/i,nome:"Sulfato de magnésio",f:[[30,"Risco de intoxicação: monitorar reflexos, FR e diurese; reduzir manutenção."]],src:"bula"}
];
const cockcroft=(idade,peso,cr,fem)=>((140-idade)*peso)/(72*cr)*(fem?0.85:1);

/* ===== Checklist de alta ===== */
const ALTA_GERAL=[
"Sinais vitais reavaliados e normais (ou no basal do paciente) no momento da alta — alteração na alta se associa a óbito e internação nos dias seguintes.",
"Reavaliação clínica após a medicação: dor controlada, sem vômitos, tolerando via oral.",
"Deambula (ou no basal) e tem acompanhante quando indicado.",
"Entendeu diagnóstico, receita, sinais de alarme e quando/onde retornar (confirmar pedindo para repetir).",
"Consegue obter a medicação; alergias conferidas.",
"Registro no prontuário: reavaliação, sinais vitais da alta e orientações."
];
const ALTA_FONTE="Gabayan GZ et al. Emergency Department Vital Signs and Outcomes After Discharge (Acad Emerg Med 2017;24:846).";
const ALTA_ITEM={
 dengue:["Classificar o grupo e registrar; grupo B só após hemograma.","Sem sinais de alarme: dor abdominal, vômitos persistentes, sangramento de mucosa, hipotensão postural, letargia.","Retorno no 1º dia sem febre."],
 asma:["Reavaliar 1h após o tratamento: fala frases completas, sem uso de musculatura acessória, SatO2 ≥ 94–95%.","Técnica do espaçador conferida; corticoide oral prescrito."],
 dpoc:["SatO2 no alvo (88–92%) em ar ambiente ou no O2 domiciliar habitual; sem sonolência."],
 pac:["CRB-65 0 ou CURB-65 0–1 (CRB-65 1 ou mais: considerar avaliação hospitalar, NICE NG250); SpO2 ≥ 92% em ar ambiente e NEWS2 sem resposta urgente; consegue tomar VO; reavaliação em 48–72h marcada."],
 itu:["Pielonefrite: sem sepse, sem vômitos, tolera VO, não gestante; 1ª dose do antibiótico feita."],
 colica:["Dor controlada após analgesia; sem febre (febre + obstrução = urgência urológica); diurese preservada."],
 tce:["Regra canadense aplicada e registrada; Glasgow 15; acompanhante presente nas próximas 24h."],
 anafilaxia:["Observação mínima cumprida (6–12h); prescrição de alta com orientação de evitar o agente."],
 "alergia-grave":["Observação de 2–4h sem progressão."],
 sca:["Dor torácica: só alta com ECG e troponinas seriadas conforme o algoritmo e baixo risco (ex.: HEART ≤ 3)."],
 has:["PA reavaliada após 30 min de repouso; sem sintomas de lesão de órgão-alvo; retorno em até 7 dias."],
 convulsao:["Consciência de volta ao basal; glicemia checada; causa provável definida."],
 geca:["Tolera líquidos VO; diurese presente; sem sangue nas fezes."],
 "desidratacao-crianca":["Criança hidratada (Plano A), aceitando SRO, com diurese; família sabe os volumes."],
 bronquiolite:["SatO2 adequada, mamando bem, sem apneia; família sabe os sinais de alarme."],
 crupe:["Sem estridor em repouso 2–4h após adrenalina/dexametasona."],
 hipoglicemia:["Glicemia estável após refeição; sulfonilureia/NPH = observação prolongada."],
 cad:["CAD não tem alta da UPA: internação."],
 tosse:["Sem sinais de alarme (dispneia, hemoptise, perda de peso, febre persistente)."]
};

/* ===== Hidratação da dengue ===== */
function dengueCalc(p,grupo,crianca){
  const L=[]; const f=x=>Math.round(x).toLocaleString("pt-BR");
  if(grupo==="AB"){
    let tot, reg;
    if(crianca){ tot=p<=10?130*p:(p<=20?100*p:80*p); reg=p<=10?"130 mL/kg/dia":(p<=20?"100 mL/kg/dia":"80 mL/kg/dia"); }
    else { tot=60*p; reg="60 mL/kg/dia"; }
    L.push(`Hidratação oral (${reg}): ${f(tot)} mL/dia.`);
    L.push(`- ${f(tot/3)} mL de soro de reidratação oral + ${f(tot*2/3)} mL de água, sucos naturais, água de coco.`);
    L.push(`- Nas primeiras 4–6h: ${f(tot/3)} mL.`);
  } else if(grupo==="C"){
    L.push(`Grupo C — expansão: SF 0,9% ${f(10*p)} mL/h na 1ª hora e ${f(10*p)} mL/h na 2ª hora (10 mL/kg/h; total ${f(20*p)} mL).`);
    L.push(`Reavaliar a cada hora; hematócrito após 2h.`);
    L.push(`Melhora — manutenção: ${f(25*p)} mL em 6h (${f(25*p/6)} mL/h), depois ${f(25*p)} mL em 8h (${f(25*p/8)} mL/h).`);
    L.push(`Sem melhora: repetir a expansão até 3 vezes; persistindo, grupo D.`);
  } else {
    L.push(`Grupo D — SF 0,9% ${f(20*p)} mL em 20 min (20 mL/kg), até 3 vezes; reavaliar a cada 15–30 min.`);
    L.push(`Melhora: conduzir como grupo C (manutenção ${f(25*p)} mL em 6h, depois ${f(25*p)} mL em 8h).`);
    L.push(`Choque persistente com hematócrito em alta: albumina ${f(0.5*p)}–${f(p)} g (0,5–1 g/kg).`);
  }
  return L.join("\n");
}

/* ===== Emergência pediátrica (por peso) ===== */
const PE_SRC={
ketanest:"Bula Ketanest S (escetamina): indução 0,5–1 mg/kg EV.",
s2k:"Kaufmann J et al. S2k-Leitlinie Pädiatrische Notfallmedizin (Anästh Intensivmed 2022;63:34): escetamina 1 mg/kg e rocurônio 1 mg/kg na indução.",
brophy:"Brophy GM et al. Neurocritical Care Society (Neurocrit Care 2012;17:3): fenobarbital 20 mg/kg.",
pals:"AHA 2025 — algoritmos de PCR e bradicardia pediátricas. https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms",
pals20:"Topjian AA et al. Pediatric Basic and Advanced Life Support — AHA 2020 (Circulation 2020): taquicardia (adenosina, cardioversão), tubo traqueal e sinais vitais por idade.",
aes:"Glauser T et al. AES 2016: estado de mal epiléptico (Epilepsy Curr 2016); ESETT (N Engl J Med 2019).",
wao:"Cardona V et al. WAO Anaphylaxis Guidance 2020.",
sscPed:"Surviving Sepsis Campaign — crianças, 2026 (Intensive Care Med). https://link.springer.com/article/10.1007/s00134-026-08360-2",
bsped:"BSPED. Guideline for the Management of CYP with DKA, 2021. https://www.bsped.org.uk/media/v2ydcuv0/bsped-dka-guideline-v3.pdf",
ispad:"ISPAD 2022 (hipoglicemia grave: glicose 10% 2 mL/kg) e PALS (glicose 0,5–1 g/kg).",
gina:"GINA 2025 — sulfato de magnésio na crise grave (crianças ≥ 6 anos).",
cochrane:"Gates A et al. Cochrane 2018 (dexametasona no crupe); Bjornson C et al. Cochrane 2013 (adrenalina nebulizada)."
};
function pedEmerg(p,m){
  const c=(x,mx)=>Math.min(x,mx), f=x=>(Math.round(x*100)/100).toLocaleString("pt-BR",{maximumFractionDigits:2});
  const idadeA=m/12;
  const tuboC=idadeA>=1?(idadeA/4+3.5):null, tuboS=idadeA>=1?(idadeA/4+4):null;
  return [
  {t:"PCR",c:"red",src:["pals"],l:[
   `Adrenalina 0,01 mg/kg = ${f(c(0.01*p,1))} mg = ${f(c(0.01*p,1)/0.1)} mL da solução 0,1 mg/mL (1 amp de 1 mg + 9 mL de SF), a cada 3–5 min (máx. 1 mg).`,
   `Choque (FV/TV sem pulso): 1º ${f(c(2*p,200))} J (2 J/kg) → 2º ${f(c(4*p,360))} J (4 J/kg) → seguintes ≥ 4 J/kg, máx. ${f(c(10*p,360))} J (10 J/kg ou dose adulta).`,
   `Amiodarona 5 mg/kg = ${f(c(5*p,300))} mg (máx. 300 mg); pode repetir até 3 doses (demais até 150 mg).`,
   `ou Lidocaína 1 mg/kg = ${f(p)} mg.`,
   `Compressões 100–120/min, profundidade ≥ 1/3 do tórax; 15:2 com 2 socorristas (pré-púbere); com via aérea avançada, 1 ventilação a cada 2–3 s.`]},
  {t:"Bradicardia com pulso",c:"red",src:["pals"],l:[
   `FC < 60 com má perfusão apesar de oxigenação/ventilação: iniciar RCP.`,
   `Adrenalina ${f(c(0.01*p,1))} mg EV/IO (0,01 mg/kg; máx. 1 mg) = ${f(c(0.01*p,1)/0.1)} mL da solução 0,1 mg/mL.`,
   `Atropina (tônus vagal/BAV primário) 0,02 mg/kg = ${f(Math.max(0.1,c(0.02*p,0.5)))} mg (mín. 0,1 mg; máx. 0,5 mg); pode repetir 1 vez.`]},
  {t:"Taquicardia (TSV)",c:"orange",src:["pals20"],l:[
   `Adenosina 0,1 mg/kg = ${f(c(0.1*p,6))} mg em bolus rápido (máx. 6 mg); 2ª dose 0,2 mg/kg = ${f(c(0.2*p,12))} mg (máx. 12 mg).`,
   `Instável: cardioversão sincronizada ${f(0.5*p)}–${f(p)} J (0,5–1 J/kg), depois ${f(2*p)} J (2 J/kg).`]},
  {t:"Convulsão / estado de mal",c:"amber",src:["aes","brophy"],l:[
   `Midazolam IM ${p>40?"10 mg":(p>=13?"5 mg":f(c(0.2*p,10))+" mg (0,2 mg/kg)")} (5 mg/mL = ${f((p>40?10:(p>=13?5:c(0.2*p,10)))/5)} mL).`,
   `ou Diazepam EV 0,15–0,2 mg/kg = ${f(c(0.15*p,10))}–${f(c(0.2*p,10))} mg (máx. 10 mg), sem diluir, lento; retal 0,5 mg/kg = ${f(c(0.5*p,20))} mg.`,
   `Persistindo após 2 doses de benzodiazepínico — escolher um:`,
   `  Levetiracetam 60 mg/kg = ${f(c(60*p,4500))} mg EV em 15 min (máx. 4.500 mg).`,
   `  Ácido valproico 40 mg/kg = ${f(c(40*p,3000))} mg EV em 10 min (máx. 3.000 mg).`,
   `  Fenitoína 20 mg/kg = ${f(20*p)} mg EV em SF (até 1 mg/kg/min, máx. 50 mg/min).`,
   `  Fenobarbital 20 mg/kg = ${f(20*p)} mg EV.`,
   `Glicemia capilar sempre.`]},
  {t:"Anafilaxia",c:"pink",src:["wao"],l:[
   `Adrenalina 1 mg/mL IM 0,01 mg/kg = ${f(c(0.01*p,p>=40?0.5:0.3))} mg = ${f(c(0.01*p,p>=40?0.5:0.3))} mL no vasto lateral (máx. ${p>=40?"0,5":"0,3"} mg); repetir a cada 5–15 min.`,
   `SF 0,9% ${f(20*p)} mL (20 mL/kg) se hipotensão.`]},
  {t:"Sepse / choque séptico",c:"violet",src:["sscPed"],l:[
   `Choque: cristaloide balanceado ${f(10*p)}–${f(20*p)} mL por bolus (10–20 mL/kg), até ${f(40*p)}–${f(60*p)} mL na 1ª hora se houver UTI disponível, reavaliando a cada bolus (parar se sobrecarga).`,
   `Sem UTI disponível e sem hipotensão: não fazer bolus; hidratação de manutenção.`,
   `Antibiótico: na 1ª hora no choque; até 3h na sepse provável sem choque.`,
   `Vasoativo se choque refratário a volume: adrenalina ou noradrenalina (pode iniciar periférica).`]},
  {t:"Hipoglicemia",c:"teal",src:["ispad"],l:[
   `Glicose 10% ${f(2*p)} mL EV (2 mL/kg = 0,2 g/kg); se necessário, até ${f(5*p)}–${f(10*p)} mL (0,5–1 g/kg). Rechecar em 15 min.`]},
  {t:"Cetoacidose diabética",c:"orange",src:["bsped"],l:[
   `Choque: SF 0,9% ${f(10*p)} mL em 15 min (10 mL/kg), reavaliar (até 40 mL/kg).`,
   `Sem choque: SF 0,9% ${f(10*p)} mL em 30 min; descontar do déficit.`,
   `Déficit: 5% (pH ≥ 7,1) ou 10% (pH < 7,1), repor em 48h + manutenção (Holliday-Segar, peso máx. 75 kg).`,
   `Insulina regular ${f(0.05*p)} unidades/h (0,05 unidade/kg/h; < 5 anos) ou ${f(0.1*p)} unidades/h (0,1 unidade/kg/h, CAD grave), iniciando 1–2h após o início dos fluidos.`,
   `K < 3,0: adiar insulina. Glicemia ≤ 14 mmol/L (≈ 250 mg/dL): trocar para soro com glicose 5–10%.`,
   `Edema cerebral: salina hipertônica 3% ${f(2.5*p)}–${f(5*p)} mL em 10–15 min ou manitol 20% ${f(0.5*p)}–${f(p)} g em 10–15 min.`]},
  {t:"Crise de asma grave",c:"sky",src:["gina"],l:[
   `Sulfato de magnésio 40–50 mg/kg EV em 20 min = ${f(c(40*p,2000))}–${f(c(50*p,2000))} mg (máx. 2 g), se ≥ 6 anos e sem resposta ao broncodilatador.`]},
  {t:"Crupe",c:"green",src:["cochrane"],l:[
   `Dexametasona 0,6 mg/kg = ${f(c(0.6*p,10))} mg IM/VO (4 mg/mL = ${f(c(0.6*p,10)/4)} mL).`,
   `Estridor em repouso: adrenalina 1 mg/mL nebulizada ${f(c(0.5*p,5))} mL (0,5 mL/kg; máx. 5 mL).`]},
  {t:"Via aérea e referências",c:"slate",src:["pals20","ketanest","s2k"],l:[
   tuboC?`Tubo traqueal com cuff: ${f(Math.round(tuboC*2)/2)} (idade/4 + 3,5); sem cuff: ${f(Math.round(tuboS*2)/2)}. Profundidade ≈ ${f(Math.round(tuboC*3*2)/2)} cm (3 × diâmetro).`:`Lactente < 1 ano: tubo 3,0–3,5 com cuff (conforme peso e idade).`,
   `Escetamina (Ketamin) 0,5–1 mg/kg = ${f(0.5*p)}–${f(p)} mg; Etomidato 0,3 mg/kg = ${f(0.3*p)} mg; Rocurônio 1 mg/kg = ${f(p)} mg (uso fora da bula em crianças; conferir o protocolo do serviço).`,
   `Hipotensão: PAS < ${m<1?"60":(m<12?"70":(idadeA<=10?Math.round(70+2*idadeA):"90"))} mmHg para a idade.`,
   `FC normal acordado: ${m<1?"100–205":(m<12?"100–180":(m<36?"98–140":(m<72?"80–120":(m<144?"75–118":"60–100"))))} bpm.`]}
  ];
}

/* ===== NEWS2 (Royal College of Physicians, 2017; escala 1 de SpO2) =====
   Faixas únicas: servem ao escore da aba Cálculos e ao aviso automático do "Fechar o atendimento".
   Cada faixa: [limite superior inclusivo, pontos, rótulo]. */
const NEWS2_SRC="Royal College of Physicians. National Early Warning Score (NEWS) 2: standardising the assessment of acute-illness severity in the NHS. Londres: RCP, 2017 — não validado em menores de 16 anos e gestantes; tabela de pontuação (escala 1 de SpO2) e resposta clínica (0–4 baixo; 3 em um parâmetro: risco baixo-médio, resposta urgente; 5–6 resposta urgente; 7 ou mais resposta de emergência; NEWS2 de 5 ou mais com infecção: pensar em sepse).";
const NEWS2_FX={
 fr:[[8,3,"≤ 8"],[11,1,"9–11"],[20,0,"12–20"],[24,2,"21–24"],[Infinity,3,"≥ 25"]],
 sat:[[91,3,"≤ 91"],[93,2,"92–93"],[95,1,"94–95"],[Infinity,0,"≥ 96"]],
 pas:[[90,3,"≤ 90"],[100,2,"91–100"],[110,1,"101–110"],[219,0,"111–219"],[Infinity,3,"≥ 220"]],
 fc:[[40,3,"≤ 40"],[50,1,"41–50"],[90,0,"51–90"],[110,1,"91–110"],[130,2,"111–130"],[Infinity,3,"≥ 131"]],
 t:[[35,3,"≤ 35,0"],[36,1,"35,1–36,0"],[38,0,"36,1–38,0"],[39,1,"38,1–39,0"],[Infinity,2,"≥ 39,1"]]
};
const news2Opcoes=k=>NEWS2_FX[k].map(([,p,r])=>[r,p]);
const news2Pts=(k,v)=>NEWS2_FX[k].find(([mx])=>v<=mx)[1];
// sv: {fr,sat,pas,fc,t} em número (ou null); o2: true/false/null; cons: true = alerta, false = confusão nova, voz, dor ou sem resposta, null = não informado
function news2Calc(sv){
 const pts={},faltam=[];
 for(const k of ["fr","sat","pas","fc","t"]){const v=sv[k];if(v==null||!isFinite(v)){faltam.push(k);continue}pts[k]=news2Pts(k,v)}
 if(sv.o2==null) faltam.push("o2"); else pts.o2=sv.o2?2:0;
 if(sv.cons==null) faltam.push("cons"); else pts.cons=sv.cons?0:3;
 const total=Object.values(pts).reduce((a,b)=>a+b,0);
 return {pts,faltam,total,tem3:Object.values(pts).some(p=>p===3)};
}
// RCP 2017: o NEWS2 não é validado em menores de 16 anos nem na gestação
const NEWS2_NAO_VALIDADO="NEWS2 não validado em menores de 16 anos e gestantes; use escore próprio.";
function news2Resposta(total,tem3){
 if(total>=7) return {nivel:"emergencia",txt:"7 ou mais: alto risco, resposta de emergência — sala de emergência, monitorização contínua e equipe com competência em via aérea e cuidados críticos; não é verde."};
 if(total>=5) return {nivel:"urgente",txt:"5–6: risco médio, resposta urgente — avaliação médica imediata e sinais vitais no mínimo de hora em hora; com infecção, pensar em sepse; não é verde."};
 if(tem3) return {nivel:"urgente",txt:"Parâmetro com 3 pontos: risco baixo-médio, resposta urgente — avaliação médica imediata do parâmetro alterado; não é verde."};
 return {nivel:"baixo",txt:"0–4: baixo risco — avaliação clínica de rotina e reavaliação dos sinais vitais antes da alta."};
}

/* ===== Gravidade da pneumonia: texto único para conduta, escore e queixa ===== */
const PAC_GRAV_SRC=[
 "NICE NG250. Pneumonia: diagnosis and management, 2025 — box 1 (CRB-65: 0 baixo, < 1%; 1–2 intermediário, 1–10%; 3–4 alto, > 10%), rec. 1.2.3 (julgamento clínico; com 2 ou mais, considerar o hospital), box 2 e rec. 1.2.9 (CURB-65: 0–1 baixo; 2 intermediário; 3–5 alto, internar e avaliar UTI). https://www.nice.org.uk/guidance/ng250",
 "British Thoracic Society. Guidelines for the management of community acquired pneumonia in adults, update 2009 (Lim WS et al. Thorax 2009;64 Suppl 3:iii1) — rec. 44–46: CRB-65 0 em casa; 1–2 considerar avaliação hospitalar, sobretudo 2; 3 ou mais, internação urgente.",
 "Corrêa RA et al. Recomendações para o manejo da pneumonia adquirida na comunidade 2018, SBPT (J Bras Pneumol 2018;44:405) — CURB-65 e CRB-65, ureia > 50 mg/dL; internado não grave: betalactâmico (ceftriaxona) + macrolídeo, ou quinolona respiratória.",
 "Metlay JP et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia, ATS/IDSA (Am J Respir Crit Care Med 2019;200:e45) — PAC grave: 1 critério maior (choque com vasopressor ou ventilação mecânica) ou 3 menores (FR ≥ 30, PaO2/FiO2 ≤ 250, multilobar, confusão, ureia elevada, leucócitos < 4.000, plaquetas < 100.000, temperatura < 36 °C, hipotensão que exige volume agressivo); internado não grave: ceftriaxona 1–2 g 1x/dia + azitromicina 500 mg 1x/dia ou claritromicina 500 mg 12/12h, ou levofloxacino 750 mg 1x/dia.",
 "Jones BE et al. Diagnosis and Management of Community-acquired Pneumonia: An Official ATS Clinical Practice Guideline (Am J Respir Crit Care Med 2026;212:24–44; publicado em jul/2025) — atualiza pontos específicos; não muda o esquema empírico do internado não grave. https://doi.org/10.1164/rccm.202507-1692ST",
 "Royal College of Physicians. NEWS2, 2017 — SpO2 ≤ 91% em ar ambiente soma 3 pontos (resposta urgente); NICE NG250 (glossário): saturação muito baixa ou várias comorbidades podem tornar moderada ou grave uma pneumonia de escore baixo.",
 "Conferido em: Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 43 — PAC (CRB-65; ceftriaxona 1–2 g/dia EV + azitromicina ou claritromicina no internado)."
];
const PAC_JULGAMENTO="O escore não substitui o julgamento clínico: SpO2 < 92% em ar ambiente, comorbidade descompensada, gestação, vômitos ou falta de apoio em casa também pesam para ficar.";
// "curto" é a frase que aparece igual na conduta "pac" e na queixa "tosse-dispneia" (há teste para isso)
const CRB65_FX=[
 {max:0,nivel:"baixo",curto:"CRB-65 0: baixo risco, tratamento em casa",txt:"0: baixo risco (mortalidade < 1%) — tratamento em casa, com orientação de retorno."},
 {max:2,nivel:"intermediario",curto:"CRB-65 1–2: risco intermediário, observação ou internação por julgamento clínico",txt:"1–2: risco intermediário (mortalidade 1–10%) — considerar observação ou internação por julgamento clínico; com 2, a tendência é ficar."},
 {max:4,nivel:"alto",curto:"CRB-65 3–4: alto risco, internação urgente e avaliar UTI",txt:"3–4: alto risco (mortalidade > 10%) — internação urgente; avaliar UTI se critério de PAC grave da ATS/IDSA 2019 (1 maior: choque com vasopressor ou ventilação mecânica; ou 3 menores)."}
];
const CURB65_FX=[
 {max:1,nivel:"baixo",curto:"CURB-65 0–1: baixo risco, tratamento em casa",txt:"0–1: baixo risco (mortalidade < 3%) — tratamento em casa, com orientação de retorno."},
 {max:2,nivel:"intermediario",curto:"CURB-65 2: risco intermediário, observação ou internação curta",txt:"2: risco intermediário (mortalidade 3–15%) — observação ou internação curta, por julgamento clínico."},
 {max:5,nivel:"alto",curto:"CURB-65 3–5: alto risco, internar e avaliar UTI",txt:"3–5: alto risco (mortalidade > 15%) — internar; avaliar UTI se critério de PAC grave da ATS/IDSA 2019 (1 maior: choque com vasopressor ou ventilação mecânica; ou 3 menores)."}
];
const pacFaixa=(fx,s)=>fx.find(f=>s<=f.max)||fx[fx.length-1];
// 1ª dose EV para quem fica (ATS/IDSA 2019; SBPT 2018; HC-FMUSP 18ª ed., cap. 43)
const PAC_EV="Se internar: 1ª dose EV na unidade — ceftriaxona 1 g EV 1x ao dia (até 2 g) + azitromicina 500 mg EV 1x ao dia (ou claritromicina 500 mg EV de 12/12h). Alergia grave a betalactâmico: levofloxacino 750 mg EV 1x ao dia.";

/* ===== Alertas isolados pelos sinais vitais (aviso do "Fechar o atendimento") ===== */
const SVAL={
 sat:{lim:92,src:"Royal College of Physicians. NEWS2, 2017 — SpO2 ≤ 91% em ar ambiente = 3 pontos (resposta urgente); O'Driscoll BR et al. BTS guideline for oxygen use in adults in healthcare and emergency settings (Thorax 2017;72 Suppl 1:ii1) — alvo de 94–98%, ou 88–92% se risco de retenção de CO2.",
  txt:"Hipoxemia: oxigênio com alvo de 94–98% (88–92% se risco de retenção de CO2, como na DPOC), procurar a causa e reavaliar antes de liberar."},
 pa:{pas:180,pad:110,src:"Brandão AA et al. Diretriz Brasileira de Hipertensão Arterial – 2025, SBC/SBH/SBN (Arq Bras Cardiol 2025;122(9):e20250624) — cap. 11: PAS ≥ 180 e/ou PAD ≥ 110 mmHg com lesão de órgão-alvo aguda é emergência; sem ela, elevação importante da PA (antes urgência), com ajuste oral e reavaliação em 1–7 dias, alvo < 160/100; pseudocrise provocada por dor ou ansiedade; item 2.3.9: anti-inflamatórios não esteroidais elevam a PA ou dificultam o controle. https://www.scielo.br/j/abc/a/BXT7Vk4B9VKQnJFsJhgJ4Hn/?lang=pt",
  txt:"Procurar lesão de órgão-alvo aguda: dor no peito, falta de ar, déficit neurológico, confusão, alteração visual (com ela, é emergência hipertensiva). Sem lesão aguda: tratar a dor ou a ansiedade e medir de novo; ajustar a medicação oral sem baixar rápido, alvo < 160/100 e reavaliação em 1–7 dias.",
  aine:"Esta receita tem AINE, que eleva a PA: prefira outro analgésico ou reveja a escolha.",
  aineRe:/ibuprofeno|diclofenaco|cetoprofeno|ácido mefenâmico|naproxeno|nimesulida|profenid|cetorolaco|tenoxicam|piroxicam|meloxicam|celecoxibe|etoricoxibe/i},
 febre:{tax:37.8,fc:90,idadeMin:16,src:"Instituto Latino-Americano de Sepse (ILAS). Protocolo gerenciado de sepse no adulto, revisão de julho de 2026 — SIRS como triagem: temperatura axilar > 37,8 °C, FC > 90 bpm, FR > 20; disfunção orgânica: PAS < 90 ou PAM < 65, O2 para manter SpO2 > 90%, rebaixamento, oligúria, lactato (critérios do adulto). https://ilas.org.br/wp-content/uploads/2022/02/Protocolo-de-tratamento-da-sepse-adulto-Revisao-julho-2026.pdf",
  txt:"Febre com taquicardia: procurar o foco e sinais de disfunção orgânica (PAS < 90, FR > 20, confusão, SpO2 baixa, oligúria); infecção com disfunção: abrir o protocolo de sepse."}
};

/* ===== Escores clínicos ===== */
const SC=[
{id:"heart",nome:"HEART (dor torácica)",src:"Six AJ et al. Neth Heart J 2008; Backus BE et al. Int J Cardiol 2013.",
 campos:[["h","História",[["Pouco suspeita",0],["Moderadamente suspeita",1],["Muito suspeita",2]]],["e","ECG",[["Normal",0],["Alteração inespecífica da repolarização",1],["Infradesnível de ST significativo",2]]],["a","Idade",[["< 45",0],["45–64",1],["≥ 65",2]]],["r","Fatores de risco",[["Nenhum",0],["1–2 fatores",1],["≥ 3 fatores ou doença aterosclerótica",2]]],["t","Troponina",[["≤ limite normal",0],["1–3× o limite",1],["> 3× o limite",2]]]],
 interp:s=>s<=3?"Baixo risco (0–3): eventos em 6 semanas ~1–2%; candidato a alta com seguimento.":s<=6?"Risco moderado (4–6): observação e investigação.":"Alto risco (7–10): conduta invasiva precoce."},
{id:"curb",nome:"CURB-65 (pneumonia)",src:"Lim WS et al. Thorax 2003;58:377; NICE NG250, 2025 (box 2 e rec. 1.2.9); Corrêa RA et al. SBPT 2018 (J Bras Pneumol 2018;44:405) — ureia > 50 mg/dL.",
 bin:[["Confusão mental nova",1],["Ureia > 50 mg/dL",1],["FR ≥ 30 irpm",1],["PAS < 90 ou PAD ≤ 60 mmHg",1],["Idade ≥ 65 anos",1]],
 interp:s=>pacFaixa(CURB65_FX,s).txt+" "+PAC_JULGAMENTO},
{id:"crb",nome:"CRB-65 (pneumonia, sem ureia)",src:"NICE NG250. Pneumonia: diagnosis and management, 2025 (box 1 e rec. 1.2.3); British Thoracic Society. CAP in adults, 2009 (rec. 44–46); Lim WS et al. Thorax 2003;58:377.",
 bin:[["Confusão mental nova",1],["FR ≥ 30 irpm",1],["PAS < 90 ou PAD ≤ 60 mmHg",1],["Idade ≥ 65 anos",1]],
 interp:s=>pacFaixa(CRB65_FX,s).txt+" "+PAC_JULGAMENTO},
{id:"wellsTep",nome:"Wells (TEP)",src:"Wells PS et al. Thromb Haemost 2000; ESC 2019.",
 bin:[["Sinais clínicos de TVP",3],["TEP é o diagnóstico mais provável",3],["FC > 100 bpm",1.5],["Imobilização ≥ 3 dias ou cirurgia nas últimas 4 semanas",1.5],["TVP/TEP prévio",1.5],["Hemoptise",1],["Câncer ativo",1]],
 interp:s=>s<=4?"≤ 4: TEP improvável → D-dímero (ajustado à idade se > 50 anos).":"> 4: TEP provável → angio-TC."},
{id:"perc",nome:"PERC (usar só se probabilidade baixa)",src:"Kline JA et al. J Thromb Haemost 2004; ESC 2019.",
 bin:[["Idade ≥ 50 anos",1],["FC ≥ 100 bpm",1],["SatO2 < 95%",1],["Hemoptise",1],["Uso de estrogênio",1],["TVP/TEP prévio",1],["Cirurgia ou trauma com internação nas últimas 4 semanas",1],["Edema unilateral de perna",1]],
 interp:s=>s===0?"PERC negativo (0) com baixa probabilidade clínica: TEP excluído sem D-dímero.":"PERC positivo: seguir investigação (D-dímero)."},
{id:"wellsTvp",nome:"Wells (TVP)",src:"Wells PS et al. N Engl J Med 2003.",
 bin:[["Câncer ativo",1],["Paralisia, paresia ou imobilização gessada recente de MMII",1],["Acamado ≥ 3 dias ou cirurgia maior nas últimas 12 semanas",1],["Dor à palpação no trajeto venoso profundo",1],["Edema de toda a perna",1],["Panturrilha > 3 cm maior que a contralateral",1],["Edema com cacifo só na perna sintomática",1],["Veias superficiais colaterais (não varicosas)",1],["TVP prévia",1],["Diagnóstico alternativo tão ou mais provável",-2]],
 interp:s=>s>=2?"≥ 2: TVP provável → USG Doppler.":"< 2: TVP improvável → D-dímero."},
{id:"gbs",nome:"Glasgow-Blatchford (HDA)",src:"Blatchford O et al. Lancet 2000; ACG 2021. Ureia convertida de mmol/L para mg/dL (× 6).",
 campos:[["u","Ureia (mg/dL)",[["< 39",0],["39–47",2],["48–59",3],["60–149",4],["≥ 150",6]]],["hb","Hemoglobina",[["Homem ≥ 13 / mulher ≥ 12",0],["Homem 12–12,9",1],["Mulher 10–11,9",1],["Homem 10–11,9",3],["< 10 (ambos)",6]]],["pas","PAS (mmHg)",[["≥ 110",0],["100–109",1],["90–99",2],["< 90",3]]]],
 bin:[["FC ≥ 100 bpm",1],["Melena",1],["Síncope",2],["Doença hepática",2],["Insuficiência cardíaca",2]],
 interp:s=>s<=1?"0–1: muito baixo risco; alta com seguimento ambulatorial pode ser considerada (ACG 2021).":"≥ 2: internação e endoscopia."},
{id:"centor",nome:"Centor/McIsaac (faringite)",src:"McIsaac WJ et al. CMAJ 1998.",
 bin:[["Exsudato ou edema amigdaliano",1],["Linfonodo cervical anterior doloroso",1],["Febre > 38 °C",1],["Ausência de tosse",1]],
 campos:[["idade","Idade",[["3–14 anos",1],["15–44 anos",0],["≥ 45 anos",-1]]]],
 interp:s=>s<=1?"≤ 1: não testar nem tratar.":s<=3?"2–3: teste rápido/cultura; tratar se positivo.":"≥ 4: testar; tratar se positivo (ou empírico se não houver teste)."},
{id:"cha",nome:"CHA₂DS₂-VA (FA)",src:"ESC 2024 — Guidelines for the management of atrial fibrillation.",
 bin:[["Insuficiência cardíaca",1],["Hipertensão",1],["Idade ≥ 75 anos",2],["Diabetes",1],["AVC/AIT/embolia prévios",2],["Doença vascular",1],["Idade 65–74 anos",1]],
 interp:s=>s===0?"0: anticoagulação não indicada.":s===1?"1: anticoagulação deve ser considerada.":"≥ 2: anticoagulação oral recomendada."},
{id:"hasbled",nome:"HAS-BLED (sangramento)",src:"Pisters R et al. Chest 2010.",
 bin:[["Hipertensão não controlada (PAS > 160)",1],["Função renal alterada",1],["Função hepática alterada",1],["AVC prévio",1],["Sangramento prévio ou predisposição",1],["RNI lábil",1],["Idade > 65 anos",1],["Drogas (antiagregante/AINE)",1],["Álcool ≥ 8 doses/semana",1]],
 interp:s=>s>=3?"≥ 3: alto risco de sangramento — corrigir fatores modificáveis e seguir de perto (não contraindica anticoagulação).":"0–2: risco baixo a moderado."},
{id:"spesi",nome:"sPESI (TEP)",src:"Jiménez D et al. Arch Intern Med 2010; ESC 2019.",
 bin:[["Idade > 80 anos",1],["Câncer",1],["Insuficiência cardíaca ou doença pulmonar crônica",1],["FC ≥ 110 bpm",1],["PAS < 100 mmHg",1],["SatO2 < 90%",1]],
 interp:s=>s===0?"0: baixo risco; considerar tratamento ambulatorial (se critérios Hestia negativos).":"≥ 1: risco intermediário; internar e estratificar (VD, troponina)."},
{id:"alvarado",nome:"Alvarado (apendicite)",src:"Alvarado A. Ann Emerg Med 1986.",
 bin:[["Dor migratória para FID",1],["Anorexia",1],["Náuseas/vômitos",1],["Dor à palpação em FID",2],["Descompressão brusca dolorosa",1],["Temperatura ≥ 37,3 °C",1],["Leucocitose > 10.000",2],["Desvio à esquerda",1]],
 interp:s=>s<=4?"≤ 4: apendicite improvável.":s<=6?"5–6: possível — imagem/observação.":"≥ 7: provável — avaliação cirúrgica."},
{id:"abcd2",nome:"ABCD² (AIT)",src:"Johnston SC et al. Lancet 2007.",
 bin:[["Idade ≥ 60 anos",1],["PA ≥ 140/90 na avaliação",1],["Diabetes",1]],
 campos:[["cl","Clínica",[["Outros sintomas",0],["Alteração da fala sem fraqueza",1],["Fraqueza unilateral",2]]],["du","Duração",[["< 10 min",0],["10–59 min",1],["≥ 60 min",2]]]],
 interp:s=>s<=3?"0–3: baixo risco de AVC em 2 dias (~1%).":s<=5?"4–5: risco moderado (~4%).":"6–7: alto risco (~8%). Em qualquer escore, AIT requer investigação urgente."},
{id:"nihss",nome:"NIHSS (AVC)",src:"Brott T et al. Stroke 1989;20:864 — NIH Stroke Scale (NINDS). Conduta: Powers WJ et al. AHA/ASA 2019 (Stroke 2019;50:e344). Membro amputado ou articulação fixa: pontuar 0.",
 campos:[["n1a","1a. Nível de consciência",[["Alerta",0],["Desperta a estímulo leve",1],["Só responde a estímulo repetido ou doloroso",2],["Arresponsivo ou só reflexos",3]]],
  ["n1b","1b. Perguntas (mês e idade)",[["Ambas corretas",0],["Uma correta",1],["Nenhuma correta",2]]],
  ["n1c","1c. Comandos (abrir/fechar olhos, apertar a mão)",[["Ambos corretos",0],["Um correto",1],["Nenhum correto",2]]],
  ["n2","2. Olhar conjugado",[["Normal",0],["Paralisia parcial do olhar",1],["Desvio forçado",2]]],
  ["n3","3. Campos visuais",[["Sem perda",0],["Hemianopsia parcial",1],["Hemianopsia completa",2],["Hemianopsia bilateral (cegueira)",3]]],
  ["n4","4. Paralisia facial",[["Normal",0],["Mínima (apagamento do sulco, assimetria ao sorrir)",1],["Parcial (face inferior)",2],["Completa (superior e inferior)",3]]],
  ["n5a","5a. Motor — braço esquerdo",[["Sem queda (mantém 10 s)",0],["Queda antes de 10 s, sem tocar a cama",1],["Algum esforço contra a gravidade",2],["Sem esforço contra a gravidade",3],["Nenhum movimento",4]]],
  ["n5b","5b. Motor — braço direito",[["Sem queda (mantém 10 s)",0],["Queda antes de 10 s, sem tocar a cama",1],["Algum esforço contra a gravidade",2],["Sem esforço contra a gravidade",3],["Nenhum movimento",4]]],
  ["n6a","6a. Motor — perna esquerda",[["Sem queda (mantém 5 s)",0],["Queda antes de 5 s, sem tocar a cama",1],["Algum esforço contra a gravidade",2],["Sem esforço contra a gravidade",3],["Nenhum movimento",4]]],
  ["n6b","6b. Motor — perna direita",[["Sem queda (mantém 5 s)",0],["Queda antes de 5 s, sem tocar a cama",1],["Algum esforço contra a gravidade",2],["Sem esforço contra a gravidade",3],["Nenhum movimento",4]]],
  ["n7","7. Ataxia de membros",[["Ausente (ou desproporcional à paresia)",0],["Presente em um membro",1],["Presente em dois membros",2]]],
  ["n8","8. Sensibilidade",[["Normal",0],["Perda leve a moderada",1],["Perda grave ou total",2]]],
  ["n9","9. Linguagem",[["Sem afasia",0],["Afasia leve a moderada",1],["Afasia grave",2],["Mutismo ou afasia global",3]]],
  ["n10","10. Disartria",[["Normal",0],["Leve a moderada",1],["Grave (ininteligível) ou anártrico",2]]],
  ["n11","11. Extinção / negligência",[["Ausente",0],["Em uma modalidade",1],["Profunda ou em mais de uma modalidade",2]]]],
 interp:s=>(s===0?"0: sem déficit mensurável.":s<=4?"1–4: AVC leve.":s<=15?"5–15: AVC moderado.":s<=20?"16–20: moderado a grave.":"21–42: grave.")+" Trombólise (até 4,5 h) é indicada para déficit incapacitante, independentemente do escore; em déficit leve não incapacitante (0–5) não é recomendada (AHA/ASA 2019)."+(s>=6?" NIHSS ≥ 6: com oclusão de carótida interna ou M1, avaliar trombectomia (até 6 h; 6–24 h conforme critérios de imagem).":"")},
{id:"glasgow",nome:"Escala de coma de Glasgow",src:"Teasdale G, Jennett B. Lancet 1974; atualização 2014 (Glasgow com resposta pupilar).",
 campos:[["o","Abertura ocular",[["Espontânea",4],["Ao som",3],["À pressão",2],["Nenhuma",1]]],["v","Resposta verbal",[["Orientado",5],["Confuso",4],["Palavras",3],["Sons",2],["Nenhuma",1]]],["m","Resposta motora",[["Obedece comandos",6],["Localiza",5],["Flexão normal",4],["Flexão anormal",3],["Extensão",2],["Nenhuma",1]]]],
 interp:s=>s<=8?"≤ 8: grave — considerar via aérea definitiva.":s<=12?"9–12: moderado.":"13–15: leve."},
{id:"news2",nome:"NEWS2",src:NEWS2_SRC,
 campos:[["fr","FR",news2Opcoes("fr")],["sat","SatO2 (escala 1)",news2Opcoes("sat")],["o2","Ar ou O2",[["Ar ambiente",0],["Em O2",2]]],["pas","PAS",news2Opcoes("pas")],["fc","FC",news2Opcoes("fc")],["cons","Consciência",[["Alerta",0],["Confusão nova, voz, dor ou não responde",3]]],["t","Temperatura",news2Opcoes("t")]],
 interp:s=>news2Resposta(s,false).txt+(s<5?" Qualquer parâmetro com 3 pontos também pede resposta urgente.":"")}
];
if (typeof module!=="undefined") module.exports={RENAL,cockcroft,ALTA_GERAL,ALTA_ITEM,dengueCalc,pedEmerg,SC,NEWS2_FX,NEWS2_NAO_VALIDADO,news2Calc,news2Resposta,CRB65_FX,CURB65_FX,pacFaixa,PAC_EV,SVAL};

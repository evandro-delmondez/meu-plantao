/* ===== Cartão "Agora" da sala vermelha: o que fazer nos primeiros minutos, com doses prontas pelo peso =====
   Alto risco: conferência independente antes do merge (regra 2). Cada dose deve repetir o que já está
   na conduta, na ficha, na calculadora ou no protocolo citados; se divergir, corrigir na origem também.
   Formato:
   AGORA[idDaConduta] = {
     quando: "critério de entrada, em 1 linha",
     alerta: "1 frase de segurança (opcional)",
     etapas: [{ t: "0–5 min", acoes: [ { txt: "ação curta (até ~120 caracteres)", dose: {...}, mais: "exceções e observações (abre em 'detalhes')" } ] }],   ← até 3 ações por etapa
     atalhos: [{ rot: "PCR guiada", aba: "pcr" } | { rot: "Fluxo do IAM", protocolo: "iamcsst" } | { rot: "Bomba: noradrenalina", bic: "noradrenalina" }],
     fontes: ["..."]
   }
   dose = { ref: "0,2 mg/kg IM (máx. 10 mg)"   ← obrigatório, sempre visível para conferir
            porKg: 0.2, un: "mg" | "mcg" | "g" | "UI" | "mL", max: 10, min: 0, conc: 5 (un por mL, para mostrar mL) }
   Sem porKg = dose fixa: aparece só o ref. */
const AGORA = {
intoxicacao: {
  quando: "Ingestão ou exposição a remédio, droga, pesticida ou outra substância tóxica, suspeita ou confirmada, com ou sem sintomas.",
  alerta: "Suporte de vida vem antes do antídoto. Ligue cedo para o CIATox; ingestão intencional: dosar paracetamol mesmo sem sintomas.",
  etapas: [
    { t: "0–5 min: estabilizar", acoes: [
      { txt: "Via aérea, O2, monitor, oximetria e acesso venoso; Glasgow e pupilas. Via aérea não protegida ou ventilação ruim: bolsa-válvula-máscara e intubação.",
        mais: "Suspeita de opioide com respiração ruim: ventilar com bolsa-válvula-máscara e dar naloxona (ver antídotos). Hipotensão: cristaloide 10–20 mL/kg; se persistir, vasopressor cedo. Organofosforado ou carbamato: intubação precoce se grave, sem succinilcolina. Produto químico na pele ou na roupa: equipe protegida antes de tocar no paciente." },
      { txt: "Glicemia capilar já. Se baixa: glicose 50% EV; etilista ou desnutrido: tiamina EV junto, sem atrasar a glicose.", dose: { ref: "Glicose 50% 50 mL EV + tiamina 100 mg EV" } },
      { txt: "ECG de 12 derivações (QRS > 100 ms? QTc > 500 ms?) e temperatura. Ingestão intencional: dosar paracetamol (e salicilato, se houver).",
        mais: "QRS > 100 ms: bloqueio de canal de sódio (tricíclico e outros), risco de convulsão e arritmia: bicarbonato (ver abaixo). QTc > 500 ms: alto risco de torsades; corrigir potássio e magnésio e evitar outros remédios que alargam o QT. Hipertermia com agitação por simpaticomimético (cocaína, anfetamina): sedação com benzodiazepínico e resfriamento externo rápido, de preferência imersão em água com gelo. Convulsão de causa tóxica: benzodiazepínico; no tricíclico, não usar fenitoína." }
    ]},
    { t: "Reconhecer a síndrome tóxica", acoes: [
      { txt: "Pupilas, pele (seca ou suada), FC, PA, FR, temperatura, ruídos intestinais e consciência: enquadre a síndrome tóxica.",
        mais: "Opioide: rebaixamento, miose e respiração lenta; a melhora com naloxona confirma.\nSedativo-hipnótico (benzodiazepínico, álcool, barbitúrico, zolpidem): rebaixamento, pupilas variáveis, sinais vitais pouco alterados.\nAnticolinérgico (anti-histamínico, tricíclico, antipsicótico, escopolamina): delirium, midríase, pele quente, seca e vermelha, retenção urinária, taquicardia.\nSimpaticomimético (cocaína, anfetamina, ecstasy): agitação, midríase, taquicardia, hipertensão, hipertermia, com suor (o anticolinérgico é seco).\nColinérgico (organofosforado, carbamato, chumbinho): miose, salivação, broncorreia, suor, vômitos, diarreia, bradicardia e fasciculações." },
      { txt: "Com paciente, família e socorristas: o quê, quanto, há quanto tempo e por qual via; cartelas vazias e receitas; foi intencional?",
        mais: "Pense em mais de uma substância. Exames conforme o caso: gasometria, eletrólitos, função renal e hepática, CK; na ingestão intencional, paracetamol e salicilato. O exame toxicológico de urina é só qualitativo: pode dar falso negativo, e positivo não prova intoxicação atual." }
    ]},
    { t: "Descontaminação (até 1 h)", acoes: [
      { txt: "Carvão ativado em dose única: ingestão de quantidade tóxica há até 1 h, paciente acordado e cooperativo (ou já intubado), sem contraindicação.", dose: { ref: "1 g/kg VO ou por sonda, em água, dose única (máx. 50 g); a AACT/EAPCCT aceita 25–100 g no adulto", porKg: 1, un: "g", max: 50 },
        mais: "Não usar: via aérea não protegida (rebaixado sem intubação), hidrocarboneto (gasolina, querosene: risco de aspiração), risco de sangramento ou perfuração digestiva, obstrução intestinal. Corrosivo (ácido, soda): não, pois adsorve mal e atrapalha a endoscopia. Adsorve mal: ferro, lítio, metais pesados, ácidos e álcalis. Depois de 1 h, benefício incerto: discutir com o CIATox (ex.: liberação prolongada). Não intubar só para dar carvão." },
      { txt: "Não provocar vômito. Lavagem gástrica não é rotina: só em intoxicação grave, até 1 h, com via aérea protegida e decidida com o CIATox." },
      { txt: "Exposição pela pele (pesticida, solvente): equipe com luvas e avental, retirar a roupa e lavar a pele com água e sabão em abundância." }
    ]},
    { t: "Antídotos: opioide, benzodiazepínico, paracetamol", acoes: [
      { txt: "Opioide com respiração lenta (FR < 12) ou apneia: ventilar com bolsa-válvula-máscara e dar naloxona EV, titulando até respirar bem (não até acordar).", dose: { ref: "0,4–2 mg EV, repetir a cada 2–3 min; dependente de opioide e respirando: começar com 0,04 mg EV e subir aos poucos. Sem resposta com 10 mg: rever o diagnóstico" },
        mais: "Sem acesso venoso: IM ou SC. A naloxona dura 1–1,5 h, menos que muitos opioides: se a depressão voltar, repetir ou fazer infusão com 2/3 da dose que fez respirar, por hora. Na PCR, RCP de qualidade vem antes: naloxona só se não atrasar compressões e ventilação. Suspeita de opioide e benzodiazepínico juntos: naloxona primeiro. Tempo de observação: última etapa." },
      { txt: "Flumazenil não é rotina: só na depressão respiratória por benzodiazepínico puro, sem uso crônico, sem epilepsia e sem sinal de tricíclico. Na dúvida, ventile.", dose: { ref: "0,2 mg EV em 15 s; se preciso, 0,1 mg a cada 1 min, até 1 mg no total (bula; AHA 2025). Na UTI, a bula vai até 2 mg" },
        mais: "Pode causar convulsão e arritmia. Não usar se: uso crônico de benzodiazepínico, epilepsia, mistura com tricíclico ou outro remédio que dá convulsão ou arritmia, sinal de tricíclico (QRS largo, arritmia, síndrome anticolinérgica), ou benzodiazepínico usado para tratar convulsão ou hipertensão intracraniana. Não usar no coma de causa desconhecida nem na PCR. Dura 30–45 min: a sedação pode voltar." },
      { txt: "Paracetamol: dosar com 4 h ou mais e plotar no nomograma (linha de 150). Na linha ou acima, ou hora desconhecida: N-acetilcisteína EV (Fluimucil 100 mg/mL).", dose: { ref: "Ataque 150 mg/kg (máx. 15 g) em 200 mL de SG 5% ou SF em 1 h; depois 50 mg/kg em 500 mL em 4 h e 100 mg/kg em 1.000 mL em 16 h (peso de cálculo até 100 kg)", porKg: 150, un: "mg", max: 15000, conc: 100 },
        mais: "Iniciar já, sem esperar o nível, se: hora desconhecida, várias tomadas, chegada mais de 8 h após a ingestão, sinal de lesão hepática, ou se o resultado só sairá depois de 8 h da ingestão e a dose foi > 150 mg/kg ou > 10 g (o mais protetor entre o HC-FMUSP, > 150 mg/kg ou > 12 g, e o consenso 2023, > 200 mg/kg ou > 10 g). Mais de 24 h ou uso repetido: fora do nomograma; com sinal de toxicidade, iniciar já; tratar se paracetamol > 10 mcg/mL ou transaminases alteradas (HC-FMUSP; no uso repetido, o consenso 2023 usa > 20 mcg/mL). Mais eficaz até 8 h da ingestão. Nível na linha de 300 ou acima: discutir dose maior com o CIATox. Reação anafilactoide (10–20%, em geral no ataque): parar, tratar e retomar mais devagar. Suspender só com paracetamol < 10 mcg/mL, INR < 2, transaminases normais ou em queda de 25–50% do pico e paciente bem." }
    ]},
    { t: "Antídotos: tricíclico, organofosforado, sulfonilureia", acoes: [
      { txt: "QRS > 100 ms, arritmia ou hipotensão por tricíclico (ou outro bloqueador de canal de sódio): bicarbonato de sódio 8,4% EV em bolus.", dose: { ref: "1–2 mEq/kg EV em bolus (8,4%: 1 mL = 1 mEq); repetir após 5 min se o QRS não estreitar (AHA 2025: 50–150 mEq no adulto)", porKg: 1, un: "mL", max: 150 },
        mais: "Cálculo com 1 mEq/kg. Alvo: QRS estreitando e pH 7,45–7,55, sem passar de pH 7,55 nem de sódio 155 mEq/L; vigiar o potássio, que cai com a alcalinização. QRS estreitou: manutenção com 150 mL de bicarbonato 8,4% em 1.000 mL de SG 5%, a 150–250 mL/h. Convulsão: benzodiazepínico; não usar fenitoína nem flumazenil. Arritmia apesar do bicarbonato: discutir lidocaína, magnésio ou emulsão lipídica com o CIATox." },
      { txt: "Síndrome colinérgica grave (broncorreia, broncoespasmo, bradicardia): atropina EV já, dobrando a dose a cada 5 min até secar o pulmão.", dose: { ref: "1–2 mg EV, dobrar a cada 5 min (ex.: 2, 4, 8 mg) até pulmão limpo, FC > 80 e PAS > 80; depois infusão de 10–20% da dose total por hora (até 2 mg/h)" },
        mais: "Guiar pela ausculta: taquicardia e midríase não são alvo. As doses são muito maiores que na bradicardia comum: confira a concentração da ampola da unidade. Sinais de excesso (agitação, febre, íleo, retenção urinária): parar 30–60 min e voltar em dose menor. Intubação precoce se grave, sem succinilcolina. Convulsão: benzodiazepínico. Pralidoxima no organofosforado moderado ou grave: discutir dose e disponibilidade com o CIATox. O chumbinho costuma ser carbamato." },
      { txt: "Hipoglicemia por sulfonilureia (glibenclamida, gliclazida, glimepirida): glicose 50% EV e, a seguir, octreotide, que evita a hipoglicemia voltar.", dose: { ref: "Glicose 50% 50 mL EV; octreotide 50 mcg SC ou EV, depois 50 mcg a cada 6 h (uso fora da bula)" },
        mais: "Só glicose estimula mais insulina e a hipoglicemia volta. Sem hipoglicemia, não dar glicose EV preventiva: glicemia capilar frequente e alimentar se acordado. A hipoglicemia pode demorar até 13–16 h para aparecer. Depois de uma hipoglicemia, liberar só 12 h após suspender a glicose EV e o octreotide." }
    ]},
    { t: "CIATox, observação e alta", acoes: [
      { txt: "Ligue para o CIATox (botões abaixo) com nome do produto, quantidade, horário e via; peça ajuda cedo no caso grave ou de substância desconhecida.",
        mais: "Disque-Intoxicação (Anvisa, Rede Nacional de Centros de Informação e Assistência Toxicológica): 0800 722 6001, gratuito, 24 h; a ligação vai para o CIATox mais próximo. Salve no aparelho o telefone do CIATox da sua região." },
      { txt: "Observar pelo menos 6 h, mesmo sem sintomas; mais tempo com liberação prolongada, sintomas que persistem ou uso de antídoto.",
        mais: "Opioide: sem naloxona, pelo menos 2 h; com naloxona, 3–4 h após a última dose. Metadona, liberação prolongada, adesivo de fentanil, doses repetidas ou infusão de naloxona: internar (metadona e adesivo: pelo menos 24 h). Benzodiazepínico isolado: alta se só sintomas leves 6 h após a ingestão; depressão que persiste: internar. Sulfonilureia: ver acima. Paracetamol: até cumprir os critérios de suspensão da N-acetilcisteína." },
      { txt: "Ingestão intencional: avaliação psiquiátrica e medidas de segurança antes da alta. Notificar: tentativa de suicídio é notificação imediata (até 24 h).",
        mais: "Notificação compulsória no SINAN: intoxicação exógena (semanal) e tentativa de suicídio (imediata, até 24 h, à Secretaria Municipal de Saúde). Lista nacional: Portaria GM/MS nº 5.201/2024." }
    ]}
  ],
  atalhos: [
    { rot: "CIATox", ciatox: true },
    { rot: "Intubação", aba: "iot" },
    { rot: "Nomograma do paracetamol", aba: "contas" }
  ],
  fontes: [
    "Cao D et al. Part 10: Adult and Pediatric Special Circumstances of Resuscitation — 2025 AHA Guidelines for CPR and ECC (Circulation 2025;152(16 Suppl 2):S578–S672), seção 21, Toxicologia, e Tabela 4: atropina 1–2 mg dobrando a cada 5 min até pulmão limpo, FC > 80 e PAS > 80, infusão de 10–20% da dose de ataque por hora até 2 mg/h; intubação precoce e sem succinilcolina no organofosforado; flumazenil 0,2 mg titulado até 1 mg, só no benzodiazepínico puro, dano em quem tem risco de convulsão ou arritmia, sem papel na PCR; opioide e benzodiazepínico juntos: naloxona primeiro; naloxona 0,2–2 mg EV/IO/IM a cada 2–3 min, infusão de 2/3 da dose que acordou por hora, sem atrasar a RCP; bicarbonato 50–150 mEq, pH até 7,55 e sódio até 155; lidocaína nos bloqueadores Ia/Ic; sedação e resfriamento externo rápido (imersão em água gelada) no simpaticomimético. https://doi.org/10.1161/CIR.0000000000001380",
    "Lavonas EJ et al. 2023 American Heart Association Focused Update on the Management of Patients With Cardiac Arrest or Life-Threatening Toxicity Due to Poisoning (Circulation 2023;148:e149–e184), Tabela 2 e seções de benzodiazepínico, opioide, organofosforado e bloqueador de canal de sódio (mesmas doses da Tabela 4 de 2025; lidocaína como segunda linha após o bicarbonato no tricíclico). https://doi.org/10.1161/CIR.0000000000001161",
    "American Academy of Clinical Toxicology; European Association of Poisons Centres and Clinical Toxicologists. Position Paper: Single-Dose Activated Charcoal (Clin Toxicol 2005;43:61–87): considerar até 1 h da ingestão de quantidade tóxica; adolescentes e adultos 25–100 g; contraindicado com via aérea não protegida. https://eapcct.org/wp-content/uploads/2024/09/PS_SingleDoseActivatedCharcoal.pdf",
    "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement (JAMA Netw Open 2023;6:e2327739): linha de tratamento de 150 mcg/mL em 4 h, linha de alto risco de 300, iniciar acetilcisteína antes do nível se ele sairá depois de 8 h e a dose foi > 200 mg/kg ou > 10 g, pelo menos 300 mg/kg em 20–24 h, cálculo limitado a 100 kg. https://doi.org/10.1001/jamanetworkopen.2023.27739",
    "Centre antipoison du Québec. Antidotes — Activated charcoal (atualizado em 10/02/2026): 1 g/kg VO ou por sonda, dose única, máx. 50 g, adulto e criança, até 1 h. https://www.ciusss-capitalenationale.gouv.qc.ca/en/antidotes/activated-charcoal",
    "Bula do Fluimucil injetável (acetilcisteína 100 mg/mL, ampola de 3 mL), Zambon, aprovada pela Anvisa em 12/12/2023: antídoto do paracetamol, iniciar até 8 h; ≥ 40 kg: 150 mg/kg em 200 mL em 60 min, 50 mg/kg em 500 mL em 4 h e 100 mg/kg em 1.000 mL em 16 h; em solução salina ou glicosada 5%; reação anafilactoide: suspender, tratar e reiniciar mais devagar.",
    "FDA. Acetadote (acetylcysteine injection), bula americana, DailyMed (set id 472f158a-5ab9-4308-8e49-1116e6ea3d39): 100 kg ou mais: 15.000, 5.000 e 10.000 mg; hora desconhecida, chegada após 8 h ou nível indisponível até 8 h: dose de ataque imediata.",
    "Bula do Narcan (cloridrato de naloxona 0,4 mg/mL), Cristália, aprovada pela Anvisa em 01/06/2026: 0,4–2 mg EV, repetir a cada 2–3 min; sem resposta com 10 mg, questionar o diagnóstico; IM ou SC sem acesso venoso; no dependente, 0,04–0,4 mg escalonado até 2 mg.",
    "Bula do Flumazil (flumazenil 0,1 mg/mL), Cristália, conforme bula padrão aprovada pela Anvisa em 23/05/2024: 0,2 mg EV em 15 s, depois 0,1 mg a cada 60 s até 1 mg; na UTI, 0,3 mg até 2 mg; contraindicado se o benzodiazepínico controla condição grave (pressão intracraniana, estado de mal); cuidado na intoxicação mista com antidepressivo cíclico. FDA, bula do flumazenil injetável (DailyMed, 2026): não usar com sinais de intoxicação grave por antidepressivo cíclico (QRS largo, arritmia, sinais anticolinérgicos, alterações motoras).",
    "Glatstein M, Scolnik D, Bentur Y. Octreotide for the treatment of sulfonylurea poisoning (Clin Toxicol 2012;50:795–804): adulto 50 mcg SC ou EV, seguido de 50 mcg a cada 6 h; hipoglicemia em 1–13 h no adulto e até 16 h na criança. https://doi.org/10.3109/15563650.2012.734626",
    "Klein-Schwartz W, Stassinos GL, Isbister GK. Treatment of sulfonylurea and insulin overdose (Br J Clin Pharmacol 2016;81:496–504): glicose EV em bolus e depois octreotide; sem glicose profilática; observar 12 h após suspender glicose e octreotide. https://doi.org/10.1111/bcp.12822",
    "Drew BJ et al. Prevention of torsade de pointes in hospital settings: AHA/ACCF scientific statement (Circulation 2010;121:1047): QTc > 500 ms é alto risco.",
    "Anvisa. Disque-Intoxicação 0800 722 6001: gratuito, 24 h, atendido pela Rede Nacional de Centros de Informação e Assistência Toxicológica (Renaciat), com transferência para o CIATox mais próximo. https://www.gov.br/anvisa/pt-br/assuntos/agrotoxicos/disque-intoxicacao",
    "Ministério da Saúde. Portaria GM/MS nº 5.201, de 15/08/2024 (Anexo 1 do Anexo V da Portaria de Consolidação nº 4/2017): intoxicação exógena, notificação semanal; violência sexual e tentativa de suicídio, notificação imediata (até 24 h) ao município.",
    "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 99, Manejo inicial das intoxicações exógenas (história, estabilização, cristaloide 10–20 mL/kg, síndromes tóxicas, carvão (indicação e contraindicações; 25–100 g no adulto), lavagem gástrica, sem indução de vômito, observação mínima de 6 h, avaliação psiquiátrica antes da alta); cap. 100, Intoxicações por álcoois e drogas de abuso (tiamina 100 mg); cap. 101, Abordagem específica das intoxicações por fármacos (carvão 1 g/kg, máx. 50 g; acetilcisteína sem nível em até 8 h se > 150 mg/kg ou > 12 g; naloxona 0,4 mg até 15 mg, FR < 12, observação de 2 h, 3–4 h e 24 h; flumazenil 0,1–0,2 mg até 1 mg; paracetamol: N-acetilcisteína, critérios de suspensão, reação anafilactoide de 10–20%; tricíclico: QRS > 100 ms, bicarbonato 1–2 mEq/kg, manutenção de 150 mL de 8,4% em 1.000 mL de SG 5% a 150–250 mL/h, sem fenitoína nem flumazenil; benzodiazepínico: alta após 6 h); cap. 102, Intoxicações ambientais (atropina, pralidoxima, chumbinho, descontaminação da pele).",
    "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill, 2025 — cap. 470, Poisoning and Drug Overdose: carvão ativado (absorção reduzida cai com o tempo; adsorve mal ácidos, álcalis, ferro e lítio; não usar no corrosivo, atrapalha a endoscopia), lavagem gástrica só em venenos graves sem outra terapia."
  ]
},
convulsao: {
  quando: "Crise tônico-clônica há 5 min ou mais, ou crises repetidas sem recuperar a consciência entre elas.",
  alerta: "Benzodiazepínico já aos 5 min. Gestante a partir de 20 semanas ou puérpera: pensar em eclâmpsia (sulfato de magnésio).",
  etapas: [
    { t: "0–5 min", acoes: [
      { txt: "Decúbito lateral, aspirar a boca se preciso, O2, monitor e oximetria." },
      { txt: "Acesso venoso; colher sódio, potássio, cálcio, magnésio, função renal, gasometria e hemograma; ECG." },
      { txt: "Glicemia capilar agora. Se baixa: glicose 50% EV; etilista ou desnutrido: tiamina EV junto, sem atrasar a glicose.", dose: { ref: "Glicose 50% 50 mL EV + tiamina 100 mg EV" } }
    ]},
    { t: "5 min: benzodiazepínico", acoes: [
      { txt: "Com acesso venoso: diazepam EV lento, sem diluir.", dose: { ref: "0,15–0,2 mg/kg EV (máx. 10 mg por dose), até 5 mg/min; pode repetir 1 vez após 5 min", porKg: 0.2, un: "mg", max: 10, conc: 5 } },
      { txt: "Sem acesso venoso: midazolam IM na coxa, sem diluir.", dose: { ref: "10 mg IM (2 mL de 5 mg/mL) se > 40 kg; 5 mg se 13–40 kg; dose única" } }
    ]},
    { t: "20 min: 2ª droga (escolha uma, dose única)", acoes: [
      { txt: "Fenitoína EV em SF 0,9% (nunca em soro glicosado), com monitor de ECG e PA.", dose: { ref: "20 mg/kg EV, até 50 mg/min (idoso ou cardiopata: até 20 mg/min)", porKg: 20, un: "mg", conc: 50 },
        mais: "Fenitoína não tem teto de dose nas diretrizes; o teto de 1.500 mg (AES, ESETT) é da fosfenitoína. As três opções têm eficácia semelhante (ESETT)." },
      { txt: "Ou levetiracetam EV em 15 min.", dose: { ref: "60 mg/kg EV (máx. 4.500 mg) em 15 min", porKg: 60, un: "mg", max: 4500, conc: 100 } },
      { txt: "Ou ácido valproico EV em 10 min, se houver na unidade (pode faltar no Brasil). Não usar em hepatopatia nem na gestação.", dose: { ref: "40 mg/kg EV (máx. 3.000 mg) em 10 min", porKg: 40, un: "mg", max: 3000, conc: 100 },
        mais: "Não usar em hepatopatia, doença mitocondrial (mutação POLG), distúrbio do ciclo da ureia, porfiria nem na gestação (bula). O Depacon não aparece na lista CMED de set/2026 nem na RENAME: confirme na farmácia. A bula orienta 60 min (até 20 mg/min); os 10 min vêm do ESETT e da AES." }
    ]},
    { t: "Sem nenhuma das três", acoes: [
      { txt: "Fenobarbital EV, com material de ventilação pronto (contraindicado na gestação pela bula; pesar o risco).", dose: { ref: "20 mg/kg EV, até 50 mg/min (volume para 100 mg/mL; existe ampola de 200 mg/mL)", porKg: 20, un: "mg", conc: 100 },
        mais: "20 mg/kg segue a Neurocritical Care Society 2012 e o HC-FMUSP; a AES 2016 usa 15 mg/kg." },
      { txt: "Preparar a via aérea avançada se não houver proteção da via aérea." }
    ]},
    { t: "40 min: refratário", acoes: [
      { txt: "Intubar, pedir EEG contínuo e vaga de UTI.", mais: "Parou de convulsionar mas não acorda: pensar em estado de mal não convulsivo (EEG)." },
      { txt: "Midazolam EV em bolus e depois infusão (dose do estado de mal, bem maior que a de sedação).", dose: { ref: "0,2 mg/kg EV (até 2 mg/min), depois 0,05–2 mg/kg/h", porKg: 0.2, un: "mg", conc: 5 },
        mais: "A bomba de infusão do painel está configurada para sedação (0,02–0,1 mg/kg/h); no estado de mal, a faixa é 0,05–2 mg/kg/h (Neurocritical Care Society 2012)." },
      { txt: "Ou propofol em bolus e infusão; cuidado com hipotensão.", dose: { ref: "1–2 mg/kg EV, depois 2–10 mg/kg/h" } }
    ]}
  ],
  atalhos: [
    { rot: "Intubação", aba: "iot" },
    { rot: "Eclâmpsia", protocolo: "pre-eclampsia" }
  ],
  fontes: [
    "Glauser T et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults — AES (Epilepsy Curr 2016;16:48): definição em 5 min, diazepam 0,15–0,2 mg/kg (máx. 10 mg, repetir 1 vez), midazolam IM 10 mg (> 40 kg) ou 5 mg (13–40 kg), segunda droga em dose única, fenobarbital se não houver as outras. https://doi.org/10.5698/1535-7597-16.1.48",
    "Brophy GM et al. Guidelines for the evaluation and management of status epilepticus — Neurocritical Care Society (Neurocrit Care 2012;17:3): estabilização, diazepam até 5 mg/min, fenitoína até 50 mg/min, fenobarbital 20 mg/kg, midazolam 0,2 mg/kg a 2 mg/min e 0,05–2 mg/kg/h, EEG contínuo.",
    "Kapur J et al. ESETT: levetiracetam, fosfenitoína ou valproato (N Engl J Med 2019;381:2103): eficácia semelhante; levetiracetam 60 mg/kg (máx. 4.500 mg), valproato 40 mg/kg (máx. 3.000 mg) em 10 min.",
    "Silbergleit R et al. RAMPART: midazolam IM vs lorazepam EV (N Engl J Med 2012;366:591).",
    "Bula do fenobarbital injetável (Fenocris, Cristália; Carbital 200 mg/mL), Anvisa: velocidade menor que 60 mg/min; contraindicações.",
    "Schabelman E, Kuo D. Glucose before thiamine for Wernicke encephalopathy: a literature review (J Emerg Med 2012;42:488): tiamina junto com a glicose, sem atrasá-la.",
    "Brasil. Ministério da Saúde. Manual de Gestação de Alto Risco, 2022 — cap. 11: eclâmpsia e sulfato de magnésio.",
    "Bula Anvisa do Depacon (valproato de sódio 100 mg/mL), Abbott: contraindicado em hepatopatia significativa, doença mitocondrial por mutação POLG, distúrbio do ciclo da ureia e porfiria. Lista CMED/Anvisa, set/2026: Depacon ausente (disponibilidade incerta).",
    "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — capítulo complementar 18, Abordagem do estado de mal epiléptico: estabilização, tabelas de primeira e segunda linha, fenitoína até 20 mg/min no idoso e no cardiopata.",
    "Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill — cap. 436, Seizures and Epilepsy: estado de mal a partir de 5 min; EEG se não acordar."
  ]
},
agitacao: {
  quando: "Paciente agitado ou agressivo, com risco para si ou para a equipe.",
  alerta: "Agitação é sintoma, não diagnóstico: glicemia, oximetria e temperatura em todos, de preferência antes de sedar.",
  etapas: [
    { t: "0–5 min", acoes: [
      { txt: "Segurança: equipe de apoio por perto, sala calma, sem objetos que sirvam de arma; fique do lado da porta." },
      { txt: "Abordagem verbal: fale calmo e curto, ouça, ofereça escolhas. Se colaborar, prefira remédio por via oral.", mais: "Apresentar-se e validar o que o paciente sente." },
      { txt: "Causa clínica: glicemia capilar, oximetria, temperatura, PA e pulso. Hipoglicemia: glicose 50% EV (+ tiamina junto no etilista).", dose: { ref: "Glicose 50% 40–50 mL EV + tiamina 100 mg EV" },
        mais: "Pensar em causa orgânica se início súbito, 45 anos ou mais, sinal vital alterado, confusão, sinal neurológico focal, trauma de crânio, intoxicação ou abstinência. Hipóxia: O2 e tratar a causa. Tiamina sem atrasar a glicose." }
    ]},
    { t: "5–15 min: sedação IM", acoes: [
      { txt: "Agitação grave sem causa definida: haloperidol + prometazina, os dois só IM profunda (não EV).", dose: { ref: "Haloperidol 5 mg (1 mL de 5 mg/mL) + prometazina 50 mg (2 mL de 25 mg/mL) IM" } },
      { txt: "Ou midazolam IM: acalma mais rápido, mas deprime mais a respiração; ter material de via aérea.", dose: { ref: "15 mg IM (3 mL de 5 mg/mL)" } },
      { txt: "QT longo, outro remédio que alarga o QT, hipocalemia ou cardiopatia: evite haloperidol, prefira midazolam; ECG assim que possível." }
    ]},
    { t: "Situações especiais", acoes: [
      { txt: "Intoxicação por álcool: haloperidol isolado; evite benzodiazepínico. Com rebaixamento da consciência: não sedar.", dose: { ref: "Haloperidol 5 mg IM (1 mL de 5 mg/mL)" } },
      { txt: "Abstinência alcoólica (tremor, suor, taquicardia) ou intoxicação por cocaína: benzodiazepínico.", dose: { ref: "Diazepam 10 mg EV lento (até 5 mg/min)" } },
      { txt: "Idoso: presuma delirium e trate a causa; se sedar, haloperidol em dose baixa, sem prometazina nem benzodiazepínico. Gestante: haloperidol isolado.", dose: { ref: "Idoso: haloperidol 1–2,5 mg IM (máx. 5 mg/dia)" } }
    ]},
    { t: "Contenção, se indispensável", acoes: [
      { txt: "Contenção só se a conversa e o remédio não bastarem: prescrever, registrar o motivo; sinais vitais e circulação dos membros a cada 15 min na 1ª hora.",
        mais: "Cinco pessoas treinadas, uma por membro e uma para a cabeça. Quatro membros, no leito (evitar maca), de barriga para cima, cabeceira a 30°. Vigiar sinais vitais, oximetria, consciência, pele e circulação dos membros a cada 15 min na 1ª hora e a cada 30 min por 4 h; retirar assim que possível (em princípio, até 2 h). Explicar ao paciente e à família." }
    ]},
    { t: "30 min: reavaliar", acoes: [
      { txt: "Sem controle em 30 min: pode repetir a mesma medicação 1 vez. Haloperidol: máx. 20 mg/dia.", mais: "Repetir em 30 min segue a ABP 2019; as bulas do haloperidol falam em repetir a cada 1 h." },
      { txt: "Após sedar: oximetria e sinais vitais seguidos; ECG quando possível.",
        mais: "Exames conforme a suspeita: eletrólitos, função renal e hepática, toxicológico; tomografia de crânio se trauma, sinal focal ou causa não esclarecida." }
    ]}
  ],
  atalhos: [
    { rot: "Intubação", aba: "iot" }
  ],
  fontes: [
    "Baldaçara L et al. Brazilian guidelines for the management of psychomotor agitation. Part 1. Non-pharmacological approach — ABP (Braz J Psychiatry 2019;41:153): abordagem verbal, sinais de causa orgânica (quadro 1), contenção com prescrição, cinco pessoas, quatro pontos no leito (evitar maca), até 2 h e monitorização a cada 15 min na 1ª hora e a cada 30 min por 4 h. https://doi.org/10.1590/1516-4446-2018-0163",
    "Baldaçara L et al. Brazilian guidelines for the management of psychomotor agitation. Part 2. Pharmacological approach — ABP (Braz J Psychiatry 2019;41:324): via oral preferida, IM se não for possível, EV evitada; tabela 2 (haloperidol 2,5–10 mg, haloperidol + prometazina 25–50 mg, midazolam até 15 mg, repetir em 30 min); risco cardíaco; intoxicação alcoólica, abstinência, delirium, idoso e gestante. https://doi.org/10.1590/1516-4446-2018-0177",
    "Wilson MP et al. The psychopharmacology of agitation: consensus statement of the American Association for Emergency Psychiatry Project BETA Psychopharmacology Workgroup (West J Emerg Med 2012;13:26): haloperidol na intoxicação alcoólica, benzodiazepínico na abstinência, tratar a causa do delirium. https://doi.org/10.5811/westjem.2011.9.6866",
    "TREC Collaborative Group. Rapid tranquillisation for agitated patients in emergency psychiatric rooms: midazolam versus haloperidol plus promethazine (BMJ 2003;327:708).",
    "Huf G et al. Rapid tranquillisation in psychiatric emergency settings in Brazil: haloperidol versus haloperidol plus promethazine — TREC (BMJ 2007;335:869): a combinação acalma mais rápido e evitou distonia aguda.",
    "Bula do haloperidol solução injetável 5 mg/mL (Fresenius Kabi), conforme bula padrão aprovada pela Anvisa em 09/12/2025: só IM; 2,5–5 mg IM, repetível; contraindicado no coma e na depressão do sistema nervoso central por álcool ou outros depressores; cautela no QT longo.",
    "FDA. Haloperidol (lactato) injection — bula americana, Fresenius Kabi USA, DailyMed, out/2026: 2–5 mg IM, até de hora em hora, dose máxima de 20 mg/dia.",
    "European Medicines Agency. Haldol — Article 30 referral, Annex III (2017): idoso começa com metade da menor dose de adulto, máx. 5 mg/dia; contraindicado no QT longo, hipocalemia não corrigida e com outros remédios que alargam o QT.",
    "Bula do Compaz (diazepam 5 mg/mL injetável), Cristália, registrada na Anvisa: EV lenta, 0,5–1 mL/min (2,5–5 mg/min).",
    "Bula do Fenergan (cloridrato de prometazina) injetável, Sanofi, registrada na Anvisa — 25–50 mg IM profunda, não exceder 100 mg/dia.",
    "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023): no idoso, evitar benzodiazepínico e anti-histamínico de 1ª geração; antipsicótico no delirium só se medidas não farmacológicas falharem e houver risco importante para si ou para outros.",
    "American Diabetes Association. Standards of Care in Diabetes—2025, seção 6 (Glycemic Goals and Hypoglycemia).",
    "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 15, Agitação psicomotora: os 4 H do 1º minuto (hipóxia, hipoglicemia, hipertermia, hipovolemia), contenção em decúbito dorsal com cabeceira a 30° e monitorização, benzodiazepínico na abstinência alcoólica, evitar benzodiazepínico no idoso."
  ]
},
anafilaxia: {
  quando: "Reação alérgica aguda com via aérea, respiração ou circulação comprometidas (rouquidão, estridor, chiado, hipotensão, desmaio).",
  alerta: "Adrenalina IM é a primeira droga, sem contraindicação absoluta (inclusive idoso, cardiopata e gestante); anti-histamínico e corticoide não a substituem.",
  etapas: [
    { t: "0–5 min", acoes: [
      { txt: "Adrenalina 1 mg/mL IM no vasto lateral da coxa, sem diluir, agora (não espere acesso venoso).", dose: { ref: "0,01 mg/kg IM (máx. 0,5 mg = 0,5 mL no adulto)", porKg: 0.01, un: "mg", max: 0.5, conc: 1 } },
      { txt: "Retire o gatilho (infusão, contraste, sangue); deite com as pernas elevadas (sentado se a falta de ar piorar; gestante em decúbito lateral esquerdo).", mais: "Não levantar nem sentar de repente." },
      { txt: "O2 10–15 L/min com reservatório, monitor, PA a cada 5 min, acesso calibroso; prepare a via aérea (pode ser difícil).", mais: "Pedir ajuda; intubação pelo mais experiente, com plano para via aérea cirúrgica." }
    ]},
    { t: "5 min: reavaliar", acoes: [
      { txt: "Sem melhora: repetir a mesma dose de adrenalina IM, de preferência na outra coxa (a cada 5 min).", dose: { ref: "0,01 mg/kg IM (máx. 0,5 mg = 0,5 mL)", porKg: 0.01, un: "mg", max: 0.5, conc: 1 } },
      { txt: "Hipotensão: SF 0,9% ou Ringer lactato em bolus rápido; não usar coloide.", dose: { ref: "20 mL/kg EV rápido (máx. 1.000 mL por bolus), repetir conforme a resposta", porKg: 20, un: "mL", max: 1000 },
        mais: "Teto de 1.000 mL por bolus no adulto (RCUK 2021: 500–1.000 mL); a WAO 2020 usa 20 mL/kg." },
      { txt: "Broncoespasmo ou estridor: nebulização como adjuvante, sem atrasar a adrenalina IM nem a intubação.", dose: { ref: "Salbutamol 5 mg + ipratrópio 500 mcg nebulizados; estridor: adrenalina 1 mg/mL, 5 mL nebulizados" } }
    ]},
    { t: "10 min: refratária", acoes: [
      { txt: "Sem resposta após 2 doses IM: adrenalina EV só em bomba (nunca a ampola pura na veia), via exclusiva; manter a IM a cada 5 min até a bomba começar.", dose: { ref: "1 mg em 100 mL de SF 0,9% (10 mcg/mL): iniciar a 0,5 mL/kg/h; 1 mL/kg/h se hipotensão ou hipóxia (70 kg: 35–70 mL/h)" },
        mais: "Pode ser veia periférica. Monitor contínuo; não infundir no braço do manguito de PA." },
      { txt: "Em uso de betabloqueador e sem resposta: glucagon EV (vigiar vômito e proteger a via aérea).", dose: { ref: "Glucagon 1 mg EV; pode repetir ou seguir com infusão de 1–2 mg/h" } },
      { txt: "Sem resposta à adrenalina EV: acesso central, UTI e segundo vasopressor.", dose: { ref: "Noradrenalina 0,05–0,5 mcg/kg/min EV" } }
    ]},
    { t: "Depois de estabilizar", acoes: [
      { txt: "Anti-histamínico só para sintomas de pele.", dose: { ref: "Loratadina ou cetirizina 10 mg VO; sem via oral, prometazina 25–50 mg IM profunda (máx. 100 mg/dia)" } },
      { txt: "Corticoide não é rotina: considerar se asma, broncoespasmo persistente ou reação refratária.", dose: { ref: "Hidrocortisona 200 mg EV ou metilprednisolona 1–2 mg/kg EV (máx. 125 mg)" } },
      { txt: "Observar pelo menos 6 h após a resolução; 12 h se precisou de mais de 2 doses de adrenalina, asma grave ou comprometimento respiratório grave.", mais: "2 h só se cumprir todos os critérios do fluxo da anafilaxia." }
    ]}
  ],
  atalhos: [
    { rot: "Fluxo da anafilaxia", protocolo: "anafilaxia" },
    { rot: "Intubação", aba: "iot" },
    { rot: "Bomba: noradrenalina", bic: "noradrenalina" }
  ],
  fontes: [
    "Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020;13:100472): critérios, adrenalina IM 0,01 mg/kg (máx. 0,5 mg no adulto) a cada 5–15 min, posição, cristaloide, glucagon no betabloqueado, papel limitado de anti-histamínico e corticoide. https://doi.org/10.1016/j.waojou.2020.100472",
    "Resuscitation Council UK. Emergency treatment of anaphylaxis: guidelines for healthcare providers, maio 2021: repetir a IM em 5 min, refratária após 2 doses, infusão periférica de adrenalina 1 mg/100 mL a 0,5–1 mL/kg/h, volume em bolus, salbutamol, ipratrópio, adrenalina nebulizada, glucagon, hidrocortisona, noradrenalina, observação em 2, 6 ou 12 h. https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis",
    "Golden DBK et al. Anaphylaxis: a 2023 practice parameter update (Ann Allergy Asthma Immunol 2024;132:124). https://pubmed.ncbi.nlm.nih.gov/38108678/",
    "Shaker MS et al. Anaphylaxis — a 2020 practice parameter update, systematic review, and GRADE analysis (J Allergy Clin Immunol 2020;145:1082): corticoide e anti-histamínico não previnem reação bifásica.",
    "Bula do Fenergan (cloridrato de prometazina) injetável, Sanofi, registrada na Anvisa — 25–50 mg IM profunda, não exceder 100 mg/dia.",
    "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 11, Anafilaxia e outras alergias: via aérea difícil, gestante em decúbito lateral esquerdo, metilprednisolona 1–2 mg/kg até 125 mg, noradrenalina 0,05–0,5 mcg/kg/min.",
    "Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill — cap. 364, Anaphylaxis: adrenalina IM como primeira escolha; atraso além de 20 min piora o desfecho."
  ]
},
sepse: {
  quando: "Suspeita de infecção com hipotensão, hipoperfusão ou disfunção orgânica (sepse provável ou choque séptico).",
  alerta: "Volume individualizado: reavalie perfusão e congestão a cada etapa; cardiopata pode precisar de infusão mais lenta.",
  etapas: [
    { t: "Na chegada", acoes: [
      { txt: "Monitor e acesso calibroso; lactato (resultado em até 30 min) e hemoculturas antes do antibiótico, sem atrasá-lo." },
      { txt: "Hemograma, creatinina, bilirrubinas, coagulograma e gasometria." },
      { txt: "Tempo de enchimento capilar > 3 s é hipoperfusão, mesmo com lactato normal." }
    ]},
    { t: "1ª hora", acoes: [
      { txt: "Antibiótico EV de amplo espectro pelo foco provável e pelo guia do serviço, já (idealmente na 1ª hora); 1ª dose plena, sem ajuste renal.",
        mais: "Sepse só possível, sem choque: investigação rápida; se a suspeita persistir, antibiótico em até 3 h (SSC 2026)." },
      { txt: "Hipotensão (PAM < 65) ou hipoperfusão (lactato > 2× o normal, enchimento capilar lento): Ringer lactato em bolus, reavaliando; no TCE, SF 0,9%.", dose: { ref: "30 mL/kg EV: iniciar na 1ª hora e terminar em até 3 h", porKg: 30, un: "mL" },
        mais: "Hipotensão: PAS < 90 ou PAM < 65 mmHg. Hipoperfusão: lactato > 2 vezes o normal, enchimento capilar lento, livedo, oligúria. A SSC 2026 fala em pelo menos 30 mL/kg; o ILAS, em até 30 mL/kg: individualizar." }
    ]},
    { t: "PAM < 65 mmHg apesar do volume", acoes: [
      { txt: "Noradrenalina, 1ª escolha, em veia periférica calibrosa, sem esperar o acesso central; hipotensão grave: iniciar já, junto com o volume.", dose: { ref: "bula FDA (Levophed): iniciar 8–12 mcg/min (em norepinefrina base) ≈ 0,1–0,2 mcg/kg/min em 70 kg; titular pela PAM" },
        mais: "Atenção à unidade: a bomba do painel calcula em mcg/kg/min. Para 8–12 mcg/min, divida pelo peso (ex.: 70 kg → 0,11–0,17 mcg/kg/min)." },
      { txt: "Alvo inicial: PAM 65 mmHg (≥ 65 anos: 60–65 mmHg, se a perfusão estiver adequada). Não tolerar PAM abaixo do alvo por mais de 30–40 min." }
    ]},
    { t: "Choque persistente", acoes: [
      { txt: "Noradrenalina em dose crescente (em geral 0,25–0,5 mcg/kg/min): associar vasopressina em dose fixa.", dose: { ref: "0,03 U/min EV, sem titular" } },
      { txt: "Necessidade persistente de vasopressor (ex.: noradrenalina ≥ 0,25 mcg/kg/min por 4 h ou mais): hidrocortisona.", dose: { ref: "200 mg/dia: 50 mg EV de 6/6 h ou infusão contínua" } },
      { txt: "Disfunção cardíaca com hipoperfusão apesar de volume e vasopressor: associar dobutamina (ou usar adrenalina isolada).", dose: { ref: "dobutamina 2,5–10 mcg/kg/min (bula; até 20)" } }
    ]},
    { t: "Até 6 h: reavaliar", acoes: [
      { txt: "Reavalie a perfusão após cada intervenção; lactato alterado: repetir em até 4 h (a meta é a queda).", mais: "Enchimento capilar a cada 30 min, consciência e diurese. Não é preciso normalizar o lactato." },
      { txt: "Controlar o foco o quanto antes: drenagem, desbridamento, retirada de cateter suspeito." },
      { txt: "Solicitar vaga de UTI pela regulação." }
    ]}
  ],
  atalhos: [
    { rot: "Bomba: noradrenalina", bic: "noradrenalina" },
    { rot: "Bomba: vasopressina", bic: "vasopressina" },
    { rot: "Bomba: dobutamina", bic: "dobutamina" }
  ],
  fontes: [
  "Prescott HC et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026 (Crit Care Med 2026; Intensive Care Med 2026;52:863) — antibiótico na 1ª hora no choque e na sepse provável, até 3 h na sepse possível; 30 mL/kg em 3 h; cristaloide balanceado; noradrenalina periférica; PAM 65 mmHg (≥ 65 anos: 60–65); vasopressina; corticoide; lactato seriado e enchimento capilar. https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026",
  "Evans L et al. Surviving Sepsis Campaign 2021 (Crit Care Med 2021;49:e1063) — hidrocortisona 200 mg/dia (50 mg de 6/6 h), iniciada com noradrenalina ≥ 0,25 mcg/kg/min por pelo menos 4 h; vasopressina 0,03 U/min com noradrenalina 0,25–0,5 mcg/kg/min; controle do foco; UTI em até 6 h. https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-guidelines-2021",
  "Instituto Latino-Americano de Sepse (ILAS). Implementação de protocolo gerenciado de sepse — protocolo clínico: atendimento ao paciente adulto com sepse/choque séptico. Revisão de julho de 2026 (pacote de 1ª hora, enchimento capilar > 3 s, 1ª dose plena do antimicrobiano, PAM < 65 por no máximo 30–40 min, 2º lactato em até 4 h, reavaliação em 6 h). https://ilas.org.br/wp-content/uploads/2022/02/Protocolo-de-tratamento-da-sepse-adulto-Revisao-julho-2026.pdf",
  "FDA. Levophed (norepinephrine bitartrate) — bula americana, DailyMed: iniciar 8–12 mcg/min (em norepinefrina base) e titular pela PA; bula da dobutamina 12,5 mg/mL (2,5–10 mcg/kg/min; até 20).",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 9, Sepse.",
  "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill, 2025 — cap. 315, Sepsis and Septic Shock."
 ]
},
sca: {
  quando: "Dor torácica ou equivalente isquêmico: ECG de 12 derivações em até 10 min da chegada.",
  alerta: "Antes de antiagregar e anticoagular, pense em dissecção de aorta (dor dilacerante, assimetria de pulso ou de PA, mediastino alargado).",
  etapas: [
    { t: "0–10 min", acoes: [
      { txt: "ECG em até 10 min (repetir a cada 15–30 min se a dor persistir); monitor, desfibrilador ao lado, acesso venoso e troponina.",
        mais: "Infarto inferior: V3R e V4R; infradesnível de V1–V3: V7–V9. Não esperar a troponina para reperfundir. O2 só se SpO2 < 90%." },
      { txt: "AAS mastigado, se não houver alergia.", dose: { ref: "162–325 mg VO (ex.: 300 mg = 3 cp de 100 mg)" } },
      { txt: "Dor: nitrato SL se PAS ≥ 90 mmHg, sem suspeita de infarto de VD e sem inibidor de PDE-5 recente (sildenafila/vardenafila 24 h, tadalafila 48 h).", dose: { ref: "dinitrato de isossorbida 5 mg SL, até 3 doses a cada 5 min; dor refratária: morfina 2–4 mg EV" },
        mais: "Sem controle da dor: nitroglicerina EV em bomba." }
    ]},
    { t: "Com supra: decidir em ≤ 10 min", acoes: [
      { txt: "Acione a regulação/central de IAM. Angioplastia possível em ≤ 120 min do diagnóstico: transferir já, com médico e monitor.",
        mais: "O tempo inclui o transporte. Choque ou insuficiência cardíaca grave: angioplastia mesmo com atraso." },
      { txt: "Indo para angioplastia: 2º antiagregante combinado com a hemodinâmica. Prasugrel: não usar se AVC ou AIT prévio.", dose: { ref: "ticagrelor 180 mg VO ou prasugrel 60 mg VO; sem os dois, clopidogrel 600 mg VO" },
        mais: "Prasugrel: a partir de 75 anos, em geral evitar; com menos de 60 kg, manutenção de 5 mg/dia (bula FDA; ESC 2023). A heparina é feita na sala de hemodinâmica." },
      { txt: "Sintomas há ≤ 12 h, angioplastia impossível em ≤ 120 min e sem contraindicação absoluta: fibrinólise na unidade.", mais: "Mais de 12 h de sintomas: ver o fluxo do IAM." }
    ]},
    { t: "Fibrinólise: porta-agulha ≤ 30 min", acoes: [
      { txt: "Tenecteplase EV em bolus único de 5–10 s, pela faixa de peso; lavar o acesso com SF 0,9% antes e depois.", dose: { ref: "< 60 kg 30 mg (6 mL) | 60–69 kg 35 mg (7 mL) | 70–79 kg 40 mg (8 mL) | 80–89 kg 45 mg (9 mL) | ≥ 90 kg 50 mg (10 mL); ≥ 75 anos: metade da dose da faixa", un: "mg", conc: 5, faixas: [[60, 30], [70, 35], [80, 40], [90, 45], [null, 50]], metadeIdade: 75 },
        mais: "Incompatível com soro glicosado. Metade da dose a partir de 75 anos segue a ESC 2023 (fora da bula)." },
      { txt: "Clopidogrel junto com o fibrinolítico.", dose: { ref: "≤ 75 anos: 300 mg VO de ataque; > 75 anos: 75 mg VO, sem ataque" } }
    ]},
    { t: "Anticoagular junto com a fibrinólise", acoes: [
      { txt: "Enoxaparina, < 75 anos: 30 mg EV em bolus e, 15 min depois, SC de 12/12 h.", dose: { ref: "1 mg/kg SC de 12/12 h (máx. 100 mg nas 2 primeiras doses); ClCr < 30 mL/min: 1 mg/kg SC 1x/dia", porKg: 1, un: "mg", max: 100, conc: 100 } },
      { txt: "Enoxaparina, ≥ 75 anos: sem bolus.", dose: { ref: "0,75 mg/kg SC de 12/12 h (máx. 75 mg nas 2 primeiras doses); ClCr < 30 mL/min: 1 mg/kg SC 1x/dia", porKg: 0.75, un: "mg", max: 75, conc: 100 } },
      { txt: "Ou HNF (frasco EV de 5.000 UI/mL; a ampola SC tem 20.000 UI/mL) em bolus, depois 12 UI/kg/h (máx. 1.000 UI/h); TTPa 1,5–2 vezes o controle.", dose: { ref: "60 UI/kg EV em bolus (máx. 4.000 UI); mL calculados para 5.000 UI/mL", porKg: 60, un: "UI", max: 4000, conc: 5000 },
        mais: "HNF = heparina não fracionada." }
    ]},
    { t: "60–90 min após o fibrinolítico", acoes: [
      { txt: "ECG: queda ≥ 50% do supra com alívio da dor = reperfusão; transferir para cateterismo em 2–24 h." },
      { txt: "Sem esses critérios, dor ou supra recorrente, instabilidade ou insuficiência cardíaca: angioplastia de resgate já; não repetir o fibrinolítico." },
      { txt: "Rebaixamento ou déficit neurológico: suspender a heparina e fazer TC de crânio." }
    ]},
    { t: "Sem supra", acoes: [
      { txt: "ECG seriado e troponina de alta sensibilidade (0/1 h ou 0/2 h); instabilidade, dor refratária, IC aguda ou arritmia grave: invasiva imediata (< 2 h).",
        mais: "ECG com V7–V9 e V3R–V4R. IC = insuficiência cardíaca." },
      { txt: "2º antiagregante, conforme a estratégia do serviço.", dose: { ref: "ticagrelor 180 mg VO ou clopidogrel 300–600 mg VO" } },
      { txt: "Anticoagular.", dose: { ref: "enoxaparina 1 mg/kg SC de 12/12 h; ClCr < 30 mL/min: 1 mg/kg SC 1x/dia", porKg: 1, un: "mg", conc: 100 },
        mais: "Alternativa: heparina não fracionada 60 UI/kg EV em bolus (máx. 4.000 UI)." }
    ]}
  ],
  atalhos: [
    { rot: "Fluxo do IAM com supra", protocolo: "iamcsst" },
    { rot: "Bomba: nitroglicerina", bic: "nitroglicerina" }
  ],
  fontes: [
  "Rao SV et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes (Circulation 2025;151:e771) — ECG em 10 min, AAS 162–325 mg, O2 se SpO2 < 90%, tempos de reperfusão, inibidores de P2Y12, anticoagulação. https://doi.org/10.1161/CIR.0000000000001309",
  "Byrne RA et al. 2023 ESC Guidelines for the management of acute coronary syndromes (Eur Heart J 2023;44:3720) — reperfusão até 12 h, fibrinólise em ≤ 10 min do diagnóstico, metade da dose de tenecteplase ≥ 75 anos, clopidogrel e enoxaparina com fibrinólise, reperfusão em 60–90 min. https://doi.org/10.1093/eurheartj/ehad191",
  "SBC. Diretriz Brasileira de Avaliação e Diagnóstico da Dor Torácica na Emergência, 2025 (Arq Bras Cardiol 122(9)). https://abccardiol.org/en/article/brazilian-guideline-for-the-evaluation-and-diagnosis-of-chest-pain-in-the-emergency-department-2025/",
  "Bula do tenecteplase (Metalyse) registrada na Anvisa — faixas de peso, bolus único, incompatibilidade com glicose; FDA label da enoxaparina (ClCr < 30 mL/min).",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 29, Síndrome coronariana aguda sem supradesnivelamento do segmento ST; cap. 30, Infarto agudo do miocárdio com supradesnivelamento do segmento ST.",
  "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill, 2025 — cap. 285, Non-ST-Segment Elevation Acute Coronary Syndrome; cap. 286, ST-Segment Elevation Myocardial Infarction."
 ]
},
avc: {
  quando: "Déficit neurológico focal súbito: anote a hora do último momento em que o paciente foi visto bem.",
  alerta: "Hipoglicemia imita AVC: glicemia capilar antes de tudo; nenhum trombolítico sem imagem excluindo hemorragia.",
  etapas: [
    { t: "0–10 min", acoes: [
      { txt: "Último momento visto bem (acordou com o déficit: vale a hora em que foi dormir bem), não a hora em que foi encontrado." },
      { txt: "Glicemia capilar: corrigir se < 60 mg/dL. Acione o código AVC/regulação e o centro de referência." },
      { txt: "NIHSS, acesso venoso calibroso; exames e ECG sem atrasar a imagem.", mais: "O2 só se SpO2 ≤ 94%; considerar intubação se Glasgow ≤ 8 ou alto risco de aspiração." }
    ]},
    { t: "Porta-imagem ≤ 20–25 min", acoes: [
      { txt: "TC de crânio sem contraste (ou RM) urgente." },
      { txt: "Possível trombectomia (ex.: NIHSS ≥ 6, afasia, negligência, desvio do olhar): angio-TC de crânio e cervical na mesma ida." , mais: "Não esperar a creatinina." },
      { txt: "Hemorragia: não trombolisar (ver fluxo). Déficit leve não incapacitante: sem trombólise (dupla antiagregação, ver fluxo)." }
    ]},
    { t: "Trombólise até 4,5 h: porta-agulha ≤ 60 min", acoes: [
      { txt: "Só com déficit incapacitante e sem contraindicação (ver fluxo). PA < 185/110 antes; se acima, nitroprussiato; se não baixar, não trombolisar.", dose: { ref: "nitroprussiato: iniciar 0,3–0,5 mcg/kg/min EV e titular a cada 5 min (máx. 10 mcg/kg/min)" } },
      { txt: "Tenecteplase EV em bolus único (5–10 s); lavar o acesso com SF 0,9%.", dose: { ref: "0,25 mg/kg (máx. 25 mg), AHA 2026; bula: < 60 kg 15 mg | 60–69 kg 17,5 | 70–79 kg 20 | 80–89 kg 22,5 | ≥ 90 kg 25 mg", porKg: 0.25, un: "mg", max: 25, conc: 5, faixas: [[60, 15], [70, 17.5], [80, 20], [90, 22.5], [null, 25]] } },
      { txt: "Ou alteplase (1 mg/mL), dose total:", dose: { ref: "0,9 mg/kg EV (máx. 90 mg)", porKg: 0.9, un: "mg", max: 90, conc: 1 } }
    ]},
    { t: "Alteplase: como dividir", acoes: [
      { txt: "10% em bolus em 1 min:", dose: { ref: "0,09 mg/kg (máx. 9 mg)", porKg: 0.09, un: "mg", max: 9, conc: 1 } },
      { txt: "Restante em bomba em 60 min:", dose: { ref: "0,81 mg/kg (máx. 81 mg)", porKg: 0.81, un: "mg", max: 81, conc: 1 } }
    ]},
    { t: "Depois do trombolítico", acoes: [
      { txt: "PA ≤ 180/105 mmHg; exame neurológico e PA a cada 15 min por 2 h, a cada 30 min por 6 h e de hora em hora até 24 h.",
        mais: "Sem antiagregante ou anticoagulante por 24 h; TC de controle antes de iniciá-los." },
      { txt: "Piora neurológica, cefaleia intensa, vômitos ou hipertensão aguda: parar a alteplase e TC de crânio urgente.", mais: "Angioedema: parar e tratar como anafilaxia." },
    ]},
    { t: "Oclusão de grande vaso: até 24 h", acoes: [
      { txt: "Candidato a trombectomia (com ou sem trombólise): transferir já, sem esperar o fim da alteplase; levar as imagens e o horário.",
        mais: "Horário = último momento visto bem. Até o procedimento, PA ≤ 185/110 mmHg; depois, ≤ 180/105 mmHg, sem baixar a PAS para < 140 mmHg." }
    ]}
  ],
  atalhos: [
    { rot: "Fluxo do AVC", protocolo: "avc" },
    { rot: "Bomba: nitroprussiato", bic: "nitroprussiato" }
  ],
  fontes: [
  "Prabhakaran S et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke — AHA/ASA (Stroke 2026) — tenecteplase 0,25 mg/kg (máx. 25 mg), alteplase 0,9 mg/kg (máx. 90 mg), PA antes e depois da reperfusão, monitorização, trombectomia. https://doi.org/10.1161/STR.0000000000000513",
  "University of Illinois Chicago, Drug Information Group. Major pharmacotherapy updates from the 2026 AHA/ASA stroke guidelines (doses de tenecteplase e alteplase, PA, glicemia). https://dig.pharmacy.uic.edu/faqs/2026-2/april-2026-faqs/update-what-are-major-pharmacotherapy-updates-from-the-2026-aha-asa-stroke-guidelines/",
  "Bula FDA do TNKase (indicação de AVC, 2025) e resumo europeu do Metalyse 25 mg: tenecteplase no AVC por faixas de peso (15; 17,5; 20; 22,5; 25 mg). A Anvisa aprovou o Metalyse 25 mg para AVC em 08/12/2025.",
    "Bula do nitroprussiato de sódio (0,3 a 10 mcg/kg/min); bula da tenecteplase (bolus de 5–10 s, incompatível com glicose) e FDA label Activase (alteplase 1 mg/mL, 10% em bolus em 1 min).",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 53, Abordagem do paciente com AVC isquêmico agudo.",
  "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill, 2025 — cap. 438, Ischemic Stroke."
 ]
},
pcr: {
  quando: "Não responde e não respira (ou só tem gasping), sem pulso central em até 10 s.",
  alerta: "Pausas mínimas: ritmo e pulso em até 10 s a cada 2 min. A PCR guiada marca o tempo, o ciclo e as doses.",
  etapas: [
    { t: "Já", acoes: [
      { txt: "Compressões 100–120/min, pelo menos 5 cm, retorno completo do tórax." },
      { txt: "Sem via aérea avançada: 30:2. Com via aérea avançada: 1 ventilação a cada 6 s, sem pausar, com capnografia." },
      { txt: "Monitor/desfibrilador e acesso EV ou IO." }
    ]},
    { t: "A cada 2 min: ritmo", acoes: [
      { txt: "FV/TV sem pulso: choque único e compressões na hora.", dose: { ref: "bifásico: energia do fabricante (120–200 J; se desconhecida, a máxima); monofásico 360 J" } },
      { txt: "AESP ou assistolia: não chocar; manter a RCP." }
    ]},
    { t: "Drogas", acoes: [
      { txt: "Adrenalina a cada 3–5 min: não chocável, o quanto antes; chocável, após o 2º choque.", dose: { ref: "1 mg EV/IO (1 mL da ampola de 1 mg/mL)" } },
      { txt: "FV/TV refratária, após o 3º choque: amiodarona.", dose: { ref: "300 mg EV/IO em bolus; 2ª dose 150 mg" } },
      { txt: "Ou lidocaína 2% (cálculo com 1 mg/kg).", dose: { ref: "1–1,5 mg/kg EV/IO; 2ª dose 0,5–0,75 mg/kg", porKg: 1, un: "mg", conc: 20 } }
    ]},
    { t: "Durante toda a PCR", acoes: [
      { txt: "Procure e trate as causas reversíveis (5H e 5T).", mais: "Hipovolemia, hipóxia, H+ (acidose), hipo/hipercalemia, hipotermia; pneumotórax hipertensivo, tamponamento, toxinas, trombose pulmonar, trombose coronária." },
      { txt: "Subida abrupta do CO2 expirado pode indicar retorno da circulação espontânea." },
      { txt: "Não usar de rotina: bicarbonato, cálcio, magnésio, vasopressina ou adrenalina em dose alta." }
    ]}
  ],
  atalhos: [
    { rot: "Abrir a PCR guiada", aba: "pcr" },
    { rot: "Intubação", aba: "iot" }
  ],
  fontes: [
  "Wigginton JG et al. Part 9: Adult Advanced Life Support — 2025 AHA Guidelines for CPR and ECC (Circulation 2025;152(16 Suppl 2):S538) — choque, adrenalina 1 mg a cada 3–5 min, amiodarona 300/150 mg, lidocaína 1–1,5/0,5–0,75 mg/kg, ventilação com via aérea avançada, drogas que não devem ser usadas de rotina. https://doi.org/10.1161/CIR.0000000000001376",
  "Kleinman ME et al. Part 7: Adult Basic Life Support — 2025 AHA Guidelines for CPR and ECC (Circulation 2025;152(16 Suppl 2):S448) — reconhecimento (pulso em até 10 s) e RCP de alta qualidade. https://doi.org/10.1161/CIR.0000000000001369",
  "AHA 2025 Adult Cardiac Arrest Algorithm (sequência de choques e drogas). https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 4, Suporte Avançado de Vida.",
  "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill, 2025 — cap. 317, Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death."
 ]
},
};
if (typeof module!=="undefined") module.exports={AGORA};

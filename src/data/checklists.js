/* ===== Checklist por diagnóstico: o que não esquecer de perguntar e examinar =====
   hist: anamnese | ant: antecedentes relevantes | ex: exame físico dirigido | alarme: sinais de alarme
   Cada item é um achado que pode ser marcado como presente (+) ou ausente (−) e vira texto na evolução.
   Escreva como substantivo ("febre", "tosse"), para caber em "Refere: …" e "Nega: …".
   Toda lista precisa de fontes; itens sem respaldo na fonte não entram. */
const CHK_FARINGE={
 hist:["febre > 38 °C","tosse","coriza, rouquidão, conjuntivite ou aftas (sugerem vírus)","contato recente com caso de faringite estreptocócica"],
 ant:["alergia a penicilina (e o tipo de reação)","febre reumática prévia","uso de antibiótico no último mês"],
 ex:["exsudato ou aumento das amígdalas","linfonodos cervicais anteriores aumentados e dolorosos","petéquias no palato","exantema escarlatiniforme"],
 alarme:["trismo, voz abafada ou desvio da úvula (abscesso periamigdaliano)","sialorreia, estridor ou desconforto respiratório","edema ou rigidez cervical (abscesso profundo do pescoço)","incapacidade de engolir líquidos","toxemia ou instabilidade hemodinâmica"],
 fontes:["Shulman ST et al. IDSA Clinical Practice Guideline for Group A Streptococcal Pharyngitis (Clin Infect Dis 2012;55:e86).","McIsaac WJ et al. A clinical score to reduce unnecessary antibiotic use in patients with sore throat (CMAJ 1998;158:75).","NICE NG84. Sore throat (acute): antimicrobial prescribing, 2018 (internar se infecção sistêmica grave ou complicação supurativa)."]
};
const CHECK={
amigdalite:CHK_FARINGE,
faringite:CHK_FARINGE,
gripe:{
 hist:["febre, mesmo que referida","tosse","dor de garganta","cefaleia, mialgia ou artralgia","início dos sintomas há menos de 48 h","contato com caso confirmado ou surto"],
 ant:["gestação ou puerpério (até 2 semanas após o parto)","idade ≥ 60 anos","doença crônica (pulmonar, inclusive asma; cardíaca; renal; hepática; neurológica; diabetes)","obesidade (IMC ≥ 40)","imunossupressão","vacina contra influenza neste ano"],
 ex:["taquipneia","saturação de O2 < 95% em ar ambiente","crepitações ou sibilos","hipotensão ou má perfusão"],
 alarme:["dispneia ou desconforto respiratório","dor ou pressão persistente no tórax","cianose de lábios ou face","piora de doença de base","confusão mental ou sonolência"],
 fontes:["Ministério da Saúde. Guia de manejo e tratamento de influenza 2023 (síndrome gripal, SRAG e condições de risco para complicação)."]
},
sinusite:{
 hist:["sintomas há 10 dias ou mais, sem melhora","piora depois de melhora inicial (dupla piora)","febre ≥ 39 °C com secreção purulenta há 3 a 4 dias","secreção nasal purulenta","dor ou pressão facial","obstrução nasal"],
 ant:["uso de antibiótico no último mês","alergia a penicilina","imunossupressão","sinusites de repetição"],
 ex:["dor à palpação dos seios da face","secreção purulenta na rinoscopia","edema ou eritema periorbitário","alteração da movimentação ocular"],
 alarme:["edema, eritema ou dor periorbitária","proptose, diplopia ou alteração visual","cefaleia intensa","confusão mental ou sinais meníngeos","paralisia de nervo craniano"],
 fontes:["Chow AW et al. IDSA Clinical Practice Guideline for Acute Bacterial Rhinosinusitis in Children and Adults (Clin Infect Dis 2012;54:e72).","Rosenfeld RM et al. AAO-HNS Clinical Practice Guideline (Update): Adult Sinusitis (Otolaryngol Head Neck Surg 2015;152:S1)."]
},
oma:{
 hist:["otalgia","febre","hipoacusia ou plenitude auricular","otorreia","infecção de vias aéreas recente"],
 ant:["otites de repetição","cirurgia otológica ou tubo de ventilação","alergia a penicilina"],
 ex:["abaulamento da membrana timpânica","hiperemia intensa da membrana timpânica","otorreia ou perfuração","dor à tração do pavilhão (sugere otite externa)"],
 alarme:["edema, dor ou eritema retroauricular, com pavilhão deslocado (mastoidite)","paralisia facial","vertigem intensa","cefaleia intensa, rigidez de nuca ou confusão"],
 fontes:["Harmes KM et al. Otitis media: diagnosis and treatment (Am Fam Physician 2013;88:435).","Lieberthal AS et al. AAP: The Diagnosis and Management of Acute Otitis Media (Pediatrics 2013;131:e964) — critérios diagnósticos extrapolados para adultos."]
},
itu:{
 hist:["disúria","polaciúria ou urgência","hematúria","dor suprapúbica","corrimento ou irritação vaginal (reduz a chance de ITU)","febre ou calafrios","dor lombar"],
 ant:["gestação (ou possibilidade)","sexo masculino","ITU de repetição","uso de antibiótico nos últimos 3 meses","diabetes ou imunossupressão","sonda vesical ou alteração do trato urinário"],
 ex:["febre","punho-percussão lombar dolorosa (Giordano)","dor à palpação suprapúbica"],
 alarme:["febre com dor lombar (pielonefrite)","vômitos que impedem medicação oral","hipotensão, taquicardia ou confusão (sepse)","gestante com sintomas urinários"],
 fontes:["Gupta K et al. IDSA/ESCMID Guidelines: Acute Uncomplicated Cystitis and Pyelonephritis in Women (Clin Infect Dis 2011;52:e103).","Bent S et al. Does this woman have an acute uncomplicated urinary tract infection? (JAMA 2002;287:2701)."]
},
lombalgia:{
 hist:["irradiação para a perna abaixo do joelho","parestesia ou fraqueza nas pernas","trauma recente","dor sem melhora após 1 mês de tratamento","febre","perda de peso sem explicação"],
 ant:["câncer (atual ou prévio)","uso de drogas injetáveis ou imunossupressão","osteoporose ou uso prolongado de corticoide","idade > 50 anos com dor nova"],
 ex:["Lasègue positivo (elevação da perna estendida)","déficit de força em membros inferiores","alteração de reflexos ou de sensibilidade"],
 alarme:["retenção ou incontinência urinária ou fecal","anestesia em sela","déficit neurológico progressivo ou grave","febre com dor lombar (infecção)","história de câncer com dor nova"],
 fontes:["Chou R et al. Diagnosis and treatment of low back pain: ACP/APS guideline (Ann Intern Med 2007;147:478). https://doi.org/10.7326/0003-4819-147-7-200710020-00006","NICE NG59. Low back pain and sciatica in over 16s: assessment and management, 2016 (atualizada 2020)."]
},
cefaleia:{
 hist:["início súbito, máximo em menos de 1 minuto","pior dor de cabeça da vida","mudança do padrão habitual ou dor nova após os 50 anos","piora progressiva","dor que piora ao deitar, tossir ou fazer esforço","febre"],
 ant:["câncer","imunossupressão ou HIV","gestação ou puerpério","trauma de crânio recente","uso de analgésico em 10 dias ou mais por mês"],
 ex:["rigidez de nuca","déficit neurológico focal","alteração do nível de consciência","papiledema"],
 alarme:["cefaleia em trovoada (início súbito)","febre com rigidez de nuca","déficit neurológico ou confusão","olho vermelho e doloroso com alteração visual","cefaleia após trauma"],
 fontes:["Do TP et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list (Neurology 2019;92:134)."]
},
enxaqueca:{
 hist:["dor unilateral","dor pulsátil","piora com atividade física","náuseas ou vômitos","fotofobia e fonofobia","aura (visual, sensitiva ou de fala)"],
 ant:["crises semelhantes antes","uso de analgésico em 10 dias ou mais por mês","doença coronariana, AVC ou HAS não controlada (contraindicam triptano)","gestação"],
 ex:["déficit neurológico focal","rigidez de nuca","febre"],
 alarme:["dor diferente das crises habituais","aura que dura mais de 1 hora ou com fraqueza","início súbito ou pior dor da vida","febre, rigidez de nuca ou confusão"],
 fontes:["Headache Classification Committee of the IHS. ICHD-3 (Cephalalgia 2018;38:1) — critérios de migrânea.","Do TP et al. SNNOOP10 (Neurology 2019;92:134).","Ailani J et al. AHS Consensus Statement 2021 (triptanos e contraindicações)."]
},
vertigem:{
 hist:["vertigem só ao mudar a posição da cabeça, durando segundos (VPPB)","vertigem contínua há horas ou dias","hipoacusia ou zumbido","náuseas ou vômitos","cefaleia ou dor cervical nova"],
 ant:["hipertensão, diabetes ou tabagismo","AVC prévio","episódios semelhantes antes"],
 ex:["Dix-Hallpike positivo","nistagmo espontâneo (horizontal, unidirecional)","nistagmo vertical ou que muda de direção","skew (desvio vertical) no teste de cobertura","ataxia de marcha"],
 alarme:["incapacidade de ficar em pé ou andar","diplopia, disartria, disfagia ou fraqueza","nistagmo vertical ou que muda de direção","cefaleia súbita ou dor cervical"],
 fontes:["Newman-Toker DE, Edlow JA. TiTrATE: a novel, evidence-based approach to diagnosing acute dizziness and vertigo (Neurol Clin 2015;33:577). https://doi.org/10.1016/j.ncl.2015.04.011","Kattah JC et al. HINTS to diagnose stroke in the acute vestibular syndrome (Stroke 2009;40:3504).","Bhattacharyya N et al. AAO-HNS Clinical Practice Guideline: BPPV (Update) (Otolaryngol Head Neck Surg 2017;156:S1)."]
},
geca:{
 hist:["sangue ou pus nas fezes","febre","diarreia há mais de 7 dias","vômitos","diurese diminuída","dor abdominal intensa"],
 ant:["uso de antibiótico ou internação recente (C. difficile)","viagem recente","imunossupressão","idade ≥ 65 anos ou comorbidade grave","casos semelhantes na família ou após a mesma refeição"],
 ex:["mucosas secas","taquicardia ou hipotensão postural","abdome com defesa ou descompressão dolorosa"],
 alarme:["sinais de desidratação grave ou choque","sangue nas fezes com febre","dor abdominal intensa","confusão ou sonolência","incapacidade de ingerir líquidos"],
 fontes:["Shane AL et al. IDSA Clinical Practice Guidelines for Infectious Diarrhea (Clin Infect Dis 2017;65:e45).","Riddle MS et al. ACG Clinical Guideline: acute diarrheal infections in adults (Am J Gastroenterol 2016;111:602)."]
},
dispepsia:{
 hist:["queimação retroesternal ou regurgitação","dor relacionada a esforço, com dispneia ou sudorese (pensar em isquemia)","disfagia ou odinofagia","vômitos persistentes","perda de peso sem explicação","fezes escuras (melena)"],
 ant:["idade ≥ 60 anos","uso de anti-inflamatório ou AAS","câncer gastrointestinal na família","anemia"],
 ex:["palidez","massa abdominal palpável","linfonodomegalia (supraclavicular)","dor com defesa ou descompressão dolorosa"],
 alarme:["hematêmese ou melena","disfagia progressiva","perda de peso","dor epigástrica com características de isquemia"],
 fontes:["Moayyedi PM et al. ACG and CAG Clinical Guideline: Management of Dyspepsia (Am J Gastroenterol 2017;112:988).","Gulati M et al. 2021 AHA/ACC Guideline for the Evaluation and Diagnosis of Chest Pain (Circulation 2021;144:e368) — dor epigástrica como apresentação de isquemia. https://doi.org/10.1161/CIR.0000000000001029"]
},
colica:{
 hist:["dor lombar em cólica irradiada para a virilha","hematúria","febre ou calafrios","diurese muito diminuída","dor no hipocôndrio direito após refeição","icterícia, colúria ou acolia"],
 ant:["cálculo renal prévio","rim único ou transplante","gestação","litíase biliar conhecida"],
 ex:["punho-percussão lombar dolorosa","sinal de Murphy","febre","icterícia"],
 alarme:["febre com cólica renal (obstrução infectada)","anúria ou rim único obstruído","dor refratária à analgesia","febre com icterícia (colangite)","Murphy positivo com febre (colecistite)"],
 fontes:["EAU Guidelines on Urolithiasis, 2024 (descompressão urgente se obstrução com infecção).","Yokoe M et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis (J Hepatobiliary Pancreat Sci 2018;25:41)."]
},
"dor-abdominal":{
 hist:["local da dor e se migrou","início súbito","vômitos","parada de eliminação de gases e fezes","febre","sangramento ou atraso menstrual"],
 ant:["cirurgia abdominal prévia","idade ≥ 65 anos","possibilidade de gestação","doença vascular ou aneurisma de aorta","uso de anti-inflamatório ou anticoagulante"],
 ex:["defesa ou descompressão dolorosa","distensão abdominal","massa pulsátil","dor desproporcional ao exame (isquemia mesentérica)"],
 alarme:["sinais de peritonite","hipotensão ou taquicardia","dor súbita intensa em idoso ou vasculopata","gestação possível com dor e sangramento (ectópica)"],
 fontes:["Cartwright SL, Knudson MP. Evaluation of acute abdominal pain in adults (Am Fam Physician 2008;77:971)."]
},
has:{
 hist:["dor torácica","dispneia","déficit neurológico ou alteração da fala","confusão mental","alteração visual","cefaleia intensa"],
 ant:["uso irregular ou suspensão dos anti-hipertensivos","uso de cocaína, anfetamina, descongestionante ou anti-inflamatório","gestação acima de 20 semanas ou puerpério","doença renal crônica"],
 ex:["diferença de PA entre os braços","crepitações pulmonares ou B3","déficit neurológico focal","alteração no fundo de olho"],
 alarme:["sinais de lesão aguda de órgão-alvo (emergência hipertensiva)","dor torácica com diferença de pulsos (dissecção de aorta)","gestante com PA ≥ 160 x 110 mmHg"],
 fontes:["SBC. Diretriz Brasileira de Hipertensão Arterial 2025 (Arq Bras Cardiol).","Posicionamento Luso-Brasileiro de Emergências Hipertensivas, 2020 (Arq Bras Cardiol)."]
},
sca:{
 hist:["dor em aperto ou peso","irradiação para braço, mandíbula ou dorso","dor aos esforços","sudorese, náuseas ou dispneia","dor súbita e lancinante com irradiação para o dorso","uso de cocaína"],
 ant:["doença coronariana prévia","diabetes","hipertensão, dislipidemia ou tabagismo","história familiar de doença coronariana precoce"],
 ex:["diferença de pulsos ou de PA entre os braços","sopro novo","crepitações ou B3","sinais de TVP"],
 alarme:["ECG com supradesnível de ST","instabilidade hemodinâmica","dor persistente apesar do tratamento","déficit de pulso ou neurológico com dor torácica (dissecção)"],
 fontes:["Gulati M et al. 2021 AHA/ACC Guideline for the Evaluation and Diagnosis of Chest Pain (Circulation 2021;144:e368) — ECG em até 10 minutos. https://doi.org/10.1161/CIR.0000000000001029","SBC. Diretriz Brasileira de Avaliação e Diagnóstico da Dor Torácica na Emergência, 2025 (Arq Bras Cardiol 122(9))."]
},
asma:{
 hist:["fala só palavras ou frases curtas","sonolência ou confusão","uso de salbutamol mais que o habitual","febre ou sintomas de infecção respiratória"],
 ant:["intubação ou UTI por asma","internação ou emergência por asma no último ano","uso atual ou recente de corticoide oral","não usa corticoide inalatório","uso de mais de 1 frasco de salbutamol por mês","alergia alimentar"],
 ex:["uso de musculatura acessória","FR > 30 irpm","FC > 120 bpm","saturação de O2 < 90%","pico de fluxo ≤ 50% do previsto","tórax silencioso"],
 alarme:["sonolência, confusão ou tórax silencioso","saturação de O2 < 90% apesar do tratamento","sem melhora após broncodilatador","exaustão"],
 fontes:["Global Initiative for Asthma (GINA) 2024 — Global Strategy for Asthma Management and Prevention (gravidade da crise e fatores de risco para morte por asma). https://ginasthma.org"]
},
pac:{
 hist:["tosse","expectoração purulenta","dispneia","dor torácica pleurítica","febre","confusão mental"],
 ant:["idade ≥ 65 anos","DPOC, insuficiência cardíaca, doença renal ou hepática","internação com antibiótico EV nos últimos 90 dias","imunossupressão","uso de antibiótico nos últimos 3 meses"],
 ex:["FR ≥ 30 irpm","hipoxemia","PA sistólica < 90 mmHg ou diastólica ≤ 60 mmHg","crepitações ou sopro tubário","confusão"],
 alarme:["FR ≥ 30 irpm ou hipoxemia","hipotensão","confusão mental","acometimento multilobar"],
 fontes:["Metlay JP et al. ATS/IDSA: Diagnosis and Treatment of Adults with Community-acquired Pneumonia (Am J Respir Crit Care Med 2019;200:e45).","Corrêa RA et al. Recomendações da SBPT para PAC em adultos imunocompetentes, 2018 (J Bras Pneumol 2018;44:405)."]
},
dengue:{
 hist:["dia de início da febre","dor abdominal intensa e contínua","vômitos persistentes","sangramento de mucosa","tontura ao levantar ou desmaio","diurese diminuída"],
 ant:["gestação","idade ≥ 65 anos","hipertensão, diabetes, doença renal, hepática ou cardíaca","uso de anticoagulante ou antiagregante"],
 ex:["prova do laço positiva","hipotensão postural","hepatomegalia > 2 cm do rebordo","sinais de derrame (ascite, derrame pleural)","extremidades frias ou pulso fino"],
 alarme:["dor abdominal intensa e contínua","vômitos persistentes","acúmulo de líquidos (ascite, derrame pleural ou pericárdico)","hipotensão postural ou lipotimia","hepatomegalia > 2 cm","sangramento de mucosa","letargia ou irritabilidade","aumento progressivo do hematócrito"],
 fontes:["Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (sinais de alarme, condições especiais e sinais de choque)."]
},
ansiedade:{
 hist:["palpitação, dispneia ou dor torácica","parestesias ou tremor","medo de morrer ou de perder o controle","primeira crise na vida","ideação suicida (perguntar diretamente)"],
 ant:["crises semelhantes antes","uso de estimulantes, cocaína ou excesso de cafeína","suspensão recente de álcool ou benzodiazepínico","hipertireoidismo, arritmia ou asma","gestação"],
 ex:["taquicardia persistente ou ritmo irregular","sibilos","tremor fino ou bócio"],
 alarme:["dor torácica com fator de risco coronariano","hipoxemia ou alteração no ECG","ideação suicida com plano","confusão mental"],
 fontes:["Katon WJ. Clinical practice: panic disorder (N Engl J Med 2006;354:2360) — diagnóstico diferencial clínico. https://doi.org/10.1056/NEJMcp052466","The Joint Commission. Sentinel Event Alert 56: Detecting and treating suicide ideation in all settings, 2016."]
}
};
if (typeof module!=="undefined") module.exports={CHECK};

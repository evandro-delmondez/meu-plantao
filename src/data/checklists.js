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
},
cervicite:{
 hist:["corrimento uretral ou cervical mucopurulento","disúria","sangramento após relação sexual ou entre as menstruações","dor pélvica ou dispareunia","dor ou edema testicular (epididimite)"],
 ant:["parceria sexual com sintomas ou com IST","parceria nova ou múltiplas parcerias","relação sem preservativo","gestação (ou possibilidade)","IST prévia","testagem recente para HIV, sífilis e hepatites B e C"],
 ex:["secreção mucopurulenta no orifício cervical ou uretral","colo friável ou que sangra ao toque","dor à mobilização do colo ou à palpação dos anexos (DIP)","úlcera genital ou verrugas anogenitais","linfonodomegalia inguinal"],
 alarme:["dor pélvica com febre (doença inflamatória pélvica)","dor e edema testicular (epididimite)","artrite, tenossinovite ou lesões de pele (infecção gonocócica disseminada)","gestação"],
 fontes:["Ministério da Saúde. PCDT para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST), 2022 (versão vigente, atualizada em 2024) — cervicite, uretrite, parcerias e testagem.","Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — infecção gonocócica disseminada e epididimite."]
},
dip:{
 hist:["dor no baixo ventre ou pélvica","dispareunia","corrimento vaginal ou cervical","sangramento irregular ou após relação sexual","febre","náuseas ou vômitos","atraso menstrual"],
 ant:["gestação (ou possibilidade; beta-hCG)","inserção de DIU nas últimas semanas","parceria com sintomas uretrais ou com IST","parceria nova ou múltiplas parcerias","IST ou DIP prévia","testagem recente para HIV, sífilis e hepatites B e C"],
 ex:["dor à mobilização do colo uterino","dor à palpação dos anexos","secreção mucopurulenta cervical","massa anexial palpável","febre","defesa ou descompressão dolorosa"],
 alarme:["gestação (internar; afastar gravidez ectópica)","hipotensão ou taquicardia","massa anexial (abscesso tubo-ovariano)","sinais de peritonite ou dúvida com emergência cirúrgica","vômitos que impedem a medicação oral","sem melhora após 72 h de tratamento"],
 fontes:["Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022 (versão vigente) — critérios diagnósticos e de internação da DIP.","Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — DIP: teste de gravidez e critérios de hospitalização."]
},
dismenorreia:{
 hist:["dor em cólica no baixo ventre com a menstruação","início da dor nos primeiros anos após a menarca","náuseas, vômitos ou diarreia no período menstrual","dor fora do período menstrual","dor progressiva a cada ciclo","dispareunia","sangramento menstrual intenso ou irregular"],
 ant:["atraso menstrual (ou possibilidade de gestação)","DIU de cobre","endometriose ou infertilidade","IST ou DIP prévia","úlcera péptica, doença renal ou asma com piora por AINE","uso de anticoncepcional hormonal"],
 ex:["dor à mobilização do colo ou à palpação dos anexos","útero aumentado ou massa pélvica","corrimento cervical purulento","febre"],
 alarme:["dor sem resposta a AINE (pensar em dismenorreia secundária)","dor com atraso menstrual ou sangramento anormal (gestação ectópica)","febre com dor pélvica (DIP)","dor abdominal súbita e intensa"],
 fontes:["Burnett M, Lemyre M. SOGC Guideline No. 345: Primary Dysmenorrhea Consensus (J Obstet Gynaecol Can 2017;39:585) — sinais de dismenorreia secundária e contraindicações a AINE.","ACOG Committee Opinion No. 760: Dysmenorrhea and Endometriosis in the Adolescent (Obstet Gynecol 2018;132:e249).","Cartwright SL, Knudson MP. Evaluation of acute abdominal pain in adults (Am Fam Physician 2008;77:971) — gravidez ectópica na mulher em idade fértil com dor abdominal."]
},
hpb:{
 hist:["jato urinário fraco ou intermitente","esforço para urinar ou esvaziamento incompleto","noctúria","urgência ou polaciúria","hematúria","incapacidade de urinar"],
 ant:["uso de anticolinérgico, anti-histamínico, descongestionante ou opioide","doença neurológica (Parkinson, AVC, lesão medular, neuropatia diabética)","cirurgia, trauma ou IST uretral (estenose)","cirurgia de catarata programada (tansulosina: síndrome da íris flácida)","câncer de próstata ou de bexiga"],
 ex:["globo vesical palpável","próstata aumentada ao toque retal","nódulo ou endurecimento prostático","próstata dolorosa ao toque (prostatite)"],
 alarme:["retenção urinária aguda","hematúria macroscópica","febre com dor perineal ou disúria (prostatite)","nódulo prostático endurecido"],
 fontes:["Lerner LB et al. Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia: AUA Guideline Part I (J Urol 2021;206:806) — avaliação inicial, toque retal, hematúria, retenção e síndrome da íris flácida."]
},
prostatite:{
 hist:["febre ou calafrios","disúria","polaciúria ou urgência","dor perineal, suprapúbica ou retal","dificuldade para urinar","mal-estar ou mialgia"],
 ant:["manipulação urológica recente (biópsia de próstata, sondagem ou cistoscopia)","sonda vesical","hiperplasia prostática","relação sexual sem preservativo (gonococo e clamídia)","diabetes ou imunossupressão","uso recente de antibiótico"],
 ex:["próstata dolorosa, aumentada e quente ao toque retal (suave)","globo vesical","dor ou edema testicular (epididimite)","taquicardia ou hipotensão"],
 alarme:["sinais de sepse","retenção urinária","febre persistente apesar do antibiótico (abscesso prostático)","vômitos que impedem a medicação oral"],
 fontes:["EAU Guidelines on Urological Infections, 2024 — prostatite bacteriana aguda (evitar massagem prostática; abscesso).","Coker TJ, Dierfeldt DM. Acute Bacterial Prostatitis: Diagnosis and Management (Am Fam Physician 2016;93:114)."]
},
sua:{
 hist:["sangramento que encharca um absorvente por hora ou mais","coágulos grandes","atraso menstrual","dor pélvica","tontura, síncope ou dispneia","sangramento após relação sexual"],
 ant:["gestação (ou possibilidade; beta-hCG)","uso de anticoagulante ou antiagregante","sangramento excessivo desde a menarca, após extração dentária, cirurgia ou parto (coagulopatia)","coagulopatia na família","uso de hormônio ou DIU","mioma ou pólipo conhecido"],
 ex:["palidez","taquicardia ou hipotensão","sangramento ativo ao exame especular","lesão no colo ou na vagina","útero aumentado ou massa pélvica","equimoses ou petéquias"],
 alarme:["instabilidade hemodinâmica","sangramento com beta-hCG positivo (abortamento ou gravidez ectópica)","síncope","sangramento persistente apesar do tratamento"],
 fontes:["ACOG Committee Opinion No. 557: Management of Acute Abnormal Uterine Bleeding in Nonpregnant Reproductive-Aged Women (Obstet Gynecol 2013;121:891) — excluir gestação, avaliar estabilidade e rastrear coagulopatia.","Munro MG et al. The two FIGO systems for normal and abnormal uterine bleeding symptoms and classification of causes (PALM-COEIN): 2018 revisions (Int J Gynaecol Obstet 2018;143:393)."]
},
sifilis:{
 hist:["úlcera genital, anal ou oral indolor","manchas no corpo, nas palmas ou nas plantas","lesões em mucosas ou queda de cabelo","alteração visual ou auditiva","cefaleia, confusão ou déficit neurológico","exposição sexual sem preservativo"],
 ant:["gestação (ou possibilidade)","tratamento prévio de sífilis e VDRL anterior","alergia a penicilina (e o tipo de reação)","infecção pelo HIV","parceria com sífilis","testagem recente para HIV e hepatites B e C"],
 ex:["úlcera única, indolor, de base endurecida (cancro duro)","linfonodomegalia inguinal ou generalizada","exantema em palmas e plantas","condiloma plano","alopecia em clareira","déficit neurológico ou alteração pupilar"],
 alarme:["alteração visual ou auditiva (sífilis ocular ou otossífilis)","cefaleia, rigidez de nuca, confusão ou déficit neurológico (neurossífilis)","gestante (só penicilina é tratamento adequado)","gestante com alergia grave a penicilina (dessensibilização)"],
 fontes:["Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022 (versão vigente, com algoritmo de sífilis adquirida e em gestantes atualizado em 2024).","Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — neurossífilis, sífilis ocular e otossífilis."]
},
vaginose:{
 hist:["corrimento branco-acinzentado, fluido e homogêneo","odor fétido, pior após relação sexual ou menstruação","prurido ou ardência (sugere outro diagnóstico)","dor pélvica ou febre","disúria"],
 ant:["gestação (ou possibilidade)","episódios de repetição","duchas vaginais","parceria nova ou múltiplas parcerias","consumo de álcool (interação com metronidazol)","testagem recente para HIV, sífilis e hepatites B e C"],
 ex:["corrimento homogêneo aderido às paredes vaginais","teste das aminas positivo (odor com KOH 10%)","pH vaginal > 4,5","colo com secreção mucopurulenta ou friável (cervicite associada)","dor à mobilização do colo (DIP)"],
 alarme:["gestante sintomática","dor pélvica com febre (DIP)","sinais de cervicite (pesquisar gonococo e clamídia)"],
 fontes:["Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022 (versão vigente) — corrimento vaginal, critérios de Amsel e vaginose na gestação.","Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — vaginose bacteriana."]
},
candidiase:{
 hist:["prurido vulvar","corrimento branco grumoso, sem odor","ardência ou disúria externa","dispareunia","4 ou mais episódios no último ano","odor fétido (sugere vaginose)"],
 ant:["gestação","diabetes","uso recente de antibiótico ou corticoide","imunossupressão ou HIV","anticoncepcional oral em dose alta"],
 ex:["eritema e edema vulvar","fissuras ou escoriações vulvares","corrimento grumoso aderido às paredes vaginais","pH vaginal < 4,5","úlceras ou vesículas genitais (outra IST)"],
 alarme:["gestante (somente tratamento vaginal)","candidíase recorrente (investigar diabetes e HIV)","sintomas que persistem após o tratamento"],
 fontes:["Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022 (versão vigente) — candidíase vulvovaginal, fatores predisponentes, recorrência e gestação.","Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — candidíase vulvovaginal complicada e recorrente."]
},
"pre-eclampsia":{
 hist:["cefaleia","escotomas, fotofobia ou turvação visual","dor epigástrica ou no hipocôndrio direito","náuseas ou vômitos","dispneia","diurese diminuída","convulsão"],
 ant:["gestação acima de 20 semanas ou puerpério","hipertensão crônica","pré-eclâmpsia em gestação anterior","doença renal, lúpus ou síndrome antifosfolípide","diabetes","gestação gemelar"],
 ex:["PA ≥ 160 x 110 mmHg","hiper-reflexia","crepitações pulmonares","proteinúria na fita","alteração do nível de consciência"],
 alarme:["convulsão (eclâmpsia)","PA ≥ 160 x 110 mmHg persistente","cefaleia, escotomas ou dor epigástrica (iminência de eclâmpsia)","dispneia ou edema pulmonar","dor abdominal com sangramento vaginal (descolamento de placenta)","rebaixamento de consciência ou déficit neurológico"],
 fontes:["Rede Brasileira de Estudos sobre Hipertensão na Gravidez (RBEHG). Protocolo 03 – Pré-eclâmpsia, 2023 — sinais de gravidade e iminência de eclâmpsia.","Peraçoli JC et al. Pre-eclampsia/Eclampsia (FEBRASGO) (Rev Bras Ginecol Obstet 2019;41:318).","ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia (Obstet Gynecol 2020;135:e237) — critérios de gravidade, fatores de risco e descolamento de placenta."]
},
salvas:{
 hist:["dor orbitária ou temporal unilateral muito intensa","crises de 15 a 180 minutos","lacrimejamento ou olho vermelho do mesmo lado","congestão nasal ou coriza do mesmo lado","queda da pálpebra ou pupila menor do mesmo lado","inquietação ou agitação durante a crise","crises diárias agrupadas em períodos"],
 ant:["crises semelhantes antes","doença coronariana, AVC ou HAS não controlada (contraindicam triptano)","uso de ergotamina nas últimas 24 h","bradicardia ou bloqueio atrioventricular (verapamil)","consumo de álcool"],
 ex:["ptose e miose (síndrome de Horner)","déficit neurológico focal","rigidez de nuca","papiledema"],
 alarme:["início súbito ou pior dor da vida","dor diferente das crises habituais","febre, rigidez de nuca ou confusão","déficit neurológico","primeira crise após os 50 anos"],
 fontes:["Headache Classification Committee of the IHS. ICHD-3 (Cephalalgia 2018;38:1) — critérios da cefaleia em salvas.","Robbins MS et al. Treatment of Cluster Headache: AHS Evidence-Based Guidelines (Headache 2016;56:1093).","Do TP et al. Red and orange flags for secondary headaches: SNNOOP10 list (Neurology 2019;92:134).","Ailani J et al. AHS Consensus Statement 2021 (triptanos e contraindicações)."]
},
gota:{
 hist:["dor e edema articular de início rápido (máximo em 24 h)","acometimento da base do hálux","crises semelhantes antes","febre ou calafrios","consumo de álcool"],
 ant:["doença renal crônica","uso de diurético tiazídico ou de alça","úlcera péptica, sangramento digestivo ou doença cardiovascular (AINE)","uso de claritromicina, ciclosporina ou tacrolimo (colchicina)","diabetes (corticoide)","uso de alopurinol"],
 ex:["articulação com eritema, calor e edema","tofos","mais de uma articulação acometida","febre"],
 alarme:["febre com articulação quente e dolorosa (artrite séptica)","primeira crise sem diagnóstico confirmado (considerar punção articular)","piora da função renal"],
 fontes:["FitzGerald JD et al. 2020 American College of Rheumatology Guideline for the Management of Gout (Arthritis Care Res 2020;72:744).","Richette P et al. 2018 updated EULAR evidence-based recommendations for the diagnosis of gout (Ann Rheum Dis 2020;79:31) — punção articular e artrite séptica.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 384 — Gout and Other Crystal-Associated Arthropathies (interações da colchicina, doença renal)."]
},
"gota-manut":{
 hist:["2 ou mais crises no último ano","tofos","crise ainda em atividade","erupção cutânea em uso de alopurinol","uso irregular do alopurinol"],
 ant:["doença renal crônica (iniciar com dose menor)","ascendência do Sudeste Asiático ou negra (HLA-B*5801)","reação cutânea prévia ao alopurinol","uso de diurético tiazídico ou de alça","cálculo renal de ácido úrico","consumo de álcool"],
 ex:["tofos","artrite em atividade","lesões de pele ou de mucosas"],
 alarme:["erupção cutânea, lesões de mucosa ou febre em uso de alopurinol (reação grave)","crises frequentes apesar da profilaxia","piora da função renal"],
 fontes:["FitzGerald JD et al. 2020 American College of Rheumatology Guideline for the Management of Gout (Arthritis Care Res 2020;72:744) — indicações de hipouricemiante, dose inicial em DRC, HLA-B*5801 e profilaxia.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 384 — Gout and Other Crystal-Associated Arthropathies (reações cutâneas graves ao alopurinol)."]
},
entorse:{
 hist:["entorse em inversão do pé","incapacidade de apoiar o pé logo após o trauma","edema ou equimose","sensação de instabilidade ou falseio"],
 ant:["entorse prévia no mesmo tornozelo"],
 ex:["dor à palpação da borda posterior ou da ponta do maléolo lateral (6 cm distais)","dor à palpação da borda posterior ou da ponta do maléolo medial (6 cm distais)","dor à palpação da base do 5º metatarso","dor à palpação do navicular","incapacidade de dar 4 passos na emergência"],
 alarme:["regra de Ottawa positiva (indicar radiografia)","incapacidade de dar 4 passos","dor e instabilidade que persistem após 3 a 5 dias (reavaliar ligamentos)"],
 fontes:["Stiell IG et al. Decision rules for the use of radiography in acute ankle injuries: refinement and prospective validation (JAMA 1993;269:1127).","Bachmann LM et al. Accuracy of Ottawa ankle rules to exclude fractures of the ankle and mid-foot: systematic review (BMJ 2003;326:417).","Vuurberg G et al. Diagnosis, treatment and prevention of ankle sprains: update of an evidence-based clinical guideline (Br J Sports Med 2018;52:956) — reexame tardio e entorse prévia."]
},
insonia:{
 hist:["dificuldade para iniciar o sono","despertares noturnos ou despertar precoce","insônia há mais de 3 meses","cansaço, sonolência ou prejuízo durante o dia","ronco alto ou pausas respiratórias no sono","desconforto nas pernas ao deitar, aliviado ao movimentar","humor deprimido ou ansiedade"],
 ant:["consumo de cafeína, álcool ou outras drogas","uso de antidepressivo, corticoide, estimulante ou teofilina","suspensão recente de álcool, benzodiazepínico ou opioide","depressão, ansiedade ou transtorno bipolar","dor crônica, doença cardiopulmonar, refluxo ou menopausa","trabalho em turnos ou horário irregular de sono"],
 ex:["humor deprimido ou ansioso ao exame psíquico","sinais de doença cardiopulmonar"],
 alarme:["ideação suicida (perguntar diretamente)","sono muito reduzido sem cansaço, com euforia ou agitação (mania)","pausas respiratórias com sonolência diurna intensa","sinais de abstinência de álcool ou sedativos"],
 fontes:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 33 — Sleep Disorders (avaliação da insônia: fatores psiquiátricos, medicamentos, drogas e doenças clínicas).","Schutte-Rodin S et al. Clinical guideline for the evaluation and management of chronic insomnia in adults (J Clin Sleep Med 2008;4:487).","Qaseem A et al. ACP Guideline: Management of Chronic Insomnia Disorder in Adults (Ann Intern Med 2016;165:125).","The Joint Commission. Sentinel Event Alert 56: Detecting and treating suicide ideation in all settings, 2016."]
},
agitacao:{
 hist:["início súbito","curso flutuante","confusão ou desorientação","alucinações visuais, táteis ou olfativas","febre","uso ou suspensão de álcool ou drogas","trauma de crânio recente"],
 ant:["transtorno psiquiátrico prévio","primeiro episódio após os 40 anos sem história psiquiátrica","diabetes (hipoglicemia)","epilepsia","uso de medicamentos psicotrópicos"],
 ex:["hipoglicemia na glicemia capilar","hipoxemia","febre ou rigidez de nuca","sinais de trauma craniano","déficit neurológico focal","sinais de intoxicação (pupilas, sudorese, taquicardia)"],
 alarme:["hipóxia, hipoglicemia, hipertermia ou hipovolemia","rebaixamento do nível de consciência","risco iminente de auto ou heteroagressão","depressão respiratória após sedação"],
 fontes:["Baldaçara L et al. Brazilian guidelines for the management of psychomotor agitation. Part 1. Non-pharmacological approach (Braz J Psychiatry 2019;41:153).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (Manole/HC-FMUSP, 2024), cap. 15 — Agitação psicomotora (causas orgânicas, os 4 Hs e segurança).","Nordstrom K et al. Medical evaluation and triage of the agitated patient: Project BETA (West J Emerg Med 2012;13:3)."]
},
abstinencia:{
 hist:["interrupção ou redução recente do álcool","tremor","sudorese","náuseas ou vômitos","ansiedade ou insônia","alucinações visuais, táteis ou auditivas","convulsão"],
 ant:["delirium tremens ou convulsão em abstinência prévia","internação prévia por abstinência","uso de benzodiazepínico ou outros sedativos","doença clínica associada (infecção, trauma, pancreatite)","hepatopatia grave","trauma de crânio recente"],
 ex:["tremor de mãos","sudorese","taquicardia ou hipertensão","desorientação","ataxia, confusão ou oftalmoplegia (encefalopatia de Wernicke)","febre"],
 alarme:["confusão, agitação, febre e taquicardia (delirium tremens)","convulsão","CIWA-Ar ≥ 19 (abstinência grave)","sinais de encefalopatia de Wernicke","hipoglicemia"],
 fontes:["Lindsay DL et al. Executive Summary of the ASAM Clinical Practice Guideline on Alcohol Withdrawal Management (J Addict Med 2020;14:376).","Sullivan JT et al. Assessment of alcohol withdrawal: the revised Clinical Institute Withdrawal Assessment for Alcohol scale (CIWA-Ar) (Br J Addict 1989;84:1353).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (Manole/HC-FMUSP, 2024), cap. 105 — Síndrome de abstinência alcoólica (fatores de risco, delirium tremens, Wernicke)."]
},
convulsao:{
 hist:["crise com duração maior que 5 minutos","crises repetidas sem recuperação da consciência entre elas","primeira crise na vida","febre ou cefaleia","trauma craniano recente","uso ou abstinência de álcool, benzodiazepínico ou outras drogas"],
 ant:["epilepsia conhecida","uso irregular ou suspensão de anticonvulsivante","diabetes em uso de insulina ou sulfonilureia","etilismo ou desnutrição","gestação ou puerpério (eclâmpsia)","AVC, tumor ou cirurgia intracraniana prévia"],
 ex:["hipoglicemia na glicemia capilar","rigidez de nuca","déficit neurológico focal","sinais de trauma craniano","febre"],
 alarme:["crise persistente ou recorrente sem recuperação (estado de mal epiléptico)","rebaixamento persistente da consciência após a crise","déficit focal novo","febre com rigidez de nuca","hipoxemia ou via aérea comprometida"],
 fontes:["Glauser T et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus — AES (Epilepsy Curr 2016;16:48).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 436 — Seizures and Epilepsy.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 288 — Hypertension (pré-eclâmpsia que evolui para eclâmpsia com convulsões).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 58 — Abordagem da primeira crise epiléptica."]
},
iot:{
 hist:["intubação difícil prévia","refeição recente, vômitos ou obstrução intestinal (risco de aspiração)","alergia a medicamentos","suspeita de trauma cervical"],
 ant:["hipercalemia, doença renal ou doença neuromuscular (contraindicam succinilcolina)","hipertermia maligna pessoal ou familiar","obesidade ou apneia do sono","cirurgia, radioterapia ou tumor de cabeça e pescoço"],
 ex:["aparência externa de via aérea difícil (trauma facial, barba, pescoço curto)","abertura de boca menor que 3 dedos","distância mento-hioide menor que 3 dedos","Mallampati 3 ou 4","obstrução de via aérea (sangue, edema, massa)","mobilidade cervical limitada","hipotensão antes da indução"],
 alarme:["dessaturação apesar da pré-oxigenação","hipotensão antes ou após a indução","falha de intubação com dificuldade de ventilar (não intubo, não oxigeno)","ausência de curva na capnografia após a intubação"],
 fontes:["Reed MJ et al. Can an airway assessment score predict difficulty at intubation in the emergency department? (Emerg Med J 2005;22:99) — avaliação LEMON.","Ahmad I et al. Difficult Airway Society 2025 guidelines for unanticipated difficult intubation in adults (Br J Anaesth 2026;136:283).","Acquisto NM et al. SCCM Clinical Practice Guidelines for Rapid Sequence Intubation in the Critically Ill Adult Patient (Crit Care Med 2023;51:1411).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 2 — Manejo da via aérea na emergência.","Bula da succinilcolina (contraindicações: hipercalemia, hipertermia maligna, doença neuromuscular)."]
},
"alergia-grave":{
 hist:["início súbito após exposição a possível alérgeno","prurido ou urticária","inchaço de lábios, pálpebras ou língua","falta de ar ou chiado","rouquidão ou dificuldade para engolir","dor abdominal ou vômitos","tontura ou desmaio"],
 ant:["anafilaxia prévia","asma","alergia conhecida (medicamento, alimento, picada de inseto)","uso de betabloqueador ou IECA"],
 ex:["urticária ou angioedema","sibilos","estridor","hipotensão ou taquicardia","saturação de O2 baixa"],
 alarme:["comprometimento respiratório (dispneia, sibilos, estridor)","hipotensão, síncope ou incontinência","edema de língua ou orofaringe","sintomas gastrointestinais intensos após exposição","acometimento de dois ou mais sistemas (anafilaxia)"],
 fontes:["Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020).","Shaker MS et al. Anaphylaxis — a 2020 practice parameter update (J Allergy Clin Immunol 2020)."]
},
anafilaxia:{
 hist:["agente suspeito (alimento, medicamento, picada de inseto, látex)","sintomas minutos a horas após a exposição","dispneia, chiado ou rouquidão","tontura, síncope ou incontinência","vômitos ou cólica abdominal","adrenalina aplicada antes da chegada"],
 ant:["anafilaxia prévia","asma, especialmente não controlada","doença cardiovascular","uso de betabloqueador ou IECA","mastocitose"],
 ex:["estridor ou edema de orofaringe","sibilos","hipotensão","urticária ou angioedema (podem faltar)","rebaixamento da consciência"],
 alarme:["hipotensão sem resposta à adrenalina IM (anafilaxia refratária)","estridor ou edema progressivo de via aérea","necessidade de mais de uma dose de adrenalina","retorno dos sintomas após melhora (reação bifásica)","hipoxemia"],
 fontes:["Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020).","Shaker MS et al. Anaphylaxis — a 2020 practice parameter update (J Allergy Clin Immunol 2020).","Golden DBK et al. Anaphylaxis: a 2023 practice parameter update (Ann Allergy Asthma Immunol 2024;132:124)."]
},
avc:{
 hist:["horário do último momento visto bem","início súbito do déficit","cefaleia súbita e intensa","convulsão no início dos sintomas","trauma craniano recente"],
 ant:["uso de anticoagulante (e horário da última dose)","AVC isquêmico ou TCE grave nos últimos 3 meses","cirurgia intracraniana ou raquimedular nos últimos 3 meses","hemorragia intracraniana prévia","sangramento ou neoplasia gastrointestinal nos últimos 21 dias","diabetes em uso de insulina ou sulfonilureia (hipoglicemia imita AVC)"],
 ex:["hipoglicemia na glicemia capilar","PA ≥ 185 x 110 mmHg","déficit motor, de fala ou de campo visual (NIHSS)","desvio conjugado do olhar","rebaixamento da consciência"],
 alarme:["hemorragia na TC de crânio","déficit grave sugestivo de oclusão de grande vaso (candidato a trombectomia)","piora progressiva do nível de consciência","PA ≥ 185 x 110 mmHg sem controle antes da trombólise","suspeita de dissecção de aorta ou endocardite (contraindicam trombólise)"],
 fontes:["AHA/ASA. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (Stroke). https://www.ahajournals.org/doi/10.1161/STR.0000000000000513","Powers WJ et al. 2019 Update to the 2018 Guidelines for the Early Management of Acute Ischemic Stroke (Stroke 2019;50:e344) — tabela de contraindicações à alteplase.","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 53 — Abordagem do paciente com AVC isquêmico."]
},
sepse:{
 hist:["foco infeccioso provável (pulmonar, urinário, abdominal, pele, sistema nervoso)","febre ou calafrios","confusão mental ou sonolência","diurese diminuída","dispneia"],
 ant:["imunossupressão, quimioterapia ou neutropenia","internação ou antibiótico recente","dispositivo invasivo (sonda, cateter, prótese)","colonização ou infecção prévia por germe multirresistente","idade avançada"],
 ex:["FR ≥ 22 irpm","PA sistólica ≤ 100 mmHg","alteração do nível de consciência","enchimento capilar lento ou pele moteada","hipoxemia","febre ou hipotermia"],
 alarme:["hipotensão persistente após volume (choque séptico)","lactato elevado","rebaixamento da consciência","oligúria","pele moteada ou extremidades frias"],
 fontes:["Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026. https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026","Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3) (JAMA 2016;315:801).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 9 — Sepse."]
},
pcr:{
 hist:["parada presenciada","RCP iniciada antes da chegada (tempo sem RCP)","horário da parada","sintomas antes da parada (dor torácica, dispneia, síncope)","ingestão de medicamentos ou drogas"],
 ant:["doença renal ou diálise","cardiopatia ou doença coronariana","TVP, imobilização ou cirurgia recente","trauma recente","diretiva antecipada de não reanimação"],
 ex:["ritmo inicial chocável (FV ou TV sem pulso)","capnografia baixa durante a RCP","via aérea difícil","murmúrio ausente de um lado ou desvio de traqueia (pneumotórax)","sinais de hipovolemia ou sangramento","hipotermia"],
 alarme:["hipóxia","hipovolemia","hipercalemia, hipocalemia ou acidose","tamponamento cardíaco","trombose coronária ou pulmonar","pneumotórax hipertensivo","intoxicação"],
 fontes:["AHA. 2025 Guidelines for CPR and ECC — Part 9: Adult Advanced Life Support (causas reversíveis, capnografia, ritmo). https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 4 — Suporte Avançado de Vida."]
},
bradicardia:{
 hist:["síncope ou pré-síncope","dor torácica","dispneia","confusão mental","tontura ou fadiga"],
 ant:["uso de betabloqueador, bloqueador de canal de cálcio, digoxina ou amiodarona","doença renal (hipercalemia)","doença coronariana ou infarto recente","hipotireoidismo","marcapasso"],
 ex:["hipotensão","má perfusão periférica","rebaixamento da consciência","sinais de congestão (crepitações, turgência jugular)","bloqueio AV de 2º grau Mobitz II ou total no ECG"],
 alarme:["hipotensão","alteração aguda da consciência","sinais de choque","dor torácica isquêmica","insuficiência cardíaca aguda"],
 fontes:["AHA 2025 Adult Bradycardia With a Pulse Algorithm. https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Bradycardia-250514.pdf","Kusumoto FM et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay (Circulation 2019;140:e382).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 33 — Bradicardias."]
},
taquicardia:{
 hist:["palpitação de início e término súbitos","dor torácica","dispneia","síncope ou pré-síncope","uso de estimulantes, cocaína ou descongestionante"],
 ant:["cardiopatia estrutural ou infarto prévio (sugere TV)","pré-excitação (Wolff-Parkinson-White)","episódios semelhantes antes","asma grave (cautela com adenosina)","uso de antiarrítmico ou de medicamento que prolonga o QT"],
 ex:["hipotensão","rebaixamento da consciência","sinais de choque","crepitações pulmonares","QRS largo no ECG"],
 alarme:["hipotensão","alteração aguda da consciência","sinais de choque","dor torácica isquêmica","insuficiência cardíaca aguda"],
 fontes:["AHA 2025 Adult Tachyarrhythmia With a Pulse Algorithm. https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Tachycardia-250514.pdf","Page RL et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia (Circulation 2016;133:e506).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 32 — Taquiarritmias."]
},
fa:{
 hist:["início há menos de 48 h ou horário desconhecido","palpitação","dispneia","dor torácica","síncope","consumo de álcool recente","febre ou infecção"],
 ant:["anticoagulante em uso e adesão","AVC ou AIT prévio","insuficiência cardíaca ou fração de ejeção reduzida","hipertensão, diabetes ou doença vascular","hipertireoidismo","pré-excitação (Wolff-Parkinson-White)","idade ≥ 65 anos"],
 ex:["hipotensão","crepitações ou sinais de congestão","déficit neurológico focal","tremor ou bócio"],
 alarme:["hipotensão ou choque","dor torácica isquêmica","edema agudo de pulmão","déficit neurológico (embolia)","QRS largo e muito irregular (FA pré-excitada)"],
 fontes:["Joglar JA et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation (Circulation 2024;149:e1).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 31 — Fibrilação atrial."]
},
eap:{
 hist:["dispneia progressiva ou ortopneia","dispneia paroxística noturna","ganho de peso ou edema","dor torácica","palpitação","febre ou infecção"],
 ant:["insuficiência cardíaca conhecida","má adesão aos medicamentos ou à restrição de sal e água","uso de anti-inflamatório","doença coronariana","doença renal crônica","fibrilação atrial"],
 ex:["crepitações pulmonares","turgência jugular","B3","edema de membros inferiores","hipotensão ou extremidades frias","saturação de O2 < 90%"],
 alarme:["hipotensão ou má perfusão (choque cardiogênico)","insuficiência respiratória apesar da VNI","síndrome coronariana aguda","arritmia","rebaixamento da consciência"],
 fontes:["McDonagh TA et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure (Eur Heart J 2021;42:3599).","McDonagh TA et al. 2023 Focused Update of the 2021 ESC Guidelines for heart failure (Eur Heart J 2023;44:3627).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 34 — Insuficiência cardíaca aguda."]
},
tep:{
 hist:["dispneia súbita","dor torácica pleurítica","hemoptise","síncope","dor ou inchaço em uma perna"],
 ant:["cirurgia ou imobilização nas últimas 4 semanas","TVP ou TEP prévio","câncer ativo","uso de estrogênio (anticoncepcional ou reposição hormonal)","gestação ou puerpério","idade ≥ 50 anos"],
 ex:["FC ≥ 100 bpm","saturação de O2 < 95%","edema ou dor no trajeto venoso de uma perna","hipotensão","turgência jugular"],
 alarme:["hipotensão ou choque (TEP de alto risco)","síncope","hipoxemia importante","disfunção de VD ou troponina elevada"],
 fontes:["Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism (Eur Heart J 2020;41:543).","Wells PS et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism (Thromb Haemost 2000;83:416).","Kline JA et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism — PERC (J Thromb Haemost 2004;2:1247)."]
},
tce:{
 hist:["perda de consciência","amnésia retrógrada ≥ 30 minutos","mecanismo perigoso (atropelamento, ejeção do veículo, queda > 1 m ou > 5 degraus)","vômitos (2 ou mais episódios)","cefaleia intensa ou progressiva","convulsão após o trauma"],
 ant:["uso de anticoagulante ou coagulopatia","idade ≥ 65 anos","retorno ao pronto-socorro pelo mesmo trauma"],
 ex:["Glasgow < 15 duas horas após o trauma","suspeita de fratura aberta ou com afundamento","sinais de fratura de base de crânio (hemotímpano, olhos de guaxinim, sinal de Battle, liquorreia)","déficit neurológico focal","dor ou sinais de trauma cervical"],
 alarme:["queda do Glasgow","anisocoria","déficit focal novo","convulsão","vômitos repetidos"],
 fontes:["Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury (Lancet 2001;357:1391).","Valente JH et al. ACEP Clinical Policy: Mild Traumatic Brain Injury (Ann Emerg Med 2023;81:e63).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 63 — Traumatismo cranioencefálico."]
},
intoxicacao:{
 hist:["substância, quantidade e horário da exposição","ingestão intencional (tentativa de suicídio)","ingestão associada de álcool ou outras substâncias","vômitos","medicamentos disponíveis em casa"],
 ant:["tentativa de suicídio prévia","transtorno psiquiátrico","uso de drogas ou etilismo","doença hepática ou renal","gestação"],
 ex:["miose ou midríase","pele seca e quente ou sudorese intensa","bradicardia ou taquicardia","depressão respiratória","hipertermia","QRS largo ou QT longo no ECG"],
 alarme:["rebaixamento da consciência ou via aérea não protegida","depressão respiratória","convulsão","arritmia ou QRS largo","hipotensão","ideação suicida persistente"],
 fontes:["Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 99 — Manejo inicial das intoxicações exógenas.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 470 — Poisoning and Drug Overdose."]
},
hiperglicemia:{
 hist:["poliúria e polidipsia","perda de peso","vômitos","dor abdominal","respiração rápida ou dispneia","sonolência ou confusão","febre ou sintomas de infecção"],
 ant:["diabetes tipo 1","uso irregular ou suspensão de insulina ou antidiabético","uso de inibidor de SGLT2 (cetoacidose com glicemia pouco elevada)","uso de corticoide","gestação"],
 ex:["desidratação","respiração de Kussmaul","hálito cetônico","rebaixamento da consciência","hipotensão ou taquicardia"],
 alarme:["vômitos com dor abdominal","respiração de Kussmaul","rebaixamento da consciência","desidratação grave ou hipotensão"],
 fontes:["American Diabetes Association. Standards of Care in Diabetes—2025, seção 16 (Diabetes Care in the Hospital).","Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (Diabetes Care 2024;47:1257)."]
},
hipoglicemia:{
 hist:["tremor, sudorese ou palpitação","confusão, sonolência ou alteração de comportamento","convulsão","jejum prolongado ou refeição omitida","exercício intenso","ingestão de álcool","dose de insulina ou antidiabético maior que a habitual"],
 ant:["uso de sulfonilureia (glibenclamida, gliclazida)","uso de insulina","doença renal crônica","hipoglicemias prévias ou sem sintomas de alerta","etilismo ou desnutrição","idade avançada"],
 ex:["rebaixamento da consciência","sudorese e palidez","déficit neurológico focal","sinais de sepse"],
 alarme:["hipoglicemia que volta após a correção","rebaixamento persistente após normalizar a glicemia","convulsão","ingestão intencional de insulina ou antidiabético","hipoglicemia por sulfonilureia"],
 fontes:["American Diabetes Association. Standards of Care in Diabetes—2025, seção 6 (Glycemic Goals and Hypoglycemia).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 418 — Hypoglycemia.","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 88 — Hipoglicemia."]
},
hipertireoidismo:{
 hist:["palpitação","intolerância ao calor e sudorese","perda de peso com apetite aumentado","tremor, nervosismo ou irritabilidade","diarreia","febre ou dor de garganta em uso de antitireoidiano"],
 ant:["doença de Graves ou bócio conhecido","uso irregular ou suspensão do antitireoidiano","uso de amiodarona, contraste iodado ou hormônio tireoidiano","gestação","fibrilação atrial ou insuficiência cardíaca","infecção, trauma ou cirurgia recente"],
 ex:["taquicardia ou fibrilação atrial","tremor fino","bócio","pele quente e úmida","retração palpebral ou exoftalmia","febre"],
 alarme:["febre alta","agitação, confusão ou delírio","taquicardia intensa ou FA de alta resposta","insuficiência cardíaca","vômitos, diarreia ou icterícia","febre com dor de garganta (agranulocitose)"],
 fontes:["Ross DS et al. 2016 ATA Guidelines for Diagnosis and Management of Hyperthyroidism and Other Causes of Thyrotoxicosis (Thyroid 2016;26:1343).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 396 — Hyperthyroidism and Other Causes of Thyrotoxicosis.","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 90 — Crise tireotóxica.","Burch HB, Wartofsky L. Life-threatening thyrotoxicosis: thyroid storm (Endocrinol Metab Clin North Am 1993;22:263)."]
},
hipotireoidismo:{
 hist:["cansaço ou fraqueza","intolerância ao frio","constipação","ganho de peso","pele seca ou queda de cabelo","dificuldade de concentração ou memória"],
 ant:["tireoidite de Hashimoto ou hipotireoidismo conhecido","uso irregular de levotiroxina","tireoidectomia ou iodo radioativo","uso de amiodarona ou lítio","doença cardíaca ou idade avançada (dose inicial menor)","gestação"],
 ex:["bradicardia","inchaço de face, mãos e pés (mixedema)","relaxamento lento dos reflexos tendinosos","pele seca e fria","hipotermia"],
 alarme:["rebaixamento da consciência (coma mixedematoso)","hipotermia","hipoventilação","convulsão","hipoglicemia ou hiponatremia"],
 fontes:["Jonklaas J et al. Guidelines for the Treatment of Hypothyroidism — ATA (Thyroid 2014;24:1670).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 395 — Hypothyroidism."]
},
cad:{
 hist:["poliúria, polidipsia e perda de peso","náuseas ou vômitos","dor abdominal","dispneia","sonolência ou confusão","febre ou sintomas de infecção","omissão de insulina"],
 ant:["diabetes tipo 1","uso de inibidor de SGLT2 (cetoacidose com glicemia pouco elevada)","uso de corticoide ou antipsicótico","uso de cocaína ou álcool","infarto, AVC ou pancreatite recente","gestação"],
 ex:["desidratação ou hipotensão","respiração de Kussmaul","hálito cetônico","rebaixamento da consciência","dor abdominal à palpação","sinais de foco infeccioso"],
 alarme:["rebaixamento da consciência ou coma","hipotensão ou choque","potássio < 3,5 mmol/L (adiar a insulina)","pH < 7,0","cefaleia ou piora neurológica durante o tratamento (edema cerebral)"],
 fontes:["Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (Diabetes Care 2024;47:1257).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 89 — Hiperglicemias."]
},
hipercalemia:{
 hist:["fraqueza muscular","palpitação","diurese diminuída ou ausente","sessão de diálise perdida","uso de suplemento de potássio ou substituto do sal"],
 ant:["doença renal crônica ou diálise","uso de IECA, BRA, espironolactona ou diurético poupador de potássio","uso de anti-inflamatório, trimetoprima, heparina ou betabloqueador","diabetes","insuficiência cardíaca","rabdomiólise, hemólise ou lise tumoral"],
 ex:["bradicardia","fraqueza muscular","alteração no ECG (onda T apiculada, QRS largo, ausência de onda P)","desidratação ou hipovolemia"],
 alarme:["alteração no ECG","bradicardia ou arritmia","potássio ≥ 6,5 mmol/L","anúria ou lesão renal aguda","fraqueza muscular progressiva"],
 fontes:["UK Kidney Association. Clinical Practice Guideline: Treatment of Acute Hyperkalaemia in Adults, 2023.","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 84 — Hipercalemia.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 56 — Fluid and Electrolyte Disturbances (causas de hipercalemia, inclusive fármacos)."]
},
afta:{
 hist:["úlceras orais dolorosas recorrentes","úlcera única que não cicatriza há mais de 3 semanas","úlceras genitais","dor ou vermelhidão ocular","diarreia, dor abdominal ou perda de peso (doença celíaca ou inflamatória intestinal)","febre"],
 ant:["tabagismo ou etilismo","uso de anti-inflamatório, nicorandil ou betabloqueador","anemia ou deficiência de ferro, folato ou vitamina B12","HIV ou imunossupressão","neutropenia ou quimioterapia"],
 ex:["úlceras rasas com halo eritematoso","lesão endurecida, vegetante ou indolor","úlceras múltiplas grandes ou com cicatriz (afta maior)","linfonodomegalia cervical","lesões cutâneas ou oculares associadas"],
 alarme:["úlcera que não cicatriza em 3 semanas (biópsia para excluir câncer)","lesão endurecida em tabagista ou etilista","úlceras orais e genitais com lesão ocular (Behçet)","febre com mal-estar ou perda de peso (doença sistêmica)"],
 fontes:["Scully C. Aphthous ulceration (N Engl J Med 2006;355:165) — causas sistêmicas, fármacos e úlcera persistente como sinal de alerta.","Taylor J et al. Interventions for the management of recurrent aphthous stomatitis (Cochrane Database Syst Rev 2014;CD005411)."]
},
constipacao:{
 hist:["início recente ou mudança do hábito intestinal","sangue nas fezes","perda de peso sem explicação","vômitos","parada de eliminação de gases e fezes","esforço evacuatório ou necessidade de manobra digital para evacuar"],
 ant:["idade ≥ 50 anos sem rastreio de câncer colorretal","câncer colorretal ou doença inflamatória intestinal na família","uso de opioide, anticolinérgico, bloqueador de canal de cálcio, antidepressivo ou ferro","hipotireoidismo ou hipercalcemia","doença neurológica (Parkinson, lesão medular)","cirurgia abdominal prévia"],
 ex:["distensão abdominal","massa abdominal palpável","fecaloma ao toque retal","fissura anal ou hemorroida dolorosa","massa ou estenose ao toque retal","palidez (anemia)"],
 alarme:["sangramento retal, anemia ou perda de peso (investigar câncer colorretal)","vômitos com distensão e parada de gases (obstrução intestinal)","dor abdominal intensa ou peritonite","constipação de início recente após os 50 anos"],
 fontes:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 49 — Diarrhea and Constipation (causas, exame retal e sinais que exigem colonoscopia).","Bharucha AE et al. American Gastroenterological Association technical review on constipation (Gastroenterology 2013;144:218). https://doi.org/10.1053/j.gastro.2012.10.028"]
},
enterobiase:{
 hist:["prurido anal noturno","sono agitado ou irritabilidade","vermes visíveis na região anal ou nas fezes","prurido ou corrimento vulvar (meninas)","dor abdominal"],
 ant:["contatos domiciliares com os mesmos sintomas","criança em creche ou escola","gestação","tratamento prévio sem melhora (reinfecção)"],
 ex:["escoriações perianais","sinais de infecção bacteriana na pele perianal","vermes brancos filiformes na região perianal","vulvovaginite"],
 alarme:["infecção bacteriana da pele perianal","dor abdominal intensa ou localizada em fossa ilíaca direita (apendicite, rara)","dor pélvica ou corrimento em menina (migração para o trato genital)","perda de peso"],
 fontes:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 239 — Intestinal Nematode Infections (enterobíase: quadro clínico, complicações e tratamento dos contatos).","CDC. Enterobiasis (pinworm infection) — Clinical care and treatment. https://www.cdc.gov/pinworm/"]
},
gases:{
 hist:["eructação ou flatulência relacionada à dieta (refrigerante, chiclete, comer rápido)","distensão abdominal que piora ao longo do dia","alteração do hábito intestinal","perda de peso, sudorese noturna ou falta de apetite","vômitos com parada de eliminação de gases e fezes","sangue nas fezes"],
 ant:["intolerância à lactose ou a alimentos fermentáveis","doença celíaca na família","síndrome do intestino irritável ou constipação crônica","cirurgia abdominal prévia","câncer colorretal na família","doença hepática ou etilismo"],
 ex:["distensão abdominal timpânica","massa abdominal palpável","ascite","linfonodomegalia supraclavicular","dor com defesa ou descompressão dolorosa"],
 alarme:["perda de peso sem explicação","sangramento retal ou anemia","vômitos com parada de gases e fezes (obstrução)","distensão progressiva com massa ou ascite","início após os 50 anos"],
 fontes:["Moshiree B et al. AGA Clinical Practice Update on Evaluation and Management of Belching, Abdominal Bloating, and Distention (Gastroenterology 2023;165:791) — exames só com sinais de alarme ou exame físico alterado. https://doi.org/10.1053/j.gastro.2023.04.039","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 53 — Abdominal Swelling and Ascites (gases, aerofagia e sinais de malignidade ou obstrução)."]
},
hemorroida:{
 hist:["sangue vermelho vivo ao evacuar","prolapso ao evacuar","dor anal intensa","mudança do hábito intestinal","perda de peso","constipação ou esforço evacuatório"],
 ant:["idade ≥ 45 anos sem colonoscopia","câncer colorretal na família","doença inflamatória intestinal","uso de anticoagulante ou antiagregante","gestação"],
 ex:["hemorroida externa trombosada","prolapso hemorroidário redutível ou irredutível","fissura anal","massa ao toque retal","palidez"],
 alarme:["hemorroida prolapsada irredutível, escurecida ou necrótica (estrangulamento)","febre com dor perianal (abscesso)","sangramento volumoso ou anemia","sangramento com mudança do hábito intestinal ou perda de peso (investigar câncer)"],
 fontes:["Davis BR et al. ASCRS Clinical Practice Guidelines for the Management of Hemorrhoids (Dis Colon Rectum 2018;61:284) — avaliação do cólon quando o sangramento sugere outra causa."]
},
hpylori:{
 hist:["dor ou desconforto epigástrico","fezes escuras (melena) ou vômito com sangue","perda de peso sem explicação","disfagia","vômitos persistentes"],
 ant:["tratamento prévio para H. pylori","uso prévio de claritromicina, outro macrolídeo ou metronidazol","alergia a penicilina","uso de inibidor de bomba de prótons ou antibiótico nas últimas semanas (falso-negativo)","uso de anti-inflamatório ou AAS","câncer gástrico na família"],
 ex:["palidez","massa epigástrica","linfonodomegalia supraclavicular","dor com defesa ou descompressão dolorosa"],
 alarme:["hematêmese ou melena","disfagia progressiva","perda de peso","vômitos persistentes","anemia"],
 fontes:["Malfertheiner P et al. Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report (Gut 2022;71:1724).","Coelho LGV et al. IV Brazilian Consensus Conference on Helicobacter pylori infection (Arq Gastroenterol 2018;55:97).","Chey WD et al. ACG Clinical Guideline: Treatment of Helicobacter pylori Infection (Am J Gastroenterol 2024;119:1730)."]
},
nauseas:{
 hist:["dor abdominal","parada de eliminação de gases e fezes","vômito com sangue ou em borra de café","cefaleia intensa ou sintoma neurológico","dor torácica","vertigem","diarreia ou casos semelhantes após a mesma refeição"],
 ant:["gestação possível","uso de opioide, agonista de GLP-1, quimioterapia, antidepressivo ou anti-inflamatório","uso diário de maconha","diabetes (cetoacidose ou gastroparesia)","cirurgia abdominal prévia","insuficiência renal ou adrenal","etilismo"],
 ex:["mucosas secas ou taquicardia (desidratação)","distensão abdominal com ruídos aumentados ou ausentes","defesa ou descompressão dolorosa","déficit neurológico focal ou papiledema","icterícia"],
 alarme:["hematêmese","vômitos com distensão e parada de gases (obstrução)","sinais de peritonite","rebaixamento do nível de consciência ou déficit neurológico","desidratação grave","dor torácica (isquemia miocárdica)"],
 fontes:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 48 — Nausea, Vomiting, and Indigestion (causas intra e extraperitoneais, fármacos e exame físico)."]
},
verminose:{
 hist:["eliminação de vermes nas fezes, pela boca ou pelo nariz","dor abdominal","diarreia","prurido anal","cansaço ou falta de ar aos esforços (anemia)","tosse com febre nas semanas anteriores (fase pulmonar)"],
 ant:["gestação","uso de corticoide ou imunossupressão (estrongiloidíase grave)","infecção por HTLV-1","desnutrição","saneamento precário ou contato com solo contaminado (andar descalço)"],
 ex:["palidez","distensão abdominal","massa abdominal palpável (bolo de áscaris)","lesão cutânea pruriginosa ou serpiginosa","icterícia"],
 alarme:["vômitos, cólica e distensão abdominal (obstrução por áscaris)","icterícia, cólica biliar ou dor em faixa (migração biliar ou pancreática)","febre ou sepse em usuário de corticoide ou imunossuprimido (hiperinfecção por estrongiloides)","anemia grave"],
 fontes:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 239 — Intestinal Nematode Infections (ascaridíase, ancilostomíase, estrongiloidíase e enterobíase; benzimidazóis contraindicados na gestação)."]
},
hda:{
 hist:["hematêmese ou vômito em borra de café","melena","síncope","vômitos repetidos antes do sangramento","dor epigástrica","sangramento anterior"],
 ant:["cirrose ou doença hepática (varizes)","insuficiência cardíaca","uso de anti-inflamatório ou AAS","uso de anticoagulante ou antiagregante","úlcera péptica ou hemorragia digestiva prévia","etilismo"],
 ex:["FC ≥ 100 bpm","PA sistólica < 100 mmHg","palidez","melena ao toque retal","estigmas de hepatopatia (icterícia, ascite, aranhas vasculares)","alteração do nível de consciência"],
 alarme:["instabilidade hemodinâmica ou choque","hematêmese volumosa ou sangramento ativo","síncope","cirrose com suspeita de sangramento varicoso","Glasgow-Blatchford > 1 (não é candidato à alta)"],
 fontes:["Blatchford O et al. A risk score to predict need for treatment for upper-gastrointestinal haemorrhage (Lancet 2000;356:1318) — ureia, hemoglobina, PA sistólica, FC ≥ 100, melena, síncope, hepatopatia e insuficiência cardíaca.","Laine L et al. ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding (Am J Gastroenterol 2021;116:899) — Glasgow-Blatchford 0–1 pode ter alta. https://pubmed.ncbi.nlm.nih.gov/33929377/","Gralnek IM et al. ESGE Guideline: Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage — Update 2021 (Endoscopy 2021;53:300).","de Franchis R et al. Baveno VII — Renewing consensus in portal hypertension (J Hepatol 2022;76:959)."]
},
"desidratacao-crianca":{
 hist:["piora da diarreia (mais frequente ou mais volumosa)","vômitos repetidos","sangue nas fezes","febre","diurese diminuída","recusa alimentar ou incapacidade de beber","diarreia há 14 dias ou mais"],
 ant:["idade < 6 meses","desnutrição grave","imunodeficiência","cardiopatia grave"],
 ex:["estado geral irritado ou letárgico","olhos fundos","lágrimas ausentes","boca e língua secas","sinal da prega que desaparece lentamente","pulso fraco ou ausente","sede: bebe avidamente ou não consegue beber"],
 alarme:["criança comatosa, hipotônica ou letárgica","incapaz de beber","pulso fraco ou ausente","sinal da prega muito lento (mais de 2 segundos)","vômitos repetidos","sangue nas fezes com comprometimento do estado geral","sem melhora da desidratação após 6 horas de tratamento"],
 fontes:["Ministério da Saúde. Manejo do paciente com diarreia: avaliação do estado de hidratação do paciente (cartaz), 2023. https://bvsms.saude.gov.br/bvs/cartazes/manejo_paciente_diarreia_cartaz.pdf","Sociedade Brasileira de Pediatria. Guia Prático: Diarreia Aguda Infecciosa, 2023."]
},
cerume:{
 hist:["hipoacusia","plenitude auricular","otalgia","zumbido","tontura","otorreia"],
 ant:["perfuração timpânica ou cirurgia otológica prévia","tubo de ventilação","uso de anticoagulante","diabetes ou imunossupressão","radioterapia prévia de cabeça e pescoço","uso de aparelho auditivo"],
 ex:["cerume obstruindo o conduto","estenose ou exostose do conduto","membrana timpânica não íntegra","sinais de otite externa"],
 alarme:["otorreia ou suspeita de perfuração (não irrigar)","sintomas que persistem após a remoção do cerume","dor intensa, sangramento ou vertigem durante a remoção"],
 fontes:["Schwartz SR et al. AAO-HNS Clinical Practice Guideline (Update): Earwax (Cerumen Impaction) (Otolaryngol Head Neck Surg 2017;156:S1) — fatores que modificam o manejo e reavaliação após a remoção. https://doi.org/10.1177/0194599816671491"]
},
conjuntivite:{
 hist:["secreção purulenta ou pálpebras coladas ao acordar","secreção aquosa","prurido","baixa da visão","dor ocular moderada ou intensa","fotofobia","infecção de vias aéreas ou contato com caso"],
 ant:["uso de lente de contato","herpes ocular prévio","imunossupressão","exposição sexual de risco (gonococo ou clamídia)","episódios semelhantes antes","recém-nascido"],
 ex:["acuidade visual reduzida","secreção purulenta abundante","linfonodo pré-auricular","opacidade ou lesão da córnea","vesículas palpebrais","hiperemia concentrada ao redor da córnea"],
 alarme:["baixa da visão","dor ocular moderada ou intensa","fotofobia","usuário de lente de contato com olho vermelho (ceratite)","secreção purulenta intensa e de início rápido (gonococo)","acometimento da córnea ou herpes ocular"],
 fontes:["Cheung AY et al. American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern 2023 (Ophthalmology 2024;131:P134) — critérios de encaminhamento imediato ao oftalmologista.","Azari AA, Barney NP. Conjunctivitis: a systematic review of diagnosis and treatment (JAMA 2013;310:1721). https://doi.org/10.1001/jama.2013.280318","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 34 — Disorders of the Eye (conjuntivite versus ceratite; lente de contato)."]
},
epistaxe:{
 hist:["sangramento ativo no momento","sangramento pelas duas narinas ou pela boca (posterior)","episódios de repetição","sangramento sempre na mesma narina","trauma nasal ou de face","tontura ou desmaio"],
 ant:["uso de anticoagulante ou antiagregante","distúrbio de coagulação pessoal ou familiar","hipertensão","uso de droga inalada (cocaína)","telangiectasias ou epistaxe na família (Rendu-Osler-Weber)","cirurgia nasal recente"],
 ex:["ponto sangrante anterior na rinoscopia","sangue escorrendo na orofaringe","taquicardia ou hipotensão","PA elevada","telangiectasias em lábios, língua ou face","massa nasal"],
 alarme:["instabilidade hemodinâmica","sangramento que persiste após compressão e vasoconstritor","sangramento posterior","epistaxe unilateral recorrente com obstrução nasal (tumor)","uso de anticoagulante com sangramento de difícil controle"],
 fontes:["Tunkel DE et al. AAO-HNS Clinical Practice Guideline: Nosebleed (Epistaxis) (Otolaryngol Head Neck Surg 2020;162:S1) — fatores de risco a documentar, endoscopia se unilateral recorrente e avaliação de telangiectasia hereditária."]
},
"otite-externa":{
 hist:["otalgia","prurido no ouvido","otorreia","plenitude auricular ou hipoacusia","exposição à água ou manipulação do conduto"],
 ant:["diabetes","imunossupressão","perfuração timpânica ou tubo de ventilação","radioterapia prévia de cabeça e pescoço","otites externas de repetição"],
 ex:["dor à tração do pavilhão ou à pressão do trago","edema e eritema do conduto","membrana timpânica íntegra ou perfurada","celulite periauricular ou linfonodo regional","tecido de granulação no conduto","paralisia facial"],
 alarme:["dor intensa e persistente em diabético ou imunossuprimido (otite externa maligna)","tecido de granulação no conduto","paralisia facial ou de outro nervo craniano","celulite que se estende além do conduto","sem melhora em 48 a 72 horas"],
 fontes:["Rosenfeld RM et al. AAO-HNS Clinical Practice Guideline: Acute Otitis Externa (Otolaryngol Head Neck Surg 2014;150:S1) — fatores que modificam o manejo e reavaliação se sem melhora em 48–72 h."]
},
rinite:{
 hist:["espirros em salva","prurido nasal","coriza aquosa","obstrução nasal","prurido e lacrimejamento ocular","relação com poeira, mofo, pelos ou estação do ano"],
 ant:["asma","dermatite atópica","uso prolongado de descongestionante nasal","piora com AAS ou anti-inflamatório","gestação"],
 ex:["mucosa nasal pálida e edemaciada","prega nasal transversa","olheiras","pólipo nasal","desvio septal","sibilos"],
 alarme:["sintomas só de um lado","secreção purulenta ou dor facial","epistaxe de repetição","perda do olfato","obstrução nasal isolada e progressiva"],
 fontes:["Bousquet J et al. Allergic Rhinitis and its Impact on Asthma (ARIA) 2008 update (Allergy 2008;63 Suppl 86:8) — sintomas que sugerem outro diagnóstico.","Sakano E et al. IV Brazilian Consensus on Rhinitis — an update on allergic rhinitis (Braz J Otorhinolaryngol 2018;84:3). https://doi.org/10.1016/j.bjorl.2017.10.006"]
},
dpoc:{
 hist:["piora da dispneia","aumento do volume de escarro","escarro purulento","febre","dor torácica","edema de pernas ou ganho de peso","sonolência ou confusão"],
 ant:["exacerbação ou internação por DPOC no último ano","ventilação não invasiva ou intubação prévia","oxigênio domiciliar","insuficiência cardíaca ou arritmia","tabagismo atual"],
 ex:["FR ≥ 24 irpm","FC ≥ 95 bpm","saturação de O2 < 92% ou queda > 3% do habitual","uso de musculatura acessória ou respiração paradoxal","cianose central","edema periférico novo","murmúrio vesicular assimétrico"],
 alarme:["sonolência ou confusão mental (hipercapnia)","hipoxemia ou acidose respiratória apesar de O2","respiração paradoxal ou exaustão","falta de resposta ao tratamento inicial","instabilidade hemodinâmica"],
 fontes:["Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2026 Report, cap. 4 — Management of Exacerbations (classificação de gravidade, condições que simulam exacerbação e local de tratamento). https://goldcopd.org","Celli BR et al. An updated definition and severity classification of COPD exacerbations: the Rome proposal (Am J Respir Crit Care Med 2021;204:1251)."]
},
bronquiolite:{
 hist:["coriza precedendo tosse e desconforto respiratório","pausas respiratórias (apneia)","ingestão de líquidos abaixo da metade do habitual","diurese diminuída (fralda seca há 12 horas)","cianose"],
 ant:["idade < 3 meses","prematuridade","cardiopatia com repercussão hemodinâmica","doença pulmonar crônica (displasia broncopulmonar)","imunodeficiência","doença neuromuscular"],
 ex:["FR > 70 irpm","tiragem intensa","gemência","batimento de asa nasal","saturação de O2 < 90% (< 92% se < 6 semanas ou comorbidade)","sinais de desidratação"],
 alarme:["apneia","cianose central","gemência ou tiragem intensa","saturação de O2 persistentemente baixa","ingestão insuficiente ou desidratação","letargia ou exaustão"],
 fontes:["Ralston SL et al. AAP Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis (Pediatrics 2014;134:e1474) — fatores de risco para doença grave.","Friedman JN et al. Canadian Paediatric Society. Bronchiolitis: recommendations for diagnosis, monitoring and management of children one to 24 months of age (Paediatr Child Health 2014;19:485).","NICE NG9. Bronchiolitis in children: diagnosis and management, 2015 (atualizada 2021) — sinais de alerta e limiares de saturação."]
},
crupe:{
 hist:["tosse ladrante","rouquidão","estridor","pródromo de coriza e febre baixa","início súbito sem pródromo (corpo estranho)","dificuldade para engolir ou sialorreia"],
 ant:["crupe grave ou intubação prévia","alteração conhecida da via aérea (estenose subglótica)"],
 ex:["estridor em repouso","tiragem supraesternal ou intercostal","murmúrio vesicular diminuído","agitação ou letargia","cianose ou saturação baixa","aspecto toxêmico"],
 alarme:["letargia ou rebaixamento de consciência","cianose","estridor em repouso com tiragem que não melhora após o tratamento","sialorreia, disfagia ou aspecto toxêmico (epiglotite ou traqueíte bacteriana)","febre alta com piora rápida"],
 fontes:["Ortiz-Alvarez O. Canadian Paediatric Society. Acute management of croup in the emergency department (Paediatr Child Health 2017;22:166) — classificação de gravidade. https://doi.org/10.1093/pch/pxx019","Smith DK et al. Croup: Diagnosis and Management (Am Fam Physician 2018;97:575) — diagnóstico diferencial e fatores de risco."]
},
tosse:{
 hist:["tosse há mais de 8 semanas (crônica)","dispneia","hemoptise","febre","perda de peso ou sudorese noturna","tosse em acessos com guincho ou vômito após a tosse (coqueluche)","pirose, regurgitação ou gotejamento pós-nasal"],
 ant:["tabagismo","uso de IECA (captopril, enalapril)","asma ou DPOC","imunossupressão","contato com tuberculose","pneumonias de repetição"],
 ex:["taquipneia ou saturação de O2 baixa","crepitações","sibilos","sinais de insuficiência cardíaca (estase jugular, edema)"],
 alarme:["hemoptise","dispneia ou hipoxemia","perda de peso","rouquidão persistente","tosse há 3 semanas ou mais (investigar tuberculose)","tabagista acima de 45 anos com tosse nova ou diferente"],
 fontes:["Irwin RS et al. Classification of Cough as a Symptom in Adults and Management Algorithms — CHEST Guideline (Chest 2018;153:196).","Morice AH et al. ERS guidelines on the diagnosis and treatment of chronic cough in adults and children (Eur Respir J 2020;55:1901136).","Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019 (sintomático respiratório: tosse há 3 semanas ou mais).","Ministério da Saúde. Nota Técnica Conjunta nº 165/2025 — coqueluche."]
},
abscesso:{
 hist:["dor e aumento de volume localizado","drenagem espontânea de pus","febre ou calafrios","furúnculos de repetição","lesão que cresce rapidamente"],
 ant:["diabetes ou imunossupressão","infecção prévia por MRSA ou falha de antibiótico anterior","furunculose na família ou em contatos próximos","alergia a penicilina","uso de drogas injetáveis"],
 ex:["flutuação","celulite ao redor","diâmetro maior que 2 cm","linfangite ou linfonodomegalia regional","febre ou taquicardia"],
 alarme:["dor desproporcional ao exame","bolhas, necrose ou crepitação (infecção necrosante)","hipotensão, taquicardia ou confusão (sepse)","celulite que avança rapidamente"],
 fontes:["Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10) — indicações de antibiótico e sinais de infecção necrosante.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 134 — Infections of the Skin, Muscles, and Soft Tissues."]
},
dermatite:{
 hist:["prurido","contato com substância nova (cosmético, metal, planta, produto de limpeza)","exposição ocupacional a irritantes","medicamento iniciado recentemente","vesículas ou exsudação"],
 ant:["dermatite atópica, asma ou rinite","episódios semelhantes antes","alergia de contato já conhecida"],
 ex:["lesões restritas à área de contato","vesículas, crostas ou exsudação","liquenificação","crostas amareladas ou pus (infecção secundária)"],
 alarme:["bolhas extensas, descolamento da pele ou lesão de mucosas","febre com lesões disseminadas","vermelhidão de quase toda a pele (eritrodermia)","edema de lábios, língua ou dispneia (anafilaxia)"],
 fontes:["Fonacier L et al. Contact dermatitis: a practice parameter — update 2015 (J Allergy Clin Immunol Pract 2015;3:S1).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 60 — Eczema, Psoriasis, Cutaneous Infections, Acne, and Other Common Skin Disorders.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 63 — Cutaneous Drug Reactions (Stevens-Johnson/NET e eritrodermia).","Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020;13:100472)."]
},
tinea:{
 hist:["prurido entre os dedos","descamação ou fissuras interdigitais","uso prolongado de calçado fechado ou pés úmidos","uso de piscina, vestiário ou chuveiro coletivo"],
 ant:["diabetes","imunossupressão","onicomicose","erisipela ou celulite de repetição na perna"],
 ex:["maceração ou fissura nos espaços interdigitais","descamação plantar em mocassim","unhas espessadas ou amareladas","vermelhidão e calor que se estendem ao dorso do pé ou à perna"],
 alarme:["vermelhidão, calor e dor que se espalham (celulite ou erisipela)","febre","pus ou dor intensa (infecção bacteriana secundária)"],
 fontes:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 225 — Superficial Fungal Infections.","Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10) — fissuras e maceração interdigitais como porta de entrada da celulite recorrente.","Crawford F, Hollis S. Topical treatments for fungal infections of the skin and nails of the foot (Cochrane Database Syst Rev 2007;CD001434)."]
},
escabiose:{
 hist:["prurido que piora à noite","contatos domiciliares ou íntimos com coceira","lesões em punhos, entre os dedos, axilas ou genitais","prurido após banho quente"],
 ant:["moradia em instituição, abrigo ou presídio","imunossupressão (risco de sarna crostosa)","gestação ou amamentação","criança com peso < 15 kg"],
 ex:["túneis finos e sinuosos","pápulas em espaços interdigitais, punhos, axilas, aréolas ou genitália","crostas espessas e descamativas (sarna crostosa)","escoriações com crostas ou pus (infecção secundária)"],
 alarme:["crostas hiperceratóticas extensas (sarna crostosa)","infecção bacteriana secundária extensa"],
 fontes:["Salavastru CM et al. European guideline for the management of scabies — IUSTI (J Eur Acad Dermatol Venereol 2017;31:1248).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 472 — Ectoparasite Infestations and Arthropod Injuries.","Bula da ivermectina (Anvisa): contraindicada em gestantes e em crianças com menos de 15 kg."]
},
erisipela:{
 hist:["início súbito","febre ou calafrios","dor local","porta de entrada (frieira, ferida, picada, fissura)","piora apesar de antibiótico"],
 ant:["episódios anteriores de erisipela ou celulite","linfedema ou insuficiência venosa","diabetes ou imunossupressão","obesidade","alergia a penicilina"],
 ex:["placa vermelha, quente e elevada, de bordas nítidas","fissura interdigital ou ferida (porta de entrada)","linfangite ou linfonodomegalia regional","flutuação (abscesso associado)","bolhas"],
 alarme:["dor desproporcional ao exame","bolhas hemorrágicas, necrose ou crepitação","perda de sensibilidade na pele acometida","hipotensão, taquicardia ou confusão (sepse)","progressão rápida da lesão"],
 fontes:["Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10) — fatores predisponentes, porta de entrada e sinais de infecção necrosante.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 134 — Infections of the Skin, Muscles, and Soft Tissues."]
},
ferida:{
 hist:["mecanismo da lesão (corte, perfuração, esmagamento, mordedura)","horas desde a lesão","contaminação com terra, fezes ou saliva","corpo estranho no ferimento"],
 ant:["vacina antitetânica (número de doses e data da última)","diabetes ou imunossupressão","uso de anticoagulante"],
 ex:["profundidade e tecido desvitalizado","corpo estranho","sensibilidade, movimento e perfusão abaixo da lesão","vermelhidão, calor ou pus"],
 alarme:["pus, vermelhidão que se espalha ou febre (infecção)","perda de força ou de sensibilidade abaixo da lesão","sangramento ativo","trismo ou rigidez muscular (tétano)"],
 fontes:["Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., 2023 — tétano acidental: profilaxia conforme tipo de ferimento e situação vacinal.","Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 157 — Tetanus."]
},
"herpes-simples":{
 hist:["ardor ou formigamento antes das lesões (pródromo)","vesículas agrupadas dolorosas","primeiro episódio","febre, mal-estar ou disúria (primoinfecção genital)","parceiro com lesões semelhantes"],
 ant:["episódios anteriores (e quantos por ano)","HIV ou imunossupressão","gestação","dermatite atópica"],
 ex:["vesículas agrupadas sobre base eritematosa","úlceras rasas ou crostas","linfonodos regionais dolorosos","olho vermelho ou lesão palpebral"],
 alarme:["olho vermelho com dor ou baixa da visão (ceratite)","cefaleia intensa, rigidez de nuca ou confusão (meningite ou encefalite)","lesões disseminadas em imunossuprimido ou sobre dermatite atópica (eczema herpético)","gestante com lesão genital perto do parto"],
 fontes:["Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — herpes genital, gestação e complicações.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 197 — Herpes Simplex Virus Infections.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 34 — Disorders of the Eye (ceratite herpética)."]
},
zoster:{
 hist:["dor ou ardor no local antes das lesões","dias desde o surgimento das vesículas","lesões novas ainda surgindo","dor ocular, fotofobia ou baixa da visão","perda auditiva ou vertigem"],
 ant:["idade ≥ 50 anos","imunossupressão (HIV, quimioterapia, corticoide, transplante)","vacina contra herpes zoster","contato com gestante, recém-nascido ou imunossuprimido"],
 ex:["vesículas em faixa unilateral seguindo um dermátomo","vesículas na ponta ou na asa do nariz (sinal de Hutchinson, ramo nasociliar)","olho vermelho ou lesões na pálpebra","paralisia facial ou vesículas no conduto auditivo (Ramsay Hunt)","lesões em vários dermátomos ou disseminadas"],
 alarme:["sinal de Hutchinson, olho vermelho ou baixa da visão (zoster oftálmico)","paralisia facial ou perda auditiva","lesões disseminadas em imunossuprimido","confusão, cefaleia intensa ou déficit neurológico","dispneia ou tosse (acometimento visceral)"],
 fontes:["Dworkin RH et al. Recommendations for the management of herpes zoster (Clin Infect Dis 2007;44 Suppl 1:S1).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 198 — Varicella-Zoster Virus Infections.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 34 — Disorders of the Eye (vesículas no nariz indicam acometimento do ramo nasociliar — sinal de Hutchinson)."]
},
impetigo:{
 hist:["lesões com crostas cor de mel","bolhas que se rompem","prurido","casos semelhantes em casa, escola ou creche","picada, escabiose ou dermatite prévia no local"],
 ant:["episódios de repetição","alergia a penicilina","imunossupressão"],
 ex:["crostas melicéricas","bolhas flácidas","número e extensão das lesões","linfonodomegalia regional","úlceras com crosta escura (ectima)"],
 alarme:["edema de face ou pálpebras","urina escura ou diminuída (glomerulonefrite pós-estreptocócica)","febre ou toxemia","vermelhidão que se espalha ao redor (celulite)"],
 fontes:["Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10) — impetigo, ectima e glomerulonefrite pós-estreptocócica.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 134 — Infections of the Skin, Muscles, and Soft Tissues."]
},
larva:{
 hist:["prurido intenso","lesão em trilha que avança dia a dia","contato da pele com areia ou solo (praia, andar descalço)","várias lesões após deitar no chão"],
 ant:["área frequentada por cães e gatos soltos","gestação ou amamentação","criança com peso < 15 kg"],
 ex:["trajeto serpiginoso, vermelho e elevado","vesículas ou bolhas no trajeto","escoriações com crostas ou pus"],
 alarme:["pus ou vermelhidão que se espalha (infecção secundária)","febre"],
 fontes:["Caumes E. Treatment of cutaneous larva migrans (Clin Infect Dis 2000;30:811).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 238 — Trichinellosis and Other Tissue Nematode Infections (larva migrans cutânea).","Bula da ivermectina (Anvisa): contraindicada em gestantes e em crianças com menos de 15 kg; bula do albendazol (Anvisa): contraindicado na gestação."]
},
onicomicose:{
 hist:["unha espessada, amarelada ou descolada","tempo de evolução","dor ao calçar","coceira ou descamação entre os dedos (tinea pedis)"],
 ant:["diabetes ou doença arterial periférica","insuficiência cardíaca (contraindica itraconazol)","doença hepática","uso de estatina ou outros medicamentos com interação","gestação"],
 ex:["número de unhas acometidas","acometimento da matriz ungueal","tinea pedis associada","vermelhidão ou pus ao redor da unha (paroníquia)"],
 alarme:["faixa escura longitudinal ou lesão que destrói a unha (diferencial com melanoma)","celulite ao redor","icterícia, urina escura ou fadiga intensa em uso de antifúngico oral (hepatotoxicidade)","dispneia ou edema de pernas em uso de itraconazol (insuficiência cardíaca)"],
 fontes:["Ameen M et al. British Association of Dermatologists' guidelines for the management of onychomycosis 2014 (Br J Dermatol 2014;171:937).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 225 — Superficial Fungal Infections.","Bula do itraconazol (Anvisa): contraindicado na insuficiência cardíaca e na gestação; interações com estatinas."]
},
picada:{
 hist:["tipo de inseto (abelha, vespa, formiga)","número de picadas","horas desde a picada","urticária longe do local","falta de ar, rouquidão ou aperto na garganta","tontura ou desmaio"],
 ant:["reação alérgica prévia a picada","anafilaxia prévia","asma","uso de betabloqueador ou IECA"],
 ex:["ferrão retido","edema local extenso (maior que 10 cm)","urticária ou angioedema à distância","sibilos ou estridor","hipotensão"],
 alarme:["dispneia, estridor ou sibilância","edema de lábios, língua ou glote","hipotensão ou síncope","vômitos persistentes","múltiplas picadas (envenenamento maciço)"],
 fontes:["Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020;13:100472).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 472 — Ectoparasite Infestations and Arthropod Injuries (reações a himenópteros e envenenamento por múltiplas picadas).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 11 — Anafilaxia e outras alergias (sinais de alarme e fatores de risco)."]
},
psoriase:{
 hist:["prurido","dor ou inchaço nas articulações","infecção de garganta recente","medicamento iniciado ou suspenso recentemente (lítio, betabloqueador, antimalárico, corticoide)","piora rápida das lesões"],
 ant:["psoríase na família","suspensão recente de corticoide sistêmico","gestação"],
 ex:["placas vermelhas bem delimitadas com escamas prateadas","lesões em cotovelos, joelhos ou couro cabeludo","depressões puntiformes ou descolamento nas unhas","extensão da superfície corporal acometida","dedo em salsicha ou artrite"],
 alarme:["vermelhidão de quase toda a pele (eritrodermia)","pústulas disseminadas com febre (psoríase pustulosa)","artrite com dor e inchaço importantes"],
 fontes:["Elmets CA et al. Joint AAD–NPF Guidelines of care for the management and treatment of psoriasis with topical therapy (J Am Acad Dermatol 2021;84:432).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 60 — Eczema, Psoriasis, Cutaneous Infections, Acne, and Other Common Skin Disorders (psoríase gutata, pustulosa, unhas e artrite psoriásica)."]
},
"queimadura-solar":{
 hist:["horas de exposição ao sol","dor e ardor","bolhas","febre, calafrios ou cefaleia","náuseas ou vômitos"],
 ant:["medicamento fotossensibilizante (tetraciclina, fluoroquinolona, sulfametoxazol-trimetoprima, tiazídico, AINE)","pele clara que sempre queima","doença com fotossensibilidade"],
 ex:["extensão da área queimada","bolhas","sinais de desidratação"],
 alarme:["bolhas em área extensa","febre, calafrios ou prostração","vômitos, tontura ou desmaio (desidratação)","confusão mental"],
 fontes:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 64 — Photosensitivity and Other Reactions to Sunlight.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 63 — Cutaneous Drug Reactions (fármacos fotossensibilizantes).","Guerra KC, Urban K, Crane JS. Sunburn (StatPearls, 2022; NBK534837) — sintomas sistêmicos na queimadura solar extensa."]
},
urticaria:{
 hist:["placas que somem em menos de 24 h","gatilho recente (alimento, medicamento, picada, infecção)","inchaço de lábios, pálpebras ou língua","rouquidão, dificuldade para engolir ou falta de ar","tontura ou desmaio","dor abdominal ou vômitos"],
 ant:["uso de IECA","uso de AINE","anafilaxia prévia","angioedema na família (hereditário)","asma"],
 ex:["urticas disseminadas","angioedema de face, lábios ou língua","estridor ou sibilos","hipotensão ou taquicardia"],
 alarme:["estridor, rouquidão ou disfagia (edema de glote)","dispneia ou sibilância","hipotensão ou síncope","vômitos persistentes","progressão rápida dos sintomas","angioedema sem urticária (bradicinina, não responde a anti-histamínico)"],
 fontes:["Zuberbier T et al. The international EAACI/GA²LEN/EuroGuiDerm/APAAACI guideline for the definition, classification, diagnosis, and management of urticaria (Allergy 2022;77:734).","Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020;13:100472).","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 11 — Anafilaxia e outras alergias (sinais de alarme; urticária e angioedema, IECA e hereditário)."]
},
queimadura:{
 hist:["agente (líquido quente, chama, eletricidade, produto químico)","incêndio em ambiente fechado ou inalação de fumaça","horas desde a queimadura","primeiros socorros feitos","trauma associado (queda, explosão)"],
 ant:["idade < 10 ou > 50 anos","comorbidade (cardíaca, renal, diabetes)","vacina antitetânica","gestação"],
 ex:["superfície corporal queimada estimada","queimadura de espessura total (branca, endurecida, indolor)","face, mãos, pés, períneo ou grandes articulações","queimadura circunferencial","vibrissas chamuscadas, fuligem na boca ou escarro carbonáceo","pulsos distais"],
 alarme:["rouquidão, estridor ou dispneia (lesão inalatória)","queimadura elétrica ou química","queimadura de 3º grau ou de 2º grau extensa (critério de centro de queimados)","queimadura circunferencial com pulso fraco ou dor intensa no membro","cefaleia, confusão ou sonolência após incêndio fechado (monóxido de carbono)","história incompatível com a lesão (maus-tratos)"],
 fontes:["Ministério da Saúde. Cartilha para tratamento de emergência das queimaduras, 2012 (avaliação, profundidade, extensão e critérios de gravidade e encaminhamento). https://portal.cfm.org.br/images/stories/pdf/queimados.pdf","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 69 — Queimaduras térmicas (critérios de transferência para centro de queimados, lesão inalatória, monóxido de carbono e maus-tratos)."]
},
cinetose:{
 hist:["náuseas ou vômitos durante viagem ou movimento","melhora ao parar o movimento","vertigem fora do movimento","cefaleia"],
 ant:["glaucoma","aumento da próstata ou retenção urinária","asma","uso de sedativos ou álcool","gestação","idade avançada"],
 ex:["nistagmo espontâneo","déficit neurológico","sinais de desidratação"],
 alarme:["vertigem contínua sem movimento","diplopia, disartria, fraqueza ou ataxia","vômitos incoercíveis","cefaleia intensa"],
 fontes:["Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 130 — Health Recommendations for International Travel (cinetose; efeitos sedativos e anticolinérgicos, cautela em idosos).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 24 — Dizziness and Vertigo (sinais de vertigem central).","FDA. Meclizine hydrochloride (Antivert) — bula: cautela em asma, glaucoma e aumento da próstata; potencializa álcool e sedativos."]
},
ivc:{
 hist:["peso ou dor nas pernas que piora no fim do dia","edema que piora à tarde","prurido ou alteração da cor da pele","ferida que não cicatriza","dor na panturrilha ao caminhar que melhora em repouso (claudicação)"],
 ant:["trombose venosa profunda prévia","gestações ou obesidade","varizes na família","permanência prolongada em pé","doença arterial periférica"],
 ex:["varizes","edema","hiperpigmentação ou endurecimento da pele (lipodermatosclerose)","úlcera perto do maléolo","pulsos distais"],
 alarme:["edema unilateral de início súbito com dor na panturrilha (TVP)","dispneia ou dor torácica (embolia pulmonar)","úlcera com vermelhidão que se espalha ou febre","sangramento de variz","cordão venoso vermelho, endurecido e doloroso (tromboflebite)","pulsos ausentes (contraindica compressão)"],
 fontes:["De Maeseneer MG et al. ESVS 2022 Clinical Practice Guidelines on the Management of Chronic Venous Disease of the Lower Limbs (Eur J Vasc Endovasc Surg 2022;63:184).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 293 — Chronic Venous Disease and Lymphedema.","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 290 — Deep-Venous Thrombosis and Pulmonary Thromboembolism."]
},
pep:{
 hist:["tipo de exposição (percutânea, mucosa, pele não íntegra, sexual)","material biológico (sangue, sêmen, fluido vaginal, líquidos de serosas, líquor, líquido amniótico)","horas desde a exposição","pessoa-fonte sabidamente com HIV ou de situação desconhecida","violência sexual","rompimento ou não uso de preservativo"],
 ant:["teste de HIV anterior ou uso de PrEP","vacina contra hepatite B (esquema completo)","gestação ou amamentação","doença renal","uso de rifampicina, carbamazepina, fenobarbital ou metformina (interação)"],
 ex:["lesão no local da exposição (profundidade, sangue visível)","lesões genitais, anais ou orais","úlcera genital ou corrimento (IST)"],
 alarme:["atendimento após 72 h da exposição (PEP não indicada; manter seguimento)","teste rápido reagente na pessoa exposta (não iniciar PEP; encaminhar)","violência sexual (notificar e acionar a rede de proteção)","febre, exantema, linfonodomegalia ou dor de garganta no seguimento (infecção aguda pelo HIV)","sinais de toxicidade grave aos antirretrovirais"],
 fontes:["Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Profilaxia Pós-Exposição (PEP) de Risco à Infecção pelo HIV, IST e Hepatites Virais, 2024 (atualização — Portaria SECTICS/MS nº 14, de 8/4/2024): os quatro passos da avaliação, material e tipo de exposição, prazo de 72 h, teste rápido, interações e seguimento."]
},
tetano:{
 hist:["mecanismo (perfuração, esmagamento, mordedura, queimadura)","horas desde o ferimento","contaminação com terra, fezes, poeira ou saliva","corpo estranho","mordedura: espécie do animal e se pode ser observado"],
 ant:["vacina antitetânica (número de doses e data da última)","imunossupressão","profilaxia antirrábica prévia"],
 ex:["profundidade, tecido desvitalizado ou necrose","corpo estranho","local da mordedura (cabeça, face, mãos, pés)","ferimentos múltiplos ou extensos","sinais de infecção"],
 alarme:["trismo, rigidez de nuca ou de abdome, espasmos (tétano)","vermelhidão que se espalha, pus ou febre","mordedura em face, cabeça, mãos, pés ou múltipla (acidente grave para raiva)","contato com morcego (sempre grave para raiva)"],
 fontes:["Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., 2023 — tétano acidental: conduta por tipo de ferimento e situação vacinal.","Ministério da Saúde. Nota Técnica nº 8/2022-CGZV/DEIDT/SVS/MS — profilaxia da raiva humana (gravidade da exposição e morcegos).","Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 157 — Tetanus.","Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10) — mordeduras."]
},
escorpiao:{
 hist:["hora da picada","dor, parestesia ou sudorese no local","número de episódios de vômito","sudorese generalizada, salivação ou lacrimejamento","agitação ou sonolência","aspecto do escorpião (amarelo) ou foto"],
 ant:["criança ≤ 10 anos (sobretudo < 7 anos)","hipertensão, diabetes, cardiopatia ou nefropatia","acidente na região amazônica","medidas locais já feitas (torniquete, substâncias)"],
 ex:["taquicardia ou bradicardia","hipertensão ou hipotensão","sudorese profusa ou sialorreia","taquipneia ou crepitações pulmonares","mioclonia, disartria ou ataxia (escorpiões da Amazônia)"],
 alarme:["vômitos repetidos (sinal sensível de gravidade)","sudorese profusa e sialorreia","bradicardia ou hipotensão","taquidispneia ou edema agudo de pulmão","agitação alternada com sonolência, convulsões ou coma","priapismo"],
 fontes:["Ministério da Saúde. PCDT Acidentes Escorpiônicos — Portaria SECTICS/MS nº 59, de 1º/8/2025 (classificação leve, moderado e grave; determinantes de gravidade; manifestações das espécies amazônicas). https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-acidentes-escorpionicos/@@display-file/file","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 104 — Acidentes relacionados a animais peçonhentos."]
},
ofidico:{
 hist:["hora da picada","descrição ou foto da serpente (tamanho, anéis coloridos)","torniquete, incisão, sucção ou outra medida local","sangramento de gengiva, nariz ou urina","visão turva, visão dupla ou pálpebras caídas","dor muscular ou urina escura","dor abdominal, diarreia ou tontura"],
 ant:["vacina antitetânica","gestação ou amamentação","reação prévia a soro heterólogo","acidente na Amazônia ou em Mata Atlântica (surucucu)"],
 ex:["número de segmentos do membro com edema (1, 2 ou 3)","bolhas, equimose ou necrose","sangramento local ou à distância","ptose palpebral ou fácies miastênica","oftalmoplegia ou fraqueza muscular","hipotensão ou bradicardia"],
 alarme:["edema de 3 segmentos, necrose ou síndrome compartimental","hemorragia grave, hipotensão ou choque","oligúria, anúria ou urina escura intensa","ptose com disfagia, salivação ou respiração superficial (paralisia respiratória)","diarreia, bradicardia e hipotensão (manifestações vagais do acidente laquético)"],
 fontes:["Ministério da Saúde. PCDT Acidentes Ofídicos — Portaria SECTICS/MS nº 83, de 7/10/2025 (manifestações e classificação de gravidade por gênero; contagem de segmentos; torniquete contraindicado). https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-acidentes-ofidicos","Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 104 — Acidentes relacionados a animais peçonhentos."]
}
};
if (typeof module!=="undefined") module.exports={CHECK};

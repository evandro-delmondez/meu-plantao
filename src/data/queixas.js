/* ===== Entrada por queixa (porta): sinais de alarme primeiro, depois o caminho até a conduta =====
   Conteúdo clínico: fonte em cada queixa e conferência independente antes do merge (regras 1 e 2).
   Formato:
   { id: "cefaleia", nome: "Cefaleia", cor: "amber",
     alarme: [ { t: "sinal de alarme (curto)", acao: "o que fazer se presente (exame, conduta, não liberar)" } ],
     perguntar: ["item curto do que perguntar/examinar"],
     caminhos: [ { rot: "Enxaqueca: dor pulsátil, unilateral, náusea, fotofobia", conduta: "enxaqueca" } ],   // conduta = id existente; sem conduta = só texto
     escores: ["nome de escore validado, se houver (ex.: CURB-65)"],
     fontes: [
    "Prabhakaran S et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke — AHA/ASA (Stroke 2026): último momento visto bem; trombólise e trombectomia com janela. https://doi.org/10.1161/STR.0000000000000513","..."] } */
const QUEIXAS = [
/* Rascunho: 6 queixas da porta (lote 1). Colar os objetos dentro de const QUEIXAS = [ ... ] em src/data/queixas.js. */
{ id: "cefaleia", nome: "Cefaleia", cor: "amber",
  alarme: [
    { t: "Início súbito, dor máxima em até 1 hora (pior dor da vida, em trovoada)", acao: "Não liberar: regra de Ottawa para HSA; qualquer critério → TC sem contraste. TC normal em até 6 h do início, com exame neurológico normal, afasta HSA; após 6 h, punção lombar ou angiotomografia." },
    { t: "Febre com rigidez de nuca, confusão ou petéquias", acao: "Meningite: não liberar; hemoculturas e antibiótico sem esperar TC ou punção. TC antes da punção se déficit focal, convulsão, rebaixamento, papiledema ou imunossupressão." },
    { t: "Déficit neurológico novo, confusão, sonolência ou crise convulsiva", acao: "TC de crânio sem contraste imediata. Déficit súbito: protocolo de AVC já, registrando a hora em que foi visto bem pela última vez (trombólise e trombectomia têm janela). Ver AVC." },
    { t: "Papiledema, ou dor que piora deitado, ao tossir ou no esforço, com vômitos", acao: "Pensar em hipertensão intracraniana (tumor, hematoma, trombose venosa): neuroimagem antes de qualquer alta." },
    { t: "Cefaleia nova ou com mudança de padrão depois dos 50 anos", acao: "Neuroimagem. Dor temporal, dor ao mastigar ou alteração visual: VHS e PCR (arterite temporal); com alteração visual, corticoide no mesmo dia e oftalmologia." },
    { t: "Imunossupressão (HIV, quimioterapia, transplante, corticoide crônico) ou câncer", acao: "Neuroimagem e, sem contraindicação, punção lombar: infecção oportunista ou metástase." },
    { t: "Gestante a partir de 20 semanas ou puérpera", acao: "PA ≥ 140/90 mmHg: investigar pré-eclâmpsia (proteinúria, plaquetas, enzimas hepáticas). PA normal com dor nova: pensar em trombose venosa cerebral (neuroimagem)." },
    { t: "Dor após trauma de crânio, ou em quem usa anticoagulante", acao: "Indicar TC de crânio pela regra canadense. Anticoagulado ficou fora da regra: considerar TC mesmo sem outros critérios." },
    { t: "Olho vermelho e doloroso, visão turva ou halos, pupila média e pouco reativa", acao: "Glaucoma agudo de ângulo fechado: oftalmologia com urgência; não tratar só como enxaqueca." },
    { t: "PA muito elevada com confusão, alteração visual, déficit, dor no peito ou dispneia", acao: "Emergência hipertensiva (lesão de órgão-alvo): não liberar, ver crise hipertensiva. PA alta só com dor, sem lesão de órgão-alvo, costuma ceder com a analgesia." }
  ],
  perguntar: [
    "Como começou: súbito (pico em segundos a minutos) ou gradual; o que fazia na hora (esforço, relação sexual, tosse)",
    "Já teve dor igual? O que mudou em relação à dor de sempre",
    "Febre, rigidez de nuca, manchas na pele, perda de peso",
    "Fraqueza, alteração da fala ou da visão, visão dupla, desmaio ou convulsão",
    "Gestação ou puerpério, imunossupressão, câncer, anticoagulante, trauma recente",
    "Analgésico: em quantos dias por mês (cefaleia por uso excessivo)",
    "Exame: PA, temperatura, nível de consciência, rigidez de nuca, pares cranianos, força, marcha e, se possível, fundo de olho"
  ],
  caminhos: [
    { rot: "Enxaqueca: pulsátil, unilateral, náusea, fotofobia, crises parecidas antes", conduta: "enxaqueca" },
    { rot: "Tensional: em aperto ou pressão, bilateral, sem náusea importante", conduta: "cefaleia" },
    { rot: "Salvas: dor orbitária intensa com lacrimejamento e coriza do mesmo lado, crises de 15 a 180 min", conduta: "salvas" },
    { rot: "Após trauma de crânio", conduta: "tce" },
    { rot: "Déficit neurológico súbito", conduta: "avc" },
    { rot: "PA elevada com lesão de órgão-alvo", conduta: "has" },
    { rot: "Gestante ou puérpera com PA elevada", conduta: "pre-eclampsia" }
  ],
  escores: ["Regra de Ottawa para HSA (idade ≥ 40, dor ou rigidez cervical, perda de consciência presenciada, início no esforço, pico instantâneo, flexão do pescoço limitada)", "SNNOOP10 (sinais de alarme)", "Regra canadense de TC de crânio (trauma)"],
  fontes: [
    "ACEP Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the ED With Acute Headache (Godwin SA et al., Ann Emerg Med 2019;74(4):e41-e74). https://pubmed.ncbi.nlm.nih.gov/31543134/",
    "Perry JJ et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache (JAMA 2013;310:1248) e validação (CMAJ 2017;189:E1379).",
    "Do TP et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list (Neurology 2019;92:134).",
    "Tunkel AR et al. IDSA Practice Guidelines for the Management of Bacterial Meningitis (Clin Infect Dis 2004;39:1267) e van de Beek D et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis (Clin Microbiol Infect 2016;22:S37).",
    "Maz M et al. 2021 ACR/Vasculitis Foundation Guideline for the Management of Giant Cell Arteritis (Arthritis Rheumatol 2021;73:1349).",
    "Gedde SJ et al. Primary Angle-Closure Disease Preferred Practice Pattern, American Academy of Ophthalmology (Ophthalmology 2021;128:P30).",
    "Ministério da Saúde. Manual de Gestação de Alto Risco, 2022 (pré-eclâmpsia).",
    "Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury (Lancet 2001;357:1391) e NICE NG232. Head injury: assessment and early management, 2023 (anticoagulados).",
    "SBC. Diretriz Brasileira de Hipertensão Arterial 2025 (Arq Bras Cardiol) e Posicionamento Luso-Brasileiro de Emergências Hipertensivas, 2020.",
    "Conferido em: Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 26 — Cefaleia; Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 17 — Headache."
  ] },
{ id: "tontura-sincope", nome: "Tontura, vertigem e síncope", cor: "indigo",
  alarme: [
    { t: "Síncope durante esforço, deitado ou logo após palpitação súbita", acao: "Alto risco de arritmia: ECG de 12 derivações já, monitor cardíaco e observação; não liberar sem avaliação cardiológica." },
    { t: "Síncope com dor no peito, falta de ar, dor abdominal ou cefaleia nova", acao: "Procurar SCA, TEP, dissecção de aorta, sangramento (aneurisma roto, gravidez ectópica) e HSA antes de pensar em vasovagal." },
    { t: "Doença cardíaca estrutural, insuficiência cardíaca ou infarto prévio", acao: "Síncope de alto risco: ECG, monitor e observação ou internação; não liberar só porque melhorou." },
    { t: "ECG de alto risco: isquemia, Mobitz II ou BAV total, FC < 40, TV, bloqueio de ramo, QTc > 460 ms, Brugada tipo 1", acao: "Monitor e desfibrilador à mão; ver bradicardia ou taquicardia; observação ou internação." },
    { t: "PA sistólica < 90 mmHg sem explicação, melena ou sopro sistólico novo", acao: "Pensar em hemorragia (digestiva, ectópica, aneurisma) e estenose aórtica: acesso venoso, hemograma, beta-hCG na mulher em idade fértil; não liberar." },
    { t: "Tontura contínua há horas com nistagmo, ou sem conseguir andar sem apoio", acao: "Síndrome vestibular aguda: HINTS plus (com teste de audição) só por quem tem treino. Central, duvidoso, sem examinador treinado ou marcha muito alterada: tratar como AVC de circulação posterior (neurologia, ressonância); TC normal não exclui." },
    { t: "Crises de tontura ou vertigem que vêm sozinhas, duram minutos, sem gatilho de posição, sobretudo em idoso ou com fatores de risco vascular", acao: "Pensar em AIT de circulação posterior (pode anteceder AVC): procurar sinais neurológicos, angiotomografia (ou angiorressonância) e neurologia; TC simples não exclui; não liberar como labirintite." },
    { t: "Visão dupla, fala arrastada, dificuldade para engolir, fraqueza, dormência, incoordenação ou pálpebra caída", acao: "Protocolo de AVC: registrar a hora em que foi visto bem pela última vez e transferir já (trombólise e trombectomia têm janela). Ver AVC." },
    { t: "Tontura com cefaleia súbita ou dor cervical nova", acao: "Suspeitar de dissecção vertebral ou HSA: angiotomografia de crânio e pescoço; não liberar." },
    { t: "Vertigem aguda com perda auditiva súbita de um lado", acao: "Pode ser AVC (artéria cerebelar anteroinferior, HINTS plus) ou surdez súbita: avaliação neurológica e otorrino com urgência." }
  ],
  perguntar: [
    "O que sente: o ambiente gira (vertigem), sensação de desmaio, desequilíbrio, ou perdeu a consciência",
    "Duração e gatilho: segundos ao deitar ou virar na cama (VPPB); contínua há horas ou dias (neurite ou AVC); crises de horas com zumbido e ouvido cheio (Ménière); crises espontâneas de minutos (AIT)",
    "Antes do desmaio: em pé por muito tempo, calor, dor, emoção, tosse ou micção; teve aviso (calor, suor, náusea) ou caiu sem aviso",
    "Durante e depois: quanto tempo, movimentos, mordedura da língua, confusão prolongada, recuperação rápida e completa",
    "Cardiopatia, morte súbita na família em pessoa jovem, remédios (anti-hipertensivo, diurético, os que prolongam o QT), gestação",
    "PA e FC deitado e após 3 min em pé (hipotensão ortostática: queda ≥ 20 mmHg na sistólica ou ≥ 10 mmHg na diastólica), glicemia capilar e ECG em toda síncope",
    "Exame: ausculta cardíaca (sopro), nistagmo, HINTS, Dix-Hallpike, marcha sem apoio, pares cranianos, força e coordenação"
  ],
  caminhos: [
    { rot: "Vertigem periférica: VPPB (Dix-Hallpike positivo) ou neurite com HINTS periférico", conduta: "vertigem" },
    { rot: "Síncope reflexa (vasovagal, situacional) ou ortostática, sem sinal de alto risco e com ECG normal: alta com orientação" },
    { rot: "Sinais neurológicos ou HINTS central", conduta: "avc" },
    { rot: "FC baixa ou bloqueio AV", conduta: "bradicardia" },
    { rot: "Taquicardia ou palpitação antes da síncope", conduta: "taquicardia" },
    { rot: "Glicemia baixa", conduta: "hipoglicemia" },
    { rot: "Perda de consciência com crise convulsiva", conduta: "convulsao" }
  ],
  escores: ["Canadian Syncope Risk Score", "HINTS / HINTS plus"],
  fontes: [
    "Prabhakaran S et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke — AHA/ASA (Stroke 2026): último momento visto bem; trombólise e trombectomia com janela. https://doi.org/10.1161/STR.0000000000000513",
    "Brignole M et al. 2018 ESC Guidelines for the diagnosis and management of syncope (Eur Heart J 2018;39:1883) — características de alto e baixo risco na emergência, hipotensão ortostática.",
    "Shen WK et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients With Syncope (Circulation 2017;136:e60).",
    "Thiruganasambandamoorthy V et al. Multicenter Emergency Department Validation of the Canadian Syncope Risk Score (JAMA Intern Med 2020;180:737).",
    "Edlow JA et al. Guidelines for reasonable and appropriate care in the emergency department 3 (GRACE-3): acute dizziness and vertigo in the ED (Acad Emerg Med 2023;30:442).",
    "Kattah JC et al. HINTS to diagnose stroke in the acute vestibular syndrome (Stroke 2009;40:3504) e Newman-Toker DE et al. HINTS outperforms ABCD2 to screen for stroke in acute continuous vertigo and dizziness (Acad Emerg Med 2013;20:986) — HINTS plus.",
    "Newman-Toker DE, Edlow JA. TiTrATE: a novel, evidence-based approach to diagnosing acute dizziness and vertigo (Neurol Clin 2015;33:577).",
    "Chandrasekhar SS et al. AAO-HNS Clinical Practice Guideline: Sudden Hearing Loss (Update) (Otolaryngol Head Neck Surg 2019;161:S1).",
    "Conferido em: Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 20 — Perda transitória da consciência e cap. 59 — Síndromes vertiginosas agudas; Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 23 — Syncope e cap. 24 — Dizziness and Vertigo."
  ] },
{ id: "dor-abdominal", nome: "Dor abdominal", cor: "green",
  alarme: [
    { t: "Hipotensão, taquicardia, pele fria ou confusão", acao: "Instável: sala de emergência, dois acessos, monitor. Pensar em sangramento (aneurisma roto, gravidez ectópica), sepse de foco abdominal ou isquemia; cirurgião cedo." },
    { t: "Abdome em tábua, defesa involuntária ou descompressão dolorosa", acao: "Peritonite: jejum, exames, imagem (TC) e avaliação cirúrgica; não liberar." },
    { t: "Dor intensa e súbita, desproporcional ao exame, em idoso, com fibrilação atrial ou doença vascular", acao: "Isquemia mesentérica: angiotomografia de abdome o quanto antes e cirurgia com urgência. Lactato normal não exclui." },
    { t: "Dor abdominal ou lombar súbita com massa pulsátil, hipotensão ou síncope", acao: "Aneurisma de aorta roto: acionar cirurgia vascular já; ultrassom à beira do leito, sem atrasar a transferência." },
    { t: "Mulher em idade fértil com dor pélvica, atraso menstrual, sangramento vaginal ou desmaio", acao: "Beta-hCG em toda mulher em idade fértil. Positivo com dor: ultrassom transvaginal (gravidez ectópica). Instável: ginecologia imediata." },
    { t: "Gestante a partir de 20 semanas com dor epigástrica ou no hipocôndrio direito, dor uterina forte, útero endurecido ou sangramento vaginal", acao: "Medir PA: pensar em pré-eclâmpsia ou síndrome HELLP (ver pré-eclâmpsia) ou descolamento de placenta; obstetrícia com urgência; não tratar como dispepsia." },
    { t: "Dor súbita no testículo ou em fossa ilíaca com náusea e vômitos, em jovem", acao: "Torção de testículo ou de ovário: urologia ou ginecologia já; ultrassom com Doppler só se não atrasar a cirurgia (suspeita forte = exploração cirúrgica). O tempo salva o órgão." },
    { t: "Vômitos, parada de gases e fezes e distensão; cirurgia abdominal prévia ou hérnia endurecida e dolorosa", acao: "Obstrução ou hérnia encarcerada: jejum, sonda nasogástrica se vômitos, imagem e cirurgião." },
    { t: "Febre com icterícia, ou dor no hipocôndrio direito com febre", acao: "Colangite ou colecistite: hemoculturas, antibiótico, ultrassom e cirurgia; com hipotensão ou confusão, ver sepse." },
    { t: "Idoso (65 anos ou mais), imunossuprimido ou em uso de corticoide", acao: "Exame e exames iniciais enganam: limiar baixo para TC e reavaliação antes da alta." },
    { t: "Dor epigástrica em idoso, diabético ou com fatores de risco cardiovascular", acao: "ECG em até 10 minutos: síndrome coronariana pode se apresentar como dor abdominal." }
  ],
  perguntar: [
    "Onde dói, como começou (súbita ou gradual), se migrou (umbigo para fossa ilíaca direita) e para onde irradia (dorso, ombro, virilha)",
    "Vômitos, diarreia, parada de gases e fezes, sangue no vômito ou nas fezes, febre, icterícia, ardência ou sangue na urina",
    "Mulher: data da última menstruação, chance de gravidez, sangramento ou corrimento",
    "Cirurgias abdominais, hérnia, cálculos, álcool, fibrilação atrial, aneurisma, imunossupressão, anticoagulante, anti-inflamatório",
    "Sinais vitais completos e glicemia capilar (cetoacidose também causa dor abdominal)",
    "Exame: inspeção (hérnias, cicatrizes, equimose em flanco), palpação de todo o abdome, descompressão, Murphy, Giordano, massa pulsátil, pulsos femorais, regiões inguinais e testículos no homem",
    "Toque retal se houver suspeita de sangramento digestivo"
  ],
  caminhos: [
    { rot: "Dor abdominal aguda indiferenciada: abordagem inicial e analgesia (não atrasa o diagnóstico)", conduta: "dor-abdominal" },
    { rot: "Cólica renal ou biliar", conduta: "colica" },
    { rot: "Ardência urinária, febre e dor lombar (cistite, pielonefrite)", conduta: "itu" },
    { rot: "Queimação epigástrica, azia", conduta: "dispepsia" },
    { rot: "Diarreia e vômitos", conduta: "geca" },
    { rot: "Hematêmese ou melena", conduta: "hda" },
    { rot: "Dor pélvica com corrimento, febre ou dor à mobilização do colo", conduta: "dip" }
  ],
  escores: ["AIR ou Adult Appendicitis Score (apendicite)", "Critérios de Tóquio 2018 (colangite e colecistite)"],
  fontes: [
    "Brasil. Ministério da Saúde. Manual de Gestação de Alto Risco, 2022: dor epigástrica ou no hipocôndrio direito como sinal de gravidade da pré-eclâmpsia; descolamento prematuro de placenta.",
    "Podda M et al. Diagnosis and Treatment of Acute Appendicitis: 2025 Edition of the WSES Jerusalem Guidelines (JAMA Surg, publicado em 28/01/2026); Di Saverio S et al. 2020 update (World J Emerg Surg 2020;15:27) — escores AIR e AAS, idosos e imunossuprimidos.",
    "Scheirey CD et al. ACR Appropriateness Criteria: Acute Nonlocalized Abdominal Pain (J Am Coll Radiol 2018;15:S217).",
    "Bala M et al. Acute mesenteric ischemia: updated guidelines of the World Society of Emergency Surgery (World J Emerg Surg 2022;17:54).",
    "Wanhainen A et al. ESVS 2024 Clinical Practice Guidelines on the Management of Abdominal Aorto-Iliac Artery Aneurysms (Eur J Vasc Endovasc Surg 2024;67:192).",
    "ACOG Practice Bulletin 193: Tubal Ectopic Pregnancy (Obstet Gynecol 2018;131:e91) e NICE NG126. Ectopic pregnancy and miscarriage, 2019 (atualizado em 2023).",
    "ACR Appropriateness Criteria: Acute Onset of Scrotal Pain — Without Trauma, Without Antecedent Mass: 2024 Update (J Am Coll Radiol 2024;21(11S):S364) e ACOG Committee Opinion 783: Adnexal Torsion in Adolescents (2019).",
    "ten Broek RPG et al. Bologna guidelines for adhesive small bowel obstruction, WSES 2017 update (World J Emerg Surg 2018;13:24) e Birindelli A et al. WSES 2017 guidelines for emergency repair of complicated abdominal wall hernias (World J Emerg Surg 2017;12:37).",
    "Kiriyama S et al. e Yokoe M et al. Tokyo Guidelines 2018 (TG18): colangite e colecistite agudas (J Hepatobiliary Pancreat Sci 2018;25:17 e 25:41).",
    "Gulati M et al. 2021 AHA/ACC Guideline for the Evaluation and Diagnosis of Chest Pain (Circulation 2021;144:e368) — ECG em até 10 min; apresentações atípicas.",
    "Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (Diabetes Care 2024;47:1257).",
    "Manterola C et al. Analgesia in patients with acute abdominal pain (Cochrane Database Syst Rev 2011;CD005660).",
    "Conferido em: Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 25 — Dor abdominal (tab. 4, sinais de alarme); Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 16 — Abdominal Pain."
  ] },
{ id: "dor-toracica", nome: "Dor torácica", cor: "rose",
  alarme: [
    { t: "ECG com supradesnivelamento de ST ou equivalente (infarto posterior, padrão de De Winter)", acao: "IAM com supra: acionar reperfusão já (trombólise ou transferência para angioplastia); ver SCA." },
    { t: "Dor em aperto, em repouso ou ao esforço, com sudorese, náusea, dispneia ou irradiação para braço ou mandíbula", acao: "Provável SCA: monitor, ECG seriado e troponina pelo algoritmo do serviço; não liberar antes de terminar o protocolo." },
    { t: "Hipotensão, choque, arritmia, síncope ou dispneia com estertores", acao: "Sala de emergência, monitor e desfibrilador à mão; tratar a causa (SCA, TEP, tamponamento, arritmia, edema agudo de pulmão)." },
    { t: "Dor súbita, muito intensa ou \"rasgando\", no tórax, dorso ou abdome; pior se assimetria de pulso ou PA entre os braços, déficit neurológico, sopro diastólico novo ou hipotensão", acao: "Dissecção de aorta: calcular ADD-RS; 2 ou mais pontos, angiotomografia de aorta já; 0 a 1, D-dímero negativo ajuda a afastar. Não liberar." },
    { t: "Dispneia súbita, taquicardia, hipoxemia, hemoptise ou dor pleurítica com fator de risco para trombose", acao: "Suspeita de TEP: Wells ou Genebra; baixa probabilidade → PERC; senão, D-dímero ou angiotomografia. Instável: sala de emergência." },
    { t: "Dor pleurítica súbita com dispneia e murmúrio diminuído de um lado", acao: "Pneumotórax: radiografia ou ultrassom. Com instabilidade (hipotensão ou hipoxemia grave, taquicardia, jugulares ingurgitadas): hipertensivo, descompressão imediata, sem esperar imagem. Desvio de traqueia é tardio e muitas vezes ausente." },
    { t: "Dor que melhora inclinado para a frente (pericardite) com febre, hipotensão ou jugulares ingurgitadas", acao: "Pericardite com sinal de gravidade ou tamponamento: ecocardiograma à beira do leito e internação." },
    { t: "Dor após vômitos intensos, com enfisema subcutâneo ou dor para engolir", acao: "Ruptura de esôfago: jejum, TC de tórax com contraste e cirurgia; não liberar." },
    { t: "Idoso, mulher ou diabético com dispneia, epigastralgia, náusea, sudorese ou síncope, sem dor típica", acao: "Equivalente anginoso: seguir o protocolo de dor torácica (ECG em até 10 min e troponina)." }
  ],
  perguntar: [
    "ECG de 12 derivações lido por médico em até 10 minutos da chegada, antes de completar a história",
    "Início (súbito ou gradual), duração, caráter (aperto, pontada, rasgando, queimação), relação com esforço, respiração, posição ou palpação, irradiação",
    "Sintomas associados: dispneia, sudorese, náusea, síncope, palpitação, febre, tosse, vômitos",
    "Fatores de risco coronário: idade, hipertensão, diabetes, tabagismo, colesterol, doença coronária prévia, história familiar, cocaína",
    "Fatores de risco para trombose: cirurgia ou imobilização recente, câncer, trombose prévia, estrogênio, gestação ou puerpério",
    "Exame: PA nos dois braços, pulsos, ausculta (sopro, atrito, estertores, murmúrio), jugulares, panturrilhas, enfisema subcutâneo",
    "Troponina pelo algoritmo do serviço (0/1 h ou 0/2 h) e HEART para decidir a alta"
  ],
  caminhos: [
    { rot: "Síndrome coronariana aguda", conduta: "sca" },
    { rot: "TEP ou TVP", conduta: "tep" },
    { rot: "Dispneia com congestão (edema agudo de pulmão)", conduta: "eap" },
    { rot: "Palpitação ou taquicardia com a dor", conduta: "taquicardia" },
    { rot: "Pericardite sem sinal de gravidade: dor pleurítica que melhora inclinado para a frente, atrito, supra difuso" },
    { rot: "Queimação retroesternal ou epigástrica, depois de afastar causa cardíaca", conduta: "dispepsia" },
    { rot: "Crise de ansiedade, só depois de ECG e exclusão das causas graves", conduta: "ansiedade" }
  ],
  escores: ["HEART (dor torácica)", "ADD-RS (dissecção de aorta)", "Wells ou Genebra e PERC (TEP)"],
  fontes: [
    "Leigh-Smith S, Harris T. Tension pneumothorax — time for a re-think? (Emerg Med J 2005;22:8): desvio de traqueia é sinal tardio e pouco frequente.",
    "Mazzolai L et al. 2024 ESC Guidelines for the management of peripheral arterial and aortic diseases (Eur Heart J 2024;45:3538): dissecção de aorta e ADD-RS.",
    "Silva PGMB et al. Diretriz Brasileira de Avaliação e Diagnóstico da Dor Torácica na Emergência — 2025 (Arq Bras Cardiol 2025;122(9):e20250620). https://abccardiol.org/en/article/brazilian-guideline-for-the-evaluation-and-diagnosis-of-chest-pain-in-the-emergency-department-2025/",
    "Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the Evaluation and Diagnosis of Chest Pain (Circulation 2021;144:e368).",
    "Rao SV et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes (Circulation 2025). https://www.ahajournals.org/doi/10.1161/CIR.0000000000001309",
    "Isselbacher EM et al. 2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease (Circulation 2022;146:e334) e Mazzolai L et al. 2024 ESC Guidelines for the management of peripheral arterial and aortic diseases (Eur Heart J 2024;45:3538) — ADD-RS com D-dímero.",
    "Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism (Eur Heart J 2020;41:543).",
    "Roberts ME et al. British Thoracic Society Guideline for pleural disease (Thorax 2023;78:s1) — pneumotórax.",
    "Schulz-Menger J et al. 2025 ESC Guidelines for the management of myocarditis and pericarditis (Eur Heart J 2025;46:3952).",
    "Chirica M et al. Esophageal emergencies: WSES guidelines (World J Emerg Surg 2019;14:26).",
    "Conferido em: Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 19 — Dor torácica; Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 15 — Chest Discomfort."
  ] },
{ id: "febre", nome: "Febre (adulto)", cor: "lime",
  alarme: [
    { t: "Hipotensão, confusão, respiração rápida, pele moteada, oligúria ou SpO2 baixa", acao: "Sepse: triagem por NEWS2 (não qSOFA sozinho), lactato, hemoculturas; antibiótico em até 1 h no choque ou sepse provável, em até 3 h se só possível. Ver sepse." },
    { t: "Rigidez de nuca ou confusão com febre; púrpura (manchas maiores que 2 mm que não somem à pressão); ou petéquias que se espalham rápido ou em paciente com aspecto grave", acao: "Meningite ou meningococcemia: precaução para gotículas, hemoculturas e antibiótico imediato, sem esperar punção ou TC; notificar. Petéquias poucas, com bom estado geral e quadro de dengue: grupo B (abaixo), reexaminando a pele." },
    { t: "Dengue com sinal de alarme: dor abdominal intensa e contínua, vômitos persistentes, sangramento de mucosa, tontura ao levantar, letargia, hepatomegalia ou derrames", acao: "Dengue com sinais de alarme (grupo C): hidratação venosa imediata na unidade, hemograma e reavaliação horária; internar. Ver dengue." },
    { t: "Dengue com choque ou gravidade: taquicardia com extremidades frias, pulso fraco, enchimento capilar > 2 s, PA diferencial ≤ 20 mmHg (ex.: 100/80), hipotensão, oligúria, desconforto respiratório (derrame), sangramento grave ou confusão", acao: "Dengue grave (grupo D): expansão volêmica imediata na sala de emergência e vaga de UTI. Ver dengue." },
    { t: "Suspeita de dengue em gestante, idoso, com comorbidade ou risco social, ou com prova do laço positiva ou petéquias", acao: "Dengue grupo B: hemograma obrigatório e observação com hidratação oral até o resultado; não liberar antes." },
    { t: "Febre em quem faz quimioterapia, tem HIV avançado, transplante, asplenia ou usa imunossupressor", acao: "Quimioterapia recente: neutropenia febril até prova em contrário; hemograma e hemoculturas já e antibiótico empírico em até 1 h da triagem, sem esperar o hemograma; alta só se baixo risco pelo MASCC. Asplenia: risco de sepse fulminante; com qualquer sinal sistêmico, antibiótico em até 1 h (ver sepse). Transplante, HIV avançado ou imunossupressor: limiar baixo para exames, hemoculturas e internação; MASCC não se aplica." },
    { t: "Febre súbita com cefaleia e mialgia após carrapato, capivara, cavalo ou mata (até 15 dias antes), ou manchas que viram petéquias", acao: "Febre maculosa: doxiciclina já na suspeita, sem esperar exame (não ter visto o carrapato não exclui). Gravidade (confusão, convulsão, hipotensão, oligúria, falta de ar, sangramento, icterícia, edema importante, exantema que vira petéquia, púrpura ou equimose) ou vômitos: doxiciclina EV e internar. Notificar." },
    { t: "Febre com icterícia, sangramento, urina escassa, falta de ar ou escarro com sangue, sobretudo após enchente, lama, esgoto ou ratos (até 30 dias antes) ou em área de febre amarela sem vacina", acao: "Leptospirose (ou febre amarela) com sinal de alerta: internar; hemograma, função renal e hepática, potássio, CPK e radiografia de tórax; na suspeita de leptospirose, antibiótico já; notificar. Exposição de risco sem sinal de alerta: tratar leptospirose em casa e reavaliar em 24 a 72 h." },
    { t: "Esteve em área de malária (região amazônica ou exterior) de 8 a 30 dias antes da febre", acao: "Gota espessa ou teste rápido no mesmo dia; confusão, icterícia, sangramento, hipoglicemia ou dispneia = malária grave, internar." },
    { t: "Febre com dispneia, desconforto respiratório ou SpO2 < 95% em ar ambiente", acao: "SRAG: internar; oseltamivir já na suspeita, sem esperar exame (colher swab antes, se não atrasar); radiografia; notificar. Ver pneumonia e síndrome gripal." }
  ],
  perguntar: [
    "Há quantos dias: na dengue, a fase crítica começa com a queda da febre, entre o 3º e o 7º dia",
    "Foco: tosse ou falta de ar, ardência urinária ou dor lombar, dor abdominal, diarreia, dor de garganta ou de ouvido, pele vermelha e quente, rigidez de nuca",
    "Manchas na pele, sangramentos, dor atrás dos olhos, dor nas articulações (intensa e incapacitante na chikungunya)",
    "Exposição: casos de dengue ou chikungunya em casa ou no bairro, viagem (Amazônia, mata, exterior), enchente ou lama, carrapato, vacina de febre amarela",
    "Gestação, 65 anos ou mais, quimioterapia, imunossupressão, comorbidades",
    "Remédios já usados: anti-inflamatório e AAS (evitar na suspeita de dengue e chikungunya)",
    "Exame: FR, SpO2, PA deitado e em pé, enchimento capilar, consciência, rigidez de nuca, pele (petéquias, exantema), prova do laço na suspeita de dengue, abdome (hepatomegalia) e busca do foco"
  ],
  caminhos: [
    { rot: "Dengue: febre de 2 a 7 dias com 2 ou mais de náusea, vômitos, exantema, mialgia, artralgia, cefaleia, dor retro-orbital, petéquias, prova do laço positiva ou leucopenia; classificar de A a D, sem AINE nem AAS", conduta: "dengue" },
    { rot: "Chikungunya: febre de até 7 dias com dor articular intensa de início súbito; sem AINE nem corticoide na fase aguda; grupo de risco (gestante, mais de 65 anos, comorbidade) em observação e reavaliação diária" },
    { rot: "Sepse", conduta: "sepse" },
    { rot: "Síndrome gripal", conduta: "gripe" },
    { rot: "Pneumonia", conduta: "pac" },
    { rot: "Infecção urinária ou pielonefrite", conduta: "itu" },
    { rot: "Dor de garganta com placas", conduta: "amigdalite" }
  ],
  escores: ["NEWS2 (triagem de sepse; não usar qSOFA isoladamente)", "Classificação de risco da dengue (grupos A, B, C e D)", "MASCC (neutropenia febril)"],
  fontes: [
    "NICE NG240. Meningitis (bacterial) and meningococcal disease: recognition, diagnosis and management, 2024 (rec. 1.1.4, 1.1.9 e 1.1.10): púrpura > 2 mm, exantema que progride, sinais de meningite.",
    "Ministério da Saúde. Leptospirose: diagnóstico e manejo clínico, 2014: caso suspeito (exposição nos 30 dias anteriores), sinais de alerta (quadro 1), antibiótico na suspeita e indicações de internação.",
    "Nota Técnica nº 49/2026-CGZHA/DEDT/SVSA/MS (febre maculosa): doxiciclina para todo caso suspeito; sinais de gravidade; doxiciclina EV e internação nos graves.",
    "Taplitz RA et al. Outpatient management of fever and neutropenia — ASCO/IDSA (J Clin Oncol 2018;36:1443; atualização 2023); Ladhani SN et al. Infection in absent or hypofunctional spleen — BSH (Br J Haematol 2024;204:1672).",
    "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (definição de caso, grupos A a D, sinais de alarme e de choque, fase crítica).",
    "Ministério da Saúde. Chikungunya: manejo clínico, 2017 (caso suspeito, grupos de risco, sinais de gravidade; não usar AINE nem corticoide na fase aguda).",
    "Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026 (NEWS/NEWS2 em vez de qSOFA isolado; antibiótico em até 1 h no choque ou sepse provável e em até 3 h na sepse possível). https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026",
    "Tunkel AR et al. IDSA Practice Guidelines for the Management of Bacterial Meningitis (Clin Infect Dis 2004;39:1267) e van de Beek D et al. ESCMID guideline (Clin Microbiol Infect 2016;22:S37).",
    "Taplitz RA et al. Outpatient Management of Fever and Neutropenia in Adults Treated for Malignancy: ASCO/IDSA Clinical Practice Guideline Update (J Clin Oncol 2018;36:1443; atualizado em 2023) — antibiótico em até 1 h da triagem, MASCC.",
    "Ministério da Saúde. Nota Técnica nº 49/2026-CGZHA/DEDT/SVSA/MS — febre maculosa: caso suspeito, sinais de gravidade e doxiciclina na suspeita.",
    "Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., 2024 (malária: caso suspeito com deslocamento de 8 a 30 dias antes; leptospirose; febre amarela; meningites).",
    "Ministério da Saúde. Leptospirose: diagnóstico e manejo clínico, 2014.",
    "Ministério da Saúde. Guia de Manejo e Tratamento de Influenza 2023 (síndrome respiratória aguda grave: dispneia, desconforto respiratório ou SpO2 < 95%).",
    "Conferido em: Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 16 — Febre e síndromes hipertérmicas e cap. 50 — Dengue; Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 20 — Fever e cap. 215 — Arthropod-Borne and Rodent-Borne Virus Infections."
  ] },
{ id: "tosse-dispneia", nome: "Tosse e dispneia", cor: "sky",
  alarme: [
    { t: "SpO2 < 90%, FR > 30, uso de musculatura acessória, fala só em palavras, cianose, confusão ou sonolência", acao: "Insuficiência respiratória: sala de emergência, oxigênio, monitor e gasometria; preparar ventilação não invasiva ou intubação." },
    { t: "Asma sem conseguir falar, beber ou deitar, FR > 30, uso de musculatura acessória, SpO2 < 92% em ar ambiente, pico de fluxo < 50% ou murmúrio muito diminuído; ou sonolência, confusão, cianose ou tórax silencioso", acao: "Crise grave: tratar já na sala de emergência (ver asma); oxigênio só se SpO2 < 92%, alvo 92–95%. Sonolência, confusão, cianose ou tórax silencioso: ameaça à vida, chamar UTI ou anestesia. Com anafilaxia: adrenalina IM primeiro." },
    { t: "Pneumonia com confusão, FR ≥ 30, PAS < 90 ou PAD ≤ 60, acometimento multilobar ou hipoxemia", acao: "CURB-65 (sem ureia, CRB-65): 2, internação curta ou observação; 3 ou mais, internar e avaliar UTI. Choque com vasopressor ou necessidade de ventilação: UTI. Ver pneumonia." },
    { t: "DPOC com piora da falta de ar e SpO2 baixa, sonolência ou confusão", acao: "Exacerbação grave com possível retenção de CO2: oxigênio controlado (alvo 88–92%), gasometria; ventilação não invasiva se acidose respiratória. Ver DPOC." },
    { t: "Ortopneia, estertores, edema de pernas, jugulares ingurgitadas ou PA muito alta", acao: "Insuficiência cardíaca descompensada ou edema agudo de pulmão: sentar, oxigênio, ECG e troponina (procurar SCA ou arritmia como gatilho). Ver edema agudo de pulmão." },
    { t: "Dispneia súbita com dor pleurítica, taquicardia, hemoptise ou fator de risco para trombose", acao: "Suspeita de TEP: Wells ou Genebra, PERC se baixa probabilidade, D-dímero ou angiotomografia. Ver TEP." },
    { t: "Dispneia súbita com dor de um lado e murmúrio diminuído", acao: "Pneumotórax: radiografia ou ultrassom. Com instabilidade (hipotensão ou hipoxemia grave, taquicardia, jugulares ingurgitadas): hipertensivo, descompressão imediata, sem esperar imagem." },
    { t: "Chiado ou estridor com inchaço de lábios ou língua, urticária ou vômitos após alimento, remédio ou picada", acao: "Anafilaxia: adrenalina intramuscular imediata e sala de emergência. Ver anafilaxia." },
    { t: "Hemoptise volumosa, ou com queda de saturação ou instabilidade", acao: "Hemoptise ameaçadora: sala de emergência, proteger a via aérea, deitar sobre o lado que sangra; TC de tórax e pneumologia ou broncoscopia." },
    { t: "Tosse há 3 semanas ou mais (qualquer duração se HIV, prisão, situação de rua ou indígena), com ou sem febre à tarde, suor noturno ou emagrecimento", acao: "Suspeita de tuberculose: máscara cirúrgica no paciente, escarro para teste rápido molecular e radiografia de tórax." }
  ],
  perguntar: [
    "Início (súbito ou gradual) e duração da tosse: aguda < 3 semanas, subaguda 3 a 8, crônica > 8",
    "Febre, escarro, sangue no escarro, dor ao respirar, chiado, crises de tosse com guincho ou vômito",
    "Falta de ar deitado ou que acorda à noite, inchaço nas pernas, ganho de peso",
    "Asma ou DPOC: crises anteriores, intubação ou internação prévia, uso de broncodilatador de resgate e de corticoide, adesão ao tratamento",
    "Tabagismo, contato com tuberculose, gripe ou covid, viagem ou imobilização recente, uso de enalapril ou captopril (tosse seca)",
    "Gestação, 60 anos ou mais, imunossupressão, comorbidades (grupo de risco para influenza)",
    "Exame: FR, SpO2, FC, PA, temperatura, consciência, capacidade de fala, musculatura acessória, ausculta (sibilos, estertores, murmúrio), jugulares, edema e panturrilhas"
  ],
  caminhos: [
    { rot: "Pneumonia: febre, tosse, estertores localizados ou imagem compatível", conduta: "pac" },
    { rot: "Crise de asma", conduta: "asma" },
    { rot: "DPOC exacerbada", conduta: "dpoc" },
    { rot: "Síndrome gripal sem falta de ar e com SpO2 ≥ 95%: febre súbita com tosse ou dor de garganta e dor de cabeça, no corpo ou nas juntas. Com dispneia, desconforto ou SpO2 ≤ 94%: é SRAG, internar e oseltamivir já (ver febre)", conduta: "gripe" },
    { rot: "Tosse aguda, subaguda ou crônica, coqueluche", conduta: "tosse" },
    { rot: "Insuficiência cardíaca ou edema agudo de pulmão", conduta: "eap" },
    { rot: "TEP", conduta: "tep" }
  ],
  escores: ["CURB-65 (pneumonia)", "Gravidade da crise de asma (GINA)", "Wells ou Genebra e PERC (TEP)", "NEWS2"],
  fontes: [
    "NICE NG250. Pneumonia: diagnosis and management, 2025 (rec. 1.2.3 e 1.2.9): CURB-65 e CRB-65.",
    "Leigh-Smith S, Harris T. Tension pneumothorax — time for a re-think? (Emerg Med J 2005;22:8).",
    "Metlay JP et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia — ATS/IDSA (Am J Respir Crit Care Med 2019;200:e45) — critérios de gravidade.",
    "Lim WS et al. Defining community acquired pneumonia severity on presentation to hospital: CURB-65 (Thorax 2003;58:377) e Corrêa RA et al. Recomendações da SBPT para PAC em adultos imunocompetentes (J Bras Pneumol 2018;44:405).",
    "Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention, 2026 — Box 9-6: critérios de crise grave (não fala, não bebe ou não deita; SpO2 < 92% em ar ambiente; FR > 30; musculatura acessória; tórax silencioso ou pouco murmúrio; PFE ou VEF1 < 50%) e de ameaça à vida (sonolência, confusão, cianose); oxigênio com alvo de 92–95%.",
    "Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2026 Report (exacerbação; oxigênio com alvo de 88–92%; ventilação não invasiva na acidose respiratória). https://goldcopd.org",
    "McDonagh TA et al. 2021 ESC Guidelines for heart failure (Eur Heart J 2021;42:3599) e atualização focada de 2023.",
    "Konstantinides SV et al. 2019 ESC Guidelines for acute pulmonary embolism (Eur Heart J 2020;41:543).",
    "Roberts ME et al. British Thoracic Society Guideline for pleural disease (Thorax 2023;78:s1).",
    "Resuscitation Council UK. Emergency treatment of anaphylaxis, 2021, e Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020;13:100472).",
    "Davidson K, Shojaee S. Managing Massive Hemoptysis (Chest 2020;157:77).",
    "Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019 (sintomático respiratório e populações vulneráveis).",
    "Ministério da Saúde. Guia de Manejo e Tratamento de Influenza 2023 (grupos de risco e síndrome respiratória aguda grave).",
    "Irwin RS et al. Classification of Cough as a Symptom in Adults and Management Algorithms — CHEST Guideline (Chest 2018;153:196).",
    "Conferido em: Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 18 — Dispneia, cap. 22 — Hemoptise, cap. 41 — Asma e cap. 43 — PAC; Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 39 — Dyspnea e cap. 40 — Cough."
  ] }
];
if (typeof module!=="undefined") module.exports={QUEIXAS};

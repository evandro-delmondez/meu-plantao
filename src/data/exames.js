// Exames e encaminhamento na porta (adulto): por queixa ("q:<id da queixa>") e por conduta ("<id da conduta>").
// Cada item: {t: texto curto (≤ 200 caracteres), f: [números das fontes, contando de 1]}.
// Grupos: encaminhar (o que muda o destino), pedir (quando o exame muda a conduta), naoPedir (o que não acrescenta).
// Divergência entre fontes boas: as duas versões no mesmo item, cada uma com a sua fonte; o médico decide.
// Gerado de .rascunhos/exames-conferido-*.md (conferência independente, 2026-10-22).
const EXAMES = {
 "q:cefaleia": {
  "encaminhar": [
   {
    "t": "Sala vermelha: rebaixamento de consciência, déficit focal agudo, crise convulsiva, sinais de herniação ou instabilidade",
    "f": [
     2,
     13
    ]
   },
   {
    "t": "Neurocirurgia: hemorragia subaracnoide ou hematoma intracraniano na TC",
    "f": [
     3
    ]
   },
   {
    "t": "Protocolo de AVC: déficit focal agudo dentro da janela de reperfusão (até 24 h do último momento bem)",
    "f": [
     6
    ]
   },
   {
    "t": "Sala vermelha + precaução para gotículas: febre com rigidez de nuca, petéquias ou púrpura (meningite/meningococcemia)",
    "f": [
     7,
     8
    ]
   },
   {
    "t": "Oftalmologia (urgente): dor ocular com olho vermelho, midríase média fixa, córnea turva e baixa visual (glaucoma agudo)",
    "f": [
     9
    ]
   },
   {
    "t": "Obstetrícia: gestante ≥ 20 semanas ou puérpera com cefaleia e PA ≥ 140/90 (pré-eclâmpsia com sinal de gravidade)",
    "f": [
     10,
     11
    ]
   }
  ],
  "pedir": [
   {
    "t": "TC de crânio sem contraste: cefaleia súbita com pico em até 1 h (thunderclap) ou regra de Ottawa para HSA positiva",
    "f": [
     4,
     1
    ]
   },
   {
    "t": "TC sem contraste normal até 6 h do início (TC de 3ª geração, laudo por radiologista, exame neurológico normal) afasta HSA",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Punção lombar ou angio-TC: TC normal após 6 h do início com suspeita mantida de HSA",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "TC sem contraste (ou RM): déficit focal novo, papiledema, alteração do estado mental ou cefaleia nova após 50 anos",
    "f": [
     2,
     13
    ]
   },
   {
    "t": "TC sem contraste (ou RM): cefaleia nova em anticoagulado, imunossuprimido (HIV, câncer) ou gestante com sinal de alarme",
    "f": [
     2,
     13
    ]
   },
   {
    "t": "Angio-TC de vasos cervicais e intracranianos: suspeita de dissecção (cervicalgia + Horner ou déficit) ou de aneurisma",
    "f": [
     2
    ]
   },
   {
    "t": "Venografia por TC ou RM: suspeita de trombose venosa (puerpério, estrogênio, cefaleia progressiva com papiledema)",
    "f": [
     2
    ]
   },
   {
    "t": "VHS e PCR urgentes: ≥ 50 anos com cefaleia nova, claudicação de mandíbula ou sintomas visuais (arterite de células gigantes)",
    "f": [
     12
    ]
   },
   {
    "t": "TC antes da punção na suspeita de meningite só se imunossupressão, doença do SNC, convulsão nova, papiledema, rebaixamento ou déficit",
    "f": [
     7
    ]
   },
   {
    "t": "PA e proteinúria: gestante ≥ 20 semanas ou puérpera com cefaleia (rastrear pré-eclâmpsia); TC de crânio não é contraindicada na gestação",
    "f": [
     10,
     16
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Neuroimagem em cefaleia estável com critérios de enxaqueca e exame neurológico normal",
    "f": [
     14,
     15
    ]
   },
   {
    "t": "TC de crânio em cefaleia crônica ou recorrente igual às anteriores, sem sinal de alarme",
    "f": [
     2,
     13
    ]
   },
   {
    "t": "RX de crânio ou de seios da face para investigar cefaleia",
    "f": [
     2
    ]
   }
  ],
  "div": [
   {
    "t": "HSA com TC normal após 6 h: punção lombar ou angio-TC são opções equivalentes; escolher conforme o serviço",
    "f": [
     1
    ]
   }
  ],
  "fontes": [
   "Godwin SA et al. ACEP Clinical Policy: critical issues in the evaluation and management of adult patients presenting to the ED with acute headache. Ann Emerg Med 2019;74(4):e41-e74. doi:10.1016/j.annemergmed.2019.07.009. PMID 31543134",
   "Utukuri PS et al. ACR Appropriateness Criteria Headache: 2022 Update. J Am Coll Radiol 2023;20(5S):S70-S93. doi:10.1016/j.jacr.2023.02.018. PMID 37236753",
   "Hoh BL et al. 2023 Guideline for the management of patients with aneurysmal subarachnoid hemorrhage (AHA/ASA). Stroke 2023;54(7):e314-e370. PMID 37212182",
   "Perry JJ et al. Validation of the Ottawa subarachnoid hemorrhage rule in patients with acute headache. JAMA 2013;310(12):1248-55. doi:10.1001/jama.2013.278018. PMID 24065011",
   "Perry JJ et al. Sensitivity of CT performed within six hours of onset of headache for diagnosis of SAH. BMJ 2011;343:d4277. PMID 21768192",
   "Prabhakaran S et al. 2026 Guideline for the early management of patients with acute ischemic stroke (AHA/ASA). Stroke 2026;57(8):e316-e436. doi:10.1161/STR.0000000000000513. PMID 41582814 (substitui Powers 2019)",
   "Tunkel AR et al. IDSA practice guidelines for the management of bacterial meningitis. Clin Infect Dis 2004;39(9):1267-84. PMID 15494903",
   "van de Beek D et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect 2016;22 Suppl 3:S37-62. PMID 27062097",
   "Gedde SJ et al. Primary Angle-Closure Disease Preferred Practice Pattern (AAO). Ophthalmology 2021;128(1):P30-P70. PMID 34933744",
   "ACOG Practice Bulletin 222: Gestational hypertension and preeclampsia. Obstet Gynecol 2020;135(6):e237-e260. PMID 32443079",
   "Ministério da Saúde. Manual de gestação de alto risco. Brasília, 2022",
   "Mackie SL et al. BSR guideline for the management of giant cell arteritis. Rheumatology 2020;59(3):e1-e23. PMID 31970405",
   "Do TP et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology 2019;92(3):134-44. doi:10.1212/WNL.0000000000006697. PMID 30587518",
   "Loder E et al. Choosing Wisely in headache medicine: the American Headache Society's list. Headache 2013;53(10):1651-9. PMID 24266337",
   "Langer-Gould AM et al. The American Academy of Neurology's top five Choosing Wisely recommendations. Neurology 2013;81(11):1004-11. PMID 23430685",
   "ACR–SPR Practice Parameter for imaging pregnant or potentially pregnant patients with ionizing radiation (revisão 2023): TC de crânio tem exposição fetal desprezível. gravitas.acr.org/PPTS"
  ]
 },
 "q:tontura-sincope": {
  "encaminhar": [
   {
    "t": "Sala vermelha: síncope com dor torácica, dispneia, arritmia no ECG, hipotensão persistente ou sinal de sangramento",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Cardiologia / internação: síncope de alto risco (no esforço, deitado, palpitação antes, cardiopatia estrutural, morte súbita familiar)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Cardiologia: ECG com isquemia aguda, BAV Mobitz II ou total, pausa > 3 s acordado, FA < 40 bpm, TV, QTc > 460 ms ou Brugada tipo 1",
    "f": [
     1
    ]
   },
   {
    "t": "Protocolo de AVC / Neurologia: síndrome vestibular aguda com HINTS central ou duvidoso, déficit, ataxia de marcha grave ou perda auditiva nova",
    "f": [
     3
    ]
   },
   {
    "t": "Cirurgia vascular / sala vermelha: síncope com dor abdominal ou lombar, hipotensão e massa pulsátil (aneurisma roto)",
    "f": [
     7
    ]
   },
   {
    "t": "Ginecologia: mulher em idade fértil com síncope e dor pélvica, sangramento ou atraso menstrual (gestação ectópica)",
    "f": [
     8
    ]
   }
  ],
  "pedir": [
   {
    "t": "ECG de 12 derivações: toda síncope",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Glicemia capilar: alteração transitória de consciência sem clara síncope (hipoglicemia simula síncope)",
    "f": [
     1
    ]
   },
   {
    "t": "Hemograma/hematócrito: suspeita de sangramento ou anemia",
    "f": [
     1
    ]
   },
   {
    "t": "Beta-hCG: mulher em idade fértil com síncope e dor abdominal/pélvica, sangramento ou atraso menstrual",
    "f": [
     8
    ]
   },
   {
    "t": "Troponina: síncope com dor torácica ou suspeita de causa cardíaca isquêmica",
    "f": [
     1
    ]
   },
   {
    "t": "Canadian Syncope Risk Score: apoio à decisão de alta ou observação, junto do julgamento clínico",
    "f": [
     6
    ]
   },
   {
    "t": "HINTS só na vertigem aguda contínua com nistagmo, por examinador treinado; sem nistagmo, avaliar gravidade da ataxia de marcha",
    "f": [
     3
    ]
   },
   {
    "t": "Dix-Hallpike: vertigem episódica desencadeada por posição, de segundos",
    "f": [
     3,
     5
    ]
   },
   {
    "t": "RM com difusão e angio-RM: síndrome vestibular aguda com HINTS central ou duvidoso",
    "f": [
     3
    ]
   },
   {
    "t": "Angio-TC ou angio-RM de vasos cervicais e intracranianos: vertigem episódica espontânea com suspeita de AIT",
    "f": [
     3
    ]
   },
   {
    "t": "D-dímero / angio-TC de tórax: síncope com dispneia, taquicardia ou hipoxemia, conforme probabilidade de TEP",
    "f": [
     1,
     9
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "TC de crânio em síncope sem trauma de crânio relevante e com exame neurológico normal",
    "f": [
     10
    ]
   },
   {
    "t": "Doppler de carótidas em síncope simples sem sintomas neurológicos",
    "f": [
     11
    ]
   },
   {
    "t": "EEG em síncope sem sinais de crise epiléptica",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "TC ou angio-TC para afastar AVC na síndrome vestibular aguda: sensibilidade baixa; usar HINTS e, se central, RM",
    "f": [
     3
    ]
   },
   {
    "t": "TC, angio-TC, RM ou teste vestibular na VPPB típica com Dix-Hallpike positivo e sem sinais neurológicos",
    "f": [
     3,
     5
    ]
   },
   {
    "t": "Painel laboratorial amplo de rotina na síncope sem suspeita clínica dirigida",
    "f": [
     2
    ]
   },
   {
    "t": "Ecocardiograma de rotina sem suspeita de cardiopatia estrutural (exame, ECG ou história)",
    "f": [
     2
    ]
   }
  ],
  "div": [
   {
    "t": "Escore de risco na síncope: ACC/AHA aceita como apoio (ACC/AHA/HRS 2017) × ESC: não usar sozinho, não supera o julgamento clínico",
    "f": [
     2,
     1
    ]
   }
  ],
  "fontes": [
   "Brignole M et al. 2018 ESC Guidelines for the diagnosis and management of syncope. Eur Heart J 2018;39(21):1883-1948. doi:10.1093/eurheartj/ehy037. PMID 29562304 (vigente; nova edição prevista para 2027)",
   "Shen WK et al. 2017 ACC/AHA/HRS Guideline for the evaluation and management of patients with syncope. Circulation 2017;136(5):e60-e122. PMID 28280231",
   "Edlow JA et al. Guidelines for reasonable and appropriate care in the emergency department 3 (GRACE-3): acute dizziness and vertigo in the ED (SAEM). Acad Emerg Med 2023;30(5):442-486. doi:10.1111/acem.14728. PMID 37166022",
   "Kattah JC et al. HINTS to diagnose stroke in the acute vestibular syndrome. Stroke 2009;40(11):3504-10. PMID 19762709",
   "Bhattacharyya N et al. Clinical practice guideline: benign paroxysmal positional vertigo (update) (AAO-HNS). Otolaryngol Head Neck Surg 2017;156(3 Suppl):S1-S47. PMID 28248609",
   "Thiruganasambandamoorthy V et al. Development of the Canadian Syncope Risk Score. CMAJ 2016;188(12):E289-98. PMID 27378464; validação: JAMA Intern Med 2020;180(5):737-44. PMID 32202605",
   "Wanhainen A et al. ESVS 2024 Clinical practice guidelines on the management of abdominal aorto-iliac artery aneurysms. Eur J Vasc Endovasc Surg 2024;67(2):192-331. PMID 38307694",
   "Hahn SA et al. ACEP Clinical Policy: early pregnancy. Ann Emerg Med 2017;69(2):241-250. PMID 28126120",
   "Creager MA et al. 2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN Guideline for the evaluation and management of acute pulmonary embolism in adults. J Am Coll Cardiol 2026;87(13):1626-1710. doi:10.1016/j.jacc.2025.11.005. PMID 41712898 (também em Circulation)",
   "ACEP / Choosing Wisely (2013): evitar TC de crânio em síncope com trauma insignificante e exame neurológico normal. choosingwisely.org",
   "Langer-Gould AM et al. AAN top five Choosing Wisely recommendations (não fazer imagem de carótidas na síncope simples). Neurology 2013;81(11):1004-11. PMID 23430685"
  ]
 },
 "q:dor-abdominal": {
  "encaminhar": [
   {
    "t": "Sala vermelha: choque, peritonite difusa, rebaixamento ou dor desproporcional ao exame (isquemia mesentérica)",
    "f": [
     2
    ]
   },
   {
    "t": "Cirurgia Geral: suspeita de apendicite (AIR/AAS de risco alto ou imagem positiva), abdome agudo obstrutivo ou perfurativo, colecistite",
    "f": [
     3,
     5
    ]
   },
   {
    "t": "Cirurgia Geral: hérnia encarcerada ou estrangulada; pneumoperitônio na imagem (víscera perfurada)",
    "f": [
     6,
     3
    ]
   },
   {
    "t": "Cirurgia vascular / sala vermelha: dor abdominal ou lombar com hipotensão e/ou massa pulsátil (suspeita de aneurisma roto)",
    "f": [
     8
    ]
   },
   {
    "t": "Ginecologia: beta-hCG positivo com dor ou sangramento (ectópica), suspeita de torção ovariana, DIP com abscesso tubo-ovariano",
    "f": [
     9,
     10,
     11
    ]
   },
   {
    "t": "Urologia (descompressão urgente): cálculo obstrutivo com infecção, rim único ou bilateral, lesão renal aguda ou dor refratária",
    "f": [
     12
    ]
   },
   {
    "t": "Internação: pancreatite com SIRS persistente ou falência orgânica",
    "f": [
     13
    ]
   },
   {
    "t": "Cardiologia: dor epigástrica com ECG ou troponina alterados (equivalente anginoso)",
    "f": [
     14
    ]
   }
  ],
  "pedir": [
   {
    "t": "Beta-hCG: toda mulher em idade fértil com dor abdominal, antes da imagem",
    "f": [
     1,
     9
    ]
   },
   {
    "t": "ECG: dor epigástrica ou abdominal alta com fatores de risco cardiovascular, idoso, diabético ou sintomas associados (dispneia, sudorese)",
    "f": [
     14
    ]
   },
   {
    "t": "Lipase: dor epigástrica sugestiva; pancreatite = 2 de 3 (dor típica, lipase ou amilase ≥ 3× o LSN, imagem típica)",
    "f": [
     13
    ]
   },
   {
    "t": "US de abdome na pancreatite: pesquisar causa biliar (litíase)",
    "f": [
     13
    ]
   },
   {
    "t": "Hemograma, PCR, função renal, eletrólitos, urina tipo I: dor abdominal com suspeita de causa orgânica",
    "f": [
     1
    ]
   },
   {
    "t": "Bilirrubinas, transaminases, fosfatase alcalina, GGT: dor em hipocôndrio direito ou suspeita de colangite",
    "f": [
     5
    ]
   },
   {
    "t": "US de abdome: primeira escolha na dor em hipocôndrio direito (colecistite, colangite)",
    "f": [
     15,
     5
    ]
   },
   {
    "t": "US pélvica/transvaginal: dor pélvica na mulher em idade fértil",
    "f": [
     10
    ]
   },
   {
    "t": "Gestante com suspeita de apendicite: US com compressão primeiro; RM se inconclusiva",
    "f": [
     3,
     15
    ]
   },
   {
    "t": "TC de abdome e pelve com contraste EV: dor difusa, em fossa ilíaca direita ou esquerda com dúvida diagnóstica no adulto não gestante",
    "f": [
     15
    ]
   },
   {
    "t": "Angio-TC de abdome (arterial e venosa): suspeita de isquemia mesentérica ou de aneurisma de aorta em paciente estável",
    "f": [
     2,
     8
    ]
   },
   {
    "t": "TC sem contraste de baixa dose: suspeita de cálculo urinário quando a imagem mudar conduta (US é alternativa)",
    "f": [
     12,
     10
    ]
   },
   {
    "t": "Lactato: suspeita de isquemia mesentérica ou sepse; lactato normal não afasta isquemia",
    "f": [
     2,
     19
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX simples de abdome de rotina na dor abdominal inespecífica (TC é superior; RX só se TC indisponível)",
    "f": [
     1
    ]
   },
   {
    "t": "Amilase junto com lipase na suspeita de pancreatite",
    "f": [
     20,
     13
    ]
   },
   {
    "t": "TC na admissão na pancreatite com diagnóstico clínico-laboratorial claro (só se dúvida ou sem melhora em 48-72 h)",
    "f": [
     13
    ]
   },
   {
    "t": "TC em < 50 anos, saudável, com cálculo prévio e cólica típica não complicada (sem febre nem piora)",
    "f": [
     21
    ]
   },
   {
    "t": "TC como primeiro exame na gestante ou na dor de hipocôndrio direito (US primeiro)",
    "f": [
     15,
     3
    ]
   },
   {
    "t": "Imagem de rotina na suspeita de apendicite de baixo risco por AIR/AAS (reavaliar); imagem é para risco intermediário",
    "f": [
     3
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Scheirey CD et al. ACR Appropriateness Criteria: Acute nonlocalized abdominal pain. J Am Coll Radiol 2018;15(11S):S217-S231. PMID 30392591 (sem revisão posterior no PubMed)",
   "Bala M et al. Acute mesenteric ischemia: updated guidelines of the WSES. World J Emerg Surg 2022;17(1):54. PMID 36261857",
   "Di Saverio S et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg 2020;15(1):27. PMID 32295644 (enunciados 1.2-1.14 conferidos no texto completo, PMC7386163)",
   "Podda M et al. Diagnosis and treatment of acute appendicitis: 2025 edition of the WSES Jerusalem guidelines. JAMA Surg 2026;161(3):283-295. doi:10.1001/jamasurg.2025.6218. PMID 41604201 (edição vigente; conferido só o resumo)",
   "Yokoe M et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis. J Hepatobiliary Pancreat Sci 2018;25(1):41-54. PMID 29032636; Kiriyama S et al. TG18 acute cholangitis. 2018;25(1):17-30. PMID 29032610",
   "Birindelli A et al. 2017 update of the WSES guidelines for emergency repair of complicated abdominal wall hernias. World J Emerg Surg 2017;12:37. PMID 28804507",
   "Tarasconi A et al. Perforated and bleeding peptic ulcer: WSES guidelines. World J Emerg Surg 2020;15:3. PMID 31921329",
   "Wanhainen A et al. ESVS 2024 guidelines on abdominal aorto-iliac artery aneurysms. Eur J Vasc Endovasc Surg 2024;67(2):192-331. PMID 38307694",
   "Hahn SA et al. ACEP Clinical Policy: early pregnancy. Ann Emerg Med 2017;69(2):241-250. PMID 28126120",
   "ACR Appropriateness Criteria: Acute pelvic pain in the reproductive age group: 2023 update. J Am Coll Radiol 2024;21(6S):S3-S20. PMID 38823952",
   "Workowski KA et al. CDC Sexually transmitted infections treatment guidelines, 2021. MMWR Recomm Rep 2021;70(4):1-187. PMID 34292926",
   "EAU Guidelines on Urolithiasis, edição 2026. uroweb.org/guidelines/urolithiasis (edição anual; conferir na publicação)",
   "Tenner S et al. ACG guideline: management of acute pancreatitis. Am J Gastroenterol 2024;119(3):419-437. PMID 38857482",
   "Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the evaluation and diagnosis of chest pain. Circulation 2021;144(22):e368-e454. PMID 34709879",
   "ACR Appropriateness Criteria: Right upper quadrant pain: 2022 update. J Am Coll Radiol 2023;20(5S):S211-S223. PMID 37236744",
   "ACR Appropriateness Criteria: Right lower quadrant pain: 2022 update. J Am Coll Radiol 2022;19(11S):S445-S461. PMID 36436969",
   "ACR Appropriateness Criteria: Left lower quadrant pain: 2023 update. J Am Coll Radiol 2023;20(11S):S471-S480. PMID 38040465",
   "ACR Appropriateness Criteria: Acute onset flank pain, suspicion of stone disease (urolithiasis) (2023). J Am Coll Radiol 2023;20(11S):S315-S328. PMID 38040458",
   "Prescott HC, Antonelli M et al. Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2026. Intensive Care Med 2026;52(5):863-936. doi:10.1007/s00134-026-08361-1. PMID 41870560 (também em Crit Care Med)",
   "American Society for Clinical Pathology / Choosing Wisely: não pedir amilase na suspeita de pancreatite; pedir lipase. choosingwisely.org",
   "ACEP / Choosing Wisely (2014): evitar TC de abdome e pelve em < 50 anos saudáveis com cálculo prévio e cólica não complicada. choosingwisely.org"
  ]
 },
 "q:dor-toracica": {
  "encaminhar": [
   {
    "t": "Sala vermelha: instabilidade, choque, dispneia grave, arritmia ou dor em curso com ECG isquêmico",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Hemodinâmica imediata: supra de ST ou equivalente (IAM posterior, BRE ou ritmo de MP com Sgarbossa, de Winter)",
    "f": [
     3,
     4
    ]
   },
   {
    "t": "Cardiologia: troponina de alta sensibilidade elevada com variação, HEART ≥ 4 ou alterações dinâmicas de ST-T",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Cirurgia cardiovascular: síndrome aórtica aguda na angio-TC (dissecção tipo A; tipo B complicada)",
    "f": [
     5,
     6
    ]
   },
   {
    "t": "Sala vermelha / Cirurgia torácica: pneumotórax hipertensivo, ou pneumotórax com dispneia importante",
    "f": [
     8
    ]
   },
   {
    "t": "Sala vermelha: TEP com hipotensão ou choque (alto risco)",
    "f": [
     9,
     10
    ]
   },
   {
    "t": "Cirurgia torácica / Cirurgia Geral: dor torácica após vômitos com enfisema subcutâneo ou pneumomediastino (perfuração de esôfago)",
    "f": [
     11
    ]
   }
  ],
  "pedir": [
   {
    "t": "ECG em até 10 min da chegada: toda dor torácica não traumática; seriar se dor persiste ou muda",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Troponina de alta sensibilidade em algoritmo 0/1 h ou 0/2 h: suspeita de síndrome coronariana aguda",
    "f": [
     4,
     2
    ]
   },
   {
    "t": "Escore HEART: 0-3 com troponinas negativas = baixo risco (alta); 4-6 intermediário; ≥ 7 alto",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "RX de tórax: dor torácica aguda, para diagnóstico diferencial (pneumotórax, pneumonia, mediastino)",
    "f": [
     1
    ]
   },
   {
    "t": "PERC: probabilidade clínica baixa de TEP; se os 8 critérios negativos, não investigar",
    "f": [
     12,
     10
    ]
   },
   {
    "t": "D-dímero (corte ajustado à idade se > 50 anos: idade × 10 µg/L FEU, ou YEARS): probabilidade baixa/intermediária com PERC positivo",
    "f": [
     9,
     10
    ]
   },
   {
    "t": "Angio-TC de artérias pulmonares: probabilidade alta, ou D-dímero acima do corte",
    "f": [
     9,
     10
    ]
   },
   {
    "t": "Angio-TC de aorta (tórax e abdome): ADD-RS ≥ 2, ou ADD-RS 0-1 com D-dímero ≥ 500 ng/mL",
    "f": [
     5,
     7,
     2
    ]
   },
   {
    "t": "Ecocardiograma à beira-leito (POCUS): instabilidade, suspeita de tamponamento, ou suspeita de TEP com hipotensão",
    "f": [
     9,
     2
    ]
   },
   {
    "t": "Cintilografia V/Q: alternativa à angio-TC na alergia ao contraste, insuficiência renal ou gestação",
    "f": [
     9,
     10
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "D-dímero em PERC negativo com probabilidade clínica baixa",
    "f": [
     12
    ]
   },
   {
    "t": "Angio-TC de tórax em probabilidade baixa com PERC negativo ou D-dímero abaixo do corte",
    "f": [
     15,
     9
    ]
   },
   {
    "t": "D-dímero em probabilidade alta de TEP (ir direto à angio-TC)",
    "f": [
     9
    ]
   },
   {
    "t": "CK-MB ou mioglobina quando há troponina disponível",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Teste de isquemia ou angio-TC de coronárias urgente em dor de baixo risco já estratificada (alta com seguimento)",
    "f": [
     1
    ]
   },
   {
    "t": "Troponina adicional quando o algoritmo 0/1 h ou 0/2 h já descartou IAM e não houve nova dor",
    "f": [
     4
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the evaluation and diagnosis of chest pain. Circulation 2021;144(22):e368-e454. PMID 34709879",
   "Barros e Silva PGM, Soeiro AM et al. Diretriz Brasileira de Avaliação e Diagnóstico da Dor Torácica na Unidade de Emergência – 2025 (SBC). Arq Bras Cardiol 2025;122(9):e20250620. abccardiol.org",
   "Rao SV et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the management of patients with acute coronary syndromes. Circulation 2025;151(13):e771-e862. PMID 40014670",
   "Byrne RA et al. 2023 ESC Guidelines for the management of acute coronary syndromes. Eur Heart J 2023;44(38):3720-3826. PMID 37622654",
   "Mazzolai L et al. 2024 ESC Guidelines for the management of peripheral arterial and aortic diseases. Eur Heart J 2024;45(36):3538-3700. PMID 39210722",
   "Isselbacher EM et al. 2022 ACC/AHA Guideline for the diagnosis and management of aortic disease. Circulation 2022;146(24):e334-e482. PMID 36322642",
   "Nazerian P et al. ADD-RS plus D-dimer for acute aortic syndromes: the ADvISED study. Circulation 2018;137(3):250-258. PMID 29030346",
   "Roberts ME et al. British Thoracic Society Guideline for pleural disease. Thorax 2023;78(Suppl 3):s1-s42. PMID 37433578",
   "Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism (ESC/ERS). Eur Heart J 2020;41(4):543-603. PMID 31504429",
   "Creager MA et al. 2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN Guideline for acute pulmonary embolism in adults. J Am Coll Cardiol 2026;87(13):1626-1710. PMID 41712898",
   "Chirica M et al. Esophageal emergencies: WSES guidelines. World J Emerg Surg 2019;14:26. PMID 31164915",
   "Kline JA et al. Clinical criteria to prevent unnecessary diagnostic testing in ED patients with suspected PE (PERC). J Thromb Haemost 2004;2(8):1247-55. PMID 15304025; Freund Y et al. PROPER trial. JAMA 2018;319(6):559-566. PMID 29450523",
   "Righini M et al. Age-adjusted D-dimer cutoff (ADJUST-PE). JAMA 2014;311(11):1117-24. PMID 24643601; van der Hulle T et al. YEARS. Lancet 2017;390(10091):289-297. PMID 28549662",
   "Backus BE et al. A prospective validation of the HEART score for chest pain patients at the ED. Int J Cardiol 2013;168(3):2153-8. PMID 23465250",
   "ACEP / Choosing Wisely (2014): evitar angio-TC de tórax em baixa probabilidade de TEP com PERC ou D-dímero negativo. choosingwisely.org"
  ]
 },
 "q:febre": {
  "encaminhar": [
   {
    "t": "Sala vermelha: suspeita de sepse com hipotensão, lactato ≥ 4 mmol/L, rebaixamento ou outra disfunção orgânica",
    "f": [
     1
    ]
   },
   {
    "t": "Sala vermelha + precaução para gotículas: febre com rigidez de nuca, petéquias ou púrpura (meningite/meningococcemia)",
    "f": [
     2,
     4
    ]
   },
   {
    "t": "Internação / Oncologia: neutropenia febril (neutrófilos < 500/mm³ ou queda prevista) em quimioterapia; antibiótico em até 1 h da triagem",
    "f": [
     5
    ]
   },
   {
    "t": "Cirurgia Geral / Endoscopia: febre com foco abdominal cirúrgico ou biliar (apendicite, abscesso, colangite com indicação de drenagem)",
    "f": [
     6,
     7
    ]
   },
   {
    "t": "Urologia: pielonefrite com obstrução ou abscesso na imagem (drenagem)",
    "f": [
     8,
     9
    ]
   },
   {
    "t": "Ginecologia: DIP com abscesso tubo-ovariano ou sem resposta ao tratamento",
    "f": [
     10
    ]
   },
   {
    "t": "Ortopedia: monoartrite febril (suspeita de artrite séptica: puncionar antes do antibiótico)",
    "f": [
     11
    ]
   },
   {
    "t": "Dengue grupo C: leito de internação (mínimo 48 h); grupo D: UTI ou sala de emergência",
    "f": [
     12
    ]
   }
  ],
  "pedir": [
   {
    "t": "Hemoculturas (2 amostras de sítios diferentes) antes do antibiótico, sem atrasá-lo, e lactato: suspeita de sepse",
    "f": [
     1
    ]
   },
   {
    "t": "Hemograma, PCR, função renal, eletrólitos, bilirrubinas: sepse ou febre com sinais de gravidade",
    "f": [
     1
    ]
   },
   {
    "t": "Urina tipo I e urocultura: febre com sintomas urinários, gestante, ou idoso com febre sem outro foco",
    "f": [
     13,
     9
    ]
   },
   {
    "t": "RX de tórax: febre com tosse, dispneia, taquipneia ou hipoxemia (suspeita de pneumonia)",
    "f": [
     14,
     15
    ]
   },
   {
    "t": "Punção lombar: suspeita de meningite; TC antes só nos critérios da IDSA (ver cefaleia)",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "Hemograma: obrigatório na dengue grupos B, C e D; no grupo A, a critério médico",
    "f": [
     12
    ]
   },
   {
    "t": "Gota espessa ou teste rápido de malária: febre com residência ou deslocamento a área de transmissão nos 8-30 dias anteriores",
    "f": [
     16
    ]
   },
   {
    "t": "Teste de influenza/SARS-CoV-2: SRAG ou internação, para isolamento e vigilância; não adiar oseltamivir pelo resultado",
    "f": [
     4
    ]
   },
   {
    "t": "US ou TC dirigida ao foco suspeito (abdome, pelve, partes moles)",
    "f": [
     19
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Hemocultura em febre leve com foco claro e tratamento ambulatorial (PAC leve, celulite não complicada)",
    "f": [
     14,
     18
    ]
   },
   {
    "t": "Urocultura e tratamento de bacteriúria assintomática (exceto gestante e antes de procedimento urológico com sangramento de mucosa)",
    "f": [
     13
    ]
   },
   {
    "t": "qSOFA isolado para triar sepse (preferir NEWS/NEWS2, MEWS ou SIRS)",
    "f": [
     1
    ]
   },
   {
    "t": "NS1 ou sorologia para decidir a conduta na dengue (o manejo é clínico, pelo grupo de risco)",
    "f": [
     12
    ]
   }
  ],
  "div": [
   {
    "t": "TC antes da punção na meningite: IDSA com qualquer alteração de consciência (IDSA 2004) × ESCMID só com Glasgow < 10",
    "f": [
     2,
     3
    ]
   }
  ],
  "fontes": [
   "Prescott HC, Antonelli M et al. Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2026. Intensive Care Med 2026;52(5):863-936. doi:10.1007/s00134-026-08361-1. PMID 41870560 (substitui Evans 2021)",
   "Tunkel AR et al. IDSA practice guidelines for bacterial meningitis. Clin Infect Dis 2004;39(9):1267-84. PMID 15494903",
   "van de Beek D et al. ESCMID guideline: acute bacterial meningitis. Clin Microbiol Infect 2016;22 Suppl 3:S37-62. PMID 27062097",
   "Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., vol. 1 (meningites; doença meningocócica). Brasília, 2023. gov.br/saude",
   "Taplitz RA et al. Outpatient management of fever and neutropenia in adults treated for malignancy: ASCO and IDSA clinical practice guideline update. J Clin Oncol 2018;36(14):1443-53. PMID 29461916 (atualização online ASCO 2023)",
   "Di Saverio S et al. WSES Jerusalem guidelines 2020 (apendicite). World J Emerg Surg 2020;15:27. PMID 32295644",
   "Kiriyama S et al. Tokyo Guidelines 2018: acute cholangitis. J Hepatobiliary Pancreat Sci 2018;25(1):17-30. PMID 29032610",
   "EAU Guidelines on Urological Infections, edição 2026. uroweb.org/guidelines/urological-infections",
   "Trautner BW et al. IDSA 2025 guideline on management and treatment of complicated urinary tract infections. Clin Infect Dis 2025 (publicado em 17/07/2025). idsociety.org/practice-guideline/complicated-utis",
   "Workowski KA et al. CDC STI treatment guidelines, 2021. MMWR Recomm Rep 2021;70(4):1-187. PMID 34292926",
   "Coakley G et al. BSR & BHPR, BOA, RCGP and BSAC guidelines for management of the hot swollen joint in adults. Rheumatology 2006;45(8):1039-41. PMID 16829534 (antiga, sem substituta da BSR)",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico – adulto e criança. 6ª ed. Brasília, 2024 (conferido: grupo A exames a critério médico; B hemograma obrigatório; C internação ≥ 48 h; D UTI; exames específicos não mudam a conduta)",
   "Nicolle LE et al. IDSA 2019 clinical practice guideline for the management of asymptomatic bacteriuria. Clin Infect Dis 2019;68(10):e83-e110. PMID 30895288",
   "Metlay JP et al. Diagnosis and treatment of adults with CAP (ATS/IDSA). Am J Respir Crit Care Med 2019;200(7):e45-e67. PMID 31573350",
   "Corrêa RA et al. Recomendações para o manejo da pneumonia adquirida na comunidade 2018 (SBPT). J Bras Pneumol 2018;44(5):405-423. PMID 30517341",
   "Ministério da Saúde. Guia de tratamento da malária no Brasil, 3ª ed. Brasília, 2026 (caso suspeito: febre com exposição em área de transmissão 8 a 30 dias antes)",
   "Ministério da Saúde. Guia de manejo e tratamento de influenza 2023. Brasília, 2023",
   "Stevens DL et al. IDSA practice guidelines for skin and soft tissue infections. Clin Infect Dis 2014;59(2):e10-52. PMID 24973422",
   "Scheirey CD et al. ACR Appropriateness Criteria: acute nonlocalized abdominal pain. J Am Coll Radiol 2018;15(11S):S217-S231. PMID 30392591"
  ]
 },
 "q:tosse-dispneia": {
  "encaminhar": [
   {
    "t": "Sala vermelha: SpO2 < 90% apesar de O2, esforço respiratório, fala entrecortada, rebaixamento ou cianose",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Sala vermelha / UTI: asma com sonolência, confusão ou tórax silencioso; crise grave (PFE ≤ 50%, FR > 30, FC > 120)",
    "f": [
     1
    ]
   },
   {
    "t": "Internação / UTI: PAC com CURB-65 ≥ 3, choque com vasopressor, necessidade de ventilação ou ≥ 3 critérios menores ATS/IDSA",
    "f": [
     3,
     4
    ]
   },
   {
    "t": "Sala vermelha / Cardiologia: edema agudo de pulmão ou insuficiência cardíaca com hipotensão, hipoperfusão ou SCA",
    "f": [
     7
    ]
   },
   {
    "t": "Cirurgia torácica: pneumotórax sintomático ou com alto risco (hipoxemia, doença pulmonar, instabilidade); derrame volumoso com dispneia",
    "f": [
     8
    ]
   },
   {
    "t": "Sala vermelha: TEP com hipotensão ou choque",
    "f": [
     9,
     10
    ]
   }
  ],
  "pedir": [
   {
    "t": "Oximetria de pulso: toda queixa respiratória aguda",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "RX de tórax: suspeita de pneumonia (FC > 100, FR > 24, T > 38 °C ou ausculta focal), dispneia sem causa, exacerbação de DPOC",
    "f": [
     11,
     2
    ]
   },
   {
    "t": "US pulmonar à beira-leito: alternativa ao RX na suspeita de PAC, se examinador treinado",
    "f": [
     5
    ]
   },
   {
    "t": "CURB-65 / CRB-65 ou PSI: decidir local de tratamento na PAC (ver Divergências)",
    "f": [
     3,
     4
    ]
   },
   {
    "t": "Gasometria arterial: asma com PFE/VEF1 < 50% ou sem resposta; DPOC com suspeita de hipercapnia; rebaixamento",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "BNP ou NT-proBNP: dispneia com suspeita de IC; BNP < 100 ou NT-proBNP < 300 pg/mL tornam IC aguda improvável",
    "f": [
     7
    ]
   },
   {
    "t": "ECG e troponina: dispneia com suspeita de causa cardíaca",
    "f": [
     12,
     7
    ]
   },
   {
    "t": "D-dímero / angio-TC: conforme probabilidade clínica e PERC na suspeita de TEP",
    "f": [
     9,
     10
    ]
   },
   {
    "t": "Hemograma, ureia, eletrólitos: PAC com indicação de internação (ureia entra no CURB-65)",
    "f": [
     3,
     6
    ]
   },
   {
    "t": "Hemoculturas e escarro: PAC grave, ou internado com cobertura empírica ou risco para MRSA/Pseudomonas",
    "f": [
     4
    ]
   },
   {
    "t": "Teste de influenza/SARS-CoV-2: SRAG ou internação; não adiar oseltamivir pelo resultado",
    "f": [
     13,
     4
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX de tórax na bronquite aguda sem sinais vitais alterados nem achado focal",
    "f": [
     11
    ]
   },
   {
    "t": "Hemocultura e cultura de escarro na PAC de tratamento ambulatorial",
    "f": [
     4
    ]
   },
   {
    "t": "Gasometria de rotina na crise de asma leve/moderada com SpO2 adequada",
    "f": [
     1
    ]
   },
   {
    "t": "RX de tórax de rotina na crise de asma (só se suspeita de pneumotórax, pneumonia ou sem resposta)",
    "f": [
     1
    ]
   },
   {
    "t": "TC de tórax como exame inicial na suspeita de PAC (RX ou US pulmonar primeiro; TC se dúvida ou complicação)",
    "f": [
     5,
     14
    ]
   },
   {
    "t": "Procalcitonina para decidir iniciar antibiótico na PAC",
    "f": [
     4
    ]
   },
   {
    "t": "Espirometria durante exacerbação de DPOC (na asma, medir PFE ou VEF1)",
    "f": [
     2,
     1
    ]
   }
  ],
  "div": [
   {
    "t": "Gravidade da PAC: ATS/IDSA prefere PSI (ATS/IDSA 2019) × SBPT aceita CURB-65 e CRB-65 sem laboratório",
    "f": [
     4,
     3
    ]
   }
  ],
  "fontes": [
   "Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, 2026 update (maio 2026). ginasthma.org",
   "Global Initiative for Chronic Obstructive Lung Disease. GOLD 2026 Report (publicado em 10/11/2025). goldcopd.org",
   "Corrêa RA et al. Recomendações para o manejo da pneumonia adquirida na comunidade 2018 (SBPT). J Bras Pneumol 2018;44(5):405-423. PMID 30517341 (sem atualização localizada)",
   "Metlay JP et al. Diagnosis and treatment of adults with CAP (ATS/IDSA). Am J Respir Crit Care Med 2019;200(7):e45-e67. PMID 31573350",
   "Jones BE, Ramirez JA, Oren E et al. Diagnosis and management of community-acquired pneumonia: an official ATS clinical practice guideline (2025). Am J Respir Crit Care Med 2025. doi:10.1164/rccm.202507-1692ST (não endossada pela IDSA)",
   "Lim WS et al. Defining CAP severity on presentation to hospital (CURB-65). Thorax 2003;58(5):377-82. PMID 12728155",
   "McDonagh TA et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J 2021;42(36):3599-3726. PMID 34447992; e 2023 Focused Update (Eur Heart J 2023;44(37):3627-3639)",
   "Roberts ME et al. BTS Guideline for pleural disease. Thorax 2023;78(Suppl 3):s1-s42. PMID 37433578",
   "Konstantinides SV et al. 2019 ESC Guidelines for acute pulmonary embolism. Eur Heart J 2020;41(4):543-603. PMID 31504429",
   "Creager MA et al. 2026 AHA/ACC multisociety guideline for acute pulmonary embolism in adults. J Am Coll Cardiol 2026;87(13):1626-1710. PMID 41712898",
   "Harris AM et al. Appropriate antibiotic use for acute respiratory tract infection in adults: advice for high-value care (ACP/CDC). Ann Intern Med 2016;164(6):425-34. PMID 26785402",
   "Gulati M et al. 2021 AHA/ACC chest pain guideline. Circulation 2021;144(22):e368-e454. PMID 34709879",
   "Ministério da Saúde. Guia de manejo e tratamento de influenza 2023. Brasília, 2023",
   "ACR Appropriateness Criteria: Acute respiratory illness in immunocompetent patients: 2024 update. J Am Coll Radiol 2025;22(5S):S14-S35. PMID 40409874"
  ]
 },
 "pac": {
  "encaminhar": [
   {
    "t": "Sala vermelha / UTI: 1 critério maior ATS/IDSA (choque com vasopressor, ventilação mecânica) ou ≥ 3 menores",
    "f": [
     1
    ]
   },
   {
    "t": "Internação: CURB-65 ≥ 2 (4–5 avaliar UTI) ou PSI IV–V, somado ao julgamento clínico, hipoxemia ou impossibilidade de via oral",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "Drenagem torácica (cirurgia/pneumologia): derrame parapneumônico com pH < 7,2, pus ou germe no Gram/cultura",
    "f": [
     3
    ]
   }
  ],
  "pedir": [
   {
    "t": "RX de tórax PA e perfil: todo caso suspeito de PAC",
    "f": [
     1,
     5
    ]
   },
   {
    "t": "Oximetria em todos; gasometria arterial se desconforto respiratório, hipoxemia ou DPOC",
    "f": [
     5
    ]
   },
   {
    "t": "Hemograma, ureia, creatinina, sódio, potássio, glicemia: quando se cogita internação",
    "f": [
     5
    ]
   },
   {
    "t": "Hemocultura e escarro (Gram e cultura): PAC grave, cobertura empírica de MRSA/Pseudomonas ou antibiótico EV nos últimos 90 dias",
    "f": [
     1
    ]
   },
   {
    "t": "Antígeno urinário de pneumococo e Legionella: PAC grave; Legionella também se surto ou viagem recente",
    "f": [
     1
    ]
   },
   {
    "t": "US de tórax: derrame pleural na RX ou RX duvidosa (POCUS)",
    "f": [
     3,
     5
    ]
   },
   {
    "t": "TC de tórax: suspeita clínica com RX normal ou duvidosa (grave, imunossuprimido) ou suspeita de complicação",
    "f": [
     5
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Hemocultura e cultura de escarro de rotina na PAC de tratamento ambulatorial",
    "f": [
     1
    ]
   },
   {
    "t": "Procalcitonina para decidir iniciar antibiótico na PAC confirmada na RX",
    "f": [
     1
    ]
   },
   {
    "t": "RX de controle de rotina se os sintomas resolveram em 5 a 7 dias",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "ATS/IDSA 2019 — Metlay JP et al. Diagnosis and treatment of adults with community-acquired pneumonia. An official clinical practice guideline of the ATS and IDSA. Am J Respir Crit Care Med 2019;200(7):e45-e67. PMID 31573350. https://doi.org/10.1164/rccm.201908-1581ST",
   "Lim WS et al. Defining community acquired pneumonia severity on presentation to hospital (CURB-65). Thorax 2003;58(5):377-82. PMID 12728155. https://doi.org/10.1136/thorax.58.5.377",
   "BTS 2023 — Roberts ME et al. British Thoracic Society guideline for pleural disease. Thorax 2023;78(Suppl 3):s1-s42. PMID 37433578. https://doi.org/10.1136/thorax-2022-219784",
   "Corrêa RA et al. Recomendações para o manejo da pneumonia adquirida na comunidade 2018 (SBPT). J Bras Pneumol 2018;44(5):405-23. PMID 30517341. https://doi.org/10.1590/S1806-37562018000000130 (não há atualização da SBPT localizada até out/2026)",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 43 Pneumonia adquirida na comunidade (conferência)."
  ]
 },
 "itu": {
  "encaminhar": [
   {
    "t": "Sala vermelha: pielonefrite com sepse ou choque",
    "f": [
     6,
     2
    ]
   },
   {
    "t": "Urologia de urgência: pielonefrite com obstrução, cálculo, abscesso renal ou pielonefrite enfisematosa na imagem",
    "f": [
     1,
     5
    ]
   },
   {
    "t": "Internação: pielonefrite com vômitos, intolerância à via oral, falha do antibiótico oral, imunossupressão ou gestante",
    "f": [
     2,
     7
    ]
   },
   {
    "t": "Obstetrícia: pielonefrite na gestante (internação)",
    "f": [
     7
    ]
   }
  ],
  "pedir": [
   {
    "t": "Cistite não complicada da mulher (disúria, polaciúria, sem corrimento): diagnóstico clínico, sem exame",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "Urina tipo I ou fita: dúvida diagnóstica",
    "f": [
     1
    ]
   },
   {
    "t": "Urocultura com antibiograma: pielonefrite, ITU complicada, homem, gestante, recorrência ou falha de tratamento",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Hemograma e função renal: pielonefrite",
    "f": [
     2
    ]
   },
   {
    "t": "US de rins e vias urinárias: pielonefrite sem melhora em 48–72 h ou suspeita de obstrução/cálculo",
    "f": [
     1,
     5
    ]
   },
   {
    "t": "TC de abdome com contraste: pielonefrite complicada, sem melhora ou suspeita de abscesso; sem contraste se cálculo ou insuficiência renal",
    "f": [
     5
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Urocultura de rotina na cistite não complicada da mulher não gestante",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "Urocultura de controle após tratamento em quem está assintomática (exceto gestante)",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Urocultura ou tratamento de bacteriúria assintomática (exceto gestante e antes de procedimento urológico com lesão de mucosa)",
    "f": [
     3
    ]
   },
   {
    "t": "Imagem no primeiro episódio de pielonefrite não complicada que responde ao tratamento",
    "f": [
     5
    ]
   }
  ],
  "div": [],
  "fontes": [
   "EAU 2025 — Bonkat G et al. EAU Guidelines on Urological Infections, 2025. Arnhem: European Association of Urology. https://uroweb.org/guidelines/urological-infections",
   "Trautner BW et al. 2025 IDSA guideline on management and treatment of complicated urinary tract infections. Clin Infect Dis, publicado online em 17/07/2025. https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/",
   "Nicolle LE et al. Clinical practice guideline for the management of asymptomatic bacteriuria: 2019 update by the IDSA. Clin Infect Dis 2019;68(10):e83-e110. PMID 30895288. https://doi.org/10.1093/cid/ciy1121",
   "Gupta K et al. International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women (IDSA/ESCMID). Clin Infect Dis 2011;52(5):e103-e120. PMID 21292654. https://doi.org/10.1093/cid/ciq257",
   "ACR Appropriateness Criteria® Acute Pyelonephritis: 2022 Update. J Am Coll Radiol 2022;19(11S):S224-S239. PMID 36436954. https://doi.org/10.1016/j.jacr.2022.09.017",
   "SSC 2021 — Evans L et al. Surviving Sepsis Campaign 2021. Crit Care Med 2021;49(11):e1063-e1143.",
   "MS 2022 — Ministério da Saúde. Manual de gestação de alto risco. Brasília, 2022."
  ]
 },
 "colica": {
  "encaminhar": [
   {
    "t": "Urologia de urgência: febre/sepse com cálculo obstrutivo — descompressão (cateter duplo J ou nefrostomia) e antibiótico",
    "f": [
     1
    ]
   },
   {
    "t": "Urologia: rim único, obstrução bilateral, anúria, lesão renal aguda ou dor refratária à analgesia",
    "f": [
     1
    ]
   },
   {
    "t": "Urologia (eletivo): cálculo ureteral > 10 mm ou sem eliminação no seguimento",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "Ginecologia/obstetrícia: beta-hCG positivo (ectópica no diferencial; gestante com cálculo)",
    "f": [
     6,
     2
    ]
   },
   {
    "t": "Sala vermelha / Cirurgia vascular: > 50 anos com \"primeira cólica\", hipotensão ou massa pulsátil — afastar aneurisma de aorta",
    "f": [
     5
    ]
   }
  ],
  "pedir": [
   {
    "t": "Urina tipo I (ou fita): hematúria e sinais de infecção",
    "f": [
     1
    ]
   },
   {
    "t": "Creatinina, hemograma e PCR; urocultura se febre ou leucocitúria com sintomas",
    "f": [
     1
    ]
   },
   {
    "t": "Beta-hCG: mulher em idade fértil antes de imagem com radiação",
    "f": [
     6,
     2
    ]
   },
   {
    "t": "TC de abdome e pelve sem contraste, baixa dose: primeiro episódio ou dúvida diagnóstica (padrão-ouro)",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "US de rins e vias urinárias: primeira linha para hidronefrose (POCUS); exame inicial na gestante",
    "f": [
     1,
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "TC em < 50 anos, sem outra doença, com litíase prévia e cólica típica não complicada",
    "f": [
     4
    ]
   },
   {
    "t": "TC com contraste como primeiro exame para cálculo",
    "f": [
     2
    ]
   },
   {
    "t": "RX simples de abdome isolado para diagnóstico (útil para seguir cálculo radiopaco conhecido)",
    "f": [
     2,
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "EAU 2025 — Skolarikos A et al. European Association of Urology guidelines on the diagnosis and treatment of urolithiasis. Eur Urol 2025;88(1):64-75. https://doi.org/10.1016/j.eururo.2025.03.011 ; texto completo em https://uroweb.org/guidelines/urolithiasis",
   "ACR Appropriateness Criteria® Acute Onset Flank Pain–Suspicion of Stone Disease (Urolithiasis): 2023 Update. J Am Coll Radiol 2023;20(11S):S315-S328. PMID 38040458. https://doi.org/10.1016/j.jacr.2023.08.020",
   "AUA/Endourology 2016 — Assimos D et al. Surgical management of stones: AUA/Endourological Society guideline. J Urol 2016;196(4):1153-60. PMID 27238616 (observação/terapia expulsiva em cálculo ureteral não complicado ≤ 10 mm).",
   "ACEP Choosing Wisely 2014 — American College of Emergency Physicians. Choosing Wisely, 2014: avoid CT of the abdomen and pelvis in young otherwise healthy ED patients (< 50 anos) with known kidney stones and uncomplicated renal colic. https://www.choosingwisely.org",
   "Chaikof EL et al. SVS practice guidelines on abdominal aortic aneurysm. J Vasc Surg 2018;67(1):2-77; Wanhainen A et al. ESVS 2024 AAA guidelines. Eur J Vasc Endovasc Surg 2024;67(2):192-331.",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 25 Dor abdominal (teste de gravidez em idade fértil)."
  ]
 },
 "dor-abdominal": {
  "encaminhar": [
   {
    "t": "Reavaliação presencial se a dor persistir ou piorar sem diagnóstico, com cautela maior em idoso e imunossuprimido",
    "f": [
     3
    ]
   }
  ],
  "pedir": [
   {
    "t": "Beta-hCG: toda mulher em idade fértil",
    "f": [
     3
    ]
   },
   {
    "t": "ECG e troponina: dor em andar superior quando isquemia coronariana entra no diferencial (idade de corte: ver Divergências)",
    "f": [
     3,
     2
    ]
   },
   {
    "t": "Glicemia e urina tipo I antes de rotular dor inespecífica",
    "f": [
     3
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX simples de abdome de rotina (só suspeita de perfuração, obstrução ou corpo estranho)",
    "f": [
     1,
     3
    ]
   }
  ],
  "div": [
   {
    "t": "ECG na dor em andar superior: sem idade de corte, sempre que isquemia entrar no diferencial; nenhuma diretriz define corte etário",
    "f": [
     3
    ]
   }
  ],
  "fontes": [
   "Scheirey CD et al. ACR Appropriateness Criteria® Acute Nonlocalized Abdominal Pain. J Am Coll Radiol 2018;15(11S):S217-S231. PMID 30392591. https://doi.org/10.1016/j.jacr.2018.09.010 (há revisão no acsearch.acr.org; confirmar data no portal)",
   "Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR guideline for the evaluation and diagnosis of chest pain. Circulation 2021;144:e368-e454.",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 25 Dor abdominal."
  ]
 },
 "cefaleia": {
  "encaminhar": [],
  "pedir": [],
  "naoPedir": [
   {
    "t": "TC ou RM de crânio na cefaleia primária típica (tensional, enxaqueca) com exame neurológico normal",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "EEG na avaliação de cefaleia",
    "f": [
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "AHS Choosing Wisely 2013 — Loder E et al. Choosing wisely in headache medicine: the American Headache Society's list of five things physicians and patients should question. Headache 2013;53(10):1651-9. PMID 24266337. https://doi.org/10.1111/head.12233",
   "AAN Choosing Wisely 2013 — Langer-Gould AM et al. The American Academy of Neurology's top five Choosing Wisely recommendations. Neurology 2013;81(11):1004-11. PMID 23430685. https://doi.org/10.1212/WNL.0b013e31828aab14",
   "ACR Appropriateness Criteria® Headache: 2022 Update. J Am Coll Radiol 2023;20(5S):S70-S93. PMID 37236753. https://doi.org/10.1016/j.jacr.2023.02.018"
  ]
 },
 "enxaqueca": {
  "encaminhar": [
   {
    "t": "Sala vermelha / Neurologia: aura com fraqueza motora, aura > 60 min ou primeira aura após 50 anos (diferencial com AIT/AVC)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Seguimento ambulatorial para tratamento preventivo: crises frequentes ou incapacitantes, enxaqueca crônica (≥ 15 dias/mês) ou uso excessivo de analgésico",
    "f": [
     3,
     1,
     7
    ]
   },
   {
    "t": "Internação: crise refratária às medidas da porta; estado de mal enxaquecoso (> 72 h)",
    "f": [
     1,
     7
    ]
   }
  ],
  "pedir": [
   {
    "t": "Nenhum exame se preenche critérios ICHD-3 e o exame neurológico é normal",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "TC de crânio sem contraste: mudança do padrão habitual ou qualquer sinal de alarme SNNOOP10",
    "f": [
     2,
     6
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "TC ou RM de crânio em enxaqueca estável típica com exame neurológico normal",
    "f": [
     4,
     6
    ]
   },
   {
    "t": "EEG na avaliação de cefaleia",
    "f": [
     5
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Headache Classification Committee of the International Headache Society. The International Classification of Headache Disorders, 3rd edition (ICHD-3). Cephalalgia 2018;38(1):1-211. PMID 29368949. https://doi.org/10.1177/0333102417738202",
   "Do TP et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology 2019;92(3):134-44. PMID 30587518. https://doi.org/10.1212/WNL.0000000000006697",
   "AHS 2021 — Ailani J et al. The American Headache Society consensus statement: update on integrating new migraine treatments into clinical practice. Headache 2021;61(7):1021-39. PMID 34160823. https://doi.org/10.1111/head.14153",
   "AHS Choosing Wisely 2013 — Loder E et al. AHS Choosing Wisely. Headache 2013;53(10):1651-9. PMID 24266337. https://doi.org/10.1111/head.12233",
   "AAN Choosing Wisely 2013 — Langer-Gould AM et al. AAN Choosing Wisely. Neurology 2013;81(11):1004-11. PMID 23430685. https://doi.org/10.1212/WNL.0b013e31828aab14",
   "ACR Appropriateness Criteria® Headache: 2022 Update. J Am Coll Radiol 2023;20(5S):S70-S93. PMID 37236753. https://doi.org/10.1016/j.jacr.2023.02.018",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 26 Cefaleia (internação na crise refratária; orientação de seguimento)."
  ]
 },
 "vertigem": {
  "encaminhar": [
   {
    "t": "Protocolo de AVC / Neurologia: HINTS central (impulso cefálico normal, nistagmo que muda de direção ou desvio skew), déficit focal ou ataxia de marcha grave",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Neurologia: vertigem com cefaleia ou cervicalgia nova (suspeita de dissecção vertebral)",
    "f": [
     1
    ]
   },
   {
    "t": "Otorrino com urgência (audiometria): perda auditiva neurossensorial súbita; na síndrome vestibular aguda com hipoacusia, afastar AVC",
    "f": [
     4,
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Dix-Hallpike (canal posterior) e teste de rotação em supino (canal lateral): vertigem posicional episódica",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "HINTS (com teste de audição): síndrome vestibular aguda com nistagmo, por examinador treinado",
    "f": [
     1
    ]
   },
   {
    "t": "ECG: tontura com pré-síncope ou palpitação",
    "f": [
     5
    ]
   },
   {
    "t": "RM com difusão: HINTS central ou duvidoso; angio-TC ou angio-RM se episódios espontâneos com suspeita de AIT ou dissecção",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Imagem ou teste vestibular na VPPB típica sem sinais neurológicos",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "TC de crânio para afastar AVC na síndrome vestibular aguda ou na VPPB (baixa sensibilidade)",
    "f": [
     1
    ]
   },
   {
    "t": "RM de rotina como primeiro exame quando há examinador treinado em HINTS e o HINTS é periférico",
    "f": [
     1
    ]
   }
  ],
  "div": [
   {
    "t": "Com examinador treinado: HINTS e RM só se central ou duvidoso; sem examinador treinado: RM com difusão, que pode ser falso-negativa nas primeiras 24–48 h",
    "f": [
     1
    ]
   }
  ],
  "fontes": [
   "Edlow JA et al. Guidelines for reasonable and appropriate care in the emergency department 3 (GRACE-3): acute dizziness and vertigo in the emergency department. Acad Emerg Med 2023;30(5):442-86. PMID 37166022. https://doi.org/10.1111/acem.14728",
   "Kattah JC et al. HINTS to diagnose stroke in the acute vestibular syndrome. Stroke 2009;40(11):3504-10. PMID 19762709. https://doi.org/10.1161/STROKEAHA.109.551234",
   "AAO-HNS 2017 — Bhattacharyya N et al. Clinical practice guideline: benign paroxysmal positional vertigo (update). Otolaryngol Head Neck Surg 2017;156(3 Suppl):S1-S47. PMID 28248609. https://doi.org/10.1177/0194599816689667",
   "AAO-HNS 2019 — Chandrasekhar SS et al. Clinical practice guideline: sudden hearing loss (update). Otolaryngol Head Neck Surg 2019;161(1 Suppl):S1-S45. PMID 31369359. https://doi.org/10.1177/0194599819859885",
   "Brignole M et al. 2018 ESC Guidelines for the diagnosis and management of syncope. Eur Heart J 2018;39(21):1883-1948."
  ]
 },
 "lombalgia": {
  "encaminhar": [
   {
    "t": "Neurocirurgia / Ortopedia de urgência: suspeita de síndrome da cauda equina (retenção urinária, anestesia em sela, incontinência, déficit bilateral)",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "Neurocirurgia / Ortopedia: déficit motor grave ou progressivo",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Sala vermelha / Cirurgia vascular: > 50 anos com hipotensão ou massa pulsátil (aneurisma de aorta)",
    "f": [
     5
    ]
   },
   {
    "t": "Urologia: dor lombar com febre e obstrução urinária ou cálculo",
    "f": [
     6
    ]
   },
   {
    "t": "Internação: febre com dor vertebral (espondilodiscite, abscesso epidural)",
    "f": [
     1,
     7
    ]
   }
  ],
  "pedir": [
   {
    "t": "RM de coluna urgente: suspeita de cauda equina, infecção, compressão medular por câncer ou déficit progressivo",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "RX ou TC de coluna: trauma significativo, osteoporose, idoso ou corticoide crônico com suspeita de fratura",
    "f": [
     1
    ]
   },
   {
    "t": "VHS/PCR e hemograma: suspeita de infecção ou câncer",
    "f": [
     2,
     7
    ]
   },
   {
    "t": "Urina tipo I: suspeita de causa urinária",
    "f": [
     6
    ]
   },
   {
    "t": "Angio-TC ou US de aorta: suspeita de aneurisma",
    "f": [
     5
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX, TC ou RM nas primeiras 6 semanas de lombalgia sem sinal de alarme",
    "f": [
     1,
     2,
     4
    ]
   },
   {
    "t": "Imagem para tranquilizar o paciente",
    "f": [
     3,
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Hutchins TA et al. ACR Appropriateness Criteria® Low Back Pain: 2021 Update. J Am Coll Radiol 2021;18(11S):S361-S379. PMID 34794594. https://doi.org/10.1016/j.jacr.2021.08.002",
   "ACP 2011 — Chou R et al. Diagnostic imaging for low back pain: advice for high-value health care from the American College of Physicians. Ann Intern Med 2011;154(3):181-9. PMID 21282698. https://doi.org/10.7326/0003-4819-154-3-201102010-00008",
   "NICE 2016 — NICE. Low back pain and sciatica in over 16s: assessment and management (NG59), 2016, atualizada em 2020. https://www.nice.org.uk/guidance/ng59",
   "AAFP Choosing Wisely 2012 — American Academy of Family Physicians. Choosing Wisely: don't do imaging for low back pain within the first six weeks unless red flags are present. https://www.choosingwisely.org",
   "Chaikof EL et al. SVS 2018 (J Vasc Surg 2018;67(1):2-77); Wanhainen A et al. ESVS 2024 (Eur J Vasc Endovasc Surg 2024;67(2):192-331).",
   "EAU 2025 — Skolarikos A et al. EAU urolithiasis. Eur Urol 2025;88(1):64-75. https://doi.org/10.1016/j.eururo.2025.03.011",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 28 Lombalgia."
  ]
 },
 "geca": {
  "encaminhar": [
   {
    "t": "Sala vermelha: desidratação grave com hipotensão, choque ou rebaixamento",
    "f": [
     4
    ]
   },
   {
    "t": "Internação: sepse, lesão renal aguda ou desidratação sem tolerância à via oral; considerar no imunossuprimido",
    "f": [
     4
    ]
   },
   {
    "t": "Cirurgia Geral: dor abdominal localizada ou desproporcional à diarreia (apendicite, isquemia mesentérica)",
    "f": [
     4
    ]
   }
  ],
  "pedir": [
   {
    "t": "Nenhum exame na diarreia aquosa aguda leve",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Hemograma, eletrólitos e função renal: hipovolemia ou hipotensão, toxemia, > 6 evacuações/24 h, diarreia inflamatória, cardiopatia ou imunossupressão",
    "f": [
     4
    ]
   },
   {
    "t": "Coprocultura ou painel molecular: febre, sangue ou muco nas fezes, dor abdominal intensa, sepse, > 7 dias ou imunossuprimido",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Pesquisa de C. difficile: diarreia após antibiótico ou relacionada a serviço de saúde",
    "f": [
     1
    ]
   },
   {
    "t": "Hemograma e função renal: diarreia com sangue com suspeita de E. coli produtora de Shiga (risco de síndrome hemolítico-urêmica)",
    "f": [
     1
    ]
   },
   {
    "t": "Hemocultura: suspeita de sepse, febre entérica ou imunossupressão",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Coprocultura ou parasitológico de rotina na diarreia aquosa < 7 dias sem sinal de gravidade",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Leucócitos fecais ou lactoferrina para definir a causa",
    "f": [
     1
    ]
   },
   {
    "t": "RX de abdome de rotina",
    "f": [
     3
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Shane AL et al. 2017 IDSA clinical practice guidelines for the diagnosis and management of infectious diarrhea. Clin Infect Dis 2017;65(12):e45-e80. PMID 29053792. https://doi.org/10.1093/cid/cix669",
   "Riddle MS et al. ACG clinical guideline: diagnosis, treatment, and prevention of acute diarrheal infections in adults. Am J Gastroenterol 2016;111(5):602-22. PMID 27068718. https://doi.org/10.1038/ajg.2016.126",
   "Scheirey CD et al. ACR AC Acute Nonlocalized Abdominal Pain. J Am Coll Radiol 2018;15(11S):S217-S231. https://doi.org/10.1016/j.jacr.2018.09.010",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 23 Diarreia aguda e cap. 25 Dor abdominal."
  ]
 },
 "dengue": {
  "encaminhar": [
   {
    "t": "Sala vermelha (grupo D): choque, desconforto respiratório, sangramento grave ou disfunção orgânica",
    "f": [
     1
    ]
   },
   {
    "t": "Leito de internação (grupo C): sinal de alarme (dor abdominal intensa, vômitos persistentes, hipotensão postural, letargia, sangramento de mucosa, Ht subindo)",
    "f": [
     1
    ]
   },
   {
    "t": "Observação até o hemograma (grupo B): sangramento de pele ou prova do laço positiva, condição clínica especial, risco social ou comorbidade",
    "f": [
     1
    ]
   },
   {
    "t": "Obstetrícia: gestante com dengue e sinal de alarme ou gravidade",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Hemograma completo: obrigatório no grupo B; grupo A: exames a critério médico (ver Divergências)",
    "f": [
     1
    ]
   },
   {
    "t": "Hemograma, albumina sérica e transaminases: obrigatórios nos grupos C e D",
    "f": [
     1
    ]
   },
   {
    "t": "Glicemia, ureia, creatinina, eletrólitos, gasometria, TTPa: grupos C e D conforme a necessidade",
    "f": [
     1
    ]
   },
   {
    "t": "RX de tórax (PA, perfil, Hjelm-Laurell) e US de abdome: recomendados nos grupos C e D (US mais sensível para derrames)",
    "f": [
     1
    ]
   },
   {
    "t": "NS1 ou RT-PCR até o 5º dia; sorologia IgM a partir do 6º dia: conforme a situação epidemiológica",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Esperar exame específico (NS1/sorologia) para classificar o grupo ou iniciar hidratação; não é necessário para a conduta",
    "f": [
     1
    ]
   }
  ],
  "div": [
   {
    "t": "Grupo A: o MS 2024 deixa exames a critério médico; não há fonte primária atual para hemograma em todos os suspeitos (protocolo local pode exigir)",
    "f": [
     1
    ]
   }
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Dengue: diagnóstico e manejo clínico – adulto e criança. 6ª ed. Brasília: MS, 2024. https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes (cópia conferida: https://portaldeboaspraticas.iff.fiocruz.br/biblioteca/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca/)"
  ]
 },
 "amigdalite": {
  "encaminhar": [
   {
    "t": "Sala vermelha (via aérea): estridor, dispneia, sialorreia, incapacidade de deglutir saliva ou suspeita de epiglotite",
    "f": [
     4,
     5
    ]
   },
   {
    "t": "Otorrinolaringologia: abscesso periamigdaliano (abaulamento do pilar, desvio de úvula, trismo, voz abafada) para punção ou drenagem",
    "f": [
     5,
     4
    ]
   },
   {
    "t": "Internação: abscesso cervical profundo ou síndrome de Lemierre (dor cervical, sepse, êmbolos pulmonares)",
    "f": [
     5,
     4
    ]
   }
  ],
  "pedir": [
   {
    "t": "Escore de Centor/McIsaac: estimar a probabilidade de estreptococo do grupo A",
    "f": [
     3
    ]
   },
   {
    "t": "Teste rápido (ou cultura) para estreptococo do grupo A: sem sinais virais e escore intermediário/alto (ponto de corte: ver Divergências)",
    "f": [
     1,
     2,
     4
    ]
   },
   {
    "t": "TC de pescoço com contraste: suspeita de abscesso periamigdaliano duvidoso ou cervical profundo",
    "f": [
     5,
     4
    ]
   },
   {
    "t": "Hemograma e heterófilo: suspeita de mononucleose (linfonodo cervical posterior, esplenomegalia, adulto jovem); pode ser negativo na 1ª semana",
    "f": [
     4
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Teste para estreptococo com sinais virais claros (tosse, coriza, rouquidão, úlceras orais)",
    "f": [
     1
    ]
   },
   {
    "t": "Cultura de orofaringe de confirmação em adulto com teste rápido negativo",
    "f": [
     1
    ]
   }
  ],
  "div": [
   {
    "t": "Teste rápido: com Centor/McIsaac 2–3 (Harrison 2025; McIsaac 1998) × NICE: Centor 3–4 já indica antibiótico, sem teste de rotina",
    "f": [
     4,
     3,
     6
    ]
   }
  ],
  "fontes": [
   "Shulman ST et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the IDSA. Clin Infect Dis 2012;55(10):e86-e102. PMID 22965026. https://doi.org/10.1093/cid/cis629",
   "ACP/CDC 2016 — Harris AM et al. Appropriate antibiotic use for acute respiratory tract infection in adults: advice for high-value care from the ACP and the CDC. Ann Intern Med 2016;164(6):425-34. PMID 26785402. https://doi.org/10.7326/M15-1840",
   "Centor RM et al. The diagnosis of strep throat in adults in the emergency room. Med Decis Making 1981;1(3):239-46. PMID 6763125. https://doi.org/10.1177/0272989X8100100304 ; McIsaac WJ et al. A clinical score to reduce unnecessary antibiotic use in patients with sore throat. CMAJ 1998;158(1):75-83. PMID 9475915",
   "Harrison's Principles of Internal Medicine, 22ª ed., 2025, cap. 37 Upper respiratory symptoms, including earache, sinus symptoms, and sore throat (abscessos cervicais, Lemierre, mononucleose, Centor).",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 109 Emergências otorrinolaringológicas (resolve a referência 75 \"a confirmar\" do rascunho).",
   "NICE NG84. Sore throat (acute): antimicrobial prescribing. National Institute for Health and Care Excellence, 2018. https://www.nice.org.uk/guidance/ng84"
  ]
 },
 "sinusite": {
  "encaminhar": [
   {
    "t": "Sala vermelha / Otorrino / Oftalmologia: edema periorbitário, proptose, dor à movimentação ocular, diplopia ou baixa visual (complicação orbitária)",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "Sala vermelha / Neurocirurgia: cefaleia intensa, rigidez de nuca, alteração do estado mental ou déficit focal (complicação intracraniana)",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "Otorrino (ambulatório): rinossinusite aguda recorrente (≥ 4 episódios/ano) ou crônica (≥ 12 semanas)",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Diagnóstico clínico de bacteriana: sintomas ≥ 10 dias sem melhora, início grave (febre alta e secreção purulenta por 3–4 dias) ou piora após melhora inicial",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "TC de seios da face e órbitas com contraste (RM se disponível): suspeita de complicação orbitária",
    "f": [
     2
    ]
   },
   {
    "t": "RM de crânio com contraste (ou TC com contraste): suspeita de complicação intracraniana",
    "f": [
     2,
     4
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX ou TC de seios da face na rinossinusite aguda que preenche critérios clínicos, sem suspeita de complicação",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Cultura de swab nasal ou nasofaríngeo de rotina",
    "f": [
     3
    ]
   }
  ],
  "div": [],
  "fontes": [
   "AAO-HNS 2025 — Payne SC et al. Clinical practice guideline: adult sinusitis update. Otolaryngol Head Neck Surg 2025;173(Suppl 1):S1-S56. PMID 40742114. https://doi.org/10.1002/ohn.1344 (substitui Rosenfeld 2015)",
   "ACR Appropriateness Criteria® Sinonasal Disease: 2021 Update. J Am Coll Radiol 2022;19(5S):S175-S193. https://doi.org/10.1016/j.jacr.2022.02.011",
   "Chow AW et al. IDSA clinical practice guideline for acute bacterial rhinosinusitis in children and adults. Clin Infect Dis 2012;54(8):e72-e112. PMID 22438350. https://doi.org/10.1093/cid/cir1043",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 109 Emergências otorrinolaringológicas."
  ]
 },
 "asma": {
  "encaminhar": [
   {
    "t": "Sala vermelha: sonolência, confusão, tórax silencioso, cianose (risco de vida); fala em palavras, FR > 30, FC > 120, SpO2 < 90% ou PFE ≤ 50% (crise grave)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Internação: PFE/VEF1 baixo após 1 h de tratamento, sem resposta clínica, crise grave prévia (intubação) ou risco social (limiar: ver Divergências)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "UTI: piora apesar do tratamento, sonolência, exaustão, PaCO2 normal ou elevada, necessidade de ventilação",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "PFE (ou VEF1) antes e 1 h após o tratamento: graduar a crise e decidir alta",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Oximetria: toda crise",
    "f": [
     1
    ]
   },
   {
    "t": "Gasometria arterial: PFE ou VEF1 < 50% do previsto, sem resposta ao tratamento inicial ou piora; SpO2 < 92% (BTS/SIGN)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "RX de tórax: suspeita de complicação ou diagnóstico alternativo (pneumotórax, pneumonia), sobretudo em idoso, ou sem resposta ao tratamento",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX de tórax de rotina na crise de asma",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Gasometria de rotina na crise leve ou moderada",
    "f": [
     1
    ]
   },
   {
    "t": "Antibiótico (e exames para justificá-lo) sem evidência de infecção pulmonar",
    "f": [
     1
    ]
   }
  ],
  "div": [
   {
    "t": "Internação: GINA pesa estado clínico e PFE < 50% após 1 h (GINA 2026) × BTS/SIGN: alta possível se PFE > 75% 1 h após o tratamento",
    "f": [
     1,
     2
    ]
   }
  ],
  "fontes": [
   "Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, 2026 update (publicado em 06/05/2026), cap. 9 Management of exacerbations. https://ginasthma.org/2026-gina-strategy-report/",
   "BTS/SIGN 2019 — British Thoracic Society / SIGN. British guideline on the management of asthma (SIGN 158), 2019 — seção de crise aguda mantida em vigor; a NG245 (BTS/NICE/SIGN 2024) não cobre crise aguda. https://www.sign.ac.uk/our-guidelines/british-guideline-on-the-management-of-asthma/",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 41 Asma."
  ]
 },
 "dpoc": {
  "encaminhar": [
   {
    "t": "Sala vermelha / UTI: acidose respiratória (pH < 7,35 com PaCO2 > 45) com indicação de VNI, rebaixamento, instabilidade hemodinâmica ou necessidade de intubação",
    "f": [
     1
    ]
   },
   {
    "t": "Internação: dispneia grave sem resposta, insuficiência respiratória, sinal novo (cianose, edema), comorbidade grave ou falta de suporte domiciliar",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Oximetria; O2 controlado com alvo de SpO2 88–92%",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Gasometria arterial (venosa nos casos menos graves): indicação de internação, SpO2 ≤ 92%, sonolência ou suspeita de hipercapnia",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "RX de tórax: exacerbação avaliada no PS (pneumonia, pneumotórax, congestão)",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "ECG e troponina: dor torácica, taquicardia/arritmia ou suspeita de isquemia",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "BNP/NT-proBNP: suspeita de insuficiência cardíaca associada",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Hemograma, eletrólitos, função renal, glicemia: quando há indicação de internação",
    "f": [
     3
    ]
   },
   {
    "t": "Angio-TC de tórax: suspeita de TEP (D-dímero pouco útil na DPOC)",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Cultura de escarro: exacerbações frequentes, obstrução grave ou necessidade de ventilação mecânica",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Espirometria durante a exacerbação (fazer no seguimento, 4 a 8 semanas após a alta)",
    "f": [
     3
    ]
   },
   {
    "t": "Cultura de escarro na exacerbação leve tratada em casa",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Global Initiative for Chronic Obstructive Lung Disease. Global Strategy for the Prevention, Diagnosis and Management of COPD: 2026 Report, v1.3, 08/12/2025, cap. 4 Management of exacerbations. https://goldcopd.org/2026-gold-report-and-pocket-guide/ (PDF: https://goldcopd.org/wp-content/uploads/2025/12/GOLD-REPORT-2026-v1.3-8Dec2025_WMV.pdf)",
   "BTS 2017 — O'Driscoll BR et al. BTS guideline for oxygen use in adults in healthcare and emergency settings. Thorax 2017;72(Suppl 1):ii1-ii90.",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 42 DPOC."
  ]
 },
 "has": {
  "encaminhar": [
   {
    "t": "Sala vermelha: emergência hipertensiva — PA muito elevada com lesão aguda de órgão-alvo (AVC, SCA, edema agudo de pulmão, dissecção, encefalopatia, eclâmpsia)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Protocolo de AVC / Neurologia: déficit focal",
    "f": [
     4
    ]
   },
   {
    "t": "Cardiologia / Cirurgia cardiovascular: dor torácica com suspeita de SCA ou dissecção de aorta",
    "f": [
     5,
     6
    ]
   },
   {
    "t": "Obstetrícia: gestante ≥ 20 semanas ou puérpera com PA ≥ 140/90 mmHg",
    "f": [
     7
    ]
   },
   {
    "t": "Atenção primária em até 7 dias: PA ≥ 180/110 sem lesão de órgão-alvo, com ajuste ou início de anti-hipertensivo",
    "f": [
     1,
     5
    ]
   }
  ],
  "pedir": [
   {
    "t": "ECG, creatinina, eletrólitos, urina tipo I, hemograma e fundo de olho: suspeita de emergência hipertensiva",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "Troponina: dor torácica ou dispneia",
    "f": [
     3,
     5
    ]
   },
   {
    "t": "Plaquetas, DHL, haptoglobina, bilirrubina indireta e esquizócitos: suspeita de microangiopatia trombótica (hipertensão maligna)",
    "f": [
     3
    ]
   },
   {
    "t": "TC de crânio sem contraste: déficit focal, cefaleia súbita, convulsão ou alteração do estado mental",
    "f": [
     3,
     4
    ]
   },
   {
    "t": "Angio-TC de aorta: dor torácica ou dorsal lancinante, déficit de pulso",
    "f": [
     6
    ]
   },
   {
    "t": "Hemograma com plaquetas, creatinina, transaminases, DHL e proteinúria: gestante com suspeita de pré-eclâmpsia",
    "f": [
     7
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exames de rotina para lesão de órgão-alvo na PA elevada assintomática sem sintoma de alarme (ver Divergências: fonte de 2013)",
    "f": [
     8
    ]
   }
  ],
  "div": [
   {
    "t": "Exames de rotina na PA elevada assintomática: só a ACEP 2013 contraindica; a política de 2025 não reavaliou essa pergunta",
    "f": [
     8
    ]
   }
  ],
  "fontes": [
   "Brandão AA et al. Diretriz Brasileira de Hipertensão Arterial – 2025 (SBC/SBH/SBN). Arq Bras Cardiol 2025;122(9):e20250624. https://doi.org/10.36660/abc.20250624",
   "McEvoy JW et al. 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. Eur Heart J 2024;45(38):3912-4018. PMID 39210715. https://doi.org/10.1093/eurheartj/ehae178",
   "van den Born BJH et al. ESC Council on hypertension position document on the management of hypertensive emergencies. Eur Heart J Cardiovasc Pharmacother 2019;5(1):37-46. PMID 30165588. https://doi.org/10.1093/ehjcvp/pvy032",
   "Prabhakaran S et al. 2026 Guideline for the early management of patients with acute ischemic stroke (AHA/ASA). Stroke 2026 (substitui Powers 2019).",
   "Rao SV et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI guideline for the management of patients with acute coronary syndromes. Circulation 2025.",
   "Isselbacher EM et al. 2022 ACC/AHA guideline for the diagnosis and management of aortic disease. Circulation 2022;146:e334-e482.",
   "MS 2022 — Ministério da Saúde. Manual de gestação de alto risco, 2022; ACOG Practice Bulletin 222: gestational hypertension and preeclampsia. Obstet Gynecol 2020;135(6):e237-e260.",
   "ACEP. Clinical policy: a critical issue in the outpatient management of adult ED patients with asymptomatic elevated blood pressure. Ann Emerg Med 2025 (julho) — substitui Wolf SJ et al. Ann Emerg Med 2013;62(1):59-68. PMID 23842053. https://doi.org/10.1016/j.annemergmed.2013.05.012"
  ]
 },
 "tce": {
  "encaminhar": [
   {
    "t": "Sala vermelha: Glasgow ≤ 12, queda de Glasgow, anisocoria, convulsão pós-trauma ou déficit focal",
    "f": [
     1
    ]
   },
   {
    "t": "Neurocirurgia: lesão intracraniana nova na TC (hematoma, contusão, afundamento, fratura de base) ou coma, confusão > 4 h, déficit progressivo, fístula liquórica",
    "f": [
     1
    ]
   },
   {
    "t": "Internação/observação: Glasgow que não volta a 15 após a TC, vômitos persistentes, cefaleia intensa, intoxicação ou sem adulto responsável em casa",
    "f": [
     1
    ]
   },
   {
    "t": "Alta possível em anticoagulado/antiagregado com TC inicial sem sangramento e exame no basal, sem outro critério",
    "f": [
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "TC de crânio em até 1 h: Glasgow ≤ 12 inicial ou < 15 após 2 h, suspeita de fratura aberta, afundamento ou de base, convulsão, déficit focal, > 1 vômito",
    "f": [
     1
    ]
   },
   {
    "t": "TC em até 8 h, se perda de consciência ou amnésia e: ≥ 65 anos, coagulopatia, mecanismo perigoso ou amnésia retrógrada > 30 min",
    "f": [
     1
    ]
   },
   {
    "t": "Canadian CT Head Rule (Glasgow 13–15 com perda de consciência, amnésia ou desorientação): TC se 1 critério de alto ou médio risco",
    "f": [
     3,
     2
    ]
   },
   {
    "t": "CCHR alto risco: Glasgow < 15 em 2 h, suspeita de fratura aberta/afundamento, sinal de fratura de base, ≥ 2 vômitos, ≥ 65 anos",
    "f": [
     3
    ]
   },
   {
    "t": "CCHR médio risco: amnésia retrógrada ≥ 30 min; atropelamento, ejeção do veículo, queda > 1 m (3 pés) ou 5 degraus",
    "f": [
     3
    ]
   },
   {
    "t": "CCHR não se aplica a anticoagulado, < 16 anos, convulsão pós-trauma ou trauma penetrante",
    "f": [
     3,
     2
    ]
   },
   {
    "t": "Considerar TC em até 8 h: anticoagulado ou antiagregado (exceto AAS isolado), mesmo sem outro critério",
    "f": [
     1
    ]
   },
   {
    "t": "TC de coluna cervical: Canadian C-spine ou NEXUS positivos, ou Glasgow ≤ 12",
    "f": [
     3,
     4,
     1
    ]
   },
   {
    "t": "TP/INR: em uso de varfarina, para reversão se houver lesão intracraniana",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "TC de crânio em TCE leve com Canadian CT Head Rule negativa (fora dos grupos de exclusão)",
    "f": [
     3,
     2,
     5
    ]
   },
   {
    "t": "RX de crânio para avaliar lesão intracraniana",
    "f": [
     1
    ]
   },
   {
    "t": "TC de controle de rotina com TC inicial sem sangramento e exame estável, inclusive em anticoagulado",
    "f": [
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "NICE 2023 — NICE. Head injury: assessment and early management (NG232), maio 2023, atualizada em 2025. https://www.nice.org.uk/guidance/ng232",
   "Valente JH et al. Clinical policy: critical issues in the management of adult patients presenting to the ED with mild traumatic brain injury (ACEP). Ann Emerg Med 2023;81(5):e63-e105. PMID 37085214. https://doi.org/10.1016/j.annemergmed.2023.01.014",
   "Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury. Lancet 2001;357(9266):1391-6. PMID 11356436. https://doi.org/10.1016/S0140-6736(00)04561-X ; validação: Stiell IG et al. JAMA 2005;294(12):1511-8. PMID 16189364. https://doi.org/10.1001/jama.294.12.1511",
   "Stiell IG et al. The Canadian C-spine rule for radiography in alert and stable trauma patients. JAMA 2001;286(15):1841-8. PMID 11597285. https://doi.org/10.1001/jama.286.15.1841 ; Hoffman JR et al. NEXUS. N Engl J Med 2000;343(2):94-9. PMID 10891516. https://doi.org/10.1056/NEJM200007133430203",
   "ACEP Choosing Wisely 2013 — ACEP. Choosing Wisely: avoid CT of the head in ED patients with minor head injury who are at low risk based on validated decision rules. https://www.choosingwisely.org"
  ]
 },
 "entorse": {
  "encaminhar": [
   {
    "t": "Ortopedia: fratura na RX, luxação, deformidade, instabilidade grosseira ou lesão neurovascular",
    "f": [
     5
    ]
   },
   {
    "t": "Ortopedia (avaliação precoce): suspeita de ruptura do tendão de Aquiles (Thompson positivo, falha palpável, perda de flexão plantar)",
    "f": [
     7
    ]
   },
   {
    "t": "Sala vermelha / Cirurgia vascular: suspeita de luxação de joelho (risco de lesão da artéria poplítea) — angio-TC",
    "f": [
     5
    ]
   }
  ],
  "pedir": [
   {
    "t": "RX de tornozelo (Ottawa): dor maleolar e dor à palpação da borda posterior ou ponta de maléolo (6 cm distais), ou incapaz de dar 4 passos após e no PS",
    "f": [
     1,
     5
    ]
   },
   {
    "t": "RX de pé (Ottawa): dor no médio-pé e dor à palpação da base do 5º metatarso ou do navicular, ou incapacidade de dar 4 passos",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "RX de joelho (Ottawa): ≥ 55 anos, dor isolada na patela, dor na cabeça da fíbula, flexão < 90° ou incapacidade de dar 4 passos",
    "f": [
     3,
     5
    ]
   },
   {
    "t": "RX de joelho (Pittsburgh): queda ou trauma contuso com idade < 12 ou > 50 anos, ou incapacidade de dar 4 passos",
    "f": [
     4
    ]
   },
   {
    "t": "RM (ambulatório): suspeita de lesão ligamentar, meniscal ou tendínea com RX normal",
    "f": [
     5
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX de tornozelo ou pé com regra de Ottawa negativa",
    "f": [
     2,
     5
    ]
   },
   {
    "t": "RX de joelho com regra de Ottawa (ou Pittsburgh) negativa",
    "f": [
     3,
     4,
     5
    ]
   },
   {
    "t": "RM na porta em entorse aguda sem suspeita de lesão de tratamento imediato",
    "f": [
     5
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Stiell IG et al. Decision rules for the use of radiography in acute ankle injuries. JAMA 1993;269(9):1127-32. PMID 8433468. https://doi.org/10.1001/jama.269.9.1127",
   "Bachmann LM et al. Accuracy of Ottawa ankle rules to exclude fractures of the ankle and mid-foot: systematic review. BMJ 2003;326(7386):417. PMID 12595378. https://doi.org/10.1136/bmj.326.7386.417",
   "Stiell IG et al. Prospective validation of a decision rule for the use of radiography in acute knee injuries. JAMA 1996;275(8):611-5. PMID 8594242",
   "Seaberg DC et al. Multicenter comparison of two clinical decision rules for the use of radiography in acute, high-risk knee injuries. Ann Emerg Med 1998;32(1):8-13. PMID 9656942. https://doi.org/10.1016/S0196-0644(98)70092-7",
   "ACR Appropriateness Criteria® Acute Trauma to the Ankle. J Am Coll Radiol 2020;17(11S):S355-S366. PMID 33153549. https://doi.org/10.1016/j.jacr.2020.09.014",
   "ACR Appropriateness Criteria® Acute Trauma to the Knee. J Am Coll Radiol 2020;17(5S):S12-S25. PMID 32370956. https://doi.org/10.1016/j.jacr.2020.01.041",
   "Chiodo CP et al. Diagnosis and treatment of acute Achilles tendon rupture (AAOS). J Am Acad Orthop Surg 2010;18(8):503-10. PMID 20675643. https://doi.org/10.5435/00124635-201008000-00007"
  ]
 },
 "erisipela": {
  "encaminhar": [
   {
    "t": "Cirurgia / sala vermelha: suspeita de fasciíte necrosante (dor desproporcional, bolhas, necrose, crepitação, anestesia, toxemia); não esperar imagem",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Cirurgia Geral: abscesso para drenagem",
    "f": [
     1
    ]
   },
   {
    "t": "Internação: SIRS ou hipotensão, alteração mental, imunossupressão grave, suspeita de infecção profunda ou falha do tratamento oral",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Diagnóstico clínico na erisipela/celulite não purulenta típica",
    "f": [
     1
    ]
   },
   {
    "t": "US de partes moles (POCUS): dúvida entre celulite e abscesso",
    "f": [
     4,
     5
    ]
   },
   {
    "t": "Hemocultura: câncer em quimioterapia, neutropenia, imunodeficiência grave, imersão em água, mordedura de animal ou sepse",
    "f": [
     1,
     5
    ]
   },
   {
    "t": "Hemograma, função renal e eletrólitos: quando se cogita internação",
    "f": [
     5
    ]
   },
   {
    "t": "TC com contraste ou RM: suspeita de infecção profunda, sem atrasar a cirurgia na fasciíte necrosante",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "US Doppler venoso: só com fatores de risco para trombose venosa profunda",
    "f": [
     5
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Hemocultura, cultura de swab ou biópsia de pele na celulite típica sem gravidade",
    "f": [
     1
    ]
   },
   {
    "t": "Escore LRINEC para afastar fasciíte necrosante (sensibilidade baixa)",
    "f": [
     3,
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the IDSA. Clin Infect Dis 2014;59(2):e10-e52. PMID 24973422. https://doi.org/10.1093/cid/ciu444",
   "Sartelli M et al. 2018 WSES/SIS-E consensus conference: recommendations for the management of skin and soft-tissue infections. World J Emerg Surg 2018;13:58. PMID 30564282. https://doi.org/10.1186/s13017-018-0219-9",
   "Fernando SM et al. Necrotizing soft tissue infection: diagnostic accuracy of physical examination, imaging, and LRINEC score. Ann Surg 2019;269(1):58-65. PMID 29672405. https://doi.org/10.1097/SLA.0000000000002774",
   "Gottlieb M et al. Point-of-care ultrasonography for the diagnosis of skin and soft tissue abscesses: a systematic review and meta-analysis. Ann Emerg Med 2020;76(1):67-77. PMID 32081383. https://doi.org/10.1016/j.annemergmed.2020.01.004 (resolve a referência 97 \"a confirmar\")",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 52 Infecções cutâneas."
  ]
 },
 "gota": {
  "encaminhar": [
   {
    "t": "Ortopedia (urgência): suspeita de artrite séptica (febre, prótese articular, toxemia, líquido purulento) para drenagem",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "Internação: artrite com sepse ou poliartrite febril",
    "f": [
     3
    ]
   },
   {
    "t": "Seguimento ambulatorial (clínica/reumatologia): ≥ 2 crises/ano, tofos ou dano radiográfico — indicação de hipouricemiante",
    "f": [
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "Artrocentese com pesquisa de cristais, Gram, cultura e celularidade: monoartrite sem diagnóstico prévio ou suspeita de infecção (mesmo com cristais)",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Ácido úrico sérico: pode estar normal na crise; repetir ≥ 2 semanas após para confirmar e seguir",
    "f": [
     1
    ]
   },
   {
    "t": "Função renal: antes de escolher o tratamento da crise",
    "f": [
     2
    ]
   },
   {
    "t": "Hemograma e PCR: suspeita de infecção",
    "f": [
     3
    ]
   },
   {
    "t": "US articular (duplo contorno) ou RX: dúvida diagnóstica sem artrocentese possível",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Ácido úrico na crise para afastar gota (normal em parte das crises)",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Richette P et al. 2018 updated EULAR evidence-based recommendations for the diagnosis of gout. Ann Rheum Dis 2020;79(1):31-8. PMID 31167758. https://doi.org/10.1136/annrheumdis-2019-215315",
   "FitzGerald JD et al. 2020 American College of Rheumatology guideline for the management of gout. Arthritis Care Res (Hoboken) 2020;72(6):744-60. PMID 32391934. https://doi.org/10.1002/acr.24180",
   "Coakley G et al. BSR & BHPR, BOA, RCGP and BSAC guidelines for management of the hot swollen joint in adults. Rheumatology (Oxford) 2006;45(8):1039-41 (antiga; sem versão mais recente da BSR localizada)."
  ]
 },
 "hda": {
  "encaminhar": [
   {
    "t": "Sala vermelha: instabilidade hemodinâmica, hematêmese volumosa ou rebaixamento",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Endoscopia digestiva alta em até 24 h após estabilização; em até 12 h se suspeita de varizes",
    "f": [
     1,
     2,
     3
    ]
   },
   {
    "t": "Radiologia intervencionista / Cirurgia: falha da hemostasia endoscópica ou ressangramento; cirurgia se perfuração",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Internação: Glasgow-Blatchford > 1",
    "f": [
     1,
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "Hemograma, tipagem e prova cruzada, coagulograma, ureia, creatinina, eletrólitos: toda HDA",
    "f": [
     2
    ]
   },
   {
    "t": "Escore de Glasgow-Blatchford antes da endoscopia: GBS ≤ 1 permite alta com endoscopia ambulatorial (preferir ao AIMS65)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Função hepática e albumina: suspeita de cirrose ou varizes",
    "f": [
     3
    ]
   },
   {
    "t": "Angio-TC de abdome: sangramento ativo com endoscopia indisponível, sem fonte identificada ou após falha endoscópica",
    "f": [
     4
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Aspirado ou lavagem nasogástrica para diagnóstico ou prognóstico",
    "f": [
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Laine L et al. ACG clinical guideline: upper gastrointestinal and ulcer bleeding. Am J Gastroenterol 2021;116(5):899-917. PMID 33929377. https://doi.org/10.14309/ajg.0000000000001245",
   "Gralnek IM et al. Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage (NVUGIH): ESGE Guideline – update 2021. Endoscopy 2021;53(3):300-32. PMID 33567467. https://doi.org/10.1055/a-1369-5274",
   "de Franchis R et al. Baveno VII – Renewing consensus in portal hypertension. J Hepatol 2022;76(4):959-74. PMID 35120736. https://doi.org/10.1016/j.jhep.2021.12.022",
   "ACR Appropriateness Criteria® Nonvariceal Upper Gastrointestinal Bleeding: 2024 Update. J Am Coll Radiol 2024;21(11S):S433-S447. PMID 39488353. https://doi.org/10.1016/j.jacr.2024.08.021"
  ]
 }
};
if (typeof module!=="undefined") module.exports={EXAMES};

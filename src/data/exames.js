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
 },
 "q:lombalgia": {
  "encaminhar": [
   {
    "t": "Coluna/neurocirurgia (emergência; RM em até 4 h; transferir se não houver RM): sintoma urinário, fecal, sexual ou anestesia em sela iniciados ou piorados há até 14 dias",
    "f": [
     6
    ]
   },
   {
    "t": "Coluna/neurocirurgia (emergência; RM em até 4 h): déficit motor grave ou progressivo nas duas pernas",
    "f": [
     6
    ]
   },
   {
    "t": "Coluna (urgente, em até 2 semanas, com orientação de retorno): ciática súbita nas duas pernas ou que passou de uma para as duas, sem sintoma de cauda equina",
    "f": [
     6
    ]
   },
   {
    "t": "Coluna (urgente, em até 2 semanas): sintomas de cauda equina há mais de 2 semanas e estáveis",
    "f": [
     6
    ]
   },
   {
    "t": "Neurocirurgia + internação: suspeita de abscesso epidural ou osteomielite vertebral com déficit neurológico ou sepse",
    "f": [
     7
    ]
   },
   {
    "t": "Oncologia/coluna como emergência (RM de toda a coluna em até 24 h): câncer conhecido ou suspeito com dor e fraqueza, dormência, alteração da marcha ou esfincteriana (compressão medular)",
    "f": [
     8
    ]
   },
   {
    "t": "Sala vermelha + cirurgia vascular: dor lombar súbita com massa pulsátil, hipotensão ou síncope (aneurisma roto) ou suspeita de dissecção",
    "f": [
     11,
     12
    ]
   },
   {
    "t": "Coluna (ambulatorial): dor sem melhora após 6 semanas de tratamento em candidato a cirurgia ou infiltração",
    "f": [
     4,
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "RM de coluna lombar: suspeita de cauda equina (sem contraste ou sem e com contraste); suspeita de infecção, câncer ou imunossupressão (preferir sem e com contraste)",
    "f": [
     4
    ]
   },
   {
    "t": "RM de toda a coluna: câncer com sinais de compressão medular (em até 24 h) ou suspeita de metástase sem compressão (em até 1 semana)",
    "f": [
     8
    ]
   },
   {
    "t": "Ultrassom de bexiga (resíduo pós-miccional) na suspeita de cauda equina: > 200 mL reforça; < 200 mL não afasta nem atrasa a RM; > 600 mL, sondar",
    "f": [
     6
    ]
   },
   {
    "t": "Hemoculturas (2 pares), VHS e PCR: dor nova com febre, bacteremia, droga injetável ou imunossupressão",
    "f": [
     7
    ]
   },
   {
    "t": "RX de coluna lombar (ou TC/RM): trauma leve em idoso, osteoporose ou corticoide crônico (fratura por fragilidade)",
    "f": [
     4,
     9
    ]
   },
   {
    "t": "TC de coluna toracolombar: trauma de alta energia ou paciente de alto risco ou impossível de examinar",
    "f": [
     10
    ]
   },
   {
    "t": "Angiotomografia de aorta: ADD-RS ≥ 2, ou ADD-RS 0-1 com D-dímero ≥ 500 ng/mL; suspeita de aneurisma roto em paciente que permita o exame",
    "f": [
     12,
     11
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX, TC ou RM na lombalgia aguda ou subaguda, com ou sem ciática, sem sinal de alarme",
    "f": [
     4,
     3,
     5
    ]
   },
   {
    "t": "Imagem lombar na emergência para dor não traumática sem sinal de alarme",
    "f": [
     13,
     3
    ]
   },
   {
    "t": "RM apenas por ciática persistente em quem não é candidato a cirurgia ou infiltração",
    "f": [
     2
    ]
   },
   {
    "t": "Ultrassom de bexiga como critério para decidir se pede a RM na suspeita de cauda equina",
    "f": [
     6
    ]
   }
  ],
  "div": [
   {
    "t": "Suspeita de câncer sem déficit: ACP propõe começar com RX de coluna e VHS (Chou 2011); ACR e NICE indicam RM como exame inicial (NICE: em até 1 semana)",
    "f": [
     3,
     4,
     8
    ]
   },
   {
    "t": "Idade < 20 ou > 50 anos é sinal de alarme (HC-FMUSP 2024); isolada, quase não muda a chance de câncer, o que pesa é câncer prévio",
    "f": [
     14,
     9
    ]
   },
   {
    "t": "Osteomielite vertebral: antibiótico imediato só com sepse, instabilidade ou déficit; se estável, aguardar a biópsia",
    "f": [
     7
    ]
   }
  ],
  "fontes": [
   "Qaseem A et al. Noninvasive treatments for acute, subacute, and chronic low back pain: a clinical practice guideline from the American College of Physicians. Ann Intern Med 2017;166(7):514-530. doi:10.7326/M16-2367. PMID 28192789",
   "[Chou 2007] Chou R et al. Diagnosis and treatment of low back pain: a joint clinical practice guideline from the ACP and the American Pain Society. Ann Intern Med 2007;147(7):478-491. doi:10.7326/0003-4819-147-7-200710020-00006. PMID 17909209",
   "[Chou 2011] Chou R et al. Diagnostic imaging for low back pain: advice for high-value health care from the ACP. Ann Intern Med 2011;154(3):181-189. doi:10.7326/0003-4819-154-3-201102010-00008. PMID 21282698",
   "[ACR lombalgia 2021] Hutchins TA et al. ACR Appropriateness Criteria Low Back Pain: 2021 Update. J Am Coll Radiol 2021;18(11S):S361-S379. doi:10.1016/j.jacr.2021.08.002. PMID 34794594 (versão vigente; sem atualização posterior no PubMed em 22/10/2026)",
   "[NICE NG59] NICE NG59. Low back pain and sciatica in over 16s: assessment and management. Publicada em 30/11/2016, atualizada em 29/07/2026. https://www.nice.org.uk/guidance/ng59",
   "[GIRFT CES 2026] GIRFT/NHS England. Spinal Surgery: National Suspected Cauda Equina Syndrome (CES) Pathway. Fevereiro de 2023, atualizado em outubro de 2023, julho de 2024, fevereiro, agosto e setembro de 2025, janeiro, fevereiro e março de 2026. https://gettingitrightfirsttime.co.uk/wp-content/uploads/2026/04/National-Suspected-Cauda-Equina-Pathway-March-2026.pdf",
   "[IDSA 2015] Berbari EF et al. 2015 IDSA clinical practice guidelines for the diagnosis and treatment of native vertebral osteomyelitis in adults. Clin Infect Dis 2015;61(6):e26-e46. doi:10.1093/cid/civ482. PMID 26229122",
   "[NICE NG234] NICE NG234. Spinal metastases and metastatic spinal cord compression. 06/09/2023 (rec. 1.3.2, 1.3.3, 1.5.2 e 1.5.3). https://www.nice.org.uk/guidance/ng234",
   "[Downie 2013] Downie A et al. Red flags to screen for malignancy and fracture in patients with low back pain: systematic review. BMJ 2013;347:f7095. doi:10.1136/bmj.f7095. PMID 24335669",
   "[ACR trauma de coluna 2024] ACR Appropriateness Criteria Acute Spinal Trauma: 2024 Update. J Am Coll Radiol 2025;22(5S):S48-S66. doi:10.1016/j.jacr.2025.02.013. PMID 40409895",
   "[ESVS 2024] Wanhainen A et al. European Society for Vascular Surgery (ESVS) 2024 clinical practice guidelines on the management of abdominal aorto-iliac artery aneurysms. Eur J Vasc Endovasc Surg 2024;67(2):192-331. doi:10.1016/j.ejvs.2023.11.002. PMID 38307694 (rec. 70: angiotomografia imediata na suspeita de ruptura; rec. 72: hipotensão permissiva)",
   "[ESC 2024] Mazzolai L et al. 2024 ESC Guidelines for the management of peripheral arterial and aortic diseases. Eur Heart J 2024;45(36):3538-3700. doi:10.1093/eurheartj/ehae179. PMID 39210722",
   "[CW Canadá 2024] Choosing Wisely Canada. Emergency Medicine: Ten things physicians and patients should question (atualizado em setembro de 2024). https://choosingwiselycanada.org/recommendation/emergency-medicine/",
   "[HC-FMUSP 2024] Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed., 2024, cap. 28 — Lombalgia (conferência; tabela de sinais de alarme)"
  ]
 },
 "q:dor-musculoesqueletica": {
  "encaminhar": [
   {
    "t": "Ortopedia + internação: suspeita de artrite séptica em articulação nativa (punção e hemoculturas antes do antibiótico; drenagem precoce)",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "Ortopedia (antes do antibiótico, se estável): prótese articular dolorosa, quente ou com secreção (suspeita de infecção de prótese)",
    "f": [
     2
    ]
   },
   {
    "t": "Ortopedia (imediata, fasciotomia): suspeita de síndrome compartimental, após abrir curativo ou gesso circular até a pele e reavaliar em até 30 min",
    "f": [
     5
    ]
   },
   {
    "t": "Cirurgia vascular (emergência): membro frio, pálido, sem pulso, com dor, parestesia ou paresia súbitas (isquemia aguda)",
    "f": [
     7
    ]
   },
   {
    "t": "Cirurgia (imediata) + sala vermelha: suspeita de fasciite necrosante (dor desproporcional, bolhas, necrose, crepitação, toxemia)",
    "f": [
     8
    ]
   },
   {
    "t": "Ortopedia (urgente): fratura exposta, luxação, fratura com déficit neurovascular; fratura exposta de osso longo, retropé ou mediopé vai para centro ortoplástico",
    "f": [
     6
    ]
   },
   {
    "t": "Neurologia/neurocirurgia: cervicalgia com déficit, mielopatia ou suspeita de dissecção arterial cervical",
    "f": [
     16,
     20,
     21
    ]
   },
   {
    "t": "Reumatologia (urgente) e oftalmologia no mesmo dia se alteração visual: suspeita de arterite de células gigantes",
    "f": [
     28
    ]
   }
  ],
  "pedir": [
   {
    "t": "RX do tornozelo ou do pé: apenas se a regra de Ottawa for positiva",
    "f": [
     9,
     10
    ]
   },
   {
    "t": "RX do joelho: regra de Ottawa positiva (≥ 55 anos, dor na cabeça da fíbula ou isolada na patela, flexão < 90°, incapaz de dar 4 passos logo após o trauma e na emergência)",
    "f": [
     11,
     12
    ]
   },
   {
    "t": "TC de coluna cervical sem contraste: trauma com imagem indicada pela regra canadense ou NEXUS",
    "f": [
     16,
     17,
     18
    ]
   },
   {
    "t": "Angiotomografia de crânio e pescoço: suspeita de lesão ou dissecção arterial cervical (trauma, Horner doloroso, déficit, cefaleia súbita)",
    "f": [
     16,
     21,
     22
    ]
   },
   {
    "t": "RM de coluna cervical: mielopatia, ou dor com suspeita de infecção ou câncer (sem e com contraste)",
    "f": [
     20,
     19
    ]
   },
   {
    "t": "RX da região como exame inicial: trauma de ombro, quadril, mão ou punho, ou dor aguda no ombro",
    "f": [
     25,
     23,
     24
    ]
   },
   {
    "t": "RX normal com suspeita de fratura oculta: quadril, RM (TC se RM indisponível); escafoide, RM ou TC, ou repetir RX do punho em 10 a 14 dias",
    "f": [
     23,
     25
    ]
   },
   {
    "t": "Punção articular (celularidade, Gram, cultura, cristais), hemoculturas, hemograma, PCR, VHS, função renal e hepática: suspeita de artrite séptica",
    "f": [
     1
    ]
   },
   {
    "t": "RX da articulação na suspeita de artrite séptica (basal; não faz o diagnóstico) e ultrassom para achar derrame ou guiar punção (quadril, sacroilíaca)",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "Ultrassom venoso proximal: Wells para TVP ≥ 2 (em até 4 h); D-dímero se Wells 0-1, ou com anticoagulação interina se o ultrassom não sair em 4 h",
    "f": [
     26
    ]
   },
   {
    "t": "VHS e PCR: dor na cintura escapular ou pélvica após os 50 anos com cefaleia, claudicação da mandíbula ou alteração visual",
    "f": [
     28
    ]
   },
   {
    "t": "ECG e troponina: dor no ombro, braço, pescoço ou mandíbula aos esforços ou com sintomas autonômicos",
    "f": [
     29
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX de tornozelo ou pé com regra de Ottawa negativa",
    "f": [
     31,
     9
    ]
   },
   {
    "t": "RX cervical no trauma com regra canadense negativa (alerta e estável, 16 anos ou mais)",
    "f": [
     31,
     13
    ]
   },
   {
    "t": "RX simples de coluna cervical quando há indicação de imagem no trauma: preferir TC",
    "f": [
     16
    ]
   },
   {
    "t": "Imagem na cervicalgia aguda, com ou sem radiculopatia, sem trauma e sem sinal de alarme",
    "f": [
     19
    ]
   },
   {
    "t": "Ácido úrico isolado para diagnosticar gota; hiperuricemia sozinha não confirma",
    "f": [
     30
    ]
   },
   {
    "t": "TC ou RM antes da cirurgia quando a suspeita clínica de fasciite necrosante é forte",
    "f": [
     8
    ]
   }
  ],
  "div": [
   {
    "t": "Cristais na punção indicam gota (HC-FMUSP 2024); cristais não excluem infecção, gota e artrite séptica podem coexistir",
    "f": [
     32,
     1
    ]
   },
   {
    "t": "Trauma cervical em ≥ 65 anos: NEXUS não exclui por idade (Hoffman 2000); a regra canadense e o NICE tratam ≥ 65 anos como alto risco, com imagem",
    "f": [
     14,
     13,
     17,
     18
    ]
   },
   {
    "t": "Trauma cervical com indicação de imagem: TC como exame inicial (o RX não é adequado)",
    "f": [
     16
    ]
   }
  ],
  "fontes": [
   "[SEIMC 2024] Benito N et al. Executive summary: guidelines for the diagnosis and treatment of septic arthritis in adults and children, developed by the GEIO (SEIMC), SEIP and SECOT. Enferm Infecc Microbiol Clin (Engl Ed) 2024;42(4):208-214. doi:10.1016/j.eimce.2023.07.007. PMID 37919201 (texto completo: https://seimc.org/wp-content/uploads/2025/05/seimc-geio-gc-2024-Artritis_Septica.pdf; escopo: articulação nativa)",
   "[IDSA prótese 2013] Osmon DR et al. Diagnosis and management of prosthetic joint infection: clinical practice guidelines by the Infectious Diseases Society of America. Clin Infect Dis 2013;56(1):e1-e25. doi:10.1093/cid/cis803. PMID 23223583",
   "[BSR 2006] Coakley G et al. BSR & BHPR, BOA, RCGP and BSAC guidelines for management of the hot swollen joint in adults. Rheumatology (Oxford) 2006;45(8):1039-1041. doi:10.1093/rheumatology/kel163a. PMID 16829534",
   "[ACR infecção 2022] Pierce JL et al. ACR Appropriateness Criteria Suspected Osteomyelitis, Septic Arthritis, or Soft Tissue Infection (Excluding Spine and Diabetic Foot): 2022 Update. J Am Coll Radiol 2022;19(11S):S473-S487. doi:10.1016/j.jacr.2022.09.013. PMID 36436971",
   "[BOAST compartimental 2025] British Orthopaedic Association/BAPRAS. BOAST: Diagnosis and Management of Compartment Syndrome of the Extremities. 2014, atualizado em julho de 2025. https://www.boa.ac.uk/resource/boast-10-pdf.html",
   "[BOAST fratura exposta 2017] British Orthopaedic Association/BAPRAS. BOAST: Open Fractures. Dezembro de 2017 (versão vigente na lista oficial da BOA em 22/10/2026). https://www.bssh.ac.uk/_userfiles/pages/files/professionals/Radius/BOAST-Open-Fractures.pdf",
   "[ACC/AHA 2024] Gornik HL et al. 2024 ACC/AHA/AACVPR/APMA/ABC/SCAI/SVM/SVN/SVS/SIR/VESS guideline for the management of lower extremity peripheral artery disease. Circulation 2024;149(24):e1313-e1410. doi:10.1161/CIR.0000000000001251. PMID 38743805",
   "[IDSA 2014] Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the IDSA. Clin Infect Dis 2014;59(2):e10-e52. doi:10.1093/cid/ciu444. PMID 24973422",
   "[Stiell 1993] Stiell IG et al. Decision rules for the use of radiography in acute ankle injuries: refinement and prospective validation. JAMA 1993;269(9):1127-1132. doi:10.1001/jama.269.9.1127. PMID 8433468",
   "[Bachmann 2003] Bachmann LM et al. Accuracy of Ottawa ankle rules to exclude fractures of the ankle and mid-foot: systematic review. BMJ 2003;326(7386):417. doi:10.1136/bmj.326.7386.417. PMID 12595378",
   "[Stiell 1997] Stiell IG et al. Implementation of the Ottawa Knee Rule for the use of radiography in acute knee injuries. JAMA 1997;278(23):2075-2079. PMID 9403421",
   "[ACR joelho 2020] ACR Appropriateness Criteria Acute Trauma to the Knee. J Am Coll Radiol 2020;17(5S):S12-S25. doi:10.1016/j.jacr.2020.01.041. PMID 32370956",
   "[Stiell 2001] Stiell IG et al. The Canadian C-spine rule for radiography in alert and stable trauma patients. JAMA 2001;286(15):1841-1848. doi:10.1001/jama.286.15.1841. PMID 11597285",
   "[Hoffman 2000] Hoffman JR et al. Validity of a set of clinical criteria to rule out injury to the cervical spine in patients with blunt trauma (NEXUS). N Engl J Med 2000;343(2):94-99. doi:10.1056/NEJM200007133430203. PMID 10891516",
   "[Stiell 2003] Stiell IG et al. The Canadian C-spine rule versus the NEXUS low-risk criteria in patients with trauma. N Engl J Med 2003;349(26):2510-2518. doi:10.1056/NEJMoa031375. PMID 14695411",
   "[ACR trauma de coluna 2024] ACR Appropriateness Criteria Acute Spinal Trauma: 2024 Update. J Am Coll Radiol 2025;22(5S):S48-S66. doi:10.1016/j.jacr.2025.02.013. PMID 40409895",
   "[NICE NG41] NICE NG41. Spinal injury: assessment and initial management. 17/02/2016 (rec. 1.1.5). https://www.nice.org.uk/guidance/ng41",
   "[NICE NG232] NICE NG232. Head injury: assessment and early management. 18/05/2023 (rec. 1.6.1 a 1.6.3; quem tem TCE). https://www.nice.org.uk/guidance/ng232",
   "[ACR cervicalgia 2024] ACR Appropriateness Criteria Cervical Pain or Cervical Radiculopathy: 2024 Update. J Am Coll Radiol 2025;22(5S):S136-S162. doi:10.1016/j.jacr.2025.02.035. PMID 40409873",
   "[ACR mielopatia 2026] ACR Appropriateness Criteria Myelopathy: 2026 Update. J Am Coll Radiol 2026;23(9):1870-1883. doi:10.1016/j.jacr.2026.06.003. PMID 42340276",
   "[ACR cefaleia 2022] Utukuri PS et al. ACR Appropriateness Criteria Headache: 2022 Update. J Am Coll Radiol 2023;20(5S):S70-S93. doi:10.1016/j.jacr.2023.02.018. PMID 37236753",
   "[ACR Horner 2025] ACR Appropriateness Criteria Horner Syndrome. J Am Coll Radiol 2025;22(11S):S550-S577. doi:10.1016/j.jacr.2025.08.041. PMID 41193044",
   "[ACR quadril 2024] ACR Appropriateness Criteria Acute Hip Pain: 2024 Update. J Am Coll Radiol 2025;22(5S):S3-S13. doi:10.1016/j.jacr.2025.02.039. PMID 40409883",
   "[ACR ombro 2024] ACR Appropriateness Criteria Acute Shoulder Pain: 2024 Update. J Am Coll Radiol 2025;22(5S):S36-S47. doi:10.1016/j.jacr.2025.02.015. PMID 40409888",
   "[ACR mão e punho 2019] ACR Appropriateness Criteria Acute Hand and Wrist Trauma. J Am Coll Radiol 2019;16(5S):S7-S17. doi:10.1016/j.jacr.2019.02.029. PMID 31054760",
   "[NICE NG158] NICE NG158. Venous thromboembolic diseases: diagnosis, management and thrombophilia testing. Publicada em 26/03/2020, atualizada em 02/08/2023 (rec. 1.1.2 a 1.1.4). https://www.nice.org.uk/guidance/ng158",
   "[ASH 2018] Lim W et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: diagnosis of venous thromboembolism. Blood Adv 2018;2(22):3226-3256. doi:10.1182/bloodadvances.2018024828. PMID 30482764",
   "[BSR 2020] Mackie SL et al. British Society for Rheumatology guideline on diagnosis and treatment of giant cell arteritis. Rheumatology (Oxford) 2020;59(3):e1-e23. doi:10.1093/rheumatology/kez672. PMID 31970405",
   "[AHA/ACC 2021] Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR guideline for the evaluation and diagnosis of chest pain. Circulation 2021;144(22):e368-e454. doi:10.1161/CIR.0000000000001029. PMID 34709879",
   "[EULAR 2018] Richette P et al. 2018 updated EULAR evidence-based recommendations for the diagnosis of gout. Ann Rheum Dis 2020;79(1):31-38. doi:10.1136/annrheumdis-2019-215315. PMID 31167758",
   "[CW Canadá 2024] Choosing Wisely Canada. Emergency Medicine (atualizado em setembro de 2024). https://choosingwiselycanada.org/recommendation/emergency-medicine/",
   "[HC-FMUSP 2024] Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed., 2024, caps. 64, 68 e 98 (conferência)"
  ]
 },
 "gripe": {
  "encaminhar": [
   {
    "t": "Internação: SRAG (dispneia, SpO2 ≤ 94% em ar ambiente, desconforto respiratório ou aumento da frequência respiratória, hipotensão ou piora da doença de base)",
    "f": [
     1
    ]
   },
   {
    "t": "UTI: instabilidade hemodinâmica que não responde a volume (necessidade de vasopressor), insuficiência respiratória com hipoxemia ou outra disfunção orgânica (lesão renal aguda, disfunção neurológica)",
    "f": [
     1
    ]
   },
   {
    "t": "Gestante ou puérpera com SpO2 < 94% ou sinais de agravamento: oxigênio, monitorização contínua e internação",
    "f": [
     1
    ]
   },
   {
    "t": "Retorno em 48 h: síndrome gripal com fator de risco tratada em casa, ou antes se surgirem sinais de gravidade",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Síndrome gripal sem sinais de gravidade: diagnóstico clínico, sem exame",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Oximetria de pulso: na avaliação de toda síndrome gripal (SpO2 ≤ 94% define SRAG)",
    "f": [
     1
    ]
   },
   {
    "t": "RX de tórax: sinais de agravamento ou suspeita de pneumonia, inclusive na gestante, em qualquer idade gestacional",
    "f": [
     1
    ]
   },
   {
    "t": "Hemograma, ureia, creatinina, TGO, TGP, bilirrubinas, CPK e DHL: SRAG ou internação",
    "f": [
     1
    ]
   },
   {
    "t": "Swab de nasofaringe (RT-PCR ou outro teste molecular): SRAG e internados; notificar e coletar, de preferência antes do antiviral",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Teste para influenza em ambulatório: alto risco de complicação, se o resultado mudar a conduta; nos demais, se puder evitar antibiótico ou outros exames",
    "f": [
     2
    ]
   },
   {
    "t": "Teste de influenza: preferir o molecular rápido ao teste rápido de antígeno",
    "f": [
     2
    ]
   },
   {
    "t": "TC de tórax: casos selecionados, inclusive na gestante",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exame para iniciar o antiviral: não esperar o resultado no grupo de risco ou na SRAG",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Sorologia para influenza (amostra única não é interpretável)",
    "f": [
     2
    ]
   },
   {
    "t": "Cultura viral para o diagnóstico inicial",
    "f": [
     2
    ]
   },
   {
    "t": "RX de tórax no resfriado sem achado no exame pulmonar, em adulto sem comorbidade e não idoso",
    "f": [
     3
    ]
   }
  ],
  "div": [],
  "fontes": [
   "MS 2023 — Ministério da Saúde, Secretaria de Vigilância em Saúde e Ambiente. Guia de manejo e tratamento de influenza 2023. Brasília: Ministério da Saúde, 2023 (p. 15–21 e anexo C). Página oficial: https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/influenza/guia-de-manejo-e-tratamento-de-influenza-2023 (texto conferido na cópia idêntica em https://goias.gov.br/saude/wp-content/uploads/sites/34/2012/06/guia_tratamento-influenza-2023-d45.pdf)",
   "IDSA 2018 — Uyeki TM et al. Clinical practice guidelines by the IDSA: 2018 update on diagnosis, treatment, chemoprophylaxis, and institutional outbreak management of seasonal influenza. Clin Infect Dis 2019;68(6):e1-e47. PMID 30566567. https://doi.org/10.1093/cid/ciy866",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 47 Infecções de vias aéreas superiores (conferência)."
  ]
 },
 "faringite": {
  "encaminhar": [
   {
    "t": "Hospital / otorrino de urgência: complicação supurativa grave — abscesso periamigdaliano, parafaríngeo ou retrofaríngeo, celulite cervical ou síndrome de Lemierre",
    "f": [
     3,
     4
    ]
   },
   {
    "t": "Sala de emergência: estridor, babação, desconforto respiratório ou suspeita de epiglotite",
    "f": [
     4
    ]
   },
   {
    "t": "Hospital: infecção sistêmica grave ou sepse",
    "f": [
     3
    ]
   }
  ],
  "pedir": [
   {
    "t": "Teste rápido para estreptococo do grupo A (ou cultura de orofaringe): quadro sugestivo — febre, adenite cervical anterior, exsudato amigdaliano, sem tosse",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Escores de Centor / McIsaac (ou FeverPAIN): para estimar a probabilidade de estreptococo; Centor 0–1 no adulto dispensa teste",
    "f": [
     4,
     3
    ]
   },
   {
    "t": "Teste molecular para estreptococo: alternativa ao teste rápido; negativo dispensa cultura",
    "f": [
     4
    ]
   },
   {
    "t": "TC cervical: suspeita de abscesso profundo ou de complicação supurativa sem resposta ao antibiótico",
    "f": [
     4
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Teste para estreptococo com tosse, coriza, rouquidão ou úlceras orais (sugere vírus)",
    "f": [
     1
    ]
   },
   {
    "t": "Cultura de confirmação após teste rápido negativo no adulto",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "ASLO (antiestreptolisina O) na faringite aguda: reflete infecção passada",
    "f": [
     1
    ]
   },
   {
    "t": "Teste ou cultura de controle após o tratamento em quem ficou assintomático",
    "f": [
     1
    ]
   },
   {
    "t": "Teste em contactantes domiciliares assintomáticos",
    "f": [
     1
    ]
   },
   {
    "t": "Hemograma e outros exames de rotina na faringite não complicada",
    "f": [
     4
    ]
   }
  ],
  "div": [
   {
    "t": "Decisão do antibiótico: confirmar estreptococo com teste rápido ou cultura antes de tratar (IDSA 2012; Harris 2016) × decidir pelo escore clínico (FeverPAIN ou Centor), sem teste obrigatório",
    "f": [
     1,
     2,
     3
    ]
   }
  ],
  "fontes": [
   "IDSA 2012 — Shulman ST et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the IDSA. Clin Infect Dis 2012;55(10):e86-102. PMID 22965026. https://doi.org/10.1093/cid/cis629",
   "Harris 2016 — Harris AM, Hicks LA, Qaseem A. Appropriate antibiotic use for acute respiratory tract infection in adults: advice for high-value care from the ACP and the CDC. Ann Intern Med 2016;164(6):425-34. PMID 26785402. https://doi.org/10.7326/M15-1840",
   "NICE NG84 2018 — National Institute for Health and Care Excellence. Sore throat (acute): antimicrobial prescribing. NICE guideline NG84, 26/01/2018 (recomendação 1.1.13). https://www.nice.org.uk/guidance/ng84",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 47 Infecções de vias aéreas superiores (conferência)."
  ]
 },
 "rinite": {
  "encaminhar": [
   {
    "t": "Otorrino ou alergista (ambulatório): sem resposta ao tratamento empírico, diagnóstico incerto ou resposta inadequada à farmacoterapia (candidato a imunoterapia)",
    "f": [
     1
    ]
   },
   {
    "t": "Otorrino (ambulatório): suspeita de rinossinusite crônica, para confirmação objetiva (endoscopia nasal ou TC) e pesquisa de pólipos, ou suspeita de diagnóstico alternativo",
    "f": [
     2
    ]
   },
   {
    "t": "Urgência: suspeita de complicação de rinossinusite — orbitária, intracraniana ou de partes moles",
    "f": [
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "Rinite alérgica: diagnóstico clínico pela história e exame, sem exame na porta",
    "f": [
     1
    ]
   },
   {
    "t": "IgE específica (teste cutâneo ou sérico), em ambulatório: sem resposta ao tratamento empírico, diagnóstico incerto ou para orientar tratamento dirigido ao alérgeno",
    "f": [
     1
    ]
   },
   {
    "t": "TC de seios da face (ou RM): só se houver suspeita de complicação ou de diagnóstico alternativo",
    "f": [
     2,
     3
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Imagem dos seios da face (RX ou TC) de rotina na rinite alérgica",
    "f": [
     1
    ]
   },
   {
    "t": "Imagem na rinossinusite aguda que preenche critérios clínicos, sem suspeita de complicação; RX de seios da face não é recomendada",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "Cultura de secreção nasal",
    "f": [
     3
    ]
   }
  ],
  "div": [],
  "fontes": [
   "AAO-HNSF 2015 — Seidman MD et al. Clinical practice guideline: allergic rhinitis. Otolaryngol Head Neck Surg 2015;152(1 Suppl):S1-43. PMID 25644617. https://doi.org/10.1177/0194599814561600 (versão vigente; sem atualização localizada até 10/2026)",
   "AAO-HNSF 2025 — Payne SC et al. Clinical practice guideline: adult sinusitis update. Otolaryngol Head Neck Surg 2025;173(Suppl 1):S1-S56. PMID 40742114. https://doi.org/10.1002/ohn.1344 (quadro de recomendações KAS 1B, 7B e 10: https://www.entnet.org/wp-content/uploads/2025/07/CPG_ASU_SummaryGuide_V3.pdf)",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 47 Infecções de vias aéreas superiores (conferência)."
  ]
 },
 "tosse": {
  "encaminhar": [
   {
    "t": "Hospital ou especialista: sinais ou sintomas de doença mais grave (sepse, embolia pulmonar, câncer de pulmão)",
    "f": [
     5
    ]
   },
   {
    "t": "Internação: pneumonia com critério de gravidade — ver conduta pac",
    "f": [
     6
    ]
   },
   {
    "t": "Pneumologia (ambulatório): tosse crônica (> 8 semanas) refratária e sem causa definida após RX de tórax, suspensão de IECA e avaliação das causas comuns",
    "f": [
     4,
     8
    ]
   }
  ],
  "pedir": [
   {
    "t": "Tosse aguda (< 3 semanas) em adulto sem comorbidade, com sinais vitais normais (FC < 100, FR < 24, T < 38 °C) e sem achado focal na ausculta: sem exame",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "RX de tórax: exame físico alterado, sinais vitais alterados, doença cerebral orgânica ou outro fator de risco de evolução ruim",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "RX de tórax: tosse ≥ 3 semanas (sintomático respiratório, suspeita de tuberculose) e em toda tosse crônica",
    "f": [
     7,
     8
    ]
   },
   {
    "t": "TC de tórax: fator de risco ou exame alterado com RX negativa ou indeterminada",
    "f": [
     3
    ]
   },
   {
    "t": "Teste para coqueluche: suspeita clínica (acessos de tosse, guincho, vômito pós-tosse); cultura e PCR de nasofaringe até 4 semanas de tosse; depois, só sorologia",
    "f": [
     9
    ]
   },
   {
    "t": "Teste rápido molecular (TRM-TB) ou baciloscopia de escarro: tosse ≥ 3 semanas (sintomático respiratório) ou suspeita clínica ou radiológica de tuberculose, qualquer que seja o tempo de tosse",
    "f": [
     7
    ]
   },
   {
    "t": "Espirometria com prova broncodilatadora (ambulatório): tosse crônica com suspeita de asma, inclusive tosse variante de asma",
    "f": [
     8
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX de tórax ou outros exames, inclusive cultura de escarro, na bronquite aguda sem suspeita de pneumonia",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "TC de tórax como primeiro exame na doença respiratória aguda, com ou sem fator de risco",
    "f": [
     3
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Gonzales 2001 — Gonzales R et al. Principles of appropriate antibiotic use for treatment of uncomplicated acute bronchitis: background. Ann Intern Med 2001;134(6):521-9. PMID 11255532. https://doi.org/10.7326/0003-4819-134-6-200103200-00021",
   "Harris 2016 — Harris AM, Hicks LA, Qaseem A. Appropriate antibiotic use for acute respiratory tract infection in adults: advice for high-value care from the ACP and the CDC. Ann Intern Med 2016;164(6):425-34. PMID 26785402. https://doi.org/10.7326/M15-1840",
   "ACR 2024 — Batra K, Walker CM, Little BP et al.; Expert Panel on Thoracic Imaging. ACR Appropriateness Criteria® acute respiratory illness in immunocompetent patients: 2024 update. J Am Coll Radiol 2025;22(5S):S14-S35. PMID 40409874. https://doi.org/10.1016/j.jacr.2025.02.014 (variantes 1 a 3: https://acsearch.acr.org/docs/69446/Narrative/)",
   "CHEST 2018 — Irwin RS et al. Classification of cough as a symptom in adults and management algorithms: CHEST guideline and expert panel report. Chest 2018;153(1):196-209. PMID 29080708. https://doi.org/10.1016/j.chest.2017.10.016",
   "NICE NG120 2019 — National Institute for Health and Care Excellence. Cough (acute): antimicrobial prescribing. NICE guideline NG120, 07/02/2019 (seção Referral and seeking specialist advice). https://www.nice.org.uk/guidance/ng120",
   "ATS/IDSA 2019 — Metlay JP et al. Diagnosis and treatment of adults with community-acquired pneumonia. Am J Respir Crit Care Med 2019;200(7):e45-e67. PMID 31573350. https://doi.org/10.1164/rccm.201908-1581ST (critérios de gravidade; a atualização parcial ATS 2026, Jones BE et al., Am J Respir Crit Care Med 2026;212(1):24-44, PMID 40679934, não altera esses critérios)",
   "MS 2019 TB — Ministério da Saúde, Secretaria de Vigilância em Saúde. Manual de recomendações para o controle da tuberculose no Brasil. 2ª ed. atualizada. Brasília: Ministério da Saúde, 2019 (definição de sintomático respiratório, baciloscopia, TRM-TB e radiografia de tórax). https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/tuberculose/manual-de-recomendacoes-e-controle-da-tuberculose-no-brasil-2a-ed.pdf/view",
   "Harrison 2025 — Harrison's Principles of Internal Medicine, 22ª ed., 2025, cap. 40 Cough (conferência).",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 47 Infecções de vias aéreas superiores, seção coqueluche (conferência)."
  ]
 },
 "oma": {
  "encaminhar": [
   {
    "t": "Internação e otorrino: suspeita de mastoidite aguda (dor, hiperemia, calor ou flutuação retroauricular, pavilhão deslocado)",
    "f": [
     1
    ]
   },
   {
    "t": "Emergência: sinais de complicação intracraniana (meningite, abscesso, trombose de seio venoso)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Otorrino de urgência: paralisia facial periférica ou labirintite como complicação da otite ou da mastoidite",
    "f": [
     1
    ]
   },
   {
    "t": "Otorrino com audiometria o quanto antes (até 14 dias do início): perda auditiva súbita neurossensorial — diferenciar da perda condutiva da otite",
    "f": [
     3
    ]
   },
   {
    "t": "Otorrino (ambulatório): efusão serosa unilateral ou otalgia sem causa no adulto, para nasofibroscopia (excluir neoplasia)",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "OMA não complicada: diagnóstico clínico pela otoscopia, sem exame",
    "f": [
     2
    ]
   },
   {
    "t": "Hemograma e PCR: suspeita de mastoidite",
    "f": [
     1
    ]
   },
   {
    "t": "TC de ossos temporais: mastoidite com suspeita de complicação ou gravidade; RM com gadolínio se suspeita de abscesso ou complicação vascular (trombose venosa)",
    "f": [
     1
    ]
   },
   {
    "t": "TC de crânio e líquor: suspeita de complicação intracraniana",
    "f": [
     2
    ]
   },
   {
    "t": "Audiometria: perda auditiva súbita",
    "f": [
     3
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Cultura de secreção e exames laboratoriais de rotina na OMA não complicada",
    "f": [
     2
    ]
   },
   {
    "t": "Exames laboratoriais de rotina na surdez súbita neurossensorial",
    "f": [
     3
    ]
   },
   {
    "t": "TC de crânio de rotina na avaliação inicial da surdez súbita",
    "f": [
     3
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Harrison 2025 — Harrison's Principles of Internal Medicine, 22ª ed., 2025, cap. 37 Upper respiratory symptoms, including earache, sinus symptoms, and sore throat (mastoidite aguda); cap. 36 Disorders of hearing (conferência).",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 47 Infecções de vias aéreas superiores, seção otite média aguda (conferência).",
   "AAO-HNSF 2019 — Chandrasekhar SS et al. Clinical practice guideline: sudden hearing loss (update). Otolaryngol Head Neck Surg 2019;161(1 Suppl):S1-S45. PMID 31369359. https://doi.org/10.1177/0194599819859885"
  ]
 },
 "otite-externa": {
  "encaminhar": [
   {
    "t": "Otorrino de urgência: suspeita de otite externa necrosante — diabético, imunossuprimido ou idoso com otalgia, otorreia e dor noturna",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "Otite externa necrosante: granulação no conduto, falha de mais de 2 semanas de tratamento tópico ou paralisia de par craniano",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "Reavaliar: sem melhora em 48–72 h, para confirmar o diagnóstico e excluir outras causas",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Otite externa difusa: diagnóstico clínico; avaliar fatores modificadores (membrana timpânica não íntegra, tubo de ventilação, diabetes, imunossupressão, radioterapia prévia)",
    "f": [
     1
    ]
   },
   {
    "t": "TC de ossos temporais: primeiro exame de imagem na suspeita de otite externa necrosante",
    "f": [
     2
    ]
   },
   {
    "t": "PCR e VHS: suspeita de otite externa necrosante (elevação sem outra causa reforça a suspeita)",
    "f": [
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exames de rotina na otite externa difusa não complicada (diagnóstico clínico)",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "AAO-HNSF 2014 — Rosenfeld RM et al. Clinical practice guideline: acute otitis externa executive summary. Otolaryngol Head Neck Surg 2014;150(2):161-8. PMID 24492208. https://doi.org/10.1177/0194599813517659 (resumo das recomendações: https://www.aafp.org/pubs/afp/issues/2014/1115/p731.html)",
   "Hodgson 2023 — Hodgson SH et al. UK consensus definitions for necrotising otitis externa: a Delphi study. BMJ Open 2023;13(2):e061349. PMID 36806133. https://doi.org/10.1136/bmjopen-2022-061349",
   "Harrison 2025 — Harrison's Principles of Internal Medicine, 22ª ed., 2025, cap. 37 Upper respiratory symptoms, including earache, sinus symptoms, and sore throat, seção otite externa maligna (conferência)."
  ]
 },
 "conjuntivite": {
  "encaminhar": [
   {
    "t": "Oftalmologista: perda visual, dor moderada a intensa, secreção purulenta abundante, acometimento da córnea, cicatriz conjuntival",
    "f": [
     1
    ]
   },
   {
    "t": "Oftalmologista: falta de resposta ao tratamento, episódios recorrentes, herpes ocular prévio ou imunossupressão",
    "f": [
     1
    ]
   },
   {
    "t": "Internação: conjuntivite gonocócica grave (tratamento parenteral); na gonocócica, reavaliação diária até a resolução",
    "f": [
     1
    ]
   },
   {
    "t": "Especialista adequado (e parceria sexual): conjuntivite associada a IST ou a doença sistêmica",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Conjuntivite aguda típica (por exemplo, viral com infecção de vias aéreas superiores): diagnóstico clínico, sem exame",
    "f": [
     1
    ]
   },
   {
    "t": "Cultura com antibiograma da secreção conjuntival: conjuntivite purulenta grave, recorrente ou crônica, ou sem resposta ao tratamento",
    "f": [
     1
    ]
   },
   {
    "t": "Gram (e cultura) da secreção conjuntival: suspeita de gonococo, ou conjuntivite crônica ou recorrente",
    "f": [
     1
    ]
   },
   {
    "t": "Teste para clamídia (conjuntival ou genital): suspeita de conjuntivite por clamídia (por exemplo, folicular que persiste por semanas)",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Cultura de rotina na conjuntivite aguda sem fatores de risco",
    "f": [
     1
    ]
   },
   {
    "t": "Teste rápido para adenovírus de rotina (não muda a conduta na maioria; sensibilidade variável)",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "AAO 2023 — American Academy of Ophthalmology Cornea/External Disease Preferred Practice Pattern Panel (copresidentes Mah FS, Varu DM). Conjunctivitis Preferred Practice Pattern®. Aprovado em 22/09/2023. Ophthalmology 2024;131(4):P134-P204. https://doi.org/10.1016/j.ophtha.2023.12.037 (não indexado no PubMed; texto: https://www.aao.org/education/preferred-practice-pattern/conjunctivitis-ppp)"
  ]
 },
 "epistaxe": {
  "encaminhar": [
   {
    "t": "Sala de emergência: risco à via aérea (sangue na orofaringe) ou instabilidade hemodinâmica por perda sanguínea",
    "f": [
     1
    ]
   },
   {
    "t": "Otorrino: tamponamento posterior (com monitorização cardiorrespiratória conforme gravidade, tipo de tampão e comorbidades)",
    "f": [
     1
    ]
   },
   {
    "t": "Otorrino (endoscopia nasal): sangramento recorrente apesar de tamponamento ou cauterização, ou recorrente unilateral",
    "f": [
     1
    ]
   },
   {
    "t": "Otorrino ou radiologia intervencionista: sangramento persistente ou recorrente sem controle com tamponamento ou cauterização (avaliar ligadura arterial ou embolização)",
    "f": [
     1
    ]
   },
   {
    "t": "Ambulatório (otorrino): epistaxe bilateral recorrente ou história familiar de epistaxe, para pesquisar telangiectasia hemorrágica hereditária",
    "f": [
     1
    ]
   },
   {
    "t": "Hematologia: sinais de doença sistêmica ou de distúrbio hemorrágico",
    "f": [
     1,
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "Rinoscopia anterior após retirar os coágulos: em todos, para achar o ponto de sangramento",
    "f": [
     1
    ]
   },
   {
    "t": "INR: em uso de varfarina",
    "f": [
     1
    ]
   },
   {
    "t": "Hemograma e coagulograma: suspeita de distúrbio hemorrágico (outros sangramentos, história pessoal ou familiar, hepatopatia, doença renal crônica)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Hemograma e coagulograma: epistaxe sem variação sazonal ou que já exigiu tratamento médico",
    "f": [
     1,
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "TP/INR e TTPa para medir o efeito de anticoagulante oral direto (não refletem a anticoagulação de forma confiável)",
    "f": [
     1
    ]
   },
   {
    "t": "Investigação de coagulopatia na epistaxe isolada e sazonal, que não exigiu tratamento médico e sem outros sinais (comum e em geral sem distúrbio de base)",
    "f": [
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "AAO-HNSF 2020 — Tunkel DE et al. Clinical practice guideline: nosebleed (epistaxis). Otolaryngol Head Neck Surg 2020;162(1 Suppl):S1-S38. PMID 31910111. https://doi.org/10.1177/0194599819890327 (texto conferido: declarações 1, 3, 5, 6, 7a, 10, 11 e 12)",
   "Harrison 2025 — Harrison's Principles of Internal Medicine, 22ª ed., 2025, cap. 69 Bleeding and thrombosis (conferência)."
  ]
 },
 "dispepsia": {
  "encaminhar": [
   {
    "t": "Sala de emergência / ECG em até 10 min: dor ou desconforto em abdome superior que pode ser equivalente isquêmico",
    "f": [
     5
    ]
   },
   {
    "t": "Endoscopia digestiva alta como primeiro exame, prioritária: disfagia ou outro sinal de alarme (perda de peso, sangramento digestivo, vômitos, anemia)",
    "f": [
     2
    ]
   },
   {
    "t": "Endoscopia (ambulatório): dispepsia em pessoa com 60 anos ou mais",
    "f": [
     1
    ]
   },
   {
    "t": "Endoscopia mais cedo (ambulatório): alto risco de câncer gástrico abaixo de 60 anos (história familiar, infância em região de alto risco)",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "ECG e troponina (de preferência de alta sensibilidade): dor epigástrica com possibilidade de síndrome coronariana",
    "f": [
     5
    ]
   },
   {
    "t": "Lipase: dor epigástrica intensa com suspeita de pancreatite (critério diagnóstico se > 3 vezes o limite superior)",
    "f": [
     4
    ]
   },
   {
    "t": "US de abdome: pancreatite aguda, para pesquisar litíase biliar",
    "f": [
     4
    ]
   },
   {
    "t": "Teste não invasivo para H. pylori (respiratório da ureia ou antígeno fecal), no ambulatório: dispepsia abaixo de 60 anos, tratar se positivo",
    "f": [
     1
    ]
   },
   {
    "t": "Prova terapêutica com IBP por 8 semanas, sem exame: pirose e regurgitação típicas sem sinais de alarme",
    "f": [
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Endoscopia de rotina abaixo de 60 anos sem sinais de alarme",
    "f": [
     1
    ]
   },
   {
    "t": "Esofagograma baritado como único exame para diagnosticar DRGE",
    "f": [
     2
    ]
   },
   {
    "t": "Estudo de motilidade digestiva alta de rotina",
    "f": [
     1
    ]
   },
   {
    "t": "TC de abdome na admissão só para avaliar a gravidade da pancreatite (reservar para diagnóstico incerto ou sem melhora em 48–72 h)",
    "f": [
     4
    ]
   },
   {
    "t": "Sorologia para H. pylori como controle de erradicação (usar teste respiratório, antígeno fecal ou biópsia, ao menos 4 semanas após o tratamento)",
    "f": [
     3
    ]
   }
  ],
  "div": [
   {
    "t": "Sinal de alarme abaixo de 60 anos: não indica endoscopia automaticamente, decidir caso a caso (ACG/CAG 2017) × endoscopia como primeiro exame se disfagia, perda de peso ou sangramento",
    "f": [
     1,
     2
    ]
   }
  ],
  "fontes": [
   "ACG/CAG 2017 — Moayyedi PM et al. ACG and CAG clinical guideline: management of dyspepsia. Am J Gastroenterol 2017;112(7):988-1013. PMID 28631728. https://doi.org/10.1038/ajg.2017.154",
   "ACG 2022 — Katz PO et al. ACG clinical guideline for the diagnosis and management of gastroesophageal reflux disease. Am J Gastroenterol 2022;117(1):27-56. PMID 34807007. https://doi.org/10.14309/ajg.0000000000001538",
   "ACG 2024 H. pylori — Chey WD et al. ACG clinical guideline: treatment of Helicobacter pylori infection. Am J Gastroenterol 2024;119(9):1730-1753. PMID 39626064. https://doi.org/10.14309/ajg.0000000000002968",
   "ACG 2024 pancreatite — Tenner S et al. American College of Gastroenterology guidelines: management of acute pancreatitis. Am J Gastroenterol 2024;119(3):419-437. PMID 38857482. https://doi.org/10.14309/ajg.0000000000002645",
   "AHA/ACC 2021 — Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR guideline for the evaluation and diagnosis of chest pain. Circulation 2021;144(22):e368-e454. PMID 34709879. https://doi.org/10.1161/CIR.0000000000001029"
  ]
 },
 "nauseas": {
  "encaminhar": [
   {
    "t": "Internação: incapacidade de ingerir líquidos, vômitos refratários ao tratamento, desidratação grave, hipotensão ou distúrbio hidroeletrolítico",
    "f": [
     1
    ]
   },
   {
    "t": "Internação: doença crônica debilitante (como insuficiência cardíaca) ou causa potencialmente grave, como infarto",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Exames guiados pela história e pelo exame físico, para a causa e para as consequências (desidratação); não há bateria de rotina",
    "f": [
     1
    ]
   },
   {
    "t": "β-hCG: mulher com possibilidade de gestação",
    "f": [
     1
    ]
   },
   {
    "t": "Hiperêmese gravídica grave: eletrólitos (com cloro e magnésio), ureia, creatinina, TGO, TGP, albumina, bilirrubinas, TSH, T4 livre e US obstétrica",
    "f": [
     1
    ]
   },
   {
    "t": "Eletrólitos, ureia e creatinina: suspeita de desidratação ou uremia",
    "f": [
     1
    ]
   },
   {
    "t": "Gasometria venosa: quadro grave (acidose por hipoperfusão ou alcalose metabólica por perda gástrica)",
    "f": [
     1
    ]
   },
   {
    "t": "ECG e troponina: náusea com dor torácica ou em abdome superior que possa ser isquêmica",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "Lipase: suspeita de pancreatite; enzimas hepáticas: suspeita de hepatite",
    "f": [
     1,
     4
    ]
   },
   {
    "t": "TC de abdome e pelve com contraste EV: suspeita de obstrução intestinal aguda",
    "f": [
     2
    ]
   },
   {
    "t": "TC de crânio: suspeita de hipertensão intracraniana; líquor: suspeita de meningite",
    "f": [
     1
    ]
   },
   {
    "t": "Endoscopia digestiva alta: hemorragia digestiva, suspeita de obstrução alta ou sem causa após a avaliação inicial",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "VHS e PCR de rotina (raramente indicados)",
    "f": [
     1
    ]
   },
   {
    "t": "US de abdome como imagem inicial na suspeita de obstrução intestinal",
    "f": [
     2
    ]
   }
  ],
  "div": [
   {
    "t": "Suspeita de obstrução: RX de abdome em 3 posições como exame inicial, de baixo custo (HC-FMUSP 2024) × TC com contraste é a imagem inicial indicada; RX \"pode ser apropriada\" (sem consenso do painel)",
    "f": [
     1,
     2
    ]
   }
  ],
  "fontes": [
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 21 Náuseas e vômitos (exames complementares, tabela 3; indicações de internação) (conferência).",
   "ACR 2020 — Chang KJ et al.; Expert Panel on Gastrointestinal Imaging. ACR Appropriateness Criteria® suspected small-bowel obstruction. J Am Coll Radiol 2020;17(5S):S305-S314. PMID 32370974. https://doi.org/10.1016/j.jacr.2020.01.025 (variante 1: https://acsearch.acr.org/docs/69476/Narrative/)",
   "AHA/ACC 2021 — Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR guideline for the evaluation and diagnosis of chest pain. Circulation 2021;144(22):e368-e454. PMID 34709879. https://doi.org/10.1161/CIR.0000000000001029",
   "ACG 2024 pancreatite — Tenner S et al. American College of Gastroenterology guidelines: management of acute pancreatitis. Am J Gastroenterol 2024;119(3):419-437. PMID 38857482. https://doi.org/10.14309/ajg.0000000000002645"
  ]
 },
 "constipacao": {
  "encaminhar": [
   {
    "t": "Emergência (imagem na hora): suspeita de obstrução mecânica ou megacólon",
    "f": [
     3,
     4
    ]
   },
   {
    "t": "Colonoscopia (ambulatório, prioritária): constipação com perda de peso, sangramento retal ou anemia",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Colonoscopia (ambulatório): constipação de início recente sem causa aparente, para excluir causa estrutural (neoplasia, estenose)",
    "f": [
     3
    ]
   },
   {
    "t": "Coloproctologia ou gastro (ambulatório): sem resposta a dieta, fibra, líquidos e laxante osmótico, para avaliar distúrbio evacuatório (fisiologia anorretal ou defecografia)",
    "f": [
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "História dirigida e exame físico com toque retal: em todos (fecaloma, massa, sinais de distúrbio evacuatório)",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "Hemograma: sem outros sinais ou sintomas, é o único exame indicado",
    "f": [
     1
    ]
   },
   {
    "t": "RX de abdome: suspeita de obstrução ou megacólon, como exame inicial (ver Divergências da conduta nauseas)",
    "f": [
     4,
     3
    ]
   },
   {
    "t": "TC de abdome: suspeita de obstrução intestinal",
    "f": [
     4,
     5
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Colonoscopia sem sinais de alarme, salvo rastreio de câncer colorretal por idade ainda não feito",
    "f": [
     1
    ]
   },
   {
    "t": "Glicemia, cálcio e TSH de rotina na constipação sem outros sinais",
    "f": [
     1
    ]
   }
  ],
  "div": [
   {
    "t": "Exames metabólicos: cálcio, potássio e TSH entram na avaliação básica para identificar causas metabólicas raras (Harrison 2025) × não necessários de rotina quando não há outros sinais",
    "f": [
     3,
     1
    ]
   }
  ],
  "fontes": [
   "AGA 2013 — Bharucha AE, Dorn SD, Lembo A, Pressman A. American Gastroenterological Association medical position statement on constipation. Gastroenterology 2013;144(1):211-7. PMID 23261064. https://doi.org/10.1053/j.gastro.2012.10.029",
   "ASCRS 2024 — Alavi K et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the evaluation and management of chronic constipation. Dis Colon Rectum 2024;67(10):1244-1257. PMID 39250791. https://doi.org/10.1097/DCR.0000000000003430 (recomendações conferidas no resumo em https://www.guidelinecentral.com/guideline/3975470/)",
   "Harrison 2025 — Harrison's Principles of Internal Medicine, 22ª ed., 2025, cap. 49 Diarrhea and constipation (avaliação e algoritmo, figura 49-5) (conferência).",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 21 Náuseas e vômitos (tabela 3, imagem na suspeita de obstrução) (conferência).",
   "ACR 2020 — Chang KJ et al.; Expert Panel on Gastrointestinal Imaging. ACR Appropriateness Criteria® suspected small-bowel obstruction. J Am Coll Radiol 2020;17(5S):S305-S314. PMID 32370974. https://doi.org/10.1016/j.jacr.2020.01.025"
  ]
 },
 "hemorroida": {
  "encaminhar": [
   {
    "t": "Coloproctologia / cirurgia: hemorroida trombosada com dor intensa (tratamento cirúrgico precoce em selecionados)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Emergência: suspeita de sepse pélvica após ligadura elástica ou outro procedimento hemorroidário",
    "f": [
     2
    ]
   },
   {
    "t": "Coloproctologia (ambulatório): grau 3 com falha da ligadura ou com componente externo; grau 4 (hemorroidectomia)",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "Gastro (ambulatório): cirrótico, para diferenciar hemorroida de varizes retais",
    "f": [
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "História dirigida e exame físico (inspeção, toque retal): em todos; diagnóstico e grau são clínicos",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Anuscopia: todo paciente novo com suspeita, antes do tratamento, sempre que possível",
    "f": [
     2
    ]
   },
   {
    "t": "Colonoscopia (ambulatório): sangramento retal em pacientes selecionados (sem fonte evidente do sangramento, dor abdominal ou outros sintomas, fora do rastreio)",
    "f": [
     1
    ]
   },
   {
    "t": "Colonoscopia ou outro rastreio de câncer colorretal: 45 a 75 anos sem rastreio em dia",
    "f": [
     3
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exames laboratoriais ou de imagem para diagnosticar hemorroida (diagnóstico e grau pela história e pelo exame)",
    "f": [
     2
    ]
   }
  ],
  "div": [
   {
    "t": "Hemorroida externa trombosada: excisão cirúrgica precoce em selecionados (recomendação fraca, 2C) (ASCRS 2024) × incisão e drenagem",
    "f": [
     1,
     2
    ]
   }
  ],
  "fontes": [
   "ASCRS 2024 — Hawkins AT et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of hemorrhoids. Dis Colon Rectum 2024;67(5):614-623. PMID 38294832. https://doi.org/10.1097/DCR.0000000000003276 (texto integral pago; recomendações e graus conferidos em https://www.guidelinecentral.com/guideline/9150 e no resumo de Arnold MJ, Smith D. Am Fam Physician 2025;112(6):694-695, https://www.aafp.org/pubs/afp/issues/2025/1200/practice-guidelines-hemorrhoids.html)",
   "AGA 2026 — Qureshi W, Hoang S, Frye J, Rao SS. AGA clinical practice update on diagnosis and treatment of hemorrhoids: expert review. Clin Gastroenterol Hepatol 2026;24(7):1773-1781. PMID 42067175. https://doi.org/10.1016/j.cgh.2026.04.008 (BPA 1, 4, 6 e 9–11)",
   "USPSTF 2021 — US Preventive Services Task Force. Screening for colorectal cancer: recommendation statement. JAMA 2021;325(19):1965-1977. PMID 34003218. https://doi.org/10.1001/jama.2021.6238"
  ]
 },
 "prostatite": {
  "encaminhar": [
   {
    "t": "Sala vermelha / internação: sepse, intolerância à via oral, retenção urinária, fatores de risco para resistência ou falha do tratamento ambulatorial",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "Urologia: retenção urinária (sonda uretral ou cistostomia) ou abscesso prostático na imagem (drenagem, sobretudo se > 1 cm)",
    "f": [
     2,
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Fita urinária (nitrito e leucócitos) na suspeita clínica; fita negativa não exclui (VPN cerca de 70%)",
    "f": [
     1
    ]
   },
   {
    "t": "Urocultura de jato médio com antibiograma: todos, antes do antibiótico",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Hemograma e hemocultura: recomendados pela EAU em toda prostatite aguda; ver Divergências",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Hemograma, função renal e eletrólitos: idade > 65 anos, febre > 38 °C, hiperplasia prostática, retenção urinária ou sonda vesical",
    "f": [
     2
    ]
   },
   {
    "t": "Pesquisa de gonococo e clamídia (biologia molecular, urina de 1º jato): < 35 anos sexualmente ativo ou ≥ 35 anos com comportamento sexual de risco",
    "f": [
     2,
     4
    ]
   },
   {
    "t": "US transretal (alternativa: TC sem contraste ou RM de pelve): febre que persiste após 36 h ou sintomas sem melhora com antibiótico, para abscesso",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "US de vias urinárias: suspeita de obstrução ou retenção; TC ou RM se hidronefrose",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Massagem prostática (risco de bacteremia e sepse)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "PSA na fase aguda: eleva por inflamação e não ajuda no diagnóstico",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Imagem de rotina na avaliação inicial (só se diagnóstico incerto ou sem resposta ao antibiótico)",
    "f": [
     2
    ]
   },
   {
    "t": "Biópsia de próstata com prostatite não tratada (risco de sepse)",
    "f": [
     1
    ]
   }
  ],
  "div": [
   {
    "t": "Hemocultura: em todo paciente com prostatite aguda (recomendação fraca) (EAU 2026) × só se febre > 38,4 °C, sepse, imunossupressão, infecção complicada ou possível foco hematogênico",
    "f": [
     1,
     2
    ]
   }
  ],
  "fontes": [
   "EAU 2026 — European Association of Urology. EAU Guidelines on Urological Infections, edição 2026, cap. 3.11 Bacterial prostatitis (3.11.4 e 3.11.5) e 3.7 Systemic UTIs (imagem). https://uroweb.org/guidelines/urological-infections",
   "Coker 2016 — Coker TJ, Dierfeldt DM. Acute bacterial prostatitis: diagnosis and management. Am Fam Physician 2016;93(2):114-20. PMID 26926407. https://www.aafp.org/pubs/afp/issues/2016/0115/p114.html",
   "IDSA 2025 — Trautner BW et al. 2025 IDSA guideline on management and treatment of complicated urinary tract infections (inclui prostatite). Clin Infect Dis, publicado online em 17/07/2025. doi:10.1093/cid/ciaf462",
   "MS 2022 — Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST. Brasília, 2022, cap. 8 (uretrites, métodos diagnósticos). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atencao_integral_ist.pdf"
  ]
 },
 "dismenorreia": {
  "encaminhar": [
   {
    "t": "Obstetrícia de urgência: dor pélvica aguda com beta-hCG positivo (afastar gestação ectópica)",
    "f": [
     3
    ]
   },
   {
    "t": "Cirurgia ou ginecologia de urgência: dor aguda atípica, febre, irritação peritoneal ou massa anexial (torção, DIP, apendicite)",
    "f": [
     3,
     4
    ]
   },
   {
    "t": "Ginecologia ambulatorial: sem melhora após 3–6 meses de tratamento ou suspeita de dismenorreia secundária (endometriose, adenomiose, mioma)",
    "f": [
     2,
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Beta-hCG: toda mulher em idade fértil com dor pélvica aguda ou quadro diferente do habitual",
    "f": [
     3
    ]
   },
   {
    "t": "US pélvica transvaginal e abdominal com Doppler: dor aguda atípica, exame alterado ou sintomas que persistem apesar do tratamento",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "TC de abdome e pelve (com ou sem contraste): beta-hCG negativo e suspeita de causa não ginecológica",
    "f": [
     3
    ]
   },
   {
    "t": "Pesquisa de gonococo e clamídia: vida sexual ativa e < 25 anos, ou ≥ 25 anos com risco (parceria nova, múltiplas, parceria com IST)",
    "f": [
     4
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exame pélvico ou US para iniciar tratamento quando a história é típica de dismenorreia primária",
    "f": [
     1,
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "SOGC 2025 — Burnett M. Guideline No. 345: Primary Dysmenorrhea. J Obstet Gynaecol Can 2025;47(5):102840. PMID 40216328. https://doi.org/10.1016/j.jogc.2025.102840 (texto integral com acesso bloqueado ao conferente; conferido pelo resumo e pelo trecho indexado: tratamento sem exame pélvico e sem esperar diagnóstico definitivo; US se sintomas persistem apesar do tratamento ou exame físico alterado)",
   "ACOG 2018 — American College of Obstetricians and Gynecologists. Committee Opinion No. 760: Dysmenorrhea and endometriosis in the adolescent. Obstet Gynecol 2018;132(6):e249-e258 (reafirmada em 2021; população adolescente). PMID 30461694. https://doi.org/10.1097/AOG.0000000000002978",
   "ACR 2023 — Brook OR et al. ACR Appropriateness Criteria® Acute Pelvic Pain in the Reproductive Age Group: 2023 Update. J Am Coll Radiol 2024;21(6S):S3-S20. PMID 38823952. https://doi.org/10.1016/j.jacr.2024.02.014",
   "CDC 2021 — Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep 2021;70(4):1-187. PMID 34292926. https://doi.org/10.15585/mmwr.rr7004a1"
  ]
 },
 "vaginose": {
  "encaminhar": [
   {
    "t": "Gestante sintomática: avaliar e tratar sempre (associação com desfechos obstétricos adversos)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Dor pélvica, febre ou dor à mobilização do colo: conduzir como DIP (ver conduta)",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Diagnóstico na porta pelos critérios de Amsel (3 de 4: corrimento homogêneo, pH > 4,5, teste das aminas positivo, clue cells)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "pH vaginal com fita e teste das aminas (KOH 10%) no exame especular",
    "f": [
     2
    ]
   },
   {
    "t": "Bacterioscopia com Gram (escore de Nugent, padrão-ouro), quando disponível, se dúvida diagnóstica",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Testagem para HIV e outras IST (sífilis; gonococo e clamídia se risco)",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Cultura para Gardnerella (pouco específica)",
    "f": [
     1
    ]
   },
   {
    "t": "Colpocitologia oncótica (preventivo) ou colposcopia para diagnosticar vaginose",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Controle de cura se os sintomas resolveram",
    "f": [
     1
    ]
   },
   {
    "t": "Rastreio de vaginose em mulher assintomática, inclusive gestante; ver Divergências",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Exame ou tratamento de rotina da parceria sexual",
    "f": [
     1
    ]
   }
  ],
  "div": [
   {
    "t": "Gestante assintomática com vaginose: não rastrear nem tratar de rotina para prevenir parto prematuro (CDC 2021) × tratar, sobretudo se parto pré-termo prévio ou antes de procedimento invasivo",
    "f": [
     1,
     2
    ]
   }
  ],
  "fontes": [
   "CDC 2021 — Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep 2021;70(4):1-187. PMID 34292926. https://doi.org/10.15585/mmwr.rr7004a1 — Bacterial vaginosis (edição vigente em out/2026).",
   "MS 2022 — Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST. Brasília, 2022, cap. 7 (quadro 28, exame ginecológico e IST; 7.1.2 vaginose bacteriana, quadro 30, Nugent). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atencao_integral_ist.pdf"
  ]
 },
 "candidiase": {
  "encaminhar": [
   {
    "t": "Candidíase complicada (sintomas intensos, recorrente, não albicans, diabetes, imunossupressão ou gestação): seguimento ambulatorial com cultura",
    "f": [
     2,
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Exame a fresco com KOH 10% e pH vaginal (< 4,5 na candidíase), quando disponível",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Cultura vaginal para Candida: suspeita forte com exame a fresco negativo, candidíase complicada ou recorrente",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Recorrente: investigar fatores predisponentes (diabetes, HIV, imunossupressão, corticoide, antibiótico frequente)",
    "f": [
     1,
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Cultura ou tratamento sem sintomas (colonização em 10–20% das mulheres)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Exame ou tratamento da parceria, salvo balanite sintomática",
    "f": [
     1
    ]
   },
   {
    "t": "Colpocitologia oncótica para diagnosticar candidíase",
    "f": [
     2
    ]
   }
  ],
  "div": [
   {
    "t": "Definição de candidíase recorrente: 4 ou mais episódios em 1 ano (MS 2022) × 3 ou mais episódios em menos de 1 ano",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "Gestação como critério de candidíase complicada: sim (MS 2022) × não listada",
    "f": [
     2,
     1
    ]
   }
  ],
  "fontes": [
   "CDC 2021 — Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep 2021;70(4):1-187. PMID 34292926. https://doi.org/10.15585/mmwr.rr7004a1 — Vulvovaginal candidiasis (box 4).",
   "MS 2022 — Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST. Brasília, 2022, cap. 7.1.1 (candidíase vulvovaginal, quadro 29, p. 105–107). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atencao_integral_ist.pdf"
  ]
 },
 "cervicite": {
  "encaminhar": [
   {
    "t": "Dor pélvica, dor à mobilização do colo ou febre: conduzir como DIP (ver conduta)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Homem com dor testicular de início súbito: urologia de urgência (torção é emergência cirúrgica)",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Mulher: gonococo e clamídia por biologia molecular (swab vaginal ou endocervical, ou urina de 1º jato)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Mulher: avaliar vaginose e tricomoníase (pH, aminas, exame a fresco); se a fresco negativo e sintomas, teste para tricomonas",
    "f": [
     1
    ]
   },
   {
    "t": "Homem com uretrite: Gram do corrimento (diplococos Gram-negativos intracelulares) e gonococo e clamídia por biologia molecular",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Cultura para gonococo com antibiograma: suspeita de falha de tratamento (reinfecção improvável), junto com biologia molecular",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Testagem para HIV, sífilis e hepatites B e C",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Mycoplasma genitalium por biologia molecular: cervicite ou uretrite persistente ou recorrente, se disponível",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Pesquisa de Ureaplasma, Mycoplasma hominis ou cultura genital para estreptococo do grupo B",
    "f": [
     1
    ]
   },
   {
    "t": "Bacterioscopia em pessoas assintomáticas",
    "f": [
     2
    ]
   },
   {
    "t": "Controle de cura de clamídia em não gestante com esquema recomendado (retestar em 3 meses, por reinfecção)",
    "f": [
     1
    ]
   },
   {
    "t": "O item acima não vale para gestante com clamídia (controle em 4 semanas) nem para gonorreia de orofaringe (controle em 7–14 dias)",
    "f": [
     1
    ]
   },
   {
    "t": "Colpocitologia oncótica ou colposcopia para diagnosticar cervicite",
    "f": [
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "CDC 2021 — Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep 2021;70(4):1-187. PMID 34292926. https://doi.org/10.15585/mmwr.rr7004a1 — Cervicitis; Urethritis; Chlamydial infections; Gonococcal infections; Epididymitis.",
   "MS 2022 — Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST. Brasília, 2022, cap. 7 (quadro 28; cervicite), cap. 8.4 (métodos diagnósticos de uretrites). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atencao_integral_ist.pdf"
  ]
 },
 "dip": {
  "encaminhar": [
   {
    "t": "Internação: abscesso tubo-ovariano, gestação, estado geral grave (náuseas, vômitos, febre) ou emergência cirúrgica não excluída",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Internação: intolerância ao antibiótico oral ou dificuldade de seguimento",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Internação: sem resposta clínica em 72 h de antibiótico oral",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Gestante com suspeita de DIP: internação com antibiótico EV",
    "f": [
     2,
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Beta-hCG: todas (afastar gestação ectópica)",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Gonococo e clamídia por biologia molecular (endocérvice, vagina ou urina) e cultura de endocérvice com antibiograma, se disponível",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "Testagem para HIV e sífilis (e hepatites B e C)",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "Exame a fresco ou bacterioscopia do conteúdo vaginal (leucócitos, vaginose, tricomonas)",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "Hemograma, PCR e VHS: avaliação de gravidade",
    "f": [
     1
    ]
   },
   {
    "t": "Urina tipo I e urocultura: afastar ITU",
    "f": [
     1
    ]
   },
   {
    "t": "Hemocultura: listada pelo PCDT para avaliação de gravidade; útil no quadro grave ou na internação",
    "f": [
     1
    ]
   },
   {
    "t": "US pélvica transvaginal e abdominal com Doppler: dúvida diagnóstica, massa anexial ou suspeita de abscesso tubo-ovariano",
    "f": [
     3,
     1
    ]
   },
   {
    "t": "TC de abdome e pelve (com ou sem contraste): dúvida com causa não ginecológica (apendicite, diverticulite) e beta-hCG negativo",
    "f": [
     3
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Retirada do DIU de rotina (considerar se sem melhora em 48–72 h)",
    "f": [
     2
    ]
   },
   {
    "t": "Pesquisa de Mycoplasma genitalium de rotina (benefício não demonstrado na DIP)",
    "f": [
     2
    ]
   },
   {
    "t": "Esperar resultado de exame para iniciar antibiótico na suspeita clínica",
    "f": [
     2,
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "MS 2022 — Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST. Brasília, 2022, cap. 10 DIP (exames laboratoriais e de imagem, p. 141; quadro 43, critérios de internação, p. 143; 10.7 gestação). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atencao_integral_ist.pdf",
   "CDC 2021 — Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep 2021;70(4):1-187. PMID 34292926. https://doi.org/10.15585/mmwr.rr7004a1 — Pelvic inflammatory disease.",
   "ACR 2023 — Brook OR et al. ACR Appropriateness Criteria® Acute Pelvic Pain in the Reproductive Age Group: 2023 Update. J Am Coll Radiol 2024;21(6S):S3-S20. PMID 38823952. https://doi.org/10.1016/j.jacr.2024.02.014"
  ]
 },
 "urticaria": {
  "encaminhar": [
   {
    "t": "Sala vermelha: anafilaxia (urticária com comprometimento respiratório, circulatório ou gastrointestinal grave) ou angioedema de via aérea",
    "f": [
     2,
     4
    ]
   },
   {
    "t": "Alergologia ambulatorial após anafilaxia, para investigar a causa e prevenir recorrência",
    "f": [
     2
    ]
   },
   {
    "t": "Ambulatório (alergologia ou dermatologia): urticária > 6 semanas (crônica)",
    "f": [
     1
    ]
   },
   {
    "t": "Angioedema sem urticária, recorrente ou em uso de IECA: suspeitar de angioedema por bradicinina; ambulatório para C4 e C1-inibidor (dosagem e função)",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Urticária aguda: nenhum exame de rotina; só história dirigida a gatilhos (infecção, alimento, medicamento, AINE)",
    "f": [
     1
    ]
   },
   {
    "t": "Teste alérgico, inclusive provocação (ambulatorial): suspeita de alergia alimentar ou a medicamento, sobretudo AINE",
    "f": [
     1
    ]
   },
   {
    "t": "Urticária crônica (ambulatório): hemograma e PCR e/ou VHS; no especialista, IgE total e anti-TPO IgG",
    "f": [
     1
    ]
   },
   {
    "t": "Lesão que dura > 24 h ou deixa mancha (suspeita de vasculite urticariforme): biópsia de pele, PCR/VHS (ambulatório)",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exames de rotina na urticária aguda espontânea",
    "f": [
     1
    ]
   },
   {
    "t": "Painel de IgE específica para alimentos ou inalantes sem história que aponte o alérgeno",
    "f": [
     3
    ]
   },
   {
    "t": "Investigação extensa de rotina na urticária crônica",
    "f": [
     3,
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Zuberbier 2026 — Zuberbier T et al. The International Guideline for the Definition, Classification, Diagnosis and Management of Urticaria. Allergy 2026;81(8):2582-2632. PMID 41649409. PMCID PMC13466004. https://doi.org/10.1111/all.70210 — seção 4.1 (urticária aguda: recomendação contra exames de rotina), 4.2, tabela 8 e figura 1.",
   "WAO 2020 — Cardona V et al. World Allergy Organization anaphylaxis guidance 2020. World Allergy Organ J 2020;13(10):100472. PMID 33204386. https://doi.org/10.1016/j.waojou.2020.100472 (sem versão mais recente da WAO localizada até out/2026)",
   "AAAAI 2012 — American Academy of Allergy, Asthma & Immunology. Choosing Wisely: Five things physicians and patients should question, 04/04/2012 (testes de IgE indiscriminados; exames de rotina na urticária crônica). https://www.aaaai.org/Aaaai/media/MediaLibrary/PDF%20Documents/Media/Choosing-WiselyT.pdf",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, 18ª ed., Manole, 2024, cap. 11 Anafilaxia e outras alergias (conferência; capítulo não disponível ao conferente)."
  ]
 },
 "zoster": {
  "encaminhar": [
   {
    "t": "Oftalmologia imediata: zoster oftálmico (ramo oftálmico do trigêmeo, lesão na ponta do nariz ou no olho)",
    "f": [
     3
    ]
   },
   {
    "t": "Internação para aciclovir EV: imunossupressão grave (transplante, câncer, sobretudo linfoproliferativo) ou zoster disseminado",
    "f": [
     3
    ]
   }
  ],
  "pedir": [
   {
    "t": "Diagnóstico clínico quando a erupção é típica; exame só se atípico",
    "f": [
     1
    ]
   },
   {
    "t": "PCR para VZV do raspado ou líquido da vesícula (ou crosta): quadro atípico ou grave",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Testagem para HIV: zoster é condição indicadora; oferecer teste",
    "f": [
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Teste de Tzanck (pouco sensível e não específico para VZV)",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Sorologia IgM/IgG para diagnosticar zoster agudo (só se não houver amostra para PCR)",
    "f": [
     1
    ]
   },
   {
    "t": "Imunofluorescência direta ou cultura viral no lugar da PCR (menos sensíveis)",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "CDC 2024 — Centers for Disease Control and Prevention. Clinical Overview of Shingles (Herpes Zoster), atualizado em 27/06/2024, e Laboratory Testing for Varicella-Zoster Virus (VZV), atualizado em 10/05/2024. https://www.cdc.gov/shingles/hcp/clinical-overview/index.html; https://www.cdc.gov/chickenpox/php/laboratories/index.html",
   "BHIVA 2020 — British HIV Association, BASHH, British Infection Association. Adult HIV Testing Guidelines 2020, tabela 2 (herpes zoster como condição indicadora, recomendação 1C). https://www.bashh.org/resources/2/hiv_testing_guidelines_with_bhivabia_2020",
   "Harrison 2025 — Whitley RJ. Varicella-zoster virus infections. In: Harrison's Principles of Internal Medicine, 22ª ed., McGraw Hill, 2025, cap. 198 (zoster oftálmico: encaminhar imediatamente ao oftalmologista; aciclovir EV no imunossuprimido grave; PCR é o método de escolha; Tzanck com sensibilidade ~60%)."
  ]
 },
 "abscesso": {
  "encaminhar": [
   {
    "t": "Cirurgia de urgência: suspeita de fasciíte necrotizante ou gangrena gasosa (dor desproporcional, necrose, crepitação, toxemia); avaliação cirúrgica imediata, sem esperar imagem",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Internação: SIRS, alteração mental ou instabilidade hemodinâmica, suspeita de infecção profunda ou necrotizante, imunossupressão grave, má adesão ou falha do tratamento ambulatorial",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "US de partes moles (POCUS): celulite extensa com suspeita de abscesso subjacente, falha do antibiótico inicial ou diagnóstico incerto",
    "f": [
     3,
     2
    ]
   },
   {
    "t": "Gram e cultura do pus: recomendados, mas tratar sem eles é aceitável no caso típico; abscesso recorrente: drenar e cultivar sempre",
    "f": [
     1
    ]
   },
   {
    "t": "TC ou RM com contraste: suspeita de infecção profunda ou necrotizante, sem atrasar a avaliação cirúrgica",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "Suspeita de fasciíte necrotizante: hemograma, PCR, sódio, creatinina, CPK e hemocultura em todos",
    "f": [
     3
    ]
   },
   {
    "t": "Função renal e eletrólitos: quando se cogita internação",
    "f": [
     3
    ]
   },
   {
    "t": "Hemocultura: sinais de sepse com febre > 38 °C, quimioterapia, neutropenia, imunodeficiência celular grave, lesão por imersão ou mordedura de animal",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Abscesso recorrente no mesmo local: investigar causa local (cisto pilonidal, hidradenite supurativa, corpo estranho)",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Gram e cultura de cisto epidermoide inflamado",
    "f": [
     1
    ]
   },
   {
    "t": "Hemocultura na celulite ou abscesso sem sinais de sepse (positividade < 4%)",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Escore LRINEC para excluir fasciíte necrotizante (validação questionável)",
    "f": [
     3
    ]
   },
   {
    "t": "RX simples para diagnosticar infecção de partes moles (pouco auxilia)",
    "f": [
     3
    ]
   }
  ],
  "div": [],
  "fontes": [
   "IDSA 2014 — Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the IDSA. Clin Infect Dis 2014;59(2):e10-e52. PMID 24973422. https://doi.org/10.1093/cid/ciu296 (resumo executivo: Clin Infect Dis 2014;59(2):147-59, doi:10.1093/cid/ciu444; recomendações 1, 7, 8, 12, 13, 18 e 27; sem atualização da IDSA localizada até out/2026)",
   "ACR 2022 — Pierce JL et al. ACR Appropriateness Criteria® Suspected Osteomyelitis, Septic Arthritis, or Soft Tissue Infection (Excluding Spine and Diabetic Foot): 2022 Update. J Am Coll Radiol 2022;19(11S):S473-S487. PMID 36436971. https://doi.org/10.1016/j.jacr.2022.09.013",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, 18ª ed., Manole, 2024, cap. 52 Infecções cutâneas (conferência)."
  ]
 },
 "hiperglicemia": {
  "encaminhar": [
   {
    "t": "Sala vermelha / UTI: CAD grave ou EHH, alteração do nível de consciência ou doença crítica como precipitante (infarto, hemorragia digestiva, sepse)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Internação: todo paciente com CAD ou EHH",
    "f": [
     2
    ]
   },
   {
    "t": "Atenção básica: hiperglicemia sem cetose ou cetose sem acidose, após tratar o precipitante (em geral não precisa internar)",
    "f": [
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "Glicemia plasmática (laboratório), além da capilar, na suspeita de crise hiperglicêmica",
    "f": [
     1
    ]
   },
   {
    "t": "Beta-hidroxibutirato (sangue venoso ou capilar), preferível à cetonúria: suspeita de CAD (glicemia ≥ 200 mg/dL ou diabetes conhecido, com vômitos, dor abdominal, taquipneia ou mal-estar)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Cetonemia também com glicemia < 200 mg/dL em uso de inibidor de SGLT2 (CAD euglicêmica)",
    "f": [
     1
    ]
   },
   {
    "t": "Gasometria venosa, sódio, potássio, cloro (ânion-gap), ureia, creatinina e hemograma: suspeita de CAD ou EHH",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Osmolalidade sérica: glicemia ≥ 600 mg/dL ou rebaixamento (EHH: osmolalidade efetiva > 300 ou total > 320 mOsm/kg)",
    "f": [
     1
    ]
   },
   {
    "t": "ECG: CAD ou EHH (isquemia como precipitante, efeito do potássio)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Urina tipo I e RX de tórax: busca de foco infeccioso precipitante",
    "f": [
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Fita urinária de cetona para excluir cetoacidose quando há beta-hidroxibutirato disponível (subestima a cetose no início e na sepse)",
    "f": [
     1,
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Umpierrez 2024 — Umpierrez GE et al. Hyperglycemic crises in adults with diabetes: a consensus report (ADA, EASD, JBDS, AACE, DTS). Diabetes Care 2024;47(8):1257-1275. PMID 39052901. PMCID PMC11272983. https://doi.org/10.2337/dci24-0032",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, 18ª ed., Manole, 2024, cap. 89 Hiperglicemias (exames complementares; indicações de internação e UTI) (conferência)."
  ]
 },
 "hipoglicemia": {
  "encaminhar": [
   {
    "t": "Observação 12–24 h com glicemia capilar de hora em hora: diabético com alto risco de recorrência (por exemplo, doença renal crônica)",
    "f": [
     2
    ]
   },
   {
    "t": "Internação: hipoglicemia em paciente sem diabetes aparentemente doente",
    "f": [
     2
    ]
   },
   {
    "t": "Internação: ingestão intencional de sulfonilureia ou insulina (pode exigir UTI e observação prolongada; observar ao menos 12 h após suspender glicose EV e octreotide)",
    "f": [
     3
    ]
   },
   {
    "t": "Psiquiatria: hipoglicemia por ingestão intencional (avaliação do risco de suicídio; interconsulta conforme risco e fatores de proteção)",
    "f": [
     2
    ]
   },
   {
    "t": "Endocrinologia ambulatorial: hipoglicemia confirmada (tríade de Whipple) em quem não tem diabetes, sem causa evidente",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Glicemia capilar na chegada e após cada correção; confirmar com glicemia plasmática",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Diabético sem causa definida: função renal e eletrólitos",
    "f": [
     2
    ]
   },
   {
    "t": "Sem diabetes, durante o episódio e antes de corrigir, se possível: glicemia plasmática, insulina, peptídeo C, pró-insulina, beta-hidroxibutirato e pesquisa de hipoglicemiante oral",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Sem diabetes e aparentemente doente: função hepática e renal, eletrólitos, cortisol, insulina e peptídeo C, conforme a suspeita (sepse, insuficiência hepática ou adrenal, álcool)",
    "f": [
     2,
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Investigar hipoglicemia sem tríade de Whipple documentada (sintomas, glicemia baixa e melhora com a correção)",
    "f": [
     1
    ]
   },
   {
    "t": "Teste de jejum prolongado na emergência: se o paciente chega em hipoglicemia, colher insulina e peptídeo C no episódio",
    "f": [
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Cryer 2009 — Cryer PE et al. Evaluation and management of adult hypoglycemic disorders: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab 2009;94(3):709-28. PMID 19088155. https://doi.org/10.1210/jc.2008-1410 (diretriz mais recente da Endocrine Society para hipoglicemia sem diabetes localizada até out/2026)",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, 18ª ed., Manole, 2024, cap. 88 Hipoglicemia (exames; observação 12–24 h; internação); cap. 60 Emergências neuropsiquiátricas (risco de suicídio: interconsulta psiquiátrica) (conferência).",
   "Klein-Schwartz 2016 — Klein-Schwartz W, Stassinos GL, Isbister GK. Treatment of sulfonylurea and insulin overdose. Br J Clin Pharmacol 2016;81(3):496-504. PMID 26551662. PMCID PMC4767194. https://doi.org/10.1111/bcp.12822"
  ]
 },
 "ansiedade": {
  "encaminhar": [
   {
    "t": "Atenção básica para seguimento, com orientação escrita sobre a crise de pânico e fontes de apoio; em geral sem internação clínica ou psiquiátrica",
    "f": [
     1
    ]
   },
   {
    "t": "CAPS: crises graves e recorrentes, ideação suicida sem critério de internação, ou uso de álcool e drogas",
    "f": [
     7
    ]
   },
   {
    "t": "Psiquiatria (interconsulta) ou internação: ideação com plano, tentativa recente, transtorno grave ou baixo suporte",
    "f": [
     4,
     8
    ]
   },
   {
    "t": "Sala de emergência: dor torácica, síncope, dispneia ou alteração de sinais vitais com suspeita de causa orgânica",
    "f": [
     3,
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "Só os exames mínimos necessários para excluir causa física aguda, guiados por história e exame",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "ECG em até 10 min: dor torácica, palpitação ou síncope",
    "f": [
     3,
     5
    ]
   },
   {
    "t": "Troponina: dor torácica com suspeita de síndrome coronariana aguda",
    "f": [
     3
    ]
   },
   {
    "t": "Glicemia capilar: sintomas adrenérgicos em diabético ou rebaixamento",
    "f": [
     4
    ]
   },
   {
    "t": "D-dímero ou angiotomografia de tórax: dispneia, dor pleurítica ou fator de risco para TEP, conforme Wells e PERC",
    "f": [
     6
    ]
   },
   {
    "t": "TSH e T4 livre: tremor, perda de peso, bócio ou taquicardia persistente",
    "f": [
     5
    ]
   },
   {
    "t": "Exames dirigidos se idoso, imunossuprimido, psicose de início recente ou uso de substâncias (grupos de maior risco de doença orgânica)",
    "f": [
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exames laboratoriais de rotina em paciente alerta com sintomas psiquiátricos agudos; guiar pela história, diagnóstico psiquiátrico prévio e exame físico",
    "f": [
     2
    ]
   },
   {
    "t": "Toxicológico de urina de rotina (não muda conduta nem destino na emergência)",
    "f": [
     2
    ]
   },
   {
    "t": "Exames laboratoriais ou de imagem específicos para o risco de suicídio",
    "f": [
     4
    ]
   }
  ],
  "div": [],
  "fontes": [
   "NICE 2011 — National Institute for Health and Care Excellence. CG113 Generalised anxiety disorder and panic disorder in adults: management, 2011 (atualizada em 15/06/2020), recomendação 1.3.6 (crise de pânico no pronto-socorro). https://www.nice.org.uk/guidance/cg113",
   "ACEP 2017 — American College of Emergency Physicians Clinical Policies Subcommittee; Nazarian DJ et al. Clinical policy: critical issues in the diagnosis and management of the adult psychiatric patient in the emergency department. Ann Emerg Med 2017;69(4):480-498. https://doi.org/10.1016/j.annemergmed.2017.01.036",
   "AHA/ACC 2021 — Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR guideline for the evaluation and diagnosis of chest pain. Circulation 2021;144(22):e368-e454. PMID 34709879. https://doi.org/10.1161/CIR.0000000000001029",
   "HC-FMUSP 2024 — Medicina de Emergência: Abordagem Prática, 18ª ed., Manole, 2024, cap. 60 Emergências neuropsiquiátricas; cap. 88 Hipoglicemia (conferência).",
   "Katon 2006 — Katon WJ. Clinical practice: panic disorder. N Engl J Med 2006;354:2360-7. https://doi.org/10.1056/NEJMcp052466",
   "ACEP 2018 — Wolf SJ et al. ACEP Clinical Policy: suspected acute venous thromboembolic disease. Ann Emerg Med 2018;71(5):e59-e109. https://doi.org/10.1016/j.annemergmed.2018.03.006",
   "RAPS 2011 — Brasil. Portaria GM/MS nº 3.088/2011, Rede de Atenção Psicossocial (CAPS). https://bvsms.saude.gov.br/bvs/saudelegis/gm/2011/prt3088_23_12_2011_rep.html",
   "ASQ 2020 — Horowitz LM et al. Validation of the Ask Suicide-Screening Questions for Adult Medical Inpatients. Psychosomatics 2020;61:713-722. https://doi.org/10.1016/j.psym.2020.04.008"
  ]
 },
 "tep": {
  "encaminhar": [
   {
    "t": "Sala vermelha: hipotensão persistente, choque ou parada (categoria E): trombólise sistêmica, ou terapia por cateter ou cirúrgica onde houver",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "UTI ou semi-intensiva: categoria D (D1 hipotensão transitória ou síncope; D2 normotenso com hipoperfusão) ou C com VD e troponina alterados",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Internação: sPESI ≥ 1 ou Hestia positivo (categoria C)",
    "f": [
     1,
     6
    ]
   },
   {
    "t": "Centro com terapia por cateter ou cirurgia: categoria D ou E com contraindicação ou falha da trombólise",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Alta precoce: categorias A–B, com anticoagulante oral direto e retorno em até 1 semana",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "D-dímero: TEP improvável (Wells ≤ 4) ou probabilidade baixa/intermediária (Wells ≤ 6), com PERC positivo; > 50 anos, corte idade × 10 mcg/L",
    "f": [
     2,
     4,
     1
    ]
   },
   {
    "t": "Angio-TC de tórax: probabilidade alta ou D-dímero positivo",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "Cintilografia de ventilação/perfusão: contraindicação ao contraste (alergia grave, insuficiência renal) ou gestante com RX de tórax normal",
    "f": [
     2
    ]
   },
   {
    "t": "USG Doppler venoso das pernas: sintomas de TVP ou angio-TC impossível; TVP proximal confirma o tromboembolismo",
    "f": [
     2
    ]
   },
   {
    "t": "Troponina, BNP ou NT-proBNP e VD (eco ou angio-TC): sPESI ≥ 1 ou Hestia positivo, para estratificar",
    "f": [
     2,
     1
    ]
   },
   {
    "t": "Lactato e creatinina: suspeita de falência iminente (categoria D)",
    "f": [
     1
    ]
   },
   {
    "t": "Eco à beira do leito: choque sem condição de angio-TC; VD dilatado autoriza tratar como TEP de alto risco",
    "f": [
     2
    ]
   },
   {
    "t": "Hemograma, TP/INR, TTPa, creatinina com ClCr e função hepática: antes de anticoagular",
    "f": [
     2,
     8
    ]
   },
   {
    "t": "Beta-hCG: mulher em idade fértil, antes do anticoagulante oral direto",
    "f": [
     7
    ]
   },
   {
    "t": "ECG e RX de tórax: diagnóstico diferencial",
    "f": [
     2,
     8
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "D-dímero ou imagem com probabilidade baixa e PERC 0",
    "f": [
     3,
     2
    ]
   },
   {
    "t": "D-dímero com probabilidade alta: ir direto à angio-TC",
    "f": [
     2
    ]
   },
   {
    "t": "Ecocardiograma para confirmar ou excluir TEP no paciente estável",
    "f": [
     1
    ]
   },
   {
    "t": "Rastreio extenso de câncer oculto no pronto-socorro",
    "f": [
     2
    ]
   }
  ],
  "div": [
   {
    "t": "Baixa ou intermediária probabilidade: D-dímero com corte ajustado à idade (ESC 2019; ADJUST-PE 2014) ou algoritmo YEARS, recomendado também na gestação",
    "f": [
     2,
     4,
     1,
     5
    ]
   }
  ],
  "fontes": [
   "AHA/ACC 2026 — Creager MA et al. 2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN Guideline for the Evaluation and Management of Acute Pulmonary Embolism in Adults. Circulation 2026;153:e977.",
   "ESC 2019 — Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism. Eur Heart J 2020;41:543. https://academic.oup.com/eurheartj/article/41/4/543/5556136",
   "Kline JA et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism (PERC). J Thromb Haemost 2004;2:1247.",
   "ADJUST-PE 2014 — Righini M et al. Age-adjusted D-dimer cutoff levels to rule out pulmonary embolism. JAMA 2014;311:1117.",
   "YEARS 2017 — van der Hulle T et al. Simplified diagnostic management of suspected pulmonary embolism (the YEARS study). Lancet 2017;390:289.",
   "Hestia 2011 — Zondag W et al. Outpatient treatment in patients with acute pulmonary embolism: the Hestia Study. J Thromb Haemost 2011;9:1500.",
   "Bulas Xarelto (rivaroxabana) e Eliquis (apixabana) registradas na Anvisa: contraindicados na gestação.",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 51 Tromboembolismo pulmonar (conferência)."
  ]
 },
 "tvp": {
  "encaminhar": [
   {
    "t": "Cirurgia Vascular de urgência: flegmasia (perna muito inchada, arroxeada ou pálida, fria, dor intensa, isquemia)",
    "f": [
     6
    ]
   },
   {
    "t": "Conduta de TEP: dispneia, dor torácica, síncope, taquicardia ou hipoxemia",
    "f": [
     4
    ]
   },
   {
    "t": "Internação: TVP iliofemoral extensa com sintomas graves, sangramento ativo ou alto risco, insuficiência renal grave, dor sem controle oral ou sem condição de seguir em casa",
    "f": [
     2,
     6
    ]
   },
   {
    "t": "Alta com retorno: TVP sem complicação, com anticoagulante oral direto",
    "f": [
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "D-dímero: Wells < 2; > 50 anos, corte idade × 10 mcg/L",
    "f": [
     1,
     7,
     6
    ]
   },
   {
    "t": "USG Doppler venoso com compressão (proximal ou da perna inteira): Wells ≥ 2 ou D-dímero positivo",
    "f": [
     1
    ]
   },
   {
    "t": "Repetir a USG proximal em cerca de 1 semana (ou fazer da perna inteira): probabilidade alta ou D-dímero positivo com USG proximal negativa",
    "f": [
     1
    ]
   },
   {
    "t": "USG seriada 1 vez por semana por 2 semanas: TVP distal isolada sem anticoagulante",
    "f": [
     3
    ]
   },
   {
    "t": "Hemograma, TP/INR, TTPa, creatinina com ClCr e função hepática: antes de anticoagular",
    "f": [
     6,
     5
    ]
   },
   {
    "t": "Beta-hCG: mulher em idade fértil, antes do anticoagulante oral direto",
    "f": [
     5
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "D-dímero com probabilidade alta (Wells ≥ 2): ir direto à USG",
    "f": [
     1
    ]
   },
   {
    "t": "D-dímero com condição que sabidamente o eleva (câncer, gestação, internação, pós-operatório): ir direto à USG",
    "f": [
     6
    ]
   }
  ],
  "div": [],
  "fontes": [
   "ASH 2018 — Lim W et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: diagnosis of venous thromboembolism. Blood Adv 2018;2:3226.",
   "ASH 2020 — Ortel TL et al. American Society of Hematology 2020 guidelines for management of venous thromboembolism: treatment of deep vein thrombosis and pulmonary embolism. Blood Adv 2020;4:4693.",
   "CHEST 2021 — Stevens SM et al. Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline and Expert Panel Report. Chest 2021;160:e545.",
   "ESC 2019 — Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism. Eur Heart J 2020;41:543.",
   "Bulas Xarelto (rivaroxabana) e Eliquis (apixabana) registradas na Anvisa: contraindicados na gestação; ajuste pela função renal e hepática.",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 39 Trombose venosa profunda (conferência).",
   "NICE NG158 — NICE. Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (NG158, 2020, atualizada 2023): D-dímero com corte ajustado à idade acima de 50 anos na suspeita de TVP. https://www.nice.org.uk/guidance/ng158"
  ]
 },
 "contratura": {
  "encaminhar": [
   {
    "t": "Sala de trauma: cervicalgia após trauma com indicação de imagem pela regra canadense; manter a coluna cervical protegida",
    "f": [
     5,
     2
    ]
   },
   {
    "t": "Neurologia (não liberar): cefaleia súbita, ptose e miose do mesmo lado ou déficit neurológico, suspeita de dissecção de artéria cervical",
    "f": [
     4
    ]
   },
   {
    "t": "Neurocirurgia / Ortopedia de urgência: fraqueza ou parestesia progressiva, alteração da marcha ou esfincteriana (mielopatia)",
    "f": [
     3,
     6
    ]
   },
   {
    "t": "Internação: febre com dor cervical (espondilodiscite, abscesso epidural) ou febre com rigidez de nuca (meningite)",
    "f": [
     6,
     1
    ]
   },
   {
    "t": "Fisioterapia (ambulatorial, pela unidade básica): dor persistente ou recorrente sem sinal de alarme",
    "f": [
     7,
     8
    ]
   }
  ],
  "pedir": [
   {
    "t": "TC de coluna cervical sem contraste: trauma com indicação pela regra canadense ou NEXUS",
    "f": [
     5,
     2
    ]
   },
   {
    "t": "RM de coluna cervical com urgência: déficit neurológico, mielopatia, suspeita de infecção ou câncer",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Angiotomografia de crânio e pescoço: suspeita de dissecção de artéria cervical",
    "f": [
     4
    ]
   },
   {
    "t": "Hemograma, VHS e PCR: febre, imunossupressão ou suspeita de infecção ou câncer",
    "f": [
     6
    ]
   },
   {
    "t": "ECG em até 10 min e troponina: dor no pescoço, ombro ou braço aos esforços ou com dispneia, sudorese ou náusea",
    "f": [
     9
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "RX, TC ou RM na cervicalgia aguda sem trauma e sem sinal de alarme",
    "f": [
     1,
     7
    ]
   },
   {
    "t": "RX de coluna cervical no trauma com regra canadense negativa",
    "f": [
     5,
     10
    ]
   }
  ],
  "div": [],
  "fontes": [
   "ACR 2024 cervical — ACR Appropriateness Criteria Cervical Pain or Cervical Radiculopathy: 2024 Update. J Am Coll Radiol 2025;22(5S):S136-S162. PMID 40409873.",
   "ACR 2024 trauma — ACR Appropriateness Criteria Acute Spinal Trauma: 2024 Update. J Am Coll Radiol 2025;22(5S):S48-S66. PMID 40409895. https://doi.org/10.1016/j.jacr.2025.02.013",
   "ACR 2026 mielopatia — ACR Appropriateness Criteria Myelopathy: 2026 Update. J Am Coll Radiol 2026;23(9):1870-1883. PMID 42340276.",
   "ACR 2025 Horner — ACR Appropriateness Criteria Horner Syndrome. J Am Coll Radiol 2025;22(11S):S550-S577. PMID 41193044 (dissecção cervical).",
   "Stiell 2001 — Stiell IG et al. The Canadian C-spine rule for radiography in alert and stable trauma patients. JAMA 2001;286(15):1841-1848. PMID 11597285.",
   "Finucane 2020 — Finucane LM et al. International Framework for Red Flags for Potential Serious Spinal Pathologies. J Orthop Sports Phys Ther 2020;50(7):350-372. https://doi.org/10.2519/jospt.2020.9971",
   "Blanpied 2017 — Blanpied PR et al. Neck Pain: Revision 2017 (APTA/JOSPT). J Orthop Sports Phys Ther 2017;47(7):A1-A83. https://doi.org/10.2519/jospt.2017.0302",
   "OPTIMa 2016 — Côté P et al. Management of neck pain and associated disorders: a clinical practice guideline from the OPTIMa Collaboration. Eur Spine J 2016;25(7):2000-2022. https://doi.org/10.1007/s00586-016-4467-7",
   "Gulati 2021 — Gulati M et al. 2021 AHA/ACC Guideline for the Evaluation and Diagnosis of Chest Pain. Circulation 2021;144(22):e368-e454. PMID 34709879. https://doi.org/10.1161/CIR.0000000000001029",
   "Choosing Wisely Canada 2024 — Choosing Wisely Canada, Emergency Medicine (atualizado em setembro de 2024): sem RX cervical com regra canadense negativa. https://choosingwiselycanada.org/recommendation/emergency-medicine/"
  ]
 },
 "odontalgia": {
  "encaminhar": [
   {
    "t": "Dentista (unidade básica de saúde ou CEO) em todos os casos: o tratamento definitivo é canal, drenagem ou extração",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Dentista com urgência (em 1 a 2 dias): todo abscesso (inchaço ou pus), com ou sem febre, mesmo com antibiótico",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Cirurgia bucomaxilofacial ou otorrino de urgência (não liberar): trismo, disfagia, voz abafada, edema do assoalho da boca ou cervical",
    "f": [
     4,
     5
    ]
   },
   {
    "t": "Internação: sepse, toxemia, celulite cervical ou infecção de espaço profundo",
    "f": [
     3,
     6
    ]
   }
  ],
  "pedir": [
   {
    "t": "TC de pescoço com contraste: suspeita de infecção de espaço profundo ou angina de Ludwig (trismo, disfagia, edema cervical ou do assoalho da boca)",
    "f": [
     4,
     5
    ]
   },
   {
    "t": "Hemograma, PCR, lactato e hemoculturas: febre alta, toxemia ou suspeita de sepse",
    "f": [
     6
    ]
   },
   {
    "t": "ECG em até 10 min e troponina: dor na mandíbula aos esforços ou com dispneia, sudorese ou náusea",
    "f": [
     7
    ]
   }
  ],
  "naoPedir": [],
  "div": [],
  "fontes": [
   "ADA 2019 — Lockhart PB et al. Evidence-based clinical practice guideline on antibiotic use for the urgent management of pulpal- and periapical-related dental pain and intraoral swelling. J Am Dent Assoc 2019;150(11):906-921. PMID 31668170. https://doi.org/10.1016/j.adaj.2019.08.020",
   "ADA 2024 — Carrasco-Labra A et al. Pharmacologic management of acute dental pain in adolescents, adults, and older adults. J Am Dent Assoc 2024;155(2):102-117. PMID 38325969. https://doi.org/10.1016/j.adaj.2023.10.009",
   "CDC 2022 — CDC. Dentists: Be Antibiotics Aware. Treating patients with dental pain and swelling (2022). https://www.cdc.gov/antibiotic-use/pdfs/ada-treatment-guidelines-508.pdf",
   "HC-FMUSP 2024 cap 47 — Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 47, Infecções de vias aéreas superiores.",
   "Harrison 2025 cap 38 — Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 38, Oral Manifestations of Disease.",
   "SSC 2021 — Evans L et al. Surviving Sepsis Campaign 2021. Crit Care Med 2021;49(11):e1063-e1143. https://doi.org/10.1097/CCM.0000000000005337",
   "Gulati 2021 — Gulati M et al. 2021 AHA/ACC Guideline for the Evaluation and Diagnosis of Chest Pain. Circulation 2021;144(22):e368-e454. PMID 34709879. https://doi.org/10.1161/CIR.0000000000001029"
  ]
 },
 "olho-vermelho": {
  "encaminhar": [
   {
    "t": "Oftalmologia de urgência (não liberar): trauma penetrante, corpo estranho intraocular, queimadura química depois da irrigação, glaucoma agudo",
    "f": [
     1,
     6
    ]
   },
   {
    "t": "Oftalmologia no mesmo dia: baixa visual, dor intensa, fotofobia, pupila alterada, córnea opaca, hipópio, hifema, lente de contato com olho vermelho",
    "f": [
     1,
     4,
     5
    ]
   },
   {
    "t": "Oftalmologia: corpo estranho que não sai ou profundo; anel de ferrugem, retirada pelo oftalmologista nos próximos dias",
    "f": [
     3
    ]
   },
   {
    "t": "Reavaliação em 24 h (na unidade ou com oftalmologista): abrasão maior que 4 mm, em usuário de lente de contato ou com visão diminuída",
    "f": [
     3
    ]
   }
  ],
  "pedir": [
   {
    "t": "TC de órbitas sem contraste (cortes finos): trauma penetrante, martelar ou esmerilhar metal, suspeita de corpo estranho intraocular",
    "f": [
     7,
     1
    ]
   },
   {
    "t": "TC de órbitas com contraste: edema palpebral com proptose, dor à movimentação ocular, diplopia ou baixa visual (celulite orbitária)",
    "f": [
     1
    ]
   },
   {
    "t": "pH da lágrima com fita (a de urina serve): queimadura química, 5 a 10 min após parar a irrigação, até pH 7,3 a 7,7",
    "f": [
     1
    ]
   },
   {
    "t": "Fluoresceína com luz azul: toda sensação de corpo estranho, trauma ou suspeita de abrasão",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "PA na hemorragia subconjuntival; coagulograma só na recorrente",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exames laboratoriais ou de imagem no olho vermelho sem trauma: o diagnóstico é pelo exame do olho",
    "f": [
     7
    ]
   },
   {
    "t": "RM com suspeita de corpo estranho metálico: pode deslocar o metal; pedir TC",
    "f": [
     8,
     1
    ]
   },
   {
    "t": "Coagulograma na hemorragia subconjuntival isolada, sem anticoagulante e sem recorrência",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "HC-FMUSP 2024 cap 108 — Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 108, Emergências oftalmológicas.",
   "Harrison 2025 cap 34 — Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 34, Disorders of the Eye.",
   "AAFP 2013 — Wipperman JL, Dorsch JN. Evaluation and management of corneal abrasions. Am Fam Physician 2013;87(2):114-120. https://www.aafp.org/pubs/afp/issues/2013/0115/p114.html",
   "AAO PPP 2023 conjunctivitis — Cheung AY et al. American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern 2023. Ophthalmology 2024;131:P134.",
   "AAO PPP 2023 bacterial keratitis — American Academy of Ophthalmology. Bacterial Keratitis Preferred Practice Pattern (aprovado em 22/09/2023). https://www.aao.org/education/preferred-practice-pattern/bacterial-keratitis-ppp-2023",
   "AAO PPP 2025 angle-closure — Gedde SJ et al. American Academy of Ophthalmology. Primary Angle-Closure Disease Preferred Practice Pattern 2025. Ophthalmology 2026;133(4):P153-P201. https://www.aao.org/education/preferred-practice-pattern/primary-angle-closure-disease-ppp",
   "ACR 2025 vision loss — ACR Appropriateness Criteria Vision Loss. J Am Coll Radiol 2025;22(11S):S738-S765. PMID 41193055. https://doi.org/10.1016/j.jacr.2025.08.030",
   "ACR MR safety 2024 — ACR Manual on MR Safety (2024): triagem de corpo estranho metálico na órbita antes da RM; na dúvida, RX ou TC de órbitas. https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Radiology-Safety/MR-Safety"
  ]
 },
 "sincope": {
  "encaminhar": [
   {
    "t": "Sala de emergência com monitor e desfibrilador: síncope com característica de alto risco (esforço, deitado, palpitação antes, dor torácica, ECG de alto risco, PA sistólica < 90 mmHg)",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Internação ou Cardiologia: causa cardíaca ou grave identificada (arritmia, infarto, estenose aórtica grave, TEP, dissecção, tamponamento) ou alto risco sem diagnóstico",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Observação com monitor: CSRS baixo por cerca de 2 h; CSRS médio ou alto por pelo menos 6 h",
    "f": [
     4,
     5
    ]
   },
   {
    "t": "Cirurgia ou Ginecologia: síncope com sangramento digestivo, dor abdominal com hipotensão ou beta-hCG positivo com suspeita de ectópica rota",
    "f": [
     2
    ]
   },
   {
    "t": "Ambulatório de Cardiologia (não urgente): síncope inexplicada recorrente sem alto risco, para Holter, monitor de eventos ou teste de inclinação",
    "f": [
     1,
     5
    ]
   }
  ],
  "pedir": [
   {
    "t": "ECG de 12 derivações: em toda síncope",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "PA e FC deitado e após 3 min em pé: em toda síncope",
    "f": [
     1
    ]
   },
   {
    "t": "Glicemia capilar: considerar no diabético, na recuperação incompleta ou se ainda alterado na chegada",
    "f": [
     5
    ]
   },
   {
    "t": "Hemograma: suspeita de sangramento ou anemia; troponina: dor torácica, dispneia ou suspeita de causa cardíaca",
    "f": [
     2,
     3
    ]
   },
   {
    "t": "Eletrólitos e função renal: uso de diurético, vômitos, diarreia ou desidratação",
    "f": [
     2
    ]
   },
   {
    "t": "Beta-hCG: mulher em idade fértil",
    "f": [
     2
    ]
   },
   {
    "t": "Ecocardiograma: sopro, cardiopatia conhecida ou suspeita, ou ECG alterado",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "D-dímero ou angiotomografia de tórax: suspeita clínica de TEP (dispneia, taquicardia, hipoxemia)",
    "f": [
     1
    ]
   },
   {
    "t": "TC de crânio sem contraste: só com trauma de crânio relevante ou sinal neurológico",
    "f": [
     6,
     2
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Exames de laboratório de rotina sem suspeita clínica",
    "f": [
     2
    ]
   },
   {
    "t": "TC ou RM de crânio, EEG e Doppler de carótidas de rotina na síncope sem sinal neurológico",
    "f": [
     2,
     6
    ]
   },
   {
    "t": "Escore (CSRS ou San Francisco) como único critério de alta",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "ESC 2018 — Brignole M et al. 2018 ESC Guidelines for the diagnosis and management of syncope. Eur Heart J 2018;39:1883-1948. https://doi.org/10.1093/eurheartj/ehy037",
   "ACC/AHA 2017 — Shen WK et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients With Syncope. Circulation 2017;136:e60-e122. https://doi.org/10.1161/CIR.0000000000000499",
   "CSRS 2016 — Thiruganasambandamoorthy V et al. Development of the Canadian Syncope Risk Score. CMAJ 2016;188(12):E289-E298. https://doi.org/10.1503/cmaj.151469",
   "Thiruganasambandamoorthy 2019 — Thiruganasambandamoorthy V et al. Duration of Electrocardiographic Monitoring of Emergency Department Patients With Syncope. Circulation 2019;139:1396-1406.",
   "HC-FMUSP 2024 — Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 20 — Perda transitória da consciência.",
   "ACEP Choosing Wisely — American College of Emergency Physicians, Choosing Wisely: TC de crânio na síncope sem trauma significativo e com exame neurológico normal. https://www.choosingwisely.org/clinician-lists/american-college-emergency-physicians-ct-scans-of-head-for-emergency-department-patients-with-syncope/"
  ]
 },
 "pericardite": {
  "encaminhar": [
   {
    "t": "Sala de emergência e Cardiologia: tamponamento (hipotensão, turgência jugular, pulso paradoxal), para ecocardiograma à beira do leito e pericardiocentese",
    "f": [
     1
    ]
   },
   {
    "t": "Internação: alto risco (febre > 38 °C, derrame > 20 mm, tamponamento)",
    "f": [
     1
    ]
   },
   {
    "t": "Internação ou seguimento próximo com a Cardiologia: derrame moderado, falha do AINE, insuficiência cardíaca direita, troponina elevada, imunossupressão ou anticoagulante",
    "f": [
     1,
     2
    ]
   },
   {
    "t": "Protocolo de SCA: supra de ST localizado com imagem em espelho, onda Q ou troponina subindo",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Retorno em 1 a 2 semanas (clínico ou Cardiologia) com PCR: todos os que vão para casa",
    "f": [
     1
    ]
   }
  ],
  "pedir": [
   {
    "t": "ECG, radiografia de tórax, ecocardiograma transtorácico, hemograma, PCR e troponina: em toda suspeita de pericardite",
    "f": [
     1
    ]
   },
   {
    "t": "Creatinina e transaminases: antes de colchicina e anti-inflamatório",
    "f": [
     1
    ]
   },
   {
    "t": "Pesquisa de causa (tuberculose, câncer, doença autoimune, função tireoidiana, ureia): alto risco ou sem resposta ao tratamento",
    "f": [
     1
    ]
   },
   {
    "t": "FAN: mulher jovem com pericardite",
    "f": [
     3
    ]
   },
   {
    "t": "Ressonância magnética cardíaca (ambulatorial ou internado): diagnóstico duvidoso pelos critérios clínicos ou suspeita de miocardite",
    "f": [
     1
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Sorologias virais de rotina (pedir só HIV e hepatite C)",
    "f": [
     1
    ]
   },
   {
    "t": "Pesquisa extensa de causa no paciente de baixo risco que responde ao anti-inflamatório",
    "f": [
     1
    ]
   }
  ],
  "div": [],
  "fontes": [
   "ESC 2025 — Schulz-Menger J, Collini V et al. 2025 ESC Guidelines for the management of myocarditis and pericarditis. Eur Heart J 2025;46(40):3952. https://doi.org/10.1093/eurheartj/ehaf192",
   "ESC 2015 — Adler Y et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases. Eur Heart J 2015;36:2921-2964. https://doi.org/10.1093/eurheartj/ehv318",
   "HC-FMUSP 2024 — Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 37 — Pericardite aguda, derrame pericárdico e tamponamento cardíaco."
  ]
 },
 "retencao-urinaria": {
  "encaminhar": [
   {
    "t": "Neurocirurgia / Ortopedia de urgência (não liberar): retenção com dor lombar, anestesia em sela, fraqueza nas pernas ou incontinência fecal",
    "f": [
     4,
     1
    ]
   },
   {
    "t": "Urologia de urgência: falha na passagem da sonda, sangue no meato, trauma ou estenose uretral, hematúria com coágulos",
    "f": [
     1
    ]
   },
   {
    "t": "Internação: diurese pós-obstrutiva, creatinina elevada com hidronefrose, ou febre com retenção (prostatite, pielonefrite)",
    "f": [
     3,
     5
    ]
   },
   {
    "t": "Urologia ambulatorial: retirada da sonda após 3 a 7 dias com tansulosina; falha na retirada; resíduo > 300 mL",
    "f": [
     1,
     2
    ]
   }
  ],
  "pedir": [
   {
    "t": "Ultrassom à beira do leito ou bladder scan, se disponível: confirmar a retenção e medir o volume antes de sondar",
    "f": [
     1
    ]
   },
   {
    "t": "EAS, creatinina, ureia, sódio e potássio: todos; repetir eletrólitos se diurese pós-obstrutiva",
    "f": [
     1,
     3
    ]
   },
   {
    "t": "Urocultura (da sonda recém-passada): EAS alterado, febre ou sintomas de infecção",
    "f": [
     1,
     7
    ]
   },
   {
    "t": "Glicemia: suspeita de causa neurológica ou diabetes",
    "f": [
     1
    ]
   },
   {
    "t": "US de rins e vias urinárias: creatinina elevada, infecção ou retenção de longa data (hidronefrose)",
    "f": [
     1,
     6
    ]
   },
   {
    "t": "RM de coluna de emergência (em até 4 h): sinais de cauda equina ou compressão medular",
    "f": [
     4
    ]
   },
   {
    "t": "Hemograma e hemoculturas: febre com retenção",
    "f": [
     5
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "Urocultura de controle ou antibiótico para bacteriúria sem sintomas em quem está com sonda",
    "f": [
     7
    ]
   }
  ],
  "div": [],
  "fontes": [
   "Serlin 2018 — Serlin DC, Heidelbaugh JJ, Stoffel JT. Urinary Retention in Adults: Evaluation and Initial Management. Am Fam Physician 2018;98(8):496-503. PMID 30277739. https://www.aafp.org/pubs/afp/issues/2018/1015/p496.html",
   "Fisher 2014 — Fisher E et al. The role of alpha blockers prior to removal of urethral catheter for acute urinary retention in men. Cochrane Database Syst Rev 2014;CD006744. https://doi.org/10.1002/14651858.CD006744.pub3",
   "Halbgewachs 2015 — Halbgewachs C, Domes T. Postobstructive diuresis: pay close attention to urinary retention. Can Fam Physician 2015;61(2):137-42. PMID 25821871.",
   "GIRFT 2023 — GIRFT/NHS England. National Suspected Cauda Equina Syndrome Pathway, fevereiro de 2023, atualizado até março de 2026. https://gettingitrightfirsttime.co.uk/wp-content/uploads/2026/04/National-Suspected-Cauda-Equina-Pathway-March-2026.pdf",
   "Coker 2016 — Coker TJ, Dierfeldt DM. Acute bacterial prostatitis: diagnosis and management. Am Fam Physician 2016;93(2):114-20. PMID 26926407. https://www.aafp.org/pubs/afp/issues/2016/0115/p114.html",
   "Harrison 2025 — Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 331 Urinary Tract Obstruction.",
   "IDSA 2019 — Nicolle LE et al. Clinical Practice Guideline for the Management of Asymptomatic Bacteriuria: 2019 Update by the Infectious Diseases Society of America. Clin Infect Dis 2019;68(10):e83-e110. https://doi.org/10.1093/cid/ciy1121"
  ]
 },
 "escroto-agudo": {
  "encaminhar": [
   {
    "t": "Urologia na hora, sem esperar ultrassom: dor testicular súbita com suspeita de torção ou TWIST ≥ 5",
    "f": [
     1,
     2,
     3
    ]
   },
   {
    "t": "Sala vermelha e urologia ou cirurgia (desbridamento em até 24 h): suspeita de Fournier",
    "f": [
     4
    ]
   },
   {
    "t": "Cirurgia geral de urgência: hérnia inguinoescrotal encarcerada ou estrangulada",
    "f": [
     5
    ]
   },
   {
    "t": "Urologia: trauma com suspeita de ruptura testicular, hematocele volumosa ou imagem inconclusiva",
    "f": [
     6
    ]
   },
   {
    "t": "Internação: epididimite com febre alta, sinais sistêmicos, abscesso ou sem melhora em 72 h",
    "f": [
     7,
     4
    ]
   },
   {
    "t": "Atenção básica ou serviço de IST: seguimento da epididimite por IST, testagem e tratamento das parcerias",
    "f": [
     8,
     7
    ]
   }
  ],
  "pedir": [
   {
    "t": "US de bolsa escrotal com Doppler: TWIST 3 ou 4 ou dúvida diagnóstica, sem atrasar a urologia",
    "f": [
     9,
     1
    ]
   },
   {
    "t": "US de bolsa escrotal: trauma escrotal",
    "f": [
     6
    ]
   },
   {
    "t": "EAS e urocultura de jato médio: suspeita de epididimite",
    "f": [
     4,
     7
    ]
   },
   {
    "t": "PCR (NAAT) para clamídia e gonococo no primeiro jato de urina, se disponível: epididimite em quem tem vida sexual ativa",
    "f": [
     7,
     4
    ]
   },
   {
    "t": "Testes rápidos de HIV, sífilis e hepatites B e C: epididimite com risco de IST",
    "f": [
     8
    ]
   },
   {
    "t": "Hemograma, PCR, creatinina, lactato, glicemia e hemoculturas: suspeita de Fournier ou sepse",
    "f": [
     4
    ]
   },
   {
    "t": "TC de pelve: Fournier com dúvida da extensão, sem atrasar a cirurgia",
    "f": [
     4
    ]
   }
  ],
  "naoPedir": [
   {
    "t": "US com Doppler antes de chamar a urologia quando a suspeita de torção é alta",
    "f": [
     1,
     2
    ]
   }
  ],
  "div": [],
  "fontes": [
   "EAU 2026 pediátrica — EAU Guidelines on Paediatric Urology, 2026, Acute scrotum. https://uroweb.org/guidelines/paediatric-urology/chapter/acute-scrotum",
   "Barbosa 2013 — Barbosa JA et al. Development and initial validation of a scoring system to diagnose testicular torsion in children. J Urol 2013;189:1859-64. https://doi.org/10.1016/j.juro.2012.10.056",
   "Barbosa 2021 — Barbosa JABA et al. Validation of the TWIST score for testicular torsion in adults. Int Urol Nephrol 2021;53:7-11. https://doi.org/10.1007/s11255-020-02618-4",
   "EAU 2026 infecções — EAU Guidelines on Urological Infections, 2026, cap. 3.12 Acute epididymitis e 3.13 Fournier's gangrene. https://uroweb.org/guidelines/urological-infections/chapter/the-guideline",
   "HerniaSurge 2018 — HerniaSurge Group. International guidelines for groin hernia management. Hernia 2018;22(1):1-165. https://doi.org/10.1007/s10029-017-1668-x",
   "EAU 2026 trauma — EAU Guidelines on Urological Trauma, 2026, Genital trauma. https://uroweb.org/guidelines/urological-trauma/chapter/urogenital-trauma-guidelines",
   "CDC 2021 — Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021: Epididymitis. MMWR Recomm Rep 2021;70(4):1-187. https://www.cdc.gov/std/treatment-guidelines/epididymitis.htm",
   "PCDT 2022 — Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022. https://www.saude.sp.gov.br/resources/crt/assistencia/pcdt/pcdtists2022.pdf",
   "ACR 2024 — Expert Panel on Urological Imaging. ACR Appropriateness Criteria Acute Onset of Scrotal Pain, Without Trauma, Without Antecedent Mass: 2024 Update. J Am Coll Radiol 2024;21(11S):S364-S371. https://doi.org/10.1016/j.jacr.2024.08.011"
  ]
 }
};
if (typeof module!=="undefined") module.exports={EXAMES};

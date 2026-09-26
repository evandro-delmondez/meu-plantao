/* ===== Protocolos em fluxo (Sala vermelha). Alto risco: conferência independente antes de publicar. ===== */
/* ===== Protocolos em fluxo (Sala vermelha). Rascunho para conferência independente. =====
   Conteúdo de alto risco: cada dose tem via e teto; cada protocolo tem fontes.
   Passo sem "decisao" segue para o próximo passo da lista; por isso os ramos que terminam
   apontam, por uma decisão de opção única, para o passo final comum (último da lista). */
const PROTOCOLOS=[
/* ---------------------------------------------------------------- IAM com supra */
{id:"iamcsst",titulo:"IAM com supradesnível de ST",cor:"red",conduta:"sca",
 passos:[
  {id:"p1",t:"Reconhecer e estabilizar",tempo:"0–10 min",itens:[
   "ECG de 12 derivações em até 10 min da chegada; repetir a cada 15–30 min se a dor persistir e o primeiro ECG não for diagnóstico.",
   "Supradesnível de ST novo no ponto J em 2 derivações contíguas: ≥ 1 mm em todas, exceto V2–V3 (homem ≥ 40 anos ≥ 2 mm; homem < 40 anos ≥ 2,5 mm; mulher ≥ 1,5 mm).",
   "Infarto inferior: fazer V3R e V4R (ventrículo direito). Infradesnível de V1–V3: fazer V7–V9 (≥ 0,5 mm = infarto posterior). Equivalentes: bloqueio de ramo esquerdo com critérios de Sgarbossa, padrão de De Winter.",
   "Monitor, desfibrilador ao lado, acesso venoso, troponina (não esperar o resultado para reperfundir).",
   "AAS 162–325 mg VO mastigado (ex.: 300 mg), se não houver alergia; manutenção 75–100 mg/dia.",
   "O2 só se SpO2 < 90%.",
   "Dor: nitrato sublingual (dinitrato de isossorbida 5 mg SL, até 3 doses a cada 5 min) se PAS ≥ 90 mmHg, sem suspeita de infarto de VD e sem inibidor de fosfodiesterase-5 recente (sildenafila ou vardenafila 24 h; tadalafila 48 h). Dor refratária: morfina 2–4 mg EV, repetir com cautela (pode atrasar o efeito dos antiagregantes orais).",
   "Antes de antiagregar e anticoagular, pensar em dissecção de aorta (dor dilacerante, assimetria de pulso ou PA, mediastino alargado).",
   "Acionar a regulação/central de IAM e a hemodinâmica de referência assim que o diagnóstico for feito."],
   decisao:{pergunta:"Há supradesnível de ST (ou equivalente) no ECG?",opcoes:[{rot:"Sim",ir:"p2"},{rot:"Não",ir:"psem"}]}},
  {id:"p2",t:"Tempo desde o início dos sintomas",itens:[
   "Reperfusão está indicada até 12 h do início dos sintomas.",
   "Depois de 12 h, a angioplastia continua indicada se houver isquemia persistente, insuficiência cardíaca aguda, choque ou arritmia grave."],
   decisao:{pergunta:"Sintomas há ≤ 12 h, ou > 12 h com isquemia persistente, instabilidade hemodinâmica ou elétrica?",opcoes:[{rot:"Sim",ir:"p3"},{rot:"Não (> 12 h, estável e sem dor)",ir:"ptardio"}]}},
  {id:"p3",t:"Escolher a estratégia de reperfusão",tempo:"≤ 10 min do diagnóstico",itens:[
   "Angioplastia primária é a preferida quando a artéria pode ser aberta em até 120 min do diagnóstico (primeiro contato médico até a passagem do fio-guia), incluindo o tempo de transferência.",
   "Se o serviço de destino não garante esse tempo, a fibrinólise na própria unidade é a opção, com porta-agulha ≤ 30 min (ESC: ≤ 10 min do diagnóstico).",
   "Choque cardiogênico ou insuficiência cardíaca grave: preferir angioplastia mesmo com atraso."],
   decisao:{pergunta:"A angioplastia primária é possível em ≤ 120 min do diagnóstico?",opcoes:[{rot:"Sim",ir:"p4"},{rot:"Não",ir:"p5"}]}},
  {id:"p4",t:"Angioplastia primária: transferir já",itens:[
   "Transferência imediata com médico e monitor para o serviço com hemodinâmica; não passar por outra emergência no caminho.",
   "Segundo antiagregante (inibidor de P2Y12), conforme combinado com a hemodinâmica: ticagrelor 180 mg VO (manutenção 90 mg 12/12 h) ou prasugrel 60 mg VO (manutenção 10 mg/dia; contraindicado se AVC ou AIT prévio; ≥ 75 anos ou < 60 kg: evitar ou reduzir para 5 mg/dia). Sem os dois: clopidogrel 600 mg VO.",
   "A anticoagulação da angioplastia (heparina não fracionada 70–100 UI/kg EV) é feita na sala de hemodinâmica; combinar com o serviço de destino antes de anticoagular na unidade.",
   "Manter AAS, analgesia e monitorização durante o transporte."],
   decisao:{pergunta:"Paciente encaminhado à hemodinâmica.",opcoes:[{rot:"Ver cuidados após a reperfusão",ir:"pfim"}]}},
  {id:"p5",t:"Contraindicações à fibrinólise",itens:[
   "Absolutas: qualquer hemorragia intracraniana prévia ou AVC de causa desconhecida; AVC isquêmico nos últimos 3 meses (exceto AVC agudo em até 4,5 h); lesão vascular cerebral estrutural (ex.: malformação arteriovenosa); neoplasia intracraniana; trauma de crânio ou face significativo nos últimos 3 meses; cirurgia intracraniana ou medular nos últimos 2 meses; sangramento ativo ou diátese hemorrágica (exceto menstruação); suspeita de dissecção de aorta; hipertensão grave que não cede ao tratamento de emergência.",
   "Relativas: PAS > 180 ou PAD > 110 mmHg na chegada; hipertensão crônica grave e mal controlada; AVC isquêmico há mais de 3 meses ou demência; AIT nos últimos 6 meses; RCP traumática ou prolongada (> 10 min); cirurgia de grande porte há menos de 3 semanas; sangramento interno nas últimas 2–4 semanas; punção vascular não compressível; gestação ou até 1 semana após o parto; úlcera péptica ativa; anticoagulante oral em uso; doença hepática avançada; endocardite infecciosa."],
   decisao:{pergunta:"Há contraindicação absoluta?",opcoes:[{rot:"Sim: transferir para angioplastia mesmo com atraso",ir:"p4"},{rot:"Não",ir:"p6"}]}},
  {id:"p6",t:"Fibrinólise e terapia associada",tempo:"porta-agulha ≤ 30 min",itens:[
   "Tenecteplase EV em bolus único de 5–10 s, por peso: < 60 kg 30 mg (6 mL) | 60–69 kg 35 mg (7 mL) | 70–79 kg 40 mg (8 mL) | 80–89 kg 45 mg (9 mL) | ≥ 90 kg 50 mg (10 mL). Teto 50 mg.",
   "Idade ≥ 75 anos: metade da dose da faixa de peso de tenecteplase (ESC 2023; estudo STREAM-2).",
   "Tenecteplase é incompatível com soro glicosado: lavar o acesso com SF 0,9% antes e depois.",
   "Sem tenecteplase: alteplase 15 mg EV em bolus + 0,75 mg/kg em 30 min (máx. 50 mg) + 0,5 mg/kg em 60 min (máx. 35 mg); teto total 100 mg.",
   "AAS: manter (se ainda não recebeu, 162–325 mg VO mastigado).",
   "Clopidogrel: ≤ 75 anos 300 mg VO de ataque; > 75 anos 75 mg VO sem ataque; manutenção 75 mg/dia.",
   "Anticoagulação (enoxaparina preferida pela ESC): < 75 anos 30 mg EV em bolus e, 15 min depois, 1 mg/kg SC de 12/12 h (máx. 100 mg nas 2 primeiras doses SC); ≥ 75 anos sem bolus, 0,75 mg/kg SC de 12/12 h (máx. 75 mg nas 2 primeiras doses); ClCr < 30 mL/min: 1 mg/kg SC 1x/dia. Manter até a revascularização ou por até 8 dias.",
   "Alternativa: heparina não fracionada 60 UI/kg EV em bolus (máx. 4.000 UI) + 12 UI/kg/h (máx. 1.000 UI/h), com TTPa entre 1,5 e 2 vezes o controle, por 24–48 h.",
   "Após a fibrinólise, transferir todos os pacientes para serviço com hemodinâmica."]},
  {id:"p7",t:"Avaliar a reperfusão",tempo:"60–90 min após o fibrinolítico",itens:[
   "ECG em 60–90 min: sucesso = queda ≥ 50% do supradesnível (na derivação de maior supra ou na soma das derivações).",
   "Outros sinais: alívio da dor, estabilidade hemodinâmica e elétrica.",
   "Vigiar sangramento e rebaixamento neurológico (hemorragia intracraniana: suspender a heparina e fazer TC de crânio)."],
   decisao:{pergunta:"Houve critérios de reperfusão?",opcoes:[{rot:"Sim",ir:"p8"},{rot:"Não, ou reoclusão/instabilidade",ir:"p9"}]}},
  {id:"p8",t:"Estratégia fármaco-invasiva",itens:[
   "Cateterismo entre 2 e 24 h após a fibrinólise bem-sucedida, no serviço de referência.",
   "Manter AAS, clopidogrel e anticoagulação até o cateterismo."],
   decisao:{pergunta:"Transferência combinada.",opcoes:[{rot:"Ver cuidados após a reperfusão",ir:"pfim"}]}},
  {id:"p9",t:"Angioplastia de resgate",itens:[
   "Sem critérios de reperfusão em 60–90 min, dor ou supra recorrente, instabilidade hemodinâmica ou elétrica, ou insuficiência cardíaca: angioplastia de resgate imediata.",
   "Não repetir o fibrinolítico."],
   decisao:{pergunta:"Transferência imediata acionada.",opcoes:[{rot:"Ver cuidados após a reperfusão",ir:"pfim"}]}},
  {id:"ptardio",t:"Apresentação tardia, estável",itens:[
   "Entre 12 e 48 h, assintomático e estável: considerar estratégia de angioplastia (ESC 2023); discutir com a hemodinâmica e transferir.",
   "Após 48 h, assintomático: não há indicação de angioplastia de urgência da artéria ocluída; tratar como SCA e estratificar.",
   "Fibrinólise não está indicada nesse cenário.",
   "AAS, segundo antiagregante e anticoagulação conforme a conduta de SCA."],
   decisao:{pergunta:"Plano definido.",opcoes:[{rot:"Ver cuidados após a reperfusão",ir:"pfim"}]}},
  {id:"psem",t:"Sem supra no ECG",itens:[
   "Repetir o ECG a cada 15–30 min enquanto houver dor e fazer V7–V9 e V3R–V4R.",
   "Troponina de alta sensibilidade no algoritmo 0/1 h ou 0/2 h do serviço.",
   "Instabilidade, dor refratária, insuficiência cardíaca ou arritmia grave: estratégia invasiva imediata (< 2 h), como no infarto com supra.",
   "Demais casos: seguir a conduta de SCA sem supra (botão Conduta)."],
   decisao:{pergunta:"O ECG seriado passou a mostrar supra ou equivalente?",opcoes:[{rot:"Sim",ir:"p2"}]}},
  {id:"pfim",t:"Cuidados após a reperfusão",itens:[
   "Estatina de alta potência: atorvastatina 40–80 mg VO ou rosuvastatina 20–40 mg VO.",
   "Betabloqueador VO nas primeiras 24 h se não houver insuficiência cardíaca, baixo débito, risco de choque (> 70 anos, FC > 110 ou < 60 bpm, PAS < 120 mmHg), PR > 0,24 s, BAV de 2º ou 3º grau ou broncoespasmo ativo. Evitar betabloqueador EV nesses pacientes.",
   "Evitar anti-inflamatório não esteroide.",
   "Ecocardiograma para avaliar a função do VE; iniciar IECA se FE ≤ 40%, insuficiência cardíaca, diabetes ou infarto anterior, desde que PAS ≥ 90 mmHg e sem insuficiência renal aguda."]}
 ],
 fontes:[
  "Rao SV et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes (Circulation 2025;151:e771). https://doi.org/10.1161/CIR.0000000000001309",
  "Byrne RA et al. 2023 ESC Guidelines for the management of acute coronary syndromes (Eur Heart J 2023;44:3720) — tempos de reperfusão, doses de fibrinolíticos (metade da dose de tenecteplase ≥ 75 anos), clopidogrel e enoxaparina com fibrinólise. https://doi.org/10.1093/eurheartj/ehad191",
  "Thygesen K et al. Fourth Universal Definition of Myocardial Infarction (Circulation 2018;138:e618) — critérios de supradesnível de ST.",
  "Bula do tenecteplase (Metalyse) registrada na Anvisa — faixas de peso, bolus único, incompatibilidade com glicose.",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 30, Infarto agudo do miocárdio com supradesnivelamento do segmento ST (critérios de reperfusão, heparina só na hemodinâmica na angioplastia primária, contraindicações ao betabloqueador).",
  "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill — cap. 286, ST-Segment Elevation Myocardial Infarction."
 ]},
/* ---------------------------------------------------------------- AVC isquêmico */
{id:"avc",titulo:"AVC isquêmico agudo",cor:"violet",conduta:"avc",
 passos:[
  {id:"a1",t:"Suspeita de AVC: tempo zero",tempo:"0–10 min",itens:[
   "Registrar o horário do último momento em que o paciente foi visto bem (não o horário em que foi encontrado). Acordou com o déficit: vale a hora em que foi dormir bem.",
   "Glicemia capilar imediata: corrigir se < 60 mg/dL (hipoglicemia imita AVC).",
   "Via aérea e SpO2: oxigênio só se SpO2 ≤ 94%; considerar intubação se Glasgow ≤ 8 ou risco alto de aspiração.",
   "Acionar o código AVC / regulação e o centro de AVC de referência (telemedicina, se houver).",
   "NIHSS na chegada; acesso venoso calibroso; hemograma, coagulograma, eletrólitos, creatinina, troponina e ECG sem atrasar a imagem ou o trombolítico.",
   "Coagulograma antes do trombolítico só é obrigatório se houver uso de anticoagulante, suspeita de coagulopatia ou plaquetopenia."]},
  {id:"a2",t:"Imagem",tempo:"porta-imagem ≤ 20–25 min",itens:[
   "TC de crânio sem contraste (ou RM) urgente.",
   "Angio-TC de crânio e cervical na mesma ida ao tomógrafo se possível candidato a trombectomia (ex.: NIHSS ≥ 6, afasia, negligência, desvio do olhar). Não esperar a creatinina para o contraste.",
   "Perfusão por TC ou RM (difusão-FLAIR) ajuda a selecionar janela estendida e acordou com o déficit, sem atrasar a trombólise dentro de 4,5 h."],
   decisao:{pergunta:"A imagem mostra hemorragia intracraniana?",opcoes:[{rot:"Sim",ir:"ahem"},{rot:"Não",ir:"a3"}]}},
  {id:"a3",t:"Janela de tempo",itens:[
   "Trombólise EV padrão: até 4,5 h do último momento visto bem.",
   "Entre 4,5 e 9 h, ou horário desconhecido/acordou com o déficit: trombólise só com imagem avançada (mismatch em perfusão ou difusão-FLAIR).",
   "Oclusão de grande vaso entre 4,5 e 24 h sem acesso à trombectomia: tenecteplase pode ser considerada com imagem avançada, decisão do neurologista."],
   decisao:{pergunta:"Último momento visto bem há ≤ 4,5 h?",opcoes:[{rot:"Sim",ir:"a4"},{rot:"Não ou desconhecido",ir:"a7"}]}},
  {id:"a4",t:"O déficit é incapacitante?",itens:[
   "Incapacitante: impede atividades básicas ou o trabalho (ex.: hemianopsia completa, afasia, negligência, fraqueza que impede andar ou usar a mão), com qualquer NIHSS.",
   "Não incapacitante (ex.: só sensitivo, disartria leve, fraqueza discreta): a trombólise não é recomendada; preferir dupla antiagregação."],
   decisao:{pergunta:"Déficit incapacitante?",opcoes:[{rot:"Sim",ir:"a5"},{rot:"Não",ir:"a9"}]}},
  {id:"a5",t:"Contraindicações ao trombolítico",itens:[
   "Não fazer: hemorragia na imagem; hipodensidade extensa já estabelecida; neoplasia intracraniana intra-axial; trauma de crânio moderado a grave ou neurocirurgia recentes (3 meses); lesão medular aguda recente; endocardite infecciosa; dissecção de aorta; coagulopatia grave (referência usual: plaquetas < 100.000/mm³, INR > 1,7, TTPa > 40 s ou TP > 15 s).",
   "Pesar risco e benefício (contraindicação relativa na AHA/ASA 2026): anticoagulante oral direto nas últimas 48 h (considerar horário da última dose, função renal e acesso à trombectomia); heparina de baixo peso molecular em dose plena nas últimas 24 h; AVC isquêmico nos últimos 3 meses; hemorragia intracraniana prévia; cirurgia ou trauma grave recentes; sangramento gastrointestinal recente; punção arterial não compressível ou punção lombar recentes; dissecção arterial intracraniana; incapacidade prévia.",
   "Geralmente o benefício supera o risco: sangramento gastrointestinal antigo, infarto prévio, aneurisma intracraniano não roto, dúvida de mimetizador.",
   "Glicemia < 50 ou > 400 mg/dL: corrigir e reavaliar o déficit antes de decidir.",
   "PA ≥ 185/110 mmHg não é contraindicação se baixar com tratamento (próximo passo)."],
   decisao:{pergunta:"Há contraindicação que impeça a trombólise?",opcoes:[{rot:"Sim",ir:"a8"},{rot:"Não",ir:"a6"}]}},
  {id:"a6",t:"Pressão arterial e trombólise",tempo:"porta-agulha ≤ 60 min",itens:[
   "PA < 185/110 mmHg antes de iniciar. Se acima: nitroprussiato EV em bomba, iniciar 0,3–0,5 mcg/kg/min e titular a cada 5 min (máx. 10 mcg/kg/min); alternativas: esmolol 0,5 mg/kg EV em 1 min + 0,05–0,2 mg/kg/min; labetalol e nicardipina (primeira linha da AHA) têm pouca disponibilidade no Brasil. Se a PA não ficar < 185/110, não trombolisar.",
   "Tenecteplase 0,25 mg/kg EV em bolus único (máx. 25 mg).",
   "Ou alteplase 0,9 mg/kg EV (máx. 90 mg): 10% em bolus em 1 min e o restante em 60 min.",
   "Depois: PA ≤ 180/105 mmHg por 24 h; exame neurológico e PA a cada 15 min por 2 h, a cada 30 min por 6 h e a cada hora até 24 h.",
   "Não baixar a PAS para < 140 mmHg de forma intensiva (sem benefício após trombólise; dano após trombectomia).",
   "Sem antiagregante ou anticoagulante nas primeiras 24 h; TC de controle em 24 h antes de iniciá-los.",
   "Piora neurológica, cefaleia intensa, vômitos ou hipertensão aguda: parar a alteplase e fazer TC de crânio urgente. Angioedema de língua ou lábios: parar a infusão e tratar como anafilaxia.",
   "Não atrasar a trombectomia para ver o efeito do trombolítico."]},
  {id:"a8",t:"Trombectomia mecânica",itens:[
   "Oclusão de carótida interna ou M1, 0–6 h: NIHSS ≥ 6, Rankin prévio 0–1 e ASPECTS 3–10 (ASPECTS 0–2 é razoável em < 80 anos; Rankin prévio 2 também é razoável).",
   "6–24 h: < 80 anos, NIHSS ≥ 6, Rankin prévio 0–1, ASPECTS 3–5 sem efeito de massa importante, ou seleção por perfusão.",
   "Basilar até 24 h: NIHSS ≥ 10 e PC-ASPECTS ≥ 6.",
   "Anticoagulante oral não impede a trombectomia.",
   "Até o procedimento: PA ≤ 185/110 mmHg; depois, ≤ 180/105 mmHg por 24 h, sem baixar a PAS para < 140 mmHg."],
   decisao:{pergunta:"Há oclusão de grande vaso elegível para trombectomia?",opcoes:[{rot:"Sim",ir:"a10"},{rot:"Não",ir:"afim"}]}},
  {id:"a7",t:"Janela estendida ou horário desconhecido",itens:[
   "Trombólise entre 4,5 e 9 h (ou acordou com o déficit) só com imagem avançada mostrando tecido recuperável: mismatch em perfusão ou lesão na difusão sem alteração no FLAIR.",
   "Oclusão de grande vaso entre 4,5 e 24 h sem acesso à trombectomia: tenecteplase pode ser considerada com imagem avançada.",
   "Sem imagem avançada: não trombolisar; avaliar trombectomia até 24 h."],
   decisao:{pergunta:"Elegível para trombólise pela imagem avançada?",opcoes:[{rot:"Sim",ir:"a5"},{rot:"Não",ir:"a8"}]}},
  {id:"a9",t:"AVC leve não incapacitante",itens:[
   "NIHSS ≤ 5 não incapacitante ou AIT de alto risco, de causa aterosclerótica presumida, em até 24–72 h: dupla antiagregação após a imagem excluir hemorragia.",
   "Clopidogrel 300–600 mg VO + AAS 160–325 mg VO de ataque; depois clopidogrel 75 mg/dia + AAS 75–100 mg/dia por 21 dias; depois um antiagregante só.",
   "Avaliar trombectomia se houver oclusão de grande vaso com piora."],
   decisao:{pergunta:"Plano definido.",opcoes:[{rot:"Ver cuidados gerais",ir:"afim"}]}},
  {id:"a10",t:"Transferir para trombectomia",itens:[
   "Transferir sem esperar o fim da infusão de alteplase nem o efeito do trombolítico.",
   "Levar as imagens (ou o link) e o horário do último momento visto bem."],
   decisao:{pergunta:"Transferência acionada.",opcoes:[{rot:"Ver cuidados gerais",ir:"afim"}]}},
  {id:"ahem",t:"Hemorragia intracraniana",itens:[
   "Não trombolisar. Acionar a neurocirurgia/regulação.",
   "PAS entre 150 e 220 mmHg: baixar para cerca de 140 mmHg (faixa 130–150) nas primeiras horas, de forma suave; evitar PAS < 130 mmHg.",
   "Reverter anticoagulação conforme o fármaco em uso.",
   "Cabeceira a 30°, glicemia e temperatura controladas."],
   decisao:{pergunta:"Plano definido.",opcoes:[{rot:"Ver cuidados gerais",ir:"afim"}]}},
  {id:"afim",t:"Cuidados gerais",itens:[
   "Sem trombólise ou trombectomia: não baixar a PA, salvo se ≥ 220/120 mmHg (reduzir cerca de 15% nas primeiras 24 h) ou outra condição que exija (dissecção, SCA, edema agudo de pulmão, eclâmpsia).",
   "Glicemia entre 140 e 180 mg/dL; tratar se < 60 mg/dL. Não buscar 80–130 mg/dL com insulina EV.",
   "Tratar febre; corrigir hipotensão e hipovolemia.",
   "Teste de deglutição antes de qualquer coisa por via oral.",
   "Sem trombólise: AAS 160–325 mg VO (ou via sonda) nas primeiras 24–48 h, após a imagem excluir hemorragia.",
   "Profilaxia de trombose venosa com compressão pneumática intermitente se imóvel."]}
 ],
 fontes:[
  "Prabhakaran S et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke — AHA/ASA (Stroke 2026). https://doi.org/10.1161/STR.0000000000000513",
  "Resumo emDocs do guideline 2026 (critérios de trombectomia, PA após reperfusão, dupla antiagregação). https://www.emdocs.net/2026-guideline-update-early-management-of-acute-ischemic-stroke/",
  "University of Illinois Chicago, Drug Information Group. Major pharmacotherapy updates from the 2026 AHA/ASA stroke guidelines (doses de tenecteplase e alteplase, janelas, PA, glicemia). https://dig.pharmacy.uic.edu/faqs/2026-2/april-2026-faqs/update-what-are-major-pharmacotherapy-updates-from-the-2026-aha-asa-stroke-guidelines/",
  "Greenberg SM et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage — AHA/ASA (Stroke 2022;53:e282) — PAS alvo 140 mmHg, evitar < 130.",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 53, Abordagem do paciente com AVC isquêmico agudo (tabela de anti-hipertensivos EV, limiares de coagulação, redução de 15% se ≥ 220/120).",
  "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill — cap. 438, Ischemic Stroke.",
  "Bula do nitroprussiato de sódio (0,3 a 10 mcg/kg/min)."
 ]},
/* ---------------------------------------------------------------- Cetoacidose */
{id:"cad",titulo:"Cetoacidose diabética e estado hiperosmolar",cor:"orange",conduta:"cad",
 passos:[
  {id:"c1",t:"Confirmar e classificar",tempo:"0–30 min",itens:[
   "CAD: glicemia ≥ 200 mg/dL ou diabetes prévio + cetonemia (beta-hidroxibutirato ≥ 3,0 mmol/L ou cetonúria ≥ 2+) + acidose (pH < 7,3 e/ou bicarbonato < 18 mmol/L).",
   "Gravidade da CAD: leve pH 7,25–7,30 ou HCO3 15–18; moderada pH 7,0–7,24 ou HCO3 10–14; grave pH < 7,0 ou HCO3 < 10, beta-hidroxibutirato > 6 ou estupor/coma.",
   "EHH: glicemia ≥ 600 mg/dL + osmolalidade efetiva > 300 mOsm/kg [2 × Na + glicose/18] ou total > 320 + pH ≥ 7,3, HCO3 ≥ 15 e beta-hidroxibutirato < 3,0. Pode haver quadro misto.",
   "CAD euglicêmica (glicemia < 200 mg/dL): pensar em inibidor de SGLT2 (gliflozinas), gestação, jejum.",
   "Exames: gasometria venosa, Na, K, Cl (ânion gap), ureia, creatinina, fósforo, magnésio, cetonemia, hemograma, EAS, ECG; culturas e imagem conforme o foco.",
   "Buscar o desencadeante: infecção, omissão de insulina, diabetes novo, gliflozina, IAM, AVC, pancreatite, álcool, drogas, corticoide."]},
  {id:"c2",t:"Hidratação",tempo:"primeiras 2–4 h",itens:[
   "SF 0,9% ou cristaloide balanceado (Ringer lactato) 500–1.000 mL/h nas primeiras 2–4 h; hipovolemia grave ou choque: 1 L/h e reavaliar.",
   "Idosos, gestantes, insuficiência cardíaca ou renal: bolus menores (ex.: 250–500 mL) e reavaliação frequente.",
   "Depois: repor cerca de 50% do déficit estimado em 8–12 h e o restante em 24–48 h, guiado por PA, FC, diurese e sódio corrigido (+1,6 mmol/L no Na para cada 100 mg/dL de glicose acima de 100).",
   "EHH: a glicemia não deve cair mais que 90–120 mg/dL/h, o sódio não mais que 10 mmol/L em 24 h e a osmolalidade não mais que 3–8 mOsm/kg/h. SF 0,45% só se a osmolalidade não cair apesar de balanço positivo e insulina adequada."]},
  {id:"c3",t:"Potássio antes da insulina",itens:[
   "Garantir diurese (cerca de 0,5 mL/kg/h).",
   "K < 3,5 mmol/L: não iniciar insulina; repor 10 mmol/h (ex.: 1 ampola de KCl 19,1% 10 mL = 25 mEq em 500 mL de SF 0,9% a 200 mL/h) até K > 3,5. Reposição mais rápida exige acesso central e monitor.",
   "K 3,5–5,0 mmol/L: iniciar insulina e acrescentar 20–30 mmol de K por litro de soro (ex.: 1 ampola de KCl 19,1% = 25 mEq por litro) para manter K entre 4 e 5.",
   "K > 5,0 mmol/L: iniciar insulina sem potássio; dosar K a cada 2 h.",
   "Nunca KCl em bolus ou sem diluição."],
   decisao:{pergunta:"Potássio ≥ 3,5 mmol/L?",opcoes:[{rot:"Sim",ir:"c4"},{rot:"Não",ir:"c3b"}]}},
  {id:"c3b",t:"Hipocalemia: adiar a insulina",itens:[
   "Manter KCl 10 mmol/h EV com monitor cardíaco e hidratação.",
   "Dosar K a cada 1–2 h. K ≤ 2,5 mmol/L na CAD triplica a mortalidade."],
   decisao:{pergunta:"K subiu para > 3,5 mmol/L?",opcoes:[{rot:"Sim",ir:"c4"}]}},
  {id:"c4",t:"Insulina",itens:[
   "CAD moderada ou grave, ou EHH misto com cetose: insulina regular EV em bomba, dose fixa de 0,1 U/kg/h. Se a bomba demorar: 0,1 U/kg EV ou IM em bolus.",
   "Preparo (exemplo): insulina regular 50 U em 250 mL de SF 0,9% = 0,2 U/mL; desprezar os primeiros 50 mL pelo equipo (adsorção). Ex.: 70 kg × 0,1 = 7 U/h = 35 mL/h.",
   "CAD leve ou moderada sem complicação, consciente: alternativa com análogo rápido SC 0,1 U/kg em bolus e depois 0,1 U/kg a cada 1 h ou 0,2 U/kg a cada 2 h. Não usar SC na CAD grave, complicada ou no EHH.",
   "EHH sem cetose importante: insulina regular EV 0,05 U/kg/h (alguns aguardam a glicemia parar de cair só com soro antes de iniciar).",
   "Já usa insulina basal: manter a dose habitual. Pode-se associar basal SC 0,15–0,3 U/kg desde o início.",
   "Bicarbonato: só se pH < 7,0 — 100 mmol (100 mL de bicarbonato de sódio 8,4%) em 400 mL de água destilada, repetido a cada 2 h até pH > 7,0.",
   "Fosfato: só se fósforo < 1,0 mmol/L com fraqueza muscular, insuficiência respiratória ou cardíaca."]},
  {id:"c5",t:"Monitorar e ajustar",itens:[
   "Glicemia capilar de hora em hora; eletrólitos, função renal, pH venoso e osmolalidade a cada 2–4 h; K 2 h após iniciar a insulina e depois a cada 4 h.",
   "Glicemia < 250 mg/dL: acrescentar SG 5% ou 10% ao soro e reduzir a insulina para 0,05 U/kg/h (SC: 0,05 U/kg/h ou 0,1 U/kg a cada 2 h). Alvo: CAD 150–200 mg/dL; EHH 200–250 mg/dL até a resolução.",
   "CAD euglicêmica: SG 5–10% junto com o SF desde o início da insulina.",
   "Não suspender a insulina enquanto houver cetose: ajustar a glicose do soro."],
   decisao:{pergunta:"Critérios de resolução atingidos?",opcoes:[{rot:"Sim",ir:"c6"}]}},
  {id:"c6",t:"Resolução e transição para SC",itens:[
   "CAD resolvida: pH venoso > 7,3 ou bicarbonato > 18 mmol/L e cetonemia < 0,6 mmol/L. EHH resolvido: osmolalidade < 300 mOsm/kg, diurese > 0,5 mL/kg/h, glicemia < 250 mg/dL e melhora mental.",
   "Quando conseguir comer: iniciar esquema SC (basal + rápida). Diabetes novo: basal 0,15–0,3 U/kg/dia; já usava insulina: retomar a dose habitual ajustada.",
   "Manter a insulina EV por 1–2 h após a primeira dose de insulina SC.",
   "Suspender gliflozina até a recuperação; educar sobre dias de doença."]}
 ],
 fontes:[
  "Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report — ADA/EASD/JBDS/AACE/DTS (Diabetes Care 2024;47:1257). https://doi.org/10.2337/dci24-0032",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 89, Hiperglicemias (preparo da insulina 50 U/250 mL; KCl 19,1% = 25 mEq por ampola).",
  "Bula do cloreto de potássio injetável (Farmace) registrada na Anvisa — diluição obrigatória; concentração máxima desejável 80 mEq/L; velocidade usual até 10–15 mEq/h.",
  "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill — cap. 416, Diabetes Mellitus: Management and Therapies (tabela 416-9)."
 ]},
/* ---------------------------------------------------------------- Hipercalemia */
{id:"hipercalemia",titulo:"Hipercalemia",cor:"amber",conduta:"hipercalemia",
 passos:[
  {id:"h1",t:"Confirmar e avaliar a gravidade",tempo:"0–10 min",itens:[
   "Doses deste protocolo são para adultos.",
   "Gravidade (UKKA): leve 5,5–5,9 | moderada 6,0–6,4 | grave ≥ 6,5 mmol/L (= mEq/L).",
   "ECG de 12 derivações urgente se K ≥ 6,0 mmol/L. Monitor contínuo se K ≥ 6,5, se houver alteração no ECG, ou com K 6,0–6,4 em paciente instável.",
   "Alterações que indicam gravidade: T apiculada, PR longo, P achatada ou ausente, QRS alargado, bradicardia (FC < 50), ritmo juncional, onda sinusoidal, FV ou assistolia. ECG normal não exclui hipercalemia grave.",
   "Dosar o K na gasometria (arterial ou venosa) enquanto sai o laboratório.",
   "Suspeita de pseudo-hipercalemia (hemólise, trombocitose, leucocitose, garrote prolongado): repetir a coleta, mas não atrasar o cálcio se o ECG estiver alterado.",
   "Suspender o que eleva o K: suplementos de K, IECA/BRA, espironolactona, AINE, sulfametoxazol-trimetoprima, heparina, betabloqueador não seletivo.",
   "Parada cardíaca com suspeita de hipercalemia: cloreto de cálcio 10% 10 mL EV em bolus, insulina 10 UI + 25 g de glicose EV e considerar bicarbonato de sódio, junto com a RCP."],
   decisao:{pergunta:"Qual o cenário?",opcoes:[{rot:"ECG alterado (qualquer K ≥ 5,5)",ir:"h2"},{rot:"K ≥ 6,5 sem alteração no ECG",ir:"h3"},{rot:"K 6,0–6,4 sem alteração no ECG",ir:"hmod"},{rot:"K 5,5–5,9 sem alteração no ECG",ir:"hleve"}]}},
  {id:"h2",t:"Proteger o coração: cálcio EV",tempo:"age em até 3 min",itens:[
   "Gluconato de cálcio 10% 30 mL EV em 10 min (6,8 mmol de cálcio), com monitor.",
   "Na parada ou peri-parada: cloreto de cálcio 10% 10 mL EV em 5 min (cerca de 3 vezes mais cálcio por mL que o gluconato; de preferência acesso central, risco de necrose se extravasar).",
   "Não passar de 5 mL/min de gluconato 10% (bula). Teto diário do gluconato de cálcio no adulto: 15 g (150 mL a 10%).",
   "Em uso de digoxina: cálcio com extrema cautela; se necessário, 10 mL de gluconato 10% em 100 mL de SG 5% em 20–30 min.",
   "Não correr na mesma via do bicarbonato (precipita).",
   "O cálcio não baixa o K e dura só 30–60 min: seguir logo para a redistribuição.",
   "Repetir o ECG 5–10 min após o cálcio."],
   decisao:{pergunta:"O ECG melhorou?",opcoes:[{rot:"Sim",ir:"h3"},{rot:"Não, ou voltou a piorar",ir:"h2b"}]}},
  {id:"h2b",t:"ECG ainda alterado",itens:[
   "Repetir o gluconato de cálcio 10% 30 mL EV em 10 min (ou o cloreto de cálcio 10% 10 mL), respeitando o teto de 15 g/dia de gluconato.",
   "Iniciar em paralelo a insulina-glicose (próximo passo) e chamar nefrologia ou UTI.",
   "Bradicardia com insuficiência renal, bloqueador do nó AV e choque: pensar em síndrome BRASH (tratar o conjunto, não só o K)."],
   decisao:{pergunta:"Cálcio repetido.",opcoes:[{rot:"Deslocar o K para dentro da célula",ir:"h3"}]}},
  {id:"h3",t:"Deslocar o K para dentro da célula",tempo:"início 10–20 min",itens:[
   "Insulina regular 10 UI EV + 25 g de glicose EV em 15 min (50 mL de SG 50% ou 250 mL de SG 10%). Pico em 30–60 min, dura 4–6 h; baixa o K em cerca de 0,6–1,2 mmol/L.",
   "Glicemia antes do tratamento < 126 mg/dL (7,0 mmol/L): depois da insulina-glicose, SG 10% a 50 mL/h por 5 h.",
   "Glicemia ≥ 200–250 mg/dL (Harrison): insulina sem a glicose, com glicemia próxima. Nunca glicose hipertônica sem insulina (piora o K pelo efeito osmótico).",
   "Glicemia capilar em 0, 30, 60, 90, 120, 180, 240, 300 e 360 min (hipoglicemia é comum e tardia).",
   "Insulina é medicamento potencialmente perigoso: conferir UI e via (dupla checagem).",
   "Associar salbutamol nebulizado 10–20 mg (em cerca de 4 mL de SF 0,9%, em 10 min); início em 30 min, pico em 90 min. Nunca como terapia única. Cautela em coronariopata; betabloqueador reduz a resposta.",
   "Bicarbonato de sódio não é de rotina: considerar só com acidose metabólica (50–100 mEq EV em 1–2 h), em via separada do cálcio."]},
  {id:"h4",t:"Remover o K do corpo",itens:[
   "Ciclossilicato de zircônio sódico 10 g VO 3 vezes ao dia (bula Anvisa: até 48 h; UKKA: até 72 h), se disponível.",
   "Poliestirenossulfonato de cálcio (Sorcal) 15–30 g VO: início lento (2–6 h), pouco útil no agudo; a UKKA não recomenda mais de rotina.",
   "Furosemida 40 mg EV se a função renal permitir e o paciente não estiver hipovolêmico; nunca como terapia única.",
   "Tratar a causa: hipovolemia, obstrução urinária, rabdomiólise, fármacos."],
   decisao:{pergunta:"Há indicação de diálise: hipercalemia refratária, oligúria ou anúria, doença renal avançada, paciente em hemodiálise ou lesão tecidual extensa?",opcoes:[{rot:"Sim",ir:"hdial"},{rot:"Não",ir:"hfim"}]}},
  {id:"hmod",t:"Hipercalemia moderada sem alteração no ECG",itens:[
   "Tratar mesmo sem alteração no ECG; manter monitor se instável.",
   "Insulina regular 10 UI + 25 g de glicose EV (sugerido pela UKKA), com o mesmo controle de glicemia do passo de redistribuição.",
   "Salbutamol nebulizado 10–20 mg pode ser associado (nunca isolado).",
   "Considerar ciclossilicato de zircônio sódico.",
   "Se surgir alteração no ECG: cálcio EV imediato."],
   decisao:{pergunta:"Medidas iniciadas.",opcoes:[{rot:"Remover o K do corpo",ir:"h4"},{rot:"Surgiu alteração no ECG",ir:"h2"}]}},
  {id:"hleve",t:"Hipercalemia leve",itens:[
   "Sem tratamento de emergência: revisar a causa, medicações e dieta; repetir o K.",
   "Em uso de IECA/BRA: em geral controlar o K com outras medidas antes de reduzir ou suspender o bloqueio do sistema renina-angiotensina (KDIGO 2024).",
   "Fazer ECG se houver dúvida, doença renal ou subida rápida esperada."],
   decisao:{pergunta:"Plano definido.",opcoes:[{rot:"Ver monitorização",ir:"hfim"}]}},
  {id:"hdial",t:"Diálise",itens:[
   "Acionar a nefrologia ou a regulação para diálise de urgência; no paciente em hemodiálise, é o tratamento de escolha.",
   "Manter cálcio (se ECG alterado), insulina-glicose e salbutamol enquanto aguarda: o efeito é temporário.",
   "Transferir com monitor e acesso venoso."],
   decisao:{pergunta:"Diálise acionada.",opcoes:[{rot:"Ver monitorização",ir:"hfim"}]}},
  {id:"hfim",t:"Monitorar e prevenir a recorrência",itens:[
   "K em 1, 2, 4, 6 e 24 h após o tratamento da hipercalemia moderada ou grave (rebote quando passa o efeito da insulina e do salbutamol).",
   "Glicemia até 6 h após a insulina-glicose (hipoglicemia tardia).",
   "Monitor contínuo e ECG seriado enquanto K ≥ 6,0 ou houver alteração no ECG.",
   "Função renal, gasometria, diurese e CPK se suspeita de rabdomiólise.",
   "Antes da alta ou da reintrodução: revisar medicações e dieta; reintroduzir IECA/BRA com K e creatinina de controle."]}
 ],
 fontes:[
  "UK Kidney Association. Clinical Practice Guideline: Treatment of Acute Hyperkalaemia in Adults, out/2023 (classificação, cálcio 30 mL de gluconato 10% ou 10 mL de cloreto 10%, insulina 10 UI + 25 g de glicose, SG 10% 50 mL/h por 5 h se glicemia < 7 mmol/L, salbutamol 10–20 mg, monitorização de K e glicemia, diálise, parada cardíaca). https://www.ukkidney.org/health-professionals/guidelines/treatment-acute-hyperkalaemia-adults",
  "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD (Kidney Int 2024;105(4S):S117) — ponto de prática 3.6.3 (manter IECA/BRA).",
  "Bula profissional Anvisa do gliconato de cálcio 100 mg/mL (Fresenius Kabi) — velocidade máxima 5 mL/min, limite diário 15 g; bula Anvisa do Lokelma (ciclossilicato de zircônio sódico).",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 84, Hipercalemia (ECG, furosemida, bicarbonato só com acidose, poliestirenossulfonato).",
  "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed. McGraw Hill — cap. 56, Fluid and Electrolyte Disturbances (hipercalemia: digoxina, insulina sem glicose na hiperglicemia, salbutamol).",
  "ISMP Brasil. Medicamentos potencialmente perigosos de uso hospitalar, 2019."
 ]},
/* ---------------------------------------------------------------- Anafilaxia */
{id:"anafilaxia",titulo:"Anafilaxia",cor:"pink",conduta:"anafilaxia",
 passos:[
  {id:"n1",t:"Reconhecer",tempo:"0–1 min",itens:[
   "Anafilaxia é muito provável (WAO 2020) se: início agudo (minutos a horas) com pele ou mucosa (urticária, prurido, rubor, edema de lábios, língua ou úvula) + pelo menos um: comprometimento respiratório, hipotensão ou disfunção de órgão (síncope, hipotonia, incontinência) ou sintomas gastrointestinais graves; ou",
   "Após exposição a alérgeno conhecido ou muito provável, hipotensão, broncoespasmo ou acometimento de laringe, mesmo sem pele ou mucosa. Hipotensão: adulto PAS < 90 mmHg ou queda > 30% da basal; criança, PAS baixa para a idade ou queda > 30%.",
   "Retirar o gatilho: parar infusão de fármaco, contraste, sangue ou coloide suspeito.",
   "Pedir ajuda, monitor, oximetria, PA a cada 5 min. Preparar a via aérea: considerar via aérea difícil (intubação pelo mais experiente, com plano para via aérea cirúrgica).",
   "Fatores de gravidade: asma, betabloqueador, IECA, doença cardiovascular, mastocitose, atraso na adrenalina."],
   decisao:{pergunta:"Há critérios de anafilaxia (comprometimento de via aérea, respiração ou circulação)?",opcoes:[{rot:"Sim",ir:"n2"},{rot:"Não: reação alérgica só de pele ou mucosa",ir:"nleve"}]}},
  {id:"n2",t:"Adrenalina IM agora",tempo:"sem atraso",itens:[
   "Adrenalina 1 mg/mL (1:1.000) IM no vasto lateral da coxa (terço médio, face anterolateral).",
   "Dose: 0,01 mg/kg (0,01 mL/kg), com teto de 0,5 mg (0,5 mL) no adulto e 0,3 mg (0,3 mL) na criança.",
   "Por idade (RCUK 2021): adulto e > 12 anos 0,5 mg (0,5 mL); 6–12 anos 0,3 mg (0,3 mL; também no adolescente pequeno ou pré-púbere); 6 meses–6 anos 0,15 mg (0,15 mL); < 6 meses 0,1–0,15 mg (0,1–0,15 mL).",
   "Não usar a via subcutânea nem inalatória como tratamento principal (menos eficazes). Não substituir por anti-histamínico ou corticoide.",
   "Não há contraindicação absoluta à adrenalina na anafilaxia (inclusive idoso, cardiopata e gestante).",
   "Posição: deitado com as pernas elevadas; sentado se a falta de ar piorar deitado; gestante em decúbito lateral esquerdo. Não levantar nem sentar bruscamente (risco de parada por baixo retorno venoso).",
   "O2 em alto fluxo (máscara com reservatório 10–15 L/min) e depois ajustar para SpO2 94–98%.",
   "Acesso venoso calibroso (ou intraósseo)."]},
  {id:"n3",t:"Volume e reavaliação",tempo:"5 min após a adrenalina",itens:[
   "Hipotensão ou resposta ruim: cristaloide sem glicose (SF 0,9% ou Ringer lactato) em bolus rápido, adulto 500–1.000 mL, criança 10–20 mL/kg; repetir conforme a resposta (adulto pode precisar de 3–5 L).",
   "Não usar coloide (pode ser o próprio gatilho).",
   "Reavaliar via aérea, respiração, circulação e consciência em 5 min (pico da adrenalina IM em 5–10 min).",
   "Palidez e taquicardia com PA normal ou alta podem ser efeito da adrenalina, não anafilaxia persistente."],
   decisao:{pergunta:"Melhorou após a 1ª dose?",opcoes:[{rot:"Sim, resolvido",ir:"nobs"},{rot:"Não, persistem sintomas respiratórios ou circulatórios",ir:"n4"}]}},
  {id:"n4",t:"Segunda dose de adrenalina IM",itens:[
   "Repetir a mesma dose IM de adrenalina 5 min após a anterior (WAO: a cada 5–15 min), de preferência na outra coxa.",
   "Mais volume se houver hipotensão.",
   "Broncoespasmo: salbutamol inalatório ou nebulizado como adjuvante (adulto 5 mg nebulizado) e ipratrópio 500 mcg nebulizado; nunca no lugar da adrenalina.",
   "Estridor: adrenalina nebulizada 5 mL de 1 mg/mL como adjuvante, sem atrasar a adrenalina IM ou a intubação.",
   "Pedir ajuda experiente (UTI, anestesia) e preparar a infusão de adrenalina."],
   decisao:{pergunta:"Persistem sintomas respiratórios ou circulatórios após 2 doses IM?",opcoes:[{rot:"Sim: anafilaxia refratária",ir:"n5"},{rot:"Não, resolvido",ir:"nobs"}]}},
  {id:"n5",t:"Anafilaxia refratária: adrenalina EV em infusão",tempo:"após 2 doses IM",itens:[
   "Preparo: adrenalina 1 mg (1 mL de 1 mg/mL) em 100 mL de SF 0,9% = 10 mcg/mL. Bomba de infusão em via exclusiva; pode ser veia periférica ou intraóssea até obter acesso central. Não medir a PA no mesmo braço.",
   "Iniciar 0,5 mL/kg/h (cerca de 0,1 mcg/kg/min) na gravidade moderada; 1 mL/kg/h se hipotensão ou hipóxia. Ex.: 70 kg = 35–70 mL/h.",
   "Titular pela resposta até a menor dose eficaz; o equilíbrio vem 5–10 min após cada ajuste. Sem teto fixo: o limite é a toxicidade (taquicardia, arritmia, hipertensão, dor torácica); nesses casos reduzir ou parar.",
   "Monitor contínuo (ECG, SpO2, PA pelo menos a cada 5 min).",
   "Continuar a adrenalina IM a cada 5 min até a infusão começar.",
   "Bolus EV de adrenalina não é recomendado fora da parada, salvo por quem tem prática com vasopressor, enquanto a infusão é montada: 50 mcg EV (0,5 mL de 1 mg diluído em 10 mL = 100 mcg/mL). Nunca injetar a ampola de 1 mg/mL sem diluir na veia.",
   "Manter volume (cristaloide sem glicose).",
   "Desmame: com a melhora, reduzir para cerca de 50% da taxa inicial; 1 h após resolver tudo, reduzir em 30 min e parar, vigiando recorrência."],
   decisao:{pergunta:"Houve resposta à infusão de adrenalina?",opcoes:[{rot:"Sim",ir:"nobs"},{rot:"Não",ir:"n6"}]}},
  {id:"n6",t:"Refratária à infusão de adrenalina",itens:[
   "Acesso central e UTI. Segundo vasopressor conforme protocolo local: noradrenalina 0,05–0,5 mcg/kg/min EV, ou vasopressina (RCUK: bolus EV de 2 U, repetir se preciso, e considerar infusão).",
   "Em uso de betabloqueador: glucagon 1 mg EV (criança 20–30 mcg/kg, máx. 1 mg), repetir a cada 5 min ou infusão de 1–2 mg/h no adulto. Vigiar vômito (proteger via aérea), hiperglicemia, hipocalemia.",
   "Hidrocortisona 200 mg EV no adulto (criança 4 mg/kg EV, máx. 200 mg), só depois da reanimação inicial; nunca no lugar da adrenalina.",
   "Bradicardia grave persistente apesar do volume: atropina 0,5 mg EV no adulto (RCUK), repetir se preciso até o teto de 3 mg (AHA); criança 10–20 mcg/kg EV (RCUK).",
   "Sulfato de magnésio não é broncodilatador de primeira linha aqui (vasodilata e piora a hipotensão).",
   "Parada cardíaca: RCP e adrenalina conforme o ACLS; considerar reanimação prolongada."],
   decisao:{pergunta:"Paciente em UTI ou transferência acionada.",opcoes:[{rot:"Ver observação e cuidados",ir:"nobs"}]}},
  {id:"nleve",t:"Reação alérgica sem anafilaxia",itens:[
   "Urticária ou angioedema sem comprometimento de via aérea, respiração, circulação ou gastrointestinal grave.",
   "Anti-histamínico H1 não sedativo VO: cetirizina 10 mg VO (RCUK: 10–20 mg no adulto; 6–11 anos 5–10 mg; 2–6 anos 2,5–5 mg).",
   "Angioedema sem urticária, sobretudo com IECA ou história familiar: pensar em angioedema por bradicinina (não responde a adrenalina, anti-histamínico ou corticoide).",
   "Observar: se surgir rouquidão, estridor, sibilância, hipotensão, síncope ou vômitos repetidos, é anafilaxia: adrenalina IM."],
   decisao:{pergunta:"A reação progrediu para anafilaxia?",opcoes:[{rot:"Sim",ir:"n2"},{rot:"Não",ir:"nfim"}]}},
  {id:"nobs",t:"Depois da resposta: adjuvantes e observação",itens:[
   "Anti-histamínico só para sintomas de pele, depois de estabilizado: cetirizina 10 mg VO (adulto até 20 mg). Sem VO: prometazina 25–50 mg IM profunda (teto 100 mg/dia; contraindicada em < 2 anos); evitar EV (hipotensão, lesão tecidual).",
   "Corticoide não é rotina (não previne reação bifásica). Considerar se asma ou broncoespasmo persistente, ou reação refratária: hidrocortisona 200 mg EV ou metilprednisolona 1–2 mg/kg EV (máx. 125 mg).",
   "Triptase sérica: 1ª amostra assim que possível sem atrasar o tratamento; 2ª em 1–2 h (no máximo 4 h) do início; útil para confirmar depois, não para decidir agora.",
   "Observação após resolução (RCUK 2021): alta rápida após 2 h se boa resposta em 5–10 min a uma dose dada até 30 min do início, resolução completa, já tem adrenalina autoinjetável e sabe usar, e terá supervisão.",
   "Mínimo 6 h após a resolução se precisou de 2 doses IM ou teve reação bifásica prévia.",
   "Pelo menos 12 h após a resolução se: reação grave com > 2 doses de adrenalina, asma grave ou comprometimento respiratório grave, possível absorção continuada do alérgeno (ex.: medicamento de liberação lenta), chegada à noite, dificuldade de acesso a emergência.",
   "Refratária ou com infusão de adrenalina: internar em UTI.",
   "Antes da alta: oferecer alimento, levantar e checar tontura ou hipotensão postural."]},
  {id:"nfim",t:"Alta e prevenção",itens:[
   "Orientar sinais de retorno imediato (reação bifásica em cerca de 5%, mediana perto de 12 h).",
   "Evitar o gatilho suspeito; registrar a alergia no prontuário e entregar por escrito.",
   "Prescrever adrenalina autoinjetável (caneta 0,15 mg ou 0,3 mg, conforme o peso) com plano de ação escrito e treino; no Brasil a disponibilidade é limitada (em geral importada).",
   "Encaminhar ao alergista (investigar o gatilho, triptase basal).",
   "Revisar betabloqueador e IECA com o médico assistente."]}
 ],
 fontes:[
  "Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020;13:100472) — critérios diagnósticos, adrenalina IM 0,01 mg/kg (máx. 0,5 mg adulto; 0,3 mg criança) a cada 5–15 min, posição, 20 mL/kg de cristaloide, glucagon no betabloqueado, papel limitado de anti-histamínico e corticoide. https://doi.org/10.1016/j.waojou.2020.100472",
  "Resuscitation Council UK. Emergency treatment of anaphylaxis: guidelines for healthcare providers, maio 2021 — doses IM por idade, repetição em 5 min, definição de refratária, infusão periférica de adrenalina 1 mg/100 mL a 0,5–1 mL/kg/h e desmame, volume, doses do apêndice 3 (glucagon, hidrocortisona, atropina, salbutamol, ipratrópio, vasopressina, noradrenalina), triptase, observação estratificada 2/6/12 h. https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis",
  "Golden DBK et al. Anaphylaxis: a 2023 practice parameter update (Ann Allergy Asthma Immunol 2024;132:124) — observação individualizada pela gravidade, adrenalina autoinjetável e plano de ação. https://pubmed.ncbi.nlm.nih.gov/38108678/",
  "Shaker MS et al. Anaphylaxis — a 2020 practice parameter update, systematic review, and GRADE analysis (J Allergy Clin Immunol 2020;145:1082) — corticoide e anti-histamínico não previnem reação bifásica.",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 11, Anafilaxia e outras alergias (critérios, via aérea difícil, gestante em decúbito lateral esquerdo, fatores de gravidade, tabela de tratamento, metilprednisolona 1–2 mg/kg até 125 mg).",
  "Bula do Fenergan (cloridrato de prometazina) injetável, Sanofi, registrada na Anvisa — 25–50 mg IM profunda, não exceder 100 mg/dia; contraindicado em menores de 2 anos.",
  "American Heart Association. 2025 Guidelines for CPR and ECC — Adult Advanced Life Support (atropina na bradicardia, teto de 3 mg)."
 ]},
/* ---------------------------------------------------------------- Crise hipertensiva */
{id:"crise-hipertensiva",titulo:"Crise hipertensiva",cor:"indigo",conduta:"has",
 passos:[
  {id:"x1",t:"Medir e procurar lesão de órgão-alvo",tempo:"0–15 min",itens:[
   "Medir a PA nos dois braços, em ambiente calmo, e repetir. PA ≥ 180/110 mmHg é o parâmetro de conduta, mas o que define a emergência é a lesão aguda de órgão-alvo, não o número.",
   "Perguntar: PA habitual, adesão, suspensão de clonidina ou betabloqueador, AINE, corticoide, simpaticomiméticos, cocaína ou anfetamina, álcool; gestação ou puerpério.",
   "Procurar: dor torácica ou dorsal, dispneia e estertores, déficit focal, confusão, convulsão, cefaleia com vômitos, alteração visual, oligúria, assimetria de pulso ou PA, fundo de olho (hemorragia, exsudato, papiledema).",
   "Exames se suspeita de emergência: ECG, troponina, creatinina, eletrólitos, EAS, hemograma com plaquetas, marcadores de hemólise (LDH, bilirrubina, haptoglobina, esquizócitos); radiografia de tórax, TC de crânio ou angio-TC de aorta conforme o quadro.",
   "Pseudocrise: PA alta por dor, ansiedade, pânico, enxaqueca ou vertigem, sem lesão de órgão: tratar a causa (analgésico, ansiolítico), não a PA."],
   decisao:{pergunta:"Há lesão aguda de órgão-alvo?",opcoes:[{rot:"Sim: emergência hipertensiva",ir:"x3"},{rot:"Não",ir:"x2"},{rot:"Gestante ≥ 20 semanas ou puérpera",ir:"xpe"}]}},
  {id:"x2",t:"Elevação importante da PA sem lesão de órgão-alvo",tempo:"observar 30 min",itens:[
   "Antes chamada urgência hipertensiva (DBHA 2025). Não precisa de redução rápida nem de tratamento na emergência.",
   "Primeira medida: observação por 30 min em ambiente calmo, tratando dor e ansiedade; remedir.",
   "Não baixar a PA mais que 25–30% nas primeiras 2–4 h. Nifedipino de liberação rápida (cápsula, sublingual ou VO) é proscrito."],
   decisao:{pergunta:"A PA continua ≥ 180/110 mmHg ou os sintomas persistem após 30 min?",opcoes:[{rot:"Sim",ir:"x2b"},{rot:"Não",ir:"xfim"}]}},
  {id:"x2b",t:"Anti-hipertensivo oral",itens:[
   "Captopril 25–50 mg VO, dose única (não sublingual); reavaliar a PA em 1 h.",
   "Ou clonidina 0,1–0,2 mg VO, dose única; reavaliar em 1 h (evitar se bradicardia ou BAV).",
   "Ajustar ou reintroduzir os anti-hipertensivos de uso contínuo; em quem suspendeu clonidina ou betabloqueador, reintroduzir o fármaco.",
   "Meta: redução gradual em 24–48 h, não normalizar no pronto-socorro."],
   decisao:{pergunta:"Medicação oral feita.",opcoes:[{rot:"Ver alta e seguimento",ir:"xfim"}]}},
  {id:"x3",t:"Emergência hipertensiva: medidas gerais",tempo:"minutos a horas",itens:[
   "Leito monitorado (idealmente UTI), acesso venoso, monitor, PA a cada 5–15 min durante a titulação (PA invasiva se disponível).",
   "Fármaco EV de ação curta e titulável, em bomba de infusão.",
   "Meta geral (DBHA 2025): reduzir a PA em até 25% na 1ª hora; se estável, até 160/100 mmHg nas 2–6 h seguintes; níveis normais em 24–48 h.",
   "Exceções com metas próprias: dissecção de aorta, AVC, edema agudo de pulmão, SCA, crise adrenérgica, pré-eclâmpsia e eclâmpsia.",
   "Queda rápida e excessiva causa isquemia cerebral, coronariana ou renal (perda da autorregulação)."],
   decisao:{pergunta:"Qual a lesão de órgão-alvo?",opcoes:[{rot:"Dissecção aguda de aorta",ir:"xdis"},{rot:"Edema agudo de pulmão",ir:"xeap"},{rot:"Síndrome coronariana aguda",ir:"xsca"},{rot:"AVC isquêmico",ir:"xavci"},{rot:"AVC hemorrágico",ir:"xavch"},{rot:"Encefalopatia, hipertensão maligna ou lesão renal",ir:"xenc"},{rot:"Crise adrenérgica (cocaína, feocromocitoma)",ir:"xadr"},{rot:"Pré-eclâmpsia ou eclâmpsia",ir:"xpe"}]}},
  {id:"xdis",t:"Dissecção aguda de aorta",tempo:"meta em 20 min",itens:[
   "Meta: FC < 60 bpm e PAS entre 100 e 120 mmHg (DBHA 2025: 90–120) em até 20 min, ou o menor valor tolerado.",
   "Analgesia com opioide EV titulado (a dor mantém a taquicardia e a hipertensão).",
   "Primeiro o betabloqueador EV: esmolol ou metoprolol (doses no passo dos fármacos). Asma ou contraindicação a betabloqueador: bloqueador de canal de cálcio não di-hidropiridínico (diltiazem, verapamil).",
   "Só depois do betabloqueio, se a PAS continuar > 120 mmHg: nitroprussiato. Vasodilatador sem betabloqueador aumenta a FC e a força de ejeção e piora a dissecção. Não usar hidralazina isolada.",
   "Angio-TC de aorta (ou ecocardiograma transesofágico) e contato imediato com cirurgia cardiovascular: tipo A (aorta ascendente) é cirurgia de emergência.",
   "Hipotensão na dissecção: pensar em tamponamento, ruptura ou insuficiência aórtica aguda; não usar vasodilatador."],
   decisao:{pergunta:"Tratamento iniciado.",opcoes:[{rot:"Ver doses dos fármacos EV",ir:"xdrog"},{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xeap",t:"Edema agudo de pulmão hipertensivo",itens:[
   "Sentar o paciente; O2 se SpO2 < 90%; ventilação não invasiva (CPAP ou BiPAP) precoce se desconforto respiratório.",
   "Nitroglicerina EV é a escolha (DBHA 2025), se não houver hipotensão, infarto de VD ou inibidor da fosfodiesterase-5 nas 48 h anteriores. Nitroprussiato é alternativa se a PA não controlar.",
   "Meta: PAS < 140 mmHg na 1ª hora (DBHA 2025).",
   "Furosemida EV se congestão: sem uso prévio 20–40 mg EV; em uso crônico, 1–2 vezes a dose oral diária, EV.",
   "Buscar SCA (ECG, troponina) e outras causas."],
   decisao:{pergunta:"Tratamento iniciado.",opcoes:[{rot:"Ver doses dos fármacos EV",ir:"xdrog"},{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xsca",t:"Síndrome coronariana aguda com PA elevada",itens:[
   "Meta: PAS < 140 mmHg, evitando < 120 mmHg, e PAD 70–80 mmHg (DBHA 2025).",
   "Nitroglicerina EV e betabloqueador (esmolol ou metoprolol), se não houver insuficiência cardíaca, baixo débito, bradicardia, BAV ou broncoespasmo.",
   "Não usar hidralazina, nifedipino nem nitroprussiato na SCA (DBHA 2025).",
   "Seguir o protocolo de IAM com supra ou a conduta de SCA; PAS > 180 ou PAD > 110 mmHg é contraindicação relativa à fibrinólise: controlar antes."],
   decisao:{pergunta:"Tratamento iniciado.",opcoes:[{rot:"Ver doses dos fármacos EV",ir:"xdrog"},{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xavci",t:"AVC isquêmico",itens:[
   "Candidato a trombólise ou trombectomia: baixar para < 185/110 mmHg antes e manter ≤ 180/105 mmHg nas 24 h seguintes. Se não ficar < 185/110, não trombolisar.",
   "Sem reperfusão: não baixar a PA, salvo se ≥ 220/120 mmHg; nesse caso, reduzir cerca de 15% nas primeiras 24 h.",
   "PA ≥ 220/120 mmHg com dissecção de aorta, SCA, eclâmpsia ou edema agudo de pulmão associados: redução inicial de 15% (DBHA 2025).",
   "Fármacos: nitroprussiato ou esmolol EV (labetalol e nicardipina, primeira linha da AHA, têm pouca disponibilidade no Brasil).",
   "Seguir o protocolo de AVC isquêmico."],
   decisao:{pergunta:"Tratamento iniciado.",opcoes:[{rot:"Ver doses dos fármacos EV",ir:"xdrog"},{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xavch",t:"AVC hemorrágico",itens:[
   "PAS entre 150 e 220 mmHg (gravidade leve a moderada): baixar para cerca de 140 mmHg (faixa 130–150) de forma suave, com infusão EV; evitar PAS < 130 mmHg (AHA 2022).",
   "PAS > 220 mmHg: redução com infusão EV contínua e monitoração frequente, meta inicial PAS < 180 mmHg (DBHA 2025).",
   "Hemorragia subaracnóidea com PAS > 180 mmHg: redução gradual em 24–72 h (DBHA 2025).",
   "Fármacos: esmolol ou nitroprussiato EV (nicardipina e clevidipina têm pouca disponibilidade no Brasil). Reverter anticoagulação e acionar a neurocirurgia."],
   decisao:{pergunta:"Tratamento iniciado.",opcoes:[{rot:"Ver doses dos fármacos EV",ir:"xdrog"},{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xenc",t:"Encefalopatia hipertensiva, hipertensão maligna ou lesão renal aguda",itens:[
   "Encefalopatia: cefaleia, vômitos, alteração visual, confusão, convulsão, sem déficit focal (se houver déficit, TC ou RM para excluir AVC).",
   "Meta: reduzir a PA em 20–25% na 1ª hora (DBHA 2025), sem quedas bruscas; alvo de 160/100 mmHg em até 48 h. O Posicionamento 2020 é mais cauteloso: PAM 10–15% na 1ª hora e não mais que 25% no 1º dia.",
   "Fármacos EV: nitroprussiato ou esmolol (nitroglicerina e nitroprussiato podem reduzir o fluxo cerebral: titular com cautela).",
   "Hipertensão acelerada-maligna (retinopatia com hemorragias, exsudatos ou papiledema, com ou sem lesão renal): internar, vasodilatador EV (nitroprussiato) e depois orais, incluindo IECA ou BRA.",
   "Microangiopatia trombótica (anemia hemolítica com esquizócitos e plaquetopenia): discutir com nefrologia e hematologia."],
   decisao:{pergunta:"Tratamento iniciado.",opcoes:[{rot:"Ver doses dos fármacos EV",ir:"xdrog"},{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xadr",t:"Crise adrenérgica",itens:[
   "Causas: cocaína, anfetamina, ecstasy, suspensão abrupta de clonidina ou betabloqueador, feocromocitoma.",
   "Meta: PAS < 140 mmHg na 1ª hora (DBHA 2025).",
   "Casos leves: benzodiazepínico EV titulado (orientação do CIATox, 0800 722 6001) e nitrato sublingual. Demais: nitroglicerina ou nitroprussiato EV.",
   "Não usar betabloqueador isolado (estímulo alfa sem oposição piora a hipertensão e o espasmo coronariano). No feocromocitoma, betabloqueador só depois do bloqueio alfa (doxazosina VO; fentolamina não está disponível no Brasil).",
   "Suspensão de clonidina ou betabloqueador: reintroduzir o fármaco."],
   decisao:{pergunta:"Tratamento iniciado.",opcoes:[{rot:"Ver doses dos fármacos EV",ir:"xdrog"},{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xpe",t:"Gestante ou puérpera",itens:[
   "PA ≥ 160/110 mmHg persistente por 15 min na gestação (≥ 20 semanas) ou no puerpério é emergência obstétrica: tratar em até 30–60 min (ACOG).",
   "Seguir o protocolo de pré-eclâmpsia (hidralazina EV ou nifedipino VO de liberação imediata, sulfato de magnésio).",
   "Nitroprussiato na gestação só em situação excepcional (edema agudo de pulmão, hipertensão refratária) e por no máximo 4 h (cianeto no feto).",
   "IECA, BRA e atenolol são contraindicados na gestação."],
   decisao:{pergunta:"Conduta obstétrica.",opcoes:[{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xdrog",t:"Fármacos EV: preparo e doses",itens:[
   "Nitroprussiato de sódio: 50 mg em SG 5% até 250 mL (200 mcg/mL), frasco e equipo protegidos da luz. Iniciar 0,3–0,5 mcg/kg/min, aumentar 0,5 mcg/kg/min a cada 5 min; usual até 3 mcg/kg/min; teto 10 mcg/kg/min por no máximo 10 min. Ex.: 70 kg a 0,5 mcg/kg/min = 10,5 mL/h. Risco de cianeto em dose alta, uso prolongado ou insuficiência renal ou hepática. Evitar na SCA.",
   "Nitroglicerina: 50 mg (10 mL) + 240 mL de SG 5% = 200 mcg/mL (frasco de vidro ou equipo próprio). Iniciar 5 mcg/min (1,5 mL/h), aumentar 5 mcg/min a cada 3–5 min até 20 mcg/min, depois 10–20 mcg/min por vez. Teto usual 200 mcg/min (edema agudo de pulmão, ESC 2021). Contraindicada com PAS < 90 mmHg, infarto de VD, sildenafila ou vardenafila em 24 h, tadalafila em 48 h.",
   "Esmolol: ataque 0,5 mg/kg (500 mcg/kg) EV em 1 min; manutenção 50 mcg/kg/min, aumentando 50 mcg/kg/min a cada 4–5 min (repetindo o ataque) até o teto de 200 mcg/kg/min. Conferir a apresentação: 10 mg/mL pronto para uso, ou 2.500 mg/10 mL diluídos em 240 mL de SF ou SG 5% (10 mg/mL). Ex.: 70 kg a 50 mcg/kg/min = 21 mL/h da solução de 10 mg/mL.",
   "Metoprolol: 5 mg EV em 1–2 min, repetir a cada 5 min se preciso; teto 15–20 mg (dose total).",
   "Betabloqueador EV: evitar se FC < 60, BAV de 2º ou 3º grau, insuficiência cardíaca descompensada ou baixo débito, broncoespasmo ativo, intoxicação por cocaína.",
   "Hidralazina (fora da gestação): 10–20 mg EV lento (ampola 20 mg/mL, diluir); início em 10–20 min, dura 3–12 h, pouco titulável; repetir a cada 4–6 h se preciso. Causa taquicardia reflexa: não usar isolada na SCA nem na dissecção.",
   "Labetalol, nicardipina e clevidipina (primeira linha em diretrizes estrangeiras) têm pouca ou nenhuma disponibilidade no Brasil."],
   decisao:{pergunta:"Doses conferidas.",opcoes:[{rot:"Ver cuidados depois da fase aguda",ir:"xfim"}]}},
  {id:"xfim",t:"Depois da fase aguda e alta",itens:[
   "Emergência hipertensiva: internar; iniciar anti-hipertensivo oral quando estável e reduzir o EV aos poucos; investigar hipertensão secundária (mais comum na emergência hipertensiva).",
   "Elevação importante sem lesão de órgão-alvo: alta com ajuste da medicação, retorno ambulatorial em 1–7 dias, meta inicial < 160/100 mmHg (DBHA 2025); meta de longo prazo < 130/80 mmHg.",
   "Orientar adesão, redução de sal, evitar AINE e descongestionantes; retorno imediato se dor no peito, falta de ar, déficit neurológico, alteração da fala ou da visão."]}
 ],
 fontes:[
  "Sociedade Brasileira de Cardiologia, SBN, SBH. Diretriz Brasileira de Hipertensão Arterial – 2025, cap. 11 (Crise Hipertensiva) e cap. 10 (gestação) (Arq Bras Cardiol 2025;122(9)) — elevação importante da PA sem LOA, observação de 30 min, clonidina ou captopril, nifedipino de liberação rápida proscrito, metas gerais e por lesão (dissecção FC < 60 e PAS 90–120 em 20 min; EAP e crise adrenérgica PAS < 140 na 1ª h; SCA PAS < 140 evitando < 120; AVCH; encefalopatia 20–25% na 1ª h), fármacos contraindicados na SCA, nitroprussiato até 4 h na gestação. https://www.scielo.br/j/abc/a/BXT7Vk4B9VKQnJFsJhgJ4Hn/?lang=pt",
  "Vilela-Martin JF et al. Posicionamento Luso-Brasileiro de Emergências Hipertensivas – 2020 (Arq Bras Cardiol 2020;114(4):736) — definições, tabela de fármacos parenterais (metoprolol 5 mg até 20 mg; esmolol 500 mcg/kg; hidralazina 10–20 mg EV), encefalopatia (PAM 10–15% na 1ª h). https://www.scielo.br/j/abc/a/N95NCgGxk7wHmm6JPv5H4tN/?lang=pt",
  "Whelton PK et al. 2017 ACC/AHA Guideline for High Blood Pressure in Adults (Hypertension 2018;71:e13), tabela de fármacos EV — nitroprussiato 0,3–0,5 a 10 mcg/kg/min; nitroglicerina 5 mcg/min; esmolol 500–1.000 mcg/kg + 50 até 200 mcg/kg/min; hidralazina 10 mg (máx. inicial 20 mg) a cada 4–6 h.",
  "McDonagh TA et al. 2021 ESC Guidelines for acute and chronic heart failure (Eur Heart J 2021;42:3599) — nitroglicerina até 200 mcg/min; furosemida 20–40 mg EV.",
  "Greenberg SM et al. 2022 AHA/ASA Guideline for Spontaneous Intracerebral Hemorrhage (Stroke 2022;53:e282) — PAS alvo 140, evitar < 130.",
  "Prabhakaran S et al. 2026 AHA/ASA Guideline for the Early Management of Acute Ischemic Stroke (Stroke 2026) — PA < 185/110 antes e ≤ 180/105 após reperfusão; redução de 15% se ≥ 220/120 sem reperfusão.",
  "ACOG Committee Opinion 767. Emergent Therapy for Acute-Onset, Severe Hypertension During Pregnancy and the Postpartum Period (Obstet Gynecol 2019;133:e174) — tratar em 30–60 min.",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 35, Emergências hipertensivas (tabela 5: diluições de nitroprussiato, nitroglicerina e esmolol; tabela 6: metas por condição).",
  "Bulas registradas na Anvisa: nitroprussiato de sódio (0,3 a 10 mcg/kg/min, máximo por 10 min), nitroglicerina injetável, cloridrato de esmolol, tartarato de metoprolol injetável e cloridrato de hidralazina injetável."
 ]},
/* ---------------------------------------------------------------- Pré-eclâmpsia e eclâmpsia */
{id:"pre-eclampsia",titulo:"Pré-eclâmpsia grave e eclâmpsia",cor:"sky",conduta:"pre-eclampsia",
 passos:[
  {id:"e1",t:"Reconhecer e classificar",tempo:"0–15 min",itens:[
   "Gestante ≥ 20 semanas ou puérpera (principalmente na 1ª semana) com PA ≥ 140/90 mmHg: pensar em pré-eclâmpsia. Eclâmpsia pode ser a primeira manifestação.",
   "Pré-eclâmpsia: hipertensão após 20 semanas + proteinúria (≥ 300 mg/24 h, relação proteína/creatinina ≥ 0,3 ou fita ≥ 1+) ou, mesmo sem proteinúria, disfunção de órgão (plaquetopenia, disfunção hepática ou renal, edema pulmonar, iminência de eclâmpsia) ou comprometimento placentário.",
   "Sinais de gravidade: PA ≥ 160 e/ou 110 mmHg persistente por 15 min; iminência de eclâmpsia (cefaleia, fotofobia, escotomas, turvação visual, dor epigástrica ou em hipocôndrio direito, náuseas e vômitos, hiper-reflexia); eclâmpsia; HELLP; oligúria (< 500 mL/24 h); creatinina ≥ 1,0 mg/dL (RBEHG; MS: ≥ 1,2); edema pulmonar; dor torácica.",
   "Emergência hipertensiva (crise com sintomas): não esperar os 15 min; sulfato de magnésio antes do anti-hipertensivo.",
   "Decúbito lateral esquerdo, acesso venoso, sonda vesical para medir diurese, exames: hemograma com plaquetas, AST/ALT, LDH, bilirrubinas, creatinina, esfregaço (esquizócitos).",
   "Acionar a obstetrícia e a regulação para maternidade de referência (alto risco) cedo."],
   decisao:{pergunta:"Qual o cenário?",opcoes:[{rot:"Convulsão (eclâmpsia)",ir:"eecl"},{rot:"Sinais de gravidade",ir:"e2"},{rot:"Pré-eclâmpsia sem sinais de gravidade",ir:"esem"}]}},
  {id:"e2",t:"Sulfato de magnésio",tempo:"o mais rápido possível",itens:[
   "Indicação: iminência de eclâmpsia, eclâmpsia, HELLP, crise hipertensiva (PA ≥ 160/110 mmHg, mesmo sem sintomas) ou deterioração clínica ou laboratorial. Usar o MgSO4 não obriga o parto.",
   "Conferir a ampola: MgSO4 50% (10 mL = 5 g); 20% (10 mL = 2 g); 10% (10 mL = 1 g). Doses abaixo com a de 50%.",
   "Ataque (Zuspan e Pritchard): 4 g EV = 8 mL de MgSO4 50% + 12 mL de água destilada ou SF 0,9% (20 mL), EV lento em 15–20 min (RBEHG 2023; MS 2022: 5–10 min). Alternativa: 8 mL em 100 mL de SF 0,9% em bomba a 300 mL/h (cerca de 20 min).",
   "Zuspan (manutenção EV): 1 g/h em bomba exclusiva. Preparo: 10 mL de MgSO4 50% (5 g) + 490 mL de SF 0,9% = 1 g/100 mL, a 100 mL/h (ou 10 mL + 240 mL de SF = 5 g/250 mL, a 50 mL/h, MS). Pode subir para 2 g/h se os sintomas persistirem (20 mL de MgSO4 50% + 480 mL de SF, a 100 mL/h).",
   "Pritchard (manutenção IM): no ataque, além dos 4 g EV, 10 g IM (10 mL de MgSO4 50% IM profundo em cada nádega, quadrante superior externo); depois 5 g (10 mL a 50%) IM profundo a cada 4 h. Preferido para transporte ou sem bomba de infusão; evitar IM na HELLP com plaquetopenia.",
   "Transferência: fazer pelo menos o ataque (4 g EV + 10 g IM), que cobre cerca de 4 h.",
   "Creatinina ≥ 1,0 mg/dL (RBEHG; MS: > 1,3): metade da dose de manutenção e dosar o magnésio.",
   "Duração: manter por 24 h após o parto ou após a última convulsão.",
   "Teto (bula): 30–40 g em 24 h no adulto. Contraindicado na miastenia grave."]},
  {id:"e3",t:"Vigiar o magnésio",tempo:"a cada hora, reavaliar a cada 4 h",itens:[
   "Antes de cada dose ou durante a infusão: reflexo patelar presente, FR ≥ 16 irpm (MS: > 12) e diurese ≥ 25 mL/h.",
   "Se um deles alterar: reduzir ou parar a infusão (ou não fazer a dose IM), dosar magnésio e creatinina; reiniciar se normais. Parada > 2 h: novo ataque de 2 g.",
   "Faixa terapêutica 4–7 mEq/L; reflexo patelar some com 8–10 mEq/L; risco de parada respiratória a partir de 12 mEq/L.",
   "Intoxicação (depressão respiratória, arreflexia): parar o MgSO4, gluconato de cálcio 10% 10 mL (1 g) EV lento em cerca de 3 min, O2 e suporte ventilatório.",
   "Nova convulsão durante o MgSO4: mais 2 g EV em bolus (4 mL a 50% diluídos em 10 mL) e manutenção a 2 g/h. Se 2 bolus não controlarem: fenitoína EV (RBEHG) ou benzodiazepínico (MS), UTI e neuroimagem (hemorragia intracraniana)."],
   decisao:{pergunta:"PA ≥ 160 e/ou 110 mmHg persistente por 15 min (ou crise com sintomas)?",opcoes:[{rot:"Sim",ir:"e4"},{rot:"Não",ir:"e5"}]}},
  {id:"e4",t:"Anti-hipertensivo de ação rápida",tempo:"iniciar em até 30–60 min",itens:[
   "Meta: reduzir 15–25%, com PAS entre 140 e 150 e PAD entre 90 e 100 mmHg. Evitar queda brusca (AVC materno, sofrimento fetal). Hipotensão: elevar os membros inferiores e hidratar com cautela.",
   "Hidralazina EV: diluir 1 ampola (20 mg/mL) em 19 mL de água destilada = 1 mg/mL; 5 mg EV e repetir 5 mg a cada 20 min; teto 30 mg (RBEHG 2023, MS 2022). A DBHA 2025 usa 5 mg a cada 20–30 min até 15 mg; a ACOG, 5–10 mg até 20 mg antes de trocar de fármaco.",
   "Ou nifedipino de liberação imediata 10 mg VO, repetir 10 mg a cada 20–30 min; teto 30 mg (RBEHG, MS). Não mastigar, não usar sublingual; o retard não serve para a crise. Boa opção sem acesso venoso.",
   "Labetalol EV (primeira linha da ACOG, pouco disponível no Brasil): 20 mg EV em 2 min; se a PA seguir grave após 10 min, 40 mg; depois 80 mg; teto 300 mg em 24 h. Evitar na asma, bradicardia e insuficiência cardíaca.",
   "Edema agudo de pulmão ou hipertensão refratária: nitroglicerina EV ou nitroprussiato (50 mg + 248 mL de SG 5% = 200 mcg/mL; 0,5–10 mcg/kg/min, teto de 10 mcg/kg/min por no máximo 10 min), nitroprussiato por no máximo 4 h (cianeto fetal). Furosemida no edema pulmonar.",
   "IECA, BRA e atenolol são contraindicados na gestação."],
   decisao:{pergunta:"A PA ficou abaixo de 160/110 mmHg?",opcoes:[{rot:"Sim",ir:"e5"},{rot:"Não, após as doses máximas",ir:"e4b"}]}},
  {id:"e4b",t:"Hipertensão refratária",itens:[
   "Trocar para o outro fármaco de primeira linha (hidralazina ↔ nifedipino) e chamar obstetrícia, anestesia ou UTI.",
   "Hidralazina em infusão contínua (RBEHG): 80 mg (4 mL) em 500 mL de SF 0,9%, a 30 mL/h (cerca de 5 mg/h).",
   "Ou nitroprussiato em bomba (até 4 h), com PA contínua.",
   "Hipertensão refratária a 3 anti-hipertensivos indica o parto."]},
  {id:"e5",t:"Avaliar complicações e HELLP",itens:[
   "HELLP (MS 2022/RBEHG): hemólise (LDH > 600 UI/L, bilirrubina > 1,2 mg/dL, esquizócitos, haptoglobina baixa), AST ou ALT > 70 UI/L e plaquetas < 100.000/mm³. Pode vir com pouca hipertensão; dor em hipocôndrio direito é alarme.",
   "Outras: descolamento prematuro de placenta, edema pulmonar, lesão renal, hematoma hepático, coagulação intravascular disseminada, alteração da vitalidade fetal.",
   "Avaliar a vitalidade fetal só depois de estabilizar a mãe (alterações transitórias levam a condutas intempestivas)."],
   decisao:{pergunta:"Há síndrome HELLP?",opcoes:[{rot:"Sim",ir:"ehellp"},{rot:"Não",ir:"e6"}]}},
  {id:"ehellp",t:"Síndrome HELLP",itens:[
   "Emergência obstétrica: sulfato de magnésio sempre; PAS < 150 e PAD < 100 mmHg com os hipotensores de ação rápida.",
   "Interrupção da gestação indicada em geral independentemente da idade gestacional (≥ 34 semanas, sempre); < 34 semanas, conduta expectante curta só em casos selecionados, em centro terciário.",
   "Plaquetas: transfundir se sangramento ou < 20.000/mm³; manter > 50.000/mm³ para cesárea (RBEHG: cuidados especiais e anestesia geral se < 70.000) e > 20.000/mm³ para parto vaginal. Reservar hemácias e plaquetas.",
   "Diurese ≥ 25–30 mL/h com SF 0,9% cauteloso; nunca palpar o fígado com força (risco de rotura de hematoma).",
   "Pós-parto: UTI, controle de plaquetas, LDH, AST e bilirrubinas; piora transitória nas primeiras 24 h é comum."]},
  {id:"e6",t:"Momento do parto",itens:[
   "Tratamento definitivo: parto e retirada da placenta, depois da estabilização materna (PA controlada, MgSO4 iniciado, convulsão controlada). Via preferencial: vaginal (indução), cesárea por indicação obstétrica.",
   "Parto indicado em qualquer idade gestacional: eclâmpsia ou iminência refratária, HELLP, descolamento de placenta, edema pulmonar, hipertensão refratária a 3 fármacos, piora laboratorial progressiva, insuficiência renal, hematoma ou rotura hepática, alteração da vitalidade fetal.",
   "Sem essas condições: < 23–24 semanas, individualizar (prognóstico fetal ruim); 24–34 semanas, conduta expectante em hospital terciário com corticoide (betametasona 12 mg IM a cada 24 h, 2 doses; ou dexametasona 6 mg IM a cada 12 h, 4 doses) e MgSO4 para neuroproteção se parto < 32 semanas; 34–37 semanas, pode-se prolongar com monitoração; ≥ 37 semanas, parto.",
   "Pré-eclâmpsia sem sinais de gravidade: parto com 37 semanas."],
   decisao:{pergunta:"Plano de parto definido com a obstetrícia.",opcoes:[{rot:"Ver puerpério e alta",ir:"efim"}]}},
  {id:"eecl",t:"Eclâmpsia: convulsão",tempo:"agora",itens:[
   "Prioridade é oxigenar e evitar aspiração, não parar a convulsão de imediato (em geral é autolimitada).",
   "Decúbito lateral esquerdo, proteger de quedas, aspirar secreções, cânula ou protetor bucal; O2 8–10 L/min e oximetria.",
   "Acesso venoso, coletar exames, sonda vesical de demora.",
   "Sulfato de magnésio já (próximo passo) é a droga de escolha, melhor que diazepam ou fenitoína.",
   "Depois da convulsão, se PA ≥ 160/110 mmHg: nifedipino 10 mg VO (se consciente) ou hidralazina 5–10 mg EV (MS 2022), seguindo os tetos do passo de anti-hipertensivo.",
   "Não fazer cesárea às pressas durante ou logo após a convulsão: aguardar a recuperação materna e fetal (em geral 4–6 h), com sensório recuperado e PA controlada.",
   "Coma prolongado, déficit focal ou quadro atípico: TC ou RM de crânio (hemorragia intracraniana). Outras causas de convulsão: epilepsia, hipoglicemia, trombose venosa, meningite, intoxicação."],
   decisao:{pergunta:"Via aérea e oxigenação garantidas.",opcoes:[{rot:"Iniciar sulfato de magnésio",ir:"e2"}]}},
  {id:"esem",t:"Pré-eclâmpsia sem sinais de gravidade",itens:[
   "Internar para avaliação inicial completa (clínica, laboratorial e fetal) e confirmar que não há gravidade.",
   "Hipertensão persistente ≥ 140/90 mmHg: anti-hipertensivo oral de manutenção (RBEHG), visando PAD em torno de 85 mmHg: metildopa 750–2.000 mg/dia VO, nifedipino retard 20–120 mg/dia VO ou anlodipino 5–20 mg/dia VO (tetos diários do MS 2022 e RBEHG).",
   "Orientar sinais de alarme (cefaleia, alteração visual, dor epigástrica, falta de ar, redução de movimentos fetais) e controle da PA diário; retorno semanal.",
   "Parto com 37 semanas."],
   decisao:{pergunta:"Surgiram sinais de gravidade?",opcoes:[{rot:"Sim",ir:"e2"},{rot:"Não",ir:"e6"}]}},
  {id:"efim",t:"Puerpério e alta",itens:[
   "Manter o MgSO4 por 24 h após o parto ou a última convulsão; cerca de 30% das eclâmpsias são no puerpério, sobretudo na 1ª semana.",
   "A PA pode piorar entre o 3º e o 6º dia pós-parto: manter e ajustar os anti-hipertensivos; reduzir ou retirar se PA < 110/70 mmHg. No puerpério, além dos da gestação, IECA (enalapril, captopril) é liberado; evitar BRA e clonidina na amamentação (RBEHG).",
   "Evitar AINE para analgesia na pré-eclâmpsia grave; vigiar a hidratação EV e a diurese.",
   "Alta com relatório, sinais de alarme e retorno precoce para PA. Risco cardiovascular aumentado no longo prazo; na próxima gestação, AAS 100 mg/dia VO de 12 a 36 semanas e cálcio."]}
 ],
 fontes:[
  "Peraçoli JC et al. Pré-eclâmpsia – Protocolo 03, 2023. Rede Brasileira de Estudos sobre Hipertensão na Gravidez (RBEHG) — critérios de gravidade, meta de PA, hidralazina 5 mg a cada 20 min até 30 mg, nifedipino 10 mg a cada 20–30 min até 30 mg, hidralazina em infusão, nitroprussiato, esquemas de Zuspan e Pritchard com diluições, monitoração, gluconato de cálcio, dose com creatinina ≥ 1,0, recorrência, momento e via de parto, corticoide. https://rbehg.com.br/wp-content/uploads/2023/08/PROTOCOLO-2023-FINAL.pdf",
  "Brasil. Ministério da Saúde. Manual de Gestação de Alto Risco. Brasília, 2022 — cap. 11 (pré-eclâmpsia com sinais de gravidade, quadros 2 e 3, HELLP e quadro 4, eclâmpsia: os dez passos, quadros 7 e 8 do sulfato de magnésio, puerpério).",
  "Sociedade Brasileira de Cardiologia. Diretriz Brasileira de Hipertensão Arterial – 2025, cap. 10 (Arq Bras Cardiol 2025;122(9)) — labetalol indisponível no Brasil, hidralazina 5 mg a cada 20–30 min até 15 mg, nifedipino sublingual proscrito, nitroprussiato por até 4 h. https://www.scielo.br/j/abc/a/BXT7Vk4B9VKQnJFsJhgJ4Hn/?lang=pt",
  "ACOG Committee Opinion 767. Emergent Therapy for Acute-Onset, Severe Hypertension During Pregnancy and the Postpartum Period (Obstet Gynecol 2019;133:e174) — tratar em 30–60 min; labetalol 20–40–80 mg a cada 10 min (máx. 300 mg/24 h); hidralazina 5–10 mg.",
  "ACOG Practice Bulletin 222. Gestational Hypertension and Preeclampsia (Obstet Gynecol 2020;135:e237) — critérios diagnósticos e de gravidade.",
  "Bula profissional Anvisa do sulfato de magnésio 50% — dose diária máxima, velocidade de infusão, contraindicação na miastenia grave; bula Anvisa do gluconato de cálcio 10%.",
  "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 35, Emergências hipertensivas (hiper-reflexia na gestante e puérpera; pré-eclâmpsia como emergência hipertensiva assintomática)."
 ]},
/* ---------------------------------------------------------------- Hemorragia pós-parto */
{id:"hemorragia-pos-parto",titulo:"Hemorragia pós-parto",cor:"red",
 passos:[
  {id:"p1",t:"Reconhecer e pedir ajuda",tempo:"hora de ouro",itens:[
   "Hemorragia pós-parto (OPAS 2018): perda > 500 mL após parto vaginal ou > 1.000 mL após cesárea nas primeiras 24 h, ou qualquer perda pelo trato genital que cause instabilidade hemodinâmica.",
   "Diretriz OMS/FIGO/ICM 2025: agir já com perda de 300 mL se houver qualquer sinal vital anormal; medir a perda (bolsa coletora calibrada ou pesagem: 1 g ≈ 1 mL), pois a estimativa visual subestima.",
   "Maciça: > 2.000 mL em 24 h, ou transfusão de ≥ 4 concentrados de hemácias, ou queda de hemoglobina ≥ 4 g/dL, ou coagulopatia.",
   "Hora de ouro: controlar o sítio de sangramento em até 1 h do diagnóstico. Não esperar hipotensão (surge só após perda > 20%; pior na anemia e na pré-eclâmpsia).",
   "Verbalizar o diagnóstico à equipe; chamar obstetra, anestesista e enfermagem; acionar a regulação para maternidade de referência se a unidade não tiver centro obstétrico e banco de sangue."]},
  {id:"p2",t:"Medidas gerais (pacote MOTIVE)",tempo:"primeiros 10–15 min",itens:[
   "Massagem uterina e uterotônico já (passo de tônus), ácido tranexâmico, fluidos EV, exame do trato genital e escalonamento se não parar (pacote MOTIVE da OMS 2025).",
   "Dois acessos venosos calibrosos (jelco 14 ou 16); coletar hemograma, tipagem e prova cruzada, coagulograma, fibrinogênio, eletrólitos; lactato e gasometria se grave.",
   "O2 8–10 L/min em máscara; elevar os membros inferiores; monitor contínuo.",
   "Esvaziar a bexiga e passar sonda vesical de demora (diurese).",
   "Evitar hipotermia: cristaloide aquecido, manta térmica, temperatura a cada 15 min.",
   "Cristaloide (SF 0,9% ou Ringer lactato) aquecido, reavaliando a resposta a cada 250–500 mL; sem cargas fixas nem regra de 3:1 (diluição e coagulopatia).",
   "Ácido tranexâmico 1 g EV em 10 min (ex.: 4 ampolas de 250 mg/5 mL; ou 1 g em 250 mL de SF 0,9%), assim que diagnosticar a hemorragia e junto com os uterotônicos, dentro de 3 h do parto. Repetir 1 g se o sangramento persistir após 30 min ou recomeçar em até 24 h. Teto: 2 g."]},
  {id:"p3",t:"Gravidade: índice de choque",itens:[
   "Índice de choque = FC ÷ PAS. É mais precoce que FC e PA isoladas.",
   "≥ 0,9: risco de transfusão; abordagem agressiva e considerar transferência.",
   "≥ 1,4: tratamento agressivo e urgente; abrir protocolo de transfusão maciça.",
   "≥ 1,7: alto risco de desfecho materno grave.",
   "O parâmetro mais alterado define o grau: FC > 120 bpm, PAS < 70 mmHg ou letargia = choque grave (perda > 35%, > 2.000 mL)."],
   decisao:{pergunta:"Índice de choque ≥ 0,9 ou sinais de choque?",opcoes:[{rot:"Sim",ir:"pchoque"},{rot:"Não",ir:"p4"}]}},
  {id:"pchoque",t:"Choque hemorrágico: ressuscitação hemostática",itens:[
   "Acionar o protocolo de transfusão maciça da instituição; sangue O negativo ou isogrupo sem prova cruzada se instável e sangrando muito.",
   "Transfundir se instabilidade, ou considerar após 1.500 mL de cristaloide sem resposta sustentada. Hemácias e plasma em proporção próxima de 1:1, depois plaquetas e crioprecipitado (alguns protocolos: 1:1:1:1).",
   "Metas: hemoglobina > 8 g/dL; plaquetas > 50.000/mm³ (> 100.000 se sangramento ativo); TP e TTPa < 1,5 vez o controle; fibrinogênio > 200 mg/dL (a hemorragia obstétrica baixa o fibrinogênio cedo; crioprecipitado 7–10 unidades no adulto).",
   "Traje antichoque não pneumático nas pacientes em choque ou com iminência de choque: aplicar do tornozelo (segmento 1) ao abdome (segmentos 5 e 6). Contraindicações: feto vivo viável, cardiopatia grave, hipertensão pulmonar, edema agudo de pulmão, lesão acima do diafragma.",
   "Vigiar hipocalcemia (citrato), hipercalemia e acidose durante a transfusão."],
   decisao:{pergunta:"Ressuscitação em curso.",opcoes:[{rot:"Determinar a causa (4 Ts)",ir:"p4"}]}},
  {id:"p4",t:"Determinar a causa: os 4 Ts",itens:[
   "Tônus (atonia, cerca de 70%): útero amolecido, acima da cicatriz umbilical.",
   "Trauma (cerca de 19%): lacerações de colo, vagina e períneo, hematomas, inversão ou rotura uterina.",
   "Tecido (cerca de 10%): placenta retida, restos, acretismo.",
   "Trombina (cerca de 1%): coagulopatia congênita ou adquirida (CIVD, descolamento de placenta, HELLP, embolia amniótica), anticoagulantes.",
   "Pode haver mais de uma causa: sempre palpar o útero e revisar o canal de parto."],
   decisao:{pergunta:"Qual a causa principal?",opcoes:[{rot:"Tônus (atonia)",ir:"pton"},{rot:"Trauma",ir:"ptra"},{rot:"Tecido",ir:"ptec"},{rot:"Trombina",ir:"ptro"}]}},
  {id:"pton",t:"Atonia: massagem e ocitocina",tempo:"imediato",itens:[
   "Massagem uterina bimanual (manobra de Hamilton) já, após esvaziar a bexiga, enquanto o uterotônico age.",
   "Ocitocina (1ª escolha): 5 UI EV lento em 3 min (nunca bolus rápido nem > 5 UI de ataque) + 20–40 UI em 500 mL de SF 0,9% a 250 mL/h; manutenção a 125 mL/h por 4 h.",
   "Atonia importante: manter ocitocina até 24 h a cerca de 3 UI/h, vigiando intoxicação hídrica (hiponatremia).",
   "Ácido tranexâmico 1 g EV em 10 min junto com a ocitocina, se ainda não feito.",
   "Quem estava em trabalho de parto responde menos à ocitocina: não atrasar a 2ª linha. Se a profilaxia foi pela regra dos 3, falha da 3ª dose indica a 2ª linha, não outro esquema de ocitocina."],
   decisao:{pergunta:"O útero contraiu e o sangramento parou?",opcoes:[{rot:"Sim",ir:"pfim"},{rot:"Não",ir:"pton2"}]}},
  {id:"pton2",t:"Uterotônicos de segunda linha",itens:[
   "Metilergometrina 0,2 mg (1 ampola) IM; repetir em 20 min se preciso. Sangramento grave: mais 3 doses de 0,2 mg IM a cada 4 h. Teto 1 mg/24 h (5 doses). Não usar na hipertensão ou pré-eclâmpsia. Se a 1ª dose falhar, a 2ª dificilmente funciona.",
   "Misoprostol 800 mcg (4 comprimidos de 200 mcg) via retal, dose única; início em 15–20 min (via oral: 7–11 min). Sem tempo para esperar o efeito: inserir e avançar para o próximo passo.",
   "Manter a massagem bimanual e a infusão de ocitocina."],
   decisao:{pergunta:"O sangramento parou?",opcoes:[{rot:"Sim",ir:"pfim"},{rot:"Não",ir:"pbal"}]}},
  {id:"pbal",t:"Falha dos uterotônicos: balão, traje e cirurgia",itens:[
   "Balão de tamponamento intrauterino (industrial ou artesanal), cheio com líquido morno; permanência máxima de 24 h; antibiótico enquanto estiver (ex.: cefazolina 1 g EV de 8/8 h) e manter ocitocina. Útil para viabilizar a transferência.",
   "Contraindicações ao balão: câncer ou infecção de colo, vagina ou útero; sangramento arterial que exige cirurgia. Cuidado no acretismo (risco de rotura).",
   "Traje antichoque não pneumático, junto com o balão, se instável.",
   "Sem resposta: laparotomia (suturas compressivas como B-Lynch ou Hayman, ligaduras vasculares, histerectomia, cirurgia de controle de danos). Quando indicada, a histerectomia não deve ser adiada (antes da coagulopatia).",
   "Sem centro cirúrgico na unidade: transferir já, com balão e traje, acesso venoso e ocitocina correndo, acompanhada por médico."],
   decisao:{pergunta:"Sangramento controlado ou transferência feita.",opcoes:[{rot:"Ver cuidados após o controle",ir:"pfim"}]}},
  {id:"ptra",t:"Trauma do canal de parto",itens:[
   "Revisar colo, vagina e períneo com boa iluminação e analgesia; suturar as lacerações.",
   "Hematomas: toque vaginal e revisão direta; drenar quando indicado; pensar em hematoma de ligamento largo ou retroperitoneal se instável sem sangramento externo proporcional.",
   "Inversão uterina: reposicionar já (manobra de Taxe); se falhar, laparotomia.",
   "Rotura uterina (principalmente com cesárea prévia): laparotomia.",
   "Útero também amolecido? Tratar a atonia ao mesmo tempo."],
   decisao:{pergunta:"Trauma tratado.",opcoes:[{rot:"Também há atonia",ir:"pton"},{rot:"Ver cuidados após o controle",ir:"pfim"}]}},
  {id:"ptec",t:"Tecido: placenta retida, restos, acretismo",itens:[
   "Dequitação demorada (> 30–45 min sem sangramento excessivo) ou sangramento com placenta retida: extração manual da placenta sob analgesia.",
   "Sem plano de clivagem na extração: suspeitar de acretismo e parar; não tentar retirar a placenta nem parte dela (hemorragia grave). Preparar laparotomia (histerectomia com placenta in situ) ou conduta conservadora em centro de referência.",
   "Restos após a dequitação: revisão da cavidade uterina e curetagem."],
   decisao:{pergunta:"Tecido tratado.",opcoes:[{rot:"Também há atonia",ir:"pton"},{rot:"Ver cuidados após o controle",ir:"pfim"}]}},
  {id:"ptro",t:"Trombina: coagulopatia",itens:[
   "Coagulograma e fibrinogênio; pensar em CIVD (descolamento de placenta, embolia amniótica, sepse, HELLP), doença de von Willebrand, anticoagulante.",
   "Tratamento específico + hemocomponentes pelas metas (plasma, plaquetas, crioprecipitado; reversão do anticoagulante).",
   "Ácido tranexâmico, se ainda não feito e dentro de 3 h do parto.",
   "Cuidado com a opção cirúrgica (sangra mais); traje antichoque como apoio; cirurgia de controle de danos se CIVD no intraoperatório."],
   decisao:{pergunta:"Coagulopatia em tratamento.",opcoes:[{rot:"Também há atonia",ir:"pton"},{rot:"Ver cuidados após o controle",ir:"pfim"}]}},
  {id:"pfim",t:"Depois do controle do sangramento",itens:[
   "Instabilidade que persiste depois do controle aparente: procurar sangramento oculto (retroperitônio, hematoma, intra-abdominal) ou necessidade de mais transfusão.",
   "Monitorar sinais vitais, tônus uterino, sangramento e diurese de perto (a cada 15 min nas primeiras 2 h); manter ocitocina conforme a gravidade.",
   "Retirar o traje antichoque só com perda < 50 mL/h por pelo menos 2 h, pulso ≤ 100 bpm, PAS > 90–100 mmHg e Hb > 7 g/dL, do tornozelo ao abdome, esperando 20 min entre os segmentos; recolocar se a PAS cair ≥ 20 mmHg ou a FC subir ≥ 20 bpm.",
   "Balão: retirar aos poucos (50 mL por vez) em local com tratamento definitivo disponível.",
   "Após a estabilização: hemograma, coagulograma, eletrólitos e lactato de controle; UTI ou transferência se houve choque ou transfusão maciça."]}
 ],
 fontes:[
  "Organização Pan-Americana da Saúde. Recomendações assistenciais para prevenção, diagnóstico e tratamento da hemorragia obstétrica (Estratégia Zero Morte Materna por Hemorragia). Brasília: OPAS, 2018 — definições, hora de ouro, 4 Ts, índice de choque (quadro 8), quadro 9 (ocitocina 5 UI + 20–40 UI/500 mL, metilergometrina 0,2 mg até 1 mg/24 h, misoprostol 800 mcg, ácido tranexâmico 1 g em 10 min com repetição), massagem bimanual, balão, traje antichoque (quadros 10–13), cirurgia, cristaloide racional, metas transfusionais (quadro 16), hemocomponentes (quadro 17), sequenciamento e checklist. https://iris.paho.org/handle/10665.2/34879",
  "World Health Organization, FIGO, ICM. Consolidated guidelines for the prevention, diagnosis and treatment of postpartum haemorrhage. Genebra: OMS, 2025 — agir com 300 mL e sinal vital anormal, medir a perda, pacote MOTIVE. https://www.who.int/news/item/05-10-2025-global-health-agencies-issue-new-recommendations-to-help-end-deaths-from-postpartum-haemorrhage",
  "WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with post-partum haemorrhage (Lancet 2017;389:2105) — 1 g EV em até 3 h do parto, 2ª dose de 1 g se persistir após 30 min ou recomeçar em até 24 h.",
  "Bulas registradas na Anvisa: ocitocina (5 UI/mL), maleato de metilergometrina (0,2 mg/mL; contraindicado na hipertensão e na pré-eclâmpsia), ácido tranexâmico (Transamin 250 mg/5 mL)."
 ]},
];
if (typeof module!=="undefined") module.exports={PROTOCOLOS};

if (typeof module!=="undefined") module.exports={PROTOCOLOS};

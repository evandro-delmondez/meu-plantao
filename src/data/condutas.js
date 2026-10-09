const CATS = {
 "emerg": {
  "nome": "Emergência / Sala vermelha",
  "cor": "red"
 },
 "cardio": {
  "nome": "Cardio / Vascular",
  "cor": "rose"
 },
 "dor": {
  "nome": "Dor / Neuro / Ortop",
  "cor": "amber"
 },
 "resp": {
  "nome": "Respiratório",
  "cor": "sky"
 },
 "orl": {
  "nome": "Otorrino / Oftalmo",
  "cor": "indigo"
 },
 "gi": {
  "nome": "Gastro",
  "cor": "green"
 },
 "pele": {
  "nome": "Dermato",
  "cor": "teal"
 },
 "gu": {
  "nome": "Gineco / Obstetrícia / IST",
  "cor": "pink"
 },
 "uro": {
  "nome": "Uro / Nefro",
  "cor": "cyan"
 },
 "endo": {
  "nome": "Endócrino / Metabólico",
  "cor": "orange"
 },
 "psi": {
  "nome": "Psiquiatria",
  "cor": "violet"
 },
 "toxinf": {
  "nome": "Toxico / Infecto",
  "cor": "lime"
 },
 "outros": {
  "nome": "Outros",
  "cor": "slate"
 }
};
const BASE = [
 {
  "id": "abscesso",
  "nome": "Abscesso / Furúnculo",
  "cat": "pele",
  "cid": "L02.9",
  "sin": "furunculo carbunculo pus",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\n\nAntibiótico (se celulite ao redor, sinais sistêmicos, lesão > 2 cm ou imunossupressão)\n3) Cefalexina 500mg -------------------------- 28 cp\nTomar 1 cp VO de 6/6h por 7 dias.\nOu (suspeita de MRSA comunitário / falha prévia)\n3) Sulfametoxazol + Trimetoprima 800/160mg --- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\nOu (alergia a penicilina)\n3) Clindamicina 300mg ------------------------ 21 cp\nTomar 1 cp VO de 8/8h por 7 dias.",
  "unidade": "1) Drenagem (incisão, expressão e lavagem com SF 0,9%) + curativo, se flutuante.\n2) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Compressas mornas 3 a 4x ao dia.\n- Retorno em 48h para reavaliação e troca de curativo.\n- Retorno imediato se febre, vermelhidão que se espalha ou piora da dor.",
  "rev": [
   "Atualizado: drenagem é o tratamento principal; antibiótico só com os critérios indicados.",
   "Ajustado: ibuprofeno 300mg 12/12h → 600mg 8/8h (dose anti-inflamatória).",
   "Ajustado: duração do antibiótico 10 → 7 dias (IDSA: 5–10 dias).",
   "Adicionado: SMX-TMP para suspeita de MRSA comunitário.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10).",
   "Talan DA et al. Trimethoprim–sulfamethoxazole for uncomplicated skin abscess (N Engl J Med 2016;374:823)."
  ]
 },
 {
  "id": "afta",
  "nome": "Afta / Estomatite aftosa",
  "cat": "gi",
  "cid": "K12.0",
  "sin": "ulcera oral boca",
  "casa": "Uso oral\n1) Clorexidina 0,12% solução oral ------------ 1 fr\nFazer bochecho por 1 minuto, após a higiene oral, 2x ao dia, por 7 a 10 dias. Não engolir.\nOu\n1) Triancinolona 1mg/g em orabase (Omcilon-A Orabase) --- 1 bisnaga\nAplicar sobre as lesões 3x ao dia, após as refeições, por 7 dias.",
  "unidade": "",
  "orient": "- Evitar alimentos ácidos, muito quentes ou condimentados.\n- Úlcera que não cicatriza em 2 a 3 semanas deve ser reavaliada.",
  "rev": [],
  "evid": "Poucos ensaios de qualidade; tratamento é sintomático.",
  "fontes": [
   "Taylor J et al. Interventions for the management of recurrent aphthous stomatitis (Cochrane Database Syst Rev 2014;CD005411)."
  ]
 },
 {
  "id": "asma",
  "nome": "Asma / Crise de asma",
  "cat": "resp",
  "cid": "J45.9",
  "sin": "broncoespasmo chiado sibilancia bombinha",
  "casa": "Uso oral\n1) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.\n\nUso inalatório\n2) Salbutamol 100mcg spray ------------------- 1 fr\nInalar 4 jatos com espaçador de 4/4h se falta de ar ou chiado nos próximos 2 a 3 dias; depois, somente se necessário.\n3) Budesonida + Formoterol 200/6mcg ---------- 1 fr\nInalar 1 jato de 12/12h, uso contínuo até reavaliação ambulatorial.\nOu (se indisponível)\n3) Beclometasona 250mcg spray ---------------- 1 fr\nInalar 1 jato de 12/12h com espaçador, uso contínuo. Enxaguar a boca após o uso.",
  "unidade": "1) Salbutamol 100mcg spray: 4 a 10 jatos com espaçador a cada 20 min na 1ª hora (3 ciclos).\n   Ou Nebulização: Salbutamol 5mg/mL 10 a 20 gotas (2,5–5mg) + Brometo de ipratrópio 0,25mg/mL 40 gotas (0,5mg) em 3–5 mL de SF 0,9%, a cada 20 min, 3 vezes.\n2) Brometo de ipratrópio spray: 4 a 8 jatos a cada 20 min junto com o salbutamol (crise moderada/grave ou sem resposta).\n3) Corticoide na 1ª hora: Prednisona 40–60mg VO (2–3 cp de 20mg)\n   Ou Hidrocortisona 200mg EV (se não tolerar VO).\n4) O2 por cateter nasal se SatO2 < 93% (alvo 93–95% no adulto).\n5) Crise grave ou refratária: Sulfato de magnésio 50% 2g (4 mL) em 100 mL de SF 0,9% EV em 20 min.\n6) Reavaliar em 1h: fala, FR, uso de musculatura acessória, SatO2, PFE.",
  "orient": "- Técnica inalatória com espaçador revisada com o paciente.\n- Retorno imediato se falta de ar ao falar, lábios roxos ou sem melhora com o salbutamol.\n- Acompanhamento com clínico para controle da asma.",
  "rev": [
   "Removido: loratadina (não trata asma; usar só se rinite associada).",
   "Atualizado (GINA): O2 com alvo 93–95%; corticoide 1x ao dia; controlador contínuo em vez de 6 semanas; budesonida-formoterol como opção preferencial.",
   "Adicionado: sulfato de magnésio para crise grave."
  ],
  "fontes": [
   "Global Initiative for Asthma (GINA) 2024 — Global Strategy for Asthma Management and Prevention. https://ginasthma.org"
  ]
 },
 {
  "id": "amigdalite",
  "nome": "Amigdalite bacteriana / Faringoamigdalite",
  "cat": "orl",
  "cid": "J03.9",
  "sin": "dor de garganta placa pus amidala",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n3) Hexomedine spray -------------------------- 1 fr\nAplicar 3 jatos na garganta de 4/4h por 3 dias.\n4) Amidalin pastilha ------------------------- 1 cx\nDissolver 1 pastilha na boca a cada 3h por 3 dias.\n\nAntibiótico\n5) Amoxicilina 500mg ------------------------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\nOu\n5) Amoxicilina 500mg ------------------------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\nOu (dose única diária)\n5) Amoxicilina 500mg ------------------------- 20 cp\nTomar 2 cp (1 g) VO 1x ao dia por 10 dias.\nOu\n5) Penicilina G benzatina 1.200.000 UI ------- 1 amp\nAplicar IM, dose única (na unidade).\n\n# Se alergia a penicilina:\n5) Azitromicina 500mg ------------------------ 5 cp\nTomar 1 cp VO 1x ao dia por 5 dias.\nOu\n5) Clindamicina 300mg ------------------------ 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\n\n# Se falha ou recorrência recente:\n5) Amoxicilina + Clavulanato 875/125mg ------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\nOu\n5) Amoxicilina + Clavulanato 500/125mg ------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Penicilina G benzatina 1.200.000 UI IM, dose única (se opção pela via IM).",
  "orient": "- Antibiótico indicado se quadro bacteriano provável: febre, exsudato, adenomegalia cervical dolorosa, ausência de tosse.\n- Retorno se dificuldade para abrir a boca, engolir saliva ou respirar (abscesso periamigdaliano).",
  "rev": [
   "Atualizado: 1ª linha para faringite estreptocócica é amoxicilina ou penicilina benzatina; amoxicilina-clavulanato ficou para falha/recorrência.",
   "Ajustado: ibuprofeno 300mg 12/12h → 600mg 8/8h por 3 dias.",
   "Adicionado: amoxicilina 500 mg de 12/12h ou 1 g 1x/dia (IDSA 2012 aceita ambos por 10 dias).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Shulman ST et al. IDSA Clinical Practice Guideline for Group A Streptococcal Pharyngitis (Clin Infect Dis 2012;55:e86)."
  ]
 },
 {
  "id": "cerume",
  "nome": "Cerume impactado",
  "cat": "orl",
  "cid": "H61.2",
  "sin": "rolha cera ouvido tampado",
  "casa": "Uso otológico\n1) Cerumin gotas ----------------------------- 1 fr\nPingar 5 gotas no ouvido afetado e manter deitado com o ouvido para cima por 5 min, de 8/8h por 5 dias.",
  "unidade": "",
  "orient": "- Não usar se suspeita de perfuração timpânica ou otorreia.\n- Não introduzir hastes flexíveis no ouvido.\n- Retornar após 5 dias para lavagem, se necessário.",
  "rev": [
   "Adicionado: contraindicação em suspeita de perfuração."
  ],
  "fontes": [
   "Schwartz SR et al. AAO-HNS Clinical Practice Guideline (Update): Earwax (Cerumen Impaction) (Otolaryngol Head Neck Surg 2017)."
  ]
 },
 {
  "id": "cervicite",
  "nome": "Cervicite / Uretrite (IST)",
  "cat": "gu",
  "cid": "N72",
  "sin": "uretrite corrimento uretral ardor secrecao gonorreia clamidia ist dst",
  "casa": "Uso oral (se não tomado na unidade)\n1) Azitromicina 500mg ------------------------ 2 cp\nTomar 2 cp VO juntos, dose única.\nOu (alternativa à azitromicina, se não gestante)\n1) Doxiciclina 100mg ------------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.",
  "unidade": "1) Ceftriaxona 500 mg IM, dose única (diluente com lidocaína da apresentação IM).\n2) Azitromicina 1g (2 cp de 500mg) VO, dose única supervisionada.",
  "orient": "- Tratar a(s) parceria(s) sexual(is) com o mesmo esquema, mesmo sem sintomas.\n- Abstinência sexual por 7 dias após o tratamento do casal.\n- Ofertar testes rápidos: HIV, sífilis, hepatites B e C.\n- Uso de preservativo.",
  "rev": [
   "Preenchido: seção estava vazia. Esquema do PCDT-IST (MS): ceftriaxona 500mg IM + azitromicina 1g VO.",
   "Unificado com o item 'Uretrite' do final do modelo.",
   "CID: N72 cervicite; usar N34.1 para uretrite no homem.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Ministério da Saúde. PCDT Atenção Integral às Pessoas com IST, 2022. https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_diretrizes_terapeutica_atencao_integral_pessoas_infeccoes_sexualmente_transmissiveis.pdf"
  ]
 },
 {
  "id": "cinetose",
  "nome": "Cinetose",
  "cat": "outros",
  "cid": "T75.3",
  "sin": "enjoo viagem carro navio",
  "casa": "Uso oral\n1) Meclizina 25mg (Meclin) ------------------- 15 cp\nTomar 1 cp VO 1h antes de viajar. Se necessário, repetir a cada 24h.",
  "unidade": "",
  "orient": "- Pode causar sonolência; não dirigir após o uso.",
  "rev": [
   "Corrigido: intervalo 12h → 24h (meclizina tem ação de ~24h)."
  ],
  "evid": "Evidência modesta para anti-histamínicos; escopolamina tem mais estudos.",
  "fontes": [
   "Spinks A, Wasiak J. Scopolamine for preventing and treating motion sickness (Cochrane 2011;CD002851)."
  ]
 },
 {
  "id": "cefaleia",
  "nome": "Cefaleia",
  "cat": "dor",
  "cid": "R51",
  "sin": "dor de cabeca cefaleia tensional",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n3) Dimenidrinato + Piridoxina 50/10mg -------- 1 cx\nTomar 1 cp VO de 6/6h se náuseas, vômitos ou tontura.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).",
  "orient": "- Retorno imediato se: pior dor de cabeça da vida, início súbito, febre com rigidez de nuca, déficit neurológico, confusão, piora progressiva.",
  "rev": [
   "Ajustado: ibuprofeno 300mg 12/12h → 600mg 8/8h.",
   "Adicionado: sinais de alarme e opção na unidade.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Do TP et al. Red and orange flags for secondary headaches (SNOOP4) (Neurology 2019;92:134)."
  ]
 },
 {
  "id": "salvas",
  "nome": "Cefaleia em salvas",
  "cat": "dor",
  "cid": "G44.0",
  "sin": "cluster cefaleia trigeminal",
  "casa": "Uso oral (profilaxia de transição, até avaliação com neurologista)\n1) Verapamil 80mg ---------------------------- 90 cp\nTomar 1 cp VO de 8/8h.\n2) Prednisona 20mg --------------------------- 15 cp\nTomar 3 cp VO pela manhã por 5 dias (ponte até o verapamil agir).",
  "unidade": "1) O2 a 100% em máscara não reinalante, 12 a 15 L/min, por 15 a 20 min, com o paciente sentado.\n2) Sumatriptano 6mg SC (máx. 2 doses em 24h, intervalo ≥ 1h)\n   Ou Sumatriptano spray nasal 20mg (1 jato).",
  "orient": "- Encaminhar ao neurologista.\n- Evitar álcool durante o período de crises.\n- Verapamil: fazer ECG basal (risco de bloqueio AV).",
  "rev": [
   "Corrigido: máscara de Venturi não entrega 100%; usar máscara não reinalante 12–15 L/min.",
   "Adicionado: ponte com prednisona e ECG antes do verapamil."
  ],
  "fontes": [
   "Robbins MS et al. Treatment of Cluster Headache: AHS Evidence-Based Guidelines (Headache 2016;56:1093)."
  ]
 },
 {
  "id": "colica",
  "nome": "Cólica renal / biliar",
  "cat": "uro",
  "cid": "N23",
  "sin": "litiase calculo rim vesicula colelitiase nefrolitiase",
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\n2) Escopolamina + Dipirona 10/250mg (Buscopan Composto) --- 20 cp\nTomar 1 cp VO de 6/6h se dor abdominal ou febre.\n3) Tramadol 50mg ----------------------------- 10 cp\nTomar 1 cp VO de 8/8h se dor intensa que não melhora com os anteriores.\n4) Ondansetrona 8mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h se náuseas ou vômitos.\n\n# Cólica renal com cálculo ureteral distal > 5 mm (e ≤ 10 mm):\n5) Tansulosina 0,4mg ------------------------- 30 cp\nTomar 1 cp VO à noite por até 4 semanas.",
  "unidade": "1) Cetoprofeno 100 mg EV (apresentação própria para EV) em 100 mL de SF em 20–30 min, ou IM (ampola 50 mg/mL, 2 mL) — 1ª escolha na cólica renal, se sem contraindicação (DRC, gestação, sangramento, úlcera).\n2) Buscopan Composto 1 amp (5 mL) EV lenta diluída em 10–20 mL de SF, ou IM profunda\n   + Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM.\nSe persistir após 30–40 min, repetir a analgesia uma vez. Se ainda persistir:\n3) Tramadol 100 mg (2 mL) EV em 100 mL de SF em 30–60 min (infusão rápida aumenta náuseas), ou IM\n   Ou Morfina 2–4 mg EV (diluir 1 amp de 10 mg em 9 mL de AD/SF = 1 mg/mL; fazer 2–4 mL lento).",
  "orient": "- Aumentar ingestão de água.\n- Renal: retorno imediato se febre, calafrios ou redução importante da urina (obstrução infectada é emergência).\n- Biliar: retorno se febre, icterícia ou dor que não passa em 6h. Solicitar USG de abdome e encaminhar para cirurgia eletiva.\n- CID cólica biliar: K80.2.",
  "rev": [
   "Adicionado: AINE (cetoprofeno) como 1ª escolha na cólica renal.",
   "Adicionado: tansulosina para cálculo distal e morfina como alternativa.",
   "Ajustado: tramadol 12/12h → 8/8h se necessário.",
   "Ajustado (EAU 2024): tansulosina indicada para cálculo ureteral distal > 5 mm.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "EAU Guidelines on Urolithiasis, 2024 (AINE como 1ª escolha; terapia expulsiva com alfabloqueador).",
   "Pathan SA et al. Diclofenac/paracetamol/morphine in renal colic (Lancet 2016)."
  ]
 },
 {
  "id": "conjuntivite",
  "nome": "Conjuntivite",
  "cat": "orl",
  "cid": "H10.9",
  "sin": "olho vermelho secrecao ocular",
  "casa": "# Bacteriana (secreção purulenta, pálpebras coladas):\nUso oftálmico\n1) Tobramicina 0,3% colírio ------------------ 1 fr\nPingar 1 a 2 gotas no olho afetado de 6/6h por 7 dias.\n\n# Viral / irritativa:\nUso oftálmico\n1) Lágrima artificial (carmelose 0,5%) ------- 1 fr\nPingar 1 gota em cada olho de 4/4h por 7 dias.",
  "unidade": "",
  "orient": "- Compressas frias por 10–20 min, várias vezes ao dia.\n- Limpar a secreção com gaze e soro fisiológico, de dentro para fora.\n- Lavar as mãos com frequência, não compartilhar toalhas e evitar coçar os olhos.\n- Suspender lentes de contato durante o tratamento.\n- Procurar oftalmologista se dor ocular intensa, baixa da visão ou fotofobia.",
  "rev": [
   "Corrigido: removida a orientação de 'não usar soro fisiológico'; SF é adequado para limpar a secreção.",
   "Adicionado: conduta para conjuntivite viral (mais comum) e sinais de alarme."
  ],
  "fontes": [
   "American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern, 2018."
  ]
 },
 {
  "id": "constipacao",
  "nome": "Constipação",
  "cat": "gi",
  "cid": "K59.0",
  "sin": "intestino preso prisao de ventre",
  "casa": "Uso oral\n1) Lactulose 667mg/mL xarope ----------------- 1 fr\nTomar 10 a 15 mL VO de 8/8h até normalizar o hábito.\n2) Óleo mineral ------------------------------ 1 fr\nTomar 15 mL VO à noite por até 4 dias, se fezes endurecidas.",
  "unidade": "1) Buscopan Composto 1 amp EV lenta diluída em 10–20 mL de SF, ou IM (se cólica).\n2) Fosfato de sódio enema (Fleet) 1 unidade via retal, dose única\n   Ou Clister glicerinado 12% 500 mL via retal.",
  "orient": "- Aumentar água (mínimo 2 L/dia) e fibras (frutas, verduras, cereais integrais).\n- Atividade física regular; não segurar a vontade de evacuar.\n- Não usar óleo mineral em idosos acamados ou com disfagia (risco de aspiração).\n- Evitar Fleet em DRC, desidratação e idosos frágeis (preferir clister glicerinado).\n- Retorno se vômitos, distensão abdominal, parada de eliminação de gases ou sangue nas fezes.",
  "rev": [
   "Adicionado: evitar óleo mineral em idosos acamados ou com disfagia (risco de aspiração).",
   "Adicionado: evitar Fleet em DRC, desidratação e idosos frágeis (distúrbio hidroeletrolítico).",
   "Removido: metoclopramida na unidade (sem indicação na constipação).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Chang L et al. AGA–ACG Clinical Practice Guideline: Pharmacological Management of Chronic Idiopathic Constipation (Gastroenterology 2023)."
  ]
 },
 {
  "id": "convulsao",
  "nome": "Crise convulsiva / Estado de mal epiléptico",
  "cat": "dor",
  "cid": "G41.9",
  "sin": "convulsao epilepsia crise tonico clonica status",
  "casa": "",
  "unidade": "Passo 0 (0–5 min)\n1) Monitorização, O2, acesso venoso, decúbito lateral, aspiração se necessário.\n2) Glicemia capilar. Exames: Na, K, Ca, Mg, ureia, creatinina, gasometria, hemograma, ECG. TC de crânio e LCR conforme o caso.\n3) Se hipoglicemia: Glicose 50% 50 mL EV (ou Glicose 10% 150–200 mL); se etilismo/desnutrição, Tiamina 100mg EV junto, sem atrasar a glicose.\n\nPasso 1 (5 min) — benzodiazepínico\nDiazepam 10mg EV (adulto) | 0,15–0,2 mg/kg (criança, máx. 10mg). Pode repetir 1x após 5 min.\nOu Midazolam 10mg IM (> 40 kg) | 5mg IM (13–40 kg). Dose única.\n\nPasso 2 (20 min) — se persistir\nFenitoína 20 mg/kg EV em SF 0,9% (máx. 50 mg/min; monitorizar ECG e PA)\nOu Levetiracetam 60 mg/kg EV (máx. 4.500mg) em 15 min\nOu Ácido valproico 40 mg/kg EV (máx. 3.000mg) em 10 min (não usar em hepatopatia, doença mitocondrial ou gestação)\nOu Fenobarbital 20 mg/kg EV, até 50 mg/min (bula: menos de 60 mg/min); existem ampolas de 100 e de 200 mg/mL. Bula: contraindicado na gestação e na lactação, em recém-nascidos e em mulheres em idade fértil — pesar o risco na emergência\n* Obter via aérea avançada se necessário.\n\nPasso 3 (40 min) — refratário\nMidazolam 0,2 mg/kg ataque + 0,05–2 mg/kg/h\nOu Propofol 1–2 mg/kg ataque + 2–10 mg/kg/h\nOu Tiopental 3–5 mg/kg ataque + 3–5 mg/kg/h\n* IOT, EEG contínuo e UTI.",
  "orient": "- Use a aba Calculadora para doses e volumes pelo peso.",
  "rev": [
   "Atualizado: fenobarbital até 50 mg/min (bula: < 60 mg/min), duas concentrações e contraindicações da bula; retirada a cetamina do estado de mal refratário (sem dose com fonte).",
   "Ajustado: tempos seguem a diretriz da AES (5/20/40 min).",
   "Adicionado: levetiracetam e valproato como opções equivalentes no passo 2.",
   "Adicionado: tiamina antes da glicose.",
   "Corrigido (2026-10-08): tiamina junto com a glicose, sem atrasá-la, como na hipoglicemia (Schabelman e Kuo, J Emerg Med 2012;42:488).",
   "Corrigido: midazolam IM é dose única no ESETT/RAMPART; manutenção do propofol 2–10 mg/kg/h."
  ],
  "fontes": [
   "Schabelman E, Kuo D. Glucose before thiamine for Wernicke encephalopathy: a literature review (J Emerg Med 2012;42:488).",
   "Bula Anvisa do Depacon (valproato de sódio injetável): contraindicado em hepatopatia, doença mitocondrial (POLG), distúrbio do ciclo da ureia e porfiria.",
   "Brophy GM et al. Guidelines for the evaluation and management of status epilepticus — Neurocritical Care Society (Neurocrit Care 2012;17:3): fenobarbital 20 mg/kg.",
   "Bula da escetamina: Ketanest S (União Europeia) — indução 0,5–1 mg/kg EV; Ketamin (Cristália), bula Anvisa — potência cerca de 2 vezes a da cetamina racêmica.",
   "Bula do fenobarbital injetável (Fenocris, Cristália; Carbital 200 mg/mL), Anvisa.",
   "Glauser T et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus — AES (Epilepsy Curr 2016;16:48).",
   "Kapur J et al. ESETT: levetiracetam, fosfenitoína ou valproato (N Engl J Med 2019;381:2103).",
   "Silbergleit R et al. RAMPART: midazolam IM vs lorazepam EV (N Engl J Med 2012)."
  ]
 },
 {
  "id": "iot",
  "nome": "Sequência rápida de intubação (IOT)",
  "cat": "emerg",
  "cid": "",
  "sin": "intubacao via aerea sri sequencia rapida",
  "casa": "",
  "unidade": "1. Indicações: insuficiência respiratória, Glasgow ≤ 8, proteção de via aérea, falha de outros métodos.\n\n2. Material (checar e testar): laringoscópio, lâminas, tubos (7,0–8,0 adulto), fio-guia, seringa 10 mL, AMBU com reservatório, aspirador, capnógrafo, bougie, dispositivo supraglótico de resgate.\n\n3. Técnica\n1) Pré-oxigenação: 3 min com FiO2 100% (máscara com reservatório ou VNI).\n2) Posicionamento: coxim occipital + extensão da cabeça (orelha alinhada ao esterno — \"sniff\").\n3) Pré-tratamento (opcional): Fentanil 1–3 mcg/kg EV lento.\n4) Indução:\n   • Etomidato 0,3 mg/kg (preferir se instabilidade hemodinâmica)\n   • Escetamina (Ketamin, forma predominante no Brasil) 0,5–1 mg/kg (instabilidade ou broncoespasmo)\n   • Propofol 1–2 mg/kg (evitar se hipotensão)\n   • Midazolam 0,1–0,3 mg/kg (início lento; hipotensão)\n5) Bloqueio neuromuscular:\n   • Succinilcolina 1,5 mg/kg — contraindicada em hipercalemia, história de hipertermia maligna, doença neuromuscular, queimadura/esmagamento/denervação após 24–72h.\n   • Rocurônio 1,2 mg/kg.\n6) Aguardar 45–60 s. Laringoscopia com a mão esquerda, lâmina pela direita afastando a língua, ponta na valécula, tração para frente e para cima.\n7) Confirmar: capnografia (padrão-ouro) + expansão torácica + ausculta (epigástrio, bases, ápices).\n8) Pós-IOT: fixar tubo, RX de tórax, proteção ocular, sedoanalgesia contínua, ventilação protetora (6 mL/kg de peso predito).\n\nResumo de diluições (adulto ~70 kg)\n• Fentanil 50 mcg/mL: 2 mcg/kg → ~3 mL\n• Midazolam 5 mg/mL: 0,2 mg/kg → ~3 mL | 1 mg/mL: ~14 mL\n• Etomidato 2 mg/mL: 0,3 mg/kg → ~10 mL\n• Escetamina 50 mg/mL: 0,5–1 mg/kg → ~0,7–1,4 mL\n• Propofol 10 mg/mL: 1,5 mg/kg → ~10 mL\n• Succinilcolina 100mg + 10 mL AD (10 mg/mL): 1,5 mg/kg → ~10 mL\n• Rocurônio 10 mg/mL: 1,2 mg/kg → ~8,5 mL",
  "orient": "- Use a aba Calculadora para o volume exato pelo peso.",
  "rev": [
   "Atualizado: cetamina racêmica trocada por escetamina (Ketamin), forma predominante no Brasil, 0,5–1 mg/kg na indução (cerca de 2 vezes mais potente).",
   "Atualizado: fontes de via aérea para DAS 2025 e diretriz de sequência rápida da SCCM 2023.",
   "Corrigido: succinilcolina 1,5–2 mg/kg no resumo → 1,5 mg/kg (padronizado com a técnica).",
   "Corrigido: posição olfativa é extensão da cabeça sobre o pescoço, não hiperextensão cervical.",
   "Adicionado: capnografia como padrão-ouro de confirmação e cuidados pós-IOT.",
   "Ajustado: contraindicação da succinilcolina (queimadura/lesão após 24–72h, não 48h fixas)."
  ],
  "fontes": [
   "Bula da escetamina: Ketanest S (União Europeia) — indução 0,5–1 mg/kg EV; Ketamin (Cristália), bula Anvisa — potência cerca de 2 vezes a da cetamina racêmica.",
   "Ahmad I et al. Difficult Airway Society 2025 guidelines for unanticipated difficult intubation in adults (Br J Anaesth 2026;136:283).",
   "Acquisto NM et al. SCCM Clinical Practice Guidelines for Rapid Sequence Intubation in the Critically Ill Adult Patient (Crit Care Med 2023;51:1411).",
   "Doses de indução e bloqueio: bulas e Walls RM. Manual of Emergency Airway Management."
  ]
 },
 {
  "id": "has",
  "nome": "Crise hipertensiva (urgência / emergência)",
  "cat": "cardio",
  "cid": "I10",
  "sin": "pressao alta pa elevada has hipertensao urgencia emergencia",
  "casa": "Uso oral\n1) Manter os anti-hipertensivos de uso contínuo, nas doses corretas.\n2) Furosemida 40mg --------------------------- 5 cp\nTomar 1 cp VO pela manhã, somente se edema ou congestão (conforme avaliação).",
  "unidade": "# PA elevada sem sintomas e sem lesão de órgão-alvo:\nRepouso 20–30 min em ambiente calmo, tratar dor/ansiedade e remedir. Ajustar medicação oral. Não é urgência.\n\n# Elevação importante da PA sem lesão de órgão-alvo (antiga \"urgência hipertensiva\"):\n1) Captopril 25mg 1 a 2 cp VO (não sublingual). Reavaliar PA em 1h.\n   Ou Clonidina 0,1–0,2mg VO. Reavaliar em 1h.\nMeta: reduzir gradualmente em 24–48h. Alta com ajuste da medicação e retorno em até 7 dias.\n\n# Emergência hipertensiva (LOA aguda: EAP, SCA, AVC, dissecção, encefalopatia, eclâmpsia):\n1) Monitorização, acesso venoso, ECG, troponina, creatinina, EAS, fundo de olho.\n2) Nitroprussiato de sódio 50mg/2mL (1 amp) + SG 5% 248 mL (200 mcg/mL) em BIC:\n   Iniciar 0,3–0,5 mcg/kg/min, aumentar 0,5 mcg/kg/min a cada 5 min (máx. 10 mcg/kg/min).\n3) Nitroglicerina 50mg/10mL (1 amp) + SG 5% 240 mL (200 mcg/mL) em BIC — preferir em SCA e EAP:\n   Iniciar 5 mcg/min (1,5 mL/h), aumentar 5 mcg/min a cada 3–5 min (ACC/AHA 2017 cita máx. 20 mcg/min na emergência hipertensiva; no EAP, a ESC 2021 admite até 200 mcg/min).\nMeta: reduzir a PA em até 25% na 1ª hora, para 160/100–110 em 2–6h e 135/85 em 24–48h (exceto dissecção de aorta: PAS < 120 em 20 min; AVC e pré-eclâmpsia têm metas próprias).",
  "orient": "- Uso correto e diário dos anti-hipertensivos; reduzir sal.\n- Retorno com clínico ou cardiologista para ajuste.\n- Retorno imediato se dor no peito, falta de ar, fraqueza em um lado do corpo, alteração da fala ou da visão.",
  "rev": [
   "Removido: captopril sublingual (sem vantagem e com risco de queda abrupta da PA — Diretriz Brasileira de HA 2020).",
   "Removido: hidralazina VO (sem papel na urgência).",
   "Unificado: as duas seções de crise hipertensiva do modelo.",
   "Adicionado: doses e titulação de nitroprussiato e nitroglicerina; metas de redução.",
   "Atualizado (DBHA 2025): \"urgência hipertensiva\" passou a ser \"elevação importante da PA sem lesão de órgão-alvo\".",
   "Ajustado: doses iniciais de nitroprussiato e nitroglicerina conforme a tabela da ACC/AHA 2017; metas por etapa do Posicionamento Luso-Brasileiro 2020."
  ],
  "fontes": [
   "SBC. Diretriz Brasileira de Hipertensão Arterial 2025 (Arq Bras Cardiol). https://www.scielo.br/j/abc/a/BXT7Vk4B9VKQnJFsJhgJ4Hn/?lang=pt",
   "Posicionamento Luso-Brasileiro de Emergências Hipertensivas, 2020 (Arq Bras Cardiol). https://www.scielo.br/j/abc/a/N95NCgGxk7wHmm6JPv5H4tN/?lang=pt",
   "Whelton PK et al. 2017 ACC/AHA Hypertension Guideline (tabela de fármacos EV)."
  ]
 },
 {
  "id": "dengue",
  "nome": "Dengue (grupos A, B, C e D)",
  "cat": "toxinf",
  "cid": "A90",
  "sin": "arbovirose febre chikungunya zika",
  "casa": "# Grupos A e B (após hemograma normal no grupo B)\nUso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Paracetamol 500mg ------------------------- 20 cp\nTomar 1 a 2 cp VO de 6/6h se febre persistir (intercalar com a dipirona; máx. 3 g/dia).\n3) Ondansetrona 8mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h se náuseas ou vômitos.\n4) Sais de reidratação oral ------------------ 10 envelopes\nDiluir 1 envelope em 1 L de água filtrada e beber ao longo do dia.\n\nHidratação oral:\n- Adulto: 60 mL/kg/dia, 1/3 com SRO; oferecer 1/3 do volume nas primeiras 4–6h.\n- Criança < 13 anos: até 10 kg 130 mL/kg/dia | 10–20 kg 100 mL/kg/dia | > 20 kg 80 mL/kg/dia.",
  "unidade": "Classificação e conduta (MS 2024):\n\n# Grupo A — sem sinais de alarme, sem sangramento, prova do laço negativa, sem comorbidades nem condição especial\n- Tratamento ambulatorial com hidratação oral. Hemograma a critério; NS1 até o 5º dia ou sorologia após o 6º.\n- Reavaliar no 1º dia sem febre (ou no 5º dia se a febre persistir).\n\n# Grupo B — sangramento de pele espontâneo ou prova do laço positiva, ou condição especial (gestante, lactente, idoso, comorbidades) ou risco social, sem sinais de alarme\n- Hemograma obrigatório; aguardar o resultado em observação, com hidratação oral.\n- Hematócrito normal: tratar como grupo A com reavaliação diária até 48h sem febre.\n- Hemoconcentração: conduzir como grupo C.\n\n# Grupo C — sinais de alarme, sem choque\n(dor abdominal intensa, vômitos persistentes, acúmulo de líquidos, hipotensão postural, hepatomegalia > 2 cm, sangramento de mucosa, letargia/irritabilidade, aumento progressivo do hematócrito)\n- Exames: hemograma, albumina, transaminases, tipagem; RX de tórax, gasometria, eletrólitos, ureia, creatinina, coagulograma conforme o caso.\n- Expansão: SF 0,9% 10 mL/kg/h na 1ª e na 2ª hora (máx. 20 mL/kg em 2h). Reavaliar a cada hora; hematócrito após 2h.\n- Melhora: manutenção 25 mL/kg em 6h, depois 25 mL/kg em 8h.\n- Sem melhora: repetir a expansão até 3 vezes; persistindo, conduzir como grupo D.\n- Internação por pelo menos 48h.\n\n# Grupo D — choque, sangramento grave ou disfunção grave de órgão\n(PA convergente — diferencial < 20 mmHg, hipotensão, taquicardia, pulso fraco, enchimento capilar > 2 s, extremidades frias, oligúria)\n- SF 0,9% 20 mL/kg em 20 min, até 3 vezes; reavaliar a cada 15–30 min; hematócrito após 2h.\n- Melhora: conduzir como grupo C.\n- Persistência do choque com hematócrito em alta: albumina 0,5–1 g/kg.\n- Hematócrito em queda com choque: investigar sangramento/coagulopatia; concentrado de hemácias 10–15 mL/kg.\n- Plaquetas só se sangramento persistente com trombocitopenia e INR > 1,5.\n- UTI por pelo menos 48h.\n\nSintomáticos na unidade:\n1) Dipirona 1 g EV lenta (diluída em 10–20 mL de SF) + Ondansetrona 4 mg EV lenta.\n(Evitar medicação IM na dengue — risco de hematoma.)",
  "orient": "- Não usar anti-inflamatórios nem AAS (ibuprofeno, diclofenaco, cetoprofeno, nimesulida etc.).\n- Repouso e alimentação leve.\n- Retorno para reavaliação no 1º dia sem febre (fase crítica).\n- Retorno imediato se: dor abdominal intensa, vômitos persistentes, sangramentos, tontura ao levantar, sonolência ou irritabilidade, diminuição da urina.\n- Doença de notificação compulsória. Entregar cartão de acompanhamento.",
  "rev": [
   "Removido: Enterogermina (sem indicação na dengue).",
   "Adicionado: evitar IM, retorno no dia da defervescência e notificação.",
   "Corrigido: hidratação 80 → 60 mL/kg/dia (MS 2024, grupo A adulto).",
   "Adicionado: grupos B, C e D completos e hidratação oral da criança (MS 2024)."
  ],
  "fontes": [
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024.",
   "Protocolo de manejo clínico da dengue (Bauru, nov/2024), reproduzindo MS 6ª ed. 2024. https://www2.bauru.sp.gov.br/arquivos/pmb_arquivos/site_conteudo//conteudo_856/MANEJO_CL%C3%8DNICO_DENGUE._Vers%C3%A3o_29.11.2024.pdf"
  ]
 },
 {
  "id": "dermatite",
  "nome": "Dermatite / Alergia de pele",
  "cat": "pele",
  "cid": "L23.9",
  "sin": "alergia pele coceira prurido eczema dermatite contato",
  "casa": "Uso oral\n1) Loratadina 10mg --------------------------- 7 cp\nTomar 1 cp VO 1x ao dia por 7 dias.\nOu\n1) Levocetirizina 5mg ------------------------ 7 cp\nTomar 1 cp VO à noite por 7 dias.\n\nUso tópico\n2) Dexclorfeniramina + Betametasona creme ---- 1 bisnaga\nAplicar fina camada na região afetada 2x ao dia por 7 dias (na face, no máx. 5 dias).",
  "unidade": "",
  "orient": "- Evitar o agente desencadeante; usar sabonete neutro e hidratante.",
  "rev": [],
  "evid": "Baseado em consenso clínico; corticoide tópico é o pilar da dermatite de contato.",
  "fontes": [
   "Consenso clínico; ver Fonacier L et al. Contact dermatitis: a practice parameter update (J Allergy Clin Immunol Pract 2015)."
  ]
 },
 {
  "id": "alergia-grave",
  "nome": "Reação alérgica moderada (sem anafilaxia)",
  "cat": "emerg",
  "cid": "T78.4",
  "sin": "alergia grave angioedema urticaria extensa",
  "casa": "Uso oral\n1) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.\n2) Loratadina 10mg --------------------------- 7 cp\nTomar 1 cp VO 1x ao dia por 7 dias.",
  "unidade": "1) Prometazina 50 mg/2 mL (Fenergan) 1 amp: somente IM profunda (via EV pode causar lesão tecidual grave).\n2) Hidrocortisona 500 mg: reconstituir e aplicar EV lenta ou em 100 mL de SF em 30–60 min, ou IM\n   Ou Metilprednisolona 125mg/2mL 1 amp EV.\n* Se houver critério de anafilaxia (hipotensão, broncoespasmo, estridor, acometimento de 2 sistemas), seguir o protocolo de anafilaxia: adrenalina IM é a 1ª droga.",
  "orient": "- Observar por pelo menos 2–4h.\n- Retorno imediato se falta de ar, inchaço de lábios/língua ou tontura.",
  "rev": [
   "Adicionado: alerta de que anafilaxia exige adrenalina IM, não anti-histamínico/corticoide.",
   "Adicionado: receita de alta.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020)."
  ]
 },
 {
  "id": "anafilaxia",
  "nome": "Anafilaxia",
  "cat": "emerg",
  "cid": "T78.2",
  "sin": "choque anafilatico adrenalina edema glote",
  "casa": "Uso oral (alta após observação)\n1) Loratadina 10mg --------------------------- 5 cp\nTomar 1 cp VO 1x ao dia, se coceira ou urticária.",
  "unidade": "1) Adrenalina 1 mg/mL: 0,01 mg/kg IM no vasto lateral da coxa (máx. 0,5 mg = 0,5 mL no adulto; 0,3 mg na criança).\n   Repetir a cada 5 min se não houver melhora.\n2) Deitado com as pernas elevadas (sentado se a falta de ar piorar deitado; gestante em decúbito lateral esquerdo). Não levantar bruscamente.\n3) O2 em máscara com reservatório 10–15 L/min.\n4) SF 0,9% 20 mL/kg EV rápido se hipotensão (máx. 1.000 mL por bolus no adulto; repetir conforme a resposta).\n5) Broncoespasmo persistente: Salbutamol 4–8 jatos ou nebulização.\n6) Refratária (sem melhora após 2 doses IM): adrenalina em infusão — 1 mg em 100 mL de SF 0,9% (10 mcg/mL) a 0,5–1 mL/kg/h, em via exclusiva (pode ser periférica), e UTI. Manter a adrenalina IM a cada 5 min até a infusão começar.\n7) Em uso de betabloqueador e sem resposta: glucagon 1 mg EV; pode repetir ou seguir com infusão de 1–2 mg/h.\n8) Depois de estabilizado (não substituem a adrenalina):\n   - Anti-histamínico só para sintomas de pele: loratadina 10 mg VO; sem via oral, prometazina 25–50 mg IM profunda (máx. 100 mg/dia).\n   - Corticoide não é rotina: considerar se asma, broncoespasmo persistente ou reação refratária — hidrocortisona 200 mg EV ou metilprednisolona 1–2 mg/kg EV (máx. 125 mg).",
  "orient": "- Observação após a melhora: mínimo de 6 h. Alta em 2 h só se todos: adrenalina dada até 30 min do início, resposta em 5–10 min, resolução completa, adrenalina autoinjetável em mãos com treino e supervisão após a alta (RCUK). 12 h se reação grave (mais de 2 doses), asma grave, possível absorção continuada do alérgeno, chegada tarde da noite ou dificuldade de voltar à emergência.\n- Antes da alta: levantar e checar tontura ou queda da PA ao ficar em pé.\n- Evitar o agente causador; encaminhar ao alergista; adrenalina autoinjetável, se disponível.\n- Retorno imediato se falta de ar, rouquidão, inchaço na boca ou garganta, tontura ou desmaio.",
  "rev": [
   "Ajustado (2026-10-08): volume 20 mL/kg com teto de 1.000 mL por bolus no adulto (RCUK 2021: 500–1.000 mL), por decisão do médico.",
   "Corrigido (2026-10-08): glucagon no adulto 1 mg EV, repetível ou seguido de 1–2 mg/h; repetir a cada 5 min é a orientação pediátrica (RCUK 2021).",
   "Atualizado (RCUK 2021, WAO 2020, AAAAI 2023): corticoide deixa de ser rotina; observação estratificada em 2, 6 ou 12 h; infusão periférica de adrenalina na refratária; glucagon no betabloqueado; prednisona na alta retirada; prometazina 25–50 mg (máx. 100 mg/dia).",
   "Adicionado: expansão volêmica, posicionamento, broncodilatador e infusão de adrenalina na refratária.",
   "Simplificado: corticoide em dose única EV em vez da diluição para 6/6h.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Resuscitation Council UK. Emergency treatment of anaphylaxis: guidelines for healthcare providers, 2021. https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis",
   "Golden DBK et al. Anaphylaxis: a 2023 practice parameter update (Ann Allergy Asthma Immunol 2024;132:124).",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 11 — Anafilaxia.",
   "Bula do Fenergan (prometazina) injetável registrada na Anvisa: 25–50 mg IM profunda, máx. 100 mg/dia.",
   "Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020).",
   "Shaker MS et al. Anaphylaxis — a 2020 practice parameter update (J Allergy Clin Immunol 2020)."
  ]
 },
 {
  "id": "dip",
  "nome": "Doença inflamatória pélvica (DIP)",
  "cat": "gu",
  "cid": "N73.9",
  "sin": "dip anexite salpingite dor pelvica",
  "casa": "Uso oral\n1) Doxiciclina 100mg ------------------------- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias.\n2) Metronidazol 250mg ------------------------ 56 cp\nTomar 2 cp VO de 12/12h por 14 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n\nParceria sexual:\nCeftriaxona 500mg IM dose única + Azitromicina 1g VO dose única.",
  "unidade": "1) Ceftriaxona 500 mg IM, dose única (diluente com lidocaína da apresentação IM).\n2) Beta-hCG antes de iniciar.",
  "orient": "- Não ingerir álcool durante o metronidazol e até 48h após.\n- Abstinência sexual até o fim do tratamento do casal.\n- Reavaliar em 72h; se não melhorar, internar.\n- Internar se: gestante, abscesso tubo-ovariano, febre alta, vômitos, sem resposta em 72h.\n- Ofertar testes rápidos de HIV, sífilis, hepatites B e C.",
  "rev": [
   "Corrigido: ceftriaxona 250mg → 500mg IM (PCDT-IST MS 2022).",
   "Corrigido: parceria deve receber ceftriaxona + azitromicina, não apenas azitromicina.",
   "Adicionado: beta-hCG, critérios de internação e reavaliação em 72h.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Ministério da Saúde. PCDT Atenção Integral às Pessoas com IST, 2022."
  ]
 },
 {
  "id": "dismenorreia",
  "nome": "Dismenorreia",
  "cat": "gu",
  "cid": "N94.6",
  "sin": "colica menstrual",
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias, iniciar no 1º dia do ciclo.\nOu\n1) Ácido mefenâmico 500mg -------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\n2) Paracetamol + Codeína 500/30mg (Paco) ----- 12 cp\nTomar 1 cp VO de 8/8h se dor forte.",
  "unidade": "1) Cetoprofeno 100 mg IM (ampola 50 mg/mL, 2 mL) ou EV (apresentação própria para EV, em 100 mL de SF em 20–30 min)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Calor local. Se dor progressiva ou refratária, investigar endometriose com ginecologista.",
  "rev": [
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Burnett M, Lemyre M. SOGC Guideline No. 345: Primary Dysmenorrhea Consensus (J Obstet Gynaecol Can 2017)."
  ]
 },
 {
  "id": "dispepsia",
  "nome": "Dispepsia / DRGE / Gastrite / Epigastralgia",
  "cat": "gi",
  "cid": "K30",
  "sin": "azia queimacao estomago refluxo epigastrio gastrite",
  "casa": "Uso oral\n1) Omeprazol 20mg ---------------------------- 28 cp\nTomar 1 cp VO em jejum, 30 min antes do café da manhã, por 4 semanas.\n2) Domperidona 10mg -------------------------- 21 cp\nTomar 1 cp VO 3x ao dia, 15–30 min antes das refeições, por até 7 dias.\nOu\n2) Bromoprida 10mg --------------------------- 21 cp\nTomar 1 cp VO 3x ao dia, 30 min antes das refeições, por até 7 dias.\n3) Hidróxido de alumínio suspensão ----------- 1 fr\nTomar 10 mL VO 1h após as refeições e ao deitar, se azia, por até 7 dias.",
  "unidade": "1) Omeprazol 40 mg EV: reconstituir no diluente próprio (10 mL) e aplicar lento, ou diluir em 100 mL de SF e correr em 20–30 min.\n2) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM.",
  "orient": "- Fracionar refeições, evitar deitar até 2h após comer, reduzir álcool, café, frituras e cigarro.\n- Evitar anti-inflamatórios.\n- Encaminhar para EDA se: idade ≥ 60 anos (ACG/CAG 2017), perda de peso, anemia, disfagia, vômitos persistentes, sangramento.\n- CID: DRGE K21.9 | Gastrite K29.7.",
  "rev": [
   "Removido: texto de HMA que estava colado no meio da prescrição.",
   "Corrigido: domperidona limitada a 7 dias (risco de arritmia) e digitação ('três vezles').",
   "Adicionado: sinais de alarme para EDA.",
   "Ajustado: idade para EDA de rotina ≥ 60 anos (ACG/CAG 2017), além dos sinais de alarme.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Moayyedi PM et al. ACG and CAG Clinical Guideline: Management of Dyspepsia (Am J Gastroenterol 2017).",
   "EMA 2014: restrição da domperidona (dose e duração)."
  ]
 },
 {
  "id": "lombalgia",
  "nome": "Lombalgia / Dorsalgia / Dor muscular",
  "cat": "dor",
  "cid": "M54.5",
  "sin": "dor nas costas lombar muscular mialgia contratura",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.\nOu\n1) Paracetamol 750mg ------------------------- 20 cp\nTomar 1 cp VO de 6/6h se dor.\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\n3) Ciclobenzaprina 5mg ----------------------- 10 cp\nTomar 1 cp VO à noite por 10 dias.\n4) Tramadol 50mg ----------------------------- 10 cp\nTomar 1 cp VO de 8/8h somente se dor intensa.",
  "unidade": "1) Cetoprofeno 100 mg IM (ampola 50 mg/mL, 2 mL) ou EV (apresentação própria para EV, em 100 mL de SF em 20–30 min)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Dexametasona 4 mg IM ou EV lenta (opcional; benefício pequeno).",
  "orient": "- Manter-se ativo, evitar repouso absoluto; calor local.\n- Retorno imediato se: perda de força nas pernas, alteração urinária/fecal, anestesia em sela, febre, trauma, câncer prévio, perda de peso.\n- CID dorsalgia M54.9 | mialgia M79.1.",
  "rev": [
   "Ajustado: tramadol somente se dor intensa (não fixo por 5 dias).",
   "Adicionado: sinais de alarme (bandeiras vermelhas).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Qaseem A et al. ACP Guideline: Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain (Ann Intern Med 2017)."
  ]
 },
 {
  "id": "tinea",
  "nome": "Dermatofitose interdigital (Tinea pedis)",
  "cat": "pele",
  "cid": "B35.3",
  "sin": "frieira pe de atleta micose",
  "casa": "Uso tópico\n1) Clotrimazol 1% creme ---------------------- 1 bisnaga\nAplicar fina camada entre os dedos 2x ao dia por 4 semanas (manter 1 semana após a melhora).",
  "unidade": "",
  "orient": "- Secar bem entre os dedos após o banho; trocar meias diariamente; calçados arejados.",
  "rev": [
   "Ajustado: 14 dias → 4 semanas.",
   "Removido: dipirona IM na unidade (sem indicação)."
  ],
  "fontes": [
   "Crawford F, Hollis S. Topical treatments for fungal infections of the skin and nails of the foot (Cochrane 2007;CD001434)."
  ]
 },
 {
  "id": "dpoc",
  "nome": "DPOC exacerbada",
  "cat": "resp",
  "cid": "J44.1",
  "sin": "enfisema bronquite cronica exacerbacao",
  "casa": "Uso oral\n1) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.\n2) Azitromicina 500mg ------------------------ 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias (se escarro purulento ou aumento do volume).\nOu\n2) Amoxicilina + Clavulanato 875/125mg ------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\n\nUso inalatório\n3) Salbutamol 100mcg spray ------------------- 1 fr\nInalar 2 a 4 jatos com espaçador de 4/4h a 6/6h se falta de ar.",
  "unidade": "1) Nebulização: Fenoterol 5mg/mL 10 gotas + Brometo de ipratrópio 0,25mg/mL 40 gotas em 3–5 mL de SF 0,9%. Repetir a cada 20 min até 3x se necessário.\n   (Nebulizar com ar comprimido em hipercápnicos.)\n2) Prednisona 40mg VO ou Hidrocortisona 100mg EV.\n3) O2 com alvo de SatO2 88–92%.\n4) Gasometria se SatO2 < 88%, sonolência ou uso de musculatura acessória (considerar VNI).",
  "orient": "- Manter as medicações inalatórias de uso contínuo.\n- Retorno imediato se piora da falta de ar, sonolência ou lábios roxos.",
  "rev": [
   "Corrigido: ipratrópio 5 gotas → 40 gotas (0,5mg); fenoterol 10 gotas.",
   "Adicionado: alvo de SatO2 88–92% e critérios de gasometria/VNI.",
   "Ajustado (GOLD): prednisona 40mg 1x/dia; antibiótico se escarro purulento."
  ],
  "fontes": [
   "Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2025 Report. https://goldcopd.org"
  ]
 },
 {
  "id": "enterobiase",
  "nome": "Enterobíase (oxiúros)",
  "cat": "gi",
  "cid": "B80",
  "sin": "oxiurus verme coceira anal",
  "casa": "Uso oral\n1) Albendazol 400mg -------------------------- 2 cp\nTomar 1 cp VO em dose única e repetir após 14 dias.",
  "unidade": "",
  "orient": "- Tratar todos os contatos domiciliares.\n- Lavar roupas de cama e toalhas em água quente; cortar as unhas; lavar as mãos.",
  "rev": [
   "Removido: dipirona IM para prurido anal (dipirona não trata prurido)."
  ],
  "fontes": [
   "CDC. Enterobiasis — Treatment. Ministério da Saúde. Guia de Doenças Infecciosas e Parasitárias."
  ]
 },
 {
  "id": "hiperglicemia",
  "nome": "Hiperglicemia (correção com insulina regular)",
  "cat": "endo",
  "cid": "R73.9",
  "sin": "glicemia alta diabetes dm insulina",
  "casa": "",
  "unidade": "Insulina regular SC conforme glicemia capilar:\n180–200 mg/dL: 2 UI\n201–250 mg/dL: 4 UI\n251–300 mg/dL: 6 UI\n301–350 mg/dL: 8 UI\n351–400 mg/dL: 10 UI\n> 400 mg/dL: 12 UI e avisar o médico\n\n* Se glicemia > 250 com vômitos, dor abdominal, taquipneia ou rebaixamento: investigar CAD/EHH (gasometria, cetonúria, eletrólitos). Não tratar só com escala SC.",
  "orient": "- Escala isolada de insulina é desencorajada no paciente internado (ADA): serve só para correção pontual no pronto atendimento.\n- Revisar adesão e ajustar a medicação de uso contínuo com o clínico.\n- CID: DM2 descompensado E11.9.",
  "rev": [
   "Adicionado: alerta para cetoacidose/estado hiperosmolar."
  ],
  "fontes": [
   "American Diabetes Association. Standards of Care in Diabetes—2025, seção 16 (Diabetes Care in the Hospital)."
  ]
 },
 {
  "id": "hipoglicemia",
  "nome": "Hipoglicemia",
  "cat": "endo",
  "cid": "E16.2",
  "sin": "glicemia baixa hipo",
  "casa": "",
  "unidade": "Glicemia < 70 mg/dL:\n\n# Consciente e capaz de engolir:\n15–20g de carboidrato VO (1 copo de suco ou 1 colher de sopa de açúcar em água). Repetir a glicemia em 15 min.\n\n# Rebaixado ou sem via oral:\n1) Tiamina 100mg EV (se etilismo ou desnutrição), junto com a glicose — não atrasar a glicose.\n2) Glicose 50% 40–50 mL EV em veia calibrosa (4–5 amp de 10 mL)\n   Ou Glicose 10% 150–250 mL EV.\n3) Repetir a glicemia em 15 min e manter SG 10% se necessário.",
  "orient": "- Após recuperação, alimentar o paciente.\n- Hipoglicemia por sulfonilureia (glibenclamida, gliclazida) ou insulina NPH: observação prolongada (pode recorrer).",
  "rev": [
   "Corrigido: tiamina junto com a glicose, sem atrasá-la (Schabelman 2012), em vez de antes.",
   "Unificado: as duas seções de hipoglicemia do modelo.",
   "Corrigido: 1 amp de glicose 50% diluída em 100 mL de SF em 10–15 min era dose insuficiente; padronizado 40–50 mL de glicose 50%.",
   "Adicionado: via oral no consciente e tiamina."
  ],
  "fontes": [
   "American Diabetes Association. Standards of Care in Diabetes—2025, seção 6 (Glycemic Goals and Hypoglycemia)."
  ]
 },
 {
  "id": "enxaqueca",
  "nome": "Enxaqueca / Migrânea",
  "cat": "dor",
  "cid": "G43.9",
  "sin": "migranea dor de cabeca pulsatil",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n3) Naratriptana 2,5mg ------------------------ 4 cp\nTomar 1 cp VO no início da crise. Pode repetir após 4h. Máx. 2 cp/dia.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n2) Dexametasona 10 mg EV lenta ou IM (reduz recorrência nas 72h).\n   (Alternativa IM: Dipirona 1g IM + Dexametasona 4mg IM + Ondansetrona 4mg IM.)",
  "orient": "- Triptano contraindicado em doença coronariana, AVC prévio e HAS não controlada.\n- Diário de crises; evitar uso de analgésico > 10 dias/mês (cefaleia por abuso).",
  "rev": [
   "Adicionado: metoclopramida EV (antiemético com efeito antimigranoso) e dexametasona 10mg para evitar recorrência.",
   "Adicionado: contraindicações do triptano.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Orr SL et al. Management of Adults With Acute Migraine in the ED: AHS Evidence Assessment (Headache 2016;56:911).",
   "Ailani J et al. AHS Consensus Statement 2021 (triptanos e contraindicações)."
  ]
 },
 {
  "id": "escabiose",
  "nome": "Escabiose / Sarna",
  "cat": "pele",
  "cid": "B86",
  "sin": "sarna coceira noturna",
  "casa": "Uso tópico\n1) Permetrina 5% loção/creme ----------------- 1 fr\nAplicar à noite do pescoço aos pés (incluir entre dedos e sob unhas), deixar agir 8–12h e remover no banho. Repetir após 7 dias.\n\nUso oral (casos extensos, falha do tópico ou surtos)\n2) Ivermectina 6mg --------------------------- conforme peso\nTomar dose de 200 mcg/kg (≈ 1 cp a cada 30 kg) VO em dose única, em jejum. Repetir após 7 dias.\n\n3) Hidroxizina 25mg -------------------------- 20 cp\nTomar 1 cp VO à noite (ou de 8/8h) se coceira.",
  "unidade": "",
  "orient": "- Tratar todos os contatos ao mesmo tempo.\n- Lavar roupas de cama e de uso em água quente ou guardar em saco fechado por 72h.\n- A coceira pode persistir 2–4 semanas após o tratamento correto.\n- Ivermectina: não usar em gestantes nem em < 15 kg.",
  "rev": [
   "Corrigido: ivermectina '3 cp' fixos → dose por peso (200 mcg/kg). Use a Calculadora.",
   "Trocado: dipirona IM para prurido → hidroxizina VO."
  ],
  "fontes": [
   "Salavastru CM et al. European guideline for the management of scabies — IUSTI (J Eur Acad Dermatol Venereol 2017)."
  ]
 },
 {
  "id": "erisipela",
  "nome": "Erisipela / Celulite",
  "cat": "pele",
  "cid": "A46",
  "sin": "celulite perna vermelha infeccao pele",
  "casa": "Uso oral\n1) Cefalexina 500mg -------------------------- 20 cp\nTomar 1 cp VO de 6/6h por 5 dias (estender até 10 dias se não houver melhora).\nOu\n1) Amoxicilina 500mg ------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias (erisipela típica; estender se não houver melhora).\n(Não encontrei diretriz com amoxicilina de 12/12h para erisipela.)\nOu (alergia a penicilina)\n1) Clindamicina 300mg ------------------------ 15 cp\nTomar 1 cp VO de 8/8h por 5 dias (estender se não houver melhora).\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Marcar a borda da lesão com caneta para acompanhar a evolução.\n* Internar para ATB EV (oxacilina/cefazolina) se: sinais sistêmicos, falha em 48–72h, imunossupressão, face extensa, ou não conseguir VO.",
  "orient": "- Repouso com o membro elevado.\n- Tratar a porta de entrada (frieira, ferida).\n- Retorno em 48–72h ou antes se febre, bolhas, dor desproporcional ou lesão avançando além da marca.",
  "rev": [
   "Removido: neomicina + bacitracina tópica (sem papel na erisipela).",
   "Removido: ibuprofeno (pode mascarar infecção necrosante; opcional).",
   "Trocado: ceftriaxona IM de rotina → critérios de internação.",
   "Ajustado (IDSA 2014): duração de 10 → 5 dias, estendendo se não houver melhora.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014)."
  ]
 },
 {
  "id": "ferida",
  "nome": "Escoriação / Ferida leve",
  "cat": "pele",
  "cid": "T14.0",
  "sin": "ferimento machucado arranhao corte",
  "casa": "Uso tópico\n1) Soro fisiológico 0,9% --------------------- 1 fr\nLavar o local 2x ao dia antes do curativo.\n2) Sulfadiazina de prata 1% creme ------------ 1 bisnaga\nAplicar fina camada na lesão 1 a 2x ao dia até cicatrizar (se lesão extensa ou exsudativa).\n\nUso oral\n3) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor.",
  "unidade": "1) Limpeza com SF 0,9% + curativo.\n2) Verificar vacina antitetânica (ver \"Tétano / Feridas\").",
  "orient": "- Manter limpo e seco. Retorno se vermelhidão, calor, pus ou febre.",
  "rev": [
   "Adicionado: checagem da vacina antitetânica."
  ],
  "fontes": [
   "Consenso clínico; profilaxia antitetânica conforme Ministério da Saúde (Guia de Vigilância em Saúde)."
  ]
 },
 {
  "id": "faringite",
  "nome": "Faringite viral",
  "cat": "orl",
  "cid": "J02.9",
  "sin": "dor de garganta viral",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Repouso, hidratação, gargarejo com água morna e sal.\n- Antibiótico não é necessário (quadro viral).\n- Retorno se febre > 3 dias, placas ou dificuldade para engolir.",
  "rev": [
   "Movido: orientações que estavam em 'Na unidade' para Orientações.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Shulman ST et al. IDSA GAS Pharyngitis Guideline 2012 (não tratar faringite viral com antibiótico)."
  ]
 },
 {
  "id": "gases",
  "nome": "Gases / Flatulência",
  "cat": "gi",
  "cid": "R14",
  "sin": "distensao abdominal meteorismo",
  "casa": "Uso oral\n1) Simeticona 75mg/mL gotas ------------------ 1 fr\nTomar 15 gotas VO de 8/8h por 3 dias.",
  "unidade": "",
  "orient": "- Evitar refrigerantes, feijão, repolho, chiclete e comer rápido.",
  "rev": [],
  "evid": "Simeticona tem evidência limitada.",
  "fontes": [
   "Evidência limitada; conduta sintomática."
  ]
 },
 {
  "id": "geca",
  "nome": "GECA / Gastroenterocolite aguda",
  "cat": "gi",
  "cid": "A09",
  "sin": "diarreia vomito gastroenterite virose intestinal",
  "casa": "Uso oral\n1) Sais de reidratação oral ------------------ 10 envelopes\nDiluir 1 envelope em 1 L de água filtrada e beber aos poucos ao longo do dia, após cada evacuação.\n2) Ondansetrona 8mg (Vonau Flash) ------------ 10 cp\nDissolver 1 cp na língua de 8/8h se náuseas ou vômitos.\n3) Escopolamina + Dipirona 10/250mg (Buscopan Composto) --- 20 cp\nTomar 1 cp VO de 6/6h se dor abdominal ou febre.\n4) Saccharomyces boulardii 200mg (Repoflor) -- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu\n4) Enterogermina flaconete ------------------- 10 fr\nTomar 1 flaconete VO de 12/12h por 5 dias.\n\n# Se disenteria (diarreia com sangue) com febre:\n5) Ciprofloxacino 500mg ---------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\nOu\n5) Azitromicina 500mg ------------------------ 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.",
  "unidade": "1) SF 0,9% 1.000 mL EV aberto (se desidratação moderada/grave ou vômitos incoercíveis).\n2) Ondansetrona 4 mg EV lenta (≥ 30 s), pode diluir em 8 mL de AD, ou IM\n   Ou Dimenidrinato + Piridoxina: ampola EV (10 mL) em 100 mL de SF em 30 min; existe apresentação própria para IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n3) Buscopan Composto 1 amp EV lenta diluída em 10–20 mL de SF, ou IM (se cólica).",
  "orient": "- Beber 2–3 L de líquidos por dia, em pequenos goles.\n- Evitar laticínios, gordura, café e refrigerante nos primeiros dias.\n- Não usar loperamida se houver sangue ou febre.\n- Retorno imediato se não conseguir ingerir líquidos, desmaio, sangue/pus nas fezes, urina muito escura ou em pouca quantidade.",
  "rev": [
   "Corrigido: item '3) c' estava incompleto → ondansetrona 8mg.",
   "Removido: omeprazol por 10 dias (sem indicação na GECA).",
   "Corrigido: ciprofloxacino na disenteria 5 → 3 dias; adicionada azitromicina.",
   "Adicionado: hidratação EV na unidade.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Shane AL et al. IDSA Clinical Practice Guidelines for Infectious Diarrhea (Clin Infect Dis 2017)."
  ]
 },
 {
  "id": "gota",
  "nome": "Gota — crise aguda",
  "cat": "dor",
  "cid": "M10.9",
  "sin": "artrite gotosa acido urico podagra",
  "casa": "Uso oral\n1) Colchicina 0,5mg -------------------------- 20 cp\nTomar 2 cp VO agora e 1 cp após 1h. Depois, 1 cp de 12/12h até 2–3 dias após o fim da crise.\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu (se contraindicação a AINE)\n2) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.",
  "unidade": "1) Cetoprofeno 100 mg EV (apresentação própria para EV) em 100 mL de SF em 20–30 min, ou IM (ampola 50 mg/mL)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Dexametasona 4–10 mg IM ou EV lenta.",
  "orient": "- Não suspender o alopurinol se já usa.\n- Evitar álcool (principalmente cerveja), carnes vermelhas, frutos do mar e refrigerantes.\n- Gelo local 20 min, 3–4x ao dia.\n- Ajustar colchicina em DRC.",
  "rev": [
   "Corrigido (importante): colchicina 1mg 8/8h por 7 dias é dose tóxica. Esquema de baixa dose: 1mg + 0,5mg após 1h, depois 0,5mg 12/12h (ACR/EULAR).",
   "Adicionado: prednisona como alternativa ao AINE.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "FitzGerald JD et al. 2020 American College of Rheumatology Guideline for the Management of Gout (Arthritis Care Res 2020)."
  ]
 },
 {
  "id": "gota-manut",
  "nome": "Gota — manutenção",
  "cat": "dor",
  "cid": "M10.9",
  "sin": "acido urico alopurinol",
  "casa": "Uso oral\n1) Alopurinol 100mg -------------------------- 30 cp\nTomar 1 cp VO 1x ao dia. Iniciar 2 a 4 semanas após a crise; ajustar com clínico conforme ácido úrico (meta < 6 mg/dL).\n2) Colchicina 0,5mg -------------------------- 60 cp\nTomar 1 cp VO de 12/12h por 3 a 6 meses (profilaxia de crises ao iniciar o alopurinol).",
  "unidade": "",
  "orient": "- Início e titulação idealmente no ambulatório.\n- Suspender e procurar atendimento se lesões de pele (risco de reação grave ao alopurinol).",
  "rev": [
   "Corrigido: alopurinol deve iniciar em dose baixa (100mg; 50mg na DRC) e ser titulado, não 300mg de início (ACR 2020)."
  ],
  "fontes": [
   "FitzGerald JD et al. 2020 ACR Guideline for the Management of Gout."
  ]
 },
 {
  "id": "epistaxe",
  "nome": "Epistaxe / Sangramento nasal",
  "cat": "orl",
  "cid": "R04.0",
  "sin": "sangramento nariz hemorragia nasal",
  "casa": "Uso nasal\n1) Soro fisiológico 0,9% --------------------- 1 fr\nPingar 3 gotas em cada narina 3x ao dia para manter a mucosa úmida, por 7 dias.",
  "unidade": "1) Cabeça inclinada para frente e compressão das asas do nariz por 10–15 min contínuos.\n2) Algodão embebido em Nafazolina (ou Oximetazolina) na narina + nova compressão.\n3) Medir PA.\n4) Se persistir: tamponamento nasal anterior e avaliação de otorrino.",
  "orient": "- Não assoar o nariz nem fazer esforço nas próximas 24–48h.\n- Umidificar o ambiente.\n- Retorno se sangramento > 20 min ou recorrente.",
  "rev": [
   "Removido: nafazolina spray por 3 dias para casa (efeito rebote, risco em HAS/cardiopatas); mantida só na unidade.",
   "Adicionado: posição com cabeça para frente e medida da PA."
  ],
  "fontes": [
   "Tunkel DE et al. AAO-HNS Clinical Practice Guideline: Nosebleed (Epistaxis) (Otolaryngol Head Neck Surg 2020)."
  ]
 },
 {
  "id": "hemorroida",
  "nome": "Doença hemorroidária",
  "cat": "gi",
  "cid": "I84.9",
  "sin": "hemorroida sangramento anal",
  "casa": "Uso oral\n1) Diosmina + Hesperidina 450/50mg (Daflon 500) --- 60 cp\nTomar 2 cp VO de 8/8h por 4 dias, depois 2 cp de 12/12h por 3 dias, depois 1 cp de 12/12h.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.\n3) Ibuprofeno 600mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n4) Óleo mineral ------------------------------ 1 fr\nTomar 15 mL VO à noite enquanto houver fezes endurecidas.\n\nUso tópico\n5) Proctyl pomada ---------------------------- 1 bisnaga\nAplicar na região anal 2 a 3x ao dia, após higiene, por 7 dias.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Banho de assento com água morna 3x ao dia por 10 min.\n- Dieta rica em fibras e água; não usar papel higiênico (preferir lavar).\n- Sangramento persistente ou > 45 anos: encaminhar para colonoscopia.",
  "rev": [
   "Ajustado: Daflon para o esquema da bula na crise (6 cp/dia × 4 dias, 4 cp/dia × 3 dias).",
   "Removido: Decadron IM na unidade.",
   "Adicionado: banho de assento e rastreio.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Davis BR et al. ASCRS Clinical Practice Guidelines for the Management of Hemorrhoids (Dis Colon Rectum 2018)."
  ]
 },
 {
  "id": "herpes-simples",
  "nome": "Herpes simples (labial / genital)",
  "cat": "pele",
  "cid": "B00.9",
  "sin": "herpes labial genital hsv",
  "casa": "Uso oral\n# Herpes labial (iniciar nos pródromos ou até 1 dia das lesões):\n1) Aciclovir 400mg --------------------------- 25 cp\nTomar 1 cp VO 5x ao dia por 5 dias.\n\n# Herpes genital — 1º episódio:\n1) Aciclovir 400mg --------------------------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\n\n# Herpes genital — recorrência:\n1) Aciclovir 400mg --------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.",
  "unidade": "",
  "orient": "- Iniciar o mais cedo possível (idealmente nas primeiras 48–72h).\n- Herpes genital: ofertar testes rápidos de HIV, sífilis e hepatites; evitar relação durante as lesões.\n- CID: labial B00.1 | genital A60.0.",
  "rev": [
   "Separado: esquemas por situação (labial, genital 1º episódio, recorrência).",
   "Removido: nota '(se gestante: 5 dias)', sem respaldo.",
   "Corrigido: herpes labial com aciclovir 400 mg 5x/dia por 5 dias (Spruance 1990), não 8/8h."
  ],
  "fontes": [
   "Workowski KA et al. CDC STI Treatment Guidelines 2021 (herpes genital).",
   "Spruance SL et al. Aciclovir 400 mg 5x/dia no herpes labial (Antimicrob Agents Chemother 1990)."
  ]
 },
 {
  "id": "zoster",
  "nome": "Herpes zoster (inclusive facial)",
  "cat": "pele",
  "cid": "B02.9",
  "sin": "cobreiro zona herpes facial",
  "casa": "Uso oral\n1) Aciclovir 400mg --------------------------- 70 cp\nTomar 2 cp (800mg) VO 5x ao dia (7h, 11h, 15h, 19h, 23h) por 7 dias.\nOu (se disponível no posto)\n1) Aciclovir 200mg --------------------------- 140 cp\nTomar 4 cp (800mg) VO 5x ao dia (7h, 11h, 15h, 19h, 23h) por 7 dias.\n2) Paracetamol + Codeína 500/30mg (Paco) ----- 15 cp\nTomar 1 cp VO de 6/6h se dor intensa.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.",
  "unidade": "",
  "orient": "- Iniciar até 72h do início das lesões (ou depois, se lesões novas surgindo ou imunossuprimido).\n- Lesão na ponta do nariz (sinal de Hutchinson), olho vermelho ou baixa da visão: avaliação oftalmológica urgente.\n- Evitar contato com gestantes, recém-nascidos e imunossuprimidos até as lesões virarem crostas.",
  "rev": [
   "Renomeado: 'Herpes facial' → Herpes zoster. A dose de 800mg 5x/dia é de zoster, não de herpes labial.",
   "Adicionado: duração de 7 dias e alerta de zoster oftálmico."
  ],
  "fontes": [
   "Dworkin RH et al. Recommendations for the management of herpes zoster (Clin Infect Dis 2007)."
  ]
 },
 {
  "id": "hpb",
  "nome": "Hiperplasia prostática benigna (HPB)",
  "cat": "uro",
  "cid": "N40",
  "sin": "prostata jato fraco retencao urinaria",
  "casa": "Uso oral\n1) Tansulosina 0,4mg ------------------------- 30 cp\nTomar 1 cp VO à noite, uso contínuo.\n2) Finasterida 5mg --------------------------- 30 cp\nTomar 1 cp VO 1x ao dia, uso contínuo (se próstata aumentada > 30–40 g; efeito após 3–6 meses).",
  "unidade": "# Retenção urinária aguda:\n1) Sondagem vesical de demora + iniciar tansulosina.\n2) Encaminhar ao urologista (tentativa de retirada da sonda em 2–3 dias).",
  "orient": "- Tansulosina pode causar tontura ao levantar; levantar devagar.\n- Solicitar PSA, EAS, creatinina e USG de vias urinárias; encaminhar ao urologista.",
  "rev": [
   "Preenchido: seção estava vazia."
  ],
  "fontes": [
   "Lerner LB et al. AUA Guideline: Management of LUTS attributed to BPH (J Urol 2021)."
  ]
 },
 {
  "id": "hipertireoidismo",
  "nome": "Hipertireoidismo",
  "cat": "endo",
  "cid": "E05.9",
  "sin": "tireoide graves tireotoxicose",
  "casa": "Uso oral\n1) Tiamazol 5mg (Tapazol) -------------------- 45 cp\nTomar 1 cp VO de 8/8h e retornar em 15 dias para reavaliação.\nOu (gestante no 1º trimestre ou crise tireotóxica)\n1) Propiltiouracil 100mg (Propil) ------------ 45 cp\nTomar 1 cp VO de 8/8h e retornar em 15 dias para reavaliação.\n2) Propranolol 40mg -------------------------- 45 cp\nTomar 1 cp VO de 8/8h (se taquicardia/tremor; evitar em asma).",
  "unidade": "",
  "orient": "- Suspender e procurar atendimento se febre ou dor de garganta (risco de agranulocitose).\n- Solicitar TSH, T4 livre, hemograma e TGO/TGP; encaminhar ao endocrinologista.",
  "rev": [
   "Corrigido (importante): propiltiouracil 5mg não existe; apresentação é 100mg.",
   "Adicionado: indicação do PTU, alerta de agranulocitose e exames."
  ],
  "fontes": [
   "Ross DS et al. 2016 ATA Guidelines for Hyperthyroidism and Other Causes of Thyrotoxicosis (Thyroid 2016)."
  ]
 },
 {
  "id": "hipotireoidismo",
  "nome": "Hipotireoidismo",
  "cat": "endo",
  "cid": "E03.9",
  "sin": "tireoide levotiroxina tsh",
  "casa": "Uso oral\n1) Levotiroxina 50mcg ------------------------ 30 cp\nTomar 1 cp VO em jejum, 30–60 min antes do café da manhã, todos os dias.",
  "unidade": "",
  "orient": "- Idosos ou cardiopatas: iniciar com 25mcg.\n- Repetir TSH em 6–8 semanas para ajuste.",
  "rev": [
   "Adicionado: dose inicial em idosos/cardiopatas e controle do TSH."
  ],
  "fontes": [
   "Jonklaas J et al. ATA Guidelines for the Treatment of Hypothyroidism (Thyroid 2014)."
  ]
 },
 {
  "id": "impetigo",
  "nome": "Impetigo",
  "cat": "pele",
  "cid": "L01.0",
  "sin": "crosta melicerica ferida infectada",
  "casa": "Uso tópico (lesões localizadas)\n1) Mupirocina 2% pomada ---------------------- 1 bisnaga\nAplicar nas lesões 3x ao dia, após remover as crostas com água morna e sabão, por 5 a 7 dias.\nOu\n1) Neomicina + Bacitracina pomada ------------ 1 bisnaga\nAplicar nas lesões 3x ao dia, após limpeza, por 7 dias.\n\nUso oral (lesões extensas ou múltiplas)\n2) Cefalexina 500mg -------------------------- 28 cp\nTomar 1 cp VO de 6/6h por 7 dias.\nOu (alergia a penicilina)\n2) Clindamicina 300mg ------------------------ 21 cp\nTomar 1 cp VO de 8/8h por 7 dias.\n\n3) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "unidade": "",
  "orient": "- Cortar as unhas, lavar as mãos, não compartilhar toalhas.\n- Afastar da escola/creche até 24h após o início do antibiótico.",
  "rev": [
   "Removido: penicilina benzatina (não cobre S. aureus, principal agente).",
   "Removido: eritromicina em xarope (dose pediátrica, subdosada para adulto).",
   "Adicionado: mupirocina como 1ª linha tópica.",
   "Removido: diclofenaco + paracetamol de rotina."
  ],
  "fontes": [
   "Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014)."
  ]
 },
 {
  "id": "ivc",
  "nome": "Insuficiência venosa crônica",
  "cat": "cardio",
  "cid": "I87.2",
  "sin": "varizes meia elastica edema pernas",
  "casa": "Uso externo\n1) Meia de compressão elástica — média compressão (20–30 mmHg), 3/4.\n- Calçar pela manhã, antes de levantar da cama.\n- Usar durante todo o dia.\n- Se precisar retirar, elevar as pernas por 15 min antes de calçar de novo.",
  "unidade": "",
  "orient": "- Elevar as pernas ao repousar; caminhar diariamente.\n- Não usar meia compressiva se doença arterial periférica (checar pulsos).",
  "rev": [
   "Adicionado: faixa de compressão e contraindicação arterial."
  ],
  "fontes": [
   "De Maeseneer MG et al. ESVS 2022 Clinical Practice Guidelines on Chronic Venous Disease (Eur J Vasc Endovasc Surg 2022)."
  ]
 },
 {
  "id": "hpylori",
  "nome": "H. pylori — erradicação",
  "cat": "gi",
  "cid": "B98.0",
  "sin": "helicobacter ulcera gastrite",
  "casa": "Uso oral (14 dias)\n1) Amoxicilina 500mg ------------------------- 56 cp\nTomar 2 cp (1g) VO de 12/12h por 14 dias.\n2) Claritromicina 500mg ---------------------- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias.\n3) Omeprazol 20mg ---------------------------- 56 cp\nTomar 2 cp (40mg) VO de 12/12h, 30 min antes do café e do jantar, por 14 dias.\n\n# Se alergia a penicilina: trocar a amoxicilina por\n1) Metronidazol 250mg ------------------------ 56 cp\nTomar 2 cp (500mg) VO de 12/12h por 14 dias.",
  "unidade": "",
  "orient": "- Não ingerir álcool se usar metronidazol.\n- Controle de erradicação (teste respiratório ou EDA) 4 semanas após o fim, sem IBP há 2 semanas.",
  "rev": [
   "Corrigido: duração 7 → 14 dias (IV Consenso Brasileiro de H. pylori).",
   "Corrigido: omeprazol 20 → 40mg 12/12h (IBP em dose dobrada).",
   "Ajustado: quantidades de comprimidos."
  ],
  "fontes": [
   "Coelho LGV et al. IV Consenso Brasileiro sobre Infecção por H. pylori (Arq Gastroenterol 2018).",
   "Malfertheiner P et al. Maastricht VI/Florence Consensus (Gut 2022)."
  ]
 },
 {
  "id": "itu",
  "nome": "ITU / Cistite / Pielonefrite",
  "cat": "uro",
  "cid": "N39.0",
  "sin": "infeccao urinaria disuria ardor urinar cistite pielonefrite",
  "casa": "# Cistite não complicada (mulher, não gestante):\nUso oral\n1) Nitrofurantoína 100mg --------------------- 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\nOu\n1) Fosfomicina 3g (Monuril) ------------------ 1 envelope\nDissolver em 1 copo de água e tomar à noite, com a bexiga vazia, dose única.\n2) Fenazopiridina 200mg ---------------------- 6 cp\nTomar 1 cp VO de 8/8h por 2 dias (urina fica alaranjada).\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h por 3 dias.\n\n# Gestante: Cefalexina 500mg 1 cp VO de 6/6h por 7 dias (ou fosfomicina).\n\n# Pielonefrite ambulatorial:\n1) Ciprofloxacino 500mg ---------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Pielonefrite: Ceftriaxona 1 g IM (reconstituir com o diluente de lidocaína da apresentação IM) ou EV (em 10 mL de AD, lenta, ou em 100 mL de SF em 30 min), 1ª dose na unidade, e seguir com VO. Colher urocultura antes.\n* Internar se: sepse, vômitos, gestante com pielonefrite, obstrução, sem melhora em 48–72h.",
  "orient": "- Aumentar ingestão de água; não segurar a urina.\n- Retorno se febre, dor lombar ou vômitos.\n- Homem com ITU: tratar por 7 dias e considerar prostatite.\n- CID: cistite N30.0 | pielonefrite N10.",
  "rev": [
   "Ajustado: ciprofloxacino reservado para pielonefrite (evitar na cistite simples).",
   "Corrigido: ceftriaxona dose única não trata pielonefrite; é 1ª dose seguida de VO por 7 dias.",
   "Ajustado: nitrofurantoína 7 → 5 dias; adicionada conduta para gestante.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Gupta K et al. IDSA/ESCMID Guidelines: Acute Uncomplicated Cystitis and Pyelonephritis in Women (Clin Infect Dis 2011)."
  ]
 },
 {
  "id": "insonia",
  "nome": "Insônia",
  "cat": "psi",
  "cid": "G47.0",
  "sin": "dificuldade dormir sono",
  "casa": "Uso oral\n1) Passiflora extrato seco 200mg ------------- 30 cp\nTomar 1 cp VO 30 min antes de dormir.",
  "unidade": "",
  "orient": "- Higiene do sono: horário fixo, evitar telas 1h antes, cafeína após 16h e cochilos longos.\n- Insônia > 3 meses: encaminhar para avaliação (TCC-I é o tratamento de 1ª linha).",
  "rev": [
   "Adicionado: higiene do sono."
  ],
  "evid": "Passiflora tem evidência fraca (revisões Cochrane sem dados suficientes). A base do tratamento da insônia é a TCC-I.",
  "fontes": [
   "Qaseem A et al. ACP Guideline: Management of Chronic Insomnia (Ann Intern Med 2016) — TCC-I como 1ª linha."
  ]
 },
 {
  "id": "vertigem",
  "nome": "Labirintite / Vertigem",
  "cat": "dor",
  "cid": "R42",
  "sin": "tontura vertigem labirintite vppb",
  "casa": "Uso oral\n1) Dimenidrinato + Piridoxina 50/10mg -------- 1 cx\nTomar 1 cp VO de 6/6h por 3 dias se tontura, náuseas ou vômitos.\n\n# Vertigem aguda intensa:\n1) Flunarizina 10mg -------------------------- 5 cp\nTomar 1 cp VO ao deitar por 5 dias.\n\n# Vertigem crônica/recorrente (ex.: Ménière):\n1) Betaistina 16mg --------------------------- 30 cp\nTomar 1 cp VO de 8/8h (reavaliar com otorrino).\n\n# Gestante:\n1) Meclizina 25mg (Meclin) ------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\n\n# Refratário aos anti-histamínicos:\n1) Clonazepam 0,5mg -------------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\n\n# Náuseas:\n2) Ondansetrona 4mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h por 3 dias se náuseas ou vômitos.",
  "unidade": "1) Dimenidrinato + Piridoxina: ampola EV (10 mL) em 100 mL de SF em 30 min; existe apresentação própria para IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n2) Exame: HINTS (head impulse, nistagmo, skew) e Dix-Hallpike.\n3) VPPB (Dix-Hallpike positivo): manobra de Epley.",
  "orient": "- Supressores vestibulares por no máximo 3 dias (atrasam a compensação).\n- Retorno imediato se: dificuldade para andar, fala enrolada, visão dupla, fraqueza, cefaleia súbita (sinais de AVC).\n- CID: labirintite H83.0 | VPPB H81.1.",
  "rev": [
   "Ajustado: betaistina 8mg → 16mg de 8/8h (dose usual).",
   "Adicionado: HINTS, manobra de Epley e sinais de AVC.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Bhattacharyya N et al. AAO-HNS Clinical Practice Guideline: BPPV (Update) (Otolaryngol Head Neck Surg 2017).",
   "Kattah JC et al. HINTS (Stroke 2009)."
  ]
 },
 {
  "id": "larva",
  "nome": "Larva migrans cutânea (bicho geográfico)",
  "cat": "pele",
  "cid": "B76.9",
  "sin": "bicho geografico",
  "casa": "Uso oral\n1) Albendazol 400mg -------------------------- 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.\nOu\n1) Ivermectina 6mg --------------------------- (por peso)\nTomar 200 mcg/kg VO em dose única (≈ 1 cp a cada 30 kg).\n\nUso tópico\n2) Tiabendazol 50mg/g pomada (Foldan) -------- 1 bisnaga\nAplicar nas lesões, friccionando sobre os trajetos, 3x ao dia por 5 dias.",
  "unidade": "",
  "orient": "- Evitar andar descalço em areia/terra.",
  "rev": [
   "Adicionado: ivermectina como alternativa."
  ],
  "fontes": [
   "Caumes E. Treatment of cutaneous larva migrans (Clin Infect Dis 2000)."
  ]
 },
 {
  "id": "nauseas",
  "nome": "Náuseas e vômitos",
  "cat": "gi",
  "cid": "R11",
  "sin": "enjoo vomito",
  "casa": "Uso oral\n1) Dimenidrinato + Piridoxina 50/10mg (Dramin B6) --- 10 cp\nTomar 1 cp VO de 8/8h por até 3 dias, se enjoo.\nOu\n1) Ondansetrona 8mg (Vonau Flash) ------------ 10 cp\nDissolver 1 cp na língua de 8/8h por até 3 dias, se enjoo.",
  "unidade": "1) Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).",
  "orient": "- Pequenos goles de líquido; retornar se não conseguir se hidratar.",
  "rev": [
   "Ajustado: Dramin B6 7 → 3 dias, se necessário.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Escolha do antiemético por consenso; evidência comparativa limitada.",
  "fontes": [
   "Consenso clínico."
  ]
 },
 {
  "id": "otite-externa",
  "nome": "Otite externa",
  "cat": "orl",
  "cid": "H60.9",
  "sin": "dor ouvido piscina",
  "casa": "Uso otológico\n1) Ciprofloxacino + Hidrocortisona otológico (Otomixyn/Ciprodex) ou Polimixina B + Neomicina + Hidrocortisona (Otosporin) --- 1 fr\nPingar 3–4 gotas no ouvido afetado de 8/8h por 7 dias.\n\nUso oral\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Dexametasona 4 mg IM ou EV lenta.",
  "orient": "- Não molhar o ouvido durante o tratamento (algodão com vaselina no banho).\n- Suspeita de perfuração: usar só quinolona tópica (evitar neomicina).\n- Antibiótico oral só se celulite ao redor, diabetes/imunossupressão ou otite externa maligna.",
  "rev": [
   "Removido: cefalexina oral de rotina (otite externa não complicada se trata só com tópico).",
   "Adicionado: opção com quinolona tópica e alerta de perfuração.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Rosenfeld RM et al. AAO-HNS Clinical Practice Guideline: Acute Otitis Externa (Otolaryngol Head Neck Surg 2014)."
  ]
 },
 {
  "id": "oma",
  "nome": "Otite média aguda (adulto)",
  "cat": "orl",
  "cid": "H66.9",
  "sin": "dor ouvido otite media",
  "casa": "Uso oral\n1) Amoxicilina 875mg ------------------------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\nOu\n1) Amoxicilina 500mg ------------------------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\nOu (uso de amoxicilina nos últimos 30 dias ou falha)\n1) Amoxicilina + Clavulanato 875/125mg ------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\nOu (alergia a penicilina)\n1) Azitromicina 500mg ------------------------ 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Dexametasona 4 mg IM ou EV lenta.",
  "orient": "- Retorno se febre persistente após 48–72h, dor atrás da orelha ou secreção.",
  "rev": [
   "Adicionado: amoxicilina-clavulanato e opção para alérgicos.",
   "Adicionado: amoxicilina 875 mg de 12/12h (posologia aprovada em bula).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Sem diretriz específica para adultos; condutas extrapoladas da pediatria (AAP 2013).",
  "fontes": [
   "Lieberthal AS et al. AAP: The Diagnosis and Management of Acute Otitis Media (Pediatrics 2013) — extrapolado para adultos."
  ]
 },
 {
  "id": "onicomicose",
  "nome": "Onicomicose",
  "cat": "pele",
  "cid": "B35.1",
  "sin": "micose unha",
  "casa": "Uso oral (pulsoterapia)\n1) Itraconazol 100mg ------------------------- 28 cp por ciclo\nTomar 2 cp VO de 12/12h, após as refeições, por 7 dias. Repetir 1 semana por mês:\n2 ciclos (unhas das mãos) ou 3 ciclos (unhas dos pés).",
  "unidade": "",
  "orient": "- Confirmar com exame micológico antes de tratar.\n- Contraindicado em insuficiência cardíaca; checar interações (estatinas, etc.) e TGO/TGP.",
  "rev": [
   "Ajustado: 3 ciclos para unhas dos pés.",
   "Adicionado: exame micológico e contraindicações."
  ],
  "fontes": [
   "Ameen M et al. British Association of Dermatologists guidelines for onychomycosis (Br J Dermatol 2014)."
  ]
 },
 {
  "id": "pep",
  "nome": "PEP — Profilaxia pós-exposição ao HIV",
  "cat": "toxinf",
  "cid": "Z20.6",
  "sin": "pep acidente perfurocortante violencia sexual exposicao",
  "casa": "Uso oral (por 28 dias)\n1) Tenofovir 300mg + Lamivudina 300mg -------- 30 cp\nTomar 1 cp VO 1x ao dia por 28 dias.\n2) Dolutegravir 50mg ------------------------- 30 cp\nTomar 1 cp VO 1x ao dia por 28 dias.",
  "unidade": "1) Iniciar o mais rápido possível (idealmente em até 2h; no máximo 72h).\n2) Testes rápidos: HIV (fonte e exposto), sífilis, hepatites B e C; beta-hCG se mulher em idade fértil.\n3) Avaliar vacina e imunoglobulina para hepatite B.\n4) Violência sexual: contracepção de emergência e profilaxia de outras IST.",
  "orient": "- Encaminhar ao SAE/CTA para seguimento (testagem em 30 e 90 dias).\n- Usar preservativo durante o seguimento.",
  "rev": [
   "Removido: dipirona IM (sem relação com PEP).",
   "Adicionado: janela de início, testes basais, hepatite B e violência sexual."
  ],
  "fontes": [
   "Ministério da Saúde. PCDT para Profilaxia Pós-Exposição (PEP) de risco à infecção pelo HIV, IST e hepatites virais."
  ]
 },
 {
  "id": "picada",
  "nome": "Picada de inseto com reação local",
  "cat": "pele",
  "cid": "T63.4",
  "sin": "picada abelha mosquito formiga",
  "casa": "Uso oral\n1) Dexclorfeniramina 2mg --------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\n2) Prednisona 20mg --------------------------- 6 cp\nTomar 2 cp VO pela manhã por 3 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.",
  "unidade": "1) Hidrocortisona 100 mg IM, ou EV (reconstituir; direto lento ou em 100 mL de SF em 30–60 min)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n* Sinais de anafilaxia → protocolo de anafilaxia (adrenalina IM).",
  "orient": "- Compressa fria no local.\n- Retorno imediato se falta de ar, inchaço no rosto ou tontura.",
  "rev": [
   "Corrigido: dexclorfeniramina 0,5mg → 2mg (comprimido disponível e dose usual).",
   "Ajustado: prednisona 20 → 40mg/dia.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Baseado em consenso clínico (poucos ensaios).",
  "fontes": [
   "Consenso clínico; anafilaxia conforme WAO 2020."
  ]
 },
 {
  "id": "pac",
  "nome": "Pneumonia adquirida na comunidade (PAC)",
  "cat": "resp",
  "cid": "J18.9",
  "sin": "pneumonia pac infeccao pulmao",
  "casa": "# PAC sem comorbidades, CURB-65 0–1:\nUso oral\n1) Amoxicilina 500mg ------------------------- 42 cp\nTomar 2 cp (1 g) VO de 8/8h por 7 dias.\n(Na PAC a ATS/IDSA usa 1 g de 8/8h; não há esquema de 12/12h com amoxicilina isolada nessa diretriz.)\nOu\n1) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg VO no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia (monoterapia só se resistência local a macrolídeo < 25%).\n\n# PAC com comorbidades (DPOC, DM, IC, DRC, etilismo) ou ATB nos últimos 3 meses:\n1) Amoxicilina + Clavulanato 875/125mg ------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\n2) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg VO no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia.\nOu (monoterapia)\n1) Levofloxacino 750mg ----------------------- 5 cp\nTomar 1 cp VO 1x ao dia por 5 dias.\n\nSintomáticos\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "unidade": "1) Calcular CURB-65: Confusão, Ureia > 50 mg/dL, FR ≥ 30, PAS < 90 ou PAD ≤ 60, idade ≥ 65.\n   0–1: tratar em casa | 2: considerar internação | ≥ 3: internar (avaliar UTI).\n2) RX de tórax; SatO2.\n3) 1ª dose do antibiótico na unidade.",
  "orient": "- Reavaliar em 48–72h.\n- Retorno imediato se falta de ar, confusão ou febre persistente após 72h.",
  "rev": [
   "Removido: prednisona (corticoide não é indicado na PAC não grave).",
   "Removido: ambroxol de rotina (sem benefício em desfecho).",
   "Reestruturado: 4 prescrições → esquemas por perfil de risco (SBPT/ATS-IDSA).",
   "Ajustado: azitromicina no esquema da ATS/IDSA 2019 (500 mg no 1º dia + 250 mg do 2º ao 5º); levofloxacino 7 → 5 dias.",
   "Adicionado: CURB-65.",
   "Corrigido: amoxicilina na PAC é 1 g de 8/8h (ATS/IDSA 2019), não 500 mg."
  ],
  "fontes": [
   "Metlay JP et al. Diagnosis and Treatment of Adults with CAP — ATS/IDSA (Am J Respir Crit Care Med 2019).",
   "Corrêa RA et al. Recomendações da SBPT para PAC em adultos imunocompetentes, 2018 (J Bras Pneumol)."
  ]
 },
 {
  "id": "psoriase",
  "nome": "Psoríase (placas)",
  "cat": "pele",
  "cid": "L40.0",
  "sin": "placa descamativa",
  "casa": "Uso tópico\n1) Clobetasol 0,05% creme -------------------- 1 bisnaga\nAplicar fina camada sobre as placas do corpo 1 a 2x ao dia por até 2–4 semanas (não usar na face, dobras ou genitais).\n2) Ureia 10% + Ácido salicílico creme -------- 1 pote\nAplicar sobre as placas 2x ao dia para remover escamas.",
  "unidade": "",
  "orient": "- Hidratação diária da pele.\n- Encaminhar ao dermatologista.",
  "rev": [
   "Trocado: hidrocortisona (potência baixa) → clobetasol para placas corporais.",
   "Removido: dipirona IM."
  ],
  "fontes": [
   "Elmets CA et al. AAD–NPF Guidelines: Topical Therapy for Psoriasis (J Am Acad Dermatol 2021)."
  ]
 },
 {
  "id": "queimadura-solar",
  "nome": "Queimadura solar leve",
  "cat": "pele",
  "cid": "L55.9",
  "sin": "sol vermelhidao",
  "casa": "Uso tópico\n1) Hidratante com aloe vera / loção de calamina --- 1 fr\nAplicar nas áreas afetadas 3x ao dia.\n2) Sulfadiazina de prata 1% creme ------------ 1 bisnaga\nAplicar fina camada nas áreas com bolhas 2x ao dia por 5 dias.\n\nUso oral\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h por 3 dias.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Não furar bolhas; compressas frias; hidratação oral; evitar sol e usar protetor.",
  "rev": [
   "Ajustado: sulfadiazina reservada para áreas com bolhas; hidratante na pele íntegra.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Baseado em consenso clínico.",
  "fontes": [
   "Consenso clínico."
  ]
 },
 {
  "id": "prostatite",
  "nome": "Prostatite bacteriana aguda",
  "cat": "uro",
  "cid": "N41.0",
  "sin": "prostata dor perineal",
  "casa": "Uso oral\n1) Ciprofloxacino 500mg ---------------------- 56 cp\nTomar 1 cp VO de 12/12h por 28 dias.\nOu\n1) Sulfametoxazol + Trimetoprima 800/160mg --- 56 cp\nTomar 1 cp VO de 12/12h por 28 dias.\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.",
  "unidade": "",
  "orient": "- Colher urocultura antes. Não fazer toque prostático vigoroso (risco de bacteremia).\n- Internar se febre alta, sepse ou retenção urinária.",
  "rev": [
   "Adicionado: SMX-TMP como alternativa e cuidados."
  ],
  "fontes": [
   "EAU Guidelines on Urological Infections, 2024."
  ]
 },
 {
  "id": "rinite",
  "nome": "Rinite alérgica",
  "cat": "orl",
  "cid": "J30.4",
  "sin": "alergia nariz espirro coriza",
  "casa": "Uso nasal\n1) Budesonida 64mcg spray nasal -------------- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia (pela manhã), uso contínuo por pelo menos 30 dias.\n2) Soro fisiológico 0,9% --------------------- 1 fr\nLavar as narinas com 5–10 mL em cada lado 3x ao dia.\n\nUso oral\n3) Loratadina 10mg --------------------------- 10 cp\nTomar 1 cp VO 1x ao dia por 10 dias.",
  "unidade": "1) Prometazina 25–50 mg somente IM profunda (se crise intensa).",
  "orient": "- Controle ambiental: evitar poeira, mofo, pelos; trocar roupa de cama semanalmente.",
  "rev": [
   "Adicionado: corticoide nasal (1ª linha no tratamento).",
   "Trocado: dexclorfeniramina IM → prometazina IM (apresentação disponível).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Bousquet J et al. ARIA 2019/2020 (J Allergy Clin Immunol).",
   "Sakano E et al. IV Consenso Brasileiro sobre Rinites (Braz J Otorhinolaryngol 2018)."
  ]
 },
 {
  "id": "sua",
  "nome": "Sangramento uterino anormal intenso",
  "cat": "gu",
  "cid": "N93.9",
  "sin": "menorragia hemorragia uterina sangramento vaginal",
  "casa": "Uso oral\n1) Ácido tranexâmico 250mg ------------------- 60 cp\nTomar 4 cp (1g) VO de 8/8h por até 5 dias (ACOG usa 1,3 g de 8/8h).\n2) Ácido mefenâmico 500mg -------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.",
  "unidade": "1) Beta-hCG antes de tudo.\n2) Hemograma; avaliar sinais de instabilidade.\n3) Instável: 2 acessos, SF 0,9%, ácido tranexâmico 1g EV, avaliação ginecológica de urgência.",
  "orient": "- Encaminhar ao ginecologista (USG transvaginal).\n- Retorno se sangramento > 1 absorvente/hora, tontura ou desmaio.",
  "rev": [
   "Corrigido: ácido tranexâmico 500mg → 1g de 8/8h.",
   "Adicionado: beta-hCG e conduta na instabilidade."
  ],
  "fontes": [
   "ACOG Committee Opinion 557: Management of Acute Abnormal Uterine Bleeding in Nonpregnant Reproductive-Aged Women (2013)."
  ]
 },
 {
  "id": "sifilis",
  "nome": "Sífilis",
  "cat": "gu",
  "cid": "A53.9",
  "sin": "cancro lues vdrl treponema",
  "casa": "",
  "unidade": "# Sífilis recente (primária, secundária, latente < 1 ano):\nPenicilina G benzatina 2.400.000 UI IM, dose única (1.200.000 UI em cada glúteo).\n\n# Sífilis tardia (latente > 1 ano, duração ignorada ou terciária):\nPenicilina G benzatina 2.400.000 UI IM, 1x por semana por 3 semanas (total 7.200.000 UI).\n\n# Neurossífilis: internar (penicilina cristalina EV).",
  "orient": "- Tratar parceria(s).\n- VDRL de controle a cada 3 meses (gestante: mensal).\n- Notificação compulsória.\n- Gestante: só penicilina é considerada tratamento adequado.",
  "rev": [
   "Adicionado: esquema da sífilis tardia, seguimento e notificação."
  ],
  "fontes": [
   "Ministério da Saúde. PCDT Atenção Integral às Pessoas com IST, 2022."
  ]
 },
 {
  "id": "agitacao",
  "nome": "Agitação psicomotora",
  "cat": "psi",
  "cid": "R45.1",
  "sin": "agitado agressivo surto contencao",
  "casa": "",
  "unidade": "1) Abordagem verbal e ambiente seguro. Descartar hipoglicemia, hipóxia, intoxicação.\n2) Haloperidol 5 mg (1 amp) IM + Prometazina 50 mg (1 amp) IM (ambos somente IM)\n   Ou Midazolam 15mg IM (3 mL de 5 mg/mL; cuidado com depressão respiratória)\n   Intoxicação por álcool: Haloperidol 5 mg IM isolado; evitar benzodiazepínico. Com rebaixamento da consciência: não sedar.\n   Abstinência alcoólica ou intoxicação por cocaína: Diazepam 10mg EV lento (até 5 mg/min).\n3) Reavaliar em 30 min; pode repetir 1x.",
  "orient": "- Idosos: reduzir a dose do haloperidol (1–2,5mg).\n- Monitorar SatO2 e sinais vitais após a sedação.",
  "rev": [
   "Corrigido (2026-10-08): diazepam só na abstinência alcoólica e na cocaína; na intoxicação alcoólica, haloperidol isolado (ABP 2019; Projeto BETA 2012; bula do haloperidol).",
   "Adicionado: descartar causas orgânicas, midazolam e dose em idosos.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Huf G et al. Haloperidol mais prometazina para agitação (TREC — BMJ 2007).",
   "Baldaçara L et al. Diretrizes brasileiras para manejo da agitação psicomotora (ABP/ABRAMEDE, Braz J Psychiatry 2019).",
   "Wilson MP et al. Project BETA Psychopharmacology Workgroup (West J Emerg Med 2012;13:26): haloperidol na intoxicação alcoólica; benzodiazepínico na abstinência.",
   "Bula do Compaz (diazepam 5 mg/mL injetável), Cristália, Anvisa: EV lenta, 0,5–1 mL/min.",
   "Bula do haloperidol solução injetável 5 mg/mL, Anvisa 09/12/2025: contraindicado no coma e na depressão do sistema nervoso central por álcool ou outros depressores."
  ]
 },
 {
  "id": "abstinencia",
  "nome": "Síndrome de abstinência alcoólica",
  "cat": "psi",
  "cid": "F10.3",
  "sin": "alcool abstinencia tremor delirium",
  "casa": "",
  "unidade": "1) Tiamina 300mg IM/EV (antes ou junto com soro glicosado; na hipoglicemia, não atrasar a glicose).\n2) Hidratação venosa se desidratado; glicemia capilar; eletrólitos (Mg, K).\n3) Diazepam 10–20mg VO a cada 1h conforme sintomas (tremor, sudorese, agitação)\n   Ou Diazepam 10mg EV lento (máx. 5 mg/min) se não aceitar VO.\n   (Hepatopata grave ou idoso: Lorazepam 1–2mg VO.)\n4) Delirium tremens ou convulsão: internar.",
  "orient": "- Encaminhar ao CAPS AD.",
  "rev": [
   "Corrigido (2026-10-08): tiamina antes ou junto com o soro glicosado, sem atrasar a glicose na hipoglicemia (Schabelman e Kuo, J Emerg Med 2012;42:488).",
   "Corrigido: 'Diazepam 1 amp EV até de 1/1h' → dose guiada por sintomas, VO preferencial.",
   "Adicionado: tiamina antes da glicose e lorazepam em hepatopatas."
  ],
  "fontes": [
   "ASAM Clinical Practice Guideline on Alcohol Withdrawal Management, 2020."
  ]
 },
 {
  "id": "ansiedade",
  "nome": "Crise de ansiedade",
  "cat": "psi",
  "cid": "F41.0",
  "sin": "panico ansiedade nervoso",
  "casa": "Uso oral\n1) Passiflora extrato seco 200mg ------------- 30 cp\nTomar 1 cp VO de 12/12h.",
  "unidade": "1) Descartar causas orgânicas (ECG, glicemia, SatO2) conforme o caso.\n2) Diazepam 5–10mg VO (se crise intensa com agitação).",
  "orient": "- Técnicas de respiração.\n- Encaminhar para acompanhamento na UBS/psicologia.\n- CID: ansiedade não especificada F41.9.",
  "rev": [
   "Corrigido: diazepam IM tem absorção errática; trocado por VO."
  ],
  "evid": "Passiflora tem evidência fraca. Benzodiazepínico só para a crise.",
  "fontes": [
   "Consenso clínico; passiflora com evidência fraca (Miyasaka LS, Cochrane 2007)."
  ]
 },
 {
  "id": "gripe",
  "nome": "Síndrome gripal / Resfriado comum",
  "cat": "resp",
  "cid": "J11.1",
  "sin": "gripe resfriado coriza tosse influenza covid",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se febre ou dor.\n2) Loratadina 10mg --------------------------- 5 cp\nTomar 1 cp VO 1x ao dia por 5 dias.\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h por 3 dias.\n\nUso nasal\n4) Soro fisiológico 0,9% --------------------- 1 fr\nAplicar 5 a 10 mL com seringa em cada narina 4x ao dia (spray: 2 jatos em cada narina).\n\n# Síndrome gripal em grupo de risco (≥ 60 anos, gestante/puérpera, comorbidades, imunossupressão), até 48h idealmente:\n5) Oseltamivir 75mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.",
  "unidade": "",
  "orient": "- Repouso, hidratação.\n- Retorno imediato se falta de ar, SatO2 baixa, dor no peito, piora da febre após melhora.\n- CID resfriado: J00.",
  "rev": [
   "Adicionado: oseltamivir para grupo de risco (protocolo MS).",
   "Removido: budesonida nasal por 15 dias (sem benefício no resfriado)."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo de Tratamento de Influenza, 2023 (oseltamivir em grupo de risco)."
  ]
 },
 {
  "id": "sinusite",
  "nome": "Rinossinusite aguda bacteriana",
  "cat": "orl",
  "cid": "J01.9",
  "sin": "sinusite dor face secrecao nasal",
  "casa": "# Antibiótico só se: sintomas > 10 dias sem melhora, piora após melhora inicial (dupla piora) ou febre ≥ 39°C + secreção purulenta ≥ 3 dias.\nUso oral\n1) Amoxicilina 875mg ------------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\nOu\n1) Amoxicilina 500mg ------------------------- 21 cp\nTomar 1 cp VO de 8/8h por 7 dias.\nOu (ATB recente, > 65 anos ou comorbidades)\n1) Amoxicilina + Clavulanato 875/125mg ------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n\nUso nasal\n3) Budesonida 64mcg spray nasal -------------- 1 fr\nAplicar 2 jatos em cada narina pela manhã por 15 dias.\n4) Soro fisiológico 0,9% --------------------- 1 fr\nLavar cada narina com 5 a 10 mL com seringa 4x ao dia.",
  "unidade": "",
  "orient": "- Quadros virais (< 10 dias) não precisam de antibiótico.\n- Retorno imediato se edema ou vermelhidão ao redor do olho, alteração visual, cefaleia intensa.",
  "rev": [
   "Adicionado: critérios para antibiótico.",
   "Ajustado: amoxicilina simples como 1ª linha; clavulanato em risco.",
   "Removido: prednisona de rotina e loratadina (sem benefício na sinusite bacteriana).",
   "Adicionado: amoxicilina 875 mg de 12/12h (AAO-HNS 2015 lista 500 mg 8/8h ou 875 mg 12/12h)."
  ],
  "fontes": [
   "Chow AW et al. IDSA Clinical Practice Guideline for Acute Bacterial Rhinosinusitis (Clin Infect Dis 2012).",
   "Rosenfeld RM et al. AAO-HNS Adult Sinusitis Guideline (2015)."
  ]
 },
 {
  "id": "urticaria",
  "nome": "Urticária",
  "cat": "pele",
  "cid": "L50.9",
  "sin": "alergia placas coceira",
  "casa": "Uso oral\n1) Loratadina 10mg --------------------------- 7 cp\nTomar 1 cp VO 1x ao dia por 7 dias.\nOu\n1) Dexclorfeniramina 2mg/5mL xarope ---------- 1 fr\nTomar 10 mL VO de 8/8h por 5 dias.\n2) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.",
  "unidade": "1) Prometazina 50 mg somente IM profunda.\n* Se angioedema de glote, falta de ar ou hipotensão → protocolo de anafilaxia.",
  "orient": "- Evitar o possível desencadeante e AINEs.\n- Urticária > 6 semanas: encaminhar.",
  "rev": [
   "Ajustado: prednisona 1x ao dia pela manhã.",
   "Adicionado: alerta de anafilaxia.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Zuberbier T et al. EAACI/GA²LEN/EuroGuiDerm/APAAACI Guideline for Urticaria (Allergy 2022)."
  ]
 },
 {
  "id": "vaginose",
  "nome": "Vaginose bacteriana",
  "cat": "gu",
  "cid": "N76.0",
  "sin": "corrimento odor peixe gardnerella",
  "casa": "Uso oral\n1) Metronidazol 250mg ------------------------ 28 cp\nTomar 2 cp VO de 12/12h por 7 dias.\nOu\nUso vaginal\n1) Metronidazol gel vaginal 100mg/g ---------- 1 bisnaga\nAplicar 1 aplicador cheio via vaginal à noite por 5 noites.",
  "unidade": "",
  "orient": "- Não ingerir bebidas alcoólicas durante o tratamento e até 48h após.\n- Parceiro não precisa ser tratado.",
  "rev": [
   "Corrigido: oral e vaginal são alternativas ('ou'), não associação.",
   "Ajustado: abstinência alcoólica 24 → 48h."
  ],
  "fontes": [
   "Ministério da Saúde. PCDT Atenção Integral às Pessoas com IST, 2022."
  ]
 },
 {
  "id": "candidiase",
  "nome": "Candidíase vulvovaginal",
  "cat": "gu",
  "cid": "B37.3",
  "sin": "corrimento branco coceira vaginal fungo",
  "casa": "Uso oral\n1) Fluconazol 150mg -------------------------- 1 cp\nTomar 1 cp VO em dose única.\nOu\nUso vaginal\n1) Miconazol 2% creme vaginal ---------------- 1 bisnaga\nAplicar 1 aplicador cheio via vaginal à noite por 7 noites.",
  "unidade": "",
  "orient": "- Gestante: somente tratamento vaginal.\n- Parceiro só se sintomático.",
  "rev": [
   "Adicionado: item novo (não havia no modelo)."
  ],
  "fontes": [
   "Ministério da Saúde. PCDT Atenção Integral às Pessoas com IST, 2022."
  ]
 },
 {
  "id": "verminose",
  "nome": "Verminose — amplo espectro",
  "cat": "gi",
  "cid": "B82.9",
  "sin": "verme parasitose",
  "casa": "Uso oral (escolher um)\n1) Albendazol 400mg -------------------------- 1 cp\nTomar 1 cp VO em dose única. (Estrongiloidíase/teníase: 1x ao dia por 3 dias.)\nOu\n1) Mebendazol 100mg -------------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\nOu\n1) Nitazoxanida 500mg (Annita) --------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias, com alimento.",
  "unidade": "",
  "orient": "- Lavar as mãos e os alimentos; beber água filtrada.",
  "rev": [
   "Corrigido: mebendazol e tiabendazol estavam prescritos juntos; ficou uma opção por vez.",
   "Removido: tiabendazol oral (muitos efeitos adversos; albendazol/ivermectina são preferíveis)."
  ],
  "fontes": [
   "Ministério da Saúde / OMS — tratamento de geo-helmintíases."
  ]
 },
 {
  "id": "tetano",
  "nome": "Tétano / Conduta em feridas e mordeduras",
  "cat": "toxinf",
  "cid": "T14.1",
  "sin": "ferimento vacina dt antitetanica mordida cachorro",
  "casa": "# Mordedura com critério para antibiótico preemptivo (critérios na aba Feridas):\nUso oral\n1) Amoxicilina + Clavulanato 875/125mg ------- 10 cp\nTomar 1 cp VO de 12/12h por 3 a 5 dias.",
  "unidade": "1) Limpeza abundante com água e sabão/SF 0,9%; desbridamento se necessário.\n2) Vacina dT IM:\n   - Ferimento limpo e superficial: se última dose há > 10 anos ou esquema incompleto/desconhecido.\n   - Ferimento de alto risco: se última dose há > 5 anos ou esquema incompleto/desconhecido.\n3) Soro ou imunoglobulina antitetânica: ferimento de alto risco + esquema incompleto ou desconhecido.\n4) Mordedura animal: avaliar profilaxia da raiva conforme animal e ferimento (fluxo completo na aba Feridas) e preencher a ficha de atendimento antirrábico (SINAN).",
  "orient": "- Completar o esquema vacinal na UBS.\n- Retorno se sinais de infecção (vermelhidão, calor, pus, febre).",
  "rev": [
   "Adicionado: critérios de reforço por tempo desde a última dose.",
   "Adicionado: antibiótico em mordeduras e alerta de raiva.",
   "Atualizado (09/2026): antibiótico por 3 a 5 dias apenas quando houver critério (IDSA 2014); fluxo de raiva e tétano na aba Feridas."
  ],
  "fontes": [
   "Ministério da Saúde. Guia de Vigilância em Saúde (tétano acidental: condutas por tipo de ferimento).",
   "Stevens DL et al. IDSA 2014 (mordeduras: amoxicilina-clavulanato).",
   "Ministério da Saúde. Nota Técnica nº 8/2022 — Profilaxia da raiva humana."
  ]
 },
 {
  "id": "sca",
  "nome": "Dor torácica / Síndrome coronariana aguda",
  "cat": "cardio",
  "cid": "R07.4",
  "sin": "infarto iam sca angina dor no peito iamcsst supra",
  "casa": "",
  "unidade": "1) ECG de 12 derivações em até 10 min da chegada; repetir se a dor persistir ou mudar.\n2) Monitorização, acesso venoso, troponina (preferir alta sensibilidade, com o algoritmo 0/1h ou 0/2h do kit do serviço).\n3) AAS 162–325 mg mastigado (ex.: 300 mg = 3 cp de 100 mg), se não houver alergia.\n4) O2 somente se SatO2 < 90%.\n5) Dor persistente: nitrato sublingual (ex.: dinitrato de isossorbida 5 mg SL), se PAS > 90 mmHg, sem suspeita de infarto de VD e sem inibidor de fosfodiesterase-5 recente. Dor refratária: morfina 2–4 mg EV.\n\nCom supradesnivelamento de ST (IAMCSST):\n6) Angioplastia primária se o tempo até a abertura da artéria for ≤ 90 min (ou transferência ≤ 120 min).\n7) Se não for possível: fibrinólise com porta-agulha ≤ 30 min.\n   Tenecteplase em bolus único por peso: < 60 kg 30 mg | 60–69 kg 35 mg | 70–79 kg 40 mg | 80–89 kg 45 mg | ≥ 90 kg 50 mg.\n   Associar clopidogrel (dose de ataque conforme idade e protocolo do serviço) e anticoagulação.\n\nSem supradesnivelamento (SCA sem supra):\n8) Dupla antiagregação: ticagrelor 180 mg ou clopidogrel 300–600 mg, conforme a estratégia do serviço.\n9) Anticoagulação: enoxaparina 1 mg/kg SC de 12/12h (ajustar se ClCr < 30) ou heparina não fracionada 60 UI/kg em bolus (máx. 4.000 UI).\n10) Estratificar (ex.: HEART) e transferir para serviço com hemodinâmica conforme o risco.",
  "orient": "- Dor torácica com ECG e troponina normais não exclui SCA: repetir conforme o algoritmo.\n- Pense também em dissecção de aorta, TEP, pneumotórax e tamponamento antes de antiagregar e anticoagular.",
  "fontes": [
   "ACC/AHA/ACEP/NAEMSP/SCAI. Guideline for the Management of Patients With Acute Coronary Syndromes, 2025 (Circulation). https://www.ahajournals.org/doi/10.1161/CIR.0000000000001309",
   "SBC. Diretriz Brasileira de Avaliação e Diagnóstico da Dor Torácica na Emergência, 2025 (Arq Bras Cardiol 122(9)). https://abccardiol.org/en/article/brazilian-guideline-for-the-evaluation-and-diagnosis-of-chest-pain-in-the-emergency-department-2025/",
   "Bula do tenecteplase (faixas de dose por peso)."
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "avc",
  "nome": "AVC isquêmico agudo",
  "cat": "dor",
  "cid": "I63.9",
  "sin": "avc derrame deficit neurologico trombolise stroke",
  "casa": "",
  "unidade": "1) Glicemia capilar imediata (hipoglicemia imita AVC). Registrar a hora em que o paciente foi visto bem pela última vez.\n2) NIHSS e TC de crânio sem contraste urgente; angio-TC se possível candidato a trombectomia. Não atrasar a imagem vascular esperando creatinina.\n3) ECG e troponina são recomendados, mas não devem atrasar a trombólise.\n\nTrombólise EV até 4,5h do último momento visto bem (sem contraindicações):\n4) Tenecteplase 0,25 mg/kg em bolus (máx. 25 mg)\n   Ou Alteplase 0,9 mg/kg (máx. 90 mg): 10% em bolus em 1 min e o restante em 60 min.\n5) PA antes da trombólise < 185/110 mmHg e < 180/105 mmHg nas 24h seguintes.\n\n6) Oclusão de grande vaso: trombectomia até 6h (e até 24h em casos selecionados). Acionar a regulação/centro de AVC.\n7) Não reduzir a glicemia com insulina EV para alvo de 80–130 mg/dL (sem benefício).\n8) Sem trombólise: AAS após excluir hemorragia na TC, conforme protocolo.",
  "orient": "- Tempo é cérebro: acionar o fluxo de AVC do serviço/regulação assim que houver suspeita.",
  "fontes": [
   "AHA/ASA. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (Stroke). https://www.ahajournals.org/doi/10.1161/STR.0000000000000513",
   "Resumo emDocs do guideline 2026. https://www.emdocs.net/2026-guideline-update-early-management-of-acute-ischemic-stroke/"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "sepse",
  "nome": "Sepse e choque séptico",
  "cat": "emerg",
  "cid": "A41.9",
  "sin": "infeccao grave choque septico lactato",
  "casa": "",
  "unidade": "1) Triagem: usar NEWS/NEWS2, MEWS ou SIRS; não usar o qSOFA isoladamente.\n2) Lactato sérico precoce e seriado para guiar a ressuscitação. Hemoculturas (2 pares) antes do antibiótico, sem atrasá-lo.\n3) Antibiótico empírico conforme foco provável e protocolo local, imediatamente — idealmente na 1ª hora — no choque séptico e também na sepse provável sem choque.\n4) Hipoperfusão ou hipotensão: pelo menos 30 mL/kg de cristaloide EV nas primeiras 3h, individualizando; preferir cristaloide balanceado (Ringer lactato) ao SF 0,9%, exceto no TCE. Reavaliar a cada etapa.\n5) Vasopressor: noradrenalina é a 1ª escolha; alvo inicial de PAM 65 mmHg. Pode iniciar em acesso periférico enquanto não há acesso central.\n6) Dose de noradrenalina em escalada: associar vasopressina (0,03 U/min).\n7) Choque séptico: corticoide EV sugerido (esquema usual: hidrocortisona 200 mg/dia, 50 mg EV de 6/6h).",
  "orient": "- Use a Calculadora para o volume de 30 mL/kg.",
  "fontes": [
   "Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026 (publicada em 23/03/2026). https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026",
   "Surviving Sepsis Campaign 2021 (dose de hidrocortisona). https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-guidelines-2021"
  ],
  "rev": [
   "Item novo."
  ],
  "nota": "Atualizado em 24/09/2026 para o SSC 2026 (antibiótico na 1ª hora também na sepse provável sem choque; noradrenalina periférica; lactato seriado)."
 },
 {
  "id": "pcr",
  "nome": "Parada cardiorrespiratória (suporte avançado)",
  "cat": "emerg",
  "cid": "I46.9",
  "sin": "pcr parada rcp acls fv tv assistolia aesp",
  "casa": "",
  "unidade": "1) RCP de alta qualidade: 100–120 compressões/min, profundidade de pelo menos 5 cm, retorno completo do tórax, mínimo de interrupções.\n   Sem via aérea avançada: 30:2. Com via aérea avançada: 1 ventilação a cada 6 s (10/min), com capnografia.\n2) Ritmo chocável (FV/TV sem pulso): choque único seguido de RCP imediata.\n   Bifásico: energia do fabricante (ex.: 120–200 J; se desconhecida, a máxima). Monofásico: 360 J.\n3) Adrenalina 1 mg EV/IO a cada 3–5 min.\n   - Ritmo não chocável: o quanto antes.\n   - Ritmo chocável: após falha das primeiras desfibrilações.\n4) FV/TV refratária: amiodarona 300 mg (2ª dose 150 mg) ou lidocaína 1–1,5 mg/kg (2ª dose 0,5–0,75 mg/kg).\n5) Não usar de rotina: bicarbonato, cálcio, magnésio, vasopressina (sozinha ou com adrenalina), adrenalina em dose alta.\n6) Causas reversíveis (5H e 5T): hipovolemia, hipóxia, H+ (acidose), hipo/hipercalemia, hipotermia; pneumotórax hipertensivo, tamponamento, toxinas, trombose pulmonar, trombose coronária.\n7) Elevação abrupta do CO2 expirado (ETCO2) pode indicar retorno da circulação espontânea.",
  "orient": "",
  "fontes": [
   "AHA. 2025 Guidelines for CPR and ECC — Part 9: Adult Advanced Life Support. https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support",
   "AHA 2025 Adult Cardiac Arrest Algorithm (doses). https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "bradicardia",
  "nome": "Bradicardia sintomática",
  "cat": "cardio",
  "cid": "R00.1",
  "sin": "bradiarritmia bloqueio av bav marcapasso",
  "casa": "",
  "unidade": "1) Monitorização, O2 se hipoxemia, acesso venoso, ECG de 12 derivações. Buscar causas (hipercalemia, isquemia, fármacos).\n2) Atropina 1 mg EV em bolus; repetir a cada 3–5 min, máx. 3 mg.\n3) Sem resposta: marcapasso transcutâneo\n   E/ou Dopamina 5–20 mcg/kg/min\n   Ou Adrenalina 2–10 mcg/min, titulando pela resposta.\n4) Considerar marcapasso transvenoso e avaliação do especialista.",
  "orient": "",
  "fontes": [
   "AHA 2025 Adult Bradycardia With a Pulse Algorithm. https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Bradycardia-250514.pdf"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "taquicardia",
  "nome": "Taquicardia com pulso (TSV / TV)",
  "cat": "cardio",
  "cid": "I47.1",
  "sin": "tsv taquicardia supraventricular tv arritmia adenosina",
  "casa": "",
  "unidade": "1) Instável (hipotensão, alteração de consciência, choque, dor torácica isquêmica, IC aguda): cardioversão elétrica sincronizada, com energia conforme o aparelho.\n2) Estável, QRS estreito e regular (provável TSV):\n   - Manobra vagal (preferir Valsalva modificada: esforço de 15 s em posição semissentada, seguido de deitar com elevação passiva das pernas).\n   - Adenosina 6 mg EV em bolus rápido seguido de flush de SF; se necessário, 12 mg.\n3) QRS largo, estável:\n   - Amiodarona 150 mg EV em 10 min (repetir se recorrer), seguida de 1 mg/min nas primeiras 6h\n   - Ou Procainamida 20–50 mg/min até supressão, hipotensão, QRS alargar > 50% ou dose máx. de 17 mg/kg.",
  "orient": "",
  "fontes": [
   "AHA 2025 Adult Tachyarrhythmia With a Pulse Algorithm. https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Tachycardia-250514.pdf",
   "Appelboam A et al. Valsalva modificada (REVERT), Lancet 2015."
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "fa",
  "nome": "Fibrilação atrial de alta resposta",
  "cat": "cardio",
  "cid": "I48.9",
  "sin": "fa flutter arritmia fibrilacao atrial rvr",
  "casa": "",
  "unidade": "1) Instável: cardioversão elétrica sincronizada imediata.\n2) Estável — controle de frequência:\n   - Diltiazem 0,25 mg/kg EV em 2 min; se necessário, 0,35 mg/kg após 15 min; manutenção 5–15 mg/h.\n   - Ou Metoprolol 2,5–5 mg EV em 2 min, repetir a cada 5 min até 3 doses.\n   - Disfunção sistólica moderada a grave ou IC descompensada: não usar diltiazem/verapamil EV (dano); preferir amiodarona ou digoxina.\n   - Pré-excitação (WPW): não usar bloqueadores do nó AV; procainamida ou cardioversão.\n3) Sulfato de magnésio EV é uma opção adjuvante razoável para controle de FC.\n4) Cardioversão eletiva (elétrica ou química) em paciente estável: somente se início < 48h e baixo risco tromboembólico, ou após anticoagulação adequada/ETE. Na cardioversão elétrica, iniciar com pelo menos 200 J.\n5) Avaliar anticoagulação (CHA2DS2-VA) e encaminhar.",
  "orient": "",
  "fontes": [
   "Joglar JA et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation (Circulation 2024;149:e1–e156). https://www.ahajournals.org/doi/10.1161/CIR.0000000000001193",
   "ACEP Now: resumo das mudanças para a emergência. https://www.acepnow.com/article/updated-guidelines-on-atrial-fibrillation-management/3/?singlepage=1"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "eap",
  "nome": "Insuficiência cardíaca descompensada / Edema agudo de pulmão",
  "cat": "cardio",
  "cid": "I50.1",
  "sin": "eap edema agudo pulmao icc congestao dispneia",
  "casa": "",
  "unidade": "1) Sentar o paciente, monitorização, ECG, troponina, RX, BNP/NT-proBNP se disponível.\n2) O2 se SatO2 < 90%. Desconforto respiratório: VNI (CPAP ou BiPAP) precoce.\n3) Furosemida EV:\n   - Sem uso prévio de diurético: 20–40 mg EV.\n   - Em uso crônico: dose EV equivalente a 1–2 vezes a dose oral diária.\n   Reavaliar diurese e natriurese nas primeiras horas; aumentar a dose se resposta insuficiente.\n4) Vasodilatador se PAS > 110 mmHg (pode aliviar sintomas): nitroglicerina EV iniciando em 10–20 mcg/min, titulando até 200 mcg/min.\n5) Morfina não é recomendada de rotina.\n6) Buscar e tratar o desencadeante (SCA, arritmia, infecção, má adesão, HAS).",
  "orient": "",
  "fontes": [
   "McDonagh TA et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure (Eur Heart J 2021) e atualização focada de 2023. https://pubmed.ncbi.nlm.nih.gov/37622666/",
   "Canadian Cardiovascular Society — Acute HF (doses de furosemida). https://www.cardioguide.ca/acute-hf/"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "tep",
  "nome": "TEP / TVP",
  "cat": "cardio",
  "cid": "I26.9",
  "sin": "embolia pulmonar trombose venosa profunda tev anticoagulacao",
  "casa": "# TVP ou TEP de baixo risco com alta (Hestia negativo / sPESI 0):\nUso oral\n1) Rivaroxabana 15 mg ------------------------ 42 cp\nTomar 1 cp VO de 12/12h por 21 dias, com alimento. Depois, 20 mg 1x ao dia.\nOu\n1) Apixabana 5 mg ---------------------------- (conforme duração)\nTomar 2 cp (10 mg) VO de 12/12h por 7 dias. Depois, 1 cp (5 mg) de 12/12h.",
  "unidade": "1) Probabilidade clínica: Wells ou Genebra. Baixa probabilidade: aplicar PERC.\n2) Baixa/intermediária: D-dímero; > 50 anos usar corte ajustado (idade × 10 mcg/L). D-dímero negativo exclui.\n3) Alta probabilidade ou D-dímero positivo: angio-TC de tórax (TVP: USG com Doppler).\n4) Probabilidade alta/intermediária: iniciar anticoagulação enquanto aguarda o exame.\n   Enoxaparina 1 mg/kg SC de 12/12h (preferida à heparina não fracionada, exceto instabilidade, candidato a reperfusão ou ClCr < 30).\n5) Estratificar: sPESI, disfunção de VD (TC/eco), troponina.\n6) TEP de alto risco (choque/hipotensão): trombólise sistêmica — alteplase 100 mg EV em 2h.",
  "orient": "- DOAC não deve ser usado em gestantes, SAAF ou ClCr muito reduzido (ver bula).",
  "fontes": [
   "Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism (Eur Heart J 2020;41:543). https://academic.oup.com/eurheartj/article/41/4/543/5556136",
   "Resumo ACC do guideline ESC 2019. https://www.acc.org/latest-in-cardiology/articles/2020/07/10/08/44/2019-esc-guidelines-for-the-diagnosis-and-management-of-acute-pe",
   "Bulas da rivaroxabana e apixabana (esquemas de ataque)."
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "cad",
  "nome": "Cetoacidose diabética / Estado hiperosmolar",
  "cat": "endo",
  "cid": "E10.1",
  "sin": "cad cetoacidose ehh hiperosmolar hiperglicemia grave",
  "casa": "",
  "unidade": "Critérios (consenso ADA/EASD/JBDS 2024):\n- CAD: glicemia ≥ 200 mg/dL (ou DM prévio) + cetonemia (beta-hidroxibutirato ≥ 3 mmol/L ou cetonúria ≥ 2+) + acidose (pH < 7,3 e/ou bicarbonato < 18).\n- EHH: glicemia ≥ 600 mg/dL + osmolalidade efetiva > 300 mOsm/kg + beta-hidroxibutirato < 3 + pH ≥ 7,3 e bicarbonato ≥ 15.\n\nTratamento:\n1) Hidratação: SF 0,9% ou cristaloide balanceado 500–1.000 mL/h nas primeiras 2–4h.\n2) Potássio antes da insulina:\n   - K < 3,5: repor (10 mmol/h) e adiar a insulina.\n   - K < 5,0: iniciar reposição para manter K entre 4 e 5.\n3) Insulina regular EV em bomba:\n   - CAD grave: 0,1 U/kg/h.\n   - CAD leve/moderada: pode-se usar análogo rápido SC a cada 1–2h.\n   - EHH: 0,05 U/kg/h.\n4) Glicemia < 250 mg/dL: associar SG 5–10%.\n5) Bicarbonato só se pH < 7,0.\n6) Transição para SC: iniciar insulina basal 1–2h antes de desligar a bomba.\n7) Buscar desencadeante (infecção, omissão de insulina, iSGLT2, IAM).",
  "orient": "- Use a Calculadora para a taxa de insulina por peso.",
  "fontes": [
   "Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (Diabetes Care 2024;47:1257). https://diabetesjournals.org/care/article/47/8/1257/156808/",
   "Resumo do Cleveland Clinic Journal of Medicine 2025. https://www.ccjm.org/content/92/3/152"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "hipercalemia",
  "nome": "Hipercalemia",
  "cat": "endo",
  "cid": "E87.5",
  "sin": "potassio alto k elevado",
  "casa": "",
  "unidade": "Gravidade: leve 5,5–5,9 | moderada 6,0–6,4 | grave ≥ 6,5 mmol/L.\n1) ECG imediato e monitorização.\n2) Alterações no ECG: gluconato de cálcio 10% 30 mL EV em 10 min (em PCR/peri-PCR: cloreto de cálcio 10% 10 mL em 5 min). Repetir se o ECG não melhorar.\n3) Deslocar o K para dentro da célula:\n   - Insulina regular 10 U + 25 g de glicose EV em 15 min (ex.: 10 U em 50 mL de glicose 50%).\n   - Se glicemia prévia < 126 mg/dL (7 mmol/L): manter glicose 10% 50 mL/h por 5h.\n   - Monitorar glicemia em 0, 30, 60, 90, 120, 180, 240, 300 e 360 min.\n   - Grave: salbutamol nebulizado 10–20 mg como adjuvante (nunca isolado).\n4) Bicarbonato de sódio EV não é recomendado de rotina.\n5) Remover o K: suspender fármacos causadores, diurético se volemia permitir, diálise se refratária.",
  "orient": "",
  "fontes": [
   "UK Kidney Association. Clinical Practice Guideline: Treatment of Acute Hyperkalaemia in Adults, 2023. https://www.ukkidney.org/sites/default/files/FINAL%20VERSION%20-%20UKKA%20CLINICAL%20PRACTICE%20GUIDELINE%20-%20MANAGEMENT%20OF%20HYPERKALAEMIA%20IN%20ADULTS%20-%20191223_0.pdf"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "hda",
  "nome": "Hemorragia digestiva alta",
  "cat": "gi",
  "cid": "K92.2",
  "sin": "hda hematemese melena sangramento digestivo varizes",
  "casa": "",
  "unidade": "1) Dois acessos calibrosos, reposição volêmica, tipagem, hemograma, coagulograma, função renal.\n2) Escore de Glasgow-Blatchford: 0–1 = muito baixo risco, pode ter alta com seguimento ambulatorial.\n3) Transfusão restritiva: hemácias se Hb < 7 g/dL (limiar maior em cardiopatas/sangramento ativo).\n4) Eritromicina 250 mg EV 30–120 min antes da endoscopia.\n5) Endoscopia em até 24h (varizes suspeitas: até 12h, após estabilização).\n6) Não varicosa: IBP em dose alta após a hemostasia endoscópica (a diretriz ACG não se posiciona sobre o IBP antes da endoscopia).\n7) Suspeita de varizes (cirrose):\n   - Vasoativo já na chegada, por até 5 dias: terlipressina, octreotida ou somatostatina.\n   - Ceftriaxona 1 g EV 1x/dia por até 7 dias.",
  "orient": "",
  "fontes": [
   "Laine L et al. ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding (Am J Gastroenterol 2021). https://pubmed.ncbi.nlm.nih.gov/33929377/",
   "Gralnek IM et al. ESGE 2022: Endoscopic diagnosis and management of esophagogastric variceal hemorrhage (Endoscopy 2022). https://www.esge.com/assets/downloads/pdfs/guidelines/2022_a-1939-4887.pdf"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "dor-abdominal",
  "nome": "Dor abdominal aguda — abordagem inicial",
  "cat": "gi",
  "cid": "R10.4",
  "sin": "abdome agudo apendicite dor na barriga",
  "casa": "",
  "unidade": "1) Sinais de alarme: instabilidade, peritonite, dor desproporcional ao exame (isquemia mesentérica), idoso, imunossuprimido, gestante.\n2) Beta-hCG em toda mulher em idade fértil.\n3) ECG em idosos/dor epigástrica (SCA pode se apresentar como dor abdominal).\n4) Analgesia precoce não atrasa nem mascara o diagnóstico: dipirona 1g EV; se intensa, morfina 0,1 mg/kg EV titulada.\n5) Exames e imagem conforme a hipótese (USG, TC).",
  "orient": "",
  "fontes": [
   "Manterola C et al. Analgesia in patients with acute abdominal pain (Cochrane Database Syst Rev 2011;CD005660): opioides não aumentaram erro diagnóstico."
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "tce",
  "nome": "TCE leve",
  "cat": "dor",
  "cid": "S06.0",
  "sin": "traumatismo cranioencefalico concussao batida cabeca queda",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor de cabeça.",
  "unidade": "Regra canadense de TC de crânio (adulto ≥ 16 anos, Glasgow 13–15 com perda de consciência, amnésia ou desorientação testemunhada).\nTC indicada se qualquer um:\nAlto risco (lesão neurocirúrgica):\n- Glasgow < 15 duas horas após o trauma\n- Suspeita de fratura aberta ou com afundamento\n- Sinal de fratura de base de crânio (hemotímpano, olhos de guaxinim, rinorreia/otorreia liquórica, sinal de Battle)\n- Vômitos ≥ 2 episódios\n- Idade ≥ 65 anos\nMédio risco (lesão na TC):\n- Amnésia retrógrada ≥ 30 min\n- Mecanismo perigoso (atropelamento, ejeção do veículo, queda > 1 m ou > 5 degraus)\n\nA regra não se aplica (exclusões): < 16 anos, uso de anticoagulante ou coagulopatia, convulsão pós-trauma, fratura aberta evidente. Nesses casos, baixo limiar para TC.\nCriança: usar a regra PECARN.",
  "orient": "- Alta com acompanhante; retorno imediato se piora da dor de cabeça, vômitos repetidos, sonolência, confusão, convulsão, fraqueza, alteração da fala.",
  "fontes": [
   "Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury (Lancet 2001;357:1391). https://pubmed.ncbi.nlm.nih.gov/11356436/",
   "ACEP Clinical Policy: Mild Traumatic Brain Injury, 2023. https://pubmed.ncbi.nlm.nih.gov/37085214/"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "entorse",
  "nome": "Entorse de tornozelo",
  "cat": "dor",
  "cid": "S93.4",
  "sin": "torcao pe tornozelo trauma musculoesqueletico",
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.\n\nUso tópico (alternativa ao AINE oral)\n3) Diclofenaco dietilamônio gel -------------- 1 bisnaga\nAplicar no local 3 a 4x ao dia por até 7 dias.",
  "unidade": "Regras de Ottawa — RX indicado se dor maleolar/mediopé E qualquer um:\n- Dor à palpação dos 6 cm distais da borda posterior ou ponta do maléolo lateral ou medial.\n- Dor à palpação da base do 5º metatarso ou do navicular.\n- Incapacidade de dar 4 passos (logo após o trauma e na emergência).",
  "orient": "- Gelo 15–20 min várias vezes ao dia nos primeiros dias; elevação do membro.\n- Tratamento funcional (tornozeleira/órtese e carga conforme tolerância) é preferível à imobilização rígida.\n- Iniciar exercícios de mobilidade e propriocepção precocemente.",
  "fontes": [
   "Bachmann LM et al. Accuracy of Ottawa ankle rules to exclude fractures: systematic review (BMJ 2003;326:417). https://www.ncbi.nlm.nih.gov/books/NBK69576/",
   "Vuurberg G et al. Diagnosis, treatment and prevention of ankle sprains: update of an evidence-based clinical guideline (Br J Sports Med 2018)."
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "escorpiao",
  "nome": "Acidente escorpiônico",
  "cat": "toxinf",
  "cid": "T63.2",
  "sin": "escorpiao picada escorpionismo",
  "casa": "Uso oral (casos leves, após observação)\n1) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor.",
  "unidade": "Classificação e soroterapia (SAEsc; SAA só na falta dele ou na dúvida com aranha-armadeira), mesma dose em qualquer idade:\n- Leve (dor, eritema, parestesia, sudorese local; às vezes náusea, vômito, agitação e taquicardia discretos, ligados à dor): sem soro.\n- Moderado (sudorese, náuseas, alguns vômitos, alteração leve da FC ou da PA, agitação): 3 frascos-ampolas EV, de imediato.\n- Grave (vômitos repetidos, sudorese profusa, sialorreia, agitação alternada com sonolência, taquidispneia, priapismo, convulsões, ICC, EAP, choque): 6 frascos-ampolas EV (não passar de 6).\n\nAdministração: diluir em SF 0,9% ou SG 5% de 1:2 a 1:5; infundir em 10–15 min (8–12 mL/min), atento à sobrecarga hídrica na criança. Intraóssea se não houver acesso venoso. SAA: infundir em 20–60 min. Reação: suspender, tratar e retomar.\n\nAnalgesia:\n- Dor leve: dipirona VO. Moderada: dipirona EV.\n- Intensa: associar infiltração local de lidocaína 2% sem vasoconstritor, que pode ser repetida até 3 vezes com intervalo de 40–60 min.\n- Recidiva: associar opioide fraco. Compressa morna no local.\n\nSuporte: antiemético se os vômitos persistirem após o soro (metoclopramida tem uso restrito em crianças) | HAS costuma ser transitória, tratar só se persistir após o soro | EAP: O2 e furosemida EV | choque: dobutamina (noradrenalina se o choque for misto, com cautela em crianças) | mioclonia (escorpiões da Amazônia): diazepam.\n\nObservação: sem manifestações 4 h | leve 6–12 h | com soro, pelo menos 24 h. Grave: monitorização contínua (UTI se possível).\nCrianças até 10 anos (sobretudo abaixo de 7) e portadores de HAS, DM, cardiopatia ou nefropatia têm maior risco de formas graves.\nNão usar: torniquete, substâncias no local, corticoide ou anti-histamínico profilático, dexametasona, antibiótico profilático.\nExames só se houver manifestação sistêmica (a falta deles não atrasa o soro): ECG na admissão (sobretudo em crianças), hemograma, glicemia, eletrólitos (K), amilase, gasometria, ureia, creatinina, RX de tórax. Se houver suspeita de miocardite: CK-MB, troponina, ecocardiograma.",
  "orient": "- Lavar o local com água e sabão; compressa morna para a dor.\n- Voltar se houver vômitos, sudorese intensa, sonolência ou falta de ar (sobretudo em crianças).\n- Notificação compulsória (SINAN). Dúvidas: CIATox (Disque-Intoxicação 0800 722 6001).",
  "fontes": [
   "Ministério da Saúde. PCDT Acidentes Escorpiônicos — Portaria SECTICS/MS nº 59, de 1º/8/2025 (Quadro 2: classificação; Quadro 4: observação; Quadro 5: 3 ou 6 frascos, no máximo 6; 7.2: analgesia e suporte; 7.3.2: diluição e infusão; 8: exames). https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-acidentes-escorpionicos/@@display-file/file",
   "Anvisa. Disque-Intoxicação 0800 722 6001. https://www.gov.br/anvisa/pt-br/assuntos/agrotoxicos/disque-intoxicacao"
  ],
  "rev": [
   "Conferido com o PCDT Acidentes Escorpiônicos (Portaria SECTICS/MS nº 59/2025): doses mantidas; incluídos diluição e infusão, via intraóssea, ECG na admissão, suporte e medidas não recomendadas.",
   "Item novo."
  ]
 },
 {
  "id": "ofidico",
  "nome": "Acidente ofídico",
  "cat": "toxinf",
  "cid": "T63.0",
  "sin": "cobra serpente picada jararaca cascavel coral surucucu",
  "casa": "",
  "unidade": "1) Não usar garrote/torniquete e não fazer incisão no local. Lavar com água e sabão e depois SF 0,9%. Manter o membro elevado e estendido; retirar anéis e pulseiras.\n2) Exames: tempo de coagulação, TP/TTPa, hemograma com plaquetas, ureia, creatinina, eletrólitos, CK e urina (mioglobina), sobretudo no crotálico e no elapídico.\n3) Soro antiveneno EV o mais cedo possível, conforme gênero e gravidade (frascos-ampolas; mesma dose em adultos e crianças):\n   - Botrópico (jararaca), SABR: leve (edema de até 1 segmento) 3 | moderado (2 segmentos) 6 | grave (3 segmentos, hemorragia grave, choque ou IRA) 12.\n   - Crotálico (cascavel), SAC ou SABC: leve 5 | moderado 10 | grave 20.\n   - Laquético (surucucu), SABL: moderado 10 | grave (hemorragia intensa ou manifestações vagais) 20.\n   - Elapídico (coral), SAELA: leve (só parestesia e dor local) sem soro, observar 24 h e dar soro se surgir miastenia | moderado (ptose, fraqueza sem paralisia) 5 | grave (paralisia, disfagia, respiração superficial) 10.\n   Segmentos: mão/punho, antebraço/cotovelo, braço (pé/tornozelo, perna/joelho, coxa).\n4) Administração: diluir em SF 0,9% ou SG 5% (antielapídico 1:2 a 1:5); infundir a 8–12 mL/min, atento à sobrecarga de volume; dose inteira de uma vez, sem fracionar. Sem pré-medicação e sem teste de sensibilidade.\n5) Reação ao soro: suspender, tratar (adrenalina é a prioridade) e retomar assim que houver remissão.\n6) Dor: dipirona ou paracetamol. Não usar AINE. Evitar IM; não fazer bloqueio anestésico nem medicação no local; acesso EV fora do membro picado.\n7) Hidratação para manter boa diurese (risco de IRA). Antibiótico só se houver infecção estabelecida. Profilaxia antitetânica conforme vacinação.\n8) Observação: sem sintomas, pelo menos 6 h | com soro, pelo menos 24 h | crotálico, 24 a 72 h | elapídico, pelo menos 24 h. Botrópico com TC alterado 24 h após o soro: mais 2 frascos. Piora: reclassificar e completar a dose.\n9) Elapídico com paralisia: suporte ventilatório; neostigmina precedida de atropina, com dose orientada pelo CIATox.",
  "orient": "- Notificação compulsória (SINAN) em até 24 h.\n- Dúvidas: CIATox (Disque-Intoxicação 0800 722 6001).\n- Não capturar nem matar a serpente; se possível, fotografar a distância segura.",
  "fontes": [
   "Ministério da Saúde. PCDT Acidentes Ofídicos — Portaria SECTICS/MS nº 83, de 7/10/2025 (Quadros 7 a 10: frascos por gravidade; 7.1: medidas locais, analgesia e AINE; 7.2: sem pré-soroterapia; 7.3.1: via, diluição e velocidade; 8: tempo de observação). https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt_acidentes_ofidicos_final.pdf/@@display-file/file",
   "Ministério da Saúde. Acidentes ofídicos — Tratamento. https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos/acidentes-ofidicos/tratamento",
   "Anvisa. Disque-Intoxicação 0800 722 6001. https://www.gov.br/anvisa/pt-br/assuntos/agrotoxicos/disque-intoxicacao"
  ],
  "rev": [
   "Atualizado ao PCDT Acidentes Ofídicos (Portaria SECTICS/MS nº 83/2025): botrópico 3/6/12 frascos; elapídico sem soro no leve, 5 no moderado e 10 no grave; incluídos via, diluição, velocidade, observação, ausência de pré-medicação e contraindicação de AINE.",
   "Item novo."
  ]
 },
 {
  "id": "intoxicacao",
  "nome": "Intoxicação exógena — abordagem inicial",
  "cat": "toxinf",
  "cid": "T65.9",
  "sin": "envenenamento overdose tentativa ingestao medicamento carvao",
  "casa": "",
  "unidade": "1) ABC, glicemia capilar, ECG (QRS, QT), monitorização.\n2) Ligar para o CIATox: Disque-Intoxicação 0800 722 6001 (24h, gratuito).\n3) Carvão ativado dose única: considerar se ingestão de quantidade tóxica há até 1h.\n   Dose: adultos 25–100 g | crianças 1–12 anos 25–50 g ou 0,5–1 g/kg | < 1 ano 10–25 g ou 0,5–1 g/kg.\n   Contraindicações: via aérea não protegida, hidrocarbonetos, corrosivos, risco de perfuração/sangramento GI.\n   Pouco eficaz para: lítio, ferro, metais pesados, álcool.\n4) Opioide com depressão respiratória: naloxona EV/IM/SC, titulada (ver bula e orientação do CIATox).\n5) Paracetamol: N-acetilcisteína conforme nomograma, orientado pelo CIATox.\n6) Tentativa de suicídio: avaliação psiquiátrica e medidas de segurança antes da alta.",
  "orient": "- Notificação compulsória (SINAN).",
  "fontes": [
   "AACT/EAPCCT. Position Paper: Single-Dose Activated Charcoal. https://eapcct.org/wp-content/uploads/2024/09/PS_SingleDoseActivatedCharcoal.pdf",
   "Anvisa. Disque-Intoxicação 0800 722 6001. https://www.gov.br/anvisa/pt-br/assuntos/agrotoxicos/disque-intoxicacao"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "queimadura",
  "nome": "Queimaduras",
  "cat": "pele",
  "cid": "T30.0",
  "sin": "queimado escaldadura fogo",
  "casa": "Uso tópico (queimaduras pequenas de 2º grau, alta)\n1) Sulfadiazina de prata 1% creme ------------ 1 bisnaga\nAplicar sobre a lesão após limpeza, 1 a 2x ao dia, com curativo.\n\nUso oral\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.",
  "unidade": "1) Interromper o processo: resfriar com água corrente em temperatura ambiente; não usar gelo.\n2) Calcular a superfície corporal queimada (SCQ) — regra dos nove (adulto) ou Lund-Browder (criança).\n3) Hidratação se SCQ > 20% no adulto ou > 10% na criança, com Ringer lactato:\n   Parkland: 2–4 mL × peso (kg) × % SCQ (2 mL em idosos/insuficiência renal; 4 mL em crianças e adultos jovens).\n   Metade nas primeiras 8h (a contar da queimadura) e metade nas 16h seguintes. Alvo de diurese 0,5–1 mL/kg/h.\n4) Analgesia: dipirona 500 mg–1 g EV; morfina 1 mg/10 kg (adulto) | criança: dipirona 15–25 mg/kg, morfina 0,1 mg/kg/dose.\n5) Limpeza com água e clorexidina 2%; sulfadiazina de prata 1%.\n6) Profilaxia antitetânica. não usar antibiótico sistêmico profilático.\nEncaminhar a centro de queimados: 2º grau > 20% SCQ (adulto), 3º grau de qualquer extensão, face, olhos, períneo, mãos, pés, grandes articulações, lesão inalatória, trauma elétrico ou químico.",
  "orient": "- Não furar bolhas em casa; retorno para troca de curativo.",
  "fontes": [
   "Ministério da Saúde. Cartilha para tratamento de emergência das queimaduras, 2012. https://portal.cfm.org.br/images/stories/pdf/queimados.pdf"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "pre-eclampsia",
  "nome": "Pré-eclâmpsia grave / Eclâmpsia",
  "cat": "gu",
  "cid": "O14.1",
  "sin": "gestante pressao alta eclampsia sulfato de magnesio hellp",
  "casa": "",
  "unidade": "Sinais de gravidade: PA ≥ 160 e/ou 110 mmHg persistente por 15 min, iminência de eclâmpsia (cefaleia, alterações visuais, dor epigástrica, hiper-reflexia), eclâmpsia, HELLP, oligúria (< 500 mL/24 h), creatinina ≥ 1,0 mg/dL, edema pulmonar, dor torácica.\nDecúbito lateral esquerdo, acesso venoso, sonda vesical; hemograma com plaquetas, AST/ALT, LDH, bilirrubinas, creatinina.\n\nSulfato de magnésio (prevenção e tratamento da convulsão):\n- Ataque (Zuspan e Pritchard): 4 g EV = 8 mL de MgSO4 50% + 12 mL de água destilada, EV lento em 15–20 min (RBEHG 2023; o MS 2022 aceita 5–10 min).\n- Zuspan: manutenção 1 g/h EV em bomba.\n- Pritchard: além dos 4 g EV, 10 g IM no ataque (10 mL de MgSO4 50% IM profundo em cada nádega); depois 5 g (10 mL a 50%) IM profundo a cada 4 h. Útil para transporte ou sem bomba; evitar IM na HELLP com plaquetopenia.\n- Creatinina ≥ 1,0 mg/dL (RBEHG; MS: > 1,3): metade da dose de manutenção e dosar o magnésio.\n- Manter por 24 h após o parto ou a última convulsão.\n- Monitorar: reflexo patelar presente, FR ≥ 16, diurese ≥ 25 mL/h.\n- Nova convulsão durante o MgSO4: mais 2 g EV em bolus e manutenção a 2 g/h; sem controle, UTI e neuroimagem.\n- Intoxicação (depressão respiratória, arreflexia): parar o MgSO4; gluconato de cálcio 10% 10 mL (1 g) EV lento em cerca de 3 min; O2 e suporte ventilatório.\n\nCrise hipertensiva na gestação (PA ≥ 160/110, tratar em até 30–60 min):\n- Hidralazina 20 mg/mL: 1 amp + 19 mL de água destilada = 1 mg/mL; 5 mg EV a cada 20 min (máx. 30 mg).\n- Ou Nifedipino de liberação imediata 10 mg VO a cada 20–30 min (máx. 30 mg); não mastigar, não usar sublingual.\n- Meta: reduzir 15–25%, PAS 140–150 e PAD 90–100 mmHg.\n- Edema pulmonar ou refratária: nitroglicerina ou nitroprussiato EV (nitroprussiato por no máximo 4 h).",
  "orient": "- Encaminhar para maternidade de referência; decisão sobre o parto com a obstetrícia.\n- Transferência: fazer pelo menos o ataque do sulfato de magnésio (4 g EV + 10 g IM cobre cerca de 4 h).\n- Parto em qualquer idade gestacional se eclâmpsia, HELLP, descolamento de placenta, edema pulmonar, hipertensão refratária a 3 fármacos, piora laboratorial ou alteração da vitalidade fetal; sem sinais de gravidade, parto com 37 semanas.\n- Puerpério: a PA pode piorar entre o 3º e o 6º dia; cerca de 30% das eclâmpsias ocorrem após o parto.",
  "fontes": [
   "Brasil. Ministério da Saúde. Manual de Gestação de Alto Risco, 2022 — cap. 11.",
   "Sociedade Brasileira de Cardiologia. Diretriz Brasileira de Hipertensão Arterial 2025, cap. 10 (Arq Bras Cardiol 2025;122(9)).",
   "ACOG Committee Opinion 767. Emergent therapy for acute-onset, severe hypertension during pregnancy and the postpartum period (Obstet Gynecol 2019;133:e174).",
   "Bula profissional Anvisa do sulfato de magnésio 50% e do gluconato de cálcio 10%.",
   "Rede Brasileira de Estudos sobre Hipertensão na Gravidez (RBEHG). Protocolo 03 – Pré-eclâmpsia, 2023. https://rbehg.com.br/wp-content/uploads/2023/08/PROTOCOLO-2023-FINAL.pdf"
  ],
  "rev": [
   "Atualizado (RBEHG 2023, MS 2022): tempo do ataque de sulfato de magnésio, diluição do Pritchard IM, ajuste pela creatinina, conduta na nova convulsão, diluição da hidralazina, momento do parto e cuidados no puerpério.",
   "Item novo."
  ]
 },
 {
  "id": "desidratacao-crianca",
  "nome": "Diarreia aguda com desidratação (criança)",
  "cat": "gi",
  "cid": "A09",
  "sin": "desidratacao pediatria diarreia crianca plano a b c soro",
  "casa": "Plano A (sem desidratação)\n1) Sais de reidratação oral ------------------ 10 envelopes\nOferecer após cada evacuação: < 1 ano 50–100 mL | 1–10 anos 100–200 mL | > 10 anos o que aceitar.\n2) Zinco (crianças < 5 anos)\nAté 6 meses: 10 mg/dia | > 6 meses: 20 mg/dia, por 10 a 14 dias.\n3) Probiótico (opcional; reduz cerca de 1 dia de diarreia)\nSaccharomyces boulardii 250–750 mg/dia por 5 a 7 dias.",
  "unidade": "Plano B (desidratação leve/moderada):\nSRO 50–100 mL/kg em 4–6h, em pequenos volumes, reavaliando; termina quando sumirem os sinais de desidratação.\n\nPlano C (desidratação grave):\nFase rápida — SF 0,9% ou Ringer lactato:\n- < 1 ano: 30 mL/kg em 1h, depois 70 mL/kg em 5h.\n- ≥ 1 ano: 30 mL/kg em 30 min, depois 70 mL/kg em 2h30.\n\nVômitos persistentes — ondansetrona dose única:\n6 meses–2 anos: 2 mg | > 2–10 anos (até 30 kg): 4 mg | > 10 anos (> 30 kg): 8 mg.\n\nAntibiótico só na disenteria com comprometimento do estado geral:\n- Até 10 anos/30 kg: azitromicina 10 mg/kg no 1º dia e 5 mg/kg por mais 4 dias, ou ceftriaxona 50–100 mg/kg IM 1x/dia por 3–5 dias.\n- > 10 anos/30 kg: ciprofloxacino 500 mg de 12/12h por 3 dias.",
  "orient": "- Manter aleitamento e alimentação habitual.\n- Retorno se piora, sangue nas fezes, vômitos que impedem a hidratação, sonolência ou pouca urina.",
  "fontes": [
   "Sociedade Brasileira de Pediatria. Guia Prático: Diarreia Aguda Infecciosa, 2023. https://www.sbp.com.br/fileadmin/user_upload/sbp/2023/junho/14/24048aPRESS-GPA-Diarreia_Aguda_Infecciosa-pSITE.pdf",
   "Ministério da Saúde. Manejo do paciente com diarreia (cartaz). https://bvsms.saude.gov.br/bvs/cartazes/manejo_paciente_diarreia_cartaz.pdf"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "bronquiolite",
  "nome": "Bronquiolite viral aguda (lactente)",
  "cat": "resp",
  "cid": "J21.9",
  "sin": "bronquiolite vsr lactente chiado bebe",
  "casa": "Uso nasal\n1) Soro fisiológico 0,9% --------------------- 1 fr\nPingar gotas em cada narina e aspirar antes das mamadas, quantas vezes precisar.",
  "unidade": "1) Diagnóstico clínico (história e exame). Não pedir RX nem pesquisa viral de rotina.\n2) Não usar de rotina: salbutamol, adrenalina, corticoide, antibiótico (sem infecção bacteriana), fisioterapia respiratória.\n3) Solução salina hipertônica nebulizada não é recomendada na emergência (pode ser usada em internados).\n4) O2 e oximetria: conforme julgamento clínico.\n5) Sem aceitar via oral: hidratação por sonda nasogástrica ou EV.",
  "orient": "- Sinais de alarme para retorno: esforço respiratório, pausas respiratórias, cianose, recusa alimentar, menos fraldas molhadas.",
  "fontes": [
   "Ralston SL et al. AAP Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis (Pediatrics 2014;134:e1474). https://publications.aap.org/pediatrics/article/134/5/e1474/75848/"
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "crupe",
  "nome": "Crupe (laringotraqueíte viral)",
  "cat": "resp",
  "cid": "J05.0",
  "sin": "laringite tosse de cachorro estridor crianca",
  "casa": "",
  "unidade": "1) Dexametasona dose única 0,15–0,6 mg/kg VO/IM (a Calculadora usa 0,6 mg/kg, máx. 10 mg).\n2) Crupe moderado a grave (estridor em repouso): adrenalina nebulizada (1 mg/mL) 0,5 mL/kg, máx. 5 mL; observar por pelo menos 2–4h após.\n3) Manter a criança calma, no colo; O2 se hipoxemia.",
  "orient": "- Retorno se estridor em repouso, esforço respiratório ou dificuldade para engolir/babar.",
  "fontes": [
   "Gates A et al. Glucocorticoids for croup in children (Cochrane Database Syst Rev 2018;CD001955).",
   "Bjornson C et al. Nebulized epinephrine for croup in children (Cochrane Database Syst Rev 2013;CD006619).",
   "Smith DK et al. Croup: Diagnosis and Management (Am Fam Physician 2018;97:575)."
  ],
  "rev": [
   "Item novo."
  ]
 },
 {
  "id": "tosse",
  "nome": "Tosse (aguda, subaguda e crônica)",
  "cat": "resp",
  "cid": "R05",
  "sin": "tosse seca produtiva pigarro coqueluche gotejamento pos nasal",
  "casa": "# Tosse aguda (< 3 semanas) do resfriado — sintomático\nUso oral\n1) Mel -----------------------------------------\nTomar 1 colher de chá (5 mL) puro ou em chá morno até 3x ao dia, principalmente à noite. Não dar a menores de 1 ano.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h por 3 dias.\n\nUso nasal\n4) Soro fisiológico 0,9% --------------------- 1 fr\nLavar as narinas com 5–10 mL em cada lado 3 a 4x ao dia.\n\n# Tosse subaguda pós-infecciosa (3–8 semanas), após excluir pneumonia e coqueluche\n5) Brometo de ipratrópio spray --------------- 1 fr\nInalar 2 jatos de 6/6h por até 2 semanas.\n\n# Coqueluche (suspeita: tosse ≥ 14 dias com paroxismos, guincho inspiratório ou vômito pós-tosse)\n6) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia.",
  "unidade": "1) Classificar pela duração: aguda < 3 semanas | subaguda 3–8 semanas | crônica > 8 semanas.\n2) Sinais de alarme: dispneia, hemoptise, febre persistente, perda de peso, rouquidão, sibilância nova, tabagismo importante (≥ 20 maços-ano ou fumante > 45 anos), pneumonias de repetição, imunossupressão.\n3) Aguda: pensar em IVAS, mas excluir pneumonia (FR, SatO2, ausculta), TEP, IC, asma/DPOC exacerbados.\n4) Crônica: RX de tórax; suspender IECA (a tosse some em 1 semana a 3 meses); investigar as causas mais comuns:\n   - Síndrome da tosse das vias aéreas superiores: corticoide nasal (+ anti-histamínico de 1ª geração com descongestionante como teste).\n   - Asma (inclui variante tosse): corticoide inalatório + broncodilatador.\n   - Refluxo: IBP por pelo menos 8 semanas com mudança de hábitos.\n   - Bronquite eosinofílica não asmática: corticoide inalatório.\n5) Tosse por mais de 2–3 semanas com febre, suor noturno ou emagrecimento: investigar tuberculose (baciloscopia/TRM-TB).",
  "orient": "- Antibiótico não trata tosse viral.\n- Codeína não deve ser usada para tosse em menores de 12 anos.\n- Coqueluche: notificação compulsória; avaliar quimioprofilaxia dos contatos prioritários (menores de 1 ano, gestantes a partir de 32 semanas, imunossuprimidos, profissionais de saúde).\n- Retorno se falta de ar, sangue no escarro, febre alta ou tosse que piora.",
  "fontes": [
   "Irwin RS et al. Classification of Cough as a Symptom in Adults and Management Algorithms — CHEST Guideline (Chest 2018). https://journal.chestnet.org/article/S0012-3692(17)32918-5/fulltext",
   "Malesker MA et al. Treatment for Acute Cough Associated With the Common Cold — CHEST (Chest 2017). https://journal.chestnet.org/article/S0012-3692(17)31408-3/fulltext",
   "Morice AH et al. ERS guidelines on chronic cough in adults and children (Eur Respir J 2020). https://publications.ersnet.org/content/erj/55/1/1901136",
   "Michaudet C, Malaty J. Chronic Cough: Evaluation and Management (Am Fam Physician 2017). https://www.aafp.org/pubs/afp/issues/2017/1101/p575.html",
   "Oduwole O et al. Honey for acute cough in children (Cochrane 2018;CD007094).",
   "Braman SS. Postinfectious cough: ACCP guidelines (Chest 2006) — ipratrópio inalatório.",
   "Ministério da Saúde. Nota Técnica Conjunta nº 165/2025 — coqueluche (azitromicina e quimioprofilaxia). https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2025/nota-tecnica-conjunta-no-165-2025-dpni-svsa-ms.pdf",
   "EMA 2015: codeína contraindicada para tosse em menores de 12 anos."
  ],
  "evid": "Para a tosse aguda do resfriado a evidência dos sintomáticos é de baixa qualidade (CHEST 2017); mel tem benefício pequeno em crianças.",
  "rev": [
   "Item novo."
  ]
 }
];
const DILFONTE = "Prefeitura de Joinville. Manual de diluição de medicamentos injetáveis — Pronto Atendimento, 2018. https://www.joinville.sc.gov.br/public/portaladm/pdf/jornal/aff57d668dbf18219d7b9e8f2d949b08.pdf";
if (typeof module !== "undefined") module.exports = { CATS, BASE };

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
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (no máximo 8 cp por dia).\n\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\n\nAntibiótico\n3) Cefalexina 500mg -------------------------- 28 cp\nTomar 1 cp VO de 6/6h por 7 dias.\nOu\n3) Sulfametoxazol + Trimetoprima 800/160mg --- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\nOu\n3) Clindamicina 300mg ------------------------ 28 cp\nTomar 1 cp VO de 6/6h por 7 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue, em quem tem febre.","Antibiótico se celulite ao redor, sinais sistêmicos, lesão > 2 cm ou imunossupressão.","Sulfametoxazol + trimetoprima se suspeita de MRSA comunitário ou falha prévia.","Clindamicina se alergia a penicilina."],
  "unidade": "1) Drenagem (incisão, expressão e lavagem com SF 0,9%) + curativo, se flutuante.\n2) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de soro fisiológico ou água destilada.",
  "orient": "- Faça compressas mornas no local 3 a 4 vezes ao dia.\n- Retorne em 48 horas para reavaliação e troca do curativo.\n- Volte imediatamente ao pronto-socorro se tiver febre, se a vermelhidão se espalhar ou se a dor piorar.",
  "rev": [
   "Corrigido (2026-10-17): clindamicina 300 mg de 8/8h → 6/6h, 28 cp (IDSA SSTI 2014, tabela 2; NICE NG141); dipirona com no máximo 8 cp por dia (ficha dipirona, EMA 2024); ibuprofeno por até 5 dias e só se dengue descartada em quem tem febre (MS, Dengue, 6ª ed., 2024).",
   "Atualizado: drenagem é o tratamento principal; antibiótico só com os critérios indicados.",
   "Ajustado: ibuprofeno 300mg 12/12h → 600mg 8/8h (dose anti-inflamatória).",
   "Ajustado: duração do antibiótico 10 → 7 dias (IDSA: 5–10 dias).",
   "Adicionado: SMX-TMP para suspeita de MRSA comunitário.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10).",
   "Talan DA et al. Trimethoprim–sulfamethoxazole for uncomplicated skin abscess (N Engl J Med 2016;374:823).",
   "National Institute for Health and Care Excellence. NG141 — Cellulitis and erysipelas: antimicrobial prescribing, 2019 (clindamicina 300 mg 4x ao dia; 450 mg se grave). https://www.nice.org.uk/guidance/ng141",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue)."
  ]
 },
 {
  "id": "afta",
  "nome": "Afta / Estomatite aftosa",
  "cat": "gi",
  "cid": "K12.0",
  "sin": "ulcera oral boca",
  "casa": "Uso oral\n1) Clorexidina 0,12% solução oral ------------ 1 fr\nBochechar 15 mL (1 tampa), sem diluir, por 30 segundos, 2x ao dia (manhã e noite), após a higiene oral, por 7 a 10 dias. Não engolir.\nOu\n1) Triancinolona 1mg/g em orabase (Omcilon-A Orabase) --- 1 bisnaga\nAplicar pequena quantidade sobre as lesões, sem esfregar, 2 a 3x ao dia, após as refeições e ao deitar, por até 7 dias.",
  "unidade": "",
  "orient": "- Evite alimentos ácidos, muito quentes ou condimentados.\n- Se a ferida na boca não cicatrizar em 2 a 3 semanas, procure reavaliação médica.",
  "rev": [
   "Corrigido (2026-10-17): clorexidina 15 mL por 30 segundos e triancinolona sem esfregar, também ao deitar (bulas Periogard e Omcilon-A Orabase); fonte Cochrane trocada, pois a citada (CD005411) avalia só tratamento sistêmico (Edgar 2017)."
  ],
  "evid": "Poucos ensaios de qualidade; tratamento é sintomático.",
  "fontes": [
   "Edgar NR, Saleh D, Miller RA. Recurrent aphthous stomatitis: a review (J Clin Aesthet Dermatol 2017;10(3):26-36; PMID 28360966). Tratamento tópico de 1ª linha: clorexidina, corticoide tópico, anestésico local.",
   "Bula Periogard (gluconato de clorexidina 0,12%, Colgate): 15 mL sem diluir, por 30 segundos, 2x ao dia, após a higiene oral.",
   "Bula Omcilon-A Orabase (triancinolona acetonida 1 mg/g): aplicar sem esfregar, ao deitar e 2 a 3x ao dia após as refeições; reavaliar se não melhorar em 7 dias."
  ]
 },
 {
  "id": "asma",
  "nome": "Asma / Crise de asma",
  "cat": "resp",
  "cid": "J45.9",
  "sin": "broncoespasmo chiado sibilancia bombinha",
  "casa": "Uso oral\n1) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.\n\nUso inalatório\n2) Budesonida + Formoterol 200/6mcg ---------- 1 fr\nInalar 2 jatos de 12/12h, uso contínuo, e 1 jato a mais se falta de ar ou chiado. No máximo 12 jatos por dia, somando todos. Enxaguar a boca após o uso.\nOu\n2) Beclometasona 250mcg spray ---------------- 1 fr\nInalar 1 jato de 12/12h com espaçador, uso contínuo. Enxaguar a boca após o uso.\n\n# Se beclometasona (sem budesonida-formoterol), alívio com salbutamol:\n3) Salbutamol 100mcg spray ------------------- 1 fr\nInalar 4 jatos com espaçador de 4/4h se falta de ar ou chiado nos próximos 2 a 3 dias; depois, somente se necessário.",
  "avisoRx": ["Beclometasona só se budesonida + formoterol indisponível.","Revisar a técnica inalatória com espaçador com o paciente.","Consulta com clínico em 2 a 7 dias para controle da asma (GINA 2026)."],
  "unidade": "1) Salbutamol 100mcg spray: 4 a 10 jatos com espaçador a cada 20 min na 1ª hora (3 ciclos).\n   Ou Nebulização: Salbutamol 5mg/mL 10 a 20 gotas (2,5–5mg) + Brometo de ipratrópio 0,25mg/mL 40 gotas (0,5mg) em 3–5 mL de SF 0,9%, a cada 20 min, 3 vezes.\n2) Brometo de ipratrópio spray 20mcg/jato: 4 jatos a cada 20 min junto com o salbutamol, até 3 vezes (crise moderada/grave ou sem resposta).\n3) Corticoide na 1ª hora: Prednisona 40–50mg VO (2 cp de 20mg)\n   Ou Hidrocortisona 200mg EV (se não tolerar VO).\n4) O2 por cateter nasal se SatO2 < 92% (alvo 92–95% no adulto; na gestante, acima de 95%).\n5) Crise grave ou refratária: Sulfato de magnésio 50% 2g (4 mL) em 100 mL de SF 0,9% EV em 20 min.\n6) Reavaliar em 1h: fala, FR, uso de musculatura acessória, SatO2, PFE.",
  "orient": "- Use a bombinha com o espaçador, do jeito mostrado no atendimento.\n- Volte imediatamente ao pronto-socorro se tiver falta de ar ao falar, lábios arroxeados ou se não melhorar com a bombinha de alívio.\n- Marque consulta com o clínico em 2 a 7 dias para o controle da asma.",
  "rev": [
   "Corrigido (2026-10-17): GINA 2026 — alvo de O2 92–95% (gestante acima de 95%); prednisona 40–60 → 40–50 mg; ipratrópio 4 jatos até 3 vezes; após a crise, budesonida-formoterol 2 jatos de 12/12h como manutenção e alívio (MART, máx. 12 jatos por dia), com salbutamol só junto da beclometasona; retorno em 2–7 dias (GINA 2026, fig. 9 e box 4-7; SBPT 2020; HC-FMUSP 18ª ed.).",
   "Removido: loratadina (não trata asma; usar só se rinite associada).",
   "Atualizado (GINA): O2 com alvo 93–95%; corticoide 1x ao dia; controlador contínuo em vez de 6 semanas; budesonida-formoterol como opção preferencial.",
   "Adicionado: sulfato de magnésio para crise grave."
  ],
  "fontes": [
   "Global Initiative for Asthma (GINA) 2026 — Global Strategy for Asthma Management and Prevention (Summary Guide, fig. 9 e box 9-5: crise na atenção primária e emergência; alta com ICS-formoterol ou ICS-LABA em dose média; retorno em 2–7 dias; box 4-7 e p. 35: manutenção e alívio com budesonida-formoterol, MART, 2 inalações 2x ao dia e 1 a mais se sintomas, máx. 12 inalações por dia). https://ginasthma.org",
   "Pizzichini MMP et al. Recomendações para o manejo da asma da Sociedade Brasileira de Pneumologia e Tisiologia — 2020. J Bras Pneumol 2020;46(1):e20190307 (prednisona 40–50 mg por 5–7 dias; SABA nunca isolado). https://doi.org/10.1590/1806-3713/e20190307",
   "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024 — cap. Asma (ipratrópio 500 mcg; hidrocortisona 200–300 mg EV; gestante com alvo de saturação > 95%)."
  ]
 },
 {
  "id": "amigdalite",
  "nome": "Amigdalite bacteriana / Faringoamigdalite",
  "cat": "orl",
  "cid": "J03.9",
  "sin": "dor de garganta placa pus amidala",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n3) Hexomedine spray -------------------------- 1 fr\nAplicar 3 jatos na garganta de 4/4h por 3 dias.\n4) Amidalin pastilha ------------------------- 1 cx\nDissolver 1 pastilha na boca a cada 3h por 3 dias.\n\nAntibiótico\n5) Amoxicilina 500mg ------------------------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\nOu\n5) Amoxicilina 500mg ------------------------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\nOu\n5) Amoxicilina 500mg ------------------------- 20 cp\nTomar 2 cp (1 g) VO 1x ao dia por 10 dias.\nOu\n5) Penicilina G benzatina 1.200.000 unidades - 1 amp\nAplicar IM, dose única, na unidade de saúde.\n\n# Se alergia a penicilina:\n5) Azitromicina 250mg ------------------------ 6 cp\nTomar 2 cp (500 mg) VO no 1º dia e 1 cp 1x ao dia do 2º ao 5º dia.\nOu\n5) Clindamicina 300mg ------------------------ 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\n\n# Se falha ou recorrência recente:\n5) Amoxicilina + Clavulanato 875/125mg ------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\nOu\n5) Amoxicilina + Clavulanato 500/125mg ------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Penicilina benzatina aplicada na unidade.","Área com dengue (ou viagem em 14 dias) e febre com mialgia, cefaleia, dor retro-orbitária ou exantema: sem ibuprofeno nem AAS (MS, Dengue 2024, 6.1.2).","Antibiótico só com estreptococo confirmado (teste rápido ou cultura).","Tosse, coriza, rouquidão, conjuntivite ou aftas sugerem vírus: não testar nem tratar.","Sem teste: Centor 3–4 (febre, exsudato, linfonodo cervical anterior doloroso, sem tosse) ou FeverPAIN ≥ 4 favorecem antibiótico.","Centor 0–2 ou FeverPAIN 0–3: preferir não tratar (FeverPAIN 2–3: receita de reserva); reavaliar se piorar ou não melhorar em 3–5 dias.","Azitromicina só se alergia grave a penicilina: há estreptococo resistente a macrolídeo.","Retorno se trismo, dificuldade de engolir saliva ou de respirar (abscesso periamigdaliano)."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Penicilina G benzatina 1.200.000 unidades IM profunda no glúteo, dose única (se opção pela via IM). Nunca EV.",
  "orient": "- Se tiver febre com dor no corpo, dor de cabeça, dor atrás dos olhos ou manchas na pele, não tome ibuprofeno nem AAS (aspirina) até que a dengue seja descartada; nesse caso, use só dipirona ou paracetamol.\n- Se não melhorar em 3 a 5 dias, ou se piorar, retorne para reavaliação.\n- Volte imediatamente ao pronto-socorro se tiver dificuldade para abrir a boca, para engolir a saliva ou para respirar.",
  "rev": [
   "Corrigido (2026-10-17): antibiótico só com estreptococo confirmado ou Centor/FeverPAIN alto (IDSA 2012; NICE NG84); azitromicina 500 mg por 5 dias (2,5 g) → 500 mg no 1º dia e 250 mg do 2º ao 5º (bula FDA Zithromax; CDC); \"UI\" por extenso e \"nunca EV\" na penicilina benzatina (MS/Anvisa 2013; ISMP Brasil 2015).",
   "Corrigido (2026-10-09): não usar ibuprofeno na febre com dengue não descartada (MS, Dengue 2024).",
   "Atualizado: 1ª linha para faringite estreptocócica é amoxicilina ou penicilina benzatina; amoxicilina-clavulanato ficou para falha/recorrência.",
   "Ajustado: ibuprofeno 300mg 12/12h → 600mg 8/8h por 3 dias.",
   "Adicionado: amoxicilina 500 mg de 12/12h ou 1 g 1x/dia (IDSA 2012 aceita ambos por 10 dias).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: caso suspeito (item 10.1); não usar salicilatos, anti-inflamatórios nem corticoides e orientar a não se automedicar (item 6.1.2); só dipirona e paracetamol (apêndice H). https://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_6ed.pdf",
   "Shulman ST et al. IDSA Clinical Practice Guideline for Group A Streptococcal Pharyngitis (Clin Infect Dis 2012;55:e86).",
   "NICE NG84. Sore throat (acute): antimicrobial prescribing, 2018, seção 1.1 (FeverPAIN e Centor; antibiótico imediato, de reserva ou nenhum) e 1.2 (pastilha com anestésico pode aliviar um pouco). https://www.nice.org.uk/guidance/ng84",
   "CDC. Clinical Guidance for Group A Streptococcal Pharyngitis: teste antes do tratamento; amoxicilina ou penicilina por 10 dias; azitromicina 500 mg no 1º dia e 250 mg do 2º ao 5º dia. https://www.cdc.gov/group-a-strep/hcp/clinical-guidance/strep-throat.html",
   "Barbosa PJB et al. Diretrizes Brasileiras para o Diagnóstico, Tratamento e Prevenção da Febre Reumática (Arq Bras Cardiol 2009;93(3 supl. 4):1–18): penicilina benzatina ou amoxicilina por 10 dias na prevenção primária.",
   "MS/Anvisa/Fiocruz. Protocolo de segurança na prescrição, uso e administração de medicamentos, 2013: não abreviar \"unidade\" nem \"unidade internacional\"; ISMP Brasil, Boletim v.4 n.2, 2015. Penicilina G benzatina: só IM, nunca EV (bula; tarja FDA)."
  ]
 },
 {
  "id": "cerume",
  "nome": "Cerume impactado",
  "cat": "orl",
  "cid": "H61.2",
  "sin": "rolha cera ouvido tampado",
  "casa": "Uso otológico\n1) Cerumin gotas ----------------------------- 1 fr\nPingar 5 gotas no ouvido afetado e manter deitado com o ouvido para cima por 5 min, de 8/8h por 5 dias.",
  "avisoRx": ["Não usar se suspeita de perfuração timpânica ou otorreia."],
  "unidade": "",
  "orient": "- Não use as gotas se estiver saindo secreção do ouvido.\n- Não coloque hastes flexíveis (cotonetes) dentro do ouvido.\n- Retorne após 5 dias para lavagem do ouvido, se necessário.\n- Não use as gotas se estiver saindo secreção do ouvido ou se tiver o tímpano perfurado.",
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
  "casa": "Uso oral\n1) Azitromicina 500mg ------------------------ 2 cp\nTomar 2 cp VO juntos, dose única.\nOu\n1) Doxiciclina 100mg ------------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.",
  "avisoRx": ["Azitromicina na receita só se não tomada na unidade.","Doxiciclina: alternativa à azitromicina, só se não gestante.","Ofertar testes rápidos: HIV, sífilis, hepatites B e C."],
  "unidade": "1) Ceftriaxona 500 mg IM, dose única (diluente com lidocaína da apresentação IM).\n2) Azitromicina 1g (2 cp de 500mg) VO, dose única supervisionada.",
  "orient": "- Sua parceria sexual (ou parcerias) também precisa ser tratada com o mesmo remédio, mesmo sem sintomas.\n- Não tenha relações sexuais por 7 dias após o fim do tratamento do casal.\n- Faça os testes rápidos de HIV, sífilis e hepatites B e C.\n- Use preservativo nas relações sexuais.",
  "rev": [
   "Corrigido (2026-10-17): fonte corrigida (o link \"2022\" abria o PCDT de 2015); esquema conferido com o PCDT IST 2022, quadros 31 e 37 (PCDT IST 2022; CDC 2021).",
   "Preenchido: seção estava vazia. Esquema do PCDT-IST (MS): ceftriaxona 500mg IM + azitromicina 1g VO.",
   "Unificado com o item 'Uretrite' do final do modelo.",
   "CID: N72 cervicite; usar N34.1 para uretrite no homem.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 — quadro 31 (gonorreia e clamídia) e quadro 37 (uretrites): ceftriaxona 500 mg IM + azitromicina 1 g VO, dose única; doxiciclina 100 mg 12/12h por 7 dias como 2ª opção, exceto gestante. https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf",
   "Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — abstinência por 7 dias após o tratamento e até a parceria ser tratada."
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
  "orient": "- Este remédio pode causar sonolência; não dirija após o uso.",
  "rev": [
   "Corrigido (2026-10-17): fonte da meclizina (bula FDA) e revisão Cochrane de 2022 sobre anti-histamínicos (bula FDA do Antivert; Cochrane 2022).",
   "Corrigido: intervalo 12h → 24h (meclizina tem ação de ~24h)."
  ],
  "evid": "Anti-histamínico provavelmente previne a cinetose em viagem real (Cochrane 2022, evidência moderada), com mais sonolência; escopolamina transdérmica tem mais estudos, mas não é comercializada no Brasil.",
  "fontes": [
   "FDA. Meclizine hydrochloride (Antivert) — bula: 25–50 mg VO 1 h antes da viagem, repetir a cada 24 h se preciso; sonolência; cautela em asma, glaucoma e aumento da próstata.",
   "Karrim N, Byrne R, Magula N, Saman Y. Antihistamines for motion sickness (Cochrane Database Syst Rev 2022;10:CD012715). PubMed 36250781.",
   "Spinks A, Wasiak J. Scopolamine for preventing and treating motion sickness (Cochrane 2011;CD002851) — escopolamina transdérmica."
  ]
 },
 {
  "id": "cefaleia",
  "nome": "Cefaleia",
  "cat": "dor",
  "cid": "R51",
  "sin": "dor de cabeca cefaleia tensional",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (no máximo 8 cp por dia).\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h se dor forte, após as refeições, por até 3 dias. No máximo 3 cp por dia.\n3) Dimenidrinato + Piridoxina 50/10mg -------- 1 cx\nTomar 1 cp VO de 6/6h se náuseas, vômitos ou tontura.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Febre com cefaleia, mialgia ou dor retro-orbitária: pensar em dengue antes de anti-inflamatório."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).",
  "orient": "- Volte imediatamente ao pronto-socorro se tiver: a pior dor de cabeça da sua vida, dor que começa de repente, febre com dificuldade para dobrar o pescoço, fraqueza ou dormência em um lado do corpo, dificuldade para falar ou enxergar, confusão ou dor que piora a cada dia.\n- Se tiver febre com dor de cabeça, dor no corpo ou atrás dos olhos, não tome ibuprofeno até que a dengue seja descartada.\n- Evite tomar remédio para dor de cabeça em mais de 10 dias por mês, pois o uso em excesso pode piorar as dores.\n- Se as crises forem frequentes, faça acompanhamento na unidade básica de saúde (posto de saúde).",
  "rev": [
   "Corrigido (2026-10-17): ibuprofeno só se dor forte, por até 3 dias, com dengue descartada e no máximo 3 cp por dia; dipirona com teto de 8 cp por dia; fonte SNNOOP10 corrigida (era citada como SNOOP4); orientação sobre dengue e uso excessivo de analgésico (ABN/SBCe 2018; MS Dengue 2024; Do 2019).",
   "Ajustado: ibuprofeno 300mg 12/12h → 600mg 8/8h.",
   "Adicionado: sinais de alarme e opção na unidade.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Do TP et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology 2019;92(3):134–144. https://doi.org/10.1212/WNL.0000000000006697",
   "Speciali JG et al. Protocolo Nacional para Diagnóstico e Manejo das Cefaleias nas Unidades de Urgência do Brasil — 2018. Academia Brasileira de Neurologia e Sociedade Brasileira de Cefaleia (tensional episódica: paracetamol 750–1.000 mg ou dipirona 500–1.000 mg até 6/6h, ibuprofeno 400–800 mg até 6/6h; seguimento na UBS). https://neurologiahu.paginas.ufsc.br/files/2012/08/Protocolo-nacional-para-diagno%CC%81stico-e-manejo-das-cefaleias-nas-unidades-de-urge%CC%82ncia-do-Brasil_2018.pdf",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue)."
  ]
 },
 {
  "id": "salvas",
  "nome": "Cefaleia em salvas",
  "cat": "dor",
  "cid": "G44.0",
  "sin": "cluster cefaleia trigeminal",
  "casa": "Uso oral\n1) Verapamil 80mg ---------------------------- 90 cp\nTomar 1 cp VO de 8/8h.\n2) Prednisona 20mg --------------------------- 55 cp\nTomar pela manhã, após o café: 5 cp por 5 dias; depois 4 cp por 3 dias, 3 cp por 3 dias, 2 cp por 3 dias e 1 cp por 3 dias, e parar.",
  "avisoRx": ["Profilaxia de transição, até avaliação com neurologista.","Prednisona como ponte até o verapamil agir.","Encaminhar ao neurologista.","Verapamil: fazer ECG basal (risco de bloqueio AV)."],
  "unidade": "1) O2 a 100% em máscara não reinalante, 12 a 15 L/min, por 15 a 20 min, com o paciente sentado.\n2) Sumatriptano 6mg SC (máx. 2 doses em 24h, intervalo ≥ 1h)\n   Ou Sumatriptano spray nasal 10mg/dose (Sumax nasal): 2 doses (20mg), uma em cada narina. Menos eficaz que o subcutâneo; não somar mais de 40mg em 24h.",
  "orient": "- Marque consulta com o neurologista.\n- Evite bebidas alcoólicas durante o período de crises.",
  "rev": [
   "Corrigido (2026-10-17): sumatriptano nasal com a apresentação brasileira (10 mg/dose; 2 doses = 20 mg; máx. 40 mg em 24 h); ponte com prednisona 60 mg → 100 mg por 5 dias com redução de 20 mg a cada 3 dias (EAN 2023; PredCH, Obermann 2021; bula Sumax).",
   "Corrigido: máscara de Venturi não entrega 100%; usar máscara não reinalante 12–15 L/min.",
   "Adicionado: ponte com prednisona e ECG antes do verapamil."
  ],
  "fontes": [
   "Robbins MS et al. Treatment of Cluster Headache: AHS Evidence-Based Guidelines (Headache 2016;56:1093).",
   "May A et al. European Academy of Neurology guidelines on the treatment of cluster headache. Eur J Neurol 2023;30(10):2955–2979 (O2 100% ≥ 12 L/min por 15 min; sumatriptano 6 mg subcutâneo; verapamil ≥ 240 mg/dia com ECG; prednisona ≥ 100 mg/dia por 5 dias). https://doi.org/10.1111/ene.15956",
   "Obermann M et al. Safety and efficacy of prednisone versus placebo in short-term prevention of episodic cluster headache (PredCH). Lancet Neurol 2021;20(1):29–37 (100 mg por 5 dias, depois redução de 20 mg a cada 3 dias).",
   "Bula Anvisa do Sumax (sumatriptano): injetável 6 mg/0,5 mL, até 2 doses em 24 h com intervalo ≥ 1 h; spray nasal 10 mg/dose, máx. 40 mg em 24 h; contraindicado em doença coronariana, AVC, HAS não controlada e com ergotamina em 24 h."
  ]
 },
 {
  "id": "colica",
  "nome": "Cólica renal / biliar",
  "cat": "uro",
  "cid": "N23",
  "sin": "litiase calculo rim vesicula colelitiase nefrolitiase",
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (máximo 8 cp por dia). Se tiver febre, volte ao pronto-socorro.\n3) Tramadol 50mg ----------------------------- 10 cp\nTomar 1 cp VO de 8/8h se dor intensa que não melhora com os anteriores (máximo 3 cp por dia). Pode dar sono; não dirigir.\n4) Ondansetrona 8mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h se náuseas ou vômitos.\n\n# Cólica renal com cálculo ureteral distal > 5 mm (e ≤ 10 mm):\n5) Tansulosina 0,4mg ------------------------- 30 cp\nTomar 1 cp VO à noite por até 4 semanas.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue; não usar na gestação nem na doença renal.","Renal: febre, calafrios ou oligúria = obstrução infectada, emergência.","Biliar: solicitar USG de abdome e encaminhar para cirurgia eletiva.","CID cólica biliar: K80.2."],
  "unidade": "1) Cetoprofeno 100 mg EV (apresentação própria para EV) em 100 mL de SF em 20–30 min, ou IM (ampola 50 mg/mL, 2 mL) — 1ª escolha na cólica renal, se sem contraindicação (DRC, gestação, sangramento, úlcera).\n2) Dipirona 1 g (2 mL) EV lenta (no máximo 1 mL/min, paciente deitado), diluída em 10–20 mL de SF, ou IM profunda (junto com o AINE, ou sozinha se AINE contraindicado).\n   Cólica biliar sem melhora: escopolamina 20 mg + dipirona 2,5 g (Buscopan Composto) 1 ampola EV lenta (no mínimo 5 minutos) em vez da dipirona isolada.\n   + Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM, se náusea ou vômito.\nSe persistir após 30–40 min, repetir a analgesia uma vez. Se ainda persistir:\n3) Tramadol 100 mg (2 mL) EV em 100 mL de SF em 30–60 min (infusão rápida aumenta náuseas), ou IM\n   Ou Morfina 2–4 mg EV (diluir 1 amp de 10 mg em 9 mL de AD/SF = 1 mg/mL; fazer 2–4 mL lento).",
  "orient": "- Beba bastante água ao longo do dia.\n- Se a cólica for dos rins: volte imediatamente ao pronto-socorro se tiver febre, calafrios ou se urinar muito pouco, pois pode ser uma infecção grave.\n- Se a cólica for da vesícula: volte ao pronto-socorro se tiver febre, pele ou olhos amarelados, ou dor que não passa em 6 horas. Faça o ultrassom de abdome solicitado e procure a unidade básica de saúde (posto de saúde) para encaminhamento ao cirurgião.",
  "rev": [
   "Corrigido (2026-10-17): ibuprofeno só se dengue descartada (MS, Dengue, 6ª ed., 2024); Buscopan Composto comprimido \"se dor ou febre\" → dipirona 2 cp (máx. 8/dia) e \"febre: volte\"; tramadol com máximo de 3 cp/dia (bula Tramal); na unidade, dipirona EV no lugar do Buscopan Composto, que fica só para a cólica biliar e em no mínimo 5 minutos (EAU Urolithiasis 2026: antiespasmódico não acrescenta analgesia).",
   "Adicionado: AINE (cetoprofeno) como 1ª escolha na cólica renal.",
   "Adicionado: tansulosina para cálculo distal e morfina como alternativa.",
   "Ajustado: tramadol 12/12h → 8/8h se necessário.",
   "Ajustado (EAU 2024): tansulosina indicada para cálculo ureteral distal > 5 mm.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "EAU Guidelines on Urolithiasis, 2026. https://uroweb.org/guidelines/urolithiasis — AINE como 1ª escolha (forte); opioide como 2ª (fraca); antiespasmódico não acrescenta analgesia; alfabloqueador para cálculo ureteral distal de 5–10 mm (forte, fora da bula); descompressão urgente se obstrução com sepse.",
   "Pathan SA et al. Delivering safe and effective analgesia for management of renal colic in the emergency department: a double-blind, multigroup, randomised controlled trial (Lancet 2016;387:1999).",
   "Fraquelli M et al. Non-steroid anti-inflammatory drugs for biliary colic (Cochrane Database Syst Rev 2016;CD006390; PMID 27610712).",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue.",
   "Bula Novalgina (dipirona 500 mg, Anvisa): máximo 4 g/dia.",
   "Bula Tramal (tramadol, Anvisa): máximo 400 mg/dia; sonolência, evitar dirigir.",
   "Bula Buscopan Composto injetável (Boehringer Ingelheim, Anvisa): EV lenta, no máximo 1 mL/min, com o paciente deitado."
  ]
 },
 {
  "id": "conjuntivite",
  "nome": "Conjuntivite",
  "cat": "orl",
  "cid": "H10.9",
  "sin": "olho vermelho secrecao ocular",
  "casa": "# Bacteriana (secreção purulenta, pálpebras coladas):\nUso oftálmico\n1) Tobramicina 0,3% colírio ------------------ 1 fr\nPingar 1 a 2 gotas no olho afetado de 4/4h (enquanto acordado) por 7 dias.\n\n# Viral / irritativa:\nUso oftálmico\n1) Lágrima artificial (carmelose 0,5%) ------- 1 fr\nPingar 1 gota em cada olho de 4/4h por 7 dias.",
  "avisoRx": ["Oftalmologista no mesmo dia também se lesão na córnea."],
  "unidade": "",
  "orient": "- Faça compressas frias por 10 a 20 minutos, várias vezes ao dia.\n- Limpe a secreção com gaze e soro fisiológico, do canto de dentro para o canto de fora do olho.\n- Lave as mãos com frequência, não compartilhe toalhas e evite coçar os olhos.\n- Não use lentes de contato durante o tratamento.\n- Procure um oftalmologista no mesmo dia se tiver dor moderada ou forte no olho, piora da visão, incômodo com a luz, muita secreção amarelada que surgiu rapidamente, bolhas na pálpebra, ou se usa lente de contato e está com o olho vermelho.\n- Se estiver usando o colírio antibiótico e não melhorar em 3 a 4 dias, retorne para reavaliação.",
  "rev": [
   "Corrigido (2026-10-17): tobramicina 6/6h → 4/4h (bula Tobrex); encaminhamento ampliado (lente de contato, secreção intensa, vesículas, córnea) e reavaliação em 3–4 dias (AAO PPP 2023; JAMA 2013).",
   "Corrigido: removida a orientação de 'não usar soro fisiológico'; SF é adequado para limpar a secreção.",
   "Adicionado: conduta para conjuntivite viral (mais comum) e sinais de alarme."
  ],
  "fontes": [
   "Cheung AY et al. American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern 2023 (Ophthalmology 2024;131:P134): bacteriana leve é autolimitada, antibiótico tópico por 5–7 dias encurta o quadro; viral sem antibiótico (compressa fria, lágrima artificial, contágio por 10–14 dias); encaminhar se baixa visual, dor moderada ou intensa, secreção purulenta intensa, córnea acometida ou sem resposta.",
   "Bula Tobrex (tobramicina 0,3% colírio): 1 a 2 gotas a cada 4 h na infecção leve a moderada; a partir de 2 meses de idade.",
   "Azari AA, Barney NP. Conjunctivitis: a systematic review of diagnosis and treatment (JAMA 2013;310:1721): usuário de lente de contato com olho vermelho tem risco de ceratite."
  ]
 },
 {
  "id": "constipacao",
  "nome": "Constipação",
  "cat": "gi",
  "cid": "K59.0",
  "sin": "intestino preso prisao de ventre",
  "casa": "Uso oral\n1) Lactulose 667mg/mL xarope ----------------- 1 fr\nTomar 15 mL VO 1x ao dia, pela manhã ou à noite. Se não evacuar em 2 dias, aumentar para 30 mL 1x ao dia (máximo 30 mL/dia). Reduzir se as fezes ficarem líquidas.\n2) Óleo mineral ------------------------------ 1 fr\nTomar 15 mL VO à noite, longe do jantar, por até 4 dias, se fezes endurecidas.",
  "avisoRx": ["Óleo mineral: contraindicações conforme bula Anvisa e FDA 21 CFR 201.302 (aspiração e pneumonia lipoídica).","Fleet: evitar > 55 anos, desidratação, DRC, obstrução ou inflamação intestinal, diurético, IECA, BRA ou AINE; preferir clister glicerinado (FDA, 2014)."],
  "unidade": "1) Escopolamina 20 mg + dipirona 2,5 g (Buscopan Composto) 1 ampola EV lenta (no mínimo 5 minutos, paciente deitado), diluída em 10–20 mL de SF 0,9%, ou IM profunda. Só se cólica e depois de afastar obstrução intestinal.\n2) Fosfato de sódio enema (Fleet) 1 unidade via retal, dose única\n   Ou Clister glicerinado 12% 500 mL via retal.",
  "orient": "- Beba bastante água (pelo menos 2 litros por dia) e coma alimentos ricos em fibras (frutas, verduras e cereais integrais).\n- Pratique atividade física regularmente e não segure a vontade de evacuar.\n- Óleo mineral: tome só à noite, longe das refeições, por no máximo 1 semana. Não use em crianças menores de 6 anos, gestantes, pessoas acamadas, com dificuldade para engolir ou com refluxo, pelo risco de o óleo ir para o pulmão e causar pneumonia. Também não use se tiver náusea, vômito ou dor na barriga sem explicação.\n- Fosfato de sódio retal (Fleet): faça uma única aplicação, nunca mais de 1 em 24 horas. Evite se tiver mais de 55 anos, desidratação, doença nos rins, obstrução ou inflamação do intestino, ou se usar diurético, certos remédios para pressão (como enalapril, captopril ou losartana) ou anti-inflamatórios; nesses casos, prefira o clister glicerinado. Não use em crianças menores de 2 anos.\n- Volte ao pronto-socorro se tiver vômitos, barriga inchada, se parar de eliminar gases ou se houver sangue nas fezes.",
  "rev": [
   "Corrigido (2026-10-17): lactulose 10–15 mL de 8/8h (30–45 mL/dia) → 15 a 30 mL/dia em dose única (bula Lactulona); Buscopan Composto EV com princípio ativo, no mínimo 5 minutos e só depois de afastar obstrução intestinal (bula Buscopan Composto injetável).",
   "Corrigido (2026-10-09): contraindicações do óleo mineral pela bula (menores de 6 anos, gestação, refluxo, náusea, vômito, dor abdominal) e do Fleet pela FDA 2014, com fonte.",
   "Adicionado: evitar óleo mineral em idosos acamados ou com disfagia (risco de aspiração).",
   "Adicionado: evitar Fleet em DRC, desidratação e idosos frágeis (distúrbio hidroeletrolítico).",
   "Removido: metoclopramida na unidade (sem indicação na constipação).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Bula do óleo mineral (Anvisa; ex.: Teuto, 2025): contraindicado em menores de 6 anos; evitar com náuseas, vômitos, dor abdominal, gravidez, disfagia, refluxo e em acamados; não tomar com alimentos; no máximo 1 semana sem orientação médica.",
   "FDA. 21 CFR 201.302 — Mineral oil: vitaminas lipossolúveis, gravidez e pneumonia lipoídica; tomar só ao deitar.",
   "FDA Drug Safety Communication (08/01/2014): fosfato de sódio de venda livre — no máximo 1 dose em 24 h; risco maior acima de 55 anos, desidratação, doença renal, obstrução ou inflamação intestinal, diurético, IECA, BRA e AINE.",
   "Chang L et al. AGA–ACG Clinical Practice Guideline: Pharmacological Management of Chronic Idiopathic Constipation (Gastroenterology 2023).",
   "Bula Lactulona (lactulose 667 mg/mL, Daiichi Sankyo, Anvisa): adultos 15 a 30 mL/dia, em dose única pela manhã ou à noite, ajustada pelo número de evacuações.",
   "Bula Buscopan Composto injetável (Boehringer Ingelheim, Anvisa): EV lenta, no máximo 1 mL/min, com o paciente deitado; contraindicado na obstrução intestinal mecânica e no megacólon."
  ]
 },
 {
  "id": "convulsao",
  "nome": "Crise convulsiva / Estado de mal epiléptico",
  "cat": "dor",
  "cid": "G41.9",
  "sin": "convulsao epilepsia crise tonico clonica status",
  "casa": "",
  "avisoRx": ["Use a aba Calculadora para doses e volumes pelo peso."],
  "unidade": "Passo 0 (0–5 min)\n1) Monitorização, O2, acesso venoso, decúbito lateral, aspiração se necessário.\n2) Glicemia capilar. Exames: Na, K, Ca, Mg, ureia, creatinina, gasometria, hemograma, ECG. TC de crânio e LCR conforme o caso.\n3) Se hipoglicemia: Glicose 50% 50 mL EV (ou Glicose 10% 150–200 mL); se etilismo/desnutrição, Tiamina 100mg EV junto, sem atrasar a glicose.\n4) Gestante a partir de 20 semanas ou puérpera: pensar em eclâmpsia; sulfato de magnésio é a droga de escolha (ver conduta Pré-eclâmpsia/eclâmpsia).\n\nPasso 1 (5 min) — benzodiazepínico\nDiazepam 10mg EV lento, sem diluir, até 5 mg/min (adulto) | 0,15–0,2 mg/kg (criança, máx. 10mg). Pode repetir 1 vez após 5 min.\nOu Midazolam 10mg IM (> 40 kg) | 5mg IM (13–40 kg). Dose única.\n\nPasso 2 (20 min) — se persistir\nFenitoína 20 mg/kg EV em SF 0,9%, nunca em soro glicosado (até 50 mg/min; idoso ou cardiopata: até 20 mg/min; monitorizar ECG e PA)\nOu Levetiracetam 60 mg/kg EV (máx. 4.500mg) em 15 min\nOu Ácido valproico 40 mg/kg EV (máx. 3.000mg) em 10 min (não usar em hepatopatia, doença mitocondrial ou gestação)\nOu Fenobarbital 20 mg/kg EV, até 50 mg/min (bula: menos de 60 mg/min); existem ampolas de 100 e de 200 mg/mL. Bula: contraindicado na gestação e na lactação, em recém-nascidos e em mulheres em idade fértil — pesar o risco na emergência\n* Obter via aérea avançada se necessário.\n\nPasso 3 (40 min) — refratário\nMidazolam 0,2 mg/kg ataque + 0,05–2 mg/kg/h\nOu Propofol 1–2 mg/kg ataque + 2–10 mg/kg/h\nOu Tiopental 3–5 mg/kg ataque, depois 1–2 mg/kg a cada 2–3 min até controlar + 3–7 mg/kg/h (EFNS 2010)\n* IOT, EEG contínuo e UTI.",
  "orient": "",
  "rev": [
   "Corrigido (2026-10-17): diazepam lento até 5 mg/min e fenitoína até 20 mg/min no idoso ou cardiopata, nunca em soro glicosado, como no cartão Agora; eclâmpsia no passo 0; tiopental mantido com a dose da EFNS 2010 (manutenção 3–5 → 3–7 mg/kg/h, com bolus adicionais de 1–2 mg/kg); fonte da escetamina retirada; ACEP 2024 (NCS 2012; bula Compaz; HC-FMUSP 18ª ed.; MS 2022).",
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
   "Bula do fenobarbital injetável (Fenocris, Cristália; Carbital 200 mg/mL), Anvisa.",
   "Glauser T et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus — AES (Epilepsy Curr 2016;16:48).",
   "Kapur J et al. ESETT: levetiracetam, fosfenitoína ou valproato (N Engl J Med 2019;381:2103).",
   "Silbergleit R et al. RAMPART: midazolam IM vs lorazepam EV (N Engl J Med 2012).",
   "Smith MD et al. ACEP Clinical Policy: Critical Issues in the Management of Adult Patients Presenting to the Emergency Department With Seizures (Ann Emerg Med 2024;84(1):e1–e12). doi 10.1016/j.annemergmed.2024.02.018",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. complementar 18, Abordagem do estado de mal epiléptico (fenitoína até 20 mg/min no idoso e no cardiopata).",
   "Brasil. Ministério da Saúde. Manual de Gestação de Alto Risco, 2022 — cap. 11: eclâmpsia e sulfato de magnésio.",
   "Meierkord H et al. EFNS guideline on the management of status epilepticus in adults (Eur J Neurol 2010;17:348–355): tiopental 3–5 mg/kg em bolus, mais 1–2 mg/kg a cada 2–3 min até controlar, depois 3–7 mg/kg/h; midazolam 0,2 mg/kg + 0,05–0,4 mg/kg/h; propofol 2–3 mg/kg + 4–10 mg/kg/h. https://doi.org/10.1111/j.1468-1331.2009.02917.x",
   "Bula Fenital (fenitoína injetável), Anvisa: incompatível com soro glicosado."
  ]
 },
 {
  "id": "iot",
  "nome": "Sequência rápida de intubação (IOT)",
  "cat": "emerg",
  "cid": "",
  "sin": "intubacao via aerea sri sequencia rapida",
  "casa": "",
  "avisoRx": ["Use a aba Calculadora para o volume exato pelo peso."],
  "unidade": "1. Indicações: insuficiência respiratória, Glasgow ≤ 8, proteção de via aérea, falha de outros métodos.\n\n2. Material (checar e testar): videolaringoscópio como primeira escolha (ou laringoscópio testado) e duas lâminas, tubos de dois tamanhos (7,0–8,0 no adulto), fio-guia, bougie, seringa de 10 mL, bolsa-válvula-máscara com reservatório, aspirador ligado, capnógrafo, dispositivo supraglótico e kit de cricotireoidostomia (bisturi, bougie e tubo 6,0). Vasopressor à mão para a hipotensão pós-intubação.\n\n3. Técnica\n1) Pré-oxigenação por 3 min com FiO2 100%; no hipoxêmico, preferir VNI. Manter cateter nasal a 15 L/min durante a laringoscopia; ventilar com bolsa-válvula-máscara entre a indução e a laringoscopia se houver dessaturação.\n2) Posicionamento: cabeceira elevada (rampa no obeso), coxim occipital e extensão da cabeça (conduto auditivo alinhado ao esterno). Suspeita de trauma cervical: estabilização manual, sem extensão.\n3) Pré-tratamento (opcional): Fentanil 1–3 mcg/kg EV lento.\n4) Indução:\n   • Etomidato 0,3 mg/kg (preferir se instabilidade hemodinâmica; idoso 0,15–0,2 mg/kg)\n   • Escetamina (Ketamin, forma predominante no Brasil) 0,5–1 mg/kg (instabilidade ou broncoespasmo)\n   • Propofol 1–2 mg/kg (evitar se hipotensão)\n   • Midazolam 0,1–0,3 mg/kg (início lento; hipotensão; acima de 60 anos ou debilitado, 0,05–0,15 mg/kg)\n5) Bloqueio neuromuscular:\n   • Succinilcolina 1,5 mg/kg — contraindicada em hipercalemia, história de hipertermia maligna, doença neuromuscular, queimadura/esmagamento/denervação após 24–72h.\n   • Rocurônio 1,2 mg/kg.\n6) Aguardar 45–60 s. Laringoscopia com a mão esquerda, lâmina pela direita afastando a língua, ponta na valécula, tração para frente e para cima.\n   No máximo 3 tentativas (mais 1 de um operador experiente). Falhou: dispositivo supraglótico. Não intubo e não oxigeno: declarar em voz alta e fazer cricotireoidostomia com bisturi e bougie.\n7) Confirmar: capnografia (padrão-ouro) + expansão torácica + ausculta (epigástrio, bases, ápices).\n8) Pós-IOT: fixar tubo, RX de tórax, proteção ocular, sedoanalgesia contínua, ventilação protetora (6 mL/kg de peso predito).\n\nResumo de diluições (adulto ~70 kg)\n• Fentanil 50 mcg/mL: 2 mcg/kg → ~3 mL\n• Midazolam 5 mg/mL: 0,2 mg/kg → ~3 mL | 1 mg/mL: ~14 mL\n• Etomidato 2 mg/mL: 0,3 mg/kg → ~10 mL\n• Escetamina 50 mg/mL: 0,5–1 mg/kg → ~0,7–1,4 mL\n• Propofol 10 mg/mL: 1,5 mg/kg → ~10 mL\n• Succinilcolina 100mg + 10 mL AD (10 mg/mL): 1,5 mg/kg → ~10 mL\n• Rocurônio 10 mg/mL: 1,2 mg/kg → ~8,5 mL",
  "orient": "",
  "rev": [
   "Corrigido (2026-10-17): videolaringoscópio como primeira escolha e kit de cricotireoidostomia; VNI no hipoxêmico, oxigenação na apneia e ventilação com bolsa-válvula-máscara; cabeceira elevada e rampa no obeso; no máximo 3 tentativas e plano de resgate; dose de indução reduzida no idoso (DAS 2025; DAS 2018; PREOXI; PreVent; DEVICE; bulas do midazolam e do etomidato).",
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
   "Higgs A et al. Guidelines for the management of tracheal intubation in critically ill adults — DAS (Br J Anaesth 2018;120:323).",
   "Gibbs KW et al. Noninvasive ventilation for preoxygenation during emergency intubation (PREOXI; N Engl J Med 2024;390:2165).",
   "Casey JD et al. Bag-mask ventilation during tracheal intubation of critically ill adults (PreVent; N Engl J Med 2019;380:811).",
   "Prekker ME et al. Video versus direct laryngoscopy for tracheal intubation of critically ill adults (DEVICE; N Engl J Med 2023;389:418).",
   "Doses de indução e bloqueio: bulas e Walls RM. Manual of Emergency Airway Management. Bulas do midazolam (> 60 anos ou debilitados: 0,05–0,15 mg/kg) e do etomidato (idosos: 0,15–0,2 mg/kg)."
  ]
 },
 {
  "id": "has",
  "nome": "Crise hipertensiva (urgência / emergência)",
  "cat": "cardio",
  "cid": "I10",
  "sin": "pressao alta pa elevada has hipertensao urgencia emergencia",
  "casa": "Uso oral\n1) Manter os anti-hipertensivos de uso contínuo, nas doses corretas, e o ajuste feito hoje.",
  "unidade": "# PA elevada sem sintomas e sem lesão de órgão-alvo:\nRepouso 20–30 min em ambiente calmo, tratar dor/ansiedade e remedir. Ajustar medicação oral. Não é urgência.\n\n# Elevação importante da PA sem lesão de órgão-alvo (antiga \"urgência hipertensiva\"):\n1) Captopril 25mg 1 a 2 cp VO (não sublingual). Reavaliar PA em 1h.\n   Ou Clonidina 0,1–0,2mg VO. Reavaliar em 1h.\nMeta: reduzir gradualmente em 24–48h. Alta com ajuste da medicação e retorno em até 7 dias.\n\n# Emergência hipertensiva (LOA aguda: EAP, SCA, AVC, dissecção, encefalopatia, eclâmpsia):\n1) Monitorização, acesso venoso, ECG, troponina, creatinina, EAS, fundo de olho.\n2) Nitroprussiato de sódio 50mg/2mL (1 amp) + SG 5% 248 mL (200 mcg/mL) em BIC:\n   Proteger da luz. Iniciar 0,3–0,5 mcg/kg/min, aumentar 0,5 mcg/kg/min a cada 5 min; usual até 3 mcg/kg/min; teto 10 mcg/kg/min por no máximo 10 min. Evitar na SCA.\n3) Nitroglicerina 50mg/10mL (1 amp) + SG 5% 240 mL (200 mcg/mL) em BIC — preferir em SCA e EAP:\n   Iniciar 5 mcg/min (1,5 mL/h), aumentar 5 mcg/min a cada 3–5 min até 20 mcg/min, depois 10–20 mcg/min por vez conforme a resposta (teto usual 200 mcg/min, no EAP e na SCA). Contraindicada se PAS < 90 mmHg, infarto de VD ou inibidor da fosfodiesterase-5 (sildenafila ou vardenafila em 24 h, tadalafila em 48 h).\nMeta: reduzir a PA em até 25% na 1ª hora; se estável, até 160/100 mmHg nas 2–6 h seguintes; níveis normais em 24–48 h. Metas próprias: dissecção de aorta (FC < 60 e PAS 100–120 em 20 min, betabloqueador antes do vasodilatador), EAP e crise adrenérgica (PAS < 140 na 1ª hora), SCA (PAS < 140, evitando < 120), AVC e pré-eclâmpsia (ver protocolos).",
  "orient": "- Tome os remédios de pressão todos os dias, nas doses e horários corretos, e reduza o sal na comida.\n- Marque consulta com o clínico ou o cardiologista para ajuste dos remédios.\n- Volte imediatamente ao pronto-socorro se tiver dor no peito, falta de ar, fraqueza em um lado do corpo, alteração na fala ou na visão.",
  "rev": [
   "Corrigido (2026-10-17): furosemida retirada da receita de alta (sem indicação na crise hipertensiva); nitroglicerina até 20 mcg/min e depois 10–20 mcg/min por vez, teto usual 200 mcg/min, com contraindicações; nitroprussiato protegido da luz, com teto de 10 mcg/kg/min por no máximo 10 min; metas por lesão iguais às do protocolo; ESC 2021 substituída (DBHA 2025, cap. 11; ACC/AHA 2017; HC-FMUSP 18ª ed., cap. 34 e 35; bula do nitroprussiato).",
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
   "Whelton PK et al. 2017 ACC/AHA Guideline for High Blood Pressure in Adults (Hypertension 2018;71:e13) — tabela de fármacos EV (nitroprussiato 0,3–10 mcg/kg/min; nitroglicerina 5 mcg/min até 20 mcg/min).",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 34 (IC aguda: nitroglicerina 10–200 mcg/min) e cap. 35 (Emergências hipertensivas).",
   "Bula do nitroprussiato de sódio registrada na Anvisa (0,3 a 10 mcg/kg/min; dose máxima por até 10 min; diluir em SG 5% e proteger da luz)."
  ]
 },
 {
  "id": "dengue",
  "nome": "Dengue (grupos A, B, C e D)",
  "cat": "toxinf",
  "cid": "A90",
  "sin": "arbovirose febre chikungunya zika",
  "casa": "# Grupos A e B\nUso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Paracetamol 500mg ------------------------- 20 cp\nTomar 1 a 2 cp VO de 6/6h se febre persistir (intercalar com a dipirona; máx. 3 g/dia).\n3) Ondansetrona 8mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h se náuseas ou vômitos.\n4) Sais de reidratação oral ------------------ 10 envelopes\nDiluir 1 envelope em 1 L de água filtrada e beber ao longo do dia.\n\nHidratação oral:\n- Beba cerca de 60 mL de líquido por quilo de peso por dia (exemplo: 70 kg, cerca de 4 litros por dia). Desse total, 1/3 deve ser de soro de reidratação oral e o restante de água, sucos, chás ou água de coco. Beba 1/3 do total nas primeiras 4 a 6 horas.",
  "avisoRx": ["Grupo B: receita só após hemograma normal.","Criança < 13 anos: até 10 kg 130 mL/kg/dia | 10–20 kg 100 mL/kg/dia | > 20 kg 80 mL/kg/dia.","Doença de notificação compulsória. Entregar cartão de acompanhamento."],
  "unidade": "Classificação e conduta (MS 2024):\n\n# Grupo A — sem sinais de alarme, sem sangramento, prova do laço negativa, sem comorbidades nem condição especial\n- Tratamento ambulatorial com hidratação oral. Hemograma a critério; NS1 até o 5º dia ou sorologia após o 6º.\n- Reavaliar no 1º dia sem febre (ou no 5º dia se a febre persistir).\n\n# Grupo B — sangramento de pele espontâneo ou prova do laço positiva, ou condição especial (gestante, lactente, idoso, comorbidades) ou risco social, sem sinais de alarme\n- Hemograma obrigatório; aguardar o resultado em observação, com hidratação oral.\n- Hematócrito normal: tratar como grupo A com reavaliação diária até 48h sem febre.\n- Hemoconcentração: conduzir como grupo C.\n\n# Grupo C — sinais de alarme, sem choque\n(dor abdominal intensa, vômitos persistentes, acúmulo de líquidos, hipotensão postural, hepatomegalia > 2 cm, sangramento de mucosa, letargia/irritabilidade, aumento progressivo do hematócrito)\n- Exames: hemograma, albumina, transaminases, tipagem; RX de tórax, gasometria, eletrólitos, ureia, creatinina, coagulograma conforme o caso.\n- Expansão: SF 0,9% 10 mL/kg/h na 1ª e na 2ª hora (máx. 20 mL/kg em 2h). Reavaliar a cada hora; hematócrito após 2h.\n- Melhora: manutenção 25 mL/kg em 6h, depois 25 mL/kg em 8h.\n- Sem melhora: repetir a expansão até 3 vezes; persistindo, conduzir como grupo D.\n- Internação por pelo menos 48h.\n\n# Grupo D — choque, sangramento grave ou disfunção grave de órgão\n(PA convergente — diferencial ≤ 20 mmHg, ex.: 100/80; hipotensão, taquicardia, pulso fraco, enchimento capilar > 2 s, extremidades frias, oligúria)\n- SF 0,9% 20 mL/kg em 20 min, até 3 vezes; reavaliar a cada 15–30 min; hematócrito após 2h.\n- Melhora: conduzir como grupo C.\n- Persistência do choque com hematócrito em alta: albumina 0,5–1 g/kg.\n- Hipotensão persistente ou congestão: noradrenalina 0,01–0,5 mcg/kg/min ou dopamina 10–20 mcg/kg/min; disfunção de VE: dobutamina 2,5–20 mcg/kg/min (bombas do painel). Meta: diurese normal e PAS > 100 mmHg.\n- Hematócrito em queda com choque: investigar sangramento/coagulopatia; concentrado de hemácias 10–15 mL/kg.\n- Plaquetas só se sangramento persistente com trombocitopenia e INR > 1,5.\n- UTI por pelo menos 48h.\n\nSintomáticos na unidade:\n1) Dipirona 1 g EV lenta (diluída em 10–20 mL de SF) + Ondansetrona 4 mg EV lenta.\n(Evitar medicação IM na dengue — risco de hematoma.)",
  "orient": "- Não use anti-inflamatórios nem AAS (aspirina), como ibuprofeno, diclofenaco, cetoprofeno, nimesulida e outros.\n- Faça repouso e prefira alimentação leve.\n- Retorne para reavaliação no primeiro dia sem febre, que é a fase em que a doença pode se agravar.\n- Volte imediatamente ao pronto-socorro se tiver: dor forte na barriga, vômitos que não param, sangramentos, tontura ao levantar, sonolência ou irritação, ou se urinar menos.\n- Leve o cartão de acompanhamento da dengue em todos os retornos.",
  "rev": [
   "Corrigido (2026-10-17): pressão diferencial do choque ≤ 20 mmHg (ex.: 100/80) igual em todo o painel; aminas no choque que não responde ao volume (MS 2024, cap. 8 e Quadro 6); fonte da ondansetrona (bula Anvisa); link oficial do MS no lugar do protocolo de Bauru (MS 2024; OPAS 2022; OMS 2009).",
   "Removido: Enterogermina (sem indicação na dengue).",
   "Adicionado: evitar IM, retorno no dia da defervescência e notificação.",
   "Corrigido: hidratação 80 → 60 mL/kg/dia (MS 2024, grupo A adulto).",
   "Adicionado: grupos B, C e D completos e hidratação oral da criança (MS 2024)."
  ],
  "fontes": [
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed. Brasília, 2024 (grupos A a D, expansão e manutenção; cap. 8 e Quadro 6: aminas no choque). http://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_6ed.pdf",
   "Organização Pan-Americana da Saúde. Diretrizes para o diagnóstico clínico e tratamento de dengue, chikungunya e Zika, 2022, e OMS. Dengue: guidelines for diagnosis, treatment, prevention and control, 2009 — choque com pressão diferencial ≤ 20 mmHg (decisão do médico: ≤ 20 mmHg em todo o painel; o texto do MS 2024 diz < 20 mmHg).",
   "Bula Anvisa da ondansetrona (Vonau, Nausedron): 8 mg VO de 8/8h; 4 mg EV lento."
  ]
 },
 {
  "id": "dermatite",
  "nome": "Dermatite / Alergia de pele",
  "cat": "pele",
  "cid": "L23.9",
  "sin": "alergia pele coceira prurido eczema dermatite contato",
  "casa": "Uso oral\n1) Loratadina 10mg --------------------------- 7 cp\nTomar 1 cp VO 1x ao dia por 7 dias.\nOu\n1) Levocetirizina 5mg ------------------------ 7 cp\nTomar 1 cp VO à noite por 7 dias.\n\nUso tópico\n2) Betametasona 0,1% creme (valerato) -------- 1 bisnaga\nAplicar fina camada na região afetada do corpo 2x ao dia por 7 a 14 dias. Não usar na face, nas dobras nem nos genitais.\nOu\n2) Hidrocortisona 1% creme ------------------- 1 bisnaga\nAplicar fina camada 2x ao dia por até 7 dias.",
  "avisoRx": ["Hidrocortisona para face, dobras ou genitais."],
  "unidade": "",
  "orient": "- Evite contato com o que provocou a reação na pele; use sabonete neutro e hidratante.",
  "rev": [
   "Corrigido (2026-10-17): creme de dexclorfeniramina + betametasona (sem registro tópico na Anvisa; anti-histamínico tópico sensibiliza) → corticoide tópico isolado: betametasona 0,1% no corpo por 7 a 14 dias ou hidrocortisona 1% na face, dobras e genitais por até 7 dias (Fonacier 2015; Harrison, 22ª ed., cap. 60)."
  ],
  "evid": "Diretriz AAAAI/ACAAI 2015 (evidência moderada para corticoide tópico).",
  "fontes": [
   "Fonacier L et al. Contact dermatitis: a practice parameter — update 2015 (J Allergy Clin Immunol Pract 2015;3:S1) — corticoide tópico pela potência e região; evitar anti-histamínico tópico; prednisona se > 20% da superfície.",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 60 — Eczema, Psoriasis, Cutaneous Infections, Acne, and Other Common Skin Disorders."
  ]
 },
 {
  "id": "alergia-grave",
  "nome": "Reação alérgica moderada (sem anafilaxia)",
  "cat": "emerg",
  "cid": "T78.4",
  "sin": "alergia grave angioedema urticaria extensa",
  "casa": "Uso oral\n1) Loratadina 10mg --------------------------- 14 cp\nTomar 1 cp VO 1 vez ao dia por 7 dias; se a coceira não melhorar em 2 dias, tomar 1 cp de 12/12h.\n2) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.",
  "avisoRx": ["Prednisona se urticária extensa ou angioedema.","Observar até a melhora e sem sinais de anafilaxia (rouquidão, chiado, tontura, vômitos repetidos).","Observar mais tempo se a reação começou rápido ou se o gatilho continua sendo absorvido."],
  "unidade": "1) Anti-histamínico H1 não sedativo VO: cetirizina 10 mg (até 20 mg) ou loratadina 10 mg VO, dose única.\n   Sem via oral: prometazina 25–50 mg IM profunda (máx. 100 mg/dia; nunca EV; causa sonolência).\n2) Angioedema ou urticária extensa: prednisona 40 mg VO (2 cp de 20 mg), dose única na unidade (NICE CKS Urticaria: prednisolona 40 mg/dia por até 7 dias); sem via oral, metilprednisolona 32 mg EV (dose equivalente; bula).\n3) Angioedema sem urticária, sobretudo em uso de IECA ou com história familiar: pensar em angioedema por bradicinina (não responde a adrenalina, anti-histamínico ou corticoide); suspender o IECA e observar a via aérea.\n* Se houver critério de anafilaxia (hipotensão, broncoespasmo, estridor, acometimento de 2 sistemas), seguir o protocolo de anafilaxia: adrenalina IM é a 1ª droga.",
  "orient": "- Volte imediatamente ao pronto-socorro se tiver falta de ar, rouquidão, chiado no peito, inchaço nos lábios ou na língua, tontura ou vômitos repetidos.",
  "rev": [
   "Corrigido (2026-10-17): anti-histamínico H1 não sedativo VO como primeira escolha, igual ao fluxo da anafilaxia; prometazina IM só sem via oral; hidrocortisona 500 mg retirada; corticoide só na urticária extensa ou no angioedema; angioedema por bradicinina; observação pela resposta, sem prazo fixo sem fonte (EAACI 2022; RCUK 2021; bula do Fenergan).",
   "Adicionado: alerta de que anafilaxia exige adrenalina IM, não anti-histamínico/corticoide.",
   "Adicionado: receita de alta.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "NICE CKS. Urticaria (revisão 2024): na urticária aguda grave, prednisolona 40 mg/dia por até 7 dias junto do anti-histamínico.",
   "Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020).",
   "Zuberbier T et al. The international EAACI/GA²LEN/EuroGuiDerm/APAAACI guideline for the definition, classification, diagnosis, and management of urticaria (Allergy 2022;77:734) — anti-histamínico H1 de segunda geração, dose até 4 vezes a padrão; corticoide em curso curto na urticária aguda grave.",
   "Resuscitation Council UK. Emergency treatment of anaphylaxis, 2021 (reações sem anafilaxia: cetirizina 10–20 mg).",
   "Bula do Fenergan (prometazina) injetável registrada na Anvisa: 25–50 mg IM profunda, máx. 100 mg/dia."
  ]
 },
 {
  "id": "anafilaxia",
  "nome": "Anafilaxia",
  "cat": "emerg",
  "cid": "T78.2",
  "sin": "choque anafilatico adrenalina edema glote",
  "casa": "Uso oral\n1) Loratadina 10mg --------------------------- 5 cp\nTomar 1 cp VO 1x ao dia, se coceira ou urticária.",
  "avisoRx": ["Alta só após observação.","Observação após a melhora: mínimo de 6 h.","Alta em 2 h só se todos: adrenalina até 30 min do início, resposta em 5–10 min, resolução completa, autoinjetor em mãos com treino e supervisão (RCUK).","12 h se reação grave (mais de 2 doses), asma grave, absorção continuada do alérgeno, chegada tarde da noite ou dificuldade de voltar.","Antes da alta: levantar e checar tontura ou queda da PA ao ficar em pé.","Encaminhar ao alergista; adrenalina autoinjetável, se disponível."],
  "unidade": "1) Adrenalina 1 mg/mL: 0,01 mg/kg IM no vasto lateral da coxa (máx. 0,5 mg = 0,5 mL no adulto; 0,3 mg na criança).\n   Repetir a cada 5 min se não houver melhora.\n2) Deitado com as pernas elevadas (sentado se a falta de ar piorar deitado; gestante em decúbito lateral esquerdo). Não levantar bruscamente.\n3) O2 em máscara com reservatório 10–15 L/min.\n4) SF 0,9% 20 mL/kg EV rápido se hipotensão (máx. 1.000 mL por bolus no adulto; repetir conforme a resposta).\n5) Broncoespasmo persistente (adjuvante, sem atrasar a adrenalina IM): salbutamol 5 mg + ipratrópio 500 mcg nebulizados. Estridor: adrenalina 1 mg/mL, 5 mL nebulizados.\n6) Refratária (sem melhora após 2 doses IM): adrenalina em infusão — 1 mg em 100 mL de SF 0,9% (10 mcg/mL) a 0,5–1 mL/kg/h, em via exclusiva (pode ser periférica), e UTI. Manter a adrenalina IM a cada 5 min até a infusão começar.\n7) Em uso de betabloqueador e sem resposta: glucagon 1 mg EV; pode repetir ou seguir com infusão de 1–2 mg/h.\n8) Depois de estabilizado (não substituem a adrenalina):\n   - Anti-histamínico só para sintomas de pele: loratadina 10 mg VO; sem via oral, prometazina 25–50 mg IM profunda (máx. 100 mg/dia).\n   - Corticoide não é rotina: considerar se asma, broncoespasmo persistente ou reação refratária — hidrocortisona 200 mg EV ou metilprednisolona 1–2 mg/kg EV (máx. 125 mg).",
  "orient": "- Evite o que causou a reação alérgica.\n- Marque consulta com um alergista.\n- Se tiver adrenalina autoinjetável, ande sempre com ela.\n- Volte imediatamente ao pronto-socorro se tiver falta de ar, rouquidão, inchaço na boca ou na garganta, tontura ou desmaio.",
  "rev": [
   "Corrigido (2026-10-17): broncodilatador (salbutamol 5 mg + ipratrópio 500 mcg nebulizados) e adrenalina nebulizada no estridor iguais ao cartão e ao protocolo; teto de 1.000 mL por bolus levado à calculadora (RCUK 2021).",
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
  "casa": "Uso oral\n1) Doxiciclina 100mg ------------------------- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias.\n2) Metronidazol 250mg ------------------------ 56 cp\nTomar 2 cp VO de 12/12h por 14 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (no máximo 8 cp por dia).\n\nParceria sexual: deve procurar a unidade de saúde para receber o tratamento (injeção e comprimidos em dose única).",
  "avisoRx": ["Reavaliar em 72h; se não melhorar, internar.","Internar se: gestante; abscesso tubo-ovariano; estado geral grave, com febre, náuseas ou vômitos; não tolera antibiótico oral ou não tem como voltar.","Internar também se dúvida com emergência cirúrgica (apendicite, gravidez ectópica) ou sem melhora em 72h.","Ofertar testes rápidos de HIV, sífilis, hepatites B e C.","Parceria sexual: ceftriaxona 500 mg IM + azitromicina 1 g VO, dose única (PCDT IST 2022)."],
  "unidade": "1) Ceftriaxona 500 mg IM, dose única (diluente com lidocaína da apresentação IM).\n2) Beta-hCG antes de iniciar.",
  "orient": "- Não tome bebida alcoólica durante o uso do metronidazol e até 3 dias depois do último comprimido.\n- Não tenha relações sexuais até o fim do tratamento, seu e da sua parceria.\n- Retorne para reavaliação em 72 horas (3 dias).\n- Faça os testes rápidos de HIV, sífilis e hepatites B e C.",
  "rev": [
   "Corrigido (2026-10-17): fonte com link do PCDT IST 2022; critérios de internação do quadro 43; dipirona com máximo diário; álcool até 3 dias após o metronidazol, igual à ficha (PCDT IST 2022; CDC 2021; bula FDA do metronidazol).",
   "Corrigido: ceftriaxona 250mg → 500mg IM (PCDT-IST MS 2022).",
   "Corrigido: parceria deve receber ceftriaxona + azitromicina, não apenas azitromicina.",
   "Adicionado: beta-hCG, critérios de internação e reavaliação em 72h.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 — cap. 10, DIP: quadro 43 (internação), quadro 44 (ceftriaxona 500 mg IM + doxiciclina 100 mg 12/12h + metronidazol 500 mg 12/12h por 14 dias), parcerias dos últimos 2 meses, DIU e gestação. https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf",
   "Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — DIP: teste de gravidez, critérios de hospitalização e reavaliação em 72 h.",
   "Bula FDA do metronidazol — álcool contraindicado durante o uso e até 3 dias depois; dipirona até 4 g por dia (EMA, ficha do painel)."
  ]
 },
 {
  "id": "dismenorreia",
  "nome": "Dismenorreia",
  "cat": "gu",
  "cid": "N94.6",
  "sin": "colica menstrual",
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias, iniciar no 1º dia do ciclo.\nOu\n1) Ácido mefenâmico 500mg -------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.",
  "avisoRx": ["Dor progressiva ou refratária: investigar endometriose com ginecologista."],
  "unidade": "1) Cetoprofeno 100 mg IM (ampola 50 mg/mL, 2 mL) ou EV (apresentação própria para EV, em 100 mL de SF em 20–30 min)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de soro fisiológico ou água destilada.",
  "orient": "- Use calor local (bolsa de água morna) para aliviar a dor.\n- Se a dor for piorando com o tempo ou não melhorar com o tratamento, procure um ginecologista para investigar endometriose.",
  "rev": [
   "Corrigido (2026-10-17): codeína retirada da receita (opioide sem indicação na dismenorreia primária; AINE é a 1ª linha e, se não bastar, contraceptivo hormonal) (SOGC 2017; ACOG CO 760).",
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
  "avisoRx": ["EDA ambulatorial se ≥ 40 anos, sinais de alarme, falha do IBP ou parente de 1º grau com câncer gástrico (≥ 30 anos) (V Consenso H. pylori 2026, enunc. 18).","< 40 anos sem alarme: testar e tratar H. pylori na atenção primária (V Consenso, enunc. 6; ACG/CAG 2017; Harrison, 22ª ed., cap. 48).","CID: DRGE K21.9 | Gastrite K29.7."],
  "unidade": "1) Omeprazol 40 mg EV: reconstituir no diluente próprio (10 mL) e aplicar lento, ou diluir em 100 mL de SF e correr em 20–30 min.\n2) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM.",
  "orient": "- Faça refeições menores, mais vezes ao dia; não se deite até 2 horas depois de comer; reduza bebidas alcoólicas, café, frituras e cigarro.\n- Evite anti-inflamatórios (como ibuprofeno, diclofenaco e nimesulida).\n- Procure a unidade básica de saúde (posto de saúde) para fazer endoscopia se tiver 40 anos ou mais, perda de peso, anemia, dificuldade para engolir, vômitos que não param, sangramento, caroço na barriga, se não melhorar com o tratamento, ou se tiver 30 anos ou mais e pai, mãe, irmão ou filho com câncer de estômago.\n- Se tiver menos de 40 anos e nenhum desses sinais, procure a unidade básica de saúde para fazer o exame da bactéria do estômago (H. pylori) e tratá-la, se o resultado for positivo.",
  "rev": [
   "Corrigido (2026-10-17): checklist e alta leiga com o limiar de 40 anos para endoscopia, como a conduta (V Consenso Brasileiro de H. pylori 2026, enunciado 18).",
   "Ajustado (2026-10-09): idade para endoscopia ≥ 60 → ≥ 40 anos (V Consenso Brasileiro de H. pylori 2026); adicionado testar e tratar o H. pylori.",
   "Removido: texto de HMA que estava colado no meio da prescrição.",
   "Corrigido: domperidona limitada a 7 dias (risco de arritmia) e digitação ('três vezles').",
   "Adicionado: sinais de alarme para EDA.",
   "Ajustado: idade para EDA de rotina ≥ 60 anos (ACG/CAG 2017), além dos sinais de alarme.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Coelho LGV et al. V Consenso Brasileiro sobre Helicobacter pylori (Arq Gastroenterol 2026;63:e26043). doi 10.1590/S0004-2803.24612026-043: endoscopia a partir de 40 anos com dispepsia ou com sinais de alarme (enunciado 18); testar e tratar até 45 anos sem alarme (enunciado 6).",
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
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu\n1) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor, junto com o anti-inflamatório ou sozinha se ele for contraindicado (no máximo 8 cp por dia).\nOu\n2) Paracetamol 750mg ------------------------- 20 cp\nTomar 1 cp VO de 6/6h se dor, junto com o anti-inflamatório ou sozinho se ele for contraindicado (no máximo 4 cp por dia).\n3) Ciclobenzaprina 5mg ----------------------- 10 cp\nTomar 1 cp VO à noite por até 10 dias. Pode dar sono: não dirigir.\n4) Tramadol 50mg ----------------------------- 10 cp\nTomar 1 cp VO de 8/8h somente se dor intensa que não melhora com os anteriores, por até 5 dias (no máximo 3 cp por dia).",
  "avisoRx": ["Ibuprofeno ou diclofenaco só depois de descartar dengue; não usar na gestação, na doença renal nem com úlcera.","Ciclobenzaprina: evitar em idosos.","CID dorsalgia M54.9 | mialgia M79.1."],
  "unidade": "1) Cetoprofeno 100 mg IM (ampola 50 mg/mL, 2 mL) ou EV (apresentação própria para EV, em 100 mL de SF em 20–30 min)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Mantenha-se ativo e evite ficar o tempo todo deitado; use calor local (bolsa de água morna).\n- Volte imediatamente ao pronto-socorro se tiver: perda de força nas pernas, perda do controle da urina ou das fezes ou dificuldade para urinar, dormência nas nádegas e na parte interna das coxas, febre, se a dor começou depois de queda ou pancada, se já teve câncer ou se está perdendo peso sem explicação.\n- Se tiver dor no corpo com febre, não use anti-inflamatórios (ibuprofeno, diclofenaco, cetoprofeno) até que a dengue seja descartada.",
  "rev": [
   "Corrigido (2026-10-17): anti-inflamatório (ibuprofeno ou diclofenaco) passa a item 1, com ressalva de dengue, gestação, doença renal e úlcera; dipirona ou paracetamol viram item 2, junto com o anti-inflamatório ou sozinhos se ele for contraindicado (NICE NG59, rec. 1.2.13–1.2.14: não oferecer paracetamol isolado; ACP 2017; MS Dengue 2024).",
   "Corrigido (2026-10-17): teto da dipirona (8 cp por dia), do paracetamol (4 cp por dia) e do tramadol (3 cp por dia, até 5 dias); ciclobenzaprina com alerta de sono e no idoso; dexametasona retirada (sem benefício, ACP 2017; NICE NG59); alerta de dengue na mialgia (CDC 2022; Beers 2023; MS Dengue 2024).",
   "Ajustado: tramadol somente se dor intensa (não fixo por 5 dias).",
   "Adicionado: sinais de alarme (bandeiras vermelhas).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Qaseem A et al. ACP Guideline: Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain (Ann Intern Med 2017).",
   "NICE NG59. Low back pain and sciatica in over 16s: assessment and management, 2016 (atualizada em 2020): manter-se ativo; AINE na menor dose e pelo menor tempo; não oferecer paracetamol isolado, opioide fraco só se AINE contraindicado ou ineficaz.",
   "Dowell D et al. CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022. MMWR Recomm Rep 2022;71(3):1–95.",
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): evitar relaxante muscular; tramadol com cautela (hiponatremia).",
   "Bula Anvisa da ciclobenzaprina (Miosan): sonolência; uso por até 2–3 semanas; interação com tramadol e antidepressivos (síndrome serotoninérgica).",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue)."
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
  "orient": "- Seque bem entre os dedos após o banho, troque as meias todos os dias e prefira calçados arejados.",
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
  "casa": "Uso oral\n1) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.\n2) Azitromicina 500mg ------------------------ 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.\nOu\n2) Amoxicilina + Clavulanato 875/125mg ------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\n\nUso inalatório\n3) Salbutamol 100mcg spray ------------------- 1 fr\nInalar 2 a 4 jatos com espaçador de 4/4h a 6/6h se falta de ar.",
  "avisoRx": ["Antibiótico só se escarro purulento, com piora da falta de ar ou do volume do escarro."],
  "unidade": "1) Nebulização: Fenoterol 5mg/mL 10 gotas + Brometo de ipratrópio 0,25mg/mL 40 gotas em 3–5 mL de SF 0,9%. Repetir a cada 20 min até 3x se necessário.\n   (Nebulizar com ar comprimido em hipercápnicos.)\n2) Prednisona 40mg VO 1x ao dia (por até 5 dias). Se não tolerar VO: Metilprednisolona 40mg EV.\n3) O2 com alvo de SatO2 88–92%.\n4) Gasometria se SatO2 < 88%, sonolência ou uso de musculatura acessória (considerar VNI).",
  "orient": "- Continue usando as bombinhas de uso contínuo.\n- Volte imediatamente ao pronto-socorro se a falta de ar piorar, se ficar muito sonolento ou com os lábios arroxeados.",
  "rev": [
   "Corrigido (2026-10-17): amoxicilina-clavulanato 7 → 5 dias; antibiótico só com escarro purulento (nota fora da receita); hidrocortisona 100 mg EV (não equivalia a prednisona 40 mg) → metilprednisolona 40 mg EV se não tolerar VO (GOLD 2026, cap. 4; HC-FMUSP 18ª ed., cap. DPOC).",
   "Corrigido: ipratrópio 5 gotas → 40 gotas (0,5mg); fenoterol 10 gotas.",
   "Adicionado: alvo de SatO2 88–92% e critérios de gasometria/VNI.",
   "Ajustado (GOLD): prednisona 40mg 1x/dia; antibiótico se escarro purulento."
  ],
  "fontes": [
   "Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2026 Report, cap. 4 — Management of Exacerbations (SABA ± ipratrópio; corticoide sistêmico por até 5 dias; antibiótico por 5 dias se escarro purulento; O2 com alvo 88–92%). https://goldcopd.org",
   "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024 — cap. DPOC (antibiótico com 3 sintomas cardinais, ou 2 se um for escarro purulento, ou suporte ventilatório; prednisona 40 mg VO; metilprednisolona EV 20–60 mg; nebulização com ar comprimido).",
   "Bula FDA Zithromax (azitromicina): exacerbação bacteriana aguda de DPOC, 500 mg 1x ao dia por 3 dias."
  ]
 },
 {
  "id": "enterobiase",
  "nome": "Enterobíase (oxiúros)",
  "cat": "gi",
  "cid": "B80",
  "sin": "oxiurus verme coceira anal",
  "casa": "Uso oral\n1) Albendazol 400mg -------------------------- 2 cp\nTomar 1 cp VO em dose única e repetir após 14 dias.",
  "avisoRx": ["Tratar todos os contatos domiciliares."],
  "unidade": "",
  "orient": "- Todas as pessoas que moram na mesma casa também precisam ser tratadas.\n- Lave roupas de cama e toalhas em água quente, mantenha as unhas curtas e lave bem as mãos.",
  "rev": [
   "Corrigido (2026-10-17): fontes separadas e com link (CDC, bula Zentel); alerta de gestação do albendazol fiel à bula: não usar na gestação nem em quem planeja engravidar (bula Zentel).",
   "Removido: dipirona IM para prurido anal (dipirona não trata prurido)."
  ],
  "fontes": [
   "CDC. Pinworm infection: clinical care. Mebendazol, pamoato de pirantel ou albendazol em dose única, repetida após 2 semanas; tratar os contatos domiciliares. https://www.cdc.gov/pinworm/hcp/clinical-care/",
   "Bula Zentel (albendazol, Anvisa): enterobíase, 400 mg em dose única a partir de 2 anos; 2º ciclo se necessário; medidas de higiene para quem mora junto; não usar na gestação."
  ]
 },
 {
  "id": "hiperglicemia",
  "nome": "Hiperglicemia (correção com insulina regular)",
  "cat": "endo",
  "cid": "R73.9",
  "sin": "glicemia alta diabetes dm insulina",
  "casa": "",
  "avisoRx": ["Escala isolada de insulina é desencorajada no internado (ADA 2026; SBD 2026): só para correção pontual de hiperglicemia ocasional.","Hiperglicemia persistente (2 ou mais glicemias > 180 mg/dL em 24 h) pede insulina basal.","Revisar adesão e ajustar a medicação de uso contínuo com o clínico.","CID: DM2 descompensado E11.9."],
  "unidade": "Insulina regular SC (ou análogo rápido) conforme a glicemia capilar, pela escala de correção da SBD 2026. Coluna usual; entre parênteses, sensível (idoso, frágil, IMC < 19, disfunção de órgão) e resistente (IMC > 33, corticoide, hiperglicemia persistente). Insulina regular 30 min antes da refeição; análogo rápido até 15 min antes; em dieta zero ou contínua, a cada 4–6 h.\n141–180 mg/dL: 1 unidade (sensível 0; resistente 2 unidades)\n181–220 mg/dL: 2 unidades (sensível 1; resistente 4)\n221–260 mg/dL: 3 unidades (sensível 1; resistente 6)\n261–300 mg/dL: 4 unidades (sensível 2; resistente 8)\n301–340 mg/dL: 5 unidades (sensível 2; resistente 10)\n341–380 mg/dL: 6 unidades (sensível 3; resistente 12)\n381–420 mg/dL: 7 unidades (sensível 3; resistente 14)\n> 420 mg/dL: 8 unidades (sensível 4; resistente 16) e avisar o médico\n\n* Se glicemia > 250 com vômitos, dor abdominal, taquipneia ou rebaixamento: investigar CAD/EHH (gasometria, cetonúria, eletrólitos). Não tratar só com escala SC.",
  "orient": "- Tome corretamente os remédios para diabetes de uso contínuo e marque consulta com o clínico para ajustá-los.",
  "rev": [
   "Corrigido (2026-10-17): horário da aplicação: insulina regular 30 min antes da refeição, análogo rápido até 15 min antes, dieta zero ou contínua a cada 4–6 h (SBD 2026, tabela 3 e quadro 2).",
   "Corrigido (2026-10-17): \"UI\" → \"unidades\" (ISMP); escala trocada pela publicada na diretriz da SBD 2026 (tabela 3, colunas usual, sensível e resistente); ADA 2026 e consenso de crises hiperglicêmicas 2024 nas fontes (SBD 2026; ADA 2026; ISMP Brasil 2015).",
   "Adicionado: alerta para cetoacidose/estado hiperosmolar."
  ],
  "fontes": [
   "Marino EC, Momesso D, Toyoshima MTK et al. Manejo da hiperglicemia hospitalar em pacientes não críticos — Diretriz da Sociedade Brasileira de Diabetes, ed. 2026 — tabela 3, sugestão de escala de correção (sensível, usual e resistente); escala isolada só para hiperglicemia ocasional. https://diretriz.diabetes.org.br/?p=21079",
   "American Diabetes Association. Standards of Care in Diabetes—2026, seção 16, Diabetes Care in the Hospital (Diabetes Care 2026;49 Suppl 1) — escala de correção isolada desencorajada; correção associada à insulina basal.",
   "Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (Diabetes Care 2024;47:1257) — quando investigar cetoacidose e estado hiperosmolar.",
   "ISMP Brasil. Erros de medicação associados a abreviaturas, siglas e símbolos (Boletim ISMP Brasil, 2015); ISMP List of Error-Prone Abbreviations, 2021 — \"U\" e \"UI\": escrever \"unidades\"."
  ]
 },
 {
  "id": "hipoglicemia",
  "nome": "Hipoglicemia",
  "cat": "endo",
  "cid": "E16.2",
  "sin": "glicemia baixa hipo",
  "casa": "",
  "avisoRx": ["Após recuperação, alimentar o paciente.","Hipoglicemia por sulfonilureia, insulina de ação longa ou DRC: observar 12 a 24 h com glicemia capilar de hora em hora.","Sulfonilureia: após a glicose EV, octreotide 50 mcg SC ou EV e 50 mcg a cada 6 h (uso fora da bula; ver cartão de intoxicação).","Sulfonilureia: liberar só 12 h após suspender a glicose EV e o octreotide."],
  "unidade": "Glicemia < 70 mg/dL:\n\n# Consciente e capaz de engolir:\n15–20g de carboidrato VO (1 copo de suco ou 1 colher de sopa de açúcar em água). Repetir a glicemia em 15 min.\n\n# Rebaixado ou sem via oral:\n1) Tiamina 100mg EV (se etilismo ou desnutrição), junto com a glicose — não atrasar a glicose.\n2) Glicose 50% 40–50 mL EV em veia calibrosa (4–5 amp de 10 mL)\n   Ou Glicose 10% 150–250 mL EV.\n3) Repetir a glicemia em 15 min e manter soro glicosado 10% se necessário.",
  "orient": "- Depois de se recuperar, alimente-se.\n- Se voltar a ter suor frio, tremor, fome intensa ou confusão, coma ou beba algo com açúcar e procure atendimento.",
  "rev": [
   "Corrigido (2026-10-17): sulfonilureia igual ao cartão de intoxicação: octreotide 50 mcg logo após a glicose EV e depois de 6/6h; liberar 12 h após suspender glicose EV e octreotide (Klein-Schwartz 2016; Glatstein 2012).",
   "Corrigido (2026-10-17): ADA 2026; tempo de observação de 12 a 24 h; octreotide coerente com o cartão de intoxicação (ADA 2026; HC-FMUSP 18ª ed., cap. 88; Klein-Schwartz 2016).",
   "Corrigido: tiamina junto com a glicose, sem atrasá-la (Schabelman 2012), em vez de antes.",
   "Unificado: as duas seções de hipoglicemia do modelo.",
   "Corrigido: 1 amp de glicose 50% diluída em 100 mL de SF em 10–15 min era dose insuficiente; padronizado 40–50 mL de glicose 50%.",
   "Adicionado: via oral no consciente e tiamina."
  ],
  "fontes": [
   "American Diabetes Association. Standards of Care in Diabetes—2026, seção 6, Glycemic Goals and Hypoglycemia (Diabetes Care 2026;49 Suppl 1) — 15–20 g de glicose VO, repetir em 15 min; glucagon se não puder engolir.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 88, Hipoglicemia (glicose EV 15–20 g, até 50 g; glucagon 1–2 mg IM sem acesso; tiamina junto; observar 12–24 h com glicemia de hora em hora se risco de recorrência).",
   "Klein-Schwartz W, Stassinos GL, Isbister GK. Treatment of sulfonylurea and insulin overdose (Br J Clin Pharmacol 2016;81:496) — glicose EV e depois octreotide; observar 12 h após suspender glicose e octreotide.",
   "Glatstein M, Scolnik D, Bentur Y. Octreotide for the treatment of sulfonylurea poisoning (Clin Toxicol 2012;50:795) — adulto 50 mcg SC ou EV, seguido de 50 mcg a cada 6 h."
  ]
 },
 {
  "id": "enxaqueca",
  "nome": "Enxaqueca / Migrânea",
  "cat": "dor",
  "cid": "G43.9",
  "sin": "migranea dor de cabeca pulsatil",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO no início da crise, após alimentar-se; pode repetir após 8h (no máximo 3 cp por dia).\n3) Naratriptana 2,5mg ------------------------ 4 cp\nTomar 1 cp VO no início da crise. Se a dor melhorar e voltar, pode repetir após 4h; se não melhorar com o 1º, não repetir na mesma crise. No máximo 2 cp por dia.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Triptano contraindicado em doença coronariana, AVC prévio e HAS não controlada."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n2) Dexametasona 10 mg EV lenta ou IM (reduz recorrência nas 72h).\n   (Tudo IM, sem acesso venoso: Dipirona 1 g IM + Metoclopramida 10 mg IM + Dexametasona 10 mg IM.)",
  "orient": "- Anote suas crises de dor de cabeça em um diário.\n- Evite tomar remédio para dor em mais de 10 dias por mês, pois o uso em excesso pode piorar as dores de cabeça.",
  "rev": [
   "Corrigido (2026-10-17): ibuprofeno na crise, e não em horário fixo, com teto de 3 cp por dia e só com dengue descartada; dipirona com teto de 8 cp por dia; naratriptana sem repetir quando a 1ª dose falha; alternativa IM com metoclopramida e dexametasona 10 mg (sai ondansetrona e dexametasona 4 mg) (ACP 2025; AHS 2016; bula Naramig; MS Dengue 2024).",
   "Adicionado: metoclopramida EV (antiemético com efeito antimigranoso) e dexametasona 10mg para evitar recorrência.",
   "Adicionado: contraindicações do triptano.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Orr SL et al. Management of Adults With Acute Migraine in the ED: AHS Evidence Assessment (Headache 2016;56:911).",
   "Ailani J et al. AHS Consensus Statement 2021 (triptanos e contraindicações).",
   "Qaseem A et al. Pharmacologic Treatment of Acute Episodic Migraine Headache in Outpatient Settings: A Clinical Guideline From the American College of Physicians. Ann Intern Med 2025 (online 18/03/2025): AINE ou paracetamol; triptano somado se não responder.",
   "Speciali JG et al. Protocolo Nacional para Diagnóstico e Manejo das Cefaleias nas Unidades de Urgência do Brasil — 2018 (ABN/SBCe).",
   "Bula Anvisa do Naramig (naratriptana 2,5 mg), GSK: segunda dose após pelo menos 4 h só se a dor voltar; não repetir se a 1ª não fez efeito; máx. 5 mg em 24 h.",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue)."
  ]
 },
 {
  "id": "escabiose",
  "nome": "Escabiose / Sarna",
  "cat": "pele",
  "cid": "B86",
  "sin": "sarna coceira noturna",
  "casa": "Uso tópico\n1) Permetrina 5% loção/creme ----------------- 1 fr\nAplicar à noite do pescoço aos pés (incluir entre dedos, sob as unhas, umbigo e genitais), deixar agir 8–12h e remover no banho. Repetir após 7 dias. Em idosos e crianças pequenas, aplicar também no couro cabeludo e na face, poupando olhos e boca.\n\nUso oral\n2) Ivermectina 6mg --------------------------- conforme peso\nTomar VO em dose única, com água, e repetir após 7 dias. Dose por peso: 15–24 kg ½ cp; 25–35 kg 1 cp; 36–50 kg 1½ cp; 51–65 kg 2 cp; 66–79 kg 2½ cp; 80 kg ou mais 200 mcg/kg.\n\n3) Hidroxizina 25mg -------------------------- 20 cp\nTomar 1 cp VO à noite (ou de 8/8h) se coceira (no máximo 3 cp por dia).",
  "avisoRx": ["Ivermectina: casos extensos, falha do tópico ou surtos.","Ivermectina: não usar abaixo de 15 kg ou de 5 anos; na gestação, só com indicação médica (preferir permetrina).","Gestante, amamentando e criança a partir de 2 meses: permetrina é a escolha.","Hidroxizina: evitar em idosos (ver alerta)."],
  "unidade": "",
  "orient": "- Todas as pessoas que moram com você ou têm contato próximo devem ser tratadas ao mesmo tempo.\n- Lave roupas de cama e roupas de uso em água quente, ou guarde-as em saco fechado por 72 horas.\n- A coceira pode continuar por 2 a 4 semanas mesmo após o tratamento correto.",
  "rev": [
   "Corrigido (2026-10-17): ivermectina pela tabela de peso da bula (½ cp de 15–24 kg a 2½ cp de 66–79 kg; 200 mcg/kg a partir de 80 kg), com água, sem uso abaixo de 15 kg ou de 5 anos (bula Revectina); permetrina como escolha na gestação, na amamentação e a partir de 2 meses, com couro cabeludo e face em idosos e crianças pequenas (IUSTI 2026; bula da permetrina 5%); hidroxizina com no máximo 3 cp por dia e aviso para idosos (bula Hixizine; Beers 2023); IUSTI 2017 → 2026.",
   "Corrigido: ivermectina '3 cp' fixos → dose por peso (200 mcg/kg). Use a Calculadora.",
   "Trocado: dipirona IM para prurido → hidroxizina VO."
  ],
  "fontes": [
   "IUSTI. 2026 European Guideline for the Management of Scabies (versão final, jun/2026): permetrina 5% por 8–12 h repetida em 7–14 dias; ivermectina 200 mcg/kg em 2 doses com 1 semana de intervalo; gestação, amamentação e lactentes. https://iusti.org/treatment-guideline",
   "Bula Revectina (ivermectina 6 mg), Abbott, registrada na Anvisa — tabela de dose por peso; contraindicada abaixo de 15 kg ou 5 anos.",
   "Bula da permetrina 5% loção (Nedax), registrada na Anvisa — uso a partir de 2 meses.",
   "Bula Hixizine (hidroxizina 25 mg), registrada na Anvisa — adulto 25 mg 3 a 4x ao dia; American Geriatrics Society. Beers Criteria, 2023 (anti-histamínico de 1ª geração: evitar no idoso).",
   "Centers for Disease Control and Prevention. Scabies — Clinical Care, 2024. https://www.cdc.gov/scabies/hcp/clinical-care/"
  ]
 },
 {
  "id": "erisipela",
  "nome": "Erisipela / Celulite",
  "cat": "pele",
  "cid": "A46",
  "sin": "celulite perna vermelha infeccao pele",
  "casa": "Uso oral\n1) Cefalexina 500mg -------------------------- 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\nOu\n1) Amoxicilina 500mg ------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\nOu\n1) Clindamicina 300mg ------------------------ 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (no máximo 8 cp por dia).",
  "avisoRx": ["Antibiótico: estender até 10 dias se não houver melhora.","Amoxicilina para erisipela típica; não há diretriz com amoxicilina de 12/12h para erisipela.","Clindamicina se alergia a penicilina."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de soro fisiológico ou água destilada.\n2) Marcar a borda da lesão com caneta para acompanhar a evolução.\n* Internar para antibiótico EV (cefazolina ou oxacilina; alergia a penicilina: clindamicina) se: sinais sistêmicos (SIRS), falha em 48–72h, imunossupressão, face extensa, não conseguir tomar VO ou suspeita de infecção necrosante (avaliar cirurgia).",
  "orient": "- Faça repouso com a perna ou o braço afetado elevado.\n- Trate a porta de entrada da infecção, como frieira ou ferida na pele.\n- Retorne em 48 a 72 horas para reavaliação, ou antes se tiver febre, bolhas, dor muito forte ou se a vermelhidão passar da marca feita na pele.\n- Se ao terminar o antibiótico a pele ainda não tiver melhorado, não pare por conta própria: volte para reavaliação, pois o tratamento pode precisar ser prolongado.",
  "rev": [
   "Corrigido (2026-10-17): clindamicina 300 mg de 8/8h → 6/6h, 20 cp (IDSA SSTI 2014, tabela 2; NICE NG141); dipirona com no máximo 8 cp por dia (ficha dipirona); critério de internação sem sigla, com cefazolina, oxacilina ou clindamicina EV e suspeita de infecção necrosante (IDSA SSTI 2014, rec. 21).",
   "Removido: neomicina + bacitracina tópica (sem papel na erisipela).",
   "Removido: ibuprofeno (pode mascarar infecção necrosante; opcional).",
   "Trocado: ceftriaxona IM de rotina → critérios de internação.",
   "Ajustado (IDSA 2014): duração de 10 → 5 dias, estendendo se não houver melhora.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10) — rec. 18–25 e tabela 2.",
   "National Institute for Health and Care Excellence. NG141 — Cellulitis and erysipelas: antimicrobial prescribing, 2019 — 5 a 7 dias, estendendo conforme a evolução; clindamicina 300–450 mg 4x ao dia na alergia. https://www.nice.org.uk/guidance/ng141",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 134 — Infections of the Skin, Muscles, and Soft Tissues."
  ]
 },
 {
  "id": "ferida",
  "nome": "Escoriação / Ferida leve",
  "cat": "pele",
  "cid": "T14.0",
  "sin": "ferimento machucado arranhao corte",
  "casa": "Uso tópico\n1) Soro fisiológico 0,9% --------------------- 1 fr\nLavar o local 2x ao dia antes do curativo.\n2) Vaselina sólida --------------------------- 1 pote\nAplicar fina camada sobre a ferida limpa e cobrir com gaze ou curativo, trocando 1x ao dia até cicatrizar.\n\nUso oral\n3) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).",
  "unidade": "1) Limpeza com SF 0,9% + curativo.\n2) Verificar vacina antitetânica (ver \"Tétano / Feridas\").",
  "orient": "- Mantenha a ferida limpa e seca.\n- Retorne se aparecer vermelhidão, calor no local, pus ou febre.",
  "rev": [
   "Corrigido (2026-10-17): sulfadiazina de prata (indicada para queimadura, bula Dermazine) → vaselina sólida e curativo trocado 1x ao dia (AAD, How to treat minor cuts); dipirona com no máximo 8 cp por dia (ficha dipirona); fontes do MS e da AAD no lugar de \"consenso clínico\".",
   "Adicionado: checagem da vacina antitetânica."
  ],
  "fontes": [
   "Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., 2023 — tétano acidental: profilaxia conforme o tipo de ferimento e a situação vacinal.",
   "American Academy of Dermatology. How to treat minor cuts (limpeza com água, vaselina, curativo). https://www.aad.org/public/everyday-care/injured-skin/burns/treat-minor-cuts",
   "Bula da sulfadiazina de prata 1% (Dermazine), registrada na Anvisa — indicação: queimaduras."
  ]
 },
 {
  "id": "faringite",
  "nome": "Faringite viral",
  "cat": "orl",
  "cid": "J02.9",
  "sin": "dor de garganta viral",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Área com dengue (ou viagem em 14 dias) e febre com mialgia, cefaleia, dor retro-orbitária ou exantema: sem ibuprofeno nem AAS (MS, Dengue 2024, 6.1.2)."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Faça repouso, beba bastante líquido e faça gargarejo com água morna e sal.\n- Se tiver febre com dor no corpo, dor de cabeça, dor atrás dos olhos ou manchas na pele, não tome ibuprofeno nem AAS (aspirina) até que a dengue seja descartada; nesse caso, use só dipirona ou paracetamol.\n- Não é necessário antibiótico, pois a infecção é causada por vírus.\n- Retorne se a febre durar mais de 3 dias, se aparecerem placas na garganta ou dificuldade para engolir.",
  "rev": [
   "Corrigido (2026-10-09): não usar ibuprofeno na febre com dengue não descartada (MS, Dengue 2024).",
   "Movido: orientações que estavam em 'Na unidade' para Orientações.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: caso suspeito (item 10.1); não usar salicilatos, anti-inflamatórios nem corticoides e orientar a não se automedicar (item 6.1.2); só dipirona e paracetamol (apêndice H). https://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_6ed.pdf",
   "Shulman ST et al. IDSA GAS Pharyngitis Guideline 2012 (não tratar faringite viral com antibiótico)."
  ]
 },
 {
  "id": "gases",
  "nome": "Gases / Flatulência",
  "cat": "gi",
  "cid": "R14",
  "sin": "distensao abdominal meteorismo",
  "casa": "Uso oral\n1) Simeticona 75mg/mL gotas ------------------ 1 fr\nTomar 13 gotas (40 mg) VO 3x ao dia, após as refeições, por até 3 dias.",
  "unidade": "",
  "orient": "- Evite refrigerantes, feijão, repolho e chiclete, e coma devagar.",
  "rev": [
   "Corrigido (2026-10-17): simeticona 15 → 13 gotas (40 mg) 3x ao dia, como a bula Luftal e a ficha; fontes de verdade (bula Luftal; AGA 2023) no lugar de \"evidência limitada\"."
  ],
  "evid": "Simeticona tem evidência limitada.",
  "fontes": [
   "Bula Luftal gotas (simeticona 75 mg/mL, Anvisa): adultos e maiores de 12 anos, 13 gotas 3x ao dia; máximo 500 mg/dia (166 gotas).",
   "Moshiree B et al. AGA Clinical Practice Update on Evaluation and Management of Belching, Abdominal Bloating, and Distention (Gastroenterology 2023;165:791). https://doi.org/10.1053/j.gastro.2023.04.039"
  ]
 },
 {
  "id": "geca",
  "nome": "GECA / Gastroenterocolite aguda",
  "cat": "gi",
  "cid": "A09",
  "sin": "diarreia vomito gastroenterite virose intestinal",
  "casa": "Uso oral\n1) Sais de reidratação oral ------------------ 10 envelopes\nDiluir 1 envelope em 1 L de água filtrada e beber aos poucos ao longo do dia, após cada evacuação.\n2) Ondansetrona 8mg (Vonau Flash) ------------ 10 cp\nDissolver 1 cp na língua de 8/8h se náuseas ou vômitos.\n3) Dipirona 500 mg ---------------------------- 20 cp\nTomar 1 a 2 cp VO de 6/6h se dor ou febre (máximo 4 g/dia).\n4) Saccharomyces boulardii 200mg (Repoflor) -- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu\n4) Enterogermina flaconete ------------------- 10 fr\nTomar 1 flaconete VO de 12/12h por 5 dias.\n\n# Se cólica:\n5) Escopolamina 10 mg (Buscopan) ------------- 20 drágeas\nTomar 1 a 2 drágeas VO de 8/8h se cólica (máximo 6 drágeas/dia).\n\n# Se disenteria (diarreia com sangue) com febre:\n6) Ciprofloxacino 500mg ---------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\nOu\n6) Azitromicina 500mg ------------------------ 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.",
  "avisoRx": ["Disenteria em gestante: só azitromicina.","Plano A (MS; IDSA 2017, rec. 45). Antidiarreico não é rotina (MS); loperamida: IDSA 2017, rec. 47.","Disenteria tratada com antibiótico: reavaliar em 2 dias (MS, cartaz D.1.1)."],
  "unidade": "1) SF 0,9% 1.000 mL EV aberto (se desidratação moderada/grave ou vômitos incoercíveis).\n2) Ondansetrona 4 mg EV lenta (≥ 30 s), pode diluir em 8 mL de AD, ou IM\n   Ou Dimenidrinato + Piridoxina: ampola EV (10 mL) em 100 mL de SF em 30 min; existe apresentação própria para IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n3) Escopolamina 20 mg + dipirona 2,5 g (Buscopan Composto) 1 ampola EV lenta (no mínimo 5 minutos, paciente deitado), diluída em 10–20 mL de SF 0,9%, ou IM profunda (se cólica).",
  "orient": "- Beba 2 a 3 litros de líquidos por dia, em pequenos goles.\n- Mantenha a alimentação habitual, em porções menores se tiver enjoo; evite refrigerante e não adoce chá nem suco.\n- Não use remédio para prender o intestino sem orientação médica. A loperamida nunca deve ser usada por menores de 18 anos, nem se houver febre ou sangue nas fezes.\n- Se estiver tomando antibiótico para diarreia com sangue, retorne para reavaliação em 2 dias.\n- Volte imediatamente ao pronto-socorro se não conseguir beber líquidos, se desmaiar, se tiver sangue ou pus nas fezes, ou urina muito escura ou em pouca quantidade.",
  "rev": [
   "Corrigido (2026-10-17): Buscopan Composto comprimido \"se dor ou febre\" (só 250 mg de dipirona) → dipirona 500 mg 1 a 2 cp de 6/6h, máx. 4 g/dia (bula Novalgina), e escopolamina 10 mg só se cólica, em bloco próprio (bula Buscopan); Buscopan Composto EV com princípio ativo e no mínimo 5 minutos (bula injetável).",
   "Corrigido (2026-10-09): manter a alimentação habitual (MS e IDSA 2017); antidiarreico não é rotina; gestante sem ciprofloxacino; reavaliar disenteria em 2 dias; cartaz do MS nas fontes.",
   "Corrigido: item '3) c' estava incompleto → ondansetrona 8mg.",
   "Removido: omeprazol por 10 dias (sem indicação na GECA).",
   "Corrigido: ciprofloxacino na disenteria 5 → 3 dias; adicionada azitromicina.",
   "Adicionado: hidratação EV na unidade.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Ministério da Saúde. Manejo do paciente com diarreia (cartaz, atualização 2023): Plano A (líquidos após cada evacuação e vômito, manter a alimentação habitual, voltar se não melhorar em 2 dias ou se sinais de alerta); antibiótico só na disenteria com comprometimento do estado geral; reavaliar em 2 dias; ciprofloxacino: não usar em gestantes; antidiarreicos não devem ser usados. https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dda/publicacoes/manejo-do-paciente-com-diarreia-avaliacao-do-estado-de-hidratacao-do-paciente",
   "Shane AL et al. IDSA Clinical Practice Guidelines for Infectious Diarrhea (Clin Infect Dis 2017).",
   "Bula Novalgina (dipirona 500 mg, Anvisa): adultos, 500 mg a 1 g até 4x ao dia; máximo 4 g/dia.",
   "Bula Buscopan drágeas (butilbrometo de escopolamina 10 mg, Anvisa): 10 a 20 mg, 3 a 5x ao dia.",
   "Bula Buscopan Composto injetável (Boehringer Ingelheim, Anvisa): EV lenta, no máximo 1 mL/min, com o paciente deitado; contraindicado na obstrução intestinal mecânica e no megacólon."
  ]
 },
 {
  "id": "gota",
  "nome": "Gota — crise aguda",
  "cat": "dor",
  "cid": "M10.9",
  "sin": "artrite gotosa acido urico podagra",
  "casa": "Uso oral\n1) Colchicina 0,5mg -------------------------- 20 cp\nTomar 2 cp VO agora e 1 cp após 1h. Depois, 1 cp de 12/12h até 2–3 dias após o fim da crise.\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias. Não usar se doença renal, úlcera, sangramento, anticoagulante ou insuficiência cardíaca.\nOu\n2) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.",
  "avisoRx": ["Prednisona se contraindicação a AINE.","Colchicina: começar em até 36 h do início da crise.","Colchicina: não usar com claritromicina, eritromicina, cetoconazol, itraconazol, ritonavir, ciclosporina ou tacrolimo (toxicidade grave).","DRC avançada (clearance < 30 mL/min) ou diálise: preferir corticoide.","Se colchicina: clearance < 30, só o esquema do 1º dia, sem o 12/12h; diálise, 0,5 mg dose única; não repetir antes de 14 dias (bula Colcrys)."],
  "unidade": "1) Cetoprofeno 100 mg EV (apresentação própria para EV) em 100 mL de SF em 20–30 min, ou IM (ampola 50 mg/mL)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Dexametasona 4–10 mg IM ou EV lenta.",
  "orient": "- Se já usa alopurinol, não pare de tomar.\n- Evite bebidas alcoólicas (principalmente cerveja), carnes vermelhas, frutos do mar e refrigerantes.\n- Faça compressa de gelo no local por 20 minutos, 3 a 4 vezes ao dia.\n- Colchicina: não tome junto com claritromicina, eritromicina, cetoconazol, itraconazol, ritonavir, ciclosporina ou tacrolimo, pois pode causar intoxicação grave. Pare a colchicina se tiver diarreia.",
  "rev": [
   "Corrigido (2026-10-17): colchicina com as interações graves (claritromicina, azóis, ritonavir, ciclosporina, tacrolimo) e a conduta na DRC avançada; diclofenaco com contraindicações na receita (ACR 2020; EULAR 2016; bula Colcrys; Beers 2023).",
   "Corrigido (importante): colchicina 1mg 8/8h por 7 dias é dose tóxica. Esquema de baixa dose: 1mg + 0,5mg após 1h, depois 0,5mg 12/12h (ACR/EULAR).",
   "Adicionado: prednisona como alternativa ao AINE.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "FitzGerald JD et al. 2020 American College of Rheumatology Guideline for the Management of Gout (Arthritis Care Res 2020).",
   "Richette P et al. 2016 updated EULAR evidence-based recommendations for the management of gout (Ann Rheum Dis 2017;76:29): colchicina 1 mg e 0,5 mg após 1 h no 1º dia; prednisolona 30–35 mg/dia por 3–5 dias; evitar colchicina e AINE na DRC grave; evitar colchicina com inibidores potentes de CYP3A4 e glicoproteína P.",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 384 — Gout and Other Crystal-Associated Arthropathies.",
   "Bula FDA do Colcrys (colchicina): na DRC grave, não repetir o tratamento da crise antes de 14 dias; contraindicada com inibidor potente de CYP3A4 ou glicoproteína P na doença renal ou hepática.",
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): AINE no idoso com risco renal e de sangramento."
  ]
 },
 {
  "id": "gota-manut",
  "nome": "Gota — manutenção",
  "cat": "dor",
  "cid": "M10.9",
  "sin": "acido urico alopurinol",
  "casa": "Uso oral\n1) Alopurinol 100mg -------------------------- 30 cp\nTomar 1 cp VO 1 vez ao dia. Pode começar durante a crise, junto com a colchicina. Aumentar com o clínico a cada 2 a 5 semanas, conforme o ácido úrico (meta < 6 mg/dL). Se já usa, não suspender durante a crise.\n2) Colchicina 0,5mg -------------------------- 60 cp\nTomar 1 cp VO de 12/12h por 3 a 6 meses (para prevenir crises enquanto o alopurinol começa a agir). Não usar com claritromicina, cetoconazol ou ciclosporina.",
  "avisoRx": ["Alopurinol: na DRC moderada ou grave, meio cp.","Colchicina: na DRC moderada ou no idoso, 1 cp 1 vez ao dia.","Colchicina: clearance < 30 mL/min ou diálise, não usar sem o clínico (bula: 0,3 mg/dia, inviável com cp de 0,5 mg).","Início e titulação idealmente no ambulatório."],
  "unidade": "",
  "orient": "- Pare o alopurinol e procure atendimento se aparecerem manchas, bolhas ou feridas na pele, pois pode ser uma reação grave ao remédio.",
  "rev": [
   "Corrigido (2026-10-17): alopurinol pode começar durante a crise; meio cp na DRC moderada ou grave, na própria receita; titulação a cada 2 a 5 semanas; colchicina 1 vez ao dia na DRC e no idoso, com as interações (ACR 2020; EULAR 2016; bula Zyloric).",
   "Corrigido: alopurinol deve iniciar em dose baixa (100mg; 50mg na DRC) e ser titulado, não 300mg de início (ACR 2020)."
  ],
  "fontes": [
   "FitzGerald JD et al. 2020 ACR Guideline for the Management of Gout.",
   "Richette P et al. 2016 updated EULAR evidence-based recommendations for the management of gout (Ann Rheum Dis 2017;76:29): alopurinol começando com 100 mg/dia e aumentando 100 mg a cada 2–4 semanas; profilaxia com colchicina 0,5–1 mg/dia por 6 meses, com dose menor na DRC; evitar com inibidores potentes.",
   "Bula Anvisa do Zyloric (alopurinol): suspender ao primeiro sinal de erupção cutânea; reduzir a dose na insuficiência renal."
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
  "orient": "- Não assoe o nariz nem faça esforço físico nas próximas 24 a 48 horas.\n- Mantenha o ar do ambiente úmido.\n- Volte ao pronto-socorro se o sangramento durar mais de 20 minutos ou se voltar a acontecer.",
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
  "casa": "Uso oral\n1) Diosmina + Hesperidina 450/50mg (Daflon 500) --- 60 cp\nTomar 2 cp VO de 8/8h por 4 dias, depois 2 cp de 12/12h por 3 dias, depois 1 cp de 12/12h até terminar a caixa (cerca de 12 dias).\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.\n3) Ibuprofeno 600mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n4) Óleo mineral ------------------------------ 1 fr\nTomar 15 mL VO à noite, longe do jantar, por até 7 dias, se fezes endurecidas.\n\nUso tópico\n5) Policresuleno + cinchocaína pomada (Proctyl) --- 1 bisnaga\nAplicar na região anal 2 a 3x ao dia, após higiene, por 7 dias.",
  "avisoRx": ["Sangramento persistente ou > 45 anos: encaminhar para colonoscopia."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Faça banho de assento com água morna 3 vezes ao dia, por 10 minutos.\n- Coma alimentos ricos em fibras e beba bastante água; evite papel higiênico e prefira lavar a região com água.\n- Se o sangramento continuar, ou se tiver mais de 45 anos, procure a unidade básica de saúde (posto de saúde) para fazer colonoscopia.",
  "rev": [
   "Corrigido (2026-10-17): Daflon com fim (até terminar a caixa, cerca de 12 dias de manutenção; bula Daflon 500); óleo mineral por até 7 dias (bula); pomada com princípio ativo (policresuleno + cinchocaína; bula Proctyl).",
   "Ajustado: Daflon para o esquema da bula na crise (6 cp/dia × 4 dias, 4 cp/dia × 3 dias).",
   "Removido: Decadron IM na unidade.",
   "Adicionado: banho de assento e rastreio.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Davis BR et al. ASCRS Clinical Practice Guidelines for the Management of Hemorrhoids (Dis Colon Rectum 2018).",
   "Bula Daflon 500 (diosmina + hesperidina, Servier, Anvisa): crise, 6 cp/dia por 4 dias e 4 cp/dia por 3 dias; manutenção, 2 cp/dia.",
   "Bula do óleo mineral (Anvisa): laxante por no máximo 1 semana sem orientação médica; não tomar com alimentos.",
   "Bula Proctyl pomada (policresuleno + cloridrato de cinchocaína, Takeda, Anvisa)."
  ]
 },
 {
  "id": "herpes-simples",
  "nome": "Herpes simples (labial / genital)",
  "cat": "pele",
  "cid": "B00.9",
  "sin": "herpes labial genital hsv",
  "casa": "Uso oral\n# Herpes labial:\n1) Aciclovir 400mg --------------------------- 25 cp\nTomar 1 cp VO 5x ao dia por 5 dias.\nOu\n1) Valaciclovir 500mg ------------------------ 8 cp\nTomar 4 cp (2 g) VO de 12/12h por 1 dia, no início dos sintomas.\n\n# Herpes genital — 1º episódio:\n1) Aciclovir 400mg --------------------------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\n\n# Herpes genital — recorrência:\n1) Aciclovir 400mg --------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.",
  "avisoRx": ["Herpes labial: iniciar nos pródromos ou até 1 dia das lesões.","Herpes genital: ofertar testes rápidos de HIV, sífilis e hepatites.","Insuficiência renal: ClCr < 10 → aciclovir 200 mg de 12/12h; valaciclovir conforme o ClCr (ver ajuste renal; bulas). Hidratar bem.","CID: labial B00.1 | genital A60.0."],
  "unidade": "",
  "orient": "- Comece o remédio o mais cedo possível, de preferência nas primeiras 48 a 72 horas.\n- Herpes genital: faça os testes rápidos de HIV, sífilis e hepatites e evite relações sexuais enquanto houver feridas.\n- Beba bastante água durante o tratamento.",
  "rev": [
   "Corrigido (2026-10-17): ajuste renal do aciclovir separado do zoster: no herpes simples, só ClCr < 10 → 200 mg de 12/12h (antes o painel sugeria 800 mg de 8/8h); valaciclovir como alternativa no herpes labial, 2 g de 12/12h por 1 dia, com ajuste renal (bula do aciclovir; bula Valtrex); PCDT IST 2022 do MS nas fontes.",
   "Separado: esquemas por situação (labial, genital 1º episódio, recorrência).",
   "Removido: nota '(se gestante: 5 dias)', sem respaldo.",
   "Corrigido: herpes labial com aciclovir 400 mg 5x/dia por 5 dias (Spruance 1990), não 8/8h."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (PCDT IST), 2022 — herpes genital: 1º episódio aciclovir 400 mg 8/8h por 7–10 dias; recorrência 400 mg 8/8h por 5 dias ou 800 mg 12/12h por 5 dias, iniciando no pródromo.",
   "Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — herpes genital.",
   "Spruance SL et al. Aciclovir 400 mg 5x/dia no herpes labial (Antimicrob Agents Chemother 1990).",
   "Bula do valaciclovir (Valtrex), GSK, registrada na Anvisa; bula FDA Valtrex — herpes labial 2 g de 12/12h por 1 dia; ajuste renal (ClCr 30–49: 1 g 12/12h por 1 dia; 10–29: 500 mg 12/12h por 1 dia; < 10: 500 mg dose única).",
   "Bula do aciclovir comprimido, registrada na Anvisa — ajuste renal: esquemas de 200–400 mg → 200 mg de 12/12h se ClCr < 10; 800 mg 5x/dia → 800 mg de 8/8h se ClCr 10–25 e de 12/12h se < 10."
  ]
 },
 {
  "id": "zoster",
  "nome": "Herpes zoster (inclusive facial)",
  "cat": "pele",
  "cid": "B02.9",
  "sin": "cobreiro zona herpes facial",
  "casa": "Uso oral\n1) Aciclovir 400mg --------------------------- 70 cp\nTomar 2 cp (800mg) VO 5x ao dia (7h, 11h, 15h, 19h, 23h) por 7 dias.\nOu\n1) Aciclovir 200mg --------------------------- 140 cp\nTomar 4 cp (800mg) VO 5x ao dia (7h, 11h, 15h, 19h, 23h) por 7 dias.\nOu\n1) Valaciclovir 500mg ------------------------ 42 cp\nTomar 2 cp (1 g) VO de 8/8h por 7 dias.\n2) Paracetamol + Codeína 500/30mg (Paco) ----- 15 cp\nTomar 1 cp VO de 6/6h se dor intensa (no máximo 4 cp por dia).\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).",
  "avisoRx": ["Aciclovir 200 mg se for a apresentação disponível no posto.","Iniciar até 72h do início das lesões (ou depois, se lesões novas surgindo ou imunossuprimido).","Lesão na ponta do nariz (sinal de Hutchinson), olho vermelho ou baixa da visão: avaliação oftalmológica urgente."],
  "unidade": "",
  "orient": "- Comece o remédio o mais cedo possível.\n- Procure um oftalmologista com urgência se aparecerem lesões na ponta do nariz, se o olho ficar vermelho ou se a visão piorar.\n- Evite contato com gestantes, recém-nascidos e pessoas com imunidade baixa até todas as lesões virarem casquinhas (crostas).",
  "rev": [
   "Corrigido (2026-10-17): paracetamol + codeína com no máximo 4 cp por dia e dipirona com no máximo 8 cp por dia (fichas codeina e dipirona); valaciclovir 1 g de 8/8h por 7 dias como alternativa, com ajuste renal (Dworkin 2007; bula Valtrex); ajuste renal do aciclovir separado do herpes simples, mantendo 800 mg de 8/8h (ClCr 10–25) e de 12/12h (< 10) (bula).",
   "Renomeado: 'Herpes facial' → Herpes zoster. A dose de 800mg 5x/dia é de zoster, não de herpes labial.",
   "Adicionado: duração de 7 dias e alerta de zoster oftálmico."
  ],
  "fontes": [
   "Dworkin RH et al. Recommendations for the management of herpes zoster (Clin Infect Dis 2007).",
   "National Institute for Health and Care Excellence. CKS Shingles (revisado em 2024): antiviral em até 72 h se > 50 anos, imunossuprimido, zoster fora do tronco ou dor/erupção moderada a grave; zoster oftálmico com encaminhamento no mesmo dia. https://cks.nice.org.uk/topics/shingles/",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 198 — Varicella-Zoster Virus Infections.",
   "Bula do valaciclovir (Valtrex), GSK, registrada na Anvisa; bula FDA Valtrex — zoster 1 g de 8/8h por 7 dias; ajuste renal (ClCr 30–49: 1 g 12/12h; 10–29: 1 g 24/24h; < 10: 500 mg 24/24h).",
   "Bula do aciclovir comprimido, registrada na Anvisa — zoster 800 mg 5x/dia; ClCr 10–25: 800 mg de 8/8h; < 10: 800 mg de 12/12h."
  ]
 },
 {
  "id": "hpb",
  "nome": "Hiperplasia prostática benigna (HPB)",
  "cat": "uro",
  "cid": "N40",
  "sin": "prostata jato fraco retencao urinaria",
  "casa": "Uso oral\n1) Tansulosina 0,4mg ------------------------- 30 cp\nTomar 1 cp VO à noite, uso contínuo.\n2) Finasterida 5mg --------------------------- 30 cp\nTomar 1 cp VO 1x ao dia, uso contínuo (efeito após 3 a 6 meses).",
  "avisoRx": ["Finasterida só se próstata > 30 mL no exame de imagem, PSA > 1,5 ng/mL ou próstata aumentada ao toque.","Finasterida reduz o PSA pela metade.","Solicitar PSA, EAS, creatinina e USG de vias urinárias; encaminhar ao urologista."],
  "unidade": "# Retenção urinária aguda:\n1) Sondagem vesical de demora + iniciar tansulosina.\n2) Encaminhar ao urologista (tentativa de retirada da sonda em 2–3 dias).",
  "orient": "- A tansulosina pode causar tontura ao se levantar; levante-se devagar.\n- Faça os exames solicitados (PSA, exame de urina, creatinina e ultrassom das vias urinárias) e marque consulta com o urologista.\n- Informe a qualquer médico que pedir o exame de PSA que você usa finasterida, pois ela altera o resultado.",
  "rev": [
   "Corrigido (2026-10-17): critério da finasterida pela AUA (próstata > 30 mL, PSA > 1,5 ng/mL ou aumentada ao toque) e redução do PSA pela metade (bula Proscar); citação da AUA completa, com a emenda de 2023.",
   "Preenchido: seção estava vazia."
  ],
  "fontes": [
   "Lerner LB et al. Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia: AUA Guideline Part I e Part II (J Urol 2021;206:806 e 818; emenda 2023). https://www.auanet.org/guidelines-and-quality/guidelines/benign-prostatic-hyperplasia-(bph)-guideline",
   "Bula Proscar (finasterida 5 mg, Organon, Anvisa): o PSA cai cerca de 50%."
  ]
 },
 {
  "id": "hipertireoidismo",
  "nome": "Hipertireoidismo",
  "cat": "endo",
  "cid": "E05.9",
  "sin": "tireoide graves tireotoxicose",
  "casa": "Uso oral\n1) Tiamazol 5mg (Tapazol) -------------------- 45 cp\nTomar 3 cp (15 mg) VO 1 vez ao dia e retornar em 15 dias para reavaliação.\nOu\n1) Propiltiouracil 100mg (Propil) ------------ 45 cp\nTomar 1 cp VO de 8/8h e retornar em 15 dias para reavaliação.\n2) Propranolol 40mg -------------------------- 45 cp\nTomar 1 cp VO de 8/8h.",
  "avisoRx": ["Antitireoidiano só com TSH suprimido, T4 livre alto e causa provável de Graves ou bócio tóxico.","Tireoidite (dor na tireoide, pós-parto, amiodarona): trata-se só com betabloqueador.","Propiltiouracil se gestante no 1º trimestre.","Propranolol se taquicardia ou tremor; evitar em asma.","Suspensão por risco de agranulocitose e de lesão hepática (sobretudo propiltiouracil).","Solicitar TSH, T4 livre, hemograma e TGO/TGP; encaminhar ao endocrinologista."],
  "unidade": "Crise tireotóxica (febre, agitação ou confusão, taquicardia intensa ou FA, insuficiência cardíaca, vômitos ou icterícia; Burch-Wartofsky ≥ 45): não é caso de alta. Propranolol 40–80 mg VO a cada 4–6 h; propiltiouracil 600 mg VO ou por sonda de ataque e depois 200–250 mg a cada 4 h; hidrocortisona 300 mg EV de ataque e 100 mg EV a cada 8 h; vaga de UTI; iodo só 1 h depois do propiltiouracil.",
  "orient": "- Pare o remédio da tireoide e procure atendimento se tiver febre, dor de garganta ou feridas na boca, ou se a pele ou os olhos ficarem amarelados, a urina ficar escura ou tiver dor na barriga. Esses sinais podem indicar efeito grave do remédio no sangue ou no fígado, principalmente com o propiltiouracil.\n- Faça os exames de sangue solicitados e marque consulta com o endocrinologista.",
  "rev": [
   "Corrigido (2026-10-17): crise tireotóxica com intervalos e manutenção: propranolol a cada 4–6 h; propiltiouracil 200–250 mg de 4/4h após o ataque; hidrocortisona 300 mg de ataque e 100 mg de 8/8h (ATA 2016, tempestade tireoidiana; HC-FMUSP 18ª ed., cap. 90).",
   "Corrigido (2026-10-17): crise tireotóxica fora da receita de casa e com conduta de UTI na unidade; tiamazol 15 mg em dose única diária e só com diagnóstico confirmado; alerta de hepatotoxicidade (ATA 2016; SBEM 2013; HC-FMUSP 18ª ed., cap. 90).",
   "Corrigido (importante): propiltiouracil 5mg não existe; apresentação é 100mg.",
   "Adicionado: indicação do PTU, alerta de agranulocitose e exames."
  ],
  "fontes": [
   "Ross DS et al. 2016 American Thyroid Association Guidelines for Diagnosis and Management of Hyperthyroidism and Other Causes of Thyrotoxicosis (Thyroid 2016;26:1343) — confirmar a causa antes do antitireoidiano; metimazol em dose única diária (10–20 mg se T4 livre 1,5–2 vezes o limite); alerta escrito de agranulocitose e hepatotoxicidade; tempestade tireoidiana: propranolol 60–80 mg a cada 4 h, propiltiouracil 500–1.000 mg de ataque e 250 mg a cada 4 h, hidrocortisona 300 mg de ataque e 100 mg a cada 8 h.",
   "Maia AL et al. Consenso brasileiro para o diagnóstico e tratamento do hipertireoidismo: recomendações do Departamento de Tireoide da SBEM (Arq Bras Endocrinol Metab 2013;57:205).",
   "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024 — cap. 90, Crise tireotóxica (UTI; propiltiouracil 600–1.000 mg de ataque; propranolol 40–80 mg VO; hidrocortisona; iodo 1–3 h após o antitireoidiano).",
   "FDA. Propylthiouracil — bula, alerta em tarja: lesão hepática grave."
  ]
 },
 {
  "id": "hipotireoidismo",
  "nome": "Hipotireoidismo",
  "cat": "endo",
  "cid": "E03.9",
  "sin": "tireoide levotiroxina tsh",
  "casa": "Uso oral\n1) Levotiroxina 50mcg ------------------------ 30 cp\nTomar 1 cp VO em jejum, 30–60 min antes do café da manhã, todos os dias.",
  "avisoRx": ["Iniciar só com TSH alto confirmado (com T4 livre baixo ou TSH ≥ 10).","Idosos ou cardiopatas: começar com 25 mcg (meio comprimido de 50 mcg ou apresentação de 25 mcg).","Repetir TSH em 6–8 semanas para ajuste."],
  "unidade": "",
  "orient": "- Repita o exame de sangue da tireoide (TSH) em 6 a 8 semanas para ajuste da dose.",
  "rev": [
   "Corrigido (2026-10-17): início só com diagnóstico confirmado; 25 mcg com apresentação coerente com a receita; consenso SBEM (ATA 2014; SBEM 2013).",
   "Adicionado: dose inicial em idosos/cardiopatas e controle do TSH."
  ],
  "fontes": [
   "Jonklaas J et al. Guidelines for the Treatment of Hypothyroidism — American Thyroid Association (Thyroid 2014;24:1670) — recomendações 21 e 22: dose inicial e idoso ou coronariopata.",
   "Brenta G et al. Diretrizes clínicas práticas para o manejo do hipotireoidismo — SBEM (Arq Bras Endocrinol Metab 2013;57:265)."
  ]
 },
 {
  "id": "impetigo",
  "nome": "Impetigo",
  "cat": "pele",
  "cid": "L01.0",
  "sin": "crosta melicerica ferida infectada",
  "casa": "Uso tópico\n1) Mupirocina 2% pomada ---------------------- 1 bisnaga\nAplicar nas lesões 3x ao dia, após remover as crostas com água morna e sabão, por 5 a 7 dias.\nOu\n1) Ácido fusídico 2% creme ------------------- 1 bisnaga\nAplicar nas lesões 3x ao dia, após remover as crostas, por 5 dias.\n\nUso oral\n2) Cefalexina 500mg -------------------------- 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\nOu\n2) Clindamicina 300mg ------------------------ 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\n\n3) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor ou febre (no máximo 8 cp por dia).",
  "avisoRx": ["Tópico para lesões localizadas; oral para lesões extensas ou múltiplas.","Clindamicina se alergia a penicilina.","Afastar da escola/creche até 24h após o início do antibiótico."],
  "unidade": "",
  "orient": "- Mantenha as unhas curtas, lave bem as mãos e não compartilhe toalhas.\n- Se for criança, mantenha-a afastada da escola ou da creche até 24 horas após o início do antibiótico.",
  "rev": [
   "Corrigido (2026-10-17): clindamicina 300 mg de 8/8h → 6/6h (IDSA SSTI 2014, tabela 1); antibiótico oral por 5 dias, 20 cp (NICE NG153); neomicina + bacitracina → ácido fusídico 2% 3x ao dia por 5 dias (NICE NG153; Cochrane, Koning 2012); dipirona com no máximo 8 cp por dia (ficha dipirona).",
   "Removido: penicilina benzatina (não cobre S. aureus, principal agente).",
   "Removido: eritromicina em xarope (dose pediátrica, subdosada para adulto).",
   "Adicionado: mupirocina como 1ª linha tópica.",
   "Removido: diclofenaco + paracetamol de rotina."
  ],
  "fontes": [
   "Stevens DL et al. IDSA Practice Guidelines for Skin and Soft Tissue Infections (Clin Infect Dis 2014;59:e10) — impetigo: tabela 1 (clindamicina 300–400 mg 4x ao dia).",
   "National Institute for Health and Care Excellence. NG153 — Impetigo: antimicrobial prescribing, 2020 — tópico (ácido fusídico 2% 3x ao dia) por 5 dias na lesão localizada; oral por 5 dias (até 7) se extenso ou bolhoso. https://www.nice.org.uk/guidance/ng153",
   "Koning S et al. Interventions for impetigo (Cochrane Database Syst Rev 2012;CD003261).",
   "American Academy of Pediatrics. Red Book 2024–2027 — impetigo: volta à escola 24 h após o início do antibiótico."
  ]
 },
 {
  "id": "ivc",
  "nome": "Insuficiência venosa crônica",
  "cat": "cardio",
  "cid": "I87.2",
  "sin": "varizes meia elastica edema pernas",
  "casa": "Uso externo\n1) Meia de compressão elástica — média compressão (20–30 mmHg), 3/4.\n- Calçar pela manhã, antes de levantar da cama.\n- Usar durante todo o dia.\n- Se precisar retirar, elevar as pernas por 15 min antes de calçar de novo.",
  "avisoRx": ["Não usar meia compressiva se doença arterial periférica (checar pulsos)."],
  "unidade": "",
  "orient": "- Eleve as pernas ao descansar e caminhe todos os dias.",
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
  "casa": "Uso oral (14 dias)\n1) Omeprazol 20mg ---------------------------- 56 cp\nTomar 2 cp (40mg) VO de 12/12h, 30 min antes do café e do jantar, por 14 dias.\n2) Subcitrato de bismuto coloidal 240mg (manipulado) --- 28 cáps\nTomar 1 cáps VO de 12/12h por 14 dias.\n3) Tetraciclina 500mg ------------------------- 56 cáps\nTomar 1 cáps VO de 6/6h por 14 dias, com água, longe de leite, antiácido e ferro.\n4) Metronidazol 400mg ------------------------- 56 cp\nTomar 1 cp VO de 6/6h por 14 dias, após as refeições.\n\n# Sem bismuto disponível:\n1) Vonoprazana 20mg (Inzelm) ------------------ 28 cp\nTomar 1 cp VO de 12/12h por 14 dias.\n2) Amoxicilina 500mg -------------------------- 56 cáps\nTomar 2 cáps (1g) VO de 12/12h por 14 dias.\n3) Claritromicina 500mg ----------------------- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias.",
  "avisoRx": ["Esquema sem bismuto não serve para alergia a penicilina: usar o 1º esquema, a quádrupla com bismuto, que não tem amoxicilina.","Controle de cura: teste respiratório com ureia 13C ou antígeno fecal monoclonal (V Consenso 2026, enunciados 17 e 20).","Tetraciclina: não usar na gestação, na amamentação nem em menores de 8 anos.","Parar de fumar aumenta a chance de cura (V Consenso, enunciado 26)."],
  "unidade": "",
  "orient": "- Depois do tratamento, faça o exame de controle de cura (teste do sopro ou exame de fezes), pelo menos 4 semanas após terminar os antibióticos e o bismuto e após 14 dias sem omeprazol ou vonoprazana.\n- O bismuto deixa as fezes escuras, o que é esperado. Volte ao pronto-socorro se tiver fezes pretas com fraqueza ou tontura, ou vômito com sangue.\n- Não tome bebida alcoólica durante o uso do metronidazol e até 3 dias depois.\n- Se estiver grávida, amamentando ou suspeitar de gravidez, não tome a tetraciclina e fale com o médico.\n- Parar de fumar aumenta a chance de cura.",
  "rev": [
   "Atualizado (2026-10-17): esquemas pelo V Consenso Brasileiro 2026; tripla clássica com IBP deixa de ser 1ª linha empírica; quádrupla com bismuto (omeprazol, bismuto, tetraciclina, metronidazol) por 14 dias, que serve também na alergia a penicilina; sem bismuto, vonoprazana + amoxicilina + claritromicina; controle de cura por teste respiratório ou antígeno fecal (V Consenso 2026, enunciados 17, 20, 27, 28 e 32).",
   "Corrigido: duração 7 → 14 dias (IV Consenso Brasileiro de H. pylori).",
   "Corrigido: omeprazol 20 → 40mg 12/12h (IBP em dose dobrada).",
   "Ajustado: quantidades de comprimidos."
  ],
  "fontes": [
   "Coelho LGV et al. V Consenso Brasileiro sobre Infecção por Helicobacter pylori (Arq Gastroenterol 2026;63:e26043). doi 10.1590/S0004-2803.24612026-043: 1ª linha (enunciado 28, tabela 3), alergia a penicilina (enunciado 32, tabela 6), controle de cura (enunciados 17 e 20).",
   "Chey WD et al. ACG Clinical Guideline: Treatment of Helicobacter pylori Infection (Am J Gastroenterol 2024;119:1730).",
   "Malfertheiner P et al. Maastricht VI/Florence Consensus (Gut 2022;71:1724).",
   "Bula da tetraciclina (Anvisa): contraindicada na gestação, na amamentação, em menores de 8 anos e na insuficiência renal; bula do Flagyl (metronidazol: efeito antabuse com álcool)."
  ]
 },
 {
  "id": "itu",
  "nome": "ITU / Cistite / Pielonefrite",
  "cat": "uro",
  "cid": "N39.0",
  "sin": "infeccao urinaria disuria ardor urinar cistite pielonefrite",
  "casa": "# Cistite não complicada (mulher, não gestante):\nUso oral\n1) Nitrofurantoína 100mg --------------------- 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\nOu\n1) Fosfomicina 3g (Monuril) ------------------ 1 envelope\nDissolver em 1 copo de água e tomar à noite, com a bexiga vazia, dose única.\n2) Fenazopiridina 200mg ---------------------- 6 cp\nTomar 1 cp VO de 8/8h por 2 dias (urina fica alaranjada).\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n\n# Gestante:\nUso oral\n1) Cefalexina 500mg --------------------------- 28 cáps\nTomar 1 cáps VO de 6/6h por 7 dias.\nOu\n1) Fosfomicina 3g (Monuril) ------------------ 1 envelope\nDissolver em meio copo de água (50 a 75 mL) e tomar à noite, com a bexiga vazia, dose única.\n\n# Pielonefrite ambulatorial:\n1) Ciprofloxacino 500mg ---------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (máximo 8 cp por dia).",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue; não usar na gestação nem na doença renal.","Gestante: colher urocultura antes; considerar repetir 1 a 2 semanas após o fim.","Nitrofurantoína na gestação: evitar no 1º trimestre se houver alternativa e nunca a partir de 38 semanas.","Gestante com febre ou dor lombar: pielonefrite, internar.","Pielonefrite ambulatorial: só não gestante, após a 1ª dose de ceftriaxona e a urocultura.","Homem com ITU: tratar por 7 dias e considerar prostatite.","CID: cistite N30.0 | pielonefrite N10."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Pielonefrite: Ceftriaxona 1 g IM (reconstituir com o diluente de lidocaína da apresentação IM) ou EV (em 10 mL de AD, lenta, ou em 100 mL de SF em 30 min), 1ª dose na unidade, e seguir com VO. Colher urocultura antes.\n* Internar se: sepse, vômitos, gestante com pielonefrite, obstrução, sem melhora em 48–72h.",
  "orient": "- Beba bastante água e não segure a vontade de urinar.\n- Volte ao pronto-socorro se tiver febre, dor nas costas (na região dos rins) ou vômitos.",
  "rev": [
   "Corrigido (2026-10-17): ibuprofeno só se dengue descartada (MS, Dengue, 2024); gestante com receita própria (cefalexina 28 cáps ou fosfomicina) e urocultura antes (ACOG 2023); pielonefrite \"não gestante\" e dipirona com máximo de 8 cp/dia (IDSA 2025; bula Novalgina); alertas de rim da nitrofurantoína (bula < 60, Beers < 30), da fosfomicina (< 10) e da fenazopiridina (bulas).",
   "Ajustado: ciprofloxacino reservado para pielonefrite (evitar na cistite simples).",
   "Corrigido: ceftriaxona dose única não trata pielonefrite; é 1ª dose seguida de VO por 7 dias.",
   "Ajustado: nitrofurantoína 7 → 5 dias; adicionada conduta para gestante.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Gupta K et al. IDSA/ESCMID Guidelines: Acute Uncomplicated Cystitis and Pyelonephritis in Women (Clin Infect Dis 2011).",
   "Trautner BW et al. IDSA 2025 Guidelines on Management and Treatment of Complicated Urinary Tract Infections (Clin Infect Dis, publicado online em 17/07/2025; doi:10.1093/cid/ciaf462): pielonefrite com fluoroquinolona por 5–7 dias ou outro antibiótico por 7 dias; nitrofurantoína e fosfomicina não servem para pielonefrite. https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/",
   "ACOG Clinical Consensus No. 4: Urinary Tract Infections in Pregnant Individuals (Obstet Gynecol 2023;142:435; PMID 37473414; doi 10.1097/AOG.0000000000005269): cefalexina, fosfomicina ou nitrofurantoína; urocultura; repetir a cultura 1 a 2 semanas após o fim é opcional.",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue.",
   "Bula Novalgina (dipirona 500 mg, Anvisa): máximo 4 g/dia.",
   "Bula Pyridium (fenazopiridina, Anvisa): contraindicada na insuficiência renal; no máximo 2 dias junto com o antibiótico; cautela na deficiência de G6PD."
  ]
 },
 {
  "id": "insonia",
  "nome": "Insônia",
  "cat": "psi",
  "cid": "G47.0",
  "sin": "dificuldade dormir sono",
  "casa": "Orientações para dormir melhor (sem remédio):\n1) Deitar e levantar sempre no mesmo horário, inclusive no fim de semana.\n2) Sem telas 1 h antes de deitar; sem cafeína depois das 16 h; evitar cochilos longos.\n3) Usar a cama só para dormir; se não dormir em cerca de 20 min, levantar e voltar quando tiver sono.\n4) Procurar a UBS se a insônia durar mais de 3 meses (terapia cognitivo-comportamental para insônia).",
  "avisoRx": ["Evitar benzodiazepínico para dormir (dependência, quedas, acidentes); no idoso, não usar.","Insônia há mais de 3 meses: encaminhar à UBS ou ao especialista; 1ª linha é TCC-I, não o remédio."],
  "unidade": "",
  "orient": "- Mantenha horários fixos para dormir e acordar; evite telas 1 hora antes de deitar, cafeína depois das 16 horas e cochilos longos.\n- Se a insônia durar mais de 3 meses, procure a unidade básica de saúde (posto de saúde) ou um especialista; o tratamento principal é a terapia cognitivo-comportamental para insônia, e não o remédio.\n- Evite calmantes para dormir (como clonazepam e diazepam), pois causam dependência, quedas e acidentes, principalmente em idosos. Se já usa um desses remédios, não pare de repente; converse com seu médico para reduzir aos poucos.",
  "rev": [
   "Corrigido (2026-10-17): passiflora retirada (não recomendada pela Associação Brasileira do Sono); sem hipnótico na porta, só higiene do sono e encaminhamento para TCC-I; orientação contra benzodiazepínico (ABS 2023; ACP 2016; Beers 2023).",
   "Adicionado: higiene do sono."
  ],
  "evid": "Passiflora e valeriana: não recomendadas pela Associação Brasileira do Sono (2023). A base do tratamento é a TCC-I.",
  "fontes": [
   "Qaseem A et al. ACP Guideline: Management of Chronic Insomnia (Ann Intern Med 2016) — TCC-I como 1ª linha.",
   "Drager LF et al. 2023 Guidelines on the Diagnosis and Treatment of Insomnia in Adults — Brazilian Sleep Association. Sleep Sci 2023;16(Suppl 2):507–549 (TCC-I multicomponente como padrão-ouro; fitoterápicos, melatonina no adulto e benzodiazepínico não recomendados; zolpidem por até 4 semanas). https://doi.org/10.1055/s-0043-1776281",
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): evitar benzodiazepínico e Z-droga no idoso."
  ]
 },
 {
  "id": "vertigem",
  "nome": "Labirintite / Vertigem",
  "cat": "dor",
  "cid": "R42",
  "sin": "tontura vertigem labirintite vppb",
  "casa": "Uso oral\n1) Dimenidrinato + Piridoxina 50/10mg -------- 12 cp\nTomar 1 cp VO de 6/6h se tontura, náuseas ou vômitos, por até 3 dias. Dá sono: não dirigir.\n\n# Vertigem crônica/recorrente (ex.: Ménière):\n1) Betaistina 16mg --------------------------- 30 cp\nTomar 1 cp VO de 8/8h (reavaliar com otorrino).\n\n# Gestante:\n1) Meclizina 25mg (Meclin) ------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\n\n# Refratário aos anti-histamínicos:\n1) Clonazepam 0,5mg -------------------------- 6 cp\nTomar 1 cp VO de 12/12h por até 3 dias. Pode dar sono: não dirigir.\n\n# Náuseas:\n2) Ondansetrona 4mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h por 3 dias se náuseas ou vômitos.",
  "avisoRx": ["Dimenidrinato: evitar em idosos.","Clonazepam: não usar em idosos nem na vertigem posicional (VPPB).","Supressores vestibulares por no máximo 3 dias (atrasam a compensação).","CID: labirintite H83.0 | VPPB H81.1."],
  "unidade": "1) Dimenidrinato + Piridoxina: ampola EV (10 mL) em 100 mL de SF em 30 min; existe apresentação própria para IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n2) Exame: tontura contínua com nistagmo → HINTS (impulso cefálico, nistagmo, desvio vertical), se treinado; tontura só ao mudar a posição → Dix-Hallpike. Tomografia de crânio não exclui AVC de fossa posterior: HINTS central ou duvidoso → ressonância (ou transferir).\n3) VPPB (Dix-Hallpike positivo): manobra de Epley.",
  "orient": "- Use os remédios para tontura por no máximo 3 dias: o uso prolongado atrasa a recuperação do equilíbrio.\n- Volte imediatamente ao pronto-socorro se tiver dificuldade para andar, fala enrolada, visão dupla, fraqueza ou dor de cabeça súbita.",
  "rev": [
   "Corrigido (2026-10-17): flunarizina retirada (sem fonte; contrariava o máximo de 3 dias de supressor); clonazepam e dimenidrinato com alerta de sono, no idoso e na VPPB; dimenidrinato 1 cx → 12 cp; HINTS só na tontura contínua com nistagmo e por treinado; tomografia não exclui AVC (GRACE-3 2023; AAO-HNS 2017; Beers 2023).",
   "Ajustado: betaistina 8mg → 16mg de 8/8h (dose usual).",
   "Adicionado: HINTS, manobra de Epley e sinais de AVC.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Bhattacharyya N et al. AAO-HNS Clinical Practice Guideline: BPPV (Update) (Otolaryngol Head Neck Surg 2017).",
   "Kattah JC et al. HINTS (Stroke 2009).",
   "Edlow JA et al. Guidelines for reasonable and appropriate care in the emergency department 3 (GRACE-3): Acute dizziness and vertigo in the emergency department. Acad Emerg Med 2023;30(5):442–486 (HINTS só por treinado; sem tomografia; Epley na VPPB; supressor vestibular só por 3–5 dias; considerar corticoide na neurite vestibular com até 3 dias). https://doi.org/10.1111/acem.14728",
   "Basura GJ et al. Clinical Practice Guideline: Ménière's Disease. AAO-HNS. Otolaryngol Head Neck Surg 2020;162(2S):S1–S55 (betaistina como opção de manutenção; supressor só na crise).",
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): evitar anti-histamínico de 1ª geração e benzodiazepínico no idoso."
  ]
 },
 {
  "id": "larva",
  "nome": "Larva migrans cutânea (bicho geográfico)",
  "cat": "pele",
  "cid": "B76.9",
  "sin": "bicho geografico",
  "casa": "Uso oral\n1) Albendazol 400mg -------------------------- 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.\nOu\n1) Ivermectina 6mg --------------------------- conforme peso\nTomar VO em dose única, com água. Dose por peso: 15–24 kg ½ cp; 25–35 kg 1 cp; 36–50 kg 1½ cp; 51–65 kg 2 cp; 66–79 kg 2½ cp; 80 kg ou mais 200 mcg/kg.\n\nUso tópico\n2) Tiabendazol 50mg/g pomada (Foldan) -------- 1 bisnaga\nAplicar nas lesões, friccionando sobre os trajetos, 3x ao dia por 5 dias.",
  "avisoRx": ["Ivermectina: não usar abaixo de 15 kg ou de 5 anos, nem na gestação.","Gestante e criança < 2 anos ou < 15 kg: preferir tratamento só tópico (tiabendazol)."],
  "unidade": "",
  "orient": "- Evite andar descalço em areia ou terra.",
  "rev": [
   "Corrigido (2026-10-17): ivermectina pela tabela de peso da bula (½ cp de 15–24 kg a 2½ cp de 66–79 kg; 200 mcg/kg a partir de 80 kg), sem uso abaixo de 15 kg ou de 5 anos nem na gestação (bula Revectina); gestante e criança < 2 anos ou < 15 kg só com tópico (CDC).",
   "Adicionado: ivermectina como alternativa."
  ],
  "fontes": [
   "Caumes E. Treatment of cutaneous larva migrans (Clin Infect Dis 2000).",
   "Centers for Disease Control and Prevention. Clinical Care of Zoonotic Hookworm (larva migrans cutânea): albendazol 400 mg/dia por 3–7 dias ou ivermectina 200 mcg/kg dose única; crianças < 2 anos ou < 15 kg, só tópico. https://www.cdc.gov/zoonotic-hookworm/hcp/clinical-care/index.html",
   "Bula Revectina (ivermectina 6 mg), Abbott, registrada na Anvisa — tabela de dose por peso; contraindicada abaixo de 15 kg ou 5 anos.",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 238 — Trichinellosis and Other Tissue Nematode Infections (larva migrans cutânea)."
  ]
 },
 {
  "id": "nauseas",
  "nome": "Náuseas e vômitos",
  "cat": "gi",
  "cid": "R11",
  "sin": "enjoo vomito",
  "casa": "Uso oral\n1) Dimenidrinato + Piridoxina 50/10mg (Dramin B6) --- 10 cp\nTomar 1 cp VO de 8/8h por até 3 dias, se enjoo.\nOu\n1) Ondansetrona 8mg (Vonau Flash) ------------ 10 cp\nDissolver 1 cp na língua de 8/8h por até 3 dias, se enjoo.",
  "avisoRx": ["Procurar a causa: gravidez (teste na mulher em idade fértil), obstrução ou abdome agudo, cetoacidose, infarto (náusea com desconforto torácico).","Também: causa neurológica (cefaleia, alteração visual, déficit focal), labirintopatia e medicamentos (Harrison, 22ª ed., cap. 48).","Desidratação que não se corrige por via oral: hidratar EV e observar (Harrison, cap. 48).","Metoclopramida: no máximo 5 dias (EMA 2013); no idoso, evitar fora da gastroparesia (discinesia tardia).","Ondansetrona: cautela com QT longo (Harrison, 22ª ed., cap. 48)."],
  "unidade": "1) Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).",
  "orient": "- Tome líquidos em pequenos goles, várias vezes ao dia.\n- Volte imediatamente ao pronto-socorro se vomitar sangue ou material escuro como borra de café, tiver vômito verde, dor forte na barriga, dor de cabeça súbita, rigidez no pescoço, confusão ou sinais de desidratação (muita sede, boca seca, pouca urina).\n- Procure atendimento se os vômitos durarem mais de 2 dias.",
  "rev": [
   "Corrigido (2026-10-09): fonte \"Consenso clínico\" trocada por Harrison 22ª ed. cap. 48, Cochrane 2015 e bulas; adicionados causa a procurar e sinais de retorno.",
   "Ajustado: Dramin B6 7 → 3 dias, se necessário.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Nenhum antiemético se mostrou superior a outro, nem claramente ao placebo, no adulto no pronto-socorro (Cochrane 2015); escolher pelo perfil de efeitos adversos. Ondansetrona oral fora da quimioterapia e do pós-operatório é uso fora da bula.",
  "fontes": [
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 48 — Nausea, Vomiting, and Indigestion: causas, abordagem, hidratação e escolha do antiemético por indicação; metoclopramida e discinesia tardia; antagonistas 5-HT3 e QTc.",
   "Furyk JS et al. Drugs for the treatment of nausea and vomiting in adults in the emergency department setting (Cochrane Database Syst Rev 2015;(9):CD010106). doi 10.1002/14651858.CD010106.pub2.",
   "Bulas Anvisa: Dramin B6 (dimenidrinato + piridoxina, Takeda), ondansetrona orodispersível e Plasil injetável (metoclopramida); EMA 2013, metoclopramida (até 10 mg 3x/dia, no máximo 5 dias).",
   "NHS. Diarrhoea and vomiting: sinais para pronto-socorro e vômito por mais de 2 dias. https://www.nhs.uk/conditions/diarrhoea-and-vomiting/"
  ]
 },
 {
  "id": "otite-externa",
  "nome": "Otite externa",
  "cat": "orl",
  "cid": "H60.9",
  "sin": "dor ouvido piscina",
  "casa": "Uso otológico\n1) Polimixina B + Neomicina + Hidrocortisona (Otosporin) --- 1 fr\nPingar 3 gotas no ouvido afetado de 8/8h por 7 dias.\nOu\n1) Ciprofloxacino + Hidrocortisona (Otociriax) ------------- 1 fr\nPingar 3 gotas no ouvido afetado de 12/12h por 7 dias.\nOu (perfuração suspeita ou confirmada, ou tubo de ventilação)\n1) Ciprofloxacino 5 mg/mL otológico (Otofoxin) ------------- 1 fr\nPingar 3 gotas no ouvido afetado de 8/8h por 7 dias.\n\nUso oral\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.",
  "avisoRx": ["Perfuração suspeita ou confirmada, ou tubo de ventilação: só ciprofloxacino sem corticoide (Otofoxin); sem neomicina nem associações com corticoide.","Antibiótico oral só se celulite ao redor, diabetes/imunossupressão ou otite externa maligna."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de soro fisiológico 0,9% ou água destilada.\n2) Se conduto muito edemaciado e a gota não entra: limpeza do conduto (aspiração) e, se preciso, mecha (pavio) para levar a gota.",
  "orient": "- Não molhe o ouvido durante o tratamento; no banho, proteja-o com algodão com vaselina.",
  "rev": [
   "Corrigido (2026-10-17): nomes comerciais corrigidos (Otomixyn tem neomicina; Ciprodex sai) → Otosporin, Otociriax ou, se perfuração ou tubo, Otofoxin, cada um com a posologia da bula; dexametasona IM removida (sem fonte); limpeza do conduto e mecha (bulas; AAO-HNS 2014, KAS 3–6).",
   "Removido: cefalexina oral de rotina (otite externa não complicada se trata só com tópico).",
   "Adicionado: opção com quinolona tópica e alerta de perfuração.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Rosenfeld RM et al. AAO-HNS Clinical Practice Guideline: Acute Otitis Externa (Otolaryngol Head Neck Surg 2014;150(1 Suppl):S1): analgesia; gotas tópicas sem antibiótico oral; limpeza e mecha; perfuração ou tubo: gota não ototóxica; reavaliar em 48–72 h. https://doi.org/10.1177/0194599813517083",
   "Bulas Otosporin (3 gotas 3–4x/dia por 7–10 dias), Otociriax (3 gotas 2x/dia por 7 dias) e Otofoxin (3–5 gotas 3x/dia por 7 dias); Otosporin e Otociriax contraindicados com perfuração timpânica."
  ]
 },
 {
  "id": "oma",
  "nome": "Otite média aguda (adulto)",
  "cat": "orl",
  "cid": "H66.9",
  "sin": "dor ouvido otite media",
  "casa": "Uso oral\n1) Amoxicilina 875mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu\n1) Amoxicilina 500mg ------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\nOu (uso de amoxicilina nos últimos 30 dias ou falha)\n1) Amoxicilina + Clavulanato 875/125mg ------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu (alergia a penicilina)\n1) Azitromicina 500mg ------------------------ 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de soro fisiológico 0,9% ou água destilada.",
  "orient": "- Volte para reavaliação se a febre continuar depois de 48 a 72 horas, ou se surgir dor atrás da orelha ou saída de secreção pelo ouvido.",
  "rev": [
   "Corrigido (2026-10-17): antibiótico 10 → 5 dias no adulto; dexametasona IM removida (sem fonte; corticoide sistêmico sem benefício) (NICE NG91; AAP 2013, KAS 2 e 4).",
   "Adicionado: amoxicilina-clavulanato e opção para alérgicos.",
   "Adicionado: amoxicilina 875 mg de 12/12h (posologia aprovada em bula).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Sem diretriz específica para adultos; dose e duração extrapoladas da AAP 2013 (≥ 6 anos) e do NICE NG91 (5–7 dias).",
  "fontes": [
   "Lieberthal AS et al. AAP: The Diagnosis and Management of Acute Otitis Media (Pediatrics 2013) — extrapolado para adultos.",
   "NICE NG91. Otitis media (acute): antimicrobial prescribing, 2018 (atualizada 2022), seção 1.1 e tabela de escolha do antibiótico: amoxicilina por 5–7 dias; macrolídeo se alergia; antibiótico imediato ou de reserva conforme gravidade (escrito para menores de 18 anos; extrapolado). https://www.nice.org.uk/guidance/ng91"
  ]
 },
 {
  "id": "onicomicose",
  "nome": "Onicomicose",
  "cat": "pele",
  "cid": "B35.1",
  "sin": "micose unha",
  "casa": "Uso oral (pulsoterapia)\n1) Itraconazol 100mg ------------------------- 28 cp por ciclo\nTomar 2 cp VO de 12/12h, após as refeições, por 7 dias. Repetir 1 semana por mês:\n2 ciclos (unhas das mãos) ou 3 ciclos (unhas dos pés).",
  "avisoRx": ["Confirmar com exame micológico antes de tratar.","Itraconazol: contraindicado em insuficiência cardíaca; checar interações (estatinas etc.) e TGO/TGP."],
  "unidade": "",
  "orient": "- Antes de começar o itraconazol, fale com o médico se tiver insuficiência cardíaca (coração fraco) ou se usar remédio para colesterol (como sinvastatina) ou outros remédios de uso contínuo.\n- Pare o remédio e procure atendimento se tiver enjoo persistente, cansaço intenso, pele ou olhos amarelados ou urina escura.",
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
  "avisoRx": ["Encaminhar ao SAE/CTA para seguimento (testagem em 30 e 90 dias)."],
  "unidade": "1) Iniciar o mais rápido possível (idealmente em até 2h; no máximo 72h).\n2) Testes rápidos: HIV (fonte e exposto), sífilis, hepatites B e C; beta-hCG se mulher em idade fértil.\n3) Avaliar vacina e imunoglobulina para hepatite B.\n4) Violência sexual: notificar e acionar a rede de proteção; contracepção de emergência (levonorgestrel 1,5 mg VO dose única, até 5 dias); profilaxia de IST no adulto e no adolescente com 45 kg ou mais (PCDT PEP 2024): penicilina benzatina 2,4 milhões de unidades IM (1,2 milhão em cada glúteo; nunca EV) + ceftriaxona 500 mg IM + azitromicina 1 g VO, dose única; metronidazol 2 g VO dose única, adiado se usar contracepção de emergência ou antirretroviral e nunca no 1º trimestre da gestação.\n5) Não indicar PEP se: exposição sem risco (material ou tipo de exposição não infectante), mais de 72 h, pessoa-fonte com teste rápido não reagente (sem exposição de risco nos últimos 30 dias) ou exposto com teste reagente (encaminhar para tratamento).\n6) Contraindicação ao tenofovir (ex.: doença renal com filtração glomerular < 50 mL/min): trocar tenofovir + lamivudina por zidovudina + lamivudina 300/150 mg, 1 cp VO de 12/12h, mantendo o dolutegravir, por 28 dias.",
  "orient": "- Procure o Serviço de Atendimento Especializado (SAE) ou o Centro de Testagem e Aconselhamento (CTA) para acompanhamento e para repetir os testes em 30 e 90 dias.\n- Use preservativo em todas as relações sexuais durante o acompanhamento.",
  "rev": [
   "Corrigido (2026-10-17): quando não indicar a PEP; zidovudina + lamivudina se não puder usar tenofovir; doses da contracepção de emergência e da profilaxia de IST na violência sexual, com penicilina benzatina e metronidazol adiado; fonte com ano e portaria (PCDT PEP 2024, Quadros 6, 7 e 17; PCDT IST 2022).",
   "Removido: dipirona IM (sem relação com PEP).",
   "Adicionado: janela de início, testes basais, hepatite B e violência sexual."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Profilaxia Pós-Exposição (PEP) de Risco à Infecção pelo HIV, IST e Hepatites Virais, 2024 (Portaria SECTICS/MS nº 14, de 8/4/2024) — esquema preferencial TDF/3TC + DTG por 28 dias, Quadros 6 e 7 (zidovudina + lamivudina se não puder usar tenofovir; risco renal com filtração < 50 mL/min), prazo de 72 h, testagem, profilaxia de IST na violência sexual e Quadro 17 (levonorgestrel 1,5 mg até 5 dias).",
   "Ministério da Saúde. PCDT para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022 (profilaxia de IST na violência sexual)."
  ]
 },
 {
  "id": "picada",
  "nome": "Picada de inseto com reação local",
  "cat": "pele",
  "cid": "T63.4",
  "sin": "picada abelha mosquito formiga",
  "casa": "Uso oral\n1) Loratadina 10mg --------------------------- 5 cp\nTomar 1 cp VO 1x ao dia por 5 dias.\n2) Prednisona 20mg --------------------------- 6 cp\nTomar 2 cp VO pela manhã por 3 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).",
  "avisoRx": ["Prednisona só se reação local extensa: inchaço maior que 10 cm ou que pega articulação."],
  "unidade": "1) Retirar o ferrão, se houver (raspar com a borda de um cartão); compressa fria.\n2) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de soro fisiológico ou água destilada, se dor.\n3) Loratadina 10mg VO, se coceira ou edema.\n* Sinais de anafilaxia → protocolo de anafilaxia (adrenalina IM).",
  "orient": "- Faça compressa fria no local.\n- Volte imediatamente ao pronto-socorro se tiver falta de ar, inchaço no rosto ou tontura.",
  "rev": [
   "Corrigido (2026-10-17): hidrocortisona IM/EV de rotina sai (sem fonte na reação local) → retirar o ferrão, compressa fria, dipirona e loratadina; prednisona só na reação local extensa; dexclorfeniramina → loratadina 10 mg 1x ao dia (Golden 2016; WAO 2020; Beers 2023); dipirona com no máximo 8 cp por dia (ficha dipirona).",
   "Corrigido: dexclorfeniramina 0,5mg → 2mg (comprimido disponível e dose usual).",
   "Ajustado: prednisona 20 → 40mg/dia.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Practice parameter AAAAI/ACAAI 2016 (poucos ensaios; baseado em opinião de especialistas).",
  "fontes": [
   "Golden DBK et al. Stinging insect hypersensitivity: a practice parameter update 2016 (Ann Allergy Asthma Immunol 2017;118:28) — reação local e reação local extensa.",
   "Sturm GJ et al. EAACI guidelines on allergen immunotherapy: Hymenoptera venom allergy (Allergy 2018;73:744) — reação local extensa: corticoide oral curto.",
   "Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020;13:100472).",
   "Bula Claritin (loratadina 10 mg), registrada na Anvisa; American Geriatrics Society. Beers Criteria, 2023.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 11 — Anafilaxia e outras alergias."
  ]
 },
 {
  "id": "pac",
  "nome": "Pneumonia adquirida na comunidade (PAC)",
  "cat": "resp",
  "cid": "J18.9",
  "sin": "pneumonia pac infeccao pulmao",
  "casa": "# PAC de baixo risco (CRB-65 0 ou CURB-65 0–1; com 1 ou mais, considerar avaliação hospitalar), sem comorbidades:\nUso oral\n1) Amoxicilina 500mg ------------------------- 30 cp\nTomar 2 cp (1 g) VO de 8/8h por 5 dias.\nOu\n1) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg VO no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia.\n\n# PAC com comorbidades (DPOC, DM, IC, DRC, etilismo) ou ATB nos últimos 3 meses:\n1) Amoxicilina + Clavulanato 875/125mg ------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\n2) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg VO no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia.\nOu (monoterapia)\n1) Levofloxacino 750mg ----------------------- 5 cp\nTomar 1 cp VO 1x ao dia por 5 dias.\n\nSintomáticos\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "avisoRx": ["Na PAC a ATS/IDSA usa amoxicilina 1 g de 8/8h; não há esquema de 12/12h com amoxicilina isolada nessa diretriz.","Azitromicina em monoterapia só se resistência local a macrolídeo < 25%."],
  "unidade": "1) Gravidade (bloco no topo, calculado com a idade e os sinais vitais): confusão mental nova, FR ≥ 30, PAS < 90 ou PAD ≤ 60, idade ≥ 65; com ureia > 50 mg/dL, CURB-65.\n   CRB-65 0: baixo risco, tratamento em casa | CRB-65 1–2: risco intermediário, observação ou internação por julgamento clínico | CRB-65 3–4: alto risco, internação urgente e avaliar UTI.\n   CURB-65 0–1: baixo risco, tratamento em casa | CURB-65 2: risco intermediário, observação ou internação curta | CURB-65 3–5: alto risco, internar e avaliar UTI.\n   SpO2 < 92% em ar ambiente, comorbidade descompensada ou falta de apoio em casa também pesam para ficar.\n2) RX de tórax; SpO2; NEWS2 (aviso automático dos sinais vitais).\n3) Se internar: 1ª dose EV na unidade:\n   Ceftriaxona 1 g EV 1x ao dia (até 2 g) + Azitromicina 500 mg EV 1x ao dia (ou Claritromicina 500 mg EV de 12/12h).\n   Alergia grave a betalactâmico: Levofloxacino 750 mg EV 1x ao dia.\n4) Se for para casa: 1ª dose do antibiótico oral na unidade.",
  "orient": "- Volte para reavaliação em 48 a 72 horas.\n- Volte imediatamente ao pronto-socorro se tiver falta de ar, confusão ou se a febre continuar depois de 72 horas.",
  "rev": [
   "Adicionado (2026-10-17): bloco de gravidade com CRB-65 calculado (sem ureia), texto único por faixa (NICE NG250 2025; BTS 2009; SBPT 2018), regra de saturação e 1ª dose EV para quem fica (ceftriaxona + azitromicina ou claritromicina; alergia: levofloxacino; ATS/IDSA 2019).",
   "Corrigido (2026-10-17): amoxicilina e amoxicilina-clavulanato 7 → 5 dias (ATS 2025: 3–5 dias se estável; NICE NG250; HC-FMUSP 18ª ed.: 5–7 dias).",
   "Removido: prednisona (corticoide não é indicado na PAC não grave).",
   "Removido: ambroxol de rotina (sem benefício em desfecho).",
   "Reestruturado: 4 prescrições → esquemas por perfil de risco (SBPT/ATS-IDSA).",
   "Ajustado: azitromicina no esquema da ATS/IDSA 2019 (500 mg no 1º dia + 250 mg do 2º ao 5º); levofloxacino 7 → 5 dias.",
   "Adicionado: CURB-65.",
   "Corrigido: amoxicilina na PAC é 1 g de 8/8h (ATS/IDSA 2019), não 500 mg."
  ],
  "fontes": [
   "Metlay JP et al. Diagnosis and Treatment of Adults with CAP — ATS/IDSA (Am J Respir Crit Care Med 2019).",
   "Corrêa RA et al. Recomendações da SBPT para PAC em adultos imunocompetentes, 2018 (J Bras Pneumol 2018;44(5):405–423).",
   "Jones BE et al. Diagnosis and Management of Community-acquired Pneumonia: An Official ATS Clinical Practice Guideline (Am J Respir Crit Care Med 2026;212:24–44; publicado em jul/2025): ambulatorial e internado não grave estáveis, 3–5 dias de antibiótico; corticoide só na PAC grave. https://doi.org/10.1164/rccm.202507-1692ST",
   "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024 — cap. Pneumonia adquirida na comunidade (5–7 dias no ambulatório; quinolona no ambulatório pode mascarar tuberculose).",
   "NICE NG250. Pneumonia: diagnosis and management, 2025 — box 1 e rec. 1.2.3 (CRB-65), box 2 e rec. 1.2.9 (CURB-65). https://www.nice.org.uk/guidance/ng250",
   "British Thoracic Society. Guidelines for the management of community acquired pneumonia in adults, update 2009 (Thorax 2009;64 Suppl 3:iii1) — rec. 44–46 (CRB-65).",
   "Royal College of Physicians. National Early Warning Score (NEWS) 2, 2017 — SpO2 ≤ 91% em ar ambiente soma 3 pontos (resposta urgente)."
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
  "orient": "- Hidrate a pele todos os dias.\n- Procure um dermatologista para acompanhamento.",
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
  "casa": "Uso tópico\n1) Hidratante com aloe vera / loção de calamina --- 1 fr\nAplicar nas áreas afetadas 3x ao dia.\n2) Hidrocortisona 1% creme ------------------- 1 bisnaga\nAplicar fina camada nas áreas mais doloridas, sem bolha aberta, 2x ao dia por até 3 dias.\n\nUso oral\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h por 3 dias.",
  "avisoRx": ["Bolhas extensas: seguir a conduta \"Queimaduras\".","Ibuprofeno só depois de descartar dengue, em quem tem febre."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de soro fisiológico ou água destilada.",
  "orient": "- Não fure as bolhas.\n- Faça compressas frias nas áreas queimadas.\n- Beba bastante água.\n- Evite o sol e use protetor solar.",
  "rev": [
   "Corrigido (2026-10-17): sulfadiazina de prata → hidrocortisona 1% nas áreas sem bolha aberta, por até 3 dias, e bolhas extensas na conduta \"Queimaduras\" (AAD, How to treat sunburn); ibuprofeno só se dengue descartada em quem tem febre (MS, Dengue, 6ª ed., 2024); fontes AAD e Harrison no lugar de \"consenso clínico\".",
   "Ajustado: sulfadiazina reservada para áreas com bolhas; hidratante na pele íntegra.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Recomendações da AAD e do Harrison (tratamento sintomático; poucos ensaios).",
  "fontes": [
   "American Academy of Dermatology. How to treat sunburn: banho ou compressa fria, hidratante com aloe vera, hidrocortisona 1% se desconforto, AINE oral, hidratação, não furar bolhas. https://www.aad.org/public/everyday-care/injured-skin/burns/treat-sunburn",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 64 — Photosensitivity and Other Reactions to Sunlight.",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue)."
  ]
 },
 {
  "id": "prostatite",
  "nome": "Prostatite bacteriana aguda",
  "cat": "uro",
  "cid": "N41.0",
  "sin": "prostata dor perineal",
  "casa": "Uso oral\n1) Ciprofloxacino 500mg ---------------------- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias; reavaliar com a urocultura e manter até 28 dias se ainda houver sintomas.\nOu\n1) Sulfametoxazol + Trimetoprima 800/160mg --- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias; reavaliar com a urocultura e manter até 28 dias se ainda houver sintomas.\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\n\n# Homem < 35 anos com relação sexual sem preservativo (gonococo e clamídia):\n1) Ceftriaxona 500mg IM ----------------------- dose única na unidade\n2) Doxiciclina 100mg ------------------------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue; não usar na doença renal.","Gonococo/clamídia: tratar a parceria (ver conduta IST).","Colher urocultura antes do antibiótico. Não fazer toque prostático vigoroso (risco de bacteremia).","Internar se febre alta, sepse ou retenção urinária."],
  "unidade": "1) Colher urocultura (e hemocultura se febre alta) antes do antibiótico. Toque retal só suave; não massagear a próstata.\n2) 1ª dose na unidade: ciprofloxacino 500 mg VO, ou ceftriaxona 1 g IM ou EV (em 10 mL de AD, lenta, ou em 100 mL de SF em 30 min) se vômitos ou doença mais grave.\n3) Internar se sepse, retenção urinária, vômitos que impedem a via oral ou sem melhora em 48 h (suspeitar de abscesso: USG transretal ou TC). Retenção: aliviar a obstrução (cistostomia ou sonda uretral fina; a melhor via não está definida).",
  "orient": "- Volte imediatamente ao pronto-socorro se tiver febre alta, calafrios, piora do estado geral ou não conseguir urinar.\n- Se o médico indicou tratamento para infecção sexualmente transmissível, sua parceria sexual também precisa ser avaliada e tratada; não tenha relações sexuais até o fim do tratamento de ambos e use preservativo.",
  "rev": [
   "Corrigido (2026-10-17): antibiótico por 14 dias, estendendo até 28 se ainda houver sintomas (decisão do médico; AFP 2016; IDSA 2025; Harrison 22ª ed., cap. 140); ibuprofeno só se dengue descartada (MS, Dengue, 2024); unidade preenchida com culturas, 1ª dose e critérios de internação (AFP 2016); esquema para homem < 35 anos com risco de IST: ceftriaxona 500 mg IM + doxiciclina por 10 dias (PCDT IST 2022; AFP 2016).",
   "Adicionado: SMX-TMP como alternativa e cuidados."
  ],
  "fontes": [
   "EAU Guidelines on Urological Infections, 2024.",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 140: prostatite aguda com fluoroquinolona ou SMX-TMP por 2 a 4 semanas, após urocultura e hemocultura.",
   "Trautner BW et al. IDSA 2025 Guidelines on Management and Treatment of Complicated Urinary Tract Infections (Clin Infect Dis, publicado online em 17/07/2025; doi:10.1093/cid/ciaf462): suspeita de prostatite, 10–14 dias.",
   "Coker TJ, Dierfeldt DM. Acute Bacterial Prostatitis: Diagnosis and Management (Am Fam Physician 2016;93:114): 10 a 14 dias nos casos leves, estendendo 2 semanas se ainda houver sintomas, e 4 semanas nos graves; internação se falha ambulatorial, sem via oral, sepse ou retenção; retenção aliviada por cistostomia ou sonda uretral (melhor via não definida); homem < 35 anos sexualmente ativo: cobrir gonococo e clamídia (cefalosporina + doxiciclina 100 mg de 12/12h por 10 dias). https://www.aafp.org/pubs/afp/issues/2016/0115/p114.html",
   "Ministério da Saúde. PCDT Atenção Integral às Pessoas com IST, 2022: gonorreia com ceftriaxona 500 mg IM em dose única.",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue."
  ]
 },
 {
  "id": "rinite",
  "nome": "Rinite alérgica",
  "cat": "orl",
  "cid": "J30.4",
  "sin": "alergia nariz espirro coriza",
  "casa": "Uso nasal\n1) Budesonida 64mcg spray nasal -------------- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia (pela manhã), uso contínuo por pelo menos 30 dias.\n2) Soro fisiológico 0,9% --------------------- 1 fr\nLavar as narinas com 5–10 mL em cada lado 3x ao dia.\n\nUso oral\n3) Loratadina 10mg --------------------------- 10 cp\nTomar 1 cp VO 1x ao dia por 10 dias.",
  "unidade": "1) Sem medicação injetável na rinite alérgica. Se sintomas intensos: Loratadina 10mg VO e primeira aplicação do corticoide nasal ainda na unidade.",
  "orient": "- Evite poeira, mofo e pelos de animais; troque a roupa de cama toda semana.",
  "rev": [
   "Corrigido (2026-10-17): prometazina IM removida (sem indicação na rinite alérgica; tarja FDA, ISMP, Beers) → loratadina VO e 1ª aplicação do corticoide nasal na unidade; fontes atualizadas (ARIA-EAACI 2024–2025; Sakano 2018).",
   "Adicionado: corticoide nasal (1ª linha no tratamento).",
   "Trocado: dexclorfeniramina IM → prometazina IM (apresentação disponível).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Sousa-Pinto B et al. Allergic Rhinitis and its Impact on Asthma (ARIA)-EAACI Guidelines 2024–2025 Revision, Part I (tratamentos intranasais: corticoide nasal; corticoide + azelastina) e Part II (anti-histamínico oral de 2ª geração) (Allergy 2025).",
   "Sakano E et al. IV Consenso Brasileiro sobre Rinites (Braz J Otorhinolaryngol 2018;84:3): corticoide nasal como base; anti-H1 de 2ª geração; controle ambiental; lavagem nasal. https://doi.org/10.1016/j.bjorl.2017.10.006",
   "Bula Budecort Aqua (budesonida 64 mcg/jato): 2 jatos em cada narina 1x ao dia pela manhã, máx. 256 mcg/dia."
  ]
 },
 {
  "id": "sua",
  "nome": "Sangramento uterino anormal intenso",
  "cat": "gu",
  "cid": "N93.9",
  "sin": "menorragia hemorragia uterina sangramento vaginal",
  "casa": "Uso oral\n1) Ácido tranexâmico 250mg ------------------- 60 cp\nTomar 4 cp (1g) VO de 8/8h por até 5 dias.\n2) Ácido mefenâmico 500mg -------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.",
  "avisoRx": ["Encaminhar ao ginecologista (USG transvaginal).","Ácido tranexâmico: não usar se trombose atual ou prévia (TVP, TEP, AVC); cautela com anticoncepcional hormonal combinado."],
  "unidade": "1) Beta-hCG antes de tudo.\n2) Hemograma; avaliar sinais de instabilidade.\n3) Instável: 2 acessos calibrosos, soro fisiológico 0,9%, ácido tranexâmico 1 g EV lenta (em 10 min), avaliação ginecológica de urgência; transfundir se anemia grave. Não tamponar a vagina de rotina.\n   (A ACOG usa 10 mg/kg EV, máx. 600 mg por dose; o painel segue o HC-FMUSP, até 1 g EV.)",
  "orient": "- Procure um ginecologista para continuar a investigação, com ultrassom transvaginal.\n- Volte ao pronto-socorro se o sangramento encher mais de 1 absorvente por hora, ou se tiver tontura ou desmaio.\n- Não use o ácido tranexâmico se tem ou já teve trombose, embolia pulmonar ou derrame (AVC).",
  "rev": [
   "Corrigido (2026-10-17): nota da ACOG fora da receita; contraindicação do ácido tranexâmico; ácido tranexâmico EV 1 g em 10 min (HC-FMUSP), com a dose da ACOG (10 mg/kg, máx. 600 mg) citada; fonte HC-FMUSP cap. 111 (ACOG CO 557; HC-FMUSP 18ª ed., cap. 111; bula FDA do Lysteda).",
   "Corrigido: ácido tranexâmico 500mg → 1g de 8/8h.",
   "Adicionado: beta-hCG e conduta na instabilidade."
  ],
  "fontes": [
   "ACOG Committee Opinion 557: Management of Acute Abnormal Uterine Bleeding in Nonpregnant Reproductive-Aged Women (Obstet Gynecol 2013;121:891; reafirmado em 2019) — ácido tranexâmico 1,3 g VO ou 10 mg/kg EV (máx. 600 mg) 3x/dia por 5 dias; opções hormonais.",
   "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024 — cap. 111, Emergências ginecológicas: sangramento vaginal (ácido tranexâmico 500–1.000 mg VO ou EV de 6/6 a 8/8h, máx. 3,9 g/dia, com AINE; reposição, transfusão e contra o tamponamento de rotina); no trauma, 1 g EV em 10 min.",
   "FDA. Lysteda (ácido tranexâmico) — bula: contraindicado em doença tromboembólica ativa ou história de trombose; risco somado com contraceptivo hormonal combinado."
  ]
 },
 {
  "id": "sifilis",
  "nome": "Sífilis",
  "cat": "gu",
  "cid": "A53.9",
  "sin": "cancro lues vdrl treponema",
  "casa": "",
  "avisoRx": ["Tratar já com 1 teste reagente (rápido ou VDRL) se gestante, violência sexual, risco de não voltar, sífilis primária/secundária ou sem diagnóstico prévio.","Com 1 teste reagente: colher o segundo teste e seguir.","Esquema de 3 semanas: reiniciar se o intervalo passar de 14 dias (gestante: de 9 dias).","Parcerias de 90 dias: penicilina benzatina 2.400.000 unidades IM dose única, mesmo com teste negativo; se reagente, tratar conforme o estágio.","Notificação compulsória.","Gestante: só penicilina é considerada tratamento adequado."],
  "unidade": "# Sífilis recente (primária, secundária, latente < 1 ano):\nPenicilina G benzatina 2.400.000 unidades IM, dose única (1.200.000 unidades em cada glúteo).\n\n# Sífilis tardia (latente > 1 ano, duração ignorada ou terciária):\nPenicilina G benzatina 2.400.000 unidades IM, 1x por semana por 3 semanas (total 7.200.000 unidades).\n\n# Alergia grave a penicilina (não gestante):\nDoxiciclina 100 mg VO de 12/12h por 15 dias (recente) ou 30 dias (tardia). Gestante: só penicilina (dessensibilização em hospital).\n\n# Neurossífilis, sífilis ocular ou otossífilis: internar. Penicilina cristalina 18–24 milhões de unidades por dia EV (3–4 milhões de 4/4h) por 14 dias; alternativa: ceftriaxona 2 g EV 1x/dia por 10–14 dias.",
  "orient": "- Nas primeiras 24 horas depois da injeção, você pode ter febre, mal-estar e piora das manchas na pele. Isso passa sozinho e não é alergia; se precisar, use paracetamol.\n- Se o seu tratamento for de 3 semanas, as injeções são feitas a cada 7 dias; não atrase as doses.\n- As pessoas com quem você teve relação sexual nos últimos 90 dias precisam ser testadas e tratadas, mesmo que o teste delas dê negativo.\n- Faça o exame de sangue de controle (VDRL) a cada 3 meses durante 1 ano (aos 3, 6, 9 e 12 meses); na gestação, todo mês.",
  "rev": [
   "Corrigido (2026-10-17): alternativa com doxiciclina, dose da neurossífilis, intervalo entre doses (NT 14/2023), Jarisch-Herxheimer, parcerias dos últimos 90 dias, seguimento até 12 meses, \"UI\" → \"unidades\" e link do PCDT 2022 (PCDT IST 2022, cap. 5 e quadro 40; NT 14/2023; CDC 2021).",
   "Adicionado: esquema da sífilis tardia, seguimento e notificação."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 — cap. 5, sífilis adquirida: tratamento imediato após 1 teste reagente, quadro 40 (penicilina benzatina; doxiciclina 15 ou 30 dias; neurossífilis), Jarisch-Herxheimer, monitoramento e parcerias. https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf",
   "Ministério da Saúde. Nota Técnica nº 14/2023-CGIST/DATHI/SVSA/MS — sífilis na gestante: intervalo entre as doses de penicilina benzatina de até 9 dias.",
   "Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — neurossífilis, sífilis ocular e otossífilis."
  ]
 },
 {
  "id": "agitacao",
  "nome": "Agitação psicomotora",
  "cat": "psi",
  "cid": "R45.1",
  "sin": "agitado agressivo surto contencao",
  "casa": "",
  "avisoRx": ["Idoso: presumir delirium e tratar a causa.","Idoso, se precisar sedar: haloperidol 1–2,5 mg IM (máx. 5 mg/dia), sem prometazina e sem benzodiazepínico.","Monitorar SatO2 e sinais vitais após a sedação."],
  "unidade": "1) Abordagem verbal e ambiente seguro. Descartar hipoglicemia, hipóxia, intoxicação.\n2) Haloperidol 5 mg (1 amp) IM + Prometazina 50 mg (1 amp) IM (ambos somente IM)\n   Ou Midazolam 15mg IM (3 mL de 5 mg/mL; cuidado com depressão respiratória)\n   QT longo, outro remédio que alarga o QT, hipocalemia ou cardiopatia: evitar haloperidol, preferir midazolam; ECG assim que possível.\n   Intoxicação por álcool: Haloperidol 5 mg IM isolado; evitar benzodiazepínico. Com rebaixamento da consciência: não sedar.\n   Abstinência alcoólica ou intoxicação por cocaína: Diazepam 10mg EV lento (até 5 mg/min).\n3) Reavaliar em 30 min; pode repetir a mesma medicação 1 vez. Haloperidol: no máximo 20 mg por dia (idoso, 5 mg). Gestante: haloperidol isolado.\n4) Contenção só se a abordagem verbal e o remédio não bastarem: prescrever e registrar o motivo; 5 pessoas treinadas, 4 pontos, no leito, cabeceira a 30°; sinais vitais e circulação dos membros a cada 15 min na 1ª hora e a cada 30 min por 4 h; retirar assim que possível (em princípio, até 2 h).",
  "orient": "",
  "rev": [
   "Corrigido (2026-10-17): alinhado ao cartão Agora — idoso sem prometazina nem benzodiazepínico (haloperidol máx. 5 mg/dia); QT longo e cardiopatia; haloperidol no máximo 20 mg por dia; gestante com haloperidol isolado; contenção física com monitoração (ABP 2019, partes 1 e 2; EMA 2017; Beers 2023; HC-FMUSP 18ª ed.).",
   "Corrigido (2026-10-08): diazepam só na abstinência alcoólica e na cocaína; na intoxicação alcoólica, haloperidol isolado (ABP 2019; Projeto BETA 2012; bula do haloperidol).",
   "Adicionado: descartar causas orgânicas, midazolam e dose em idosos.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Huf G et al. Haloperidol mais prometazina para agitação (TREC — BMJ 2007).",
   "Wilson MP et al. Project BETA Psychopharmacology Workgroup (West J Emerg Med 2012;13:26): haloperidol na intoxicação alcoólica; benzodiazepínico na abstinência.",
   "Bula do Compaz (diazepam 5 mg/mL injetável), Cristália, Anvisa: EV lenta, 0,5–1 mL/min.",
   "Bula do haloperidol solução injetável 5 mg/mL, Anvisa 09/12/2025: contraindicado no coma e na depressão do sistema nervoso central por álcool ou outros depressores.",
   "Baldaçara L et al. Brazilian guidelines for the management of psychomotor agitation. Part 1. Non-pharmacological approach — ABP (Braz J Psychiatry 2019;41:153). https://doi.org/10.1590/1516-4446-2018-0163",
   "Baldaçara L et al. Brazilian guidelines for the management of psychomotor agitation. Part 2. Pharmacological approach — ABP (Braz J Psychiatry 2019;41:324). https://doi.org/10.1590/1516-4446-2018-0177",
   "European Medicines Agency. Haldol — Article 30 referral, Annex III (2017): idoso começa com metade da menor dose de adulto, máx. 5 mg/dia; contraindicado no QT longo, hipocalemia não corrigida e com outros remédios que alargam o QT.",
   "FDA. Haloperidol (lactato) injection — bula americana, Fresenius Kabi USA, DailyMed, out/2026: 2–5 mg IM, até de hora em hora, dose máxima de 20 mg/dia.",
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): evitar benzodiazepínico e anti-histamínico de 1ª geração no idoso; antipsicótico no delirium só se medidas não farmacológicas falharem.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 15, Agitação psicomotora."
  ]
 },
 {
  "id": "abstinencia",
  "nome": "Síndrome de abstinência alcoólica",
  "cat": "psi",
  "cid": "F10.3",
  "sin": "alcool abstinencia tremor delirium",
  "casa": "",
  "avisoRx": ["Encaminhar ao CAPS AD."],
  "unidade": "1) Tiamina 300mg IM ou EV (antes ou junto com soro glicosado; na hipoglicemia, não atrasar a glicose). Suspeita de encefalopatia de Wernicke (confusão, ataxia, alteração do movimento dos olhos): Tiamina 200mg EV em 100 mL de SF em 30 min, de 8/8h, e internar.\n2) Hidratação venosa se desidratado; glicemia capilar; eletrólitos (Mg, K).\n3) Aplicar a CIWA-Ar a cada 1 h. Se CIWA-Ar ≥ 10: Diazepam 10–20mg VO e reavaliar em 1 h; repetir enquanto ≥ 10. Abaixo de 10, não dar.\n   Ou Diazepam 10mg EV lento (máx. 5 mg/min) se não aceitar VO.\n   (Hepatopata grave ou idoso: Lorazepam 1–2mg VO.)\n4) Delirium tremens ou convulsão: internar.\n5) Agitação grave ou CIWA-Ar ≥ 19: Diazepam 10mg EV lento, repetir a cada 5–10 min até ficar calmo e acordável; monitorar oximetria. Não usar haloperidol sozinho (piora o risco de convulsão); se precisar, só junto com o benzodiazepínico.",
  "orient": "- Procure o Centro de Atenção Psicossocial Álcool e Drogas (CAPS AD) para acompanhamento.",
  "rev": [
   "Corrigido (2026-10-17): diazepam guiado pela CIWA-Ar ≥ 10; tiamina 200 mg EV de 8/8h na suspeita de Wernicke; conduta na abstinência grave (CIWA-Ar ≥ 19) e alerta contra haloperidol isolado (ASAM 2020; EFNS 2010; Sullivan 1989; HC-FMUSP 18ª ed.).",
   "Corrigido (2026-10-08): tiamina antes ou junto com o soro glicosado, sem atrasar a glicose na hipoglicemia (Schabelman e Kuo, J Emerg Med 2012;42:488).",
   "Corrigido: 'Diazepam 1 amp EV até de 1/1h' → dose guiada por sintomas, VO preferencial.",
   "Adicionado: tiamina antes da glicose e lorazepam em hepatopatas."
  ],
  "fontes": [
   "American Society of Addiction Medicine. The ASAM Clinical Practice Guideline on Alcohol Withdrawal Management. J Addict Med 2020;14(3S Suppl 1):1–72 (benzodiazepínico guiado pela CIWA-Ar; leve < 10, moderada 10–18, grave ≥ 19; lorazepam ou oxazepam na hepatopatia grave e no idoso; tiamina a todos; benzodiazepínico EV em bolus frequentes na abstinência grave; antipsicótico só como adjuvante).",
   "Sullivan JT et al. Assessment of alcohol withdrawal: the revised Clinical Institute Withdrawal Assessment for Alcohol scale (CIWA-Ar) (Br J Addict 1989;84:1353).",
   "Galvin R et al. EFNS guidelines for diagnosis, therapy and prevention of Wernicke encephalopathy (Eur J Neurol 2010;17:1408): tiamina 200 mg EV 3 vezes ao dia, diluída em 100 mL de soro fisiológico ou glicosado, em 30 min.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 105, Síndrome de abstinência alcoólica.",
   "Bula do Compaz (diazepam 5 mg/mL injetável), Cristália, Anvisa: EV lenta, 0,5–1 mL/min."
  ]
 },
 {
  "id": "ansiedade",
  "nome": "Crise de ansiedade",
  "cat": "psi",
  "cid": "F41.0",
  "sin": "panico ansiedade nervoso",
  "casa": "",
  "avisoRx": ["CID: transtorno de pânico F41.0 | ansiedade não especificada F41.9."],
  "unidade": "1) Descartar causas orgânicas (ECG, glicemia, SatO2) conforme o caso.\n2) Se crise intensa que não cede com acolhimento e respiração: Diazepam 5mg VO, dose única (idoso: evitar; se indispensável, 2,5mg). Não prescrever benzodiazepínico para casa.",
  "orient": "- Nos momentos de crise, respire de forma lenta e profunda.\n- Procure acompanhamento na Unidade Básica de Saúde ou com psicólogo.",
  "rev": [
   "Corrigido (2026-10-17): passiflora retirada (sem fonte que sustente; Cochrane 2007 sem dados suficientes); diazepam 5–10 mg → 5 mg em dose única, sem receita para casa e com alerta no idoso; CID do pânico na orientação; fontes no lugar de \"consenso clínico\" (NICE CG113; Beers 2023; Katon 2006).",
   "Corrigido: diazepam IM tem absorção errática; trocado por VO."
  ],
  "evid": "Benzodiazepínico só na crise, em dose única; o tratamento é TCC e, se necessário, antidepressivo (NICE CG113).",
  "fontes": [
   "NICE CG113. Generalised anxiety disorder and panic disorder in adults: management, 2011 (atualizada em 2020): no pânico, não usar benzodiazepínico; TCC e, se necessário, ISRS; na emergência, descartar causa clínica e informar sobre o diagnóstico.",
   "Katon WJ. Clinical practice: panic disorder (N Engl J Med 2006;354:2360) — diferencial clínico.",
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): evitar benzodiazepínico no idoso.",
   "Miyasaka LS et al. Passiflora for anxiety disorder (Cochrane 2007;CD004518): evidência insuficiente — motivo da retirada da passiflora."
  ]
 },
 {
  "id": "gripe",
  "nome": "Síndrome gripal / Resfriado comum",
  "cat": "resp",
  "cid": "J11.1",
  "sin": "gripe resfriado coriza tosse influenza covid",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se febre ou dor.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n\nUso nasal\n3) Soro fisiológico 0,9% --------------------- 1 fr\nAplicar 5 a 10 mL com seringa em cada narina 4x ao dia (spray: 2 jatos em cada narina).\n\n# Síndrome gripal em grupo de risco (≥ 60 anos, gestante/puérpera, comorbidades, imunossupressão), até 48h idealmente:\n4) Oseltamivir 75mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Febre com mialgia, cefaleia, dor retro-orbitária ou exantema em área de dengue (ou viagem em 14 dias): sem ibuprofeno nem AAS (MS, Dengue 2024, 6.1.2).","Nesse caso, só dipirona ou paracetamol até descartar dengue.","Grupo de risco tratado em casa: retorno em 48 h (Guia de Manejo e Tratamento de Influenza 2023).","CID resfriado: J00."],
  "unidade": "",
  "orient": "- Faça repouso e beba bastante líquido.\n- Se você faz parte de um grupo de risco e vai se tratar em casa, volte para reavaliação em 48 horas, ou antes se piorar.\n- Volte imediatamente ao pronto-socorro se tiver falta de ar, oxigenação baixa, dor no peito ou se a febre piorar depois de ter melhorado.\n- Se tiver febre com dor no corpo, dor de cabeça, dor atrás dos olhos ou manchas na pele, não tome ibuprofeno nem AAS (aspirina) até que a dengue seja descartada; nesse caso, use só dipirona ou paracetamol.",
  "rev": [
   "Corrigido (2026-10-17): loratadina removida (sem benefício no resfriado, Cochrane 2015); título do guia de influenza corrigido (MS, Guia de Manejo e Tratamento de Influenza 2023).",
   "Corrigido (2026-10-09): não usar ibuprofeno na febre com dengue não descartada (MS, Dengue 2024).",
   "Adicionado: oseltamivir para grupo de risco (protocolo MS).",
   "Removido: budesonida nasal por 15 dias (sem benefício no resfriado)."
  ],
  "fontes": [
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: caso suspeito (item 10.1); não usar salicilatos, anti-inflamatórios nem corticoides e orientar a não se automedicar (item 6.1.2); só dipirona e paracetamol (apêndice H). https://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_6ed.pdf",
   "Ministério da Saúde. Guia de Manejo e Tratamento de Influenza 2023: oseltamivir 75 mg de 12/12h por 5 dias na síndrome gripal com condição de risco, de preferência nas primeiras 48 h; retorno em 48 h; ajuste renal. https://bvsms.saude.gov.br/bvs/publicacoes/guia_manejo_tratamento_influenza_2023.pdf",
   "De Sutter AI et al. Antihistamines for the common cold (Cochrane Database Syst Rev 2015;(11):CD009345): anti-histamínico isolado sem efeito clinicamente relevante na obstrução, coriza ou espirros."
  ]
 },
 {
  "id": "sinusite",
  "nome": "Rinossinusite aguda bacteriana",
  "cat": "orl",
  "cid": "J01.9",
  "sin": "sinusite dor face secrecao nasal",
  "casa": "# Antibiótico só se: sintomas > 10 dias sem melhora, piora após melhora inicial (dupla piora) ou início grave: febre ≥ 39°C com secreção purulenta ou dor facial por 3 a 4 dias seguidos.\nUso oral\n1) Amoxicilina 875mg ------------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\nOu\n1) Amoxicilina 500mg ------------------------- 21 cp\nTomar 1 cp VO de 8/8h por 7 dias.\nOu (ATB recente, > 65 anos ou comorbidades)\n1) Amoxicilina + Clavulanato 875/125mg ------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\nOu (alergia a penicilina)\n1) Doxiciclina 100mg ------------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias, com bastante água e sem deitar logo depois.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n\nUso nasal\n3) Budesonida 64mcg spray nasal -------------- 1 fr\nAplicar 2 jatos em cada narina pela manhã por 15 dias.\n4) Soro fisiológico 0,9% --------------------- 1 fr\nLavar cada narina com 5 a 10 mL com seringa 4x ao dia.",
  "avisoRx": ["Não complicada: oferecer observação sem antibiótico se o retorno estiver garantido; iniciar se piorar ou não melhorar em 7 dias."],
  "unidade": "",
  "orient": "- Resfriados com menos de 10 dias de sintomas são causados por vírus e não precisam de antibiótico.\n- Se o médico optou por observar sem antibiótico, volte para reavaliação se piorar ou se não melhorar em 7 dias.\n- Volte imediatamente ao pronto-socorro se tiver inchaço ou vermelhidão ao redor do olho, alteração da visão ou dor de cabeça forte.",
  "rev": [
   "Corrigido (2026-10-17): oferecer observação sem antibiótico como 1ª opção na bacteriana não complicada com retorno garantido; início grave por 3 a 4 dias seguidos (era ≥ 3 dias); doxiciclina 100 mg de 12/12h por 7 dias para alergia a penicilina (AAO-HNSF 2025; IDSA 2012).",
   "Adicionado: critérios para antibiótico.",
   "Ajustado: amoxicilina simples como 1ª linha; clavulanato em risco.",
   "Removido: prednisona de rotina e loratadina (sem benefício na sinusite bacteriana).",
   "Adicionado: amoxicilina 875 mg de 12/12h (AAO-HNS 2015 lista 500 mg 8/8h ou 875 mg 12/12h)."
  ],
  "fontes": [
   "Chow AW et al. IDSA Clinical Practice Guideline for Acute Bacterial Rhinosinusitis in Children and Adults (Clin Infect Dis 2012;54:e72): critérios de início (≥ 10 dias, grave por 3–4 dias, dupla piora); 5–7 dias no adulto; doxiciclina ou quinolona se alergia; macrolídeo não recomendado.",
   "AAO-HNSF. Clinical Practice Guideline: Adult Sinusitis Update (Otolaryngol Head Neck Surg 2025;173 Suppl 1:S1–S56; doi 10.1002/ohn.1344): observação sem antibiótico na bacteriana não complicada com retorno garantido; se antibiótico, amoxicilina com ou sem clavulanato por 5–7 dias; reavaliar se piora ou sem melhora em 3–5 dias.",
   "Bula FDA doxiciclina (DailyMed): tomar com bastante líquido (esofagite e úlcera esofágica); IDSA 2012: 100 mg de 12/12h na rinossinusite do adulto alérgico a penicilina."
  ]
 },
 {
  "id": "urticaria",
  "nome": "Urticária",
  "cat": "pele",
  "cid": "L50.9",
  "sin": "alergia placas coceira",
  "casa": "Uso oral\n1) Loratadina 10mg --------------------------- 7 cp\nTomar 1 cp VO 1x ao dia por 7 dias.\nOu\n1) Levocetirizina 5mg ------------------------ 7 cp\nTomar 1 cp VO 1x ao dia por 7 dias.\n2) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.",
  "avisoRx": ["Urticária > 6 semanas: encaminhar."],
  "unidade": "1) Levocetirizina 5mg VO (ou loratadina 10mg VO).\n   Se não puder tomar VO e prurido intenso: prometazina 25mg IM profunda (não usar em idosos nem em menores de 2 anos; máx. 100 mg/dia).\n2) Se placas extensas: prednisona 40mg VO.\n* Se angioedema de glote, falta de ar ou hipotensão → protocolo de anafilaxia.",
  "orient": "- Evite o que pode ter causado a alergia e não use anti-inflamatórios, como ibuprofeno e diclofenaco. Se usa AAS (aspirina) por indicação do cardiologista, não pare por conta própria; converse com seu médico.\n- Se as manchas durarem mais de 6 semanas, procure acompanhamento em consulta médica agendada.",
  "rev": [
   "Corrigido (2026-10-17): anti-histamínico de 1ª geração → 2ª geração: dexclorfeniramina xarope 10 mL (4 mg, acima da bula) → levocetirizina 5 mg 1x ao dia, até 12/12h (diretriz internacional de urticária 2026; bula Polaramine); prometazina IM só sem VO, 25 mg, nunca em idoso nem em menor de 2 anos (bula Fenergan; FDA 2023; Beers 2023); diretriz 2022 → 2026.",
   "Ajustado: prednisona 1x ao dia pela manhã.",
   "Adicionado: alerta de anafilaxia.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Zuberbier T et al. The International Guideline for the Definition, Classification, Diagnosis and Management of Urticaria (Allergy 2026;81(8):2582–2632). https://doi.org/10.1111/all.70210 — anti-histamínico de 2ª geração diário, até 4x a dose; corticoide oral só em curso curto.",
   "Zuberbier T et al. EAACI/GA²LEN/EuroGuiDerm/APAAACI Guideline for Urticaria (Allergy 2022;77:734) — não usar anti-histamínico de 1ª geração; corticoide oral por no máximo 10 dias na urticária aguda.",
   "Bula Fenergan (prometazina 25 mg/mL), registrada na Anvisa — 25–50 mg IM, máx. 100 mg/dia, contraindicada abaixo de 2 anos; FDA 2023 (tarja de lesão tecidual); American Geriatrics Society. Beers Criteria, 2023.",
   "Bula Polaramine (dexclorfeniramina), registrada na Anvisa — adulto 2 mg 3–4x ao dia, máx. 12 mg/dia.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 11 — Anafilaxia e outras alergias."
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
  "orient": "- Não tome bebida alcoólica durante o tratamento e até 3 dias depois do fim (vale também para o gel).\n- Na gestação ou na amamentação, o tratamento é o mesmo (comprimido ou gel).\n- O parceiro não precisa ser tratado.",
  "rev": [
   "Corrigido (2026-10-17): link do PCDT 2022; álcool até 3 dias, como a ficha; gestante e lactante com o mesmo esquema (PCDT IST 2022, quadro 34; bula FDA do metronidazol).",
   "Corrigido: oral e vaginal são alternativas ('ou'), não associação.",
   "Ajustado: abstinência alcoólica 24 → 48h."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 — quadro 34, vaginose bacteriana (metronidazol VO por 7 dias ou gel vaginal por 5 noites, inclusive na gestação e na lactação; clindamicina como 2ª opção; parceria não tratada). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf",
   "Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — vaginose bacteriana.",
   "Bula FDA do metronidazol — álcool contraindicado durante o uso e até 3 dias depois."
  ]
 },
 {
  "id": "candidiase",
  "nome": "Candidíase vulvovaginal",
  "cat": "gu",
  "cid": "B37.3",
  "sin": "corrimento branco coceira vaginal fungo",
  "casa": "Uso oral\n1) Fluconazol 150mg -------------------------- 1 cp\nTomar 1 cp VO em dose única.\nOu\nUso vaginal\n1) Miconazol 2% creme vaginal ---------------- 1 bisnaga\nAplicar 1 aplicador cheio via vaginal à noite por 7 noites.",
  "avisoRx": ["Gestante ou amamentando: somente creme vaginal (não usar fluconazol)."],
  "unidade": "",
  "orient": "- Na gestação ou na amamentação, use somente o creme vaginal (não use fluconazol).\n- O parceiro só precisa de tratamento se tiver sintomas.",
  "rev": [
   "Corrigido (2026-10-17): link do PCDT 2022; restrição do fluconazol também na lactação (PCDT IST 2022, quadro 33).",
   "Adicionado: item novo (não havia no modelo)."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 — quadro 33, candidíase vulvovaginal (miconazol vaginal por 7 noites ou nistatina por 14 noites; fluconazol 150 mg dose única como 2ª opção; recorrente; gestante e lactante só via vaginal). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf"
  ]
 },
 {
  "id": "verminose",
  "nome": "Verminose — amplo espectro",
  "cat": "gi",
  "cid": "B82.9",
  "sin": "verme parasitose",
  "casa": "Uso oral\n1) Albendazol 400mg -------------------------- 1 cp\nTomar 1 cp VO em dose única (áscaris, ancilóstomo, tricuríase).\nOu\n1) Mebendazol 100mg -------------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\nOu\n1) Nitazoxanida 500mg (Annita) --------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias, com alimento.\n\n# Estrongiloidíase (ou corticoide/imunossupressão com suspeita):\n1) Ivermectina 6mg --------------------------- (conforme o peso)\nTomar 200 mcg/kg VO 1x ao dia por 2 dias, em jejum, com água: 15–24 kg ½ cp; 25–35 kg 1 cp; 36–50 kg 1½ cp; 51–65 kg 2 cp; 66–79 kg 2½ cp; 80 kg ou mais 200 mcg/kg.",
  "avisoRx": ["Escolher um dos esquemas.","Ivermectina: não usar abaixo de 15 kg ou de 5 anos (bula).","Sem ivermectina: albendazol 400 mg 1x ao dia por 3 dias, menos eficaz.","Gestante: sem albendazol, mebendazol nem ivermectina (bula; Harrison cap. 239); adiar para após o parto, salvo indicação do pré-natal."],
  "unidade": "",
  "orient": "- Lave bem as mãos e os alimentos e beba água filtrada.\n- Na gestação, não use albendazol, mebendazol nem ivermectina; o tratamento fica para depois do parto, salvo orientação do pré-natal.",
  "rev": [
   "Corrigido (2026-10-17): estrongiloidíase com ivermectina 200 mcg/kg por 2 dias, pela tabela de peso da bula, e albendazol de 3 dias como alternativa (Harrison 22ª ed., cap. 239; bula Revectina); teníase retirada do albendazol (praziquantel, cap. 242, sem ficha); gestante não usa albendazol nem mebendazol (bula Zentel); fontes identificadas (Harrison, OMS 2017, bulas).",
   "Corrigido: mebendazol e tiabendazol estavam prescritos juntos; ficou uma opção por vez.",
   "Removido: tiabendazol oral (muitos efeitos adversos; albendazol/ivermectina são preferíveis)."
  ],
  "fontes": [
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 239 (Intestinal Nematode Infections): albendazol 400 mg dose única ou mebendazol 100 mg de 12/12h por 3 dias; estrongiloidíase com ivermectina 200 mcg/kg/dia por 2 dias; benzimidazóis contraindicados na gestação.",
   "World Health Organization. Guideline: preventive chemotherapy to control soil-transmitted helminth infections in at-risk population groups. Geneva: WHO, 2017. https://www.who.int/publications/i/item/9789241550116",
   "Bula Zentel (albendazol, GSK, Anvisa) e bula Annita (nitazoxanida, Farmoquímica, Anvisa).",
   "Bula Revectina (ivermectina 6 mg, Anvisa): cerca de 200 mcg/kg em dose oral única na estrongiloidíase, com tabela de peso (15–24 kg ½ cp; 25–35 kg 1 cp; 36–50 kg 1½; 51–65 kg 2; 66–79 kg 2½; 80 kg ou mais 200 mcg/kg); não usar em menores de 15 kg ou de 5 anos; exame de fezes para confirmar a cura. O esquema de 2 dias é do Harrison.",
   "FDA. Stromectol (ivermectina), bula americana: tomar em jejum, com água."
  ]
 },
 {
  "id": "tetano",
  "nome": "Tétano / Conduta em feridas e mordeduras",
  "cat": "toxinf",
  "cid": "T14.1",
  "sin": "ferimento vacina dt antitetanica mordida cachorro",
  "casa": "# Mordedura com critério para antibiótico preemptivo (critérios na aba Feridas):\nUso oral\n1) Amoxicilina + Clavulanato 875/125mg ------- 10 cp\nTomar 1 cp VO de 12/12h por 3 a 5 dias.",
  "unidade": "1) Limpeza abundante com água e sabão/SF 0,9%; desbridamento se necessário.\n2) Vacina dT IM:\n   - Esquema incompleto ou desconhecido (< 3 doses): iniciar ou completar 3 doses, em qualquer ferimento.\n   - 3 doses ou mais: ferimento limpo e superficial, reforço se a última dose foi há mais de 10 anos; ferimento de alto risco, reforço se há 5 anos ou mais.\n   - Gestante: dTpa conforme o calendário da gestante (a partir da 20ª semana).\n3) Imunização passiva (imunoglobulina humana antitetânica 250 unidades IM ou soro antitetânico 5.000 unidades IM, em grupo muscular diferente do da vacina; preferir a imunoglobulina em imunodeprimido ou com alergia a soro heterólogo): ferimento de alto risco com esquema incompleto ou desconhecido; ou ferimento de alto risco com última dose há 5 anos ou mais em situação especial (imunodeprimido, desnutrido grave, idoso, ou cuidados posteriores com a ferida inadequados).\n4) Mordedura animal: avaliar profilaxia da raiva conforme animal e ferimento (fluxo completo na aba Feridas) e preencher a ficha de atendimento antirrábico (SINAN).",
  "orient": "- Complete o esquema de vacinas na Unidade Básica de Saúde.\n- Volte se aparecerem sinais de infecção no ferimento: vermelhidão, calor, pus ou febre.",
  "rev": [
   "Corrigido (2026-10-17): esquema incompleto ou desconhecido completado com 3 doses; imunização passiva com dose (imunoglobulina 250 unidades ou soro 5.000 unidades) e nas situações especiais com última dose há 5 anos ou mais, como na aba Feridas; gestante com dTpa; edição do Guia de Vigilância igual à da aba Feridas (Guia de Vigilância em Saúde, 6ª ed. revisada, 2024; Calendário Nacional de Vacinação).",
   "Adicionado: critérios de reforço por tempo desde a última dose.",
   "Adicionado: antibiótico em mordeduras e alerta de raiva.",
   "Atualizado (09/2026): antibiótico por 3 a 5 dias apenas quando houver critério (IDSA 2014); fluxo de raiva e tétano na aba Feridas."
  ],
  "fontes": [
   "Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed. revisada, 2024 — tétano acidental: conduta por tipo de ferimento e situação vacinal (SAT 5.000 UI; IGHAT 250 UI; imunização passiva em situações especiais).",
   "Ministério da Saúde. Calendário Nacional de Vacinação — gestante: dTpa a partir da 20ª semana de cada gestação.",
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
  "avisoRx": ["Dor torácica com ECG e troponina normais não exclui SCA: repetir conforme o algoritmo.","Pensar em dissecção de aorta, TEP, pneumotórax e tamponamento antes de antiagregar e anticoagular."],
  "unidade": "1) ECG de 12 derivações em até 10 min da chegada; repetir se a dor persistir ou mudar.\n2) Monitorização, acesso venoso, troponina (preferir alta sensibilidade, com o algoritmo 0/1h ou 0/2h do kit do serviço).\n3) AAS 162–325 mg mastigado (ex.: 300 mg = 3 cp de 100 mg), se não houver alergia.\n4) O2 somente se SatO2 < 90%.\n5) Dor persistente: dinitrato de isossorbida 5 mg SL, até 3 doses a cada 5 min, se PAS ≥ 90 mmHg, sem suspeita de infarto de VD e sem inibidor de fosfodiesterase-5 recente (sildenafila ou vardenafila em 24 h, tadalafila em 48 h). Dor refratária: morfina 2–4 mg EV (pode atrasar o efeito dos antiagregantes orais).\n\nCom supradesnivelamento de ST (IAMCSST):\n6) Angioplastia primária se o tempo até a abertura da artéria for ≤ 90 min (ou transferência ≤ 120 min).\n7) Se não for possível: fibrinólise com porta-agulha ≤ 30 min.\n   Tenecteplase EV em bolus único de 5–10 s, por peso: < 60 kg 30 mg | 60–69 kg 35 mg | 70–79 kg 40 mg | 80–89 kg 45 mg | ≥ 90 kg 50 mg. Idade ≥ 75 anos: metade da dose da faixa. Incompatível com soro glicosado (lavar com SF 0,9% antes e depois).\n   Clopidogrel: ≤ 75 anos 300 mg VO de ataque; > 75 anos 75 mg VO, sem ataque.\n   Enoxaparina: < 75 anos 30 mg EV em bolus e, 15 min depois, 1 mg/kg SC de 12/12h (máx. 100 mg nas 2 primeiras doses); ≥ 75 anos sem bolus, 0,75 mg/kg SC de 12/12h (máx. 75 mg nas 2 primeiras doses); ClCr < 30 mL/min: 1 mg/kg SC 1 vez ao dia.\n   Transferir todos para serviço com hemodinâmica (ECG em 60–90 min; sem reperfusão: angioplastia de resgate).\n\nSem supradesnivelamento (SCA sem supra):\n8) Dupla antiagregação: ticagrelor 180 mg ou clopidogrel 300–600 mg, conforme a estratégia do serviço.\n9) Anticoagulação: enoxaparina 1 mg/kg SC de 12/12h (ClCr < 30 mL/min: 1 mg/kg SC 1 vez ao dia) ou heparina não fracionada 60 unidades/kg EV em bolus (máx. 4.000 unidades) e 12 unidades/kg/h (máx. 1.000 unidades/h), com TTPa 1,5–2 vezes o controle.\n10) Estratificar (ex.: HEART) e transferir para serviço com hemodinâmica conforme o risco.",
  "orient": "",
  "fontes": [
   "ACC/AHA/ACEP/NAEMSP/SCAI. Guideline for the Management of Patients With Acute Coronary Syndromes, 2025 (Circulation). https://www.ahajournals.org/doi/10.1161/CIR.0000000000001309",
   "SBC. Diretriz Brasileira de Avaliação e Diagnóstico da Dor Torácica na Emergência, 2025 (Arq Bras Cardiol 122(9)). https://abccardiol.org/en/article/brazilian-guideline-for-the-evaluation-and-diagnosis-of-chest-pain-in-the-emergency-department-2025/",
   "Bula do tenecteplase (Metalyse) registrada na Anvisa — faixas de peso, bolus único, incompatibilidade com glicose.",
   "Byrne RA et al. 2023 ESC Guidelines for the management of acute coronary syndromes (Eur Heart J 2023;44:3720) — metade da dose de tenecteplase ≥ 75 anos, clopidogrel e enoxaparina com fibrinólise. https://doi.org/10.1093/eurheartj/ehad191",
   "Van de Werf F et al. STREAM-2: Half-Dose Tenecteplase or Primary PCI in Older Patients With STEMI (Circulation 2023;148(9):753–764). PubMed 37439219"
  ],
  "rev": [
   "Corrigido (2026-10-17): tenecteplase com metade da dose da faixa a partir de 75 anos, também na calculadora; clopidogrel e enoxaparina por idade na fibrinólise; nitrato com PAS ≥ 90 mmHg e prazos do inibidor da fosfodiesterase-5; heparina não fracionada com manutenção e TTPa; ESC 2023 nas fontes (ESC 2023; STREAM-2; ACC/AHA 2025; bula do Metalyse).",
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
  "avisoRx": ["Tempo é cérebro: acionar o fluxo de AVC do serviço/regulação assim que houver suspeita."],
  "unidade": "1) Glicemia capilar imediata (hipoglicemia imita AVC). Registrar a hora em que o paciente foi visto bem pela última vez.\n2) NIHSS e TC de crânio sem contraste urgente; angio-TC se possível candidato a trombectomia. Não atrasar a imagem vascular esperando creatinina.\n3) ECG e troponina são recomendados, mas não devem atrasar a trombólise.\n\nTrombólise EV até 4,5h do último momento visto bem, com déficit incapacitante e sem contraindicações (ver fluxo):\n4) Tenecteplase 0,25 mg/kg em bolus (máx. 25 mg)\n   Ou Alteplase 0,9 mg/kg (máx. 90 mg): 10% em bolus em 1 min e o restante em 60 min.\n5) PA antes da trombólise < 185/110 mmHg (se acima: nitroprussiato, ver bomba; se não baixar, não trombolisar) e ≤ 180/105 mmHg nas 24h seguintes.\n\n6) Oclusão de grande vaso: trombectomia até 6h (e até 24h em casos selecionados). Acionar a regulação/centro de AVC.\n7) Glicemia entre 140 e 180 mg/dL; corrigir se < 60 mg/dL. Não buscar 80–130 mg/dL com insulina EV (sem benefício).\n8) Sem trombólise: AAS 160–325 mg VO (ou por sonda) nas primeiras 24–48 h, após a imagem excluir hemorragia e após teste de deglutição. Com trombólise: nenhum antiagregante ou anticoagulante por 24 h, até a TC de controle.\n9) Déficit leve não incapacitante (NIHSS ≤ 5) ou AIT de alto risco, sem trombólise: Clopidogrel 300–600 mg VO + AAS 160–325 mg VO em até 24 h; depois clopidogrel 75 mg/dia + AAS 75–100 mg/dia por 21 dias.",
  "orient": "",
  "fontes": [
   "Prabhakaran S et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke — AHA/ASA (Stroke 2026): tenecteplase 0,25 mg/kg (máx. 25 mg) ou alteplase 0,9 mg/kg (máx. 90 mg); PA < 185/110 antes e ≤ 180/105 depois; glicemia 140–180; dupla antiagregação no AVC leve; trombectomia até 24 h. https://doi.org/10.1161/STR.0000000000000513",
   "Powers WJ et al. 2019 Update to the 2018 Guidelines for the Early Management of Acute Ischemic Stroke (Stroke 2019;50:e344) — tabela de contraindicações à trombólise.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 53, Abordagem do paciente com AVC isquêmico agudo."
  ],
  "rev": [
   "Corrigido (2026-10-17): dose do AAS (160–325 mg) com teste de deglutição e nada de antitrombótico por 24 h após a trombólise; dupla antiagregação no AVC leve e no AIT de alto risco; trombólise só com déficit incapacitante; conduta na PA alta antes da trombólise; alvo de glicemia 140–180 mg/dL; resumo do emDocs trocado pelas fontes primárias, como no cartão Agora e no fluxo (AHA/ASA 2026; Powers 2019; HC-FMUSP 18ª ed.).",
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
  "avisoRx": ["Use a Calculadora para o volume de 30 mL/kg."],
  "unidade": "1) Triagem: usar NEWS/NEWS2, MEWS ou SIRS; não usar o qSOFA isoladamente.\n2) Lactato sérico precoce e seriado para guiar a ressuscitação. Hemoculturas (2 pares) antes do antibiótico, sem atrasá-lo.\n3) Antibiótico EV de amplo espectro conforme o foco provável e o guia do serviço: na 1ª hora no choque séptico e na sepse provável; na sepse só possível, sem choque, investigação rápida e antibiótico em até 3 h se a suspeita persistir. 1ª dose plena, sem ajuste renal.\n4) Hipoperfusão ou hipotensão: pelo menos 30 mL/kg de cristaloide EV nas primeiras 3h, individualizando; preferir cristaloide balanceado (Ringer lactato) ao SF 0,9%, exceto no TCE. Reavaliar a cada etapa.\n5) Vasopressor: noradrenalina é a 1ª escolha, em veia periférica calibrosa sem esperar o acesso central; na hipotensão grave, iniciar junto com o volume. Alvo inicial de PAM 65 mmHg (≥ 65 anos: 60–65 mmHg se a perfusão estiver adequada); não tolerar PAM abaixo do alvo por mais de 30–40 min (bomba: noradrenalina).\n6) Noradrenalina em dose crescente (em geral 0,25–0,5 mcg/kg/min): associar vasopressina 0,03 unidades/min EV, dose fixa, sem titular (bomba: vasopressina). Disfunção cardíaca com hipoperfusão apesar de volume e vasopressor: dobutamina 2,5–10 mcg/kg/min.\n7) Necessidade persistente de vasopressor (ex.: noradrenalina ≥ 0,25 mcg/kg/min por 4 h ou mais): hidrocortisona 200 mg/dia, 50 mg EV de 6/6h ou infusão contínua.",
  "orient": "",
  "fontes": [
   "Prescott HC et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026 (Crit Care Med 2026; Intensive Care Med 2026;52:863; publicada em 23/03/2026). https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026",
   "Evans L et al. Surviving Sepsis Campaign 2021 (Crit Care Med 2021;49:e1063) — hidrocortisona 200 mg/dia com noradrenalina ≥ 0,25 mcg/kg/min por pelo menos 4 h; vasopressina 0,03 unidades/min com noradrenalina 0,25–0,5 mcg/kg/min. https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-guidelines-2021",
   "Instituto Latino-Americano de Sepse (ILAS). Protocolo clínico de atendimento ao paciente adulto com sepse/choque séptico, revisão de julho de 2026 (1ª dose plena do antimicrobiano; PAM < 65 por no máximo 30–40 min). https://ilas.org.br/wp-content/uploads/2022/02/Protocolo-de-tratamento-da-sepse-adulto-Revisao-julho-2026.pdf",
   "Bula da dobutamina 12,5 mg/mL registrada na Anvisa (habitual 2,5–10 mcg/kg/min; frequentemente até 20).",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 9 (sepse e choque séptico)."
  ],
  "rev": [
   "Corrigido (2026-10-17): conduta igual ao cartão Agora — antibiótico em até 3 h na sepse só possível e 1ª dose plena; noradrenalina periférica com alvo de PAM 60–65 mmHg no idoso e sem tolerar hipotensão por mais de 30–40 min; limiar da vasopressina (0,03 unidades/min, dose fixa) e da hidrocortisona; dobutamina na disfunção cardíaca; ILAS 2026 nas fontes (SSC 2026; SSC 2021; ILAS 2026).",
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
  "unidade": "1) Instável (hipotensão, alteração de consciência, choque, dor torácica isquêmica, IC aguda): cardioversão elétrica sincronizada, com sedação se o paciente estiver consciente. Energia: FA ≥ 200 J bifásico; demais ritmos, a energia inicial recomendada pelo fabricante do aparelho, aumentando se falhar. TV polimórfica instável: desfibrilação (não sincronizada).\n2) Estável, QRS estreito e regular (provável TSV):\n   - Manobra vagal (preferir Valsalva modificada: esforço de 15 s em posição semissentada, seguido de deitar com elevação passiva das pernas).\n   - Adenosina 6 mg EV em bolus rápido seguido de flush de SF; se necessário, 12 mg.\n3) QRS largo, estável:\n   - Amiodarona 150 mg em 100 mL de SG 5% EV em 10 min (repetir se recorrer), depois 1 mg/min por 6 h e 0,5 mg/min por 18 h (bomba: amiodarona).\n   - Ou Procainamida 20–50 mg/min EV até supressão, hipotensão, QRS alargar > 50% ou dose máx. de 17 mg/kg; manutenção 1–4 mg/min (confirme se a unidade tem).\n   - Adenosina só se o QRS largo for regular e monomórfico; nunca em QRS largo irregular (FA pré-excitada).",
  "orient": "",
  "fontes": [
   "AHA 2025 Adult Tachyarrhythmia With a Pulse Algorithm. https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Tachycardia-250514.pdf",
   "Appelboam A et al. Postural modification to the standard Valsalva manoeuvre for emergency treatment of supraventricular tachycardias (REVERT). Lancet 2015;386:1747.",
   "Bula FDA da amiodarona injetável (DailyMed): 150 mg em 10 min, 1 mg/min por 6 h e 0,5 mg/min por 18 h."
  ],
  "rev": [
   "Corrigido (2026-10-17): cardioversão da FA instável com pelo menos 200 J bifásico e sedação; TV polimórfica instável com desfibrilação; amiodarona com a infusão de 24 h; procainamida com manutenção e aviso de disponibilidade; adenosina proibida no QRS largo irregular (AHA 2025 Adult ALS; bula FDA da amiodarona).",
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
  "unidade": "1) Instável: cardioversão elétrica sincronizada imediata.\n2) Estável — controle de frequência:\n   - Diltiazem 0,25 mg/kg EV em 2 min; se necessário, 0,35 mg/kg após 15 min; manutenção 5–15 mg/h.\n   - Ou Metoprolol 2,5–5 mg EV em 2 min, repetir a cada 5 min até 3 doses.\n   - Disfunção sistólica moderada a grave ou IC descompensada: não usar diltiazem/verapamil EV (dano). Amiodarona 300 mg em 250 mL de SG 5% EV em 1 h, depois 10–50 mg/h por 24 h (pode reverter o ritmo: avaliar risco de embolia antes); ou digoxina 0,25 mg EV, repetindo até no máximo 1,5 mg em 24 h (confirme se a unidade tem; reduzir na doença renal).\n   - Pré-excitação (WPW): não usar bloqueadores do nó AV; cardioversão elétrica sincronizada sob sedação ou procainamida (confirme se a unidade tem).\n3) Sulfato de magnésio EV é uma opção adjuvante razoável para controle de FC.\n4) Cardioversão eletiva (elétrica ou química) em paciente estável: só se início < 24 h e baixo risco tromboembólico (CHA2DS2-VA 0–1), ou após 3 semanas de anticoagulação ou ecocardiograma transesofágico sem trombo; iniciar anticoagulação antes e manter por 4 semanas depois. Preferir esperar a reversão espontânea nas primeiras 48 h com controle de frequência. Na cardioversão elétrica, sob sedação, iniciar com pelo menos 200 J bifásico.\n5) Avaliar anticoagulação (CHA2DS2-VA) e encaminhar.",
  "orient": "",
  "fontes": [
   "Joglar JA et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation (Circulation 2024;149:e1–e156) — tabela de fármacos EV para controle de frequência (amiodarona 300 mg em 1 h e 10–50 mg/h; digoxina 0,25 mg EV repetida até 1,5 mg em 24 h). https://www.ahajournals.org/doi/10.1161/CIR.0000000000001193",
   "Van Gelder IC et al. 2024 ESC Guidelines for the management of atrial fibrillation developed in collaboration with EACTS (Eur Heart J 2024;45:3314) — CHA2DS2-VA, cardioversão até 24 h, anticoagulação por 4 semanas após. https://doi.org/10.1093/eurheartj/ehae176",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 31, Fibrilação atrial.",
   "AHA. 2025 Guidelines for CPR and ECC — Part 9: Adult Advanced Life Support (cardioversão da FA com pelo menos 200 J bifásico)."
  ],
  "rev": [
   "Corrigido (2026-10-17): cardioversão eletiva só com início < 24 h e baixo risco, ou após 3 semanas de anticoagulação ou ecocardiograma transesofágico, com anticoagulação por 4 semanas depois (ESC 2024); doses de amiodarona e digoxina EV, com aviso de disponibilidade (ACC/AHA 2023); ESC 2024 e HC-FMUSP nas fontes; resumo do ACEP Now retirado.",
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
  "unidade": "1) Sentar o paciente, monitorização, ECG, troponina, RX, BNP/NT-proBNP se disponível.\n2) O2 se SatO2 < 90%. Desconforto respiratório: VNI (CPAP ou BiPAP) precoce.\n3) Furosemida EV:\n   - Sem uso prévio de diurético: 20–40 mg EV.\n   - Em uso crônico: dose EV equivalente a 1–2 vezes a dose oral diária.\n   Sondagem só se necessário. Resposta insuficiente: sódio urinário < 50–70 mEq/L em 2 h ou diurese < 100–150 mL/h nas primeiras 6 h; então dobrar a dose EV (até 400–600 mg/dia de furosemida) e, se persistir, associar outro diurético.\n4) Vasodilatador se PAS > 110 mmHg (alivia sintomas): nitroglicerina EV iniciando em 10–20 mcg/min, aumentando a cada 3–5 min até 200 mcg/min (bomba: nitroglicerina). Não usar se PAS < 90 mmHg, estenose aórtica grave ou inibidor da fosfodiesterase-5 (sildenafila ou vardenafila em 24 h, tadalafila em 48 h).\n5) Hipotensão (PAS < 90 mmHg) com má perfusão: não usar vasodilatador; noradrenalina se choque e dobutamina 2–20 mcg/kg/min se baixo débito (bombas do painel); chamar a regulação para UTI.\n6) Morfina não é recomendada de rotina.\n7) Buscar e tratar o desencadeante (SCA, arritmia, infecção, má adesão, HAS).",
  "orient": "",
  "fontes": [
   "Køber L, Adamo M et al. 2026 ESC Guidelines for the management of heart failure (Eur Heart J 2026; doi:10.1093/eurheartj/ehag100) — insuficiência cardíaca descompensada: diurético guiado pelo sódio urinário nos primeiros dias, vasodilatador se PA elevada, iSGLT2 após a estabilização.",
   "Mullens W et al. The use of diuretics in heart failure with congestion — a position statement from the HFA of the ESC (Eur J Heart Fail 2019;21:137) — furosemida 20–40 mg ou 1–2 vezes a dose oral; sódio urinário em 2 h e diurese em 6 h.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 34, Insuficiência cardíaca aguda (nitroglicerina 10–200 mcg/min).",
   "Bula da dobutamina 12,5 mg/mL registrada na Anvisa (habitual 2,5–10; frequentemente até 20 mcg/kg/min).",
   "Canadian Cardiovascular Society — Acute HF (doses de furosemida). https://www.cardioguide.ca/acute-hf/"
  ],
  "rev": [
   "Corrigido (2026-10-17): ESC 2021 substituída pela ESC 2026 (Køber, Adamo et al.); resposta ao diurético guiada pelo sódio urinário em 2 h e pela diurese em 6 h; contraindicações da nitroglicerina; conduta no perfil com hipotensão e má perfusão (ESC 2026; HFA 2019; HC-FMUSP 18ª ed., cap. 34; bula da dobutamina).",
   "Item novo."
  ]
 },
 {
  "id": "tep",
  "nome": "TEP / TVP",
  "cat": "cardio",
  "cid": "I26.9",
  "sin": "embolia pulmonar trombose venosa profunda tev anticoagulacao",
  "casa": "# TVP ou TEP de baixo risco com alta (Hestia negativo ou sPESI 0; categoria A–B da AHA/ACC 2026):\nUso oral\n1) Rivaroxabana 15 mg ------------------------ 42 cp\nTomar 1 cp VO de 12/12h, com alimento, por 21 dias.\n2) Rivaroxabana 20 mg ------------------------ 30 cp\nA partir do 22º dia: tomar 1 cp VO 1 vez ao dia, com alimento, por pelo menos 3 meses (manter até a reavaliação).\nOu\n1) Apixabana 5 mg ---------------------------- 88 cp\nTomar 2 cp (10 mg) VO de 12/12h por 7 dias. Depois, 1 cp (5 mg) de 12/12h, por pelo menos 3 meses (88 cp cobrem a 1ª semana e os 30 dias seguintes; renovar a receita na reavaliação).",
  "avisoRx": ["Anticoagulante oral direto: não usar na gestação e lactação, na síndrome antifosfolípide (sobretudo triplo-positiva) e com ClCr < 15 mL/min.","Rivaroxabana: evitar abaixo de 30 mL/min no tratamento. Nesses casos, enoxaparina ou varfarina conforme o caso."],
  "unidade": "1) Probabilidade clínica: Wells ou Genebra. Baixa probabilidade: aplicar PERC.\n2) Baixa/intermediária: D-dímero; > 50 anos usar corte ajustado (idade × 10 mcg/L). D-dímero negativo exclui.\n3) Alta probabilidade ou D-dímero positivo: angio-TC de tórax (TVP: USG com Doppler).\n4) Probabilidade alta/intermediária: iniciar anticoagulação enquanto aguarda o exame.\n   Enoxaparina 1 mg/kg SC de 12/12h (preferida à heparina não fracionada). Heparina não fracionada se instabilidade, candidato a reperfusão ou ClCr < 30 mL/min: 80 unidades/kg EV em bolus + 18 unidades/kg/h, ajustando pelo TTPa.\n5) Estratificar: sPESI, disfunção de VD (TC/eco), troponina.\n6) TEP de alto risco (hipotensão persistente ou choque; categoria E da AHA/ACC 2026): trombólise sistêmica — alteplase 100 mg EV em 2 h, suspendendo a heparina durante a infusão e reiniciando quando o TTPa cair abaixo de 2 vezes o controle. Parada cardíaca por TEP provável: considerar trombólise (alteplase; dose não padronizada nas diretrizes — o esquema mais usado é 50 mg EV em bolus) e manter a RCP por pelo menos 60–90 min (ESC 2019; AHA 2025, Parte 10). Normotenso com sinais de falência iminente (categoria D): discutir terapia avançada com centro de referência.",
  "orient": "- Volte imediatamente ao pronto-socorro se tiver sangramento, falta de ar que piora, dor no peito ou desmaio.\n- Avise o médico se estiver grávida, amamentando ou se engravidar durante o tratamento.",
  "fontes": [
   "American Heart Association. Part 10: Special Circumstances of Resuscitation — 2025 AHA Guidelines for CPR and ECC (Circulation 2025): TEP provável na PCR, trombólise e RCP prolongada; dose não padronizada.",
   "Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism (Eur Heart J 2020;41:543). https://academic.oup.com/eurheartj/article/41/4/543/5556136",
   "Creager MA et al. 2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN Guideline for the Evaluation and Management of Acute Pulmonary Embolism in Adults (Circulation 2026;153:e977) — categorias clínicas A–E, HBPM preferida à HNF, anticoagulante oral direto preferido à varfarina, trombólise só nas categorias D–E.",
   "Bulas do Xarelto (rivaroxabana, Bayer) e do Eliquis (apixabana, BMS/Pfizer) registradas na Anvisa — esquemas de ataque e contraindicações.",
   "Bula do Actilyse (alteplase) registrada na Anvisa e bula FDA do Activase — TEP: 100 mg em 2 h, heparina reiniciada quando o TTPa cair abaixo de 2 vezes o controle.",
   "Garcia DA et al. Parenteral anticoagulants — ACCP 9ª ed. (Chest 2012;141:e24S) — heparina não fracionada 80 unidades/kg + 18 unidades/kg/h no TEV."
  ],
  "rev": [
   "Corrigido (2026-10-17): receita com a fase de manutenção e quantidades (rivaroxabana 20 mg; apixabana 60 cp); contraindicações dos anticoagulantes orais diretos; dose da heparina não fracionada; trombólise com heparina suspensa e reiniciada pelo TTPa, PCR por TEP e categorias da AHA/ACC 2026; resumo do ACC retirado (AHA/ACC 2026; ESC 2019; bulas Xarelto, Eliquis e Actilyse; ACCP 2012).",
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
  "avisoRx": ["Use a Calculadora para a taxa de insulina por peso."],
  "unidade": "Critérios (consenso ADA/EASD/JBDS 2024):\n- CAD: glicemia ≥ 200 mg/dL (ou DM prévio) + cetonemia (beta-hidroxibutirato ≥ 3 mmol/L ou cetonúria ≥ 2+) + acidose (pH < 7,3 e/ou bicarbonato < 18).\n- EHH: glicemia ≥ 600 mg/dL + osmolalidade efetiva > 300 mOsm/kg + beta-hidroxibutirato < 3 + pH ≥ 7,3 e bicarbonato ≥ 15.\n\nTratamento:\n1) Hidratação: soro fisiológico 0,9% ou cristaloide balanceado 500–1.000 mL/h nas primeiras 2–4h.\n2) Potássio antes da insulina:\n   - K < 3,5: não iniciar a insulina; repor 10 mmol/h até K > 3,5.\n   - K 3,5–5,0: iniciar a insulina e pôr 20–30 mmol de K por litro de soro (1 ampola de KCl 19,1% = 25 mEq por litro), para manter K entre 4 e 5.\n   - K > 5,0: insulina sem potássio; dosar K a cada 2 h.\n3) Insulina regular EV em bomba:\n   - CAD moderada ou grave: 0,1 unidade/kg/h.\n   - CAD leve ou moderada, sem complicação e consciente: alternativa com análogo rápido SC 0,1 unidade/kg a cada 1 h ou 0,2 unidade/kg a cada 2 h.\n   - EHH: 0,05 unidade/kg/h.\n4) Glicemia < 250 mg/dL: associar soro glicosado 5–10%.\n5) Bicarbonato só se pH < 7,0.\n6) Transição para SC: iniciar insulina basal 1–2h antes de desligar a bomba.\n7) Buscar desencadeante (infecção, omissão de insulina, iSGLT2, IAM).",
  "orient": "",
  "fontes": [
   "Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (Diabetes Care 2024;47:1257). https://diabetesjournals.org/care/article/47/8/1257/156808/",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 89, Hiperglicemias (potássio antes da insulina; KCl 19,1% = 25 mEq por ampola).",
   "Resumo do Cleveland Clinic Journal of Medicine 2025. https://www.ccjm.org/content/92/3/152"
  ],
  "rev": [
   "Corrigido (2026-10-17): faixa de potássio igual ao protocolo e ao consenso (K < 3,5 sem insulina; 3,5–5,0 com 20–30 mmol/L; > 5,0 sem potássio); bomba de insulina na CAD moderada ou grave e análogo SC só na leve ou moderada sem complicação; \"U\" → \"unidades\" (ISMP) (consenso ADA/EASD/JBDS/AACE/DTS 2024; HC-FMUSP 18ª ed., cap. 89).",
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
  "unidade": "Gravidade: leve 5,5–5,9 | moderada 6,0–6,4 | grave ≥ 6,5 mmol/L.\n1) ECG imediato e monitorização.\n2) Alterações no ECG: gluconato de cálcio 10% 30 mL EV em 10 min (em PCR/peri-PCR: cloreto de cálcio 10% 10 mL em 5 min). Repetir se o ECG não melhorar.\n3) Deslocar o K para dentro da célula:\n   - Insulina regular 10 unidades + 25 g de glicose EV em 15 min (ex.: 10 unidades em 50 mL de glicose 50%).\n   - Se glicemia prévia < 126 mg/dL (7 mmol/L): manter glicose 10% 50 mL/h por 5h.\n   - Monitorar glicemia em 0, 30, 60, 90, 120, 180, 240, 300 e 360 min.\n   - Grave: salbutamol nebulizado 10–20 mg como adjuvante (nunca isolado).\n4) Bicarbonato de sódio EV não é recomendado de rotina.\n5) Remover o K: suspender fármacos causadores, diurético se volemia permitir, diálise se refratária.",
  "orient": "",
  "fontes": [
   "UK Kidney Association. Clinical Practice Guideline: Treatment of Acute Hyperkalaemia in Adults, atualização de julho de 2026 (doses iguais às de 2023; cálcio EV 30 mL de gluconato 10% em 10 min ou 10 mL de cloreto 10% em 5 min, recomendação 2C). https://www.ukkidney.org/sites/default/files/documents/FINAL%20VERSION%20-%20UKKA%20CLINICAL%20PRACTICE%20GUIDELINE%20-%20MANAGEMENT%20OF%20HYPERKALAEMIA%20IN%20ADULTS%20-%20UPDATED%20JULY%202026_0.pdf",
   "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024 — cap. 84, Hipercalemia."
  ],
  "rev": [
   "Corrigido (2026-10-17): UKKA julho de 2026 (doses sem mudança); \"U\" → \"unidades\" na insulina (UKKA 2026; ISMP Brasil 2015; HC-FMUSP 18ª ed., cap. 84).",
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
  "unidade": "1) Dois acessos calibrosos, reposição volêmica, tipagem, hemograma, coagulograma, função renal.\n2) Escore de Glasgow-Blatchford: 0–1 = muito baixo risco, pode ter alta com seguimento ambulatorial.\n3) Transfusão restritiva: hemácias se Hb < 7 g/dL; alvo 7 a 8 g/dL na suspeita de varizes (não passar de 8). Limiar de 8 g/dL em doença cardiovascular. Não usar ácido tranexâmico.\n4) Eritromicina 250 mg EV 30–120 min antes da endoscopia.\n5) Endoscopia em até 24h (varizes suspeitas: até 12h, após estabilização).\n6) Suspeita de úlcera: omeprazol 80 mg EV em bolus já na chegada, sem atrasar a endoscopia (ESGE 2021). Após a hemostasia endoscópica: omeprazol 40 mg EV de 12/12h, ou 80 mg em bolus + 8 mg/h, por 72 h (ACG 2021).\n7) Suspeita de varizes (cirrose):\n   - Vasoativo já na chegada, por 2 a 5 dias (escolher um):\n     Terlipressina EV de 4/4h pelo peso (bula Anvisa): ≤ 50 kg 1 mg; 50–70 kg 1,5 mg; > 70 kg 2 mg (máx. 120–150 mcg/kg/dia); o Baveno VII usa 2 mg fixos. Não usar na gestação nem com evento isquêmico nos últimos 3 meses; evitar em doença coronariana ou arterial periférica.\n     Ou Octreotida 50 mcg EV em bolus + 50 mcg/h em infusão contínua.\n     Ou Somatostatina 250 mcg EV em bolus + 250 mcg/h em infusão contínua (até 500 mcg/h).\n   - Ceftriaxona 1 g EV 1x/dia por até 7 dias.",
  "orient": "",
  "fontes": [
   "Laine L et al. ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding (Am J Gastroenterol 2021;116:899). https://pubmed.ncbi.nlm.nih.gov/33929377/",
   "Gralnek IM et al. ESGE Guideline: Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage — Update 2021 (Endoscopy 2021;53:300).",
   "Gralnek IM et al. ESGE 2022: Endoscopic diagnosis and management of esophagogastric variceal hemorrhage (Endoscopy 2022). https://www.esge.com/assets/downloads/pdfs/guidelines/2022_a-1939-4887.pdf",
   "de Franchis R et al. Baveno VII — Renewing consensus in portal hypertension (J Hepatol 2022;76:959): vasoativo por 2–5 dias, ceftriaxona 1 g/dia por até 7 dias, hemoglobina alvo 7–8 g/dL, endoscopia em até 12 h.",
   "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024 — cap. 74, Hemorragia digestiva alta (doses de terlipressina, somatostatina, octreotida e IBP).",
   "Bula Anvisa da terlipressina (Glypressin, Ferring): dose por peso a cada 4 h (≤ 50 kg 1 mg; 50–70 kg 1,5 mg; > 70 kg 2 mg), máximo de 120–150 mcg/kg/dia; contraindicada na gestação e com evento isquêmico nos últimos 3 meses; uso por até 48 h (Baveno VII aceita 2 a 5 dias). Decisão do médico (2026-10-17): seguir a bula.",
   "HALT-IT Trial Collaborators. Effects of a high-dose 24-h infusion of tranexamic acid on death and thromboembolic events in patients with acute gastrointestinal bleeding (Lancet 2020;395:1927): sem redução de mortalidade e mais trombose venosa."
  ],
  "rev": [
   "Corrigido (2026-10-17): doses do vasoativo (terlipressina pelo peso, conforme a bula Anvisa, octreotida ou somatostatina, por 2 a 5 dias) e do omeprazol (80 mg EV na chegada; depois 40 mg de 12/12h ou infusão por 72 h); alvo de hemoglobina 7 a 8 g/dL nas varizes; não usar ácido tranexâmico (Baveno VII; ESGE 2021; ACG 2021; HC-FMUSP 18ª ed., cap. 74; bula Glypressin; HALT-IT).",
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
  "avisoRx": ["Alta só com dor controlada, exame sem peritonite e sinais vitais normais; beta-hCG negativo na mulher em idade fértil.","Febre nos últimos 7 dias com dor abdominal intensa e contínua: dengue com sinal de alarme; não usar anti-inflamatório."],
  "unidade": "1) Sinais de alarme: instabilidade, peritonite, dor desproporcional ao exame (isquemia mesentérica), idoso, imunossuprimido, gestante. Febre nos últimos 7 dias com dor abdominal intensa e contínua: dengue com sinal de alarme (grupo C) até prova em contrário; não usar anti-inflamatório.\n2) Beta-hCG em toda mulher em idade fértil.\n3) ECG em idosos/dor epigástrica (SCA pode se apresentar como dor abdominal).\n4) Analgesia precoce não atrasa nem mascara o diagnóstico: dipirona 1 g EV lenta (no máximo 1 mL/min, paciente deitado). Se intensa: morfina 0,05 mg/kg (cerca de 2,5 a 5 mg) EV lenta, repetir a cada 20 min até controlar a dor (diluir 10 mg em 9 mL = 1 mg/mL). Idoso e doente renal: começar com metade.\n5) Exames e imagem conforme a hipótese (USG, TC).",
  "orient": "- Volte imediatamente ao pronto-socorro se a dor piorar, ficar contínua ou mudar de lugar (principalmente para o lado direito, embaixo), se a barriga ficar dura, se tiver vômitos que não param ou com sangue, febre, parada de gases e fezes, fezes pretas ou com sangue, desmaio, sangramento vaginal ou atraso menstrual.\n- Se teve febre nos últimos 7 dias e está com dor forte e contínua na barriga, volte imediatamente: pode ser sinal de alarme da dengue. Não use anti-inflamatório.",
  "fontes": [
   "Manterola C, Vial M, Moraga J, Astudillo P. Analgesia in patients with acute abdominal pain (Cochrane Database Syst Rev 2011;CD005660): opioides não aumentaram erro diagnóstico.",
   "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024 — cap. 25, Dor abdominal (sinais de alarme, beta-hCG, ECG, morfina 0,05 mg/kg a cada 20 min).",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024.",
   "Cartwright SL, Knudson MP. Evaluation of acute abdominal pain in adults (Am Fam Physician 2008;77:971): dor que migra, peritonite, obstrução, sangramento, gravidez ectópica."
  ],
  "rev": [
   "Corrigido (2026-10-17): orientação de alta e de retorno (dor que piora, fica contínua ou migra, abdome rígido, vômitos, febre, parada de gases e fezes, sangramento, síncope, sangramento vaginal ou atraso menstrual) e alerta de dengue (HC-FMUSP 18ª ed., cap. 25; Cartwright & Knudson, AFP 2008; MS Dengue 2024).",
   "Corrigido (2026-10-17): morfina 0,1 → 0,05 mg/kg EV a cada 20 min, com metade no idoso e no doente renal; dipirona EV lenta (HC-FMUSP 18ª ed., cap. 25; fichas morfina e dipirona); febre com dor abdominal intensa entra como alarme de dengue (MS, Dengue, 6ª ed., 2024).",
   "Item novo."
  ]
 },
 {
  "id": "tce",
  "nome": "TCE leve",
  "cat": "dor",
  "cid": "S06.0",
  "sin": "traumatismo cranioencefalico concussao batida cabeca queda",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor de cabeça (no máximo 8 cp por dia).",
  "avisoRx": ["Alta com um adulto que fique junto nas primeiras 24 h."],
  "unidade": "Regra canadense de TC de crânio (adulto ≥ 16 anos, Glasgow 13–15 com perda de consciência, amnésia ou desorientação testemunhada).\nTC indicada se qualquer um:\nAlto risco (lesão neurocirúrgica):\n- Glasgow < 15 duas horas após o trauma\n- Suspeita de fratura aberta ou com afundamento\n- Sinal de fratura de base de crânio (hemotímpano, olhos de guaxinim, rinorreia/otorreia liquórica, sinal de Battle)\n- Vômitos ≥ 2 episódios\n- Idade ≥ 65 anos\nMédio risco (lesão na TC):\n- Amnésia retrógrada ≥ 30 min\n- Mecanismo perigoso (atropelamento, ejeção do veículo, queda > 1 m ou > 5 degraus)\n\nA regra não se aplica (exclusões): < 16 anos, uso de anticoagulante ou coagulopatia, convulsão pós-trauma, fratura aberta evidente. Anticoagulado (varfarina, rivaroxabana, apixabana, dabigatrana, heparina) ou com coagulopatia: fazer TC, mesmo sem outro critério (idealmente em até 8 h). Convulsão ou fratura aberta: TC.\nCriança: usar a regra PECARN.",
  "orient": "- Fique acompanhado de um adulto nas primeiras 24 horas.\n- Volte imediatamente ao pronto-socorro se a dor de cabeça piorar, se tiver vômitos repetidos, sono difícil de despertar, confusão, convulsão, fraqueza, alteração da fala ou da visão, ou saída de líquido claro pelo nariz ou pelo ouvido.\n- Evite bebida alcoólica e calmantes até melhorar.\n- Esporte de contato só depois de pelo menos 3 semanas e sem sintomas; volte às atividades aos poucos.",
  "fontes": [
   "Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury (Lancet 2001;357:1391). https://pubmed.ncbi.nlm.nih.gov/11356436/",
   "Valente JH et al. Clinical Policy: Critical Issues in the Management of Adult Patients Presenting to the Emergency Department With Mild Traumatic Brain Injury — ACEP (Ann Emerg Med 2023;81:e63). https://pubmed.ncbi.nlm.nih.gov/37085214/",
   "NICE NG232. Head injury: assessment and early management, 2023 (TC em até 8 h para anticoagulado, exceto AAS isolado; alta com adulto responsável nas primeiras 24 h e sinais para retorno).",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 63, Traumatismo cranioencefálico.",
   "Ficha dipirona: máximo de 4 g por dia (EMA 2024).",
   "NHS. Head injury and concussion (revisado em 29/05/2025): não praticar esporte de contato por pelo menos 3 semanas. https://www.nhs.uk/conditions/head-injury-and-concussion/"
  ],
  "rev": [
   "Corrigido (2026-10-17): esporte de contato só após pelo menos 3 semanas e sem sintomas (NHS Head injury and concussion 2025; NICE NG232 2023).",
   "Corrigido (2026-10-17): TC para todo anticoagulado ou com coagulopatia, mesmo sem outro critério (antes: baixo limiar); teto da dipirona (8 cp por dia); adulto junto nas primeiras 24 h e o que evitar; fontes completas (NICE NG232 2023; ACEP 2023; HC-FMUSP 18ª ed.).",
   "Item novo."
  ]
 },
 {
  "id": "entorse",
  "nome": "Entorse de tornozelo",
  "cat": "dor",
  "cid": "S93.4",
  "sin": "torcao pe tornozelo trauma musculoesqueletico",
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\n\nUso tópico\n3) Diclofenaco dietilamônio gel -------------- 1 bisnaga\nAplicar no local 3 a 4x ao dia por até 7 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue; não usar na gestação nem na doença renal.","Diclofenaco gel: alternativa ao AINE oral.","Tratamento funcional (órtese e carga conforme tolerância) é preferível à imobilização rígida."],
  "unidade": "Regras de Ottawa — RX indicado se dor maleolar/mediopé E qualquer um:\n- Dor à palpação dos 6 cm distais da borda posterior ou ponta do maléolo lateral ou medial.\n- Dor à palpação da base do 5º metatarso ou do navicular.\n- Incapacidade de dar 4 passos (logo após o trauma e na emergência).",
  "orient": "- Coloque gelo por 15 a 20 minutos, várias vezes ao dia, nos primeiros dias, e mantenha a perna elevada.\n- Use a tornozeleira ou órtese indicada. Poupe o pé nos primeiros 1 a 2 dias e depois volte a apoiar aos poucos, conforme a dor.\n- Comece cedo os exercícios de movimento e de equilíbrio do tornozelo.\n- Volte ao pronto-socorro se o pé ficar frio, pálido ou arroxeado, se tiver dormência, piora importante da dor ou do inchaço, ou se não conseguir apoiar o pé.\n- Se a dor ou a sensação de tornozelo frouxo continuar, volte para reavaliação em 3 a 5 dias.",
  "fontes": [
   "Bachmann LM et al. Accuracy of Ottawa ankle rules to exclude fractures: systematic review (BMJ 2003;326:417). https://www.ncbi.nlm.nih.gov/books/NBK69576/",
   "Stiell IG et al. Decision rules for the use of radiography in acute ankle injuries: refinement and prospective validation (JAMA 1993;269:1127).",
   "Vuurberg G et al. Diagnosis, treatment and prevention of ankle sprains: update of an evidence-based clinical guideline (Br J Sports Med 2018;52(15):956): tratamento funcional melhor que imobilização; AINE por curto período para dor e edema; reexame em 3–5 dias. https://doi.org/10.1136/bjsports-2017-098106",
   "Ficha dipirona: máximo de 4 g por dia (EMA 2024).",
   "NHS. Sprains and strains (revisado em 23/04/2024): emergência se dormência ou formigamento, pele azulada ou fria, deformidade; procurar atendimento se não consegue apoiar ou o inchaço piora. https://www.nhs.uk/conditions/sprains-and-strains/",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue."
  ],
  "rev": [
   "Corrigido (2026-10-17): ibuprofeno por até 5 dias com ressalva de dengue, gestação e doença renal (MS Dengue 2024; padrão das demais condutas); orientação de poupar o pé 1 a 2 dias e depois apoiar aos poucos, e sinais de retorno (Vuurberg BJSM 2018; NHS Sprains and strains 2024).",
   "Corrigido (2026-10-17): teto da dipirona (8 cp por dia); fontes completas (Ottawa, Stiell 1993; Vuurberg 2018; ficha dipirona).",
   "Item novo."
  ]
 },
 {
  "id": "escorpiao",
  "nome": "Acidente escorpiônico",
  "cat": "toxinf",
  "cid": "T63.2",
  "sin": "escorpiao picada escorpionismo",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor.",
  "avisoRx": ["Receita só nos casos leves, após observação.","Notificação compulsória (SINAN)."],
  "unidade": "Classificação e soroterapia (SAEsc; SAA só na falta dele ou na dúvida com aranha-armadeira), mesma dose em qualquer idade:\n- Leve (dor, eritema, parestesia, sudorese local; às vezes náusea, vômito, agitação e taquicardia discretos, ligados à dor): sem soro.\n- Moderado (sudorese, náuseas, alguns vômitos, alteração leve da FC ou da PA, agitação): 3 frascos-ampolas EV, de imediato.\n- Grave (vômitos repetidos, sudorese profusa, sialorreia, agitação alternada com sonolência, taquidispneia, priapismo, convulsões, ICC, EAP, choque): 6 frascos-ampolas EV (não passar de 6).\n\nAdministração: diluir em SF 0,9% ou SG 5% de 1:2 a 1:5; infundir em 10–15 min (8–12 mL/min), atento à sobrecarga hídrica na criança. Intraóssea se não houver acesso venoso. SAA: infundir em 20–60 min. Reação: suspender, tratar e retomar.\n\nAnalgesia:\n- Dor leve: dipirona VO. Moderada: dipirona EV.\n- Intensa: associar infiltração local de lidocaína 2% sem vasoconstritor, que pode ser repetida até 3 vezes com intervalo de 40–60 min.\n- Recidiva: associar opioide fraco. Compressa morna no local.\n\nSuporte: antiemético se os vômitos persistirem após o soro (metoclopramida tem uso restrito em crianças) | HAS costuma ser transitória, tratar só se persistir após o soro | EAP: O2 e furosemida EV | choque: dobutamina (noradrenalina se o choque for misto, com cautela em crianças) | mioclonia (escorpiões da Amazônia): diazepam.\n\nObservação: sem manifestações 4 h | leve 6–12 h | com soro, pelo menos 24 h. Grave: monitorização contínua (UTI se possível).\nCrianças até 10 anos (sobretudo abaixo de 7) e portadores de HAS, DM, cardiopatia ou nefropatia têm maior risco de formas graves.\nNão usar: torniquete, substâncias no local, corticoide ou anti-histamínico profilático, dexametasona, antibiótico profilático.\nExames só se houver manifestação sistêmica (a falta deles não atrasa o soro): ECG na admissão (sobretudo em crianças), hemograma, glicemia, eletrólitos (K), amilase, gasometria, ureia, creatinina, RX de tórax. Se houver suspeita de miocardite: CK-MB, troponina, ecocardiograma.",
  "orient": "- Lave o local com água e sabão e faça compressa morna para aliviar a dor.\n- Volte imediatamente ao pronto-socorro se tiver vômitos, suor intenso, sonolência ou falta de ar, principalmente em crianças.\n- Em caso de dúvida, ligue para o Disque-Intoxicação: 0800 722 6001.",
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
  "avisoRx": ["Notificação compulsória (SINAN) em até 24 h.","Dúvidas: CIATox (Disque-Intoxicação 0800 722 6001)."],
  "unidade": "1) Não usar garrote/torniquete e não fazer incisão no local. Lavar com água e sabão e depois SF 0,9%. Manter o membro elevado e estendido; retirar anéis e pulseiras.\n2) Exames: tempo de coagulação, TP/TTPa, hemograma com plaquetas, ureia, creatinina, eletrólitos, CK e urina (mioglobina), sobretudo no crotálico e no elapídico.\n3) Soro antiveneno EV o mais cedo possível, conforme gênero e gravidade (frascos-ampolas; mesma dose em adultos e crianças):\n   - Botrópico (jararaca), SABR: leve (edema de até 1 segmento) 3 | moderado (2 segmentos) 6 | grave (3 segmentos, hemorragia grave, choque ou IRA) 12.\n   - Crotálico (cascavel), SAC ou SABC: leve 5 | moderado 10 | grave 20.\n   - Laquético (surucucu), SABL: moderado 10 | grave (hemorragia intensa ou manifestações vagais) 20.\n   - Elapídico (coral), SAELA: leve (só parestesia e dor local) sem soro, observar 24 h e dar soro se surgir miastenia | moderado (ptose, fraqueza sem paralisia) 5 | grave (paralisia, disfagia, respiração superficial) 10.\n   Segmentos: mão/punho, antebraço/cotovelo, braço (pé/tornozelo, perna/joelho, coxa).\n4) Administração: diluir em SF 0,9% ou SG 5% (antielapídico 1:2 a 1:5); infundir a 8–12 mL/min, atento à sobrecarga de volume; dose inteira de uma vez, sem fracionar. Sem pré-medicação e sem teste de sensibilidade.\n5) Reação ao soro: suspender, tratar (adrenalina é a prioridade) e retomar assim que houver remissão.\n6) Dor: dipirona ou paracetamol. Não usar AINE. Evitar IM; não fazer bloqueio anestésico nem medicação no local; acesso EV fora do membro picado.\n7) Hidratação para manter boa diurese (risco de IRA). Antibiótico só se houver infecção estabelecida. Profilaxia antitetânica conforme vacinação.\n8) Observação: sem sintomas, pelo menos 6 h | com soro, pelo menos 24 h | crotálico, 24 a 72 h | elapídico, pelo menos 24 h. Botrópico com TC alterado 24 h após o soro: mais 2 frascos. Piora: reclassificar e completar a dose.\n9) Elapídico com paralisia: suporte ventilatório; neostigmina precedida de atropina, com dose orientada pelo CIATox.",
  "orient": "- Não tente capturar nem matar a serpente; se possível, fotografe-a a uma distância segura.\n- Em caso de dúvida, ligue para o Disque-Intoxicação: 0800 722 6001.",
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
  "avisoRx": ["Notificação no SINAN: intoxicação exógena, semanal; tentativa de suicídio, imediata (até 24 h) à Secretaria Municipal de Saúde.","Fonte da notificação: Portaria GM/MS nº 5.201/2024.","Salve no aparelho o telefone do CIATox da sua região (botão no cartão Agora)."],
  "unidade": "1) Via aérea, O2, monitor, acesso venoso; glicemia capilar (baixa: glicose 50% 50 mL EV + tiamina 100 mg EV no etilista ou desnutrido, sem atrasar a glicose); ECG (QRS > 100 ms? QTc > 500 ms?) e temperatura. Hipotensão: cristaloide 10–20 mL/kg.\n2) Ligar para o CIATox: Disque-Intoxicação 0800 722 6001 (24h, gratuito). Ingestão intencional: dosar paracetamol (e salicilato), mesmo sem sintomas.\n3) Carvão ativado dose única, se ingestão de quantidade tóxica há até 1 h e paciente acordado (ou já intubado): 1 g/kg VO ou por sonda, em água (máx. 50 g), adulto e criança; a AACT/EAPCCT aceita 25–100 g no adulto.\n   Não usar: via aérea não protegida, hidrocarboneto, corrosivo, risco de sangramento ou perfuração, obstrução intestinal. Não intubar só para dar carvão.\n   Adsorve mal: ferro, lítio, metais pesados, ácidos e álcalis. Não provocar vômito; lavagem gástrica não é rotina.\n4) Opioide com FR < 12 ou apneia: ventilar e naloxona 0,4–2 mg EV a cada 2–3 min, titulando até respirar bem (dependente de opioide: começar com 0,04 mg). Sem resposta com 10 mg: rever o diagnóstico. Sem acesso: IM ou SC. Infusão: 2/3 da dose que fez respirar, por hora.\n5) Flumazenil não é rotina: só na depressão respiratória por benzodiazepínico puro, sem uso crônico, sem epilepsia e sem tricíclico: 0,2 mg EV em 15 s, depois 0,1 mg/min até 1 mg.\n6) Paracetamol: nível com 4–24 h no nomograma (linha de 150). Na linha ou acima: N-acetilcisteína EV 150 mg/kg em 1 h, 50 mg/kg em 4 h e 100 mg/kg em 16 h (peso de cálculo até 100 kg). Iniciar sem esperar o nível se hora desconhecida, várias tomadas, chegada após 8 h, sinal de lesão hepática ou, se o nível só sairá depois de 8 h, dose > 150 mg/kg ou > 10 g.\n7) Tricíclico com QRS > 100 ms, arritmia ou hipotensão: bicarbonato de sódio 8,4% 1–2 mEq/kg EV em bolus (alvo pH 7,45–7,55, sódio ≤ 155); convulsão: benzodiazepínico, sem fenitoína.\n8) Organofosforado ou carbamato: atropina 1–2 mg EV dobrando a cada 5 min até secar o pulmão; depois infusão de 10–20% da dose total por hora (até 2 mg/h); intubação sem succinilcolina; pralidoxima com o CIATox.\n9) Sulfonilureia com hipoglicemia: glicose 50% 50 mL EV e octreotide 50 mcg SC ou EV, depois 50 mcg de 6/6h (fora da bula); sem hipoglicemia, não dar glicose preventiva.\n10) Simpaticomimético (cocaína, anfetamina) com agitação e hipertermia: benzodiazepínico e resfriamento rápido (imersão).\n11) Observar pelo menos 6 h; mais tempo com liberação prolongada, sintomas ou antídoto (naloxona: 3–4 h após a última dose; metadona ou adesivo: 24 h).\n12) Tentativa de suicídio: avaliação psiquiátrica e medidas de segurança antes da alta.",
  "orient": "",
  "fontes": [
   "American Heart Association. Part 10: Special Circumstances of Resuscitation — 2025 AHA Guidelines for CPR and ECC (Circulation 2025), tabela 4: naloxona, flumazenil, bicarbonato no tricíclico, atropina no organofosforado, resfriamento no simpaticomimético.",
   "Dart RC et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement (JAMA Netw Open 2023;6:e2327739). https://doi.org/10.1001/jamanetworkopen.2023.27739",
   "Bula do Fluimucil injetável (acetilcisteína 100 mg/mL), Zambon, Anvisa 12/12/2023; bula FDA do Acetadote, 2025.",
   "Bula do Narcan (naloxona 0,4 mg/mL), Anvisa 01/06/2026; bula do Flumazil (flumazenil 0,1 mg/mL), Cristália.",
   "Centre antipoison du Québec. Antidotes — Activated charcoal, 2026: 1 g/kg, máx. 50 g. https://www.ciusss-capitalenationale.gouv.qc.ca/en/antidotes/activated-charcoal",
   "Glatstein M et al. Octreotide for the treatment of sulfonylurea poisoning (Clin Toxicol 2012;50:795); Klein-Schwartz W et al. (Clin Toxicol 2016;54:295).",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — caps. 99 a 102 (manejo inicial, álcoois e drogas de abuso, fármacos, pesticidas).",
   "Loscalzo J et al. (eds.) Harrison's Principles of Internal Medicine, 22ª ed., 2025 — cap. 470, Poisoning and Drug Overdose.",
   "Brasil. Ministério da Saúde. Portaria GM/MS nº 5.201/2024 — lista nacional de notificação compulsória.",
   "AACT/EAPCCT. Position Paper: Single-Dose Activated Charcoal. https://eapcct.org/wp-content/uploads/2024/09/PS_SingleDoseActivatedCharcoal.pdf",
   "Anvisa. Disque-Intoxicação 0800 722 6001. https://www.gov.br/anvisa/pt-br/assuntos/agrotoxicos/disque-intoxicacao"
  ],
  "rev": [
   "Atualizado (2026-10-16): carvão 1 g/kg, máx. 50 g (decisão do médico); doses de naloxona e N-acetilcisteína; flumazenil, tricíclico, organofosforado, sulfonilureia e simpaticomimético; observação; notificação detalhada; fontes AHA 2025 e consenso 2023 — coerente com o cartão Agora.",
   "Item novo."
  ]
 },
 {
  "id": "queimadura",
  "nome": "Queimaduras",
  "cat": "pele",
  "cid": "T30.0",
  "sin": "queimado escaldadura fogo",
  "casa": "Uso tópico\n1) Sulfadiazina de prata 1% creme ------------ 1 bisnaga\nAplicar sobre a lesão após limpeza, 1 a 2x ao dia, com curativo.\n\nUso oral\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).",
  "avisoRx": ["Sulfadiazina em casa: queimaduras pequenas de 2º grau, com alta.","Sulfadiazina: não usar no fim da gestação, em recém-nascido até 2 meses nem com alergia a sulfa."],
  "unidade": "1) Interromper o processo: resfriar com água corrente em temperatura ambiente; não usar gelo.\n2) Calcular a superfície corporal queimada (SCQ) — regra dos nove (adulto) ou Lund-Browder (criança).\n3) Hidratação se SCQ > 20% no adulto ou > 10% na criança, com Ringer lactato:\n   Parkland: 2 mL × peso (kg) × % SCQ em 24h no adulto (criança: 3 mL; trauma elétrico: 4 mL), ajustando a velocidade pela diurese.\n   Metade nas primeiras 8h (a contar da queimadura) e metade nas 16h seguintes. Alvo de diurese 0,5–1 mL/kg/h (criança: 1 mL/kg/h; trauma elétrico: cerca de 1,5 mL/kg/h até clarear a urina). Sonda vesical se > 20% no adulto ou > 10% na criança.\n4) Analgesia: dipirona 500 mg–1 g EV; morfina 1 mg/10 kg (adulto) | criança: dipirona 15–25 mg/kg, morfina 0,1 mg/kg/dose.\n5) Limpeza com água e clorexidina 2%; sulfadiazina de prata 1%.\n6) Profilaxia antitetânica. Não usar antibiótico sistêmico profilático nem corticoide.\nEncaminhar a centro de queimados: 2º grau > 20% da superfície corporal no adulto ou > 10% em criança ou maior de 50 anos; 3º grau de qualquer extensão; face, olhos, períneo, mãos, pés ou grandes articulações; lesão inalatória; queimadura elétrica ou química; lesão circunferencial de tórax ou de membros; politrauma, doença associada grave, maus-tratos ou tentativa de suicídio.",
  "orient": "- Não fure as bolhas em casa.\n- Volte na data combinada para a troca do curativo.",
  "rev": [
   "Corrigido (2026-10-17): Parkland 2–4 mL → 2 mL × kg × % SCQ no adulto, 3 mL na criança e 4 mL no trauma elétrico, ajustando pela diurese (ATLS 10ª ed., cap. 9; ABA/ABLS 2023); critérios de transferência completos (cartilha MS 2012, item 12); diurese de 1–1,5 mL/kg/h na criança (ABA 2023) e cerca de 1,5 mL/kg/h no trauma elétrico, sonda vesical (cartilha MS, itens 2 e 5; ATLS); sem corticoide (cartilha MS, item 8); contraindicações da sulfadiazina (bula Dermazine); dipirona com no máximo 8 cp por dia (ficha dipirona).",
   "Item novo."
  ],
  "fontes": [
   "Ministério da Saúde. Cartilha para tratamento de emergência das queimaduras, 2012. https://portal.cfm.org.br/images/stories/pdf/queimados.pdf",
   "Cartotto R et al. American Burn Association Clinical Practice Guidelines on Burn Shock Resuscitation (J Burn Care Res 2024;45(3):565): iniciar com 2 mL × kg × % SCQ no adulto; diurese 0,5–1 mL/kg/h no adulto e 1–1,5 mL/kg/h na criança; manutenção somada na criança. O ATLS 11ª ed. (2025) adotou o início com 2 mL no adulto.",
   "American College of Surgeons. ATLS — Advanced Trauma Life Support, 10ª ed., 2018, cap. 9 (Thermal Injuries): Parkland começando com 2 mL × kg × % SCQ no adulto, 3 mL na criança e 4 mL no trauma elétrico; diurese 0,5 mL/kg/h no adulto e 1 mL/kg/h na criança < 30 kg.",
   "American Burn Association. Advanced Burn Life Support (ABLS) Provider Manual, 2023 — reposição inicial 2 mL × kg × % SCQ no adulto, ajustada pela diurese.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 69 — Queimaduras térmicas.",
   "Bula da sulfadiazina de prata 1% (Dermazine), registrada na Anvisa — contraindicada no fim da gestação, em prematuros e recém-nascidos até 2 meses e na alergia a sulfonamidas."
  ]
 },
 {
  "id": "pre-eclampsia",
  "nome": "Pré-eclâmpsia grave / Eclâmpsia",
  "cat": "gu",
  "cid": "O14.1",
  "sin": "gestante pressao alta eclampsia sulfato de magnesio hellp",
  "casa": "",
  "avisoRx": ["Encaminhar para maternidade de referência; decisão sobre o parto com a obstetrícia.","Transferência: fazer pelo menos o ataque do sulfato de magnésio (4 g EV + 10 g IM cobre cerca de 4 h).","Parto em qualquer IG se eclâmpsia, HELLP, descolamento de placenta, edema pulmonar ou hipertensão refratária a 3 fármacos.","Parto também se piora laboratorial ou alteração da vitalidade fetal.","Sem sinais de gravidade, parto com 37 semanas.","Puerpério: a PA pode piorar entre o 3º e o 6º dia; cerca de 30% das eclâmpsias ocorrem após o parto."],
  "unidade": "Sinais de gravidade: PA ≥ 160 e/ou 110 mmHg persistente por 15 min, iminência de eclâmpsia (cefaleia, alterações visuais, dor epigástrica, hiper-reflexia), eclâmpsia, HELLP, oligúria (< 500 mL/24 h), creatinina ≥ 1,0 mg/dL, edema pulmonar, dor torácica.\nDecúbito lateral esquerdo, acesso venoso, sonda vesical; hemograma com plaquetas, AST/ALT, LDH, bilirrubinas, creatinina.\n\nSulfato de magnésio (prevenção e tratamento da convulsão):\n- Ataque (Zuspan e Pritchard): 4 g EV = 8 mL de sulfato de magnésio 50% + 12 mL de água destilada, EV lento em 15–20 min (RBEHG 2023; o MS 2022 aceita 5–10 min).\n- Zuspan: manutenção 1 g/h EV em bomba.\n- Pritchard: além dos 4 g EV, 10 g IM no ataque (10 mL de sulfato de magnésio 50% IM profundo em cada nádega); depois 5 g (10 mL a 50%) IM profundo a cada 4 h. Útil para transporte ou sem bomba; evitar IM na HELLP com plaquetopenia.\n- Creatinina ≥ 1,0 mg/dL (RBEHG; MS: > 1,3): metade da dose de manutenção e dosar o magnésio.\n- Manter por 24 h após o parto ou a última convulsão.\n- Monitorar: reflexo patelar presente, FR ≥ 16, diurese ≥ 25 mL/h.\n- Nova convulsão durante o sulfato de magnésio: mais 2 g EV em bolus e manutenção a 2 g/h; sem controle, UTI e neuroimagem.\n- Intoxicação (depressão respiratória, arreflexia): parar o sulfato de magnésio; gluconato de cálcio 10% 10 mL (1 g) EV lento em cerca de 3 min; O2 e suporte ventilatório.\n\nCrise hipertensiva na gestação (PA ≥ 160/110, tratar em até 30–60 min):\n- Hidralazina 20 mg/mL: 1 amp + 19 mL de água destilada = 1 mg/mL; 5 mg EV a cada 20 min (máx. 30 mg).\n- Ou Nifedipino de liberação imediata 10 mg VO a cada 20–30 min (máx. 30 mg); não mastigar, não usar sublingual.\n- Meta: reduzir 15–25%, PAS 140–150 e PAD 90–100 mmHg.\n- Edema pulmonar ou refratária: nitroglicerina ou nitroprussiato EV (nitroprussiato por no máximo 4 h).",
  "orient": "",
  "fontes": [
   "Brasil. Ministério da Saúde. Manual de Gestação de Alto Risco, 2022 — cap. 11 (pré-eclâmpsia, HELLP, eclâmpsia e sulfato de magnésio; creatinina > 1,3 mg/dL: metade da manutenção). https://bvsms.saude.gov.br/bvs/publicacoes/manual_gestacao_alto_risco.pdf",
   "Sociedade Brasileira de Cardiologia. Diretriz Brasileira de Hipertensão Arterial 2025, cap. 10 (Arq Bras Cardiol 2025;122(9)).",
   "ACOG Committee Opinion 767. Emergent therapy for acute-onset, severe hypertension during pregnancy and the postpartum period (Obstet Gynecol 2019;133:e174).",
   "Bula profissional Anvisa do sulfato de magnésio 50% e do gluconato de cálcio 10%.",
   "Rede Brasileira de Estudos sobre Hipertensão na Gravidez (RBEHG). Protocolo 03 – Pré-eclâmpsia, 2023. https://rbehg.com.br/wp-content/uploads/2023/08/PROTOCOLO-2023-FINAL.pdf",
   "ISMP Brasil. Erros de medicação associados a abreviaturas, siglas e símbolos (Boletim ISMP Brasil, 2015); ISMP List of Error-Prone Abbreviations — sulfato de magnésio por extenso, nunca a sigla."
  ],
  "rev": [
   "Corrigido (2026-10-17): sulfato de magnésio escrito por extenso, sem a sigla, na conduta, no protocolo e na ficha; link do Manual de Gestação de Alto Risco 2022; doses sem mudança (ISMP Brasil 2015; MS 2022).",
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
  "unidade": "Plano B (desidratação leve/moderada):\nSRO 50–100 mL/kg em 4–6h, em pequenos volumes, reavaliando; termina quando sumirem os sinais de desidratação. Se continuar desidratado: sonda nasogástrica (gastróclise); se evoluir para desidratação grave: Plano C. Sem melhora em 6 h: encaminhar ao hospital.\n\nPlano C (desidratação grave):\nFase rápida — SF 0,9% ou Ringer lactato:\n- < 1 ano: 30 mL/kg em 1h, depois 70 mL/kg em 5h.\n- ≥ 1 ano: 30 mL/kg em 30 min, depois 70 mL/kg em 2h30.\n\nVômitos persistentes — ondansetrona dose única:\n6 meses–2 anos: 2 mg | > 2–10 anos (até 30 kg): 4 mg | > 10 anos (> 30 kg): 8 mg.\n\nAntibiótico só na disenteria com comprometimento do estado geral:\n- Até 10 anos/30 kg (a partir de 3 meses): azitromicina 10 mg/kg (máx. 500 mg) VO no 1º dia e 5 mg/kg (máx. 250 mg) 1x ao dia por mais 4 dias. Alternativa (sem via oral ou grave): ceftriaxona 50 mg/kg (máx. 2 g) IM 1x ao dia por 3 a 5 dias.\n- > 10 anos/30 kg: ciprofloxacino 500 mg de 12/12h por 3 dias.",
  "orient": "- Mantenha a amamentação e a alimentação habitual da criança.\n- Volte ao pronto-socorro se a criança piorar, tiver sangue nas fezes, vômitos que impedem de beber o soro, ficar muito sonolenta ou urinar pouco.",
  "fontes": [
   "Sociedade Brasileira de Pediatria. Guia Prático: Diarreia Aguda Infecciosa, 2023. https://www.sbp.com.br/fileadmin/user_upload/sbp/2023/junho/14/24048aPRESS-GPA-Diarreia_Aguda_Infecciosa-pSITE.pdf",
   "Ministério da Saúde. Manejo do paciente com diarreia: avaliação do estado de hidratação do paciente (cartaz, atualização 2023). https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dda/publicacoes/manejo-do-paciente-com-diarreia-avaliacao-do-estado-de-hidratacao-do-paciente",
   "Fichas azitromicina (bula: máximo 500 mg/dia) e ceftriaxona (máximo 2 g/dia) do painel."
  ],
  "rev": [
   "Corrigido (2026-10-17): link do MS trocado pelo cartaz de 2023 (o antigo trazia outro Plano C); azitromicina e ceftriaxona com dose máxima e ceftriaxona 50 mg/kg na criança até 30 kg, como o cartaz; Plano B com gastróclise e \"sem melhora em 6 h: hospital\" (MS, cartaz 2023).",
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
  "unidade": "1) Diagnóstico clínico (história e exame). Não pedir RX nem pesquisa viral de rotina.\n2) Não usar de rotina: salbutamol, adrenalina, corticoide, antibiótico (sem infecção bacteriana), fisioterapia respiratória.\n3) Solução salina hipertônica nebulizada não é recomendada na emergência (pode ser usada em internados).\n4) O2 se SatO2 < 90% (< 92% se < 6 semanas ou comorbidade). Oximetria contínua não é necessária em quem não está em O2.\n5) Sem aceitar via oral: hidratação por sonda nasogástrica ou EV.",
  "orient": "- Volte imediatamente ao pronto-socorro se o bebê fizer esforço para respirar, tiver pausas na respiração, ficar com lábios ou pele arroxeados, recusar as mamadas ou molhar menos fraldas.",
  "fontes": [
   "Ralston SL et al. AAP Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis (Pediatrics 2014;134:e1474). https://publications.aap.org/pediatrics/article/134/5/e1474/75848/",
   "NICE NG9. Bronchiolitis in children: diagnosis and management, 2015 (atualizada 2021) — limiares de saturação, quando internar, evolução esperada. https://www.nice.org.uk/guidance/ng9",
   "Friedman JN et al. Canadian Paediatric Society. Bronchiolitis: recommendations for diagnosis, monitoring and management of children one to 24 months of age (Paediatr Child Health 2014;19:485)."
  ],
  "rev": [
   "Corrigido (2026-10-17): O2 \"conforme julgamento clínico\" → O2 se SatO2 < 90% (< 92% se < 6 semanas ou comorbidade), sem oximetria contínua fora do O2 (AAP 2014; NICE NG9).",
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
  "orient": "- Volte imediatamente ao pronto-socorro se a criança tiver chiado ou ronco alto ao respirar mesmo em repouso, fizer esforço para respirar ou tiver dificuldade para engolir ou estiver babando.",
  "fontes": [
   "Gates A et al. Glucocorticoids for croup in children (Cochrane Database Syst Rev 2018;CD001955).",
   "Bjornson C et al. Nebulized epinephrine for croup in children (Cochrane Database Syst Rev 2013;CD006619).",
   "Smith DK et al. Croup: Diagnosis and Management (Am Fam Physician 2018;97:575).",
   "Ortiz-Alvarez O. Canadian Paediatric Society. Acute management of croup in the emergency department (Paediatr Child Health 2017;22:166): dexametasona 0,6 mg/kg VO dose única; adrenalina 1 mg/mL 0,5 mL/kg (máx. 5 mL) nebulizada; observar pelo menos 2 h. https://doi.org/10.1093/pch/pxx019"
  ],
  "rev": [
   "Corrigido (2026-10-17): fonte da dose (CPS 2017) citada na conduta; teto da dexametasona de 10 mg igual em todo o painel, também na ficha (CPS 2017; TREKK 2023 aceita 12 mg).",
   "Item novo."
  ]
 },
 {
  "id": "tosse",
  "nome": "Tosse (aguda, subaguda e crônica)",
  "cat": "resp",
  "cid": "R05",
  "sin": "tosse seca produtiva pigarro coqueluche gotejamento pos nasal",
  "casa": "# Tosse aguda (< 3 semanas) do resfriado — sintomático\nUso oral\n1) Mel -----------------------------------------\nTomar 1 colher de chá (5 mL) puro ou em chá morno até 3x ao dia, principalmente à noite. Não dar a menores de 1 ano.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n\nUso nasal\n4) Soro fisiológico 0,9% --------------------- 1 fr\nLavar as narinas com 5–10 mL em cada lado 3 a 4x ao dia.\n\n# Tosse subaguda pós-infecciosa (3–8 semanas), após excluir pneumonia e coqueluche\n5) Brometo de ipratrópio spray --------------- 1 fr\nInalar 2 jatos de 6/6h por até 2 semanas.\n\n# Coqueluche (suspeita: tosse ≥ 14 dias com paroxismos, guincho inspiratório ou vômito pós-tosse)\n6) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Febre com mialgia, cefaleia, dor retro-orbitária ou exantema em área de dengue (ou viagem em 14 dias): sem ibuprofeno nem AAS (MS, Dengue 2024, 6.1.2).","Nesse caso, só dipirona ou paracetamol até descartar dengue.","Coqueluche: notificação compulsória.","Coqueluche: avaliar quimioprofilaxia dos contatos prioritários (< 1 ano, gestantes ≥ 32 semanas, imunossuprimidos, profissionais de saúde)."],
  "unidade": "1) Classificar pela duração: aguda < 3 semanas | subaguda 3–8 semanas | crônica > 8 semanas.\n2) Sinais de alarme: dispneia, hemoptise, febre persistente, perda de peso, rouquidão, sibilância nova, tabagismo importante (≥ 20 maços-ano ou fumante > 45 anos), pneumonias de repetição, imunossupressão.\n3) Aguda: pensar em IVAS, mas excluir pneumonia (FR, SatO2, ausculta), TEP, IC, asma/DPOC exacerbados.\n4) Crônica: RX de tórax; suspender IECA (a tosse some em 1 semana a 3 meses); investigar as causas mais comuns:\n   - Síndrome da tosse das vias aéreas superiores: corticoide nasal (+ anti-histamínico de 1ª geração com descongestionante como teste).\n   - Asma (inclui variante tosse): corticoide inalatório + broncodilatador.\n   - Refluxo: IBP por pelo menos 8 semanas com mudança de hábitos.\n   - Bronquite eosinofílica não asmática: corticoide inalatório.\n5) Tosse há 3 semanas ou mais, mesmo sem febre ou emagrecimento: pedir baciloscopia ou TRM-TB. Em pessoa privada de liberdade, em situação de rua, com HIV, indígena ou contato de tuberculose: investigar com tosse de qualquer duração.",
  "orient": "- Antibiótico não trata tosse causada por vírus.\n- Não use xarope com codeína em menores de 12 anos.\n- Volte ao pronto-socorro se tiver falta de ar, sangue no catarro, febre alta ou se a tosse piorar.\n- Se tiver febre com dor no corpo, dor de cabeça, dor atrás dos olhos ou manchas na pele, não tome ibuprofeno nem AAS (aspirina) até que a dengue seja descartada; nesse caso, use só dipirona ou paracetamol.",
  "fontes": [
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: caso suspeito (item 10.1); não usar salicilatos, anti-inflamatórios nem corticoides e orientar a não se automedicar (item 6.1.2); só dipirona e paracetamol (apêndice H). https://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_6ed.pdf",
   "Irwin RS et al. Classification of Cough as a Symptom in Adults and Management Algorithms — CHEST Guideline (Chest 2018). https://journal.chestnet.org/article/S0012-3692(17)32918-5/fulltext",
   "Malesker MA et al. Treatment for Acute Cough Associated With the Common Cold — CHEST (Chest 2017). https://journal.chestnet.org/article/S0012-3692(17)31408-3/fulltext",
   "Morice AH et al. ERS guidelines on chronic cough in adults and children (Eur Respir J 2020). https://publications.ersnet.org/content/erj/55/1/1901136",
   "Michaudet C, Malaty J. Chronic Cough: Evaluation and Management (Am Fam Physician 2017). https://www.aafp.org/pubs/afp/issues/2017/1101/p575.html",
   "Oduwole O et al. Honey for acute cough in children (Cochrane 2018;CD007094).",
   "Braman SS. Postinfectious cough: ACCP guidelines (Chest 2006) — ipratrópio inalatório.",
   "Ministério da Saúde. Nota Técnica Conjunta nº 165/2025 — coqueluche (azitromicina e quimioprofilaxia). https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2025/nota-tecnica-conjunta-no-165-2025-dpni-svsa-ms.pdf",
   "EMA 2015: codeína contraindicada para tosse em menores de 12 anos.",
   "Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed. atualizada, 2019: sintomático respiratório é quem tem tosse há 3 semanas ou mais; nas populações vulneráveis (privados de liberdade, situação de rua, pessoas com HIV, indígenas, contatos), tosse de qualquer duração."
  ],
  "evid": "Para a tosse aguda do resfriado a evidência dos sintomáticos é de baixa qualidade (CHEST 2017); mel tem benefício pequeno em crianças.",
  "rev": [
   "Corrigido (2026-10-17): tuberculose: investigar com tosse há 3 semanas ou mais mesmo sem febre ou emagrecimento, e com qualquer duração nas populações vulneráveis (MS, Manual de Recomendações para o Controle da Tuberculose, 2019).",
   "Corrigido (2026-10-09): não usar ibuprofeno na febre com dengue não descartada (MS, Dengue 2024).",
   "Item novo."
  ]
 }
];
const DILFONTE = "Prefeitura de Joinville. Manual de diluição de medicamentos injetáveis — Pronto Atendimento, 2018. https://www.joinville.sc.gov.br/public/portaladm/pdf/jornal/aff57d668dbf18219d7b9e8f2d949b08.pdf";
if (typeof module !== "undefined") module.exports = { CATS, BASE };

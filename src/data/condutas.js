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
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (no máximo 8 cp por dia).\n\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\n\nAntibiótico\n3) Cefalexina 500mg -------------------------- 28 cp\nTomar 1 cp VO de 6/6h por 7 dias.\nOu\n3) Sulfametoxazol + Trimetoprima 800/160mg --- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\nOu\n3) Clindamicina 300mg ------------------------ 28 cp\nTomar 1 cp VO de 6/6h por 7 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue, em quem tem febre.","Antibiótico se celulite ao redor, sinais sistêmicos, lesão > 2 cm ou imunossupressão.","Sulfametoxazol + trimetoprima se suspeita de MRSA comunitário ou falha prévia.","Clindamicina se alergia a penicilina.","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida fica de fora: contraindicada com febre ou sintomas gripais (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013."],
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
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue).",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
  ]
 },
 {
  "id": "afta",
  "nome": "Afta / Estomatite aftosa",
  "cat": "gi",
  "cid": "K12.0",
  "sin": "ulcera oral boca",
  "casa": "Uso oral\n1) Clorexidina 0,12% solução oral ------------ 1 fr\nBochechar 15 mL, sem diluir, por 30 segundos, 2x ao dia, após escovar os dentes, por 7 a 10 dias. Não engolir.\nOu\n1) Triancinolona 1mg/g em orabase (Omcilon-A Orabase) --- 1 bisnaga\nAplicar pequena quantidade sobre as lesões, sem esfregar, 2 a 3x ao dia, após as refeições e ao deitar, por até 7 dias.",
  "unidade": "1) Avaliar a extensão e a hidratação (consegue comer e beber?).\n2) Dor intensa que impede a alimentação: Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n3) Afastar causa sistêmica: úlceras grandes ou múltiplas, febre, lesões genitais ou oculares (Behçet), diarreia ou perda de peso (doença inflamatória intestinal, doença celíaca), imunossupressão (HIV, neutropenia, quimioterapia).\n4) Úlcera única que não cicatriza em 2 a 3 semanas: encaminhar ao estomatologista ou dentista (biópsia).\n* Lesões em várias mucosas com bolhas ou descamação da pele, ou após remédio novo: pensar em Stevens-Johnson (internar).",
  "orient": "- Evite alimentos ácidos, muito quentes ou condimentados.\n- Se a ferida na boca não cicatrizar em 2 a 3 semanas, procure reavaliação médica.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): clorexidina 15 mL por 30 segundos e triancinolona sem esfregar, também ao deitar (bulas Periogard e Omcilon-A Orabase); fonte Cochrane trocada, pois a citada (CD005411) avalia só tratamento sistêmico (Edgar 2017)."
  ],
  "evid": "Poucos ensaios de qualidade; tratamento é sintomático.",
  "fontes": [
   "Edgar NR, Saleh D, Miller RA. Recurrent aphthous stomatitis: a review (J Clin Aesthet Dermatol 2017;10(3):26-36; PMID 28360966). Tratamento tópico de 1ª linha: clorexidina, corticoide tópico, anestésico local.",
   "Bula Periogard (gluconato de clorexidina 0,12%, Colgate): 15 mL sem diluir, por 30 segundos, 2x ao dia, após a higiene oral.",
   "Bula Omcilon-A Orabase (triancinolona acetonida 1 mg/g): aplicar sem esfregar, ao deitar e 2 a 3x ao dia após as refeições; reavaliar se não melhorar em 7 dias.",
   "Bula Anvisa da Novalgina solução injetável (dipirona 500 mg/mL, Sanofi): IM ou EV 1–2,5 g em dose única, máximo 5 g/dia; EV lenta, no máximo 1 mL (500 mg)/min, com o paciente deitado. https://consultas.anvisa.gov.br/#/bulario/",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 63 — Cutaneous Drug Reactions (síndrome de Stevens-Johnson e necrólise epidérmica tóxica: suspender o fármaco suspeito e internar)."
  ]
 },
 {
  "id": "odontalgia",
  "nome": "Odontalgia / Abscesso dentário",
  "cat": "dor",
  "cid": "K08.8",
  "sin": "dor de dente dente doendo dente inflamado abscesso dentario canal carie pulpite gengiva inchada rosto inchado",
  "casa": "Uso oral\n1) Dipirona 500mg ------------------------------ 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\nOu (paracetamol)\n1) Paracetamol 750mg --------------------------- 20 cp\nTomar 1 cp VO de 6/6h se dor (no máximo 4 cp por dia).\nOu (paracetamol junto com o anti-inflamatório)\n1) Paracetamol 500mg --------------------------- 20 cp\nTomar 1 cp VO de 6/6h, junto com o anti-inflamatório, por 5 dias. Não tome outro remédio que tenha paracetamol.\n2) Ibuprofeno 600mg ---------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu (naproxeno)\n2) Naproxeno 500mg ----------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\n\n# Antibiótico: abscesso (inchaço ou pus na gengiva) sem dentista em 1 a 2 dias, ou com febre, mal-estar ou íngua\n3) Amoxicilina 500mg --------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\n\n# Receita de reserva: dente com dor ao mastigar, sem inchaço, sem dentista\n3) Amoxicilina 500mg --------------------------- 15 cp\nComeçar só se aparecer inchaço, pus ou piora da dor: 1 cp VO de 8/8h por 5 dias.\n\n# Alergia a penicilina sem reação grave\n3) Cefalexina 500mg ---------------------------- 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\n\n# Alergia grave a penicilina (anafilaxia, angioedema ou urticária)\n3) Azitromicina 250mg -------------------------- 6 cp\nTomar 2 cp (500 mg) VO no 1º dia e 1 cp 1x ao dia do 2º ao 5º dia.\nOu (clindamicina)\n3) Clindamicina 300mg -------------------------- 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\n\n# Sem melhora após 3 dias de amoxicilina\n3) Amoxicilina + Clavulanato 500/125mg --------- 21 cp\nTomar 1 cp VO de 8/8h por 7 dias.\n\n# Sem melhora após 3 dias de cefalexina, azitromicina ou clindamicina\n4) Metronidazol 250mg -------------------------- 42 cp\nTomar 2 cp (500 mg) VO de 8/8h por 7 dias, junto com o antibiótico em uso. Não beba bebida alcoólica durante o tratamento e até 1 dia depois.",
  "avisoRx": ["O tratamento definitivo é do dentista (canal, drenagem ou extração): antibiótico não substitui e não trata a dor (ADA 2019).","Sem antibiótico na pulpite (dor ao frio ou calor) nem no dente com dor à percussão sem inchaço; neste, sem dentista, só receita de reserva (ADA 2019).","Metronidazol na falha (junto do antibiótico): 500 mg 8/8h por 7 dias (ADA 2019); a bula para anaeróbios usa 400 mg 8/8h. Sem álcool até 1 dia depois.","Abscesso (inchaço ou pus na gengiva) sem dentista em 1–2 dias: amoxicilina e encaminhamento urgente, mesmo sem febre (ADA 2019).","Imunossuprimido (aids, câncer, transplante, imunossupressor) fica fora da ADA 2019: decidir caso a caso e encaminhar com urgência.","Antibiótico: reavaliar em 3 dias; o dentista pode suspender 24 h após a melhora completa (ADA 2019: 3 a 7 dias).","Alergia sem anafilaxia, angioedema ou urticária: cefalexina. Com uma delas: azitromicina ou clindamicina (risco de C. difficile) (ADA 2019).","Anti-inflamatório só depois de descartar dengue; evitar na gestação, na doença renal, com úlcera ou com anticoagulante.","ADA 2024: AINE com paracetamol alivia mais que opioide; opioide só se falhar, pelo menor tempo (raramente > 3 dias).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica).","Trismo, disfagia, voz abafada, edema do assoalho da boca ou cervical, febre alta ou toxemia: não liberar (Ludwig, espaço profundo).","Gestante: amoxicilina e paracetamol; sem AINE, sobretudo a partir de 20 semanas (FDA 2020).","CID pulpite K04.0 | abscesso periapical K04.7 | celulite e abscesso da boca (Ludwig) K12.2."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Cetoprofeno 100 mg IM (ampola 50 mg/mL, 2 mL) ou EV (apresentação própria para EV, em 100 mL de SF em 20–30 min).",
  "orient": "- Procure um dentista (unidade básica de saúde ou Centro de Especialidades Odontológicas) em 1 a 2 dias, mesmo que a dor melhore: o remédio alivia, mas não trata a causa da dor de dente.\n- Se recebeu antibiótico, tome nos horários certos até o fim e mostre a receita ao dentista.\n- Evite alimentos muito quentes, gelados ou doces do lado que dói. Escove os dentes com cuidado, inclusive no local da dor.\n- Não coloque remédio, comprimido ou álcool sobre o dente ou a gengiva: pode ferir a boca.\n- Se tiver febre com dor no corpo, dor de cabeça ou manchas na pele, não tome anti-inflamatório (como ibuprofeno, naproxeno, cetoprofeno ou diclofenaco) até que a dengue seja descartada.\n- Volte imediatamente ao pronto-socorro se tiver: dificuldade para abrir a boca, para engolir ou para respirar; voz abafada; inchaço que aumenta no rosto, embaixo da língua ou no pescoço; febre alta ou calafrios; inchaço perto do olho.",
  "rev": [
   "Decidido pelo médico (2026-10-27): ibuprofeno 600 mg mantido; metronidazol na falha de cefalexina, azitromicina ou clindamicina e receita de reserva (necrose pulpar com periodontite apical, sem dentista) entram como blocos opcionais desligados (ADA 2019; bula Anvisa do metronidazol).",
   "Criada (2026-10-26): analgesia por AINE com ou sem paracetamol (ADA 2024); antibiótico em blocos desligados por padrão, no abscesso (inchaço ou pus) sem dentista em 1–2 dias ou com sinal sistêmico, sem antibiótico na pulpite (ADA 2019); dentista em 1–2 dias; sinais de infecção profunda. Conferência independente (.rascunhos/odonto-olho-conferencia.md): 1 crítico, 7 importantes e 9 menores, aplicados."
  ],
  "fontes": [
   "Carrasco-Labra A et al. ADA/Pitt/Penn. Evidence-based clinical practice guideline for the pharmacologic management of acute dental pain in adolescents, adults, and older adults (J Am Dent Assoc 2024;155(2):102-117; PMID 38325969; PMC10919895): toothache sem tratamento odontológico imediato — AINE isolado (ex.: ibuprofeno 400 mg ou naproxeno sódico 440 mg) ou com paracetamol (ex.: 500 mg) como 1ª linha; paracetamol 1 g se AINE contraindicado; opioide só se falhar, por até 3 dias; máximos diários ibuprofeno 2.400 mg, naproxeno sódico 1.100 mg, paracetamol 4.000 mg. https://doi.org/10.1016/j.adaj.2023.10.009",
   "Lockhart PB et al. ADA. Evidence-based clinical practice guideline on antibiotic use for the urgent management of pulpal- and periapical-related dental pain and intraoral swelling (J Am Dent Assoc 2019;150(11):906-921.e12; PMID 31668170; PMC8270006; ADA Chairside Guide 2019, https://www.ferris.edu/pharmacy/michigan-antibiotic-resistance-reduction-coalition/Documents/ADA_Chairside_Guide_Antibiotics_TNA.pdf): sem dentista para o tratamento definitivo de imediato: sem antibiótico na pulpite irreversível; na necrose pulpar com periodontite apical, sem antibiótico (receita de reserva se o tratamento não for viável); no abscesso apical agudo localizado, com ou sem sinal sistêmico (febre, mal-estar), amoxicilina 500 mg 3x/dia por 3–7 dias e encaminhamento urgente; só para imunocompetentes; alergia sem anafilaxia, cefalexina 500 mg 4x/dia; com anafilaxia, angioedema ou urticária, azitromicina 500 mg e depois 250 mg por 4 dias ou clindamicina 300 mg 4x/dia; falha, amoxicilina-clavulanato 500/125 mg 3x/dia por 7 dias ou associar metronidazol; reavaliar em 3 dias e suspender 24 h após a resolução. https://doi.org/10.1016/j.adaj.2019.08.020",
   "CDC. Dentists: Be Antibiotics Aware — Treating patients with dental pain and swelling (2022, a partir da ADA 2019): tabela por cenário, encaminhamento urgente se piora, infecção de espaço profundo ou sepse. https://www.cdc.gov/antibiotic-use/pdfs/ada-treatment-guidelines-508.pdf",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 38 — Oral Manifestations of Disease: pulpite irreversível exige tratamento endodôntico ou extração; o abscesso periapical pode evoluir para osteomielite ou celulite do assoalho da boca (angina de Ludwig); idosos, diabéticos e usuários de corticoide podem ter pouca dor ou febre.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática (HC-FMUSP), 18ª ed. (2024), cap. 47 — Infecções de vias aéreas superiores: disfagia, disfonia, babação, estridor e edema cervical sugerem infecção de espaço profundo (parafaríngeo, periamigdaliano, submandibular/Ludwig).",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: não usar salicilatos nem anti-inflamatórios na suspeita (item 6.1.2); só dipirona e paracetamol (apêndice H). https://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_6ed.pdf",
   "Bula Novalgina (dipirona 500 mg, Anvisa): adultos, 500 mg a 1 g até 4x ao dia; máximo 4 g/dia.",
   "Bula do paracetamol 500 e 750 mg registrada na Anvisa (Tylenol, Kenvue): adulto, até 1 g por dose e 4 g por dia; evitar na hepatopatia grave e no etilismo.",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, 16/09/2020; referência Profenid Entérico): 200 mg/dia em 2 tomadas, máximo 300 mg/dia. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "FDA Drug Safety Communication (out/2020): evitar AINE a partir de 20 semanas de gestação (oligoidrâmnio e disfunção renal fetal). https://www.fda.gov/drugs/drug-safety-and-availability/fda-recommends-avoiding-use-nsaids-pregnancy-20-weeks-or-later-because-they-can-result-low-amniotic",
   "Bula Anvisa do metronidazol 250 mg comprimido revestido (genérico; Brainfarma, reg. 1.5584.0308, 30/07/2025; Prati-Donaduzzi, reg. 1.2568.0182): adulto e > 12 anos; 500 mg por tomada na amebíase (até 4x/dia); não ingerir bebida alcoólica durante e no mínimo 1 dia após o tratamento (efeito antabuse). https://bula.com.br/original/metronidazol-comprimido-250-mg",
   "Bula Anvisa do metronidazol 250 e 400 mg comprimido (genérico, Teuto, reg. 1.0370.0714): infecções por anaeróbios no adulto, 400 mg 3x/dia por 7 dias ou a critério médico, após as refeições. https://www.precopopular.com.br/_v/leaflet/download/MzczODY3"
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
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n3) Hexomedine spray -------------------------- 1 fr\nAplicar 3 jatos na garganta de 4/4h por 3 dias.\n4) Amidalin pastilha ------------------------- 1 cx\nDissolver 1 pastilha na boca a cada 3h por 3 dias.\n\nAntibiótico\n5) Amoxicilina 500mg ------------------------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\nOu\n5) Amoxicilina 500mg ------------------------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\nOu\n5) Amoxicilina 500mg ------------------------- 20 cp\nTomar 2 cp (1 g) VO 1x ao dia por 10 dias.\nOu\n5) Penicilina G benzatina 1.200.000 unidades - 1 amp\nAplicar IM, dose única, na unidade de saúde.\n\n# Se alergia a penicilina:\n5) Azitromicina 250mg ------------------------ 6 cp\nTomar 2 cp (500 mg) VO no 1º dia e 1 cp 1x ao dia do 2º ao 5º dia.\nOu\n5) Clindamicina 300mg ------------------------ 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.\n\n# Se falha ou recorrência recente:\n5) Amoxicilina + Clavulanato 875/125mg ------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\nOu\n5) Amoxicilina + Clavulanato 500/125mg ------- 30 cp\nTomar 1 cp VO de 8/8h por 10 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Penicilina benzatina aplicada na unidade.","Área com dengue (ou viagem em 14 dias) e febre com mialgia, cefaleia, dor retro-orbitária ou exantema: sem ibuprofeno nem AAS (MS, Dengue 2024, 6.1.2).","Antibiótico só com estreptococo confirmado (teste rápido ou cultura).","Tosse, coriza, rouquidão, conjuntivite ou aftas sugerem vírus: não testar nem tratar.","Sem teste: Centor 3–4 (febre, exsudato, linfonodo cervical anterior doloroso, sem tosse) ou FeverPAIN ≥ 4 favorecem antibiótico.","Centor 0–2 ou FeverPAIN 0–3: preferir não tratar (FeverPAIN 2–3: receita de reserva); reavaliar se piorar ou não melhorar em 3–5 dias.","Azitromicina só se alergia grave a penicilina: há estreptococo resistente a macrolídeo.","Retorno se trismo, dificuldade de engolir saliva ou de respirar (abscesso periamigdaliano).","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida fica de fora: contraindicada com febre ou sintomas gripais (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013."],
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
   "MS/Anvisa/Fiocruz. Protocolo de segurança na prescrição, uso e administração de medicamentos, 2013: não abreviar \"unidade\" nem \"unidade internacional\"; ISMP Brasil, Boletim v.4 n.2, 2015. Penicilina G benzatina: só IM, nunca EV (bula; tarja FDA).",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
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
  "unidade": "1) Otoscopia: confirmar a rolha e checar sinais de otite externa ou de perfuração.\n2) Rolha com sintomas (hipoacusia, plenitude, zumbido, dor) e membrana timpânica íntegra: lavagem do conduto com água ou SF morno (na temperatura do corpo, para evitar vertigem), em jatos suaves, com o paciente sentado e cuba sob a orelha.\n   Ou remoção manual (cureta ou aspiração), se houver material e treino.\n   Rolha endurecida: pingar o ceruminolítico 15–30 min antes e repetir a lavagem.\n3) Não lavar se: perfuração ou cirurgia otológica prévia, otorreia, otite externa, estenose ou exostose do conduto. Cautela em diabetes, imunossupressão ou anticoagulante (preferir remoção manual ou encaminhar).\n4) Otoscopia ao final para conferir a remoção e a membrana timpânica.\n5) Falha, dor, sangramento, vertigem intensa ou perfuração: encaminhar ao otorrino.",
  "orient": "- Não use as gotas se estiver saindo secreção do ouvido.\n- Não coloque hastes flexíveis (cotonetes) dentro do ouvido.\n- Retorne após 5 dias para lavagem do ouvido, se necessário.\n- Não use as gotas se estiver saindo secreção do ouvido ou se tiver o tímpano perfurado.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Adicionado: contraindicação em suspeita de perfuração."
  ],
  "fontes": [
   "Schwartz SR et al. AAO-HNS Clinical Practice Guideline (Update): Earwax (Cerumen Impaction) (Otolaryngol Head Neck Surg 2017).",
   "Schwartz SR et al. AAO-HNS Clinical Practice Guideline (Update): Earwax (Cerumen Impaction) (Otolaryngol Head Neck Surg 2017;156(1S):S1): tratar com ceruminolítico, irrigação ou remoção manual; fatores modificadores (membrana timpânica não íntegra, estenose ou exostose do conduto, diabetes, imunossupressão, anticoagulante); otoscopia ao final; encaminhar se falha; não usar velas de ouvido."
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
  "unidade": "1) Vômitos que impedem a via oral: Dimenidrinato + Piridoxina (Dramin B6 DL): ampola EV (10 mL) em 100 mL de SF em 30 min; existe apresentação própria para IM (Dramin B6 IM 1 mL = 50 mg). Máx. 400 mg/dia de dimenidrinato.\n   Ou Prometazina 25 mg IM profunda (não usar em idosos nem em menores de 2 anos; máx. 100 mg/dia).\n2) Desidratação: hidratação EV com SF 0,9%.\n3) Afastar outra causa: tontura que persiste em repouso, com nistagmo, déficit neurológico, cefaleia intensa ou vômitos sem relação com o movimento → ver Vertigem.\n* Os dois remédios dão sonolência: não dirigir após a medicação.",
  "orient": "- Este remédio pode causar sonolência; não dirija após o uso.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): fonte da meclizina (bula FDA) e revisão Cochrane de 2022 sobre anti-histamínicos (bula FDA do Antivert; Cochrane 2022).",
   "Corrigido: intervalo 12h → 24h (meclizina tem ação de ~24h)."
  ],
  "evid": "Anti-histamínico provavelmente previne a cinetose em viagem real (Cochrane 2022, evidência moderada), com mais sonolência; escopolamina transdérmica tem mais estudos, mas não é comercializada no Brasil.",
  "fontes": [
   "FDA. Meclizine hydrochloride (Antivert) — bula: 25–50 mg VO 1 h antes da viagem, repetir a cada 24 h se preciso; sonolência; cautela em asma, glaucoma e aumento da próstata.",
   "Karrim N, Byrne R, Magula N, Saman Y. Antihistamines for motion sickness (Cochrane Database Syst Rev 2022;10:CD012715). PubMed 36250781.",
   "Spinks A, Wasiak J. Scopolamine for preventing and treating motion sickness (Cochrane 2011;CD002851) — escopolamina transdérmica.",
   "Bula Anvisa do Dramin B6 DL injetável (dimenidrinato 30 mg + piridoxina 50 mg por ampola de 10 mL, uso EV) e do Dramin B6 IM (dimenidrinato 50 mg + piridoxina 50 mg por ampola de 1 mL): EV lenta ou em infusão, intervalo de 4/4 a 6/6h; IM com intervalo mínimo de 4 h; máximo 400 mg/dia de dimenidrinato; contém glicose e frutose (cautela no diabetes; contraindicado na intolerância hereditária à frutose). https://consultas.anvisa.gov.br/#/bulario/",
   "Bula Anvisa do Fenergan injetável (prometazina 25 mg/mL, Sanofi): 25–50 mg IM profunda, máximo 100 mg/dia; EV não recomendada; contraindicada em menores de 2 anos; American Geriatrics Society. 2023 AGS Beers Criteria (evitar no idoso). https://consultas.anvisa.gov.br/#/bulario/"
  ]
 },
 {
  "id": "cefaleia",
  "nome": "Cefaleia",
  "cat": "dor",
  "cid": "R51",
  "sin": "dor de cabeca cefaleia tensional",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (no máximo 8 cp por dia).\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h se dor forte, após as refeições, por até 3 dias. No máximo 3 cp por dia.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO de 12/12h se dor forte, após as refeições, por até 3 dias. No máximo 2 cp por dia.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO de 12/12h se dor forte, após as refeições, por até 3 dias. No máximo 2 cp por dia.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 9 cp\nTomar 1 cp VO de 8/8h se dor forte, após as refeições, por até 3 dias. No máximo 3 cp por dia.\n3) Dimenidrinato + Piridoxina 50/10mg -------- 1 cx\nTomar 1 cp VO de 6/6h se náuseas, vômitos ou tontura.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Febre com cefaleia, mialgia ou dor retro-orbitária: pensar em dengue antes de anti-inflamatório.","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida fica de fora: contraindicada com febre ou sintomas gripais (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013."],
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
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue).",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
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
  "nome": "Cólica renal / Litíase urinária",
  "cat": "uro",
  "cid": "N23",
  "sin": "litiase urinaria calculo renal ureteral pedra no rim nefrolitiase urolitiase colica nefretica hematuria flanco",
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\nOu (diclofenaco)\n1) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\nOu (cetoprofeno)\n1) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (naproxeno)\n1) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (nimesulida)\n1) Nimesulida 100mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (cetorolaco)\n1) Cetorolaco 10mg sublingual (Toragesic) ---- 15 cp\nColocar 1 cp debaixo da língua de 8/8h por até 5 dias e deixar dissolver, sem mastigar nem engolir.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\n3) Ondansetrona 8mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h se náuseas ou vômitos.\n\n# Tramadol (opcional): dor forte apesar dos anteriores\n4) Tramadol 50mg ----------------------------- 10 cp\nTomar 1 cp VO de 8/8h se a dor forte não melhorar com os outros remédios (no máximo 3 cp por dia).\n\n# Tansulosina (opcional): cálculo ureteral distal de 5 a 10 mm\n5) Tansulosina 0,4mg ------------------------- 30 cp\nTomar 1 cp VO 1x ao dia, após o café da manhã, por até 4 semanas.",
  "avisoRx": ["Anti-inflamatório só depois de descartar dengue; não usar na gestação, na doença renal, com úlcera ou com anticoagulante.","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Nimesulida: no máximo 100 mg de 12/12h; não usar com febre, doença do fígado ou álcool em excesso, nem junto com paracetamol (EMA).","Cetorolaco: até 5 dias somando o injetável; ≥ 65 anos, < 50 kg ou insuficiência renal leve: até 40 mg/dia. Não usar se desidratado ou IR moderada/grave.","Tansulosina: só com cálculo ureteral distal de 5 a 10 mm na imagem, sem infecção nem indicação de retirada; uso fora da bula (EAU 2026).","Tansulosina: tontura ao se levantar; avisar antes de cirurgia de catarata ou glaucoma (íris flácida).","Tramadol exige Receita de Controle Especial em 2 vias (Portaria SVS/MS 344/1998, lista A2, adendo).","Febre, calafrios ou oligúria com cálculo = obstrução infectada: emergência urológica, não dar alta.","Gestante: sem anti-inflamatório; paracetamol, USG e avaliação conjunta com urologia e obstetrícia (EAU 2026).","CID: cálculo do rim N20.0; do ureter N20.1; litíase urinária não especificada N20.9."],
  "unidade": "1) Cetoprofeno 100 mg EV (apresentação própria para EV) em 100 mL de SF em 20–30 min, ou IM (ampola 50 mg/mL, 2 mL) — 1ª escolha, se sem contraindicação (DRC, gestação, sangramento, úlcera, dengue).\n   Ou Cetorolaco 30 mg (ampola 30 mg/mL) IM profunda e lenta ou EV em bolus (≥ 15 s); ≥ 65 anos, < 50 kg ou insuficiência renal leve: 15 mg. Não usar com desidratação nem insuficiência renal moderada ou grave.\n   Ou Diclofenaco 75 mg (ampola 75 mg/3 mL) IM profunda no glúteo, dose única (injetável por no máximo 2 dias).\n2) Dipirona 1 g (2 mL) EV lenta (no máximo 1 mL/min, paciente deitado), diluída em 10–20 mL de SF, ou IM profunda (junto com o AINE, ou sozinha se AINE contraindicado).\n   + Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM, se náusea ou vômito.\nSe persistir após 30–40 min, repetir a dipirona uma vez. Se ainda persistir:\n3) Tramadol 100 mg (2 mL) EV em 100 mL de SF em 30–60 min (infusão rápida aumenta náuseas), ou IM\n   Ou Morfina 2–4 mg EV (diluir 1 amp de 10 mg em 9 mL de AD/SF = 1 mg/mL; fazer 2–4 mL lento).\n   Dor refratária: internar e chamar a urologia (desobstrução ou retirada do cálculo).\n4) Hidratação EV só para corrigir desidratação ou vômitos: soro em grande volume não ajuda o cálculo a sair. Escopolamina não acrescenta analgesia.\n5) Exames: urina tipo I (ou fita), creatinina, hemograma e PCR; urocultura se febre ou leucocitúria; beta-hCG na mulher em idade fértil.\n6) Imagem: USG de rins e vias urinárias na chegada; TC de abdome e pelve sem contraste (baixa dose) para confirmar no 1º episódio ou na dúvida. Imediata se febre, rim único ou dúvida diagnóstica. Gestante: USG; RM em 2º lugar; TC de baixa dose por último.\n7) Febre ou sepse com cálculo obstrutivo: hemoculturas e urocultura, antibiótico já (ver Infecção urinária e Sepse) e urologia para desobstrução de urgência (cateter duplo J ou nefrostomia).\n8) Urologia no mesmo dia: rim único ou transplantado obstruído, obstrução bilateral, anúria, lesão renal aguda, gestante com dor refratária ou febre (avaliar junto com a obstetrícia). Mais de 50 anos com 1ª cólica: afastar aneurisma de aorta.\n9) Alta: dor controlada, sem febre, aceitando via oral e com diurese. Cálculo distal de 5 a 10 mm: tansulosina. Cálculo > 10 mm ou sem eliminação em 4 semanas: urologia.",
  "orient": "- Beba água ao longo do dia, o suficiente para a urina ficar clara, a não ser que um médico tenha pedido para limitar os líquidos.\n- A pedra pequena costuma sair sozinha pela urina em alguns dias ou semanas. Tome os remédios como está na receita.\n- Se estiver usando tansulosina, levante-se devagar: ela pode causar tontura.\n- Procure o posto de saúde para acompanhar e saber se a pedra saiu. Se a dor continuar voltando por 4 semanas, você precisa de avaliação com o urologista.\n- Volte imediatamente ao pronto-socorro se tiver febre ou calafrios, se urinar muito pouco ou não conseguir urinar, se a dor não passar com os remédios ou se os vômitos não deixarem você tomar os remédios.",
  "rev": [
   "Separado (2026-10-29): a parte biliar foi para a conduta nova Vias biliares (biliar); aqui ficam a cólica renal e a litíase urinária (nome, sinônimos, avisos, orientações e fontes).",
   "Adicionado (2026-10-29): cetorolaco e diclofenaco IM como alternativas ao cetoprofeno na unidade (EAU 2026; HC-FMUSP 18ª ed., cap. 87; bulas Toragesic e Voltaren injetável); nimesulida e cetorolaco sublingual como alternativas na receita.",
   "Ajustado (2026-10-29): tramadol e tansulosina viram blocos opcionais desligados; \"Se tiver febre, volte\" saiu da linha da dipirona (receita só com a posologia); hidratação EV só para corrigir desidratação (Cochrane 2012; HC-FMUSP cap. 87).",
   "Adicionado (2026-10-29): imagem imediata com febre, rim único ou dúvida; gestante com USG e RM; urologia no mesmo dia por rim único, anúria, IRA ou obstrução bilateral; critérios de alta (EAU 2026).",
   "Conferido (2026-10-29): tramadol sem nota na linha (receita só com a posologia); cetorolaco contraindicado com desidratação e insuficiência renal moderada/grave (bula Toragesic); AUA 2026 no lugar da AUA 2016.",
   "Corrigido (2026-10-26): tansulosina após o café da manhã (bula; \"à noite\" não tinha apoio na bula), igual às condutas HPB e Retenção urinária aguda.",
   "Corrigido (2026-10-17): ibuprofeno só se dengue descartada (MS, Dengue, 6ª ed., 2024); Buscopan Composto comprimido \"se dor ou febre\" → dipirona 2 cp (máx. 8/dia) e \"febre: volte\"; tramadol com máximo de 3 cp/dia (bula Tramal); na unidade, dipirona EV no lugar do Buscopan Composto, que fica só para a cólica biliar e em no mínimo 5 minutos (EAU Urolithiasis 2026: antiespasmódico não acrescenta analgesia).",
   "Adicionado: AINE (cetoprofeno) como 1ª escolha na cólica renal.",
   "Adicionado: tansulosina para cálculo distal e morfina como alternativa.",
   "Ajustado: tramadol 12/12h → 8/8h se necessário.",
   "Ajustado (EAU 2024): tansulosina indicada para cálculo ureteral distal > 5 mm.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "EAU Guidelines on Urolithiasis, limited update March 2026 (texto completo, PDF: https://d56bochluxqnz.cloudfront.net/documents/full-guideline/EAU-Guidelines-on-Urolithiasis-2026.pdf; resumo: Skolarikos A et al. Eur Urol 2025;88(1):64-75): AINE (inclui dipirona) como 1ª escolha (forte); opioide (tramadol) como 2ª (fraca); antiespasmódico não acrescenta analgesia; alfabloqueador para cálculo ureteral distal de 5–10 mm (forte, fora da bula); imagem imediata com febre, rim único ou dúvida; descompressão urgente se sepse com obstrução; gestante: USG, depois RM, TC de baixa dose por último. https://uroweb.org/guidelines/urolithiasis",
   "Pearle MS et al. Surgical Management of Kidney and Ureteral Stones: AUA Guideline (2026), Part II (J Urol 2026;215(2):124-131; PMID 41263322; substitui a AUA/Endourological Society 2016): observação no cálculo ureteral não complicado ≤ 10 mm e alfabloqueador no distal (forte). https://www.auanet.org/guidelines-and-quality/guidelines/surgical-management-of-kidney-and-ureteral-stones",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 87 — Cólica nefrética (AINE de 1ª linha e dipirona como adjuvante; antiespasmódico não recomendado de rotina; hidratação para expelir o cálculo sem evidência; tansulosina para 5–10 mm; internação se dor refratária, febre ou obstrução).",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 330 — Nephrolithiasis.",
   "Pathan SA et al. Delivering safe and effective analgesia for management of renal colic in the emergency department: a double-blind, multigroup, randomised controlled trial (Lancet 2016;387:1999): diclofenaco 75 mg IM, ibuprofeno e paracetamol EV tão eficazes quanto morfina. https://doi.org/10.1016/S0140-6736(16)00652-8",
   "Worster AS, Bhanich Supapol W. Fluids and diuretics for acute ureteric colic. Cochrane Database Syst Rev 2012;(2):CD004926: sem evidência de benefício da hidratação vigorosa. https://doi.org/10.1002/14651858.CD004926.pub3",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue.",
   "Bula Novalgina (dipirona 500 mg, Anvisa): máximo 4 g/dia.",
   "Bula Tramal (tramadol, Anvisa): máximo 400 mg/dia; sonolência, evitar dirigir.",
   "Ministério da Saúde/SVS. Portaria nº 344, de 12/05/1998, e atualizações da Anvisa (lista A2, adendo): tramadol até 100 mg por unidade posológica com Receita de Controle Especial em 2 vias. https://bvsms.saude.gov.br/bvs/saudelegis/svs/1998/prt0344_12_05_1998_rep.html",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Bula Anvisa do Voltaren solução injetável (diclofenaco sódico 75 mg/3 mL, Novartis, 11/2025): 1 ampola IM profunda no quadrante superior externo do glúteo, 1x ao dia (excepcionalmente 2x), por no máximo 2 dias; indicado em cólica renal e biliar; contraindicado na insuficiência cardíaca grave, TFG < 15 mL/min e no 3º trimestre. https://bula.com.br/original/voltaren-solucao-injetavel",
   "EMA/PRAC 2013. Diclofenac-containing medicines — referral: contraindicado na insuficiência cardíaca (NYHA II–IV), doença coronariana, doença arterial periférica e AVC. https://www.ema.europa.eu/en/medicines/human/referrals/diclofenac-containing-medicinal-products",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc",
   "Bula Anvisa da nimesulida 100 mg comprimido (Vitamedic, RDC 47/2009; referência Nisulid, Aché): 50–100 mg 2x ao dia após as refeições; contraindicada < 12 anos, insuficiência hepática e renal grave. https://static-webv8.jet.com.br/drogaosuper/bulas/145802.pdf",
   "EMA. Nimesulide-containing medicinal products — referral (artigos 31 e 107i, 2007–2012): 100 mg 2x/dia, no máximo 15 dias; contraindicada com febre ou sintomas gripais, doença hepática ou outras drogas hepatotóxicas. https://www.ema.europa.eu/en/documents/other/amendments-be-included-relevant-sections-summary-product-characteristics-nimesulide-containing_en.pdf",
   "Bula Anvisa do Toragesic sublingual (cetorolaco de trometamol 10 mg), EMS, atualizada em 07/11/2025: 10 mg de 6/6 a 8/8h; máximo 60 mg/dia (< 65 anos) e 40 mg/dia (> 65 anos, < 50 kg ou IR); até 5 dias; contraindicado na úlcera, sangramento, asma, IR grave, doença cardiovascular, gestação e lactação. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/1347108/toragesic-sublingual.htm",
   "Bula Anvisa do Toragesic injetável (cetorolaco 30 mg/mL), EMS: dose única < 65 anos 30–60 mg IM ou 30 mg EV; ≥ 65 anos, < 50 kg ou IR 15–30 mg IM ou 15 mg EV; EV em bolus em no mínimo 15 s; máximo 90 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1261029/posologia+toragesic.htm",
   "Bula Anvisa do Secotex (cloridrato de tansulosina 0,4 mg, comprimido revestido de liberação prolongada, Boehringer Ingelheim): 1 comprimido ao dia, com ou sem alimento, inteiro, sem partir nem mastigar; tontura e hipotensão; síndrome da íris flácida (avisar antes de cirurgia de catarata ou glaucoma; não iniciar se cirurgia programada); contraindicado na insuficiência hepática grave. Genéricos em cápsula: 1 cápsula após o café da manhã. https://consultaremedios.com.br/secotex/bula",
   "Bula Anvisa da ondansetrona (Vonau, Nausedron): 8 mg VO de 8/8h; 4 mg EV lento.",
   "Prefeitura de Joinville. Manual de diluição de medicamentos injetáveis — Pronto Atendimento, 2018 (dipirona, cetoprofeno, tramadol, morfina, ondansetrona). https://www.joinville.sc.gov.br/public/portaladm/pdf/jornal/aff57d668dbf18219d7b9e8f2d949b08.pdf",
   "Chaikof EL et al. SVS practice guidelines on abdominal aortic aneurysm (J Vasc Surg 2018;67:2); Wanhainen A et al. ESVS 2024 AAA guidelines (Eur J Vasc Endovasc Surg 2024;67:192): aneurisma roto pode simular cólica renal."
  ]
 },
 {
  "id": "biliar",
  "nome": "Vias biliares: cólica biliar, colecistite, coledocolitíase, colangite",
  "cat": "gi",
  "cid": "K80.2",
  "sin": "vesicula colelitiase pedra na vesicula colecistite colangite coledocolitiase calculo biliar ictericia murphy charcot reynolds colica biliar cpre",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h se dor, após as refeições, por até 5 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h se dor, após as refeições, por até 5 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h se dor, após as refeições, por até 5 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h se dor, após as refeições, por até 5 dias.\nOu (cetorolaco)\n2) Cetorolaco 10mg sublingual (Toragesic) ---- 15 cp\nColocar 1 cp debaixo da língua de 8/8h se dor, por até 5 dias, e deixar dissolver, sem mastigar nem engolir.\n3) Escopolamina 10mg (Buscopan) -------------- 20 drágeas\nTomar 1 drágea VO de 8/8h se cólica.\n4) Ondansetrona 8mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h se náuseas ou vômitos.",
  "avisoRx": ["Receita só para cólica biliar não complicada: dor resolvida, sem febre nem Murphy, leucócitos e bilirrubinas normais.","Dor biliar por mais de 6 h, febre ou Murphy: pensar em colecistite (Tóquio 2018); não dar alta.","Anti-inflamatório só depois de descartar dengue; não usar na gestação, na doença renal, com úlcera ou com anticoagulante.","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Cetorolaco: até 5 dias somando o injetável; ≥ 65 anos, < 50 kg ou insuficiência renal leve: até 40 mg/dia. Não usar se desidratado ou IR moderada/grave.","Escopolamina: não usar no glaucoma não tratado, retenção urinária, taquiarritmia, megacólon ou miastenia (bula Buscopan).","Alta com USG de abdome e encaminhamento à Cirurgia Geral para colecistectomia eletiva (EASL 2016; SAGES).","Antibiótico: confirmar com a CCIH local; ajustar piperacilina-tazobactam, meropeném e ciprofloxacino à função renal.","CID: colecistite com cálculo K80.0 (sem cálculo K81.0); coledocolitíase K80.5; colangite K83.0 (com cálculo K80.3)."],
  "unidade": "# Cólica biliar (dor que passa em até 6 h, sem febre, sem Murphy):\n1) Cetoprofeno 100 mg EV (apresentação própria para EV) em 100 mL de SF em 20–30 min, ou IM (ampola 50 mg/mL, 2 mL) — AINE é a 1ª escolha.\n   Ou Cetorolaco 30 mg (ampola 30 mg/mL) IM profunda e lenta ou EV em bolus (≥ 15 s); ≥ 65 anos, < 50 kg ou insuficiência renal leve: 15 mg. Não usar com desidratação nem insuficiência renal moderada ou grave.\n   Ou Diclofenaco 75 mg (ampola 75 mg/3 mL) IM profunda no glúteo, dose única.\n2) Dipirona 1 g (2 mL) EV lenta (no máximo 1 mL/min, paciente deitado), diluída em 10–20 mL de SF, ou IM profunda.\n   Sem melhora: Escopolamina 20 mg + dipirona 2,5 g (Buscopan Composto) 1 ampola EV lenta (no mínimo 5 minutos, paciente deitado), diluída em 10–20 mL de SF 0,9%, ou IM profunda, no lugar da dipirona isolada.\n   + Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM, se náusea ou vômito. Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n3) Se persistir: Morfina 2–4 mg EV (diluir 1 amp de 10 mg em 9 mL de AD/SF = 1 mg/mL; fazer 2–4 mL lento). O opioide pode ser usado na dor biliar.\n4) Exames: hemograma, PCR, bilirrubinas, TGO, TGP, fosfatase alcalina, GGT, lipase e creatinina; beta-hCG na mulher em idade fértil; ECG se idoso ou com risco cardiovascular. USG de abdome superior.\n5) Dor por mais de 6 h, febre, Murphy, leucocitose ou enzimas alteradas: não é cólica simples; seguir abaixo. Lipase > 3 vezes o limite com dor típica: pancreatite (ver Dor abdominal).\n\n# Colecistite aguda (Tóquio 2018: sinal local + sinal sistêmico = suspeita; + imagem = definitiva):\n1) Internar com a Cirurgia Geral: jejum, cristaloide EV, analgesia e antiemético como acima.\n2) Gravidade: grau III se disfunção orgânica (hipotensão com vasopressor, confusão, PaO2/FiO2 < 300, oligúria ou creatinina > 2, INR > 1,5, plaquetas < 100 mil); grau II se leucócitos > 18 mil, massa palpável, > 72 h ou inflamação local acentuada; grau I nos demais.\n3) Antibiótico, graus I e II comunitários: Ceftriaxona 2 g EV 1x ao dia (em 100 mL de SF em 30 min).\n   Ou, só no grau I, Ampicilina-sulbactam 3 g EV de 6/6h, se a resistência local de E. coli for < 20%.\n   + Metronidazol 500 mg EV de 8/8h (bolsa pronta de 100 mL, a 5 mL/min, cerca de 20 min) se anastomose biliodigestiva.\n   Alergia grave a betalactâmico: Ciprofloxacino 400 mg EV de 12/12h (em 60 min) + Metronidazol 500 mg EV de 8/8h.\n4) Grau III, sepse ou infecção associada a serviço de saúde: Piperacilina-tazobactam 4,5 g EV de 6/6h (em 30 min) Ou Meropeném 1 g EV de 8/8h, + Vancomicina para cobrir Enterococcus (dose pela função renal, com a farmácia ou a CCIH). Ajustar à função renal; confirmar o esquema com a CCIH local.\n5) Hemoculturas (2 pares) nos graus II e III, antes do antibiótico, sem atrasá-lo. Choque séptico: antibiótico em até 1 h (ver Sepse).\n6) Cirurgia: colecistectomia laparoscópica precoce (graus I e II). Grau III ou alto risco cirúrgico: suporte orgânico e cirurgia precoce em centro experiente ou drenagem da vesícula. Após a colecistectomia nos graus I e II, antibiótico por até 24 h (4 a 7 dias se perfuração, necrose ou forma enfisematosa). Grau III: 4 a 7 dias após controle do foco.\n\n# Coledocolitíase (risco pela ASGE 2019):\n1) Risco alto (cálculo no colédoco na imagem; bilirrubina total > 4 mg/dL com colédoco dilatado; ou colangite): CPRE antes da cirurgia ou exploração da via biliar na cirurgia.\n2) Risco intermediário (enzimas hepáticas alteradas, mais de 55 anos ou colédoco > 6 mm na USG): colangio-RM ou ecoendoscopia antes da cirurgia.\n3) Risco baixo: colecistectomia sem exame adicional. Sem sinal de infecção: sem antibiótico.\n\n# Colangite aguda (tríade de Charcot: febre, icterícia e dor no hipocôndrio direito; Reynolds: + hipotensão e confusão):\n1) Tóquio 2018: inflamação sistêmica + colestase ou imagem = suspeita; as três = definitiva. Grau III: disfunção orgânica; grau II: 2 de leucócitos > 12 mil ou < 4 mil, febre ≥ 39 °C, ≥ 75 anos, bilirrubina ≥ 5 mg/dL, albumina < 0,7 × o limite inferior.\n2) Hemoculturas (2 pares), cristaloide EV, jejum e antibiótico EV o quanto antes (em até 1 h no choque séptico; ver Sepse).\n3) Graus I e II comunitários: Ceftriaxona 2 g EV 1x ao dia.\n   + Metronidazol 500 mg EV de 8/8h (5 mL/min) se anastomose biliodigestiva.\n   Alergia grave a betalactâmico: Ciprofloxacino 400 mg EV de 12/12h + Metronidazol 500 mg EV de 8/8h.\n4) Grau III ou associada a serviço de saúde (internação ou antibiótico recentes): Piperacilina-tazobactam 4,5 g EV de 6/6h Ou Meropeném 1 g EV de 8/8h, + Vancomicina (Enterococcus; dose pela função renal). Confirmar com a CCIH local.\n5) Drenagem biliar (CPRE; percutânea se instável ou sem CPRE): grau III urgente após estabilizar; grau II precoce; grau I se não melhorar em 24 h. Transferir se o serviço não tiver CPRE.\n6) Antibiótico por 4 a 7 dias depois de resolvida a obstrução; hemocultura com Enterococcus ou Streptococcus: no mínimo 2 semanas.",
  "orient": "- Prefira comidas com pouca gordura e evite frituras e os alimentos que provocaram a dor.\n- Tome os remédios como está na receita.\n- Faça o ultrassom de abdome pedido e leve o resultado ao posto de saúde para marcar a consulta com o cirurgião. A cirurgia para retirar a vesícula evita novas crises.\n- Volte imediatamente ao pronto-socorro se tiver febre ou calafrios, pele ou olhos amarelados, urina escura ou fezes claras, dor que dura mais de 6 horas ou vômitos que não param.",
  "rev": [
   "Item novo (2026-10-29): separado da antiga Cólica renal / biliar; cólica biliar com receita, colecistite e colangite pelos critérios de Tóquio 2018, coledocolitíase pelo risco da ASGE 2019, antibiótico EV por gravidade (TG18; IDSA 2010; HC-FMUSP 18ª ed., cap. 77). Conferido (2026-10-29): ampicilina-sulbactam só no grau I, metronidazol só com anastomose biliodigestiva e vancomicina no grau III (TG18, tabela 3); metronidazol a 5 mL/min (bula Flagyl)."
  ],
  "fontes": [
   "Yokoe M et al. Tokyo Guidelines 2018 (TG18): diagnostic criteria and severity grading of acute cholecystitis (J Hepatobiliary Pancreat Sci 2018;25(1):41-54; PMID 29032636): A (Murphy, dor ou massa no hipocôndrio direito) + B (febre, PCR ou leucócitos altos) = suspeita; + C (imagem) = definitiva; grau II: leucócitos > 18.000, massa palpável, > 72 h, inflamação local acentuada; grau III: disfunção orgânica. https://doi.org/10.1002/jhbp.515",
   "Kiriyama S et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis (J Hepatobiliary Pancreat Sci 2018;25(1):17-30; PMID 29032610): A (febre > 38 °C ou calafrios; leucócitos < 4.000 ou > 10.000, PCR ≥ 1 mg/dL) + B (bilirrubina ≥ 2 mg/dL; FA, GGT, TGO ou TGP > 1,5× o limite) + C (dilatação biliar; causa na imagem); grau II: 2 de leucócitos > 12.000 ou < 4.000, febre ≥ 39 °C, ≥ 75 anos, bilirrubina ≥ 5 mg/dL, albumina baixa; grau III: disfunção orgânica. https://doi.org/10.1002/jhbp.512",
   "Gomi H et al. Tokyo Guidelines 2018: antimicrobial therapy for acute cholangitis and cholecystitis (J Hepatobiliary Pancreat Sci 2018;25(1):3-16; PMID 29090866): esquemas por gravidade (ceftriaxona ± metronidazol; ampicilina-sulbactam só no grau I e com resistência local < 20%; piperacilina-tazobactam, cefepima ou carbapenêmico no grau III; metronidazol só com anastomose biliodigestiva; vancomicina no grau III e na infecção associada a serviço de saúde); hemoculturas nos graus II–III; colecistite I–II: suspender até 24 h após a colecistectomia; colangite e grau III: 4–7 dias após controle do foco; bacteremia por Gram-positivo: no mínimo 2 semanas. https://doi.org/10.1002/jhbp.518",
   "Okamoto K et al. Tokyo Guidelines 2018: flowchart for the management of acute cholecystitis (J Hepatobiliary Pancreat Sci 2018;25(1):55-72; PMID 29045062): colecistectomia laparoscópica precoce nos graus I–II; grau III com suporte orgânico, cirurgia precoce em centro experiente ou drenagem da vesícula. https://doi.org/10.1002/jhbp.516",
   "Miura F et al. Tokyo Guidelines 2018: initial management of acute biliary infection and flowchart for acute cholangitis (J Hepatobiliary Pancreat Sci 2018;25(1):31-40; PMID 29032628): grau I antibiótico e drenagem se sem resposta em 24 h; grau II drenagem precoce; grau III drenagem urgente após suporte orgânico. https://doi.org/10.1002/jhbp.509",
   "Buxbaum JL et al. ASGE guideline on the role of endoscopy in the evaluation and management of choledocholithiasis (Gastrointest Endosc 2019;89(6):1075-1105; PMID 30979521): risco alto (cálculo no colédoco na imagem; bilirrubina total > 4 mg/dL com colédoco dilatado; colangite) → CPRE; intermediário (enzimas hepáticas alteradas, > 55 anos, colédoco dilatado > 6 mm) → ecoendoscopia, colangio-RM ou colangiografia intraoperatória; baixo → colecistectomia. https://doi.org/10.1016/j.gie.2018.10.001",
   "Pisano M et al. 2020 World Society of Emergency Surgery updated guidelines for the diagnosis and treatment of acute calculus cholecystitis (World J Emerg Surg 2020;15:61): colecistectomia laparoscópica precoce, de preferência em até 7 dias da internação e até 10 dias do início dos sintomas. https://doi.org/10.1186/s13017-020-00336-x",
   "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on the prevention, diagnosis and treatment of gallstones (J Hepatol 2016;65:146-181): AINE (diclofenaco, indometacina) na cólica biliar; colecistectomia na litíase sintomática. https://doi.org/10.1016/j.jhep.2016.03.005",
   "Overby DW et al. SAGES guidelines for the clinical application of laparoscopic biliary tract surgery (Surg Endosc 2010;24:2368-2386): colecistectomia laparoscópica na litíase sintomática. https://www.sages.org/publications/guidelines/guidelines-for-the-clinical-application-of-laparoscopic-biliary-tract-surgery/",
   "Fraquelli M et al. Non-steroid anti-inflammatory drugs for biliary colic (Cochrane Database Syst Rev 2016;(9):CD006390; PMID 27610712): AINE alivia a dor como os opioides e pode reduzir a progressão para colecistite. https://doi.org/10.1002/14651858.CD006390.pub2",
   "Solomkin JS et al. Diagnosis and management of complicated intra-abdominal infection in adults and children: guidelines by the SIS and the IDSA (Clin Infect Dis 2010;50:133-164): colecistite comunitária leve a moderada com cefazolina, cefuroxima ou ceftriaxona; grave com carbapenêmico, piperacilina-tazobactam ou cefepima/ciprofloxacino + metronidazol; anaeróbio só com anastomose biliodigestiva. https://doi.org/10.1086/649554",
   "Mazuski JE et al. The Surgical Infection Society revised guidelines on the management of intra-abdominal infection (Surg Infect 2017;18(1):1-76). https://doi.org/10.1089/sur.2016.261",
   "Evans L et al. Surviving Sepsis Campaign: international guidelines 2021 (Crit Care Med 2021;49:e1063): antibiótico em até 1 h no choque séptico; hemoculturas antes, sem atrasar; cristaloide 30 mL/kg na hipoperfusão. https://doi.org/10.1097/CCM.0000000000005337",
   "Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed., Manole, 2024, cap. 77 — Emergências biliares (AINE de 1ª escolha na cólica biliar, cetorolaco 30–60 mg; opioide pode ser usado; alta com colecistectomia eletiva; colecistite: internar, jejum, antibiótico EV, colecistectomia precoce; tabela 6: ceftriaxona 2 g/dia + metronidazol 500 mg 8/8h, ciprofloxacino 400 mg 12/12h + metronidazol, piperacilina-tazobactam 4,5 g 6/6h; coledocolitíase sem infecção não precisa de antibiótico).",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 357 — Diseases of the Gallbladder and Bile Ducts.",
   "Gallaher JR, Charles A. Acute Cholecystitis: A Review (JAMA 2022;327:965): dor biliar que dura mais de 4 a 6 horas ou com febre sugere colecistite. https://doi.org/10.1001/jama.2022.2350",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue.",
   "Bula Novalgina (dipirona 500 mg, Anvisa): máximo 4 g/dia.",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Bula Anvisa do Voltaren solução injetável (diclofenaco sódico 75 mg/3 mL, Novartis, 11/2025): 1 ampola IM profunda no quadrante superior externo do glúteo, 1x ao dia (excepcionalmente 2x), por no máximo 2 dias; indicado em cólica renal e biliar; contraindicado na insuficiência cardíaca grave, TFG < 15 mL/min e no 3º trimestre. https://bula.com.br/original/voltaren-solucao-injetavel",
   "EMA/PRAC 2013. Diclofenac-containing medicines — referral: contraindicado na insuficiência cardíaca (NYHA II–IV), doença coronariana, doença arterial periférica e AVC. https://www.ema.europa.eu/en/medicines/human/referrals/diclofenac-containing-medicinal-products",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc",
   "Bula Anvisa do Toragesic sublingual (cetorolaco de trometamol 10 mg), EMS, atualizada em 07/11/2025: 10 mg de 6/6 a 8/8h; máximo 60 mg/dia (< 65 anos) e 40 mg/dia (> 65 anos, < 50 kg ou IR); até 5 dias; contraindicado na úlcera, sangramento, asma, IR grave, doença cardiovascular, gestação e lactação. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/1347108/toragesic-sublingual.htm",
   "Bula Anvisa do Toragesic injetável (cetorolaco 30 mg/mL), EMS: dose única < 65 anos 30–60 mg IM ou 30 mg EV; ≥ 65 anos, < 50 kg ou IR 15–30 mg IM ou 15 mg EV; EV em bolus em no mínimo 15 s; máximo 90 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1261029/posologia+toragesic.htm",
   "Bula Buscopan drágeas (butilbrometo de escopolamina 10 mg, Anvisa): 10 a 20 mg, 3 a 5x ao dia; contraindicado no glaucoma não tratado, retenção urinária por próstata, taquiarritmia, megacólon e miastenia.",
   "Bula Buscopan Composto injetável (Boehringer Ingelheim, Anvisa): EV lenta, no máximo 1 mL/min, com o paciente deitado; no máximo 3 ampolas por dia; contraindicado na obstrução intestinal mecânica e no megacólon.",
   "Bula Anvisa da ondansetrona (Vonau, Nausedron): 8 mg VO de 8/8h; 4 mg EV lento.",
   "Bulas Anvisa: Plasil injetável (metoclopramida); EMA 2013, metoclopramida (até 10 mg 3x/dia, no máximo 5 dias).",
   "Bula Anvisa da ceftriaxona (Rocefin, Roche): 1–2 g 1x ao dia, até 4 g/dia; EV em 30 min (ou EV direta lenta).",
   "Bula Anvisa do Unasyn injetável (ampicilina + sulbactam, Pfizer): 1,5–3 g de 6/6h, máximo 12 g/dia (4 g de sulbactam). https://bula.com.br/unasyn-injetavel",
   "Bula Anvisa do Flagyl injetável (metronidazol 5 mg/mL, bolsa 100 mL, Sanofi): 500 mg EV de 8/8h, perfusão a 5 mL/min; não diluir. https://bula.com.br/flagyl-injetavel",
   "Bula Anvisa do ciprofloxacino injetável (Cipro IV, Bayer, 2 mg/mL): 400 mg EV de 12/12h (até 8/8h), infundir em 60 min; ajustar se ClCr < 30 mL/min.",
   "Bula Anvisa do Tazocin (piperacilina 4 g + tazobactam 0,5 g, Pfizer): 4,5 g de 8/8h; 4,5 g de 6/6h na infecção particularmente grave; infundir em 30 min; ajustar se ClCr < 40 mL/min. https://www.pfizer.com.br/files/Tazocin_Profissional_de_Saude_37.pdf",
   "Bula Anvisa do Meronem (meropeném, Pfizer): infecção intra-abdominal 1 g EV de 8/8h; ajustar se ClCr < 50 mL/min. https://bula.com.br/meronem",
   "Prefeitura de Joinville. Manual de diluição de medicamentos injetáveis — Pronto Atendimento, 2018 (dipirona, cetoprofeno, tramadol, morfina, ondansetrona). https://www.joinville.sc.gov.br/public/portaladm/pdf/jornal/aff57d668dbf18219d7b9e8f2d949b08.pdf",
   "OMS/DATASUS. CID-10, capítulo XI: K80.0 calculose da vesícula com colecistite aguda; K80.2 sem colecistite; K80.3 do ducto biliar com colangite; K80.5 do ducto sem colangite nem colecistite; K81.0 colecistite aguda; K83.0 colangite. http://www2.datasus.gov.br/cid10/V2008/WebHelp/k80_k87.htm"
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
  "unidade": "1) Medir a acuidade visual de cada olho (antes de qualquer colírio).\n2) Afastar olho vermelho grave: dor moderada ou intensa, baixa visual, fotofobia, pupila alterada, lesão na córnea (fluoresceína), olho muito vermelho ao redor da córnea, trauma ou queimadura química → ver Olho vermelho e oftalmologista no mesmo dia.\n3) Limpar a secreção com gaze e SF 0,9%, do canto interno para o externo.\n4) Encaminhar ao oftalmologista no mesmo dia se: usuário de lente de contato, secreção purulenta abundante de início rápido (suspeita de gonococo), bolhas na pálpebra (herpes), recém-nascido, ou sem melhora em 3 a 4 dias com o colírio.\n* Não há medicação de rotina na unidade; o tratamento é domiciliar. Não usar colírio com corticoide nem anestésico para casa.",
  "orient": "- Faça compressas frias por 10 a 20 minutos, várias vezes ao dia.\n- Limpe a secreção com gaze e soro fisiológico, do canto de dentro para o canto de fora do olho.\n- Lave as mãos com frequência, não compartilhe toalhas e evite coçar os olhos.\n- Não use lentes de contato durante o tratamento.\n- Procure um oftalmologista no mesmo dia se tiver dor moderada ou forte no olho, piora da visão, incômodo com a luz, muita secreção amarelada que surgiu rapidamente, bolhas na pálpebra, ou se usa lente de contato e está com o olho vermelho.\n- Se estiver usando o colírio antibiótico e não melhorar em 3 a 4 dias, retorne para reavaliação.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): tobramicina 6/6h → 4/4h (bula Tobrex); encaminhamento ampliado (lente de contato, secreção intensa, vesículas, córnea) e reavaliação em 3–4 dias (AAO PPP 2023; JAMA 2013).",
   "Corrigido: removida a orientação de 'não usar soro fisiológico'; SF é adequado para limpar a secreção.",
   "Adicionado: conduta para conjuntivite viral (mais comum) e sinais de alarme."
  ],
  "fontes": [
   "Cheung AY et al. American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern 2023 (Ophthalmology 2024;131:P134): bacteriana leve é autolimitada, antibiótico tópico por 5–7 dias encurta o quadro; viral sem antibiótico (compressa fria, lágrima artificial, contágio por 10–14 dias); encaminhar se baixa visual, dor moderada ou intensa, secreção purulenta intensa, córnea acometida ou sem resposta.",
   "Bula Tobrex (tobramicina 0,3% colírio): 1 a 2 gotas a cada 4 h na infecção leve a moderada; a partir de 2 meses de idade.",
   "Azari AA, Barney NP. Conjunctivitis: a systematic review of diagnosis and treatment (JAMA 2013;310:1721): usuário de lente de contato com olho vermelho tem risco de ceratite.",
   "Cheung AY et al. American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern 2023 (Ophthalmology 2024;131:P134): medir a acuidade visual; evitar o uso indiscriminado de corticoide tópico; encaminhar se baixa visual, dor moderada ou intensa, secreção purulenta intensa, córnea acometida, recém-nascido ou sem resposta.",
   "Wipperman JL, Dorsch JN. Evaluation and management of corneal abrasions (Am Fam Physician 2013;87:114): nunca prescrever colírio anestésico para casa (mesma fonte da conduta Olho vermelho)."
  ]
 },
 {
  "id": "olho-vermelho",
  "nome": "Olho vermelho / Corpo estranho ocular",
  "cat": "orl",
  "cid": "H11.4",
  "sin": "olho vermelho corpo estranho no olho cisco arranhao na cornea abrasao hiposfagma hemorragia subconjuntival olho irritado dor no olho",
  "casa": "# Arranhão na córnea ou corpo estranho retirado\nUso oftálmico\n1) Tobramicina 0,3% colírio -------------------- 1 fr\nPingar 1 a 2 gotas no olho afetado de 4/4h (enquanto acordado) por 5 dias.\n2) Lágrima artificial (carmelose 0,5%) --------- 1 fr\nPingar 1 gota no olho afetado de 4/4h por 7 dias.\n\nUso oral\n3) Dipirona 500mg ------------------------------ 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\nOu (paracetamol)\n3) Paracetamol 750mg --------------------------- 20 cp\nTomar 1 cp VO de 6/6h se dor (no máximo 4 cp por dia).\n\n# Irritação, olho seco ou hemorragia na parte branca do olho, sem lesão na córnea\nUso oftálmico\n1) Lágrima artificial (carmelose 0,5%) --------- 1 fr\nPingar 1 gota no olho afetado de 4/4h por 7 dias.",
  "avisoRx": ["Nunca prescrever colírio anestésico para casa: retarda a cicatrização, mascara a piora e pode perfurar a córnea (AAFP 2013).","Conjuntivite (secreção, coceira, córnea limpa, visão normal): usar a conduta Conjuntivite.","Oftalmologia no mesmo dia: baixa da visão, dor intensa, fotofobia, pupila alterada, córnea opaca, hipópio ou hifema.","Lente de contato com olho vermelho ou abrasão: suspender a lente, sem oclusão, tobramicina e oftalmologia no mesmo dia (ceratite).","Queimadura química: irrigar antes de tudo, por 30–60 min (no mínimo 2 L), até pH 7,3–7,7; depois, oftalmologia.","Glaucoma agudo: timolol não na asma, DPOC grave, bradicardia ou BAV; acetazolamida não na alergia a sulfa nem na insuficiência renal ou hepática grave.","Martelar, esmerilhar ou cortar metal, ou suspeita de perfuração: TC de órbitas sem contraste e oftalmologia; não usar RM.","Corpo estranho que não sai com irrigação ou cotonete, ou profundo: oftalmologia. Anel de ferrugem: retirada pelo oftalmologista nos próximos dias.","Sem oclusão do olho: não alivia a dor e pode atrasar a cicatrização (AAFP 2013).","Abrasão maior que 4 mm, ligada a lente de contato ou com visão diminuída: reavaliar em 24 h (AAFP 2013).","Hemorragia subconjuntival recorrente ou com anticoagulante: medir a PA e pensar em distúrbio da coagulação.","CID corpo estranho na córnea T15.0 | no saco conjuntival T15.1 | abrasão S05.0 | hemorragia subconjuntival H11.3.","CID ceratite H16.9 | iridociclite H20.9 | glaucoma agudo H40.2 | queimadura química do olho T26.9."],
  "unidade": "1) Irrigação do olho com SF 0,9% abundante (queimadura química: SF ou Ringer lactato por 30–60 min, no mínimo 2 L, até pH 7,3–7,7).\n2) Proximetacaína 0,5% colírio (Anestalcon): 1 a 2 gotas no olho afetado, só para o exame e a retirada do corpo estranho.\n3) Fluoresceína colírio ou tira: 1 gota no fundo de saco inferior; examinar com luz azul de cobalto.\n4) Corpo estranho superficial: retirar com cotonete umedecido em SF, depois de everter a pálpebra superior.\n5) Glaucoma agudo, até o oftalmologista: acetazolamida 250 mg 2 cp (500 mg) VO + timolol 0,5% 1 gota no olho afetado.\n6) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Não coce nem esfregue o olho. Não use colírio que não esteja na receita, principalmente colírio anestésico ou com corticoide.\n- Se usa lente de contato, não use a lente até ser liberado pelo oftalmologista.\n- A sensação de areia no olho costuma melhorar em 1 a 2 dias.\n- Hemorragia na parte branca do olho, sem dor e sem piora da visão, some sozinha em 1 a 3 semanas.\n- Use óculos de proteção ao martelar, esmerilhar, cortar ou mexer com produtos químicos.\n- Volte imediatamente ao pronto-socorro ou procure um oftalmologista no mesmo dia se tiver: piora da visão, dor forte no olho, incômodo forte com a luz, mancha branca no olho, pus, se não melhorar em 24 a 48 horas, ou se a dor vier com dor de cabeça, náuseas ou vômitos.",
  "rev": [
   "Criada (2026-10-26): porta de entrada do olho vermelho, com sinais de alarme para oftalmologia, corpo estranho superficial, abrasão de córnea, glaucoma agudo até o oftalmologista (com contraindicações do timolol e da acetazolamida) e remissão à conduta Conjuntivite; nenhum colírio anestésico para casa. Conferência independente (.rascunhos/odonto-olho-conferencia.md) aplicada."
  ],
  "fontes": [
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática (HC-FMUSP), 18ª ed. (2024), cap. 108 — Emergências oftalmológicas: síndrome do olho vermelho (sinais de alarme e diferencial por secreção, visão, dor, hiperemia, córnea e pupila); queimadura química (irrigação por 30–60 min, no mínimo 2 L, até pH 7,3–7,7); trauma penetrante (proteção sem curativo compressivo, TC de órbitas); glaucoma agudo (acetazolamida 500 mg VO, timolol 0,5% 1 gota, oftalmologia com urgência); celulite pré-septal (cefalexina 500 mg 6/6h ou amoxicilina-clavulanato 250–500 mg 8/8h VO por 10 dias; grave: internar e antibiótico EV); hiposfagma benigno, resolução em 1–3 semanas; na recidiva, avaliar distúrbio da coagulação; pH da irrigação até 7,3–7,7; timolol evitado na asma e no bloqueio cardíaco.",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 34 — Disorders of the Eye: abrasão vista com fluoresceína e luz azul; everter a pálpebra superior; corpo estranho retirado com cotonete umedecido após colírio anestésico ou por irrigação com soro; reexaminar no dia seguinte; glaucoma agudo (dor, edema de córnea, náusea e vômitos) tratado com acetazolamida e colírios hipotensores.",
   "Wipperman JL, Dorsch JN. Evaluation and management of corneal abrasions. Am Fam Physician 2013;87(2):114-120: irrigação com soro; se não sair, cotonete após anestésico tópico; anel de ferrugem retirado por profissional experiente em poucos dias; antibiótico tópico comum (antipseudomonas no usuário de lente de contato); sem oclusão; anestésico tópico para casa não recomendado; reavaliar em 24 h exceto abrasão pequena. https://www.aafp.org/pubs/afp/issues/2013/0115/p114.html",
   "Thompson R et al. Antibiotic prophylaxis for corneal abrasion. Cochrane Database Syst Rev 2022;CD014617: evidência insuficiente para confirmar ou afastar benefício do antibiótico tópico. https://doi.org/10.1002/14651858.CD014617.pub2",
   "Cheung AY et al. American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern 2023 (Ophthalmology 2024;131:P134): encaminhar se baixa visual, dor moderada ou intensa, secreção purulenta intensa, córnea acometida, herpes ou sem resposta; usuário de lente de contato com olho vermelho tem risco de ceratite.",
   "American Academy of Ophthalmology. Bacterial Keratitis Preferred Practice Pattern (aprovado em 22/09/2023; publicado em 2024): lente de contato é o principal fator de risco; tratamento por oftalmologista com colírio antibiótico intensivo. https://www.aao.org/education/preferred-practice-pattern/bacterial-keratitis-ppp-2023",
   "Gedde SJ et al. American Academy of Ophthalmology. Primary Angle-Closure Disease Preferred Practice Pattern 2025 (Ophthalmology 2026;133(4):P153-P201): crise aguda (dor ocular, cefaleia, náusea e vômitos, visão borrada, edema de córnea) exige redução imediata da pressão intraocular e depois iridotomia. https://www.aao.org/education/preferred-practice-pattern/primary-angle-closure-disease-ppp",
   "Bula Tobrex (tobramicina 0,3% colírio): 1 a 2 gotas a cada 4 h na infecção leve a moderada; a partir de 2 meses de idade.",
   "Bula de carmelose sódica 0,5% (lágrima artificial, ex.: Fresh Tears/Optive, Allergan): 1 a 2 gotas no olho afetado conforme a necessidade.",
   "Bula Anvisa do Anestalcon (cloridrato de proximetacaína 0,5%, Alcon/Novartis): 1 ou 2 gotas antes da retirada de corpo estranho; uso repetido lesa o epitélio e não deve ser usado para aliviar dor sem diagnóstico. https://portal.novartis.com.br/medicamentos/wp-content/uploads/2021/10/00_OLD_Bula-ANESTALCON-Solucao-Oftalmica-Medico.pdf",
   "Bula Diamox (acetazolamida 250 mg, Anvisa): glaucoma agudo de ângulo fechado, dose inicial de 500 mg e depois 125–250 mg a cada 4 h; contraindicado na alergia a sulfonamida, na hipocalemia, na hiponatremia, na insuficiência renal ou hepática grave, na cirrose, na insuficiência adrenal e na acidose. https://bula.com.br/diamox/posologia-como-usar ; https://bula.com.br/diamox/contraindicacao",
   "Bula do maleato de timolol 0,5% colírio (Timoptol, Anvisa): 1 gota no olho afetado; contraindicado na asma, na DPOC grave, na bradicardia sinusal e no bloqueio atrioventricular de 2º ou 3º grau.",
   "Expert Panel on Neurological Imaging. ACR Appropriateness Criteria Vision Loss (J Am Coll Radiol 2025;22(11S):S738-S765; PMID 41193055): a maior parte da doença não traumática do globo é diagnosticada pelo exame oftalmológico, sem imagem; no trauma com suspeita de lesão orbitária, TC de órbitas sem contraste. https://doi.org/10.1016/j.jacr.2025.08.030",
   "Bula Novalgina (dipirona 500 mg, Anvisa): adultos, 500 mg a 1 g até 4x ao dia; máximo 4 g/dia.",
   "Bula do paracetamol 500 e 750 mg registrada na Anvisa (Tylenol, Kenvue): adulto, até 1 g por dose e 4 g por dia; evitar na hepatopatia grave e no etilismo."
  ]
 },
 {
  "id": "constipacao",
  "nome": "Constipação",
  "cat": "gi",
  "cid": "K59.0",
  "sin": "intestino preso prisao de ventre",
  "casa": "Uso oral\n1) Lactulose 667mg/mL xarope ----------------- 1 fr\nTomar 15 mL VO 1x ao dia. Se não evacuar em 2 dias, aumentar para 30 mL 1x ao dia. Reduzir se as fezes ficarem líquidas.\n2) Óleo mineral ------------------------------ 1 fr\nTomar 15 mL VO à noite, longe do jantar, por até 4 dias, se fezes endurecidas.",
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
  "casa": "Uso oral\n1) Loratadina 10mg --------------------------- 7 cp\nTomar 1 cp VO 1x ao dia por 7 dias.\nOu\n1) Levocetirizina 5mg ------------------------ 7 cp\nTomar 1 cp VO à noite por 7 dias.\n\nUso tópico\n2) Betametasona 0,1% creme (valerato) -------- 1 bisnaga\nAplicar fina camada na região afetada do corpo 2x ao dia por 7 a 14 dias. Não usar na face, nas dobras nem nos genitais.\nOu\n2) Hidrocortisona 1% creme ------------------- 1 bisnaga\nAplicar fina camada 2x ao dia por até 7 dias.\n\n# Corticoide oral (opcional): dermatite extensa (mais de 20% do corpo) ou grave\nUso oral\n3) Prednisona 20mg --------------------------- 25 cp\nTomar 2 cp (40 mg) VO pela manhã, após o café, por 7 dias; depois 1 cp (20 mg) por 7 dias; depois 1/2 cp (10 mg) por 7 dias.",
  "avisoRx": ["Hidrocortisona para face, dobras ou genitais.","Prednisona (opcional, desligada): só se mais de 20% do corpo ou grave. 0,5–1 mg/kg/dia (bula: adulto 5–60 mg/dia); receita de 40 mg (70 kg): ajustar ao peso.","Prednisona: retirar em 2 a 3 semanas; curso curto ou kit de poucos dias causa rebote (AAAAI 2006, AAFP 2010). Mudou a dose: refazer a conta de comprimidos.","Prednisona: diabetes (glicemia sobe), HAS (retém sal e água), gestação (discutir risco) e infecção ativa (mascara; micose sistêmica contraindica)."],
  "unidade": "1) Prurido intenso: Loratadina 10mg VO (ou levocetirizina 5mg VO).\n   Se não puder tomar VO: Prometazina 25 mg IM profunda (não usar em idosos nem em menores de 2 anos; máx. 100 mg/dia).\n2) Identificar e afastar o agente (contato, remédio novo, cosmético, planta).\n3) Dermatite extensa (mais de 20% da superfície do corpo) ou grave: o creme não basta; corticoide oral com retirada em 2 a 3 semanas: ligar o bloco opcional da receita (prednisona 40 mg, calculada para 70 kg; 0,5–1 mg/kg/dia) e ajustar a dose ao peso.\n* Bolhas, descamação, lesões em mucosas (boca, olhos, genitais) ou febre após remédio novo: pensar em Stevens-Johnson/necrólise epidérmica tóxica — suspender o remédio e internar.\n* Placas com edema de lábios ou de glote, falta de ar ou hipotensão → protocolo de anafilaxia.",
  "orient": "- Evite contato com o que provocou a reação na pele; use sabonete neutro e hidratante.\n- Se usar a prednisona, siga a redução da receita: não pare antes nem de repente, porque a alergia pode voltar.",
  "rev": [
   "Corrigido (2026-10-28): prednisona como bloco opcional desligado na dermatite extensa ou grave (0,5–1 mg/kg/dia, retirada em 2–3 semanas; AAAAI 2006/AAFP 2010; Curtis 2014; bula Meticorten); fonte do Fonacier 2015 corrigida (não traz o corte de 20%); conferência independente.",
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): creme de dexclorfeniramina + betametasona (sem registro tópico na Anvisa; anti-histamínico tópico sensibiliza) → corticoide tópico isolado: betametasona 0,1% no corpo por 7 a 14 dias ou hidrocortisona 1% na face, dobras e genitais por até 7 dias (Fonacier 2015; Harrison, 22ª ed., cap. 60)."
  ],
  "evid": "Diretriz AAAAI/ACAAI 2015 (evidência moderada para corticoide tópico).",
  "fontes": [
   "Fonacier L et al. Contact dermatitis: a practice parameter — update 2015 (J Allergy Clin Immunol Pract 2015;3(3 Suppl):S1-S39), Summary Statement 43 — corticoide tópico pela gravidade, local e fase; evitar pomada e corticoide potente na face, pálpebras e dobras; anti-histamínico tópico é causa comum de dermatite de contato; dermatite aguda extensa e grave pode precisar de terapia sistêmica; evitar corticoide sistêmico prolongado na dermatite crônica. (O corte de 20% e a dose vêm do parâmetro de 2006.)",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 60 — Eczema, Psoriasis, Cutaneous Infections, Acne, and Other Common Skin Disorders.",
   "Bula Anvisa do Claritin (loratadina 10 mg, Bayer): adulto e maior de 12 anos, 10 mg VO 1x/dia. https://consultas.anvisa.gov.br/#/bulario/",
   "Bula Anvisa do Fenergan injetável (prometazina 25 mg/mL, Sanofi): 25–50 mg IM profunda, máximo 100 mg/dia; EV não recomendada; contraindicada em menores de 2 anos; American Geriatrics Society. 2023 AGS Beers Criteria (evitar no idoso). https://consultas.anvisa.gov.br/#/bulario/",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 63 — Cutaneous Drug Reactions (síndrome de Stevens-Johnson e necrólise epidérmica tóxica: suspender o fármaco suspeito e internar).",
   "Beltrani VS et al. (AAAAI/ACAAI/JCAAI) Contact dermatitis: a practice parameter (Ann Allergy Asthma Immunol 2006;97(3 Suppl 2):S1-S38), citado em Usatine RP, Riojas M. Diagnosis and management of contact dermatitis (Am Fam Physician 2010;82(3):249-55): mais de 20% da pele, corticoide sistêmico (alívio em 12–24 h); prednisona 0,5–1 mg/kg/dia por 5 a 7 dias e, se melhor, metade da dose por mais 5 a 7 dias; na dermatite grave por planta (Toxicodendron), retirada em 2 a 3 semanas (parar rápido causa rebote); kit de corticoide de poucos dias é insuficiente. https://www.aafp.org/pubs/afp/issues/2010/0801/p249.html",
   "Fonacier L et al. Contact dermatitis: a practice parameter — update 2015 (J Allergy Clin Immunol Pract 2015;3:S1-S39): dermatite aguda extensa e grave pode precisar de terapia sistêmica; evitar corticoide sistêmico prolongado na dermatite crônica. https://www.aaaai.org/Aaaai/media/MediaLibrary/PDF%20Documents/Practice%20and%20Parameters/Contact-dermatitis-2015.pdf",
   "Curtis G, Lewis AC. Treatment of severe poison ivy: a randomized, controlled trial of long versus short course oral prednisone (J Clin Med Res 2014;6(6):429-34): adultos, 40 mg/dia por 5 dias e retirada até o 15º dia × 5 dias só; o curso longo reduziu a necessidade de outro remédio (22,7% × 55,6%). https://doi.org/10.14740/jocmr1855w",
   "Bula Anvisa do Meticorten (prednisona 5 mg e 20 mg com sulco, MSD; versão em bula.com.br de 30/07/2025): adulto, 5 a 60 mg/dia conforme a gravidade; contraindicado na infecção sistêmica por fungos; pode exigir ajuste de hipoglicemiante no diabético; dose alta eleva a PA e retém sal e água; mascara sinais de infecção; categoria B na gestação, não usar sem orientação médica; retirar aos poucos. https://bula.com.br/original/meticorten"
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
  "casa": "Uso oral\n1) Doxiciclina 100mg ------------------------- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias.\n2) Metronidazol 250mg ------------------------ 56 cp\nTomar 2 cp VO de 12/12h por 14 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (no máximo 8 cp por dia).",
  "avisoRx": ["Reavaliar em 72h; se não melhorar, internar.","Internar se: gestante; abscesso tubo-ovariano; estado geral grave, com febre, náuseas ou vômitos; não tolera antibiótico oral ou não tem como voltar.","Internar também se dúvida com emergência cirúrgica (apendicite, gravidez ectópica) ou sem melhora em 72h.","Ofertar testes rápidos de HIV, sífilis, hepatites B e C.","Parceria sexual: ceftriaxona 500 mg IM + azitromicina 1 g VO, dose única (PCDT IST 2022)."],
  "unidade": "1) Ceftriaxona 500 mg IM, dose única (diluente com lidocaína da apresentação IM).\n2) Beta-hCG antes de iniciar.",
  "orient": "- Não tome bebida alcoólica durante o uso do metronidazol e até 3 dias depois do último comprimido.\n- Não tenha relações sexuais até o fim do tratamento, seu e da sua parceria.\n- Retorne para reavaliação em 72 horas (3 dias).\n- Faça os testes rápidos de HIV, sífilis e hepatites B e C.\n- Sua parceria sexual deve procurar a unidade de saúde para receber o tratamento (injeção e comprimidos em dose única).",
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
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias, iniciar no 1º dia do ciclo.\nOu\n1) Ácido mefenâmico 500mg -------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\nOu (naproxeno)\n1) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias, iniciar no 1º dia do ciclo.\nOu (cetoprofeno)\n1) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias, iniciar no 1º dia do ciclo.\nOu (nimesulida)\n1) Nimesulida 100mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias, iniciar no 1º dia do ciclo.\nOu (diclofenaco)\n1) Diclofenaco potássico 50mg ---------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias, iniciar no 1º dia do ciclo.",
  "avisoRx": ["Dor progressiva ou refratária: investigar endometriose com ginecologista.","Cetoprofeno, naproxeno, diclofenaco e nimesulida: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida: no máximo 100 mg de 12/12h por até 15 dias; não usar com febre, sintomas gripais, doença do fígado ou álcool em excesso (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Nimesulida: não associar a paracetamol ou a outro analgésico com risco para o fígado; usar pelo menor tempo possível (EMA 2012)."],
  "unidade": "1) Cetoprofeno 100 mg IM (ampola 50 mg/mL, 2 mL) ou EV (apresentação própria para EV, em 100 mL de SF em 20–30 min)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de soro fisiológico ou água destilada.",
  "orient": "- Use calor local (bolsa de água morna) para aliviar a dor.\n- Se a dor for piorando com o tempo ou não melhorar com o tratamento, procure um ginecologista para investigar endometriose.",
  "rev": [
   "Corrigido (2026-10-17): codeína retirada da receita (opioide sem indicação na dismenorreia primária; AINE é a 1ª linha e, se não bastar, contraceptivo hormonal) (SOGC 2017; ACOG CO 760).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Burnett M, Lemyre M. SOGC Guideline No. 345: Primary Dysmenorrhea Consensus (J Obstet Gynaecol Can 2017).",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa da nimesulida 100 mg comprimido (Vitamedic, RDC 47/2009; referência Nisulid, Aché): 50–100 mg 2x ao dia após as refeições; contraindicada < 12 anos, insuficiência hepática e renal grave. https://static-webv8.jet.com.br/drogaosuper/bulas/145802.pdf",
   "EMA. Nimesulide-containing medicinal products — referral (artigos 31 e 107i, 2007–2012): 100 mg 2x/dia, no máximo 15 dias; contraindicada com febre ou sintomas gripais, doença hepática ou outras drogas hepatotóxicas. https://www.ema.europa.eu/en/documents/other/amendments-be-included-relevant-sections-summary-product-characteristics-nimesulide-containing_en.pdf",
   "Bula Anvisa do Cataflam (diclofenaco potássico 50 mg), Novartis, bula do profissional: 100–150 mg/dia em 2–3 tomadas; doses únicas de 50–100 mg aliviam a crise de enxaqueca; dismenorreia 50–150 mg/dia (máximo 200 mg/dia). https://portal.novartis.com.br/medicamentos/wp-content/uploads/2021/10/Bula-CATAFLAM-Dragea-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
  ]
 },
 {
  "id": "dispepsia",
  "nome": "Dispepsia / DRGE / Gastrite / Epigastralgia",
  "cat": "gi",
  "cid": "K30",
  "sin": "azia queimacao estomago refluxo epigastrio gastrite",
  "casa": "Uso oral\n1) Omeprazol 20mg ---------------------------- 28 cp\nTomar 1 cp VO em jejum, 30 min antes do café da manhã, por 4 semanas.\n2) Domperidona 10mg -------------------------- 21 cp\nTomar 1 cp VO 3x ao dia, 15–30 min antes das refeições, por até 7 dias.\nOu\n2) Bromoprida 10mg --------------------------- 21 cp\nTomar 1 cp VO 3x ao dia, 30 min antes das refeições, por até 7 dias.\n3) Hidróxido de alumínio suspensão ----------- 1 fr\nTomar 10 mL VO 1h após as refeições e ao deitar, se azia, por até 7 dias.",
  "avisoRx": ["EDA ambulatorial se ≥ 40 anos, sinais de alarme, falha do IBP ou parente de 1º grau com câncer gástrico (≥ 30 anos) (V Consenso H. pylori 2026, enunc. 18).", "< 40 anos sem alarme: testar e tratar H. pylori na atenção primária (V Consenso, enunc. 6; ACG/CAG 2017; Harrison, 22ª ed., cap. 48).", "CID: DRGE K21.9 | Gastrite K29.7.", "Sucralfato: outro remédio VO 2 h antes ou depois (reduz absorção: quinolona, levotiroxina, digoxina, fenitoína, varfarina); antiácido a 30 min (bula).", "Sucralfato: cautela na DRC e diálise (acúmulo de alumínio); somar antiácido com alumínio aumenta a carga (bula).", "Sucralfato no diabetes: relatos de hiperglicemia (bula FDA); a suspensão não tem sacarose (tem sorbitol). Efeito mais comum: constipação.", "Sucralfato: azia, gastrite e úlcera estão na bula; dose única de 2 g = dose de 1 tomada da bula (protetor da mucosa)."],
  "unidade": "1) Omeprazol 40 mg EV: reconstituir no diluente próprio (10 mL) e aplicar lento, ou diluir em 100 mL de SF e correr em 20–30 min.\n2) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD\n   + Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM.\n3) Sucralfato 2 g/10 mL suspensão (Sucrafilm flaconete) 1 flaconete VO, dose única, se epigastralgia ou azia (gastrite/úlcera). Agitar antes; outro remédio VO 2 h antes ou depois.",
  "orient": "- Faça refeições menores, mais vezes ao dia; não se deite até 2 horas depois de comer; reduza bebidas alcoólicas, café, frituras e cigarro.\n- Evite anti-inflamatórios (como ibuprofeno, diclofenaco e nimesulida).\n- Procure a unidade básica de saúde (posto de saúde) para fazer endoscopia se tiver 40 anos ou mais, perda de peso, anemia, dificuldade para engolir, vômitos que não param, sangramento, caroço na barriga, se não melhorar com o tratamento, ou se tiver 30 anos ou mais e pai, mãe, irmão ou filho com câncer de estômago.\n- Se tiver menos de 40 anos e nenhum desses sinais, procure a unidade básica de saúde para fazer o exame da bactéria do estômago (H. pylori) e tratá-la, se o resultado for positivo.",
  "rev": [
   "Corrigido (2026-10-27): sucralfato 2 g (1 flaconete) VO na unidade, por decisão do médico; dose conferida na bula Sucrafilm (Anvisa 25/06/2026).",
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
   "EMA 2014: restrição da domperidona (dose e duração).",
   "Bula Anvisa do Sucrafilm suspensão oral (sucralfato 200 mg/mL; flaconete de 2 g/10 mL, caixa com 20; EMS Sigma Pharma, aprovada em 25/06/2026): protetor da mucosa 1 flaconete de 2 g por tomada (1 h antes das refeições ou ao deitar), antiulceroso 1 flaconete 2x ao dia; agitar antes; outros remédios 2 h antes ou depois, antiácido a 30 min; cautela na insuficiência renal crônica e na diálise (alumínio); indicado em úlcera, gastrite e azia; contém sorbitol. https://www.precopopular.com.br/_v/leaflet/download/NDUwMjI4",
   "Bula FDA do Carafate suspensão oral (sucralfato; AbbVie, rev. 06/2023): hiperglicemia relatada em diabéticos, constipação em 2%, bezoar, acúmulo de alumínio na insuficiência renal crônica e na diálise. https://www.rxabbvie.com/pdf/carafate-oral-suspension_pi.pdf"
  ]
 },
 {
  "id": "lombalgia",
  "nome": "Lombalgia / Dorsalgia / Dor muscular",
  "cat": "dor",
  "cid": "M54.5",
  "sin": "dor nas costas lombar muscular mialgia",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\nOu (paracetamol)\n1) Paracetamol 750mg ------------------------- 20 cp\nTomar 1 cp VO de 6/6h se dor (no máximo 4 cp por dia).\n2) Ciclobenzaprina 10mg ---------------------- 14 cp\nTomar 1 cp VO de 12/12h por até 7 dias.\nOu (ciclobenzaprina 5 mg à noite)\n2) Ciclobenzaprina 5mg ----------------------- 7 cp\nTomar 1 cp VO 1x ao dia, à noite, por até 7 dias.\nOu (ciclobenzaprina 5 mg de 8/8h)\n2) Ciclobenzaprina 5mg ----------------------- 21 cp\nTomar 1 cp VO de 8/8h por até 7 dias.\nOu (tiocolchicosídeo)\n2) Tiocolchicosídeo 4mg (Coltrax) ------------ 20 cp\nTomar 2 cp (8 mg) VO de 12/12h por 5 dias. No máximo 4 cp por dia; não usar por mais de 7 dias.\n3) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu (diclofenaco)\n3) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu (cetoprofeno)\n3) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (celecoxibe)\n3) Celecoxibe 200mg -------------------------- 10 cápsulas\nTomar 1 cápsula VO de 12/12h por 5 dias.\nOu (cetorolaco)\n3) Cetorolaco 10mg sublingual (Toragesic) ---- 15 cp\nColocar 1 cp debaixo da língua de 8/8h por até 5 dias e deixar dissolver, sem mastigar nem engolir.\nOu (naproxeno)\n3) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (nimesulida)\n3) Nimesulida 100mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\n\n# Se dor intensa que não melhora com os anteriores: tramadol\n4) Tramadol 50mg ----------------------------- 10 cp\nTomar 1 cp VO de 8/8h somente se dor intensa que não melhora com os anteriores, por até 5 dias (no máximo 3 cp por dia).\n\n# Benzodiazepínico (opcional): espasmo intenso que atrapalha o sono\n5) Diazepam 5mg ------------------------------ 5 cp\nTomar 1 cp VO 1x ao dia, à noite, ao deitar, por até 5 dias.",
  "avisoRx": ["Anti-inflamatório só depois de descartar dengue; não usar na gestação, na doença renal, com úlcera ou com anticoagulante.","Cetoprofeno, celecoxibe, cetorolaco, nimesulida e naproxeno: mesmas restrições do ibuprofeno e do diclofenaco.","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Celecoxibe: contraindicado na alergia a sulfa, na doença do fígado e na dor pós-operatória de revascularização miocárdica; retenção da receita: 2 vias.","Cetorolaco: até 5 dias somando o injetável; ≥ 65 anos, < 50 kg ou insuficiência renal leve: até 40 mg/dia. Não usar se desidratado ou IR moderada/grave.","Cetorolaco: não usar com asma e pólipo nasal, alergia a AINE, úlcera, sangramento, doença renal moderada/grave, doença cardiovascular, gestação ou lactação.","Nimesulida: no máximo 100 mg de 12/12h por até 15 dias; não usar com febre, sintomas gripais, doença do fígado ou álcool em excesso (EMA).","Nimesulida: não associar a paracetamol ou a outro analgésico com risco para o fígado; usar pelo menor tempo possível (EMA 2012).","Tiocolchicosídeo: não usar na gestação, amamentação, mulher fértil sem contracepção, alergia à colchicina ou < 16 anos; máximo 7 dias (EMA 2013; bula Coltrax).","Tiocolchicosídeo: pode causar convulsão, sobretudo na epilepsia (bula Coltrax).","Tiocolchicosídeo: há relatos de lesão do fígado, sobretudo junto com AINE ou paracetamol; suspender se icterícia (bula Coltrax).","Coltrax IM: no máximo 4 mg de 12/12h (8 mg/dia) por até 5 dias; VO no máximo 7 dias (bula Coltrax; EMA 2013).","Ciclobenzaprina: evitar em idosos (Beers 2023).","Ciclobenzaprina com tramadol ou antidepressivo: síndrome serotoninérgica. Não usar após IAM recente, arritmia, bloqueio, IC, hipertireoidismo ou com IMAO.","Diazepam somado ao AINE não melhorou a lombalgia aguda (Friedman 2017): só se espasmo intenso, à noite e por poucos dias.","Diazepam exige Notificação de Receita B (azul) (Portaria SVS/MS 344/1998). Evitar em idoso, apneia do sono, álcool e opioide.","Diazepam com ciclobenzaprina soma sedação: preferir tiocolchicosídeo ou deixar sem relaxante.","Tramadol com diazepam: risco de sedação profunda e depressão respiratória (FDA 2016); evitar a associação.","Tramadol exige Receita de Controle Especial em 2 vias (Portaria SVS/MS 344/1998, lista A2, adendo).","CID dorsalgia M54.9 | mialgia M79.1."],
  "unidade": "1) Cetoprofeno 100 mg IM (ampola 50 mg/mL, 2 mL) ou EV (apresentação própria para EV, em 100 mL de SF em 20–30 min)\n   Ou Cetorolaco 30 mg (ampola 30 mg/mL) IM profunda e lenta ou EV em bolus (≥ 15 s); ≥ 65 anos, < 50 kg ou insuficiência renal leve: 15 mg. Não usar com desidratação nem insuficiência renal moderada ou grave.\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Tiocolchicosídeo 4 mg (Coltrax, ampola 4 mg/2 mL) IM, dose única; no máximo 4 mg de 12/12h (8 mg/dia) por até 5 dias.",
  "orient": "- Mantenha-se ativo e evite ficar o tempo todo deitado; use calor local (bolsa de água morna).\n- Se a dor não melhorar em algumas semanas, procure a unidade básica de saúde (posto de saúde) para avaliar fisioterapia ou exercícios supervisionados.\n- Volte imediatamente ao pronto-socorro se tiver: perda de força nas pernas, perda do controle da urina ou das fezes ou dificuldade para urinar, dormência nas nádegas e na parte interna das coxas, febre, se a dor começou depois de queda ou pancada, se já teve câncer ou se está perdendo peso sem explicação.\n- Se tiver dor no corpo com febre, não use anti-inflamatórios (ibuprofeno, diclofenaco, cetoprofeno, celecoxibe, cetorolaco, naproxeno ou nimesulida) até que a dengue seja descartada.\n- O relaxante muscular e o tramadol podem dar sono: não dirija nos dias em que tomar.\n- Se usar diazepam: dá sono; não dirija, não beba bebida alcoólica e não tome outro calmante ou remédio para dormir junto.",
  "rev": [
   "Corrigido (2026-10-29): cetorolaco: \"doença renal: 15 mg / 40 mg/dia\" → insuficiência renal leve (15 mg IM/EV; até 40 mg/dia VO); não usar com desidratação nem insuficiência renal moderada ou grave (bula Toragesic, conferência independente de 2026-10-29).",
   "Ajustado (2026-10-26, decisão do médico): ciclobenzaprina 10 mg de 12/12h como padrão, 5 mg à noite ou de 8/8h por toque; contratura e cervicalgia passam a ter conduta própria (contratura).",
   "Reorganizado (2026-10-25): receita por classes (analgésico comum, relaxante até 7 dias, anti-inflamatório); celecoxibe e cetorolaco como alternativas; ciclobenzaprina de 10 para 7 dias (decisão do médico de 2026-10-23).",
   "Ajustado (2026-10-25): tramadol vira bloco opcional, só se dor intensa sem melhora (NICE NG59; CDC 2022); diazepam como bloco opcional com aviso de risco (Friedman 2017; Beers 2023).",
   "Adicionado (2026-10-25): cetorolaco e tiocolchicosídeo (Coltrax) IM na unidade (bulas Toragesic e Coltrax injetável; EMA 2013); fisioterapia nas orientações.",
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
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue).",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa da nimesulida 100 mg comprimido (Vitamedic, RDC 47/2009; referência Nisulid, Aché): 50–100 mg 2x ao dia após as refeições; contraindicada < 12 anos, insuficiência hepática e renal grave. https://static-webv8.jet.com.br/drogaosuper/bulas/145802.pdf",
   "EMA. Nimesulide-containing medicinal products — referral (artigos 31 e 107i, 2007–2012): 100 mg 2x/dia, no máximo 15 dias; contraindicada com febre ou sintomas gripais, doença hepática ou outras drogas hepatotóxicas. https://www.ema.europa.eu/en/documents/other/amendments-be-included-relevant-sections-summary-product-characteristics-nimesulide-containing_en.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Miosan (cloridrato de ciclobenzaprina 5 e 10 mg): dose usual 20–40 mg/dia em 2 a 4 tomadas, máximo 60 mg/dia; uso por mais de 2–3 semanas só com supervisão. https://bula.com.br/miosan/posologia-como-usar",
   "Bula Anvisa do Coltrax (tiocolchicosídeo 4 mg comprimido), Sanofi-Aventis, atualizada em 22/11/2019: 8 mg (2 cp) de 12/12h, máximo 16 mg/dia, por até 7 dias; contraindicado na gestação, lactação, mulher fértil sem contracepção, epilepsia e < 16 anos. https://www.bulas.med.br/p/bula/2357/coltrax+comprimidos.htm",
   "EMA/CHMP. Thiocolchicoside-containing medicines — referral (21/11/2013): uso sistêmico só como adjuvante na contratura aguda de origem vertebral, ≥ 16 anos; oral no máximo 8 mg de 12/12h por até 7 dias (risco de aneuploidia do metabólito M2). https://www.ema.europa.eu/en/medicines/human/referrals/thiocolchicoside-containing-medicines",
   "van Tulder MW et al. Muscle relaxants for non-specific low back pain. Cochrane Database Syst Rev 2003;(2):CD004252 (benzodiazepínicos e não benzodiazepínicos, incluindo tiocolchicosídeo, ciclobenzaprina e orfenadrina, eficazes no curto prazo na lombalgia aguda). https://doi.org/10.1002/14651858.CD004252",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc",
   "Bula Anvisa do Celebra (celecoxibe 200 mg cápsula), Viatris, aprovada em 06/09/2021: dor aguda musculoesquelética 400 mg e depois 200 mg de 12/12h, conforme necessário; contraindicado na alergia a sulfonamida, doença hepática, IR grave e na revascularização miocárdica; venda com retenção da receita. https://www.viatris.com/-/media/project/common/viatris/pdf/brazil/leaflets_legacy_myl_brazil/celebra_celcap_27_bula_profissional_net.pdf",
   "Bula Anvisa do Toragesic sublingual (cetorolaco de trometamol 10 mg), EMS, atualizada em 07/11/2025: 10 mg de 6/6 a 8/8h; máximo 60 mg/dia (< 65 anos) e 40 mg/dia (> 65 anos, < 50 kg ou IR); até 5 dias; contraindicado na úlcera, sangramento, asma, IR grave, doença cardiovascular, gestação e lactação. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/1347108/toragesic-sublingual.htm",
   "Bula Anvisa do Toragesic injetável (cetorolaco 30 mg/mL), EMS: dose única < 65 anos 30–60 mg IM ou 30 mg EV; ≥ 65 anos, < 50 kg ou IR 15–30 mg IM ou 15 mg EV; EV em bolus em no mínimo 15 s; máximo 90 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1261029/posologia+toragesic.htm",
   "Bula Anvisa do Coltrax injetável (tiocolchicosídeo 4 mg/2 mL), Sanofi-Aventis, atualizada em 08/08/2019: 4 mg IM de 12/12h, máximo 8 mg/dia, por até 5 dias; mesmas contraindicações; hepatotoxicidade relatada, sobretudo com AINE ou paracetamol. https://www.bulas.med.br/p/bula/2358/coltrax+solucao+injetavel.htm",
   "FDA. Flexeril (cyclobenzaprine HCl) — prescribing information (2013): 5 mg 3x/dia, podendo subir a 10 mg 3x/dia; uso só por curto prazo (2–3 semanas); contraindicada com IMAO, no hipertireoidismo, na fase aguda do IAM, arritmia, bloqueio e insuficiência cardíaca. https://www.accessdata.fda.gov/drugsatfda_docs/label/2013/017821s051lbl.pdf",
   "Bula Anvisa do Valium (diazepam 5 e 10 mg), Roche: espasmo muscular reflexo por trauma local; adulto 5–10 mg inicial, 5–20 mg/dia, cada dose oral em geral até 10 mg; contraindicado na insuficiência respiratória grave, apneia do sono, miastenia e insuficiência hepática grave. https://www.saudedireta.com.br/catinc/drugs/bulas/valium.pdf",
   "Friedman BW et al. Diazepam is no better than placebo when added to naproxen for acute low back pain. Ann Emerg Med 2017;70(2):169-176. https://doi.org/10.1016/j.annemergmed.2016.10.002",
   "FDA Drug Safety Communications: opioide com benzodiazepínico, tarja de risco de sedação profunda, depressão respiratória e morte (31/08/2016); benzodiazepínicos, tarja de abuso, dependência e abstinência (23/09/2020). https://www.fda.gov/drugs/drug-safety-and-availability/fda-requiring-boxed-warning-updated-improve-safe-use-benzodiazepine-drug-class",
   "Ministério da Saúde/SVS. Portaria nº 344, de 12/05/1998 (lista B1, psicotrópicos, com atualizações da Anvisa): diazepam com Notificação de Receita B, validade de 30 dias. https://bvsms.saude.gov.br/bvs/saudelegis/svs/1998/prt0344_12_05_1998_rep.html",
   "Ministério da Saúde/SVS. Portaria nº 344, de 12/05/1998, e atualizações da Anvisa (lista A2, adendo): tramadol até 100 mg por unidade posológica com Receita de Controle Especial em 2 vias. https://bvsms.saude.gov.br/bvs/saudelegis/svs/1998/prt0344_12_05_1998_rep.html",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf"
  ]
 },
 {
  "id": "contratura",
  "nome": "Contratura muscular / Cervicalgia / Torcicolo",
  "cat": "dor",
  "cid": "M62.8",
  "sin": "torcicolo pescoco cervical nuca trapezio espasmo contratura mialgia dor muscular mau jeito",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\nOu (paracetamol)\n1) Paracetamol 750mg ------------------------- 20 cp\nTomar 1 cp VO de 6/6h se dor (no máximo 4 cp por dia).\n2) Ciclobenzaprina 10mg ---------------------- 14 cp\nTomar 1 cp VO de 12/12h por até 7 dias.\nOu (ciclobenzaprina 5 mg)\n2) Ciclobenzaprina 5mg ----------------------- 21 cp\nTomar 1 cp VO de 8/8h por até 7 dias.\nOu (tiocolchicosídeo)\n2) Tiocolchicosídeo 4mg (Coltrax) ------------ 20 cp\nTomar 2 cp (8 mg) VO de 12/12h por 5 dias. No máximo 4 cp por dia; não usar por mais de 7 dias.\n3) Celecoxibe 200mg -------------------------- 10 cápsulas\nTomar 1 cápsula VO de 12/12h por 5 dias.\nOu (naproxeno)\n3) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (nimesulida)\n3) Nimesulida 100mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (cetorolaco)\n3) Cetorolaco 10mg sublingual (Toragesic) ---- 15 cp\nColocar 1 cp debaixo da língua de 8/8h por até 5 dias e deixar dissolver, sem mastigar nem engolir.\nOu (ibuprofeno)\n3) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu (diclofenaco)\n3) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu (cetoprofeno)\n3) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\n\n# Benzodiazepínico (opcional): espasmo intenso que atrapalha o sono\n4) Diazepam 5mg ------------------------------ 5 cp\nTomar 1 cp VO 1x ao dia, à noite, ao deitar, por até 5 dias.",
  "avisoRx": ["Anti-inflamatório só depois de descartar dengue; não usar na gestação, na doença renal, com úlcera ou com anticoagulante.","Ibuprofeno, diclofenaco e cetoprofeno: mesmas restrições dos demais anti-inflamatórios (dengue, gestação, doença renal, úlcera, anticoagulante).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Celecoxibe: contraindicado na alergia a sulfa, na doença do fígado e na dor pós-operatória de revascularização miocárdica; retenção da receita: 2 vias.","Cetorolaco: até 5 dias somando o injetável; ≥ 65 anos, < 50 kg ou insuficiência renal leve: até 40 mg/dia. Não usar se desidratado ou IR moderada/grave.","Cetorolaco: não usar com asma e pólipo nasal, alergia a AINE, úlcera, sangramento, doença renal moderada/grave, doença cardiovascular, gestação ou lactação.","Nimesulida: no máximo 100 mg de 12/12h por até 15 dias; não usar com febre, sintomas gripais, doença do fígado ou álcool em excesso (EMA).","Nimesulida: não associar a paracetamol ou a outro analgésico com risco para o fígado; usar pelo menor tempo possível (EMA 2012).","Tiocolchicosídeo: não usar na gestação, amamentação, mulher fértil sem contracepção, alergia à colchicina ou < 16 anos; máximo 7 dias (EMA 2013; bula Coltrax).","Tiocolchicosídeo: pode causar convulsão, sobretudo na epilepsia (bula Coltrax).","Tiocolchicosídeo: há relatos de lesão do fígado, sobretudo junto com AINE ou paracetamol; suspender se icterícia (bula Coltrax).","Coltrax IM: no máximo 4 mg de 12/12h (8 mg/dia) por até 5 dias; VO no máximo 7 dias (bula Coltrax; EMA 2013).","Ciclobenzaprina: evitar em idosos (Beers 2023); não usar após IAM recente, arritmia, bloqueio, insuficiência cardíaca, hipertireoidismo ou com IMAO.","Ciclobenzaprina com antidepressivo ou tramadol: risco de síndrome serotoninérgica (bula Miosan).","Diazepam somado ao AINE não melhorou a lombalgia aguda (Friedman 2017): só se espasmo intenso, à noite e por poucos dias.","Diazepam exige Notificação de Receita B (azul) (Portaria SVS/MS 344/1998). Evitar em idoso, apneia do sono, álcool e opioide.","Diazepam com ciclobenzaprina soma sedação: preferir tiocolchicosídeo ou deixar sem relaxante.","CID cervicalgia M54.2 | torcicolo M43.6 | mialgia M79.1."],
  "unidade": "1) Cetoprofeno 100 mg IM (ampola 50 mg/mL, 2 mL) ou EV (apresentação própria para EV, em 100 mL de SF em 20–30 min)\n   Ou Cetorolaco 30 mg (ampola 30 mg/mL) IM profunda e lenta ou EV em bolus (≥ 15 s); ≥ 65 anos, < 50 kg ou insuficiência renal leve: 15 mg. Não usar com desidratação nem insuficiência renal moderada ou grave.\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Tiocolchicosídeo 4 mg (Coltrax, ampola 4 mg/2 mL) IM, dose única; no máximo 4 mg de 12/12h (8 mg/dia) por até 5 dias.",
  "orient": "- Use calor local: bolsa de água morna enrolada numa toalha, algumas vezes ao dia, sem queimar a pele.\n- Continue se movimentando e mexa o pescoço devagar, dentro do limite da dor; ficar parado piora a rigidez. Durma com travesseiro baixo e firme.\n- Se a dor não melhorar em algumas semanas ou voltar com frequência, procure a unidade básica de saúde (posto de saúde) para ser encaminhado à fisioterapia.\n- Volte imediatamente ao pronto-socorro se tiver: fraqueza, dormência ou formigamento nos braços ou nas pernas, dificuldade para andar ou perda do controle da urina ou das fezes; febre com pescoço duro ou dor de cabeça forte; dor de cabeça muito forte e súbita, visão dupla, pálpebra caída, tontura forte ou fala enrolada; dor no peito, falta de ar ou suor frio; se a dor começou depois de queda, batida ou acidente; se já teve câncer ou está perdendo peso sem explicação.\n- Se tiver dor no corpo com febre, não use anti-inflamatório (celecoxibe, naproxeno, nimesulida, cetorolaco, ibuprofeno, diclofenaco ou cetoprofeno) até que a dengue seja descartada.\n- O relaxante muscular pode dar sono: não dirija nos dias em que tomar.\n- Se usar diazepam: dá sono; não dirija, não beba bebida alcoólica e não tome outro calmante ou remédio para dormir junto.",
  "rev": [
   "Corrigido (2026-10-29): cetorolaco: \"doença renal: 15 mg / 40 mg/dia\" → insuficiência renal leve (15 mg IM/EV; até 40 mg/dia VO); não usar com desidratação nem insuficiência renal moderada ou grave (bula Toragesic, conferência independente de 2026-10-29).",
   "Ajustado (2026-10-26, decisão do médico): celecoxibe como anti-inflamatório padrão, com naproxeno, nimesulida, cetorolaco, ibuprofeno, diclofenaco e cetoprofeno por toque; ciclobenzaprina 10 mg de 12/12h como padrão e 5 mg de 8/8h como alternativa; diazepam só como bloco opcional; sem colar cervical.",
   "Criada (2026-10-25): conduta por classes (analgésico comum, relaxante muscular até 7 dias, anti-inflamatório, benzodiazepínico opcional), calor local e fisioterapia, por decisão do médico de 2026-10-23."
  ],
  "fontes": [
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 19 — Neck Pain: evolução favorável; AINE, paracetamol, calor ou frio; ciclobenzaprina 5–10 mg à noite; fisioterapia com exercício supervisionado; sinais de alarme (mielopatia, câncer, infecção, trauma).",
   "Blanpied PR et al. Neck Pain: Revision 2017. Clinical Practice Guidelines (APTA/JOSPT). J Orthop Sports Phys Ther 2017;47(7):A1-A83. https://doi.org/10.2519/jospt.2017.0302",
   "Côté P et al. Management of neck pain and associated disorders: a clinical practice guideline from the OPTIMa Collaboration. Eur Spine J 2016;25(7):2000-2022. https://doi.org/10.1007/s00586-016-4467-7",
   "Finucane LM et al. International Framework for Red Flags for Potential Serious Spinal Pathologies. J Orthop Sports Phys Ther 2020;50(7):350-372. https://doi.org/10.2519/jospt.2020.9971",
   "Qaseem A et al. ACP Guideline: Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain (Ann Intern Med 2017;166:514): calor superficial; se remédio, AINE ou relaxante muscular (evidência moderada).",
   "NICE NG59. Low back pain and sciatica in over 16s: assessment and management, 2016 (atualizada em 2020): manter-se ativo; AINE na menor dose e pelo menor tempo; não oferecer paracetamol isolado, opioide fraco só se AINE contraindicado ou ineficaz.",
   "NHS. Neck pain (revisado em 27/04/2023): paracetamol ou ibuprofeno, travesseiro baixo e firme, calor, manter-se em movimento; procurar o médico se não melhorar em algumas semanas ou se formigamento ou fraqueza no braço. https://www.nhs.uk/conditions/neck-pain/",
   "Bula Anvisa do Celebra (celecoxibe 200 mg cápsula), Viatris, aprovada em 06/09/2021: dor aguda musculoesquelética 400 mg e depois 200 mg de 12/12h, conforme necessário; contraindicado na alergia a sulfonamida, doença hepática, IR grave e na revascularização miocárdica; venda com retenção da receita. https://www.viatris.com/-/media/project/common/viatris/pdf/brazil/leaflets_legacy_myl_brazil/celebra_celcap_27_bula_profissional_net.pdf",
   "Bula Anvisa do Toragesic sublingual (cetorolaco de trometamol 10 mg), EMS, atualizada em 07/11/2025: 10 mg de 6/6 a 8/8h; máximo 60 mg/dia (< 65 anos) e 40 mg/dia (> 65 anos, < 50 kg ou IR); até 5 dias; contraindicado na úlcera, sangramento, asma, IR grave, doença cardiovascular, gestação e lactação. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/1347108/toragesic-sublingual.htm",
   "Bula Anvisa do Toragesic injetável (cetorolaco 30 mg/mL), EMS: dose única < 65 anos 30–60 mg IM ou 30 mg EV; ≥ 65 anos, < 50 kg ou IR 15–30 mg IM ou 15 mg EV; EV em bolus em no mínimo 15 s; máximo 90 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1261029/posologia+toragesic.htm",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc",
   "Bula Anvisa da nimesulida 100 mg comprimido (Vitamedic, RDC 47/2009; referência Nisulid, Aché): 50–100 mg 2x ao dia após as refeições; contraindicada < 12 anos, insuficiência hepática e renal grave. https://static-webv8.jet.com.br/drogaosuper/bulas/145802.pdf",
   "EMA. Nimesulide-containing medicinal products — referral (artigos 31 e 107i, 2007–2012): 100 mg 2x/dia, no máximo 15 dias; contraindicada com febre ou sintomas gripais, doença hepática ou outras drogas hepatotóxicas. https://www.ema.europa.eu/en/documents/other/amendments-be-included-relevant-sections-summary-product-characteristics-nimesulide-containing_en.pdf",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do Coltrax (tiocolchicosídeo 4 mg comprimido), Sanofi-Aventis, atualizada em 22/11/2019: 8 mg (2 cp) de 12/12h, máximo 16 mg/dia, por até 7 dias; contraindicado na gestação, lactação, mulher fértil sem contracepção, epilepsia e < 16 anos. https://www.bulas.med.br/p/bula/2357/coltrax+comprimidos.htm",
   "Bula Anvisa do Coltrax injetável (tiocolchicosídeo 4 mg/2 mL), Sanofi-Aventis, atualizada em 08/08/2019: 4 mg IM de 12/12h, máximo 8 mg/dia, por até 5 dias; mesmas contraindicações; hepatotoxicidade relatada, sobretudo com AINE ou paracetamol. https://www.bulas.med.br/p/bula/2358/coltrax+solucao+injetavel.htm",
   "EMA/CHMP. Thiocolchicoside-containing medicines — referral (21/11/2013): uso sistêmico só como adjuvante na contratura aguda de origem vertebral, ≥ 16 anos; oral no máximo 8 mg de 12/12h por até 7 dias; IM no máximo 4 mg de 12/12h por até 5 dias. https://www.ema.europa.eu/en/medicines/human/referrals/thiocolchicoside-containing-medicines",
   "Bula Anvisa do Miosan (cloridrato de ciclobenzaprina 5 e 10 mg): dose usual 20–40 mg/dia em 2 a 4 tomadas, máximo 60 mg/dia; uso por mais de 2–3 semanas só com supervisão. https://bula.com.br/miosan/posologia-como-usar",
   "FDA. Flexeril (cyclobenzaprine HCl) — prescribing information (2013): 5 mg 3x/dia, podendo subir a 10 mg 3x/dia; uso só por curto prazo (2–3 semanas); contraindicada com IMAO, no hipertireoidismo, na fase aguda do IAM, arritmia, bloqueio e insuficiência cardíaca. https://www.accessdata.fda.gov/drugsatfda_docs/label/2013/017821s051lbl.pdf",
   "Bula Anvisa do Valium (diazepam 5 e 10 mg), Roche: espasmo muscular reflexo por trauma local; adulto 5–10 mg inicial, 5–20 mg/dia, cada dose oral em geral até 10 mg; contraindicado na insuficiência respiratória grave, apneia do sono, miastenia e insuficiência hepática grave. https://www.saudedireta.com.br/catinc/drugs/bulas/valium.pdf",
   "Friedman BW et al. Diazepam is no better than placebo when added to naproxen for acute low back pain. Ann Emerg Med 2017;70(2):169-176. https://doi.org/10.1016/j.annemergmed.2016.10.002",
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): evitar relaxantes musculares e benzodiazepínicos no idoso.",
   "FDA Drug Safety Communications: opioide com benzodiazepínico, tarja de risco de sedação profunda, depressão respiratória e morte (31/08/2016); benzodiazepínicos, tarja de abuso, dependência e abstinência (23/09/2020). https://www.fda.gov/drugs/drug-safety-and-availability/fda-requiring-boxed-warning-updated-improve-safe-use-benzodiazepine-drug-class",
   "Ministério da Saúde/SVS. Portaria nº 344, de 12/05/1998 (lista B1, psicotrópicos, com atualizações da Anvisa): diazepam com Notificação de Receita B, validade de 30 dias. https://bvsms.saude.gov.br/bvs/saudelegis/svs/1998/prt0344_12_05_1998_rep.html",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue).",
   "Bula Novalgina (dipirona 500 mg, Anvisa): adultos, 500 mg a 1 g até 4x ao dia; máximo 4 g/dia.",
   "Bula do paracetamol 750 mg registrada na Anvisa (Tylenol, Kenvue): adulto, até 1 g por dose e 4 g por dia; evitar na hepatopatia grave e no etilismo."
  ]
 },
 {
  "id": "tinea",
  "nome": "Dermatofitose interdigital (Tinea pedis)",
  "cat": "pele",
  "cid": "B35.3",
  "sin": "frieira pe de atleta micose",
  "casa": "Uso tópico\n1) Clotrimazol 1% creme ---------------------- 1 bisnaga\nAplicar fina camada entre os dedos 2x ao dia por 4 semanas (manter 1 semana após a melhora).",
  "unidade": "1) Examinar entre os dedos e a planta: fissuras, maceração, vermelhidão que se espalha pelo pé ou pela perna, calor e dor (celulite/erisipela — a tinea é porta de entrada) → ver Erisipela.\n2) Diabético: examinar o pé inteiro (úlcera, infecção, pulsos, sensibilidade); úlcera ou infecção no pé diabético não é caso só de creme.\n3) Unhas acometidas: ver Onicomicose (o creme não trata a unha).\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Seque bem entre os dedos após o banho, troque as meias todos os dias e prefira calçados arejados.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Ajustado: 14 dias → 4 semanas.",
   "Removido: dipirona IM na unidade (sem indicação)."
  ],
  "fontes": [
   "Crawford F, Hollis S. Topical treatments for fungal infections of the skin and nails of the foot (Cochrane 2007;CD001434).",
   "Stevens DL et al. IDSA Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update (Clin Infect Dis 2014;59:e10): identificar e tratar fatores predisponentes da celulite, como fissuras interdigitais e tinea pedis; impetigo e glomerulonefrite pós-estreptocócica.",
   "Senneville É et al. IWGDF/IDSA Guidelines on the diagnosis and treatment of diabetes-related foot infections (Clin Infect Dis 2023;ciad527): examinar o pé inteiro do diabético; infecção no pé diabético exige avaliação clínica e tratamento sistêmico conforme a gravidade. https://doi.org/10.1093/cid/ciad527"
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
  "unidade": "1) Confirmar o quadro: prurido anal, pior à noite; em meninas, também prurido vulvar ou corrimento.\n2) Lesões de coçadura infectadas (crostas, pus): tratar como impetigo.\n3) Gestante: não usar albendazol (bula); discutir com o pré-natal.\n4) Orientar o tratamento de todos que moram na mesma casa e as medidas de higiene.\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Todas as pessoas que moram na mesma casa também precisam ser tratadas.\n- Lave roupas de cama e toalhas em água quente, mantenha as unhas curtas e lave bem as mãos.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
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
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO no início da crise, após alimentar-se; pode repetir após 8h (no máximo 3 cp por dia).\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO no início da crise, após alimentar-se; pode repetir após 12h (no máximo 2 cp por dia).\nOu (diclofenaco)\n2) Diclofenaco potássico 50mg ---------------- 9 cp\nTomar 1 cp VO no início da crise, após alimentar-se; pode repetir após 8h (no máximo 3 cp por dia).\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO no início da crise, após alimentar-se; pode repetir após 12h (no máximo 2 cp por dia).\n3) Naratriptana 2,5mg ------------------------ 4 cp\nTomar 1 cp VO no início da crise. Se a dor voltar, pode repetir após 4h, no máximo 2 cp por dia. Se o 1º não aliviar, não repetir.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Triptano contraindicado em doença coronariana, AVC prévio e HAS não controlada.","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013."],
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
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue).",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Cataflam (diclofenaco potássico 50 mg), Novartis, bula do profissional: 100–150 mg/dia em 2–3 tomadas; doses únicas de 50–100 mg aliviam a crise de enxaqueca; dismenorreia 50–150 mg/dia (máximo 200 mg/dia). https://portal.novartis.com.br/medicamentos/wp-content/uploads/2021/10/Bula-CATAFLAM-Dragea-Medico.pdf",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Marmura MJ, Silberstein SD, Schwedt TJ. The acute treatment of migraine in adults: the American Headache Society evidence assessment of migraine pharmacotherapies. Headache 2015;55(1):3–20 (diclofenaco e naproxeno nível A; cetoprofeno nível B). https://doi.org/10.1111/head.12499",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc",
   "Ailani J et al. The American Headache Society Consensus Statement: update on integrating new migraine treatments into clinical practice. Headache 2021;61(7):1021-1039. doi:10.1111/head.14153"
  ]
 },
 {
  "id": "escabiose",
  "nome": "Escabiose / Sarna",
  "cat": "pele",
  "cid": "B86",
  "sin": "sarna coceira noturna",
  "casa": "Uso tópico\n1) Permetrina 5% loção/creme ----------------- 1 fr\nAplicar à noite do pescoço aos pés, inclusive entre os dedos, sob as unhas, no umbigo e nos genitais; deixar agir 8–12h e retirar no banho. Repetir após 7 dias.\n\nUso oral\n2) Ivermectina 6mg --------------------------- conforme peso\nTomar VO em dose única, com água, e repetir após 7 dias. Dose por peso: 15–24 kg ½ cp; 25–35 kg 1 cp; 36–50 kg 1½ cp; 51–65 kg 2 cp; 66–79 kg 2½ cp; 80 kg ou mais 200 mcg/kg.\n\n3) Hidroxizina 25mg -------------------------- 20 cp\nTomar 1 cp VO à noite (ou de 8/8h) se coceira (no máximo 3 cp por dia).",
  "avisoRx": ["Ivermectina: casos extensos, falha do tópico ou surtos.","Ivermectina: não usar abaixo de 15 kg ou de 5 anos; na gestação, só com indicação médica (preferir permetrina).","Gestante, amamentando e criança a partir de 2 meses: permetrina é a escolha.","Hidroxizina: evitar em idosos (ver alerta).","Permetrina em idoso e criança pequena: aplicar também no couro cabeludo e na face, poupando olhos e boca (bula)."],
  "unidade": "1) Examinar entre os dedos, punhos, axilas, cintura, umbigo, aréolas e genitais (túneis e pápulas).\n2) Lesões infectadas (crostas melicéricas, pus, celulite): tratar a infecção (ver Impetigo/Erisipela).\n3) Crostas espessas e extensas, sobretudo em idoso, acamado ou imunossuprimido (sarna crostosa): muito contagiosa — isolamento de contato, tratamento combinado (tópico + oral, em várias doses; o esquema da receita não basta) e discutir internação ou dermatologista.\n4) Casos em asilo, creche ou outra instituição: avisar a vigilância epidemiológica do município (surto).\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Todas as pessoas que moram com você ou têm contato próximo devem ser tratadas ao mesmo tempo.\n- Lave roupas de cama e roupas de uso em água quente, ou guarde-as em saco fechado por 72 horas.\n- A coceira pode continuar por 2 a 4 semanas mesmo após o tratamento correto.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): ivermectina pela tabela de peso da bula (½ cp de 15–24 kg a 2½ cp de 66–79 kg; 200 mcg/kg a partir de 80 kg), com água, sem uso abaixo de 15 kg ou de 5 anos (bula Revectina); permetrina como escolha na gestação, na amamentação e a partir de 2 meses, com couro cabeludo e face em idosos e crianças pequenas (IUSTI 2026; bula da permetrina 5%); hidroxizina com no máximo 3 cp por dia e aviso para idosos (bula Hixizine; Beers 2023); IUSTI 2017 → 2026.",
   "Corrigido: ivermectina '3 cp' fixos → dose por peso (200 mcg/kg). Use a Calculadora.",
   "Trocado: dipirona IM para prurido → hidroxizina VO."
  ],
  "fontes": [
   "IUSTI. 2026 European Guideline for the Management of Scabies (versão final, jun/2026): permetrina 5% por 8–12 h repetida em 7–14 dias; ivermectina 200 mcg/kg em 2 doses com 1 semana de intervalo; gestação, amamentação e lactentes. https://iusti.org/treatment-guideline",
   "Bula Revectina (ivermectina 6 mg), Abbott, registrada na Anvisa — tabela de dose por peso; contraindicada abaixo de 15 kg ou 5 anos.",
   "Bula da permetrina 5% loção (Nedax), registrada na Anvisa — uso a partir de 2 meses.",
   "Bula Hixizine (hidroxizina 25 mg), registrada na Anvisa — adulto 25 mg 3 a 4x ao dia; American Geriatrics Society. Beers Criteria, 2023 (anti-histamínico de 1ª geração: evitar no idoso).",
   "Centers for Disease Control and Prevention. Scabies — Clinical Care, 2024. https://www.cdc.gov/scabies/hcp/clinical-care/",
   "Centers for Disease Control and Prevention. Scabies — Clinical Care, 2024: sarna crostosa com tratamento combinado de permetrina tópica e ivermectina oral em várias doses (dias 1, 2, 8, 9, 15 e, se grave, 22 e 29); surtos em instituições exigem manejo coordenado. https://www.cdc.gov/scabies/hcp/clinical-care/"
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
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Área com dengue (ou viagem em 14 dias) e febre com mialgia, cefaleia, dor retro-orbitária ou exantema: sem ibuprofeno nem AAS (MS, Dengue 2024, 6.1.2).","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida fica de fora: contraindicada com febre ou sintomas gripais (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.",
  "orient": "- Faça repouso, beba bastante líquido e faça gargarejo com água morna e sal.\n- Se tiver febre com dor no corpo, dor de cabeça, dor atrás dos olhos ou manchas na pele, não tome ibuprofeno nem AAS (aspirina) até que a dengue seja descartada; nesse caso, use só dipirona ou paracetamol.\n- Não é necessário antibiótico, pois a infecção é causada por vírus.\n- Retorne se a febre durar mais de 3 dias, se aparecerem placas na garganta ou dificuldade para engolir.",
  "rev": [
   "Corrigido (2026-10-09): não usar ibuprofeno na febre com dengue não descartada (MS, Dengue 2024).",
   "Movido: orientações que estavam em 'Na unidade' para Orientações.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: caso suspeito (item 10.1); não usar salicilatos, anti-inflamatórios nem corticoides e orientar a não se automedicar (item 6.1.2); só dipirona e paracetamol (apêndice H). https://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_6ed.pdf",
   "Shulman ST et al. IDSA GAS Pharyngitis Guideline 2012 (não tratar faringite viral com antibiótico).",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
  ]
 },
 {
  "id": "gases",
  "nome": "Gases / Flatulência",
  "cat": "gi",
  "cid": "R14",
  "sin": "distensao abdominal meteorismo",
  "casa": "Uso oral\n1) Simeticona 75mg/mL gotas ------------------ 1 fr\nTomar 13 gotas (40 mg) VO 3x ao dia, após as refeições, por até 3 dias.",
  "unidade": "1) Afastar sinais de alarme: vômitos, distensão com parada de fezes e gases (obstrução), dor intensa ou localizada, febre, sangramento, anemia, perda de peso ou mudança recente do hábito intestinal → ver Dor abdominal.\n2) Desconforto importante: Simeticona 75mg/mL gotas, 13 gotas (40 mg) VO.\n* Simeticona não deve ser usada se suspeita de obstrução ou perfuração intestinal (bula).",
  "orient": "- Evite refrigerantes, feijão, repolho e chiclete, e coma devagar.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): simeticona 15 → 13 gotas (40 mg) 3x ao dia, como a bula Luftal e a ficha; fontes de verdade (bula Luftal; AGA 2023) no lugar de \"evidência limitada\"."
  ],
  "evid": "Simeticona tem evidência limitada.",
  "fontes": [
   "Bula Luftal gotas (simeticona 75 mg/mL, Anvisa): adultos e maiores de 12 anos, 13 gotas 3x ao dia; máximo 500 mg/dia (166 gotas).",
   "Moshiree B et al. AGA Clinical Practice Update on Evaluation and Management of Belching, Abdominal Bloating, and Distention (Gastroenterology 2023;165:791). https://doi.org/10.1053/j.gastro.2023.04.039",
   "Bula Anvisa do Luftal (simeticona) gotas 75 mg/mL (25 gotas = 1 mL; 13 gotas ≈ 40 mg): contraindicado na suspeita ou confirmação de perfuração ou obstrução intestinal (ficha simeticona do app). https://consultas.anvisa.gov.br/#/bulario/"
  ]
 },
 {
  "id": "geca",
  "nome": "GECA / Gastroenterocolite aguda",
  "cat": "gi",
  "cid": "A09",
  "sin": "diarreia vomito gastroenterite virose intestinal",
  "casa": "Uso oral\n1) Sais de reidratação oral ------------------ 10 envelopes\nDiluir 1 envelope em 1 L de água filtrada e beber aos poucos ao longo do dia, após cada evacuação.\n2) Ondansetrona 8mg (Vonau Flash) ------------ 10 cp\nDissolver 1 cp na língua de 8/8h se náuseas ou vômitos.\n3) Dipirona 500 mg ---------------------------- 20 cp\nTomar 1 a 2 cp VO de 6/6h se dor ou febre (máximo 4 g/dia).\n4) Saccharomyces boulardii 200mg (Repoflor) -- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu\n4) Enterogermina flaconete ------------------- 10 fr\nTomar 1 flaconete VO de 12/12h por 5 dias.\n\n# Se cólica:\n5) Escopolamina 10 mg (Buscopan) ------------- 20 drágeas\nTomar 1 a 2 drágeas VO de 8/8h se cólica (máximo 6 drágeas/dia).\n\n# Se disenteria (diarreia com sangue) com febre:\n6) Ciprofloxacino 500mg ---------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\nOu\n6) Azitromicina 500mg ------------------------ 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.\n\n# Antidiarreico (opcional): diarreia aquosa, sem febre e sem sangue nas fezes\nUso oral\n7) Racecadotrila 100mg ----------------------- 9 cáps\nTomar 1 cáps VO de 8/8h, de preferência antes das refeições, até a diarreia parar, por no máximo 3 dias.",
  "avisoRx": ["Disenteria em gestante: só azitromicina.", "Plano A (MS; IDSA 2017, rec. 45). Antidiarreico não é rotina (MS); loperamida: IDSA 2017, rec. 47.", "Disenteria tratada com antibiótico: reavaliar em 2 dias (MS, cartaz D.1.1).", "Antidiarreico: não usar com febre, sangue nas fezes/disenteria, distensão ou suspeita de C. difficile (antibiótico recente). Não é rotina (MS).", "Racecadotrila: não usar na insuficiência renal ou hepática, vômitos persistentes, intolerância à lactose e lactação; risco de angioedema; máx. 7 dias (bula).", "Sucralfato: outro remédio VO 2 h antes ou depois (reduz absorção: quinolona, levotiroxina, digoxina, fenitoína, varfarina); antiácido a 30 min (bula).", "Sucralfato: cautela na DRC e diálise (acúmulo de alumínio); somar antiácido com alumínio aumenta a carga (bula).", "Sucralfato no diabetes: relatos de hiperglicemia (bula FDA); a suspensão não tem sacarose (tem sorbitol). Efeito mais comum: constipação.", "Sucralfato na GECA: fora da indicação de bula (úlcera, gastrite, azia); decisão clínica. Espaçar 2 h do ciprofloxacino VO (bula)."],
  "unidade": "1) SF 0,9% 1.000 mL EV aberto (se desidratação moderada/grave ou vômitos incoercíveis).\n2) Ondansetrona 4 mg EV lenta (≥ 30 s), pode diluir em 8 mL de AD, ou IM\n   Ou Dimenidrinato + Piridoxina: ampola EV (10 mL) em 100 mL de SF em 30 min; existe apresentação própria para IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n3) Escopolamina 20 mg + dipirona 2,5 g (Buscopan Composto) 1 ampola EV lenta (no mínimo 5 minutos, paciente deitado), diluída em 10–20 mL de SF 0,9%, ou IM profunda (se cólica).\n4) Sucralfato 2 g/10 mL suspensão (Sucrafilm flaconete) 1 flaconete VO, dose única, se necessário, com epigastralgia ou azia associada. Agitar antes; outro remédio VO 2 h antes ou depois.",
  "orient": "- Beba 2 a 3 litros de líquidos por dia, em pequenos goles.\n- Mantenha a alimentação habitual, em porções menores se tiver enjoo; evite refrigerante e não adoce chá nem suco.\n- Não use remédio para prender o intestino sem orientação médica. A loperamida nunca deve ser usada por menores de 18 anos, nem se houver febre ou sangue nas fezes.\n- Se estiver tomando antibiótico para diarreia com sangue, retorne para reavaliação em 2 dias.\n- Volte imediatamente ao pronto-socorro se não conseguir beber líquidos, se desmaiar, se tiver sangue ou pus nas fezes, ou urina muito escura ou em pouca quantidade.",
  "rev": [
   "Corrigido (2026-10-29): receita da racecadotrila só com a posologia (os sinais de alarme estão nas orientações), por decisão do médico.",
   "Corrigido (2026-10-27): sucralfato 2 g (1 flaconete) VO na unidade, por decisão do médico; dose conferida na bula Sucrafilm (Anvisa 25/06/2026).",
   "Corrigido (2026-10-27): racecadotrila como opção desligada (sem loperamida, por decisão do médico); conferência independente (bula Tiorfan).",
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
   "Bula Buscopan Composto injetável (Boehringer Ingelheim, Anvisa): EV lenta, no máximo 1 mL/min, com o paciente deitado; contraindicado na obstrução intestinal mecânica e no megacólon.",
   "Bula Anvisa do Tiorfan (racecadotrila 100 mg cápsula; Ferrer, atualizada em 13/08/2019): adulto 1 cápsula inicial e depois de 8/8h, de preferência antes das refeições, até a diarreia parar, no máximo 7 dias; máximo 400 mg/dia; não usar com sangue nas fezes ou febre, diarreia crônica ou por antibiótico, insuficiência renal ou hepática; risco de angioedema; não recomendado na lactação; caixas com 6 e 9 cápsulas. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/7067/tiorfan-capsula.htm",
   "Racecadotril versus loperamide for acute diarrhea of infectious origin in adults: systematic review and meta-analysis (Health Sci Rep 2025): eficácia semelhante, com menos constipação de rebote com a racecadotrila. https://pmc.ncbi.nlm.nih.gov/articles/PMC12098968/",
   "Bula Anvisa do Sucrafilm suspensão oral (sucralfato 200 mg/mL; flaconete de 2 g/10 mL, caixa com 20; EMS Sigma Pharma, aprovada em 25/06/2026): protetor da mucosa 1 flaconete de 2 g por tomada (1 h antes das refeições ou ao deitar), antiulceroso 1 flaconete 2x ao dia; agitar antes; outros remédios 2 h antes ou depois, antiácido a 30 min; cautela na insuficiência renal crônica e na diálise (alumínio); indicado em úlcera, gastrite e azia; contém sorbitol. https://www.precopopular.com.br/_v/leaflet/download/NDUwMjI4",
   "Bula FDA do Carafate suspensão oral (sucralfato; AbbVie, rev. 06/2023): hiperglicemia relatada em diabéticos, constipação em 2%, bezoar, acúmulo de alumínio na insuficiência renal crônica e na diálise. https://www.rxabbvie.com/pdf/carafate-oral-suspension_pi.pdf"
  ]
 },
 {
  "id": "gota",
  "nome": "Gota — crise aguda",
  "cat": "dor",
  "cid": "M10.9",
  "sin": "artrite gotosa acido urico podagra",
  "casa": "Uso oral\n1) Colchicina 0,5mg -------------------------- 20 cp\nTomar 2 cp VO agora e 1 cp após 1h. Depois, 1 cp de 12/12h até 2–3 dias após o fim da crise.\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias (no máximo 3 cp por dia).\nOu\n2) Prednisona 20mg --------------------------- 10 cp\nTomar 2 cp VO pela manhã por 5 dias.",
  "avisoRx": ["Prednisona se contraindicação a AINE.", "Colchicina: começar em até 36 h do início da crise.", "Colchicina: não usar com claritromicina, eritromicina, cetoconazol, itraconazol, ritonavir, ciclosporina ou tacrolimo (toxicidade grave).", "DRC avançada (clearance < 30 mL/min) ou diálise: preferir corticoide.", "Se colchicina: clearance < 30, só o esquema do 1º dia, sem o 12/12h; diálise, 0,5 mg dose única; não repetir antes de 14 dias (bula Colcrys).", "Naproxeno e cetoprofeno: mesmas restrições do diclofenaco; a prednisona fica para quem não pode usar AINE.", "Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.", "AINE: não usar se doença renal, úlcera, sangramento, anticoagulante ou insuficiência cardíaca."],
  "unidade": "1) Cetoprofeno 100 mg EV (apresentação própria para EV) em 100 mL de SF em 20–30 min, ou IM (ampola 50 mg/mL)\n   + Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Dexametasona 4–10 mg IM ou EV lenta.",
  "orient": "- Se já usa alopurinol, não pare de tomar.\n- Evite bebidas alcoólicas (principalmente cerveja), carnes vermelhas, frutos do mar e refrigerantes.\n- Faça compressa de gelo no local por 20 minutos, 3 a 4 vezes ao dia.\n- Colchicina: não tome junto com claritromicina, eritromicina, cetoconazol, itraconazol, ritonavir, ciclosporina ou tacrolimo, pois pode causar intoxicação grave. Pare a colchicina se tiver diarreia.",
  "rev": [
   "Corrigido (2026-10-29): receita só com a posologia; a contraindicação foi para o aviso ao médico, por decisão do médico.",
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
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): AINE no idoso com risco renal e de sangramento.",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "FitzGerald JD et al. 2020 American College of Rheumatology Guideline for the Management of Gout. Arthritis Care Res 2020;72(6):744–760 (colchicina, AINE ou corticoide na crise, em dose plena). https://doi.org/10.1002/acr.24180",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
  ]
 },
 {
  "id": "gota-manut",
  "nome": "Gota — manutenção",
  "cat": "dor",
  "cid": "M10.9",
  "sin": "acido urico alopurinol",
  "casa": "Uso oral\n1) Alopurinol 100mg -------------------------- 30 cp\nTomar 1 cp VO 1 vez ao dia, uso contínuo.\n2) Colchicina 0,5mg -------------------------- 60 cp\nTomar 1 cp VO de 12/12h por 3 a 6 meses.",
  "avisoRx": ["Alopurinol: na DRC moderada ou grave, meio cp.","Colchicina: na DRC moderada ou no idoso, 1 cp 1 vez ao dia.","Colchicina: clearance < 30 mL/min ou diálise, não usar sem o clínico (bula: 0,3 mg/dia, inviável com cp de 0,5 mg).","Início e titulação idealmente no ambulatório.","Colchicina: não associar a claritromicina, cetoconazol ou ciclosporina (interação grave).","Alopurinol: pode começar durante a crise, junto com a colchicina; titular com o clínico a cada 2 a 5 semanas até ácido úrico < 6 mg/dL (ACR 2020).","Colchicina: profilaxia de crises enquanto o alopurinol começa a agir (ACR 2020)."],
  "unidade": "1) Em crise aguda (articulação quente, vermelha e dolorosa): tratar a crise primeiro → ver Gota (crise). Se já usa alopurinol, não suspender.\n2) Pedir creatinina (ClCr) antes de definir as doses do alopurinol e da colchicina; checar as interações da colchicina listadas na receita.\n3) Encaminhar ao clínico da UBS ou ao reumatologista para ajuste da dose pelo ácido úrico (meta < 6 mg/dL).\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Pare o alopurinol e procure atendimento se aparecerem manchas, bolhas ou feridas na pele, pois pode ser uma reação grave ao remédio.\n- Se já usa alopurinol, não pare de tomar durante uma crise.",
  "rev": [
   "Corrigido (2026-10-29): receita só com a posologia; a contraindicação foi para o aviso ao médico, por decisão do médico.",
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
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
  "casa": "Uso oral\n1) Diosmina + Hesperidina 450/50mg (Daflon 500) --- 60 cp\nTomar 2 cp VO de 8/8h por 4 dias, depois 2 cp de 12/12h por 3 dias, depois 1 cp de 12/12h até terminar a caixa (cerca de 12 dias).\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.\n3) Ibuprofeno 600mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\nOu (cetoprofeno)\n3) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (nimesulida)\n3) Nimesulida 100mg -------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (naproxeno)\n3) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (diclofenaco)\n3) Diclofenaco de sódio 50mg ----------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n4) Óleo mineral ------------------------------ 1 fr\nTomar 15 mL VO à noite, longe do jantar, por até 7 dias, se fezes endurecidas.\n\nUso tópico\n5) Policresuleno + cinchocaína pomada (Proctyl) --- 1 bisnaga\nAplicar na região anal 2 a 3x ao dia, após higiene, por 7 dias.",
  "avisoRx": ["Sangramento persistente ou > 45 anos: encaminhar para colonoscopia.","Ibuprofeno e alternativas (cetoprofeno, nimesulida, naproxeno, diclofenaco): só depois de descartar dengue; não usar na gestação nem na doença renal.","Nimesulida: no máximo 100 mg de 12/12h por até 15 dias; não usar com febre, sintomas gripais, doença do fígado ou álcool em excesso (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Nimesulida: não associar a paracetamol ou a outro analgésico com risco para o fígado; usar pelo menor tempo possível (EMA 2012)."],
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
   "Bula Proctyl pomada (policresuleno + cloridrato de cinchocaína, Takeda, Anvisa).",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa da nimesulida 100 mg comprimido (Vitamedic, RDC 47/2009; referência Nisulid, Aché): 50–100 mg 2x ao dia após as refeições; contraindicada < 12 anos, insuficiência hepática e renal grave. https://static-webv8.jet.com.br/drogaosuper/bulas/145802.pdf",
   "EMA. Nimesulide-containing medicinal products — referral (artigos 31 e 107i, 2007–2012): 100 mg 2x/dia, no máximo 15 dias; contraindicada com febre ou sintomas gripais, doença hepática ou outras drogas hepatotóxicas. https://www.ema.europa.eu/en/documents/other/amendments-be-included-relevant-sections-summary-product-characteristics-nimesulide-containing_en.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
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
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD, se dor.\n2) Herpes genital: oferecer na unidade os testes rápidos de HIV, sífilis e hepatites B e C. Higiene das lesões com compressas de SF 0,9%.\n3) Retenção urinária (herpes genital, sobretudo no 1º episódio): sondagem vesical de alívio.\n4) Internar para aciclovir EV se: lesões extensas em imunossuprimido, doença disseminada, suspeita de encefalite ou meningite (febre, confusão, convulsão, rigidez de nuca), hepatite, ou não consegue tomar VO:\n   Encefalite ou meningoencefalite: Aciclovir 10 mg/kg EV de 8/8h (14 a 21 dias).\n   Doença grave (disseminada, hepatite, meningite) ou imunossuprimido com lesões extensas: 5–10 mg/kg EV de 8/8h.\n   Demais casos: 5 mg/kg EV de 8/8h. Obeso: calcular pelo peso ideal.\n   Reconstituir cada frasco de 250 mg em 10 mL de AD ou SF (25 mg/mL) e diluir em SF 0,9% até no máximo 5 mg/mL (até 500 mg em 100 mL; de 500 a 1.000 mg, em 2 bolsas de 100 mL). Infundir em 1 h, nunca em bolus. Hidratar bem.\n   ClCr 25–50: de 12/12h; 10–25: de 24/24h; < 10: metade da dose de 24/24h.",
  "orient": "- Comece o remédio o mais cedo possível, de preferência nas primeiras 48 a 72 horas.\n- Herpes genital: faça os testes rápidos de HIV, sífilis e hepatites e evite relações sexuais enquanto houver feridas.\n- Beba bastante água durante o tratamento.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
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
   "Bula do aciclovir comprimido, registrada na Anvisa — ajuste renal: esquemas de 200–400 mg → 200 mg de 12/12h se ClCr < 10; 800 mg 5x/dia → 800 mg de 8/8h se ClCr 10–25 e de 12/12h se < 10.",
   "Bula Anvisa da Novalgina solução injetável (dipirona 500 mg/mL, Sanofi): IM ou EV 1–2,5 g em dose única, máximo 5 g/dia; EV lenta, no máximo 1 mL (500 mg)/min, com o paciente deitado. https://consultas.anvisa.gov.br/#/bulario/",
   "Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022 — quadro 38 (herpes genital: imunossuprimido com lesões extensas, aciclovir 5–10 mg/kg EV de 8/8h por 5 a 7 dias ou até a resolução; compressas de soro fisiológico para higiene das lesões; analgésico se necessário; retorno em 1 semana) e orientações gerais para todas as IST (oferecer testagem para HIV, sífilis e hepatites B e C). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf",
   "Bula Anvisa do Zovirax injetável (aciclovir sódico 250 mg, GSK, aprovada em 18/03/2021): herpes simples e varicela-zoster 5 mg/kg de 8/8h; imunocomprometido com varicela-zoster ou meningoencefalite herpética 10 mg/kg de 8/8h; obeso pelo peso ideal; reconstituir cada frasco em 10 mL de AD ou SF 0,9% (25 mg/mL) e diluir para no máximo 5 mg/mL (até 500 mg em 100 mL; de 500 a 1.000 mg, uma segunda bolsa de 100 mL); infusão em 1 h, nunca em bolus; ClCr 25–50: de 12/12h; 10–25: de 24/24h; < 10: metade da dose de 24/24h; garantir hidratação. https://br.gsk.com/media/6237/zovirax-injet%C3%A1vel.pdf",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 197 — Herpes Simplex Virus Infections.",
   "Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 — Genital Herpes: doença grave ou complicações que exigem internação (disseminada, pneumonite, hepatite, meningite, encefalite), aciclovir 5–10 mg/kg EV de 8/8h; encefalite, 14–21 dias de terapia EV. https://www.cdc.gov/std/treatment-guidelines/herpes.htm"
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
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n   Se dor intensa persistir: Tramadol 100 mg (2 mL) EV em 100 mL de SF em 30–60 min (infusão rápida aumenta náuseas), ou IM. Máx. 400 mg/dia.\n2) Lesão na ponta do nariz (sinal de Hutchinson), olho vermelho, dor ocular ou baixa da visão: avaliação oftalmológica no mesmo dia.\n3) Internar para aciclovir EV se: zoster disseminado (lesões espalhadas além dos dermátomos vizinhos), imunossupressão grave, acometimento visceral ou neurológico (confusão, convulsão, rigidez de nuca, fraqueza de membros), ou zoster oftálmico complicado:\n   Aciclovir 10 mg/kg EV de 8/8h (imunossuprimido, disseminado, visceral ou neurológico). Imunocompetente sem doença disseminada, visceral ou neurológica: 5 mg/kg. Obeso: calcular pelo peso ideal.\n   Reconstituir cada frasco de 250 mg em 10 mL de AD ou SF (25 mg/mL) e diluir em SF 0,9% até no máximo 5 mg/mL (até 500 mg em 100 mL; de 500 a 1.000 mg, em 2 bolsas de 100 mL). Infundir em 1 h, nunca em bolus. Hidratar bem.\n   ClCr 25–50: de 12/12h; 10–25: de 24/24h; < 10: metade da dose de 24/24h.",
  "orient": "- Comece o remédio o mais cedo possível.\n- Procure um oftalmologista com urgência se aparecerem lesões na ponta do nariz, se o olho ficar vermelho ou se a visão piorar.\n- Evite contato com gestantes, recém-nascidos e pessoas com imunidade baixa até todas as lesões virarem casquinhas (crostas).",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): paracetamol + codeína com no máximo 4 cp por dia e dipirona com no máximo 8 cp por dia (fichas codeina e dipirona); valaciclovir 1 g de 8/8h por 7 dias como alternativa, com ajuste renal (Dworkin 2007; bula Valtrex); ajuste renal do aciclovir separado do herpes simples, mantendo 800 mg de 8/8h (ClCr 10–25) e de 12/12h (< 10) (bula).",
   "Renomeado: 'Herpes facial' → Herpes zoster. A dose de 800mg 5x/dia é de zoster, não de herpes labial.",
   "Adicionado: duração de 7 dias e alerta de zoster oftálmico."
  ],
  "fontes": [
   "Dworkin RH et al. Recommendations for the management of herpes zoster (Clin Infect Dis 2007).",
   "National Institute for Health and Care Excellence. CKS Shingles (revisado em 2024): antiviral em até 72 h se > 50 anos, imunossuprimido, zoster fora do tronco ou dor/erupção moderada a grave; zoster oftálmico com encaminhamento no mesmo dia. https://cks.nice.org.uk/topics/shingles/",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 198 — Varicella-Zoster Virus Infections.",
   "Bula do valaciclovir (Valtrex), GSK, registrada na Anvisa; bula FDA Valtrex — zoster 1 g de 8/8h por 7 dias; ajuste renal (ClCr 30–49: 1 g 12/12h; 10–29: 1 g 24/24h; < 10: 500 mg 24/24h).",
   "Bula do aciclovir comprimido, registrada na Anvisa — zoster 800 mg 5x/dia; ClCr 10–25: 800 mg de 8/8h; < 10: 800 mg de 12/12h.",
   "Bula Anvisa da Novalgina solução injetável (dipirona 500 mg/mL, Sanofi): IM ou EV 1–2,5 g em dose única, máximo 5 g/dia; EV lenta, no máximo 1 mL (500 mg)/min, com o paciente deitado. https://consultas.anvisa.gov.br/#/bulario/",
   "Bula Anvisa do Tramal solução injetável (tramadol 50 mg/mL, Grünenthal): 50–100 mg IM ou EV, máximo 400 mg/dia; EV direta lenta (1 mL/min) ou em infusão diluída em SF 0,9%. https://consultas.anvisa.gov.br/#/bulario/",
   "Bula Anvisa do Zovirax injetável (aciclovir sódico 250 mg, GSK, aprovada em 18/03/2021): herpes simples e varicela-zoster 5 mg/kg de 8/8h; imunocomprometido com varicela-zoster ou meningoencefalite herpética 10 mg/kg de 8/8h; obeso pelo peso ideal; reconstituir cada frasco em 10 mL de AD ou SF 0,9% (25 mg/mL) e diluir para no máximo 5 mg/mL (até 500 mg em 100 mL; de 500 a 1.000 mg, uma segunda bolsa de 100 mL); infusão em 1 h, nunca em bolus; ClCr 25–50: de 12/12h; 10–25: de 24/24h; < 10: metade da dose de 24/24h; garantir hidratação. https://br.gsk.com/media/6237/zovirax-injet%C3%A1vel.pdf",
   "Tunkel AR et al. The management of encephalitis: clinical practice guidelines by the Infectious Diseases Society of America (Clin Infect Dis 2008;47:303): encefalite por VZV, aciclovir 10–15 mg/kg EV de 8/8h por 10–14 dias. https://doi.org/10.1086/589747",
   "Dworkin RH et al. Recommendations for the management of herpes zoster (Clin Infect Dis 2007;44 Suppl 1:S1): aciclovir EV no zoster disseminado, visceral ou do sistema nervoso central e no imunossuprimido grave. https://doi.org/10.1086/510206"
  ]
 },
 {
  "id": "hpb",
  "nome": "Hiperplasia prostática benigna (HPB)",
  "cat": "uro",
  "cid": "N40",
  "sin": "prostata jato fraco retencao urinaria",
  "casa": "Uso oral\n1) Tansulosina 0,4mg ------------------------- 30 cp\nTomar 1 cp VO 1x ao dia, após o café da manhã, uso contínuo.\n2) Finasterida 5mg --------------------------- 30 cp\nTomar 1 cp VO 1x ao dia, uso contínuo (efeito após 3 a 6 meses).",
  "avisoRx": ["Finasterida só se próstata > 30 mL no exame de imagem, PSA > 1,5 ng/mL ou próstata aumentada ao toque.","Finasterida reduz o PSA pela metade.","Solicitar PSA, EAS, creatinina e USG de vias urinárias; encaminhar ao urologista."],
  "unidade": "# Retenção urinária aguda:\n1) Sondagem vesical de demora + iniciar tansulosina.\n2) Encaminhar ao urologista (tentativa de retirada da sonda após pelo menos 3 dias de tansulosina, em geral entre 3 e 7 dias; ver Retenção urinária aguda).",
  "orient": "- A tansulosina pode causar tontura ao se levantar; levante-se devagar.\n- Faça os exames solicitados (PSA, exame de urina, creatinina e ultrassom das vias urinárias) e marque consulta com o urologista.\n- Informe a qualquer médico que pedir o exame de PSA que você usa finasterida, pois ela altera o resultado.",
  "rev": [
   "Corrigido (2026-10-26): tansulosina após o café da manhã (bula; \"à noite\" não tinha apoio na bula) e retirada da sonda após 3 a 7 dias de tansulosina (Serlin 2018), igual à conduta Retenção urinária aguda.",
   "Corrigido (2026-10-17): critério da finasterida pela AUA (próstata > 30 mL, PSA > 1,5 ng/mL ou aumentada ao toque) e redução do PSA pela metade (bula Proscar); citação da AUA completa, com a emenda de 2023.",
   "Preenchido: seção estava vazia."
  ],
  "fontes": [
   "Lerner LB et al. Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia: AUA Guideline Part I e Part II (J Urol 2021;206:806 e 818; emenda 2023). https://www.auanet.org/guidelines-and-quality/guidelines/benign-prostatic-hyperplasia-(bph)-guideline",
   "Bula Proscar (finasterida 5 mg, Organon, Anvisa): o PSA cai cerca de 50%.",
   "Bula Anvisa do Secotex (cloridrato de tansulosina 0,4 mg, comprimido revestido de liberação prolongada, Boehringer Ingelheim): 1 comprimido ao dia, com ou sem alimento, inteiro, sem partir nem mastigar; tontura e hipotensão; síndrome da íris flácida (avisar antes de cirurgia de catarata ou glaucoma; não iniciar se cirurgia programada); contraindicado na insuficiência hepática grave. Genéricos em cápsula: 1 cápsula após o café da manhã. https://consultaremedios.com.br/secotex/bula",
   "Serlin DC, Heidelbaugh JJ, Stoffel JT. Urinary Retention in Adults: Evaluation and Initial Management (Am Fam Physician 2018;98(8):496-503; PMID 30277739): causas (HPB, estenose, prostatite, fármacos anticolinérgicos, antidepressivos, anti-histamínicos, simpaticomiméticos, opioides; neurológicas; na mulher, prolapso, massa pélvica e pós-parto), drenagem completa, alfabloqueador antes da retirada da sonda e prova de micção após 3 a 7 dias; encaminhar se falha da prova ou resíduo > 300 mL. https://www.aafp.org/pubs/afp/issues/2018/1015/p496.html"
  ]
 },
 {
  "id": "retencao-urinaria",
  "nome": "Retenção urinária aguda",
  "cat": "uro",
  "cid": "R33",
  "sin": "bexigoma globo vesical nao consegue urinar sonda vesical bexiga cheia retencao urina presa",
  "casa": "Uso oral\n1) Tansulosina 0,4mg ------------------------- 30 cp\nTomar 1 cp VO 1x ao dia, após o café da manhã, inteiro, sem partir nem mastigar.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\nOu (paracetamol)\n2) Paracetamol 750mg ------------------------- 20 cp\nTomar 1 cp VO de 6/6h se dor (no máximo 4 cp por dia).\n\n# Intestino preso\n3) Lactulose 667mg/mL xarope ----------------- 1 fr\nTomar 15 mL VO 1x ao dia. Se não evacuar em 2 dias, aumentar para 30 mL 1x ao dia. Reduzir se as fezes ficarem líquidas.",
  "avisoRx": ["Retenção com dor lombar, anestesia em sela, fraqueza nas pernas ou incontinência fecal: cauda equina até prova em contrário (RM de emergência).","Rever remédios: anticolinérgico, tricíclico, anti-histamínico, descongestionante, opioide, antipsicótico, antiespasmódico; suspender o culpado.","Alívio: causa reversível (remédio, anestesia, dor, constipação). Demora: HPB, recidiva, creatinina alta, hidronefrose, infecção ou coágulos.","Esvaziar por completo: pinçar em etapas não reduz hematúria nem hipotensão (Boettcher 2013).","Diurese pós-obstrutiva: ≥ 200 mL/h por 2 h ou ≥ 3 L/24 h; maior risco com creatinina alta, edema, IC ou confusão: internar e repor.","Tansulosina antes de retirar a sonda aumenta a chance de urinar (Cochrane 2014): retirada após ≥ 3 dias de uso, em geral em 3 a 7 dias.","Tansulosina: contraindicada se hipotensão ortostática prévia ou insuficiência hepática grave; avisar antes de cirurgia de catarata ou glaucoma (bula).","Tansulosina é para causa prostática; na mulher é uso fora da bula. Febre com retenção: pensar em prostatite (internar; ver Prostatite).","Bacteriúria com sonda e sem sintomas não se trata (IDSA 2019); antibiótico só com febre ou sinais de infecção (ver ITU).","Não forçar a sonda: sangue no meato, trauma ou estenose → urologia. Encaminhar se falhar a retirada ou resíduo > 300 mL.","CID retenção urinária R33 | HPB N40."],
  "unidade": "1) Confirmar a retenção: bexiga palpável e dolorosa acima do púbis; se houver, ultrassom à beira do leito ou bladder scan para medir o volume antes de sondar.\n2) Sondagem de alívio (cateterismo intermitente, técnica asséptica, gel lubrificante estéril): causa reversível e passageira (remédio, pós-anestesia, dor, constipação), sem infecção e com função renal normal. Reavaliar se volta a urinar; se encher de novo, sonda de demora.\n3) Sondagem de demora (Foley do menor calibre que drene bem, sistema fechado): causa prostática, recidiva após o alívio, creatinina alta ou hidronefrose, infecção, coágulos ou sem como reavaliar.\n4) Esvaziar a bexiga por completo, sem pinçar em etapas. Anotar o volume drenado.\n5) Não forçar a sonda: sangue no meato, trauma, estenose ou cirurgia uretral prévia → urologia (cistostomia ou sonda especial pelo especialista).\n6) Exames: EAS, creatinina, ureia, sódio e potássio; urocultura (da sonda recém-passada) se EAS alterado, febre ou sintomas de infecção; glicemia se suspeita de causa neurológica ou diabetes. US de vias urinárias se creatinina alta, infecção ou retenção de longa data.\n7) Diurese pós-obstrutiva (≥ 200 mL/h por 2 h seguidas ou ≥ 3 L em 24 h), sobretudo com creatinina alta, edema, insuficiência cardíaca ou confusão: observar diurese, sinais vitais e eletrólitos; internar se ocorrer.\n8) Procurar a causa: remédios (anticolinérgico, tricíclico, anti-histamínico, descongestionante, opioide, antipsicótico), fecaloma (toque retal), prostatite ou ITU, coágulos, causa neurológica. Mulher: exame pélvico.\n9) Dor lombar com anestesia em sela, fraqueza nas pernas ou perda do controle das fezes: cauda equina ou compressão medular — não liberar, RM de emergência (ver Lombalgia).\n10) Alta com sonda de demora e tansulosina; tentativa de retirada da sonda após pelo menos 3 dias de tansulosina (em geral entre 3 e 7 dias), com o urologista. HPB de base: ver conduta HPB.",
  "orient": "- Se você vai para casa com sonda: ela fica ligada a uma bolsa coletora até a consulta marcada para a retirada, em alguns dias.\n- Se a urina foi só esvaziada e você está sem sonda: volte se não conseguir urinar de novo ou se a barriga encher e doer.\n- Com sonda: mantenha a bolsa sempre abaixo do nível da bexiga, sem dobras no tubo, e esvazie quando estiver entre a metade e três quartos cheia.\n- Lave as mãos com água e sabão antes e depois de mexer na sonda ou na bolsa. Lave todos os dias, com água e sabão neutro, a região onde a sonda entra.\n- Beba água ao longo do dia, para a urina ficar clara, e evite o intestino preso.\n- Não puxe a sonda e não tente retirá-la em casa.\n- Tome a tansulosina todos os dias. Ela pode causar tontura ao se levantar: levante-se devagar. Avise o oftalmologista se for operar de catarata.\n- Não use remédio para gripe, alergia, enjoo ou para dormir sem orientação médica: alguns pioram a retenção da urina.\n- Marque a consulta com o urologista e leve os resultados dos exames.",
  "rev": [
   "Criada (2026-10-26): diagnóstico, sondagem de alívio × demora, esvaziamento completo, diurese pós-obstrutiva, causas e cauda equina, tansulosina após o café da manhã antes da retirada da sonda (3 a 7 dias); remete à HPB, Prostatite, ITU e Lombalgia. Conferência independente (.rascunhos/panico-retencao-conferencia.md) aplicada."
  ],
  "fontes": [
   "Serlin DC, Heidelbaugh JJ, Stoffel JT. Urinary Retention in Adults: Evaluation and Initial Management (Am Fam Physician 2018;98(8):496-503; PMID 30277739): causas (HPB, estenose, prostatite, fármacos anticolinérgicos, antidepressivos, anti-histamínicos, simpaticomiméticos, opioides; neurológicas; na mulher, prolapso, massa pélvica e pós-parto), drenagem completa, alfabloqueador antes da retirada da sonda e prova de micção após 3 a 7 dias; encaminhar se falha da prova ou resíduo > 300 mL. https://www.aafp.org/pubs/afp/issues/2018/1015/p496.html",
   "Fisher E et al. The role of alpha blockers prior to removal of urethral catheter for acute urinary retention in men (Cochrane Database Syst Rev 2014;CD006744): 9 ECR (alfuzosina, tansulosina, silodosina); retirada após 1 a 3 dias do remédio na maioria; micção espontânea em 60,2% × 38,1% com placebo. https://doi.org/10.1002/14651858.CD006744.pub3",
   "Lerner LB et al. Management of LUTS Attributed to BPH: AUA Guideline Part I e II (J Urol 2021;206:806 e 818; emenda 2023): alfabloqueador oral antes da tentativa de retirada da sonda na retenção aguda por HPB. Atualização: Goueli R et al. AUA Guideline (2026) Part I e II (J Urol 2026;216:143-160; doi 10.1097/JU.0000000000005097 e 10.1097/JU.0000000000005098). https://www.auanet.org/guidelines-and-quality/guidelines/benign-prostatic-hyperplasia-(bph)-guideline",
   "Boettcher S et al. Urinary retention: benefit of gradual bladder decompression — myth or truth? A randomized controlled trial (Urol Int 2013;91:140-4; 294 homens): esvaziamento rápido × gradual sem diferença de hematúria (10,5% × 11,3%) e sem colapso circulatório. https://doi.org/10.1159/000350943",
   "Halbgewachs C, Domes T. Postobstructive diuresis: pay close attention to urinary retention (Can Fam Physician 2015;61(2):137-42; PMID 25821871): diurese pós-obstrutiva = ≥ 200 mL/h por 2 h seguidas ou ≥ 3 L em 24 h; risco com retenção crônica, azotemia, edema, insuficiência cardíaca e confusão; monitorar diurese, sinais vitais e eletrólitos. https://www.cfp.ca/content/61/2/137",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 331 — Urinary Tract Obstruction: diurese pós-obstrutiva após desobstrução bilateral, com perda de sódio, potássio, fosfato, magnésio e água; US para hidronefrose (lido no PDF local; não copiado).",
   "GIRFT/NHS England. National Suspected Cauda Equina Syndrome (CES) Pathway, fevereiro de 2023, atualizado até março de 2026: sintomas novos ou em piora há 14 dias ou menos; RM de emergência o mais rápido possível e no máximo em até 4 h do pedido; ultrassom de bexiga só como complemento (resíduo > 200 mL aumenta a chance, < 200 mL não exclui). https://gettingitrightfirsttime.co.uk/wp-content/uploads/2026/04/National-Suspected-Cauda-Equina-Pathway-March-2026.pdf",
   "Gould CV et al. HICPAC/CDC Guideline for Prevention of Catheter-Associated Urinary Tract Infections, 2009 (Infect Control Hosp Epidemiol 2010;31:319-26): retenção e obstrução como indicação; técnica asséptica, gel lubrificante estéril de uso único, menor calibre que drene bem, sistema fechado, bolsa abaixo da bexiga; cateterismo intermitente preferível à sonda de demora na disfunção de esvaziamento. https://www.cdc.gov/infection-control/hcp/cauti/index.html",
   "Nicolle LE et al. Clinical Practice Guideline for the Management of Asymptomatic Bacteriuria: 2019 Update by the IDSA (Clin Infect Dis 2019;68(10):e83-e110): não rastrear nem tratar bacteriúria assintomática em quem usa sonda de demora. https://doi.org/10.1093/cid/ciy1121",
   "Bula Anvisa do Secotex (cloridrato de tansulosina 0,4 mg, comprimido revestido de liberação prolongada, Boehringer Ingelheim): 1 comprimido ao dia, com ou sem alimento, inteiro, sem partir nem mastigar; tontura e hipotensão; síndrome da íris flácida (avisar antes de cirurgia de catarata ou glaucoma; não iniciar se cirurgia programada); contraindicado na insuficiência hepática grave. Genéricos em cápsula: 1 cápsula após o café da manhã. https://consultaremedios.com.br/secotex/bula",
   "NHS. Living with a urinary catheter (revisado em 03/02/2023): lavar a pele com água e sabão todo dia, lavar as mãos, beber líquidos para a urina ficar clara, evitar constipação, sem dobras e bolsa abaixo da bexiga, esvaziar entre metade e três quartos; procurar atendimento se sonda bloqueada, vazamento, sangue na urina, espasmos fortes, febre. https://www.nhs.uk/conditions/urinary-catheters/living-with/",
   "Bula Lactulona (lactulose 667 mg/mL, Daiichi Sankyo, Anvisa): adultos 15 a 30 mL/dia, em dose única pela manhã ou à noite, ajustada pelo número de evacuações (mesmo esquema da conduta Constipação).",
   "Dipirona 500 mg 2 cp de 6/6h (máximo 8 cp/dia) e paracetamol 750 mg 1 cp de 6/6h (máximo 4 cp/dia): mesmas posologias já conferidas nas condutas de dor do painel (fichas dipirona e paracetamol; bulas Anvisa Novalgina e Tylenol 750).",
   "Coker TJ, Dierfeldt DM. Acute bacterial prostatitis: diagnosis and management (Am Fam Physician 2016;93(2):114-20): internar se retenção com febre ou sepse. https://www.aafp.org/pubs/afp/issues/2016/0115/p114.html",
   "NICE CG97. Lower urinary tract symptoms in men: management (2010, atualizada em 2015): 1.7.1 sondar de imediato o homem com retenção aguda; 1.7.2 oferecer alfabloqueador antes da retirada da sonda. https://www.nice.org.uk/guidance/cg97/chapter/Recommendations"
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
  "unidade": "1) Afastar coma mixedematoso: rebaixamento ou confusão, hipotermia, bradicardia, hipotensão, hipoventilação (CO2 alto), hiponatremia ou hipoglicemia, com história de hipotireoidismo ou cicatriz de tireoidectomia → sala vermelha e vaga de UTI (tratamento EV em terapia intensiva).\n2) Bradicardia, edema ou dor torácica: ECG.\n3) Não iniciar levotiroxina sem TSH alterado confirmado (com T4 livre); idoso ou cardiopata começa com dose baixa.\n4) Encaminhar ao clínico da UBS (TSH em 6–8 semanas).\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Repita o exame de sangue da tireoide (TSH) em 6 a 8 semanas para ajuste da dose.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): início só com diagnóstico confirmado; 25 mcg com apresentação coerente com a receita; consenso SBEM (ATA 2014; SBEM 2013).",
   "Adicionado: dose inicial em idosos/cardiopatas e controle do TSH."
  ],
  "fontes": [
   "Jonklaas J et al. Guidelines for the Treatment of Hypothyroidism — American Thyroid Association (Thyroid 2014;24:1670) — recomendações 21 e 22: dose inicial e idoso ou coronariopata.",
   "Brenta G et al. Diretrizes clínicas práticas para o manejo do hipotireoidismo — SBEM (Arq Bras Endocrinol Metab 2013;57:265).",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 395 — Hypothyroidism (coma mixedematoso).",
   "Jonklaas J et al. Guidelines for the Treatment of Hypothyroidism — American Thyroid Association (Thyroid 2014;24:1670): coma mixedematoso tratado em terapia intensiva com levotiroxina EV e glicocorticoide."
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
  "unidade": "1) Remover as crostas com água morna e sabão (ou SF 0,9%) antes da primeira aplicação do tópico.\n2) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD, se dor ou febre.\n3) Afastar complicação: vermelhidão que se espalha, calor e dor (celulite/erisipela) → ver Erisipela. Febre com bolhas e descamação extensa (síndrome da pele escaldada, sobretudo em criança) → internar.\n4) Edema, urina escura ou com sangue e PA alta 3 a 6 semanas depois (glomerulonefrite pós-estreptocócica): medir PA e pedir exame de urina e creatinina.",
  "orient": "- Mantenha as unhas curtas, lave bem as mãos e não compartilhe toalhas.\n- Se for criança, mantenha-a afastada da escola ou da creche até 24 horas após o início do antibiótico.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
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
   "American Academy of Pediatrics. Red Book 2024–2027 — impetigo: volta à escola 24 h após o início do antibiótico.",
   "Bula Anvisa da Novalgina solução injetável (dipirona 500 mg/mL, Sanofi): IM ou EV 1–2,5 g em dose única, máximo 5 g/dia; EV lenta, no máximo 1 mL (500 mg)/min, com o paciente deitado. https://consultas.anvisa.gov.br/#/bulario/",
   "Stevens DL et al. IDSA Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update (Clin Infect Dis 2014;59:e10): identificar e tratar fatores predisponentes da celulite, como fissuras interdigitais e tinea pedis; impetigo e glomerulonefrite pós-estreptocócica.",
   "Manual MSD, versão para profissionais de saúde. Glomerulonefrite pós-infecciosa (revisão 2024): a glomerulonefrite pós-estreptocócica surge 1 a 3 semanas após faringite e 3 a 6 semanas após infecção de pele. https://www.msdmanuals.com/professional/genitourinary-disorders/glomerular-disorders/postinfectious-glomerulonephritis-pign"
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
  "unidade": "1) Afastar TVP: edema assimétrico de início recente, dor na panturrilha, empastamento → Wells e doppler venoso (ver TVP).\n2) Palpar pulsos pedioso e tibial posterior antes de indicar a meia; pulsos fracos ou ausentes: suspeitar de doença arterial (sem meia compressiva até avaliação vascular).\n3) Úlcera venosa: limpar com SF 0,9% e curativo; vermelhidão que se espalha, calor e dor → ver Erisipela.\n4) Cordão endurecido, vermelho e doloroso no trajeto de uma variz (tromboflebite superficial): doppler (ver TVP).\n5) Sangramento de variz (varicorragia): deitar, elevar o membro acima do nível do coração e fazer compressão direta firme no ponto que sangra (com a mão, depois com compressa); em seguida, curativo compressivo (compressa e atadura firme), sem retirar até a reavaliação; nunca garrote acima do ponto (piora o sangramento venoso). Sangramento volumoso ou sinais de choque: ABC, acesso venoso e cristaloide. Se não parar com elevação e compressão: ponto hemostático em X sobre o ponto de sangramento e manter a compressão. Encaminhar com urgência ao cirurgião vascular (escleroterapia ou ablação evitam novo sangramento); risco maior se usa anticoagulante, é frágil ou mora sozinho. Ensinar ao paciente e à família: elevar a perna e apertar o local se voltar a sangrar.\n* Não há medicação de rotina na unidade; o tratamento é domiciliar (meia e elevação); encaminhar ao angiologista ou cirurgião vascular.",
  "orient": "- Eleve as pernas ao descansar e caminhe todos os dias.",
  "rev": [
   "Corrigido (2026-10-28): conduta da varicorragia no Na unidade e na orientação, a pedido do médico (UIP 2024; BJGP 2022; NICE CG168 1.2.1; ponto em X só como resgate, Labas 2007); conferência independente.",
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Adicionado: faixa de compressão e contraindicação arterial."
  ],
  "fontes": [
   "De Maeseneer MG et al. ESVS 2022 Clinical Practice Guidelines on Chronic Venous Disease (Eur J Vasc Endovasc Surg 2022).",
   "Tan M, Campbell B, Parsi K, Davies AH; International Union of Phlebology. Management of bleeding varicose veins (Phlebology 2024;39(4):273-275; diretriz de uma página da UIP): deitar ou sentar com a perna elevada, compressão com a mão, depois compressa e atadura compressiva, sem retirar até a avaliação médica; volume grande: suporte básico, volume e nova compressão; doppler e encaminhamento urgente ao especialista vascular (ablação, escleroterapia); anticoagulação, fragilidade e idoso que mora sozinho são risco de morte; ensinar os primeiros socorros. https://doi.org/10.1177/02683555231219548",
   "Campbell B, Dilley C, Gohel M. Bleeding from varicose veins: advice in primary care and referral (Br J Gen Pract 2022;72(722):448-449): elevar o pé acima do nível do coração e comprimir, atadura firme sobre compressa; mortes por não saber elevar a perna ou por garrote acima do ponto; encaminhamento urgente ao especialista em veias para ablação. https://doi.org/10.3399/bjgp22X720677",
   "Labas P, Cambal M. Profuse bleeding in patients with chronic venous insufficiency (Int Angiol 2007;26(1):64-6): 124 sangramentos de variz na emergência; 52 tratados com ponto em X no local e compressão por 6 semanas (cicatrização em 14 dias, ressangramento em 23%) × escleroterapia com compressão (7 dias, sem ressangramento em 12 meses). PMID 17353890",
   "NICE CG168. Varicose veins: diagnosis and management, 2013 — 1.2.1: encaminhar imediatamente ao serviço vascular quem tem sangramento de variz (recomendação citada em Cragg J, Nyamekye I, J Vasc Surg Venous Lymphat Disord 2021;9:377-382). https://www.nice.org.uk/guidance/cg168"
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
  "unidade": "1) Não é tratamento de pronto-socorro: a erradicação se faz com diagnóstico confirmado (endoscopia, teste respiratório ou antígeno fecal).\n2) Dor epigástrica na unidade: ver Dispepsia (medicação EV).\n3) Sinais de alarme → ver HDA ou encaminhar para endoscopia: hematêmese ou melena, anemia, disfagia, vômitos persistentes, perda de peso, massa abdominal; dispepsia a partir de 40 anos também tem indicação de endoscopia.\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Depois do tratamento, faça o exame de controle de cura (teste do sopro ou exame de fezes), pelo menos 4 semanas após terminar os antibióticos e o bismuto e após 14 dias sem omeprazol ou vonoprazana.\n- O bismuto deixa as fezes escuras, o que é esperado. Volte ao pronto-socorro se tiver fezes pretas com fraqueza ou tontura, ou vômito com sangue.\n- Não tome bebida alcoólica durante o uso do metronidazol e até 3 dias depois.\n- Se estiver grávida, amamentando ou suspeitar de gravidez, não tome a tetraciclina e fale com o médico.\n- Parar de fumar aumenta a chance de cura.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Atualizado (2026-10-17): esquemas pelo V Consenso Brasileiro 2026; tripla clássica com IBP deixa de ser 1ª linha empírica; quádrupla com bismuto (omeprazol, bismuto, tetraciclina, metronidazol) por 14 dias, que serve também na alergia a penicilina; sem bismuto, vonoprazana + amoxicilina + claritromicina; controle de cura por teste respiratório ou antígeno fecal (V Consenso 2026, enunciados 17, 20, 27, 28 e 32).",
   "Corrigido: duração 7 → 14 dias (IV Consenso Brasileiro de H. pylori).",
   "Corrigido: omeprazol 20 → 40mg 12/12h (IBP em dose dobrada).",
   "Ajustado: quantidades de comprimidos."
  ],
  "fontes": [
   "Coelho LGV et al. V Consenso Brasileiro sobre Infecção por Helicobacter pylori (Arq Gastroenterol 2026;63:e26043). doi 10.1590/S0004-2803.24612026-043: 1ª linha (enunciado 28, tabela 3), alergia a penicilina (enunciado 32, tabela 6), controle de cura (enunciados 17 e 20).",
   "Chey WD et al. ACG Clinical Guideline: Treatment of Helicobacter pylori Infection (Am J Gastroenterol 2024;119:1730).",
   "Malfertheiner P et al. Maastricht VI/Florence Consensus (Gut 2022;71:1724).",
   "Bula da tetraciclina (Anvisa): contraindicada na gestação, na amamentação, em menores de 8 anos e na insuficiência renal; bula do Flagyl (metronidazol: efeito antabuse com álcool).",
   "Coelho LGV et al. V Consenso Brasileiro sobre Infecção por Helicobacter pylori (Arq Gastroenterol 2026;63:e26043), enunciado 18: endoscopia se sinais de alarme ou 40 anos ou mais com dispepsia."
  ]
 },
 {
  "id": "itu",
  "nome": "ITU / Cistite / Pielonefrite",
  "cat": "uro",
  "cid": "N39.0",
  "sin": "infeccao urinaria disuria ardor urinar cistite pielonefrite",
  "casa": "# Cistite não complicada (mulher, não gestante):\nUso oral\n1) Nitrofurantoína 100mg --------------------- 20 cp\nTomar 1 cp VO de 6/6h por 5 dias.\nOu\n1) Fosfomicina 3g (Monuril) ------------------ 1 envelope\nDissolver em 1 copo de água e tomar à noite, com a bexiga vazia, dose única.\n2) Fenazopiridina 200mg ---------------------- 6 cp\nTomar 1 cp VO de 8/8h por 2 dias.\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\nOu (cetoprofeno)\n3) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (naproxeno)\n3) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (diclofenaco)\n3) Diclofenaco de sódio 50mg ----------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n\n# Gestante:\nUso oral\n1) Cefalexina 500mg --------------------------- 28 cáps\nTomar 1 cáps VO de 6/6h por 7 dias.\nOu\n1) Fosfomicina 3g (Monuril) ------------------ 1 envelope\nDissolver em meio copo de água (50 a 75 mL) e tomar à noite, com a bexiga vazia, dose única.\n\n# Pielonefrite ambulatorial:\n1) Ciprofloxacino 500mg ---------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre (máximo 8 cp por dia).",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue; não usar na gestação nem na doença renal.","Gestante: colher urocultura antes; considerar repetir 1 a 2 semanas após o fim.","Nitrofurantoína na gestação: evitar no 1º trimestre se houver alternativa e nunca a partir de 38 semanas.","Gestante com febre ou dor lombar: pielonefrite, internar.","Pielonefrite ambulatorial: só não gestante, após a 1ª dose de ceftriaxona e a urocultura.","Homem com ITU: tratar por 7 dias e considerar prostatite.","CID: cistite N30.0 | pielonefrite N10.","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD.\n2) Pielonefrite: Ceftriaxona 1 g IM (reconstituir com o diluente de lidocaína da apresentação IM) ou EV (em 10 mL de AD, lenta, ou em 100 mL de SF em 30 min), 1ª dose na unidade, e seguir com VO. Colher urocultura antes.\n* Internar se: sepse, vômitos, gestante com pielonefrite, obstrução, sem melhora em 48–72h.",
  "orient": "- Beba bastante água e não segure a vontade de urinar.\n- Volte ao pronto-socorro se tiver febre, dor nas costas (na região dos rins) ou vômitos.\n- A fenazopiridina deixa a urina alaranjada; isso é esperado.",
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
   "Bula Pyridium (fenazopiridina, Anvisa): contraindicada na insuficiência renal; no máximo 2 dias junto com o antibiótico; cautela na deficiência de G6PD.",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
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
  "unidade": "1) Procurar a causa: dor, falta de ar, noctúria, refluxo, álcool, cafeína ou estimulantes, remédios (corticoide, descongestionante), suspensão de calmante, apneia do sono.\n2) Avaliar depressão e ansiedade e perguntar diretamente sobre ideação suicida; positiva → avaliar o risco antes da alta (ver Ansiedade).\n3) Sem hipnótico na porta: higiene do sono e encaminhamento à UBS (terapia cognitivo-comportamental para insônia).\n* Não há medicação de rotina na unidade.",
  "orient": "- Mantenha horários fixos para dormir e acordar; evite telas 1 hora antes de deitar, cafeína depois das 16 horas e cochilos longos.\n- Se a insônia durar mais de 3 meses, procure a unidade básica de saúde (posto de saúde) ou um especialista; o tratamento principal é a terapia cognitivo-comportamental para insônia, e não o remédio.\n- Evite calmantes para dormir (como clonazepam e diazepam), pois causam dependência, quedas e acidentes, principalmente em idosos. Se já usa um desses remédios, não pare de repente; converse com seu médico para reduzir aos poucos.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
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
  "casa": "Uso oral\n1) Dimenidrinato + Piridoxina 50/10mg -------- 12 cp\nTomar 1 cp VO de 6/6h se tontura, náuseas ou vômitos, por até 3 dias.\n\n# Vertigem crônica/recorrente (ex.: Ménière):\n1) Betaistina 16mg --------------------------- 30 cp\nTomar 1 cp VO de 8/8h.\n\n# Gestante:\n1) Meclizina 25mg (Meclin) ------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\n\n# Refratário aos anti-histamínicos:\n1) Clonazepam 0,5mg -------------------------- 6 cp\nTomar 1 cp VO de 12/12h por até 3 dias.\n\n# Náuseas:\n2) Ondansetrona 4mg -------------------------- 10 cp\nTomar 1 cp VO de 8/8h por 3 dias se náuseas ou vômitos.",
  "avisoRx": ["Dimenidrinato: evitar em idosos.","Clonazepam: não usar em idosos nem na vertigem posicional (VPPB).","Supressores vestibulares por no máximo 3 dias (atrasam a compensação).","CID: labirintite H83.0 | VPPB H81.1.","Betaistina: reavaliar com o otorrino."],
  "unidade": "1) Dimenidrinato + Piridoxina: ampola EV (10 mL) em 100 mL de SF em 30 min; existe apresentação própria para IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n2) Exame: tontura contínua com nistagmo → HINTS (impulso cefálico, nistagmo, desvio vertical), se treinado; tontura só ao mudar a posição → Dix-Hallpike. Tomografia de crânio não exclui AVC de fossa posterior: HINTS central ou duvidoso → ressonância (ou transferir).\n3) VPPB (Dix-Hallpike positivo): manobra de Epley.",
  "orient": "- Use os remédios para tontura por no máximo 3 dias: o uso prolongado atrasa a recuperação do equilíbrio.\n- Volte imediatamente ao pronto-socorro se tiver dificuldade para andar, fala enrolada, visão dupla, fraqueza ou dor de cabeça súbita.\n- Os remédios para tontura dão sono: não dirija nos dias em que tomar.",
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
  "id": "sincope",
  "nome": "Síncope / Pré-síncope",
  "cat": "cardio",
  "cid": "R55",
  "sin": "sincope desmaio desmaiou perda de consciencia pre-sincope pre sincope lipotimia vasovagal ortostatica hipotensao postural escureceu a vista apagou",
  "casa": "",
  "avisoRx": ["Receita vazia de propósito: a síncope reflexa e a ortostática se tratam com orientação, não com remédio (ESC 2018).","Revisar anti-hipertensivo, diurético, nitrato, alfa-bloqueador e remédio que prolonga o QT; reduzir ou suspender se for a causa (ESC 2018).","Síncope reflexa ou ortostática sem hipertensão: considerar orientar mais água e sal (ESC 2018; EHRA 2024).","Escores (CSRS, San Francisco) não substituem o julgamento clínico: não usar sozinhos para dar alta (ESC 2018, classe III).","CSRS: ≥ 16 anos, até 24 h, sem causa grave já achada; não usar se inconsciência > 5 min, convulsão, trauma grave ou intoxicação.","Motorista profissional, piloto ou trabalho em altura: afastar da função até avaliação do especialista (HC-FMUSP 18ª ed., cap. 20).","Síncope com trauma de crânio em anticoagulado ou idoso: seguir a conduta de TCE.","Mulher em idade fértil com síncope e dor abdominal ou hipotensão: beta-hCG e pensar em gravidez ectópica rota.","CID síncope e colapso R55 | hipotensão ortostática I95.1 | hipotensão não especificada I95.9."],
  "unidade": "1) Confirmar que foi síncope: perda transitória da consciência, de início rápido, curta, com recuperação completa e espontânea. Diferenciar de convulsão, hipoglicemia, intoxicação, TCE e queda sem perda de consciência.\n2) Em todos: história dirigida (antes, durante e depois, com testemunha), PA e FC deitado e após 3 min em pé, ECG de 12 derivações. Considerar glicemia capilar (diabético, recuperação incompleta ou ainda alterado). Hipotensão ortostática: queda ≥ 20 mmHg na sistólica ou ≥ 10 mmHg na diastólica, ou sistólica < 90 mmHg em pé.\n3) Alto risco (ESC 2018) — qualquer um: não liberar.\n   - Evento: dor torácica, dispneia, dor abdominal ou cefaleia novas; síncope ao esforço ou deitado; palpitação súbita seguida de síncope.\n   - História: cardiopatia estrutural grave ou doença coronária (insuficiência cardíaca, fração de ejeção baixa, infarto prévio).\n   - Exame: PA sistólica < 90 mmHg sem explicação; sinal de sangramento digestivo ao toque retal; bradicardia < 40 bpm persistente acordado, sem ser atleta; sopro sistólico não diagnosticado.\n   - ECG: isquemia aguda; BAV Mobitz II ou total; FA com FC < 40; bradicardia sinusal < 40, bloqueio sinoatrial ou pausa > 3 s acordado; bloqueio de ramo, distúrbio de condução intraventricular, hipertrofia ventricular ou onda Q; TV sustentada ou não; disfunção de marca-passo ou cardiodesfibrilador; Brugada tipo 1; QTc > 460 ms em ECGs repetidos.\n   - Menores (alto risco só com cardiopatia estrutural ou ECG alterado): sem pródromo ou pródromo < 10 s; morte súbita em familiar jovem; síncope sentado.\n4) Baixo risco (ESC 2018): pródromo típico (calor, suor, náusea, visão escurecendo); gatilho (dor, cena, som ou cheiro desagradável, muito tempo em pé, lugar quente e cheio, tosse, micção, evacuação, após refeição, ao levantar); episódios iguais há anos; sem cardiopatia; exame e ECG normais. Alta com orientação, sem exames adicionais.\n5) Canadian Syncope Risk Score (CSRS): predisposição vasovagal −1; cardiopatia +1; PA sistólica < 90 ou > 180 mmHg +2; troponina acima do percentil 99 +2; eixo do QRS < −30° ou > 100° +1; QRS > 130 ms +1; QTc > 480 ms +2; diagnóstico de vasovagal na emergência −2; de causa cardíaca +2.\n   - −3 a 0 (muito baixo e baixo): alta, após cerca de 2 h de monitor.\n   - 1 a 3 (médio) e ≥ 4 (alto e muito alto): monitor por pelo menos 6 h e investigação; alto risco: internar ou discutir com a cardiologia. Se alta no risco médio ou alto: Holter ou monitor de eventos por até 15 dias (Thiruganasambandamoorthy 2019).\n   Alternativa: regra de San Francisco (insuficiência cardíaca, hematócrito < 30%, ECG alterado, dispneia, PA sistólica < 90 mmHg): qualquer item = não é baixo risco.\n6) Exames só por suspeita: hemograma (sangramento, anemia), troponina (dor torácica, dispneia, suspeita cardíaca), eletrólitos e função renal (diurético, vômitos, diarreia), beta-hCG (mulher em idade fértil), ecocardiograma (sopro, cardiopatia ou ECG alterado), D-dímero ou angiotomografia (suspeita de TEP). TC de crânio só com trauma de crânio ou sinal neurológico.\n7) Internar se: causa grave identificada (arritmia, infarto, TEP, dissecção de aorta, estenose aórtica grave, tamponamento, sangramento), alto risco sem diagnóstico, alteração persistente de sinais vitais ou trauma importante pela queda. Risco intermediário sem diagnóstico: observação estruturada com monitor ou investigação ambulatorial breve (ACC/AHA 2017).\n8) Desidratação ou hipotensão ortostática: repor volume por via oral ou venosa conforme o caso e revisar os remédios que baixam a pressão.",
  "orient": "- O desmaio comum acontece quando a pressão e os batimentos caem por alguns segundos e o sangue chega menos ao cérebro. Na maioria das vezes não é grave.\n- Beba água ao longo do dia e não fique muitas horas sem líquidos, a não ser que um médico tenha mandado restringir líquidos por problema no coração ou nos rins.\n- Ao sentir que vai desmaiar (calor, suor, enjoo, visão escurecendo, fraqueza), deite-se e levante as pernas, ou sente-se. Se não puder, cruze as pernas apertando bem as coxas, ou segure uma mão na outra e puxe os braços com força, até passar.\n- Levante-se devagar: sente-se na cama por 1 minuto antes de ficar em pé, principalmente ao acordar, depois das refeições e à noite.\n- Evite ficar muito tempo em pé parado, lugares quentes e cheios, ficar muitas horas sem comer ou beber e excesso de bebida alcoólica.\n- Não pare nem mude os remédios de pressão por conta própria. Leve a lista dos seus remédios à consulta.\n- Se o desmaio foi sem nenhum aviso, durante esforço ou enquanto dirigia, ou se você dirige profissionalmente, não dirija e evite trabalho em altura, máquinas perigosas e nadar sozinho até a reavaliação com o médico.\n- Marque consulta na unidade básica de saúde (posto de saúde) para reavaliação. Se o desmaio se repetir, a investigação deve continuar com o médico.\n- Volte imediatamente ao pronto-socorro se: desmaiar de novo, principalmente durante esforço ou deitado; tiver dor no peito, falta de ar, coração disparado ou muito lento; fraqueza, dormência ou formigamento de um lado do corpo, fala enrolada ou boca torta; dor de cabeça forte e súbita; dor forte na barriga; fezes pretas ou sangramento.",
  "rev": [
   "Decidido pelo médico (2026-10-27): sal extra só como aviso ao médico (sem hipertensão; ESC 2018 pela EHRA 2024), fora do texto do paciente; glicemia capilar como \"considerar\" também na queixa tontura-sincope; escore CSRS criado na aba Escores e ligado a esta conduta.",
   "Criada (2026-10-26): síncope e pré-síncope com estratificação de risco (ESC 2018, ACC/AHA 2017, Canadian Syncope Risk Score, regra de San Francisco), tempo de monitor e orientação sem remédio. Conferência independente (.rascunhos/sincope-pericardite-conferencia.md) aplicada; itens de ECG e exame da tabela 5 da ESC 2018 conferidos só em fonte secundária."
  ],
  "fontes": [
   "Brignole M et al. 2018 ESC Guidelines for the diagnosis and management of syncope (Eur Heart J 2018;39:1883-1948): avaliação inicial com ECG e PA deitado e em pé; características de alto e baixo risco na emergência (tabela 5); escores não devem ser usados sozinhos (classe III); manobras de contrapressão; hidratação; orientação sobre direção. https://doi.org/10.1093/eurheartj/ehy037",
   "Shen WK et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients With Syncope (Circulation 2017;136:e60-e122): ECG em todos; exames de sangue dirigidos; sem exame de rotina de laboratório, neuroimagem, EEG ou Doppler de carótidas sem suspeita; alta na síncope reflexa presumida; observação estruturada no risco intermediário. https://doi.org/10.1161/CIR.0000000000000499",
   "Thiruganasambandamoorthy V et al. Development of the Canadian Syncope Risk Score to predict serious adverse events after emergency department assessment of syncope (CMAJ 2016;188(12):E289-E298): 9 itens, de -3 a 11 pontos; ≥ 16 anos, até 24 h do evento. https://doi.org/10.1503/cmaj.151469",
   "Thiruganasambandamoorthy V et al. Multicenter Emergency Department Validation of the Canadian Syncope Risk Score (JAMA Intern Med 2020;180(5):737-744): risco muito baixo com 0,3% de desfecho grave em 30 dias. https://doi.org/10.1001/jamainternmed.2020.0288",
   "Thiruganasambandamoorthy V et al. Duration of Electrocardiographic Monitoring of Emergency Department Patients With Syncope (Circulation 2019;139:1396-1406): monitor por 2 h no risco baixo e 6 h no médio e alto (CSRS); monitor ambulatorial por 15 dias para médio e alto que recebem alta. https://doi.org/10.1161/CIRCULATIONAHA.118.036088",
   "Quinn JV et al. Derivation of the San Francisco Rule to predict patients with short-term serious outcomes (Ann Emerg Med 2004;43:224-232); Saccilotto RT et al. San Francisco Syncope Rule to predict short-term serious outcomes: a systematic review (CMAJ 2011;183:E1116): sensibilidade menor na validação externa.",
   "ACEP — Choosing Wisely: evitar TC de crânio no adulto com síncope, sem trauma significativo e com exame neurológico normal. https://www.choosingwisely.org/clinician-lists/american-college-emergency-physicians-ct-scans-of-head-for-emergency-department-patients-with-syncope/",
   "Brignole M, Rivasi G, Fedorowski A et al. Mechanism-based therapy of non-cardiac syncope: a practical guide (EHRA; Europace 2024;26:euae073; PMC10988836): na síncope reflexa, mais água ao longo do dia e 500 mL em bolo na iminência de sintomas; suplemento de sal (cerca de 120 mmol/dia de NaCl) proposto só em quem não tem hipertensão (citando a ESC 2018). https://doi.org/10.1093/europace/euae073",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 23 — Syncope (conferência).",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 20 — Perda transitória da consciência: tabelas de risco, regra de San Francisco e Canadian Syncope Risk Score, observação de 2 h (baixo risco) e 6 h (médio e alto), afastamento de motoristas e pilotos até avaliação (conferência)."
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
  "unidade": "1) Confirmar o trajeto serpiginoso, elevado e pruriginoso (pés, nádegas, mãos), com história de areia ou terra.\n2) Lesões infectadas (crostas, pus) ou vermelhidão que se espalha: tratar a infecção (ver Impetigo/Erisipela).\n3) Lesão no tronco que anda rápido (cm por hora), com diarreia ou tosse, em imunossuprimido ou usuário de corticoide: pensar em estrongiloidíase (ver Verminose).\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Evite andar descalço em areia ou terra.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): ivermectina pela tabela de peso da bula (½ cp de 15–24 kg a 2½ cp de 66–79 kg; 200 mcg/kg a partir de 80 kg), sem uso abaixo de 15 kg ou de 5 anos nem na gestação (bula Revectina); gestante e criança < 2 anos ou < 15 kg só com tópico (CDC).",
   "Adicionado: ivermectina como alternativa."
  ],
  "fontes": [
   "Caumes E. Treatment of cutaneous larva migrans (Clin Infect Dis 2000).",
   "Centers for Disease Control and Prevention. Clinical Care of Zoonotic Hookworm (larva migrans cutânea): albendazol 400 mg/dia por 3–7 dias ou ivermectina 200 mcg/kg dose única; crianças < 2 anos ou < 15 kg, só tópico. https://www.cdc.gov/zoonotic-hookworm/hcp/clinical-care/index.html",
   "Bula Revectina (ivermectina 6 mg), Abbott, registrada na Anvisa — tabela de dose por peso; contraindicada abaixo de 15 kg ou 5 anos.",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 238 — Trichinellosis and Other Tissue Nematode Infections (larva migrans cutânea).",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 239 — Intestinal Nematode Infections (estrongiloidíase: larva currens, lesão que migra rápido, e hiperinfecção com corticoide ou imunossupressão)."
  ]
 },
 {
  "id": "nauseas",
  "nome": "Náuseas e vômitos",
  "cat": "gi",
  "cid": "R11",
  "sin": "enjoo vomito",
  "casa": "Uso oral\n1) Dimenidrinato + Piridoxina 50/10mg (Dramin B6) --- 10 cp\nTomar 1 cp VO de 8/8h por até 3 dias, se enjoo.\nOu\n1) Ondansetrona 8mg (Vonau Flash) ------------ 10 cp\nDissolver 1 cp na língua de 8/8h por até 3 dias, se enjoo.",
  "avisoRx": ["Procurar a causa: gravidez (teste na mulher em idade fértil), obstrução ou abdome agudo, cetoacidose, infarto (náusea com desconforto torácico).", "Também: causa neurológica (cefaleia, alteração visual, déficit focal), labirintopatia e medicamentos (Harrison, 22ª ed., cap. 48).", "Desidratação que não se corrige por via oral: hidratar EV e observar (Harrison, cap. 48).", "Metoclopramida: no máximo 5 dias (EMA 2013); no idoso, evitar fora da gastroparesia (discinesia tardia).", "Ondansetrona: cautela com QT longo (Harrison, 22ª ed., cap. 48).", "Sucralfato: outro remédio VO 2 h antes ou depois (reduz absorção: quinolona, levotiroxina, digoxina, fenitoína, varfarina); antiácido a 30 min (bula).", "Sucralfato: cautela na DRC e diálise (acúmulo de alumínio); somar antiácido com alumínio aumenta a carga (bula).", "Sucralfato no diabetes: relatos de hiperglicemia (bula FDA); a suspensão não tem sacarose (tem sorbitol). Efeito mais comum: constipação.", "Sucralfato para náusea: fora da indicação de bula (úlcera, gastrite, azia); decisão clínica. Náusea também é efeito adverso (bula)."],
  "unidade": "1) Ondansetrona 4 mg EV lenta (≥ 30 s) ou IM\n   Ou Metoclopramida 10 mg IM ou EV lenta (≥ 3 min).\n2) Sucralfato 2 g/10 mL suspensão (Sucrafilm flaconete) 1 flaconete VO, dose única, se necessário, com epigastralgia ou azia associada. Agitar antes; outro remédio VO 2 h antes ou depois.",
  "orient": "- Tome líquidos em pequenos goles, várias vezes ao dia.\n- Volte imediatamente ao pronto-socorro se vomitar sangue ou material escuro como borra de café, tiver vômito verde, dor forte na barriga, dor de cabeça súbita, rigidez no pescoço, confusão ou sinais de desidratação (muita sede, boca seca, pouca urina).\n- Procure atendimento se os vômitos durarem mais de 2 dias.",
  "rev": [
   "Corrigido (2026-10-27): sucralfato 2 g (1 flaconete) VO na unidade, por decisão do médico; dose conferida na bula Sucrafilm (Anvisa 25/06/2026).",
   "Corrigido (2026-10-09): fonte \"Consenso clínico\" trocada por Harrison 22ª ed. cap. 48, Cochrane 2015 e bulas; adicionados causa a procurar e sinais de retorno.",
   "Ajustado: Dramin B6 7 → 3 dias, se necessário.",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "evid": "Nenhum antiemético se mostrou superior a outro, nem claramente ao placebo, no adulto no pronto-socorro (Cochrane 2015); escolher pelo perfil de efeitos adversos. Ondansetrona oral fora da quimioterapia e do pós-operatório é uso fora da bula.",
  "fontes": [
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 48 — Nausea, Vomiting, and Indigestion: causas, abordagem, hidratação e escolha do antiemético por indicação; metoclopramida e discinesia tardia; antagonistas 5-HT3 e QTc.",
   "Furyk JS et al. Drugs for the treatment of nausea and vomiting in adults in the emergency department setting (Cochrane Database Syst Rev 2015;(9):CD010106). doi 10.1002/14651858.CD010106.pub2.",
   "Bulas Anvisa: Dramin B6 (dimenidrinato + piridoxina, Takeda), ondansetrona orodispersível e Plasil injetável (metoclopramida); EMA 2013, metoclopramida (até 10 mg 3x/dia, no máximo 5 dias).",
   "NHS. Diarrhoea and vomiting: sinais para pronto-socorro e vômito por mais de 2 dias. https://www.nhs.uk/conditions/diarrhoea-and-vomiting/",
   "Bula Anvisa do Sucrafilm suspensão oral (sucralfato 200 mg/mL; flaconete de 2 g/10 mL, caixa com 20; EMS Sigma Pharma, aprovada em 25/06/2026): protetor da mucosa 1 flaconete de 2 g por tomada (1 h antes das refeições ou ao deitar), antiulceroso 1 flaconete 2x ao dia; agitar antes; outros remédios 2 h antes ou depois, antiácido a 30 min; cautela na insuficiência renal crônica e na diálise (alumínio); indicado em úlcera, gastrite e azia; contém sorbitol. https://www.precopopular.com.br/_v/leaflet/download/NDUwMjI4",
   "Bula FDA do Carafate suspensão oral (sucralfato; AbbVie, rev. 06/2023): hiperglicemia relatada em diabéticos, constipação em 2%, bezoar, acúmulo de alumínio na insuficiência renal crônica e na diálise. https://www.rxabbvie.com/pdf/carafate-oral-suspension_pi.pdf"
  ]
 },
 {
  "id": "otite-externa",
  "nome": "Otite externa",
  "cat": "orl",
  "cid": "H60.9",
  "sin": "dor ouvido piscina",
  "casa": "Uso otológico\n1) Polimixina B + Neomicina + Hidrocortisona (Otosporin) --- 1 fr\nPingar 3 gotas no ouvido afetado de 8/8h por 7 dias.\nOu\n1) Ciprofloxacino + Hidrocortisona (Otociriax) ------------- 1 fr\nPingar 3 gotas no ouvido afetado de 12/12h por 7 dias.\nOu (perfuração suspeita ou confirmada, ou tubo de ventilação)\n1) Ciprofloxacino 5 mg/mL otológico (Otofoxin) ------------- 1 fr\nPingar 3 gotas no ouvido afetado de 8/8h por 7 dias.\n\nUso oral\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (nimesulida)\n2) Nimesulida 100mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor.",
  "avisoRx": ["Perfuração suspeita ou confirmada, ou tubo de ventilação: só ciprofloxacino sem corticoide (Otofoxin); sem neomicina nem associações com corticoide.","Antibiótico oral só se celulite ao redor, diabetes/imunossupressão ou otite externa maligna.","Ibuprofeno e alternativas (cetoprofeno, nimesulida, naproxeno, diclofenaco): só depois de descartar dengue; não usar na gestação nem na doença renal.","Nimesulida: no máximo 100 mg de 12/12h por até 15 dias; não usar com febre, sintomas gripais, doença do fígado ou álcool em excesso (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Nimesulida: não associar a paracetamol ou a outro analgésico com risco para o fígado; usar pelo menor tempo possível (EMA 2012)."],
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
   "Bulas Otosporin (3 gotas 3–4x/dia por 7–10 dias), Otociriax (3 gotas 2x/dia por 7 dias) e Otofoxin (3–5 gotas 3x/dia por 7 dias); Otosporin e Otociriax contraindicados com perfuração timpânica.",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa da nimesulida 100 mg comprimido (Vitamedic, RDC 47/2009; referência Nisulid, Aché): 50–100 mg 2x ao dia após as refeições; contraindicada < 12 anos, insuficiência hepática e renal grave. https://static-webv8.jet.com.br/drogaosuper/bulas/145802.pdf",
   "EMA. Nimesulide-containing medicinal products — referral (artigos 31 e 107i, 2007–2012): 100 mg 2x/dia, no máximo 15 dias; contraindicada com febre ou sintomas gripais, doença hepática ou outras drogas hepatotóxicas. https://www.ema.europa.eu/en/documents/other/amendments-be-included-relevant-sections-summary-product-characteristics-nimesulide-containing_en.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
  ]
 },
 {
  "id": "oma",
  "nome": "Otite média aguda (adulto)",
  "cat": "orl",
  "cid": "H66.9",
  "sin": "dor ouvido otite media",
  "casa": "Uso oral\n1) Amoxicilina 875mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu\n1) Amoxicilina 500mg ------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\nOu (uso de amoxicilina nos últimos 30 dias ou falha)\n1) Amoxicilina + Clavulanato 875/125mg ------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu (alergia a penicilina)\n1) Azitromicina 500mg ------------------------ 3 cp\nTomar 1 cp VO 1x ao dia por 3 dias.\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h por 5 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "avisoRx": ["Ibuprofeno e alternativas (cetoprofeno, naproxeno, diclofenaco): só depois de descartar dengue; não usar na gestação nem na doença renal.","Nimesulida fica de fora: contraindicada com febre ou sintomas gripais (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013."],
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
   "NICE NG91. Otitis media (acute): antimicrobial prescribing, 2018 (atualizada 2022), seção 1.1 e tabela de escolha do antibiótico: amoxicilina por 5–7 dias; macrolídeo se alergia; antibiótico imediato ou de reserva conforme gravidade (escrito para menores de 18 anos; extrapolado). https://www.nice.org.uk/guidance/ng91",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
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
  "unidade": "1) Não é urgência: confirmar com exame micológico antes de tratar (outras causas imitam: psoríase, trauma).\n2) Vermelhidão, dor e pus ao redor da unha (paroníquia aguda): drenar se flutuante → ver Abscesso.\n3) Diabético: examinar o pé inteiro (úlcera, infecção, pulsos, sensibilidade).\n4) Encaminhar à UBS ou ao dermatologista; antes do itraconazol, TGO/TGP e revisão dos remédios de uso contínuo.\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Antes de começar o itraconazol, fale com o médico se tiver insuficiência cardíaca (coração fraco) ou se usar remédio para colesterol (como sinvastatina) ou outros remédios de uso contínuo.\n- Pare o remédio e procure atendimento se tiver enjoo persistente, cansaço intenso, pele ou olhos amarelados ou urina escura.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Ajustado: 3 ciclos para unhas dos pés.",
   "Adicionado: exame micológico e contraindicações."
  ],
  "fontes": [
   "Ameen M et al. British Association of Dermatologists guidelines for onychomycosis (Br J Dermatol 2014).",
   "Senneville É et al. IWGDF/IDSA Guidelines on the diagnosis and treatment of diabetes-related foot infections (Clin Infect Dis 2023;ciad527): examinar o pé inteiro do diabético; infecção no pé diabético exige avaliação clínica e tratamento sistêmico conforme a gravidade. https://doi.org/10.1093/cid/ciad527"
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
  "casa": "# PAC de baixo risco, sem comorbidades:\nUso oral\n1) Amoxicilina 500mg ------------------------- 30 cp\nTomar 2 cp (1 g) VO de 8/8h por 5 dias.\nOu\n1) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg VO no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia.\n\n# PAC com comorbidades (DPOC, DM, IC, DRC, etilismo) ou ATB nos últimos 3 meses:\n1) Amoxicilina + Clavulanato 875/125mg ------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\n2) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg VO no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia.\nOu (monoterapia)\n1) Levofloxacino 750mg ----------------------- 5 cp\nTomar 1 cp VO 1x ao dia por 5 dias.\n\nSintomáticos\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.",
  "avisoRx": ["Na PAC a ATS/IDSA usa amoxicilina 1 g de 8/8h; não há esquema de 12/12h com amoxicilina isolada nessa diretriz.","Azitromicina em monoterapia só se resistência local a macrolídeo < 25%.","Baixo risco: CRB-65 0 ou CURB-65 0–1; com 1 ou mais, considerar avaliação hospitalar."],
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
  "unidade": "1) Afastar as formas graves, que não são de alta: vermelhidão e descamação de quase todo o corpo (eritrodérmica) ou pústulas disseminadas com febre (pustulosa generalizada) → internar e chamar o dermatologista.\n2) Dor e inchaço nas articulações (artrite psoriásica): registrar e encaminhar ao reumatologista.\n3) Não usar corticoide oral ou injetável na psoríase: pode piorar ou provocar a forma pustulosa ao suspender.\n4) Encaminhar ao dermatologista para acompanhamento.\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Hidrate a pele todos os dias.\n- Procure um dermatologista para acompanhamento.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Trocado: hidrocortisona (potência baixa) → clobetasol para placas corporais.",
   "Removido: dipirona IM."
  ],
  "fontes": [
   "Elmets CA et al. AAD–NPF Guidelines: Topical Therapy for Psoriasis (J Am Acad Dermatol 2021).",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 60 — Eczema, Psoriasis, Cutaneous Infections, Acne, and Other Common Skin Disorders.",
   "Menter A et al. Joint AAD–NPF guidelines of care for the management of psoriasis with systemic nonbiologic therapies (J Am Acad Dermatol 2020;82:1445): corticoide sistêmico pode precipitar piora, eritrodermia ou psoríase pustulosa na retirada."
  ]
 },
 {
  "id": "queimadura-solar",
  "nome": "Queimadura solar leve",
  "cat": "pele",
  "cid": "L55.9",
  "sin": "sol vermelhidao",
  "casa": "Uso tópico\n1) Hidratante com aloe vera / loção de calamina --- 1 fr\nAplicar nas áreas afetadas 3x ao dia.\n2) Hidrocortisona 1% creme ------------------- 1 bisnaga\nAplicar fina camada nas áreas mais doloridas, sem bolha aberta, 2x ao dia por até 3 dias.\n\nUso oral\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h por 3 dias.\nOu (cetoprofeno)\n3) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (nimesulida)\n3) Nimesulida 100mg -------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (naproxeno)\n3) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (diclofenaco)\n3) Diclofenaco de sódio 50mg ----------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.",
  "avisoRx": ["Bolhas extensas: seguir a conduta \"Queimaduras\".","Ibuprofeno só depois de descartar dengue, em quem tem febre.","Cetoprofeno, naproxeno, diclofenaco e nimesulida: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida: no máximo 100 mg de 12/12h por até 15 dias; não usar com febre, sintomas gripais, doença do fígado ou álcool em excesso (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Nimesulida: não associar a paracetamol ou a outro analgésico com risco para o fígado; usar pelo menor tempo possível (EMA 2012)."],
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
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue).",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa da nimesulida 100 mg comprimido (Vitamedic, RDC 47/2009; referência Nisulid, Aché): 50–100 mg 2x ao dia após as refeições; contraindicada < 12 anos, insuficiência hepática e renal grave. https://static-webv8.jet.com.br/drogaosuper/bulas/145802.pdf",
   "EMA. Nimesulide-containing medicinal products — referral (artigos 31 e 107i, 2007–2012): 100 mg 2x/dia, no máximo 15 dias; contraindicada com febre ou sintomas gripais, doença hepática ou outras drogas hepatotóxicas. https://www.ema.europa.eu/en/documents/other/amendments-be-included-relevant-sections-summary-product-characteristics-nimesulide-containing_en.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
  ]
 },
 {
  "id": "prostatite",
  "nome": "Prostatite bacteriana aguda",
  "cat": "uro",
  "cid": "N41.0",
  "sin": "prostata dor perineal",
  "casa": "Uso oral\n1) Ciprofloxacino 500mg ---------------------- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias.\nOu\n1) Sulfametoxazol + Trimetoprima 800/160mg --- 28 cp\nTomar 1 cp VO de 12/12h por 14 dias.\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\n\n# Homem < 35 anos com relação sexual sem preservativo (gonococo e clamídia):\n1) Ceftriaxona 500mg IM ----------------------- dose única na unidade\n2) Doxiciclina 100mg ------------------------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue; não usar na doença renal.","Gonococo/clamídia: tratar a parceria (ver conduta IST).","Colher urocultura antes do antibiótico. Não fazer toque prostático vigoroso (risco de bacteremia).","Internar se febre alta, sepse ou retenção urinária.","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida fica de fora: contraindicada com febre ou sintomas gripais (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Reavaliar com a urocultura; manter o antibiótico até 28 dias se ainda houver sintomas (decisão de 2026-10-17)."],
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
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue.",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
  ]
 },
 {
  "id": "escroto-agudo",
  "nome": "Escroto agudo (torção, epididimite, orquite)",
  "cat": "uro",
  "cid": "N50.8",
  "sin": "dor testicular testiculo escroto bolsa escrotal torcao epididimite orquite orquiepididimite fournier saco inchado",
  "casa": "Uso oral\n1) Doxiciclina 100mg ------------------------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias, com um copo de água.\nOu (levofloxacino)\n1) Levofloxacino 500mg ----------------------- 10 cp\nTomar 1 cp VO 1x ao dia por 10 dias.\nOu (sem risco de IST: ciprofloxacino)\n1) Ciprofloxacino 500mg ---------------------- 20 cp\nTomar 1 cp VO de 12/12h por 10 dias.\n2) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 5 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 5 dias.\n3) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\nOu (paracetamol)\n3) Paracetamol 750mg ------------------------- 20 cp\nTomar 1 cp VO de 6/6h se dor (no máximo 4 cp por dia).",
  "avisoRx": ["Dor testicular súbita: torção até prova em contrário; urologia na hora. O US com Doppler não pode atrasar a cirurgia (EAU 2026).","TWIST ≥ 5: alto risco (cirurgia sem US); 3–4: US com Doppler urgente; ≤ 2: torção improvável (Barbosa 2013; validado em adultos em 2021).","Fluxo ao Doppler não exclui torção (torção parcial ou intermitente); dor que melhorou sozinha não afasta torção intermitente.","Epididimite com risco de IST: ceftriaxona 500 mg IM na unidade + doxiciclina 100 mg 12/12h por 10 dias (CDC 2021; ceftriaxona 500 mg no PCDT).","Sexo anal insertivo: ceftriaxona 500 mg IM + levofloxacino 500 mg 1x/dia por 10 dias, no lugar da doxiciclina (CDC 2021).","Sem vida sexual ativa e com causa entérica provável (sonda, cirurgia urológica, HPB, ITU): levofloxacino ou ciprofloxacino, 10 dias.","História sexual negativa não exclui IST no homem sexualmente ativo (EAU 2026): na dúvida, ceftriaxona + doxiciclina.","Ciprofloxacino não cobre gonococo (resistência alta no Brasil, PCDT IST 2022) nem clamídia: só quando o risco de IST é baixo.","Levofloxacino 500 mg: ClCr 20–49, 500 mg no 1º dia e depois 250 mg 1x/dia; ClCr 10–19, 250 mg a cada 48 h (bula).","Pré-púbere: epididimite em geral não bacteriana; antibiótico só se EAS ou urocultura alterados (EAU pediátrica 2026).","Quinolona: tendinite e ruptura de tendão, neuropatia e aneurisma de aorta; evitar em idoso com corticoide (FDA 2016 e 2018).","Testar HIV, sífilis e hepatites B e C; tratar as parcerias sexuais dos últimos 60 dias (PCDT IST 2022; CDC 2021).","Sem melhora em 72 h: reavaliar (abscesso, infarto testicular, tumor, tuberculose, caxumba) e encaminhar à urologia (CDC 2021).","Caxumba (parótidas aumentadas, quadro viral): orquite viral, só suporte; o antibiótico não ajuda.","Anti-inflamatório só depois de descartar dengue; não usar na doença renal, com úlcera ou com anticoagulante.","Fournier: antibiótico EV na chegada e desbridamento em até 24 h (EAU 2026); cistostomia costuma ser necessária.","Fournier: meropeném ou pip-tazo sempre com vancomicina (IDSA 2014); confirmar o esquema com a CCIH local.","CID escroto agudo N50.8 | torção do testículo N44 | orquiepididimite N45.9 | hérnia inguinal encarcerada K40.3.","Doxiciclina: tomar sentado ou em pé e não deitar por 30 min (já está nas orientações)."],
  "unidade": "1) Dor testicular súbita é torção até prova em contrário, em qualquer idade. Calcular o TWIST: edema testicular 2, testículo endurecido 2, reflexo cremastérico ausente 1, náuseas ou vômitos 1, testículo alto 1.\n2) TWIST ≥ 5 ou suspeita forte: urologia na hora para exploração cirúrgica, sem esperar ultrassom; jejum. O melhor salvamento é nas primeiras 4 a 6 h de dor. A distorção manual (rotação para fora) pode ser tentada pela urologia enquanto aguarda, sem atrasar a cirurgia.\n3) TWIST 3 ou 4: US de bolsa escrotal com Doppler com urgência, se não atrasar a urologia; fluxo presente não exclui torção.\n4) TWIST ≤ 2: torção improvável; pensar em epididimite, torção de apêndice testicular (dor no polo superior, ponto azulado: AINE e repouso), hérnia e trauma.\n5) Analgesia EV: dipirona 1 g EV lenta (no máximo 1 mL/min, deitado). Se intensa: morfina 0,05 mg/kg (cerca de 2,5 a 5 mg) EV lenta, a cada 20 min até controlar; idoso e doente renal: metade.\n6) Epididimite (dor gradual, epidídimo doloroso, disúria ou corrimento): EAS e urocultura; se disponível, PCR para clamídia e gonococo no primeiro jato de urina; testes rápidos de HIV, sífilis e hepatites B e C.\n7) Risco de IST: Ceftriaxona 500 mg IM, dose única, diluída em 2 mL de lidocaína 1% (≥ 150 kg: 1 g), mais a doxiciclina da receita.\n8) Hérnia inguinoescrotal endurecida, dolorosa e irredutível: cirurgia geral com urgência; vômitos, febre, pele vermelha ou sinais de obstrução (estrangulamento): cirurgia de emergência.\n9) Trauma escrotal: US; hematoma volumoso, testículo não palpável ou imagem inconclusiva: urologia para exploração.\n10) Fournier (dor desproporcional, pele escurecida ou com bolhas, crepitação, odor fétido, sepse; diabético ou imunossuprimido): sala vermelha, hemoculturas, antibiótico EV já e cirurgia para desbridamento em até 24 h:\n   Piperacilina-tazobactam 4,5 g EV de 6/6h + vancomicina 15 mg/kg EV de 12/12h (ajustar à função renal).\n   Ou Meropeném 1 g EV de 8/8h + vancomicina 15 mg/kg EV de 12/12h (IDSA 2014). Confirmar o esquema com a CCIH local.\n11) Internar a epididimite com febre alta, sinais sistêmicos, abscesso, vômitos que impedem o remédio ou sem melhora em 72 h.",
  "orient": "- Use cueca firme ou suspensório escrotal. Compressa fria, enrolada num pano, por 15 a 20 minutos, várias vezes ao dia, alivia a dor e o inchaço.\n- Fique em repouso nos primeiros dias. Deitado, mantenha o escroto apoiado e elevado com uma toalha dobrada.\n- Tome o antibiótico até o fim, mesmo que melhore antes.\n- Doxiciclina: tome com um copo de água, sentado ou em pé, e não se deite por 30 minutos. Evite exposição forte ao sol.\n- Levofloxacino ou ciprofloxacino: se aparecer dor ou inchaço em tendão, como no calcanhar, pare o remédio e procure atendimento.\n- Não tenha relações sexuais até terminar o tratamento e não ter mais sintomas. Sua parceria sexual também precisa ser examinada e tratada.\n- Faça os exames de HIV, sífilis e hepatites que foram pedidos.\n- A dor costuma melhorar em poucos dias, mas o inchaço pode demorar semanas para sumir. Se não melhorar em 3 dias, volte para nova avaliação.",
  "rev": [
   "Criada (2026-10-26): diferencial torção × torção de apêndice × epididimite/orquite × hérnia encarcerada × trauma × Fournier; TWIST; epididimite pelo risco de IST (CDC 2021, EAU 2026, PCDT IST 2022), ceftriaxona 500 mg IM (1 g se ≥ 150 kg); Fournier com vancomicina sempre (IDSA 2014). Conferência independente (.rascunhos/panico-retencao-conferencia.md) aplicada."
  ],
  "fontes": [
   "EAU Guidelines on Paediatric Urology, 2026 — Acute scrotum: torção exige tratamento imediato (forte); salvamento melhor nas primeiras 4 a 6 h; diagnóstico clínico, o Doppler não deve atrasar a cirurgia e fluxo presente não exclui torção; TWIST ajuda, mas não substitui o exame; distorção manual pode ser tentada enquanto se aguarda a cirurgia, sem atrasá-la; torção de apêndice: conservador com AINE. https://uroweb.org/guidelines/paediatric-urology/chapter/acute-scrotum",
   "Barbosa JA et al. Development and initial validation of a scoring system to diagnose testicular torsion in children (J Urol 2013;189:1859-64): TWIST — edema testicular 2, testículo endurecido 2, reflexo cremastérico ausente 1, náuseas/vômitos 1, testículo alto 1; ≤ 2 baixo risco, ≥ 5 alto risco; US só no intermediário. https://doi.org/10.1016/j.juro.2012.10.056",
   "Barbosa JABA et al. Validation of the TWIST score for testicular torsion in adults (Int Urol Nephrol 2021;53:7-11; 68 adultos, mediana 24,9 anos, aplicado por cirurgião geral): ≤ 2 = VPN 100%; ≥ 5 = VPP 90%; ≥ 6 = VPP 100%. https://doi.org/10.1007/s11255-020-02618-4",
   "Expert Panel on Urological Imaging. ACR Appropriateness Criteria Acute Onset of Scrotal Pain — Without Trauma, Without Antecedent Mass: 2024 Update (J Am Coll Radiol 2024;21(11S):S364-S371): US com Doppler é o exame inicial. https://doi.org/10.1016/j.jacr.2024.08.011",
   "Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 — Epididymitis (MMWR Recomm Rep 2021;70(4):1-187): clamídia/gonococo provável: ceftriaxona 500 mg IM dose única + doxiciclina 100 mg VO 2x/dia por 10 dias; sexo anal insertivo: ceftriaxona 500 mg IM + levofloxacino 500 mg 1x/dia por 10 dias; só entéricos: levofloxacino 500 mg 1x/dia por 10 dias; ≥ 150 kg: ceftriaxona 1 g; repouso, elevação escrotal e AINE; NAAT de clamídia e gonococo; reavaliar se sem melhora em 72 h; tratar parcerias dos últimos 60 dias; manter alta suspeita de torção. https://www.cdc.gov/std/treatment-guidelines/epididymitis.htm",
   "EAU Guidelines on Urological Infections, 2026 (Bonkat G et al.), cap. 3.12 Acute epididymitis e 3.13 Fournier's gangrene: urocultura de jato médio e NAAT no primeiro jato; baixo risco de gonococo: levofloxacino 500 mg 1x/dia por 10 a 14 dias; gonococo provável: ceftriaxona 1 g IM/EV + doxiciclina 200 mg e depois 100 mg 2x/dia por 10 a 14 dias; sem atividade sexual: quinolona ou SMX-TMP; quinolona não trata gonococo; ECR: ciprofloxacino superior à pivampicilina > 40 anos; AINE, frio local e elevação do escroto; Fournier: antibiótico de largo espectro na chegada (tabela 11: piperacilina-tazobactam 4,5 g EV 6/6h ou 8/8h + vancomicina 15 mg/kg 12/12h; meropenem 1 g EV 8/8h) e desbridamento em até 24 h. https://uroweb.org/guidelines/urological-infections/chapter/the-guideline",
   "Eickhoff JH et al. A double-blind, randomized, controlled multicentre study to compare the efficacy of ciprofloxacin with pivampicillin as oral therapy for epididymitis in men over 40 years of age (BJU Int 1999;84:827-34): ciprofloxacino 500 mg VO 2x/dia por 10 dias, falha 19,7% × 40,2%. https://doi.org/10.1046/j.1464-410x.1999.00252.x",
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 (versão vigente), cap. 8 (uretrites; quadro 37, p. 127): ceftriaxona 500 mg IM dose única nas infecções gonocócicas; resistência alta do gonococo ao ciprofloxacino no Brasil; orquiepididimite como complicação; testagem de HIV, sífilis e hepatites e tratamento das parcerias. Não traz esquema próprio para epididimite. https://www.saude.sp.gov.br/resources/crt/assistencia/pcdt/pcdtists2022.pdf",
   "EAU Guidelines on Urological Trauma, 2026 — Genital trauma: US no trauma testicular (forte); explorar se ruptura ou imagem inconclusiva; hematocele pequena (< 3 vezes o testículo contralateral) pode ser conservadora. https://uroweb.org/guidelines/urological-trauma/chapter/urogenital-trauma-guidelines",
   "HerniaSurge Group. International guidelines for groin hernia management (Hernia 2018;22(1):1-165): hérnia encarcerada ou estrangulada é emergência cirúrgica. https://doi.org/10.1007/s10029-017-1668-x",
   "FDA Drug Safety Communications (2016 e 2018): fluoroquinolonas — tendinopatia e ruptura de tendão, neuropatia, efeitos no SNC, hipoglicemia e aneurisma de aorta, maior risco em idosos e com corticoide.",
   "Bulas Anvisa do ibuprofeno 600 mg (1 cp de 6/6h a 8/8h; máximo 3.200 mg/dia) e do naproxeno 500 mg (de 12/12h); Ministério da Saúde. Dengue: diagnóstico e manejo clínico, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue).",
   "Analgesia EV (dipirona 1 g EV lenta; morfina 0,05 mg/kg EV a cada 20 min, metade no idoso e no doente renal): mesma da conduta Dor abdominal (HC-FMUSP 18ª ed., cap. 25; Manterola, Cochrane 2011).",
   "NHS. Epididymitis (revisado em 06/08/2024): pronto-socorro se dor súbita e insuportável no testículo (torção); antibiótico até o fim; melhora em poucos dias, recuperação completa pode levar até 3 meses; testar parcerias; causa por IST mais comum abaixo de 35 anos. https://www.nhs.uk/conditions/epididymitis/",
   "Stevens DL et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update by the IDSA (Clin Infect Dis 2014;59(2):e10-e52), recomendação VIII.2 e tabela 4: infecção necrosante, empírico com vancomicina ou linezolida + piperacilina-tazobactam ou carbapenêmico; pip-tazo 3,375 g de 6/6h a 8/8h; vancomicina 30 mg/kg/dia em 2 doses; meropeném 1 g de 8/8h. https://academic.oup.com/cid/article/59/2/e10/2895845",
   "Bula Anvisa do Rocefin (ceftriaxona): 500 mg IM diluídos em 2 mL de lidocaína 1%; no máximo 1 g por local; a solução com lidocaína nunca vai EV. https://consultaremedios.com.br/rocefin/bula",
   "Bula do levofloxacino (FDA; mesma posologia da bula Anvisa do Levaquin), esquema de 500 mg/dia: ClCr 20–49, 500 mg de ataque e depois 250 mg a cada 24 h; ClCr 10–19, 500 mg e depois 250 mg a cada 48 h. https://medlibrary.org/lib/rx/meds/levofloxacin-74/page/3/"
  ]
 },
 {
  "id": "rinite",
  "nome": "Rinite alérgica",
  "cat": "orl",
  "cid": "J30.4",
  "sin": "alergia nariz espirro coriza",
  "casa": "Uso nasal\n1) Budesonida 64mcg spray nasal -------------- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia (pela manhã), uso contínuo por pelo menos 30 dias.\n2) Soro fisiológico 0,9% (frasco de 500 mL) --- 5 fr\nLavar as narinas com 50 mL em cada lado, com seringa, 3x ao dia.\n\nUso oral\n3) Loratadina 10mg --------------------------- 10 cp\nTomar 1 cp VO 1x ao dia por 10 dias.\n\n# Outro corticoide nasal (opcional): no lugar da budesonida 64 mcg\nUso nasal\n4) Propionato de fluticasona 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, uso contínuo por pelo menos 30 dias.\nOu (mometasona)\n4) Furoato de mometasona 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, uso contínuo por pelo menos 30 dias.\nOu (budesonida 32 mcg)\n4) Budesonida 32mcg spray nasal --- 2 fr\nAplicar 4 jatos em cada narina 1x ao dia, pela manhã, uso contínuo por pelo menos 30 dias.\nOu (budesonida 50 mcg)\n4) Budesonida 50mcg spray nasal --- 2 fr\nAplicar 2 jatos em cada narina de 12/12h, uso contínuo por pelo menos 30 dias.\n\n# Descongestionante oral (opcional): obstrução nasal intensa, por até 5 dias\nUso oral\n5) Fexofenadina 60mg + Pseudoefedrina 120mg --- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu (loratadina + pseudoefedrina)\n5) Loratadina 5mg + Pseudoefedrina 120mg ----- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.",
  "avisoRx": ["Outro corticoide nasal: ao marcar, tirar a budesonida do item 1 (sem), para não somar dois corticoides.","Associação com pseudoefedrina já tem anti-histamínico: ao marcar, tirar a loratadina (sem). Só como resgate, não de uso regular (ARIA).","Pseudoefedrina: não usar na HAS grave ou não controlada, coronariopatia ou IC, glaucoma de ângulo fechado, HPB/retenção, hipertireoidismo, IMAO (14 dias).","Pseudoefedrina: evitar na gestação, lactação, doença renal grave, diabetes e arritmia; risco de PRES e vasoconstrição cerebral (EMA 2024).","Pseudoefedrina na insuficiência renal: iniciar com 1 cp 1x ao dia (bula Allegra D); doença renal grave: contraindicada (EMA 2024)."],
  "unidade": "1) Sem medicação injetável na rinite alérgica. Se sintomas intensos: Loratadina 10mg VO e primeira aplicação do corticoide nasal ainda na unidade.",
  "orient": "- Evite poeira, mofo e pelos de animais; troque a roupa de cama toda semana.",
  "rev": [
   "Corrigido (2026-10-27): descongestionante oral e outro corticoide nasal como opções desligadas; conferência independente (bulas Anvisa, ARIA).",
   "Corrigido (2026-10-17): prometazina IM removida (sem indicação na rinite alérgica; tarja FDA, ISMP, Beers) → loratadina VO e 1ª aplicação do corticoide nasal na unidade; fontes atualizadas (ARIA-EAACI 2024–2025; Sakano 2018).",
   "Adicionado: corticoide nasal (1ª linha no tratamento).",
   "Trocado: dexclorfeniramina IM → prometazina IM (apresentação disponível).",
   "Adicionado: vias IM e EV com diluição (manual de diluição de injetáveis do PA de Joinville 2018 e guias farmacêuticos hospitalares)."
  ],
  "fontes": [
   "Sousa-Pinto B et al. Allergic Rhinitis and its Impact on Asthma (ARIA)-EAACI Guidelines 2024–2025 Revision, Part I (tratamentos intranasais: corticoide nasal; corticoide + azelastina) e Part II (anti-histamínico oral de 2ª geração) (Allergy 2025).",
   "Sakano E et al. IV Consenso Brasileiro sobre Rinites (Braz J Otorhinolaryngol 2018;84:3): corticoide nasal como base; anti-H1 de 2ª geração; controle ambiental; lavagem nasal. https://doi.org/10.1016/j.bjorl.2017.10.006",
   "Bula Budecort Aqua (budesonida 64 mcg/jato): 2 jatos em cada narina 1x ao dia pela manhã, máx. 256 mcg/dia.",
   "Head K et al. Saline irrigation for allergic rhinitis. Cochrane Database Syst Rev 2018;6:CD012597 (volumes estudados de 5 mL a 1.000 mL/dia; benefício nos sintomas). https://pubmed.ncbi.nlm.nih.gov/29932206/",
   "Bula Anvisa do Flixonase (propionato de fluticasona 50 mcg/dose, spray nasal aquoso; GlaxoSmithKline Brasil, atualizada em 16/08/2019): adulto 2 doses em cada narina 1x ao dia, de preferência pela manhã (às vezes 12/12h); máximo 4 doses em cada narina por dia; frascos de 60 e 120 doses. https://www.bulas.med.br/p/bula/5175/flixonase.htm",
   "Bula Anvisa do Nasonex (furoato de mometasona 50 mcg/acionamento, spray nasal; Organon, bula do paciente aprovada em 28/04/2026): rinite alérgica no adulto 2 jatos em cada narina 1x ao dia (200 mcg), máximo 400 mcg; rinossinusite aguda (12 anos ou mais) 2 jatos em cada narina 2x ao dia (400 mcg); preparo inicial de 10 acionamentos; frascos de 60 e 120 acionamentos. https://www.organon.com/brazil/wp-content/uploads/sites/33/2023/06/nasonex_bula_paciente.pdf",
   "Bula Anvisa do Budecort Aqua (budesonida 32 e 64 mcg/dose, spray nasal; AstraZeneca, atualizada em 01/03/2021): rinite no adulto 256 mcg/dia (2 jatos de 64 mcg ou 4 jatos de 32 mcg em cada narina), 1x ao dia pela manhã ou dividido em 2 tomadas; frasco de 120 doses. https://www.bulas.med.br/p/detalhamento-das-bulas/1160134/posologia-e-modo-de-usar-budecort-aqua.htm",
   "Bula Anvisa do Busonid spray nasal aquoso (budesonida 50 e 100 mcg/dose; Biosintética/Aché, atualizada em 21/05/2020): adultos e maiores de 6 anos com 50 mcg, 2 jatos em cada narina 2x ao dia ou 4 jatos em cada narina pela manhã (400 mcg/dia); máximo 400 mcg/dia; frascos de 60 e 120 doses. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/1367728/busonid-spray-nasal.htm",
   "Brożek JL et al. ARIA 2010 Revision (J Allergy Clin Immunol 2010;126:466), recomendações 27 a 29: descongestionante nasal só por curto período (no máximo 5 dias) na obstrução intensa, junto com outro tratamento; descongestionante oral e associação com anti-H1 não devem ser de uso regular, só como resgate (condicional). https://huidhuis.nl/wp-content/uploads/2021/12/Allergic-Rhinitis-and-its-Impact-on-Asthma-ARIA.pdf",
   "Bula Anvisa do Allegra D (cloridrato de fexofenadina 60 mg + cloridrato de pseudoefedrina 120 mg de liberação prolongada; Sanofi, aprovada em 18/01/2013): maiores de 12 anos e adultos, 1 cp 2x ao dia, sem partir nem mastigar; insuficiência renal: dose inicial de 1 cp 1x ao dia; evitar refeição rica em gordura; contraindicado na hipertensão grave, coronariopatia grave, glaucoma de ângulo estreito, retenção urinária e com IMAO (até 14 dias); cautela no diabetes, hipertireoidismo, hipertrofia prostática e doença renal; evitar na gestação e lactação; caixas com 6 e 10 cp. https://www.saudedireta.com.br/catinc/drugs/bulas/allegrad.pdf",
   "Bula Anvisa de loratadina 5 mg + sulfato de pseudoefedrina 120 mg comprimido (Loranil D, Libbs, bula de 2008): maiores de 12 anos e adultos, 1 cp a cada 12 horas; caixa com 6 cp; contraindicado na hipertensão acentuada, insuficiência cardíaca, coronariopatia grave, IMAO (até 14 dias), hipertrofia prostática, glaucoma, diabetes e hipertireoidismo. https://www.saudedireta.com.br/catinc/drugs/bulas/loranild.pdf",
   "EMA/PRAC 2024, comunicado aos profissionais (DHPC) sobre pseudoefedrina: risco de síndrome de encefalopatia posterior reversível (PRES) e de vasoconstrição cerebral reversível (SVCR); contraindicada na hipertensão grave ou não controlada e na doença renal aguda ou crônica grave; suspender se cefaleia súbita intensa, náusea, vômitos, confusão, convulsão ou alteração visual. https://www.ema.europa.eu/en/documents/dhpc/direct-healthcare-professional-communication-dhpc-pseudoephedrine-risks-posterior-reversible-encephalopathy-syndrome-pres-reversible-cerebral-vasoconstriction-syndrome-rcvs_en.pdf"
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
  "casa": "# Benzodiazepínico (opcional): crises frequentes e incapacitantes, até a consulta\nUso oral\n1) Clonazepam 0,5mg -------------------------- 7 cp\nTomar 1/2 cp VO de 12/12h por até 7 dias. Dá sono: não dirija nem beba bebida alcoólica.",
  "avisoRx": ["Antes de fechar pânico: ECG, glicemia e SatO2; pensar em SCA, TEP, arritmia, hipoglicemia, tireotoxicose, asma, abstinência e estimulantes.","Perguntar diretamente sobre ideação suicida (ASQ). Com plano, tentativa recente ou risco alto: não liberar; psiquiatria e acompanhante.","Não usar saco de papel: baixa o oxigênio; houve mortes quando a causa real era SCA ou hipoxemia (Callaham 1989).","Clonazepam (bloco opcional, desligado): NICE CG113 desaconselha; só se crises frequentes e incapacitantes até a consulta, no máximo 7 dias.","Clonazepam exige Notificação de Receita B (azul) (Portaria SVS/MS 344/1998, lista B1). Evitar em idoso, gestação, álcool e opioide (Beers 2023).","Clonazepam: bula no pânico 0,5 mg/dia em 2 tomadas; contraindicado na apneia do sono, insuficiência respiratória ou hepática grave e glaucoma de ângulo fechado.","Seguimento na UBS (psicoterapia; antidepressivo se indicado). CAPS se crises graves e recorrentes, ideação suicida ou uso de álcool e drogas.","CID: transtorno de pânico F41.0 | ansiedade não especificada F41.9."],
  "unidade": "1) Acolher em ambiente calmo e explicar que os sintomas são da crise e passam em minutos. Respiração lenta: inspirar pelo nariz contando até 5 e soltar pela boca contando até 5, por pelo menos 5 min. Não usar saco de papel.\n2) Antes de atribuir ao pânico, afastar causa orgânica conforme o caso: ECG (SCA, arritmia), glicemia capilar, SatO2, FC e PA; TEP se dispneia, dor pleurítica ou fator de risco (Wells/PERC); tireotoxicose (tremor, bócio, perda de peso: TSH e T4 livre); asma (sibilos).\n3) Perguntar por cocaína, anfetamina e outros estimulantes, excesso de cafeína, e por suspensão recente de álcool ou benzodiazepínico (abstinência: ver Abstinência).\n4) Perguntar diretamente sobre ideação suicida (ASQ). Positivo: avaliar o risco antes da alta. Ideação com plano, tentativa recente ou transtorno grave: não liberar; psiquiatria e acompanhante o tempo todo.\n5) Crise intensa que não cede com acolhimento e respiração: Diazepam 5mg VO, dose única (idoso: evitar; se indispensável, 2,5mg). Benzodiazepínico para casa não é rotina (NICE CG113 1.3.20): só o bloco opcional da receita, curto, por decisão do médico.\n6) Crise de pânico isolada não precisa de internação: alta com orientação escrita e encaminhamento à UBS (psicoterapia e, se indicado, antidepressivo); CAPS se crises graves e recorrentes, ideação suicida sem critério de internação ou uso de álcool e drogas.",
  "orient": "- O que você teve foi uma crise de ansiedade, também chamada de crise de pânico. O exame de hoje não mostrou sinal de doença grave.\n- A crise assusta, mas não causa dano ao corpo e costuma passar em 5 a 20 minutos.\n- Na próxima crise, sente-se e respire devagar: puxe o ar pelo nariz contando até 5 e solte pela boca contando até 5, por pelo menos 5 minutos. Não respire dentro de saco de papel.\n- Evite café, energético, bebida alcoólica e outras drogas, que pioram as crises.\n- Procure a Unidade Básica de Saúde para acompanhamento. Psicoterapia e, se necessário, remédio de uso contínuo tratam as crises.\n- Se tiver pensamentos de se machucar ou de tirar a própria vida, procure ajuda na hora: ligue para o CVV no 188 (gratuito, 24 horas) ou venha ao pronto-socorro.",
  "rev": [
   "Corrigido (2026-10-29): o aviso de sono do clonazepam fica na linha do remédio (só aparece quando ele é receitado), não nas orientações gerais.",
   "Decidido pelo médico (2026-10-27): clonazepam 0,5 mg (1/2 cp de 12/12h por até 7 dias) como bloco opcional desligado, só para crises frequentes e incapacitantes até a consulta, com Notificação de Receita B e o aviso de que a NICE CG113 desaconselha (bula Rivotril; Portaria 344/98).",
   "Corrigido (2026-10-26): diferencial orgânico na porta (SCA, TEP, arritmia, hipoglicemia, tireotoxicose, asma, abstinência, estimulantes), técnica de respiração sem saco de papel, rastreio de ideação suicida (ASQ), CAPS e CVV 188; mantido: sem benzodiazepínico para casa (NICE CG113 1.3.20). Conferência independente (.rascunhos/panico-retencao-conferencia.md) aplicada.",
   "Corrigido (2026-10-17): passiflora retirada (sem fonte que sustente; Cochrane 2007 sem dados suficientes); diazepam 5–10 mg → 5 mg em dose única, sem receita para casa e com alerta no idoso; CID do pânico na orientação; fontes no lugar de \"consenso clínico\" (NICE CG113; Beers 2023; Katon 2006).",
   "Corrigido: diazepam IM tem absorção errática; trocado por VO."
  ],
  "evid": "Benzodiazepínico não trata o pânico (NICE CG113 1.3.20): na unidade, dose única; para casa, só como opção curta e excepcional, decidida pelo médico. O tratamento é TCC e, se necessário, antidepressivo.",
  "fontes": [
   "NICE CG113. Generalised anxiety disorder and panic disorder in adults: management, 2011 (atualizada em 15/06/2020): 1.3.6 — crise de pânico no pronto-socorro: perguntar se já trata, só os exames mínimos para excluir causa física aguda, em geral sem internação, encaminhar à atenção primária com informação escrita sobre a crise e fontes de apoio; 1.3.20 — benzodiazepínico tem pior desfecho a longo prazo e não deve ser prescrito no transtorno de pânico; 1.2.26 — na ansiedade generalizada, só como medida curta na crise. https://www.nice.org.uk/guidance/cg113/chapter/Recommendations",
   "Katon WJ. Clinical practice: panic disorder (N Engl J Med 2006;354:2360-7) — diagnóstico diferencial clínico (doença cardíaca e pulmonar, arritmia, hipertireoidismo, hipoglicemia, feocromocitoma, abstinência e estimulantes). https://doi.org/10.1056/NEJMcp052466",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 463 — Psychiatric Disorders, Panic disorder: crises recorrentes e inesperadas com palpitação, sudorese, tremor, dispneia, dor torácica, tontura e medo de morrer; tratamento com TCC e antidepressivo (lido no PDF local; não copiado).",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 60, Emergências neuropsiquiátricas: avaliação do risco de suicídio pelos fatores de risco e proteção, critérios de internação (ideação ou plano, transtorno grave, baixo suporte, tentativa grave), alta com responsável e meios letais guardados.",
   "Callaham M. Hypoxic hazards of traditional paper bag rebreathing in hyperventilating patients (Ann Emerg Med 1989;18:622-8): queda de PO2 com o saco de papel e mortes quando aplicado a pacientes hipoxêmicos ou em isquemia miocárdica. https://doi.org/10.1016/s0196-0644(89)80515-3",
   "NHS. Breathing exercises for stress (revisado em 12/06/2026): respirar pelo nariz e soltar pela boca, contando de 1 a 5 na entrada e na saída, por pelo menos 5 minutos. https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/",
   "NHS. Panic disorder (revisado em 22/08/2023): a crise costuma durar 5 a 20 minutos, assusta mas não causa dano físico; tratamento com terapia (TCC) e remédio. https://www.nhs.uk/mental-health/conditions/panic-disorder/",
   "Horowitz LM et al. Validation of the Ask Suicide-Screening Questions for Adult Medical Inpatients: A Brief Tool for All Ages (Psychosomatics 2020;61:713-722) e NIMH ASQ Toolkit: 4 perguntas diretas e, se alguma positiva, pergunta sobre ideação atual. https://doi.org/10.1016/j.psym.2020.04.008",
   "Brasil. Portaria GM/MS nº 3.088/2011 (Rede de Atenção Psicossocial, consolidada na Portaria de Consolidação nº 3/2017): CAPS para sofrimento psíquico grave e persistente e uso de álcool e drogas; atenção básica como porta de entrada. https://bvsms.saude.gov.br/bvs/saudelegis/gm/2011/prt3088_23_12_2011_rep.html",
   "CVV — Centro de Valorização da Vida: 188, ligação gratuita, 24 horas, em todo o Brasil (acordo com o Ministério da Saúde). https://cvv.org.br/",
   "Wolf SJ et al. ACEP Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the ED With Suspected Acute Venous Thromboembolic Disease (Ann Emerg Med 2018;71(5):e59-e109): PERC no baixo risco; D-dímero e angio-TC conforme a probabilidade. https://doi.org/10.1016/j.annemergmed.2018.03.006",
   "Gulati M et al. 2021 AHA/ACC Guideline for the Evaluation and Diagnosis of Chest Pain (Circulation 2021;144(22):e368-e454): ECG em até 10 min na dor torácica. https://doi.org/10.1161/CIR.0000000000001029",
   "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): evitar benzodiazepínico no idoso.",
   "Bula Anvisa do Rivotril (clonazepam 0,5 mg e 2 mg, Roche, 15/04/2025): transtorno do pânico no adulto, dose inicial 0,5 mg/dia em 2 tomadas; sonolência (não dirigir nem operar máquinas); não usar com álcool ou outros depressores do sistema nervoso central (sedação grave, coma ou morte); contraindicado na insuficiência respiratória grave, no comprometimento hepático grave, na apneia do sono (no pânico) e no glaucoma agudo de ângulo fechado. https://consultaremedios.com.br/rivotril/bula",
   "Ministério da Saúde/SVS. Portaria nº 344, de 12/05/1998 (lista B1, psicotrópicos, com atualizações da Anvisa): clonazepam com Notificação de Receita B, validade de 30 dias. https://bvsms.saude.gov.br/bvs/saudelegis/svs/1998/prt0344_12_05_1998_rep.html",
   "Miyasaka LS et al. Passiflora for anxiety disorder (Cochrane 2007;CD004518): evidência insuficiente — motivo da retirada da passiflora."
  ]
 },
 {
  "id": "gripe",
  "nome": "Síndrome gripal / Resfriado comum",
  "cat": "resp",
  "cid": "J11.1",
  "sin": "gripe resfriado coriza tosse influenza covid",
  "casa": "Uso oral\n1) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se febre ou dor.\n2) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\nOu (cetoprofeno)\n2) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (naproxeno)\n2) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (diclofenaco)\n2) Diclofenaco de sódio 50mg ----------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n\nUso nasal\n3) Soro fisiológico 0,9% (frasco de 500 mL) --- 5 fr\nAplicar 50 mL com seringa em cada narina 4x ao dia (spray: 2 jatos em cada narina).\n\n# Oseltamivir: síndrome gripal em grupo de risco\nUso oral\n4) Oseltamivir 75mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\n\n# Corticoide nasal (opcional): congestão por mais de 10 dias ou rinite alérgica associada\nUso nasal\n5) Propionato de fluticasona 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, por 14 dias.\nOu (mometasona)\n5) Furoato de mometasona 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, por 14 dias.\nOu (budesonida 64 mcg)\n5) Budesonida 64mcg spray nasal -------------- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, por 14 dias.\nOu (budesonida 32 mcg)\n5) Budesonida 32mcg spray nasal --- 1 fr\nAplicar 4 jatos em cada narina 1x ao dia, pela manhã, por 14 dias.\nOu (budesonida 50 mcg)\n5) Budesonida 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina de 12/12h, por 14 dias.\n\n# Descongestionante oral (opcional): congestão nasal intensa, por até 5 dias\nUso oral\n6) Fexofenadina 60mg + Pseudoefedrina 120mg --- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.\nOu (loratadina + pseudoefedrina)\n6) Loratadina 5mg + Pseudoefedrina 120mg ----- 10 cp\nTomar 1 cp VO de 12/12h por 5 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Febre com mialgia, cefaleia, dor retro-orbitária ou exantema em área de dengue (ou viagem em 14 dias): sem ibuprofeno nem AAS (MS, Dengue 2024, 6.1.2).","Nesse caso, só dipirona ou paracetamol até descartar dengue.","Grupo de risco tratado em casa: retorno em 48 h (Guia de Manejo e Tratamento de Influenza 2023).","CID resfriado: J00.","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida fica de fora: contraindicada com febre ou sintomas gripais (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Corticoide nasal no resfriado: sem benefício (Cochrane 2015; EPOS 2020 contra). Só se > 10 dias (pós-viral) ou rinite alérgica associada.","Pseudoefedrina: não usar na HAS grave ou não controlada, coronariopatia ou IC, glaucoma de ângulo fechado, HPB/retenção, hipertireoidismo, IMAO (14 dias).","Pseudoefedrina: evitar na gestação, lactação, doença renal grave, diabetes e arritmia; risco de PRES e vasoconstrição cerebral (EMA 2024).","Pseudoefedrina na insuficiência renal: iniciar com 1 cp 1x ao dia (bula Allegra D); doença renal grave: contraindicada (EMA 2024).","Oseltamivir: grupo de risco (≥ 60 anos, gestante ou puérpera, comorbidades, imunossupressão), de preferência até 48 h do início (MS 2023)."],
  "unidade": "1) Dipirona 1 g (2 mL): EV lenta diluída em 10–20 mL de SF/AD ou IM profunda, se febre ou dor. Suspeita de dengue: só EV (evitar IM) e ver Dengue (prova do laço, hemograma).\n2) Medir SpO2, FR, PA e FC (na gestante, FR > 20 ou FC > 100 já são sinais de alarme). SRAG = síndrome gripal com dispneia ou SpO2 ≤ 94% em ar ambiente, desconforto respiratório ou FR aumentada, piora da doença de base ou hipotensão:\n   Internar, oxigênio se necessário, hidratação EV e RX de tórax; oseltamivir 75 mg VO já na unidade, mesmo após 48 h. Choque, disfunção de órgão ou insuficiência respiratória: UTI.\n3) Síndrome gripal com fator de risco (≥ 60 anos; gestante em qualquer fase ou puérpera até 2 semanas; pneumopatia, inclusive asma; tuberculose; cardiopatia, exceto hipertensão isolada; doença renal, hepática ou hematológica, inclusive anemia falciforme; diabetes; doença neurológica que comprometa a respiração; imunossupressão; obesidade com IMC ≥ 40; indígena aldeado ou com dificuldade de acesso): Oseltamivir 75 mg VO, 1ª dose na unidade.\n   ClCr > 30–60: 30 mg de 12/12h; > 10–30: 30 mg 1x/dia; hemodiálise: 30 mg após cada sessão.\n4) Desidratação ou vômitos: hidratação EV com SF 0,9%.\n5) Notificar: SRAG hospitalizada no Sivep-Gripe (obrigatória); síndrome gripal suspeita de covid-19 no e-SUS Notifica. Na SRAG, coletar secreção respiratória, de preferência antes do oseltamivir, sem atrasá-lo. Na síndrome gripal, teste para covid-19 e influenza conforme a disponibilidade da unidade.",
  "orient": "- Faça repouso e beba bastante líquido.\n- Volte imediatamente ao pronto-socorro se tiver falta de ar, oxigenação baixa, dor no peito ou se a febre piorar depois de ter melhorado.\n- Se tiver febre com dor no corpo, dor de cabeça, dor atrás dos olhos ou manchas na pele, não tome ibuprofeno nem AAS (aspirina) até que a dengue seja descartada; nesse caso, use só dipirona ou paracetamol.",
  "rev": [
   "Corrigido (2026-10-29): retirada das orientações a frase sobre grupo de risco tratado em casa com reavaliação em 48 h, por decisão do médico.",
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-27): corticoide nasal e descongestionante oral (anti-histamínico + pseudoefedrina) como opções desligadas, por decisão do médico; conferência independente (bulas Anvisa, EPOS 2020, EMA 2024).",
   "Corrigido (2026-10-17): loratadina removida (sem benefício no resfriado, Cochrane 2015); título do guia de influenza corrigido (MS, Guia de Manejo e Tratamento de Influenza 2023).",
   "Corrigido (2026-10-09): não usar ibuprofeno na febre com dengue não descartada (MS, Dengue 2024).",
   "Adicionado: oseltamivir para grupo de risco (protocolo MS).",
   "Removido: budesonida nasal por 15 dias (sem benefício no resfriado)."
  ],
  "fontes": [
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: caso suspeito (item 10.1); não usar salicilatos, anti-inflamatórios nem corticoides e orientar a não se automedicar (item 6.1.2); só dipirona e paracetamol (apêndice H). https://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_6ed.pdf",
   "Ministério da Saúde. Guia de Manejo e Tratamento de Influenza 2023: oseltamivir 75 mg de 12/12h por 5 dias na síndrome gripal com condição de risco, de preferência nas primeiras 48 h; retorno em 48 h; ajuste renal. https://bvsms.saude.gov.br/bvs/publicacoes/guia_manejo_tratamento_influenza_2023.pdf",
   "De Sutter AI et al. Antihistamines for the common cold (Cochrane Database Syst Rev 2015;(11):CD009345): anti-histamínico isolado sem efeito clinicamente relevante na obstrução, coriza ou espirros.",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Head K et al. Saline irrigation for allergic rhinitis. Cochrane Database Syst Rev 2018;6:CD012597 (volumes estudados de 5 mL a 1.000 mL/dia; benefício nos sintomas). https://pubmed.ncbi.nlm.nih.gov/29932206/",
   "Fokkens WJ et al. European Position Paper on Rhinosinusitis and Nasal Polyps 2020 (EPOS 2020). Rhinology 2020;58(Suppl S29):1–464 (irrigação salina na rinossinusite aguda viral, pós-viral e bacteriana). https://doi.org/10.4193/Rhin20.600",
   "King D et al. Saline nasal irrigation for acute upper respiratory tract infections. Cochrane Database Syst Rev 2015;(4):CD006821. https://doi.org/10.1002/14651858.CD006821.pub3",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc",
   "Bula Anvisa do Flixonase (propionato de fluticasona 50 mcg/dose, spray nasal aquoso; GlaxoSmithKline Brasil, atualizada em 16/08/2019): adulto 2 doses em cada narina 1x ao dia, de preferência pela manhã (às vezes 12/12h); máximo 4 doses em cada narina por dia; frascos de 60 e 120 doses. https://www.bulas.med.br/p/bula/5175/flixonase.htm",
   "Bula Anvisa do Nasonex (furoato de mometasona 50 mcg/acionamento, spray nasal; Organon, bula do paciente aprovada em 28/04/2026): rinite alérgica no adulto 2 jatos em cada narina 1x ao dia (200 mcg), máximo 400 mcg; rinossinusite aguda (12 anos ou mais) 2 jatos em cada narina 2x ao dia (400 mcg); preparo inicial de 10 acionamentos; frascos de 60 e 120 acionamentos. https://www.organon.com/brazil/wp-content/uploads/sites/33/2023/06/nasonex_bula_paciente.pdf",
   "Bula Anvisa do Budecort Aqua (budesonida 32 e 64 mcg/dose, spray nasal; AstraZeneca, atualizada em 01/03/2021): rinite no adulto 256 mcg/dia (2 jatos de 64 mcg ou 4 jatos de 32 mcg em cada narina), 1x ao dia pela manhã ou dividido em 2 tomadas; frasco de 120 doses. https://www.bulas.med.br/p/detalhamento-das-bulas/1160134/posologia-e-modo-de-usar-budecort-aqua.htm",
   "Bula Anvisa do Busonid spray nasal aquoso (budesonida 50 e 100 mcg/dose; Biosintética/Aché, atualizada em 21/05/2020): adultos e maiores de 6 anos com 50 mcg, 2 jatos em cada narina 2x ao dia ou 4 jatos em cada narina pela manhã (400 mcg/dia); máximo 400 mcg/dia; frascos de 60 e 120 doses. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/1367728/busonid-spray-nasal.htm",
   "Fokkens WJ et al. EPOS 2020 (Rhinology 2020;58 Suppl S29): na rinossinusite aguda viral (resfriado) recomenda contra corticoide nasal (1a) e admite descongestionante nasal; na pós-viral (sintomas > 10 dias ou piora após 5 dias), corticoide nasal opcional no adulto (1a). https://doi.org/10.4193/Rhin20.600",
   "Hayward G et al. Intranasal corticosteroids for the common cold. Cochrane Database Syst Rev 2015;(10):CD008116 (sem benefício sintomático do corticoide nasal no resfriado). https://www.cochrane.org/CD008116/ARI_steroids-common-cold",
   "Bula Anvisa do Allegra D (cloridrato de fexofenadina 60 mg + cloridrato de pseudoefedrina 120 mg de liberação prolongada; Sanofi, aprovada em 18/01/2013): maiores de 12 anos e adultos, 1 cp 2x ao dia, sem partir nem mastigar; insuficiência renal: dose inicial de 1 cp 1x ao dia; evitar refeição rica em gordura; contraindicado na hipertensão grave, coronariopatia grave, glaucoma de ângulo estreito, retenção urinária e com IMAO (até 14 dias); cautela no diabetes, hipertireoidismo, hipertrofia prostática e doença renal; evitar na gestação e lactação; caixas com 6 e 10 cp. https://www.saudedireta.com.br/catinc/drugs/bulas/allegrad.pdf",
   "Bula Anvisa de loratadina 5 mg + sulfato de pseudoefedrina 120 mg comprimido (Loranil D, Libbs, bula de 2008): maiores de 12 anos e adultos, 1 cp a cada 12 horas; caixa com 6 cp; contraindicado na hipertensão acentuada, insuficiência cardíaca, coronariopatia grave, IMAO (até 14 dias), hipertrofia prostática, glaucoma, diabetes e hipertireoidismo. https://www.saudedireta.com.br/catinc/drugs/bulas/loranild.pdf",
   "De Sutter AI et al. Oral antihistamine-decongestant-analgesic combinations for the common cold. Cochrane Database Syst Rev 2022;1:CD004976 (anti-histamínico + descongestionante: algum benefício global no adulto, evidência limitada). https://www.cochrane.org/CD004976",
   "EMA/PRAC 2024, comunicado aos profissionais (DHPC) sobre pseudoefedrina: risco de síndrome de encefalopatia posterior reversível (PRES) e de vasoconstrição cerebral reversível (SVCR); contraindicada na hipertensão grave ou não controlada e na doença renal aguda ou crônica grave; suspender se cefaleia súbita intensa, náusea, vômitos, confusão, convulsão ou alteração visual. https://www.ema.europa.eu/en/documents/dhpc/direct-healthcare-professional-communication-dhpc-pseudoephedrine-risks-posterior-reversible-encephalopathy-syndrome-pres-reversible-cerebral-vasoconstriction-syndrome-rcvs_en.pdf",
   "Bula Anvisa da Novalgina solução injetável (dipirona 500 mg/mL, Sanofi): IM ou EV 1–2,5 g em dose única, máximo 5 g/dia; EV lenta, no máximo 1 mL (500 mg)/min, com o paciente deitado. https://consultas.anvisa.gov.br/#/bulario/",
   "Ministério da Saúde. Guia de Manejo e Tratamento de Influenza 2023: definições de síndrome gripal e de SRAG (dispneia, SpO2 ≤ 94% em ar ambiente, desconforto respiratório ou FR aumentada, piora da doença de base, hipotensão), sinais de agravamento, fatores de risco (p. 18: inclui tuberculose, doença hematológica e neurológica; cardiopatia exceto hipertensão isolada; indígena aldeado ou com dificuldade de acesso), sinais de alarme na gestante (FR > 20, FC > 100; p. 20), coleta de secreção na SRAG sem atrasar o antiviral (p. 19), oseltamivir em toda SRAG e na SG com fator de risco (benefício mesmo após 48 h na SRAG), internação na SRAG, ajuste renal (ClCr > 30–60: 30 mg de 12/12h; > 10–30: 30 mg 1x/dia; hemodiálise: 30 mg após cada sessão), notificação de SRAG hospitalizada no Sivep-Gripe e de SG suspeita de covid-19 no e-SUS Notifica (anexo C). https://bvsms.saude.gov.br/bvs/publicacoes/guia_manejo_tratamento_influenza_2023.pdf"
  ]
 },
 {
  "id": "sinusite",
  "nome": "Rinossinusite aguda bacteriana",
  "cat": "orl",
  "cid": "J01.9",
  "sin": "sinusite dor face secrecao nasal",
  "casa": "# Rinossinusite bacteriana\nUso oral\n1) Amoxicilina 875mg ------------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\nOu\n1) Amoxicilina 500mg ------------------------- 21 cp\nTomar 1 cp VO de 8/8h por 7 dias.\nOu (ATB recente, > 65 anos ou comorbidades)\n1) Amoxicilina + Clavulanato 875/125mg ------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias.\nOu (alergia a penicilina)\n1) Doxiciclina 100mg ------------------------- 14 cp\nTomar 1 cp VO de 12/12h por 7 dias, com bastante água e sem deitar logo depois.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n\nUso nasal\n3) Budesonida 64mcg spray nasal -------------- 1 fr\nAplicar 2 jatos em cada narina pela manhã por 15 dias.\n4) Soro fisiológico 0,9% (frasco de 500 mL) --- 5 fr\nLavar cada narina com 50 mL com seringa 4x ao dia.\n\n# Outro corticoide nasal (opcional): no lugar da budesonida 64 mcg\nUso nasal\n5) Propionato de fluticasona 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, por 15 dias.\nOu (mometasona)\n5) Furoato de mometasona 50mcg spray nasal --- 2 fr\nAplicar 2 jatos em cada narina de 12/12h, por 15 dias.\nOu (budesonida 32 mcg)\n5) Budesonida 32mcg spray nasal --- 2 fr\nAplicar 4 jatos em cada narina 1x ao dia, pela manhã, por 15 dias.\nOu (budesonida 50 mcg)\n5) Budesonida 50mcg spray nasal --- 2 fr\nAplicar 2 jatos em cada narina de 12/12h, por 15 dias.",
  "avisoRx": ["Não complicada: oferecer observação sem antibiótico se o retorno estiver garantido; iniciar se piorar ou não melhorar em 7 dias.","Outro corticoide nasal: ao marcar, tirar a budesonida do item 3 (sem). Descongestionante fica de fora: IDSA 2012 contra como adjuvante.","Antibiótico só se: sintomas > 10 dias sem melhora, dupla piora ou início grave (febre ≥ 39 °C com secreção purulenta ou dor facial por 3 a 4 dias) (IDSA 2012)."],
  "unidade": "1) Dipirona 1 g (2 mL): IM profunda ou EV lenta diluída em 10–20 mL de SF/AD, se dor ou febre.\n2) Afastar complicação orbitária ou intracraniana: edema ou vermelhidão ao redor do olho, olho deslocado, visão dupla, dor ou limitação ao mover o olho, baixa da visão, cefaleia frontal intensa, inchaço na testa, rigidez de nuca, confusão ou déficit neurológico → tomografia com contraste, otorrino e internação.\n3) Sem sinais de complicação: não pedir exame de imagem (o diagnóstico é clínico).",
  "orient": "- Resfriados com menos de 10 dias de sintomas são causados por vírus e não precisam de antibiótico.\n- Se o médico optou por observar sem antibiótico, volte para reavaliação se piorar ou se não melhorar em 7 dias.\n- Volte imediatamente ao pronto-socorro se tiver inchaço ou vermelhidão ao redor do olho, alteração da visão ou dor de cabeça forte.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-27): corticoide nasal alternativo como opção desligada; conferência independente (bula Nasonex, EPOS 2020).",
   "Corrigido (2026-10-17): oferecer observação sem antibiótico como 1ª opção na bacteriana não complicada com retorno garantido; início grave por 3 a 4 dias seguidos (era ≥ 3 dias); doxiciclina 100 mg de 12/12h por 7 dias para alergia a penicilina (AAO-HNSF 2025; IDSA 2012).",
   "Adicionado: critérios para antibiótico.",
   "Ajustado: amoxicilina simples como 1ª linha; clavulanato em risco.",
   "Removido: prednisona de rotina e loratadina (sem benefício na sinusite bacteriana).",
   "Adicionado: amoxicilina 875 mg de 12/12h (AAO-HNS 2015 lista 500 mg 8/8h ou 875 mg 12/12h)."
  ],
  "fontes": [
   "Chow AW et al. IDSA Clinical Practice Guideline for Acute Bacterial Rhinosinusitis in Children and Adults (Clin Infect Dis 2012;54:e72): critérios de início (≥ 10 dias, grave por 3–4 dias, dupla piora); 5–7 dias no adulto; doxiciclina ou quinolona se alergia; macrolídeo não recomendado.",
   "AAO-HNSF. Clinical Practice Guideline: Adult Sinusitis Update (Otolaryngol Head Neck Surg 2025;173 Suppl 1:S1–S56; doi 10.1002/ohn.1344): observação sem antibiótico na bacteriana não complicada com retorno garantido; se antibiótico, amoxicilina com ou sem clavulanato por 5–7 dias; reavaliar se piora ou sem melhora em 3–5 dias.",
   "Bula FDA doxiciclina (DailyMed): tomar com bastante líquido (esofagite e úlcera esofágica); IDSA 2012: 100 mg de 12/12h na rinossinusite do adulto alérgico a penicilina.",
   "Fokkens WJ et al. European Position Paper on Rhinosinusitis and Nasal Polyps 2020 (EPOS 2020). Rhinology 2020;58(Suppl S29):1–464 (irrigação salina na rinossinusite aguda viral, pós-viral e bacteriana). https://doi.org/10.4193/Rhin20.600",
   "Bula Anvisa do Flixonase (propionato de fluticasona 50 mcg/dose, spray nasal aquoso; GlaxoSmithKline Brasil, atualizada em 16/08/2019): adulto 2 doses em cada narina 1x ao dia, de preferência pela manhã (às vezes 12/12h); máximo 4 doses em cada narina por dia; frascos de 60 e 120 doses. https://www.bulas.med.br/p/bula/5175/flixonase.htm",
   "Bula Anvisa do Nasonex (furoato de mometasona 50 mcg/acionamento, spray nasal; Organon, bula do paciente aprovada em 28/04/2026): rinite alérgica no adulto 2 jatos em cada narina 1x ao dia (200 mcg), máximo 400 mcg; rinossinusite aguda (12 anos ou mais) 2 jatos em cada narina 2x ao dia (400 mcg); preparo inicial de 10 acionamentos; frascos de 60 e 120 acionamentos. https://www.organon.com/brazil/wp-content/uploads/sites/33/2023/06/nasonex_bula_paciente.pdf",
   "Bula Anvisa do Budecort Aqua (budesonida 32 e 64 mcg/dose, spray nasal; AstraZeneca, atualizada em 01/03/2021): rinite no adulto 256 mcg/dia (2 jatos de 64 mcg ou 4 jatos de 32 mcg em cada narina), 1x ao dia pela manhã ou dividido em 2 tomadas; frasco de 120 doses. https://www.bulas.med.br/p/detalhamento-das-bulas/1160134/posologia-e-modo-de-usar-budecort-aqua.htm",
   "Bula Anvisa do Busonid spray nasal aquoso (budesonida 50 e 100 mcg/dose; Biosintética/Aché, atualizada em 21/05/2020): adultos e maiores de 6 anos com 50 mcg, 2 jatos em cada narina 2x ao dia ou 4 jatos em cada narina pela manhã (400 mcg/dia); máximo 400 mcg/dia; frascos de 60 e 120 doses. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/1367728/busonid-spray-nasal.htm",
   "AAO-HNSF. Clinical Practice Guideline: Adult Sinusitis Update (Otolaryngol Head Neck Surg 2025;173 Suppl 1:S1–S56; doi 10.1002/ohn.1344): pode recomendar analgésico, corticoide nasal e lavagem nasal para alívio na rinossinusite viral e na bacteriana. https://doi.org/10.1002/ohn.1344",
   "Bula Anvisa da Novalgina solução injetável (dipirona 500 mg/mL, Sanofi): IM ou EV 1–2,5 g em dose única, máximo 5 g/dia; EV lenta, no máximo 1 mL (500 mg)/min, com o paciente deitado. https://consultas.anvisa.gov.br/#/bulario/",
   "Fokkens WJ et al. EPOS 2020 (Rhinology 2020;58 Suppl S29): sinais de alarme da rinossinusite aguda (edema ou eritema periorbitário, deslocamento do globo, diplopia, oftalmoplegia, baixa da acuidade visual, cefaleia frontal intensa, edema frontal, sinais de meningite ou neurológicos focais) com encaminhamento imediato e imagem. https://doi.org/10.4193/Rhin20.600"
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
  "unidade": "1) Exame especular: corrimento branco-acinzentado, homogêneo e com odor; pH vaginal > 4,5 e teste das aminas (KOH 10%) positivo confirmam (3 de 4 critérios de Amsel).\n2) Dor à mobilização do colo, secreção mucopurulenta no colo ou sangramento ao toque: tratar cervicite (ver Cervicite); dor pélvica com febre: pensar em DIP.\n3) Oferecer na unidade os testes rápidos de HIV, sífilis e hepatites B e C.\n4) Gestante: tratar (o mesmo esquema).\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Não tome bebida alcoólica durante o tratamento e até 3 dias depois do fim (vale também para o gel).\n- Na gestação ou na amamentação, o tratamento é o mesmo (comprimido ou gel).\n- O parceiro não precisa ser tratado.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): link do PCDT 2022; álcool até 3 dias, como a ficha; gestante e lactante com o mesmo esquema (PCDT IST 2022, quadro 34; bula FDA do metronidazol).",
   "Corrigido: oral e vaginal são alternativas ('ou'), não associação.",
   "Ajustado: abstinência alcoólica 24 → 48h."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 — quadro 34, vaginose bacteriana (metronidazol VO por 7 dias ou gel vaginal por 5 noites, inclusive na gestação e na lactação; clindamicina como 2ª opção; parceria não tratada). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf",
   "Workowski KA et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR Recomm Rep 2021;70(4):1) — vaginose bacteriana.",
   "Bula FDA do metronidazol — álcool contraindicado durante o uso e até 3 dias depois.",
   "Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022 — quadro 28 (exame especular, pH vaginal, teste das aminas com KOH 10%), fluxograma do corrimento vaginal (pH > 4,5 e/ou KOH positivo: vaginose ou tricomoníase; pH < 4,5: candidíase; cervicite e DIP se dor à mobilização do colo ou secreção mucopurulenta), critérios de Amsel, candidíase recorrente (4 ou mais episódios/ano; investigar diabetes e imunodepressão) e orientações gerais (testagem para HIV, sífilis e hepatites B e C). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf"
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
  "unidade": "1) Exame especular: corrimento grumoso, sem odor, com vermelhidão e edema vulvar; pH vaginal < 4,5.\n2) Dor à mobilização do colo ou secreção mucopurulenta no colo: tratar cervicite (ver Cervicite).\n3) Quatro ou mais episódios por ano (recorrente): glicemia capilar e investigar diabetes e imunodepressão (inclusive HIV); encaminhar ao ginecologista.\n4) Oferecer na unidade os testes rápidos de HIV, sífilis e hepatites B e C.\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Na gestação ou na amamentação, use somente o creme vaginal (não use fluconazol).\n- O parceiro só precisa de tratamento se tiver sintomas.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): link do PCDT 2022; restrição do fluconazol também na lactação (PCDT IST 2022, quadro 33).",
   "Adicionado: item novo (não havia no modelo)."
  ],
  "fontes": [
   "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 — quadro 33, candidíase vulvovaginal (miconazol vaginal por 7 noites ou nistatina por 14 noites; fluconazol 150 mg dose única como 2ª opção; recorrente; gestante e lactante só via vaginal). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf",
   "Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022 — quadro 28 (exame especular, pH vaginal, teste das aminas com KOH 10%), fluxograma do corrimento vaginal (pH > 4,5 e/ou KOH positivo: vaginose ou tricomoníase; pH < 4,5: candidíase; cervicite e DIP se dor à mobilização do colo ou secreção mucopurulenta), critérios de Amsel, candidíase recorrente (4 ou mais episódios/ano; investigar diabetes e imunodepressão) e orientações gerais (testagem para HIV, sífilis e hepatites B e C). https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_atecao_integral_ist.pdf"
  ]
 },
 {
  "id": "verminose",
  "nome": "Verminose — amplo espectro",
  "cat": "gi",
  "cid": "B82.9",
  "sin": "verme parasitose",
  "casa": "Uso oral\n1) Albendazol 400mg -------------------------- 1 cp\nTomar 1 cp VO em dose única.\nOu\n1) Mebendazol 100mg -------------------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias.\nOu\n1) Nitazoxanida 500mg (Annita) --------------- 6 cp\nTomar 1 cp VO de 12/12h por 3 dias, com alimento.\n\n# Estrongiloidíase (ou corticoide/imunossupressão com suspeita):\n1) Ivermectina 6mg --------------------------- (conforme o peso)\nTomar 200 mcg/kg VO 1x ao dia por 2 dias, em jejum, com água: 15–24 kg ½ cp; 25–35 kg 1 cp; 36–50 kg 1½ cp; 51–65 kg 2 cp; 66–79 kg 2½ cp; 80 kg ou mais 200 mcg/kg.",
  "avisoRx": ["Escolher um dos esquemas.","Ivermectina: não usar abaixo de 15 kg ou de 5 anos (bula).","Sem ivermectina: albendazol 400 mg 1x ao dia por 3 dias, menos eficaz.","Gestante: sem albendazol, mebendazol nem ivermectina (bula; Harrison cap. 239); adiar para após o parto, salvo indicação do pré-natal.","Albendazol em dose única: áscaris, ancilóstomo e tricuríase."],
  "unidade": "1) Afastar complicação: dor abdominal em cólica com vômitos e distensão (obstrução por áscaris, sobretudo em criança), icterícia ou dor em hipocôndrio direito (áscaris na via biliar) → ver Dor abdominal e cirurgia.\n2) Palidez e cansaço (ancilostomíase): hemograma.\n3) Usuário de corticoide, imunossuprimido ou com HTLV, com febre, dor abdominal, diarreia, tosse ou lesões de pele: pensar em hiperinfecção por Strongyloides → internar.\n4) Gestante: não usar albendazol, mebendazol nem ivermectina; tratar depois do parto, salvo orientação do pré-natal.\n* Não há medicação de rotina na unidade; o tratamento é domiciliar.",
  "orient": "- Lave bem as mãos e os alimentos e beba água filtrada.\n- Na gestação, não use albendazol, mebendazol nem ivermectina; o tratamento fica para depois do parto, salvo orientação do pré-natal.",
  "rev": [
   "Corrigido (2026-10-27): campo Na unidade redigido (estava vazio), a pedido do médico; conferência independente.",
   "Corrigido (2026-10-17): estrongiloidíase com ivermectina 200 mcg/kg por 2 dias, pela tabela de peso da bula, e albendazol de 3 dias como alternativa (Harrison 22ª ed., cap. 239; bula Revectina); teníase retirada do albendazol (praziquantel, cap. 242, sem ficha); gestante não usa albendazol nem mebendazol (bula Zentel); fontes identificadas (Harrison, OMS 2017, bulas).",
   "Corrigido: mebendazol e tiabendazol estavam prescritos juntos; ficou uma opção por vez.",
   "Removido: tiabendazol oral (muitos efeitos adversos; albendazol/ivermectina são preferíveis)."
  ],
  "fontes": [
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 239 (Intestinal Nematode Infections): albendazol 400 mg dose única ou mebendazol 100 mg de 12/12h por 3 dias; estrongiloidíase com ivermectina 200 mcg/kg/dia por 2 dias; benzimidazóis contraindicados na gestação.",
   "World Health Organization. Guideline: preventive chemotherapy to control soil-transmitted helminth infections in at-risk population groups. Geneva: WHO, 2017. https://www.who.int/publications/i/item/9789241550116",
   "Bula Zentel (albendazol, GSK, Anvisa) e bula Annita (nitazoxanida, Farmoquímica, Anvisa).",
   "Bula Revectina (ivermectina 6 mg, Anvisa): cerca de 200 mcg/kg em dose oral única na estrongiloidíase, com tabela de peso (15–24 kg ½ cp; 25–35 kg 1 cp; 36–50 kg 1½; 51–65 kg 2; 66–79 kg 2½; 80 kg ou mais 200 mcg/kg); não usar em menores de 15 kg ou de 5 anos; exame de fezes para confirmar a cura. O esquema de 2 dias é do Harrison.",
   "FDA. Stromectol (ivermectina), bula americana: tomar em jejum, com água.",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 239 — Intestinal Nematode Infections (obstrução intestinal por áscaris; hiperinfecção por Strongyloides com corticoide ou imunossupressão)."
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
  "id": "pericardite",
  "nome": "Pericardite aguda",
  "cat": "cardio",
  "cid": "I30.9",
  "sin": "pericardite pericardio dor pleuritica dor que melhora inclinado para frente atrito pericardico supra difuso infra de pr miopericardite derrame pericardico",
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 42 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 14 dias.\nOu (AAS: doença coronária ou já usa AAS)\n1) Ácido acetilsalicílico 500mg -------------- 84 cp\nTomar 2 cp VO de 8/8h, após as refeições, por 14 dias.\n2) Colchicina 0,5mg -------------------------- 180 cp\nTomar 1 cp VO de 12/12h por 3 meses, todos os dias, mesmo sem dor.\nOu (colchicina: peso abaixo de 70 kg)\n2) Colchicina 0,5mg -------------------------- 90 cp\nTomar 1 cp VO 1 vez ao dia por 3 meses, todos os dias, mesmo sem dor.\n3) Omeprazol 20mg ---------------------------- 14 cápsulas\nTomar 1 cápsula VO 1 vez ao dia, em jejum, 30 minutos antes do café da manhã, por 14 dias, enquanto tomar o anti-inflamatório.",
  "avisoRx": ["AAS ou AINE só após descartar dengue; não usar com úlcera ativa ou sangramento. Doença renal moderada a grave: reduzir a dose ou usar corticoide (ESC 2025).","Gestação: AINE só até 20 semanas (ESC 2025); anticoagulante oral: preferir corticoide. Nos dois casos, discutir com a cardiologia.","AAS é a escolha se doença coronária ou se já usa AAS (ESC 2025). Idoso: mais risco de sangramento com AAS ou ibuprofeno; protetor gástrico sempre.","Receita só com a dose cheia (14 dias). Desmame no retorno, guiado pela PCR e sintomas (ESC 2025: ibuprofeno −200 mg, AAS −250 mg a cada 1–2 semanas).","Colchicina na pericardite é uso fora da bula (bula: gota). A bula contraindica na gestação; a ESC 2025 admite com cautela (classe IIb).","Colchicina 1x/dia se < 70 kg ou TFG 30–59 (ESC 2025; bula). TFG 15–29: 1 cp a cada 2–3 dias; TFG < 15: não usar (bula Colchis).","Colchicina: evitar com claritromicina, eritromicina, azólico, ciclosporina, verapamil, diltiazem; com estatina, atenção a dor muscular.","Colchicina: diarreia é o efeito mais comum; suspender se diarreia intensa, fraqueza muscular ou dor muscular.","Corticoide não é 1ª opção (ESC 2025, classe III): só se AAS/AINE contraindicado, prednisona 0,2–0,5 mg/kg/dia, com a cardiologia.","Anticoagulante, imunossupressão, trauma ou troponina elevada (miopericardite): risco aumentado; internar ou discutir com a cardiologia.","Retorno em 1 a 2 semanas com PCR. Sem resposta após 1 semana: preditor maior na ESC 2015, risco intermediário na ESC 2025; discutir com a cardiologia.","Exercício: restringir até a remissão e por no mínimo 1 mês (ESC 2025, classe I); atleta: liberar com a cardiologia.","CID pericardite aguda não especificada I30.9 | idiopática I30.0 | infecciosa I30.1 | derrame pericárdico I31.3."],
  "unidade": "1) Diagnóstico (ESC 2025): quadro clínico (dor torácica pleurítica, que melhora sentado e inclinado para a frente e piora deitado) + mais de 1 critério adicional = pericardite definitiva; + 1 critério = possível.\n   Critérios adicionais: atrito pericárdico; ECG com supra de ST difuso e infra de PR; PCR elevada; derrame pericárdico novo ou maior. (ESC 2015: 2 de 4 entre dor típica, atrito, ECG e derrame.)\n2) Em todos (ESC 2025, classe I): ECG, radiografia de tórax, ecocardiograma transtorácico, hemograma, PCR e troponina; creatinina e transaminases para a dose da colchicina e do anti-inflamatório (ESC 2025, tabela 13).\n3) ECG: na pericardite o supra é difuso, côncavo, sem imagem em espelho (exceto aVR e V1), com infra de PR. Supra localizado com espelho, onda Q ou troponina subindo: seguir a conduta de SCA. ECG alterado sugere acometimento do miocárdio: dosar troponina.\n4) Alto risco: internar (ESC 2025, classe I): tamponamento ou sinais dele (hipotensão, turgência jugular, pulso paradoxal), febre > 38 °C, derrame grande (> 20 mm na diástole).\n   Risco intermediário (internar ou seguimento próximo, com a cardiologia): derrame moderado (10–20 mm), sinais de insuficiência cardíaca direita, pericardite efusivo-constritiva, falha do AINE, pericardite incessante.\n   ESC 2015 também considera: início subagudo (dias a semanas); critérios menores: miopericardite (troponina elevada), imunossupressão, trauma, anticoagulante oral.\n5) Sem critério de risco: tratar em casa, sem pesquisa de causa. 1ª dose na unidade: ibuprofeno 600 mg VO (ou AAS 1 g VO se doença coronária ou já usa AAS) + colchicina 0,5 mg VO + omeprazol 20 mg VO.\n6) Tratamento (ESC 2025): ibuprofeno 600–800 mg ou AAS 750–1.000 mg de 8/8h por 1–2 semanas, até a dor passar e a PCR normalizar, depois reduzir aos poucos; colchicina 0,5 mg de 12/12h (1x/dia se < 70 kg ou TFG 30–59; TFG < 30: ver aviso) por 3 meses; omeprazol enquanto usar AAS ou AINE.\n7) Pesquisa de causa (tuberculose, câncer, doença autoimune, bactéria, uremia) só no alto risco ou sem resposta; sorologia viral de rotina não é recomendada, exceto HIV e hepatite C (ESC 2025). Mulher jovem: pensar em lúpus (HC-FMUSP).\n8) Tamponamento: sala de emergência, ecocardiograma à beira do leito e pericardiocentese com a cardiologia; evitar diurético, vasodilatador e ventilação com pressão positiva; volume EV pode estabilizar até a punção (ESC 2025).",
  "orient": "- A pericardite é uma inflamação da membrana que envolve o coração, quase sempre depois de uma virose. Com o tratamento, a dor costuma melhorar em poucos dias.\n- Tome o anti-inflamatório nos horários da receita, sempre depois de comer, junto com o protetor do estômago. Não diminua nem pare por conta própria.\n- Tome a colchicina todos os dias por 3 meses, mesmo sem dor: ela diminui a chance de a inflamação voltar. Diarreia é o efeito mais comum; se for forte ou vier com dor ou fraqueza nos músculos, procure o médico.\n- Não tome outros anti-inflamatórios junto. Antes de começar antibiótico ou remédio para fungo, avise que usa colchicina: alguns aumentam o efeito dela.\n- Evite exercício físico e esforço (academia, corrida, futebol, carregar peso) por pelo menos 1 mês e até o médico liberar. As atividades leves do dia a dia estão liberadas.\n- Volte para reavaliação em 1 a 2 semanas, com exame de sangue (PCR), para ajustar a dose do anti-inflamatório.\n- Volte imediatamente ao pronto-socorro se tiver: falta de ar, não conseguir ficar deitado, desmaio ou tontura forte, inchaço nas pernas, febre acima de 38 °C, coração disparado, dor que não melhora depois de 1 semana de tratamento, fezes pretas ou vômito com sangue.",
  "rev": [
   "Decidido pelo médico (2026-10-27): a receita traz só a dose cheia do anti-inflamatório por 14 dias (ESC 2025, tabela 13: 1–2 semanas); o desmame passa ao retorno, guiado pela PCR e pelos sintomas (aviso ao médico), e a orientação pede reavaliação em 1–2 semanas. Quantidades refeitas: ibuprofeno 42 cp, AAS 84 cp, omeprazol 14 cápsulas.",
   "Criada (2026-10-26): pericardite aguda pela ESC 2025 (diagnóstico, risco, ibuprofeno ou AAS com desmame, colchicina por 3 meses com ajuste renal pela bula, omeprazol, restrição de exercício). Conferência independente (.rascunhos/sincope-pericardite-conferencia.md): 1 crítico (colchicina na insuficiência renal), 7 importantes e 6 menores, aplicados."
  ],
  "fontes": [
   "Schulz-Menger J, Collini V et al. 2025 ESC Guidelines for the management of myocarditis and pericarditis (Eur Heart J 2025;46(40):3952): diagnóstico (quadro clínico + mais de 1 critério adicional), avaliação inicial com ECG, eco, radiografia, PCR e troponina (classe I), estratificação (tabela 7), AAS 750-1.000 mg ou ibuprofeno 600-800 mg de 8/8h por 1-2 semanas, depois redução de 250 mg (AAS) ou 200 mg (ibuprofeno) a cada 1-2 semanas, colchicina 0,5 mg 1x/dia (< 70 kg ou insuficiência renal grave) ou 12/12h por 3-6 meses (tabela 13), IBP sempre com AAS/AINE, corticoide não como 1ª opção (classe III), sem sorologia viral de rotina, restrição de exercício até a remissão e por no mínimo 1 mês (classe I). https://doi.org/10.1093/eurheartj/ehaf192",
   "Adler Y et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases (Eur Heart J 2015;36:2921-2964): 2 de 4 critérios (dor pericárdica, atrito, supra de ST difuso ou infra de PR, derrame); preditores maiores (febre > 38 °C, início subagudo, derrame grande, tamponamento, sem resposta após 1 semana de AINE) e menores (miopericardite, imunossupressão, trauma, anticoagulante oral). https://doi.org/10.1093/eurheartj/ehv318",
   "Imazio M et al. A randomized trial of colchicine for acute pericarditis — ICAP (N Engl J Med 2013;369:1522-1528): colchicina 0,5 mg 12/12h (> 70 kg) ou 1x/dia (≤ 70 kg) por 3 meses reduziu a pericardite incessante ou recorrente. https://doi.org/10.1056/NEJMoa1208536",
   "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 281 — Pericardial Disease: AAS 2-4 g/dia ou ibuprofeno 600-800 mg 3x/dia com proteção gástrica (omeprazol 20 mg/dia), colchicina por 3 meses pelo peso (conferência).",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. (2024), cap. 37 — Pericardite aguda, derrame pericárdico e tamponamento cardíaco: exames iniciais, preditores de gravidade, ibuprofeno 600-800 mg 3x/dia, colchicina pelo peso por 3 meses (conferência).",
   "Bula Anvisa do Colchis (colchicina 0,5 mg e 1 mg, Apsen): indicação em gota (uso na pericardite fora da bula); contraindicada na gestação e na doença renal, hepática ou gastrointestinal grave; TFG 30–59: 0,5 mg/dia; 15–29: a cada 2–3 dias; < 15: contraindicada; toxicidade com inibidores do CYP3A4 e da glicoproteína P (claritromicina, eritromicina, cetoconazol, fluconazol, diltiazem, verapamil, ciclosporina); miopatia com estatina; diarreia em mais de 10%. https://consultaremedios.com.br/colchis/bula",
   "Bula Anvisa do ibuprofeno 600 mg comprimido revestido (genérico, Prati-Donaduzzi): 600 mg 3 a 4 vezes ao dia; não exceder 3.200 mg/dia. https://consultaremedios.com.br/ibuprofeno/bula",
   "Bula Anvisa da Aspirina 500 mg (ácido acetilsalicílico, Bayer): adulto 1 a 2 cp a cada 4 a 8 h, no máximo 8 cp/dia; contraindicada na úlcera, tendência a sangramento, insuficiência renal, hepática ou cardíaca grave, metotrexato ≥ 15 mg/semana, último trimestre da gestação e suspeita de dengue. https://consultaremedios.com.br/aspirina/bula",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024: não usar AAS nem anti-inflamatório na suspeita de dengue."
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
  "nome": "Tromboembolismo pulmonar",
  "cat": "cardio",
  "cid": "I26.9",
  "sin": "tep embolia pulmonar tromboembolismo pulmonar tev anticoagulacao dispneia subita",
  "casa": "# Alta no TEP de baixo risco (categoria A–B: sPESI 0 ou Hestia negativo):\nUso oral\n1) Rivaroxabana 15 mg ------------------------ 42 cp\nTomar 1 cp VO de 12/12h, com alimento, por 21 dias.\n   Rivaroxabana 20 mg ------------------------ 30 cp\nA partir do 22º dia: tomar 1 cp VO 1 vez ao dia, com alimento, até a reavaliação com o médico. O tratamento dura pelo menos 3 meses.\nOu (apixabana)\n1) Apixabana 5 mg ---------------------------- 88 cp\nTomar 2 cp VO de 12/12h por 7 dias. A partir do 8º dia: tomar 1 cp VO de 12/12h, até a reavaliação com o médico. O tratamento dura pelo menos 3 meses.\n\n# Se dor:\n2) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).",
  "avisoRx": ["Anticoagulante oral direto: não usar na gestação e lactação, na síndrome antifosfolípide (sobretudo triplo-positiva) e com ClCr < 15 mL/min.","Rivaroxabana: evitar abaixo de 30 mL/min no tratamento. Nesses casos, enoxaparina ou varfarina conforme o caso.","Gestante ou lactante: enoxaparina 1 mg/kg SC de 12/12h, com a dose pelo peso escrita à mão.","Rivaroxabana: 72 cp cobrem 51 dias; apixabana: 88 cp cobrem 37 dias. Retorno em até 1 semana; reavaliar a duração até 3 meses."],
  "unidade": "1) Probabilidade clínica: Wells ou Genebra (ver Escores). Baixa probabilidade: aplicar PERC; PERC 0 exclui sem D-dímero.\n2) TEP improvável (Wells ≤ 4) ou probabilidade baixa/intermediária (Wells ≤ 6): D-dímero; > 50 anos usar corte ajustado (idade × 10 mcg/L). D-dímero negativo exclui. Alternativa validada: algoritmo YEARS.\n3) Alta probabilidade ou D-dímero positivo: angio-TC de tórax. Sem contraste possível: cintilografia de ventilação/perfusão, ou USG Doppler das pernas (TVP proximal confirma o tromboembolismo). Ecocardiograma não confirma nem exclui TEP no paciente estável.\n4) Probabilidade alta/intermediária: iniciar anticoagulação enquanto aguarda o exame.\n   Enoxaparina 1 mg/kg SC de 12/12h (preferida à heparina não fracionada). Heparina não fracionada se instabilidade, candidato a reperfusão ou ClCr < 30 mL/min: 80 unidades/kg EV em bolus + 18 unidades/kg/h, ajustando pelo TTPa.\n5) Estratificar: sPESI ou Hestia; se sPESI ≥ 1 ou Hestia positivo, disfunção de VD (TC/eco) e troponina. Categorias da AHA/ACC 2026:\n   - A (achado incidental, sem sintomas) e B (sintomático com sPESI 0 ou Hestia negativo): alta precoce com anticoagulante oral direto.\n   - C (sPESI ≥ 1 ou Hestia positivo, com ou sem VD ou troponina alterados): internar.\n   - D (falência cardiopulmonar iminente: D1 hipotensão transitória ou síncope; D2 normotenso com hipoperfusão — lactato elevado, lesão renal aguda, confusão): internar em UTI e discutir terapia avançada com centro de referência.\n   - E (E1 hipotensão persistente ou choque; E2 parada): trombólise sistêmica, ou terapia por cateter ou cirúrgica onde houver.\n6) TEP de alto risco (categoria E): trombólise sistêmica — alteplase 100 mg EV em 2 h, suspendendo a heparina durante a infusão e reiniciando quando o TTPa cair abaixo de 2 vezes o controle. Choque sem como fazer angio-TC: eco à beira do leito com disfunção de VD autoriza tratar como TEP de alto risco. Parada cardíaca por TEP provável: considerar trombólise (alteplase; dose não padronizada nas diretrizes — o esquema mais usado é 50 mg EV em bolus) e manter a RCP por pelo menos 60–90 min (ESC 2019; AHA 2025, Parte 10).\n7) Não fazer trombólise sistêmica nas categorias A a C2 (mais dano que benefício). C3 (VD e troponina alterados): benefício incerto; discutir caso a caso.",
  "orient": "- Tome o anticoagulante todos os dias, nos horários da receita, e não pare por conta própria.\n- Não tome remédios para dor ou inflamação como ibuprofeno, diclofenaco ou nimesulida, nem ácido acetilsalicílico, sem falar com o médico: eles aumentam o risco de sangramento.\n- Avise qualquer médico ou dentista que você está tomando anticoagulante.\n- Faça a consulta de retorno com o médico em até 1 semana.\n- Volte imediatamente ao pronto-socorro se tiver falta de ar que piora, dor no peito, desmaio, ou sangramento (vômito ou tosse com sangue, fezes pretas, urina com sangue).\n- Avise o médico se estiver grávida, amamentando ou se engravidar durante o tratamento.",
  "fontes": [
   "Creager MA et al. 2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN Guideline for the Evaluation and Management of Acute Pulmonary Embolism in Adults (Circulation 2026;153:e977) — categorias clínicas A–E, YEARS e D-dímero ajustado à idade, alta precoce nas categorias A–B, HBPM preferida à HNF, anticoagulante oral direto preferido à varfarina, HBPM na gestação, trombólise só nas categorias D–E, retorno em até 1 semana e reavaliação até 3 meses.",
   "Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism (Eur Heart J 2020;41:543) — PERC, D-dímero ajustado à idade, cintilografia V/Q e USG de compressão como alternativas, eco à beira do leito no choque, trombólise e RCP prolongada. https://academic.oup.com/eurheartj/article/41/4/543/5556136",
   "American Heart Association. Part 10: Special Circumstances of Resuscitation — 2025 AHA Guidelines for CPR and ECC (Circulation 2025): TEP provável na PCR, trombólise e RCP prolongada; dose não padronizada.",
   "Kline JA et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism — PERC (J Thromb Haemost 2004;2:1247).",
   "Righini M et al. Age-adjusted D-dimer cutoff levels to rule out pulmonary embolism: the ADJUST-PE study (JAMA 2014;311:1117).",
   "van der Hulle T et al. Simplified diagnostic management of suspected pulmonary embolism (the YEARS study) (Lancet 2017;390:289).",
   "Jiménez D et al. Simplification of the Pulmonary Embolism Severity Index for prognostication in patients with acute symptomatic pulmonary embolism — sPESI (Arch Intern Med 2010;170:1383).",
   "Zondag W et al. Outpatient treatment in patients with acute pulmonary embolism: the Hestia Study (J Thromb Haemost 2011;9:1500).",
   "Bulas do Xarelto (rivaroxabana, Bayer) e do Eliquis (apixabana, BMS/Pfizer) registradas na Anvisa — esquemas de ataque, contraindicações e aumento de sangramento com anti-inflamatório e ácido acetilsalicílico.",
   "Bula do Clexane (enoxaparina, Sanofi) registrada na Anvisa — tratamento da TVP com ou sem TEP: 1 mg/kg de 12/12h; 1,5 mg/kg 1 vez ao dia só no paciente sem complicação e com baixo risco de recorrência; ClCr 15–30 mL/min: 1 mg/kg 1 vez ao dia; ClCr < 15 mL/min: não recomendada.",
   "Bula do Actilyse (alteplase) registrada na Anvisa e bula FDA do Activase — TEP: 100 mg em 2 h, heparina reiniciada quando o TTPa cair abaixo de 2 vezes o controle.",
   "Garcia DA et al. Parenteral anticoagulants — ACCP 9ª ed. (Chest 2012;141:e24S) — heparina não fracionada 80 unidades/kg + 18 unidades/kg/h no TEV.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 51, Tromboembolismo pulmonar (conferência)."
  ],
  "rev": [
   "Corrigido (2026-10-25): conduta separada da TVP (decisão do médico); receita com a rivaroxabana numa só opção e a apixabana como alternativa (o 'Ou' ligava a apixabana só à 2ª linha); YEARS, alternativas de imagem, eco no choque e categorias A–E por extenso (D1 hipotensão transitória ou síncope, D2 choque normotenso; E com trombólise sistêmica ou terapia por cateter ou cirúrgica); D-dímero no TEP improvável (Wells ≤ 4) ou na probabilidade baixa/intermediária (Wells ≤ 6); sem trombólise nas categorias A a C2, C3 caso a caso; dipirona opcional; orientações sobre anti-inflamatório e retorno em 1 semana; dias cobertos pela rivaroxabana e pela apixabana no aviso; bula do Clexane com 1,5 mg/kg 1x/dia só no paciente sem complicação e não recomendada com ClCr < 15; conferência independente (AHA/ACC 2026; ESC 2019; YEARS 2017; ADJUST-PE 2014; bulas Xarelto, Eliquis e Clexane; HC-FMUSP 18ª ed., cap. 51).",
   "Corrigido (2026-10-17): receita com a fase de manutenção e quantidades (rivaroxabana 20 mg; apixabana 60 cp); contraindicações dos anticoagulantes orais diretos; dose da heparina não fracionada; trombólise com heparina suspensa e reiniciada pelo TTPa, PCR por TEP e categorias da AHA/ACC 2026; resumo do ACC retirado (AHA/ACC 2026; ESC 2019; bulas Xarelto, Eliquis e Actilyse; ACCP 2012).",
   "Item novo."
  ]
 },
 {
  "id": "tvp",
  "nome": "Trombose venosa profunda",
  "cat": "cardio",
  "cid": "I80.2",
  "sin": "tvp trombose venosa profunda trombose da perna panturrilha edema unilateral tev anticoagulacao flegmasia",
  "casa": "# Alta com anticoagulante (TVP proximal, ou distal com sintomas fortes ou risco de extensão):\nUso oral\n1) Rivaroxabana 15 mg ------------------------ 42 cp\nTomar 1 cp VO de 12/12h, com alimento, por 21 dias.\n   Rivaroxabana 20 mg ------------------------ 30 cp\nA partir do 22º dia: tomar 1 cp VO 1 vez ao dia, com alimento, até a reavaliação com o médico. O tratamento dura pelo menos 3 meses.\nOu (apixabana)\n1) Apixabana 5 mg ---------------------------- 88 cp\nTomar 2 cp VO de 12/12h por 7 dias. A partir do 8º dia: tomar 1 cp VO de 12/12h, até a reavaliação com o médico. O tratamento dura pelo menos 3 meses.\n\n# Se dor:\n2) Dipirona 500mg ---------------------------- 10 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).",
  "avisoRx": ["Anticoagulante oral direto: não usar na gestação e lactação, na síndrome antifosfolípide (sobretudo triplo-positiva) e com ClCr < 15 mL/min.","Rivaroxabana: evitar abaixo de 30 mL/min no tratamento. Nesses casos, enoxaparina ou varfarina conforme o caso.","TVP distal sem sintomas fortes e sem risco de extensão: tocar \"sem\" no anticoagulante; USG Doppler de novo em 1 e 2 semanas (CHEST 2021).","Gestante ou lactante: enoxaparina 1 mg/kg SC de 12/12h, com a dose pelo peso escrita à mão.","Rivaroxabana: 72 cp cobrem 51 dias; apixabana: 88 cp cobrem 37 dias. Renovar a receita na reavaliação."],
  "unidade": "1) Probabilidade clínica: Wells para TVP (ver Escores). Dispneia, dor torácica, síncope, taquicardia ou hipoxemia: seguir a conduta de TEP.\n2) TVP improvável (Wells < 2): D-dímero; > 50 anos, corte ajustado (idade × 10 mcg/L). Negativo exclui. Positivo: USG Doppler venoso.\n3) TVP provável (Wells ≥ 2): USG Doppler venoso (compressão proximal ou da perna inteira), sem depender do D-dímero. USG proximal negativa com probabilidade alta ou D-dímero positivo: repetir em cerca de 1 semana ou fazer a USG da perna inteira.\n4) Probabilidade alta com USG demorando: iniciar anticoagulação enquanto aguarda, se não houver alto risco de sangramento.\n5) TVP proximal (poplítea ou acima) confirmada: anticoagular por pelo menos 3 meses, com rivaroxabana ou apixabana desde o início (sem heparina antes). Tratamento em casa é o padrão se: estável, sem alto risco de sangramento, sem insuficiência renal grave, dor controlada com remédio oral, e consegue tomar o remédio e voltar para reavaliação.\n6) TVP distal isolada (veias da panturrilha):\n   - Sem sintomas fortes e sem fator de risco de extensão: USG seriada 1 vez por semana por 2 semanas, sem anticoagular; anticoagular se o trombo crescer.\n   - Fatores de risco de extensão: D-dímero positivo, trombo > 5 cm, > 7 mm ou em várias veias, perto das veias proximais, sem fator provocador reversível, câncer ativo, TEV prévio, paciente internado.\n   - Sintomas fortes ou fator de risco: anticoagular como na TVP proximal.\n7) Internar se: flegmasia (perna muito inchada, arroxeada ou pálida, fria e com dor intensa — chamar a Cirurgia Vascular com urgência), TVP iliofemoral extensa com sintomas graves, TEP associado com critério de internação, sangramento ativo ou alto risco de sangramento, dor sem controle com remédio oral, ClCr < 30 mL/min, gestante, ou sem condição de tomar o remédio ou de voltar.\n8) Sem anticoagulante oral direto:\n   - Gestante: enoxaparina 1 mg/kg SC de 12/12h.\n   - ClCr 15–30 mL/min: enoxaparina 1 mg/kg SC 1 vez ao dia.\n   - ClCr < 15 mL/min ou diálise: heparina não fracionada 80 unidades/kg EV em bolus + 18 unidades/kg/h pelo TTPa (enoxaparina não recomendada).\n   - Síndrome antifosfolípide: enoxaparina 1 mg/kg SC de 12/12h e varfarina, até o INR ficar entre 2 e 3.\n   - Enoxaparina 1,5 mg/kg 1 vez ao dia só na TVP sem complicação e com baixo risco de recorrência (não em obeso, câncer, TEV recorrente ou TVP iliofemoral).\n9) Não fazer trombólise de rotina; na flegmasia, trombólise por cateter ou trombectomia pela Cirurgia Vascular. Meia de compressão não é rotina para prevenir síndrome pós-trombótica; pode aliviar os sintomas. Caminhar cedo, sem repouso no leito.",
  "orient": "- Tome o anticoagulante todos os dias, nos horários da receita, e não pare por conta própria.\n- Caminhe normalmente, dentro do que a dor permitir. Não precisa ficar de repouso na cama. Sentado, deixe a perna elevada.\n- Não tome remédios para dor ou inflamação como ibuprofeno, diclofenaco ou nimesulida, nem ácido acetilsalicílico, sem falar com o médico: eles aumentam o risco de sangramento.\n- Avise qualquer médico ou dentista que você está tomando anticoagulante.\n- Se você saiu sem anticoagulante, repita o ultrassom da perna nas datas marcadas.\n- Faça a consulta de retorno marcada com o médico.\n- Volte imediatamente ao pronto-socorro se tiver falta de ar, dor no peito, tosse com sangue ou desmaio; se a perna ficar muito inchada, fria, arroxeada ou com dor muito forte; ou se tiver sangramento (vômito com sangue, fezes pretas, urina com sangue).\n- Avise o médico se estiver grávida, amamentando ou se engravidar durante o tratamento.",
  "fontes": [
   "Ortel TL et al. American Society of Hematology 2020 guidelines for management of venous thromboembolism: treatment of deep vein thrombosis and pulmonary embolism (Blood Adv 2020;4:4693) — tratamento em casa na TVP sem complicação, anticoagulante oral direto preferido à varfarina, anticoagulação isolada em vez de trombólise, 3 a 6 meses no evento provocado.",
   "Stevens SM et al. Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline and Expert Panel Report (Chest 2021;160:e545) — TVP distal isolada: USG seriada por 2 semanas se sem sintomas fortes e sem fator de risco de extensão; anticoagular se sintomas fortes, fator de risco ou extensão.",
   "Lim W et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: diagnosis of venous thromboembolism (Blood Adv 2018;2:3226) — Wells, D-dímero na baixa probabilidade, USG proximal ou da perna inteira, repetir a USG proximal na probabilidade alta.",
   "Wells PS et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis (N Engl J Med 2003;349:1227) — escore de Wells para TVP (< 2 improvável; ≥ 2 provável).",
   "Kearon C et al. Antithrombotic therapy for VTE disease — ACCP 9ª ed. (Chest 2012;141:e419S) — anticoagulação enquanto aguarda o exame na suspeita alta; deambulação precoce em vez de repouso.",
   "Garcia DA et al. Parenteral anticoagulants — ACCP 9ª ed. (Chest 2012;141:e24S) — heparina não fracionada 80 unidades/kg + 18 unidades/kg/h no TEV.",
   "Bulas do Xarelto (rivaroxabana, Bayer) e do Eliquis (apixabana, BMS/Pfizer) registradas na Anvisa — esquemas de ataque, contraindicações e aumento de sangramento com anti-inflamatório e ácido acetilsalicílico.",
   "Bula do Clexane (enoxaparina, Sanofi) registrada na Anvisa — tratamento da TVP com ou sem TEP: 1 mg/kg de 12/12h; 1,5 mg/kg 1 vez ao dia só no paciente sem complicação e com baixo risco de recorrência; ClCr 15–30 mL/min: 1 mg/kg 1 vez ao dia; ClCr < 15 mL/min: não recomendada.",
   "Creager MA et al. 2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN Guideline for the Evaluation and Management of Acute Pulmonary Embolism in Adults (Circulation 2026;153:e977) — HBPM na gestação; anticoagulante oral direto preferido à varfarina.",
   "Hajjar LA et al. (eds.) Medicina de Emergência: Abordagem Prática, 18ª ed. Manole, 2024 — cap. 39, Trombose venosa profunda (critérios para tratamento ambulatorial, TVP distal, flegmasia; heparina não fracionada com ClCr < 15 mL/min) (conferência).",
   "Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism (Eur Heart J 2020;41:543) — síndrome antifosfolípide: varfarina, anticoagulante oral direto não recomendado. https://academic.oup.com/eurheartj/article/41/4/543/5556136",
   "Kearon C et al. Antithrombotic Therapy for VTE Disease: CHEST Guideline and Expert Panel Report (Chest 2016;149:315) — meia de compressão não é rotina para prevenir a síndrome pós-trombótica (SOX).",
   "NICE. Venous thromboembolic diseases: diagnosis, management and thrombophilia testing (NG158, 2020, atualizada 2023) — D-dímero com corte ajustado à idade acima de 50 anos na suspeita de TVP. https://www.nice.org.uk/guidance/ng158"
  ],
  "rev": [
   "Item novo (2026-10-25): separado da conduta 'TEP / TVP' (decisão do médico), reaproveitando as doses já conferidas de rivaroxabana, apixabana, enoxaparina e heparina não fracionada; na conferência independente: enoxaparina não recomendada com ClCr < 15 ou diálise (heparina não fracionada), 1 mg/kg 1x/dia só com ClCr 15–30, 1,5 mg/kg 1x/dia só na TVP sem complicação e com baixo risco de recorrência; síndrome antifosfolípide com varfarina (INR 2–3) sobreposta à enoxaparina; meia de compressão atribuída ao CHEST 2016; D-dímero ajustado à idade pela NICE NG158; dias cobertos pela rivaroxabana e pela apixabana no aviso (ASH 2020; CHEST 2021; CHEST 2016; ASH 2018; Wells 2003; ESC 2019; NICE NG158; bulas Xarelto, Eliquis e Clexane; HC-FMUSP 18ª ed., cap. 39)."
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
  "casa": "Uso oral\n1) Ibuprofeno 600mg -------------------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\nOu (cetoprofeno)\n1) Cetoprofeno 100mg ------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (nimesulida)\n1) Nimesulida 100mg -------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (naproxeno)\n1) Naproxeno 500mg --------------------------- 10 cp\nTomar 1 cp VO de 12/12h, após as refeições, por até 5 dias.\nOu (diclofenaco)\n1) Diclofenaco de sódio 50mg ----------------- 15 cp\nTomar 1 cp VO de 8/8h, após as refeições, por até 5 dias.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor (no máximo 8 cp por dia).\n\nUso tópico\n3) Diclofenaco dietilamônio gel -------------- 1 bisnaga\nAplicar no local 3 a 4x ao dia por até 7 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue; não usar na gestação nem na doença renal.","Diclofenaco gel: alternativa ao AINE oral.","Tratamento funcional (órtese e carga conforme tolerância) é preferível à imobilização rígida.","Cetoprofeno, naproxeno, diclofenaco e nimesulida: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida: no máximo 100 mg de 12/12h por até 15 dias; não usar com febre, sintomas gripais, doença do fígado ou álcool em excesso (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Nimesulida: não associar a paracetamol ou a outro analgésico com risco para o fígado; usar pelo menor tempo possível (EMA 2012)."],
  "unidade": "Regras de Ottawa — RX indicado se dor maleolar/mediopé E qualquer um:\n- Dor à palpação dos 6 cm distais da borda posterior ou ponta do maléolo lateral ou medial.\n- Dor à palpação da base do 5º metatarso ou do navicular.\n- Incapacidade de dar 4 passos (logo após o trauma e na emergência).",
  "orient": "- Coloque gelo por 15 a 20 minutos, várias vezes ao dia, nos primeiros dias, e mantenha a perna elevada.\n- Use a tornozeleira ou órtese indicada. Poupe o pé nos primeiros 1 a 2 dias e depois volte a apoiar aos poucos, conforme a dor.\n- Comece cedo os exercícios de movimento e de equilíbrio do tornozelo.\n- Volte ao pronto-socorro se o pé ficar frio, pálido ou arroxeado, se tiver dormência, piora importante da dor ou do inchaço, ou se não conseguir apoiar o pé.\n- Se a dor ou a sensação de tornozelo frouxo continuar, volte para reavaliação em 3 a 5 dias.",
  "fontes": [
   "Bachmann LM et al. Accuracy of Ottawa ankle rules to exclude fractures: systematic review (BMJ 2003;326:417). https://www.ncbi.nlm.nih.gov/books/NBK69576/",
   "Stiell IG et al. Decision rules for the use of radiography in acute ankle injuries: refinement and prospective validation (JAMA 1993;269:1127).",
   "Vuurberg G et al. Diagnosis, treatment and prevention of ankle sprains: update of an evidence-based clinical guideline (Br J Sports Med 2018;52(15):956): tratamento funcional melhor que imobilização; AINE por curto período para dor e edema; reexame em 3–5 dias. https://doi.org/10.1136/bjsports-2017-098106",
   "Ficha dipirona: máximo de 4 g por dia (EMA 2024).",
   "NHS. Sprains and strains (revisado em 23/04/2024): emergência se dormência ou formigamento, pele azulada ou fria, deformidade; procurar atendimento se não consegue apoiar ou o inchaço piora. https://www.nhs.uk/conditions/sprains-and-strains/",
   "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue.",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa da nimesulida 100 mg comprimido (Vitamedic, RDC 47/2009; referência Nisulid, Aché): 50–100 mg 2x ao dia após as refeições; contraindicada < 12 anos, insuficiência hepática e renal grave. https://static-webv8.jet.com.br/drogaosuper/bulas/145802.pdf",
   "EMA. Nimesulide-containing medicinal products — referral (artigos 31 e 107i, 2007–2012): 100 mg 2x/dia, no máximo 15 dias; contraindicada com febre ou sintomas gripais, doença hepática ou outras drogas hepatotóxicas. https://www.ema.europa.eu/en/documents/other/amendments-be-included-relevant-sections-summary-product-characteristics-nimesulide-containing_en.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc"
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
  "casa": "# Tosse aguda (< 3 semanas) do resfriado — sintomático\nUso oral\n1) Mel -----------------------------------------\nTomar 1 colher de chá (5 mL) puro ou em chá morno até 3x ao dia, principalmente à noite. Não dar a menores de 1 ano.\n2) Dipirona 500mg ---------------------------- 20 cp\nTomar 2 cp VO de 6/6h se dor ou febre.\n3) Ibuprofeno 600mg -------------------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\nOu (cetoprofeno)\n3) Cetoprofeno 100mg ------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (naproxeno)\n3) Naproxeno 500mg --------------------------- 6 cp\nTomar 1 cp VO de 12/12h, após as refeições, por 3 dias.\nOu (diclofenaco)\n3) Diclofenaco de sódio 50mg ----------------- 9 cp\nTomar 1 cp VO de 8/8h, após as refeições, por 3 dias.\n\nUso nasal\n4) Soro fisiológico 0,9% (frasco de 500 mL) --- 5 fr\nLavar as narinas com 50 mL em cada lado, com seringa, 3 a 4x ao dia.\n\n# Tosse subaguda pós-infecciosa (3–8 semanas), após excluir pneumonia e coqueluche\nUso inalatório\n5) Brometo de ipratrópio spray --------------- 1 fr\nInalar 2 jatos de 6/6h por até 2 semanas.\n\n# Coqueluche (suspeita: tosse ≥ 14 dias com paroxismos, guincho inspiratório ou vômito pós-tosse)\nUso oral\n6) Azitromicina 500mg ------------------------ 1 cp + Azitromicina 250mg -- 4 cp\nTomar 500 mg VO no 1º dia e 250 mg 1x ao dia do 2º ao 5º dia.\n\n# Corticoide nasal (opcional): tosse por gotejamento pós-nasal com rinite\nUso nasal\n7) Propionato de fluticasona 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, por 14 dias.\nOu (mometasona)\n7) Furoato de mometasona 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, por 14 dias.\nOu (budesonida 64 mcg)\n7) Budesonida 64mcg spray nasal -------------- 1 fr\nAplicar 2 jatos em cada narina 1x ao dia, pela manhã, por 14 dias.\nOu (budesonida 32 mcg)\n7) Budesonida 32mcg spray nasal --- 1 fr\nAplicar 4 jatos em cada narina 1x ao dia, pela manhã, por 14 dias.\nOu (budesonida 50 mcg)\n7) Budesonida 50mcg spray nasal --- 1 fr\nAplicar 2 jatos em cada narina de 12/12h, por 14 dias.",
  "avisoRx": ["Ibuprofeno só depois de descartar dengue.","Febre com mialgia, cefaleia, dor retro-orbitária ou exantema em área de dengue (ou viagem em 14 dias): sem ibuprofeno nem AAS (MS, Dengue 2024, 6.1.2).","Nesse caso, só dipirona ou paracetamol até descartar dengue.","Coqueluche: notificação compulsória.","Coqueluche: avaliar quimioprofilaxia dos contatos prioritários (< 1 ano, gestantes ≥ 32 semanas, imunossuprimidos, profissionais de saúde).","Cetoprofeno, naproxeno e diclofenaco: mesmas restrições do ibuprofeno (dengue, gestação, doença renal, úlcera, anticoagulante).","Nimesulida fica de fora: contraindicada com febre ou sintomas gripais (EMA).","Diclofenaco: evitar na doença cardiovascular (insuficiência cardíaca, coronariopatia, AVC, doença arterial periférica) — bula Voltaren; EMA 2013.","Corticoide nasal na tosse: se gotejamento pós-nasal com rinite (ACCP 2006). Sem melhora em 2 semanas, rever a causa."],
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
   "Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed. atualizada, 2019: sintomático respiratório é quem tem tosse há 3 semanas ou mais; nas populações vulneráveis (privados de liberdade, situação de rua, pessoas com HIV, indígenas, contatos), tosse de qualquer duração.",
   "Bula Anvisa do cetoprofeno 100 mg comprimido revestido de liberação retardada (Aché, bula do paciente de 16/09/2020; referência Profenid Entérico, Sanofi): 200 mg/dia em 2 tomadas, máximo 300 mg/dia; contraindicado no 3º trimestre, insuficiência renal, hepática ou cardíaca grave e úlcera. https://www.ache.com.br/wp-content/uploads/application/pdf/bula-paciente-cetoprofeno.pdf",
   "Bula Anvisa do naproxeno 250 e 500 mg comprimido (posologia, bulário eletrônico): dor musculoesquelética e dismenorreia 500 mg inicial e 250 mg de 6/6 a 8/8h, máximo 1.250 mg/dia; gota aguda 750 mg inicial; crise de enxaqueca 750 mg e doses adicionais de 250–500 mg, máximo 1.250 mg/dia. https://www.bulas.med.br/p/detalhamento-das-bulas/1205459/posologia+naproxeno.htm",
   "Bula Anvisa do Voltaren (diclofenaco sódico) comprimido revestido, Novartis, bula do profissional (11/2025): 100–150 mg/dia em 2–3 tomadas, máximo 150 mg/dia; indicado em crise aguda de gota, cólica renal e biliar e dor pós-traumática. https://www.pro.novartis.com/br-pt/sites/pro_novartis_com_br/files/2025-11/Bula-VOLTAREN-Comprimido-Revestido-Medico.pdf",
   "Head K et al. Saline irrigation for allergic rhinitis. Cochrane Database Syst Rev 2018;6:CD012597 (volumes estudados de 5 mL a 1.000 mL/dia; benefício nos sintomas). https://pubmed.ncbi.nlm.nih.gov/29932206/",
   "Fokkens WJ et al. European Position Paper on Rhinosinusitis and Nasal Polyps 2020 (EPOS 2020). Rhinology 2020;58(Suppl S29):1–464 (irrigação salina na rinossinusite aguda viral, pós-viral e bacteriana). https://doi.org/10.4193/Rhin20.600",
   "King D et al. Saline nasal irrigation for acute upper respiratory tract infections. Cochrane Database Syst Rev 2015;(4):CD006821. https://doi.org/10.1002/14651858.CD006821.pub3",
   "Naprosyn (naproxeno) — Summary of Product Characteristics, Atnahs Pharma (medicines.org.uk): dor aguda e dismenorreia, 500 mg seguidos de 500 mg a cada 12 h. https://www.medicines.org.uk/emc/product/1467/smpc",
   "Bula Anvisa do Flixonase (propionato de fluticasona 50 mcg/dose, spray nasal aquoso; GlaxoSmithKline Brasil, atualizada em 16/08/2019): adulto 2 doses em cada narina 1x ao dia, de preferência pela manhã (às vezes 12/12h); máximo 4 doses em cada narina por dia; frascos de 60 e 120 doses. https://www.bulas.med.br/p/bula/5175/flixonase.htm",
   "Bula Anvisa do Nasonex (furoato de mometasona 50 mcg/acionamento, spray nasal; Organon, bula do paciente aprovada em 28/04/2026): rinite alérgica no adulto 2 jatos em cada narina 1x ao dia (200 mcg), máximo 400 mcg; rinossinusite aguda (12 anos ou mais) 2 jatos em cada narina 2x ao dia (400 mcg); preparo inicial de 10 acionamentos; frascos de 60 e 120 acionamentos. https://www.organon.com/brazil/wp-content/uploads/sites/33/2023/06/nasonex_bula_paciente.pdf",
   "Bula Anvisa do Budecort Aqua (budesonida 32 e 64 mcg/dose, spray nasal; AstraZeneca, atualizada em 01/03/2021): rinite no adulto 256 mcg/dia (2 jatos de 64 mcg ou 4 jatos de 32 mcg em cada narina), 1x ao dia pela manhã ou dividido em 2 tomadas; frasco de 120 doses. https://www.bulas.med.br/p/detalhamento-das-bulas/1160134/posologia-e-modo-de-usar-budecort-aqua.htm",
   "Bula Anvisa do Busonid spray nasal aquoso (budesonida 50 e 100 mcg/dose; Biosintética/Aché, atualizada em 21/05/2020): adultos e maiores de 6 anos com 50 mcg, 2 jatos em cada narina 2x ao dia ou 4 jatos em cada narina pela manhã (400 mcg/dia); máximo 400 mcg/dia; frascos de 60 e 120 doses. https://www.bulas.med.br/p/bulas-de-medicamentos/bula/1367728/busonid-spray-nasal.htm",
   "Pratter MR. Chronic upper airway cough syndrome secondary to rhinosinus diseases: ACCP evidence-based clinical practice guidelines (Chest 2006;129(1 Suppl):63S–71S): corticoide nasal na tosse por gotejamento pós-nasal associada a rinite. https://doi.org/10.1378/chest.129.1_suppl.63S"
  ],
  "evid": "Para a tosse aguda do resfriado a evidência dos sintomáticos é de baixa qualidade (CHEST 2017); mel tem benefício pequeno em crianças.",
  "rev": [
   "Corrigido (2026-10-27): corticoide nasal como opção desligada para gotejamento pós-nasal com rinite; conferência independente (bulas Anvisa, ACCP).",
   "Corrigido (2026-10-17): tuberculose: investigar com tosse há 3 semanas ou mais mesmo sem febre ou emagrecimento, e com qualquer duração nas populações vulneráveis (MS, Manual de Recomendações para o Controle da Tuberculose, 2019).",
   "Corrigido (2026-10-09): não usar ibuprofeno na febre com dengue não descartada (MS, Dengue 2024).",
   "Item novo."
  ]
 }
];
const DILFONTE = "Prefeitura de Joinville. Manual de diluição de medicamentos injetáveis — Pronto Atendimento, 2018. https://www.joinville.sc.gov.br/public/portaladm/pdf/jornal/aff57d668dbf18219d7b9e8f2d949b08.pdf";
if (typeof module !== "undefined") module.exports = { CATS, BASE };

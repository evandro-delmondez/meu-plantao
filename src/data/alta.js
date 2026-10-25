/* ===== Alta segura: orientação ao paciente em linguagem leiga, para imprimir ou abrir pelo QR code =====
   Sem dado do paciente. Conteúdo clínico: fonte em cada item e conferência independente (regras 1 e 2).
   Escrever para quem não é da saúde: frases curtas, sem siglas, sem nome técnico sem explicação, "você".
   Formato: ALTA[idDaConduta] = {
     titulo: "Dor de garganta (amigdalite)",
     oque: "1–2 frases: o que é e como costuma evoluir",
     cuidados: ["o que fazer em casa (hidratação, repouso, como tomar o remédio da receita, o que evitar)"],
     volte: ["volte ao pronto-socorro se… (sinais de alarme em palavras do dia a dia)"],
     fontes: ["..."] } */
const ALTA = {
/* Rascunho ALTA, lote 1 (2026-10-09). Entradas para colar dentro de const ALTA = { ... } em src/data/alta.js.
   Não conferido. Relatório: .rascunhos/alta-1-relatorio.md */
amigdalite: {
  titulo: "Dor de garganta com infecção por bactéria (amigdalite)",
  oque: "É uma infecção das amígdalas, as duas bolinhas no fundo da garganta. Com o tratamento, a dor costuma melhorar em poucos dias e passar em até 1 semana.",
  cuidados: [
    "Tome os remédios como está na sua receita.",
    "Tome o antibiótico até o último dia da receita, mesmo que melhore antes. Parar antes pode fazer a infecção voltar.",
    "Beba bastante água. Prefira comidas macias ou frias, como iogurte, gelatina ou sorvete.",
    "Gargarejo com água morna e sal pode aliviar: meia colher de chá de sal em 1 copo de água morna. Não engula. Criança pequena não deve fazer.",
    "Descanse. Volte ao trabalho ou à escola quando estiver sem febre e já tiver tomado o antibiótico por pelo menos 1 dia.",
    "Lave as mãos, cubra a boca ao tossir ou espirrar e não divida copo, talher ou garrafa.",
    "Não fume e fique longe de fumaça."
  ],
  volte: [
    "Não consegue abrir bem a boca, ou a voz ficou abafada, como se tivesse uma batata quente na boca.",
    "Baba porque não consegue engolir a saliva, ou não consegue engolir nem água.",
    "Falta de ar ou um barulho alto ao puxar o ar.",
    "Inchaço ou dor forte de um lado do pescoço, ou dificuldade para mexer o pescoço.",
    "Fica muito fraco ou abatido, com tontura forte ao levantar ou desmaio.",
    "A febre continua depois de 3 dias tomando o antibiótico, ou a dor piora em vez de melhorar."
  ],
  fontes: [
    "Shulman ST et al. IDSA Clinical Practice Guideline for Group A Streptococcal Pharyngitis (Clin Infect Dis 2012;55:e86): tratamento completo (10 dias) para evitar complicações.",
    "NICE NG84. Sore throat (acute): antimicrobial prescribing, 2018, rec. 1.1.1, 1.1.4 e 1.1.5: duração de cerca de 1 semana; reavaliar se piora rápida ou importante. https://www.nice.org.uk/guidance/ng84",
    "NHS. Tonsillitis (revisado em 08/03/2024) e Sore throat: autocuidado, gargarejo com sal, sinais de abscesso (trismo, não engolir, falta de ar, babar). https://www.nhs.uk/conditions/tonsillitis/",
    "CDC. Clinical Guidance for Group A Streptococcal Pharyngitis: retorno à escola/trabalho sem febre e 12 a 24 h após iniciar o antibiótico. https://www.cdc.gov/group-a-strep/hcp/clinical-guidance/strep-throat.html"
  ]
},
faringite: {
  titulo: "Dor de garganta por vírus (faringite viral)",
  oque: "É uma inflamação da garganta causada por vírus, como num resfriado. Melhora sozinha, em geral em até 1 semana, e antibiótico não ajuda.",
  cuidados: [
    "Tome os remédios como está na sua receita. Eles aliviam a dor e a febre.",
    "Antibiótico não mata vírus. Não tome antibiótico por conta própria.",
    "Descanse e beba bastante água.",
    "Gargarejo com água morna e sal pode aliviar: meia colher de chá de sal em 1 copo de água morna. Não engula. Criança pequena não deve fazer.",
    "Prefira comidas macias ou frias, como iogurte, gelatina ou sorvete.",
    "Lave as mãos, cubra a boca ao tossir ou espirrar e não divida copo, talher ou garrafa.",
    "Não fume e fique longe de fumaça."
  ],
  volte: [
    "Febre por mais de 3 dias.",
    "Aparecem placas brancas ou pus na garganta.",
    "Dor tão forte que não consegue engolir nem água, ou baba porque não consegue engolir a saliva.",
    "Não consegue abrir bem a boca, ou a voz ficou abafada, como se tivesse uma batata quente na boca.",
    "Falta de ar ou um barulho alto ao puxar o ar.",
    "Inchaço ou dor forte de um lado do pescoço, ou dificuldade para mexer o pescoço.",
    "Fica muito fraco ou abatido, com tontura forte ao levantar ou desmaio."
  ],
  fontes: [
    "Shulman ST et al. IDSA Clinical Practice Guideline for Group A Streptococcal Pharyngitis (Clin Infect Dis 2012;55:e86): não tratar faringite viral com antibiótico.",
    "NICE NG84. Sore throat (acute): antimicrobial prescribing, 2018, rec. 1.1.1, 1.1.4, 1.1.5 e 1.2 (autocuidado). https://www.nice.org.uk/guidance/ng84",
    "NHS. Sore throat: autocuidado e sinais de urgência (não engolir, babar, barulho ao respirar, piora rápida). https://www.nhs.uk/conditions/sore-throat/"
  ]
},
sinusite: {
  titulo: "Sinusite",
  oque: "É uma inflamação das cavidades do rosto em volta do nariz, quase sempre depois de um resfriado. Na maioria das vezes é causada por vírus e dura de 2 a 3 semanas, melhorando aos poucos.",
  cuidados: [
    "Tome e use os remédios como está na sua receita.",
    "Se você recebeu antibiótico, tome até o último dia, mesmo que melhore antes. Se não recebeu, não tome por conta própria: na maioria das vezes ele não é necessário.",
    "Se você não recebeu antibiótico, procure atendimento se piorar depois de ter começado a melhorar, ou se não tiver melhorado nada 10 dias depois do começo dos sintomas.",
    "Lave o nariz com soro fisiológico várias vezes ao dia, como foi ensinado.",
    "Descanse e beba bastante água.",
    "Não use por conta própria aqueles sprays que desentopem o nariz na hora. Usados por muitos dias, eles deixam o nariz ainda mais entupido.",
    "Não fume e fique longe de fumaça e de cheiros fortes."
  ],
  volte: [
    "Inchaço, vermelhidão ou dor em volta do olho.",
    "Olho saltado para fora, visão dupla ou visão embaçada.",
    "Dor de cabeça muito forte.",
    "Confusão, sonolência fora do normal ou pescoço duro (dificuldade para encostar o queixo no peito).",
    "O olho não se mexe direito, ou aparece fraqueza ou dormência num lado do rosto ou do corpo, ou a fala fica enrolada.",
    "Inchaço na testa, acima do olho.",
    "Febre alta com calafrios, ou você se sente muito mal e abatido.",
    "Está tomando antibiótico e, depois de 3 dias, piorou ou não melhorou nada."
  ],
  fontes: [
    "NICE NG79, rec. 1.1.9: encaminhar ao hospital se infecção sistêmica grave ou sinais de complicação orbitária ou intracraniana (inchaço sobre o osso frontal, cefaleia frontal intensa, sinais neurológicos focais). https://www.nice.org.uk/guidance/ng79",
    "Chow AW et al. IDSA Clinical Practice Guideline for Acute Bacterial Rhinosinusitis in Children and Adults (Clin Infect Dis 2012;54:e72): reavaliar se piora após 48–72 h de antibiótico ou sem melhora após 3–5 dias.",
    "Rosenfeld RM et al. AAO-HNS Clinical Practice Guideline (Update): Adult Sinusitis (Otolaryngol Head Neck Surg 2015;152:S1): lavagem nasal com soro; maioria viral.",
    "AAO-HNSF. Clinical Practice Guideline: Adult Sinusitis Update (Otolaryngol Head Neck Surg 2025;173 Suppl 1:S1–S56; doi 10.1002/ohn.1344): observação sem antibiótico na rinossinusite bacteriana não complicada; uso cauteloso de antibiótico.",
    "NICE NG79. Sinusitis (acute): antimicrobial prescribing, 2017, rec. 1.1.2: duração de 2 a 3 semanas, antibiótico geralmente desnecessário, procurar ajuda se piora rápida ou importante. https://www.nice.org.uk/guidance/ng79",
    "Sakano E et al. IV Consenso Brasileiro sobre Rinites (Braz J Otorhinolaryngol 2018;84:3): uso prolongado de descongestionante tópico causa rinite medicamentosa.",
    "NHS. Sinusitis (sinus infection): autocuidado (repouso, líquidos, lavagem nasal, não fumar). https://www.nhs.uk/conditions/sinusitis-sinus-infection/"
  ]
},
oma: {
  titulo: "Infecção no ouvido (otite média)",
  oque: "É uma infecção atrás do tímpano, a pele fina que fica no fundo do ouvido. A dor costuma melhorar em cerca de 3 dias e passar em até 1 semana.",
  cuidados: [
    "Tome os remédios como está na sua receita.",
    "Tome o antibiótico até o último dia, mesmo que melhore antes.",
    "Não coloque nada dentro do ouvido: cotonete, dedo, óleo, gota ou remédio caseiro, a não ser o que o médico receitou.",
    "Se sair líquido do ouvido, limpe só por fora, com algodão ou pano limpo.",
    "Não deixe entrar água no ouvido e não nade até melhorar.",
    "Remédio para desentupir o nariz e antialérgico não ajudam a otite. Não tome por conta própria."
  ],
  volte: [
    "Inchaço, vermelhidão ou dor atrás da orelha, ou a orelha parece empurrada para a frente.",
    "Um lado do rosto fica torto ou você não consegue fechar bem o olho de um lado.",
    "Tontura forte, com tudo girando.",
    "Dor de cabeça muito forte, pescoço duro, confusão ou sonolência fora do normal.",
    "A febre continua depois de 2 a 3 dias tomando o antibiótico.",
    "Começa a sair pus pelo ouvido ou você passa a ouvir menos."
  ],
  fontes: [
    "Lieberthal AS et al. AAP: The Diagnosis and Management of Acute Otitis Media (Pediatrics 2013;131:e964), extrapolado para adultos: reavaliar se sem melhora em 48–72 h.",
    "Harmes KM et al. Otitis media: diagnosis and treatment (Am Fam Physician 2013;88:435): complicações (mastoidite, paralisia facial, meningite).",
    "NICE NG91. Otitis media (acute): antimicrobial prescribing, 2018 (atualizado 2022), rec. 1.1.3 e 1.1.6 (escrito para menores de 18 anos; extrapolado): duração de cerca de 3 dias, até 1 semana; descongestionantes e anti-histamínicos não ajudam. https://www.nice.org.uk/guidance/ng91",
    "NHS. Ear infections: não colocar nada no ouvido, limpar a secreção por fora, não molhar nem nadar; urgência se inchaço em volta da orelha, saída de líquido, perda de audição ou tontura. https://www.nhs.uk/conditions/ear-infections/"
  ]
},
"otite-externa": {
  titulo: "Infecção no canal do ouvido (otite externa)",
  oque: "É uma infecção da pele do canal do ouvido, muitas vezes depois de entrar água ou de usar cotonete. Com as gotas, a maioria melhora em 2 a 3 dias e fica quase sem sintomas em 1 semana.",
  cuidados: [
    "Tome e use os remédios como está na sua receita. O remédio para dor ajuda muito nos primeiros dias, até as gotas fazerem efeito.",
    "Para pingar: deite com o ouvido doente para cima, pingue as gotas e fique assim por 3 a 5 minutos. Se puder, peça para outra pessoa pingar.",
    "Para a gota entrar, mexa a orelha de leve ou aperte algumas vezes a cartilagem da frente da orelha.",
    "Use as gotas por todos os dias da receita, mesmo que melhore antes.",
    "Não deixe entrar água no ouvido até sarar. No banho, tampe o ouvido com algodão passado em vaselina. Não nade durante o tratamento.",
    "Não limpe o ouvido você mesmo e não use cotonete nem coloque nada dentro dele."
  ],
  volte: [
    "Você tem diabetes ou baixa imunidade e a dor está forte e não passa.",
    "Um lado do rosto fica torto ou você não consegue fechar bem o olho de um lado.",
    "Vermelhidão e inchaço que se espalham para a orelha, o rosto ou o pescoço.",
    "Sem melhora depois de 2 a 3 dias usando as gotas.",
    "Ainda tem sintomas depois de 7 dias de tratamento."
  ],
  fontes: [
    "Rosenfeld RM et al. AAO-HNS Clinical Practice Guideline: Acute Otitis Externa (Otolaryngol Head Neck Surg 2014;150:S1): como pingar, manter o ouvido seco, reavaliar se sem melhora em 48–72 h, fatores de risco (diabetes, imunossupressão).",
    "AAO-HNSF. Instructions for patients e Patient FAQ: Acute Otitis Externa, 2014 (melhora em 48–72 h, mínimos sintomas em 7 dias; usar as gotas por pelo menos 7 dias; não limpar o ouvido sozinho). https://www.entnet.org/sites/default/files/AOEGuidelinePatientInstructionsFinal.pdf",
    "NHS. Ear infections: não colocar nada no ouvido, não molhar nem nadar. https://www.nhs.uk/conditions/ear-infections/"
  ]
},
rinite: {
  titulo: "Rinite alérgica",
  oque: "É uma alergia do nariz: espirros, coceira, coriza e nariz entupido quando você tem contato com poeira, mofo, pelo de animal ou outras coisas. Não tem cura, mas o tratamento e os cuidados com a casa controlam bem os sintomas.",
  cuidados: [
    "Use os remédios como está na sua receita.",
    "Use o spray de nariz todos os dias, mesmo nos dias em que estiver bem. Ele demora alguns dias para fazer efeito, e o efeito máximo pode levar 2 semanas.",
    "Lave o nariz com soro fisiológico, como foi ensinado.",
    "Tire o pó com pano úmido, deixe a casa arejada e sem mofo e troque a roupa de cama toda semana. Se puder, não deixe animais no quarto.",
    "Fique longe de fumaça de cigarro e de cheiros fortes.",
    "Não use por conta própria aqueles sprays que desentopem o nariz na hora. Usados por mais de 5 dias, eles deixam o nariz ainda mais entupido.",
    "Procure o posto de saúde se o nariz entope ou escorre só de um lado, se sangra com frequência, se você perde o olfato ou se o entupimento piora mesmo com o tratamento."
  ],
  volte: [
    "Falta de ar.",
    "Chiado no peito ou crises de tosse, principalmente à noite: a rinite alérgica pode vir junto com a asma.",
    "Secreção amarela ou verde com febre e dor no rosto.",
    "Sangramento pelo nariz que não para depois de 10 a 15 minutos apertando o nariz."
  ],
  fontes: [
    "Sousa-Pinto B et al. Allergic Rhinitis and its Impact on Asthma (ARIA)-EAACI Guidelines 2024–2025 Revision, Part I (tratamentos intranasais) e Part II (orais e oculares) (Allergy 2025).",
    "Sakano E et al. IV Consenso Brasileiro sobre Rinites (Braz J Otorhinolaryngol 2018;84:3): controle ambiental, lavagem nasal, rinite medicamentosa, sinais de outro diagnóstico (sintomas de um lado só, sangramento, perda do olfato) e associação com asma. https://doi.org/10.1016/j.bjorl.2017.10.006",
    "NHS. Allergic rhinitis (revisado em 08/01/2026): controle ambiental (pano úmido, casa seca e ventilada, roupa de cama, animais fora do quarto); descongestionante nasal por no máximo 5 dias; procurar o médico se a asma piorar. https://www.nhs.uk/conditions/allergic-rhinitis/",
    "NHS. Common questions about beclometasone nasal spray: corticoide nasal leva alguns dias para o efeito completo, até 2 semanas ou mais para o efeito máximo. https://www.nhs.uk/medicines/beclometasone-nasal-spray/common-questions-about-beclometasone-nasal-spray/",
    "NHS. Nosebleed: apertar o nariz por 10 a 15 minutos; ir à emergência se o sangramento passar disso. https://www.nhs.uk/conditions/nosebleed/"
  ]
},
conjuntivite: {
  titulo: "Conjuntivite (olho vermelho)",
  oque: "É uma inflamação da parte branca do olho e do lado de dentro da pálpebra, quase sempre por vírus, bactéria ou alergia. Costuma melhorar em 1 a 2 semanas, e a causada por vírus ou bactéria passa de uma pessoa para outra.",
  cuidados: [
    "Use o colírio como está na sua receita. Não encoste o bico do frasco no olho.",
    "Faça compressa fria (pano limpo molhado em água gelada) por 10 a 20 minutos, várias vezes ao dia.",
    "Limpe a secreção com gaze ou algodão molhado em soro fisiológico, do canto de dentro para fora. Use um pedaço novo para cada olho.",
    "Lave as mãos muitas vezes, principalmente depois de tocar no olho. Não coce os olhos.",
    "Não divida toalha, travesseiro ou maquiagem. Evite contato próximo com outras pessoas enquanto o olho estiver vermelho e com secreção.",
    "Não use lente de contato até terminar o tratamento e o olho voltar ao normal."
  ],
  volte: [
    "Dor forte no olho (mais que areia ou coceira).",
    "A visão ficou embaçada ou diminuiu, e não melhora quando você pisca.",
    "A luz incomoda muito.",
    "Você usa lente de contato e o olho está vermelho e dolorido.",
    "Muito pus, que aparece de repente e volta logo depois de limpar.",
    "Está usando colírio de antibiótico e não melhorou nada em 3 a 4 dias, ou piora a qualquer momento.",
    "Bolhas ou feridas na pálpebra ou na pele em volta do olho, ou manchas com bolhas na testa do mesmo lado."
  ],
  fontes: [
    "American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern, 2023: retorno em 3 a 4 dias se a conjuntivite bacteriana não melhorar; bolhas na pálpebra sugerem herpes simples ou zoster.",
    "Cheung AY et al. American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern 2023 (Ophthalmology 2024;131:P134): contágio por 10 a 14 dias; lavar as mãos, toalha e travesseiro separados, evitar contato próximo; encaminhar se perda visual, dor moderada ou intensa, secreção purulenta intensa, acometimento da córnea, falta de resposta ao tratamento.",
    "Azari AA, Barney NP. Conjunctivitis: a systematic review of diagnosis and treatment (JAMA 2013;310:1721): curso autolimitado em 1 a 2 semanas; lente de contato com olho vermelho (risco de ceratite). https://doi.org/10.1001/jama.2013.280318",
    "NHS. Conjunctivitis: limpar com algodão (um para cada olho), compressa fria, não usar lente, não dividir toalha e travesseiro; urgência se dor, sensibilidade à luz, alteração da visão ou olho muito vermelho. https://www.nhs.uk/conditions/conjunctivitis/"
  ]
},
gripe: {
  titulo: "Gripe ou resfriado",
  oque: "É uma infecção por vírus do nariz, da garganta e às vezes dos brônquios. Melhora sozinha, em geral em cerca de 1 semana, mas a tosse e o cansaço podem durar um pouco mais.",
  cuidados: [
    "Tome os remédios como está na sua receita. Se ela tem o remédio contra o vírus da gripe, comece logo e tome até o fim.",
    "Não tome antigripal ou outro remédio para febre junto com os da receita: muitos têm o mesmo remédio e você pode tomar dose a mais.",
    "Descanse e beba bastante água, sucos e sopas.",
    "Antibiótico não trata gripe. Não tome por conta própria.",
    "Não dê aspirina para criança ou adolescente.",
    "Não tome anti-inflamatório nem aspirina por conta própria: se for dengue, eles aumentam o risco de sangramento.",
    "Se você tem 60 anos ou mais, está grávida ou teve bebê há pouco, ou tem doença crônica (do pulmão, inclusive asma, do coração, dos rins ou do fígado, diabetes, obesidade grave ou baixa imunidade), volte para ser reavaliado em 2 dias, mesmo que esteja melhor.",
    "Fique em casa até 1 dia depois que a febre passar sem remédio para febre. Cubra a boca e o nariz ao tossir ou espirrar, use lenço descartável e lave as mãos.",
    "Não divida copo, talher ou garrafa e deixe a casa arejada. Depois de sarar, tome a vacina da gripe todo ano."
  ],
  volte: [
    "Falta de ar, respiração rápida ou cansaço para respirar.",
    "Dor ou aperto no peito que não passa.",
    "Lábios ou rosto arroxeados.",
    "Febre por mais de 3 dias, ou a febre volta depois de 2 dias sem febre.",
    "Confusão, sonolência fora do normal ou fraqueza muito grande.",
    "Urina muito pouca, boca muito seca ou tontura ao levantar.",
    "Piora de doença que você já tem, como asma, bronquite, problema de coração ou diabetes.",
    "Sangue no catarro.",
    "Dor forte e contínua na barriga, vômitos que não param, sangramento pelo nariz ou pela gengiva, ou manchas vermelhas na pele, principalmente quando a febre começa a baixar."
  ],
  fontes: [
    "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: caso suspeito (item 10.1), sinais de alarme (quadro 1), não usar salicilatos nem anti-inflamatórios e retorno imediato se sangramento ou sinal de alarme (item 6.1.2); Guia de Manejo e Tratamento de Influenza 2023, fluxograma: retorno em 48 h na síndrome gripal com fator de risco",
    "Ministério da Saúde. Guia de Manejo e Tratamento de Influenza 2023: sinais de agravamento (dispneia, febre por mais de 3 dias ou retorno após 48 h sem febre, alteração do sensório, hipotensão, diurese baixa, desidratação, piora de doença de base); oseltamivir preferencialmente nas primeiras 48 h; sintomáticos e líquidos; risco de síndrome de Reye com ácido acetilsalicílico em menores de 19 anos. https://bvsms.saude.gov.br/bvs/publicacoes/guia_manejo_tratamento_influenza_2023.pdf",
    "Ministério da Saúde. Gripe (influenza), Saúde de A a Z: higiene das mãos, etiqueta respiratória, não compartilhar objetos, ambientes ventilados, afastamento até 24 h sem febre sem antitérmico, vacinação anual. https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/g/gripe-influenza",
    "NHS. Flu: antibiótico não funciona para gripe; não somar antigripais ao paracetamol (risco de dose a mais); urgência se dor no peito, falta de ar intensa ou sangue na tosse. https://www.nhs.uk/conditions/flu/"
  ]
},
tosse: {
  titulo: "Tosse",
  oque: "A tosse que começa com um resfriado quase sempre é causada por vírus e antibiótico não ajuda. Ela pode durar até 3 a 4 semanas, melhorando aos poucos.",
  cuidados: [
    "Tome e use os remédios como está na sua receita.",
    "Mel, puro ou em chá morno, pode aliviar a tosse, principalmente à noite. Nunca dê mel para bebê com menos de 1 ano.",
    "Beba bastante água e lave o nariz com soro fisiológico.",
    "Antibiótico não trata tosse causada por vírus. Não tome por conta própria.",
    "Não tome nem dê xarope para tosse por conta própria, principalmente para crianças.",
    "Não fume e fique longe de fumaça.",
    "Cubra a boca com o braço ou com um lenço ao tossir e lave as mãos."
  ],
  volte: [
    "Falta de ar ou chiado no peito.",
    "Sangue no catarro.",
    "Febre alta ou febre que não passa.",
    "A tosse piora em vez de melhorar.",
    "Crises de tosse fortes que terminam em vômito ou num ruído agudo ao puxar o ar.",
    "Tosse por 3 semanas ou mais: precisa fazer o exame do catarro para tuberculose.",
    "Perda de peso sem explicação ou rouquidão que não passa."
  ],
  fontes: [
    "NICE NG120. Cough (acute): antimicrobial prescribing, 2019, rec. 1.1.5 e 1.2.1: duração de até 3 a 4 semanas; autocuidado (mel acima de 1 ano); procurar ajuda se piora rápida ou importante. https://www.nice.org.uk/guidance/ng120",
    "Irwin RS et al. Classification of Cough as a Symptom in Adults and Management Algorithms — CHEST Guideline (Chest 2018;153:196).",
    "Malesker MA et al. Treatment for Acute Cough Associated With the Common Cold — CHEST (Chest 2017).",
    "Oduwole O et al. Honey for acute cough in children (Cochrane 2018;CD007094).",
    "Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019: sintomático respiratório é quem tem tosse há 3 semanas ou mais; colher escarro.",
    "Ministério da Saúde. Nota Técnica Conjunta nº 165/2025 — coqueluche (tosse em crises, vômito após a tosse, guincho inspiratório). https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2025/nota-tecnica-conjunta-no-165-2025-dpni-svsa-ms.pdf",
    "EMA 2015: codeína contraindicada para tosse em menores de 12 anos; Morice AH et al. ERS guidelines on chronic cough (Eur Respir J 2020;55:1901136): perda de peso, rouquidão e hemoptise como sinais de alarme."
  ]
},
pac: {
  titulo: "Pneumonia",
  oque: "É uma infecção no pulmão. Com o tratamento, a febre costuma passar em até 1 semana, mas a tosse, o catarro e o cansaço melhoram aos poucos e podem durar algumas semanas.",
  cuidados: [
    "Tome os remédios como está na sua receita.",
    "Tome o antibiótico até o último dia, mesmo que melhore antes.",
    "Volte para ser reavaliado em 2 a 3 dias, mesmo que esteja melhor, como o médico combinou.",
    "Descanse e beba bastante água.",
    "Não fume e fique longe de fumaça.",
    "É esperado que a tosse e o catarro durem de 4 a 6 semanas, e o cansaço, alguns meses, desde que você vá melhorando aos poucos."
  ],
  volte: [
    "Falta de ar que aumenta, ou respiração muito rápida.",
    "Confusão, sonolência fora do normal ou dificuldade para acordar.",
    "Lábios ou pontas dos dedos arroxeados.",
    "Tontura forte, desmaio ou pele fria e pálida.",
    "Febre que continua depois de 3 dias de antibiótico, ou você não começa a melhorar em 3 dias.",
    "Dor no peito que piora, ou sangue no catarro.",
    "Vomita tudo e não consegue tomar o remédio nem beber água."
  ],
  fontes: [
    "Metlay JP et al. ATS/IDSA: Diagnosis and Treatment of Adults with Community-acquired Pneumonia (Am J Respir Crit Care Med 2019;200:e45).",
    "Corrêa RA et al. Recomendações da SBPT para PAC em adultos imunocompetentes (J Bras Pneumol 2018;44:405): reavaliação clínica em 48–72 h.",
    "NICE NG250. Pneumonia: diagnosis and management, 2025, rec. 1.10.1 (febre resolve em 1 semana; dor e catarro bem menores em 4 semanas; tosse e falta de ar em 6 semanas; cansaço até 3 meses) e 1.10.3 (procurar ajuda se piora rápida, sem melhora em 3 dias ou mal-estar sistêmico). https://www.nice.org.uk/guidance/ng250",
    "NHS. Pneumonia: emergência se falta de ar intensa, pele ou lábios azulados, sangue na tosse ou confusão de início súbito; repouso, líquidos, não fumar. https://www.nhs.uk/conditions/pneumonia/"
  ]
},
asma: {
  titulo: "Crise de asma",
  oque: "A asma é uma inflamação dos brônquios, os canos que levam o ar ao pulmão: na crise eles se fecham e dão chiado, tosse e falta de ar. Não tem cura, mas o tratamento de todos os dias evita novas crises.",
  cuidados: [
    "Tome e use os remédios como está na sua receita. Tome os comprimidos da crise até o último dia, mesmo que melhore.",
    "Se a sua receita tem uma bombinha só (budesonida com formoterol), ela é de controle e de alívio ao mesmo tempo: use todos os dias, mesmo sem sintomas, e 1 jato a mais se tiver falta de ar ou chiado. No máximo 12 jatos por dia, somando todos.",
    "Se a sua receita tem duas bombinhas, a de alívio é para quando tiver falta de ar ou chiado, e a de controle deve ser usada todos os dias, mesmo sem sintomas. Bombinha em spray: use com o espaçador, como foi ensinado.",
    "Depois de usar a bombinha de controle, enxágue a boca e cuspa a água.",
    "Marque consulta no posto de saúde nos próximos dias, em até 1 semana, para rever o tratamento. Leve suas bombinhas.",
    "Fique longe de fumaça (cigarro, fogão a lenha, queimadas), poeira e cheiros fortes. Se você fuma, peça ajuda no posto para parar.",
    "Tome a vacina da gripe todo ano."
  ],
  volte: [
    "Falta de ar forte, a ponto de não conseguir falar uma frase inteira.",
    "Lábios ou pontas dos dedos arroxeados.",
    "A bombinha de alívio não melhora a falta de ar, ou você precisa dela de novo antes do horário da receita.",
    "O chiado e a falta de ar pioram mesmo usando os remédios.",
    "Sonolência, confusão ou cansaço muito grande para respirar."
  ],
  fontes: [
    "Global Initiative for Asthma (GINA) 2026 — Global Strategy for Asthma Management and Prevention: alta da emergência (completar o corticoide oral, tratamento de controle, técnica inalatória, plano de ação escrito, retorno em até 1 semana; manutenção e alívio com budesonida-formoterol, MART, máx. 12 inalações por dia), evitar fumaça, vacina da gripe. https://ginasthma.org",
    "Ministério da Saúde. Asma, Saúde de A a Z: não tem cura, mas o tratamento controla; acompanhamento na Unidade Básica de Saúde. https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/asma",
    "NHS. Asthma attack: emergência se piora ou se não melhora com a bombinha de alívio; consulta em até 2 dias após a crise. https://www.nhs.uk/conditions/asthma/asthma-attack/",
    "Ministério da Saúde. Guia de Manejo e Tratamento de Influenza 2023: asma como condição de risco para complicações da gripe. https://bvsms.saude.gov.br/bvs/publicacoes/guia_manejo_tratamento_influenza_2023.pdf"
  ]
},
geca: {
  titulo: "Diarreia e vômitos (gastroenterite)",
  oque: "É uma infecção do estômago e do intestino, quase sempre por vírus ou por água e comida contaminadas. O vômito costuma parar em 1 a 2 dias e a diarreia em até 1 semana, e o mais importante é não ficar desidratado.",
  cuidados: [
    "Tome os remédios como está na sua receita.",
    "Beba mais líquido que o normal: água, água de coco, sopa, chá ou o soro da receita. Tome um pouco depois de cada evacuação ou vômito, em goles pequenos e frequentes.",
    "Prepare o soro do jeito que está escrito no envelope, com água filtrada ou fervida.",
    "Não tome refrigerante e não adoce o chá ou o suco.",
    "Continue comendo, em pequenas porções, comida leve. Evite frituras e comida gordurosa.",
    "Não tome remédio para prender o intestino por conta própria, principalmente se tiver febre ou sangue nas fezes.",
    "Lave bem as mãos depois de usar o banheiro e antes de mexer com comida. Se puder, não prepare comida para outras pessoas e fique em casa até 2 dias depois que a diarreia e o vômito pararem."
  ],
  volte: [
    "Não consegue beber nada, ou vomita tudo o que bebe.",
    "Urina muito pouca ou muito escura, muita sede ou boca muito seca.",
    "Tontura forte ao levantar ou desmaio.",
    "Sangue ou pus nas fezes.",
    "Dor de barriga muito forte ou que não passa.",
    "Confusão ou sonolência fora do normal.",
    "A diarreia piora (mais vezes ou mais quantidade) ou não melhora em 2 dias."
  ],
  fontes: [
    "Ministério da Saúde. Manejo do paciente com diarreia (cartaz), 2023: Plano A (mais líquido após cada evacuação ou vômito, em pequenas quantidades; sem refrigerante e sem adoçar chá ou suco; manter a alimentação habitual; voltar se não melhorar em 2 dias ou se piora da diarreia, vômitos repetidos, sangue nas fezes, diminuição da urina, muita sede ou recusa de alimentos); antidiarreicos não devem ser usados. https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dda",
    "Shane AL et al. IDSA Clinical Practice Guidelines for Infectious Diarrhea (Clin Infect Dis 2017;65:e45): reidratação oral; evitar antimotilidade se febre ou sangue nas fezes.",
    "Riddle MS et al. ACG Clinical Guideline: acute diarrheal infections in adults (Am J Gastroenterol 2016;111:602).",
    "NHS. Diarrhoea and vomiting: duração (vômito 1 a 2 dias, diarreia 5 a 7 dias); goles pequenos; evitar comida gordurosa; ficar em casa até 2 dias sem sintomas; não preparar comida para outros. https://www.nhs.uk/conditions/diarrhoea-and-vomiting/"
  ]
},
nauseas: {
  titulo: "Enjoo e vômitos",
  oque: "Enjoo e vômito têm muitas causas e, na maioria das vezes, são passageiros, como numa virose ou depois de algo que você comeu. Costumam melhorar em 1 a 2 dias, e o mais importante é não ficar desidratado.",
  cuidados: [
    "Tome os remédios como está na sua receita. O remédio para enjoo pode dar sono: depois de tomar, não dirija nem mexa com máquinas.",
    "Beba líquidos aos poucos, em goles pequenos a cada poucos minutos: água, água de coco, chá ou soro de reidratação.",
    "Quando o enjoo melhorar, volte a comer aos poucos, em pequenas porções. Prefira comida leve e evite frituras e comida gordurosa ou apimentada.",
    "Não tome refrigerante nem suco de caixinha.",
    "Descanse."
  ],
  volte: [
    "Vômito com sangue ou parecido com borra de café.",
    "Vômito verde-escuro ou com cheiro de fezes, ou barriga inchada sem conseguir soltar gases nem evacuar.",
    "Dor de barriga muito forte, ou a barriga fica dura.",
    "Dor de cabeça forte e repentina, pescoço duro, confusão, sonolência fora do normal, fala enrolada ou fraqueza de um lado do corpo.",
    "Dor ou aperto no peito, falta de ar ou suor frio.",
    "Não consegue beber nada, urina muito pouca ou muito escura, ou tontura forte ao levantar.",
    "Os vômitos continuam por mais de 2 dias."
  ],
  fontes: [
    "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 48 — Nausea, Vomiting, and Indigestion: causas, complicações (desidratação, sangramento) e sinais de causa grave (obstrução, peritonite, causa neurológica, isquemia miocárdica).",
    "NHS. Diarrhoea and vomiting: goles pequenos, evitar comida gordurosa ou apimentada, evitar refrigerante e suco; urgência se vômito com sangue ou borra de café, vômito verde, dor de barriga forte e súbita, pescoço duro, dor de cabeça súbita e intensa, confusão; procurar atendimento se vômito por mais de 2 dias. https://www.nhs.uk/conditions/diarrhoea-and-vomiting/",
    "Ministério da Saúde. Manejo do paciente com diarreia (cartaz), 2023: líquidos em pequenas quantidades e maior frequência após cada vômito. https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dda",
    "Bula do dimenidrinato + piridoxina (Anvisa): sonolência; evitar dirigir ou operar máquinas."
  ]
},
dispepsia: {
  titulo: "Azia e queimação no estômago (gastrite e refluxo)",
  oque: "É uma irritação do estômago ou a subida do ácido do estômago para o esôfago, o canal que leva a comida da boca até o estômago, e dá queimação, azia e sensação de estômago cheio. Costuma melhorar com o tratamento e com mudanças na alimentação.",
  cuidados: [
    "Tome os remédios como está na sua receita, nos horários certos. Alguns precisam ser tomados em jejum, antes do café da manhã.",
    "Coma porções menores, mais vezes ao dia. Não se deite logo depois de comer: espere pelo menos 2 horas e evite comer perto da hora de dormir.",
    "Diminua bebida alcoólica, café, frituras e comida gordurosa ou apimentada. Não fume.",
    "Não tome anti-inflamatório nem aspirina por conta própria: eles irritam o estômago. Se um médico receitou, não pare sem falar com ele.",
    "Se a queimação piora deitado, levante a cabeceira da cama com calços ou tijolos (travesseiros a mais não ajudam). Se estiver acima do peso, emagrecer ajuda.",
    "Procure o posto de saúde se não melhorar com 4 semanas de tratamento ou se a queimação voltar quando parar o remédio.",
    "Procure também o posto de saúde se você tem 40 anos ou mais, se perdeu peso sem explicação, tem anemia ou alguém da família teve câncer de estômago: pode ser preciso um exame com uma câmera pela boca (endoscopia)."
  ],
  volte: [
    "Vômito com sangue ou parecido com borra de café.",
    "Fezes pretas, como piche, ou com sangue.",
    "Dor ou aperto no peito ou no alto da barriga com suor frio, falta de ar ou dor que vai para o braço, o pescoço ou o queixo.",
    "Tontura forte, desmaio ou palidez.",
    "Vômitos que não param.",
    "A comida para no caminho e você não consegue engolir.",
    "Dor de barriga muito forte e repentina, ou a barriga fica dura ou dói muito ao encostar."
  ],
  fontes: [
    "NHS. Stomach ulcer: pronto-socorro se vômito com sangue, fezes pretas, dor de barriga intensa ou dor ao tocar a barriga. https://www.nhs.uk/conditions/stomach-ulcer/",
    "Moayyedi PM et al. ACG and CAG Clinical Guideline: Management of Dyspepsia (Am J Gastroenterol 2017;112:988): evitar anti-inflamatórios; sinais de alarme.",
    "Coelho LGV et al. V Consenso Brasileiro sobre Helicobacter pylori (Arq Gastroenterol 2026;63:e26043), enunciado 18: endoscopia se sinais de alarme, 40 anos ou mais com dispepsia, falha do tratamento ou parente de 1º grau com câncer gástrico.",
    "Katz PO et al. ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease (Am J Gastroenterol 2022;117:27): perder peso, elevar a cabeceira, evitar refeições 2 a 3 h antes de deitar, parar de fumar.",
    "NICE CG184. Gastro-oesophageal reflux disease and dyspepsia in adults, 2014 (atualizado 2019): inibidor de bomba de prótons por 4 semanas e reavaliar se não melhora ou se volta. https://www.nice.org.uk/guidance/cg184",
    "Gulati M et al. 2021 AHA/ACC Guideline for the Evaluation and Diagnosis of Chest Pain (Circulation 2021;144:e368): dor epigástrica como apresentação de isquemia. https://doi.org/10.1161/CIR.0000000000001029",
    "NHS. Indigestion e Heartburn and acid reflux: refeições menores, não comer 3 a 4 h antes de dormir, elevar a cabeceira 10 a 20 cm (não com travesseiros), não tomar ibuprofeno ou aspirina sem receita, não parar remédio receitado sem falar com o médico; procurar o médico se vômito ou fezes com sangue, dificuldade para engolir, perda de peso. https://www.nhs.uk/conditions/indigestion/"
  ]
},
constipacao: {
  titulo: "Intestino preso (constipação)",
  oque: "É quando você evacua menos vezes que o normal, com fezes duras e esforço. Na maioria das vezes melhora em alguns dias com mais água, mais fibras, mais movimento e o remédio da receita.",
  cuidados: [
    "Tome os remédios como está na sua receita. Use o laxante só pelo tempo indicado e não use laxante nem lavagem intestinal por conta própria.",
    "Beba bastante água, pelo menos 2 litros por dia, se o seu médico não pediu para limitar os líquidos.",
    "Coma mais fibras, aumentando aos poucos: frutas com casca e bagaço, verduras, legumes, feijão, aveia e pão ou arroz integral.",
    "Caminhe ou faça alguma atividade física todos os dias.",
    "Não segure a vontade de evacuar. Tente ir ao banheiro sempre no mesmo horário, sem pressa, com os pés apoiados num banquinho.",
    "Se a receita tem óleo mineral: não tome junto com a comida e não use por mais tempo que o da receita. Não dê para criança com menos de 6 anos, para pessoa acamada ou para quem se engasga ao engolir. Pare o óleo se tiver enjoo, vômito ou dor de barriga.",
    "Procure o posto de saúde se o intestino mudou de repente e você tem mais de 50 anos, se perdeu peso sem explicação ou se a prisão de ventre não melhora com o tratamento."
  ],
  volte: [
    "Vômitos, com a barriga inchada e sem conseguir soltar gases.",
    "Dor de barriga muito forte, ou a barriga fica dura.",
    "Sangue nas fezes ou fezes pretas, como piche.",
    "Fraqueza, tontura ou palidez junto com o sangramento."
  ],
  fontes: [
    "Bula do óleo mineral (Teuto), Anvisa: contraindicado em menores de 6 anos; evitar com náuseas, vômitos, dor abdominal, gravidez, dificuldade para engolir, refluxo e em acamados; não administrar com alimentos; no máximo 1 semana sem orientação médica",
    "Chang L et al. AGA–ACG Clinical Practice Guideline: Pharmacological Management of Chronic Idiopathic Constipation (Gastroenterology 2023): fibras e laxantes osmóticos.",
    "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 49 — Diarrhea and Constipation: sinais de alarme (sangramento, anemia, perda de peso, início recente após os 50 anos, obstrução).",
    "Bharucha AE et al. American Gastroenterological Association technical review on constipation (Gastroenterology 2013;144:218). https://doi.org/10.1053/j.gastro.2012.10.028",
    "NHS. Constipation (adultos): fibras aos poucos, água, atividade física, horário regular, não segurar a vontade, pés num banquinho; laxante por pouco tempo; procurar o médico se sangue nas fezes, perda de peso, mudança súbita do hábito ou sem melhora com o tratamento. https://www.nhs.uk/conditions/constipation/",
    "Bula do óleo mineral (Anvisa; ex.: Rioquímica): evitar em acamados, dificuldade para engolir, náuseas, vômitos, dor abdominal, gravidez e refluxo; não administrar junto com alimentos; risco de pneumonia lipoídica por aspiração; laxante por no máximo 1 semana sem orientação médica."
  ]
},
/* Rascunho ALTA, lote 2 (2026-10-17): cefaleia, lombalgia, TCE leve, vertigem, infecção urinária, cólica, dor abdominal, entorse.
   Não conferido. Relatório: .rascunhos/altas-2.md */
cefaleia: {
  titulo: "Dor de cabeça",
  oque: "A maioria das dores de cabeça não é grave: vem de tensão, cansaço, fome, falta de sono ou enxaqueca. Costuma melhorar em algumas horas ou poucos dias.",
  cuidados: [
    "Tome os remédios como está na sua receita.",
    "Se aparecer febre, não tome anti-inflamatório, nem o que está na receita, até ser examinado de novo: se for dengue, aumenta o risco de sangramento.",
    "Beba bastante água, não fique muito tempo sem comer e procure dormir bem.",
    "Na crise, descanse num lugar calmo, com pouca luz e pouco barulho.",
    "Evite bebida alcoólica e muito tempo seguido olhando telas.",
    "Não tome remédio para dor de cabeça em mais de 10 dias por mês: o excesso de remédio também causa dor de cabeça.",
    "Se as crises são frequentes, procure o posto de saúde para acompanhar."
  ],
  volte: [
    "A pior dor de cabeça da sua vida, ou uma dor muito forte que começa de repente, como uma pancada.",
    "Febre com pescoço duro, ou manchas na pele que não somem ao apertar.",
    "Fraqueza, dormência ou formigamento de um lado do corpo, boca torta ou fala enrolada.",
    "Confusão, sonolência difícil de acordar, desmaio ou convulsão.",
    "Perda ou mudança da visão, visão dupla, ou olho vermelho e muito dolorido.",
    "Dor que piora a cada dia ou que acorda você durante a noite.",
    "Vômitos que não param.",
    "Dor de cabeça depois de uma batida na cabeça."
  ],
  fontes: [
    "Speciali JG et al. Protocolo Nacional para Diagnóstico e Manejo das Cefaleias nas Unidades de Urgência do Brasil, 2018. Academia Brasileira de Neurologia e Sociedade Brasileira de Cefaleia: sinais de alerta; seguimento na unidade básica.",
    "Do TP et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list (Neurology 2019;92:134): início súbito, febre, sinais neurológicos, padrão progressivo, piora noturna, após trauma. https://doi.org/10.1212/WNL.0000000000006697",
    "NICE CG150. Headaches in over 12s: diagnosis and management (atualizada 2021): cefaleia por uso excessivo de analgésico (analgésico simples em 15 dias ou mais, ou combinados em 10 dias ou mais por mês). https://www.nice.org.uk/guidance/cg150",
    "NHS. Headaches (revisado em 17/04/2024): água, descanso, refeições regulares, evitar álcool e telas; pronto-socorro se início súbito e forte, fraqueza, fala, confusão, perda de visão, febre com pescoço duro, manchas que não somem, trauma recente. https://www.nhs.uk/conditions/headaches/",
    "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue."
  ]
},
lombalgia: {
  titulo: "Dor nas costas ou dor muscular",
  oque: "Na maioria das vezes a dor vem de músculos e ligamentos, sem lesão grave na coluna. Costuma melhorar bastante em poucas semanas.",
  cuidados: [
    "Tome os remédios como está na sua receita. Alguns podem dar sono: se for o seu caso, não dirija.",
    "Continue se movimentando e volte às atividades do dia a dia aos poucos. Ficar deitado na cama por muitos dias atrasa a melhora.",
    "Calor no local alivia: bolsa de água morna enrolada numa toalha, para não queimar a pele.",
    "Caminhar e fazer alongamentos leves ajudam a recuperar.",
    "Se aparecer febre ou dor no corpo todo, não tome anti-inflamatório, nem o que está na receita, até ser examinado de novo: se for dengue, aumenta o risco de sangramento.",
    "Procure o posto de saúde se a dor não melhorar em algumas semanas, se você já teve câncer ou se está perdendo peso sem explicação."
  ],
  volte: [
    "Fraqueza, dormência ou formigamento nas pernas, ou fraqueza que vai piorando.",
    "Dormência na região entre as pernas, em volta dos genitais ou do ânus.",
    "Não consegue urinar, ou perde o controle da urina ou das fezes.",
    "Febre ou calafrios junto com a dor nas costas.",
    "Dor muito forte que começa de repente ou piora rápido.",
    "Dor no peito ou falta de ar.",
    "Dor depois de uma queda ou acidente."
  ],
  fontes: [
    "NICE NG59. Low back pain and sciatica in over 16s: assessment and management, 2016 (atualizada 2020): manter-se ativo e voltar às atividades; sinais de alerta (síndrome da cauda equina, infecção, câncer, fratura). https://www.nice.org.uk/guidance/ng59",
    "Qaseem A et al. ACP Guideline: Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain (Ann Intern Med 2017;166:514): calor superficial; a maioria melhora com o tempo.",
    "NHS. Back pain (revisado em 05/03/2026): manter-se ativo, não ficar muito tempo na cama, calor ou gelo enrolado em toalha, alongamentos; pronto-socorro se fraqueza ou dormência nas pernas, dormência em volta dos genitais ou do ânus, alteração para urinar ou evacuar, dor no peito, após acidente; febre ou dor súbita e forte. https://www.nhs.uk/conditions/back-pain/",
    "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue."
  ]
},
contratura: {
  titulo: "Dor no pescoço, torcicolo ou contratura muscular",
  oque: "Na maioria das vezes a dor vem de músculos contraídos do pescoço e dos ombros, depois de má postura, esforço ou um movimento brusco. Costuma melhorar em poucos dias a algumas semanas.",
  cuidados: [
    "Tome os remédios como está na sua receita. Alguns podem dar sono: se for o seu caso, não dirija e não beba bebida alcoólica.",
    "Calor no local alivia: bolsa de água morna enrolada numa toalha, para não queimar a pele.",
    "Continue se movimentando e mexa o pescoço devagar, dentro do limite da dor. Ficar parado piora a rigidez.",
    "Durma com um travesseiro baixo e firme e evite ficar muito tempo na mesma posição, como olhando o celular ou o computador.",
    "Se aparecer febre ou dor no corpo todo, não tome o anti-inflamatório da receita até ser examinado de novo: se for dengue, aumenta o risco de sangramento.",
    "Se a dor não melhorar em algumas semanas ou voltar com frequência, procure o posto de saúde: a fisioterapia pode ajudar."
  ],
  volte: [
    "Fraqueza, dormência ou formigamento nos braços ou nas pernas, ou dificuldade para andar.",
    "Perda do controle da urina ou das fezes.",
    "Febre com pescoço duro, dor de cabeça forte, vômitos ou manchas na pele.",
    "Dor de cabeça muito forte que começa de repente, visão dupla, pálpebra caída, tontura forte, fala enrolada ou boca torta.",
    "Dor no peito, falta de ar ou suor frio.",
    "Dor que começou depois de queda, batida ou acidente.",
    "Dor que piora a cada dia, que não deixa dormir, ou perda de peso sem explicação."
  ],
  fontes: [
    "NHS. Neck pain (revisado em 27/04/2023): paracetamol ou ibuprofeno, travesseiro baixo e firme, calor, manter-se em movimento; procurar o médico se não melhorar em algumas semanas ou se formigamento ou fraqueza no braço. https://www.nhs.uk/conditions/neck-pain/",
    "Finucane LM et al. International Framework for Red Flags for Potential Serious Spinal Pathologies. J Orthop Sports Phys Ther 2020;50(7):350-372. https://doi.org/10.2519/jospt.2020.9971",
    "Harrison's Principles of Internal Medicine, 22ª ed. (2025), cap. 19 — Neck Pain: evolução favorável; AINE, paracetamol, calor ou frio; ciclobenzaprina 5–10 mg à noite; fisioterapia com exercício supervisionado; sinais de alarme (mielopatia, câncer, infecção, trauma).",
    "Blanpied PR et al. Neck Pain: Revision 2017. Clinical Practice Guidelines (APTA/JOSPT). J Orthop Sports Phys Ther 2017;47(7):A1-A83. https://doi.org/10.2519/jospt.2017.0302",
    "Ministério da Saúde. Dengue: diagnóstico e manejo clínico — adulto e criança, 6ª ed., 2024 (AINE contraindicado na suspeita de dengue)."
  ]
},
tce: {
  titulo: "Batida na cabeça (traumatismo leve)",
  oque: "Você bateu a cabeça, mas o exame não mostrou sinal de lesão grave. Dor de cabeça leve, tontura e cansaço podem durar até 2 semanas e costumam passar sozinhos.",
  cuidados: [
    "Nas primeiras 24 horas, um adulto precisa ficar junto com você o tempo todo, para chamar ajuda se aparecer algum dos sinais abaixo.",
    "Tome os remédios como está na sua receita.",
    "Gelo enrolado num pano no local da batida alivia o inchaço. Use por alguns minutos, várias vezes ao dia.",
    "Descanse. Pode dormir normalmente.",
    "Não beba álcool, não use drogas e não tome remédio para dormir ou calmante sem orientação do médico.",
    "Não dirija até estar totalmente recuperado. Volte ao trabalho ou à escola aos poucos. Esporte de contato, como futebol ou luta, só depois de pelo menos 3 semanas e sem nenhum sintoma.",
    "Procure o posto de saúde se os sintomas durarem mais de 2 semanas."
  ],
  volte: [
    "Dor de cabeça que piora, mesmo com o remédio.",
    "Vomitou mais de uma vez.",
    "Sonolência difícil de acordar, confusão ou comportamento diferente do normal.",
    "Desmaio ou convulsão.",
    "Fraqueza, dormência ou formigamento em braço ou perna, ou dificuldade para andar.",
    "Fala enrolada, visão dupla ou embaçada, ou dificuldade para ouvir.",
    "Sai líquido claro ou sangue pelo nariz ou pelo ouvido.",
    "Uma pupila (a bolinha preta do olho) fica maior que a outra."
  ],
  fontes: [
    "NICE NG232. Head injury: assessment and early management, 2023, seção de alta: orientação escrita, adulto responsável junto nas primeiras 24 h, sinais para retorno. https://www.nice.org.uk/guidance/ng232",
    "NHS. Head injury and concussion (revisado em 29/05/2025): gelo enrolado em pano, descanso, dormir normalmente, adulto junto por pelo menos 24 h; evitar álcool, drogas e remédio para dormir, não dirigir até recuperar, esporte de contato só após 3 semanas; sintomas até 2 semanas; sinais de emergência. https://www.nhs.uk/conditions/head-injury-and-concussion/",
    "Valente JH et al. ACEP Clinical Policy: Mild Traumatic Brain Injury (Ann Emerg Med 2023;81:e63): orientação de alta e retorno. https://pubmed.ncbi.nlm.nih.gov/37085214/",
    "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024, cap. 63, Traumatismo cranioencefálico: sinais de alerta na alta."
  ]
},
vertigem: {
  titulo: "Tontura que gira (labirintite ou vertigem)",
  oque: "É a sensação de que tudo está girando, quase sempre vinda do labirinto, que fica dentro do ouvido. Costuma melhorar em alguns dias a poucas semanas.",
  cuidados: [
    "Tome os remédios como está na sua receita. O remédio para tontura dá sono: não dirija nem mexa em máquinas enquanto estiver tomando.",
    "O remédio para tontura que dá sono deve ser usado só pelos dias da receita: usado por muito tempo, ele atrasa a recuperação do labirinto.",
    "Na crise, deite-se parado num quarto calmo e escuro. Se a tontura vier de repente, sente-se logo para não cair.",
    "Mexa a cabeça devagar. Para sair da cama, sente-se primeiro na beirada por um minuto e só depois levante.",
    "Evite se curvar para pegar coisas no chão (agache) e esticar o pescoço para pegar coisas no alto.",
    "Deixe uma luz acesa se for levantar à noite e tire do caminho tapetes e objetos que façam tropeçar.",
    "Depois que a crise melhorar, volte a se movimentar aos poucos: isso ajuda o labirinto a se acostumar."
  ],
  volte: [
    "Não consegue ficar em pé ou andar, mesmo apoiado.",
    "Visão dupla, fala enrolada ou dificuldade para engolir.",
    "Fraqueza, dormência ou formigamento no rosto, num braço ou numa perna.",
    "Dor de cabeça forte e repentina, ou dor forte na nuca.",
    "Perda da audição de repente.",
    "Vômitos que não param e não deixam você beber água nem tomar o remédio.",
    "Febre alta junto com a tontura."
  ],
  fontes: [
    "Edlow JA et al. GRACE-3: Acute dizziness and vertigo in the emergency department (Acad Emerg Med 2023;30:442): sinais de AVC; supressor vestibular por poucos dias, pois atrasa a compensação; reabilitação vestibular. https://doi.org/10.1111/acem.14728",
    "Bhattacharyya N et al. AAO-HNS Clinical Practice Guideline: Benign Paroxysmal Positional Vertigo (Update) (Otolaryngol Head Neck Surg 2017;156:S1): não usar supressor vestibular de rotina; risco de queda.",
    "NHS. Vertigo (revisado em 02/05/2023): deitar no escuro na crise, mexer a cabeça devagar, sentar ao ficar tonto, luz à noite, sentar na beirada antes de levantar, não se curvar nem esticar o pescoço; pronto-socorro se visão dupla, perda de audição, fala alterada, fraqueza ou dormência; procurar atendimento se dor de cabeça forte, vômitos ou febre alta. https://www.nhs.uk/conditions/vertigo/",
    "American Geriatrics Society. 2023 AGS Beers Criteria (J Am Geriatr Soc 2023;71:2052): anti-histamínico de 1ª geração e benzodiazepínico aumentam sonolência e quedas no idoso."
  ]
},
itu: {
  titulo: "Infecção urinária",
  oque: "É uma infecção da urina causada por bactéria, quase sempre na bexiga; às vezes sobe até o rim e dá febre e dor nas costas. Com o antibiótico, a melhora costuma começar em 1 a 2 dias.",
  cuidados: [
    "Tome os remédios como está na sua receita.",
    "Tome o antibiótico até o último dia da receita, mesmo que melhore antes.",
    "Beba bastante água ao longo do dia, até a urina ficar clarinha, se o seu médico não pediu para limitar os líquidos.",
    "Não segure a urina: vá ao banheiro sempre que tiver vontade.",
    "Evite café e bebida alcoólica enquanto estiver com ardência.",
    "Se a receita tem remédio para a ardência, a urina pode ficar laranja. Isso é esperado.",
    "Se aparecer febre, não tome anti-inflamatório, nem o que está na receita, até ser examinado de novo: se for dengue, aumenta o risco de sangramento."
  ],
  volte: [
    "Febre, calafrios ou tremedeira. Se você já saiu daqui com febre, volte se ela não melhorar em 2 dias de antibiótico.",
    "Dor nas costas, logo abaixo das costelas, ou dor de um lado da barriga.",
    "Vômitos que não deixam você tomar o remédio.",
    "Confusão, muita sonolência, tontura forte ou desmaio.",
    "A ardência não melhorou depois de 2 dias de antibiótico, ou piorou.",
    "Sangue na urina.",
    "Se você está grávida: febre, dor nas costas, dor ou endurecimento da barriga, ou sangramento pela vagina."
  ],
  fontes: [
    "Gupta K et al. IDSA/ESCMID International Clinical Practice Guidelines for Acute Uncomplicated Cystitis and Pyelonephritis in Women (Clin Infect Dis 2011;52:e103): tratamento completo; reavaliar se não melhora.",
    "Trautner BW et al. IDSA 2025 Guidelines on Management and Treatment of Complicated Urinary Tract Infections (Clin Infect Dis 2025, publicado online em 17/07/2025; doi:10.1093/cid/ciaf462): pielonefrite e sinais de gravidade. https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/",
    "ACOG Clinical Consensus No. 4: Urinary Tract Infections in Pregnant Individuals (Obstet Gynecol 2023;142:435): gestante com febre ou dor lombar tem pielonefrite e precisa de internação.",
    "NICE NG109. Urinary tract infection (lower): antimicrobial prescribing, 2018: beber líquidos suficientes; reavaliar se piora ou sintomas de pielonefrite (febre, dor lombar, náusea ou vômitos). https://www.nice.org.uk/guidance/ng109",
    "NHS. Urinary tract infections (revisado em 11/07/2025): beber o suficiente para a urina ficar clara, evitar café e álcool; procurar atendimento se febre ou tremedeira, dor nas costas abaixo das costelas, sangue na urina, sem melhora em 48 h; emergência se confusão ou sonolência. https://www.nhs.uk/conditions/urinary-tract-infections-utis/",
    "Bula Pyridium (fenazopiridina, Anvisa): urina alaranjada.",
    "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: anti-inflamatório contraindicado na suspeita de dengue."
  ]
},
colica: {
  titulo: "Cólica de rim ou de vesícula (pedra)",
  oque: "É uma dor forte, que vem em ondas, causada por uma pedra no caminho da urina ou na vesícula, a bolsa da bile que fica embaixo do fígado. A pedra pequena no caminho da urina costuma sair sozinha pela urina em alguns dias ou semanas.",
  cuidados: [
    "Tome os remédios como está na sua receita. Alguns podem dar sono: se for o seu caso, não dirija.",
    "Não tome outros remédios para dor por conta própria. Se aparecer febre, volte ao pronto-socorro.",
    "Pedra no rim: beba bastante água, de 2,5 a 3 litros por dia, se o seu médico não pediu para limitar os líquidos. A urina deve ficar clarinha.",
    "Pedra no rim: evite refrigerante, bebidas com cafeína e bebida alcoólica.",
    "Pedra na vesícula: prefira comidas com pouca gordura e evite frituras e os alimentos que provocam a dor.",
    "Pedra na vesícula: faça o ultrassom pedido e leve o resultado ao posto de saúde, para marcar a avaliação com o cirurgião.",
    "Pedra no rim: procure o posto de saúde para acompanhar e saber se a pedra saiu."
  ],
  volte: [
    "Febre, calafrios ou tremedeira.",
    "Urina muito pouco ou não consegue urinar.",
    "A dor não passa com os remédios da receita, ou a dor de vesícula dura mais de 6 horas.",
    "Vômitos que não param e não deixam você beber água nem tomar os remédios.",
    "Olhos ou pele amarelados, urina escura como café ou fezes claras.",
    "Tontura forte, desmaio ou confusão."
  ],
  fontes: [
    "EAU Guidelines on Urolithiasis, 2026: a maioria dos cálculos pequenos sai espontaneamente; descompressão urgente se obstrução com infecção (febre) ou rim único obstruído; hidratação. https://uroweb.org/guidelines/urolithiasis",
    "NHS. Kidney stones (revisado em 17/09/2026): beber 2,5 a 3 litros de água por dia, evitar refrigerante, cafeína e álcool, urina clara; atendimento urgente se dor intensa ou febre e tremedeira. https://www.nhs.uk/conditions/kidney-stones/",
    "NHS. Gallstones (revisado em 11/08/2025): dieta com pouca gordura enquanto aguarda a cirurgia; emergência se dor súbita e forte, febre alta ou calafrios, pele ou olhos amarelados. https://www.nhs.uk/conditions/gallstones/",
    "Gallaher JR, Charles A. Acute Cholecystitis: A Review (JAMA 2022;327:965): dor biliar que dura mais de 4 a 6 horas ou com febre sugere colecistite.",
    "Kiriyama S et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis (J Hepatobiliary Pancreat Sci 2018;25:17): febre, icterícia e dor.",
    "Bula Tramal (tramadol, Anvisa): sonolência, evitar dirigir."
  ]
},
"dor-abdominal": {
  titulo: "Dor de barriga",
  oque: "O exame de hoje não mostrou sinal de doença grave, e muitas dores de barriga melhoram sozinhas em poucos dias. Algumas doenças, porém, só se mostram com o passar das horas: por isso, fique atento aos sinais abaixo.",
  cuidados: [
    "Tome os remédios como está na sua receita.",
    "Não tome anti-inflamatório por conta própria: ele irrita o estômago e, se for dengue, aumenta o risco de sangramento.",
    "Coma pouco e comidas leves. Beba água em pequenos goles, várias vezes ao dia.",
    "Evite bebida alcoólica até melhorar.",
    "Faça os exames que foram pedidos e mostre o resultado no posto de saúde.",
    "Procure o posto de saúde se a dor continuar por mais de alguns dias ou voltar várias vezes."
  ],
  volte: [
    "A dor piora, fica contínua ou muda de lugar, por exemplo do umbigo para o lado direito de baixo da barriga.",
    "A barriga fica dura, inchada ou dói muito ao encostar ou ao andar.",
    "Vômitos que não param, ou vômito com sangue ou parecido com borra de café.",
    "Febre. Se você teve febre nos últimos dias, dor de barriga forte e contínua pode ser sinal de alarme da dengue.",
    "Não consegue soltar gases nem evacuar.",
    "Fezes pretas, como piche, ou com sangue.",
    "Tontura forte, desmaio, palidez ou suor frio.",
    "Mulher: sangramento pela vagina, ou dor com a menstruação atrasada."
  ],
  fontes: [
    "Medicina de Emergência: Abordagem Prática, 18ª ed. HC-FMUSP. Manole, 2024, cap. 25, Dor abdominal: sinais de alarme (peritonite, instabilidade, idoso, gestante), beta-hCG, reavaliação.",
    "Cartwright SL, Knudson MP. Evaluation of acute abdominal pain in adults (Am Fam Physician 2008;77:971): dor que migra, peritonite, obstrução, sangramento, gravidez ectópica.",
    "Ministério da Saúde. Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024: dor abdominal intensa e contínua é sinal de alarme; anti-inflamatório contraindicado na suspeita de dengue.",
    "NHS. Stomach ache (revisado em 26/05/2023): a maioria passa em poucos dias; procurar atendimento se piora, persiste ou volta; emergência se dor súbita ou forte, dor ao tocar a barriga, vômito com sangue ou borra de café, fezes pretas ou com sangue, não consegue evacuar nem soltar gases, desmaio. https://www.nhs.uk/symptoms/stomach-ache/"
  ]
},
entorse: {
  titulo: "Torção do tornozelo (entorse)",
  oque: "É uma lesão dos ligamentos, que seguram os ossos do tornozelo. Pelo exame, não há sinal de osso quebrado, e a maioria melhora em cerca de 2 semanas, mas pode levar algumas semanas para voltar ao normal.",
  cuidados: [
    "Tome e use os remédios como está na sua receita.",
    "Nos primeiros dias, ponha gelo enrolado num pano por 15 a 20 minutos, várias vezes ao dia. Não coloque o gelo direto na pele.",
    "Sempre que estiver sentado ou deitado, deixe o pé elevado, apoiado em travesseiros.",
    "Use a tornozeleira ou a faixa como foi orientado. Nos primeiros 1 a 2 dias, poupe o pé; depois pise e caminhe aos poucos, até onde a dor deixar: o movimento ajuda a recuperar.",
    "Faça desde cedo os exercícios leves de mexer o pé, como foi ensinado.",
    "Nos primeiros 2 dias, evite calor no local (banho quente, bolsa quente), bebida alcoólica e massagem. Evite esporte e esforço forte até o tornozelo melhorar.",
    "Procure o posto de saúde se a dor ou a sensação de tornozelo frouxo continuarem depois de 3 a 5 dias."
  ],
  volte: [
    "Pé frio, roxo, azulado ou muito pálido.",
    "Dormência ou formigamento no pé ou nos dedos.",
    "Não consegue apoiar o pé no chão nem dar 4 passos, mesmo mancando.",
    "A dor piora muito ou o inchaço aumenta, mesmo com gelo e o pé elevado.",
    "O tornozelo fica torto ou com formato diferente."
  ],
  fontes: [
    "Vuurberg G et al. Diagnosis, treatment and prevention of ankle sprains: update of an evidence-based clinical guideline (Br J Sports Med 2018;52:956): tratamento funcional com órtese e carga conforme tolerância melhor que imobilização; exercícios precoces; reexame em 3 a 5 dias. https://doi.org/10.1136/bjsports-2017-098106",
    "Stiell IG et al. Decision rules for the use of radiography in acute ankle injuries (JAMA 1993;269:1127): incapacidade de dar 4 passos. Bachmann LM et al. (BMJ 2003;326:417): regra de Ottawa.",
    "NHS. Sprains and strains (revisado em 23/04/2024): gelo por até 20 min a cada 2 a 3 h, elevar em travesseiro, evitar calor, álcool e massagem nos primeiros dias; melhora em cerca de 2 semanas; emergência se deformidade, dormência ou formigamento, pele azulada ou fria; procurar atendimento se não consegue apoiar ou o inchaço piora. https://www.nhs.uk/conditions/sprains-and-strains/",
    "NICE CKS. Sprains and strains (versão vigente, consultada em 10/2026; data da revisão a confirmar): proteção, gelo, elevação; evitar calor, álcool, corrida e massagem nas primeiras 72 h. https://cks.nice.org.uk/topics/sprains-strains/"
  ]
},
tep: {
  titulo: "Coágulo no pulmão (embolia pulmonar)",
  oque: "Um coágulo de sangue, que em geral se forma nas veias da perna, foi parar no pulmão. O seu caso é de baixo risco e pode ser tratado em casa com um remédio que afina o sangue (anticoagulante). A falta de ar e a dor costumam melhorar aos poucos, em dias a semanas.",
  cuidados: [
    "Tome o anticoagulante todos os dias, nos horários da sua receita. Não pare nem pule doses por conta própria: o tratamento dura pelo menos 3 meses.",
    "Na primeira fase do tratamento a dose é maior. Siga a receita com atenção quando a dose mudar.",
    "Não tome outros remédios para dor ou inflamação, como ibuprofeno, diclofenaco ou nimesulida, nem ácido acetilsalicílico, sem falar com o médico. Eles aumentam o risco de sangramento.",
    "Avise qualquer médico ou dentista que você está tomando anticoagulante, principalmente antes de uma cirurgia, extração de dente ou injeção.",
    "Pode fazer as atividades do dia a dia, dentro do que o cansaço permitir.",
    "Faça a consulta de retorno com o médico em até 1 semana. Leve a receita e os exames.",
    "Se estiver grávida, amamentando ou engravidar durante o tratamento, avise o médico: o remédio precisa ser trocado."
  ],
  volte: [
    "Falta de ar que piora ou que aparece em repouso.",
    "Dor no peito forte ou que piora.",
    "Desmaio, tontura forte ou coração muito acelerado.",
    "Tosse com sangue.",
    "Sangramento que não para, vômito com sangue ou parecendo borra de café, fezes pretas ou com sangue, urina vermelha.",
    "Dor de cabeça muito forte e repentina, ou fraqueza ou dormência de um lado do corpo."
  ],
  fontes: [
    "Creager MA et al. 2026 AHA/ACC Guideline for the Evaluation and Management of Acute Pulmonary Embolism in Adults (Circulation 2026;153:e977): alta precoce nas categorias A–B, retorno em até 1 semana, reavaliação até 3 meses.",
    "Bulas do Xarelto (rivaroxabana) e do Eliquis (apixabana) registradas na Anvisa: adesão, fase de ataque, interação com anti-inflamatório e ácido acetilsalicílico, sinais de sangramento, não usar na gestação e lactação.",
    "NHS. Pulmonary embolism: sintomas e tratamento com anticoagulante, sinais para procurar atendimento. https://www.nhs.uk/conditions/pulmonary-embolism/"
  ]
},
tvp: {
  titulo: "Coágulo na veia da perna (trombose venosa profunda)",
  oque: "Um coágulo de sangue entupiu uma veia funda da perna. O tratamento com um remédio que afina o sangue (anticoagulante) impede que o coágulo cresça ou vá para o pulmão. O inchaço e a dor costumam melhorar em dias a semanas.",
  cuidados: [
    "Tome o anticoagulante todos os dias, nos horários da sua receita. Não pare nem pule doses por conta própria: o tratamento dura pelo menos 3 meses.",
    "Na primeira fase do tratamento a dose é maior. Siga a receita com atenção quando a dose mudar.",
    "Caminhe normalmente, dentro do que a dor permitir. Não precisa ficar de repouso na cama. Sentado ou deitado, deixe a perna elevada.",
    "Não tome outros remédios para dor ou inflamação, como ibuprofeno, diclofenaco ou nimesulida, nem ácido acetilsalicílico, sem falar com o médico. Eles aumentam o risco de sangramento.",
    "Avise qualquer médico ou dentista que você está tomando anticoagulante.",
    "Se você saiu sem anticoagulante, faça o ultrassom da perna de novo nas datas marcadas, mesmo que esteja melhor.",
    "Faça a consulta de retorno marcada com o médico.",
    "Se estiver grávida, amamentando ou engravidar durante o tratamento, avise o médico: o remédio precisa ser trocado."
  ],
  volte: [
    "Falta de ar, dor no peito, tosse com sangue ou desmaio: pode ser coágulo no pulmão.",
    "A perna fica muito inchada, fria, arroxeada ou pálida, ou a dor fica muito forte.",
    "Sangramento que não para, vômito com sangue, fezes pretas ou com sangue, urina vermelha.",
    "Dor de cabeça muito forte e repentina, ou fraqueza ou dormência de um lado do corpo."
  ],
  fontes: [
    "Ortel TL et al. ASH 2020 guidelines: treatment of deep vein thrombosis and pulmonary embolism (Blood Adv 2020;4:4693): tratamento em casa, duração mínima de 3 meses.",
    "Stevens SM et al. CHEST Guideline 2021 (Chest 2021;160:e545): TVP distal com ultrassom seriado por 2 semanas.",
    "Kearon C et al. ACCP 9ª ed. (Chest 2012;141:e419S): caminhar cedo em vez de repouso.",
    "Bulas do Xarelto (rivaroxabana) e do Eliquis (apixabana) registradas na Anvisa: adesão, fase de ataque, interação com anti-inflamatório e ácido acetilsalicílico, sinais de sangramento.",
    "NHS. Deep vein thrombosis (DVT): perna elevada, caminhar, sinais de embolia pulmonar para procurar atendimento. https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/"
  ]
},
};
if (typeof module!=="undefined") module.exports={ALTA};

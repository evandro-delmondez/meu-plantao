# Histórico de versões

## 1.11.0 — 2026-10-09
Correções da simulação de plantão no celular (10 casos da porta).
- **Receita com escolha por toque:** acima da receita, chips para escolher entre as alternativas ("Ou"), ligar os blocos opcionais ("Se alergia a penicilina", "Se falha…") e tirar itens. Só o escolhido vai para a receita, a evolução e a cópia, renumerado; notas para o médico ("Criança", "Gestante", "CID") nunca saem na receita. Os alertas (QT, alergia) seguem a receita escolhida.
- **"+ Paciente"** no topo de todas as abas (dois toques): limpa o paciente em todas as abas — conduta, checklist, escolhas da receita, evolução, atestado, escores, calculadoras, pediatria, bomba, feridas e busca.
- **Evolução que não contradiz o paciente:** "Nega…" só a partir do checklist marcado com "−"; campo vazio sai como "não informado"; com temperatura de febre o exame diz "febril" e com FR > 20, "taquipneico"; **destino** (alta, observação, internação, transferência) no lugar de "Paciente liberado", sem padrão nas emergências.
- **Alergia à penicilina num só estado:** marcar no checklist, em Dados do paciente ou no chip de alerta liga os três e entra na evolução.
- **Busca** por início de palavra ("dente" não acha "acidente"), siglas como palavra inteira (SCA, ITU), sem "de/do/da", com as páginas "Por queixa" e os nomes comerciais.
- **Pesos começam vazios** (calculadora e Pediatria) e a calculadora avisa quando o peso não combina com o modo adulto ou pediátrico, em vez de trocar sozinha.
- **Navegação na conduta:** barra fixa de atalhos (Agora, Alarmes, Receita, Checklist, Fechar, Alta); preparo dos injetáveis, fontes e "o que mudou" recolhidos; alvos de toque maiores no celular.

## 1.10.1 — 2026-10-09
- **Correções de segurança (auditoria independente, achados críticos):**
  - noradrenalina: a bomba de infusão calcula em mcg/kg/min e agora avisa quando a dose sai de 0,05–2 mcg/kg/min, mostra o total em mcg/min ao lado e a tabela usa pontos clínicos (0,05 a 1); o cartão da sepse e a ficha trazem a conversão de mcg/min para mcg/kg/min. Antes, digitar uma dose em mcg/min na bomba dava vazão cerca de 70 vezes maior sem aviso;
  - paracetamol pediátrico (aba Pediatria): prescrito em mL com seringa oral, não mais em gotas calculadas (gotas por mL variam entre marcas); abaixo de 12 anos, teto de cerca de 2,2 mL (35 gotas da bula); limite superior arredondado para baixo.

## 1.10.0 — 2026-10-09
- **Por queixa** (nova aba em Condutas): cefaleia, tontura/vertigem/síncope, dor abdominal, dor torácica, febre e tosse/dispneia. Primeiro os sinais de alarme com o que fazer, depois o que perguntar e examinar, os caminhos que abrem a conduta e os escores úteis. Conferido por agente independente (21 correções aplicadas).
- **Alta para o paciente** em 15 condutas da porta: texto em linguagem simples, "volte ao pronto-socorro se…", para imprimir ou abrir pelo QR code numa página pública só com a orientação, sem dado do paciente. Conferido (5 correções).
- **Correções em condutas publicadas** (aprovadas pelo médico):
  - gripe, faringite, amigdalite e tosse: ibuprofeno só com dengue descartada (MS, Dengue 2024);
  - dispepsia: endoscopia a partir de 40 anos e testar e tratar o H. pylori abaixo disso (V Consenso Brasileiro, 2026);
  - gastroenterite: manter a alimentação habitual, antidiarreico não é rotina, gestante sem ciprofloxacino;
  - náuseas: fontes verificáveis no lugar de "consenso clínico", causas a procurar e sinais de retorno;
  - constipação: contraindicações do óleo mineral e alerta do Fleet (FDA 2014).

## 1.9.0 — 2026-10-08
- **Porta: atendimento em 1 tela.** No fim de cada conduta, "Fechar o atendimento": queixa, alergias, antecedentes, medicamentos, sinais vitais, exame físico (escolhido pelo sexo, idade e gestação informados), o checklist marcado, receita, orientações e atestado ou comparecimento, tudo pronto para copiar e colar no prontuário. "Novo paciente" limpa tudo; nada do paciente fica salvo.
- **Sinais de alarme no topo** de cada conduta, antes da receita, para reavaliar a classificação antes de liberar.
- Evolução: com temperatura de febre informada (≥ 37,8 °C), o exame físico padrão deixa de dizer "afebril".

## 1.8.1 — 2026-10-08
- **Ficha do biperideno** (grupo Psiquiatria): distonia aguda por haloperidol e antieméticos, com dose pediátrica por peso (teto da bula até 10 anos) e a difenidramina como alternativa, com as contraindicações. Conferida por agente independente.
- **Decisões do médico sobre as divergências entre fontes:**
  - tenecteplase no AVC: a conta de 0,25 mg/kg (AHA 2026) e a dose da faixa de peso da bula lado a lado, no cartão, na calculadora e no fluxo;
  - tenecteplase no IAM calculada pela faixa de peso no cartão, mostrando também a metade da dose a partir de 75 anos (ou só a metade, se a idade informada for ≥ 75);
  - volume na anafilaxia: 20 mL/kg com teto de 1.000 mL por bolus no adulto;
  - fenobarbital (20 mg/kg) e haloperidol (repetir em 30 min) mantidos, citando a outra fonte em "detalhes".

## 1.8.0 — 2026-10-08
- **Cartão "Agora"** no topo de 7 emergências (convulsão, agitação psicomotora, anafilaxia, sepse, IAM, AVC e PCR): etapas com tempo, até 3 ações por etapa, campo de peso (não fica salvo) com doses em mg e mL já calculadas, aviso de dose máxima, referência ao lado para conferir, "detalhes" recolhidos e atalhos para PCR guiada, intubação, bomba de infusão e fluxos. Conferido por dois agentes independentes e por uma checagem final.
- **Ficha do haloperidol** no novo grupo **Psiquiatria**.
- **Correções em conteúdo que já estava no ar:**
  - adrenalina em infusão na anafilaxia: 1 mg em 100 mL a 0,5–1 mL/kg/h (RCUK 2021) também na ficha e no preparo dos injetáveis; 250 mL fica para a bradicardia;
  - glucagon no adulto: 1 mg EV, repetível ou seguido de 1–2 mg/h (repetir a cada 5 min é a orientação pediátrica);
  - agitação: na intoxicação alcoólica, haloperidol isolado; diazepam só na abstinência alcoólica e na cocaína;
  - convulsão e abstinência alcoólica: tiamina junto com a glicose, sem atrasá-la;
  - convulsão: contraindicações do valproato EV;
  - fenitoína pediátrica: sem o teto de 1.500 mg, que é da fosfenitoína;
  - noradrenalina: dose inicial citada pela bula FDA.
- Testes do cartão e das fichas por cima também no celular.

## 1.7.0 — 2026-10-05
- **Páginas conectadas:** o remédio citado em condutas, protocolos, eletrólitos, calculadora e nas próprias fichas vira botão; a ficha abre por cima (no celular, de baixo para cima) sem perder a conduta. O botão voltar do celular e a tecla Esc fecham a ficha.
- Abaixo da receita e do "Na unidade", a linha **Fichas** lista os remédios citados.
- Ficha por cima com atalhos para a **bomba de infusão** (já com a droga escolhida) e para a aba Remédios.
- Reconhecimento de nomes compostos (KCl, sulfato de magnésio, gluconato de cálcio, insulina regular, escetamina etc.); a lidocaína do anestésico local deixa de apontar para a ficha da lidocaína antiarrítmica.
- Roteiro do acervo pessoal no claude.ai (`docs/PROJETO-CLAUDE.md`).

## 1.6.0 — 2026-09-28
- **16 fichas da sala vermelha, parte B**, com nomes comerciais: Antiarrítmicos (amiodarona, adenosina, atropina, metoprolol, lidocaína), Anticoagulantes e trombolíticos (heparina, enoxaparina, alteplase, tenecteplase) e Glicose e eletrólitos EV (insulina regular, glicose 50%, KCl, sulfato de magnésio, gluconato de cálcio, bicarbonato, NaCl 20%). Conferidas por agente independente.
- **Correções da conferência:**
  - metoprolol na emergência hipertensiva: 5 mg a cada 10 min, até 20 mg (Posicionamento Luso-Brasileiro 2020), também no protocolo;
  - hipoglicemia: tiamina junto com a glicose, sem atrasá-la;
  - miastenia grave no sulfato de magnésio: fonte corrigida para o Manual de Gestação de Alto Risco do MS.
- **Teste da PCR estável.**

## 1.5.3 — 2026-09-28
- Nomes comerciais nas 45 fichas antigas: 70 marcas conferidas na lista oficial de preços CMED (set/2026); marcas fora da lista ficaram de fora.

## 1.5.2 — 2026-09-27
- Fichas: nome comercial em letra pequena logo abaixo do princípio ativo, na lista e no título.

## 1.5.1 — 2026-09-27
- Fichas: grupos com nomes curtos (Analgésicos, Gastro, Antibióticos, Corticoides e antialérgicos) e a sala vermelha separada em Vasoativos, Sedação e intubação e Anticonvulsivantes.

## 1.5.0 — 2026-09-27
- **17 fichas da sala vermelha** (vasoativos, sedação, bloqueadores neuromusculares, anticonvulsivantes), com nomes comerciais; conferidas por agente independente.
- **Escetamina no lugar da cetamina racêmica** na IOT (calculadora, conduta e emergência pediátrica): 0,5–1 mg/kg na indução (bula Ketanest S; cerca de 2 vezes mais potente).
- **Fenobarbital:** até 50 mg/min (bula: < 60 mg/min), ampolas de 100 e 200 mg/mL e contraindicações da bula.
- **Rocurônio pediátrico:** 1 mg/kg (diretriz pediátrica S2k 2022), com nota de uso fora da bula.
- **Estado de mal:** fonte da Neurocritical Care Society 2012 incluída; cetamina sem dose com fonte retirada.

## 1.4.3 — 2026-09-26
- **Eletrólitos: hiponatremia e hipernatremia.** Inclui salina 3% (bolus, metas, limites de correção e preparo a partir do NaCl 20%), correção excessiva (SG 5% + desmopressina), SIADH, déficit de água livre e velocidade de correção. Conferido por agente independente; ajustes de citação aplicados.

## 1.4.2 — 2026-09-26
- **Acidente ofídico atualizado ao PCDT 2025 (Portaria SECTICS/MS nº 83)**, após conferência independente:
  - antibotrópico 3/6/12 frascos (antes 2–4/4–8/12);
  - antielapídico sem soro no leve, 5 no moderado e 10 no grave (antes 10 em todos);
  - incluídos via, diluição, velocidade, observação, ausência de pré-medicação e contraindicação de AINE.
- **Acidente escorpiônico conferido com o PCDT 2025 (Portaria nº 59):** doses mantidas; incluídos diluição, via intraóssea, ECG e suporte.
- **Doses por peso reorganizadas por especialidade** (IOT; choque, sepse e anafilaxia; Cardio / Vascular; Neuro; Endócrino / Metabólico; hidratação, dengue e queimaduras; Toxico / Infecto; e os blocos pediátricos), sem mudar nenhuma dose.

## 1.4.1 — 2026-09-26
- PCR:
  - metrônomo corrigido: toca mesmo antes de iniciar e o botão pulsa no ritmo;
  - próximos passos em lista numerada, com aviso nos últimos 15 s do ciclo.
- Doses por peso: a % de superfície queimada aparece só no Parkland e começa vazia.
- Feridas e mordeduras: "Precisa de sutura?" com região; o fio e o prazo de retirada entram no texto da evolução.

## 1.4.0 — 2026-09-26
- **PCR guiada** (Sala vermelha → PCR, AHA 2025):
  - cronômetro geral e ciclos de 2 min com aviso para checar o ritmo;
  - tempo desde a última adrenalina (amarelo aos 3 min, vermelho aos 5);
  - contagem de choques e sugestão do próximo passo;
  - metrônomo de 110/min, 5H e 5T;
  - registro com horário para a evolução.
- **8 protocolos em fluxo, com decisões:** IAM com supra, AVC, cetoacidose, hipercalemia, anafilaxia, crise hipertensiva, pré-eclâmpsia e hemorragia pós-parto.
- **Eletrólitos:** reposição de K, Mg, P e Ca, e hipercalemia aguda.
- **Alerta de QT na receita:** 88 remédios da lista CredibleMeds, com busca por palavra inteira.
- **Checklist "Não esquecer" nas 98 condutas.**
- **"Onde estou hoje: UPA pública / Particular":** selo RENAME nos remédios da conduta e filtro "Só RENAME" nas fichas.
- **13 categorias por especialidade** (ex.: Cardio / Vascular, Dor / Neuro / Ortop, Otorrino / Oftalmo, Toxico / Infecto). A organização que você personalizou é mantida.
- **Condutas atualizadas:**
  - anafilaxia (RCUK 2021, WAO 2020, AAAAI 2023): corticoide deixa de ser rotina e a observação passa a depender do caso;
  - pré-eclâmpsia (RBEHG 2023, MS 2022).
- **Conferência independente:** protocolos, eletrólitos, QT e PCR foram conferidos, e as correções apontadas foram aplicadas antes da publicação.

## 1.3.0 — 2026-09-26
- **Sala vermelha, parte 1:**
  - bomba de infusão: 12 drogas (vasoativas, vasodilatadores, amiodarona, sedação e analgesia), dose ↔ mL/h nos dois sentidos, diluições prontas ou próprias, tabela de doses e alerta fora da faixa;
  - intubação: checklist atualizado (DAS 2025, SCCM 2023, PREOXI, DEVICE) e ventilação inicial com peso predito.
- **Cálculos → Laboratório e ECG:** ânion gap (com albumina) e delta/delta, gasometria (Winter e compensações), sódio corrigido, osmolaridade, cálcio corrigido, QTc (Bazett e Fridericia) e ClCr. Conferidos no Harrison, 22ª ed.
- **Doses por peso com fonte em todos os blocos** (antes não tinham). A conferência independente corrigiu:
  - paracetamol em gotas (gotas por mL variam: prescrever em mL);
  - Parkland pediátrico 2–4 mL;
  - fenobarbital 15–20 mg/kg a até 50 mg/min;
  - prednisolona com teto por idade (GINA);
  - hidroxizina 0,5–0,7 mg/kg;
  - ivermectina pela tabela de peso da bula;
  - glicose 10% (ISPAD 2022);
  - salbutamol por idade;
  - tempo de infusão da fenitoína pediátrica;
  - teto do carvão ativado;
  - alertas de heparina, escetamina e potássio antes da insulina.
- **Modelos de exame físico por extenso, sem siglas,** em versões masculina e feminina (adulto e pediátrico). Modelos editados por você são mantidos.
- **Regra 5 cumprida:** peso, idade, sexo, perfis (gestante, alergia) e respostas de feridas deixam de ser salvos no aparelho; o que versões antigas salvaram é apagado ao abrir.
- **Correções:** lista de itens ocultos no Backup; nome de categoria escapado.
- **Build:** falha na hora se o JavaScript montado tiver erro de sintaxe.

## 1.2.0 — 2026-09-26
- **Nova navegação em 5 seções:** Condutas, Remédios, Sala vermelha, Documentos e Cálculos. Barra inferior no celular e trilho lateral no computador; cada seção tem a sua cor.
- **Tela inicial:**
  - busca única em condutas, fichas, escores, doses por peso, pediatria e ferramentas; acha também a conduta pelo remédio citado na receita (ex.: "adrenalina" → anafilaxia);
  - atalho `/` ou Ctrl+K abre a busca de qualquer página;
  - botão de sala vermelha, favoritos e itens abertos recentemente.
- **Sala vermelha:** condutas de emergência reunidas, com atalhos para doses de emergência por peso, emergência pediátrica e escores.
- **Tela da conduta:**
  - ações numa barra compacta;
  - alertas por perfil (gestante, idoso, rim, alergia à penicilina) no topo, antes da receita; só o perfil ligado abre os detalhes;
  - fichas dos remédios num bloco próprio, depois das orientações.
- **Checklist "Não esquecer"** em 20 condutas (anamnese, antecedentes, exame físico dirigido e sinais de alarme), com fontes. Cada item é marcado como presente (+) ou ausente (−) e vira texto na evolução ("Refere…", "Nega…", "Sem sinais de alarme…"). As marcações ficam só na memória da aba.
- **Organização:** Backup passou para Documentos; a calculadora agora se chama "Doses por peso".

## 1.1.0 — 2026-09-24
- **Nova aba Medicações:** 45 fichas em 4 grupos (analgésicos e anti-inflamatórios, antieméticos e gastro, antibióticos, corticoides e antialérgicos).
  - Cada ficha traz classe, apresentações, doses de adulto e pediátrica, diluição e administração, rim, fígado, gestação, lactação, contraindicações, alertas e fontes.
  - Calculadora pediátrica por peso, com teto por dose.
  - Busca e filtros por grupo e por via.
  - Todas as fichas passaram por dupla conferência contra as fontes (32 correções antes de publicar).
- **Condutas:** passam a mostrar atalhos para as fichas das medicações citadas.
- **Projeto profissional:**
  - código dividido em módulos;
  - build único gera as três versões;
  - verificação automática de conteúdo;
  - 37 testes automáticos (computador e celular);
  - publicação automática no GitHub Pages;
  - cache do app atualizado sozinho a cada versão.

## 1.0.0 — 2026-09-24
- **Aba Feridas:**
  - profilaxia antirrábica (MS NT 8/2022) e antitetânica (Guia de Vigilância 2024);
  - antibiótico em mordedura (IDSA 2014);
  - dose máxima de anestésico local, toxicidade (ASRA 2020) e tabela de sutura (AFP 2017).
- **NIHSS; categorias editáveis; tema claro/escuro; ícone e nome "Meu Plantão".**
- **Base:**
  - 98 condutas revisadas com fontes;
  - pediatria;
  - emergência pediátrica;
  - 15 escores;
  - evolução, atestado, calculadora, modelos e backup.

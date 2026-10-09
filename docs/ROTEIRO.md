# Roteiro

Regra: nenhuma informação clínica sem fonte; conteúdo de alto risco com conferência independente antes de publicar.

## Entregue
- [x] v1.0.0: aba Feridas (raiva, tétano, mordedura, anestésico local, sutura).
- [x] v1.1.0: aba Medicações, parte 1 (45 fichas); projeto profissional (módulos, testes, CI, GitHub Pages).
- [x] v1.2.0: navegação em 5 seções, tela inicial com busca única, sala vermelha, conduta reorganizada e checklist em 20 condutas.
- [x] v1.3.0: bomba de infusão; intubação e ventilação inicial; laboratório e ECG (ânion gap, gasometria, Na corrigido, osmolaridade, Ca corrigido, QTc, ClCr); fontes e conferência das doses por peso; exame físico sem siglas.

## Próximas entregas (em ordem)
Perfil de uso (entrevista de 2026-09-25): computador e celular por igual; UPA/PS adulto, público e particular; pediatria, obstetrícia e sala vermelha aparecem às vezes. Cada entrega traz um pedaço do visual novo e um bloco clínico.

1. **v1.4 — rede pública e particular:** seletor "onde estou hoje"; na UPA pública a receita prioriza a RENAME, na particular mostra a alternativa de farmácia. Checklists das demais 78 condutas.
2. **v1.5 — medicações, parte 2, e eletrólitos:** fichas da sala vermelha (vasoativas, sedativos, bloqueadores neuromusculares, anticonvulsivantes, antiarrítmicos, anticoagulantes, insulina, eletrólitos EV); reposição de K, Mg e P; alerta de QT longo na receita.
3. **v1.6 — protocolos em fluxo e obstetrícia:** IAM com supra, AVC, hipercalemia, CAD, crise hipertensiva, anafilaxia; pré-eclâmpsia e sulfato de magnésio.

Depois: perfil por unidade (remédios disponíveis, diluições locais, telefones de regulação e CIATox); intoxicações e antídotos; equivalência de opioides e de corticoides.

## Pendências combinadas
- **Simulação de plantão (2026-10-09, `.rascunhos/simulacao-plantao.md`):** bugs e navegação corrigidos na 1.11.0. Ficam, com conferência: alertas automáticos pelos sinais vitais e NEWS2; bloco de gravidade na pneumonia (CRB-65, texto único por faixa, esquema EV para quem fica); chips "álcool?" na agitação e agitação na lista da Sala vermelha; conduta de dor de dente; alarmes cruzados (dor epigástrica em diabético → ECG); sinônimos leigos por conduta na busca; ficha da amoxicilina com a faixa da otite (80–90 mg/kg/dia).
- **Auditoria de segurança (2026-10-09, `.rascunhos/auditoria-seguranca.md`):** 2 críticos corrigidos na 1.10.1 (noradrenalina mcg/min × mcg/kg/min na bomba; paracetamol pediátrico em gotas). Importantes a corrigir na revisão geral: peso padrão de 70 kg e troca adulto/pediátrico sem aviso, sem alerta de peso implausível; tenecteplase ≥ 75 anos divergente entre conduta `sca`/calculadora e cartão/protocolo/ficha; "U"/"UI" em textos copiáveis (ISMP); tetos ausentes (amoxicilina OMA na calculadora, `max_mg` dos antibióticos nas fichas, glicose 10% pediátrica) e ibuprofeno pediátrico 400 × 200 mg; KCl em "mg" no `ped_calc`; alertas de gestante faltando (hidroxizina, itraconazol, rivaroxabana/apixabana, valproato, fenobarbital) e "sem alerta específico" soando como liberação; sem perfil criança nas condutas de adulto; sem alergia a dipirona, AINE e sulfa; edição pessoal antiga esconde revisão nova; hidratação calculada da dengue pode virar "meu padrão"; AINE sem ressalva de dengue em cefaleia, oma, abscesso, itu e cólica; fenobarbital da ficha acima de 60 mg/min; teste automático que compare doses entre abas.
- **Pedidos de 2026-10-09 (em ordem):** auditoria de segurança; intoxicações e antídotos (cartão Agora + naloxona, flumazenil, N-acetilcisteína com nomograma, carvão ativado, CIATox a um toque); simulação de plantão no celular; revisão geral das 98 prescrições por categoria.
- **Porta (prioridade desde 2026-10-08):**
  1. ~~atendimento em 1 tela e sinais de alarme no topo~~ (1.9.0);
  2. ~~entrada por queixa, 1º lote (6)~~ (1.10.0); faltam lombalgia, dor musculoesquelética e outras queixas;
  3. ~~alta segura, 1º lote (15)~~ (1.10.0); faltam as demais condutas da porta;
  - condutas sugeridas pelas queixas: síncope, pericardite, pneumotórax, chikungunya, febre maculosa, meningite; atualizar asma (GINA 2026), dpoc (GOLD 2026), eap (ESC 2026 — conferir o texto integral), gripe (título do Guia de Influenza 2023), dengue (PA diferencial ≤ 20); citação da ureia no CURB-65 da calculadora;
  4. condições frequentes que faltam (lista abaixo) e revisão das condutas mais usadas na porta.
Atualizado em 2026-10-05 (versão 1.7.0). Decisões já tomadas: `docs/DECISOES.md`.
- **Visão "copiloto" (aprovada em 2026-10-05), em fatias:**
  1. ~~páginas conectadas~~ (1.7.0);
  2. cartão "Agora": 1ª leva (convulsão, agitação, anafilaxia, sepse, IAM, AVC, PCR) em 1.8.0; faltam as outras 11 emergências da sala vermelha e a hiponatremia grave sintomática;
  3. confiança visível: ano da fonte, data e selo de conferência em cada item, página de Fontes e aviso de revisão vencida;
  4. modo transporte/pré-hospitalar (protocolos SAMU 192, sedação do agitado, checklist de transferência).
- **Fichas que faltam** (aprovar escopo antes): anti-hipertensivos orais, furosemida, AAS e clopidogrel, isossorbida, broncodilatadores, aciclovir e oseltamivir, antifúngicos, albendazol/ivermectina/permetrina, cetirizina e hidroxizina, haloperidol, relaxantes musculares, sumatriptana, colchicina, tiamina, antídotos (naloxona, flumazenil, N-acetilcisteína), levotiroxina e metimazol, tópicos.
- **Condições frequentes que faltam** (só com aprovação): odontalgia, olho vermelho e corpo estranho, paralisia facial, síncope, AVC hemorrágico e AIT, retenção urinária, escroto agudo, sangramento na gestação inicial, hiperêmese, mastite, violência sexual, ideação suicida, intoxicação alcoólica e overdose de opioide, chikungunya e zika, varicela, COVID-19, pneumotórax, pericardite, fraturas e imobilização, cervicalgia, tendinite e bursite.
- **Revisão geral das 98 prescrições**, por categoria, com conferência.
- **Divergências registradas, sem mudança:** glucagon (RCUK × AAAAI); valproato em 10 × 60 min; biperideno VO infantil (1–2 mg por dia × por tomada).
- **Noradrenalina no cartão da sepse:** mostrar a vazão inicial em mL/h por diluição (sugestão do conferente).
- **Opcionais:** escore MACOCHA; sugestões não bloqueantes dos conferentes (Holbrook 2012, teto de glicose ISPAD, bula do Metalyse, PALS 2025).
- **Endereço mais prático:** domínio próprio (registro.br, cerca de R$ 40/ano) ou meu-plantao.pages.dev. Adiado em 2026-09-27.

## Ideias em espera
- **Clínica:**
  - fluxos por queixa com sinais de alarme;
  - ECG de bolso;
  - via aérea pediátrica (tubo e lâmina por idade);
  - queimados;
  - gestante (IG, DPP, sulfato de magnésio).
- **Documentação:**
  - ditado da evolução por voz;
  - modelos de encaminhamento, SBAR e termo de recusa;
  - orientação de alta por WhatsApp ou QR code;
  - receita A5 para imprimir.
- **Organização:**
  - Meus plantões (agenda e pagamento);
  - checklist de início de plantão;
  - diário de procedimentos para o currículo da residência;
  - modo estudo (flashcards).
- **Uso do painel:**
  - data de revisão por item e página de novidades;
  - sincronização entre aparelhos no site (Supabase ou Firebase, com login).

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
Atualizado em 2026-10-05 (versão 1.7.0). Decisões já tomadas: `docs/DECISOES.md`.
- **Visão "copiloto" (aprovada em 2026-10-05), em fatias:**
  1. ~~páginas conectadas~~ (1.7.0);
  2. cartão "Agora" + fluxo nas 18 emergências da sala vermelha, começando por hiponatremia grave sintomática, convulsão, sepse, anafilaxia e agitação psicomotora (conteúdo com conferência);
  3. confiança visível: ano da fonte, data e selo de conferência em cada item, página de Fontes e aviso de revisão vencida;
  4. modo transporte/pré-hospitalar (protocolos SAMU 192, sedação do agitado, checklist de transferência).
- **Fichas que faltam** (aprovar escopo antes): anti-hipertensivos orais, furosemida, AAS e clopidogrel, isossorbida, broncodilatadores, aciclovir e oseltamivir, antifúngicos, albendazol/ivermectina/permetrina, cetirizina e hidroxizina, haloperidol, relaxantes musculares, sumatriptana, colchicina, tiamina, antídotos (naloxona, flumazenil, N-acetilcisteína), levotiroxina e metimazol, tópicos.
- **Condições frequentes que faltam** (só com aprovação): odontalgia, olho vermelho e corpo estranho, paralisia facial, síncope, AVC hemorrágico e AIT, retenção urinária, escroto agudo, sangramento na gestação inicial, hiperêmese, mastite, violência sexual, ideação suicida, intoxicação alcoólica e overdose de opioide, chikungunya e zika, varicela, COVID-19, pneumotórax, pericardite, fraturas e imobilização, cervicalgia, tendinite e bursite.
- **Revisão geral das 98 prescrições**, por categoria, com conferência.
- **Tenecteplase no AVC:** calculadora usa 0,25 mg/kg exato; bula usa faixas de peso. Usuário decide se padroniza.
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

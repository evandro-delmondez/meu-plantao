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
Atualizado em 2026-11-12 (versão 1.61.0). Decisões: `docs/DECISOES.md`. Divergências: `docs/REVISAO.md`. Relatórios da revisão geral: `.rascunhos/revisao-codigo.md`, `.rascunhos/revisao-conteudo.md`.

**Em andamento (2026-11-12, versão 1.61.0)**
- No ar: lote 4 (18 condutas, 5 escores, fontes, item 5), pielonefrite com cefuroxima, plantões por aparelho, UTI e passados por mês em Plantões, sexo pelo nome com filtro [F]/[M], um remédio por classe nas condutas juntas, reavaliação conforme o que foi feito, "Para casa" na alta.
- Revisão geral (2026-11-10), relatórios em `.rascunhos/auditoria-2026-11/`: condutas-1/2/3.md (≈60 erros e 100 melhorias), fluxos.md (erros E1–E10, prompts P1–P5), condutas-faltantes.md (50, 12 prioritárias).
  - Corrigidos no código: E1–E7 e E9 (1.60.2), sexo e condutas combinadas (1.61.0).
  - Em redação: patches-2026-11.json (correções clínicas + marcação [F]/[M]), depois conferência independente.
  - Conferida, espera 5 decisões do médico: dor abdominal nova com diferenciais (dor-abdominal-final.json).
  - A fazer: prompts da IA (P1–P5: justificativa sucinta, objetivos pelo diagnóstico, HDA), E8 (exame normal × checklist), E10 (checklist da dor abdominal), intuitividade (fluxos.md).
  - Depois da dor abdominal: as 12 condutas prioritárias, depois as outras 38 em lotes.
- MPOX: conduta pública em redação (`.rascunhos/mpox/`); o fluxo do HSLS vai só para o pacote privado plantao-hsls.
- Item 4 ("ver antes"): `.rascunhos/item4-o-que-muda.html` (cetorolaco 3 dias, máx. 60 mg/dia; creatinina na HPB; ECG no hipertireoidismo).
- Fichas da segurança com `_conferir` (9), teto renal da bromoprida, perfil de hepatopatia para o paracetamol: em docs/REVISAO.md.

**Conteúdo clínico (redação + conferência independente)**
1. Atualizar fontes antigas: crise hipertensiva (ACC/AHA 2025), ARIA 2010, BTS 2009, ACCP 2012/2016, ATLS 11ª, EAU 2025, GINA na ficha da prednisona, WAO 2020 (lista em revisao-conteudo.md).
2. Condutas novas (1º lote sugerido): pancreatite aguda, diverticulite, meningite, AIT e AVC hemorrágico, pneumotórax, cetoacidose/estado hiperosmolar, hemorragia digestiva baixa, paralisia facial. Depois: celulite e abscesso, dissecção de aorta, hiponatremia/hipocalemia, sangramento na gestação inicial, hiperêmese, mastite, violência sexual, ideação suicida, intoxicação alcoólica, overdose de opioide, COVID-19, varicela, chikungunya, febre maculosa, fraturas e imobilização, tendinite e bursite.
3. Fichas: as 14 sugeridas para o "+ remédio" (desloratadina, cetirizina, levocetirizina, fexofenadina, hidroxizina, nistatina, cetoconazol creme, ivermectina, albendazol, salbutamol, naproxeno, nimesulida, ciclobenzaprina, tiocolchicosídeo); levofloxacino 750 e amoxicilina 875 (CMED); fichas de piperacilina-tazobactam, meropeném, ampicilina-sulbactam; demais da lista antiga (sumatriptano, colchicina, aciclovir, anti-hipertensivos orais, broncodilatadores…). Formas: cp × cáps nas condutas.
4. Da revisão de conteúdo: dengue sem alta leiga; hpb e tireoide pedem exames que não estão na aba Exames; Hexomedine e Amidalin sem fonte; probiótico "(opcional)" da diarreia na criança vem ligado; ficha do cetorolaco (IR: 45 mg/dia) × condutas; insônia e crise hipertensiva com orientações sob "Uso oral".
5. Atualizações antigas: EAP (ESC 2026), ureia no CURB-65 da calculadora, Parkland pediátrico, máximo do MART, PAC pela ATS 2026.

**Segurança**
6. Peso implausível; "UI" → "unidades"; tetos de dose nas fichas; alertas de gestante que faltam (hidroxizina, itraconazol, rivaroxabana, apixabana, valproato, fenobarbital); alergia a AINE e sulfa; teste que compare doses entre abas.

**Fluxo e app**
7. Ditado por voz na HDA (avisar privacidade do Chrome; usar no celular se o PC não tiver microfone).
8. Orientação de alta por QR ou impressa. (Aviso sonoro: 1.58.1; tempo por etapa: 1.58.2.)
9. Modo Sala Vermelha (quando o médico trabalhar na sala vermelha).
10. Plantões: UPA quando for convocado; data de pagamento recebido; resumo do mês.

**Esperam o médico**
11. Divergências hospital × app (dengue, AVC, PA pós-trombólise, lactato, noradrenalina, tenecteplase ≥ 75 anos) e dos exames (~10).
12. Prints do MV: nomes dos exames do hospital no "+ pedir".

## Ideias em espera
- **Modo Sala Vermelha** (pedido do médico, 2026-10-28, para quando trabalhar na sala vermelha): um botão que transforma o app inteiro (barra, telas e atalhos de emergência) e outro para voltar ao modo porta (verde e amarela).
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

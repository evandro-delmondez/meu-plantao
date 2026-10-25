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
**Retomar primeiro (2026-10-25, sessão parou no limite de tokens):**
- Contratura e lombalgia: rascunho pronto (.rascunhos/contratura*.json/.md); falta a conferência independente e as 8 dúvidas para o médico (AINE padrão, celecoxibe sem ataque, ciclobenzaprina 5 mg 8/8h, tiocolchicosídeo + AINE/paracetamol, diazepam, colar cervical, CID e sin).
- "+ remédio" na receita do Atendimento (fichas já têm "receita"; falta a interface: busca, posologia, dias → quantidade; colar do Whitebook; "Salvar como opção desta conduta?"). As 14 fichas novas sugeridas (.rascunhos/receita-fichas.json "_novas") precisam virar fichas completas. Pendentes: levofloxacino 750 e amoxicilina 875 (CMED); ivermectina "doses".
- A pensar com o médico: cor por classe de remédio na receita; quadro "Para você, não vai na receita".
Atualizado em 2026-10-22 (versão 1.22.3). Decisões: `docs/DECISOES.md`. Divergências registradas: `docs/REVISAO.md`.

**Feito em 2026-10-22:** sincronização da lista, nuvem dos padrões, hospital e senha de acesso ligados pelo médico.

**Decisões do médico**
1. Divergências hospital × app (dengue 20 × 10 mL/kg; AVC alteplase × tenecteplase; PA pós-trombólise; lactato; acesso da noradrenalina; tenecteplase ≥ 75 anos) — registrar no pacote (campo `decisao`).
2. Divergências dos exames (10, `docs/REVISAO.md` 2026-10-22) e a opcional (antibiótico na PAC com vírus positivo).
3. Pontos para a coordenação do hospital (`plantao-hsls/docs/divergencias.md`).

**Atendimento e MV**
4. Modelo real do MV (print dos campos) para ajustar os botões de copiar; print da lista de exames do MV para usar os nomes do hospital no "+ pedir".
5. Visual: o médico aponta o que ainda polui.
5a. (2026-10-25) Redesenho do Atendimento: ~~barra de etapas~~ (1.29.0); quadro "o essencial" em destaque com os porquês num ⓘ; visão única com 2+ queixas; checklist e exames enxutos; avisos num quadro só. Depois: HDA em texto corrido (semiologia, notas soltas + toques; antecedentes em comorbidades, cirurgias, internações), exame só com alterações, atalhos de frase; e botão opcional "Melhorar texto (IA)" com chave da API do médico (exceção à regra 5 a registrar).
5b. (2026-10-25) Remédio extra na receita a um toque: trazer da ficha de Remédios com posologia e dias (calcula a quantidade), ou colar uma prescrição de fora (ex.: Whitebook) e o app formatar.
5c. (2026-10-25) Meu hospital dentro de Documentos; busca nos protocolos do hospital fácil de achar (ex.: "reposição de ferro: pode ou não pode").
5d. (2026-10-25) Cálculos acionados na própria conduta quando necessários (escores e doses por peso ligados).
5e. (2026-10-25) Lista de pacientes: "passei para outro médico" tira da tela e não conta como meu paciente.

**Conteúdo clínico (com fonte e conferência)**
6. Exames e encaminhamento para as demais condutas (feito: 8 queixas e 44 condutas, 1.24.0); rever a conduta pac pela atualização ATS 2026.
7. ~~Queixas lombalgia e dor musculoesquelética~~ (1.24.0); outras queixas; conduta de cervicalgia/torcicolo.
8. ~~Separar TEP e TVP~~ (1.34.0). Condutas novas: síncope, pericardite, pneumotórax, chikungunya, febre maculosa, meningite, odontalgia.
9. Condições que faltam: olho vermelho e corpo estranho, paralisia facial, AVC hemorrágico e AIT, retenção urinária, escroto agudo, sangramento na gestação inicial, hiperêmese, mastite, violência sexual, ideação suicida, intoxicação alcoólica e overdose de opioide, zika, varicela, COVID-19, fraturas e imobilização, cervicalgia, tendinite e bursite.
10. Fichas que faltam: sumatriptano, colchicina, alopurinol, ciclobenzaprina, tiamina, clopidogrel, aciclovir, valaciclovir, ivermectina, permetrina, anti-hipertensivos orais, furosemida, isossorbida, broncodilatadores, antifúngicos, cetirizina e hidroxizina, levotiroxina e metimazol, tópicos.
11. Altas leigas das condutas que ainda não têm.
12. Atualizações: EAP (ESC 2026), título do guia de influenza, ureia no CURB-65 da calculadora, Parkland pediátrico (ATLS 11), máximo do MART (bula do Vannair).
13. Segurança (auditoria de 2026-10-09): peso implausível; "UI" → "unidades" (heparina, ocitocina, vasopressina); tetos de dose em fichas; alertas de gestante (hidroxizina, itraconazol, rivaroxabana, apixabana, valproato, fenobarbital); alergia a dipirona, AINE e sulfa; teste que compare doses entre abas.
14. Da simulação: "álcool?" na agitação; alarme cruzado (epigástrica em diabético → ECG); sinônimos leigos na busca; faixa da otite na ficha da amoxicilina.

**Sala vermelha e extras (baixa prioridade: o médico atende a porta)**
15. Cartão Agora nas outras 11 emergências e na hiponatremia grave; vazão inicial da noradrenalina em mL/h no cartão da sepse.
16. Confiança visível (selo, data, página de Fontes); modo transporte (SAMU); domínio próprio (adiado).
17. Divergências antigas sem mudança: glucagon (RCUK × AAAAI); valproato 10 × 60 min; biperideno VO infantil. Opcionais dos conferentes: MACOCHA, Holbrook 2012, teto de glicose ISPAD, bula do Metalyse, PALS 2025.

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

# Histórico de versões

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

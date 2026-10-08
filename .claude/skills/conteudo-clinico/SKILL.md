---
name: conteudo-clinico
description: Use ao criar ou alterar qualquer conteúdo clínico do Meu Plantão — conduta, prescrição, checklist, ficha de medicação, dose por peso, protocolo, eletrólito, escore. Define fontes, formato, nomes comerciais e o fluxo rascunho → conferência → publicação.
---

# Conteúdo clínico no Meu Plantão

## Fontes (regra 1 do CLAUDE.md)
Prioridade: diretriz mais recente de sociedade (AHA 2025, SBC, GINA, SSC, KDIGO…) e **Ministério da Saúde** (PCDT, manuais, RENAME) > bula Anvisa/FDA > livros-texto para conferir.
- Livros em `~/Downloads`: `harrison-2025-_-22nd-edition-3.pdf` (Harrison, 22ª ed.) e `medicina-de-emergencia-abordagem-pratica-18nbsped-...pdf` (HC-FMUSP, 18ª ed.). Se precisar, extraia o texto para o scratchpad (`pypdf` ou `pdfminer`) e busque com `grep`. Cite **capítulo e edição**, nunca copie trechos. **Nunca** coloque os PDFs ou o texto deles no repositório.
- Sem fonte → não entra. Na dúvida, pergunte ao usuário.

## Onde e como
- Conduta: `src/data/condutas.js` (casa, unidade, orient, fontes; mudança em conduta existente → registre em `rev` com data e motivo).
- Checklist: `src/data/checklists.js`, mesma chave, grupos hist/ant/ex/alarme com itens como substantivo, e `fontes`.
- Ficha: JSON do grupo em `src/data/medicacoes/` conforme `docs/FORMATO-MEDICACOES.md`; `ped_calc` só com mg/kg explícito na fonte; grupo novo → `MGRUPOS` (`src/js/19-medicacoes.js`) e `MED_ORDER` (`scripts/build.mjs`).
- Doses por peso: `src/data/calculadora.js` (cada bloco com `src`). Categorias no formato "Especialidade / Especialidade".

## Preferências do usuário (já decididas)
- Prescrição e orientações são o principal; checklist do que perguntar/examinar por diagnóstico.
- Exame físico por extenso, sem siglas, com versão masculina e feminina.
- Selo RENAME + alternativa da rede particular (seletor público/particular).
- **Nome comercial** em letra pequena abaixo do princípio ativo (campo `marcas`), só marcas presentes na **lista CMED** vigente (baixar de gov.br/anvisa → CMED → lista de preços, coluna substância × produto).
- Escetamina (a que existe no Brasil), nunca cetamina racêmica.

## Fluxo obrigatório para conteúdo novo ou de alto risco
1. Pedir aprovação do escopo ao usuário.
2. Rascunhos e relatórios de agentes em `.rascunhos/` (fora do git, não some como o scratchpad). Conteúdo num **branch separado** (ex.: `fichas-c`), salvando incrementalmente — nada não conferido vai para a `main`.
3. `npm run verificar`.
4. Conferência independente: skill `conferencia`.
5. Aplicar as correções obrigatórias; divergências com duas fontes válidas → **informar o usuário**, não decidir sozinho.
6. Juntar à main e publicar: skill `entregar`.

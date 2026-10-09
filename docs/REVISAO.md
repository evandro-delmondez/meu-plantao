# Revisão trimestral do conteúdo

Próxima revisão: 2026-12-24

A cada 3 meses (ou quando sair diretriz nova relevante):

1. Rodar `npm run lint:conteudo` e resolver os avisos.
2. Conferir atualizações de: Ministério da Saúde (dengue, raiva, tétano, IST/PCDT), AHA/ILCOR (PCR), SSC (sepse), GINA/GOLD, ESC/SBC, IDSA, FDA/EMA/ANVISA (alertas de segurança), RENAME, Beers.
3. Para cada mudança: editar o item em `src/data/`, citar a fonte nova em `fontes`, registrar em `rev` (condutas) e no `CHANGELOG.md`.
4. Conteúdo de alto risco (doses, diluições, pediatria): pedir conferência independente antes de publicar.
5. Atualizar a data acima para daqui a 3 meses.

## Histórico
- 2026-10-09 (v1.10.1) — auditoria de segurança independente (`.rascunhos/auditoria-seguranca.md`: 2 críticos, ~20 importantes, ~35 menores); críticos corrigidos e conferidos (`.rascunhos/conferencia-correcao-critica.md`: 3 ajustes obrigatórios aplicados). Importantes ficam para a revisão geral (ROTEIRO).
- 2026-10-09 (v1.10.0) — porta: 6 queixas (21 correções obrigatórias), alta leiga de 15 condutas (5 correções) e 8 condutas publicadas corrigidas com aprovação do médico. Relatórios em `.rascunhos/conferencia-queixas.md` e `.rascunhos/conferencia-alta-1.md`. Divergências: PA diferencial na dengue (< 20 no fluxograma × ≤ 20 no quadro do MS 2024; adotado ≤ 20 na queixa); CURB-65 mantido (NICE 2025, SBPT); ureia > 50 mg/dL na calculadora × ~42 em Lim 2003.
- 2026-10-08 (v1.8.1) — ficha do biperideno conferida (8 correções obrigatórias) e checagem independente das decisões do médico (tenecteplase no AVC por faixa conferida com a bula FDA do TNKase e o SmPC do Metalyse 25 mg; volume na anafilaxia; notas de fenobarbital e haloperidol); 1 correção obrigatória (metade da tenecteplase no IAM a partir de 75 anos visível no cartão). Relatórios em `.rascunhos/conferencia-biperideno.md` e `.rascunhos/conferencia-1.8.1.md`.
- 2026-10-08 (v1.8.0, branch agora-1) — cartão "Agora" (convulsão, agitação, anafilaxia, sepse, IAM, AVC, PCR) e ficha do haloperidol conferidos por dois agentes independentes (contas com 50, 70 e 120 kg corretas; fontes de 2026 confirmadas); 9 correções obrigatórias, 6 delas em conteúdo já publicado (adrenalina em infusão 1 mg/100 mL, glucagon no adulto, diazepam na agitação, tiamina na convulsão, prasugrel, noradrenalina pela bula FDA). Resumo em `.rascunhos/conferencia-agora-resumo.md` (relatórios completos perdidos com o scratchpad). Divergências deixadas ao médico: tenecteplase no AVC (0,25 mg/kg × faixas da bula), volume na anafilaxia (20 mL/kg × 500–1.000 mL), fenobarbital 15 × 20 mg/kg, repetição do haloperidol 30 min × 1 h, metade da tenecteplase ≥ 75 anos no IAM (ESC, fora da bula), clopidogrel corte em 75 anos. Checagem final independente da versão enxuta (`.rascunhos/conferencia-agora-final.md`): nenhum número mudou; 8 correções obrigatórias aplicadas (registro da agitação gravado no abscesso, nitrato com a classe dos inibidores de PDE-5, heparina 20.000 UI/mL visível, "nunca a ampola pura" visível, fenobarbital só na falta das três, trombectomia em etapa própria, diluição da adrenalina na bradicardia de volta ao preparo dos injetáveis, teto de 1.500 mg retirado da fenitoína pediátrica — é da fosfenitoína). Novas divergências: glucagon RCUK × AAAAI; valproato em 10 min (ESETT) × 60 min (bula); volume na anafilaxia sem teto.
- 2026-09-28 (v1.6.0) — 16 fichas da sala vermelha (parte B) conferidas por agente independente; 8 correções aplicadas.
- 2026-09-27 (v1.5.0) — 17 fichas da sala vermelha, escetamina, fenobarbital e rocurônio pediátrico conferidos por agente independente; 7 correções obrigatórias aplicadas.
- 2026-09-26 (v1.4.3) — hiponatremia e hipernatremia conferidas por agente independente; números corretos, citações ajustadas.
- 2026-09-26 (v1.4.2) — condutas de acidente ofídico e escorpiônico conferidas por agente independente contra os PCDT de 2025; ofídico corrigido.
- 2026-09-26 (v1.4.0) — protocolos em fluxo, PCR guiada, eletrólitos, lista de QT e condutas de anafilaxia e pré-eclâmpsia conferidos por agente independente; correções obrigatórias aplicadas antes de publicar.
- 2026-09-26 — doses por peso e bomba de infusão conferidas por agente independente (correções listadas no CHANGELOG 1.3.0); calculadoras de laboratório conferidas no Harrison 22ª ed.; plano C conferido no cartaz vigente do MS (menores de 1 ano / a partir de 1 ano).
- 2026-09-24 — revisão completa inicial; medicações parte 1 (45 fichas) com dupla conferência; aba Feridas conferida.

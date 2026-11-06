# Lote 3 (1.59.0): decisões pendentes do médico

Ramo `lote3`, 2026-11-06. O conteúdo veio dos arquivos conferidos (`.rascunhos/lote3-*-final.json` e `-exames-final.md`). Onde as fontes divergem, o ramo usa o padrão recomendado pelo conferente. Decida cada item antes do merge na `main`; o que mudar, ajusto no ramo.

| # | Pergunta | Aplicado no ramo | Alternativa | Fontes |
|---|---|---|---|---|
| 1 | Diverticulite ambulatorial: antibiótico por 5 ou 7 dias? | 7 dias (amoxicilina-clavulanato 14 cp; ciprofloxacino 14 cp + metronidazol 250 mg 42 cp) | 5 dias (10 cp; 10 cp + 30 cp) | HC-FMUSP 18ª ed., cap. 75 (7–10 dias) × NICE NG147 e Harrison 22ª ed., cap. 339 (5 dias) |
| 2 | BISAP: ureia > 53 ou > 30 mg/dL? | > 53 mg/dL (BUN > 25) | > 30 mg/dL | Wu 2008 (Gut 2008;57:1698) e Harrison 22ª ed., cap. 359 × HC-FMUSP 18ª ed., cap. 76 (provável troca de BUN por ureia) |
| 3 | HDB: incluir limiar de plaquetas? Qual? | Não incluído | > 30 mil no sangramento grave e > 50 mil se procedimento (ACG 2023); < 50 mil com sangramento ativo (HC-FMUSP, HDA) | ACG 2023 (Am J Gastroenterol 2023;118:208), lido só em resumos; HC-FMUSP 18ª ed. |
| 4 | CID da diverticulite: K57.9 ou K57.3? | K57.9 (K57.3 e K57.2 no aviso) | K57.3 (cólon, sem perfuração nem abscesso, mais exato) | CID-10, cap. XI (DATASUS) |
| 5 | Andexanet alfa | Fora da AIT/AVC hemorrágico (sem registro na Anvisa; retirado nos EUA em 2025). Na HDB ficou "se houver na unidade", com o complexo protrombínico como alternativa | Voltar como "se disponível" na AIT, ou tirar também da HDB | AHA/ASA 2022; ACG 2023; BSG 2019; HC-FMUSP 18ª ed., cap. Fibrilação atrial |
| 6 | CAD: bicarbonato com pH < 7,0 ou < 6,9? | pH < 7,0 na conduta; a divergência está no aviso | pH < 6,9 | Consenso ADA/EASD/JBDS/AACE/DTS 2024 (Diabetes Care 2024;47:1257) × HC-FMUSP 18ª ed., cap. 89 |
| 7 | Pneumotórax conservador: a UPA garante reavaliação em 24 h? | Reavaliação em 24 h, depois revisão a cada 2–4 dias e RX em 2–4 semanas | Se não houver retorno garantido em 24 h, mudar a alta do conservador | HC-FMUSP 18ª ed., cap. 46 × BTS 2023 (Thorax 2023;78 Suppl 3) |
| 8 | Local da descompressão no hipertensivo (conferir ATLS 11ª ed., 2025) | 4º/5º espaço intercostal entre as linhas axilares anterior e média primeiro; 2º espaço na linha hemiclavicular como alternativa, com a ressalva dos vasos | Só o 2º espaço na linha hemiclavicular, ou o que a 11ª ed. trouxer | ATLS 10ª ed. (2018); HC-FMUSP 18ª ed., cap. 46; Harrison 22ª ed. (texto da 11ª ed. não conferido) |
| 9 | EHH sem rebaixamento vai para UTI? | Critérios do consenso 2024 nos exames: toda CAD grave, EHH, alteração mental ou doença crítica | Critérios do HC-FMUSP (desconforto respiratório, pH < 6,9, choque cardiogênico, edema cerebral) ou a regra do hospital | Consenso 2024 × HC-FMUSP 18ª ed., cap. 89 |
| 10 | AVC hemorrágico: alvo de PA | Baixar para 140 mmHg (manter 130–150), evitar < 130; PAS > 220: meta inicial < 180 | 140–160 mmHg (como no pedido original) | AHA/ASA 2022 (Stroke 2022;53:e282); ESO-EANS 2025; DBHA 2025 |
| 11 | Meningite: ataque de vancomicina 20–35 mg/kg | Mantido como "no grave, pode ser considerado (máx. 3 g)" | Retirar a frase (o consenso não é de meningite) | ASHP/IDSA/SIDP 2020 (Rybak, PMID 32191793) |
| 12 | Categoria da meningite | `dor` (Dor / Neuro / Ortop), junto de AIT e paralisia facial | `toxinf` (Toxico / Infecto) | Organização do painel (sem fonte clínica) |
| 13 | Queixa nova "Fraqueza ou alteração neurológica súbita" (AVC, AIT, paralisia facial) | Não criada; paralisia facial achada pela busca ("boca torta", "Bell"); AIT ligado em cefaleia e tontura | Criar a queixa agora | Sugestão do conferente |

## Outros pontos que ficaram de fora (para decidir depois)
- **Pancreatite, cálcio > 14 mg/dL com soro fisiológico em vez de Ringer:** retirado por falta de fonte lida (IAP 2025 sem texto integral). Buscar outra fonte?
- **Pancreatite, metas "ureia < 40" e "hematócrito < 44%":** retiradas pelo mesmo motivo; ficaram as metas do HC-FMUSP e do Harrison.
- **HDB, complexo protrombínico e vitamina K com dose explícita:** mantidos pela bula do Beriplex e do Kavit. Qual complexo a unidade tem (Beriplex, Octaplex, Prothromplex)? A tabela é a do Beriplex.
- **`src/data/protocolos.js` (sala vermelha, publicado) não foi alterado:** o conferente propõe trocar "EHH 200–250 mg/dL" por "glicemia < 250 é critério de resolução; queda de no máximo 90–120 mg/dL/h" e a resolução da CAD de "> 7,3 / > 18" para "≥ 7,3 / ≥ 18" (consenso 2024). Aprova?
- **Pneumotórax, avião:** BTS 2023 (7 dias após RX com resolução completa). Um folheto do NHS fala em 6 semanas a 3 meses; ficou a diretriz.
- **Conduta "hiperglicemia":** o conferente sugere trocar o fim do asterisco por "Ver Cetoacidose diabética / Estado hiperosmolar". Não aplicado.
- **Ligação dos escores às condutas:** BISAP na pancreatite e Oakland na HDB entraram nos cálculos da conduta (o rascunho de GI não pedia explicitamente; ICH, ABCD², Glasgow, NIHSS e NEWS2 seguem o rascunho de neuro).

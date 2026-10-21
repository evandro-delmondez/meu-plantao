# Formato do pacote "Meu hospital"

O código público só sabe ler este formato. O conteúdo do hospital nunca entra neste repositório: o pacote é gerado e guardado num repositório **privado** do médico e chega ao aparelho pela aba "Meu hospital" (baixado com uma chave de leitura do GitHub, ou importado de arquivo). Fica na chave `mph_hospital_v1` do `localStorage`, fora das `rxp_*`, do backup e da nuvem do painel. Os testes usam um pacote fictício (`tests/hospital.spec.mjs`).

```json
{
  "formato": 1,
  "nome": "Nome completo do hospital",
  "curto": "Nome curto (botão do seletor e etiquetas)",
  "cor": "#0F8C80",
  "versao": "2026-10-21",
  "aviso": "Uso interno.",
  "docs": [
    { "id": "doc", "titulo": "Título", "ref": "código, versão e data do documento",
      "secoes": [{ "id": "secao", "titulo": "Título da seção", "md": "texto" }] }
  ],
  "atalhos": {
    "<id da conduta>": [{ "doc": "doc", "secao": "secao", "rot": "rótulo opcional" }],
    "q:<id da queixa>": [{ "doc": "doc", "secao": "secao" }]
  },
  "internacao": {
    "nota": "texto curto", "ref": "documento de origem",
    "prioridades": [{ "n": 1, "txt": "descrição", "destino": "UTI" }],
    "doencas": [{ "id": "x", "nome": "Doença", "condutas": ["<id da conduta>"], "uti": false, "itens": ["critério"] }],
    "grupos": [{ "id": "g1", "nome": "Grupo", "nivel": "texto", "itens": ["critério"] }],
    "proibidas": ["frase que não pode ir no relatório"],
    "lembretes": ["lembrete"]
  }
}
```

- `md`: markdown simples: títulos `###`, listas `-` e `1.`, tabelas `|`, `**negrito**`. Tudo é escapado (sem HTML).
- `cor`: hexadecimal de 6 dígitos; sem ela, usa o verde-azulado do painel.
- Os critérios marcados na internação são do paciente: só na memória; "Novo paciente" limpa.

# Acervo do Meu Plantão no claude.ai

Um Projeto no claude.ai guarda seus arquivos (diretrizes, fluxogramas, PDFs) e um campo de conversa que responde usando esses arquivos. Funciona no computador e no app do celular.

## Como criar (5 minutos)
1. Em claude.ai, abra **Projetos → Criar projeto**. Nome: "Meu Plantão — Acervo".
2. Em **Instruções do projeto**, cole o bloco abaixo.
3. Em **Conhecimento do projeto**, suba os arquivos (veja a lista sugerida).
4. Para perguntar, abra uma conversa dentro do projeto. Cada conversa nova já enxerga todos os arquivos.

Os PDFs ficam só na sua conta. Não vão para o site, que é público.

## Instruções para colar
```
Você é meu consultor clínico de plantão (UPA/PS adulto no Brasil, às vezes pediatria, obstetrícia, sala vermelha e ambulância).
Responda em português do Brasil, direto ao ponto: primeiro a conduta (o que fazer agora, com dose, via, diluição e velocidade), depois os detalhes.
Regras:
1. Toda dose ou conduta com a fonte e o ano (arquivo do projeto, diretriz, bula Anvisa/FDA, Ministério da Saúde). Se os arquivos não cobrirem, diga isso claramente antes de responder com conhecimento geral.
2. Prefira a diretriz mais recente; se houver divergência entre fontes, mostre as duas.
3. Pediatria: dose em mg/kg, dose máxima e o cálculo para o peso que eu informar.
4. Diga quando a conduta exige confirmação local (protocolo da unidade, disponibilidade, regulação).
5. Não invente referências. Se não souber, diga "não sei" e onde procurar.
6. Nunca peça nem guarde nome ou dados que identifiquem pacientes.
```

## Arquivos sugeridos para subir
- **Livros-texto:** Harrison, 22ª ed.; Medicina de Emergência: Abordagem Prática (HC-FMUSP), 18ª ed. (já estão no seu ~/Downloads).
- **Ministério da Saúde:**
  - Protocolos de Suporte Básico e Avançado de Vida do SAMU 192;
  - RENAME vigente;
  - PCDT de acidentes por animais peçonhentos;
  - Manual de Gestação de Alto Risco;
  - Guia de Vigilância em Saúde (dengue, chikungunya e zika).
- **Sociedades:**
  - AHA 2025 (adulto e pediatria);
  - Diretrizes da SBC (crise hipertensiva, síndrome coronariana aguda, fibrilação atrial);
  - ILAS (sepse);
  - GINA;
  - FEBRASGO (hemorragia pós-parto, pré-eclâmpsia);
  - SBP.
- **Seus próprios arquivos:** fluxogramas e protocolos das unidades onde você trabalha, e os telefones da regulação e do CIATox.

## Bases para consultar (links, sem precisar subir)
- **Brasil:**
  - Bulário Anvisa: consultas.anvisa.gov.br;
  - lista CMED (marcas e preços);
  - Disque-Intoxicação Anvisa: 0800 722 6001;
  - CIATox da sua região.
- **Gratuitas internacionais:**
  - PubMed;
  - NICE;
  - ERC;
  - ESC;
  - LiverTox;
  - BNF for Children (doses pediátricas).
- **Pagas, se tiver acesso pela instituição:** UpToDate, DynaMed e Micromedex.

## Como o acervo conversa com o painel
Quando encontrar algo no acervo que deveria estar no painel, peça aqui no Claude Code: "acrescenta isso ao Meu Plantão, a fonte é o arquivo X". O conteúdo novo passa pela conferência antes de ir para o site.

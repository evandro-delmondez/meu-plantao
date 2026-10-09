# Decisões do usuário

Lido no início de toda tarefa (skill `retomar`). Não rediscutir o que está aqui; acrescente novas decisões com data.

## Regras de trabalho
- Nenhuma alteração importante sem informar antes; entrevistar em caso de dúvida.
- Respostas em português fluente, curtas. Economizar tokens.
- Sempre condutas e protocolos mais recentes: Ministério da Saúde, sociedades, bulas, livros-texto (Harrison 22ª ed.; Medicina de Emergência HC-FMUSP 18ª ed.), citando capítulo e edição, sem copiar e sem enviar os livros ao GitHub.
- Publicar só depois da conferência independente, mesmo com poucos tokens (2026-09-27).
- Trabalho em fatias: visual + clínico juntos.

## Perfil de uso (2026-09-25)
- Computador e celular por igual. UPA/PS adulto, público e particular; pediatria, obstetrícia e sala vermelha às vezes.
- Abas mais usadas: prescrições, medicações, evolução, atestado, escores, calculadora.

## Conteúdo e interface
- Prescrição e orientações são o principal da conduta; checklist do que perguntar, antecedentes e exame físico por diagnóstico.
- Exame físico sem siglas, com modelos masculino e feminino.
- Selo RENAME + seletor rede pública/particular.
- Categorias no formato "Especialidade / Especialidade" (ex.: "Otorrino / Oftalmo", "Toxico / Infecto", "Dor / Neuro / Ortop").
- Fichas: grupos com nomes curtos; Vasoativos, Sedação e Anticonvulsivantes separados; nome comercial pequeno logo abaixo do princípio ativo, só marcas da lista CMED.
- Queimaduras: superfície queimada só quando necessário (sem campo duplicado). Feridas e mordeduras registram necessidade de sutura na evolução.
- PCR: cronômetro, ciclos, metrônomo e próximos passos claros ("Agora:").
- Cetamina: só escetamina (a disponível no Brasil) — 2026-09-27.
- Fenobarbital: com limites de velocidade, concentrações e contraindicações — 2026-09-27.
- Rocurônio pediátrico: mantido, com nota da bula — 2026-09-27.
- Valproato e fenitoína: só notas nas fichas — 2026-09-27.

## Infraestrutura
- Site no GitHub Pages (https://evandro-delmondez.github.io/meu-plantao/), publicado pelo GitHub Actions no push para main.
- Cloudflare Access testado e descartado (2026-09-27): "prefiro o site mesmo".
- Domínio próprio: adiado (2026-09-27).

## Visão 2026-10-05: copiloto, não livro
- Sala vermelha: cartão "Agora" (3–5 ações com doses pelo peso) no topo, fluxograma abaixo, detalhes e fontes recolhidos.
- Remédio citado em conduta/protocolo vira botão; a ficha abre por cima (no celular, de baixo para cima), sem perder a conduta; droga de infusão com atalho para a bomba preenchida.
- Confiança = rastreabilidade: fonte, ano, data de conferência e selo de conferência visíveis; página de Fontes.
- Acervo pessoal (PDFs, fluxogramas) num Projeto no claude.ai, com instruções escritas pelo Claude; livros nunca no site público.
- Pré-hospitalar "às vezes": incluir protocolos SAMU 192 e modo transporte (agitação, transferência) depois da sala vermelha.
- Cartão "Agora", 1ª leva (2026-10-05): convulsão/estado de mal, agitação psicomotora (nova, com ficha de haloperidol), sepse, anafilaxia, IAM, AVC e PCR. Hiponatremia grave fica para depois.
- Doses no cartão: campo de peso no topo (só memória), mg e mL já calculados, com a dose de referência ao lado para conferir.
- Cartão enxuto (2026-10-05): até 3 ações por etapa, frases curtas com a dose; exceções e observações em "detalhes" (o lint barra mais de 3 ações ou ação com mais de 160 caracteres).
- Ficha do biperideno: criar (distonia aguda por haloperidol/antieméticos) — 2026-10-05.
- Grupo de fichas "Psiquiatria" (haloperidol, depois biperideno e outros) — 2026-10-05.
- Rascunhos e relatórios de agentes ficam em `.rascunhos/` no projeto (fora do git); o scratchpad temporário foi apagado entre sessões em 2026-10-08 e levou os relatórios completos.
- Divergências resolvidas (2026-10-08): tenecteplase no AVC = conta de 0,25 mg/kg (AHA 2026) com a dose da faixa da bula ao lado; volume na anafilaxia = 20 mL/kg com teto de 1.000 mL por bolus (RCUK 2021); fenobarbital = 20 mg/kg, citando que a AES 2016 usa 15 mg/kg; haloperidol = repetir em 30 min (ABP 2019), citando que a bula diz 1 h.

---
name: conferencia
description: Use antes de juntar à main qualquer dose, diluição EV, conteúdo pediátrico, antídoto ou conduta nova/alterada no Meu Plantão. Dispara um agente conferente independente contra as fontes primárias (regra 2 do CLAUDE.md).
---

# Conferência independente

O conferente **não pode ser quem escreveu**: use a ferramenta Agent (general-purpose) com contexto limpo. Para lotes grandes, divida (até ~16 itens por agente) e rode em paralelo.

## Prompt para o agente (adapte a lista)
> Você é médico conferente independente do projeto Meu Plantão (`/Users/evandrobonfim/Projetos/meu-plantao`, branch `<branch>`). Confira **contra as fontes primárias citadas em cada item** (bula Anvisa/FDA, diretriz mais recente, Ministério da Saúde; livros Harrison 22ª ed. e Medicina de Emergência HC-FMUSP 18ª ed. em ~/Downloads só para conferir) os itens: `<arquivos e chaves>`.
> Verifique: dose adulto e pediátrica (mg/kg, máximo), diluição, concentração, velocidade, via, intervalos, contraindicações, ajuste renal, se a fonte citada de fato diz aquilo e se é a versão mais recente, marcas comerciais presentes na CMED.
> Não edite nada. Salve o relatório em `.rascunhos/conferencia-<tema>.md` (pasta do projeto fora do git; o scratchpad é apagado entre sessões) com três seções: **Obrigatório corrigir** (erro ou afirmação sem suporte na fonte, com a correção e a fonte), **Divergência entre fontes** (as duas válidas), **Sugestões não bloqueantes**. Seja específico: arquivo, chave, texto atual → texto proposto.

## Depois do relatório
- Aplique todas as "obrigatórias"; se alguma afeta conteúdo já publicado, avise o usuário na resposta final.
- Divergências → pergunte ao usuário ou registre em `docs/REVISAO.md`.
- Registre a rodada em `docs/REVISAO.md` (data, itens, nº de correções).

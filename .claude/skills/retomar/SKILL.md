---
name: retomar
description: Use no início de toda tarefa nova no Meu Plantão (ou quando o usuário perguntar "o que temos de pendências?", "onde paramos?", "retorne de onde parou"). Recupera decisões, pendências e estado do projeto sem gastar tokens relendo tudo, e registra o que mudou ao final.
---

# Retomar o trabalho no Meu Plantão

Responda sempre em **português do Brasil fluente**, frases curtas. O usuário é médico de UPA/PS; os tokens são limitados — leia só o necessário.

## 1. Ler, nesta ordem (e parar quando bastar)
1. `docs/DECISOES.md` — regras do usuário e decisões já tomadas. **Nunca rediscuta uma decisão registrada ali.**
2. `docs/ROTEIRO.md`, seção "Pendências combinadas".
3. As 2 primeiras entradas do `CHANGELOG.md` e `git log --oneline -5` / `git status`.
4. Só então o código ligado à tarefa (use `grep -n`, não leia arquivos inteiros; `condutas.js` e os JSON de medicações são grandes).

## 2. Antes de mudar algo
- Mudança clínica (dose, conduta, categoria, conteúdo novo) ou visual importante: **informe e peça aprovação antes**, com uma pergunta objetiva (AskUserQuestion, opção recomendada primeiro).
- Tarefa só de código, teste ou documentação: pode fazer direto.
- Conteúdo clínico: siga a skill `conteudo-clinico`. Publicar: skill `entregar`.

## 3. Ao terminar a tarefa (obrigatório — é o que evita perder coisas)
- Nova decisão do usuário → acrescente uma linha datada em `docs/DECISOES.md`.
- Pendência resolvida → tire de "Pendências combinadas" no `ROTEIRO.md`; pendência nova ou adiada → acrescente, com data.
- Divergência de fonte que ficou só informada → registre em `docs/REVISAO.md`.
- Resposta final ao usuário: o que ficou pronto, o que mudou em conteúdo que já estava no ar, e as pendências em 3–5 itens.

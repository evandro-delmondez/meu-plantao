---
name: entregar
description: Use para fechar uma entrega do Meu Plantão — verificar, subir versão, changelog, commit, push para main e confirmar que o site publicou. Também quando o usuário disser "pode postar", "publica", "sobe".
---

# Entregar uma versão

1. **Pré-requisito:** conteúdo clínico novo já passou pela skill `conferencia`. Se não passou, não publique — explique ao usuário (ele já decidiu: "esperar a conferência").
2. `npm run verificar` (lint + build + testes Playwright computador e celular). Tudo verde, sem exceção. Funcionalidade nova tem teste em `tests/`.
3. Suba `version` no `package.json` (e `APP_VERSION`, se existir no código: `grep -rn APP_VERSION src`), entrada no topo do `CHANGELOG.md` (data, o que entrou, correções da conferência) e, se houve conferência, `docs/REVISAO.md`.
4. Commit sem identidade global configurada:
   ```bash
   git -c user.name="Evandro Delmondez Oliveira" -c user.email="delmondezevandro@gmail.com" commit -m "Meu Plantão X.Y.Z: resumo

   Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
   ```
5. `git push origin main`. O GitHub Actions ("Publicar site") testa e publica em https://evandro-delmondez.github.io/meu-plantao/. Acompanhe com `~/.local/bin/gh run watch` (uma chamada, sem polling repetido) e confirme sucesso.
6. Painel no Claude: `dist/claude/painel.html` e `colegas.html` só são republicados como artefato se o usuário pedir.
7. Rode a parte final da skill `retomar` (atualizar DECISOES, ROTEIRO e resumo ao usuário).

Nunca: publicar com teste falhando, usar `--no-verify`, `git push --force`, ou pôr PDFs de livros/dados de paciente no repositório.

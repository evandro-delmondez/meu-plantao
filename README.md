# Meu Plantão

Apoio à prescrição e às condutas em plantão (UPA/pronto-socorro): condutas revisadas com fontes, medicações com diluições, pediatria por peso, feridas (raiva, tétano, sutura), escores, evolução e atestado. Funciona no celular e no computador, instala como app e abre sem internet.

> Material de apoio. A decisão clínica e a prescrição são responsabilidade do médico. Diluições marcadas como usuais variam entre serviços: confira o protocolo da unidade.

## Como publicar o site (uma vez)

1. Crie um repositório no GitHub (ex.: `meu-plantao`) e envie esta pasta. O jeito mais fácil é pelo Claude Code; veja `docs/COMO-USAR-CLAUDE-CODE.md`.
2. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada push na `main` roda a verificação de conteúdo e os testes. Se tudo passar, o site é publicado em `https://SEU-USUARIO.github.io/meu-plantao/`.

Se algum teste falhar, o site **não** é atualizado e a versão anterior continua no ar.

## Desenvolvimento

Requer Node 20 ou mais novo.

```bash
npm ci
npx playwright install chromium   # só na primeira vez
npm run verificar                 # conteúdo + build + testes
npm run serve                     # http://localhost:4173
```

Estrutura, regras e fluxo de trabalho: veja `CLAUDE.md`.

## Documentos

- `docs/ROTEIRO.md`: próximas entregas.
- `docs/REVISAO.md`: revisão trimestral do conteúdo.
- `docs/FORMATO-MEDICACOES.md`: formato das fichas de medicações.
- `CHANGELOG.md`: histórico de versões.

## Onde ficam os dados

As edições (prescrições, modelos, favoritos, categorias) ficam salvas no navegador de cada aparelho. Para levar a outro aparelho, use **Backup → Copiar/Importar**. Nenhum dado de paciente é salvo.

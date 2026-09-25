# Como usar o Meu Plantão com o Claude Code

O Claude Code trabalha direto na pasta do projeto no seu computador. Ele lê o `CLAUDE.md` (as regras do projeto), edita os arquivos, roda os testes e envia para o GitHub. O site é publicado sozinho a cada envio que passar nos testes.

## 1. Preparar o computador (uma vez)

- **Git:** https://git-scm.com. No Mac, já vem com as ferramentas do Xcode.
- **Node.js 20 ou mais novo:** https://nodejs.org (versão LTS).
- **Conta no GitHub:** https://github.com. Recomendo instalar também o GitHub CLI (https://cli.github.com) e rodar `gh auth login`.
- **Claude Code:** siga https://docs.claude.com/en/docs/claude-code (instalação e login com a sua conta Claude).

## 2. Abrir o projeto

1. Descompacte `meu-plantao.zip` numa pasta sua (ex.: `Documentos/meu-plantao`).
2. Abra o terminal nessa pasta e rode:
   ```bash
   npm ci
   npx playwright install chromium
   claude
   ```
3. Peça ao Claude Code:
   > Crie um repositório público no GitHub chamado meu-plantao com esta pasta, envie o código e ative o GitHub Pages usando GitHub Actions.

   **Por que público:** o GitHub Pages grátis só publica repositórios públicos, e o código não tem nenhum dado de paciente nem as suas edições, que ficam no seu navegador. Se preferir privado, dá para publicar pela Netlify ou pela Cloudflare Pages ligadas ao repositório privado. Peça isso ao Claude Code.

## 3. Pedidos que funcionam bem

- "Adicione a conduta de herpes-zóster com fontes atuais (diretriz e bula), rode `npm run verificar` e me mostre o diff."
- "Revise as fichas de antibióticos contra as bulas atuais e peça conferência independente antes de alterar."
- "Crie a bomba de infusão contínua (noradrenalina, dobutamina, midazolam, fentanil) com testes."
- "Faça a revisão trimestral seguindo `docs/REVISAO.md`."
- "Suba a versão, atualize o CHANGELOG e envie para o GitHub."

O Claude Code segue o `CLAUDE.md`: nada clínico sem fonte, teste para cada funcionalidade e verificação completa antes de enviar.

## 4. Fluxo recomendado

1. Uma branch por entrega (ex.: `feat/bomba-infusao`). O GitHub roda a verificação automaticamente.
2. Pull request → confira o resumo e o diff → **merge na `main`** → o site é publicado.
3. Se algo quebrar, a verificação barra a publicação e o site continua na versão anterior.

## 5. E o painel dentro do Claude?

O painel no Claude (com sincronização na nuvem) e a cópia para colegas saem do mesmo código, em `dist/claude/`. Para atualizá-los depois de uma mudança, abra uma conversa no Claude, envie o arquivo `dist/claude/painel.html` e peça para atualizar o artefato existente, colando o link dele.

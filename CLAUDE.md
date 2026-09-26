# Meu Plantão — instruções para o Claude Code

Painel de apoio à prescrição e às condutas em plantão (UPA/PS), usado por um médico no Brasil. Sai em três versões geradas pelo mesmo código: o site (PWA, GitHub Pages), o painel no Claude (artefato com nuvem) e a cópia para colegas.

## Regras que não podem ser quebradas

1. **Nada clínico sem fonte.** Toda dose, diluição, conduta, escore ou alerta precisa de fonte citada no próprio item (`fontes`/`src`). Na dúvida, não inclua; pergunte ou pesquise em fonte primária: diretriz, bula ANVISA/FDA, Ministério da Saúde ou sociedade médica. Use sempre a versão mais recente da diretriz; livros-texto de referência (Harrison, 22ª ed.; Medicina de Emergência: Abordagem Prática, HC-FMUSP, 18ª ed.) servem para conferir, citando capítulo e edição, sem copiar trechos.
2. **Conteúdo de alto risco passa por conferência independente.** Doses, pediatria, diluições EV e antídotos são conferidos por um segundo agente contra as fontes antes do merge.
3. **Português do Brasil, sem CAPS LOCK.** O `npm run lint:conteudo` barra trechos longos em maiúsculas.
4. **Persistência à prova de falha.** O usuário não pode perder o que preencheu. Qualquer mudança em `01-armazenamento.js`, `16-backup.js`, `17-nuvem.js` ou nas chaves `rxp_*` do `localStorage` precisa manter compatibilidade com os dados já salvos e ter teste.
5. **Nenhum dado de paciente é salvo.** Idade, peso, creatinina e gestação ficam só na memória da aba.
6. **Visual colorido por categoria**, funcionando no celular (390 px, sem rolagem lateral) e no tema escuro.

## Estrutura

```
src/
  index.html            marcação das abas (placeholders /*__CSS__*/, /*__DATA__*/, /*__JS__*/)
  styles.css            estilos (tokens de cor em :root, tema escuro)
  js/NN-nome.js         lógica, concatenada em ordem numérica dentro de um IIFE
  data/condutas.js      CATS + BASE (condutas: casa, unidade, orient, fontes, rev)
  data/regras.js        alertas por perfil (gestante, idoso, rim, alergia), diluições
  data/pediatria.js     geradores pediátricos por peso/idade
  data/extras.js        ajuste renal, alta, dengue, emergência pediátrica, escores (SC)
  data/checklists.js    checklist "não esquecer" por conduta (CHECK: hist, ant, ex, alarme, fontes)
  data/calculadora.js   doses por peso (CALC; cada bloco com src)
  data/infusao.js       bomba de infusão (INFUSAO), checklist de intubação e ventilação inicial
  data/medicacoes/*.json  fichas de medicações (formato em docs/FORMATO-MEDICACOES.md)
public/                 manifest, service worker (cache com hash automático), ícones
scripts/build.mjs       gera dist/site, dist/claude/painel.html, dist/claude/colegas.html
scripts/lint-content.mjs  verificação de conteúdo (fontes, CAPS, campos, revisão vencida)
tests/*.spec.mjs        Playwright (projetos "computador" e "celular")
docs/                   roteiro, revisão trimestral, formato das medicações
```

## Comandos

- `npm run build`: gera as três versões em `dist/`.
- `npm run lint:conteudo`: verifica o conteúdo clínico.
- `npm test`: build + todos os testes.
- `npm run verificar`: conteúdo + build + testes. Rode antes de todo commit.
- `npm run serve`: abre o site em http://localhost:4173.

## Como trabalhar

- **Nova conduta:** adicione em `src/data/condutas.js` com `fontes`. Se for revisão, registre em `rev`.
- **Novo checklist:** adicione em `src/data/checklists.js` com a mesma chave da conduta, os quatro grupos e `fontes`. Escreva cada item como substantivo ("febre", "tosse"), para caber em "Refere…" e "Nega…". O lint barra checklist sem fonte ou com grupo vazio.
- **Nova medicação:** adicione ao JSON do grupo em `src/data/medicacoes/`, seguindo `docs/FORMATO-MEDICACOES.md`. O `ped_calc` só entra com mg/kg explícito na fonte. Grupo novo: crie o JSON e registre em `MGRUPOS` (`src/js/19-medicacoes.js`) e em `MED_ORDER` (`scripts/build.mjs`).
- **Aba nova:** marcação em `src/index.html` (botão em `.tabs` com `data-sec`), lógica em `src/js/NN-nome.js`, nome em `TABS` e na seção certa de `SECOES` (`05-abas.js`), e na lista do teste de layout.
- **Toda funcionalidade nova tem teste** em `tests/`.
- **Versão:** a cada entrega, suba `version` no `package.json` e registre no `CHANGELOG.md`.
- **Publicação do site:** automática no push para `main`, pelo GitHub Actions, se o conteúdo e os testes passarem.
- **Publicação no Claude:** `dist/claude/painel.html` e `dist/claude/colegas.html` são republicadas como artefatos. Numa conversa do Claude, peça para atualizar o artefato existente passando o link dele, para manter o mesmo endereço.

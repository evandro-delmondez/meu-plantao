import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

// pacote fictício: o conteúdo real do hospital nunca entra no repositório público
const PACOTE = {
  formato: 1, nome: "Hospital Fictício de Teste", curto: "Fictício", cor: "#7a3e9d", versao: "2099-01-01",
  aviso: "Uso interno do hospital fictício.",
  docs: [
    { id: "sep", titulo: "Protocolo fictício de sepse", ref: "PROT-000 v1", secoes: [
      { id: "abertura", titulo: "Abertura do protocolo", md: "Texto fictício de abertura.\n- item fictício um\n- item **forte** fictício" },
      { id: "tabela", titulo: "Tabela fictícia", md: "| Coluna A | Coluna B |\n|---|---|\n| valor zeta | valor ômega |" }] },
    { id: "dt", titulo: "Protocolo fictício de dor torácica", secoes: [{ id: "rota", titulo: "Rota fictícia", md: "Rota quimera." }] }],
  atalhos: { sepse: [{ doc: "sep", secao: "tabela" }], "q:dor-toracica": [{ doc: "dt", secao: "rota" }] },
  internacao: {
    nota: "Critérios fictícios.", ref: "Anexo fictício",
    prioridades: [{ n: 1, txt: "prioridade fictícia", destino: "UTI fictícia" }],
    doencas: [{ id: "sep", nome: "Sepse fictícia", condutas: ["sepse"], itens: ["critério alfa", "critério beta"] }],
    grupos: [{ id: "g1", nome: "Grupo fictício", itens: ["critério gama"] }],
    proibidas: ["frase proibida fictícia"], lembretes: ["lembrete fictício"]
  },
  condutas: { sepse: { ref: "Referência fictícia da sepse", unidade: "1) Remédio quimera 1 g EV fictício." } },
  divergencias: [{ condutas: ["sepse"], tema: "Tema fictício", hospital: { txt: "versão hospital fictícia", fonte: "fonte hospital fictícia" }, app: { txt: "versão app fictícia", fonte: "fonte app fictícia" } }],
  regras: [{ condutas: ["sepse", "q:febre"], txt: "regra fictícia do hospital", ref: "seção fictícia" }],
  evolucao: { lembretes: ["lembrete fictício da evolução"], proibidasMotivo: "motivo fictício" },
  desfechos: [{ id: "alta", rot: "Alta fictícia", txt: "- Alta fictícia registrada." }, { id: "evasao-ficticia", rot: "Evasão fictícia", txt: "- Evasão fictícia registrada." }]
};
const CHAVE = "chave-ficticia-de-teste";

async function rotaGithub(page, pedidos) {
  await page.route("https://api.github.com/**", (route) => {
    const h = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "content-type": "application/json" };
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: h });
    pedidos.push({ url: route.request().url(), auth: route.request().headers().authorization });
    const ok = route.request().headers().authorization === "Bearer " + CHAVE;
    return route.fulfill({ status: ok ? 200 : 401, headers: h, body: ok ? JSON.stringify(PACOTE) : "{}" });
  });
}
async function baixar(page) {
  await aba(page, "hospital");
  await page.fill("#hospRepo", "usuario/privado");
  await page.fill("#hospArq", "hospital.json");
  await page.fill("#hospChave", CHAVE);
  await page.click("#hospBaixar");
  await expect(page.locator(".hosphead")).toContainText("Hospital Fictício de Teste");
}

test("sem pacote: gaveta vazia, nada de hospital nas condutas nem no seletor", async ({ page }) => {
  const erros = await abrir(page);
  await expect(page.locator("#hRedeHosp")).toBeHidden();
  await aba(page, "hospital");
  await expect(page.locator("#hospCfg")).toHaveAttribute("open", "");
  await aba(page, "prescricoes");
  await page.click('#list .item[data-id="sepse"] >> nth=0');
  await expect(page.locator("#detail .hospat")).toHaveCount(0);
  expect(erros).toEqual([]);
});

test("baixa do repositório com a chave, mostra atalhos e o seletor; continua após recarregar e fica fora do backup", async ({ page }) => {
  const pedidos = []; await rotaGithub(page, pedidos);
  const erros = await abrir(page);
  await page.evaluate(() => localStorage.setItem("rxp_ui_v1", JSON.stringify(Object.assign(JSON.parse(localStorage.getItem("rxp_ui_v1") || "{}"), { ciatox: { nome: "CIATox teste", tel: "61 0000-0000" } }))));
  await page.reload();
  await baixar(page);
  expect(pedidos[0].url).toBe("https://api.github.com/repos/usuario/privado/contents/hospital.json");
  expect(pedidos[0].auth).toBe("Bearer " + CHAVE);
  // documento com tabela e busca
  await expect(page.locator("#hospDoc table")).toContainText("valor zeta");
  await page.fill("#hospQ", "quimera");
  await expect(page.locator("#hospDoc [data-hd]")).toHaveCount(1);
  // seletor "Onde estou hoje" ganha o hospital, com o nome curto do pacote
  await aba(page, "inicio");
  await expect(page.locator("#hRedeHosp")).toHaveText("Fictício");
  await page.click("#hRedeHosp");
  const uiSalva = await page.evaluate(() => JSON.parse(localStorage.getItem("rxp_ui_v1")));
  expect(uiSalva.rede).toBe("hospital");
  expect(uiSalva.ciatox.tel).toBe("61 0000-0000");   // a chave antiga continua com o que já tinha
  // conduta com atalho: abre a seção certa por cima, sem perder a conduta
  await aba(page, "prescricoes");
  await page.click('#list .item[data-id="sepse"] >> nth=0');
  await expect(page.locator("#detail .hospat")).toContainText("protocolo do hospital ativo");
  await page.locator("#detail [data-hab]").click();
  await expect(page.locator("#hospSheet")).toBeVisible();
  await expect(page.locator("#hsBody")).toContainText("valor ômega");
  await expect(page.locator("#hsBody")).not.toContainText("Texto fictício de abertura");
  await page.keyboard.press("Escape");
  await expect(page.locator("#hospSheet")).toBeHidden();
  await expect(page.locator("#detail h2")).toHaveText(/Sepse/);
  // queixa com atalho
  await aba(page, "queixas");
  await page.click('#qLista [data-q="dor-toracica"]');
  await expect(page.locator("#qCorpo .hospat [data-hab]")).toContainText("Rota fictícia");
  // recarregar: o pacote continua; o backup não leva pacote nem chave
  await page.reload();
  await aba(page, "hospital");
  await expect(page.locator(".hosphead")).toContainText("Hospital Fictício de Teste");
  await aba(page, "backup");
  const bk = await page.evaluate(() => { let t = ""; const o = navigator.clipboard; navigator.clipboard.writeText = (x) => { t = x; return Promise.resolve() }; document.querySelector("#bkCopy").click(); return new Promise((r) => setTimeout(() => r(t), 200)); });
  expect(bk).not.toContain(CHAVE);
  expect(bk).not.toContain("Fictício");
  expect(erros).toEqual([]);
});

test("internação: critérios marcados viram a justificativa; Novo paciente limpa; apagar tira pacote e chave", async ({ page }) => {
  const pedidos = []; await rotaGithub(page, pedidos);
  const erros = await abrir(page);
  await baixar(page);
  await aba(page, "prescricoes");
  await page.click('#list .item[data-id="sepse"] >> nth=0');
  await page.locator("#detail [data-hint]").click();
  await page.locator('#hospSheet [data-hi="1"]').check();
  await page.selectOption("#hiPri", "1");
  await expect(page.locator("#hiOut")).toHaveValue("Justificativa da internação (Sepse fictícia): critério beta. Prioridade 1: prioridade fictícia (UTI fictícia).");
  await expect(page.locator("#hospSheet .hospaviso")).toContainText("frase proibida fictícia");
  await page.keyboard.press("Escape");
  await page.click("#novoPac"); await page.click("#novoPac");
  await page.locator("#detail [data-hint]").click();
  await expect(page.locator('#hospSheet [data-hi="1"]')).not.toBeChecked();
  await page.keyboard.press("Escape");
  // apagar do aparelho (dois toques)
  await aba(page, "hospital");
  await page.click("#hospCfg summary");
  await page.click("#hospApagar"); await page.click("#hospApagar");
  expect(await page.evaluate(() => localStorage.getItem("mph_hospital_v1"))).toBeNull();
  await expect(page.locator("#hRedeHosp")).toBeHidden();
  expect(erros).toEqual([]);
});

test("chave recusada não guarda nada; importar arquivo funciona sem chave", async ({ page }) => {
  const pedidos = []; await rotaGithub(page, pedidos);
  const erros = await abrir(page);
  await aba(page, "hospital");
  await page.fill("#hospRepo", "usuario/privado");
  await page.fill("#hospChave", "chave-errada");
  await page.click("#hospBaixar");
  await expect(page.locator("#hospCfg")).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("mph_hospital_v1")).pac)).toBeUndefined();
  await page.setInputFiles("#hospArquivo", { name: "hospital.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(PACOTE)) });
  await expect(page.locator(".hosphead")).toContainText("Hospital Fictício de Teste");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("modo hospital: conduta do hospital em primeiro, versão do app recolhida, divergência, regras, desfechos e frase proibida", async ({ page }) => {
  const pedidos = []; await rotaGithub(page, pedidos);
  const erros = await abrir(page);
  await baixar(page);
  // pacote carregado, modo de sempre: conduta do app; divergência já aparece; regras não
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="sepse"]').click());
  await expect(page.locator('#detail textarea[data-f="unidade"]')).not.toHaveValue(/quimera/);
  await expect(page.locator("#detail .hospdiv")).toContainText("versão hospital fictícia");
  await expect(page.locator("#detail .hospdiv")).toContainText("fonte app fictícia");
  await expect(page.locator("#detail .hospregras")).toHaveCount(0);
  // modo hospital
  await aba(page, "inicio"); await page.click("#hRedeHosp");
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="sepse"]').click());
  await expect(page.locator('#detail textarea[data-f="unidade"]')).toHaveValue("1) Remédio quimera 1 g EV fictício.");
  await expect(page.locator("#detail .hospunid h3")).toContainText("protocolo de Fictício");
  await expect(page.locator("#detail .hospunid")).toContainText("Referência fictícia da sepse");
  await page.locator("#detail .appver summary").click();
  await expect(page.locator("#detail .appver pre")).toContainText("30 mL/kg");
  await expect(page.locator("#detail .hospregras")).toContainText("regra fictícia do hospital");
  // fechar o atendimento: desfechos do hospital e lembretes
  await page.evaluate(() => document.querySelector("#atdIr").click());
  const sel = page.locator('#atCorpo [data-atd="destino"]');
  await expect(sel.locator("option")).toHaveText(["— não incluir —", "Alta fictícia", "Evasão fictícia"]);
  await page.locator('#atCorpo [data-atd="unid"]').check();
  await sel.selectOption("evasao-ficticia");
  await expect(page.locator('#atCorpo [data-atout="alta"]')).toHaveValue(/- Evasão fictícia registrada\./);
  await expect(page.locator('#atCorpo [data-atout="trat"]')).toHaveValue(/Remédio quimera/);
  await expect(page.locator("#atHosp")).toContainText("lembrete fictício da evolução");
  await page.fill('#atCorpo [data-atd="hma"]', "Paciente encaminhado: frase proibida fictícia.");
  await expect(page.locator("#atHosp .hospproib")).toContainText("frase proibida fictícia");
  await page.evaluate(() => document.querySelector('.tabs [data-tab="prescricoes"]').click());
  // editar a conduta do hospital e salvar como padrão não grava o texto do hospital
  const ta = page.locator('#detail textarea[data-f="unidade"]');
  await page.locator("#detail .hospunid .unedit summary").click();
  await ta.fill("1) Remédio quimera 2 g EV fictício."); await ta.dispatchEvent("input");
  await page.click("#sessSave");
  const ov = await page.evaluate(() => localStorage.getItem("rxp_overrides_v1") || "");
  expect(ov).not.toContain("quimera");
  // queixa ganha a regra; voltar para UPA tira tudo do modo
  await aba(page, "queixas"); await page.click('#qLista [data-q="febre"]');
  await expect(page.locator("#qCorpo .hospregras")).toContainText("regra fictícia");
  await aba(page, "inicio"); await page.click('[data-rede="publica"]');
  await aba(page, "evolucao");
  await expect(page.locator('#atCorpo [data-atd="destino"] option')).toHaveText(["— não incluir —", "Alta com orientações", "Observação", "Internação", "Transferência"]);
  expect(erros).toEqual([]);
});

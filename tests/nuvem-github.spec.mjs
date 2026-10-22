import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

// GitHub falso em memória, um arquivo por caminho
async function githubFalso(context, store) {
  await context.route("https://api.github.com/**", async (route) => {
    const r = route.request(), h = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,PUT,OPTIONS", "content-type": "application/json" };
    if (r.method() === "OPTIONS") return route.fulfill({ status: 204, headers: h });
    if (r.headers().authorization !== "Bearer chave-modelos-ficticia") return route.fulfill({ status: 401, headers: h, body: JSON.stringify({ message: "Bad credentials" }) });
    const p = new URL(r.url()).pathname, f = store[p];
    if (r.method() === "GET") return f ? route.fulfill({ status: 200, headers: h, body: JSON.stringify({ sha: f.sha, content: f.content }) }) : route.fulfill({ status: 404, headers: h, body: "{}" });
    const b = JSON.parse(r.postData());
    if (f && b.sha !== f.sha) return route.fulfill({ status: 409, headers: h, body: "{}" });
    store[p] = { content: b.content, sha: "s" + Math.random() };
    return route.fulfill({ status: 200, headers: h, body: "{}" });
  });
}
async function ligar(page) {
  await aba(page, "backup");
  await page.fill("#gsRepo", "usuario/plantao-modelos");
  await page.fill("#gsChave", "chave-modelos-ficticia");
  await page.click("#gsLiga");
  await expect(page.locator("#gsEstado")).toContainText("Salvo na nuvem");
}
const arquivo = (store) => { const f = store["/repos/usuario/plantao-modelos/contents/meus-padroes.json"]; return f ? Buffer.from(f.content, "base64").toString("utf8") : ""; };

test("padrões editados num aparelho aparecem no outro; o arquivo não leva dado de paciente", async ({ browser }) => {
  const store = {};
  const a = await browser.newContext(), b = await browser.newContext();
  await githubFalso(a, store); await githubFalso(b, store);
  const pa = await a.newPage(), pb = await b.newPage();
  const ea = await abrir(pa), eb = await abrir(pb);
  await ligar(pa);
  // aparelho A: paciente em atendimento (não pode ir para a nuvem) e um padrão editado
  await aba(pa, "prescricoes");
  await pa.evaluate(() => document.querySelector('#list .item[data-id="amigdalite"]').click());
  await pa.evaluate(() => document.querySelector("#atdIr").click());
  await pa.fill('#atCorpo [data-atd="hma"]', "história do paciente fulano");
  await pa.click("#atEdita");
  const hist = pa.locator('#atCorpo [data-edc="amigdalite|hist"]');
  await hist.fill((await hist.inputValue()) + "\nitem sincronizado do médico");
  const un = pa.locator('#atCorpo [data-edt="amigdalite|unidade"]');
  await un.fill((await un.inputValue()) + "\n9) Remédio sincronizado 1 ampola IM.");
  await pa.click("#atEdSalva");
  await expect.poll(() => arquivo(store), { timeout: 15000 }).toContain("Remédio sincronizado");
  await expect.poll(() => arquivo(store)).toContain("item sincronizado do médico");
  expect(arquivo(store)).not.toContain("fulano");
  expect(JSON.parse(arquivo(store))).toMatchObject({ app: "meu-plantao", v: 1 });
  // aparelho B liga e recebe
  await ligar(pb);
  await aba(pb, "prescricoes");
  await pb.evaluate(() => document.querySelector('#list .item[data-id="amigdalite"]').click());
  await pb.evaluate(() => document.querySelector("#atdIr").click());
  await expect(pb.locator("#atCorpo .ck", { hasText: "item sincronizado do médico" })).toHaveCount(1);
  await expect(pb.locator("#atCorpo .unlista")).toContainText("Remédio sincronizado 1 ampola IM.");
  // indicador do topo
  await expect(pb.locator("#syncTxt")).toHaveText("Salvo na nuvem");
  expect([...ea, ...eb]).toEqual([]);
  await a.close(); await b.close();
});

test("chave errada: mensagem com o motivo; nada é perdido no aparelho", async ({ page, context }) => {
  await githubFalso(context, {});
  const erros = await abrir(page);
  await aba(page, "backup");
  await page.fill("#gsRepo", "usuario/plantao-modelos");
  await page.fill("#gsChave", "errada");
  await page.click("#gsLiga");
  await expect(page.locator("#gsEstado")).toContainText("Chave recusada pelo GitHub (401: Bad credentials");
  expect(erros).toEqual([]);
});

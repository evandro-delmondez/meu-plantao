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

// gists falsos: lista pública por usuário e leitura sem chave; criar exige a chave
async function gistsFalsos(context, mem) {
  await context.route("https://api.github.com/**", async (route) => {
    const r = route.request(), u = new URL(r.url()), h = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,POST,PATCH,PUT,OPTIONS", "content-type": "application/json" };
    if (r.method() === "OPTIONS") return route.fulfill({ status: 204, headers: h });
    if (u.pathname === "/users/medico-teste/gists") return route.fulfill({ status: 200, headers: h, body: JSON.stringify(mem.gist ? [{ id: "g1", files: { "meu-plantao-acesso.json": {} } }] : []) });
    if (u.pathname === "/gists/g1" && r.method() === "GET") return route.fulfill({ status: 200, headers: h, body: JSON.stringify({ files: { "meu-plantao-acesso.json": { content: mem.gist } } }) });
    if (u.pathname.startsWith("/gists")) {
      if (r.headers().authorization !== "Bearer chave-modelos-ficticia") return route.fulfill({ status: 403, headers: h, body: JSON.stringify({ message: "Resource not accessible by personal access token" }) });
      mem.gist = JSON.parse(r.postData()).files["meu-plantao-acesso.json"].content;
      return route.fulfill({ status: 201, headers: h, body: JSON.stringify({ id: "g1", owner: { login: "medico-teste" } }) });
    }
    // nuvem dos padrões
    const p = u.pathname, f = mem[p];
    if (r.headers().authorization !== "Bearer chave-modelos-ficticia") return route.fulfill({ status: 401, headers: h, body: "{}" });
    if (r.method() === "GET") return f ? route.fulfill({ status: 200, headers: h, body: JSON.stringify({ sha: f.sha, content: f.content }) }) : route.fulfill({ status: 404, headers: h, body: "{}" });
    mem[p] = { content: JSON.parse(r.postData()).content, sha: "s" + Math.random() };
    return route.fulfill({ status: 200, headers: h, body: "{}" });
  });
}

test("senha de acesso: cria num computador, entra no outro só com usuário e senha; senha errada não entra; sair apaga as chaves", async ({ browser }) => {
  const mem = {};
  const a = await browser.newContext(), b = await browser.newContext();
  await gistsFalsos(a, mem); await gistsFalsos(b, mem);
  const pa = await a.newPage(), pb = await b.newPage();
  const ea = await abrir(pa), eb = await abrir(pb);
  await ligar(pa);
  await aba(pa, "backup");
  await pa.fill("#acSenha", "curta"); await pa.fill("#acSenha2", "curta"); await pa.click("#acCria");
  await expect(pa.locator("#acEstado")).toContainText("pelo menos 12");
  await pa.fill("#acSenha", "minha frase de acesso longa"); await pa.fill("#acSenha2", "minha frase de acesso longa"); await pa.click("#acCria");
  await expect(pa.locator("#acEstado")).toContainText("Pronto: a senha de acesso liga seus padrões", { timeout: 20000 });
  expect(mem.gist).not.toContain("chave-modelos-ficticia");
  // outro computador
  await aba(pb, "backup");
  await pb.fill("#acUser", "medico-teste"); await pb.fill("#acSenhaE", "senha errada qualquer"); await pb.click("#acEntra");
  await expect(pb.locator("#acEstado")).toContainText("Senha de acesso incorreta", { timeout: 20000 });
  await pb.fill("#acSenhaE", "minha frase de acesso longa"); await pb.click("#acEntra");
  await expect(pb.locator("#acEstado")).toContainText("seus padrões ligados", { timeout: 20000 });
  expect(await pb.evaluate(() => JSON.parse(localStorage.getItem("mph_nuvem_v1")).repo)).toBe("usuario/plantao-modelos");
  expect(await pb.evaluate(() => Object.values(localStorage).join(" "))).not.toContain("minha frase de acesso longa");
  // sair
  await expect(pb.locator("#acSai")).toBeVisible({ timeout: 5000 });
  pb.once("dialog", (d) => d.accept());
  await pb.click("#acSai");
  expect(await pb.evaluate(() => localStorage.getItem("mph_nuvem_v1"))).toBeNull();
  expect([...ea, ...eb]).toEqual([]);
  await a.close(); await b.close();
});

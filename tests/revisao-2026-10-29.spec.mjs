// Correções da revisão de código de 2026-10-29 (.rascunhos/revisao-codigo.md): um teste por item.
import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral, PAINEL } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
async function atender(page, id) { await aba(page, "prescricoes"); await conduta(page, id); await page.evaluate(() => document.querySelector("#atdIr").click()); await expect(page.locator("#tab-evolucao")).toBeVisible(); }
const campo = (page, k) => page.locator(`#atCorpo [data-atd="${k}"]`);
const saida = (page, k) => page.locator(`#atCorpo [data-atout="${k}"]`);
const lista = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("mph_pacientes_v1") || '{"pacs":[]}'));
const novoPaciente = async (page) => { await page.click("#atNovo"); await page.click("#atNovo"); };
const nomear = async (page, n) => { await page.fill("#atNome", n); await page.dispatchEvent("#atNome", "change"); };
const IA = () => localStorage.setItem("mph_ia_v1", JSON.stringify({ chave: "sk-ant-teste" }));
// resposta da IA com os mesmos números da entrada (passa na trava) e um marcador para achar depois
const ecoIA = (route, marca) => { const b = JSON.parse(route.request().postData()); const ent = b.messages[0].content.replace(/<\/?entrada>/g, "").trim();
  return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ content: [{ type: "text", text: ent + " " + marca }] }) }); };
const pac = (id, nome, criado, tipo, onde = "") => ({ id, nome, criado, upd: criado, dia: "", et: { exame: { on: false, ok: false, txt: "" }, med: { on: false, ok: false }, reav: { t: null }, parecer: { on: false, ok: false, esp: "" } }, desf: { tipo, onde, t: criado }, sabe: false, snap: null });

// GitHub falso da lista (como em pacientes.spec.mjs)
async function githubLista(context, store) {
  await context.route("https://api.github.com/**", async (route) => {
    const r = route.request(), h = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,PUT,OPTIONS", "content-type": "application/json" };
    if (r.method() === "OPTIONS") return route.fulfill({ status: 204, headers: h });
    if (r.headers().authorization !== "Bearer chave-escrita-ficticia") return route.fulfill({ status: 401, headers: h, body: "{}" });
    if (r.method() === "GET" && !r.url().includes("/contents/")) return route.fulfill({ status: 200, headers: h, body: JSON.stringify({ private: true }) });
    if (r.method() === "GET") return store.content ? route.fulfill({ status: 200, headers: h, body: JSON.stringify({ sha: store.sha, content: store.content }) }) : route.fulfill({ status: 404, headers: h, body: "{}" });
    const b = JSON.parse(r.postData());
    if (store.sha && b.sha !== store.sha) return route.fulfill({ status: 409, headers: h, body: "{}" });
    store.content = b.content; store.sha = "sha" + (++store.n);
    return route.fulfill({ status: 200, headers: h, body: JSON.stringify({ content: { sha: store.sha } }) });
  });
}
// GitHub falso dos padrões (como em nuvem-github.spec.mjs), um arquivo por caminho
async function githubPadroes(context, store) {
  await context.route("https://api.github.com/**", async (route) => {
    const r = route.request(), h = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,PUT,OPTIONS", "content-type": "application/json" };
    if (r.method() === "OPTIONS") return route.fulfill({ status: 204, headers: h });
    if (r.headers().authorization !== "Bearer chave-modelos-ficticia") return route.fulfill({ status: 401, headers: h, body: JSON.stringify({ message: "Bad credentials" }) });
    const p = new URL(r.url()).pathname, f = store[p];
    if (r.method() === "GET" && !p.includes("/contents/")) return route.fulfill({ status: 200, headers: h, body: JSON.stringify({ private: true }) });
    if (r.method() === "GET") return f ? route.fulfill({ status: 200, headers: h, body: JSON.stringify({ sha: f.sha, content: f.content }) }) : route.fulfill({ status: 404, headers: h, body: "{}" });
    const b = JSON.parse(r.postData());
    store[p] = { content: b.content, sha: "s" + Math.random() };
    return route.fulfill({ status: 200, headers: h, body: "{}" });
  });
}
const ARQ = "/repos/usuario/plantao-modelos/contents/meus-padroes.json";

/* ---------- críticos ---------- */

test("C1: atendimento sem nome não some ao começar outro pelo Início ou abrir paciente: fica na lista como 'Sem nome HH:MM'", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "pac");
  await campo(page, "hma").fill("tosse importante sem nome");
  await page.waitForTimeout(500);
  await aba(page, "inicio");
  await page.locator("#hNovo [data-naq]").first().click();
  await expect(page.locator("#tab-evolucao")).toBeVisible();
  await expect(campo(page, "hma")).toHaveValue("");
  let db = await lista(page);
  const sn = db.pacs.find((p) => /^Sem nome \d\d:\d\d$/.test(p.nome));
  expect(sn).toBeTruthy();
  expect(sn.snap.atd.hma).toBe("tosse importante sem nome");
  expect(sn.cond).toBe("pac");
  // volta pela lista com a HDA
  await aba(page, "pacientes");
  await page.locator("#pcCorpo .pcitem", { hasText: sn.nome }).locator("[data-pabrir]").first().click();
  await expect(campo(page, "hma")).toHaveValue("tosse importante sem nome");
  // abrir outro paciente da lista com um atendimento sem nome em andamento também guarda
  await novoPaciente(page);
  await atender(page, "amigdalite");
  await campo(page, "hma").fill("dor de garganta sem nome");
  await aba(page, "pacientes");
  await page.fill("#pcNome", "Bia da Lista"); await page.click("#pcAdd");
  await expect(page.locator("#atNome")).toHaveValue("Bia da Lista");
  db = await lista(page);
  expect(db.pacs.filter((p) => /^Sem nome/.test(p.nome)).map((p) => p.snap.atd.hma)).toContain("dor de garganta sem nome");
  // só escolher a conduta, sem preencher nada, não cria "Sem nome"
  const antes = (await lista(page)).pacs.length;
  await novoPaciente(page);
  await atender(page, "amigdalite");
  await aba(page, "inicio");
  await page.locator("#hNovo [data-naq]").first().click();
  expect((await lista(page)).pacs.length).toBe(antes);
  expect(erros).toEqual([]);
});

test("C2: depois de uma sincronização da lista, o que se digita em 'quem assume' continua indo para o registro", async ({ browser }) => {
  const store = { n: 0 };
  const ctx = await browser.newContext(); await githubLista(ctx, store);
  const page = await ctx.newPage(); const erros = await abrir(page);
  await aba(page, "pacientes");
  await page.locator(".pcsync summary").click();
  await page.fill("#psRepo", "usuario/plantao-lista");
  await page.fill("#psChave", "chave-escrita-ficticia"); await page.fill("#psSenha", "senha-do-plantao-1");
  await page.click("#psLiga");
  await expect(page.locator("#psEstado")).toContainText("Sincronizado");
  await page.fill("#pcNome", "Caio Sync"); await page.click("#pcAdd");
  await aba(page, "pacientes");
  await expect(page.locator("#psEstado")).toContainText("Sincronizado");
  const n0 = store.n;
  const assume = page.locator("#pcCorpo .pcitem", { hasText: "Caio Sync" }).locator("[data-passume]");
  await assume.click(); await page.keyboard.type("Dr. A");
  // a sincronização roda com o campo em foco (a tela não é refeita) e troca os registros
  await expect.poll(() => store.n, { timeout: 10000 }).toBeGreaterThan(n0);
  await expect(page.locator("#psEstado")).toContainText("Sincronizado");
  await page.keyboard.type("na");
  await page.keyboard.press("Tab");
  await expect.poll(async () => (await lista(page)).pacs.find((p) => p.nome === "Caio Sync").assume).toBe("Dr. Ana");
  await aba(page, "pacientes");
  await expect(page.locator("#pcCorpo .pcitem", { hasText: "Caio Sync" }).locator("[data-passume]")).toHaveValue("Dr. Ana");
  expect(erros).toEqual([]);
  await ctx.close();
});

test("C3: resposta da IA depois de trocar de paciente é descartada; texto mudado durante a espera fica", async ({ page }) => {
  const pedidos = [];
  await page.route("https://api.anthropic.com/**", (route) => { pedidos.push(route); });
  await page.addInitScript(IA);
  const erros = await abrir(page);
  await atender(page, "cefaleia");
  await nomear(page, "Paula Primeira");
  await campo(page, "hma").fill("dor de cabeca 2d");
  await page.click('#atCorpo [data-atia="hda"]');
  await expect.poll(() => pedidos.length).toBe(1);
  await novoPaciente(page);
  await atender(page, "cefaleia");
  await ecoIA(pedidos[0], "MARCA-ANTERIOR");
  await page.waitForTimeout(300);
  await expect(saida(page, "hda")).not.toHaveValue(/MARCA-ANTERIOR/);
  await expect(page.locator("#atCorpo [data-atia='hda']")).toBeEnabled();
  // mesmo paciente: digitou de novo enquanto a IA respondia, o texto dele fica
  await campo(page, "hma").fill("febre 3d");
  await page.click('#atCorpo [data-atia="hda"]');
  await expect.poll(() => pedidos.length).toBe(2);
  await campo(page, "hma").fill("febre 3d e tosse");
  await ecoIA(pedidos[1], "MARCA-VELHA");
  await expect(page.locator("#atIaEst")).toContainText("mudou enquanto a IA respondia");
  await expect(saida(page, "hda")).not.toHaveValue(/MARCA-VELHA/);
  await expect(saida(page, "hda")).toHaveValue(/tosse/);
  // sem mexer, a resposta entra
  await page.click('#atCorpo [data-atia="hda"]');
  await expect.poll(() => pedidos.length).toBe(3);
  await ecoIA(pedidos[2], "MARCA-BOA");
  await expect(saida(page, "hda")).toHaveValue(/MARCA-BOA/);
  expect(erros).toEqual([]);
});

/* ---------- importantes ---------- */

test("I1: o nome sendo digitado em Paciente não é apagado ao cruzar 860 px", async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 900 });
  const erros = await abrir(page);
  await atender(page, "pac");
  await page.click("#atNome"); await page.keyboard.type("Maria Silva");
  await page.setViewportSize({ width: 800, height: 900 });
  await page.waitForTimeout(300);
  await expect(page.locator("#atNome")).toHaveValue("Maria Silva");
  expect(erros).toEqual([]);
});

test("I2: Novo paciente começa sem a conduta do anterior; o novo da lista não herda a hipótese", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "pac");
  await novoPaciente(page);
  await expect(page.locator("#evCond")).toHaveValue("");
  await nomear(page, "Novo Fulano");
  await page.waitForTimeout(300);
  const p = (await lista(page)).pacs.find((x) => x.nome === "Novo Fulano");
  expect(p.cond || "").toBe("");
  expect(erros).toEqual([]);
});

test("I3: o checklist das outras queixas volta ao reabrir o paciente", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "pac");
  await nomear(page, "Ana Extras");
  await page.fill("#atAddQ", "faringite");
  await page.locator("#atAddSug [data-atadd]").first().click();
  await page.locator('#atChk1 [data-ck][data-val="+"]').first().click();
  await page.locator('#atChk0 [data-ck][data-val="+"]').first().click();
  await page.waitForTimeout(800);
  const marcados = () => page.evaluate(() => [0, 1].map((i) => document.querySelectorAll(`#atChk${i} [data-ck][aria-pressed="true"]`).length));
  expect(await marcados()).toEqual([1, 1]);
  await novoPaciente(page);
  await aba(page, "pacientes");
  await page.locator("#pcCorpo .pcitem", { hasText: "Ana Extras" }).locator("[data-pabrir]").first().click();
  await expect.poll(marcados).toEqual([1, 1]);
  expect(erros).toEqual([]);
});

test("I4/M10: Plantões abre pelo endereço (#plantoes) e ao recarregar; voltar no navegador troca a tela", async ({ page }) => {
  const erros = [];
  page.on("pageerror", (e) => erros.push(e.message));
  await page.goto(PAINEL + "#plantoes");
  await expect(page.locator("#tab-plantoes")).toBeVisible();
  await expect(page.locator("#plCorpo [data-pldia]").first()).toBeVisible();
  await page.reload();
  await expect(page.locator("#plCorpo [data-pldia]").first()).toBeVisible();
  await page.evaluate(() => { location.hash = "#pacientes"; });
  await expect(page.locator("#tab-pacientes")).toBeVisible();
  await page.goBack();
  await expect(page.locator("#tab-plantoes")).toBeVisible();
  expect(erros).toEqual([]);
});

test("I5: paciente passado não cria plantão; 'Tirar' tira o plantão marcado sozinho e ele não volta", async ({ page }) => {
  const erros = await abrir(page);
  const agora = Date.now();
  await page.evaluate((p) => localStorage.setItem("mph_pacientes_v1", JSON.stringify({ pacs: [p], cont: {}, apagados: {} })), pac("x1", "Passado Fulano", agora, "passado"));
  await page.reload(); await aba(page, "plantoes");
  const escala = () => page.evaluate(() => (JSON.parse(localStorage.getItem("rxp_model_v1") || "{}").plantoes || {}).escala || []);
  expect(await escala()).toEqual([]);
  // com uma alta: entra sozinho
  await page.evaluate((ps) => localStorage.setItem("mph_pacientes_v1", JSON.stringify({ pacs: ps, cont: {}, apagados: {} })), [pac("x1", "Passado Fulano", agora, "passado"), pac("x2", "Alta Fulana", agora, "alta")]);
  await page.reload(); await aba(page, "plantoes");
  await expect.poll(async () => (await escala()).length).toBe(1);
  const iso = (await escala())[0].data;
  if (!(await page.locator(`#plCorpo [data-pldia="${iso}"]`).count())) await page.click('#plCorpo [data-plmes="-1"]');
  await page.click(`#plCorpo [data-pldia="${iso}"]`);
  await page.click("#plDia [data-pltira]");
  await expect.poll(async () => (await escala()).length).toBe(0);
  await page.reload(); await aba(page, "plantoes");
  expect(await escala()).toEqual([]);
  expect(erros).toEqual([]);
});

test("I6/M9: plantão de 24 h soma dia e noite; matutino e vespertino no mesmo dia não contam em dobro", async ({ page }) => {
  const erros = await abrir(page);
  const [mm, ano] = await page.evaluate(() => { const d = new Date(); return [String(d.getMonth() + 1).padStart(2, "0"), d.getFullYear()]; });
  const dia = (n) => `${ano}-${mm}-${String(n).padStart(2, "0")}`;
  await page.evaluate(({ d2, d3, d4 }) => {
    const m = JSON.parse(localStorage.getItem("rxp_model_v1") || "{}"); m.v = m.v || 4;
    m.plantoes = { escala: [{ id: "a", data: d2, local: "hsls", turno: "24" }, { id: "b", data: d3, local: "hsls", turno: "24" }, { id: "m", data: d4, local: "hsls", turno: "M" }, { id: "v", data: d4, local: "hsls", turno: "V" }],
      contagem: { [d2 + "D"]: { n: 2, uti: 0 }, [d2 + "N"]: { n: 3, uti: 1 }, [d3 + "N"]: { n: 4, uti: 0 }, [d4 + "D"]: { n: 5, uti: 0 }, [d4 + "M"]: { n: 2, uti: 0 }, [d4 + "V"]: { n: 3, uti: 0 } }, pagos: {} };
    localStorage.setItem("rxp_model_v1", JSON.stringify(m));
  }, { d2: dia(2), d3: dia(3), d4: dia(4) });
  await page.reload(); await aba(page, "plantoes");
  const li = (n, t) => page.locator("#plCorpo .panel", { hasText: "Plantões do mês" }).locator(".pllista li", { hasText: `${String(n).padStart(2, "0")}/${mm}` }).filter({ hasText: t });
  await expect(li(2, "24 h")).toContainText("5 atendidos + 1 UTI");
  await expect(li(3, "24 h")).toContainText("4 atendidos");
  await expect(li(4, "Matutino")).toContainText("2 atendidos");
  await expect(li(4, "Vespertino")).toContainText("3 atendidos");
  expect(erros).toEqual([]);
});

test("I7: Atendimento sem rolagem lateral em 390 px e 840 px (select escondido da conduta)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const erros = await abrir(page);
  await atender(page, "pac");
  expect(await semRolagemLateral(page)).toBe(true);
  await page.setViewportSize({ width: 840, height: 900 });
  await page.waitForTimeout(200);
  expect(await semRolagemLateral(page)).toBe(true);
  await expect(page.locator("#evCond")).toHaveAttribute("tabindex", "-1");
  expect(erros).toEqual([]);
});

test("I8: nome com acento ou em outra caixa sai do texto antes da IA", async ({ page }) => {
  let corpo = "";
  await page.route("https://api.anthropic.com/**", (route) => { corpo = JSON.parse(route.request().postData()).messages[0].content; return ecoIA(route, "ok"); });
  await page.addInitScript(IA);
  const erros = await abrir(page);
  await atender(page, "cefaleia");
  await nomear(page, "Ângela Sá");
  await campo(page, "hma").fill("ângela refere dor há 2 dias; ANGELA tomou dipirona; Sá piorou no sábado");
  await page.click('#atCorpo [data-atia="hda"]');
  await expect.poll(() => corpo).toContain("dipirona");
  expect(corpo).not.toMatch(/[âa]ngela/i);
  expect(corpo).not.toMatch(/(^|[^\p{L}])sá([^\p{L}]|$)/iu);
  expect(corpo).toContain("sábado");
  expect(erros).toEqual([]);
});

test("I9/M3: arquivo da nuvem ilegível é regravado; favoritos com tipo errado não quebram o Início", async ({ browser }) => {
  const store = { [ARQ]: { sha: "s0", content: Buffer.from("{quebrado", "utf8").toString("base64") } };
  const ctx = await browser.newContext(); await githubPadroes(ctx, store);
  const page = await ctx.newPage(); const erros = await abrir(page);
  await aba(page, "backup");
  await page.fill("#gsRepo", "usuario/plantao-modelos"); await page.fill("#gsChave", "chave-modelos-ficticia");
  await page.click("#gsLiga");
  await expect(page.locator("#gsEstado")).toContainText("Salvo na nuvem");
  expect(JSON.parse(Buffer.from(store[ARQ].content, "base64").toString("utf8")).app).toBe("meu-plantao");
  // outro aparelho manda "uso" estragado e mais novo
  const d = JSON.parse(Buffer.from(store[ARQ].content, "base64").toString("utf8"));
  d.uso = { favs: "pac", counts: "x", rec: null, updatedAt: Date.now() + 1e7 };
  store[ARQ] = { sha: "s9", content: Buffer.from(JSON.stringify(d), "utf8").toString("base64") };
  await page.reload(); await aba(page, "inicio");
  await page.waitForTimeout(800);
  await aba(page, "backup"); await aba(page, "inicio");
  await expect(page.locator("#hNovo [data-naq]").first()).toBeVisible();
  const uso = await page.evaluate(() => JSON.parse(localStorage.getItem("rxp_uso_v1")));
  expect(Array.isArray(uso.favs)).toBe(true);
  expect(erros).toEqual([]);
  await ctx.close();
});

/* ---------- menores ---------- */

test("M1: buscar na lista não fecha a Passagem de plantão aberta", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "pacientes");
  await page.locator(".pcpass summary").click();
  await page.fill("#pcNome", "A");
  await expect(page.locator(".pcpass")).toHaveAttribute("open", "");
  expect(erros).toEqual([]);
});

test("M2: registro sem etapas ou sem desfecho não quebra a lista nem o Início", async ({ page }) => {
  const erros = await abrir(page);
  await page.evaluate(() => localStorage.setItem("mph_pacientes_v1", JSON.stringify({ pacs: [null, { id: "z1", nome: "Zé Estranho", criado: Date.now() }, { id: "z2", nome: "Zeca Nulo", criado: Date.now(), et: null, desf: null }], cont: {}, apagados: {} })));
  await page.reload();
  await aba(page, "inicio");
  await expect(page.locator("#hPacs")).toContainText("Zé Estranho");
  await aba(page, "pacientes");
  await expect(page.locator("#pcCorpo .pcitem")).toHaveCount(2);
  await page.locator(".pcpass summary").click();
  await expect(page.locator("#pcPassTxt")).toHaveValue(/Zeca Nulo/);
  expect(erros).toEqual([]);
});

test("M4: duas condutas no Atendimento e a conduta aberta não repetem ids", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "pac");
  await page.fill("#atAddQ", "faringite");
  await page.locator("#atAddSug [data-atadd]").first().click();
  const rep = await page.evaluate(() => { const c = {}; document.querySelectorAll("[id]").forEach((e) => { c[e.id] = (c[e.id] || 0) + 1; }); return Object.keys(c).filter((k) => c[k] > 1); });
  expect(rep).toEqual([]);
  expect(erros).toEqual([]);
});

test("M5: o relógio do atendimento não refaz as notas ⓘ a cada segundo", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "pac");
  await nomear(page, "Relógio Teste");
  await page.evaluate(() => { window.__n = 0; const q = Document.prototype.querySelectorAll; Document.prototype.querySelectorAll = function (s) { if (/h2:not\(\[id\]\)\+p\.note/.test(s)) window.__n++; return q.call(this, s); }; });
  await page.waitForTimeout(2500);
  expect(await page.evaluate(() => window.__n)).toBe(0);
  expect(erros).toEqual([]);
});

test("M6: menu ☰ Mais abre com foco no primeiro item e Esc devolve o foco ao botão", async ({ page }) => {
  const erros = await abrir(page);
  await page.click("#maisBtn");
  expect(await page.evaluate(() => document.activeElement === document.querySelector("#maisMenu button"))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.locator("#maisMenu")).toBeHidden();
  expect(await page.evaluate(() => document.activeElement.id)).toBe("maisBtn");
  await expect(page.locator('[role="menuitem"], [role="menu"]')).toHaveCount(0);
  expect(erros).toEqual([]);
});

test("M7: edição feita durante a nova tentativa de envio à nuvem do Claude não sai da fila", async ({ page }) => {
  await page.addInitScript(() => {
    window.__sets = []; let falhou = false;
    const doc = (path) => ({ get: async () => ({ exists: false, data: () => null }),
      set: async (d) => { if (path.startsWith("prescricoes/") && !falhou) { falhou = true; const e = new Error("indisponível"); e.code = "unavailable"; throw e; } window.__sets.push([path, JSON.parse(JSON.stringify(d))]); } });
    window.claude = { use: async () => ({ doc, collection: () => ({ onSnapshot: () => {} }) }) };
  });
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  const ed = 'textarea.rx-edit[data-f="casa"]';
  await page.fill(ed, "PRIMEIRA VERSAO"); await page.dispatchEvent(ed, "input"); await page.click("#sessSave");
  await page.fill(ed, "SEGUNDA VERSAO"); await page.dispatchEvent(ed, "input"); await page.click("#sessSave");
  await expect.poll(() => page.evaluate(() => { const s = window.__sets.filter((x) => x[0] === "prescricoes/amigdalite"); return s.length ? s[s.length - 1][1].casa : ""; }), { timeout: 8000 }).toBe("SEGUNDA VERSAO");
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("rxp_pending_v1") || "[]").length)).toBe(0);
  expect(erros).toEqual([]);
});

test("M8: Sair deste computador apaga também o atendimento aberto e a cópia da aba", async ({ browser }) => {
  const store = {};
  const ctx = await browser.newContext(); await githubPadroes(ctx, store);
  const page = await ctx.newPage(); const erros = await abrir(page);
  await page.evaluate(() => localStorage.setItem("mph_nuvem_v1", JSON.stringify({ repo: "usuario/plantao-modelos", chave: "chave-modelos-ficticia" })));
  await page.reload();
  await atender(page, "pac");
  await campo(page, "hma").fill("história que tem de sair");
  await page.waitForTimeout(600);
  expect(await page.evaluate(() => sessionStorage.getItem("mph_atd_sessao"))).toContain("história que tem de sair");
  await aba(page, "backup");
  page.once("dialog", (d) => d.accept());
  await page.click("#acSai");
  expect(await page.evaluate(() => sessionStorage.getItem("mph_atd_sessao"))).toBeNull();
  await aba(page, "evolucao");
  await atender(page, "pac");
  await expect(campo(page, "hma")).toHaveValue("");
  expect(erros).toEqual([]);
  await ctx.close();
});

test("M11: IA sem resposta tem limite de tempo e devolve o botão", async ({ page }) => {
  await page.clock.install();
  await page.route("https://api.anthropic.com/**", () => {});   // nunca responde
  await page.addInitScript(IA);
  const erros = await abrir(page);
  await atender(page, "cefaleia");
  await campo(page, "hma").fill("dor de cabeca 2d");
  await page.click('#atCorpo [data-atia="hda"]');
  await expect(page.locator("#atIaEst")).toContainText("Melhorando");
  await page.clock.runFor(31000);
  await expect(page.locator("#atIaEst")).toContainText("demorou demais");
  await expect(page.locator('#atCorpo [data-atia="hda"]')).toBeEnabled();
  expect(erros).toEqual([]);
});

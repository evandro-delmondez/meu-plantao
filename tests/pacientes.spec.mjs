import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

const campo = (page, k) => page.locator(`#atCorpo [data-atd="${k}"]`);
const item = (page, nome) => page.locator("#pcCorpo .pcitem", { hasText: nome });

test("nome no Atendimento põe na lista; etapas, desfecho e passagem; volta ao abrir; fica fora do backup", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="pac"]').click());
  await page.evaluate(() => document.querySelector("#atdIr").click());
  await page.fill("#atNome", "Maria Teste da Silva"); await page.dispatchEvent("#atNome", "change");
  await expect(page.locator("#atNaLista")).toContainText("Na lista do plantão");
  await campo(page, "hma").fill("tosse há 5 dias");
  await campo(page, "fr").fill("26");
  await page.waitForTimeout(800);
  // lista
  await page.click("#atLista");
  await expect(page.locator("#tab-pacientes")).toBeVisible();
  await expect(page.locator(".pcconta")).toContainText("1 hoje");
  const it = item(page, "Maria Teste da Silva");
  await expect(it).toContainText("Pneumonia");
  // exame: + → pendente (com qual) → pronto; medicação separada; parecer; reavaliação com hora
  await it.locator('[data-pe="exame"]').click();
  await it.locator('[data-ptxt="exame"]').fill("RX de tórax");
  await it.locator('[data-pe="parecer"]').click();
  await it.locator('[data-ptxt="parecer"]').fill("Cardiologia");
  await expect(it.locator('[data-pe="exame"]')).toContainText("pendente");
  await expect(it.locator('[data-pe="med"]')).toContainText("+ Medicação");
  // passagem de plantão
  await page.locator(".pcpass summary").click();
  await page.fill("#pcMed", "Dr. Plantonista B"); await page.fill("#pcLocal", "consultório 4");
  const msg = await page.inputValue("#pcPassTxt");
  expect(msg).toContain("• Maria Teste da Silva");
  expect(msg).toContain("Hipótese: Pneumonia");
  expect(msg).toContain("exame (RX de tórax) pendente");
  expect(msg).toContain("parecer da Cardiologia pendente");
  expect(msg).toContain("Sabe da troca: não");
  expect(msg).toContain("Assume: Dr. Plantonista B · consultório 4");
  await it.locator('[data-pe="exame"]').click();          // pronto
  await expect(it.locator('[data-pe="exame"]')).toContainText("pronto");
  await it.locator('[data-pe="reav"]').click();
  await expect(it.locator('[data-pe="reav"]')).toContainText("Reavaliado");
  await it.locator('[data-pd="tipo"]').selectOption("internacao");
  await it.locator('[data-pd="onde"]').selectOption("uti");
  expect(await page.inputValue("#pcPassTxt")).not.toContain("Maria Teste");   // com desfecho, sai da passagem
  expect(await semRolagemLateral(page)).toBe(true);
  // recarregar: a lista continua e o Atendimento volta ao abrir
  await page.reload();
  await aba(page, "pacientes");
  await item(page, "Maria Teste da Silva").locator("[data-pabrir]").first().click();
  await expect(page.locator("#tab-evolucao")).toBeVisible();
  await expect(campo(page, "hma")).toHaveValue("tosse há 5 dias");
  await expect(campo(page, "fr")).toHaveValue("26");
  await expect(page.locator("#atNome")).toHaveValue("Maria Teste da Silva");
  // o backup e as chaves rxp_* não levam o paciente
  const rxp = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith("rxp_")).map((k) => localStorage.getItem(k)).join(" "));
  expect(rxp).not.toContain("Maria Teste");
  await aba(page, "backup");
  const bk = await page.evaluate(() => { let t = ""; navigator.clipboard.writeText = (x) => { t = x; return Promise.resolve(); }; document.querySelector("#bkCopy").click(); return new Promise((r) => setTimeout(() => r(t), 200)); });
  expect(bk).not.toContain("Maria Teste");
  // Novo paciente guarda o atual e limpa a tela; o anterior continua na lista
  await aba(page, "evolucao");
  await page.click("#atNovo"); await page.click("#atNovo");
  await expect(page.locator("#atNome")).toHaveValue("");
  await expect(campo(page, "hma")).toHaveValue("");
  await aba(page, "pacientes");
  await expect(item(page, "Maria Teste da Silva")).toHaveCount(1);
  // apagar (dois toques)
  await item(page, "Maria Teste da Silva").locator("[data-papagar]").click();
  await item(page, "Maria Teste da Silva").locator("[data-papagar]").click();
  await expect(item(page, "Maria Teste da Silva")).toHaveCount(0);
  await expect(page.locator(".pcconta")).toContainText("1 hoje");           // a contagem do dia fica
  expect(erros).toEqual([]);
});

test("apaga quem tem mais de 7 dias (a contagem fica) e avisa 2 h sem reavaliar e 3 h sem desfecho", async ({ page }) => {
  const erros = await abrir(page);
  const h = 3600e3, agora = Date.now();
  const p = (id, nome, criado, reav) => ({ id, nome, criado, upd: criado, dia: "2000-01-01", cond: "itu", et: { exame: { on: false, ok: false, txt: "" }, med: { on: false, ok: false }, reav: { t: reav }, parecer: { on: false, ok: false, esp: "" } }, desf: { tipo: "", onde: "", t: null }, sabe: false, snap: null });
  await page.evaluate((d) => localStorage.setItem("mph_pacientes_v1", JSON.stringify(d)), {
    pacs: [p("a", "Antigo Oito Dias", agora - 8 * 24 * h, null), p("b", "Duas Horas Sem Reavaliar", agora - 2.2 * h, null), p("c", "Tres Horas Sem Desfecho", agora - 3.5 * h, agora - 0.5 * h), p("d", "Recem Chegado", agora - 0.2 * h, null)],
    cont: { "2000-01-01": 4 }, apagados: {}
  });
  await page.reload();
  await aba(page, "pacientes");
  await page.click('[data-pcver="todos"]');
  await expect(item(page, "Antigo Oito Dias")).toHaveCount(0);
  await expect(item(page, "Duas Horas Sem Reavaliar")).toHaveAttribute("data-av", "amarelo");
  await expect(item(page, "Tres Horas Sem Desfecho")).toHaveAttribute("data-av", "vermelho");
  await expect(item(page, "Recem Chegado")).toHaveAttribute("data-av", "");
  await page.locator("#pcCorpo details", { hasText: "Pacientes por dia" }).locator("summary").click();
  await expect(page.locator("#pcCorpo details", { hasText: "Pacientes por dia" })).toContainText("01/01/2000: 4");
  expect(await page.evaluate(() => localStorage.getItem("mph_pacientes_v1"))).not.toContain("Antigo Oito Dias");
  expect(erros).toEqual([]);
});

// GitHub falso em memória: guarda o arquivo como o GitHub guardaria (base64) para conferir que vai cifrado
async function githubFalso(context, store) {
  await context.route("https://api.github.com/**", async (route) => {
    const r = route.request(), h = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,PUT,OPTIONS", "content-type": "application/json" };
    if (r.method() === "OPTIONS") return route.fulfill({ status: 204, headers: h });
    if (r.headers().authorization !== "Bearer chave-escrita-ficticia") return route.fulfill({ status: 401, headers: h, body: "{}" });
    if (r.method() === "GET") return store.content ? route.fulfill({ status: 200, headers: h, body: JSON.stringify({ sha: store.sha, content: store.content }) }) : route.fulfill({ status: 404, headers: h, body: "{}" });
    const b = JSON.parse(r.postData());
    if (store.sha && b.sha !== store.sha) return route.fulfill({ status: 409, headers: h, body: "{}" });
    store.content = b.content; store.sha = "sha" + (++store.n);
    return route.fulfill({ status: 200, headers: h, body: JSON.stringify({ content: { sha: store.sha } }) });
  });
}
async function ligar(page, senha) {
  await aba(page, "pacientes");
  await page.locator(".pcsync summary").click();
  await page.fill("#psRepo", "usuario/plantao-lista");
  await page.fill("#psChave", "chave-escrita-ficticia");
  await page.fill("#psSenha", senha);
  await page.click("#psLiga");
}

test("sincronização cifrada: o outro aparelho recebe a lista; o repositório só vê texto cifrado; senha errada não abre", async ({ browser }) => {
  const store = { n: 0 };
  const a = await browser.newContext(), b = await browser.newContext(), c = await browser.newContext();
  for (const x of [a, b, c]) await githubFalso(x, store);
  const pa = await a.newPage(), pb = await b.newPage(), pc = await c.newPage();
  const ea = await abrir(pa), eb = await abrir(pb), ec = await abrir(pc);
  // aparelho A: liga e cadastra
  await ligar(pa, "senha-do-plantao-1");
  await expect(pa.locator("#psEstado")).toContainText("Sincronizado");
  await pa.fill("#pcNome", "João Sincronizado Pereira"); await pa.click("#pcAdd");
  await expect(pa.locator("#tab-evolucao")).toBeVisible();
  await aba(pa, "pacientes"); await pa.click("#psAgora");
  await expect.poll(() => store.n).toBeGreaterThan(1);
  const bruto = Buffer.from(store.content, "base64").toString("utf8");
  expect(bruto).not.toContain("João");
  expect(JSON.parse(bruto)).toMatchObject({ v: 1, alg: "AES-GCM/PBKDF2-SHA256" });
  // aparelho B, mesma senha: recebe
  await ligar(pb, "senha-do-plantao-1");
  await expect(pb.locator("#pcCorpo .pcitem", { hasText: "João Sincronizado Pereira" })).toHaveCount(1);
  // B marca a reavaliação; A recebe
  await pb.locator("#pcCorpo .pcitem", { hasText: "João" }).locator('[data-pe="reav"]').click();
  await pb.click("#psAgora"); await expect(pb.locator("#psEstado")).toContainText("Sincronizado");
  await pa.click("#psAgora"); await expect(pa.locator("#psEstado")).toContainText("Sincronizado");
  await expect(pa.locator("#pcCorpo .pcitem", { hasText: "João" }).locator('[data-pe="reav"]')).toContainText("Reavaliado");
  // aparelho C, senha errada: não liga e não recebe nada
  await ligar(pc, "outra-senha-qualquer");
  await expect(pc.locator("#psEstado")).toContainText("Senha diferente");
  await expect(pc.locator("#pcCorpo .pcitem")).toHaveCount(0);
  // a senha nunca fica guardada
  expect(await pa.evaluate(() => Object.values(localStorage).join(" "))).not.toContain("senha-do-plantao-1");
  expect([...ea, ...eb, ...ec]).toEqual([]);
  await a.close(); await b.close(); await c.close();
});

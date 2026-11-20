import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

const item = (page, nome) => page.locator("#pcCorpo .pcitem", { hasText: nome });
const novo = async (page, nome) => { await aba(page, "pacientes"); await page.fill("#pcNome", nome); await page.click("#pcAdd"); await aba(page, "pacientes"); };

test("lembrete de reavaliação: medicação liga 30 min, troca 60/120/desliga, vencido avisa na lista e no Início", async ({ page }) => {
  const erros = await abrir(page);
  await novo(page, "Paciente Lembrete");
  const it = item(page, "Paciente Lembrete");
  await it.locator('[data-pe="med"]').click();
  await expect(it.locator("[data-plembra]")).toContainText("(30 min)");
  await it.locator("[data-plembra]").click();
  await expect(it.locator("[data-plembra]")).toContainText("(60 min)");
  await it.locator("[data-plembra]").click();
  await expect(it.locator("[data-plembra]")).toContainText("(120 min)");
  await it.locator("[data-plembra]").click();
  await expect(it.locator("[data-plembra]")).toHaveCount(0);
  // de novo em 30 min, e já vencido (simula a hora passando)
  await it.locator('[data-pe="med"]').click(); await it.locator('[data-pe="med"]').click(); await it.locator('[data-pe="med"]').click();
  await expect(it.locator("[data-plembra]")).toContainText("(30 min)");
  await page.evaluate(() => { const d = JSON.parse(localStorage.getItem("mph_pacientes_v1")); d.pacs[0].lembra.em = Date.now() - 1000; d.pacs[0].lembra.t0 = Date.now() - 31 * 60e3; localStorage.setItem("mph_pacientes_v1", JSON.stringify(d)); });
  await page.reload(); await aba(page, "pacientes");
  await expect(item(page, "Paciente Lembrete").locator("[data-plembra]")).toContainText("reavaliar agora");
  await expect(item(page, "Paciente Lembrete")).toHaveAttribute("data-av", "vermelho");
  await aba(page, "inicio");
  await expect(page.locator("#hPacs")).toContainText("hora de reavaliar");
  // reavaliado: o lembrete some
  await aba(page, "pacientes");
  await item(page, "Paciente Lembrete").locator('[data-pe="reav"]').click();
  await expect(item(page, "Paciente Lembrete").locator("[data-plembra]")).toHaveCount(0);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("aguardando vaga: internação continua à vista no Início e na passagem, e conta como atendido", async ({ page }) => {
  const erros = await abrir(page);
  await novo(page, "Paciente Vaga");
  const it = item(page, "Paciente Vaga");
  await it.locator('[data-pd="tipo"]').selectOption("internacao");
  await it.locator("[data-pvaga]").check();
  await expect(item(page, "Paciente Vaga")).toContainText("aguardando vaga");
  await expect(page.locator(".pcconta")).toContainText("1 atendido");
  await page.locator(".pcpass summary").click();
  expect(await page.inputValue("#pcPassTxt")).toContain("Aguardando vaga de internação: Paciente Vaga.");
  await aba(page, "inicio");
  await expect(page.locator("#hPacs")).toContainText("aguardando vaga");
  // ganhou a vaga: some do Início
  await aba(page, "pacientes");
  await item(page, "Paciente Vaga").locator("[data-pvaga]").uncheck();
  await aba(page, "inicio");
  await expect(page.locator("#hPacs")).not.toContainText("Paciente Vaga");
  expect(erros).toEqual([]);
});

test("uso do mês: conduta do Atendimento, abas e IA contam; dado antigo sem 'mes' continua válido; painel em Plantões", async ({ page }) => {
  await page.addInitScript(() => { if (!sessionStorage.getItem("x")) { localStorage.setItem("rxp_uso_v1", JSON.stringify({ counts: { itu: 2 }, favs: [], rec: [], updatedAt: 1 })); sessionStorage.setItem("x", "1"); } });
  const erros = await abrir(page);
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="amigdalite"]').click());
  await page.evaluate(() => document.querySelector("#atdIr").click());
  await page.locator('#atCorpo [data-atd="hma"]').fill("dor de garganta");
  await page.waitForTimeout(300);
  await page.locator("#atNovo").click(); await page.locator("#atNovo").click();
  const u = await page.evaluate(() => JSON.parse(localStorage.getItem("rxp_uso_v1")));
  expect(u.counts.itu).toBe(2);
  const d = new Date(), k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  expect(u.mes[k].c.amigdalite).toBe(1);
  expect(u.mes[k].n).toBe(1);
  expect(u.counts.amigdalite).toBeGreaterThan(0);
  await aba(page, "plantoes");
  await page.locator(".plmeuuso summary").click();
  await expect(page.locator(".plmeuuso")).toContainText("Só contagens");
  expect(erros).toEqual([]);
});

test("celular: o Próximo (copiar para o MV) fica visível acima da barra de baixo", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const erros = await abrir(page);
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="amigdalite"]').click());
  await page.evaluate(() => document.querySelector("#atdIr").click());
  await page.locator('#atCorpo [data-atd="hma"]').fill("dor de garganta há 2 dias");
  await page.mouse.wheel(0, 3000);
  const bp = page.locator("#atProx");
  await expect(bp).toBeVisible();
  const b = await bp.boundingBox(), nav = await page.locator("#secnav").boundingBox();
  expect(b.x).toBeGreaterThanOrEqual(0);
  expect(b.x + b.width).toBeLessThanOrEqual(391);
  expect(b.y + b.height).toBeLessThanOrEqual(nav.y);
  await bp.click();
  await expect(bp).not.toContainText("Próximo: HDA");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

test("edição, favorito, organização, tema e preferências sobrevivem ao recarregar", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const erros = await abrir(page);
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  const id = await page.$eval("#list .item", (e) => e.dataset.id);
  await page.fill('textarea.rx-edit[data-f="casa"]', "TEXTO DE TESTE PERSISTE");
  await page.dispatchEvent('textarea.rx-edit[data-f="casa"]', "input");
  await page.click("#sessSave");
  await page.click("#favBtn");
  await page.click("[data-org]");
  await page.fill('[data-nm="emerg"]', "Urgências");
  await page.click("#themeBtn");
  await page.waitForTimeout(600);
  await page.reload();
  await aba(page, "prescricoes");
  await page.click(`#list .item[data-id="${id}"] >> nth=0`);
  await expect(page.locator('textarea.rx-edit[data-f="casa"]')).toHaveValue("TEXTO DE TESTE PERSISTE");
  await expect(page.locator("#favBtn")).toHaveText("★");
  await expect(page.locator('#cats [data-c="emerg"]')).toHaveText("Urgências");
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");

  // backup: copiar e importar num navegador limpo
  await aba(page, "backup"); await page.click("#bkCopy");
  const bk = await page.evaluate(() => navigator.clipboard.readText());
  const j = JSON.parse(bk);
  expect(j.overrides[id]).toBeTruthy(); expect(j.uso.favs).toContain(id); expect(j.model.org.cats.length).toBeGreaterThan(5);
  const limpo = await (await context.browser().newContext()).newPage();
  await abrir(limpo);
  await aba(limpo, "backup"); await limpo.fill("#bkIn", bk); await limpo.click("#bkImport");
  await aba(limpo, "prescricoes"); await limpo.click(`#list .item[data-id="${id}"] >> nth=0`);
  await expect(limpo.locator('textarea.rx-edit[data-f="casa"]')).toHaveValue("TEXTO DE TESTE PERSISTE");
  await expect(limpo.locator('#cats [data-c="emerg"]')).toHaveText("Urgências");
  expect(erros).toEqual([]);
});

test("organização: mover diagnóstico e reordenar categorias", async ({ page }) => {
  await abrir(page);
  await page.click("[data-org]");
  await page.click('[data-cu="1"]');
  expect(await page.$$eval(".orgcat", (x) => x.slice(0, 2).map((e) => e.dataset.k))).toEqual(["resp", "emerg"]);
  await page.click('[data-open="gi"]');
  const mid = await page.$eval('.orgcat[data-k="gi"] .orgit', (e) => e.dataset.id);
  await page.selectOption(`[data-mv="${mid}"]`, "resp");
  await aba(page, "prescricoes"); await page.click('[data-c="resp"]');
  await expect(page.locator(`#list .item[data-id="${mid}"]`)).toHaveCount(1);
  await page.click("[data-org]"); await page.click("#orgReset"); await page.click("#orgYes");
  expect(await page.$$eval(".orgcat", (x) => x[0].dataset.k)).toBe("emerg");
});

import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

test("todas as fichas abrem completas e sem texto quebrado", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "medicacoes");
  const ids = await page.$$eval("#mlist [data-mid]", (x) => x.map((e) => e.dataset.mid));
  expect(ids.length).toBeGreaterThanOrEqual(45);
  for (const id of ids) {
    await page.click(`#mlist [data-mid="${id}"]`);
    await expect(page.locator("#mdetail h2")).toBeVisible();
    const t = await page.$eval("#mdetail", (e) => e.innerText);
    if (await page.isVisible("#mBack")) { expect(await semRolagemLateral(page), id).toBe(true); await page.click("#mBack"); }
    expect(t, id).not.toMatch(RUIM);
    expect(t, id).toMatch(/Fontes/);
  }
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});
test("calculadora pediátrica aplica o teto por dose", async ({ page }) => {
  await abrir(page); await aba(page, "medicacoes");
  await page.fill("#mq", "dexametasona"); await page.press("#mq", "Enter");
  await page.fill("#mPeso", "30"); await page.dispatchEvent("#mPeso", "input");
  const linha = page.locator("#mCalcBody tr", { hasText: "dose alta" });
  await expect(linha).toContainText("12 mg"); await expect(linha).toContainText("teto");
});
test("busca e filtros por grupo e via", async ({ page }) => {
  await abrir(page); await aba(page, "medicacoes");
  await page.click('[data-mg="antibioticos"]');
  const n = await page.$$eval("#mlist [data-mid]", (x) => x.length); expect(n).toBe(15);
  await page.click('[data-mv2="IM"]');
  const nomes = await page.$$eval("#mlist [data-mid]", (x) => x.map((e) => e.dataset.mid));
  expect(nomes).toContain("ceftriaxona"); expect(nomes).not.toContain("nitrofurantoina");
  await page.click('[data-mg=""]'); await page.click('[data-mv2="IM"]');
  await page.fill("#mq", "qt"); const qt = await page.$$eval("#mlist [data-mid]", (x) => x.map((e) => e.dataset.mid));
  expect(qt).toContain("ondansetrona");
});

test("nome comercial aparece abaixo do princípio ativo", async ({ page }) => {
  await abrir(page); await aba(page, "medicacoes");
  await expect(page.locator('#mlist [data-mid="midazolam"] .mmarca')).toContainText("Dormonid");
  const amoxClav = await page.locator('#mlist [data-mid="amoxicilina-clavulanato"] .mmarca').innerText();
  expect(amoxClav).not.toMatch(/(^|, )BD(,|…|$)/);
  await page.click('#mlist [data-mid="midazolam"]');
  await expect(page.locator("#mdetail .mmarcas")).toContainText("Dormonid");
});

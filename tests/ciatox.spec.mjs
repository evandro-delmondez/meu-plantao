import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

test("CIATox: Disque-Intoxicação a um toque e CIATox local salvo no aparelho, sem quebrar dados antigos", async ({ page }) => {
  // dado antigo (sem o campo ciatox) continua carregando
  await page.addInitScript(() => { if (!sessionStorage.getItem("ok")) { localStorage.setItem("rxp_ui_v1", JSON.stringify({ sel: "amigdalite", modo: "adulto" })); sessionStorage.setItem("ok", "1"); } });
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="intoxicacao"]').click());
  const box = page.locator("#detail .ciatox");
  await expect(box.locator('a[href="tel:08007226001"]')).toBeVisible();
  await box.locator("[data-ciatox-ed]").click();
  await box.locator('[data-cx="nome"]').fill("CIATox Teste");
  await box.locator('[data-cx="tel"]').fill("(19) 3521-7555");
  await box.locator("[data-ciatox-salva]").click();
  await expect(page.locator('#detail .ciatox a[href="tel:1935217555"]')).toContainText("CIATox Teste");
  await page.reload(); await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="intoxicacao"]').click());
  await expect(page.locator('#detail .ciatox a[href="tel:1935217555"]')).toBeVisible();
  expect(JSON.parse(await page.evaluate(() => localStorage.getItem("rxp_ui_v1"))).sel).toBeTruthy();
  expect(erros).toEqual([]);
});

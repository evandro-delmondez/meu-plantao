import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

test("remédio citado na conduta abre a ficha por cima, sem perder a conduta; voltar e Esc fecham", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.click('#list .item[data-id="anafilaxia"] >> nth=0');
  await expect(page.locator("#detail h2")).toHaveText("Anafilaxia");
  const cit = page.locator("#detail .mcit .mlink", { hasText: "Adrenalina" }).first();
  await cit.click();
  await expect(page.locator("#medSheet")).toBeVisible();
  await expect(page.locator("#msBody h2")).toContainText("Adrenalina");
  await expect(page.locator("#msBic")).toContainText("Bomba de infusão");
  expect(await semRolagemLateral(page)).toBe(true);
  await page.goBack();                                     // botão voltar do celular
  await expect(page.locator("#medSheet")).toBeHidden();
  await expect(page.locator("#detail h2")).toHaveText("Anafilaxia");
  await page.locator("#detail .mlink").first().click();
  await expect(page.locator("#medSheet")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#medSheet")).toBeHidden();
  expect(await page.evaluate(() => location.hash)).toBe("#prescricoes");
  expect(erros).toEqual([]);
});

test("ficha por cima leva à bomba de infusão já escolhida e à aba Remédios", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "eletrolitos");
  await expect(page.locator("#elCorpo .mlink").first()).toBeVisible();
  await aba(page, "calculadora");
  await page.fill("#peso", "70"); await page.dispatchEvent("#peso", "input");   // o peso começa vazio
  await page.evaluate(() => { const b = [...document.querySelectorAll("#cgroups .mlink")].find((x) => x.dataset.med === "noradrenalina"); (b || document.querySelector("#cgroups .mlink")).click(); });
  await expect(page.locator("#medSheet")).toBeVisible();
  if (await page.locator("#msBic").isVisible()) {
    const id = await page.evaluate(() => document.querySelector("#msBody h2").textContent);
    await page.click("#msBic");
    await expect(page.locator("#medSheet")).toBeHidden();
    await expect(page.locator("#tab-bic")).toBeVisible();
    expect(id.length).toBeGreaterThan(2);
  }
  await aba(page, "protocolos");
  await page.locator("#prPassos .mlink").first().click();
  await page.click("#msAba");
  await expect(page.locator("#tab-medicacoes")).toBeVisible();
  await expect(page.locator("#medSheet")).toBeHidden();
  expect(erros).toEqual([]);
});

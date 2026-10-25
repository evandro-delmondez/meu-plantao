import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

test("cálculos dentro da conduta: escores ligados, resultado na hora, mesmo estado da aba Escores e vão para o Atendimento", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="tep"]').click());
  const box = page.locator('#detail [data-scin="wellsTep"]');
  await expect(box).toBeVisible();
  await expect(page.locator('#detail [data-scin="spesi"]')).toBeVisible();
  await box.locator("label.scop").first().click();
  await expect(box.locator("[data-scres]")).toContainText("ponto");
  await box.locator("[data-scev]").click();
  await aba(page, "evolucao");
  await page.selectOption("#evCond", "tep");
  await expect(page.locator('#atCorpo [data-atout="exame"]')).toHaveValue(/Escores:\n- Wells/);
  // conduta sem escore ligado não mostra o quadro
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="gripe"]').click());
  await expect(page.locator("#detail .scin")).toHaveCount(0);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

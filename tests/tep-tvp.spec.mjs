import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = (page) => page.locator('#detail textarea[data-f="casa"]').inputValue();

test("TEP e TVP são condutas separadas, com fontes e o escore certo", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  for (const [id, nome, escore] of [["tep", "Tromboembolismo pulmonar", "wellsTep"], ["tvp", "Trombose venosa profunda", "wellsTvp"]]) {
    await expect(page.locator(`#list .item[data-id="${id}"]`).first()).toContainText(nome);
    await conduta(page, id);
    expect(await page.locator("#secFontes li").count(), id).toBeGreaterThan(3);
    await expect(page.locator(`#detail [data-scin="${escore}"]`)).toBeVisible();
  }
  await expect(page.locator("#list .item", { hasText: "TEP / TVP" })).toHaveCount(0);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("receita da TVP: a apixabana troca o esquema inteiro da rivaroxabana", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "tvp");
  let t = await receita(page);
  expect(t).toMatch(/Rivaroxabana 15 mg/);
  expect(t).toMatch(/Rivaroxabana 20 mg/);
  expect(t).not.toMatch(/Apixabana/);
  await page.locator("#detail .rxmontar .rxc", { hasText: "Apixabana" }).first().click();
  t = await receita(page);
  expect(t).toMatch(/^1\) Apixabana 5 mg/m);
  expect(t).not.toMatch(/Rivaroxabana/);
  expect(t).not.toMatch(/Dipirona/);          // "Se dor" continua desligado
  expect(erros).toEqual([]);
});

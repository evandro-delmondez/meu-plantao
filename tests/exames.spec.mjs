import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

test("queixa mostra encaminhar, pedir quando e não pedir, com fonte em cada item", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "queixas");
  await page.click('#qLista [data-q="cefaleia"]');
  const ex = page.locator("#qCorpo .sec.exames");
  await expect(ex).toHaveAttribute("open", "");
  await expect(ex.locator(".exg-encaminhar li").first()).toBeVisible();
  await expect(ex.locator(".exg-pedir")).toContainText("TC de crânio sem contraste");
  await expect(ex.locator(".exg-naoPedir li").first()).toBeVisible();
  for (const li of await ex.locator(".exg li").all()) await expect(li.locator(".exf")).toHaveText(/^\d+(,\d+)*$/);
  expect(await ex.innerText()).not.toMatch(RUIM);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("Atendimento: exames solicitados entram na conduta, um por linha", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="itu"]').click());
  await page.evaluate(() => document.querySelector("#atdIr").click());
  await page.locator('#atCorpo [data-atd="exSol"]').fill("hemograma\nurocultura");
  await expect(page.locator('#atCorpo [data-atout="trat"]')).toHaveValue(/Exames solicitados:\n- hemograma\n- urocultura/);
  expect(erros).toEqual([]);
});

test("conduta mostra exames recolhidos e, quando há, as divergências entre fontes", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="amigdalite"]').click());
  const ex = page.locator("#detail .sec.exames");
  await expect(ex).not.toHaveAttribute("open", "");
  await ex.locator("summary").first().click();
  await expect(ex.locator(".exg-div")).toContainText("NICE");
  await expect(ex.locator(".exg-pedir")).toContainText("Teste rápido");
  expect(erros).toEqual([]);
});

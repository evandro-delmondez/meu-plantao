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
  await page.locator('#atCorpo [data-atd="exLab"]').fill("hemograma\nurocultura");
  await page.locator('#atCorpo [data-atd="exImg"]').fill("US de rins e vias urinárias");
  await expect(page.locator('#atCorpo [data-atout="trat"]')).toHaveValue(/- Solicito exames laboratoriais: hemograma, urocultura\.\n- Solicito exames de imagem: US de rins e vias urinárias\./);
  // itens da conduta por toque: medicação na unidade traz os nomes da prescrição
  await page.click('#atCorpo [data-atchip="cond"][data-k="med"]');
  await expect(page.locator('#atCorpo [data-atout="trat"]')).toHaveValue(/- Prescrevo medicação na unidade\.\n- Solicito exames laboratoriais/);
  // só entram os remédios que o médico marca (não as alternativas da conduta)
  await page.click('#atCorpo [data-atchip="medsel"][data-k="ceftriaxona"]');
  await expect(page.locator('#atCorpo [data-atout="trat"]')).toHaveValue(/- Prescrevo medicação na unidade: ceftriaxona\.\n/);
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

test("queixas novas: lombalgia e dor musculoesquelética, com alarmes, caminhos e exames", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "queixas");
  for (const [id, alarme] of [["lombalgia", /cauda equina|micção|sela/i], ["dor-musculoesqueletica", /artrite séptica|compartimental/i]]) {
    await page.click(`#qLista [data-q="${id}"]`);
    await expect(page.locator("#qCorpo .qal")).toContainText(alarme);
    await expect(page.locator("#qCorpo .sec.exames .exg-encaminhar li").first()).toBeVisible();
    expect(await page.locator("#qCorpo").innerText()).not.toMatch(RUIM);
  }
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

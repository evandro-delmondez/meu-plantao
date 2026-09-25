import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

const opt = (page, g, v) => page.click(`#tab-feridas .opts[data-g="${g}"] [data-v="${v}"]`);
const texto = (page) => page.$eval("#frOut", (e) => e.value);

test.beforeEach(async ({ page }) => { await abrir(page); await aba(page, "feridas"); await page.fill("#frPeso", "80"); await page.dispatchEvent("#frPeso", "input"); });

test("cão observável: não iniciar profilaxia, observar 10 dias", async ({ page }) => {
  await opt(page, "animal", "caogato"); await opt(page, "obs", "sim"); await opt(page, "exp", "grave");
  expect(await texto(page)).toMatch(/Não iniciar profilaxia: observar o animal por 10 dias/);
  expect(await texto(page)).toMatch(/vacina \(4 doses\) \+ soro/);
});
test("cão não observável, grave: vacina + soro com dose pelo peso", async ({ page }) => {
  await opt(page, "animal", "caogato"); await opt(page, "obs", "nao"); await opt(page, "exp", "grave");
  const t = await texto(page);
  expect(t).toMatch(/dias 0, 3, 7 e 14/); expect(t).toMatch(/SAR 3\.200 UI \(40 UI\/kg\)/); expect(t).toMatch(/IGHAR 1\.600 UI/);
});
test("morcego é sempre grave; roedor urbano não indica profilaxia", async ({ page }) => {
  await opt(page, "animal", "morcego"); await opt(page, "exp", "leve");
  expect(await texto(page)).toMatch(/Vacina \+ soro/);
  await opt(page, "animal", "roedor");
  expect(await texto(page)).toMatch(/profilaxia antirrábica não indicada/);
});
test("reexposição: > 90 dias → dias 0 e 3, sem soro", async ({ page }) => {
  await opt(page, "animal", "caogato"); await opt(page, "obs", "nao"); await opt(page, "exp", "grave");
  await page.check("#frRe"); await opt(page, "retipo", "pepmais");
  const t = await texto(page); expect(t).toMatch(/2 doses, dias 0 e 3/); expect(t).toMatch(/Soro não indicado/);
});
test("tétano: tabela do Ministério da Saúde", async ({ page }) => {
  const casos = [
    ["incerta", "baixo", false, /iniciar ou completar o esquema/, false],
    ["incerta", "alto", false, /iniciar ou completar/, true],
    ["lt5", "alto", false, /Nenhuma vacina ou soro/, false],
    ["5a10", "baixo", false, /Nenhuma vacina ou soro/, false],
    ["5a10", "alto", false, /1 dose de reforço/, false],
    ["5a10", "alto", true, /1 dose de reforço/, true],
    ["gt10", "baixo", false, /1 dose de reforço/, false],
    ["gt10", "alto", true, /1 dose de reforço/, true],
  ];
  for (const [vac, risco, esp, re, passiva] of casos) {
    await opt(page, "vac", vac); await opt(page, "risco", risco);
    await page.setChecked("#frEsp", esp);
    const t = await texto(page);
    expect(t, `${vac}/${risco}/${esp}`).toMatch(re);
    expect(/IGHAT 250 UI/.test(t), `passiva ${vac}/${risco}/${esp}`).toBe(passiva);
  }
});
test("mordedura com critério indica antibiótico por 3 a 5 dias", async ({ page }) => {
  await opt(page, "animal", "caogato");
  await page.click("#frAbW summary"); await page.check('#frAb input[value="gato"]');
  expect(await texto(page)).toMatch(/3 a 5 dias/);
});
test("anestésico: respeita mg/kg e teto da bula", async ({ page }) => {
  await page.fill("#anPeso", "80"); await page.dispatchEvent("#anPeso", "input");
  await page.selectOption("#anDroga", "l1e"); await expect(page.locator("#anRes")).toContainText("500 mg = 50 mL");
  await page.selectOption("#anDroga", "l1"); await expect(page.locator("#anRes")).toContainText("300 mg = 30 mL");
  await page.fill("#anPeso", "20"); await page.dispatchEvent("#anPeso", "input");
  await page.selectOption("#anDroga", "l2"); await expect(page.locator("#anRes")).toContainText("90 mg = 4,5 mL");
  expect(await semRolagemLateral(page)).toBe(true);
});

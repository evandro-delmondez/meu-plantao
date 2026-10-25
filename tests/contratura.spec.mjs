import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = (page) => page.locator('#detail textarea[data-f="casa"]').inputValue();
const linha = (page, txt) => page.locator("#detail .rxmontar .rxlin", { hasText: txt });
const marcado = (page, txt) => page.locator('#detail .rxmontar .rxc[aria-pressed="true"]', { hasText: txt });

test("contratura: conduta com fontes, checklist, alta e exames", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await expect(page.locator('#list .item[data-id="contratura"]').first()).toContainText("Cervicalgia");
  await conduta(page, "contratura");
  expect(await page.locator("#secFontes li").count()).toBeGreaterThan(10);
  await expect(page.locator("#detail .sec.chk")).toContainText("Spurling");
  await expect(page.locator("#detail .altapac")).toHaveCount(1);
  await expect(page.locator("#detail .sec.exames .exg-encaminhar li").first()).toContainText("Sala de trauma");   // recolhido, mas presente
  expect(await page.locator("#detail").innerText()).not.toMatch(RUIM);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("receita da contratura: celecoxibe e ciclobenzaprina 10 mg marcados, 7 anti-inflamatórios, diazepam desligado", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "contratura");
  await expect(marcado(page, "Celecoxibe")).toHaveCount(1);
  await expect(marcado(page, "Ciclobenzaprina 10mg")).toHaveCount(1);
  await expect(linha(page, "Celecoxibe").locator(".rxc:not(.rxsem)")).toHaveCount(7);
  for (const n of ["Naproxeno", "Nimesulida", "Cetorolaco", "Ibuprofeno", "Diclofenaco", "Cetoprofeno"]) await expect(linha(page, "Celecoxibe")).toContainText(n);
  await expect(page.locator("#detail .rxmontar .rxbloco .rxc", { hasText: "Benzodiazepínico" })).toHaveAttribute("aria-pressed", "false");
  const t = await receita(page);
  expect(t).toMatch(/Celecoxibe 200mg/);
  expect(t).toMatch(/Ciclobenzaprina 10mg/);
  expect(t).not.toMatch(/Ciclobenzaprina 5mg|Naproxeno|Ibuprofeno|Diazepam|Tramadol/);
  await page.locator("#detail .rxmontar .rxc", { hasText: "Ibuprofeno" }).click();
  expect(await receita(page)).toMatch(/Ibuprofeno 600mg -+ 15 cp\nTomar 1 cp VO de 8\/8h, após as refeições, por 5 dias\./);
  expect(erros).toEqual([]);
});

test("receita da lombalgia: ciclobenzaprina 10 mg marcada, tramadol e diazepam desligados", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "lombalgia");
  await expect(marcado(page, "Ciclobenzaprina 10mg")).toHaveCount(1);
  for (const b of ["tramadol", "Benzodiazepínico"]) await expect(page.locator("#detail .rxmontar .rxbloco .rxc", { hasText: b })).toHaveAttribute("aria-pressed", "false");
  const t = await receita(page);
  expect(t).not.toMatch(/Tramadol|Diazepam/);
  expect(erros).toEqual([]);
});

test("queixa dor musculoesquelética leva à contratura", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "queixas");
  await page.click('#qLista [data-q="dor-musculoesqueletica"]');
  const cam = page.locator('#qCorpo [data-qc="contratura"]');
  await expect(cam).toHaveCount(1);
  await cam.click();
  await expect(page.locator("#tab-prescricoes")).toBeVisible();
  expect(await page.evaluate(() => document.querySelector(`#list .item[aria-current="true"]`)?.dataset.id || "")).toBe("contratura");
  expect(erros).toEqual([]);
});

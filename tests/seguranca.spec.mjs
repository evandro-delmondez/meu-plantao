import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

// achados críticos da auditoria de segurança (2026-10-09)
test("noradrenalina: digitar mcg/min na bomba em mcg/kg/min dispara o aviso de fora da faixa", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "bic");
  await page.evaluate(() => document.querySelector('#bicDrogas [data-bic="noradrenalina"]').click());
  await expect(page.locator("#bicFaixa")).toContainText("mcg/kg/min (não em mcg/min)");
  await page.fill("#bicPeso", "70"); await page.dispatchEvent("#bicPeso", "input");
  await page.fill("#bicDose", "10"); await page.dispatchEvent("#bicDose", "input");
  await expect(page.locator("#bicRes")).toContainText("Fora da faixa");
  await page.fill("#bicDose", "0.1"); await page.dispatchEvent("#bicDose", "input");
  await expect(page.locator("#bicRes")).not.toContainText("Fora da faixa");
  expect(erros).toEqual([]);
});

test("paracetamol pediátrico prescrito em mL, nunca em gotas calculadas", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "pediatria");
  await page.evaluate(() => document.querySelector('#pdConds [data-pd="febre"]').click());
  for (const peso of ["10", "24", "40"]) {
    await page.fill("#pdPeso", peso); await page.dispatchEvent("#pdPeso", "input");
    const t = await page.locator("#pdOut").inputValue();
    const linha = t.split("\n").find((l) => /^Dar de .* mg\) VO/.test(l) && t.indexOf(l) > t.indexOf("Paracetamol"));
    expect(linha, peso).toMatch(/^Dar de [\d,]+ a [\d,]+ mL \(/);
  }
  expect(erros).toEqual([]);
});

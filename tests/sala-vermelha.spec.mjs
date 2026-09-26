import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

test("bomba de infusão: dose → mL/h e mL/h → dose", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "bic");
  // noradrenalina 16 mg/250 mL = 64 mcg/mL; 70 kg; 0,1 mcg/kg/min → 0,1 × 70 × 60 ÷ 64 = 6,56 mL/h
  await page.click('[data-bic="noradrenalina"]');
  await expect(page.locator("#bicRes")).toContainText("Informe o peso");
  await page.fill("#bicPeso", "70"); await page.dispatchEvent("#bicPeso", "input");
  await page.fill("#bicDose", "0.1"); await page.dispatchEvent("#bicDose", "input");
  await expect(page.locator("#bicRes b")).toHaveText("6,6 mL/h");
  await expect(page.locator("#bicConc")).toContainText("64 mcg/mL");
  // inverso: 10 mL/h → 0,152 mcg/kg/min
  await page.fill("#bicMlh", "10"); await page.dispatchEvent("#bicMlh", "input");
  await expect(page.locator("#bicRes")).toContainText("0,152 mcg/kg/min");
  // vasopressina não depende do peso: 0,03 U/min em 0,2 U/mL = 9 mL/h
  await page.click('[data-bic="vasopressina"]');
  await expect(page.locator("#bicPesoW")).toBeHidden();
  await page.fill("#bicDose", "0.03"); await page.dispatchEvent("#bicDose", "input");
  await expect(page.locator("#bicRes b")).toHaveText("9 mL/h");
  // diluição própria e alerta fora da faixa
  await page.click('[data-bic="dexmedetomidina"]');
  await page.fill("#bicPeso", "80"); await page.dispatchEvent("#bicPeso", "input");
  await page.selectOption("#bicDil", "c");
  await page.fill("#bicQtd", "400"); await page.dispatchEvent("#bicQtd", "input");
  await page.fill("#bicVol", "100"); await page.dispatchEvent("#bicVol", "input");
  await page.fill("#bicDose", "0.5"); await page.dispatchEvent("#bicDose", "input");
  await expect(page.locator("#bicRes b")).toHaveText("10 mL/h");
  await page.fill("#bicDose", "3"); await page.dispatchEvent("#bicDose", "input");
  await expect(page.locator("#bicRes .warn")).toContainText("Fora da faixa");
  expect(await page.locator("#tab-bic").innerText()).not.toMatch(RUIM);
  expect(erros).toEqual([]);
});

test("todas as drogas da bomba abrem com fonte e tabela de doses", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "bic");
  await page.fill("#bicPeso", "70"); await page.dispatchEvent("#bicPeso", "input");
  const ids = await page.$$eval("[data-bic]", (b) => b.map((x) => x.dataset.bic));
  expect(ids.length).toBeGreaterThanOrEqual(10);
  for (const id of ids) {
    await page.click(`[data-bic="${id}"]`);
    expect(await page.locator("#bicFontes li").count(), id).toBeGreaterThan(0);
    expect(await page.locator("#tab-bic").innerText(), id).not.toMatch(RUIM);
  }
  expect(erros).toEqual([]);
});

test("intubação: checklist e peso predito", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "iot");
  expect(await page.locator("#iotCheck [data-iot]").count()).toBeGreaterThan(15);
  await page.fill("#vmAlt", "170"); await page.dispatchEvent("#vmAlt", "input");
  await expect(page.locator("#vmRes")).toContainText("66 kg");   // 50 + 0,91 × (170 − 152,4) = 66,0
  await expect(page.locator("#vmRes")).toContainText("396 mL");
  await page.selectOption("#vmSexo", "F");
  await expect(page.locator("#vmRes")).toContainText("61,5 kg");
  await page.click("#iotDoses");
  await expect(page.locator("#tab-calculadora")).toBeVisible();
  expect(erros).toEqual([]);
});

import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

test("doses por peso: cálculo, teto e fontes em todos os blocos", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "calculadora");
  await page.fill("#peso", "80"); await page.dispatchEvent("#peso", "input");
  const roc = page.locator(".drug", { hasText: "Rocurônio" });
  await expect(roc.locator(".ml")).toHaveText("9,6 mL");   // 1,2 mg/kg × 80 kg ÷ 10 mg/mL
  await expect(roc.locator(".mg")).toHaveText("96 mg");
  const lev = page.locator(".drug", { hasText: "Levetiracetam" });
  await expect(lev.locator(".mg")).toHaveText("4.500 mg");  // 60 mg/kg × 80 = 4.800 → teto 4.500
  await expect(lev).toContainText("Dose máxima atingida");
  for (const modo of ["adulto", "ped"]) {
    await page.click(`[data-modo="${modo}"]`);
    const blocos = page.locator("#cgroups .sec.cg");
    const n = await blocos.count(); expect(n).toBeGreaterThan(3);
    for (let i = 0; i < n; i++) expect(await blocos.nth(i).locator(".cgsrc li").count(), `${modo} bloco ${i}`).toBeGreaterThan(0);
    expect(await page.locator("#cgroups").innerText()).not.toMatch(RUIM);
  }
  await page.fill("#peso", ""); await page.dispatchEvent("#peso", "input");
  await expect(page.locator("#cgroups")).toContainText("Digite o peso");
  expect(erros).toEqual([]);
});

test("correções da conferência: ivermectina pela bula, Parkland 2–4 e tempo da fenitoína pediátrica", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "calculadora");
  const peso = async (p) => { await page.fill("#peso", String(p)); await page.dispatchEvent("#peso", "input"); };
  const iver = page.locator(".drug", { hasText: "Ivermectina" });
  for (const [p, cp] of [[23, "0,5 cp"], [30, "1 cp"], [36, "1,5 cp"], [52, "2 cp"], [70, "2,5 cp"], [90, "3 cp"]]) { await peso(p); await expect(iver.locator(".ml"), `${p} kg`).toHaveText(cp); }
  await peso(12); await expect(iver.locator(".ml")).toHaveText("Não indicado");
  await page.click('[data-modo="ped"]'); await peso(20);
  await page.fill("#scq", "10"); await page.dispatchEvent("#scq", "input");
  await expect(page.locator(".drug", { hasText: "Parkland pediátrico" }).locator(".ml")).toHaveText("400–800 mL/24h");
  // fenitoína 20 mg/kg × 20 kg = 400 mg a 1 mg/kg/min (20 mg/min) → ≥ 20 min
  await expect(page.locator(".drug", { hasText: "Fenitoína" })).toContainText("Infundir em ≥ 20 min");
  await expect(page.locator(".drug", { hasText: "Paracetamol" }).locator(".mg")).not.toContainText("gotas");
  expect(erros).toEqual([]);
});

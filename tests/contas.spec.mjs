import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

const preencher = async (page, id, vals) => {
  for (const [k, v] of Object.entries(vals)) { const s = `[data-ct="${id}"][data-k="${k}"]`; await page.fill(s, String(v)); await page.dispatchEvent(s, "input"); }
};

test("contas de laboratório e ECG", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "contas");
  await expect(page.locator("#ct-ag")).toContainText("Preencha");
  // AG = 140 − (100 + 12) = 28; albumina 2,5 → 28 + 2,5 × 2 = 33; Δ/Δ = (33 − 10)/(25 − 12) = 1,77
  await preencher(page, "ag", { na: 140, cl: 100, hco3: 12, alb: 2.5 });
  await expect(page.locator("#ct-ag")).toContainText("Ânion gap: 28");
  await expect(page.locator("#ct-ag")).toContainText("Corrigido pela albumina: 33");
  await expect(page.locator("#ct-ag")).toContainText("Delta/delta: 1,77");
  // Winter: 1,5 × 12 + 8 = 26 ± 2
  await preencher(page, "gas", { ph: 7.2, pco2: 26, hco3: 12 });
  await expect(page.locator("#ct-gas")).toContainText("24–28");
  await expect(page.locator("#ct-gas")).toContainText("Compensação respiratória adequada");
  // acidose respiratória: pCO2 60 → HCO3 aguda 26, crônica 32
  await preencher(page, "gas", { ph: 7.25, pco2: 60, hco3: 26 });
  await expect(page.locator("#ct-gas")).toContainText("aguda 26");
  await expect(page.locator("#ct-gas")).toContainText("crônica 32");
  // Na 130, glicose 600 → + 8 (1,6) e + 12 (2,4)
  await preencher(page, "nac", { na: 130, gli: 600 });
  await expect(page.locator("#ct-nac")).toContainText("138");
  await expect(page.locator("#ct-nac")).toContainText("142");
  // Ca 8, albumina 2 → 9,6
  await preencher(page, "ca", { ca: 8, alb: 2 });
  await expect(page.locator("#ct-ca")).toContainText("9,6");
  // QT 400 ms, FC 100 → RR 0,6 s; Bazett 516; Fridericia 474
  await preencher(page, "qtc", { qt: 400, fc: 100 });
  await expect(page.locator("#ct-qtc")).toContainText("Bazett: 516");
  await expect(page.locator("#ct-qtc")).toContainText("Fridericia: 474");
  await expect(page.locator("#ct-qtc .warn")).toContainText("torsades");
  const fontes = await page.$$eval("#contas .conta", (c) => c.map((x) => x.querySelectorAll(".fontes li").length));
  for (const n of fontes) expect(n).toBeGreaterThan(0);
  expect(await page.locator("#tab-contas").innerText()).not.toMatch(RUIM);
  expect(erros).toEqual([]);
});

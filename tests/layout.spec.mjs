import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

const ABAS = ["inicio", "prescricoes", "queixas", "feridas", "medicacoes", "pediatria", "sala", "pcr", "bic", "iot", "protocolos", "evolucao", "atestado", "modelos", "backup", "escores", "calculadora", "contas", "eletrolitos"];
test("nenhuma aba tem rolagem lateral", async ({ page }) => {
  const erros = await abrir(page);
  for (const a of ABAS) { await aba(page, a); expect(await semRolagemLateral(page), a).toBe(true); }
  expect(erros).toEqual([]);
});
test("campos da receita mostram o texto inteiro sem precisar clicar", async ({ page }) => {
  await abrir(page); await aba(page, "prescricoes"); await page.click("#list .item >> nth=3");
  const alturas = await page.$$eval("textarea.rx-edit", (t) => t.filter((x) => x.offsetParent).map((x) => x.scrollHeight - x.clientHeight));
  for (const d of alturas) expect(d).toBeLessThanOrEqual(2);
});
test("evolução e atestado geram texto", async ({ page }) => {
  await abrir(page); await aba(page, "evolucao");
  await page.fill("#evHma", "Dor de garganta\nhá 2 dias"); await page.dispatchEvent("#evHma", "input");
  await expect(page.locator("#evOut")).toHaveValue(/há 2 dias/);
  await aba(page, "atestado"); await page.fill("#atDias", "3"); await page.dispatchEvent("#atDias", "input");
  await expect(page.locator("#atOut")).toHaveValue(/03 \(três\) dias/);
});

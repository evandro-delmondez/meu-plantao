import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

test("todos os escores calculam", async ({ page }) => {
  await abrir(page); await aba(page, "escores");
  const ids = await page.$$eval("[data-sc]", (x) => x.map((e) => e.dataset.sc));
  for (const s of ids) {
    await page.click(`[data-sc="${s}"]`);
    await page.$$eval("#scForm input[type=radio]", (rs) => { const g = {}; rs.forEach((r) => { if (!g[r.name]) { g[r.name] = 1; r.click(); } }); });
    const t = await page.textContent("#scRes");
    expect(t, s).not.toMatch(RUIM); expect(t.trim().length, s).toBeGreaterThan(0);
  }
});
test("NIHSS vai de 0 a 42", async ({ page }) => {
  await abrir(page); await aba(page, "escores"); await page.click('[data-sc="nihss"]');
  await page.$$eval("#scForm input[type=radio]", (rs) => { const g = {}; rs.forEach((r) => (g[r.name] = g[r.name] || []).push(r)); Object.values(g).forEach((a) => a[a.length - 1].click()); });
  await expect(page.locator("#scRes")).toContainText("42");
});
test("pediatria: todas as condições em 3 pesos e emergência", async ({ page }) => {
  await abrir(page); await aba(page, "pediatria"); await page.click('[data-pmode="rx"]');
  const conds = await page.$$eval("[data-pd]", (x) => x.map((e) => e.dataset.pd));
  for (const [w, a, m] of [[4, 0, 2], [12, 2, 0], [35, 11, 0]]) {
    await page.fill("#pdPeso", String(w)); await page.fill("#pdAnos", String(a)); await page.fill("#pdMeses", String(m)); await page.dispatchEvent("#pdMeses", "input");
    for (const c of conds) {
      await page.click(`[data-pd="${c}"]`);
      const t = await page.$eval("#pdOut", (e) => e.value);
      expect(t.trim().length, `${c} ${w} kg`).toBeGreaterThan(0); expect(t, `${c} ${w} kg`).not.toMatch(RUIM);
    }
  }
  await page.click('[data-pmode="em"]');
  for (const w of [3, 20, 50]) { await page.fill("#pdPeso", String(w)); await page.dispatchEvent("#pdPeso", "input"); expect(await page.$eval("#pdEmGrid", (e) => e.innerText)).not.toMatch(RUIM); }
});

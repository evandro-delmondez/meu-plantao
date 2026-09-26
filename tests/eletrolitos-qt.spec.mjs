import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

test("eletrólitos: cada distúrbio abre com conduta e fontes", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "eletrolitos");
  const ids = await page.$$eval("#elLista [data-el]", (b) => b.map((x) => x.dataset.el));
  expect(ids.length).toBeGreaterThanOrEqual(5);
  for (const id of ids) {
    await page.click(`#elLista [data-el="${id}"]`);
    expect(await page.locator("#elCorpo .fontes li").count(), id).toBeGreaterThan(0);
    const t = await page.locator("#elCorpo").innerText();
    expect(t, id).not.toMatch(RUIM);
    expect(t.length, id).toBeGreaterThan(200);
  }
  expect(erros).toEqual([]);
});

test("alerta de QT aparece quando a receita tem remédio que prolonga o QT", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  await expect(page.locator(".qtal")).toContainText("Azitromicina");
  expect(await page.locator(".qtal .alsrc li").count()).toBeGreaterThan(0);
  if (await page.locator("#backBtn").isVisible()) await page.click("#backBtn");
  await page.fill("#q", "cerume"); await page.click("#list .item >> nth=0");
  await expect(page.locator(".qtal")).toHaveCount(0);
  expect(erros).toEqual([]);
});

import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

const NOVAS = ["hsa", "rebaixamento-delirium", "trauma-cervical", "politrauma", "cocaina", "organofosforado", "febre-lactente", "farmacodermia", "anticoagulado", "neutropenia-febril", "lra", "oclusao-arterial"];

test("lote 5: as 12 condutas novas abrem, com fontes e sem marcador [F]/[M] à vista", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "prescricoes");
  for (const id of NOVAS) {
    await page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
    await expect(page.locator("#detail"), id).toContainText(/Fontes|fontes/);
    expect(await page.locator("#detail").innerText(), id).not.toMatch(/\[(F|M)\]/);
  }
  expect(erros).toEqual([]);
});

test("lote 5: escores novos ligados (Ottawa HSA, Canadian C-Spine, NEXUS, 4AT, SCORTEN)", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "prescricoes");
  for (const [id, sc] of [["hsa", "ottawaHsa"], ["trauma-cervical", "canadianCspine"], ["trauma-cervical", "nexus"], ["rebaixamento-delirium", "quatroAT"]]) {
    await page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
    await expect(page.locator(`#detail [data-scin="${sc}"]`), `${id}/${sc}`).toHaveCount(1);
  }
  expect(erros).toEqual([]);
});

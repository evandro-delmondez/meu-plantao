import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
async function atender(page, id) { await aba(page, "prescricoes"); await conduta(page, id); await page.evaluate(() => document.querySelector("#atdIr").click()); await expect(page.locator("#tab-evolucao")).toBeVisible(); }
async function junta(page, id) { await page.fill("#atAddQ", id); await page.locator("#atAddSug [data-atadd]").first().click(); }
const rx = (page) => page.locator('#atCorpo [data-atout="rx"]');

test("lombalgia + contratura: um anti-inflamatório só, com aviso para o médico; 'Volte' sem frase picotada", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "lombalgia");
  await junta(page, "contratura");
  const t = await rx(page).inputValue();
  const aine = (t.match(/^\s*\d+\)\s*(Ibuprofeno|Cetoprofeno|Naproxeno|Diclofenaco|Celecoxibe|Nimesulida)/gim) || []).length;
  expect(aine).toBe(1);
  await expect(page.locator("#atCorpo .atjuntaav")).toContainText("anti-inflamatório");
  expect(t).not.toMatch(/se tiver não/);
  expect((t.match(/Volte imediatamente ao pronto-socorro/g) || []).length).toBeLessThanOrEqual(1);
  expect(erros).toEqual([]);
});

test("GECA + náuseas: um antiemético só; ITU + dispepsia: a orientação não contradiz a receita (aviso)", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "geca");
  await junta(page, "nauseas");
  let t = await rx(page).inputValue();
  expect((t.match(/^\s*\d+\)\s*(Ondansetrona|Metoclopramida|Bromoprida|Dimenidrinato)/gim) || []).length).toBe(1);
  expect(t).not.toMatch(/se tiver não/);
  await page.click("#novoPac"); await page.click("#novoPac");
  await atender(page, "itu");
  await junta(page, "dispepsia");
  t = await rx(page).inputValue();
  if (/^\s*\d+\)\s*(Ibuprofeno|Cetoprofeno|Naproxeno|Diclofenaco)/im.test(t)) {
    expect(t).not.toMatch(/Evite (o uso de )?anti-?inflamat/i);
    await expect(page.locator("#atCorpo .atjuntaav")).toContainText("Tirei a orientação");
  }
  expect(erros).toEqual([]);
});

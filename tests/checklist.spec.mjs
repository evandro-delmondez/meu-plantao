import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

test("todas as condutas têm checklist completo, com fontes", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  const ids = await page.$$eval("#list .item", (x) => [...new Set(x.map((e) => e.dataset.id))]);
  expect(ids.length).toBeGreaterThan(90);
  for (const id of ids) {
    await page.click(`#list .item[data-id="${id}"] >> nth=0`);
    const sec = page.locator("#detail .sec.chk");
    await expect(sec, id).toBeVisible();
    await expect(sec.locator(".ckg h4"), id).toHaveText(["Anamnese", "Antecedentes", "Exame físico dirigido", "Sinais de alarme"]);
    expect(await sec.locator(".alsrc li").count(), id).toBeGreaterThan(0);
    expect(await sec.innerText(), id).not.toMatch(RUIM);
  }
  expect(erros).toEqual([]);
});

test("marcações viram texto na evolução e não ficam salvas no aparelho", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  await page.click('[data-ck="hist0"][data-val="+"]');
  await page.click('[data-ck="hist1"][data-val="-"]');
  await page.click('[data-ck="ex0"][data-val="+"]');
  await page.click('[data-ck="alarme0"][data-val="-"]');
  // tocar de novo no mesmo botão desmarca
  await page.click('[data-ck="ant1"][data-val="+"]'); await page.click('[data-ck="ant1"][data-val="+"]');
  await expect(page.locator('[data-ck="ant1"][data-val="+"]')).toHaveAttribute("aria-pressed", "false");
  await page.click("#detail #ckEv");
  await expect(page.locator("#tab-evolucao")).toBeVisible();
  const hda = await page.inputValue('#atCorpo [data-atout="hda"]'), exf = await page.inputValue('#atCorpo [data-atout="exame"]');
  const ev = hda + "\n" + exf;
  expect(hda).toContain("Presença de febre > 38 °C.");
  expect(hda).toContain("Nega tosse.");
  expect(exf).toContain("Ao exame, presença de exsudato ou aumento das amígdalas.");
  expect(hda).toContain("Nega sinais de alarme: trismo, voz abafada ou desvio da úvula.");
  expect(ev).not.toContain("febre reumática");
  expect(ev).not.toContain("Nega outros sintomas. Nega febre.");
  // a história vai no campo História e o exame dirigido no Exame físico, depois do exame geral
  expect(exf.indexOf("Ao exame, presença")).toBeGreaterThan(exf.indexOf("Bom estado geral"));
  // outra condição no Atendimento não leva o checklist da amigdalite
  await page.selectOption("#evCond", "itu");
  expect(await page.inputValue('#atCorpo [data-atout="hda"]')).not.toContain("Presença de febre");
  await page.waitForTimeout(600);
  const salvo = await page.evaluate(() => Object.keys(localStorage).map((k) => localStorage.getItem(k)).join("\n"));
  expect(salvo).not.toContain("febre > 38");
  expect(erros).toEqual([]);
});

test("limpar desfaz as marcações; sem marcação não leva nada", async ({ page }) => {
  await abrir(page); await aba(page, "prescricoes");
  await page.fill("#q", "dengue"); await page.click("#list .item >> nth=0");
  await page.click('[data-ck="alarme0"][data-val="+"]');
  await page.click("#ckClear");
  await expect(page.locator('#detail [data-ck][aria-pressed="true"]')).toHaveCount(0);
  await page.click("#detail #ckEv");
  await expect(page.locator("#tab-evolucao")).toBeVisible();
  expect(await page.inputValue('#atCorpo [data-atout="hda"]')).not.toMatch(/Presença de|Nega /);
});

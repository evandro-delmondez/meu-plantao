import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

const COM_CHECKLIST = ["amigdalite", "faringite", "gripe", "sinusite", "oma", "itu", "lombalgia", "cefaleia", "enxaqueca", "vertigem", "geca", "dispepsia", "colica", "dor-abdominal", "has", "sca", "asma", "pac", "dengue", "ansiedade"];

test("as 20 condutas mais comuns têm checklist completo, com fontes", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  for (const id of COM_CHECKLIST) {
    await page.click(`#list .item[data-id="${id}"] >> nth=0`);
    const sec = page.locator("#detail .sec.chk");
    await expect(sec, id).toBeVisible();
    await expect(sec.locator(".ckg h4"), id).toHaveText(["Anamnese", "Antecedentes", "Exame físico dirigido", "Sinais de alarme"]);
    expect(await sec.locator(".alsrc li").count(), id).toBeGreaterThan(0);
    expect(await sec.innerText(), id).not.toMatch(RUIM);
  }
  // conduta sem checklist não mostra a seção
  await page.click('#list .item[data-id="cerume"] >> nth=0');
  await expect(page.locator("#detail .sec.chk")).toHaveCount(0);
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
  await page.click("#ckEv");
  await expect(page.locator("#tab-evolucao")).toBeVisible();
  const ev = await page.inputValue("#evOut");
  expect(ev).toContain("Refere: febre > 38 °C.");
  expect(ev).toContain("Nega: tosse.");
  expect(ev).toContain("Exame dirigido: exsudato ou aumento das amígdalas: presente.");
  expect(ev).toContain("Sem sinais de alarme: trismo, voz abafada ou desvio da úvula.");
  expect(ev).not.toContain("febre reumática");
  expect(ev).not.toContain("Nega outros sintomas. Nega febre.");
  // o checklist entra antes do exame físico (anamnese) e depois dele (exame dirigido)
  expect(ev.indexOf("Refere:")).toBeLessThan(ev.indexOf("Exame físico"));
  expect(ev.indexOf("Exame dirigido:")).toBeGreaterThan(ev.indexOf("Exame físico"));
  // outra condição na evolução não leva o checklist da amigdalite
  await page.selectOption("#evCond", "itu");
  expect(await page.inputValue("#evOut")).not.toContain("Refere: febre");
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
  await page.click("#ckEv");
  await expect(page.locator("#tab-prescricoes")).toBeVisible();
});

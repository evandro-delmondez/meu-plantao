import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

// alergia a AINE e a sulfa, alertas de gestante e prednisona (conteúdo conferido em 2026-11-06; decisão do médico em 2026-11-07)
const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = (page) => page.locator('#detail textarea[data-f="casa"]').inputValue();
const abrePac = (page) => page.evaluate(() => { document.querySelector("#detail details.sec.pac").open = true; });
const alertas = (page) => page.evaluate(() => document.querySelector("#detail .alertas").textContent);

test("alergia a AINE: a receita troca dipirona e anti-inflamatório por paracetamol e avisa", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "cefaleia");
  expect(await receita(page)).toMatch(/dipirona|ibuprofeno|naproxeno|cetoprofeno|diclofenaco/i);
  await abrePac(page); await page.check("#pcAine");
  const t = await receita(page);
  expect(t).not.toMatch(/dipirona|ibuprofeno|naproxeno|cetoprofeno|diclofenaco|nimesulida/i);
  expect(t).toMatch(/Paracetamol 750mg/);
  expect((t.match(/Paracetamol/g) || []).length).toBe(1);
  expect(t).not.toMatch(RUIM);
  await expect(page.locator("#detail .rxaviso")).toContainText("Trocado por alergia a AINE");
  expect(await alertas(page)).toMatch(/reação é cruzada/);
  // já tinha paracetamol: o AINE só sai, sem paracetamol repetido
  await conduta(page, "lombalgia");
  const l = await receita(page);
  expect(l).not.toMatch(/ibuprofeno|naproxeno|cetoprofeno|diclofenaco|dipirona/i);
  expect((l.match(/Paracetamol/g) || []).length).toBe(1);
  // nada vai para o armazenamento do aparelho (regra 5)
  expect(await page.evaluate(() => JSON.stringify(localStorage))).not.toMatch(/"aine"|"sulfa"/);
  expect(erros).toEqual([]);
});

test("alergia a AINE pelo campo Alergias do Atendimento também troca a receita", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "cefaleia");
  await page.evaluate(() => document.querySelector("#atdIr").click());
  await page.locator('#atCorpo [data-atd="alergia"]').fill("ibuprofeno");
  await expect(page.locator('#atCorpo [data-atout="rx"]')).not.toHaveValue(/^\s*\d+\)\s*(dipirona|ibuprofeno)/im);   // a orientação de dengue pode citar o ibuprofeno
  await expect(page.locator('#atCorpo [data-atout="rx"]')).toHaveValue(/Paracetamol/);
  expect(erros).toEqual([]);
});

test("alergia a sulfa alerta o sulfametoxazol + trimetoprima", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "prostatite");
  await abrePac(page); await page.check("#pcSulfa");
  const a = await alertas(page);
  expect(a).toMatch(/Alergia a sulfa: não usar sulfametoxazol \+ trimetoprima/);
  expect(a).toMatch(/Stevens-Johnson/);
  expect(erros).toEqual([]);
});

test("gestante: alerta do valproato; ivermectina sem 'não usar'", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "convulsao");
  await abrePac(page); await page.check("#pcGest");
  expect(await alertas(page)).toMatch(/Valproato:[^.]*Contraindicado na gestação, salvo sem alternativa/);
  await conduta(page, "escabiose");
  const a = await alertas(page);
  expect(a).toMatch(/Ivermectina: Usar só se o benefício justificar \(bula: categoria C\)/);
  expect(a).not.toMatch(/Ivermectina: Não usar/);
  expect(erros).toEqual([]);
});

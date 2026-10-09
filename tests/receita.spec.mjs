import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = (page) => page.locator('textarea[data-f="casa"]').inputValue();

test("receita por toque: só o escolhido vai para a receita, renumerada, e Novo paciente volta ao padrão", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  let t = await receita(page);
  expect(t.match(/Amoxicilina/g).length).toBe(1);           // uma opção só, não as 8
  expect(t).not.toMatch(/^Ou\b|^#/m);
  await page.locator("#detail .rxc", { hasText: "Se alergia a penicilina" }).click();
  await page.locator("#detail .rxc.rxsem").first().click();  // sem amoxicilina
  await page.locator("#detail .rxc", { hasText: "Ibuprofeno" }).click();
  t = await receita(page);
  expect(t).not.toMatch(/Amoxicilina|Ibuprofeno/);
  expect(t).toMatch(/^4\) Azitromicina/m);                   // renumerada
  expect(await page.locator("#atdEv").inputValue()).toMatch(/Azitromicina/);
  await page.click("#novoPac"); await page.click("#novoPac");
  expect(await receita(page)).toMatch(/Amoxicilina/);
  expect(erros).toEqual([]);
});

test("nenhuma receita montada sai com 'Ou', '#' ou nota para o médico", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  const ids = await page.$$eval("#list .item", (x) => [...new Set(x.map((e) => e.dataset.id))]);
  for (const id of ids) {
    await conduta(page, id);
    if (!(await page.locator("#detail .rxmontar").count())) continue;
    const t = await receita(page);
    expect(t, id).not.toMatch(/^\s*Ou\b|^#|^\s*(Criança|Gestante|CID)\b/m);
    expect(t, id).toMatch(/^\s*1\)/m);   // nunca sai vazia (ex.: dengue começa com um título "#")
    expect(t, id).not.toMatch(RUIM);
  }
  expect(erros).toEqual([]);
});

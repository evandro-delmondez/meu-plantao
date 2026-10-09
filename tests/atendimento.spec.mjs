import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const campo = (page, k) => page.locator(`#detail [data-atd="${k}"]`);

test("porta: sinais de alarme no topo e atendimento fechado em 1 tela, sem salvar dado do paciente", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  // sinais de alarme antes da receita
  await expect(page.locator("#detail .sec.alarmetopo li").first()).toBeVisible();
  expect(await page.evaluate(() => { const a = document.querySelector("#detail .alarmetopo"), r = document.querySelector("#detail .sec.casa"); return !!(a.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING); })).toBe(true);
  // checklist + dados do atendimento viram evolução
  await page.locator('#detail [data-ck="hist0"][data-val="+"]').click();
  await campo(page, "hma").fill("dor de garganta há 2 dias");
  await campo(page, "tax").fill("38,2");
  await campo(page, "pa").fill("118x76");
  const ev = page.locator("#atdEv");
  await expect(ev).toHaveValue(/dor de garganta há 2 dias/);
  const t = await ev.inputValue();
  expect(t).toMatch(/Refere: /);
  expect(t).toContain("Tax 38,2 °C");
  expect(t).not.toMatch(/\bafebril\b/);          // exame não contradiz a febre informada
  expect(t).toMatch(/HD: Amigdalite/);
  expect(t).toContain("Prescrição domiciliar:");
  expect(t).not.toMatch(RUIM);
  // atestado
  await campo(page, "dias").fill("2");
  await expect(page.locator("#atdAt")).toHaveValue(/02 \(dois\) dias/);
  await campo(page, "tipo").selectOption("nenhum");
  await expect(page.locator("#atdAtW")).toBeHidden();
  expect(await semRolagemLateral(page)).toBe(true);
  // nada do paciente fica no aparelho
  const ls = await page.evaluate(() => Object.values(localStorage).join(" "));
  expect(ls).not.toContain("dor de garganta há 2 dias");
  expect(ls).not.toContain("118x76");
  // os dados seguem ao trocar de diagnóstico, até "Novo paciente"
  await conduta(page, "faringite-viral").catch(() => {});
  await page.locator("#atdNovo").click();
  await expect(campo(page, "hma")).toHaveValue("");
  await expect(ev).not.toHaveValue(/dor de garganta há 2 dias/);
  expect(erros).toEqual([]);
});

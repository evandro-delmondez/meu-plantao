import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

// 2026-10-29: a antiga "Cólica renal / biliar" foi separada em Cólica renal / Litíase urinária (colica) e Vias biliares (biliar).
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dados = (() => {
  const ctx = {};
  const src = ["condutas.js", "checklists.js", "alta.js", "queixas.js", "exames.js", "extras.js"].map((f) => readFileSync(join(root, "src/data", f), "utf8").replace(/^if \(typeof module.*$/gm, "")).join("\n");
  vm.runInNewContext(src + "\n;globalThis.__d={BASE,CHECK,ALTA,QUEIXAS,EXAMES,ALTA_ITEM};", ctx);
  return ctx.__d;
})();
const cond = (id) => dados.BASE.find((c) => c.id === id);
const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = (page) => page.locator('#detail textarea[data-f="casa"]').inputValue();

test("cólica renal e vias biliares: condutas com fontes, checklist, alta, item de alta e exames", () => {
  for (const id of ["colica", "biliar"]) {
    const c = cond(id);
    expect(c, id).toBeTruthy();
    expect(c.fontes.length, id).toBeGreaterThan(5);
    expect(c.rev.some((r) => /2026-10-29/.test(r)), id).toBe(true);
    for (const g of ["hist", "ant", "ex", "alarme", "fontes"]) expect(dados.CHECK[id][g].length, `${id}.${g}`).toBeGreaterThan(0);
    expect(dados.ALTA[id].fontes.length, id).toBeGreaterThan(0);
    expect(dados.ALTA_ITEM[id].length, id).toBeGreaterThan(0);
    expect(dados.EXAMES[id].encaminhar.length, id).toBeGreaterThan(0);
  }
  expect(cond("colica").nome).toBe("Cólica renal / Litíase urinária");
  expect(cond("colica").cat).toBe("uro");
  expect(cond("biliar").cat).toBe("gi");
  // a parte biliar saiu da cólica renal
  const c = cond("colica");
  const txt = [c.nome, c.sin, c.casa, c.avisoRx.join(" "), c.unidade, c.orient, ...Object.values(dados.CHECK.colica).flat(), dados.ALTA.colica.titulo, dados.ALTA.colica.oque, ...dados.ALTA.colica.cuidados, ...dados.ALTA.colica.volte].join(" ");
  expect(txt).not.toMatch(/ves[íi]cula|colecist|colangit|biliar|Murphy/i);
  // exames: AUA de 2026, não a de 2016
  expect(dados.EXAMES.colica.fontes.join(" ")).toMatch(/AUA 2026/);
  expect(dados.EXAMES.colica.fontes.join(" ")).not.toMatch(/AUA 2016/);
});

test("cetorolaco: nenhuma conduta fala em \"doença renal\" para reduzir a dose", () => {
  for (const c of dados.BASE) {
    const t = [c.casa, (c.avisoRx || []).join(" "), c.unidade].join(" ");
    expect(t, c.id).not.toMatch(/doença renal: (15 mg|no máximo 40)/);
  }
  for (const id of ["colica", "biliar", "lombalgia", "contratura"]) expect(cond(id).unidade, id).toMatch(/insuficiência renal leve: 15 mg\. Não usar com desidratação nem insuficiência renal moderada ou grave\./);
});

test("receita montada: blocos opcionais desligados na cólica renal; vias biliares com dipirona, AINE, escopolamina e ondansetrona", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "colica");
  const opc = page.locator("#detail .rxmontar [data-rxb]", { hasText: /opcional/i });
  expect(await opc.count()).toBe(2);
  for (let i = 0; i < 2; i++) await expect(opc.nth(i)).toHaveAttribute("aria-pressed", "false");
  let t = await receita(page);
  expect(t).toMatch(/Ibuprofeno 600mg/);
  expect(t).toMatch(/Dipirona/);
  expect(t).not.toMatch(/Tramadol|Tansulosina|Escopolamina/);
  expect(await page.locator("#detail").innerText()).not.toMatch(RUIM);
  expect(await semRolagemLateral(page)).toBe(true);

  await conduta(page, "biliar");
  expect(await page.locator("#detail .rxmontar [data-rxb][aria-pressed=\"true\"]", { hasText: /opcional/i }).count()).toBe(0);
  t = await receita(page);
  for (const m of ["Dipirona", "Ibuprofeno 600mg", "Escopolamina", "Ondansetrona"]) expect(t).toContain(m);
  expect(t).not.toMatch(/Nimesulida|Tramadol/);
  await expect(page.locator("#detail .sec.chk")).toContainText("Murphy");
  await expect(page.locator("#detail .altapac")).toHaveCount(1);
  expect(await page.locator("#detail").innerText()).not.toMatch(RUIM);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("queixa dor abdominal tem caminho para a cólica renal e para as vias biliares", async ({ page }) => {
  const q = dados.QUEIXAS.find ? dados.QUEIXAS.find((x) => x.id === "dor-abdominal") : dados.QUEIXAS["dor-abdominal"];
  const alvos = q.caminhos.map((c) => c.conduta);
  expect(alvos).toContain("colica");
  expect(alvos).toContain("biliar");
  const erros = await abrir(page); await aba(page, "queixas");
  await page.click('#qLista [data-q="dor-abdominal"]');
  for (const id of ["colica", "biliar"]) await expect(page.locator(`#qCorpo [data-qc="${id}"]`)).toHaveCount(1);
  await page.locator('#qCorpo [data-qc="biliar"]').click();
  await expect(page.locator("#tab-prescricoes")).toBeVisible();
  expect(await page.evaluate(() => document.querySelector(`#list .item[aria-current="true"]`)?.dataset.id || "")).toBe("biliar");
  expect(erros).toEqual([]);
});

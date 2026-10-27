import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

// Lote de 2026-10-26: odontalgia, olho vermelho, síncope, pericardite, retenção urinária, escroto agudo e o patch da ansiedade.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dados = (() => {
  const ctx = {};
  const src = ["condutas.js", "checklists.js", "alta.js", "queixas.js", "exames.js", "extras.js"].map((f) => readFileSync(join(root, "src/data", f), "utf8").replace(/^if \(typeof module.*$/gm, "")).join("\n");
  vm.runInNewContext(src + "\n;globalThis.__d={BASE,CHECK,ALTA,QUEIXAS,EXAMES,RENAL};", ctx);
  return ctx.__d;
})();
const NOVAS = ["odontalgia", "olho-vermelho", "sincope", "pericardite", "retencao-urinaria", "escroto-agudo"];
const cond = (id) => dados.BASE.find((c) => c.id === id);
const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = (page) => page.locator('#detail textarea[data-f="casa"]').inputValue();

test("condutas novas existem, com fontes, rev, checklist, alta e exames", () => {
  for (const id of NOVAS) {
    const c = cond(id);
    expect(c, id).toBeTruthy();
    expect(c.fontes.length, id).toBeGreaterThan(2);
    expect(c.rev.length, id).toBeGreaterThan(0);
    const k = dados.CHECK[id];
    expect(k, "checklist " + id).toBeTruthy();
    for (const g of ["hist", "ant", "ex", "alarme", "fontes"]) expect(k[g].length, `${id}.${g}`).toBeGreaterThan(0);
    const a = dados.ALTA[id];
    expect(a, "alta " + id).toBeTruthy();
    expect(a.volte.length && a.cuidados.length && a.fontes.length, "alta " + id).toBeTruthy();
    expect(dados.EXAMES[id], "exames " + id).toBeTruthy();
  }
  expect(dados.ALTA.ansiedade, "alta da ansiedade").toBeTruthy();
});

test("odontalgia: antibióticos vêm desligados; a receita padrão só tem analgésico e anti-inflamatório", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "odontalgia");
  for (const b of ["Antibiótico", "Alergia a penicilina", "Alergia grave", "Sem melhora"]) await expect(page.locator("#detail .rxmontar .rxbloco .rxc", { hasText: b }).first()).toHaveAttribute("aria-pressed", "false");
  const t = await receita(page);
  expect(t).toMatch(/Dipirona|Paracetamol/);
  expect(t).toMatch(/Ibuprofeno 600mg/);
  expect(t).not.toMatch(/Amoxicilina|Cefalexina|Azitromicina|Clindamicina|Clavulanato|Metronidazol/);
  expect(cond("odontalgia").casa).not.toMatch(/Metronidazol|reserva/i);
  await expect(page.locator("#detail .altapac")).toHaveCount(1);
  expect(await page.locator("#detail").innerText()).not.toMatch(RUIM);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("olho vermelho: nenhum colírio anestésico na receita de casa", async ({ page }) => {
  expect(cond("olho-vermelho").casa).not.toMatch(/anest|proximeta|tetraca|oxibupro|lidoca/i);
  expect(cond("olho-vermelho").unidade).toMatch(/Proximetacaína/);   // só na unidade
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "olho-vermelho");
  expect(await receita(page)).toMatch(/Tobramicina 0,3% colírio/);
  expect(await receita(page)).not.toMatch(/anest|proximeta/i);
  expect(erros).toEqual([]);
});

test("ansiedade: sem benzodiazepínico na receita e com a frase da NICE", async ({ page }) => {
  const a = cond("ansiedade");
  expect(a.casa || "").not.toMatch(/diazepam|clonazepam|alprazolam|lorazepam|bromazepam|benzodiaz/i);
  expect(a.unidade).toContain("Não prescrever benzodiazepínico para casa (NICE CG113 1.3.20).");
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "ansiedade");
  const t = await page.locator('#detail textarea[data-f="casa"]').count() ? await receita(page) : "";
  expect(t).not.toMatch(/diazepam|clonazepam|alprazolam|lorazepam|bromazepam/i);
  expect(erros).toEqual([]);
});

test("escroto agudo e retenção: ceftriaxona 500 mg, meropeném com vancomicina, tansulosina após o café", () => {
  const e = cond("escroto-agudo");
  expect(e.unidade).toMatch(/Ceftriaxona 500 mg IM/);
  expect(e.unidade).toMatch(/Meropeném 1 g EV de 8\/8h \+ vancomicina/);
  expect(e.unidade).toMatch(/CCIH local/);
  for (const id of ["retencao-urinaria", "hpb", "colica"]) expect(cond(id).casa, id).not.toMatch(/Tansulosina[^\n]*\n[^\n]*à noite/);
  expect(cond("retencao-urinaria").casa).toMatch(/após o café da manhã/);
});

test("ajuste renal do levofloxacino segue a dose da receita", () => {
  const r = (txt) => dados.RENAL.filter((x) => x.re.test(txt)).map((x) => x.nome);
  expect(r("Levofloxacino 500mg ---- 10 cp")).toEqual(["Levofloxacino 500 mg"]);
  expect(r("Levofloxacino 750mg ---- 7 cp")).toEqual(["Levofloxacino 750 mg"]);
});

test("queixas novas levam às condutas, e síncope e pericardite ligadas", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "queixas");
  for (const [q, c] of [["dor-de-dente", "odontalgia"], ["olho-vermelho", "olho-vermelho"], ["tontura-sincope", "sincope"], ["dor-toracica", "pericardite"], ["dor-abdominal", "escroto-agudo"], ["lombalgia", "retencao-urinaria"]]) {
    await page.click(`#qLista [data-q="${q}"]`);
    await expect(page.locator(`#qCorpo [data-qc="${c}"]`).first(), `${q} → ${c}`).toHaveCount(1);
  }
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

// Lote 3 (2026-11-06): pancreatite, diverticulite, HDB, meningite, AIT/AVC hemorrágico, paralisia facial, pneumotórax e o patch da CAD.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dados = (() => {
  const ctx = {};
  const src = ["condutas.js", "checklists.js", "alta.js", "queixas.js", "exames.js", "extras.js"].map((f) => readFileSync(join(root, "src/data", f), "utf8").replace(/^if \(typeof module.*$/gm, "")).join("\n");
  vm.runInNewContext(src + "\n;globalThis.__d={BASE,CHECK,ALTA,QUEIXAS,EXAMES,ALTA_ITEM,SC};", ctx);
  return ctx.__d;
})();
const NOVAS = ["pancreatite", "diverticulite", "hdb", "meningite", "ait", "paralisia-facial", "pneumotorax"];
const cond = (id) => dados.BASE.find((c) => c.id === id);
const sc = (id) => dados.SC.find((s) => s.id === id);
const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = async (page) => (await page.locator('#detail textarea[data-f="casa"]').count()) ? page.locator('#detail textarea[data-f="casa"]').inputValue() : "";

test("condutas novas existem, com fontes, rev de 2026-11, checklist, alta, item de alta e exames", () => {
  for (const id of NOVAS) {
    const c = cond(id);
    expect(c, id).toBeTruthy();
    expect(c.fontes.length, id).toBeGreaterThan(2);
    expect(c.rev.some((r) => /2026-11-0[56]/.test(r)), id).toBe(true);
    for (const g of ["hist", "ant", "ex", "alarme", "fontes"]) expect(dados.CHECK[id][g].length, `${id}.${g}`).toBeGreaterThan(0);
    const a = dados.ALTA[id];
    expect(a.cuidados.length && a.volte.length && a.fontes.length, "alta " + id).toBeTruthy();
    expect(dados.ALTA_ITEM[id].length, "ALTA_ITEM " + id).toBeGreaterThan(0);
    expect(dados.EXAMES[id], "exames " + id).toBeTruthy();
    // receita de casa sem nada injetável
    expect(c.casa, id).not.toMatch(/\b(EV|IM|SC)\b|intramuscular|endovenos/i);
  }
  expect(dados.EXAMES.cad, "exames da CAD").toBeTruthy();
});

test("patch da CAD: consenso 2024, bicarbonato com a divergência, rev no início e checklist do EHH", () => {
  const c = cond("cad");
  expect(c.nome).toBe("Cetoacidose diabética / Estado hiperosmolar");
  expect(c.rev[0]).toMatch(/^Decisão do médico \(2026-11-07\)/);
  expect(c.rev[1]).toMatch(/^Atualizado \(2026-11-05\)/);
  expect(c.avisoRx.join(" ")).toMatch(/pH < 6,9/);
  expect(c.unidade).toMatch(/Bicarbonato só se pH < 6,9 \(HC-FMUSP/);
  expect(c.unidade).toMatch(/0,05 unidade\/kg\/h/);
  expect(c.sin).toMatch(/euglicemica/);
  expect(dados.CHECK.cad.hist).toContain("sede intensa com pouca ingestão de líquido");
  expect(dados.CHECK.cad.hist).toContain("poliúria, polidipsia e perda de peso");   // os itens antigos ficam
  expect(dados.CHECK.cad.fontes.join(" ")).toMatch(/PMID 39052901/);
});

test("decisões do médico (2026-11-07) aplicadas", () => {
  expect(sc("bisap").bin[0][0]).toMatch(/Ureia > 30 mg\/dL/);
  expect(sc("bisap").src).toMatch(/HC-FMUSP/);
  expect(sc("bisap").src).toMatch(/BUN > 25/);
  expect(cond("pancreatite").unidade).toMatch(/ureia > 30 mg\/dL/);
  expect(cond("diverticulite").casa).toMatch(/por 7 dias/);
  expect(cond("diverticulite").cid).toBe("K57.9");
  expect(cond("ait").unidade).toMatch(/andexanet alfa sem registro na Anvisa/);
  expect(cond("ait").unidade).toMatch(/alvo de PAS 140–160 mmHg/);
  expect(cond("meningite").cat).toBe("toxinf");
  expect(cond("meningite").unidade).toMatch(/20–35 mg\/kg \(máx\. 3 g\) pode ser considerado/);
  expect(cond("hdb").unidade).toMatch(/Plaquetas < 30 mil com sangramento ativo/);
  expect(cond("hdb").unidade).toMatch(/Complexo protrombíni/);
  expect(cond("pancreatite").unidade).not.toMatch(/cálcio > 14/i);
  expect(cond("pneumotorax").unidade).toMatch(/reavaliação em 24 h/);
  expect(cond("pneumotorax").avisoRx.join(" ")).toMatch(/6 semanas/);
  expect(cond("pneumotorax").orient).toMatch(/6 semanas/);
  const cadEx = JSON.stringify(dados.EXAMES.cad);
  expect(cadEx).toMatch(/EHH sem rebaixamento/);
  for (const id of ["pancreatite", "diverticulite", "hdb", "ait", "meningite", "pneumotorax", "cad"]) expect(cond(id).rev[0], id).toMatch(/^Decisão do médico \(2026-11-07\)/);
  const prot = readFileSync(join(root, "src/data/protocolos.js"), "utf8");
  expect(prot).not.toMatch(/EHH 200–250/);
  expect(prot).toMatch(/pH venoso ≥ 7,3 ou bicarbonato ≥ 18/);
});

test("queixa nova: fraqueza ou alteração neurológica súbita, com caminhos e alarmes", () => {
  const q = dados.QUEIXAS.find((x) => x.id === "deficit-neurologico");
  expect(q.nome).toBe("Fraqueza ou alteração neurológica súbita");
  const alvos = q.caminhos.map((c) => c.conduta);
  for (const id of ["avc", "ait", "paralisia-facial", "hipoglicemia", "convulsao"]) {
    expect(alvos, id).toContain(id);
    expect(cond(id), id).toBeTruthy();
  }
  expect(q.alarme.length).toBeGreaterThan(3);
  expect(q.fontes.join(" ")).toMatch(/AHA\/ASA/);
  expect(q.fontes.join(" ")).toMatch(/AAN/);
});

test("aba Por queixa: fraqueza súbita abre o AVC pelo caminho", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "queixas");
  await page.click('#qLista [data-q="deficit-neurologico"]');
  await expect(page.locator("#qCorpo .qalarme li").first()).toBeVisible();
  expect(await page.locator("#qCorpo").innerText()).not.toMatch(RUIM);
  expect(await semRolagemLateral(page)).toBe(true);
  await page.click('#qCorpo [data-qc="avc"]');
  await expect(page.locator("#tab-prescricoes")).toBeVisible();
  expect(await page.evaluate(() => document.querySelector(`#list .item[aria-current="true"]`)?.dataset.id || "")).toBe("avc");
  expect(erros).toEqual([]);
});

test("escores BISAP, Oakland e ICH calculam", () => {
  expect(sc("bisap").interp(3)).toMatch(/≥ 3/);
  expect(sc("bisap").interp(1)).toMatch(/0–2/);
  expect(sc("oakland").interp(8)).toMatch(/≤ 8/);
  expect(sc("oakland").interp(9)).toMatch(/> 8/);
  expect(sc("ich").interp(0)).toMatch(/cerca de 0%/);
  expect(sc("ich").interp(6)).toMatch(/5 ou 6/);
  // máximo do Oakland: 3 + 2 + 3 + 5 + 22 = 35
  const max = sc("oakland").bin.reduce((n, b) => n + b[1], 0) + sc("oakland").campos.reduce((n, c) => n + Math.max(...c[2].map((o) => o[1])), 0);
  expect(max).toBe(35);
});

test("aba Escores: BISAP com 5 critérios dá 5 pontos e Oakland com Hb < 7 soma 22", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "escores");
  await page.click('#scList [data-sc="bisap"]');
  await page.$$eval("#scForm input[type=checkbox]", (cs) => cs.forEach((c) => c.click()));
  await expect(page.locator("#scRes")).toContainText("5");
  await expect(page.locator("#scRes")).toContainText("≥ 3");
  await page.click('#scList [data-sc="oakland"]');
  await page.locator("#scForm label", { hasText: "< 7 g/dL" }).click();
  await expect(page.locator("#scRes")).toContainText("22");
  await expect(page.locator("#scRes")).toContainText("> 8");
  await page.click('#scList [data-sc="ich"]');
  await page.locator("#scForm label", { hasText: "3–4" }).click();
  await expect(page.locator("#scRes")).toContainText("2");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("cada conduta nova abre, sem IM/EV na receita, com checklist, alta e sem texto quebrado", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  for (const id of NOVAS) {
    await conduta(page, id);
    await expect(page.locator("#detail h2, #detail h3").first(), id).toBeVisible();
    const t = await receita(page);
    expect(t, id).not.toMatch(/\b(EV|IM)\b/);
    await expect(page.locator("#detail .sec.chk"), id).toHaveCount(1);
    await expect(page.locator("#detail .altapac"), id).toHaveCount(1);
    expect(await page.locator("#detail").innerText(), id).not.toMatch(RUIM);
    expect(await semRolagemLateral(page), id).toBe(true);
  }
  await conduta(page, "pancreatite");
  expect(await receita(page)).not.toMatch(/Dipirona/);   // receita inteira é opcional (alta rara)
  await conduta(page, "diverticulite");
  let t = await receita(page);
  expect(t).toMatch(/Dipirona/);
  expect(t).not.toMatch(/Amoxicilina|Ciprofloxacino|Metronidazol/);   // antibiótico só em bloco opcional
  await conduta(page, "paralisia-facial");
  t = await receita(page);
  expect(t).toMatch(/Prednisona 20mg/);
  expect(t).not.toMatch(/Valaciclovir|Aciclovir/);
  await conduta(page, "ait");
  t = await receita(page);
  expect(t).toMatch(/Ácido acetilsalicílico 100mg/);
  expect(t).not.toMatch(/Clopidogrel/);
  await conduta(page, "meningite");
  expect(await receita(page)).not.toMatch(/Rifampicina/);   // quimioprofilaxia é opcional
  await expect(page.locator("#detail .sec.chk")).toContainText("rigidez de nuca");
  await conduta(page, "pneumotorax");
  expect(await receita(page)).toMatch(/Dipirona/);
  expect(erros).toEqual([]);
});

test("cálculos da conduta: BISAP na pancreatite, Oakland na HDB, ICH no AIT/AVC hemorrágico", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  for (const [id, s] of [["pancreatite", "bisap"], ["hdb", "oakland"], ["ait", "ich"], ["ait", "abcd2"], ["meningite", "glasgow"]]) {
    await conduta(page, id);
    await expect(page.locator(`#detail [data-scin="${s}"]`), `${id} → ${s}`).toHaveCount(1);
  }
  expect(erros).toEqual([]);
});

test("queixas levam às condutas novas", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "queixas");
  for (const [q, c] of [["dor-abdominal", "pancreatite"], ["dor-abdominal", "diverticulite"], ["dor-abdominal", "hdb"], ["dor-abdominal", "cad"], ["cefaleia", "meningite"], ["cefaleia", "ait"], ["febre", "meningite"], ["tontura-sincope", "ait"], ["dor-toracica", "pneumotorax"], ["tosse-dispneia", "pneumotorax"], ["tosse-dispneia", "cad"]]) {
    await page.click(`#qLista [data-q="${q}"]`);
    await expect(page.locator(`#qCorpo [data-qc="${c}"]`).first(), `${q} → ${c}`).toHaveCount(1);
  }
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

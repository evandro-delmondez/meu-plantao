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
  for (const b of ["Antibiótico", "Receita de reserva", "Alergia a penicilina", "Alergia grave", "Sem melhora após 3 dias de amoxicilina", "Sem melhora após 3 dias de cefalexina"]) await expect(page.locator("#detail .rxmontar .rxbloco .rxc", { hasText: b }).first()).toHaveAttribute("aria-pressed", "false");
  const t = await receita(page);
  expect(t).toMatch(/Dipirona|Paracetamol/);
  expect(t).toMatch(/Ibuprofeno 600mg/);
  expect(t).not.toMatch(/Amoxicilina|Cefalexina|Azitromicina|Clindamicina|Clavulanato|Metronidazol/);
  // decidido pelo médico (2026-10-27): metronidazol na falha e receita de reserva existem, mas desligados
  expect(cond("odontalgia").casa).toMatch(/Metronidazol 250mg -+ 42 cp\nTomar 2 cp \(500 mg\) VO de 8\/8h por 7 dias/);
  expect(cond("odontalgia").casa).toMatch(/# Receita de reserva[^\n]*\n3\) Amoxicilina 500mg -+ 15 cp/);
  expect(cond("odontalgia").fontes.join(" ")).toMatch(/metronidazol 250 mg[^"]*https:\/\//);
  await page.locator("#detail .rxmontar .rxbloco .rxc", { hasText: "Sem melhora após 3 dias de cefalexina" }).click();
  expect(await receita(page)).toMatch(/Metronidazol 250mg/);
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

test("ansiedade: clonazepam só como bloco opcional desligado, com Notificação B e a frase da NICE", async ({ page }) => {
  const a = cond("ansiedade");
  expect(a.casa).toMatch(/^# Benzodiazepínico \(opcional\)/);
  expect(a.avisoRx.join(" ")).toMatch(/Notificação de Receita B/);
  expect(a.avisoRx.join(" ")).toMatch(/NICE CG113 desaconselha; só se crises frequentes e incapacitantes até a consulta/);
  expect(a.fontes.join(" ")).toMatch(/Rivotril[^"]*https:\/\//);
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "ansiedade");
  // na conduta, receita vazia (o único bloco é opcional e vem desligado): nada de clonazepam
  const naConduta = await page.locator('#detail textarea[data-f="casa"]').count() ? await receita(page) : "";
  expect(naConduta).not.toMatch(/clonazepam|diazepam|alprazolam|lorazepam|bromazepam/i);
  // no Atendimento, o bloco aparece desligado e entra só ao tocar
  await page.evaluate(() => document.querySelector("#atdIr").click());
  const rx = page.locator('#atCorpo [data-atout="rx"]');
  const bloco = page.locator("#atCorpo .atrx .rxbloco .rxc", { hasText: "Benzodiazepínico (opcional)" });
  await expect(bloco).toHaveAttribute("aria-pressed", "false");
  expect(await rx.inputValue()).not.toMatch(/clonazepam/i);
  await bloco.click();
  await expect(page.locator("#atCorpo .atrx .rxbloco .rxc", { hasText: "Benzodiazepínico (opcional)" })).toHaveAttribute("aria-pressed", "true");
  await expect(rx).toHaveValue(/Clonazepam 0,5mg/);
  expect(erros).toEqual([]);
});

test("pericardite: receita só com a dose cheia por 14 dias; desmame no aviso ao médico", () => {
  const p = cond("pericardite");
  expect(p.casa).toMatch(/Ibuprofeno 600mg -+ 42 cp\nTomar 1 cp VO de 8\/8h, após as refeições, por 14 dias\./);
  expect(p.casa).toMatch(/Ácido acetilsalicílico 500mg -+ 84 cp\nTomar 2 cp VO de 8\/8h, após as refeições, por 14 dias\./);
  expect(p.casa).not.toMatch(/Depois,|e parar/);
  expect(p.avisoRx.join(" ")).toMatch(/Desmame no retorno, guiado pela PCR e sintomas/);
  expect(p.orient).toMatch(/Volte para reavaliação em 1 a 2 semanas[^\n]*ajustar a dose/);
  expect(p.orient + dados.ALTA.pericardite.cuidados.join(" ")).not.toMatch(/datas escritas/);
});

test("síncope: CSRS na aba Escores e na conduta; sal só no aviso; glicemia como considerar na queixa", async ({ page }) => {
  const s = cond("sincope");
  expect(s.avisoRx.some((x) => /mais água e sal/.test(x) && /sem hipertensão/.test(x))).toBe(true);
  expect(s.orient).not.toMatch(/\bsal\b/i);
  expect(JSON.stringify(dados.QUEIXAS)).not.toMatch(/glicemia capilar e ECG em toda síncope/);
  const erros = await abrir(page); await aba(page, "escores");
  await page.click('#scList [data-sc="csrs"]');
  // máximo 11: todos os critérios positivos + diagnóstico cardíaco, sem predisposição vasovagal
  await page.$$eval("#scForm input[type=checkbox]", (cs) => cs.slice(1).forEach((c) => c.click()));
  await page.$$eval("#scForm input[type=radio]", (rs) => rs[rs.length - 1].click());
  await expect(page.locator("#scRes")).toContainText("11");
  await expect(page.locator("#scRes")).toContainText("risco muito alto");
  await aba(page, "prescricoes");
  await conduta(page, "sincope");
  await expect(page.locator('#detail [data-scin="csrs"]')).toHaveCount(1);
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

test("conduta ansiedade: o quadro da receita aparece com o clonazepam desligado e dá para ligar ali mesmo", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="ansiedade"]').click());
  const b = page.locator("#detail .rxmontar [data-rxb]", { hasText: /Benzodiazepínico|Clonazepam|opcional/i }).first();
  await expect(b).toBeVisible();
  await expect(b).toHaveAttribute("aria-pressed", "false");
  await b.click();
  await expect(page.locator("#detail .sec.casa")).toContainText("Clonazepam");
  expect(erros).toEqual([]);
});

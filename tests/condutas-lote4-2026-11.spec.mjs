import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

// Lote 4 (2026-11-07): 18 condutas novas, escores ADD-RS, Child-Pugh, Ottawa e PUQE-24, queixa "Saúde mental e violência",
// fontes 2026-11 e item 5, com as decisões do médico de 2026-11-07.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dados = (() => {
  const ctx = {};
  const src = ["condutas.js", "checklists.js", "alta.js", "queixas.js", "exames.js", "extras.js", "protocolos.js", "calculadora.js"].map((f) => readFileSync(join(root, "src/data", f), "utf8").replace(/^if \(typeof module.*$/gm, "")).join("\n");
  vm.runInNewContext(src + "\n;globalThis.__d={BASE,CHECK,ALTA,QUEIXAS,EXAMES,ALTA_ITEM,SC,CRB65_FX,PROTOCOLOS,CALC};", ctx);
  return ctx.__d;
})();
const NOVAS = ["disseccao-aorta", "hiponatremia", "hipocalemia", "intoxicacao-alcoolica", "overdose-opioide", "cirrose-descompensada",
  "covid", "varicela", "chikungunya", "febre-maculosa", "leptospirose",
  "sangramento-gestacao-inicial", "hiperemese", "mastite", "violencia-sexual", "ideacao-suicida", "fratura-imobilizacao", "tendinite-bursite"];
const SEM_ALTA = ["disseccao-aorta"];
const cond = (id) => dados.BASE.find((c) => c.id === id);
const sc = (id) => dados.SC.find((s) => s.id === id);
const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = async (page) => (await page.locator('#detail textarea[data-f="casa"]').count()) ? page.locator('#detail textarea[data-f="casa"]').inputValue() : "";
const busca = async (page, q) => { await page.fill("#gq", q); return page.$$eval("#gres .gitem b", (b) => b.map((x) => x.textContent)); };

test("condutas novas: fontes, rev de 2026-11-07, checklist, alta, item de alta e exames", () => {
  for (const id of NOVAS) {
    const c = cond(id);
    expect(c, id).toBeTruthy();
    expect(c.fontes.length, id).toBeGreaterThan(1);
    expect(c.rev.some((r) => /2026-11-07/.test(r)), id).toBe(true);
    for (const g of ["hist", "ant", "ex", "alarme", "fontes"]) expect(dados.CHECK[id][g].length, `${id}.${g}`).toBeGreaterThan(0);
    if (!SEM_ALTA.includes(id)) {
      expect(dados.ALTA[id].cuidados.length && dados.ALTA[id].volte.length, "alta " + id).toBeTruthy();
      expect(dados.ALTA_ITEM[id].length, "ALTA_ITEM " + id).toBeGreaterThan(0);
    }
    expect(dados.EXAMES[id], "exames " + id).toBeTruthy();
    expect(c.casa, id).not.toMatch(/\b(EV|IM)\b|intramuscular|endovenos/i);
  }
});

test("as condutas novas abrem pela busca", async ({ page }) => {
  const erros = await abrir(page);
  for (const [q, nome] of [["dissecção de aorta", /Síndrome aórtica aguda/], ["hiponatremia", /Hiponatremia/], ["hipocalemia", /Hipocalemia/], ["embriaguez", /Intoxicação alcoólica/],
    ["overdose", /opioide/], ["cirrose", /Cirrose descompensada/], ["covid", /COVID-19/], ["catapora", /Varicela/], ["chikungunya", /Chikungunya/], ["febre maculosa", /Febre maculosa/],
    ["leptospirose", /Leptospirose/], ["ameaça de aborto", /Sangramento na gestação inicial/], ["hiperêmese", /Hiperêmese/], ["mastite", /Mastite/], ["estupro", /Violência sexual/],
    ["suicídio", /suicídio/], ["fratura", /Fraturas e imobilização/], ["bursite", /Tendinite e bursite/]]) {
    expect((await busca(page, q)).join("|"), q).toMatch(nome);
  }
  expect(erros).toEqual([]);
});

test("cada conduta nova abre sem IM/EV na receita, com checklist e sem texto quebrado", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  for (const id of NOVAS) {
    await conduta(page, id);
    await expect(page.locator("#detail h2, #detail h3").first(), id).toBeVisible();
    expect(await receita(page), id).not.toMatch(/\b(EV|IM)\b/);
    await expect(page.locator("#detail .sec.chk"), id).toHaveCount(1);
    expect(await page.locator("#detail").innerText(), id).not.toMatch(RUIM);
    expect(await semRolagemLateral(page), id).toBe(true);
  }
  expect(erros).toEqual([]);
});

test("escores novos calculam (dados)", () => {
  expect(sc("addrs").interp(2)).toMatch(/alto risco/);
  expect(sc("addrs").interp(1)).toMatch(/D-dímero/);
  expect(sc("addrs").interp(0)).toMatch(/não substitui/);
  expect(sc("childpugh").interp(6)).toMatch(/Classe A/);
  expect(sc("childpugh").interp(8)).toMatch(/Classe B/);
  expect(sc("childpugh").interp(12)).toMatch(/Classe C/);
  expect(sc("ottawaTornozelo").interp(0)).toMatch(/Nenhum critério/);
  expect(sc("ottawaTornozelo").interp(1)).toMatch(/RX/);
  expect(sc("ottawaJoelho").interp(1)).toMatch(/RX do joelho/);
  expect(sc("puqe").interp(6)).toMatch(/leve/);
  expect(sc("puqe").interp(9)).toMatch(/moderada/);
  expect(sc("puqe").interp(13)).toMatch(/grave/);
  expect(sc("puqe").campos.length).toBe(3);
});

test("aba Escores: ADD-RS, Child-Pugh e PUQE-24 somam os pontos", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "escores");
  await page.click('#scList [data-sc="addrs"]');
  await page.$$eval("#scForm input[type=checkbox]", (cs) => cs.forEach((c) => c.click()));
  await expect(page.locator("#scRes")).toContainText("3");
  await expect(page.locator("#scRes")).toContainText("alto risco");
  await page.click('#scList [data-sc="childpugh"]');
  for (const t of ["> 3 mg/dL", "< 2,8 g/dL", "> 2,3", "Moderada a grave (tensa ou refratária)", "Grau 3–4"]) await page.locator("#scForm label", { hasText: t }).click();
  await expect(page.locator("#scRes")).toContainText("15");
  await expect(page.locator("#scRes")).toContainText("Classe C");
  await page.click('#scList [data-sc="puqe"]');
  await page.locator("#scForm fieldset").nth(0).locator("label", { hasText: "Mais de 6 h" }).click();
  await page.locator("#scForm fieldset").nth(1).locator("label", { hasText: "7 ou mais" }).click();
  await page.locator("#scForm fieldset").nth(2).locator("label", { hasText: "7 ou mais" }).click();
  await expect(page.locator("#scRes")).toContainText("15");
  await expect(page.locator("#scRes")).toContainText("grave");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("cálculos na conduta: ADD-RS, Child-Pugh, PUQE-24 e Ottawa", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  for (const [id, s] of [["disseccao-aorta", "addrs"], ["cirrose-descompensada", "childpugh"], ["hiperemese", "puqe"], ["fratura-imobilizacao", "ottawaTornozelo"], ["fratura-imobilizacao", "ottawaJoelho"]]) {
    await conduta(page, id);
    await expect(page.locator(`#detail [data-scin="${s}"]`), `${id} → ${s}`).toHaveCount(1);
  }
  expect(erros).toEqual([]);
});

test("queixa nova: Saúde mental e violência, com caminhos para as condutas", async ({ page }) => {
  const q = dados.QUEIXAS.find((x) => x.id === "saude-mental");
  expect(q.nome).toBe("Saúde mental e violência");
  const alvos = q.caminhos.map((c) => c.conduta);
  for (const id of ["ideacao-suicida", "violencia-sexual", "agitacao", "ansiedade"]) { expect(alvos, id).toContain(id); expect(cond(id), id).toBeTruthy(); }
  expect(q.alarme.length).toBeGreaterThan(2);
  expect(q.fontes.length).toBeGreaterThan(3);
  const erros = await abrir(page); await aba(page, "queixas");
  await page.click('#qLista [data-q="saude-mental"]');
  await expect(page.locator("#qCorpo .qalarme li").first()).toBeVisible();
  expect(await page.locator("#qCorpo").innerText()).not.toMatch(RUIM);
  expect(await semRolagemLateral(page)).toBe(true);
  await page.click('#qCorpo [data-qc="ideacao-suicida"]');
  await expect(page.locator("#tab-prescricoes")).toBeVisible();
  expect(await page.evaluate(() => document.querySelector(`#list .item[aria-current="true"]`)?.dataset.id || "")).toBe("ideacao-suicida");
  expect(erros).toEqual([]);
});

test("queixas levam às condutas novas", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "queixas");
  for (const [q, c] of [["dor-toracica", "disseccao-aorta"], ["lombalgia", "disseccao-aorta"], ["dor-abdominal", "cirrose-descompensada"], ["dor-abdominal", "sangramento-gestacao-inicial"],
    ["dor-abdominal", "hiperemese"], ["tontura-sincope", "hiponatremia"], ["tontura-sincope", "hipocalemia"], ["febre", "chikungunya"], ["febre", "febre-maculosa"], ["febre", "leptospirose"],
    ["febre", "varicela"], ["febre", "covid"], ["febre", "mastite"], ["tosse-dispneia", "covid"], ["dor-musculoesqueletica", "fratura-imobilizacao"], ["dor-musculoesqueletica", "tendinite-bursite"]]) {
    await page.click(`#qLista [data-q="${q}"]`);
    await expect(page.locator(`#qCorpo [data-qc="${c}"]`).first(), `${q} → ${c}`).toHaveCount(1);
  }
  expect(erros).toEqual([]);
});

test("progesterona na ameaça de abortamento é bloco opcional, desligado", async ({ page }) => {
  const c = cond("sangramento-gestacao-inicial");
  expect(c.casa).toMatch(/# Progesterona: [^\n]*\(opcional\)\nUso vaginal\n2\) Progesterona micronizada 200mg[^\n]*\nAplicar 2 cápsulas via vaginal de 12\/12h por 14 dias/);
  expect(c.casa).toMatch(/56 cápsulas\nAplicar 2 cápsulas via vaginal de 12\/12h por 14 dias\. O obstetra do pré-natal decide se continua até 16 semanas\./);
  expect(c.avisoRx.join(" ")).toMatch(/gestação intrauterina/);
  expect(c.avisoRx.join(" ")).toMatch(/amendoim ou soja/);
  expect(c.unidade).toMatch(/400 mg de 12\/12h/);
  expect(c.unidade).toMatch(/Antes de 12 semanas: não fazer/);
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "sangramento-gestacao-inicial");
  const t = await receita(page);
  expect(t).toMatch(/Paracetamol/);
  expect(t).not.toMatch(/Progesterona/);
  expect(erros).toEqual([]);
});

test("prostatite e pielonefrite sem ciprofloxacino como 1ª opção", async ({ page }) => {
  const p = cond("prostatite");
  expect(p.casa.indexOf("Sulfametoxazol")).toBeLessThan(p.casa.indexOf("Ciprofloxacino"));
  expect(p.unidade).toMatch(/Ceftriaxona 1 g EV/);
  expect(p.unidade).toMatch(/hemocultura/);
  expect(p.fontes.join(" ")).toMatch(/EAU Guidelines on Urological Infections, edição 2026/);
  const itu = cond("itu");
  const pielo = itu.casa.slice(itu.casa.indexOf("# Pielonefrite ambulatorial"));
  expect(pielo).toMatch(/^# Pielonefrite ambulatorial:\nUso oral\n1\) Cefuroxima axetila 500mg -+ 20 cp\nTomar 1 cp VO de 12\/12h, após as refeições, por 10 dias\.\nOu \(alergia a betalactâmico, sem quinolona nos últimos 12 meses\)\n1\) Ciprofloxacino 500mg -+ 14 cp\nTomar 1 cp VO de 12\/12h por 7 dias\./);
  expect(itu.casa.indexOf("Cefuroxima")).toBeLessThan(itu.casa.indexOf("Ciprofloxacino"));
  expect(itu.casa).not.toMatch(/Levofloxacino/);
  expect(itu.avisoRx.join(" ")).toMatch(/bula brasileira do Zinnat traz 250 mg/);
  expect(itu.fontes.join(" ")).toMatch(/tabela 1\.2/);
  expect(itu.fontes.join(" ")).not.toMatch(/5 a 10/);
  expect(p.avisoRx.join(" ")).toMatch(/SMX-TMP só após a ceftriaxona: resistência de 27–35% no Brasil/);
  expect(itu.avisoRx).toContain("Rever o antibiótico pela urocultura em 48–72 h.");
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "prostatite");
  const t = await receita(page);
  expect(t).toMatch(/1\) Sulfametoxazol \+ Trimetoprima/);
  expect(t).not.toMatch(/Ciprofloxacino/);
  expect(erros).toEqual([]);
});

test("decisões do médico (2026-11-07) aplicadas", () => {
  const d = cond("disseccao-aorta");
  expect(d.unidade).toMatch(/FC 60–80 bpm/);
  expect(d.unidade).toMatch(/PAS < 120 mmHg na 1ª hora/);
  expect(d.unidade).toMatch(/Morfina 2 mg EV lenta[^\n]*sem intervalo fixo/);
  expect(d.unidade).toMatch(/a cada 10 min se preciso, até 20 mg/);
  const xdis = JSON.stringify(dados.PROTOCOLOS);
  expect(xdis).toMatch(/FC 60–80 bpm \(ACC\/AHA 2022\) e PAS < 120 mmHg na 1ª hora/);
  expect(xdis).toMatch(/PAS 130–140 mmHg com cautela em 24–48 h/);
  expect(cond("has").unidade).toMatch(/PAS 130–140 mmHg com cautela em 24–48 h/);
  expect(cond("has").unidade).toMatch(/Captopril 25mg/);   // hasorg: DBHA mantida
  expect(cond("chikungunya").unidade).toMatch(/por 4 semanas, depois desmame/);
  expect(cond("leptospirose").unidade).toMatch(/repor conforme a conduta Hipocalemia/);
  expect(cond("leptospirose").unidade).not.toMatch(/0,5 mEq\/kg\/h/);
  expect(cond("febre-maculosa").unidade).toMatch(/bula FDA/);
  expect(cond("erisipela").casa).toMatch(/Tomar 2 cp VO de 12\/12h por 5 dias/);
  expect(cond("cirrose-descompensada").avisoRx.join(" ")).toMatch(/PBE K65\.0/);
  expect(cond("hipocalemia").casa).toMatch(/por 5 dias/);
  expect(cond("hiperemese").casa).toMatch(/# Ondansetrona \(opcional\): 2ª linha, de preferência após o 1º trimestre/);
  expect(cond("mastite").casa).toMatch(/por 10 dias/);
  expect(cond("mastite").casa).toMatch(/Ibuprofeno 600mg/);
  expect(cond("tendinite-bursite").casa).toMatch(/por 14 dias/);
  expect(cond("violencia-sexual").unidade).toMatch(/Vacina HPV/);
  expect(cond("fratura-imobilizacao").avisoRx.join(" ") + cond("fratura-imobilizacao").unidade).toMatch(/até 6 h/);
  // queimadura pelo ATLS 11
  const q = cond("queimadura");
  expect(q.unidade).toMatch(/500 mL\/h a partir de 13 anos, 250 mL\/h de 6 a 12 anos e 125 mL\/h até 5 anos/);
  expect(q.unidade).toMatch(/calculado sobre 16 h, não 8 h/);
  expect(q.unidade).toMatch(/Sem bolus, exceto na hipotensão/);
  expect(q.unidade).not.toMatch(/Metade nas primeiras 8h \(a contar/);
  // PAC: CURB-65 com 42, CRB-65 pela NICE, sem BTS 2009
  expect(sc("curb").bin[1][0]).toMatch(/Ureia > 42 mg\/dL/);
  expect(sc("crb").src).not.toMatch(/British Thoracic/);
  expect(cond("pac").fontes.join(" ")).not.toMatch(/British Thoracic Society\. Guidelines for the management of community/);
  expect(dados.CRB65_FX.find((f) => f.max === 2).txt).toMatch(/encaminhar ao hospital/);
  expect(cond("pac").casa).toMatch(/por 5 dias/);
  // MART com Symbicort Turbuhaler
  expect(cond("asma").casa).toMatch(/Symbicort Turbuhaler/);
  expect(cond("asma").casa).toMatch(/No máximo 12 inalações por dia/);
  expect(JSON.stringify(dados.ALTA.asma)).toMatch(/1 inalação a mais/);
  // nada do hospital local
  expect(JSON.stringify(dados)).not.toMatch(/Santa Lúcia|HSLS/);
});

test("mpox: conduta nova abre pela busca, com notificação e isolamento; escore AIR na dor abdominal", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="mpox"]').click());
  await expect(page.locator("#detail")).toContainText("Mpox");
  await expect(page.locator("#detail")).toContainText(/notifica/i);
  await expect(page.locator("#detail")).toContainText(/isolamento/i);
  await page.evaluate(() => document.querySelector('#list .item[data-id="dor-abdominal"]').click());
  await expect(page.locator('#detail [data-scin="air"]')).toHaveCount(1);
  expect(erros).toEqual([]);
});

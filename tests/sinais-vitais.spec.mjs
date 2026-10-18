import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const campo = (page, k) => page.locator(`#detail [data-atd="${k}"]`);
async function idade(page, v) {
  await page.evaluate(() => { document.querySelector("#detail details.sec.pac").open = true; });
  await page.fill("#pcIdade", v); await page.dispatchEvent("#pcIdade", "change");
}

test("NEWS2 calculado na hora com os sinais da simulação (idoso com pneumonia) e aviso no topo", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "pac");
  await idade(page, "70");
  const aviso = page.locator("#atdAviso");
  await expect(aviso).toBeHidden();                       // sem sinais vitais, sem aviso
  await campo(page, "fr").fill("24");
  await campo(page, "sat").fill("93");
  await campo(page, "pa").fill("150x90");
  await campo(page, "tax").fill("38,5");
  await campo(page, "fc").fill("100");
  await campo(page, "cons").selectOption("A");
  await campo(page, "o2").selectOption("ar");
  // FR 24 = 2; SpO2 93 = 2; ar = 0; PAS 150 = 0; FC 100 = 1; alerta = 0; 38,5 = 1 → 6 (RCP 2017)
  await expect(aviso).toBeVisible();
  await expect(aviso).toContainText("NEWS2 6");
  await expect(aviso).toContainText("resposta urgente");
  await expect(aviso).toContainText("não é verde");
  await expect(aviso).toHaveAttribute("data-nv", "urgente");
  // febre com taquicardia acende o alerta de sepse; SpO2 93% não acende o de < 92%
  await expect(aviso).toContainText("Tax 38,5 °C com FC 100");
  await expect(aviso).not.toContainText("SpO2 93%");
  // aviso vem antes dos sinais de alarme e da receita
  expect(await page.evaluate(() => { const a = document.querySelector("#atdAviso"), r = document.querySelector("#detail .sec.casa"); return !!(a.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING); })).toBe(true);
  // evolução tem uma linha do NEWS2
  const ev = await page.locator("#atdEv").inputValue();
  expect(ev).toMatch(/NEWS2: 6 \(FR 2, SpO2 2, O2 0, PAS 0, FC 1, consciência 0, temperatura 1\) — 5–6: risco médio, resposta urgente\./);
  expect(ev).not.toMatch(RUIM);
  // sem FC: total parcial 5 e o que falta
  await campo(page, "fc").fill("");
  await expect(aviso).toContainText("NEWS2 parcial 5");
  await expect(aviso).toContainText("Faltam: FC");
  // hipoxemia e PA ≥ 180/110
  await campo(page, "sat").fill("89"); await campo(page, "pa").fill("186x112");
  await expect(aviso).toContainText("SpO2 89% em ar ambiente");
  await expect(aviso).toContainText("PA 186x112 (≥ 180/110)");
  await expect(aviso).toContainText("lesão de órgão-alvo");
  // emergência: NEWS2 7 ou mais
  await campo(page, "fc").fill("135");
  await expect(aviso).toHaveAttribute("data-nv", "emergencia");
  await expect(aviso).toContainText("resposta de emergência");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("PA ≥ 180/110 com AINE na receita avisa do AINE", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "lombalgia");
  await expect(page.locator("#detail .sec.casa textarea")).toHaveValue(/ibuprofeno|naproxeno|cetoprofeno|diclofenaco/i);
  await campo(page, "pa").fill("182x100");
  await expect(page.locator("#atdAviso")).toContainText("Esta receita tem AINE");
  expect(erros).toEqual([]);
});

test("CRB-65 na pneumonia: 70 anos + FR 32 = 2, texto da faixa e 1ª dose EV", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "pac");
  const bloco = page.locator("#crbBloco");
  await expect(bloco).toBeVisible();
  await idade(page, "70");
  await campo(page, "fr").fill("32");
  await campo(page, "pa").fill("130x80");
  await campo(page, "cons").selectOption("A");            // alerta: confusão = 0
  await expect(page.locator("#crbTotal")).toHaveText("CRB-65: 2");
  await expect(bloco).toContainText("risco intermediário");
  await expect(bloco).toContainText("ceftriaxona 1 g EV");
  await expect(bloco).toContainText("levofloxacino 750 mg EV");
  // checkbox e campo de consciência são o mesmo estado
  await expect(campo(page, "cons")).toHaveValue("A");
  await page.locator("#crbConf").check();
  await expect(campo(page, "cons")).toHaveValue("C");
  await expect(page.locator("#crbTotal")).toHaveText("CRB-65: 3");
  await expect(bloco).toContainText("alto risco");
  // a evolução leva o CRB-65
  await expect(page.locator("#atdEv")).toHaveValue(/CRB-65: 3 — 3–4: alto risco/);
  // alvos de toque de 44 px (confusão, oxigênio e consciência)
  const alt = await page.evaluate(() => [".crbck", '#detail [data-atd="o2"]', '#detail [data-atd="cons"]'].map((s) => document.querySelector(s).getBoundingClientRect().height));
  expect(Math.min(...alt)).toBeGreaterThanOrEqual(43.5);
  // outras condutas não têm o bloco
  await conduta(page, "amigdalite");
  await expect(page.locator("#crbBloco")).toHaveCount(0);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("texto único do CRB-65/CURB-65 na conduta, no escore e na queixa", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "prescricoes"); await conduta(page, "pac");
  const r = { unid: await page.locator("#detail .sec.unidade textarea").inputValue() };
  for (const f of ["CRB-65 0: baixo risco, tratamento em casa", "CRB-65 1–2: risco intermediário, observação ou internação por julgamento clínico", "CRB-65 3–4: alto risco, internação urgente e avaliar UTI", "CURB-65 0–1: baixo risco, tratamento em casa", "CURB-65 2: risco intermediário, observação ou internação curta", "CURB-65 3–5: alto risco, internar e avaliar UTI"]) {
    expect(r.unid, f).toContain(f);
  }
  // escore da aba Cálculos usa as mesmas faixas
  await aba(page, "escores");
  await page.locator('#scList [data-sc="crb"]').click();
  await page.locator('#scForm input[data-b="1"]').check();
  await page.locator('#scForm input[data-b="3"]').check();
  await expect(page.locator("#scRes")).toContainText("1–2: risco intermediário");
  expect(erros).toEqual([]);
});

test("queixa tosse e dispneia usa as mesmas faixas", async () => {
  const fs = await import("node:fs");
  const q = fs.readFileSync(new URL("../src/data/queixas.js", import.meta.url), "utf8");
  const x = fs.readFileSync(new URL("../src/data/extras.js", import.meta.url), "utf8");
  const curtos = [...x.matchAll(/curto:"([^"]+)"/g)].map((m) => m[1]);
  expect(curtos.length).toBe(6);
  for (const c of curtos) expect(q, c).toContain(c);
});

test("Novo paciente limpa sinais vitais, NEWS2 e CRB-65; nada vai para o localStorage", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "pac");
  await idade(page, "70");
  await campo(page, "fr").fill("32"); await campo(page, "sat").fill("91"); await campo(page, "pa").fill("188x96");
  await campo(page, "o2").selectOption("ar"); await campo(page, "cons").selectOption("A");
  await expect(page.locator("#atdAviso")).toBeVisible();
  const ls = await page.evaluate(() => Object.keys(localStorage).map((k) => k + "=" + localStorage.getItem(k)).join("\n"));
  expect(ls).not.toContain("188x96");
  expect(ls).not.toMatch(/"o2"|"cons"|NEWS2|CRB-65/);
  await page.locator("#atdNovo").click(); await page.locator("#atdNovo").click();
  await expect(campo(page, "fr")).toHaveValue("");
  await expect(campo(page, "o2")).toHaveValue("");
  await expect(campo(page, "cons")).toHaveValue("");
  await expect(page.locator("#atdAviso")).toBeHidden();
  await expect(page.locator("#crbTotal")).toHaveText("CRB-65: 0 (parcial)");
  await expect(page.locator("#atdEv")).not.toHaveValue(/NEWS2/);
  expect(erros).toEqual([]);
});

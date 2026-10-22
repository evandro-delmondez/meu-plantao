import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

const SIGLAS = /\b(BEG|CHAAA|LOTE|RCR|BNF|MV\+|RHA|MMII|MMSS|ACV|AR:|Abd:|DB|AA|TVP|IG|BCF)\b/;
const ANTIGO_ADULTO = `Exame físico:
BEG, CHAAA, eupneico em AA, LOTE.
Neuro: Glasgow 15, sem sinais meníngeos ou focais, pupilas isocóricas e fotorreagentes. Sem paralisia facial ou de MMSS/MMII.
ACV: RCR 2T, BNF, sem sopros audíveis.
AR: MV+ bilateralmente, sem RA; sem sinais de esforço respiratório.
Abd: flácido, RHA+, indolor à palpação superficial e profunda, Murphy (-), DB (-), Giordano (-).
MMII: sem edemas, sem sinais de TVP, panturrilhas livres, boa perfusão periférica.
Pele: sem alterações evidentes.`;

test("modelos de exame vêm por extenso, com versões masculina e feminina", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "evolucao");
  // exame sempre por sistemas: sexo e perfil por botões, todos por extenso e com o gênero certo
  for (const [sx, pf] of [["M", "adulto"], ["F", "adulto"], ["M", "ped"], ["F", "ped"], ["F", "gest"]]) {
    await page.click(`#atCorpo [data-atseg="exPerfil"][data-v="${pf}"]`);
    if (pf !== "gest") await page.click(`#atCorpo [data-atseg="exSexo"][data-v="${sx}"]`);
    const t = await page.inputValue('#atCorpo [data-atout="exame"]');
    expect(t, sx + pf).not.toMatch(SIGLAS);
    if (sx === "F") { expect(t, sx + pf).toContain("corada"); expect(t, sx + pf).not.toMatch(/\bcorado\b/); }
    else expect(t, sx + pf).toMatch(/\bcorado\b/);
  }
  expect(erros).toEqual([]);
});

test("atualização troca o modelo antigo não editado e preserva o editado", async ({ page }) => {
  await page.addInitScript((antigo) => {
    if (sessionStorage.getItem("semeado")) return;
    localStorage.setItem("rxp_model_v1", JSON.stringify({ v: 3, updatedAt: 5, exameSel: "adulto", conduta: "Minha conduta",
      exames: [{ id: "adulto", nome: "Adulto", texto: antigo }, { id: "pediatrico", nome: "Pediátrico", texto: "Exame físico:\nMEU TEXTO PEDIÁTRICO" }, { id: "gestante", nome: "Gestante", texto: "x" }, { id: "ex-meu", nome: "Ortopedia", texto: "Meu exame ortopédico" }] }));
    sessionStorage.setItem("semeado", "1");
  }, ANTIGO_ADULTO);
  const erros = await abrir(page); await aba(page, "modelos");
  const ex = await page.evaluate(() => JSON.parse(localStorage.getItem("rxp_model_v1")));
  expect(ex.v).toBe(3); // nada é regravado sem o usuário salvar
  const ids = await page.$$eval("#mdExSel option", (o) => o.map((x) => x.value));
  expect(ids).toEqual(["adulto", "adulto-f", "pediatrico", "pediatrico-f", "gestante", "ex-meu"]);
  await page.selectOption("#mdExSel", "adulto");
  await expect(page.locator("#mdExTxt")).toHaveValue(/Bom estado geral, corado/);
  await expect(page.locator("#mdExNome")).toHaveValue("Adulto — masculino");
  await page.selectOption("#mdExSel", "pediatrico");
  await expect(page.locator("#mdExTxt")).toHaveValue(/MEU TEXTO PEDIÁTRICO/);
  await page.selectOption("#mdExSel", "ex-meu");
  await expect(page.locator("#mdExTxt")).toHaveValue("Meu exame ortopédico");
  await expect(page.locator("#mdConduta")).toHaveValue("Minha conduta");
  expect(erros).toEqual([]);
});

test("texto de cada sistema do exame é editável em Meus modelos, vale no Atendimento e continua após recarregar", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "modelos");
  await page.selectOption("#mdSisSel", "oro");
  await expect(page.locator("#mdSisTxt")).toHaveValue(/^Orofaringe:/);
  await page.fill("#mdSisTxt", "Orofaringe: meu texto de oroscopia normal.");
  await page.click("#mdSisSave");
  await page.reload();
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="amigdalite"]').click());
  await page.evaluate(() => document.querySelector("#atdIr").click());
  await expect(page.locator('#atCorpo [data-atout="exame"]')).toHaveValue(/Orofaringe: meu texto de oroscopia normal\./);
  expect(await page.evaluate(() => localStorage.getItem("rxp_model_v1"))).toContain("meu texto de oroscopia");
  // voltar ao original
  await aba(page, "modelos");
  await page.selectOption("#mdSisSel", "oro");
  await page.click("#mdSisReset");
  await expect(page.locator("#mdSisTxt")).toHaveValue(/mucosas úmidas/);
  expect(erros).toEqual([]);
});

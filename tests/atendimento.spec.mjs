import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
// abre a conduta e vai para o Atendimento pelo botão da conduta
async function atender(page, id) { await aba(page, "prescricoes"); await conduta(page, id); await page.evaluate(() => document.querySelector("#atdIr").click()); await expect(page.locator("#tab-evolucao")).toBeVisible(); }
const campo = (page, k) => page.locator(`#atCorpo [data-atd="${k}"]`);
const saida = (page, k) => page.locator(`#atCorpo [data-atout="${k}"]`);

test("porta: alarmes no topo da conduta; Atendimento em 1 tela com cópia por campo, sem salvar dado do paciente", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  await expect(page.locator("#detail .sec.alarmetopo li").first()).toBeVisible();
  expect(await page.evaluate(() => { const a = document.querySelector("#detail .alarmetopo"), r = document.querySelector("#detail .sec.casa"); return !!(a.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING); })).toBe(true);
  await page.evaluate(() => document.querySelector("#atdIr").click());
  // checklist no próprio Atendimento: "Presença de …"
  await page.locator('#atCorpo [data-ck="hist0"][data-val="+"]').click();
  await campo(page, "hma").fill("dor de garganta há 2 dias");
  await campo(page, "tax").fill("38,2");
  await campo(page, "pa").fill("118x76");
  await expect(saida(page, "hda")).toHaveValue(/dor de garganta há 2 dias/);
  await expect(saida(page, "hda")).toHaveValue(/Presença de /);
  const ex = await saida(page, "exame").inputValue();
  expect(ex).toContain("Tax 38,2 °C");
  expect(ex).not.toMatch(/\bafebril\b/);          // exame não contradiz a febre informada
  expect(ex).toMatch(/Cabeça e orofaringe:/);     // amigdalite liga cabeça e orofaringe
  expect(ex).not.toMatch(/^Abdome:/m);            // sistema não ligado não sai
  await expect(saida(page, "diag")).toHaveValue(/Hipótese diagnóstica: Amigdalite.*CID J03/);
  await expect(saida(page, "trat")).toHaveValue(/Prescrição domiciliar:/);
  await expect(page.locator("#atCorpo .cidbig")).toContainText("J03");
  await campo(page, "ap").fill("hipertensão arterial\ncolecistectomia em 2019");
  await campo(page, "muc").fill("- losartana 50 mg");
  await expect(saida(page, "hda")).toHaveValue(/HPP:\n- hipertensão arterial\n- colecistectomia em 2019\nMedicamentos em uso:\n- losartana 50 mg/);
  for (const k of ["hda", "exame", "diag", "trat", "alta"]) expect(await saida(page, k).inputValue()).not.toMatch(RUIM);
  // atestado
  await campo(page, "dias").fill("2");
  await expect(saida(page, "atest")).toHaveValue(/02 \(dois\) dias/);
  await campo(page, "tipo").selectOption("nenhum");
  await expect(page.locator("#atAtW")).toBeHidden();
  expect(await semRolagemLateral(page)).toBe(true);
  // nada do paciente fica no aparelho
  const ls = await page.evaluate(() => Object.values(localStorage).join(" "));
  expect(ls).not.toContain("dor de garganta há 2 dias");
  expect(ls).not.toContain("118x76");
  // Novo paciente (dois toques) limpa
  await page.locator("#atNovo").click();
  await expect(page.locator("#atNovo")).toContainText("Tocar de novo");
  await page.locator("#atNovo").click();
  await expect(campo(page, "hma")).toHaveValue("");
  await expect(saida(page, "hda")).not.toHaveValue(/dor de garganta há 2 dias/);
  expect(erros).toEqual([]);
});

test("Novo paciente no topo limpa o paciente em todas as abas", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "calculadora"); await page.fill("#peso", "88"); await page.dispatchEvent("#peso", "input");
  await aba(page, "pediatria"); await page.fill("#pdPeso", "17"); await page.dispatchEvent("#pdPeso", "input");
  await aba(page, "bic"); await page.fill("#bicPeso", "90"); await page.dispatchEvent("#bicPeso", "input");
  await aba(page, "atestado"); await page.fill("#atCid", "A90"); await page.dispatchEvent("#atCid", "input");
  await aba(page, "evolucao"); await campo(page, "hma").fill("paciente anterior");
  await page.click("#novoPac"); await page.click("#novoPac");
  await expect(campo(page, "hma")).toHaveValue("");
  for (const [a, id] of [["calculadora", "#peso"], ["pediatria", "#pdPeso"], ["bic", "#bicPeso"], ["atestado", "#atCid"]]) {
    await aba(page, a); await expect(page.locator(id), id).toHaveValue("");
  }
  expect(erros).toEqual([]);
});

test("Atendimento não contradiz o paciente: febre, taquipneia, alergia e destino", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "amigdalite");
  await campo(page, "tax").fill("38,4"); await campo(page, "fr").fill("24");
  const hda = await saida(page, "hda").inputValue(), ex = await saida(page, "exame").inputValue();
  expect(hda).not.toMatch(/Nega febre|Nega outros sintomas/);
  expect(ex).toMatch(/taquipneic/); expect(ex).not.toMatch(/\beupneic/);
  expect(hda).toMatch(/Alergias: não informado/);
  expect(hda).toMatch(/HPP: não informado/);
  await expect(saida(page, "alta")).toHaveValue(/Alta com orientações/);
  // alergia marcada no checklist liga o alerta e entra na história
  const item = page.locator("#atCorpo .ck", { hasText: /alergia a penicilina/ }).first();
  await item.locator('[data-val="+"]').click();
  await expect(saida(page, "hda")).toHaveValue(/Alergias:\n- penicilina/);
  await expect(page.locator('#detail [data-perfil="pnc"]')).toHaveAttribute("aria-pressed", "true");
  // emergência: sem destino padrão
  await atender(page, "sepse");
  await expect(saida(page, "alta")).not.toHaveValue(/Alta com orientações/);
  expect(erros).toEqual([]);
});

test("alta em tópicos e pedido de internação com justificativa, sem repetir a prescrição", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "pac");
  await page.locator('#atCorpo [data-atchip="reav"][data-k="melhora"]').click();
  await campo(page, "reavTxt").fill("RX com consolidação em base direita");
  await campo(page, "compreende").check();
  const alta = await saida(page, "alta").inputValue();
  expect(alta).toMatch(/^- Paciente reavaliado, com melhora após a medicação na unidade: RX com consolidação/m);
  expect(alta).toMatch(/- Paciente orientado sobre o diagnóstico, a medicação prescrita/);
  expect(alta).toMatch(/- Orientados os sinais de alarme, com retorno imediato ao pronto-socorro em caso de: /);
  expect(alta).toMatch(/- Paciente compreendeu e concorda com as orientações\./);
  expect(alta).not.toMatch(/Prescrição domiciliar|Amoxicilina/);
  // tirar um sinal de alarme da lista
  const antes = alta.length;
  await page.locator('#atCorpo [data-atchip="volte"]').first().click();
  expect((await saida(page, "alta").inputValue()).length).toBeLessThan(antes);
  // internação
  await campo(page, "destino").selectOption("internacao");
  await campo(page, "intern.local").selectOption("uti");
  await campo(page, "intern.motivo").fill("SpO2 88% em ar ambiente e CURB-65 3");
  await page.locator('#atCorpo [data-atchip="obj"][data-k="atb"]').click();
  await campo(page, "intern.lab").fill("leucócitos 19.000");
  const int = await saida(page, "intern").inputValue();
  expect(int).toMatch(/^Solicito internação em UTI\./);
  expect(int).toMatch(/Justificativa: SpO2 88%/);
  expect(int).toMatch(/Objetivo da internação: antibioticoterapia EV\./);
  expect(int).toMatch(/Exames laboratoriais relevantes: leucócitos 19\.000/);
  await expect(page.locator("#atCorpo .atperg li")).toHaveCount(5);
  // editar um campo à mão não é sobrescrito; "Refazer" volta ao automático
  await saida(page, "diag").fill("texto meu"); await saida(page, "diag").dispatchEvent("input");
  await campo(page, "diag").fill("diferencial com TEP");
  await expect(saida(page, "diag")).toHaveValue("texto meu");
  await page.locator('#atCorpo [data-atre="diag"]').click();
  await expect(saida(page, "diag")).toHaveValue(/diferencial com TEP/);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("exame físico direcionado: liga e desliga sistemas; modelo completo continua disponível", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "dor-abdominal");
  let ex = await saida(page, "exame").inputValue();
  expect(ex).toMatch(/^Abdome:/m); expect(ex).not.toMatch(/^Respiratório:/m);
  await page.locator('#atCorpo [data-atchip="sis"][data-k="resp"]').click();
  ex = await saida(page, "exame").inputValue();
  expect(ex).toMatch(/^Respiratório:/m);
  await page.locator('#atCorpo [data-atchip="sis"][data-k="abd"]').click();
  expect(await saida(page, "exame").inputValue()).not.toMatch(/^Abdome:/m);
  await campo(page, "exModelo").selectOption("adulto");
  await expect(saida(page, "exame")).toHaveValue(/Membros inferiores:/);
  expect(erros).toEqual([]);
});

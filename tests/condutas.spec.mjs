import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

test("todas as condutas abrem sem texto quebrado, com e sem dados do paciente", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  const ids = await page.$$eval("#list .item", (x) => [...new Set(x.map((e) => e.dataset.id))]);
  expect(ids.length).toBeGreaterThan(90);
  const checar = async (rotulo) => {
    for (const id of ids) {
      await page.click(`#list .item[data-id="${id}"] >> nth=0`);
      const t = await page.$eval("#detail", (e) => e.innerText + [...e.querySelectorAll("textarea")].map((t) => t.value).join("\n"));
      expect(t, `${rotulo}: ${id}`).not.toMatch(RUIM);
    }
  };
  await checar("sem paciente");
  await page.click(".sec.pac summary");
  for (const [sel, v] of [["#pcIdade", "80"], ["#pcPeso", "55"], ["#pcCr", "3"]]) { await page.fill(sel, v); await page.dispatchEvent(sel, "change"); }
  await checar("idoso com ClCr baixo");
  expect(erros).toEqual([]);
});

test("ajuste renal e alertas de perfil aparecem", async ({ page }) => {
  await abrir(page); await aba(page, "prescricoes");
  await page.fill("#q", "itu"); await page.click("#list .item >> nth=0");
  await page.click(".sec.pac summary");
  for (const [sel, v] of [["#pcIdade", "78"], ["#pcPeso", "60"], ["#pcCr", "2"]]) { await page.fill(sel, v); await page.dispatchEvent(sel, "change"); }
  await expect(page.locator(".renal-adj")).toContainText("ClCr");
});

test("dipirona 1 g substitui 500 mg quando escolhida", async ({ page }) => {
  await abrir(page); await aba(page, "prescricoes");
  await aba(page, "modelos"); await page.click('[data-dip="1g"]');
  await aba(page, "prescricoes"); await page.fill("#q", "dengue"); await page.click("#list .item >> nth=0");
  const txt = await page.$$eval("#detail textarea", (t) => t.map((x) => x.value).join("\n"));
  expect(txt).toMatch(/Dipirona 1g/);
});

test("fichas das medicações aparecem na conduta e abrem por cima, com atalho para a aba Medicações", async ({ page }) => {
  await abrir(page); await aba(page, "prescricoes");
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  const chips = page.locator("#detail .mcit [data-med]");
  await expect(chips.first()).toBeVisible();
  await chips.first().click();
  await expect(page.locator("#msBody h2")).not.toBeEmpty();
  await page.click("#msAba");
  await expect(page.locator("#tab-medicacoes")).toBeVisible();
  await expect(page.locator("#mdetail h2")).not.toBeEmpty();
});

test("alertas ficam acima da receita e só o perfil ligado abre os detalhes", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  const ordem = await page.$$eval("#detail > .sec", (s) => s.map((e) => e.className));
  expect(ordem.findIndex((c) => c.includes("alertas"))).toBeLessThan(ordem.findIndex((c) => c.includes("casa")));
  await expect(page.locator(".sec.alertas > .algrid")).toHaveCount(0);
  await page.click('[data-perfil="gest"]');
  await expect(page.locator(".sec.alertas.hot > .algrid .al.on h4")).toHaveText(["Gestante"]);
  await page.click('[data-perfil="gest"]');
  await expect(page.locator(".sec.alertas > .algrid")).toHaveCount(0);
  await expect(page.locator(".sec.fichas [data-med]").first()).toBeVisible();
  expect(erros).toEqual([]);
});

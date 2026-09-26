import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

test("abre no Início e cada seção mostra só as suas páginas", async ({ page }) => {
  const erros = await abrir(page);
  await expect(page.locator("#tab-inicio")).toBeVisible();
  await expect(page.locator("#secnav")).toBeVisible();
  const secoes = { condutas: ["prescricoes", "feridas"], remedios: ["medicacoes", "pediatria"], sala: ["sala", "bic", "iot"], documentos: ["evolucao", "atestado", "modelos", "backup"], calculos: ["escores", "calculadora", "contas"] };
  for (const [sec, abas] of Object.entries(secoes)) {
    await page.click(`#secnav [data-sec="${sec}"]`);
    await expect(page.locator(`#secnav [data-sec="${sec}"]`)).toHaveAttribute("aria-current", "page");
    const visiveis = await page.$$eval(".tabs button", (b) => b.filter((x) => x.offsetParent).map((x) => x.dataset.tab));
    expect(visiveis, sec).toEqual(abas);
  }
  await page.click('#secnav [data-sec="inicio"]');
  await expect(page.locator("#tab-inicio")).toBeVisible();
  expect(erros).toEqual([]);
});

test("busca única acha condutas, fichas e escores, inclusive pelo remédio citado na receita", async ({ page }) => {
  const erros = await abrir(page);
  await page.fill("#gq", "adrenalina");
  await expect(page.locator("#hbody")).toBeHidden();
  await page.locator("#gres .gitem").filter({ has: page.locator("b", { hasText: /^Anafilaxia$/ }) }).click();
  await expect(page.locator("#tab-prescricoes")).toBeVisible();
  await expect(page.locator("#detail h2")).toHaveText("Anafilaxia");

  await page.click('#secnav [data-sec="inicio"]');
  await page.fill("#gq", "dipirona");
  await page.locator("#gres .gitem", { hasText: "Dipirona (metamizol)" }).click();
  await expect(page.locator("#tab-medicacoes")).toBeVisible();
  await expect(page.locator("#mdetail h2")).toContainText("Dipirona");

  await page.click('#secnav [data-sec="inicio"]');
  await page.fill("#gq", "curb");
  await page.press("#gq", "Enter");
  await expect(page.locator("#tab-escores")).toBeVisible();
  await expect(page.locator("#scNome")).toHaveText("CURB-65 (pneumonia)");

  await page.click('#secnav [data-sec="inicio"]');
  await page.fill("#gq", "xyzxyz");
  await expect(page.locator("#gres")).toContainText("Nada encontrado");
  expect(await page.locator("#gres").innerText()).not.toMatch(RUIM);
  expect(erros).toEqual([]);
});

test("atalho / abre a busca de qualquer página", async ({ page }) => {
  await abrir(page); await aba(page, "escores");
  await page.keyboard.press("/");
  await expect(page.locator("#gq")).toBeFocused();
});

test("recentes e favoritos aparecem no Início e sobrevivem ao recarregar", async ({ page }) => {
  const erros = await abrir(page);
  await page.fill("#gq", "anafilaxia"); await page.press("#gq", "Enter");
  await page.click("#favBtn");
  await page.click('#secnav [data-sec="inicio"]');
  await page.fill("#gq", "dipirona"); await page.locator("#gres .gitem", { hasText: "Dipirona (metamizol)" }).click();
  await page.click('#secnav [data-sec="inicio"]');
  await page.fill("#gq", "");
  await expect(page.locator("#hRec .chip")).toHaveText(["Dipirona", "Anafilaxia"]);
  await expect(page.locator("#hFav .chip")).toHaveText(["Anafilaxia"]);
  await page.reload(); await aba(page, "inicio");
  await expect(page.locator("#hRec .chip")).toHaveText(["Dipirona", "Anafilaxia"]);
  await page.locator("#hFav .chip").click();
  await expect(page.locator("#detail h2")).toHaveText("Anafilaxia");
  expect(erros).toEqual([]);
});

test("dados de uso salvos antes da v1.2 (sem recentes) continuam funcionando", async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("semeado")) {
      localStorage.setItem("rxp_uso_v1", JSON.stringify({ counts: { amigdalite: 3 }, favs: ["amigdalite"], updatedAt: 1 }));
      sessionStorage.setItem("semeado", "1");
    }
  });
  const erros = await abrir(page);
  await expect(page.locator("#hFav .chip")).toHaveCount(1);
  await expect(page.locator("#hRec")).toContainText("aparecem aqui");
  await aba(page, "prescricoes");
  await expect(page.locator("#list .lh").first()).toHaveText("Fixadas");
  await page.click("#list .item >> nth=1");
  const uso = await page.evaluate(() => JSON.parse(localStorage.getItem("rxp_uso_v1")));
  expect(uso.favs).toEqual(["amigdalite"]);
  expect(uso.rec.length).toBe(1);
  expect(uso.counts.amigdalite).toBeGreaterThanOrEqual(3);
  expect(erros).toEqual([]);
});

test("sala vermelha lista as condutas de emergência e os atalhos", async ({ page }) => {
  const erros = await abrir(page);
  await page.click("#hRed");
  await expect(page.locator("#tab-sala")).toBeVisible();
  expect(await page.locator("#salaConds .item").count()).toBeGreaterThan(5);
  expect(await page.locator("#tab-sala").innerText()).not.toMatch(RUIM);
  await page.click('#salaConds [data-sc2="anafilaxia"]');
  await expect(page.locator("#detail h2")).toHaveText("Anafilaxia");
  await page.click('#secnav [data-sec="sala"]');
  await page.locator("#salaAtalhos .hsec", { hasText: "Emergência pediátrica" }).click();
  await expect(page.locator("#pdEm")).toBeVisible();
  expect(erros).toEqual([]);
});

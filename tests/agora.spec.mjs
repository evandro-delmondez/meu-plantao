import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

// no celular a lista some quando a conduta abre; abre direto pelo item
const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);

const CARTOES = ["convulsao", "agitacao", "anafilaxia", "sepse", "sca", "avc", "pcr"];

test("cartão Agora: aparece no topo das emergências, calcula pelo peso e não salva o peso", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  for (const id of CARTOES) {
    await conduta(page, id);
    const card = page.locator("#detail .sec.agora");
    await expect(card, id).toBeVisible();
    // o cartão vem antes da receita
    expect(await page.evaluate(() => { const a = document.querySelector("#detail .sec.agora"), r = document.querySelector("#detail .sec.casa, #detail .sec.unidade"); return !r || !!(a.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING); }), id).toBe(true);
    await expect(card.locator(".fontes li").first(), id).toBeAttached();
    const peso = card.locator("#agPeso");
    if (await peso.count()) {
      await peso.fill("70");
      const calc = (await card.locator(".agcalc").allInnerTexts()).filter(Boolean);
      expect(calc.length, id).toBeGreaterThan(0);
      for (const t of calc) expect(t, id).toMatch(/^\d[\d.,]* (mg|mcg|g|UI|mL)/);
      await peso.fill("");
    }
    expect(await card.innerText(), id).not.toMatch(RUIM);
    expect(await semRolagemLateral(page), id).toBe(true);
  }
  expect(await page.evaluate(() => Object.values(localStorage).join(" "))).not.toMatch(/"peso":"70"/);
  expect(erros).toEqual([]);
});

test("cartão Agora: peso tem teto de dose máxima e os atalhos levam às ferramentas", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "pcr");
  const atalho = page.locator("#detail .agatalhos [data-ag]").first();
  await expect(atalho).toBeVisible();
  await atalho.click();
  await expect(page.locator("#tab-prescricoes")).toBeHidden();
  await aba(page, "prescricoes");
  await conduta(page, "avc");
  await page.fill("#agPeso", "150");
  await expect(page.locator("#detail .agcalc .teto").first()).toBeVisible();
  // tenecteplase no AVC: conta da AHA e faixa da bula lado a lado
  await page.fill("#agPeso", "70");
  await expect(page.locator("#detail .agcalc", { hasText: "faixa da bula" }).first()).toContainText("17,5 mg = 3,5 mL · faixa da bula: 20 mg = 4 mL");
  // IAM: só a faixa da bula
  await conduta(page, "sca"); await page.fill("#agPeso", "70");
  await expect(page.locator("#detail .agcalc", { hasText: "faixa da bula" }).first()).toContainText("40 mg = 8 mL faixa da bula · ≥ 75 anos: 20 mg = 4 mL");
  // anafilaxia: volume com teto de 1.000 mL
  await conduta(page, "anafilaxia"); await page.fill("#agPeso", "120");
  await expect(page.locator("#detail .agcalc", { hasText: "1.000 mL" }).first()).toContainText("dose máxima");
  expect(erros).toEqual([]);
});

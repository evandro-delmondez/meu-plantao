import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

test("UPA pública × particular: selo RENAME na conduta, filtro nas fichas e preferência salva", async ({ page }) => {
  const erros = await abrir(page);
  await expect(page.locator("#hRedeNota")).toContainText("Escolha");
  await page.click('[data-rede="publica"]');
  await expect(page.locator('[data-rede="publica"]')).toHaveAttribute("aria-pressed", "true");
  await aba(page, "prescricoes");
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  const fichas = page.locator(".sec.fichas");
  await expect(fichas).toHaveClass(/pub/);
  await expect(fichas.locator(".rn.ok").first()).toHaveText("RENAME");
  await expect(fichas).toContainText("UPA pública");
  // preferência sobrevive ao recarregar (não é dado de paciente)
  await page.reload(); await aba(page, "inicio");
  await expect(page.locator('[data-rede="publica"]')).toHaveAttribute("aria-pressed", "true");
  await page.click('[data-rede="particular"]');
  await aba(page, "prescricoes"); await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  await expect(page.locator(".sec.fichas")).not.toHaveClass(/pub/);
  // filtro só RENAME nas fichas
  await aba(page, "medicacoes");
  const total = await page.locator("#mlist .item").count();
  await page.click("#mRename");
  const soRename = await page.locator("#mlist .item").count();
  expect(soRename).toBeGreaterThan(0); expect(soRename).toBeLessThan(total);
  const ui = await page.evaluate(() => JSON.parse(localStorage.getItem("rxp_ui_v1")));
  expect(ui.rede).toBe("particular");
  expect(erros).toEqual([]);
});

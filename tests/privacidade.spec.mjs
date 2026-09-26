import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

// Regra 5: nenhum dado de paciente é salvo. Versões até a 1.2 salvavam alguns; eles precisam ser ignorados e apagados,
// sem perder as preferências que não são do paciente (conduta aberta, categoria, grupo de medicação).
test("dados de paciente salvos por versões antigas são ignorados e apagados", async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem("semeado")) return;
    localStorage.setItem("rxp_ui_v1", JSON.stringify({ sel: "itu", cat: "gu", modo: "adulto", peso: "88", sexo: "F", perfil: ["gest", "pnc"], pdPeso: "7", pdAnos: "1", pdMeses: "4" }));
    localStorage.setItem("rxp_med_v1", JSON.stringify({ grupo: "antibioticos", sel: "dipirona", peso: "12" }));
    localStorage.setItem("rxp_fr_v1", JSON.stringify({ animal: "morcego", exp: "grave" }));
    sessionStorage.setItem("semeado", "1");
  });
  const erros = await abrir(page);
  // o que não é do paciente continua
  await aba(page, "prescricoes");
  await expect(page.locator("#detail h2")).toHaveText("ITU / Cistite / Pielonefrite");
  await expect(page.locator('#cats [data-c="gu"]')).toHaveAttribute("aria-pressed", "true");
  // perfis do paciente anterior não voltam ligados
  await expect(page.locator("[data-perfil][aria-pressed=true]")).toHaveCount(0);
  await aba(page, "calculadora"); await expect(page.locator("#peso")).toHaveValue("70");
  await aba(page, "pediatria"); await expect(page.locator("#pdPeso")).toHaveValue("15");
  await aba(page, "atestado"); await expect(page.locator('[data-sexo="M"]')).toHaveAttribute("aria-pressed", "true");
  await aba(page, "feridas"); await expect(page.locator('[data-g="animal"] [aria-pressed="true"]')).not.toHaveText(/morcego/i);
  const ls = await page.evaluate(() => ({ ui: JSON.parse(localStorage.getItem("rxp_ui_v1")), med: JSON.parse(localStorage.getItem("rxp_med_v1")), fr: localStorage.getItem("rxp_fr_v1") }));
  for (const k of ["peso", "sexo", "perfil", "pdPeso", "pdAnos", "pdMeses"]) expect(ls.ui, k).not.toHaveProperty(k);
  expect(ls.ui.sel).toBe("itu");
  expect(ls.med).not.toHaveProperty("peso"); expect(ls.med.grupo).toBe("antibioticos");
  expect(ls.fr).toBeNull();
  expect(erros).toEqual([]);
});

test("peso, perfil e sexo usados no plantão não sobrevivem ao recarregar", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  await page.click('[data-perfil="gest"]');
  await aba(page, "calculadora"); await page.fill("#peso", "95"); await page.dispatchEvent("#peso", "input");
  await aba(page, "pediatria"); await page.fill("#pdPeso", "9"); await page.dispatchEvent("#pdPeso", "input");
  await aba(page, "atestado"); await page.click('[data-sexo="F"]');
  await page.reload();
  await aba(page, "prescricoes"); await expect(page.locator('[data-perfil="gest"]')).toHaveAttribute("aria-pressed", "false");
  await aba(page, "calculadora"); await expect(page.locator("#peso")).toHaveValue("70");
  await aba(page, "pediatria"); await expect(page.locator("#pdPeso")).toHaveValue("15");
  await aba(page, "atestado"); await expect(page.locator('[data-sexo="F"]')).toHaveAttribute("aria-pressed", "false");
  const tudo = await page.evaluate(() => Object.keys(localStorage).map((k) => k + "=" + localStorage.getItem(k)).join("\n"));
  expect(tudo).not.toMatch(/"peso":"95"|"pdPeso"|"perfil"|"sexo"/);
  expect(erros).toEqual([]);
});

import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

test("Meus plantões: marca plantão no calendário, conta altas da lista (R$ 50) e UTI (R$ 150), salário fixo da UPA, Google Agenda", async ({ page }) => {
  const erros = await abrir(page);
  // dois pacientes no plantão atual: uma alta e uma internação em UTI
  await aba(page, "pacientes");
  for (const n of ["Alta Plantao", "Uti Plantao"]) { await page.fill("#pcNome", n); await page.click("#pcAdd"); await aba(page, "pacientes"); }
  await page.locator("#pcCorpo .pcitem", { hasText: "Alta Plantao" }).locator('[data-pd="tipo"]').selectOption("alta");
  await page.locator("#pcCorpo .pcitem", { hasText: "Uti Plantao" }).locator('[data-pd="tipo"]').selectOption("internacao");
  await page.locator("#pcCorpo .pcitem", { hasText: "Uti Plantao" }).locator('[data-pd="onde"]').selectOption("semi");   // UTI B também vale como UTI
  await aba(page, "plantoes");
  // o plantão de hoje entra sozinho no calendário (Santa Lúcia), pela lista de pacientes
  await expect(page.locator("#plCorpo .pllista li", { hasText: "Santa Lúcia" })).toHaveCount(1);
  const sl = page.locator("#plCorpo .plcard", { hasText: "Santa Lúcia" });
  await expect(sl).toContainText("1 alta");
  await expect(sl).toContainText("1 UTI");
  await expect(sl.locator(".plv")).toContainText("200,00");
  await expect(sl).toContainText(/Recebe de 20 a 25\/\d\d/);
  // UPA fora por enquanto
  await expect(page.locator("#plCorpo .plcard", { hasText: "UPA" })).toHaveCount(0);
  await expect(page.locator("#plCorpo .pltotal .plv")).toContainText("200,00");
  await expect(page.locator("#plCorpo .pllista a", { hasText: "Google Agenda" }).first()).toHaveAttribute("href", /calendar\.google\.com.*TEMPLATE/);
  // fica nos padrões (nuvem), sem nome de paciente
  const m = await page.evaluate(() => localStorage.getItem("rxp_model_v1"));
  expect(m).toContain('"escala"'); expect(m).not.toContain("Alta Plantao");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("Meus plantões: turnos matutino e vespertino, e marcar à mão num dia sem pacientes", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "plantoes");
  const iso = await page.evaluate(() => { const d = new Date(); d.setDate(28); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-28`; });
  await page.click(`#plCorpo [data-pldia="${iso}"]`);
  await expect(page.locator("#plTurno option")).toHaveText([/Diurno/, /Matutino/, /Vespertino/, /Noturno/, /24 h/]);
  await page.selectOption("#plTurno", "M");
  await page.click("#plAdd");
  await expect(page.locator("#plCorpo .panel", { hasText: "Plantões do mês" }).locator(".pllista li", { hasText: "Matutino" })).toHaveCount(1);
  await expect(page.locator("#plCorpo .pllista a").first()).toHaveAttribute("href", /T070000%2F\d{8}T130000/);
  expect(erros).toEqual([]);
});


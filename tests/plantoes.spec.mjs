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
  // marca o plantão de hoje (turno do momento) no Santa Lúcia
  const agora = await page.evaluate(() => { const d = new Date(), h = d.getHours(); const ini = h < 7 ? new Date(d - 864e5) : d; return { iso: `${ini.getFullYear()}-${String(ini.getMonth() + 1).padStart(2, "0")}-${String(ini.getDate()).padStart(2, "0")}`, turno: h >= 7 && h < 19 ? "D" : "N" }; });
  await page.click(`#plCorpo [data-pldia="${agora.iso}"]`);
  await page.selectOption("#plLocal", "hsls"); await page.selectOption("#plTurno", agora.turno);
  await page.click("#plAdd");
  const sl = page.locator("#plCorpo .plcard", { hasText: "Santa Lúcia" });
  await expect(sl).toContainText("1 alta");
  await expect(sl).toContainText("1 UTI");
  await expect(sl.locator(".plv")).toContainText("200,00");
  await expect(sl).toContainText(/Recebe de 20 a 25\/\d\d/);
  // UPA: aguardando convocação, fora do total
  await expect(page.locator("#plCorpo .plcard", { hasText: "UPA" })).toContainText("aguardando convocação");
  await expect(page.locator("#plCorpo .pltotal .plv")).toContainText("200,00");
  await expect(page.locator("#plCorpo .pllista a", { hasText: "Google Agenda" }).first()).toHaveAttribute("href", /calendar\.google\.com.*TEMPLATE/);
  // fica nos padrões (nuvem), sem nome de paciente
  const m = await page.evaluate(() => localStorage.getItem("rxp_model_v1"));
  expect(m).toContain('"escala"'); expect(m).not.toContain("Alta Plantao");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

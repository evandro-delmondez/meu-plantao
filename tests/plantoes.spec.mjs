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
  await expect(page.locator("#plCorpo .panel", { hasText: "Plantões do mês" }).locator(".pllista li", { hasText: "Santa Lúcia" })).toHaveCount(1);
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
  await expect(page.locator("#plTurno option")).toHaveText([/Diurno/, /Matutino/, /Vespertino/, /^Noturno \(/, /Noturno até 1h/, /24 h/]);
  await page.selectOption("#plTurno", "M");
  await page.click("#plAdd");
  await expect(page.locator("#plCorpo .panel", { hasText: "Plantões do mês" }).locator(".pllista li", { hasText: "Matutino" })).toHaveCount(1);
  await expect(page.locator("#plCorpo .pllista a").first()).toHaveAttribute("href", /T070000%2F\d{8}T130000/);
  expect(erros).toEqual([]);
});

test("Meus plantões: próximos plantões, noturno até 1h, sobreaviso e contagem à mão (plantão antigo)", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "plantoes");
  const dia = await page.evaluate(() => { const d = new Date(Date.now() + 864e5); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; });
  if (!(await page.locator(`#plCorpo [data-pldia="${dia}"]`).count())) await page.click('#plCorpo [data-plmes="1"]');
  await page.click(`#plCorpo [data-pldia="${dia}"]`);
  await page.selectOption("#plTurno", "M"); await page.check("#plSobre"); await page.click("#plAdd");
  await page.selectOption("#plTurno", "N1"); await page.click("#plAdd");
  await expect(page.locator("#plCorpo .plprox li")).toHaveCount(2);
  await expect(page.locator("#plCorpo .plprox")).toContainText("Sobreaviso · Matutino");
  await expect(page.locator("#plCorpo .plprox")).toContainText("Noturno até 1h (19:00–01:00)");
  // contagem à mão
  const n1 = page.locator("#plDia li", { hasText: "Noturno até 1h" });
  await n1.locator('[data-f="n"]').fill("11"); await n1.locator('[data-f="n"]').dispatchEvent("change");
  await expect(page.locator("#plCorpo .panel", { hasText: "Plantões do mês" })).toContainText("(à mão)");
  expect(erros).toEqual([]);
});

test("Meus plantões: tirar um plantão marcado à mão e um que entrou sozinho (e não volta)", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "pacientes"); await page.fill("#pcNome", "Paciente Tirar"); await page.click("#pcAdd");
  await aba(page, "pacientes"); await page.locator("#pcCorpo .pcitem", { hasText: "Paciente Tirar" }).locator('[data-pd="tipo"]').selectOption("alta");
  await aba(page, "plantoes");
  const mes = page.locator("#plCorpo .panel", { hasText: "Plantões do mês" });
  await expect(mes.locator(".pllista li")).toHaveCount(1);                 // entrou sozinho
  const dia = await mes.locator(".pllista li b").first().innerText();
  const iso = await page.evaluate((d) => { const [dd, mm] = d.split("/"); const y = new Date().getFullYear(); return `${y}-${mm}-${dd}`; }, dia);
  await page.click(`#plCorpo [data-pldia="${iso}"]`);
  await page.selectOption("#plTurno", "M"); await page.click("#plAdd");
  await expect(mes.locator(".pllista li")).toHaveCount(2);
  for (let k = 0; k < 2; k++) await page.locator("#plDia [data-pltira]").first().click();
  await expect(page.locator("#plCorpo .panel", { hasText: "Plantões do mês" }).locator(".pllista li")).toHaveCount(0);
  await aba(page, "inicio"); await aba(page, "plantoes");                  // reabrir: o automático não volta
  await expect(page.locator("#plCorpo .panel", { hasText: "Plantões do mês" }).locator(".pllista li")).toHaveCount(0);
  expect(erros).toEqual([]);
});


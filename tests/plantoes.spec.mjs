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
  await expect(page.locator("#plTurno option")).toHaveText([/Diurno/, /Matutino/, /Vespertino/, /^Noturno \(/, /Noturno até 1h/, /18 h \(7h à 1h\) \(07:00–01:00\)/, /18 h \(13h às 7h\) \(13:00–07:00\)/, /^24 h \(07/, /24 h \(17h às 17h\)/]);
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


test("Meus plantões: entrada e saída sugeridas pela lista e corrigíveis; horas, fichas, valor, R$/h, diurno × noturno e meta", async ({ page }) => {
  await page.addInitScript(() => {
    if (localStorage.getItem("teste_pl_horas")) return; localStorage.setItem("teste_pl_horas", "1");
    const d = new Date(); const em = (h, m) => new Date(d.getFullYear(), d.getMonth(), 10, h, m).getTime();
    const dia = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-10`;
    const p = (id, nome, ini, fim) => ({ id, nome, criado: ini, upd: fim, dia, cond: "gripe", et: { exame: { on: false, ok: false, txt: "" }, med: { on: false, ok: false }, reav: { t: null }, parecer: { on: false, ok: false, esp: "" } }, desf: { tipo: "alta", onde: "", t: fim }, sabe: false, snap: null });
    localStorage.setItem("mph_pacientes_v1", JSON.stringify({ pacs: [p("a", "Um", em(8, 12), em(9, 0)), p("b", "Dois", em(10, 30), em(12, 3))], cont: {}, apagados: {} }));
    // plantão antigo (sem horário) num outro dia: continua funcionando
    const m = { v: 4, updatedAt: 1 };   // como o app grava (modelo de versão 4)
    m.plantoes = { escala: [{ id: "antigo", data: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-05`, local: "hsls", turno: "N", manual: { n: 6, uti: 0 } }] };
    localStorage.setItem("rxp_model_v1", JSON.stringify(m));
  });
  const erros = await abrir(page);
  await aba(page, "plantoes");
  const mes = page.locator("#plCorpo .panel", { hasText: "Plantões do mês" });
  // sugerido pela lista: 08:10–12:05 (3h55), 2 fichas, R$ 100,00
  await expect(mes).toContainText("08:10–12:05 (3h55) · 2 fichas · R$ 100,00 · R$ 25,53/h");
  // plantão antigo, noturno do horário do turno (12 h), 6 fichas à mão
  await expect(mes).toContainText("19:00–07:00 (12h00) · 6 fichas · R$ 300,00 · R$ 25,00/h");
  await expect(page.locator("#plCorpo .plhoras")).toContainText("15h55");
  await expect(page.locator("#plCorpo .plhoras")).toContainText("Diurno: 3h55");
  await expect(page.locator("#plCorpo .plhoras")).toContainText("Noturno: 12h00");
  // corrigir a saída à mão
  const iso = await page.evaluate(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-10`; });
  await page.click(`#plCorpo [data-pldia="${iso}"]`);
  await expect(page.locator("#plDia .plorig")).toContainText("sugerido pela lista");
  await page.locator('#plDia [data-f="fim"]').fill("13:00"); await page.locator('#plDia [data-f="fim"]').dispatchEvent("change");
  await expect(mes).toContainText("08:10–13:00 (4h50) · 2 fichas · R$ 100,00 · R$ 20,69/h");
  await expect(page.locator("#plDia .plorig")).toContainText("à mão");
  // meta do mês: R$ 1.000 → faltam R$ 600
  await page.fill("#plMeta", "1000"); await page.dispatchEvent("#plMeta", "change");
  await expect(page.locator("#plCorpo .plmeta")).toContainText("Faltam R$ 600,00");
  // voltar à sugestão
  await page.click(`#plCorpo [data-pldia="${iso}"]`);
  await page.click("#plDia [data-plsug]");
  await expect(mes).toContainText("08:10–12:05 (3h55)");
  const m = JSON.parse(await page.evaluate(() => localStorage.getItem("rxp_model_v1")));
  expect(m.plantoes.meta).toBe(1000);
  expect(JSON.stringify(m)).not.toMatch(/"Um"|"Dois"/);      // nada do paciente nos padrões
  expect(erros).toEqual([]);
});

test("Plantão: iniciar e finalizar no Início guarda a hora real e o paciente conta nesse plantão", async ({ page }) => {
  const erros = await abrir(page);
  await expect(page.locator("#hPlBox select")).toHaveCount(0);          // sem caixa de seleção
  await page.click("#hPlIni");
  await expect(page.locator("#hPlBox [data-plt]")).toHaveCount(9);         // turnos como botões, inclusive 24 h das 17h
  await expect(page.locator('#hPlBox [data-plt="24B"]')).toContainText("17h–17h");
  await page.click('#hPlBox [data-plt="18A"]');
  await expect(page.locator("#hPlBox")).toContainText("Plantão em andamento");
  await expect(page.locator("#hPlTxt")).toContainText("18 h (7h à 1h) · desde");
  await aba(page, "pacientes");
  await page.fill("#pcNome", "Com Plantao"); await page.click("#pcAdd"); await aba(page, "pacientes");
  await page.locator("#pcCorpo .pcitem", { hasText: "Com Plantao" }).locator('[data-pd="tipo"]').selectOption("alta");
  await aba(page, "inicio");
  page.once("dialog", d => d.accept());
  await page.click("#hPlFim");
  await expect(page.locator("#hPlBox")).toContainText("Iniciar plantão");
  const m = JSON.parse(await page.evaluate(() => localStorage.getItem("rxp_model_v1")));
  const x = m.plantoes.escala.find(y => y.turno === "18A");
  expect(x.iniT).toBeGreaterThan(0); expect(x.fimT).toBeGreaterThanOrEqual(x.iniT); expect(x.ini).toMatch(/^\d\d:\d\d$/); expect(x.fim).toMatch(/^\d\d:\d\d$/);
  expect(m.plantoes.escala).toHaveLength(1);   // não cria outro plantão automático pelo relógio
  await aba(page, "plantoes");
  await expect(page.locator("#plCorpo .panel", { hasText: "Plantões do mês" })).toContainText("1 ficha");
  expect(erros).toEqual([]);
});

test("Plantão: paciente das 7h05 fica no noturno (folga de 2 h); outubro sem horas; contagem antiga intacta", async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 10, 4, 10, 0));
  await page.addInitScript(() => {
    if (localStorage.getItem("teste_pl_folga")) return; localStorage.setItem("teste_pl_folga", "1");
    const em = (d, h, m) => new Date(2026, 10, d, h, m).getTime();
    const p = (id, ini, fim) => ({ id, nome: id, criado: ini, upd: fim, dia: "2026-11-0" + new Date(ini).getDate(), cond: "gripe", et: { exame: { on: false, ok: false, txt: "" }, med: { on: false, ok: false }, reav: { t: null }, parecer: { on: false, ok: false, esp: "" } }, desf: { tipo: "alta", onde: "", t: fim }, sabe: false, snap: null });
    localStorage.setItem("mph_pacientes_v1", JSON.stringify({ pacs: [p("Noite", em(3, 23, 0), em(4, 0, 30)), p("Madrugada", em(4, 7, 5), em(4, 7, 40))], cont: {}, apagados: {} }));
    const m = { v: 4, updatedAt: 1 };
    m.plantoes = { escala: [{ id: "n3", data: "2026-11-03", local: "hsls", turno: "N", auto: true }, { id: "out", data: "2026-10-21", local: "hsls", turno: "D", manual: { n: 11, uti: 0 } }], contagem: { "2026-10-21D": { n: 11, uti: 0 } } };
    localStorage.setItem("rxp_model_v1", JSON.stringify(m));
  });
  const erros = await abrir(page);
  await aba(page, "plantoes");
  const mes = page.locator("#plCorpo .panel", { hasText: "Plantões do mês" });
  await expect(mes.locator(".pllista li")).toHaveCount(1);          // nenhum diurno do dia 4 criado pelo relógio
  await expect(mes).toContainText("2 fichas");
  await page.click('#plCorpo [data-plmes="-1"]');
  await expect(mes).toContainText("11 atendidos");
  await expect(mes).not.toContainText("/h");                         // outubro: sem horas nem R$/h
  await expect(page.locator("#plCorpo .plcard", { hasText: "Santa Lúcia" }).locator(".plv")).toContainText("550,00");
  expect(erros).toEqual([]);
});

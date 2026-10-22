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

test("ajuste renal do aciclovir separa herpes simples de zoster (lote 4)", async ({ page }) => {
  await abrir(page); await aba(page, "prescricoes");
  const abrirConduta = async (q, id, cr) => {
    await page.fill("#q", q); await page.click(`#list .item[data-id="${id}"] >> nth=0`);
    const pac = page.locator(".sec.pac");
    if (!(await pac.evaluate((e) => e.open))) await page.click(".sec.pac summary");
    for (const [sel, v] of [["#pcIdade", "80"], ["#pcPeso", "50"], ["#pcCr", cr]]) { await page.fill(sel, v); await page.dispatchEvent(sel, "change"); }
    return page.locator(".renal-adj");
  };
  let r = await abrirConduta("herpes simples", "herpes-simples", "5");   // ClCr ≈ 8
  await expect(r).toContainText("200 mg de 12/12h");
  await expect(r).not.toContainText("800 mg");
  r = await abrirConduta("herpes simples", "herpes-simples", "2.4");     // ClCr ≈ 17: sem ajuste do aciclovir
  await expect(r).not.toContainText("800 mg de 8/8h");
  r = await abrirConduta("zoster", "zoster", "2.4");
  await expect(r).toContainText("800 mg de 8/8h (ClCr 10–25)");
  await expect(r).not.toContainText("200 mg de 12/12h");
});

test("dipirona 1 g é o padrão e vale em todas as receitas; 500 mg continua possível; modelo antigo com 500 vira 1 g uma vez", async ({ page }) => {
  // modelo salvo antes da mudança, com a escolha antiga de 500 mg
  await page.addInitScript(() => { if (!sessionStorage.getItem("ok")) { localStorage.setItem("rxp_model_v1", JSON.stringify({ v: 4, exames: [], prefs: { dipirona: "500" }, updatedAt: 1 })); sessionStorage.setItem("ok", "1"); } });
  const erros = await abrir(page); await aba(page, "prescricoes");
  const ids = await page.evaluate(() => [...document.querySelectorAll("#list .item")].map((b) => b.dataset.id));
  const receita = (id) => page.evaluate((i) => { document.querySelector(`#list .item[data-id="${i}"]`).click(); return document.querySelector('#detail textarea[data-f="casa"]')?.value || ""; }, id);
  let comDipirona = 0;
  for (const id of [...new Set(ids)]) {
    const t = await receita(id);
    if (!/dipirona/i.test(t)) continue;
    comDipirona++;
    expect(t, id).not.toMatch(/Dipirona 500 ?mg/);
    expect(t, id).not.toMatch(/Dipirona 1g[^\n]*\n\s*Tomar (1 a )?2 cp/);
    expect(t, id).not.toMatch(/Dipirona 1g[\s\S]{0,200}?máx(imo|\.) 8 cp/);
  }
  expect(comDipirona).toBeGreaterThan(20);
  const tce = await receita("tce");
  expect(tce).toMatch(/Dipirona 1g -+ 5 cp\nTomar 1 cp VO de 6\/6h se dor de cabeça \(no máximo 4 cp por dia\)/);
  // quem escolhe 500 mg volta a ter 500 mg, e a escolha fica
  await aba(page, "modelos"); await page.click('[data-dip="500"]');
  await page.reload(); await aba(page, "prescricoes");
  expect(await receita("tce")).toMatch(/Dipirona 500mg -+ 10 cp\nTomar 2 cp VO/);
  expect(erros).toEqual([]);
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
  await page.locator("#detail details.sec.fichas > summary").click();
  await expect(page.locator(".sec.fichas [data-med]").first()).toBeVisible();
  expect(erros).toEqual([]);
});

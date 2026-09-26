import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

test("edição, favorito, organização, tema e preferências sobrevivem ao recarregar", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  const id = await page.$eval("#list .item", (e) => e.dataset.id);
  await page.fill('textarea.rx-edit[data-f="casa"]', "TEXTO DE TESTE PERSISTE");
  await page.dispatchEvent('textarea.rx-edit[data-f="casa"]', "input");
  await page.click("#sessSave");
  await page.click("#favBtn");
  await page.click("[data-org]");
  await page.fill('[data-nm="emerg"]', "Urgências");
  await page.click("#themeBtn");
  await page.waitForTimeout(600);
  await page.reload();
  await aba(page, "prescricoes");
  await page.click(`#list .item[data-id="${id}"] >> nth=0`);
  await expect(page.locator('textarea.rx-edit[data-f="casa"]')).toHaveValue("TEXTO DE TESTE PERSISTE");
  await expect(page.locator("#favBtn")).toHaveText("★");
  await expect(page.locator('#cats [data-c="emerg"]')).toHaveText("Urgências");
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");

  // backup: copiar e importar num navegador limpo
  await aba(page, "backup"); await page.click("#bkCopy");
  const bk = await page.evaluate(() => navigator.clipboard.readText());
  const j = JSON.parse(bk);
  expect(j.overrides[id]).toBeTruthy(); expect(j.uso.favs).toContain(id); expect(j.uso.rec).toContain("c:" + id); expect(j.model.org.cats.length).toBeGreaterThan(5);
  const limpo = await (await context.browser().newContext()).newPage();
  await abrir(limpo);
  await aba(limpo, "backup"); await limpo.fill("#bkIn", bk); await limpo.click("#bkImport");
  await aba(limpo, "prescricoes"); await limpo.click(`#list .item[data-id="${id}"] >> nth=0`);
  await expect(limpo.locator('textarea.rx-edit[data-f="casa"]')).toHaveValue("TEXTO DE TESTE PERSISTE");
  await expect(limpo.locator('#cats [data-c="emerg"]')).toHaveText("Urgências");
  expect(erros).toEqual([]);
});

test("organização: mover diagnóstico e reordenar categorias", async ({ page }) => {
  await abrir(page); await aba(page, "prescricoes");
  await page.click("[data-org]");
  await page.click('[data-cu="1"]');
  expect(await page.$$eval(".orgcat", (x) => x.slice(0, 2).map((e) => e.dataset.k))).toEqual(["cardio", "emerg"]);
  await page.click('[data-open="gi"]');
  const mid = await page.$eval('.orgcat[data-k="gi"] .orgit', (e) => e.dataset.id);
  await page.selectOption(`[data-mv="${mid}"]`, "resp");
  await aba(page, "prescricoes"); await page.click('[data-c="resp"]');
  await expect(page.locator(`#list .item[data-id="${mid}"]`)).toHaveCount(1);
  await page.click("[data-org]"); await page.click("#orgReset"); await page.click("#orgYes");
  expect(await page.$$eval(".orgcat", (x) => x[0].dataset.k)).toBe("emerg");
});

test("organização salva antes da v1.4 ganha as categorias novas e mantém o que o usuário mudou", async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem("semeado")) return;
    const cats = [["emerg", "Urgências", "red"], ["resp", "Respiratório", "sky"], ["orl", "Otorrino e olhos", "indigo"], ["gi", "Gastro", "green"], ["dor", "Dor e neuro", "amber"], ["pele", "Pele", "teal"], ["gu", "Gineco, uro e IST", "pink"], ["endo", "Endócrino", "orange"], ["psi", "Psiquiatria", "violet"], ["outros", "Outros", "slate"]].map(([k, nome, cor]) => ({ k, nome, cor }));
    localStorage.setItem("rxp_model_v1", JSON.stringify({ v: 3, updatedAt: 5, org: { cats, itemCat: { amigdalite: "gi" }, itemOrd: {} } }));
    sessionStorage.setItem("semeado", "1");
  });
  const erros = await abrir(page); await aba(page, "prescricoes");
  await expect(page.locator('#cats [data-c="emerg"]')).toHaveText("Urgências");          // nome do usuário fica
  await expect(page.locator('#cats [data-c="orl"]')).toHaveText("Otorrino / Oftalmo");   // nome antigo padrão é atualizado
  for (const k of ["cardio", "uro", "toxinf"]) await expect(page.locator(`#cats [data-c="${k}"]`)).toHaveCount(1);
  const ordem = await page.$$eval("#cats [data-c]", (b) => b.map((x) => x.dataset.c).filter(Boolean));
  expect(ordem[ordem.length - 1]).toBe("outros");
  await page.click('#cats [data-c="gi"]');
  await expect(page.locator('#list .item[data-id="amigdalite"]')).toHaveCount(1);         // mudança de lugar feita pelo usuário fica
  await page.click('#cats [data-c="cardio"]');
  await expect(page.locator('#list .item[data-id="sca"]')).toHaveCount(1);
  expect(erros).toEqual([]);
});

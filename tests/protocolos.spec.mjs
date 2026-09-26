import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

test("protocolos em fluxo: todos abrem, as decisões avançam e há fontes", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "protocolos");
  const ids = await page.$$eval("#prLista [data-pr]", (b) => b.map((x) => x.dataset.pr));
  expect(ids.length).toBeGreaterThanOrEqual(8);
  for (const id of ids) {
    await page.click(`#prLista [data-pr="${id}"]`);
    expect(await page.locator("#prFontes li").count(), id).toBeGreaterThan(0);
    // percorre o fluxo sempre pela primeira opção, até o fim (no máximo 30 passos)
    for (let i = 0; i < 30; i++) {
      const b = page.locator("#prPassos .prp.atual [data-ir]").first();
      if (!(await b.count())) break;
      await b.click();
    }
    await expect(page.locator("#prPassos .prp.atual")).toContainText("Fim do protocolo");
    expect(await page.locator("#tab-protocolos").innerText(), id).not.toMatch(RUIM);
    await page.click("#prReinicio");
    expect(await page.locator("#prPassos .prp").count(), id).toBe(1);
  }
  expect(erros).toEqual([]);
});

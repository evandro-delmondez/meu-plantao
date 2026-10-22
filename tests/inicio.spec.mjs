import { test, expect } from "@playwright/test";
import { abrir, aba, semRolagemLateral } from "./util.mjs";

test("Novo atendimento: busca de conduta como na lista (palavra-chave, CID), com a cor da área, e abre o Atendimento", async ({ page }) => {
  const erros = await abrir(page);
  await expect(page.locator("#naRes .item")).toHaveCount(0);           // sem busca, sem lista
  await page.fill("#naCond", "J03");
  await expect(page.locator('#naRes [data-naid="amigdalite"]')).toBeVisible();
  const cor = await page.locator('#naRes [data-naid="amigdalite"] .dot').evaluate((d) => getComputedStyle(d).backgroundColor);
  expect(cor).not.toBe("rgba(0, 0, 0, 0)");
  // grande área: Respiratório lista só condutas dessa área
  await page.fill("#naCond", "");
  await page.click('[data-nacat="resp"]');
  await expect(page.locator('#naRes [data-naid="pac"]')).toBeVisible();
  await expect(page.locator('#naRes [data-naid="amigdalite"]')).toHaveCount(0);
  await page.fill("#naNome", "Paciente Teste Início");
  await page.click('#naRes [data-naid="pac"]');
  await expect(page.locator("#tab-evolucao")).toBeVisible();
  await expect(page.locator("#atCorpo .atconds")).toContainText("Pneumonia");
  await expect(page.locator("#atNome")).toHaveValue("Paciente Teste Início");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("Onde estou hoje: só UPA pública (e o hospital, se houver pacote); preferência antiga 'particular' vira nenhuma", async ({ page }) => {
  await page.addInitScript(() => { if (!sessionStorage.getItem("ok")) { localStorage.setItem("rxp_ui_v1", JSON.stringify({ sel: "amigdalite", rede: "particular" })); sessionStorage.setItem("ok", "1"); } });
  const erros = await abrir(page);
  await expect(page.locator("[data-rede]:visible")).toHaveCount(1);
  await expect(page.locator('[data-rede="publica"]')).toHaveAttribute("aria-pressed", "false");
  expect(erros).toEqual([]);
});

test("Novo atendimento pela queixa: caminhos no topo do bloco; escolher um caminho sobe a tela e põe a conduta", async ({ page }) => {
  const erros = await abrir(page);
  await page.click('#hNovo [data-naq="tontura-sincope"]');
  await expect(page.locator("#tab-evolucao")).toBeVisible();
  const bloco = page.locator("#atCorpo .atqueixa");
  await expect(bloco).toHaveAttribute("open", "");
  // a primeira coisa do bloco são os caminhos
  expect(await bloco.locator(".atbody > *").first().textContent()).toBe("Caminhos");
  const cam = bloco.locator("[data-atcam]").first();
  const id = await cam.getAttribute("data-atcam");
  await page.evaluate(() => window.scrollTo(0, 600));
  await cam.click();
  await expect(page.locator("#evCond")).toHaveValue(id);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  expect(erros).toEqual([]);
});

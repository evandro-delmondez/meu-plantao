import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);

test("por queixa: alarme primeiro, caminhos abrem a conduta", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "queixas");
  const chips = page.locator("#qLista [data-q]");
  const n = await chips.count();
  expect(n).toBeGreaterThanOrEqual(6);
  for (let i = 0; i < n; i++) {
    await chips.nth(i).click();
    await expect(page.locator("#qCorpo .qalarme li").first()).toBeVisible();
    expect(await page.locator("#qCorpo").innerText()).not.toMatch(RUIM);
    expect(await semRolagemLateral(page)).toBe(true);
  }
  await chips.first().click();
  const cam = page.locator("#qCorpo [data-qc]").first();
  const alvo = await cam.getAttribute("data-qc");
  await cam.click();
  await expect(page.locator("#tab-prescricoes")).toBeVisible();
  expect(await page.evaluate(() => document.querySelector(`#list .item[aria-current="true"]`)?.dataset.id || "")).toBe(alvo);
  expect(erros).toEqual([]);
});

test("alta para o paciente: texto leigo, QR code com o link da página pública, sem dado do paciente", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  const sec = page.locator("#detail .altapac");
  await sec.locator("summary").click();
  await expect(sec.locator(".altavolte li").first()).toBeVisible();
  await page.click("#altaQr");
  await expect(page.locator("#qrSheet .qrimg svg")).toBeVisible();
  await page.locator("#qrSheet [data-fechar].btn").click();
  await expect(page.locator("#qrSheet")).toBeHidden();
  expect(erros).toEqual([]);
});

test("página pública da alta abre a orientação pelo endereço do QR", async ({ page }) => {
  await page.goto("http://localhost:4173/alta.html#amigdalite");
  await expect(page.locator("h1")).not.toHaveText("Orientação não encontrada");
  await expect(page.locator(".volte li").first()).toBeVisible();
  expect(await page.locator("main").innerText()).not.toMatch(RUIM);
  await page.goto("http://localhost:4173/alta.html#nao-existe");
  await expect(page.locator("h1")).toHaveText("Orientação não encontrada");
  // a página pública não carrega o painel nem nada do aparelho
  expect(readFileSync("dist/site/alta.html", "utf8")).not.toMatch(/localStorage|rxp_/);
});

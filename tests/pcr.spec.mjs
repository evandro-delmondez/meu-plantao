import { test, expect } from "@playwright/test";
import { aba, RUIM, PAINEL } from "./util.mjs";

test("PCR: cronômetro, ciclos de 2 min, adrenalina, choques, antiarrítmico e registro", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const erros = []; page.on("pageerror", (e) => erros.push(e.message));
  await page.clock.install({ time: new Date("2026-09-26T10:00:00") });
  await page.goto(PAINEL); await aba(page, "pcr");
  await page.click('[data-pcr="iniciar"]');
  await page.click('[data-pcr="choc"]');
  await expect(page.locator("#pcrMsg")).toContainText("Ritmo chocável");
  await page.click('[data-pcr="choque"]');
  await page.clock.fastForward("02:01");
  await expect(page.locator("#pcrCiclo")).toHaveText("Checar!");
  await expect(page.locator("#pcrCicloW")).toHaveClass(/alerta/);
  await page.click('[data-pcr="choque"]');               // 2º choque reinicia o ciclo
  await expect(page.locator("#pcrCicloW")).not.toHaveClass(/alerta/);
  await expect(page.locator("#pcrMsg")).toContainText("Após o 2º choque: adrenalina");
  await page.click('[data-pcr="adr"]');
  await page.clock.fastForward("03:01");
  await expect(page.locator("#pcrAdr")).toHaveClass("pronta");
  await page.clock.fastForward("02:30");
  await expect(page.locator("#pcrAdr")).toHaveClass("atrasada");
  await page.click('[data-pcr="choque"]');
  await expect(page.locator("#pcrMsg")).toContainText("amiodarona 300 mg");
  await page.click('[data-pcr="amio"]');
  await expect(page.locator("#pcrChq")).toHaveText("3");
  await expect(page.locator("#pcrTotal")).toHaveText(/^0[78]:[0-5]\d$/);
  await page.click('[data-pcr="rce"]');
  await expect(page.locator("#pcrMsg")).toContainText("Retorno da circulação espontânea");
  await page.click("#pcrCopiar");
  const txt = await page.evaluate(() => navigator.clipboard.readText());
  expect(txt).toMatch(/10:0\d:\d\d \(00:00\) Início da PCR/);
  expect(txt).toContain("Choque 3");
  expect(txt).toContain("Amiodarona 300 mg");
  expect(txt).toContain("Total: 3 choque(s), 1 dose(s) de adrenalina.");
  expect(txt).not.toMatch(RUIM);
  // nada da PCR fica salvo no aparelho
  expect(await page.evaluate(() => Object.values(localStorage).join(" "))).not.toContain("Choque 3");
  expect(erros).toEqual([]);
});

test("PCR: amiodarona e lidocaína têm contagem própria; adrenalina repetida a cada 3–5 min no não chocável", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(PAINEL); await aba(page, "pcr");
  await page.click('[data-pcr="iniciar"]'); await page.click('[data-pcr="naochoc"]');
  await expect(page.locator("#pcrMsg")).toContainText("o quanto antes");
  await page.click('[data-pcr="adr"]');
  await expect(page.locator("#pcrMsg")).toContainText("a cada 3–5 min");
  await page.click('[data-pcr="lido"]'); await page.click('[data-pcr="amio"]'); await page.click('[data-pcr="amio"]'); await page.click('[data-pcr="amio"]');
  await page.click("#pcrCopiar");
  const txt = await page.evaluate(() => navigator.clipboard.readText());
  expect(txt).toContain("Amiodarona 300 mg"); expect(txt).toContain("Amiodarona 150 mg");
  expect(txt.match(/Amiodarona/g).length).toBe(2);
});

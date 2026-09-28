import { test, expect } from "@playwright/test";
import { aba, RUIM, PAINEL } from "./util.mjs";

test("PCR: cronômetro, ciclos de 2 min, adrenalina, choques, antiarrítmico e registro", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const erros = []; page.on("pageerror", (e) => erros.push(e.message));
  await page.clock.install({ time: new Date("2026-09-26T10:00:00") });
  await page.goto(PAINEL); await aba(page, "pcr");
  await page.click('[data-pcr="iniciar"]');
  await page.click('[data-pcr="choc"]');
  await expect(page.locator("#pcrMsg")).toContainText("Choque (bifásico");
  await page.click('[data-pcr="choque"]');
  await page.clock.fastForward("02:15"); await page.clock.runFor(500);
  await expect.poll(async () => { await page.clock.runFor(200); return page.locator("#pcrCiclo").innerText(); }).toBe("Checar!");
  await expect.poll(async () => { await page.clock.runFor(200); return page.locator("#pcrCicloW").getAttribute("class"); }).toContain("alerta");
  await page.click('[data-pcr="choque"]');               // 2º choque reinicia o ciclo
  await expect(page.locator("#pcrCicloW")).not.toHaveClass(/alerta/);
  await expect(page.locator("#pcrMsg")).toContainText("agora (após o 2º choque)");
  await page.click('[data-pcr="adr"]');
  await page.clock.fastForward("06:00"); await page.clock.runFor(1000);
  await expect.poll(async () => { await page.clock.runFor(200); return page.locator("#pcrAdr").getAttribute("class"); }).toBe("atrasada");
  await page.click('[data-pcr="choque"]');
  await expect(page.locator("#pcrMsg")).toContainText("Amiodarona 300 mg");
  await page.click('[data-pcr="amio"]');
  await expect(page.locator("#pcrChq")).toHaveText("3");
  await expect.poll(async () => { await page.clock.runFor(200); const t = await page.locator("#pcrTotal").innerText(); return /^\d\d:\d\d$/.test(t) ? Number(t.slice(0, 2)) : -1; }).toBeGreaterThanOrEqual(5);
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
  await expect(page.locator("#pcrMsg")).toContainText("Adrenalina 1 mg EV/IO agora");
  await page.click('[data-pcr="adr"]');
  await expect(page.locator("#pcrMsg")).toContainText("a cada 3–5 min");
  await page.click('[data-pcr="lido"]'); await page.click('[data-pcr="amio"]'); await page.click('[data-pcr="amio"]'); await page.click('[data-pcr="amio"]');
  await page.click("#pcrCopiar");
  const txt = await page.evaluate(() => navigator.clipboard.readText());
  expect(txt).toContain("Amiodarona 300 mg"); expect(txt).toContain("Amiodarona 150 mg");
  expect(txt.match(/Amiodarona/g).length).toBe(2);
});

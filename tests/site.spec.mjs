import { test, expect } from "@playwright/test";

test("site: instala, funciona offline e guarda edições", async ({ page, context }) => {
  await page.goto("http://localhost:4173/");
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  await expect(page.locator("#syncTxt")).toHaveText("Salvo só neste aparelho");
  const m = await page.evaluate(async () => (await (await fetch("manifest.webmanifest")).json()).name);
  expect(m).toBe("Meu Plantão");
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  await page.fill('textarea.rx-edit[data-f="casa"]', "OFFLINE OK"); await page.dispatchEvent('textarea.rx-edit[data-f="casa"]', "input");
  await page.click("#sessSave");
  await page.reload(); await page.waitForTimeout(500);
  await context.setOffline(true);
  await page.reload();
  await page.evaluate(() => document.querySelector('.tabs [data-tab="prescricoes"]').click());
  await page.fill("#q", "amigdalite"); await page.click("#list .item >> nth=0");
  await expect(page.locator('textarea.rx-edit[data-f="casa"]')).toHaveValue("OFFLINE OK");
  await context.setOffline(false);
});

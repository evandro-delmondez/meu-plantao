// Aba "Meu hospital": material institucional privado, que só entra no painel do Claude via INST_FILE.
import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { abrir, aba, semRolagemLateral, PAINEL, COLEGAS } from "./util.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MARCA = "null/*__INST__*/";
// conteúdo fictício só para o teste (nenhum material real de hospital no repositório público)
const FICTICIO = { nome: "Hospital Exemplo", aviso: "Material de teste.", docs: [
  { id: "manual", titulo: "Manual de teste", sub: "v1", cor: "violet", html: "<h3>Regras</h3><p>Evoluir a cada duas horas.</p><table><tr><th>A</th><th>B</th></tr><tr><td>um</td><td>dois</td></tr></table>" },
  { id: "proto", titulo: "Protocolo de teste", sub: "v2", cor: "teal", html: "<ul><li>Esquema com antibiotico exemplo</li></ul>" },
] };
function painelComMaterial() {
  const html = readFileSync(join(root, "dist/claude/painel.html"), "utf8");
  if (!html.includes(MARCA)) throw new Error("rode o build sem INST_FILE antes dos testes");
  const dir = join(root, "test-results"); mkdirSync(dir, { recursive: true });
  const arq = join(dir, "painel-hospital.html");
  writeFileSync(arq, html.replace(MARCA, () => JSON.stringify(FICTICIO)));
  return pathToFileURL(arq).href;
}

test("sem material institucional, a aba não aparece no painel nem na cópia de colegas", async ({ page }) => {
  for (const url of [PAINEL, COLEGAS]) {
    const erros = await abrir(page, url + "#hospital");
    await expect(page.locator('#secnav [data-sec="inicio"]')).toHaveAttribute("aria-current", "page");
    await page.locator('#secnav [data-sec="condutas"]').click();
    await expect(page.locator('.tabs [data-tab="hospital"]')).toBeHidden();
    expect(erros).toEqual([]);
  }
});

test("com material institucional, a aba mostra, busca e destaca", async ({ page }) => {
  const erros = await abrir(page, painelComMaterial());
  await page.locator('#secnav [data-sec="condutas"]').click();
  await expect(page.locator('.tabs [data-tab="hospital"]')).toBeVisible();
  await aba(page, "hospital");
  await expect(page.locator("#hoAviso")).toContainText("Hospital Exemplo");
  await expect(page.locator("#hoDocs .ho-doc")).toHaveCount(2);
  await page.fill("#hoBusca", "antibiotico");
  await expect(page.locator("#hoDocs .ho-doc")).toHaveCount(1);
  await expect(page.locator("#hoDocs mark")).toHaveText("antibiotico");
  await page.fill("#hoBusca", "");
  await page.locator('#hoLista [data-ho="manual"]').click();
  await expect(page.locator("#ho-manual")).toHaveAttribute("open", "");
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("o site publicado nunca recebe o marcador preenchido", async () => {
  const site = readFileSync(join(root, "dist/site/index.html"), "utf8");
  expect(site).toContain(MARCA);
});

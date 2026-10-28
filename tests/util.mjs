import { pathToFileURL } from "node:url";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const PAINEL = pathToFileURL(join(root, "dist/claude/painel.html")).href;
export const COLEGAS = pathToFileURL(join(root, "dist/claude/colegas.html")).href;
export const RUIM = /\bundefined\b|\bNaN\b|\[object Object\]|Infinity/;

/** Abre o painel e registra erros de JavaScript da página. */
export async function abrir(page, url = PAINEL) {
  const erros = [];
  page.on("pageerror", (e) => erros.push(e.message));
  await page.goto(url);
  return erros;
}
export const aba = (page, nome) => page.evaluate((n) => document.querySelector(`.tabs [data-tab="${n}"]`).click(), nome);
export const semRolagemLateral = (page) => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth <= 1);
// abre uma seção pela barra ou, se estiver no menu "☰ Mais", pelo menu
export async function secao(page, sec) {
  if (await page.locator(`#secnav [data-sec="${sec}"][data-mais]`).count()) { await page.click("#maisBtn"); await page.click(`#maisMenu [data-maissec="${sec}"]`); }
  else await page.click(`#secnav [data-sec="${sec}"]`);
}


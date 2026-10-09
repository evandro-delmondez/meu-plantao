import { test, expect } from "@playwright/test";
import { abrir } from "./util.mjs";

const busca = async (page, q) => { await page.fill("#gq", q); return page.$$eval("#gres .gitem b", (b) => b.map((x) => x.textContent)); };

test("busca por início de palavra: siglas inteiras, sem casar pedaço de palavra", async ({ page }) => {
  const erros = await abrir(page);
  expect((await busca(page, "dor de dente")).join("|")).not.toMatch(/escorpi/i);   // "aci-dente"
  expect((await busca(page, "SCA"))[0]).toMatch(/coronariana|SCA/i);
  expect((await busca(page, "SCA")).join("|")).not.toMatch(/Escabiose/);
  expect((await busca(page, "ITU")).join("|")).not.toMatch(/Midazolam|Etomidato/);
  expect((await busca(page, "itu"))[0]).toMatch(/urin|ITU|cistite/i);
  expect((await busca(page, "amoxicilina")).join("|")).toMatch(/Amoxicilina/);
  expect((await busca(page, "cefaleia")).join("|")).toMatch(/Cefaleia/);
  const q = await page.$$eval("#gres .gsec h3", (h) => h.map((x) => x.textContent));
  expect(q.join("|")).toMatch(/Por queixa/);   // as páginas "Por queixa" entram na busca
  expect(erros).toEqual([]);
});

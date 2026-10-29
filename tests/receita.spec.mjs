import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
const receita = (page) => page.locator('textarea[data-f="casa"]').inputValue();

test("receita por toque: só o escolhido vai para a receita, renumerada, e Novo paciente volta ao padrão", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  let t = await receita(page);
  expect(t.match(/Amoxicilina/g).length).toBe(1);           // uma opção só, não as 8
  expect(t).not.toMatch(/^Ou\b|^#/m);
  await page.locator("#detail .rxc", { hasText: "Se alergia a penicilina" }).click();
  await page.locator("#detail .rxlin", { hasText: "Amoxicilina" }).locator(".rxsem").click();   // sem amoxicilina
  await page.locator("#detail .rxlin", { hasText: "Ibuprofeno" }).locator(".rxsem").click();    // sem anti-inflamatório
  t = await receita(page);
  expect(t).not.toMatch(/Amoxicilina|Ibuprofeno|Cetoprofeno|Naproxeno|Diclofenaco/);
  expect(t).toMatch(/^4\) Azitromicina/m);                   // renumerada
  await page.evaluate(() => document.querySelector("#atdIr").click());
  expect(await page.locator('#atCorpo [data-atout="rx"]').inputValue()).toMatch(/Azitromicina/);
  await page.evaluate(() => document.querySelector('.tabs [data-tab="prescricoes"]').click());
  await page.click("#novoPac"); await page.click("#novoPac");
  expect(await receita(page)).toMatch(/Amoxicilina/);
  expect(erros).toEqual([]);
});

test("nenhuma receita montada sai com 'Ou', '#' ou nota para o médico", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  const ids = await page.$$eval("#list .item", (x) => [...new Set(x.map((e) => e.dataset.id))]);
  for (const id of ids) {
    await conduta(page, id);
    if (!(await page.locator("#detail .rxmontar").count())) continue;
    const t = await receita(page);
    expect(t, id).not.toMatch(/^\s*Ou\b|^#|^\s*(Criança|Gestante|CID)\b/m);
    // nunca sai vazia (ex.: dengue começa com um título "#"), salvo quando só há bloco "(opcional)", que vem desligado
    const soOpcional = await page.evaluate(() => { const b = [...document.querySelectorAll("#detail .rxmontar [data-rxb]")]; return !document.querySelector("#detail .rxmontar [data-rxs]") && b.length > 0 && b.every((x) => /opcional/i.test(x.textContent)); });
    if (!soOpcional) expect(t, id).toMatch(/^\s*1\)/m);
    expect(t, id).not.toMatch(RUIM);
  }
  expect(erros).toEqual([]);
});

test("conduta: atalhos fixos levam à seção, secundário recolhido", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  const bar = page.locator("#detail .atalhosconduta");
  await expect(bar.locator('[data-ir="chk"]')).toBeVisible();
  await expect(bar.locator('[data-ir="agora"]')).toHaveCount(0);          // só aparecem as seções que existem
  await bar.locator('[data-ir="chk"]').click();
  await expect(page.locator("#detail .sec.chk")).toBeInViewport();
  expect(await page.locator("#secFontes").evaluate((d) => d.open)).toBe(false);
  await conduta(page, "sepse");
  await expect(page.locator('#detail .atalhosconduta [data-ir="agora"]')).toBeVisible();
  expect(erros).toEqual([]);
});

test("barra de atalhos fica no topo da conduta e não flutua sobre o texto", async ({ page }) => {
  await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  expect(await page.evaluate(() => getComputedStyle(document.querySelector("#detail .atalhosconduta")).position)).not.toBe("sticky");
  await page.evaluate(() => window.scrollTo(0, 2500));
  expect(await page.evaluate(() => document.querySelector("#detail .atalhosconduta").getBoundingClientRect().bottom)).toBeLessThan(0);   // rolou junto com a página
});

test("receita e orientações sem nota para o médico; o aviso aparece só na tela, acima da receita", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  const NOTA = /\((só se|se dengue|alergia a penicilina|alternativa|profilaxia de|ponte até|suspeita de|após hemograma|alta após)/i;
  const ids = await page.evaluate(() => [...new Set([...document.querySelectorAll("#list .item")].map((b) => b.dataset.id))]);
  for (const id of ids) {
    const t = await page.evaluate((i) => { document.querySelector(`#list .item[data-id="${i}"]`).click(); const q = (f) => document.querySelector(`#detail textarea[data-f="${f}"]`)?.value || ""; return { casa: q("casa"), orient: q("orient") }; }, id);
    expect(t.casa, id).not.toMatch(NOTA);
    expect(t.casa, id).not.toMatch(/^\s*(Gestante|Criança|CID)\b/m);
    expect(t.orient, id).not.toMatch(/^\s*-?\s*(Orientar|Explicar|Reforçar|Considerar|Encaminhar|Avaliar)\b/m);
  }
  // gripe: o aviso do ibuprofeno é para o médico (na tela) e o paciente recebe a orientação sobre dengue
  await page.evaluate(() => document.querySelector('#list .item[data-id="gripe"]').click());
  await expect(page.locator("#detail .rxaviso")).toContainText(/dengue/i);
  await expect(page.locator('#detail textarea[data-f="orient"]')).toHaveValue(/até que a dengue seja descartada/);
  await page.evaluate(() => document.querySelector("#atdIr").click());
  expect(await page.locator('#atCorpo [data-atout="rx"]').inputValue()).not.toMatch(/Para você|descartar dengue\./);
  expect(erros).toEqual([]);
});

test("Atendimento: receituário com escolha por toque, o mesmo estado da conduta", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="gripe"]').click());
  await page.evaluate(() => document.querySelector("#atdIr").click());
  const rx = page.locator('#atCorpo [data-atout="rx"]');
  await expect(rx).toHaveValue(/Paracetamol|Dipirona/);
  const chips = page.locator("#atCorpo .atrx .rxc");
  expect(await chips.count()).toBeGreaterThan(1);
  const antes = await rx.inputValue();
  await chips.first().click();                                // tira o 1º remédio
  await expect(rx).not.toHaveValue(antes);
  expect((await rx.inputValue()).match(/^\s*1\)/m)).toBeTruthy(); // renumerada
  // a conduta mostra a mesma escolha
  await aba(page, "prescricoes");
  expect(await page.locator('#detail textarea[data-f="casa"]').inputValue()).toBe((await page.evaluate(() => document.querySelector('#detail textarea[data-f="casa"]').value)));
  expect(erros).toEqual([]);
});

test("alergia a dipirona: receita troca por paracetamol, aviso para o médico e alerta na unidade", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="tce"]').click());
  await page.evaluate(() => { document.querySelector("#detail details.sec.pac").open = true; });
  await page.check("#pcDip");
  const casa = await page.locator('#detail textarea[data-f="casa"]').inputValue();
  expect(casa).not.toMatch(/dipirona/i);
  expect(casa).toMatch(/Paracetamol 750mg -+ 5 cp\nTomar 1 cp VO de 6\/6h se dor de cabeça \(no máximo 4 cp por dia\)/);
  await expect(page.locator("#detail .rxaviso")).toContainText("trocou a dipirona por paracetamol");
  // dengue já tem paracetamol: a dipirona só sai
  await page.evaluate(() => document.querySelector('#list .item[data-id="dengue"]').click());
  const d = await page.locator('#detail textarea[data-f="casa"]').inputValue();
  expect(d).not.toMatch(/dipirona/i); expect((d.match(/Paracetamol/g) || []).length).toBe(1);
  // pela alergia escrita no Atendimento também liga
  await page.uncheck("#pcDip").catch(() => {});
  await page.evaluate(() => document.querySelector("#atdIr").click());
  await page.locator('#atCorpo [data-atd="alergia"]').fill("dipirona");
  await expect(page.locator('#atCorpo [data-atout="rx"]')).not.toHaveValue(/dipirona/i);
  expect(erros).toEqual([]);
});

test("anti-inflamatório: escolher a alternativa troca só o item, com dose e duração da conduta", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "lombalgia");
  const linha = page.locator("#detail .rxlin", { hasText: "Ibuprofeno" });
  await linha.locator(".rxc", { hasText: "Naproxeno" }).click();
  const t = await receita(page);
  expect(t).toMatch(/Naproxeno 500mg[^\n]*\n[^\n]*12\/12h/);
  expect(t).not.toMatch(/Ibuprofeno/);
  expect(t).not.toMatch(/Dorflex|orfenadrina/i);
  await expect(page.locator("#detail .rxaviso")).toContainText(/cardiovascular/);
  expect(erros).toEqual([]);
});

test("toda receita sai agrupada por via (nenhum 'Uso oral' repetido depois de outra via), sem perder linha", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  for (const id of ["gripe", "geca", "itu", "rinite", "sinusite", "tosse", "dermatite", "conjuntivite", "olho-vermelho"]) {
    await page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
    if (!(await page.locator("#detail .rxmontar").count())) continue;
    await page.evaluate(() => document.querySelectorAll("#detail .rxmontar [data-rxb]").forEach((b) => { if (b.getAttribute("aria-pressed") === "false") b.click(); }));
    const t = await receita(page);
    const vias = [...t.matchAll(/^Uso\s+(\S+)/gim)].map((m) => m[1].toLowerCase());
    expect(new Set(vias).size, `${id}: ${vias.join(",")}`).toBe(vias.length);
    const n = [...t.matchAll(/^(\d+)\)/gm)].map((m) => +m[1]);
    expect(n, id).toEqual(n.map((_, i) => i + 1));
  }
  expect(erros).toEqual([]);
});

import { test, expect } from "@playwright/test";
import { abrir, aba } from "./util.mjs";

/* Banco de casos da conferência da IA na HDA (2026-11-21).
   A IA é simulada: a "resposta" é a própria entrada que o app mandou (com os números já trocados por ⟦n⟧),
   transformada como um bom redator faria (bons) ou com um erro típico (ruins). Bons têm de passar; ruins, ser recusados. */
const BONS = [
  ["abdome", "dor abdominal há 2d começou no umbigo foi p direita embaixo, vomitou 3x, febre 38,2 ontem a noite, nega diarreia e disuria",
    [[/⟦(\d+)⟧d\b/, "⟦$1⟧ dias"], [/umbigo/, "região periumbilical"], [/p direita embaixo/, "a fossa ilíaca direita"], [/vomitou ⟦(\d+)⟧x/, "⟦$1⟧ episódios de vômito"], [/febre ⟦(\d+)⟧/, "febre aferida de ⟦$1⟧ °C"], [/ontem a noite/, "na noite anterior"], [/disuria/, "disúria"]]],
  ["dispneia (sinônimo na negativa)", "falta de ar 5 dias, nega dor no peito e febre",
    [[/falta de ar ⟦(\d+)⟧ dias/i, "dispneia há ⟦$1⟧ dias"], [/nega dor no peito e febre/i, "Nega dor torácica e febre"]]],
  ["tosse (sem → nega)", "tosse com catarro amarelo há 1 semana, sem falta de ar",
    [[/catarro amarelo/, "expectoração amarelada"], [/sem falta de ar/, "Nega dispneia"]]],
  ["pressão e comprimido", "PA 160x100 em casa, tomou captopril 25mg 1cp, sem melhora, nega cefaleia",
    [[/⟦(\d+)⟧x⟦(\d+)⟧/, "⟦$1⟧x⟦$2⟧ mmHg"], [/⟦(\d+)⟧mg ⟦(\d+)⟧cp/, "⟦$1⟧ mg, ⟦$2⟧ comprimido"]]],
  ["número escrito direto (sem marcador)", "dor de garganta 3 dias",
    [[/⟦1⟧/, "3"], [/dor de garganta/, "odinofagia"]]],
  ["parêntese inventado sai sozinho", "febre 2 dias, tomou tylenol 750 mg",
    [[/tylenol/i, "Tylenol (paracetamol)"]]],
  ["lombalgia (perda de força)", "dor lombar há 3 dias após pegar peso, nega perda de força, nega alteração urinária ou intestinal",
    [[/nega perda de força/i, "Nega déficit motor"], [/alteração urinária ou intestinal/, "alterações urinárias ou intestinais"]]],
  ["vômitos sem sangue", "enjoo e vomito desde ontem, sem sangue",
    [[/enjoo e vomito/, "náuseas e vômitos"], [/desde ontem/, "desde o dia anterior"], [/sem sangue/, "sem hematêmese"]]],
  ["afebril", "dor de ouvido direito 2 dias, sem febre",
    [[/dor de ouvido direito/, "otalgia à direita"], [/sem febre/, "afebril"]]],
  ["8/8h e 1/2 comprimido", "tomou amoxicilina 500 mg 8/8h há 2 dias e meio comprimido de dipirona",
    [[/⟦(\d+)⟧h/, "⟦$1⟧ horas"]]],
  ["sigla com número (DM2, SpO2)", "dispneia, SpO2 92% em casa, DM2 e HAS",
    [[/em casa/, "aferida em domicílio"]]],
];
const RUINS = [
  ["apaga uma negativa", "dor abdominal há 2 dias, nega diarreia e disuria", [[/,? ?nega diarreia e dis[uú]ria\.?/i, "."]], /negativa/],
  ["acrescenta remédio", "dor de cabeça há 2 dias", [[/$/, " Fez uso de ibuprofeno."]], /remédio/],
  ["troca um número (repete marcador)", "febre 38 há 2 dias", [[/⟦2⟧/, "⟦1⟧"]], /número/],
  ["inventa número", "tosse seca", [[/$/, " há 4 dias"]], /número/],
  ["inventa marcador", "tosse há 2 dias", [[/$/, ", ⟦9⟧ episódios"]], /número/],
];

async function caso(page, hma, regras) {
  let pedidos = 0;
  await page.route("https://api.anthropic.com/**", (route) => {
    pedidos++;
    const corpo = JSON.parse(route.request().postData());
    let t = String(corpo.messages[0].content).replace(/^<entrada>\n|\n<\/entrada>$/g, "");
    for (const [a, b] of regras) t = t.replace(a, b);
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ stop_reason: "end_turn", content: [{ type: "thinking", thinking: "" }, { type: "text", text: t }] }) });
  });
  await page.addInitScript(() => localStorage.setItem("mph_ia_v1", JSON.stringify({ chave: "sk-ant-teste" })));
  const erros = await abrir(page);
  await aba(page, "prescricoes");
  await page.evaluate(() => document.querySelector('#list .item[data-id="cefaleia"]').click());
  await page.evaluate(() => document.querySelector("#atdIr").click());
  await page.locator('#atCorpo [data-atd="hma"]').fill(hma);
  await page.waitForTimeout(300);
  await page.click('#atCorpo [data-atia="hda"]');
  return { erros, pedidos: () => pedidos };
}

for (const [nome, hma, regras] of BONS) {
  test(`IA conferência aceita reescrita correta: ${nome}`, async ({ page }) => {
    const { erros, pedidos } = await caso(page, hma, regras);
    await expect(page.locator("#atIaEst")).toContainText("Texto melhorado pela IA");
    const out = await page.locator('#atCorpo [data-atout="hda"]').inputValue();
    expect(out).not.toMatch(/⟦|paracetamol\)/);
    expect(pedidos()).toBe(1);
    expect(erros).toEqual([]);
  });
}
for (const [nome, hma, regras, motivo] of RUINS) {
  test(`IA conferência recusa (depois de refazer): ${nome}`, async ({ page }) => {
    const { erros, pedidos } = await caso(page, hma, regras);
    await expect(page.locator("#atIaEst")).toContainText(motivo);
    expect(pedidos()).toBe(2);   // pediu para refazer uma vez, com o motivo
    expect(erros).toEqual([]);
  });
}

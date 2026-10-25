import { test, expect } from "@playwright/test";
import { abrir, aba, RUIM, semRolagemLateral } from "./util.mjs";

const conduta = (page, id) => page.evaluate((i) => document.querySelector(`#list .item[data-id="${i}"]`).click(), id);
// abre a conduta e vai para o Atendimento pelo botão da conduta
async function atender(page, id) { await aba(page, "prescricoes"); await conduta(page, id); await page.evaluate(() => document.querySelector("#atdIr").click()); await expect(page.locator("#tab-evolucao")).toBeVisible(); }
const campo = (page, k) => page.locator(`#atCorpo [data-atd="${k}"]`);
const saida = (page, k) => page.locator(`#atCorpo [data-atout="${k}"]`);

test("porta: alarmes no topo da conduta; Atendimento em 1 tela com cópia por campo, sem salvar dado do paciente", async ({ page }) => {
  const erros = await abrir(page); await aba(page, "prescricoes");
  await conduta(page, "amigdalite");
  await expect(page.locator("#detail details.sec.alarmetopo")).not.toHaveAttribute("open", "");   // recolhido: só a linha
  await page.evaluate(() => document.querySelectorAll("#detail details.sec").forEach((d) => { d.open = true; }));
  await expect(page.locator("#detail .sec.alarmetopo li").first()).toBeVisible();
  expect(await page.evaluate(() => { const a = document.querySelector("#detail .alarmetopo"), r = document.querySelector("#detail .sec.casa"); return !!(a.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING); })).toBe(true);
  await page.evaluate(() => document.querySelector("#atdIr").click());
  // checklist no próprio Atendimento: "Presença de …"
  await page.locator('#atCorpo [data-ck="hist0"][data-val="+"]').click();
  await campo(page, "hma").fill("dor de garganta há 2 dias");
  await campo(page, "tax").fill("38,2");
  await campo(page, "pa").fill("118x76");
  await expect(saida(page, "hda")).toHaveValue(/dor de garganta há 2 dias/);
  await expect(saida(page, "hda")).toHaveValue(/Presença de /);
  const ex = await saida(page, "exame").inputValue();
  expect(ex).toContain("Tax 38,2 °C");
  expect(ex).not.toMatch(/\bafebril\b/);          // exame não contradiz a febre informada
  expect(ex).toMatch(/^Cabeça e pescoço:/m); expect(ex).toMatch(/^Orofaringe:/m);   // amigdalite liga os dois, separados
  expect(ex).not.toMatch(/^Abdome:/m);            // sistema não ligado não sai
  await expect(saida(page, "diag")).toHaveValue(/^Amigdalite/);
  expect(await saida(page, "diag").inputValue()).not.toMatch(/Hipótese|CID/);       // o CID é escolhido em outra parte do prontuário
  await expect(saida(page, "trat")).toHaveValue(/^- Explico ao paciente o quadro clínico/);
  await expect(saida(page, "rx")).toHaveValue(/Amoxicilina|Dipirona/);
  await expect(page.locator("#atCorpo .cidbig")).toContainText("J03");
  await campo(page, "ap").fill("hipertensão arterial\ncolecistectomia em 2019");
  await campo(page, "muc").fill("- losartana 50 mg");
  await expect(saida(page, "hda")).toHaveValue(/HPP:\n- hipertensão arterial\n- colecistectomia em 2019\nMedicamentos em uso:\n- losartana 50 mg/);
  for (const k of ["hda", "exame", "diag", "trat", "rx", "alta"]) expect(await saida(page, k).inputValue()).not.toMatch(RUIM);
  // atestado
  await campo(page, "dias").fill("2");
  await expect(saida(page, "atest")).toHaveValue(/02 \(dois\) dias/);
  await campo(page, "tipo").selectOption("nenhum");
  await expect(page.locator("#atAtW")).toBeHidden();
  expect(await semRolagemLateral(page)).toBe(true);
  // nada do paciente fica no aparelho
  const ls = await page.evaluate(() => Object.values(localStorage).join(" "));
  expect(ls).not.toContain("dor de garganta há 2 dias");
  expect(ls).not.toContain("118x76");
  // Novo paciente (dois toques) limpa
  await page.locator("#atNovo").click();
  await expect(page.locator("#atNovo")).toContainText("Tocar de novo");
  await page.locator("#atNovo").click();
  await expect(campo(page, "hma")).toHaveValue("");
  await expect(saida(page, "hda")).not.toHaveValue(/dor de garganta há 2 dias/);
  expect(erros).toEqual([]);
});

test("Novo paciente no topo limpa o paciente em todas as abas", async ({ page }) => {
  const erros = await abrir(page);
  await aba(page, "calculadora"); await page.fill("#peso", "88"); await page.dispatchEvent("#peso", "input");
  await aba(page, "pediatria"); await page.fill("#pdPeso", "17"); await page.dispatchEvent("#pdPeso", "input");
  await aba(page, "bic"); await page.fill("#bicPeso", "90"); await page.dispatchEvent("#bicPeso", "input");
  await aba(page, "atestado"); await page.fill("#atCid", "A90"); await page.dispatchEvent("#atCid", "input");
  await aba(page, "evolucao"); await campo(page, "hma").fill("paciente anterior");
  await page.click("#novoPac"); await page.click("#novoPac");
  await expect(campo(page, "hma")).toHaveValue("");
  for (const [a, id] of [["calculadora", "#peso"], ["pediatria", "#pdPeso"], ["bic", "#bicPeso"], ["atestado", "#atCid"]]) {
    await aba(page, a); await expect(page.locator(id), id).toHaveValue("");
  }
  expect(erros).toEqual([]);
});

test("Atendimento não contradiz o paciente: febre, taquipneia, alergia e destino", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "amigdalite");
  await campo(page, "tax").fill("38,4"); await campo(page, "fr").fill("24");
  const hda = await saida(page, "hda").inputValue(), ex = await saida(page, "exame").inputValue();
  expect(hda).not.toMatch(/Nega febre|Nega outros sintomas/);
  expect(ex).toMatch(/taquipneic/); expect(ex).not.toMatch(/\beupneic/);
  expect(hda).toMatch(/Alergias: não informado/);
  expect(hda).toMatch(/HPP: não informado/);
  await expect(saida(page, "alta")).toHaveValue(/Alta com orientações/);
  // alergia marcada no checklist liga o alerta e entra na história
  const item = page.locator("#atCorpo .ck", { hasText: /alergia a penicilina/ }).first();
  await item.locator('[data-val="+"]').click();
  await expect(saida(page, "hda")).toHaveValue(/Alergias:\n- penicilina/);
  await expect(page.locator('#detail [data-perfil="pnc"]')).toHaveAttribute("aria-pressed", "true");
  // emergência: sem destino padrão
  await atender(page, "sepse");
  await expect(saida(page, "alta")).not.toHaveValue(/Alta com orientações/);
  expect(erros).toEqual([]);
});

test("alta em tópicos e pedido de internação com justificativa, sem repetir a prescrição", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "pac");
  await page.locator('#atCorpo [data-atchip="reav"][data-k="melhora"]').click();
  await campo(page, "reavTxt").fill("RX com consolidação em base direita");
  await campo(page, "compreende").check();
  const alta = await saida(page, "alta").inputValue();
  expect(alta).toMatch(/^- Paciente reavaliado, com melhora após a medicação na unidade: RX com consolidação/m);
  expect(alta).toMatch(/- Paciente orientado sobre o diagnóstico, a medicação prescrita/);
  expect(alta).toMatch(/- Oriento quanto aos sinais de alarme e à necessidade de retorno imediato em caso de piora: /);
  expect(alta).toMatch(/- Paciente compreendeu e concorda com as orientações\./);
  expect(alta).not.toMatch(/Prescrição domiciliar|Amoxicilina/);
  // tirar um sinal de alarme da lista
  const antes = alta.length;
  await page.locator('#atCorpo [data-atchip="volte"]').first().click();
  expect((await saida(page, "alta").inputValue()).length).toBeLessThan(antes);
  // internação
  await campo(page, "destino").selectOption("internacao");
  await campo(page, "intern.local").selectOption("uti");
  await campo(page, "intern.motivo").fill("SpO2 88% em ar ambiente e CURB-65 3");
  await page.locator('#atCorpo [data-atchip="obj"][data-k="atb"]').click();
  await campo(page, "intern.lab").fill("leucócitos 19.000");
  const int = await saida(page, "intern").inputValue();
  expect(int).toMatch(/^Solicito internação em UTI\.\n\n/);                        // um espaço entre os tópicos
  await campo(page, "hma").fill("tosse há 4 dias");
  await expect(saida(page, "hda")).toHaveValue(/^Paciente refere tosse há 4 dias\.[^\n]*\n\nHPP:/);   // e entre a HDA e os antecedentes
  expect(int).toMatch(/Justificativa: SpO2 88%/);
  expect(int).toMatch(/Objetivo da internação: antibioticoterapia EV\./);
  expect(int).toMatch(/Exames laboratoriais relevantes: leucócitos 19\.000/);
  await expect(page.locator("#atCorpo .atperg li")).toHaveCount(5);
  // editar um campo à mão não é sobrescrito; "Refazer" volta ao automático
  await saida(page, "diag").fill("texto meu"); await saida(page, "diag").dispatchEvent("input");
  await campo(page, "diag").fill("diferencial com TEP");
  await expect(saida(page, "diag")).toHaveValue("texto meu");
  await page.locator('#atCorpo [data-atre="diag"]').click();
  await expect(saida(page, "diag")).toHaveValue(/diferencial com TEP/);
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("exame físico direcionado: liga e desliga sistemas; modelo completo continua disponível", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "dor-abdominal");
  let ex = await saida(page, "exame").inputValue();
  expect(ex).toMatch(/^Abdome:/m); expect(ex).not.toMatch(/^Respiratório:/m);
  await page.locator('#atCorpo [data-atchip="sis"][data-k="resp"]').click();
  ex = await saida(page, "exame").inputValue();
  expect(ex).toMatch(/^Respiratório:/m);
  await page.locator('#atCorpo [data-atchip="sis"][data-k="abd"]').click();
  expect(await saida(page, "exame").inputValue()).not.toMatch(/^Abdome:/m);
  // sexo e perfil por botões: o texto do exame acompanha
  await page.click('#atCorpo [data-atseg="exSexo"][data-v="F"]');
  await expect(saida(page, "exame")).toHaveValue(/\bcorada\b/);
  await page.click('#atCorpo [data-atseg="exPerfil"][data-v="gest"]');
  await page.locator('#atCorpo [data-atchip="sis"][data-k="abd"]').click();
  await expect(saida(page, "exame")).toHaveValue(/Abdome: gravídico/);
  await page.click('#atCorpo [data-atseg="exPerfil"][data-v="ped"]');
  await expect(saida(page, "exame")).toHaveValue(/ativa e reativa/);
  // editar o exame à mão e depois ligar um sistema: o texto editado fica, e o aviso oferece refazer
  await saida(page, "exame").fill("texto meu do exame"); await saida(page, "exame").dispatchEvent("input");
  await page.locator('#atCorpo [data-atchip="sis"][data-k="pele"]').click();
  await expect(saida(page, "exame")).toHaveValue("texto meu do exame");
  await page.click('#atCorpo [data-atseg="exSexo"][data-v="M"]');
  await expect(saida(page, "exame")).toHaveValue("texto meu do exame");
  await expect(page.locator('#atCorpo [data-atman="exame"]')).toHaveClass(/atvelho/);
  await page.click('#atCorpo [data-atre="exame"]');
  await expect(saida(page, "exame")).toHaveValue(/^Pele:/m);
  expect(erros).toEqual([]);
});

test("não perde texto: recarregar mantém o atendimento na aba, redesenho da nuvem não tira o cursor, CID sem ponto", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "amigdalite");
  await expect(page.locator("#atCorpo .cidbig").first()).not.toContainText(".");
  await campo(page, "hma").fill("odinofagia há 3 dias");
  await saida(page, "hda").fill("HDA que eu redigi"); await saida(page, "hda").dispatchEvent("input");
  await campo(page, "ap").fill("asma leve");
  // recarregar a página (atualização, travou, F5): o atendimento volta
  await page.waitForTimeout(600);
  await page.reload(); await aba(page, "evolucao");
  await expect(campo(page, "hma")).toHaveValue("odinofagia há 3 dias");
  await expect(campo(page, "ap")).toHaveValue("asma leve");
  await expect(saida(page, "hda")).toHaveValue("HDA que eu redigi");
  // só na aba (sessionStorage), nunca no localStorage; Novo paciente apaga
  expect(await page.evaluate(() => Object.values(localStorage).join(" "))).not.toContain("odinofagia");
  await page.locator("#atNovo").click(); await page.locator("#atNovo").click();
  expect(await page.evaluate(() => sessionStorage.getItem("mph_atd_sessao"))).toBeNull();
  await page.reload(); await aba(page, "evolucao");
  await expect(campo(page, "hma")).toHaveValue("");
  expect(erros).toEqual([]);
});

test("mais de uma queixa: gripe + enxaqueca juntam diagnósticos, checklists, exame e receita sem repetir remédio", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "gripe");
  await page.fill("#atAddQ", "enxaq"); await page.click('#atAddSug [data-atadd="enxaqueca"]');
  await expect(page.locator("#atCorpo [data-atrem]")).toHaveText(/Enxaqueca/);
  const diag = await saida(page, "diag").inputValue();
  expect(diag).toMatch(/^Síndrome gripal[^\n]*\nEnxaqueca/);
  await expect(page.locator("#atCorpo .cidbig")).toHaveCount(2);
  // um checklist por conduta, cada um funcionando
  await expect(page.locator("#atCorpo #atChk1 .ck").first()).toBeVisible();
  await page.locator('#atCorpo #atChk1 [data-ck="hist0"][data-val="+"]').click();
  await expect(saida(page, "hda")).toHaveValue(/Presença de /);
  // exame: sistemas das duas (respiratório da gripe e neurológico da enxaqueca)
  const ex = await saida(page, "exame").inputValue();
  expect(ex).toMatch(/^Respiratório:/m); expect(ex).toMatch(/^Neurológico:/m);
  // receita: itens das duas, sem repetir o mesmo remédio, renumerados
  const rx = (await saida(page, "rx").inputValue()).split("Orientações:")[0];
  const nomes = [...rx.matchAll(/^\s*\d+\)\s*([A-Za-zÀ-ÿ-]+)/gm)].map((m) => m[1].toLowerCase());
  expect(nomes.length).toBeGreaterThan(1);
  expect(new Set(nomes).size).toBe(nomes.length);
  const nums = [...rx.matchAll(/^\s*(\d+)\)/gm)].map((m) => +m[1]);
  expect(nums).toEqual(nums.map((_, i) => i + 1));
  // tirar a adicional volta ao diagnóstico único
  await page.locator("#atCorpo [data-atrem]").click();
  await expect(saida(page, "diag")).toHaveValue(/^Síndrome gripal/);
  await expect(saida(page, "diag")).not.toHaveValue(/Enxaqueca/);
  expect(erros).toEqual([]);
});

test("Editar padrões: checklist, listas da alta, sistema do exame e na unidade viram padrão e continuam após recarregar", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "amigdalite");
  await page.click("#atEdita");
  const hist = page.locator('#atCorpo [data-edc="amigdalite|hist"]');
  await hist.fill((await hist.inputValue()) + "\nrouquidão (item do médico)");
  const reav = page.locator('#atCorpo [data-edl="reav"]');
  await reav.fill((await reav.inputValue()) + "\ncom exames laboratoriais sem alterações");
  await page.locator('#atCorpo [data-eds="oro"]').fill("Orofaringe: texto do médico.");
  const un = page.locator('#atCorpo [data-edt="amigdalite|unidade"]');
  await un.fill((await un.inputValue()) + "\n9) Remédio do médico 1 ampola IM.");
  await page.click("#atEdSalva");
  await expect(page.locator("#atEdita")).toBeVisible();
  await page.reload();
  await atender(page, "amigdalite");
  await expect(page.locator("#atCorpo .ck", { hasText: "rouquidão (item do médico)" })).toHaveCount(1);
  await expect(page.locator('#atCorpo [data-atchip="reav"]', { hasText: "com exames laboratoriais sem alterações" })).toHaveCount(1);
  await expect(saida(page, "exame")).toHaveValue(/Orofaringe: texto do médico\./);
  await expect(page.locator("#atCorpo .unlista")).toContainText("Remédio do médico 1 ampola IM.");
  const ls = await page.evaluate(() => localStorage.getItem("rxp_model_v1") + localStorage.getItem("rxp_overrides_v1"));
  expect(ls).toContain("rouquidão (item do médico)");
  expect(ls).toContain("Remédio do médico 1 ampola IM.");
  // voltar ao original
  await page.click("#atEdita");
  await page.locator('#atCorpo [data-edc="amigdalite|hist"]').locator("xpath=..").locator("[data-edorig]").click();
  await page.click("#atEdSalva");
  await expect(page.locator("#atCorpo .ck", { hasText: "rouquidão (item do médico)" })).toHaveCount(0);
  expect(erros).toEqual([]);
});

test("a nuvem dos padrões chega enquanto digita: o campo não perde o cursor nem o texto", async ({ page }) => {
  // nuvem ligada (repositório de mentira); a resposta do GitHub chega no meio da digitação, com padrões mais novos
  await page.addInitScript(() => localStorage.setItem("mph_nuvem_v1", JSON.stringify({ repo: "teste/plantao-modelos", chave: "x" })));
  let libera; const pronto = new Promise((r) => { libera = r; });
  await page.route("https://api.github.com/**", async (route) => {
    if (route.request().method() !== "GET") return route.fulfill({ status: 200, body: "{}" });
    await pronto;
    const d = { app: "meu-plantao", v: 1, overrides: {}, model: { updatedAt: Date.now() + 1e9 }, uso: {} };
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ sha: "a", content: Buffer.from(JSON.stringify(d)).toString("base64") }) });
  });
  const erros = await abrir(page);
  await atender(page, "amigdalite");
  await campo(page, "ap").click(); await page.keyboard.type("asma");
  const veio = page.waitForResponse((r) => r.url().includes("api.github.com") && r.request().method() === "GET");
  libera(); await veio; await page.waitForTimeout(150);
  await page.keyboard.type(" leve");
  await expect(campo(page, "ap")).toHaveValue("asma leve");
  expect(await page.evaluate(() => document.activeElement.dataset.atd)).toBe("ap");
  // ao sair do campo, redesenha com os padrões novos e mantém o que foi digitado
  await campo(page, "hma").click();
  await expect(campo(page, "ap")).toHaveValue("asma leve");
  expect(erros).toEqual([]);
});

test("barra de etapas: vazia, preenchida e copiada para o MV; editar depois de copiar pede copiar de novo", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "amigdalite");
  await page.evaluate(() => { navigator.clipboard.writeText = () => Promise.resolve(); });
  const etapa = (n) => page.locator(`#atEtapas [data-atir="${n}"]`);
  await expect(etapa(1)).toHaveAttribute("data-st", "");
  await expect(etapa(7)).toBeHidden();                         // internação só aparece se for internar
  await campo(page, "hma").fill("odinofagia há 2 dias");
  await expect(etapa(1)).toHaveAttribute("data-st", "meio");
  await page.click('#atCorpo [data-atcp="hda"]');
  await expect(etapa(1)).toHaveAttribute("data-st", "ok");
  await expect(page.locator('#atCorpo [data-atcopok="hda"]')).toBeVisible();
  await campo(page, "hma").fill("odinofagia há 3 dias");      // mudou depois de copiar
  await expect(etapa(1)).toHaveAttribute("data-st", "meio");
  await expect(page.locator('#atCorpo [data-atcopok="hda"]')).toBeHidden();
  await etapa(2).click();
  await expect(page.locator('#atCorpo [data-etapa="2"]')).toBeInViewport();
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("prontuário rápido: notas soltas viram HDA corrida, exame por exceção troca a linha do sistema, relógio com meta", async ({ page }, info) => {
  const erros = await abrir(page);
  await atender(page, "lombalgia");
  // barra na linha das abas do topo, que fica fixo em qualquer largura (meia tela inclusive)
  await expect(page.locator(".top .tabs #atEtapas")).toBeVisible();
  expect(await page.locator(".top").evaluate((e) => getComputedStyle(e).position)).toBe("sticky");
  await expect(page.locator("#atRelogio")).toBeVisible();
  await campo(page, "hma").fill("dor lombar 3d, piora ao levantar, irradia p/ MID, tomou dipirona s/ melhora, nega febre");
  await expect(saida(page, "hda")).toHaveValue(/^Paciente refere dor lombar há 3 dias, com piora ao levantar e irradiação para membro inferior direito\. Tomou dipirona sem melhora\. Nega febre/);
  await expect(page.locator("#atRelogio")).toBeVisible();
  await expect(page.locator("#atRelogio")).toHaveText(/⏱ 0:0\d/);
  // nota já redigida fica como está
  await campo(page, "hma").fill("Dor lombar há 3 dias. Sem trauma.");
  await expect(saida(page, "hda")).toHaveValue(/^Dor lombar há 3 dias\. Sem trauma\./);
  await campo(page, "exLivre").fill("abd: doloroso em FID\nmarcha antálgica\nR: estertores em base direita\nME: contratura paravertebral");
  const ex = await saida(page, "exame").inputValue();
  expect(ex).toMatch(/^Abdome: doloroso em FID\.$/m);
  expect(ex).not.toMatch(/Abdome: flácido/);
  expect(ex).toMatch(/^Marcha antálgica\.$/m);
  expect(ex).toMatch(/^Respiratório: estertores em base direita\.$/m);       // siglas curtas: R, ME…
  expect(ex).toMatch(/^Musculoesquelético: contratura paravertebral\.$/m);
  // relógio: passa da meta → vermelho; Novo paciente grava o tempo para a média
  await page.evaluate(() => { const t = Date.now() - 26 * 60000; document.querySelector('[data-atd="hma"]').dispatchEvent(new Event("input")); return t; });
  await page.locator("#atNovo").click(); await page.locator("#atNovo").click();
  expect(await page.evaluate(() => JSON.stringify(localStorage.getItem("mph_tempos_v1") || ""))).not.toContain("lombar");
  await aba(page, "pacientes"); await aba(page, "evolucao");
  await expect(page.locator(".atetapas")).toHaveCount(1);
  await aba(page, "inicio");
  await expect(page.locator(".atetapas")).toHaveCount(0);                   // sai do topo fora do Atendimento
  expect(await semRolagemLateral(page)).toBe(true);
  expect(erros).toEqual([]);
});

test("duas condutas: receita junta por via sem repetir remédio; nome da conduta fixo no trecho dela; exames como itens da conduta", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "gripe");
  await page.fill("#atAddQ", "amigdal"); await page.click('#atAddSug [data-atadd="amigdalite"]');
  const rx = await saida(page, "rx").inputValue();
  expect(rx.match(/^Uso oral$/gm)).toHaveLength(1);                         // um bloco só de uso oral
  expect(rx.match(/^Uso nasal$/gm)).toHaveLength(1);
  expect(rx.indexOf("Amoxicilina")).toBeLessThan(rx.indexOf("Uso nasal"));  // antibiótico oral junto do uso oral
  expect(rx.match(/Dipirona/g)).toHaveLength(1);
  const nums = [...rx.matchAll(/^(\d+)\)/gm)].map((m) => +m[1]);
  expect(nums).toEqual(nums.map((_, i) => i + 1));                          // numerada em sequência
  expect(await saida(page, "rx").inputValue()).not.toMatch(/\n\n\n/);
  await expect(page.locator("#atCorpo .atfixo")).not.toHaveCount(0);
  expect(await page.locator("#atCorpo .atfixo").first().evaluate((e) => getComputedStyle(e).position)).toBe("sticky");
  await expect(page.locator("#atCorpo .alarmetopo")).toHaveCount(0);       // sinais de alarme ficam no checklist e na alta
  // exames: "+ pedir" liga "Solicito exames laboratoriais" na conduta
  await page.evaluate(() => { const t = document.querySelector('#atCorpo [data-atd="exLab"]'); t.value = "hemograma"; t.dispatchEvent(new Event("input")); });
  await expect(saida(page, "trat")).toHaveValue(/- Solicito exames laboratoriais: hemograma\./);
  await expect(page.locator('#atCorpo [data-atchip="cond"][data-k="img"]')).toHaveAttribute("aria-pressed", "false");
  // CID: copiar volta ao tamanho normal (com o "copiar" pequeno)
  await page.evaluate(() => { navigator.clipboard.writeText = () => Promise.resolve(); });
  const cid = page.locator("#atCorpo .cidbig").first();
  await cid.click(); await expect(cid).toContainText("Copiado");
  await expect(cid.locator("span")).toHaveCount(1, { timeout: 3000 });
  expect(erros).toEqual([]);
});


test("meta do relógio editável (fica nos padrões), roteiro de fala na alta e etapa atual pintada", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "amigdalite");
  await campo(page, "hma").fill("odinofagia 2d");
  page.once("dialog", (d) => d.accept("30"));
  await page.click("#atRelogio");
  await expect(page.locator("#atRelogio")).toHaveAttribute("title", /Meta 30 min/);
  expect(JSON.parse(await page.evaluate(() => localStorage.getItem("rxp_model_v1"))).prefs.meta).toBe(30);
  const rot = page.locator("#atCorpo .atroteiro");
  await expect(rot).toContainText("O que você tem: amigdalite");
  await expect(rot).toContainText("O que tomar:");
  await expect(rot).toContainText("Volte se:");
  await page.locator('#atEtapas [data-atir="4"]').click();
  await expect(page.locator('#atEtapas [data-atir="4"]')).toHaveAttribute("aria-current", "");
  await expect(page.locator('#atCorpo [data-etapa="4"]')).toHaveClass(/atagora/);
  expect(erros).toEqual([]);
});

test("IA na HDA: sem chave orienta; com chave troca o texto (sem o nome), trava se mudar número, e desfaz", async ({ page }) => {
  let corpo = null, resposta = "Paciente refere dor de cabeça há 2 dias, sem melhora com dipirona.";
  await page.route("https://api.anthropic.com/**", async (route) => {
    corpo = JSON.parse(route.request().postData());
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ content: [{ type: "text", text: resposta }] }) });
  });
  const erros = await abrir(page);
  await atender(page, "cefaleia");
  await page.fill("#atNome", "Carla Teste"); await page.dispatchEvent("#atNome", "change");
  await campo(page, "hma").fill("dor de cabeca 2d, Carla tomou dipirona s/ melhora");
  await page.click("#atCorpo [data-atia]");
  await expect(page.locator("#atIaEst")).toContainText("Ligue a IA");
  await page.evaluate(() => localStorage.setItem("mph_ia_v1", JSON.stringify({ chave: "sk-ant-teste" })));
  await page.reload(); await page.evaluate(() => document.querySelector('.tabs [data-tab="evolucao"]').click());
  const antes = await page.locator('#atCorpo [data-atout="hda"]').inputValue();
  resposta = antes.replace(/^[^\n]*/, "Paciente refere dor de cabeça há 2 dias, sem melhora com dipirona.");
  await page.click("#atCorpo [data-atia]");
  await expect(page.locator("#atIaEst")).toContainText("Texto melhorado pela IA");
  expect(corpo.model).toBe("claude-haiku-4-5-20251001");
  expect(JSON.stringify(corpo.messages)).not.toContain("Carla");                 // o nome não sai do aparelho
  await expect(page.locator('#atCorpo [data-atout="hda"]')).toHaveValue(/^Paciente refere dor de cabeça há 2 dias, sem melhora com dipirona\./);
  await page.click("#atIaDesfaz");
  await expect(page.locator('#atCorpo [data-atout="hda"]')).toHaveValue(antes);
  // trava: número mudou → mantém o original
  resposta = antes.replace(/2/g, "3");
  await page.click("#atCorpo [data-atia]");
  await expect(page.locator("#atIaEst")).toContainText("mudou ou tirou um número");
  await expect(page.locator('#atCorpo [data-atout="hda"]')).toHaveValue(antes);
  expect(erros).toEqual([]);
});

test("estado geral por toque, sigla traz o normal para editar, relógio zera e começa no nome, receita por classe", async ({ page }) => {
  const erros = await abrir(page);
  await atender(page, "lombalgia");
  // estado geral: vem normal; toque marca o alterado
  await page.click('#atCorpo [data-ateg="regular"]');
  await page.click('#atCorpo [data-atchip="eg"][data-k="cor"]');
  await page.click('#atCorpo [data-atchip="eg"][data-k="hid"]');
  let ex = await saida(page, "exame").inputValue();
  expect(ex).toMatch(/^Regular estado geral, hipocorado, desidratado, acianótico/m);
  // "A:" traz o texto normal do abdome
  const exl = campo(page, "exLivre");
  await exl.click(); await page.keyboard.type("A:");
  await expect(exl).toHaveValue(/^A: flácido, ruídos hidroaéreos presentes/);
  // relógio: começa ao pôr o nome; 0 zera
  await page.fill("#atNome", "Paciente Relógio"); await page.dispatchEvent("#atNome", "change");
  await expect(page.locator("#atRelogio")).not.toHaveAttribute("data-nv", "parado");
  page.once("dialog", (d) => d.accept("0"));
  await page.click("#atRelogio");
  await expect(page.locator("#atRelogio")).toHaveText(/⏱ 0:0\d/);
  // receita por toque: uma linha por classe, com o nome da classe
  await expect(page.locator("#atCorpo .rxlin-c .rxcls", { hasText: "Anti-inflamatório" })).toHaveCount(1);
  await expect(page.locator("#atCorpo .rxlin-c .rxcls", { hasText: "Relaxante muscular" })).toHaveCount(1);
  // tocar na receita não tira o destaque da etapa em que você está
  await page.locator('#atEtapas [data-atir="5"]').click();
  await expect(page.locator('#atCorpo [data-etapa="5"]')).toHaveClass(/atagora/);
  await page.locator("#atCorpo .atrx .rxlin-c .chip.rxc").first().click();
  await expect(page.locator('#atCorpo [data-etapa="5"]')).toHaveClass(/atagora/);
  expect(erros).toEqual([]);
});

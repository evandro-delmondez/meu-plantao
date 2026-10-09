// Verificação de conteúdo: roda antes dos testes e no CI.
// Falha se algum item clínico estiver sem fonte, com CAPS LOCK, com campos inválidos
// ou se a revisão trimestral estiver vencida.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const erros = [], avisos = [];
const err = (m) => erros.push(m), warn = (m) => avisos.push(m);

// carrega os arquivos de dados num contexto isolado
const ctx = {};
vm.createContext(ctx);
const fontesDados = ["condutas.js", "regras.js", "pediatria.js", "extras.js", "checklists.js", "calculadora.js", "infusao.js", "protocolos.js", "eletrolitos.js", "agora.js", "queixas.js", "alta.js"]
  .map((f) => readFileSync(join(root, "src/data", f), "utf8").replace(/^if \(typeof module.*$/gm, "")).join("\n");
vm.runInContext(fontesDados + "\n;globalThis.__dados={BASE,CATS,SC,CHECK,CALC,INFUSAO,IOT_FONTES,PROTOCOLOS,ELETROLITOS,QT_RISCO,QT_FONTES,AGORA,QUEIXAS,ALTA};", ctx);
const { BASE, CATS, SC, CHECK, CALC, INFUSAO, IOT_FONTES, PROTOCOLOS, ELETROLITOS, QT_RISCO, QT_FONTES, AGORA, QUEIXAS, ALTA } = ctx.__dados;

const CAPS = /[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{12,}/;          // trecho longo em maiúsculas
const RUIM = /\bundefined\b|\bNaN\b|\[object Object\]/;
const textoDe = (o) => JSON.stringify(o).replace(/https?:\/\/[^"\s]+/g, "");  // URLs não contam

// ---------- condutas ----------
if (!Array.isArray(BASE) || BASE.length < 50) err("condutas: BASE não carregou");
const ids = new Set();
for (const it of BASE || []) {
  const onde = `conduta "${it.id}"`;
  if (ids.has(it.id)) err(`${onde}: id repetido`); ids.add(it.id);
  for (const k of ["id", "nome", "cat"]) if (!it[k]) err(`${onde}: falta "${k}"`);
  if (CATS && !CATS[it.cat]) err(`${onde}: categoria "${it.cat}" não existe`);
  if (!Array.isArray(it.fontes) || !it.fontes.length) err(`${onde}: sem fontes`);
  if (!it.casa && !it.unidade) err(`${onde}: sem prescrição (casa/unidade)`);
  const t = textoDe(it);
  if (CAPS.test(t)) err(`${onde}: trecho em CAPS LOCK → "${t.match(CAPS)[0]}"`);
  if (RUIM.test(t)) err(`${onde}: contém "${t.match(RUIM)[0]}"`);
}

// ---------- checklists ----------
const GRUPOS_CHK = ["hist", "ant", "ex", "alarme"];
for (const [id, c] of Object.entries(CHECK || {})) {
  const onde = `checklist "${id}"`;
  if (!ids.has(id)) err(`${onde}: não existe conduta com esse id`);
  if (!Array.isArray(c.fontes) || !c.fontes.length) err(`${onde}: sem fontes`);
  for (const k of Object.keys(c)) if (k !== "fontes" && !GRUPOS_CHK.includes(k)) err(`${onde}: grupo desconhecido "${k}"`);
  for (const g of GRUPOS_CHK) {
    if (!Array.isArray(c[g]) || !c[g].length) { err(`${onde}: grupo "${g}" vazio`); continue; }
    const vistos = new Set();
    for (const t of c[g]) {
      if (typeof t !== "string" || !t.trim()) err(`${onde}: item vazio em "${g}"`);
      else if (vistos.has(t)) err(`${onde}: item repetido em "${g}": ${t}`);
      vistos.add(t);
    }
  }
  const t = textoDe(c);
  if (CAPS.test(t)) err(`${onde}: trecho em CAPS LOCK → "${t.match(CAPS)[0]}"`);
  if (RUIM.test(t)) err(`${onde}: contém "${t.match(RUIM)[0]}"`);
}

// ---------- doses por peso ----------
let nDoses = 0;
for (const [modo, grupos] of Object.entries(CALC || {})) for (const g of grupos) {
  const onde = `doses por peso (${modo}) "${g.t}"`;
  if (!Array.isArray(g.src) || !g.src.length) err(`${onde}: sem fontes (src)`);
  for (const d of g.d || []) {
    nDoses++;
    if (!d.nome || !d.regra) err(`${onde}: item sem nome ou regra`);
    if (typeof d.perkg !== "function" && !(Array.isArray(d.perkg) && d.perkg.length === 2)) err(`${onde} → ${d.nome}: perkg inválido`);
    if (!(d.conc > 0)) err(`${onde} → ${d.nome}: concentração inválida`);
  }
  const t = textoDe(g);
  if (CAPS.test(t)) err(`${onde}: trecho em CAPS LOCK → "${t.match(CAPS)[0]}"`);
}
if (nDoses < 40) err(`doses por peso: só ${nDoses} itens carregados`);

// ---------- bomba de infusão ----------
const infIds = new Set();
for (const d of INFUSAO || []) {
  const onde = `bomba de infusão "${d.id}"`;
  if (infIds.has(d.id)) err(`${onde}: id repetido`); infIds.add(d.id);
  for (const k of ["nome", "grupo", "apres", "base", "un"]) if (!d[k]) err(`${onde}: falta "${k}"`);
  if (!Array.isArray(d.src) || !d.src.length) err(`${onde}: sem fontes`);
  if (!["mcg", "mg", "U"].includes(d.base) || !String(d.un).startsWith(d.base + "/")) err(`${onde}: unidade da dose (${d.un}) não bate com a base (${d.base})`);
  if (String(d.un).includes("/kg/") !== !!d.porKg) err(`${onde}: porKg não bate com a unidade ${d.un}`);
  if (String(d.un).endsWith("/min") !== !!d.porMin) err(`${onde}: porMin não bate com a unidade ${d.un}`);
  if (!Array.isArray(d.dil) || !d.dil.length) err(`${onde}: sem diluição`);
  for (const x of d.dil || []) if (!(x.qtd > 0 && x.vol > 0) || !x.rot) err(`${onde}: diluição inválida`);
  if (d.faixa && (!d.faixaTxt || !(d.faixa[0] > 0) || d.faixa[1] < d.faixa[0])) err(`${onde}: faixa inválida ou sem texto`);
  const t = textoDe(d);
  if (CAPS.test(t)) err(`${onde}: trecho em CAPS LOCK → "${t.match(CAPS)[0]}"`);
  if (RUIM.test(t)) err(`${onde}: contém "${t.match(RUIM)[0]}"`);
}
if (!Array.isArray(IOT_FONTES) || !IOT_FONTES.length) err("intubação: sem fontes");

// ---------- protocolos em fluxo ----------
const verTexto = (onde, o) => { const t = textoDe(o); if (CAPS.test(t)) err(`${onde}: trecho em CAPS LOCK → "${t.match(CAPS)[0]}"`); if (RUIM.test(t)) err(`${onde}: contém "${t.match(RUIM)[0]}"`); };
for (const p of PROTOCOLOS || []) {
  const onde = `protocolo "${p.id}"`;
  if (!p.titulo || !Array.isArray(p.passos) || !p.passos.length) err(`${onde}: sem título ou passos`);
  if (!Array.isArray(p.fontes) || !p.fontes.length) err(`${onde}: sem fontes`);
  if (p.conduta && !ids.has(p.conduta)) err(`${onde}: conduta "${p.conduta}" não existe`);
  const pids = new Set((p.passos || []).map((x) => x.id));
  if (pids.size !== (p.passos || []).length) err(`${onde}: id de passo repetido`);
  for (const x of p.passos || []) {
    if (!x.id || !x.t) err(`${onde}: passo sem id ou título`);
    for (const o of (x.decisao && x.decisao.opcoes) || []) if (!pids.has(o.ir)) err(`${onde} → ${x.id}: decisão aponta para passo inexistente "${o.ir}"`);
  }
  verTexto(onde, p);
}
// ---------- eletrólitos e QT ----------
for (const e of ELETROLITOS || []) {
  const onde = `eletrólito "${e.id}"`;
  if (!e.nome || !Array.isArray(e.fontes) || !e.fontes.length) err(`${onde}: sem nome ou fontes`);
  verTexto(onde, e);
}
if ((QT_RISCO || []).length && !(QT_FONTES || []).length) err("QT: lista sem fontes");
for (const q of QT_RISCO || []) { if (!q.nome || !Array.isArray(q.termos) || !q.termos.length || !q.risco) err(`QT "${q.nome}": campos incompletos`); verTexto(`QT "${q.nome}"`, q); }

// ---------- cartão "Agora" ----------
const UNS = new Set(["mg", "mcg", "g", "UI", "mL"]);
for (const [id, a] of Object.entries(AGORA || {})) {
  const onde = `cartão Agora "${id}"`;
  if (!ids.has(id)) err(`${onde}: conduta não existe`);
  if (!a.quando || !Array.isArray(a.etapas) || !a.etapas.length) err(`${onde}: sem "quando" ou etapas`);
  if (!Array.isArray(a.fontes) || !a.fontes.length) err(`${onde}: sem fontes`);
  for (const e of a.etapas || []) {
    if (!e.t || !Array.isArray(e.acoes) || !e.acoes.length) err(`${onde}: etapa sem título ou ações`);
    if ((e.acoes || []).length > 3) err(`${onde} → ${e.t}: mais de 3 ações (cartão enxuto; o resto vai em "mais")`);
    for (const x of e.acoes || []) {
      if (!x.txt) err(`${onde} → ${e.t}: ação sem texto`);
      else if (x.txt.length > 160) err(`${onde} → ${e.t}: ação longa (${x.txt.length} caracteres; mova detalhes para "mais")`);
      const d = x.dose; if (!d) continue;
      if (!d.ref) err(`${onde} → ${x.txt}: dose sem "ref"`);
      if (d.porKg != null && (!(d.porKg > 0) || !UNS.has(d.un))) err(`${onde} → ${x.txt}: porKg/un inválidos`);
      if (d.conc != null && !(d.conc > 0)) err(`${onde} → ${x.txt}: conc inválida`);
      if (d.metadeIdade != null && !(d.metadeIdade > 0 && d.faixas)) err(`${onde} → ${x.txt}: metadeIdade só com faixas`);
      if (d.max != null && !(d.max > 0)) err(`${onde} → ${x.txt}: max inválido`);
      if (d.faixas != null && (!Array.isArray(d.faixas) || !d.faixas.length || !UNS.has(d.un) || d.faixas.some((f, i) => !Array.isArray(f) || !(f[1] > 0) || (i < d.faixas.length - 1 ? !(f[0] > 0) : f[0] !== null)))) err(`${onde} → ${x.txt}: faixas inválidas (última com limite null)`);
    }
  }
  for (const s of a.atalhos || []) {
    if (s.protocolo && !(PROTOCOLOS || []).some((p) => p.id === s.protocolo)) err(`${onde}: protocolo "${s.protocolo}" não existe`);
    if (s.bic && !(INFUSAO || []).some((p) => p.id === s.bic)) err(`${onde}: bomba "${s.bic}" não existe`);
  }
  verTexto(onde, a);
}

// ---------- queixas (porta) ----------
const qids = new Set();
for (const q of QUEIXAS || []) {
  const onde = `queixa "${q.id}"`;
  if (!q.id || qids.has(q.id)) err(`${onde}: id vazio ou repetido`); qids.add(q.id);
  if (!q.nome || !Array.isArray(q.alarme) || !q.alarme.length) err(`${onde}: sem nome ou sinais de alarme`);
  for (const a of q.alarme || []) if (!a.t || !a.acao) err(`${onde}: sinal de alarme sem "t" ou "acao"`);
  for (const c of q.caminhos || []) { if (!c.rot) err(`${onde}: caminho sem rótulo`); if (c.conduta && !ids.has(c.conduta)) err(`${onde}: conduta "${c.conduta}" não existe`); }
  if (!Array.isArray(q.fontes) || !q.fontes.length) err(`${onde}: sem fontes`);
  verTexto(onde, q);
}
// ---------- alta em linguagem leiga ----------
for (const [id, a] of Object.entries(ALTA || {})) {
  const onde = `alta "${id}"`;
  if (!ids.has(id)) err(`${onde}: conduta não existe`);
  if (!a.titulo || !a.oque || !(a.cuidados || []).length || !(a.volte || []).length) err(`${onde}: falta título, "oque", cuidados ou "volte"`);
  if (!Array.isArray(a.fontes) || !a.fontes.length) err(`${onde}: sem fontes`);
  verTexto(onde, a);
}

// ---------- escores ----------
for (const s of SC || []) {
  if (!s.src) err(`escore "${s.id}": sem fonte`);
  if (typeof s.interp !== "function") err(`escore "${s.id}": sem interpretação`);
}

// ---------- medicações ----------
const CHAVES = ["id", "nome", "classe", "vias", "adulto", "pediatria", "diluicao", "gestacao", "contraindicacoes", "alertas", "fontes"];
const VIAS = new Set(["VO", "IM", "EV", "SC", "SL", "IN", "retal", "inalatória", "tópica", "IO"]);
const medDir = join(root, "src/data/medicacoes");
const medIds = new Set();
for (const f of readdirSync(medDir).filter((x) => x.endsWith(".json"))) {
  let arr;
  try { arr = JSON.parse(readFileSync(join(medDir, f), "utf8")); } catch (e) { err(`${f}: JSON inválido (${e.message})`); continue; }
  for (const m of arr) {
    const onde = `medicação "${m.id}" (${f})`;
    if (medIds.has(m.id)) err(`${onde}: id repetido`); medIds.add(m.id);
    for (const k of CHAVES) if (!(k in m)) err(`${onde}: falta "${k}"`);
    if (!/^[a-z0-9-]+$/.test(m.id || "")) err(`${onde}: id deve ter só minúsculas, números e hífen`);
    if (!Array.isArray(m.fontes) || !m.fontes.length) err(`${onde}: sem fontes`);
    for (const v of m.vias || []) if (!VIAS.has(v)) warn(`${onde}: via incomum "${v}"`);
    for (const c of m.ped_calc || []) {
      if (!(c.mgkg > 0)) err(`${onde}: ped_calc sem mg/kg válido`);
      if (c.max_mg != null && !(c.max_mg > 0)) err(`${onde}: ped_calc com máximo inválido`);
      if (c.mgkg > 100) warn(`${onde}: ped_calc ${c.mgkg} mg/kg — conferir`);
    }
    const t = textoDe(m);
    if (CAPS.test(t)) err(`${onde}: trecho em CAPS LOCK → "${t.match(CAPS)[0]}"`);
    if (RUIM.test(t)) err(`${onde}: contém "${t.match(RUIM)[0]}"`);
  }
}

// ---------- revisão trimestral ----------
try {
  const rev = readFileSync(join(root, "docs/REVISAO.md"), "utf8");
  const m = rev.match(/Próxima revisão:\s*(\d{4}-\d{2}-\d{2})/);
  if (!m) warn("docs/REVISAO.md: linha 'Próxima revisão: AAAA-MM-DD' não encontrada");
  else if (new Date(m[1]) < new Date()) warn(`Revisão trimestral vencida desde ${m[1]} — revisar o conteúdo (docs/REVISAO.md)`);
} catch { warn("docs/REVISAO.md não encontrado"); }

// ---------- resultado ----------
for (const a of avisos) console.log("aviso:", a);
if (erros.length) {
  for (const e of erros) console.error("erro:", e);
  console.error(`\n${erros.length} erro(s) de conteúdo.`);
  process.exit(1);
}
console.log(`conteúdo ok — ${BASE.length} condutas, ${Object.keys(CHECK || {}).length} checklists, ${medIds.size} medicações, ${(SC || []).length} escores${avisos.length ? `, ${avisos.length} aviso(s)` : ""}`);

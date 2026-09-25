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
const fontesDados = ["condutas.js", "regras.js", "pediatria.js", "extras.js"]
  .map((f) => readFileSync(join(root, "src/data", f), "utf8").replace(/^if \(typeof module.*$/gm, "")).join("\n");
vm.runInContext(fontesDados + "\n;globalThis.__dados={BASE,CATS,SC};", ctx);
const { BASE, CATS, SC } = ctx.__dados;

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
console.log(`conteúdo ok — ${BASE.length} condutas, ${medIds.size} medicações, ${(SC || []).length} escores${avisos.length ? `, ${avisos.length} aviso(s)` : ""}`);

// Aplica em src/data/condutas.js as revisões do texto do paciente (receita e orientações) e os avisos para o médico,
// a partir de arquivos JSON {"<id>": {casa?, orient?, avisoRx?}}. Confere antes que a receita não ganhou nem perdeu
// número (dose, intervalo, duração, quantidade) fora dos trechos tirados entre parênteses; se algo não bater, não grava.
// Uso: node scripts/aplicar-textos-paciente.mjs .rascunhos/receitas-pacientes-a.json [.rascunhos/receitas-pacientes-b.json]
import { readFileSync, writeFileSync } from "node:fs";
const ARQ = "src/data/condutas.js";
let src = readFileSync(ARQ, "utf8");
const i0 = src.indexOf("const BASE");
const BASE = new Function("return " + src.slice(src.indexOf("[", i0)).split(/\n(?:const|export|function)\s/)[0].replace(/;\s*$/, ""))();
const porId = Object.fromEntries(BASE.map((c) => [c.id, c]));
const patch = Object.assign({}, ...process.argv.slice(2).map((f) => JSON.parse(readFileSync(f, "utf8"))));
const nums = (t) => (String(t || "").match(/\d+(?:[.,]\d+)?/g) || []).sort();
const semPar = (t) => String(t || "").replace(/\([^)]*\)/g, " ");
const problemas = [];
for (const [id, p] of Object.entries(patch)) {
  const c = porId[id];
  if (!c) { problemas.push(`${id}: conduta não existe`); continue; }
  if (p.casa != null && p.modo === "acrescentar") {
    // modo acrescentar (alternativas novas): toda linha da receita antiga continua igual, exceto a da lavagem nasal
    const nova = new Set(p.casa.split("\n").map((l) => l.trim()));
    for (const l of String(c.casa).split("\n")) if (l.trim() && !nova.has(l.trim()) && !/lavagem|soro fisiol|narina|nasal/i.test(l)) problemas.push(`${id}: linha da receita sumiu ou mudou: ${l.trim().slice(0, 90)}`);
    if (!Array.isArray(p.fontes_novas) || !p.fontes_novas.length) problemas.push(`${id}: acrescentou remédio sem fonte (fontes_novas)`);
  } else if (p.casa != null) {
    // número que some fora dos parênteses só pode ter ido para o aviso ao médico (frase de nota tirada)
    const a = nums(semPar(c.casa)), b = nums(semPar(p.casa)), aviso = nums((p.avisoRx || c.avisoRx || []).join(" ")), sobra = [...b];
    for (const n of a) { const k = sobra.indexOf(n); if (k >= 0) { sobra.splice(k, 1); continue; } if (!aviso.includes(n)) problemas.push(`${id}: o número ${n} saiu da receita e não está no aviso ao médico`); }
    // número novo só se declarado no próprio patch (ex.: exemplo de cálculo para o paciente), e conferido
    for (const n of sobra) if (!(p.novosNumeros || []).includes(n)) problemas.push(`${id}: número novo na receita: ${n}`);
    const pa = nums(c.casa), pb = nums(p.casa), resto = [...pa];
    for (const n of pb) { const k = resto.indexOf(n); if (k < 0) { if (!(p.novosNumeros || []).includes(n)) problemas.push(`${id}: número novo na receita: ${n}`); } else resto.splice(k, 1); }
    // remédios: toda linha de item "N) Nome" continua com o mesmo nome
    const itens = (t) => [...String(t).matchAll(/^\s*\d+\)\s*([A-Za-zÀ-ÿ][\wÀ-ÿ-]*)/gm)].map((m) => m[1].toLowerCase()).sort().join("|");
    if (itens(c.casa) !== itens(p.casa)) problemas.push(`${id}: itens da receita mudaram\n   antes: ${itens(c.casa)}\n   depois: ${itens(p.casa)}`);
  }
  if (p.orient != null) {
    const a = nums(c.orient), b = nums(p.orient);
    for (const n of b) if (!a.includes(n)) problemas.push(`${id}: número novo nas orientações: ${n}`);
  }
  if (p.avisoRx != null && (!Array.isArray(p.avisoRx) || p.avisoRx.some((x) => typeof x !== "string" || x.length > 160))) problemas.push(`${id}: avisoRx inválido`);
}
if (problemas.length) { console.log(problemas.join("\n")); console.log(`\n${problemas.length} problema(s): nada foi gravado.`); process.exit(1); }
// grava: troca o valor do campo dentro do objeto da conduta (texto JSON) e acrescenta avisoRx depois de "casa"
const lit = (v) => JSON.stringify(v);
for (const [id, p] of Object.entries(patch)) {
  const ini = src.indexOf(`"id": ${lit(id)}`); if (ini < 0) throw new Error("id " + id);
  let fim = src.indexOf('\n  "id": ', ini + 5); fim = fim < 0 ? src.length : fim;
  let bloco = src.slice(ini, fim);
  for (const f of ["casa", "orient"]) if (p[f] != null) {
    const re = new RegExp(`("${f}": )"(?:[^"\\\\]|\\\\.)*"`);
    if (!re.test(bloco)) throw new Error(`${id}: campo ${f} não achado`);
    bloco = bloco.replace(re, (m, a) => a + lit(p[f]));
  }
  if (Array.isArray(p.fontes_novas) && p.fontes_novas.length) {
    const m = bloco.match(/"fontes": \[([\s\S]*?)\n  \]/);
    if (!m) throw new Error(`${id}: fontes não achadas`);
    const atuais = JSON.parse("[" + m[1] + "]"), novas = p.fontes_novas.filter((f) => !atuais.includes(f));
    // acrescenta no fim da lista, no mesmo formato (uma fonte por linha)
    if (novas.length) bloco = bloco.replace(m[0], m[0].replace(/\n  \]$/, novas.map((f) => ",\n   " + JSON.stringify(f)).join("") + "\n  ]"));
  }
  if (p.avisoRx && p.avisoRx.length) {
    bloco = bloco.replace(/\n\s*"avisoRx": \[[^\]]*\],?/, "");
    bloco = bloco.replace(/("casa": "(?:[^"\\]|\\.)*",)/, `$1\n  "avisoRx": ${lit(p.avisoRx)},`);
  }
  src = src.slice(0, ini) + bloco + src.slice(fim);
}
writeFileSync(ARQ, src);
console.log(`${Object.keys(patch).length} conduta(s) atualizada(s).`);

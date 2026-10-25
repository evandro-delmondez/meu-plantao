// Aplica nas fichas (src/data/medicacoes/*.json) o campo "receita" (posologias de receita domiciliar, adulto),
// juntando o rascunho do redator com as correções da conferência independente (casadas pelo rótulo).
// Uso: node scripts/aplicar-receita-fichas.mjs .rascunhos/receita-fichas.json .rascunhos/receita-fichas-conferencia.md
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const [rasc, conf] = process.argv.slice(2);
const R = JSON.parse(readFileSync(rasc, "utf8"));
const t = readFileSync(conf, "utf8"), i = t.lastIndexOf("```json"), C = JSON.parse(t.slice(i + 7, t.indexOf("```", i + 7)));
const PENDENTE = /levofloxacino 750|amoxicilina 875/i;   // apresentação ainda a confirmar na CMED
const final = {};
for (const id of Object.keys(R).filter((k) => !k.startsWith("_"))) {
  const lista = R[id].map((p) => ({ ...p }));
  for (const c of C[id] || []) { const k = lista.findIndex((p) => p.rotulo === c.rotulo); if (k >= 0) lista[k] = c; else lista.push(c); }
  final[id] = lista.filter((p) => !PENDENTE.test(p.nome)).map(({ nota, ...p }) => p);
}
const dir = "src/data/medicacoes"; let n = 0; const achados = new Set();
for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) {
  const arq = `${dir}/${f}`, d = JSON.parse(readFileSync(arq, "utf8")), lista = Array.isArray(d) ? d : d.itens || d.medicacoes;
  let mudou = false;
  for (const m of lista) if (final[m.id] && final[m.id].length) { m.receita = final[m.id]; achados.add(m.id); mudou = true; n++; }
  // dados da ficha apontados pela conferência
  for (const m of lista) {
    if (m.id === "dipirona" && !m.apresentacoes.some((a) => /1 g/.test(a))) { m.apresentacoes.splice(1, 0, "Comprimido 1 g"); mudou = true; }
    if (m.id === "ondansetrona" && !m.adulto.some((a) => /VO: 4–8 mg de 8\/8h/.test(a))) { m.adulto.push("VO: 4–8 mg de 8/8h se náuseas ou vômitos; máx. 24 mg/dia (bula)."); mudou = true; }
  }
  if (mudou) writeFileSync(arq, JSON.stringify(d, null, 1) + "\n");
}
const falta = Object.keys(final).filter((k) => !achados.has(k));
console.log(`${n} ficha(s) com receita.` + (falta.length ? ` Sem ficha: ${falta.join(", ")}` : ""));

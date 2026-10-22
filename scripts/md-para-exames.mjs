// Converte os arquivos conferidos (.rascunhos/exames-conferido-*.md) em src/data/exames.js.
// Cada item termina com [fonte curta; fonte curta]; a fonte curta é ligada à referência completa da seção.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const arqs = process.argv.slice(2);
const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[–—]/g, "-");
const QUEIXAS = ["cefaleia", "tontura-sincope", "dor-abdominal", "dor-toracica", "febre", "tosse-dispneia", "lombalgia", "dor-musculoesqueletica"];
const out = {}, problemas = [];
for (const a of arqs) {
  const queixas = /queixas/.test(a);
  const txt = readFileSync(a, "utf8");
  const secs = txt.split(/\n## /).slice(1);
  for (const s of secs) {
    const [cab, ...resto] = s.split("\n");
    const id = cab.trim().replace(/[`()]/g, "").split(/\s+/).pop();
    if (/^diverg|^removid|^refer/i.test(cab.trim())) continue;
    if (queixas ? !QUEIXAS.includes(id) : !/^[a-z0-9-]+$/.test(id)) { problemas.push("seção ignorada: " + cab); continue; }
    const chave = queixas ? "q:" + id : id;
    const corpo = resto.join("\n");
    const grupo = (nome) => { const m = corpo.match(new RegExp("### " + nome + "\\n([\\s\\S]*?)(?=\\n### |$)")); return m ? m[1].split("\n").filter((l) => /^- /.test(l)).map((l) => l.slice(2).trim()) : []; };
    const fontes = grupo("Fontes").length ? grupo("Fontes") : (corpo.match(/### Fontes\n([\s\S]*?)(?=\n### |\n## |$)/) || [, ""])[1].split("\n").filter((l) => /^\d+\.\s/.test(l)).map((l) => l.replace(/^\d+\.\s*/, "").trim());
    const ALIAS = { ms: "ministerio da saude", ssc: "surviving sepsis", cw: "choosing wisely", aao: "ophthalmology", ppp: "preferred practice", ahs: "headache society", aan: "academy of neurology", bts: "british thoracic", tg18: "tokyo", gvs: "vigilancia", ascp: "pathology", acep: "acep", "aao-hns": "otolaryngology", aafp: "family physicians", acp: "college of physicians", aua: "urological", eau: "eau" };
    const liga = (rot) => {
      const exp = norm(rot).split(/\s+/).map((t) => ALIAS[t] || t).join(" ");
      const achar = (toks) => fontes.findIndex((f) => toks.every((t) => norm(f).includes(t)));
      const tk = exp.replace(/[^a-z0-9 /&+-]/g, " ").split(/[\s/]+/).filter((x) => x && x !== "et" && x !== "al" && x !== "-");
      let k = achar(tk); if (k >= 0) return k;
      // ano pode diferir (edição citada × publicada): tenta sem o ano, se só uma fonte casar
      const sem = tk.filter((t) => !/^\d{4}$/.test(t)), cands = fontes.map((f, i) => sem.length && sem.every((t) => norm(f).includes(t)) ? i : -1).filter((i) => i >= 0);
      if (cands.length === 1) return cands[0];
      if (cands.length > 1) { const ano = tk.find((t) => /^\d{4}$/.test(t)); const c = cands.find((i) => ano && norm(fontes[i]).includes(String(+ano + 1))); if (c != null) return c; }
      // por pontos: o 1º termo (autor ou sociedade) tem que estar; vence a referência com mais termos e o ano
      { const SIN = { acep: ["acep", "emergency physicians"], eau: ["eau", "european association of urology"], "aao-hns": ["otolaryngol"], bts: ["bts", "british thoracic"], saem: ["saem", "grace-3"] };
        const r0 = norm(rot).split(/\s+/)[0], t0s = SIN[r0] || [tk[0]]; let best = -1, bs = -1;
        fontes.forEach((f, i) => { const nf = norm(f); if (!t0s.some((t) => nf.includes(t))) return; const sc = tk.filter((t) => nf.includes(t)).length + (tk.some((t) => /^\d{4}$/.test(t) && nf.includes(t)) ? 2 : 0); if (sc > bs) { bs = sc; best = i; } });
        if (best >= 0) return best; }
      const toks = norm(rot).replace(/[^a-z0-9 /&+-]/g, " ").split(/[\s/]+/).filter((x) => x && x !== "et" && x !== "al" && x !== "-");
      const i = fontes.findIndex((f) => toks.every((t) => norm(f).includes(t)));
      if (i < 0) { const j = fontes.findIndex((f) => toks.filter((t) => !/^\d{4}$/.test(t)).every((t) => norm(f).includes(t)) && toks.filter((t) => /^\d{4}$/.test(t)).some((t) => norm(f).includes(t))); return j; }
      return i;
    };
    const itens = (nome) => grupo(nome).map((l) => {
      const m0 = l.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
      if (!m0) { problemas.push(`${chave}: item sem fonte: ${l.slice(0, 60)}`); return null; }
      // item com duas versões: as fontes do meio viram parênteses no texto e entram todas na lista
      const rotulos = [...l.matchAll(/\[([^\]]+)\]/g)].map((x) => x[1]).join("; ");
      const m = [null, m0[1].replace(/\s*\[([^\]]+)\]/g, " ($1)"), rotulos];
      const f = [...new Set(m[2].split(/;\s*/).map((r) => { const i = liga(r); if (i < 0) problemas.push(`${chave}: fonte "${r}" não achada`); return i + 1; }).filter((x) => x > 0))];
      if (m[1].length > 200) problemas.push(`${chave}: item com ${m[1].length} caracteres: ${m[1].slice(0, 50)}`);
      return { t: m[1].replace(/\s*\(corrigido[^)]*\)\s*/gi, " ").replace(/ver divergências/gi, "ver Divergências").replace(/\s+/g, " ").trim(), f };
    }).filter(Boolean);
    for (let i = 0; i < fontes.length; i++) fontes[i] = fontes[i].replace(/\s*\(corrigido[^)]*\)/gi, "");
    out[chave] = { encaminhar: itens("Encaminhar"), pedir: itens("Pedir quando"), naoPedir: itens("Não pedir"), div: itens("Divergências"), fontes };
  }
}
const js = `// Exames e encaminhamento na porta (adulto): por queixa ("q:<id da queixa>") e por conduta ("<id da conduta>").
// Cada item: {t: texto curto (≤ 200 caracteres), f: [números das fontes, contando de 1]}.
// Grupos: encaminhar (o que muda o destino), pedir (quando o exame muda a conduta), naoPedir (o que não acrescenta).
// Divergência entre fontes boas: as duas versões no mesmo item, cada uma com a sua fonte; o médico decide.
// Gerado de .rascunhos/exames-conferido-*.md (conferência independente, 2026-10-22).
const EXAMES = ${JSON.stringify(out, null, 1)};
if (typeof module!=="undefined") module.exports={EXAMES};
`;
writeFileSync("src/data/exames.js", js);
console.log(Object.keys(out).length + " chaves; " + Object.values(out).reduce((n, e) => n + e.encaminhar.length + e.pedir.length + e.naoPedir.length + e.div.length, 0) + " itens");
console.log(problemas.join("\n"));

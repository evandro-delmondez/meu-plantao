// Gera as três versões do Meu Plantão a partir de src/:
//   dist/site/            site independente (PWA, offline) — publicado no GitHub Pages
//   dist/claude/painel.html   painel no Claude (sincroniza pela nuvem do artefato)
//   dist/claude/colegas.html  cópia para colegas (salva só no aparelho)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const r = (p) => readFileSync(join(root, p), "utf8");
const pkg = JSON.parse(r("package.json"));

// ---------- dados ----------
const stripModule = (t) => t.replace(/^if \(typeof module.*$/gm, "");
const MED_ORDER = ["analgesicos", "gastro", "antibioticos", "corticoides", "vasoativos", "sedacao", "anticonvulsivantes", "antiarritmicos", "anticoagulantes", "eletrolitos-ev", "psiquiatria"];
const medDir = join(root, "src/data/medicacoes");
const grpIdx = (f) => { const i = MED_ORDER.indexOf(f.replace(".json", "")); return i < 0 ? 99 : i; };
const medFiles = readdirSync(medDir).filter((f) => f.endsWith(".json")).sort((a, b) => grpIdx(a) - grpIdx(b) || a.localeCompare(b));
const meds = medFiles.flatMap((f) => JSON.parse(readFileSync(join(medDir, f), "utf8")).map((m) => ({ ...m, grupo: f.replace(".json", "") })));

const data = [
  stripModule(r("src/data/condutas.js")),
  stripModule(r("src/data/regras.js")),
  stripModule(r("src/data/pediatria.js")),
  stripModule(r("src/data/extras.js")),
  stripModule(r("src/data/checklists.js")),
  stripModule(r("src/data/calculadora.js")),
  stripModule(r("src/data/infusao.js")),
  stripModule(r("src/data/protocolos.js")),
  stripModule(r("src/data/eletrolitos.js")),
  stripModule(r("src/data/agora.js")),
  stripModule(r("src/data/queixas.js")),
  stripModule(r("src/data/alta.js")),
  "const MEDS=" + JSON.stringify(meds) + ";",
  `const APP_VERSION=${JSON.stringify(pkg.version)};`,
].join("\n");

// ---------- página base ----------
const jsDir = join(root, "src/js");
// biblioteca de QR code (qrcode-generator, MIT, Kazuhiko Arase), sem rede
const qrLib = readFileSync(join(root, "node_modules/qrcode-generator/dist/qrcode.js"), "utf8").replace(/\(function \(factory\)[\s\S]*$/, "");
const js = "/* ===== qrcode-generator 2.0.4 (MIT) ===== */\n" + qrLib + "\n" + readdirSync(jsDir).filter((f) => f.endsWith(".js")).sort()
  .map((f) => `/* ===== ${f} ===== */\n` + readFileSync(join(jsDir, f), "utf8")).join("\n");
let page = r("src/index.html")
  .replace("/*__CSS__*/", () => r("src/styles.css"))
  .replace("/*__DATA__*/", () => data)
  .replace("/*__JS__*/", () => js);
const icon = r("public/icon.svg").trim();
const logo = icon.replace("<svg ", '<svg class="logo" aria-hidden="true" ').replace('id="g"', 'id="lg"').replace("url(#g)", "url(#lg)");
page = page.replace('<span class="rx" aria-hidden="true">℞</span>', logo);

// ---------- sintaxe: um erro aqui derruba o painel inteiro, então o build falha logo ----------
for (const [, code] of page.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  try { new Function(code); } catch (e) {
    const tmp = join(root, "dist-erro.tmp.js"); writeFileSync(tmp, code);
    throw new Error(`Erro de sintaxe no JavaScript montado: ${e.message}. Rode: node --check ${tmp}`);
  }
}

// ---------- versão com nuvem (painel no Claude) ----------
const CLOUD = 'try{ db=window.claude&&window.claude.use?await window.claude.use("db"):null }catch(e){db=null}';
const NOTE = "Suas edições e prescrições novas ficam salvas na nuvem deste painel e também neste aparelho. Para ter uma cópia extra, copie o backup e guarde (Notion, e-mail para si mesmo).";
if (!page.includes(CLOUD) || !page.includes(NOTE)) throw new Error("Marcadores de nuvem não encontrados em src/app.html");

// ---------- versão local (colegas e site) ----------
const local = page
  .replace(CLOUD, "db=null; /* sem nuvem compartilhada */")
  .replace(NOTE, "Suas edições, modelos e favoritos ficam salvos só neste aparelho e neste navegador (ninguém mais vê). Para levar para outro aparelho ou ter uma cópia de segurança, copie o backup e guarde (Notion, e-mail para si mesmo).");

const head = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#2F54EB">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Meu Plantão">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="icon" href="icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="icon-192.png">
`;
const tail = `
<script>
if("serviceWorker" in navigator && (location.protocol==="https:"||location.hostname==="localhost")){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}
</script>
</html>
`;
const site = head + local + tail;

// ---------- escrita ----------
const dist = join(root, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "site"), { recursive: true });
mkdirSync(join(dist, "claude"), { recursive: true });
writeFileSync(join(dist, "claude/painel.html"), page);
writeFileSync(join(dist, "claude/colegas.html"), local);
writeFileSync(join(dist, "site/index.html"), site);
// página pública da alta (aberta pelo QR code no celular do paciente): só a orientação, nenhum dado do paciente
const altaData = stripModule(r("src/data/alta.js"));
writeFileSync(join(dist, "site/alta.html"), r("src/alta.html").replace("/*__ALTA__*/", () => altaData));
const hash = createHash("sha256").update(site).digest("hex").slice(0, 10);
for (const f of readdirSync(join(root, "public"))) {
  if (f === "sw.js") writeFileSync(join(dist, "site/sw.js"), r("public/sw.js").replace("__CACHE__", `meu-plantao-${pkg.version}-${hash}`));
  else copyFileSync(join(root, "public", f), join(dist, "site", f));
}
console.log(`build ok — v${pkg.version} (${hash}) · ${meds.length} medicações · ${(page.length / 1024).toFixed(0)} KB`);

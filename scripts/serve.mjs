// Servidor estático mínimo para testar o site (dist/site) em http://localhost:4173
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "dist", "site");
const port = Number(process.env.PORT || 4173);
const tipos = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json", ".json": "application/json" };
createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  try {
    const body = await readFile(join(dir, p.replace(/\.\.+/g, "")));
    res.writeHead(200, { "content-type": tipos[extname(p)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end("não encontrado"); }
}).listen(port, () => console.log(`Meu Plantão em http://localhost:${port}`));

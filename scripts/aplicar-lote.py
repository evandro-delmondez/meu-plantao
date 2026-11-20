#!/usr/bin/env python3
"""Aplica um lote conferido (.rascunhos/.../loteX-final.json) aos arquivos de src/.
Formato do lote: {condutas:{id:obj}, checklist:{id:{hist,ant,ex,alarme,fontes}}, alta:{id:obj},
extras_ALTA_ITEM:{id:[..]}, exames:{id:obj}, escores:[obj com interp em texto "s=>..."], sc_cond:{id:[ids]},
queixas:{id:[{queixa,tipo:"caminho",rot,conduta}]}}.
Uso: python3 scripts/aplicar-lote.py caminho/lote-final.json   (roda da raiz do repositório)"""
import json, re, sys

J = lambda x: json.dumps(x, ensure_ascii=False)
L = json.load(open(sys.argv[1]))
nao = []

def ler(p): return open(p, encoding="utf8").read()
def gravar(p, s): open(p, "w", encoding="utf8").write(s)

# condutas: no fim de BASE
p = "src/data/condutas.js"; s = ler(p)
ordem = ["id", "nome", "cat", "cid", "sin", "casa", "avisoRx", "unidade", "orient", "rev", "fontes"]
fim = s.index("\n }\n];") + 3
for cid, o in (L.get("condutas") or {}).items():
    if f'"id": "{cid}",' in s: nao.append("conduta já existe: " + cid); continue
    o = {**{k: o[k] for k in ordem if k in o}, **{k: v for k, v in o.items() if k not in ordem}}
    ser = "\n".join(" " + l for l in json.dumps(o, ensure_ascii=False, indent=1).split("\n"))
    s = s[:fim] + ",\n" + ser + s[fim:]; fim = s.index("\n }\n];") + 3
gravar(p, s)

# checklists: antes do fim do CHECK
p = "src/data/checklists.js"; s = ler(p)
for cid, c in (L.get("checklist") or {}).items():
    if re.search(r'\n"?%s"?:\{' % re.escape(cid), s): nao.append("checklist já existe: " + cid); continue
    k = cid if re.match(r"^[a-z]\w*$", cid) else J(cid)
    blk = f'\n{k}:{{\n hist:{J(c["hist"])},\n ant:{J(c["ant"])},\n ex:{J(c["ex"])},\n alarme:{J(c["alarme"])},\n fontes:{J(c.get("fontes", []))}\n}},'
    i = s.rindex("\n};"); antes = s[:i].rstrip()
    if not antes.endswith(","): antes += ","
    s = antes + blk.rstrip(",") + s[i:]
gravar(p, s)

# alta leiga
p = "src/data/alta.js"; s = ler(p)
for cid, a in (L.get("alta") or {}).items():
    k = cid if re.match(r"^[a-z]\w*$", cid) else J(cid)
    body = ",\n".join(f"  {kk}: {J(v)}" for kk, v in a.items())
    i = s.rindex("\n};")
    s = s[:i] + f"\n{k}: {{\n{body}\n}}," + s[i:]
gravar(p, s)

# ALTA_ITEM e escores (extras.js)
p = "src/data/extras.js"; s = ler(p)
for cid, v in (L.get("extras_ALTA_ITEM") or {}).items():
    k = cid if re.match(r"^[a-z]\w*$", cid) else J(cid)
    s = s.replace("const ALTA_ITEM={", "const ALTA_ITEM={\n " + f"{k}:{J(v)},", 1)
for e in (L.get("escores") or []):
    if f'id:"{e["id"]}"' in s: nao.append("escore já existe: " + e["id"]); continue
    partes = [f'id:{J(e["id"])}', f'nome:{J(e["nome"])}', f'src:{J(e["src"])}']
    if e.get("campos"): partes.append("campos:" + J(e["campos"]))
    partes.append("bin:" + J(e.get("bin") or []))
    partes.append("interp:" + e["interp"])
    i = s.index("const SC=[") ; j = s.index("\n];", i)
    s = s[:j] + ",\n{" + ",".join(partes) + "}" + s[j:]
gravar(p, s)

# exames
p = "src/data/exames.js"; s = ler(p)
for cid, ex in (L.get("exames") or {}).items():
    ser = "\n".join(" " + l for l in json.dumps(ex, ensure_ascii=False, indent=1).split("\n")).lstrip()
    i = s.rindex("\n};"); antes = s[:i].rstrip()
    if not antes.endswith(","): antes += ","
    s = antes + f'\n "{cid}": ' + ser + s[i:]
gravar(p, s)

# escores ligados às condutas
p = "src/js/09-escores.js"; s = ler(p)
add = ",".join(f'{J(c)}:{J(v)}' for c, v in (L.get("sc_cond") or {}).items())
if add: s = s.replace("const SC_COND={", "const SC_COND={" + add + ",", 1)
gravar(p, s)

# queixas: só os caminhos (alarmes e escores sugeridos ficam no relatório para revisão)
p = "src/data/queixas.js"; s = ler(p)
def caminhos(qs):
    # dois formatos: {conduta:[{queixa,tipo,rot,conduta}]} ou {queixa:{caminhos_acrescentar:[{rot,conduta}], fontes_acrescentar:[..]}}
    for k, v in qs.items():
        if isinstance(v, dict):
            for c in v.get("caminhos_acrescentar", []): yield {"queixa": k, "tipo": "caminho", **c}
            for f in v.get("fontes_acrescentar", []): yield {"queixa": k, "tipo": "fonte", "f": f}
            for a in v.get("alarme_acrescentar", []): yield {"queixa": k, "tipo": "alarme", "sugestao": json.dumps(a, ensure_ascii=False)}
        else:
            for q in v: yield q
for q in [list(caminhos(L.get("queixas") or {}))][0]:
    if True:
        if q.get("tipo") == "fonte":
            m = re.search(r'\{ id: "%s",' % re.escape(q["queixa"]), s)
            if m:
                i = s.index("fontes: [", m.start()) + len("fontes: [")
                s = s[:i] + "\n    " + J(q["f"]) + "," + s[i:]
            continue
        if q.get("tipo") != "caminho": nao.append(f'queixa {q.get("queixa")} ({q.get("tipo")}): {q.get("sugestao","")[:120]}'); continue
        m = re.search(r'\{ id: "%s",' % re.escape(q["queixa"]), s)
        if not m: nao.append("queixa não achada: " + q["queixa"]); continue
        i = s.index("caminhos: [", m.start()) + len("caminhos: [")
        s = s[:i] + f'\n    {{ rot: {J(q["rot"])}, conduta: {J(q["conduta"])} }},' + s[i:]
gravar(p, s)
print("ok;", len(nao), "itens para revisar à mão:"); [print(" -", x) for x in nao]

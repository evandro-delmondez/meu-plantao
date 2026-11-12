/* ---------- Sexo do paciente: pelo nome, e o que é só de um sexo sai do outro (médico, 2026-11-10) ----------
   O sexo fica só na memória da aba (pac.sexo: "M", "F" ou "" = não informado), como os outros dados do paciente.
   Ao colar ou digitar o nome, o app deduz pelo primeiro nome; nome ambíguo fica "não informado" até o médico tocar.
   No conteúdo, a linha ou o item que começa por "[F] " é só de mulher e "[M] " só de homem: com o sexo marcado, o do
   outro sexo some do checklist, dos exames, da receita, das orientações e da alta; sem sexo, aparecem os dois. */
const SX_F_EXC=new Set(("beatriz raquel isabel isabelle mabel maribel ester esther ruth rute lurdes lourdes mercedes carmen ines iris doris thais tais lais gladis ellen helen karen kelen kellen kelly shirley suely sueli neli nely nelly simone denise alice irene aline eliane eliene jaqueline jacqueline michele michelle gisele giselle cleide rose rosane rosilene rosimeire rosemeire solange ivone yvone marlene darlene gislene edilene elaine viviane cristiane daiane tatiane luciane adriane joice joyce gabriele gabrielle noemi miriam myriam mirian elizabeth lisbeth ingrid astrid edith judite judith nathaly nathalie natali natalie emily emilly ketlen rayane raiane lorraine sthefany stefany stephanie tiffany francine jeane jane joane luane ariane liliane juliane fabiane gleice greice nicole nicolle cleonice eunice berenice clarice nilce dulce socorro rosario amparo conceicao assuncao dolores luz liz beatris rosangele angele daniele danielle mariele adele ivete marinete claudete bernadete elisangele jucele leidiane leide").split(" "));
const SX_M_EXC=new Set(("luca joshua nicola jose jorge felipe filipe henrique vicente alexandre guilherme duarte andre rique enrique jaime dante wallace george mike davi luigi giovani giovanni henri rudi jefferson cleber gabriel ariel abel daniel samuel manuel emanuel rafael miguel israel ismael joel noel nathan bryan").split(" "));
function sexoDoNome(nome){
  const n=norm(String(nome||"").trim().split(/[\s,;]+/)[0]||"").replace(/[^a-z]/g,"");
  if(n.length<2) return "";
  if(SX_F_EXC.has(n)) return "F";
  if(SX_M_EXC.has(n)) return "M";
  if(/a$/.test(n)) return "F";
  if(/y$/.test(n)) return "F";
  if(/(o|r|l|s|n|u|z|k|d|t|m|x)$/.test(n)) return "M";
  return "";   // "e", "i" e o resto: ambíguo
}
// "Sexo: Feminino" colado do prontuário vale mais que o nome
function sexoDoTexto(t){const m=String(t||"").match(/\bsexo\s*:?\s*(fem|masc|f\b|m\b)/i);return m?(/^f/i.test(m[1])?"F":"M"):""}
const sxAtual=()=>(atd&&atd.exSexo)||pac.sexo||"";
// tira o marcador e o que é do outro sexo
const sxLinha=l=>{const m=/^(\s*(?:-\s*|\d+\)\s*)?)\[(F|M)\]\s*/.exec(l);if(!m)return l;const s=sxAtual();return s&&s!==m[2]?null:m[1]+l.slice(m[0].length)};
const sxTxt=t=>t==null?t:String(t).split("\n").map(sxLinha).filter(x=>x!==null).join("\n");
const sxArr=a=>Array.isArray(a)?a.map(x=>typeof x==="string"?sxLinha(x):x).filter(x=>x!==null):a;
// troca o sexo sem perder o que já foi marcado no checklist (o estado é por posição: remapeia pelo texto)
function sxDefine(s,origem){
  if(s===sxAtual()) return;
  const antes={};
  for(const id of Object.keys(chk)){const c=chkDe(id);if(!c)continue;antes[id]={};for(const [k,v] of Object.entries(chk[id]||{})){const g=k.replace(/\d+$/,""),i=+k.slice(g.length);const t=(c[g]||[])[i];if(t!=null)antes[id][g+"|"+t]=v}}
  pac.sexo=s; if(atd) atd.exSexo=s||null; atd.sexoOrigem=origem||"medico";
  for(const id of Object.keys(antes)){const c=chkDe(id);const novo={};for(const [gt,v] of Object.entries(antes[id])){const [g,t]=[gt.slice(0,gt.indexOf("|")),gt.slice(gt.indexOf("|")+1)];const i=(c[g]||[]).indexOf(t);if(i>=0)novo[g+i]=v}chk[id]=novo}
}
// nome novo: deduz o sexo (só se o médico ainda não escolheu neste atendimento)
function sxPeloNome(nome,texto){
  if(atd&&atd.sexoOrigem==="medico") return;
  const s=sexoDoTexto(texto)||sexoDoNome(nome);
  if(s) sxDefine(s,"nome");
}

/* ---------- receita com escolha por toque: alternativas ("Ou") e blocos opcionais ("# Se…") ---------- */
// o que se escolhe é do paciente: só na memória da aba; "Novo paciente" limpa
const rxSel={};  // id -> {s:{"b-s": índice da opção ou -1 = sem}, b:{índice do bloco: true}}
const rxOut={};  // id -> receita montada pelas escolhas (cur() usa quando não há edição à mão)
const RX_NOTA=/^\s*(Criança|Gestante|CID)\b|^\s*\(.*\)\s*$/;   // nota para o médico: nunca vai para a receita
function rxParse(t){
  const blocos=[{tit:null,partes:[]}];
  let atual=null, ouRot=null, emItem=false;
  for(const l of t.split("\n")){
    const b=blocos[blocos.length-1];
    if(/^#/.test(l)){blocos.push({tit:l.replace(/^#\s*/,"").replace(/:\s*$/,""),partes:[]});atual=null;ouRot=null;emItem=false;continue}
    if(/^\s*\d+\)\s/.test(l)){
      const op={linhas:[l],ou:ouRot};
      if(ouRot!=null&&atual) atual.ops.push(op); else {atual={tipo:"slot",ops:[op]};b.partes.push(atual)}
      ouRot=null; emItem=true; continue;
    }
    if(/^\s*Ou\b/.test(l)&&atual){ouRot=l.trim().replace(/^Ou\s*/,"");emItem=false;continue}
    if(emItem&&l.trim()){atual.ops[atual.ops.length-1].linhas.push(l);continue}
    emItem=false; if(!l.trim()){atual=null;ouRot=null}
    b.partes.push({tipo:"txt",l});
  }
  return blocos;
}
function rxRotulo(op){
  const nome=op.linhas[0].replace(/^\s*\d+\)\s*/,"").replace(/\s*-{3,}.*$/,"").trim();
  const freq=(op.linhas.slice(1).join(" ").match(/(\d+\/\d+ ?h|\d+x ao dia|dose única|1x por semana)/i)||[])[1];
  return nome+(freq?` · ${freq}`:op.ou?` · ${op.ou.replace(/[()]/g,"")}`:"");
}
// só condutas com alternativas ou blocos opcionais ganham a montagem
function rxTemMontar(it){const b=rxParse(rxTxt(it.casa||""));return b.length>1||b.some(x=>x.partes.some(p=>p.tipo==="slot"&&p.ops.length>1))}
// o primeiro bloco com remédio é a receita principal (às vezes ele próprio tem título "#"): vem ligado; os demais, desligados
const rxPrimeiro=blocos=>blocos.findIndex(b=>b.partes.some(p=>p.tipo==="slot"));
const rxAtivo=(blocos,st,bi)=>st.b[bi]??(bi===0||bi===rxPrimeiro(blocos));
function rxEstado(id){return rxSel[id]=rxSel[id]||{s:{},b:{}}}
function rxMonta(it){
  const blocos=rxParse(rxTxt(it.casa||"")), st=rxEstado(it.id), out=[]; let n=0;
  blocos.forEach((b,bi)=>{
    if(!rxAtivo(blocos,st,bi)) return;
    if(out.length&&out[out.length-1]!=="") out.push("");
    let si=0;
    for(const p of b.partes){
      if(p.tipo==="txt"){if(!RX_NOTA.test(p.l)) out.push(p.l);continue}
      const esc_=st.s[bi+"-"+si]??0; si++;
      if(esc_<0) continue;
      const op=p.ops[esc_]||p.ops[0];
      op.linhas.forEach((l,k)=>{if(k===0) out.push(l.replace(/^(\s*)\d+\)/,(m,e)=>`${e}${++n})`)); else if(!RX_NOTA.test(l)) out.push(l)});
    }
  });
  // tira rótulos que ficaram sem remédio (ex.: "Antibiótico" quando o paciente não precisa) e linhas em branco repetidas
  const par=out.join("\n").split(/\n{2,}/).filter(x=>x.trim()&&(/^\s*\d+\)/m.test(x)||x.trim().length>40));
  return par.join("\n\n");
}
function renderRxMontar(it){
  if(sess[it.id]&&sess[it.id].casa!=null) return "";   // editada à mão: não sobrescreve
  if(!rxTemMontar(it)) return "";
  const blocos=rxParse(rxTxt(it.casa||"")), st=rxEstado(it.id);
  const linhas=[];
  blocos.forEach((b,bi)=>{
    const ativo=rxAtivo(blocos,st,bi);
    if(bi>0&&bi!==rxPrimeiro(blocos)) linhas.push(`<div class="rxlin rxbloco"><button class="chip rxc" data-rxb="${bi}" aria-pressed="${!!ativo}">${ativo?"✓":"+"} ${esc(b.tit)}</button></div>`);
    if(!ativo) return;
    let si=0, soltos=null;   // itens únicos seguidos ficam juntos numa linha, na ordem da receita
    for(const p of b.partes){
      if(p.tipo!=="slot") continue;
      const k=bi+"-"+si++, e=st.s[k]??0;
      if(p.ops.length===1){const chip=`<button class="chip rxc" data-rxs="${k}" data-rxv="${e<0?0:-1}" aria-pressed="${e>=0}">${e>=0?"✓":"＋"} ${esc(rxRotulo(p.ops[0]).split(" · ")[0])}</button>`;if(!soltos){soltos=[];linhas.push(soltos)}soltos.push(chip);continue}
      soltos=null;
      linhas.push(`<div class="rxlin">${p.ops.map((o,oi)=>`<button class="chip rxc" data-rxs="${k}" data-rxv="${oi}" aria-pressed="${e===oi}">${esc(rxRotulo(o))}</button>`).join("")}<button class="chip rxc rxsem" data-rxs="${k}" data-rxv="-1" aria-pressed="${e<0}">sem</button></div>`);
    }
  });
  return `<div class="rxmontar"><span class="lbl">Montar a receita (toque para escolher; só o escolhido vai para a receita e a evolução):</span>${linhas.map(x=>Array.isArray(x)?`<div class="rxlin">${x.join("")}</div>`:x).join("")}</div>`;
}
function bindRxMontar(it){
  const box=$("#detail .rxmontar"); if(!box) return;
  const st=rxEstado(it.id);
  const aplica=()=>{rxOut[it.id]=rxMonta(it); if(sess[it.id]) delete sess[it.id].casa; renderDetail()};
  box.querySelectorAll("[data-rxs]").forEach(b=>b.onclick=()=>{st.s[b.dataset.rxs]=+b.dataset.rxv;aplica()});
  box.querySelectorAll("[data-rxb]").forEach(b=>b.onclick=()=>{const i=+b.dataset.rxb;st.b[i]=!rxAtivo(rxParse(rxTxt(it.casa||"")),st,i);aplica()});
}

/* ---------- início: busca única, favoritos, recentes ---------- */
function abrirConduta(id){setTab("prescricoes");$("#q").value="";renderList();select(id)}
function abrirEscore(id){ui.score=id;saveUI();usoRecente("s:"+id);setTab("escores");window.scrollTo({top:0})}
function abrirPed(id){ui.ped=id;ui.pmode="rx";saveUI();pedManual=false;renderPedChips();setTab("pediatria");window.scrollTo({top:0})}
function abrirPedEm(){ui.pmode="em";saveUI();setTab("pediatria");window.scrollTo({top:0})}
function abrirCalc(modo){const b=$(`[data-modo="${modo}"]`);if(b&&ui.modo!==modo)b.click();abrirAba("calculadora")}
function abrirAba(t,alvo){setTab(t);if(alvo){const x=$(alvo);if(x){x.scrollIntoView({block:"start"});return}}window.scrollTo({top:0})}

// páginas e ferramentas que não são condutas nem fichas
const PAGINAS=[
 ["Raiva: profilaxia antirrábica","Feridas e mordeduras","raiva mordedura cao gato morcego vacina soro antirrabico","feridas"],
 ["Tétano: profilaxia","Feridas e mordeduras","tetano vacina dt soro imunoglobulina ferimento","feridas"],
 ["Mordedura: antibiótico preemptivo","Feridas e mordeduras","mordedura antibiotico amoxicilina clavulanato","feridas","#frAbW"],
 ["Anestésico local: dose máxima e toxicidade","Feridas e mordeduras","lidocaina bupivacaina anestesico last emulsao lipidica","feridas","#anRes"],
 ["Sutura: fio e retirada dos pontos","Feridas e mordeduras","sutura fio nylon pontos retirada laceracao","feridas"],
 ["Emergência pediátrica por peso","Pediatria","pcr crianca convulsao anafilaxia sepse via aerea tubo pediatrica emergencia",null,null,abrirPedEm],
 ["Montador de evolução","Documentos","evolucao prontuario anamnese exame fisico","evolucao"],
 ["Atestado e comparecimento","Documentos","atestado comparecimento declaracao afastamento cid","atestado"],
 ["Meus modelos","Documentos","modelo exame fisico conduta padrao atestado organizar categorias","modelos"],
 ["Backup","Documentos","backup copia exportar importar restaurar","backup"],
];

function indiceBusca(){
  const out=[];
  for(const it of allItems()){const c=CATS[it.cat]||CATS.outros;out.push({g:"Condutas",cor:c.cor,t:it.nome,s:[c.nome,it.cid].filter(Boolean).join(" · "),h:norm([it.nome,it.sin,it.cid,c.nome].join(" ")),x:norm([it.casa,it.unidade].join(" ")),n:norm(it.nome),go:()=>abrirConduta(it.id)})}
  for(const m of MEDS){const g=MGRUPOS[m.grupo]||{nome:"",cor:"slate"};out.push({g:"Medicações",cor:g.cor,t:m.nome,s:[m.classe,(m.vias||[]).join(" · ")].filter(Boolean).join(" · "),h:medHay(m),n:norm(m.nome),go:()=>openMed(m.id)})}
  for(const s of SC) out.push({g:"Escores",cor:"violet",t:s.nome,s:"Escore",h:norm(s.nome+" escore score"),n:norm(s.nome),go:()=>abrirEscore(s.id)});
  for(const p of PEDS) out.push({g:"Pediatria por peso",cor:"sky",t:p.nome,s:"Prescrição pediátrica pelo peso",h:norm(p.nome+" pediatria crianca "+(p.cid||"")),n:norm(p.nome),go:()=>abrirPed(p.id)});
  for(const [modo,grupos] of Object.entries(CALC)) for(const gr of grupos) out.push({g:"Doses por peso",cor:gr.c,t:gr.t+(modo==="ped"?" (pediatria)":""),s:gr.d.map(d=>d.nome.split(/ \d/)[0]).slice(0,4).join(", ")+(gr.d.length>4?"…":""),h:norm(gr.t+" "+gr.d.map(d=>d.nome).join(" ")+(modo==="ped"?" pediatria crianca":" adulto")+" dose peso calculadora"),n:norm(gr.t),go:()=>abrirCalc(modo)});
  for(const [t,s,h,aba,alvo,fn] of PAGINAS) out.push({g:"Ferramentas",cor:"teal",t,s,h:norm(t+" "+s+" "+h),n:norm(t),go:fn||(()=>abrirAba(aba,alvo))});
  return out;
}
let gAchados=[];
function buscarTudo(q){
  const words=norm(q).split(/\s+/).filter(Boolean); if(!words.length) return [];
  // nome e sinônimos pesam mais; o texto da prescrição (x) só entra com peso baixo, para achar "adrenalina" → anafilaxia
  return indiceBusca().map(x=>{let s=0;for(const w of words){if(x.h.includes(w))s+=x.n.startsWith(w)?5:x.n.includes(w)?3:1;else if(x.x&&x.x.includes(w))s+=0.5;else return null}return [x,s]}).filter(Boolean).sort((a,b)=>b[1]-a[1]).map(a=>a[0]);
}
function renderBusca(){
  const q=$("#gq").value.trim(); const box=$("#gres");
  $("#hbody").hidden=!!q; box.hidden=!q; if(!q){gAchados=[];return}
  const achados=buscarTudo(q); gAchados=[];
  if(!achados.length){box.innerHTML=`<div class="empty">Nada encontrado para "${esc(q)}".</div>`;return}
  let html="";
  // grupos na ordem do resultado mais relevante de cada um
  const ordem=[...new Set(achados.map(x=>x.g))];
  for(const g of ordem){
    const l=achados.filter(x=>x.g===g);
    html+=`<div class="gsec"><h3>${esc(g)} <span>${l.length}</span></h3>`+l.slice(0,8).map(x=>{gAchados.push(x);return `<button class="gitem" data-gi="${gAchados.length-1}" style="--c:var(--${x.cor})"><span class="dot"></span><span class="gt"><b>${esc(x.t)}</b>${x.s?`<small>${esc(x.s)}</small>`:""}</span></button>`}).join("")+(l.length>8?`<p class="note">e mais ${l.length-8}. Refine a busca.</p>`:"")+`</div>`;
  }
  box.innerHTML=html;
  $$("#gres [data-gi]").forEach(b=>b.onclick=()=>gAchados[+b.dataset.gi].go());
}
$("#gq").addEventListener("input",renderBusca);
$("#gq").addEventListener("keydown",e=>{if(e.key==="Enter"&&gAchados[0])gAchados[0].go();if(e.key==="Escape"){$("#gq").value="";renderBusca()}});
// "/" ou Ctrl/Cmd+K abrem a busca de qualquer lugar
document.addEventListener("keydown",e=>{
  const typing=/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement||{}).tagName||"");
  if((e.key==="/"&&!typing)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k")){e.preventDefault();setTab("inicio");window.scrollTo({top:0});$("#gq").focus();$("#gq").select()}
});

function itemRecente(k){
  const [tp,id]=[k.slice(0,1),k.slice(2)];
  if(tp==="c"){const it=getItem(id);if(!it)return null;const c=CATS[it.cat]||CATS.outros;return {t:it.nome,cor:c.cor,go:()=>abrirConduta(id)}}
  if(tp==="m"){const m=medById[id];if(!m)return null;return {t:m.nome.replace(/ \(.*\)$/,""),cor:(MGRUPOS[m.grupo]||{cor:"slate"}).cor,go:()=>openMed(id)}}
  if(tp==="s"){const s=SC.find(x=>x.id===id);if(!s)return null;return {t:s.nome,cor:"violet",go:()=>abrirEscore(id)}}
  return null;
}
function chipsHome(el,lista,vazio){
  const l=lista.filter(Boolean);
  el.innerHTML=l.length?l.map((x,i)=>`<button class="chip" data-hi="${i}" style="--c:var(--${x.cor})">${esc(x.t)}</button>`).join(""):`<p class="note">${vazio}</p>`;
  el.querySelectorAll("[data-hi]").forEach(b=>b.onclick=()=>l[+b.dataset.hi].go());
}
const SEC_INFO={
 condutas:{t:"Condutas",d:"Prescrição, receita e orientações por diagnóstico; feridas e mordeduras.",cor:"sky"},
 remedios:{t:"Remédios",d:"Fichas das medicações e prescrição pediátrica pelo peso.",cor:"pink"},
 documentos:{t:"Documentos",d:"Evolução, atestado, seus modelos e backup.",cor:"teal"},
 calculos:{t:"Cálculos",d:"Escores clínicos e doses por peso.",cor:"violet"},
};
function renderInicio(){
  chipsHome($("#hFav"),uso.favs.map(id=>itemRecente("c:"+id)),"Toque na ☆ de uma conduta para fixá-la aqui.");
  chipsHome($("#hRec"),(uso.rec||[]).map(itemRecente),"As condutas, fichas e escores que você abrir aparecem aqui.");
  $("#hSecs").innerHTML=Object.entries(SEC_INFO).map(([k,v])=>`<button class="hsec panel" data-hs="${k}" style="--c:var(--${v.cor})"><b>${v.t}</b><small>${v.d}</small></button>`).join("");
  $$("#hSecs [data-hs]").forEach(b=>b.onclick=()=>setSec(b.dataset.hs));
  renderBusca();
}
$("#hRed").onclick=()=>setSec("sala");
/* rede pública × particular (v1.4) */
const RENAME_FONTE="Ministério da Saúde. Relação Nacional de Medicamentos Essenciais — RENAME 2024.";
function setRede(r){ui.rede=ui.rede===r?null:r;saveUI();renderRede();if(ui.tab==="prescricoes")renderDetail();if(ui.tab==="medicacoes")renderMedList()}
function renderRede(){
  $$("[data-rede]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.rede===ui.rede));
  $("#hRedeNota").textContent=ui.rede==="publica"?"As condutas destacam os remédios da RENAME (disponíveis no SUS).":ui.rede==="particular"?"As condutas mostram a RENAME só como informação.":"Escolha para ajustar os destaques de disponibilidade.";
}
$$("[data-rede]").forEach(b=>b.onclick=()=>setRede(b.dataset.rede));
renderRede();
$("#sync").onclick=()=>toast($("#syncTxt").textContent);

/* ---------- sala vermelha ---------- */
function renderSala(){
  const lista=a=>a.length>1?a.slice(0,-1).join(", ")+" e "+a[a.length-1]:a.join("");
  const gAd=CALC.adulto.filter(g=>g.t!=="Outros");
  const at=[
   ["Doses de emergência por peso (adulto)",lista(gAd.map((g,i)=>{const t=g.t.replace(/ — .*$/,"");return i&&!/^[A-Z]{2,}/.test(t)?t[0].toLowerCase()+t.slice(1):t})),"red",()=>abrirCalc("adulto")],
   ["Emergência pediátrica","PCR, convulsão, anafilaxia, sepse, CAD e via aérea pelo peso e pela idade","sky",abrirPedEm],
   ["Escores",SC.slice(0,4).map(s=>s.nome).join(", ")+" e outros","violet",()=>abrirAba("escores")],
  ];
  $("#salaAtalhos").innerHTML=at.map(([t,d,c],i)=>`<button class="hsec panel" data-sa="${i}" style="--c:var(--${c})"><b>${t}</b><small>${d}</small></button>`).join("");
  $$("#salaAtalhos [data-sa]").forEach(b=>b.onclick=()=>at[+b.dataset.sa][3]());
  const em=sortOrg(allItems().filter(i=>i.cat==="emerg"));
  $("#salaConds").innerHTML=em.length?em.map(i=>`<button class="item" data-sc2="${i.id}" style="--c:var(--red)"><span class="dot"></span><span class="n">${esc(i.nome)}</span><span class="m">${esc(i.cid||"")}</span></button>`).join(""):`<p class="note">Nenhuma conduta na categoria de emergência.</p>`;
  $$("#salaConds [data-sc2]").forEach(b=>b.onclick=()=>abrirConduta(b.dataset.sc2));
}

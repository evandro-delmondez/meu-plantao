/* ---------- Aparência: paleta, fonte, cartões, cantos e densidade ----------
   Escolha de cada aparelho (localStorage rxp_aparencia_v1), fora do backup e da nuvem: quem usa a cópia do site
   escolhe a sua. O padrão foi escolhido pelo médico em 2026-11-05 (petróleo e coral, Plus Jakarta, sombra, retos,
   compacta). A aplicação começa num script do <head> (sem piscar a tela); aqui só a tela de escolha. */
const AP_OPC={
  pal:{t:"Paleta de cores",o:{petroleo:["Petróleo e coral","#0E5E6F"],classico:["Clássico (azul)","#2F54EB"],salvia:["Sálvia","#3F7A5A"],grafite:["Grafite e âmbar","#B45309"],lavanda:["Lavanda","#5B4BC4"],areia:["Areia e terracota","#B4532A"]}},
  fonte:{t:"Fonte",o:{jakarta:["Plus Jakarta"],classica:["Clássica (Atkinson)"],lexend:["Lexend"],fraunces:["Fraunces + Source Sans"],plex:["IBM Plex"],nunito:["Nunito"]}},
  cartao:{t:"Cartões",o:{sombra:["Sombra suave"],borda:["Borda fina"],faixa:["Faixa colorida"],tinta:["Fundo tingido"]}},
  cantos:{t:"Cantos",o:{retos:["Retos"],medios:["Médios"],redondos:["Redondos"]}},
  dens:{t:"Densidade",o:{compacta:["Compacta"],confortavel:["Confortável"]}},
  tema:{t:"Tema",o:{auto:["Automático (do aparelho)"],light:["Claro"],dark:["Escuro"]}}
};
const AP_FONTE_CSS={jakarta:"family=Plus+Jakarta+Sans:wght@400;600;700;800",classica:"family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800",lexend:"family=Lexend:wght@400;600;700",fraunces:"family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Source+Sans+3:wght@400;600;700",plex:"family=IBM+Plex+Sans:wght@400;600;700",nunito:"family=Nunito:wght@400;700;800"};
const apAtual=()=>{const d=document.documentElement.dataset, t=d.theme==="dark"||d.theme==="light"?d.theme:"auto";return {pal:d.pal,fonte:d.fonte,cartao:d.cartao,cantos:d.cantos,dens:d.dens,tema:t}};
function apAplica(a){
  const d=document.documentElement.dataset, P=window.AP_PADRAO||{};
  for(const k of ["pal","fonte","cartao","cantos","dens"]) d[k]=AP_OPC[k].o[a[k]]?a[k]:P[k];
  if(a.tema==="dark"||a.tema==="light") d.theme=a.tema; else delete d.theme;
  try{localStorage.setItem("rxp_theme_v1",a.tema==="auto"?"":a.tema)}catch(e){}
  const q=AP_FONTE_CSS[d.fonte]; let l=document.getElementById("apFonteCss");
  if(q){if(!l){l=document.createElement("link");l.rel="stylesheet";l.id="apFonteCss";document.head.append(l)}const h=`https://fonts.googleapis.com/css2?${q}&display=swap`;if(l.href!==h)l.href=h}
}
function apGrava(a){const s={};for(const k of ["pal","fonte","cartao","cantos","dens"])s[k]=a[k];try{localStorage.setItem("rxp_aparencia_v1",JSON.stringify(s))}catch(e){}}
function renderAparencia(){
  const el=$("#apCorpo"); if(!el) return; const a=apAtual();
  el.innerHTML=`<div class="panel card"><h2>Aparência</h2><p class="note">Vale só neste aparelho. Cada pessoa que usa o site escolhe a sua.</p>
    ${Object.entries(AP_OPC).map(([k,g])=>`<div class="apgrp"><span class="lbl">${g.t}</span><div class="chips">${Object.entries(g.o).map(([v,[n,cor]])=>`<button class="chip apop" data-ap="${k}" data-v="${v}" aria-pressed="${a[k]===v}">${cor?`<span class="apsw" style="background:${cor}"></span>`:""}${esc(n)}</button>`).join("")}</div></div>`).join("")}
    <div class="actions"><button class="btn" id="apPadrao">Voltar ao padrão</button></div></div>`;
  el.querySelectorAll("[data-ap]").forEach(b=>b.onclick=()=>{const n=apAtual();n[b.dataset.ap]=b.dataset.v;apAplica(n);apGrava(n);renderAparencia()});
  $("#apPadrao").onclick=()=>{try{localStorage.removeItem("rxp_aparencia_v1")}catch(e){}apAplica(Object.assign({},window.AP_PADRAO,{tema:"auto"}));renderAparencia();toast("Aparência padrão")};
}
// o botão ◐ do topo continua alternando claro/escuro; a tela de Aparência acompanha
$("#themeBtn").addEventListener("click",()=>{if(ui.tab==="aparencia")setTimeout(renderAparencia,0)});

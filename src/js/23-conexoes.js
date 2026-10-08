/* ---------- conexões: remédio citado no texto vira botão; a ficha abre por cima ---------- */
// cada caractere vira 1 caractere (sem acento, minúsculo; o resto vira espaço), para achar o termo e cortar o texto original no mesmo ponto
const nmap=s=>[...(s||"")].map(ch=>{const n=ch.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();return n.length===1&&/[a-z0-9]/.test(n)?n:" "}).join("");
const MED_RE=(()=>{
  const pares=[];
  MEDS.forEach(m=>medTerms(m).forEach(t=>{const k=nmap(t).trim();if(k.length>=3)pares.push([k.split(/ +/).join(" +"),m.id])}));
  pares.sort((a,b)=>b[0].length-a[0].length);
  return {re:new RegExp("(?<![a-z0-9])(?:"+pares.map(p=>"("+p[0]+")").join("|")+")(?![a-z0-9])","g"),ids:pares.map(p=>p[1])};
})();
const medNoTexto=(t,id)=>{const out=[];const nt=nmap(t);let m;MED_RE.re.lastIndex=0;
  while((m=MED_RE.re.exec(nt))){const id2=MED_RE.ids[m.findIndex((g,i)=>i>0&&g!==undefined)-1];if(id2!==id&&!out.includes(id2))out.push(id2)}return out};
// fichas citadas logo abaixo de um texto editável (a caixa de texto não aceita botões dentro)
function fichasDoTexto(t){
  const ids=medNoTexto(t); if(!ids.length) return "";
  return `<div class="mcit"><span class="lbl">Fichas:</span>${ids.map(id=>{const m=medById[id];return `<button type="button" class="mlink" data-med="${id}">${esc(m.nome.replace(/ \(.*$/,"").replace(/ — .*$/,""))}</button>`}).join("")}</div>`;
}
// transforma a 1ª menção de cada remédio, em cada bloco (seção ou passo), num botão que abre a ficha
function linkMeds(root,atual){
  if(!root) return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest("button,a,textarea,input,select,label,h2,h3,summary,.nolink,.fontes,[data-med]")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  const nodes=[]; while(w.nextNode()) nodes.push(w.currentNode);
  const vistos=new Map();
  for(const n of nodes){
    const bloco=n.parentElement.closest(".msec,.sec,.prp,.cg,section,.panel")||root;
    let ja=vistos.get(bloco); if(!ja){ja=new Set();vistos.set(bloco,ja)}
    const txt=n.nodeValue, nt=nmap(txt); let m,pos=0,mudou=false; const frag=document.createDocumentFragment();
    MED_RE.re.lastIndex=0;
    while((m=MED_RE.re.exec(nt))){
      const id=MED_RE.ids[m.findIndex((g,i)=>i>0&&g!==undefined)-1];
      if(id===atual||ja.has(id)) continue; ja.add(id);
      frag.append(txt.slice(pos,m.index));
      const b=document.createElement("button"); b.type="button"; b.className="mlink"; b.dataset.med=id; b.title="Abrir a ficha";
      let fim=m.index+m[0].length; if(txt[fim]==="%") fim++;   // "glicose 50%" inteiro no botão
      b.textContent=txt.slice(m.index,fim); frag.append(b);
      pos=fim; mudou=true;
    }
    if(mudou){frag.append(txt.slice(pos)); n.replaceWith(frag)}
  }
}
// abre a bomba de infusão já com a droga escolhida
function abrirBic(id){Object.assign(bic,{id,dil:0,dose:"",mlh:"",ult:"dose"});$("#bicDose").value="";$("#bicMlh").value="";setTab("bic")}
function abrirFicha(id){
  const m=medById[id]; if(!m) return;
  let sh=$("#medSheet");
  if(!sh){
    sh=document.createElement("div"); sh.id="medSheet"; sh.className="msheet"; sh.hidden=true;
    sh.innerHTML=`<div class="msheet-bg" data-fechar></div><div class="msheet-box" role="dialog" aria-modal="true" aria-label="Ficha da medicação">
      <div class="msheet-top"><button class="btn sm" id="msBic" hidden></button><button class="btn sm" id="msAba">Abrir em Remédios</button><button class="btn sm" data-fechar aria-label="Fechar">✕ Fechar</button></div>
      <div id="msBody"></div></div>`;
    document.body.append(sh);
    sh.addEventListener("click",e=>{if(e.target.closest("[data-fechar]")) fecharFicha()});
  }
  const aberta=!sh.hidden; sh.hidden=false; document.body.classList.add("sheet-on");
  if(!aberta){try{history.pushState({ficha:1},"")}catch(e){}}
  renderMedDetail($("#msBody"),m,true); usoRecente("m:"+id);
  $(".msheet-box").scrollTop=0;
  $("#msAba").onclick=()=>fecharFicha(()=>openMed(id));
  const inf=INFUSAO.find(x=>x.id===id), bb=$("#msBic"); bb.hidden=!inf;
  if(inf){bb.textContent="Bomba de infusão: "+inf.nome.replace(/ \(.*?\)/,"");
    bb.onclick=()=>fecharFicha(()=>abrirBic(id))}
  $("#medSheet [data-fechar].btn").focus();
}
// "depois" roda só quando o histórico já voltou, para a troca de aba não ser desfeita
let fichaDepois=null;
function esconderFicha(){const sh=$("#medSheet");if(!sh)return;sh.hidden=true;$("#msBody").innerHTML="";document.body.classList.remove("sheet-on")}
function fecharFicha(depois){
  const sh=$("#medSheet"); if(!sh||sh.hidden){depois&&depois();return}
  esconderFicha();
  if(history.state&&history.state.ficha){fichaDepois=depois||null;try{history.back()}catch(e){fichaDepois=null;depois&&depois()}}
  else depois&&depois();
}
// o botão voltar do celular fecha a ficha em vez de sair do painel
addEventListener("popstate",()=>{esconderFicha();if(fichaDepois){const f=fichaDepois;fichaDepois=null;f()}});
addEventListener("keydown",e=>{if(e.key==="Escape") fecharFicha()});
document.addEventListener("click",e=>{const b=e.target.closest("[data-med]");if(b){e.preventDefault();abrirFicha(b.dataset.med)}});

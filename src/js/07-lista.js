/* ---------- list ---------- */
function renderCats(){
  const el=$("#cats");
  el.innerHTML=`<button class="chip" data-c="" aria-pressed="${!ui.cat}" style="--c:var(--ink)">Todas</button>`+
    Object.entries(CATS).map(([k,v])=>`<button class="chip" data-c="${k}" aria-pressed="${ui.cat===k}" style="--c:var(--${v.cor})">${esc(v.nome)}</button>`).join("")+
    `<button class="chip orgchip" data-org="1" style="--c:var(--muted)" title="Renomear, reordenar e mover diagnósticos">✎ Organizar</button>`;
  el.querySelectorAll("button[data-c]").forEach(b=>b.onclick=()=>{ui.cat=b.dataset.c||null;saveUI();renderCats();renderList()});
  el.querySelector("[data-org]").onclick=()=>{setTab("modelos");setTimeout(()=>{const x=$("#orgCard");x&&x.scrollIntoView({behavior:"smooth",block:"start"})},60)};
}
function score(it,q){
  if(!q) return 1;
  const hay=norm([it.nome,it.sin,it.cid,CATS[it.cat]?.nome].join(" "));
  const words=q.split(/\s+/).filter(Boolean);
  let s=0; for(const w of words){ if(!hay.includes(w)) return 0; s+= norm(it.nome).includes(w)?3:1 }
  return s;
}
function renderList(){
  const q=norm($("#q").value.trim());
  const gest=ui.cat==="__gest";
  let items=allItems().filter(i=>!ui.cat||(gest?alertasDe(i).out.gest.length>0:i.cat===ui.cat)).map(i=>[i,score(i,q)]).filter(x=>x[1]>0);
  if(q) items.sort((a,b)=>b[1]-a[1]); else { const s2=sortOrg(items.map(x=>x[0])); items=s2.map(i=>[i,1]); }
  $("#count").textContent=items.length+" prescriç"+(items.length===1?"ão":"ões")+(gest?" com alerta na gestação":"");
  const row=(i,extra="")=>{const c=CATS[i.cat]||CATS.outros;return `<button class="item" role="listitem" data-id="${i.id}" aria-current="${i.id===ui.sel}" style="--c:var(--${c.cor})"><span class="dot"></span><span class="n">${uso.favs.includes(i.id)?'<span class="st" aria-label="fixada">★</span> ':''}${esc(i.nome)}</span>${extra}<span class="m">${esc(i.cid||"")}</span></button>`};
  let html="";
  if(!q&&!ui.cat){
    const byId=Object.fromEntries(items.map(([i])=>[i.id,i]));
    const favs=uso.favs.map(id=>byId[id]).filter(Boolean);
    const top=Object.entries(uso.counts).filter(([id,n])=>n>0&&byId[id]&&!uso.favs.includes(id)).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([id])=>byId[id]);
    if(favs.length) html+=`<div class="lh">Fixadas</div>`+favs.map(i=>row(i)).join("");
    if(top.length) html+=`<div class="lh">Mais usadas</div>`+top.map(i=>row(i,`<span class="uses">${uso.counts[i.id]}×</span>`)).join("");
    
  }
  if(!q&&!ui.cat){ let last=null; html+=items.map(([i])=>{let h="";if(i.cat!==last){last=i.cat;const c=CATS[i.cat];h=`<div class="lh cath" style="--c:var(--${c.cor})">${esc(c.nome)}</div>`}return h+row(i)}).join(""); }
  else html+=items.map(([i])=>row(i)).join("");
  $("#list").innerHTML=items.length?html:`<div class="empty">Nada encontrado. Crie uma nova prescrição abaixo.</div>`;
  $$("#list .item").forEach(b=>b.onclick=()=>{select(b.dataset.id)});
}
function select(id){
  ui.sel=id;editing=false;confirmDel=false;saveUI();renderList();renderDetail();
  $("#tab-prescricoes").classList.add("show-detail");
  bumpUso(id);
  growAll();
  if(matchMedia("(max-width:860px)").matches) window.scrollTo({top:0});
}
$("#q").addEventListener("input",renderList);
$("#q").addEventListener("keydown",e=>{if(e.key==="Enter"){const f=$("#list .item");if(f)select(f.dataset.id)}});

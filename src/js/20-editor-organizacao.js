/* ---------- editor de organização ---------- */
let orgOpen=null, orgT=null;
function orgSave(msg){ clearTimeout(orgT); orgT=setTimeout(()=>{saveModel()},400); applyOrg(); renderCats(); renderList(); fillSelects&&fillSelects(); if(msg) toast(msg); }
function orgSetCats(arr){ orgOf().cats=arr.map(c=>({k:c.k,nome:c.nome,cor:c.cor})); }
function catItems(k){ return sortOrg(allItems()).filter(i=>i.cat===k); }
function renderOrg(){
  const box=$("#orgList"); if(!box) return;
  const cats=catsArr(); const all=allItems();
  box.innerHTML=cats.map((c,i)=>{
    const n=all.filter(x=>x.cat===c.k).length; const open=orgOpen===c.k;
    let inner="";
    if(open){
      const its=catItems(c.k);
      inner=`<div class="orgitems">${its.length?its.map((it,j)=>`<div class="orgit" data-id="${esc(it.id)}">
        <button class="ib" data-iu="${j}" ${j===0?"disabled":""} aria-label="Subir ${esc(it.nome)}">↑</button>
        <button class="ib" data-id2="${j}" ${j===its.length-1?"disabled":""} aria-label="Descer ${esc(it.nome)}">↓</button>
        <span class="nm">${esc(it.nome)}</span>
        <select class="inp" data-mv="${esc(it.id)}" aria-label="Mover ${esc(it.nome)} para">${cats.map(o=>`<option value="${o.k}" ${o.k===c.k?"selected":""}>${o.k===c.k?"Mover para…":esc(o.nome)}</option>`).join("")}</select>
      </div>`).join(""):`<p class="note">Nenhum diagnóstico nesta categoria.</p>`}
      <div class="orgtools"><button class="btn sm" data-az="${c.k}">Ordenar A–Z</button></div></div>`;
    }
    return `<div class="orgcat" data-k="${c.k}" style="--c:var(--${c.cor})">
      <div class="orgrow">
        <button class="ib" data-cu="${i}" ${i===0?"disabled":""} aria-label="Subir categoria">↑</button>
        <button class="ib" data-cd="${i}" ${i===cats.length-1?"disabled":""} aria-label="Descer categoria">↓</button>
        <input class="inp" data-nm="${c.k}" value="${esc(c.nome)}" aria-label="Nome da categoria" maxlength="40">
        <select class="inp" data-cor="${c.k}" aria-label="Cor">${CORES.map(x=>`<option value="${x}" ${x===c.cor?"selected":""}>${CORNOME[x]}</option>`).join("")}</select>
        <span class="cnt">${n} diag.</span>
        <button class="ib ${open?"open":""}" data-open="${c.k}" aria-expanded="${open}">${open?"Fechar":"Diagnósticos"}</button>
        ${c.k!=="outros"?`<button class="ib" data-del="${c.k}" aria-label="Excluir categoria" title="Excluir categoria">✕</button>`:""}
      </div>${inner}</div>`;
  }).join("");
  const swap=(a,i,j)=>{[a[i],a[j]]=[a[j],a[i]]};
  box.querySelectorAll("[data-cu],[data-cd]").forEach(b=>b.onclick=()=>{const a=catsArr();const i=+(b.dataset.cu??b.dataset.cd);const j=b.dataset.cu!=null?i-1:i+1;if(j<0||j>=a.length)return;swap(a,i,j);orgSetCats(a);orgSave();renderOrg()});
  box.querySelectorAll("[data-nm]").forEach(inp=>inp.addEventListener("input",()=>{const a=catsArr();const c=a.find(x=>x.k===inp.dataset.nm);c.nome=inp.value.trim()||"Sem nome";orgSetCats(a);orgSave()}));
  box.querySelectorAll("[data-cor]").forEach(sel=>sel.onchange=()=>{const a=catsArr();a.find(x=>x.k===sel.dataset.cor).cor=sel.value;orgSetCats(a);orgSave();renderOrg()});
  box.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>{orgOpen=orgOpen===b.dataset.open?null:b.dataset.open;renderOrg()});
  box.querySelectorAll("[data-az]").forEach(b=>b.onclick=()=>{delete orgOf().itemOrd[b.dataset.az];orgSave("Ordem alfabética");renderOrg()});
  box.querySelectorAll("[data-iu],[data-id2]").forEach(b=>b.onclick=()=>{const k=b.closest(".orgcat").dataset.k;const ids=catItems(k).map(x=>x.id);const i=+(b.dataset.iu??b.dataset.id2);const j=b.dataset.iu!=null?i-1:i+1;if(j<0||j>=ids.length)return;swap(ids,i,j);orgOf().itemOrd[k]=ids;orgSave();renderOrg()});
  box.querySelectorAll("[data-mv]").forEach(sel=>sel.onchange=()=>{const id=sel.dataset.mv,to=sel.value;const it=getItem(id);if(!it||to===it.cat)return;const o=orgOf();o.itemCat[id]=to;const from=it.cat;if(o.itemOrd[from])o.itemOrd[from]=o.itemOrd[from].filter(x=>x!==id);if(o.itemOrd[to]&&!o.itemOrd[to].includes(id))o.itemOrd[to].push(id);orgSave(`“${it.nome}” movido para ${CATS[to].nome}`);renderOrg()});
  box.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{const k=b.dataset.del;const n=allItems().filter(x=>x.cat===k).length;
    $("#orgConfirm").innerHTML=`<div class="confirm">Excluir a categoria “${esc(CATS[k].nome)}”?${n?` Os ${n} diagnóstico(s) dela vão para “${esc(CATS.outros.nome)}”.`:""}<button class="btn sm danger" id="orgYes">Confirmar</button><button class="btn sm" id="orgNo">Cancelar</button></div>`;
    $("#orgNo").onclick=()=>$("#orgConfirm").innerHTML="";
    $("#orgYes").onclick=()=>{const o=orgOf();for(const it of allItems()) if(it.cat===k) o.itemCat[it.id]="outros";delete o.itemOrd[k];orgSetCats(catsArr().filter(x=>x.k!==k));if(ui.cat===k)ui.cat=null;if(orgOpen===k)orgOpen=null;$("#orgConfirm").innerHTML="";orgSave("Categoria excluída");renderOrg()};
  });
}
$("#orgNew").onclick=()=>{const a=catsArr();const k="cat-"+Date.now().toString(36);const used=new Set(a.map(x=>x.cor));const cor=CORES.find(x=>!used.has(x))||"slate";const oi=a.findIndex(x=>x.k==="outros");a.splice(oi<0?a.length:oi,0,{k,nome:"Nova categoria",cor});orgSetCats(a);orgOpen=null;orgSave("Categoria criada — dê um nome a ela");renderOrg();const inp=$(`[data-nm="${k}"]`);if(inp){inp.focus();inp.select()}};
$("#orgReset").onclick=()=>{$("#orgConfirm").innerHTML=`<div class="confirm">Voltar nomes, cores, ordem e categorias dos diagnósticos ao original? Suas prescrições editadas não são afetadas.<button class="btn sm danger" id="orgYes">Confirmar</button><button class="btn sm" id="orgNo">Cancelar</button></div>`;$("#orgNo").onclick=()=>$("#orgConfirm").innerHTML="";$("#orgYes").onclick=()=>{model.org={};orgOpen=null;$("#orgConfirm").innerHTML="";orgSave("Organização original restaurada");renderOrg()}};

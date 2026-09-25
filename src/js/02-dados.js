/* ---------- data merge ---------- */
const baseById=Object.fromEntries(BASE.map(b=>[b.id,b]));
function allItems(){
  const out=[];
  for(const b of BASE){
    const o=overrides[b.id];
    if(o&&!o.restored&&!o.deleted) out.push(Object.assign({},b,o,{id:b.id,edited:true,rev:b.rev,fontes:b.fontes,evid:b.evid}));
    else if(!(o&&o.deleted)) out.push(b);
  }
  for(const id in overrides){
    const o=overrides[id];
    if(!baseById[id]&&!o.deleted) out.push(Object.assign({rev:[]},o,{id,custom:true}));
  }
  const ic=(model.org&&model.org.itemCat)||{};
  for(const it of out){ if(ic[it.id]) it.cat=ic[it.id]; if(!CATS[it.cat]) it.cat="outros"; }
  return out.sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"));
}

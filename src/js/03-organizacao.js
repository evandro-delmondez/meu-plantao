/* ---------- organização: categorias e ordem ---------- */
const CATS_BASE=JSON.parse(JSON.stringify(CATS));
const CORES=["red","sky","indigo","green","amber","teal","pink","orange","violet","slate"];
const CORNOME={red:"Vermelho",sky:"Azul-claro",indigo:"Índigo",green:"Verde",amber:"Âmbar",teal:"Turquesa",pink:"Rosa",orange:"Laranja",violet:"Violeta",slate:"Cinza"};
function orgOf(){ if(!model.org||typeof model.org!=="object") model.org={}; const o=model.org; o.itemCat=o.itemCat||{}; o.itemOrd=o.itemOrd||{}; return o; }
function applyOrg(){
  const o=model.org||{};
  const list=Array.isArray(o.cats)&&o.cats.length?o.cats:Object.entries(CATS_BASE).map(([k,v])=>({k,nome:v.nome,cor:v.cor}));
  for(const k of Object.keys(CATS)) delete CATS[k];
  for(const c of list){ if(c&&c.k&&!CATS[c.k]) CATS[c.k]={nome:String(c.nome||"Sem nome"),cor:CORES.includes(c.cor)?c.cor:"slate"}; }
  if(!CATS.outros) CATS.outros={nome:CATS_BASE.outros?CATS_BASE.outros.nome:"Outros",cor:"slate"};
  if(ui&&ui.cat&&ui.cat!=="__gest"&&!CATS[ui.cat]) ui.cat=null;
}
function catsArr(){ return Object.entries(CATS).map(([k,v])=>({k,nome:v.nome,cor:v.cor})); }
function sortOrg(items){
  const ci=Object.fromEntries(Object.keys(CATS).map((k,i)=>[k,i]));
  const ord=orgOf().itemOrd;
  const pos=it=>{const a=ord[it.cat];const i=a?a.indexOf(it.id):-1;return i<0?1e6:i};
  return items.sort((a,b)=>(ci[a.cat]-ci[b.cat])||(pos(a)-pos(b))||a.nome.localeCompare(b.nome,"pt-BR"));
}
const getItem=id=>allItems().find(i=>i.id===id);

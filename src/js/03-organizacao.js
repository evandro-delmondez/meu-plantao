/* ---------- organização: categorias e ordem ---------- */
const CATS_BASE=JSON.parse(JSON.stringify(CATS));
const CORES=["red","rose","sky","cyan","indigo","green","lime","amber","teal","pink","orange","violet","slate"];
const CORNOME={red:"Vermelho",sky:"Azul-claro",indigo:"Índigo",green:"Verde",amber:"Âmbar",teal:"Turquesa",pink:"Rosa",rose:"Carmim",cyan:"Ciano",lime:"Verde-limão",orange:"Laranja",violet:"Violeta",slate:"Cinza"};
function orgOf(){ if(!model.org||typeof model.org!=="object") model.org={}; const o=model.org; o.itemCat=o.itemCat||{}; o.itemOrd=o.itemOrd||{}; return o; }
/* v1.4: organização salva por versões antigas (10 categorias) ganha as categorias novas antes de "Outros";
   nomes que o usuário não mudou passam para os nomes novos; os que ele mudou ficam como estão */
const NOMES_ANTIGOS={emerg:"Emergência",orl:"Otorrino e olhos",dor:"Dor e neuro",pele:"Pele",gu:"Gineco, uro e IST",endo:"Endócrino"};
function migrarCats(salvas){
  const out=salvas.map(c=>c&&NOMES_ANTIGOS[c.k]===c.nome&&CATS_BASE[c.k]?Object.assign({},c,{nome:CATS_BASE[c.k].nome}):c);
  const tem=new Set(out.map(c=>c&&c.k));
  for(const [k,v] of Object.entries(CATS_BASE)) if(!tem.has(k)){const oi=out.findIndex(c=>c&&c.k==="outros");out.splice(oi<0?out.length:oi,0,{k,nome:v.nome,cor:v.cor})}
  return out;
}
function applyOrg(){
  const o=model.org||{};
  const list=Array.isArray(o.cats)&&o.cats.length?migrarCats(o.cats):Object.entries(CATS_BASE).map(([k,v])=>({k,nome:v.nome,cor:v.cor}));
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

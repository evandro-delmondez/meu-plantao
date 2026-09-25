/* ---------- UI state ---------- */
const ui=Object.assign({tab:"prescricoes",sel:"amigdalite",cat:null,modo:"adulto",peso:70,sexo:"M",tipo:"atestado",perfil:[],ped:"febre",pdPeso:"15",pdAnos:"3",pdMeses:"0"},lsGet(LS.ui,{}));
const saveUI=()=>lsSet(LS.ui,{sel:ui.sel,cat:ui.cat,modo:ui.modo,peso:ui.peso,sexo:ui.sexo,perfil:ui.perfil,ped:ui.ped,pdPeso:ui.pdPeso,pdAnos:ui.pdAnos,pdMeses:ui.pdMeses,pmode:ui.pmode,score:ui.score});
let editing=false, confirmDel=false, newTmp=null;

function toast(t){const el=$("#toast");el.textContent=t;el.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>el.hidden=true,1600)}
async function copy(text,btn){
  let ok=false;
  try{await navigator.clipboard.writeText(text);ok=true}catch(e){
    const ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();
    try{ok=document.execCommand("copy")}catch(e2){} ta.remove();
  }
  if(ok){toast("Copiado");if(btn){const o=btn.textContent;btn.classList.add("done");btn.textContent="Copiado ✓";setTimeout(()=>{btn.classList.remove("done");btn.textContent=o},1400)}}
  else toast("Não consegui copiar — selecione o texto manualmente");
}

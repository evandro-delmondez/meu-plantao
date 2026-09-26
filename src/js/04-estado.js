/* ---------- UI state ---------- */
// Regra 5: dados do paciente (peso, idade, sexo, perfis como gestante ou alergia) ficam só na memória da aba.
// Versões antigas salvavam esses campos em rxp_ui_v1; eles são ignorados ao carregar e apagados no próximo saveUI.
const ui=Object.assign({tab:"inicio",sel:"amigdalite",cat:null,modo:"adulto",tipo:"atestado",ped:"febre"},lsGet(LS.ui,{}));
Object.assign(ui,{peso:ui.modo==="ped"?20:70,sexo:"M",perfil:[],pdPeso:"15",pdAnos:"3",pdMeses:"0"});
// rede: "publica" | "particular" | null — preferência de quem usa o painel (onde está trabalhando hoje)
const saveUI=()=>lsSet(LS.ui,{sel:ui.sel,cat:ui.cat,modo:ui.modo,ped:ui.ped,pmode:ui.pmode,score:ui.score,rede:ui.rede||null});
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

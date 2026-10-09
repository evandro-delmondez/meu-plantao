/* ---------- "Novo paciente": limpa tudo o que é do paciente, em todas as abas (regra 5) ---------- */
const FR_PADRAO=JSON.parse(JSON.stringify(fr));
function novoPaciente(){
  // conduta, atendimento, checklist e edições temporárias da receita
  atd=ATD_VAZIO(); Object.assign(pac,{idade:"",sexo:"M",peso:"",cr:"",gest:false,pnc:false}); ui.perfil=[];
  [chk,sess,scState,contasVal].forEach(o=>Object.keys(o).forEach(k=>delete o[k]));
  evChk=null; evScores=[]; Object.assign(dc,{peso:"",grupo:"AB",crianca:false});
  // evolução e atestado
  evIds.forEach(id=>$("#"+id).value=""); evManual=false; $("#evOut").value="";
  $("#atDias").value="1"; $("#atCid").value=""; $("#atAut").checked=false; $("#atHora").value=""; atManual=false;
  // pesos das calculadoras, pediatria, fichas e bomba
  ui.peso=""; $("#peso").value=""; calcScq="";
  ui.pdPeso=""; ui.pdAnos=""; ui.pdMeses=""; $("#pdPeso").value=""; $("#pdAnos").value=""; $("#pdMeses").value=""; pedManual=false;
  mui.peso=""; bic.peso=""; $("#bicPeso").value="";
  // feridas e busca
  fr=JSON.parse(JSON.stringify(FR_PADRAO)); frManual=false;
  $$("#tab-feridas input").forEach(i=>{if(i.type==="checkbox"||i.type==="radio")i.checked=false;else i.value=""});
  $("#gq").value=""; renderBusca();
  saveUI(); setTab(ui.tab); if(ui.tab==="prescricoes") renderDetail();
  toast("Pronto para o próximo paciente");
}
// dois toques: o primeiro pede confirmação por 3 s, para não apagar sem querer
function bindNovoPaciente(b){
  let t=null; const rot=b.textContent;
  b.onclick=()=>{
    if(!b.classList.contains("confirma")){b.classList.add("confirma");b.textContent="Tocar de novo para limpar";t=setTimeout(()=>{b.classList.remove("confirma");b.textContent=rot},3000);return}
    clearTimeout(t); b.classList.remove("confirma"); b.textContent=rot; novoPaciente();
  };
}
bindNovoPaciente($("#novoPac"));

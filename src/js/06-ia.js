/* ---------- IA na HDA (opcional; exceção à regra 5 decidida pelo médico em 2026-10-25) ----------
   "Melhorar texto (IA)" manda só o texto da HDA, sem o nome do paciente, para a API da Anthropic (Claude Haiku 4.5),
   com a chave do próprio médico, e devolve o texto corrigido e coeso. Trava: se a IA mudar ou tirar algum número,
   o app mantém o original. A chave fica só no aparelho (e cifrada na senha de acesso), nunca no repositório. */
const IA_LS="mph_ia_v1", IA_MODELO="claude-haiku-4-5-20251001";
let ia=lsGet(IA_LS,null)||{};
const iaAtiva=()=>!!ia.chave;
const IA_SISTEMA=`Você revisa a HDA (história da doença atual) de um prontuário de pronto-socorro no Brasil.
Reescreva o primeiro parágrafo em português formal, texto corrido e coeso, na ordem da semiologia: queixa principal e duração; início; localização; irradiação; caráter; intensidade; evolução; fatores de melhora e de piora; sintomas associados; negativas pertinentes; tratamentos já feitos e resposta.
Corrija ortografia, concordância e abreviações.
Regras obrigatórias:
- Não acrescente nenhuma informação, sintoma, número, diagnóstico, hipótese ou interpretação que não esteja no texto.
- Não retire nenhuma informação, número, negativa, medicamento ou tempo.
- Mantenha as linhas de antecedentes (HPP, Medicamentos em uso, Alergias) e seus tópicos com hífen exatamente na mesma estrutura, só corrigindo a grafia.
- Sem markdown, sem aspas, sem comentários: devolva só o texto final.`;
// o prompt pode ser editado pelo médico (fica nos padrões e vai pela nuvem); a trava dos números vale sempre
const iaPrompt=()=>{const t=String((model.prefs||{}).iaPrompt||"").trim();return t||IA_SISTEMA};
const iaNums=t=>(String(t||"").match(/\d+(?:[.,]\d+)?/g)||[]).sort();
async function iaMelhora(texto){
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ia.chave,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","content-type":"application/json"},
    body:JSON.stringify({model:IA_MODELO,max_tokens:1500,temperature:0,system:iaPrompt(),messages:[{role:"user",content:texto}]})});
  if(!r.ok){let m="";try{m=(await r.json()).error?.message||""}catch(e){}throw new Error(`${r.status}${m?": "+m:""}`)}
  const j=await r.json(); const out=(j.content||[]).map(c=>c.text||"").join("").trim();
  if(!out) throw new Error("vazio");
  // trava: todo número do original continua, e nenhum número novo aparece
  const a=iaNums(texto), b=iaNums(out);
  if(a.join("|")!==b.join("|")) throw new Error("numeros");
  return out;
}
function renderIa(){
  const el=$("#iaCaixa"); if(!el) return;
  el.innerHTML=`<h2>IA na HDA</h2>
    <p class="note">Botão "Melhorar texto (IA)" na HDA do Atendimento: corrige e dá coesão, sem inventar nem tirar dados. Envia só o texto da HDA, sem o nome do paciente, para a Anthropic (Claude Haiku 4.5), com a sua chave; paga por uso (centavos).</p>
    ${iaAtiva()?`<p><b>Ligada</b> neste aparelho.</p><div class="actions"><button class="btn" id="iaTroca">Trocar a chave</button><button class="btn danger" id="iaDesliga">Desligar</button></div>`:`
    <div class="hospform"><label>Chave da API da Anthropic<input id="iaChave" class="segredo" type="text" name="ps-token-ia" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="sk-ant-…"></label>
      <div class="actions"><button class="btn primary" id="iaLiga">Ligar a IA</button></div></div>`}
    <p class="note" id="iaEstado"></p>
    <details class="iaprompt"${(model.prefs||{}).iaPrompt?" open":""}><summary><b>Instruções para a IA (prompt)</b></summary>
      <p class="note">É o que a IA recebe junto com a HDA. Ajuste como quiser; a trava dos números continua valendo.</p>
      <textarea class="out-edit" id="iaPromptTxt" spellcheck="false" aria-label="Instruções para a IA">${esc(iaPrompt())}</textarea>
      <div class="actions"><button class="btn primary" id="iaPromptSalva">Salvar instruções</button><button class="btn" id="iaPromptPadrao">Restaurar o padrão</button></div></details>`;
  const est=t=>{const e=$("#iaEstado");if(e)e.textContent=t};
  if($("#iaLiga")) $("#iaLiga").onclick=async()=>{const c=$("#iaChave").value.trim();if(!/^sk-ant-/.test(c)){est("A chave da Anthropic começa com sk-ant-.");return}
    ia={chave:c}; est("Testando…");
    try{await iaMelhora("dor de cabeca ha 2 dias");lsSet(IA_LS,ia);est("Ligada. Lembre de atualizar a senha de acesso para levar a chave a outro computador.");renderIa()}
    catch(e){ia={};est(/^40[13]/.test(e.message)?"Chave recusada pela Anthropic.":e.message==="numeros"?"Ligada (o teste mudou um número; a trava protege).":"Sem conexão ou erro: "+e.message);if(e.message==="numeros"){ia={chave:c};lsSet(IA_LS,ia);renderIa()}}};
  $("#iaPromptSalva").onclick=()=>{const t=$("#iaPromptTxt").value.trim();model.prefs=Object.assign({},model.prefs,{iaPrompt:t===IA_SISTEMA.trim()?"":t});saveModel();toast("Instruções da IA salvas")};
  $("#iaPromptPadrao").onclick=()=>{model.prefs=Object.assign({},model.prefs,{iaPrompt:""});saveModel();$("#iaPromptTxt").value=IA_SISTEMA;grow($("#iaPromptTxt"));toast("Instruções padrão restauradas")};
  if($("#iaTroca")) $("#iaTroca").onclick=()=>{const c=(prompt("Cole a chave nova da Anthropic")||"").trim();if(!c)return;ia={chave:c};lsSet(IA_LS,ia);toast("Chave trocada")};
  if($("#iaDesliga")) $("#iaDesliga").onclick=()=>{try{localStorage.removeItem(IA_LS)}catch(e){}ia={};renderIa();toast("IA desligada neste aparelho")};
}

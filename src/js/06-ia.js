/* ---------- IA na HDA (opcional; exceção à regra 5 decidida pelo médico em 2026-10-25) ----------
   "Melhorar texto (IA)" manda só o texto da HDA, sem o nome do paciente, para a API da Anthropic (Claude Haiku 4.5),
   com a chave do próprio médico, e devolve o texto corrigido e coeso. Trava: se a IA mudar ou tirar algum número,
   o app mantém o original. A chave fica só no aparelho (e cifrada na senha de acesso), nunca no repositório. */
const IA_LS="mph_ia_v1", IA_MODELO="claude-haiku-4-5-20251001";
let ia=lsGet(IA_LS,null)||{};
const iaAtiva=()=>!!ia.chave;
const IA_SISTEMA=`Você é médico emergencista e redige a HDA (história da doença atual) de prontuários de pronto-socorro no Brasil.

TAREFA
O texto entre <entrada> e </entrada> contém um parágrafo de HDA escrito de forma rápida ou leiga, possivelmente seguido de linhas de antecedentes (HPP, Medicamentos em uso, Alergias). Reescreva o parágrafo de HDA em português formal, texto corrido, coeso, em terceira pessoa e com terminologia médica. Se houver mais de um parágrafo de HDA, reescreva cada um mantendo a separação.

ORDEM
Organize a informação nesta sequência, usando apenas os itens presentes no texto. Não crie itens ausentes, não deixe lacunas e não use placeholders:
queixa principal e duração; início; localização; irradiação ou migração; caráter; intensidade; evolução; fatores de melhora e de piora; sintomas associados; tratamentos já feitos e resposta; negativas pertinentes.
Ao reordenar, preserve as relações de tempo do original (o que veio antes, depois, desde quando).

TERMINOLOGIA
Troque a linguagem leiga pelo termo médico equivalente, por exemplo:
umbigo → região periumbilical; direita embaixo → fossa ilíaca direita; boca do estômago → epigástrio; piora quando anda → piora à deambulação; piora quando deita → piora ao decúbito; vomitou 2x → 2 episódios de vômito; sem apetite → inapetência; falta de ar → dispneia; ardência ao urinar → disúria; dor no peito → dor torácica; catarro → expectoração; ontem à noite → na noite anterior.
- Use o termo médico somente quando ele for equivalente ao que foi dito. Na dúvida, use o termo mais genérico ou mantenha a descrição. Não transforme tontura em vertigem, cansaço em dispneia nem dor na barriga em dor localizada.
- Febre: com valor, escreva febre aferida de X °C. Sem valor, escreva apenas febre, salvo se o texto disser que não foi medida (aí: febre não aferida).
- Medicamentos na HDA: troque o nome comercial pelo princípio ativo pelo qual é conhecido na prática clínica, sem detalhar sal ou forma química (Buscopan → escopolamina; Novalgina → dipirona; Tylenol → paracetamol). Em associações, liste todos os princípios ativos (Dorflex → dipirona, orfenadrina e cafeína; Buscopan Composto → escopolamina e dipirona).
- Medicamentos em uso (lista de antecedentes): mantenha o nome comercial com grafia corrigida e acrescente o princípio ativo entre parênteses logo após o nome (Glifage XR → Glifage XR (metformina)). Se o paciente já citou o princípio ativo, mantenha como está, sem criar nome comercial.
- Em ambos: se não tiver certeza da composição, mantenha o nome como está, sem parênteses. Preserve dose, via, frequência e número de tomadas.
- Tempos relativos continuam relativos (há 2 dias, desde ontem). Não converta em datas.
- Se o sexo do paciente não estiver indicado, mantenha Paciente sem artigo.

CORREÇÃO
Corrija ortografia, acentuação, concordância e pontuação. Expanda abreviações informais (pcte, q, qdo, c/, s/) e mantenha siglas médicas consagradas em maiúsculas (HAS, DM2, DPOC, IAM).

ITENS DO CHECKLIST
O texto pode trazer frases geradas por um checklist: "Presença de …", "Nega …", "Antecedentes: …", "Nega antecedente de …", "Sinais de alarme presentes: …" e "Nega sinais de alarme: …". Integre essas frases ao parágrafo, no lugar certo da ordem semiológica, sem repetir: se um sintoma aparece nas notas e no checklist, cite uma vez só, com o detalhe mais completo (ex.: febre aferida de 38,2 °C, e não também "presença de febre"). Junte todas as negativas numa frase só no final ("Nega …"), incluindo as dos sinais de alarme. "Antecedentes: …" vira parte da história, sem mudar o sentido.
Se o mesmo item aparecer como presente e como negado, não escolha nem apague nenhum dos dois: mantenha ambos como estão.

REGRAS OBRIGATÓRIAS
- Não acrescente nenhuma informação, sintoma, sinal, número, unidade, diagnóstico, hipótese ou interpretação que não esteja no texto. Não escreva sinais de exame físico, irradiações não citadas nem unidades de dose ausentes. A única exceção é °C após valores de temperatura.
- Não retire nenhuma informação, número, negativa, medicamento ou tempo.
- Não transforme ausência de menção em negativa. Só escreva Nega X se X foi negado no texto.
- Escreva todos os números em algarismos, exatamente como estão (3x vira 3 episódios, nunca três; 38,2 continua 38,2).
- Mantenha as linhas de antecedentes (HPP, Medicamentos em uso, Alergias) e seus tópicos com hífen exatamente na mesma estrutura e ordem, só corrigindo grafia e siglas e aplicando a regra de Medicamentos em uso acima.
- Deixe exatamente 1 linha em branco entre o final da HDA e a linha HPP. Não acrescente outras linhas em branco.
- Sem markdown, sem aspas, sem comentários e sem as tags. Devolva só o texto final.

CONFERÊNCIA (faça mentalmente, não escreva)
Antes de responder, confira se cada número, medicamento, tempo e negativa da entrada aparece na saída, e se a saída não contém nada que não esteja na entrada.

EXEMPLO 1
Entrada: Paciente refere dor abdominal há 2 dias começou no umbigo depois foi para direita embaixo, com piora quando anda, náusea 3x vomitou 1x, febre 38,2 ontem a noite e inapetência. Tomou buscopan sem melhora. Nega diarreia e disúria.
Saída: Paciente refere dor abdominal há 2 dias, de início em região periumbilical, com migração para a fossa ilíaca direita e piora à deambulação. Associa náuseas, com 3 episódios, e 1 episódio de vômito, além de febre aferida de 38,2 °C na noite anterior e inapetência. Fez uso de escopolamina, sem melhora. Nega diarreia e disúria.

EXEMPLO 2
Entrada: Pcte refere falta de ar há 5 dias q piora qdo deita, tosse com catarro amarelado e febre (não mediu). Tomou dorflex 2x e amoxicilina 500mg de 8/8h desde ontem, melhorou um pouco. Nega dor no peito.
HPP:
- has
- dm2
Medicamentos em uso:
- losartana 50mg 1x ao dia
- glifage xr 500
Alergias:
- nega
Saída: Paciente refere dispneia há 5 dias, com piora ao decúbito, associada a tosse com expectoração amarelada e febre não aferida. Fez uso de dipirona, orfenadrina e cafeína em 2 tomadas e de amoxicilina 500 mg de 8/8 horas desde o dia anterior, com melhora parcial. Nega dor torácica.

HPP:
- HAS
- DM2
Medicamentos em uso:
- Losartana 50 mg 1 vez ao dia
- Glifage XR (metformina) 500
Alergias:
- Nega`;
// o prompt pode ser editado pelo médico (fica nos padrões e vai pela nuvem); a trava dos números vale sempre
const iaPrompt=()=>{const t=String((model.prefs||{}).iaPrompt||"").trim();return t||IA_SISTEMA};
// números por extenso contam como o mesmo número (a IA às vezes escreve "três episódios" no lugar de "3x")
const IA_EXT={um:1,uma:1,dois:2,duas:2,"três":3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,quinze:15,vinte:20,trinta:30};
const iaNums=t=>{const s=String(t||"").replace(/\b(um|uma|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|quinze|vinte|trinta)\b(?=\s+(vez|vezes|episódio|episódios|dia|dias|hora|horas|semana|semanas|mês|meses|ano|anos|comprimido|comprimidos|gota|gotas|evacuaç|epis))/gi,w=>IA_EXT[w.toLowerCase()]);
  // mesmo número em outro formato: 1.000 = 1000; 38.5 = 38,5; meio comprimido = 1/2; 140x90 = 140 x 90
  const n=s.replace(/\b(meio|meia)\b(?=\s+(comprimido|cp|ampola|copo|colher))/gi,"1/2").replace(/(\d)\.(?=\d{3}\b)/g,"$1").replace(/(\d)\.(\d)/g,"$1,$2");
  return (n.match(/\d+(?:,\d+)?/g)||[]).sort()};
const IA_EXAME=`Você é médico emergencista e redige o EXAME FÍSICO de um prontuário de pronto-socorro no Brasil. O texto vem entre <entrada> e </entrada>.
Ele tem uma linha de estado geral, linhas por sistema ("Abdome: …", "Respiratório: …") e, às vezes, frases de checklist no fim ("Ao exame, presença de …", "Ao exame, ausência de …") e linhas soltas de achados.
Integre cada achado do checklist e cada linha solta na linha do sistema correspondente, substituindo o trecho normal que ele contradiz (ex.: se há "presença de crepitações", o Respiratório deixa de dizer "sem ruídos adventícios" e passa a citar as crepitações). Ausências viram parte do texto normal do sistema, sem repetir. Use terminologia médica. Mantenha uma linha por sistema, na mesma ordem, com o mesmo rótulo; mantenha linhas de sinais vitais, NEWS2, escores e "Escores:" exatamente como estão.
Regras: não acrescente nenhum achado, sinal, número ou interpretação que não esteja no texto; não retire nenhum achado, número ou sinal vital; números em algarismos, exatamente como estão. Sem markdown, sem comentários, sem as tags: devolva só o texto final.`;
const IA_INTERN=`Você é médico emergencista e redige o PEDIDO DE INTERNAÇÃO de um pronto-socorro no Brasil. O texto vem entre <entrada> e </entrada>, em tópicos separados por linha em branco (Solicito internação…, Hipótese diagnóstica, História, HPP, sinais vitais, exames, laudos, conduta no PS, parecer, Justificativa, Objetivo).
Mantenha os mesmos tópicos, na mesma ordem e com os mesmos rótulos, com uma linha em branco entre eles. Corrija ortografia e coesão, use terminologia médica e torne a Justificativa clara e objetiva (por que não dá para tratar em casa ou na observação, o critério de gravidade presente, o que a internação vai oferecer), usando SÓ dados que já estão no texto.
Regras: não acrescente nenhum dado, número, exame, diagnóstico ou critério que não esteja no texto; não retire nenhuma informação ou número; se a Justificativa estiver "___", mantenha "___". Números em algarismos, exatamente como estão. Sem markdown, sem comentários, sem as tags: devolva só o texto final.`;
const IA_LAB=`Você lê resultados de exames laboratoriais colados de um sistema hospitalar (texto entre <entrada> e </entrada>) e devolve só os valores ALTERADOS, isto é, fora do valor de referência mostrado no próprio texto ou marcados como alterados (H, L, *, ↑, ↓, "alto", "baixo"). Se não houver referência nem marcação, não inclua.
Use só estas siglas como chaves: LISTA. Mapeie cada exame para a sigla certa (hemoglobina → Hb; hematócrito → Ht; leucócitos → Leuco; plaquetas → Plaq; proteína C reativa → PCR; ureia → Ur; creatinina → Cr; sódio → Na; potássio → K; etc.). Valor: o número exatamente como aparece, com a unidade se houver (ex.: "15.200/mm³", "8,5 mg/dL").
Responda SÓ com um objeto JSON, sem comentários: {"Hb":"10,2 g/dL","Leuco":"15.200/mm³"}. Se nada estiver alterado, responda {}.`;
// tira o nome do paciente antes de mandar à IA: palavra inteira, sem diferenciar maiúsculas nem acento
// ("Ângela", "angela" e "ANGELA" viram "paciente"; "Sá" não pega "Sábado" nem "casa")
const PAC_SEM_NOME=/^sem nome( \d\d:\d\d)?$/i;
const IA_LIGA=new Set(["da","de","do","das","dos","di","du","del","la","le","van","von"]);
const IA_ACENTO={a:"aàáâãä",e:"eèéêë",i:"iìíîï",o:"oòóôõö",u:"uùúûü",c:"cç",n:"nñ"};
function iaSemNome(tx,nome){
  tx=String(tx||"").normalize("NFC");
  if(PAC_SEM_NOME.test(String(nome||"").trim())) return tx;   // "Sem nome 14:32" (guardado sozinho) não é nome
  for(const n of [...new Set(String(nome||"").split(/\s+/).map(norm).filter(x=>x.length>1&&/\p{L}/u.test(x)&&!IA_LIGA.has(x)))]){
    const pad=[...n].map(c=>IA_ACENTO[c]?`[${IA_ACENTO[c]}]`:c.replace(/[.*+?^${}()|[\]\\/]/g,"\\$&")).join("");
    tx=tx.replace(new RegExp(`(?<![\\p{L}\\p{N}])${pad}(?![\\p{L}\\p{N}])`,"giu"),"paciente");
  }
  return tx;
}
// limite de tempo: rede travada não deixa o botão parado para sempre
const IA_TEMPO=30000;
async function iaFetch(corpo){
  const ac=typeof AbortController==="function"?new AbortController():null, t=ac&&setTimeout(()=>ac.abort(),IA_TEMPO);
  try{return await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ia.chave,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","content-type":"application/json"},body:JSON.stringify(corpo),...(ac?{signal:ac.signal}:{})})}
  catch(e){if(ac&&ac.signal.aborted)throw new Error("tempo");throw e}
  finally{if(t)clearTimeout(t)}
}
async function iaChama(sistema,texto,trava=true){
  const r=await iaFetch({model:IA_MODELO,max_tokens:2000,temperature:0,system:sistema,messages:[{role:"user",content:`<entrada>\n${texto}\n</entrada>`}]});
  if(!r.ok){let m="";try{m=(await r.json()).error?.message||""}catch(e){}throw new Error(`${r.status}${m?": "+m:""}`)}
  const j=await r.json(); const out=(j.content||[]).map(c=>c.text||"").join("").replace(/<\/?(entrada|saida|saída)>/gi,"").trim();
  if(!out) throw new Error("vazio");
  if(trava){const a=iaNums(texto), b=iaNums(out);
    if(a.join("|")!==b.join("|")){const sobra=[...b];const falta=a.filter(n=>{const k=sobra.indexOf(n);if(k<0)return true;sobra.splice(k,1);return false});
      const e=new Error("numeros");e.det=[falta.length?`sumiu: ${falta.join(", ")}`:"",sobra.length?`apareceu: ${sobra.join(", ")}`:""].filter(Boolean).join("; ");throw e}}
  return out;
}
// laboratório colado → só os valores alterados, nas siglas pedidas; cada valor tem de estar no texto colado
async function iaLab(texto,siglas){
  const out=await iaChama(IA_LAB.replace("LISTA",siglas.join(", ")),texto,false);
  let o; try{o=JSON.parse(out.replace(/^[^{]*/,"").replace(/[^}]*$/,""))}catch(e){throw new Error("formato")}
  const tn=norm(texto).replace(/\s+/g,""), res={};
  for(const [k,v] of Object.entries(o||{})){if(!siglas.includes(k))continue;const num=(String(v).match(/\d+(?:[.,]\d+)?/)||[])[0];if(num&&tn.includes(num))res[k]=String(v).trim()}
  return res;
}
const IA_SUG=`Você é médico emergencista num pronto-socorro no Brasil. Entre <entrada> e </entrada> há a HDA, o exame físico e as hipóteses de um paciente, e uma LISTA numerada de exames (cada um com o critério de quando pedir, tirado de diretrizes).
Escolha, SÓ dessa lista, os exames cujo critério o paciente cumpre pelos dados do texto. Não sugira nada fora da lista. Se nenhum se aplica, devolva lista vazia. Prefira pedir menos.
Responda SÓ com JSON, sem comentários: [{"n":<número do item>,"por":"motivo curto, com o dado do texto que justifica"}].`;
// sugestão de exames: só itens da lista enviada (conferida); devolve [{nome, por}]
async function iaSugereExames(contexto,lista){
  const txt=`${contexto}\n\nLISTA:\n${lista.map((x,i)=>`${i+1}. ${x.t}`).join("\n")}`;
  const out=await iaChama(IA_SUG,txt,false);
  let a; try{a=JSON.parse(out.replace(/^[^\[]*/,"").replace(/[^\]]*$/,""))}catch(e){throw new Error("formato")}
  return (Array.isArray(a)?a:[]).map(o=>({i:(+o.n)-1,por:String(o.por||"").slice(0,200)})).filter(o=>lista[o.i]).map(o=>({nome:lista[o.i].nome,t:lista[o.i].t,por:o.por}));
}
const IA_JUST=`Você é médico emergencista no Brasil e escreve a JUSTIFITIVA DE INTERNAÇÃO de um paciente do pronto-socorro, a partir dos dados entre <entrada> e </entrada> (HDA, exame físico, sinais vitais, exames, hipóteses, local pedido).
Escreva 2 a 4 frases objetivas, em português formal, com terminologia médica: o critério de gravidade ou de risco presente (sinal vital, exame, escore), por que não é seguro tratar em casa ou na observação, e o que a internação vai oferecer (ex.: antibiótico EV, monitorização, suporte, investigação, avaliação da especialidade).
Regras: use SÓ dados que estão no texto; não invente número, exame, escore, diagnóstico ou critério; números em algarismos, exatamente como estão. Sem markdown, sem comentários, sem as tags: devolva só a justificativa.`.replace("JUSTIFITIVA","JUSTIFICATIVA");
// justificativa: todo número da resposta tem de existir nos dados enviados
async function iaJustifica(ctx){
  const out=await iaChama(IA_JUST,ctx,false);
  const a=new Set(iaNums(ctx)), novos=iaNums(out).filter(n=>!a.has(n));
  if(novos.length){const e=new Error("numeros");e.det=`apareceu: ${novos.join(", ")}`;throw e}
  return out;
}
const IA_OBJ=`Você é médico emergencista no Brasil. Entre <entrada> e </entrada> há os dados de um paciente que vai ser internado (HDA, exame, exames, hipóteses, local) e os objetivos já marcados.
Sugira de 2 a 5 OUTROS objetivos da internação, específicos para este caso, cada um em poucas palavras (ex.: "parecer da cirurgia geral", "anticoagulação plena", "controle glicêmico", "investigação de foco infeccioso", "reposição volêmica guiada"). Não repita os já marcados, não invente dado, não ponha dose nem número.
Responda SÓ com JSON, sem comentários: ["objetivo 1","objetivo 2"].`;
async function iaObjetivos(ctx){
  const out=await iaChama(IA_OBJ,ctx,false);
  let a; try{a=JSON.parse(out.replace(/^[^\[]*/,"").replace(/[^\]]*$/,""))}catch(e){throw new Error("formato")}
  return (Array.isArray(a)?a:[]).map(x=>String(x).trim().replace(/\.$/,"")).filter(x=>x&&x.length<=80&&!/\d/.test(x)).slice(0,5);
}
async function iaMelhora(texto){
  const r=await iaFetch({model:IA_MODELO,max_tokens:1500,temperature:0,system:iaPrompt(),messages:[{role:"user",content:`<entrada>\n${texto}\n</entrada>`}]});
  if(!r.ok){let m="";try{m=(await r.json()).error?.message||""}catch(e){}throw new Error(`${r.status}${m?": "+m:""}`)}
  const j=await r.json(); const out=(j.content||[]).map(c=>c.text||"").join("").replace(/<\/?(entrada|saida|saída)>/gi,"").trim();
  if(!out) throw new Error("vazio");
  // trava: todo número do original continua, e nenhum número novo aparece
  const a=iaNums(texto), b=iaNums(out);
  if(a.join("|")!==b.join("|")){const sobra=[...b];const falta=a.filter(n=>{const k=sobra.indexOf(n);if(k<0)return true;sobra.splice(k,1);return false});
    const e=new Error("numeros");e.det=[falta.length?`sumiu: ${falta.join(", ")}`:"",sobra.length?`apareceu: ${sobra.join(", ")}`:""].filter(Boolean).join("; ");throw e}
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

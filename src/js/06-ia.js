/* ---------- IA na HDA (opcional; exceção à regra 5 decidida pelo médico em 2026-10-25) ----------
   "Melhorar texto (IA)" manda só o texto da HDA, sem o nome do paciente, para a API da Anthropic (Claude Haiku 5.5 ou
   Sonnet 5.5, à escolha), com a chave do próprio médico, e devolve o texto corrigido e coeso. Os números vão como
   marcadores (⟦1⟧, ⟦2⟧…) e voltam no lugar: a IA não tem como trocar um número. Travas: remédio novo, negativa
   apagada ou número inventado → a IA refaz uma vez, com o motivo; se errar de novo, o app mantém o original. Parêntese
   acrescentado pela IA é tirado sozinho. A chave fica só no aparelho (e cifrada na senha de acesso), nunca no repositório. */
const IA_LS="mph_ia_v1";
const IA_MODELOS={haiku:["claude-haiku-5-5","Rápido e barato (Claude Haiku 5.5)"],sonnet:["claude-sonnet-5-5","Mais cuidadoso, um pouco mais lento (Claude Sonnet 5.5)"]};
const iaModelo=()=>(IA_MODELOS[ia.modelo]||IA_MODELOS.haiku)[0];
let ia=lsGet(IA_LS,null)||{};
const iaAtiva=()=>!!ia.chave;
const IA_SISTEMA=`Você é médico emergencista e redige a HDA (história da doença atual) de prontuários de pronto-socorro no Brasil.

TAREFA
O texto entre <entrada> e </entrada> contém um parágrafo de HDA escrito de forma rápida ou leiga, possivelmente seguido de linhas de antecedentes (HPP, Medicamentos em uso, Alergias). Reescreva o parágrafo de HDA em português formal, texto corrido, coeso, em terceira pessoa e com terminologia médica. Se houver mais de um parágrafo de HDA, reescreva cada um mantendo a separação.

ORDEM
Organize a informação nesta sequência, usando apenas os itens presentes no texto. Não crie itens ausentes, não deixe lacunas e não use placeholders:
queixa principal e duração; início; localização; irradiação ou migração; caráter; intensidade; evolução; fatores de melhora e de piora; sintomas associados; tratamentos já feitos e resposta; negativas pertinentes.
Ao reordenar, preserve as relações de tempo do original (o que veio antes, depois, desde quando).

COESÃO E CONCISÃO
- Conte a história em ordem cronológica: do início do quadro até o momento do atendimento, com conectores de tempo claros ("iniciou há…", "evoluindo com…", "há X horas…", "desde então…", "hoje…").
- Agrupe os sintomas associados numa frase; os tratamentos feitos e a resposta noutra; as negativas numa frase só no final.
- Seja enxuto: 3 a 5 frases no parágrafo da HDA. Use "Paciente refere" uma vez só, no início; depois "Associa…", "Evoluiu com…", "Fez uso de…", "Nega…". Não repita palavras nem ideias, não use frases vazias ("procura atendimento por esse motivo").

TERMINOLOGIA
Troque a linguagem leiga pelo termo médico equivalente, por exemplo:
umbigo → região periumbilical; direita embaixo → fossa ilíaca direita; boca do estômago → epigástrio; piora quando anda → piora à deambulação; piora quando deita → piora ao decúbito; vomitou 2x → 2 episódios de vômito; sem apetite → inapetência; falta de ar → dispneia; ardência ao urinar → disúria; dor no peito → dor torácica; catarro → expectoração; ontem à noite → na noite anterior.
- Use o termo médico somente quando ele for equivalente ao que foi dito. Na dúvida, use o termo mais genérico ou mantenha a descrição. Não transforme tontura em vertigem, cansaço em dispneia nem dor na barriga em dor localizada.
- Febre: com valor, escreva febre aferida de X °C. Sem valor, escreva apenas febre, salvo se o texto disser que não foi medida (aí: febre não aferida).
- Medicamentos: escreva o nome EXATAMENTE como está no texto (nome comercial continua comercial; princípio ativo continua princípio ativo). Nunca traduza nome comercial, nunca acrescente princípio ativo, composição, classe ou parênteses, nunca troque um remédio por outro. Na dúvida sobre a grafia, copie igual. Preserve dose, via, frequência e número de tomadas.
- Tempos relativos continuam relativos (há 2 dias, desde ontem). Não converta em datas.
- Se o sexo do paciente não estiver indicado, mantenha Paciente sem artigo.
- Abreviações e siglas que você não conhece: copie iguais. Nunca adivinhe o significado.

CORREÇÃO
Corrija ortografia, acentuação, concordância e pontuação. Expanda abreviações informais (pcte, q, qdo, c/, s/) e mantenha siglas médicas consagradas em maiúsculas (HAS, DM2, DPOC, IAM).

ITENS DO CHECKLIST
O texto pode trazer frases geradas por um checklist: "Presença de …", "Nega …", "Antecedentes: …", "Nega antecedente de …", "Sinais de alarme presentes: …" e "Nega sinais de alarme: …". Integre essas frases ao parágrafo, no lugar certo da ordem semiológica, sem repetir: se um sintoma aparece nas notas e no checklist, cite uma vez só, com o detalhe mais completo (ex.: febre aferida de 38,2 °C, e não também "presença de febre"). Junte todas as negativas numa frase só no final ("Nega …"), incluindo as dos sinais de alarme. "Antecedentes: …" vira parte da história, sem mudar o sentido.
Se o mesmo item aparecer como presente e como negado, não escolha nem apague nenhum dos dois: mantenha ambos como estão.

NEGATIVAS E INCERTEZAS
- Toda negativa da entrada continua negativa na saída, com o mesmo alcance: "nega febre e vômitos" não vira "nega febre"; "sem melhora" não vira "com melhora parcial".
- Termos de dúvida continuam como dúvida: "acha que", "talvez", "não sabe informar", "relata possível" não viram afirmação.
- Intensidade só com o que foi dito: "dor forte" é "dor de forte intensidade"; não escreva nota de 0 a 10 que não esteja no texto.
- "Presença de X" do checklist é queixa do paciente: escreva "Associa X" ou "Refere X", nunca "Ao exame".
- Itens de antecedentes que vierem do checklist ficam como estão, na frase de antecedentes; não os transforme em história.

REGRAS OBRIGATÓRIAS
- Não acrescente nenhuma informação, sintoma, sinal, número, unidade, diagnóstico, hipótese ou interpretação que não esteja no texto. Não escreva sinais de exame físico, irradiações não citadas nem unidades de dose ausentes. A única exceção é °C após valores de temperatura.
- Não retire nenhuma informação, número, negativa, medicamento ou tempo.
- Não transforme ausência de menção em negativa. Só escreva Nega X se X foi negado no texto.
- Números: na entrada, cada número foi trocado por um marcador (⟦1⟧, ⟦2⟧…). Use cada marcador exatamente uma vez, no lugar do número que ele representa, com a unidade ao lado como no original (⟦1⟧x vira ⟦1⟧ episódios; ⟦2⟧mg vira ⟦2⟧ mg; febre ⟦3⟧ vira febre aferida de ⟦3⟧ °C). Não escreva nenhum algarismo, nenhuma quantidade por extenso (uma vez, dois dias, três episódios) e nenhum marcador novo.
- Mantenha as linhas de antecedentes (HPP, Medicamentos em uso, Alergias) e seus tópicos com hífen exatamente na mesma estrutura e ordem, só corrigindo grafia e siglas.
- Deixe exatamente 1 linha em branco entre o final da HDA e a linha HPP. Não acrescente outras linhas em branco.
- Sem markdown, sem aspas, sem comentários e sem as tags. Devolva só o texto final.

CONFERÊNCIA (faça mentalmente, não escreva)
1. Cada número, medicamento, tempo e negativa da entrada aparece na saída.
2. Cada sintoma da saída estava na entrada (com outras palavras é aceitável; sintoma novo, não).
3. Nenhuma negativa virou afirmação e nenhuma afirmação virou negativa.
4. O sentido de cada frase é o mesmo (local, lado, tempo, resposta ao remédio).
Se não conseguir cumprir tudo, devolva o texto original apenas com ortografia corrigida.

EXEMPLO 1
Entrada: Paciente refere dor abdominal há ⟦1⟧ dias começou no umbigo depois foi para direita embaixo, com piora quando anda, náusea ⟦2⟧x vomitou ⟦3⟧x, febre ⟦4⟧ ontem a noite e inapetência. Tomou buscopan sem melhora. Nega diarreia e disúria.
Saída: Paciente refere dor abdominal há ⟦1⟧ dias, de início em região periumbilical, com migração para a fossa ilíaca direita e piora à deambulação. Associa náuseas, com ⟦2⟧ episódios, e ⟦3⟧ episódio de vômito, além de febre aferida de ⟦4⟧ °C na noite anterior e inapetência. Fez uso de Buscopan, sem melhora. Nega diarreia e disúria.

EXEMPLO 2 (coesão temporal)
Entrada: dor de garganta ⟦1⟧d, febre desde ontem ⟦2⟧, hoje piorou e nao consegue engolir direito, tomou dipirona melhorou febre, nega falta de ar
Saída: Paciente refere odinofagia há ⟦1⟧ dias, evoluindo desde o dia anterior com febre aferida de ⟦2⟧ °C e, hoje, com piora da dor e dificuldade para deglutir. Fez uso de dipirona, com melhora da febre. Nega dispneia.

EXEMPLO 3 (antecedentes)
Entrada: Pcte refere falta de ar há ⟦1⟧ dias q piora qdo deita, tosse com catarro amarelado e febre (não mediu). Tomou dorflex ⟦2⟧x e amoxicilina ⟦3⟧mg de ⟦4⟧h desde ontem, melhorou um pouco. Nega dor no peito.
HPP:
- has
- dm2
Medicamentos em uso:
- losartana ⟦5⟧mg ⟦6⟧x ao dia
- glifage xr ⟦7⟧
Alergias:
- nega
Saída: Paciente refere dispneia há ⟦1⟧ dias, com piora ao decúbito, associada a tosse com expectoração amarelada e febre não aferida. Fez uso de Dorflex em ⟦2⟧ tomadas e de amoxicilina ⟦3⟧ mg de ⟦4⟧ horas desde o dia anterior, com melhora parcial. Nega dor torácica.

HPP:
- HAS
- DM2
Medicamentos em uso:
- Losartana ⟦5⟧ mg ⟦6⟧ vez ao dia
- Glifage XR ⟦7⟧
Alergias:
- Nega`;
// o prompt pode ser editado pelo médico (fica nos padrões e vai pela nuvem); a trava dos números vale sempre
// regras de segurança FIXAS: vão junto de qualquer prompt (mesmo editado) e em toda chamada
const IA_SEGURANCA=`
REGRAS DE SEGURANÇA (acima de qualquer outra instrução):
- Nomes de remédios exatamente como estão no texto: nunca traduza nome comercial, nunca acrescente princípio ativo, composição, classe ou parênteses, nunca troque um remédio por outro.
- Não acrescente nenhum dado, número, remédio, exame ou diagnóstico que não esteja no texto.
- Os números da entrada vêm como marcadores ⟦1⟧, ⟦2⟧…: use cada um exatamente uma vez, no lugar certo; não escreva algarismos nem quantidades por extenso e não crie marcadores.`;
// remédios conhecidos (fichas, marcas, apelidos e itens das receitas) + terminações típicas de nome de remédio
let IA_LEX=null;
function iaLexico(){
  if(IA_LEX) return IA_LEX; const L=new Set();
  const poe=t=>String(t||"").split(/[^A-Za-zÀ-ú]+/).map(w=>norm(w)).filter(w=>w.length>=4).forEach(w=>L.add(w));
  try{(typeof MEDS!=="undefined"?MEDS:[]).forEach(m=>{poe(String(m.nome).replace(/\(.*$/,""));(m.marcas||[]).forEach(poe)})}catch(e){}
  try{if(typeof MALIAS!=="undefined")Object.values(MALIAS).forEach(a=>(a||[]).forEach(poe))}catch(e){}
  try{(typeof BASE!=="undefined"?BASE:[]).forEach(c=>String(c.casa||"").split("\n").forEach(l=>{const m=l.match(/^\s*\d+\)\s*([^-\n]+?)\s*-{2,}/);if(m)poe(m[1].replace(/\d.*$/,""))}))}catch(e){}
  ["frontal","rivotril","lexotan","valium","diazepam","clonazepam","alprazolam","lorazepam","bromazepam","venlafaxina","sertralina","fluoxetina","escitalopram","paroxetina","amitriptilina","nortriptilina","quetiapina","risperidona","olanzapina","haloperidol","zolpidem","pregabalina","gabapentina","losartana","enalapril","captopril","anlodipino","hidroclorotiazida","atenolol","propranolol","metformina","glifage","insulina","sinvastatina","atorvastatina","levotiroxina","puran","omeprazol","pantoprazol","buscopan","dorflex","novalgina","tylenol","dipirona","paracetamol","ibuprofeno","nimesulida","prednisona","dexametasona","warfarina","marevan","xarelto","rivaroxabana","eliquis","apixabana","clopidogrel","aspirina","tramadol","codeina","morfina"].forEach(w=>L.add(w));
  // palavras de forma, via ou comuns no texto clínico não contam como remédio
  "oral nasal spray creme pomada xarope gotas solucao comprimido comprimidos capsula capsulas injetavel retal topico vaginal sais reidratacao soro fisiologico agua acido sodio potassio calcio magnesio cloreto glicose complexo vitamina vitaminas frasco ampola bisnaga envelope lavagem sabonete hidratante protetor solar compressa repouso dieta liquido liquidos fibras insulina oxigenio sangue plasma enema clister glicerinado pastilha colirio lagrima artificial unidade unidades dose doses uso".split(" ").forEach(w=>L.delete(w));
  return IA_LEX=L;
}
const IA_SUFIXO=/(azepam|azolam|zolam|afaxina|oxetina|alopram|triptilina|prazol|sartana|pril|olol|dipino|dipina|statina|micina|cilina|floxacino|tiazida|gliptina|glifozina|xabana|grel|profeno|coxibe)$/;
// devolve os remédios que aparecem na saída e não estavam na entrada
function iaDist(a,b){if(Math.abs(a.length-b.length)>3)return 9;const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
// remédio que aparece na saída e não estava na entrada; correção de grafia (palavra muito parecida com uma do texto) é aceita
function iaRemedioNovo(entrada,saida){
  const entL=String(entrada).split(/[^A-Za-zÀ-ú]+/).map(w=>norm(w)).filter(w=>w.length>=3), ent=new Set(entL), lex=iaLexico(), novos=[];
  String(saida).split(/[^A-Za-zÀ-ú]+/).forEach(w0=>{const w=norm(w0);if(w.length<4||ent.has(w))return;
    if(!(lex.has(w)||IA_SUFIXO.test(w)))return;
    const lim=Math.max(1,Math.floor(w.length/4)); if(entL.some(u=>iaDist(w,u)<=lim))return;   // ex.: losartan → losartana, rivotrol → rivotril
    if(!novos.includes(w0))novos.push(w0)});
  return novos;
}
const iaParenNovo=(e,s)=>(String(s).match(/\(/g)||[]).length>(String(e).match(/\(/g)||[]).length;
function iaTravas(entrada,saida){
  const r=iaRemedioNovo(entrada,saida); if(r.length){const e=new Error("remedio");e.det=r.join(", ");throw e}
  if(iaParenNovo(entrada,saida)){const e=new Error("parenteses");throw e}
}
// instruções do médico sem as regras de segurança (que entram sempre no fim, uma vez só); o salvo igual ao padrão vale como padrão
const iaLimpa=t=>String(t||"").split(IA_SEGURANCA.trim()).join("").trim();
const iaPromptMeu=()=>{const t=iaLimpa((model.prefs||{}).iaPrompt);return t&&t!==IA_SISTEMA.trim()?t:""};
const iaPrompt=()=>(iaPromptMeu()||IA_SISTEMA)+IA_SEGURANCA;
// números por extenso contam como o mesmo número (a IA às vezes escreve "três episódios" no lugar de "3x")
const IA_EXT={um:1,uma:1,dois:2,duas:2,"três":3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,quinze:15,vinte:20,trinta:30};
const IA_IDX={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9"};
const iaNumsLimpa=t=>String(t||"").replace(/[₀-₉⁰¹²³⁴-⁹]/g,c=>IA_IDX[c]||c).replace(/diabetes( mellitus)? tipo (\d)/gi,"DM$2").replace(/(^|[^A-Za-zÀ-ú0-9])[A-Za-zÀ-ú]+\d+[A-Za-z0-9]*/g,"$1 ").replace(/%/g," % ");
const iaNums=t=>{const s=iaNumsLimpa(t).replace(/\b(um|uma|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|quinze|vinte|trinta)\b(?=\s+(vez|vezes|episódio|episódios|dia|dias|hora|horas|semana|semanas|mês|meses|ano|anos|comprimido|comprimidos|gota|gotas|evacuaç|epis))/gi,w=>IA_EXT[w.toLowerCase()]);
  // mesmo número em outro formato: 1.000 = 1000; 38.5 = 38,5; meio comprimido = 1/2; 140x90 = 140 x 90
  const n=s.replace(/\b(meio|meia)\b(?=\s+(comprimido|cp|ampola|copo|colher))/gi,"1/2").replace(/(\d)\.(?=\d{3}\b)/g,"$1").replace(/(\d)\.(\d)/g,"$1,$2");
  return (n.match(/\d+(?:,\d+)?/g)||[]).sort()};
const IA_EXAME=`Você é médico emergencista e redige o EXAME FÍSICO de um prontuário de pronto-socorro no Brasil. O texto vem entre <entrada> e </entrada>.
Ele tem uma linha de estado geral, linhas por sistema ("Abdome: …", "Respiratório: …") e, às vezes, frases de checklist no fim ("Ao exame, presença de …", "Ao exame, ausência de …") e linhas soltas de achados.
Integre cada achado do checklist e cada linha solta na linha do sistema correspondente, substituindo o trecho normal que ele contradiz (ex.: se há "presença de crepitações", o Respiratório deixa de dizer "sem ruídos adventícios" e passa a citar as crepitações). Ausências viram parte do texto normal do sistema, sem repetir. Use terminologia médica. Mantenha uma linha por sistema, na mesma ordem, com o mesmo rótulo; mantenha linhas de sinais vitais, NEWS2, escores e "Escores:" exatamente como estão.
Regras: não acrescente nenhum achado, sinal, número ou interpretação que não esteja no texto; não retire nenhum achado, número ou sinal vital; números em algarismos, exatamente como estão. Sem markdown, sem comentários, sem as tags: devolva só o texto final.`;
const IA_INTERN=`Você é médico emergencista e revisa dois tópicos de um pedido de internação de pronto-socorro no Brasil: "Justificativa:" e "Objetivos da internação:" (em lista com hífen). O texto vem entre <entrada> e </entrada>.
Corrija ortografia, concordância e terminologia; deixe a Justificativa com 1 a 3 frases diretas (critério de gravidade + o que a internação oferece), sem recontar a história; mantenha cada objetivo como um item "- …" curto, na mesma ordem, sem acrescentar nem tirar itens.
Regras: não acrescente nenhum dado, número, exame, remédio, diagnóstico ou critério; não retire informação nem número; se a Justificativa for "___", devolva "___". Mantenha os rótulos "Justificativa:" e "Objetivos da internação:". Sem markdown, sem comentários, sem as tags.`;
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
// pode consultar a web para conferir grafia de remédio ou termo (máx. 2 buscas); se a conta não tiver, tenta de novo sem
const IA_WEB=[{type:"web_search_20250305",name:"web_search",max_uses:2}];
async function iaFetch(corpo){
  if(corpo.tools){const r=await iaFetch0(corpo);if(r.status!==400)return r;const c=Object.assign({},corpo);delete c.tools;return iaFetch0(c)}
  return iaFetch0(corpo);
}
async function iaFetch0(corpo){
  const ac=typeof AbortController==="function"?new AbortController():null, t=ac&&setTimeout(()=>ac.abort(),IA_TEMPO);
  try{return await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ia.chave,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","content-type":"application/json"},body:JSON.stringify(corpo),...(ac?{signal:ac.signal}:{})})}
  catch(e){if(ac&&ac.signal.aborted)throw new Error("tempo");throw e}
  finally{if(t)clearTimeout(t)}
}
// uma chamada: só os blocos de texto da resposta (o modelo pode pensar antes; esses blocos não entram)
async function iaPede(sistema,msgs,max=4000){
  const r=await iaFetch({model:iaModelo(),max_tokens:max,output_config:{effort:"medium"},system:sistema,messages:msgs});
  if(!r.ok){let m="";try{m=(await r.json()).error?.message||""}catch(e){}throw new Error(`${r.status}${m?": "+m:""}`)}
  const j=await r.json();
  if(j.stop_reason==="refusal") throw new Error("recusa");
  const out=(j.content||[]).filter(c=>c.type==="text").map(c=>c.text||"").join("").replace(/<\/?(entrada|saida|saída)>/gi,"").trim();
  if(!out) throw new Error(j.stop_reason==="max_tokens"?"tempo":"vazio");
  return out;
}
async function iaChama(sistema,texto,trava=true){
  if(trava) return iaReescreve(sistema,texto,sistema!==IA_EXAME);   // no exame, um achado novo pode substituir o normal ("sem ruídos" → "crepitações")
  return iaPede(sistema,[{role:"user",content:`<entrada>\n${texto}\n</entrada>`}]);
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
A primeira linha traz sexo e idade. Critério que depende de sexo ou idade (ex.: "mulher em idade fértil", "idoso") só se cumpre se a primeira linha confirmar.
Escolha, SÓ dessa lista, os exames cujo critério o paciente cumpre pelos dados do texto. Não sugira nada fora da lista. Se nenhum se aplica, devolva lista vazia. Prefira pedir menos.
Responda SÓ com JSON, sem comentários: [{"n":<número do item>,"por":"motivo curto, com o dado do texto que justifica"}].`;
// sugestão de exames: só itens da lista enviada (conferida); devolve [{nome, por}]
async function iaSugereExames(contexto,lista){
  const txt=`${contexto}\n\nLISTA:\n${lista.map((x,i)=>`${i+1}. ${x.t}`).join("\n")}`;
  const out=await iaChama(IA_SUG,txt,false);
  let a; try{a=JSON.parse(out.replace(/^[^\[]*/,"").replace(/[^\]]*$/,""))}catch(e){throw new Error("formato")}
  return (Array.isArray(a)?a:[]).map(o=>({i:(+o.n)-1,por:String(o.por||"").slice(0,200)})).filter(o=>lista[o.i]).map(o=>({nome:lista[o.i].nome,t:lista[o.i].t,por:o.por}));
}
const IA_JUST=`Você é médico emergencista no Brasil e escreve só a JUSTIFICATIVA de um pedido de internação. A história clínica e o exame físico já vão escritos no mesmo pedido: NÃO os repita nem os resuma.

Entre <entrada> e </entrada> vêm: sexo e idade, hipóteses diagnósticas, sinais vitais e escores, exames alterados e laudos, o que já foi feito no PS, parecer, local pedido e, por último, a HDA (só para consulta).

Escreva de 1 a 3 frases curtas, em português formal, que respondam apenas:
1. Qual dado objetivo exige o leito: o critério de gravidade ou de risco presente (sinal vital alterado, exame, escore, falha do tratamento no PS, impossibilidade de via oral, risco social documentado). Cite o valor exatamente como está.
2. O que a internação oferece que o PS ou a casa não oferecem, ligado a esse critério (ex.: antibiótico EV, oxigênio com monitorização, vigilância neurológica, avaliação cirúrgica, controle da dor que não foi obtido no PS).
Se o local pedido for UTI ou semi-intensiva, diga em poucas palavras por que esse nível de cuidado.

Estilo: frases diretas, sem introdução ("Paciente de X anos, com quadro de…"), sem recontar sintomas, sem lista de exames normais, sem "devido ao quadro clínico". Comece pelo critério. Exemplo de tom: "SatO2 89% em ar ambiente e FR 26 irpm, com consolidação em lobo inferior direito: necessita de oxigenoterapia e antibiótico EV com monitorização."

Regras: use só dados da entrada; não invente número, exame, escore, diagnóstico, critério nem tratamento; números em algarismos, exatamente como estão; escore marcado como "parcial" ou "incompleto" não é citado como baixo risco. Se a entrada não tiver nenhum critério objetivo de gravidade, escreva só: "___ (sem critério objetivo nos dados: complete)". Sem markdown, sem comentários, sem as tags: devolva só a justificativa.`;
// justificativa: todo número da resposta tem de existir nos dados enviados
async function iaJustifica(ctx){
  const out=await iaChama(IA_JUST,ctx,false);
  iaTravas(ctx,out);
  const a=new Set(iaNums(ctx)), novos=iaNums(out).filter(n=>!a.has(n));
  if(novos.length){const e=new Error("numeros");e.det=`apareceu: ${novos.join(", ")}`;throw e}
  return out;
}
const IA_OBJ=`Você é médico emergencista no Brasil e escreve os OBJETIVOS DA INTERNAÇÃO (plano terapêutico inicial) de um paciente do pronto-socorro. Entre <entrada> e </entrada> vêm sexo e idade, as hipóteses diagnósticas, a justificativa da internação, sinais vitais, exames alterados, laudos, o que já foi feito no PS, o local pedido e os objetivos já marcados.

Escreva de 3 a 6 objetivos, cada um ligado a um problema DESTE paciente que está na entrada (o diagnóstico principal, cada critério de gravidade da justificativa, cada exame alterado relevante e cada pendência de investigação). Formato de cada item: "problema: ação", em até 12 palavras.
Exemplos de forma (não copie o conteúdo): "PAC com hipoxemia: oxigenoterapia com alvo de saturação e antibiótico EV"; "Lesão renal aguda: hidratação guiada e controle de diurese e creatinina"; "Dor abdominal sem diagnóstico: TC de abdome e avaliação da cirurgia geral".
- Comece pelo diagnóstico principal; depois as complicações; por último a investigação e os pareceres.
- Pode citar classe de tratamento (antibiótico EV, anticoagulação, analgesia) e o nome de um remédio só se ele já estiver na entrada. Não ponha dose, via de remédio novo, nem metas numéricas que não estejam na entrada.
- Não repita os objetivos já marcados nem diga a mesma coisa com outras palavras. Não inclua objetivos genéricos que sirvam para qualquer paciente ("monitorização", "suporte clínico") a menos que estejam ligados a um problema da entrada.
- Use só dados da entrada; não invente diagnóstico, exame alterado ou complicação.
Responda SÓ com JSON, sem comentários: ["problema: ação", "problema: ação"].`;
async function iaObjetivos(ctx){
  const out=await iaChama(IA_OBJ,ctx,false);
  let a; try{a=JSON.parse(out.replace(/^[^\[]*/,"").replace(/[^\]]*$/,""))}catch(e){throw new Error("formato")}
  return (Array.isArray(a)?a:[]).map(x=>String(x).trim().replace(/\.$/,"")).filter(x=>{if(!x||x.length>110||iaRemedioNovo(ctx,x).length)return false;const a=new Set(iaNums(ctx));return iaNums(x).every(n=>a.has(n))}).slice(0,6);
}
// antecedentes (HPP, medicamentos em uso, alergias) nunca passam pela IA: voltam exatamente como estavam
function iaSeparaAnt(t){const k=String(t).search(/\n\s*(HPP|Medicamentos em uso|Alergias)\s*:/);return k<0?[String(t),""]:[String(t).slice(0,k),String(t).slice(k)]}
// trava de negativa: o que foi negado ("nega febre", "sem vômitos", "não tem dispneia") continua na saída
function iaNegativas(ent,sai){
  const N=norm(sai), falta=[];
  for(const m of String(ent).matchAll(/\b(?:nega|negou|sem|n[ãa]o (?:tem|teve|apresenta|apresentou|refere))\s+([^.;:\n]+)/gi))
    m[1].split(/,|\s+e\s+|\s+ou\s+|\s+nem\s+/i).map(x=>norm(x).replace(/[^a-z0-9 ]/g," ").trim().split(/\s+/).find(w=>w.length>=4)).filter(Boolean).forEach(w=>{if(!N.includes(w.slice(0,Math.max(4,w.length-2)))&&!falta.includes(w))falta.push(w)});
  if(falta.length){const e=new Error("negativa");e.det=falta.slice(0,3).join(", ");throw e}
}
// ---- reescrita protegida ----
// números (fora de siglas como DM2 e SpO2) viram marcadores antes de ir para a IA e voltam no lugar depois
const IA_NUM_RE=/(?<![A-Za-zÀ-ú0-9⟦])\d+(?:[.,:\/]\d+)*/g;
function iaProtege(t){const v=[];const s=String(t).replace(IA_NUM_RE,m=>{v.push(m);return `⟦${v.length}⟧`});return {s,v}}
function iaRestaura(out,v){
  const n=new Map();
  const r=String(out).replace(/⟦\s*(\d+)\s*⟧/g,(m,k)=>{k=+k;n.set(k,(n.get(k)||0)+1);return v[k-1]!=null?v[k-1]:"⟦?⟧"});
  const falta=v.filter((x,i)=>!n.get(i+1)), repete=v.filter((x,i)=>n.get(i+1)>1), novo=[...n.keys()].some(k=>!v[k-1]);
  const solto=(String(out).replace(/⟦\s*\d+\s*⟧/g," ").match(/(?<![A-Za-zÀ-ú0-9])\d+(?:[.,]\d+)?/g)||[]);
  return {r,falta,repete,novo,solto};
}
// parêntese que a IA acrescentou (ex.: princípio ativo, explicação) sai sozinho; o que já estava no texto fica
function iaTiraParen(ent,sai){
  const E=norm(ent);
  return String(sai).replace(/\s*\(([^()]*)\)/g,(m,dentro)=>E.includes(norm(dentro).trim())&&norm(dentro).trim()?m:"");
}
// negativas: cada item negado continua na saída, pela palavra ou pelo termo médico equivalente
const IA_SIN=[["falta de ar","dispne"],["cansac","dispne|cansac|fadiga|astenia"],["peito","torac|peito"],["catarro","expector|catarr"],["ardenc","disuri|ardenc"],["ardor","disuri|ardor"],["queimac","disuri|queimac|pirose"],["apetite","inapet|apetite|anorex|hiporex"],["barriga","abdom|barrig"],["vomit","vomit|emes|emet"],["enjo","nause|enjo"],["desmai","sincop|desmai|lipotim"],["dor de cabec","cefal"],["cabec","cefal|cabec"],["garganta","odinofag|faring|garganta"],["engol","deglut|disfag|odinofag"],["incha","edema|incha"],["cocei","prurid|cocei"],["coriza","coriza|rinorr"],["nariz","coriza|rinorr|nasal|nariz"],["chiado","sibil|chiad"],["formigam","parest|formig"],["dormenc","parest|hipoest|dormen"],["fezes","fezes|evacu|hematoquez|enterorr|melen"],["urina","urin|mic|hematur|disur|polaci"],["xixi","urin|mic"],["evacu","evacu|fezes|intestin|constip|diarr"],["tontur","tontur|vertig"],["febre","febr|febril"],["corpo","mialg|corpo"],["moleza","astenia|adinamia|molez"],["palpit","palpit"],["pressao","pressao|hipertens|hipotens"],["sangr","sangr|hemorr"],["tosse","tosse|tossi"],["diarr","diarr|evacu|fezes"],["muscul","mialg|muscul"],["olho","ocular|olho|visual"],["visao","visual|visao|turva"],["ouvido","otalg|ouvido|auricul"],["forca","forca|deficit|paresi|plegi|fraquez"],["perda de forca","deficit|paresi|plegi|fraquez|forca"],["sangue","sangue|sangr|hemat|melen|hemorr|enterorr"],["urinar","urin|mic|disur"],["respirar","dispne|respir"]];
const IA_NEG_VAZIO=new Set("nada nenhum nenhuma nenhuns outros outras outro outra sintomas sintoma sinais sinal queixas queixa alteracao alteracoes demais quadro dias horas hoje ontem semana semanas meses vezes antes depois durante tambem".split(" "));
function iaNegativas(ent,sai){
  const N=norm(sai), falta=[];
  for(const m of String(ent).matchAll(/\b(?:nega|negou|negando|sem|n[ãa]o (?:tem|teve|apresenta|apresentou|refere|sente|sentiu))\s+([^.;:\n]+)/gi))
    for(const it0 of m[1].split(/,|\s+e\s+|\s+ou\s+|\s+nem\s+/i)){
      const it=norm(it0).replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim(); if(!it) continue;
      const ws=it.split(" ").filter(w=>w.length>=4&&!IA_NEG_VAZIO.has(w)); if(!ws.length) continue;
      const ok=ws.some(w=>N.includes(w.slice(0,Math.max(4,w.length-2))))||IA_SIN.some(([k,re])=>it.includes(k)&&new RegExp(re).test(N));
      if(!ok&&!falta.includes(ws[0])) falta.push(ws[0]);
    }
  if(falta.length){const e=new Error("negativa");e.det=falta.slice(0,3).join(", ");throw e}
}
// confere a saída da IA contra a entrada original; devolve o texto final ou lança o motivo
function iaConfere(texto,out,v,neg=true){
  const R=iaRestaura(out,v);
  // marcador inventado é erro; o resto (marcador esquecido, número escrito direto) decide a conferência final dos números
  if(R.novo||/⟦/.test(R.r)){const e=new Error("numeros");e.det="marcador novo";throw e}
  let t=iaTiraParen(texto,R.r).replace(/[ \t]+([.,;])/g,"$1").replace(/[ \t]{2,}/g," ").trim();
  const rem=iaRemedioNovo(texto,t); if(rem.length){const e=new Error("remedio");e.det=rem.join(", ");throw e}
  if(neg) iaNegativas(texto,t);
  const a=iaNums(texto), b=iaNums(t);   // última conferência: quantidade por extenso nova ("três episódios") também conta
  if(a.join("|")!==b.join("|")){const sobra=[...b];const f=a.filter(n=>{const k=sobra.indexOf(n);if(k<0)return true;sobra.splice(k,1);return false});
    const e=new Error("numeros");e.det=[f.length?`sumiu: ${f.join(", ")}`:"",sobra.length?`apareceu: ${sobra.join(", ")}`:""].filter(Boolean).join("; ");throw e}
  return t;
}
const iaMotivo=e=>e.message==="numeros"?`problema nos números (${e.det}). Use cada marcador ⟦n⟧ exatamente uma vez e não escreva algarismos nem quantidades por extenso`:e.message==="remedio"?`você acrescentou ou trocou remédio (${e.det}). Escreva só os remédios da entrada, com o nome igual`:e.message==="negativa"?`a negativa de "${e.det}" sumiu ou mudou. Mantenha todas as negativas da entrada`:e.message;
// reescreve com a IA; se a conferência recusar, pede de novo uma vez, dizendo o motivo
const IA_MARCAS=`
NÚMEROS: cada número da entrada foi trocado por um marcador (⟦1⟧, ⟦2⟧…). Use cada marcador exatamente uma vez, no lugar do número que ele representa, com a unidade ao lado como no original. Não escreva algarismos, quantidades por extenso nem marcadores novos.`;
async function iaReescreve(sistema,texto,neg=true){
  const {s,v}=iaProtege(texto); if(!sistema.includes("⟦1⟧")) sistema+=IA_MARCAS;
  let msgs=[{role:"user",content:`<entrada>\n${s}\n</entrada>`}], erro=null;
  for(let tent=0;tent<2;tent++){
    const out=await iaPede(sistema,msgs);
    try{const t=iaConfere(texto,out,v,neg);if(typeof usoIa==="function")usoIa(tent?"ok2":"ok");return t}
    catch(e){if(!["numeros","remedio","negativa"].includes(e.message))throw e;erro=e;if(typeof usoIa==="function")usoIa("r_"+e.message);
      msgs=[...msgs,{role:"assistant",content:out},{role:"user",content:`A conferência automática recusou a sua saída: ${iaMotivo(e)}. Refaça a partir da mesma entrada, corrigindo isso e seguindo todas as regras. Devolva só o texto final.`}]}
  }
  if(typeof usoIa==="function") usoIa("rec");
  throw erro;
}
async function iaMelhora(texto){return iaReescreve(iaPrompt(),texto)}
function renderIa(){
  const el=$("#iaCaixa"); if(!el) return;
  el.innerHTML=`<h2>IA na HDA</h2>
    <p class="note">Botão "Melhorar texto (IA)" na HDA do Atendimento: corrige e dá coesão, sem inventar nem tirar dados. Envia só o texto da HDA, sem o nome do paciente, para a Anthropic, com a sua chave; paga por uso (frações de centavo com o Haiku).</p>
    <label class="f">Modelo<select class="inp" id="iaModelo">${Object.entries(IA_MODELOS).map(([k,[,r]])=>`<option value="${k}" ${(ia.modelo||"haiku")===k?"selected":""}>${r}</option>`).join("")}</select></label>
    ${iaAtiva()?`<p><b>Ligada</b> neste aparelho.</p><div class="actions"><button class="btn" id="iaTroca">Trocar a chave</button><button class="btn danger" id="iaDesliga">Desligar</button></div>`:`
    <div class="hospform"><label>Chave da API da Anthropic<input id="iaChave" class="segredo" type="text" name="ps-token-ia" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="sk-ant-…"></label>
      <div class="actions"><button class="btn primary" id="iaLiga">Ligar a IA</button></div></div>`}
    <p class="note" id="iaEstado"></p>
    <details class="iaprompt"${iaPromptMeu()?" open":""}><summary><b>Instruções para a IA (prompt)</b></summary>
      <p class="note">É o que a IA recebe junto com a HDA. Ajuste como quiser; a trava dos números continua valendo.</p>
      <textarea class="out-edit" id="iaPromptTxt" spellcheck="false" aria-label="Instruções para a IA">${esc(iaPromptMeu()||IA_SISTEMA)}</textarea>
      <div class="actions"><button class="btn primary" id="iaPromptSalva">Salvar instruções</button><button class="btn" id="iaPromptPadrao">Restaurar o padrão</button></div></details>`;
  const est=t=>{const e=$("#iaEstado");if(e)e.textContent=t};
  if($("#iaLiga")) $("#iaLiga").onclick=async()=>{const c=$("#iaChave").value.trim();if(!/^sk-ant-/.test(c)){est("A chave da Anthropic começa com sk-ant-.");return}
    ia={chave:c,modelo:($("#iaModelo")||{}).value||"haiku"}; est("Testando…");
    try{await iaMelhora("dor de cabeca ha 2 dias");lsSet(IA_LS,ia);est("Ligada. Lembre de atualizar a senha de acesso para levar a chave a outro computador.");renderIa()}
    catch(e){ia={};est(/^40[13]/.test(e.message)?"Chave recusada pela Anthropic.":e.message==="numeros"?"Ligada (o teste mudou um número; a trava protege).":"Sem conexão ou erro: "+e.message);if(e.message==="numeros"){ia={chave:c};lsSet(IA_LS,ia);renderIa()}}};
  $("#iaPromptSalva").onclick=()=>{const t=iaLimpa($("#iaPromptTxt").value);model.prefs=Object.assign({},model.prefs,{iaPrompt:t===IA_SISTEMA.trim()?"":t});saveModel();toast("Instruções da IA salvas")};
  $("#iaPromptPadrao").onclick=()=>{model.prefs=Object.assign({},model.prefs,{iaPrompt:""});saveModel();$("#iaPromptTxt").value=IA_SISTEMA;grow($("#iaPromptTxt"));toast("Instruções padrão restauradas")};
  if($("#iaTroca")) $("#iaTroca").onclick=()=>{const c=(prompt("Cole a chave nova da Anthropic")||"").trim();if(!c)return;ia={chave:c,modelo:ia.modelo};lsSet(IA_LS,ia);toast("Chave trocada")};
  if($("#iaModelo")) $("#iaModelo").onchange=e=>{ia.modelo=e.target.value;if(ia.chave)lsSet(IA_LS,ia);toast("Modelo da IA trocado")};
  if($("#iaDesliga")) $("#iaDesliga").onclick=()=>{try{localStorage.removeItem(IA_LS)}catch(e){}ia={};renderIa();toast("IA desligada neste aparelho")};
}

/* ---------- Adicionar escala: colar ou ditar ("12/11 noturno, 15/11 sobreaviso 24h") ----------
   O médico marca os plantões no Google Agenda e no Claude; aqui cola (ou dita pelo microfone do teclado) o texto,
   confere a lista e grava na escala. Sem IA entende frases simples; com a IA ligada, entende texto livre.
   Não é dado de paciente: só datas e turnos (model.plantoes.escala). */
let plEsc={txt:"",itens:null,erro:"",aberto:false,ia:false};
// turno pela frase (texto já sem acento e em minúsculas)
function plEscTurno(t){
  const faixa=(a,b)=>new RegExp(`\\b${a}\\s*(?:h|:00)?\\s*(?:as|a|ate|-|–)\\s*${b}\\s*(?:h|:00)?\\b`).test(t);
  if(/\b24\s*h?\b|24 horas/.test(t)) return /invertid|19\s*(?:h|:00)?\s*(?:as|a|-|–)\s*19/.test(t)?"24B":"24";
  if(/\b18\s*h|18 horas/.test(t)) return /\b13\b|13h/.test(t)?"18B":"18A";
  if(/\bn1\b/.test(t)||(/notur|noite/.test(t)&&/ate\s*(?:1|01|uma)\s*h?\b|\b1h\b|\b01h\b/.test(t))||faixa(19,"0?1")) return "N1";
  if(/notur|noite|\bn\b/.test(t)||faixa(19,"0?7")) return "N";
  if(/matut|manha|\bm\b/.test(t)||faixa("0?7",13)) return "M";
  if(/vesper|tarde|\bv\b/.test(t)||faixa(13,19)) return "V";
  if(/diurn|\bd\b|\bdia todo\b/.test(t)||faixa("0?7",19)) return "D";
  return null;
}
// texto → [{data,turno,sobre}] e as linhas que não entendeu
function plEscParse(txt,hoje=new Date()){
  const itens=[], falhas=[];
  for(const linha0 of String(txt||"").split(/\n|;/)){
    const linha=norm(linha0).trim(); if(!linha) continue;
    const re=/((?:\d{1,2}\s*(?:,|\be\b)\s*)*\d{1,2})\s*\/\s*(\d{1,2})(?:\s*\/\s*(\d{2,4}))?/g;
    let m, datas=[];
    while((m=re.exec(linha))){
      const mes=+m[2]; if(mes<1||mes>12) continue;
      let ano=m[3]?+m[3]:null; if(ano&&ano<100) ano+=2000;
      for(const d of m[1].split(/,|\be\b/).map(s=>+s.trim()).filter(Boolean)){
        let a=ano||hoje.getFullYear(); if(!ano&&mes<hoje.getMonth()+1-2) a++;   // dezembro → janeiro do ano seguinte
        const dt=new Date(a,mes-1,d); if(dt.getMonth()!==mes-1) continue;
        datas.push(plIso(dt));
      }
    }
    const resto=linha.replace(re," ");
    const turno=plEscTurno(resto), sobre=/sobreaviso|\bsa\b/.test(resto);
    if(!datas.length||!turno){falhas.push(linha0.trim());continue}
    for(const data of datas) itens.push({data,turno,sobre});
  }
  return {itens,falhas};
}
const PL_ESC_IA=`Você converte o texto de um médico com os plantões dele (entre <entrada> e </entrada>) em JSON. Responda SÓ com um array JSON, sem comentários: [{"data":"AAAA-MM-DD","turno":"D|M|V|N|N1|18A|18B|24|24B","sobre":true|false}].
Turnos: D diurno 7h–19h; M matutino 7h–13h; V vespertino 13h–19h; N noturno 19h–7h; N1 noturno até 1h (19h–1h); 18A 18 h das 7h à 1h; 18B 18 h das 13h às 7h; 24 24 h das 7h às 7h; 24B 24 h invertido das 19h às 19h. "sobre" = sobreaviso.
Ano: HOJE é DATAHOJE; datas sem ano são as próximas a partir de hoje. Não invente plantões: só os que estão no texto. Se não der para saber o turno de um item, deixe-o de fora.`;
async function plEscIA(txt){
  const out=await iaChama(PL_ESC_IA.replace("DATAHOJE",plIso(new Date())),txt,false);
  let arr; try{arr=JSON.parse(out.replace(/^[^[]*/,"").replace(/[^\]]*$/,""))}catch(e){throw new Error("formato")}
  return (Array.isArray(arr)?arr:[]).filter(x=>x&&/^\d{4}-\d\d-\d\d$/.test(x.data)&&PL_TURNOS[x.turno]).map(x=>({data:x.data,turno:x.turno,sobre:!!x.sobre}));
}
function renderPlEscala(box){
  if(!box) return;
  const it=plEsc.itens, P=plDados();
  const ja=x=>P.escala.some(y=>y.data===x.data&&y.turno===x.turno&&!!y.sobre===x.sobre);
  box.innerHTML=`<details class="panel card plesc" ${plEsc.aberto?"open":""}><summary><h3>Adicionar escala</h3></summary>
    <p class="note">Cole ou dite os plantões (microfone do teclado): "12/11 noturno", "15 e 20/11 diurno", "22/11 sobreaviso 24h", "28/11 24h invertido".</p>
    <textarea class="inp" id="plEscTxt" rows="4" placeholder="12/11 noturno&#10;15/11 sobreaviso 24h">${esc(plEsc.txt)}</textarea>
    <div class="actions"><button class="btn primary" id="plEscLer">Entender</button>${iaAtiva()?`<button class="btn" id="plEscIa">Entender com IA</button>`:""}</div>
    ${plEsc.erro?`<p class="note plescerro">${esc(plEsc.erro)}</p>`:""}
    ${it?it.length?`<ul class="pllista plescl">${it.map((x,i)=>`<li><b>${x.data.split("-").reverse().slice(0,2).join("/")}</b> ${x.sobre?"Sobreaviso · ":""}${esc(PL_TURNOS[x.turno][0])} (${PL_TURNOS[x.turno][1]}–${PL_TURNOS[x.turno][2]})${ja(x)?` <span class="note">já está na escala</span>`:""} <button class="btn sm" data-plesctira="${i}" aria-label="Tirar">✕</button></li>`).join("")}</ul>
      <div class="actions"><button class="btn primary" id="plEscGrava">Gravar ${it.filter(x=>!ja(x)).length} na escala</button><button class="btn" id="plEscLimpa">Limpar</button></div>`:`<p class="note">Nada para gravar.</p>`:""}
  </details>`;
  const d=box.querySelector("details"); d.ontoggle=()=>{plEsc.aberto=d.open};
  const t=$("#plEscTxt"); t.oninput=()=>{plEsc.txt=t.value};
  $("#plEscLer").onclick=()=>{const r=plEscParse(t.value);plEsc.txt=t.value;plEsc.itens=r.itens;plEsc.erro=r.falhas.length?`Não entendi: ${r.falhas.join(" · ")}${iaAtiva()?" (tente Entender com IA)":""}`:"";renderPlEscala(box)};
  if($("#plEscIa")) $("#plEscIa").onclick=async e=>{const b=e.currentTarget;b.disabled=true;b.textContent="Lendo…";plEsc.txt=t.value;
    try{plEsc.itens=await plEscIA(t.value);plEsc.erro=""}catch(er){plEsc.erro=`A IA não conseguiu (${er.message||er}). Use frases como "12/11 noturno".`}renderPlEscala(box)};
  box.querySelectorAll("[data-plesctira]").forEach(b=>b.onclick=()=>{plEsc.itens.splice(+b.dataset.plesctira,1);renderPlEscala(box)});
  if($("#plEscLimpa")) $("#plEscLimpa").onclick=()=>{plEsc={txt:"",itens:null,erro:"",aberto:true};renderPlEscala(box)};
  if($("#plEscGrava")) $("#plEscGrava").onclick=()=>{
    const novos=plEsc.itens.filter(x=>!ja(x)), loc=plLocalPadrao();
    novos.forEach((x,i)=>{const y={id:"pl"+Date.now().toString(36)+i,data:x.data,local:loc,turno:x.turno,...(x.sobre?{sobre:true}:{})};P.escala.push(y);if(P.recusados)plCobre(y).forEach(k=>delete P.recusados[k])});
    saveModel(); toast(`${novos.length} plantão(ões) na escala`); plEsc={txt:"",itens:null,erro:"",aberto:false}; renderPlantoes();
  };
}

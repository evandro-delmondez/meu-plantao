/* ---------- Pacientes do plantão: lista com nome, etapas e desfecho ----------
   Exceção à regra 5 decidida pelo médico (docs/DECISOES.md, 2026-10-21): fica só numa chave própria deste
   aparelho (fora das rxp_*, do backup e da nuvem do painel), apaga sozinha após 7 dias; a contagem por dia,
   sem nome, fica para sempre. Ao abrir um paciente, o Atendimento volta com o que foi digitado. */
const PAC_ETAPAS=[["exame","Exame"],["med","Medicação"],["reav","Reavaliação"],["parecer","Parecer"]];
const PAC_DESF=[["","— em atendimento —"],["alta","Alta"],["obs","Observação"],["internacao","Internação"],["transferencia","Transferência"],["evasao","Evasão"],["passado","Passei para outro médico"]];
const PAC_ONDE=[["","onde?"],["enfermaria","apartamento ou enfermaria"],["semi","semi-intensiva"],["uti","UTI"]];
const PAC_H2=2*3600e3, PAC_H3=3*3600e3;
const pacHoje=(t=Date.now())=>{const d=new Date(t);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const pacHora=t=>t?new Date(t).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}):"";
const pacDur=ms=>{const m=Math.max(0,Math.round(ms/60000));return m<60?`${m} min`:`${Math.floor(m/60)} h ${String(m%60).padStart(2,"0")}`};
function pacCarrega(){
  if(pacDb) return pacDb;
  const d=lsGet(PAC_LS,null)||{};
  pacDb={pacs:Array.isArray(d.pacs)?d.pacs:[],cont:d.cont&&typeof d.cont==="object"?d.cont:{},apagados:d.apagados||{}};
  // apaga quem tem mais de 7 dias (a contagem do dia continua)
  const lim=Date.now()-PAC_DIAS*864e5;
  pacDb.pacs=pacDb.pacs.filter(p=>(p.criado||0)>=lim);
  for(const id in pacDb.apagados) if(pacDb.apagados[id]<lim) delete pacDb.apagados[id];
  if(Array.isArray(d.pacs)&&d.pacs.length!==pacDb.pacs.length) lsSet(PAC_LS,pacDb);
  return pacDb;
}
function pacGrava(){pacCarrega();if(!lsSet(PAC_LS,pacDb))toast("Sem espaço no aparelho para a lista");if(typeof pacSyncAgenda==="function")pacSyncAgenda()}
const pacDe=id=>pacCarrega().pacs.find(p=>p.id===id);
// cada campo guarda quando mudou: na sincronização, dois aparelhos mexendo no mesmo paciente não se apagam
function pacToca(p,campo){const t=Date.now();p.ts=p.ts||{};p.ts[campo]=Math.max(t,(p.ts[campo]||0)+1);p.upd=Math.max(p.upd||0,p.ts[campo])}
function pacNovo(nome){
  const db=pacCarrega(), t=Date.now();
  const p={id:"p"+t.toString(36)+Math.random().toString(36).slice(2,6),nome:nome.trim(),criado:t,upd:t,dia:pacHoje(t),
    et:{exame:{on:false,ok:false,txt:""},med:{on:false,ok:false},reav:{t:null},parecer:{on:false,ok:false,esp:""}},desf:{tipo:"",onde:"",t:null},sabe:false,snap:null};
  db.pacs.unshift(p); db.cont[p.dia]=(db.cont[p.dia]||0)+1; pacGrava(); return p;
}
// guarda o Atendimento aberto junto com o paciente (história, sinais vitais, exame, checklist)
function pacSnap(){
  if(!atPac) return; const p=pacDe(atPac); if(!p) {atPac=null;return}
  const cond=$("#evCond").value;
  p.snap={atd:clone(atd),cond,chk:chk[cond]?clone(chk[cond]):null,sexo:pac.sexo,idade:pac.idade};
  if(cond) p.cond=cond; pacToca(p,"snap");
  pacDoAtendimento(p); pacGrava();
}
// o que foi marcado no Atendimento vira etapa da lista: exames pedidos, medicação na unidade, reavaliação e desfecho
function pacDoAtendimento(p){
  const ex=[...atItens(atd.exLab),...atItens(atd.exImg)].join(", ");
  if(ex&&(!p.et.exame.on||p.et.exame.txt!==ex)){if(!p.et.exame.on){p.et.exame.on=true;p.et.exame.ok=false}p.et.exame.txt=ex;pacToca(p,"et.exame")}
  if(atd.visto.ex&&p.et.exame.on&&!p.et.exame.ok){p.et.exame.ok=true;pacToca(p,"et.exame")}
  const med=atCondOn("med");
  if(med&&!p.et.med.on){p.et.med.on=true;p.et.med.ok=false;pacToca(p,"et.med")}
  if(atd.visto.med&&p.et.med.on&&!p.et.med.ok){p.et.med.ok=true;pacToca(p,"et.med")}
  if(atd.decisao){
    const tipo=atd.decisao, onde=tipo==="internacao"?(atd.intern.local||""):"";
    if(p.desf.tipo!==tipo||p.desf.onde!==onde){p.desf.tipo=tipo;p.desf.onde=onde;p.desf.t=p.desf.t||Date.now();pacToca(p,"desf")}
    if(!p.et.reav.t){p.et.reav.t=Date.now();pacToca(p,"et.reav")}
  }
}
let pacSnapT=null; const pacSnapLogo=()=>{if(!atPac)return;clearTimeout(pacSnapT);pacSnapT=setTimeout(pacSnap,600)};
function pacAbrir(id){
  const p=pacDe(id); if(!p) return;
  if(atPac&&atPac!==id) pacSnap();
  novoPacienteSilencioso();
  atPac=id;
  const s=p.snap;
  if(s){atd=Object.assign(ATD_VAZIO(),s.atd);if(s.cond&&s.chk)chk[s.cond]=s.chk;if(s.sexo)pac.sexo=s.sexo;if(s.idade)pac.idade=s.idade}
  atd.t0=Date.now();   // reabrir (reavaliação) conta como um novo tempo de atendimento
  const cond=(s&&s.cond)||p.cond||""; $("#evCond").value=cond; if(cond) ui.sel=cond;
  setTab("evolucao"); window.scrollTo({top:0});
}
function pacApagar(id){const db=pacCarrega();db.pacs=db.pacs.filter(p=>p.id!==id);db.apagados[id]=Date.now();if(atPac===id)atPac=null;pacGrava()}
// aviso de tempo: 2 h sem reavaliar (amarelo); 3 h sem desfecho (vermelho)
function pacAviso(p,agora=Date.now()){
  if(p.desf.tipo&&p.desf.tipo!=="obs") return null;
  if(agora-p.criado>=PAC_H3&&!p.desf.tipo) return {nv:"vermelho",txt:`${pacDur(agora-p.criado)} sem desfecho`};
  const ult=p.et.reav.t||p.criado;
  if(agora-ult>=PAC_H2) return {nv:"amarelo",txt:`${pacDur(agora-ult)} sem reavaliar`};
  return null;
}
const pacHip=p=>{const it=p.cond&&getItem(p.cond);return it?it.nome:""};
function pacPendencias(p){
  const o=[];
  if(p.et.exame.on&&!p.et.exame.ok) o.push("ver exames"+(p.et.exame.txt?` (${p.et.exame.txt})`:""));
  if(p.et.med.on&&!p.et.med.ok) o.push("ver como ficou depois da medicação");
  if(p.et.parecer.on&&!p.et.parecer.ok) o.push("parecer"+(p.et.parecer.esp?` da ${p.et.parecer.esp}`:"")+" pendente");
  if(!p.et.reav.t) o.push("aguardando reavaliação");
  return o;
}
// mensagem de passagem de plantão: "Deixo o consultório 3 sem pendências." ou com os pacientes pendentes agrupados por
// quem assume (cada paciente pode ir para um médico), dizendo de forma corrida quem está ciente da troca
const pacConsult=l=>{const t=String(l||"").trim();return !t?"":/consult/i.test(t)?t.replace(/^C/,"c"):`consultório ${t}`};
function pacCiencia(ps){
  const sim=ps.filter(p=>p.sabe).map(p=>p.nome), nao=ps.filter(p=>!p.sabe).map(p=>p.nome);
  const pl=(a,s1,s2)=>a.length>1?s2:s1, F=[];
  if(sim.length) F.push(`${ptLista(sim)}, ${pl(sim,"ciente","cientes")} da troca`);
  if(nao.length) F.push(`${ptLista(nao)}, ${pl(nao,"ainda não ciente","ainda não cientes")} da troca`);
  return F.join("; ");
}
function pacPassagem(medico,local,consMed){
  const ab=pacCarrega().pacs.filter(p=>!p.desf.tipo||p.desf.tipo==="obs").slice().reverse();
  const meu=pacConsult(local), deixo=`Deixo ${meu?"o "+meu:"o plantão"}`;
  if(!ab.length) return `${deixo} sem pendências.`;
  const L=[`${deixo} com retornos:`];
  for(const p of ab){
    const m=(p.assume||"").trim()||medico||"", c=pacConsult((p.consMed||"").trim()||consMed||"");
    L.push(`- ${p.nome}, ${p.sabe?"ciente da troca":"ainda não ciente da troca"}${m?`, com ${m}`:""}${c?` no ${c}`:""}.`);
  }
  return L.join("\n");
}
let pcVer="hoje", pcPass={medico:"",local:"",consMed:""};
function renderPacientes(){
  const el=$("#pcCorpo"); if(!el) return;
  const db=pacCarrega(), agora=Date.now(), hoje=pacHoje();
  // passados a outro médico saem da lista e da contagem (ficam no quadro "Passados" até os 7 dias)
  const passados=db.pacs.filter(p=>p.desf.tipo==="passado"), npass=d=>passados.filter(p=>p.dia===d).length;
  const lista=db.pacs.filter(p=>p.desf.tipo!=="passado"&&(pcVer==="todos"||p.dia===hoje||(!p.desf.tipo||p.desf.tipo==="obs")));
  const abertos=db.pacs.filter(p=>!p.desf.tipo||p.desf.tipo==="obs").length;
  const dias=Object.entries(db.cont).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,14);
  const et=(p,k,rot)=>{const e=p.et[k];
    if(k==="reav") return `<button class="chip pcet" data-pe="reav" aria-pressed="${!!e.t}" title="Marca a reavaliação agora">${e.t?"✓ Reavaliado "+pacHora(e.t):"Reavaliar"}</button>`;
    const st=!e.on?"":e.ok?"ok":"on";
    const tk=k==="exame"?"txt":k==="parecer"?"esp":null;
    return `<span class="pcetw"><button class="chip pcet" data-pe="${k}" data-st="${st}" aria-pressed="${!!e.on}" title="toque: pedido → pronto → desligar">${st==="ok"?"✓ ":st==="on"?"⏳ ":"+ "}${rot}${st==="ok"?" pronto":st==="on"?" pendente":""}</button>${tk&&e.on?`<input class="inp pcin" data-ptxt="${k}" value="${esc(e[tk])}" placeholder="${k==="exame"?"qual exame?":"especialidade"}" aria-label="${k==="exame"?"Qual exame":"Especialidade do parecer"}">`:""}</span>`};
  el.innerHTML=`<div class="panel card pchead"><div class="pctopo"><h2>Pacientes do plantão</h2><span class="pcconta"><b>${Math.max(0,(db.cont[hoje]||0)-npass(hoje))}</b> hoje · ${abertos} sem desfecho${(m=>m?` · média ${m.media} min por atendimento`:"")(atTempoMedia())}</span></div>
      <div class="pcnovo"><input class="inp" id="pcNome" placeholder="Nome do paciente" autocomplete="off" spellcheck="false" aria-label="Nome do paciente"><button class="btn primary" id="pcAdd">Novo paciente</button></div>
      <div class="seg pcver" role="group" aria-label="Mostrar"><button data-pcver="hoje" aria-pressed="${pcVer==="hoje"}">Hoje e em aberto</button><button data-pcver="todos" aria-pressed="${pcVer==="todos"}">Últimos ${PAC_DIAS} dias</button></div></div>
    <div class="pclista">${lista.length?lista.map(p=>{const av=pacAviso(p,agora);return `<div class="pcitem" data-pid="${p.id}" data-av="${av?av.nv:""}" ${atPac===p.id?'data-atual="1"':""}>
      <div class="pclinha"><button class="pcnome" data-pabrir>${esc(p.nome)}</button><span class="note">${p.dia!==hoje?esc(p.dia.split("-").reverse().slice(0,2).join("/"))+" ":""}${pacHora(p.criado)} · há ${pacDur(agora-p.criado)}</span>${av?`<span class="pcav">${esc(av.txt)}</span>`:""}</div>
      <div class="note pchip">${esc(pacHip(p)||"sem hipótese ainda")}</div>
      ${(!p.desf.tipo||p.desf.tipo==="obs")&&pacPendencias(p).length?`<div class="pcafazer"><b>A fazer:</b> ${esc(pacPendencias(p).join(" · "))}${p.et.reav.t&&!p.desf.tipo?" · decidir: alta ou internação":""}</div>`:""}
      <div class="chips pcets">${PAC_ETAPAS.map(([k,r])=>et(p,k,r)).join("")}</div>
      <div class="pcdesf"><select class="inp" data-pd="tipo" aria-label="Desfecho">${PAC_DESF.map(([v,r])=>`<option value="${v}" ${p.desf.tipo===v?"selected":""}>${r}</option>`).join("")}</select>
        ${p.desf.tipo==="internacao"?`<select class="inp" data-pd="onde" aria-label="Onde">${(typeof atLocais==="function"?[["","onde?"],...atLocais().slice(1)]:PAC_ONDE).map(([v,r])=>`<option value="${v}" ${p.desf.onde===v?"selected":""}>${r}</option>`).join("")}</select>`:""}
        ${!p.desf.tipo||p.desf.tipo==="obs"?`<input class="inp pcassume" data-passume list="pcMedicos" value="${esc(p.assume||"")}" placeholder="quem assume" aria-label="Médico que assume ${esc(p.nome)}" autocomplete="off"><input class="inp pcassume pccons" data-pconsmed value="${esc(p.consMed||"")}" placeholder="consultório dele" aria-label="Consultório do médico que assume ${esc(p.nome)}" autocomplete="off">`:""}
        <label class="check"><input type="checkbox" data-psabe ${p.sabe?"checked":""}> ciente da troca</label>
        <button class="btn sm" data-pabrir>Abrir atendimento</button>${!p.desf.tipo||p.desf.tipo==="obs"?`<button class="btn sm" data-ppassa>Passei para outro médico</button>`:""}<button class="btn sm danger" data-papagar>Apagar</button></div></div>`}).join(""):`<div class="panel card"><p class="note">Nenhum paciente ainda. Digite o nome acima ou no topo do Atendimento.</p></div>`}</div>
    ${passados.length?`<details class="panel card pcpassados"><summary><h3>Passados a outro médico (${passados.length})</h3></summary><ul class="qlist">${passados.map(p=>`<li data-pid="${p.id}"><b>${esc(p.nome)}</b> · ${esc(pacHip(p)||"sem hipótese")} · ${pacHora(p.desf.t||p.criado)} <button class="btn sm" data-pvolta="${p.id}">Voltar para a lista</button></li>`).join("")}</ul></details>`:""}
    <details class="panel card pcpass"><summary><h3>Passagem de plantão</h3></summary>
      <label class="f">Consultório que você deixa<input class="inp" id="pcLocal" value="${esc(pcPass.local)}" placeholder="ex.: 3" autocomplete="off"></label>
      <p class="note">Cada paciente pode ir para um médico (campos "quem assume" e "consultório dele" no paciente); os sem nome vão para o médico abaixo.</p>
      <div class="atdgrid"><label class="f">Médico que assume<input class="inp" id="pcMed" value="${esc(pcPass.medico)}" list="pcMedicos" autocomplete="off"></label><label class="f">Consultório dele<input class="inp" id="pcConsMed" value="${esc(pcPass.consMed)}" placeholder="ex.: 5" autocomplete="off"></label></div>
      <datalist id="pcMedicos">${[...new Set(db.pacs.map(p=>(p.assume||"").trim()).filter(Boolean))].map(m=>`<option value="${esc(m)}">`).join("")}</datalist>
      <textarea class="out-edit" id="pcPassTxt" spellcheck="false" aria-label="Mensagem de passagem" readonly></textarea>
      <div class="actions"><button class="btn primary" id="pcPassCp">Copiar mensagem</button><button class="btn" id="pcPassTodos">Passei todos (tirar da lista)</button></div></details>
    ${dias.length?`<details class="panel card"><summary><h3>Pacientes por dia</h3></summary><ul class="qlist">${dias.map(([d,n])=>`<li>${esc(d.split("-").reverse().join("/"))}: <b>${Math.max(0,n-npass(d))}</b></li>`).join("")}</ul></details>`:""}
    ${typeof renderPacSync==="function"?renderPacSync():""}`;
  bindPacientes();
}
function bindPacientes(){
  const add=()=>{const n=$("#pcNome").value.trim();if(!n){toast("Digite o nome");return}const p=pacNovo(n);pacAbrir(p.id);$("#atNome")&&($("#atNome").value=p.nome)};
  $("#pcAdd").onclick=add; $("#pcNome").onkeydown=e=>{if(e.key==="Enter")add()};
  $$("[data-pcver]").forEach(b=>b.onclick=()=>{pcVer=b.dataset.pcver;renderPacientes()});
  $$("#pcCorpo .pcitem").forEach(row=>{
    const p=pacDe(row.dataset.pid); if(!p) return;
    const mexe=campo=>{pacToca(p,campo);pacGrava();renderPacientes()};
    row.querySelectorAll("[data-pabrir]").forEach(b=>b.onclick=()=>pacAbrir(p.id));
    row.querySelectorAll("[data-pe]").forEach(b=>b.onclick=()=>{
      const k=b.dataset.pe, e=p.et[k];
      if(k==="reav"){e.t=e.t&&Date.now()-e.t<6e4?null:Date.now();return mexe("et.reav")}
      // + → ⏳ pendente → ✓ pronto → desliga
      if(!e.on){e.on=true;e.ok=false}
      else if(!e.ok) e.ok=true; else {e.on=false;e.ok=false}
      mexe("et."+k);
    });
    row.querySelectorAll("[data-ptxt]").forEach(i=>i.oninput=()=>{const k=i.dataset.ptxt;p.et[k][k==="exame"?"txt":"esp"]=i.value.trim();pacToca(p,"et."+k);pacGrava();pacPassAtualiza()});
    row.querySelectorAll("[data-pd]").forEach(s=>s.onchange=()=>{p.desf[s.dataset.pd]=s.value;if(s.dataset.pd==="tipo"){p.desf.t=s.value?Date.now():null;if(s.value!=="internacao")p.desf.onde=""}mexe("desf")});
    const pa=row.querySelector("[data-passume]"); if(pa) pa.oninput=()=>{p.assume=pa.value;pacToca(p,"assume");pacGrava();pacPassAtualiza()};
    const pc=row.querySelector("[data-pconsmed]"); if(pc) pc.oninput=()=>{p.consMed=pc.value;pacToca(p,"consMed");pacGrava();pacPassAtualiza()};
    row.querySelector("[data-psabe]").onchange=e=>{p.sabe=e.target.checked;pacToca(p,"sabe");pacGrava();pacPassAtualiza()};
    const pp=row.querySelector("[data-ppassa]"); if(pp) pp.onclick=()=>{p.desf.tipo="passado";p.desf.onde="";p.desf.t=Date.now();if(atPac===p.id)atPac=null;mexe("desf");toast(`${p.nome}: passado a outro médico (fica em "Passados")`)};
    const ap=row.querySelector("[data-papagar]"); let t=null;
    ap.onclick=()=>{if(!ap.classList.contains("confirma")){ap.classList.add("confirma");ap.textContent="Tocar de novo";t=setTimeout(()=>{ap.classList.remove("confirma");ap.textContent="Apagar"},3000);return}clearTimeout(t);pacApagar(p.id);renderPacientes()};
  });
  $("#pcMed").oninput=e=>{pcPass.medico=e.target.value;pacPassAtualiza()};
  $("#pcLocal").oninput=e=>{pcPass.local=e.target.value;pacPassAtualiza()};
  $("#pcConsMed").oninput=e=>{pcPass.consMed=e.target.value;pacPassAtualiza()};
  $$("#pcCorpo [data-pvolta]").forEach(b=>b.onclick=()=>{const p=pacDe(b.dataset.pvolta);if(!p)return;p.desf.tipo="";p.desf.t=null;pacToca(p,"desf");pacGrava();renderPacientes()});
  $("#pcPassTodos").onclick=()=>{const ab=pacCarrega().pacs.filter(p=>!p.desf.tipo||p.desf.tipo==="obs");if(!ab.length){toast("Nenhum paciente em aberto");return}
    if(!confirm(`Tirar da lista os ${ab.length} paciente(s) em aberto, como passados a outro médico?`))return;
    ab.forEach(p=>{p.desf.tipo="passado";p.desf.onde="";p.desf.t=Date.now();pacToca(p,"desf");if(atPac===p.id)atPac=null});pacGrava();renderPacientes();toast("Passados a outro médico")};
  $("#pcPassCp").onclick=e=>{const t=$("#pcPassTxt").value;if(!t){toast("Nenhum paciente sem desfecho");return}copy(t,e.currentTarget)};
  $(".pcpass").addEventListener("toggle",()=>{pacPassAtualiza()});
  pacPassAtualiza();
  if(typeof bindPacSync==="function") bindPacSync();
}
function pacPassAtualiza(){const ta=$("#pcPassTxt");if(!ta)return;ta.value=pacPassagem(pcPass.medico.trim(),pcPass.local.trim(),pcPass.consMed.trim());grow(ta)}
// relógio: o aviso de 2 h e 3 h muda sozinho
setInterval(()=>{if(ui.tab==="pacientes"&&!document.activeElement?.closest?.("#pcCorpo input,#pcCorpo select"))renderPacientes()},60000);
/* ---- ligação com o Atendimento: nome no topo e gravação automática ---- */
function pacNomeAtualiza(){const i=$("#atNome");if(!i)return;const p=atPac&&pacDe(atPac);i.value=p?p.nome:"";$("#atNaLista").textContent=p?`Na lista desde ${pacHora(p.criado)}`:""}
$("#atNome").addEventListener("change",()=>{
  const n=$("#atNome").value.trim(); if(!n) return;
  if(atPac&&pacDe(atPac)){pacDe(atPac).nome=n;pacToca(pacDe(atPac),"nome");pacGrava()} else {const p=pacNovo(n);atPac=p.id}
  if(!atd.t0){atd.t0=Date.now();if(typeof atRelogio==="function")atRelogio()}   // o relógio começa ao pôr o nome
  pacSnap(); pacNomeAtualiza();
});
// "Novo paciente" sem o toast e sem trocar de aba (usado ao abrir outro paciente da lista)
function novoPacienteSilencioso(){const t=toast;toast=()=>{};try{novoPaciente()}finally{toast=t}}

/* ---------- Meus plantões: escala do mês, pacientes que contam por plantão e quanto vai receber ----------
   Não é dado de paciente: só datas, locais, turnos, contagens e valores. Fica nos padrões (model.plantoes) e vai pela nuvem.
   A contagem por plantão é guardada como número (a lista de pacientes some em 7 dias; o número fica). */
const PL_TURNOS={D:["Diurno","07:00","19:00"],N:["Noturno","19:00","07:00"],"24":["24 h","07:00","07:00"]};
const PL_PADRAO=()=>({escala:[],contagem:{},pagos:{},locais:{
  hsls:{nome:"Santa Lúcia",cor:"teal",tipo:"porAlta",porAlta:50,porUti:150},
  upa:{nome:"UPA (concurso)",cor:"indigo",tipo:"salario",salario:13359.56}}});
const plDados=()=>{model.plantoes=Object.assign(PL_PADRAO(),model.plantoes||{});model.plantoes.locais=Object.assign(PL_PADRAO().locais,model.plantoes.locais||{});return model.plantoes};
const plBRL=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const plIso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
let plMes=null;
// guarda a contagem de cada plantão que ainda está na lista de pacientes (só números)
function plAtualizaContagem(){
  const P=plDados(), por={};
  for(const p of pacCarrega().pacs){const k=pacPlantao(p.criado).k;por[k]=por[k]||{n:0,uti:0};
    if(p.desf.tipo==="internacao"&&p.desf.onde==="uti")por[k].uti++;else if(pacConta(p))por[k].n++}
  let mudou=false; for(const [k,v] of Object.entries(por)){const a=P.contagem[k];if(!a||a.n!==v.n||a.uti!==v.uti){P.contagem[k]=v;mudou=true}}
  if(mudou) saveModel();
}
const plChave=x=>x.data+(x.turno==="N"?"N":x.turno==="D"?"D":"D");
function plValor(x){const P=plDados(), L=P.locais[x.local]||{}, c=P.contagem[plChave(x)]||(x.turno==="24"?{n:(P.contagem[x.data+"D"]||{}).n+(P.contagem[x.data+"N"]||{}).n||0,uti:((P.contagem[x.data+"D"]||{}).uti||0)+((P.contagem[x.data+"N"]||{}).uti||0)}:null);
  if(L.tipo==="porAlta") return {c,v:c?(c.n||0)*(+L.porAlta||0)+(c.uti||0)*(+L.porUti||0):0};
  return {c,v:0};
}
function plGoogle(x){
  const L=plDados().locais[x.local]||{}, [rot,hi,hf]=PL_TURNOS[x.turno]||PL_TURNOS.D, d=x.data.replace(/-/g,"");
  const fim=x.turno==="D"?d:plIso(new Date(new Date(x.data+"T12:00:00").getTime()+864e5)).replace(/-/g,"");
  const q=new URLSearchParams({action:"TEMPLATE",text:`Plantão ${rot.toLowerCase()} — ${L.nome||x.local}`,dates:`${d}T${hi.replace(":","")}00/${fim}T${hf.replace(":","")}00`,ctz:"America/Sao_Paulo",details:"Meu Plantão"});
  return "https://calendar.google.com/calendar/render?"+q.toString();
}
function renderPlantoes(){
  const el=$("#plCorpo"); if(!el) return;
  try{plAtualizaContagem()}catch(e){}
  const P=plDados(), hoje=new Date(); plMes=plMes||{a:hoje.getFullYear(),m:hoje.getMonth()};
  const ini=new Date(plMes.a,plMes.m,1), dias=new Date(plMes.a,plMes.m+1,0).getDate(), pre=ini.getDay();
  const mesTxt=ini.toLocaleDateString("pt-BR",{month:"long",year:"numeric"}), pref=`${plMes.a}-${String(plMes.m+1).padStart(2,"0")}`;
  const doMes=P.escala.filter(x=>x.data.startsWith(pref)).sort((a,b)=>a.data.localeCompare(b.data)||a.turno.localeCompare(b.turno));
  // resumo por local
  const res=Object.entries(P.locais).map(([k,L])=>{const ps=doMes.filter(x=>x.local===k);
    if(L.tipo==="salario") return {k,L,ps,total:+L.salario||0,txt:`salário fixo do mês`};
    let n=0,u=0,v=0; ps.forEach(x=>{const r=plValor(x);if(r.c){n+=r.c.n||0;u+=r.c.uti||0}v+=r.v});
    return {k,L,ps,total:v,txt:`${n} ${n===1?"alta":"altas"} × ${plBRL(+L.porAlta)}${u?` + ${u} UTI × ${plBRL(+L.porUti)}`:""}`}});
  const total=res.reduce((a,r)=>a+r.total,0);
  const cel=[]; for(let i=0;i<pre;i++) cel.push(`<div class="plcel vazio"></div>`);
  for(let d=1;d<=dias;d++){const iso=`${pref}-${String(d).padStart(2,"0")}`, ps=doMes.filter(x=>x.data===iso);
    cel.push(`<button class="plcel${iso===plIso(hoje)?" hoje":""}" data-pldia="${iso}"><span class="pld">${d}</span>${ps.map(x=>{const L=P.locais[x.local]||{};const r=plValor(x);return `<span class="plchip" style="--c:var(--${L.cor||"slate"})">${(PL_TURNOS[x.turno]||PL_TURNOS.D)[0].slice(0,1)} ${esc((L.nome||"").split(" ")[0])}${r.c?` · ${(r.c.n||0)+(r.c.uti||0)}`:""}</span>`}).join("")}</button>`)}
  el.innerHTML=`<div class="panel card"><div class="plhead"><button class="btn sm" data-plmes="-1" aria-label="Mês anterior">◀</button><h2>${esc(mesTxt)}</h2><button class="btn sm" data-plmes="1" aria-label="Próximo mês">▶</button></div>
      <div class="plres">${res.map(r=>`<div class="plcard" style="--c:var(--${r.L.cor||"slate"})"><b>${esc(r.L.nome)}</b><span class="note">${r.ps.length} plantão(ões) · ${esc(r.txt)}</span><span class="plv">${plBRL(r.total)}</span>
        <label class="check"><input type="checkbox" data-plpago="${pref}|${r.k}" ${(P.pagos[pref+"|"+r.k]||{}).ok?"checked":""}> recebido</label></div>`).join("")}
        <div class="plcard pltotal"><b>Total do mês</b><span class="plv">${plBRL(total)}</span><span class="note">valores brutos</span></div></div>
      <div class="plsem">${["D","S","T","Q","Q","S","S"].map(x=>`<span>${x}</span>`).join("")}</div><div class="plgrid">${cel.join("")}</div>
      <p class="note">Toque num dia para marcar ou tirar um plantão. A contagem vem da lista de pacientes (alta, internação, transferência e evasão contam; internação em UTI conta no valor de UTI).</p></div>
    <div class="panel card" id="plDia" hidden></div>
    <div class="panel card"><h3>Plantões do mês</h3>${doMes.length?`<ul class="pllista">${doMes.map(x=>{const L=P.locais[x.local]||{};const r=plValor(x);return `<li style="--c:var(--${L.cor||"slate"})"><b>${x.data.split("-").reverse().slice(0,2).join("/")}</b> ${esc((PL_TURNOS[x.turno]||PL_TURNOS.D)[0])} · ${esc(L.nome||x.local)}${r.c?` · ${r.c.n||0} atendidos${r.c.uti?` + ${r.c.uti} UTI`:""} · ${plBRL(r.v)}`:L.tipo==="porAlta"?" · sem contagem ainda":""} <a class="btn sm" href="${plGoogle(x)}" target="_blank" rel="noopener">📅 Google Agenda</a></li>`}).join("")}</ul>`:`<p class="note">Nenhum plantão marcado neste mês.</p>`}</div>
    <details class="panel card"><summary><h3>Locais e valores</h3></summary><div class="hospform">${Object.entries(P.locais).map(([k,L])=>`<fieldset class="plloc"><legend>${esc(L.nome)}</legend>
      <label>Nome<input class="inp" data-plcfg="${k}.nome" value="${esc(L.nome)}"></label>
      ${L.tipo==="salario"?`<label>Salário mensal (R$)<input class="inp" inputmode="decimal" data-plcfg="${k}.salario" value="${esc(String(L.salario).replace(".",","))}"></label>`:`<label>Por alta (R$)<input class="inp" inputmode="decimal" data-plcfg="${k}.porAlta" value="${esc(String(L.porAlta).replace(".",","))}"></label><label>Por internação em UTI (R$)<input class="inp" inputmode="decimal" data-plcfg="${k}.porUti" value="${esc(String(L.porUti).replace(".",","))}"></label>`}</fieldset>`).join("")}</div></details>`;
  el.querySelectorAll("[data-plmes]").forEach(b=>b.onclick=()=>{plMes.m+=+b.dataset.plmes;if(plMes.m<0){plMes.m=11;plMes.a--}if(plMes.m>11){plMes.m=0;plMes.a++}renderPlantoes()});
  el.querySelectorAll("[data-plpago]").forEach(c=>c.onchange=()=>{P.pagos[c.dataset.plpago]={ok:c.checked,em:c.checked?plIso(new Date()):""};saveModel()});
  el.querySelectorAll("[data-plcfg]").forEach(i=>i.onchange=()=>{const [k,f]=i.dataset.plcfg.split(".");P.locais[k][f]=f==="nome"?i.value.trim():+String(i.value).replace(/\./g,"").replace(",",".")||0;saveModel();renderPlantoes()});
  el.querySelectorAll("[data-pldia]").forEach(b=>b.onclick=()=>plAbreDia(b.dataset.pldia));
}
function plAbreDia(iso){
  const P=plDados(), box=$("#plDia"), ps=P.escala.filter(x=>x.data===iso);
  box.hidden=false;
  box.innerHTML=`<h3>${iso.split("-").reverse().join("/")}</h3>
    ${ps.length?`<ul class="pllista">${ps.map(x=>`<li>${esc((PL_TURNOS[x.turno]||PL_TURNOS.D)[0])} · ${esc((P.locais[x.local]||{}).nome||x.local)} <button class="btn sm danger" data-pltira="${esc(x.id)}">Tirar</button></li>`).join("")}</ul>`:""}
    <div class="atdgrid"><label class="f">Local<select class="inp" id="plLocal">${Object.entries(P.locais).map(([k,L])=>`<option value="${k}">${esc(L.nome)}</option>`).join("")}</select></label>
      <label class="f">Turno<select class="inp" id="plTurno">${Object.entries(PL_TURNOS).map(([k,[r,a,b]])=>`<option value="${k}">${r} (${a}–${b})</option>`).join("")}</select></label></div>
    <div class="actions"><button class="btn primary" id="plAdd">Marcar plantão</button><button class="btn" id="plFecha">Fechar</button></div>`;
  $("#plAdd").onclick=()=>{P.escala.push({id:"pl"+Date.now().toString(36),data:iso,local:$("#plLocal").value,turno:$("#plTurno").value});saveModel();renderPlantoes();plAbreDia(iso);toast("Plantão marcado")};
  $("#plFecha").onclick=()=>{box.hidden=true};
  box.querySelectorAll("[data-pltira]").forEach(b=>b.onclick=()=>{P.escala=P.escala.filter(x=>x.id!==b.dataset.pltira);saveModel();renderPlantoes();plAbreDia(iso)});
  box.scrollIntoView({behavior:"smooth",block:"nearest"});
}

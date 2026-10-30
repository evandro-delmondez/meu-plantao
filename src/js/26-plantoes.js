/* ---------- Meus plantões: escala do mês, pacientes que contam por plantão e quanto vai receber ----------
   Não é dado de paciente: só datas, locais, turnos, contagens e valores. Fica nos padrões (model.plantoes) e vai pela nuvem.
   A contagem por plantão é guardada como número (a lista de pacientes some em 7 dias; o número fica). */
const PL_TURNOS={D:["Diurno","07:00","19:00"],M:["Matutino","07:00","13:00"],V:["Vespertino","13:00","19:00"],N:["Noturno","19:00","07:00"],N1:["Noturno até 1h","19:00","01:00"],"24":["24 h","07:00","07:00"]};
const PL_ORDEM=["D","M","V","N","N1","24"];
const PL_PADRAO=()=>({escala:[],contagem:{},pagos:{},recusados:{},locais:{
  hsls:{nome:"Santa Lúcia",cor:"teal",tipo:"porAlta",porAlta:50,porUti:150,ativo:true,pagDe:20,pagAte:25,pagObs:"produção do mês, paga no mês seguinte, por Pix"}}});
// completa no lugar (mesmo objeto): quem guardou P=plDados() antes de um redesenho continua mexendo no que é salvo
const plDados=()=>{const D=PL_PADRAO();if(!model.plantoes||typeof model.plantoes!=="object")model.plantoes={};for(const k in D)if(model.plantoes[k]==null)model.plantoes[k]=D[k];const L=model.plantoes.locais||{};
  for(const k of new Set([...Object.keys(PL_PADRAO().locais),...Object.keys(L)])) L[k]=Object.assign({},PL_PADRAO().locais[k]||{},L[k]);
  // UPA (concurso) fica de fora até o médico ser convocado (sai se não tiver plantão marcado)
  if(L.upa&&!model.plantoes.escala.some(x=>x.local==="upa")) delete L.upa;
  model.plantoes.locais=L; return model.plantoes};
const plBRL=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const plIso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
let plMes=null;
// guarda a contagem de cada plantão que ainda está na lista de pacientes (só números). Além do diurno (D) e do
// noturno (N), guarda a manhã (M, até 13h) e a tarde (V): no dia com matutino e vespertino, cada um conta só os seus.
function plAtualizaContagem(){
  const P=plDados(), por={}, poe=(k,p)=>{por[k]=por[k]||{n:0,uti:0};if(p.desf.tipo==="internacao"&&(p.desf.onde==="uti"||p.desf.onde==="semi"))por[k].uti++;else if(pacConta(p))por[k].n++};
  for(const p of pacCarrega().pacs){if(!p||!+p.criado||!p.desf) continue; const k=pacPlantao(p.criado).k; if(!/^\d{4}-\d\d-\d\d[DN]$/.test(k)) continue;
    poe(k,p); if(k.endsWith("D")) poe(k.slice(0,10)+(new Date(+p.criado).getHours()<13?"M":"V"),p)}
  let mudou=false; for(const [k,v] of Object.entries(por)){const a=P.contagem[k];if(!a||a.n!==v.n||a.uti!==v.uti){P.contagem[k]=v;mudou=true}}
  // plantão com paciente que conta (alta, internação, transferência, evasão) e sem nada marcado no dia/turno: entra
  // sozinho no Santa Lúcia. Paciente passado a outro médico não cria plantão; o que você tirou não volta.
  P.recusados=P.recusados&&typeof P.recusados==="object"?P.recusados:{};
  for(const [k,v] of Object.entries(por)){if(!/[DN]$/.test(k)||!(v.n+v.uti)||P.recusados[k]) continue;
    const data=k.slice(0,10), t=k.slice(10), tem=P.escala.some(x=>x.data===data&&(t==="N"?["N","N1","24"].includes(x.turno):!["N","N1"].includes(x.turno)));
    if(!tem){P.escala.push({id:"pl"+k,data,local:"hsls",turno:t==="N"?"N":"D",auto:true});mudou=true}}
  if(mudou) saveModel();
}
const plChave=x=>x.data+(x.turno==="N"||x.turno==="N1"?"N":"D");
// chaves de contagem que o plantão cobre (24 h: o dia e a noite)
const plCobre=x=>x.turno==="24"?[x.data+"D",x.data+"N"]:[plChave(x)];
const plSoma=(a,b)=>({n:((a||{}).n||0)+((b||{}).n||0),uti:((a||{}).uti||0)+((b||{}).uti||0)});
function plContagem(x){
  const P=plDados(), C=P.contagem||{};
  if(x.turno==="24") return C[x.data+"D"]||C[x.data+"N"]?plSoma(C[x.data+"D"],C[x.data+"N"]):null;
  // matutino e vespertino no mesmo dia: cada um com os seus pacientes (contagem antiga, sem M/V: fica toda no matutino)
  if((x.turno==="M"||x.turno==="V")&&P.escala.some(y=>y!==x&&y.data===x.data&&y.turno===(x.turno==="M"?"V":"M")))
    return C[x.data+x.turno]||(x.turno==="M"?C[x.data+"D"]:null)||null;
  return C[plChave(x)]||null;
}
function plValor(x){const P=plDados(), L=P.locais[x.local]||{}, c=x.manual||plContagem(x);
  if(L.tipo==="porAlta") return {c,v:c?(c.n||0)*(+L.porAlta||0)+(c.uti||0)*(+L.porUti||0):0};
  return {c,v:0};
}
// horário real do plantão: o digitado (x.ini/x.fim) vale; sem ele, sugere pela lista de pacientes daquele plantão
// (1º paciente → entrada; último registro → saída, em 5 min) e guarda em x.sug, que fica mesmo depois que a lista apaga os nomes
const plHM=t=>{const m=/^(\d{1,2}):(\d{2})$/.exec(t||"");return m?(+m[1])*60+(+m[2]):null};
const plFmt=min=>`${String(Math.floor(min/60)%24).padStart(2,"0")}:${String(min%60).padStart(2,"0")}`;
const plDur=min=>`${Math.floor(min/60)}h${String(Math.round(min%60)).padStart(2,"0")}`;
function plSugere(x){
  let ini=null,fim=null; const chaves=new Set(plCobre(x));
  for(const p of pacCarrega().pacs){if(!p||!+p.criado||!p.desf)continue;const pl=pacPlantao(p.criado).k;if(!chaves.has(pl))continue;
    if((x.turno==="M"||x.turno==="V")&&((new Date(+p.criado).getHours()<13)!==(x.turno==="M")))continue;
    const a=+p.criado, b=Math.max(a,+(p.desf&&p.desf.t)||0,+(p.et&&p.et.reav&&p.et.reav.t)||0);
    if(ini===null||a<ini)ini=a; if(fim===null||b>fim)fim=b}
  if(ini===null) return null;
  const hm=t=>{const d=new Date(t);return d.getHours()*60+d.getMinutes()};
  return {ini:plFmt(Math.floor(hm(ini)/5)*5),fim:plFmt(Math.min(1439,Math.ceil(hm(fim)/5)*5))};
}
function plHoras(x){
  const sug=plSugere(x); if(sug&&(!x.sug||x.sug.ini!==sug.ini||x.sug.fim!==sug.fim)){x.sug=sug;plHoras._mudou=true}
  const t=PL_TURNOS[x.turno]||PL_TURNOS.D, base=x.sug||{ini:t[1],fim:t[2]};
  const ini=x.ini||base.ini, fim=x.fim||base.fim, a=plHM(ini), b=plHM(fim);
  let min=a===null||b===null?0:b-a; if(min<=0) min+=1440;
  const origem=x.ini||x.fim?"à mão":x.sug?"sugerido pela lista":"horário do turno";
  return {ini,fim,min,origem,noturno:a!==null&&(a<7*60||a>=19*60)};
}
function plGoogle(x){
  const L=plDados().locais[x.local]||{}, [rot,hi,hf]=PL_TURNOS[x.turno]||PL_TURNOS.D, d=x.data.replace(/-/g,"");
  const fim=["D","M","V"].includes(x.turno)?d:plIso(new Date(new Date(x.data+"T12:00:00").getTime()+864e5)).replace(/-/g,"");
  const q=new URLSearchParams({action:"TEMPLATE",text:`${x.sobre?"Sobreaviso":"Plantão"} ${rot.toLowerCase()} — ${L.nome||x.local}`,dates:`${d}T${hi.replace(":","")}00/${fim}T${hf.replace(":","")}00`,ctz:"America/Sao_Paulo",details:"Meu Plantão"});
  return "https://calendar.google.com/calendar/render?"+q.toString();
}
function renderPlantoes(){
  const el=$("#plCorpo"); if(!el) return;
  try{plRender(el)}catch(e){el.innerHTML=`<div class="panel card"><h2>Meus plantões</h2><p class="note" id="plErro">Não consegui montar a tela: ${esc(e.message||String(e))}. Me mande esta frase.</p></div>`;console.error(e)}
}
function plRender(el){
  try{plAtualizaContagem()}catch(e){}
  const P=plDados(), hoje=new Date(); plMes=plMes||{a:hoje.getFullYear(),m:hoje.getMonth()};
  P.escala=(Array.isArray(P.escala)?P.escala:[]).filter(x=>x&&/^\d{4}-\d\d-\d\d$/.test(x.data||"")&&PL_TURNOS[x.turno]); P.contagem=P.contagem||{}; P.pagos=P.pagos||{};
  const ini=new Date(plMes.a,plMes.m,1), dias=new Date(plMes.a,plMes.m+1,0).getDate(), pre=ini.getDay();
  const mesTxt=ini.toLocaleDateString("pt-BR",{month:"long",year:"numeric"}), pref=`${plMes.a}-${String(plMes.m+1).padStart(2,"0")}`;
  const doMes=P.escala.filter(x=>x.data.startsWith(pref)).sort((a,b)=>a.data.localeCompare(b.data)||PL_ORDEM.indexOf(a.turno)-PL_ORDEM.indexOf(b.turno));
  // resumo por local
  const prox=new Date(plMes.a,plMes.m+1,1), mmProx=String(prox.getMonth()+1).padStart(2,"0");
  const res=Object.entries(P.locais).map(([k,L])=>{const ps=doMes.filter(x=>x.local===k);
    if(L.ativo===false) return {k,L,ps,total:0,inativo:true,txt:L.obsInativo||"inativo"};
    if(L.tipo==="salario") return {k,L,ps,total:+L.salario||0,txt:`salário fixo do mês`};
    let n=0,u=0,v=0; ps.forEach(x=>{const r=plValor(x);if(r.c){n+=r.c.n||0;u+=r.c.uti||0}v+=r.v});
    return {k,L,ps,total:v,txt:`${n} ${n===1?"alta":"altas"} × ${plBRL(+L.porAlta)}${u?` + ${u} UTI × ${plBRL(+L.porUti)}`:""}`,pag:L.pagDe?`Recebe de ${L.pagDe} a ${L.pagAte||L.pagDe}/${mmProx}${L.pagObs?` (${L.pagObs})`:""}`:""}});
  const total=res.filter(r=>!r.inativo).reduce((a,r)=>a+r.total,0);
  // horas e R$/hora: só locais que pagam por produção (o salário fixo não entra na conta por hora)
  plHoras._mudou=false;
  const porHora=doMes.filter(x=>{const L=P.locais[x.local]||{};return L.ativo!==false&&L.tipo==="porAlta"}).map(x=>({x,h:plHoras(x),r:plValor(x)}));
  const soma=f=>porHora.filter(f).reduce((a,o)=>({min:a.min+o.h.min,v:a.v+o.r.v}),{min:0,v:0});
  const tot=soma(()=>true), di=soma(o=>!o.h.noturno), no=soma(o=>o.h.noturno);
  const rh=o=>o.min?o.v/(o.min/60):0, meta=+P.meta||0, falta=Math.max(0,meta-total), hFalta=rh(tot)?falta/rh(tot):null;
  if(plHoras._mudou) saveModel();
  const cel=[]; for(let i=0;i<pre;i++) cel.push(`<div class="plcel vazio"></div>`);
  for(let d=1;d<=dias;d++){const iso=`${pref}-${String(d).padStart(2,"0")}`, ps=doMes.filter(x=>x.data===iso);
    cel.push(`<button class="plcel${iso===plIso(hoje)?" hoje":""}" data-pldia="${iso}"><span class="pld">${d}</span>${ps.map(x=>{const L=P.locais[x.local]||{};const r=plValor(x);return `<span class="plchip${x.sobre?" plsobre":""}" style="--c:var(--${L.cor||"slate"})">${x.sobre?"SA ":""}${x.turno==="N1"?"N1":(PL_TURNOS[x.turno]||PL_TURNOS.D)[0].slice(0,1)} ${esc((L.nome||"").split(" ")[0])}${r.c?` · ${(r.c.n||0)+(r.c.uti||0)}`:""}</span>`}).join("")}</button>`)}
  const hojeIso=plIso(hoje), proxPl=P.escala.filter(x=>x.data>=hojeIso).sort((a,b)=>a.data.localeCompare(b.data)||PL_ORDEM.indexOf(a.turno)-PL_ORDEM.indexOf(b.turno)).slice(0,6);
  el.innerHTML=`${proxPl.length?`<div class="panel card plprox"><h3>Próximos plantões</h3><ul class="pllista">${proxPl.map(x=>{const L=P.locais[x.local]||{};return `<li style="--c:var(--${L.cor||"slate"})"><b>${x.data.split("-").reverse().slice(0,2).join("/")}</b> ${x.sobre?"Sobreaviso · ":""}${esc((PL_TURNOS[x.turno]||PL_TURNOS.D)[0])} (${PL_TURNOS[x.turno][1]}–${PL_TURNOS[x.turno][2]}) · ${esc(L.nome||x.local)} <a class="btn sm" href="${plGoogle(x)}" target="_blank" rel="noopener">📅 Google Agenda</a></li>`}).join("")}</ul></div>`:""}
  <div class="panel card"><div class="plhead"><button class="btn sm" data-plmes="-1" aria-label="Mês anterior">◀</button><h2>${esc(mesTxt)}</h2><button class="btn sm" data-plmes="1" aria-label="Próximo mês">▶</button></div>
      <div class="plres">${res.map(r=>`<div class="plcard${r.inativo?" plinativo":""}" style="--c:var(--${r.L.cor||"slate"})"><b>${esc(r.L.nome)}</b>${r.inativo?`<span class="note">${esc(r.txt)} — fora do total</span>`:`<span class="note">${r.ps.length} plantão(ões) · ${esc(r.txt)}</span><span class="plv">${plBRL(r.total)}</span>${r.pag?`<span class="note plpag">${esc(r.pag)}</span>`:""}
        <label class="check"><input type="checkbox" data-plpago="${pref}|${r.k}" ${(P.pagos[pref+"|"+r.k]||{}).ok?"checked":""}> recebido</label>`}</div>`).join("")}
        <div class="plcard pltotal"><b>Total do mês</b><span class="plv">${plBRL(total)}</span><span class="note">valores brutos</span></div>
        <div class="plcard plhoras"><b>Horas do mês</b><span class="plv">${plDur(tot.min)}</span><span class="note">${plBRL(rh(tot))}/h no geral</span>
          <span class="note">Diurno: ${plDur(di.min)} · ${plBRL(rh(di))}/h</span><span class="note">Noturno: ${plDur(no.min)} · ${plBRL(rh(no))}/h</span></div>
        <div class="plcard plmeta"><b>Meta do mês</b><label class="plmetal">R$ <input class="inp" inputmode="decimal" id="plMeta" value="${meta?String(meta).replace(".",","):""}" placeholder="ex.: 10000" aria-label="Meta de valor do mês"></label>
          ${meta?(falta?`<span class="note">Faltam ${plBRL(falta)}${hFalta!=null?` · cerca de <b>${plDur(Math.ceil(hFalta*60))}</b> no seu R$/h médio`:""}</span>`:`<span class="note"><b>Meta batida!</b></span>`):`<span class="note">Defina para ver quantas horas faltam.</span>`}</div></div>
      <div class="plsem">${["D","S","T","Q","Q","S","S"].map(x=>`<span>${x}</span>`).join("")}</div><div class="plgrid">${cel.join("")}</div>
      <p class="note">Toque num dia para marcar ou tirar um plantão. A contagem vem da lista de pacientes (alta, internação, transferência e evasão contam; internação em UTI conta no valor de UTI).</p></div>
    <div class="panel card" id="plDia" hidden></div>
    <div class="panel card"><h3>Plantões do mês</h3>${doMes.length?`<ul class="pllista">${doMes.map(x=>{const L=P.locais[x.local]||{};const r=plValor(x);return `<li style="--c:var(--${L.cor||"slate"})"><b>${x.data.split("-").reverse().slice(0,2).join("/")}</b> ${x.sobre?"Sobreaviso · ":""}${esc((PL_TURNOS[x.turno]||PL_TURNOS.D)[0])} · ${esc(L.nome||x.local)}${x.manual?" (à mão)":""}${(()=>{const L2=P.locais[x.local]||{};if(L2.tipo!=="porAlta")return "";const h=plHoras(x),f=r.c?(r.c.n||0)+(r.c.uti||0):0;return ` · <span class="plhr">${h.ini}–${h.fim} (${plDur(h.min)}) · ${f} ficha${f===1?"":"s"} · ${plBRL(r.v)} · ${plBRL(h.min?r.v/(h.min/60):0)}/h</span>`})()}${r.c?` · ${r.c.n||0} atendidos${r.c.uti?` + ${r.c.uti} UTI`:""} · ${plBRL(r.v)}`:L.tipo==="porAlta"?" · sem contagem ainda":""} <a class="btn sm" href="${plGoogle(x)}" target="_blank" rel="noopener">📅 Google Agenda</a></li>`}).join("")}</ul>`:`<p class="note">Nenhum plantão marcado neste mês.</p>`}</div>
    <details class="panel card"><summary><h3>Locais e valores</h3></summary><div class="hospform">${Object.entries(P.locais).map(([k,L])=>`<fieldset class="plloc"><legend>${esc(L.nome)}</legend>
      <label>Nome<input class="inp" data-plcfg="${k}.nome" value="${esc(L.nome)}"></label>
      <label class="check"><input type="checkbox" data-plativo="${k}" ${L.ativo!==false?"checked":""}> Ativo (entra no total)</label>
      ${L.tipo==="porAlta"?`<label>Pagamento: do dia<input class="inp" inputmode="numeric" data-plcfg="${k}.pagDe" value="${esc(String(L.pagDe||""))}"></label><label>até o dia (do mês seguinte)<input class="inp" inputmode="numeric" data-plcfg="${k}.pagAte" value="${esc(String(L.pagAte||""))}"></label>`:""}
      ${L.tipo==="salario"?`<label>Salário mensal (R$)<input class="inp" inputmode="decimal" data-plcfg="${k}.salario" value="${esc(String(L.salario).replace(".",","))}"></label>`:`<label>Por alta (R$)<input class="inp" inputmode="decimal" data-plcfg="${k}.porAlta" value="${esc(String(L.porAlta).replace(".",","))}"></label><label>Por internação em UTI (R$)<input class="inp" inputmode="decimal" data-plcfg="${k}.porUti" value="${esc(String(L.porUti).replace(".",","))}"></label>`}</fieldset>`).join("")}</div></details>`;
  el.querySelectorAll("[data-plmes]").forEach(b=>b.onclick=()=>{plMes.m+=+b.dataset.plmes;if(plMes.m<0){plMes.m=11;plMes.a--}if(plMes.m>11){plMes.m=0;plMes.a++}renderPlantoes()});
  el.querySelectorAll("[data-plpago]").forEach(c=>c.onchange=()=>{P.pagos[c.dataset.plpago]={ok:c.checked,em:c.checked?plIso(new Date()):""};saveModel()});
  el.querySelectorAll("[data-plcfg]").forEach(i=>i.onchange=()=>{const [k,f]=i.dataset.plcfg.split(".");P.locais[k][f]=f==="nome"?i.value.trim():+String(i.value).replace(/\./g,"").replace(",",".")||0;saveModel();renderPlantoes()});
  const mt=el.querySelector("#plMeta"); if(mt) mt.onchange=()=>{P.meta=+String(mt.value).replace(/\./g,"").replace(",",".")||0;saveModel();renderPlantoes()};
  el.querySelectorAll("[data-plativo]").forEach(c=>c.onchange=()=>{P.locais[c.dataset.plativo].ativo=c.checked;saveModel();renderPlantoes()});
  el.querySelectorAll("[data-pldia]").forEach(b=>b.onclick=()=>plAbreDia(b.dataset.pldia));
}
function plAbreDia(iso){
  const P=plDados(), box=$("#plDia"), ps=P.escala.filter(x=>x.data===iso);
  box.hidden=false;
  box.innerHTML=`<h3>${iso.split("-").reverse().join("/")}</h3>
    ${ps.length?`<ul class="pllista">${ps.map(x=>{const r=plValor(x);return `<li>${x.sobre?"Sobreaviso · ":""}${esc((PL_TURNOS[x.turno]||PL_TURNOS.D)[0])} · ${esc((P.locais[x.local]||{}).nome||x.local)}
      <label class="plman">Altas <input class="inp" inputmode="numeric" data-plman="${esc(x.id)}" data-f="n" value="${x.manual?x.manual.n:""}" placeholder="${r.c&&!x.manual?r.c.n||0:""}"></label>
      <label class="plman">UTI <input class="inp" inputmode="numeric" data-plman="${esc(x.id)}" data-f="uti" value="${x.manual?x.manual.uti:""}" placeholder="${r.c&&!x.manual?r.c.uti||0:""}"></label>
      ${(()=>{const h=plHoras(x);return `<label class="plman">Entrada <input class="inp plhm" type="time" data-plhm="${esc(x.id)}" data-f="ini" value="${h.ini}"></label>
      <label class="plman">Saída <input class="inp plhm" type="time" data-plhm="${esc(x.id)}" data-f="fim" value="${h.fim}"></label>
      <span class="note plorig">${h.origem} · ${plDur(h.min)}</span>${x.ini||x.fim?`<button class="btn sm" data-plsug="${esc(x.id)}">Voltar à sugestão</button>`:""}`})()}
      <button class="btn sm danger" data-pltira="${esc(x.id)}">Tirar</button></li>`}).join("")}</ul><p class="note">Altas e UTI em branco: conta pela lista de pacientes. Preencha para lançar à mão (ex.: plantão antigo).</p>`:""}
    <div class="atdgrid"><label class="f">Local<select class="inp" id="plLocal">${Object.entries(P.locais).map(([k,L])=>`<option value="${k}">${esc(L.nome)}</option>`).join("")}</select></label>
      <label class="f">Turno<select class="inp" id="plTurno">${PL_ORDEM.map(k=>{const [r,a,b]=PL_TURNOS[k];return `<option value="${k}">${r} (${a}–${b})</option>`}).join("")}</select></label></div>
    <label class="check"><input type="checkbox" id="plSobre"> Sobreaviso</label>
    <div class="actions"><button class="btn primary" id="plAdd">Marcar plantão</button><button class="btn" id="plFecha">Fechar</button></div>`;
  $("#plAdd").onclick=()=>{const x={id:"pl"+Date.now().toString(36),data:iso,local:$("#plLocal").value,turno:$("#plTurno").value,...($("#plSobre").checked?{sobre:true}:{})};P.escala.push(x);
    if(P.recusados) plCobre(x).forEach(k=>delete P.recusados[k]);saveModel();renderPlantoes();plAbreDia(iso);toast("Plantão marcado")};
  $("#plFecha").onclick=()=>{box.hidden=true};
  box.querySelectorAll("[data-plhm]").forEach(i=>i.onchange=()=>{const x=P.escala.find(y=>y.id===i.dataset.plhm);if(!x||plHM(i.value)===null)return;x[i.dataset.f]=i.value;saveModel();renderPlantoes();plAbreDia(iso)});
  box.querySelectorAll("[data-plsug]").forEach(b=>b.onclick=()=>{const x=P.escala.find(y=>y.id===b.dataset.plsug);if(!x)return;delete x.ini;delete x.fim;saveModel();renderPlantoes();plAbreDia(iso)});
  box.querySelectorAll("[data-plman]").forEach(i=>i.onchange=()=>{const x=P.escala.find(y=>y.id===i.dataset.plman);if(!x)return;const v=i.value.trim();
    const m=Object.assign({n:0,uti:0},x.manual||{});m[i.dataset.f]=+v||0;const outro=box.querySelector(`[data-plman="${x.id}"][data-f="${i.dataset.f==="n"?"uti":"n"}"]`);
    if(!v&&!(outro&&outro.value.trim()))delete x.manual;else x.manual=m;saveModel();renderPlantoes();plAbreDia(iso)});
  // tirado não volta sozinho pela lista de pacientes (fica em recusados até você marcar de novo naquele dia/turno)
  box.querySelectorAll("[data-pltira]").forEach(b=>b.onclick=()=>{const x=P.escala.find(y=>y.id===b.dataset.pltira);P.escala=P.escala.filter(y=>y.id!==b.dataset.pltira);
    if(x){P.recusados=P.recusados||{};plCobre(x).forEach(k=>P.recusados[k]=true)}saveModel();renderPlantoes();plAbreDia(iso)});
  box.scrollIntoView({behavior:"smooth",block:"nearest"});
}

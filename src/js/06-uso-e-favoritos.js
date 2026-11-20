/* ---------- uso e favoritos ---------- */
// rec: itens abertos por último ("c:id" conduta, "m:id" medicação, "s:id" escore). Dados antigos sem rec continuam válidos.
let uso=Object.assign({updatedAt:0},usoValido(lsGet("rxp_uso_v1",{})));   // dado estranho (nuvem antiga) não quebra a tela
let usoT=null;
function saveUso(){uso.updatedAt=Date.now();lsSet("rxp_uso_v1",uso);gsAgenda();clearTimeout(usoT);usoT=setTimeout(async()=>{if(db){try{await db.doc("config/uso").set(JSON.parse(JSON.stringify(uso)))}catch(e){}}},2500)}
function marcarRecente(k){uso.rec=[k,...(Array.isArray(uso.rec)?uso.rec:[]).filter(x=>x!==k)].slice(0,8)}
function bumpUso(id){uso.counts[id]=(uso.counts[id]||0)+1;marcarRecente("c:"+id);saveUso()}
function usoRecente(k){marcarRecente(k);saveUso()}
function toggleFav(id){const f=new Set(uso.favs);f.has(id)?f.delete(id):f.add(id);uso.favs=[...f];saveUso();renderList();renderDetail()}
// favoritos e contagens vindos de fora (nuvem, backup): só o que tem o tipo certo, para não quebrar o Início e a busca
function usoValido(r){
  const o=r&&typeof r==="object"?r:{}, c={};
  if(o.counts&&typeof o.counts==="object"&&!Array.isArray(o.counts)) for(const [k,v] of Object.entries(o.counts)) if(Number.isFinite(+v)) c[k]=+v;
  const u={counts:c,favs:Array.isArray(o.favs)?o.favs.filter(x=>typeof x==="string"):[],rec:Array.isArray(o.rec)?o.rec.filter(x=>typeof x==="string"):[]};
  if(+o.updatedAt) u.updatedAt=+o.updatedAt;
  const num=x=>{const r={};if(x&&typeof x==="object"&&!Array.isArray(x))for(const [a,b] of Object.entries(x))if(Number.isFinite(+b))r[a]=+b;return r};
  if(o.mes&&typeof o.mes==="object"&&!Array.isArray(o.mes)){u.mes={};for(const [k,v] of Object.entries(o.mes))if(/^\d{4}-\d\d$/.test(k)&&v&&typeof v==="object")u.mes[k]={c:num(v.c),a:num(v.a),n:+v.n||0,nt:+v.nt||0,min:+v.min||0,ia:Object.assign({ok:0,rec:0},num(v.ia))}}
  return u;
}
/* uso por mês: só contagens, nada do paciente (condutas escolhidas no Atendimento, abas abertas, atendimentos fechados
   e minutos, texto da IA aceito ou recusado pelas travas). Seis meses. Serve para ordenar a busca e o Início e para o
   painel "Meu uso no mês" em Plantões. Dois aparelhos: cada contador fica com o maior valor (nada se perde). */
const usoMesK=(t=Date.now())=>{const d=new Date(t);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`};
function usoMes(){
  uso.mes=uso.mes&&typeof uso.mes==="object"?uso.mes:{}; const k=usoMesK();
  const m=uso.mes[k]=uso.mes[k]||{c:{},a:{},n:0,nt:0,min:0,ia:{ok:0,rec:0}};
  for(const x of Object.keys(uso.mes).sort().slice(0,-6)) delete uso.mes[x];
  return m;
}
let usoMesT=null; const usoMesGrava=()=>{clearTimeout(usoMesT);usoMesT=setTimeout(saveUso,4000)};
function usoAba(t){try{const m=usoMes();m.a[t]=(m.a[t]||0)+1;usoMesGrava()}catch(e){}}
function usoAtend(ids,min){try{const m=usoMes();m.n++;[...new Set(ids)].forEach(id=>{m.c[id]=(m.c[id]||0)+1;uso.counts[id]=(uso.counts[id]||0)+1});if(min){m.nt++;m.min+=min}saveUso()}catch(e){}}
function usoIa(k){try{const m=usoMes();m.ia[k]=(m.ia[k]||0)+1;usoMesGrava()}catch(e){}}
function usoMesJunta(a,b){
  const o=JSON.parse(JSON.stringify(a||{}));
  const mx=(x,y)=>{for(const [k,v] of Object.entries(y||{}))x[k]=Math.max(x[k]||0,+v||0);return x};
  for(const [k,v] of Object.entries(b||{})){const m=o[k]=o[k]||{c:{},a:{},n:0,nt:0,min:0,ia:{ok:0,rec:0}};
    mx(m.c,v.c);mx(m.a,v.a);m.ia=mx(m.ia||{},v.ia);
    if((+v.n||0)>(m.n||0)){m.n=+v.n||0;m.nt=+v.nt||0;m.min=+v.min||0}}
  return o;
}
function usoMesHtml(pref,mesTxt){
  const m=(uso.mes||{})[pref]; if(!m) return `<details class="panel card plmeuuso"><summary><h3>Meu uso no mês</h3></summary><p class="note">Ainda sem registro em ${esc(mesTxt)}. O app conta, sem nada do paciente, as condutas que você usa no Atendimento, o tempo de cada atendimento e as abas abertas.</p></details>`;
  const top=Object.entries(m.c).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const rot=t=>{const b=document.querySelector(`.tabs [data-tab="${t}"]`);return b?b.textContent.trim():t};
  const nunca=TABS.filter(t=>!m.a[t]&&t!=="inicio").map(rot);
  const ia=(m.ia.ok||0)+(m.ia.rec||0);
  return `<details class="panel card plmeuuso"><summary><h3>Meu uso no mês</h3> <span class="note">${pl(m.n,"atendimento","atendimentos")}</span></summary>
    <p>${pl(m.n,"atendimento fechado","atendimentos fechados")}${m.nt?` · média de ${Math.round(m.min/m.nt)} min`:""}</p>
    ${top.length?`<p><b>Condutas que mais usei</b></p><ol class="qlist">${top.map(([id,n])=>{const it=getItem(id);return `<li>${esc(it?it.nome:id)}: <b>${n}</b></li>`}).join("")}</ol>`:""}
    ${ia?`<p class="note">IA na HDA: ${pl(m.ia.ok||0,"texto aceito","textos aceitos")}, ${pl(m.ia.rec||0,"recusado pelas travas","recusados pelas travas")}.</p>`:""}
    ${nunca.length?`<p class="note">Abas que não abri neste mês: ${esc(nunca.join(", "))}.</p>`:""}
    <p class="note">Só contagens, sem nome nem dado de paciente.</p></details>`;
}

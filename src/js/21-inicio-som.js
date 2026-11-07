/* ---------- aviso sonoro de reavaliação (opcional, por aparelho) ----------
   A cada minuto, quando um paciente da lista passa de 2 h sem reavaliar ou de 3 h sem desfecho, toca um bipe curto,
   vibra (celular) e mostra o aviso. Cada aviso toca uma vez só. Ligado em "🔔" na caixa de pacientes do Início
   (localStorage rxp_som_v1, fora do backup). O som precisa de um toque antes (regra do navegador): o próprio botão. */
const SOM_K="rxp_som_v1";
let somCtx=null; const somJa=new Set();
const somLigado=()=>{try{return localStorage.getItem(SOM_K)==="1"}catch(e){return false}};
function somBipe(){
  try{somCtx=somCtx||new (window.AudioContext||window.webkitAudioContext)();
    const t=somCtx.currentTime;[0,0.25].forEach(d=>{const o=somCtx.createOscillator(),g=somCtx.createGain();o.frequency.value=880;g.gain.setValueAtTime(0.0001,t+d);g.gain.exponentialRampToValueAtTime(0.25,t+d+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+d+0.18);o.connect(g).connect(somCtx.destination);o.start(t+d);o.stop(t+d+0.2)})}catch(e){}
  try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch(e){}
}
function somConfere(agora=Date.now()){
  if(!somLigado()) return [];
  const novos=[];
  for(const p of pacCarrega().pacs){const av=pacAviso(p,agora);if(!av)continue;const k=`${p.id}|${av.nv}|${p.et.reav.t||p.criado}`;if(somJa.has(k))continue;somJa.add(k);novos.push(`${p.nome}: ${av.txt}`)}
  if(novos.length){somBipe();toast(novos.join(" · "))}
  return novos;
}
function somBotao(){
  const b=$("#hSom"); if(!b) return; const on=somLigado();
  b.setAttribute("aria-pressed",on); b.textContent=on?"🔔 Aviso sonoro":"🔕 Aviso sonoro"; b.title=on?"Toca e vibra quando um paciente passar de 2 h sem reavaliar ou 3 h sem desfecho":"Ligar o aviso sonoro de reavaliação";
  b.onclick=()=>{const n=!somLigado();try{localStorage.setItem(SOM_K,n?"1":"0")}catch(e){}if(n){somBipe();pacCarrega().pacs.forEach(p=>{const av=pacAviso(p);if(av)somJa.add(`${p.id}|${av.nv}|${p.et.reav.t||p.criado}`)})}toast(n?"Aviso sonoro ligado":"Aviso sonoro desligado");somBotao()};
}
setInterval(()=>somConfere(),60000);

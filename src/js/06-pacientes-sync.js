/* ---------- sincronização cifrada da lista de pacientes entre aparelhos ----------
   A lista é cifrada no aparelho (AES-GCM, chave derivada da senha do médico por PBKDF2-SHA-256) antes de sair;
   o repositório privado guarda só o arquivo cifrado. A senha nunca sai do aparelho; aqui fica só a chave derivada
   (a lista local já está neste aparelho). Configuração numa chave própria, fora das rxp_*, do backup e da nuvem. */
const PSYNC_LS="mph_pacsync_v1", PSYNC_ITER=310000;
let psync=lsGet(PSYNC_LS,null)||{};     // {repo, arq, chave, salt, k (chave AES em base64), em, erro}
let psyncKey=null, psyncEstado="";
// em blocos: a lista com 30 dias de atendimentos pode passar do limite de argumentos de uma chamada
const b64=u=>{const a=new Uint8Array(u);let s="";for(let i=0;i<a.length;i+=0x8000)s+=String.fromCharCode.apply(null,a.subarray(i,i+0x8000));return btoa(s)};
const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const psyncAtivo=()=>!!(psync.repo&&psync.chave&&psync.k);
async function psyncDeriva(senha,saltB64){
  const base=await crypto.subtle.importKey("raw",new TextEncoder().encode(senha),"PBKDF2",false,["deriveKey"]);
  const k=await crypto.subtle.deriveKey({name:"PBKDF2",salt:unb64(saltB64),iterations:PSYNC_ITER,hash:"SHA-256"},base,{name:"AES-GCM",length:256},true,["encrypt","decrypt"]);
  return b64(await crypto.subtle.exportKey("raw",k));
}
async function psyncChave(){if(!psyncKey&&psync.k)psyncKey=await crypto.subtle.importKey("raw",unb64(psync.k),"AES-GCM",false,["encrypt","decrypt"]);return psyncKey}
async function psyncCifra(obj){
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const ct=await crypto.subtle.encrypt({name:"AES-GCM",iv},await psyncChave(),new TextEncoder().encode(JSON.stringify(obj)));
  return {v:1,alg:"AES-GCM/PBKDF2-SHA256",iter:PSYNC_ITER,salt:psync.salt,iv:b64(iv),ct:b64(ct)};
}
async function psyncDecifra(f){
  const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:unb64(f.iv)},await psyncChave(),unb64(f.ct));
  return JSON.parse(new TextDecoder().decode(pt));
}
const psyncUrl=()=>`https://api.github.com/repos/${psync.repo}/contents/${psync.arq||"lista.json"}`;
// motivo da recusa, como o GitHub responde (sem a chave), para o médico saber o que ajustar
let psyncMotivo="";
async function psyncFalha(r){
  let m="";try{m=(await r.json()).message||""}catch(e){}
  // o GitHub diz qual permissão faltou (ex.: contents=write); mostrar o repositório ajuda a achar o engano
  const falta=r.headers.get("x-accepted-github-permissions")||"";
  psyncMotivo=`${r.status}${m?": "+m:""}; repositório ${psync.repo}${falta?`; o GitHub pede ${falta}`:""}`;
  return new Error(r.status===401||r.status===403||r.status===404?"chave":"rede");
}
const psyncHdr=()=>({Authorization:"Bearer "+psync.chave,Accept:"application/vnd.github+json"});
// lê o arquivo remoto: {sha, f (cifrado)} ou {sha:null} se ainda não existe
async function psyncLe(){
  const r=await fetch(psyncUrl(),{cache:"no-store",headers:psyncHdr()});
  if(r.status===404) return {sha:null,f:null};
  if(!r.ok) throw await psyncFalha(r);
  const j=await r.json();
  return {sha:j.sha,f:JSON.parse(new TextDecoder().decode(unb64(j.content.replace(/\n/g,""))))};
}
async function psyncEscreve(f,sha){
  const corpo=b64(new TextEncoder().encode(JSON.stringify(f)));
  const r=await fetch(psyncUrl(),{method:"PUT",headers:Object.assign({"Content-Type":"application/json"},psyncHdr()),body:JSON.stringify({message:"lista cifrada",content:corpo,...(sha?{sha}:{})})});
  if(r.status===409) throw new Error("conflito");
  if(r.status===422){let m="";try{m=(await r.clone().json()).message||""}catch(e){}if(/sha/i.test(m))throw new Error("conflito")}
  if(!r.ok) throw await psyncFalha(r);
}
// junta campo a campo (fica o que mudou por último em qualquer aparelho); apagado num aparelho some nos dois;
// contagem do dia pelo maior valor visto
const PSYNC_CAMPOS=["nome","snap","sabe","assume","consMed","desf","et.exame","et.med","et.reav","et.parecer"];
const psLe=(o,c)=>c.split(".").reduce((x,k)=>x&&x[k],o);
const psPoe=(o,c,v)=>{const ks=c.split(".");let x=o;ks.slice(0,-1).forEach(k=>x=x[k]=x[k]||{});x[ks[ks.length-1]]=v};
function psyncJunta(loc,rem){
  const ap=Object.assign({},rem.apagados||{},loc.apagados||{});
  const por={};
  for(const p of [...(Array.isArray(rem.pacs)?rem.pacs:[]),...loc.pacs].filter(p=>p&&typeof p==="object"&&p.id)){
    if(ap[p.id]) continue;
    const q=por[p.id]; if(!q){por[p.id]=clone(p);continue}
    for(const c of PSYNC_CAMPOS){
      const tp=(p.ts||{})[c]||0, tq=(q.ts||{})[c]||0;
      if(tp>tq){psPoe(q,c,clone(psLe(p,c)??null));q.ts=q.ts||{};q.ts[c]=tp;if(c==="snap"&&p.cond)q.cond=p.cond}
    }
    q.upd=Math.max(q.upd||0,p.upd||0);
  }
  const pacs=Object.values(por).sort((a,b)=>b.criado-a.criado);
  const cont=Object.assign({},rem.cont||{}); for(const d in loc.cont) cont[d]=Math.max(cont[d]||0,loc.cont[d]);
  for(const p of pacs){const n=pacs.filter(x=>x.dia===p.dia).length;cont[p.dia]=Math.max(cont[p.dia]||0,n)}
  return {pacs,cont,apagados:ap};
}
// só repositório privado: a lista (mesmo cifrada) e os padrões nunca vão para um repositório público
async function repoPrivado(repo,chave){
  const r=await fetch(`https://api.github.com/repos/${repo}`,{cache:"no-store",headers:{Authorization:"Bearer "+chave,Accept:"application/vnd.github+json"}});
  if(r.status===404) return "naoacha";
  if(!r.ok) return "chave";
  return (await r.json()).private===false?"publico":"ok";
}
// põe o resultado da junção na lista sem trocar os objetos de quem continua (a tela e o Atendimento seguem ligados a eles)
function pacAplica(j){
  const db=pacCarrega(), velhos=new Map(db.pacs.map(p=>[p.id,p]));
  db.pacs=j.pacs.map(pacNorm).filter(Boolean).map(q=>{const o=velhos.get(q.id);if(!o)return q;for(const k of Object.keys(o))delete o[k];return Object.assign(o,q)});
  db.cont=j.cont; db.apagados=j.apagados;
  if(atPac&&!pacDe(atPac)) atPac=null;
}
let psyncRodando=false, psyncDeNovo=false;
async function pacSync(){
  if(!psyncAtivo()) return;
  if(psyncRodando){psyncDeNovo=true;return}
  psyncRodando=true; psyncEstado="Sincronizando…"; psyncMostra();
  try{
    for(let tent=0;tent<2;tent++){
      const {sha,f}=await psyncLe();
      let rem={pacs:[],cont:{},apagados:{}};
      if(f){ if(f.salt!==psync.salt) throw new Error("senha"); try{rem=await psyncDecifra(f)}catch(e){throw new Error("senha")} }
      const j=psyncJunta(pacCarrega(),rem);
      pacAplica(j); lsSet(PAC_LS,pacDb);
      try{await psyncEscreve(await psyncCifra(j),sha);break}catch(e){if(e.message!=="conflito"||tent)throw e}
    }
    psync.em=Date.now(); psync.erro=""; lsSet(PSYNC_LS,psync);
    psyncEstado=psyncDeNovo?"Sincronizando…":`Sincronizado às ${pacHora(psync.em)}`;
    if(ui.tab==="pacientes"&&!document.activeElement?.closest?.("#pcCorpo input,#pcCorpo select,#pcCorpo textarea")) renderPacientes(true);
  }catch(e){
    psync.erro=e.message; lsSet(PSYNC_LS,psync);
    psyncEstado=e.message==="senha"?"Senha diferente da usada no outro aparelho: nada foi enviado":e.message==="chave"?`Chave recusada pelo GitHub (${psyncMotivo}). ${/^403/.test(psyncMotivo)?"A chave não pode gravar neste repositório: use Trocar a chave e cole a chave da lista.":"Use Trocar a chave."}`:"Sem conexão: sincroniza quando voltar";
  }
  psyncRodando=false;
  // houve mudança durante a sincronização: roda de novo antes de dizer "sincronizado"
  if(psyncDeNovo){psyncDeNovo=false;return pacSync()}
  psyncMostra();
}
// teste em 2 passos, sem gravar nada: a chave enxerga o repositório? pode ler o conteúdo?
async function psyncTesta(){
  const out=[];
  try{
    const r=await fetch(`https://api.github.com/repos/${psync.repo}`,{cache:"no-store",headers:psyncHdr()});
    if(r.ok){const j=await r.json();out.push(`1) Repositório ${psync.repo}: encontrado${j.private?" (privado)":""}.`);if(j.private===false)out.push(`Atenção: ${psync.repo} é público. Desligue e use um repositório privado (ex.: plantao-lista).`)}
    else out.push(`1) Repositório ${psync.repo}: ${r.status===404?"a chave não enxerga este repositório (não está selecionado no token, ou o nome está diferente)":r.status===401?"chave inválida ou incompleta":"recusado ("+r.status+")"}.`);
    const c=await fetch(psyncUrl(),{cache:"no-store",headers:psyncHdr()});
    const falta=c.headers.get("x-accepted-github-permissions")||"";
    out.push(`2) Conteúdo: ${c.ok?"leitura ok":c.status===404?"leitura ok (arquivo ainda não existe)":"sem permissão ("+c.status+(falta?", o GitHub pede "+falta:"")+")"}.`);
  }catch(e){out.push("Sem conexão.")}
  psyncEstado=out.join(" "); psyncMostra();
}
let psyncT=null; function pacSyncAgenda(){if(!psyncAtivo())return;clearTimeout(psyncT);psyncT=setTimeout(pacSync,2500)}
function psyncMostra(){const el=$("#psEstado");if(el)el.textContent=psyncEstado||(psyncAtivo()?"Ligada":"Desligada")}
function renderPacSync(){
  return `<details class="panel card pcsync" ${psyncAtivo()||psync.erro?"open":""}><summary><h3>Sincronizar entre aparelhos</h3> <span class="note" id="psEstado"></span></summary>
    <p class="note">A lista é cifrada neste aparelho com a sua senha antes de sair; o repositório guarda só o arquivo cifrado. Use a mesma senha nos dois aparelhos. Sem a senha, ninguém lê, nem o GitHub; se esquecer, a cópia sincronizada não tem recuperação.</p>
    ${psyncAtivo()?`<p><b>Ligada</b> · ${esc(psync.repo)}</p><div class="actions"><button class="btn" id="psAgora">Sincronizar agora</button><button class="btn" id="psTroca">Trocar a chave</button><button class="btn" id="psTesta">Testar a chave</button><button class="btn danger" id="psDesliga">Desligar neste aparelho</button></div>`:`
    <div class="hospform"><label>Repositório privado (dono/nome)<input id="psRepo" autocomplete="off" spellcheck="false" placeholder="usuario/plantao-lista" value="${esc(psync.repo||"")}"></label>
      <label>Chave do GitHub (leitura e escrita só nesse repositório)<input id="psChave" class="segredo" type="text" name="ps-token-lista" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="github_pat_…"></label>
      <label>Senha da lista (a mesma nos dois aparelhos)<input id="psSenha" type="password" autocomplete="new-password"></label>
      <div class="actions"><button class="btn primary" id="psLiga">Ligar a sincronização</button></div></div>`}</details>`;
}
function bindPacSync(){
  psyncMostra();
  const liga=$("#psLiga");
  if(liga) liga.onclick=async()=>{
    const repo=$("#psRepo").value.trim(), chave=$("#psChave").value.trim(), senha=$("#psSenha").value;
    if(!/^[\w.-]+\/[\w.-]+$/.test(repo)||!chave){toast("Preencha repositório e chave");return}
    if(senha.length<8){toast("Senha com pelo menos 8 caracteres");return}
    // a chave do Meu hospital só lê o outro repositório: colada aqui, o GitHub recusa (403)
    if(typeof hosp!=="undefined"&&hosp.cfg&&hosp.cfg.chave&&hosp.cfg.chave===chave){psyncEstado="Essa é a chave do Meu hospital (só lê o repositório do hospital). Cole a chave da lista.";psyncMostra();return}
    liga.disabled=true; psyncEstado="Conferindo…"; psyncMostra();
    try{
      const rp=await repoPrivado(repo,chave);
      if(rp!=="ok"){psyncEstado=rp==="publico"?`${repo} é público: use um repositório privado (ex.: seu-usuario/plantao-lista).`:rp==="naoacha"?`A chave não enxerga ${repo}: confira o nome e se ele está selecionado no token.`:"Chave recusada pelo GitHub.";psyncMostra();liga.disabled=false;return}
      psync={repo,arq:"lista.json",chave};
      const {f}=await psyncLe();
      // o sal vem do arquivo que já existe (outro aparelho); se é o primeiro, cria um
      psync.salt=f&&f.salt?f.salt:b64(crypto.getRandomValues(new Uint8Array(16)));
      psync.k=await psyncDeriva(senha,psync.salt); psyncKey=null;
      if(f){try{await psyncDecifra(f)}catch(e){psync={repo};psyncKey=null;psyncEstado="Senha diferente da usada no outro aparelho";psyncMostra();liga.disabled=false;return}}
      lsSet(PSYNC_LS,psync); await pacSync(); renderPacientes();
    }catch(e){psync={repo};psyncKey=null;psyncEstado=e.message==="chave"?`Chave recusada pelo GitHub (${psyncMotivo}). ${/^403/.test(psyncMotivo)?"A chave é válida, mas não pode gravar neste repositório: confira se não é a chave do hospital (o navegador pode ter preenchido sozinho) e a permissão Contents: Read and write.":"Confira a chave colada."}`:e.message==="senha"?"Senha diferente da usada no outro aparelho":"Sem conexão";psyncMostra();liga.disabled=false}
  };
  if($("#psAgora")) $("#psAgora").onclick=()=>pacSync();
  if($("#psTesta")) $("#psTesta").onclick=psyncTesta;
  // chave nova (venceu ou foi gerada de novo): a senha e a lista continuam
  if($("#psTroca")) $("#psTroca").onclick=()=>{const c=(prompt("Cole a chave nova do GitHub")||"").trim();if(!c)return;psync.chave=c;psync.erro="";lsSet(PSYNC_LS,psync);pacSync()};
  if($("#psDesliga")) $("#psDesliga").onclick=()=>{try{localStorage.removeItem(PSYNC_LS)}catch(e){}psync={};psyncKey=null;psyncEstado="";renderPacientes();toast("Sincronização desligada neste aparelho")};
}
// ao abrir o site e ao voltar para ele, traz o que o outro aparelho mudou
if(psyncAtivo()&&navigator.onLine!==false) setTimeout(pacSync,800);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")pacSyncAgenda()});
addEventListener("online",()=>pacSyncAgenda());

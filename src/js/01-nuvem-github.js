/* ---------- nuvem no GitHub: seus padrões entre aparelhos (site) ----------
   Leva as condutas editadas (rxp_overrides_v1), os modelos e padrões (rxp_model_v1) e os favoritos (rxp_uso_v1)
   para um arquivo num repositório privado do médico. Não é dado de paciente: vai sem cifrar, por decisão do médico.
   Junta sem perder nada: em cada conduta, no modelo e nos favoritos fica a versão mais recente (updatedAt). */
const GS_LS="mph_nuvem_v1", GS_ARQ="meus-padroes.json";
let gs=lsGet(GS_LS,null)||{};       // {repo, chave, em, erro}
let gsEstado="", gsRodando=false, gsDeNovo=false, gsT=null;
const gsAtivo=()=>!!(gs.repo&&gs.chave);
const gsHdr=()=>({Authorization:"Bearer "+gs.chave,Accept:"application/vnd.github+json"});
const gsUrl=()=>`https://api.github.com/repos/${gs.repo}/contents/${GS_ARQ}`;
const gsB64=t=>{const a=new TextEncoder().encode(t);let s="";for(let i=0;i<a.length;i+=0x8000)s+=String.fromCharCode.apply(null,a.subarray(i,i+0x8000));return btoa(s)};
const gsDeB64=b=>new TextDecoder().decode(Uint8Array.from(atob(b.replace(/\n/g,"")),c=>c.charCodeAt(0)));
async function gsErro(r){let m="";try{m=(await r.json()).message||""}catch(e){}return new Error(`${r.status}${m?": "+m:""}`)}
async function gsLe(){
  const r=await fetch(gsUrl(),{cache:"no-store",headers:gsHdr()});
  if(r.status===404) return {sha:null,d:null};
  if(!r.ok) throw await gsErro(r);
  // arquivo ilegível (editado à mão, ou acima de 1 MB, quando a API manda content vazio): vale o deste aparelho, que regrava
  const j=await r.json(); let d=null;
  try{d=JSON.parse(gsDeB64(j.content||""))}catch(e){d=null}
  return {sha:j.sha,d:d&&typeof d==="object"&&!Array.isArray(d)?d:null};
}
async function gsEscreve(d,sha){
  const r=await fetch(gsUrl(),{method:"PUT",headers:Object.assign({"Content-Type":"application/json"},gsHdr()),body:JSON.stringify({message:"meus padrões",content:gsB64(JSON.stringify(d,null,1)),...(sha?{sha}:{})})});
  if(r.status===409) throw new Error("conflito");
  if(r.status===422){const e=await gsErro(r);if(/sha/i.test(e.message))throw new Error("conflito");throw e}
  if(!r.ok) throw await gsErro(r);
}
// traz o que veio da nuvem quando é mais novo; devolve se mudou algo neste aparelho
function gsJunta(rem){
  let mudou=false;
  const obj=x=>x&&typeof x==="object"&&!Array.isArray(x);
  const ro=obj(rem.overrides)?rem.overrides:{};
  for(const id in ro){const r=ro[id], l=overrides[id];if(obj(r)&&(!l||(r.updatedAt||0)>(l.updatedAt||0))){overrides[id]=r;mudou=true}}
  if(mudou) persistLocal();
  if(obj(rem.model)&&(rem.model.updatedAt||0)>(model.updatedAt||0)){model=migrateModel(rem.model);lsSet(LS.model,model);mudou=true}
  if(obj(rem.uso)&&(rem.uso.updatedAt||0)>(uso.updatedAt||0)){uso=usoValido(rem.uso);lsSet("rxp_uso_v1",uso);mudou=true}
  return mudou;
}
function gsRedesenha(){try{applyOrg();renderCats();renderList();fillSelects();if(!editing)renderDetail();renderEvSeguro();if(ui.tab==="modelos")renderModelos()}catch(e){}}
async function gsSync(){
  if(!gsAtivo()) return;
  if(gsRodando){gsDeNovo=true;return}
  gsRodando=true; gsEstado="Sincronizando…"; gsMostra();
  try{
    for(let t=0;t<2;t++){
      const {sha,d}=await gsLe();
      if(d&&gsJunta(d)) gsRedesenha();
      const meu={app:"meu-plantao",v:1,em:new Date().toISOString(),overrides,model,uso};
      // nada mudou desde a última vez: não grava de novo
      if(d&&JSON.stringify({o:d.overrides,m:d.model,u:d.uso})===JSON.stringify({o:overrides,m:model,u:uso})) break;
      try{await gsEscreve(meu,sha);break}catch(e){if(e.message!=="conflito"||t)throw e}
    }
    gs.em=Date.now(); gs.erro=""; lsSet(GS_LS,gs);
    gsEstado=`Salvo na nuvem às ${new Date(gs.em).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`;
  }catch(e){
    gs.erro=e.message; lsSet(GS_LS,gs);
    gsEstado=/^40[13]/.test(e.message)?`Chave recusada pelo GitHub (${e.message}; repositório ${gs.repo})`:/^404/.test(e.message)?`Repositório ${gs.repo} não encontrado pela chave`:"Sem conexão: salva na nuvem quando voltar";
  }
  gsRodando=false;
  if(gsDeNovo){gsDeNovo=false;return gsSync()}
  gsMostra();
}
function gsAgenda(){if(!gsAtivo())return;clearTimeout(gsT);gsT=setTimeout(gsSync,2500);gsEstado="Alterações a salvar na nuvem…";gsMostra()}
function gsMostra(){
  const el=$("#gsEstado"); if(el) el.textContent=gsEstado||(gsAtivo()?"Ligada":"Desligada");
  if(typeof refreshSync==="function") try{refreshSync()}catch(e){}
}
function renderGs(){
  const el=$("#gsCaixa"); if(!el) return;
  const chaveLista=typeof psync!=="undefined"&&psync.chave;
  el.innerHTML=`<h2>Nuvem: seus padrões</h2>
    <p class="note">Leva suas condutas editadas, modelos, padrões do Atendimento e favoritos para o seu repositório privado no GitHub, e traz de volta em qualquer aparelho. Não leva dado de paciente.</p>
    <p class="note" id="gsEstado"></p>
    ${gsAtivo()?`<p><b>Ligada</b> · ${esc(gs.repo)}</p><div class="actions"><button class="btn" id="gsAgora">Sincronizar agora</button><button class="btn" id="gsTroca">Trocar a chave</button><button class="btn danger" id="gsDesliga">Desligar neste aparelho</button></div>`:`
    <div class="hospform"><label>Repositório privado (dono/nome)<input id="gsRepo" autocomplete="off" spellcheck="false" placeholder="usuario/plantao-modelos" value="${esc(gs.repo||"")}"></label>
      <label>Chave do GitHub (leitura e escrita nesse repositório)<input id="gsChave" class="segredo" type="text" name="ps-token-modelos" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="github_pat_…"></label>
      ${chaveLista?`<label class="check"><input type="checkbox" id="gsMesma"> Usar a mesma chave da lista de pacientes (ela precisa ter os dois repositórios)</label>`:""}
      <div class="actions"><button class="btn primary" id="gsLiga">Ligar a nuvem</button></div></div>`}`;
  gsMostra();
  const liga=$("#gsLiga");
  if(liga) liga.onclick=async()=>{
    const repo=$("#gsRepo").value.trim(); let chave=$("#gsChave").value.trim();
    if($("#gsMesma")&&$("#gsMesma").checked) chave=psync.chave;
    if(!/^[\w.-]+\/[\w.-]+$/.test(repo)||!chave){toast("Preencha repositório e chave");return}
    if(typeof hosp!=="undefined"&&hosp.cfg&&hosp.cfg.chave===chave){gsEstado="Essa é a chave do Meu hospital (só lê o repositório do hospital).";gsMostra();return}
    liga.disabled=true; const rp=await repoPrivado(repo,chave);
    if(rp!=="ok"){gsEstado=rp==="publico"?`${repo} é público: use um repositório privado (ex.: plantao-modelos).`:rp==="naoacha"?`A chave não enxerga ${repo}: confira o nome e se ele está selecionado no token.`:"Chave recusada pelo GitHub.";gsMostra();liga.disabled=false;return}
    gs={repo,chave}; lsSet(GS_LS,gs); await gsSync(); renderGs();
  };
  if($("#gsAgora")) $("#gsAgora").onclick=()=>gsSync();
  if($("#gsTroca")) $("#gsTroca").onclick=()=>{const c=(prompt("Cole a chave nova do GitHub")||"").trim();if(!c)return;gs.chave=c;lsSet(GS_LS,gs);gsSync()};
  if($("#gsDesliga")) $("#gsDesliga").onclick=()=>{try{localStorage.removeItem(GS_LS)}catch(e){}gs={};gsEstado="";renderGs();toast("Nuvem desligada neste aparelho; seus padrões continuam aqui")};
}
// ao abrir o site e ao voltar para ele, traz o que mudou no outro aparelho
if(gsAtivo()&&navigator.onLine!==false) setTimeout(gsSync,600);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&gsAtivo())gsSync()});
addEventListener("online",()=>gsAgenda());

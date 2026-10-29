/* ---------- senha de acesso: entrar em qualquer computador com usuário do GitHub + uma senha ----------
   O pacote com as chaves (hospital, lista, padrões) é cifrado no aparelho (AES-GCM, PBKDF2-SHA-256 com 600 mil
   iterações) e guardado num gist público do próprio médico: sem a senha é ilegível. Num computador novo, o site
   acha o gist pelo usuário, decifra com a senha e liga tudo. A senha nunca sai do aparelho nem fica guardada. */
const ACESSO_LS="mph_acesso_v1", ACESSO_ARQ="meu-plantao-acesso.json", ACESSO_ITER=600000;
const acessoGuardado=()=>lsGet(ACESSO_LS,null)||{};
async function acessoChave(senha,salt){
  const base=await crypto.subtle.importKey("raw",new TextEncoder().encode(senha),"PBKDF2",false,["deriveKey"]);
  return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:ACESSO_ITER,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);
}
function acessoPacote(){
  const p={v:1,em:new Date().toISOString()};
  if(hosp.cfg&&hosp.cfg.chave) p.hosp={repo:hosp.cfg.repo,arq:hosp.cfg.arq,chave:hosp.cfg.chave};
  if(psyncAtivo()) p.lista={repo:psync.repo,arq:psync.arq,chave:psync.chave,salt:psync.salt,k:psync.k};
  if(gsAtivo()) p.nuvem={repo:gs.repo,chave:gs.chave};
  if(typeof iaAtiva==="function"&&iaAtiva()) p.ia={chave:ia.chave};
  return p;
}
// qualquer chave ligada serve para gravar o gist, se tiver a permissão Gists: Read and write
const acessoToken=()=>(gsAtivo()&&gs.chave)||(psyncAtivo()&&psync.chave)||(hosp.cfg&&hosp.cfg.chave)||"";
async function acessoCriar(senha){
  const p=acessoPacote();
  if(!p.hosp&&!p.lista&&!p.nuvem&&!p.ia) throw new Error("nada");
  const salt=crypto.getRandomValues(new Uint8Array(16)), iv=crypto.getRandomValues(new Uint8Array(12));
  const ct=await crypto.subtle.encrypt({name:"AES-GCM",iv},await acessoChave(senha,salt),new TextEncoder().encode(JSON.stringify(p)));
  const arq=JSON.stringify({app:"meu-plantao",v:1,alg:"AES-GCM/PBKDF2-SHA256",iter:ACESSO_ITER,salt:b64(salt),iv:b64(iv),ct:b64(ct)});
  const g=acessoGuardado(), tok=acessoToken();
  const corpo={description:"Meu Plantão: acesso cifrado (sem a senha é ilegível)",files:{[ACESSO_ARQ]:{content:arq}}};
  const url=g.gist?`https://api.github.com/gists/${g.gist}`:"https://api.github.com/gists";
  let r=await fetch(url,{method:g.gist?"PATCH":"POST",headers:{Authorization:"Bearer "+tok,Accept:"application/vnd.github+json","Content-Type":"application/json"},body:JSON.stringify(g.gist?corpo:Object.assign({public:true},corpo))});
  if(r.status===404&&g.gist){g.gist=null;lsSet(ACESSO_LS,g);return acessoCriar(senha)}
  if(!r.ok){let m="";try{m=(await r.json()).message||""}catch(e){}throw new Error(`${r.status}${m?": "+m:""}`)}
  const j=await r.json(); lsSet(ACESSO_LS,Object.assign(g,{gist:j.id,usuario:j.owner&&j.owner.login||g.usuario}));
  return Object.keys(p).filter(k=>["hosp","lista","nuvem","ia"].includes(k));
}
async function acessoEntrar(usuario,senha){
  const r=await fetch(`https://api.github.com/users/${encodeURIComponent(usuario)}/gists?per_page=100`,{cache:"no-store",headers:{Accept:"application/vnd.github+json"}});
  if(!r.ok) throw new Error(r.status===404?"usuario":"rede");
  const g=(await r.json()).find(x=>x.files&&x.files[ACESSO_ARQ]); if(!g) throw new Error("semacesso");
  const d=await (await fetch(`https://api.github.com/gists/${g.id}`,{cache:"no-store",headers:{Accept:"application/vnd.github+json"}})).json();
  const f=JSON.parse(d.files[ACESSO_ARQ].content);
  let p; try{const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:unb64(f.iv)},await acessoChave(senha,unb64(f.salt)),unb64(f.ct));p=JSON.parse(new TextDecoder().decode(pt))}catch(e){throw new Error("senha")}
  lsSet(ACESSO_LS,{usuario,gist:g.id});
  if(p.hosp){hosp.cfg=p.hosp;hospSalva();hospBaixar(true)}
  if(p.lista){psync=p.lista;psyncKey=null;lsSet(PSYNC_LS,psync);pacSync()}
  if(p.nuvem){gs=p.nuvem;lsSet(GS_LS,gs);gsSync()}
  if(p.ia){ia=p.ia;lsSet(IA_LS,ia)}
  return Object.keys(p).filter(k=>["hosp","lista","nuvem","ia"].includes(k));
}
const ACESSO_NOMES={hosp:"protocolos do hospital",lista:"lista de pacientes",nuvem:"seus padrões",ia:"IA na HDA"};
// sair: apaga deste computador as chaves, o pacote do hospital e a lista de pacientes (os padrões ficam na nuvem)
function acessoSair(){
  for(const k of [HOSP_LS,PSYNC_LS,GS_LS,PAC_LS,IA_LS]) try{localStorage.removeItem(k)}catch(e){}
  hosp={}; psync={}; psyncKey=null; gs={}; ia={}; pacDb=null; atPac=null;
  // o atendimento aberto também sai (memória e cópia de segurança da aba)
  {const t=toast;toast=()=>{};try{novoPaciente()}finally{toast=t}}
  hospAplica(); toast("Saiu deste computador");
}
function renderAcesso(el){
  if(!el) return;
  for(const o of ["#acCaixa","#acInicio"]){const x=$(o);if(x&&x!==el)x.innerHTML=""}   // um formulário só na página
  const ligado=psyncAtivo()||gsAtivo()||(hosp.cfg&&hosp.cfg.chave), g=acessoGuardado();
  el.innerHTML=ligado?`<h2>Senha de acesso</h2>
    <p class="note">Para entrar em outro computador só com o seu usuário do GitHub e uma senha. As chaves vão cifradas; sem a senha, ninguém lê.</p>
    ${g.gist?`<p class="note">Já criada${g.usuario?` para ${esc(g.usuario)}`:""}. Crie de novo quando trocar alguma chave.</p>`:""}
    <div class="hospform"><label>Senha de acesso (frase com 12 ou mais caracteres)<input id="acSenha" type="password" autocomplete="new-password"></label>
      <label>Repita a senha<input id="acSenha2" type="password" autocomplete="new-password"></label>
      <div class="actions"><button class="btn primary" id="acCria">${g.gist?"Atualizar":"Criar"} a senha de acesso</button><button class="btn danger" id="acSai">Sair deste computador</button></div>
      <p class="note" id="acEstado"></p></div>`
  :`<h2>Entrar</h2><p class="note">Já configurou em outro computador? Entre com o seu usuário do GitHub e a senha de acesso.</p>
    <div class="hospform"><label>Usuário do GitHub<input id="acUser" autocomplete="username" autocapitalize="off" spellcheck="false" value="${esc(g.usuario||"")}"></label>
      <label>Senha de acesso<input id="acSenhaE" type="password" autocomplete="current-password"></label>
      <div class="actions"><button class="btn primary" id="acEntra">Entrar</button></div><p class="note" id="acEstado"></p></div>`;
  const est=t=>{const e=$("#acEstado");if(e)e.textContent=t};
  if($("#acCria")) $("#acCria").onclick=async ev=>{const e={currentTarget:ev.currentTarget};
    const s=$("#acSenha").value; if(s.length<12){est("Use uma frase com pelo menos 12 caracteres.");return} if(s!==$("#acSenha2").value){est("As duas senhas estão diferentes.");return}
    e.currentTarget.disabled=true; est("Cifrando e guardando…");
    try{const k=await acessoCriar(s);est(`Pronto: a senha de acesso liga ${ptLista(k.map(x=>ACESSO_NOMES[x]))} em outro computador.`)}
    catch(er){est(er.message==="nada"?"Ligue antes alguma chave (hospital, lista ou padrões).":/^40[134]/.test(er.message)?`O GitHub recusou criar o gist (${er.message}). A chave precisa da permissão Gists: Read and write (em Account permissions).`:"Sem conexão.")}
    e.currentTarget.disabled=false;
  };
  if($("#acSai")) $("#acSai").onclick=()=>{if(!confirm("Apagar deste computador as chaves, os protocolos do hospital e a lista de pacientes?"))return;acessoSair();renderAcesso(el);if(typeof renderInicio==="function"&&ui.tab==="inicio")renderInicio()};
  if($("#acEntra")) $("#acEntra").onclick=async ev=>{const e={currentTarget:ev.currentTarget};
    const u=$("#acUser").value.trim(), s=$("#acSenhaE").value; if(!u||!s){est("Preencha usuário e senha.");return}
    e.currentTarget.disabled=true; est("Entrando…");
    try{const k=await acessoEntrar(u,s);est(`Pronto: ${ptLista(k.map(x=>ACESSO_NOMES[x]))} ligados neste computador.`);toast("Entrou: tudo sincronizando");setTimeout(()=>{renderAcesso(el);if(ui.tab==="inicio"&&typeof renderInicio==="function")renderInicio()},1500)}
    catch(er){est(er.message==="senha"?"Senha de acesso incorreta.":er.message==="semacesso"?"Esse usuário ainda não criou a senha de acesso.":er.message==="usuario"?"Usuário do GitHub não encontrado.":"Sem conexão.");e.currentTarget.disabled=false}
  };
}

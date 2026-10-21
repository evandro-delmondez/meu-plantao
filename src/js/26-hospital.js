/* ---------- meu hospital (material institucional privado) ----------
   INST só existe no painel do Claude quando o build recebe INST_FILE (arquivo de um repositório privado).
   Formato: {nome, aviso, docs:[{id, titulo, sub, cor, html}]}. Nada daqui é salvo; a busca fica só na memória. */
const hoEstado={doc:null,q:""};
function hoTexto(h){const d=document.createElement("div");d.innerHTML=h;return (d.textContent||"").toLowerCase()}
function renderHospital(){
  if(!INST){setTab("inicio");return}
  $("#hoAviso").textContent=(INST.nome?INST.nome+". ":"")+(INST.aviso||"Material institucional de uso pessoal.");
  const q=hoEstado.q.trim().toLowerCase();
  const docs=INST.docs.filter(d=>!q||(d.titulo+" "+(d.sub||"")).toLowerCase().includes(q)||hoTexto(d.html).includes(q));
  $("#hoLista").innerHTML=INST.docs.map(d=>`<button class="chip" data-ho="${esc(d.id)}" aria-pressed="${hoEstado.doc===d.id}" style="--c:var(--${d.cor||"sky"})">${esc(d.titulo)}</button>`).join("");
  $$("#hoLista [data-ho]").forEach(b=>b.onclick=()=>{hoEstado.doc=hoEstado.doc===b.dataset.ho?null:b.dataset.ho;renderHospital();const el=$("#ho-"+b.dataset.ho);if(el)el.scrollIntoView({block:"start"})});
  $("#hoDocs").innerHTML=docs.length?docs.map(d=>`<details class="panel card ho-doc" id="ho-${esc(d.id)}" style="--c:var(--${d.cor||"sky"})"${hoEstado.doc===d.id||q?" open":""}><summary><b>${esc(d.titulo)}</b>${d.sub?`<small>${esc(d.sub)}</small>`:""}</summary><div class="ho-corpo">${d.html}</div></details>`).join(""):`<p class="disc">Nada encontrado para “${esc(hoEstado.q)}”.</p>`;
  if(q) $$("#hoDocs .ho-corpo").forEach(c=>hoMarcar(c,q));
  $$("#hoDocs details").forEach(x=>x.ontoggle=()=>{if(x.open)hoEstado.doc=x.id.slice(3)});
}
// destaca o termo buscado sem mexer na estrutura
function hoMarcar(raiz,q){
  const w=document.createTreeWalker(raiz,NodeFilter.SHOW_TEXT);const nos=[];while(w.nextNode())nos.push(w.currentNode);
  nos.forEach(n=>{const t=n.nodeValue,i=t.toLowerCase().indexOf(q);if(i<0)return;
    const m=document.createElement("mark");m.textContent=t.slice(i,i+q.length);
    const f=document.createDocumentFragment();f.append(t.slice(0,i),m,t.slice(i+q.length));n.replaceWith(f)});
}
$("#hoBusca").oninput=e=>{hoEstado.q=e.target.value;renderHospital()};

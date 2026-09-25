/* ---------- tema ---------- */
(function(){const k="rxp_theme_v1";let t=null;try{t=localStorage.getItem(k)}catch(e){}
 if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;
 $("#themeBtn").onclick=()=>{const cur=document.documentElement.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");const n=cur==="dark"?"light":"dark";document.documentElement.dataset.theme=n;try{localStorage.setItem(k,n)}catch(e){}toast(n==="dark"?"Tema escuro":"Tema claro")};})();

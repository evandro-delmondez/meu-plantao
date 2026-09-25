const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const norm=s=>(s||"").toString().normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const esc=s=>(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
// número com a palavra no singular ou no plural: pl(1,"plantão","plantões") → "1 plantão"; pl(6,…) → "6 plantões"
const pl=(n,sing,plur)=>`${String(n).replace(".",",")} ${+n===1?sing:plur}`;
const norm=s=>(s||"").toString().normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const esc=s=>(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

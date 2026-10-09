/* ===== Entrada por queixa (porta): sinais de alarme primeiro, depois o caminho até a conduta =====
   Conteúdo clínico: fonte em cada queixa e conferência independente antes do merge (regras 1 e 2).
   Formato:
   { id: "cefaleia", nome: "Cefaleia", cor: "amber",
     alarme: [ { t: "sinal de alarme (curto)", acao: "o que fazer se presente (exame, conduta, não liberar)" } ],
     perguntar: ["item curto do que perguntar/examinar"],
     caminhos: [ { rot: "Enxaqueca: dor pulsátil, unilateral, náusea, fotofobia", conduta: "enxaqueca" } ],   // conduta = id existente; sem conduta = só texto
     escores: ["nome de escore validado, se houver (ex.: CURB-65)"],
     fontes: ["..."] } */
const QUEIXAS = [];
if (typeof module!=="undefined") module.exports={QUEIXAS};

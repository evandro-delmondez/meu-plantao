/* ===== Alta segura: orientação ao paciente em linguagem leiga, para imprimir ou abrir pelo QR code =====
   Sem dado do paciente. Conteúdo clínico: fonte em cada item e conferência independente (regras 1 e 2).
   Escrever para quem não é da saúde: frases curtas, sem siglas, sem nome técnico sem explicação, "você".
   Formato: ALTA[idDaConduta] = {
     titulo: "Dor de garganta (amigdalite)",
     oque: "1–2 frases: o que é e como costuma evoluir",
     cuidados: ["o que fazer em casa (hidratação, repouso, como tomar o remédio da receita, o que evitar)"],
     volte: ["volte ao pronto-socorro se… (sinais de alarme em palavras do dia a dia)"],
     fontes: ["..."] } */
const ALTA = {};
if (typeof module!=="undefined") module.exports={ALTA};

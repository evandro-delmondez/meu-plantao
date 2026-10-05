/* ===== Cartão "Agora" da sala vermelha: o que fazer nos primeiros minutos, com doses prontas pelo peso =====
   Alto risco: conferência independente antes do merge (regra 2). Cada dose deve repetir o que já está
   na conduta, na ficha, na calculadora ou no protocolo citados; se divergir, corrigir na origem também.
   Formato:
   AGORA[idDaConduta] = {
     quando: "critério de entrada, em 1 linha",
     alerta: "1 frase de segurança (opcional)",
     etapas: [{ t: "0–5 min", acoes: [ { txt: "ação", dose: {...} } ] }],
     atalhos: [{ rot: "PCR guiada", aba: "pcr" } | { rot: "Fluxo do IAM", protocolo: "iamcsst" } | { rot: "Bomba: noradrenalina", bic: "noradrenalina" }],
     fontes: ["..."]
   }
   dose = { ref: "0,2 mg/kg IM (máx. 10 mg)"   ← obrigatório, sempre visível para conferir
            porKg: 0.2, un: "mg" | "mcg" | "g" | "UI" | "mL", max: 10, min: 0, conc: 5 (un por mL, para mostrar mL) }
   Sem porKg = dose fixa: aparece só o ref. */
const AGORA = {};
if (typeof module!=="undefined") module.exports={AGORA};

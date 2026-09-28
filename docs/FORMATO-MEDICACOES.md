# Formato de cada medicação (JSON array em meds/<grupo>.json)
{
 "id": "ondansetrona",                       // minúsculas, sem acento, hífen
 "nome": "Ondansetrona",
 "classe": "Antiemético",                    // classe principal (ver lista do grupo)
 "subclasse": "Antagonista 5-HT3",
 "mecanismo": "uma linha curta",
 "apresentacoes": ["Comprimido 4 mg e 8 mg", "Ampola 2 mg/mL (2 mL e 4 mL)"],  // apresentações comuns no Brasil
 "marcas": ["Zofran", "Vonau"],                 // opcional: nomes comerciais conferidos na lista CMED/Anvisa (sem genéricos); aparecem abaixo do nome
 "rename": true,                              // está na RENAME 2024? true/false/null se não conferido
 "vias": ["VO","IM","EV"],
 "adulto": ["Náuseas e vômitos: 4–8 mg VO, IM ou EV de 8/8h ..."],   // doses usuais em PS/UPA, com máximo quando houver
 "pediatria": ["0,15 mg/kg/dose (máx. 4 mg) VO/EV de 8/8h ..."],     // ou ["Não recomendado < X anos (bula)"]
 "ped_calc": [{"rotulo":"Dose EV/VO","mgkg":0.15,"max_mg":4,"intervalo":"8/8h","via":"EV/VO"}],  // opcional, SÓ se a fonte der mg/kg explícito
 "diluicao": ["EV: diluir em 50 mL de SF 0,9% ou SG 5% e infundir em 15 min ...", "IM: sem diluição, ..."],
 "renal": "Sem ajuste." ,                    // ajuste por ClCr com faixas, conforme fonte
 "hepatica": "Insuficiência hepática grave: máx. 8 mg/dia.",   // ou "" se não relevante
 "gestacao": "texto curto e objetivo, com a fonte",
 "lactacao": "texto curto",
 "contraindicacoes": ["..."],
 "alertas": ["Prolonga o QT: evitar com outros que prolongam QT e em QT longo congênito (FDA)."],  // interações, MAV/ISMP, QT, sedação etc.
 "fontes": ["Bula ANVISA — Ondansetrona (Zofran), 2023", "FDA label Zofran, 2021 (DailyMed)", "..."]
}
REGRAS: português do Brasil, sem CAPS LOCK; nada sem fonte; se algo não foi confirmado, omita (não invente). Diluições: preferir bula; se vier de manual hospitalar (ex.: Manual Farmacêutico Einstein, guias de HC universitários), cite e escreva "diluição usual — conferir protocolo da unidade".

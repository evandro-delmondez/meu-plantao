# Decisões do usuário

Lido no início de toda tarefa (skill `retomar`). Não rediscutir o que está aqui; acrescente novas decisões com data.

## Regras de trabalho
- Nenhuma alteração importante sem informar antes; entrevistar em caso de dúvida.
- Respostas em português fluente, curtas. Economizar tokens.
- Sempre condutas e protocolos mais recentes: Ministério da Saúde, sociedades, bulas, livros-texto (Harrison 22ª ed.; Medicina de Emergência HC-FMUSP 18ª ed.), citando capítulo e edição, sem copiar e sem enviar os livros ao GitHub.
- Publicar só depois da conferência independente, mesmo com poucos tokens (2026-09-27).
- Trabalho em fatias: visual + clínico juntos.

## Perfil de uso (2026-09-25)
- Computador e celular por igual. UPA/PS adulto, público e particular; pediatria, obstetrícia e sala vermelha às vezes.
- Abas mais usadas: prescrições, medicações, evolução, atestado, escores, calculadora.

## Conteúdo e interface
- Prescrição e orientações são o principal da conduta; checklist do que perguntar, antecedentes e exame físico por diagnóstico.
- Exame físico sem siglas, com modelos masculino e feminino.
- Selo RENAME + seletor rede pública/particular.
- Categorias no formato "Especialidade / Especialidade" (ex.: "Otorrino / Oftalmo", "Toxico / Infecto", "Dor / Neuro / Ortop").
- Fichas: grupos com nomes curtos; Vasoativos, Sedação e Anticonvulsivantes separados; nome comercial pequeno logo abaixo do princípio ativo, só marcas da lista CMED.
- Queimaduras: superfície queimada só quando necessário (sem campo duplicado). Feridas e mordeduras registram necessidade de sutura na evolução.
- PCR: cronômetro, ciclos, metrônomo e próximos passos claros ("Agora:").
- Cetamina: só escetamina (a disponível no Brasil) — 2026-09-27.
- Fenobarbital: com limites de velocidade, concentrações e contraindicações — 2026-09-27.
- Rocurônio pediátrico: mantido, com nota da bula — 2026-09-27.
- Valproato e fenitoína: só notas nas fichas — 2026-09-27.

## Infraestrutura
- Site no GitHub Pages (https://evandro-delmondez.github.io/meu-plantao/), publicado pelo GitHub Actions no push para main.
- Cloudflare Access testado e descartado (2026-09-27): "prefiro o site mesmo".
- Domínio próprio: adiado (2026-09-27).

## Visão 2026-10-05: copiloto, não livro
- Sala vermelha: cartão "Agora" (3–5 ações com doses pelo peso) no topo, fluxograma abaixo, detalhes e fontes recolhidos.
- Remédio citado em conduta/protocolo vira botão; a ficha abre por cima (no celular, de baixo para cima), sem perder a conduta; droga de infusão com atalho para a bomba preenchida.
- Confiança = rastreabilidade: fonte, ano, data de conferência e selo de conferência visíveis; página de Fontes.
- Acervo pessoal (PDFs, fluxogramas) num Projeto no claude.ai, com instruções escritas pelo Claude; livros nunca no site público.
- Pré-hospitalar "às vezes": incluir protocolos SAMU 192 e modo transporte (agitação, transferência) depois da sala vermelha.
- Cartão "Agora", 1ª leva (2026-10-05): convulsão/estado de mal, agitação psicomotora (nova, com ficha de haloperidol), sepse, anafilaxia, IAM, AVC e PCR. Hiponatremia grave fica para depois.
- Doses no cartão: campo de peso no topo (só memória), mg e mL já calculados, com a dose de referência ao lado para conferir.
- Cartão enxuto (2026-10-05): até 3 ações por etapa, frases curtas com a dose; exceções e observações em "detalhes" (o lint barra mais de 3 ações ou ação com mais de 160 caracteres).
- Ficha do biperideno: criar (distonia aguda por haloperidol/antieméticos) — 2026-10-05.
- Grupo de fichas "Psiquiatria" (haloperidol, depois biperideno e outros) — 2026-10-05.
- Rascunhos e relatórios de agentes ficam em `.rascunhos/` no projeto (fora do git); o scratchpad temporário foi apagado entre sessões em 2026-10-08 e levou os relatórios completos.
- Divergências resolvidas (2026-10-08): tenecteplase no AVC = conta de 0,25 mg/kg (AHA 2026) com a dose da faixa da bula ao lado; volume na anafilaxia = 20 mL/kg com teto de 1.000 mL por bolus (RCUK 2021); fenobarbital = 20 mg/kg, citando que a AES 2016 usa 15 mg/kg; haloperidol = repetir em 30 min (ABP 2019), citando que a bula diz 1 h.

## Porta (2026-10-08): foco atual
- O médico vai trabalhar na porta (fichas verde e amarela; queixas de todo tipo, inclusive pneumonia). Prioridade sobre a sala vermelha.
- Ordem: (1) atendimento em 1 tela (checklist → receita + evolução + atestado prontos para copiar); (2) sinais de alarme em destaque e entrada por queixa; (3) alta segura em linguagem leiga, impressa/QR/WhatsApp, sem dado de paciente; (4) condições que faltam.
- O texto vai colado no prontuário eletrônico do hospital: precisa colar limpo (texto simples, sem formatação estranha).
- Rede varia (pública e particular): manter o seletor.
- Entrada por queixa, 1º lote (2026-10-09): cefaleia, tontura/síncope, dor abdominal, dor torácica, febre, tosse/dispneia. Lombalgia, dor musculoesquelética e outras queixas ficam como pendência.
- Alta segura (2026-10-09): imprimir (A5/A4) e QR code na tela; versão leiga separada das orientações técnicas, com "volte se…". Sem dado do paciente no QR nem na folha.
- Condutas da porta corrigidas (2026-10-09): ibuprofeno só depois de descartar dengue (gripe, faringite, amigdalite, tosse); dispepsia com endoscopia a partir de 40 anos (V Consenso Brasileiro de H. pylori); gastroenterite com alimentação habitual; náuseas com fontes reais; contraindicações do óleo mineral e alerta do Fleet.
- Pedidos de 2026-10-09, nesta ordem: (1) fechar a versão da porta; (2) auditoria de segurança (doses sem teto, siglas ambíguas, contradições entre abas) e intoxicações e antídotos (cartão Agora da intoxicação + fichas de naloxona, flumazenil, N-acetilcisteína com nomograma do paracetamol e carvão ativado + CIATox a um toque); (3) simulação de plantão no celular; (4) revisão geral das 98 prescrições por categoria, com aprovação do médico antes de mudar conduta publicada.
- CIATox (2026-10-09): mostrar o Disque-Intoxicação nacional (0800 722 6001) e um campo para o médico salvar o telefone do CIATox local (só no aparelho; não é dado de paciente).

## Simulação de plantão (2026-10-09, `.rascunhos/simulacao-plantao.md`)
- Corrigir os 5 bugs: "Novo paciente" limpa tudo do paciente em todas as abas; evolução não contradiz sinais vitais nem escreve "nega" sem marcação; busca por início de palavra (siglas inteiras); alergia em um só estado; peso pediátrico começa vazio.
- Receita com escolha por toque: chips para escolher entre alternativas ("Ou") e blocos opcionais ("#"); só o escolhido vai para receita, evolução e cópia; notas para o médico nunca saem na receita.
- Evolução: seletor de destino (alta / observação / internação / transferência) no lugar de "Paciente liberado com orientações"; sem padrão nas condutas de emergência.
- Navegação na conduta: barra fixa de atalhos; preparo, fontes e "o que mudou" recolhidos por padrão; alvos de toque com 44 px. (Guardar a rolagem por aba: não pedido.)
- Ficam para depois, com conferência: alertas automáticos pelos sinais vitais e NEWS2; bloco de gravidade da pneumonia (CRB-65); chips "álcool?" na agitação; conduta de dor de dente; alarmes cruzados (epigástrica → ECG).
- Intoxicação (2026-10-09): carvão ativado 1 g/kg, máx. 50 g, em todo o painel (citando que a AACT aceita 25–100 g no adulto); N-acetilcisteína sem dosagem em até 8 h se > 150 mg/kg ou > 10 g (o mais protetor entre HC-FMUSP e consenso 2023).
- Revisão geral das 98 prescrições (2026-10-16): em 6 lotes por categoria (1 resp + orl; 2 gi + uro; 3 dor + psi; 4 pele; 5 gu + endo + outros; 6 cardio + emerg + toxinf), relatório por conduta em `.rascunhos/revisao-loteN.md`; mudanças em conduta publicada só com aprovação do médico.

## Material institucional (2026-10-16)
- Manual e protocolos do hospital onde trabalha ficam no repositório **privado** `plantao-hsls` (resumos + comandos do Claude Code). Nunca copiar para este repositório público nem para o site.
- Revisão lotes 1 e 2 (2026-10-17): aplicar todas as correções obrigatórias (`.rascunhos/revisao-lote1.md`, `.rascunhos/revisao-lote2.md`), com conferência antes de publicar. Asma após a crise: budesonida-formoterol como manutenção e alívio (MART, GINA 2026). OMA no adulto: 5 dias. Prostatite aguda: 14 dias, estendendo se preciso. Demais escolhas listadas na coluna "Decisão do médico" dos relatórios: manter como está.
- Terlipressina na HDA (2026-10-17): dose pela bula Anvisa, por peso (≤ 50 kg 1 mg; 50–70 kg 1,5 mg; > 70 kg 2 mg, de 4/4h), citando que o Baveno VII usa 2 mg.
- Revisão lote 3 (2026-10-17): aplicar todas as correções obrigatórias (`.rascunhos/revisao-lote3.md`), com conferência. Salvas: prednisona 100 mg × 5 dias com redução (EAN 2023). Convulsão refratária: manter tiopental só se houver fonte com dose; senão, retirar. Insônia na porta: sem hipnótico, só higiene do sono. Demais escolhas da coluna "Decisão do médico": manter como está.
- Revisão lote 4 (2026-10-17): aplicar todas as correções obrigatórias (`.rascunhos/revisao-lote4.md`), com conferência. Valaciclovir como alternativa no herpes labial (2 g 12/12h por 1 dia) e no zoster (1 g 8/8h por 7 dias), com ajuste renal. Impetigo com antibiótico oral: 5 dias (NICE). Queimadura: Parkland 2 mL × kg × % SCQ, ajustando pela diurese (ATLS/ABA), também na calculadora. Demais escolhas: manter como está.
- Parkland (2026-10-17): adulto 2 mL × kg × % SCQ (ABA 2023; ATLS 11ª ed.); criança 3 mL + manutenção (ATLS 10ª ed./ABLS — conferir no ATLS 11 se houver mudança pediátrica); trauma elétrico 4 mL; diurese 0,5–1 (adulto) e 1–1,5 mL/kg/h (criança).
- Revisão lote 6 (2026-10-17): aplicar todas as correções obrigatórias (`.rascunhos/revisao-lote6.md`), com conferência. Dengue: PA diferencial ≤ 20 mmHg em todo o painel (OMS/OPAS; o texto do MS 2024 diz < 20). Procainamida e digoxina injetáveis: manter como alternativa com o aviso "confirme se a unidade tem". Demais escolhas: manter como está.
- Revisão lote 5 (2026-10-17): aplicar todas as correções obrigatórias (`.rascunhos/revisao-lote5.md`), com conferência. Escala de insulina na hiperglicemia: buscar fonte publicada; se não houver, "seguir o protocolo de correção da unidade". Ácido tranexâmico EV no sangramento uterino: 1 g (HC-FMUSP), citando o ACOG (10 mg/kg, máx. 600 mg). Dismenorreia: tirar a codeína. Demais escolhas: manter como está.

## Próxima fatia (2026-10-17)
- (1) Alertas automáticos pelos sinais vitais no "Fechar o atendimento" e NEWS2 calculado na hora, com aviso de "não é verde"; (2) bloco de gravidade da pneumonia com CRB-65 (sem ureia), texto único por faixa e esquema EV para quem fica; (3) altas leigas de cefaleia, lombalgia, TCE leve, vertigem, infecção urinária, cólica renal, dor abdominal e entorse. Tudo com conferência.

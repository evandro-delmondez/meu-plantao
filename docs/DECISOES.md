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
- Protocolos do hospital no site (2026-10-21): o código público ganha só uma "gaveta" genérica ("Meu hospital"). O pacote vem do repositório privado, buscado pelo site com uma chave de leitura colada em cada aparelho e guardado numa chave nova, separada das `rxp_*`, com "Apagar do aparelho". Nenhum texto, dose, regra ou nome de fluxo do hospital entra no repositório público, no site, na cópia para colegas ou no CHANGELOG; os testes usam um pacote fictício. O pacote define nome e cor. Com o pacote carregado, "Onde estou hoje" ganha um terceiro botão com o nome do hospital: aí a prescrição do protocolo do hospital vira a principal, com a versão do app recolhida logo abaixo (com fonte); divergências entre o hospital e a fonte do app aparecem lado a lado até o médico decidir; avisos do manual na evolução e na prescrição; desfechos do hospital no seletor de destino. Doses do pacote passam por conferência independente. Fatias: (1) gaveta; (2) script do pacote no repositório privado; (3) modo hospital; (4) evolução por campos (História, Exame físico, Diagnóstico com CID, Tratamento), com cópia por campo.
- Modo hospital (2026-10-21): a conduta do hospital substitui a do app só onde o protocolo do hospital é atual; protocolo vencido ou antigo fica com a conduta do app e mostra as divergências. A decisão do médico em cada divergência vai para o pacote privado (campo `decisao`).

## Atendimento no fluxo do MV (2026-10-21)
- A aba Evolução vira **Atendimento**: tela única na ordem do prontuário (HDA, exame físico direcionado, exames, na unidade, diagnóstico com CID, reavaliação, alta, internação), com cópia por campo. A conduta abre com "Atender", já preenchida.
- HDA: o checklist escreve "Presença de … Nega …". Exame físico por sistemas (inclui cabeça e orofaringe), ligados pela conduta; saem só os sistemas ligados.
- "Na unidade" em lista (um remédio por linha) para selecionar no MV; CID em destaque com cópia.
- Alta em tópicos (reavaliação, orientações e sinais de alarme explicados, destino), sem repetir a prescrição. Pedido de internação (apartamento ou UTI) com motivo, objetivo, exames e laudos relevantes, parecer, e perguntas que instiguem a justificativa.
- Critérios de encaminhamento (sala vermelha, Cardio, Cirurgia Geral, Ortopedia, Uro, Gineco) na queixa e na conduta, ao lado dos sinais de alarme, com fonte. Exames sugeridos por conduta, com quando pedir (inclusive TC com e sem contraste), com fonte e conferência. Sala vermelha: só manter.
- **Lista de pacientes do plantão — exceção à regra 5 decidida pelo médico:** nome completo (para buscar no MV), hipótese, status (exames, medicação, reavaliado, alta, internação e onde). Guardada numa chave própria, fora do backup, da nuvem do painel e da cópia para colegas; apaga sozinha após 7 dias; a contagem de pacientes por plantão fica para sempre, sem nome. Sincronização entre aparelhos só cifrada no aparelho (AES-GCM, senha do médico que nunca sai dos aparelhos), num repositório privado separado (`plantao-lista`).
- Atendimento, ajustes do médico (2026-10-21): "Comorbidades" vira **HPP** (história patológica pregressa: doenças, cirurgias, internações); HPP, medicamentos em uso e alergias em lista (Enter), saindo com traço ("- item"); sinais de alarme do checklist na HDA, não no exame; alta em linguagem formal de prontuário (nada coloquial); botão Atender no topo da conduta, acima dos alarmes; **Atender** vira botão principal da navegação, em 2º lugar (Início · Atender · Condutas · Remédios · Documentos · Cálculos · Sala vermelha por último); visual mais limpo e objetivo; até 3 condutas no mesmo atendimento (principal + adicionais), juntando checklists, alarmes, diagnósticos/CID, unidade, receita e orientações sem repetir remédio.
- Tudo editável e padrão para os próximos atendimentos (2026-10-21): botão "Editar" no Atendimento para trocar ou acrescentar itens fixos (checklist, alarmes, orientações, reavaliação, objetivos, exame, na unidade, remédios); o que o médico editar vale como padrão e sincroniza entre consultórios num repositório privado separado (`plantao-modelos`), sem cifrar (não é dado de paciente).
- Entrar em qualquer computador (2026-10-22): uma senha de acesso (frase de 12+ caracteres) abre um pacote cifrado com as chaves, guardado num gist público do médico (ilegível sem a senha). Estética: minimalista claro (fundo branco, uma cor de destaque, cor da categoria só como ponto, menos caixas e bordas); na conduta, abertos só receita e na unidade, o resto recolhido. Início: caixa de fluxo inicial (novo paciente por queixa da triagem ou por conduta, abrindo o Atendimento), busca grande, favoritos e mais usadas, pacientes do plantão em aberto, onde estou hoje.
- Onde estou hoje (2026-10-22): só UPA pública e o hospital do pacote (Santa Lúcia); outro hospital entra com o pacote de protocolos dele. Condutas sempre com a cor da categoria; a busca de conduta do Novo atendimento é a mesma da lista de Condutas, com as grandes áreas.
- Receitas (2026-10-22): dipirona 1 g é o padrão (Meus modelos permite 500 mg). Visual: sem descrições abaixo dos títulos (ficam num "ⓘ"); nos quadros recolhidos, título ao lado da setinha; no Atendimento pela queixa, caminhos primeiro e a tela volta ao topo ao escolher.
- Atendimento no formato do MV (2026-10-22): quatro campos do prontuário (HDA e antecedentes, exame físico, hipótese diagnóstica, conduta), depois prescrição na unidade, receituário e atestado, e a alta por último. Diagnóstico sem rótulo e sem CID. Conduta em itens (explico, medicação na unidade, exames laboratoriais e de imagem, sintomáticos, antibiótico, reavaliação); "Oriento quanto aos sinais de alarme" fica na alta. Exame sempre por sistemas, com sexo e perfil (adulto, pediátrico, gestante); cabeça e pescoço separado de orofaringe. No Santa Lúcia a semi-intensiva é UTI B.
- Texto do paciente (2026-10-22): receita e orientações só com o que o paciente deve ler, em linguagem simples e formal (serviço particular, risco de ouvidoria); notas para o médico vão no aviso acima da receita (campo `avisoRx`), nunca no texto copiado.
- Alergia a dipirona (2026-10-22): a receita troca a dipirona oral por paracetamol 750 mg 6/6 h, no máximo 4 cp/dia (conferido com bula e EAACI/ENDA). Receituário do Atendimento com escolha por toque, como na conduta.
- Contratura muscular (2026-10-23): criar conduta "Contratura muscular / cervicalgia / torcicolo" no formato por classes (analgésico comum; relaxante — ciclobenzaprina e tiocolchicosídeo, máx. 7 dias; anti-inflamatório — celecoxibe, cetorolaco até 5 dias, naproxeno, nimesulida 100 mg; benzodiazepínico só como opção, com aviso de risco; calor local; fisioterapia como encaminhamento), ligada às queixas de dor musculoesquelética e lombalgia; a lombalgia ganha as mesmas classes. Ficam de fora: fenilbutazona, baclofeno e tizanidina. Anti-inflamatórios alternativos (cetoprofeno, naproxeno, diclofenaco, nimesulida sem febre) nas condutas com AINE; lavagem nasal com 50 mL em cada narina; Coltrax como opção de relaxante.
- Perda de texto (2026-10-25): o atendimento em andamento fica no sessionStorage da aba (sobrevive a recarregar; some ao fechar a aba ou o navegador e no "Novo paciente"; fora do backup e da nuvem). Texto editado à mão nunca é trocado sozinho: se algo acima mudar, aparece o aviso "Refazer com as mudanças". CID sempre sem ponto (M545), como o MV procura.
- Fluxo do Atendimento (2026-10-25): barra de etapas fixa no topo + página (não uma etapa por vez). O médico usa a tela dividida: Meu Plantão de um lado, MV do outro, digitando tudo no Meu Plantão. Quer: HDA em texto corrido pela semiologia (Porto), com antecedentes em tópicos separados (comorbidades, cirurgias, internações; alergias e medicamentos como estão); exame só com alterações; atalhos de frase; perguntas curtas por queixa; informação mais importante em destaque, sem perder os porquês; visão única com 2+ queixas; checklist e exames mais enxutos. Pediu IA para dar coesão à HDA (a decidir: como e onde).

- Produtividade (2026-10-25): consulta média de 40–45 min (de uma chamada à outra); meta 25 min. Gargalos: redigir o prontuário, procurar informação, conversa. Ordem: relógio com meta (amarelo perto, vermelho ao passar; média do plantão, sem identificar paciente), HDA corrida a partir de notas soltas + checklist, exame por exceção ("abd: …" troca a linha do sistema); depois roteiro curto de fala por queixa (o que tem, o que tomar, quando voltar).
- Ideias de 2026-10-25: remédio extra na receita pelos dois caminhos (ficha do app com posologia e dias, calculando a quantidade; e colar de fora, como do Whitebook, com o app formatando); entra só no paciente e pergunta "Salvar como opção desta conduta?". "Passei para outro médico": sai da lista e da contagem, fica num quadro recolhido "Passados" e apaga com os 7 dias. Cálculos dentro da conduta (escores e doses por peso ligados, com os cálculos já conferidos). Meu hospital vai para Documentos. TEP e TVP em condutas separadas.
- Visual do Atendimento (2026-10-25): uma cor por etapa com títulos maiores; caixas de texto maiores; exames na etapa Prescrição (no MV, exames se pedem junto da prescrição da unidade). CID com 4 caracteres sem ponto, preferindo o não especificado (.9); os 17 de 3 caracteres (R51, I10, A90, A09…) não têm subcategoria na CID-10.
- Atendimento (2026-10-25, 2ª rodada): nome da conduta preso no alto no trecho dela; sinais de alarme fora do topo do Atendimento (ficam no checklist e na alta); conduta só com itens de tocar (inclui exames laboratoriais e de imagem); prescrição na unidade recolhida (no HSLS tudo é prescrito no sistema); receita de 2+ condutas agrupada por via; busca de conduta por nome, sinônimo ou CID no lugar da lista alfabética. A pensar: cor por classe de remédio na receita por toque; o quadro "Para você, não vai na receita" (ainda poluído).

- IA na HDA (2026-10-25): exceção à regra 5 decidida pelo médico. Botão "Melhorar texto (IA)" só na HDA; envia só o texto da HDA (o nome do paciente é trocado por "paciente") para a API da Anthropic, modelo Claude Haiku 4.5, com a chave do próprio médico (fica no aparelho e cifrada na senha de acesso; nunca no repositório). Trava: se a IA mudar ou tirar algum número, mantém o original. O texto melhorado vira edição manual, com Desfazer. Exame e reavaliação ficam para depois.
- Passagem de plantão (2026-10-25): "Deixo o consultório N sem pendências." ou "com pacientes pendentes:", agrupando por quem assume (cada paciente pode ir para um médico) e dizendo de forma corrida quem está ciente da troca ("Caroline e João, cientes da troca; Maria, ainda não ciente da troca"). Sem hipótese nem pendências por paciente. Na meia tela, o topo inteiro fica fixo (abas, + Paciente, relógio, etapas, ✎ Padrões).
- Passagem de plantão (2026-10-25, ajuste): sem título nem data; "Deixo o consultório N com retornos:" (ou "sem pendências."), uma linha por paciente: "Nome, ciente da troca, com Dra. X no consultório Y." Consultório próprio separado do consultório de quem assume.


# Histórico de versões

## 1.38.5 — 2026-10-26
- **HDA avisa contradição**: se um item marcado como ausente no "Não esquecer" aparece escrito nas notas (sem "nega"), surge um aviso amarelo embaixo da HDA para conferir antes de copiar.
- **Prompt padrão da IA** integra as frases do checklist ("Presença de…", "Nega…", sinais de alarme) ao parágrafo sem repetir, junta as negativas no final e não escolhe entre itens contraditórios.

## 1.38.4 — 2026-10-26
- **IA na HDA**: a HDA vai para a IA entre as marcas <entrada> e </entrada> (funciona com prompts que usam essas marcas); se a IA devolver as marcas, o app tira.

## 1.38.3 — 2026-10-26
- **IA na HDA com terminologia médica**: o prompt padrão troca linguagem leiga por termo médico (região periumbilical, fossa ilíaca direita, piora à deambulação, febre aferida, princípio ativo no lugar do nome comercial), segue a ordem da semiologia e traz um exemplo de antes e depois. Continua proibido inventar ou tirar dados.

## 1.38.2 — 2026-10-26
- **IA na HDA**: o prompt pede os números sempre em algarismos, e a trava aceita número por extenso ("três episódios" = "3x"); antes a trava recusava e o texto não mudava. O aviso agora diz qual número sumiu ou apareceu.

## 1.38.1 — 2026-10-26
- **Notas soltas da HDA mais espertas** (sem IA): "ha 2d" vira "há 2 dias" sem repetir; "sem apetite" vira inapetência (presente, não negado); "nega diarreia nega disuria" vira "Nega diarreia e disúria."; entende abd, dps, qd, pra, hj, pq, náusea, vômito, disúria, "falta de ar".

## 1.38.0 — 2026-10-26
- **Conduta nova: Contratura muscular / Cervicalgia / Torcicolo** (M62.8), no formato por classes: analgésico; relaxante (ciclobenzaprina 10 mg 12/12h padrão, 5 mg como alternativa; tiocolchicosídeo com aviso de fígado; máx. 7 dias); anti-inflamatório (celecoxibe padrão; naproxeno, nimesulida, cetorolaco, ibuprofeno, diclofenaco, cetoprofeno por toque); diazepam só como bloco opcional; calor local e fisioterapia nas orientações; Coltrax IM e cetorolaco IM na unidade. Checklist, alta leiga e exames. Ligada ao caminho de cervicalgia/torcicolo da queixa de dor musculoesquelética.
- **Lombalgia reorganizada nas mesmas classes**, com ciclobenzaprina 10 mg 12/12h padrão, tramadol e diazepam como blocos opcionais, Coltrax e cetorolaco IM na unidade.
- Conferência independente contra as bulas (Coltrax, Celebra, Toragesic, Miosan, Valium) e diretrizes (ACP 2017, NICE NG59, Harrison 22ª cap. 19): 0 crítico, 7 importantes corrigidos.

## 1.37.0 — 2026-10-26
- **"+ remédio" na receita do Atendimento**: busque o remédio (36 fichas com posologia de receita conferida contra as bulas), toque na posologia, ajuste os dias e a quantidade é calculada; entra na via certa, junto dos outros, numerada em sequência. Avisos para você aparecem só na tela.
- **Colar de outro guia (ex.: Whitebook)**: cada remédio colado vira item da receita, com o "como usar" embaixo.
- **"Salvar como opção desta conduta"**: o remédio acrescentado entra como bloco opcional na receita da conduta, nos seus padrões (vai pela nuvem).

## 1.36.0 — 2026-10-26
- **Resultados de exames na reavaliação**: cada exame pedido vira siglas (hemograma → Hb, Ht, Leuco, Plaq; PCR; Ur; Cr; Na; K; TGO; TGP; Trop; DD; Lac; INR…) para digitar só o que veio alterado, mais "Laboratoriais sem (outras) alterações". Imagem: "sem alterações" ou o laudo/impressão. Vai para a alta: "Exames laboratoriais: Leuco 15.000; PCR 8,5; demais sem alterações."
- **Pedido de internação ligado**: com os campos vazios, puxa sozinho os exames alterados, os laudos e o que foi feito no PS (medicação marcada e exames pedidos).
- **Prompt da IA visível e editável** em Documentos › Backup (caixa "IA na HDA"), com "Restaurar o padrão"; vai pela nuvem.
- Corrigido: sair do campo de exames redesenhava a tela e podia perder o que você digitava no campo seguinte.
- No pacote do hospital (privado): semi-intensiva = UTI B; UTI = UTI C (baixe de novo em Meu hospital).

## 1.35.0 — 2026-10-26
- **Estado geral por toque** no exame físico: Bom, Regular ou Mau estado geral, e Hipocorado, Desidratado, Cianótico, Ictérico, Febril, Taquipneico, Dispneico. Vem tudo normal; toque no que estiver alterado (com o gênero certo).
- **Sigla + dois pontos já traz o normal**: ao digitar "A:" nos achados, entra o texto normal do abdome para você só alterar o que mudou (vale para G, CP, OF, CV, R, A, N, ME, MI, P).
- **Relógio**: começa quando você põe o nome do paciente (ou, sem nome, ao preencher) e fecha quando você chama o próximo; toque nele e digite 0 para zerar.
- **Receita por toque com uma linha por classe**, com a cor e o nome da classe (analgésico, anti-inflamatório, relaxante, antibiótico, antialérgico, antiemético, corticoide, gastro, uso nasal, controlado, antiviral).
- Corrigido: tocar num remédio fazia sumir o destaque da etapa em que você está (as cores mudavam). O destaque agora muda quando a seção chega ao meio da tela.

## 1.34.0 — 2026-10-26
- **TEP e TVP em condutas separadas** (CID I26.9 e I80.2), com checklist, alta leiga, exames e cálculos de cada uma (TEP: Wells, PERC, sPESI; TVP: Wells da TVP). Conferência independente: 1 crítico e 5 importantes corrigidos.
- **Corrigido na receita**: ao escolher apixabana, a receita podia sair com rivaroxabana 15 mg + apixabana; agora a apixabana troca o esquema inteiro.
- Enoxaparina: 1,5 mg/kg 1x/dia só na TVP sem complicação e baixo risco de recorrência; ClCr 15–30: 1 mg/kg 1x/dia; ClCr < 15: heparina não fracionada (bula Clexane; HC-FMUSP). Trombólise não indicada nas categorias A a C2 (AHA/ACC 2026); TVP distal com ultrassom seriado (CHEST 2021); tratamento domiciliar (ASH 2020).

## 1.33.2 — 2026-10-25
- **Passagem de plantão**: sem título nem data. "Deixo o consultório 3 com retornos:" e uma linha por paciente: "Caroline da Costa Freire, ciente da troca, com Dra. Ana no consultório 5." O consultório que você deixa fica em cima; cada paciente tem "quem assume" e "consultório dele" (os sem nome usam o médico e o consultório padrão).

## 1.33.1 — 2026-10-25
- **Relógio sempre visível** no Atendimento (0:00 parado; começa quando você escolhe a conduta ou preenche algo). Toque nele para mudar a meta.
- **Início, Novo atendimento**: os resultados da busca de conduta aparecem logo abaixo da caixa de texto, e as grandes áreas vêm depois.

## 1.33.0 — 2026-10-25
- **Passagem de plantão no seu formato**: "Deixo o consultório 3 sem pendências." ou "com pacientes pendentes:", agrupando por quem assume (cada paciente pode ir para um médico, campo "quem assume") e com a ciência da troca corrida ("Caroline e João, cientes da troca; Maria, ainda não ciente da troca"). Sem hipótese nem pendências por paciente.
- **Topo inteiro fixo na meia tela**: Atendimento, Pacientes, + Paciente, relógio, etapas e "✎ Padrões" (Editar padrões foi para a barra).
- **IA na HDA (opcional)**: "✨ Melhorar texto (IA)" corrige e dá coesão com o Claude Haiku 4.5, usando a sua chave da Anthropic (Documentos › Backup). Envia só o texto da HDA, sem o nome; se a IA mudar ou tirar um número, mantém o original; tem Desfazer.
- **Busca de outra conduta**: o Safari não oferece mais cartões de crédito na caixa; a conduta acrescentada não estica mais.
- **Fichas com posologia de receita** (36 remédios, conferidas contra as bulas), base para o "+ remédio" na receita.

## 1.32.0 — 2026-10-25
- **"Passei para outro médico"** na lista de pacientes: sai da lista e da contagem de hoje, fica num quadro "Passados" (com "Voltar para a lista") e apaga com os 7 dias. Na passagem de plantão, "Passei todos" tira de uma vez os que estão em aberto.
- **Meu hospital agora fica em Documentos**, e a busca do Início acha também o texto dos protocolos do hospital (ex.: "ferro").
- **Cálculos dentro da conduta**: os escores já conferidos ligados a ela aparecem para preencher ali mesmo (pneumonia: CURB-65; TEP: Wells, PERC, sPESI; dor torácica: HEART; HDA: Glasgow-Blatchford; faringite/amigdalite: Centor; FA: CHA₂DS₂-VA e HAS-BLED; dor abdominal: Alvarado; AVC: NIHSS e ABCD²; TCE: Glasgow), com "Pôr no Atendimento".
- **Roteiro de fala (30 s)** na Alta: o que você tem, o que tomar, quando voltar — montado com a conduta, a receita e os sinais de alarme da alta leiga.
- **Relógio com segundos** e **meta editável** (toque no relógio; fica nos seus padrões e vai pela nuvem).
- **Cores das etapas sempre visíveis** e a etapa onde você está fica pintada na cor dela (a seção também ganha destaque); acabou o lilás que cobria as cores.
- **Siglas no exame por exceção**: G, CP, OF, CV, R, A, N, ME, MI, P seguidas de dois pontos trocam a linha normal do sistema.

## 1.31.0 — 2026-10-25
- **Barra de etapas fixa também na meia tela** (e no celular): no modo estreito o topo não fica fixo, então a barra fica presa no alto do Atendimento.
- **Nome da conduta preso no alto enquanto você está no trecho dela** (checklist e receita), com o CID; com duas condutas, cada uma no seu trecho.
- **Busca de conduta** no lugar da lista alfabética: sem digitar, mostra favoritas, mais usadas e as da mesma área; digitando, acha por nome, sinônimo ou CID (Enter escolhe a primeira).
- **Receita de duas condutas junta por via**: todo o uso oral junto, depois nasal, tópico…, sem repetir remédio e numerada em sequência (acabou o "Uso oral" solto no fim). Orientações numa lista só, sem repetir.
- **Conduta só com itens de tocar**: "Solicito exames laboratoriais" e "Solicito exames de imagem" entram como os outros (ligam sozinhos quando há exame pedido na Prescrição).
- **Prescrição na unidade recolhida** (o texto para copiar fica numa setinha, fechada).
- Sinais de alarme saem do topo do Atendimento (estão no checklist e na alta); na página da conduta continuam.
- Corrigido: o "copiar" do CID ficava grande depois de copiar.

## 1.30.1 — 2026-10-25
- **Uma cor por etapa** no Atendimento (a mesma do botão da barra), com títulos maiores: HDA azul, Exame verde-água, HD roxo, Conduta âmbar, Prescrição verde, Alta rosa, Internação vermelho.
- **Caixas de texto maiores** (a da HDA principalmente), que crescem com o texto.
- **Solicitar exames passou para a Prescrição**, junto da medicação na unidade, como no MV.

## 1.30.0 — 2026-10-25
- **HDA em texto corrido a partir de notas soltas**: "dor lombar 3d, piora ao levantar, irradia p/ MID, tomou dipirona s/ melhora, nega febre" vira "Paciente refere dor lombar há 3 dias, com piora ao levantar e irradiação para membro inferior direito. Tomou dipirona sem melhora. Nega febre." Os negativos das notas se juntam aos do checklist. Nota já redigida fica como está.
- **Exame por exceção**: em "Só o que estiver alterado", escreva "abd: doloroso em FID" e a linha normal do abdome é trocada pelo achado (vale para geral, cp, oro, cv, ar, abd, neuro, msk, mmii, pele).
- **Relógio do atendimento** na barra de etapas: começa quando você mexe; amarelo aos 20 min, vermelho ao passar da meta de 25 min. A lista de pacientes mostra a média de hoje (guarda só os minutos, nada do paciente).
- **Barra de etapas compacta, na mesma linha das abas do topo**, sem criar uma faixa a mais na tela.

## 1.29.0 — 2026-10-25
- **Barra de etapas no Atendimento**, fixa no topo: 1 HDA · 2 Exame · 3 HD · 4 Conduta · 5 Prescrição · 6 Alta (· 7 Internação, só se for internar). Cinza = vazia; azul = preenchida, falta copiar; verde ✓ = copiada para o MV. Tocar leva à etapa; a etapa na tela fica destacada.
- Cada campo mostra **"✓ no MV"** depois de copiado; se você mudar algo depois, o selo some e a etapa volta a azul.

## 1.28.1 — 2026-10-25
- **Não perde mais texto no Atendimento**: recarregar a página traz de volta o atendimento em andamento (fica só nesta aba; some ao fechar e no "Novo paciente"); a sincronização da nuvem espera você sair do campo para redesenhar; o texto que você editou à mão nunca é trocado sozinho — se mudar algo acima, aparece "Refazer com as mudanças".
- **CID sem ponto** (M545), como o MV procura.

## 1.28.0 — 2026-10-23
- **Exames no fluxo do prontuário**: no Atendimento, cada exame de "Pedir quando" tem **+ pedir** — vai para "Exames laboratoriais" ou "Exames de imagem" e para a Conduta ("Solicito exames…"); tocar de novo tira. O primeiro bloco de exames já vem aberto; "Não pedir" continua à vista.
- **Reavaliação guiada**: o que ficou pendente aparece para conferir ("Ver os exames: …", "Ver como ficou depois da medicação") e a **decisão** — alta para casa, observação, internar (para onde) ou transferir — já escolhe o destino da alta.
- **Lista de pacientes automática**: exames pedidos e medicação na unidade viram etapas pendentes sozinhos; o que foi visto na reavaliação marca como pronto; a decisão grava o desfecho (e o leito). Cada paciente mostra "A fazer: …".

## 1.27.0 — 2026-10-23
- **Anti-inflamatórios alternativos** nas 18 condutas com AINE: além do ibuprofeno, escolha por toque entre cetoprofeno 100 mg, naproxeno 500 mg 12/12h, diclofenaco 50 mg 8/8h (potássico na enxaqueca e na dismenorreia) e, só onde não há febre, nimesulida 100 mg 12/12h — cada um com a duração e a quantidade da conduta (gota: dose de crise). Avisos para o médico: dengue, gestação, doença renal; diclofenaco na doença cardiovascular; nimesulida sem associar a paracetamol.
- **Lavagem nasal com 50 mL em cada narina** (rinite, gripe, sinusite, tosse), com frascos de 500 mL suficientes para o uso do dia (decisão do médico; não há diretriz que fixe o volume).
- **Lombalgia: relaxantes como alternativa** — ciclobenzaprina 5 mg 8/8h ou 10 mg 12/12h e tiocolchicosídeo (Coltrax) 4 mg, 2 cp 12/12h, no máximo 7 dias; alerta do tiocolchicosídeo no perfil gestante. Aviso de ciclobenzaprina com tramadol.
- Conferência independente das doses contra as bulas (Anvisa, fabricante, EMA, SmPC): 1 crítico corrigido (Dorflex retirado: somava dipirona à dipirona já prescrita) e 5 importantes.

## 1.26.0 — 2026-10-22
- **Alergia a dipirona** (novo perfil, nos Dados do paciente, nos Alertas da conduta, ou sozinho quando "dipirona" é escrita em Alergias no Atendimento): na receita do paciente, cada dipirona oral vira **paracetamol 750 mg, 1 cp de 6/6 h, no máximo 4 cp por dia** (mesmo número de tomadas); se a receita já tem paracetamol, a dipirona só sai. Aviso para o médico acima da receita e alerta na unidade (não usar dipirona injetável; se também reagiu a AAS/AINE, evitar todo AINE; hepatopatia grave ou etilismo: evitar paracetamol). Dose conferida contra a bula do paracetamol e da dipirona e a EAACI/ENDA.
- **Receituário com escolha por toque no Atendimento**, como na conduta (o estado é o mesmo nas duas telas); a escolha por toque agora vale para toda receita com 2 ou mais remédios, para tirar ou pôr cada um.

## 1.25.0 — 2026-10-22
- **Receita e orientações só com o que o paciente deve ler** (91 condutas): saíram da receita as notas para o médico, como "(só se dengue descartada)", "(alergia a penicilina)", "(alternativa…)" e linhas de gestante, criança ou CID; ficaram dose, horário, duração, limite diário, nome comercial e modo de usar. As orientações foram reescritas em linguagem simples e formal, dirigidas ao paciente ("Beba…", "Volte ao pronto-socorro se…"), sem "Orientar…" ou "Explicar…".
- **Aviso para o médico** ("Para você, não vai na receita"), acima da receita na conduta e na prescrição do Atendimento, com o que saiu do texto do paciente; nunca entra no que é copiado.
- Conferência independente das 91 condutas: nenhuma dose, horário ou duração mudou (verificador automático); 7 ajustes importantes aplicados (dengue em linguagem do paciente; erisipela: não parar o antibiótico sem melhora; gripe e tosse: alerta de dengue com ibuprofeno; prostatite: tratar a parceria; urticária: não suspender AAS do cardiologista; sífilis: paracetamol; insônia: não parar calmante de repente) e outros menores.
- Proteção extra: linha de nota que sobrar na receita (Gestante, Criança, CID ou só entre parênteses) nunca vai para o paciente; o lint e um teste avisam se uma nota para o médico voltar ao texto do paciente.

## 1.24.0 — 2026-10-22
- **Queixas novas na porta: Lombalgia e Dor musculoesquelética** — sinais de alarme (cauda equina com RM em até 4 h, aneurisma de aorta, infecção, compressão medular por metástase, fratura; artrite séptica, síndrome compartimental, isquemia aguda, TVP, fasciíte necrosante, fratura exposta, trauma cervical, arterite de células gigantes, entre outros), o que perguntar, caminhos até a conduta, escores (Ottawa, Canadian C-spine, NEXUS) e exames.
- **Exames e encaminhamento em mais 24 condutas**: gripe, faringite, otite média, otite externa, conjuntivite, epistaxe, rinite, tosse, dispepsia, náuseas, constipação, hemorroida, prostatite, dismenorreia, vaginose, candidíase, cervicite, DIP, urticária, abscesso, herpes-zóster, hiperglicemia, hipoglicemia e ansiedade. No total, 52 queixas e condutas e 685 itens, cada um com fonte; divergências lado a lado.
- Escritos com as fontes abertas online e conferidos por um segundo agente, item a item (3 erros críticos corrigidos nas queixas novas; itens sem fonte retirados).

## 1.23.0 — 2026-10-22
- **Atendimento no formato do MV**: 1. HDA e antecedentes (com um espaço entre a história e os antecedentes) · 2. Exame físico · 3. Hipótese diagnóstica · 4. Conduta · 5. Prescrição (na unidade, receituário, atestado) · 6. Reavaliação e alta · 7. Pedido de internação (com um espaço entre os tópicos).
- **Exame físico sempre por sistemas**, com botões Masculino × Feminino e Adulto × Pediátrico × Gestante (textos próprios de cada perfil); **Cabeça e pescoço** separado de **Orofaringe**; ligar ou desligar um sistema atualiza o texto na hora, mesmo depois de editado à mão (era o defeito relatado).
- **Hipótese diagnóstica** só com os nomes, sem "Hipótese diagnóstica" e sem CID no texto (o CID continua no botão de copiar).
- **Conduta em itens por toque**: explico o quadro e a conduta; prescrevo medicação na unidade (com os remédios que você marcar); exames laboratoriais e de imagem (campos próprios, viram "Solicito exames…"); sintomáticos e antibiótico para casa; reavaliação; atestado; outras condutas. "Oriento quanto aos sinais de alarme…" passou para a alta. Os exames sugeridos ficam na Conduta.
- Prescrição: campos para copiar a **prescrição na unidade** e o **receituário** (com as orientações).
- Reavaliação: "com os seguintes resultados de exames: …". Caixas de texto sem "um por linha", só com exemplos.
- Pedido de internação: nomes dos leitos do hospital do pacote (no Santa Lúcia, a semi-intensiva é **UTI B**); também na lista de pacientes.

## 1.22.3 — 2026-10-22
- Sincronização da lista e nuvem dos padrões: só aceitam repositório **privado**. O site confere antes de ligar e recusa repositório público (como o do próprio site) ou que a chave não enxerga, dizendo o motivo; "Testar a chave" também avisa se o repositório configurado é público.

## 1.22.2 — 2026-10-22
- **Dipirona 1 g é o padrão** em todas as receitas (1 cp por tomada, metade dos comprimidos na caixa e limite diário de 4 cp); a troca agora pega todas as grafias ("500 mg", "1 a 2 cp", limite "máximo 8 cp"). Modelos salvos com 500 mg viram 1 g uma vez; quem escolher 500 mg em Meus modelos continua com 500 mg.
- Atendimento pela queixa: os **caminhos** vêm primeiro, logo abaixo do título; ao escolher um caminho, a tela volta ao topo.
- Menos texto: as descrições logo abaixo dos títulos ficam escondidas num "ⓘ" ao lado do título; nos quadros recolhidos (Pacientes por dia, Sincronizar), o título fica ao lado da setinha.

## 1.22.1 — 2026-10-22
- Início → Novo atendimento: a busca de conduta funciona como na lista de Condutas (palavra-chave, sinônimos, CID, área), com os resultados na cor da categoria, e os filtros pelas grandes áreas; Enter abre a primeira.
- Atendimento: a conduta (e as adicionais) aparecem com a cor da categoria.
- Onde estou hoje: só UPA pública e o hospital do pacote (saiu "Particular"; quem tinha "Particular" salvo fica sem escolha).

## 1.22.0 — 2026-10-22
- **Visual minimalista claro**: fundo quase branco, bordas finas, sem sombras, a cor da categoria só como um ponto ao lado do título, botões e chips neutros (a cor aparece só no selecionado).
- **Conduta mais limpa**: ficam abertos receita e na unidade (e os avisos de segurança: sinais vitais, perfil com alerta, CRB-65, protocolo do hospital); o resto (alarmes, checklist, dados do paciente, exames, orientações, fichas, alta, fontes) vira uma linha que abre com um toque. Os atalhos do topo abrem a seção.
- **Início novo**: caixa **Novo atendimento** — nome do paciente (opcional) e a **queixa da triagem** ou a **conduta**, abrindo direto o Atendimento; **Pacientes em aberto** com os avisos de 2 h e 3 h; **Favoritos**, **Mais usadas** e **Recentes**; **Onde estou hoje**; **Entrar** quando o computador ainda não está configurado.
- **Atendimento pela queixa**: alarmes, o que perguntar e os caminhos até a conduta; os exames da queixa aparecem na seção Exames.

## 1.21.0 — 2026-10-22
- **Exames e encaminhamento na porta** — 6 queixas (cefaleia, tontura/síncope, dor abdominal, dor torácica, febre, tosse/dispneia) e 20 condutas (PAC, ITU, cólica renal, dor abdominal, cefaleia, enxaqueca, vertigem, lombalgia, gastroenterite, dengue, amigdalite, sinusite, asma, DPOC, hipertensão, TCE, entorse, erisipela, gota, hemorragia digestiva alta), 353 itens em quatro grupos: **Encaminhar** (sala vermelha e especialidades), **Pedir quando** (inclusive TC com ou sem contraste, angio-TC, US, RX e regras de decisão), **Não pedir** e **Divergências entre fontes** (as duas versões, para o médico decidir). Cada item com o número da fonte; referências conferidas uma a uma no PubMed e nos sites oficiais (versões vigentes: AHA/ASA AVC 2026, SSC 2026, GINA 2026, GOLD 2026, AAO-HNS 2025, ACEP 2019/2023/2025, ACR Appropriateness, MS dengue 2024, entre outras).
- Aparecem aberto na queixa, recolhido na conduta e na seção **Exames** do Atendimento, que ganhou o campo **Exames solicitados** (entra na conduta, um por linha).

## 1.20.0 — 2026-10-22
- **Senha de acesso** (Documentos → Backup): num computador já configurado, crie uma frase de acesso; as chaves (hospital, lista, padrões) vão cifradas (AES-GCM, PBKDF2 com 600 mil iterações) para um gist seu, ilegível sem a senha. Em outro computador: **Entrar** com o usuário do GitHub e a frase — tudo liga e sincroniza sozinho. "Sair deste computador" apaga as chaves, o pacote do hospital e a lista de pacientes do aparelho.

## 1.19.0 — 2026-10-22
- **Mais de uma queixa no mesmo paciente**: no Atendimento, "Adicionar outra conduta" (até 3). Junta sinais de alarme, checklists (um por conduta), sistemas do exame, diagnósticos com os CIDs, na unidade, receita e orientações, sem repetir o mesmo remédio e renumerando.
- **Editar padrões** (botão no topo do Atendimento): checklist e sinais de alarme de cada conduta, texto de cada sistema do exame, na unidade, receita e orientações, opções da reavaliação, do "orientado sobre", objetivos e perguntas da internação — um item por linha, com "↺ original". Vale para os próximos atendimentos.
- **Nuvem no GitHub para o site** (Documentos → Backup → Nuvem: seus padrões): suas condutas editadas, modelos, padrões do Atendimento e favoritos vão para um repositório privado seu e voltam em qualquer aparelho; junta pelo mais recente; não leva dado de paciente. O indicador do topo mostra "Salvo na nuvem".

## 1.18.0 — 2026-10-21
- **Atender** virou botão principal da navegação (2º lugar), com Atendimento e Pacientes; Sala vermelha foi para o fim da barra.
- Na conduta, **Atender →** fica no topo, acima dos sinais de alarme (saiu o cartão do fim da conduta).
- Atendimento: **HPP** (história patológica pregressa: doenças, cirurgias, internações) no lugar de "Comorbidades"; HPP, medicamentos em uso e alergias aceitam Enter e saem em lista com traço.
- Sinais de alarme do checklist vão para a HDA ("Nega sinais de alarme: …").
- Alta em linguagem formal de prontuário: os sinais de alarme orientados vêm do checklist técnico ("Orientados os sinais de alarme, com retorno imediato ao pronto-socorro em caso de: …"); a versão leiga continua só na folha e no QR do paciente.

## 1.17.4 — 2026-10-21
- Sincronização da lista: a mensagem de recusa mostra o repositório usado e, quando o GitHub informa, a permissão que falta; botão "Testar a chave" (sem gravar nada) diz se a chave enxerga o repositório e se pode ler o conteúdo.

## 1.17.3 — 2026-10-21
- Meus modelos: **Exame por sistemas** — o texto de cada sistema (geral masculino e feminino, cabeça e orofaringe, cardiovascular, respiratório, abdome, neurológico, musculoesquelético, membros inferiores, pele) pode ser trocado pelo seu, vale no Atendimento e vai com o backup e a nuvem; "Voltar ao original" desfaz.

## 1.17.2 — 2026-10-21
- Correção: os campos de chave do GitHub (Meu hospital e Sincronizar) eram campos de senha, e o navegador preenchia o da lista com a chave do hospital, que o GitHub recusava (403). Agora o navegador não guarda nem preenche essas chaves, e o site avisa se a chave do hospital for colada na lista.

## 1.17.1 — 2026-10-21
- Sincronização da lista: quando o GitHub recusa a chave, aparece o motivo que ele deu (ex.: "403: Resource not accessible by personal access token"); botão "Trocar a chave" para quando a chave vence ou é gerada de novo, sem desligar e sem pedir a senha outra vez.

## 1.17.0 — 2026-10-21
- **Pacientes do plantão** (aba nova em Documentos), por decisão do médico (exceção registrada à regra de não salvar dado de paciente): nome no topo do Atendimento põe o paciente na lista, que grava sozinha o que foi digitado; etapas separadas — exame (qual, pendente → pronto), medicação, reavaliação com hora, parecer (especialidade) — e desfecho (alta, observação, internação e onde, transferência, evasão); aviso amarelo com 2 h sem reavaliar e vermelho com 3 h sem desfecho; tocar no nome reabre o Atendimento dele.
- **Passagem de plantão**: mensagem pronta para o grupo com nome, hipótese, pendências, se sabe da troca, médico que assume e consultório.
- Só no aparelho, numa chave própria (fora do backup e da nuvem do painel); apaga sozinha em 7 dias; a contagem de pacientes por dia fica, sem nome.
- **Sincronização entre aparelhos, cifrada**: a lista é cifrada no aparelho (AES-GCM com chave derivada da senha por PBKDF2-SHA-256) antes de ir para um repositório privado; a senha não sai do aparelho; mudanças nos dois aparelhos se juntam campo a campo.

## 1.16.0 — 2026-10-21
- **Atendimento** (a antiga aba Evolução): uma tela só, na ordem do prontuário, com cópia por campo — História (HDA), Exame físico, Na unidade, Diagnóstico, Conduta, Reavaliação e alta, Pedido de internação e Atestado; "Copiar tudo" junta história, exame, diagnóstico, conduta e alta. Campo editado à mão não é sobrescrito ("Refazer" volta ao automático).
- A conduta ganha "Atender este paciente →" no lugar do "Fechar o atendimento"; sinais vitais, NEWS2, CRB-65 e alertas continuam valendo nas duas telas.
- **Checklist "Não esquecer"** escreve "Presença de tosse, expectoração purulenta e dispneia. Nega dor torácica pleurítica e confusão mental." e "Ao exame, presença de …"; fica também dentro do Atendimento.
- **Exame físico direcionado**: por sistemas (geral, cabeça e orofaringe — novo —, cardiovascular, respiratório, abdome, neurológico, musculoesquelético, membros inferiores, pele), já ligados conforme a conduta; sai só o que está ligado; campo para os achados alterados. Os modelos completos continuam disponíveis.
- **Na unidade em lista** (um item por linha, detalhes embaixo), para olhar e selecionar no prontuário; o texto continua editável em "Editar o texto".
- **CID em destaque**, com cópia num toque (na conduta e no Atendimento).
- **Alta em tópicos**: reavaliação (melhora após medicação, exames), o que foi orientado, os sinais de alarme explicados (da alta leiga da conduta; toque para tirar), "compreendeu e concorda" e o destino, sem repetir a prescrição.
- **Pedido de internação**: enfermaria/apartamento, semi-intensiva ou UTI; justificativa, objetivo, exames laboratoriais e laudos relevantes, o que já foi feito no PS e parecer, com perguntas que ajudam a escrever a justificativa.

## 1.15.0 — 2026-10-21
- **Modo hospital** ("Onde estou hoje" no botão do hospital, com o pacote carregado):
  - onde o pacote traz a conduta na unidade do hospital, ela vira a principal (com a referência do protocolo) e a versão do app fica recolhida logo abaixo; copiar, evolução e "Fechar o atendimento" usam a do hospital; o texto do hospital nunca vira "meu padrão" (que vai para backup e nuvem);
  - **Hospital × app: você decide** — divergências entre o protocolo do hospital e a fonte do app, lado a lado, cada uma com a sua fonte (aparecem sempre que o pacote está carregado; lista completa na aba Meu hospital);
  - regras do hospital por conduta e por queixa;
  - evolução: lembretes do hospital para o prontuário e aviso quando o texto tem frase que o hospital proíbe;
  - seletor de destino com os desfechos do hospital (volta aos 4 de sempre fora do modo).

## 1.14.0 — 2026-10-21
- **Meu hospital** (aba nova em Condutas): traz os protocolos do hospital onde você trabalha a partir do seu repositório privado no GitHub (chave só de leitura) ou de um arquivo. O pacote fica só no aparelho, fora do backup e da nuvem, e se atualiza sozinho ao abrir o site; botão "Apagar do aparelho". O site não contém conteúdo de nenhum hospital (formato em `docs/FORMATO-HOSPITAL.md`).
- Com o pacote carregado: "Onde estou hoje" ganha o botão do hospital, com o nome e a cor do pacote; condutas e queixas ligadas ao protocolo mostram "Ver no protocolo do hospital", que abre a seção certa por cima, sem perder a conduta; busca nos protocolos.
- **Critérios de internação do hospital**: escolha a doença ou o grupo, marque os critérios por toque e a prioridade, e copie a justificativa pronta para o relatório, com as frases que o hospital proíbe em destaque. As marcações são do paciente: só na memória, e "Novo paciente" limpa.

## 1.13.2 — 2026-10-18
- Correção: a barra de atalhos da conduta deixa de flutuar sobre o texto ao rolar (no celular ela cobria a conduta como um retângulo solto); fica fixa no topo da conduta, logo abaixo do cabeçalho dela.

## 1.13.1 — 2026-10-18
- Correção: a barra de atalhos da conduta (Alarmes, Receita, Checklist, Fechar, Alta) ficava escondida atrás do cabeçalho fixo ao rolar e aparecia como um retângulo solto; agora gruda logo abaixo do cabeçalho, em qualquer tamanho de tela.

## 1.13.0 — 2026-10-17
- **Sinais vitais que avisam sozinhos** (Fechar o atendimento): campos de O2 suplementar e consciência; **NEWS2 calculado na hora** (RCP 2017) com aviso no topo da conduta — 0–4 baixo; 5–6 ou um parâmetro com 3 pontos, resposta urgente, "não é verde"; ≥ 7, emergência — e linha na evolução; não usado em menores de 16 anos e gestantes. Alertas isolados: SpO2 < 92% em ar ambiente, PA ≥ 180/110 (Diretriz Brasileira de Hipertensão 2025, com aviso se a receita tem anti-inflamatório), febre > 37,8 °C com FC > 90 (triagem de sepse, ILAS). A evolução descreve confusão e O2 suplementar quando marcados.
- **Pneumonia: gravidade pelo CRB-65** (sem ureia), calculado com idade e sinais vitais, texto único por faixa na conduta, no escore e na queixa (NICE NG250; BTS; SBPT) e 1ª dose EV para quem fica (ATS/IDSA 2019).
- **Alta para o paciente em mais 8 condutas:** cefaleia, lombalgia, TCE leve, vertigem, infecção urinária, cólica, dor abdominal e entorse.
- **Condutas corrigidas (aprovadas pelo médico):** dor abdominal com orientação de retorno e de dengue; entorse com ibuprofeno com ressalvas e sinais de retorno; lombalgia com anti-inflamatório como 1ª opção (NICE NG59); TCE com esporte de contato só após 3 semanas.
- Conferido por agentes independentes.

## 1.12.6 — 2026-10-17
- **Revisão geral, lote 5 (Gineco/Obstetrícia, Endócrino e Outros), aprovada pelo médico e conferida — conclui a revisão das 98 prescrições:**
  - cetoacidose: potássio só entre 3,5 e 5,0 (abaixo de 3,5, sem insulina), insulina em bomba na moderada e grave (consenso ADA/EASD/JBDS 2024);
  - "unidades" por extenso em toda prescrição de insulina e sulfato de magnésio por extenso (ISMP);
  - hipertireoidismo: propiltiouracil fora da receita de casa; crise tireotóxica na unidade, com doses e intervalos da ATA 2016; tiamazol 15 mg;
  - hiperglicemia com a escala de correção da SBD 2026 e insulina regular 30 min antes da refeição;
  - hipoglicemia por sulfonilureia igual ao cartão de intoxicação;
  - IST pelo PCDT 2022 (link correto), sífilis com intervalos da NT 14/2023 e neurossífilis, DIP com critérios de internação, metronidazol coerente entre abas;
  - sangramento uterino com ácido tranexâmico 1 g EV e suas contraindicações; dismenorreia sem codeína; candidíase com restrição ao fluconazol na lactante; hipercalemia pela UK Kidney Association 2026.

## 1.12.5 — 2026-10-17
- **Revisão geral, lote 6 (Cardio, Emergência e Toxico/Infecto), aprovada pelo médico e conferida:** tenecteplase com metade da dose a partir de 75 anos também na conduta do IAM e na calculadora (ESC 2023; STREAM-2); FA com janela de 24 h para cardioversão (ESC 2024) e doses de amiodarona e digoxina; procainamida e digoxina com "confirme se a unidade tem"; TEP pela AHA/ACC 2026, com apixabana para 30 dias e trombólise na PCR por TEP com a ressalva da dose; edema agudo de pulmão pela ESC 2026; dengue com PA diferencial ≤ 20 mmHg em todo o painel; teto de 1.000 mL no bolus da anafilaxia na calculadora; reação alérgica grave sem hidrocortisona 500 mg e com corticoide com fonte; PEP pelo PCDT 2024; tétano com imunização passiva nas situações especiais; intubação e sepse alinhadas ao checklist e ao cartão.

## 1.12.4 — 2026-10-17
- **Revisão geral, lote 4 (Dermato), aprovada pelo médico e conferida:** ajuste renal do aciclovir corrigido (no herpes simples o painel sugeria aumentar a dose) e valaciclovir como alternativa no herpes labial e no zoster, com ajuste renal; clindamicina 300 mg de 6/6h; ivermectina pela tabela de peso da bula (escabiose, larva migrans); impetigo com ácido fusídico e antibiótico oral por 5 dias; urticária com anti-histamínico de 2ª geração e dose de bula; permetrina na gestação e a partir de 2 meses; tetos de dipirona e codeína; sem sulfadiazina fora da queimadura, sem creme de anti-histamínico, sem hidrocortisona de rotina na picada.
- **Queimaduras:** Parkland iniciando com 2 mL × kg × % SCQ no adulto (American Burn Association 2023; ATLS 11ª ed.), 3 mL na criança com manutenção e 4 mL no trauma elétrico, ajustando pela diurese (0,5–1 mL/kg/h no adulto; 1–1,5 na criança), na conduta e na calculadora.

## 1.12.3 — 2026-10-17
- **Revisão geral, lote 3 (Dor/Neuro/Ortop e Psiquiatria), aprovada pelo médico e conferida:** analgésicos com teto diário e ibuprofeno só com dengue descartada (cefaleia, enxaqueca, lombalgia, entorse, TCE); salvas com sumatriptano nasal pela apresentação brasileira e prednisona 100 mg com redução (EAN 2023); enxaqueca sem repetir naratriptana e com metoclopramida + dexametasona 10 mg IM; gota e profilaxia com interações da colchicina e conduta na doença renal; alopurinol podendo começar na crise; convulsão alinhada ao cartão Agora, tiopental com a dose da EFNS 2010; vertigem sem flunarizina; insônia sem hipnótico; ansiedade sem passiflora; lombalgia sem dexametasona; agitação e AVC alinhados ao cartão e ao fluxo; abstinência guiada pela CIWA-Ar com tiamina na suspeita de Wernicke; TCE com TC para todo anticoagulado (NICE 2023).

## 1.12.2 — 2026-10-17
- **Revisão geral, lote 2 (Gastro e Uro/Nefro), aprovada pelo médico e conferida:** H. pylori com quádrupla com bismuto por 14 dias (V Consenso Brasileiro 2026); hemorragia digestiva com doses do vasoativo (terlipressina pela bula, por peso) e do omeprazol, alvo de hemoglobina 7–8 e sem ácido tranexâmico; infecção urinária com receita da gestante e alertas de rim (nitrofurantoína, fosfomicina, fenazopiridina); cólica renal, ITU e prostatite com ibuprofeno só com dengue descartada; prostatite com 14 dias (estender se preciso) e esquema para risco de IST; desidratação na criança pelo cartaz do MS de 2023; verminose com ivermectina pela tabela da bula na estrongiloidíase; morfina 0,05 mg/kg na dor abdominal; ajustes em constipação, gastroenterite, dispepsia, enterobíase, afta, gases, hemorroida e HPB.

## 1.12.1 — 2026-10-17
- **Revisão geral, lote 1 (Respiratório e Otorrino/Oftalmo), aprovada pelo médico e conferida:** asma pela GINA 2026 (prednisona 40–50 mg; após a crise, budesonida-formoterol como manutenção e alívio; alvo de O2 92–95%); DPOC pela GOLD 2026 (antibiótico 5 dias; metilprednisolona EV se não tolerar VO); pneumonia e OMA do adulto com 5 dias; gripe sem loratadina; bronquiolite com limiar de O2; crupe com teto de 10 mg de dexametasona em todo o painel; tosse com busca de tuberculose; amigdalite com antibiótico só com estreptococo confirmado ou Centor/FeverPAIN alto e azitromicina 500 mg + 250 mg; conjuntivite com tobramicina 4/4h; otite externa com os nomes comerciais certos; rinite sem prometazina IM; sinusite com observação sem antibiótico quando o retorno é garantido e doxiciclina na alergia a penicilina.

## 1.12.0 — 2026-10-17
- **Intoxicação — cartão "Agora":** estabilizar, reconhecer a síndrome tóxica, carvão ativado, antídotos (naloxona, flumazenil, N-acetilcisteína, bicarbonato no tricíclico, atropina no organofosforado, glicose e octreotide na sulfonilureia), observação e notificação; doses pelo peso.
- **CIATox a um toque:** Disque-Intoxicação 0800 722 6001 e o CIATox da sua região, salvo no aparelho.
- **Nomograma do paracetamol** (Cálculos > Laboratório): linha de 150, nível em mcg/mL ou µmol/L, avisos de quando não vale.
- **Fichas novas, grupo Antídotos:** naloxona, flumazenil, N-acetilcisteína (3 bolsas e 2 bolsas, peso de cálculo até 100 kg) e carvão ativado.
- **Decisões do médico:** carvão ativado 1 g/kg (máx. 50 g) em todo o painel, inclusive na calculadora; N-acetilcisteína sem dosagem em até 8 h se > 150 mg/kg ou > 10 g.
- **Conduta de intoxicação** reescrita com as mesmas doses do cartão. Conferido por agentes independentes (cartão, nomograma, CIATox e fichas).

## 1.11.0 — 2026-10-09
Correções da simulação de plantão no celular (10 casos da porta).
- **Receita com escolha por toque:** acima da receita, chips para escolher entre as alternativas ("Ou"), ligar os blocos opcionais ("Se alergia a penicilina", "Se falha…") e tirar itens. Só o escolhido vai para a receita, a evolução e a cópia, renumerado; notas para o médico ("Criança", "Gestante", "CID") nunca saem na receita. Os alertas (QT, alergia) seguem a receita escolhida.
- **"+ Paciente"** no topo de todas as abas (dois toques): limpa o paciente em todas as abas — conduta, checklist, escolhas da receita, evolução, atestado, escores, calculadoras, pediatria, bomba, feridas e busca.
- **Evolução que não contradiz o paciente:** "Nega…" só a partir do checklist marcado com "−"; campo vazio sai como "não informado"; com temperatura de febre o exame diz "febril" e com FR > 20, "taquipneico"; **destino** (alta, observação, internação, transferência) no lugar de "Paciente liberado", sem padrão nas emergências.
- **Alergia à penicilina num só estado:** marcar no checklist, em Dados do paciente ou no chip de alerta liga os três e entra na evolução.
- **Busca** por início de palavra ("dente" não acha "acidente"), siglas como palavra inteira (SCA, ITU), sem "de/do/da", com as páginas "Por queixa" e os nomes comerciais.
- **Pesos começam vazios** (calculadora e Pediatria) e a calculadora avisa quando o peso não combina com o modo adulto ou pediátrico, em vez de trocar sozinha.
- **Navegação na conduta:** barra fixa de atalhos (Agora, Alarmes, Receita, Checklist, Fechar, Alta); preparo dos injetáveis, fontes e "o que mudou" recolhidos; alvos de toque maiores no celular.

## 1.10.1 — 2026-10-09
- **Correções de segurança (auditoria independente, achados críticos):**
  - noradrenalina: a bomba de infusão calcula em mcg/kg/min e agora avisa quando a dose sai de 0,05–2 mcg/kg/min, mostra o total em mcg/min ao lado e a tabela usa pontos clínicos (0,05 a 1); o cartão da sepse e a ficha trazem a conversão de mcg/min para mcg/kg/min. Antes, digitar uma dose em mcg/min na bomba dava vazão cerca de 70 vezes maior sem aviso;
  - paracetamol pediátrico (aba Pediatria): prescrito em mL com seringa oral, não mais em gotas calculadas (gotas por mL variam entre marcas); abaixo de 12 anos, teto de cerca de 2,2 mL (35 gotas da bula); limite superior arredondado para baixo.

## 1.10.0 — 2026-10-09
- **Por queixa** (nova aba em Condutas): cefaleia, tontura/vertigem/síncope, dor abdominal, dor torácica, febre e tosse/dispneia. Primeiro os sinais de alarme com o que fazer, depois o que perguntar e examinar, os caminhos que abrem a conduta e os escores úteis. Conferido por agente independente (21 correções aplicadas).
- **Alta para o paciente** em 15 condutas da porta: texto em linguagem simples, "volte ao pronto-socorro se…", para imprimir ou abrir pelo QR code numa página pública só com a orientação, sem dado do paciente. Conferido (5 correções).
- **Correções em condutas publicadas** (aprovadas pelo médico):
  - gripe, faringite, amigdalite e tosse: ibuprofeno só com dengue descartada (MS, Dengue 2024);
  - dispepsia: endoscopia a partir de 40 anos e testar e tratar o H. pylori abaixo disso (V Consenso Brasileiro, 2026);
  - gastroenterite: manter a alimentação habitual, antidiarreico não é rotina, gestante sem ciprofloxacino;
  - náuseas: fontes verificáveis no lugar de "consenso clínico", causas a procurar e sinais de retorno;
  - constipação: contraindicações do óleo mineral e alerta do Fleet (FDA 2014).

## 1.9.0 — 2026-10-08
- **Porta: atendimento em 1 tela.** No fim de cada conduta, "Fechar o atendimento": queixa, alergias, antecedentes, medicamentos, sinais vitais, exame físico (escolhido pelo sexo, idade e gestação informados), o checklist marcado, receita, orientações e atestado ou comparecimento, tudo pronto para copiar e colar no prontuário. "Novo paciente" limpa tudo; nada do paciente fica salvo.
- **Sinais de alarme no topo** de cada conduta, antes da receita, para reavaliar a classificação antes de liberar.
- Evolução: com temperatura de febre informada (≥ 37,8 °C), o exame físico padrão deixa de dizer "afebril".

## 1.8.1 — 2026-10-08
- **Ficha do biperideno** (grupo Psiquiatria): distonia aguda por haloperidol e antieméticos, com dose pediátrica por peso (teto da bula até 10 anos) e a difenidramina como alternativa, com as contraindicações. Conferida por agente independente.
- **Decisões do médico sobre as divergências entre fontes:**
  - tenecteplase no AVC: a conta de 0,25 mg/kg (AHA 2026) e a dose da faixa de peso da bula lado a lado, no cartão, na calculadora e no fluxo;
  - tenecteplase no IAM calculada pela faixa de peso no cartão, mostrando também a metade da dose a partir de 75 anos (ou só a metade, se a idade informada for ≥ 75);
  - volume na anafilaxia: 20 mL/kg com teto de 1.000 mL por bolus no adulto;
  - fenobarbital (20 mg/kg) e haloperidol (repetir em 30 min) mantidos, citando a outra fonte em "detalhes".

## 1.8.0 — 2026-10-08
- **Cartão "Agora"** no topo de 7 emergências (convulsão, agitação psicomotora, anafilaxia, sepse, IAM, AVC e PCR): etapas com tempo, até 3 ações por etapa, campo de peso (não fica salvo) com doses em mg e mL já calculadas, aviso de dose máxima, referência ao lado para conferir, "detalhes" recolhidos e atalhos para PCR guiada, intubação, bomba de infusão e fluxos. Conferido por dois agentes independentes e por uma checagem final.
- **Ficha do haloperidol** no novo grupo **Psiquiatria**.
- **Correções em conteúdo que já estava no ar:**
  - adrenalina em infusão na anafilaxia: 1 mg em 100 mL a 0,5–1 mL/kg/h (RCUK 2021) também na ficha e no preparo dos injetáveis; 250 mL fica para a bradicardia;
  - glucagon no adulto: 1 mg EV, repetível ou seguido de 1–2 mg/h (repetir a cada 5 min é a orientação pediátrica);
  - agitação: na intoxicação alcoólica, haloperidol isolado; diazepam só na abstinência alcoólica e na cocaína;
  - convulsão e abstinência alcoólica: tiamina junto com a glicose, sem atrasá-la;
  - convulsão: contraindicações do valproato EV;
  - fenitoína pediátrica: sem o teto de 1.500 mg, que é da fosfenitoína;
  - noradrenalina: dose inicial citada pela bula FDA.
- Testes do cartão e das fichas por cima também no celular.

## 1.7.0 — 2026-10-05
- **Páginas conectadas:** o remédio citado em condutas, protocolos, eletrólitos, calculadora e nas próprias fichas vira botão; a ficha abre por cima (no celular, de baixo para cima) sem perder a conduta. O botão voltar do celular e a tecla Esc fecham a ficha.
- Abaixo da receita e do "Na unidade", a linha **Fichas** lista os remédios citados.
- Ficha por cima com atalhos para a **bomba de infusão** (já com a droga escolhida) e para a aba Remédios.
- Reconhecimento de nomes compostos (KCl, sulfato de magnésio, gluconato de cálcio, insulina regular, escetamina etc.); a lidocaína do anestésico local deixa de apontar para a ficha da lidocaína antiarrítmica.
- Roteiro do acervo pessoal no claude.ai (`docs/PROJETO-CLAUDE.md`).

## 1.6.0 — 2026-09-28
- **16 fichas da sala vermelha, parte B**, com nomes comerciais: Antiarrítmicos (amiodarona, adenosina, atropina, metoprolol, lidocaína), Anticoagulantes e trombolíticos (heparina, enoxaparina, alteplase, tenecteplase) e Glicose e eletrólitos EV (insulina regular, glicose 50%, KCl, sulfato de magnésio, gluconato de cálcio, bicarbonato, NaCl 20%). Conferidas por agente independente.
- **Correções da conferência:**
  - metoprolol na emergência hipertensiva: 5 mg a cada 10 min, até 20 mg (Posicionamento Luso-Brasileiro 2020), também no protocolo;
  - hipoglicemia: tiamina junto com a glicose, sem atrasá-la;
  - miastenia grave no sulfato de magnésio: fonte corrigida para o Manual de Gestação de Alto Risco do MS.
- **Teste da PCR estável.**

## 1.5.3 — 2026-09-28
- Nomes comerciais nas 45 fichas antigas: 70 marcas conferidas na lista oficial de preços CMED (set/2026); marcas fora da lista ficaram de fora.

## 1.5.2 — 2026-09-27
- Fichas: nome comercial em letra pequena logo abaixo do princípio ativo, na lista e no título.

## 1.5.1 — 2026-09-27
- Fichas: grupos com nomes curtos (Analgésicos, Gastro, Antibióticos, Corticoides e antialérgicos) e a sala vermelha separada em Vasoativos, Sedação e intubação e Anticonvulsivantes.

## 1.5.0 — 2026-09-27
- **17 fichas da sala vermelha** (vasoativos, sedação, bloqueadores neuromusculares, anticonvulsivantes), com nomes comerciais; conferidas por agente independente.
- **Escetamina no lugar da cetamina racêmica** na IOT (calculadora, conduta e emergência pediátrica): 0,5–1 mg/kg na indução (bula Ketanest S; cerca de 2 vezes mais potente).
- **Fenobarbital:** até 50 mg/min (bula: < 60 mg/min), ampolas de 100 e 200 mg/mL e contraindicações da bula.
- **Rocurônio pediátrico:** 1 mg/kg (diretriz pediátrica S2k 2022), com nota de uso fora da bula.
- **Estado de mal:** fonte da Neurocritical Care Society 2012 incluída; cetamina sem dose com fonte retirada.

## 1.4.3 — 2026-09-26
- **Eletrólitos: hiponatremia e hipernatremia.** Inclui salina 3% (bolus, metas, limites de correção e preparo a partir do NaCl 20%), correção excessiva (SG 5% + desmopressina), SIADH, déficit de água livre e velocidade de correção. Conferido por agente independente; ajustes de citação aplicados.

## 1.4.2 — 2026-09-26
- **Acidente ofídico atualizado ao PCDT 2025 (Portaria SECTICS/MS nº 83)**, após conferência independente:
  - antibotrópico 3/6/12 frascos (antes 2–4/4–8/12);
  - antielapídico sem soro no leve, 5 no moderado e 10 no grave (antes 10 em todos);
  - incluídos via, diluição, velocidade, observação, ausência de pré-medicação e contraindicação de AINE.
- **Acidente escorpiônico conferido com o PCDT 2025 (Portaria nº 59):** doses mantidas; incluídos diluição, via intraóssea, ECG e suporte.
- **Doses por peso reorganizadas por especialidade** (IOT; choque, sepse e anafilaxia; Cardio / Vascular; Neuro; Endócrino / Metabólico; hidratação, dengue e queimaduras; Toxico / Infecto; e os blocos pediátricos), sem mudar nenhuma dose.

## 1.4.1 — 2026-09-26
- PCR:
  - metrônomo corrigido: toca mesmo antes de iniciar e o botão pulsa no ritmo;
  - próximos passos em lista numerada, com aviso nos últimos 15 s do ciclo.
- Doses por peso: a % de superfície queimada aparece só no Parkland e começa vazia.
- Feridas e mordeduras: "Precisa de sutura?" com região; o fio e o prazo de retirada entram no texto da evolução.

## 1.4.0 — 2026-09-26
- **PCR guiada** (Sala vermelha → PCR, AHA 2025):
  - cronômetro geral e ciclos de 2 min com aviso para checar o ritmo;
  - tempo desde a última adrenalina (amarelo aos 3 min, vermelho aos 5);
  - contagem de choques e sugestão do próximo passo;
  - metrônomo de 110/min, 5H e 5T;
  - registro com horário para a evolução.
- **8 protocolos em fluxo, com decisões:** IAM com supra, AVC, cetoacidose, hipercalemia, anafilaxia, crise hipertensiva, pré-eclâmpsia e hemorragia pós-parto.
- **Eletrólitos:** reposição de K, Mg, P e Ca, e hipercalemia aguda.
- **Alerta de QT na receita:** 88 remédios da lista CredibleMeds, com busca por palavra inteira.
- **Checklist "Não esquecer" nas 98 condutas.**
- **"Onde estou hoje: UPA pública / Particular":** selo RENAME nos remédios da conduta e filtro "Só RENAME" nas fichas.
- **13 categorias por especialidade** (ex.: Cardio / Vascular, Dor / Neuro / Ortop, Otorrino / Oftalmo, Toxico / Infecto). A organização que você personalizou é mantida.
- **Condutas atualizadas:**
  - anafilaxia (RCUK 2021, WAO 2020, AAAAI 2023): corticoide deixa de ser rotina e a observação passa a depender do caso;
  - pré-eclâmpsia (RBEHG 2023, MS 2022).
- **Conferência independente:** protocolos, eletrólitos, QT e PCR foram conferidos, e as correções apontadas foram aplicadas antes da publicação.

## 1.3.0 — 2026-09-26
- **Sala vermelha, parte 1:**
  - bomba de infusão: 12 drogas (vasoativas, vasodilatadores, amiodarona, sedação e analgesia), dose ↔ mL/h nos dois sentidos, diluições prontas ou próprias, tabela de doses e alerta fora da faixa;
  - intubação: checklist atualizado (DAS 2025, SCCM 2023, PREOXI, DEVICE) e ventilação inicial com peso predito.
- **Cálculos → Laboratório e ECG:** ânion gap (com albumina) e delta/delta, gasometria (Winter e compensações), sódio corrigido, osmolaridade, cálcio corrigido, QTc (Bazett e Fridericia) e ClCr. Conferidos no Harrison, 22ª ed.
- **Doses por peso com fonte em todos os blocos** (antes não tinham). A conferência independente corrigiu:
  - paracetamol em gotas (gotas por mL variam: prescrever em mL);
  - Parkland pediátrico 2–4 mL;
  - fenobarbital 15–20 mg/kg a até 50 mg/min;
  - prednisolona com teto por idade (GINA);
  - hidroxizina 0,5–0,7 mg/kg;
  - ivermectina pela tabela de peso da bula;
  - glicose 10% (ISPAD 2022);
  - salbutamol por idade;
  - tempo de infusão da fenitoína pediátrica;
  - teto do carvão ativado;
  - alertas de heparina, escetamina e potássio antes da insulina.
- **Modelos de exame físico por extenso, sem siglas,** em versões masculina e feminina (adulto e pediátrico). Modelos editados por você são mantidos.
- **Regra 5 cumprida:** peso, idade, sexo, perfis (gestante, alergia) e respostas de feridas deixam de ser salvos no aparelho; o que versões antigas salvaram é apagado ao abrir.
- **Correções:** lista de itens ocultos no Backup; nome de categoria escapado.
- **Build:** falha na hora se o JavaScript montado tiver erro de sintaxe.

## 1.2.0 — 2026-09-26
- **Nova navegação em 5 seções:** Condutas, Remédios, Sala vermelha, Documentos e Cálculos. Barra inferior no celular e trilho lateral no computador; cada seção tem a sua cor.
- **Tela inicial:**
  - busca única em condutas, fichas, escores, doses por peso, pediatria e ferramentas; acha também a conduta pelo remédio citado na receita (ex.: "adrenalina" → anafilaxia);
  - atalho `/` ou Ctrl+K abre a busca de qualquer página;
  - botão de sala vermelha, favoritos e itens abertos recentemente.
- **Sala vermelha:** condutas de emergência reunidas, com atalhos para doses de emergência por peso, emergência pediátrica e escores.
- **Tela da conduta:**
  - ações numa barra compacta;
  - alertas por perfil (gestante, idoso, rim, alergia à penicilina) no topo, antes da receita; só o perfil ligado abre os detalhes;
  - fichas dos remédios num bloco próprio, depois das orientações.
- **Checklist "Não esquecer"** em 20 condutas (anamnese, antecedentes, exame físico dirigido e sinais de alarme), com fontes. Cada item é marcado como presente (+) ou ausente (−) e vira texto na evolução ("Refere…", "Nega…", "Sem sinais de alarme…"). As marcações ficam só na memória da aba.
- **Organização:** Backup passou para Documentos; a calculadora agora se chama "Doses por peso".

## 1.1.0 — 2026-09-24
- **Nova aba Medicações:** 45 fichas em 4 grupos (analgésicos e anti-inflamatórios, antieméticos e gastro, antibióticos, corticoides e antialérgicos).
  - Cada ficha traz classe, apresentações, doses de adulto e pediátrica, diluição e administração, rim, fígado, gestação, lactação, contraindicações, alertas e fontes.
  - Calculadora pediátrica por peso, com teto por dose.
  - Busca e filtros por grupo e por via.
  - Todas as fichas passaram por dupla conferência contra as fontes (32 correções antes de publicar).
- **Condutas:** passam a mostrar atalhos para as fichas das medicações citadas.
- **Projeto profissional:**
  - código dividido em módulos;
  - build único gera as três versões;
  - verificação automática de conteúdo;
  - 37 testes automáticos (computador e celular);
  - publicação automática no GitHub Pages;
  - cache do app atualizado sozinho a cada versão.

## 1.0.0 — 2026-09-24
- **Aba Feridas:**
  - profilaxia antirrábica (MS NT 8/2022) e antitetânica (Guia de Vigilância 2024);
  - antibiótico em mordedura (IDSA 2014);
  - dose máxima de anestésico local, toxicidade (ASRA 2020) e tabela de sutura (AFP 2017).
- **NIHSS; categorias editáveis; tema claro/escuro; ícone e nome "Meu Plantão".**
- **Base:**
  - 98 condutas revisadas com fontes;
  - pediatria;
  - emergência pediátrica;
  - 15 escores;
  - evolução, atestado, calculadora, modelos e backup.

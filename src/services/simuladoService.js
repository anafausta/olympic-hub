import { storageService } from './storageService';

const QUESTOES_STORAGE_KEY = 'olympic_hub_questoes_bank_v2';
const SIMULADO_ACTIVE_KEY = 'olympic_hub_simulado_active';
const SIMULADO_HISTORY_KEY = 'olympic_hub_simulado_history';

// Complete 40-question OLITEF bank with 5 choices (A, B, C, D, E) per question
const INITIAL_QUESTOES = [
  {
    id: 'q-001',
    assunto: 'Matemática Financeira',
    nivel: 2,
    enunciado:
      'Bianca estava pesquisando sobre juros compostos quando leu uma frase comumente atribuída ao físico Albert Einstein: “Juros compostos são a oitava maravilha do mundo”. Qual característica dos juros compostos pode ser atribuída a essa frase?',
    alternativas: [
      'Os juros compostos representam o poder do crescimento linear.',
      'Os juros compostos mostram como ficar rico de forma fácil e rápida.',
      'Os juros compostos têm um poder de crescimento ao longo do tempo, gerando ganhos exponenciais.',
      'O monumento “Juros Compostos XVIII”, localizado no interior da Grécia deveria ser a 8ª maravilha do mundo antigo.',
      'Os juros compostos são uma impossibilidade matemática que só existe na economia.'
    ],
    correta: 2, // C
    explicacao:
      'Nos juros compostos, os juros de cada período são incorporados ao capital, gerando "juros sobre juros" e provocando um crescimento exponencial ao longo do tempo.'
  },
  {
    id: 'q-002',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'João estava conversando com o seu amigo Paulo sobre a história do dinheiro. Na época do escambo, as pessoas trocavam coisas entre si. Depois, veio o dinheiro em espécie e hoje temos tecnologias mais avançadas com transferências instantâneas. Paulo fez as seguintes afirmações sobre o Sistema Financeiro Nacional:\nI. Os bancos facilitam e organizam a troca de dinheiro entre as pessoas.\nII. O Pix aumentou a velocidade das transações financeiras.\nIII. O Banco Central e a CVM são instituições que fazem parte do Sistema Financeiro Nacional.\nIV. Quando alguém deseja fazer o seguro de um carro, ele deve procurar uma entidade aberta de previdência.\nQuais afirmações estão corretas?',
    alternativas: [
      'III, IV.',
      'I, II, IV.',
      'I, III, IV.',
      'I, II, III.',
      'I, II, III, IV.'
    ],
    correta: 3, // D
    explicacao:
      'As afirmativas I, II e III estão corretas. Para contratar o seguro de um carro (afirmativa IV), deve-se procurar uma seguradora (supervisionada pela Susep), e não uma entidade aberta de previdência.'
  },
  {
    id: 'q-003',
    assunto: 'Educação Financeira',
    nivel: 2,
    enunciado:
      'Lucas participou de uma aula de educação financeira na escola que explicava que aposta não é investimento. Ele ficou reflexivo e contou para Frederico que no mês de julho tinha feito 30 apostas de R$ 10,00; ganhado somente 5 delas e recebido, em média, R$ 25,00 por aposta vencida. Frederico disse para ele deixar essas apostas de lado e reforçou o que a professora Nádia disse: “É possível começar a investir com R$ 2,00 em títulos do Tesouro Direto, CDB (Certificado de Depósito Bancário) ou poupança. O importante é começar a investir desde cedo para usar os juros compostos a seu favor”. Qual foi o prejuízo que Lucas teve com as apostas no mês de julho?',
    alternativas: [
      'Lucas teve um prejuízo de R$ 50,00.',
      'Lucas teve um prejuízo de R$ 150,00.',
      'Lucas teve um prejuízo de R$ 175,00.',
      'Lucas teve um prejuízo de R$ 200,00.',
      'Lucas teve um prejuízo de R$ 300,00.'
    ],
    correta: 2, // C
    explicacao:
      'Lucas gastou 30 × R$ 10,00 = R$ 300,00 nas apostas e recebeu 5 × R$ 25,00 = R$ 125,00. O prejuízo líquido foi de R$ 300,00 - R$ 125,00 = R$ 175,00.'
  },
  {
    id: 'q-004',
    assunto: 'Consumo Consciente',
    nivel: 2,
    enunciado:
      'Igor está interessado em comprar a trilogia de uma série de livros que chamou sua atenção. Cada livro custa R$ 32,00. Ao ir até a livraria, ele ficou sabendo que será lançada uma coleção comemorativa daqui a 4 meses que venderá os três livros juntos, por um preço 15% inferior ao preço atual. Ele está disposto a esperar esse tempo pela coleção comemorativa e começará a guardar dinheiro agora. Qual é o valor mensal que ele teria que juntar para comprar os livros, considerando que ele irá guardar o mesmo valor todo mês?',
    alternativas: [
      'R$ 13,50.',
      'R$ 15,30.',
      'R$ 32,00.',
      'R$ 22,50.',
      'R$ 20,40.'
    ],
    correta: 4, // E
    explicacao:
      'Os 3 livros atualmente custam 3 × R$ 32,00 = R$ 96,00. Com 15% de desconto, o valor cai para R$ 96,00 × 0,85 = R$ 81,60. Dividindo por 4 meses: R$ 81,60 ÷ 4 = R$ 20,40 por mês.'
  },
  {
    id: 'q-005',
    assunto: 'Orçamento',
    nivel: 2,
    enunciado:
      'Uma família registrou suas receitas e despesas mensais para analisar a situação financeira atual. Confira os dados abaixo:\nReceitas: Salário do pai: R$ 2.800,00. Salário da mãe: R$ 2.200,00. Renda de aluguel: R$ 600,00.\nDespesas: Alimentação: R$ 1.400,00. Moradia: R$ 2.000,00. Transporte: R$ 800,00. Educação: R$ 300,00. Saúde: R$ 500,00. Lazer: R$ 400,00.\nCom base nos dados acima, como está a situação financeira da família e qual é a estratégia mais indicada para melhorar o orçamento familiar?',
    alternativas: [
      'A família tem saldo negativo de R$ 200,00 e deve reduzir seus gastos com transporte para equilibrar o orçamento.',
      'A família tem saldo positivo de R$ 200,00 e deve iniciar uma reserva de emergência investindo este valor.',
      'A família tem saldo positivo de R$ 400,00 e deve aumentar seus gastos com lazer.',
      'A família tem saldo positivo de R$ 600,00 proveniente da renda de aluguel.',
      'A família tem saldo negativo de R$ 1.100,00 e precisa aumentar suas receitas urgentemente.'
    ],
    correta: 1, // B
    explicacao:
      'Total de receitas: 2.800 + 2.200 + 600 = R$ 5.600,00. Total de despesas: 1.400 + 2.000 + 800 + 300 + 500 + 400 = R$ 5.400,00. Saldo positivo de R$ 200,00, ideal para iniciar uma reserva de emergência.'
  },
  {
    id: 'q-006',
    assunto: 'Matemática Financeira',
    nivel: 2,
    enunciado:
      'José comprou uma bicicleta em 15 parcelas iguais de R$ 90,00, incluindo os juros. Considerando que 1/4 do valor total pago foi de juros, qual seria o valor da bicicleta se José comprasse à vista?',
    alternativas: [
      'R$ 1.129,00.',
      'R$ 1.089,30.',
      'R$ 1.012,50.',
      'R$ 1.263,00.',
      'R$ 1.562,20.'
    ],
    correta: 2, // C
    explicacao:
      'O total pago foi 15 × R$ 90,00 = R$ 1.350,00. Como 1/4 foi juros (R$ 337,50), o valor à vista corresponde a 3/4 de R$ 1.350,00 = R$ 1.012,50.'
  },
  {
    id: 'q-007',
    assunto: 'Economia',
    nivel: 2,
    enunciado:
      'Pedro ficou intrigado com um exercício de verdadeiro e falso que ele viu em um livro onde tinham as seguintes afirmações:\nI. O crescimento do PIB é o único indicador que mede o sucesso completo de um país.\nII. O PIB representa a soma de tudo que é produzido no país em determinado período.\nIII. Analisando somente o PIB, é possível saber como está a distribuição de renda de um país.\nIV. Um PIB mais alto sempre traz maior desemprego para a economia.\nQuais afirmações estão corretas?',
    alternativas: [
      'Somente a II.',
      'Somente a I.',
      'I e II.',
      'I, II e III.',
      'I, II, III e IV.'
    ],
    correta: 0, // A
    explicacao:
      'Apenas a afirmativa II está correta: o PIB mede a soma dos bens e serviços finais produzidos no país em determinado período, mas não mede sozinho distribuição de renda nem bem-estar completo.'
  },
  {
    id: 'q-008',
    assunto: 'Economia',
    nivel: 2,
    enunciado:
      'O ______ mede a saúde da ______ de um país. Quando em crescimento, mostra que a atividade econômica aumentou de um período para o outro. Por sua vez, quando caindo, demonstra um(a) ______ da atividade econômica do país. Qual alternativa melhor completa as lacunas?',
    alternativas: [
      'Ibovespa, economia, diminuição.',
      'juros, inflação, crescimento.',
      'PIB, economia, diminuição.',
      'PIB, inflação, crescimento.',
      'CDI, taxa de juros, diminuição.'
    ],
    correta: 2, // C
    explicacao:
      'O Produto Interno Bruto (PIB) mede a atividade da economia de um país; quando cai, indica retração ou diminuição da atividade econômica.'
  },
  {
    id: 'q-009',
    assunto: 'Matemática Financeira',
    nivel: 2,
    enunciado:
      'Joana recebeu uma proposta de emprego onde seu salário inicial será de R$ 1.800,00, com aumento mensal de R$ 150,00. Ela deseja comprar um notebook que custa R$ 2.100,00, pagando à vista, e pretende economizar exatamente 20% do seu salário a cada mês para esta compra. Em quantos meses Joana conseguirá juntar o valor necessário para comprar o notebook?',
    alternativas: [
      '5 meses.',
      '4 meses.',
      '6 meses.',
      '7 meses.',
      '8 meses.'
    ],
    correta: 0, // A
    explicacao:
      'Mês 1: 20% de 1.800 = 360. Mês 2: 20% de 1.950 = 390 (total 750). Mês 3: 20% de 2.100 = 420 (total 1.170). Mês 4: 20% de 2.250 = 450 (total 1.620). Mês 5: 20% de 2.400 = 480 (total 2.100). Logo, em 5 meses!'
  },
  {
    id: 'q-010',
    assunto: 'Matemática Financeira',
    nivel: 2,
    enunciado:
      'Francisco tem 35 anos e está começando a pensar em sua futura aposentadoria. Atualmente, ele tem os seguintes gastos mensais: Moradia: R$ 1.200,00. Alimentação: R$ 800,00. Transporte: R$ 600,00. Lazer: R$ 300,00. Outros gastos: R$ 100,00. Analise a seguinte situação em um cenário hipotético: Desconsidere a inflação no período. Francisco deseja manter o mesmo padrão de vida na aposentadoria, gastando exatamente o que gasta atualmente por ano. Francisco pretende viver, durante a aposentadoria, somente com os rendimentos do dinheiro investido que é de 6% ao ano. Quanto dinheiro Francisco deveria ter acumulado aos 75 anos para viver apenas dos rendimentos de seus investimentos?',
    alternativas: [
      'R$ 300.000,00.',
      'R$ 600.000,00.',
      'R$ 800.000,00.',
      'R$ 1.300.000,00.',
      'R$ 1.600.000,00.'
    ],
    correta: 1, // B
    explicacao:
      'Gasto mensal: 1.200 + 800 + 600 + 300 + 100 = R$ 3.000,00/mês, ou R$ 36.000,00/ano. Para gerar R$ 36.000,00/ano a 6% a.a., o patrimônio necessário é 36.000 ÷ 0,06 = R$ 600.000,00.'
  },
  {
    id: 'q-011',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Valentina estava lendo uma reportagem sobre carros híbridos, que combinam um motor a combustão e um motor elétrico para funcionar de forma mais eficiente. Esses veículos alternam entre as duas fontes de energia ou as utilizam simultaneamente, oferecendo maior economia de combustível e menor emissão de poluentes. Ela pensou se existiria algum paralelo no mundo dos investimentos de renda fixa. Qual das seguintes opções representa um investimento que funciona de maneira similar aos carros híbridos?',
    alternativas: [
      'Um CDB prefixado com taxa de 12% ao ano.',
      'Um título do Tesouro Selic que acompanha a taxa básica de juros.',
      'Uma aplicação em poupança com rendimento de 70% da taxa Selic.',
      'Um título híbrido que rende IPCA + 5% ao ano.',
      'Um fundo de investimento em ações do setor automobilístico.'
    ],
    correta: 3, // D
    explicacao:
      'Um título híbrido (como o Tesouro IPCA+) combina uma parte pós-fixada (IPCA, que acompanha a inflação) e uma parte prefixada (taxa real fixa, como 5% ao ano).'
  },
  {
    id: 'q-012',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Considere os seguintes títulos.\nTítulo A – Pré-fixado, com rendimento de 10% no período.\nTítulo B – Pós-fixado, com rendimento de 105% do CDI, sendo que o CDI rendeu 9,75% no período.\nA inflação foi de 4% no período. Qual dos dois títulos teve o maior rendimento bruto ao final do período e por quê?',
    alternativas: [
      'Título A, porque rendeu o triplo da inflação.',
      'Título A, porque os títulos pré-fixados sempre rendem mais que os títulos pós-fixados.',
      'Título B, porque 105% do CDI foi maior do que a taxa fixa de 10%.',
      'Título B, porque rendeu 9,75% no período.',
      'Os dois títulos tiveram o mesmo rendimento quando descontada a inflação.'
    ],
    correta: 2, // C
    explicacao:
      'O Título B rendeu 1,05 × 9,75% = 10,2375% no período, superando os 10% do Título A.'
  },
  {
    id: 'q-013',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Quem investe em título público está emprestando dinheiro para o Tesouro Nacional, que é o órgão que cuida do dinheiro do Estado Brasileiro, usado para financiar projetos de infraestrutura, educação, saúde e tantos outros serviços públicos. Quais são os principais títulos públicos do Tesouro Direto?',
    alternativas: [
      'Poupança, CDB e Tesouro Selic.',
      'CDB, Tesouro Selic e Tesouro IPCA+.',
      'Poupança, Tesouro Selic e Tesouro IPCA+.',
      'Tesouro Selic, Tesouro Prefixado e Tesouro IPCA+.',
      'Tesouro Selic, Tesouro Prefixado e CDB.'
    ],
    correta: 3, // D
    explicacao:
      'Os três principais tipos de títulos públicos do Tesouro Direto são o Tesouro Selic (pós-fixado), o Tesouro Prefixado e o Tesouro IPCA+ (híbrido).'
  },
  {
    id: 'q-014',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Caíque estava lendo algumas notícias sobre o mercado financeiro quando viu o anúncio de que a Taxa Selic subiu para 15,00% ao ano. Sabendo disso, Caíque fez uma pesquisa para entender qual seria o impacto nos seus investimentos. Qual alternativa explica corretamente um tipo de investimento de renda fixa?',
    alternativas: [
      'A poupança sempre rende 0,5% ao mês + TR (Taxa Referencial), independente da Taxa Selic.',
      'A poupança sempre rende 0,5% ao mês + IGP-M, independente da Taxa Selic.',
      'O Tesouro Selic é um título pós-fixado que rende diariamente conforme a Taxa Selic.',
      'Os títulos vinculados ao IPCA sempre têm a mesma rentabilidade da Taxa Selic.',
      'Toda vez que a Taxa Selic sobe 1%, o CDI cai 5%.'
    ],
    correta: 2, // C
    explicacao:
      'O Tesouro Selic é um título público pós-fixado cuja rentabilidade acompanha diariamente a variação da Taxa Selic.'
  },
  {
    id: 'q-015',
    assunto: 'Economia',
    nivel: 2,
    enunciado:
      'Considere os seguintes indicadores e suas descrições:\na. IPCA.  b. IGP-M.  c. Taxa Selic.  d. TR.\nI. Taxa básica de juros da economia brasileira.\nII. Índice de inflação calculado pela Fundação Getúlio Vargas (FGV).\nIII. Taxa de Referência.\nIV. Índice de inflação oficial, calculado pelo IBGE.\nQual alternativa corretamente conecta os indicadores com suas descrições?',
    alternativas: [
      'I. A, II. C, III. B, IV. D.',
      'I. D, II. C, III. B, IV. A.',
      'I. A, II. B, III. C, IV. D.',
      'I. C, II. A, III. D, IV. B.',
      'I. C, II. B, III. D, IV. A.'
    ],
    correta: 4, // E
    explicacao:
      'I corresponde à Taxa Selic (c), II ao IGP-M da FGV (b), III à TR (d) e IV ao IPCA do IBGE (a).'
  },
  {
    id: 'q-016',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'Um país decidiu fazer um experimento econômico muito incomum: proibir completamente a existência de bancos por um período. Qual das seguintes consequências são esperadas após esse experimento?\nI. As pessoas começariam a guardar dinheiro em suas próprias casas, aumentando o risco de roubos.\nII. Ficaria mais difícil para as pessoas conseguirem empréstimos para comprar casas ou abrir negócios.\nIII. O governo teria dificuldade para controlar a quantidade de dinheiro circulando no país.\nIV. As pessoas voltariam a usar mais o sistema de troca direta (escambo) para algumas transações.\nV. A economia do país com certeza cresceria rapidamente porque as pessoas gastariam mais dinheiro em vez de economizá-lo.\nVI. Sem bancos, não haveria mais a emissão de CDBs (Certificado de Depósito Bancário).',
    alternativas: [
      'I, II, III, IV, VI.',
      'I, II, IV, V, VI.',
      'I, II, V, VI.',
      'I, III, IV, VI.',
      'I, V, VI.'
    ],
    correta: 0, // A
    explicacao:
      'Sem bancos, haveria maior risco de guardar dinheiro em casa (I), dificuldade de crédito (II), menor controle monetário (III), retorno parcial ao escambo (IV) e fim da emissão de CDBs (VI). A economia não cresceria rapidamente sem intermediação financeira (V é falsa).'
  },
  {
    id: 'q-017',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Luan investiu em um título prefixado que rendeu 12% em um ano. Nesse mesmo período, a inflação foi de 4% e o CDI rendeu 13%. Qual dos investimentos abaixo foi mais beneficiado nesse cenário?',
    alternativas: [
      'O título prefixado que teve um rendimento equivalente a 1% ao mês.',
      'Um CDB que teve rentabilidade de 103% do CDI.',
      'Um CDB que teve rentabilidade de 100% do CDI.',
      'Uma debênture que teve rentabilidade IPCA+ 5%.',
      'Ao descontar a inflação, tanto o título prefixado quanto o pós-fixado tiveram o mesmo rendimento.'
    ],
    correta: 1, // B
    explicacao:
      'O CDB a 103% do CDI rendeu 1,03 × 13% = 13,39%, superando o CDB a 100% do CDI (13%), o prefixado (12%) e a debênture IPCA+5% (~9,2%).'
  },
  {
    id: 'q-018',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'Duas empresas de tecnologia, “A” e “B”, estavam procurando formas de financiar suas atividades. A Empresa A optou por uma forma de financiamento em que já está definido o valor que terá que pagar aos investidores, independente da sua lucratividade futura. Por sua vez, a Empresa B optou por uma forma de levantar capital por meio da bolsa de valores, na qual os investidores ganham uma participação nos lucros futuros da empresa. Qual forma cada empresa escolheu?',
    alternativas: [
      'Empresa A – CDB. Empresa B – Ações.',
      'Empresa A – Debêntures. Empresa B – CDB.',
      'Empresa A – Ações. Empresa B – Debêntures.',
      'Empresa A – Fundos Imobiliários. Empresa B – Ações.',
      'Empresa A – Debêntures. Empresa B – Ações.'
    ],
    correta: 4, // E
    explicacao:
      'Empresas não financeiras emitem debêntures (títulos de dívida/renda fixa) para captar recursos com remuneração definida, e emitem ações na bolsa de valores para oferecer participação societária e lucros futuros.'
  },
  {
    id: 'q-019',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'A BVRJ foi a primeira bolsa de valores no Brasil, criada em 1851, mantendo posição de destaque até a década de 1980. Atualmente, a bolsa de valores do Brasil é a ______, resultado da fusão ocorrida em 2017 entre a BM&FBOVESPA e a CETIP. O principal indicador do mercado de ações no Brasil é o ______, que funciona como um termômetro do mercado acionário.',
    alternativas: [
      'Bovespa, Ibovespa B3.',
      'Bovespa, IPCA.',
      'B3, IBRX 500.',
      'B3, Ibovespa B3.',
      'B3, IPCA.'
    ],
    correta: 3, // D
    explicacao:
      'A bolsa de valores oficial do Brasil é a B3 (Brasil, Bolsa, Balcão), e seu principal índice de ações é o Ibovespa B3.'
  },
  {
    id: 'q-020',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Fábio estava estudando sobre o mercado de renda variável e descobriu que há diversas opções de investimentos. Quais opções abaixo podem ser consideradas investimentos de renda variável?\nI. CDB: Certificado de Depósito Bancário.\nII. FII: Fundos de Investimento Imobiliário.\nIII. Fiagros: Fundo de Investimento nas Cadeias Produtivas Agroindustriais.\nIV. ETFs: Exchange Traded Fund ou Fundo de Índice.\nV. BDRs: Brazilian Depositary Receipts.',
    alternativas: [
      'I, II, III, IV, V.',
      'I, II, III, IV.',
      'I, II, III, V.',
      'I, II, IV, V.',
      'II, III, IV, V.'
    ],
    correta: 4, // E
    explicacao:
      'FIIs, Fiagros, ETFs e BDRs são ativos de renda variável negociados em bolsa. O CDB é um título de renda fixa emitido por bancos.'
  },
  {
    id: 'q-021',
    assunto: 'Educação Financeira',
    nivel: 2,
    enunciado:
      'Qual das seguintes alternativas mostra uma das vantagens em aprender sobre educação financeira?',
    alternativas: [
      'Piorar a capacidade de administrar dinheiro.',
      'Ser capaz de planejar melhor a compra de um produto.',
      'Aumentar as chances de ganhar apostas.',
      'Entender que gastar é muito mais importante do que investir.',
      'Decidir guardar o dinheiro embaixo do colchão.'
    ],
    correta: 1, // B
    explicacao:
      'A educação financeira permite organizar o orçamento, comparar condições de pagamento e planejar melhor a compra de bens e serviços.'
  },
  {
    id: 'q-022',
    assunto: 'Consumo Consciente',
    nivel: 2,
    enunciado:
      'Mauro quer comprar um videogame e cinco jogos. Na primeira loja que visitou, o videogame custava R$ 1.200,00 incluindo os cinco jogos. Na segunda loja, o videogame custava R$ 880,00 e cada jogo custava R$ 63,00. Em qual loja Mauro pagaria o menor preço possível pelo videogame e os cinco jogos?',
    alternativas: [
      'Na primeira loja, pagando R$ 1.200,00.',
      'Na segunda loja, pagando R$ 880,00.',
      'Na segunda loja, pagando R$ 1.195,00.',
      'Na primeira loja, pagando R$ 1.515,00.',
      'Na segunda loja, pagando R$ 943,00.'
    ],
    correta: 2, // C
    explicacao:
      'Na segunda loja, 5 jogos × R$ 63,00 = R$ 315,00. Somando R$ 880,00 do videogame, o total é R$ 1.195,00, economizando R$ 5,00 em relação à primeira loja.'
  },
  {
    id: 'q-023',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'Pedro e Miguel são dois amigos que adoram trocar figurinhas. Certo dia, Miguel queria muito fazer trocas com seus amigos, mas não tinha nenhuma figurinha disponível. Diante disso, ele e Pedro fizeram um acordo: Pedro emprestaria algumas de suas figurinhas para Miguel, com a condição de que ele devolvesse uma quantidade um pouco maior após realizar suas trocas. A que tipo de instituição o papel de Pedro se assemelha?',
    alternativas: [
      'Corretora de Valores.',
      'Seguradora.',
      'Bolsa de Valores.',
      'Banco.',
      'Fundo de Investimentos.'
    ],
    correta: 3, // D
    explicacao:
      'O papel de Pedro se assemelha ao de um banco, que concede empréstimos e recebe o valor de volta acrescido de juros.'
  },
  {
    id: 'q-024',
    assunto: 'Consumo Consciente',
    nivel: 2,
    enunciado:
      'Luiza vai comprar uma coleção de livros que ela quer ler há muito tempo. Caso ela compre à vista, o preço será de R$ 200,00. Se optar por parcelar, conseguirá dividir em 12 parcelas de R$ 20,00 cada. Considerando que ela possui R$ 250,00 guardados, qual é a melhor opção para comprar os livros?',
    alternativas: [
      'Pagar à vista, considerando que ela já possui o dinheiro necessário e o custo total será menor.',
      'Pagar parcelado, pois assim ela pode investir o dinheiro que ainda não pagou nas parcelas, aproveitando melhor o valor ao longo do tempo.',
      'Pagar parcelado, já que irá pagar um valor menor.',
      'Pagar à vista, já que ela estará “liberada” para usar os outros R$ 50,00 da forma que quiser.',
      'O valor total parcelado é igual ao valor à vista.'
    ],
    correta: 0, // A
    explicacao:
      'Parcelado, o total seria 12 × R$ 20,00 = R$ 240,00. Como ela possui o dinheiro, pagar R$ 200,00 à vista evita juros e gera economia imediata de R$ 40,00.'
  },
  {
    id: 'q-025',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'A ______ é definida pelo ______. No geral, ela aumenta quando a ______ está alta. Qual alternativa completa corretamente as lacunas do texto acima?',
    alternativas: [
      'Taxa Selic, COPOM, Taxa de Juros.',
      'IPCA, Governo Federal, inflação.',
      'Taxa Selic, Tesouro Nacional, Taxa de Juros.',
      'IPCA, COPOM, Taxa de Juros.',
      'Taxa Selic, COPOM, inflação.'
    ],
    correta: 4, // E
    explicacao:
      'A Taxa Selic é definida pelo COPOM (Comitê de Política Monetária) e costuma subir quando a inflação está elevada para conter o aumento de preços.'
  },
  {
    id: 'q-026',
    assunto: 'Matemática Financeira',
    nivel: 2,
    enunciado:
      'Certa loja vendia um casaco por R$ 80,00 no início do ano. Com a chegada da frente fria em julho, todos os preços dessa loja aumentaram em 50%. Mas, no primeiro dia de agosto, a loja divulgou a seguinte promoção nas redes sociais: “Só hoje: produtos com 55% de desconto em relação ao mês passado!!!”. Quanto custará o casaco, se for adquirido durante essa promoção?',
    alternativas: [
      'R$ 54,00.',
      'R$ 62,00.',
      'R$ 66,00.',
      'R$ 72,00.',
      'R$ 84,00.'
    ],
    correta: 0, // A
    explicacao:
      'Em julho o casaco passou a custar R$ 80,00 × 1,50 = R$ 120,00. Com 55% de desconto sobre julho: R$ 120,00 × 0,45 = R$ 54,00.'
  },
  {
    id: 'q-027',
    assunto: 'Matemática Financeira',
    nivel: 2,
    enunciado:
      'Afonso fez um empréstimo sob o regime de juros compostos de 10% ao mês. Considerando que ele pagou sua dívida em dois meses com um valor de R$ 242,00, quanto Afonso tomou emprestado?',
    alternativas: [
      'R$ 180,00.',
      'R$ 190,00.',
      'R$ 200,00.',
      'R$ 220,00.',
      'R$ 240,00.'
    ],
    correta: 2, // C
    explicacao:
      'Usando M = C × (1 + i)^t: 242 = C × (1,10)^2 = C × 1,21. Portanto, C = 242 ÷ 1,21 = R$ 200,00.'
  },
  {
    id: 'q-028',
    assunto: 'Economia',
    nivel: 2,
    enunciado:
      'Clarice gosta muito de frutas cítricas, especialmente laranja e tangerina. Quando foi ao supermercado no mês passado, viu que o quilo da laranja custava R$ 6,00 e o da tangerina, R$ 5,40. Ao voltar de férias, ela percebeu que os preços das frutas tinham subido mais de 10%. Qual é o nome dado para o aumento geral no nível de preços?',
    alternativas: [
      'Extorsão.',
      'Inflação.',
      'Deflação.',
      'Liquidação.',
      'Promoção.'
    ],
    correta: 1, // B
    explicacao:
      'Inflação é o aumento generalizado e contínuo dos preços de bens e serviços na economia, reduzindo o poder de compra da moeda.'
  },
  {
    id: 'q-029',
    assunto: 'Economia',
    nivel: 2,
    enunciado:
      'Quais dos tópicos abaixo estão positivamente correlacionados com o PIB (isto é, geralmente sobem quando o PIB sobe)?\nI. Aumento da produção nacional.\nII. Pobreza.\nIII. Mais investimentos na economia.\nIV. Criação de Empregos.',
    alternativas: [
      'I e II.',
      'I e III.',
      'I, III e IV.',
      'II, III e IV.',
      'III e IV.'
    ],
    correta: 2, // C
    explicacao:
      'O crescimento do PIB está associado ao aumento da produção nacional (I), mais investimentos (III) e geração de empregos (IV).'
  },
  {
    id: 'q-030',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'O Sistema Financeiro Nacional (SFN) é dividido entre agentes normativos, supervisores e operadores. Os órgãos normativos determinam as regras, os supervisores trabalham para que os integrantes do sistema sigam as regras definidas pelos órgãos normativos e os operadores ofertam os serviços financeiros. Quais das instituições abaixo são órgãos supervisores?\nI. Banco Central (BC).\nII. Bolsa de Valores.\nIII. Comissão de Valores Mobiliários (CVM).\nIV. Superintendência de Seguros Privados (Susep).\nV. Superintendência Nacional de Previdência Complementar (Previc).',
    alternativas: [
      'I, III, IV e V.',
      'I, III e IV.',
      'I, II, III e IV.',
      'I, IV e V.',
      'I, III e V.'
    ],
    correta: 0, // A
    explicacao:
      'Banco Central (BC), CVM, Susep e Previc são órgãos supervisores do SFN. A Bolsa de Valores (B3) atua como entidade operadora.'
  },
  {
    id: 'q-031',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Bruna investiu em um título que paga 12,5% ao ano, enquanto sua amiga Cátia investiu em um título que sempre paga 110% do CDI. Qual é o tipo de título que cada amiga investiu?',
    alternativas: [
      'Bruna - prefixado, Cátia - prefixado.',
      'Bruna - pós-fixado, Cátia - pós-fixado.',
      'Bruna - prefixado, Cátia - pós-fixado.',
      'Bruna - pós-fixado, Cátia - vinculado à inflação.',
      'Bruna - pós-fixado, Cátia - prefixado.'
    ],
    correta: 2, // C
    explicacao:
      'Taxa fixa definida antecipadamente (12,5% ao ano) caracteriza um título prefixado; rendimento atrelado a um indexador (110% do CDI) caracteriza um título pós-fixado.'
  },
  {
    id: 'q-032',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Na República Federativa da OLITEF existem dois bancos: Banco Olímpico e Banco Educativo. O Banco Educativo está pensando em emitir um CDB para os investidores do país. Contudo, o Banco Olímpico já oferece um CDB rendendo 10% ao ano e possui menor risco que o Banco Educativo. Caso o Banco Educativo queira atrair investidores para o seu novo CDB, qual taxa ele deve oferecer?',
    alternativas: [
      '8%.',
      'Maior que a inflação.',
      'Igual a 10%.',
      'Menor que 10%.',
      'Maior que 10%.'
    ],
    correta: 4, // E
    explicacao:
      'Pela relação risco-retorno, um emissor com maior risco precisa oferecer uma taxa de retorno maior que 10% ao ano para compensar o risco adicional e atrair investidores.'
  },
  {
    id: 'q-033',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'Alice estava navegando na internet quando se deparou com um ranking na seguinte ordem:\n1. Papel moeda.\n2. CDBs.\n3. Obras de Arte.\nDentre as alternativas, qual delas provavelmente esse ranking representa?',
    alternativas: [
      'Volatilidade.',
      'Liquidez.',
      'Risco.',
      'Retorno para os investidores.',
      'Raridade.'
    ],
    correta: 1, // B
    explicacao:
      'O ranking está ordenado da maior para a menor liquidez (capacidade de transformar o ativo em dinheiro rapidamente sem perda relevante de valor).'
  },
  {
    id: 'q-034',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Analise as seguintes afirmativas em relação ao CDI:\nI. O CDI é uma taxa que rende diariamente.\nII. O CDI é uma das métricas de inflação mais importantes do país.\nIII. O CDI costuma estar próximo da Taxa Selic Meta.\nIV. Um título que rende 150% do CDI irá sempre render mais que o IPCA.\nQual das seguintes opções apresenta todas as afirmativas corretas?',
    alternativas: [
      'I, II e III.',
      'I e II.',
      'II e IV.',
      'I e III.',
      'III e IV.'
    ],
    correta: 3, // D
    explicacao:
      'O CDI tem apuração diária (I) e acompanha de perto a Taxa Selic Meta (III). Ele não é índice de inflação (II) nem garante superar o IPCA em todos os cenários (IV).'
  },
  {
    id: 'q-035',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Ao investir em um(a) ______ o investidor está emprestando dinheiro para um(a) ______. É um investimento com cobertura do(a) ______ até R$ 250.000,00. Selecione a alternativa que corretamente completa os espaços em branco.',
    alternativas: [
      'CDB, empresa, Banco Central.',
      'CDB, banco, FGC.',
      'Debênture, empresa, CVM.',
      'CDB, empresa, FGC.',
      'Debênture, empresa, bolsa de valores.'
    ],
    correta: 1, // B
    explicacao:
      'O CDB (Certificado de Depósito Bancário) é emitido por um banco e conta com garantia do Fundo Garantidor de Créditos (FGC) até R$ 250.000,00 por CPF e instituição.'
  },
  {
    id: 'q-036',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'No mercado financeiro, existe uma espécie de seguro aos investidores para o caso de um banco ter problemas financeiros. Como é chamada essa proteção adicional?',
    alternativas: [
      'Títulos com taxas prefixadas garantidas.',
      'Rendimentos atrelados ao CDI com liquidez diária.',
      'Fundo Garantidor de Crédito (FGC).',
      'Transações digitais instantâneas.',
      'Taxas de juros acima do IPCA.'
    ],
    correta: 2, // C
    explicacao:
      'O Fundo Garantidor de Créditos (FGC) protege depositantes e investidores em produtos como poupança, CDB, LCI e LCA em caso de intervenção ou liquidação do banco.'
  },
  {
    id: 'q-037',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Chico estava estudando sobre algumas oportunidades de investimentos e se interessou por um título com remuneração híbrida, baseado no IPCA e uma taxa real de 6% ao ano. O IPCA durante o período foi de 5,5%. Com base nessas informações, podemos afirmar corretamente que:',
    alternativas: [
      '5,5% foi a inflação do período.',
      '6% ao ano correspondem à taxa pós-fixada.',
      '5,5% ao ano correspondem à taxa prefixada.',
      '6% ao ano correspondem à Taxa Selic atual.',
      '11,5% foi o CDI do período.'
    ],
    correta: 0, // A
    explicacao:
      'O IPCA é o índice oficial de inflação do Brasil; portanto, 5,5% foi a inflação medida no período, enquanto 6% ao ano é a taxa real prefixada.'
  },
  {
    id: 'q-038',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado:
      'Ana Júlia estava pesquisando sobre debêntures de diferentes empresas e observou que, no geral, empresas mais estáveis financeiramente possuem debêntures com taxas mais baixas do que empresas menos estáveis financeiramente. Por que isso ocorre?',
    alternativas: [
      'Como as empresas menos estáveis financeiramente possuem maior chance de pagar o valor devido, elas precisam oferecer rendimentos mais altos para os investidores.',
      'Empresas mais estáveis não querem compartilhar o lucro com seus credores, diferentemente das empresas menos estáveis.',
      'Empresas menos estáveis financeiramente podem oferecer retornos com taxas negativas para os investidores.',
      'Como as empresas menos estáveis financeiramente possuem menor chance de pagar o valor devido, elas precisam oferecer rendimentos mais altos para os investidores.',
      'Empresas mais estáveis financeiramente precisam oferecer retornos mais altos para os investidores.'
    ],
    correta: 3, // D
    explicacao:
      'Empresas menos estáveis têm maior risco de crédito (calote); por isso, precisam pagar juros maiores para compensar o risco assumido pelos investidores.'
  },
  {
    id: 'q-039',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'A ______ é um ambiente que reúne pessoas que querem comprar e vender ações de forma organizada. A ______ é a bolsa do Brasil responsável por esse papel, existindo a partir da fusão da BM&F Bovespa com a Cetip em 2017. Assinale a alternativa que preenche corretamente os espaços em branco.',
    alternativas: [
      'Bolsa de valores, BACEN.',
      'Corretora de valores, CVM.',
      'Bolsa de valores, CVM.',
      'Corretora de valores, B3.',
      'Bolsa de valores, B3.'
    ],
    correta: 4, // E
    explicacao:
      'A bolsa de valores organiza a negociação de ações, e no Brasil esse papel é desempenhado pela B3.'
  },
  {
    id: 'q-040',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado:
      'Em um determinado dia, as ações das maiores empresas do Brasil subiram significativamente e, por isso, o principal índice do mercado de ações fechou em alta. Qual é o nome desse índice?',
    alternativas: [
      'Índice IPCA.',
      'Índice IFIX B3.',
      'Índice de BDRs de Empresas Brasileiras.',
      'Índice Ibovespa B3.',
      'Índice de ETFs.'
    ],
    correta: 3, // D
    explicacao:
      'O Ibovespa B3 é o principal índice de desempenho das ações mais negociadas na bolsa brasileira.'
  }
];

export const simuladoService = {
  getAvailableSubjects: async () => {
    const list = storageService.getItem(QUESTOES_STORAGE_KEY, INITIAL_QUESTOES);
    const set = new Set();
    list.forEach((q) => set.add(q.assunto));
    return Array.from(set);
  },

  getAllQuestions: async () => {
    return storageService.getItem(QUESTOES_STORAGE_KEY, INITIAL_QUESTOES);
  },

  /**
   * Generates a new random simulation obeying RN01, RN02, RF49, RF50, RF51, RF52
   */
  generateSimulado: async ({
    assuntos = [],
    quantidade = 5,
    comTempo = false,
    nivel = 2
  }) => {
    const all = await simuladoService.getAllQuestions();

    // Filter by student classroom level (RN02)
    let eligible = all.filter((q) => q.nivel === nivel);
    if (eligible.length === 0) {
      eligible = all; // fallback if level has fewer items
    }

    // Filter by selected subjects (RF49)
    if (assuntos.length > 0) {
      eligible = eligible.filter((q) => assuntos.includes(q.assunto));
    }

    // Shuffle questions randomly without duplicates (RN01, RF52)
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, Math.min(quantidade, shuffled.length));

    // If bank has fewer questions than requested, fill with remaining eligible
    if (selectedQuestions.length < quantidade) {
      const rest = all.filter((q) => !selectedQuestions.some((sq) => sq.id === q.id));
      const needed = quantidade - selectedQuestions.length;
      selectedQuestions.push(...rest.slice(0, needed));
    }

    const durationMinutes = comTempo ? quantidade * 5 : 0; // RF51: 5 min per question

    const simulado = {
      id: `sim-${Date.now()}`,
      dataInicio: new Date().toISOString(),
      nivel,
      assuntos,
      quantidade: selectedQuestions.length,
      comTempo,
      durationMinutes,
      totalSeconds: durationMinutes * 60,
      questoes: selectedQuestions.map((q) => ({
        ...q,
        respostaSelecionada: null
      })),
      indiceAtual: 0,
      finalizado: false,
      tempoDecorridoSegundos: 0,
      resultado: null
    };

    storageService.setItem(SIMULADO_ACTIVE_KEY, simulado);
    return simulado;
  },

  getActiveSimulado: async () => {
    return storageService.getItem(SIMULADO_ACTIVE_KEY, null);
  },

  saveAnswer: async (questaoId, respostaIndex) => {
    const active = await simuladoService.getActiveSimulado();
    if (!active) return null;

    const questao = active.questoes.find((q) => q.id === questaoId);
    if (questao) {
      questao.respostaSelecionada = respostaIndex; // RF55: automatic state saving
      storageService.setItem(SIMULADO_ACTIVE_KEY, active);
    }
    return active;
  },

  finishSimulado: async (tempoGastoSegundos = 0) => {
    const active = await simuladoService.getActiveSimulado();
    if (!active) return null;

    let acertos = 0;
    let totalRespondidas = 0;
    active.questoes.forEach((q) => {
      if (q.respostaSelecionada !== null && q.respostaSelecionada !== undefined) {
        totalRespondidas += 1;
      }
      if (q.respostaSelecionada === q.correta) {
        acertos += 1;
      }
    });

    // Score: +10 XP per correct question (RF67, RF61)
    const xpGanho = acertos * 10;
    const totalQuestoes = active.questoes.length;
    const taxaAcertoPercent = totalQuestoes > 0 ? Math.round((acertos / totalQuestoes) * 100) : 0;

    active.finalizado = true;
    active.dataFim = new Date().toISOString();
    active.tempoGastoSegundos = tempoGastoSegundos;
    active.resultado = {
      totalQuestoes,
      totalRespondidas,
      acertos,
      erros: totalQuestoes - acertos,
      xpGanho,
      taxaAcertoPercent,
      proporcaoFormatada: `${acertos} / ${totalQuestoes}`
    };

    storageService.setItem(SIMULADO_ACTIVE_KEY, active);

    // Save to history
    const history = storageService.getItem(SIMULADO_HISTORY_KEY, []);
    history.unshift(active);
    storageService.setItem(SIMULADO_HISTORY_KEY, history);

    return active;
  },

  clearActiveSimulado: async () => {
    storageService.removeItem(SIMULADO_ACTIVE_KEY);
  }
};

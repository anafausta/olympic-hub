import { storageService } from './storageService';

const ARTIGOS_STORAGE_KEY = 'olympic_hub_artigos_data_v3';

function blocksToMarkdown(blocks) {
  return blocks
    .map((block) => {
      switch (block.tipo) {
        case 'h1':
          return `# ${block.texto}`;
        case 'h2':
          return `## ${block.texto}`;
        case 'p':
          return block.texto;
        case 'bold_paragraph':
          return `**${block.texto}**`;
        case 'bullet':
          return `- **${block.destaque}** ${block.texto}`;
        case 'paragraph_mixed':
          return `> **${block.destaque}** ${block.texto}`;
        default:
          return block.texto || '';
      }
    })
    .join('\n\n');
}

const INITIAL_ARTIGOS = [
  {
    id: 'art-01',
    categoria: 'Curiosidades do Dinheiro',
    tags: ['Curiosidades do Dinheiro'],
    titulo: 'Do sal romano ao Pix: a incrível viagem do dinheiro',
    autor: 'Prof. Carlos Silveira',
    dataPublicacao: '2026-10-15',
    resumo:
      'Descubra por que seu futuro salário tem nome de tempero e onde está a maior parte do dinheiro hoje.',
    conteudo: blocksToMarkdown([
      { tipo: 'h1', texto: 'Do sal romano ao Pix: por que o dinheiro mudou tanto?' },
      {
        tipo: 'p',
        texto:
          'Já parou para pensar que quase todo o dinheiro que circula hoje nem existe em forma de nota na carteira? Grande parte está registrada digitalmente nas contas bancárias e é movimentada por transferências, cartões e pagamentos instantâneos. A história de como saímos das trocas diretas até os pagamentos pelo celular é cheia de surpresas e mostra como a sociedade encontrou maneiras cada vez mais práticas de negociar, comprar e vender produtos.'
      },
      { tipo: 'h2', texto: '4 curiosidades que parecem mentira (mas são reais)' },
      {
        tipo: 'bullet',
        destaque: 'Salário vem de sal:',
        texto:
          'Na Roma Antiga, o sal era tão valioso para conservar alimentos que soldados chegaram a receber pagamentos ligados a esse bem. Naquela época, conservar carnes e outros alimentos era essencial, já que não existiam geladeiras. A palavra latina salarium, relacionada a essa forma de pagamento, deu origem ao nosso salário, termo que usamos até hoje para representar a remuneração recebida pelo trabalho.'
      },
      {
        tipo: 'bullet',
        destaque: 'O Brasil já usou açúcar e conchas:',
        texto:
          'No período colonial, antes das moedas circularem com facilidade, diferentes mercadorias eram utilizadas como meio de troca. Pau-brasil, algodão, açúcar, fumo e até conchas chamadas zimbo funcionaram como moeda-mercadoria. Isso acontecia porque esses produtos tinham valor reconhecido pelas pessoas e podiam ser utilizados nas negociações, mesmo sem serem moedas oficiais.'
      },
      {
        tipo: 'bullet',
        destaque: 'As primeiras notas nasceram na China:',
        texto:
          'Enquanto as primeiras moedas metálicas padronizadas surgiram na Lídia (atual Turquia), no século VII a.C., o primeiro papel-moeda surgiu na China, no século VII. A novidade facilitou as negociações porque transportar grandes quantidades de moedas metálicas era pesado e pouco prático. O papel-moeda permitiu representar valores de maneira mais leve, facilitando o comércio e o transporte de riquezas.'
      },
      {
        tipo: 'bullet',
        destaque: 'Dinheiro quase invisível:',
        texto:
          'Uma grande parte do dinheiro utilizado atualmente no Brasil existe na forma de moeda escritural, ou seja, valores registrados eletronicamente nas contas bancárias, sem a necessidade de existir em cédulas ou moedas físicas. Quando alguém recebe um salário na conta, paga uma compra com cartão ou realiza um Pix, está movimentando esse dinheiro registrado digitalmente. Isso mostra como a tecnologia transformou a maneira de utilizar a moeda.'
      },
      {
        tipo: 'paragraph_mixed',
        destaque: 'Conclusão/Dica de Ouro:',
        texto:
          'O formato do dinheiro mudou das conchas e mercadorias para as moedas, cédulas e telas dos celulares, mas um princípio continua o mesmo: ele só tem valor porque a sociedade confia em quem o emite e o aceita nas trocas. Essa confiança permite que as pessoas utilizem o dinheiro para comprar produtos, pagar serviços e guardar parte de sua riqueza para o futuro.'
      }
    ]),
    videoUrl: 'https://www.youtube.com/embed/tZ4XfkWlh-U',
    recomendadosManuaisIds: ['art-04', 'art-05', 'art-02'],
    topicosRelacionadosIds: ['post-01', 'post-03']
  },
  {
    id: 'art-02',
    categoria: 'Psicologia do Consumo',
    tags: ['Psicologia do Consumo'],
    titulo: 'Por que seu cérebro cai em promoções relâmpago?',
    autor: 'Profª. Mariana Albuquerque',
    dataPublicacao: '2026-10-22',
    resumo:
      'Conheça os truques psicológicos que fazem você gastar por impulso e aprenda a vencê-los.',
    conteudo: blocksToMarkdown([
      { tipo: 'h1', texto: 'Gatilhos mentais: por que compramos coisas que nem queríamos?' },
      {
        tipo: 'p',
        texto:
          'Você entra em uma loja online só para olhar e, dez minutos depois, fechou um pedido com frete grátis que nem precisava. Isso não acontece por falta de inteligência, mas porque nosso cérebro utiliza atalhos mentais para tomar decisões rapidamente. Esses mecanismos são conhecidos como vieses cognitivos e podem influenciar nossas escolhas, principalmente quando envolvem emoções, recompensas e sensação de urgência. O marketing conhece esses comportamentos e utiliza diferentes estratégias para estimular o consumo.'
      },
      { tipo: 'h2', texto: '3 armadilhas psicológicas do consumo' },
      {
        tipo: 'bullet',
        destaque: 'Viés da escassez:',
        texto:
          "Avisos como 'só restam 2 unidades' ou cronômetros de contagem regressiva geram medo de perder uma oportunidade, sentimento conhecido como FOMO (Fear of Missing Out). Quando acreditamos que algo está acabando, podemos sentir pressão para comprar rapidamente, sem comparar preços ou avaliar se realmente precisamos daquele produto. A sensação de que a oportunidade é limitada acaba influenciando nossa decisão."
      },
      {
        tipo: 'bullet',
        destaque: 'Contabilidade mental:',
        texto:
          'Temos a tendência de separar mentalmente nosso dinheiro em diferentes categorias, atribuindo valores diferentes a quantias que, na realidade, possuem o mesmo poder de compra. Por isso, podemos gastar com mais facilidade um dinheiro inesperado, como um presente de aniversário ou prêmio, do que o dinheiro recebido pela mesada ou pelo trabalho. Entretanto, uma mesma quantia continua tendo exatamente o mesmo valor, independentemente de como foi recebida. Considerar todo o dinheiro dentro de um único orçamento ajuda a tomar decisões mais conscientes.'
      },
      {
        tipo: 'bullet',
        destaque: 'Foco no prazer imediato:',
        texto:
          'O cérebro humano tende a valorizar muito mais uma recompensa instantânea hoje, como um delivery, uma roupa nova ou uma skin de jogo, do que uma segurança financeira que só será percebida meses depois. Esse comportamento está relacionado à dificuldade de adiar recompensas. O problema aparece quando pequenos prazeres imediatos se acumulam e acabam comprometendo objetivos maiores, como comprar um computador, fazer uma viagem ou guardar dinheiro.'
      },
      { tipo: 'h2', texto: 'Como hackear o próprio impulso' },
      { tipo: 'bold_paragraph', texto: 'Aplique a regra das 24 ou 48 horas' },
      {
        tipo: 'p',
        texto:
          'Deixe o produto no carrinho por um ou dois dias antes de pagar. Esse intervalo ajuda a diminuir a empolgação inicial e permite avaliar a compra com mais racionalidade. Depois desse período, faça quatro perguntas: Eu quero mesmo? Preciso disso agora? Posso pagar à vista? Esse gasto atrapalha minha meta principal? Outra estratégia é comparar o preço em diferentes lojas e verificar se a promoção realmente representa uma economia. Muitas vezes, esperar um pouco é suficiente para perceber que a compra não era tão necessária quanto parecia.'
      },
      {
        tipo: 'paragraph_mixed',
        destaque: 'Conclusão/Dica de Ouro:',
        texto:
          'Se o anúncio coloca pressa para você decidir em segundos, a melhor resposta é pausar por 24 horas e proteger seu orçamento. Comprar de forma consciente não significa nunca aproveitar promoções, mas saber diferenciar uma oportunidade verdadeira de uma estratégia criada para estimular gastos por impulso.'
      }
    ]),
    videoUrl: 'https://www.youtube.com/embed/GjLQnuREjlY',
    recomendadosManuaisIds: ['art-06', 'art-03', 'art-01'],
    topicosRelacionadosIds: ['post-02']
  },
  {
    id: 'art-03',
    categoria: 'Segurança e Golpes',
    tags: ['Segurança e Golpes'],
    titulo: 'Alerta no celular: 4 golpes financeiros para nunca cair',
    autor: 'Profª. Mariana Albuquerque',
    dataPublicacao: '2026-11-01',
    resumo:
      'Aprenda a identificar fraudes comuns no Pix, em promoções falsas e em ligações.',
    conteudo: blocksToMarkdown([
      { tipo: 'h1', texto: 'Escudo digital: os golpes mais comuns e como se proteger' },
      {
        tipo: 'p',
        texto:
          'Cuidar do dinheiro também significa proteger seus dados e sua atenção. Com o aumento das compras online, dos pagamentos digitais e das transferências instantâneas, os golpes financeiros também passaram a utilizar a tecnologia para enganar as pessoas. Fraudes envolvendo falsas vendas, mensagens suspeitas e ligações fraudulentas são problemas que podem atingir consumidores de diferentes idades. Conhecer os sinais de uma fraude é uma das principais formas de evitar prejuízos.'
      },
      { tipo: 'h2', texto: 'Fique de olho nestas 4 armadilhas' },
      {
        tipo: 'bullet',
        destaque: 'Golpe do Pix errado:',
        texto:
          "Alguém envia um Pix para sua conta, diz que foi engano e pede que você devolva o dinheiro para uma chave diferente daquela utilizada no envio original. O perigo está em realizar uma nova transferência por conta própria: o golpista pode acionar o Mecanismo Especial de Devolução (MED) do banco e tentar recuperar também o valor enviado inicialmente. Dessa maneira, a vítima corre o risco de perder dinheiro. Se receber um Pix inesperado, confira a movimentação no extrato e utilize apenas a opção oficial 'Devolver Pix' da própria transação. Nunca faça uma transferência separada para uma chave indicada por desconhecidos."
      },
      {
        tipo: 'bullet',
        destaque: 'Falsa venda nas redes:',
        texto:
          'Perfis recém-criados anunciam produtos com preços muito abaixo do mercado e utilizam promoções exageradas para atrair compradores. Geralmente, exigem um Pix urgente para o CPF de uma pessoa desconhecida, em vez de apresentar informações verificáveis da loja. Antes de comprar, pesquise a reputação do vendedor, procure avaliações de outros consumidores, confira os dados da empresa e desconfie de ofertas muito vantajosas. A pressa para realizar o pagamento costuma ser uma estratégia para impedir que a vítima investigue a negociação.'
      },
      {
        tipo: 'bullet',
        destaque: 'Golpe do QR Code (Quishing):',
        texto:
          'QR Codes recebidos sem contexto por mensagens ou adesivos colados por cima de cartazes e maquininhas podem direcionar a vítima para páginas falsas, desviar pagamentos ou roubar informações pessoais. Esse tipo de fraude é conhecido como quishing, uma combinação de QR Code com phishing. Antes de realizar um pagamento, confira o destinatário, o valor e as informações exibidas pelo aplicativo do banco. Não escaneie códigos de origem desconhecida e evite informar senhas em páginas abertas por links suspeitos.'
      },
      {
        tipo: 'bullet',
        destaque: 'Falsa central de atendimento:',
        texto:
          'Um falso atendente liga dizendo que sua conta foi invadida, que existe uma compra suspeita ou que é necessário realizar um procedimento urgente para proteger seu dinheiro. Durante a conversa, ele tenta conseguir senhas, códigos recebidos por SMS ou até convencer a vítima a instalar aplicativos de acesso remoto. Bancos e entidades como a Febraban não solicitam senhas por telefone nem devem exigir transferências para resolver problemas desse tipo. Se receber uma ligação suspeita, desligue e entre em contato com o banco pelos canais oficiais.'
      },
      {
        tipo: 'paragraph_mixed',
        destaque: 'Conclusão/Dica de Ouro:',
        texto:
          'Desconfiou? Desligue a chamada, não clique em links recebidos por mensagens e abra você mesmo o aplicativo oficial do banco para conferir qualquer movimentação. Nunca compartilhe senhas, códigos de autenticação ou informações bancárias. Na segurança digital, alguns segundos de verificação podem evitar grandes prejuízos financeiros.'
      }
    ]),
    videoUrl: 'https://www.youtube.com/embed/rTrphAaH2Vk',
    recomendadosManuaisIds: ['art-02', 'art-06', 'art-01'],
    topicosRelacionadosIds: ['post-01']
  },
  {
    id: 'art-04',
    categoria: 'Histórias da Economia',
    tags: ['Histórias da Economia'],
    titulo: 'O dia em que os preços mudavam antes do caixa',
    autor: 'Prof. Ricardo Mendes',
    dataPublicacao: '2026-11-05',
    resumo:
      'A história real da hiperinflação no Brasil e de como o Plano Real salvou o poder de compra.',
    conteudo: blocksToMarkdown([
      { tipo: 'h1', texto: 'Corrida no supermercado: a história da hiperinflação e do Plano Real' },
      {
        tipo: 'p',
        texto:
          "Imagine ir ao supermercado de manhã e ouvir o barulho 'clic-clic' de um funcionário remarcando as etiquetas dos produtos enquanto você escolhe o arroz. Quem chegava ao caixa minutos depois já encontrava o preço mais alto. Essa situação parece exagerada, mas representa uma realidade vivida pelos brasileiros durante os períodos de inflação muito elevada. Quando os preços aumentam rapidamente, o dinheiro perde poder de compra e as pessoas passam a ter dificuldades para planejar suas despesas."
      },
      { tipo: 'h2', texto: 'Quando o dinheiro derretia nas mãos' },
      {
        tipo: 'p',
        texto:
          'Entre o fim dos anos 1980 e o início dos anos 1990, o Brasil viveu uma hiperinflação extrema. Os preços aumentavam em ritmo acelerado, fazendo com que produtos e serviços ficassem cada vez mais caros em pouco tempo. Como o dinheiro perdia valor rapidamente, quem recebia o salário corria para fazer a compra do mês inteira no mesmo dia, tentando evitar que os preços aumentassem ainda mais. Guardar dinheiro sem utilizá-lo podia representar uma perda significativa do poder de compra, pois a mesma quantia compraria cada vez menos produtos.'
      },
      { tipo: 'h2', texto: 'O truque inteligente da URV em 1994' },
      {
        tipo: 'bullet',
        destaque: 'Por que planos antigos falharam:',
        texto:
          'Diversos planos econômicos tentaram combater a inflação congelando preços e salários à força. Entretanto, essa medida não resolvia os problemas que provocavam o aumento dos preços. Em alguns momentos, produtos desapareciam das prateleiras porque os comerciantes não queriam vender por valores que já não compensavam seus custos. Depois de um período, a inflação voltava a crescer, mostrando que controlar os preços temporariamente não era suficiente para estabilizar a economia.'
      },
      {
        tipo: 'bullet',
        destaque: 'A moeda virtual de transição:',
        texto:
          'Em 1994, o Plano Real criou a Unidade Real de Valor (URV), uma referência diária utilizada para alinhar preços, salários e contratos sem congelar os valores. A URV funcionava como uma unidade de conta estável, permitindo que as pessoas comparassem os preços sem sofrer diretamente com a desvalorização constante da moeda antiga. Em 1º de julho de 1994, a URV foi convertida na nova moeda nacional: o Real. Nascia uma nova etapa da economia brasileira, com o objetivo de recuperar a estabilidade econômica e a confiança da população.'
      },
      {
        tipo: 'bullet',
        destaque: 'Resultado:',
        texto:
          'A inflação diminuiu significativamente após a implantação do Plano Real, permitindo que os brasileiros voltassem a planejar compras, organizar seus orçamentos e poupar dinheiro com mais previsibilidade. A estabilidade dos preços também facilitou o planejamento das empresas, pois elas passaram a ter melhores condições de calcular custos, definir preços e realizar investimentos.'
      },
      {
        tipo: 'paragraph_mixed',
        destaque: 'Conclusão/Dica de Ouro:',
        texto:
          'Moeda estável é o que permite comparar preços, guardar dinheiro para o futuro e saber quanto um bem realmente custa. Quando a inflação está sob controle, as pessoas conseguem planejar melhor suas despesas, preservar o poder de compra e tomar decisões financeiras com mais segurança.'
      }
    ]),
    videoUrl: 'https://www.youtube.com/embed/6v5lvdYILss',
    recomendadosManuaisIds: ['art-05', 'art-01', 'art-07'],
    topicosRelacionadosIds: ['post-03']
  },
  {
    id: 'art-05',
    categoria: 'Educação Financeira Básica',
    tags: ['Educação Financeira Básica'],
    titulo: 'Moeda, inflação e o valor real do seu dinheiro',
    autor: 'Prof. Carlos Silveira',
    dataPublicacao: '2026-11-08',
    resumo:
      'Entenda as três funções da moeda, liquidez e como calcular a perda do poder de compra.',
    conteudo: blocksToMarkdown([
      { tipo: 'h1', texto: 'Trilha 1: Funções da moeda, liquidez e inflação na prática' },
      {
        tipo: 'p',
        texto:
          'Na OLITEF, compreender o papel do dinheiro na economia é a base para todas as decisões financeiras. Antes da moeda, existia o escambo, que consiste na troca direta de bens e serviços sem utilizar dinheiro. Apesar de parecer simples, esse sistema apresentava uma dificuldade conhecida como coincidência dupla de necessidades: duas pessoas precisavam querer exatamente aquilo que a outra tinha para oferecer. Por exemplo, uma pessoa com trigo que desejasse receber sapatos precisaria encontrar alguém que tivesse sapatos e também estivesse interessado em trocar por trigo. A moeda surgiu para facilitar essas negociações, funcionando como um instrumento intermediário aceito pelas pessoas.'
      },
      { tipo: 'h2', texto: 'As 3 funções clássicas da moeda' },
      {
        tipo: 'bullet',
        destaque: 'Meio de troca:',
        texto:
          'É o instrumento aceito pelas pessoas para comprar e vender bens e serviços, eliminando as dificuldades do escambo. Em vez de procurar alguém disposto a trocar diretamente um produto pelo outro, basta utilizar dinheiro para realizar a compra. Por exemplo, uma pessoa pode vender um livro e utilizar o valor recebido para comprar alimentos em outro estabelecimento.'
      },
      {
        tipo: 'bullet',
        destaque: 'Unidade de conta:',
        texto:
          'É o padrão comum utilizado para expressar e comparar preços. A moeda permite atribuir valores aos produtos e identificar quanto cada um custa, facilitando as decisões de compra. Por exemplo, saber que um livro custa R$ 40,00 e um lanche custa R$ 20,00 permite comparar os preços e compreender que o livro custa o dobro do lanche. Sem uma unidade de conta comum, seria muito mais difícil estabelecer relações de valor entre diferentes mercadorias.'
      },
      {
        tipo: 'bullet',
        destaque: 'Reserva de valor:',
        texto:
          'É a capacidade de transferir poder de compra do presente para o futuro. Quando uma pessoa guarda parte do dinheiro que recebeu, espera utilizá-lo posteriormente para adquirir produtos ou serviços. Entretanto, essa função depende da estabilidade do poder de compra: se os preços aumentarem muito, a mesma quantia poderá comprar menos coisas no futuro. Por isso, a inflação é um fator importante quando pensamos em guardar dinheiro.'
      },
      { tipo: 'h2', texto: 'Liquidez e o impacto da inflação' },
      {
        tipo: 'p',
        texto:
          'Liquidez é a facilidade e a velocidade com que um bem ou investimento pode ser transformado em dinheiro disponível, sem uma perda significativa de valor nesse processo. A moeda em espécie ou o saldo disponível em uma conta bancária são exemplos de ativos com alta liquidez, pois podem ser utilizados rapidamente para realizar pagamentos. Já um imóvel possui baixa liquidez, porque sua venda pode levar semanas ou meses e depende de encontrar um comprador interessado. Portanto, liquidez é um fator importante na escolha de onde guardar ou investir o dinheiro, principalmente quando existe a possibilidade de precisar dele rapidamente.'
      },
      { tipo: 'bold_paragraph', texto: 'Exemplo numérico: o efeito da inflação hipotética de 5% ao ano' },
      {
        tipo: 'p',
        texto:
          'Inflação é o aumento contínuo e generalizado dos preços de bens e serviços em uma economia. Isso significa que, com o passar do tempo, uma mesma quantia de dinheiro pode comprar menos produtos. Imagine que um ingresso custa R$ 50,00 hoje e a inflação hipotética seja de 5% ao ano. Após um ano, seu preço será de R$ 52,50. Se essa taxa permanecer constante, em cinco anos o ingresso custará aproximadamente R$ 63,81. Por outro lado, se você deixar R$ 1.000,00 parados embaixo do colchão durante esses mesmos cinco anos, o valor nominal continuará sendo R$ 1.000,00, mas seu poder de compra cairá para o equivalente a aproximadamente R$ 783,53 de hoje. Isso acontece porque o dinheiro não aumentou, enquanto os preços continuaram subindo. O exemplo mostra a diferença entre o valor nominal, que é a quantia indicada, e o valor real, que considera o poder de compra.'
      },
      {
        tipo: 'paragraph_mixed',
        destaque: 'Conclusão/Dica de Ouro:',
        texto:
          'Dinheiro parado sem rendimento perde poder de compra para a inflação. Para cumprir melhor a função de reserva de valor, ele precisa render pelo menos acima do aumento dos preços. Por isso, ao avaliar um investimento, não basta observar quanto dinheiro você receberá no futuro: é importante considerar também quanto esse dinheiro conseguirá comprar.'
      }
    ]),
    videoUrl: 'https://www.youtube.com/embed/6v5lvdYILss',
    recomendadosManuaisIds: ['art-04', 'art-06', 'art-07'],
    topicosRelacionadosIds: ['post-01']
  },
  {
    id: 'art-06',
    categoria: 'Planejamento e Orçamento',
    tags: ['Planejamento e Orçamento'],
    titulo: 'Regra 50-30-20, metas SMART e reserva de emergência',
    autor: 'Profª. Mariana Albuquerque',
    dataPublicacao: '2026-11-10',
    resumo:
      'Organize sua renda com método, trace objetivos alcançáveis e monte seu colchão de segurança.',
    conteudo: blocksToMarkdown([
      { tipo: 'h1', texto: 'Trilha 2: Como planejar o orçamento e realizar metas' },
      {
        tipo: 'p',
        texto:
          'Planejar não significa cortar tudo o que você gosta, mas dar um destino consciente para cada real antes que ele suma em pequenos gastos do dia a dia. Um orçamento financeiro é uma ferramenta que permite visualizar quanto dinheiro entra, quanto sai e quais despesas precisam de atenção. Um dos modelos mais conhecidos e práticos para organizar a renda é o método 50-30-20, que divide o dinheiro em três categorias: necessidades, desejos e metas financeiras. Essa divisão funciona como uma orientação e pode ser adaptada conforme a realidade de cada pessoa.'
      },
      { tipo: 'h2', texto: 'Divisão pela Regra 50-30-20' },
      {
        tipo: 'bullet',
        destaque: '50% Necessidades essenciais:',
        texto:
          'Representam a parte da renda destinada às despesas indispensáveis para manter a rotina e a qualidade de vida, como moradia, alimentação básica, transporte, água, luz e saúde. São gastos que precisam ser priorizados no orçamento, pois estão relacionados às necessidades do dia a dia. Caso essas despesas ultrapassem a parcela recomendada, pode ser necessário rever outros gastos e adaptar a divisão.'
      },
      {
        tipo: 'bullet',
        destaque: '30% Desejos pessoais:',
        texto:
          'Correspondem aos gastos que melhoram o conforto e proporcionam lazer, mas que não são indispensáveis para a sobrevivência. Nessa categoria entram passeios, assinaturas de streaming, lanches fora de casa, jogos e compras não essenciais. Ter uma parte do orçamento destinada aos desejos permite aproveitar o dinheiro sem comprometer as contas principais, desde que os limites sejam respeitados.'
      },
      {
        tipo: 'bullet',
        destaque: '20% Metas e Reserva de Emergência:',
        texto:
          'É a parcela destinada à construção de segurança financeira, à realização de objetivos futuros, aos investimentos ou à quitação de dívidas. A reserva de emergência deve ser utilizada apenas em situações inesperadas, como perda de renda, problemas de saúde ou reparos urgentes. Uma referência comum é acumular o equivalente a pelo menos 6 meses de gastos essenciais. Esse valor oferece uma proteção financeira e evita que imprevistos obriguem a pessoa a recorrer a empréstimos ou comprometer suas outras metas.'
      },
      { tipo: 'h2', texto: 'Transformando desejos em Metas SMART' },
      {
        tipo: 'p',
        texto:
          "Dizer 'quero juntar dinheiro' é apenas um desejo vago, pois não informa quanto precisa ser guardado nem quando o objetivo será alcançado. Para transformar esse desejo em um plano concreto, podemos utilizar o método SMART. Uma meta SMART precisa ser Específica (deixar claro o que você quer alcançar), Mensurável (definir quanto dinheiro será necessário), Atingível (considerar se o objetivo cabe na sua realidade financeira), Relevante (ter importância para você) e Temporal (estabelecer um prazo para sua realização). Esses critérios ajudam a transformar intenções em ações que podem ser acompanhadas e avaliadas."
      },
      { tipo: 'bold_paragraph', texto: 'Exemplo prático: jovem aprendiz com renda de R$ 800,00 por mês' },
      {
        tipo: 'p',
        texto:
          'Imagine um jovem aprendiz que recebe R$ 800,00 mensalmente. Aplicando a regra 50-30-20, ele destina R$ 400,00 para gastos essenciais, como transporte, material e ajuda em casa; R$ 240,00 para lazer e desejos pessoais; e R$ 160,00 para suas metas financeiras. Nesse exemplo, ele estabelece uma meta SMART: juntar R$ 1.920,00 em 12 meses para comprar um notebook ou pagar um curso. Sem considerar juros ou rendimentos, guardar R$ 160,00 durante 12 meses resulta exatamente em R$ 1.920,00. Esse planejamento permite visualizar quanto precisa ser economizado mensalmente e acompanhar o progresso até alcançar o objetivo.'
      },
      {
        tipo: 'paragraph_mixed',
        destaque: 'Conclusão/Dica de Ouro:',
        texto:
          "Separe os 20% destinados às suas metas assim que receber sua renda, uma estratégia conhecida como 'pagar a si mesmo primeiro'. Quando o dinheiro é reservado antes dos gastos com desejos, fica mais fácil manter a disciplina e evitar que todo o salário seja consumido ao longo do mês. Também acompanhe as pequenas despesas, pois gastos aparentemente insignificantes podem se acumular e comprometer o orçamento."
      }
    ]),
    videoUrl: 'https://www.youtube.com/embed/GjLQnuREjlY',
    recomendadosManuaisIds: ['art-02', 'art-07', 'art-05'],
    topicosRelacionadosIds: ['post-02']
  },
  {
    id: 'art-07',
    categoria: 'Renda Fixa e Tesouro Direto',
    tags: ['Renda Fixa e Tesouro Direto'],
    titulo: 'Juros compostos, taxas e os títulos do Tesouro Direto',
    autor: 'Prof. Carlos Silveira',
    dataPublicacao: '2026-11-12',
    resumo:
      'Domine cálculos de juros, entenda Selic, CDI, IPCA, FGC e escolha o título público certo.',
    conteudo: blocksToMarkdown([
      { tipo: 'h1', texto: 'Trilha 3: Matemática dos juros e o universo da Renda Fixa' },
      {
        tipo: 'p',
        texto:
          'Na Renda Fixa, você empresta dinheiro para o Governo ou para uma instituição financeira e recebe uma remuneração de acordo com regras estabelecidas no momento da aplicação. Isso não significa necessariamente que o rendimento será sempre igual, pois existem investimentos com taxas prefixadas, pós-fixadas ou vinculadas à inflação. Para ir bem na prova da OLITEF, o primeiro passo é diferenciar juros simples de juros compostos, compreender como as taxas influenciam os rendimentos e conhecer os principais investimentos disponíveis.'
      },
      { tipo: 'h2', texto: 'Juros simples vs. juros compostos na prática' },
      {
        tipo: 'p',
        texto:
          "Nos juros simples, o percentual incide sempre apenas sobre o capital inicial, fazendo com que o valor dos juros seja igual em todos os períodos. Já nos juros compostos, conhecidos como 'juros sobre juros', o rendimento de cada período é incorporado ao montante acumulado e também passa a render nos períodos seguintes. Por isso, quanto maior o tempo de aplicação, maior tende a ser a diferença entre os dois regimes. Veja a diferença ao aplicar R$ 1.000,00 a uma taxa hipotética de 1% ao mês:"
      },
      {
        tipo: 'bullet',
        destaque: 'Em 12 meses (1 ano):',
        texto:
          'Nos juros simples, o montante chega a R$ 1.120,00, pois os juros são calculados sempre sobre os R$ 1.000,00 iniciais. Nos juros compostos, o montante chega a R$ 1.126,83, porque os rendimentos acumulados também geram novos juros. A diferença é de R$ 6,83.'
      },
      {
        tipo: 'bullet',
        destaque: 'Em 36 meses (3 anos):',
        texto:
          'Nos juros simples, o montante chega a R$ 1.360,00. Já nos juros compostos, chega a R$ 1.430,77. A diferença aumenta para R$ 70,77, mostrando como o efeito dos juros sobre juros se torna mais perceptível com o passar do tempo.'
      },
      {
        tipo: 'bullet',
        destaque: 'Em 120 meses (10 anos):',
        texto:
          'Nos juros simples, o montante chega a R$ 2.200,00, pois os juros crescem sempre de maneira constante. Nos juros compostos, o valor chega a aproximadamente R$ 3.300,39, resultando em R$ 1.100,39 a mais. Esse exemplo demonstra como o tempo pode potencializar os rendimentos quando existe capitalização composta.'
      },
      { tipo: 'h2', texto: 'Indicadores e os títulos do Tesouro Direto' },
      {
        tipo: 'p',
        texto:
          'Três indicadores importantes para compreender o mercado financeiro brasileiro são a Selic, o CDI e o IPCA. A Selic é a taxa básica de juros da economia, definida pelo Comitê de Política Monetária (Copom) do Banco Central. Ela influencia os custos de empréstimos, financiamentos e os rendimentos de diversos investimentos. O CDI é uma taxa utilizada como referência nas operações entre instituições financeiras e costuma acompanhar de perto a Selic. Já o IPCA é o índice oficial de inflação do país, utilizado para acompanhar a variação dos preços de uma cesta de bens e serviços consumidos pelas famílias. No Tesouro Direto, programa de compra e venda de títulos públicos garantidos pelo Tesouro Nacional, existem diferentes opções para objetivos de curto, médio e longo prazo.'
      },
      {
        tipo: 'bullet',
        destaque: 'Tesouro Selic:',
        texto:
          'O Tesouro Selic acompanha a taxa básica de juros e apresenta baixa volatilidade em comparação com outros títulos públicos, sendo uma opção frequentemente utilizada para objetivos de curto prazo e reserva de emergência. Sua rentabilidade acompanha as variações da Selic, por isso o rendimento pode mudar ao longo do tempo. É importante observar as condições de resgate e os custos aplicáveis antes de investir.'
      },
      {
        tipo: 'bullet',
        destaque: 'Tesouro Prefixado:',
        texto:
          'Nesse título, a taxa de juros é definida no momento da compra. Isso significa que, se o investidor mantiver o investimento até o vencimento, saberá antecipadamente qual será o valor bruto recebido. Entretanto, se precisar vender antes do prazo, o preço poderá variar conforme as condições do mercado, podendo resultar em um valor diferente do esperado. Por isso, é importante observar a data de vencimento antes de investir.'
      },
      {
        tipo: 'bullet',
        destaque: 'Tesouro IPCA+:',
        texto:
          'Esse título oferece uma remuneração composta pela variação do IPCA mais uma taxa fixa definida na contratação. Dessa maneira, o investimento busca preservar o poder de compra do dinheiro e proporcionar um ganho acima da inflação quando mantido até o vencimento. É uma alternativa utilizada para objetivos de longo prazo, como a formação de patrimônio ou o planejamento de uma compra futura. Entretanto, a venda antecipada pode provocar oscilações no valor recebido.'
      },
      {
        tipo: 'bullet',
        destaque: 'Tesouro Educa+ e RendA+:',
        texto:
          'São títulos públicos criados para objetivos específicos de planejamento financeiro. O Tesouro Educa+ foi desenvolvido para ajudar a custear despesas relacionadas aos estudos universitários, oferecendo pagamentos mensais durante o período previsto pelo título após a fase de acumulação. Já o Tesouro RendA+ é voltado ao planejamento da aposentadoria e oferece pagamentos mensais durante o período previsto na contratação. Ambos são corrigidos pelo IPCA e permitem organizar recursos para necessidades futuras, com previsibilidade de pagamentos dentro das condições de cada título.'
      },
      { tipo: 'h2', texto: 'Proteção do FGC e Imposto de Renda' },
      {
        tipo: 'p',
        texto:
          'Em títulos bancários privados, como CDB, LCI e LCA, existe uma proteção oferecida pelo Fundo Garantidor de Créditos (FGC), que funciona como uma garantia para determinados investimentos caso a instituição financeira entre em situação de intervenção ou liquidação. A cobertura possui limites definidos pelas regras do fundo e deve ser observada pelo investidor antes da aplicação. Essa proteção não significa que qualquer investimento esteja automaticamente garantido: é necessário verificar se o produto e a instituição fazem parte das modalidades cobertas. No Tesouro Direto, a garantia é do próprio Tesouro Nacional, e não do FGC. Em relação ao Imposto de Renda, determinados investimentos, como Tesouro Direto e CDB, seguem uma tabela regressiva sobre os rendimentos: quanto maior o prazo de aplicação, menor tende a ser a alíquota, respeitando as regras tributárias vigentes. Já LCI, LCA e Poupança possuem tratamento tributário diferenciado para pessoas físicas, conforme a legislação aplicável.'
      },
      {
        tipo: 'paragraph_mixed',
        destaque: 'Conclusão/Dica de Ouro:',
        texto:
          'Em Renda Fixa, combine o prazo do seu objetivo com o tipo de título escolhido. O Tesouro Selic pode ser utilizado para objetivos de curto prazo e reserva de emergência, enquanto títulos IPCA+ costumam ser mais adequados para metas de longo prazo, especialmente quando podem ser mantidos até o vencimento. Antes de investir, observe a rentabilidade, os riscos, os impostos, as taxas e as condições de resgate.'
      }
    ]),
    videoUrl: 'https://www.youtube.com/embed/FFKGBZc6G_A',
    recomendadosManuaisIds: ['art-08', 'art-05', 'art-06'],
    topicosRelacionadosIds: ['post-01', 'post-03']
  },
  {
    id: 'art-08',
    categoria: 'Renda Variável e Sistema Financeiro',
    tags: ['Renda Variável e Sistema Financeiro'],
    titulo: 'Bolsa de Valores, ações, FIIs e os guardiões do mercado',
    autor: 'Prof. Ricardo Mendes',
    dataPublicacao: '2026-11-15',
    resumo:
      'Entenda risco versus retorno, ativos da B3 e as funções do Banco Central e da CVM.',
    conteudo: blocksToMarkdown([
      { tipo: 'h1', texto: 'Trilha 4: Renda Variável e como funciona o Sistema Financeiro' },
      {
        tipo: 'p',
        texto:
          'Diferente da Renda Fixa, na Renda Variável não é possível saber de antemão qual será o lucro ou mesmo se haverá ganho no curto prazo. O preço dos ativos muda constantemente conforme a oferta, a procura, as expectativas dos investidores e os resultados das empresas. Isso significa que o valor de um investimento pode aumentar ou diminuir ao longo do tempo. Por esse motivo, quem investe em Renda Variável precisa compreender os riscos envolvidos e considerar seus objetivos financeiros antes de tomar decisões.'
      },
      { tipo: 'h2', texto: 'Principais ativos negociados na B3' },
      {
        tipo: 'p',
        texto:
          'A B3 (Brasil, Bolsa, Balcão) é a bolsa de valores oficial do Brasil, responsável por registrar, negociar e liquidar operações com segurança. É nela que investidores podem comprar e vender diferentes ativos financeiros, como ações, fundos imobiliários e ETFs. Seu termômetro mais famoso é o Ibovespa, índice que acompanha o desempenho de uma carteira teórica formada por ações e units selecionadas conforme critérios de negociação e representatividade no mercado. Ele é utilizado como uma referência para observar o comportamento geral de parte do mercado acionário brasileiro. Entre os principais ativos negociados na B3, estão:'
      },
      {
        tipo: 'bullet',
        destaque: 'Ações:',
        texto:
          'Representam pequenas frações do capital social de uma empresa. Ao comprar uma ação, o investidor passa a ser sócio daquela companhia e participa dos resultados de acordo com sua participação. Ele pode obter ganhos se o preço da ação aumentar ou receber parte dos lucros distribuídos pela empresa, conhecidos como dividendos. Entretanto, se a companhia enfrentar dificuldades ou perder valor no mercado, o preço de suas ações também poderá cair, provocando prejuízos para o investidor.'
      },
      {
        tipo: 'bullet',
        destaque: 'Fundos Imobiliários (FIIs):',
        texto:
          'Reúnem recursos de diversos investidores para aplicar em imóveis ou títulos relacionados ao setor imobiliário. Ao comprar cotas de um FII, o investidor participa indiretamente dos resultados dos ativos que compõem o fundo, sem precisar adquirir um imóvel inteiro. Alguns fundos distribuem rendimentos periodicamente, geralmente relacionados a aluguéis ou receitas dos investimentos realizados. A tributação dos rendimentos distribuídos e dos ganhos obtidos com a venda das cotas segue regras específicas, que devem ser observadas pelo investidor. É importante lembrar que o preço das cotas também pode oscilar e que os rendimentos não são garantidos.'
      },
      {
        tipo: 'bullet',
        destaque: 'ETFs:',
        texto:
          'São fundos de investimento negociados na bolsa que buscam acompanhar o desempenho de uma cesta de ativos ou de determinado índice, como o Ibovespa. Ao comprar uma única cota de um ETF, o investidor pode ter exposição a vários ativos simultaneamente, dependendo da composição do fundo. Isso facilita a diversificação e pode reduzir a dependência do desempenho de uma única empresa. Entretanto, o ETF também está sujeito às oscilações do mercado e pode apresentar perdas.'
      },
      { tipo: 'h2', texto: 'A relação risco vs. retorno e a diversificação' },
      {
        tipo: 'p',
        texto:
          'No mercado financeiro, existe uma relação entre risco e retorno: investimentos com maior potencial de ganho geralmente também apresentam maior possibilidade de perdas e oscilações. Isso não significa que assumir mais riscos garanta retornos maiores, mas que o investidor precisa estar preparado para diferentes resultados. Imagine que um estudante aplique R$ 1.000,00 em ações de uma empresa e ela enfrente uma crise. O valor investido pode cair para R$ 800,00 no curto prazo. Por outro lado, se a empresa crescer ao longo dos anos, suas ações podem se valorizar. Para diminuir a concentração dos riscos, investidores utilizam a diversificação, distribuindo os recursos entre diferentes ativos e setores. Essa distribuição deve considerar o perfil de cada pessoa, que pode ser conservador, moderado ou arrojado, conforme sua tolerância às perdas e seus objetivos financeiros.'
      },
      { tipo: 'h2', texto: 'Quem organiza e fiscaliza tudo isso?' },
      {
        tipo: 'bullet',
        destaque: 'Conselho Monetário Nacional (CMN):',
        texto:
          'É o órgão superior do Sistema Financeiro Nacional responsável por estabelecer as diretrizes gerais das políticas monetária, de crédito e cambial. Também define a meta de inflação do país, orientando as decisões relacionadas à estabilidade da moeda e ao funcionamento do sistema financeiro. Em outras palavras, estabelece as principais regras e orientações que devem ser seguidas pelos órgãos responsáveis pela execução e fiscalização dessas políticas.'
      },
      {
        tipo: 'bullet',
        destaque: 'Banco Central do Brasil (BCB):',
        texto:
          'É a instituição responsável por executar a política monetária e trabalhar para manter a estabilidade do poder de compra da moeda. Atua na implementação das decisões relacionadas à taxa básica de juros, por meio do Copom, administra as reservas internacionais, emite papel-moeda e supervisiona as instituições financeiras. Também participa da regulação e supervisão do sistema de pagamentos brasileiro, incluindo o Pix. Seu trabalho é importante para manter o funcionamento do sistema financeiro e contribuir para a estabilidade econômica.'
      },
      {
        tipo: 'bullet',
        destaque: 'Comissão de Valores Mobiliários (CVM):',
        texto:
          'É a instituição responsável por fiscalizar, regulamentar e desenvolver o mercado de valores mobiliários, que inclui ações, FIIs, ETFs, fundos de investimento e outros produtos negociados no mercado de capitais. Sua atuação busca garantir transparência nas informações divulgadas pelas empresas, promover práticas adequadas no mercado e proteger os investidores contra irregularidades e fraudes. A CVM também acompanha a atuação de participantes do mercado, contribuindo para que as negociações ocorram de maneira mais organizada e confiável.'
      },
      {
        tipo: 'paragraph_mixed',
        destaque: 'Conclusão/Dica de Ouro:',
        texto:
          'A Renda Variável oferece oportunidades de valorização do patrimônio no longo prazo, mas exige conhecimento, planejamento e tolerância às oscilações do mercado. Por isso, é importante construir primeiro uma reserva de emergência em investimentos de menor risco e com boa liquidez. Dessa maneira, você reduz a possibilidade de precisar vender ações, FIIs ou outros ativos em um momento desfavorável apenas para conseguir dinheiro para uma despesa inesperada.'
      }
    ]),
    videoUrl: 'https://www.youtube.com/embed/MtOInNH6oGs',
    recomendadosManuaisIds: ['art-07', 'art-05', 'art-06'],
    topicosRelacionadosIds: ['post-01']
  }
];

export const artigosService = {
  getAllArtigos: async () => {
    return storageService.getItem(ARTIGOS_STORAGE_KEY, INITIAL_ARTIGOS);
  },

  getArtigoById: async (artigoId) => {
    const list = await artigosService.getAllArtigos();
    return list.find((a) => a.id === artigoId) || null;
  },

  getAvailableTags: async () => {
    const list = await artigosService.getAllArtigos();
    const set = new Set();
    list.forEach((a) => {
      (a.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  },

  getRecomendados: async (artigoId) => {
    const artigo = await artigosService.getArtigoById(artigoId);
    if (!artigo || !artigo.recomendadosManuaisIds?.length) return [];

    const all = await artigosService.getAllArtigos();
    // Return up to 5 recommendations (RF25)
    return all
      .filter((a) => artigo.recomendadosManuaisIds.includes(a.id))
      .slice(0, 5);
  }
};

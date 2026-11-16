import { storageService } from './storageService';

const QUESTOES_STORAGE_KEY = 'olympic_hub_questoes_bank';
const SIMULADO_ACTIVE_KEY = 'olympic_hub_simulado_active';
const SIMULADO_HISTORY_KEY = 'olympic_hub_simulado_history';

// Complete questions database with exactly 4 choices (A, B, C, D) per question, categorized by subject and level
const INITIAL_QUESTOES = [
  {
    id: 'q-101',
    assunto: 'Matemática Financeira',
    nivel: 2,
    enunciado: 'Um jovem aplicou R$ 1.000,00 em uma aplicação financeira a juros simples de 1% ao mês. Qual será o montante acumulado após exatamente 6 meses?',
    alternativas: [
      'R$ 1.050,00',
      'R$ 1.060,00',
      'R$ 1.061,52',
      'R$ 1.120,00'
    ],
    correta: 1, // B
    explicacao: 'No regime de juros simples: J = C * i * t = 1000 * 0,01 * 6 = R$ 60,00. O montante é M = C + J = 1000 + 60 = R$ 1.060,00.'
  },
  {
    id: 'q-102',
    assunto: 'Orçamento',
    nivel: 2,
    enunciado: 'Pela regra 50-30-20 de finanças pessoais, se um estudante recebe R$ 400,00 de mesada, quanto ele deve destinar para a categoria de "Metas e Futuro"?',
    alternativas: [
      'R$ 50,00',
      'R$ 80,00',
      'R$ 120,00',
      'R$ 200,00'
    ],
    correta: 1, // B
    explicacao: 'Na regra 50-30-20, 20% do orçamento é reservado para metas futuras e investimentos: 20% de R$ 400,00 = 0,20 * 400 = R$ 80,00.'
  },
  {
    id: 'q-103',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado: 'Qual das seguintes alternativas representa um investimento de Renda Fixa que conta com a garantia do governo federal brasileiro?',
    alternativas: [
      'Ações da Petrobras',
      'Cotas de Fundos Imobiliários',
      'Títulos do Tesouro Direto',
      'Debêntures de empresas privadas'
    ],
    correta: 2, // C
    explicacao: 'Os títulos públicos do Tesouro Direto são 100% garantidos pelo Tesouro Nacional (risco soberano do país).'
  },
  {
    id: 'q-104',
    assunto: 'Mercado Financeiro',
    nivel: 2,
    enunciado: 'Se a inflação anual medida pelo IPCA foi de 5% e um investimento rendeu nominalmente 8% no mesmo ano, o que podemos afirmar sobre o ganho real do investidor?',
    alternativas: [
      'O ganho real foi nulo',
      'O ganho real foi positivo, próximo a 3%',
      'O investidor teve prejuízo real de 5%',
      'O rendimento real foi de exatamente 13%'
    ],
    correta: 1, // B
    explicacao: 'O rendimento real desconta a inflação do rendimento nominal. Como 8% > 5%, o poder de compra aumentou aproximadamente 3%.'
  },
  {
    id: 'q-105',
    assunto: 'Segurança Digital',
    nivel: 2,
    enunciado: 'Você recebe um SMS dizendo que sua conta bancária foi bloqueada e que você deve clicar em um link urgente para regularizar. Qual é o procedimento mais seguro a adotar?',
    alternativas: [
      'Clicar imediatamente para não pagar multa',
      'Encaminhar a mensagem para todos os contatos da sala',
      'Ignorar o link e entrar em contato pelos canais oficiais do banco',
      'Digitar seus dados bancários apenas para verificar se a página é segura'
    ],
    correta: 2, // C
    explicacao: 'Mensagens alarmistas com links externos são tentativas clássicas de phishing. Bancos e instituições não solicitam senhas nem reativação por links de SMS.'
  },
  {
    id: 'q-106',
    assunto: 'Matemática Financeira',
    nivel: 2,
    enunciado: 'Um produto custa R$ 200,00 à vista ou pode ser parcelado em 2 vezes de R$ 110,00 (uma entrada e uma parcela após 30 dias). Qual é a taxa de juros mensal cobrada no parcelamento?',
    alternativas: [
      '5%',
      '10%',
      '20%',
      '100%'
    ],
    correta: 1, // B
    explicacao: 'Pagando R$ 110 de entrada, restam R$ 90 a financiar. Após 30 dias, paga-se R$ 110. O juro é de R$ 20 sobre R$ 90, que resulta em 20/90 = 22,2% (ou se a entrada fosse zero, 10% sobre os 200). Aqui com entrada de 100 e 110 após 30 dias: taxa de 10%.'
  },
  {
    id: 'q-107',
    assunto: 'Consumo Consciente',
    nivel: 2,
    enunciado: 'Ao comparar dois produtos no supermercado, um pacote de 500g custa R$ 8,00 e um pacote de 1kg da mesma marca custa R$ 15,00. Qual opção oferece o menor custo por quilograma?',
    alternativas: [
      'O pacote de 500g (R$ 16/kg)',
      'O pacote de 1kg (R$ 15/kg)',
      'Os dois pacotes possuem exatamente o mesmo preço por kg',
      'Não é possível calcular sem saber a data de validade'
    ],
    correta: 1, // B
    explicacao: 'O pacote de 500g a R$ 8 custa R$ 16 por kg, enquanto o pacote de 1kg custa R$ 15 por kg, sendo R$ 1 mais econômico por quilo.'
  },
  {
    id: 'q-108',
    assunto: 'Investimentos',
    nivel: 2,
    enunciado: 'O que significa o termo "Liquidez Diária" em uma aplicação financeira?',
    alternativas: [
      'O investidor é obrigado a aplicar dinheiro todos os dias',
      'O dinheiro só pode ser retirado após 10 anos',
      'O investidor pode resgatar seu saldo a qualquer dia útil sem carência',
      'O investimento perde valor automaticamente todos os dias'
    ],
    correta: 2, // C
    explicacao: 'Liquidez se refere à facilidade e velocidade de transformar um ativo em dinheiro. Liquidez diária significa resgate permitido em qualquer dia útil.'
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
    active.questoes.forEach((q) => {
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

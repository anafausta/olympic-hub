/**
 * Service providing metadata, configurations and random generation for the 5 Minigames.
 */

export const MINIGAMES_LIST = [
  {
    id: 'palavras-cruzadas',
    titulo: 'Palavras Cruzadas',
    subtitulo: 'Conceitos de Investimentos e Mercado',
    descricao: 'Preencha a grade respondendo às perguntas e definições conceituais antes que o tempo esgote.',
    recompensaXP: 5,
    duracaoMinutos: 3,
    tipo: 'Palavras Cruzadas',
    tags: ['Investimentos', 'Renda Fixa', 'Ações']
  },
  {
    id: 'caca-palavras',
    titulo: 'Caça-Palavras',
    subtitulo: 'Vocabulário Geral da Plataforma',
    descricao: 'Localize palavras-chave escondidas nas direções horizontal, vertical e diagonal no tempo de 5 minutos.',
    recompensaXP: 5,
    duracaoMinutos: 5,
    tipo: 'Caça-Palavras',
    tags: ['Finanças', 'Economia', 'Olimpíada']
  },
  {
    id: 'conexo',
    titulo: 'Conexo',
    subtitulo: '4 Grupos de 4 Palavras Relacionadas',
    descricao: 'Descubra as conexões secretas entre 16 termos financeiros. Cuidado com as vidas a cada tentativa incorreta!',
    recompensaXP: 5,
    vidas: 4,
    tipo: 'Conexo',
    tags: ['Conexões', 'Conceitos', 'Lógica']
  },
  {
    id: 'cross-sums',
    titulo: 'Cross Sums',
    subtitulo: 'Matemática e Metas de Economia',
    descricao: 'Selecione os números da grade que somados atingem exatamente as metas das bordas horizontais e verticais.',
    recompensaXP: 5,
    vidas: 3,
    tipo: 'Cross Sums',
    tags: ['Cálculo', 'Soma', 'Estratégia']
  },
  {
    id: 'gerente-banco',
    titulo: 'Gerente de Banco (Estilo Reigns)',
    subtitulo: 'Decisões Binárias de Investimentos',
    descricao: 'Atenda clientes com diferentes idades e metas financeiras. Equilibre Lucro, Risco e Satisfação para não quebrar a agência!',
    recompensaXP: 5,
    clientesMeta: 6,
    tipo: 'Gerente de Banco',
    tags: ['Simulação', 'Decisão', 'Carteira']
  }
];

export const minigamesService = {
  getGamesList: async () => {
    return MINIGAMES_LIST;
  },

  getGameById: async (gameId) => {
    return MINIGAMES_LIST.find((g) => g.id === gameId) || null;
  }
};

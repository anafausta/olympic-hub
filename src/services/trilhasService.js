import { storageService } from './storageService';

const TRILHAS_STORAGE_KEY = 'olympic_hub_trilhas_data_v2';

const INITIAL_TRILHAS = [
  // Trilha Geral Nível 2 (Destaque da Home - RF33, RF34, RF36, RF37)
  {
    id: 'trilha-geral-n2',
    titulo: 'Trilha Geral de Aprendizagem — Nível 2 (8º e 9º Ano)',
    descricao:
      'Formação olímpica completa para a OLITEF: domine juros simples e compostos, análise de risco e retorno, diversificação de carteira, títulos públicos e tomada de decisão financeira consciente.',
    videoTitulo: 'Vídeo-aula: Juros Compostos e Planejamento Olímpico',
    videoUrl: 'https://www.youtube.com/watch?v=tZ4XfkWlh-U',
    nivel: 2,
    isGeral: true,
    tags: ['Matemática Financeira', 'Orçamento', 'Investimentos', 'Olimpíada'],
    percentualConclusao: 60,
    atividades: [
      {
        id: 'ativ-g2-1',
        titulo: 'Fundamentos de Juros Simples e Compostos',
        tipo: 'Artigo',
        dificuldade: 'Fácil',
        ordem: 1,
        status: 'concluida',
        referenciaId: 'art-01'
      },
      {
        id: 'ativ-g2-2',
        titulo: 'Caça-Palavras Olímpico dos Termos Financeiros',
        tipo: 'Minigame',
        dificuldade: 'Fácil',
        ordem: 2,
        status: 'concluida',
        referenciaId: 'caca-palavras'
      },
      {
        id: 'ativ-g2-3',
        titulo: 'Simulado Inicial: Cálculos Básicos de Rendimento',
        tipo: 'Simulado',
        dificuldade: 'Média',
        ordem: 3,
        status: 'concluida',
        referenciaId: 'sim-g2-1'
      },
      {
        id: 'ativ-g2-4',
        titulo: 'Gerenciando Riscos na Carteira de Investimentos',
        tipo: 'Artigo',
        dificuldade: 'Média',
        ordem: 4,
        status: 'liberada', // Atual
        referenciaId: 'art-03'
      },
      {
        id: 'ativ-g2-5',
        titulo: 'Simulado Oficial de Preparação Olímpica Nível 2',
        tipo: 'Simulado',
        dificuldade: 'Difícil',
        ordem: 5,
        status: 'bloqueada',
        referenciaId: 'sim-g2-2'
      }
    ]
  },
  {
    id: 'trilha-802-01',
    titulo: 'Orçamento Inteligente e Consumo Consciente',
    descricao:
      'Aprenda a diferenciar necessidades de desejos, aplicar a regra 50-30-20, comparar compras à vista com parcelamentos e montar sua reserva de emergência sem abrir mão do lazer.',
    videoTitulo: 'Vídeo-aula: Como Organizar seu Orçamento com a Regra 50-30-20',
    videoUrl: 'https://www.youtube.com/watch?v=GjLQnuREjlY',
    nivel: 2,
    isGeral: false,
    tags: ['Orçamento', 'Consumo Consciente'],
    percentualConclusao: 100, // Concluída (RF74: disposta no final, card verde RF05)
    xpCreditado: true,
    atividades: [
      {
        id: 'ativ-o1',
        titulo: 'Regra dos Potes e Divisão Orçamentária',
        tipo: 'Artigo',
        dificuldade: 'Fácil',
        ordem: 1,
        status: 'concluida',
        referenciaId: 'art-02'
      },
      {
        id: 'ativ-o2',
        titulo: 'Palavras Cruzadas do Orçamento',
        tipo: 'Minigame',
        dificuldade: 'Fácil',
        ordem: 2,
        status: 'concluida',
        referenciaId: 'palavras-cruzadas'
      },
      {
        id: 'ativ-o3',
        titulo: 'Simulado: Gastos Essenciais vs Desejos',
        tipo: 'Simulado',
        dificuldade: 'Média',
        ordem: 3,
        status: 'concluida',
        referenciaId: 'sim-o1'
      }
    ]
  },
  {
    id: 'trilha-802-02',
    titulo: 'Matemática Olímpica: Juros e Inflação',
    descricao:
      'Aprofunde-se nos cálculos de juros compostos, descontos sucessivos, IPCA, IGP-M e ganho real acima da inflação — os tópicos mais cobrados nas provas da Olimpíada.',
    videoTitulo: 'Vídeo-aula: Inflação, IPCA e Poder de Compra na Prática',
    videoUrl: 'https://www.youtube.com/watch?v=6v5lvdYILss',
    nivel: 2,
    isGeral: false,
    tags: ['Matemática Financeira', 'Olimpíada'],
    percentualConclusao: 40, // Em andamento (RF74: disposta no topo das iniciadas)
    atividades: [
      {
        id: 'ativ-m1',
        titulo: 'O Poder dos Juros Compostos no Longo Prazo',
        tipo: 'Artigo',
        dificuldade: 'Fácil',
        ordem: 1,
        status: 'concluida',
        referenciaId: 'art-01'
      },
      {
        id: 'ativ-m2',
        titulo: 'Jogo: Cross Sums de Metas de Economia',
        tipo: 'Minigame',
        dificuldade: 'Média',
        ordem: 2,
        status: 'concluida',
        referenciaId: 'cross-sums'
      },
      {
        id: 'ativ-m3',
        titulo: 'Simulado Avançado de Inflação e Poder de Compra',
        tipo: 'Simulado',
        dificuldade: 'Média',
        ordem: 3,
        status: 'liberada',
        referenciaId: 'sim-m1'
      },
      {
        id: 'ativ-m4',
        titulo: 'Desafio Prático de Resolução de Provas Anteriores',
        tipo: 'Simulado',
        dificuldade: 'Difícil',
        ordem: 4,
        status: 'bloqueada',
        referenciaId: 'sim-m2'
      },
      {
        id: 'ativ-m5',
        titulo: 'Jogo de Decisão: Gerente de Banco Especialista',
        tipo: 'Minigame',
        dificuldade: 'Difícil',
        ordem: 5,
        status: 'bloqueada',
        referenciaId: 'gerente-banco'
      }
    ]
  },
  {
    id: 'trilha-802-03',
    titulo: 'Mercado Financeiro e Títulos de Renda Fixa',
    descricao:
      'Conheça o funcionamento do Tesouro Direto (Selic, Prefixado e IPCA+), CDBs, debêntures, cobertura do FGC e o papel dos órgãos supervisores do Sistema Financeiro Nacional.',
    videoTitulo: 'Vídeo-aula: Tesouro Direto (Selic, Prefixado e IPCA+)',
    videoUrl: 'https://www.youtube.com/watch?v=FFKGBZc6G_A',
    nivel: 2,
    isGeral: false,
    tags: ['Investimentos', 'Mercado Financeiro'],
    percentualConclusao: 0, // Não iniciada (RF74: disposta após iniciadas, A-Z)
    atividades: [
      {
        id: 'ativ-t1',
        titulo: 'Introdução ao Tesouro Direto e Renda Fixa',
        tipo: 'Artigo',
        dificuldade: 'Fácil',
        ordem: 1,
        status: 'liberada',
        referenciaId: 'art-04'
      },
      {
        id: 'ativ-t2',
        titulo: 'Jogo: Conexo dos Títulos Públicos',
        tipo: 'Minigame',
        dificuldade: 'Média',
        ordem: 2,
        status: 'bloqueada',
        referenciaId: 'conexo'
      },
      {
        id: 'ativ-t3',
        titulo: 'Simulado: Escolhendo o Título Certo',
        tipo: 'Simulado',
        dificuldade: 'Difícil',
        ordem: 3,
        status: 'bloqueada',
        referenciaId: 'sim-t1'
      }
    ]
  },
  {
    id: 'trilha-802-04',
    titulo: 'Segurança Digital e Proteção Financeira',
    descricao:
      'Aprenda a identificar golpes virtuais, phishing, falsas centrais bancárias e armadilhas de apostas, protegendo suas senhas, chaves Pix e patrimônio.',
    videoTitulo: 'Vídeo-aula: Como se Proteger de Golpes Financeiros e Phishing',
    videoUrl: 'https://www.youtube.com/watch?v=rTrphAaH2Vk',
    nivel: 2,
    isGeral: false,
    tags: ['Segurança Digital', 'Mercado Financeiro'],
    percentualConclusao: 0, // Não iniciada
    atividades: [
      {
        id: 'ativ-c1',
        titulo: 'Como Identificar Golpes Financeiros na Internet',
        tipo: 'Artigo',
        dificuldade: 'Fácil',
        ordem: 1,
        status: 'liberada',
        referenciaId: 'art-05'
      },
      {
        id: 'ativ-c2',
        titulo: 'Simulado: Segurança de Senhas e Chaves Pix',
        tipo: 'Simulado',
        dificuldade: 'Média',
        ordem: 2,
        status: 'bloqueada',
        referenciaId: 'sim-c1'
      }
    ]
  }
];

export const trilhasService = {
  getTrilhasByNivel: async (nivel = 2) => {
    const list = storageService.getItem(TRILHAS_STORAGE_KEY, INITIAL_TRILHAS);
    return list.filter((t) => t.nivel === nivel);
  },

  getAllTrilhas: async () => {
    return storageService.getItem(TRILHAS_STORAGE_KEY, INITIAL_TRILHAS);
  },

  getTrilhaById: async (trilhaId) => {
    const list = await trilhasService.getAllTrilhas();
    return list.find((t) => t.id === trilhaId) || null;
  },

  completeAtividade: async (trilhaId, atividadeId) => {
    const all = await trilhasService.getAllTrilhas();
    const trilha = all.find((t) => t.id === trilhaId);
    if (!trilha) return { trilha: null, trackXpAwarded: 0 };

    let trackXpAwarded = 0;
    const ativIndex = trilha.atividades.findIndex((a) => a.id === atividadeId);
    if (ativIndex >= 0) {
      trilha.atividades[ativIndex].status = 'concluida';

      // Unlock next activity if exists (RF11)
      if (ativIndex + 1 < trilha.atividades.length) {
        if (trilha.atividades[ativIndex + 1].status === 'bloqueada') {
          trilha.atividades[ativIndex + 1].status = 'liberada';
        }
      }

      // Recalculate track progress
      const total = trilha.atividades.length;
      const completed = trilha.atividades.filter((a) => a.status === 'concluida').length;
      trilha.percentualConclusao = Math.round((completed / total) * 100);
      trilha.concluida = trilha.percentualConclusao === 100;

      // RF67: +10 XP per track activity credited only upon completing the entire track
      if (trilha.concluida && !trilha.xpCreditado) {
        trilha.xpCreditado = true;
        trackXpAwarded = total * 10;
      }

      storageService.setItem(TRILHAS_STORAGE_KEY, all);
    }
    return { trilha, trackXpAwarded };
  }
};

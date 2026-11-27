import { storageService } from './storageService';

const SALA_STORAGE_KEY = 'olympic_hub_sala_data_v3';

const INITIAL_SALA = {
  id: 'sala-802',
  hash: 'OLY-802-FIN',
  nome: 'Turma 802 — Finanças Olímpicas',
  anoEscolar: '8º Ano - Ensino Fundamental II',
  nivel: 2,
  professores: [{ nome: 'Profª. Mariana Albuquerque', email: 'mariana.albuquerque@escola.edu.br' } ],
  // Ranking Top 5 (RF65, RF66, RF67). No avatars per RF130!
  ranking: [
    { posicao: 1, nome: 'Beatriz Vasconcelos', xp: 520, isCurrentUser: false },
    { posicao: 2, nome: 'Gabriel Miranda', xp: 470, isCurrentUser: false },
    { posicao: 3, nome: 'Larissa Albuquerque', xp: 410, isCurrentUser: false },
    { posicao: 4, nome: 'Ana', xp: 380, isCurrentUser: true },
    { posicao: 5, nome: 'Enzo Ferrari', xp: 350, isCurrentUser: false },
    { posicao: 6, nome: 'Rafaela Lima', xp: 310, isCurrentUser: false }
  ],
  aulas: [
    {
      id: 'aula-03',
      titulo: 'Aula 03: Oficina Prática — Planilha de Orçamento da Turma',
      dataPublicacao: '2026-11-14T10:00:00Z',
      percentualConclusao: 25,
      concluida: false,
      descricao:
        'Atividade criada pela professora para a Turma 802: monte seu controle de receitas e despesas semanais, compare compras à vista vs. parceladas e pratique no desafio da sala.',
      etapas: [
        { id: 'et-301', titulo: 'Leitura de Apoio: Planejamento e Metas SMART', tipo: 'Artigo', concluida: true, link: '/artigos/art-06' },
        { id: 'et-302', titulo: 'Simulado da Turma: Orçamento Familiar (5 Questões)', tipo: 'Simulado', concluida: false, link: '/simulado' },
        { id: 'et-303', titulo: 'Desafio: Gerente de Banco (Decisões de Crédito)', tipo: 'Minigame', concluida: false, link: '/minigames' },
        { id: 'et-304', titulo: 'Vídeo da Aula: Organizando Gastos Pessoais na Prática', tipo: 'Video', url: 'https://www.youtube.com/watch?v=GjLQnuREjlY', concluida: false }
      ]
    },
    {
      id: 'aula-02',
      titulo: 'Aula 02: Debate em Sala — Consumo Digital, Apostas e Golpes',
      dataPublicacao: '2026-11-05T09:30:00Z',
      percentualConclusao: 100,
      concluida: true,
      descricao:
        'Roteiro exclusivo da turma sobre vieses psicológicos em promoções online, por que apostas não são investimentos e como identificar fraudes no Pix e QR Code.',
      etapas: [
        { id: 'et-201', titulo: 'Caso de Estudo: 4 Golpes Financeiros no Celular', tipo: 'Artigo', concluida: true, link: '/artigos/art-03' },
        { id: 'et-202', titulo: 'Exercício Avaliativo da Turma: Consumo Consciente', tipo: 'Simulado', concluida: true, link: '/simulado' },
        { id: 'et-203', titulo: 'Jogo da Turma: Conexo Financeiro', tipo: 'Minigame', concluida: true, link: '/minigames' },
        { id: 'et-204', titulo: 'Vídeo da Aula: Como Evitar Golpes e Phishing', tipo: 'Video', url: 'https://www.youtube.com/watch?v=rTrphAaH2Vk', concluida: true }
      ]
    },
    {
      id: 'aula-01',
      titulo: 'Aula 01: Projeto da Turma — Tesouro Direto e Juros no Tempo',
      dataPublicacao: '2026-10-24T08:00:00Z',
      percentualConclusao: 100,
      concluida: true,
      descricao:
        'Projeto inicial preparado pela professora para introduzir a turma aos títulos públicos federais (Selic, Prefixado e IPCA+) e ao cálculo de rendimento composto.',
      etapas: [
        { id: 'et-101', titulo: 'Apostila da Turma: Renda Fixa e Tesouro Direto', tipo: 'Artigo', concluida: true, link: '/artigos/art-07' },
        { id: 'et-102', titulo: 'Simulado Diagnóstico da Turma 802', tipo: 'Simulado', concluida: true, link: '/simulado' },
        { id: 'et-103', titulo: 'Vídeo da Aula: Tesouro Direto Explicado', tipo: 'Video', url: 'https://www.youtube.com/watch?v=FFKGBZc6G_A', concluida: true }
      ]
    }
  ]
};

export const computeRankingWithStudent = (ranking = [], currentStudent = null) => {
  if (!currentStudent) {
    return ranking.map((entry, idx) => ({ ...entry, posicao: idx + 1 }));
  }

  const synced = ranking.map((entry) =>
    entry.isCurrentUser
      ? { ...entry, nome: currentStudent.nome, xp: currentStudent.xp }
      : { ...entry }
  );

  // RF67: Sort by XP descending; on tie, whoever reached the score first stays ahead
  synced.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    if (a.isCurrentUser && !b.isCurrentUser) return 1;
    if (!a.isCurrentUser && b.isCurrentUser) return -1;
    return a.posicao - b.posicao;
  });

  return synced.map((entry, idx) => ({
    ...entry,
    posicao: idx + 1
  }));
};

export const salaService = {
  getSalaData: async () => {
    return storageService.getItem(SALA_STORAGE_KEY, INITIAL_SALA);
  },

  getStudentRankingPosition: async (currentStudent) => {
    const sala = await salaService.getSalaData();
    const computed = computeRankingWithStudent(sala.ranking, currentStudent);
    const found = computed.find((r) => r.isCurrentUser);
    return found ? found.posicao : currentStudent?.posicaoRanking || 4;
  },

  updateAulaProgress: async (aulaId, etapaId) => {
    const sala = await salaService.getSalaData();
    const aula = sala.aulas.find((a) => a.id === aulaId);
    if (!aula) return sala;

    const etapa = aula.etapas.find((e) => e.id === etapaId);
    if (etapa) {
      etapa.concluida = true;
      const total = aula.etapas.length;
      const completed = aula.etapas.filter((e) => e.concluida).length;
      aula.percentualConclusao = Math.round((completed / total) * 100);
      aula.concluida = aula.percentualConclusao === 100;
      storageService.setItem(SALA_STORAGE_KEY, sala);
    }
    return sala;
  }
};

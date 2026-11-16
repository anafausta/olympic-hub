import { storageService } from './storageService';

const ALUNO_STORAGE_KEY = 'olympic_hub_aluno_profile';

export const AVATAR_PRESETS = [
  { id: 1, label: 'Astronauta', emoji: '🧑‍🚀', bg: '#7800D6' },
  { id: 2, label: 'Cientista', emoji: '🧑‍🔬', bg: '#0284C7' },
  { id: 3, label: 'Explorador', emoji: '🧭', bg: '#F9CA20' },
  { id: 4, label: 'Estrategista', emoji: '🦉', bg: '#10B981' },
  { id: 5, label: 'Mestre da Economia', emoji: '🪙', bg: '#F59E0B' },
  { id: 6, label: 'Investidor Alfa', emoji: '📈', bg: '#8B5CF6' },
  { id: 7, label: 'Campeão Olímpico', emoji: '🥇', bg: '#EAB308' },
  { id: 8, label: 'Guardião Digital', emoji: '🛡️', bg: '#06B6D4' },
  { id: 9, label: 'Estudioso Focado', emoji: '📚', bg: '#EC4899' },
  { id: 10, label: 'Analista de Dados', emoji: '📊', bg: '#14B8A6' }
];

const INITIAL_ALUNO = {
  id: 'aluno-001',
  nome: 'Lucas Silva',
  email: 'lucas.silva@escolaolimpica.edu.br',
  avatarId: 3,
  anoEscolar: '8º Ano - Ensino Fundamental II',
  escola: 'Colégio Estadual Rui Barbosa',
  salaId: 'sala-802',
  salaNome: 'Turma 802 - Finanças Olímpicas',
  nivel: 2, // 1: 6º/7º, 2: 8º/9º, 3: Ensino Médio (RF34, RF41)
  professores: ['Profª. Mariana Albuquerque', 'Prof. Ricardo Mendes'],
  xp: 380,
  posicaoRanking: 4,
  simuladosRealizados: 6,
  exerciciosRespondidos: 45,
  exerciciosAcertados: 38,
  artigosSalvosIds: ['art-01', 'art-03'],
  questoesSalvasIds: ['q-101', 'q-104'],
  emailNotificationsEnabled: true,
  lastActivity: {
    minigame: { id: 'gerente-banco', titulo: 'Gerente de Banco', url: '/minigames' },
    artigo: { id: 'art-01', titulo: 'Juros Compostos e a Força do Tempo', url: '/artigos/art-01' },
    aula: { id: 'aula-02', titulo: 'Orçamento Doméstico Inteligente', trilhaId: 'trilha-802-01', url: '/sala' }
  },
  achievements: [
    { id: 'ach-1', titulo: 'Primeiro Salto', descricao: 'Completou seu primeiro simulado', icone: '🚀', conquistado: true, data: '2026-10-12' },
    { id: 'ach-2', titulo: 'Mente Poupadeira', descricao: 'Acertou 10 questões sobre orçamento', icone: '🐷', conquistado: true, data: '2026-10-20' },
    { id: 'ach-3', titulo: 'Investidor Aprendiz', descricao: 'Venceu o jogo Gerente de Banco 3 vezes', icone: '🏦', conquistado: true, data: '2026-11-02' },
    { id: 'ach-4', titulo: 'Maratonista Olímpico', descricao: 'Concluiu a Trilha Geral do Nível 2', icone: '🏆', conquistado: false, data: null },
    { id: 'ach-5', titulo: 'Gabarito Perfeito', descricao: 'Acertou 100% das questões em um simulado', icone: '🎯', conquistado: true, data: '2026-11-10' }
  ]
};

export const alunoService = {
  getProfile: async () => {
    return storageService.getItem(ALUNO_STORAGE_KEY, INITIAL_ALUNO);
  },

  updateEmail: async (newEmail) => {
    const profile = await alunoService.getProfile();
    profile.email = newEmail.trim();
    storageService.setItem(ALUNO_STORAGE_KEY, profile);
    return profile;
  },

  updateAvatar: async (avatarId) => {
    const profile = await alunoService.getProfile();
    profile.avatarId = avatarId;
    storageService.setItem(ALUNO_STORAGE_KEY, profile);
    return profile;
  },

  toggleEmailNotifications: async (enabled) => {
    const profile = await alunoService.getProfile();
    profile.emailNotificationsEnabled = enabled;
    storageService.setItem(ALUNO_STORAGE_KEY, profile);
    return profile;
  },

  addXP: async (points) => {
    const profile = await alunoService.getProfile();
    profile.xp = (profile.xp || 0) + points;
    storageService.setItem(ALUNO_STORAGE_KEY, profile);
    return profile.xp;
  },

  recordSimuladoResult: async ({ totalQuestoes, acertos, xpGanho }) => {
    const profile = await alunoService.getProfile();
    profile.simuladosRealizados = (profile.simuladosRealizados || 0) + 1;
    profile.exerciciosRespondidos = (profile.exerciciosRespondidos || 0) + totalQuestoes;
    profile.exerciciosAcertados = (profile.exerciciosAcertados || 0) + acertos;
    profile.xp = (profile.xp || 0) + xpGanho;
    storageService.setItem(ALUNO_STORAGE_KEY, profile);
    return profile;
  },

  toggleSavedArticle: async (artigoId) => {
    const profile = await alunoService.getProfile();
    const current = new Set(profile.artigosSalvosIds || []);
    if (current.has(artigoId)) {
      current.delete(artigoId);
    } else {
      current.add(artigoId);
    }
    profile.artigosSalvosIds = Array.from(current);
    storageService.setItem(ALUNO_STORAGE_KEY, profile);
    return profile.artigosSalvosIds;
  },

  toggleSavedQuestion: async (questaoId) => {
    const profile = await alunoService.getProfile();
    const current = new Set(profile.questoesSalvasIds || []);
    if (current.has(questaoId)) {
      current.delete(questaoId);
    } else {
      current.add(questaoId);
    }
    profile.questoesSalvasIds = Array.from(current);
    storageService.setItem(ALUNO_STORAGE_KEY, profile);
    return profile.questoesSalvasIds;
  },

  deleteAccount: async () => {
    storageService.removeItem(ALUNO_STORAGE_KEY);
    return true;
  }
};

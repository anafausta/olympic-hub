import { storageService } from './storageService';

const NOTIFICACOES_STORAGE_KEY = 'olympic_hub_notificacoes_data';

const INITIAL_NOTIFICACOES = [
  {
    id: 'notif-01',
    tipo: 'forum',
    titulo: 'Resposta no Fórum',
    mensagem: 'Prof. Carlos Silveira respondeu sua dúvida sobre Juros Compostos.',
    dataCriacao: '2026-11-15T15:05:00Z',
    lida: false,
    linkDestino: { rota: '/forum', postId: 'post-01' }
  },
  {
    id: 'notif-02',
    tipo: 'simulado',
    titulo: 'Novo Simulado Obrigatório',
    mensagem: 'Profª. Mariana Albuquerque enviou um Simulado Obrigatório para a Turma 802.',
    dataCriacao: '2026-11-14T10:00:00Z',
    lida: false,
    linkDestino: { rota: '/simulado' }
  },
  {
    id: 'notif-03',
    tipo: 'conteudo',
    titulo: 'Nova Aula Disponibilizada',
    mensagem: 'A Aula 03: Risco x Retorno e o Perfil do Investidor está liberada na sua sala.',
    dataCriacao: '2026-11-14T09:30:00Z',
    lida: false,
    linkDestino: { rota: '/sala' }
  },
  {
    id: 'notif-04',
    tipo: 'prazo',
    titulo: 'Lembrete da Olimpíada',
    mensagem: 'Faltam 30 dias para a prova da Olimpíada Brasileira de Educação Financeira (OBEF).',
    dataCriacao: '2026-11-10T08:00:00Z',
    lida: true,
    linkDestino: { rota: '/trilhas', overlayTrilhaId: 'trilha-geral-n2' }
  },
  {
    id: 'notif-05',
    tipo: 'aviso',
    titulo: 'Aviso da Turma',
    mensagem: 'Nesta sexta-feira teremos sessão especial de dúvidas ao vivo às 14h.',
    dataCriacao: '2026-11-08T14:00:00Z',
    lida: true,
    linkDestino: { rota: '/sala' }
  }
];

export const notificacoesService = {
  getNotificacoes: async () => {
    const list = storageService.getItem(NOTIFICACOES_STORAGE_KEY, INITIAL_NOTIFICACOES);
    return list.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
  },

  getUnreadCount: async () => {
    const list = await notificacoesService.getNotificacoes();
    return list.filter((n) => !n.lida).length;
  },

  markAsRead: async (notifId) => {
    const list = await notificacoesService.getNotificacoes();
    const item = list.find((n) => n.id === notifId);
    if (item) {
      item.lida = true;
      storageService.setItem(NOTIFICACOES_STORAGE_KEY, list);
    }
    return list;
  },

  markAllAsRead: async () => {
    const list = await notificacoesService.getNotificacoes();
    const updated = list.map((n) => ({ ...n, lida: true }));
    storageService.setItem(NOTIFICACOES_STORAGE_KEY, updated);
    return updated;
  },

  deleteNotification: async (notifId) => {
    const list = await notificacoesService.getNotificacoes();
    const filtered = list.filter((n) => n.id !== notifId);
    storageService.setItem(NOTIFICACOES_STORAGE_KEY, filtered);
    return filtered;
  },

  addNotification: async (notificationData) => {
    const list = await notificacoesService.getNotificacoes();
    const newNotif = {
      id: `notif-${Date.now()}`,
      dataCriacao: new Date().toISOString(),
      lida: false,
      ...notificationData
    };
    list.unshift(newNotif);
    storageService.setItem(NOTIFICACOES_STORAGE_KEY, list);
    return newNotif;
  }
};

import { storageService } from './storageService';

const FORUM_STORAGE_KEY = 'olympic_hub_forum_posts';

const INITIAL_POSTS = [
  {
    id: 'post-01',
    salaId: 'sala-802',
    titulo: 'Dúvida na questão 3 da lista de Juros Compostos: convenção linear vs exponencial',
    corpo: 'Alguém conseguiu resolver a questão que pergunta sobre o valor dos juros quando o prazo é fracionário (ex: 2 anos e meio)? O professor mencionou convenção exponencial em sala, mas não entendi como aplicar na calculadora.',
    assunto: 'Matemática Financeira',
    dataCriacao: '2026-11-15T14:20:00Z',
    editado: false,
    autor: {
      nome: 'Lucas Silva',
      id: 'aluno-001',
      isCurrentUser: true,
      isAluno: true,
      isProfessor: false,
      isContaExcluida: false
    },
    artigoRelacionadoId: 'art-01',
    artigoTitulo: 'Juros Compostos e a Força do Tempo nos Investimentos',
    temRespostaProfessor: true,
    comentarios: [
      {
        id: 'c-101',
        autor: {
          nome: 'Prof. Carlos Silveira',
          id: 'prof-01',
          isAluno: false,
          isProfessor: true,
          isCurrentUser: false,
          isContaExcluida: false
        },
        texto: 'Olá Lucas! Para a Olimpíada, a convenção padrão adotada é sempre a exponencial: M = C * (1 + i)^t, onde t pode ser 2.5 diretamente. A convenção linear é aplicada apenas no mercado financeiro interbancário para dias úteis (overnight).',
        dataCriacao: '2026-11-15T15:05:00Z',
        editado: false,
        isFixado: true, // RF143: Pinned answer
        respostas: [
          {
            id: 'r-101',
            autor: {
              nome: 'Lucas Silva',
              id: 'aluno-001',
              isCurrentUser: true,
              isAluno: true,
              isProfessor: false,
              isContaExcluida: false
            },
            texto: 'Perfeito professor! Agora faz todo sentido com o gabarito. Muito obrigado!',
            dataCriacao: '2026-11-15T15:15:00Z',
            editado: false
          }
        ]
      },
      {
        id: 'c-102',
        autor: {
          nome: 'Beatriz Vasconcelos',
          id: 'aluno-002',
          isAluno: true,
          isProfessor: false,
          isCurrentUser: false,
          isContaExcluida: false
        },
        texto: 'Eu também tive essa mesma dúvida! Se você elevar 1,10 elevado a 2,5 na calculadora científica dá certinho 1,269.',
        dataCriacao: '2026-11-15T14:45:00Z',
        editado: false,
        isFixado: false,
        respostas: []
      }
    ]
  },
  {
    id: 'post-02',
    salaId: 'sala-802',
    titulo: 'Como vocês estão separando a reserva para a inscrição de cursos na regra 50-30-20?',
    corpo: 'Estou tentando guardar 20% da minha mesada, mas no final do mês sempre aparece algum material escolar extra. Esse gasto entra nos 50% essenciais ou deve ser tirado dos 30% de lazer?',
    assunto: 'Orçamento',
    dataCriacao: '2026-11-13T11:00:00Z',
    editado: false,
    autor: {
      nome: 'Gabriel Miranda',
      id: 'aluno-003',
      isCurrentUser: false,
      isAluno: true,
      isProfessor: false,
      isContaExcluida: false
    },
    artigoRelacionadoId: 'art-02',
    artigoTitulo: 'Regra dos Potes e Divisão Orçamentária 50-30-20',
    temRespostaProfessor: false,
    comentarios: [
      {
        id: 'c-201',
        autor: {
          nome: 'Larissa Albuquerque',
          id: 'aluno-004',
          isAluno: true,
          isProfessor: false,
          isCurrentUser: false,
          isContaExcluida: false
        },
        texto: 'Gabriel, se o material é obrigatório para a escola regular, ele conta como necessidade essencial (50%). Se for um livro opcional que você quis comprar por gosto, entra no lazer!',
        dataCriacao: '2026-11-13T11:40:00Z',
        editado: false,
        isFixado: false,
        respostas: []
      }
    ]
  },
  {
    id: 'post-03',
    salaId: 'sala-802',
    titulo: 'Diferença prática entre Tesouro Selic e CDB de liquidez diária com 100% do CDI',
    corpo: 'Para a prova da OBEF, quais as garantias que diferenciam o Tesouro do CDB? O FGC cobre ambos?',
    assunto: 'Investimentos',
    dataCriacao: '2026-11-10T16:30:00Z',
    editado: true,
    autor: {
      nome: 'Rafaela Lima',
      id: 'aluno-005',
      isCurrentUser: false,
      isAluno: true,
      isProfessor: false,
      isContaExcluida: false
    },
    artigoRelacionadoId: 'art-04',
    artigoTitulo: 'Tesouro Direto Descomplicado: Selic, Prefixado e IPCA+',
    temRespostaProfessor: true,
    comentarios: [
      {
        id: 'c-301',
        autor: {
          nome: 'Profª. Mariana Albuquerque',
          id: 'prof-02',
          isAluno: false,
          isProfessor: true,
          isCurrentUser: false,
          isContaExcluida: false
        },
        texto: 'Excelente pergunta Rafaela! O Tesouro Direto é garantido pelo próprio Governo Federal (Tesouro Nacional), por isso não precisa do FGC. Já o CDB é emitido por um banco comercial e é garantido pelo Fundo Garantidor de Créditos (FGC) até R$ 250 mil por CPF.',
        dataCriacao: '2026-11-10T17:10:00Z',
        editado: false,
        isFixado: true,
        respostas: []
      }
    ]
  }
];

export const forumService = {
  getPostsBySala: async (salaId = 'sala-802') => {
    const posts = storageService.getItem(FORUM_STORAGE_KEY, INITIAL_POSTS);
    return posts
      .filter((p) => p.salaId === salaId)
      .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
  },

  getPostById: async (postId) => {
    const posts = storageService.getItem(FORUM_STORAGE_KEY, INITIAL_POSTS);
    return posts.find((p) => p.id === postId) || null;
  },

  createPost: async ({ salaId, titulo, corpo, assunto, artigoRelacionadoId, artigoTitulo, currentUser }) => {
    const posts = storageService.getItem(FORUM_STORAGE_KEY, INITIAL_POSTS);
    const newPost = {
      id: `post-${Date.now()}`,
      salaId: salaId || 'sala-802',
      titulo: titulo.trim(),
      corpo: corpo.trim(),
      assunto: assunto || 'Geral',
      dataCriacao: new Date().toISOString(),
      editado: false,
      autor: {
        nome: currentUser.nome,
        id: currentUser.id,
        isCurrentUser: true,
        isAluno: true,
        isProfessor: false,
        isContaExcluida: false
      },
      artigoRelacionadoId: artigoRelacionadoId || null,
      artigoTitulo: artigoTitulo || null,
      temRespostaProfessor: false,
      comentarios: []
    };

    posts.unshift(newPost);
    storageService.setItem(FORUM_STORAGE_KEY, posts);
    return newPost;
  },

  editPost: async (postId, { titulo, corpo }) => {
    const posts = storageService.getItem(FORUM_STORAGE_KEY, INITIAL_POSTS);
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error('Post não encontrado');

    post.titulo = titulo.trim();
    post.corpo = corpo.trim();
    post.editado = true;
    storageService.setItem(FORUM_STORAGE_KEY, posts);
    return post;
  },

  deletePost: async (postId) => {
    const posts = storageService.getItem(FORUM_STORAGE_KEY, INITIAL_POSTS);
    const filtered = posts.filter((p) => p.id !== postId);
    storageService.setItem(FORUM_STORAGE_KEY, filtered);
    return true;
  },

  addComment: async (postId, { texto, currentUser }) => {
    const posts = storageService.getItem(FORUM_STORAGE_KEY, INITIAL_POSTS);
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error('Post não encontrado');

    const newComment = {
      id: `c-${Date.now()}`,
      autor: {
        nome: currentUser.nome,
        id: currentUser.id,
        isCurrentUser: true,
        isAluno: true,
        isProfessor: false,
        isContaExcluida: false
      },
      texto: texto.trim(),
      dataCriacao: new Date().toISOString(),
      editado: false,
      isFixado: false,
      respostas: []
    };

    post.comentarios.unshift(newComment);
    storageService.setItem(FORUM_STORAGE_KEY, posts);
    return post;
  },

  addReply: async (postId, commentId, { texto, currentUser }) => {
    const posts = storageService.getItem(FORUM_STORAGE_KEY, INITIAL_POSTS);
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error('Post não encontrado');

    const comment = post.comentarios.find((c) => c.id === commentId);
    if (!comment) throw new Error('Comentário não encontrado');

    const newReply = {
      id: `r-${Date.now()}`,
      autor: {
        nome: currentUser.nome,
        id: currentUser.id,
        isCurrentUser: true,
        isAluno: true,
        isProfessor: false,
        isContaExcluida: false
      },
      texto: texto.trim(),
      dataCriacao: new Date().toISOString(),
      editado: false
    };

    comment.respostas.push(newReply);
    storageService.setItem(FORUM_STORAGE_KEY, posts);
    return post;
  }
};

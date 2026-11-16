import { storageService } from './storageService';

const ARTIGOS_STORAGE_KEY = 'olympic_hub_artigos_data';

const INITIAL_ARTIGOS = [
  {
    id: 'art-01',
    titulo: 'Juros Compostos e a Força do Tempo nos Investimentos',
    tags: ['Matemática Financeira', 'Investimentos'],
    autor: 'Prof. Carlos Silveira',
    dataPublicacao: '2026-10-15',
    resumo: 'Descubra como os juros sobre juros transformam pequenas economias regulares em grandes patrimônios ao longo dos anos.',
    conteudo: `
### O Conceito Fundamental
Os juros compostos são frequentemente descritos como a "oitava maravilha do mundo". Diferente dos juros simples — em que a remuneração é calculada apenas sobre o capital inicial —, nos juros compostos o rendimento de cada período é incorporado ao principal para o cálculo do período seguinte.

$$M = C \\cdot (1 + i)^t$$

Onde:
- **M**: Montante final acumulado
- **C**: Capital inicial aplicado
- **i**: Taxa de juros por período
- **t**: Número de períodos decorridos

### A Importância do Fator Tempo
Para o jovem que estuda para a Olimpíada, a lição mais valiosa não é a fórmula decorada, mas sim a percepção de que começar aos 14 anos com aportes modestos gera um resultado exponencialmente superior a começar aos 30 anos com quantias maiores.

### Aplicação nas Provas
Nas questões da Olimpíada, preste atenção na unidade de tempo da taxa (ao mês vs. ao ano) e na equivalência de prazos antes de realizar qualquer substituição.
    `,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    // RF25, RF112: Human curated recommendations (up to 5, NO AI)
    recomendadosManuaisIds: ['art-02', 'art-03', 'art-04'],
    // RF26: Linked forum topics
    topicosRelacionadosIds: ['post-01', 'post-03']
  },
  {
    id: 'art-02',
    titulo: 'Regra dos Potes e Divisão Orçamentária 50-30-20',
    tags: ['Orçamento', 'Consumo Consciente'],
    autor: 'Profª. Mariana Albuquerque',
    dataPublicacao: '2026-10-22',
    resumo: 'Um método prático e intuitivo para jovens dividirem mesadas ou primeiros salários sem passar aperto.',
    conteudo: `
### O Desafio de Organizar o Próprio Dinheiro
Muitos estudantes acreditam que orçamento é sinônimo de privação. Na verdade, ter um plano financeiro é a melhor ferramenta para conquistar liberdade e poder adquirir o que realmente importa.

### Como Funciona a Regra 50-30-20:
1. **50% — Necessidades Essenciais:** Despesas básicas como transporte escolar, alimentação essencial e materiais escolares obrigatórios.
2. **30% — Desejos Pessoais:** Lazer com amigos, cinema, jogos e itens de consumo pessoal.
3. **20% — Futuro e Metas:** Reserva de emergência, poupança para intercâmbio, cursos ou investimentos de longo prazo.

### Dica Olímpica
Fique atento às questões de interpretação orçamentária onde custos fixos vs variáveis são colocados em tabelas de receitas e despesas.
    `,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    recomendadosManuaisIds: ['art-01', 'art-03', 'art-05'],
    topicosRelacionadosIds: ['post-02']
  },
  {
    id: 'art-03',
    titulo: 'Risco, Retorno e Diversificação de Carteiras',
    tags: ['Investimentos', 'Mercado Financeiro'],
    autor: 'Prof. Ricardo Mendes',
    dataPublicacao: '2026-11-01',
    resumo: 'Por que não devemos colocar todos os ovos na mesma cesta e como equilibrar segurança e rentabilidade.',
    conteudo: `
### O Binômio Inseparável: Risco e Retorno
No mundo dos investimentos, não existe rentabilidade alta com risco zero. Qualquer oferta que prometa ganhos exorbitantes e garantidos é, quase invariavelmente, uma fraude financeira.

### O Princípio da Diversificação
A diversificação permite que ativos de diferentes naturezas (renda fixa pré-fixada, títulos atrelados ao IPCA e renda variável) compensem oscilações mútuas, reduzindo a volatilidade geral da sua carteira.

### Principais Riscos Avaliados:
- **Risco de Crédito:** O emissor do título não honrar o pagamento (calote).
- **Risco de Mercado:** Oscilações de preços e taxas de juros na economia.
- **Risco de Liquidez:** Dificuldade de converter o investimento em dinheiro vivo no momento necessário.
    `,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    recomendadosManuaisIds: ['art-01', 'art-04'],
    topicosRelacionadosIds: ['post-01']
  },
  {
    id: 'art-04',
    titulo: 'Tesouro Direto Descomplicado: Selic, Prefixado e IPCA+',
    tags: ['Investimentos', 'Mercado Financeiro'],
    autor: 'Prof. Carlos Silveira',
    dataPublicacao: '2026-11-05',
    resumo: 'Guia completo para entender como funcionam os títulos da dívida pública federal brasileira.',
    conteudo: `
### O que é o Tesouro Direto?
Criado em 2002 pela Secretaria do Tesouro Nacional em parceria com a B3, o Tesouro Direto é um programa que permite a pessoas físicas comprarem títulos públicos pela internet.

### As Três Principais Modalidades:
- **Tesouro Selic:** Rende a taxa básica de juros da economia. Ideal para reservas de emergência devido à baixa oscilação e alta liquidez.
- **Tesouro Prefixado:** Você sabe exatamente quanto vai receber no vencimento desde o dia da compra.
- **Tesouro IPCA+:** Garante uma taxa de juros real acima da inflação medida pelo IPCA, protegendo o poder de compra no longo prazo.
    `,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    recomendadosManuaisIds: ['art-01', 'art-03'],
    topicosRelacionadosIds: ['post-03']
  },
  {
    id: 'art-05',
    titulo: 'Segurança Digital: Protegendo suas Senhas e Evitando Golpes',
    tags: ['Segurança Digital', 'Consumo Consciente'],
    autor: 'Profª. Mariana Albuquerque',
    dataPublicacao: '2026-11-08',
    resumo: 'Como se prevenir de engenharia social, phishing e armadilhas que visam seu dinheiro e seus dados.',
    conteudo: `
### A Era dos Golpes Digitais
Com o crescimento das transações instantâneas (como o Pix) e das compras online, fraudadores desenvolveram técnicas sofisticadas de manipulação psicológica, conhecidas como engenharia social.

### Regras de Ouro da Segurança Financeira:
1. Jamais compartilhe senhas ou códigos de confirmação recebidos por SMS ou WhatsApp.
2. Desconfie de mensagens urgentes solicitando transferências para parentes ou amigos.
3. Ative a autenticação em dois fatores (2FA) em todos os seus aplicativos financeiros e e-mails.
4. Bancos nunca ligam pedindo para você realizar transações ou testes de segurança.
    `,
    videoUrl: null, // Test fallback UI when no video
    recomendadosManuaisIds: ['art-02'],
    topicosRelacionadosIds: []
  },
  {
    id: 'art-06',
    titulo: 'Inflação e Poder de Compra: Por que as Coisas Ficam mais Caras?',
    tags: ['Matemática Financeira', 'Mercado Financeiro'],
    autor: 'Prof. Ricardo Mendes',
    dataPublicacao: '2026-11-10',
    resumo: 'Entenda os índices de preços (IPCA e IGP-M) e o impacto silencioso da perda de valor da moeda.',
    conteudo: `
### O que é Inflação?
A inflação é o aumento generalizado e contínuo dos preços de bens e serviços em uma economia durante determinado período. Quando há inflação, cada unidade de moeda compra menos produtos.

### Causas da Inflação:
- Pressão de demanda (mais compradores do que produtos disponíveis).
- Choques de oferta (seca que encarece alimentos, crise energética).
- Emissão monetária descontrolada.
    `,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    recomendadosManuaisIds: ['art-01', 'art-04'],
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

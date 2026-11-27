# Guia do Projeto — Olympic Hub

Guia de referência rápida para desenvolvedores sobre a arquitetura, arquivos, fluxos e gerenciamento de dados da plataforma educacional **Olympic Hub** (experiência do Aluno).

---

## 1. Visão Geral

- **Stack:** React `19.3.1`, Vite `8.3.8`, React Router DOM, Tailwind CSS v4 (`@tailwindcss/vite`), Lucide React (`lucide-react`), `canvas-confetti`.
- **Arquitetura:** Separação em camadas **Pages (Containers) → Views (UI pura) → Components (Domínio/UI)**, com estado global em **Context API**, lógica reutilizável em **Hooks**, regras puras em **Utils** e acesso/persistência local isolados em **Services** (`localStorage` com fallback em memória).
- **Escopo Atual:** Aplicação inicia diretamente na experiência logada do Aluno (sem tela de login/cadastro), com suporte a Desktop (`1440px`), Mobile (`390px`) e alternância de tema Dark/Light.

---

## 2. Estrutura de Pastas

| Pasta / Raiz | Finalidade |
|---|---|
| `/` (raiz) | Configurações de build (`vite.config.js`), lint (`eslint.config.js`), dependências (`package.json`) e entrada HTML (`index.html`). |
| `src/` | Código-fonte principal (`main.jsx`, `App.jsx`, `index.css`, `App.css`). |
| `src/styles/` | Variáveis CSS de tema Dark/Light e animações (`tokens.css`). |
| `src/context/` | Estados globais compartilhados (`ThemeContext`, `StudentContext`, `NotificationContext`, `NavigationContext`). |
| `src/services/` | Camada de dados fictícios, regras de negócio e persistência via `storageService`. |
| `src/hooks/` | Hooks customizados para tema, notificações, filtros, busca, cronômetro e inatividade. |
| `src/utils/` | Funções puras de formatação, ordenação de trilhas, filtragem de artigos e validação. |
| `src/pages/` | Páginas de alto nível ligadas às rotas; conectam Contexts/Services/Hooks às Views. |
| `src/views/` | Componentes de apresentação que recebem dados e callbacks via `props`. |
| `src/components/ui/` | Componentes atômicos reutilizáveis (`Button`, `Modal`, `Toast`, `Badge`, `BentoCard`, `ProgressBar`, `Avatar`). |
| `src/components/layout/` | Casca da aplicação (`Sidebar`, `Topbar`, `BottomTabBar`, `MobileDrawer`, `NotificationDrawer`, `PageContainer`, `LogoutModal`, `InactivityModal`). |
| `src/components/{domínio}/` | Subcomponentes específicos de `home`, `sala`, `trilhas`, `artigos`, `simulado`, `minigames`, `forum` e `perfil`. |
| `src/assets/` | Assets estáticos do template inicial (`hero.png`, `react.svg`, `vite.svg` — sem uso ativo). |

---

## 3. Inventário de Arquivos e Responsabilidades

### 3.1. Raiz, Inicialização e Estilos

| Arquivo | Responsabilidade e Comunicação |
|---|---|
| `package.json` | Declara dependências e scripts (`dev`, `build`, `lint`, `preview`). |
| `vite.config.js` | Configura plugins React e Tailwind CSS v4. |
| `eslint.config.js` | Configura ESLint flat config (JS/JSX, React Hooks, React Refresh). |
| `index.html` | Carrega fontes (`Plus Jakarta Sans`, `Inter`) e monta `#root` (`pt-BR`). |
| `src/main.jsx` | Inicializa React em `StrictMode` renderizando `App.jsx` e `index.css`. |
| `src/App.jsx` | Encapsula os 4 Context Providers, `BrowserRouter`, 10 rotas (`/`, `/sala`, `/trilhas`, `/artigos`, `/artigos/:id`, `/simulado`, `/minigames`, `/forum`, `/perfil`, `*`), casca de layout e `useInactivityTimer`. |
| `src/index.css` | Importa Tailwind e `tokens.css`; define reset, scrollbar, `:focus-visible` e `prefers-reduced-motion`. |
| `src/styles/tokens.css` | Define tokens de cor para `[data-theme="dark"]` e `[data-theme="light"]` e `@keyframes shake`. |
| `src/App.css` | Folha auxiliar vazia (reservada). |

### 3.2. Contextos (`src/context/`) e Hooks (`src/hooks/`)

| Arquivo | Responsabilidade e comunicação |
|---|---|
| `ThemeContext.jsx` / `useTheme.js` | Controlam o tema da aplicação (escuro ou claro), atualizam o atributo `data-theme` no HTML e salvam a preferência do estudante por meio do `storageService`. Utilizados pela `Sidebar`, `MobileDrawer` e `PreferencesSection`. |
| `StudentContext.jsx` | Armazena os dados e o progresso do estudante, além de controlar ações como adicionar XP, registrar simulados, salvar artigos e questões, atualizar avatar e e-mail, gerenciar notificações por e-mail e excluir a conta. Também atualiza a posição do estudante no ranking por meio do `salaService`. |
| `NotificationContext.jsx` / `useNotification.js` | Gerenciam as notificações da aplicação, incluindo a lista de notificações, a quantidade de não lidas, a abertura do painel e as mensagens temporárias (Toast). Integram-se ao `notificacoesService`, `Topbar`, `NotificationDrawer` e `Toast`. |
| `NavigationContext.jsx` | Controla elementos da navegação, como o caminho da página atual (breadcrumbs), a exibição da barra lateral, a abertura do menu mobile e a janela de confirmação de logout. Utilizado pelo layout e pelas páginas da aplicação. |
| `useSimuladoTimer.js` | Controla o cronômetro dos simulados, atualizando o tempo restante e o tempo decorrido a cada segundo. Ativa um alerta quando faltam 5 minutos ou menos e executa `onTimeUp` quando o tempo acaba. Utilizado em `SimuladoPage`. |
| `useTrilhaFilter.js` | Gerencia os filtros da página de trilhas, permitindo filtrar pelo nível do estudante, pesquisar por título, selecionar múltiplas tags e ordenar os resultados. Utilizado em `TrilhasPage`. |
| `useArtigoSearch.js` | Gerencia a busca e os filtros dos artigos, permitindo pesquisar pelo título ao pressionar Enter, selecionar tags e ordenar os resultados em ordem alfabética (A-Z). Utilizado em `ArtigosPage`. |
| `useInactivityTimer.js` | Monitora a interação do estudante com a aplicação e executa `onTimeout` após 10 minutos de inatividade. Utilizado em `App.jsx`. |

### 3.3. Serviços (`src/services/`) e Utilitários (`src/utils/`)

| Arquivo | Responsabilidade e Comunicação |
|---|---|
| `storageService.js` | Abstrai `localStorage` com `try/catch` e fallback em `Map` em memória. Base de todos os serviços persistidos. |
| `alunoService.js` | Exporta `AVATAR_PRESETS` (10 opções) e CRUD local do perfil, XP, estatísticas e favoritos (`olympic_hub_aluno_profile`). |
| `salaService.js` | Armazena dados da turma, aulas e ranking (`olympic_hub_sala_data`). Exporta `computeRankingWithStudent` e `getStudentRankingPosition` para unificar XP/posição com `StudentContext`. |
| `trilhasService.js` | Gerencia trilhas por nível (`olympic_hub_trilhas_data`). `completeAtividade` conclui etapa, desbloqueia a próxima e retorna `trackXpAwarded` (`10 × total`) apenas na primeira conclusão em 100%. |
| `artigosService.js` | Base de artigos (`olympic_hub_artigos_data`), tags disponíveis e recomendações manuais (`getRecomendados`, até 5). |
| `simuladoService.js` | Banco de questões de 4 alternativas, sorteio aleatório por nível/assuntos (`generateSimulado`), salvamento automático (`saveAnswer`) e correção (`finishSimulado`, +10 XP/acerto). |
| `minigamesService.js` | Catálogo estático (`MINIGAMES_LIST`) dos 5 jogos com recompensa padrão de +5 XP. |
| `forumService.js` | Posts por `salaId` (`olympic_hub_forum_posts`), criação, edição, exclusão, comentários e respostas aninhadas em 1 nível. |
| `notificacoesService.js` | Lista permanente (`olympic_hub_notificacoes_data`), leitura individual/em lote e exclusão. |
| `formatters.js` | `formatXP`, `formatSecondsToMinutes`, `formatDate`, `formatRelativeTime`, `formatPercentage`. |
| `sortTrilhas.js` | Ordena trilhas: iniciadas (maior % → menor %) → não iniciadas (0%, A-Z) → concluídas (100%, A-Z). |
| `filterArtigos.js` | Filtra por título (case-insensitive) + tags e ordena A-Z fixo. |
| `validators.js` | Limites do fórum (`300` título, `1000` corpo/comentário), `isValidEmail` e `sanitizeCharLimit`. |

### 3.4. Componentes Base (`src/components/ui/` e `src/components/layout/`)

**`ui/`**

- `Button` (variantes de ação).
- `Badge` (tags semânticas).
- `BentoCard` (containers `surface`, `elevated`, `brand`, `completed`).
- `Modal` (diálogo com `Escape` e clique fora).
- `Toast` (alertas flutuantes via `NotificationContext`).
- `ProgressBar` (barra percentual).
- `Avatar` (renderiza preset por `avatarId`).

**`layout/`**

- `Sidebar` (desktop retrátil `240px`/`80px`, tema e sair).
- `Topbar` (breadcrumbs desktop/mobile, nível, pílula XP, sino e avatar).
- `BottomTabBar` (navegação mobile + "Mais").
- `MobileDrawer` (menu gaveta mobile).
- `NotificationDrawer` (lista com leitura automática e redirecionamento).
- `LogoutModal`.
- `InactivityModal`.
- `PageContainer` (margens responsivas).

### 3.5. Páginas, Views e Componentes de Domínio

| Módulo | Arquivos (`pages/` → `views/` → `components/`) | Responsabilidades Principais |
|---|---|---|
| **Home** | `HomePage` → `HomeView` → `OlympicBanner`, `GeneralTrailCard`, `PerformanceCard`, `ContinueSessions`, `HomeTabs` | Boas-vindas com série, banner OBEF, destaque da Trilha Geral (abre overlay em `/trilhas`), 6 métricas de desempenho, 3 cards de retomada e abas inferiores (Achievements, Questões salvas, Artigos salvos, Histórico de trilhas). |
| **Sala** | `SalaPage` → `SalaView` → `SalaHeader`, `ClassroomRanking`, `LessonsList`, `LessonDetailModal` | Cabeçalho com botão para o Fórum, aulas ordenadas da mais recente para a mais antiga com etapas sequenciais e Ranking Top 5 sem avatares sincronizado com `StudentContext.xp`. |
| **Trilhas** | `TrilhasPage` → `TrilhasView` → `TrailFilterBar`, `TrailGrid`, `TrailCard`, `TrailOverlay`, `TrailActivityItem` | Filtro por nível, busca por título, tags múltiplas, card verde a 100%, overlay com botão "Continuar de onde parou" exclusivo internamente, bloqueio com `shake` + toast e propagação de contexto para atividades. |
| **Artigos** | `ArtigosPage` → `ArtigosView` → `ArtigoSearch`, `ArtigoFilters`, `ArtigoCard`, `ArtigoPagination` | Busca no `Enter` sem autocomplete, filtro dropdown, paginação (6/página), ordenação A-Z e estrela de favoritos (sem tempo de leitura no card). |
| **Leitura** | `ArtigoLeituraPage` → `ArtigoLeituraView` → `RelatedArticles`, `ForumTopicsSection`, `NewTopicFromArticleModal` | Leitura responsiva com embed de vídeo e fallback, favoritar, até 5 recomendações manuais, tópicos relacionados com "Abrir tópico" e botão de conclusão quando acessado via trilha. |
| **Simulado** | `SimuladoPage` → `SimuladoView` → `SimuladoConfig`, `SimuladoQuestion`, `SimuladoTimer`, `SimuladoNav`, `SimuladoConfirmModal`, `SimuladoResult`, `SimuladoReview` | Configura assuntos, qtd (`1, 5, 10, 15, 20`) e tempo (`5 min/q`); executa 1 questão/página com salvamento automático, favoritar, confirmação "Tem certeza?", resultado (XP + proporção), revisão e retorno à trilha quando aplicável. |
| **Minigames** | `MinigamesPage` → `MinigamesView` → `PalavrasCruzadas`, `CacaPalavras`, `Conexo`, `CrossSums`, `GerenteBanco` | Catálogo livre sem bloqueio/agrupamento e sem ranking lateral; cada vitória credita +5 XP e conclui etapa da trilha quando iniciado a partir dela. |
| **Fórum** | `ForumPage` → `ForumView` → `ForumPostCard`, `ForumNewPostModal`, `ForumPostDetailModal`, `ForumCommentItem` | Fórum por sala com busca/filtros, criação/edição/exclusão pelo autor (limites 300/1000), comentários com tags `Autor`, `Prof(a).`, `Fixado` e 1 nível de resposta aninhada. |
| **Perfil** | `PerfilPage` → `PerfilView` → `ProfileInfo`, `AvatarPickerModal`, `EmailEditModal`, `PasswordResetModal`, `PreferencesSection`, `DeleteAccountModal` | Dados escolares bloqueados, escolha entre 10 avatares, edição exclusiva de e-mail, fluxo de redefinição de senha, tema Claro/Escuro, toggle de notificações por e-mail e exclusão de conta. |
| **404** | `NotFoundPage` | Tela de rota não encontrada com botão de retorno à Home. |

---

## 4. Fluxos Principais

### 4.1. Home → Trilha → Atividade → Conclusão → Retorno ao Overlay

1. `HomePage` / `GeneralTrailCard` define `activeOverlayTrilhaId` em `StudentContext` e navega para `/trilhas`.
2. `TrilhasPage` abre `TrailOverlay` automaticamente. Ao clicar em etapa liberada/concluída, `TrailOverlay` navega para `/artigos/:id`, `/simulado` ou `/minigames` passando `state: { fromTrilhaId, atividadeId, initialGameId }`.
3. Ao concluir a leitura (`ArtigoLeituraPage`), finalizar o simulado (`SimuladoPage`) ou vencer o minigame (`MinigamesPage`), a página chama `trilhasService.completeAtividade(fromTrilhaId, atividadeId)`. Se a trilha atingir 100% pela primeira vez, credita `10 × total` XP via `StudentContext.addXP`.
4. Ao retornar à trilha, a página seta `activeOverlayTrilhaId` e navega para `/trilhas`, reabrindo o overlay atualizado.

### 4.2. Simulado Avulso e Atualização de Métricas

- `SimuladoConfig` envia configuração → `SimuladoPage` chama `simuladoService.generateSimulado` → `SimuladoQuestion` salva cada seleção via `simuladoService.saveAnswer` → `SimuladoConfirmModal` confirma envio → `simuladoService.finishSimulado` calcula acertos e XP (`+10/acerto`) → `StudentContext.recordSimulado` atualiza XP, contadores e `posicaoRanking`.

### 4.3. Notificações e Redirecionamento

- `Topbar` exibe `unreadCount` de `NotificationContext` e abre `NotificationDrawer`.
- Clicar em um item chama `markAsRead(id)`, fecha o drawer, define `activeOverlayTrilhaId` se houver `overlayTrilhaId` e navega para `linkDestino.rota`.

---

## 5. Gerenciamento de Dados

- **Persistência:** Todos os dados alteráveis em runtime são salvos em `localStorage` via `storageService` sob chaves `olympic_hub_*` (`aluno_profile`, `sala_data`, `trilhas_data`, `artigos_data`, `questoes_bank`, `simulado_active`, `simulado_history`, `forum_posts`, `notificacoes_data`, `theme`).
- **Estado Compartilhado:** `StudentContext` é a fonte de verdade para perfil, XP, posição no ranking, favoritos e `activeOverlayTrilhaId`. Ao alterar XP (`addXP` ou `recordSimulado`), o contexto recalcula `posicaoRanking` consultando `salaService.getStudentRankingPosition`, mantendo `Topbar`, `Home`, `Sala` e `Perfil` alinhados.
- **Estado Local:** Filtros de tela, paginação, estágios de simulado, estado de partidas dos minigames e abertura de modais residem localmente nas respectivas Pages/Components.

---
## 6. Organização da Estilização

A estilização combina **\*\*Tailwind CSS v4\*\*** com **\*\*CSS Variables (Design Tokens)\*\*** para suportar Dark Mode e Light Mode de forma centralizada:

\| Camada / Arquivo | Papel na Estilização |
\|---|---|
\| \`vite.config.js\` | Integra o plugin \`@tailwindcss/vite\` ao pipeline de build. |
\| \`index.html\` | Carrega as fontes do Google Fonts (\`Plus Jakarta Sans\` e \`Inter\`). |
\| \`src/index.css\` | Ponto de entrada CSS (\`@import "tailwindcss";\` e \`@import "./styles/tokens.css";\`), reset base, tipografia padrão (\`Inter\` no corpo, \`Plus Jakarta Sans\` em \`h1–h6\` e \`.font-heading\`), scrollbar customizada, foco acessível (\`:focus-visible\`) e suporte a \`prefers-reduced-motion\`. |
\| \`src/styles/tokens.css\` | Define os tokens semânticos em \`:root\` / \`[data-theme="dark"]\` (base \`#160C33\`, superfície \`#21124A\`) e \`[data-theme="light"]\` (base \`#F4F1FA\`, superfície \`#FFFFFF\`), além da animação \`.animate-shake\` (\`@keyframes shake\`). |
\| \`src/context/ThemeContext.jsx\` | Alterna \`data-theme\` no \`\<html>\` (\`document.documentElement\`), atualizando toda a paleta via CSS Variables em tempo real. |
\| \`src/App.css\` | Mantido vazio (apenas comentário), sem estilos globais concorrentes. |
\| Componentes \`.jsx\` | Utilizam classes utilitárias do Tailwind conectadas aos tokens (ex.: \`bg-[var(--bg-surface)]\`, \`border-[var(--border-surface)]\`, \`text-[var(--text-primary)]\`). Estilos \`style={{ ... }}\` ficam restritos a valores dinâmicos em runtime (\`width\` em \`ProgressBar.jsx\` e \`backgroundColor\` em \`Avatar.jsx\`). |

**---**

## 7. Pontos Importantes para Manutenção

- **Ranking da Sala sem avatares:** `ClassroomRanking` não deve renderizar avatares e deve manter exatamente 5 linhas de Top 5 (com espaços vagos se `< 5`) + linha extra apenas quando `posicao > 5`.
- **Botão de continuidade de trilha:** Deve permanecer exclusivamente dentro do `TrailOverlay` (nunca nos cards do `TrailGrid`).
- **Ordenação estrita de Trilhas e Artigos:** `sortTrilhas` não usa divisões físicas de seção no grid; `filterArtigos` ordena sempre de A-Z e a busca em `ArtigoSearch` dispara exclusivamente no `Enter` (sem autocomplete).
- **Simulado:** Quantidades permitidas são restritas a `(1, 5, 10, 15, 20)` e não há seletor manual de dificuldade (determinada pelo nível da sala).
- **Regras de Tema (Light/Dark):** Sempre usar variáveis CSS de `tokens.css` (`--text-primary`, `--accent-gold`, `--accent-emerald-bg`) em vez de cores hardcoded para preservar contraste no Light Mode.
- **Dependência entre `StudentContext` e `salaService`:** Alterações na estrutura de `ranking` em `salaService.js` impactam `computeRankingWithStudent` e `getStudentRankingPosition` consumidos pelo `StudentContext`.
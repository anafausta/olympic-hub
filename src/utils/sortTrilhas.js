/**
 * Implementation of strict trail sorting (RF74):
 * 1º Trilhas iniciadas (em andamento, 1% a 99%): Ordenadas de forma decrescente pelo percentual (% maior -> menor).
 * 2º Trilhas não iniciadas (0%): Logo abaixo das iniciadas, ordenadas alfabeticamente pelo nome (A-Z).
 * 3º Trilhas concluídas (100%): Dispostas no final do grid, ordenadas alfabeticamente pelo nome (A-Z).
 * Sem divisões físicas de sessões no grid.
 */

export const sortTrilhas = (trilhas = []) => {
  const inProgress = [];
  const notStarted = [];
  const completed = [];

  trilhas.forEach((trilha) => {
    const progress = trilha.percentualConclusao ?? 0;
    if (progress >= 100) {
      completed.push(trilha);
    } else if (progress > 0) {
      inProgress.push(trilha);
    } else {
      notStarted.push(trilha);
    }
  });

  // 1º In progress: higher percentage first
  inProgress.sort((a, b) => (b.percentualConclusao ?? 0) - (a.percentualConclusao ?? 0));

  // 2º Not started: A-Z by name
  notStarted.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));

  // 3º Completed: A-Z by name
  completed.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));

  return [...inProgress, ...notStarted, ...completed];
};

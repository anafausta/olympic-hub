/**
 * Implementation of Article search and filtering rules:
 * - RF95: Fixed alphabetical order (A-Z) by title.
 * - RF99: Case-insensitive search strictly on title.
 * - RF101 & RF102: Dropdown filters by tag with "Nenhum filtro" option.
 *   Lógica OU inclusivo dentro de um mesmo grupo de filtros, e E (AND) entre grupos distintos.
 * - RF103: Combined title search and tag filters.
 */

export const filterArtigos = ({
  artigos = [],
  searchQuery = '',
  selectedTags = [], // array of selected tag strings
}) => {
  let filtered = [...artigos];

  // 1. Text search by title (case-insensitive, RF99)
  const normalizedQuery = searchQuery.trim().toLowerCase();
  if (normalizedQuery) {
    filtered = filtered.filter((artigo) =>
      artigo.titulo.toLowerCase().includes(normalizedQuery)
    );
  }

  // 2. Tag filters (RF101, RF102)
  // If selectedTags has items and doesn't contain 'all' / 'Nenhum filtro'
  const activeTags = selectedTags.filter((tag) => tag && tag !== 'all' && tag !== 'Nenhum filtro');

  if (activeTags.length > 0) {
    // When multiple tags are selected, matches any of the selected tags (inclusivo OU)
    filtered = filtered.filter((artigo) => {
      const itemTags = artigo.tags || [];
      return activeTags.some((tag) => itemTags.includes(tag));
    });
  }

  // 3. RF95: Strict alphabetical sorting by title (A-Z)
  filtered.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));

  return filtered;
};

import { PageContainer } from '../components/layout/PageContainer';
import { ArtigoCard } from '../components/artigos/ArtigoCard';
import { ArtigoSearch } from '../components/artigos/ArtigoSearch';
import { ArtigoFilters } from '../components/artigos/ArtigoFilters';
import { ArtigoPagination } from '../components/artigos/ArtigoPagination';
import { BookOpen, SearchX } from '../components/ui/SolarIcon';

export const ArtigosView = ({
  searchInput,
  setSearchInput,
  appliedSearchQuery,
  handleKeyDown,
  clearSearch,
  availableTags,
  selectedTags,
  handleSelectTag,
  clearAll,
  paginatedArtigos,
  totalCount,
  hasFilters,
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  return (
    <PageContainer>
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Biblioteca & Base de Conhecimento</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-[var(--text-primary)] tracking-tight">
            Artigos e Guias de Estudo
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Listagem oficial em ordem alfabética
          </p>
        </div>
      </div>

      {/* Search Input (RF99: Enter only, case-insensitive, no autocomplete) */}
      <ArtigoSearch
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleKeyDown={handleKeyDown}
        appliedSearchQuery={appliedSearchQuery}
        clearSearch={clearSearch}
      />

      {/* Filters Dropdown & Results Counter (RF101, RF102, RF104) */}
      <ArtigoFilters
        availableTags={availableTags}
        selectedTags={selectedTags}
        handleSelectTag={handleSelectTag}
        clearAll={clearAll}
        totalCount={totalCount}
        hasFilters={hasFilters}
      />

      {/* Articles Grid or Empty State (RF104) */}
      {paginatedArtigos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-surface)] text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)]">
            <SearchX className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
              Não há nada nesse filtro
            </h4>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm">
              Nenhum artigo corresponde à busca realizada ou aos assuntos selecionados.
            </p>
          </div>
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-[var(--brand-primary)] hover:underline pt-2 cursor-pointer"
          >
            Limpar todos os filtros e ver todos os artigos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedArtigos.map((artigo) => (
            <ArtigoCard key={artigo.id} artigo={artigo} />
          ))}
        </div>
      )}

      {/* Pagination (RF98) */}
      <ArtigoPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
};

import { PageContainer } from '../components/layout/PageContainer';
import { TrailFilterBar } from '../components/trilhas/TrailFilterBar';
import { TrailGrid } from '../components/trilhas/TrailGrid';
import { TrailOverlay } from '../components/trilhas/TrailOverlay';
import { Compass } from 'lucide-react';

export const TrilhasView = ({
  studentLevel,
  searchTerm,
  setSearchTerm,
  availableTags,
  selectedTags,
  toggleTag,
  clearFilters,
  filteredAndSortedTrilhas,
  isEmpty,
  hasActiveFilters,
  selectedTrilha,
  isOverlayOpen,
  onOpenOverlay,
  onCloseOverlay
}) => {
  return (
    <PageContainer>
      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Trilhas de Aprendizagem Olímpica</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-[var(--text-primary)] tracking-tight">
            Trilhas do Nível {studentLevel}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Conteúdos ordenados por progressão: Em andamento → Não iniciadas → Concluídas.
          </p>
        </div>

        <div className="text-xs text-[var(--text-muted)] self-start md:self-end">
          {filteredAndSortedTrilhas.length} {filteredAndSortedTrilhas.length === 1 ? 'trilha disponível' : 'trilhas disponíveis'}
        </div>
      </div>

      {/* Filter and Search Bar (RF75, RF76) */}
      <TrailFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        availableTags={availableTags}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Continuous Grid without physical section headers (RF74, RF77) */}
      <TrailGrid
        trilhas={filteredAndSortedTrilhas}
        onOpenOverlay={onOpenOverlay}
        isEmpty={isEmpty}
      />

      {/* Progressive Overlay with exclusive Continue button (RF09 - RF15, RF78) */}
      <TrailOverlay
        trilha={selectedTrilha}
        isOpen={isOverlayOpen}
        onClose={onCloseOverlay}
      />
    </PageContainer>
  );
};

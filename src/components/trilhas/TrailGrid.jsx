import { TrailCard } from './TrailCard';
import { SearchX } from '../ui/SolarIcon';

export const TrailGrid = ({ trilhas = [], onOpenOverlay, isEmpty }) => {
  // RF77: Empty state
  if (isEmpty || trilhas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-surface)] text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)]">
          <SearchX className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
            Não encontramos nenhuma trilha correspondente
          </h4>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm">
            Tente buscar por outro termo ou desmarcar os filtros de assunto selecionados.
          </p>
        </div>
      </div>
    );
  }

  // RF74: Single continuous grid without physical section headers!
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {trilhas.map((trilha) => (
        <TrailCard
          key={trilha.id}
          trilha={trilha}
          onOpenOverlay={onOpenOverlay}
        />
      ))}
    </div>
  );
};

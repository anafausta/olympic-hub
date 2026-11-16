import { Search, X, Filter } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const TrailFilterBar = ({
  searchTerm,
  setSearchTerm,
  availableTags = [],
  selectedTags = [],
  toggleTag,
  clearFilters,
  hasActiveFilters
}) => {
  return (
    <div className="space-y-3 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-surface)]">
      {/* Title Search Input (RF75) */}
      <div className="relative">
        <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar trilha pelo título (ex: Orçamento, Renda Fixa)..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Multiple Tag Filters (RF76) */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Assuntos:</span>
        </div>

        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              color={isSelected ? 'cyan' : 'secondary'}
              size="sm"
              onClick={() => toggleTag(tag)}
              className="cursor-pointer"
            >
              {tag}
            </Badge>
          );
        })}

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-[var(--accent-coral)] hover:underline ml-auto flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
};

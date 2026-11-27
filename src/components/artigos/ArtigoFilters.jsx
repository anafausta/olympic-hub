import { Filter, X } from '../ui/SolarIcon';
import { Badge } from '../ui/Badge';

export const ArtigoFilters = ({
  availableTags = [],
  selectedTags = [],
  handleSelectTag,
  clearAll,
  totalCount,
  hasFilters
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-surface)]">
      {/* Dropdown / Tag selector (RF101, RF102) */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
          <Filter className="w-3.5 h-3.5" />
          <span>Filtro de Assunto:</span>
        </div>

        {/* Dropdown Select (RF101) */}
        <select
          onChange={(e) => handleSelectTag(e.target.value)}
          value={selectedTags[selectedTags.length - 1] || 'all'}
          className="px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)] cursor-pointer"
        >
          <option value="all">Nenhum filtro (Todos os assuntos)</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Active Selected Tags Pills */}
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            color="cyan"
            size="sm"
            onClick={() => handleSelectTag(tag)}
            className="cursor-pointer gap-1"
          >
            <span>{tag}</span>
            <X className="w-3 h-3 hover:text-white" />
          </Badge>
        ))}

        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-[var(--accent-coral)] hover:underline ml-1 cursor-pointer"
          >
            Limpar todos
          </button>
        )}
      </div>

      {/* Results Count (RF104) */}
      <div className="text-xs text-[var(--text-secondary)] font-medium">
        Total: <strong className="text-[var(--text-primary)]">{totalCount}</strong>{' '}
        {totalCount === 1 ? 'artigo encontrado' : 'artigos encontrados'}
      </div>
    </div>
  );
};

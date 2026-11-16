import { Search, CornerDownLeft, X } from 'lucide-react';

export const ArtigoSearch = ({
  searchInput,
  setSearchInput,
  handleKeyDown,
  appliedSearchQuery,
  clearSearch
}) => {
  return (
    <div className="relative w-full">
      <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar pelo título e pressione Enter..."
        autoComplete="off"
        spellCheck="false"
        className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        {searchInput && (
          <button
            onClick={clearSearch}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            title="Limpar texto"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-card-hover)] border border-[var(--border-surface)] rounded">
          <CornerDownLeft className="w-2.5 h-2.5" /> Enter
        </kbd>
      </div>
    </div>
  );
};

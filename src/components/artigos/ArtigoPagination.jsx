import { ChevronLeft, ChevronRight } from '../ui/SolarIcon';
import { Button } from '../ui/Button';

export const ArtigoPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="cursor-pointer"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <span className="text-xs text-[var(--text-secondary)] px-3">
        Página <strong className="text-[var(--text-primary)]">{currentPage}</strong> de{' '}
        <strong className="text-[var(--text-primary)]">{totalPages}</strong>
      </span>

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="cursor-pointer"
        aria-label="Próxima página"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

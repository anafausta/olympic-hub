import { useNavigate } from 'react-router-dom';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { Star, ArrowRight } from '../ui/SolarIcon';
import { useStudent } from '../../context/StudentContext';

export const ArtigoCard = ({ artigo }) => {
  const navigate = useNavigate();
  const { student, toggleSavedArticle } = useStudent();

  const isSaved = (student?.artigosSalvosIds || []).includes(artigo.id);

  const handleToggleStar = (e) => {
    e.stopPropagation();
    toggleSavedArticle(artigo.id);
  };

  // RF94: For very long titles, automatically scale text down
  const isVeryLongTitle = artigo.titulo.length > 55;

  return (
    <BentoCard
      variant="surface"
      hoverable
      onClick={() => navigate(`/artigos/${artigo.id}`)}
      className="cursor-pointer group flex flex-col justify-between h-full space-y-4"
    >
      <div className="space-y-3">
        {/* Header: Tags + Star Favorite (RF94, RF107) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {artigo.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} color="lilac" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Star Icon (Yellow for saved, Gray for unsaved - RF107) */}
          <button
            onClick={handleToggleStar}
            className={`p-1.5 rounded-lg transition-transform hover:scale-125 cursor-pointer ${
              isSaved
                ? 'text-[#F9CA20]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            title={isSaved ? 'Remover dos favoritos' : 'Salvar artigo'}
            aria-label={isSaved ? 'Remover dos favoritos' : 'Salvar artigo'}
          >
            <Star
              className={`w-5 h-5 ${isSaved ? 'fill-[#F9CA20]' : 'stroke-current'}`}
            />
          </button>
        </div>

        {/* Title with automatic font reduction if long (RF94) */}
        {/* NO reading time on card per RF94! */}
        <h4
          className={`font-heading font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-3 leading-snug ${
            isVeryLongTitle ? 'text-sm md:text-base' : 'text-base md:text-lg'
          }`}
        >
          {artigo.titulo}
        </h4>

        {artigo.resumo && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {artigo.resumo}
          </p>
        )}
      </div>

      {/* Footer link to read (RF96) */}
      <div className="pt-2 border-t border-[var(--border-surface)]/60 flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>Por {artigo.autor || 'Equipe Olímpica'}</span>
        <span className="flex items-center gap-1 text-[var(--brand-primary)] font-semibold group-hover:translate-x-1 transition-transform">
          Ler artigo <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </BentoCard>
  );
};

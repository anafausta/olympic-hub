import { useNavigate } from 'react-router-dom';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { BookOpen, ArrowRight } from '../ui/SolarIcon';

export const RelatedArticles = ({ recomendados = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pt-4 border-t border-[var(--border-surface)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[var(--accent-cyan)]" />
          <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
            Ver Mais — Conteúdos Recomendados
          </h3>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          Curadoria Pedagógica Humana
        </span>
      </div>

      {/* RF25: Se vazia, exibir mensagem informando que não há conteúdos */}
      {recomendados.length === 0 ? (
        <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-center text-xs text-[var(--text-muted)]">
          Não há conteúdos recomendados disponíveis para este artigo no momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recomendados.slice(0, 5).map((item) => (
            <BentoCard
              key={item.id}
              variant="surface"
              hoverable
              onClick={() => navigate(`/artigos/${item.id}`)}
              className="cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <Badge color="lilac" size="sm">
                  {item.tags?.[0] || 'Finanças'}
                </Badge>
                <h5 className="font-heading font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                  {item.titulo}
                </h5>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[var(--brand-primary)] font-semibold pt-1">
                <span>Continuar leitura</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </BentoCard>
          ))}
        </div>
      )}
    </div>
  );
};

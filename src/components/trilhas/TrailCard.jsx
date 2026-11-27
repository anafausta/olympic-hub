import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import {
  Compass,
  CheckCircle2,
  PieChart,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Layers
} from '../ui/SolarIcon';

export const TrailCard = ({ trilha, onOpenOverlay }) => {
  const progress = trilha.percentualConclusao ?? 0;
  const isCompleted = progress >= 100;

  const getThemeIcon = () => {
    const title = trilha.titulo.toLowerCase();
    if (trilha.isGeral) return <Compass className="w-6 h-6 text-[#F9CA20]" />;
    if (title.includes('orçamento')) return <PieChart className="w-6 h-6 text-[var(--accent-cyan)]" />;
    if (title.includes('matemática') || title.includes('juros')) return <Calculator className="w-6 h-6 text-[var(--accent-lilac)]" />;
    if (title.includes('segurança')) return <ShieldCheck className="w-6 h-6 text-[var(--accent-coral)]" />;
    if (title.includes('mercado') || title.includes('renda')) return <TrendingUp className="w-6 h-6 text-[#10B981]" />;
    return <Layers className="w-6 h-6 text-[var(--accent-peach)]" />;
  };

  return (
    <BentoCard
      variant={isCompleted ? 'completed' : 'surface'}
      hoverable
      onClick={() => onOpenOverlay(trilha)}
      className="cursor-pointer group flex flex-col justify-between h-full space-y-4"
    >
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              {getThemeIcon()}
            </div>
            {trilha.isGeral && (
              <Badge color="gold" size="sm">
                Trilha Geral
              </Badge>
            )}
          </div>

          {/* Status indication */}
          {isCompleted ? (
            <Badge color="emerald" size="sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> Concluída (100%)
            </Badge>
          ) : progress > 0 ? (
            <span className="text-xs font-bold text-[var(--accent-gold)]">
              {progress}% concluído
            </span>
          ) : (
            <span className="text-xs text-[var(--text-muted)] font-medium">
              Não iniciada
            </span>
          )}
        </div>

        {/* Trail Name (RF73) */}
        <h4 className="text-base md:text-lg font-heading font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
          {trilha.titulo}
        </h4>

        {/* Subject Tags (RF73) */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {trilha.tags?.map((tag) => (
            <Badge key={tag} color="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Numerical percentage & progress bar (RF73) */}
      <div className="pt-2 border-t border-[var(--border-surface)]/60 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>{trilha.atividades?.length || 0} atividades</span>
          <span className="font-bold text-[var(--text-primary)]">{progress}%</span>
        </div>
        <ProgressBar
          value={progress}
          color={isCompleted ? 'emerald' : 'brand'}
          height="h-2"
        />
      </div>
    </BentoCard>
  );
};

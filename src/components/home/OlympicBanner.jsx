import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Calendar, ExternalLink, Trophy, Sparkles } from 'lucide-react';

export const OlympicBanner = () => {
  return (
    <BentoCard variant="surface" className="border-l-4 border-l-[#F9CA20]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#F9CA20]/15 flex items-center justify-center flex-shrink-0 text-[#F9CA20] border border-[#F9CA20]/30 shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F9CA20] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Olimpíada Oficial
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-surface)]">
                OLITEF 2027
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-heading font-black text-[var(--text-primary)]">
              Olimpíada Brasileira de Educação Financeira
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F9CA20]" />
              Data oficial da prova da 1ª Fase:{' '}
              <strong className="text-[var(--text-primary)]">08 de Setembro de 2027</strong>
            </p>
          </div>
        </div>

        <a
          href="https://www.olitef.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto"
        >
          <Button variant="outline" size="sm" fullWidth className="gap-2">
            <span>Portal Oficial da OLITEF</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </BentoCard>
  );
};

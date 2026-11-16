import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { formatXP } from '../../utils/formatters';
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  BookOpenCheck
} from 'lucide-react';

export const SimuladoResult = ({
  resultado,
  onReview,
  onNewSimulado,
  fromTrilha = false,
  onReturnToTrilha
}) => {
  useEffect(() => {
    if (resultado && resultado.acertos > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn('Confetti error', err);
      }
    }
  }, [resultado]);

  if (!resultado) return null;

  const isGreatScore = resultado.taxaAcertoPercent >= 70;

  return (
    <BentoCard variant="surface" className="max-w-2xl mx-auto space-y-6 text-center">
      {/* Icon & Title */}
      <div className="flex flex-col items-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#7800D6] to-[#F9CA20] flex items-center justify-center text-white shadow-xl shadow-[#7800D6]/20">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-heading font-black text-[var(--text-primary)]">
            {isGreatScore ? 'Excelente Desempenho! 🎉' : 'Simulado Concluído! 📚'}
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)]">
            Seus pontos foram creditados diretamente na sua pontuação geral.
          </p>
        </div>
      </div>

      {/* RF61: Duas formas de resultado (XP ganho + Proporção de acertos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Forma 1: XP Ganho */}
        <div className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--accent-gold)]/40 flex flex-col items-center justify-center space-y-1 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Pontos Conquistados (XP)</span>
          </div>
          <div className="text-3xl font-heading font-black text-[var(--accent-gold)]">
            +{formatXP(resultado.xpGanho)}
          </div>
          <span className="text-[11px] text-[var(--text-muted)]">
            +10 XP por cada questão acertada
          </span>
        </div>

        {/* Forma 2: Proporção de Acertos */}
        <div className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[#10B981]/40 flex flex-col items-center justify-center space-y-1 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#10B981] uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Proporção de Acertos</span>
          </div>
          <div className="text-3xl font-heading font-black text-[#10B981]">
            {resultado.proporcaoFormatada}
          </div>
          <span className="text-[11px] text-[var(--text-muted)]">
            {resultado.taxaAcertoPercent}% de aproveitamento
          </span>
        </div>
      </div>

      {/* Progress Bar of Score */}
      <div className="space-y-1.5 max-w-md mx-auto pt-2">
        <div className="flex justify-between text-xs text-[var(--text-secondary)]">
          <span>Aproveitamento geral</span>
          <span className="font-bold text-[var(--text-primary)]">
            {resultado.taxaAcertoPercent}%
          </span>
        </div>
        <ProgressBar
          value={resultado.taxaAcertoPercent}
          color={isGreatScore ? 'emerald' : 'gold'}
          height="h-3"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[var(--border-surface)]">
        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={onReview}
          className="gap-2 cursor-pointer"
        >
          <BookOpenCheck className="w-4 h-4 text-[var(--brand-primary)]" />
          <span>Revisar Gabarito e Explicações</span>
        </Button>

        {fromTrilha ? (
          <Button
            variant="emerald"
            size="md"
            fullWidth
            onClick={onReturnToTrilha}
            className="gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Voltar para a Trilha</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onNewSimulado}
            className="gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Novo Simulado</span>
          </Button>
        )}
      </div>
    </BentoCard>
  );
};

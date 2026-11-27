import { Clock, AlertTriangle } from '../ui/SolarIcon';
import { formatSecondsToMinutes } from '../../utils/formatters';

export const SimuladoTimer = ({ remainingSeconds, isWarning, comTempo }) => {
  if (!comTempo) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs text-[var(--text-secondary)]">
        <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        <span>Sem cronômetro</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm transition-colors ${
        isWarning
          ? 'bg-[#FF4949]/20 border-[#FF4949] text-[#FF4949] animate-pulse'
          : 'bg-[var(--bg-elevated)] border-[var(--border-surface)] text-[var(--text-primary)]'
      }`}
      title={isWarning ? 'Atenção: Menos de 5 minutos restantes!' : 'Tempo restante'}
    >
      {isWarning ? (
        <AlertTriangle className="w-4 h-4 text-[#FF4949]" />
      ) : (
        <Clock className="w-4 h-4 text-[var(--accent-cyan)]" />
      )}
      <span>{formatSecondsToMinutes(remainingSeconds)}</span>
    </div>
  );
};

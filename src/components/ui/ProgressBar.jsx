export const ProgressBar = ({
  value = 0,
  max = 100,
  color = 'gold', // 'gold' | 'emerald' | 'cyan' | 'brand'
  height = 'h-2.5',
  showLabel = false,
  className = ''
}) => {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorClasses = {
    gold: 'bg-[#F9CA20]',
    emerald: 'bg-[#10B981]',
    cyan: 'bg-[#38BDF8]',
    brand: 'bg-gradient-to-r from-[#7800D6] to-[#38BDF8]'
  }[color] || 'bg-[#F9CA20]';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-1">
          <span>Progresso</span>
          <span className="font-semibold text-[var(--text-primary)]">{percent}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-[var(--bg-elevated)] overflow-hidden border border-[var(--border-surface)]/50`}>
        <div
          className={`h-full ${colorClasses} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

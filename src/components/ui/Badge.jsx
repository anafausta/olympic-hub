export const Badge = ({
  children,
  color = 'cyan', // 'cyan' | 'gold' | 'emerald' | 'coral' | 'lilac' | 'peach' | 'secondary'
  size = 'md', // 'sm' | 'md'
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium'
  }[size] || 'text-xs px-2.5 py-1 font-medium';

  const colorClasses = {
    cyan: 'bg-[var(--accent-cyan-bg)] text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30',
    gold: 'bg-[var(--accent-gold-bg)] text-[var(--accent-gold)] border border-[var(--accent-gold)]/30 font-semibold',
    emerald: 'bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30 font-medium',
    coral: 'bg-[var(--accent-coral-bg)] text-[var(--accent-coral)] border border-[var(--accent-coral)]/30',
    lilac: 'bg-[var(--accent-lilac-bg)] text-[var(--accent-lilac)] border border-[var(--accent-lilac)]/30',
    peach: 'bg-[var(--accent-peach-bg)] text-[var(--accent-peach)] border border-[var(--accent-peach)]/30',
    secondary: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-surface)]'
  }[color] || 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]';

  const interactive = onClick ? 'cursor-pointer hover:brightness-110 active:scale-95' : '';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full select-none transition-all ${sizeClasses} ${colorClasses} ${interactive} ${className}`}
    >
      {children}
    </span>
  );
};

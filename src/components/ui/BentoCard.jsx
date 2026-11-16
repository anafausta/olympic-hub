export const BentoCard = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  variant = 'surface', // 'surface' | 'elevated' | 'brand' | 'completed'
  ...props
}) => {
  const baseClasses =
    'rounded-2xl md:rounded-3xl transition-all duration-200 border p-5 md:p-6 relative overflow-hidden';

  const variantClasses = {
    surface:
      'bg-[var(--bg-surface)] border-[var(--border-surface)] shadow-[var(--shadow-card)] text-[var(--text-primary)]',
    elevated:
      'bg-[var(--bg-elevated)] border-[var(--border-surface)] shadow-[var(--shadow-elevated)] text-[var(--text-primary)]',
    brand:
      'bg-gradient-to-br from-[#7800D6] to-[#2E008F] border-[#7800D6]/40 text-white shadow-xl shadow-[#7800D6]/20',
    completed:
      'bg-[var(--accent-emerald-bg)] border-[var(--accent-emerald)]/50 text-[var(--text-primary)] shadow-md shadow-emerald-500/10'
  }[variant] || 'bg-[var(--bg-surface)] border-[var(--border-surface)]';

  const hoverClass = hoverable
    ? 'hover:border-[var(--brand-primary)]/50 hover:shadow-lg cursor-pointer hover:-translate-y-0.5'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

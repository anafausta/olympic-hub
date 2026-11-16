export const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald' | 'gold' | 'coral'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold'
  }[size] || 'text-sm px-4 py-2.5 gap-2';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#7800D6] to-[#2E008F] hover:from-[#8816e8] hover:to-[#3a00b0] text-white shadow-md hover:shadow-lg shadow-[#7800D6]/20 border border-[#7800D6]/30',
    secondary:
      'bg-[var(--bg-elevated)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border border-[var(--border-surface)]',
    outline:
      'bg-transparent hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-surface)]',
    ghost:
      'bg-transparent hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
    emerald:
      'bg-[#10B981] hover:bg-[#059669] text-white shadow-md shadow-[#10B981]/20 font-semibold',
    gold:
      'bg-[#F9CA20] hover:bg-[#eab308] text-[#1A103C] font-semibold shadow-md shadow-[#F9CA20]/25',
    coral:
      'bg-[#FF4949] hover:bg-[#e03131] text-white shadow-md shadow-[#FF4949]/20 font-semibold'
  }[variant] || 'bg-gradient-to-r from-[#7800D6] to-[#2E008F] text-white';

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

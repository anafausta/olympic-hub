import { AVATAR_PRESETS } from '../../services/alunoService';

export const Avatar = ({
  avatarId = 3,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  onClick
}) => {
  const preset = AVATAR_PRESETS.find((p) => p.id === avatarId) || AVATAR_PRESETS[2];

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-14 h-14 text-2xl',
    xl: 'w-20 h-20 text-4xl'
  }[size] || 'w-10 h-10 text-lg';

  const interactive = onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : '';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl select-none shadow-sm flex-shrink-0 border border-white/20 ${sizeClasses} ${interactive} ${className}`}
      style={{ backgroundColor: preset.bg }}
      title={preset.label}
    >
      <span>{preset.emoji}</span>
    </div>
  );
};

import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { useNotification } from '../../context/NotificationContext';
import {
  BookOpen,
  FileCheck2,
  Gamepad2,
  CheckCircle2,
  Lock,
  Play
} from '../ui/SolarIcon';

export const TrailActivityItem = ({ atividade, index, onSelectActivity }) => {
  const [isShaking, setIsShaking] = useState(false);
  const { showToast } = useNotification();

  const isCompleted = atividade.status === 'concluida';
  const isUnlocked = atividade.status === 'liberada';
  const isLocked = atividade.status === 'bloqueada';

  const handleClick = () => {
    // RF14: Bloqueio de Interação
    if (isLocked) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      showToast('Atividade bloqueada (conclua a anterior para liberar)', 'warning');
      return;
    }

    // RF79: Acesso direto à atividade liberada ou concluída
    onSelectActivity(atividade);
  };

  const getCategoryIcon = () => {
    switch (atividade.tipo) {
      case 'Artigo':
        return <BookOpen className="w-5 h-5" />;
      case 'Simulado':
        return <FileCheck2 className="w-5 h-5" />;
      case 'Minigame':
        return <Gamepad2 className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  // RF13: Status Colors
  // Concluídas: Ícones na cor verde (#10B981)
  // Liberada (Atual): Ícones na cor branca (#FFFFFF)
  // Bloqueadas (Futuras): Ícones em tons de cinza (#6B7280)
  const getIconWrapperClasses = () => {
    if (isCompleted) {
      return 'bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/40';
    }
    if (isUnlocked) {
      return 'bg-[#7800D6] text-white border border-[#7800D6] shadow-md shadow-[#7800D6]/30 animate-pulse';
    }
    return 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-surface)]';
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 rounded-2xl border transition-all select-none flex items-center justify-between gap-3 ${
        isCompleted
          ? 'bg-[var(--accent-emerald-bg)] border-[var(--accent-emerald)]/30 hover:border-[var(--accent-emerald)]/60 cursor-pointer'
          : isUnlocked
          ? 'bg-[var(--bg-elevated)] border-[var(--brand-primary)] hover:border-[var(--brand-primary)] cursor-pointer shadow-md'
          : 'bg-[var(--bg-surface)]/60 border-[var(--border-surface)]/60 opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center gap-3.5">
        {/* Step Icon with Shake Animation (RF13, RF14) */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${getIconWrapperClasses()} ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          {isLocked ? <Lock className="w-5 h-5" /> : getCategoryIcon()}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--text-muted)]">
              Etapa {atividade.ordem || index + 1}
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              ({atividade.dificuldade})
            </span>
          </div>

          <h5
            className={`text-sm font-bold ${
              isCompleted || isUnlocked
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-muted)]'
            }`}
          >
            {atividade.titulo}
          </h5>

          {/* RF12: Tag de texto abaixo do título informando o tipo */}
          <div className="mt-1">
            <Badge
              color={isCompleted ? 'emerald' : isUnlocked ? 'cyan' : 'secondary'}
              size="sm"
            >
              {atividade.tipo}
            </Badge>
          </div>
        </div>
      </div>

      {/* Trailing status action */}
      <div className="flex-shrink-0">
        {isCompleted && (
          <span className="text-xs font-bold text-[var(--accent-emerald)] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Concluída
          </span>
        )}
        {isUnlocked && (
          <span className="px-3 py-1.5 rounded-xl bg-[var(--brand-primary)] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
            <Play className="w-3.5 h-3.5 fill-white" /> Liberada
          </span>
        )}
        {isLocked && (
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Bloqueada
          </span>
        )}
      </div>
    </div>
  );
};

import { useNotification } from '../../context/NotificationContext';
import { AlertCircle, CheckCircle2, Info, Bell } from './SolarIcon';

export const Toast = () => {
  const { toast } = useNotification();

  if (!toast) return null;

  const icons = {
    info: <Info className="w-5 h-5 text-[var(--accent-cyan)] flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[var(--accent-coral)] flex-shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-[var(--accent-emerald)] flex-shrink-0" />,
    warning: <Bell className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0" />
  };

  const borders = {
    info: 'border-[var(--accent-cyan)]/40',
    error: 'border-[var(--accent-coral)]/50',
    success: 'border-[var(--accent-emerald)]/50',
    warning: 'border-[var(--accent-gold)]/50'
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border shadow-xl text-sm font-medium text-[var(--text-primary)] max-w-sm ${borders[toast.type] || borders.info}`}
      >
        {icons[toast.type] || icons.info}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

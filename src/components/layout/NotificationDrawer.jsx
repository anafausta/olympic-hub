import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { useStudent } from '../../context/StudentContext';
import { formatRelativeTime } from '../../utils/formatters';
import {
  X,
  CheckCheck,
  Trash2,
  Check,
  Bell,
  MessageSquare,
  FileCheck2,
  BookOpen,
  Calendar
} from 'lucide-react';

export const NotificationDrawer = () => {
  const {
    notifications,
    drawerOpen,
    setDrawerOpen,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotification();
  const { setActiveOverlayTrilhaId } = useStudent();
  const navigate = useNavigate();

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [drawerOpen]);

  if (!drawerOpen) return null;

  const handleNotificationClick = async (notif) => {
    // RF173: Automatically mark as read
    await markAsRead(notif.id);
    setDrawerOpen(false);

    // RF172: Redirect to destination
    if (notif.linkDestino) {
      if (notif.linkDestino.overlayTrilhaId) {
        setActiveOverlayTrilhaId(notif.linkDestino.overlayTrilhaId);
      }
      navigate(notif.linkDestino.rota);
    }
  };

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'forum':
        return <MessageSquare className="w-4 h-4 text-[var(--accent-cyan)]" />;
      case 'simulado':
        return <FileCheck2 className="w-4 h-4 text-[#F9CA20]" />;
      case 'conteudo':
        return <BookOpen className="w-4 h-4 text-[#10B981]" />;
      case 'prazo':
        return <Calendar className="w-4 h-4 text-[#FF4949]" />;
      default:
        return <Bell className="w-4 h-4 text-[var(--accent-lilac)]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-[var(--bg-surface)] border-l border-[var(--border-surface)] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-[var(--border-surface)]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#F9CA20]" />
            <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
              Notificações
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {/* RF174: Global mark all as read */}
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2 py-1 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              title="Marcar todas como lidas"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Marcar todas lidas</span>
            </button>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
              aria-label="Fechar painel de notificações"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List (RF170: Infinite scroll / permanent history) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-[var(--text-muted)] space-y-2">
              <Bell className="w-10 h-10 opacity-40 stroke-1" />
              <p className="text-sm">Nenhuma notificação por enquanto.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl border transition-all relative group flex flex-col gap-2 ${
                  !notif.lida
                    ? 'bg-[var(--bg-elevated)] border-[var(--brand-primary)]/40 shadow-sm'
                    : 'bg-[var(--bg-surface)] border-[var(--border-surface)] opacity-85 hover:opacity-100'
                }`}
              >
                {/* Header of Item */}
                <div
                  className="flex items-start justify-between gap-2 cursor-pointer"
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-[var(--bg-card-hover)] flex items-center justify-center flex-shrink-0">
                      {getIcon(notif.tipo)}
                    </div>
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {notif.titulo}
                    </span>
                    {!notif.lida && (
                      <span className="w-2 h-2 rounded-full bg-[#FF4949] flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] whitespace-nowrap">
                    {formatRelativeTime(notif.dataCriacao)}
                  </span>
                </div>

                {/* Body Message */}
                <p
                  className="text-xs text-[var(--text-secondary)] leading-relaxed cursor-pointer"
                  onClick={() => handleNotificationClick(notif)}
                >
                  {notif.mensagem}
                </p>

                {/* Footer Actions (RF174 & RF175) */}
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-[var(--border-surface)]/50 mt-1">
                  {!notif.lida && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-[11px] text-[var(--text-muted)] hover:text-[#10B981] flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
                      title="Marcar como lida"
                    >
                      <Check className="w-3 h-3" />
                      Marcar lida
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="text-[11px] text-[var(--text-muted)] hover:text-[#FF4949] flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
                    title="Excluir notificação"
                  >
                    <Trash2 className="w-3 h-3" />
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

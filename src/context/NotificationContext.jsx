import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { notificacoesService } from '../services/notificacoesService';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null); // { message, type: 'info' | 'error' | 'success' }
  const [drawerOpen, setDrawerOpen] = useState(false);

  const loadNotifications = useCallback(async () => {
    try {
      const list = await notificacoesService.getNotificacoes();
      setNotifications(list);
    } catch (err) {
      console.error('Failed to load notifications', err);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type });
    const timer = setTimeout(() => {
      setToast(null);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  const markAsRead = async (id) => {
    const updated = await notificacoesService.markAsRead(id);
    setNotifications(updated);
  };

  const markAllAsRead = async () => {
    const updated = await notificacoesService.markAllAsRead();
    setNotifications(updated);
  };

  const deleteNotification = async (id) => {
    const updated = await notificacoesService.deleteNotification(id);
    setNotifications(updated);
  };

  const unreadCount = notifications.filter((n) => !n.lida).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        showToast,
        toast,
        drawerOpen,
        setDrawerOpen
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

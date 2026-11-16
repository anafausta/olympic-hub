import { useState, useEffect } from 'react';
import { PerfilView } from '../views/PerfilView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { useNotification } from '../context/NotificationContext';

export const PerfilPage = () => {
  const {
    student,
    updateAvatar,
    updateEmail,
    toggleEmailNotifications,
    deleteAccount
  } = useStudent();
  const { setBreadcrumbs } = useNavigation();
  const { showToast } = useNotification();

  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [emailEditOpen, setEmailEditOpen] = useState(false);
  const [passwordResetOpen, setPasswordResetOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Home', path: '/' },
      { label: 'Meu Perfil', path: '/perfil' }
    ]);
  }, [setBreadcrumbs]);

  const handleSaveAvatar = async (avatarId) => {
    await updateAvatar(avatarId);
    showToast('Avatar atualizado com sucesso!', 'success');
  };

  const handleSaveEmail = async (email) => {
    await updateEmail(email);
    showToast('E-mail atualizado com sucesso!', 'success');
  };

  const handleToggleEmailNotifications = async (val) => {
    await toggleEmailNotifications(val);
    showToast(
      val
        ? 'Notificações por e-mail ativadas!'
        : 'Notificações por e-mail desativadas.',
      'info'
    );
  };

  const handleConfirmDeleteAccount = async () => {
    await deleteAccount();
    setDeleteAccountOpen(false);
    showToast('Conta excluída permanentemente. Redirecionando...', 'info');
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <PerfilView
      student={student}
      avatarPickerOpen={avatarPickerOpen}
      setAvatarPickerOpen={setAvatarPickerOpen}
      emailEditOpen={emailEditOpen}
      setEmailEditOpen={setEmailEditOpen}
      passwordResetOpen={passwordResetOpen}
      setPasswordResetOpen={setPasswordResetOpen}
      deleteAccountOpen={deleteAccountOpen}
      setDeleteAccountOpen={setDeleteAccountOpen}
      onSaveAvatar={handleSaveAvatar}
      onSaveEmail={handleSaveEmail}
      onToggleEmailNotifications={handleToggleEmailNotifications}
      onConfirmDeleteAccount={handleConfirmDeleteAccount}
    />
  );
};

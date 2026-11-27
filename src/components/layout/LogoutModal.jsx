import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';
import { LogOut } from '../ui/SolarIcon';

export const LogoutModal = () => {
  const { logoutModalOpen, setLogoutModalOpen } = useNavigation();

  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    // In our prototype, reload or notify logout session
    window.location.href = '/';
  };

  return (
    <Modal
      isOpen={logoutModalOpen}
      onClose={() => setLogoutModalOpen(false)}
      title="Encerrar Sessão"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center py-2 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[var(--accent-coral-bg)] flex items-center justify-center text-[var(--accent-coral)]">
          <LogOut className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-[var(--text-primary)]">
            Tem certeza que deseja sair?
          </h4>
          <p className="text-sm text-[var(--text-secondary)]">
            Seu progresso, pontuações de simulados e conquistas continuam salvos na sua conta.
          </p>
        </div>

        <div className="flex gap-3 w-full pt-4">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setLogoutModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="coral"
            fullWidth
            onClick={handleConfirmLogout}
          >
            Sim, sair
          </Button>
        </div>
      </div>
    </Modal>
  );
};

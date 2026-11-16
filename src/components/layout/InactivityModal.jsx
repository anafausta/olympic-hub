import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Clock } from 'lucide-react';

export const InactivityModal = ({ isOpen, onContinue }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onContinue}
      title="Sessão Expirada por Inatividade"
      maxWidth="max-w-md"
      showCloseButton={false}
    >
      <div className="flex flex-col items-center text-center py-3 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[var(--accent-coral-bg)] flex items-center justify-center text-[var(--accent-coral)]">
          <Clock className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-[var(--text-primary)]">
            Você esteve inativo por 10 minutos
          </h4>
          <p className="text-sm text-[var(--text-secondary)]">
            Por segurança em computadores compartilhados da escola, sua sessão foi pausada. Clique abaixo para continuar seus estudos.
          </p>
        </div>
        <div className="w-full pt-2">
          <Button variant="primary" fullWidth onClick={onContinue}>
            Continuar Estudando
          </Button>
        </div>
      </div>
    </Modal>
  );
};

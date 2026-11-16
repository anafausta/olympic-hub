import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertCircle, HelpCircle } from 'lucide-react';

export const SimuladoConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  answeredCount
}) => {
  const pendingCount = totalQuestions - answeredCount;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Finalizar Simulado"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center py-2 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#F9CA20]/15 flex items-center justify-center text-[#F9CA20]">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          {/* RF59: Alerta explícito 'Tem certeza?' */}
          <h4 className="text-base font-bold text-[var(--text-primary)]">
            Tem certeza que deseja finalizar a prova agora?
          </h4>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Você respondeu <strong className="text-[#10B981]">{answeredCount}</strong> de{' '}
            <strong className="text-[var(--text-primary)]">{totalQuestions}</strong> questões.
          </p>
          {pendingCount > 0 && (
            <div className="p-2.5 rounded-xl bg-[#FF4949]/15 border border-[#FF4949]/30 text-xs text-[#FF4949] flex items-center justify-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Ainda restam {pendingCount} {pendingCount === 1 ? 'questão em branco' : 'questões em branco'}.</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full pt-3">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
          >
            Continuar respondendo
          </Button>
          <Button
            variant="gold"
            fullWidth
            onClick={onConfirm}
            className="font-bold shadow-md"
          >
            Sim, finalizar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

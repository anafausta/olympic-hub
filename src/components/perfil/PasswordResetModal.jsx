import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Mail, CheckCircle2 } from '../ui/SolarIcon';

export const PasswordResetModal = ({
  isOpen,
  onClose,
  studentEmail
}) => {
  const [step, setStep] = useState('request'); // 'request' | 'sent' | 'reset'

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Alteração de Senha"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {step === 'request' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-2 text-xs text-[var(--text-secondary)]">
              <p>
                Sem exigir a senha atual, o sistema enviará um link seguro para o seu e-mail cadastrado (<strong>{studentEmail}</strong>) para redefinição.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[var(--border-surface)]">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setStep('sent')}
                className="gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Enviar Link de Redefinição</span>
              </Button>
            </div>
          </div>
        )}

        {step === 'sent' && (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">
                E-mail Enviado com Sucesso!
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Verifique a caixa de entrada de <strong>{studentEmail}</strong> e siga o link com validade de 24 horas para definir sua nova senha.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={onClose} fullWidth>
              Entendido
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

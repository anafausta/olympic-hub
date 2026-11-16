import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

export const DeleteAccountModal = ({
  isOpen,
  onClose,
  onConfirmDelete
}) => {
  const [password, setPassword] = useState('');
  const [confirmedCheck, setConfirmedCheck] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim() || !confirmedCheck) return;
    onConfirmDelete();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Excluir Conta Permanentemente"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 rounded-2xl bg-[#FF4949]/15 border border-[#FF4949]/30 space-y-2">
          <div className="flex items-center gap-2 text-[#FF4949] font-bold text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>Ação Irreversível</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Ao confirmar, todos os seus dados pessoais, pontuação de XP, conquistas, simulados realizados e artigos salvos serão apagados permanentemente. Suas mensagens no fórum serão preservadas com o autor alterado para <strong>"Conta excluída"</strong>.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="confirm-pass" className="text-xs font-bold text-[var(--text-primary)]">
            Digite sua senha para confirmar:
          </label>
          <input
            id="confirm-pass"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha de acesso..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#FF4949]"
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[var(--text-secondary)] pt-1 select-none">
          <input
            type="checkbox"
            checked={confirmedCheck}
            onChange={(e) => setConfirmedCheck(e.target.checked)}
            className="mt-0.5 rounded text-[#FF4949] focus:ring-[#FF4949]"
          />
          <span>Compreendo que perderei todos os meus pontos e progresso acumulados.</span>
        </label>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-surface)]">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="coral"
            size="sm"
            type="submit"
            disabled={!password.trim() || !confirmedCheck}
            className="gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Excluir Minha Conta</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};

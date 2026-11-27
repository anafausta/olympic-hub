import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { isValidEmail } from '../../utils/validators';
import { Mail, AlertCircle } from '../ui/SolarIcon';

export const EmailEditModal = ({
  isOpen,
  onClose,
  currentEmail,
  onSaveEmail
}) => {
  const [email, setEmail] = useState(currentEmail || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    setError('');
    onSaveEmail(email);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar E-mail de Acesso"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-[var(--text-secondary)]">
          Apenas o e-mail pode ser alterado pelo aluno. Os demais dados acadêmicos são gerenciados pela coordenação e professores.
        </p>

        <div className="space-y-1">
          <label htmlFor="user-email" className="text-xs font-bold text-[var(--text-primary)]">
            Novo E-mail
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="user-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="seu.email@exemplo.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
          {error && (
            <p className="text-xs text-[#FF4949] flex items-center gap-1 pt-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-surface)]">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Confirmar Alteração
          </Button>
        </div>
      </form>
    </Modal>
  );
};

import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import {
  FORUM_TITLE_MAX_CHARS,
  FORUM_BODY_MAX_CHARS,
  sanitizeCharLimit
} from '../../utils/validators';
import { Send } from '../ui/SolarIcon';

const ASSUNTOS_FORUM = [
  'Geral',
  'Matemática Financeira',
  'Orçamento',
  'Investimentos',
  'Mercado Financeiro',
  'Segurança Digital'
];

export const ForumNewPostModal = ({
  isOpen,
  onClose,
  onSubmitPost,
  editingPost = null
}) => {
  const [titulo, setTitulo] = useState(editingPost?.titulo || '');
  const [corpo, setCorpo] = useState(editingPost?.corpo || '');
  const [assunto, setAssunto] = useState(editingPost?.assunto || 'Geral');

  if (!isOpen) return null;

  const handleTitleChange = (e) => {
    // RF139: Bloqueando novas teclas ao atingir 300 caracteres
    setTitulo(sanitizeCharLimit(e.target.value, FORUM_TITLE_MAX_CHARS));
  };

  const handleBodyChange = (e) => {
    // RF139: Bloqueando novas teclas ao atingir 1000 caracteres
    setCorpo(sanitizeCharLimit(e.target.value, FORUM_BODY_MAX_CHARS));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !corpo.trim()) return;

    onSubmitPost({
      titulo: titulo.trim(),
      corpo: corpo.trim(),
      assunto
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingPost ? 'Editar Publicação' : 'Nova Dúvida no Fórum'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Assunto Dropdown */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[var(--text-secondary)]">
            Assunto da Pergunta
          </label>
          <select
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
          >
            {ASSUNTOS_FORUM.map((ass) => (
              <option key={ass} value={ass}>
                {ass}
              </option>
            ))}
          </select>
        </div>

        {/* Título com contador (RF139) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <label htmlFor="post-title">Título / Pergunta *</label>
            <span
              className={
                titulo.length >= FORUM_TITLE_MAX_CHARS
                  ? 'text-[#FF4949] font-bold'
                  : 'text-[var(--text-muted)]'
              }
            >
              {titulo.length}/{FORUM_TITLE_MAX_CHARS}
            </span>
          </div>
          <input
            id="post-title"
            type="text"
            required
            value={titulo}
            onChange={handleTitleChange}
            placeholder="Qual é a sua dúvida principal? (máx 300 caracteres)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
          />
        </div>

        {/* Corpo com contador (RF139) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <label htmlFor="post-body">Detalhes e Contexto da Dúvida *</label>
            <span
              className={
                corpo.length >= FORUM_BODY_MAX_CHARS
                  ? 'text-[#FF4949] font-bold'
                  : 'text-[var(--text-muted)]'
              }
            >
              {corpo.length}/{FORUM_BODY_MAX_CHARS}
            </span>
          </div>
          <textarea
            id="post-body"
            required
            rows={5}
            value={corpo}
            onChange={handleBodyChange}
            placeholder="Descreva o exercício ou conceito para que os colegas e professores possam ajudar..."
            className="w-full p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
          />
          <p className="text-[11px] text-[var(--text-muted)] italic">
            * Não é permitido anexar arquivos ou pré-visualizar neste formulário.
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-surface)]">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={!titulo.trim() || !corpo.trim()}
            className="gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{editingPost ? 'Salvar Edição' : 'Publicar'}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};

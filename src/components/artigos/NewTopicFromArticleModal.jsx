import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useStudent } from '../../context/StudentContext';
import { useNotification } from '../../context/NotificationContext';
import { forumService } from '../../services/forumService';
import {
  FORUM_TITLE_MAX_CHARS,
  FORUM_BODY_MAX_CHARS,
  sanitizeCharLimit
} from '../../utils/validators';
import { Link as LinkIcon, Send } from '../ui/SolarIcon';

export const NewTopicFromArticleModal = ({
  artigo,
  isOpen,
  onClose,
  onTopicCreated
}) => {
  const { student } = useStudent();
  const { showToast } = useNotification();

  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !artigo) return null;

  const handleTitleChange = (e) => {
    setTitulo(sanitizeCharLimit(e.target.value, FORUM_TITLE_MAX_CHARS));
  };

  const handleBodyChange = (e) => {
    setCorpo(sanitizeCharLimit(e.target.value, FORUM_BODY_MAX_CHARS));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !corpo.trim()) {
      showToast('Por favor, preencha o título e a dúvida antes de publicar.', 'error');
      return;
    }

    setLoading(true);
    try {
      const newPost = await forumService.createPost({
        salaId: student?.salaId || 'sala-802',
        titulo: titulo.trim(),
        corpo: corpo.trim(),
        assunto: artigo.tags?.[0] || 'Finanças',
        artigoRelacionadoId: artigo.id,
        artigoTitulo: artigo.titulo,
        currentUser: student
      });

      showToast('Tópico publicado com sucesso no Fórum da Sala!', 'success');
      if (onTopicCreated) onTopicCreated(newPost);
      onClose();
    } catch (err) {
      console.error('Error creating forum topic', err);
      showToast('Falha ao publicar tópico. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Abrir Tópico no Fórum da Sala"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pre-linked Article Banner (RF26) */}
        <div className="p-3.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-cyan-bg)] text-[var(--accent-cyan)] flex items-center justify-center flex-shrink-0">
            <LinkIcon className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[11px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">
              Artigo Vinculado Automaticamente
            </span>
            <p className="text-xs font-bold text-[var(--text-primary)] truncate">
              {artigo.titulo}
            </p>
          </div>
        </div>

        {/* Title Input with Real-time Char Counter (RF139) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <label htmlFor="topic-title">Título da Pergunta / Dúvida *</label>
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
            id="topic-title"
            type="text"
            required
            value={titulo}
            onChange={handleTitleChange}
            placeholder="Ex: Não entendi o cálculo da taxa real na seção 2..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
          />
        </div>

        {/* Question Body with Real-time Char Counter (RF139) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <label htmlFor="topic-body">Explique sua dúvida com detalhes *</label>
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
            id="topic-body"
            required
            rows={4}
            value={corpo}
            onChange={handleBodyChange}
            placeholder="Descreva o que gerou confusão ou compartilhe suas reflexões para a turma..."
            className="w-full p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
          />
          <p className="text-[11px] text-[var(--text-muted)] italic">
            * Não é permitido anexar arquivos ou imagens neste formulário.
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-surface)]">
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={loading || !titulo.trim() || !corpo.trim()}
            className="gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? 'Publicando...' : 'Publicar no Fórum'}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};

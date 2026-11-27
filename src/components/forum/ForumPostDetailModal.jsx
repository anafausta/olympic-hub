import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ForumCommentItem } from './ForumCommentItem';
import {
  MessageSquare,
  Link as LinkIcon,
  Send
} from '../ui/SolarIcon';
import { formatDate } from '../../utils/formatters';
import {
  FORUM_COMMENT_MAX_CHARS,
  sanitizeCharLimit
} from '../../utils/validators';

export const ForumPostDetailModal = ({
  post,
  isOpen,
  onClose,
  onAddComment,
  onAddReply
}) => {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !post) return null;

  const authorName = post.autor?.isContaExcluida ? 'Conta excluída' : post.autor?.nome;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  // RF143: Sort comments: pinned first, then newest
  const sortedComments = [...(post.comentarios || [])].sort((a, b) => {
    if (a.isFixado && !b.isFixado) return -1;
    if (!a.isFixado && b.isFixado) return 1;
    return new Date(b.dataCriacao) - new Date(a.dataCriacao);
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Discussão no Fórum"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Post Full Content */}
        <div className="space-y-3 border-b border-[var(--border-surface)] pb-5">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span
              className={`font-bold ${
                post.autor?.isContaExcluida
                  ? 'text-[var(--text-muted)] italic'
                  : 'text-[var(--text-primary)]'
              }`}
            >
              {authorName}
            </span>
            <span className="text-[var(--text-muted)]">
              • Publicado em {formatDate(post.dataCriacao)}
            </span>
            {post.editado && (
              <span className="text-[10px] text-[var(--text-muted)] italic">
                (editado)
              </span>
            )}
            <Badge color="secondary" size="sm">
              {post.assunto}
            </Badge>
          </div>

          <h3 className="text-lg md:text-xl font-heading font-black text-[var(--text-primary)]">
            {post.titulo}
          </h3>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
            {post.corpo}
          </p>

          {/* RF138: Linked Article with fallback if unavailable */}
          {post.artigoRelacionadoId && (
            <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] flex items-center justify-between gap-3 mt-3">
              <div className="flex items-center gap-2 overflow-hidden text-xs">
                <LinkIcon className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="text-[var(--text-secondary)]">Conteúdo vinculado:</span>
                <strong className="text-[var(--text-primary)] truncate">
                  {post.artigoTitulo || 'Artigo'}
                </strong>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onClose();
                  navigate(`/artigos/${post.artigoRelacionadoId}`);
                }}
                className="text-xs flex-shrink-0"
              >
                Ver Artigo
              </Button>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Respostas e Comentários ({sortedComments.length})</span>
            </h4>
          </div>

          {/* New Comment Input Form (Limit 1000 chars, RF141) */}
          <form onSubmit={handleCommentSubmit} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>Sua resposta:</span>
              <span
                className={
                  commentText.length >= FORUM_COMMENT_MAX_CHARS
                    ? 'text-[#FF4949] font-bold'
                    : 'text-[var(--text-muted)]'
                }
              >
                {commentText.length}/{FORUM_COMMENT_MAX_CHARS}
              </span>
            </div>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) =>
                setCommentText(sanitizeCharLimit(e.target.value, FORUM_COMMENT_MAX_CHARS))
              }
              placeholder="Escreva uma resposta para ajudar o colega..."
              className="w-full p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
            />
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={!commentText.trim()}
                className="gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Responder</span>
              </Button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 pt-2">
            {sortedComments.length === 0 ? (
              <p className="text-center py-6 text-xs text-[var(--text-muted)]">
                Nenhum comentário ainda. Seja o primeiro a responder!
              </p>
            ) : (
              sortedComments.map((comment) => (
                <ForumCommentItem
                  key={comment.id}
                  comentario={comment}
                  postAuthorId={post.autor?.id}
                  onAddReply={onAddReply}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

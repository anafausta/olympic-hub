import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Pin,
  CornerDownRight,
  Send,
  GraduationCap
} from '../ui/SolarIcon';
import { formatRelativeTime } from '../../utils/formatters';
import {
  FORUM_COMMENT_MAX_CHARS,
  sanitizeCharLimit
} from '../../utils/validators';

export const ForumCommentItem = ({
  comentario,
  postAuthorId,
  onAddReply
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const isPostAuthor = comentario.autor?.id === postAuthorId;
  const isProfessor = comentario.autor?.isProfessor;
  const authorName = comentario.autor?.isContaExcluida ? 'Conta excluída' : comentario.autor?.nome;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onAddReply(comentario.id, replyText.trim());
    setReplyText('');
    setReplyOpen(false);
  };

  return (
    <div
      className={`p-4 rounded-2xl border space-y-3 transition-all ${
        comentario.isFixado
          ? 'bg-amber-950/20 border-[#F9CA20]/40 shadow-sm'
          : 'bg-[var(--bg-elevated)] border-[var(--border-surface)]'
      }`}
    >
      {/* Header of Comment */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-bold ${
              comentario.autor?.isContaExcluida
                ? 'text-[var(--text-muted)] italic'
                : 'text-[var(--text-primary)]'
            }`}
          >
            {authorName}
          </span>

          {/* RF142: Tag "Autor" */}
          {isPostAuthor && (
            <Badge color="lilac" size="sm">
              Autor
            </Badge>
          )}

          {/* RF142: Tag "Prof(a)." */}
          {isProfessor && (
            <Badge color="emerald" size="sm">
              <GraduationCap className="w-3 h-3" /> Prof(a).
            </Badge>
          )}

          {/* RF143: Tag "Fixado" */}
          {comentario.isFixado && (
            <Badge color="gold" size="sm">
              <Pin className="w-3 h-3" /> Fixado
            </Badge>
          )}

          <span className="text-[10px] text-[var(--text-muted)]">
            • {formatRelativeTime(comentario.dataCriacao)}
          </span>
        </div>

        {/* Reply trigger button */}
        <button
          onClick={() => setReplyOpen(!replyOpen)}
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--brand-primary)] flex items-center gap-1 cursor-pointer font-medium"
        >
          <CornerDownRight className="w-3.5 h-3.5" />
          <span>Responder</span>
        </button>
      </div>

      {/* Comment Body */}
      <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
        {comentario.texto}
      </p>

      {/* Nested Replies (1 level of subtree, RF141) */}
      {comentario.respostas?.length > 0 && (
        <div className="pl-4 border-l-2 border-[var(--border-surface)] space-y-2.5 pt-2">
          {comentario.respostas.map((resp) => {
            const isRespAuthor = resp.autor?.id === postAuthorId;
            const isRespProf = resp.autor?.isProfessor;
            const respName = resp.autor?.isContaExcluida ? 'Conta excluída' : resp.autor?.nome;

            return (
              <div
                key={resp.id}
                className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-surface)] space-y-1 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold ${
                      resp.autor?.isContaExcluida
                        ? 'text-[var(--text-muted)] italic'
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {respName}
                  </span>

                  {isRespAuthor && (
                    <Badge color="lilac" size="sm">
                      Autor
                    </Badge>
                  )}
                  {isRespProf && (
                    <Badge color="emerald" size="sm">
                      Prof(a).
                    </Badge>
                  )}

                  <span className="text-[10px] text-[var(--text-muted)]">
                    • {formatRelativeTime(resp.dataCriacao)}
                  </span>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {resp.texto}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Reply input field (limit 1000 chars, RF141) */}
      {replyOpen && (
        <form onSubmit={handleReplySubmit} className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Escreva sua resposta:</span>
            <span>{replyText.length}/{FORUM_COMMENT_MAX_CHARS}</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) =>
                setReplyText(sanitizeCharLimit(e.target.value, FORUM_COMMENT_MAX_CHARS))
              }
              placeholder="Digite sua resposta ao comentário..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
            />
            <Button variant="primary" size="sm" type="submit" disabled={!replyText.trim()}>
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

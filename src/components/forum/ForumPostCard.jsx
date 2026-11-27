import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import {
  MessageSquare,
  UserCheck,
  Edit2,
  Trash2,
  Link as LinkIcon
} from '../ui/SolarIcon';
import { formatRelativeTime } from '../../utils/formatters';

export const ForumPostCard = ({
  post,
  onOpenDetail,
  onEditPost,
  onDeletePost
}) => {
  const isAuthor = post.autor?.isCurrentUser;
  const authorName = post.autor?.isContaExcluida ? 'Conta excluída' : post.autor?.nome;

  return (
    <BentoCard
      variant="surface"
      hoverable
      onClick={() => onOpenDetail(post)}
      className="cursor-pointer group flex flex-col justify-between space-y-3 p-4 sm:p-5"
    >
      <div className="space-y-2">
        {/* Header: Author + Date + Badges + Edit/Delete Menu (RF140) */}
        <div className="flex items-center justify-between gap-2">
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

            {/* Author indicator */}
            {isAuthor && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--brand-primary)] text-white font-bold">
                Você
              </span>
            )}

            <span className="text-[var(--text-muted)] text-[11px]">
              • {formatRelativeTime(post.dataCriacao)}
            </span>

            {/* Indicator "Editado" (RF140) */}
            {post.editado && (
              <span className="text-[10px] text-[var(--text-muted)] italic">
                (editado)
              </span>
            )}

            {/* Badge "Resposta do Professor" (RF137) */}
            {post.temRespostaProfessor && (
              <Badge color="emerald" size="sm">
                <UserCheck className="w-3 h-3" /> Resposta do Professor
              </Badge>
            )}
          </div>

          <Badge color="secondary" size="sm">
            {post.assunto}
          </Badge>
        </div>

        {/* Post Title (RF137) */}
        <h4 className="text-base font-heading font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
          {post.titulo}
        </h4>

        {/* Body Preview */}
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {post.corpo}
        </p>

        {/* Linked Article if any (RF138) */}
        {post.artigoTitulo && (
          <div className="inline-flex items-center gap-1.5 text-[11px] text-[var(--brand-primary)] font-semibold bg-[var(--bg-elevated)] px-2.5 py-1 rounded-lg border border-[var(--border-surface)]">
            <LinkIcon className="w-3 h-3" />
            <span className="truncate max-w-[280px]">Artigo: {post.artigoTitulo}</span>
          </div>
        )}
      </div>

      {/* Footer: Comments count (RF137) & Author actions (RF140) */}
      <div className="pt-2 border-t border-[var(--border-surface)]/60 flex items-center justify-between text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-1.5 font-medium text-[var(--text-secondary)]">
          <MessageSquare className="w-4 h-4 text-[var(--brand-primary)]" />
          <span>{post.comentarios?.length || 0} {post.comentarios?.length === 1 ? 'comentário' : 'comentários'}</span>
        </div>

        {/* Actions for Author (Edit & Delete - RF140) */}
        {isAuthor && (
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onEditPost(post)}
              className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
              title="Editar post"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDeletePost(post.id)}
              className="p-1 rounded text-[var(--text-muted)] hover:text-[#FF4949] hover:bg-[var(--bg-elevated)] transition-colors"
              title="Excluir post"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </BentoCard>
  );
};

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { NewTopicFromArticleModal } from './NewTopicFromArticleModal';
import { forumService } from '../../services/forumService';
import { MessageSquare, Plus, ArrowRight, UserCheck } from '../ui/SolarIcon';
import { formatRelativeTime } from '../../utils/formatters';

export const ForumTopicsSection = ({ artigo }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  const fetchTopics = useCallback(async () => {
    try {
      const allPosts = await forumService.getPostsBySala('sala-802');
      const related = allPosts.filter(
        (p) => p.artigoRelacionadoId === artigo.id || artigo.topicosRelacionadosIds?.includes(p.id)
      );
      setTopics(related);
    } catch (err) {
      console.error('Error fetching related forum topics', err);
    }
  }, [artigo]);

  useEffect(() => {
    if (artigo?.id) {
      fetchTopics();
    }
  }, [artigo?.id, fetchTopics]);

  const handleTopicCreated = (newPost) => {
    setTopics((prev) => [newPost, ...prev]);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-[var(--border-surface)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[var(--brand-primary)]" />
          <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
            Tópicos do Fórum Relacionados
          </h3>
        </div>

        {/* Button "Abrir tópico" (RF26) */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#F9CA20]" />
          <span>Abrir tópico sobre este artigo</span>
        </Button>
      </div>

      {topics.length === 0 ? (
        <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-center space-y-2">
          <p className="text-xs text-[var(--text-muted)]">
            Nenhum colega abriu dúvidas sobre este artigo ainda. Seja o primeiro a discutir!
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="text-xs text-[var(--brand-primary)]"
          >
            Fazer uma pergunta à turma
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {topics.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate('/forum')}
              className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-surface)] hover:border-[var(--brand-primary)]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[var(--text-secondary)]">
                    {post.autor?.nome}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    • {formatRelativeTime(post.dataCriacao)}
                  </span>
                  {post.temRespostaProfessor && (
                    <Badge color="emerald" size="sm">
                      <UserCheck className="w-3 h-3" /> Resposta do Professor
                    </Badge>
                  )}
                </div>

                <h5 className="font-heading font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                  {post.titulo}
                </h5>
              </div>

              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] flex-shrink-0 self-end sm:self-center">
                <span>{post.comentarios?.length || 0} respostas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal to create new topic from article */}
      <NewTopicFromArticleModal
        artigo={artigo}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onTopicCreated={handleTopicCreated}
      />
    </div>
  );
};

import { PageContainer } from '../components/layout/PageContainer';
import { ForumPostCard } from '../components/forum/ForumPostCard';
import { ForumNewPostModal } from '../components/forum/ForumNewPostModal';
import { ForumPostDetailModal } from '../components/forum/ForumPostDetailModal';
import { Button } from '../components/ui/Button';
import {
  MessageSquare,
  Plus,
  Search,
  UserCheck,
  User,
  X
} from '../components/ui/SolarIcon';

export const ForumView = ({
  posts,
  salaNome,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  selectedSubject,
  setSelectedSubject,
  availableSubjects,
  newPostModalOpen,
  setNewPostModalOpen,
  detailPost,
  setDetailPost,
  editingPost,
  setEditingPost,
  onCreateOrEditPost,
  onDeletePost,
  onAddComment,
  onAddReply
}) => {
  return (
    <PageContainer>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Fórum da Turma</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-[var(--text-primary)] tracking-tight">
            Dúvidas & Discussões — {salaNome}
          </h1>
        </div>

        {/* Button to Create Post (RF139) */}
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            setEditingPost(null);
            setNewPostModalOpen(true);
          }}
          className="gap-2 cursor-pointer self-start md:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Dúvida</span>
        </Button>
      </div>

      {/* Search and Filters Bar (RF137) */}
      <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-surface)] space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palavras no título ou corpo das dúvidas..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Buttons (RF137: Posts autorais, Com resposta do professor, Por assunto) */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-surface)] hover:text-[var(--text-primary)]'
            }`}
          >
            Todos os posts
          </button>

          <button
            onClick={() => setFilterType('my_posts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              filterType === 'my_posts'
                ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-surface)] hover:text-[var(--text-primary)]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Meus posts</span>
          </button>

          <button
            onClick={() => setFilterType('professor_replied')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              filterType === 'professor_replied'
                ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-surface)] hover:text-[var(--text-primary)]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Respondidos pelo professor</span>
          </button>

          {/* Subject Filter Dropdown */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)] cursor-pointer"
          >
            <option value="all">Todos os assuntos</option>
            {availableSubjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reddit-style Posts List (RF137) */}
      {posts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-surface)] space-y-2">
          <MessageSquare className="w-10 h-10 mx-auto text-[var(--text-muted)] opacity-40" />
          <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
            Nenhuma dúvida encontrada
          </h4>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <ForumPostCard
              key={post.id}
              post={post}
              onOpenDetail={(p) => setDetailPost(p)}
              onEditPost={(p) => {
                setEditingPost(p);
                setNewPostModalOpen(true);
              }}
              onDeletePost={onDeletePost}
            />
          ))}
        </div>
      )}

      {/* New Post Modal (RF139) */}
      <ForumNewPostModal
        isOpen={newPostModalOpen}
        onClose={() => {
          setNewPostModalOpen(false);
          setEditingPost(null);
        }}
        onSubmitPost={onCreateOrEditPost}
        editingPost={editingPost}
      />

      {/* Detailed Post Expansion Modal (RF138, RF141, RF143) */}
      <ForumPostDetailModal
        post={detailPost}
        isOpen={!!detailPost}
        onClose={() => setDetailPost(null)}
        onAddComment={onAddComment}
        onAddReply={onAddReply}
      />
    </PageContainer>
  );
};

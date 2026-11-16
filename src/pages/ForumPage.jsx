import { useState, useEffect, useMemo } from 'react';
import { ForumView } from '../views/ForumView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { useNotification } from '../context/NotificationContext';
import { forumService } from '../services/forumService';

export const ForumPage = () => {
  const { student } = useStudent();
  const { setBreadcrumbs } = useNavigation();
  const { showToast } = useNotification();

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'my_posts' | 'professor_replied'
  const [selectedSubject, setSelectedSubject] = useState('all');

  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [detailPost, setDetailPost] = useState(null);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Home', path: '/' },
      { label: 'Fórum da Sala', path: '/forum' }
    ]);
  }, [setBreadcrumbs]);

  const loadPosts = async () => {
    try {
      const data = await forumService.getPostsBySala(student?.salaId || 'sala-802');
      setPosts(data);
    } catch (err) {
      console.error('Error fetching forum posts', err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [student]);

  const availableSubjects = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.assunto) set.add(p.assunto);
    });
    return Array.from(set);
  }, [posts]);

  // Filtering (RF137)
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.corpo.toLowerCase().includes(q)
      );
    }

    if (filterType === 'my_posts') {
      result = result.filter((p) => p.autor?.isCurrentUser);
    } else if (filterType === 'professor_replied') {
      result = result.filter((p) => p.temRespostaProfessor);
    }

    if (selectedSubject !== 'all') {
      result = result.filter((p) => p.assunto === selectedSubject);
    }

    return result;
  }, [posts, searchQuery, filterType, selectedSubject]);

  const handleCreateOrEditPost = async ({ titulo, corpo, assunto }) => {
    try {
      if (editingPost) {
        const updated = await forumService.editPost(editingPost.id, { titulo, corpo });
        setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showToast('Publicação atualizada com sucesso!', 'success');
      } else {
        const created = await forumService.createPost({
          salaId: student?.salaId || 'sala-802',
          titulo,
          corpo,
          assunto,
          currentUser: student
        });
        setPosts((prev) => [created, ...prev]);
        showToast('Dúvida publicada no fórum da turma!', 'success');
      }
    } catch (err) {
      console.error('Error saving post', err);
      showToast('Erro ao publicar. Tente novamente.', 'error');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Tem certeza que deseja apagar permanentemente esta pergunta e todos os comentários dela?')) {
      await forumService.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      showToast('Publicação apagada com sucesso.', 'info');
    }
  };

  const handleAddComment = async (postId, texto) => {
    try {
      const updatedPost = await forumService.addComment(postId, {
        texto,
        currentUser: student
      });
      setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      setDetailPost(updatedPost);
      showToast('Resposta enviada!', 'success');
    } catch (err) {
      console.error('Error adding comment', err);
      showToast('Erro ao enviar resposta.', 'error');
    }
  };

  const handleAddReply = async (commentId, texto) => {
    if (!detailPost) return;
    try {
      const updatedPost = await forumService.addReply(detailPost.id, commentId, {
        texto,
        currentUser: student
      });
      setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      setDetailPost(updatedPost);
      showToast('Comentário respondido!', 'success');
    } catch (err) {
      console.error('Error adding reply', err);
      showToast('Erro ao responder.', 'error');
    }
  };

  return (
    <ForumView
      posts={filteredPosts}
      salaNome={student?.salaNome || 'Turma 802'}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filterType={filterType}
      setFilterType={setFilterType}
      selectedSubject={selectedSubject}
      setSelectedSubject={setSelectedSubject}
      availableSubjects={availableSubjects}
      newPostModalOpen={newPostModalOpen}
      setNewPostModalOpen={setNewPostModalOpen}
      detailPost={detailPost}
      setDetailPost={setDetailPost}
      editingPost={editingPost}
      setEditingPost={setEditingPost}
      onCreateOrEditPost={handleCreateOrEditPost}
      onDeletePost={handleDeletePost}
      onAddComment={handleAddComment}
      onAddReply={handleAddReply}
    />
  );
};

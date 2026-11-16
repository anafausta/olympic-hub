import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArtigoLeituraView } from '../views/ArtigoLeituraView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { useNotification } from '../context/NotificationContext';
import { artigosService } from '../services/artigosService';
import { trilhasService } from '../services/trilhasService';

export const ArtigoLeituraPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { student, toggleSavedArticle, addXP, setActiveOverlayTrilhaId } = useStudent();
  const { setBreadcrumbs } = useNavigation();
  const { showToast } = useNotification();

  const fromTrilhaId = location.state?.fromTrilhaId || null;
  const atividadeId = location.state?.atividadeId || null;

  const [artigo, setArtigo] = useState(null);
  const [recomendados, setRecomendados] = useState([]);

  useEffect(() => {
    const fetchArtigo = async () => {
      try {
        const data = await artigosService.getArtigoById(id);
        if (data) {
          setArtigo(data);
          setBreadcrumbs(
            fromTrilhaId
              ? [
                  { label: 'Home', path: '/' },
                  { label: 'Trilhas', path: '/trilhas' },
                  { label: data.titulo, path: `/artigos/${data.id}` }
                ]
              : [
                  { label: 'Home', path: '/' },
                  { label: 'Artigos / Wiki', path: '/artigos' },
                  { label: data.titulo, path: `/artigos/${data.id}` }
                ]
          );
          const recs = await artigosService.getRecomendados(data.id);
          setRecomendados(recs);
        }
      } catch (err) {
        console.error('Error fetching article', err);
      }
    };

    fetchArtigo();
  }, [id, fromTrilhaId, setBreadcrumbs]);

  const isSaved = (student?.artigosSalvosIds || []).includes(id);

  const handleToggleSave = async () => {
    if (artigo) {
      await toggleSavedArticle(artigo.id);
    }
  };

  const handleBack = () => {
    if (fromTrilhaId) {
      setActiveOverlayTrilhaId(fromTrilhaId);
      navigate('/trilhas');
    } else {
      navigate('/artigos');
    }
  };

  const handleCompleteTrackActivity = async () => {
    if (!fromTrilhaId || !atividadeId) return;
    const { trackXpAwarded } = await trilhasService.completeAtividade(fromTrilhaId, atividadeId);
    if (trackXpAwarded > 0) {
      await addXP(trackXpAwarded);
      showToast(`Trilha 100% concluída! Você ganhou +${trackXpAwarded} XP!`, 'success');
    } else {
      showToast('Etapa concluída! Próxima atividade da trilha liberada.', 'success');
    }
    setActiveOverlayTrilhaId(fromTrilhaId);
    navigate('/trilhas');
  };

  return (
    <ArtigoLeituraView
      artigo={artigo}
      isSaved={isSaved}
      onToggleSave={handleToggleSave}
      recomendados={recomendados}
      onBack={handleBack}
      fromTrilha={!!fromTrilhaId}
      onCompleteTrackActivity={handleCompleteTrackActivity}
    />
  );
};

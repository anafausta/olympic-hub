import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MinigamesView } from '../views/MinigamesView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { useNotification } from '../context/NotificationContext';
import { minigamesService } from '../services/minigamesService';
import { trilhasService } from '../services/trilhasService';

export const MinigamesPage = () => {
  const { addXP, setActiveOverlayTrilhaId } = useStudent();
  const { setBreadcrumbs } = useNavigation();
  const { showToast } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  const fromTrilhaId = location.state?.fromTrilhaId || null;
  const atividadeId = location.state?.atividadeId || null;
  const initialGameId = location.state?.initialGameId || null;

  const [gamesList, setGamesList] = useState([]);
  const [activeGameId, setActiveGameId] = useState(initialGameId);

  useEffect(() => {
    setBreadcrumbs(
      fromTrilhaId
        ? [
            { label: 'Home', path: '/' },
            { label: 'Trilhas', path: '/trilhas' },
            { label: 'Minigame da Trilha', path: '/minigames' }
          ]
        : [
            { label: 'Home', path: '/' },
            { label: 'Minigames', path: '/minigames' }
          ]
    );
  }, [fromTrilhaId, setBreadcrumbs]);

  useEffect(() => {
    const fetchGames = async () => {
      const list = await minigamesService.getGamesList();
      setGamesList(list);
    };
    fetchGames();
  }, []);

  const handleSelectGame = (gameId) => {
    setActiveGameId(gameId);
  };

  const handleBackToList = () => {
    if (fromTrilhaId) {
      setActiveOverlayTrilhaId(fromTrilhaId);
      navigate('/trilhas');
    } else {
      setActiveGameId(null);
    }
  };

  const handleWinGame = async () => {
    // RF82: Concede +5 XP à pontuação geral
    await addXP(5);
    if (fromTrilhaId && atividadeId) {
      const { trackXpAwarded } = await trilhasService.completeAtividade(fromTrilhaId, atividadeId);
      if (trackXpAwarded > 0) {
        await addXP(trackXpAwarded);
        showToast(`Vitória (+5 XP) e Trilha 100% concluída (+${trackXpAwarded} XP)!`, 'success');
      } else {
        showToast('Parabéns! +5 XP e etapa da trilha concluída!', 'success');
      }
    } else {
      showToast('Parabéns! Você venceu o jogo e ganhou +5 XP!', 'success');
    }
  };

  return (
    <MinigamesView
      gamesList={gamesList}
      activeGameId={activeGameId}
      onSelectGame={handleSelectGame}
      onBackToList={handleBackToList}
      onWinGame={handleWinGame}
    />
  );
};

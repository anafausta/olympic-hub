import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimuladoView } from '../views/SimuladoView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { useNotification } from '../context/NotificationContext';
import { useSimuladoTimer } from '../hooks/useSimuladoTimer';
import { simuladoService } from '../services/simuladoService';
import { trilhasService } from '../services/trilhasService';

export const SimuladoPage = () => {
  const { student, recordSimulado, addXP, setActiveOverlayTrilhaId } = useStudent();
  const { setBreadcrumbs } = useNavigation();
  const { showToast } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  const fromTrilhaId = location.state?.fromTrilhaId || null;
  const atividadeId = location.state?.atividadeId || null;

  const [stage, setStage] = useState('config'); // 'config' | 'running' | 'result' | 'review'
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [activeSimulado, setActiveSimulado] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    setBreadcrumbs(
      fromTrilhaId
        ? [
            { label: 'Home', path: '/' },
            { label: 'Trilhas', path: '/trilhas' },
            { label: 'Simulado da Trilha', path: '/simulado' }
          ]
        : [
            { label: 'Home', path: '/' },
            { label: 'Simulados', path: '/simulado' }
          ]
    );
  }, [fromTrilhaId, setBreadcrumbs]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjects = await simuladoService.getAvailableSubjects();
        setAvailableSubjects(subjects);
      } catch (err) {
        console.error('Error fetching subjects', err);
      }
    };
    fetchSubjects();
  }, []);

  const handleFinish = useCallback(async () => {
    setConfirmModalOpen(false);
    if (!activeSimulado) return;

    const finished = await simuladoService.finishSimulado();
    setActiveSimulado({ ...finished });
    setStage('result');

    // Update global student record (XP and statistics)
    if (finished.resultado) {
      await recordSimulado({
        totalQuestoes: finished.resultado.totalQuestoes,
        acertos: finished.resultado.acertos,
        xpGanho: finished.resultado.xpGanho
      });
    }

    // RF11, RF67, RF78: Complete track activity if started from a Trilha
    if (fromTrilhaId && atividadeId) {
      const { trackXpAwarded } = await trilhasService.completeAtividade(fromTrilhaId, atividadeId);
      if (trackXpAwarded > 0) {
        await addXP(trackXpAwarded);
        showToast(`Trilha 100% concluída! Bônus de +${trackXpAwarded} XP creditado!`, 'success');
      }
    }
  }, [activeSimulado, recordSimulado, fromTrilhaId, atividadeId, addXP, showToast]);

  // Hook for simulation timer (RF54)
  const timer = useSimuladoTimer({
    initialSeconds: activeSimulado?.totalSeconds || 0,
    isActive: stage === 'running' && !!activeSimulado?.comTempo,
    onTimeUp: handleFinish
  });

  const handleStartSimulado = async (config) => {
    try {
      const sim = await simuladoService.generateSimulado(config);
      setActiveSimulado(sim);
      setCurrentQuestionIndex(0);
      setStage('running');
    } catch (err) {
      console.error('Error starting simulado', err);
    }
  };

  const handleSelectAnswer = async (questaoId, respostaIndex) => {
    const updated = await simuladoService.saveAnswer(questaoId, respostaIndex);
    if (updated) {
      setActiveSimulado({ ...updated });
    }
  };

  const handleSelectQuestionIndex = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (activeSimulado && currentQuestionIndex < activeSimulado.questoes.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleNewSimulado = () => {
    simuladoService.clearActiveSimulado();
    setActiveSimulado(null);
    setCurrentQuestionIndex(0);
    setStage('config');
  };

  const handleReturnToTrilha = () => {
    if (fromTrilhaId) {
      setActiveOverlayTrilhaId(fromTrilhaId);
      navigate('/trilhas');
    }
  };

  return (
    <SimuladoView
      stage={stage}
      availableSubjects={availableSubjects}
      studentLevel={student?.nivel || 2}
      onStartSimulado={handleStartSimulado}
      activeSimulado={activeSimulado}
      currentQuestionIndex={currentQuestionIndex}
      onSelectAnswer={handleSelectAnswer}
      onSelectQuestionIndex={handleSelectQuestionIndex}
      onPreviousQuestion={handlePreviousQuestion}
      onNextQuestion={handleNextQuestion}
      confirmModalOpen={confirmModalOpen}
      setConfirmModalOpen={setConfirmModalOpen}
      onFinishSimulado={handleFinish}
      timer={timer}
      onReview={() => setStage('review')}
      onNewSimulado={handleNewSimulado}
      onBackToResult={() => setStage('result')}
      fromTrilha={!!fromTrilhaId}
      onReturnToTrilha={handleReturnToTrilha}
    />
  );
};

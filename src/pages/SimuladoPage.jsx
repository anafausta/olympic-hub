import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimuladoView } from '../views/SimuladoView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { useNotification } from '../context/NotificationContext';
import { useSimuladoTimer } from '../hooks/useSimuladoTimer';
import { simuladoService } from '../services/simuladoService';
import { trilhasService } from '../services/trilhasService';
import { salaService } from '../services/salaService';

export const SimuladoPage = () => {
  const { student, recordSimulado, addXP, setActiveOverlayTrilhaId } = useStudent();
  const {
    setBreadcrumbs,
    setIsSimuladoRunning,
    simuladoExitRequested,
    setSimuladoExitRequested
  } = useNavigation();
  const { showToast } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  const fromTrilhaId = location.state?.fromTrilhaId || null;
  const atividadeId = location.state?.atividadeId || null;
  const fromAulaId = location.state?.fromAulaId || null;
  const etapaId = location.state?.etapaId || null;
  const isFromTrilhaSimulado = Boolean(fromTrilhaId && atividadeId);

  const [stage, setStage] = useState(isFromTrilhaSimulado ? 'loading' : 'config'); // 'loading' | 'config' | 'running' | 'result' | 'review'
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [activeSimulado, setActiveSimulado] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const autoStartedRef = useRef(null);

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
    setSimuladoExitRequested(false);
    if (!activeSimulado) return;

    const answeredCount = activeSimulado.questoes.filter(
      (q) => q.respostaSelecionada !== null && q.respostaSelecionada !== undefined
    ).length;

    const finished = await simuladoService.finishSimulado();
    setActiveSimulado({ ...finished });
    setStage('result');

    // Update global student record (XP and statistics) only if at least one question was answered
    if (finished.resultado && answeredCount > 0) {
      await recordSimulado({
        totalQuestoes: finished.resultado.totalQuestoes,
        acertos: finished.resultado.acertos,
        xpGanho: finished.resultado.xpGanho
      });
    }

    // Only mark trilha/aula simulado as completed if the user actually answered questions and finished
    if (answeredCount > 0 && fromTrilhaId && atividadeId) {
      const { trackXpAwarded } = await trilhasService.completeAtividade(fromTrilhaId, atividadeId);
      if (trackXpAwarded > 0) {
        await addXP(trackXpAwarded);
        showToast(`Trilha 100% concluída! Bônus de +${trackXpAwarded} XP creditado!`, 'success');
      }
    } else if (answeredCount === 0 && (fromTrilhaId || fromAulaId)) {
      showToast('Nenhuma questão respondida: a etapa não foi marcada como concluída.', 'warning');
    }

    if (answeredCount > 0 && fromAulaId && etapaId) {
      await salaService.updateAulaProgress(fromAulaId, etapaId);
    }
  }, [activeSimulado, recordSimulado, fromTrilhaId, atividadeId, fromAulaId, etapaId, addXP, showToast, setSimuladoExitRequested]);

  // Hook for simulation timer (RF54)
  const timer = useSimuladoTimer({
    initialSeconds: activeSimulado?.totalSeconds || 0,
    isActive: stage === 'running' && !!activeSimulado?.comTempo,
    onTimeUp: handleFinish
  });

  const handleStartSimulado = useCallback(async (config) => {
    try {
      const sim = await simuladoService.generateSimulado(config);
      setActiveSimulado(sim);
      setCurrentQuestionIndex(0);
      setStage('running');
    } catch (err) {
      console.error('Error starting simulado', err);
      setStage('config');
    }
  }, []);

  // Auto-start simulado directly when opened from a Trilha (e.g. Trilha Geral)
  useEffect(() => {
    if (!isFromTrilhaSimulado) return;
    const key = `${fromTrilhaId}:${atividadeId}`;
    if (autoStartedRef.current === key) return;
    autoStartedRef.current = key;

    handleStartSimulado({
      assuntos: [],
      quantidade: 5,
      comTempo: true,
      nivel: student?.nivel || 2
    });
  }, [isFromTrilhaSimulado, fromTrilhaId, atividadeId, student?.nivel, handleStartSimulado]);

  // Keep NavigationContext aware of active simulado to prevent leaving without finishing
  useEffect(() => {
    setIsSimuladoRunning(stage === 'running');
    return () => setIsSimuladoRunning(false);
  }, [stage, setIsSimuladoRunning]);

  // Warn before closing/reloading browser tab while simulado is running
  useEffect(() => {
    if (stage !== 'running') return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [stage]);

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
    if (stage === 'running') {
      setConfirmModalOpen(true);
      return;
    }
    if (fromTrilhaId) {
      setActiveOverlayTrilhaId(fromTrilhaId);
      navigate('/trilhas');
    }
  };

  const handleSetConfirmModalOpen = useCallback(
    (open) => {
      setConfirmModalOpen(open);
      if (!open) {
        setSimuladoExitRequested(false);
      }
    },
    [setSimuladoExitRequested]
  );

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
      confirmModalOpen={confirmModalOpen || (stage === 'running' && simuladoExitRequested)}
      setConfirmModalOpen={handleSetConfirmModalOpen}
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

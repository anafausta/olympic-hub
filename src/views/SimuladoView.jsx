import { PageContainer } from '../components/layout/PageContainer';
import { SimuladoConfig } from '../components/simulado/SimuladoConfig';
import { SimuladoQuestion } from '../components/simulado/SimuladoQuestion';
import { SimuladoNav } from '../components/simulado/SimuladoNav';
import { SimuladoTimer } from '../components/simulado/SimuladoTimer';
import { SimuladoConfirmModal } from '../components/simulado/SimuladoConfirmModal';
import { SimuladoResult } from '../components/simulado/SimuladoResult';
import { SimuladoReview } from '../components/simulado/SimuladoReview';
import { BentoCard } from '../components/ui/BentoCard';
import { Button } from '../components/ui/Button';
import { FileCheck2, ArrowLeft } from '../components/ui/SolarIcon';

export const SimuladoView = ({
  stage, // 'config' | 'running' | 'result' | 'review'
  availableSubjects,
  studentLevel,
  onStartSimulado,
  activeSimulado,
  currentQuestionIndex,
  onSelectAnswer,
  onSelectQuestionIndex,
  onPreviousQuestion,
  onNextQuestion,
  confirmModalOpen,
  setConfirmModalOpen,
  onFinishSimulado,
  timer,
  onReview,
  onNewSimulado,
  onBackToResult,
  fromTrilha = false,
  onReturnToTrilha
}) => {
  return (
    <PageContainer>
      {fromTrilha && (
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReturnToTrilha}
            className="gap-1.5 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a Trilha</span>
          </Button>
        </div>
      )}

      {/* Loading state for direct trilha simulado */}
      {stage === 'loading' && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7800D6]" />
        </div>
      )}

      {/* Stage 1: Simulado Configuration (RF48, RF49, RF50, RF51) */}
      {stage === 'config' && (
        <SimuladoConfig
          availableSubjects={availableSubjects}
          studentLevel={studentLevel}
          onStartSimulado={onStartSimulado}
        />
      )}

      {/* Stage 2: Simulado Runner (RF53 - RF58) */}
      {stage === 'running' && activeSimulado && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Bar with Timer */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#F9CA20]" />
              <span className="font-heading font-black text-sm md:text-base text-[var(--text-primary)]">
                Simulado em Andamento
              </span>
            </div>

            {/* RF54: Cronômetro Visível */}
            <SimuladoTimer
              remainingSeconds={timer.remainingSeconds}
              isWarning={timer.isWarning}
              comTempo={activeSimulado.comTempo}
            />
          </div>

          {/* Question Card */}
          <BentoCard variant="surface" className="p-6 md:p-8">
            <SimuladoQuestion
              questao={activeSimulado.questoes[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={activeSimulado.questoes.length}
              onSelectAnswer={onSelectAnswer}
            />
          </BentoCard>

          {/* Numbered Navigation Bar & Actions (RF56, RF57, RF58) */}
          <BentoCard variant="surface" className="p-4">
            <SimuladoNav
              totalQuestions={activeSimulado.questoes.length}
              currentIndex={currentQuestionIndex}
              questoes={activeSimulado.questoes}
              onSelectIndex={onSelectQuestionIndex}
              onPrevious={onPreviousQuestion}
              onNext={onNextQuestion}
              onFinishRequest={() => setConfirmModalOpen(true)}
            />
          </BentoCard>

          {/* RF59: Confirm Exit/Submission Modal */}
          <SimuladoConfirmModal
            isOpen={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            onConfirm={onFinishSimulado}
            totalQuestions={activeSimulado.questoes.length}
            answeredCount={
              activeSimulado.questoes.filter((q) => q.respostaSelecionada !== null && q.respostaSelecionada !== undefined).length
            }
          />
        </div>
      )}

      {/* Stage 3: Immediate Results (RF60, RF61) */}
      {stage === 'result' && activeSimulado && (
        <SimuladoResult
          resultado={activeSimulado.resultado}
          onReview={onReview}
          onNewSimulado={onNewSimulado}
          fromTrilha={fromTrilha}
          onReturnToTrilha={onReturnToTrilha}
        />
      )}

      {/* Stage 4: Review with Explanations (RF62, RF63) */}
      {stage === 'review' && activeSimulado && (
        <SimuladoReview
          simulado={activeSimulado}
          onBackToResult={onBackToResult}
          onNewSimulado={onNewSimulado}
        />
      )}
    </PageContainer>
  );
};

import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const SimuladoNav = ({
  totalQuestions,
  currentIndex,
  questoes,
  onSelectIndex,
  onPrevious,
  onNext,
  onFinishRequest
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="space-y-4">
      {/* RF56, RF57: Numbered Question Navigation Bar with Color Status */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {questoes.map((q, idx) => {
          const isAnswered = q.respostaSelecionada !== null && q.respostaSelecionada !== undefined;
          const isCurrent = idx === currentIndex;

          // RF57: Cores por status (respondida vs não respondida vs atual)
          let statusColor = 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-surface)]';
          if (isAnswered) {
            statusColor = 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/50 font-bold'; // Respondida = Verde
          }
          if (isCurrent) {
            statusColor = 'bg-gradient-to-r from-[#7800D6] to-[#2E008F] text-white border-white ring-2 ring-[#7800D6] font-black shadow-md';
          }

          return (
            <button
              key={q.id || idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center text-xs transition-all flex-shrink-0 cursor-pointer ${statusColor}`}
              title={`Ir para questão ${idx + 1} (${isAnswered ? 'Respondida' : 'Pendente'})`}
            >
              {isAnswered && !isCurrent ? (
                <div className="flex flex-col items-center leading-none">
                  <span className="text-[10px]">{idx + 1}</span>
                  <Check className="w-2.5 h-2.5 text-[#10B981]" />
                </div>
              ) : (
                <span>{idx + 1}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* RF58: Action Buttons (Anterior disabled on 1st, Próxima becomes Finalizar on last) */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="md"
          disabled={isFirst} // RF58: Desabilitar na primeira questão
          onClick={onPrevious}
          className="gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </Button>

        {isLast ? (
          // RF58: Substituir por "Finalizar simulado" na última questão
          <Button
            variant="gold"
            size="md"
            onClick={onFinishRequest}
            className="gap-2 font-bold shadow-md"
          >
            <span>Finalizar simulado</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            className="gap-1.5"
          >
            <span>Próxima</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

import { useState } from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Star, CheckCircle2, XCircle, ArrowLeft, ArrowRight, HelpCircle } from '../ui/SolarIcon';
import { useStudent } from '../../context/StudentContext';

const CHOICE_LETTERS = ['A', 'B', 'C', 'D', 'E'];

export const SimuladoReview = ({ simulado, onBackToResult }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { student, toggleSavedQuestion } = useStudent();

  const answeredCount =
    simulado?.questoes?.filter(
      (q) => q.respostaSelecionada !== null && q.respostaSelecionada !== undefined
    ).length || 0;

  if (!simulado?.finalizado || simulado?.resultado?.cancelado || answeredCount === 0) {
    return null;
  }

  const questao = simulado?.questoes?.[currentIndex];
  const total = simulado?.questoes?.length || 0;

  if (!questao) return null;

  const isFavorited = (student?.questoesSalvasIds || []).includes(questao.id);
  const isCorrect = questao.respostaSelecionada === questao.correta;

  return (
    <BentoCard variant="surface" className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-surface)] pb-4">
        <div>
          <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
            Revisão Detalhada do Simulado
          </span>
          <h3 className="text-lg md:text-xl font-heading font-black text-[var(--text-primary)]">
            Gabarito e Comentários da Resolução
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* RF63: Marcar/Desmarcar favorita na revisão */}
          <button
            onClick={() => toggleSavedQuestion(questao.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFavorited
                ? 'bg-[var(--accent-gold-bg)] border-[var(--accent-gold)]/40 text-[var(--accent-gold)]'
                : 'bg-[var(--bg-elevated)] border-[var(--border-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Favoritar para rever na Home"
          >
            <Star className={`w-4 h-4 ${isFavorited ? 'fill-[#F9CA20] text-[#F9CA20]' : 'stroke-current'}`} />
            <span>{isFavorited ? 'Favoritada' : 'Favoritar'}</span>
          </button>
        </div>
      </div>

      {/* Numbered Strip for Quick Review Jumping */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {simulado.questoes.map((q, idx) => {
          const correct = q.respostaSelecionada === q.correta;
          const isSelected = idx === currentIndex;

          return (
            <button
              key={q.id || idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isSelected ? 'ring-2 ring-white scale-105' : ''
              } ${
                correct
                  ? 'bg-emerald-500/20 text-[#10B981] border-emerald-500/40'
                  : 'bg-red-500/20 text-[#FF4949] border-red-500/40'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Question Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--text-muted)]">
              Questão {currentIndex + 1} de {total}
            </span>
            <Badge color="cyan" size="sm">
              {questao.assunto}
            </Badge>
          </div>

          <div>
            {isCorrect ? (
              <Badge color="emerald" size="sm">
                <CheckCircle2 className="w-3.5 h-3.5" /> Você Acertou (+10 XP)
              </Badge>
            ) : (
              <Badge color="coral" size="sm">
                <XCircle className="w-3.5 h-3.5" /> Você Errou
              </Badge>
            )}
          </div>
        </div>

        {/* Enunciado */}
        <p className="text-base text-[var(--text-primary)] font-medium leading-relaxed">
          {questao.enunciado}
        </p>

        {/* 4 Alternativas com Destaque de Resposta do Aluno vs Gabarito */}
        <div className="space-y-2.5 pt-2">
          {questao.alternativas?.map((alt, idx) => {
            const letter = CHOICE_LETTERS[idx];
            const isStudentChoice = questao.respostaSelecionada === idx;
            const isCorrectChoice = questao.correta === idx;

            let borderStyle = 'border-[var(--border-surface)] bg-[var(--bg-elevated)]';
            let label = null;

            if (isCorrectChoice) {
              borderStyle = 'border-[var(--accent-emerald)] bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald)] font-semibold';
              label = (
                <span className="text-[11px] font-bold text-[var(--accent-emerald)] ml-auto flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Gabarito Correto
                </span>
              );
            } else if (isStudentChoice && !isCorrectChoice) {
              borderStyle = 'border-[var(--accent-coral)] bg-[var(--accent-coral-bg)] text-[var(--accent-coral)]';
              label = (
                <span className="text-[11px] font-bold text-[var(--accent-coral)] ml-auto flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Sua Resposta
                </span>
              );
            }

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 text-sm ${borderStyle}`}
              >
                <span className="w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center flex-shrink-0 bg-[var(--bg-surface)] border border-current">
                  {letter}
                </span>
                <span className="flex-1 leading-snug">{alt}</span>
                {label}
              </div>
            );
          })}
        </div>

        {/* Resolução Explicada (RF62, RF126) */}
        {questao.explicacao && (
          <div className="p-4 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-surface)] space-y-1.5 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Explicação da Resolução</span>
            </div>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              {questao.explicacao}
            </p>
          </div>
        )}
      </div>

      {/* Review Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-surface)]">
        <Button
          variant="outline"
          size="sm"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className="gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onBackToResult}
        >
          Voltar ao Resumo
        </Button>

        <Button
          variant="primary"
          size="sm"
          disabled={currentIndex === total - 1}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="gap-1.5"
        >
          <span>Próxima</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </BentoCard>
  );
};

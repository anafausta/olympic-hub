import { Badge } from '../ui/Badge';
import { Star } from '../ui/SolarIcon';
import { useStudent } from '../../context/StudentContext';

const CHOICE_LETTERS = ['A', 'B', 'C', 'D', 'E'];

export const SimuladoQuestion = ({
  questao,
  questionNumber,
  totalQuestions,
  onSelectAnswer
}) => {
  const { student, toggleSavedQuestion } = useStudent();

  if (!questao) return null;

  const isFavorited = (student?.questoesSalvasIds || []).includes(questao.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleSavedQuestion(questao.id);
  };

  return (
    <div className="space-y-6">
      {/* Top Header of Question: Number, Subject Badge and Star (RF63) */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-surface)] pb-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-3 py-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs font-bold text-[var(--text-primary)]">
            Questão {questionNumber} de {totalQuestions}
          </span>
          <Badge color="cyan" size="sm">
            {questao.assunto || 'Educação Financeira'}
          </Badge>
        </div>

        {/* RF63: Marcar/Desmarcar como favorita */}
        <button
          onClick={handleToggleFavorite}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            isFavorited
              ? 'bg-[#F9CA20]/15 border-[#F9CA20]/40 text-[#F9CA20]'
              : 'bg-[var(--bg-elevated)] border-[var(--border-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          title={isFavorited ? 'Remover dos favoritos' : 'Favoritar questão'}
        >
          <Star className={`w-4 h-4 ${isFavorited ? 'fill-[#F9CA20] text-[#F9CA20]' : 'stroke-current'}`} />
          <span className="hidden sm:inline">
            {isFavorited ? 'Favoritada' : 'Favoritar'}
          </span>
        </button>
      </div>

      {/* RF53: Full Statement */}
      <div className="text-base md:text-lg font-medium text-[var(--text-primary)] leading-relaxed">
        {questao.enunciado}
      </div>

      {/* RF53: 4 Choices (A, B, C, D) with automatic state saving (RF55) */}
      <div className="space-y-3 pt-2">
        {questao.alternativas?.map((textoAlternativa, index) => {
          const isSelected = questao.respostaSelecionada === index;
          const letter = CHOICE_LETTERS[index] || String.fromCharCode(65 + index);

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectAnswer(questao.id, index)}
              className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-gradient-to-r from-[#7800D6]/20 to-transparent border-[#7800D6] shadow-md ring-1 ring-[#7800D6]'
                  : 'bg-[var(--bg-elevated)] border-[var(--border-surface)] hover:border-[var(--brand-primary)]/50 hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              {/* Option Letter Circle */}
              <span
                className={`w-8 h-8 rounded-xl font-heading font-black text-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-gradient-to-tr from-[#7800D6] to-[#2E008F] text-white shadow-sm'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-surface)]'
                }`}
              >
                {letter}
              </span>

              {/* Option Text */}
              <span
                className={`text-sm md:text-base leading-relaxed pt-1 ${
                  isSelected
                    ? 'font-bold text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {textoAlternativa}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

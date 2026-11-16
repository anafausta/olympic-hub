import { useState } from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Heart, Sparkles, CheckCircle2, RotateCcw, ArrowLeft } from 'lucide-react';

// RF85: Conexo Financeiro com 4 grupos de 4 palavras e sistema de vidas
const GROUPS = [
  {
    id: 'g1',
    categoria: 'Títulos de Renda Fixa',
    palavras: ['CDB', 'LCI', 'TESOURO', 'DEBENTURE'],
    color: 'border-emerald-500 bg-emerald-950/30 text-emerald-400'
  },
  {
    id: 'g2',
    categoria: 'Custos e Despesas do Orçamento',
    palavras: ['ALUGUEL', 'ENERGIA', 'TRANSPORTE', 'MERCADO'],
    color: 'border-amber-500 bg-amber-950/30 text-amber-400'
  },
  {
    id: 'g3',
    categoria: 'Métricas da Inflação e Moeda',
    palavras: ['IPCA', 'IGPM', 'SELIC', 'CAMBIO'],
    color: 'border-cyan-500 bg-cyan-950/30 text-cyan-400'
  },
  {
    id: 'g4',
    categoria: 'Ações e Renda Variável',
    palavras: ['DIVIDENDO', 'B3', 'CORRETORA', 'VALUATION'],
    color: 'border-purple-500 bg-purple-950/30 text-purple-400'
  }
];

export const Conexo = ({ onWin, onBack }) => {
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [lives, setLives] = useState(4); // RF85: Limite de tentativas baseado em vidas
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Unsolved words shuffled
  const remainingWords = GROUPS.filter((g) => !solvedGroups.includes(g.id))
    .flatMap((g) => g.palavras)
    .sort();

  const handleWordClick = (word) => {
    if (isGameOver) return;
    setErrorMessage('');
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      if (selectedWords.length < 4) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };

  const handleSubmitGroup = () => {
    if (selectedWords.length !== 4) return;

    // Check if these 4 match any unsolved group
    const matchedGroup = GROUPS.find((g) => {
      if (solvedGroups.includes(g.id)) return false;
      return g.palavras.every((w) => selectedWords.includes(w));
    });

    if (matchedGroup) {
      const nextSolved = [...solvedGroups, matchedGroup.id];
      setSolvedGroups(nextSolved);
      setSelectedWords([]);

      if (nextSolved.length === GROUPS.length) {
        setWon(true);
        setIsGameOver(true);
        onWin(); // +5 XP (RF82)
      }
    } else {
      // Lose 1 life
      const nextLives = lives - 1;
      setLives(nextLives);
      setSelectedWords([]);
      setErrorMessage('Grupo incorreto! Você perdeu 1 vida.');

      if (nextLives <= 0) {
        setIsGameOver(true);
        setWon(false);
      }
    }
  };

  const handleRestart = () => {
    setSolvedGroups([]);
    setSelectedWords([]);
    setLives(4);
    setIsGameOver(false);
    setWon(false);
    setErrorMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar aos Minigames</span>
        </button>

        <div className="flex items-center gap-4">
          {/* RF85: Vidas */}
          <div className="flex items-center gap-1.5" title={`${lives} vidas restantes`}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-5 h-5 transition-all ${
                  idx < lives ? 'fill-[#FF4949] text-[#FF4949]' : 'text-gray-600'
                }`}
              />
            ))}
          </div>

          <Badge color="gold" size="sm">
            <Sparkles className="w-3.5 h-3.5" /> +5 XP
          </Badge>
        </div>
      </div>

      <BentoCard variant="surface" className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-heading font-black text-[var(--text-primary)]">
            Conexo Financeiro
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Selecione 4 palavras que compartilham a mesma conexão conceitual. Cuidado com as vidas!
          </p>
        </div>

        {/* Solved Groups Display */}
        {solvedGroups.map((groupId) => {
          const group = GROUPS.find((g) => g.id === groupId);
          return (
            <div
              key={groupId}
              className={`p-4 rounded-2xl border text-center space-y-1 animate-in zoom-in-95 duration-200 ${group.color}`}
            >
              <span className="font-heading font-black text-sm uppercase tracking-wider block">
                {group.categoria}
              </span>
              <p className="text-xs opacity-90">{group.palavras.join(' • ')}</p>
            </div>
          );
        })}

        {/* Remaining Unsolved Words Grid */}
        {!isGameOver && remainingWords.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {remainingWords.map((word) => {
              const isSelected = selectedWords.includes(word);
              return (
                <button
                  key={word}
                  onClick={() => handleWordClick(word)}
                  className={`p-3.5 rounded-xl border text-center font-heading font-bold text-xs sm:text-sm transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#F9CA20] text-[#1A103C] border-[#F9CA20] scale-105 shadow-md'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-surface)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-xl bg-[#FF4949]/15 border border-[#FF4949]/30 text-xs text-[#FF4949] text-center font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Game Over Banner */}
        {isGameOver && (
          <div className="p-5 rounded-2xl border text-center space-y-3 bg-[var(--bg-elevated)]">
            {won ? (
              <div className="text-[#10B981] font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Fantástico! Você encontrou todos os 4 grupos e conquistou +5 XP!</span>
              </div>
            ) : (
              <div className="text-[#FF4949] font-bold text-sm">
                Você perdeu todas as vidas! Tente novamente para dominar as conexões.
              </div>
            )}
            <Button variant="primary" size="sm" onClick={handleRestart} className="gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </Button>
          </div>
        )}

        {/* Action Button */}
        {!isGameOver && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[var(--text-muted)]">
              {selectedWords.length} de 4 palavras selecionadas
            </span>
            <Button
              variant="primary"
              disabled={selectedWords.length !== 4}
              onClick={handleSubmitGroup}
            >
              Enviar Grupo
            </Button>
          </div>
        )}
      </BentoCard>
    </div>
  );
};

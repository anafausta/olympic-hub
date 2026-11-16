import { useState, useEffect } from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Clock, Sparkles, ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { formatSecondsToMinutes } from '../../utils/formatters';

// RF84: Caça-Palavras com limite de 5 minutos, sem dicas, horizontal/vertical/diagonal (cima->baixo e baixo->cima)
const WORDS_TO_FIND = ['JUROS', 'POUPAR', 'METAS', 'LUCRO', 'RENDA'];

// 10x10 matrix:
// - JUROS: Horizontal (row 0, cols 0..4)
// - RENDA: Horizontal (row 2, cols 1..5)
// - POUPAR: Vertical (col 9, rows 0..5)
// - METAS: Diagonal top-down (4,1)->(8,5)
// - LUCRO: Diagonal bottom-up (8,0)->(4,4)
const INITIAL_GRID = [
  ['J', 'U', 'R', 'O', 'S', 'B', 'M', 'T', 'X', 'P'],
  ['A', 'K', 'L', 'P', 'W', 'V', 'E', 'Q', 'Z', 'O'],
  ['B', 'R', 'E', 'N', 'D', 'A', 'T', 'W', 'Y', 'U'],
  ['C', 'D', 'F', 'G', 'H', 'I', 'K', 'V', 'N', 'P'],
  ['D', 'M', 'F', 'G', 'O', 'I', 'J', 'K', 'L', 'A'],
  ['P', 'Q', 'E', 'R', 'S', 'T', 'M', 'N', 'O', 'R'],
  ['Q', 'R', 'C', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  ['A', 'U', 'C', 'D', 'A', 'F', 'G', 'H', 'I', 'J'],
  ['L', 'N', 'M', 'N', 'O', 'S', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D']
];

const isContiguousLine = (cells) => {
  if (cells.length <= 1) return true;
  const dr = Math.sign(cells[1].r - cells[0].r);
  const dc = Math.sign(cells[1].c - cells[0].c);
  if (dr === 0 && dc === 0) return false;
  for (let i = 1; i < cells.length; i++) {
    if (cells[i].r - cells[i - 1].r !== dr || cells[i].c - cells[i - 1].c !== dc) {
      return false;
    }
  }
  return true;
};

export const CacaPalavras = ({ onWin, onBack }) => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCellKeys, setFoundCellKeys] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes limit (RF84)
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver]);

  const handleCellClick = (r, c) => {
    if (isGameOver) return;
    const alreadySelected = selectedCells.find((cell) => cell.r === r && cell.c === c);

    let nextCells;
    if (alreadySelected) {
      nextCells = selectedCells.filter((cell) => !(cell.r === r && cell.c === c));
    } else {
      const candidate = [...selectedCells, { r, c, char: INITIAL_GRID[r][c] }];
      nextCells = isContiguousLine(candidate)
        ? candidate
        : [{ r, c, char: INITIAL_GRID[r][c] }];
    }
    setSelectedCells(nextCells);

    // Check if current selected letters spell any word
    const forwardWord = nextCells.map((cell) => cell.char).join('');
    const backwardWord = nextCells.map((cell) => cell.char).reverse().join('');

    WORDS_TO_FIND.forEach((target) => {
      if ((forwardWord === target || backwardWord === target) && !foundWords.includes(target)) {
        const nextFound = [...foundWords, target];
        setFoundWords(nextFound);
        setFoundCellKeys((prev) => {
          const next = new Set(prev);
          nextCells.forEach((cell) => next.add(`${cell.r}-${cell.c}`));
          return next;
        });
        setSelectedCells([]);

        if (nextFound.length === WORDS_TO_FIND.length) {
          setWon(true);
          setIsGameOver(true);
          onWin(); // +5 XP (RF82)
        }
      }
    });
  };

  const handleRestart = () => {
    setSelectedCells([]);
    setFoundWords([]);
    setFoundCellKeys(new Set());
    setTimeLeft(300);
    setIsGameOver(false);
    setWon(false);
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

        <div className="flex items-center gap-3">
          <Badge color="gold" size="sm">
            <Sparkles className="w-3.5 h-3.5" /> Recompensa: +5 XP
          </Badge>

          {/* Timer: 5 minutes (RF84) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs font-mono font-bold text-[var(--text-primary)]">
            <Clock className="w-3.5 h-3.5 text-[#FF4949]" />
            <span>{formatSecondsToMinutes(timeLeft)}</span>
          </div>
        </div>
      </div>

      <BentoCard variant="surface" className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-heading font-black text-[var(--text-primary)]">
            Caça-Palavras Olímpico
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Clique nas letras em sequência (horizontal, vertical ou diagonal) para formar cada palavra. Sem dicas!
          </p>
        </div>

        {/* Word Targets to Find */}
        <div className="flex flex-wrap gap-2">
          {WORDS_TO_FIND.map((word) => {
            const isFound = foundWords.includes(word);
            return (
              <Badge
                key={word}
                color={isFound ? 'emerald' : 'secondary'}
                size="md"
                className={isFound ? 'line-through font-bold' : ''}
              >
                {isFound && <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{word}</span>
              </Badge>
            );
          })}
        </div>

        {/* 10x10 Grid */}
        <div className="flex justify-center overflow-x-auto py-2">
          <div className="grid grid-cols-10 gap-1 sm:gap-1.5 p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] select-none">
            {INITIAL_GRID.map((row, r) =>
              row.map((letter, c) => {
                const isSelected = selectedCells.some((cell) => cell.r === r && cell.c === c);
                const isFoundCell = foundCellKeys.has(`${r}-${c}`);
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    disabled={isGameOver}
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg font-heading font-bold text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#F9CA20] text-[#1A103C] scale-105 shadow-md font-black'
                        : isFoundCell
                        ? 'bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/50 font-black'
                        : 'bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--brand-primary)]/20'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Win / Game Over Banner */}
        {isGameOver && (
          <div className="p-4 rounded-2xl border text-center space-y-3 bg-[var(--bg-elevated)]">
            {won ? (
              <div className="text-[#10B981] font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Excelente! Você encontrou todas as palavras e garantiu +5 XP!</span>
              </div>
            ) : (
              <div className="text-[#FF4949] font-bold text-sm">
                O tempo de 5 minutos acabou! Tente uma nova partida para pontuar.
              </div>
            )}
            <Button variant="primary" size="sm" onClick={handleRestart} className="gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </Button>
          </div>
        )}
      </BentoCard>
    </div>
  );
};

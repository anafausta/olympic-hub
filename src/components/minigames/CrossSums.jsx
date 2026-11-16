import { useState, useEffect } from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Clock, Heart, Sparkles, CheckCircle2, RotateCcw, ArrowLeft } from 'lucide-react';
import { formatSecondsToMinutes } from '../../utils/formatters';

// RF157: Matriz NxN (3x3), números nas células, números-alvo nas bordas verticais e horizontais
// Solução única, limite de tempo e vidas perdidas por erro
const MATRIX_CONFIG = {
  grid: [
    [3, 5, 2],
    [7, 1, 4],
    [6, 8, 9]
  ],
  rowTargets: [5, 11, 14], // L0: 3+2=5; L1: 7+4=11; L2: 6+8=14
  colTargets: [16, 8, 6],  // C0: 3+7+6=16; C1: 8; C2: 2+4=6
  solution: [
    '0-0', // 3
    '0-2', // 2
    '1-0', // 7
    '1-2', // 4
    '2-0', // 6
    '2-1'  // 8
  ]
};

export const CrossSums = ({ onWin, onBack }) => {
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [confirmedCells, setConfirmedCells] = useState(new Set());
  const [lives, setLives] = useState(3); // RF157: Vidas perdidas por erro
  const [timeLeft, setTimeLeft] = useState(150); // 2.5 min
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  const handleCellClick = (r, c) => {
    if (isGameOver) return;
    const key = `${r}-${c}`;
    // RF157: Sem permitir alterar uma resposta já confirmada
    if (confirmedCells.has(key)) return;

    setSelectedCells((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleConfirmRow = (rowIndex) => {
    if (isGameOver) return;
    setErrorMsg('');

    // Check sum of selected numbers in this row
    let currentSum = 0;
    const rowSelectedKeys = [];
    MATRIX_CONFIG.grid[rowIndex].forEach((val, c) => {
      const key = `${rowIndex}-${c}`;
      if (selectedCells.has(key)) {
        currentSum += val;
        rowSelectedKeys.push(key);
      }
    });

    const target = MATRIX_CONFIG.rowTargets[rowIndex];
    const expectedRowKeys = MATRIX_CONFIG.solution.filter((k) => k.startsWith(`${rowIndex}-`));
    const matchesUniqueSolution =
      currentSum === target &&
      rowSelectedKeys.length === expectedRowKeys.length &&
      rowSelectedKeys.every((k) => expectedRowKeys.includes(k));

    if (matchesUniqueSolution) {
      // Confirm this row
      const nextConfirmed = new Set(confirmedCells);
      rowSelectedKeys.forEach((k) => nextConfirmed.add(k));
      setConfirmedCells(nextConfirmed);

      // Check win condition
      if (nextConfirmed.size === MATRIX_CONFIG.solution.length) {
        setWon(true);
        setIsGameOver(true);
        onWin(); // +5 XP (RF82)
      }
    } else {
      // Error: lose life (RF157)
      const nextLives = lives - 1;
      setLives(nextLives);
      setErrorMsg(
        currentSum !== target
          ? `Soma incorreta na linha ${rowIndex + 1} (atingiu ${currentSum}, esperado ${target}). -1 vida!`
          : `Essa combinação na linha ${rowIndex + 1} não fecha as somas das colunas. -1 vida!`
      );

      if (nextLives <= 0) {
        setIsGameOver(true);
        setWon(false);
      }
    }
  };

  const handleRestart = () => {
    setSelectedCells(new Set());
    setConfirmedCells(new Set());
    setLives(3);
    setTimeLeft(150);
    setIsGameOver(false);
    setWon(false);
    setErrorMsg('');
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
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-5 h-5 ${
                  idx < lives ? 'fill-[#FF4949] text-[#FF4949]' : 'text-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs font-mono font-bold text-[var(--text-primary)]">
            <Clock className="w-3.5 h-3.5 text-[#FF4949]" />
            <span>{formatSecondsToMinutes(timeLeft)}</span>
          </div>

          <Badge color="gold" size="sm">
            <Sparkles className="w-3.5 h-3.5" /> +5 XP
          </Badge>
        </div>
      </div>

      <BentoCard variant="surface" className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-heading font-black text-[var(--text-primary)]">
            Cross Sums Olímpico
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Selecione os números que somados atingem simultaneamente as metas das linhas (direita) e colunas (base). Confirme linha a linha!
          </p>
        </div>

        {/* Matrix Grid with Horizontal and Vertical Edge Targets */}
        <div className="overflow-x-auto py-2">
          <div className="flex flex-col items-center justify-center space-y-2.5 min-w-[310px]">
            {MATRIX_CONFIG.grid.map((row, r) => (
              <div key={r} className="flex items-center gap-2 sm:gap-3">
                {row.map((val, c) => {
                  const key = `${r}-${c}`;
                  const isSelected = selectedCells.has(key);
                  const isConfirmed = confirmedCells.has(key);

                  return (
                    <button
                      key={key}
                      onClick={() => handleCellClick(r, c)}
                      disabled={isGameOver || isConfirmed}
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl font-heading font-black text-base sm:text-lg transition-all border cursor-pointer ${
                        isConfirmed
                          ? 'bg-[#10B981] text-white border-[#10B981] shadow-md cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#F9CA20] text-[#1A103C] border-[#F9CA20] scale-105 shadow-md'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-surface)] hover:bg-[var(--bg-card-hover)]'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}

                {/* Row Target on Right Edge */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[var(--brand-primary)]/15 border border-[var(--brand-primary)]/40 text-[var(--brand-primary)] font-heading font-black text-sm sm:text-base flex flex-col items-center justify-center">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)]">Linha</span>
                  <span>{MATRIX_CONFIG.rowTargets[r]}</span>
                </div>

                {/* Confirm Row Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleConfirmRow(r)}
                  disabled={isGameOver}
                  className="text-xs px-2.5 sm:px-3"
                >
                  Checar L{r + 1}
                </Button>
              </div>
            ))}

            {/* Column Targets on Bottom Edge */}
            <div className="flex items-center gap-2 sm:gap-3 pt-1">
              {MATRIX_CONFIG.colTargets.map((colTarget, c) => (
                <div
                  key={`col-target-${c}`}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[var(--accent-cyan-bg)] border border-[var(--accent-cyan)]/40 text-[var(--accent-cyan)] font-heading font-black text-sm sm:text-base flex flex-col items-center justify-center"
                >
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)]">Col {c + 1}</span>
                  <span>{colTarget}</span>
                </div>
              ))}
              {/* Spacer matching right-edge target + button width */}
              <div className="w-12 sm:w-16" aria-hidden="true" />
              <div className="w-[74px] sm:w-[86px]" aria-hidden="true" />
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#FF4949]/15 border border-[#FF4949]/30 text-xs text-[#FF4949] text-center font-bold">
            {errorMsg}
          </div>
        )}

        {isGameOver && (
          <div className="p-4 rounded-2xl border text-center space-y-3 bg-[var(--bg-elevated)]">
            {won ? (
              <div className="text-[#10B981] font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Excelente! Você atingiu todas as metas do Cross Sums e ganhou +5 XP!</span>
              </div>
            ) : (
              <div className="text-[#FF4949] font-bold text-sm">
                Fim de jogo! Tente novamente para encontrar a combinação correta.
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

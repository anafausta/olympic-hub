import { useState, useEffect } from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Clock, HelpCircle, CheckCircle2, RotateCcw, ArrowLeft, Sparkles, XCircle } from 'lucide-react';
import { formatSecondsToMinutes } from '../../utils/formatters';

// RF83: Palavras Cruzadas com pistas em formato de perguntas/definições e dicas, limite de tempo (sem vidas)
// Termina quando todas são preenchidas ou tempo acaba, revelando ao final palavras erradas
const CROSSWORD_PUZZLES = [
  {
    words: [
      { id: 1, palavra: 'SELIC', dica: 'Taxa básica de juros da economia brasileira definida pelo Copom.', pergunta: 'Qual é a taxa básica de juros do Brasil?' },
      { id: 2, palavra: 'ACAO', dica: 'Fração do capital social de uma empresa negociada na bolsa.', pergunta: 'Menor parcela do capital de uma sociedade anônima.' },
      { id: 3, palavra: 'INFLACAO', dica: 'Aumento generalizado e contínuo dos preços na economia.', pergunta: 'Perda do poder de compra do dinheiro ao longo do tempo.' },
      { id: 4, palavra: 'POUPANCA', dica: 'Aplicação tradicional com rendimento isento de IR para pessoa física.', pergunta: 'Investimento mais popular e conservador do brasileiro.' }
    ]
  },
  {
    words: [
      { id: 1, palavra: 'JUROS', dica: 'Remuneração paga pelo uso de um dinheiro emprestado ou investido.', pergunta: 'Custo do dinheiro no tempo.' },
      { id: 2, palavra: 'CDB', dica: 'Certificado de Depósito Bancário emitido pelos bancos.', pergunta: 'Título de renda fixa privado emitido por instituições financeiras.' },
      { id: 3, palavra: 'TESOURO', dica: 'Programa de venda de títulos públicos para pessoas físicas pela internet.', pergunta: 'Onde se compram títulos garantidos pelo governo federal?' },
      { id: 4, palavra: 'DIVIDENDO', dica: 'Parcela do lucro distribuída aos acionistas de uma companhia.', pergunta: 'Lucro pago pelas empresas aos seus sócios e investidores.' }
    ]
  }
];

export const PalavrasCruzadas = ({ onWin, onBack }) => {
  // RF81: Nova partida aleatória
  const [puzzleIndex, setPuzzleIndex] = useState(() => Math.floor(Math.random() * CROSSWORD_PUZZLES.length));
  const puzzle = CROSSWORD_PUZZLES[puzzleIndex];

  const [respostas, setRespostas] = useState({});
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes limit (RF83)
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleFinish = () => {
    setIsGameOver(true);
    let allCorrect = true;
    puzzle.words.forEach((w) => {
      if ((respostas[w.id] || '').trim() !== w.palavra) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      setWon(true);
      onWin(); // +5 XP (RF82)
    } else {
      setWon(false);
    }
  };

  const handleInputChange = (wordId, val) => {
    setRespostas((prev) => ({
      ...prev,
      [wordId]: val.toUpperCase().replace(/[^A-Z]/g, '')
    }));
  };

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, handleFinish]);

  const handleRestart = () => {
    setPuzzleIndex((prev) => (prev + 1) % CROSSWORD_PUZZLES.length);
    setRespostas({});
    setSelectedWordIndex(0);
    setTimeLeft(180);
    setIsGameOver(false);
    setWon(false);
  };

  const currentWord = puzzle.words[selectedWordIndex];

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

          {/* Timer (RF83: Limite de tempo, sem vidas) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-xs font-mono font-bold text-[var(--text-primary)]">
            <Clock className="w-3.5 h-3.5 text-[#FF4949]" />
            <span>{formatSecondsToMinutes(timeLeft)}</span>
          </div>
        </div>
      </div>

      <BentoCard variant="surface" className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-heading font-black text-[var(--text-primary)]">
            Palavras Cruzadas de Investimentos
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Preencha todos os termos conceituais a partir das definições e dicas antes do tempo acabar.
          </p>
        </div>

        {/* Word Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {puzzle.words.map((w, idx) => {
            const isFilled = (respostas[w.id] || '').length === w.palavra.length;
            const isSelected = idx === selectedWordIndex;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWordIndex(idx)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold'
                    : isFilled
                    ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-surface)]'
                }`}
              >
                <span className="text-xs">Palavra {idx + 1}</span>
                <span className="block text-[10px] text-[var(--text-muted)]">
                  {w.palavra.length} letras
                </span>
              </button>
            );
          })}
        </div>

        {/* Current Active Word Definition & Hint */}
        <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F9CA20] uppercase tracking-wider">
              Pista #{selectedWordIndex + 1} ({currentWord.palavra.length} letras)
            </span>
          </div>

          <div className="space-y-1">
            <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">
              {currentWord.pergunta}
            </h5>
            <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5 pt-1">
              <HelpCircle className="w-3.5 h-3.5 text-[var(--accent-cyan)] flex-shrink-0" />
              <span>Dica: {currentWord.dica}</span>
            </p>
          </div>

          {/* Letter Inputs Box */}
          <div className="pt-2">
            <input
              type="text"
              disabled={isGameOver}
              maxLength={currentWord.palavra.length}
              value={respostas[currentWord.id] || ''}
              onChange={(e) => handleInputChange(currentWord.id, e.target.value)}
              placeholder={`Digite a palavra de ${currentWord.palavra.length} letras...`}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-surface)] text-center text-lg font-heading font-black tracking-widest text-[var(--text-primary)] uppercase focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
        </div>

        {/* RF83: Result revealing unfulfilled/wrong words at end */}
        {isGameOver && (
          <div className="p-4 rounded-2xl border space-y-3 bg-[var(--bg-elevated)]">
            <div className="flex items-center gap-2">
              {won ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  <span className="font-heading font-black text-sm text-[#10B981]">
                    Parabéns! Você acertou todas as palavras e ganhou +5 XP!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-[#FF4949]" />
                  <span className="font-heading font-black text-sm text-[#FF4949]">
                    Fim de jogo! Veja abaixo o gabarito oficial:
                  </span>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              {puzzle.words.map((w) => {
                const userRes = (respostas[w.id] || '').trim();
                const right = userRes === w.palavra;
                return (
                  <div key={w.id} className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-surface)] flex justify-between items-center">
                    <div>
                      <span className="text-[var(--text-muted)] block">Palavra {w.id}:</span>
                      <strong className="text-[var(--text-primary)] tracking-wider">{w.palavra}</strong>
                    </div>
                    <span className={right ? 'text-[#10B981] font-bold' : 'text-[#FF4949]'}>
                      {right ? '✓ Acertou' : `Você digitou: ${userRes || '(em branco)'}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          {isGameOver ? (
            <Button variant="primary" onClick={handleRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Nova Partida</span>
            </Button>
          ) : (
            <Button variant="emerald" onClick={() => handleFinish(true)} className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verificar e Concluir</span>
            </Button>
          )}
        </div>
      </BentoCard>
    </div>
  );
};

import { PageContainer } from '../components/layout/PageContainer';
import { BentoCard } from '../components/ui/BentoCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PalavrasCruzadas } from '../components/minigames/PalavrasCruzadas';
import { CacaPalavras } from '../components/minigames/CacaPalavras';
import { Conexo } from '../components/minigames/Conexo';
import { CrossSums } from '../components/minigames/CrossSums';
import { GerenteBanco } from '../components/minigames/GerenteBanco';
import { Gamepad2, Sparkles, Play, Clock } from 'lucide-react';

export const MinigamesView = ({
  gamesList,
  activeGameId,
  onSelectGame,
  onBackToList,
  onWinGame
}) => {
  return (
    <PageContainer>
      {/* If a game is active, render its component */}
      {activeGameId === 'palavras-cruzadas' && (
        <PalavrasCruzadas onWin={onWinGame} onBack={onBackToList} />
      )}
      {activeGameId === 'caca-palavras' && (
        <CacaPalavras onWin={onWinGame} onBack={onBackToList} />
      )}
      {activeGameId === 'conexo' && (
        <Conexo onWin={onWinGame} onBack={onBackToList} />
      )}
      {activeGameId === 'cross-sums' && (
        <CrossSums onWin={onWinGame} onBack={onBackToList} />
      )}
      {activeGameId === 'gerente-banco' && (
        <GerenteBanco onWin={onWinGame} onBack={onBackToList} />
      )}

      {/* If no game is active, show the free-access catalog (RF80, RF82) */}
      {!activeGameId && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-1">
                <Gamepad2 className="w-4 h-4" />
                <span>Jogos Educativos de Finanças & Investimentos</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-black text-[var(--text-primary)] tracking-tight">
                Minigames Olímpicos
              </h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Acesso livre para todos os jogos. Cada vitória concede +5 XP à sua pontuação geral.
              </p>
            </div>

            <Badge color="gold" size="md" className="self-start md:self-end font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Recompensa Fixa: +5 XP / jogo
            </Badge>
          </div>

          {/* RF80: Free Access Grid without grouping, without ranking side banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gamesList.map((game) => (
              <BentoCard
                key={game.id}
                variant="surface"
                hoverable
                onClick={() => onSelectGame(game.id)}
                className="cursor-pointer group flex flex-col justify-between h-full space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl p-2 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] group-hover:scale-110 transition-transform">
                      {game.icone}
                    </div>

                    <Badge color="gold" size="sm">
                      <Sparkles className="w-3 h-3" /> +{game.recompensaXP} XP
                    </Badge>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                      {game.subtitulo}
                    </span>
                    <h3 className="font-heading font-bold text-base md:text-lg text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors mt-0.5">
                      {game.titulo}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {game.descricao}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {game.tags?.map((t) => (
                      <Badge key={t} color="secondary" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border-surface)]/60 flex items-center justify-between">
                  <div className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Rápido</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="gap-1.5 text-xs font-bold"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Jogar Agora</span>
                  </Button>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
};

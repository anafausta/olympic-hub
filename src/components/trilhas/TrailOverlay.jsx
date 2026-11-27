import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrailActivityItem } from './TrailActivityItem';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { X, Play, Compass, CheckCircle2, Video, ExternalLink } from '../ui/SolarIcon';

export const TrailOverlay = ({ trilha, isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !trilha) return null;

  const progress = trilha.percentualConclusao ?? 0;
  const isCompleted = progress >= 100;

  // Find the current unlocked activity to continue from (RF10)
  const currentActivity =
    trilha.atividades?.find((a) => a.status === 'liberada') ||
    trilha.atividades?.[0];

  const handleSelectActivity = (atividade) => {
    const navState = {
      fromTrilhaId: trilha.id,
      atividadeId: atividade.id,
      initialGameId: atividade.referenciaId
    };
    onClose();
    // RF79: Navigate directly with track context for RF78 return
    if (atividade.tipo === 'Artigo') {
      navigate(`/artigos/${atividade.referenciaId || 'art-01'}`, { state: navState });
    } else if (atividade.tipo === 'Simulado') {
      navigate('/simulado', { state: navState });
    } else if (atividade.tipo === 'Minigame') {
      navigate('/minigames', { state: navState });
    }
  };

  const handleContinueWhereLeftOff = () => {
    if (currentActivity) {
      handleSelectActivity(currentActivity);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        // RF09: Fechamento mediante clique fora de sua área limitante
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={overlayRef}
        className="w-full md:max-w-3xl max-h-[90vh] md:max-h-[85vh] bg-[var(--bg-surface)] border border-[var(--border-surface)] rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-250"
      >
        {/* Overlay Header */}
        <div className="p-5 md:p-6 border-b border-[var(--border-surface)] flex items-start justify-between gap-4 bg-[var(--bg-elevated)]/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                {trilha.isGeral ? 'Trilha Geral do Nível' : 'Trilha Temática'}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-surface)]">
                Nível {trilha.nivel}
              </span>
              {isCompleted && (
                <Badge color="emerald" size="sm">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Concluída
                </Badge>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-heading font-black text-[var(--text-primary)]">
              {trilha.titulo}
            </h3>

            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              {trilha.descricao}
            </p>

            {/* Progress bar inside overlay */}
            <div className="pt-2 max-w-md">
              <ProgressBar
                value={progress}
                color={isCompleted ? 'emerald' : 'gold'}
                showLabel
              />
            </div>
          </div>

          {/* RF09: Botão "X" no canto superior direito */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer flex-shrink-0"
            aria-label="Fechar detalhes da trilha"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* RF10: Botão "Continuar de onde parou" EXCLUSIVAMENTE dentro do overlay */}
        <div className="px-5 md:px-6 py-3.5 bg-[var(--bg-card-hover)]/60 border-b border-[var(--border-surface)] flex items-center justify-between gap-3">
          <div className="text-xs text-[var(--text-secondary)]">
            {isCompleted ? (
              <span>Você já concluiu todas as etapas desta trilha!</span>
            ) : (
              <span>
                Próxima etapa disponível:{' '}
                <strong className="text-[var(--text-primary)]">
                  {currentActivity?.titulo || 'Início da Trilha'}
                </strong>
              </span>
            )}
          </div>

          <Button
            variant={isCompleted ? 'secondary' : 'gold'}
            size="sm"
            onClick={handleContinueWhereLeftOff}
            className="gap-2 cursor-pointer flex-shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isCompleted ? 'Revisar Primeira Etapa' : 'Continuar de onde parou'}</span>
          </Button>
        </div>

        {/* Sequential Activities List (RF11, RF12, RF13, RF14) */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-3 flex-1">
          {trilha.videoUrl && (
            <a
              href={trilha.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[var(--accent-cyan-bg)]/50 border border-[var(--accent-cyan)]/30 hover:border-[var(--accent-cyan)] flex items-center justify-between gap-3 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-cyan)] block">
                    Vídeo de Apoio da Trilha
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-[var(--text-primary)] truncate">
                    {trilha.videoTitulo || 'Assistir aula em vídeo relacionada no YouTube'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[var(--accent-cyan)] flex items-center gap-1 flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                <span>Assistir</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          )}

          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Etapas da Trilha (Fácil → Difícil)
            </h4>
            <span className="text-xs text-[var(--text-muted)]">
              {trilha.atividades?.length || 0} atividades
            </span>
          </div>

          {trilha.atividades?.map((atividade, idx) => (
            <TrailActivityItem
              key={atividade.id || idx}
              atividade={atividade}
              index={idx}
              onSelectActivity={handleSelectActivity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

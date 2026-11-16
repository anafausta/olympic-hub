import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import {
  BookOpen,
  FileCheck2,
  Gamepad2,
  Video,
  CheckCircle2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const LessonDetailModal = ({ aula, isOpen, onClose, onUpdateProgress }) => {
  const navigate = useNavigate();

  if (!aula) return null;

  const getStepIcon = (tipo) => {
    switch (tipo) {
      case 'Artigo':
        return <BookOpen className="w-5 h-5 text-[var(--accent-cyan)]" />;
      case 'Simulado':
        return <FileCheck2 className="w-5 h-5 text-[#F9CA20]" />;
      case 'Minigame':
        return <Gamepad2 className="w-5 h-5 text-[#10B981]" />;
      case 'Video':
        return <Video className="w-5 h-5 text-[#FF4949]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[var(--text-secondary)]" />;
    }
  };

  const handleExecuteEtapa = (etapa) => {
    onClose();
    if (onUpdateProgress) {
      onUpdateProgress(aula.id, etapa.id);
    }

    if (etapa.url) {
      window.open(etapa.url, '_blank');
      return;
    }

    if (etapa.link) {
      navigate(etapa.link);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={aula.titulo}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {aula.descricao}
          </p>
          <div className="pt-2">
            <ProgressBar
              value={aula.percentualConclusao}
              color={aula.percentualConclusao >= 100 ? 'emerald' : 'gold'}
              showLabel
            />
          </div>
        </div>

        {/* Sequential Steps List */}
        <div className="space-y-2.5 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Etapas Sequenciais da Aula
          </h4>

          {aula.etapas?.map((etapa, index) => (
            <div
              key={etapa.id}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                etapa.concluida
                  ? 'bg-[var(--accent-emerald-bg)] border-[var(--accent-emerald)]/30'
                  : 'bg-[var(--bg-elevated)] border-[var(--border-surface)] hover:border-[var(--brand-primary)]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-card-hover)] flex items-center justify-center flex-shrink-0">
                  {getStepIcon(etapa.tipo)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--text-muted)]">
                      {index + 1}.
                    </span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {etapa.titulo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge color="secondary" size="sm">
                      {etapa.tipo}
                    </Badge>
                    {etapa.concluida && (
                      <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Concluída
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant={etapa.concluida ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => handleExecuteEtapa(etapa)}
                className="gap-1.5 flex-shrink-0 text-xs"
              >
                <span>{etapa.concluida ? 'Revisar' : 'Iniciar'}</span>
                {etapa.url ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

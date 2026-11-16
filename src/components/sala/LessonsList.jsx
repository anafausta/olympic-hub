import { useState } from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { LessonDetailModal } from './LessonDetailModal';
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const LessonsList = ({ aulas = [], onUpdateProgress }) => {
  const [selectedAula, setSelectedAula] = useState(null);

  // RF69: Ordered from most recent to oldest
  const sortedAulas = [...aulas].sort(
    (a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
            Aulas da Turma
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Ordenadas da mais recente para a mais antiga • Sem prazo de entrega
          </p>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          {sortedAulas.length} {sortedAulas.length === 1 ? 'aula' : 'aulas'}
        </span>
      </div>

      {sortedAulas.length === 0 ? (
        <BentoCard variant="surface" className="text-center py-12">
          <div className="flex flex-col items-center justify-center space-y-2 text-[var(--text-muted)]">
            <FolderOpen className="w-10 h-10 opacity-30" />
            <p className="text-sm">Nenhuma aula enviada pelo professor até o momento.</p>
          </div>
        </BentoCard>
      ) : (
        <div className="space-y-3">
          {sortedAulas.map((aula) => {
            const isCompleted = aula.percentualConclusao >= 100 || aula.concluida;
            return (
              <BentoCard
                key={aula.id}
                variant="surface"
                className="hover:border-[var(--brand-primary)]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Publicada em {formatDate(aula.dataPublicacao)}
                    </span>
                    {isCompleted ? (
                      <Badge color="emerald" size="sm">
                        <CheckCircle2 className="w-3 h-3" /> Concluída
                      </Badge>
                    ) : (
                      <Badge color="cyan" size="sm">
                        Em andamento ({aula.percentualConclusao}%)
                      </Badge>
                    )}
                  </div>

                  <h4 className="text-base md:text-lg font-heading font-bold text-[var(--text-primary)]">
                    {aula.titulo}
                  </h4>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                    {aula.descricao}
                  </p>

                  <div className="w-full max-w-xs pt-1">
                    <ProgressBar
                      value={aula.percentualConclusao}
                      color={isCompleted ? 'emerald' : 'brand'}
                      height="h-2"
                    />
                  </div>
                </div>

                {/* Button "Continuar aula" (RF69) */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  <Button
                    variant={isCompleted ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => setSelectedAula(aula)}
                    className="gap-2 cursor-pointer"
                  >
                    <span>{isCompleted ? 'Rever Conteúdos' : 'Continuar aula'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </BentoCard>
            );
          })}
        </div>
      )}

      {/* Modal with Sequential Lesson Content (RF69) */}
      {selectedAula && (
        <LessonDetailModal
          aula={selectedAula}
          isOpen={!!selectedAula}
          onClose={() => setSelectedAula(null)}
          onUpdateProgress={onUpdateProgress}
        />
      )}
    </div>
  );
};

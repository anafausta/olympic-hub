import { useNavigate } from 'react-router-dom';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Users, MessageSquare, GraduationCap } from '../ui/SolarIcon';

export const SalaHeader = ({ sala }) => {
  const navigate = useNavigate();

  return (
    <BentoCard variant="surface">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7800D6] to-[#2E008F] flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-[#7800D6]/20">
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge color="cyan" size="sm">
                Nível {sala?.nivel || 2} ({sala?.anoEscolar || '8º e 9º Ano'})
              </Badge>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Código: {sala?.hash || 'OLY-802-FIN'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-heading font-black text-[var(--text-primary)]">
              {sala?.nome || 'Turma 802 — Finanças Olímpicas'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] flex-wrap">
              <GraduationCap className="w-4 h-4 text-[#F9CA20]" />
              <span>
                Professores responsáveis:{' '}
                <strong className="text-[var(--text-primary)]">
                  {sala?.professores?.map((p) => p.nome).join(' e ') || 'Profª. Mariana Albuquerque'}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Button "Fórum da Sala" (RF71) */}
        <Button
          variant="primary"
          onClick={() => navigate('/forum')}
          className="self-start md:self-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Fórum de Dúvidas da Sala</span>
        </Button>
      </div>
    </BentoCard>
  );
};

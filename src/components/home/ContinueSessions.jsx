import { useNavigate } from 'react-router-dom';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Gamepad2, BookOpen, GraduationCap, ArrowRight } from '../ui/SolarIcon';

export const ContinueSessions = ({ lastActivity }) => {
  const navigate = useNavigate();

  const sessions = [
    {
      title: 'Último Minigame Acessado',
      itemTitle: lastActivity?.minigame?.titulo || 'Gerente de Banco',
      category: 'Jogo Rápido (+5 XP)',
      icon: Gamepad2,
      accentColor: 'text-[#10B981]',
      accentBg: 'bg-[#10B981]/15',
      buttonLabel: 'Jogar Minigame',
      targetUrl: '/minigames'
    },
    {
      title: 'Último Artigo Lido',
      itemTitle: lastActivity?.artigo?.titulo || 'Juros Compostos e a Força do Tempo',
      category: 'Artigo / Wiki',
      icon: BookOpen,
      accentColor: 'text-[var(--accent-cyan)]',
      accentBg: 'bg-[var(--accent-cyan-bg)]',
      buttonLabel: 'Continuar Leitura',
      targetUrl: lastActivity?.artigo?.url || '/artigos'
    },
    {
      title: 'Última Aula / Trilha',
      itemTitle: lastActivity?.aula?.titulo || 'Aula 03: Risco x Retorno e o Perfil do Investidor',
      category: 'Turma 802',
      icon: GraduationCap,
      accentColor: 'text-[#F9CA20]',
      accentBg: 'bg-[#F9CA20]/15',
      buttonLabel: 'Continuar Aula',
      targetUrl: '/sala'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-bold text-[var(--text-primary)]">
          Continue da onde parou
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessions.map((session, idx) => {
          const Icon = session.icon;
          return (
            <BentoCard
              key={idx}
              variant="surface"
              className="flex flex-col justify-between h-full space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {session.title}
                  </span>
                  <div className={`w-8 h-8 rounded-xl ${session.accentBg} ${session.accentColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[var(--brand-primary)]">
                    {session.category}
                  </span>
                  <h4 className="text-base font-heading font-bold text-[var(--text-primary)] mt-1 line-clamp-2 leading-snug">
                    {session.itemTitle}
                  </h4>
                </div>
              </div>

              {/* Button at the end of each session (RF28) */}
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => navigate(session.targetUrl)}
                className="justify-between group cursor-pointer hover:border-[var(--brand-primary)]"
              >
                <span>{session.buttonLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </BentoCard>
          );
        })}
      </div>
    </div>
  );
};

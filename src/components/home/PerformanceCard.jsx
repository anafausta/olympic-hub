import { BentoCard } from '../ui/BentoCard';
import { formatXP, formatPercentage } from '../../utils/formatters';
import {
  TrendingUp,
  Sparkles,
  Trophy,
  CheckCircle2,
  FileCheck2,
  Target
} from 'lucide-react';

export const PerformanceCard = ({ student }) => {
  const taxaAcerto =
    student?.exerciciosRespondidos > 0
      ? Math.round((student.exerciciosAcertados / student.exerciciosRespondidos) * 100)
      : 84;

  const stats = [
    {
      label: 'Taxa de Acertos',
      value: formatPercentage(taxaAcerto),
      subtext: `${student?.exerciciosAcertados || 38} de ${student?.exerciciosRespondidos || 45} exercícios`,
      color: 'text-[var(--accent-emerald)]',
      bg: 'bg-[var(--accent-emerald-bg)]',
      icon: TrendingUp
    },
    {
      label: 'Pontuação Geral',
      value: formatXP(student?.xp || 0),
      subtext: 'Pontos acumulados na plataforma',
      color: 'text-[var(--accent-gold)]',
      bg: 'bg-[var(--accent-gold-bg)]',
      icon: Sparkles
    },
    {
      label: 'Posição no Ranking',
      value: `${student?.posicaoRanking || 4}º Lugar`,
      subtext: 'Entre os colegas da sua turma',
      color: 'text-[var(--accent-gold)]',
      bg: 'bg-[var(--accent-gold-bg)]',
      icon: Trophy
    },
    {
      label: 'Simulados Realizados',
      value: student?.simuladosRealizados || 6,
      subtext: 'Testes de múltipla escolha finalizados',
      color: 'text-[var(--accent-cyan)]',
      bg: 'bg-[var(--accent-cyan-bg)]',
      icon: FileCheck2
    },
    {
      label: 'Exercícios Respondidos',
      value: student?.exerciciosRespondidos || 45,
      subtext: 'Total de questões resolvidas',
      color: 'text-[var(--accent-lilac)]',
      bg: 'bg-[var(--accent-lilac-bg)]',
      icon: Target
    },
    {
      label: 'Exercícios Acertados',
      value: student?.exerciciosAcertados || 38,
      subtext: 'Resoluções corretas confirmadas',
      color: 'text-[var(--accent-emerald)]',
      bg: 'bg-[var(--accent-emerald-bg)]',
      icon: CheckCircle2
    }
  ];

  return (
    <BentoCard variant="surface">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-surface)] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-cyan-bg)] text-[var(--accent-cyan)] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
              Meu Desempenho Geral
            </h3>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            Atualizado em tempo real
          </span>
        </div>

        {/* 6 Grid Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-1">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-3.5 md:p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] flex flex-col justify-between hover:border-[var(--brand-primary)]/40 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[var(--text-secondary)] line-clamp-1">
                    {stat.label}
                  </span>
                  <div className={`w-7 h-7 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className={`text-xl md:text-2xl font-heading font-black tracking-tight ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-1 line-clamp-1">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
};

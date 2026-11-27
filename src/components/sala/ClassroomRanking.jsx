import { BentoCard } from '../ui/BentoCard';
import { formatXP } from '../../utils/formatters';
import { computeRankingWithStudent } from '../../services/salaService';
import { Trophy, Sparkles } from '../ui/SolarIcon';

export const ClassroomRanking = ({ ranking = [], currentStudent }) => {
  // Unify XP & ranking position with current student's live XP
  const syncedRanking = computeRankingWithStudent(ranking, currentStudent);

  // RF65: Exactly 5 slots. If fewer, empty slots remain.
  const top5 = [];
  for (let i = 1; i <= 5; i++) {
    const studentAtPos = syncedRanking.find((r) => r.posicao === i);
    top5.push(studentAtPos || null);
  }

  // RF66: Check if current student is outside top 5
  const currentStudentRecord = syncedRanking.find((r) => r.isCurrentUser);
  const isOutsideTop5 = currentStudentRecord && currentStudentRecord.posicao > 5;

  const getPositionBadge = (pos) => {
    if (pos === 1) return <span className="w-6 h-6 rounded-full bg-[#F9CA20] text-[#1A103C] font-black text-xs flex items-center justify-center">1º</span>;
    if (pos === 2) return <span className="w-6 h-6 rounded-full bg-slate-300 text-[#1A103C] font-black text-xs flex items-center justify-center">2º</span>;
    if (pos === 3) return <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center">3º</span>;
    return <span className="w-6 h-6 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-bold text-xs flex items-center justify-center border border-[var(--border-surface)]">{pos}º</span>;
  };

  return (
    <BentoCard variant="surface" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[var(--border-surface)] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[var(--accent-gold-bg)] text-[var(--accent-gold)] flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base md:text-lg text-[var(--text-primary)]">
              Ranking da Sala — Top 5
            </h3>
            <p className="text-[11px] text-[var(--text-muted)]">
              +10 XP Simulado, +5 XP Minigame, +10 XP por etapa ao concluir trilha
            </p>
          </div>
        </div>
      </div>

      {/* Top 5 List */}
      <div className="space-y-2">
        {top5.map((item, index) => {
          const position = index + 1;
          if (!item) {
            // Empty slot (RF65)
            return (
              <div
                key={`empty-${position}`}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)]/40 border border-dashed border-[var(--border-surface)] opacity-50"
              >
                <div className="flex items-center gap-3">
                  {getPositionBadge(position)}
                  <span className="text-xs text-[var(--text-muted)] italic">
                    Espaço vago
                  </span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">—</span>
              </div>
            );
          }

          const isCurrent = item.isCurrentUser;

          return (
            <div
              key={item.posicao}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-gradient-to-r from-[#7800D6]/20 to-transparent border-[#7800D6]/60 shadow-sm'
                  : 'bg-[var(--bg-elevated)] border-[var(--border-surface)]'
              }`}
            >
              <div className="flex items-center gap-3">
                {getPositionBadge(item.posicao)}
                <div className="flex items-center gap-2">
                  {/* NO AVATARS PER RF130! Only Name */}
                  <span
                    className={`text-sm font-semibold ${
                      isCurrent ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {item.nome}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-primary)] text-white font-bold">
                      Você
                    </span>
                  )}
                </div>
              </div>

              {/* XP in Gold */}
              <div className="flex items-center gap-1.5 font-heading font-black text-sm text-[var(--accent-gold)]">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{formatXP(item.xp)}</span>
              </div>
            </div>
          );
        })}

        {/* RF66: Additional line if current student is outside Top 5 */}
        {isOutsideTop5 && currentStudentRecord && (
          <div className="pt-2">
            <div className="text-[11px] text-[var(--text-muted)] mb-1 uppercase tracking-wider text-center">
              Sua Colocação Atual
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#7800D6]/20 to-[var(--bg-elevated)] border border-[#7800D6] shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white font-black text-xs flex items-center justify-center">
                  {currentStudentRecord.posicao}º
                </span>
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  {currentStudentRecord.nome}{' '}
                  <span className="text-xs font-normal text-[var(--text-secondary)]">(Você)</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-heading font-black text-sm text-[var(--accent-gold)]">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{formatXP(currentStudentRecord.xp)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </BentoCard>
  );
};

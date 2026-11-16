import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import {
  Mail,
  GraduationCap,
  Lock,
  Edit2,
  Sparkles,
  Trophy
} from 'lucide-react';
import { formatXP } from '../../utils/formatters';

export const ProfileInfo = ({
  student,
  onOpenAvatarPicker,
  onOpenEmailEdit
}) => {
  return (
    <BentoCard variant="surface" className="p-6 md:p-8 space-y-6">
      {/* Top Profile Summary */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-[var(--border-surface)] pb-6 text-center sm:text-left">
        {/* Avatar with click to change (RF130) */}
        <div className="relative group cursor-pointer" onClick={onOpenAvatarPicker}>
          <Avatar avatarId={student?.avatarId || 3} size="xl" className="ring-4 ring-[var(--brand-primary)]/40 group-hover:scale-105 transition-transform" />
          <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold">
            Trocar
          </div>
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <h2 className="text-xl md:text-2xl font-heading font-black text-[var(--text-primary)]">
              {student?.nome || 'Aluno'}
            </h2>
            <Badge color="gold" size="sm">
              <Trophy className="w-3 h-3" /> {student?.posicaoRanking || 4}º no Ranking
            </Badge>
          </div>

          <p className="text-xs md:text-sm text-[var(--text-secondary)] flex items-center justify-center sm:justify-start gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
            <span>{student?.email}</span>
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> {formatXP(student?.xp || 0)}
            </span>
            <span className="text-xs text-[var(--text-muted)]">•</span>
            <span className="text-xs text-[var(--text-muted)]">
              {student?.simuladosRealizados || 6} simulados realizados
            </span>
          </div>
        </div>

        {/* Edit Button: Opens Email Edit (RF131) */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenEmailEdit}
          className="gap-2 cursor-pointer self-center sm:self-start"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Editar Perfil</span>
        </Button>
      </div>

      {/* RF129 & RF131: Detailed Fields (Locked School Data vs Editable Email) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">
            Informações Escolares & Cadastro
          </h4>
          <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#FF4949]" />
            Dados escolares bloqueados para edição
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Nome (Bloqueado) */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-1">
            <span className="text-[var(--text-muted)] font-semibold flex items-center justify-between">
              <span>Nome Completo</span>
              <Lock className="w-3 h-3 text-gray-500" />
            </span>
            <p className="font-bold text-sm text-[var(--text-primary)]">{student?.nome}</p>
            <span className="text-[10px] text-[var(--text-muted)]">Alterável apenas pelo professor</span>
          </div>

          {/* E-mail (Editável via modal) */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--brand-primary)]/40 space-y-1">
            <span className="text-[var(--text-muted)] font-semibold flex items-center justify-between">
              <span>E-mail de Acesso</span>
              <span className="text-[10px] text-[var(--brand-primary)] font-bold">Editável</span>
            </span>
            <p className="font-bold text-sm text-[var(--text-primary)]">{student?.email}</p>
            <span className="text-[10px] text-[var(--text-muted)]">Utilizado para notificações e recuperação</span>
          </div>

          {/* Ano Escolar (Bloqueado) */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-1">
            <span className="text-[var(--text-muted)] font-semibold flex items-center justify-between">
              <span>Ano / Série Escolar</span>
              <Lock className="w-3 h-3 text-gray-500" />
            </span>
            <p className="font-bold text-sm text-[var(--text-primary)]">{student?.anoEscolar}</p>
            <span className="text-[10px] text-[var(--text-muted)]">Nível {student?.nivel} (OBEF)</span>
          </div>

          {/* Escola (Bloqueado) */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-1">
            <span className="text-[var(--text-muted)] font-semibold flex items-center justify-between">
              <span>Instituição / Escola</span>
              <Lock className="w-3 h-3 text-gray-500" />
            </span>
            <p className="font-bold text-sm text-[var(--text-primary)]">{student?.escola}</p>
            <span className="text-[10px] text-[var(--text-muted)]">Rede Pública Estadual</span>
          </div>

          {/* Sala (Bloqueado) */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-1">
            <span className="text-[var(--text-muted)] font-semibold flex items-center justify-between">
              <span>Turma / Sala</span>
              <Lock className="w-3 h-3 text-gray-500" />
            </span>
            <p className="font-bold text-sm text-[var(--text-primary)]">{student?.salaNome}</p>
            <span className="text-[10px] text-[var(--text-muted)]">Identificador: {student?.salaId}</span>
          </div>

          {/* Professores Responsáveis */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-1">
            <span className="text-[var(--text-muted)] font-semibold flex items-center justify-between">
              <span>Professores Responsáveis</span>
              <GraduationCap className="w-3.5 h-3.5 text-[#F9CA20]" />
            </span>
            <p className="font-bold text-sm text-[var(--text-primary)]">
              {student?.professores?.join(', ') || 'Profª. Mariana e Prof. Carlos'}
            </p>
            <span className="text-[10px] text-[var(--text-muted)]">Orientadores da olimpíada</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

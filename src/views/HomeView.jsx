import { PageContainer } from '../components/layout/PageContainer';
import { OlympicBanner } from '../components/home/OlympicBanner';
import { GeneralTrailCard } from '../components/home/GeneralTrailCard';
import { PerformanceCard } from '../components/home/PerformanceCard';
import { ContinueSessions } from '../components/home/ContinueSessions';
import { HomeTabs } from '../components/home/HomeTabs';
import { Sparkles } from 'lucide-react';

export const HomeView = ({ student, trilhaGeral, loading }) => {
  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7800D6]" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Welcome Header (RF41) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Área do Aluno — Experiência Logada</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight text-[var(--text-primary)]">
            Olá, {student?.nome || 'Estudante'}! 👋
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1">
            Matriculado no <strong className="text-[var(--text-primary)]">{student?.anoEscolar || '8º Ano - Ensino Fundamental'}</strong> na{' '}
            <span className="text-[var(--brand-primary)] font-semibold">{student?.escola || 'Escola Olímpica'}</span>.
          </p>
        </div>
      </div>

      {/* Official Olympic Banner (RF38) */}
      <OlympicBanner />

      {/* General Track Highlight (RF33 - RF37) */}
      <GeneralTrailCard trilhaGeral={trilhaGeral} />

      {/* Unified Performance Bento Card (RF29, RF32, RF42 - RF46) */}
      <PerformanceCard student={student} />

      {/* 3 Continue Where You Left Off Sessions (RF28) */}
      <ContinueSessions lastActivity={student?.lastActivity} />

      {/* Bottom Tabs: Achievements, Saved Questions, Saved Articles, Trail History (RF30, RF31, RF47, RF108) */}
      <HomeTabs />
    </PageContainer>
  );
};

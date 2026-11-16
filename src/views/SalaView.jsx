import { PageContainer } from '../components/layout/PageContainer';
import { SalaHeader } from '../components/sala/SalaHeader';
import { ClassroomRanking } from '../components/sala/ClassroomRanking';
import { LessonsList } from '../components/sala/LessonsList';

export const SalaView = ({ sala, currentStudent, onUpdateLessonProgress, loading }) => {
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
      {/* Classroom Header with Turma, Nível, and Fórum da Sala button (RF71) */}
      <SalaHeader sala={sala} />

      {/* 2-Column Bento layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Lessons List from most recent to oldest (RF69) */}
        <div className="lg:col-span-2">
          <LessonsList
            aulas={sala?.aulas || []}
            onUpdateProgress={onUpdateLessonProgress}
          />
        </div>

        {/* Right Column: Classroom Top 5 Ranking without avatars (RF65, RF66, RF67, RF130) */}
        <div className="lg:col-span-1">
          <ClassroomRanking
            ranking={sala?.ranking || []}
            currentStudent={currentStudent}
          />
        </div>
      </div>
    </PageContainer>
  );
};

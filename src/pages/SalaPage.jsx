import { useState, useEffect } from 'react';
import { SalaView } from '../views/SalaView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { salaService } from '../services/salaService';

export const SalaPage = () => {
  const { student } = useStudent();
  const { setBreadcrumbs } = useNavigation();
  const [sala, setSala] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Home', path: '/' },
      { label: 'Minha Sala', path: '/sala' }
    ]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchSala = async () => {
      try {
        const data = await salaService.getSalaData();
        setSala(data);
      } catch (err) {
        console.error('Error fetching sala data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSala();
  }, []);

  const handleUpdateLessonProgress = async (aulaId, etapaId) => {
    try {
      const updated = await salaService.updateAulaProgress(aulaId, etapaId);
      setSala({ ...updated });
    } catch (err) {
      console.error('Error updating lesson progress', err);
    }
  };

  return (
    <SalaView
      sala={sala}
      currentStudent={student}
      onUpdateLessonProgress={handleUpdateLessonProgress}
      loading={loading}
    />
  );
};

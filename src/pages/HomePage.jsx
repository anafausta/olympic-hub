import { useState, useEffect } from 'react';
import { HomeView } from '../views/HomeView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { trilhasService } from '../services/trilhasService';

export const HomePage = () => {
  const { student, loading } = useStudent();
  const { setBreadcrumbs } = useNavigation();
  const [trilhaGeral, setTrilhaGeral] = useState(null);

  useEffect(() => {
    setBreadcrumbs([{ label: 'Home', path: '/' }]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchTrilhaGeral = async () => {
      try {
        const nivel = student?.nivel || 2;
        const trilhas = await trilhasService.getTrilhasByNivel(nivel);
        const geral = trilhas.find((t) => t.isGeral) || trilhas[0];
        setTrilhaGeral(geral);
      } catch (err) {
        console.error('Error fetching general trail', err);
      }
    };

    fetchTrilhaGeral();
  }, [student]);

  return <HomeView student={student} trilhaGeral={trilhaGeral} loading={loading} />;
};

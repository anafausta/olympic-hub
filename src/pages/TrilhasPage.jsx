import { useState, useEffect } from 'react';
import { TrilhasView } from '../views/TrilhasView';
import { useStudent } from '../context/StudentContext';
import { useNavigation } from '../context/NavigationContext';
import { useTrilhaFilter } from '../hooks/useTrilhaFilter';
import { trilhasService } from '../services/trilhasService';

export const TrilhasPage = () => {
  const { student, activeOverlayTrilhaId, setActiveOverlayTrilhaId } = useStudent();
  const { setBreadcrumbs } = useNavigation();

  const [allTrilhas, setAllTrilhas] = useState([]);
  const [selectedTrilha, setSelectedTrilha] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const studentLevel = student?.nivel || 2;

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Home', path: '/' },
      { label: 'Trilhas', path: '/trilhas' }
    ]);
  }, [setBreadcrumbs]);

  // Load trails
  useEffect(() => {
    const loadTrilhas = async () => {
      try {
        const data = await trilhasService.getAllTrilhas();
        setAllTrilhas(data);

        // RF78: If returning from an activity with an active overlay requested
        if (activeOverlayTrilhaId) {
          const target = data.find((t) => t.id === activeOverlayTrilhaId);
          if (target) {
            setSelectedTrilha(target);
            setIsOverlayOpen(true);
          }
          // Clear after opening
          setActiveOverlayTrilhaId(null);
        }
      } catch (err) {
        console.error('Error loading trilhas', err);
      }
    };

    loadTrilhas();
  }, [activeOverlayTrilhaId, setActiveOverlayTrilhaId]);

  const {
    searchTerm,
    setSearchTerm,
    availableTags,
    selectedTags,
    toggleTag,
    clearFilters,
    filteredAndSortedTrilhas,
    isEmpty,
    hasActiveFilters
  } = useTrilhaFilter(allTrilhas, studentLevel);

  const handleOpenOverlay = (trilha) => {
    setSelectedTrilha(trilha);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedTrilha(null);
  };

  return (
    <TrilhasView
      studentLevel={studentLevel}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      availableTags={availableTags}
      selectedTags={selectedTags}
      toggleTag={toggleTag}
      clearFilters={clearFilters}
      filteredAndSortedTrilhas={filteredAndSortedTrilhas}
      isEmpty={isEmpty}
      hasActiveFilters={hasActiveFilters}
      selectedTrilha={selectedTrilha}
      isOverlayOpen={isOverlayOpen}
      onOpenOverlay={handleOpenOverlay}
      onCloseOverlay={handleCloseOverlay}
    />
  );
};

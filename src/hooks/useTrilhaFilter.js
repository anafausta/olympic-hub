import { useState, useMemo } from 'react';
import { sortTrilhas } from '../utils/sortTrilhas';

export const useTrilhaFilter = (allTrilhas = [], studentLevel = 2) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // RF72: Filter strictly by student level
  const levelTrilhas = useMemo(() => {
    return allTrilhas.filter((t) => t.nivel === studentLevel);
  }, [allTrilhas, studentLevel]);

  // Extract all available tags in level
  const availableTags = useMemo(() => {
    const set = new Set();
    levelTrilhas.forEach((t) => (t.tags || []).forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [levelTrilhas]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  // Filter by search and tags, then apply strict RF74 sorting
  const filteredAndSortedTrilhas = useMemo(() => {
    let result = [...levelTrilhas];

    // RF75: Search strictly on title
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter((t) => t.titulo.toLowerCase().includes(q));
    }

    // RF76: Multiple tag filter
    if (selectedTags.length > 0) {
      result = result.filter((t) =>
        selectedTags.some((tag) => (t.tags || []).includes(tag))
      );
    }

    // RF74: Strict sorting: in-progress -> not-started -> completed
    return sortTrilhas(result);
  }, [levelTrilhas, searchTerm, selectedTags]);

  return {
    searchTerm,
    setSearchTerm,
    selectedTags,
    toggleTag,
    clearFilters,
    availableTags,
    filteredAndSortedTrilhas,
    hasActiveFilters: searchTerm.trim() !== '' || selectedTags.length > 0,
    isEmpty: filteredAndSortedTrilhas.length === 0
  };
};

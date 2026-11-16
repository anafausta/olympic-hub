import { useState, useMemo } from 'react';
import { filterArtigos } from '../utils/filterArtigos';

export const useArtigoSearch = (allArtigos = []) => {
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // RF99: Trigger search exclusively upon pressing "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAppliedSearchQuery(searchInput);
    }
  };

  const handleSelectTag = (tag) => {
    if (!tag || tag === 'Nenhum filtro' || tag === 'all') {
      setSelectedTags([]);
      return;
    }
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => {
    setSearchInput('');
    setAppliedSearchQuery('');
    setSelectedTags([]);
  };

  const filteredArtigos = useMemo(() => {
    return filterArtigos({
      artigos: allArtigos,
      searchQuery: appliedSearchQuery,
      selectedTags
    });
  }, [allArtigos, appliedSearchQuery, selectedTags]);

  return {
    searchInput,
    setSearchInput,
    appliedSearchQuery,
    handleKeyDown,
    selectedTags,
    handleSelectTag,
    clearAll,
    filteredArtigos,
    totalCount: filteredArtigos.length,
    hasFilters: appliedSearchQuery.trim() !== '' || selectedTags.length > 0
  };
};

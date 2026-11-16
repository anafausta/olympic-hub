import { useState, useEffect, useMemo } from 'react';
import { ArtigosView } from '../views/ArtigosView';
import { useNavigation } from '../context/NavigationContext';
import { useArtigoSearch } from '../hooks/useArtigoSearch';
import { artigosService } from '../services/artigosService';

const ITEMS_PER_PAGE = 6; // RF98: Quantidade adequada à navegação

export const ArtigosPage = () => {
  const { setBreadcrumbs } = useNavigation();
  const [allArtigos, setAllArtigos] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // RF97: Retorno à página recarrega normalmente
    setBreadcrumbs([
      { label: 'Home', path: '/' },
      { label: 'Artigos / Wiki', path: '/artigos' }
    ]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artigosData, tagsData] = await Promise.all([
          artigosService.getAllArtigos(),
          artigosService.getAvailableTags()
        ]);
        setAllArtigos(artigosData);
        setAvailableTags(tagsData);
      } catch (err) {
        console.error('Error fetching articles', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    searchInput,
    setSearchInput,
    appliedSearchQuery,
    handleKeyDown,
    selectedTags,
    handleSelectTag,
    clearAll,
    filteredArtigos,
    totalCount,
    hasFilters
  } = useArtigoSearch(allArtigos);

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedSearchQuery, selectedTags]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  const paginatedArtigos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArtigos.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArtigos, currentPage]);

  const clearSearch = () => {
    setSearchInput('');
    clearAll();
  };

  return (
    <ArtigosView
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      appliedSearchQuery={appliedSearchQuery}
      handleKeyDown={handleKeyDown}
      clearSearch={clearSearch}
      availableTags={availableTags}
      selectedTags={selectedTags}
      handleSelectTag={handleSelectTag}
      clearAll={clearAll}
      paginatedArtigos={paginatedArtigos}
      totalCount={totalCount}
      hasFilters={hasFilters}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      loading={loading}
    />
  );
};

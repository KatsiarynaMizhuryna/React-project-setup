import { useCallback, useState } from 'react';
import { Character } from '../../models';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Search from '../../components/Search/Search';
import Results from '../../components/Results/Results';
import { useSearchParams } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchResults = useCallback((results: Character[]) => {
    setSearchResults(results);
    setIsLoading(false);
  }, []);

  const handleLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setSearchParams({ page: page.toString() });
    },
    [setSearchParams]
  );

  const updateTotalPages = useCallback((pages: number) => {
    setTotalPages(pages);
  }, []);

  return (
    <div>
      <ErrorBoundary>
        <Search
          renderResults={updateSearchResults}
          updateTotalPages={updateTotalPages}
          handleLoading={handleLoading}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Results
          results={searchResults}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </ErrorBoundary>
    </div>
  );
};

export default MainPage;

import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Character } from '../../models';
import logo from '../../assets/rick-and-morty.png';
import ErrorButton from '../ErrorButton/ErrorButton';
import useSearchQuery from '../../hooks/useSearchQuery';

interface SearchProps {
  renderResults: (results: Character[]) => void;
  updateTotalPages: (totalPages: number) => void;
  handleLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Search: React.FC<SearchProps> = ({
  renderResults,
  updateTotalPages,
  handleLoading,
  isLoading,
  currentPage,
  setCurrentPage,
}) => {
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem('searchTerm') || ''
  );
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(searchTerm);

  const fetchData = useCallback(
    async (page: number, query: string) => {
      handleLoading(true);
      const trimmedSearchItem = query.trim();
      let apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;

      if (trimmedSearchItem) {
        apiUrl += `&name=${trimmedSearchItem}`;
      }

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.results) {
          renderResults(data.results);
          updateTotalPages(data.info.pages);
          localStorage.setItem('searchTerm', trimmedSearchItem);
        } else {
          renderResults([]);
          updateTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        renderResults([]);
        updateTotalPages(1);
      } finally {
        handleLoading(false);
      }
    },
    [handleLoading, renderResults, updateTotalPages]
  );

  useEffect(() => {
    fetchData(currentPage, submittedSearchTerm);
  }, [currentPage, submittedSearchTerm, fetchData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setSubmittedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  return (
    <div className="search-bar">
      <img src={logo} alt="rick-and-morty logo" width={150} />
      <ErrorButton />
      <div>
        <input
          type="text"
          placeholder="Search character..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className="search-bar-button"
          onClick={handleSearch}
          disabled={isLoading}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;

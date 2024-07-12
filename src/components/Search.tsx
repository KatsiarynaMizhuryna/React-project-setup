import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Character } from '../models';
import logo from '../assets/rick-and-morty.png';
import ErrorButton from './ErrorButton';

interface SearchProps {
  renderResults: (results: Character[]) => void;
}

const Search: React.FC<SearchProps> = ({ renderResults }) => {
  const [searchCard, setSearchCard] = useState<string>(localStorage.getItem('searchTerm') || '');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const trimmedSearchItem = searchCard.trim();
    let apiUrl = `https://rickandmortyapi.com/api/character/`;

    if (trimmedSearchItem) {
      apiUrl += `?name=${trimmedSearchItem}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      renderResults(data.results);
      localStorage.setItem('searchTerm', trimmedSearchItem);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false);
  }, [searchCard, setIsLoading, renderResults]);

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
    
  }, [isLoading,fetchData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCard(event.target.value.trim());
  };

  return (
    <div className="search-bar">
      <img src={logo} alt="rick-and-morty logo" width={150} />
      <ErrorButton />
      <div>
        <input
          type="text"
          placeholder="Search character..."
          value={searchCard}
          onChange={handleInputChange}
        />
        <button
          className="search-bar-button"
          onClick={fetchData}
          disabled={isLoading}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;

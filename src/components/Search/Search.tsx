import React, { useState, useEffect } from 'react';
import logo from '../../assets/rick-and-morty.png';
import ErrorButton from '../ErrorButton/ErrorButton';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialSearch: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialSearch }) => {
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = () => {
    const trimmedSearch = search.trim();
    localStorage.setItem('searchTerm', trimmedSearch);
    onSearch(trimmedSearch);
  };

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  return (
    <div className={styles.search_bar}>
      <img src={logo} alt="rick-and-morty logo" width={150} />
      <ErrorButton />
      <div>
        <input
          type="text"
          value={search}
          placeholder="Search character..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;

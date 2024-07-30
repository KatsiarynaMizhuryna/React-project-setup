import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../../public/rick-and-morty.png';
import ErrorButton from '../ErrorButton/ErrorButton';
import styles from './Search.module.css';
import { useTheme } from '../switchTheme/ThemeContext';
import ThemeSwitcher from '../switchTheme/ThemeSwitcher';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialSearch: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialSearch }) => {
  const [search, setSearch] = useState(initialSearch);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSearch = () => {
    const trimmedSearch = search.trim();
    localStorage.setItem('searchTerm', trimmedSearch);
    onSearch(trimmedSearch);
  };

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  return (
    <div className={styles.searchBar}>
      <Image src={logo} alt="rick-and-morty logo" width={150} height={150} />
      <ErrorButton />
      <div>
        <input
          type="text"
          value={search}
          placeholder="Search character..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.searchBarBtn} onClick={handleSearch}>
          Search
        </button>
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default Search;

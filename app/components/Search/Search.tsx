import React, { useState } from 'react';
import styles from './Search.module.css';
import logo from '../../assets/rick-and-morty.png';
import { useNavigate, useSearchParams } from '@remix-run/react';
import ErrorButton from '../ErrorButton/ErrorButton';
import ThemeSwitcher from '../../switchTheme/ThemeSwitcher';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  initialSearch: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialSearch }) => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || initialSearch
  );

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(searchParams);
    const trimmedSearch = searchTerm.trim();
    console.log(trimmedSearch);
    onSearch(trimmedSearch);
    navigate(`/?search=${trimmedSearch}`);
  };

  return (
    <div className={styles.searchBar}>
      <img src={logo} alt="rick-and-morty logo" width={150} />
      <ErrorButton />
      <div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search character..."
          onChange={(e) => setSearchTerm(e.target.value)}
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

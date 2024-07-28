import React, { useState } from 'react';
import Search from '../../components/Search/Search';
import Results from '../../components/Results/Results';
import Flyout from '../../components/Flyout/flyout';

const MainPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem('searchTerm') || ''
  );

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <Search onSearch={handleSearch} initialSearch={searchTerm} />
      <Results
        page={page}
        searchTerm={searchTerm}
        onPageChange={handlePageChange}
      />
      <Flyout />
    </div>
  );
};

export default MainPage;

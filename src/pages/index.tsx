import React, { useEffect, useState } from 'react';
import Search from '../components/Search/Search';
import Results from '../components/Results/Results';
import Flyout from '../components/Flyout/flyout';
import { useRouter } from 'next/router';

const MainPage: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(storedSearchTerm);
  }, []);

  useEffect(() => {
    const pageParam = Number(router.query.page) || 1;
    setPage(pageParam);
  }, [router.query.page]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPage(1);
    router.push(`/?page=1&search=${search}`, undefined, { shallow: true });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(
      `/?page=${newPage}${searchTerm ? `&search=${searchTerm}` : ''}`,
      undefined,
      { shallow: true }
    );
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

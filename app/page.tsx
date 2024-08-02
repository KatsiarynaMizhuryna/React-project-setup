'use client';
import React, { useEffect, useState } from 'react';
import Search from '@/src/components/Search/Search';
import Results from '@/src/components/Results/Results';
import Flyout from '@/src/components/Flyout/flyout';
import { useRouter, useSearchParams } from 'next/navigation';

const MainPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(storedSearchTerm);
  }, []);

  useEffect(() => {
    const pageParam = Number(searchParams.get('page')) || 1;
    setPage(pageParam);
  }, [searchParams]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPage(1);
    router.push(`/?page=1&search=${search}`, { scroll: true });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(
      `/?page=${newPage}${searchTerm ? `&search=${searchTerm}` : ''}`,
      { scroll: true }
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

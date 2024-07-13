import React, { useState, useEffect } from 'react';
import { Character } from '../../models';
import styles from './Pagination.module.css';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [page, setPage] = useState(currentPage);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="paginationWrapper">
      <button onClick={() => goToPage(1)} disabled={page === 1}>
        {'<<'}
      </button>
      <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
        {'<'}
      </button>
      <span>
        {page} из {totalPages}
      </span>
      <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
        {'>'}
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={page === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;

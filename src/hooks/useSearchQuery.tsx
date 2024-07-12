import { useState, useEffect } from 'react';

const useSearchQuery = (key: string, initialValue: string = '') => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const savedQuery = localStorage.getItem(key);
    return savedQuery !== null ? savedQuery : initialValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, searchQuery);
    };
  }, [key, searchQuery]);

  return [searchQuery, setSearchQuery] as const;
};

export default useSearchQuery;

import CharacterCard from '../CharacterCard/CharacterCard';
import NotFound from '../NotFound/NotFound';
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react';

import styles from './Results.module.css';
import {
  useGetAllcharactersQuery,
  useLazyGetCharactersByNameQuery,
} from '../../store/api/api';
import { Outlet, useNavigate } from 'react-router-dom';

interface ResultsProps {
  page: number;
  searchTerm: string;
  onPageChange: (newPage: number) => void;
}

const Results: React.FC<ResultsProps> = ({
  page,
  searchTerm,
  onPageChange,
}) => {
  // const [showDetails, setShowDetails] = useState<boolean>(false);
  // const navigate = useNavigate();
  const { isLoading, isError, data, isFetching } =
    useGetAllcharactersQuery(page);
  const [
    fetchData,
    {
      data: characterByName,
      isLoading: isCharacterLoading,
      isError: isCharacterError,
    },
  ] = useLazyGetCharactersByNameQuery();

  useEffect(() => {
    if (searchTerm) {
      fetchData(searchTerm);
    }
  }, [searchTerm]);

  // const closeDetails = () => {
  //   console.log('show');
  //   if (showDetails) {
  //     setShowDetails(false);
  //     navigate('/');
  //   }
  // };

  return (
    <div className={styles.results_wrapper}>
      <Pagination
        isLoading={isFetching}
        currentPage={page}
        totalPages={data?.info.pages || 1}
        onPageChange={onPageChange}
      />
      <div className={styles.results_block}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data.</p>}
        <div className={styles.results_section}>
          {!searchTerm &&
            data?.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
        </div>
        <div className={styles.details_section}>
          <Outlet />
        </div>
      </div>
      <div className={styles.results_block}>
        {isCharacterLoading && <p>Loading characters by name...</p>}
        {isCharacterError && <NotFound />}
        {searchTerm &&
          characterByName?.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
};

export default Results;

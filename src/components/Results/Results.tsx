import CharacterCard from '../CharacterCard/CharacterCard';
import NotFound from '../NotFound/NotFound';
import Pagination from '../Pagination/Pagination';
import { useEffect } from 'react';
import styles from './Results.module.css';
import {
  useGetAllcharactersQuery,
  useLazyGetCharactersByNameQuery,
} from '../../store/api/api';
import { useRouter } from 'next/router';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

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
  const router = useRouter();
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
  }, [fetchData, searchTerm]);

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    router.push(`/?page=${newPage}`, undefined, { shallow: true });
  };

  const selectedCharacterId = router.query.details as string | undefined;

  return (
    <div className={styles.results_wrapper}>
      <Pagination
        isLoading={isFetching}
        currentPage={page}
        totalPages={data?.info.pages || 1}
        onPageChange={handlePageChange}
      />
      <div className={styles.search_results_block}>
        <div className={styles.results_block}>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching data.</p>}
          <div className={styles.results_section}>
            {!searchTerm &&
              data?.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
          </div>
          <div className={styles.search_results_block}>
            {isCharacterLoading && <p>Loading characters by name...</p>}

            {isCharacterError && <NotFound />}
            {!isCharacterError &&
              searchTerm &&
              characterByName?.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
          </div>
          {selectedCharacterId && (
            <div>
              <CharacterDetails characterId={selectedCharacterId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;

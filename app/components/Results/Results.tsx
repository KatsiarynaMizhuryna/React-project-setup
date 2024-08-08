import { useSearchParams } from '@remix-run/react';
import { Character } from '../../models';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './Results.module.css';
import Pagination from '../Pagination/Pagination';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

interface ResultsProps {
  data: Character[];
  pageInfo: { pages: number; current: number };
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Results: React.FC<ResultsProps> = ({
  data,
  pageInfo,
  currentPage,
  onPageChange,
}) => {
  const [searchParams] = useSearchParams();

  const selectedCharacterId = searchParams.get('details');
  return (
    <div className={styles.results_wrapper}>
      <Pagination
        isLoading={false}
        currentPage={currentPage}
        totalPages={pageInfo.pages || 1}
        onPageChange={onPageChange}
      />
      <div className={styles.search_results_block}>
        <div className={styles.results_block}>
          <div className={styles.results_section}>
            {data.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          {selectedCharacterId && (
            <div className={styles.details_section}>
              <CharacterDetails characterId={selectedCharacterId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;

import CharacterInfo from '../CharacterCard/CharacterCard';
import { Character } from '../../models';
import NotFound from '../NotFound/NotFound';
import Pagination from '../Pagination/Pagination';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailsPage from '../../pages/DetailsPage/DetailsPage';
import styles from './Results.module.css';

interface ResultsProps {
  results: Character[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Results: React.FC<ResultsProps> = ({
  results,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/character/')) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [location]);

  const handleCharacterClick = (character: Character) => {
    setShowDetails(true);
    navigate(`/character/${character.id}`);
  };
  const closeDetails = () => {
    if (showDetails) {
      setSelectedCharacter(null);
      setShowDetails(false);
      navigate('/');
    }
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }
  return results ? (
    <div className={styles.results_wrapper}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <div className={styles.results_block}>
        <div className={styles.results_section} onClick={closeDetails}>
          {results.map((character, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCharacterClick(character)}
            >
              <Link to={`/character/${character.id}`}>
                <CharacterInfo key={index} character={character} />
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.details_section}>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <section className="card">
      <NotFound />
    </section>
  );
};

export default Results;

import { useNavigate, useParams } from 'react-router-dom';
import { Character } from '../../models';
import styles from './DetailsPage.module.css';
import { useEffect, useState } from 'react';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import ErrorPage from '../ErrorPage/ErrorPage';
import NotFound from '../../components/NotFound/NotFound';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setNotFound(true);
        console.error('Error fetching character details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!details && id) {
      fetchDetails();
    } else {
      setIsLoading(false);
    }
  }, [details, id]);

  const closeDetails = () => {
    navigate('/');
  };

  return (
    <div className={styles.details_section}>
      <button onClick={closeDetails}>Close</button>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {notFound && <NotFound />}
      {details && <CharacterDetails character={details} />}
    </div>
  );
};
export default DetailsPage;

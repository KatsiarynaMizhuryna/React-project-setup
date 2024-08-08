import { useNavigate, useSearchParams } from '@remix-run/react';
import { useGetCharacterByIdQuery } from '../../store/api/api';
import styles from './CharacterDetails.module.css';

export interface CharacterDetailsProps {
  characterId: string;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ characterId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    data: character,
    isLoading,
    isError,
  } = useGetCharacterByIdQuery(characterId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !character) {
    return <p>Error loading character details.</p>;
  }

  const closeDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('details');
    navigate(`/?${newSearchParams.toString()}`);
  };

  return (
    <div className={styles.detailes_container}>
      <div className={styles.character_card}>
        <button onClick={closeDetails}>Close</button>
        <img
          src={character.image}
          alt={character.name}
          className={styles.character_image}
        />
        <div className={styles.character_info}>
          <h2>
            <strong>Name: </strong>
            {character.name}
          </h2>
          <p>
            <strong>Status: </strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Last Known Location:</strong>{' '}
            <a href={character.location.url}>{character.location.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;

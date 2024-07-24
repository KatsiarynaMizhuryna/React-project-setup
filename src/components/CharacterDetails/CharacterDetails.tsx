import { Character } from '../../models';
import styles from './CharacterDetails.module.css';

interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <div className={styles.character_card}>
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
  );
};

export default CharacterDetails;

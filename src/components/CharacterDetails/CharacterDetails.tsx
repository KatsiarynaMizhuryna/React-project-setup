'use client';
import Image from 'next/image';
import { useGetCharacterByIdQuery } from '../../store/api/api';
import styles from './CharacterDetails.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

interface CharacterDetailsProps {
  characterId: string;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ characterId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    router.push(`/?${newSearchParams.toString()}`, { scroll: true });
  };

  return (
    <div className={styles.detailes_container}>
      <div className={styles.character_card}>
        <button onClick={closeDetails}>Close</button>
        <Image
          src={character.image}
          width={300}
          height={300}
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

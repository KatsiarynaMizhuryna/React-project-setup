import React from 'react';
import { Character } from '../../models';
import styles from './CharacterCard.module.css';
import { useActions } from '../../hooks/actions';
import { RootState } from '../../store';
import { UseAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { select, unselect } = useActions();
  const selectedCards = UseAppSelector(
    (state: RootState) => state.selectedCard
  );
  const router = useRouter();

  const handleCharacterClick = () => {
    router.push(
      `/?page=${router.query.page || 1}&details=${character.id}`,
      undefined,
      { shallow: true }
    );
  };
  const isSelected = (id: number) =>
    selectedCards.selected.some((item) => item.id === id);

  const handleCheckboxChange = async () => {
    if (isSelected(character.id)) {
      await unselect(character.id);
    } else {
      await select(character);
    }
  };
  return (
    <div className={styles.character_card}>
      <span>
        <input
          type="checkbox"
          aria-label="..."
          checked={isSelected(character.id)}
          onChange={handleCheckboxChange}
        />
      </span>
      <Image
        src={character.image}
        alt={character.name}
        onClick={handleCharacterClick}
        className={styles.character_image}
      />
      <div className={styles.character_info}>
        <h2>{character.name}</h2>
      </div>
    </div>
  );
};

export default CharacterCard;

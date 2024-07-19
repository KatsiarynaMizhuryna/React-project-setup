import React from 'react';
import { Character } from '../../models';
import styles from './CharacterCard.module.css';
import { useActions } from '../../hooks/actions';
import { RootState } from '../../store';
import { UseAppSelector } from '../../hooks/redux';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { select, unselect } = useActions();
  const selectedCards = UseAppSelector(
    (state: RootState) => state.selectedCard
  );
  const isSelected = (id: number) =>
    selectedCards.selected.some((item) => item.id === id);

  const handleCheckboxChange = async () => {
    if (isSelected(character.id)) {
      await unselect(character.id);
      console.log(selectedCards.selected);
    } else {
      await select(character);
      console.log(character.id);
      console.log(selectedCards.selected);
    }
    console.log(isSelected);
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
      <img
        src={character.image}
        alt={character.name}
        className={styles.character_image}
      />
      <div className={styles.character_info}>
        <h2>{character.name}</h2>
      </div>
    </div>
  );
};

export default CharacterCard;

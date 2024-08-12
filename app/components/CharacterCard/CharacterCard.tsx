import React from 'react';
import { Character } from '../../models';
import styles from './CharacterCard.module.css';
import { useActions } from '../../hooks/actions';
import { RootState } from '../../store';
import { UseAppSelector } from '../../hooks/redux';

import { useNavigate, useSearchParams } from '@remix-run/react';

export interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { select, unselect } = useActions();
  const selectedCards = UseAppSelector(
    (state: RootState) => state.selectedCard
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCharacterClick = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('details', character.id.toString());
    navigate(`/?${newSearchParams.toString()}`);
  };

  const isSelected = (id: number) =>
    selectedCards.selected.some((item: Character) => item.id === id);

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
          aria-label="Select character"
          checked={isSelected(character.id)}
          onChange={handleCheckboxChange}
        />
      </span>
      <img
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
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

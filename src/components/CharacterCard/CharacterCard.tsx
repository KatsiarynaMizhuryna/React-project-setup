import React, { useEffect, useState } from 'react';
import { Character } from '../../models';
import styles from './CharacterCard.module.css';
import { useActions } from '../../hooks/actions';
import { RootState } from '../../store';
import { UseAppSelector } from '../../hooks/redux';
import { useLocation, useNavigate } from 'react-router-dom';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { select, unselect } = useActions();
  const selectedCards = UseAppSelector(
    (state: RootState) => state.selectedCard
  );
  const [showDetails, setShowDetails] = useState<boolean>(false);
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
    console.log(character.id);
    setShowDetails(true);
    navigate(`/character/${character.id}`);
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
      <img
        src={character.image}
        alt={character.name}
        onClick={() => handleCharacterClick(character)}
        className={styles.character_image}
      />
      <div className={styles.character_info}>
        <h2>{character.name}</h2>
      </div>
    </div>
  );
};

export default CharacterCard;

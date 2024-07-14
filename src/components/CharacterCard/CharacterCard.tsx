import React from 'react';
import { Character } from '../../models';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
}

const CharacterInfo: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className={styles.character_card}>
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

export default CharacterInfo;

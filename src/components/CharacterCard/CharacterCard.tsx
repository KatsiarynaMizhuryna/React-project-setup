import React from 'react';
import { Character } from '../../models';

interface CharacterCardProps {
  character: Character;
}

const CharacterInfo: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="character-card">
      <img
        src={character.image}
        alt={character.name}
        className="character-image"
      />
      <div className="character-info">
        <h2>{character.name}</h2>
      </div>
    </div>
  );
};

export default CharacterInfo;

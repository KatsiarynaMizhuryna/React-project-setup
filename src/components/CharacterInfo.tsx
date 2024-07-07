import React from 'react';
import { Character } from '../models';

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

export default CharacterInfo;

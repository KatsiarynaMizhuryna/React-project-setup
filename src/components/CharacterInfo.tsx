import React  from 'react';
import { Character } from '../models';

interface CharacterCardProps {
    character: Character;
  }
  
  const CharacterInfo: React.FC<CharacterCardProps> = ({ character }) => {
    return (
      <div className="character-card">
        <img src={character.image} alt={character.name} className="character-image" />
        <div className="character-info">
          <h2 className="character-name"><strong>Name: </strong>{character.name}</h2>
          <p className="character-status"><strong>Status: </strong> {character.status}</p>
          <p className="character-species"><strong>Species:</strong> {character.species}</p>
          <p className="character-type"><strong>Type:</strong> {character.type || 'N/A'}</p>
          <p className="character-gender"><strong>Gender:</strong> {character.gender}</p>
          <p className="character-location">
            <strong>Last Known Location:</strong> <a href={character.location.url}>{character.location.name}</a>
          </p>
        </div>
      </div>
    );
  };
  
  export default CharacterInfo;
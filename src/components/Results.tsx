import React, { Component } from 'react';
import CharacterInfo from './CharacterInfo';
import { Character } from '../models';


interface ResultsProps {
  results: Character[];
  isLoading: boolean;
}

class Results extends Component<ResultsProps> {
  render() {
    const { results, isLoading } = this.props;
    if (isLoading) {
      return <p className="loading">Loading...</p>;
    }

    if (results.length === 0) {
      return <p className="not-found">Not Found</p>;
    }

    return (
      <div className = "results">
        {results.map((character, index) => (
          <div key={index} className="card">
            <CharacterInfo key={index} character={character} />
          </div>
        ))}
        
      </div>
    );
  }
}

export default Results;

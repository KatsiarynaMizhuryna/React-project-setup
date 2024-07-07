import React, { Component } from 'react';
import CharacterInfo from './CharacterInfo';
import { Character } from '../models';
import NotFound from './NotFound';

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

    return results ? (
      <div className="results">
        {results.map((character, index) => (
          <div key={index} className="card">
            <CharacterInfo key={index} character={character} />
          </div>
        ))}
      </div>
    ) : (
      <section className="card">
        <NotFound />
      </section>
    );
  }
}

export default Results;

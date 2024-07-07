import React, { ChangeEvent, Component } from 'react';
import { Character } from '../models';
import logo from '../assets/rick-and-morty.png';
import ErrorButton from './ErrorButton';

interface SearchProps {
  renderResults: (results: Character[]) => void;
  setLoading: (isLoading: boolean) => void;
}

interface SearchState {
  searchCard: string;
  isLoading: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchCard: localStorage.getItem('searchTerm') || '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    this.props.setLoading(true);
    const trimmedSearchItem = this.state.searchCard.trim();
    let apiUrl = `https://rickandmortyapi.com/api/character/`;

    if (trimmedSearchItem) {
      apiUrl += `?name=${trimmedSearchItem}`;
    }
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.props.renderResults(data.results);
      localStorage.setItem('searchTerm', trimmedSearchItem);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    this.props.setLoading(false);
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchCard: event.target.value });
  };

  render() {
    return (
      <div className="search-bar">
        <img src={logo} alt="rick-and-morty logo" width={150} />
        <ErrorButton />
        <div>
          <input
            type="text"
            placeholder="Search character..."
            value={this.state.searchCard}
            onChange={this.handleInputChange}
          />
          <button
            className="search-bar-button"
            onClick={this.fetchData}
            disabled={this.state.isLoading}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;

import { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';
import { Character } from './models';
import ErrorBoundary from './components/ErrorBoundary';


class App extends Component {
  state = {
    searchResults: [],
    isLoading: false,
  };

  updateSearchResults = (results: Character[]) => {
    this.setState({ searchResults: results, isLoading: false });
  };

  handleLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };
  render() {
    return (
      <div>
        <ErrorBoundary>
          <Search
            renderResults={this.updateSearchResults}
            setLoading={this.handleLoading}
          />
          <Results
            results={this.state.searchResults}
            isLoading={this.state.isLoading}
          />
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;

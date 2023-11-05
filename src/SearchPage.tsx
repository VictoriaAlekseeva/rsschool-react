// SearchPage.tsx
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

import { SEARCH_BEER } from './apiConstants.ts';

class SearchPage extends Component {
  state = {
    searchResults: [],
    loading: false,
  };

  handleSearch = async (searchTerm) => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === '') {
      try {
        this.setState({ loading: true });

        const response = await fetch(`${SEARCH_BEER}`);
        const data = await response.json();
        this.setState({ searchResults: data, loading: false });
      } catch (error) {
        console.error('Error:', error);
        this.setState({ loading: false });
      }
    } else {
      try {
        this.setState({ loading: true });

        const response = await fetch(
          `${SEARCH_BEER}=${encodeURIComponent(trimmedSearchTerm)}`
        );
        const data = await response.json();
        this.setState({ searchResults: data, loading: false });
      } catch (error) {
        console.error('Error:', error);
        this.setState({ loading: false });
      }
    }
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        {this.state.loading ? (
          <p>Loading beers...</p>
        ) : (
          <SearchResults searchResults={this.state.searchResults} />
        )}
      </div>
    );
  }
}

export default SearchPage;

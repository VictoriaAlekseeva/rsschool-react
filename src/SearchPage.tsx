import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

import { SEARCH_BEER, SEARCH_ALL_BEERS } from './apiConstants.ts';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(searchTerm) {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === '') {
      try {
        setIsLoading(true);
        const response = await fetch(`${SEARCH_ALL_BEERS}`);
        const data = await response.json();
        setSearchResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${SEARCH_BEER}=${encodeURIComponent(trimmedSearchTerm)}`
        );
        const data = await response.json();
        setSearchResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <p>Loading beers...</p>
      ) : (
        <SearchResults searchResults={searchResults} />
      )}
    </div>
  );
}

export default SearchPage;

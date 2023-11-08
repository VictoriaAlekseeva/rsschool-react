import React, { useEffect, useState } from 'react';
import SearchBar from '../searchBar/SearchBar.tsx';
import SearchResults from '../searchResults/SearchResults.tsx';

import { SEARCH_ALL_BEERS } from '../../apiConstants.ts';
import Pagination from '../pagination/Pagination.tsx';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  async function handleSearch(
    searchTerm: string | null,
    page = 1,
    per_page = 5
  ) {
    const URL = searchTerm
      ? `${SEARCH_ALL_BEERS}?beer_name=${encodeURIComponent(
          searchTerm
        )}&page=${page}&per_page=${per_page}`
      : `${SEARCH_ALL_BEERS}?&page=${page}&per_page=${per_page}`;

    try {
      setIsLoading(true);
      const response = await fetch(`${URL}`);
      const data = await response.json();
      setSearchResults(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  }

  function gotoPrevPage() {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  }

  function gotoNextPage() {
    setCurrentPage(currentPage + 1);
  }

  const handleSelectChange = (event) => {
    setItemsPerPage(() => event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm');

    searchTerm && handleSearch(searchTerm, currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {searchResults.length && (
        <Pagination
          gotoPrevPage={gotoPrevPage}
          gotoNextPage={gotoNextPage}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          handleSelectChange={handleSelectChange}
        />
      )}
      {isLoading ? (
        <p>Loading beers...</p>
      ) : (
        <SearchResults searchResults={searchResults} />
      )}
    </>
  );
}

export default SearchPage;

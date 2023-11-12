import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar.tsx';
import SearchResults from '../searchResults/SearchResults.tsx';

import { SEARCH_ALL_BEERS } from '../../apiConstants.ts';
import BeerDataContext from '../../contexts/BeerDataContext.ts';
import { BeerData } from '../../types/interface';
import Pagination from '../pagination/Pagination.tsx';

function SearchPage() {
  const [searchResults, setSearchResults] = useState<BeerData[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [pageParams, setPageParams] = useSearchParams({
    currentPage: '1',
    itemsPerPage: '5',
  });

  async function handleSearch(
    searchTerm: string | null,
    page: string | null = '1',
    per_page: string | null = '5'
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
    const pageNum = pageParams.get('currentPage');
    const page = pageNum && +pageNum > 1 ? +pageNum - 1 : pageNum;
    pageParams.set('currentPage', `${page}`);
    setPageParams(pageParams);
  }

  function gotoNextPage() {
    const pageNum = pageParams.get('currentPage');
    const page = +pageNum! + 1;
    pageParams.set('currentPage', `${page}`);
    setPageParams(pageParams);
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageParams({ currentPage: '1', itemsPerPage: event.target.value });
  };

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm');
    const pageNum = pageParams.get('currentPage');
    const itemsQuantity = pageParams.get('itemsPerPage');

    searchTerm && handleSearch(searchTerm, pageNum, itemsQuantity);
  }, [pageParams]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {searchResults!.length && (
        <Pagination
          gotoPrevPage={gotoPrevPage}
          gotoNextPage={gotoNextPage}
          currentPage={pageParams.get('currentPage')!}
          itemsPerPage={pageParams.get('itemsPerPage')!}
          handleSelectChange={handleSelectChange}
        />
      )}
      {isLoading ? (
        <p>Loading beers...</p>
      ) : (
        <BeerDataContext.Provider value={searchResults}>
          <SearchResults />
        </BeerDataContext.Provider>
      )}
    </>
  );
}

export default SearchPage;

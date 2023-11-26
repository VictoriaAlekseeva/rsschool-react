import { BeerData } from '@/types/interface';
import React, { useState } from 'react';
import SearchBar from '../searchBar/SearchBar';
import Pagination from '../pagination/Pagination';
import SearchResults from '../searchResults/SearchResults';

type Props = {
  beerData: BeerData[];
};

const SearchPage: React.FC<Props> = ({ beerData }) => {
  const [isLoading] = useState(false);

  return (
    <>
      <SearchBar />
      <Pagination totalCount={beerData!.length} />
      {isLoading ? (
        <p>Loading beers...</p>
      ) : (
        <SearchResults beerData={beerData} />
      )}
    </>
  );
};

export default SearchPage;

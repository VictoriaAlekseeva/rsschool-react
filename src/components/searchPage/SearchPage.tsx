import { SEARCH_ALL_BEERS } from '@/apiConstants';
import { useAppSelector } from '@/store/hooks';
import { BeerData } from '@/types/interface';
import { useEffect, useState } from 'react';
import SearchBar from '../searchBar/SearchBar';
import Pagination from '../pagination/Pagination';
import SearchResults from '../searchResults/SearchResults';
import BeerDataContext from '@/contexts/BeerDataContext';

function SearchPage() {
  const [searchResults, setSearchResults] = useState<BeerData[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const [pageParams, setPageParams] = useSearchParams({
  //   itemsPerPage: '5',
  // });

  const searchTerm = useAppSelector((state) => state.search.searchValue);

  const count = useAppSelector((state) => state.pageNumber.value);

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setPageParams({
    //   itemsPerPage: event.target.value,
    // });
    console.log('handleSelectChange');
  };

  useEffect(() => {
    // const itemsQuantity = pageParams.get('itemsPerPage');

    if (searchTerm !== null && searchTerm !== '' && count !== null) {
      // handleSearch(searchTerm, `${count}`, itemsQuantity);
      handleSearch(searchTerm, `${count}`, '10');
    }
    // }, [pageParams, count, searchTerm]);
  }, [count, searchTerm]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {searchResults!.length && (
        <Pagination
          // itemsPerPage={pageParams.get('itemsPerPage')!}
          // handleSelectChange={handleSelectChange}
          itemsPerPage={'10'}
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

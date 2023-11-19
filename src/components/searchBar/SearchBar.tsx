import React from 'react';

import './SearchBar.css';

import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store/slices/searchSlice';
import { useAppSelector } from '../../store/hooks';
import { reset } from '../../store/slices/paginationSlice';

type Props = {
  onSearch: (
    searchTerm: string | null,
    page?: string | null,
    per_page?: string | null
  ) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {

  const dispatch = useDispatch();
  const searchTerm = useAppSelector((state) => state.search.searchValue);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchValue(e.target.value));
  }

  function handleSearch() {
    onSearch(searchTerm);
    dispatch(reset())
  }

  return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type beer name"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
  );
};

export default SearchBar;

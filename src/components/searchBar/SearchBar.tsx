import React, { useState } from 'react';

import './SearchBar.css';
import InputValueContext from '../../contexts/InputValueContext';

type Props = {
  onSearch: (searchTerm: string | null,
  page?: string | null,
  per_page?: string | null) => void
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    localStorage.setItem('searchTerm', e.target.value);
  }

  function handleSearch() {
    onSearch(searchTerm);
  }

  return (
    <InputValueContext.Provider value={searchTerm}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type beer name"
          value={searchTerm}
          onChange={handleInputChange}
          />
        <button onClick={handleSearch}>Search</button>
      </div>
    </InputValueContext.Provider>
  );
}

export default SearchBar;

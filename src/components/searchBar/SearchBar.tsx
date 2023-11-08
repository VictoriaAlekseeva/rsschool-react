import React, { useState } from 'react';

import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  function handleInputChange(e) {
    setSearchTerm(e.target.value);
    localStorage.setItem('searchTerm', e.target.value);
  }

  function handleSearch() {
    onSearch(searchTerm);
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
}

export default SearchBar;

import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSearch() {
    onSearch(searchTerm);
  }

  return (
    <div>
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

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar: React.FC = () => {
  const router = useRouter();
  const { page = 1, per_page = 5, beer_name = '' } = router.query;
  const [inputValue, setInputValue] = useState(beer_name);

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setInputValue(value);
  };

  const handleSearch = () => {
    if (inputValue) {
      router.push(
        `/?beer_name=${inputValue}&page=${page}&per_page=${per_page}`
      );
    } else {
      router.push(`/?page=${page}&per_page=${per_page}`);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Type beer name"
        value={inputValue}
        onChange={handleChangeInput}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

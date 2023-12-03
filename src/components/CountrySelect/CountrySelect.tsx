import React from 'react';
import { useState } from 'react';
import countriesListJson from '../../countrieslist.json';
import styles from './CountrySelect.module.scss';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {}

const CountrySelect = React.forwardRef<HTMLInputElement, GenericInputProps>(
  ({ ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const countriesList = countriesListJson.map((item) => item.country);

    const searchedCountries = countriesList.filter((country) =>
      country.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleChangeSelect: React.ChangeEventHandler<HTMLInputElement> = ({
      target: { value },
    }) => {
      setInputValue(value);
      setIsVisible(true);
    };

    const handlerClickSelect: React.MouseEventHandler<HTMLLIElement> = (
      event
    ) => {
      event.preventDefault;
      setInputValue(event.currentTarget.innerText);
      setIsVisible(false);
    };

    return (
      <>
        <label htmlFor="country" className={styles.label}>
          Country
        </label>
        <input
          type="text"
          id="country"
          {...props}
          ref={ref}
          value={inputValue}
          onChange={handleChangeSelect}
          className={styles.input}
        />
        {isVisible && (
          <ul className={styles.country_list}>
            {searchedCountries.map((country, index) => (
              <li key={index} onMouseDown={handlerClickSelect}>
                {country}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
);

export default CountrySelect;

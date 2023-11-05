// SearchResults.tsx
import React, { Component } from 'react';

import './SearchResults.css';

class SearchResults extends Component {
  render() {
    const { searchResults } = this.props;

    return (
      <div className="beer-cards-wrapper">
        {searchResults.map((item) => (
          <div className="beer-card" key={item.id}>
            <h3>{item.name}</h3>
            <div className="beer-card__attr">
              <img
                className="beer-card__img"
                width="50px"
                src={item.image_url}
                alt={item.name}
              />
              <ul>
                <span className="beer-card__food">Food Pairings:</span>
                {item.food_pairing.map(food => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
            </div>
            <ul>
              <li>ABV: {item.abv}%</li>
              <li>IBU: {item.ibu}</li>
              <li>SRM: {item.srm}</li>
            </ul>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;

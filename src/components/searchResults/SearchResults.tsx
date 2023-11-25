import Image from 'next/image';
import { BeerData } from '../../types/interface';

type Props = {
  beerData: BeerData[];
};

const SearchResults: React.FC<Props> = ({ beerData }) => {
  return (
    <div className="beer-cards-wrapper">
      {beerData!.map((item: BeerData) => (
        <div className="beer-card" key={item.id}>
          <h3>{item.name}</h3>
          <div className="beer-card__attr">
            <Image
              width={60}
              height={150}
              className="beer-card__img"
              src={item.image_url}
              alt={item.name}
            />
            <div>
              <ul>
                <li>ABV: {item.abv}%</li>
                <li>IBU: {item.ibu}</li>
                <li>SRM: {item.srm}</li>
              </ul>
              <ul>
                <span className="beer-card__food">Food Pairings:</span>
                {item.food_pairing.map((food) => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
            </div>
          </div>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

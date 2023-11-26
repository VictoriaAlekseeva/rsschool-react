import React from 'react';
import Image from 'next/image';
import { BeerData } from '../../types/interface';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  beerInfo: BeerData[];
};

const BeerDetails: React.FC<Props> = ({ beerInfo }) => {
  const router = useRouter();

  const beer_name = router.query.beer_name || '';
  const page = router.query.page || 1;
  const per_page = router.query.per_page || 5;

  return (
    <div className="beer-card-wrapper">
      <Link href={`/?beer_name=${beer_name}&page=${page}&per_page=${per_page}`}>
        <button> Back </button>
      </Link>
      {beerInfo!.map((item: BeerData) => (
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

export default BeerDetails;

import Image from 'next/image';
import { BeerData } from '../../types/interface';
import { useRouter } from 'next/router';

type Props = {
  beerData: BeerData[];
};

const SearchResults: React.FC<Props> = ({ beerData }) => {
  const router = useRouter();

  const beer_name = router.query.beer_name || '';
  const page = router.query.page || 1;
  const per_page = router.query.per_page || 5;

  const getBeerInfo = (id: number) => {
    const basePath = router.pathname.startsWith('/') ? '' : '/';

    if (router.pathname.split('/')[1] === 'detailedpage') {
      router.push(`/?beer_name=${beer_name}&page=${page}&per_page=${per_page}`);
      return;
    }

    if (beer_name) {
      router.push(
        `${basePath}/detailedpage/${id}/?beer_name=${beer_name}&page=${page}&per_page=${per_page}`
      );
    } else {
      router.push(
        `${basePath}/detailedpage/${id}/?page=${page}&per_page=${per_page}`
      );
    }
  };

  if (beerData.length === 0) return <div>No beer found</div>;

  return (
    <div className="beer-cards-wrapper">
      {beerData!.map((item: BeerData) => (
        <div
          role="beerItem"
          className="beer-card"
          key={item.id}
          onClick={() => getBeerInfo(item?.id)}
        >
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

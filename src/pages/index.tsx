import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import SearchPage from '@/components/searchPage/SearchPage';
import { wrapper } from '@/store/store';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { BeerData } from '@/types/interface';
import { getAllBeers, getBeers } from '@/store/services/apiServices';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const beer_name =
      typeof context.query.beer_name === 'string'
        ? context.query.beer_name
        : '';
    const page =
      typeof context.query.page === 'string' ? parseInt(context.query.page) : 1;
    const per_page =
      typeof context.query.per_page === 'string'
        ? parseInt(context.query.per_page)
        : 5;

    let data: BeerData[];

    if (beer_name) {
      data = await store
        .dispatch(getBeers.initiate({ beer_name, per_page, page }))
        .unwrap();
    } else {
      data = await store
        .dispatch(getAllBeers.initiate({ per_page, page }))
        .unwrap();
    }

    if (!data) {
      return { notFound: true };
    }

    return { props: { beerData: data } };
  });

const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ beerData }) => {
  return (
    <div className="App">
      <header>
        <h1>Brewdog brewery beers</h1>
      </header>
      <main>
        <SearchPage beerData={beerData} />
      </main>
      <footer>
        <p>© 2023</p>
      </footer>
    </div>
  );
};

export default Home;

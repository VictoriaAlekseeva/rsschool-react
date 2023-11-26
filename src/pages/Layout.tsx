import React from 'react';
import { BeerData } from '@/types/interface';
import SearchPage from '@/components/searchPage/SearchPage';
import style from '../styles/Layout.module.scss';

type Props = {
  beerData: BeerData[];
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ beerData, children }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_main}>
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
      </div>
      {children}
    </div>
  );
};

export default Layout;

import React from 'react';
import SearchPage from './components/searchPage/SearchPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Brewdog brewery beers</h1>
      </header>
      <main>
        <SearchPage />
      </main>
      <footer>
        <p>© 2023</p>
      </footer>
    </div>
  );
}

export default App;

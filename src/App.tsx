import React, { Component } from 'react';
import SearchPage from './SearchPage';

class App extends Component {
  render() {
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
}

export default App;

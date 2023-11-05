import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    searchTerm: '',
  };

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Type beer name"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;

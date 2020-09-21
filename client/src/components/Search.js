import React, { Component } from "react";
import axios from "axios";
import DisplayMovies from "./DisplayMovies";

let api_key = "9b0c7c21f32fe97a39079134ab3cc456";
let search_api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;

let backend_url = "http://localhost:5000/movies";

class Search extends Component {
  state = {
    page: 0,
    searchedMovies: [],
    searchKey: "",
    maxPage: 0,
  };

  handleSearch = (event) => {
    event.preventDefault();
    let searchVal = event.target.search.value;
    this.searchMovies(1, searchVal);
    event.target.reset();
  };

  searchMovies = (page, searchVal) => {
    let search_url = `${search_api}${searchVal}&page=${page}`;
    axios.get(search_url).then((response) => {
      let maxPage = response.data.total_pages;
      let searchList = response.data.results.map((result) => {
        let movie = {};
        movie.id = result.id;
        movie.title = result.original_title;
        movie.description = result.overview;
        movie.date = result.release_date;
        movie.rating = result.vote_average;
        movie.image = result.poster_path;
        let status = true;
        for (let item of this.props.movieList) {
          if (item.id === movie.id) {
            status = false;
            break;
          }
        }
        if (status) {
          return movie;
        } else {
          return null;
        }
      });
      searchList = searchList.filter((movie) => movie !== null);
      this.setState({
        page: page,
        searchedMovies: searchList,
        searchKey: searchVal,
        maxPage: maxPage,
      });
    });
  };

  addMovie = (id) => {
    let index = this.state.searchedMovies.findIndex((item) => item.id === id);
    let movie = this.state.searchedMovies[index];
    this.state.searchedMovies.splice(index, 1);
    axios.post(backend_url, movie).then(() => this.props.getMovies());
  };

  render() {
    return (
      <div className="search">
        <form className="search-form" onSubmit={this.handleSearch}>
          <input className="search-form-bar" type="text" name="search"></input>
          <button className="search-form-button">Search</button>
        </form>
        {this.state.page !== 0 ? (
          <DisplayMovies
            list={this.state.searchedMovies}
            imageUrl={this.props.imageUrl}
            searchKey={this.state.searchKey}
            page={this.state.page}
            maxPage={this.state.maxPage}
            searchMovies={this.searchMovies}
            addMovie={this.addMovie}
            {...this.props}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Search;

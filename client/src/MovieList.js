import React, { Component } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import MyMovies from "./components/MyMovies";

let api_key = "9b0c7c21f32fe97a39079134ab3cc456";
let config_url = `https://api.themoviedb.org/3/configuration?api_key=${api_key}`;

let backend_url = "http://localhost:5000/movies";

class MovieList extends Component {
  state = { imageUrl: "", movieList: [] };

  componentDidMount() {
    axios.get(config_url).then((response) => {
      this.setState({
        imageUrl: `${response.data.images.secure_base_url}w185`,
      });
    });
    this.getMovies();
  }

  getMovies = () => {
    axios.get(backend_url).then((response) => {
      this.setState({ movieList: response.data });
    });
  };

  deleteMovie = (id) => {
    axios.delete(`${backend_url}/${id}`).then(() => {
      this.getMovies();
    });
  };

  lowerRanking = (id) => {
    axios.put(`${backend_url}/lower/${id}`).then(() => {
      this.getMovies();
    });
  };

  increaseRanking = (id) => {
    axios.put(`${backend_url}/increase/${id}`).then(() => {
      this.getMovies();
    });
  };

  render() {
    return (
      <div className="movieList">
        <Header path={this.props.match.path} />
        <Switch>
          <Route
            path="/search"
            exact
            render={() => (
              <Search
                imageUrl={this.state.imageUrl}
                movieList={this.state.movieList}
                getMovies={this.getMovies}
                {...this.props}
              />
            )}
          />
          <Route
            path="/movieList"
            exact
            render={() => (
              <MyMovies
                imageUrl={this.state.imageUrl}
                movieList={this.state.movieList}
                getMovies={this.getMovies}
                deleteMovie={this.deleteMovie}
                lowerRanking={this.lowerRanking}
                increaseRanking={this.increaseRanking}
                {...this.props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default MovieList;

//api_key = 9b0c7c21f32fe97a39079134ab3cc456
//v4 = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjBjN2MyMWYzMmZlOTdhMzkwNzkxMzRhYjNjYzQ1NiIsInN1YiI6IjVmNjRjOGJhYTBiNjkwMDAzODMzOTkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H1weiXvy8TETSeMu6C_9kofH6hE0lLL8woYFNUWB9-Y

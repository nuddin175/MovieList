import React, { Component } from "react";

class MyMovies extends Component {
  state = { movieList: [] };

  render() {
    return (
      <div className="list">
        <div className="list__container">
          {this.props.movieList.map((movie, index) => {
            return (
              <div key={index} className="list__container-item">
                <img
                  className="search-list__item-img"
                  src={`${this.props.imageUrl}${movie.image}`}
                  alt=""
                />
                <div className="list__container-item-text">
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                  <div className="search-list__item--container">
                    <div>Release Date: {movie.date}</div>
                    <div>Rating: {movie.rating}</div>
                  </div>
                  <div className="order">Watch Order: {movie.ranking}</div>

                  <div className="movie-controller">
                    <div className="movie-controller__container">
                      {movie.ranking !== 1 ? (
                        <button
                          className="button"
                          onClick={() => this.props.lowerRanking(movie.id)}
                        >
                          Watch Earlier
                        </button>
                      ) : (
                        ""
                      )}
                      {movie.ranking !== this.props.movieList.length ? (
                        <button
                          className="button"
                          onClick={() => this.props.increaseRanking(movie.id)}
                        >
                          Watch Later
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    <button
                      className="button button-delete"
                      onClick={() => this.props.deleteMovie(movie.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MyMovies;

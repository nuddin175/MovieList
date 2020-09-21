const { json } = require("express");
// load model
const movies = require("../models/moviesModel");

// get movie array
function getMovies(_req, res) {
  res.json(movies.movieList());
}

// post new movie
function addMovie(req, res) {
  res.json(movies.add(req.body));
}

function deleteMovie(req, res) {
  res.json(movies.deleteById(req.params.id));
}

function lowerRanking(req, res) {
  let moviesArr = movies.movieList();
  let index = moviesArr.findIndex(
    (item) => item.id.toString() === req.params.id
  );
  res.json(movies.lowerRanking(index));
}

function increaseRanking(req, res) {
  let moviesArr = movies.movieList();
  let index = moviesArr.findIndex(
    (item) => item.id.toString() === req.params.id
  );
  res.json(movies.increaseRanking(index));
}

// export functions
module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  lowerRanking,
  increaseRanking,
};

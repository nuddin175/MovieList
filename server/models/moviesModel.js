const fs = require("fs"); // file system module
const path = require("path");

// json data to read and write
const moviesFile = path.join(__dirname, "../data/movies.json");

let globalRank = movieList().length + 1;

// Movie Object Constructor
function Movie(id, title, description, date, rating, image) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.date = date;
  this.rating = rating;
  this.image = image;
  this.ranking = globalRank;
}

// list movies array data from json file
function movieList() {
  const data = fs.readFileSync(moviesFile);
  return JSON.parse(data);
}

// add movie to json file
function add(data) {
  const moviesArr = movieList();
  const newMovie = new Movie(
    data.id,
    data.title,
    data.description,
    data.date,
    data.rating,
    data.image
  );
  moviesArr.push(newMovie);
  fs.writeFileSync(moviesFile, JSON.stringify(moviesArr));
  return newMovie;
}

// delete movie from json file
function deleteById(id) {
  const moviesArr = movieList();

  let index = moviesArr.findIndex((item) => item.id.toString() === id);
  moviesArr.splice(index, 1);

  fs.writeFileSync(moviesFile, JSON.stringify(moviesArr));
  //lower ranking after deleting
  for (let i = index; i <= moviesArr.length - 1; i++) {
    lowerRanking(i, false);
  }
  return moviesArr;
}

// functions to change rank. Boolean parameter to not cause infinite loops
function lowerRanking(index, increase = true) {
  const moviesArr = movieList();
  moviesArr[index].ranking = moviesArr[index].ranking - 1;
  fs.writeFileSync(moviesFile, JSON.stringify(moviesArr));
  if (increase) {
    increaseRanking(index - 1, false);
  }
  sortByRanking();
  return moviesArr;
}

function increaseRanking(index, decrease = true) {
  const moviesArr = movieList();
  moviesArr[index].ranking = moviesArr[index].ranking + 1;
  fs.writeFileSync(moviesFile, JSON.stringify(moviesArr));
  if (decrease) {
    lowerRanking(index + 1, false);
  }
  sortByRanking();
  return moviesArr;
}

//Sort movies after changing rank
function sortByRanking() {
  const moviesArr = movieList();
  const sortedArray = moviesArr.sort((a, b) => {
    let propA = a.ranking;
    let propB = b.ranking;
    let comparison = 0;
    if (propA > propB) {
      comparison = 1;
    } else if (propA < propB) {
      comparison = -1;
    }
    return comparison;
  });
  fs.writeFileSync(moviesFile, JSON.stringify(sortedArray));
}

// export multiple functions
module.exports = { movieList, add, deleteById, lowerRanking, increaseRanking };

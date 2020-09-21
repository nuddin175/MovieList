const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController"); // import controller

// movie routes
router.get("/", moviesController.getMovies);
router.post("/", moviesController.addMovie);
router.delete("/:id", moviesController.deleteMovie);
router.put("/lower/:id", moviesController.lowerRanking);
router.put("/increase/:id", moviesController.increaseRanking);

// export routes
module.exports = router;

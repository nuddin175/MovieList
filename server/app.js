const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;
const moviesRoute = require("./routes/moviesRoute");

// add middleware to help work with req.body
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Movies endpoint, setup using express.Router()
app.use("/movies", moviesRoute);

// listen, start the application
app.listen(PORT, () => console.log(`listening at: ${BACKEND_URL}:${PORT}`));

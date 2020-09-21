import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import MovieList from "./MovieList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Redirect from="/" to="/search" />
      <Switch>
        <Route path="/search" component={MovieList} exact />
        <Route path="/movieList" component={MovieList} exact />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

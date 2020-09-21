import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  let path = props.path.split("/")[1];
  let selectedPath = path === "search";

  return (
    <header className="header">
      <h1 className="header-h1">MOVIE LIST</h1>
      <div className="header-container">
        <Link
          to="/search"
          className={
            selectedPath ? "header-item header-selected" : "header-item"
          }
        >
          Add Movies
        </Link>
        <Link
          to="/movieList"
          className={
            selectedPath ? "header-item" : "header-item header-selected"
          }
        >
          My Movies
        </Link>
      </div>
    </header>
  );
}

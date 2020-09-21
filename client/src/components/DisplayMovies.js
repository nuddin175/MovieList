import React from "react";
import NewPageButton from "./NewPageButton";

export default function DisplayMovies(props) {
  return (
    <>
      <NewPageButton
        page={props.page}
        maxPage={props.maxPage}
        searchMovies={props.searchMovies}
        searchKey={props.searchKey}
      />
      <div className="search-list__container">
        {props.list.map((item, index) => {
          return (
            <div className="search-list__item" key={index}>
              <img
                className="search-list__item-img"
                src={`${props.imageUrl}${item.image}`}
                alt=""
              />
              <div className="search-list__item-text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className="search-list__item--container">
                  <div>Release Date: {item.date}</div>
                  <div>Rating: {item.rating}</div>
                </div>
                <button
                  className="search-list__item-button"
                  onClick={() => props.addMovie(item.id)}
                >
                  Add to my list
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <NewPageButton
        page={props.page}
        maxPage={props.maxPage}
        searchMovies={props.searchMovies}
        searchKey={props.searchKey}
      />
    </>
  );
}

import React from "react";

export default function NewPageButton(props) {
  let lastPage = props.page === props.maxPage;
  return (
    <div className="page-controller">
      {props.page !== 1 ? (
        <button
          className="page-controller__btn"
          onClick={() => props.searchMovies(props.page - 1, props.searchKey)}
        >
          Prev
        </button>
      ) : (
        ""
      )}
      {lastPage ? (
        ""
      ) : (
        <button
          className="page-controller__btn"
          onClick={() => props.searchMovies(props.page + 1, props.searchKey)}
        >
          Next
        </button>
      )}
    </div>
  );
}

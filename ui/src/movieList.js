import React, { useEffect, useState } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080')
    .then(res => res.json())
    .then(data => setMovies(data))
  }, []);

  const searchMovies = (query) => {
    setMovies(movies.filter(e => e.title.toLowerCase().includes(query.toLowerCase())))
  }

  return (
    <>
      <form onSubmit={(e) => {e.preventDefault(); searchMovies(e.target[0].value)}}>
        <input type="text" placeholder="Search by title"/>
        <input type="submit" placeholder="Submit"/>
      </form>
      <ul>
        {movies.map((e) => {
          return <li>{e.title}</li>;
        })}
      </ul>
    </>
  );
}

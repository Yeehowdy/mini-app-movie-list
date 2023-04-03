import React, { useEffect, useState } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080')
    .then(res => res.json())
    .then(data => setMovies(data))
  }, []);

  return (
    <ul>
      {movies.map((e) => {
        return <li>{e.title}</li>;
      })}
    </ul>
  );
}

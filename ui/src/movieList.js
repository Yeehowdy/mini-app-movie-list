import React, { useEffect, useState } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [fetchTime, setFetchTime] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState();

  useEffect(() => {
    setFetchTime(false)
    fetch('http://localhost:8080')
    .then(res => res.json())
    .then(data => {
      data.sort((a,b) => a.id - b.id)
      setMovies(data)
    })
  }, [fetchTime]);

  // const searchMovies = (query) => {
  //   setMovies(movies.filter(e => e.title.toLowerCase().includes(query.toLowerCase())))
  // }

  const addMovie = (movieTitle) => {
    let movieObj = {title: movieTitle}
    fetch('http://localhost:8080', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieObj)
    })
    .then(() => setFetchTime(true))
    
  }

  const deleteMovie = (movieId) => {
    let movieObj = {id: movieId}
    fetch('http://localhost:8080', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieObj)
    })
    .then(() => setFetchTime(true))
  }

  const setWatched = (movieId) => {
    let movieObj = {id: movieId}
    fetch('http://localhost:8080', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieObj)
    })
    .then(() => setFetchTime(true))
  }

  const setWatchList = (movieId) => {
    let movieObj = {id: movieId}
    fetch('http://localhost:8080/watchlist', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieObj)
    })
    .then(() => setFetchTime(true))
  }

  return (
    <>
      <input type="text" placeholder="Search by title" onChange={(e) => setQuery(e.target.value)}/>

      <form onSubmit={(e) => {e.preventDefault(); addMovie(e.target[0].value)}}>
        <input type="text" placeholder="Movie Title"/>
        <input type="submit" placeholder="Add to Database"/>
      </form>

      <h3>Movies</h3>
      <ul>
        {movies.filter(e => e.title.toLowerCase().includes(query.toLowerCase()) && !e.watchList).map((e) => {
            return (
              <li key={e.id}>
                <button onClick={() => {deleteMovie(e.id)}}>Delete</button>
                {e.title} 
                <button onClick={() => {setWatched(e.id)}}>{e.watched ? "Remove from Watched" : "Add to Watched"}</button>
                <button onClick={() => {setWatchList(e.id)}}>Add to WatchList</button>
              </li>)
        })}
      </ul>
      <h3>WatchList Movies</h3>
      <ul>
      {movies.filter(e => e.title.toLowerCase().includes(query.toLowerCase()) && e.watchList).map((e) => {
            return (
              <li key={e.id}>
                <button onClick={() => {deleteMovie(e.id)}}>Delete</button>
                {e.title} 
                <button onClick={() => {setWatched(e.id)}}>{e.watched ? "Remove from Watched" : "Add to Watched"}</button>
                <button onClick={() => {setWatchList(e.id)}}>Remove from WatchList</button>
              </li>)
        })}
      </ul>
      
      <div className="Movie details">
        
      </div>

    </>
  );
}

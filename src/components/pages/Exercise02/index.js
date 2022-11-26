/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import placeholder from './assets/placeholder.png';
import { sortAsc, sortDesc } from "../../../helpers/sorting";


export default function Exercise02 () {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [ascFilter, setAscFilter] = useState(true);

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log('Getting movies');
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(sortAsc(json));
        setFilteredMovies(sortAsc(json));
        setLoading(false);
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api');
      });
  }

  const handleGenres = () => {
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setGenres(json);
      })
      .catch(() => {
        console.log('Server problem');
      });
  }

  const handleGenresChange = (value) => {
    setLoading(true);
    if(value === 'all') {
      setFilteredMovies([...movies]);
      setLoading(false);
      return;
    }
    const moviesCopy = [...movies]
    setFilteredMovies(sortAsc(moviesCopy.filter(movie => movie.genres.includes(value))));
    setLoading(false);
  };

  const handleSortYearButton = () => {
    setLoading(true);
    if(!ascFilter) {
      setFilteredMovies(sortAsc(filteredMovies));
      setAscFilter(true);
    } else {
      setFilteredMovies(sortDesc(filteredMovies));
      setAscFilter(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleMovieFetch()
    handleGenres()
  }, []);

  return (
    <section className="movie-library">
      <div className="movie-library__wrapper">
        <h1 className="movie-library__title">
          Movie Library
        </h1>
        <div className="movie-library__actions">
          <select name="genre" placeholder="Search by genre..." onChange={(e) => handleGenresChange(e.target.value)}>
            <option value="all">All Movies</option>
            {
              genres.map(x => <option value={x}>{x}</option>)
            }
          </select>
          <button onClick={() => handleSortYearButton()}>{ascFilter ? 'Year Ascending' : 'Year Descending'}</button>
        </div>
        {loading ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
          </div>
        ) : (
          <ul className="movie-library__list">
            {filteredMovies.map(movie => (
              <li key={movie.id} className="movie-library__card">
                <img 
                  src={movie?.posterUrl} 
                  alt={movie.title} 
                  onError={({currentTarget}) => {
                    currentTarget.onerror = null;
                    currentTarget.src = placeholder
                  }}
                />
                <ul>
                  <li className="movie-title">{movie.title}</li>              
                  <li className="movie-genres">{movie.genres.join(', ')}</li>
                  <li className="movie-year">{movie.year}</li>              
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
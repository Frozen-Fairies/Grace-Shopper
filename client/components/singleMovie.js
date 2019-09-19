import React from 'react'
import {Link, Route, BrowserRouter} from 'react-router-dom'
import SingleMovieView from './singleMovieView'

const SingleMovie = props => {
  const {movie} = props
  return (
    <div>
      <h1>
        <Link to={`/movies/${movie.genre.toLowerCase()}/${movie.uniqueId}`}>
          {movie.title}
        </Link>
      </h1>
      <img src={movie.imageUrl} />
      <p>${movie.price}</p>
    </div>
  )
}

export default SingleMovie

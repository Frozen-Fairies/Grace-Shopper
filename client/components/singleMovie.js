import React from 'react'
import {Link, Route, BrowserRouter} from 'react-router-dom'
import SingleMovieView from './singleMovieView'

const SingleMovie = props => {
  const {movie} = props
  return (

    <div className="column is-one-quarter">
      <Link
        to={`/movies/${movie.genre.slice(0).toLowerCase()}/${movie.uniqueId}`}
      >
        <div className="level">
          <div className="level-item has-text-centered">
            <h1>{movie.title}</h1>
          </div>
        </div>

        <img src={movie.imageUrl} />
        <div className="level">
          <div className="level-item has-text-centered">
            <p>${movie.price / 100}</p>
          </div>
        </div>
      </Link>

    </div>
  )
}

export default SingleMovie

import React from 'react'
import {Link} from 'react-router-dom'

const SingleMovie = props => {
  const {movie} = props
  return (
    <div>
      <h1>
        <Link
          to={`/movies/${movie.genre.slice(0).toLowerCase()}/${movie.uniqueId}`}
        >
          {movie.title}
        </Link>
      </h1>
      <img src={movie.imageUrl} />
      <p>${movie.price}</p>
    </div>
  )
}

export default SingleMovie

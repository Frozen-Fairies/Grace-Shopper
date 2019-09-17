import React from 'react'

const SingleMovie = props => {
  const {movie} = props
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.imageUrl} />
      <p>{movie.price}</p>
    </div>
  )
}

export default SingleMovie

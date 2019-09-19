import React from 'react'
import {connect} from 'react-redux'
import {getSingleMovieThunk} from '../store/movies'

class DisconnectedSingleMovieView extends React.Component {
  componentDidMount() {
    this.props.getSingleMovie(
      this.props.match.params.genre,
      this.props.match.params.uniqueId
    )
  }

  render() {
    const movie = this.props.movies[0]
    if (!movie) {
      return <div>...Loading</div>
    }
    return (
      <div>
        <h1>{movie.title}</h1>
        <img src={movie.imageUrl} />
        <p>{movie.description}</p>
        <p>${movie.price}</p>
        <button type="button"> Add to Cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {movies: state.movies.allMovies}
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleMovie: (genre, filmId) =>
      dispatch(getSingleMovieThunk(genre, filmId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleMovieView
)

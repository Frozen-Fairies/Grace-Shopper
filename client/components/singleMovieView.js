import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
    let lastTag
    if (!movie) {
      return <div>...Loading</div>
    }
    lastTag = movie.tags.pop()

    return (
      <div className="container is-fluid">
        <div className="tile is-ancestor">
          <div className="tile is-6">
            <img src={movie.imageUrl} />
          </div>

          <div className="container is-fluid">
            <div className="tile is-vertical">
              <div className="tile">
                <h1>{movie.title}</h1>
              </div>
              <div className="tile">
                <p>{movie.description}</p>
              </div>
              <div className="tile">
                <p>${movie.price / 100}</p>
              </div>
              <div className="tile">
                <form>
                  Quantity:{' '}
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    defaultValue="1"
                    id="quantity-input"
                  />{' '}
                  &nbsp;
                  <button type="submit">Add to Cart</button>
                </form>
              </div>
              <div className="tile">
                <p>
                  {movie.tags.map(tag => {
                    return (
                      <Link key={tag} to={`/movies/tags/${tag}`}>
                        {tag},&nbsp;
                      </Link>
                    )
                  })}
                  {
                    <Link key={lastTag} to={`/movies/tags/${lastTag}`}>
                      {lastTag}
                    </Link>
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
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

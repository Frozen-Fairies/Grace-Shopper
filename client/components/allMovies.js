import React from 'react'
import {getAllMoviesThunk} from '../store/movies'
import {connect} from 'react-redux'
import SingleMovie from './singleMovie'

class DisconnectedAllMovies extends React.Component {
  componentDidMount() {
    this.props.getMovies(this.props.selectedGenre)
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.movies.map(movie => {
            return <SingleMovie key={movie.id} movie={movie} />
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.allMovies,
    selectedGenre: state.selectedGenre
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMovies: genre => dispatch(getAllMoviesThunk(genre))
  }
}

const AllMovies = connect(mapStateToProps)(mapDispatchToProps)(
  DisconnectedAllMovies
)
export default AllMovies

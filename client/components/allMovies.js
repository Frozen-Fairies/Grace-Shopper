import React from 'react'
import {getAllMoviesThunk} from '../store/movies'
import {connect} from 'react-redux'
import SingleMovie from './singleMovie'

class DisconnectedAllMovies extends React.Component {
  componentDidMount() {
    // console.log(this.props.match)
    const genre = this.props.match.params.genre
    console.log(genre)
    this.props.getMovies(genre[0].toUpperCase() + genre.slice(1).toLowerCase())
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
    movies: state.movies.allMovies,
    selectedGenre: state.movies.selectedGenre
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMovies: genre => dispatch(getAllMoviesThunk(genre))
  }
}

const AllMovies = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllMovies
)

export default AllMovies

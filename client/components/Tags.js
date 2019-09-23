import React from 'react'
import {getMoviesForTagThunk} from '../store/movies'
import {connect} from 'react-redux'
import SingleMovie from './singleMovie'

class DisconnectedTags extends React.Component {
  async componentDidMount() {
    await this.props.getMoviesForTag(this.props.match.params.tagName)
  }

  render() {
    return (
      <div className="container is-fluid">
        <div className="columns is-multiline">
          {this.props.movies.map(movie => {
            return <SingleMovie key={movie.id} movie={movie} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.allMovies
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMoviesForTag: tag => dispatch(getMoviesForTagThunk(tag))
  }
}

const Tags = connect(mapStateToProps, mapDispatchToProps)(DisconnectedTags)

export default Tags

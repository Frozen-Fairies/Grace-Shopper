import React from 'react'
import {getAllMoviesThunk} from '../store/movies'
import {connect} from 'react-redux'

class DisconnectedAllMovies extends React.Component {
  componentDidMount() {
    this.props.getMovies()
  }

  render() {
    return (
      <div>
        <ul>{/* {//map state
                    return <Genre /> } */}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {movies: state.allMovies}
}
const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(getAllMoviesThunk())
  }
}

const AllMovies = connect(mapStateToProps)(mapDispatchToProps)(
  DisconnectedAllMovies
)
export default AllMovies

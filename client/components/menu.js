import React from 'react'
import {Link, BrowserRouter} from 'react-router-dom'
import store from '../store'
import {selectGenre, getAllMoviesThunk} from '../store/movies'
import {connect} from 'react-redux'

const genres = [
  'all',
  'action',
  'comedy',
  'horror',
  'drama',
  'romance',
  'thriller',
  'scifi'
]

class DisconnectedMenu extends React.Component {
  render() {
    return (
      <div>
        {genres.map((genre, id) => (
          <div key={id}>
            <Link
              to={`/movies/${genre}`}
              onClick={() =>
                store.dispatch(
                  getAllMoviesThunk(
                    genre[0].toUpperCase() + genre.slice(1).toLowerCase()
                  )
                )
              }
            >
              {genre}
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

// <div>
//     <Link to='/'>All Movies</Link>
//     <Link to='/movies/action'>Action</Link>
//     <Link>Comedy</Link>
//     <Link>Drama</Link>
//     <Link>Horror</Link>
//     <Link>Romance</Link>
//     <Link>Thriller</Link>
//     <Link>Science Fiction</Link>
// </div>

// const mapStateToProps = state => {
//   return {state: state}
// }

export default connect()(DisconnectedMenu)

// export default Menu

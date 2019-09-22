import React from 'react'
import {Link, BrowserRouter} from 'react-router-dom'
import store from '../store'
import {
  selectGenre,
  getAllMoviesThunk,
  getFeaturedMoviesThunk
} from '../store/movies'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

const genres = [
  'action',
  'comedy',
  'horror',
  'drama',
  'romance',
  'thriller',
  'scifi'
]

class DisconnectedMenu extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    return (
      <div id="categories">
        <Link
          to="/movies/all"
          onClick={() => store.dispatch(getFeaturedMoviesThunk())}
        >
          All Movies
        </Link>
        {genres.map((genre, id) => (
          <div key={id}>
            <Link
              to={`/movies/${genre}`}
              onClick={() =>
                store.dispatch(
                  getAllMoviesThunk(genre[0].toUpperCase() + genre.slice(1))
                )
              }
            >
              {genre[0].toUpperCase() + genre.slice(1)}
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

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedMenu)

// export default Menu

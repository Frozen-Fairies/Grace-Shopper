import React from 'react'
import {Link, BrowserRouter} from 'react-router-dom'
import store from '../store'
import {getAllMoviesThunk, getFeaturedMoviesThunk} from '../store/movies'
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
      <div className="block is-primary">
        <hr className="hr" />
        <aside className="menu-list">
          <div className="container level-item">
            <Link
              to="/movies/featured"
              className="menu-item"
              onClick={() => store.dispatch(getFeaturedMoviesThunk())}
            >
              Featured
            </Link>
            {genres.map((genre, id) => (
              <Link
                to={`/movies/${genre}`}
                className="menu-item"
                key={id}
                onClick={() =>
                  store.dispatch(
                    getAllMoviesThunk(genre[0].toUpperCase() + genre.slice(1))
                  )
                }
              >
                {genre[0].toUpperCase() + genre.slice(1)}
              </Link>
            ))}
          </div>
        </aside>
        <hr className="hr" />
      </div>
    )
  }
}

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

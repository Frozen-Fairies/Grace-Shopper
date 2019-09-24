/* eslint-disable no-lonely-if */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleMovieThunk} from '../store/movies'
import {addToCartThunk, addToGuestCart} from '../store/cart'

class DisconnectedSingleMovieView extends React.Component {
  componentDidMount() {
    this.props.getSingleMovie(
      this.props.match.params.genre,
      this.props.match.params.uniqueId
    )
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    let newCartProps = []
    for (let j = 0; j < this.props.cart.length; j++) {
      if (this.props.cart[j].orderId) {
        newCartProps.push(this.props.cart[j])
      }
    }
    let localStorageCart = []
    try {
      localStorageCart = JSON.parse(window.localStorage.cart)
    } catch (error) {
      console.log(error)
    }
    for (let i = 0; i < localStorageCart.length; i++) {
      if (!localStorageCart[i].orderId) {
        newCartProps.push(localStorageCart[i])
      }
    }
    this.props.addToGuestCart(newCartProps)
  }

  async handleAddToCart(event) {
    event.preventDefault()
    let quantity
    if (!this.state) {
      quantity = 1
    } else {
      quantity = this.state.quantity
    }
    if (this.props.user.id) {
      await this.props.addToCart(this.props.movies[0].id, quantity)
    } else {
      // if(this.props.cart.includes(`filmId: ${this.props.movies[0].id}`)) {

      // } else {
      //   this.props.cart.push({
      //     price: this.props.movies[0].price,
      //     quantity: quantity,
      //     filmId: this.props.movies[0].id
      //   })
      // }
      let itemHolder = this.props.cart.filter(item => {
        if (item.filmId === this.props.movies[0].id) {
          return item
        }
      })
      // PASS IMAGEURL AND TITLE IN TO THE GUESTCART PROBABLY THE EASIEST WAY TO HANDLE THIS
      if (itemHolder.length) {
        itemHolder[0].quantity += parseInt(
          event.target.quantity_input.value,
          10
        ) // this should add to quantity if there is already an instance of that movie
      } else {
        this.props.cart.push({
          price: this.props.movies[0].price,
          quantity: quantity,
          filmId: this.props.movies[0].id,
          imageUrl: this.props.movies[0].imageUrl,
          title: this.props.movies[0].title
        })
      }
    }
    window.localStorage.setItem('cart', JSON.stringify(this.props.cart))
  }

  async handleQuantityChange(event) {
    // Without async and await, the value setState is always one character behind, for some reason
    await this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  render() {
    const movie = this.props.movies[0]
    let lastTag
    if (!movie) {
      return <div>...Loading</div>
    }
    lastTag = movie.tags[movie.tags.length - 1]

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
                <form
                  id="add-to-cart"
                  onSubmit={event => {
                    this.handleAddToCart(event)
                  }}
                  onChange={event => {
                    this.handleQuantityChange(event)
                  }}
                >
                  Quantity:{' '}
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    defaultValue={1}
                    id="quantity_input"
                  />{' '}
                  &nbsp;
                  <button type="submit">Add To Cart</button>
                </form>
              </div>
              <div className="tile">
                <p>
                  {movie.tags.slice(0, -1).map(tag => {
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
  return {
    movies: state.movies.allMovies,
    user: state.user,
    cart: state.cart.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleMovie: (genre, filmId) =>
      dispatch(getSingleMovieThunk(genre, filmId)),
    addToCart: (item, quantity) => dispatch(addToCartThunk(item, quantity)),
    addToGuestCart: cart => dispatch(addToGuestCart(cart))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleMovieView
)

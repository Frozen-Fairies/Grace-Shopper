import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {
  fetchCart,
  fetchCartForCartView,
  checkoutThunk,
  fetchCartForGuestCartView
} from '../store/cart'

class CartView extends React.Component {
  componentDidMount() {
    this.props.fetchCartForCartView()
    if (!this.props.user.id) {
      this.props.fetchCartForGuestCartView(JSON.parse(window.localStorage.cart))
    } else {
      this.props.fetchCartForCartView()
    }
  }

  render() {
    // console.dir(this.props.cart, 'this is props.cart')
    // console.dir(JSON.parse(window.localStorage.cart), 'this is local storage cart')
    return (
      <div>
        <ul>
          {this.props.cart.length > 0 ? (
            this.props.cart.map((item, idx) => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  filmInfo={this.props.filmData[idx]}
                  idx={idx}
                />
              )
            })
          ) : (
            <li>Your cart is empty</li>
          )}
        </ul>
        <div>
          <form
            onSubmit={evt => {
              evt.preventDefault()
              const newProps = {
                address: evt.target.address.value
              }
              this.props.checkout(newProps)
            }}
          >
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={this.props.user.address}
            />
            <button type="submit">
              <i className="fad fa-shopping-cart" /> Place Order
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    filmData: state.cart.filmData,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    fetchCartForCartView: () => dispatch(fetchCartForCartView()),
    fetchCartForGuestCartView: cart =>
      dispatch(fetchCartForGuestCartView(cart)),
    checkout: address => dispatch(checkoutThunk(address))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView)

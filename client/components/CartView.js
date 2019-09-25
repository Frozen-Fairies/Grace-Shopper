import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import Payment from './Payment'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {
  fetchCart,
  fetchCartForCartView,
  checkoutThunk,
  fetchCartForGuestCartView,
  guestCheckoutThunk
} from '../store/cart'

class CartView extends React.Component {
  componentDidMount() {
    this.props.fetchCartForCartView()
    if (!this.props.user.id && window.localStorage.cart) {
      this.props.fetchCartForGuestCartView(JSON.parse(window.localStorage.cart))
    } else {
      this.props.fetchCartForCartView()
    }
  }

  render() {
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
            onSubmit={
              this.props.user.id
                ? evt => {
                    evt.preventDefault()
                    const newProps = {
                      address: evt.target.address.value
                    }
                    this.props.checkout(newProps)
                  }
                : evt => {
                    evt.preventDefault()
                    this.props.guestCheckout(
                      this.props.cart,
                      evt.target.email.value,
                      evt.target.address.value
                    )
                  }
            }
          >
            {' '}
            {this.props.user.id ? (
              <input
                type="text"
                name="address"
                id="address"
                defaultValue={this.props.user.address}
              />
            ) : (
              <div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue="email"
                />{' '}
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue="address"
                />
              </div>
            )}
            {this.props.cart.length > 0 ? (
              <button type="submit">
                <i className="fad fa-shopping-cart" /> Place Order
              </button>
            ) : (
              <button type="submit" disabled={true}>
                <i className="fad fa-shopping-cart" /> Place Order
              </button>
            )}
          </form>
        </div>

        <div>
          <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
            <div className="example">
              <Elements>
                <Payment />
              </Elements>
            </div>
          </StripeProvider>
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
    checkout: address => dispatch(checkoutThunk(address)),
    guestCheckout: (cart, email, address) =>
      dispatch(guestCheckoutThunk(cart, email, address))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView)

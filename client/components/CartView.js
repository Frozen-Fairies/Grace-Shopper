import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchCart, fetchCartForCartView} from '../store/cart'

class CartView extends React.Component {
  componentDidMount() {
    this.props.fetchCartForCartView()
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
                />
              )
            })
          ) : (
            <li>Your cart is empty</li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    filmData: state.cart.filmData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    fetchCartForCartView: () => dispatch(fetchCartForCartView())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView)

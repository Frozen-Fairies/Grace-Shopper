import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchCart} from '../store/cart'

class CartView extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.cart.map(item => {
            return <CartItem key={item.id} item={item} />
          })}
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartView)

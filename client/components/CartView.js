import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchCart} from '../store/cart'

class CartView extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    console.log(this.props, 'THIS IS PROPS IN CARTVIEW')
    // const films = this.props.cart[0].films
    return (
      <div>
        <ul>
          {this.props.cart.length > 0 ? (
            this.props.cart.map(item => {
              return <CartItem key={item.id} item={item} />
            })
          ) : (
            <i className="far fa-hand-middle-finger" />
          )}
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

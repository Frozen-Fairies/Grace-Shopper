import React from 'react'
import {Link} from 'react-router-dom'
import {removeFromCartThunk} from '../store/cart'
import {connect} from 'react-redux'

// The remove function works but it renders the page empty until you
// refresh and it is properly connected

// Need to be a class component for quantity change form?

const CartItem = props => {
  const total = props.item.price * props.item.quantity / 100
  // console.log(props.item, 'THIS IS PROPS')
  return (
    <div>
      {/* <img src={props.item.imageUrl} /> */}
      <p>{props.item.title}</p>
      <p>Total price: {total}</p>
      <p>Qty: {props.item.quantity}</p>
      <button
        type="button"
        onClick={() => props.removeFromCartThunk(props.item)}
      >
        Remove
      </button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCartThunk: item => dispatch(removeFromCartThunk(item))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)

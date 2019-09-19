import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  return (
    <div>
      <img src={props.imageUrl} />
      <p>{props.title}</p>
      <p>Total price: {props.price * props.quantity}</p>
      <p>Qty: {props.quantity}</p>
    </div>
  )
}

export default CartItem

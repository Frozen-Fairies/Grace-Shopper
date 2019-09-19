import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  console.log(props, 'PROPS')
  const total = props.item.price * props.item.quantity / 100
  return (
    <div>
      {/* <img src={props.item.imageUrl} /> */}
      <p>{props.item.title}</p>
      <p>Total price: {total}</p>
      <p>Qty: {props.item.quantity}</p>
    </div>
  )
}

export default CartItem

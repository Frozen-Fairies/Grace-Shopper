import React from 'react'
import {Link} from 'react-router-dom'
import {removeFromCartThunk, updateCartThunk} from '../store/cart'
import {connect} from 'react-redux'

// The remove function works but it renders the page empty until you
// refresh and it is properly connected

// The Update button gets a 500 from the api

const CartItem = props => {
  const total = props.item.price * props.item.quantity / 100
  console.log(props, 'THIS IS PROPS')
  return (
    <div>
      {props.filmInfo ? (
        <div>
          {' '}
          <img src={props.filmInfo.imageUrl} />
          <p>{props.filmInfo.title}</p>{' '}
        </div>
      ) : (
        'sup'
      )}
      <p>Total price: {total}</p>
      <form
        onSubmit={evt => {
          evt.preventDefault()
          // console.log(props.item, 'props.item')
          // console.log(evt.target, 'evt.target')
          const newProps = {
            ...props.item,
            quantity: evt.target.quantity_input.value
          }
          props.updateCartThunk(newProps)
        }}
      >
        Qty:{' '}
        <input
          type="number"
          name="quantity"
          min="1"
          defaultValue={props.item.quantity}
          id="quantity_input"
        />{' '}
        <button type="submit">Update</button>
      </form>
      <div>
        <button
          type="button"
          onClick={() => props.removeFromCartThunk(props.item)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCartThunk: item => dispatch(removeFromCartThunk(item)),
    updateCartThunk: item => dispatch(updateCartThunk(item))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)

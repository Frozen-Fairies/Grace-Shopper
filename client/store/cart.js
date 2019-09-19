/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

// INITIAL STATE
const defaultCart = {
  cart: []
}

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'

// ACTION CREATOR
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  item
})

const updateCart = item => ({
  type: UPDATE_CART,
  item
})

// THUNK CREATOR
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/cart')
      dispatch(getCart([data]))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCartThunk = (id, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/orders/cart/${id}`, {
        quantity: quantity
      })
      dispatch(addToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeFromCartThunk = item => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/cart/${item.id}`, item)
      dispatch(removeFromCart(item))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCartThunk = item => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/cart/${item.id}`, item)
      dispatch(updateCart(item))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.item]}
    case REMOVE_FROM_CART:
      const newCart = state.cart.filter(item => {
        if (item.id !== action.item.id) {
          return item
        }
      })
      return {...state, cart: newCart}
    case UPDATE_CART:
      const updatedCart = state.cart.map(item => {
        if (item.id === action.item.id) {
          item.quantity = action.item.quantity
          return item
        } else {
          return item
        }
      })
      return {...state, cart: updatedCart}
    default:
      return state
  }
}

/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

// INITIAL STATE
const defaultCart = {
  cart: [],
  filmData: [],
  orderHistory: []
}

// ACTION TYPES
const GET_CART = 'GET_CART'
const GET_CART_FOR_CART_VIEW = 'GET_CART_FOR_CART_VIEW'
const ADD_TO_CART = 'ADD_TO_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'
const CHECKOUT = 'CHECKOUT'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

// ACTION CREATOR
const getCart = cart => ({
  type: GET_CART,
  cart
})

const getCartForCartView = (cart, filmData) => ({
  type: GET_CART_FOR_CART_VIEW,
  cart,
  filmData
})

const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

export const addToGuestCart = cart => ({
  type: ADD_TO_GUEST_CART,
  cart
})

const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  item
})

const updateCart = item => ({
  type: UPDATE_CART,
  item
})

const checkout = address => ({
  type: CHECKOUT,
  address
})

const getOrderHistory = orderHistory => ({
  type: GET_ORDER_HISTORY,
  orderHistory
})

// THUNK CREATOR
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/cart')
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCartForCartView = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/cart/complete')
      dispatch(getCartForCartView(data.cartFilms, data.filmInfo))
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
  // console.log(item, 'item in the thunk')
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/cart/${item.filmId}`, item)
      dispatch(removeFromCart(item))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCartThunk = item => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/cart/${item.filmId}`, item)
      dispatch(updateCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutThunk = address => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/cart/checkout`, {address})
      dispatch(checkout(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getOrderHistoryThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/history`)
      dispatch(getOrderHistory(data))
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
    case GET_CART_FOR_CART_VIEW:
      return {
        ...state,
        cart: action.cart,
        filmData: action.filmData
      }
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.item]}
    case REMOVE_FROM_CART:
      const newCart = state.cart.filter(item => {
        if (item.filmId !== action.item.filmId) {
          return item
        }
      })
      // console.log(state.cart, 'THIS IS CART')
      return {...state, cart: newCart}
    case UPDATE_CART:
      const updatedCart = state.cart.map(item => {
        if (item.filmId === action.item.filmId) {
          item.quantity = action.item.quantity
          return item
        } else {
          return item
        }
      })
      return {...state, cart: updatedCart}
    case ADD_TO_GUEST_CART:
      return {...state, cart: action.cart}
    case CHECKOUT:
      return {...state, cart: []}
    case GET_ORDER_HISTORY:
      return {...state, orderHistory: action.orderHistory}
    default:
      return state
  }
}

/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

// INITIAL STATE
const defaultAdmin = {
  films: [],
  orders: []
}

// ACTION TYPES
const GET_ALL_FILMS = 'GET_ALL_FILMS'
const UPDATE_FILM = 'UPDATE_FILM'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_USER_ORDERS = 'GET_USER_ORDERS'

// ACTION CREATOR
const getAllFilms = films => ({
  type: GET_ALL_FILMS,
  films
})

const updateFilm = film => ({
  type: UPDATE_FILM,
  film
})

const getAllOrders = orders => ({
  type: GET_ALL_ORDERS,
  orders
})

const getUserOrders = orders => ({
  type: GET_USER_ORDERS,
  orders
})

// THUNK CREATOR
export const getAllFilmsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/admin/films')
      dispatch(getAllFilms(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateFilmThunk = (film, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/admin/films/${id}`, film)
      dispatch(updateFilm(data))
      history.push('/admin/films')
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllOrdersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/admin/orders/history')
      dispatch(getAllOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getUserOrdersThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/admin/orders/history/${id}`)
      dispatch(getAllOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
export default function(state = defaultAdmin, action) {
  switch (action.type) {
    case GET_ALL_FILMS:
      return {...state, films: action.films}
    case UPDATE_FILM:
      return state
    case GET_ALL_ORDERS:
      return {...state, orders: action.orders}
    case GET_USER_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

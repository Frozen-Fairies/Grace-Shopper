/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

// INITIAL STATE
const defaultAdmin = {
  films: []
}

// ACTION TYPES
const GET_ALL_FILMS = 'GET_ALL_FILMS'
const UPDATE_FILM = 'UPDATE_FILM'

// ACTION CREATOR
const getAllFilms = films => ({
  type: GET_ALL_FILMS,
  films
})

const updateFilm = film => ({
  type: UPDATE_FILM,
  film
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

// REDUCER
export default function(state = defaultAdmin, action) {
  switch (action.type) {
    case GET_ALL_FILMS:
      return {...state, films: action.films}
    case UPDATE_FILM:
      return state
    default:
      return state
  }
}

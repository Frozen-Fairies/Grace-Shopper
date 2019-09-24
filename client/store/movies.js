import Axios from 'axios'

const inititalState = {
  allMovies: [],
  selectedGenre: ''
}
const SELECT_GENRE = 'SELECT_GENRE'

export const selectGenre = genre => ({
  type: SELECT_GENRE,
  genre
})

const GET_ALL_MOVIES = 'GET_ALL_MOVIES'
const GET_MOVIES_FOR_TAG = 'GET_MOVIES_FOR_TAG'

const getMovies = movies => ({
  type: GET_ALL_MOVIES,
  movies
})

const getMoviesForTag = movies => ({
  type: GET_MOVIES_FOR_TAG,
  movies
})

export const getAllMoviesThunk = genre => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/films/genres/${genre}`)
      dispatch(selectGenre(genre))
      dispatch(getMovies(data))
    } catch (error) {
      console.log('error with movies')
    }
  }
}

export const getFeaturedMoviesThunk = (genre = 'featured') => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/films`)
      dispatch(selectGenre(genre))
      dispatch(getMovies(data))
    } catch (error) {
      console.log('error with movies')
    }
  }
}

export const getSingleMovieThunk = (genre, filmId) => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/films/${filmId}`)

      dispatch(selectGenre(genre))
      dispatch(getMovies([data]))
    } catch (error) {
      console.log('error with movie')
    }
  }
}

export const getMoviesForTagThunk = tag => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/films/tags/${tag}`)
      console.dir(data)
      dispatch(getMoviesForTag(data))
    } catch (error) {
      console.log('error with movies')
    }
  }
}

const moviesReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {...state, allMovies: action.movies}
    case SELECT_GENRE:
      return {...state, selectedGenre: action.genre}
    case GET_MOVIES_FOR_TAG:
      return {...state, allMovies: action.movies}
    default:
      return state
  }
}

export default moviesReducer

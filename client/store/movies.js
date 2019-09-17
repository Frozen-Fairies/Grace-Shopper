import Axios from 'axios'

const inititalState = {
  allMovies: [],
  selectedGenre: '',
  selectedMovie: {}
}

const GET_ALL_MOVIES = 'GET_ALL_MOVIES'

const getMovies = movies => ({
  type: GET_ALL_MOVIES,
  movies
})

export const getAllMoviesThunk = genre => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/films/genres/${genre}`)
      dispatch(getMovies(data))
    } catch (error) {
      console.log('error with movies')
    }
  }
}

const SELECT_GENRE = 'SELECT_GENRE'

export const selectGenre = genre => ({
  type: SELECT_GENRE,
  genre
})

const moviesReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {...state, allMovies: action.movies}
    case SELECT_GENRE:
      return {...state, selectedGenre: action.genre}
    default:
      return state
  }
}

export default moviesReducer

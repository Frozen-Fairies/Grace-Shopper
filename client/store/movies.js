import Axios from 'axios'

const GET_ALL_MOVIES = 'GET_ALL_MOVIES'

const getMovies = movies => ({
  type: GET_ALL_MOVIES,
  movies
})

const inititalState = {
  allMovies: [],
  selectedMovie: {}
}

export const getAllMoviesThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/movies')
      dispatch(getMovies(data))
    } catch (error) {
      console.log('error with movies')
    }
  }
}

const moviesReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {...state, allMovies: action.movies}
    default:
      return state
  }
}

export default moviesReducer

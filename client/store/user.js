import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ALREADY_IN_USE = 'ALREADY_IN_USE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const errorAction = () => ({
  type: ALREADY_IN_USE,
  error: 'This email is already in use.'
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
export const updateUser = newInfo => async dispatch => {
  try {
    const res = await axios.put('/api/users', newInfo)
    dispatch(me())
    history.push('/profile')
  } catch (error) {
    return dispatch(errorAction())
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    console.log(method)
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    console.log(res.data)
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ALREADY_IN_USE:
      return {...state, error: action.error}
    default:
      return state
  }
}

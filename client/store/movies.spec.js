/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getAllMoviesThunk} from './movies'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('movie thunk creators', () => {
  let store
  let mockAxios

  const initialState = {allMovies: [], selectedGenre: ''}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('AllMovies', () => {
    it('dispatches GET_ALL_MOVIES and SELECT_GENRE actions', async () => {
      const fakeMovies = [
        {movie: 'horror'},
        {movie: 'comedy'},
        {movie: 'drama'}
      ]

      mockAxios
        .onGet(`/api/films/genres/horror`)
        .replyOnce(200, [fakeMovies[0]])
      await store.dispatch(getAllMoviesThunk('horror'))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SELECT_GENRE')
      expect(actions[0].genre).to.be.equal('horror')
      expect(actions[1].type).to.be.equal('GET_ALL_MOVIES')
      expect(actions[1].movies.length).to.be.equal(1)
    })
  })
})

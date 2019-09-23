/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, render} from 'enzyme'
import {Router} from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import configureMockStore from 'redux-mock-store'
import SingleMovie from './singleMovie'
import history from '../history'

const adapter = new Adapter()
enzyme.configure({adapter})

const exampleMovie = {
  title: 'Iron Man',
  description:
    'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
  genre: 'Action',
  published: true,
  inventory: 100,
  price: 1099,
  compareAtPrice: null,
  imageUrl:
    'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
  imageAltText: 'Iron Man',
  releaseDate: '2008-05-02',
  tags: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Terrence Howard'],
  createdAt: '2019-09-17T16:04:18.792Z',
  updatedAt: '2019-09-17T16:04:18.792Z'
}

describe('<SingleMovie /> component', () => {
  let singleMovie
  beforeEach(() => {
    singleMovie = render(
      <Router history={history}>
        <SingleMovie movie={exampleMovie} />
      </Router>
    )
  })
  it('renders a single movie correctly', () => {
    expect(singleMovie['0'].attribs.class).to.be.equal('column is-one-quarter')
    expect(singleMovie.find('h1').html()).to.be.equal('Iron Man')
  })
})

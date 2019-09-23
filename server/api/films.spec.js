/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Film = db.model('film')

describe('Film routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/films/', () => {
    const ironMan = {
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
    const guardians = {
      title: 'Guardians of the Galaxy',
      description:
        'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
      genre: 'Action',
      published: true,
      inventory: 110,
      price: 1199,
      compareAtPrice: null,
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      imageAltText: 'Guardians of the Galaxy',
      releaseDate: '2014-08-01',
      tags: ['Chris Pratt', 'Vin Diesel', 'Bradley Cooper'],
      createdAt: '2019-09-17T16:07:10.268Z',
      updatedAt: '2019-09-17T16:07:10.268Z'
    }

    beforeEach(() => {
      Film.create(ironMan)
      return Film.create(guardians)
    })

    it('Returns an array', async () => {
      const res = await request(app).get('/api/films')

      expect(res.body).to.be.an('array')
    })

    it('Contains 2 items', async () => {
      const res = await request(app).get('/api/films')

      expect(res.body.length).to.be.equal(2)
    })

    it('Returns the correct film titles, in the correct order', async () => {
      const res = await request(app).get('/api/films')

      expect(res.body[0].title).to.be.equal('Guardians of the Galaxy')
      expect(res.body[1].title).to.be.equal('Iron Man')
    })
  })
})

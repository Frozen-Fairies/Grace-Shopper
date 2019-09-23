const {expect} = require('chai')
const db = require('../index')
const Film = db.model('film')

describe('Film model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('model validation', () => {
    describe('correct slugging', () => {
      let film

      beforeEach(async () => {
        film = await Film.create({
          uniqueId: 'super fun movie',
          title: 'Super Fun Movie',
          description: 'A move that is fun',
          genre: 'Comedy',
          published: true,
          inventory: 5,
          price: 1000,
          compareAtPrice: 2000
        })
      })

      it('the slug is correctly generated', () => {
        expect(film.uniqueId()).to.be.equal('super-fun-movie')
      })

      it('price is an INT', () => {
        expect(typeof film.price()).to.be.equal('integer')
      })
    })
  })
})

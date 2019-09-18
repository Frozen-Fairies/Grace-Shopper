'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

const films = [
  {
    uniqueId: 'it-chapter-2',
    title: 'It Chapter 2',
    description: 'Really sppoky clown attacks Maine AGAIN!',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 20,
    compareAtPrice: 20,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjEwOS00NzI5LTlkNDAtZmEwZDFmYmM2MjU2XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
    imageAltText: 'Sup',
    releaseDate: now(), // Make sure this isnt stupid
    tags: ['clown', 'scary', 'maine']
  },
  {
    uniqueId: 'robocop',
    title: 'Robocop',
    description: 'Detroit robo police',
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: 10,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81VLcqueY-L._SY679_.jpg',
    imageAltText: 'Freeze',
    releaseDate: now(), // Make sure this isnt stupid
    tags: ['police', 'detroit', 'movie']
  },
  {
    uniqueId: 'the-incredibles',
    title: 'The Incredibles',
    description: 'Family Fun super heros',
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 20,
    compareAtPrice: 20,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjEwOS00NzI5LTlkNDAtZmEwZDFmYmM2MjU2XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
    imageAltText: 'Sup',
    releaseDate: now(), // Make sure this isnt stupid
    tags: ['clown', 'scary', 'maine']
  },
  {
    uniqueId: 'it-chapter-2',
    title: 'It Chapter 2',
    description: 'Really sppoky clown attacks Maine AGAIN!',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 20,
    compareAtPrice: 20,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjEwOS00NzI5LTlkNDAtZmEwZDFmYmM2MjU2XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
    imageAltText: 'Sup',
    releaseDate: now(), // Make sure this isnt stupid
    tags: ['clown', 'scary', 'maine']
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

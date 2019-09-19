'use strict'

const db = require('../server/db')
const {User, Film} = require('../server/db/models')

const films = [
  {
    uniqueId: 'iron-man',
    title: 'Iron Man',
    description:
      'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
    genre: 'Superhero',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'Iron Man',
    releaseDate: '2008-05-02',
    tags: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Terrence Howard'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    uniqueId: 'guardians-of-the-galaxy',
    title: 'Guardians of the Galaxy',
    description:
      'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
    genre: 'Action',
    published: true,
    inventory: 110,
    price: 11,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'Guardians of the Galaxy',
    releaseDate: '2014-08-01',
    tags: ['Chris Pratt', 'Vin Diesel', 'Bradley Cooper'],
    createdAt: '2019-09-17T16:07:10.268Z',
    updatedAt: '2019-09-17T16:07:10.268Z'
  },
  {
    title: 'Captain America: The Winter Soldier',
    description:
      'As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.',
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SY1000_CR0,0,685,1000_AL_.jpg',
    imageAltText: 'Captain America: The Winter Soldier',
    releaseDate: '2014-04-04',
    tags: ['Chris Evans', 'Samuel L. Jackson', 'Scarlett Johansson'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Thor: Ragnarok',
    description:
      'Thor (Chris Hemsworth) is imprisoned on the planet Sakaar, and must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela (Cate Blanchett).',
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'Thor: Ragnarok',
    releaseDate: '2017-11-03',
    tags: [
      'Chris Hemsworth',
      'Tom Hiddleston',
      'Cate Blanchett',
      'Mark Ruffalo'
    ],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Captain America: The First Avenger',
    description:
      "Steve Rogers, a rejected military soldier transforms into Captain America after taking a dose of a 'Super-Soldier serum'. But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.",
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SY1000_CR0,0,640,1000_AL_.jpg',
    imageAltText: 'Captain America: The First Avenger',
    releaseDate: '2011-07-22',
    tags: ['Chris Evans', 'Hugo Weaving', 'Samuel L. Jackson', 'Hayley Atwell'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Spider-Man: Far from Home',
    description:
      'Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.',
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'Spider-Man: Far from Home',
    releaseDate: '2019-07-02',
    tags: [
      'Tom Holland',
      'Samuel L. Jackson',
      'Jake Gyllenhaal',
      'Marisa Tomei'
    ],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Avengers: Infinity War',
    description:
      'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'Avengers: Infinity War',
    releaseDate: '2019-07-02',
    tags: [
      'Robert Downey Jr.',
      'Chris Hemsworth',
      'Mark Ruffalo',
      'Chris Evans'
    ],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Black Panther',
    description:
      "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'Black Panther',
    releaseDate: '2018-02-16',
    tags: [
      'Chadwick Boseman',
      'Michael B. Jordan',
      "Lupita Nyong'o",
      'Danai Gurira'
    ],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Avengers: Endgame',
    description:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 10,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'Avengers: Endgame',
    releaseDate: '2018-02-16',
    tags: [
      'Robert Downey Jr.',
      'Chris Hemsworth',
      'Mark Ruffalo',
      'Chris Evans'
    ],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      name: 'cody',
      address: '123 Fake Street'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '222',
      name: 'murphy',
      address: '22 Ocean Street'
    }),
    User.create({
      email: 'bob@email.com',
      password: '456',
      name: 'bob',
      address: '88 Cookie Street'
    }),
    User.create({
      email: 'dan@email.com',
      password: '888',
      name: 'dan',
      address: '21 Jump Street'
    }),
    User.create({
      email: 'paul@email.com',
      password: '789',
      name: 'cody',
      address: '99 Favor Street'
    }),
    User.create({
      email: 'pete@email.com',
      password: '666',
      name: 'cody',
      address: '12 Spring Avenue'
    }),
    User.create({
      email: 'don@email.com',
      password: '321',
      name: 'cody',
      address: '77 Ocean Boulevard'
    }),
    User.create({
      email: 'ray@email.com',
      password: '111',
      name: 'cody',
      address: '11 Water Street'
    })
  ])

  await Promise.all(
    films.map(film => {
      return Film.create(film)
    })
  )

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

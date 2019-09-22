'use strict'

const db = require('../server/db')
const {User, Film} = require('../server/db/models')

const films = [
  {
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
  },
  {
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
  },
  {
    title: 'Captain America: The Winter Soldier',
    description:
      'As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.',
    genre: 'Action',
    published: true,
    inventory: 100,
    price: 1099,
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
    price: 1099,
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
    price: 1099,
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
    price: 1099,
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
    price: 1099,
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
    price: 1099,
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
    price: 1099,
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
  },
  {
    title: 'Twilight',
    description:
      "Bella Swan (Kristen Stewart) doesn't expect much when she moves to the small town of Forks, Washington, until she meets the mysterious and handsome Edward Cullen (Robert Pattinson)- a boy who's hiding a dark secret: he's a vampire.",
    genre: 'Romance',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://i.pinimg.com/originals/c6/10/2b/c6102b117162daef00f671a75cb194ef.jpg',
    imageAltText: 'Twilight',
    releaseDate: '2018-02-16',
    tags: ['Kristen Stewart'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Crazy Rich Asians',
    description:
      'Native New Yorker Rachel Chu accompanies her boyfriend to his best friend’s wedding in Singapore and meets his family for the first time.',
    genre: 'Romance',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTYxNDMyOTAxN15BMl5BanBnXkFtZTgwMDg1ODYzNTM@._V1_.jpg',
    imageAltText: 'Crazy Rich Asians',
    releaseDate: '2018-02-16',
    tags: ['Constance Wu', 'Henry Golding', 'Michelle Yeoh'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'It 2',
    description:
      "Defeated by members of the Losers' Club, the evil clown Pennywise returns 27 years later to terrorize the town of Derry, Maine, once again. Now adults, the childhood friends have long since gone their separate ways.",
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjEwOS00NzI5LTlkNDAtZmEwZDFmYmM2MjU2XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'It 2',
    releaseDate: '2018-02-16',
    tags: ['clowns', 'James McAvoy', 'Jessica Chastain'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Ring',
    description:
      'It begins as just another urban legend - the whispered tale of a nightmarish videotape that causes anyone who watches it to die seven days later.',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/3/37/Theringpostere.jpg',
    imageAltText: 'The Ring',
    releaseDate: '2018-02-16',
    tags: ['Naomi Watts', 'Brian Cox'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Grudge',
    description:
      'An American nurse living and working in Tokyo is exposed to a mysterious supernatural curse, one that locks a person in a powerful rage before claiming their life and spreading to another victim.',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjIxODg1Nzc3NF5BMl5BanBnXkFtZTcwMjM0MjEzMw@@._V1_.jpg',
    imageAltText: 'The Grudge',
    releaseDate: '2018-02-16',
    tags: ['Sarah Michelle Gellar', 'Jason Behr', 'Clea DuVall'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Eternal Sunshine Of The Spotless Mind',
    description:
      'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.',
    genre: 'Romance',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    imageAltText: 'Eternal Sunshine Of The Spotless Mind',
    releaseDate: '2018-02-16',
    tags: ['Kate Winslet', 'Jim Carey'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Superbad',
    description:
      'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl: 'https://www.cinemasterpieces.com/superbadebay.jpg',
    imageAltText: 'Superbad',
    releaseDate: '2018-02-16',
    tags: ['Michael Cera', 'Jonah Hill', 'Christopher Mintz-Plasse'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Pineapple Express',
    description:
      "A process server and his marijuana dealer wind up on the run from hitmen and a corrupt police officer after he witnesses his dealer's boss murder a competitor while trying to serve papers on him.",
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl: 'https://www.movieposter.com/posters/archive/main/69/MPW-34574',
    imageAltText: 'Pineapple Express',
    releaseDate: '2018-02-16',
    tags: ['Seth Rogen', 'James Franco', 'Gary Cole'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The 40-Year-Old Virgin',
    description:
      'Goaded by his buddies, a nerdy guy who\'s never "done the deed" only finds the pressure mounting when he meets a single mother.',
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTNjYTA1NDMtZGZmZi00MTdiLThjZTMtZWU1MGYyZjZkNzgxXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
    imageAltText: 'The 40-Year-Old Virgin',
    releaseDate: '2018-02-16',
    tags: ['Steve Carell', 'Catherine Keener', 'Paul Rudd'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Ted',
    description:
      'John Bennett, a man whose childhood wish of bringing his teddy bear to life came true, now must decide between keeping the relationship with the bear or his girlfriend, Lori.',
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61hYEm-udhL._SY741_.jpg',
    imageAltText: 'Ted',
    releaseDate: '2018-02-16',
    tags: ['Mark Wahlberg', 'Mila Kunis', 'Seth MacFarlane'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Hangover',
    description:
      'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51uL8-rGZRL.jpg',
    imageAltText: 'The Hangover',
    releaseDate: '2018-02-16',
    tags: ['Zach Galifianakis', 'Bradley Cooper', 'Justin Bartha'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Conjuring',
    description:
      'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81NwnEjW27L._SY679_.jpg',
    imageAltText: 'The Conjuring',
    releaseDate: '2018-02-16',
    tags: ['Patrick Wilson', 'Vera Farmiga', 'Ron Livingston'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Conjuring 2',
    description:
      'Ed and Lorraine Warren travel to North London to help a single mother raising 4 children alone in a house plagued by a supernatural spirit.',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81%2B6HO7AnkL._SY679_.jpg',
    imageAltText: 'The Conjuring 2',
    releaseDate: '2018-02-16',
    tags: ['Vera Farmiga', 'Patrick Wilson', 'Madison Wolfe'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Annabelle',
    description:
      'A couple begins to experience terrifying supernatural occurrences involving a vintage doll shortly after their home is invaded by satanic cultists.',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/614rium%2BzxL._SY606_.jpg',
    imageAltText: 'Annabelle',
    releaseDate: '2018-02-16',
    tags: ['Ward Horton', 'Annabelle Wallis', 'Alfre Woodard'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Annabelle Comes Home',
    description:
      'While babysitting the daughter of Ed and Lorraine Warren, a teenager and her friend unknowingly awaken an evil spirit trapped in a doll.',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2019/06/annabelle_comes_home_ver4_xlg.jpg?ssl=1',
    imageAltText: 'Annabelle Comes Home',
    releaseDate: '2018-02-16',
    tags: ['Vera Farmiga', 'Patrick Wilson', 'Mckenna Grace'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Borat',
    description:
      'Kazakh TV talking head Borat is dispatched to the United States to report on the greatest country in the world. With a documentary crew in tow, Borat becomes more interested in locating and marrying Pamela Anderson.',
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTk0MTQ3NDQ4Ml5BMl5BanBnXkFtZTcwOTQ3OTQzMw@@._V1_.jpg',
    imageAltText: 'Borat',
    releaseDate: '2018-02-16',
    tags: ['Sacha Baron Cohen', 'Ken Davitian', 'Luenell'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Nun',
    description:
      'A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.',
    genre: 'Horror',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://i.pinimg.com/736x/8e/56/ee/8e56ee363b8513cd93287e52354102ce.jpg',
    imageAltText: 'The Nun',
    releaseDate: '2018-02-16',
    tags: ['Demián Bichir', 'Taissa Farmiga', 'Jonas Bloquet'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Hangover Part II',
    description:
      "Two years after the bachelor party in Las Vegas, Phil, Stu, Alan, and Doug jet to Thailand for Stu's wedding. Stu's plan for a subdued pre-wedding brunch, however, goes seriously awry.",
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://cdn.traileraddict.com/content/warner-bros-pictures/hangover_part_ii-5.jpg',
    imageAltText: 'The Hangover Part II',
    releaseDate: '2018-02-16',
    tags: ['Bradley Cooper', 'Zach Galifianakis', 'Ed Helms'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Hangover Part III',
    description:
      'When one of their own is kidnapped by an angry gangster, the Wolf Pack must track down Mr. Chow, who has escaped from prison and is on the run.',
    genre: 'Comedy',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'http://cdn.collider.com/wp-content/uploads/2013/04/the-hangover-part-3-poster-ed-helms-ken-jeong.jpg',
    imageAltText: 'The Hangover Part III',
    releaseDate: '2018-02-16',
    tags: ['Bradley Cooper', 'Zach Galifianakis', 'Ed Helms'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Wolf of Wall Street',
    description:
      'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    genre: 'Drama',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71--vKV8gVL._SY679_.jpg',
    imageAltText: 'The Wolf of Wall Street',
    releaseDate: '2018-02-16',
    tags: ['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Django Unchained',
    description:
      'With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.',
    genre: 'Drama',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51dNfU53lNL.jpg',
    imageAltText: 'Django Unchained',
    releaseDate: '2018-02-16',
    tags: ['Jamie Foxx', 'Christoph Waltz', 'Leonardo DiCaprio'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Inglourious Basterds',
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    genre: 'Drama',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://img1.iwascoding.com/4/paid/2018/10/15/ED/B72745B0B2D301366FE9543D7EF8F2C1.jpg',
    imageAltText: 'Inglourious Basterds',
    releaseDate: '2018-02-16',
    tags: ['Brad Pitt', 'Diane Kruger', 'Eli Roth'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Pulp Fiction',
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    genre: 'Drama',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1416/8662/products/pulp_fiction_1994_french_original_film_art_ab0be132-fe07-4c64-ba85-c2dd6d8e1349_2000x.jpg?v=1552985404',
    imageAltText: 'Pulp Fiction',
    releaseDate: '2018-02-16',
    tags: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'The Notebook',
    description:
      'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.',
    genre: 'Romance',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://imgc.allpostersimages.com/img/print/u-g-F4S66Q0.jpg?w=550&h=550&p=0',
    imageAltText: 'The Notebook',
    releaseDate: '2018-02-16',
    tags: ['Gena Rowlands', 'James Garner', 'Rachel McAdams'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Kill Bill: Vol. 1',
    description:
      'After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.',
    genre: 'Thriller',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://i.pinimg.com/originals/41/1a/18/411a18522a6a79bb3a040eeeac422852.jpg',
    imageAltText: 'Kill Bill: Vol. 1',
    releaseDate: '2018-02-16',
    tags: ['Uma Thurman', 'David Carradine', 'Daryl Hannah'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Kill Bill: Vol. 2',
    description:
      'The Bride continues her quest of vengeance against her former boss and lover Bill, the reclusive bouncer Budd, and the treacherous, one-eyed Elle.',
    genre: 'Thriller',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1057/4964/products/kill-bill-volume-2-vintage-movie-poster-original-1-sheet-27x41-6011.jpg?v=1534412887',
    imageAltText: 'Kill Bill: Vol. 2',
    releaseDate: '2018-02-16',
    tags: ['Uma Thurman', 'David Carradine', 'Michael Madsen'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Saw',
    description:
      "Two strangers, who awaken in a room with no recollection of how they got there, soon discover they're pawns in a deadly game perpetrated by a notorious serial killer.",
    genre: 'Thriller',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://i.pinimg.com/474x/45/2d/82/452d825b75ea2fd8785d84c982ae2ab2.jpg',
    imageAltText: 'Saw',
    releaseDate: '2018-02-16',
    tags: ['Cary Elwes', 'Leigh Whannell', 'Danny Glover'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Shutter Island',
    description:
      'In 1954, a U.S. Marshal investigates the disappearance of a murderer, who escaped from a hospital for the criminally insane.',
    genre: 'Thriller',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'http://cdn.collider.com/wp-content/uploads/shutter-island-movie-poster.jpg',
    imageAltText: 'Shutter Island',
    releaseDate: '2018-02-16',
    tags: ['Leonardo DiCaprio', 'Emily Mortimer', 'Mark Ruffalo'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: 'Thriller',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/513nlpPM0UL.jpg',
    imageAltText: 'Inception',
    releaseDate: '2018-02-16',
    tags: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Star Wars: The Rise of Skywalker',
    description:
      'The surviving Resistance faces the First Order once more in the final chapter of the Skywalker saga.',
    genre: 'Scifi',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BZWU1NDI3YjEtZTlmMy00Y2FmLWI1ZDYtMjYwNDUxYTdlODllXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    imageAltText: 'Star Wars: The Rise of Skywalker',
    releaseDate: '2018-02-16',
    tags: ['Billie Lourd', 'Adam Driver', 'Daisy Ridley'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Star Wars: The Last Jedi',
    description:
      'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers.',
    genre: 'Scifi',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    imageAltText: 'Star Wars: The Last Jedi',
    releaseDate: '2018-02-16',
    tags: ['Daisy Ridley', 'John Boyega', 'Mark Hamill'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Star Wars: Episode VII - The Force Awakens',
    description:
      "Three decades after the Empire's defeat, a new threat arises in the militant First Order. Defected stormtrooper Finn and the scavenger Rey are caught up in the Resistance's search for the missing Luke Skywalker.",
    genre: 'Scifi',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg',
    imageAltText: 'Star Wars: Episode VII - The Force Awakens',
    releaseDate: '2018-02-16',
    tags: ['Daisy Ridley', 'John Boyega', 'Oscar Isaac'],
    createdAt: '2019-09-17T16:04:18.792Z',
    updatedAt: '2019-09-17T16:04:18.792Z'
  },
  {
    title: 'Star Wars: Episode III - Revenge of the Sith',
    description:
      'Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.',
    genre: 'Scifi',
    published: true,
    inventory: 100,
    price: 1099,
    compareAtPrice: null,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SY1000_SX750_AL_.jpg',
    imageAltText: 'Star Wars: Episode III - Revenge of the Sith',
    releaseDate: '2018-02-16',
    tags: ['Hayden Christensen', 'Natalie Portman', 'Ewan McGregor'],
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
      name: 'paul',
      address: '99 Favor Street'
    }),
    User.create({
      email: 'pete@email.com',
      password: '666',
      name: 'pete',
      address: '12 Spring Avenue'
    }),
    User.create({
      email: 'don@email.com',
      password: '321',
      name: 'don',
      address: '77 Ocean Boulevard'
    }),
    User.create({
      email: 'ray@email.com',
      password: '111',
      name: 'ray',
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

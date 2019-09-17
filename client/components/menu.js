import React from 'react'
import {Link} from 'react-router-dom'
import store from '../store'
import {selectGenre} from '../store/movies'

const genres = [
  'all',
  'action',
  'comedy',
  'horror',
  'drama',
  'romance',
  'thriller',
  'scifi'
]

const Menu = () => (
  <div>
    {genres.map((genre, id) => (
      <div key={id}>
        <Link
          to={`/movies/${genre}`}
          onClick={() =>
            store.dispatch(
              selectGenre(genre[0].toUpperCase() + genre.slice(1).toLowerCase())
            )
          }
        >
          {genre}
        </Link>
      </div>
    ))}
  </div>

  // <div>
  //     <Link to='/'>All Movies</Link>
  //     <Link to='/movies/action'>Action</Link>
  //     <Link>Comedy</Link>
  //     <Link>Drama</Link>
  //     <Link>Horror</Link>
  //     <Link>Romance</Link>
  //     <Link>Thriller</Link>
  //     <Link>Science Fiction</Link>
  // </div>
)

export default Menu

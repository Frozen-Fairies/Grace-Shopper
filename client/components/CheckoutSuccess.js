import React from 'react'
import {Link} from 'react-router-dom'

const CheckoutSuccsess = () => {
  return (
    <div className="columns is-centered">
      <div className="column has-text-centered">
        <img src="https://i.ytimg.com/vi/DqgqnoESw3w/maxresdefault.jpg" />
        <p>Thanks for shopping at Frozen Fairy Flix</p>
        <Link to="/">
          <button type="button">Back To Movies</button>
        </Link>
      </div>
    </div>
  )
}

export default CheckoutSuccsess

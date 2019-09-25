import React from 'react'
import {Link} from 'react-router-dom'

const CheckoutSuccsess = () => {
  return (
    <div>
      <img src="https://i.ytimg.com/vi/DqgqnoESw3w/maxresdefault.jpg" />
      <p>Thanks for shopping at Frozen Fairy Flix</p>
      <Link to="/">
        <button type="button">Back To Movies</button>
      </Link>
    </div>
  )
}

export default CheckoutSuccsess

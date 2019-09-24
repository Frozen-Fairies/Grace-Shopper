import React from 'react'
import {Link, Route} from 'react-router-dom'

const SingleOrderItem = props => {
  const {orderItem} = props
  return (
    <div className="column is-full">
      <Link
        to={`/movies/${orderItem.genre.toLowerCase()}/${orderItem.uniqueId}`}
      >
        {orderItem.title} | Qty: {orderItem.order_film.quantity} | Price:{' '}
        {orderItem.order_film.quantity * orderItem.order_film.price / 100}
      </Link>
    </div>
  )
}

export default SingleOrderItem

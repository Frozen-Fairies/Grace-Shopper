import React from 'react'
import {Link, Route} from 'react-router-dom'
import SingleOrderItem from './SingleOrderItem'
import moment from 'moment'

const SingleOrder = props => {
  const {order} = props
  return (
    <div className="column is-full">
      Order Id is {order.id}, ordered{' '}
      {moment(order.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
      {order.films.map(orderItem => {
        return <SingleOrderItem key={orderItem.id} orderItem={orderItem} />
      })}
      {/* <Link
        to={`/movies/${movie.genre.slice(0).toLowerCase()}/${movie.uniqueId}`}
      >
        <div className="level">
          <div className="level-item has-text-centered">
            <h1>{movie.title}</h1>
          </div>
        </div>

        <img src={movie.imageUrl} />
        <div className="level">
          <div className="level-item has-text-centered">
            <p>${movie.price / 100}</p>
          </div>
        </div>
      </Link> */}
    </div>
  )
}

export default SingleOrder

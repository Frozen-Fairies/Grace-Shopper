import React from 'react'
import moment from 'moment'
import {Link, Route} from 'react-router-dom'

const AdminFilmsRow = props => {
  const {film} = props
  return (
    <tr>
      <td>
        <Link to={`/admin/films/${film.id}`}>
          <i className="fas fa-pencil-alt" />
        </Link>
      </td>
      <td>{film.id}</td>
      <td>{film.title}</td>
      <td>{film.inventory}</td>
      <td>${film.price / 100}</td>
      <td>{film.compareAtPrice}</td>
      <td>{film.published ? 'TRUE' : 'FALSE'}</td>
      <td>{film.releaseDate}</td>
      <td>{moment(film.createdAt).format('lll')}</td>
      <td>{moment(film.updatedAt).format('lll')}</td>
    </tr>
  )
}

export default AdminFilmsRow

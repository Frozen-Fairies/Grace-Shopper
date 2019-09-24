import React from 'react'
import moment from 'moment'
import {Link, Route} from 'react-router-dom'

const AdminUsersRow = props => {
  const {user} = props
  return (
    <tr>
      <td>
        <Link to={`/admin/users/${user.id}`}>
          <i className="fas fa-pencil-alt" />
        </Link>
      </td>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
      <td>{moment(user.createdAt).format('lll')}</td>
      <td>{moment(user.updatedAt).format('lll')}</td>
    </tr>
  )
}

export default AdminUsersRow

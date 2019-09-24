import React from 'react'
import {getAllUsersThunk} from '../store/admin'
import {connect} from 'react-redux'
import AdminUsersRow from './AdminUsersRow'

class DisconnectedAdminAllUsers extends React.Component {
  async componentDidMount() {
    await this.props.getAllUsers()
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Edit</td>
              <td>ID</td>
              <td>Email</td>
              <td>Address</td>
              <td>createdAt</td>
              <td>updatedAt</td>
            </tr>
          </thead>

          <tbody>
            {this.props.users.map(user => {
              return <AdminUsersRow key={user.id} user={user} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.admin.users
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsersThunk())
  }
}

const AdminAllUsers = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdminAllUsers
)

export default AdminAllUsers

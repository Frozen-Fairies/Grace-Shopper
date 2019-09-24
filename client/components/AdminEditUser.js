import React from 'react'
import {updateUserThunk, getAdminUserThunk} from '../store/admin'
import {connect} from 'react-redux'

class DisconnectedAdminEditUser extends React.Component {
  async componentDidMount() {
    await this.props.getAdminUser(this.props.match.params.userId)
  }

  render() {
    return (
      <div>
        <form
          onSubmit={evt => {
            evt.preventDefault()
            this.props.updateUser(
              {
                id: this.props.match.params.userId,
                email: evt.target.email.value,
                address: evt.target.address.value
              },
              this.props.match.params.userId
            )
            //getAdminUser()
          }}
        >
          <div>
            <input
              name="email"
              type="text"
              placeholder="Enter New Email"
              defaultValue={this.props.user.email}
            />
            <input
              name="address"
              type="text"
              placeholder="Enter New Address"
              defaultValue={this.props.user.address}
            />
            <input name="submit" type="submit" />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.admin.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user, id) => dispatch(updateUserThunk(user, id)),
    getAdminUser: id => dispatch(getAdminUserThunk(id))
  }
}

const AdminEditUser = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdminEditUser
)

export default AdminEditUser

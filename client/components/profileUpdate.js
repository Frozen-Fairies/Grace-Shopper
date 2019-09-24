import React from 'react'
import {connect} from 'react-redux'
import {updateUser, me} from '../store/user'

/**
 * COMPONENT
 */
export const ProfileUpdate = props => {
  const {update, getUser, error} = props

  return (
    <div>
      <form
        onSubmit={evt => {
          evt.preventDefault()
          update({
            email: evt.target.email.value,
            address: evt.target.address.value
          })
          getUser()
        }}
      >
        <div>
          <input name="email" type="text" placeholder="Enter New Email" />
          <input name="address" type="text" placeholder="Enter New Address" />
          <input name="submit" type="submit" />
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: newInfo => dispatch(updateUser(newInfo)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatchToProps)(ProfileUpdate)

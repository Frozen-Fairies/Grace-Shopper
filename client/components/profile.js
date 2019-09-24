import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, address} = props.user

  return (
    <div>
      <h1>Welcome, {email}</h1>
      <h1>Address: {address}</h1>
      <h1>Click the Button Below to Update Your Info.</h1>

      <button
        type="button"
        onClick={() => {
          props.history.push('/profile/update')
        }}
      >
        Update
      </button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

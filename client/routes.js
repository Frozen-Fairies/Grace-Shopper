import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, BrowserRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllMovies from './components/allMovies'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <BrowserRouter>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* {isLoggedIn && ( */}
          <Switch>
            {/* Routes placed here are only available after logging in */}

            <Route
              // path={`/movies/${this.props.selectedGenre}`}
              path="/movies/:genre"
              component={AllMovies}
            />
          </Switch>
        </BrowserRouter>
        {/* )} */}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    selectedGenre: state.movies.selectedGenre
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

import React from 'react'
import {getUserOrdersThunk} from '../store/admin'
import {connect} from 'react-redux'
import SingleOrder from './SingleOrder'

class DisconnectedAdminUserOrderHistory extends React.Component {
  async componentDidMount() {
    await this.props.getUserOrders(this.props.match.params.userId)
  }

  render() {
    return (
      <div className="container is-fluid">
        <div className="columns is-multiline">
          {this.props.orders.map(order => {
            return <SingleOrder key={order.id} order={order} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.admin.orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserOrders: id => dispatch(getUserOrdersThunk(id))
  }
}

const AdminUserOrderHistory = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdminUserOrderHistory
)

export default AdminUserOrderHistory

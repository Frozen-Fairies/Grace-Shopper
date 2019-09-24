import React from 'react'
import {getAllOrdersThunk} from '../store/admin'
import {connect} from 'react-redux'
import SingleOrder from './SingleOrder'

class DisconnectedAdminOrderHistory extends React.Component {
  async componentDidMount() {
    await this.props.getAllOrders()
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
    getAllOrders: () => dispatch(getAllOrdersThunk())
  }
}

const AdminOrderHistory = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdminOrderHistory
)

export default AdminOrderHistory

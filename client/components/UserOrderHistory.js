import React from 'react'
import {getOrderHistoryThunk} from '../store/cart'
import {connect} from 'react-redux'
import SingleOrder from './Singleorder'

class DisconnectedOrderHistory extends React.Component {
  async componentDidMount() {
    await this.props.getOrderHistory()

    console.dir(this.props.orderHistory)
  }

  render() {
    return (
      <div className="container is-fluid">
        <div className="columns is-multiline">
          {this.props.orderHistory.map(order => {
            return <SingleOrder key={order.id} order={order} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderHistory: state.cart.orderHistory
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: () => dispatch(getOrderHistoryThunk())
  }
}

const OrderHistory = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedOrderHistory
)

export default OrderHistory

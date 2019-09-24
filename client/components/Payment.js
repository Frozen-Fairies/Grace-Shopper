import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit() {
    // User clicked submit
    console.log('Purchased!')
    history.push('/orders/cart/success')
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="submit" onClick={this.submit}>
          Purchase
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)

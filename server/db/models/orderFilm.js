const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order_Film = db.define('order_film', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Order_Film

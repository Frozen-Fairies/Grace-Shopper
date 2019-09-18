const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: {
    type: Sequelize.TEXT
  },
  purchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Order

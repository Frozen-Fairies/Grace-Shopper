const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  uniqueId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'http://www.piercevaubel.com/cam/images/fairycatanthbullv19n4feb251888lp062-backcover-small.jpg'
  },
  imageAltText: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  }
})

module.exports = Cart

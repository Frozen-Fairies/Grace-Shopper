const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Film = db.define('film', {
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
  description: {
    type: Sequelize.TEXT
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false
    // Capitalize the genre
  },
  published: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  compareAtPrice: {
    type: Sequelize.FLOAT
    // ADD validation that this is greater than price
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
  },
  releaseDate: {
    type: Sequelize.DATEONLY
  }
})

module.exports = Film

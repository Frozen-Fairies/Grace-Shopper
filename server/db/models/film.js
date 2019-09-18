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
      notEmpty: true
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
    type: Sequelize.INTEGER,
    allowNull: false
  },
  compareAtPrice: {
    type: Sequelize.INTEGER
    // ADD validation that this is greater than price
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'http://www.piercevaubel.com/cam/images/fairycatanthbullv19n4feb251888lp062-backcover-small.jpg'
  },
  imageAltText: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  releaseDate: {
    type: Sequelize.DATEONLY
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

Film.beforeValidate(film => {
  /*
   * Generate slug
   */
  if (!film.uniqueId) {
    film.uniqueId = film.title
      .replace(/\s/g, '_')
      .replace(/\W/g, '')
      .replace(/_/g, '-')
      .toLowerCase()
  }
})

Film.findByTag = function(tag) {
  const Op = Sequelize.Op
  let searchResults = Film.findAll({
    // Op.overlap matches a set of possibilities
    where: {
      tags: {
        [Op.overlap]: [tag]
      }
    }
  })
  return searchResults
}

module.exports = Film

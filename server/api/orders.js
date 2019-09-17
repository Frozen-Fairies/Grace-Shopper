const router = require('express').Router()
const Film = require('../db/models/film')
const Sequelize = require('sequelize')
const Order = require('../db/models/order')

// Gets all previous orders
router.get('/history', async (req, res, next) => {
  if (req.user) {
    try {
      const orders = await Order.findAll({
        include: [{model: Film}],
        where: {
          purchased: true,
          userId: req.user.dataValues.id
        }
      })
      res.json(orders)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

// gets unpurchased order as 'cart'
router.get('/cart', async (req, res, next) => {
  if (req.user) {
    try {
      const cart = await Order.findOne({
        include: [{model: Film}],
        where: {
          purchased: false,
          userId: req.user.dataValues.id
        }
      })
      res.json(cart)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

router.delete('/cart/:filmId', async (req, res, next) => {
  if (req.user) {
    try {
      const cartItem = await Order.findOne({
        where: {
          purchased: false,
          userId: req.user.dataValues.id
        }
      })

      const film = await Film.findByPk(req.params.filmId)
      if (!(cartItem && film)) {
        const err = new Error()
        next(err)
      }

      await cartItem.removeFilm(film)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(401)
  }
})

module.exports = router

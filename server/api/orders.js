const router = require('express').Router()
const Film = require('../db/models/film')
const Sequelize = require('sequelize')
const Order = require('../db/models/order')
const Order_Film = require('../db/models/orderFilm')

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

router.put('/cart/:filmId', async (req, res, next) => {
  if (req.user) {
    try {
      const orderId = await Order.findOne({
        where: {
          userId: req.user.dataValues.id,
          purchased: false
        }
      }).id
      const cartItem = await Order_Film.findOne({
        where: {
          orderId,
          filmId: req.params.filmId
        }
      })
      const obj = await cartItem.update({quantity: req.body.quantity})

      res.status(200).json(obj)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(401)
  }
})

router.post('/cart/:filmId', async (req, res, next) => {
  if (req.user) {
    try {
      let order = await Order.findOne({
        where: {
          userId: req.user.dataValues.id,
          purchased: false
        }
      })
      if (!order) {
        order = Order.create({
          purchased: false,
          userId: req.user.dataValues.id
        })
      }
      const cartItem = await Order_Film.findOne({
        where: {
          orderId: order.id,
          filmId: req.params.filmId
        }
      })
      if (cartItem) {
        const obj = await cartItem.update({
          quantity: cartItem.quantity + parseInt(req.body.quantity)
        })
        res.status(200).json(obj)
      } else {
        const film = await Film.findByPk(req.params.filmId)
        const obj = await Order_Film.create({
          quantity: req.body.quantity,
          price: film.price,
          orderId: order.id,
          filmId: req.params.filmId
        })
        res.status(200).json(obj)
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(401)
  }
})

router.put('/cart/:cartId/checkout', async (req, res, next) => {
  if (req.user) {
    try {
      const order = await Order.findByPk(req.params.cartId)
      if (
        order.userId === req.user.dataValues.id &&
        order.purchased === false
      ) {
        const obj = await order.update({purchased: true})
        res.status(200).json(obj)
      } else {
        res.sendStatus(500)
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(401)
  }
})

module.exports = router

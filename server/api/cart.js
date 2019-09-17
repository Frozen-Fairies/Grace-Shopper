const router = require('express').Router()
const Cart = require('../db/models/cart')
const Sequelize = require('sequelize')

// serves up all the items in a logged in users cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.user.dataValues.id
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// This is a test route so use without Login
// DELETE THIS ROUTE WHEN FINISHED
router.get('/user/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router

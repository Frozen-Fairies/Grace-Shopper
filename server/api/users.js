const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      res.json(user)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

router.put('/', async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      let potentialNewEmail = req.body.email
      let potentialNewAddress = req.body.address
      const potentialUser = await User.findOne({
        where: {email: potentialNewEmail}
      })
      console.log(req.body.email)

      if (user && potentialUser === null) {
        if (!potentialNewEmail) {
          potentialNewEmail = user.email
        }
        if (!potentialNewAddress) {
          potentialNewAddress = user.address
        }
        const obj = user.update({
          name: req.body.name,
          email: potentialNewEmail,
          address: potentialNewAddress,
          password: req.body.password
        })
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

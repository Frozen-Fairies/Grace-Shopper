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
      console.log(User)
      const user = await User.findByPk(req.user.dataValues.id)
      const potentialNewEmail = req.body.email
      const potentialUser = await User.findOne({
        where: {email: potentialNewEmail}
      })

      if (user && potentialUser === null) {
        // MUST CHECK IF NEW EMAIL IS UNIQUE
        const obj = user.update({
          name: req.body.name,
          email: potentialNewEmail,
          address: req.body.address,
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

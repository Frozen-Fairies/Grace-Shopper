const router = require('express').Router()
const Film = require('../db/models/film')
const Sequelize = require('sequelize')

// .../api/films/
// loads the 24 most recently released movies
router.get('/', async (req, res, next) => {
  try {
    const films = await Film.findAll({
      limit: 24,
      offset: 0,
      order: [['createdAt', 'DESC']]
    })
    res.json(films)
  } catch (err) {
    next(err)
  }
})

router.get('/page/:pageNum', async (req, res, next) => {
  const offset = 24 * (req.params.pageNum - 1)
  const limit = offset + 24
  try {
    const films = await Film.findAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']]
    })
    res.json(films)
  } catch (err) {
    next(err)
  }
})

router.get('/genres/:genreName', async (req, res, next) => {
  try {
    const films = await Film.findAll({
      limit: 24,
      offset: 0,
      order: [['createdAt', 'DESC']],
      where: {
        genre: req.params.genreName
      }
    })
    res.json(films)
  } catch (err) {
    next(err)
  }
})

router.get('/genres/:genreName/page/:pageNum', async (req, res, next) => {
  const offset = 24 * (req.params.pageNum - 1)
  const limit = offset + 24
  try {
    const films = await Film.findAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
      where: {
        genre: req.params.genreName
      }
    })
    res.json(films)
  } catch (err) {
    next(err)
  }
})

router.get('/tags/:tagName', async (req, res, next) => {
  const Op = Sequelize.Op
  try {
    const films = await Film.findAll({
      limit: 24,
      offset: 0,
      order: [['createdAt', 'DESC']],
      where: {
        tags: {
          [Op.overlap]: [req.params.tagName]
        }
      }
    })
    res.json(films)
  } catch (err) {
    next(err)
  }
})

router.get('/tags/:tagName/page/:pageNum', async (req, res, next) => {
  const offset = 24 * (req.params.pageNum - 1)
  const limit = offset + 24
  const Op = Sequelize.Op
  try {
    const films = await Film.findAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
      where: {
        tags: {
          [Op.overlap]: [req.params.tagName]
        }
      }
    })
    res.json(films)
  } catch (err) {
    next(err)
  }
})

router.get('/:filmId', async (req, res, next) => {
  try {
    const film = await Film.findOne({
      where: {
        uniqueId: req.params.filmId
      }
    })
    res.json(film)
  } catch (err) {
    next(err)
  }
})

module.exports = router

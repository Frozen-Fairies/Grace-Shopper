const User = require('./user')
const Film = require('./film')
const Cart = require('./cart')
const Order = require('./order')
const Order_Film = require('./orderFilm')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Cart.belongsTo(User)
User.hasMany(Cart)

Order.belongsTo(User)
User.hasMany(Order)

Film.belongsToMany(Order, {through: Order_Film})
Order.belongsToMany(Film, {through: Order_Film})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Film,
  Cart,
  Order,
  Order_Film
}

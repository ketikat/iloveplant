const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  priceAtPurchase: {
   type: Sequelize.INTEGER,
   allowNull: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = OrderItem

//order id will be fk from order table
//prod id will be fk from prod table

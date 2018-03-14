const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
	orderStatus: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'Created',
		validate: {
			isIn: [['Created', 'Processing', 'Cancelled', 'Completed']]
		}
	},
	orderTotal: {
    type: Sequelize.INTEGER,
    allowNull: true
	},
	orderEmail: {
    type: Sequelize.STRING,
    allowNull: false
	},
	orderAddress: {
	type: Sequelize.STRING,
	allowNull: false
	},
	orderToken: {
	type: Sequelize.STRING,
	allowNull: true
	}
})

module.exports = Order

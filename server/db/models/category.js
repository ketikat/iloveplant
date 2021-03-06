const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}, 
	description:{
		type: Sequelize.TEXT,
		allowNull: true
	}
})

module.exports = Category
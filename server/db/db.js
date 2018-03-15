const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`
// const connectionString= `postgres://localhost:5432/${pkg.name}` || process.env.DATABASE_URL

const db = new Sequelize(connectionString, {logging: false})


// const db = new Sequelize(
//   process.env.DATABASE_URL || 'postgres://localhost:5432/iloveplant', {
//     logging: false
//   }
// )

module.exports = db

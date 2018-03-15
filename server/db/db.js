const Sequelize = require('sequelize')

const name = process.env.DATABASE_URL || pkg.name
const connectionString= `postgres://localhost:5432${name}` || `${name}`

const db = new Sequelize(connectionString, {logging: false})


// const db = new Sequelize(
//   process.env.DATABASE_URL || 'postgres://localhost:5432/iloveplant', {
//     logging: false
//   }
// )

module.exports = db

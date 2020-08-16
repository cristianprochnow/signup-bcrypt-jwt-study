import knex from 'knex'
const knexConfig = require('../../knexfile')

const dbConnection = knex(knexConfig.development)

export { dbConnection }

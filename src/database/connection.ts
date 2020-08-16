import knex from 'knex'
import path from 'path'

const knexConfig = require('../../knexfile')

const dbConnection = knex(knexConfig.development)

export { dbConnection }

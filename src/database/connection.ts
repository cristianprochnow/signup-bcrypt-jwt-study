import knex from 'knex'

const dbConnection = knex({
  client: 'sqlite',
  connection: {
    filename: './database.sqlite'
  }
})

export { dbConnection }

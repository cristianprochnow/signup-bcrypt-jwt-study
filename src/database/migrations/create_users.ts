import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary()

    table.string('username').notNullable()
    table.string('password').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('users')
}

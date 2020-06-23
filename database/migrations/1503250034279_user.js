'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('password', 60).notNullable()
      table.string('rgpm', 5).nullable().notNullable().unique()
      table.string('nome', 64).notNullable().default('')
      table.boolean('admin').notNullable().default(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
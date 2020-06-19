'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserUpdateSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.dropColumn('email')
      table.string('rgpm', 5).nullable()
      table.string('nome', 64).notNullable().default('')      
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropColumn('rgpm')
      table.dropColumn('nome')
      table.string('email', 254).notNullable().default("").unique()
    })
  }
}

module.exports = UserUpdateSchema

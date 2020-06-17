'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarrosSchema extends Schema {
  up() {
    this.create('carros', (table) => {
      table.increments()
      table.string('placa', 8).unique()
      table.boolean('luz_interna').notNullable().default(false)
      table.boolean('buzina').notNullable().default(false)
      table.boolean('alteracao').notNullable().default(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('carros')
  }
}

module.exports = CarrosSchema

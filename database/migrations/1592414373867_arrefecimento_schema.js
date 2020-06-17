'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArrefecimentoSchema extends Schema {
  up() {
    this.create('arrefecimentos', (table) => {
      table.increments()
      table
        .integer('carro_id')
        .unsigned()
        .references('id')
        .inTable('carros')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.integer('nivel_agua').notNullable().default(0)
      table.boolean('vazamento').notNullable().default(false)
      table.string('local_vazamento').notNullable().default('')
      table.timestamps()
    })
  }

  down() {
    this.drop('arrefecimentos')
  }
}

module.exports = ArrefecimentoSchema

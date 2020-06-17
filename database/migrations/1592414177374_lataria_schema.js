'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LatariaSchema extends Schema {
  up() {
    this.create('latarias', (table) => {
      table.increments()
      table
        .integer('carro_id')
        .unsigned()
        .references('id')
        .inTable('carros')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.boolean('arranhao').notNullable().default(false)
      table.boolean('trincado').notNullable().default(false)
      table.boolean('amassado').notNullable().default(false)
      table.boolean('perfurado_projetil').notNullable().default(false)
      table.boolean('quebrado').notNullable().default(false)

      table.timestamps()
    })
  }

  down() {
    this.drop('lataria')
  }
}

module.exports = LatariaSchema

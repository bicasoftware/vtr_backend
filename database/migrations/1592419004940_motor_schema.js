'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MotorSchema extends Schema {
  up() {
    this.create('motors', (table) => {
      table.increments()
      table
        .integer('carro_id')
        .unsigned()
        .references('id')
        .inTable('carros')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.integer('nivel_oleo').notNullable().default(0)
      table.integer('qualidade_oleo').notNullable().default(0)
      table.boolean('vazamento').notNullable().default(false)
      table.string('local_vazamento').notNullable().default(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('motors')
  }
}

module.exports = MotorSchema

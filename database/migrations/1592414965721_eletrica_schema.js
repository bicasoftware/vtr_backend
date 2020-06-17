'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EletricaSchema extends Schema {
  up() {
    this.create('eletricas', (table) => {
      table.increments()
      table
        .integer('carro_id')
        .unsigned()
        .references('id')
        .inTable('carros')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.boolean("luz_acesa").notNullable().default(false)
      table.string("luz_acesa_descricao", 255)
      table.boolean('alteracao_farois_dianteiros').notNullable().default(false)
      table.boolean('alteracao_farois_trazeiros').notNullable().default(false)

      table.boolean('front_dir_minima').notNullable().default(false)
      table.boolean('front_dir_media').notNullable().default(false)
      table.boolean('front_dir_maxima').notNullable().default(false)
      table.boolean('front_dir_pisca').notNullable().default(false)

      table.boolean('front_esq_minima').notNullable().default(false)
      table.boolean('front_esq_media').notNullable().default(false)
      table.boolean('front_esq_maxima').notNullable().default(false)
      table.boolean('front_esq_pisca').notNullable().default(false)

      table.boolean('traz_dir_minima').notNullable().default(false)
      table.boolean('traz_dir_media').notNullable().default(false)
      table.boolean('traz_dir_maxima').notNullable().default(false)
      table.boolean('traz_dir_pisca').notNullable().default(false)

      table.boolean('traz_esq_minima').notNullable().default(false)
      table.boolean('traz_esq_media').notNullable().default(false)
      table.boolean('traz_esq_maxima').notNullable().default(false)
      table.boolean('traz_esq_pisca').notNullable().default(false)

      table.timestamps()

    })
  }

  down() {
    this.drop('eletricas')
  }
}

module.exports = EletricaSchema

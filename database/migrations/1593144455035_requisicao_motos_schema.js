'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequisicaoMotosSchema extends Schema {
  up() {
    this.create('requisicao_motos', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('veiculo_id').notNullable()
      table.integer('status').notNullable().default(0)

      table.string("prefixo").notNullable()
      table.string("km").notNullable()
      table.integer("limpeza").notNullable().default(0)
      table.integer("circunstancia").notNullable().default(0)
      table.integer("lado_direito").notNullable().default(0)
      table.integer("lado_esquerdo").notNullable().default(0)
      table.integer("dianteira").notNullable().default(0)
      table.integer("trazeira").notNullable().default(0)
      table.integer("superior").notNullable().default(0)
      table.integer("interna").notNullable().default(0)
      table.integer("pneus_dianteiro").notNullable().default(0)
      table.integer("pneus_trazeiro").notNullable().default(0)
      table.integer("combustivel").notNullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('requisicao_motos')
  }
}

module.exports = RequisicaoMotosSchema
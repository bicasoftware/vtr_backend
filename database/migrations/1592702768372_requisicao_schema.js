'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequisicaoSchema extends Schema {
  up() {
    this.create('requisicaos', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('veiculo_id').notNullable()
      table.integer('status').notNullable().default(0)

      table.string("km_inicial").nullable()
      table.string("km_termino").nullable()

      table.bool("alteracao_lataria").notNullable().default(false)
      table.bool("lataria_arranhado").notNullable().default(false)
      table.bool("lataria_amassado").notNullable().default(false)
      table.bool("lataria_trincado").notNullable().default(false)
      table.bool("lataria_perfurado").notNullable().default(false)
      table.bool("lataria_quebrado").notNullable().default(false)

      table.integer("nivel_oleo").notNullable().default(0)
      table.integer("qualidade_oleo").notNullable().default(0)
      table.bool("vazamento_oleo").notNullable().default(false)
      table.string("local_vazamento_oleo").nullable()
      table.integer("nivel_agua").notNullable().default(0)
      table.bool("vazamento_agua").notNullable().default(false)
      table.string("local_vazamento_agua").nullable()
      table.bool("luz_acesa").notNullable().default(false)
      table.string("luz_acesa_descricao").nullable()

      table.bool("alteracao_farois_dianteiros").notNullable().default(false)
      table.bool("alteracao_farois_trazeiros").notNullable().default(false)

      table.bool("dianteiro_direito_minima").notNullable().default(false)
      table.bool("dianteiro_direito_media").notNullable().default(false)
      table.bool("dianteiro_direito_maxima").notNullable().default(false)
      table.bool("dianteiro_direito_pisca").notNullable().default(false)
      table.bool("dianteiro_esquerdo_minima").notNullable().default(false)
      table.bool("dianteiro_esquerdo_media").notNullable().default(false)
      table.bool("dianteiro_esquerdo_maxima").notNullable().default(false)
      table.bool("dianteiro_esquerdo_pisca").notNullable().default(false)
      table.bool("trazeiro_direito_minima").notNullable().default(false)
      table.bool("trazeiro_direito_media").notNullable().default(false)
      table.bool("trazeiro_direito_maxima").notNullable().default(false)
      table.bool("trazeiro_direito_pisca").notNullable().default(false)
      table.bool("trazeiro_esquerdo_minima").notNullable().default(false)
      table.bool("trazeiro_esquerdo_media").notNullable().default(false)
      table.bool("trazeiro_esquerdo_maxima").notNullable().default(false)
      table.bool("trazeiro_esquerdo_pisca").notNullable().default(false)


      table.timestamps()
    })
  }

  down() {
    this.drop('requisicaos')
  }
}

module.exports = RequisicaoSchema
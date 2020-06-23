'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VeiculosSchema extends Schema {
  up() {
    this.create('veiculos', (table) => {
      table.increments()
      table.integer("n").notNullable()
      table.string("opm").notNullable().default("")
      table.string("placa").notNullable().default("")
      table.string("veiculo").notNullable().default("")
      table.string("prefixo").notNullable().default("")
      table.string("municipio").notNullable().default("")
      table.string("unidade").notNullable().default("")
      table.bool("ativa").notNullable().default(false)
      table.bool("locada").notNullable().default(false)
      //Tipo_veiculo = 0: carro, 1: moto
      table.integer("tipo_veiculo").notNullable().default(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('veiculos')
  }
}

module.exports = VeiculosSchema

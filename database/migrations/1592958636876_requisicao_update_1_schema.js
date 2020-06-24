'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequisicaoUpdate1Schema extends Schema {
  up () {
    this.table('requisicaos', (table) => {
      table.dropColumn('vazamento_oleo')      
    })

    this.table('requisicaos', (table) => {
      table.bool('vazamento_oleo').notNullable().default(false)
    })
  }

  down () {
    this.table('requisicaos', (table) => {
      // reverse requisicaos
    })
  }
}

module.exports = RequisicaoUpdate1Schema

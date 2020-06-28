'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveSchema extends Schema {
  up () {
    this.table('requisicao_motos', (table) => {
      table.dropColumn('prefixo')
    })
  }

  down () {
    this.table('requisicao_motos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RemoveSchema

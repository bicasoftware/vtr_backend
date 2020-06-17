'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Arrefecimento extends Model {
  carro() {
    return this.belongsTo('App/Models/Carro')
  }

  static get ridden() {
    return ['created_at', 'updated_at']
  }
}

module.exports = Arrefecimento

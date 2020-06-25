'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Requisicao extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  veiculo() {
    return this.belongsTo('App/Models/Veiculo')
  }
}

module.exports = Requisicao
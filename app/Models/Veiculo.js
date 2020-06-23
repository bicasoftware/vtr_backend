'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Veiculo extends Model {

  requisicao() {
    return this.belongsTo('App/Models/Requisicao')
  }
}

module.exports = Veiculo

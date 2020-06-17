'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Farol extends Model {
  eletrica() {
    return this.belongsTo('eletrica')
  }

  static get hidden() {
    return ['created_at', 'updated_at']
  }

}

module.exports = Farol

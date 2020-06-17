'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Lataria extends Model {
    carro() {
        return this.belongsTo('App/Models/Carro')
    }
}

module.exports = Lataria

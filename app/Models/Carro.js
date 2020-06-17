'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Carro extends Model {
    lataria() {
        return this.hasOne('App/Models/Lataria')
    }

    motor(){
        return this.hasOne('App/Models/Motor')
    }

    arrefecimento() {
        return this.hasOne('App/Models/Arrefecimento')
    }

    eletrica() {
        return this.hasOne('App/Models/Eletrica')
    }
}

module.exports = Carro

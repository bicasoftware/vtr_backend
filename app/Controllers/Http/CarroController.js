'use strict'
const _carros = use('App/Models/Carro')
const _lataria = use('App/Models/Lataria')
const _motor = use('App/Models/Motor')
const _arrefecimento = use('App/Models/Arrefecimento')
const _eletrica = use('App/Models/Eletrica')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Auth')} Response */

class CarroController {

  async list({}) {
    const allCarros = await _carros
      .query()      
      .with('lataria')
      .with('motor')
      .with('arrefecimento')
      .with('eletrica')
      .fetch()

    return {
      carro: allCarros
    }
  }

  async create({
    request,
  }) {
    const {
      placa,
      alteracao,
      luz_interna,
      buzina,
      lataria,
      motor,
      arrefecimento,
      eletrica
    } = request.all()

    var newCarro = await _carros.create({
      placa: placa,
      alteracao: alteracao,
      luz_interna: luz_interna,
      buzina: buzina
    })

    const carro_id = newCarro.id
    const carroLataria = await _lataria.create({
      ...lataria,
      carro_id: carro_id
    })

    const carroMotor = await _motor.create({
      ...motor,
      carro_id: carro_id
    })

    const carroArref = await _arrefecimento.create({
      ...arrefecimento,
      carro_id: carro_id,
    })

    const carroEletrica = await _eletrica.create({
      ...eletrica,
      carro_id: carro_id,
    })


    newCarro.lataria = carroLataria
    newCarro.arrefecimento = carroArref
    newCarro.motor = carroMotor
    newCarro.eletrica = carroEletrica

    return {
      carro: newCarro
    }
  }

}

module.exports = CarroController

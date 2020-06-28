'use strict'

const _motos = use('App/Models/RequisicaoMoto')
const _carros = use('App/Models/Requisicao')

class LastInsertController {

  async listLastInsert({ auth }) {
    if (auth.user.admin == true) {
      return { error: "Usuário sem acesso" }
    }
    const lastCarro = await _carros
      .query()
      .where({ "user_id": auth.user.id })
      .orderBy("created_at", 'desc')
      .limit(1)
      .with('veiculo')
      .fetch()

    const lastMoto = await _motos
      .query()
      .where({ "user_id": auth.user.id })
      .orderBy("created_at", 'desc')
      .limit(1)
      .with('veiculo')
      .fetch()

    if (Boolean(lastCarro) && Boolean(lastMoto)) {
      const dataCarro = new Date(lastCarro.first().created_at)
      const dataMoto = new Date(lastMoto.first().created_at)

      console.log(`data carro ${dataCarro}`)
      console.log(`data moto ${dataMoto}`)
      if (dataCarro > dataMoto) {
        return this.getVeiculo(lastCarro, 0)
      } else {
        return this.getVeiculo(lastMoto, 1)
      }
    } else if (Boolean(lastCarro)) {
      console.log("3")
      return this.getVeiculo(lastCarro, 0)
    } else if (Boolean(lastMoto)) {
      console.log("4")
      return this.getVeiculo(lastMoto, 1)
    }
  }


  getVeiculo(veiculo, tipo_veiculo) {
    const v = JSON.parse(JSON.stringify(veiculo.first()))    
    return {
      tipo_veiculo: tipo_veiculo,
      veiculo_id: v.veiculo_id,
      requisicao_id: v.id,
      created_at: v.created_at,
      placa: v.veiculo.placa,
    }
  }

}

module.exports = LastInsertController
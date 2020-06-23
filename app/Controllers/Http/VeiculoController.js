'use strict'

const _veiculos = use('App/Models/Veiculo')

class VeiculoController {
  async create({ request, params }) {
    const {
      n,
      opm,
      placa,
      veiculo,
      prefixo,
      municipio,
      unidade,
      ativa,
      locada
    } = request.all()

    const newVeiculo = await _veiculos.create({
      n: n,
      opm: opm,
      placa: placa,
      veiculo: veiculo,
      prefixo: prefixo,
      municipio: municipio,
      unidade: unidade,
      ativa: ativa,
      locada: locada,
      tipo_veiculo: params.tipo,
    })

    return {
      updated_at: newVeiculo.updated_at,
      created_at: newVeiculo.created_at,
      id: newVeiculo.id,
    }
  }

  async delete({ response, params, auth }) {
    if (auth.user.admin == 0) {
      const count = await _veiculos
        .query()
        .where({ id: params.id })
        .delete()
      return { removed: count }
    } else {
      response.status(401).send({ error: 'Usuário sem acesso' })
    }
  }

  async listVeiculos({ params }) {
    const { locada, tipo } = params

    if (Boolean(locada) && Boolean(tipo)) {
      return await _veiculos
        .query()
        .where({ locada: locada, tipo_veiculo: tipo })
        .fetch()
    } else {
      return await _veiculos.all()
    }
  }
}

module.exports = VeiculoController
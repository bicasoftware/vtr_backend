'use strict'

const _veiculos = use('App/Models/Veiculo')
const _user = use('App/Models/User')

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

  async counter() {
    const countCarros = await _veiculos.query().where({ tipo_veiculo: 0 }).count()
    const countMotos = await _veiculos.query().where({ tipo_veiculo: 1 }).count()
    const countUser = await _user.query().count()

    return {
      total_carros: countCarros[0].count,
      total_motos: countMotos[0].count,
      total_usuarios: countUser[0].count,
    }
  }
}

module.exports = VeiculoController
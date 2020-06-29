'use strict'

const _requisicao = use('App/Models/RequisicaoMoto')

class RequisicaoMotoController {
  async create({ params, request, auth }) {

    const {
      km,
      limpeza,
      circunstancia,
      lado_direito,
      lado_esquerdo,
      dianteira,
      trazeira,
      superior,
      interna,
      pneus_dianteiro,
      pneus_trazeiro,
      combustivel,
      veiculo_id
    } = request.all()

    const newReq = await _requisicao.create({
      km: km,
      limpeza: limpeza,
      circunstancia: circunstancia,
      lado_direito: lado_direito,
      lado_esquerdo: lado_esquerdo,
      dianteira: dianteira,
      trazeira: trazeira,
      superior: superior,
      interna: interna,
      pneus_dianteiro: pneus_dianteiro,
      pneus_trazeiro: pneus_trazeiro,
      combustivel: combustivel,
      veiculo_id: veiculo_id,
      user_id: auth.user.id,
    })

    const { created_at, updated_at, id } = newReq

    return {
      created_at: created_at,
      updated_at: updated_at,
      id: id,
    }
  }

  async listAll({ auth }) {
    if (!auth.user.admin) {
      return await _requisicao
        .query()
        .where({ "user_id": auth.user.id })
        .orderBy("created_at", 'desc')
        .with('veiculo')
        .fetch()
    } else {
      return await _requisicao.query().with('veiculo').fetch()
    }
  }

  async listOne({ params, auth }) {
    const r = await _requisicao
      .query()
      .where({ user_id: auth.user.id, id: params.id })
      .with('veiculo')
      .fetch()

    return JSON.parse(JSON.stringify(r.first()))
  }

  async cancel({ params, auth }) {
    return await this.updateStatus(params.id, auth.user.admin, auth.user.id, 1)
  }

  async finish({ params, auth }) {
    return await this.updateStatus(params.id, auth.user.admin, auth.user.id, 2)
  }

  async updateStatus(id, admin, user_id, status) {
    let filter;
    if (admin == true) {
      filter = { id: id }
    } else {
      filter = { id: id, user_id: user_id }
    }

    const count = await
    _requisicao
      .query()
      .where(filter)
      .update({ status: status })

    return { modified: count }
  }

  async filterByStatus({ auth, response, params }) {
    if (!auth.user.admin) {
      const requisicoes = await _requisicao
        .query()
        .where({ status: params.status, user_id: auth.user.id })
        .with('veiculo')
        .fetch()

      return requisicoes
    } else {
      const requisicoes = await _requisicao
        .query()
        .where({ status: params.status })
        .with('veiculo')
        .fetch()

      return requisicoes
    }

  }
}

module.exports = RequisicaoMotoController
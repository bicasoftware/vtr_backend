'use strict'

const _requisicao = use("App/Models/Requisicao")

class RequisicaoController {

  async create({ params, request, auth }) {
    const data = request.all()
    const newReq = await _requisicao.create({ ...data, user_id: auth.user.id, veiculo_id: params.carro_id })
    const { created_at, updated_at, id } = newReq
    return {
      created_at: created_at,
      updated_at: updated_at,
      id: id,
    }
  }

  async listAll({ response, auth }) {
    if (auth.user.admin == 0) {
      return await _requisicao.all()
    } else {
      response.status(401).send({ error: "Usuário sem acesso" })
    }
  }

  async listOne({ params, auth }) {
    return await _requisicao
      .query()
      .where({ user_id: auth.user.id, id: params.id })
      .fetch()
  }

  async cancel({ params, auth }) {
    return await this.updateStatus(params.id, auth.user.admin, auth.user.id, 1)
  }

  async finish({ params, auth }) {
    return await this.updateStatus(params.id, auth.user.admin, auth.user.id, 2)
  }

  async updateStatus(id, admin, user_id, status) {
    let filter;
    if (admin == 0) {
      filter = { id: params.id }
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
}

module.exports = RequisicaoController
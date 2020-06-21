'use strict'

const _requisicao = use("App/Models/Requisicao")

class RequisicaoController {

  async create({
    request
  }) {
    const data = request.all()
    const newReq = await _requisicao.create(data)
    const {
      created_at,
      updated_at,
      id
    } = newReq
    return {
      created_at: created_at,
      updated_at: updated_at,
      id: id,
    }

  }
}

module.exports = RequisicaoController

'use strict'

const _requisicao = use('App/Models/RequisicaoMoto')

class RequisicaoMotoController {
  async create({ params, request, auth }) {

    const {
      prefixo,
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
      combustivel
    } = request.all()


    const newReq = await _requisicao.create({
      prefixo: prefixo,
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
      user_id: auth.user.id,
      veiculo_id: params.veiculo_id
    })

    const { created_at, updated_at, id } = newReq
    
    return {
      created_at: created_at,
      updated_at: updated_at,
      id: id,
    }
  }

  async listAll({ response, auth }) {
    if (!auth.user.admin) {
      response.status(401).send({ error: "Usuário sem acesso" })
    } else {
      return await _requisicao.query().with('veiculo').fetch()
    }
  }

  async listOne({ params, auth }) {
    return await _requisicao
      .query()
      .where({ user_id: auth.user.id, id: params.id })
      .with('veiculo')
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
      response.status(401).send({ error: "Usuário sem permissão" })
    }

    const requisicoes = await _requisicao
      .query()
      .where({ status: params.status })
      .with('veiculo')
      .fetch()

    return requisicoes
  }
}

module.exports = RequisicaoMotoController
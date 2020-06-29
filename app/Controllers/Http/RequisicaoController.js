'use strict'

const _requisicao = use("App/Models/Requisicao")

class RequisicaoController {

  async create({ request, auth }) {

    const {
      veiculo_id,
      status,
      km_inicial,
      km_termino,
      alteracao_lataria,
      lataria_arranhado,
      lataria_amassado,
      lataria_trincado,
      lataria_perfurado,
      lataria_quebrado,
      nivel_oleo,
      qualidade_oleo,
      vazamento_oleo,
      local_vazamento_oleo,
      nivel_agua,
      vazamento_agua,
      local_vazamento_agua,
      luz_acesa,
      luz_acesa_descricao,
      alteracao_farois_dianteiros,
      alteracao_farois_trazeiros,
      dianteiro_direito_minima,
      dianteiro_direito_media,
      dianteiro_direito_maxima,
      dianteiro_direito_pisca,
      dianteiro_esquerdo_minima,
      dianteiro_esquerdo_media,
      dianteiro_esquerdo_maxima,
      dianteiro_esquerdo_pisca,
      trazeiro_direito_minima,
      trazeiro_direito_media,
      trazeiro_direito_maxima,
      trazeiro_direito_pisca,
      trazeiro_esquerdo_minima,
      trazeiro_esquerdo_media,
      trazeiro_esquerdo_maxima,
      trazeiro_esquerdo_pisca,
    } = request.all()

    const newReq = await _requisicao.create({

      status: status,
      km_inicial: km_inicial,
      km_termino: km_termino,
      alteracao_lataria: alteracao_lataria,
      lataria_arranhado: lataria_arranhado,
      lataria_amassado: lataria_amassado,
      lataria_trincado: lataria_trincado,
      lataria_perfurado: lataria_perfurado,
      lataria_quebrado: lataria_quebrado,
      nivel_oleo: nivel_oleo,
      qualidade_oleo: qualidade_oleo,
      vazamento_oleo: vazamento_oleo,
      local_vazamento_oleo: local_vazamento_oleo,
      nivel_agua: nivel_agua,
      vazamento_agua: vazamento_agua,
      local_vazamento_agua: local_vazamento_agua,
      luz_acesa: luz_acesa,
      luz_acesa_descricao: luz_acesa_descricao,
      alteracao_farois_dianteiros: alteracao_farois_dianteiros,
      alteracao_farois_trazeiros: alteracao_farois_trazeiros,
      dianteiro_direito_minima: dianteiro_direito_minima,
      dianteiro_direito_media: dianteiro_direito_media,
      dianteiro_direito_maxima: dianteiro_direito_maxima,
      dianteiro_direito_pisca: dianteiro_direito_pisca,
      dianteiro_esquerdo_minima: dianteiro_esquerdo_minima,
      dianteiro_esquerdo_media: dianteiro_esquerdo_media,
      dianteiro_esquerdo_maxima: dianteiro_esquerdo_maxima,
      dianteiro_esquerdo_pisca: dianteiro_esquerdo_pisca,
      trazeiro_direito_minima: trazeiro_direito_minima,
      trazeiro_direito_media: trazeiro_direito_media,
      trazeiro_direito_maxima: trazeiro_direito_maxima,
      trazeiro_direito_pisca: trazeiro_direito_pisca,
      trazeiro_esquerdo_minima: trazeiro_esquerdo_minima,
      trazeiro_esquerdo_media: trazeiro_esquerdo_media,
      trazeiro_esquerdo_maxima: trazeiro_esquerdo_maxima,
      trazeiro_esquerdo_pisca: trazeiro_esquerdo_pisca,

      user_id: auth.user.id,
      veiculo_id: veiculo_id
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

  async listByUser({ auth }) {
    return await _requisicao
      .query()
      .where({ user_id: auth.user.id })
      .with('veiculo')
      .fetch()
  }

  async listLast({ auth }) {
    return await _requisicao
      .query()
      .where({ user_id: auth.user.id })
      .orderBy("id", "desc")
      .limit(1)
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

module.exports = RequisicaoController
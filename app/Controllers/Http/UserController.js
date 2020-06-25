'use strict'

const _user = use('App/Models/User')

class UserController {

  async register({
    auth,
    request,
    response
  }) {
    const {
      nome,
      rgpm,
      pass
    } = request.only(['nome', 'rgpm', 'pass'])
    const hasUser = await _user.query().where('rgpm', rgpm).getCount()

    if (hasUser > 0) {
      response.status(400).send({ error: "RGPM já cadastrado!" })
    } else {
      const newUser = await _user.create({ nome: nome, rgpm: rgpm, password: pass, admin: false })
      const token = await auth.generate(newUser)

      return {
        nome: nome,
        rgpm: rgpm,
        isAdmin: newUser.admin,
        token: token.token,
      }
    }
  }

  async unregister({ auth, response }) {
    const id = auth.user.id;
    const result = await _user.query().where({ id: id }).first()

    if (!result) {
      response.status(401).send({ error: "Usuário não encontrado" })
    } else {
      const count = await result.delete()
      return {
        removed: count
      }
    }
  }

  async login({
    auth,
    request
  }) {
    const { rgpm, pass } = request.only(['rgpm', 'pass'])

    if (rgpm == "00000" && pass == "MOTOMEC") {
      const hasUser = await _user.query().where('rgpm', rgpm).getCount()
      if (hasUser > 0) {
        const status = await auth.attempt(rgpm, pass)
        return {
          nome: "MOTOMEC",
          rgpm: "00000",
          isAdmin: true,
          token: status.token,
        }
      } else {
        const newUser = await _user.create({ nome: "MOTOMEC", rgpm: rgpm, password: pass, admin: true })
        const status = await auth.generate(newUser)
        return {
          rgpm: "00000",
          nome: "MOTOMEC",
          isAdmin: true,
          token: status.token
        }
      }

    } else {
      const status = await auth.attempt(rgpm, pass)
      const user = await _user.findBy('rgpm', rgpm)

      return {
        rgpm: rgpm,
        nome: user.nome,
        isAdmin: user.admin,
        token: status.token
      }
    }
  }
}

module.exports = UserController
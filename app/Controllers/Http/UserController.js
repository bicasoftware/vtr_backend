'use strict'

const _user = use('App/Models/User')

class UserController {

  async register({
    auth,
    request,
    response
  }) {
    const {
      isAdmin,
      nome,
      rgpm,
      pass
    } = request.only(['nome', 'rgpm', 'pass', 'isAdmin'])
    const hasUser = await _user.query().where('rgpm', rgpm).getCount()

    if (hasUser > 0) {
      response.status(400).send({
        error: "RGPM já cadastrado!"
      })
    } else {
      const newUser = await _user.create({
        nome: nome,
        rgpm: rgpm,
        password: pass,
        admin: isAdmin
      })
      const token = await auth.generate(newUser)

      return {
        nome: nome,
        rgpm: rgpm,
        isAdmin: isAdmin,
        token: token.token,
      }
    }
  }

  async login({
    auth,
    request
  }) {
    const {
      rgpm,
      pass
    } = request.only(['rgpm', 'pass'])

    const status = await auth.attempt(rgpm, pass)
    const user = await _user.findBy('rgpm', rgpm)

    return {
      rgpm: rgpm,
      nome: user,
      isAdmin: user.admin,
      token: status.token
    }
  }
}

module.exports = UserController

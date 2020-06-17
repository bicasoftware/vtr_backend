'use strict'

const _user = use('App/Models/User')

class UserController {

  async register({
    auth,
    request,
    response
  }) {
    const {
      email,
      pass
    } = request.only(['email', 'pass'])
    const hasUser = await _user.query().where('email', email).getCount()

    if (hasUser > 0) {
      response.status(400).send({
        error: "Usuário já cadastrado"
      })
    } else {
      const newUser = await _user.create({email: email, password: pass})
      const token = await auth.generate(newUser)

      return {
        status: "ok",
        token: token
      }
    }
  }

  async login({
    auth,
    request
  }) {
    const {
      email,
      pass
    } = request.only(['email', 'pass'])

    const status = await auth.attempt(email, pass)

    return {
      status: status
    }
  }
}

module.exports = UserController

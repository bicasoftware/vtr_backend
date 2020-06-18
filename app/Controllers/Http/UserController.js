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
      email,
      pass
    } = request.only(['email', 'pass', 'isAdmin'])
    const hasUser = await _user.query().where('email', email).getCount()

    if (hasUser > 0) {
      response.status(400).send({
        error: "Usuário já cadastrado"
      })
    } else {
      const newUser = await _user.create({
        email: email,
        password: pass,
        admin: isAdmin
      })
      const token = await auth.generate(newUser)

      return {
        email: email,
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
      email,
      pass
    } = request.only(['email', 'pass'])

    const status = await auth.attempt(email, pass)
    const user = await _user.findBy('email', email)

    return {
      email: email,
      isAdmin: user.admin,
      token: status.token
    }
  }
}

module.exports = UserController

'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('register', 'UserController.register')
  Route.post('login', 'UserController.login')
}).prefix('auth')

Route.group(() => {
  Route.post('', 'CarroController.create')
  Route.get('', 'CarroController.list')
}).prefix('carros').middleware(['auth'])

Route.group(() => {
  Route.get('/carros', 'VeiculoController.listCarros')
  Route.get('/motos', 'VeiculoController.listMotos')
}).prefix("veiculos").middleware(['auth'])

Route.post('/requisicoes', 'RequisicaoController.create').middleware(['auth'])
